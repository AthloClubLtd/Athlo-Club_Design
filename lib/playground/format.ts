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

/** "14:30" (native <input type="time"> value) -> "2:30 PM" — matches the
 * display style already used throughout the seed data. */
export function formatTimeOfDay(hhmm: string): string {
  const [hoursStr, minutesStr] = hhmm.split(":");
  const hours = Number(hoursStr);
  const period = hours >= 12 ? "PM" : "AM";
  const twelveHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelveHour}:${minutesStr.padStart(2, "0")} ${period}`;
}

/** Detail-screen date line: "Today · 14 June" / "Tomorrow" / "Saturday, 14
 * June" — a different string shape than formatDateGroupLabel's list-header
 * format (that one reads naturally inside a grouped feed; this one stands
 * alone as its own line), but built on the same day-diff primitive above
 * so the two never disagree on what "today" means. */
export function formatEventDateLine(iso: string): string {
  const diffDays = daysFromToday(iso);
  const target = new Date(`${iso}T00:00:00`);
  const day = target.getDate();
  const month = target.toLocaleDateString("en-GB", { month: "long" });

  if (diffDays === 0) return `Today · ${day} ${month}`;
  if (diffDays === 1) return "Tomorrow";

  const weekday = target.toLocaleDateString("en-GB", { weekday: "long" });
  return `${weekday}, ${day} ${month}`;
}

/** "9:00 AM – 11:00 AM BST" — omits the range dash/timezone gracefully
 * when the event doesn't specify them. */
export function formatTimeRange(time?: string, endTime?: string, timezoneLabel?: string): string | undefined {
  if (!time) return undefined;
  const range = endTime ? `${time} – ${endTime}` : time;
  return timezoneLabel ? `${range} ${timezoneLabel}` : range;
}
