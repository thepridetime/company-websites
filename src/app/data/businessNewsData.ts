/* =========================================================
   BUSINESS NEWS — SHARED DATA
   The Pride Times
========================================================= */

export type BusinessArticle = {
  id: string;
  category: string;
  title: string;
  excerpt?: string;
  author: string;
  time: string;
  image?: string;
  highlights: string[];
  sections: { heading: string; body: string }[];
};

const editorial = (
  title: string,
  category: string,
  excerpt: string,
  time: string,
  image?: string,
  highlights: string[] = [],
  sections: { heading: string; body: string }[] = []
): BusinessArticle => ({
  id: title === HERO_TITLE ? "biz-hero" : "",
  category,
  title,
  excerpt,
  author: "Sagar Kumar",
  time,
  image,
  highlights,
  sections,
});

const HERO_TITLE =
  "The Great Corporate AI Arms Race: How Fortune 500 Companies Are Spending $2.3 Trillion to Win the Intelligence Economy";

export const hero: BusinessArticle = {
  id: "biz-hero",
  category: "CORPORATE STRATEGY",
  title: HERO_TITLE,
  excerpt:
    "Microsoft, Google, Amazon, Meta and Apple have collectively committed $2.3 trillion in AI investment through 2030. Every sector — from banking to retail, healthcare to manufacturing — is being redrawn.",
  author: "Sagar Kumar",
  time: "2 hours ago",
  image:
    "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  highlights: [
    "Large technology companies are committing unprecedented capital to artificial intelligence infrastructure.",
    "AI investment is increasingly affecting hiring, cloud demand, data centers and enterprise strategy.",
    "The next phase will be shaped by measurable productivity gains, costs and regulatory decisions.",
    "Executives are balancing long-term technology bets against near-term shareholder expectations.",
  ],
  sections: [
    {
      heading: "A new corporate spending cycle",
      body:
        "Artificial intelligence has moved from a specialist technology budget into the core investment plans of the world's largest companies. Spending now touches computing capacity, data centers, software, talent and acquisitions, creating a capital cycle that extends well beyond experimental projects.",
    },
    {
      heading: "Why infrastructure is at the center",
      body:
        "The biggest commitments are tied to the physical and digital infrastructure required to train and run advanced models. Cloud capacity, specialized processors, networking and electricity have become strategic inputs, while companies compete to secure supply before demand accelerates further.",
    },
    {
      heading: "The pressure on business models",
      body:
        "Investors are watching whether these investments translate into higher revenue, lower costs or new products. That question is particularly important for companies spending heavily before the financial benefits are fully visible in quarterly results.",
    },
    {
      heading: "What comes next",
      body:
        "The next stage of the corporate AI race will be measured less by announcements and more by deployment. Product adoption, recurring revenue, productivity improvements and disciplined capital allocation will provide clearer evidence of which strategies are working.",
    },
  ],
};

export const maDeals = [
  { id: 1, acquirer: "Amazon", target: "NuScale Power", value: "$12B", sector: "Nuclear Energy", status: "Announced" },
  { id: 2, acquirer: "Microsoft", target: "IonQ", value: "$8.7B", sector: "Quantum Computing", status: "Pending" },
  { id: 3, acquirer: "BlackRock", target: "Global Infrastructure Partners", value: "$12.5B", sector: "Infrastructure", status: "Closed" },
  { id: 4, acquirer: "JPMorgan", target: "First Republic (Assets)", value: "$10.6B", sector: "Banking", status: "Closed" },
  { id: 5, acquirer: "Reliance", target: "Disney India", value: "$8.5B", sector: "Media / Streaming", status: "Closed" },
];

export const earningsNews = [
  { id: 1, company: "Apple", ticker: "AAPL", eps: "$2.45", beat: "+12%", revenue: "$98.3B", status: "BEAT" },
  { id: 2, company: "Microsoft", ticker: "MSFT", eps: "$3.12", beat: "+8%", revenue: "$71.2B", status: "BEAT" },
  { id: 3, company: "Alphabet", ticker: "GOOGL", eps: "$2.89", beat: "+15%", revenue: "$88.3B", status: "BEAT" },
  { id: 4, company: "Meta", ticker: "META", eps: "$6.43", beat: "+23%", revenue: "$41.5B", status: "BEAT" },
  { id: 5, company: "Amazon", ticker: "AMZN", eps: "$1.91", beat: "+5%", revenue: "$187.8B", status: "BEAT" },
  { id: 6, company: "Intel", ticker: "INTC", eps: "$0.18", beat: "-8%", revenue: "$12.4B", status: "MISS" },
];

const commonSections = (focus: string) => [
  {
    heading: "The development",
    body: `${focus} is part of a broader corporate story being watched by investors, employees and customers. The immediate announcement provides one data point, but its significance will depend on execution, market demand and how competitors respond.`,
  },
  {
    heading: "Why businesses are watching",
    body:
      "Corporate decisions increasingly connect technology, capital allocation and operating strategy. Executives are looking for measurable gains while managing costs, competition and the uncertainty that can accompany large strategic moves.",
  },
  {
    heading: "The wider context",
    body:
      "The most useful signals over the coming quarters will be new guidance, investment plans, customer demand and evidence that the strategy is changing operating results. Those indicators can provide a clearer picture than a single announcement.",
  },
  {
    heading: "What to watch next",
    body:
      "Readers should watch for follow-up filings, company announcements, financing activity and changes in management guidance. These developments will show whether the initial headline develops into a longer-term business shift.",
  },
];

const makeArticle = (
  id: string,
  category: string,
  title: string,
  time: string,
  focus: string
): BusinessArticle => ({
  id,
  category,
  title,
  author: "Sagar Kumar",
  time,
  excerpt: `${focus} The development is being followed for its potential effect on corporate strategy, investment and the wider business environment.`,
  highlights: [
    `The central development is ${focus.toLowerCase()}.`,
    "Management strategy and capital allocation will remain important signals.",
    "Competitor and customer responses could shape the next phase.",
    "Further disclosures will provide more evidence about the longer-term impact.",
  ],
  sections: commonSections(focus),
});

export const corporateNews: BusinessArticle[] = [
  makeArticle("biz-corp-1", "LUXURY", "LVMH Posts €21B Revenue — Luxury Demand Defies Global Economic Uncertainty", "1 hr ago", "LVMH has reported €21 billion in revenue"),
  makeArticle("biz-corp-2", "RETAIL", "Walmart Launches AI-Powered Supply Chain Platform — 50,000 Suppliers Enrolled", "2 hrs ago", "Walmart has launched an AI-powered supply-chain platform"),
  makeArticle("biz-corp-3", "ENERGY", "Saudi Aramco Overtakes Apple as World's Most Profitable Company in Q1 2026", "3 hrs ago", "Saudi Aramco has reported profit levels that put it ahead of Apple"),
  makeArticle("biz-corp-4", "AEROSPACE", "Boeing's 737 MAX Returns to Full Delivery Schedule After 18-Month Production Fix", "4 hrs ago", "Boeing is moving toward a fuller 737 MAX delivery schedule"),
  makeArticle("biz-corp-5", "TELECOM", "Reliance Jio Surpasses 500 Million Subscribers — World's Largest Telecom by Users", "5 hrs ago", "Reliance Jio has crossed 500 million subscribers"),
  makeArticle("biz-corp-6", "BANKING", "Goldman Sachs CEO David Solomon Takes Personal Pay Cut After Criticism of $30B Losses", "6 hrs ago", "Goldman Sachs CEO David Solomon has taken a personal pay reduction amid criticism"),
];

export const startupNews: BusinessArticle[] = [
  makeArticle("biz-startup-1", "STARTUPS", "Anthropic Raises $4B Series E at $40B Valuation — AI Safety Startup Now Among World's Most Valuable", "2 hrs ago", "Anthropic has raised a $4 billion Series E at a reported $40 billion valuation"),
  makeArticle("biz-startup-2", "STARTUPS", "Indian SaaS Startup Freshworks Acquires Two US Companies in $1.2B Deal", "4 hrs ago", "Freshworks has announced acquisitions involving two US companies"),
  makeArticle("biz-startup-3", "STARTUPS", "Rapido Raises $250M as India's Bike-Taxi Market Explodes to 50M Monthly Rides", "6 hrs ago", "Rapido has raised $250 million as India's bike-taxi market expands"),
  makeArticle("biz-startup-4", "STARTUPS", "SpaceX Valuation Hits $350B — Overtakes Boeing and Airbus Combined", "8 hrs ago", "SpaceX has reached a reported $350 billion valuation"),
];

export const businessArticles: BusinessArticle[] = [hero, ...corporateNews, ...startupNews];

export function getBusinessArticleById(id: string | undefined) {
  return businessArticles.find((a) => a.id === id);
}

export function getRelatedBusinessArticles(article: BusinessArticle, limit = 4) {
  return businessArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, limit);
}
