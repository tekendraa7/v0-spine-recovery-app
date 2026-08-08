import { createHash, randomBytes } from "node:crypto";
import { Router } from "express";
import { SignJWT, createRemoteJWKSet, importPKCS8, jwtVerify } from "jose";
import { and, eq, gt } from "drizzle-orm";
import { db, accounts, profiles, sessions, users } from "@workspace/db";

const authRouter = Router();
const sessionCookie = "spine_recovery_session";
const oauthCookie = "spine_recovery_oauth";
const sessionDays = 30;

type Provider = "google" | "apple";
type OAuthState = { provider: Provider; state: string; verifier: string; nonce: string };

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function appUrl(): string { return required("APP_URL").replace(/\/$/, ""); }
function callbackUrl(provider: Provider): string { return `${appUrl()}/api/auth/callback/${provider}`; }
function hash(value: string): string { return createHash("sha256").update(value).digest("hex"); }
function safeRedirect(path: unknown): string {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}
function cookieOptions() {
  return { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };
}
function randomUrlSafe(bytes = 32): string { return randomBytes(bytes).toString("base64url"); }

async function appleClientSecret(): Promise<string> {
  const key = await importPKCS8(required("APPLE_PRIVATE_KEY").replace(/\\n/g, "\n"), "ES256");
  return new SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: required("APPLE_KEY_ID") })
    .setIssuer(required("APPLE_TEAM_ID"))
    .setSubject(required("APPLE_CLIENT_ID"))
    .setAudience("https://appleid.apple.com")
    .setIssuedAt()
    .setExpirationTime("180d")
    .sign(key);
}

authRouter.get("/auth/:provider", async (req, res) => {
  const provider = req.params.provider;
  if (provider !== "google" && provider !== "apple") return res.status(404).json({ error: "Unknown provider" });
  try {
    const verifier = randomUrlSafe();
    const state: OAuthState = { provider, state: randomUrlSafe(), verifier, nonce: randomUrlSafe() };
    const challenge = createHash("sha256").update(verifier).digest("base64url");
    res.cookie(oauthCookie, JSON.stringify(state), { ...cookieOptions(), signed: true, maxAge: 10 * 60 * 1000 });
    const query = new URLSearchParams({
      client_id: provider === "google" ? required("GOOGLE_CLIENT_ID") : required("APPLE_CLIENT_ID"),
      redirect_uri: callbackUrl(provider), response_type: "code", scope: provider === "google" ? "openid email profile" : "name email",
      response_mode: provider === "apple" ? "form_post" : "query", state: state.state, nonce: state.nonce,
      code_challenge: challenge, code_challenge_method: "S256",
    });
    const endpoint = provider === "google" ? "https://accounts.google.com/o/oauth2/v2/auth" : "https://appleid.apple.com/auth/authorize";
    return res.redirect(`${endpoint}?${query}`);
  } catch (error) {
    return res.status(503).json({ error: error instanceof Error ? error.message : "Authentication is unavailable" });
  }
});

authRouter.all("/auth/callback/:provider", async (req, res) => {
  const provider = req.params.provider;
  const params = { ...req.query, ...req.body } as Record<string, unknown>;
  const stored = req.signedCookies?.[oauthCookie];
  res.clearCookie(oauthCookie, cookieOptions());
  if ((provider !== "google" && provider !== "apple") || typeof stored !== "string") return res.redirect(`${appUrl()}/login?error=invalid_oauth_state`);
  let oauth: OAuthState;
  try { oauth = JSON.parse(stored) as OAuthState; } catch { return res.redirect(`${appUrl()}/login?error=invalid_oauth_state`); }
  if (oauth.provider !== provider || oauth.state !== params.state || typeof params.code !== "string") return res.redirect(`${appUrl()}/login?error=invalid_oauth_state`);
  try {
    const tokenBody = new URLSearchParams({ grant_type: "authorization_code", code: params.code, redirect_uri: callbackUrl(provider), client_id: provider === "google" ? required("GOOGLE_CLIENT_ID") : required("APPLE_CLIENT_ID"), code_verifier: oauth.verifier });
    tokenBody.set("client_secret", provider === "google" ? required("GOOGLE_CLIENT_SECRET") : await appleClientSecret());
    const tokenResponse = await fetch(provider === "google" ? "https://oauth2.googleapis.com/token" : "https://appleid.apple.com/auth/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: tokenBody });
    if (!tokenResponse.ok) throw new Error("The identity provider rejected the authorization code");
    const token = await tokenResponse.json() as { id_token?: string; access_token?: string };
    let identity: { subject: string; email?: string; name?: string; avatarUrl?: string };
    if (provider === "google") {
      const infoResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { authorization: `Bearer ${token.access_token}` } });
      if (!infoResponse.ok) throw new Error("Unable to verify Google identity");
      const info = await infoResponse.json() as { sub?: string; email?: string; name?: string; picture?: string };
      if (!info.sub) throw new Error("Google did not return an account identifier");
      identity = { subject: info.sub, email: info.email, name: info.name, avatarUrl: info.picture };
    } else {
      if (!token.id_token) throw new Error("Apple did not return an identity token");
      const jwks = createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"));
      const verified = await jwtVerify(token.id_token, jwks, { issuer: "https://appleid.apple.com", audience: required("APPLE_CLIENT_ID") });
      if (verified.payload.nonce !== oauth.nonce || !verified.payload.sub) throw new Error("Unable to verify Apple identity");
      identity = { subject: verified.payload.sub, email: typeof verified.payload.email === "string" ? verified.payload.email : undefined };
    }
    const existing = await db.select({ userId: accounts.userId }).from(accounts).where(and(eq(accounts.provider, provider), eq(accounts.providerAccountId, identity.subject))).limit(1);
    const userId = existing[0]?.userId ?? (await db.insert(users).values({ email: identity.email, displayName: identity.name, avatarUrl: identity.avatarUrl }).returning({ id: users.id }))[0].id;
    if (!existing[0]) {
      await db.insert(accounts).values({ userId, provider, providerAccountId: identity.subject });
      await db.insert(profiles).values({ userId, timezone: req.get("x-timezone") ?? null });
    }
    const rawToken = randomUrlSafe(48);
    await db.insert(sessions).values({ userId, tokenHash: hash(rawToken), expiresAt: new Date(Date.now() + sessionDays * 86400000) });
    res.cookie(sessionCookie, rawToken, { ...cookieOptions(), signed: true, maxAge: sessionDays * 86400000 });
    return res.redirect(`${appUrl()}${safeRedirect(params.returnTo)}`);
  } catch (error) {
    return res.redirect(`${appUrl()}/login?error=${encodeURIComponent(error instanceof Error ? error.message : "oauth_failed")}`);
  }
});

authRouter.get("/auth/session", async (req, res) => {
  const token = req.signedCookies?.[sessionCookie];
  if (typeof token !== "string") return res.status(401).json({ error: "Unauthenticated" });
  const result = await db.select({ id: users.id, email: users.email, displayName: users.displayName, avatarUrl: users.avatarUrl, onboardingComplete: profiles.onboardingComplete })
    .from(sessions).innerJoin(users, eq(sessions.userId, users.id)).innerJoin(profiles, eq(profiles.userId, users.id))
    .where(and(eq(sessions.tokenHash, hash(token)), gt(sessions.expiresAt, new Date()))).limit(1);
  if (!result[0]) { res.clearCookie(sessionCookie, cookieOptions()); return res.status(401).json({ error: "Session expired" }); }
  return res.json({ user: result[0] });
});

authRouter.post("/auth/logout", async (req, res) => {
  const token = req.signedCookies?.[sessionCookie];
  if (typeof token === "string") await db.delete(sessions).where(eq(sessions.tokenHash, hash(token)));
  res.clearCookie(sessionCookie, cookieOptions());
  return res.status(204).end();
});

export default authRouter;
