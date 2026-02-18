# Deployment Guide: Sentinel Signal

This guide explains how to deploy the **Frontend** and **Backend** separately and connect them.

## 1. Architecture Overview
You will deploy two separate applications:
1.  **Backend (API)**: Node.js/Express server connecting to Supabase & Yahoo Finance.
2.  **Frontend (Client)**: Next.js application served via CDN.

**Communication**:
`Frontend (Browser)` -> `HTTP Request` -> `Backend (Cloud Server)`

---

## 2. Deploying the Backend (Recommended: Render)
We recommend **Render** (render.com) for the backend as it has a generous free tier for Node.js services.

### Steps:
1.  **Push Code**: Ensure your code is in a Git repository (GitHub/GitLab).
2.  **Create Service**:
    *   Go to Render Dashboard -> "New" -> "Web Service".
    *   Connect your repository.
    *   **Root Directory**: `backend` (Important! Since your repo has a monorepo-like structure).
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
3.  **Environment Variables**:
    *   Add the following variables in the Render Dashboard:
        *   `SUPABASE_URL`: (Your Supabase URL)
        *   `SUPABASE_SERVICE_ROLE_KEY`: (Your Supabase Service Role Key)
4.  **Deploy**: Click "Create Web Service".
5.  **Get URL**: Once deployed, Render will give you a URL like `https://sentinel-backend.onrender.com`. **Copy this.**

---

## 3. Deploying the Frontend (Recommended: Vercel)
Vercel is the creators of Next.js and offers the best hosting integration.

### Steps:
1.  **Create Project**:
    *   Go to Vercel Dashboard -> "Add New..." -> "Project".
    *   Import the same Git repository.
2.  **Configure Project**:
    *   **Framework Preset**: Next.js (should auto-detect).
    *   **Root Directory**: Edit this and select `frontend`.
3.  **Environment Variables**:
    *   Add the following variables:
        *   `NEXT_PUBLIC_SUPABASE_URL`: (Your Supabase URL)
        *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
        *   `NEXT_PUBLIC_API_URL`: **Paste the Backend URL from Step 2** (e.g., `https://sentinel-backend.onrender.com`).
            *   *Note: Do not add a trailing slash `/` at the end.*
4.  **Deploy**: Click "Deploy".

---

## 4. Verification
Once both are deployed:
1.  Open your **Vercel Frontend URL**.
2.  Try to **Login** (This tests Supabase connection).
3.  Go to **Market Overview** (This tests Backend connection via `NEXT_PUBLIC_API_URL`).
    *   If you see "Failed to fetch", check the Network tab in Developer Tools. Ensure `NEXT_PUBLIC_API_URL` is correct and does not have a trailing slash.

## Troubleshooting
- **CORS Errors**: If the frontend says "CORS error", you might need to update `backend/server.js` to explicitly allow the Vercel domain in the `cors()` config. Currently, it allows all (`*`), so it should work out of the box.
- **500 Errors**: Check the Render (Backend) logs for specific error messages (usually missing Env Vars).
