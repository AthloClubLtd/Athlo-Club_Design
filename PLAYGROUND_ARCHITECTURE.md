# Playground Architecture — `/playground`

Source of truth for the Playground build, read alongside `CLAUDE.md`,
`DESIGN.md` and `tokens.css`. This doc covers the shell/layout, the screen
map, the mock data model, and state — not the internal screens themselves
(those are later phases, see §5).

---

## 0. What this is

An interactive **demo** of the Athlo Club product, embedded at `/playground`
on the marketing site. It is not the real app:

- Client-side only. No auth, no signup, no real backend, no payments, no
  persistence (a refresh resets everything to the seeded state).
- Drops the viewer straight into the product as a mock logged-in athlete,
  **"Swathi"** — no login/signup screen, because the point is to show the
  product, not onboarding.
- All data is hardcoded/seeded fake data, defined once (§3) and shared by
  every screen so numbers/names/events stay consistent across the demo.
- The real app (real auth, real payments, real backend) is a separate,
  future project. Nothing here should be built to anticipate that — no
  API clients, no schema, no auth scaffolding.

---

## 1. Layout — responsive behaviour

Two experiences, **Athlete** and **Organiser**, presented as device-style
mockups so the viewer reads them as "a phone" and "a web app," not as bare
page content.

### Desktop (≥980px): side by side

- `ATHLETE` (left) — rendered inside a **phone frame**: a device-shaped
  mockup (~360px wide) with a screen area inside it. Rounded outer shell,
  hairline border, subtle shadow (`--shadow-card`), a simple notch/speaker
  detail at the top of the frame (decorative, `aria-hidden`).
- `ORGANISER` (right) — rendered inside a **web-app frame**: a desktop
  browser/app-window mockup — top chrome bar (traffic-dot detail + a fake
  URL pill reading `app.athloclub.com`), a left sidebar, and a main content
  area. Wider than the phone frame; fully filled (chrome + sidebar + main),
  never floating content in empty space.
- A small eyebrow label sits above each frame: `ATHLETE` / `ORGANISER`
  (Space Grotesk, uppercase, `--tracking-label`, `--color-text-secondary`).
  This is a label, not a heading (see §Accessibility below).
- Both frames share a top alignment (`items-start` in the grid) and read as
  a balanced, intentional pair — phone narrower, web frame wider, gap sized
  with `--space-8`, inside the standard `--container-wide` column.
- The Athlete/Organiser toggle (below) is **hidden** at this breakpoint —
  both panels are simply both visible.

### Tablet/phone (<980px): single view + toggle

- The two frames can't sit side by side, so only **one shows at a time**,
  switched by a toggle pill pair at the top of the section: `Athlete |
  Organiser`. Same visual treatment as the Home page "For organisers / For
  athletes" toggle (`how-it-works.tsx`): `rounded-athlo-pill` track in
  `--color-bg-overlay`, active pill = lime fill + `--color-text-on-lime`,
  inactive = transparent + `--color-text-secondary`, 44px min touch target.
- Athlete tab shows the phone frame (centred, same proportions as desktop).
  Organiser tab shows the web-app view adapted to full width — the sidebar
  collapses (icon rail or a horizontal scroller, decided in the organiser
  build phase) so the frame never overflows the viewport.
- The non-active panel is not just visually hidden — it's removed from the
  accessibility tree (`hidden` attribute / `role="tabpanel"` pattern below),
  so screen reader / keyboard users don't tab into off-screen content.

### The breakpoint

- A single custom breakpoint at **980px** (`min-[980px]:`) — a Tailwind
  arbitrary breakpoint, not one of the default `sm/md/lg` scale, because
  980 is the point where two ~360px+~600px frames plus a gap and the page
  gutters stop fitting `--container-wide` (1280px) comfortably.
- Below 980px: toggle + single panel. At/above 980px: toggle hidden, grid
  becomes two columns, both panels shown, `hidden` attributes cleared.
- Implemented as pure CSS (Tailwind responsive classes), not a JS
  `resize` listener — no layout thrash, no hydration flash, works with
  `prefers-reduced-motion` and print/no-JS the same way the rest of the
  site does.

---

## 2. Screen map

Documented here for later phases — **not built in the shell**.

### Athlete (phone frame)

| Screen | Shows | Mock data needed |
|---|---|---|
| Discover | Events list sorted by distance from a fixed mock location | `events[]` (location, distance) |
| Filters | Sport + difficulty filter controls over the Discover list | `SPORTS`, `DIFFICULTIES` enums |
| Event detail + buy ticket | One event's full detail, a mock "Buy ticket" action (no real checkout — a client-only confirmation state) | one `events[]` entry |
| Profile | Swathi's profile — events attended, stats | `athlete.attendedEventIds`, `athlete` |
| Progress tracker | Chart/list of PBs and results over time | `athlete.progress[]` |

### Organiser (web-app frame)

| Screen | Shows | Mock data needed |
|---|---|---|
| Create a club | 3-type picker: Social/Just for fun, Business/Entity, Federation (Federation routes out to Calendly — real destination TBD, `#` placeholder until supplied) | none (form only, client state) |
| Create event/competition | Form for a new event across weightlifting, powerlifting, Hyrox, fitness racing | `SPORTS` enum |
| Club community page + events calendar | A sample club's public-style page: members, upcoming events on a calendar | `clubs[]`, `events[]` filtered by club |

Each screen is an internal view inside its frame, switched by in-frame
state — see §4.

---

## 3. Mock data model

One module, `lib/playground-data.ts`, exporting everything below. Every
screen imports from here — no screen invents its own numbers.

```ts
export type Sport = "weightlifting" | "powerlifting" | "hyrox" | "crossfit" | "fitness-racing";
export type Difficulty = "beginner" | "intermediate" | "advanced" | "elite";

export type MockEvent = {
  id: string;
  name: string;
  sport: Sport;
  difficulty: Difficulty;
  clubId: string;
  location: string;       // "London, UK"
  distanceMiles: number;  // relative to Swathi's fixed mock location
  date: string;           // ISO date, human-formatted at render time
  priceGBP: number;       // 0 = free
};

export type MockClub = {
  id: string;
  name: string;
  location: string;
  type: "social" | "business" | "federation";
  memberCount: number;
};

export type MockAthlete = {
  name: string;           // "Swathi"
  homeLocation: string;
  attendedEventIds: string[];
  progress: { date: string; sport: Sport; metric: string; value: string }[];
};

export const SPORTS: { value: Sport; label: string }[] = [ /* 5 entries */ ];
export const DIFFICULTIES: { value: Difficulty; label: string }[] = [ /* 4 entries */ ];

export const mockClubs: MockClub[] = [ /* ~4 sample clubs */ ];
export const mockEvents: MockEvent[] = [ /* ~8-10 sample events across sports/clubs */ ];
export const mockAthlete: MockAthlete = { /* Swathi, with attended events + progress entries */ };
```

No fabricated brand facts leak in here — names/numbers are clearly sample
data (e.g. club names distinct from the real beta-club names used on the
Home page), consistent with CLAUDE.md's "never invent stats presented as
real" rule.

---

## 4. State

All client-side, all in the `/playground` page tree — no routing per
screen (single URL, internal state switches views).

```ts
// Responsive mode is read from CSS via a media query hook, not guessed —
// avoids a mismatch between "which panel is interactive" and what's
// actually visible.
type ResponsiveMode = "stacked-toggle" | "side-by-side"; // < 980px | >= 980px

// Which panel is showing in stacked-toggle mode. Irrelevant (both shown)
// in side-by-side mode.
type ActivePanel = "athlete" | "organiser";

// Which internal screen each panel is on — independent of ActivePanel, so
// switching the toggle back and forth doesn't lose your place.
type AthleteScreen = "discover" | "event-detail" | "profile" | "progress";
type OrganiserScreen = "create-club" | "create-event" | "club-page";
```

- `ResponsiveMode` — derived from a `useMediaQuery("(min-width: 980px)")`
  hook (matches the CSS breakpoint exactly; SSR-safe default avoids a
  flash by rendering the mobile shell until the client confirms).
- `ActivePanel` — lifted to the page component; the toggle writes it, both
  panels read it to decide `hidden`.
- `AthleteScreen` / `OrganiserScreen` — owned by each frame's own
  component (not lifted), since the two sides never need to know about
  each other's internal screen.
- No `localStorage`, no URL params — a full page refresh always resets to
  the seeded starting state (Discover screen, Create-a-club screen,
  Athlete active on mobile). This is intentional: it's a sandbox, not a
  saved session.

---

## 5. Build sequence

1. **Shell** (this phase after approval) — page frame, phone/web-app
   mockup chrome, responsive side-by-side/toggle behaviour, placeholder
   content inside each frame, accessibility structure (tablist pattern).
2. **Athlete screens** — Discover → Filters → Event detail/buy → Profile →
   Progress, wired to `lib/playground-data.ts`, navigated by in-frame state
   (e.g. a tiny in-phone tab bar or back-arrow pattern, decided in that
   phase).
3. **Organiser screens** — Create a club → Create event/competition → Club
   community page + calendar, wired to the same data module.

---

## 6. Accessibility (WCAG 2.1 AA) — carried into the shell

- The Athlete/Organiser toggle is a real tablist: `role="tablist"`,
  `role="tab"` + `aria-selected` + roving `tabIndex`, `role="tabpanel"` +
  `aria-labelledby`, arrow-key navigation + Enter/Space activation —
  the exact pattern already shipped in `how-it-works.tsx`.
- `ATHLETE` / `ORGANISER` frame labels are `<p>` eyebrows (SectionLabel),
  not headings — the page's only heading before the frames is the H1;
  inside each frame, real headings resume at the screen level once built.
- Decorative device chrome (phone notch/speaker, browser traffic dots) is
  `aria-hidden="true"`; it carries no information.
- Lime stays a signal: used only on the active toggle pill (dark-on-lime,
  ~16:1, passes AA) and any large/bold numerals inside screens later —
  never on small body text or the frame eyebrow labels (those use
  `--color-text-secondary`, per the existing `SectionLabel` component).
- Logical order: page `<h1>` → "Interactive demo · sample data" eyebrow →
  toggle (mobile only) → the two frames.
