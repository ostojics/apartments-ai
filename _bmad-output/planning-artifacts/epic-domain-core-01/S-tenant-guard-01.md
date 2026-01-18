# Story: S-tenant-guard-01 – Tenant Guard Implementation

Status: not-started

## Description

Implement a guard that validates tenant access for every request. The guard must:

- Extract the tenant slug from the host header (subdomain)
- Check if the tenant exists
- Validate that the tenant's license is not expired
- Throw domain exceptions for missing tenant or expired license
- Follow existing architecture and dependency inversion patterns
- Export an interface extending Express Request with tenant info (tenant id, tenant slug)
- Place guard in `common/guards`

## Acceptance Criteria

- Guard extracts tenant slug from host header
- Guard checks tenant existence and license validity
- Throws domain exceptions for missing tenant or expired license
- Follows dependency inversion and architecture standards
- Exports interface extending Express Request with tenant info
- Guard is located in `common/guards`

## Tasks & Subtasks

- [ ] **T-tenant-guard-01.1**: Analyze existing guard and domain exception patterns
- [ ] **T-tenant-guard-01.2**: Implement tenant guard logic
- [ ] **T-tenant-guard-01.3**: Create domain exceptions for tenant and license
- [ ] **T-tenant-guard-01.4**: Export extended Express Request interface
- [ ] **T-tenant-guard-01.5**: Add tests for guard and exceptions
- [ ] **T-tenant-guard-01.6**: Commit changes following naming convention

---

## Dev Notes

### References

- `common/guards/`
- `libs/domain/exceptions/`
- `libs/domain/entities/`
- [naming-convention.md](../naming-convention.md)

### Project Structure Notes

- Use dependency inversion for tenant/license checks
- Place guard in `common/guards`

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Placeholder: Implementation pending.

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- common/guards/tenant.guard.ts
- libs/domain/exceptions/tenant.exception.ts
- libs/domain/exceptions/license.exception.ts
- libs/domain/entities/tenant.entity.ts

### Change Log

- 2026-01-18: Story created for tenant guard implementation.

---

Refer to the [naming convention](../naming-convention.md) for branch, PR, and task identifiers.
