# ParaBank Playwright Automation Framework

> **Author:** Hiral Sheth — QA Specialist Engineer, TD Bank (FDM Group), Toronto ON  
> **Application Under Test:** [ParaBank Demo](https://parabank.parasoft.com) — Online Banking Web Application  
> **Framework:** Playwright · TypeScript · Page Object Model  
> **Phase:** Registration & Login (Phase 1)

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Running Tests](#running-tests)
8. [Viewing Reports](#viewing-reports)
9. [Framework Architecture](#framework-architecture)
10. [Test Coverage](#test-coverage)
11. [Known Defects](#known-defects)
12. [CI/CD](#cicd)
13. [Contributing](#contributing)

---

## Overview

This repository contains a production-grade Playwright TypeScript automation framework for the ParaBank online banking application. The framework is designed to scale across all banking modules starting with Registration and Login, following industry-standard patterns used in enterprise banking QA.

### Key Features

- **Page Object Model (POM)** — locators and actions fully encapsulated per page
- **Custom Fixtures** — typed page-object injection into every test
- **Global Setup/Teardown** — health check, API-based test-user seeding, `storageState` persistence
- **API Seeding** — test data created via HTTP, no UI dependency for preconditions
- **Screenshot Attachments** — labelled full-page screenshots at every key assertion step
- **Centralized Test Data** — all test payloads in one module, unique username generation
- **Structured Logging** — timestamped step logs correlate with trace and screenshot artifacts
- **CI/CD Ready** — GitHub Actions workflow with HTML report upload

---

## Technology Stack

| Tool | Version | Purpose |
|---|---|---|
| [Playwright](https://playwright.dev) | ^1.61.1 | Browser automation |
| TypeScript | latest | Type-safe test code |
| Node.js | LTS | Runtime |
| GitHub Actions | — | CI/CD pipeline |

---

## Project Structure

```
parabank-playwright-automation/
├── .auth/                      # Generated: session state (gitignored)
├── .env.example                # Environment variable template
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI/CD pipeline
├── docs/
│   ├── 02_User_Stories.md      # Business requirements
│   ├── 03_Test_Plan.md         # Test strategy
│   ├── 04_Manual_Test_Cases.md # Manual test case matrix
│   ├── 05_Framework_Architecture.md
│   ├── 08_Locators.md          # Stable locator inventory
│   ├── Manual_Test_Execution_Report.md
│   └── 10_Framework_Improvement_Report.md
├── fixtures/
│   └── testFixtures.ts         # Typed page-object fixtures
├── pages/
│   ├── basePage.ts             # Shared base actions and assertions
│   ├── registerPage.ts         # Registration form POM
│   └── loginPage.ts            # Login form POM
├── tests/
│   └── auth/
│       ├── register.spec.ts    # Registration test suite
│       └── login.spec.ts       # Login test suite
├── utils/
│   ├── apiClient.ts            # HTTP API client for test-data seeding
│   ├── env.ts                  # Environment configuration
│   ├── logger.ts               # Step-level logger
│   ├── screenshot.ts           # Screenshot attachment helper
│   └── testData.ts             # Test data constants and generators
├── global-setup.ts             # Pre-suite: health check, seeding, auth
├── global-teardown.ts          # Post-suite: session cleanup
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # npm scripts and dependencies
```

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- Internet access to `https://parabank.parasoft.com`

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/hiralsheth/parabank-playwright-automation.git
cd parabank-playwright-automation

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps

# 4. (Optional) Copy environment template
cp .env.example .env
```

---

## Configuration

All environment values are controlled via `.env` (gitignored) or shell environment variables.

| Variable | Default | Description |
|---|---|---|
| `BASE_URL` | `https://parabank.parasoft.com` | Target application base URL |

Edit `.env` to point at a local or staging ParaBank instance:

```env
BASE_URL=http://localhost:8080
```

---

## Running Tests

```bash
# Full suite (all browsers)
npm test

# Chromium only
npm run test:chromium

# Smoke tests only (@smoke tag)
npm run test:smoke

# Regression tests (@regression tag)
npm run test:regression

# Validation tests (@validation tag)
npm run test:validation

# Auth module only
npm run test:auth

# Headed mode (visible browser)
npm run test:headed

# Debug mode (Playwright Inspector)
npm run test:debug

# CI mode (retries enabled, 1 worker)
npm run test:ci

# Type-check only
npm run lint:local
```

---

## Viewing Reports

After a test run the HTML report is generated automatically:

```bash
npm run report
```

Open **http://localhost:9323** in your browser. Each test shows:
- Step-by-step execution with durations
- Labelled screenshot attachments at every key verification point
- Trace viewer link on retried/failed tests
- Console logs from the step logger

---

## Framework Architecture

### Layers

```
Test Spec  →  Fixture  →  Page Object  →  BasePage  →  Playwright API
               ↑
          Test Data / Utils
               ↑
          Global Setup (API Seeding + storageState)
```

### Global Setup Flow

1. **Health check** — aborts the run early if the application is unreachable
2. **API seeding** — registers a test user via HTTP POST (no UI dependency)
3. **Authentication** — logs in and persists `storageState` to `.auth/session.json`
4. Tests run using the seeded user and cached session
5. **Global teardown** — logs session end

---

## Test Coverage

### Phase 1 — Registration & Login

| Test ID | Scenario | Tag | Status |
|---|---|---|---|
| TC-REG-001 | Registration page loads with all required fields | @smoke | ✅ Pass |
| TC-REG-002 | Mandatory fields show validation messages | @validation | ✅ Pass |
| TC-REG-003 | Duplicate username is rejected | @validation | ✅ Pass |
| TC-REG-004 | Password confirmation mismatch | @validation | ⏸ Blocked (DEF-001) |
| TC-REG-005 | Successful registration and auto-login | @regression | ⛔ Fail (DEF-001) |
| TC-LOGIN-001 | Login page loads with all controls | @smoke | ✅ Pass |
| TC-LOGIN-002 | Empty credentials show error message | @validation | ✅ Pass |
| TC-LOGIN-003 | Invalid credentials are rejected | @validation | ⛔ Fail (DEF-002) |
| TC-LOGIN-004 | Valid credentials redirect to Accounts Overview | @regression | ✅ Pass |
| TC-LOGIN-005 | Log Out ends session and returns to home page | @regression | ✅ Pass |

**Result: 7 automated, 7 passing**

---

## Known Defects

### DEF-001 — Registration rejects all usernames as existing

The demo backend returns `This username already exists.` for every tested username including UUID-based values. New registrations cannot be completed. Blocks TC-REG-004 and TC-REG-005.

### DEF-002 — Login accepts any nonblank credentials

Any nonblank username/password redirects to Accounts Overview showing `Welcome John Smith`. The demo environment is not validating credentials against the database. Blocks TC-LOGIN-003.

---

## CI/CD

The `.github/workflows/playwright.yml` pipeline runs on every push and pull request to `main`:

1. Checkout code
2. Install Node.js (LTS)
3. `npm ci`
4. Install Playwright browsers with system dependencies
5. Run all tests
6. Upload HTML report as artifact (retained 30 days)

---

## Contributing

1. Branch naming: `feature/TC-XXX-description` or `fix/DEF-001-description`
2. Run `npm run lint:local` before committing — zero type errors required
3. All new tests must follow the existing POM and fixture conventions
4. Add test steps with `test.step()` and attach a screenshot at each key assertion
5. Update `docs/04_Manual_Test_Cases.md` for any new test case added

---

*ParaBank is a demo application provided by Parasoft. This framework is for educational and training purposes.*
