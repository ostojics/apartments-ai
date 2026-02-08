# Building Info Integration - Architecture Diagram

## Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                          User Interface Layer                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │         ApartmentPage Component                             │    │
│  │                                                              │    │
│  │  const {data, isLoading, error} = useBuildingInfo(slug)    │    │
│  │                                                              │    │
│  │  ┌──────────────────┐    ┌──────────────────┐             │    │
│  │  │ Loading State:   │    │ Success State:   │             │    │
│  │  │ Show fallback    │    │ Show building    │             │    │
│  │  │ apartment ID     │    │ name from API    │             │    │
│  │  └──────────────────┘    └──────────────────┘             │    │
│  │                                                              │    │
│  │  ┌──────────────────────────────────────────┐             │    │
│  │  │ Error State: Show Alert component        │             │    │
│  │  └──────────────────────────────────────────┘             │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │         ApartmentManualTab Component                        │    │
│  │                                                              │    │
│  │  const {data, isLoading, error} = useBuildingInfo(slug)    │    │
│  │                                                              │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │    │
│  │  │ Loading:     │  │ Error:       │  │ Success:        │ │    │
│  │  │ Show spinner │  │ Show alert   │  │ Render markdown │ │    │
│  │  └──────────────┘  └──────────────┘  └─────────────────┘ │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                       │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │
                                    │ Uses
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Custom Hook Layer                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │         useBuildingInfo(slug)                               │    │
│  │                                                              │    │
│  │  • React Query wrapper                                      │    │
│  │  • Returns: { data, isLoading, error, ... }                │    │
│  │  • Query Key: ['building-info', slug]                      │    │
│  │  • Automatic caching & background refetch                  │    │
│  │                                                              │    │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │ Calls
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          API Layer                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │         buildings-api.ts                                    │    │
│  │                                                              │    │
│  │  getBuildingInfo(slug: string)                             │    │
│  │                                                              │    │
│  │  • Endpoint: GET /v1/buildings/{slug}                      │    │
│  │  • Returns: Promise<BuildingInformationResponseDTO>        │    │
│  │  • Uses: httpClient (ky wrapper)                           │    │
│  │  • Headers: Accept-Language (auto), Credentials            │    │
│  │                                                              │    │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │ HTTP Request
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     HTTP Client Layer                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │         httpClient (ky)                                     │    │
│  │                                                              │    │
│  │  • Base URL: API_URL                                       │    │
│  │  • Credentials: include                                    │    │
│  │  • Auto-inject Accept-Language header                     │    │
│  │  • Request/Response interceptors                          │    │
│  │                                                              │    │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                   ┌───────────┴───────────┐
                   │                       │
                   ▼                       ▼
          ┌─────────────────┐    ┌─────────────────┐
          │  Development    │    │   Production    │
          │  (MSW Mocks)    │    │  (Real API)     │
          ├─────────────────┤    ├─────────────────┤
          │                 │    │                 │
          │ apartments-     │    │ Backend API     │
          │ handlers.ts     │    │ /v1/buildings/  │
          │                 │    │     {slug}      │
          │ Returns mock    │    │                 │
          │ building data   │    │ Returns real    │
          │                 │    │ building data   │
          └─────────────────┘    └─────────────────┘

```

## Type Definitions Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    @apartments-ai/contracts Package                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  packages/contracts/src/schemas/buildings.ts                        │
│                                                                       │
│  buildingInformationResponseSchema = z.object({                     │
│    data: z.object({                                                  │
│      content: z.string(),                                            │
│      name: z.string(),                                               │
│    }),                                                                │
│  });                                                                  │
│                                                                       │
│  type BuildingInformationResponseDTO = z.infer<typeof ...>          │
│                                                                       │
└───────────────────────────────┬───────────────────────────────────────┘
                                │ Imported by
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Web Application                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  import type {BuildingInformationResponseDTO} from '@apartments-ai/contracts'│
│                                                                       │
│  • Used in: buildings-api.ts                                        │
│  • Provides: Full type safety                                       │
│  • Ensures: API contract compliance                                 │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## State Management

```
┌─────────────────────────────────────────────────────────────────────┐
│                     React Query Cache                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Query Key: ['building-info', 'apartment-123']                      │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │ Status: 'loading' | 'error' | 'success'                  │      │
│  │                                                            │      │
│  │ Data: {                                                   │      │
│  │   data: {                                                 │      │
│  │     content: "# Building Info...",                        │      │
│  │     name: "Apartment 123"                                 │      │
│  │   }                                                        │      │
│  │ }                                                          │      │
│  │                                                            │      │
│  │ Error: null | Error                                       │      │
│  │                                                            │      │
│  │ Last Fetched: timestamp                                   │      │
│  │ Stale Time: default (0)                                   │      │
│  │ Cache Time: 5 minutes                                     │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Render States

```
┌───────────────────────────────────────────────────────────────────────┐
│                    ApartmentPage Header                                │
├───────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Initial Render                                                        │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │ isLoading: true                                              │     │
│  │ <h1>Apartment {apartmentId}</h1>                            │     │
│  └─────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  After Fetch (Success)                                                 │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │ isLoading: false, data: {...}                                │     │
│  │ <h1>{buildingInfo.data.name}</h1>                           │     │
│  └─────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  After Fetch (Error)                                                   │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │ isLoading: false, error: {...}                               │     │
│  │ <h1>Apartment {apartmentId}</h1>                            │     │
│  │ <Alert variant="destructive">Error message</Alert>          │     │
│  └─────────────────────────────────────────────────────────────┘     │
│                                                                         │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                    ApartmentManualTab                                  │
├───────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Initial Render (Loading)                                              │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │ <div>                                                        │     │
│  │   <Loader2 className="animate-spin" />                      │     │
│  │ </div>                                                       │     │
│  └─────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  After Fetch (Success)                                                 │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │ <Markdown>                                                   │     │
│  │   {buildingInfo.data.content}                               │     │
│  │ </Markdown>                                                  │     │
│  └─────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  After Fetch (Error)                                                   │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │ <Alert variant="destructive">                                │     │
│  │   Failed to load building information                        │     │
│  │ </Alert>                                                     │     │
│  └─────────────────────────────────────────────────────────────┘     │
│                                                                         │
└───────────────────────────────────────────────────────────────────────┘
```

## File Structure

```
apps/web/src/
├── modules/
│   ├── api/
│   │   ├── buildings-api.ts          ← NEW (API functions)
│   │   ├── query-keys.ts             ← MODIFIED (added buildingInfo key)
│   │   ├── http-client.ts
│   │   └── ...
│   │
│   └── apartments/
│       ├── hooks/
│       │   ├── use-building-info.ts  ← NEW (custom hook)
│       │   └── ...
│       │
│       └── components/
│           ├── apartment.page.tsx    ← MODIFIED (header integration)
│           ├── apartment-manual-tab.tsx ← MODIFIED (content integration)
│           └── ...
│
└── mocks/
    └── handlers/
        └── apartments-handlers.ts    ← MODIFIED (added mock handler)

packages/contracts/src/
└── schemas/
    └── buildings.ts                  ← EXISTS (type definitions)
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Error Scenarios                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Network Error                                                        │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │ 1. User navigates to /apartments/test-apartment          │      │
│  │ 2. useBuildingInfo hook initiates request                │      │
│  │ 3. Network fails (no connection, timeout, etc.)          │      │
│  │ 4. React Query catches error                             │      │
│  │ 5. error object populated in hook return                 │      │
│  │ 6. Component renders error Alert                         │      │
│  │ 7. User sees: "Failed to load building information"     │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                       │
│  API Error (4xx/5xx)                                                 │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │ 1. Request sent to API                                   │      │
│  │ 2. API returns 404/500/etc                               │      │
│  │ 3. ky throws HTTPError                                   │      │
│  │ 4. React Query catches error                             │      │
│  │ 5. Same error handling as network error                  │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                       │
│  Invalid Data                                                         │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │ 1. Request succeeds but data shape is wrong             │      │
│  │ 2. TypeScript compilation would catch this              │      │
│  │ 3. Runtime: undefined access causes error                │      │
│  │ 4. Nullish coalescing (??) provides safe fallback       │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Legend

```
┌─────────────────────────────────────────────┐
│ Symbol     Meaning                          │
├─────────────────────────────────────────────┤
│ ┌─┐        Component/Module boundary       │
│ ▼          Data flow direction              │
│ ←          Modified existing file           │
│ ← NEW      New file created                 │
│ ...        Existing code (not shown)        │
└─────────────────────────────────────────────┘
```

---

This architecture follows:
✅ Separation of concerns
✅ Unidirectional data flow
✅ Type safety throughout
✅ Error boundary patterns
✅ React best practices
