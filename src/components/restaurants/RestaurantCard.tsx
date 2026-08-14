import Link from "next/link";
import type { Restaurant } from "../../../content/restaurants";
import { WishlistButton } from "./WishlistButton";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="reveal card card-interactive relative flex flex-col p-6">
      <div className="absolute right-4 top-4">
        <WishlistButton slug={restaurant.slug} name={restaurant.name} />
      </div>
      <span className="inline-flex w-fit items-center rounded-full bg-ink-100 px-2.5 py-0.5 text-small font-medium uppercase tracking-wide text-text-muted">
        Placeholder
      </span>
      <Link href={`/restaurants/${restaurant.slug}`} className="mt-3 pr-10">
        <h3 className="text-body-lg font-heading font-semibold hover:text-accent transition-colors">
          {restaurant.name}
        </h3>
      </Link>
      <p className="mt-1 text-small text-text-muted">
        {restaurant.cuisine} &middot; {restaurant.city} &middot; {restaurant.priceRange}
      </p>
      <p className="mt-3 text-body text-text-muted">{restaurant.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {restaurant.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-surface-border px-2.5 py-1 text-small text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
