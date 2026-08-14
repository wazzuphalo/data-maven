import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PrototypeBanner } from "@/components/ui/PrototypeBanner";
import { WishlistButton } from "@/components/restaurants/WishlistButton";
import { RESTAURANTS } from "../../../../content/restaurants";

export function generateStaticParams() {
  return RESTAURANTS.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = RESTAURANTS.find((r) => r.slug === slug);
  if (!restaurant) return {};
  return {
    title: `${restaurant.name} (Prototype)`,
    description: `Placeholder listing for ${restaurant.name} — part of the restaurant directory demo.`,
    robots: { index: false, follow: false },
  };
}

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurant = RESTAURANTS.find((r) => r.slug === slug);
  if (!restaurant) notFound();

  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/restaurants", label: "Restaurants" },
    { href: `/restaurants/${restaurant.slug}`, label: restaurant.name },
  ];

  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6 max-w-(--container-content)">
        <Breadcrumbs items={crumbs} />
        <Eyebrow>Prototype listing</Eyebrow>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-hero font-heading font-semibold">
            {restaurant.name}
          </h1>
          <WishlistButton slug={restaurant.slug} name={restaurant.name} />
        </div>
        <p className="text-body-lg text-text-muted">
          {restaurant.cuisine} &middot; {restaurant.city} &middot;{" "}
          {restaurant.priceRange}
        </p>

        <PrototypeBanner>
          This is a placeholder listing for demonstration only — not a real
          restaurant. A real listing would include hours, a menu, photos, and
          a map here.
        </PrototypeBanner>

        <p className="text-body-lg text-text">{restaurant.description}</p>

        <div className="flex flex-wrap gap-2">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-surface-border px-3 py-1 text-small text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
