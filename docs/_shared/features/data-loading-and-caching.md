# Feature: data loading and caching

| | |
| --- | --- |
| Status | Implemented |
| Code | `app/page.tsx`, `lib/data.ts`, `lib/site.ts`, `next.config.ts` |

## Server data (landing page)

`getLandingData()` in `lib/data.ts` runs on the server and fetches four public endpoints directly from `BACKEND_URL` (default `http://localhost:4000`): `GET /summary`, `GET /requests?limit=12`, `GET /donors?limit=12`, `GET /blood-banks`, each with `origin = NEXT_PUBLIC_SITE_ORIGIN`.

- The function uses `"use cache"` with `cacheLife({ stale: 30, revalidate: 60, expire: 3600 })`: the client may reuse a result for 30 s (`stale`), the server regenerates it after 60 s (`revalidate`), and it is dropped after 1 hour (`expire`). Consult the Next.js docs in `node_modules/next/dist/docs/` for the exact semantics of these three values.
- `app/page.tsx` wraps the call in `Suspense` with a blank slate-50 fallback and renders `<Landing/>` with the result.
- Next 16 settings: `cacheComponents: true` and `partialPrefetching: true`.

## Browser calls

Search, register and request call the API from the browser through the same-origin rewrite in `next.config.ts` (`/api/:path*` goes to `${BACKEND_URL}/api/:path*`), so no CORS setup is needed.

## Failure behaviour (important)

On **any** error `getLandingData()` returns `EMPTY` (zero counters, empty lists) instead of throwing, and that fallback is **cached like a normal result**. A backend outage or a wrong `NEXT_PUBLIC_SITE_ORIGIN` therefore shows an empty page for up to the revalidate window. Fixing it later would mean not caching failures.

## Configuration

| Variable | Purpose |
| --- | --- |
| `BACKEND_URL` | The Business Central backend (server fetch and rewrite) |
| `NEXT_PUBLIC_SITE_ORIGIN` | This site's own CLIENT address; sent as `origin` on every call; must match Business Central exactly, with no trailing slash |

Both are in `.env.example`. The site does not derive the origin from the request host.
