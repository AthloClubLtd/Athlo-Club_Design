"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PERSONAS: { value: string; label: string }[] = [
  { value: "organiser", label: "Organisers" },
  { value: "athlete", label: "Athletes" },
];

function buildHref(
  params: URLSearchParams,
  key: string,
  value: string | null,
): string {
  const next = new URLSearchParams(params.toString());
  next.delete("page");
  if (value === null) {
    next.delete(key);
  } else if (next.get(key) === value) {
    next.delete(key);
  } else {
    next.set(key, value);
  }
  const qs = next.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export default function BlogFilters({ tags }: { tags: string[] }) {
  const searchParams = useSearchParams();
  const activePersona = searchParams.get("persona");
  const activeTag = searchParams.get("tag");

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href="/blog"
        className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
          !activePersona && !activeTag
            ? "border-lime bg-lime text-navy"
            : "border-white/15 text-grey-300 hover:text-white"
        }`}
      >
        All
      </Link>
      {PERSONAS.map((p) => (
        <Link
          key={p.value}
          href={buildHref(searchParams, "persona", p.value)}
          className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
            activePersona === p.value
              ? "border-lime bg-lime text-navy"
              : "border-white/15 text-grey-300 hover:text-white"
          }`}
        >
          {p.label}
        </Link>
      ))}
      {tags.map((tag) => (
        <Link
          key={tag}
          href={buildHref(searchParams, "tag", tag)}
          className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
            activeTag === tag
              ? "border-lime bg-lime text-navy"
              : "border-white/15 text-grey-300 hover:text-white"
          }`}
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
