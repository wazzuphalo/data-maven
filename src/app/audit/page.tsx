import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SixLensExplorer } from "@/components/lenses/SixLensExplorer";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The Six-Lens Digital Presence Audit",
  description:
    "How Data Maven diagnoses a local business's digital presence across six lenses before recommending a single service — for Los Angeles County businesses.",
  alternates: { canonical: "/audit" },
};

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/audit", label: "The Audit" },
];

const PRINCIPLES = [
  {
    title: "Every finding is evidence-based, not opinion",
    detail:
      "Each of the roughly 30 checks across the six lenses has a binary answer — claimed or not, current or not, responded to or not — with the date it was checked. Nothing in the audit is a subjective impression.",
  },
  {
    title: "Diagnosis comes before prescription",
    detail:
      "The audit doesn't assume the problem is SEO, or social, or ads. It checks all six areas first, then names whichever two or three are actually costing the business customers.",
  },
  {
    title: "The scope of work follows the findings",
    detail:
      "A restaurant's bottleneck usually isn't a dental practice's bottleneck. Services only ever appear as the output of what a specific audit finds — see what that looks like on the Services page.",
  },
];

export default function AuditPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <section className="relative overflow-hidden border-b border-surface-border bg-surface-alt">
        <div className="hero-aura" aria-hidden="true" />
        <div className="absolute inset-0 dotted-grid opacity-70" aria-hidden="true" />
        <Container className="relative flex flex-col gap-4 py-20">
          <Breadcrumbs items={CRUMBS} />
          <Eyebrow>The methodology</Eyebrow>
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold">
            The six-lens digital presence audit
          </h1>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            Most local marketing pitches start with a service menu — SEO,
            social, ads — and ask you to pick one. That invites price
            comparison against whoever&apos;s cheapest. This starts differently:
            with a structured, repeatable diagnosis of what&apos;s actually
            happening across six parts of your digital presence, before any
            service gets recommended.
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
          <Eyebrow>Why it&apos;s different</Eyebrow>
          <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
            How it&apos;s different from an SEO audit or a marketing checklist
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="reveal card card-interactive p-6">
                <h3 className="text-body-lg font-heading font-semibold">
                  {principle.title}
                </h3>
                <p className="mt-2 text-body text-text-muted">
                  {principle.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-surface-border bg-surface-alt py-20 md:py-24">
        <Container>
          <Eyebrow>The framework</Eyebrow>
          <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
            The six lenses, in full
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            Select a lens to see exactly what gets checked, why it matters,
            and an example of the kind of finding it surfaces. Everything is
            expanded below if you&apos;d rather just read straight through.
          </p>
          <div className="reveal mt-10 card p-2 sm:p-6">
            <SixLensExplorer />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="flex flex-col items-start gap-6">
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Want a shorter version first?
          </h2>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            Run the self-reported version of this framework on the home page —
            8 to 10 yes/no questions, scored instantly. It won&apos;t replace the
            real audit, but it&apos;ll show you where to expect the biggest gaps.
          </p>
          <Link
            href="/#self-serve-audit"
            className="rounded-md border border-surface-border px-6 py-3 text-body-lg font-medium hover:border-accent hover:text-accent transition-colors"
          >
            Run the self-check
          </Link>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-surface-border bg-surface-alt py-20 md:py-24">
        <div className="hero-aura" aria-hidden="true" />
        <Container className="relative flex flex-col items-start gap-6">
          <Eyebrow>Get started</Eyebrow>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Ready for the real thing?
          </h2>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            Free for {siteConfig.serviceArea.name} businesses. Findings
            delivered on a call, not a generic PDF.
          </p>
          <Link
            href="/contact"
            className="btn-primary group/btn inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
          >
            Get your free audit
            <span className="btn-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </Container>
      </section>
    </>
  );
}
