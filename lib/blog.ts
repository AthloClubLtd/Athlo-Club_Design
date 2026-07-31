import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPersona = "organiser" | "athlete";

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  persona: BlogPersona;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags ?? [],
    persona: data.persona,
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFilteredPosts({
  tag,
  persona,
}: {
  tag?: string;
  persona?: string;
}): BlogPost[] {
  return getAllPosts().filter((post) => {
    if (tag && !post.tags.includes(tag)) return false;
    if (persona && post.persona !== persona) return false;
    return true;
  });
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return Array.from(tags).sort();
}
