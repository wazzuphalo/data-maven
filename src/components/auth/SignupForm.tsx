"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setState("submitting");
    setError("");
    try {
      // Deliberately not sending `password` — this is a demo signup, not a
      // real account system, and there is no reason for a prototype to ever
      // transmit or store what someone typed into a password field.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          email,
          message: "Requested a demo account signup (prototype — no account was actually created).",
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
      setError("Couldn't reach the server. Check your connection.");
    }
  }

  if (state === "success") {
    return (
      <div role="status" className="card flex flex-col gap-4 p-8">
        <p className="text-h3 font-heading font-semibold">
          Welcome, {name || "there"} — (demo)
        </p>
        <p className="text-body text-text-muted">
          This is a prototype: no real account was created, nothing was
          stored, and the password you typed was never sent anywhere. In a
          real version, you&apos;d be signed in right now.
        </p>
        <Link
          href="/wishlist"
          className="btn-primary group/btn inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
        >
          Go to your wishlist
          <span className="btn-arrow" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-4 p-6 md:p-8">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="su-name" className="text-body font-medium">
          Name
        </label>
        <input
          id="su-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="su-email" className="text-body font-medium">
          Email
        </label>
        <input
          id="su-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="su-password" className="text-body font-medium">
          Password
        </label>
        <input
          id="su-password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="su-confirm" className="text-body font-medium">
          Confirm password
        </label>
        <input
          id="su-confirm"
          type="password"
          required
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
      {error && (
        <p role="alert" className="text-small text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary rounded-lg bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors disabled:opacity-50"
      >
        {state === "submitting" ? "Creating account…" : "Create account (demo)"}
      </button>
      <p className="text-small text-text-muted">
        Your password stays on this page and is never submitted — this form
        only sends your name and email, the same as the contact form.
      </p>
    </form>
  );
}
