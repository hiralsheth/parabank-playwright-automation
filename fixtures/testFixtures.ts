import { test as base } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import { LoginPage } from '../pages/loginPage';

/**
 * Typed fixture bag for ParaBank page objects.
 * Import `test` and `expect` from this file instead of @playwright/test
 * so fixtures are automatically available in every test.
 */
type ParaBankFixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
};

export const test = base.extend<ParaBankFixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
