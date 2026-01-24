# Story: Web — Get Building Info by ID Endpoint

**Story ID:** S-web-03-building-info-by-id
**Epic:** epic-web-utilize-core-service-endpoints-01

## Description

Integrate the get building info by ID endpoint to fetch and display detailed information for a selected building on the apartment page.

- Implement a custom React hook abstraction for fetching building info by ID, following the existing hook patterns in the web codebase.

## Acceptance Criteria

- When a building is selected, the web app calls the get building info by ID endpoint.
- The building details are displayed on the apartment page.
- Loading and error states are handled.
- A custom React hook is implemented for fetching building info by ID, matching the abstraction patterns used in the web codebase.

## Dev Notes

- Ensure the UI can render all relevant building details from the backend response.
- Coordinate with backend for the expected data format.
- Follow the established hook abstraction patterns in the web codebase for maintainability and consistency.

### Project Structure Notes

- Place the building info hook in `apps/web/src/hooks/` or `apps/web/src/modules/apartments/hooks/` as appropriate.
- Ensure UI components are updated to consume the new hook.

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

- apps/web/src/hooks/use-building-info.ts (expected)
- apps/web/src/modules/apartments/components/ (expected)

### Change Log

- 2026-01-24: Story created for building info by ID endpoint integration.

---

Refer to the [naming convention](../../naming-convention.md) for branch, PR, and task identifiers.
