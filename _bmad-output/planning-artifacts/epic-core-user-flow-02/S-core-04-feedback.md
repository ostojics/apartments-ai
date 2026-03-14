# Story: S-core-04 – Feedback Button & Dialog

Status: not-started

## Description

Add a feedback mechanism to the public UI so users can easily send feedback about the application. A persistent feedback button should be available (for example in the public layout header or footer). Clicking the button opens a modal dialog with:

- An optional email input (user may leave their email to be contacted)
- A required multi-line text box for the feedback message
- Submit and Cancel actions

The feature should use existing design system components, be accessible (a11y), translated, and wired to a simple client-side service that will send the feedback payload to a backend endpoint (or a configurable analytics/event endpoint). For the initial implementation the backend endpoint can be a placeholder that logs the payload; integration with a persistent store or third-party ticketing system is considered out-of-scope for this story and will be handled in a follow-up.

## Acceptance Criteria

- Feedback button present in the public layout (visible on pages under public layout)
- Clicking the button opens a modal dialog (overlay) focused on the first input
- Dialog contains:
  - Optional email input (type=email) with client-side validation when present
  - Required feedback text area with a sensible character limit (e.g. 5000 chars)
  - Submit and Cancel buttons
- Submit button is enabled only when feedback text area is not empty
- On submit: client-side service sends payload { email?: string, message: string, page: string, timestamp } to a configurable endpoint; success and error states are shown to the user
- Dialog is keyboard accessible (focus trap while open, ESC closes dialog, form fields reachable by Tab)
- All visible strings are internationalized using the project's i18n approach
- Component unit tests cover validation logic and open/close behavior
- Basic integration / manual verification steps documented in Dev Notes
- Tanstack router is not required to change routes for this feature
- Server-side input validation using Zod schemas is implemented for the feedback API and validation errors are returned in the global error format. Zod error messages MUST be i18n keys (not user-facing text) so the frontend/localization layer can render translated messages.

## Tasks & Subtasks

- [ ] **T-core-04.1**: Review acceptance criteria and UX expectations with PM/Designer
- [ ] **T-core-04.2**: Analyze existing layout and design system components (button, modal, form inputs, toasts)
- [ ] **T-core-04.3**: Create design mock (placement of feedback button — header/footer/floating) and finalize copy
- [ ] **T-core-04.4**: Implement FeedbackButton component and add to public layout
- [ ] **T-core-04.5**: Implement FeedbackDialog component (modal) with optional email field and required message textarea
- [ ] **T-core-04.6**: Implement client-side feedback service (send payload to configurable endpoint; handle success/error)
- [ ] **T-core-04.7**: Add translations for all strings (en + placeholders for other languages)
- [ ] **T-core-04.8**: Add unit tests for components and service (validation, open/close, submit behavior)
- [ ] **T-core-04.9**: Manual QA: verify accessibility, focus management, keyboard interactions, and visual design in browser
- [ ] **T-core-04.10**: Commit changes following naming convention and create PR with summary and testing notes
- [ ] **T-core-04.11**: Implement backend presentation layer in the core service: add a feedback endpoint, validation DTOs, controller, and follow existing core service patterns for logging, error handling, and configuration
- [ ] **T-core-04.12**: Define Zod contract schemas in the core service for the feedback payload (email?, message). Schemas must include i18n message keys for validation errors and be exported for reuse by the controller and tests.
- [ ] **T-core-04.13**: Ensure Zod validation errors are mapped to the global error filter response shape (use existing global error filter).

---

## Dev Notes

### References

- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [ux-core-user-flow.md](../../ux-core-user-flow.md)
- Design system components: `ui` package (button, modal, input, textarea, toast)

### Implementation Guidance

- Preferred placement: add the FeedbackButton to the main layout header — centered alongside the Home and Theme buttons. This places the control in a consistent, discoverable location without covering page content. Add it to the header component used by the public layout so it appears across public pages.
- Button style: match the existing header action buttons (use the ui/button/header-action or equivalent tokenized style). It should visually align with Home and Theme buttons in size, spacing and interaction patterns:
  - Height: same as other header buttons (e.g., 32–40px depending on header tokens)
  - Padding & spacing: match header item spacing so the button sits inline with existing controls
  - Variant: use the same variant as secondary/header controls (icon button or text+icon depending on current header pattern)
  - Icon: use the design system message/pencil icon (icon-only on small screens, icon+label on wider viewports if header supports it)
  - Hover/focus: same hover and focus states as other header actions (visible focus ring, accessible contrast)
  - Tooltip: provide a localized tooltip/aria-label "Feedback" on hover/focus (use i18n string)
- Use existing modal component to ensure consistent styling and accessibility (focus trap, aria attributes). The dialog should open centered and follow the app's modal sizing conventions.
- Email field is optional but validate format if provided. Do not require authentication.
- Limit message length to 5000 characters and show a character counter when user approaches the limit.
- Provide immediate user feedback on submit (success toast, or inline success message in dialog). On error show a non-blocking error message and keep dialog open so user can retry.
- Wire the feedback service to an environment-configurable endpoint (use app config/env var). For now, implement a fallback that logs the payload to console and resolves successfully so the UI flow can be tested without backend.

### Header placement details & behavior

- Placement: center region of the header — align horizontally with Home and Theme buttons. If header layout cannot accommodate a centered control, place it in the header actions area closest to center while preserving header balance.
- Responsiveness: keep icon only look like other buttons in the header.
- Accessibility: the header button is keyboard-focusable, has aria-haspopup="dialog" and aria-expanded toggled. When the dialog opens focus moves into the dialog; when closed focus returns to the header button.

### Accessibility

- Ensure dialog has role="dialog" and aria-modal="true" with an accessible label.
- Focus should move to the first input when dialog opens and return to the feedback button when closed.
- ESC closes dialog. Tab should cycle inside the dialog (focus trap).

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Lint: `pnpm -C apps/web lint` (pending)

### Completion Notes List

- Placeholder: Implementation pending.

### File List (expected)

- apps/web/src/modules/feedback/components/feedback-button.tsx
- apps/web/src/modules/feedback/components/feedback-dialog.tsx
- apps/web/src/modules/feedback/feedback.service.ts
- apps/web/src/modules/feedback/**tests**/feedback-dialog.spec.tsx

### Change Log

- 2026-03-14: Story created for feedback button & dialog.

---

Refer to the [naming convention](../../naming-convention.md) for branch, PR, and task identifiers.
