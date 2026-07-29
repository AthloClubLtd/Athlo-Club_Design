import Link from "next/link";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AppDashboardPage() {
  const session = await getCurrentSession();
  if (!session) return null;

  const athlete = await prisma.athlete.findUnique({ where: { id: session.athleteId } });

  const upcomingOrders = await prisma.order.findMany({
    where: {
      athleteId: session.athleteId,
      status: "PAID",
      event: { startDate: { gte: new Date() } },
    },
    include: { event: true },
    orderBy: { event: { startDate: "asc" } },
    take: 5,
  });

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-lime">Dashboard</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
        Welcome back{athlete?.name ? `, ${athlete.name.split(" ")[0]}` : ""}.
      </h1>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-grey-400">
          Upcoming events
        </h2>
        {upcomingOrders.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-navy-800 p-8">
            <p className="text-grey-300">You haven&rsquo;t registered for anything yet.</p>
            <Link
              href="/discover"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-lime-600"
            >
              Find your next event
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {upcomingOrders.map((order) =>
              order.event ? (
                <Link
                  key={order.id}
                  href={`/discover/events/${order.event.slug}`}
                  className="rounded-2xl border border-white/10 bg-navy-800 p-6 transition-colors hover:border-lime/50"
                >
                  <p className="font-bold tracking-tight">{order.event.title}</p>
                  <p className="mt-2 text-sm text-grey-400">
                    {new Date(order.event.startDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </Link>
              ) : null,
            )}
          </div>
        )}
      </section>
    </div>
  );
}
