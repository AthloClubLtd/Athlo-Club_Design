import { Dumbbell } from "lucide-react";
import type { Sport } from "@/lib/playground/types";
import { SPORT_ICONS } from "@/components/playground/athlete/sport-icons";

/** Renders a real event photo when one exists (see /public/events), else a
 * branded placeholder — a dark tile with the event's primary sport glyph,
 * not an empty grey box. `className` carries sizing/shape so callers can
 * use it as a 56px row thumbnail, a 96px shelf-card image, or a full-width
 * detail-screen hero without a separate variant per size. */
export function EventThumb({
  event,
  className = "h-14 w-14 rounded-athlo-md",
}: {
  event: { title: string; imageUrl?: string; sports: Sport[] };
  className?: string;
}) {
  if (event.imageUrl) {
    return <img src={event.imageUrl} alt={event.title} className={`${className} object-cover`.trim()} />;
  }

  const Icon = event.sports[0] ? SPORT_ICONS[event.sports[0]] : Dumbbell;

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-gradient-to-br from-athlo-bg-overlay to-athlo-lime-tint text-athlo-text-secondary ${className}`.trim()}
    >
      <Icon size={22} />
    </div>
  );
}
