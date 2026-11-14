# Feature: request blood

| | |
| --- | --- |
| Status | Implemented |
| Code | `components/Landing.tsx` (`reqForm`, `handleRequestSubmit`, `closeRequest`), `lib/site.ts` (`submitRequest`) |
| Backend | `POST /api/v1/apps/blood-management/public/requests` (creates a PENDING request) |

## Form

A modal titled **Request Blood Urgently**, opened from several buttons on the page (the request and register modals have 5 open triggers in `Landing.tsx` in total). Defaults: district Dhaka, blood group O+, 1 bag, urgency URGENT.

| Field | Rule |
| --- | --- |
| Patient name | required (backend: 2 to 120) |
| Hospital | required (backend: 2 to 160) |
| District | one of the fixed 8 |
| Blood group | label mapped to the enum |
| Bags (units) | HTML minimum 1, maximum 20 |
| Urgency | CRITICAL, URGENT or MODERATE |
| Needed by | date and time (`datetime-local`); converted with `new Date(value).toISOString()`, so the API receives a UTC timestamp ending in `Z` |
| Attendant name and phone | the person visitors will call |
| Reason | optional, up to 300 characters; empty becomes `null` |

## Outcome

- **Success:** a "received, staff will verify" panel replaces the form; the form resets. The request is **PENDING** and does not appear in Live Emergency Requests until staff verify it. The modal stays open until the visitor closes it (closing also clears the success and error state).
- **Errors:** same mapping as donor registration (`DONOR_PHONE_TAKEN` is not relevant here): 422 "check your details", 429 "too many attempts", otherwise a generic message.

## Rules

- Staff decide whether a request is shown; the visitor cannot choose a status.
- The attendant's phone becomes public on the site once the request is verified.
- Writes are limited to 10 per IP per 15 minutes by default.

Flow: [request submission](../flows/request-blood-submission.md).
