import type { MetadataRoute } from "next";
import { getAllClubSlugs, getAllEventSlugs } from "@/lib/discover";

const BASE_URL = "https://athloclub.com";

const STATIC_ROUTES = ["", "/discover", "/investors", "/about", "/privacy", "/terms", "/cookies"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
  }));

  const [eventSlugs, clubSlugs] = await Promise.all([getAllEventSlugs(), getAllClubSlugs()]);

  const eventEntries: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${BASE_URL}/discover/events/${slug}`,
    lastModified: now,
  }));

  const clubEntries: MetadataRoute.Sitemap = clubSlugs.map((slug) => ({
    url: `${BASE_URL}/discover/clubs/${slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...eventEntries, ...clubEntries];
}
