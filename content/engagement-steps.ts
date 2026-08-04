export type EngagementStep = {
  step: number;
  name: string;
  timeframe: string;
  description: string;
};

export const ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    step: 1,
    name: "Audit",
    timeframe: "Days 1–5",
    description:
      "Six-lens review of the current digital presence. Every finding is dated and tied to observable criteria — not opinion.",
  },
  {
    step: 2,
    name: "Findings call",
    timeframe: "Day 5–7",
    description:
      "A 45-minute walkthrough of what the audit found, in plain terms, with the two or three highest-leverage gaps named first.",
  },
  {
    step: 3,
    name: "90-day foundations",
    timeframe: "Months 1–3",
    description:
      "Fix what the audit found is actually broken — the things that were quietly losing customers before any new spend goes toward getting more of them.",
  },
  {
    step: 4,
    name: "Growth",
    timeframe: "Months 4–12",
    description:
      "With foundations in place, move into the channels the audit and business health lens actually support — not a default package.",
  },
];
