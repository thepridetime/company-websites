
import HeroImg from "../../imports/heroimage.png";
import InsImg from "../../imports/Insightimage.png";
import LN3Img from "../../imports/LN3image.png";
import LN4Img from "../../imports/LN4image.png";
import EdipickImg from "../../imports/Edipickimage.png";
import Ln1Img from "../../imports/Ln1.png";

export type HomepageArticle = {
  slug: string;
  title: string;
  category: string;
  dek: string;
  image: string;
  author: string;
  publishedAt: string;
  readTime: string;
  highlights: string[];
  tags: string[];
  editorNote: string;
  sections: { heading: string; body: string }[];
};

export function articleSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function articlePath(title: string) {
  return `/article/${articleSlug(title)}`;
}

type StorySeed = {
  title: string;
  category: string;
  dek: string;
  image: string;
  angle: string;
  highlights: string[];
  publishedAt: string;
};

const storySeeds: StorySeed[] = [
  {
    title: "Middle East Supply Disruptions Put Global Energy Markets Under Pressure",
    category: "Energy | Global Markets",
    dek: "Oil supply interruptions, tanker-route risks and volatile freight costs are reshaping the global energy outlook, while demand forecasts and inventory trends point to a market facing pressure on several fronts.",
    image: HeroImg,
    publishedAt: "September 2026",
    angle:
      "the interaction between Gulf supply disruption, weaker demand forecasts, inventory drawdowns and higher transport risk",
    highlights: [
      "Gulf supply disruptions cut production by more than 10 million barrels per day at peak",
      "The IEA September outlook forecasts global oil demand falling by 2.5 million barrels per day",
      "Global oil inventories have drawn down 507 million barrels cumulatively since February 2026",
      "Tanker attacks and freight-rate increases are adding volatility to oil logistics",
    ],
  },
  {
    title: "AI Data-Centre Expansion Is Turning Secure Electricity Into a Strategic Constraint",
    category: "Technology | Energy",
    dek: "The next phase of artificial-intelligence infrastructure depends not only on chips and computing capacity, but also on reliable power, grid access and the ability to bring generation and storage online in time.",
    image: InsImg,
    publishedAt: "September 2026",
    angle:
      "the growing dependence of AI infrastructure on electricity supply, grid capacity and energy planning",
    highlights: [
      "Data-centre electricity demand is projected to approach 1,000 TWh by 2030",
      "Secure power access is increasingly outpacing construction readiness as a constraint",
      "Grid bottlenecks are delaying new AI data-centre capacity",
      "Developers are being pushed to secure generation and storage earlier in project planning",
    ],
  },
  {
    title: "Global Supply Chains Reconfigure as Nearshoring and Geopolitical Risk Rise",
    category: "Supply Chain | Global Trade",
    dek: "Companies are reassessing sourcing, logistics and inventory strategies as geopolitical fragmentation, tariffs, commodity costs and AI-enabled procurement reshape the economics of global trade.",
    image: LN3Img,
    publishedAt: "September 2026",
    angle:
      "the shift from lowest-cost sourcing toward more resilient and diversified supply networks",
    highlights: [
      "Global goods trade reached approximately $13.7 trillion in the first half of 2026",
      "China-plus-one, nearshoring and friendshoring strategies are accelerating",
      "Trade growth partly reflects higher prices rather than equivalent volume growth",
      "Middle East freight disruption and semiconductor complexity remain key risk factors",
    ],
  },
  {
    title: "AI Moves From Assistive Tools to Autonomous Enterprise Workflows",
    category: "Technology | Artificial Intelligence",
    dek: "Artificial intelligence is moving deeper into business operations, with agentic systems and embedded procurement tools entering workflows across finance, logistics, healthcare and industrial activity.",
    image: LN4Img,
    publishedAt: "September 2026",
    angle:
      "the transition from employee-facing AI assistance toward systems that can coordinate and execute multi-step work",
    highlights: [
      "Agentic AI and embedded procurement tools are entering enterprise workflows",
      "AI adoption is shifting from assistive applications toward autonomous systems",
      "The U.S.–China competition combines model capability with deployment scale",
      "Regulatory frameworks are evolving alongside broader AI adoption",
    ],
  },
  {
    title: "Cybersecurity Teams Face a Shorter Window to Patch Critical Vulnerabilities",
    category: "Cybersecurity | Critical Infrastructure",
    dek: "AI is accelerating both cyberattacks and defensive capabilities, increasing pressure on organizations to identify, prioritize and remediate vulnerabilities before they can be exploited.",
    image: EdipickImg,
    publishedAt: "September 2026",
    angle:
      "the shrinking response window between vulnerability disclosure and exploitation",
    highlights: [
      "A 48-hour patching window for many critical flaws is becoming an industry standard",
      "AI is helping attackers weaponize vulnerabilities more quickly",
      "Utilities, power grids and manufacturing are among the exposed critical systems",
      "Governments are accelerating cybersecurity requirements for critical infrastructure",
    ],
  },
  {
    title: "Healthcare Supply Chains Turn to AI for Forecasting and Resilience",
    category: "Healthcare | Supply Chain",
    dek: "Hospitals and healthcare suppliers are investing in software-led systems to improve inventory visibility, demand forecasting and supplier-risk management as costs and traceability requirements rise.",
    image: Ln1Img,
    publishedAt: "September 2026",
    angle:
      "the move toward more visible, software-enabled and resilient healthcare supply networks",
    highlights: [
      "The global healthcare supply-chain market was valued at $3.20 billion in 2025",
      "The market is forecast to reach $8.60 billion by 2034",
      "Software-led solutions account for 58% of the market and cloud delivery 56%",
      "AI is supporting real-time inventory visibility and supplier-risk monitoring",
    ],
  },
  {
    title: "Manufacturers Accelerate Robotics and AI as Tariffs and Labour Costs Bite",
    category: "Manufacturing | Industry",
    dek: "Manufacturers are weighing tariff uncertainty, labour shortages and energy costs against investment in robotics, digital twins and domestic supplier networks.",
    image: LN4Img,
    publishedAt: "September 2026",
    angle:
      "the effort to improve manufacturing productivity while rebuilding supply-chain resilience",
    highlights: [
      "Hyundai plans to source 80% of vehicle parts from U.S. suppliers by 2030",
      "Mind Robotics raised a $500 million Series A to address manufacturing labour shortages",
      "Uber and Rivian announced a robotaxi partnership targeting 50,000 vehicles by 2031",
      "Advanced chip packaging is increasing the importance of earlier fault detection",
    ],
  },
  {
    title: "Smart-City Investment Converges Around AI, Grid Modernisation and Mobility",
    category: "Smart Cities | Infrastructure",
    dek: "Urban infrastructure plans are increasingly linking AI platforms with energy management, public safety, EV charging, autonomous mobility and more connected logistics networks.",
    image: InsImg,
    publishedAt: "September 2026",
    angle:
      "the integration of digital platforms with the physical systems that keep cities operating",
    highlights: [
      "AI platforms are expanding into retail analytics, healthcare monitoring and public safety",
      "Grid modernisation is central to EV charging and data-centre integration",
      "Robotaxis and delivery drones are reshaping urban logistics planning",
      "Cross-border storage and logistics capacity is expanding in Southeast Asia",
    ],
  },
  {
    title: "Global Growth Outlook Faces Pressure From Energy Disruption and Fragmentation",
    category: "World | Geopolitics",
    dek: "The 2026 global outlook is being shaped by energy-market disruption, trade fragmentation and uneven regional exposure, with emerging economies particularly sensitive to commodity prices and dollar financing costs.",
    image: HeroImg,
    publishedAt: "September 2026",
    angle:
      "the transmission of geopolitical and commodity shocks into growth, inflation and financing conditions",
    highlights: [
      "The World Bank projects global growth slowing to 2.5% in 2026",
      "The IMF baseline cited in the report is 3.1% global growth",
      "Emerging markets face exposure to commodity volatility and dollar financing costs",
      "Energy and food security, inflation and fiscal sustainability remain central policy priorities",
    ],
  },
  {
    title: "U.S.–China AI Competition Expands From Models to Global Infrastructure",
    category: "World | Technology & Geopolitics",
    dek: "The technology contest between the United States and China increasingly spans semiconductors, data-centre infrastructure, energy, mobility and industrial deployment.",
    image: LN3Img,
    publishedAt: "September 2026",
    angle:
      "the different strategic strengths of advanced AI model development and large-scale technology deployment",
    highlights: [
      "The U.S. is building leading model capabilities",
      "China is pursuing deployment scale and infrastructure foundations",
      "Semiconductors and energy access remain strategic inputs",
      "Businesses are factoring geopolitical risk into investment and sourcing decisions",
    ],
  },
  {
    title: "Central Banks Reassess Reserve Exposure as Gold Gains Strategic Attention",
    category: "Markets | Forex & Commodities",
    dek: "Reserve managers are diversifying holdings amid geopolitical and financial risk, while currency and government-bond markets reflect diverging central-bank policy paths.",
    image: EdipickImg,
    publishedAt: "September 2026",
    angle:
      "the relationship between reserve diversification, gold demand, currency exposure and global financial risk",
    highlights: [
      "Central banks are increasing gold holdings as a hedge against geopolitical and financial risk",
      "The U.S. dollar's share of central-bank holdings has declined as diversification continues",
      "Government bond markets reflect diverging central-bank policy paths",
      "Inflation remains elevated in several major economies",
    ],
  },
  {
    title: "Autonomous Systems Move Into Mobility, Warehousing and Industrial Operations",
    category: "Innovation | CEO Spotlight",
    dek: "Autonomous robotics, robotaxis and AI-enabled industrial systems are becoming central themes in investment decisions across manufacturing, transport and logistics.",
    image: LN4Img,
    publishedAt: "September 2026",
    angle:
      "the expansion of autonomous systems from technology demonstrations into business operations",
    highlights: [
      "Mind Robotics is targeting labour shortages with autonomous robotics",
      "Uber and Rivian announced plans for 50,000 autonomous robotaxis by 2031",
      "Manufacturers are investing in AI, robotics and digital-twin technology",
      "Supply-chain operators are expanding warehouse and data-centre logistics capacity",
    ],
  },
];

const editorialSections = [
  {
    heading: "The story behind the development",
    body: (story: StorySeed) =>
      `The central issue is ${story.angle}. The report places this development within a wider operating environment in which companies, investors and policymakers are adjusting to changes in costs, infrastructure, technology and geopolitical risk. The headline is the entry point; the underlying mechanisms explain why the issue matters across sectors.`,
  },
  {
    heading: "The evidence and key signals",
    body: (story: StorySeed) =>
      `${story.highlights[0]}. ${story.highlights[1]}. These indicators show how the issue is developing and where pressure or opportunity is accumulating. They should be read together rather than as isolated data points, because decisions in one part of the system can affect costs, capacity and confidence elsewhere.`,
  },
  {
    heading: "What it means for business and markets",
    body: (story: StorySeed) =>
      `For businesses, the practical questions concern investment timing, operating resilience, access to infrastructure and exposure to policy or supply disruption. For investors and readers, the report's signals provide a framework for tracking how the trend moves from headline coverage into measurable commercial and economic effects.`,
  },
  {
    heading: "What to watch next",
    body: (story: StorySeed) =>
      `The next stage should be assessed through new data, policy execution, company investment plans and evidence of whether the pressures described here are easing or becoming structural. The key indicators to follow are: ${story.highlights
        .slice(0, 3)
        .join("; ")}.`,
  },
];

export const homepageArticles: HomepageArticle[] = storySeeds.map((story) => ({
  ...story,
  slug: articleSlug(story.title),
  author: "Sagar Kumar",
  readTime: story.highlights.length >= 4 ? "7 min read" : "6 min read",
  tags: [story.category.split("|")[0].trim(), "Analysis", "The Pride Times"],
  editorNote:
    "This report-led Pride Times briefing connects the immediate development with the wider market, industry and geopolitical forces shaping the story.",
  sections: editorialSections.map((section) => ({
    heading: section.heading,
    body: section.body(story),
  })),
}));

export function getHomepageArticleBySlug(slug?: string) {
  return homepageArticles.find((article) => article.slug === slug);
}
