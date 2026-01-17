# Story: S-apartment-03 – Promotions & Discount Tab

Status: not-started

## Description

Add a new tab to the apartment page for promotions and discounts. The tab contains a form with name, email, and optional phone number fields. Use a schema in the contracts shared library for validation, returning i18n keys for errors. Display a toast on error or submit, use a tanstack mutation hook abstraction, and show a spinner in the submit button while submitting. Use MSW for endpoint mocking. All static text must be localized, and tabs must be mobile responsive and clearly visible.

## Acceptance Criteria

- New promotions/discount tab with form (name, email, phone number)
- Form uses schema from contracts shared library
- Validation errors return i18n keys, displayed with i18n
- Toast shown on error or submit
- Tanstack mutation hook abstraction for submit
- Spinner shown in submit button while pending
- Form resets and shows thank you toast on success
- MSW endpoint for testing
- New form-error.tsx component for error display
- Tabs are mobile responsive and clearly visible
- All static text is localized
- apartments.page.tsx component is under 150 LOC
- react-hook-form is utilized for validation

## Tasks & Subtasks

- [ ] **T-apartment-03.1**: Add new tab and form UI
- [ ] **T-apartment-03.2**: Implement schema in contracts shared library
- [ ] **T-apartment-03.3**: Add tanstack mutation hook abstraction
- [ ] **T-apartment-03.4**: Implement form-error.tsx component
- [ ] **T-apartment-03.5**: Add MSW endpoint for form
- [ ] **T-apartment-03.6**: Ensure mobile responsiveness and localization
- [ ] **T-apartment-03.7**: Commit changes following naming convention

---

## Dev Notes

### References

- [apartment.page.tsx](../../apps/web/src/modules/apartments/components/apartment.page.tsx)
- [naming-convention.md](../naming-convention.md)
- contracts/shared (for schema)
- MSW mocks

### Project Structure Notes

- Add new form and error components to apartments module
- Add schema to contracts shared library
- Use MSW for endpoint

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Lint: `pnpm -C apps/web lint` (pending)

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- apps/web/src/modules/apartments/components/apartment.page.tsx
- apps/web/src/modules/apartments/components/form-error.tsx
- packages/contracts/src/apartments/schema.ts
- apps/web/src/mocks/handlers/apartments-handlers.ts

### Change Log

- 2026-01-17: Story created for promotions/discount tab.

---

Refer to the [naming convention](../naming-convention.md) for branch, PR, and task identifiers.
