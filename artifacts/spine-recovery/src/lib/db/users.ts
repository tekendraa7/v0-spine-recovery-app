import type { User, WorkoutLog } from '@/lib/types/user';

// TODO: replace with real DB call (Postgres, Supabase, or Prisma).
const users: User[] = [];

export async function createUser(user: User): Promise<User> {
  users.push(user);
  return user;
}

// TODO: replace with real DB call.
export async function getUserByEmail(email: string): Promise<User | undefined> {
  return users.find((user) => user.email?.toLowerCase() === email.toLowerCase());
}

// TODO: replace with real DB call.
export async function getUserByPhone(phone: string): Promise<User | undefined> {
  return users.find((user) => user.phone === phone);
}

// TODO: replace with real DB call.
export async function updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
  const user = users.find((candidate) => candidate.id === id);
  if (!user) return undefined;
  Object.assign(user, updates);
  return user;
}

// TODO: replace with real DB call.
export async function getWorkoutLogs(userId: string): Promise<WorkoutLog[]> {
  return users.find((user) => user.id === userId)?.workoutLogs ?? [];
}

// TODO: replace with real DB call.
export async function addWorkoutLog(userId: string, log: WorkoutLog): Promise<WorkoutLog | undefined> {
  const user = users.find((candidate) => candidate.id === userId);
  if (!user) return undefined;
  user.workoutLogs = [...(user.workoutLogs ?? []), log];
  return log;
}
