function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysFromToday(iso: string): number {
  const target = new Date(`${iso}T00:00:00`);
  const diffMs = target.getTime() - startOfToday().getTime();
  return Math.round(diffMs / 86_400_000);
}

/** "Today · Sat 14 Jun" for today; "21 June · Saturday" otherwise. */
export function formatDateGroupLabel(iso: string): string {
  const target = new Date(`${iso}T00:00:00`);
  const diffDays = daysFromToday(iso);

  if (diffDays === 0) {
    const weekday = target.toLocaleDateString("en-GB", { weekday: "short" });
    const day = target.getDate();
    const month = target.toLocaleDateString("en-GB", { month: "short" });
    return `Today · ${weekday} ${day} ${month}`;
  }

  const day = target.getDate();
  const month = target.toLocaleDateString("en-GB", { month: "long" });
  const weekday = target.toLocaleDateString("en-GB", { weekday: "long" });
  return `${day} ${month} · ${weekday}`;
}

/** "Closes today" / "Closes tomorrow" / "Closes in N days" — computed live
 * against today's date, never a fixed pre-written string. */
export function formatClosesIn(registrationClosesAt: string): string {
  const diffDays = daysFromToday(registrationClosesAt);
  if (diffDays <= 0) return "Closes today";
  if (diffDays === 1) return "Closes tomorrow";
  return `Closes in ${diffDays} days`;
}

export function formatPrice(price: number | "free"): string {
  return price === "free" ? "Free" : `£${price}`;
}
