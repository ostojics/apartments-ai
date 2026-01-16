# S-setup-03 – Frontend Internationalization (i18n) Setup

## Description

Implement internationalization (i18n) in the web frontend to support multilingual user experiences, following the architecture and best practices outlined in the project documentation.

## Tasks

- Integrate i18next, react-i18next, i18next-browser-languagedetector, and i18next-http-backend.
- Create locale files for English (en-US) and Serbian Latin (sr-Latn):
  - `apps/web/public/locales/en-US/translation.json`
  - `apps/web/public/locales/sr-Latn/translation.json`
- Add type definitions: `apps/web/src/common/constants/i18n.ts` (supported languages and local storage key)
- Initialize i18n: `apps/web/src/utils/i18n.ts`
- Implement a language selection component: `apps/web/src/components/LanguageSelect/LanguageSelect.tsx`
- Demonstrate usage of the `useTranslation` hook in at least one page/component (e.g., Login page).

## Relevant Files

- See above for all files to create or modify.
- Refer to the epic for acceptance criteria and details: `_bmad-output/planning-artifacts/epic-setup-01.md`.
