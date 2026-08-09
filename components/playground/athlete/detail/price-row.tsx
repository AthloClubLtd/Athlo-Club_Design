import { formatPrice } from "@/lib/playground/format";
import type { Ticket } from "@/lib/playground/types";

/** One shape, two labels — used for both Tickets (event) and Entry Fees
 * (competition), which are the same "name/detail left, price right" row. */
export function PriceRow({ ticket, onTap }: { ticket: Ticket; onTap: () => void }) {
  return (
    <button
      type="button"
      onClick={onTap}
      className="flex w-full items-center justify-between gap-[var(--space-4)] rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised px-[var(--space-4)] py-[var(--space-4)] text-left"
    >
      <div className="min-w-0">
        <p className="font-display text-athlo-body font-semibold text-athlo-text-primary">{ticket.name}</p>
        <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">{ticket.detail}</p>
      </div>
      <span className="shrink-0 font-display text-athlo-body font-semibold text-athlo-text-primary">
        {ticket.price === null ? "—" : formatPrice(ticket.price)}
      </span>
    </button>
  );
}
