# ARCHITECTURE.md — Athlo Club Website

Phase 0 output. Defines how the site is built. No page code exists yet — this
is for review before anything is implemented. Pairs with `CLAUDE.md` (voice,
copy, brand laws) and `tokens.css` (exact design values).

---

## 1. Tech stack

**Next.js 14+ (App Router) + TypeScript.**

**Styling: Tailwind CSS, configured to read `tokens.css` — not CSS Modules.**

Why:
- The token set in `tokens.css` is already a flat list of CSS custom
  properties (`--color-lime`, `--space-6`, `--radius-lg`, …). Tailwind's
  `theme.extend` maps 1:1 onto `var(--token-name)`, so every utility class
  (`bg-[var(--color-lime)]` → aliased to `bg-lime`, `p-6` → `--space-6`, etc.)
  resolves to a token with no duplication of values in two places.
- `tokens.css` stays the single source of truth (imported once, unmodified,
  as real CSS variables) — Tailwind config only *names* them. Design changes
  to token values require editing one file, not hunting through component
  CSS Modules.
- Six brand laws are enforceable in review: a hardcoded hex or px value shows
  up immediately as a literal in a `className` string, versus CSS Modules
  where a hardcoded value blends into a stylesheet.
- Component variants (Button primary/secondary/ghost, Pill active/inactive)
  are cleanly expressed as conditional utility strings (via a small `cva`
  helper) without the indirection of swapping CSS Module classes.
- Utility classes keep bundle size predictable and avoid the runtime cost of
  CSS-in-JS — relevant for later Capacitor-wrapping on lower-powered WebViews.

`tokens.css` is imported globally as-is (`app/globals.css` `@import`) so the
raw variables remain available for the few cases (canvas/animation-driven
inline styles in `HeroFlipbook`, dynamic per-event colour-free styling in
Playground) where a Tailwind utility isn't the right fit.

**Forms/data:** no database for launch.
- `/join` and `/investors` embed/redirect to Typeform (URLs are `// TODO`,
  supplied by the user — never faked).
- `/discover` waitlist capture posts to a single Next.js Route Handler
  (`app/api/waitlist/route.ts`) that validates and forwards to an email
  provider (e.g. a Resend/ConvertKit-style API) — provider + credentials are
  `// TODO`; until wired, the route handler is stubbed to return a clear
  "not yet connected" response rather than silently pretending to succeed.
- `/playground` is 100% client state, seeded from a local mock-data module.
  No backend, no persistence, no auth.

**Capacitor-readiness:** everything is responsive, no desktop-only APIs
(no `window.showOpenFilePicker`, no hover-only interactions without a
touch fallback), no server-only logic assumed reachable from a wrapped
WebView beyond standard `fetch` to the deployed site.

---

## 2. Route map

```
app/
  layout.tsx                 Root layout — Nav + Footer + font loading + globals.css
  page.tsx                   / — Home (server component, static)
  discover/
    page.tsx                 /discover — Coming soon + waitlist (server shell, client form island)
  playground/
    page.tsx                 /playground — interactive demo (client component)
  investors/
    page.tsx                 /investors — Investor enquiries (server, static)
  join/
    page.tsx                 /join — Join as a club (server, static)
  privacy/
    page.tsx                 /privacy — Legal (server, static)
  terms/
    page.tsx                 /terms — Legal (server, static)
  api/
    waitlist/route.ts        POST handler for /discover email capture
  sitemap.ts                 Generated sitemap
  robots.ts                  Generated robots.txt
```

| Route | Rendering | Notes |
|---|---|---|
| `/` | Static, server-rendered | Long-scroll home. `HeroFlipbook` is a client island inside an otherwise server page. |
| `/discover` | Static shell, server-rendered | "Coming soon" copy is server-rendered for SEO; the email-capture form is a small client island. |
| `/playground` | Client component | Entire page is `"use client"` — no SEO need, it's a product demo. Still gets static metadata (title/description) from a server-rendered layout wrapper. |
| `/investors` | Static, server-rendered | Thin page, copy + one CTA to Typeform. |
| `/join` | Static, server-rendered | Copy + embedded/linked Typeform. |
| `/privacy`, `/terms` | Static, server-rendered | Plain long-form content. |

Shared layout (`app/layout.tsx`): `<Nav>` + `{children}` + `<Footer>`, global
font `<link>`/`next/font` setup for Space Grotesk + Geist, `tokens.css`
imported once via `globals.css`. Nav and Footer are server components (no
client JS needed for either beyond the scroll-listener inside Nav, which is
isolated to a small client child).

---

## 3. Component library

All components read tokens via Tailwind theme aliases — no raw hex/px.

| Component | Type | Used in |
|---|---|---|
| `Nav` | Server shell + client scroll-state island | Root layout, all pages |
| `Footer` | Server | Root layout, all pages |
| `Button` (primary / secondary / ghost) | Server (no interactivity beyond native `<a>`/`<button>`) | Hero, CTA bands, forms, everywhere |
| `Card` | Server | Home (club/event previews), how-it-works, Playground athlete view |
| `Pill` | Server, `active` variant | Filter chips (design-system reference, Discover placeholder, Playground filters) |
| `Carousel` | Client | Home "How it works" (organiser/athlete tracks) |
| `StatBlock` | Server | Home stats section, beta-clubs proof section |
| `SectionLabel` | Server | Every major section ("TRUSTED BY", "HOW IT WORKS", etc.) |
| `LimeCTABand` | Server | Once per page, final section before Footer |
| `HeroFlipbook` | Client | Home hero, right column |
| `LogoWall` | Server | Home "Trusted by" |
| `Input` | Server (native), client wrapper only where it needs state (waitlist form, Playground editor) | Discover waitlist, Playground |
| `Badge` (live) | Server | Design-system reference; Playground leaderboard "LIVE" state |

Each component is a typed, standalone module under `components/` (e.g.
`components/Button.tsx`), no page-specific one-offs duplicating a shared
component's job.

---

## 4. SEO

- Every marketing route (`/`, `/discover`, `/investors`, `/join`,
  `/privacy`, `/terms`) is server-rendered by default in the App Router —
  this alone fixes the "empty client-rendered HTML" problem on the current
  site, since Next.js ships full HTML on first response without opting into
  `"use client"` at the page level.
- Per-page `generateMetadata` (or static `export const metadata`) for
  title, description, and Open Graph image per route — using real copy from
  `CLAUDE.md`, no invented copy.
- `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml` / `robots.txt`
  from the route list.
- Semantic markup: `<main>`, `<nav>`, `<footer>`, one `<h1>` per page,
  heading levels don't skip.
- `SportsEvent` (schema.org) JSON-LD is not needed yet — no real event data
  exists — but the `Card`/event-preview components accept structured props
  (`name`, `startDate`, `location`, `organizer`) shaped so that a future
  `/discover/[event]` page can serialise them straight into
  `application/ld+json` without a data-model rewrite.

---

## 5. Accessibility & performance

- **Contrast:** `--color-lime` (#D5F844) on `--color-bg-base` (#0B0B0C) is
  checked at build-review time for every lime-on-dark text use. Verified:
  contrast ratio ≈ 15.9:1 against `#0B0B0C` — passes AA (and AAA) at any
  size. The risk case is lime **text on a lime CTA background** (lime bg +
  `--color-text-on-lime` #0B0B0C) — that pairing is ≈15.9:1, also passes.
  The one flagged combination per `DESIGN.md` is lime used for small
  body-weight text on dark — per brand law 1, lime never carries body copy,
  only CTAs/labels/numerals, which are bold/large by definition, so this
  stays compliant by construction.
- **Keyboard:** `Carousel` supports arrow-key navigation and visible focus
  rings; `Nav` mobile menu is a native `<button>`-triggered disclosure,
  fully tab-reachable; all interactive elements use real `<button>`/`<a>`,
  never `<div onClick>`.
- **Motion:** `HeroFlipbook` and `Carousel` both check
  `prefers-reduced-motion` — flipbook shows a single static frame, carousel
  disables auto-advance (if any) and keeps manual arrow/dot control.
- **Images:** all real photography goes through `next/image` for
  responsive sizing/lazy-loading; B&W treatment via CSS
  `filter: grayscale(1) contrast(1.08)` per brand law 6, applied in CSS not
  pre-baked into the asset (keeps source files reusable).
- **Target:** Lighthouse ≥90 across Performance/Accessibility/Best
  Practices/SEO on `/` and `/discover` at launch, verified before each is
  marked done.

---

## 6. Build sequence

One item at a time, stop for review after each:

1. **Shared layout** — root `layout.tsx`, `globals.css` token import, font
   loading, `Nav` (incl. scroll-state), `Footer`.
2. **Design-system primitives** — `Button`, `SectionLabel`, `Pill`, `Card`,
   `Input`, `Badge`, `StatBlock`, `LimeCTABand` — built and eyeballed
   against the design-system reference doc in isolation before they're
   dropped into a page.
3. **Home — Hero section** (H1/sub/CTAs + `HeroFlipbook` + overlay cards).
4. **Home — Trusted by** (`LogoWall`).
5. **Home — remaining sections** (About/problem, How-it-works `Carousel`,
   beta clubs + stats, founder story, mission, `LimeCTABand`) — likely
   split into 2–3 further review checkpoints given volume.
6. **`/discover`** — coming-soon state + waitlist form + API route.
7. **`/playground`** — mock data model first (reviewed alone), then the
   split organiser-editor / athlete-view UI.
8. **`/investors`, `/join`** — thin pages, Typeform wiring (pending URLs).
9. **`/privacy`, `/terms`**.
10. **SEO pass** — metadata, sitemap, robots, OG images across all routes.
11. **A11y + performance pass** — Lighthouse run, contrast/keyboard sweep,
    `prefers-reduced-motion` check across every animated component.

---

## Open questions for approval

1. Tailwind vs. CSS Modules — recommending **Tailwind mapped to
   `tokens.css`** (§1). Confirm before scaffolding.
2. Waitlist storage — no email provider specified yet. Route handler ships
   stubbed (§1) until one is named; fine to proceed on that basis?
3. `CLAUDE.md` didn't exist in the repo yet, so it's been created from the
   brand laws/copy/voice supplied in chat plus `DESIGN.md` — flagged so you
   can correct anything before it's treated as canonical going forward.
