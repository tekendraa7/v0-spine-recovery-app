export type AuthProvider = 'google' | 'facebook' | 'phone' | 'email';
export type RecoveryCondition = 'lower_back' | 'neck' | 'both';

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
}
