import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PrototypeBanner } from "@/components/ui/PrototypeBanner";
import { RestaurantSearch } from "@/components/restaurants/RestaurantSearch";

// Prototype route: kept out of search entirely (see robots.ts) until real
// listing data and a real account system exist behind it.
export const metadata: Metadata = {
  title: "Restaurant Directory (Prototype)",
  description:
    "A working demo of a searchable restaurant directory with wishlists — placeholder data only.",
  robots: { index: false, follow: false },
};

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/restaurants", label: "Restaurants" },
];

export default function RestaurantsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-surface-border bg-surface-alt">
        <div className="hero-aura" aria-hidden="true" />
        <div className="absolute inset-0 dotted-grid opacity-70" aria-hidden="true" />
        <Container className="relative flex flex-col gap-4 py-16">
          <Breadcrumbs items={CRUMBS} />
          <Eyebrow>Prototype</Eyebrow>
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold">
            Restaurant directory
          </h1>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            Search, filter, and save places to a wishlist — a working demo of
            the kind of interactive tool the six-lens audit can point to for
            a restaurant client. Everything below is placeholder data, not
            real listings.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="flex flex-col gap-8">
          <PrototypeBanner>
            Every listing here is placeholder data for demonstration only —
            no real restaurants, reviews, or ratings. Wishlist saves are
            stored in your browser only (no account needed) and won&apos;t
            follow you to another device. See{" "}
            <Link href="/signup" className="underline hover:text-accent">
              the demo signup
            </Link>{" "}
            for what a real account system could look like.
          </PrototypeBanner>
          <RestaurantSearch />
        </Container>
      </section>
    </>
  );
}
