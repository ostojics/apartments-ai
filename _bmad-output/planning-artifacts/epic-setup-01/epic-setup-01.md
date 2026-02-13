# Epic: E-setup-01 – Project Setup

## Description

Initial setup for HostElite, covering foundational frontend and backend requirements to enable further development.

---

## Story: S-setup-01 – Frontend Public Layout Setup

### Description

Implement the public layout for the web frontend, ensuring correct structure and styling for the landing and public pages.

### Acceptance Criteria

---

### Tasks & Subtasks

**T-setup-01.1**: Review acceptance criteria

- Review the acceptance criteria for S-setup-01 to ensure all requirements are clear: theme switcher at top right, full screen main content, footer with 'Powered by', only modify apps/web/src/layouts/public-layout.tsx.

**T-setup-01.2**: Analyze current public-layout.tsx

- Open and analyze the current state of apps/web/src/layouts/public-layout.tsx to understand existing structure and identify required changes.

**T-setup-01.3**: Design layout changes

- Plan the layout changes: position theme switcher at top right, ensure main content is full screen height, update footer to display 'Powered by' at the bottom.

**T-setup-01.4**: Implement theme switcher position

- Update apps/web/src/layouts/public-layout.tsx to position the theme switcher at the top right of the page.

**T-setup-01.5**: Ensure full screen main content

- Modify the main content area in apps/web/src/layouts/public-layout.tsx to take the full screen height.

**T-setup-01.6**: Update footer to 'Powered by'

- Change the footer in apps/web/src/layouts/public-layout.tsx to display 'Powered by' text at the bottom, replacing any email contact.

**T-setup-01.7**: Test and verify layout

- Test the updated layout in the web frontend to ensure all acceptance criteria are met and the UI behaves as expected.

**T-setup-01.8**: Commit changes following naming convention

- Commit the changes to a branch and PR named according to the naming convention in \_bmad-output/planning-artifacts/naming-convention.md.

---

## Story: S-setup-02 – Backend Migrations Setup

### Description

Create initial database migrations for core entities to support multi-tenant and licensing features.

### Acceptance Criteria

- Migrations are created for the following entities: License, Tenant, Feedback, Building, KnowledgeBase.
- Each entity includes the specified fields and relations:
  - License: id (uuid, PK), key (generated), created_at (timestampz), valid_date (timestampz), used_at (timestampz), metadata (jsonb)
  - Tenant: id (uuid, PK), name (text), slug (text), created_at (timestampz), license_id (FK)
  - Feedback: id (uuid, PK), created_at (timestampz), content (text), metadata (jsonb)
  - Building: id (uuid, PK), name (text), slug (text), created_at (timestampz), tenant_id (FK), image_url (text, optional)
  - KnowledgeBase: id (uuid, PK), building_id (FK), tenant_id (FK), knowledge (text), metadata (jsonb)
- Migration files follow the existing example syntax in `apps/core/src/migrations/`.
- All relations and constraints are correctly defined.

---

## Story: S-setup-03 – Frontend Internationalization (i18n) Setup

### Description

Implement internationalization (i18n) in the web frontend to support multilingual user experiences, following the architecture and best practices outlined in the project documentation.

### Acceptance Criteria

- Integrate the following libraries in the web project:
  - i18next
  - react-i18next
  - i18next-browser-languagedetector
  - i18next-http-backend
- Create the following files and structure:
  - `apps/web/public/locales/en-US/translation.json` (with at least one sample key-value pair)
  - `apps/web/public/locales/sr-Latn/translation.json` (with at least one sample key-value pair)
  - `apps/web/src/common/constants/i18n.ts` (defines supported languages: 'en-US', 'sr-Latn', and the local storage key)
  - `apps/web/src/utils/i18n.ts` (initializes i18n with React integration, language detection, and backend loading)
  - `apps/web/src/components/LanguageSelect/LanguageSelect.tsx` (component for language selection)
- i18n is initialized with:
  - Fallback language set to English (`en-US`)
  - Language detection via browser and local storage (`i18nextLng`)
  - Backend loading from `/public/locales/{lng}/translation.json`
  - `escapeValue: false` for React
  - Debug mode enabled for development
- The LanguageSelect component allows switching between 'en-US' and 'sr-Latn' and updates the UI accordingly.
- At least one page/component (e.g., Login page) demonstrates usage of the `useTranslation` hook to display a translated string.
- Implementation follows the folder and file structure described in the architecture document.
- All code is committed under a branch and PR name following the naming convention.

---

Refer to the [naming convention](../../_bmad-output/planning-artifacts/naming-convention.md) for branch, PR, and task identifiers.
