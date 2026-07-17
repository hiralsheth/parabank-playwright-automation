# ParaBank Stable Locators

## Registration Page

| Page | Element | Locator Strategy | Selector | Notes |
|---|---|---|---|---|
| Registration | First Name | locator | `input#customer.firstName` | Stable id and name from the live HTML. |
| Registration | Last Name | locator | `input#customer.lastName` | Stable id and name from the live HTML. |
| Registration | Address | locator | `input#customer.address.street` | Stable id and name from the live HTML. |
| Registration | City | locator | `input#customer.address.city` | Stable id and name from the live HTML. |
| Registration | State | locator | `input#customer.address.state` | Stable id and name from the live HTML. |
| Registration | Zip Code | locator | `input#customer.address.zipCode` | Stable id and name from the live HTML. |
| Registration | Phone Number | locator | `input#customer.phoneNumber` | No required-field error appeared for this field. |
| Registration | SSN | locator | `input#customer.ssn` | Stable id and name from the live HTML. |
| Registration | Username | locator | `input#customer.username` | Stable id and name from the live HTML. |
| Registration | Password | locator | `input#customer.password` | Stable id and name from the live HTML. |
| Registration | Confirm Password | locator | `input#repeatedPassword` | Stable id and name from the live HTML. |
| Registration | Register button | getByRole | `page.getByRole('button', { name: 'Register' })` | Preferred over CSS when the role is stable. |

## Login/Home Page

| Page | Element | Locator Strategy | Selector | Notes |
|---|---|---|---|---|
| Login/Home | Username | locator | `input[name="username"]` | Stable login form field on the home page. |
| Login/Home | Password | locator | `input[name="password"]` | Stable login form field on the home page. |
| Login/Home | Log In button | getByRole | `page.getByRole('button', { name: 'Log In' })` | Visible on the home page login panel. |
| Login/Home | Register link | getByRole | `page.getByRole('link', { name: 'Register' })` | Navigates to the registration page. |
| Login/Home | Forgot login info link | getByRole | `page.getByRole('link', { name: 'Forgot login info?' })` | Useful for navigation coverage only. |

## Authenticated Pages

| Page | Element | Locator Strategy | Selector | Notes |
|---|---|---|---|---|
| Accounts Overview | Welcome message | getByText | `page.getByText('Welcome John Smith')` | Demo-specific and not ideal for automation assertions beyond this environment. |
| Accounts Overview | Log Out link | getByRole | `page.getByRole('link', { name: 'Log Out' })` | Preferred for session-ending checks. |
| Accounts Overview | Accounts Overview heading | getByRole | `page.getByRole('heading', { name: 'Accounts Overview' })` | Stable heading for post-login assertion. |

## Locator Notes

- Prefer role-based locators for buttons and links.
- Prefer id or name selectors for form fields because the live HTML exposes stable attributes.
- Avoid XPath unless a control has no stable role, label, id, or name.
- Registration and login locators are encapsulated in Page Objects — tests must not reference locators directly.
