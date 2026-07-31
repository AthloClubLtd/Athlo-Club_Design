import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { SPORTS } from "@/lib/sports";
import type { ClubType, Sport } from "@/lib/types";

export default async function NewClubPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const isAdmin = session.role === "ADMIN";

  async function createClub(formData: FormData) {
    "use server";
    const current = await getCurrentSession();
    if (!current) redirect("/login");

    // Server-side enforcement: never trust the client. FEDERATION clubs may
    // only be created by an Athlete with role ADMIN, regardless of what the
    // submitted form data claims.
    const athlete = await prisma.athlete.findUnique({ where: { id: current.athleteId } });
    if (!athlete) redirect("/login");

    const requestedType = String(formData.get("type") ?? "SOCIAL") as ClubType;
    const type: ClubType = requestedType === "FEDERATION" && athlete.role === "ADMIN"
      ? "FEDERATION"
      : requestedType === "BUSINESS"
        ? "BUSINESS"
        : "SOCIAL";

    const name = String(formData.get("name") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const sports = formData.getAll("sports").map(String) as Sport[];

    if (!name) return;

    const slug = `${slugify(name)}-${Math.random().toString(36).slice(2, 6)}`;

    const club = await prisma.club.create({
      data: {
        slug,
        name,
        type,
        location: location || null,
        description: description || null,
        sports,
        ownerId: athlete.id,
        members: {
          create: { athleteId: athlete.id, role: "OWNER" },
        },
      },
    });

    redirect(`/app/clubs/${club.slug}`);
  }

  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-lime">New club</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Create a club</h1>
      <p className="mt-3 text-grey-400">
        Social clubs are for community and training groups. Business clubs
        are for gyms and organisers running paid events.
        {isAdmin && " As a platform admin, you can also create a federation."}
      </p>

      <form action={createClub} className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-grey-100">
            Club name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
          />
        </div>

        <div>
          <span className="block text-sm font-semibold text-grey-100">Club type</span>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-grey-300">
              <input type="radio" name="type" value="SOCIAL" defaultChecked className="h-4 w-4 text-lime" />
              Social
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-grey-300">
              <input type="radio" name="type" value="BUSINESS" className="h-4 w-4 text-lime" />
              Business
            </label>
            {isAdmin && (
              <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-grey-300">
                <input type="radio" name="type" value="FEDERATION" className="h-4 w-4 text-lime" />
                Federation
              </label>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-grey-100">
            Location
          </label>
          <input
            id="location"
            name="location"
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-grey-100">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
          />
        </div>

        <fieldset>
          <legend className="block text-sm font-semibold text-grey-100">Sports</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {SPORTS.map((sport) => (
              <label
                key={sport.slug}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-grey-300"
              >
                <input type="checkbox" name="sports" value={sport.slug} className="h-4 w-4 rounded border-white/20 bg-navy text-lime focus:ring-lime" />
                {sport.label}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="rounded-full bg-lime px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-lime-600"
        >
          Create club
        </button>
      </form>
    </div>
  );
}
