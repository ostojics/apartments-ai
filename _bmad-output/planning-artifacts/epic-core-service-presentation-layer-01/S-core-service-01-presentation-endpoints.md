# Story: S-core-service-01-presentation-endpoints

**Epic:** Core Service Presentation Layer
**Created:** 2026-01-22

## Objective

Implement the presentation (controller/API) layer for the core service, exposing the following endpoints:

### Endpoints

#### 1. GET `/v1/tenants/check`

- **Purpose:** Check validity of the current tenant
- **Response:**
  ```json
  {
    "data": {
      "isValid": boolean,
      "tenant": {
        "id": string,
        "slug": string,
        "name": string
      }
    }
  }
  ```

#### 2. GET `/v1/tenants/buildings`

- **Purpose:** Get a list of buildings for the tenant
- **Response:**
  ```json
  {
    "data": [
      {
        "id": string,
        "name": string,
        "slug": string,
        "tenantId": string,
        "imageUrl": string | null,
        "address": string | null
      }
    ]
  }
  ```

#### 3. GET `/v1/buildings/{slug}`

- **Purpose:** Get building information by slug (must belong to tenant)
- **Response:**
  ```json
  {
    "data": {
      "content": string // building info for locale in user context from the request
    }
  }
  ```

#### 4. POST `/v1/promotions`

- **Purpose:** Receive promotion tabs submission and save for tenant
- **Response:** 201 Created

## Requirements

- Implement controllers in appropriate modules (tenants, buildings, promotions)
- Use existing application layer handlers where possible
- Use Zod schemas (in contracts lib) for request/response validation
- Use existing guards and pipes for tenant context and validation
- Controllers must use Swagger DTOs for documentation
- REST paths should be reviewed for best practices; suggest improvements if needed
- Controllers must be protected with the tenant guard

## Acceptance Criteria

- All endpoints implemented and tested
- Zod schemas exist for all request/response payloads
- Swagger documentation is present
- Tenant guard and validation pipes are applied
- RESTful path conventions are followed or improved

## Notes

- Reference existing story and epic files for structure and naming
- Coordinate with backend and contracts teams for schema alignment
- Example Zod schema usage:
  ```ts
  import {z} from 'zod';
  export const BuildingSummarySchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    tenantId: z.string(),
    imageUrl: z.string().nullable(),
    address: z.string().nullable(),
  });
  ```
- Use ZodValidationPipe for validation
- Use TenantGuard for all endpoints
