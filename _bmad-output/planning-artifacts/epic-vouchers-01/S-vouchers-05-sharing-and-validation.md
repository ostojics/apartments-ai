## S-vouchers-05: Voucher sharing and validation rules (share link / forwarded usage)

### As a

Guest who received a voucher

### I want

To forward the voucher code or share a link so that a friend can redeem it, subject to redemption rules.

### So that

I can refer friends and increase chances of direct bookings.

### Acceptance Criteria

1. Voucher codes can be forwarded and redeemed by another user unless voucher is designated single-use and already redeemed.
2. Shareable links carry the voucher token and pre-populate the checkout with the voucher code (if link used).
3. Validation rules (single-use vs multi-use) are enforced by the voucher service during redemption.
4. Any redemption attempt updates voucher status and logs the redeemer context.

### Tasks

- T-vouchers-05-01: Implement link generator for shareable voucher links.
- T-vouchers-05-02: Enforce validation rules in the redemption API.
- T-vouchers-05-03: Update email template with copy explaining forwarding and redemption constraints.

Subtasks (detailed):

- T-vouchers-05-01-01: Design URL token format and expiry semantics for shareable links.
- T-vouchers-05-01-02: Implement generation of short shareable links and optional tracking parameters.
- T-vouchers-05-02-01: Extend redemption API to accept redeemer context and enforce single-use vs multi-use rules.
- T-vouchers-05-02-02: Add logging for share-origin and redeemer identity (if available) for analytics.
- T-vouchers-05-03-01: Update email copy to include forwarding instructions and examples.
- T-vouchers-05-03-02: Add tests for redeeming via shareable link and direct code entry.
