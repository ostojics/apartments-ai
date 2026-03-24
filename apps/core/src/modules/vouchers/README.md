# Vouchers Module

## Migrations

- Run migrations via app startup (`migrationsRun: true`) or manually using TypeORM tooling.
- This feature adds migration: `1761000000000-CreateVouchersAndOutbox.ts`.

## Required env vars

- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`
- `REDIS_HOST`, `REDIS_PORT`
- `RESEND_API_KEY`

## Local worker behavior

- Outbox scanner runs in-process every 10 seconds.
- Scanner enqueues due outbox rows to `emails` queue.
- `SEND_VOUCHER_EMAIL` processor sends email and updates outbox status.

## Tests

- Unit tests:
  - `modules/vouchers/infrastructure/persistence/typeorm-voucher.repository.spec.ts`
  - `modules/shared/infrastructure/outbox/typeorm-outbox.repository.spec.ts`
  - `modules/contacts/application/handlers/promotion-opt-in.command.handler.spec.ts`
