"use client";

import { ChevronDown } from "lucide-react";

export function FilterDropdown<T extends string | number>({
  id,
  label,
  options,
  value,
  onChange,
  className = "relative inline-flex",
}: {
  id: string;
  /** Accessible name only — dropdowns in the filter row have no visible
   * label of their own, the selected option's text carries that. */
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** Wrapping div's classes — callers that need both dropdowns to share a
   * row (e.g. `flex-1 min-w-0`, replacing the default intrinsic width)
   * override this instead of it always sizing to its own content. */
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={String(value)}
        onChange={(e) => {
          const match = options.find((o) => String(o.value) === e.target.value);
          if (match) onChange(match.value);
        }}
        className="min-h-9 w-full min-w-0 appearance-none truncate rounded-athlo-pill border border-athlo-line-strong bg-athlo-bg-base py-[var(--space-1)] pl-[var(--space-4)] pr-[var(--space-6)] font-body text-athlo-label font-semibold text-athlo-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-athlo-lime"
      >
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)} className="bg-athlo-bg-raised text-athlo-text-primary">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        aria-hidden="true"
        className="pointer-events-none absolute right-[var(--space-3)] top-1/2 -translate-y-1/2 text-athlo-text-secondary"
      />
    </div>
  );
}
