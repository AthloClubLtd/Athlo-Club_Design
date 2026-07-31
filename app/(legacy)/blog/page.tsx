import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getFilteredPosts } from "@/lib/blog";
import BlogFilters from "@/components/blog-filters";

export const metadata: Metadata = {
  title: "Blog — Athlo Club",
  description:
    "Guides and explainers for organisers and athletes across weightlifting, powerlifting, CrossFit and fitness racing.",
};

const PAGE_SIZE = 6;

export default function BlogIndexPage({
  searchParams,
}: {
  searchParams: { tag?: string; persona?: string; page?: string };
}) {
  const tag = searchParams.tag;
  const persona = searchParams.persona;
  const page = Math.max(1, Number(searchParams.page) || 1);

  const allMatching = getFilteredPosts({ tag, persona });
  const totalPages = Math.max(1, Math.ceil(allMatching.length / PAGE_SIZE));
  const posts = allMatching.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const tags = getAllTags();

  function pageHref(n: number) {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    if (persona) params.set("persona", persona);
    if (n > 1) params.set("page", String(n));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pt-28">
      <p className="text-sm font-semibold uppercase tracking-widest text-lime">Blog</p>
      <h1 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        Guides for organisers and athletes.
      </h1>

      <div className="mt-10">
        <BlogFilters tags={tags} />
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-grey-400">No posts match those filters yet.</p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col rounded-2xl border border-white/10 bg-navy-800 p-6 transition-colors hover:border-lime/50"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-lime">
                {post.persona === "organiser" ? "For organisers" : "For athletes"}
              </span>
              <h2 className="mt-3 text-lg font-bold leading-snug tracking-tight">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-grey-400">{post.description}</p>
              <p className="mt-4 text-xs text-grey-400">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={pageHref(n)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                n === page ? "bg-lime text-navy" : "border border-white/15 text-grey-300 hover:text-white"
              }`}
            >
              {n}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
