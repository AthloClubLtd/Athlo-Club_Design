import { HeartHandshake } from "lucide-react";

export function VolunteeringEmptyState() {
  return (
    <div
      role="tabpanel"
      id="discover-panel-volunteering"
      aria-labelledby="discover-tab-volunteering"
      className="flex h-full min-h-[400px] flex-col items-center justify-center gap-[var(--space-3)] px-[var(--space-6)] text-center"
    >
      <HeartHandshake size={28} aria-hidden="true" className="text-athlo-text-disabled" />
      <p className="font-display text-athlo-body-lg font-semibold text-athlo-text-primary">Coming soon</p>
      <p className="font-body text-athlo-body text-athlo-text-secondary">
        Volunteering opportunities at strength events will show up here.
      </p>
    </div>
  );
}
