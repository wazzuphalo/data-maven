import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllAreasSummary } from "@/lib/areas";
import { breadcrumbSchema, professionalServiceSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Service Area — Los Angeles County",
  description:
    "Data Maven runs six-lens digital presence audits for independent and small-chain businesses across Los Angeles County.",
  alternates: { canonical: "/areas" },
};

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/areas", label: "Service Area" },
];

export default function AreasPage() {
  const published = getAllAreasSummary().filter((a) => a.draft !== true);

  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd data={professionalServiceSchema()} />
      <section className="relative overflow-hidden border-b border-surface-border bg-surface-alt">
        <div className="hero-aura" aria-hidden="true" />
        <div className="absolute inset-0 dotted-grid opacity-70" aria-hidden="true" />
        <Container className="relative flex flex-col gap-4 py-20">
          <Breadcrumbs items={CRUMBS} />
          <Eyebrow>Service area</Eyebrow>
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold">
            Serving businesses across {siteConfig.serviceArea.name}
          </h1>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            Los Angeles County isn&apos;t one market — it&apos;s dozens of
            distinct commercial corridors, each with its own competitive
            dynamics, business mix, and customer expectations. A restaurant
            competing against Old Pasadena&apos;s tourist foot traffic has a
            different problem than one three miles from Montebello Town
            Center. The six-lens audit adjusts to that; a generic SEO
            checklist doesn&apos;t.
          </p>
          <Link
            href="/contact"
            className="btn-primary group/btn inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
          >
            Get your free audit
            <span className="btn-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>Detailed markets</Eyebrow>
          <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
            Markets we know in detail
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            These are the corridors we&apos;ve done real local research on —
            named commercial districts, the actual business mix, and the
            competitive dynamics specific to that market. More get added as
            the research gets done; we&apos;d rather publish three real
            pages than a dozen generic ones.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {published.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="reveal card card-interactive group/card flex flex-col p-6"
              >
                <h3 className="text-h3 font-heading font-semibold group-hover/card:text-accent transition-colors">
                  {area.city}
                </h3>
                <p className="mt-2 text-small text-text-muted">
                  {area.corridor}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-small font-medium text-accent">
                  View market
                  <span className="btn-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border bg-surface-alt py-20 md:py-24">
        <Container>
          <Eyebrow>Everywhere else</Eyebrow>
          <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
            Also serving
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            The audit works the same way anywhere in {siteConfig.serviceArea.name}
            . We&apos;re building out detailed market pages for Burbank,
            Whittier, Alhambra, Long Beach, and Santa Monica next — until
            those are researched and published, get in touch directly and
            we&apos;ll talk through your specific market on the audit call.
          </p>
        </Container>
      </section>
    </>
  );
}
