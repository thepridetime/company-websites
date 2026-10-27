import img_ai_startups_hero from "../../imports/ai-startups-hero.jpg";
import img_space_tech_rocket from "../../imports/space-tech-rocket.jpg";
import img_photonics_engineer from "../../imports/photonics-chip-engineer.jpg";
import img_warehouse_robotics from "../../imports/warehouse-robotics.png";
import img_climate_hydrogen from "../../imports/climate-tech-hydrogen.jpg";
import img_health_discovery from "../../imports/health-tech-discovery.jpg";
import img_fintech_expansion from "../../imports/fintech-expansion.jpg";

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
========================================================= */
export const defaultFeaturedStartup: StartupStory = {
  id: "ai-startups-fuel-new-wave-global-innovation",
  category: "STARTUP SUCCESS | GLOBAL",
  title: "AI Startups Fuel a New Wave of Global Innovation",
  summary:
    "From foundation models to vertical AI, startups are attracting record funding and reshaping how businesses and societies operate.",
  publishedAt: "7 October 2026",
  readTime: "5 min read",
  image: img_ai_startups_hero,
  url: "/article/startup-perplexity-ai-1-2b-series-d",
};

/* =========================================================
   STARTUP WATCH (UPPER RIGHT)
========================================================= */
export const defaultStartupWatch: StartupStory = {
  id: "indian-startup-launch-earth-observation-satellites",
  category: "SPACE TECH",
  title: "Indian startup to launch next-gen Earth observation satellites.",
  summary:
    "The startup plans to deploy a new constellation of low-Earth orbit satellites to provide high-resolution climate and infrastructure data.",
  publishedAt: "7 October 2026",
  readTime: "3 min read",
  image: img_space_tech_rocket,
  url: "/article/startup-starlink-gen3-global",
};

/* =========================================================
   TOP STARTUP STORIES (BELOW LEAD)
========================================================= */
export const defaultTopStartupStories: StartupStory[] = [
  {
    id: "photonics-startup-closes-new-funding",
    category: "DEEP TECHNOLOGY",
    title: "Photonics startup closes new funding to scale AI infrastructure",
    summary:
      "Light-based interconnects are attracting major investment as data-center demand rises and AI workloads expand.",
    publishedAt: "7 October 2026",
    readTime: "3 min read",
    image: img_photonics_engineer,
    url: "/article/startup-alphabet-ai-data-center",
  },
  {
    id: "robotics-startups-pilots-to-real-world",
    category: "PHYSICAL AI",
    title: "Robotics startups move from pilots to real-world deployment",
    summary:
      "Companies are securing commercial deals across manufacturing and logistics as automation demand grows.",
    publishedAt: "7 October 2026",
    readTime: "4 min read",
    image: img_warehouse_robotics,
    url: "/article/startup-nvidia-humanoid-robot-push",
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
    url: "/article/startup-meta-llama4-enterprise",
  },
  {
    id: "axion-robotics",
    name: "Axion Robotics",
    focus: "Autonomous warehouse robots",
    amount: "$150M",
    round: "Series B",
    iconType: "robot",
    url: "/article/startup-zepto-10b-valuation",
  },
  {
    id: "qubitsys",
    name: "QubitSys",
    focus: "Fault-tolerant quantum processors",
    amount: "$200M",
    round: "Series B",
    iconType: "quantum",
    url: "/article/startup-quantum-commercial-milestone",
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
    id: "climate-tech-100m-clean-hydrogen",
    category: "CLIMATE TECH",
    title: "Climate tech startup secures $100M to scale clean hydrogen.",
    summary: "Clean hydrogen ventures accelerate commercial infrastructure.",
    publishedAt: "7 October 2026",
    readTime: "3 min read",
    image: img_climate_hydrogen,
    url: "/energy",
  },
  {
    id: "ai-drug-discovery-startup-pharma",
    category: "HEALTH TECH",
    title: "AI drug-discovery startup partners with global pharma giant.",
    summary: "Novel target discovery moves into multi-phase clinical validation.",
    publishedAt: "7 October 2026",
    readTime: "4 min read",
    image: img_health_discovery,
    url: "/healthcare",
  },
  {
    id: "fintech-startup-southeast-asia-licenses",
    category: "FINTECH",
    title: "Fintech startup expands into Southeast Asia with new licenses.",
    summary: "Cross-border payment infrastructure receives regulatory green lights.",
    publishedAt: "7 October 2026",
    readTime: "3 min read",
    image: img_fintech_expansion,
    url: "/finance",
  },
];
