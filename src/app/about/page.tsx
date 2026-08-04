import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Data Maven starts with a six-lens audit instead of a service menu, and who's behind it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-surface-border bg-surface-alt">
        <Container className="flex flex-col gap-6 py-20">
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold">
            {siteConfig.operator.name}
          </h1>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            {siteConfig.operator.title}, {siteConfig.studioName}
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="flex flex-col gap-6 max-w-(--container-content)">
          <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-dashed border-surface-border bg-surface-alt text-small text-text-muted">
            Headshot placeholder — 800&times;800px
          </div>

          <h2 className="text-h2 font-heading font-semibold">
            Why a six-lens audit, and not a service menu
          </h2>
          <p className="text-body-lg text-text-muted">
            Most local marketing pitches start by asking which service you
            want — SEO, social, ads — before anyone has actually looked at
            what&apos;s happening with the business. That backwards order is
            how businesses end up paying for services that were never the
            actual bottleneck.
          </p>
          <p className="text-body-lg text-text-muted">
            Data Maven exists to do the diagnosis first. The six-lens
            framework came out of a background in lifecycle, growth, and
            performance marketing — the parts of the job that involve
            reading data closely before deciding what to build, not the
            parts that involve pitching a package. Every business gets the
            same structured audit; almost none of them get the same
            recommendation out of it, because the findings are never the
            same twice.
          </p>
          <p className="text-body-lg text-text-muted">
            Data Maven works with independent and small-chain businesses
            across {siteConfig.serviceArea.name} — see{" "}
            <Link href="/audit" className="text-accent hover:underline">
              how the audit works
            </Link>{" "}
            or{" "}
            <Link href="/#who-this-is-for" className="text-accent hover:underline">
              who it&apos;s a fit for
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="border-t border-surface-border bg-surface-alt py-20">
        <Container className="flex flex-col items-start gap-6">
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Get the free audit
          </h2>
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
