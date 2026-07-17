# ParaBank Manual Test Execution Report

## Summary

Manual exploration of the Registration and Login modules surfaced two major environment/application defects:

- Registration rejects every username tested as already existing, preventing a clean positive registration path.
- Login accepts nonblank credentials and routes to Accounts Overview for John Smith, indicating broken credential validation or seeded demo behavior.

## Execution Results

| Test Case ID | Result | Evidence | Defect Reference |
|---|---|---|---|
| TC-REG-001 | Pass | Registration page title and form controls rendered at `/register.htm`. | None |
| TC-REG-002 | Pass | Blank submit showed required-field messages including First name, Last name, Address, City, State, Zip Code, SSN, Username, Password, and Confirm. | None |
| TC-REG-003 | Pass | Registration showed `This username already exists.` for multiple tested usernames. | DEF-001 |
| TC-REG-004 | Blocked | Duplicate-username validation fired before password confirmation could be isolated. | DEF-001 |
| TC-REG-005 | Fail | Multiple unique-looking usernames still returned `This username already exists.` and blocked account creation. | DEF-001 |
| TC-LOGIN-001 | Pass | Login controls were visible on the home/login panel and login page. | None |
| TC-LOGIN-002 | Pass | Blank submit showed `Please enter a username and password.` on `/login.htm`. | None |
| TC-LOGIN-003 | Fail | `foo` / `bar` logged in successfully instead of failing. | DEF-002 |
| TC-LOGIN-004 | Pass | Nonblank credentials redirected to `/overview.htm` and displayed `Welcome John Smith` and Logout. | DEF-002 |
| TC-LOGIN-005 | Pass | Log Out returned the user to the public home page. | None |

## Defects Found

### DEF-001 Registration treats every tested username as existing

Observed behavior:

- The Registration form returned `This username already exists.` for multiple unique-looking usernames.
- Positive registration could not be completed.

Impact:

- Blocks the main Registration success path.
- Prevents downstream validation of automatic login after registration.

### DEF-002 Login accepts nonblank credentials without real credential validation

Observed behavior:

- Nonblank credentials such as `foo` / `bar` redirected to Accounts Overview.
- The page displayed `Welcome John Smith` regardless of the entered values.

Impact:

- Invalid credentials are not rejected.
- Authentication appears broken or bypassed in the demo environment.

## Notes

- The phone number field did not produce a required-field message and appears optional in practice.
- Registration password mismatch could not be isolated because the username-validation defect blocked the path first.
- The login flow behavior suggests either a seeded demo account or an application defect; either way, it is not validating the entered credentials as expected.
