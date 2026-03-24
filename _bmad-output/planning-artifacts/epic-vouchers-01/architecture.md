# Voucher Issuance — High Level Architecture

Owner: Winston (Architect)

Summary

- Goal: reliably capture promotion form submissions, generate a voucher, and deliver the voucher email within ~1 minute while preserving correctness (no duplicate vouchers), observability, and safe retries.
- Key patterns: Outbox pattern for reliable email dispatch, queue-driven background processing (use a queue abstraction), a lightweight voucher code generator service, and a small Email service adapter (existing ResendEmailService) used from a new voucher issuance worker.

Design Overview

1. Submission handler (HTTP)

- Endpoint: promotions POST (already exists in contacts module). On valid submission we must atomically store the contact and an outbox entry representing "issue voucher for this contact".
- Implementation: inside a DB transaction write contact row (contacts table) and an Outbox row (outbox table). The outbox row contains job_type, payload (json), tenant_id, status (pending), attempts, scheduled_at, created_at.
- Deduplication: enforce short-window dedupe via Redis cache keyed by tenant_id+email+promotion_id (already recommended elsewhere) and/or a DB uniqueness guard for repeated short-window attempts. The handler should still be idempotent when retried.

2. Outbox scanner → BullMQ enqueue

- A lightweight scheduled scanner (OutboxScanner) runs in the background (single instance per deployment or leader-elected) and SELECTs pending outbox rows (status = 'pending' AND scheduled_at <= now()) with FOR UPDATE SKIP LOCKED to claim them in a transaction.
- For each claimed row, the scanner enqueues a BullMQ job to the EMAILS queue (job name: SEND_VOUCHER_EMAIL) with the outbox id and payload, and updates outbox.status='queued', queued_at, worker_attempts++.
- Rationale: scanning + enqueueing decouples DB persistence from queueing and avoids tight coupling to Redis for write path.

3. Queue worker: voucher issuance job

- Worker consumes SEND_VOUCHER_EMAIL jobs through the chosen IQueueService adapter.
- Worker steps:
  1. Read outbox row by id. If status is not queued/pending, exit.
  2. Call IVoucherService.generateCode(payload) which returns a generated voucher code (simple, deterministic or random with uniqueness guaranteed by persistence layer when saved).
  3. Persist the voucher record via the promotions module's issuance path (the promotions module handles writes and metadata). The worker should call the promotions module application service / issuance command to create the voucher record with the generated code.
  4. Render email template (HTML + plain) with voucher details and one-click apply link.
  5. Call IEmailService.sendEmail({to, subject, html}). The project already provides ResendEmailService implementing IEmailService.
  6. On success, update outbox.status='sent', sent_at, result metadata (message id, provider response). If needed, update voucher.owner_email through the promotions module API.
  7. On failure, set outbox.status='failed' and record last_error; schedule retry according to exponential backoff and attempts count; optionally push to poison queue after N attempts.

Existing pieces we can reuse

- IEmailService & ResendEmailService exist at: modules/shared/application/emails/email.service.interface.ts and modules/shared/infrastructure/emails/resend.email.service.ts
- queues enum contains EMAILS queue and jobs enum contains email-related job names.
- Contacts module already has promotion-opt-in command and contact persistence; reuse that command handler and modify it to include outbox write.
- BullMQ is already dependency in apps/core package.json (@nestjs/bullmq and bullmq).

Proposed new artifacts (file paths & responsibilities)

- Database
  - Migration: migrations/XXXXXX-CreateVouchersAndOutbox.ts
    - Create `vouchers` table: id (uuid), code (varchar unique), discount_percent, issued_at, expires_at, status, origin, owner_email, tenant_id, metadata (jsonb), created_at, updated_at
    - Create `outbox` table: id (uuid), job_type (varchar), payload (jsonb), tenant_id, status (enum: pending, queued, sent, failed), attempts (int default 0), scheduled_at (timestamp), created_at, updated_at, last_error text, result jsonb

- Backend modules & classes (NestJS, follow existing DDD layout)
  - modules/vouchers/
    - application/
      - commands/issue-voucher.command.ts (if needed)
      - services/voucher.service.ts (interface and application-layer port)
    - domain/
      - voucher.entity.ts
    - infrastructure/
      - persistence/voucher.repository.typeorm.ts
      - outbox.repository.typeorm.ts
      - migrations (if per-module)

  - modules/contacts/application/handlers/promotion-opt-in.command.handler.ts (modify)
    - Wrap contact creation + outbox insert inside single DB transaction (use TypeORM transaction manager or a UnitOfWork pattern used elsewhere).
    - Payload written to outbox should include promotion_id, email, tenant_id, dedupe_key, and any template variables.

  - modules/shared/infrastructure/outbox/
    - outbox-scanner.service.ts (schedules and claims outbox rows and enqueues BullMQ jobs)
    - outbox.processor.ts (optional worker that can directly process DB rows if preferred)

  - modules/vouchers/infrastructure/bullmq/voucher.worker.ts
    - BullMQ processor that performs voucher creation + email send + outbox status updates.

Integration & DI

- Use DI tokens consistent with codebase (e.g., VOUCHER_REPOSITORY, OUTBOX_REPOSITORY). Bind TypeORM repository implementations in vouchers module providers.
- Use existing EMAIL_SERVICE token (present in shared.module) to inject ResendEmailService into voucher.worker.

Transactional notes

- The HTTP path must NOT call external services inside the DB transaction. The transaction should only persist contact + outbox row.
- Outbox ensures eventual delivery; scanner + worker do external side effects.
- When voucher generation requires uniqueness, rely on DB unique constraint for code and retry on conflict.

Idempotency & dedupe

- Outbox rows carry an idempotency_key (e.g., tenant:email:promotion) — voucher issuance worker must ensure issuing is idempotent: if voucher exists for idempotency_key, return existing voucher and proceed to send (but check send status to avoid duplicate emails).
- Mark outbox rows sent only after successful email send.

Monitoring & telemetry

- Emit structured events: submission.received, outbox.queued, voucher.issued, email.sent, email.failed with metadata (tenant, promotion_id, outbox_id, job id).
- Capture provider response and errors in outbox.result/last_error for troubleshooting.
- Add metrics around queue length, job duration, failure rate, and emails per minute.

Retries & failure modes

- Use BullMQ retry/backoff for transient failures inside the worker.
- Track attempts in outbox table to allow DB-side visibility and custom backoff scheduling by scanner (e.g., scheduled_at = now() + backoff).
- Poison queue handling: after N attempts, mark outbox.status='failed' and push an alert or create an incident task.

Security & data concerns

- Do not include sensitive provider secrets in outbox.payload. Only minimal fields required to render/send email (email, promotion_id, tenant_id, idempotency_key).
- Ensure tenant_id is present on all persisted rows and honored by queries.

Suggested SQL snippets (conceptual)
-- vouchers table
--
-- CREATE TABLE vouchers (
-- id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
-- code varchar NOT NULL UNIQUE,
-- discount_percent int NOT NULL DEFAULT 10,
-- expires_at timestamptz NOT NULL,
-- status varchar NOT NULL DEFAULT 'issued',
-- owner_email text,
-- tenant_id uuid NOT NULL -> tenants table,
-- metadata jsonb,
-- created_at timestamptz NOT NULL DEFAULT now(),
-- );

## -- outbox table

-- CREATE TABLE outbox (
-- id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
-- job_type varchar NOT NULL,
-- payload jsonb NOT NULL,
-- tenant_id uuid NOT NULL,
-- status varchar NOT NULL DEFAULT 'pending',
-- attempts int NOT NULL DEFAULT 0,
-- last_error text,
-- result jsonb,
-- created_at timestamptz NOT NULL DEFAULT now(),
-- updated_at timestamptz NOT NULL DEFAULT now()
-- );

Implementation plan (short)

1. Add DB migration for vouchers + outbox.
2. Add Voucher module with domain/service/repository and TypeORM entity.
3. Add Outbox repository and TypeORM entity.
4. Modify promotion-opt-in handler: on successful validation, within a DB transaction insert contact + outbox row (payload minimal).
5. Implement OutboxScanner (scheduled, SKIP LOCKED SELECT) that enqueues BullMQ jobs and marks outbox queued.
6. Implement voucher.worker (BullMQ processor) that generates voucher, sends email via IEmailService, updates outbox and voucher rows.
7. Add tests: unit tests for voucher generation, integration tests for end-to-end submission → outbox → enqueue → worker run (use test queue or mocked IEmailService).
8. Deploy and monitor. Tune scanner frequency and worker concurrency.

Estimate & notes

- Effort: small feature team — ~2-3 dev days to implement core path + tests and migration if you already have DB infra and BullMQ infra configured.
- Risk: make sure background scanner is single-writer or uses SKIP LOCKED to avoid duplicate enqueueing in a multi-replica deployment.

Conclusion

This approach follows the current repository's architecture and patterns: DDD-modular NestJS modules, DI ports/adapters (IEmailService already present), and background processing with BullMQ (package available). The outbox pattern provides robust delivery guarantees and makes the HTTP path synchronous and fast while preserving reliability.

Addendum — Voucher service and Queue abstraction

1. Voucher Service (IVoucherService)

- Why: Voucher issuance, lookup, and redemption contain business rules (code format, expiry, single-use/multi-use policies, idempotency). Expose those operations behind an application port so other parts of the system (HTTP handlers, background processors) depend on the port, not the implementation.
- Example interface (TypeScript, application layer):

  export interface IVoucherService {
  // Issue a voucher for the given tenant + payload. Idempotent when idempotencyKey provided.
  issueVoucher(props: {
  tenantId: string;
  promotionId: string;
  ownerEmail?: string | null;
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
  }): Promise<{ id: string; code: string; issuedAt: string; expiresAt: string }>;

  // Lookup a voucher by code within tenant scope.
  getByCode(tenantId: string, code: string): Promise<Voucher | null>;

  // Atomically mark a voucher as redeemed (handles concurrency and idempotency checks).
  markRedeemed(voucherId: string, redeemerContext: { orderId?: string; userId?: string }): Promise<void>;
  }

- DI token suggestion: export const VOUCHER_SERVICE = Symbol('VOUCHER_SERVICE');
- Implementation notes: bind a concrete VoucherService in modules/vouchers that performs code generation, persistence (VoucherRepository), and idempotency checks inside transactions. Use DB unique constraints for code collisions and retry loops when necessary.

2. Queue abstraction (IQueueService)

- Why: The codebase uses ports/adapters consistently — do not import or rely on BullMQ directly in application services. Introduce a small IQueueService port that exposes enqueue semantics and let infrastructure provide a BullMQAdapter (or other adapter) bound via DI.
- Example interface (TypeScript):

  export interface IQueueService {
  enqueue<T = unknown>(queueName: string, jobName: string, payload: T, opts?: { delayMs?: number; attempts?: number }): Promise<string /_ jobId _/>;
  // Optional method implemented by adapters to register processors during bootstrap; application code should not call this at runtime.
  registerProcessor?(queueName: string, jobName: string, processor: (payload: any) => Promise<void>): void;
  }

- DI token suggestion: export const QUEUE_SERVICE = Symbol('QUEUE_SERVICE');
- Adapter guidance: implement modules/shared/infrastructure/queue/bullmq.adapter.ts implementing IQueueService using @nestjs/bullmq or bullmq. Bind with { provide: QUEUE_SERVICE, useClass: BullMQAdapter } in SharedModule. The adapter is responsible for registering processors on app bootstrap and mapping adapter-level retry metadata to outbox.attempts/scheduled_at so DB reflects attempts.

3. How it changes the earlier flows

- OutboxScanner uses IQueueService.enqueue(...) instead of calling BullMQ directly.
- The adapter (BullMQAdapter) registers a processor for SEND_VOUCHER_EMAIL and delegates the payload to application ports: IVoucherService and IEmailService. That keeps the processor implementation thin and focused on orchestration, with domain logic in IVoucherService.
- For tests, bind a MockQueueAdapter or InMemoryQueueAdapter to QUEUE_SERVICE so you can exercise end-to-end logic without a real queue.

This addendum ensures the voucher feature aligns with the repository's ports/adapters style: business logic depends on application ports (IVoucherService, IEmailService, IQueueService) and infrastructure provides concrete adapters (TypeORM repositories, BullMQAdapter, ResendEmailService) wired via DI.
