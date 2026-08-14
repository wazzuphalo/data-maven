// Placeholder restaurant directory data for the /restaurants prototype.
// Every name is deliberately marked "(Placeholder)" — none of these are real
// businesses. Swap this file for a real data source (see ASSETS-NEEDED.md)
// before /restaurants, /restaurants/[slug], or /wishlist go live to search
// engines (they're noindexed in robots.ts until then).

export type Restaurant = {
  slug: string;
  name: string;
  cuisine: string;
  city: string;
  priceRange: "$" | "$$" | "$$$";
  tags: string[];
  description: string;
};

export const RESTAURANTS: Restaurant[] = [
  {
    slug: "corner-table-demo",
    name: "Corner Table (Placeholder)",
    cuisine: "Italian",
    city: "Pasadena",
    priceRange: "$$",
    tags: ["Outdoor seating", "Date night"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "taco-spot-demo",
    name: "Taco Spot (Placeholder)",
    cuisine: "Mexican",
    city: "Montebello",
    priceRange: "$",
    tags: ["Family-friendly", "Delivery"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "sushi-bar-demo",
    name: "Sushi Bar (Placeholder)",
    cuisine: "Japanese",
    city: "Glendale",
    priceRange: "$$$",
    tags: ["Date night", "Reservations recommended"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "burger-counter-demo",
    name: "Burger Counter (Placeholder)",
    cuisine: "American",
    city: "Burbank",
    priceRange: "$",
    tags: ["Quick bite", "Family-friendly"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "noodle-house-demo",
    name: "Noodle House (Placeholder)",
    cuisine: "Vietnamese",
    city: "Alhambra",
    priceRange: "$",
    tags: ["Quick bite", "Vegetarian options"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "pizza-place-demo",
    name: "Pizza Place (Placeholder)",
    cuisine: "Pizza",
    city: "Whittier",
    priceRange: "$$",
    tags: ["Family-friendly", "Delivery"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "seafood-shack-demo",
    name: "Seafood Shack (Placeholder)",
    cuisine: "Seafood",
    city: "Long Beach",
    priceRange: "$$$",
    tags: ["Waterfront", "Date night"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "cafe-corner-demo",
    name: "Cafe Corner (Placeholder)",
    cuisine: "Cafe",
    city: "Santa Monica",
    priceRange: "$$",
    tags: ["Brunch", "Outdoor seating"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "bbq-pit-demo",
    name: "BBQ Pit (Placeholder)",
    cuisine: "BBQ",
    city: "Pasadena",
    priceRange: "$$",
    tags: ["Family-friendly", "Takeout"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "vegan-kitchen-demo",
    name: "Vegan Kitchen (Placeholder)",
    cuisine: "Vegan",
    city: "Glendale",
    priceRange: "$$",
    tags: ["Vegetarian options", "Healthy"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "bakery-and-bread-demo",
    name: "Bakery & Bread (Placeholder)",
    cuisine: "Bakery",
    city: "Montebello",
    priceRange: "$",
    tags: ["Quick bite", "Breakfast"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
  {
    slug: "thai-garden-demo",
    name: "Thai Garden (Placeholder)",
    cuisine: "Thai",
    city: "Santa Monica",
    priceRange: "$$",
    tags: ["Vegetarian options", "Delivery"],
    description:
      "Example listing for demo purposes — not a real restaurant. This is where a real description, hours, and photos would go.",
  },
];

export const CUISINES = Array.from(new Set(RESTAURANTS.map((r) => r.cuisine))).sort();
export const CITIES = Array.from(new Set(RESTAURANTS.map((r) => r.city))).sort();
