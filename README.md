# Data Maven

Marketing studio website for Data Maven — a six-lens digital presence audit
for local businesses across Los Angeles County. Built with Next.js (App
Router), TypeScript, and Tailwind CSS v4. Content lives in version-controlled
TypeScript/MDX files, not a CMS.

## Stack

- **Next.js 16** (App Router, Turbopack, server components by default)
- **TypeScript**, **Tailwind CSS v4** (CSS-first `@theme` config, no `tailwind.config.js`)
- **next-mdx-remote** for the `/areas/[city]` pages, **gray-matter** for frontmatter
- **Zod** for server-side form validation
- No CMS, no paid dependencies, no analytics enabled by default

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Runs the placeholder check, then `next build`. Fails if a published city page still has placeholder markers. |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check:placeholders` | Lists every outstanding `{{TOKEN}}` / `TODO` / `PLACEHOLDER:` marker in the repo, non-blocking |
| `npm run lint` | ESLint |

## Editing content (no code required for most of this)

All editable copy lives under `/content` and `src/lib/site-config.ts` as plain
TypeScript objects — open the file, edit the string, save.

| What you want to change | File |
|---|---|
| Studio name, domain, contact info, address, booking link | `src/lib/site-config.ts` |
| The six audit lenses (what's checked, why, examples) | `content/lenses.ts` |
| Home page FAQ | `content/faq.ts` |
| Home page "problem" examples | `content/problem-examples.ts` |
| Who the audit is/isn't for | `content/audience-fit.ts` |
| Engagement timeline steps | `content/engagement-steps.ts` |
| Services (mapped to audit findings) | `content/services.ts` |
| Self-serve mini audit questions | `content/mini-audit-questions.ts` |
| City/area pages | `content/areas/*.mdx` — see below |

Each file exports a typed array or object with a comment at the top
explaining its shape. Editing the values doesn't require touching any
component code.

### Adding a new city page

1. Copy an existing published page, e.g. `content/areas/pasadena.mdx`, to
   `content/areas/your-city.mdx`.
2. Update the frontmatter: `city`, `slug` (must match the filename),
   `metaTitle`, `metaDescription`, `corridor`, `latitude`/`longitude`.
3. Do the actual local research and write 400+ words that are genuinely
   specific to that city — named commercial corridors, the real business
   mix, a real competitive observation. **Do not copy-paste another city's
   structure with the names swapped.** Thin, templated location pages are
   the single most common way local-service sites get penalized by Google.
4. Set `draft: false` in the frontmatter once the content is genuinely
   ready. Leave it `true` while you're still working on it — draft pages
   are excluded from the production build and return a 404, but you can
   preview them in `npm run dev` by navigating directly to
   `/areas/your-city` (Next.js dev mode renders any route on demand
   regardless of `generateStaticParams`).
5. Add a link to it from `src/app/areas/page.tsx` once it's published.

`npm run build` will refuse to ship a non-draft city page that still
contains a `PLACEHOLDER:`, `TODO`, or `{{TOKEN}}` marker — see
`scripts/check-placeholders.mjs`.

## Forms

`/api/contact` is a single Next.js Route Handler that validates every
submission server-side with Zod, then hands it to a provider adapter
(`src/lib/forms/adapters.ts`):

- **Default: Netlify Forms.** No account setup beyond having the site on
  Netlify — submissions land in the Netlify dashboard, 100/month free.
  The adapter relays the validated submission to the site's own origin as
  a form-encoded POST, which Netlify's edge intercepts. `public/__forms.html`
  gives Netlify's build-time crawler a static copy of every field so it
  detects the mini-audit's email-capture field too (that field only exists
  in the DOM after client-side interaction, so it's otherwise invisible to
  the crawler at build time).
- **Upgrade path: Resend.** Set `RESEND_API_KEY` and `CONTACT_NOTIFY_EMAIL`
  in your environment and the adapter switches to sending email instead —
  no code change needed.

The visible `/contact` form also has a real `method="POST"` and `action`,
so it still submits (via Netlify's native form handling) with JavaScript
disabled — the JS path is progressive enhancement, not a requirement.

## Environment variables

None are required to build or deploy. Optional:

| Variable | Effect |
|---|---|
| `RESEND_API_KEY` | Switches `/api/contact` from Netlify Forms to Resend email delivery |
| `CONTACT_NOTIFY_EMAIL` | Where Resend sends notifications (required if `RESEND_API_KEY` is set) |
| `RESEND_FROM_EMAIL` | From address for Resend (optional, defaults to `onboarding@resend.dev`) |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Enables analytics when set (disabled otherwise). Plausible by default. |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | Set to `umami` to use Umami instead of Plausible |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Required when using the Umami provider |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | Optional, defaults to `https://cloud.umami.is/script.js` |

## Deploying to Netlify

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Netlify: **Add new site → Import an existing project**, connect the repo.
3. Netlify auto-detects `netlify.toml` (build command, publish directory,
   and the `@netlify/plugin-nextjs` plugin are already configured).
4. Deploy. Forms start working automatically once the site is live — no
   extra Netlify Forms setup step needed beyond the site existing.
5. Once you have a real domain, update `domain`/`url` in
   `src/lib/site-config.ts` and redeploy so canonical URLs, the sitemap,
   and JSON-LD all point at the real address.

Netlify's free tier runs on a monthly build-minutes/bandwidth credit
allowance and pauses the site if it's exhausted. For a brochure site at
this scale that's not a realistic concern, but if the site ever gets
paused, check the Netlify dashboard's usage tab first — don't assume it's
a code problem.

### Portability — moving off Netlify later

Nothing here is Netlify-locked by API, only by the deploy adapter:

- **No `@vercel/*` packages** appear anywhere in `package.json` — verified,
  and worth re-checking (`grep vercel package.json`) if a future
  contributor adds a dependency without thinking about it.
- **No Netlify-proprietary runtime APIs** are used in application code —
  the only Netlify-specific pieces are `netlify.toml` (build config) and
  the Forms adapter in `src/lib/forms/adapters.ts`, which is already
  isolated behind a provider-agnostic interface (`submitForm()`).
- **To move to Cloudflare Pages:** swap `@netlify/plugin-nextjs` for
  `@cloudflare/next-on-pages`, remove `netlify.toml`, and replace the
  Netlify Forms adapter with Cloudflare's form-handling approach (or just
  switch to the Resend adapter, which has no platform dependency at all).
- **To self-host on a plain Node server:** `npm run build && npm run
  start` works as-is (this is standard Next.js output, not a static
  export) — just set `RESEND_API_KEY` since there's no Netlify edge to
  catch form submissions on a self-hosted box.

## SEO

- `src/app/sitemap.ts` and `src/app/robots.ts` are generated from the
  actual published routes (including only non-draft city pages) — not
  hand-maintained lists.
- JSON-LD is centralized in `src/lib/schema.ts` and rendered via the
  `<JsonLd>` component. Re-run Google's [Rich Results
  Test](https://search.google.com/test/rich-results) against the live URL
  after deploying — it wasn't practical to validate against a real public
  URL before the site had one.
- OpenGraph/Twitter images (`src/app/opengraph-image.tsx`) are generated
  at **build time** into static files, not at request time — confirmed by
  checking `.next/server/app/opengraph-image.body` exists after `next
  build`. This avoids the most common Netlify portability snag with
  `next/og`.

## What's deliberately not built yet

- **Neighborhood-level (Tier 3) location pages.** The service area hub
  (`/areas`) and three researched city pages exist; five more cities are
  scaffolded as `draft: true` stubs. Neighborhood pages come after the
  domain has some real search authority — building dozens of thin pages
  on a brand-new domain is more likely to suppress the whole site in
  search than to rank any individual page.
- **`/insights`** isn't scaffolded at all. Add it when there's real content
  to publish, not before — see the placeholder policy in `ASSETS-NEEDED.md`.

## Testing notes

Lighthouse (mobile, run against a production `next start` build, not
`next dev`) as of the last pass:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 100 |
| `/audit` | 100 | 100 | 100 | 100 |
| `/areas/montebello` | 97 | 100 | 100 | 100 |

CLS was 0 on all three; LCP ranged 1.8–2.7s locally without CDN caching
(likely to improve on Netlify's edge in production). Re-run
`npx lighthouse <url> --view` after deploying to confirm against the real
CDN-served build.
