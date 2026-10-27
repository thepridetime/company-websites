import img_innovation_hero_ai from "../../imports/innovation-hero-ai.jpg";
import img_semiconductor_ai_chip from "../../imports/semiconductor-ai-chip.jpg";
import img_humanoid_robot_factory from "../../imports/humanoid-robot-factory.jpg";
import img_satellite_orbit_space from "../../imports/satellite-orbit-space.jpg";
import img_quantum_computing_chip from "../../imports/quantum-computing-chip.jpg";

export interface InnovationStory {
  id: string;
  category: string;
  location?: string;
  title: string;
  summary?: string;
  publishedAt: string;
  readTime: string;
  image: string;
  url?: string;
}

export interface InnovationFeaturedStoryData {
  id: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  url?: string;
}

export interface MarketIndexItem {
  symbol: string;
  value: string;
  change: string;
  up: boolean;
  sparkline: number[];
}

export interface InnovationMetric {
  id: string;
  value: string;
  label: string;
  change: string;
  changePeriod: string;
  iconType: "capex" | "revenue" | "exports" | "funding";
}

/* =========================================================
   FEATURED INNOVATION STORY (LEFT COLUMN)
   (Text and links come from existing articles in the data folder)
========================================================= */
export const defaultFeaturedInnovation: InnovationFeaturedStoryData = {
  id: "manufacturing-ai-hardware-production",
  category: "AI HARDWARE",
  title: "AI Hardware Demand Raises the Importance of Advanced Manufacturing Quality Control",
  summary:
    "The expansion of AI hardware production increases pressure on manufacturers to improve process visibility, defect detection and yield management.",
  image: img_innovation_hero_ai,
  url: "/article/manufacturing-ai-hardware-production",
};

/* =========================================================
   TOP INNOVATION STORIES (MIDDLE COLUMN)
========================================================= */
export const defaultTopInnovationStories: InnovationStory[] = [
  {
    id: "manufacturing-mind-robotics-500m",
    category: "ROBOTICS",
    title: "Mind Robotics Raises $500M Series A to Address Western Manufacturing Labor Shortages",
    summary:
      "The Rivian spin-off is using large-scale venture funding to develop robotics for manufacturers facing persistent labor shortages across Western markets.",
    publishedAt: "September 29, 2026",
    readTime: "8 min read",
    image: img_humanoid_robot_factory,
    url: "/article/manufacturing-mind-robotics-500m",
  },
  {
    id: "world-quantum-1000-qubit",
    category: "QUANTUM COMPUTING",
    title: "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
    summary:
      "A reported 1,000-qubit milestone highlights the rapid development of quantum hardware and the continuing challenge of making systems commercially useful.",
    publishedAt: "September 26, 2026",
    readTime: "7 min read",
    image: img_quantum_computing_chip,
    url: "/article/world-quantum-1000-qubit",
  },
  {
    id: "manufacturing-ai-robotics-digital-twins",
    category: "SMART MANUFACTURING",
    title: "AI, Robotics and Digital Twins Transform Factory Operations",
    summary:
      "Smart manufacturing combines artificial intelligence, robotics and digital-twin technology to improve production planning, maintenance, quality control and factory simulation.",
    publishedAt: "September 29, 2026",
    readTime: "8 min read",
    image: img_semiconductor_ai_chip,
    url: "/article/manufacturing-ai-robotics-digital-twins",
  },
];

/* =========================================================
   MARKET SNAPSHOT DATA (BELOW MIDDLE STORIES)
========================================================= */
export const defaultMarketSnapshot: Record<"Indices" | "Commodities" | "Crypto" | "Currencies", MarketIndexItem[]> = {
  Indices: [
    {
      symbol: "S&P 500",
      value: "5,892.31",
      change: "+1.14%",
      up: true,
      sparkline: [40, 45, 42, 48, 55, 52, 60, 68, 75],
    },
    {
      symbol: "NASDAQ",
      value: "19,245.78",
      change: "+1.56%",
      up: true,
      sparkline: [35, 38, 45, 50, 48, 62, 65, 78, 85],
    },
    {
      symbol: "DOW JONES",
      value: "42,318.45",
      change: "+0.82%",
      up: true,
      sparkline: [50, 52, 49, 54, 58, 56, 62, 65, 70],
    },
    {
      symbol: "RUSSELL 2000",
      value: "2,134.56",
      change: "+0.45%",
      up: true,
      sparkline: [45, 48, 52, 50, 56, 58, 62, 65, 68],
    },
  ],
  Commodities: [
    {
      symbol: "BRENT CRUDE",
      value: "78.42",
      change: "+0.65%",
      up: true,
      sparkline: [45, 48, 47, 50, 53, 52, 56, 58, 60],
    },
    {
      symbol: "GOLD (OZ)",
      value: "2,654.10",
      change: "+0.42%",
      up: true,
      sparkline: [50, 52, 51, 55, 57, 56, 60, 62, 64],
    },
    {
      symbol: "COPPER (LB)",
      value: "4.38",
      change: "-0.85%",
      up: false,
      sparkline: [60, 58, 55, 56, 52, 50, 48, 47, 45],
    },
    {
      symbol: "NATURAL GAS",
      value: "2.84",
      change: "+2.16%",
      up: true,
      sparkline: [30, 35, 32, 40, 45, 42, 52, 58, 65],
    },
  ],
  Currencies: [
    {
      symbol: "EUR / USD",
      value: "1.0845",
      change: "+0.18%",
      up: true,
      sparkline: [40, 42, 45, 43, 48, 52, 50, 55, 58],
    },
    {
      symbol: "USD / JPY",
      value: "149.25",
      change: "-0.35%",
      up: false,
      sparkline: [60, 58, 55, 57, 52, 48, 50, 46, 44],
    },
    {
      symbol: "GBP / USD",
      value: "1.2980",
      change: "+0.24%",
      up: true,
      sparkline: [38, 40, 44, 46, 45, 50, 52, 56, 60],
    },
    {
      symbol: "USD / CNY",
      value: "7.1240",
      change: "+0.05%",
      up: true,
      sparkline: [48, 49, 50, 49, 51, 50, 52, 51, 53],
    },
  ],
  Crypto: [
    {
      symbol: "BITCOIN",
      value: "67,420.00",
      change: "+2.45%",
      up: true,
      sparkline: [40, 42, 48, 45, 55, 60, 68, 72, 80],
    },
    {
      symbol: "ETHEREUM",
      value: "2,640.50",
      change: "+1.88%",
      up: true,
      sparkline: [45, 48, 46, 52, 54, 58, 64, 66, 72],
    },
    {
      symbol: "SOLANA",
      value: "154.20",
      change: "+4.12%",
      up: true,
      sparkline: [35, 40, 38, 48, 56, 62, 68, 75, 85],
    },
    {
      symbol: "RIPPLE",
      value: "0.542",
      change: "-0.62%",
      up: false,
      sparkline: [55, 52, 54, 50, 48, 49, 46, 45, 43],
    },
  ],
};

/* =========================================================
   NUMBERS AT A GLANCE (UPPER RIGHT)
========================================================= */
export const defaultInnovationMetrics: InnovationMetric[] = [
  {
    id: "ai-infrastructure-spending",
    value: "$130.6 billion",
    label: "AI infrastructure capex, Q1 2026",
    change: "+28%",
    changePeriod: "vs. Q1 2025",
    iconType: "capex",
  },
  {
    id: "data-center-revenue",
    value: "$75.2 billion",
    label: "Nvidia data-center revenue (fiscal Q1 FY27)",
    change: "+92%",
    changePeriod: "vs. Q1 FY26",
    iconType: "revenue",
  },
  {
    id: "semiconductor-exports",
    value: "$60 billion",
    label: "South Korea chip exports, September 2026",
    change: "+262%",
    changePeriod: "y/y",
    iconType: "exports",
  },
  {
    id: "deeptech-vc-share",
    value: "18%",
    label: "Share of global VC funding in deep tech",
    change: "+6 pp",
    changePeriod: "vs. 2025",
    iconType: "funding",
  },
];

/* =========================================================
   LATEST IN INNOVATION (LOWER RIGHT)
========================================================= */
export const defaultLatestInnovationNews: InnovationStory[] = [
  {
    id: "world-starlink-gen3-global",
    category: "SPACE TECH",
    title: "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
    summary:
      "The latest satellite expansion is aimed at increasing high-speed connectivity across regions where conventional broadband remains difficult to deploy.",
    publishedAt: "September 26, 2026",
    readTime: "7 min read",
    image: img_satellite_orbit_space,
    url: "/article/world-starlink-gen3-global",
  },
];
