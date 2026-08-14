"use client";

import { useWishlist } from "@/lib/wishlist";

export function WishlistButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-surface text-text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        className={saved ? "text-accent" : ""}
        aria-hidden="true"
      >
        <path d="M12 20.5s-7.5-4.6-9.8-9.1C.7 8 2 4.6 5.4 3.7c2-.5 4 .3 5.1 2 .3.4.9.4 1.2 0 1.1-1.7 3.1-2.5 5.1-2 3.4.9 4.7 4.3 3.2 7.7-2.3 4.5-9.8 9.1-9.8 9.1z" />
      </svg>
    </button>
  );
}
