"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NavAuthActions() {
  const { data: session, status } = useSession();

  if (status === "authenticated" && session.user) {
    const initial = (session.user.name ?? session.user.email ?? "A").slice(0, 1).toUpperCase();
    return (
      <Link
        href="/app"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-sm font-bold text-navy"
        title={session.user.name ?? "Your account"}
      >
        {initial}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/login" className="text-sm font-semibold text-white hover:text-lime">
        Log in
      </Link>
      <Link
        href="/signup"
        className="rounded-full bg-lime px-4 py-2 text-sm font-bold text-navy transition-colors hover:bg-lime-600"
      >
        Sign up
      </Link>
    </div>
  );
}
