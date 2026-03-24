## S-vouchers-01: Promotion form submission → capture contact and enqueue voucher issuance

### As a

Guest visitor submitting the promotion form

### I want

The system to capture my contact email when I submit the promotion form so that I automatically receive a voucher via email.

### So that

I get an incentive (10% off) to book directly and can forward the voucher to friends.

### Acceptance Criteria

1. Promotion form submissions with an email are persisted to a submissions queue/database within 5 seconds.
2. A voucher issuance job is enqueued for each valid submission (email present and syntactically valid).
3. Duplicate submissions from the same email in a short window (e.g., 5 minutes) do not create duplicate vouchers — de-dupe logic applies.
4. The job carries necessary context: email, promotion id, tenant/building id (if available), and timestamp.

### Tasks

- T-vouchers-01-01: Add server-side handler for promotion form POST to validate and persist submissions.
- T-vouchers-01-02: Implement queueing mechanism (background job) to process voucher issuance.
- T-vouchers-01-03: Add de-duplication guard for rapid re-submissions by the same email.
- T-vouchers-01-04: Add basic telemetry/tracing for submission events.

Subtasks (detailed):

- T-vouchers-01-01-01: Define and document the submission payload contract (fields required: email, promotion_id, tenant_id).
- T-vouchers-01-01-02: Implement server-side validation (email format, rate limits) and return clear errors to client.
- T-vouchers-01-02-01: Implement background job consumer that reads submissions and calls the voucher issuance API.
- T-vouchers-01-02-02: Add retries and poison-queue handling for failed issuance jobs.
- T-vouchers-01-03-01: Implement dedupe store or short-term cache (e.g., Redis) keyed by email+promotion to prevent duplicate issuance within 5 minutes.
- T-vouchers-01-04-01: Emit structured events for submission.received and submission.enqueued (include promotion_id and tenant_id) to telemetry system.
- T-vouchers-01-04-02: Add unit tests for handler validation and integration tests for end-to-end submission → enqueue flow.
