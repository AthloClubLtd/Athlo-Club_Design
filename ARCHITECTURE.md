# ARCHITECTURE.md — Athlo Club marketing site rebuild

Phase 0 output. No page code has been written against this plan yet — this
is for review. Written against the current repo state as of this commit,
per your call: **marketing site only, existing app stays untouched.**

---

## 0. What "untouched" means concretely

The repo is not a blank slate. It already has a working authenticated
product: `app/app/*` (club dashboard), `auth.ts`/`auth.config.ts`/
`middleware.ts` (NextAuth, gated to `/app/:path*` only), Stripe Connect
onboarding, a Prisma-backed `/discover/clubs` + `/discover/events`, plus
`/login`, `/signup`, `/onboarding`, `/pricing`, `/for-athletes`,
`/for-organisers`, `/blog`, `/cookies`. None of that is touched, deleted,
or refactored by this plan — same files, same behaviour, still reachable
by direct URL.

Two routes are the exception, because they're explicitly named in your
brief's target route map and currently hold *different* content than the
brief specifies:

- **`/discover`** — today this is a live listing page reading real Prisma
  data. The brief wants `/discover` to be a coming-soon waitlist page. I'll
  replace `app/discover/page.tsx` with the new coming-soon version. The
  nested detail routes (`/discover/clubs/[slug]`, `/discover/events/[slug]`)
  stay exactly as they are — just orphaned (no more links pointing at them
  from the new nav, still functional at their URLs).
- **`/investors`** — today this is a custom form posting to
  `app/api/investors`. The brief wants a thin page that routes to a
  Typeform. I'll rebuild the page to match; the old form/API route gets
  retired since the new page replaces its job (not left as dead parallel
  code).

**Open question for you to confirm or correct:** `/about` exists today
(mission blurb, mailto CTA) but isn't in the brief's target route map at
all — its content (mission, "about the team"-shaped material) is now
folded into Home's §3 (about/problem) and §7 (mission) sections. My
default: once Home ships, `/about` redirects to `/`. Flag if you want it
kept as a standalone page instead.

`/join` is genuinely new — no existing route to reconcile.

---

## 1. Tech stack

**Next.js 14 App Router + TypeScript** — already the stack, no change.

**Styling: Tailwind, extended to read `tokens.css` — not CSS Modules.**
Tailwind is already the only styling layer in the repo (41 files use it).
Introducing CSS Modules alongside it for just the new pages would mean two
styling systems in one codebase for no real benefit. Instead I'm adding a
second, **fully additive** layer to `tailwind.config.ts` under a single
`athlo` namespace, so nothing already in the config (`navy`, `ink`, `lime`,
`grey`) is renamed or overridden — zero risk to the 41 existing files, and
the new marketing pages get ergonomic, greppable class names instead of
`bg-[var(--color-bg-base)]` sprinkled everywhere:

```ts
// tailwind.config.ts — additive only, existing keys untouched
colors: {
  athlo: {
    "bg-base": "var(--color-bg-base)",
    "bg-raised": "var(--color-bg-raised)",
    "bg-overlay": "var(--color-bg-overlay)",
    "bg-inset": "var(--color-bg-inset)",
    "line-subtle": "var(--color-line-subtle)",
    "line-strong": "var(--color-line-strong)",
    lime: "var(--color-lime)",
    "lime-soft": "var(--color-lime-soft)",
    "lime-dim": "var(--color-lime-dim)",
    "text-primary": "var(--color-text-primary)",
    "text-body": "var(--color-text-body)",
    "text-secondary": "var(--color-text-secondary)",
    "text-disabled": "var(--color-text-disabled)",
    "text-on-lime": "var(--color-text-on-lime)",
  },
},
fontFamily: {
  display: ["var(--font-family-display)"],
  body: ["var(--font-family-text)"],
},
fontSize: {
  "athlo-display-xl": ["var(--font-size-display-xl)", { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-display)" }],
  "athlo-display-l":  ["var(--font-size-display-l)",  { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-display)" }],
  "athlo-h1": ["var(--font-size-h1)", { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-heading)" }],
  "athlo-h2": ["var(--font-size-h2)", { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-heading)" }],
  "athlo-h3": ["var(--font-size-h3)", { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)" }],
  "athlo-body-lg": ["var(--font-size-body-lg)", { lineHeight: "var(--leading-body)" }],
  "athlo-body": ["var(--font-size-body)", { lineHeight: "var(--leading-body)" }],
  "athlo-label": ["var(--font-size-label)", { lineHeight: "var(--leading-none)", letterSpacing: "var(--tracking-label)" }],
  "athlo-numeral": ["var(--font-size-numeral)", { lineHeight: "var(--leading-none)" }],
},
borderRadius: {
  "athlo-sm": "var(--radius-sm)", "athlo-md": "var(--radius-md)",
  "athlo-lg": "var(--radius-lg)", "athlo-xl": "var(--radius-xl)",
  "athlo-pill": "var(--radius-pill)",
},
boxShadow: {
  "athlo-card": "var(--shadow-card)", "athlo-pop": "var(--shadow-pop)",
  "athlo-lime": "var(--shadow-lime)",
},
```
Spacing stays as direct `var(--space-N)` arbitrary values (`p-[var(--space-7)]`,
`gap-[var(--space-5)]`) rather than a named scale — there are far more
spacing call sites than color/type/radius ones, and remapping Tailwind's
numeric spacing keys (`p-4`, `gap-6`...) risks silent collisions with the
default scale used by every existing file.

**Capacitor-wrappable:** no desktop-only APIs anywhere in this plan
(no `window.opener`, no filesystem access, no hover-only interactions
without touch fallback). Flipbook/carousel are touch- and click-driven.

---

## 2. Route map

New/rebuilt routes live in a **route group**, `app/(marketing)/`, with
their own `layout.tsx` (new slim Nav + Footer). Route groups don't affect
the URL — `(marketing)/page.tsx` is still `/`. This is what lets the new
Nav/Footer exist without touching what renders on legacy pages.

The current root `app/layout.tsx` (html/body/fonts/providers) stays as
the outermost shell. It currently also renders the *old* `<Nav/>`/`<Footer/>`
directly — I'll move that rendering into a second group, `app/(legacy)/`,
wrapping the untouched pages, so their output is pixel-identical to today.
The authenticated `app/app/*` tree is unaffected either way (it already
sits outside both marketing groups and is middleware-gated separately).

```
app/
  layout.tsx                 [shell only: html, body, fonts — no Nav/Footer]
  (marketing)/
    layout.tsx                [server] new MarketingNav + MarketingFooter
    page.tsx                  [server] Home — §1–§9, long scroll
    discover/page.tsx         [server] Coming-soon + waitlist capture ("use client" only on the email form)
    playground/page.tsx       [client] live organiser/athlete demo, seeded mock data
    investors/page.tsx        [server] thin page → Typeform
    join/page.tsx             [server] thin page → Typeform
    privacy/page.tsx          [server] (existing file relocated, content unchanged)
    terms/page.tsx            [server] (existing file relocated, content unchanged)
  (legacy)/
    layout.tsx                 [server] today's <Nav/> + <Footer/> verbatim
    for-athletes/, for-organisers/, pricing/, blog/, cookies/,
    login/, signup/, onboarding/,
    discover/clubs/, discover/events/    [all unchanged, just relocated]
  app/…                        [unchanged — authenticated dashboard, outside both groups]
  api/…                        [unchanged, except api/investors retired with the old /investors page]
```

Static vs client, page by page:
| Route | Rendering | Client islands |
|---|---|---|
| `/` | Server | `HeroFlipbook`, `HowItWorksCarousel` (toggle+carousel state) |
| `/discover` | Server | waitlist email form only |
| `/playground` | Client (whole page is the interactive demo) | — |
| `/investors` | Server | none (static + external Typeform link/embed) |
| `/join` | Server | none |
| `/privacy`, `/terms` | Server | none |

This directly addresses the CLAUDE.md SEO note: every page's real copy is
in server-rendered HTML on first response; only the specific interactive
widgets (flipbook frame-swapping, carousel state, playground state, the
waitlist form) hydrate as client components, nested *inside* server-rendered
sections so their surrounding headings/copy aren't gated behind JS.

---

## 3. Component library

New components live in `components/marketing/` (new directory — avoids
colliding with existing `components/nav.tsx`, `footer.tsx`, `cta-link.tsx`,
which stay as-is for legacy pages).

| Component | Used in | Notes |
|---|---|---|
| `MarketingNav` | `(marketing)/layout.tsx` | sticky, transparent-over-hero → blur+hairline on scroll, no primary button |
| `MarketingFooter` | `(marketing)/layout.tsx` | logo, nav repeat, social, legal, email, copyright |
| `Button` (primary/secondary/ghost) | everywhere | primary = lime fill; only one visible per screen (brand law 2) |
| `Card` | Home §3 beats, `/playground` | `bg-athlo-bg-raised`, `border-athlo-line-strong`, `rounded-athlo-lg` |
| `Pill` | replaced-tools chips (§3.4), `/playground` filters | overlay bg; active = lime fill |
| `Carousel` | Home §4 (How it works), keyboard + touch operable | arrows + dots, `aria-live` region for slide announcements |
| `StatBlock` | Home §5 (beta clubs stats), §7 mission number | big lime Space Grotesk numeral + secondary label |
| `SectionLabel` | every section eyebrow ("TRUSTED BY", "How it works"...) | Space Grotesk, uppercase, `tracking-label` |
| `LimeCTABand` | Home §8 (the one allowed full-lime band) | only usage of lime as a fill background site-wide |
| `HeroFlipbook` | Home §1 right column | see §5 below for the animation contract |
| `LogoWall` | Home §2 (trusted by), §5 (beta clubs) | responsive wrap, grayscale logos |

---

## 4. SEO

- All marketing pages are Server Components by default (table above) —
  fixes the CLAUDE.md-flagged issue of shipping empty client HTML.
- Per-page `metadata` export (title/description/OG image) on every route,
  following the existing pattern already used in `app/page.tsx` /
  `app/investors/page.tsx`.
- `app/sitemap.ts` covering the 7 marketing routes (excludes `(legacy)` and
  `app/app/*`, which aren't meant to be indexed).
- Semantic markup: one `<h1>` per page, `<section>` per brief section,
  `<nav>`/`<footer>` landmarks, real `<button>`/`<a>` elements (no
  clickable `<div>`s) for the carousel and flipbook controls.
- `SportsEvent` (schema.org) markup is deferred — `/discover` ships as a
  coming-soon page with no real event data yet. The existing
  `/discover/events/[slug]` (legacy, untouched) already has real Prisma
  data and is the natural place to add it when `/discover` relaunches with
  live listings; noting the hook here so it isn't forgotten.

---

## 5. Accessibility & performance

- **Lime contrast, checked, not assumed:** `#D5F844` on `#0B0B0C` (and the
  inverse, `#0B0B0C` text on `#D5F844`) computes to a contrast ratio of
  **~16.2:1** — passes WCAG AA *and* AAA at every text size. Brand law 1
  (lime only for CTAs/live states, never decorative body copy) is a design
  constraint, not one contrast is forcing — I'll still enforce it as
  written, just noting the numeric check actually clears a much lower bar.
- `HeroFlipbook` and `Carousel`: full keyboard operability (arrow
  keys/Enter/Space on custom controls, native `<button>`s, visible focus
  rings using `--color-lime` outline), `prefers-reduced-motion` → static
  frame / no auto-advance.
- Images via `next/image` throughout (flipbook frames, logos, founder
  photos) — explicit width/height to avoid layout shift, `priority` on the
  first flipbook frame (LCP candidate).
- No animation libraries — flipbook and any scroll-driven variant use
  `requestAnimationFrame` with a time accumulator, per the brief.
- Target Lighthouse ≥90: minimal client JS (only the islands listed in
  §2), system-font fallbacks already in `tokens.css` so there's no
  invisible-text flash, `display: swap` on both webfonts (already set for
  Space Grotesk in `layout.tsx`; same for Geist).

---

## 6. Assets — what's real vs TODO right now

You attached 5 images in the brief. Here's how I'll treat them unless you
say otherwise:
- **Image 1** (dark hero mockup: headline, two CTAs, stacked flipbook
  photos + club-preview card overlay, trusted-by logo row) — treated as a
  **layout reference** to match/build toward, not a source of raw assets
  (it's a screenshot/mockup, not a photograph).
- **Images 2–5** (real B&W-able gym/training action shots) — real usable
  community photography. I'll save these into `public/assets/photography/`
  and use them as actual `HeroFlipbook` frames (grayscale + contrast filter
  per brand law 6), rather than placeholder boxes, since real assets exist.
  More can be added the same way later.

Still genuinely TODO (not fabricated, marked in code):
- Partner logos (Crazy Strength, Central Staffs CrossFit, Uni of
  Wolverhampton, Central Fund, Royal Navy, Army Sport, British
  Powerlifting) — I have their *names* from the mockup but not usable logo
  files; the mockup screenshot isn't high-res enough to extract clean
  marks from. Labelled empty slots + `// TODO`.
- Two founder headshots (Swathi, Tom).
- Two Typeform URLs (join, investor).
- LinkedIn + Instagram URLs.
- Product screenshots for the How-it-works carousel.
- Beta club logos for §5.

---

## 7. Build sequence (one reviewable step at a time)

1. Shared layout: `(marketing)` + `(legacy)` route groups, `MarketingNav`,
   `MarketingFooter`, root layout trimmed to a shell. Verify every legacy
   page still renders identically (visual diff, not just "it compiles").
2. Home §1 (Hero) + §2 (Trusted by) — the two sections you asked for by
   name. Stop here for review before continuing.
3. Home §3 (About/problem beats) + §4 (How it works carousel).
4. Home §5 (Beta clubs) + §6 (Founder story) + §7 (Mission) + §8 (CTA
   band) + §9 (Footer content).
5. `/discover` (coming soon + waitlist).
6. `/playground`.
7. `/investors`, `/join`.
8. `/privacy`, `/terms` relocation (content unchanged) + sitemap + final
   Lighthouse/responsive pass across every new page.

Each step gets a phone-width (~375px) and desktop check before I move on,
reported explicitly rather than assumed.

---

## Needs your sign-off before I write any page code

1. `/about` → redirect to `/` once Home ships, or keep standalone? (default: redirect)
2. Photography treatment in §6 above — OK to use images 2–5 as real
   flipbook frames now?
3. Anything in the route-group restructuring (§2) you want done
   differently — e.g. keep `/investors`' existing custom form as a
   fallback until the Typeform URL arrives, instead of a bare link?
