import type { Metadata } from "next";
import { SectionLabel } from "@/components/marketing/ui/section-label";
import { Button } from "@/components/marketing/ui/button";

export const metadata: Metadata = {
  title: "Athlete login",
  description: "Athlete login is coming soon. Contact us for a demo of our MVP.",
};

const FOUNDER_EMAIL = "swathi@athloclub.com";

export default function AthleteLoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-[var(--gutter)] py-[var(--space-9)] text-center">
      <SectionLabel tone="lime">Athlete login</SectionLabel>
      <h1 className="mt-[var(--space-3)] font-display text-athlo-display-l font-bold tracking-[var(--tracking-display)] text-athlo-text-primary">
        Coming soon.
      </h1>
      <p className="mt-[var(--space-5)] font-body text-athlo-body-lg text-athlo-text-body">
        We&apos;re still building the athlete side of Athlo Club. Contact us for a demo of our MVP.
      </p>
      <div className="mt-[var(--space-7)]">
        <Button href={`mailto:${FOUNDER_EMAIL}`} variant="primary">
          Email {FOUNDER_EMAIL}
        </Button>
      </div>
    </div>
  );
}
