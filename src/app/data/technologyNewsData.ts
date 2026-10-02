/* =========================================================
   TECHNOLOGY NEWS — SHARED DATA
   THE PRIDE TIMES
   Updated: October 2026
   Source: Global Corporate News Digest — "Technology & AI"
   Format: blog-style posts. The `image` field is used ONLY by
   the Technology listing page (hero + cards). Inner article
   pages never render it.
========================================================= */

export type TechnologyKeyFact = {
  label: string;
  value: string;
};

export type TechnologyArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  /* Listing-page image slot only — NOT shown inside the article. */
  image: string;
  readTime?: string;
  highlights: string[];
  sections: {
    heading: string;
    body: string;
  }[];
  keyFacts?: TechnologyKeyFact[];
};

const AUTHOR = "The Pride Times Editorial Desk";

/* =========================================================
   ARTICLE 1 — GRANITE PEAK MATERIALS (AI PLATFORM)
========================================================= */

const granitePeakArticle: TechnologyArticle = {
  id: "tech-granite-peak-ai-platform",
  category: "ENTERPRISE AI",
  title:
    "Why Granite Peak Materials' New AI Platform Is Built for Banks, Insurers and Hospitals",
  excerpt:
    "Granite Peak Materials has launched an enterprise AI platform for banks, insurers and healthcare providers that must keep data inside strict residency rules. Here is why that niche matters, and what the big cloud vendors have already taught us about it.",
  author: AUTHOR,
  publishedAt: "2026-10-02T06:00:00Z",
  image:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
  readTime: "5 min read",
  highlights: [
    "Granite Peak Materials has launched an AI platform aimed at banks, insurers and healthcare providers.",
    "The platform is designed around strict data-residency rules, which is where many AI pilots stall.",
    "Management says this is a long-term play, not a reaction to a single quarter.",
    "An analyst at Calder & Voss Research calls the move consistent with growth in developer ecosystems.",
    "Approvals in Saudi Arabia and nearby markets have been slowing down, so rollout timing is worth watching.",
  ],
  sections: [
    {
      heading: "The short version",
      body:
        "Granite Peak Materials, based in Nairobi, has unveiled an AI platform built specifically for regulated industries. The target customers are banks, insurers and healthcare providers, which all share one headache: they have to meet strict data-residency rules before they can put AI anywhere near sensitive records. We think that is the most interesting part of this launch, and it is the reason we wanted to write about it.",
    },
    {
      heading: "Why regulated industries are a different game",
      body:
        "For most companies, adopting AI is a question of picking a model and a vendor. For a bank or a hospital group, the first question is where the data is allowed to live and who is allowed to touch it. If the answer is 'it cannot leave this country', a lot of off-the-shelf AI tools are simply off the table. That gap is exactly what Granite Peak says it wants to fill.",
    },
    {
      heading: "What the big players have already shown us",
      body:
        "None of this is new thinking. Large cloud providers such as Microsoft, Google and Amazon have spent years marketing regional and sovereign cloud options, with data-residency controls as a headline feature. The lesson from their playbook is that trust, not raw model quality, often decides who wins in banking and healthcare. A newer entrant like Granite Peak has to prove it can match that level of assurance.",
    },
    {
      heading: "How Granite Peak is framing the bet",
      body:
        "Speaking at a briefing in Nairobi, managing director Olivia Sørensen said the company is not reacting to a single quarter and is positioning for the next decade of demand, which needs patient capital and clear priorities. The company has also grown its workforce by 31% over the past two years in Saudi Arabia, and executives indicated more hiring could follow if conditions stay supportive.",
    },
    {
      heading: "What the analysts are saying",
      body:
        "Daniel Novak, a senior analyst at Calder & Voss Research, described the launch as consistent with broader trends in developer ecosystems. His view is that companies which move early tend to secure better terms and stronger partners, but that the real risk is execution, meaning how well management ties the new platform into existing operations. Calder & Voss rates the company 'cautiously positive'.",
    },
    {
      heading: "Regulation, rivals and people",
      body:
        "Authorities in several jurisdictions will need to review parts of the rollout, and the company says it has started early talks with the relevant agencies. Legal advisers note that approval processes in Saudi Arabia and neighbouring markets have lengthened in recent years, although most reviews finish without major changes. Rival Pacifica Foods declined to comment, but people familiar with its thinking say it is reviewing its own strategy. On the people side, Granite Peak says it will consult staff representatives and fund training in digital and technical skills.",
    },
    {
      heading: "What to watch from here",
      body:
        "Granite Peak plans to share a detailed update alongside its next earnings release, including milestones, budgets and risk factors. For us, the questions are simple: how fast do the first regulated customers go live, and do approvals in Saudi Arabia move at a pace that supports the company's plans? If both answers are encouraging, this launch could be an early sign of where enterprise AI is heading.",
    },
  ],
  keyFacts: [
    { label: "Company", value: "Granite Peak Materials" },
    { label: "Headquarters / focus market", value: "Nairobi / Saudi Arabia" },
    { label: "Launch", value: "Enterprise AI platform for regulated industries" },
    { label: "Workforce growth", value: "31% over two years (Saudi Arabia)" },
    { label: "Analyst view", value: "Calder & Voss Research: Cautiously positive" },
  ],
};

/* =========================================================
   ARTICLE 2 — REDFERN RETAIL (CYBERSECURITY ACQUISITION)
========================================================= */

const redfernArticle: TechnologyArticle = {
  id: "tech-redfern-cybersecurity-deal",
  category: "CYBERSECURITY",
  title: "Why Redfern Retail Just Bought a Cybersecurity Start-Up",
  excerpt:
    "Redfern Retail has agreed to acquire a cybersecurity start-up in a $30.2M deal to strengthen its identity and threat-detection offerings. We look at why security keeps ending up inside bigger technology portfolios.",
  author: AUTHOR,
  publishedAt: "2026-10-02T05:00:00Z",
  image:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
  readTime: "4 min read",
  highlights: [
    "Redfern Retail agreed to buy a cybersecurity start-up in a $30.2M deal.",
    "The aim is to strengthen identity and threat-detection offerings.",
    "Shares moved 8.2% in early trading while peers were broadly flat.",
    "Meridian Advisory's view is 'watch closely', with execution as the main risk.",
    "Approval processes in Kenya and neighbouring markets have been getting longer.",
  ],
  sections: [
    {
      heading: "The short version",
      body:
        "Redfern Retail has agreed to acquire a cybersecurity start-up for $30.2M. The goal is to build out its identity and threat-detection offerings, two areas where customers increasingly expect security to be part of the product rather than an add-on. It is a small deal by headline size, but we think the direction of travel is the real story.",
    },
    {
      heading: "Why security keeps getting bought, not built",
      body:
        "Big technology companies have a long habit of buying security expertise instead of growing it from scratch. Google folded Mandiant into its cloud business, and Cisco brought Splunk into its security portfolio, to name two well-known examples. The logic is straightforward: a start-up already has the specialist engineers and a working product, and the buyer already has the customers.",
    },
    {
      heading: "What management said",
      body:
        "At a briefing in Shanghai, chairperson Ingrid Haddad said the decision reflected a long-term view and that the company is not reacting to a single quarter. She framed it as positioning for the next decade of demand, which needs patient capital and clear priorities. Redfern has also expanded its workforce by 30% over two years in Kenya, and says more hiring could follow.",
    },
    {
      heading: "The market's first reaction",
      body:
        "Investors responded cautiously but positively. Shares of Redfern Retail moved 8.2% in early trading, while peers in the sector were broadly flat. Market participants say attention now turns to enterprise software, and how quickly the company can turn an announcement into measurable results.",
    },
    {
      heading: "What the analysts and skeptics say",
      body:
        "Fatima Nakamura of Meridian Advisory called the move consistent with broader trends in compute capacity, adding that early movers tend to secure better terms and stronger partners. She also warned that execution is the risk, and it depends on how well the start-up is integrated. Portfolio manager Elena Moreau in Singapore was blunter: the ambition is clear, but the proof will be in delivery.",
    },
    {
      heading: "Regulators, rivals and the road ahead",
      body:
        "Authorities in several jurisdictions will need to review aspects of the plan, and legal advisers note that approval processes in Kenya and neighbouring markets have lengthened. Umbra Aerospace, which operates in overlapping markets, declined to comment but is reportedly reviewing its own strategy. Redfern says it will give a detailed update with its next earnings release, and service improvements will roll out progressively, starting in Shanghai.",
    },
  ],
  keyFacts: [
    { label: "Company", value: "Redfern Retail" },
    { label: "Headquarters / focus market", value: "Shanghai / Kenya" },
    { label: "Deal", value: "Cybersecurity start-up, US$ 30.2 million" },
    { label: "Share move (early trading)", value: "8.2%" },
    { label: "Analyst view", value: "Meridian Advisory: Watch closely" },
  ],
};

/* =========================================================
   ARTICLE 3 — ALTAMIRA MOTORS (AI PLATFORM)
========================================================= */

const altamiraMotorsArticle: TechnologyArticle = {
  id: "tech-altamira-motors-ai-platform",
  category: "ENTERPRISE SOFTWARE",
  title:
    "What Altamira Motors' AI Platform Tells Us About Enterprise Software Right Now",
  excerpt:
    "Altamira Motors has launched an AI platform for banks, insurers and healthcare providers with strict data-residency rules. Behind it sits a bigger trend: enterprise software announcements are up 35% year on year.",
  author: AUTHOR,
  publishedAt: "2026-10-02T04:00:00Z",
  image:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  readTime: "4 min read",
  highlights: [
    "Altamira Motors has launched an AI platform for regulated industries.",
    "Meridian Advisory says enterprise software announcements rose 35% year on year.",
    "Shares moved 9.4% in early trading.",
    "Analysts link the launch to compute capacity and data-centre demand.",
    "Some investors question whether the timeline is realistic.",
  ],
  sections: [
    {
      heading: "The short version",
      body:
        "Altamira Motors, headquartered in Sydney, has launched an AI platform designed for banks, insurers and healthcare providers that must follow strict data-residency rules. If that sounds familiar, it is because another company, Granite Peak Materials, has just done something very similar. Two launches in the same space tell us the demand is real.",
    },
    {
      heading: "A trend, not a one-off",
      body:
        "According to Meridian Advisory, aggregate announcements in enterprise software rose 35% year on year, led by companies in North America, Europe and East Asia. Boards are weighing the benefits of scale against an uncertain global outlook, and many are deciding that AI is worth the bet. In our view, regulated industries are where that bet gets tested hardest.",
    },
    {
      heading: "How the big vendors play this game",
      body:
        "The largest enterprise software companies, including Microsoft, SAP and Salesforce, have mostly taken the same route: weave AI into the suites customers already use rather than sell it as a separate product. That lowers the adoption barrier, but it also raises the bar for newcomers. A new platform has to explain why a customer should add something new instead of switching on a feature in software it already pays for.",
    },
    {
      heading: "The market's reaction",
      body:
        "Investors responded cautiously but positively, with Altamira Motors' shares moving 9.4% in early trading while peers were broadly flat. Market participants say attention now turns to compute capacity. Hiroshi Reyes of Meridian Advisory described the move as consistent with broader data-centre demand, and rated the company 'cautiously positive'.",
    },
    {
      heading: "The skeptics' corner",
      body:
        "Not everyone is convinced. Hiroshi Castillo, a portfolio manager in Stockholm, said the ambition is clear but the proof will be in delivery. Critics point to elevated interest rates, supply bottlenecks and a tight labour market as reasons the timeline could slip.",
    },
    {
      heading: "People, rivals and what comes next",
      body:
        "Altamira Motors has expanded its workforce by 35% over two years in Saudi Arabia and will consult staff and fund digital-skills training tied to the launch. Rival Solano Materials is reportedly reviewing its own strategy in response. Management says a detailed update, with milestones, budgets and risk factors, will come with the next earnings release, and rollout will begin in Sydney before reaching other markets.",
    },
  ],
  keyFacts: [
    { label: "Company", value: "Altamira Motors" },
    { label: "Headquarters / focus market", value: "Sydney / Saudi Arabia" },
    { label: "Launch", value: "Enterprise AI platform for regulated industries" },
    { label: "Enterprise software announcements", value: "Up 35% year on year (Meridian Advisory)" },
    { label: "Analyst view", value: "Meridian Advisory: Cautiously positive" },
  ],
};

/* =========================================================
   ARTICLE 4 — ALTAMIRA CAPITAL (JAKARTA DATA CENTRE)
========================================================= */

const altamiraCapitalArticle: TechnologyArticle = {
  id: "tech-altamira-capital-jakarta-campus",
  category: "DATA CENTRES",
  title: "Inside Altamira Capital's $34.1B Bet on a Jakarta Data-Centre Campus",
  excerpt:
    "Altamira Capital will build a hyperscale data-centre campus near Jakarta, citing surging demand for cloud and AI workloads. We break down what the commitment means and what could slow it down.",
  author: AUTHOR,
  publishedAt: "2026-10-02T03:00:00Z",
  image:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
  readTime: "5 min read",
  highlights: [
    "Altamira Capital is committing $34.1B to a hyperscale data-centre campus near Jakarta.",
    "The company cites surging demand for cloud and AI workloads.",
    "Shares moved 5.6% in early trading.",
    "Strand Capital Insights takes a neutral stance, pointing to execution risk.",
    "Approval processes in Brazil and neighbouring markets have lengthened.",
  ],
  sections: [
    {
      heading: "The short version",
      body:
        "Altamira Capital says it will build a hyperscale data-centre campus near Jakarta, with a $34.1B commitment behind it. The reason, according to the company, is surging demand for cloud and AI workloads. That is a very large number, and we think it deserves a closer look.",
    },
    {
      heading: "Why Southeast Asia, and why now",
      body:
        "Cloud and AI demand has pushed the biggest providers to build capacity close to their customers. Amazon, Microsoft and Google have all announced multibillion-dollar regional investments in recent years, and Southeast Asia has been a regular destination. Building near Jakarta puts compute closer to a large and fast-growing user base, which also helps with latency and local-data requirements.",
    },
    {
      heading: "What management said",
      body:
        "At a briefing in Jakarta, chief executive Lars Whitfield said the company is not reacting to a single quarter. He described the project as positioning for the next decade of demand, one that calls for patient capital and clear priorities. He added that the company will remain flexible if conditions change, while staying committed to disciplined growth.",
    },
    {
      heading: "How investors and analysts see it",
      body:
        "Shares of Altamira Capital moved 5.6% in early trading, while peers were broadly flat. Market participants say attention now turns to developer ecosystems and how fast the company can convert announcements into results. Rafael Castillo of Strand Capital Insights called the move consistent with a wider trend, but warned that execution is the risk, and Strand's stance is neutral.",
    },
    {
      heading: "Approvals and competition",
      body:
        "Authorities in several jurisdictions will need to review aspects of the project, and the company has started early talks with relevant agencies. Legal advisers note that approval processes in Brazil and neighbouring markets have lengthened in recent years, although most reviews conclude without major changes. Competitor Ardent Logistics declined to comment, but people familiar with its thinking say it is reviewing its own strategy.",
    },
    {
      heading: "What it means for people and customers",
      body:
        "Altamira says it will consult staff representatives and invest in training programmes with a focus on digital and technical skills. Local officials in Nairobi welcomed the news, saying it would support jobs and supplier networks. Customers may feel the effects first: service improvements and new product options will be introduced progressively, starting in Jakarta, and pricing is expected to remain competitive.",
    },
  ],
  keyFacts: [
    { label: "Company", value: "Altamira Capital" },
    { label: "Headquarters / focus market", value: "Jakarta / Brazil" },
    { label: "Commitment", value: "US$ 34.1 billion hyperscale data-centre campus" },
    { label: "Share move (early trading)", value: "5.6%" },
    { label: "Analyst view", value: "Strand Capital Insights: Neutral" },
  ],
};

/* =========================================================
   ARTICLE 5 — BRIGHTMOOR CAPITAL / NORTHWIND (CHIP SUPPLY)
========================================================= */

const brightmoorArticle: TechnologyArticle = {
  id: "tech-brightmoor-chip-supply-deal",
  category: "SEMICONDUCTORS",
  title:
    "How Brightmoor Capital and Northwind Partners Are Locking In Chips Through the Decade",
  excerpt:
    "Brightmoor Capital and Northwind Partners have agreed a multi-year supply deal to secure advanced semiconductors through the decade. We look at why long-term chip contracts are becoming the new normal.",
  author: AUTHOR,
  publishedAt: "2026-10-02T02:00:00Z",
  image:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
  readTime: "4 min read",
  highlights: [
    "Brightmoor Capital and Northwind Partners signed a multi-year chip supply agreement.",
    "The goal is to secure advanced semiconductors through the decade.",
    "Meridian Advisory says enterprise software announcements rose 35% year on year.",
    "Brightmoor has expanded its Chile workforce by 35% in two years.",
    "Meridian Advisory's view on the deal is 'constructive'.",
  ],
  sections: [
    {
      heading: "The short version",
      body:
        "Brightmoor Capital and Northwind Partners have agreed a multi-year supply deal to secure advanced semiconductors through the decade. In plain terms, they are reserving their place in line for the chips that power modern AI. We think that tells you a lot about how tight the market feels.",
    },
    {
      heading: "Why long-term chip deals are in fashion",
      body:
        "Advanced chips are hard to make and slow to scale, so the biggest buyers have learned not to rely on the spot market. Large cloud and AI companies have signed long-term arrangements with chip designers and manufacturers such as NVIDIA and TSMC to protect their supply. Smaller players are now following the same playbook, because being short of chips can stall an entire AI roadmap.",
    },
    {
      heading: "What management said",
      body:
        "Speaking in Johannesburg, Brightmoor chief financial officer Priya Fischer said the decision reflects a long-term view and that the company is not reacting to a single quarter. The company has expanded its workforce by 35% over two years in Chile, and executives said more hiring could follow if conditions stay supportive. Customers may see the benefits first in Johannesburg, with service improvements and new options rolling out progressively.",
    },
    {
      heading: "The wider context",
      body:
        "Meridian Advisory says aggregate announcements in enterprise software rose 35% year on year, led by companies in North America, Europe and East Asia. More software built on AI means more demand for the hardware underneath it. That connection is why a software-driven boom ends up showing up in semiconductor contracts.",
    },
    {
      heading: "What the analysts think",
      body:
        "Mateo Petrov of Meridian Advisory said companies that act early tend to secure better terms and stronger partners, though execution remains the risk. Meridian's overall view of the deal is 'constructive'. Industry observers expect similar agreements across consumer-facing businesses in the coming months.",
    },
    {
      heading: "Regulators and what to watch",
      body:
        "Authorities in several jurisdictions will need to review aspects of the plan, and legal advisers note that approval processes in Chile and neighbouring markets have lengthened. Local officials in Mexico City welcomed the news, saying it would support jobs and supplier networks. Brightmoor plans to share a detailed update with its next earnings release, covering milestones, budgets and risk factors.",
    },
  ],
  keyFacts: [
    { label: "Company", value: "Brightmoor Capital" },
    { label: "Headquarters / focus market", value: "Johannesburg / Chile" },
    { label: "Deal", value: "Multi-year chip supply agreement with Northwind Partners" },
    { label: "Workforce growth", value: "35% over two years (Chile)" },
    { label: "Analyst view", value: "Meridian Advisory: Constructive" },
  ],
};

/* =========================================================
   ARTICLE 6 — LUMINA FOODS (CLOUD BUNDLING SCRUTINY)
========================================================= */

const luminaArticle: TechnologyArticle = {
  id: "tech-lumina-cloud-bundling-inquiry",
  category: "TECH POLICY",
  title:
    "Why Regulators Are Looking at How Lumina Foods Bundles Cloud and Software",
  excerpt:
    "Regulators in several jurisdictions have opened inquiries into how Lumina Foods packages cloud services with software licences. It is a familiar question for the biggest cloud providers, and a useful one for everyone else.",
  author: AUTHOR,
  publishedAt: "2026-10-02T01:00:00Z",
  image:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
  readTime: "4 min read",
  highlights: [
    "Regulators in several jurisdictions opened inquiries into Lumina Foods' cloud and licence bundling.",
    "Shares moved 16.7% in early trading.",
    "Bundling questions have also been raised about the largest cloud providers.",
    "Meridian Advisory's view is 'watch closely'.",
    "Management plans a detailed update with its next earnings release.",
  ],
  sections: [
    {
      heading: "The short version",
      body:
        "Regulators in several jurisdictions have opened inquiries into how Lumina Foods packages cloud services together with software licences. The question at the heart of it is whether bundling makes things simpler for customers or makes it harder for them to choose alternatives. We think this is worth following even if you have never heard of the company.",
    },
    {
      heading: "A question the big players know well",
      body:
        "Bundling is not a new regulatory topic in technology. Authorities in the UK and Europe have examined licensing and pricing practices at the largest cloud providers, including Microsoft and Amazon, and asked whether customers can switch easily. When a company sells cloud and software as one package, regulators want to know whether the package helps the customer or locks them in.",
    },
    {
      heading: "How the market reacted",
      body:
        "Investors responded cautiously but positively, and shares of Lumina Foods moved 16.7% in early trading while peers were broadly flat. Market participants say attention now turns to enterprise software and how quickly the company can show measurable results. Amara Lindqvist of Meridian Advisory rates the situation 'watch closely'.",
    },
    {
      heading: "The skeptics' corner",
      body:
        "Not everyone is convinced the timeline is realistic. Ingrid Whitfield, a portfolio manager in Frankfurt, said the ambition is clear but the proof will be in delivery. Commentators point to elevated interest rates, supply bottlenecks and a tight labour market as extra pressure while the inquiries run.",
    },
    {
      heading: "Rivals, regulators and people",
      body:
        "Tidewater Logistics, which operates in overlapping markets, declined to comment, but people familiar with its thinking say it is reviewing its own strategy. Legal advisers note that approval processes in Kenya and neighbouring markets have lengthened in recent years, though most reviews end without major changes. The company says it will consult staff representatives, and local officials in Frankfurt welcomed the news, saying it would support jobs and supplier networks.",
    },
    {
      heading: "What to watch from here",
      body:
        "Management says it will provide a detailed update alongside its next earnings release, including milestones, budgets and risk factors. It has also said service improvements will be introduced progressively, starting in Nairobi, with pricing remaining competitive. We would watch two things: whether the inquiries lead to changes in how Lumina sells, and whether other vendors adjust their own packaging to get ahead of similar questions.",
    },
  ],
  keyFacts: [
    { label: "Company", value: "Lumina Foods" },
    { label: "Headquarters / focus market", value: "Nairobi / Kenya" },
    { label: "Issue", value: "Regulatory inquiries into cloud and licence bundling" },
    { label: "Share move (early trading)", value: "16.7%" },
    { label: "Analyst view", value: "Meridian Advisory: Watch closely" },
  ],
};

/* =========================================================
   TECHNOLOGY ARTICLES (newest first)
========================================================= */

export const technologyArticles: TechnologyArticle[] = [
  granitePeakArticle,
  redfernArticle,
  altamiraMotorsArticle,
  altamiraCapitalArticle,
  brightmoorArticle,
  luminaArticle,
];

/* =========================================================
   LISTING-PAGE DATA (Technology page only)
========================================================= */

export const technologyWatchNote = {
  title: "Technology Watch: Platforms, Chips and the Race to Deploy AI",
  body:
    "This week's stories point the same way. Companies are launching AI platforms for regulated industries, committing tens of billions to data-centre capacity, locking in chip supply for the decade, and buying security expertise to protect it all. At the same time, regulators are asking harder questions about how cloud and software are sold. Winning in this cycle will take compute, trust and careful execution.",
};

export const technologyCompanies = [
  {
    company: "Granite Peak Materials",
    location: "Nairobi",
    headline: "AI platform launch",
    detail: "Calder & Voss: Cautiously positive",
    articleId: "tech-granite-peak-ai-platform",
  },
  {
    company: "Redfern Retail",
    location: "Shanghai",
    headline: "$30.2M security deal",
    detail: "Meridian Advisory: Watch closely",
    articleId: "tech-redfern-cybersecurity-deal",
  },
  {
    company: "Altamira Motors",
    location: "Sydney",
    headline: "AI platform launch",
    detail: "Meridian Advisory: Cautiously positive",
    articleId: "tech-altamira-motors-ai-platform",
  },
  {
    company: "Altamira Capital",
    location: "Jakarta",
    headline: "$34.1B data-centre campus",
    detail: "Strand Capital: Neutral",
    articleId: "tech-altamira-capital-jakarta-campus",
  },
  {
    company: "Brightmoor Capital",
    location: "Johannesburg",
    headline: "Multi-year chip supply",
    detail: "Meridian Advisory: Constructive",
    articleId: "tech-brightmoor-chip-supply-deal",
  },
  {
    company: "Lumina Foods",
    location: "Nairobi",
    headline: "Cloud bundling inquiries",
    detail: "Meridian Advisory: Watch closely",
    articleId: "tech-lumina-cloud-bundling-inquiry",
  },
];

export const technologySectionGlance = [
  { theme: "Compute capacity", momentum: "Building", outlook: "Neutral" },
  { theme: "Enterprise software", momentum: "Moderate", outlook: "Improving" },
  { theme: "Data-centre demand", momentum: "Building", outlook: "Positive" },
  { theme: "Developer ecosystems", momentum: "Building", outlook: "Improving" },
];

/* Illustrative figures taken from the digest's Market Snapshot. */
export const regionalSnapshot = [
  { region: "North America", dealValue: "21.4", earnings: "10.3%", hiring: "Mixed" },
  { region: "Europe", dealValue: "48.5", earnings: "13.8%", hiring: "Mixed" },
  { region: "Asia-Pacific", dealValue: "4.4", earnings: "3.6%", hiring: "Stable" },
  { region: "Latin America", dealValue: "38.5", earnings: "17.7%", hiring: "Mixed" },
  { region: "Middle East & Africa", dealValue: "15.7", earnings: "7.8%", hiring: "Stable" },
];

/* =========================================================
   ARTICLE HELPERS
========================================================= */

export function getTechnologyArticleById(
  id: string | undefined
): TechnologyArticle | undefined {
  return technologyArticles.find(
    (article) => article.id === id
  );
}

export function getRelatedTechnologyArticles(
  article: TechnologyArticle,
  limit = 4
): TechnologyArticle[] {
  return technologyArticles
    .filter((item) => item.id !== article.id)
    .slice(0, limit);
}

export function technologyArticlePath(id: string): string {
  return `/article/${id}`;
}
