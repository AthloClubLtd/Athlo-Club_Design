import Link from "next/link";
import { HeroFlipbook, type OverlayCard } from "@/components/HeroFlipbook";

// TODO: replace with the real "join as a club" Typeform URL
const JOIN_TYPEFORM_URL = "https://your-typeform-url.typeform.com/to/join-placeholder";

const OVERLAY_CARDS: OverlayCard[] = [
  { name: "STRONG GIRLS HQ", location: "London, UK", active: true },
  { name: "WLV LIFTING CLUB", location: "Wolverhampton, UK" },
  { name: "BRITISH POWERLIFTING FEDERATION", location: "Remote" },
];

export function Hero() {
  return (
    <section className="mx-auto max-w-container-wide px-gutter pb-16 pt-24 md:pb-24 md:pt-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h1 className="font-display text-h1 font-bold tracking-heading text-ink-primary md:text-display-l">
            Connecting strength communities to the athletes who belong in them.
          </h1>
          <p className="mt-6 font-text text-body-lg text-ink-body">
            Organisers run events and competitions end-to-end in weightlifting,
            powerlifting, Hyrox, CrossFit and fitness Racing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={JOIN_TYPEFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-lime px-6 py-[13px] font-text text-sm font-semibold text-ink-onlime transition-[box-shadow,transform] duration-150 hover:-translate-y-px hover:shadow-lime"
            >
              Join as a club
            </a>
            <Link
              href="/discover"
              className="font-text text-sm font-semibold text-lime transition-colors hover:text-lime-soft"
            >
              Explore events →
            </Link>
          </div>
        </div>

        <HeroFlipbook overlayCards={OVERLAY_CARDS} />
      </div>
    </section>
  );
}
