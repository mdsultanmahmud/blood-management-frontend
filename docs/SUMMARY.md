# Blood Management public site summary

> The public "RoktoLife BD" emergency blood-donor landing page (Next.js app router). Visitors see live verified requests, donors and blood banks from the Blood Management public API, can search donors, request blood and register as a donor. The README in this repository is still the default create-next-app text and is not accurate. Status: **Partial** (one page).

Verified against code on 2026-11-13 (folder: this repository, `blood-management-frontend`). Detailed docs: none yet. Docs are organised by theme; this site has **no theme system** yet (the look is hard-coded Tailwind classes), so everything lives in `_shared/` and `themes/base-theme/` documents the single current look. **Read `AGENTS.md` first:** this Next.js version has breaking changes; read `node_modules/next/dist/docs/` before changing Next code.

## Stack and code map

Next 16.4.6 App Router with `cacheComponents: true` and `partialPrefetching: true`; React 19.3; Tailwind 4 via `@tailwindcss/turbopack`; lucide-react. Dev: `node scripts/dev.mjs` (port 3100, opens `http://roktolife.localhost:3100`). `npm start` uses port 3100.

| Path | Purpose |
| --- | --- |
| `app/layout.tsx` | Metadata (title "RoktoLife BD \| Emergency Blood Donor Network in Bangladesh", description, keywords, openGraph); Geist and Geist Mono fonts; `html lang="en"` |
| `app/page.tsx` | Server component: Suspense (blank slate-50 fallback), awaits `getLandingData()`, renders `<Landing/>` |
| `components/Landing.tsx` | 1713 lines, a single `"use client"` component: all sections, modals and forms |
| `lib/data.ts` | Server data fetch with `"use cache"` |
| `lib/site.ts` | `SITE_ORIGIN`, `API_PATH`, DTO types, mappers, `ApiProblem`, browser calls |
| `next.config.ts` | Rewrites `/api/:path*` to `${BACKEND_URL}/api/:path*` (default `http://localhost:4000`) |
| `app/globals.css` | `--background #fff`, `--foreground #171717`, pointer-cursor rule |
| `.env.example` | `BACKEND_URL`, `NEXT_PUBLIC_SITE_ORIGIN` |
| `app/favicon.ico`, `public/*.svg` | Leftover create-next-app assets |

## Implemented features

| Feature | Status | Where in code | Notes |
| --- | --- | --- | --- |
| Landing page with live data | Implemented | `app/page.tsx`, `lib/data.ts`, `Landing.tsx` | Summary, requests, donors, banks from the public API |
| Donor search | Implemented | `Landing.tsx` | Browser `GET /donors` with `bloodGroup` and `district`, limit 50 |
| Register as donor (modal) | Implemented | `Landing.tsx` | `POST /donors`; stays PENDING until staff verify |
| Request blood (modal) | Implemented | `Landing.tsx` | `POST /requests`; stays PENDING until staff verify |
| Blood compatibility chart | Implemented | `Landing.tsx` | Static data, default O- |
| English and Bangla toggle | Partial | `Landing.tsx` | In-component dictionary, not persisted; some strings stay English |
| Themes, dark mode | Missing | none | Hard-coded Tailwind |
| Other pages, login | Missing | none | Only `/` exists |

## Pages / routes

Only `/`. No other page, no login and no API routes.

**Site identification:** `SITE_ORIGIN = NEXT_PUBLIC_SITE_ORIGIN ?? "http://roktolife.localhost:3100"`. It is sent as `origin` on every public call and must exactly match the company app's **CLIENT** origin in Business Central (no trailing slash). It is an env or build-time constant, **not derived from the request host**.

**Endpoints called** (base `/api/v1/apps/blood-management/public`):

| Where | Call | Purpose |
| --- | --- | --- |
| Server, in `lib/data.ts`, directly against `${BACKEND_URL}` | `GET /summary`, `GET /requests?limit=12`, `GET /donors?limit=12`, `GET /blood-banks` | Landing data |
| Browser, through the same-origin rewrite | `GET /donors?origin&limit=50&bloodGroup&district` | Search donors |
| Browser | `POST /donors` | Register |
| Browser | `POST /requests` | Request blood |

Not used: `GET /site`.

**Caching:** `getLandingData()` uses `"use cache"` with `cacheLife({ stale: 30, revalidate: 60, expire: 3600 })`. On **any error it returns `EMPTY`** (zero counters, empty lists) and that fallback is cached too, so a backend outage can show an empty page for up to the revalidate window.

## Design and UX

- **Landing sections, in order:** sticky header (logo; nav `#urgent-requests`, `#donors-section`, `#compatibility`, `#network`; EN and Bangla toggle; "Emergency: 10615" tel link; mobile menu); hero (search form by blood group and district, buttons "Request Blood Urgently" and "Register as Donor", four stats: Registered Donors, Lives Saved = fulfilledRequests, Districts Covered shown as n / 64, Active Requests); `#urgent-requests` (live verified requests; filters All, Critical Only, Dhaka, Rajshahi, Chittagong; a "Respond / Contact" button opens a modal with a `tel:` link; empty state "No open requests right now"); `#compatibility` (interactive give and receive chart); `#donors-section` (donor cards with `tel:` links, search results, searching, error and reset states); How It Works (3 steps); `#network` (blood banks, rendered only if there are banks); footer (quick links, "National Emergency: Call 999").
- **Fixed district list** in filters and forms: Dhaka, Chittagong, Rajshahi, Sylhet, Khulna, Barisal, Rangpur, Mymensingh.
- **Look:** hard-coded Tailwind: rose-600 brand, slate neutrals, rounded-2xl and 3xl cards, backdrop-blur sticky header, Droplet logo. Fonts Geist and Geist Mono. Tokens are not theme-driven.
- **Languages:** English and Bangla via an in-component dictionary and a client-only toggle (not persisted, no locale in the URL). Footer, "Interactive Tool" and compatibility labels are English only.
- **Responsive:** mobile menu below the md and lg breakpoints; grids collapse on small screens.
- **Forms** (modals in `Landing.tsx`, plain client state, no form library):
  - Register donor posts `{origin, fullName, phone, bloodGroup, district, lastDonatedOn|null}`; defaults group A+ and district Dhaka; success shows a thank-you and auto-closes after 3.5 s; the UI sends no `notes`.
  - Request blood posts patientName, hospital, district, bloodGroup, units (HTML min 1, max 20), urgency, neededBy (ISO via `new Date(..).toISOString()`), contactName, contactPhone, reason (up to 300, null if empty); success shows a "received, staff will verify" panel.
  - Group labels (A+ and so on) map to enum values through `GROUP_FROM_LABEL`.
  - Error mapping (`problemText`): `DONOR_PHONE_TAKEN` gives the duplicate message; HTTP 422 the invalid message; 429 "too many attempts"; anything else a generic message. The 422 mapping was not checked against the backend (UNVERIFIED).

## Auth and permissions

None. Public, anonymous. The company is selected only by `NEXT_PUBLIC_SITE_ORIGIN`. The backend applies per-IP rate limits (reads 300 and writes 10 per 15 minutes by default; exceeding gives 429).

## Business rules worth knowing

- The public API shows only VERIFIED requests and VERIFIED, available donors; submissions are PENDING until staff verify them in the admin panel.
- `NEXT_PUBLIC_SITE_ORIGIN` must match the CLIENT address set in Business Central (App hub > company > Blood Management), or every call returns 404.
- Contact numbers (10615, 999) and the compatibility and How It Works content are static.

## Not built / known gaps

- No theme support, no dark mode; language choice not persisted.
- Hard-coded RoktoLife branding: a second company on the same code would need code changes.
- Only the landing page exists; the empty-error fallback is cached.
- `GET /public/site` (company name, theme key) is never used.
- The default README is inaccurate.
- Planned redesign (donations and inventory): repo `business-central-backend`, `docs/platform/erd/`. Not built.

## Related docs

- In this repository: features [landing page](_shared/features/landing-page.md), [donor search](_shared/features/donor-search.md), [register as a donor](_shared/features/register-donor.md), [request blood](_shared/features/request-blood.md), [data loading and caching](_shared/features/data-loading-and-caching.md); flows [request submission](_shared/flows/request-blood-submission.md), [donor registration](_shared/flows/donor-registration.md); design [look and layout](themes/base-theme/designs/look-and-layout.md)
- Backend: repo `business-central-backend`, `src/apps/blood-management/docs/SUMMARY.md`. Admin panel: repo `blood-managment-admin`, `docs/SUMMARY.md`.
- Next.js rules for agents: `AGENTS.md` in this repository.
