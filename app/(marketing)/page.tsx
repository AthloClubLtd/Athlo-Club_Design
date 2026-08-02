import type { Metadata } from "next";
import { Button } from "@/components/marketing/ui/button";
import { HeroFlipbook } from "@/components/marketing/hero-flipbook";
import { ClubPreviewStack } from "@/components/marketing/club-preview-stack";
import { LogoWall } from "@/components/marketing/logo-wall";
import { AboutBlock } from "@/components/marketing/about-block";
import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { ToolPills } from "@/components/marketing/tool-pills";

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
            <Button href="/join" variant="primary">
              Join as a club
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
          subtitle="Everything you need to run your club in one platform — 7+ tools, replaced by one."
          imageSide="right"
          image={
            <ImagePlaceholder alt="TODO: a club's public Athlo Club profile page — branding, members and upcoming events" />
          }
        />

        <AboutBlock
          caption="What Athlo Club replaces"
          title={
            <>
              Goodbye to <span className="text-athlo-lime">the patchwork.</span>
            </>
          }
          subtitle="7+ tools in 1."
          imageSide="left"
          image={
            <ImagePlaceholder alt="TODO: illustration of Eventbrite, spreadsheets, WhatsApp and other scattered tools consolidating into the Athlo Club platform" />
          }
          extra={<ToolPills />}
        />

        <AboutBlock
          caption="What you get"
          title={
            <>
              Everything you need to run your events,{" "}
              <span className="text-athlo-lime">without the 7+ tabs.</span>
            </>
          }
          subtitle="Build, grow and retain your strength community in one place."
          imageSide="right"
          image={
            <ImagePlaceholder alt="TODO: the Athlo Club event dashboard — registration, payments, scoring and live leaderboard in one screen" />
          }
        />
      </div>
    </div>
  );
}
