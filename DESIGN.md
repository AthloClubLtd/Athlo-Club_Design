# DESIGN.md — Athlo Club Design System

How the Athlo Club website must **look and feel**. Pair this with `tokens.css`
(exact values) and `CLAUDE.md` (what we're building). If any styling decision
isn't covered here, default to restraint. Never hardcode a value that exists as
a token in `tokens.css` — always reference the CSS variable.

---

## 1. The feeling

**Luma's clarity carrying Sportl's boldness.** Dark, confident, spacious,
premium. Big type does the talking; lime is a rare signal, not a colour wash.
Everything breathes. It should feel like the calm, grown-up home of a sport —
not a hype-y consumer fitness app.

Reference tone: luma.com (structure, whitespace, restraint) + the boldness of a
big Space Grotesk headline. Avoid: gamified, neon, energy-drink, cluttered,
templated.

---

## 2. Foundations

### Colour — dark neutral ramp + two limes
- Backgrounds layer by tone, NOT by borders:
  `--color-bg-base` (page) → `--color-bg-raised` (cards) →
  `--color-bg-overlay` (hover/pills) → `--color-bg-inset` (inputs/wells).
- Text: `--color-text-primary` (headings) → `--color-text-body` (paragraphs) →
  `--color-text-secondary` (labels/captions) → `--color-text-disabled`.
- **Lime is a signal, not a colour.** `--color-lime` (#D5F844) ONLY for:
  CTAs, active states, key numerals, "live". Never a background fill or
  decoration — the single exception is the one final CTA band per page.
- Borders are hairlines only: `--color-line-subtle` / `--color-line-strong`.
- The neutral ramp is truly neutral — **no navy/blue tint**.

### Type — two families, hierarchy by size
- **Space Grotesk** → display, H1–H3, labels, numerals. Tight negative tracking
  on large sizes (see `--tracking-*`).
- **Geist** → body, paragraphs, buttons, inputs, nav links.
- Never set body/paragraph text in Space Grotesk. Never set a big display
  headline in Geist.
- Hierarchy comes from **size + weight jumps**, not colour or boxes. Labels are
  small, uppercase, tracked; headlines are large and tight; numerals are large
  and lime.
- Scale + weights + tracking: all defined in `tokens.css`
  (`--font-size-*`, `--font-weight-*`, `--tracking-*`, `--leading-*`).

### Space & rhythm
- 4px base scale (`--space-1 … --space-10`).
- **96–128px between major sections** (`--section-gap`). Generous. This
  whitespace is the discipline that keeps boldness from becoming loud.
- Content column `--container-max` (1080px); full-bleed sections
  `--container-wide` (1280px); page side padding `--gutter` (32px).

### Radius & elevation
- Radius: `--radius-sm/md/lg/xl/pill`. Cards use `lg`; buttons `md`; pills/tags
  `pill`.
- Shadows are subtle: `--shadow-card` for raised surfaces, `--shadow-lime` ONLY
  on primary-button hover. No heavy drop shadows.

---

## 3. The six laws (non-negotiable)

1. **Lime is a signal, not a colour** — act (CTA) or live only.
2. **One primary action per screen** — one lime button visible; everything else
   secondary/ghost.
3. **Hierarchy by size, not lines** — tonal surfaces + type contrast; hairline
   borders only.
4. **Let it breathe** — 96–128px section rhythm.
5. **Numbers do the talking** — big lime numerals; max three data points per
   section.
6. **Photography is B&W + human** — `filter: grayscale(1) contrast(1.08)`; the
   only colour over a photo is the lime UI on top.

---

## 4. Components — how each looks

**Button**
- Primary: `--color-lime` fill, `--color-text-on-lime` text, `--radius-md`,
  Geist 600, ~13px/24px padding. Hover: `--shadow-lime` + `translateY(-1px)`.
- Secondary: transparent, `--color-line-strong` border, primary text. Hover:
  border → `--color-text-secondary`.
- Ghost: transparent, lime text, no border (e.g. "Explore events →").

**Nav** — slim, blends into the page, "tells a story"
- Sticky. **Transparent over the hero**; on scroll add
  `backdrop-filter: blur(14px)` + a hairline bottom border only.
- Athlo Club logo/monogram (lime) far left; links right (Geist 500): Discover
  events · Playground · Investor enquiries.
- **No button in the nav** — the hero owns the primary CTA. It must feel like
  part of the page, not a bar bolted on top.

**Card** — `--color-bg-raised`, `--color-line-strong` hairline border,
`--radius-lg`, `--shadow-card`. Optional lime kicker label (Space Grotesk, 12px,
uppercase, tracked).

**Pill / tag** — `--color-bg-overlay` bg, `--radius-pill`; active state = lime
fill + `--color-text-on-lime`, weight 600.

**Input** — `--color-bg-inset` bg, `--color-line-strong` border, `--radius-md`,
Geist. Placeholder in `--color-text-disabled`.

**Stat / numeral** — big lime Space Grotesk numeral (~40–48px, `--tracking-tight`)
+ a small `--color-text-secondary` label beneath. Group in 3s max.

**SectionLabel** — Space Grotesk, 12px, `--tracking-label` (0.16em), UPPERCASE,
lime or muted depending on context.

**LimeCTABand** — the single allowed full-lime section: `--color-lime` background,
`--color-text-on-lime` heading/body, a dark button. Use once per page, at the end.

**Carousel** — used in "How it works". Arrows (circular, hairline border, lime on
hover) + dots (active dot is a lime pill). Slides swap by transform; one slide
visible at a time. Keyboard-operable; respects `prefers-reduced-motion`.

**HeroFlipbook** — rapid image-sequence animation (see CLAUDE.md §7 for the full
spec): ~8–15fps constant, all frames preloaded, seamless infinite loop, frames
absolutely stacked and swapped by opacity (NOT a sliding carousel),
`requestAnimationFrame` + time accumulator (NOT setInterval),
`prefers-reduced-motion` → single static frame.

**LogoWall** — "TRUSTED BY" label + a responsive row of partner logos that wraps
and rescales cleanly on mobile. Logos are user-supplied image slots.

---

## 5. Imagery

- All photography is **high-contrast black & white** (`grayscale(1) contrast(1.08)`),
  real community moments (effort, motion, the win).
- The only colour that appears over a photo is the lime UI layered on top.
- No stock-looking colour photography, ever.
- Product screenshots (in the How-it-works carousel) are user-supplied — until
  then, use clean labelled placeholder rectangles at the right aspect ratio.

---

## 6. Responsiveness

- Check **every** component at phone (~375px) and desktop before moving on.
- Two-column layouts (hero, founder story) stack to one column on mobile.
- The nav collapses gracefully; logo stays, links become a menu on small screens.
- Type scales down on mobile (display sizes especially); keep the tight tracking.
- Nothing horizontally scrolls; images and logo walls re-flow.

---

## 7. Do / Don't

**Do:** dark neutral backgrounds; one lime CTA per view; huge Space Grotesk
headlines; Geist for anything readable; B&W photography; generous whitespace; big
lime numerals for traction; tokens for every value.

**Don't:** lime as decoration or a background (except the one final CTA band);
more than one primary button in view; a button in the nav; navy/blue tint in the
neutral ramp; body text in Space Grotesk; heavy borders instead of tonal
layering; colour photography; cramped sections; energy-drink/gamified styling;
hardcoded hex/spacing/font values that exist as tokens.
