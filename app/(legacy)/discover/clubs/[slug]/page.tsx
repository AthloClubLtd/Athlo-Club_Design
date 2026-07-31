import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllClubSlugs, getClubBySlug } from "@/lib/discover";
import { sportLabel } from "@/lib/sports";

export async function generateStaticParams() {
  const slugs = await getAllClubSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const club = await getClubBySlug(params.slug);
  if (!club) return {};
  return {
    title: `${club.name} — Athlo Club`,
    description: club.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ClubDetailPage({ params }: { params: { slug: string } }) {
  const club = await getClubBySlug(params.slug);
  if (!club) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: club.name,
    description: club.description,
    address: club.location ?? undefined,
    sport: club.sports.map(sportLabel),
  };

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-20 sm:pt-28">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-grey-300">
          {club.type === "FEDERATION" ? "Federation" : club.type === "BUSINESS" ? "Business club" : "Social club"}
        </span>
        {club.federationSlug && (
          <Link
            href={`/discover/clubs/${club.federationSlug}`}
            className="rounded-full border border-lime/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-lime"
          >
            Affiliated club
          </Link>
        )}
      </div>

      <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        {club.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-grey-300">{club.description}</p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-grey-400">
        <span>{club.location}</span>
        <span>&middot;</span>
        <span>{club.memberCount} members</span>
        <span>&middot;</span>
        <span>{club.sports.map(sportLabel).join(", ")}</span>
      </div>

      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-grey-400">
          Upcoming events
        </h2>
        {club.upcomingEvents.length === 0 ? (
          <p className="mt-4 text-grey-400">No upcoming events published yet.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {club.upcomingEvents.map((event) => (
              <Link
                key={event.slug}
                href={`/discover/events/${event.slug}`}
                className="rounded-2xl border border-white/10 bg-navy-800 p-6 transition-colors hover:border-lime/50"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-lime">
                  {sportLabel(event.sport)}
                </span>
                <h3 className="mt-2 font-bold tracking-tight">{event.title}</h3>
                <p className="mt-2 text-sm text-grey-400">{formatDate(event.startDate)}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
