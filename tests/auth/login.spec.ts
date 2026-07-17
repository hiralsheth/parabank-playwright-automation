import { test, expect } from '../../fixtures/testFixtures';
import { validLoginCredentials } from '../../utils/testData';
import { log } from '../../utils/logger';
import { attachScreenshot } from '../../utils/screenshot';

/**
 * Login tests — covers only the PASS scenarios from the manual execution report.
 *
 * TC-LOGIN-001  Login page loads with all required controls
 * TC-LOGIN-002  Empty submit shows "Please enter a username and password."
 * TC-LOGIN-004  Valid credentials redirect to Accounts Overview
 * TC-LOGIN-005  Log Out returns the user to the public home page
 *
 * Skipped (fail in manual run):
 *   TC-LOGIN-003  Invalid credentials are rejected — fails due to DEF-002
 *
 * Note on DEF-002: The demo environment currently bypasses credential validation
 * and accepts any nonblank login.  TC-LOGIN-004 and TC-LOGIN-005 assert the
 * post-authentication state regardless of this defect.
 */

test.describe('@Login', () => {
  test(
    'TC-LOGIN-001: Login page displays Username, Password, and Log In controls',
    { tag: ['@smoke', '@login'] },
    async ({ loginPage, page }) => {
      log('Opening home page and verifying login panel controls');

      await test.step('Open login page', async () => {
        await loginPage.open();
      });

      await test.step('All login controls are visible', async () => {
        await loginPage.expectVisible(loginPage.usernameInput);
        await loginPage.expectVisible(loginPage.passwordInput);
        await loginPage.expectVisible(loginPage.loginButton);
      });

      await test.step('Screenshot — Login page controls', async () => {
        await attachScreenshot(page, 'TC-LOGIN-001 — Login page controls visible');
      });
    },
  );

  test(
    'TC-LOGIN-002: Empty credentials display validation message',
    { tag: ['@validation', '@login'] },
    async ({ loginPage, page }) => {
      log('Submitting login form with blank fields');

      await test.step('Open login page', async () => {
        await loginPage.open();
      });

      await test.step('Click Log In without entering credentials', async () => {
        await loginPage.click(loginPage.loginButton);
      });

      await test.step('Verify empty-credentials error message', async () => {
        await expect(page.getByText('Please enter a username and password.')).toBeVisible();
      });

      await test.step('Screenshot — Empty credentials error', async () => {
        await attachScreenshot(page, 'TC-LOGIN-002 — Empty credentials error');
      });
    },
  );

  test(
    'TC-LOGIN-004: Valid credentials redirect to Accounts Overview',
    { tag: ['@regression', '@login'] },
    async ({ loginPage, page }) => {
      log(`Logging in with username: ${validLoginCredentials.username}`);

      await test.step('Open login page', async () => {
        await loginPage.open();
      });

      await test.step('Enter credentials and submit', async () => {
        await loginPage.login(validLoginCredentials);
      });

      await test.step('Verify redirect to Accounts Overview', async () => {
        await expect(page).toHaveURL(/overview\.htm/);
        await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
      });

      await test.step('Screenshot — Accounts Overview after login', async () => {
        await attachScreenshot(page, 'TC-LOGIN-004 — Accounts Overview after login');
      });

      await test.step('Verify Log Out link is visible', async () => {
        await loginPage.expectVisible(loginPage.logoutLink);
      });
    },
  );

  test(
    'TC-LOGIN-005: Log Out ends the session and returns the user to the home page',
    { tag: ['@regression', '@login'] },
    async ({ loginPage, page }) => {
      log('Logging in and then logging out to verify session termination');

      await test.step('Open login page and authenticate', async () => {
        await loginPage.open();
        await loginPage.login(validLoginCredentials);
        await expect(page).toHaveURL(/overview\.htm/);
      });

      await test.step('Screenshot — Active session on Accounts Overview', async () => {
        await attachScreenshot(page, 'TC-LOGIN-005 — Active session before logout');
      });

      await test.step('Click Log Out', async () => {
        await loginPage.click(loginPage.logoutLink);
      });

      await test.step('Verify return to public home page', async () => {
        await expect(page).toHaveURL(/index\.htm/);
        await loginPage.expectVisible(loginPage.loginButton);
      });

      await test.step('Screenshot — Session ended on home page', async () => {
        await attachScreenshot(page, 'TC-LOGIN-005 — Home page after logout');
      });
    },
  );
});
