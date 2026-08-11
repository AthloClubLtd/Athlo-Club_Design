import { Plus } from "lucide-react";

export function CreateClubBanner({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="mx-[var(--space-4)] flex items-center justify-between gap-[var(--space-3)] rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised p-[var(--space-4)]">
      <div className="min-w-0 flex-1">
        <p className="font-display text-athlo-body font-semibold text-athlo-text-primary">Create your own club</p>
        <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">
          Host events &amp; grow your community
        </p>
      </div>
      <button
        type="button"
        onClick={onCreate}
        className="flex min-h-[44px] shrink-0 items-center gap-[var(--space-2)] rounded-athlo-md bg-athlo-lime px-[var(--space-4)] font-body font-semibold text-athlo-text-on-lime transition-all hover:-translate-y-px hover:shadow-athlo-lime"
      >
        <Plus size={16} aria-hidden="true" />
        Create
      </button>
    </div>
  );
}
