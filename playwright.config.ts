import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup',
  globalTeardown: './global-teardown',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Increase expect timeout on CI where the demo site can be slow */
  expect: {
    timeout: process.env.CI ? 15_000 : 5_000,
  },
  use: {
    /* Base URL — override with BASE_URL env var when targeting other environments */
    baseURL: process.env.BASE_URL ?? 'https://parabank.parasoft.com',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Screenshots: every test locally, failures only on CI */
    screenshot: process.env.CI ? 'only-on-failure' : 'on',

    /* Video: record every test locally, off on CI to save space */
    video: process.env.CI ? 'off' : 'on',

    /* Longer navigation and action timeouts on CI (demo site can be slow from US runners) */
    navigationTimeout: process.env.CI ? 60_000 : 30_000,
    actionTimeout: process.env.CI ? 30_000 : 10_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
