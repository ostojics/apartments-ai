## S-vouchers-04: Voucher redemption in reservation checkout

### As a

Guest completing a direct reservation

### I want

To apply a voucher code during checkout so that the 10% discount is applied to my reservation total.

### So that

I can benefit from the promotional discount when booking directly.

### Acceptance Criteria

1. Checkout accepts a voucher code and validates it via the voucher validation API before confirming payment.
2. Valid voucher applies a 10% discount to the applicable line items and updates the order total accordingly.
3. Upon successful redemption, voucher status changes to redeemed and the redemption is logged with order id and user context.
4. If voucher is expired or already redeemed, appropriate user-facing error messages are shown and the checkout prevents applying the voucher.

### Tasks

- T-vouchers-04-01: Add voucher input/UX to checkout and client-side validation hints.
- T-vouchers-04-02: Implement server-side validation endpoint for vouchers used by checkout.
- T-vouchers-04-03: Ensure accounting of discounts in order calculations and reporting.
- T-vouchers-04-04: Add tests for success and failure redemption flows.

Subtasks (detailed):

- T-vouchers-04-01-01: Design checkout UX for voucher entry and validation states (valid, invalid, expired, already used).
- T-vouchers-04-01-02: Implement client-side optimistic validation and UX for applying/removing voucher.
- T-vouchers-04-02-01: Implement server-side validateAndApply endpoint that atomically checks voucher and reserves it for order.
- T-vouchers-04-02-02: Handle race conditions: use DB transactions or optimistic locks to prevent double redemption.
- T-vouchers-04-03-01: Update order calculation logic to apply 10% discount and recalculate taxes/fees appropriately.
- T-vouchers-04-03-02: Store voucher metadata on order record (voucher_code, discount_amount, redeemed_at).
- T-vouchers-04-04-01: Add unit and integration tests for redemption success, expired, and already-redeemed cases.
