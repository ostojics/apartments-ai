# Story: S-app-layer-01 – Application Layer Implementation

Status: not-started

## Description

Implement the application layer for core domain queries and commands. This includes:

- Tenant check query: Validates tenant existence and license status, returns tenant info (slug, id, name)
- Buildings query: Fetches all buildings for a given tenant id
- Knowledge base query: Fetches knowledge base for a given building id
- Promotion form command: Saves guest opt-in data for promotions/discounts
- Feedback command: Captures and saves feedback submissions

All handlers must follow existing architecture, dependency inversion, and codebase standards.

## Acceptance Criteria

- Tenant check query returns valid/invalid status and tenant info
- Buildings query returns all buildings for tenant id
- Knowledge base query returns knowledge base for building id
- Promotion form command saves opt-in data
- Feedback command saves feedback submissions
- All handlers follow architecture and codebase standards
- Tests are provided for all queries and commands

## Tasks & Subtasks

- [ ] **T-app-layer-01.1**: Analyze existing application layer patterns
- [ ] **T-app-layer-01.2**: Implement tenant check query and handler
- [ ] **T-app-layer-01.3**: Implement buildings query and handler
- [ ] **T-app-layer-01.4**: Implement knowledge base query and handler
- [ ] **T-app-layer-01.5**: Implement promotion form command and handler
- [ ] **T-app-layer-01.6**: Implement feedback command and handler
- [ ] **T-app-layer-01.7**: Add tests for all queries and commands
- [ ] **T-app-layer-01.8**: Commit changes following naming convention

---

## Dev Notes

### References

- `libs/application/queries/`
- `libs/application/commands/`
- `libs/application/handlers/`
- `libs/domain/entities/`
- [naming-convention.md](../naming-convention.md)

### Project Structure Notes

- Use dependency inversion for all handlers
- Follow codebase standards for queries/commands

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Placeholder: Implementation pending.

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- libs/application/queries/tenant-check.query.ts
- libs/application/queries/buildings.query.ts
- libs/application/queries/knowledge-base.query.ts
- libs/application/commands/promotion-form.command.ts
- libs/application/commands/feedback.command.ts
- libs/application/handlers/

### Change Log

- 2026-01-18: Story created for application layer implementation.

---

Refer to the [naming convention](../naming-convention.md) for branch, PR, and task identifiers.
