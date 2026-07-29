import Link from "next/link";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function ClubsPage() {
  const session = await getCurrentSession();
  if (!session) return null;

  const memberships = await prisma.clubMembership.findMany({
    where: { athleteId: session.athleteId },
    include: { club: true },
    orderBy: { joinedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-lime">Clubs</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Your clubs</h1>
        </div>
        <Link
          href="/app/clubs/new"
          className="rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-lime-600"
        >
          Create a club
        </Link>
      </div>

      {memberships.length === 0 ? (
        <p className="mt-10 text-grey-400">
          You&rsquo;re not a member of any clubs yet.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {memberships.map((membership) => (
            <Link
              key={membership.id}
              href={`/app/clubs/${membership.club.slug}`}
              className="rounded-2xl border border-white/10 bg-navy-800 p-6 transition-colors hover:border-lime/50"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-lime">
                {membership.role}
              </p>
              <p className="mt-2 font-bold text-white">{membership.club.name}</p>
              <p className="mt-1 text-sm text-grey-400">{membership.club.location}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
