export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What actually happens during the free audit?",
    answer:
      "A structured review of your digital presence across all six lenses — Google Business Profile, reviews, website, business health, marketing operations, and competitive context. Every finding is checked against observable, binary criteria and dated, not opinion. You get the findings on a call, not a generic PDF.",
  },
  {
    question: "How long does the audit take?",
    answer:
      "The audit itself is usually completed within a few business days of getting access to what's needed (Google Business Profile, website analytics if available). The findings call is scheduled once it's done — typically 45 minutes.",
  },
  {
    question: "Is the audit actually free, or is there a catch?",
    answer:
      "It's free. The audit exists to find out whether there's a fit and where the highest-leverage problems actually are — for some businesses, the findings call surfaces fixes that can be made without ever hiring anyone.",
  },
  {
    question: "What happens after the findings call?",
    answer:
      "If it makes sense to keep working together, the next step is a 90-day foundations phase focused on the two or three highest-leverage findings from the audit — not a full-service retainer on day one. See \"How an engagement works\" above.",
  },
  {
    question: "Do you only work with businesses that need everything fixed?",
    answer:
      "No — some audits turn up one or two specific gaps in an otherwise solid presence. The scope of work follows the findings, not the other way around.",
  },
  {
    question: "What size of business is this a fit for?",
    answer:
      "Small and mid-sized, owner-operated or close to it, based in or serving Los Angeles County. See \"Who this is for\" above for specifics.",
  },
  {
    question: "Why a six-lens audit instead of just an SEO audit?",
    answer:
      "Because the bottleneck usually isn't SEO. A restaurant's biggest gap might be an out-of-date Google listing; a dental practice's might be an unanswered review streak. Starting with a narrow SEO audit assumes the problem before checking — the six-lens approach checks first.",
  },
];
