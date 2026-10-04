# Render deployment

This repository is configured for Render using `render.yaml`.

## Service

- Type: Web Service
- Runtime: Node.js
- Branch: `main`
- Build: `npm install && npm run build`
- Start: `npm run start -- -H 0.0.0.0 -p $PORT`
- Health check: `/`
- Node: 22

## Required environment variables

Add these values in Render. Do not commit their real values to GitHub:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Authentica credentials are intentionally not configured in Render. They belong to the Supabase Edge Function secrets.

## Render setup

Create a Blueprint from this repository and Render will read `render.yaml`. During setup, provide the two required Supabase variables. After deployment, verify the home page and `/admin`.
