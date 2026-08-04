// The six-lens audit framework. Shared by the home page teaser and the full
// /audit methodology page — this is the single source of truth for both.
//
// Every example below is an illustrative, anonymized finding used to explain
// what a lens surfaces — not a claimed real client result. No business names,
// no invented metrics presented as fact.

export type Lens = {
  id: string;
  number: number;
  name: string;
  question: string;
  checks: string[];
  whyItMatters: string;
  example: {
    vertical: string;
    finding: string;
  };
};

export const LENSES: Lens[] = [
  {
    id: "gbp",
    number: 1,
    name: "Google Business Profile",
    question: "Claimed, complete, current, converting?",
    checks: [
      "Profile claimed and verified by the business, not a third party",
      "Primary category matches what the business actually does",
      "Hours are current, including holiday hours",
      "Photos and service/menu listings updated within the last 90 days",
      "Booking or ordering link present and functional",
      "Posts published at least monthly",
    ],
    whyItMatters:
      "Google Business Profile is often the first thing a searcher sees before deciding to call, visit, or keep scrolling. A profile that's unclaimed, out of date, or missing a booking path loses the customer before the website ever gets a chance.",
    example: {
      vertical: "Restaurant",
      finding:
        "Profile was claimed but listed under a generic \"Restaurant\" category with no cuisine sub-category set, hours hadn't been updated after a schedule change, and there was no online ordering link despite the business taking orders through a separate app.",
    },
  },
  {
    id: "reviews",
    number: 2,
    name: "Reviews & Reputation",
    question: "Volume, velocity, response rate, cross-platform presence?",
    checks: [
      "Total review count and rating relative to nearby competitors",
      "Review velocity — new reviews per month, not just the lifetime total",
      "Owner response rate and typical response time",
      "Rating consistency across Google, Yelp, and Facebook",
      "Whether negative reviews are addressed or left unanswered",
    ],
    whyItMatters:
      "Review volume and velocity work as an ongoing trust signal for both searchers and Google's ranking systems. A strong rating with no recent reviews reads as stalled; unanswered negative reviews read as a business that isn't paying attention.",
    example: {
      vertical: "Dental practice",
      finding:
        "4.8 rating from 210 reviews, but the most recent review was 14 months old, and three of the last five negative reviews had no response from the practice.",
    },
  },
  {
    id: "website-seo",
    number: 3,
    name: "Website & Search Visibility",
    question: "Speed, conversion path, local SEO fundamentals, tracking?",
    checks: [
      "Mobile page speed (Core Web Vitals)",
      "Clear path from landing on a page to calling, booking, or requesting a quote",
      "Local SEO fundamentals — title tags, service-area pages, NAP consistency",
      "Conversion tracking installed and firing correctly",
      "SSL, mobile usability, and a basic broken-link check",
    ],
    whyItMatters:
      "A visitor who lands on a slow site with no obvious next step doesn't file a complaint — they leave and call a competitor instead. Without conversion tracking, none of that is visible to the owner at all.",
    example: {
      vertical: "Home services (HVAC)",
      finding:
        "6.2-second mobile load time, no dedicated pages for the four cities actually served, and a contact form that submitted successfully on screen but never actually sent an email — three months of leads lost with no error visible to the owner.",
    },
  },
  {
    id: "business-health",
    number: 4,
    name: "Business Health",
    question: "Longevity, scale, and what the business can realistically invest?",
    checks: [
      "Years in operation and ownership continuity",
      "Staff and location count relative to service capacity",
      "Realistic monthly marketing budget given the business's current stage",
      "Seasonal or cash-flow patterns that affect timing",
      "Existing vendor and software commitments already under contract",
    ],
    whyItMatters:
      "The right recommendation for a two-chair salon in its first year is not the right recommendation for a five-location practice with a marketing hire already on staff. Skipping this lens is how agencies end up prescribing enterprise tactics to businesses that need fundamentals first.",
    example: {
      vertical: "Hair salon",
      finding:
        "Single location, third year in business, marketing spend limited to occasional boosted posts. The realistic next step was fixing online booking friction before adding paid acquisition, not the reverse.",
    },
  },
  {
    id: "marketing-ops",
    number: 5,
    name: "Marketing & Operations",
    question: "Email/SMS, loyalty, booking friction, offer cadence?",
    checks: [
      "Whether an email/SMS list exists and how often it's actually used",
      "A loyalty or repeat-visit incentive in place",
      "Booking or scheduling friction — how many steps it takes to book",
      "Offer cadence, and whether current promotions are documented anywhere",
      "A follow-up sequence for no-shows or lapsed customers",
    ],
    whyItMatters:
      "Acquisition gets the attention, but retention and rebooking are usually cheaper to fix and faster to pay off. A business with no re-engagement sequence for lapsed customers is paying full acquisition cost to replace people who could have been won back for free.",
    example: {
      vertical: "Fitness studio",
      finding:
        "No email list in active use despite 900+ past class sign-ups already on file, and no follow-up of any kind for members who stopped showing up after their first month.",
    },
  },
  {
    id: "competitive-context",
    number: 6,
    name: "Competitive Context",
    question: "How independent rivals in the same zip are actually performing?",
    checks: [
      "Review count, rating, and velocity for 3–5 direct competitors nearby",
      "Competitors' Google Business Profile completeness by comparison",
      "Price positioning where it's publicly visible",
      "Which competitors are visibly running ads or promotions",
      "Gaps competitors have left unaddressed",
    ],
    whyItMatters:
      "A business can improve every metric in isolation and still lose ground if competitors are improving faster. Context turns a score into a decision: what's actually worth prioritizing given who else is in the market.",
    example: {
      vertical: "Retail (boutique)",
      finding:
        "Two direct competitors within a mile had roughly 3x the review count and were both running seasonal promotions the business wasn't matching — a gap that isn't visible without looking at the market side by side.",
    },
  },
];
