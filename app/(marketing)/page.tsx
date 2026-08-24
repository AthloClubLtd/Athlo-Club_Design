import type { Metadata } from "next";
import { Button } from "@/components/marketing/ui/button";
import { HeroFlipbook } from "@/components/marketing/hero-flipbook";
import { ClubPreviewStack } from "@/components/marketing/club-preview-stack";
import { LogoWall } from "@/components/marketing/logo-wall";
import { AboutBlock } from "@/components/marketing/about-block";
import { ContainedImage } from "@/components/marketing/contained-image";
import { ToolPills } from "@/components/marketing/tool-pills";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TractionStrip } from "@/components/marketing/traction-strip";
import { FounderStory } from "@/components/marketing/founder-story";
import { Mission } from "@/components/marketing/mission";
import { LimeCTABand } from "@/components/marketing/lime-cta-band";

export const metadata: Metadata = {
  title: "Athlo Club — Connecting strength communities to the athletes who belong in them",
  description:
    "Athlo Club is the platform for strength sports. Organisers run events and competitions end-to-end in weightlifting, powerlifting, Hyrox, CrossFit and fitness racing.",
};

export default function Home() {
  return (
    <div>
      {/* §1 Hero */}
      <section className="mx-auto grid max-w-[var(--container-wide)] gap-[var(--space-8)] px-[var(--gutter)] pb-[var(--space-9)] pt-[var(--space-8)] lg:grid-cols-2 lg:items-center lg:pt-[var(--space-9)]">
        <div className="max-w-xl">
          <h1 className="font-display text-athlo-h1 font-bold tracking-[var(--tracking-heading)] text-athlo-text-primary sm:text-athlo-display-l">
            Connecting strength communities to the athletes who belong in them.
          </h1>
          <p className="mt-[var(--space-5)] font-body text-athlo-body-lg text-athlo-text-body">
            Organisers run events and competitions end-to-end in weightlifting,
            powerlifting, Hyrox, CrossFit and fitness Racing.
          </p>
          <div className="mt-[var(--space-7)] flex flex-wrap items-center gap-[var(--space-6)]">
            <Button href="https://form.typeform.com/to/oX65OdeW?utm_content=xxxxx" variant="primary">
              Join the waitlist
            </Button>
            <Button href="/discover" variant="ghost">
              Explore events and competitions →
            </Button>
          </div>
        </div>

        <div className="relative h-[420px] sm:h-[520px] lg:h-[600px]">
          <HeroFlipbook className="h-full" />
          <ClubPreviewStack className="absolute bottom-[var(--space-5)] right-[var(--space-5)] w-[min(280px,calc(100%-var(--space-6)))]" />
        </div>
      </section>

      {/* §2 Trusted by */}
      <section className="px-[var(--gutter)]">
        <LogoWall />
      </section>

      {/* §3 About / the problem */}
      <div className="mx-auto max-w-[var(--container-wide)] space-y-[var(--space-9)] px-[var(--gutter)] py-[var(--space-9)]">
        <AboutBlock
          caption="About Athlo Club"
          title={
            <>
              Create your community, <span className="text-athlo-lime">and grow it.</span>
            </>
          }
          subtitle="All the tools to build and retain your community."
          imageSide="right"
          image={
            <ContainedImage
              src="/home/about-progress.jpg"
              alt="Athlo Club progress screen showing a strength profile percentage, earned challenges and badges."
              ratioClassName="aspect-[1092/2475]"
              className="mx-auto max-w-[300px]"
            />
          }
        />

        <AboutBlock
          caption="What Athlo Club replaces"
          title={
            <>
              Goodbye to <span className="text-athlo-lime">the patchwork.</span>
            </>
          }
          subtitle="Eventbrite, spreadsheets, WhatsApp groups, a scoring app, and ad spend that never reaches the right athletes — replaced by one platform."
          imageSide="left"
          image={
            <ContainedImage
              src="/home/goodbye-patchwork.jpg"
              alt="Logos of the scattered tools Athlo Club replaces — Squarespace, Mailchimp, WhatsApp, Excel and more — around the Athlo Club wordmark."
              ratioClassName="aspect-[1254/1128]"
            />
          }
          extra={<ToolPills />}
        />
      </div>

      {/* §4 How it works */}
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] py-[var(--space-9)]">
        <HowItWorks />
      </div>

      {/* §4b Traction — bordered band (not a lime fill: brand law 1 reserves
          lime as a background for the one final CTA band only) gives it
          the same visual distinction as the "Trusted by" band up top.
          py- both sides (not pb- only) keeps the gap either side of this
          section consistent with the 96px+96px rhythm every other section
          uses — it was pb-only before, which halved the gap above it
          against the gap below. */}
      <div className="border-y border-athlo-line-subtle px-[var(--gutter)] py-[var(--space-9)]">
        <TractionStrip />
      </div>

      {/* §5 Built by (founder story) */}
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] py-[var(--space-9)]">
        <FounderStory />
      </div>

      {/* §6 Mission */}
      <Mission />

      {/* §7 Final CTA band */}
      <LimeCTABand />
    </div>
  );
}
