import { ENV } from './env';
import type { RegistrationData } from '../pages/registerPage';

export interface RegistrationResult {
  success: boolean;
  message: string;
}

/**
 * HTTP-based API client for ParaBank.
 *
 * Used in global setup to seed test data programmatically, bypassing the UI.
 * This is the standard automation practice — tests should not depend on the UI
 * to set up their own preconditions.
 */
export class ApiClient {
  constructor(private readonly baseURL: string = ENV.baseURL) {}

  /**
   * Registers a new customer by POSTing directly to the registration form endpoint.
   * Returns success=true if the response does not contain a known error message.
   */
  async registerCustomer(data: RegistrationData): Promise<RegistrationResult> {
    const body = new URLSearchParams({
      'customer.firstName': data.firstName,
      'customer.lastName': data.lastName,
      'customer.address.street': data.address,
      'customer.address.city': data.city,
      'customer.address.state': data.state,
      'customer.address.zipCode': data.zipCode,
      'customer.phoneNumber': data.phoneNumber ?? '',
      'customer.ssn': data.ssn,
      'customer.username': data.username,
      'customer.password': data.password,
      'repeatedPassword': data.confirmPassword,
    });

    const response = await fetch(`${this.baseURL}/parabank/register.htm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    const html = await response.text();

    if (html.includes('This username already exists')) {
      return { success: false, message: 'Username already exists in the database' };
    }
    if (!response.ok) {
      return { success: false, message: `HTTP ${response.status} ${response.statusText}` };
    }
    return { success: true, message: `Customer ${data.username} registered successfully` };
  }

  /**
   * Confirms the ParaBank demo site is reachable before the suite starts.
   */
  async healthCheck(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseURL}/parabank/index.htm`);
      return res.ok;
    } catch {
      return false;
    }
  }
}
