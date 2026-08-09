export function AttendeeAvatars({ count }: { count: number }) {
  const shown = Math.min(3, Math.max(0, count));
  return (
    <div aria-hidden="true" className="flex -space-x-2">
      {Array.from({ length: shown }).map((_, i) => (
        <span key={i} className="h-7 w-7 rounded-athlo-pill border-2 border-athlo-bg-raised bg-athlo-bg-overlay" />
      ))}
    </div>
  );
}
