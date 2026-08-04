import Link from "next/link";
import { FOOTER_LINKS, NAV_LINKS, siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border bg-surface-alt">
      <div className="mx-auto max-w-(--container-page) px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-h3 font-heading font-semibold">{siteConfig.studioName}</p>
            <p className="mt-2 max-w-[45ch] text-body text-text-muted">
              {siteConfig.tagline}. Serving {siteConfig.serviceArea.name}.
            </p>

            <address className="mt-4 not-italic text-small text-text-muted leading-relaxed">
              {siteConfig.studioName}
              <br />
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state}{" "}
              {siteConfig.address.zip}
              <br />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent">
                {siteConfig.contact.email}
              </a>
              <br />
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-accent">
                {siteConfig.contact.phone}
              </a>
            </address>
          </div>

          <nav aria-label="Footer">
            <p className="text-small font-medium text-text-muted uppercase tracking-wide">
              Site
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-body hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-small font-medium text-text-muted uppercase tracking-wide">
              Legal
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-surface-border pt-6 text-small text-text-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {siteConfig.studioName}. All rights reserved.
          </p>
          <p>
            Don&apos;t want to hear from us? Email{" "}
            <a href={`mailto:${siteConfig.contact.email}?subject=Unsubscribe`} className="underline hover:text-accent">
              {siteConfig.contact.email}
            </a>{" "}
            with &ldquo;unsubscribe&rdquo; and we&apos;ll remove you.
          </p>
        </div>
      </div>
    </footer>
  );
}
