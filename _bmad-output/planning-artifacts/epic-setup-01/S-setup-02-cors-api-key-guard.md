# Story: S-setup-02 – Core Service CORS & API Key Guard

Status: not-started

## Description

Implement secure CORS configuration and an API Key Guard for the core service. The CORS setup should restrict origins to the main application domain and all its subdomains, configurable via the `.env` file. Additionally, introduce an API Key Guard similar to `TenantGuard`, which validates the `x-api-key` header against a value from `.env` and can be toggled on/off via configuration.

## Acceptance Criteria

- CORS configuration:
  - Allowed origins are set via `.env` (e.g., `APP_DOMAIN` or similar)
  - All subdomains of the main domain are allowed (e.g., `*.apartments.ai`)
  - No wildcard (`*`) CORS in production
  - CORS config is loaded via `ConfigService` and `app.config.ts`
- API Key Guard:
  - Checks `x-api-key` header against `.env` value
  - If key does not match, returns Unauthorized exception
  - Reads `ENABLE_KEY_GUARD` from `.env` to enable/disable guard
  - Uses `ConfigService` for config
  - Can be applied to routes/modules like `TenantGuard`
- All config values are documented in `app.config.ts`
- All changes are tested and verified
- Follows naming conventions for branches, PRs, and tasks

## Tasks & Subtasks

- [ ] **T-setup-02.1**: Review acceptance criteria
- [ ] **T-setup-02.2**: Extend `app.config.ts` for CORS and API key config
- [ ] **T-setup-02.3**: Update CORS setup in `main.ts` to use config and restrict origins
- [ ] **T-setup-02.4**: Implement API Key Guard with config toggle
- [ ] **T-setup-02.5**: Document new `.env` variables
- [ ] **T-setup-02.6**: Test CORS and API Key Guard functionality
- [ ] **T-setup-02.7**: Commit changes following naming convention

---

## Dev Notes

### References

- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [tenant.guard.ts](../../../../apps/core/src/common/guards/tenant.guard.ts)

### Project Structure Notes

- Ensure config is loaded via `ConfigService` and `app.config.ts`
- Guard should be reusable and testable

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Lint: `pnpm -C apps/core lint` (pending)

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- apps/core/src/config/app.config.ts
- apps/core/src/main.ts
- apps/core/src/common/guards/api-key.guard.ts (expected)

### Change Log

- 2026-01-27: Story created for CORS and API Key Guard setup.

---

Refer to the [naming convention](../../naming-convention.md) for branch, PR, and task identifiers.
