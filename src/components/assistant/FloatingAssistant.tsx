"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { MavenCharacter } from "./MavenCharacter";
import { siteConfig } from "@/lib/site-config";

type Mode = "menu" | "contact";
type SubmitState = "idle" | "submitting" | "success" | "error";

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [submit, setSubmit] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape, and move focus into the panel when it opens.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    const first = panelRef.current?.querySelector<HTMLElement>(
      "a, button, input"
    );
    first?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmit("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          email,
          phone,
          message: "Requested a callback via the site assistant.",
          company,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSubmit("error");
        setError(data.error || "Something went wrong — try again.");
        return;
      }
      setSubmit("success");
    } catch {
      setSubmit("error");
      setError("Couldn't reach the server. Check your connection.");
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Data Maven assistant"
          className="assistant-panel w-[min(360px,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-surface-border bg-surface shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-surface-border bg-surface-alt px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <MavenCharacter size={20} />
            </span>
            <div className="flex-1">
              <p className="text-body font-heading font-semibold leading-tight">
                Let&apos;s find your gaps
              </p>
              <p className="text-small text-text-muted">
                Free audit for {siteConfig.serviceArea.short} businesses
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              aria-label="Close assistant"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-muted hover:text-text"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="p-4">
            {mode === "menu" && (
              <div className="flex flex-col gap-3">
                <p className="text-body text-text-muted">
                  Two ways to start — no pressure either way.
                </p>
                <Link
                  href="/#self-serve-audit"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-accent px-4 py-3 text-center text-body font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
                >
                  Run the 2-minute self-check
                </Link>
                <button
                  type="button"
                  onClick={() => setMode("contact")}
                  className="rounded-md border border-surface-border px-4 py-3 text-body font-medium hover:border-accent hover:text-accent transition-colors"
                >
                  Have us reach out to you
                </button>
              </div>
            )}

            {mode === "contact" && submit !== "success" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fa-name" className="text-small font-medium">
                    Name
                  </label>
                  <input
                    id="fa-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fa-email" className="text-small font-medium">
                    Email
                  </label>
                  <input
                    id="fa-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fa-phone" className="text-small font-medium">
                    Phone <span className="text-text-muted">(optional)</span>
                  </label>
                  <input
                    id="fa-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
                  />
                </div>
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
                  disabled={submit === "submitting"}
                  className="rounded-md bg-accent px-4 py-3 text-body font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors disabled:opacity-50"
                >
                  {submit === "submitting" ? "Sending…" : "Request a callback"}
                </button>
                {submit === "error" && (
                  <p role="alert" className="text-small text-red-600 dark:text-red-400">
                    {error} Or email{" "}
                    <a href={`mailto:${siteConfig.contact.email}`} className="underline">
                      {siteConfig.contact.email}
                    </a>
                    .
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setMode("menu")}
                  className="text-small text-text-muted underline hover:text-accent"
                >
                  Back
                </button>
              </form>
            )}

            {mode === "contact" && submit === "success" && (
              <div role="status" className="flex flex-col gap-2">
                <p className="text-body font-medium">Got it — thanks, {name || "there"}.</p>
                <p className="text-small text-text-muted">
                  We&apos;ll reach out at {email} soon. {siteConfig.studioName},{" "}
                  {siteConfig.address.city}, {siteConfig.address.state}. Don&apos;t
                  want us to? Just reply and say so.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setMode("menu");
        }}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Open the Data Maven assistant"}
        className="assistant-fab flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <MavenCharacter size={28} />
        )}
      </button>
    </div>
  );
}
