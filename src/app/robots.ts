import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.startsWith("http")
    ? siteConfig.url
    : "https://example.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /restaurants, /wishlist, /signup are a prototype: placeholder listings
      // and a demo signup, no real data or accounts yet. Indexing fake local
      // listings would actively hurt search/GEO trust — keep these out until
      // there's real data and a real account system behind them.
      disallow: ["/api/", "/restaurants", "/wishlist", "/signup"],
    },
    sitemap: new URL("/sitemap.xml", base).toString(),
  };
}
