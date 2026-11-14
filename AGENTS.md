<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent notes: Blood Management public site

The public "RoktoLife BD" landing page (Next.js). Platform overview and the other repositories: `AGENTS.md` in the `business-central-backend` repository.

- **Read first:** [docs/SUMMARY.md](docs/SUMMARY.md) (what the page does, endpoints called, caching, gaps). The README in this repository is the default create-next-app text and is not accurate.
- **Run:** `npm install`, `npm run dev` (`http://roktolife.localhost:3100`). Copy `.env.example`: `BACKEND_URL` is the backend, `NEXT_PUBLIC_SITE_ORIGIN` must match the company's CLIENT address set in Business Central or every public call returns 404.
- **Check before finishing:** `npm run lint`, `npm run build`.
- **Rules:** the site has no theme system and one page; `GET /public/site` is not used. `getLandingData()` is cached and swallows backend errors into an empty page.
- **Docs:** organised by theme (`docs/_shared/`, `docs/themes/<theme-key>/`). Update `docs/SUMMARY.md` and `docs/changelog.md` when behaviour changes. No secrets in docs.
