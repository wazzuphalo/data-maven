"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  INDUSTRY_OPTIONS,
  MINI_AUDIT_QUESTIONS,
} from "../../../content/mini-audit-questions";
import { siteConfig } from "@/lib/site-config";

type Step = "info" | "questions" | "results";
type Answer = "yes" | "no";

type LensScore = {
  lensId: string;
  lensName: string;
  yes: number;
  total: number;
  pct: number;
};

function computeLensScores(answers: Record<string, Answer>): LensScore[] {
  const byLens = new Map<string, { lensName: string; yes: number; total: number }>();
  for (const q of MINI_AUDIT_QUESTIONS) {
    const entry = byLens.get(q.lensId) ?? {
      lensName: q.lensName,
      yes: 0,
      total: 0,
    };
    entry.total += 1;
    if (answers[q.id] === "yes") entry.yes += 1;
    byLens.set(q.lensId, entry);
  }
  return Array.from(byLens.entries()).map(([lensId, v]) => ({
    lensId,
    lensName: v.lensName,
    yes: v.yes,
    total: v.total,
    pct: Math.round((v.yes / v.total) * 100),
  }));
}

export function MiniAudit() {
  const [step, setStep] = useState<Step>("info");
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");

  const allAnswered = MINI_AUDIT_QUESTIONS.every((q) => answers[q.id]);

  const lensScores = useMemo(() => computeLensScores(answers), [answers]);
  const overallScore = useMemo(() => {
    const yes = Object.values(answers).filter((a) => a === "yes").length;
    return Math.round((yes / MINI_AUDIT_QUESTIONS.length) * 100);
  }, [answers]);
  const weakestLenses = useMemo(
    () =>
      [...lensScores]
        .filter((l) => l.pct < 100)
        .sort((a, b) => a.pct - b.pct)
        .slice(0, 3),
    [lensScores]
  );

  function handleInfoSubmit(e: FormEvent) {
    e.preventDefault();
    if (!businessName.trim() || !city.trim() || !industry) return;
    setStep("questions");
  }

  function handleQuestionsSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allAnswered) return;
    setStep("results");
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitState("submitting");
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "mini-audit",
          email,
          businessName,
          city,
          industry,
          overallScore,
          weakestLenses: weakestLenses.map((l) => l.lensName),
          company,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSubmitState("error");
        setSubmitError(
          data.error || "Something went wrong submitting that — try again."
        );
        return;
      }
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setSubmitError(
        "Couldn't reach the server. Check your connection and try again."
      );
    }
  }

  return (
    <div className="rounded-lg border border-surface-border bg-surface p-6 md:p-8">
      <noscript>
        <p className="text-body text-text-muted">
          This tool scores your answers instantly in the browser, so it needs
          JavaScript enabled. In the meantime, email{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="underline hover:text-accent"
          >
            {siteConfig.contact.email}
          </a>{" "}
          or{" "}
          <Link href="/contact" className="underline hover:text-accent">
            book the full audit directly
          </Link>
          .
        </p>
      </noscript>

      {step === "info" && (
        <form onSubmit={handleInfoSubmit} className="flex flex-col gap-5">
          <div>
            <p className="text-small font-medium uppercase tracking-wide text-text-muted">
              Step 1 of 3
            </p>
            <h3 className="mt-1 text-h3 font-heading font-semibold">
              Tell us about your business
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="ma-business" className="text-body font-medium">
              Business name
            </label>
            <input
              id="ma-business"
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="ma-city" className="text-body font-medium">
              City
            </label>
            <input
              id="ma-city"
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="ma-industry" className="text-body font-medium">
              Industry
            </label>
            <select
              id="ma-industry"
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
            >
              <option value="" disabled>
                Select one
              </option>
              {INDUSTRY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 w-fit rounded-md bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
          >
            Start the self-check
          </button>
        </form>
      )}

      {step === "questions" && (
        <form onSubmit={handleQuestionsSubmit} className="flex flex-col gap-6">
          <div>
            <p className="text-small font-medium uppercase tracking-wide text-text-muted">
              Step 2 of 3
            </p>
            <h3 className="mt-1 text-h3 font-heading font-semibold">
              Answer honestly — this only helps if it's accurate
            </h3>
          </div>

          <div className="flex flex-col divide-y divide-surface-border">
            {MINI_AUDIT_QUESTIONS.map((q, i) => (
              <fieldset key={q.id} className="flex flex-col gap-3 py-4">
                <legend className="text-body text-text">
                  <span className="text-text-muted">{i + 1}. </span>
                  {q.text}
                </legend>
                <div className="flex gap-3">
                  {(["yes", "no"] as const).map((val) => (
                    <label
                      key={val}
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-surface-border px-4 py-2 text-body has-[:checked]:border-accent has-[:checked]:text-accent"
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={val}
                        required
                        checked={answers[q.id] === val}
                        onChange={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: val }))
                        }
                        className="accent-(--color-accent)"
                      />
                      {val === "yes" ? "Yes" : "No"}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep("info")}
              className="rounded-md border border-surface-border px-6 py-3 text-body-lg font-medium hover:border-accent hover:text-accent transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!allAnswered}
              className="rounded-md bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              See my score
            </button>
          </div>
        </form>
      )}

      {step === "results" && (
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-small font-medium uppercase tracking-wide text-text-muted">
              Step 3 of 3
            </p>
            <h3 className="mt-1 text-h3 font-heading font-semibold">
              Your self-check score: {overallScore}%
            </h3>
            <p className="mt-2 text-body text-text-muted">
              This is based on your own answers, not independent
              verification — think of it as a starting point, not a
              replacement for the real audit.
            </p>
          </div>

          <div className="flex flex-col gap-3" aria-live="polite">
            {lensScores.map((lens) => (
              <div key={lens.lensId}>
                <div className="flex items-center justify-between text-small text-text-muted">
                  <span>{lens.lensName}</span>
                  <span>
                    {lens.yes}/{lens.total}
                  </span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-300 motion-reduce:transition-none"
                    style={{ width: `${lens.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {weakestLenses.length > 0 && (
            <div className="rounded-md border border-surface-border bg-surface-alt p-4">
              <p className="text-body font-medium">
                Weakest areas based on your answers:
              </p>
              <ul className="mt-2 flex flex-col gap-1 text-body text-text-muted">
                {weakestLenses.map((l) => (
                  <li key={l.lensId}>
                    &#8226; {l.lensName} ({l.yes}/{l.total})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {submitState === "success" ? (
            <div
              role="status"
              className="rounded-md border border-surface-border bg-surface-alt p-4 text-body"
            >
              <p className="font-medium">
                Sent — we&apos;ll follow up at {email} with the full written
                breakdown.
              </p>
              <p className="mt-2 text-small text-text-muted">
                {siteConfig.studioName}, {siteConfig.address.line1},{" "}
                {siteConfig.address.city}, {siteConfig.address.state}{" "}
                {siteConfig.address.zip}. Don&apos;t want to hear from us?
                Reply to that email and say so — we&apos;ll remove you.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col gap-3 border-t border-surface-border pt-6 sm:flex-row sm:items-end"
            >
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="ma-email" className="text-body font-medium">
                  Get the full written breakdown by email
                </label>
                <input
                  id="ma-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
                />
              </div>
              {/* Honeypot — hidden from real users, catches basic bots */}
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="rounded-md bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitState === "submitting" ? "Sending…" : "Send my breakdown"}
              </button>
            </form>
          )}

          {submitState === "error" && (
            <p role="alert" className="text-body text-red-600 dark:text-red-400">
              {submitError} Or email{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="underline"
              >
                {siteConfig.contact.email}
              </a>{" "}
              directly.
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              setStep("info");
              setAnswers({});
              setSubmitState("idle");
            }}
            className="w-fit text-small text-text-muted underline hover:text-accent"
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
