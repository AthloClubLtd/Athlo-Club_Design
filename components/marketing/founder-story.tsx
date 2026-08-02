import { SectionLabel } from "@/components/marketing/ui/section-label";
import { FounderCard } from "@/components/marketing/founder-card";

export function FounderStory() {
  return (
    <section>
      <SectionLabel tone="lime" className="text-center">
        Built by
      </SectionLabel>
      <h2 className="mx-auto mt-[var(--space-3)] max-w-3xl text-center font-display text-athlo-h2 font-bold tracking-[var(--tracking-heading)] text-athlo-text-primary">
        We didn&apos;t just study the problem. <span className="text-athlo-lime">We lived it.</span>
      </h2>

      <div className="mt-[var(--space-8)] grid grid-cols-1 gap-[var(--space-9)] md:grid-cols-2 md:gap-[var(--space-8)]">
        <FounderCard
          name="Swathi Pai"
          role="Founder & CEO · Athlete & builder"
          paragraph="Found a dozen run clubs on Strava in a day, but took 2+ months to find a women's powerlifting community. Endurance had a home. Strength didn't."
          headshotAlt="TODO: headshot photo of Swathi Pai, Founder & CEO"
          imageAlt="TODO: photo of Swathi Pai's strength sport story"
        />
        <FounderCard
          name="Tom Hunt"
          role="Chief Growth Officer · Coach & gym owner"
          paragraph="Runs a gym across three strength sports. Used 7+ tools to put on one event, and spent on ads that never reached the right athletes."
          headshotAlt="TODO: headshot photo of Tom Hunt, Chief Growth Officer"
          imageAlt="TODO: photo of Tom Hunt's gym and coaching story"
        />
      </div>
    </section>
  );
}
