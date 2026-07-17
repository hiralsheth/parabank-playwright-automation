# ParaBank Framework Architecture

## 1. Goal

Design a maintainable Playwright TypeScript automation framework for ParaBank that starts with the Registration and Login flows and can scale into later banking modules.

## 2. Architecture Principles

- Use Page Object Model for UI behavior and locator reuse.
- Keep test files declarative and scenario-focused.
- Centralize reusable actions in a Base Page.
- Store test data outside the test logic.
- Use fixtures for object lifecycle and shared setup.
- Prefer stable locators and avoid brittle selectors.
- Capture failures with screenshots and traces.
- Keep environment-specific values in config, not in test code.

## 3. Implemented Folder Structure

```text
tests/
  auth/
    register.spec.ts
    login.spec.ts
pages/
  basePage.ts
  registerPage.ts
  loginPage.ts
fixtures/
  testFixtures.ts
utils/
  logger.ts
  testData.ts
  env.ts
  screenshot.ts
  apiClient.ts
docs/
  02_User_Stories.md
  03_Test_Plan.md
  04_Manual_Test_Cases.md
  05_Framework_Architecture.md
  08_Locators.md
  Manual_Test_Execution_Report.md
  10_Framework_Improvement_Report.md
global-setup.ts
global-teardown.ts
playwright.config.ts
tsconfig.json
package.json
```

## 4. Layer Responsibilities

### 4.1 Base Page

The Base Page contains shared browser actions and assertions that are reused across modules: navigation, click helpers, field filling helpers, text checks, and common waits.

### 4.2 Register Page

The Register Page owns the registration form locators and actions for entering customer data, submitting the form, and verifying registration-related messages.

### 4.3 Login Page

The Login Page owns the login form locators and actions for entering credentials, submitting login, reading validation errors, and checking authenticated-state indicators.

### 4.4 Fixtures

Custom fixtures extend `@playwright/test` to inject typed page objects (`registerPage`, `loginPage`) into every test automatically. Tests import `test` and `expect` from `fixtures/testFixtures.ts`.

### 4.5 Utilities

| File | Purpose |
|---|---|
| `env.ts` | Centralized environment values (baseURL, paths) |
| `testData.ts` | Registration payloads, login credentials, username generator |
| `logger.ts` | Timestamped step logging |
| `screenshot.ts` | Full-page screenshot attached to HTML report |
| `apiClient.ts` | HTTP-based test-data seeding (no UI dependency) |

### 4.6 Global Setup

1. Health check — aborts the run if the application is unreachable
2. API seeding — registers a test user via HTTP POST
3. Authentication — logs in and saves `storageState` to `.auth/session.json`

### 4.7 Global Teardown

Logs session end; retains `.auth/` files for post-run debugging.

## 5. Playwright Configuration

- `testDir`: `./tests`
- `globalSetup` / `globalTeardown`: `./global-setup`, `./global-teardown`
- Retries: 2 on CI, 0 locally
- Trace: `on-first-retry`
- Screenshot: `only-on-failure`
- Base URL from `BASE_URL` env var (defaults to demo site)
- Three browser projects: Chromium, Firefox, WebKit

## 6. Test Organization

- Registration coverage in `tests/auth/register.spec.ts`
- Login coverage in `tests/auth/login.spec.ts`
- Tests use `test.step()` for structured sub-steps in the HTML report
- Tags: `@smoke`, `@regression`, `@validation`, `@registration`, `@login`

## 7. Reporting Strategy

- HTML reporter for local review (`npm run report`)
- Labelled screenshot attachments at every key assertion point
- Trace viewer on retried/failed tests
- Timestamped console logs from the step logger
