"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          email,
          businessName,
          phone,
          message,
          company,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setState("error");
        setError(data.error || "Something went wrong — try again.");
        return;
      }
      setState("success");
    } catch {
      setState("error");
      setError("Couldn't reach the server. Check your connection and try again.");
    }
  }

  if (state === "success") {
    return (
      <div role="status" className="rounded-lg border border-surface-border bg-surface-alt p-6">
        <p className="text-body-lg font-medium">
          Thanks — we&apos;ll be in touch within one business day.
        </p>
        <p className="mt-2 text-small text-text-muted">
          {siteConfig.studioName}, {siteConfig.address.line1},{" "}
          {siteConfig.address.city}, {siteConfig.address.state}{" "}
          {siteConfig.address.zip}. Don&apos;t want to hear from us? Reply to
          our email and say so — we&apos;ll remove you.
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <input type="hidden" name="form-name" value="contact" />

      <div className="flex flex-col gap-2">
        <label htmlFor="c-name" className="text-body font-medium">
          Name
        </label>
        <input
          id="c-name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-email" className="text-body font-medium">
          Email
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-business" className="text-body font-medium">
          Business name
        </label>
        <input
          id="c-business"
          name="businessName"
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-phone" className="text-body font-medium">
          Phone <span className="text-text-muted">(optional)</span>
        </label>
        <input
          id="c-phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-message" className="text-body font-medium">
          What&apos;s going on with your marketing right now?{" "}
          <span className="text-text-muted">(optional)</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
        />
      </div>

      {/* Honeypot — hidden from real users */}
      <p className="hidden">
        <label>
          Company
          <input
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </p>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-fit rounded-md bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "submitting" ? "Sending…" : "Send"}
      </button>

      {state === "error" && (
        <p role="alert" className="text-body text-red-600 dark:text-red-400">
          {error} Or email{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="underline">
            {siteConfig.contact.email}
          </a>{" "}
          directly.
        </p>
      )}
    </form>
  );
}
