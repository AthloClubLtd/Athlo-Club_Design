"use client";

import { Search } from "lucide-react";

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="px-[var(--space-4)]">
      <label htmlFor="discover-search" className="sr-only">
        Search events, clubs, sports
      </label>
      <div className="flex items-center gap-[var(--space-2)] rounded-athlo-pill border border-athlo-line-strong bg-athlo-bg-raised px-[var(--space-4)] py-[var(--space-2)]">
        <Search size={16} aria-hidden="true" className="shrink-0 text-athlo-text-secondary" />
        <input
          id="discover-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search events, clubs, sports"
          className="w-full min-w-0 bg-transparent font-body text-athlo-body text-athlo-text-primary placeholder:text-athlo-text-secondary focus:outline-none"
        />
      </div>
    </div>
  );
}
