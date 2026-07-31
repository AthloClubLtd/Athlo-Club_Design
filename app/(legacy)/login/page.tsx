import type { Metadata } from "next";
import Link from "next/link";
import { signIn } from "@/auth";

export const metadata: Metadata = {
  title: "Log in — Athlo Club",
  description: "Log in to your Athlo Club account.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const callbackUrl = searchParams.callbackUrl ?? "/app";

  async function signInWithGoogle() {
    "use server";
    await signIn("google", { redirectTo: callbackUrl });
  }

  async function signInWithEmail(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "");
    await signIn("nodemailer", { email, redirectTo: callbackUrl });
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-lime">Log in</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Welcome back.</h1>
      <p className="mt-3 text-grey-400">
        Log in to track your PRs, manage your clubs, or register for your
        next event.
      </p>

      <form action={signInWithGoogle} className="mt-8">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-navy-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
        >
          Continue with Google
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-grey-400">
        <span className="h-px flex-1 bg-white/10" />
        or
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form action={signInWithEmail} className="space-y-3">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-lime px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-lime-600"
        >
          Send magic link
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-grey-400">
        New to Athlo Club?{" "}
        <Link href="/signup" className="font-semibold text-lime hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
