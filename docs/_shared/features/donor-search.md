# Feature: donor search

| | |
| --- | --- |
| Status | Implemented |
| Code | `components/Landing.tsx` (`handleSearch`, `resetSearch`), `lib/site.ts` (`searchDonors`) |
| Backend | `GET /api/v1/apps/blood-management/public/donors?origin&bloodGroup&district&limit=50` |

## Behaviour

- The hero has a blood group select and a district select. **Search Donors** calls the API from the browser (through the same-origin `/api` rewrite), then scrolls smoothly to `#donors-section`.
- Before any search, the donor section shows the 12 donors the page was rendered with.
- While loading it shows a searching state; on failure an error state; **reset** clears both filters and shows the original 12.
- Results come from the backend: **VERIFIED and available** donors only, never-donated first, up to 50.

## Rules

- Filters are optional; an empty group or district means "any".
- The UI group label (`A+`) is mapped to the API enum (`A_POS`) through `GROUP_FROM_LABEL`.
- Each donor card shows the donor's phone as a `tel:` link; the phone is public by design once a donor is verified.
- Search uses the `GET` read limiter (default 300 per IP per 15 minutes).
