/* =========================================================
   LEADERSHIP & GOVERNANCE NEWS — SHARED DATA
   THE PRIDE TIMES
   Source: Global Corporate News Digest — "Leadership & Governance"
   Sample publication — all companies, people and figures are fictional.
========================================================= */

export type LeadershipGovernanceKeyFact = {
  label: string;
  value: string;
};

export type LeadershipGovernanceArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  location: string;
  author: string;
  publishedAt: string;
  image: string;
  readTime: string;
  highlights: string[];
  keyFacts: LeadershipGovernanceKeyFact[];
};

export const leadershipGovernanceSectionGlance = [
  { theme: "Board succession", momentum: "Active", outlook: "Watch closely" },
  { theme: "Shareholder activism", momentum: "Rising", outlook: "Uneven" },
  { theme: "Executive pay", momentum: "Under scrutiny", outlook: "Watch closely" },
  { theme: "Conduct & compliance", momentum: "Tightening", outlook: "Positive" },
];

const AUTHOR = "Sagar Kumar";

export const leadershipGovernanceArticles: LeadershipGovernanceArticle[] = [
  {
    id: "leadership-northwind-ceo-succession",
    category: "BOARD SUCCESSION",
    title: "Northwind Holdings names internal successor in planned CEO transition",
    excerpt: "Northwind Holdings said its board has chosen a long-serving operating chief to succeed the retiring CEO after an 18-month search.",
    location: "London",
    author: AUTHOR,
    publishedAt: "2026-09-30T08:00:00Z",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    readTime: "4 min read",
    highlights: [
      "Northwind Holdings named an internal operating chief as its next CEO.",
      "The board described the move as a planned, staged transition.",
      "Investors will look for continuity in capital allocation and strategy.",
      "Execution during the handover period is the main near-term risk.",
    ],
    keyFacts: [
      { label: "Company", value: "Northwind Holdings" },
      { label: "Location", value: "London" },
      { label: "Event", value: "Planned CEO succession" },
      { label: "Next watch", value: "Handover timeline and strategy update" },
    ],
  },
  {
    id: "leadership-meridian-activist-board-seats",
    category: "SHAREHOLDER ACTIVISM",
    title: "Activist fund pushes Meridian Capital for two board seats and a strategy review",
    excerpt: "An activist investor has asked Meridian Capital to add two directors and launch a review of its underperforming divisions.",
    location: "New York",
    author: AUTHOR,
    publishedAt: "2026-09-29T08:00:00Z",
    image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    highlights: [
      "An activist fund is seeking two board seats at Meridian Capital.",
      "It is also calling for a formal review of weaker business units.",
      "Management said it is open to dialogue but defended its current plan.",
      "A proxy contest would raise the stakes ahead of the annual meeting.",
    ],
    keyFacts: [
      { label: "Company", value: "Meridian Capital" },
      { label: "Location", value: "New York" },
      { label: "Demand", value: "Two seats and strategy review" },
      { label: "Key question", value: "Settlement or proxy fight?" },
    ],
  },
  {
    id: "leadership-harbor-exec-pay-vote",
    category: "EXECUTIVE PAY",
    title: "Harbor Industries faces shareholder revolt over executive pay package",
    excerpt: "A large share of Harbor Industries investors voted against its pay report, signalling discontent over incentive targets.",
    location: "Frankfurt",
    author: AUTHOR,
    publishedAt: "2026-09-28T08:00:00Z",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min read",
    highlights: [
      "A significant minority of shareholders opposed Harbor Industries' pay report.",
      "Investors questioned how incentive targets link to long-term performance.",
      "The remuneration committee promised to consult major holders.",
      "Pay design is becoming a recurring governance flashpoint.",
    ],
    keyFacts: [
      { label: "Company", value: "Harbor Industries" },
      { label: "Location", value: "Frankfurt" },
      { label: "Issue", value: "Incentive targets and pay quantum" },
      { label: "Next watch", value: "Committee response" },
    ],
  },
  {
    id: "leadership-vantage-audit-committee-reform",
    category: "BOARD OVERSIGHT",
    title: "Vantage Group overhauls audit committee after reporting lapse",
    excerpt: "Vantage Group said it will replace its audit committee chair and add an independent financial expert after a restatement.",
    location: "Singapore",
    author: AUTHOR,
    publishedAt: "2026-09-27T08:00:00Z",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    readTime: "4 min read",
    highlights: [
      "Vantage Group is refreshing its audit committee following a restatement.",
      "A new independent financial expert will join the board.",
      "The company will strengthen internal controls and reporting reviews.",
      "Regulators and investors will test whether oversight actually changes.",
    ],
    keyFacts: [
      { label: "Company", value: "Vantage Group" },
      { label: "Location", value: "Singapore" },
      { label: "Action", value: "Audit committee overhaul" },
      { label: "Key question", value: "Are controls credible?" },
    ],
  },
  {
    id: "leadership-solace-dual-class-sunset",
    category: "SHAREHOLDER RIGHTS",
    title: "Solace Technologies agrees to sunset its dual-class share structure",
    excerpt: "Solace Technologies will phase out its dual-class structure over seven years after sustained pressure from index providers and holders.",
    location: "San Francisco",
    author: AUTHOR,
    publishedAt: "2026-09-26T08:00:00Z",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    highlights: [
      "Solace Technologies will end its dual-class structure over seven years.",
      "The decision follows pressure from institutional investors.",
      "Founders keep influence during the transition period.",
      "Governance advocates see it as a template for other listed founders.",
    ],
    keyFacts: [
      { label: "Company", value: "Solace Technologies" },
      { label: "Location", value: "San Francisco" },
      { label: "Change", value: "Dual-class sunset" },
      { label: "Timeline", value: "Seven years" },
    ],
  },
  {
    id: "leadership-atlas-board-diversity-targets",
    category: "BOARD COMPOSITION",
    title: "Atlas Financial sets new board skills and diversity targets",
    excerpt: "Atlas Financial published a board refresh plan targeting more digital, risk and international expertise by 2028.",
    location: "Toronto",
    author: AUTHOR,
    publishedAt: "2026-09-25T08:00:00Z",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min read",
    highlights: [
      "Atlas Financial unveiled targets for board skills and composition.",
      "The plan prioritises digital, cyber and risk experience.",
      "Directors will face tenure limits under the new policy.",
      "Proxy advisers are expected to review progress annually.",
    ],
    keyFacts: [
      { label: "Company", value: "Atlas Financial" },
      { label: "Location", value: "Toronto" },
      { label: "Focus", value: "Board skills and tenure" },
      { label: "Horizon", value: "2028" },
    ],
  },
  {
    id: "leadership-kite-whistleblower-framework",
    category: "CONDUCT & COMPLIANCE",
    title: "Kite Logistics rolls out independent whistleblower framework",
    excerpt: "Kite Logistics introduced an externally run reporting line and committed to publishing annual case statistics.",
    location: "Mumbai",
    author: AUTHOR,
    publishedAt: "2026-09-24T08:00:00Z",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    readTime: "4 min read",
    highlights: [
      "Kite Logistics launched an independent whistleblower channel.",
      "The company will publish yearly statistics on reports and outcomes.",
      "Employees can report anonymously in multiple languages.",
      "Credibility will depend on how investigations are handled.",
    ],
    keyFacts: [
      { label: "Company", value: "Kite Logistics" },
      { label: "Location", value: "Mumbai" },
      { label: "Action", value: "Independent reporting line" },
      { label: "Next watch", value: "First annual disclosure" },
    ],
  },
  {
    id: "leadership-orion-ceo-chair-split",
    category: "BOARD STRUCTURE",
    title: "Orion Energy separates CEO and chair roles after investor engagement",
    excerpt: "Orion Energy will appoint an independent chair, ending a decade in which one executive held both roles.",
    location: "Houston",
    author: AUTHOR,
    publishedAt: "2026-09-23T08:00:00Z",
    image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    highlights: [
      "Orion Energy will split the CEO and chair roles.",
      "An independent director will lead the board from January.",
      "The move responds to sustained investor engagement.",
      "Clear lines of accountability are the stated objective.",
    ],
    keyFacts: [
      { label: "Company", value: "Orion Energy" },
      { label: "Location", value: "Houston" },
      { label: "Change", value: "Independent chair" },
      { label: "Effective", value: "January" },
    ],
  },
];

export function leadershipGovernanceArticlePath(id: string) {
  return `/leadership-governance#${id}`;
}
