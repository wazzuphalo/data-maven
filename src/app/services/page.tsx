import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CommissionCalculator } from "@/components/tools/CommissionCalculator";
import { breadcrumbSchema, serviceListSchema } from "@/lib/schema";
import { SERVICES } from "../../../content/services";

export const metadata: Metadata = {
  title: "Services — Built From Audit Findings",
  description:
    "Data Maven doesn't sell a fixed service menu. Each service exists because a specific audit finding calls for it — see what that looks like lens by lens.",
  alternates: { canonical: "/services" },
};

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd data={serviceListSchema(SERVICES)} />
      <section className="border-b border-surface-border bg-surface-alt">
        <Container className="flex flex-col gap-4 py-20">
          <Breadcrumbs items={CRUMBS} />
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold">
            Services follow the findings — not the other way around
          </h1>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            There&apos;s no fixed package to choose from here. Every service
            below exists because a specific finding from the six-lens audit
            calls for it. A restaurant with a stale Google listing gets a
            different scope than a dental practice with an unanswered review
            streak.
          </p>
          <Link
            href="/contact"
            className="w-fit rounded-md bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
          >
            Get your free audit
          </Link>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            What each finding turns into
          </h2>
          <div className="mt-10 flex flex-col gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.lensId}
                className="rounded-lg border border-surface-border p-6 md:p-8"
              >
                <p className="text-small font-medium uppercase tracking-wide text-accent">
                  {service.triggeredWhen}
                </p>
                <h3 className="mt-2 text-h3 font-heading font-semibold">
                  {service.name}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {service.whatItIncludes.map((item) => (
                    <li key={item} className="flex gap-2 text-body text-text-muted">
                      <span aria-hidden="true" className="text-accent">
                        &#8226;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-small text-text-muted">
                  Typical timeframe: {service.typicalTimeframe}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border bg-surface-alt py-20">
        <Container>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Take delivery orders? See what commission is actually costing you
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            One example of what the audit can surface: for restaurants and
            other businesses running third-party delivery apps, commission
            fees are often the single largest line item nobody&apos;s put a
            number on. This applies specifically to businesses taking
            delivery-app orders — not every business.
          </p>
          <div className="mt-10 max-w-2xl">
            <CommissionCalculator />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="flex flex-col items-start gap-6">
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Not sure which of these applies to you?
          </h2>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            That&apos;s exactly what the audit is for.
          </p>
          <Link
            href="/contact"
            className="rounded-md bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
          >
            Get your free audit
          </Link>
        </Container>
      </section>
    </>
  );
}
