// Services are framed as audit *outputs*, not a menu to pick from. Each entry
// maps to the lens it addresses — this list is what the page renders under
// "if the audit finds this, here's what fixing it looks like."

export type Service = {
  lensId: string;
  name: string;
  triggeredWhen: string;
  whatItIncludes: string[];
  typicalTimeframe: string;
};

export const SERVICES: Service[] = [
  {
    lensId: "gbp",
    name: "Google Business Profile cleanup & management",
    triggeredWhen:
      "The audit finds an unclaimed, outdated, or incomplete Google Business Profile.",
    whatItIncludes: [
      "Claim/verify and correct category, hours, and service listings",
      "Photo and post cadence set up and handed off or managed ongoing",
      "Booking/ordering links wired up and tested",
    ],
    typicalTimeframe: "1–2 weeks to fix, ongoing management optional after",
  },
  {
    lensId: "reviews",
    name: "Review generation & response system",
    triggeredWhen:
      "The audit finds low review velocity, no response cadence, or inconsistent ratings across platforms.",
    whatItIncludes: [
      "A simple, repeatable ask-for-a-review process at the right moment in the customer journey",
      "Response templates and a cadence for owner or staff to actually use",
      "Monthly velocity and rating tracking across Google, Yelp, and Facebook",
    ],
    typicalTimeframe: "Set up in week 1, compounds over 90 days",
  },
  {
    lensId: "website-seo",
    name: "Website & local SEO fixes",
    triggeredWhen:
      "The audit finds slow load times, a broken or missing conversion path, or local SEO fundamentals left undone.",
    whatItIncludes: [
      "Mobile speed fixes prioritized by actual impact, not a generic checklist",
      "A clear call-to-action path fixed or added where it's missing",
      "Local SEO fundamentals — title tags, service-area pages, NAP consistency",
      "Conversion tracking installed and verified working",
    ],
    typicalTimeframe: "2–4 weeks depending on scope",
  },
  {
    lensId: "business-health",
    name: "Budget & scope planning",
    triggeredWhen:
      "The audit finds a mismatch between what's being spent or attempted and what the business can actually support right now.",
    whatItIncludes: [
      "A realistic monthly marketing budget tied to current revenue stage",
      "A sequenced plan — what to fix first, what to defer",
      "An honest read on which channels aren't worth pursuing yet",
    ],
    typicalTimeframe: "Delivered as part of the findings call",
  },
  {
    lensId: "marketing-ops",
    name: "Retention & re-engagement setup",
    triggeredWhen:
      "The audit finds no email/SMS list in active use, no loyalty mechanism, or no follow-up for lapsed customers.",
    whatItIncludes: [
      "A basic email/SMS list and send cadence set up from what already exists",
      "A lapsed-customer follow-up sequence",
      "A loyalty or repeat-visit incentive suited to the business type",
    ],
    typicalTimeframe: "2–3 weeks to stand up, ongoing to run",
  },
  {
    lensId: "competitive-context",
    name: "Competitive positioning review",
    triggeredWhen:
      "The audit finds the business is losing ground to specific nearby competitors in ways that weren't visible before.",
    whatItIncludes: [
      "A side-by-side comparison against 3–5 direct competitors",
      "Specific gaps the business can address that competitors have left open",
      "Price and offer positioning relative to the local market",
    ],
    typicalTimeframe: "Delivered as part of the audit findings",
  },
];
