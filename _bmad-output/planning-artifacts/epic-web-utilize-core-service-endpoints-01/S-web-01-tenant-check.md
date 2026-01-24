# Story: Web — Tenant Check Endpoint

**Story ID:** S-web-01-tenant-check
**Epic:** epic-web-utilize-core-service-endpoints-01

## Description

Integrate the tenant check endpoint into the web application to validate the user's tenant context before allowing access to apartment features.

- The result of the tenant check (specifically, the `isValid` property) should be added to the global router context.
- Route protection must utilize this `isValid` value to restrict access to apartment features for invalid tenants.
- Implement a custom React hook abstraction for tenant check, following the existing hook patterns in the web codebase.

## Acceptance Criteria

- The web app calls the tenant check endpoint on user session start or before accessing apartment features.
- The `isValid` property from the response is stored in the global router context.
- Route protection logic uses `isValid` to allow or deny access to apartment features.
- If the tenant check fails, the user is redirected or shown an appropriate error message.
- Success allows access to apartment-related features.
- Loading and error states are handled gracefully.
- A custom React hook is implemented for tenant check, matching the abstraction patterns used in the web codebase.

## Dev Notes

- Coordinate with backend for endpoint details and expected responses.
- Ensure session/auth context is available for the request.
- Follow the established hook abstraction and context management patterns in the web codebase for maintainability and consistency.

### Project Structure Notes

- Place hook and context logic in `apps/web/src/hooks/` or `apps/web/src/modules/` as appropriate.
- Ensure router context is updated in a central location (e.g., `router.tsx`).

### References

- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [prd-apartments-ai-2026-01-16.md](../../prd-apartments-ai-2026-01-16.md)
- [naming-convention.md](../../naming-convention.md)

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Lint: `pnpm -C apps/web lint` (pending)

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- apps/web/src/modules/tenants/hooks/use-tenant-check.ts (expected)
- apps/web/src/router.tsx (expected)

### Change Log

- 2026-01-24: Story created for tenant check endpoint integration.

---

Refer to the [naming convention](../../naming-convention.md) for branch, PR, and task identifiers.
