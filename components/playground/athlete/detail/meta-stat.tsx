import type { LucideIcon } from "lucide-react";

export function MetaStat({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="flex items-center gap-[var(--space-2)] font-body text-athlo-label font-semibold text-athlo-text-primary">
      <Icon size={14} aria-hidden="true" className="text-athlo-text-secondary" />
      {label}
    </span>
  );
}
