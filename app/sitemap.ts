import type { MetadataRoute } from "next";
import { getAllClubSlugs, getAllEventSlugs } from "@/lib/discover";
import { getAllSlugs as getAllBlogSlugs } from "@/lib/blog";

const BASE_URL = "https://athloclub.com";

const STATIC_ROUTES = [
  "",
  "/discover",
  "/for-organisers",
  "/for-athletes",
  "/pricing",
  "/investors",
  "/about",
  "/privacy",
  "/terms",
  "/cookies",
  "/blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
  }));

  const [eventSlugs, clubSlugs, blogSlugs] = await Promise.all([
    getAllEventSlugs(),
    getAllClubSlugs(),
    Promise.resolve(getAllBlogSlugs()),
  ]);

  const eventEntries: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${BASE_URL}/discover/events/${slug}`,
    lastModified: now,
  }));

  const clubEntries: MetadataRoute.Sitemap = clubSlugs.map((slug) => ({
    url: `${BASE_URL}/discover/clubs/${slug}`,
    lastModified: now,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...eventEntries, ...clubEntries, ...blogEntries];
}
