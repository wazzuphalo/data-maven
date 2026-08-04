import Link from "next/link";
import { NAV_LINKS, siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="relative border-b border-surface-border bg-surface">
      <div className="mx-auto flex max-w-(--container-page) items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-h3 font-heading font-semibold tracking-tight">
          {siteConfig.studioName}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
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
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-md bg-accent px-4 py-2 text-body font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors md:inline-block"
          >
            Get your free audit
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
