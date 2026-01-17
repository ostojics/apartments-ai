# Epic: Apartment Page Improvements – 01

Status: not-started

## Description

Implement a set of improvements to the apartment page to enhance user experience, code quality, and maintainability. This includes lazy loading of tab content, professional and mobile-responsive markdown rendering, and a new promotions/discount tab with a form and validation.

## Acceptance Criteria

- All improvements are implemented as described in the related stories.
- All code follows product conventions, is mobile responsive, and is fully localized.
- Apartment page component remains under 150 lines (excluding test content).
- All new UI/UX is visually verified and tested.

## Tasks & Subtasks

- [ ] Implement lazy loading for chat/manual tab content
- [ ] Add custom markdown rendering components
- [ ] Add promotions/discount tab with form, validation, and MSW endpoint
- [ ] Ensure all improvements are mobile responsive and localized
- [ ] Commit changes following naming convention

---

## Dev Notes

### References

- [apartment.page.tsx](../../apps/web/src/modules/apartments/components/apartment.page.tsx)
- [naming-convention.md](../naming-convention.md)

### Project Structure Notes

- All improvements should be implemented in the apartments module and related shared libraries.

---

Refer to the [naming convention](../naming-convention.md) for branch, PR, and task identifiers.
