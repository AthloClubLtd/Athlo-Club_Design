"use client";

import { Search } from "lucide-react";

/** id/label/placeholder are configurable (not hardcoded to Discover's copy)
 * so the Clubs screen can use its own exact placeholder and id — the two
 * screens stay mounted simultaneously (display:none toggling), so a
 * hardcoded id would mean two elements sharing the same id in the DOM at
 * once. */
export function SearchBar({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="px-[var(--space-4)]">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="flex items-center gap-[var(--space-2)] rounded-athlo-pill border border-athlo-line-strong bg-athlo-bg-raised px-[var(--space-4)] py-[var(--space-2)]">
        <Search size={16} aria-hidden="true" className="shrink-0 text-athlo-text-secondary" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent font-body text-athlo-body text-athlo-text-primary placeholder:text-athlo-text-secondary focus:outline-none"
        />
      </div>
    </div>
  );
}
