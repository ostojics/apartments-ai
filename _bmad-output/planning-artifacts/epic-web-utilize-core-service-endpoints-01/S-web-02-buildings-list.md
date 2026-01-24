# Story: Web — Buildings List Endpoint

**Story ID:** S-web-02-buildings-list
**Epic:** epic-web-utilize-core-service-endpoints-01

## Description

Integrate the buildings list endpoint to fetch and display a list of available buildings to the user in the web application.

- Implement a custom React hook abstraction for fetching the buildings list, following the existing hook patterns in the web codebase.

## Acceptance Criteria

- The web app calls the buildings list endpoint and displays the results in the UI.
- Loading and error states are handled.
- The list updates in real-time if the backend data changes (if applicable).
- A custom React hook is implemented for fetching the buildings list, matching the abstraction patterns used in the web codebase.

## Dev Notes

- Ensure the UI is updated to consume the backend data structure.
- Consider pagination or filtering if the list is large.
- Follow the established hook abstraction patterns in the web codebase for maintainability and consistency.

### Project Structure Notes

- Place the buildings list hook in `apps/web/src/hooks/` or `apps/web/src/modules/apartments/hooks/` as appropriate.
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

- apps/web/src/modules/apartments/hooks/use-apartments-list.ts (expected)
- apps/web/src/modules/apartments/components/ (expected)

### Change Log

- 2026-01-24: Story created for buildings list endpoint integration.

---

Refer to the [naming convention](../../naming-convention.md) for branch, PR, and task identifiers.
