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
