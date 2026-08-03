# New Apostolic English High School

The official website of **New Apostolic English High School & Dr. Bower Apostolic Junior College**, Rameshwari, Nagpur — a complete rebuild of `apostoliceducation.org` on Next.js 15, with a Git-backed CMS and no paid services anywhere in the stack.

```bash
npm install
npm run dev          # http://localhost:3000
```

Deploys to Vercel with no configuration changes. **No domain is hard-coded anywhere** — the site resolves its own canonical URL, so it is correct on the `*.vercel.app` review address today and correct on the school's domain the moment one is attached, with no code change. See [Going live](#going-live).

---

## Contents

- [Stack](#stack)
- [Project structure](#project-structure)
- [Design system](#design-system)
- [Content & the CMS](#content--the-cms)
- [Forms](#forms)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Going live](#going-live)
- [Content provenance](#content-provenance)

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, React 19, Server Components, Server Actions) |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind CSS 3.4 with CSS-variable design tokens |
| Motion | Framer Motion (GSAP is intentionally not used — nothing here needed a timeline engine, and shipping one would have cost ~60 KB for no gain) |
| Icons | Lucide |
| Content | Markdown + JSON in `/content`, committed to Git |
| CMS | Decap CMS with GitHub authentication, served at `/admin` |
| Hosting | Vercel (free tier) |

No database. No WordPress. No paid CMS. No paid API.

---

## Project structure

```
app/                     routes, metadata, sitemap.xml, robots.txt, OAuth endpoints
components/ui/           design-system primitives (button, card, accordion, lightbox…)
components/layout/       header, mega menu, drawer, footer, the persistent UX layer
components/sections/     composable page bands used by the homepage and inner pages
features/                self-contained features: forms, server actions, newsletter
config/                  site constants, information architecture, immersive routes
content/                 all editable content — the CMS writes here
hooks/                   scroll state, media queries, counters, magnetics, preferences
lib/                     content loader, SEO, JSON-LD, validation, notification, motion
utils/                   pure formatting helpers
types/                   shared domain types
styles/                  design tokens and global CSS
public/                  optimised imagery, brand assets, PDFs, and the CMS at /admin
```

Every route in `app/` is reachable from `config/navigation.ts`, which is also the source for the mega menu, the mobile drawer, the search index, the HTML sitemap and `sitemap.xml`. A page cannot exist without being navigable.

---

## Design system

**The entire palette is derived from the school crest.** The original artwork is a single chromatic ink — sampled at `#973520`, or `hsl(11 65% 36%)` — on white. Nothing was invented:

| Ramp | Derivation |
|---|---|
| `brand-50 … brand-950` | The crest ink, extended by moving lightness and holding hue at 10–14° |
| `sand-50 … sand-950` | The same hue desaturated to 10–40% — the ivory, stone and ink-brown neutrals that carry the editorial layout |
| `gold-100 … gold-700` | The rising sun of the crest: hue rotated to 30–36°, inside the logo's own warm family |
| `success` / `warning` / `danger` | Tuned to the same chroma and luminance band as the brand, so status colour never breaks the palette |

Tokens live in [`styles/globals.css`](styles/globals.css) and are mapped in [`tailwind.config.ts`](tailwind.config.ts). Light and dark themes are both first-class.

**Typography** — Manrope for display, Inter for body, both self-hosted through `next/font` with size-adjusted fallbacks. The scale is fluid (`clamp()`) and interpolates from 360px to 1440px.

**Grid** — 1440px maximum content width, 12 columns at `lg`, 8 at `md`, 4 below, on a single `gutter` variable.

**Brand assets** — the supplied logo was a JPEG on an opaque white plate. `public/brand/` now carries the crest as transparent PNGs at three sizes plus a light-on-dark variant, generated from the original artwork, so the mark sits correctly on photography, on the dark footer and as a favicon.

**Photography** — the archive spans several years, cameras and colour temperatures. A single grade (`.photo-grade`: warm multiply, slight desaturation, vignette) is applied everywhere so the imagery reads as one commissioned set rather than a folder of files.

---

## Content & the CMS

All content is plain Markdown and JSON under `/content`, read at build time by [`lib/content.ts`](lib/content.ts) inside Server Components. There is no runtime filesystem access and nothing to keep in sync.

### Editing

1. Go to `https://your-domain/admin`
2. Sign in with GitHub
3. Save — Decap commits to the repository, and Vercel redeploys automatically

Editorial workflow is enabled, so changes move through *Draft → In review → Ready* before publishing.

### Editing locally

`local_backend` is enabled, so no second OAuth app is needed for development:

```bash
npm run dev     # terminal 1
npm run cms     # terminal 2 — the Decap proxy
```

Then open `http://localhost:3000/admin`. Saves write straight to your working
copy instead of committing to GitHub.

### What is editable

Everything: the announcement bar, every homepage band, leadership messages, vision and mission, the history timeline, management and staff, all six academic stages, the curriculum, student development, every facility, the virtual-tour map stops, all gallery albums and photographs, videos, events, news, circulars, downloads, FAQs, testimonials, achievements, the admission process, fees and uniform, careers and vacancies, the mandatory disclosure, and the privacy and terms documents. Images and PDFs are uploaded through the built-in media library.

Collection definitions: [`public/admin/config.yml`](public/admin/config.yml). Their TypeScript counterparts: [`types/index.ts`](types/index.ts).

### Authentication

Decap normally depends on a hosted OAuth service. This project implements the GitHub handshake itself, as two Next.js route handlers, so the CMS runs entirely on Vercel at no cost:

- [`app/api/oauth/auth/route.ts`](app/api/oauth/auth/route.ts) — redirects to GitHub with a CSRF state cookie
- [`app/api/oauth/callback/route.ts`](app/api/oauth/callback/route.ts) — exchanges the code and posts the token back to the CMS window

The token is never stored server-side.

---

## Forms

Four forms — admission enquiry, contact, career application and newsletter — all built on Server Actions, so they work before hydration and validate identically on both sides ([`lib/validations.ts`](lib/validations.ts) with Zod).

**Spam protection** is layered: a honeypot field, a submission-timing check, and optional Cloudflare Turnstile that activates automatically the moment a site key is present.

**Delivery** is pluggable ([`lib/notify.ts`](lib/notify.ts)) — whichever is configured first wins:

1. `RESEND_API_KEY` → a formatted email to the school office (Resend's free tier covers 3,000 emails a month)
2. `FORM_WEBHOOK_URL` → the validated payload as JSON to any HTTPS endpoint (Google Apps Script, Make, Zapier, n8n, Slack)

With neither configured, submissions are logged to the server console in development, and the forms tell the visitor to call the office in production. **One of the two must be set before launch** — no software can send email without a mail provider.

---

## SEO

- Per-route `generateMetadata` with canonical URLs, Open Graph and Twitter cards, built through one helper so they cannot drift
- JSON-LD: `EducationalOrganization`/`School`, `WebSite` with `SearchAction`, `BreadcrumbList` on every inner page, `Article`, `Event`, `FAQPage`, `Course` and `JobPosting`
- `sitemap.xml` and `robots.txt` generated from the navigation structure and every content collection
- Every legacy CodeIgniter URL from the old site (`/index.php/Welcome/…`) is permanently redirected in [`next.config.ts`](next.config.ts), so no inbound link or indexed result breaks
- An HTML sitemap at `/sitemap` and a search page at `/search` that works without JavaScript

---

## Accessibility

Built to WCAG 2.1 AA:

- Skip link, landmark regions, and a correct heading outline on every page
- The mega menu, mobile drawer, search palette and lightbox are all fully keyboard-operable, with focus trapping, focus restoration and Escape handling
- Visible focus rings everywhere, never removed
- Forms wire label ↔ control ↔ hint ↔ error with real ids, `aria-invalid`, `aria-describedby` and live-region announcements
- Animated counters and word-reveal headings expose the plain text to assistive technology
- `prefers-reduced-motion` is honoured globally, and a reader-preferences panel adds text size, high contrast, a motion override and an optional pointer ring — all applied before first paint by an inline script, so there is no flash

---

## Performance

- Server Components by default. The client islands are: the hero sequence, the header, the interactive reason list, the gallery lightbox, the testimonial carousel, the campus map, the forms and the UX layer
- The hero is an animated photographic sequence rather than a video file, so the largest contentful paint is one optimised image
- YouTube is loaded through a click-to-play facade — no third-party JavaScript or cookies until a visitor presses play
- Every gallery image carries intrinsic dimensions from the content file, so tiles reserve their exact space and cumulative layout shift stays near zero
- Fonts self-hosted with size-adjusted fallbacks; images served as AVIF/WebP at the exact sizes the layout requests
- All imagery from the old site was re-encoded and downscaled before it entered the repository (32.6 MB → 28.5 MB at source, before the Next.js image pipeline)
- One shared, rAF-throttled scroll listener serves the header, the progress bar and the back-to-top control

---

## Going live

The rollout is two-phase: publish to the Vercel address for client review, then
attach the school's domain after approval. Nothing in the codebase needs editing
between the two.

### Phase 1 — client review on the Vercel address

#### 1. Push to GitHub

The CMS is already pointed at
[`riteshbhagat24/naes`](https://github.com/riteshbhagat24/naes) on `main`
([`public/admin/config.yml`](public/admin/config.yml)) — nothing to edit.

```bash
git init && git add . && git commit -m "Initial build"
git remote add origin https://github.com/riteshbhagat24/naes.git
git push -u origin main
```

`.env.local` is git-ignored; confirm with `git status` before the first push
that it is **not** in the list of tracked files.

#### 2. Deploy, and note the production URL

Import the repository into Vercel. Framework detection, build command and output
are automatic. Vercel gives the project a stable production address such as
`https://naes-website.vercel.app` — that is the one to use below, not a
per-deployment preview URL.

#### 3. Create a GitHub OAuth app

<https://github.com/settings/developers> → **New OAuth App**

- Homepage URL: `https://<your-project>.vercel.app`
- Authorization callback URL: `https://<your-project>.vercel.app/api/oauth/callback`

GitHub allows one callback URL per OAuth app, which is why local editing uses
the proxy above rather than a second app. The CMS works on the production URL;
it will not work on preview deployments, whose URLs change every push.

#### 4. Set environment variables

`.env.local` is already scaffolded with every key the code reads, annotated and
git-ignored. Fill it in for local work, and add the same keys in
**Vercel → Project → Settings → Environment Variables** for production:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **leave empty** | Only an override. Vercel supplies the URL automatically |
| `RESEND_API_KEY` + `FORM_TO_EMAIL` | one of these two | Form delivery by email |
| `FORM_WEBHOOK_URL` | one of these two | Form delivery by webhook |
| `GITHUB_OAUTH_CLIENT_ID` | yes | CMS login |
| `GITHUB_OAUTH_CLIENT_SECRET` | yes | CMS login |
| `GITHUB_OAUTH_REPO` | recommended | Restricts CMS login to accounts with write access to the content repository |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | optional | Adds a captcha to the forms |
| `TURNSTILE_SECRET_KEY` | optional | Server-side captcha verification |

### Phase 2 — attaching the school's domain

**Vercel → Project → Settings → Domains → Add.** That is the whole change on the
site side. Then update the two URLs in the GitHub OAuth app to the new domain so
CMS login keeps working.

Nothing else moves. `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` starts returning
the custom domain as soon as it is attached, so canonical URLs, Open Graph tags,
JSON-LD, `sitemap.xml` and the CMS all follow automatically.

### Search engines during review

While the site is on a `*.vercel.app` address, **every page is served
`noindex, nofollow` and `robots.txt` disallows all crawlers**. A staging copy
shared with the client can therefore never be indexed, never outrank the real
site, and never surface in a search for the school.

This lifts itself the moment a custom domain is attached — there is no flag to
remember to flip. To confirm after the domain goes live, check that
`https://your-domain/robots.txt` shows `Allow: /` rather than `Disallow: /`.

---

## Content provenance

Everything factual on this site was taken from the existing website and rewritten for grammar, clarity and length — the motto, the founders, the leadership, the school timings, the syllabus, safety arrangements, transport, book-set costs, the full uniform requirement, the facilities list, the sports disciplines, the subjects offered and the two genuine YouTube videos (the Apostolic Sports 2025 stream and the UCN News feature on the junior college).

Where the old site held no information, professional content was written to match the institution. These sections are the ones to review first with the school office:

- **Academic calendar** (`/events`) — an indicative 2026–27 session calendar built from celebrations the school demonstrably runs. Every entry is flagged *provisional* in the UI and in the CMS, and the page says dates are confirmed by circular.
- **Circulars** (`/circulars`) — representative session circulars, ready to be replaced with the real ones as they are issued.
- **Careers** (`/careers`) — four vacancies written around the school's actual departments.
- **Archive news stories** — the two stories with verified dates (18 January 2025 and 22 May 2024) carry exact dates and `Article` structured data. The four archive stories carry a session label instead of a date, and deliberately emit no `datePublished`, because the exact dates are not recorded anywhere public.
- **Downloads** — eight real, generated PDFs (enquiry form, document checklist, book-set list, uniform guide, academic calendar, timings sheet, safety summary, application form). They are genuine documents, not placeholders, but they should be reviewed and countersigned by the school before being treated as official.
- **Academic session** — the old site still advertises 2025–26. This build uses **2026–27** throughout, which is the current session. It is a single value in `config/site.ts` and in the announcement content file.

Two deliberate omissions, both to avoid asserting things that are not on record:

- **No founding year is stated anywhere.** The old site does not give one, and inventing one would be a factual claim about a real institution.
- **The "Chairman's message" is published as "The Founder's Vision"** (`/about/founder`), attributed to the Management of the National Apostolic Church Education Society. The institution's public record names a Founder, a Mother Superior, a Principal and a Head Mistress — not a chairman — so no such person was invented.

Individual faculty profiles are not published: the old site carried only section group photographs, and the page says so plainly and points to the school office.

---

© New Apostolic English High School & Dr. Bower Apostolic Junior College, under the National Apostolic Church Education Society, Nagpur.
