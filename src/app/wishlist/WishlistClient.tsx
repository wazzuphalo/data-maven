"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/wishlist";
import { RESTAURANTS } from "../../../content/restaurants";

export function WishlistClient() {
  const { slugs, remove } = useWishlist();
  const saved = RESTAURANTS.filter((r) => slugs.includes(r.slug));

  if (saved.length === 0) {
    return (
      <div className="card flex flex-col items-start gap-4 p-8">
        <p className="text-body-lg text-text-muted">
          Nothing saved yet. Browse the directory and tap the heart on any
          listing to add it here.
        </p>
        <Link
          href="/restaurants"
          className="btn-primary group/btn inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
        >
          Browse restaurants
          <span className="btn-arrow" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {saved.map((r) => (
        <div key={r.slug} className="card flex flex-col p-6">
          <span className="inline-flex w-fit items-center rounded-full bg-ink-100 px-2.5 py-0.5 text-small font-medium uppercase tracking-wide text-text-muted">
            Placeholder
          </span>
          <Link href={`/restaurants/${r.slug}`} className="mt-3">
            <h3 className="text-body-lg font-heading font-semibold hover:text-accent transition-colors">
              {r.name}
            </h3>
          </Link>
          <p className="mt-1 text-small text-text-muted">
            {r.cuisine} &middot; {r.city} &middot; {r.priceRange}
          </p>
          <button
            type="button"
            onClick={() => remove(r.slug)}
            className="mt-4 w-fit text-small text-text-muted underline hover:text-accent"
          >
            Remove from wishlist
          </button>
        </div>
      ))}
    </div>
  );
}
