import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { SPORTS } from "@/lib/sports";
import type { Sport } from "@/lib/types";

export default async function EditProfilePage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const athlete = await prisma.athlete.findUnique({
    where: { id: session.athleteId },
    include: { records: { orderBy: { achievedAt: "desc" } } },
  });
  if (!athlete) redirect("/login");

  async function updateProfile(formData: FormData) {
    "use server";
    const current = await getCurrentSession();
    if (!current) redirect("/login");

    const bio = String(formData.get("bio") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const sports = formData.getAll("sports").map(String) as Sport[];

    await prisma.athlete.update({
      where: { id: current.athleteId },
      data: { bio: bio || null, location: location || null, sports },
    });

    revalidatePath("/app/profile");
    redirect("/app/profile");
  }

  async function addPersonalRecord(formData: FormData) {
    "use server";
    const current = await getCurrentSession();
    if (!current) redirect("/login");

    const sport = String(formData.get("sport") ?? "") as Sport;
    const discipline = String(formData.get("discipline") ?? "").trim();
    const value = Number(formData.get("value"));
    const unit = String(formData.get("unit") ?? "").trim();
    const achievedAt = String(formData.get("achievedAt") ?? "");

    if (!sport || !discipline || Number.isNaN(value) || !unit || !achievedAt) {
      return;
    }

    await prisma.personalRecord.create({
      data: {
        athleteId: current.athleteId,
        sport,
        discipline,
        value,
        unit,
        achievedAt: new Date(achievedAt),
      },
    });

    revalidatePath("/app/profile/edit");
    revalidatePath("/app/profile");
  }

  async function deletePersonalRecord(formData: FormData) {
    "use server";
    const current = await getCurrentSession();
    if (!current) redirect("/login");

    const id = String(formData.get("id") ?? "");
    await prisma.personalRecord.deleteMany({
      where: { id, athleteId: current.athleteId },
    });

    revalidatePath("/app/profile/edit");
    revalidatePath("/app/profile");
  }

  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-lime">Edit profile</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Update your details</h1>

      <form action={updateProfile} className="mt-8 space-y-6">
        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-grey-100">
            Location
          </label>
          <input
            id="location"
            name="location"
            defaultValue={athlete.location ?? ""}
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-semibold text-grey-100">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            defaultValue={athlete.bio ?? ""}
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
                  defaultChecked={athlete.sports.includes(sport.slug)}
                  className="h-4 w-4 rounded border-white/20 bg-navy text-lime focus:ring-lime"
                />
                {sport.label}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="rounded-full bg-lime px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-lime-600"
        >
          Save changes
        </button>
      </form>

      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-grey-400">
          Personal records
        </h2>

        <div className="mt-4 space-y-3">
          {athlete.records.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-navy-800 p-5"
            >
              <div>
                <p className="font-semibold text-white">
                  {record.discipline}: {record.value}
                  {record.unit}
                </p>
                <p className="text-xs text-grey-400">
                  {record.sport} &middot; {new Date(record.achievedAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <form action={deletePersonalRecord}>
                <input type="hidden" name="id" value={record.id} />
                <button
                  type="submit"
                  className="text-sm font-semibold text-grey-400 hover:text-white"
                >
                  Remove
                </button>
              </form>
            </div>
          ))}
        </div>

        <form action={addPersonalRecord} className="mt-6 grid gap-3 sm:grid-cols-2">
          <select
            name="sport"
            required
            defaultValue=""
            className="rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-lime"
          >
            <option value="" disabled>
              Sport
            </option>
            {SPORTS.map((sport) => (
              <option key={sport.slug} value={sport.slug}>
                {sport.label}
              </option>
            ))}
          </select>
          <input
            name="discipline"
            required
            placeholder="Discipline, e.g. Snatch"
            className="rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-lime"
          />
          <input
            name="value"
            type="number"
            step="any"
            required
            placeholder="Value, e.g. 85"
            className="rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-lime"
          />
          <input
            name="unit"
            required
            placeholder="Unit, e.g. kg"
            className="rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-lime"
          />
          <input
            name="achievedAt"
            type="date"
            required
            className="rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-lime sm:col-span-2"
          />
          <button
            type="submit"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5 sm:col-span-2"
          >
            Add PR
          </button>
        </form>
      </section>
    </div>
  );
}
