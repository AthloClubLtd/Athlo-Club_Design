"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export function CollapsibleSection({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] w-full items-center justify-between gap-[var(--space-3)] px-[var(--space-4)] py-[var(--space-3)] text-left"
      >
        <span className="font-display text-athlo-body font-semibold text-athlo-text-primary">{label}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-athlo-text-secondary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div id={contentId} className="flex flex-col gap-[var(--space-3)] border-t border-athlo-line-subtle p-[var(--space-4)]">
          {children}
        </div>
      )}
    </div>
  );
}
