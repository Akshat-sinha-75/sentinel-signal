Hi this is Akshat

---
## PR #5 — 2026-05-22

**Feature:** ..

1. **Feature/Fix**
Cleanup of hardcoded authentication logic and removal of unused server dependencies.

2. **Files Changed**
* `backend/login-test.js`: Deletes the `login` function and hardcoded Supabase test credentials.
* `backend/server.js`: Removes `dotenv` configuration and the `express` framework import.

3. **Summary**
Hardcoded Supabase authentication logic has been purged from the testing utilities to prevent credential leakage and remove dead code. The removal of `express` and `dotenv` from `server.js` streamlines the file but indicates a significant shift in how the backend handles routing and environment variables. BREAKING: These changes will cause the server to fail if it relies on Express for HTTP handling or Dotenv for secret management at this entry point.

**Triggered by:** @Akshat-sinha-75 | **Merged into:** `test`

---
## PR #7 — 2026-05-22

**Feature:** Update server.js

**Feature/Fix**
Remove the `/market/indices` GET endpoint from the backend API.

**Files Changed**
*   `backend/server.js`: The main Express server entry point where the market index route handler was deleted.

**Summary**
The `GET /market/indices` endpoint has been deprecated and removed from the server configuration. This change reduces the API surface area by eliminating the route that previously returned market index data via the `getIndices` helper. BREAKING: Any frontend components or external services relying on the `/market/indices` endpoint will now receive a 404 Not Found error. Developers must ensure all client-side calls to this specific route are removed or migrated to an alternative data source to avoid application failure.

**Triggered by:** @Akshat-sinha-75 | **Merged into:** `main`

---
## PR #10 — 2026-05-24

**Feature:** ..

1. **Feature/Fix**
Establishment of a structured pull request history and changelog within the project documentation.

2. **Files Changed**
* `README.md`: Updated to include detailed summaries, breaking change warnings, and contributor metadata for PR #5 and PR #7.

3. **Summary**
Documentation for previous architectural changes and API deprecations has been integrated into the README to improve project transparency. This update records the removal of hardcoded credentials and the Express framework from the backend, as well as the deletion of the market indices endpoint. Consolidating these logs provides a central reference point for developers to identify historical breaking changes and migration requirements. This formalization of the changelog ensures that all contributors have immediate visibility into the evolving state of the `main` and `test` branches.

**Triggered by:** @Akshat-sinha-75 | **Merged into:** `test`

---
## PR #11 — 2026-05-24

**Feature:** Test

**Feature/Fix**
UI Refactor: Simplified the landing page hero section by removing animated wrappers and decorative status indicators.

**Files Changed**
*   `frontend/src/app/page.tsx`: Updated the root page component to strip the `main` layout wrapper, Framer Motion animation logic, and the "Live Market Intelligence" badge.

**Summary**
The landing page hero section has been streamlined to remove the `motion.div` entry animation and the "Live Market Intelligence" status badge. This change eliminates the nested layout containers that previously wrapped the primary H1 heading. By removing these decorative elements, the component hierarchy is flattened and the initial visual load is simplified. No functional logic or routing changes were made during this refactor.

**Triggered by:** @Akshat-sinha-75 | **Merged into:** `main`

---
## PR #12 — 2026-05-24

**Feature:** ..

1. **Feature/Fix**
Documentation: Formalization of the project changelog and historical record of architectural updates.

2. **Files Changed**
* `README.md`: Updated to include technical summaries, contributor metadata, and breaking change notifications for PR #10 and PR #11.

3. **Summary**
Documentation for historical API deprecations and frontend refactors has been integrated into the central README to improve project transparency. This update records the removal of the `/market/indices` endpoint and the simplification of the landing page hero section by stripping Framer Motion logic. Consolidating these logs provides a technical reference point for developers to identify historical breaking changes and component hierarchy updates. The addition ensures immediate visibility into the evolving state of both the `main` and `test` branches.

**Triggered by:** @Akshat-sinha-75 | **Merged into:** `test`

---
## PR #13 — 2026-05-24

**Feature:** Test

### Feature/Fix
Landing page UI cleanup involving the removal of hero typography and feature grid animations.

### Files Changed
* `frontend/src/app/page.tsx`: Defines the root landing page layout; removed the primary hero text elements and the animated `motion.div` wrapper for the features section.

### Summary
The landing page hero section was updated to remove the primary "Trade with Precision" headline and associated descriptive subtext. The animated `motion.div` container surrounding the features grid was deleted, simplifying the DOM structure and removing entry transitions for the feature cards. These changes reduce visual clutter on the home route by prioritizing navigation buttons over marketing copy. No breaking changes or state modifications were introduced in this update.

**Triggered by:** @Akshat-sinha-75 | **Merged into:** `main`

---
## PR #14 — 2026-05-24

**Feature:** ..

1. **Feature/Fix**
Documentation: Formalization of the project changelog and historical record of architectural updates.

2. **Files Changed**
* `README.md`: Updated to include technical summaries, contributor metadata, and historical records for PR #12 and PR #13.

3. **Summary**
Documentation for historical API deprecations and frontend refactors has been integrated into the central README to improve project transparency. This update records the removal of the `/market/indices` endpoint and the simplification of the landing page hero section across the `main` and `test` branches. Consolidating these logs provides a technical reference point for developers to identify historical breaking changes and component hierarchy updates. No functional code or logic changes were made during this documentation update.

**Triggered by:** @Akshat-sinha-75 | **Merged into:** `test`

---
## PR #15 — 2026-05-24

**Feature:** Test

1. **Feature/Fix**
Simplify landing page layout and remove decorative UI elements.

2. **Files Changed**
* `frontend/src/app/page.tsx`: The root landing page component; updated to remove visual background effects and the primary navigation header.

3. **Summary**
Removed decorative background gradient divs and the fixed header containing the "Sentinel Signal" brand assets. The refactoring streamlines the page structure by focusing strictly on the login navigation path. These updates reduce visual complexity and decrease the total number of DOM elements rendered on the initial application route. No breaking changes were introduced as core navigation remains functional.

**Triggered by:** @Akshat-sinha-75 | **Merged into:** `main`

---
## PR #16 — 2026-05-24

**Feature:** Update layout.tsx

1. **Feature/Fix**
Refactor root layout to remove unused font assets and global metadata.

2. **Files Changed**
* `frontend/src/app/layout.tsx`: Defines the core HTML structure and global configuration for the Next.js application.

3. **Summary**
Removed the `Geist_Mono` font definition and the exported `metadata` object from the application's entry point. This change eliminates unused CSS variables associated with the mono font, slightly reducing the initial CSS payload. BREAKING: Removing the global `metadata` constant deletes the default site title and description ("Sentinel Signal") across all routes. Developers must now ensure that individual page components define their own metadata to maintain SEO and proper browser tab labeling.

**Triggered by:** @Akshat-sinha-75 | **Merged into:** `main`
