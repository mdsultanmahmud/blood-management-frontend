# base-theme: look and layout

The site has **no theme system**: colors, spacing and type are hard-coded Tailwind classes in `components/Landing.tsx`. This page records the current look, which is the only one, so a future theme system has something to match.

## Look

| Aspect | Current value |
| --- | --- |
| Page background and text | `bg-slate-50`, text `slate-900`; `--background #fff`, `--foreground #171717` in `app/globals.css` |
| Brand | rose: `rose-600` for accents and links, `rose-50` and `rose-200` for chips; the page selection color is `rose-500` |
| Logo | A rounded 44 px tile with a rose to red gradient and a droplet icon, then the wordmark "Rokto**Life**" (Life in rose) and a small "BD" pill; a Bangla tagline under it |
| Neutrals | slate scale for borders, muted text and the footer |
| Cards | `rounded-2xl` and `rounded-3xl`, thin slate borders, soft shadows |
| Header | Sticky, 80 px tall, translucent white with backdrop blur and a bottom border |
| Fonts | Inter for everything, loaded with `next/font/google` in `app/layout.tsx` (Latin subset); Inter has no Bangla glyphs, so the tagline and Bangla strings still fall back to the system Bangla font |
| Icons | `lucide-react` |
| Page title | "RoktoLife BD \| Emergency Blood Donor Network in Bangladesh" |

## Layout

- Single column of full-width sections inside `max-w-7xl` containers with `px-4 sm:px-6 lg:px-8`.
- Hero, then the live requests, compatibility chart, donors, How It Works, blood bank network and footer (see [landing page](../../../_shared/features/landing-page.md)).
- Three modals exist: contact a requester, register as donor, request blood.

## Responsive

- A mobile menu replaces the header links on small screens; card grids collapse on small screens (Tailwind breakpoints inside `Landing.tsx`).

## Gaps

- No design tokens, theme key or dark mode; changing the brand means editing classes in `Landing.tsx`.
- Language switching (English and Bangla) is a client-side dictionary, not persisted and not in the URL.
- No image mockups are stored; add screenshots next to this file.
