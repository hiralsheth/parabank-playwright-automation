# ParaBank Test Plan

## 1. Objective

Validate the ParaBank Registration and Login workflows in the demo environment and prepare the baseline for future Playwright TypeScript automation.

## 2. Test Scope

In scope:

- Registration page load and form rendering
- Mandatory-field validation on Registration
- Duplicate username handling
- Password confirmation handling
- Successful registration and automatic login behavior
- Login page load and form rendering
- Empty credential validation
- Invalid credential handling
- Successful login and logout availability

Out of scope for this phase:

- Accounts Overview functional depth
- Open New Account
- Transfer Funds
- Bill Pay
- Find Transactions
- Request Loan
- Update Contact Info
- Accessibility, performance, API, and mobile testing

## 3. Business Flow

1. Open the Registration page.
2. Enter customer details and login credentials.
3. Submit the form and verify account creation.
4. Verify the user is automatically logged in.
5. Log out and validate the Login flow.
6. Enter credentials and verify authentication, error handling, and logout availability.

## 4. Risks

- The demo backend may reject usernames that appear unique, which blocks positive registration coverage.
- The login flow may accept nonblank credentials without true authentication, which can mask credential-validation defects.
- Demo data may be shared across sessions, making username collisions unpredictable.
- Session state may persist between browser actions and distort manual observations.

## 5. Entry Criteria

- ParaBank demo site is reachable.
- Browser supports JavaScript and cookies.
- User Stories document is available.
- Test data is prepared.

## 6. Exit Criteria

- Registration and login test cases are executed.
- Defects are documented for any failed or blocked behavior.
- Locator candidates are identified for the stable UI controls.
- A framework design baseline is available for future automation work.

## 7. Test Environment

- Application: ParaBank demo
- Base URL: https://parabank.parasoft.com/parabank/index.htm
- Registration URL: https://parabank.parasoft.com/parabank/register.htm
- Browser: Chromium via VS Code browser tooling
- Framework target: Playwright Test with TypeScript

## 8. Test Data

- First Name: John
- Last Name: Smith
- Address: 123 Main Street
- City: Toronto
- State: Ontario
- Zip Code: M5V1A1
- Phone Number: 6471234567
- SSN: 123456789
- Username: AutoUser_\<unique value\>
- Password: Password@123
- Confirm Password: Password@123

## 9. Assumptions

- The demo environment is intended to behave consistently enough for manual validation.
- Login credentials can be validated independently of registration when the demo backend exposes seeded behavior.
- Phone number is optional because no required-field message appeared for it during validation.

## 10. Dependencies

- Internet connectivity and stable demo backend availability
- Browser cookies/session management
- Unique test data for username testing
- Shared demo database state controlled by ParaBank

## 11. Test Deliverables

- Manual Test Plan
- Manual Test Cases
- Manual Test Execution Report
- Locator Inventory
- Framework architecture outline

## 12. Automation Scope

Automation will initially cover only:

- Registration page load and validation checks
- Registration negative scenarios
- Login page load and validation checks
- Login positive and negative scenarios
- Logout availability after login

Automation will use:

- Page Object Model
- Base page abstraction
- Shared fixtures and test data
- Playwright config and reporting
- Retry support and failure screenshots
