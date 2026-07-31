# Athlo Club

Athlo Club is a two-sided platform for strength sports — weightlifting, powerlifting, CrossFit, and fitness racing. Athletes discover events and clubs, build a free profile with personal records and competition history, and register for events in a few clicks. Organisers (clubs, gyms, and federations) get registration, payments, scoring, and live leaderboards for their events and competitions, paying a simple per-transaction fee (4% on event tickets, 4% + £1.50 on competition entries) instead of a subscription — with an optional £9.99/mo premium tier for athletes who want more.

> This repository started as `Athlo-Club_Design` ("Design prototypes from Claude Code") and has since become the initial production scaffold for the full platform described below.

## Stack

Next.js 14 (App Router, TypeScript), Tailwind CSS, Prisma + PostgreSQL, Auth.js v5 (NextAuth) with a custom Prisma-backed adapter, and Stripe (Connect, Standard accounts). The `app/` directory sits at the repo root (no `src/`), with the `@/*` import alias pointing at the repo root.

## Routes

### Marketing (static, SSG)

| Route | Purpose |
| --- | --- |
| `/` | Two-sided hero, single primary CTA into Discover |
| `/for-organisers` | Fee transparency + feature list, CTA into signup |
| `/for-athletes` | Profile/PR/competition-history hook, CTA into signup |
| `/pricing` | Organiser fee table + premium card |
| `/investors` | Data-room request form (`app/api/investors/route.ts`) |
| `/about` | Mission, origin story, contact |
| `/privacy`, `/terms`, `/cookies` | Legal boilerplate |
| `/blog` | MDX blog index, filterable by tag/persona via query params |
| `/blog/[slug]` | Individual MDX post, with Article JSON-LD |

### Discovery (SSR, the SEO engine)

| Route | Purpose |
| --- | --- |
| `/discover` | Filterable (sport, location, format, level) event/club search, reads filters from the URL |
| `/discover/events/[slug]` | Event detail, with SportsEvent JSON-LD |
| `/discover/clubs/[slug]` | Club profile, with SportsOrganization JSON-LD and federation affiliation badge |
| `/sitemap.xml`, `/robots.txt` | Generated from `app/sitemap.ts` / `app/robots.ts` |

### Auth + athlete app (protected)

| Route | Purpose |
| --- | --- |
| `/login`, `/signup` | Google OAuth + email magic link, via Auth.js |
| `/onboarding` | Post-signup profile setup (handle, name, sports, location) |
| `/app` | Athlete dashboard |
| `/app/profile`, `/app/profile/edit` | Profile read view + edit form (bio, sports, location, PRs) |
| `/app/clubs`, `/app/clubs/new`, `/app/clubs/[slug]` | Club membership list, club creation, club dashboard stub |
| `/app/settings` | Account settings + premium upgrade |

Everything under `/app` is protected by `middleware.ts`, which redirects unauthenticated requests to `/login`.

### Stripe (API routes)

`app/api/stripe/connect/onboard`, `app/api/stripe/checkout`, `app/api/stripe/webhook`, and `app/api/stripe/premium-checkout` implement the Connect + subscription flows described below. All are safe no-ops (with `TODO` comments marking where real logic goes) when Stripe env vars aren't set.

## Data model (Prisma)

Enums: `ClubType`, `ClubRole`, `AthleteRole`, `Sport`, `EventFormat`, `EventStatus`, `AffiliationStatus`, `PremiumStatus`, `StripeOnboardingStatus`, `OrderStatus`.

Entities: `Athlete` (also the Auth.js user model — see note below), `Club`, `ClubMembership`, `AffiliationRequest`, `Event`, `TicketType`, `Competition`, `CompetitionEntry`, `PersonalRecord`, `Order`, plus the Auth.js-shaped `Account`, `Session`, and `VerificationToken`.

**Club → Federation affiliation flow:** a `Club` can optionally point at another `Club` of type `FEDERATION` via `federationId`. That link is only ever set by approving an `AffiliationRequest` — a club requests affiliation to a federation, and the federation (or a platform `ADMIN`) approves or rejects it, recording `decidedAt`/`decidedById`. Only an `Athlete` with role `ADMIN` can create a `FEDERATION`-type club in the first place. Both rules are enforced in application code (server actions), not just implied by the schema — see `app/app/clubs/new/page.tsx` for the club-creation check.

**Auth.js note:** `Athlete` doubles as the Auth.js user model rather than introducing a separate `User` table, since it already carries every field a session needs. `Account`/`Session` reference it via `athleteId` (not the adapter's default `userId`), so `lib/auth-adapter.ts` implements a small custom adapter against Prisma directly instead of using `@auth/prisma-adapter` as-is. See the comment at the top of `prisma/schema.prisma` and `lib/auth-adapter.ts` for details.

## Environment variables

Copy `.env.example` to `.env` and fill in what you have — everything is safe to leave blank in dev except `DATABASE_URL`.

| Variable | Used for |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (Prisma) |
| `NEXTAUTH_SECRET` | Auth.js session/token signing secret |
| `NEXTAUTH_URL` | Auth.js base URL (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth sign-in |
| `EMAIL_SERVER` / `EMAIL_FROM` | SMTP magic-link email sign-in |
| `STRIPE_SECRET_KEY` | Stripe API access |
| `STRIPE_WEBHOOK_SECRET` | Verifies `app/api/stripe/webhook` signatures |
| `STRIPE_PREMIUM_PRICE_ID` | Stripe Price ID for the £9.99/mo premium subscription |

## Running locally

```bash
npm install
npx prisma migrate dev      # applies prisma/migrations and creates your DB schema
npx prisma db seed          # seeds sample athletes, clubs, events and competitions
npm run dev
```

Then open `http://localhost:3000`. `/discover` and its detail pages read from the seeded data; sign-in requires either Google OAuth credentials or a real SMTP server in `.env` (both can be left blank if you don't need auth to work yet).

## Capacitor wrap (v4, future)

Today, Athlo Club is a single Next.js codebase. When a native mobile wrap is needed, the plan is:

- Add Capacitor as a thin native shell on top of the same codebase — `npx cap init` followed by `npx cap add ios` / `npx cap add android` — pointed at either the deployed web URL or a static export of the client-heavy `/app` routes. No route restructuring is required for this; the routes built here are already the ones the wrap would point at.
- Add **Sign in with Apple** alongside Google as an Auth.js provider for iOS, since Apple's App Store guidelines require it wherever third-party sign-in (like Google) is offered.
- Push notifications go through Capacitor's native push plugin (e.g. for event reminders and leaderboard updates), registered separately from any web push implementation.

None of this changes the data model, the route structure, or the API routes built in this scaffold — it's additive.
