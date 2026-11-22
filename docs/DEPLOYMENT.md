# NAVI — Production Deployment Guide (Vercel & Render)

This guide provides step-by-step instructions for deploying the **NAVI** monorepo to production using:
- **Frontend**: [Vercel](https://vercel.com) (Static Edge SPA hosting)
- **Backend**: [Render](https://render.com) (FastAPI Python Web Service)
- **Repository**: Single GitHub Monorepo (`main` branch)

---

## Architecture Topology

```
+------------------------------------+          HTTPS API Requests
|       Vercel (Frontend)            | ------------------------------------+
|  URL: https://<your-app>.vercel.app|                                     |
+------------------------------------+                                     v
                  ^                                     +-------------------------------------+
                  |                                     |          Render (Backend)           |
                  |                                     | URL: https://<your-api>.onrender.com|
        User Browser Dashboard                          +-------------------------------------+
```

---

## 1. Backend Deployment (Render)

Deploy the backend first so you have your live API URL ready before configuring the frontend.

### Option A: Automatic Blueprint Deployment (Recommended)

NAVI includes a pre-configured [render.yaml](../render.yaml) blueprint at the root of the repository.

1. Log into your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** in the top right and select **Blueprint**.
3. Connect your GitHub repository (`NAVI`).
4. Render will parse `render.yaml` and configure the `navi-backend` service automatically:
   - **Service Type**: Web Service
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
   - **Health Check Path**: `/health`
5. Click **Apply**.
6. Once deployed, copy your backend service URL (e.g., `https://navi-backend-xxxx.onrender.com`).

---

### Option B: Manual Web Service Setup

If you prefer configuring the Web Service manually:

1. Click **New +** -> **Web Service**.
2. Select your `NAVI` GitHub repository.
3. Configure the settings:
   - **Name**: `navi-backend`
   - **Region**: Choose the region closest to you (e.g., Oregon, Ohio, Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: Leave blank (monorepo root)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free` (or higher)
4. Under **Advanced**:
   - **Health Check Path**: `/health`
   - **Auto-Deploy**: `Yes`
5. Click **Create Web Service**.

---

### Backend Environment Variables on Render

In your Render dashboard for `navi-backend`, navigate to the **Environment** tab and add the following variables:

| Variable | Recommended Value | Description |
| :--- | :--- | :--- |
| `ENVIRONMENT` | `production` | Enables production mode |
| `LOG_LEVEL` | `INFO` | Standard structured logging level |
| `CORS_ORIGINS` | `https://<your-app>.vercel.app,http://localhost:3000` | Comma-separated list of allowed frontend origins |
| `GEMINI_API_KEY` | `your_gemini_api_key` | *(Optional for initial setup; required for Phase 4)* |

> [!NOTE]
> Render automatically injects the `PORT` environment variable (typically `10000`). NAVI dynamically binds to `$PORT`. You do **not** need to manually define `PORT`.

---

## 2. Frontend Deployment (Vercel)

Once your Render backend is deployed, connect your frontend to Vercel.

### Step 1: Import Project into Vercel

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Select your `NAVI` GitHub repository and click **Import**.

### Step 2: Configure Monorepo Root Directory (Critical)

In the Vercel project configuration screen:

1. Locate **Root Directory** and click **Edit**.
2. Select or enter: `frontend`
3. Leave **Include source files outside of the Root Directory in the Build Step** checked.
4. Confirm **Framework Preset** is set to `Vite`.
5. **Build Command**: `npm run build` (or leave default)
6. **Output Directory**: `dist` (default for Vite)

### Step 3: Configure Frontend Environment Variables

Before clicking Deploy, expand **Environment Variables** and add:

| Key | Example Value | Purpose |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `https://navi-backend-xxxx.onrender.com` | Base URL of your deployed Render backend |
| `VITE_APP_ENV` | `production` | Deployment environment tag |

> [!IMPORTANT]
> Do NOT append a trailing slash to `VITE_API_BASE_URL` (e.g. use `https://navi-backend-xxxx.onrender.com`, not `https://navi-backend-xxxx.onrender.com/`). The API client normalizes this automatically, but keeping it clean prevents formatting issues.

### Step 4: Deploy

Click **Deploy**. Vercel will run the build and publish your site at `https://<your-project>.vercel.app`.

---

## 3. Configuring Cross-Origin Integration (CORS)

For security, modern browsers block cross-origin requests unless the backend explicitly approves the frontend domain via CORS headers.

1. Copy your live Vercel URL (e.g., `https://navi-web.vercel.app`).
2. Go to your **Render Dashboard** -> `navi-backend` -> **Environment**.
3. Update the `CORS_ORIGINS` variable:
   ```text
   https://navi-web.vercel.app,http://localhost:3000
   ```
4. Click **Save Changes**. Render will automatically restart the service with the new origin whitelist.

---

## 4. Verification & Testing

### 1. Verify Backend Endpoints

Open your terminal or browser and test the Render backend:

```bash
# 1. Test root health check (expect HTTP 200 with status: healthy)
curl -i https://<your-backend>.onrender.com/health

# 2. Test status endpoint (expect runtime statistics)
curl -i https://<your-backend>.onrender.com/api/v1/status

# 3. Test OpenAPI interactive documentation
# Visit: https://<your-backend>.onrender.com/docs
```

### 2. Verify Frontend Dashboard

1. Navigate to your live Vercel URL (`https://<your-app>.vercel.app`).
2. Look at the top navigation bar:
   - The **Backend** badge should show **Operational** (e.g., `production (15s)`).
3. Check the **System Metrics** cards:
   - **Backend State**: `healthy`
   - **Uptime**: Updating live seconds
4. Test SPA Client-Side Routing:
   - Click **Past Sessions** (`/sessions`), then press **Refresh (F5)** in your browser.
   - The page must reload properly without throwing a 404 error (handled by `frontend/vercel.json`).
5. Open browser DevTools (**F12** -> **Console** / **Network**):
   - Confirm zero CORS errors on API requests to `/api/v1/status`.

---

## 5. Continuous Deployment Workflow

Both Vercel and Render are integrated directly with your GitHub repository:

- When you push new commits to the `main` branch (`git push origin main`):
  - **Vercel** automatically rebuilds and redeploys the frontend in under 60 seconds.
  - **Render** automatically rebuilds and restarts the backend with zero downtime.

---

## 6. Troubleshooting Common Issues

### Issue 1: "Backend Unreachable" or CORS Preflight Error
- **Symptom**: Browser console shows `Access to fetch at ... from origin ... has been blocked by CORS policy`.
- **Cause**: The Render `CORS_ORIGINS` variable does not match the exact origin of your Vercel deployment.
- **Fix**: Check your Vercel URL (e.g. `https://navi-web.vercel.app`). Ensure it is present in Render's `CORS_ORIGINS` without any trailing slash (`/`).

### Issue 2: Vercel 404 on Page Refresh (SPA Routing)
- **Symptom**: Reloading `/sessions` or `/settings` gives Vercel 404 Not Found.
- **Cause**: Vercel tries to serve a static file matching the route path.
- **Fix**: NAVI includes `frontend/vercel.json` with rewrite rules sending all traffic to `/index.html`. Ensure `vercel.json` exists in `frontend/`.

### Issue 3: Render Free Tier Cold Starts
- **Symptom**: First request after inactivity takes 30-50 seconds to respond.
- **Cause**: Render free tier puts web services to sleep after 15 minutes of inactivity.
- **Behavior**: The NAVI frontend includes a 10-second timeout with friendly retry notices, polling every 10 seconds until the backend wakes up. Once awake, requests respond in under 50ms.

### Issue 4: Backend ModuleNotFoundError on Render
- **Symptom**: `ModuleNotFoundError: No module named 'backend'` or `app`.
- **Cause**: Root Directory mismatch between Render configuration and start command.
- **Fix**: Ensure Render Root Directory is left blank (monorepo root) and the start command is `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`. NAVI also includes dynamic `sys.path` injection in `backend/app/main.py` to prevent import failures.
