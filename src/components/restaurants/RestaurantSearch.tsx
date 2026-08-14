"use client";

import { useMemo, useState } from "react";
import { CITIES, CUISINES, RESTAURANTS } from "../../../content/restaurants";
import { RestaurantCard } from "./RestaurantCard";

const PRICE_OPTIONS = ["$", "$$", "$$$"] as const;

export function RestaurantSearch() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESTAURANTS.filter((r) => {
      if (q && !r.name.toLowerCase().includes(q) && !r.cuisine.toLowerCase().includes(q)) {
        return false;
      }
      if (cuisine && r.cuisine !== cuisine) return false;
      if (city && r.city !== city) return false;
      if (price && r.priceRange !== price) return false;
      return true;
    });
  }, [query, cuisine, city, price]);

  const hasFilters = query || cuisine || city || price;

  return (
    <div className="flex flex-col gap-8">
      <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:flex-wrap sm:items-end sm:p-6">
        <div className="flex flex-1 min-w-[200px] flex-col gap-1.5">
          <label htmlFor="r-search" className="text-small font-medium">
            Search
          </label>
          <input
            id="r-search"
            type="text"
            placeholder="Name or cuisine…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="r-cuisine" className="text-small font-medium">
            Cuisine
          </label>
          <select
            id="r-cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
          >
            <option value="">All</option>
            {CUISINES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="r-city" className="text-small font-medium">
            City
          </label>
          <select
            id="r-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
          >
            <option value="">All</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="r-price" className="text-small font-medium">
            Price
          </label>
          <select
            id="r-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
          >
            <option value="">All</option>
            {PRICE_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCuisine("");
              setCity("");
              setPrice("");
            }}
            className="text-small text-text-muted underline hover:text-accent"
          >
            Clear filters
          </button>
        )}
      </div>

      <p role="status" className="text-small text-text-muted">
        {results.length} placeholder listing{results.length === 1 ? "" : "s"}
      </p>

      {results.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <RestaurantCard key={r.slug} restaurant={r} />
          ))}
        </div>
      ) : (
        <p className="text-body text-text-muted">
          No listings match those filters. Try clearing one.
        </p>
      )}
    </div>
  );
}
