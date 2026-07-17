# ParaBank Automation Framework
# User Stories

---

# Document Information

| Item | Details |
|------|----------|
| Project | ParaBank Automation Framework |
| Application | ParaBank |
| Environment | Demo |
| Base URL | https://parabank.parasoft.com/parabank/index.htm |
| Registration URL | https://parabank.parasoft.com/parabank/register.htm |
| Technology | Web Application |
| Automation Tool | Playwright |
| Language | TypeScript |
| Framework | Playwright Test |
| Design Pattern | Page Object Model (POM) |
| Version | 1.0 |
| Author | Hiral Sheth |

---

# Project Overview

## Objective

Build a scalable Playwright TypeScript automation framework for the ParaBank application.

The automation framework will validate all major banking workflows beginning with Registration and Login.

---

# Business Modules

| Module | Status |
|----------|---------|
| Registration | Phase 1 |
| Login | Phase 1 |
| Accounts Overview | Phase 2 |
| Open New Account | Phase 2 |
| Transfer Funds | Phase 3 |
| Bill Pay | Phase 3 |
| Find Transactions | Phase 4 |
| Request Loan | Phase 4 |
| Update Contact Info | Phase 5 |
| Logout | Phase 5 |

---

# User Story

## Story ID

US-001

## Story Name

Customer Registration

## Story

As a new customer, I want to register an account so that I can access banking services.

## Acceptance Criteria

- The registration page loads with all required fields visible.
- Submitting an empty form displays required-field validation messages.
- Submitting mismatched passwords displays a password confirmation error.
- Submitting a duplicate username displays a username-exists message.
- Submitting valid, unique data creates an account and redirects to Accounts Overview.
- The user is automatically logged in after successful registration.

---

## Story ID

US-002

## Story Name

Customer Login

## Story

As a registered customer, I want to log in with my credentials so that I can manage my accounts.

## Acceptance Criteria

- The login page loads with Username, Password, and Log In controls visible.
- Submitting blank fields displays a validation message.
- Submitting invalid credentials rejects the login attempt.
- Submitting valid credentials redirects to Accounts Overview.
- The Log Out link is visible in the authenticated state.
- Clicking Log Out ends the session and returns the user to the public home page.
