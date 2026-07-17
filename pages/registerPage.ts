import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber?: string;
  ssn: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[id="customer.firstName"]');
    this.lastNameInput = page.locator('[id="customer.lastName"]');
    this.addressInput = page.locator('[id="customer.address.street"]');
    this.cityInput = page.locator('[id="customer.address.city"]');
    this.stateInput = page.locator('[id="customer.address.state"]');
    this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
    this.phoneNumberInput = page.locator('[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer.ssn"]');
    this.usernameInput = page.locator('[id="customer.username"]');
    this.passwordInput = page.locator('[id="customer.password"]');
    this.confirmPasswordInput = page.locator('input#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async open(): Promise<void> {
    await this.goto('/parabank/register.htm');
  }

  async fillRegistrationForm(data: RegistrationData): Promise<void> {
    await this.fill(this.firstNameInput, data.firstName);
    await this.fill(this.lastNameInput, data.lastName);
    await this.fill(this.addressInput, data.address);
    await this.fill(this.cityInput, data.city);
    await this.fill(this.stateInput, data.state);
    await this.fill(this.zipCodeInput, data.zipCode);

    if (data.phoneNumber) {
      await this.fill(this.phoneNumberInput, data.phoneNumber);
    }

    await this.fill(this.ssnInput, data.ssn);
    await this.fill(this.usernameInput, data.username);
    await this.fill(this.passwordInput, data.password);
    await this.fill(this.confirmPasswordInput, data.confirmPassword);
  }

  async register(data: RegistrationData): Promise<void> {
    await this.fillRegistrationForm(data);
    await this.click(this.registerButton);
  }
}
