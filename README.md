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
