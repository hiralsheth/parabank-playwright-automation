import { test, expect } from '../../fixtures/testFixtures';
import { baseRegistrationData, knownExistingUsername } from '../../utils/testData';
import { log } from '../../utils/logger';
import { attachScreenshot } from '../../utils/screenshot';

/**
 * Registration tests — covers only the PASS scenarios from the manual execution report.
 *
 * TC-REG-001  Registration page loads correctly
 * TC-REG-002  Blank submit triggers required-field validation messages
 * TC-REG-003  Duplicate username is rejected with an error message
 *
 * Skipped (blocked/fail in manual run):
 *   TC-REG-004  Password confirmation mismatch — blocked by DEF-001
 *   TC-REG-005  Successful registration — blocked by DEF-001
 */

test.describe('@Registration', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.open();
  });

  test(
    'TC-REG-001: Registration page loads with all required fields and Register button',
    { tag: ['@smoke', '@registration'] },
    async ({ registerPage, page }) => {
      log('Verifying registration page heading and all form controls');

      await test.step('Heading is visible', async () => {
        await expect(page.getByRole('heading', { name: 'Signing up is easy!' })).toBeVisible();
      });

      await test.step('All mandatory fields are visible', async () => {
        await registerPage.expectVisible(registerPage.firstNameInput);
        await registerPage.expectVisible(registerPage.lastNameInput);
        await registerPage.expectVisible(registerPage.addressInput);
        await registerPage.expectVisible(registerPage.cityInput);
        await registerPage.expectVisible(registerPage.stateInput);
        await registerPage.expectVisible(registerPage.zipCodeInput);
        await registerPage.expectVisible(registerPage.ssnInput);
        await registerPage.expectVisible(registerPage.usernameInput);
        await registerPage.expectVisible(registerPage.passwordInput);
        await registerPage.expectVisible(registerPage.confirmPasswordInput);
      });

      await test.step('Register button is visible and enabled', async () => {
        await registerPage.expectVisible(registerPage.registerButton);
        await expect(registerPage.registerButton).toBeEnabled();
      });

      await test.step('Screenshot — Registration page fully loaded', async () => {
        await attachScreenshot(page, 'TC-REG-001 — Registration page loaded');
      });
    },
  );

  test(
    'TC-REG-002: Mandatory fields show validation messages when left blank',
    { tag: ['@validation', '@registration'] },
    async ({ registerPage, page }) => {
      log('Submitting blank Registration form to trigger required-field validation');

      await test.step('Click Register with all fields empty', async () => {
        await registerPage.click(registerPage.registerButton);
      });

      await test.step('Verify required-field messages', async () => {
        await expect(page.getByText('First name is required.')).toBeVisible();
        await expect(page.getByText('Last name is required.')).toBeVisible();
        await expect(page.getByText('Address is required.')).toBeVisible();
        await expect(page.getByText('City is required.')).toBeVisible();
        await expect(page.getByText('State is required.')).toBeVisible();
        await expect(page.getByText('Zip Code is required.')).toBeVisible();
        await expect(page.getByText('Social Security Number is required.')).toBeVisible();
        await expect(page.getByText('Username is required.')).toBeVisible();
        await expect(page.getByText('Password is required.')).toBeVisible();
        await expect(page.getByText('Password confirmation is required.')).toBeVisible();
      });

      await test.step('Screenshot — Mandatory field validation errors', async () => {
        await attachScreenshot(page, 'TC-REG-002 — Mandatory field validation errors');
      });

      await test.step('Page stays on Registration', async () => {
        await expect(page).toHaveURL(/register\.htm/);
      });
    },
  );

  test(
    'TC-REG-003: Registration is rejected when the username already exists',
    { tag: ['@validation', '@registration'] },
    async ({ registerPage, page }) => {
      log(`Attempting registration with known existing username: ${knownExistingUsername}`);

      await test.step('Fill form with a duplicate username', async () => {
        await registerPage.register({
          ...baseRegistrationData,
          username: knownExistingUsername,
        });
      });

      await test.step('Verify duplicate-username error is shown', async () => {
        await expect(page.getByText('This username already exists.')).toBeVisible();
      });

      await test.step('Screenshot — Duplicate username rejected', async () => {
        await attachScreenshot(page, 'TC-REG-003 — Duplicate username error');
      });

      await test.step('Page stays on Registration', async () => {
        await expect(page).toHaveURL(/register\.htm/);
      });
    },
  );
});
