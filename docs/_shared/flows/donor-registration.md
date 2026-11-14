# Flow: a visitor registers as a donor

1. The visitor opens **Register as Donor** and fills Name, Phone, Blood group, District and, optionally, the last donation date (see [register as a donor](../features/register-donor.md)).
2. On submit the site posts `{ origin, fullName, phone, bloodGroup, district, lastDonatedOn }` to `/api/v1/apps/blood-management/public/donors` (group mapped from `A+` to `A_POS`; empty date sent as `null`).
3. The backend normalises the phone to `+8801XXXXXXXXX`. If that phone is already a donor of this company it answers 409 `DONOR_PHONE_TAKEN` and the form shows the "already registered" message.
4. Otherwise it stores a **PENDING** donor (source PUBLIC) and answers 201.
5. The site shows a thank-you message and closes the modal after 3.5 seconds, resetting the form.
6. Staff verify the donor in the admin panel (repo `blood-managment-admin`, `docs/_shared/flows/donor-verification.md`). Once VERIFIED **and** available, the donor appears in the donors section and in search results after the page cache refreshes.
