# PFS Sport ERP — Git & Vercel Configuration Reference

This document records the official repository, deployment pipelines, account credentials metadata, and operational workflows for the **PFS Sport ERP** platform.

---

## 1. Git Repository Configuration

| Parameter | Configuration Value |
| :--- | :--- |
| **GitHub Account** | [`designpapayapalette-JKR`](https://github.com/designpapayapalette-JKR) |
| **Account Email** | `design.papayapalette@gmail.com` |
| **Repository URL** | [https://github.com/designpapayapalette-JKR/pfs-sport-erp](https://github.com/designpapayapalette-JKR/pfs-sport-erp) |
| **Clone (HTTPS)** | `https://github.com/designpapayapalette-JKR/pfs-sport-erp.git` |
| **Clone (SSH)** | `git@github.com:designpapayapalette-JKR/pfs-sport-erp.git` |
| **Default Branch** | `main` |
| **Visibility** | Public |
| **Local Remote Name** | `origin` |

### Git Sync Commands
```bash
# Check status
git status

# Stage and commit changes
git add .
git commit -m "feat: description of change"

# Push to GitHub (Triggers automated Vercel Production deployment)
git push origin main

# Pull latest updates
git pull origin main
```

---

## 2. Vercel Production Deployment Configuration

| Parameter | Configuration Value |
| :--- | :--- |
| **Vercel Account** | `maheshkash28-3196` |
| **Account Email** | `mahesh.kash28@gmail.com` |
| **Project Name** | `pfs-sport-erp` |
| **Project ID** | `prj_s9VYToRSEn2FzAWX6gGpEA4AfsPt` |
| **Live Production URL** | [https://pfs-sport-erp.vercel.app](https://pfs-sport-erp.vercel.app) |
| **Deployment Dashboard** | [https://vercel.com/maheshkash28-3196s-projects/pfs-sport-erp](https://vercel.com/maheshkash28-3196s-projects/pfs-sport-erp) |
| **Connected Git Repository** | `designpapayapalette-JKR/pfs-sport-erp` |
| **Production Branch** | `main` |
| **Framework Preset** | `Next.js` (v16.3.3 + React 19 + Turbopack) |
| **Monorepo Build Command** | `pnpm --filter web build` |
| **Output Directory** | `apps/web/.next` |
| **Package Manager** | `pnpm@10.33.0` |

---

## 3. Configuration Files in Codebase

### `vercel.json` (Root)
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "pnpm --filter web build",
  "outputDirectory": "apps/web/.next",
  "framework": "nextjs"
}
```

### `.vercel/project.json` (Local CLI Link)
```json
{
  "projectId": "prj_s9VYToRSEn2FzAWX6gGpEA4AfsPt",
  "projectName": "pfs-sport-erp"
}
```

### `package.json` (Root Workspace)
```json
{
  "name": "pfs-sport-erp",
  "version": "0.0.0",
  "private": true,
  "engines": {
    "node": ">=20"
  },
  "packageManager": "pnpm@10.33.0",
  "scripts": {
    "build": "pnpm --filter web build",
    "dev:web": "pnpm --filter web dev",
    "build:web": "pnpm --filter web build",
    "lint:web": "pnpm --filter web lint",
    "dev:api": "cd apps/api && .venv/bin/uvicorn app.main:app --reload",
    "test:api": "cd apps/api && .venv/bin/pytest -q"
  },
  "devDependencies": {
    "next": "16.3.3",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  }
}
```

---

## 4. Key Live Application Routes

| Module | Live Route |
| :--- | :--- |
| **Public Storefront** | [https://pfs-sport-erp.vercel.app/shop](https://pfs-sport-erp.vercel.app/shop) |
| **Admin Operations Dashboard** | [https://pfs-sport-erp.vercel.app/admin/dashboard](https://pfs-sport-erp.vercel.app/admin/dashboard) |
| **Omnichannel Comms & AI Voice Hub** | [https://pfs-sport-erp.vercel.app/admin/communications](https://pfs-sport-erp.vercel.app/admin/communications) |
| **Order Desk & Dispatch Consignment Drawer** | [https://pfs-sport-erp.vercel.app/admin/orders](https://pfs-sport-erp.vercel.app/admin/orders) |
| **Live Transit Command Center & GPS Telemetry** | [https://pfs-sport-erp.vercel.app/dealer/shipments/SHP-2026-044](https://pfs-sport-erp.vercel.app/dealer/shipments/SHP-2026-044) |
| **Interactive 3D Court Visualiser** | [https://pfs-sport-erp.vercel.app/visualiser](https://pfs-sport-erp.vercel.app/visualiser) |
| **Commercial Turnkey Estimator** | [https://pfs-sport-erp.vercel.app/estimator](https://pfs-sport-erp.vercel.app/estimator) |
| **Inbound Lead Generation Form** | [https://pfs-sport-erp.vercel.app/lead-form](https://pfs-sport-erp.vercel.app/lead-form) |

---

## 5. Automated CI/CD Lifecycle

```
Developer Local Workspace
         │
         ▼  git commit & git push origin main
GitHub Repository (designpapayapalette-JKR/pfs-sport-erp)
         │
         ▼  Webhook Trigger
Vercel CI/CD Pipeline (mahesh.kash28@gmail.com)
  ├── 1. Clone workspace (apps/web + packages/ui)
  ├── 2. Install dependencies (pnpm install)
  ├── 3. Execute build (pnpm --filter web build)
  ├── 4. Static generation & route compilation (41/41 routes)
  └── 5. Publish to Production Edge Network
         │
         ▼
Live Production Site (https://pfs-sport-erp.vercel.app)
```
