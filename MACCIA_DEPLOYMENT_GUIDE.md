# MACCIA Deployment Guide

## Prerequisites

- Node.js 22 LTS or a compatible maintained release.
- MongoDB database with backups and a least-privilege application user.
- HTTPS reverse proxy or managed platform.
- Approved persistent object storage/Cloudinary account for production uploads.

## Backend configuration

Copy `backend/.env.example` to `backend/.env` and set:

- `MONGODB_URI`: production MongoDB connection string.
- `JWT_SECRET`: random secret of at least 32 characters.
- `CORS_ORIGINS`: comma-separated production frontend origins.
- Cloudinary values when uploads are enabled.

Create the first administrator once:

```text
cd backend
npm install
npm run seed
```

The seed requires `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` and optionally `SEED_ADMIN_NAME`. Remove the seed password from the environment after successful provisioning.

Build and start:

```text
cd backend
npm ci
npm run build
npm start
```

Health check: `GET /health` should return HTTP 200.

## Frontend configuration (Vercel)

Set `VITE_API_URL` to the public backend origin when frontend and API are deployed on different origins. Leave it blank when a reverse proxy serves `/api` and `/uploads` from the same origin.

```text
cd frontend
npm ci
npm run build
```

Deploy `frontend/dist` to a static host and configure SPA fallback so unknown paths serve `index.html`.

The repository-root `vercel.json` is configured for the actual project layout: dependencies are installed in `frontend`, the Vite production build runs there, the output is `frontend/dist`, and all client routes fall back to `index.html`. In Vercel, keep the project root at the repository root and set `VITE_API_URL` for Production and Preview.

The Express/MongoDB backend is intentionally not packaged as a Vercel serverless function. Deploy `backend` to a persistent Node service with a persistent MongoDB database and persistent Cloudinary/object storage for uploads, then use that HTTPS origin as `VITE_API_URL`. Add the final Vercel origins to backend `CORS_ORIGINS` before promoting the deployment.

Temporary official-source records can be inserted once with `npm run seed:temporary` from `backend`. This seed uses stable IDs and `$setOnInsert`; rerunning it does not overwrite existing production records.

## Reverse proxy

- `/api/*` → backend service.
- `/uploads/*` → backend only for non-production/local storage; production should use persistent object URLs.
- All other paths → frontend static assets with SPA fallback.
- Enable HTTPS, HSTS after validation, compression and immutable caching for fingerprinted assets.

## Rollback

1. Retain the previous frontend artifact and backend image/release.
2. Do not roll back MongoDB by deleting records.
3. Switch traffic to the previous application release.
4. If a later schema migration is introduced, use its documented non-destructive down/compatibility procedure.
5. Verify `/health`, homepage rendering and an administrator login after rollback.
