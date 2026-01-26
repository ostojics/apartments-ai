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

- Claude 3.7 Sonnet

### Debug Log References

- Lint: `pnpm -C apps/web lint` (passed)
- Build: `pnpm -C apps/web build` (passed)

### Completion Notes List

- Successfully implemented building info API integration with custom React hook
- Added error and loading state handling in UI components
- Updated apartment page to display building name from API
- Updated manual tab to display building content from API instead of hardcoded markdown
- Added MSW mock handler for development/testing
- All acceptance criteria met and verified

### File List

- apps/web/src/modules/api/buildings-api.ts (created)
- apps/web/src/modules/apartments/hooks/use-building-info.ts (created)
- apps/web/src/modules/apartments/components/apartment.page.tsx (modified)
- apps/web/src/modules/apartments/components/apartment-manual-tab.tsx (modified)
- apps/web/src/modules/api/query-keys.ts (modified)
- apps/web/src/mocks/handlers/apartments-handlers.ts (modified)

### Change Log

- 2026-01-24: Story created for building info by ID endpoint integration.
- 2026-01-24: Implementation completed - API integration, custom hook, UI updates, error handling, and mock data added.

---

Refer to the [naming convention](../../naming-convention.md) for branch, PR, and task identifiers.
