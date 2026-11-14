# Flow: a visitor requests blood

```mermaid
sequenceDiagram
  participant V as Visitor
  participant L as Landing.tsx
  participant R as /api rewrite
  participant B as Backend public API
  V->>L: Request Blood Urgently, fills the modal
  L->>L: build body, neededBy to UTC ISO
  L->>R: POST /api/v1/apps/blood-management/public/requests
  R->>B: forwarded with origin in the body
  B-->>L: 201 { id, status: PENDING } or an error
  L-->>V: "received, staff will verify" or an error message
```

1. The visitor opens the modal and fills the fields (see [request blood](../features/request-blood.md)).
2. On submit the button shows a busy state; the body is `{ origin, patientName, hospital, district, bloodGroup, units, urgency, neededBy, contactName, contactPhone, reason }` with the group mapped from `O+` to `O_POS`.
3. The backend validates, normalises the phone and stores a **PENDING** request with source PUBLIC.
4. The site shows the success panel. Nothing appears in the public list yet.
5. Staff verify the request in the admin panel (repo `blood-managment-admin`, `docs/_shared/flows/request-handling.md`). After the landing page cache refreshes (30 to 60 seconds), the request shows under Live Emergency Requests.

Errors: 422 "check your details"; 429 "too many attempts"; other failures a generic message. The request is never shown or retried automatically.
