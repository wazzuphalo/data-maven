import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { BeforeAfterSlider } from "@/components/results/BeforeAfterSlider";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Case studies are pending real engagements — no fabricated results, ever. Here's what will go here as audits complete.",
  alternates: { canonical: "/results" },
};

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/results", label: "Results" },
];

export default function ResultsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <section className="border-b border-surface-border bg-surface-alt">
        <Container className="flex flex-col gap-4 py-20">
          <Breadcrumbs items={CRUMBS} />
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold">
            Results
          </h1>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            There&apos;s nothing fabricated on this page. No invented client
            names, no made-up numbers, no stock case studies dressed up as
            real ones. Case studies go up here as real engagements finish —
            until then, this page stays honest about being empty.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            What&apos;s coming
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            Each case study will show the specific audit finding, what
            changed, and what happened — with the measurement window and
            where the number came from.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <BeforeAfterSlider label="Restaurant — Google Business Profile & ordering fix" />
            <BeforeAfterSlider label="Dental practice — reputation cadence" />
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border bg-surface-alt py-20">
        <Container className="flex flex-col items-start gap-6">
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Be the first case study
          </h2>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            Start with the free audit — what it finds is specific to your
            business, not a generic result borrowed from someone else&apos;s.
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
