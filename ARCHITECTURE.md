# Spine Recovery architecture

Spine Recovery is a Vite/React single-page client (`artifacts/spine-recovery`) and an Express API (`artifacts/api-server`) deployed through the root Vercel functions. PostgreSQL is the source of truth; Drizzle owns the schema and SQL migrations in `lib/db`.

Authentication uses authorization-code OAuth with PKCE for Google and Apple. The API validates provider identity tokens, creates an account/profile on the server, and stores only an opaque, expiring session identifier in a signed, HTTP-only, secure cookie. No credential, access token, or session is stored in localStorage.

All `/api/profile`, `/api/sessions`, `/api/calendar`, and `/api/progress` operations derive the user from that cookie. Client-supplied user identifiers are never accepted. Completing an exercise or workout creates an activity record; calendar and progress queries aggregate those same records.

Primary client routes are `/`, `/exercise`, `/calendar`, `/progress`, and `/workout`. Profile and settings remain account routes, not primary navigation.
