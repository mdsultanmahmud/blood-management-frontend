# Feature: landing page

The whole site is one page, `/`, for "RoktoLife BD": live verified blood requests, available donors, partner blood banks, and two forms.

| | |
| --- | --- |
| Status | Implemented |
| Code | `app/page.tsx` (server), `components/Landing.tsx` (one `"use client"` component), `lib/data.ts`, `lib/site.ts` |
| Backend | Public API `/api/v1/apps/blood-management/public` (see repo `business-central-backend`, `src/apps/blood-management/docs/api/public-api.md`) |

## Sections, in order

| Section | Anchor | Content |
| --- | --- | --- |
| Header | | Sticky; logo "RoktoLife BD"; links to the four anchors; EN and Bangla toggle; "Emergency: 10615" `tel:` link; mobile menu |
| Hero | | Badge "Bangladesh's #1 Emergency Blood Network"; a search form (blood group, district, **Search Donors**); buttons **Request Blood Urgently** and **Register as Donor**; four stats: Registered Donors, Lives Saved, Districts Covered (shown as n / 64), Active Requests |
| Live Emergency Requests | `#urgent-requests` | Verified requests as cards; filters All, Critical Only, Dhaka, Rajshahi, Chittagong; **Respond / Contact** opens a modal with a `tel:` link to the attendant; empty state "No open requests right now" |
| Compatibility | `#compatibility` | Interactive give and receive chart for the 8 groups (static data, default O-) |
| Donors | `#donors-section` | Donor cards (name, group, district, last donation, `tel:` link); shows search results, a searching state, an error state and a reset |
| How it works | | Three static steps |
| Network | `#network` | Partner blood banks; **only rendered when the backend returns at least one bank** |
| Footer | | Quick links and "National Emergency: Call 999" |

## Data

The server fetches summary, 12 requests, 12 donors and the banks once per page render (cached, see [data loading and caching](data-loading-and-caching.md)). Search and the two forms call the API from the browser. The page never reads `GET /public/site`, so the company name and branding in the page are hard-coded.

## Rules and limits

- The company is chosen by `NEXT_PUBLIC_SITE_ORIGIN`, which must equal the CLIENT address configured in Business Central.
- The district list in the filters and forms is fixed: Dhaka, Chittagong, Rajshahi, Sylhet, Khulna, Barisal, Rangpur, Mymensingh.
- Contact numbers (10615, 999), the compatibility chart and the How It Works text are static.
- Unimplemented: other pages, login, themes, dark mode, a persisted language choice.
