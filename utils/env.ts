/**
 * Central environment configuration.
 * Override BASE_URL via environment variable when running against a different host.
 */
export const ENV = {
  baseURL: process.env.BASE_URL ?? 'https://parabank.parasoft.com',
  registrationPath: '/parabank/register.htm',
  loginPath: '/parabank/index.htm',
} as const;
