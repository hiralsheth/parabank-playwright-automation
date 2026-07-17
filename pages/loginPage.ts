import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export interface LoginCredentials {
  username: string;
  password: string;
}

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;
  readonly forgotLoginInfoLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.forgotLoginInfoLink = page.getByRole('link', { name: 'Forgot login info?' });
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async open(): Promise<void> {
    await this.goto('/parabank/index.htm');
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.fill(this.usernameInput, credentials.username);
    await this.fill(this.passwordInput, credentials.password);
    await this.click(this.loginButton);
  }

  async openRegistration(): Promise<void> {
    await this.click(this.registerLink);
  }
}
