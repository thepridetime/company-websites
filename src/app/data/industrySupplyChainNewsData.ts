/* =========================================================
   INDUSTRY & SUPPLY CHAIN NEWS — SHARED DATA
   THE PRIDE TIMES
   Source: Global Corporate News Digest — "Industry & Supply Chain"
   Sample publication — all companies, people and figures are fictional.
========================================================= */

export type IndustrySupplyChainKeyFact = {
  label: string;
  value: string;
};

export type IndustrySupplyChainArticle = {
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
  keyFacts: IndustrySupplyChainKeyFact[];
};

export const industrySupplyChainSectionGlance = [
  { theme: "Port capacity", momentum: "Tight", outlook: "Watch closely" },
  { theme: "Freight rates", momentum: "Uneven", outlook: "Neutral" },
  { theme: "Reshoring", momentum: "Building", outlook: "Positive" },
  { theme: "Supplier risk", momentum: "Elevated", outlook: "Watch closely" },
];

const AUTHOR = "Sagar Kumar";

export const industrySupplyChainArticles: IndustrySupplyChainArticle[] = [
  {
    id: "industry-redwood-port-automation",
    category: "PORTS & SHIPPING",
    title: "Redwood Terminals invests in port automation to ease container backlogs",
    excerpt: "Redwood Terminals approved a multi-year automation programme aimed at cutting vessel turnaround times.",
    location: "Rotterdam",
    author: AUTHOR,
    publishedAt: "2026-09-30T08:00:00Z",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    readTime: "4 min read",
    highlights: [
      "Redwood Terminals approved a port automation investment.",
      "The goal is faster vessel turnaround and fewer backlogs.",
      "Labour groups asked for retraining commitments.",
      "Throughput gains will take time to appear.",
    ],
    keyFacts: [
      { label: "Company", value: "Redwood Terminals" },
      { label: "Location", value: "Rotterdam" },
      { label: "Action", value: "Automation programme" },
      { label: "Key question", value: "How fast are gains realised?" },
    ],
  },
  {
    id: "industry-summit-reshoring-plant",
    category: "RESHORING",
    title: "Summit Components opens regional plant to shorten electronics supply lines",
    excerpt: "Summit Components launched a new facility closer to customers, reducing reliance on long-haul shipments.",
    location: "Monterrey",
    author: AUTHOR,
    publishedAt: "2026-09-29T08:00:00Z",
    image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    highlights: [
      "Summit Components opened a new regional plant.",
      "The site is designed to shorten lead times.",
      "Customers want more resilient, diversified supply.",
      "Cost and skilled-labour availability remain challenges.",
    ],
    keyFacts: [
      { label: "Company", value: "Summit Components" },
      { label: "Location", value: "Monterrey" },
      { label: "Move", value: "Regional manufacturing" },
      { label: "Benefit", value: "Shorter lead times" },
    ],
  },
  {
    id: "industry-polar-cold-chain",
    category: "LOGISTICS",
    title: "Polar Freight expands cold-chain network for pharmaceuticals and food",
    excerpt: "Polar Freight is adding temperature-controlled hubs across three regions to meet rising demand.",
    location: "Singapore",
    author: AUTHOR,
    publishedAt: "2026-09-28T08:00:00Z",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min read",
    highlights: [
      "Polar Freight is expanding its cold-chain network.",
      "New hubs will serve pharma and fresh-food shippers.",
      "Energy costs and compliance are key constraints.",
      "Demand is being driven by regulated, high-value cargo.",
    ],
    keyFacts: [
      { label: "Company", value: "Polar Freight" },
      { label: "Location", value: "Singapore" },
      { label: "Focus", value: "Cold-chain capacity" },
      { label: "Sectors", value: "Pharma and food" },
    ],
  },
  {
    id: "industry-keystone-supplier-risk",
    category: "SUPPLIER RISK",
    title: "Keystone Auto maps tier-two suppliers after component shortage",
    excerpt: "Keystone Auto will build a live map of sub-tier suppliers to spot disruptions earlier.",
    location: "Stuttgart",
    author: AUTHOR,
    publishedAt: "2026-09-27T08:00:00Z",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    readTime: "4 min read",
    highlights: [
      "Keystone Auto will map its tier-two supplier base.",
      "The effort follows a recent component shortage.",
      "Better visibility should speed up contingency planning.",
      "Data sharing across suppliers is the hard part.",
    ],
    keyFacts: [
      { label: "Company", value: "Keystone Auto" },
      { label: "Location", value: "Stuttgart" },
      { label: "Action", value: "Sub-tier supplier mapping" },
      { label: "Trigger", value: "Component shortage" },
    ],
  },
  {
    id: "industry-arcadia-freight-rates",
    category: "FREIGHT RATES",
    title: "Arcadia Shipping flags softer container rates but warns of volatility",
    excerpt: "Arcadia Shipping said spot rates eased this quarter, though route disruptions could reverse the trend.",
    location: "Hamburg",
    author: AUTHOR,
    publishedAt: "2026-09-26T08:00:00Z",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    highlights: [
      "Arcadia Shipping reported softer container spot rates.",
      "Management warned that disruptions could lift costs again.",
      "Overcapacity is weighing on some trade lanes.",
      "Shippers are balancing contract and spot exposure.",
    ],
    keyFacts: [
      { label: "Company", value: "Arcadia Shipping" },
      { label: "Location", value: "Hamburg" },
      { label: "Trend", value: "Softer spot rates" },
      { label: "Risk", value: "Route disruption" },
    ],
  },
  {
    id: "industry-nimbus-warehouse-robotics",
    category: "WAREHOUSING",
    title: "Nimbus Fulfilment deploys robotics across regional warehouses",
    excerpt: "Nimbus Fulfilment is rolling out picking robots to raise accuracy and handle peak-season volume.",
    location: "Atlanta",
    author: AUTHOR,
    publishedAt: "2026-09-25T08:00:00Z",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min read",
    highlights: [
      "Nimbus Fulfilment is deploying warehouse robotics.",
      "The aim is better picking accuracy and peak capacity.",
      "Workforce reskilling is part of the plan.",
      "Return on investment depends on utilisation rates.",
    ],
    keyFacts: [
      { label: "Company", value: "Nimbus Fulfilment" },
      { label: "Location", value: "Atlanta" },
      { label: "Technology", value: "Picking robots" },
      { label: "Goal", value: "Peak-season capacity" },
    ],
  },
  {
    id: "industry-ironclad-steel-inputs",
    category: "MATERIALS",
    title: "Ironclad Steel secures long-term raw-material contracts amid price swings",
    excerpt: "Ironclad Steel signed multi-year supply agreements to stabilise input costs.",
    location: "Mumbai",
    author: AUTHOR,
    publishedAt: "2026-09-24T08:00:00Z",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    readTime: "4 min read",
    highlights: [
      "Ironclad Steel signed long-term raw-material contracts.",
      "The deals aim to dampen input-price volatility.",
      "Customers may see steadier pricing.",
      "Contract terms will be tested if markets move sharply.",
    ],
    keyFacts: [
      { label: "Company", value: "Ironclad Steel" },
      { label: "Location", value: "Mumbai" },
      { label: "Action", value: "Long-term supply contracts" },
      { label: "Goal", value: "Cost stability" },
    ],
  },
  {
    id: "industry-horizon-customs-digital",
    category: "TRADE & CUSTOMS",
    title: "Horizon Trade Group pilots digital customs clearance to cut border delays",
    excerpt: "Horizon Trade Group is testing paperless customs processes with partner agencies at two key crossings.",
    location: "Nairobi",
    author: AUTHOR,
    publishedAt: "2026-09-23T08:00:00Z",
    image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    highlights: [
      "Horizon Trade Group is piloting digital customs clearance.",
      "Two border crossings are included in the trial.",
      "Early goal is shorter dwell times for cargo.",
      "Scaling depends on agency interoperability.",
    ],
    keyFacts: [
      { label: "Company", value: "Horizon Trade Group" },
      { label: "Location", value: "Nairobi" },
      { label: "Pilot", value: "Paperless clearance" },
      { label: "Next watch", value: "Dwell-time results" },
    ],
  },
];

export function industrySupplyChainArticlePath(id: string) {
  return `/supply-chain#${id}`;
}
