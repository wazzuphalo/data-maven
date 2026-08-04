import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PlaceholderCard } from "@/components/ui/PlaceholderCard";
import { SixLensExplorer } from "@/components/lenses/SixLensExplorer";
import { MiniAudit } from "@/components/mini-audit/MiniAudit";
import { PROBLEM_EXAMPLES } from "../../content/problem-examples";
import { ENGAGEMENT_STEPS } from "../../content/engagement-steps";
import { FAQ_ITEMS } from "../../content/faq";
import { GOOD_FIT, NOT_A_FIT } from "../../content/audience-fit";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="border-b border-surface-border bg-surface-alt">
        <Container className="flex flex-col gap-6 py-20 md:py-28">
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold text-balance">
            We find the specific, fixable gaps costing your business
            customers — then fix them in order of impact.
          </h1>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            A six-lens digital presence audit for {siteConfig.serviceArea.name}{" "}
            businesses: Google Business Profile, reviews, website, business
            health, marketing operations, and competitive context. Every
            finding is dated and checked against observable criteria — not
            opinion.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-accent px-6 py-3 text-center text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
            >
              Get your free audit
            </Link>
            <Link
              href="/audit"
              className="rounded-md border border-surface-border px-6 py-3 text-center text-body-lg font-medium hover:border-accent hover:text-accent transition-colors"
            >
              See how the audit works
            </Link>
          </div>
        </Container>
      </section>

      {/* 2. The problem, stated plainly */}
      <section className="py-20">
        <Container>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
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
              <div
                key={example.vertical}
                className="rounded-lg border border-surface-border p-6"
              >
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
      <section id="the-audit" className="border-t border-surface-border bg-surface-alt py-20">
        <Container>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            The six-lens audit
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            Every engagement starts with the same structured diagnosis. Select
            a lens to see exactly what it checks — everything is expanded
            below if you&apos;d rather just read straight through.
          </p>

          <div className="mt-10">
            <SixLensExplorer />
          </div>

          <Link
            href="/audit"
            className="mt-8 inline-block text-body-lg font-medium text-accent hover:underline"
          >
            Read the full methodology &rarr;
          </Link>
        </Container>
      </section>

      {/* 4. How an engagement works */}
      <section className="py-20">
        <Container>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
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
                className="rounded-lg border border-surface-border p-6"
              >
                <span className="text-small font-medium uppercase tracking-wide text-text-muted">
                  {step.timeframe}
                </span>
                <p className="mt-1 text-body-lg font-heading font-semibold">
                  {step.step}. {step.name}
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
      <section id="self-serve-audit" className="border-t border-surface-border bg-surface-alt py-20 scroll-mt-20">
        <Container className="flex flex-col gap-8">
          <div>
            <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
              Not ready to book a call? Run a quick self-check first.
            </h2>
            <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
              A shortened, self-reported version of the same six-lens
              framework — 9 yes/no questions, scored instantly, no call
              required.
            </p>
          </div>
          <div className="max-w-2xl">
            <MiniAudit />
          </div>
        </Container>
      </section>

      {/* 6. Proof (placeholder) */}
      <section className="py-20">
        <Container>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Results
          </h2>
          <p className="mt-4 max-w-(--container-content) text-body-lg text-text-muted">
            Case studies go here once real engagements are complete. Nothing
            below is a real client, result, or metric.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PlaceholderCard
              label="Restaurant — GBP & ordering fix"
              detail="Case study pending: before/after review velocity and ordering-link conversion once a real engagement completes."
            />
            <PlaceholderCard
              label="Dental practice — reputation cadence"
              detail="Case study pending: response-rate and new-review trend once a real engagement completes."
            />
            <PlaceholderCard
              label="Home services — lead recovery"
              detail="Case study pending: tracked form-conversion recovery once a real engagement completes."
            />
          </div>

          <Link
            href="/results"
            className="mt-8 inline-block text-body-lg font-medium text-accent hover:underline"
          >
            See the results page &rarr;
          </Link>
        </Container>
      </section>

      {/* 7. Who this is for / who it isn't */}
      <section id="who-this-is-for" className="border-t border-surface-border bg-surface-alt py-20 scroll-mt-20">
        <Container>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Who this is for — and who it isn&apos;t
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-h3 font-heading font-semibold text-text">
                This is a fit if
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {GOOD_FIT.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-text-muted">
                    <span aria-hidden="true" className="mt-1 text-accent">
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-h3 font-heading font-semibold text-text">
                It&apos;s not a fit if
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {NOT_A_FIT.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-text-muted">
                    <span aria-hidden="true" className="mt-1 text-text-muted">
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
      <section className="py-20">
        <Container>
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Frequently asked questions
          </h2>
          <div className="mt-10 max-w-(--container-content)">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </Container>
      </section>

      {/* 9. Final CTA */}
      <section className="border-t border-surface-border bg-surface-alt py-20">
        <Container className="flex flex-col items-start gap-6">
          <h2 className="text-h1 font-heading font-semibold max-w-(--container-content)">
            Find out what&apos;s actually costing you customers.
          </h2>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            Free six-lens audit, findings on a call, no obligation to
            continue.
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
