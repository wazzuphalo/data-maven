import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PlaceholderCard } from "@/components/ui/PlaceholderCard";
import { SixLensExplorer } from "@/components/lenses/SixLensExplorer";
import { MiniAudit } from "@/components/mini-audit/MiniAudit";
import { SixLensScanner } from "@/components/hero/SixLensScanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { professionalServiceSchema, faqPageSchema } from "@/lib/schema";
import { PROBLEM_EXAMPLES } from "../../content/problem-examples";
import { ENGAGEMENT_STEPS } from "../../content/engagement-steps";
import { FAQ_ITEMS } from "../../content/faq";
import { GOOD_FIT, NOT_A_FIT } from "../../content/audience-fit";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HERO_FACTS = [
  { value: "6", label: "Diagnostic lenses" },
  { value: "~30", label: "Observable checks" },
  { value: "0", label: "Opinions or vanity metrics" },
  { value: "LA County", label: "Where we work" },
];

export default function Home() {
  return (
    <>
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />

      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-surface-border bg-surface-alt">
        <div className="hero-aura" aria-hidden="true" />
        <div className="absolute inset-0 dotted-grid opacity-70" aria-hidden="true" />
        <Container className="relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <Eyebrow>The six-lens audit</Eyebrow>
            <h1 className="text-hero font-heading font-semibold text-balance">
              We find the specific, fixable gaps costing your business
              customers — then fix them in order of impact.
            </h1>
            <p className="max-w-[60ch] text-body-lg text-text-muted">
              A six-lens digital presence audit for{" "}
              {siteConfig.serviceArea.name} businesses: Google Business
              Profile, reviews, website, business health, marketing
              operations, and competitive context. Every finding is dated and
              checked against observable criteria — not opinion.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn-primary group/btn inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
              >
                Get your free audit
                <span className="btn-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center justify-center rounded-lg border border-surface-border px-6 py-3 text-body-lg font-medium hover:border-accent hover:text-accent transition-colors"
              >
                See how the audit works
              </Link>
            </div>
          </div>
          <SixLensScanner />
        </Container>

        {/* At-a-glance facts — all true framework facts, nothing fabricated */}
        <Container className="relative border-t border-surface-border">
          <dl className="grid grid-cols-2 gap-px md:grid-cols-4">
            {HERO_FACTS.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 py-6 pr-6">
                <dt className="sr-only">{fact.label}</dt>
                <dd className="text-h2 font-heading font-semibold text-accent">
                  {fact.value}
                </dd>
                <p className="text-small text-text-muted">{fact.label}</p>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2. The problem, stated plainly */}
      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
            Most local businesses are losing customers to gaps they can&apos;t
            see.
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            Not because they&apos;re doing everything wrong — usually it&apos;s one
            or two specific, fixable things. The problem is never the same
            business to business.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROBLEM_EXAMPLES.map((example) => (
              <div key={example.vertical} className="reveal card card-interactive p-6">
                <p className="text-small font-medium uppercase tracking-wide text-accent">
                  {example.vertical}
                </p>
                <p className="mt-2 text-body-lg font-heading font-semibold">
                  {example.headline}
                </p>
                <p className="mt-2 text-body text-text-muted">
                  {example.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. The six lenses — centerpiece */}
      <section
        id="the-audit"
        className="border-y border-surface-border bg-surface-alt py-20 md:py-24"
      >
        <Container>
          <Eyebrow>The framework</Eyebrow>
          <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
            The six-lens audit
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            Every engagement starts with the same structured diagnosis. Select
            a lens to see exactly what it checks — everything is expanded
            below if you&apos;d rather just read straight through.
          </p>

          <div className="reveal mt-10 card p-2 sm:p-6">
            <SixLensExplorer />
          </div>

          <Link
            href="/audit"
            className="btn-primary group/btn mt-8 inline-flex items-center gap-2 text-body-lg font-medium text-accent hover:underline"
          >
            Read the full methodology
            <span className="btn-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </Container>
      </section>

      {/* 4. How an engagement works */}
      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
            How an engagement works
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            Four steps, in order. No step is skipped, and foundations come
            before growth spend — always.
          </p>

          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {ENGAGEMENT_STEPS.map((step) => (
              <li
                key={step.step}
                className="reveal card card-interactive relative overflow-hidden p-6"
              >
                <span className="absolute right-4 top-3 font-heading text-[3rem] font-semibold leading-none text-[color-mix(in_srgb,var(--color-accent)_14%,transparent)]">
                  {step.step}
                </span>
                <span className="text-small font-medium uppercase tracking-wide text-text-muted">
                  {step.timeframe}
                </span>
                <p className="mt-1 text-body-lg font-heading font-semibold">
                  {step.name}
                </p>
                <p className="mt-2 text-body text-text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 5. Self-serve audit tool — primary lead capture */}
      <section
        id="self-serve-audit"
        className="scroll-mt-20 border-y border-surface-border bg-surface-alt py-20 md:py-24"
      >
        <Container className="flex flex-col gap-8">
          <div>
            <Eyebrow>Self-check</Eyebrow>
            <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
              Not ready to book a call? Run a quick self-check first.
            </h2>
            <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
              A shortened, self-reported version of the same six-lens
              framework — 9 yes/no questions, scored instantly, no call
              required.
            </p>
          </div>
          <div className="reveal max-w-2xl">
            <MiniAudit />
          </div>
        </Container>
      </section>

      {/* 6. Proof (placeholder) */}
      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>Proof</Eyebrow>
          <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
            Results
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            Case studies go here once real engagements are complete. Nothing
            below is a real client, result, or metric.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="reveal">
              <PlaceholderCard
                label="Restaurant — GBP & ordering fix"
                detail="Case study pending: before/after review velocity and ordering-link conversion once a real engagement completes."
              />
            </div>
            <div className="reveal">
              <PlaceholderCard
                label="Dental practice — reputation cadence"
                detail="Case study pending: response-rate and new-review trend once a real engagement completes."
              />
            </div>
            <div className="reveal">
              <PlaceholderCard
                label="Home services — lead recovery"
                detail="Case study pending: tracked form-conversion recovery once a real engagement completes."
              />
            </div>
          </div>

          <Link
            href="/results"
            className="btn-primary group/btn mt-8 inline-flex items-center gap-2 text-body-lg font-medium text-accent hover:underline"
          >
            See the results page
            <span className="btn-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </Container>
      </section>

      {/* 7. Who this is for / who it isn't */}
      <section
        id="who-this-is-for"
        className="scroll-mt-20 border-y border-surface-border bg-surface-alt py-20 md:py-24"
      >
        <Container>
          <Eyebrow>Fit</Eyebrow>
          <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
            Who this is for — and who it isn&apos;t
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="reveal card p-6 md:p-8">
              <h3 className="text-h3 font-heading font-semibold text-text">
                This is a fit if
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {GOOD_FIT.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-tint)] text-small text-accent"
                    >
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal card p-6 md:p-8">
              <h3 className="text-h3 font-heading font-semibold text-text">
                It&apos;s not a fit if
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {NOT_A_FIT.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-100 text-small text-text-muted"
                    >
                      &#215;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 text-h1 font-heading font-semibold max-w-(--container-content)">
            Frequently asked questions
          </h2>
          <div className="reveal mt-10 max-w-(--container-content)">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </Container>
      </section>

      {/* 9. Final CTA */}
      <section className="relative overflow-hidden border-t border-surface-border bg-surface-alt py-20 md:py-24">
        <div className="hero-aura" aria-hidden="true" />
        <Container className="relative flex flex-col items-start gap-6">
          <Eyebrow>Get started</Eyebrow>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Find out what&apos;s actually costing you customers.
          </h2>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            Free six-lens audit, findings on a call, no obligation to
            continue.
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
