import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { ENV } from './utils/env';
import { generateUniqueUsername, baseRegistrationData } from './utils/testData';
import { ApiClient } from './utils/apiClient';

export const AUTH_DIR = path.join(__dirname, '.auth');
export const STATE_FILE = path.join(AUTH_DIR, 'session.json');
export const CREDENTIALS_FILE = path.join(AUTH_DIR, 'credentials.json');

/**
 * Global Setup — runs once before the entire test suite.
 *
 * Responsibilities:
 * 1. Confirm the application is reachable (health check).
 * 2. Seed a test user via HTTP POST (API seeding — no UI dependency).
 * 3. Authenticate via browser and persist session state (storageState).
 *
 * Tests that need an authenticated session can reuse the saved storageState
 * instead of logging in fresh on every test, which saves time and reduces
 * flakiness from login-page variability.
 */
async function globalSetup(): Promise<void> {
  console.log('\n[Setup] ─── Global Setup Starting ───────────────────────────────');

  // Ensure .auth directory exists and is gitignored
  if (!fs.existsSync(AUTH_DIR)) {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
  }

  const api = new ApiClient();

  // ── Step 1: Health check ───────────────────────────────────────
  const isAlive = await api.healthCheck();
  if (!isAlive) {
    throw new Error(`[Setup] Application is unreachable at ${ENV.baseURL}. Aborting test run.`);
  }
  console.log(`[Setup] ✓ Application is reachable: ${ENV.baseURL}`);

  // ── Step 2: Seed test user via API ──────────────────────────────
  const username = generateUniqueUsername();
  let activeUsername = username;

  const result = await api.registerCustomer({
    ...baseRegistrationData,
    username,
  });

  if (result.success) {
    console.log(`[Setup] ✓ Test user registered: ${username}`);
  } else {
    console.warn(`[Setup] ⚠ Registration failed (${result.message}) — falling back to demo credentials`);
    activeUsername = 'john';
  }

  const credentials = { username: activeUsername, password: baseRegistrationData.password };
  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 2));
  console.log(`[Setup] ✓ Credentials written to .auth/credentials.json`);

  // ── Step 3: Authenticate and persist session state ──────────────────
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${ENV.baseURL}${ENV.loginPath}`);
    await page.locator('input[name="username"]').fill(credentials.username);
    await page.locator('input[name="password"]').fill(credentials.password);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForURL(/overview\.htm/, { timeout: 20_000 });
    await context.storageState({ path: STATE_FILE });
    console.log('[Setup] ✓ Session state saved to .auth/session.json');
  } catch (err) {
    console.warn('[Setup] ⚠ Could not save session state — tests will log in independently', err);
  } finally {
    await browser.close();
  }

  console.log('[Setup] ─── Global Setup Complete ────────────────────────────\n');
}

export default globalSetup;
