# Feature: register as a donor

| | |
| --- | --- |
| Status | Implemented |
| Code | `components/Landing.tsx` (`regForm`, `handleRegisterSubmit`), `lib/site.ts` (`registerDonor`, `problemText`) |
| Backend | `POST /api/v1/apps/blood-management/public/donors` (creates a PENDING donor) |

## Form

A modal opened by **Register as Donor**. Fields (plain client state, no form library):

| Field | Default | Notes |
| --- | --- | --- |
| Name | empty | placeholder "e.g. Tanvir Ahmed"; sent as `fullName` |
| Phone | empty | placeholder `017XXXXXXXX`; the backend normalises it |
| Blood group | A+ | label mapped to the enum |
| District | Dhaka | one of the fixed 8 |
| Last donation date | empty | optional; empty is sent as `null` (never donated) |

The form sends `{ origin, fullName, phone, bloodGroup, district, lastDonatedOn }`. It does not send `notes`.

## Outcome

- **Success:** a thank-you message; the modal closes by itself after 3.5 seconds and the form resets. The donor is **PENDING** and invisible until staff verify it in the admin panel.
- **Errors** (`problemText`): `DONOR_PHONE_TAKEN` shows the "already registered" message; HTTP 422 the "check your details" message; 429 the "too many attempts" message; anything else a generic message.

## Rules

- Writes are limited to 10 per IP per 15 minutes by default.
- The backend validates everything again (name 2 to 120, district 2 to 60, Bangladeshi mobile).
- UNVERIFIED: the 422 mapping was not compared with the backend's exact response in a live run.

Flow: [donor registration](../flows/donor-registration.md).
