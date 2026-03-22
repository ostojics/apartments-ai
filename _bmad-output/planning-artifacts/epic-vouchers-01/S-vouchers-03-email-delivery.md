## S-vouchers-03: Email delivery and template for voucher issuance

### As a

Guest who submitted the promotion form

### I want

To receive an email with my voucher code, discount details, expiry date, and a clear link to apply it during reservation.

### So that

I can easily redeem the voucher when booking directly or forward it to a friend.

### Acceptance Criteria

1. An email is sent to the submitted address within 1 minute of voucher issuance job processing.
2. Email includes: voucher code, discount (10%), expires_at (date), one-click link that leads to booking with voucher pre-applied (if feasible), and forwarding instructions.
3. Email templates are stored in the email service and support placeholders for tenant/building branding.
4. Failed sends are retried (exponential backoff) and failed deliveries are logged for later inspection.

### Tasks

- T-vouchers-03-01: Create HTML/text email templates with placeholders.
- T-vouchers-03-02: Hook email send into the issuance job with retries.
- T-vouchers-03-03: Implement link generation that carries voucher token to the booking flow.
- T-vouchers-03-04: Add monitoring/alerts for email delivery failures.

Subtasks (detailed):

- T-vouchers-03-01-01: Draft email copy for subject, preheader, and body (HTML + plain text).
- T-vouchers-03-01-02: Implement template rendering with tenant/building placeholders.
- T-vouchers-03-02-01: Integrate with email provider (SES/SMTP) and implement send-with-retry logic.
- T-vouchers-03-02-02: Implement idempotent send tracking to avoid duplicate emails for same voucher issuance.
- T-vouchers-03-03-01: Define URL schema for one-click apply link and ensure it safely encodes voucher token.
- T-vouchers-03-03-02: Add client-side handler in booking flow to read voucher token from URL and pre-populate checkout.
- T-vouchers-03-04-01: Configure alerting for high failure rates or bounced emails and log delivery status to DB.
- T-vouchers-03-04-02: Add end-to-end tests that simulate issuance → email sent → link opens checkout with pre-applied voucher.
