/* =========================================================
   TECHNOLOGY NEWS — SHARED DATA
   The Pride Times
========================================================= */

export type TechnologyArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  image: string;
  highlights: string[];
  sections: { heading: string; body: string }[];
};

const sectionsFor = (focus: string) => [
  {
    heading: "The development",
    body:
      `${focus} is part of a technology market increasingly shaped by artificial intelligence, infrastructure spending and the search for scalable digital products. The immediate announcement provides a useful snapshot of where companies are directing capital and attention.`,
  },
  {
    heading: "Why it matters",
    body:
      "Technology stories increasingly have effects beyond the technology sector. Financing conditions, computing demand, enterprise adoption and regulatory decisions can influence investment, hiring and the pace at which new products reach customers.",
  },
  {
    heading: "The infrastructure question",
    body:
      "Advanced software depends on infrastructure ranging from chips and data centers to cloud platforms and power. As adoption grows, companies must balance performance and availability against the cost of building and operating that infrastructure.",
  },
  {
    heading: "What comes next",
    body:
      "The next stage will be visible through customer adoption, new funding, product launches, company guidance and regulatory developments. Those measurable signals will help show whether the current momentum becomes a durable technology trend.",
  },
];

const makeArticle = (
  id: string,
  category: string,
  title: string,
  excerpt: string,
  publishedAt: string,
  image: string,
  focus: string
): TechnologyArticle => ({
  id,
  category,
  title,
  excerpt,
  author: "Sagar Kumar",
  publishedAt,
  image,
  highlights: [
    `The central development is ${focus}.`,
    "Capital, infrastructure and customer demand remain key factors.",
    "Competitor responses could influence the next stage of the market.",
    "New company disclosures will provide the clearest evidence of momentum.",
  ],
  sections: sectionsFor(focus),
});

export const technologyArticles: TechnologyArticle[] = [
  makeArticle(
    "tech-pagaya",
    "TECHNOLOGY",
    "Pagaya Closes $460 Million Revolving Personal Loan Facility",
    "Pagaya has closed a $460 million revolving personal loan facility, highlighting continued activity in technology-driven financial services and alternative lending markets.",
    "2026-09-22T10:00:00Z",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
    "Pagaya has closed a $460 million revolving personal loan facility"
  ),
  makeArticle(
    "tech-heidi",
    "AI",
    "AI Startup Heidi Doubles Valuation to $900 Million in New Round",
    "AI startup Heidi has raised new funding that doubles its valuation to $900 million, highlighting continued investor interest in artificial intelligence startups.",
    "2026-09-22T09:30:00Z",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
    "AI startup Heidi has raised new funding at a $900 million valuation"
  ),
  makeArticle(
    "tech-anthropic",
    "AI",
    "Anthropic CEO Dario Amodei to Brief UN Security Council on AI",
    "Anthropic CEO Dario Amodei is set to brief the United Nations Security Council on artificial intelligence as governments continue examining advanced AI systems.",
    "2026-09-22T08:30:00Z",
    "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=1000&q=80",
    "Anthropic CEO Dario Amodei is preparing to brief the UN Security Council"
  ),
  makeArticle(
    "tech-datacenter",
    "DATA CENTERS",
    "Data Center Firm Acceleration, Becker Seek $720 Million in IPO",
    "Data-center companies are seeking capital as demand for computing infrastructure expands alongside AI workloads.",
    "2026-09-22T08:00:00Z",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    "data-center companies are seeking new capital"
  ),
  makeArticle(
    "tech-doordash",
    "BUSINESS",
    "DoorDash to Pay $132 Million to NYC, Workers Over Missing Wages",
    "DoorDash is facing a major payment obligation connected to a dispute involving New York City and workers.",
    "2026-09-22T07:19:00Z",
    "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1000&q=80",
    "DoorDash is set to pay $132 million in a New York case"
  ),
  makeArticle(
    "tech-peloton",
    "TECHNOLOGY",
    "Peloton Debuts Three New Treadmills, Including $2,195 Foldable Model",
    "Peloton has introduced three treadmills, including a foldable model priced at $2,195, expanding its connected-fitness product range.",
    "2026-09-22T06:19:00Z",
    "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1000&q=80",
    "Peloton has introduced three new treadmill models"
  ),
  makeArticle(
    "tech-softbank",
    "MARKETS",
    "SoftBank Draws Over $20 Billion of Early Interest in Junk Bond",
    "SoftBank is drawing strong early interest in a large bond offering as investors assess the company's financing needs and technology investments.",
    "2026-09-22T05:19:00Z",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80",
    "SoftBank has drawn more than $20 billion of early interest"
  ),
  makeArticle(
    "tech-founder",
    "TECHNOLOGY",
    "Chinese App Founder Sells $110 Million in Shares to Pay Taxman",
    "A Chinese app founder is selling shares to meet a tax obligation, illustrating how large technology holdings can create liquidity needs.",
    "2026-09-22T04:30:00Z",
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80",
    "a Chinese app founder is selling $110 million of shares"
  ),
  makeArticle(
    "tech-verda",
    "AI",
    "AI Cloud Startup Verda Raises $189 Million in Funding Round",
    "AI cloud startup Verda has raised $189 million as investors continue to fund infrastructure supporting advanced artificial intelligence workloads.",
    "2026-09-22T04:00:00Z",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    "AI cloud startup Verda has raised $189 million"
  ),
];

export function getTechnologyArticleById(id: string | undefined) {
  return technologyArticles.find((article) => article.id === id);
}

export function getRelatedTechnologyArticles(article: TechnologyArticle, limit = 4) {
  return technologyArticles
    .filter((item) => item.id !== article.id)
    .slice(0, limit);
}

export function technologyArticlePath(id: string) {
  return `/article/${id}`;
}
