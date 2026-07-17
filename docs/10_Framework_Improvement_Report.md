# ParaBank Framework Improvement Report

## 1. Current State

The framework now has:

- A documented test plan and user stories
- Manual test cases and execution findings
- A stable locator inventory
- A framework architecture outline
- Core page objects for Base, Registration, and Login
- Custom fixtures for typed page-object injection
- Centralized utilities: env, testData, logger, screenshot, apiClient
- Global setup with health check, API seeding, and storageState
- 7 automated tests passing across Registration and Login

## 2. Strengths Observed

- Stable locators are available for all current Registration and Login controls.
- Page objects are small, typed, and reusable.
- Shared actions are centralized in Base Page.
- The architecture already separates docs, pages, fixtures, utilities, and tests.
- Custom fixtures inject page objects cleanly, keeping test files declarative.
- Global setup validates environment health before any test runs.

## 3. Improvement Opportunities

### 3.1 Video capture on failure

Enable `video: 'on-first-retry'` in playwright.config.ts to supplement screenshots and traces with a full recording when a test fails after a retry.

### 3.2 Multi-reporter output

Add a JUnit XML reporter alongside the HTML reporter for CI system integration (e.g., Jenkins, Azure DevOps test result dashboards):

```ts
reporter: [['html'], ['junit', { outputFile: 'test-results/results.xml' }]]
```

### 3.3 storageState injection for authenticated tests

Tests that require an authenticated starting state should inject the saved `.auth/session.json` via the `storageState` project option rather than re-logging in. This avoids repeated UI login steps.

### 3.4 Action and navigation timeout tuning

Set explicit `actionTimeout` and `navigationTimeout` in the `use` block of playwright.config.ts to prevent flaky timeouts on slower CI runners.

### 3.5 Base Page method expansion

Add reusable helpers for:
- Reading validation error messages
- Checking page title
- Waiting for network idle after form submission

### 3.6 Environment-aware test skipping

Add logic to skip tests that are blocked by known environment defects (DEF-001, DEF-002) using a `skipIfDefect()` helper rather than relying solely on documentation.

## 4. SOLID-Oriented Refactor Recommendations

- **Single Responsibility**: keep locators, actions, and assertions narrowly scoped per page.
- **Open/Closed**: add new page methods without rewriting existing tests.
- **Liskov Substitution**: keep page objects consistent in how they expose `open()`, `fill()`, and action methods.
- **Interface Segregation**: keep fixture interfaces small and focused on the module under test.
- **Dependency Inversion**: let tests depend on page object interfaces or fixtures instead of direct locator calls.

## 5. Test Generation Gate Conditions

Do not generate automation for a test case until:

- The positive path for that scenario can be completed reliably in the target environment.
- The expected error messages are stable and not intermittent.
- The manual execution result is a confirmed Pass.

Currently blocked: TC-REG-004, TC-REG-005, TC-LOGIN-003 (DEF-001, DEF-002).
