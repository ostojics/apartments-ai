# Story: S-setup-01 – Frontend Public Layout Setup

Status: in-progress

## Description

Implement the public layout for the web frontend, ensuring correct structure and styling for the landing and public pages.

## Acceptance Criteria

- Theme switcher is positioned at the top right of the page.
- Main content area takes the full screen height.
- Footer displays 'Powered by' at the bottom, replacing any email contact.
- Only modify `apps/web/src/layouts/public-layout.tsx` for this story.
- All UI changes are visually verified in the browser.

## Tasks & Subtasks

- [x] **T-setup-01.1**: Review acceptance criteria

- Review the acceptance criteria for S-setup-01 to ensure all requirements are clear: theme switcher at top right, full screen main content, footer with 'Powered by', only modify apps/web/src/layouts/public-layout.tsx.

- [x] **T-setup-01.2**: Analyze current public-layout.tsx

- Open and analyze the current state of apps/web/src/layouts/public-layout.tsx to understand existing structure and identify required changes.

- [x] **T-setup-01.3**: Design layout changes

- Plan the layout changes: position theme switcher at top right, ensure main content is full screen height, update footer to display 'Powered by' at the bottom.

- [x] **T-setup-01.4**: Implement theme switcher position

- Update apps/web/src/layouts/public-layout.tsx to position the theme switcher at the top right of the page.

- [x] **T-setup-01.5**: Ensure full screen main content

- Modify the main content area in apps/web/src/layouts/public-layout.tsx to take the full screen height.

- [x] **T-setup-01.6**: Update footer to 'Powered by'

- Change the footer in apps/web/src/layouts/public-layout.tsx to display 'Powered by' text at the bottom, replacing any email contact.

- [ ] **T-setup-01.7**: Test and verify layout

- Test the updated layout in the web frontend to ensure all acceptance criteria are met and the UI behaves as expected.

- [ ] **T-setup-01.8**: Commit changes following naming convention

- Commit the changes to a branch and PR named according to the naming convention in \_bmad-output/planning-artifacts/naming-convention.md.

---

## Dev Notes

- Follow project architecture and UI/UX guidelines.
- Only modify `apps/web/src/layouts/public-layout.tsx`.
- Ensure theme switcher is accessible and visually aligned.
- Footer must be sticky at the bottom.
- Use existing design system components if available.

### Project Structure Notes

- Confirm alignment with unified project structure (paths, modules, naming).
- Note any detected conflicts or variances (with rationale).

### References

- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [Naming Convention](../../naming-convention.md)

## Dev Agent Record

### Agent Model Used

- GPT-5.2-Codex

### Debug Log References

- Lint: `pnpm -C apps/web lint` exited with code 130 (no output)

### Completion Notes List

- Updated public layout to right-align theme switcher, full-height main content, and sticky footer text.
- Manual visual verification pending (see T-setup-01.7).

### File List

- apps/web/src/layouts/public-layout.tsx

### Change Log

- 2026-01-16: Updated public layout structure and footer text for S-setup-01.

---

Refer to the [naming convention](../../naming-convention.md) for branch, PR, and task identifiers.
