# Story: S-core-02 – Apartment Selection

Status: not-started

## Description

Implement the public apartment selection screen. If only one apartment is available for the tenant, automatically redirect to that apartment's page. The page should use existing UI components and be wrapped in the public layout.

## Acceptance Criteria

- Page route: `/apartments`
- Uses public layout
- Displays list of apartments (cards) using UI components
- Each card: apartment name, address, image (optional)
- If only one apartment, auto-navigate to `/apartments/{id}`
- "Continue" button to proceed
- Sleek, modern design using design system components
- No authentication required
- All UI changes are visually verified in the browser
- Apartment cards should support a image (apartment image), use placeholders for implementation
- Tanstack router route is created
- All static UI text is translated

## Tasks & Subtasks

- [ ] **T-core-02.1**: Review acceptance criteria
- [ ] **T-core-02.2**: Analyze existing components for apartment selection
- [ ] **T-core-02.3**: Design apartment selection layout
- [ ] **T-core-02.4**: Implement apartment list UI and navigation logic
- [ ] **T-core-02.5**: Handle single apartment auto-navigation
- [ ] **T-core-02.6**: Test and verify UI in browser
- [ ] **T-core-02.7**: Commit changes following naming convention

---

## Dev Notes

### References

### Project Structure Notes

- Confirm alignment with unified project structure (paths, modules, naming).

### References

- [ARCHITECTURE.md](../../ARCHITECTURE.md)

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Lint: `pnpm -C apps/web lint` (pending)

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- apps/web/src/modules/apartments/components/apartments.page.tsx (expected)

### Change Log

- 2026-01-16: Story created for apartment selection screen.

---

Refer to the [naming convention](../../naming-convention.md) for branch, PR, and task identifiers.
