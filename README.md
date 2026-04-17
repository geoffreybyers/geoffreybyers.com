# geoffreybyers.com

Personal site for Geoffrey Byers — posts + work (companies and projects). Astro 5 + Tailwind v4 + Preact, hosted on Cloudflare Pages.

## Dev

```bash
npm install
npm run dev        # http://localhost:4321
```

Search (Pagefind) only works against the built output — use `npm run build && npm run preview` to test it locally.

## Build

```bash
npm run build      # astro build + pagefind index
npm run preview    # preview the production build locally
```

## Write a post

1. Create `src/content/posts/<year>/<slug>.mdx`.
2. Frontmatter:
   ```yaml
   ---
   title: "My Post"
   description: "One-line description."
   pubDate: 2026-04-15
   tags: ["tag1"]
   # Optional: link to a case-study work entry
   # work: restaurant-cold-email
   # Optional: per-post OG image (path under /public)
   # ogImage: /og-custom.png
   ---
   ```
3. `git commit && git push` → Cloudflare Pages auto-deploys.

## Add a work entry

Each entry lives at `src/content/work/<slug>.mdx`.

| Field        | Required | Notes |
|--------------|----------|-------|
| `name`       | yes      | Display name |
| `tagline`    | yes      | One-line summary |
| `kind`       | yes      | `company` or `project` |
| `type`       | yes      | `case-study` (gets `/work/<slug>` page) or `link-out` (tile links out only) |
| `status`     | yes      | `active` / `maintained` / `shipped` / `acquired` / `sunset` |
| `startDate`  | yes      | ISO date |
| `endDate`    | no       | Omit if ongoing |
| `featured`   | no       | `true` surfaces on the homepage teaser |
| `externalUrl`| cond.    | Required if `type: link-out` |
| `repoUrl`    | no       | Optional GitHub link |
| `liveUrl`    | no       | Optional live site link |
| `accentColor`| no       | Per-entry accent override |
| `ogImage`    | no       | Per-entry OG image (path under `/public`) |

The body is rendered only for `type: case-study` entries.

## Commands

| Command            | What it does                    |
|--------------------|---------------------------------|
| `npm run dev`      | Dev server                      |
| `npm run build`    | Production build + search index |
| `npm run preview`  | Preview the built site          |
| `npm run check`    | Biome lint + format check       |
| `npm run fix`      | Biome auto-fix                  |
| `npm run typecheck`| Astro + TS typecheck            |

## Stack

- **Astro 5** — static site generator
- **Tailwind v4** — via `@tailwindcss/vite`
- **Preact** — search island only (3 KB)
- **MDX + Shiki** — content + code highlighting
- **Pagefind** — static search index
- **Biome** — lint + format (TS/JS/JSON only; `.astro` templates are excluded because Biome does not parse Astro syntax yet)
- **Geist Sans + Geist Mono** — self-hosted via `@fontsource-variable`
- **Cloudflare Pages** — hosting
- **Cloudflare Web Analytics** — analytics
