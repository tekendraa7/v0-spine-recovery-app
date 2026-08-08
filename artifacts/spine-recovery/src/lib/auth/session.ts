import type { User } from '@/lib/types/user';

const sessionKey = 'spine-recovery:session';

export function getSessionUser(): User | null {
  try {
    const value = localStorage.getItem(sessionKey);
    return value ? (JSON.parse(value) as User) : null;
  } catch {
    return null;
  }
}

export function setSessionUser(user: User): void {
  localStorage.setItem(sessionKey, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(sessionKey);
}
