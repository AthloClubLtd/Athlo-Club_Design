# CLAUDE.md — Athlo Club

Source of truth for the Athlo Club website. Read this before generating or
editing any UI. Every page, component, and style must conform to the design
language, copy, and rules below. When in doubt, favour restraint over decoration.
Do not invent brand facts, copy, or stats that aren't here — flag gaps as TODO.

---

## 1. What Athlo Club is

Athlo Club is a two-sided platform for **strength sports** (weightlifting,
powerlifting, CrossFit, strongman, Hyrox / fitness racing). "Strava for strength
sports."

- **Organisers** (clubs, gyms, federations) run events and competitions
  end-to-end: registration, payments, scoring, live leaderboards.
- **Athletes** discover clubs & competitions, build one profile across every
  strength sport, and track progress.
- Model: B2B2C. Organisers pay transaction fees (4% events, 4%+£1.50 comps);
  athletes free with a £9.99/mo premium tier.

**Naming rule (important):** the brand is always **"Athlo Club"**, never "Athlo"
on its own. In copy, labels, alt text — always "Athlo Club".

Primary marketing CTA everywhere: **"Join as a club."**

---

## 2. Tech stack (target)

- **Next.js** (App Router) + **TypeScript**, single responsive codebase.
- Marketing/SEO pages are server-rendered (the current athloclub.com ships empty
  client-rendered HTML — this must be fixed; content must be in the HTML for SEO).
- The Playground is a client-side interactive demo with seeded mock data — NO
  real backend, auth, or payments.
- Must stay **Capacitor-wrappable** later — responsive, no desktop-only APIs.
- Styling reads from `tokens.css` custom properties. Never hardcode a hex,
  spacing, radius, or font that exists as a token.

---

## 3. Brand voice

**We are:** confident, human, premium, bold, clear, community-first, athletic,
grown-up.

**We're not:** corporate, gamified, neon/energy-drink, cluttered, soft/wellness,
templated, loud for loud's sake.

Copy: short, declarative, warm, first-person where it talks to the reader.
Numbers over adjectives. Lead with the human story, then the proof. Never
feature-list-y or salesy.

---

## 4. The six laws (non-negotiable)

1. **Lime is a signal, not a colour.** Lime (`#D5F844`) ONLY for "act" (CTAs) or
   "live" (active states, key numbers). Never a background fill (except the one
   allowed final CTA band), never decorative.
2. **One primary action per screen.** Exactly one lime button visible at a time.
   Everything else is secondary (outlined) or ghost (text link).
3. **Hierarchy by size, not lines.** Layer with tonal surfaces
   (base → raised → overlay) + large type contrast. Borders are hairlines only.
4. **Let it breathe.** 96–128px vertical rhythm between major sections.
5. **Numbers do the talking.** Big lime numerals for traction. Max three data
   points per section.
6. **Photography is B&W + human.** High-contrast monochrome community shots.
   Apply `filter: grayscale(1) contrast(1.08)`. The only colour over a photo is
   the lime UI on top.

---

## 5. Design tokens

Source of truth is `tokens.css` (in `styles/`). Fonts: **Space Grotesk** for
headings, labels, numerals; **Geist** for body, paragraphs, buttons, inputs, nav
links. Geist is NOT on Google Fonts — install from Vercel/Fontsource.

Colour (key): `--color-bg-base #0B0B0C`, `--color-bg-raised #141416`,
`--color-bg-overlay #1C1C1F`, `--color-bg-inset #080809`,
`--color-lime #D5F844` (primary), `--color-lime-soft #D2F695`,
`--color-text-primary #F4F5F0`, `--color-text-body #C7C9C2`,
`--color-text-secondary #8A8C85`, `--color-text-on-lime #0B0B0C`.
Type scale, spacing (4px base), radius, elevation, layout: all in `tokens.css`.

---

## 6. Component library (built from tokens)

Nav, Footer, Button (primary/secondary/ghost), Card, Pill, Carousel, StatBlock,
SectionLabel, LimeCTABand, HeroFlipbook, LogoWall.

- **Primary button:** lime fill, `--color-text-on-lime`, `--radius-md`, Geist
  600. Hover: `--shadow-lime` + `translateY(-1px)`.
- **Secondary:** transparent, `--color-line-strong` border, primary text.
- **Ghost:** transparent, lime text, no border (used for "Explore events →").
- **Card:** `--color-bg-raised`, `--color-line-strong` border, `--radius-lg`.
- **Pill:** `--color-bg-overlay`; active = lime fill + `--color-text-on-lime`.
- **Stat:** big lime Space Grotesk numeral + secondary label under.

### Nav (all pages) — slim, blends, "tells a story"
Sticky. **Transparent over the hero**, blending into the page; on scroll add
`backdrop-filter: blur(14px)` + hairline bottom border. Athlo Club logo/monogram
(lime) far left; links right: Discover events · Playground · Investor enquiries
(Geist 500). **No primary button in the nav** — the hero owns the CTA. It should
feel like part of the page, not a bar sitting on top.

---

## 7. Pages & final copy

### / — HOME (long scroll, audience: organisers)

**§1 Hero** (two-column):
- LEFT: H1 (Space Grotesk): "Connecting strength communities to the athletes who
  belong in them." Sub (Geist): "Organisers run events and competitions
  end-to-end in weightlifting, powerlifting, Hyrox, CrossFit and fitness Racing."
  CTAs: primary "Join as a club" (→/join) + ghost "Explore events and
  competitions →" (→/discover).
- RIGHT: **HeroFlipbook** — rapid image-sequence animation (~8–15fps, single
  adjustable constant), all frames preloaded, seamless infinite loop, frames
  absolutely stacked & swapped by opacity (NOT a sliding carousel), driven by
  `requestAnimationFrame` + time accumulator (NOT setInterval).
  `prefers-reduced-motion` → single static frame. Also a scroll-driven variant
  behind a flag. Static stacked club-preview cards overlaid on top (e.g. "Strong
  Girls HQ · London", "WLV Lifting Club · Wolverhampton", "British Powerlifting
  Federation · Remote"). Frame images supplied by user — TODO placeholders.

**§2 Trusted by** (LogoWall): "TRUSTED BY" label + partner logos: Crazy Strength,
Central Staffs CrossFit, University of Wolverhampton, Central Fund, Royal Navy,
Army Sport, British Powerlifting. Logos supplied by user — labelled slots.
Responsive: wraps and rescales on mobile.

**§3 About / the problem** — four first-person beats (statement + support line,
one lime word each):
1. About Athlo Club — "Create your community, and grow it." / "Everything you
   need to run your club in one platform — 7+ tools, replaced by one."
2. What you get — "Everything you need to run your events — without the seven
   tabs." / "Registration, payments, scoring and live leaderboards, end to end."
3. What your athletes get — "A home for their whole strength journey." / "One
   profile across every sport — every competition, result and PB in one place."
4. What Athlo Club replaces — "Goodbye to the patchwork." / "Eventbrite,
   spreadsheets, WhatsApp groups, a separate scoring app, a results PDF, and
   Instagram ads that never reach the right athletes — replaced by one platform."
   Show replaced tools as struck-through chips resolving into one lime "Athlo
   Club" chip.

**§4 How it works** — toggle **For organisers | For athletes**; each is a 3-slide
**carousel** (arrows + dots), each slide = product screenshot slot + short caption:
- Organisers: Unified events & scoring system · End-to-end event management ·
  Targeted athlete reach.
- Athletes: Discovery · Build your profile · Track your progress.
Ghost link under: "Check out the demo →" (→ /playground).

**§5 Beta clubs** — "TRUSTED BY" label; "The clubs building Athlo Club with us.";
club names row; stat strip: **55+** events in 8 months · **23** paid events ·
**£10k+** revenue, near-zero marketing spend.

**§6 Founder story** — "Built by" label; "We didn't just study the problem. We
lived it." Two founders **side by side** (columns, like the pitch deck), each:
small headshot slot + name/role + story image (B&W) + one short paragraph.
- Swathi Pai — Founder & CEO — "Found a dozen run clubs on Strava in a day — but
  two months to find a women's powerlifting community. Endurance had a home.
  Strength didn't."
- Tom Hunt — Chief Growth Officer — "Runs a gym across three strength sports.
  Used 7+ tools to put on one event, and spent on ads that never reached the
  right athletes. He knew what organisers needed — he was one."
Only these two founders on the site.

**§7 Mission** — full-width, lime on one phrase: "Our mission is to help people
**find, stay in and progress** in strength training and sport."

**§8 Final CTA band** — the ONE allowed full-lime band: "Bring your club to Athlo
Club." / "Set up your community in minutes." / dark "Join as a club" button.

**§9 Footer** — logo + "The home of strength sport." · nav repeat (Discover
events · Playground · Investor enquiries) · LinkedIn + Instagram · Privacy ·
Terms · swathi@athloclub.com · © 2026 Athlo Club.

### /discover — DISCOVER EVENTS
Coming-soon holding state. Blurred UI preview + partner logos + waitlist email
capture. CTA: "Notify me". Audience: athletes.

### /playground — PLAYGROUND (live demo)
Client-side interactive demo: organiser edits an event on one side, athlete
discovery view updates live on the other. Seeded mock data only. No auth, no real
backend/payments. CTA: "Join as a club".

### /investors — INVESTOR ENQUIRIES
Thin, confident page routing to a Typeform. Optional traction stats. CTA:
"Register your interest". (Keep any fundraising figures vague unless user
supplies them.)

### /join — JOIN AS A CLUB (page 5)
Organiser signup — routes to a Typeform. The destination of the primary CTA.

### /privacy, /terms — legal.

---

## 8. Assets & TODOs (user supplies — never fabricate)

- Logo monogram + wordmark (lime) — in `/assets`.
- Community photography (B&W filter) — in `/assets`.
- **TODO from user:** hero flipbook frame images; partner + beta club logos; two
  founder headshots (Swathi, Tom); two Typeform URLs (join + investor); LinkedIn
  + Instagram URLs; product screenshots for the How-it-works carousel; real
  privacy/terms copy.

---

## 9. Do / Don't

**Do:** dark neutral backgrounds; one lime CTA per view; huge Space Grotesk
headlines; Geist for anything readable; B&W photography; generous whitespace; big
lime numbers; check responsiveness (phone ~375px + desktop) on every component.

**Don't:** say "Athlo" alone (always "Athlo Club"); lime as decoration or a
background (except the one final CTA band); more than one primary button in view;
a primary button in the nav; navy/blue tints in the neutral ramp; body text in
Space Grotesk; colour photography; lorem ipsum; invented stats or data presented
as real.
