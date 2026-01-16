# Epic and User Stories: Public Chat MVP

## Epic

**ID:** E-public-chat-01  
**Title:** Public Chat MVP User Flow  
**Description:**  
Implement the end-to-end public chat experience for tenants and prospective renters, including tenant-specific branding, language selection, building selection, and chat interface, as described in the UX flows and requirements.

---

## User Stories

**S-public-chat-01**  
**As a** user,  
**I want to** access a tenant-specific URL and see the correct branding,  
**so that** I know I am in the right place for my apartment provider.

**Tasks:**

- T-public-chat-01-01: Implement routing for tenant-specific URLs
- T-public-chat-01-02: Fetch and display tenant branding (logo, colors, name) on landing page
- T-public-chat-01-03: Ensure branding persists across all screens

**S-public-chat-02**  
**As a** user,  
**I want to** select my preferred language,  
**so that** the interface and responses are in a language I understand.

**Tasks:**

- T-public-chat-02-01: Build language selection UI (dropdown/buttons)
- T-public-chat-02-02: Implement language switching for UI and responses
- T-public-chat-02-03: Persist language choice throughout session

**S-public-chat-03**  
**As a** user with multiple buildings,  
**I want to** select which building I am interested in,  
**so that** I get information relevant to that location.

**Tasks:**

- T-public-chat-03-01: Display building selection UI if multiple buildings exist
- T-public-chat-03-02: Skip selection if only one building
- T-public-chat-03-03: Ensure selected building context is used in chat

**S-public-chat-04**  
**As a** user,  
**I want to** interact with a chat interface without needing to log in,  
**so that** I can quickly ask questions about the apartment/building.

**Tasks:**

- T-public-chat-04-01: Design and implement chat UI (header, chat window, input box)
- T-public-chat-04-02: Integrate branding and building context into chat UI
- T-public-chat-04-03: Ensure no login/account is required for access

**S-public-chat-05**  
**As a** user,  
**I want to** receive accurate, context-aware answers from the AI about amenities, policies, and contacts,  
**so that** I can get the information I need efficiently.

**Tasks:**

- T-public-chat-05-01: Integrate AI backend for answering user questions
- T-public-chat-05-02: Ensure responses use apartment/building context
- T-public-chat-05-03: Display quick links/help in chat footer (optional)
