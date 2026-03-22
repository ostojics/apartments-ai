# Epic: Vouchers

**Epic ID:** epic-vouchers-01  
**Status:** Draft  
**Owner:** Slobodan  
**Created:** 2026-03-22

## Objective

Introduce a voucher mechanism so that when a prospective guest leaves their contact information in the promotion form, the system automatically emails them a voucher code (10% off) which they can use on direct reservations or forward to a friend. This supports the product goal of increasing direct bookings and reducing third-party marketplace commission leakage.

## Scope

- Capture contact submissions from the existing promotion form.
- Generate unique voucher codes with configurable discount and expiration.
- Send an automated, trackable email to the guest containing the voucher and redemption instructions.
- Allow voucher redemption on the direct reservation flow (checkout).
- Support voucher sharing (recipient can reuse within redemption constraints).
- Apartment owner validation UI will be handled in a separate epic; do NOT include an admin dashboard here.

## Motivation

- Drives direct reservations by incentivizing guests with a discount.
- Provides measurable marketing lift for promotions and referrals.
- Positions direct-booking channel as a selling point versus Booking/Airbnb by offering native incentives.

## Acceptance Criteria

1. When a guest submits the promotion form with contact info, the system generates a unique voucher code and sends an email to the provided address within 1 minute.
2. Email contains clear voucher code, discount (10% default), expiration date, link to apply voucher during reservation, and an option to forward to a friend.
3. Voucher codes are single-use by default (configurable), and cannot be stacked with other promotions unless configured.
4. Voucher redemption correctly applies a 10% discount at checkout and updates inventory/orders with voucher metadata.
5. Apartment owners will use a separate, lightweight owner UI (different epic) that allows them to validate voucher codes via a simple form. This epic will NOT implement the owner UI/dashboard and login system.
6. All voucher-related actions are logged for audit and analytics.

## Dependencies

- Working email delivery service (SMTP/SES/etc.) with templates.
- Existing promotion form and its submission hook.
- Reservation/checkout flow where discounts can be applied.
- Backend storage for voucher objects (DB) and service to validate/redeem vouchers.

## Out of Scope

- Complex referral credit accounting and multi-tier affiliate payouts.
- Loyalty program beyond a simple one-off voucher.
- Integration with external marketplaces (Booking/Airbnb) for voucher validation.

## Related Artifacts

- PRD: ../prd-host-elite-2026-01-16.md (if relevant)
- ARCHITECTURE.md

---

## Planned Stories (created)

- S-vouchers-01: Promotion form submission → capture contact and enqueue voucher issuance
- S-vouchers-02: Voucher generation service (code generation, storage, expiry rules)
- S-vouchers-03: Email delivery and template for voucher issuance
- S-vouchers-04: Voucher redemption in reservation checkout
- S-vouchers-05: Voucher sharing and validation rules (share link / forwarded usage)

---

Notes / Assumptions:

- Default discount is 10% unless specified per-promotion.
- Voucher expiration will default to 6 months (180 days) and is not configurable for now.
- Sharing means forwarding the voucher code — redemption rules (single-use vs multi-use) should be confirmed.

Next steps: I can (A) create the detailed user stories and tasks listed above, (B) draft API contracts and data model for vouchers, or (C) ask clarifying questions about expiry, single-use rules, and email copy. Which would you like me to do next?
