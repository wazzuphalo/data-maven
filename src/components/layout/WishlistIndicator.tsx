"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/wishlist";

export function WishlistIndicator() {
  const { slugs } = useWishlist();

  return (
    <Link
      href="/wishlist"
      aria-label={`Wishlist, ${slugs.length} saved`}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-surface-border text-text hover:border-accent transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 20.5s-7.5-4.6-9.8-9.1C.7 8 2 4.6 5.4 3.7c2-.5 4 .3 5.1 2 .3.4.9.4 1.2 0 1.1-1.7 3.1-2.5 5.1-2 3.4.9 4.7 4.3 3.2 7.7-2.3 4.5-9.8 9.1-9.8 9.1z" />
      </svg>
      {slugs.length > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
          {slugs.length}
        </span>
      )}
    </Link>
  );
}
