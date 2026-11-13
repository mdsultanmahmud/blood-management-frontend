# Blood Management: public site

The public emergency blood-donor landing page (Next.js). No theme system in code yet.

| | |
| --- | --- |
| Code | this repository (`blood-management-frontend`) |
| Backend | `business-central-backend`, module `src/apps/blood-management` (see its `docs/`) |
| Start here | [SUMMARY.md](SUMMARY.md) |

## Layout

- `SUMMARY.md`: start here. What is built, routes, design, rules, gaps. One page.
- `_shared/`: documentation that is the same in every theme: `features/`, `flows/`, `decisions/`, `guides/`, `designs/` (design specs and mockups).
- `themes/<theme-key>/`: documentation of one theme: `designs/`, `features/`, `flows/`, `guides/`. `base-theme` is the complete reference theme. Any other theme documents **only its differences**; a missing file means "same as base-theme". Folder names equal the theme key in Business Central (`bc_themes.key`).
- `changelog.md`: what changed and when.
