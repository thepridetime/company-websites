
/* =========================================================
   MERGERS & ACQUISITIONS
   Dedicated editorial data — The Pride Times
========================================================= */

export type MASection = {
  heading: string;
  body: string;
};

export type MAArticle = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image?: string;
  highlights: string[];
  sections: MASection[];
  tags: string[];
  editorNote: string;
};

export type MADeal = {
  id: number;
  acquirer: string;
  target: string;
  value: string;
  sector: string;
  status: "Announced" | "Pending" | "Closed";
  note: string;
};

/* =========================================================
   DEAL TRACKER
   Carried over from the previous Business data.
   Verify all entries before publishing.
========================================================= */

export const maDeals: MADeal[] = [
  {
    id: 1,
    acquirer: "Amazon",
    target: "NuScale Power",
    value: "$12B",
    sector: "Nuclear Energy",
    status: "Announced",
    note: "Carried over from the previous project dataset; verify the transaction and terms.",
  },
  {
    id: 2,
    acquirer: "Microsoft",
    target: "IonQ",
    value: "$8.7B",
    sector: "Quantum Computing",
    status: "Pending",
    note: "Carried over from the previous project dataset; verify the transaction and terms.",
  },
  {
    id: 3,
    acquirer: "BlackRock",
    target: "Global Infrastructure Partners",
    value: "$12.5B",
    sector: "Infrastructure",
    status: "Closed",
    note: "Carried over from the previous project dataset; verify the transaction and terms.",
  },
  {
    id: 4,
    acquirer: "JPMorgan",
    target: "First Republic (Assets)",
    value: "$10.6B",
    sector: "Banking",
    status: "Closed",
    note: "Carried over from the previous project dataset; verify the transaction and terms.",
  },
  {
    id: 5,
    acquirer: "Reliance",
    target: "Disney India",
    value: "$8.5B",
    sector: "Media & Entertainment",
    status: "Closed",
    note: "Carried over from the previous project dataset; verify the transaction and terms.",
  },
];

/* =========================================================
   EDITORIAL ARTICLES
========================================================= */

export const maArticles: MAArticle[] = [
  {
    slug: "why-companies-buy-companies",
    category: "M&A STRATEGY",
    title:
      "Why Companies Buy Companies: The Strategic Thinking Behind a Major Acquisition",
    subtitle:
      "An acquisition can open a new market, bring in technology or change a company's competitive position. But the logic behind a deal is only the beginning of the story.",
    author: "The Pride Times Business Desk",
    publishedAt: "M&A Analysis",
    readTime: "8 min read",
    highlights: [
      "Acquisitions can provide access to customers, technology, talent, intellectual property and new markets.",
      "A strategic rationale should explain how the target fits the buyer's long-term business plan.",
      "The purchase price needs to be considered alongside financing, integration costs and execution risks.",
      "The success of a transaction depends on what happens after the announcement and closing.",
    ],
    sections: [
      {
        heading: "The decision begins with a business problem",
        body:
          "A company rarely makes an acquisition simply because another business is available to buy. In many cases, the decision begins with a strategic problem: entering a market takes too long, a competitor has built a capability the buyer lacks, or customers are demanding products the company cannot yet provide. An acquisition can offer a route to address that gap more quickly than building everything internally. The important question is whether buying the business solves a clearly defined problem.",
      },
      {
        heading: "Buying growth rather than waiting for it",
        body:
          "Organic expansion can require years of investment in people, distribution, technology and customer relationships. Acquiring an established business may provide immediate access to some of those assets. That does not mean growth is guaranteed. The buyer still has to retain customers, maintain product quality and integrate the acquired operation without disrupting its existing business.",
      },
      {
        heading: "Technology and talent have become strategic assets",
        body:
          "In sectors where specialist knowledge and intellectual property are important, a transaction may be driven by capabilities that are difficult to reproduce. Software platforms, patents, engineering teams, data infrastructure and specialist research can all influence a buyer's decision. The value of these assets depends on whether they can be retained, developed and used effectively within the acquiring organisation.",
      },
      {
        heading: "The financial case must stand on its own",
        body:
          "A compelling strategic story does not automatically justify any purchase price. Buyers need to examine expected cash flows, financing costs, liabilities and the investment required after completion. They may also estimate potential cost savings or additional revenue from combining operations. These benefits are often described as synergies, but they remain projections until the business demonstrates that they can be delivered.",
      },
      {
        heading: "The real test begins after completion",
        body:
          "The announcement attracts attention, but the integration period determines whether the transaction's rationale can become operational reality. Leadership teams must decide which systems to combine, how to organise employees, how to communicate with customers and which products or processes should remain separate. A clear acquisition strategy therefore needs an equally clear integration plan.",
      },
      {
        heading: "Questions readers should ask",
        body:
          "When evaluating an acquisition, readers should look beyond the headline value. What capability is the buyer seeking? How will the transaction be funded? What risks could affect completion? Which benefits are expected, and how will management measure them? These questions help distinguish a strategic transaction from a headline that offers little information about the underlying business case.",
      },
    ],
    tags: ["Corporate Strategy", "Growth", "Investment", "Synergies"],
    editorNote:
      "This explainer examines the commercial rationale behind acquisitions. It does not assess or endorse any specific transaction.",
  },

  {
    slug: "inside-merger-due-diligence",
    category: "DUE DILIGENCE",
    title:
      "Inside Merger Due Diligence: The Questions Buyers Ask Before Signing a Deal",
    subtitle:
      "Behind every major acquisition is a detailed examination of the target's finances, contracts, operations, technology and potential liabilities.",
    author: "The Pride Times Business Desk",
    publishedAt: "M&A Explainer",
    readTime: "9 min read",
    highlights: [
      "Financial reviews test the quality and sustainability of reported earnings.",
      "Legal reviews examine contracts, litigation, intellectual property and regulatory obligations.",
      "Operational and technology reviews identify dependencies and integration challenges.",
      "Diligence findings can influence price, protections, conditions and whether a buyer proceeds.",
    ],
    sections: [
      {
        heading: "The work that happens before the deal",
        body:
          "Due diligence is the process through which a potential buyer investigates a target company before completing an acquisition. It is designed to test the assumptions behind the proposed transaction. A company may appear attractive from its public results or management presentation, but the buyer needs a deeper understanding of how the business earns money, what obligations it carries and what investment it may require in the future.",
      },
      {
        heading: "Financial diligence: understanding the earnings",
        body:
          "Buyers examine revenue sources, customer concentration, profit margins, cash conversion, debt, working capital and unusual items in the accounts. The objective is to understand the quality of earnings rather than simply accept the reported headline figure. A business with fast-growing revenue may still face pressure if customers pay slowly, margins are narrowing or a small number of contracts account for a large share of sales.",
      },
      {
        heading: "Legal diligence: identifying obligations",
        body:
          "The legal review can cover customer and supplier contracts, employment arrangements, litigation, licences, intellectual property ownership and compliance obligations. Some agreements may require consent before control changes. Other matters may create continuing costs or restrictions for the buyer. The importance of each issue depends on the target's industry, markets and transaction structure.",
      },
      {
        heading: "Technology and operational diligence",
        body:
          "Technology reviews can examine software ownership, cybersecurity, data management, system reliability and technical debt. Operational reviews may assess supply chains, manufacturing capacity, distribution, service quality and reliance on key suppliers. These areas matter because a buyer may need to invest in systems or processes before the combined business can operate as planned.",
      },
      {
        heading: "From findings to transaction terms",
        body:
          "Diligence findings can lead to changes in valuation, payment arrangements, warranties, indemnities or conditions to completion. A buyer may seek protections for specific risks or request that certain issues be resolved before closing. In some circumstances, the findings can change the buyer's view of the transaction enough to pause or abandon negotiations.",
      },
      {
        heading: "Why the process does not end at signing",
        body:
          "The signing of an agreement is not always the same as completion. Conditions may remain outstanding, including regulatory approvals, financing arrangements or other contractual requirements. Diligence findings should also inform the integration plan so that management knows which systems, contracts and operating risks need attention after the transaction closes.",
      },
    ],
    tags: ["Due Diligence", "Finance", "Legal", "Risk Management"],
    editorNote:
      "A guide to the principal areas buyers examine during an acquisition. The scope of diligence varies by transaction and jurisdiction.",
  },

  {
    slug: "how-ma-deals-are-valued",
    category: "VALUATION & FINANCE",
    title:
      "What Is a Company Really Worth? Understanding the Valuation Behind an M&A Deal",
    subtitle:
      "Revenue multiples and headline purchase prices attract attention, but a serious valuation involves cash flow, risk, growth assumptions and the strategic context of the buyer.",
    author: "The Pride Times Business Desk",
    publishedAt: "Corporate Finance",
    readTime: "8 min read",
    highlights: [
      "A negotiated purchase price and an estimated business value are related but not identical.",
      "Discounted cash flow analysis depends heavily on forecasts and assumptions.",
      "Comparable-company multiples require careful adjustment for differences between businesses.",
      "Strategic benefits can influence a buyer's offer, but projected synergies carry execution risk.",
    ],
    sections: [
      {
        heading: "Why valuation is more than a single number",
        body:
          "The value attached to a company is an estimate built from assumptions about its future performance. The price agreed in a transaction is the result of negotiations between a buyer and seller, shaped by financing, competition for the asset and each party's alternatives. Two buyers may reach different conclusions about the same business because they have different strategies, costs of capital or expectations about future growth.",
      },
      {
        heading: "The discounted cash flow approach",
        body:
          "A discounted cash flow model estimates the present value of future cash flows. Analysts build forecasts for revenue, costs, investment and working capital, then apply a discount rate to reflect the time value of money and risk. The model can be useful, but it is sensitive to assumptions. Changes in growth, margins, capital expenditure or the discount rate can materially affect the result.",
      },
      {
        heading: "Using comparable companies",
        body:
          "Another approach compares the target with similar listed businesses. Analysts may examine enterprise value relative to revenue or earnings, alongside other sector-specific measures. Comparisons are not automatic: companies may differ in growth, profitability, geography, leverage, business mix and risk. A multiple only becomes meaningful when the differences are understood.",
      },
      {
        heading: "The role of strategic value",
        body:
          "A strategic buyer may see opportunities that are not available to every potential owner. The target could provide a distribution network, a technology platform, a specialist workforce or access to a new customer base. These advantages may support a higher offer, but they should be treated as expected benefits rather than guaranteed financial outcomes.",
      },
      {
        heading: "Debt, cash and the purchase price",
        body:
          "Readers should distinguish enterprise value from the value attributable to shareholders. Debt, cash and other adjustments can affect the amount ultimately paid to equity holders. Transaction announcements may also include cash, shares, deferred consideration or performance-linked payments. Without those details, a headline figure may not describe the full economics of the deal.",
      },
      {
        heading: "How to read a valuation announcement",
        body:
          "A useful assessment asks which financial period is being used, whether the figure is enterprise value or equity value, how the transaction is funded and which assumptions support the buyer's expected returns. If the company has not disclosed those details, the gap should be stated clearly. Precision in reporting matters more than presenting a valuation as more certain than it is.",
      },
    ],
    tags: ["Valuation", "Discounted Cash Flow", "Corporate Finance"],
    editorNote:
      "This article explains common valuation concepts. It is not an investment recommendation or a valuation of a named company.",
  },

  {
    slug: "merger-regulatory-approval",
    category: "REGULATION",
    title:
      "Why a Merger Can Take Months to Complete: The Role of Regulatory Approval",
    subtitle:
      "A signed agreement is an important milestone, but competition reviews, sector rules and cross-border requirements can determine when a transaction can close.",
    author: "The Pride Times Business Desk",
    publishedAt: "M&A Explainer",
    readTime: "7 min read",
    highlights: [
      "Regulatory requirements depend on the companies, sectors and jurisdictions involved.",
      "Competition authorities may assess whether a transaction could reduce market competition.",
      "Some reviews can require further information or remedies before clearance.",
      "An announced or pending deal should not be described as completed without confirmation.",
    ],
    sections: [
      {
        heading: "The agreement is not the finish line",
        body:
          "When companies announce a merger or acquisition, the public may see the transaction as a completed business decision. In practice, the agreement can be followed by a period in which the parties work through closing conditions. Regulatory approval may be one of the most significant requirements, particularly where the businesses operate in concentrated markets or across several jurisdictions.",
      },
      {
        heading: "What competition authorities examine",
        body:
          "Competition reviews can consider market shares, customer choice, barriers to entry, access to essential inputs and the ability of rivals to compete. The analysis is specific to the relevant market and legal framework. A large transaction is not automatically anti-competitive, just as a smaller transaction is not automatically free of competition concerns.",
      },
      {
        heading: "Cross-border transactions add complexity",
        body:
          "A transaction involving businesses in multiple countries may need to satisfy more than one regulatory regime. Filing thresholds, review procedures, deadlines and information requirements can differ. The parties need to understand which authorities have jurisdiction and whether approvals must be obtained before completion.",
      },
      {
        heading: "Clearance can come with conditions",
        body:
          "Depending on the applicable rules and the authority's findings, a transaction may be cleared without conditions, cleared subject to remedies, sent for further review or prohibited. Remedies can take different forms, including commitments intended to address specific competition concerns. Reporting should follow the wording of the official decision rather than assume an outcome.",
      },
      {
        heading: "Deal status is a reporting responsibility",
        body:
          "The terms announced, pending and closed describe different stages. An announced transaction has been publicly disclosed. A pending transaction has not yet completed. A closed transaction has reached completion under the relevant agreement. Journalists should confirm the status through company disclosures or regulatory announcements before updating a deal tracker.",
      },
      {
        heading: "What readers should follow",
        body:
          "Regulatory notices, company filings, revised transaction terms and official completion statements provide the clearest updates. These documents help establish whether the deal is progressing, whether conditions have changed and when ownership has formally transferred.",
      },
    ],
    tags: ["Regulation", "Competition Law", "Cross-border Deals"],
    editorNote:
      "A general explanation of regulatory review. Specific legal requirements differ by jurisdiction and transaction.",
  },

  {
    slug: "post-merger-integration",
    category: "POST-MERGER INTEGRATION",
    title:
      "The Deal Is Done. Now Comes the Hard Part: Making Two Companies Work as One",
    subtitle:
      "After completion, management must turn a strategic rationale into an operating business. That means aligning people, systems, customers and priorities without losing what made the target valuable.",
    author: "The Pride Times Business Desk",
    publishedAt: "Management & Strategy",
    readTime: "9 min read",
    highlights: [
      "Integration planning should begin before closing, within applicable legal limits.",
      "Employee communication and leadership clarity can affect retention and execution.",
      "Technology consolidation requires attention to data, security and operational continuity.",
      "Management should measure integration progress against defined milestones.",
    ],
    sections: [
      {
        heading: "Completion changes the work, not the challenge",
        body:
          "The closing announcement is often treated as the final chapter of an acquisition. For management, it is the start of a demanding operational phase. The buyer now has to combine organisations while continuing to serve customers, meet obligations and deliver the day-to-day work of the business. The original strategic rationale must be translated into decisions that employees can execute.",
      },
      {
        heading: "Leadership and culture need deliberate attention",
        body:
          "Employees may be uncertain about reporting lines, roles, locations, compensation and the future direction of the company. If communication is delayed or inconsistent, valuable employees may leave and teams may lose focus. Clear responsibilities, realistic timelines and visible leadership decisions can help create stability during the transition.",
      },
      {
        heading: "Technology integration is a business decision",
        body:
          "Combining technology platforms is not simply a matter of moving data into one system. Organisations need to understand cybersecurity, privacy, system dependencies, data quality and service continuity. Some systems may need to remain separate for a period while the business assesses the cost and risk of consolidation.",
      },
      {
        heading: "Customers should not become collateral damage",
        body:
          "Customers may be concerned about changes to products, service levels, contracts, pricing or support. A clear communication plan can explain what will change and what will remain stable. Monitoring complaints, renewals, service performance and customer retention can help management identify problems before they become more difficult to address.",
      },
      {
        heading: "Synergies need evidence",
        body:
          "Management teams often describe expected cost savings or revenue opportunities before a transaction closes. After completion, those expectations should become measurable workstreams. Progress can be tracked through operating costs, revenue retention, delivery milestones, productivity and customer measures. Reporting delays as well as achievements gives stakeholders a more balanced view.",
      },
      {
        heading: "The longer-term measure of success",
        body:
          "A successful integration is not defined by how quickly two organisations adopt the same branding or reporting structure. It is defined by whether the combined business can operate reliably and deliver the strategic benefits that justified the acquisition. That can take time, and the relevant measures will differ from one industry and transaction to another.",
      },
    ],
    tags: ["Integration", "Leadership", "Operations", "Management"],
    editorNote:
      "This feature explores the management work that follows completion. Integration outcomes depend on the circumstances of each transaction.",
  },
];

/* =========================================================
   FEATURED ARTICLE
========================================================= */

export const maHeroArticle = maArticles[0];

/* =========================================================
   DATA HELPERS
========================================================= */

export function getMAArticleBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return maArticles.find((article) => article.slug === slug);
}

export function getRelatedMAArticles(
  article: MAArticle,
  limit = 3
) {
  const sameTopic = maArticles.filter(
    (item) =>
      item.slug !== article.slug &&
      item.category === article.category
  );

  const otherArticles = maArticles.filter(
    (item) =>
      item.slug !== article.slug &&
      item.category !== article.category
  );

  return [...sameTopic, ...otherArticles].slice(0, limit);
}
