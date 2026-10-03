/* =========================================================
   HEALTHCARE & PHARMA NEWS — SHARED DATA
   THE PRIDE TIMES
   Source: Global Corporate News Digest — "Healthcare & Pharma"
======================================================== */

import HC1Img from "../../imports/HC1.png";
import HC2Img from "../../imports/HC2.png";
import HC3Img from "../../imports/HC3.png";
import HC4Img from "../../imports/HC4.png";

export type HealthcarePharmaKeyFact = {
  label: string;
  value: string;
};

export type HealthcarePharmaArticle = {
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
  keyFacts: HealthcarePharmaKeyFact[];
};

export const healthcarePharmaSectionGlance = [
  { theme: "Clinical milestones", momentum: "Building", outlook: "Positive" },
  { theme: "Drug pricing", momentum: "Under pressure", outlook: "Watch closely" },
  { theme: "Medical licensing", momentum: "Active", outlook: "Positive" },
  { theme: "Regulatory access", momentum: "Expanding", outlook: "Uneven" },
];

const AUTHOR = "Sagar Kumar";

export const healthcarePharmaArticles: HealthcarePharmaArticle[] = [
  {
    id: "healthcare-aurelia-foods-trial-results",
    category: "CLINICAL MILESTONES",
    title: "Aurelia Foods reports positive late-stage trial results",
    excerpt: "Aurelia Foods said its late-stage trial met its primary endpoint, sending shares sharply higher.",
    location: "Tokyo",
    author: AUTHOR,
    publishedAt: "2026-09-30T08:00:00Z",
    image: HC1Img,
    readTime: "5 min read",
    highlights: [
      "Aurelia Foods said its late-stage trial met its primary endpoint.",
      "The result sent shares sharply higher and puts the next regulatory steps in focus.",
      "Management framed the milestone as part of a longer-term healthcare strategy.",
      "Execution, approvals and the transition from trial data to wider access remain key risks.",
    ],
    keyFacts: [
      { label: "Company", value: "Aurelia Foods" },
      { label: "Location", value: "Tokyo" },
      { label: "Milestone", value: "Positive late-stage trial result" },
      { label: "Next watch", value: "Regulatory pathway and rollout" },
    ],
  },
  {
    id: "healthcare-oakhaven-pricing-pressure",
    category: "DRUG PRICING",
    title: "Oakhaven Motors faces pricing pressure as governments push for cost controls",
    excerpt: "Oakhaven Motors warned that new government pricing rules could trim revenues in several European markets.",
    location: "Zurich",
    author: AUTHOR,
    publishedAt: "2026-09-29T08:00:00Z",
    image: HC2Img,
    readTime: "4 min read",
    highlights: [
      "Oakhaven Motors warned that new pricing rules may trim revenue in several European markets.",
      "Governments are pushing cost controls as healthcare systems manage affordability pressures.",
      "The company will need to balance market access with margin discipline.",
      "Investors are watching how quickly pricing changes move into earnings.",
    ],
    keyFacts: [
      { label: "Company", value: "Oakhaven Motors" },
      { label: "Location", value: "Zurich" },
      { label: "Pressure", value: "Government cost controls" },
      { label: "Exposure", value: "Several European markets" },
    ],
  },
  {
    id: "healthcare-westbrook-aerospace-licensing",
    category: "PHARMA LICENSING",
    title: "Westbrook Aerospace licenses experimental drug in deal worth up to $21.2B",
    excerpt: "Westbrook Aerospace signed a licensing agreement that includes upfront payments and milestone-based fees.",
    location: "Stockholm",
    author: AUTHOR,
    publishedAt: "2026-09-28T08:00:00Z",
    image: HC3Img,
    readTime: "5 min read",
    highlights: [
      "Westbrook Aerospace signed a licensing deal for an experimental drug.",
      "The agreement includes upfront payments and milestone-based fees.",
      "The headline value reaches up to $21.2 billion if development milestones are met.",
      "The structure shifts part of the risk toward future clinical and regulatory performance.",
    ],
    keyFacts: [
      { label: "Company", value: "Westbrook Aerospace" },
      { label: "Location", value: "Stockholm" },
      { label: "Deal value", value: "Up to US$21.2 billion" },
      { label: "Structure", value: "Upfront plus milestone payments" },
    ],
  },
  {
    id: "healthcare-vantor-group-licensing",
    category: "PHARMA LICENSING",
    title: "Vantor Group licenses experimental drug in deal worth up to $48.7B",
    excerpt: "Vantor Group signed a licensing agreement that includes upfront payments and milestone-based fees.",
    location: "Chicago",
    author: AUTHOR,
    publishedAt: "2026-09-27T08:00:00Z",
    image: HC4Img,
    readTime: "5 min read",
    highlights: [
      "Vantor Group signed a licensing agreement for an experimental drug.",
      "The deal combines upfront payments with milestone-based fees.",
      "Its headline value reaches up to $48.7 billion across the life of the agreement.",
      "The commercial opportunity depends on clinical progress and regulatory clearance.",
    ],
    keyFacts: [
      { label: "Company", value: "Vantor Group" },
      { label: "Location", value: "Chicago" },
      { label: "Deal value", value: "Up to US$48.7 billion" },
      { label: "Next watch", value: "Clinical and regulatory milestones" },
    ],
  },
  {
    id: "healthcare-yarrow-logistics-therapy-approval",
    category: "REGULATORY ACCESS",
    title: "Yarrow Logistics wins approval for new therapy in São Paulo and 804 other markets",
    excerpt: "Yarrow Logistics received regulatory clearance for a new treatment, opening a market analysts value at $42.0B annually.",
    location: "São Paulo",
    author: AUTHOR,
    publishedAt: "2026-09-26T08:00:00Z",
    image: HC1Img,
    readTime: "4 min read",
    highlights: [
      "Yarrow Logistics received regulatory clearance for a new treatment.",
      "The approval covers São Paulo and 804 other markets.",
      "Analysts value the addressable market at $42.0 billion annually.",
      "Manufacturing, launch execution and patient access are the next operational tests.",
    ],
    keyFacts: [
      { label: "Company", value: "Yarrow Logistics" },
      { label: "Location", value: "São Paulo" },
      { label: "Approval", value: "São Paulo and 804 other markets" },
      { label: "Estimated market", value: "US$42.0 billion annually" },
    ],
  },
  {
    id: "healthcare-yarrow-foods-licensing",
    category: "PHARMA LICENSING",
    title: "Yarrow Foods licenses experimental drug in deal worth up to $42.9B",
    excerpt: "Yarrow Foods signed a licensing agreement that includes upfront payments and milestone-based fees.",
    location: "Jakarta",
    author: AUTHOR,
    publishedAt: "2026-09-25T08:00:00Z",
    image: HC2Img,
    readTime: "4 min read",
    highlights: [
      "Yarrow Foods signed a licensing agreement for an experimental drug.",
      "The deal includes upfront payments and milestone-based fees.",
      "The headline value reaches up to $42.9 billion if development milestones are achieved.",
      "The transaction highlights the sector's continued appetite for platform and pipeline access.",
    ],
    keyFacts: [
      { label: "Company", value: "Yarrow Foods" },
      { label: "Location", value: "Jakarta" },
      { label: "Deal value", value: "Up to US$42.9 billion" },
      { label: "Structure", value: "Upfront plus milestone payments" },
    ],
  },
];

export function healthcarePharmaArticlePath(id: string) {
  return `/healthcare#${id}`;
}
