Step 1 — Understand the Application
Read docs/02_User_Stories.md completely.

Do not generate any code.

Understand:

• Business flow
• User stories
• Acceptance criteria
• Test data
• Functional flow

Reply with a summary of your understanding and identify any ambiguities.
Step 2 — Manual Exploration
Read docs/02_User_Stories.md.

Open the ParaBank application.

Navigate through the Registration and Login modules manually.

Inspect every page.

Record:

• URLs
• Page titles
• Buttons
• Input fields
• Labels
• Error messages
• Success messages
• Navigation flow

Verify each acceptance criterion manually before writing any automation.

Generate a Manual Test Execution Report in Markdown.
Step 3 — Generate Test Plan
Using docs/02_User_Stories.md, Step 2 findings

Generate:

• Test Plan
• Test Scope
• Risks
• Entry Criteria
• Exit Criteria
• Test Environment
• Test Deliverables
• Assumptions
• Dependencies
• Automation Scope

Save as docs/03_Test_Plan.md

Step 4 — Generate Manual Test Cases
Using the User Stories and docs/03_Test_Plan.md

Create detailed manual test cases.

Include:

• Test Case ID
• Preconditions
• Test Steps
• Expected Result
• Actual Result (Blank)
• Status (Blank)
• Priority
• Severity

Save as docs/04_Manual_Test_Cases.md
Step 5 — Execute Manual Tests
Execute every manual test case against the live application.

Update:

• Pass
• Fail
• Blocked

Record any defects found.

Generate:

docs/Manual_Test_Execution_Report.md
Step 6 — Identify Locators
Inspect every page.

Collect only stable Playwright locators.

Prefer:

getByRole()

getByLabel()

getByPlaceholder()

locator()

Avoid XPath unless absolutely necessary.

Create:

docs/08_Locators.md

Include:

• Page
• Element
• Locator Strategy
• Selector
• Notes

Step 7 — Design Automation Framework
Design a Playwright TypeScript automation framework.

Use:

• Page Object Model
• Fixtures
• Base Page
• Utilities
• Test Data
• Environment Config
• Playwright Config
• Reporter
• Logger

Do not generate tests yet.

Generate framework architecture only.
Step 8 — Generate Page Objects
Generate:

RegisterPage.ts

LoginPage.ts

BasePage.ts

Use reusable methods.

No duplicated code.

Follow Playwright best practices.

Step 9 — Generate Tests
Generate Playwright tests only after:

✓ Manual execution passed

✓ Locators verified

✓ Page Objects created

Generate:

register.spec.ts

login.spec.ts

Include:

Assertions

Screenshots on failure

Logging

Test annotations

Clean code

Retry support

Step 10 — Heal it using playwright test healer agent if needed. and Improve Framework
Review the entire framework.


Refactor duplicated code.

Follow SOLID principles.

Improve maintainability.

Suggest additional utilities, fixtures, and reusable components.

Generate a Framework Improvement Report.
