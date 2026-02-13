# Story: S-domain-01 – Align Licenses Domain Layer

Status: not-started

## Description

Refactor the licenses domain layer to match the HostElite product requirements and the CreateLicenses migration. Remove or adjust any fields, value objects, events, or repository interfaces that do not fit the product. Ensure all domain artifacts follow the conventions of the existing files.

## Acceptance Criteria

- `license.entity.ts` matches the migration (id, key, valid_date, used_at, allowed_buildings, metadata)
- Only relevant value objects, events, and repository interfaces are present
- All code follows the conventions of the existing licenses domain files
- Unneeded logic is removed

## Tasks & Subtasks

- [ ] **T-domain-01.1**: Review acceptance criteria
- [ ] **T-domain-01.2**: Analyze existing domain files for licenses
- [ ] **T-domain-01.3**: Update or refactor `license.entity.ts`
- [ ] **T-domain-01.4**: Remove/adjust value objects, events, and repository interfaces as needed
- [ ] **T-domain-01.5**: Ensure code follows conventions
- [ ] **T-domain-01.6**: Test and verify domain logic
- [ ] **T-domain-01.7**: Commit changes following naming convention

---

## Dev Notes

### References

- [prd-host-elite-2026-01-16.md](../prd-host-elite-2026-01-16.md)
- [naming-convention.md](../naming-convention.md)
- Example domain files in `apps/core/src/modules/licenses/domain/`

### Project Structure Notes

- All domain logic (entities, value objects, events, repository interfaces) should be in the `domain` folder of the licenses module.
- Remove or refactor any domain logic not matching the product.

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Lint: `pnpm -C apps/core lint` (pending)

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- apps/core/src/modules/licenses/domain/license.entity.ts (expected)
- apps/core/src/modules/licenses/domain/value-objects/ (if needed)
- apps/core/src/modules/licenses/domain/repositories/ (if needed)
- apps/core/src/modules/licenses/domain/events/ (if needed)

### Change Log

- 2026-01-17: Story created for licenses domain layer alignment.

---

Refer to the [naming convention](../naming-convention.md) for branch, PR, and task identifiers.
