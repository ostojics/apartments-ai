# Story: S-domain-06 – Building Information Entity & Table

Status: not-started

## Description

Introduce a new entity and table for building information in the Apartments AI core domain. The new `building_information` table will store localized content for knowledge bases, supporting multiple languages per knowledge base. The entity and table will be named `BuildingInformation`. Remove the `information` field from the knowledge bases entity and table as part of this migration.

## Acceptance Criteria

- New `building_information` table with fields:
  - id (uuid, primary key)
  - locale (text)
  - knowledge_base_id (foreign key)
  - content (text)
  - created_at timestampz default now
- New `BuildingInformation` entity in the domain layer
- New module folder for information in the core project
- Migration created for the new table and for removing `information` from knowledge bases (update `CreateKnowledgeBases1758657000400`)
- Domain logic and artifacts follow project conventions
- All code and migrations are tested and verified

## Tasks & Subtasks

- [ ] **T-domain-06.1**: Review acceptance criteria
- [ ] **T-domain-06.2**: Create new module folder for information in core project
- [ ] **T-domain-06.3**: Design and implement `BuildingInformation` entity in domain layer
- [ ] **T-domain-06.4**: Create migration for `building_information` table
- [ ] **T-domain-06.5**: Remove `information` from knowledge bases entity and table in `CreateKnowledgeBases1758657000400`
- [ ] **T-domain-06.6**: Implement repository interfaces and value objects as needed
- [ ] **T-domain-06.7**: Test and verify new domain logic and migrations
- [ ] **T-domain-06.8**: Commit changes following naming convention

---

## Dev Notes

### References

- [prd-apartments-ai-2026-01-16.md](../prd-apartments-ai-2026-01-16.md)
- [naming-convention.md](../naming-convention.md)
- Example domain files in `apps/core/src/modules/`

### Project Structure Notes

- All domain logic (entities, value objects, events, repository interfaces) should be in the `domain` folder of the information module.
- Remove or refactor any domain logic not matching the product.

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Lint: `pnpm -C apps/core lint` (pending)

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- apps/core/src/modules/information/domain/building-information.entity.ts (expected)
- apps/core/src/modules/information/domain/value-objects/ (if needed)
- apps/core/src/modules/information/domain/repositories/ (if needed)
- apps/core/src/modules/information/domain/events/ (if needed)
- apps/core/src/modules/information/infrastructure/migrations/ (expected)
- apps/core/src/modules/knowledge-bases/infrastructure/migrations/1758657000400-CreateKnowledgeBases.ts (update)

### Change Log

- 2026-01-21: Story created for building information entity and table.

---

Refer to the [naming convention](../naming-convention.md) for branch, PR, and task identifiers.
