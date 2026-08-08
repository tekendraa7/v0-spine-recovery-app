/**
 * Server-side Auth.js configuration contract. Keep client secrets out of Vite
 * variables; populate these names only in the serverless Auth.js route.
 */
export const authEnvironmentVariables = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'FACEBOOK_CLIENT_ID',
  'FACEBOOK_CLIENT_SECRET',
  'NEXTAUTH_SECRET',
] as const;

export const authProviderNames = ['google', 'facebook', 'phone', 'email'] as const;
