# Epic: Domain Layer Alignment – Core Project

Status: not-started

## Description

Align the domain layer of the core project with the Apartments AI product requirements and database migrations. This includes entities, value objects, domain events, and repository interfaces for all relevant modules (licenses, tenants, feedback, buildings, knowledge bases). Remove or refactor any domain logic that does not fit the product.

## Acceptance Criteria

- Only modules/entities matching product requirements and migrations are present in the domain layer.
- All domain artifacts (entities, value objects, events, repository interfaces) follow the conventions of existing files.
- Unneeded modules/entities (e.g., households, users) are removed from the domain layer.
- Each required module has a dedicated story file for its domain layer implementation or adjustment.

## Tasks & Subtasks

- [ ] Review and remove unneeded domain modules/entities
- [ ] Adjust licenses domain layer to match product/migration
- [ ] Implement tenants domain layer
- [ ] Implement feedback domain layer
- [ ] Implement buildings domain layer
- [ ] Implement knowledge_bases domain layer
- [ ] Ensure all domain artifacts follow conventions
- [ ] Commit changes following naming convention

---

## Dev Notes

### References

- [prd-host-elite-2026-01-16.md](../prd-host-elite-2026-01-16.md)
- [naming-convention.md](../naming-convention.md)
- Example domain files in `apps/core/src/modules/licenses/domain/`

### Project Structure Notes

- All domain logic (entities, value objects, events, repository interfaces) should be in the `domain` folder of each module.
- Remove or refactor any domain logic not matching the product.

---

Refer to the [naming convention](../naming-convention.md) for branch, PR, and task identifiers.
