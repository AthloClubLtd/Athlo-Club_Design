import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEventSlugs, getClubBySlug, getEventBySlug } from "@/lib/discover";
import { sportLabel } from "@/lib/sports";

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return {};
  return {
    title: `${event.title} — Athlo Club`,
    description: event.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPrice(priceCents: number, currency: string) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(priceCents / 100);
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const club = await getClubBySlug(event.clubSlug);

  const isVirtual = event.format === "VIRTUAL";
  const isHybrid = event.format === "HYBRID";

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: isVirtual
      ? "https://schema.org/OnlineEventAttendanceMode"
      : isHybrid
        ? "https://schema.org/MixedEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: event.clubName,
    },
    offers: event.ticketTypes.map((tt) => ({
      "@type": "Offer",
      name: tt.name,
      price: (tt.priceCents / 100).toFixed(2),
      priceCurrency: tt.currency,
      availability: "https://schema.org/InStock",
    })),
  };

  if (isVirtual && event.virtualUrl) {
    jsonLd.location = {
      "@type": "VirtualLocation",
      url: event.virtualUrl,
    };
  } else if (event.venue) {
    jsonLd.location = {
      "@type": "Place",
      name: event.venue,
      address: event.location ?? undefined,
    };
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-20 sm:pt-28">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-lime/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
          {sportLabel(event.sport)}
        </span>
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-grey-300">
          {isVirtual ? "Virtual" : isHybrid ? "Hybrid" : "In person"}
        </span>
      </div>

      <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        {event.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-grey-300">{event.description}</p>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-grey-400">
              Schedule
            </h2>
            <div className="mt-4 rounded-2xl border border-white/10 bg-navy-800 p-6">
              <p className="font-semibold text-white">Starts</p>
              <p className="text-grey-300">{formatDate(event.startDate)}</p>
              <p className="mt-4 font-semibold text-white">Ends</p>
              <p className="text-grey-300">{formatDate(event.endDate)}</p>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-grey-400">
              {isVirtual ? "Virtual link" : "Venue"}
            </h2>
            <div className="mt-4 rounded-2xl border border-white/10 bg-navy-800 p-6">
              {isVirtual && event.virtualUrl ? (
                <p className="text-grey-300">
                  Join online — the link is shared with registered athletes ahead of the event.
                </p>
              ) : (
                <>
                  <p className="font-semibold text-white">{event.venue}</p>
                  <p className="text-grey-300">{event.location}</p>
                </>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-grey-400">
              Ticket tiers
            </h2>
            <div className="mt-4 space-y-3">
              {event.ticketTypes.map((tt) => (
                <div
                  key={tt.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-navy-800 p-5"
                >
                  <span className="font-semibold text-white">{tt.name}</span>
                  <span className="font-bold text-lime">{formatPrice(tt.priceCents, tt.currency)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-navy-800 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-grey-400">
              Organised by
            </p>
            <Link href={`/discover/clubs/${event.clubSlug}`} className="mt-2 block font-bold text-white hover:text-lime">
              {event.clubName}
            </Link>
            {club && <p className="mt-2 text-sm text-grey-400">{club.location}</p>}
          </div>

          <Link
            href="/signup"
            className="block w-full rounded-full bg-lime px-6 py-3 text-center text-sm font-bold text-navy transition-colors hover:bg-lime-600"
          >
            Register for this event
          </Link>
        </aside>
      </div>
    </div>
  );
}
