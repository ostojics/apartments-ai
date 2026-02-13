# Story: S-apartment-05 – Full-Height Responsive Chat UI

Status: not-started

## Description

Update the AI assistant chat UI on the apartment page so that the messages display area takes the full available screen height by default and is always scrollable, similar to Gemini and other LLM chat UIs. The chat should maximize space for messages, especially on mobile, and remain fully responsive. The chat area should take the full height even when there are no messages, and scrolling should work smoothly. Avoid complex or brittle styling solutions.

## Acceptance Criteria

- Chat messages display area takes full available height on all devices
- Area is always scrollable, even with no messages
- Chat UI maximizes space for messages, especially on mobile
- Fully responsive: works on all screen sizes
- No complex or brittle styling code
- No regressions to existing chat width or mobile layout
- All changes are tested and verified

## Tasks & Subtasks

- [ ] **T-apartment-05.1**: Review acceptance criteria
- [ ] **T-apartment-05.2**: Analyze current chat UI and layout
- [ ] **T-apartment-05.3**: Update chat messages display area to take full height and be scrollable
- [ ] **T-apartment-05.4**: Test responsiveness and scrolling on all devices
- [ ] **T-apartment-05.5**: Refactor or simplify styling as needed
- [ ] **T-apartment-05.6**: Verify no regressions to width or mobile layout
- [ ] **T-apartment-05.7**: Commit changes following naming convention

---

## Dev Notes

### References

- [prd-host-elite-2026-01-16.md](../prd-host-elite-2026-01-16.md)
- [naming-convention.md](../naming-convention.md)
- Example chat UI in `apps/web/src/modules/apartments/components/apartment-chat-tab.tsx`

### Project Structure Notes

- All chat UI logic and styling should remain in the relevant component(s)
- Avoid introducing unnecessary complexity in CSS or layout

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Lint: `pnpm -C apps/web lint` (pending)

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- apps/web/src/modules/apartments/components/apartment-chat-tab.tsx (expected)

### Change Log

- 2026-01-21: Story created for full-height responsive chat UI.

---

Refer to the [naming convention](../naming-convention.md) for branch, PR, and task identifiers.
