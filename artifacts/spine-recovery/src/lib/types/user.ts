export type AuthProvider = 'google' | 'apple';
export type RecoveryCondition = 'lower_back' | 'neck' | 'both';

export interface WorkoutLog {
  id: string;
  date: string;
  routineName: string;
  durationMinutes?: number;
  painLevel?: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  authProvider: AuthProvider;
  createdAt: string;
  condition?: RecoveryCondition;
  painDuration?: string;
  onboardingComplete: boolean;
  workoutLogs?: WorkoutLog[];
}
