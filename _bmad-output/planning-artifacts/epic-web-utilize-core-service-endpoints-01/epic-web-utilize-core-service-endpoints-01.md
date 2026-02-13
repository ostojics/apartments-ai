# Epic: Web App — Utilize Core Service Endpoints

**Epic ID:** epic-web-utilize-core-service-endpoints-01  
**Status:** Draft  
**Owner:** Product Manager  
**Created:** 2026-01-24

## Objective

Integrate the HostElite web application with the core backend service endpoints to enable tenant validation, display a list of buildings, and fetch detailed building information on the apartment page. This will ensure the web frontend is fully powered by live backend data, improving accuracy, security, and user experience.

## Scope

- **Tenant Check Endpoint:**
  - Validate user/tenant context before accessing apartment features.
- **Buildings List Endpoint:**
  - Retrieve and display a list of available buildings for the user.
- **Get Building Info by ID Endpoint:**
  - Fetch and present detailed information for a selected building on the apartment page.

## Motivation

- Ensure the web app reflects real-time backend data.
- Enforce tenant-based access and security.
- Lay the foundation for future features that depend on backend integration.

## Acceptance Criteria

- The web app must call the tenant check endpoint before allowing access to apartment features.
- The buildings list is fetched from the backend and displayed to the user.
- Selecting a building fetches its details from the backend and displays them on the apartment page.
- Proper error handling and loading states are implemented for all API calls.

## Dependencies

- Core service endpoints must be available and documented.
- Web app must have access to authentication/session context for tenant check.

## Out of Scope

- UI redesigns not related to data integration.
- Backend changes to the endpoints themselves.

## Related Artifacts

- [ARCHITECTURE.md](../ARCHITECTURE.md)
- [prd-host-elite-2026-01-16.md](../prd-host-elite-2026-01-16.md)

---

## Stories

- S-web-01-tenant-check.md
- S-web-02-buildings-list.md
- S-web-03-building-info-by-id.md
