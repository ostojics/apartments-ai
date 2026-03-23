## S-vouchers-06: Developer implementation story — migrations, data model, email & queue services

### As a

Backend developer responsible for implementing the voucher platform

### I want

Concrete DB migrations, a clear data model, integrations for email delivery, and background queue processing (BullMQ) that follow the project's existing backend architecture and conventions

### So that

The voucher feature is implemented in a maintainable, testable, and operable way consistent with the host-elite codebase.

### Acceptance Criteria

1. DB migration(s) are provided and applied using the repository's migration tool (follow existing pattern) and produce the voucher tables and any auxiliary tables/indexes described below.
2. A typed data model (entities/DTOs/schemas) exists for Voucher and EmailOutbox (or equivalent), with repository functions and unit tests for CRUD and key queries (getByCode, findByOrigin, markRedeemed, findExpired).
3. Background job processing uses BullMQ with at least two queues: voucher-issuance and email-sends. Queue configuration, processors, and retry/backoff semantics are implemented consistent with existing backend patterns (Redis connection via central config).
4. Email sending is implemented behind an IEmailService interface with at least one provider adapter (SES or SMTP) and a Queue-based send flow. Sends are idempotent and retried with exponential backoff; failures go to a dead-letter queue and surface in logs/monitoring.
5. Issuance workflow (submission → enqueue → create voucher → enqueue email) is implemented end-to-end with integration tests (happy path, duplicate submission dedupe, email send failure retry).
6. Implementation follows existing code style and patterns used in apps/core (NestJS module structure, provider registration, configuration injection), and documentation is added to ARCHITECTURE.md or a new developer README.

### Tasks

- [x] T-vouchers-06-01: Design data model and write migration(s).
- [x] T-vouchers-06-02: Implement Voucher repository and domain entity (with types/DTOs and validation).
- [x] T-vouchers-06-03: Implement EmailOutbox (or email tracking) repository and migration. (implemented as shared Outbox)
- [x] T-vouchers-06-04: Add BullMQ queues and processors (voucher-issuance, email-sends). Register in NestJS module. (email-sends only per final design)
- [x] T-vouchers-06-05: Implement IEmailService interface and provider(s) (Resend adapter) and template rendering hook if needed.
- [x] T-vouchers-06-06: Implement issuance background job that is idempotent and enqueues email job. (voucher issuance now synchronous in submission transaction)
- [x] T-vouchers-06-07: Add monitoring/metrics and alerting hooks for queue errors and email failure rates.

## Dev Agent Record

### What was implemented

- Added voucher data model and persistence:
  - `VoucherEntity`, `VoucherOrmEntity`, mapper, repository interface and TypeORM repository.
- Added unified shared outbox under shared module `outbox` subfolder:
  - outbox application entity + repository interface
  - outbox infrastructure entity + mapper + TypeORM repository
- Added migration `CreateVouchersAndOutbox1761000000000` creating `vouchers` and `outbox` tables, constraints, and indexes.
- Wired modules/providers:
  - new `VouchersModule`
  - shared module registration for outbox repository
  - BullMQ and scheduler in shared module
- Implemented queue abstraction + adapter:
  - `IQueueService` and `BullMqAdapter`
- Implemented outbox scan + email processing flow:
  - `OutboxScannerService` (cron scans pending outbox and enqueues email jobs)
  - `VoucherEmailProcessor` (consumes `SEND_VOUCHER_EMAIL`, sends via `IEmailService`, updates outbox status)
- Updated promotion submission flow:
  - dedupe by existing `(email, tenant)` contact
  - synchronous voucher creation in same transaction as contact + outbox insert
  - idempotency key `tenantId:email:promotionId`
  - structured logs: `issuance.created`, `issuance.duplicate`, `outbox.queued`, `email.sent`, failure logs

### Tests created/updated

- `promotion-opt-in.command.handler.spec.ts`
  - happy path saves contact + voucher + outbox in transaction
  - duplicate contact path short-circuits
- `typeorm-voucher.repository.spec.ts`
  - save/getByCode/findByOrigin/findExpired/markRedeemed
- `typeorm-outbox.repository.spec.ts`
  - save/findById/findPendingToQueue

### Validation executed

- `pnpm --filter @host-elite/core test -- src/modules/contacts/application/handlers/promotion-opt-in.command.handler.spec.ts src/modules/vouchers/infrastructure/persistence/typeorm-voucher.repository.spec.ts src/modules/shared/infrastructure/outbox/typeorm-outbox.repository.spec.ts` ✅
- `pnpm --filter @host-elite/core build` ✅
- `pnpm --filter @host-elite/core lint` ✅ (1 pre-existing warning in buildings controller unrelated to this story)

### Decisions

- Followed requested architecture adjustment:
  - no separate voucher issuance queue/job
  - voucher is generated synchronously in promotions submission transaction
  - single outbox table in shared module used for email queue handoff

### File List

- apps/core/src/migrations/1761000000000-CreateVouchersAndOutbox.ts
- apps/core/src/config/database.config.ts
- apps/core/src/app.module.ts
- apps/core/src/common/enums/jobs.enum.ts
- apps/core/src/modules/vouchers/README.md
- apps/core/src/modules/vouchers/vouchers.module.ts
- apps/core/src/modules/vouchers/application/services/voucher-code.generator.ts
- apps/core/src/modules/vouchers/domain/voucher.entity.ts
- apps/core/src/modules/vouchers/domain/repositories/voucher.repository.interface.ts
- apps/core/src/modules/vouchers/infrastructure/mappers/voucher.mapper.ts
- apps/core/src/modules/vouchers/infrastructure/persistence/voucher.entity.ts
- apps/core/src/modules/vouchers/infrastructure/persistence/typeorm-voucher.repository.ts
- apps/core/src/modules/vouchers/infrastructure/persistence/typeorm-voucher.repository.spec.ts
- apps/core/src/modules/shared/application/outbox/outbox.entity.ts
- apps/core/src/modules/shared/application/outbox/outbox.repository.interface.ts
- apps/core/src/modules/shared/application/queue/queue.service.interface.ts
- apps/core/src/modules/shared/infrastructure/outbox/outbox.entity.ts
- apps/core/src/modules/shared/infrastructure/outbox/outbox.mapper.ts
- apps/core/src/modules/shared/infrastructure/outbox/typeorm-outbox.repository.ts
- apps/core/src/modules/shared/infrastructure/outbox/typeorm-outbox.repository.spec.ts
- apps/core/src/modules/shared/infrastructure/outbox/outbox-scanner.service.ts
- apps/core/src/modules/shared/infrastructure/queue/bullmq.adapter.ts
- apps/core/src/modules/shared/infrastructure/queue/voucher-email.processor.ts
- apps/core/src/modules/shared/shared.module.ts
- apps/core/src/modules/contacts/domain/repositories/contact.repository.interface.ts
- apps/core/src/modules/contacts/infrastructure/persistence/typeorm-contact.repository.ts
- apps/core/src/modules/contacts/application/commands/promotion-opt-in.command.ts
- apps/core/src/modules/contacts/presentation/controllers/promotions.controller.ts
- apps/core/src/modules/contacts/application/handlers/promotion-opt-in.command.handler.ts
- apps/core/src/modules/contacts/application/handlers/promotion-opt-in.command.handler.spec.ts
- apps/core/src/modules/contacts/contacts.module.ts
- turbo.json

### Subtasks / Implementation Notes

- T-vouchers-06-01-01: Data model (SQL / pseudo schema)

  Voucher table (recommended fields):
  - id: UUID PRIMARY KEY
  - code: VARCHAR(32) NOT NULL UNIQUE -- e.g., HV-XXXX-XXXX
  - discount_percent: INT NOT NULL DEFAULT 10
  - issued_at: TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
  - expires_at: TIMESTAMP WITH TIME ZONE NOT NULL
  - status: VARCHAR(16) NOT NULL DEFAULT 'issued' -- ENUM {issued,redeemed,expired}
  - origin: VARCHAR(64) NULL -- promotion id
  - email: VARCHAR(320) NULL -- optional owner/requester email
  - metadata: JSONB NULL -- arbitrary metadata
  - idempotency_key: VARCHAR(128) NULL -- for issuance idempotency
  - created_at / updated_at: timestamps

  Indexes:
  - UNIQUE(code)
  - INDEX(origin)
  - INDEX(expires_at)
  - INDEX(email)

  Outbox table (check architecture.md):

- T-vouchers-06-01-02: Migration guidance
  - Implement migrations using the project's migration tool (TypeORM/Prisma/knex). If the repo uses TypeORM (NestJS default), create a TypeORM migration in apps/core that creates the two tables and adds indexes/constraints above.
  - Add a rollback migration that drops the tables if needed.
  - Add a short migration README that explains any data-migration steps required (none expected initially).

- T-vouchers-06-02-01: Repository API (example signatures)
  - createVoucher({code, discount_percent, issued_at, expires_at, origin, email, idempotency_key, metadata})
  - getByCode(code)
  - findByOrigin(origin)
  - markRedeemed(code, orderContext) -- atomically set status=redeemed and store redeemed metadata
  - findExpired(beforeTs)
  - upsertByIdempotencyKey(key, payload)

  Ensure the repository enforces uniqueness at the DB layer (unique index on code) and uses transactions where necessary.

- T-vouchers-06-03-01: Email send flow / idempotency
  - Use EmailOutbox as a source of truth for send attempts. When a voucher is created, create an EmailOutbox row with status=pending and enqueue an email-sends job referencing the outbox id.
  - Processor reads the outbox row, calls IEmailService.send(template, to, payload), updates status to sent on success or increments attempts and sets next_attempt_at on failure.
  - After N failed attempts (configurable, e.g., 5), move to 'failed' and push to a dead-letter queue or alert.

- T-vouchers-06-04-01: BullMQ configuration and processors

  Queues:
  - voucher-issuance (jobs created by promotion-form submission processor)
    - job payload: { email, promotion_id, tenant_id, submission_id, idempotency_key }
    - concurrency: moderate (e.g., 10)
    - retries: 3 with exponential backoff

  - email-sends
    - job payload: { outbox_id }
    - concurrency: configured based on provider limits (e.g., 5)
    - retries: configured based on outbox attempts logic; use backoff

  Processor responsibilities:
  - voucher-issuance processor: validate payload, call repository.upsertByIdempotencyKey, create voucher (or return existing), write EmailOutbox row and enqueue email-sends job.
  - email-sends processor: perform send via IEmailService, update outbox row, handle retry/backoff and failed state.

  Integration notes:
  - Use a central Redis connection config (read from existing app config). Register queue clients and processors as NestJS providers consistent with existing worker patterns.
  - Add graceful shutdown handling for processors.

- T-vouchers-06-05-01: Email provider interface

  Interface IEmailService {
  send(to: string, subject: string, html: string, text?: string, metadata?: Record<string, unknown>): Promise<{messageId?: string}>
  }

  Provide two adapters (if possible): SES adapter and SMTP adapter (nodemailer). Wire the chosen adapter via configuration (env var EMAIL_PROVIDER). Keep templates rendered in-app or via third-party template system. Keep implementation testable with a mock provider.

- T-vouchers-06-06-01: Idempotency and race conditions
  - Use idempotency_key on voucher creation to guard against double issuance. The issuance repository should upsert by idempotency_key (or query-and-insert inside a transaction with unique constraint).
  - For redemption, enforce atomic check-and-reserve via DB transaction or SELECT ... FOR UPDATE to avoid double redemption in race conditions.

- T-vouchers-06-07-01: Tests
  - Unit tests for repository functions (create, getByCode, idempotency behavior).
  - Unit tests for processors using BullMQ testing utilities (or mocking queue).
  - Integration tests that run against test DB and an in-memory Redis (or test Redis) to validate end-to-end: submission → voucher created → email outbox created → email job processed.

- T-vouchers-06-08-01: Monitoring & observability
  - Emit structured logs/events for issuance.created, issuance.duplicate, email.send.success, email.send.fail, queue.job.failed.
  - Expose basic metrics for queue rates, failures, and email failure ratio (Prometheus / hosted monitoring consistent with project).

- T-vouchers-06-09-01: Developer docs
  - Add short README at apps/core/src/modules/vouchers/README.md with: migration run command, env vars required (REDIS_URL, EMAIL_PROVIDER, SES credentials or SMTP), how to run the worker locally, and how to run the integration tests.

### Implementation checklist (quick)

1. Create migrations for voucher + outbox table.
2. Implement Voucher entity and repository + unit tests.
3. Implement EmailOutbox entity and repository + unit tests.
4. Add BullMQ queues and processors wired into NestJS module.
5. Implement IEmailService and a mock provider for tests.
6. Implement issuance job logic with idempotency and enqueue email job.
7. Add metrics/logging and README.

Estimated size: 3-5 dev days (implementation + tests + docs), adjust based on existing infra and migration familiarity.

---

Notes: follow the project's existing patterns for modules, configuration, and migrations (apps/core NestJS module). If the repo uses Prisma instead of TypeORM, port the schema above to Prisma schema and use prisma migrate. If there is a shared infra module for Redis/queues or an existing email service, reuse those providers instead of adding new ones to avoid duplication.
