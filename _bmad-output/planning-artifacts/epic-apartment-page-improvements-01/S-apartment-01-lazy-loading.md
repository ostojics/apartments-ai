# Story: S-apartment-01 – Lazy Load Tab Content

Status: not-started

## Description

Refactor the apartment page so that chat and manual tab content are lazy loaded. Ensure proper loading states using components from the UI library. Only load the manual content when the user navigates to that tab. All loading states must be visually clear and accessible.

## Acceptance Criteria

- Chat and manual tab content are lazy loaded
- Loading states are shown while content loads, using UI components
- No unnecessary code is loaded before needed
- All static text is localized
- All code is mobile responsive

## Tasks & Subtasks

- [ ] **T-apartment-01.1**: Analyze current tab content loading
- [ ] **T-apartment-01.2**: Implement lazy loading for chat/manual tabs
- [ ] **T-apartment-01.3**: Add and test loading states
- [ ] **T-apartment-01.4**: Ensure localization and responsiveness
- [ ] **T-apartment-01.5**: Commit changes following naming convention

---

## Dev Notes

### References

- [apartment.page.tsx](../../apps/web/src/modules/apartments/components/apartment.page.tsx)
- [naming-convention.md](../naming-convention.md)

### Project Structure Notes

- Use UI library for loading states
- Keep main component under 150 lines

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Lint: `pnpm -C apps/web lint` (pending)

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- apps/web/src/modules/apartments/components/apartment.page.tsx

### Change Log

- 2026-01-17: Story created for lazy loading tab content.

---

Refer to the [naming convention](../naming-convention.md) for branch, PR, and task identifiers.
