# Spine Recovery

Spine Recovery is a personal exercise, mobility, and activity-tracking app for people managing neck or lower-back discomfort. It is not medical advice and must not be used as a substitute for a qualified health professional.

## Stack

- React + Vite client: `artifacts/spine-recovery`
- Express serverless API: `artifacts/api-server`
- PostgreSQL + Drizzle ORM: `lib/db`
- Google and Apple OAuth with secure HTTP-only sessions

## Local setup

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env` and supply a PostgreSQL connection, session secret, and OAuth credentials.
3. Apply migrations with `pnpm --filter @workspace/db migrate`.
4. Build with `pnpm build` and validate types with `pnpm typecheck`.

Register these redirect URLs with each identity provider:

- `https://YOUR_APP/api/auth/callback/google`
- `https://YOUR_APP/api/auth/callback/apple`

## Deployment

Deploy the repository to Vercel, configure `DATABASE_URL`, `SESSION_SECRET`, `APP_URL`, and the provider variables in the project environment, then apply the Drizzle migrations against the production database before sending users to the app. Never commit `.env` files, OAuth secrets, or database credentials.

## Database commands

- `pnpm --filter @workspace/db generate` — generate a migration after schema changes
- `pnpm --filter @workspace/db migrate` — apply tracked migrations
- `pnpm --filter @workspace/db push` — development-only schema synchronization
