# Event thumbnail files

`EventThumb` (`components/playground/athlete/event-thumb.tsx`) renders an
event's `imageUrl` when set, falling back to a branded placeholder (dark
tile + the event's primary sport glyph) otherwise. No seed event currently
sets `imageUrl` — every one of the ids below is using the placeholder.

To add a real photo: drop `{event-id}.jpg` in here and set
`imageUrl: "/events/{event-id}.jpg"` on that event in
`lib/playground/seed-data.ts` — every screen that shows the event (Discover
rows/shelves, Clubs carousel, Event Detail hero) picks it up automatically.

## Event ids needing a generated thumbnail (strength-sport scene matching each event's sport)

- `weekend-warrior-wod` (CrossFit)
- `barbell-club-open-session` (weightlifting)
- `summer-hyrox-simulation` (Hyrox)
- `womens-strength-circuit` (weightlifting)
- `fitness-racing-trail-series` (fitness racing)
- `summer-classic-powerlifting` (powerlifting)
- `strongman-novice-throwdown` (strongman)
- `autumn-hyrox-qualifier` (Hyrox)
