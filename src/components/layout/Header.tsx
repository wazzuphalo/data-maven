import Link from "next/link";
import { NAV_LINKS, siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { WishlistIndicator } from "./WishlistIndicator";

export function Header() {
  return (
    <header className="relative border-b border-surface-border bg-surface">
      <div className="mx-auto flex max-w-(--container-page) items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-h3 font-heading font-semibold tracking-tight"
        >
          {siteConfig.studioName}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body text-text-muted hover:text-text transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <WishlistIndicator />
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-md bg-accent px-4 py-2 text-body font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors lg:inline-block"
          >
            Get your free audit
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
