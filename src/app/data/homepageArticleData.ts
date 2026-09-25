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
  author: string;
  publishedAt: string;
  angle: string;
  highlights: string[];
};

const storySeeds: StorySeed[] = [
  {
    title: "India's Derivatives Trading Falls Most Since 2024 as Taxes Bite",
    category: "Markets | India",
    dek: "India's derivatives market is absorbing a sharp reset as higher transaction costs push traders to rethink leverage, turnover and risk.",
    image: HeroImg,
    author: "Priya Menon",
    publishedAt: "September 22, 2026",
    angle: "the tax-led shift in derivatives activity",
    highlights: ["Trading volumes have dropped sharply from earlier peaks", "Higher costs are changing short-term trading strategies", "The reset could reward more disciplined, longer-horizon investors"],
  },
  {
    title: "Indian Small-Caps Enter Bull Market After 21% Rally From March Lows",
    category: "Markets",
    dek: "A broad recovery in smaller Indian companies is bringing fresh optimism to a segment investors had treated cautiously for much of the year.",
    image: LN4Img,
    author: "Rohan Shah",
    publishedAt: "September 22, 2026",
    angle: "the return of risk appetite in India's small-cap universe",
    highlights: ["The segment has rallied 21% from its March low", "Domestic flows are supporting breadth beyond large caps", "Analysts still see valuation and liquidity risks"],
  },
  {
    title: "JPMorgan CEO Dimon Says India's Outlook Is Strong but Tax Rules Worry Investors",
    category: "Business",
    dek: "Jamie Dimon sees durable growth potential in India, but warns that policy complexity can make investors hesitate at the margin.",
    image: InsImg,
    author: "Ananya Rao",
    publishedAt: "September 22, 2026",
    angle: "the balance between India's growth story and investor certainty",
    highlights: ["Long-term demand and demographics remain key strengths", "Tax and regulatory uncertainty are raising the cost of patience", "Global investors are watching policy execution closely"],
  },
  {
    title: "Alibaba Unveils AI Chip as It Targets Global Data Centre Expansion",
    category: "Technology",
    dek: "Alibaba is pairing a new artificial-intelligence chip with an ambitious data-centre push as Chinese technology companies build more of their own stack.",
    image: HeroImg,
    author: "Mei Lin",
    publishedAt: "September 22, 2026",
    angle: "the race to build an end-to-end AI infrastructure platform",
    highlights: ["The chip is designed to support Alibaba's cloud ambitions", "Data-centre capacity is becoming a strategic advantage", "The move adds pressure to an increasingly competitive market"],
  },
  {
    title: "India's Gold Import Standstill Threatens Supply",
    category: "Markets | Commodities",
    dek: "A pause in gold imports is tightening an important supply channel just as Indian buyers and jewellers prepare for a seasonally stronger period.",
    image: HeroImg,
    author: "Kavya Iyer",
    publishedAt: "September 22, 2026",
    angle: "the pressure building across India's gold supply chain",
    highlights: ["Import disruption is creating uncertainty for refiners and jewellers", "Premiums and inventories are becoming more important signals", "Demand may remain resilient despite higher prices"],
  },
  {
    title: "India and Vietnam Deepen AI and Defense Cooperation as Leaders Meet",
    category: "Technology | World",
    dek: "India and Vietnam are expanding cooperation around artificial intelligence, digital infrastructure and defense as both governments deepen a broader strategic partnership.",
    image: LN4Img,
    author: "The Pride Times Desk",
    publishedAt: "September 22, 2026",
    angle: "the growing role of technology in India–Vietnam strategic cooperation",
    highlights: [
      "AI cooperation is becoming part of a wider strategic relationship",
      "Defense and digital infrastructure are being discussed alongside economic ties",
      "Supply-chain resilience is an important shared priority",
    ],
  },
  {
    title: "India, Vietnam Deepen AI and Defense Ties After Modi-Lam Meeting",
    category: "World",
    dek: "India and Vietnam are widening their strategic partnership, with technology, defense and resilient supply chains at the centre of the relationship.",
    image: LN3Img,
    author: "The Pride Times Desk",
    publishedAt: "September 22, 2026",
    angle: "the strategic logic behind a closer India–Vietnam partnership",
    highlights: ["AI cooperation is moving alongside traditional defense ties", "Both countries want more resilient regional supply chains", "The relationship reflects a wider Indo-Pacific realignment"],
  },
  {
    title: "Sebi Expands AI Use to Combat Market Manipulation and Fraud",
    category: "Markets | Regulation",
    dek: "India's markets regulator is expanding its use of artificial intelligence to spot suspicious behaviour across faster, more complex exchanges.",
    image: EdipickImg,
    author: "Vikram Sethi",
    publishedAt: "September 22, 2026",
    angle: "the regulator's technology-led response to market abuse",
    highlights: ["Automated monitoring can connect signals across multiple venues", "The regulator still needs human review and due process", "Faster detection may improve confidence in the market"],
  },
  {
    title: "Asian Currencies Gain Traction After Defensive Moves",
    category: "Markets | Asia",
    dek: "Asian currencies are finding firmer ground after a period of defensive positioning, as traders reassess growth, rates and regional risk.",
    image: LN3Img,
    author: "Pride Times Markets",
    publishedAt: "September 22, 2026",
    angle: "the return of confidence to Asian foreign-exchange markets",
    highlights: ["Defensive positioning had left many currencies undervalued", "Rate expectations remain the most important swing factor", "Regional trade flows are supporting a more constructive tone"],
  },
  {
    title: "Stocks Rally as Brent Holds Below $100 on Iran Hopes",
    category: "Energy | Markets",
    dek: "Equities are rising as oil prices remain below a psychologically important threshold and investors look for signs of easing geopolitical risk.",
    image: LN4Img,
    author: "Nikhil Varma",
    publishedAt: "September 22, 2026",
    angle: "the relationship between oil, geopolitics and investor confidence",
    highlights: ["Brent below $100 is easing some inflation concerns", "Energy-sensitive sectors are leading the market response", "The rally remains vulnerable to any fresh supply shock"],
  },
  {
    title: "India Clears Loan Guarantee Plan as War Pressures Firms and Airlines",
    category: "Finance | India",
    dek: "A new loan-guarantee plan is intended to keep credit moving to companies and airlines facing an unusually volatile operating environment.",
    image: HeroImg,
    author: "Neha Kapoor",
    publishedAt: "September 21, 2026",
    angle: "the effort to protect credit channels during a period of disruption",
    highlights: ["Guarantees can reduce lenders' reluctance to extend working capital", "Airlines and trade-linked businesses face the most immediate pressure", "Execution will determine whether the plan reaches smaller firms"],
  },
  {
    title: "Dimon Backs Chandrasekaran as Tata Rift Raises Investment Concerns",
    category: "Finance | Leadership",
    dek: "Support for Tata Sons chairman N. Chandrasekaran comes as investors examine how governance tensions could affect one of India's most important business groups.",
    image: Ln1Img,
    author: "Arjun Mehta",
    publishedAt: "September 22, 2026",
    angle: "why governance has become central to the Tata investment story",
    highlights: ["The Tata group remains a major source of investment and jobs", "Boardroom uncertainty can raise the risk premium investors demand", "Leadership continuity is being watched across the conglomerate"],
  },
  {
    title: "India Clears Loan Guarantee Plan as War Pressures Firms and Airlines",
    category: "Energy | Business",
    dek: "The policy response is designed to keep businesses operating while higher fuel, insurance and logistics costs test corporate balance sheets.",
    image: HeroImg,
    author: "The Pride Times Desk",
    publishedAt: "September 21, 2026",
    angle: "how war-related costs are moving from energy markets into company finances",
    highlights: ["Fuel and insurance costs are arriving together", "Working-capital support matters most for transport businesses", "The policy response is also a test of economic resilience"],
  },
  {
    title: "Berger Paints Steps Up Expansion Amid Competition From Birla Opus, JSW Dulux",
    category: "Business | Companies",
    dek: "India's paint industry is entering a more competitive phase as established brands defend distribution, pricing power and premium customers.",
    image: InsImg,
    author: "Sana Qureshi",
    publishedAt: "September 22, 2026",
    angle: "the strategic fight for India's next wave of home-improvement demand",
    highlights: ["New capacity is intensifying competition across regions", "Distribution remains as important as brand recognition", "Premium products may protect margins as rivalry grows"],
  },
  {
    title: "India's Wealthy Youngsters Navigate Factory Floors and Family Offices",
    category: "Business | Next Generation",
    dek: "A new generation of Indian business heirs is moving between operating companies, family offices and technology-led ventures.",
    image: LN4Img,
    author: "Ishita Bhandari",
    publishedAt: "September 22, 2026",
    angle: "the changing role of India's next-generation business leaders",
    highlights: ["Young leaders are seeking operating experience earlier", "Family offices are becoming engines for experimentation", "Succession is being shaped by technology and global exposure"],
  },
  {
    title: "Satya Nadella to Join OpenAI and Nvidia Leaders at Trump-Xi Dinner",
    category: "Technology | Global",
    dek: "The gathering brings together leaders at the centre of the AI economy as governments and companies negotiate the next phase of technology competition.",
    image: HeroImg,
    author: "Daniel Wong",
    publishedAt: "September 22, 2026",
    angle: "the diplomatic and commercial stakes of the AI supply chain",
    highlights: ["AI leaders are increasingly part of high-level economic diplomacy", "Semiconductors and cloud infrastructure remain strategic issues", "Business decisions are being made alongside geopolitical calculations"],
  },
  {
    title: "Alibaba Targets 20 Gigawatts of Global Data Centre Capacity by 2032",
    category: "Technology | Infrastructure",
    dek: "Alibaba's data-centre ambition underscores how much power, capital and connectivity the next generation of cloud computing will require.",
    image: LN3Img,
    author: "Mei Lin",
    publishedAt: "September 22, 2026",
    angle: "the infrastructure economics behind the global AI boom",
    highlights: ["Twenty gigawatts would represent a major global footprint", "Power availability is becoming a constraint on expansion", "Cloud demand is reshaping real-estate and energy planning"],
  },
  {
    title: "ReNew Energy Trims Solar Output in India as Grid Constraints Persist",
    category: "Energy | India",
    dek: "Grid bottlenecks are forcing renewable developers to manage output even as India's demand for cleaner electricity continues to grow.",
    image: InsImg,
    author: "Aditi Rao",
    publishedAt: "September 22, 2026",
    angle: "the infrastructure gap between renewable generation and reliable power delivery",
    highlights: ["Curtailment can reduce the effective return on new projects", "Transmission investment is becoming as urgent as generation", "Storage and flexible demand could ease the bottleneck"],
  },
  {
    title: "Gold and Silver Rise on Iran Optimism and a Weaker Dollar",
    category: "Markets | Commodities",
    dek: "Precious metals are gaining as geopolitical hopes, currency moves and demand for defensive assets pull prices in the same direction.",
    image: LN3Img,
    author: "Pride Times Markets",
    publishedAt: "September 22, 2026",
    angle: "the forces reshaping the precious-metals trade",
    highlights: ["A weaker dollar makes metals more attractive to overseas buyers", "Geopolitical risk is supporting safe-haven demand", "Investors are balancing optimism with continued uncertainty"],
  },
];

export const homepageArticles: HomepageArticle[] = storySeeds.map((story) => ({
  ...story,
  slug: articleSlug(story.title),
  readTime: "6 min read",
  sections: [
    {
      heading: "Why this matters",
      body: `The latest development is more than a single market move. It is a signal about ${story.angle}, at a moment when investors, executives and policymakers are recalibrating their assumptions. The first reaction has been visible in prices and headlines, but the more important story is how the change could influence decisions over the coming quarters.`,
    },
    {
      heading: "The bigger picture",
      body: `For companies and institutions, the adjustment will be measured through capital allocation, operating costs and confidence. Businesses with strong balance sheets and clear strategic priorities are likely to have more room to adapt, while smaller participants may feel the pressure first. That divide is shaping the competitive landscape and creating new winners as well as new risks.`,
    },
    {
      heading: "What to watch next",
      body: `The next phase will depend on policy execution, the durability of demand and whether current pressures prove temporary or structural. Market participants will be watching new data, management commentary and the response from regulators. Those signals should reveal whether this is a short-lived reaction or the beginning of a deeper shift.`,
    },
  ],
}));

export function getHomepageArticleBySlug(slug?: string) {
  return homepageArticles.find((article) => article.slug === slug);
}

