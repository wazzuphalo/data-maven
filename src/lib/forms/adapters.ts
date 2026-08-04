import type { FormSubmissionPayload } from "./schema";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

function toFormEncoded(formName: string, data: Record<string, string>) {
  const params = new URLSearchParams({ "form-name": formName, ...data });
  return params.toString();
}

function flattenPayload(payload: FormSubmissionPayload): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (key === "company") continue;
    entries[key] = Array.isArray(value) ? value.join(", ") : String(value);
  }
  return entries;
}

/**
 * Default adapter — no third-party account needed. Netlify detects the
 * static form markup in public/__forms.html and src/app/contact/page.tsx at
 * build time; this relays the validated submission to the site's own origin
 * as a matching form-encoded POST so Netlify's Forms processing captures it
 * (submissions land in the Netlify dashboard, 100/month on the free tier).
 */
async function submitViaNetlifyForms(
  payload: FormSubmissionPayload
): Promise<SubmitResult> {
  const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;

  if (!siteUrl) {
    // Local dev has no Netlify edge to intercept the submission — log it
    // instead of failing, so nothing is silently lost during development.
    console.log("[contact] Netlify Forms adapter (dev, no-op):", payload);
    return { ok: true };
  }

  const formName = payload.type === "contact" ? "contact" : "mini-audit-lead";
  const body = toFormEncoded(formName, flattenPayload(payload));

  try {
    const res = await fetch(siteUrl + "/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) {
      console.error("[contact] Netlify Forms relay failed", res.status);
      return { ok: false, error: "Submission service returned an error." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] Netlify Forms relay threw", err);
    return { ok: false, error: "Could not reach the submission service." };
  }
}

/**
 * Upgrade path — set RESEND_API_KEY to switch delivery to email instead of
 * Netlify Forms. No SDK dependency added; plain fetch against Resend's API.
 */
async function submitViaResend(
  payload: FormSubmissionPayload
): Promise<SubmitResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;

  if (!apiKey || !to) {
    console.error("[contact] Resend adapter selected but not configured");
    return { ok: false, error: "Email delivery is not configured." };
  }

  const subject =
    payload.type === "contact"
      ? `New contact form submission from ${payload.name}`
      : `New mini-audit lead: ${payload.businessName}`;

  const text = Object.entries(flattenPayload(payload))
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend send failed", res.status, await res.text());
      return { ok: false, error: "Email delivery failed." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] Resend send threw", err);
    return { ok: false, error: "Could not reach the email service." };
  }
}

export async function submitForm(
  payload: FormSubmissionPayload
): Promise<SubmitResult> {
  if (process.env.RESEND_API_KEY) {
    return submitViaResend(payload);
  }
  return submitViaNetlifyForms(payload);
}
