import type { RegistrationData } from '../pages/registerPage';
import type { LoginCredentials } from '../pages/loginPage';

/**
 * Generates a unique username to avoid duplicate-username collisions during registration.
 */
export function generateUniqueUsername(): string {
  return `AutoUser_${Date.now()}`;
}

/**
 * Base registration payload without a username.
 * Spread this and supply a username separately in each test.
 */
export const baseRegistrationData: Omit<RegistrationData, 'username'> = {
  firstName: 'John',
  lastName: 'Smith',
  address: '123 Main Street',
  city: 'Toronto',
  state: 'Ontario',
  zipCode: 'M5V1A1',
  phoneNumber: '6471234567',
  ssn: '123456789',
  password: 'Password@123',
  confirmPassword: 'Password@123',
};

/**
 * A username that is confirmed to already exist in the demo database.
 * Used by TC-REG-003 to validate the duplicate-username error message.
 */
export const knownExistingUsername = 'AutoUser_20260716_1145';

/**
 * Login credentials used by TC-LOGIN-004 and TC-LOGIN-005.
 * The demo environment currently accepts any nonblank login — these are the
 * standard ParaBank demo credentials and should work after a database reset.
 */
export const validLoginCredentials: LoginCredentials = {
  username: 'john',
  password: 'demo',
};
