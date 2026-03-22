## S-vouchers-02: Voucher generation service (code generation, storage, expiry rules)

### As a

System/service

### I want

A reliable service that generates unique voucher codes, persists them with metadata (discount, expiry, status), and enforces expiry rules (default 6 months / 180 days).

### So that

Issued vouchers can be validated and redeemed reliably at checkout.

### Acceptance Criteria

1. Voucher codes are unique (collision probability negligible) and follow a readable pattern (e.g., HV-XXXX-XXXX).
2. Each voucher is stored with: code, discount (10%), issued_at, expires_at (issued_at + 180 days), status (issued/redeemed/expired), origin (promotion id), and optional owner email.
3. Expiry is enforced by the validation API/service — any attempt to redeem after expires_at returns expired status.
4. Voucher creation is idempotent for the same submission context (prevent accidental double-issuing).

### Tasks

- T-vouchers-02-01: Implement code generation library with collision checks.
- T-vouchers-02-02: Create database schema/migration for voucher objects.
- T-vouchers-02-03: Implement issuance API used by the background job.
- T-vouchers-02-04: Add unit tests for expiry logic and idempotency.

Subtasks (detailed):

- T-vouchers-02-01-01: Define voucher code format and document readability/security tradeoffs.
- T-vouchers-02-01-02: Implement random/code generation with a fallback retry loop on collision (DB unique constraint).
- T-vouchers-02-02-01: Design DB schema (code, discount, issued_at, expires_at, status, origin, email, metadata).
- T-vouchers-02-02-02: Create migration and basic repository functions (create, getByCode, markRedeemed, findByOrigin).
- T-vouchers-02-03-01: Implement issuance endpoint with idempotency key handling.
- T-vouchers-02-03-02: Add input validation and error responses for issuance API.
- T-vouchers-02-04-01: Add unit tests for expires_at calculation (180 days) and idempotent issuance behavior.
- T-vouchers-02-04-02: Add integration tests for issuance → persistence and collision handling.
