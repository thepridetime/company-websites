/* =========================================================
   SUSTAINABILITY & ESG NEWS — SHARED DATA
   THE PRIDE TIMES
   Source: Global Corporate News Digest — "Sustainability & ESG"
   Sample publication — all companies, people and figures are fictional.
========================================================= */

export type SustainabilityEsgKeyFact = {
  label: string;
  value: string;
};

export type SustainabilityEsgArticle = {
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
  keyFacts: SustainabilityEsgKeyFact[];
};

export const sustainabilityEsgSectionGlance = [
  { theme: "Disclosure rules", momentum: "Tightening", outlook: "Positive" },
  { theme: "Green finance", momentum: "Expanding", outlook: "Positive" },
  { theme: "Supply-chain ethics", momentum: "Under review", outlook: "Watch closely" },
  { theme: "Net-zero targets", momentum: "Uneven", outlook: "Neutral" },
];

const AUTHOR = "Sagar Kumar";

export const sustainabilityEsgArticles: SustainabilityEsgArticle[] = [
  {
    id: "sustainability-verdant-climate-disclosure-first",
    category: "DISCLOSURE",
    title: "Verdant Resources publishes first full climate-risk disclosure under new rules",
    excerpt: "Verdant Resources released a detailed climate-risk report covering physical and transition scenarios for the first time.",
    location: "Sydney",
    author: AUTHOR,
    publishedAt: "2026-09-30T08:00:00Z",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    readTime: "4 min read",
    highlights: [
      "Verdant Resources published its first full climate-risk disclosure.",
      "The report covers physical and transition risk scenarios.",
      "Analysts welcomed the detail but asked for firmer interim targets.",
      "Comparable disclosure is becoming a baseline expectation.",
    ],
    keyFacts: [
      { label: "Company", value: "Verdant Resources" },
      { label: "Location", value: "Sydney" },
      { label: "Milestone", value: "First climate-risk report" },
      { label: "Next watch", value: "Interim targets" },
    ],
  },
  {
    id: "sustainability-lumen-green-bond-oversubscribed",
    category: "GREEN FINANCE",
    title: "Lumen Power's green bond draws record demand from institutional buyers",
    excerpt: "Lumen Power priced a green bond that was heavily oversubscribed, with proceeds earmarked for grid storage and renewables.",
    location: "Amsterdam",
    author: AUTHOR,
    publishedAt: "2026-09-29T08:00:00Z",
    image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    highlights: [
      "Lumen Power's green bond attracted strong institutional demand.",
      "Proceeds are earmarked for grid storage and renewable projects.",
      "Investors asked for clear allocation and impact reporting.",
      "Pricing suggests appetite for credible transition finance.",
    ],
    keyFacts: [
      { label: "Company", value: "Lumen Power" },
      { label: "Location", value: "Amsterdam" },
      { label: "Instrument", value: "Green bond" },
      { label: "Use of proceeds", value: "Storage and renewables" },
    ],
  },
  {
    id: "sustainability-tidewater-supplier-audit",
    category: "SUPPLY-CHAIN ETHICS",
    title: "Tidewater Apparel expands supplier audits after labour-practice concerns",
    excerpt: "Tidewater Apparel will add unannounced audits and publish its supplier list following a watchdog report.",
    location: "Dhaka",
    author: AUTHOR,
    publishedAt: "2026-09-28T08:00:00Z",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min read",
    highlights: [
      "Tidewater Apparel is expanding unannounced supplier audits.",
      "The company will publish a full supplier list.",
      "The step follows concerns raised by a labour watchdog.",
      "Follow-through on remediation will determine credibility.",
    ],
    keyFacts: [
      { label: "Company", value: "Tidewater Apparel" },
      { label: "Location", value: "Dhaka" },
      { label: "Action", value: "Expanded audits and transparency" },
      { label: "Key question", value: "Is remediation enforced?" },
    ],
  },
  {
    id: "sustainability-basalt-net-zero-timeline",
    category: "NET-ZERO TARGETS",
    title: "Basalt Cement revises net-zero timeline, citing technology constraints",
    excerpt: "Basalt Cement pushed back part of its decarbonisation roadmap while keeping its long-term goal intact.",
    location: "Zurich",
    author: AUTHOR,
    publishedAt: "2026-09-27T08:00:00Z",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    readTime: "4 min read",
    highlights: [
      "Basalt Cement adjusted its interim emissions targets.",
      "The company cited delays in carbon-capture deployment.",
      "It reaffirmed its long-term net-zero commitment.",
      "Investors will press for transparent milestones.",
    ],
    keyFacts: [
      { label: "Company", value: "Basalt Cement" },
      { label: "Location", value: "Zurich" },
      { label: "Change", value: "Revised interim targets" },
      { label: "Driver", value: "Technology readiness" },
    ],
  },
  {
    id: "sustainability-pioneer-scope3-reporting",
    category: "EMISSIONS REPORTING",
    title: "Pioneer Foods begins Scope 3 reporting across its farm supply base",
    excerpt: "Pioneer Foods will track supplier emissions using standardised farm-level data starting next year.",
    location: "Chicago",
    author: AUTHOR,
    publishedAt: "2026-09-26T08:00:00Z",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    highlights: [
      "Pioneer Foods will report Scope 3 emissions from suppliers.",
      "Farm-level data collection begins next year.",
      "Smallholder support is part of the programme.",
      "Data quality is the main implementation challenge.",
    ],
    keyFacts: [
      { label: "Company", value: "Pioneer Foods" },
      { label: "Location", value: "Chicago" },
      { label: "Scope", value: "Supplier emissions" },
      { label: "Start", value: "Next year" },
    ],
  },
  {
    id: "sustainability-crestline-water-stewardship",
    category: "RESOURCE USE",
    title: "Crestline Semiconductors sets water-stewardship goals for new fabs",
    excerpt: "Crestline Semiconductors committed to recycling most process water at new fabrication sites.",
    location: "Taipei",
    author: AUTHOR,
    publishedAt: "2026-09-25T08:00:00Z",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min read",
    highlights: [
      "Crestline Semiconductors set water-recycling targets for new fabs.",
      "The plan includes site-level water-risk assessments.",
      "Local community engagement is part of approvals.",
      "Water is emerging as a core ESG metric for manufacturing.",
    ],
    keyFacts: [
      { label: "Company", value: "Crestline Semiconductors" },
      { label: "Location", value: "Taipei" },
      { label: "Focus", value: "Water recycling" },
      { label: "Scope", value: "New fabs" },
    ],
  },
  {
    id: "sustainability-helio-esg-linked-loan",
    category: "GREEN FINANCE",
    title: "Helio Retail secures sustainability-linked loan tied to emissions targets",
    excerpt: "Helio Retail agreed a credit facility whose pricing steps down if it meets store-energy and packaging goals.",
    location: "Dubai",
    author: AUTHOR,
    publishedAt: "2026-09-24T08:00:00Z",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    readTime: "4 min read",
    highlights: [
      "Helio Retail signed a sustainability-linked credit facility.",
      "Pricing depends on energy and packaging targets.",
      "Independent verification will test results annually.",
      "Lenders are tightening target quality standards.",
    ],
    keyFacts: [
      { label: "Company", value: "Helio Retail" },
      { label: "Location", value: "Dubai" },
      { label: "Instrument", value: "Sustainability-linked loan" },
      { label: "Test", value: "Annual verification" },
    ],
  },
  {
    id: "sustainability-ember-greenwashing-probe",
    category: "DISCLOSURE",
    title: "Regulator opens inquiry into Ember Motors' green marketing claims",
    excerpt: "A consumer regulator is reviewing whether Ember Motors' emissions-related advertising met substantiation standards.",
    location: "Brussels",
    author: AUTHOR,
    publishedAt: "2026-09-23T08:00:00Z",
    image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    highlights: [
      "A regulator opened an inquiry into Ember Motors' marketing claims.",
      "The review centres on substantiation of emissions statements.",
      "The company said it will cooperate fully.",
      "Outcomes could shape green-claims practice across the sector.",
    ],
    keyFacts: [
      { label: "Company", value: "Ember Motors" },
      { label: "Location", value: "Brussels" },
      { label: "Issue", value: "Green marketing claims" },
      { label: "Next watch", value: "Regulator findings" },
    ],
  },
];

export function sustainabilityEsgArticlePath(id: string) {
  return `/sustainability-esg#${id}`;
}
