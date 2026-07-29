import Link from "next/link";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { sportLabel } from "@/lib/sports";

export default async function ProfilePage() {
  const session = await getCurrentSession();
  if (!session) return null;

  const athlete = await prisma.athlete.findUnique({
    where: { id: session.athleteId },
    include: { records: { orderBy: { achievedAt: "desc" } } },
  });

  if (!athlete) return null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-lime">Profile</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{athlete.name}</h1>
          <p className="text-grey-400">@{athlete.handle}</p>
        </div>
        <Link
          href="/app/profile/edit"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
        >
          Edit profile
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-navy-800 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-grey-400">Location</p>
          <p className="mt-2 text-white">{athlete.location ?? "Not set"}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-navy-800 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-grey-400">Sports</p>
          <p className="mt-2 text-white">
            {athlete.sports.length ? athlete.sports.map(sportLabel).join(", ") : "Not set"}
          </p>
        </div>
      </div>

      {athlete.bio && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-navy-800 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-grey-400">Bio</p>
          <p className="mt-2 text-grey-300">{athlete.bio}</p>
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-grey-400">
          Personal records
        </h2>
        {athlete.records.length === 0 ? (
          <p className="mt-4 text-grey-400">No PRs logged yet.</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {athlete.records.map((record) => (
              <div key={record.id} className="rounded-2xl border border-white/10 bg-navy-800 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-lime">
                  {sportLabel(record.sport)}
                </p>
                <p className="mt-1 font-bold text-white">
                  {record.discipline}: {record.value}
                  {record.unit}
                </p>
                <p className="mt-1 text-xs text-grey-400">
                  {new Date(record.achievedAt).toLocaleDateString("en-GB")}
                  {record.verified ? " · Verified" : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-grey-400">
          Competition history
        </h2>
        <CompetitionHistory athleteId={athlete.id} />
      </section>
    </div>
  );
}

async function CompetitionHistory({ athleteId }: { athleteId: string }) {
  const entries = await prisma.competitionEntry.findMany({
    where: { athleteId },
    include: { competition: { include: { event: true } } },
    orderBy: { createdAt: "desc" },
  });

  if (entries.length === 0) {
    return <p className="mt-4 text-grey-400">No competitions entered yet.</p>;
  }

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {entries.map((entry) => (
        <div key={entry.id} className="rounded-2xl border border-white/10 bg-navy-800 p-5">
          <p className="font-bold text-white">{entry.competition.name}</p>
          <p className="mt-1 text-sm text-grey-400">{entry.competition.event.title}</p>
          {entry.placement && (
            <p className="mt-1 text-sm text-lime">Placed {entry.placement}</p>
          )}
        </div>
      ))}
    </div>
  );
}
