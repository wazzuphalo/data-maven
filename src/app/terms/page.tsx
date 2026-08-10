import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of ${siteConfig.studioName}'s website and services.`,
  alternates: { canonical: "/terms" },
};

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/terms", label: "Terms" },
];

const lastUpdated = "August 2026";

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <section className="relative overflow-hidden border-b border-surface-border bg-surface-alt">
        <div className="hero-aura" aria-hidden="true" />
        <Container className="relative flex flex-col gap-4 py-16">
          <Breadcrumbs items={CRUMBS} />
          <Eyebrow>Legal</Eyebrow>
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold">
            Terms of Service
          </h1>
          <p className="text-small text-text-muted">
            Last updated: {lastUpdated}
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="flex flex-col gap-6 max-w-(--container-content) text-body text-text-muted">
          <p>
            These terms cover general use of this website and have not yet
            been reviewed by a lawyer. Treat them as a good-faith
            description of how {siteConfig.studioName} operates, not a
            substitute for legal advice. Using this site means you agree to
            these terms.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            What this site is
          </h2>
          <p>
            This website describes {siteConfig.studioName}&apos;s marketing
            audit and services for businesses in{" "}
            {siteConfig.serviceArea.name}, and provides ways to request a
            free audit or run a self-serve self-assessment.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            The self-serve mini audit
          </h2>
          <p>
            The self-serve mini audit tool scores your own answers to a
            short set of questions. It&apos;s a self-report, not an
            independent verification of your business&apos;s digital
            presence — treat the result as a starting point, not a formal
            audit finding.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            No guaranteed results
          </h2>
          <p>
            Marketing outcomes depend on factors specific to each business
            and market. Nothing on this site is a guarantee of any
            specific ranking, follower count, revenue, or other result.
            Any timeframes described (such as the 90-day foundations phase)
            are typical, not guaranteed.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Intellectual property
          </h2>
          <p>
            The content on this site — including the six-lens audit
            framework and its written descriptions — belongs to{" "}
            {siteConfig.studioName}. You&apos;re welcome to reference or
            link to it; please don&apos;t reproduce it wholesale as your
            own.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Acceptable use
          </h2>
          <p>
            Don&apos;t use the forms on this site to submit false
            information, attempt to compromise the site, or send spam.
            Submissions that appear automated or abusive may be discarded
            without response.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Limitation of liability
          </h2>
          <p>
            This site and its content are provided as-is, without
            warranties of any kind. {siteConfig.studioName} isn&apos;t
            liable for decisions made based on information found here,
            including the self-serve mini audit results.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Governing law
          </h2>
          <p>These terms are governed by the laws of the State of California.</p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Changes to these terms
          </h2>
          <p>
            If these terms change, the &ldquo;last updated&rdquo; date at
            the top of this page will change with it.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Contact
          </h2>
          <p>
            {siteConfig.studioName}
            <br />
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.city}, {siteConfig.address.state}{" "}
            {siteConfig.address.zip}
            <br />
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-accent hover:underline"
            >
              {siteConfig.contact.email}
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
