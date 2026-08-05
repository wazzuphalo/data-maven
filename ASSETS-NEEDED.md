# Assets & Information Needed

Everything on this list is a real gap — a value, image, or piece of content the
site needs before launch. Nothing here has been invented or filled in with a
guess. Run `npm run check:placeholders` to see where each token appears in code.

---

## 1. Business details (blocking launch)

| Item | Where it's used | Current state |
|---|---|---|
| **Domain name** | Canonical URLs, sitemap, OG tags, JSON-LD | `{{DOMAIN}}` in `src/lib/site-config.ts` |
| **Physical business address** | CAN-SPAM footer, `LocalBusiness` schema | **Temporary — see warning below** |
| **Booking URL** (Calendly / Cal.com) | Every "book an audit" CTA, `/contact` | `{{BOOKING_URL}}` in `src/lib/site-config.ts` |
| **Social profile URLs** | `sameAs` in `ProfessionalService` schema | Empty strings in `site-config.ts` |

### ⚠️ Address warning — must be replaced before launch

The address currently in `src/lib/site-config.ts` is:

```
21688 Gateway Center Dr, Ste 300, Diamond Bar, CA 91765
```

**This is Newegg's corporate headquarters, not a Data Maven address.** It was
used only as a temporary value to unblock footer layout and schema markup.

Shipping it publicly would mean:
- The CAN-SPAM footer names an address the business doesn't control
- `LocalBusiness` / `ProfessionalService` schema tells Google the business is
  located at another company's office — a genuine local SEO liability, since NAP
  consistency is what local ranking is built on
- Anyone who mails or visits arrives at Newegg's front desk

Replace with a real business address, a registered agent address, or a virtual
office / mailbox that accepts business mail. The `isPlaceholder: true` flag in
`site-config.ts` should be set to `false` once it's real.

---

## 1b. Operator bio specifics

`/about` currently describes the six-lens approach and Angel Muro's general
marketing background (lifecycle, growth, performance) without specific years,
past employers, or credentials — none of those were confirmed, so none were
invented. To fill it in, provide:

- [ ] Specific prior roles/employers worth naming publicly
- [ ] Years of relevant marketing experience, if you want a number stated
- [ ] Any certifications or credentials
- [ ] Headshot (see Images below)

## 2. Proof & case studies

No case studies, testimonials, client names, logos, or performance metrics
exist in this repo, by design. The brief forbids fabricating them, so `/results`
ships as a clearly-marked empty state.

Needed before `/results` can be published:

- [ ] **2–3 real engagements** with client permission to be named (or explicit
      permission to describe anonymously, e.g. "a Montebello dental practice")
- [ ] For each: the primary audit finding, what was changed, and what happened —
      with the measurement window and the source of the number
- [ ] Before/after screenshots for the comparison slider (component ships
      disabled until these exist) — 1200×800px, same viewport for both frames
- [ ] Written testimonial + permission to quote, attributed to a real person

---

## 3. Images

No stock photography. Placeholder blocks with visible dimension labels are
rendered wherever an image will eventually go.

| Purpose | Location | Target size | Format |
|---|---|---|---|
| Operator headshot | `/about` | 800×800px | AVIF/WebP |
| OG share image (default) | All pages | 1200×630px | PNG |
| Case study before/after pairs | `/results` | 1200×800px each | AVIF/WebP |
| Favicon / app icons | Site-wide | 512×512px source | PNG or SVG |

---

## 4. City page research

City pages ship only when they contain genuinely local content that could not
be copy-pasted to another city. Pages that still contain placeholder markers
**fail the build** unless marked `draft: true` in frontmatter.

Each city page needs, from real research:
- The actual business mix in that market
- Named commercial corridors or landmarks
- A market-specific competitive observation
- 400+ words that would not make sense for any other city

**Published:** Montebello, Pasadena, Glendale
**Drafted, needs research:** Burbank, Whittier, Alhambra, Long Beach, Santa Monica

Do not publish the drafted five just to hit a page count — each one needs
the same real research pass the first three got (named corridors, actual
business mix, a genuine competitive observation) before `draft: false`.
Three real pages beat eight generic ones.

---

## 5. Analytics & forms

- [ ] **Plausible or Umami account** — script is stubbed in
      `src/components/seo/Analytics.tsx`, disabled by default. Set
      `NEXT_PUBLIC_ANALYTICS_DOMAIN` to enable Plausible, or set it plus
      `NEXT_PUBLIC_ANALYTICS_PROVIDER=umami` and
      `NEXT_PUBLIC_UMAMI_WEBSITE_ID` to use Umami instead
- [ ] **Netlify site** — form submissions land in the Netlify dashboard on the
      free tier (100/month). Needs the site connected before forms work in prod.
- [ ] **Resend API key** (optional upgrade path) — `RESEND_API_KEY` env var
      switches the contact route from Netlify Forms to email delivery

---

## 6. Legal copy review

`/privacy` and `/terms` ship with reasonable general-purpose text. They have
**not** been reviewed by a lawyer. Before running paid ads (Google/Meta both
check for these pages), have someone qualified confirm they match what the
business actually does with collected data.
