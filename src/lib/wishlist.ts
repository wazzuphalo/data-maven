"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "dm-wishlist";
const WISHLIST_EVENT = "dm-wishlist-change";

function readWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeWishlist(slugs: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  // Same-tab listeners don't get the native "storage" event (that only
  // fires in *other* tabs), so broadcast our own to keep every component
  // reading this hook in sync on the current page.
  window.dispatchEvent(new CustomEvent(WISHLIST_EVENT));
}

/**
 * Device-local wishlist — no account required. This is a prototype: nothing
 * here syncs across devices or browsers. See ASSETS-NEEDED.md for what a
 * real account system would need to add before this could persist server-side.
 */
export function useWishlist() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(readWishlist());
    function onChange() {
      setSlugs(readWishlist());
    }
    window.addEventListener(WISHLIST_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const isSaved = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggle = useCallback((slug: string) => {
    const current = readWishlist();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    writeWishlist(next);
  }, []);

  const remove = useCallback((slug: string) => {
    writeWishlist(readWishlist().filter((s) => s !== slug));
  }, []);

  return { slugs, isSaved, toggle, remove };
}
