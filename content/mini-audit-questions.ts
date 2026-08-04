// Self-serve mini audit — a shortened, self-reported version of the six-lens
// framework. Every question maps back to a real check from content/lenses.ts
// so the score is grounded in the same methodology, not a separate rubric.

export type MiniAuditQuestion = {
  id: string;
  lensId: string;
  lensName: string;
  text: string;
};

export const MINI_AUDIT_QUESTIONS: MiniAuditQuestion[] = [
  {
    id: "gbp-claimed",
    lensId: "gbp",
    lensName: "Google Business Profile",
    text: "My Google Business Profile is claimed and verified by me or someone on my team.",
  },
  {
    id: "gbp-current",
    lensId: "gbp",
    lensName: "Google Business Profile",
    text: "My hours, photos, and services listed on Google have been updated in the last 3 months.",
  },
  {
    id: "reviews-velocity",
    lensId: "reviews",
    lensName: "Reviews & Reputation",
    text: "I've received at least one new review in the last 30 days.",
  },
  {
    id: "reviews-response",
    lensId: "reviews",
    lensName: "Reviews & Reputation",
    text: "I respond to reviews — positive and negative — within about a week.",
  },
  {
    id: "site-speed",
    lensId: "website-seo",
    lensName: "Website & Search Visibility",
    text: "My website loads quickly on a phone — no long wait for a first-time visitor.",
  },
  {
    id: "site-conversion",
    lensId: "website-seo",
    lensName: "Website & Search Visibility",
    text: "A first-time visitor can find how to contact or book with me in one click from the homepage.",
  },
  {
    id: "business-budget",
    lensId: "business-health",
    lensName: "Business Health",
    text: "I know roughly how much I can spend on marketing each month without guessing.",
  },
  {
    id: "marketing-followup",
    lensId: "marketing-ops",
    lensName: "Marketing & Operations",
    text: "I have a way to follow up with customers who haven't returned in a while — email, text, or otherwise.",
  },
  {
    id: "competitive-awareness",
    lensId: "competitive-context",
    lensName: "Competitive Context",
    text: "I know how my reviews and online presence compare to my closest 2–3 competitors.",
  },
];

export const INDUSTRY_OPTIONS = [
  "Restaurant / food service",
  "Dental or medical practice",
  "Home services (HVAC, plumbing, electrical, etc.)",
  "Salon or spa",
  "Fitness studio or gym",
  "Retail",
  "Professional services",
  "Other",
] as const;
