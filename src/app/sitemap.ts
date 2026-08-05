import type { MetadataRoute } from "next";
import { getPublishedAreaSlugs } from "@/lib/areas";
import { siteConfig } from "@/lib/site-config";

const STATIC_ROUTES = [
  { path: "", priority: 1 },
  { path: "/audit", priority: 0.9 },
  { path: "/services", priority: 0.8 },
  { path: "/results", priority: 0.6 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.9 },
  { path: "/areas", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.startsWith("http")
    ? siteConfig.url
    : "https://example.com";

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: new URL(route.path, base).toString(),
    lastModified: new Date(),
    priority: route.priority,
  }));

  const areaEntries = getPublishedAreaSlugs().map((slug) => ({
    url: new URL(`/areas/${slug}`, base).toString(),
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticEntries, ...areaEntries];
}
