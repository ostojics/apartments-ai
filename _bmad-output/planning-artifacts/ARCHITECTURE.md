# Apartments AI Architecture and Design Patterns

## Multi-Tenant Architecture Overview

Apartments AI is designed as a multi-tenant SaaS platform. The architecture supports multiple tenants, each with isolated data and custom configurations, while sharing the same application codebase.

- **Tenant Isolation:**
  - Each tenant is identified by a unique subdomain (e.g., `tenant1.apartments.ai`).
  - All tenant-specific database records include a `tenant_id` field for strict data partitioning.
  - Application logic enforces tenant boundaries at all layers (API, service, persistence).

- **Subdomain Routing:**
  - The frontend and backend route requests based on the subdomain, resolving the current tenant context for every request.

- **Database Strategy:**
  - Single database with tenant-aware tables (using `tenant_id`), or optionally schema-per-tenant for advanced isolation.
  - All queries and mutations are filtered/scoped by `tenant_id`.

---

## Backend: Core Project

The `core` project is a backend service built with [NestJS](https://nestjs.com/), following Domain-Driven Design (DDD), modular monolith, and clean architecture principles.

### Folder Structure & Organization

```
apps/core/
├── .env, .env.example         # Environment configuration
├── Dockerfile                 # Containerization
├── eslint.config.mjs          # Linting configuration
├── jest.integration.config.ts # Integration test config
├── nest-cli.json              # NestJS CLI config
├── package.json               # Project dependencies and scripts
├── tsconfig*.json             # TypeScript configuration
├── src/
│   ├── app.module.ts          # Root NestJS module
│   ├── app.service.ts         # Root service (if any global logic)
│   ├── main.ts                # Application entry point
│   ├── common/                # Shared enums, config, and utilities
│   ├── libs/                  # DDD layers: application, domain, infrastructure
│   ├── migrations/            # Database migrations
│   ├── modules/               # Feature modules (accounts, categories, ...)
│   └── tools/                 # Swagger DTOs and API docs
```

#### Key Directories

- **common/**: Enums, configuration files, and shared logic.
- **libs/**: Core DDD layers, further split into:
  - `application/`: Application services, use cases, and ports (interfaces).
  - `domain/`: Domain entities, value objects, events, exceptions, commands, queries.
  - `infrastructure/`: Implementations for persistence, logging, etc.
- **modules/**: Each business domain (e.g., accounts, categories, users) is a self-contained module with its own `application/`, `domain/`, and `infrastructure/` subfolders, following the DDD and modular monolith approach.
- **migrations/**: TypeORM or similar migration scripts for database schema changes.
- **tools/swagger/**: Swagger DTOs for API documentation.

#### Multi-Tenancy Implementation

- **Tenant Context Middleware:** Extracts tenant from subdomain and injects `tenant_id` into request context.
- **Tenant-Aware Repositories:** All repositories and queries are scoped by `tenant_id`.
- **Data Models:** All tenant-specific tables include a `tenant_id` column.
- **Migrations:** Ensure all new tables include `tenant_id` where appropriate.

---

### Methodology & Patterns

- **Domain-Driven Design (DDD):** Entities, Value Objects, Aggregates, Repositories, Domain Events, Commands/Queries (CQRS).
- **Modular Monolith:** Each feature is a NestJS module under `modules/`, encapsulating its own logic, dependencies, and DDD layers.
- **Clean Architecture / Hexagonal Architecture:** Ports and Adapters, Dependency Inversion.
- **Multi-Tenancy:** Tenant context propagation, tenant-aware data access, subdomain-based routing.
- **Configuration Management:** Centralized in `common/config/` with environment-based settings.
- **Testing:** Integration tests via Jest, unit/integration tests per module.
- **API Documentation:** Swagger DTOs in `tools/swagger/` for OpenAPI documentation.

---

### Libraries & Technologies

- **NestJS**, **TypeORM** (or similar), **Jest**, **Swagger**, **ESLint**, **Docker**, **Throttler**, **PostHog** (analytics), etc.

---

### Design Principles

- **Separation of Concerns**, **Encapsulation**, **Scalability**, **Testability**, **Maintainability**, **Tenant Isolation**

---

### Example: Module Structure

```
modules/
  accounts/
    application/
    domain/
    infrastructure/
```

---

## Frontend: Web Project

The `web` project is a modern frontend application built with [React](https://react.dev/) and [Vite](https://vitejs.dev/), following modular, scalable, and maintainable design principles. It leverages component-driven development, hooks, and a clear separation of concerns.

### Multi-Tenancy in Frontend

- **Subdomain Awareness:**
  - The frontend detects the current tenant from the subdomain and passes the tenant context to all API requests.
  - UI and branding can be customized per tenant.

- **API Requests:**
  - All API requests include tenant context (e.g., in headers or as part of the payload).

---

### Folder Structure & Organization

```
apps/web/
├── .env, .env.example         # Environment configuration
├── Dockerfile                 # Containerization
├── eslint.config.js           # Linting configuration
├── index.html                 # HTML entry point
├── nginx.conf                 # Nginx config for deployment
├── package.json               # Project dependencies and scripts
├── playwright.config.ts       # E2E test config
├── tsconfig*.json             # TypeScript configuration
├── vite.config.ts             # Vite build config
├── public/                    # Static assets
├── src/
│   ├── app.tsx                # App root component
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles
│   ├── router.tsx             # App routing
│   ├── app/                   # Feature-level components/pages
│   ├── assets/                # Images, icons, etc.
│   ├── common/                # Shared constants, types, utilities
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── modules/               # Feature modules (accounts, categories, ...)
│   ├── msw/                   # Mock Service Worker setup for API mocking
│   ├── pwa/                   # Progressive Web App support
│   ├── routes/                # Route definitions
```

#### Key Directories

- **app/**: Feature-level pages and containers (e.g., dashboard).
- **assets/**: Static assets (images, icons, etc.).
- **common/**: Shared constants, types, and utilities.
- **components/**: Reusable UI components (sidebar, nav, dialogs, etc.), with further subfolders for UI primitives.
- **hooks/**: Custom React hooks for encapsulating logic (e.g., `use-mobile`, `use-before-unload`).
- **lib/**: Utility functions and helpers.
- **modules/**: Feature modules, each encapsulating logic for a specific domain (accounts, categories, etc.).
- **msw/**: Mock Service Worker for API mocking in development and testing.
- **pwa/**: PWA support (service workers, manifests).
- **routes/**: Route definitions and helpers.

---

### Methodology & Patterns

- **Component-Driven Development**: UI is built from small, reusable components.
- **Feature Modules**: Each domain (accounts, categories, etc.) is encapsulated in its own module for scalability and maintainability.
- **Hooks**: Custom React hooks encapsulate reusable logic and side effects.
- **Separation of Concerns**: Clear distinction between UI, logic, and data fetching.
- **Testing**: Uses Playwright for E2E tests, MSW for API mocking.
- **PWA**: Progressive Web App support for offline and installable experiences.
- **Type Safety**: TypeScript throughout for type safety and maintainability.
- **Multi-Tenancy:** Subdomain-based tenant context, tenant-aware API requests, customizable UI per tenant.

---

### Libraries & Technologies

- **React**: Main UI library.
- **Vite**: Fast build tool and dev server.
- **TypeScript**: Type safety.
- **Playwright**: E2E testing.
- **MSW**: Mock Service Worker for API mocking.
- **TanStack Router**: Advanced routing (if used).
- **ESLint**: Linting and code quality.
- **Docker**: Containerization for deployment.
- **Nginx**: Static file serving in production.

---

### Design Principles

- **Reusability**: Components and hooks are designed for reuse.
- **Encapsulation**: Feature modules encapsulate their logic and UI.
- **Scalability**: Modular structure allows for easy addition of new features.
- **Testability**: E2E and unit tests ensure reliability.
- **Maintainability**: Consistent structure and best practices reduce technical debt.
- **Tenant Awareness**: UI and logic adapt to tenant context.

---

### Example: Feature Module Structure

```
modules/
  accounts/
    # Account-related components, hooks, and logic
  categories/
    # Category-related components, hooks, and logic
```

---

## Summary

Apartments AI is architected for multi-tenant SaaS, with strict tenant isolation, subdomain-based routing, and tenant-aware data access. The backend leverages DDD and modular monolith patterns with NestJS, while the frontend is a modern, modular React application with strong separation of concerns, component-driven development, and robust multi-tenancy support.
