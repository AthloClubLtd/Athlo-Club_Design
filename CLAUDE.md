# CLAUDE.md — Athlo Club

Source of truth for **what** we're building, the brand voice, and the real copy.
Pair with `tokens.css` (exact design token values) and `ARCHITECTURE.md` (how the
codebase is structured). Never hardcode a colour, space, radius, or font that
already exists as a token in `tokens.css`.

---

## 1. What Athlo Club is

Athlo Club is the platform for the strength sport community. Organisers run
events and competitions end-to-end — weightlifting, powerlifting, Hyrox,
CrossFit and fitness racing — registration, payments, scoring and live
leaderboards, handled so they can focus on the sport, not the spreadsheet.
Athletes discover clubs and events and find the communities they belong in.

Two audiences, one product:
- **Organisers** (clubs, federations, event promoters) — run events end-to-end.
- **Athletes** — discover events and clubs, join competitions.

Company: Athlo Club Ltd. Founders: Swathi & Tom.

Current production site (athloclub.com) is client-rendered with empty initial
HTML — this rebuild must ship server-rendered HTML for SEO.

---

## 2. Voice

Confident, clear, adult. **Luma's clarity carrying Sportl's boldness.** This is
the calm, grown-up home of a sport — not a hype-y, gamified consumer fitness
app. Short sentences. Let the numbers and the photography carry the energy;
the copy stays measured.

- Say what the product does, plainly. "Organisers run events and competitions
  end-to-end" — not "revolutionise your fitness journey."
- No exclamation marks, no emoji, no gamification language ("level up",
  "crush your goals").
- Numbers do the talking — real traction stats, stated flatly.

---

## 3. Brand laws (non-negotiable)

1. **Lime is a signal, not a colour** — act (CTA) or live only. Never a
   background fill or decoration, except the one closing CTA band per page.
2. **One primary action per screen** — one lime button visible; everything
   else is secondary or ghost.
3. **Hierarchy by size, not lines** — tonal surfaces + type contrast; hairline
   borders only.
4. **Let it breathe** — 96–128px section rhythm (`--space-9` / `--space-10`).
5. **Numbers do the talking** — big lime numerals; max three data points per
   section.
6. **Photography is B&W + human** — `grayscale(1) contrast(1.08)` over real
   community photography. The only colour over a photo is the lime UI layered
   on top.

Full detail on how each component looks: see `DESIGN.md` (design system doc,
already folded into `ARCHITECTURE.md` component list) and `tokens.css`.

---

## 4. Fonts

- **Space Grotesk** — all headings, display type, labels, numerals.
- **Geist** — all body copy, paragraphs, buttons, inputs, nav links.
- Never body text in Space Grotesk. Never a display headline in Geist.

---

## 5. Real copy — Home

### Hero
- **H1:** "Connecting strength communities to the athletes who belong in
  them."
- **Sub:** "Organisers run events and competitions end-to-end in
  weightlifting, powerlifting, Hyrox, CrossFit and fitness Racing."
- **Primary CTA:** "Join as a club" → `/join`
- **Ghost CTA:** "Explore events and competitions →" → `/discover`
- **Overlay cards** (stacked club-preview cards, static over the flipbook):
  - "Strong Girls HQ" · London, UK
  - "WLV Lifting Club" · Wolverhampton, UK
  - "British Powerlifting Federation" · Remote

### Trusted by (LogoWall)
Label: "TRUSTED BY"
Partner logos (user-supplied image assets, see §7):
Crazy Strength, Central Staffs CrossFit, University of Wolverhampton, Central
Fund, Royal Navy, Army Sport, British Powerlifting.

### Stats (StatBlock, max 3 per section)
- **700+** — athletes · zero marketing spend
- **50+** — events hosted
- **£45K+** — potential per organiser

### Remaining Home sections (build after Hero + Trusted-by are approved)
- About / problem beats — the gap Athlo Club fills for organisers and
  athletes.
- How-it-works carousel — two tracks: Organiser flow, Athlete flow.
- Beta clubs + stats — proof section, reuses StatBlock.
- Founder story — Swathi & Tom, side-by-side bios. // TODO: bios, headshots.
- Mission statement.
- Lime CTA band — closing section, full lime background (the one allowed
  exception to "lime is never a fill").
- Footer.

Exact copy for the sections above beyond what's listed here is **not yet
provided** — do not invent marketing copy. Flag with `// TODO: copy` and use
the section's structural intent only until real copy is supplied.

---

## 6. Nav

Sticky, slim, transparent over the hero; on scroll gains `blur(14px)` +
hairline bottom border. Logo (Space Grotesk, lime monogram) far left. Links
right: **Discover events** (`/discover`) · **Playground** (`/playground`) ·
**Investor enquiries** (`/investors`). No button in the nav — the hero owns
the primary CTA.

---

## 7. Assets — what's real vs. placeholder

- **Hero flipbook frames** — four reference photographs were shared in chat
  (gym/lifting community shots — coaching moment, a lifter mid-clean-and-jerk,
  a deadlift setup, a Hyrox-style class). These arrived as inline chat images,
  not as files this environment can read from disk. // TODO: supply these (and
  any additional frames) as actual image files in the repo — until then the
  HeroFlipbook ships with clearly labelled placeholder frames at the correct
  aspect ratio, wired to the same preload/loop/fps logic so swapping in real
  files is a drop-in.
- **Partner logos** (Crazy Strength, Central Staffs CrossFit, University of
  Wolverhampton, Central Fund, Royal Navy, Army Sport, British Powerlifting)
  — // TODO: real logo files. Ship labelled placeholder slots.
- **Founder headshots** (Swathi & Tom) — // TODO.
- **Typeform URLs** for `/join` and `/investors` — // TODO.
- **Social links** (footer) — // TODO.
- Current athloclub.com hero screenshot was shared as visual/structural
  reference only (existing card-stack layout, CTA copy) — not a source of
  final imagery.

---

## 8. Reference docs in this repo

- `tokens.css` — exact design token values (colour, type, spacing, radius,
  elevation, layout). Canonical.
- `ARCHITECTURE.md` — tech stack, route map, component library, SEO, a11y,
  build sequence. Read before writing any code.
