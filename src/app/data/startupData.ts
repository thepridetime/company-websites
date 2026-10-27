import img_ai_startups_hero from "../../imports/ai-startups-hero.jpg";
import img_space_tech_rocket from "../../imports/space-tech-rocket.jpg";
import img_warehouse_robotics from "../../imports/warehouse-robotics.png";
import img_fintech_expansion from "../../imports/fintech-expansion.jpg";
import img_quantum_chip from "../../imports/quantum-computing-chip.jpg";

export interface StartupStory {
  id: string;
  category: string;
  location?: string;
  title: string;
  summary: string;
  publishedAt: string;
  readTime: string;
  image: string;
  url?: string;
}

export interface FundedCompany {
  id: string;
  name: string;
  focus: string;
  amount: string;
  round: string;
  iconType: "chip" | "robot" | "quantum" | "battery" | "leaf" | "star";
  url?: string;
}

export interface StartupMetric {
  id: string;
  value: string;
  label: string;
  change: string;
  changePeriod: string;
  iconType: "funding" | "deals" | "unicorns" | "deeptech";
}

/* =========================================================
   FEATURED LEAD STORY
   (Text and links come from existing articles in the data folder)
========================================================= */
export const defaultFeaturedStartup: StartupStory = {
  id: "manufacturing-mind-robotics-500m",
  category: "ROBOTICS",
  title: "Mind Robotics Raises $500M Series A to Address Western Manufacturing Labor Shortages",
  summary:
    "The Rivian spin-off is using large-scale venture funding to develop robotics for manufacturers facing persistent labor shortages across Western markets.",
  publishedAt: "September 29, 2026",
  readTime: "8 min read",
  image: img_warehouse_robotics,
  url: "/article/manufacturing-mind-robotics-500m",
};

/* =========================================================
   STARTUP WATCH (UPPER RIGHT)
========================================================= */
export const defaultStartupWatch: StartupStory = {
  id: "world-starlink-gen3-global",
  category: "TECHNOLOGY",
  title: "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
  summary:
    "The latest satellite constellation expansion brings high-speed internet to more regions across Africa, South Asia, and Latin America.",
  publishedAt: "September 26, 2026",
  readTime: "7 min read",
  image: img_space_tech_rocket,
  url: "/article/world-starlink-gen3-global",
};

/* =========================================================
   TOP STARTUP STORIES (BELOW LEAD)
========================================================= */
export const defaultTopStartupStories: StartupStory[] = [
  {
    id: "market-zerodha-unicorn",
    category: "INDIA · BROKING",
    title: "Zerodha Is India's Most Valuable Unicorn at $9 Billion, and It Never Raised Outside Capital",
    summary:
      "The discount stockbroker tops India's unicorn list in the Hurun Global Unicorn Index 2026 on the strength of its own profits. Here is how the model works and where the risks sit.",
    publishedAt: "October 5, 2026",
    readTime: "6 min read",
    image: img_fintech_expansion,
    url: "/article/market-zerodha-unicorn",
  },
  {
    id: "world-quantum-1000-qubit",
    category: "TECHNOLOGY",
    title: "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
    summary:
      "A reported 1,000-qubit milestone highlights the rapid development of quantum hardware and the continuing challenge of making systems commercially useful.",
    publishedAt: "September 26, 2026",
    readTime: "7 min read",
    image: img_quantum_chip,
    url: "/article/world-quantum-1000-qubit",
  },
];

/* =========================================================
   STARTUP METRICS
========================================================= */
export const defaultStartupMetrics: StartupMetric[] = [
  {
    id: "total-funding",
    value: "$2.8 billion",
    label: "Total startup funding in October 2026",
    change: "↑ 18%",
    changePeriod: "vs. Sep 2026",
    iconType: "funding",
  },
  {
    id: "new-deals",
    value: "42",
    label: "New startup deals announced",
    change: "↑ 27%",
    changePeriod: "vs. Sep 2026",
    iconType: "deals",
  },
  {
    id: "new-unicorns",
    value: "7",
    label: "New unicorns this year",
    change: "↑ 2",
    changePeriod: "vs. 2025",
    iconType: "unicorns",
  },
  {
    id: "deep-tech-share",
    value: "68%",
    label: "Funding share to deep tech",
    change: "↑ 8%",
    changePeriod: "vs. 2025",
    iconType: "deeptech",
  },
];

/* =========================================================
   FUNDING WATCH (BELOW TOP STORIES)
========================================================= */
export const defaultFundedStartups: FundedCompany[] = [
  {
    id: "lumicore",
    name: "LumiCore",
    focus: "Photonics chips for AI data centers",
    amount: "$320M",
    round: "Series C",
    iconType: "star",
  },
  {
    id: "axion-robotics",
    name: "Axion Robotics",
    focus: "Autonomous warehouse robots",
    amount: "$150M",
    round: "Series B",
    iconType: "robot",
  },
  {
    id: "qubitsys",
    name: "QubitSys",
    focus: "Fault-tolerant quantum processors",
    amount: "$200M",
    round: "Series B",
    iconType: "quantum",
  },
  {
    id: "terravolt",
    name: "TerraVolt",
    focus: "Next-gen battery materials",
    amount: "$120M",
    round: "Series A",
    iconType: "battery",
    url: "/energy",
  },
];

/* =========================================================
   LATEST STARTUP NEWS (SIDEBAR BOTTOM)
========================================================= */
export const defaultLatestStartupNews: StartupStory[] = [
  {
    id: "manufacturing-uber-rivian-50000-robotaxis",
    category: "AUTONOMOUS MOBILITY",
    title: "Uber and Rivian Target 50,000 Autonomous Robotaxis by 2031 With More Than $1B of Planned Uber Investment",
    summary:
      "The partnership connects autonomous vehicle manufacturing, fleet deployment and the capital requirements of scaling a large robotaxi network.",
    publishedAt: "September 29, 2026",
    readTime: "8 min read",
    image: img_ai_startups_hero,
    url: "/article/manufacturing-uber-rivian-50000-robotaxis",
  },
];
