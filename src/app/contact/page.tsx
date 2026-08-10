import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactForm } from "@/components/contact/ContactForm";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact — Book a Free Audit",
  description: `Book a free six-lens digital presence audit for your ${siteConfig.serviceArea.short} business, or send a message directly.`,
  alternates: { canonical: "/contact" },
};

const bookingUrlIsReal = siteConfig.bookingUrl.startsWith("http");

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <section className="relative overflow-hidden border-b border-surface-border bg-surface-alt">
        <div className="hero-aura" aria-hidden="true" />
        <div className="absolute inset-0 dotted-grid opacity-70" aria-hidden="true" />
        <Container className="relative flex flex-col gap-4 py-16">
          <Breadcrumbs items={CRUMBS} />
          <Eyebrow>Contact</Eyebrow>
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold">
            Get your free audit
          </h1>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            Book a time directly, or send a message and we&apos;ll follow up
            within one business day.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="card p-6 md:p-8">
            <h2 className="text-h2 font-heading font-semibold">
              Book a time
            </h2>
            {bookingUrlIsReal ? (
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-md bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
              >
                Open booking calendar
              </a>
            ) : (
              <div className="mt-4 flex flex-col gap-3 rounded-lg border-2 border-dashed border-surface-border bg-surface-alt p-6">
                <span className="inline-flex w-fit items-center rounded-full bg-ink-100 px-3 py-1 text-small font-medium uppercase tracking-wide text-text-muted">
                  Placeholder — booking link not yet connected
                </span>
                <p className="text-body text-text-muted">
                  A Calendly or Cal.com link goes here. Until then, use the
                  form to send a message and we&apos;ll follow up directly.
                </p>
              </div>
            )}

            <h2 className="mt-10 text-h2 font-heading font-semibold">
              Or reach us directly
            </h2>
            <address className="mt-4 not-italic text-body text-text-muted leading-relaxed">
              {siteConfig.studioName}
              <br />
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state}{" "}
              {siteConfig.address.zip}
              <br />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-accent"
              >
                {siteConfig.contact.email}
              </a>
              <br />
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="hover:text-accent"
              >
                {siteConfig.contact.phone}
              </a>
            </address>
            <p className="mt-4 text-small text-text-muted">
              Serving {siteConfig.serviceArea.name}.
            </p>
          </div>

          <div className="card p-6 md:p-8">
            <h2 className="text-h2 font-heading font-semibold">
              Send a message
            </h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
