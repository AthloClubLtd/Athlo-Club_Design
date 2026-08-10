/** `compact` is the Discover list row's dense context — a 2-avatar stack at
 * roughly half the detail screen's size, so it can sit next to "N going"
 * without costing the row's already-tight text columns more than it has to
 * (a 3rd small circle measurably pushed the title into a 3rd clamped line
 * that used to fit in 2 — 2 avatars still reads as "a few people going"
 * without that cost). */
export function AttendeeAvatars({ count, compact = false }: { count: number; compact?: boolean }) {
  const shown = Math.min(compact ? 2 : 3, Math.max(0, count));
  return (
    <div aria-hidden="true" className={`flex ${compact ? "-space-x-1.5" : "-space-x-2"}`}>
      {Array.from({ length: shown }).map((_, i) => (
        <span
          key={i}
          className={`rounded-athlo-pill border-2 border-athlo-bg-raised bg-athlo-bg-overlay ${
            compact ? "h-4 w-4" : "h-7 w-7"
          }`}
        />
      ))}
    </div>
  );
}
