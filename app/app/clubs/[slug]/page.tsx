import { notFound, redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { sportLabel } from "@/lib/sports";

export default async function ClubDashboardPage({ params }: { params: { slug: string } }) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const club = await prisma.club.findUnique({
    where: { slug: params.slug },
    include: {
      members: { include: { athlete: true }, orderBy: { joinedAt: "asc" } },
      federation: true,
    },
  });
  if (!club) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-grey-300">
          {club.type}
        </span>
        {club.federation && (
          <span className="rounded-full border border-lime/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
            Affiliated to {club.federation.name}
          </span>
        )}
      </div>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">{club.name}</h1>
      <p className="mt-2 max-w-xl text-grey-400">{club.description}</p>

      <div className="mt-8 flex flex-wrap gap-4 text-sm text-grey-400">
        <span>{club.location}</span>
        <span>&middot;</span>
        <span>{club.sports.map(sportLabel).join(", ")}</span>
        <span>&middot;</span>
        <span>{club.members.length} members</span>
      </div>

      <div className="mt-8">
        <button
          disabled
          title="Event creation is coming in v3"
          className="cursor-not-allowed rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-grey-400"
        >
          Create an event — coming in v3
        </button>
      </div>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-grey-400">Members</h2>
        <div className="mt-4 space-y-3">
          {club.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-navy-800 p-4"
            >
              <span className="font-semibold text-white">{member.athlete.name}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-grey-400">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
