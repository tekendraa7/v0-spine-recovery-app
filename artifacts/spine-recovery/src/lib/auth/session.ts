import type { User } from "@/lib/types/user";

let currentUser: User | null = null;

export function getSessionUser(): User | null { return currentUser; }

export function setSessionUser(user: User | null): void { currentUser = user; }

export async function refreshSession(): Promise<User | null> {
  const response = await fetch("/api/auth/session", { credentials: "include" });
  if (!response.ok) { currentUser = null; return null; }
  const data = await response.json() as { user: { id: string; email: string | null; displayName: string | null; onboardingComplete: boolean } };
  currentUser = { id: data.user.id, name: data.user.displayName ?? "", email: data.user.email ?? undefined, authProvider: "google", createdAt: "", onboardingComplete: data.user.onboardingComplete };
  return currentUser;
}

export async function clearSession(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  currentUser = null;
}
