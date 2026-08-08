# Architecture audit

Audit date: 2026-08-08

## What runs today

The deployable client is `artifacts/spine-recovery`, a Vite/React application served as the Vercel static output. `artifacts/api-server` is an Express serverless API entry point, but currently exposes only health checking. The root `api/*.ts` files route Vercel requests to that server.

Useful client work to retain includes the exercise and workout data, reusable UI primitives, responsive bottom navigation, calendar/progress screens, and offline UI. The older Next application is retained in `.migration-backup` as an archive and is not part of the build.

## Findings and decisions

| Area | Finding | Decision |
| --- | --- | --- |
| Frontend | Vite + React + Wouter is the active UI | Keep it; consolidate routes to the five product destinations. |
| API | Express exists but has no product API | Make it the only server API under `/api`. |
| Database | Drizzle package exists with an empty schema | Add the normalized PostgreSQL schema and migrations. |
| Authentication | Client has localStorage sessions, in-memory users, mock OTP and demo OAuth | Remove from production flow; use server OAuth and secure HTTP-only sessions. |
| Data | IndexedDB is currently the source for progress | Treat it only as an offline cache; server records are authoritative for signed-in users. |
| Duplicates | `mockup-sandbox`, `.migration-backup`, and generated `dist` directories are prototypes/build artifacts | Exclude from production deployment; preserve backup until a separately approved removal. |

## Incremental implementation plan

1. Document the architecture and deployment contract.
2. Add database schema, migrations, secure OAuth/session routes, and profile/session APIs.
3. Replace demo authentication/client session storage with the API-backed flow.
4. Connect exercise/workout completion, calendar, and progress to the same session API.
5. Add tests and remove archived prototypes only after the replacement is verified.
