import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { SPORTS } from "@/lib/sports";
import type { Sport } from "@/lib/types";

export const metadata: Metadata = {
  title: "Complete your profile — Athlo Club",
};

export default async function OnboardingPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const athlete = await prisma.athlete.findUnique({ where: { id: session.athleteId } });

  async function completeOnboarding(formData: FormData) {
    "use server";
    const currentSession = await getCurrentSession();
    if (!currentSession) redirect("/login");

    const handle = String(formData.get("handle") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const sports = formData.getAll("sports").map(String) as Sport[];

    if (!handle || !name) return;

    await prisma.athlete.update({
      where: { id: currentSession.athleteId },
      data: {
        handle,
        name,
        location: location || null,
        sports,
      },
    });

    redirect("/app");
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-lime">
        One last step
      </p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
        Tell us about you.
      </h1>
      <p className="mt-3 text-grey-400">
        This builds your athlete profile — you can change it any time in
        settings.
      </p>

      <form action={completeOnboarding} className="mt-8 space-y-6">
        <div>
          <label htmlFor="handle" className="block text-sm font-semibold text-grey-100">
            Handle
          </label>
          <input
            id="handle"
            name="handle"
            required
            defaultValue={athlete?.handle}
            placeholder="e.g. sam-lifts"
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-grey-100">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={athlete?.name}
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-grey-100">
            Location
          </label>
          <input
            id="location"
            name="location"
            defaultValue={athlete?.location ?? ""}
            placeholder="e.g. Manchester, UK"
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
                <input
                  type="checkbox"
                  name="sports"
                  value={sport.slug}
                  defaultChecked={athlete?.sports.includes(sport.slug)}
                  className="h-4 w-4 rounded border-white/20 bg-navy text-lime focus:ring-lime"
                />
                {sport.label}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full rounded-full bg-lime px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-lime-600"
        >
          Save and continue
        </button>
      </form>
    </div>
  );
}
