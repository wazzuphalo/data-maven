// Home page "the problem, stated plainly" section. Three different verticals,
// three different bottlenecks — the point is that the gap is never the same
// business to business.

export type ProblemExample = {
  vertical: string;
  headline: string;
  detail: string;
};

export const PROBLEM_EXAMPLES: ProblemExample[] = [
  {
    vertical: "Restaurant",
    headline: "Showing up in search, then losing the click",
    detail:
      "Ranks fine for \"dinner near me,\" but the Google listing links to a menu PDF from two years ago and there's no way to see current hours without calling.",
  },
  {
    vertical: "Dental practice",
    headline: "A reputation that stopped growing",
    detail:
      "Genuinely good reviews, but no new ones in over a year and nobody responding to the two negative ones sitting at the top of the profile.",
  },
  {
    vertical: "Home services",
    headline: "Paying for leads that never had a chance to convert",
    detail:
      "Running paid ads to a contact form that quietly stopped sending emails three months ago — the traffic was never the problem.",
  },
];
