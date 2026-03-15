AGENTS — Repository Agent Guide

This file gives agentic coding assistants (and humans) the exact commands, styles and conventions
to build, lint, test and contribute to this monorepo. Follow these rules to keep changes consistent
and easy to review.

1. Quick commands (root)

- Install: `pnpm install`
- Dev (start all dev tasks via turbo): `pnpm dev`
- Build everything: `pnpm build` (runs `turbo run build`)
- Lint everything: `pnpm lint` (runs `turbo run lint`)
- Format all JS/TS/MD: `pnpm format` (uses Prettier)
- Run pre-commit formatter locally: `pnpm precommit` (runs pretty-quick on staged files)

2. Per-package / useful package commands

- apps/core (NestJS + Jest)
  - Start dev server: `pnpm --filter @host-elite/core dev` or `pnpm --filter @host-elite/core start:debug`
  - Build: `pnpm --filter @host-elite/core build`
  - Lint: `pnpm --filter @host-elite/core lint`
  - Test (all): `pnpm --filter @host-elite/core test`
  - Test (watch): `pnpm --filter @host-elite/core test:watch`
  - Test (coverage): `pnpm --filter @host-elite/core test:cov`
  - Debug a single run: `pnpm --filter @host-elite/core test:debug`

- apps/web (Vite + React)
  - Start dev server: `pnpm --filter @host-elite/web dev`
  - Build: `pnpm --filter @host-elite/web build`
  - Lint: `pnpm --filter @host-elite/web lint`
  - Preview build: `pnpm --filter @host-elite/web preview`

3. Running a single test (common patterns)

- Jest (single test file): from repo root run the package test script and pass the path to jest:

  Example (run single file spec in core):

  ```bash
  pnpm --filter @host-elite/core test -- src/some/module/my-feature.spec.ts
  ```

- Jest (single test by name): use `-t` (or `--testNamePattern`) to match a test name:

  ```bash
  pnpm --filter @host-elite/core test -- -t "should create user with valid email"
  ```

- Jest (run in band / CI-friendly):
  ```bash
  pnpm --filter @host-elite/core test -- --runInBand
  ```

Notes: tests in `apps/core` use `ts-jest` and root config in the package.json of that package. If you need
to run jest binary directly (rare), `pnpm --filter @host-elite/core exec jest -- <args>` can be used.

4. Linting and formatting rules

- Project uses shared ESLint and TypeScript configs in `tooling/` (`@host-elite/linting`, `@host-elite/tsconfig`).
- Source of truth for formatting: Prettier. Always run `pnpm format` before committing large changes.
- Husky pre-commit runs `pretty-quick --staged` to auto-format staged files.
- Run `pnpm --filter <pkg> lint` to fix and surface ESLint problems for a package.

5. Imports and module style

- Use ES module syntax (`import ... from ...`) across the repo.
- Group imports in this order with a single blank line between groups:
  1. Node / built-ins
  2. External packages (third‑party)
  3. Internal packages (workspace packages like `@host-elite/*`)
  4. Parent / sibling / index files (relative imports)
- Use path aliases only when configured in the package's `tsconfig.json`. Prefer explicit relative paths for local components unless alias exists.
- Avoid deep relative chains like `../../../..` — consider moving shared code to `packages/`.

6. TypeScript & types

- Prefer strong typing: avoid `any`. Use `unknown` for raw/untyped inputs and narrow ASAP.
- Exported functions and public API surfaces should have explicit return types.
- Use `readonly` on arrays/objects for immutable intent when appropriate.
- Prefer `type` for unions/aliases and `interface` for shape definitions when extending is needed.
- Use Zod where validation is required (zod is already a dependency). Validate external inputs at the boundary.

7. Naming conventions

- Files: kebab-case for filenames (e.g. `user-service.ts`), except React components which may be `PascalCase.tsx`.
- Types / classes / components: PascalCase. Example: `CreateUserDto`, `ApartmentList`.
- Variables / functions / properties: camelCase.
- Constants: UPPER_SNAKE_CASE for shared global constants exported from a module. Prefer `const DEFAULT_TIMEOUT_MS = 5000`.
- Branch/PR names: follow `E-`/`S-`/`T-` naming used by project planning (see `_bmad-output/planning-artifacts/naming-convention.md`).

8. Error handling and logging

- Do not swallow errors silently. Always either handle or rethrow.
- For NestJS controllers/services: throw framework exceptions (`BadRequestException`, `NotFoundException`, etc.) or use a global exception filter.
- For library/internal code: return Result-style objects or throw Error with a descriptive message; prefer custom Error classes when behavior differs.
- When catching unknown errors, narrow them before using; treat caught errors as `unknown` and check properties or use helper `toError`.
- Log structured events using `pino` (used in `apps/core`) — include context (request id, user id) when available.

9. Tests and test hygiene

- Tests live next to code in `src` or under `test/` and follow the Jest pattern `*.spec.ts` in `apps/core`.
- Keep test setup lightweight: use MSW for HTTP mocking in `apps/web`; use `@testcontainers/*` for integration needs in `apps/core`.
- Use factories/fixtures from `_bmad/bmm/testarch/` when applicable to keep fixtures consistent.
- Mark slow/integration tests clearly (use jest config or naming) and exclude them from fast unit runs unless requested.

10. Pull requests / commits

- Keep PRs small and focused. Include the relevant E-/S-/T- identifier in the title or description.
- Run `pnpm build`, `pnpm lint`, and `pnpm test` locally for affected packages before opening a PR.
- Squash logically related commits; avoid altering unrelated files.

11. Tooling notes

- ESLint configs are in `tooling/eslint` and exported as `@host-elite/linting` used across packages. Extend as needed.
- Shared tsconfig is in `tooling/typescript` and exported as `@host-elite/tsconfig`.
- The monorepo uses pnpm (see `packageManager` in root package.json). Node >=24.12.0 is required.

12. Cursor / Copilot rules

- Cursor rules: no `.cursor/rules/` or `.cursorrules` were found in the repo root; none to apply.
- GitHub Copilot instructions: no `.github/copilot-instructions.md` found. There are branch names with `copilot/*` in git history, but no repository-level instructions file.

13. When you are stuck — quick checklist

- Did you run `pnpm install` and `pnpm build`? Build is required for compiled internal packages.
- Check `tooling/eslint` and the package `package.json` for per-package scripts.
- If a test fails flakily: run with `--runInBand` and add `--detectOpenHandles` when diagnosing resource leaks.

14. Where to look for conventions and design decisions

- Shared linting rules: `tooling/eslint/base.js` and `tooling/eslint/react.js`
- Shared tsconfig: `tooling/typescript/base.json` and `tooling/typescript/internal-package.json`
- Naming convention: `_bmad-output/planning-artifacts/naming-convention.md`

Keep this file updated when tooling or conventions change. Agents should treat it as the canonical quick-reference for working in this repository.
