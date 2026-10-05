/* =========================================================
   GLOBAL CORPORATE NEWS DIGEST — EDITION 1: MERGERS & ACQUISITIONS
   THE PRIDE TIMES
   Source: "Global Corporate News Digest — Edition 1" (prepared
   2 October 2026). Deal data reflects a tracker update of
   7 to 8 August 2026; statuses may have moved since.

   This file is ADDITIVE. It does not change the September 2026
   digest (digestArticleData.ts). The homepage and /article/:slug
   merge these stories in alongside the existing ones.
========================================================= */

import type { DigestArticle } from "./digestArticleData";
import img_LN4image from "../../imports/LN4image.png";
import img_Smartc1 from "../../imports/Smartc1.png";
import img_Smartc2 from "../../imports/Smartc2.png";
import img_Smartc3 from "../../imports/Smartc3.png";
import img_Smartc4 from "../../imports/Smartc4.png";
import img_cyber_ops from "../../imports/cyber-ops.png";
import img_warehouse_robotics from "../../imports/warehouse-robotics.png";
import img_supply_chain_map from "../../imports/supply-chain-map.png";
import img_Energy1 from "../../imports/Energy1.png";
import img_Energy2 from "../../imports/Energy2.png";
import img_energy_tanks from "../../imports/energy-tanks.png";
import img_FIN3 from "../../imports/FIN3.png";
import img_FIN4 from "../../imports/FIN4.png";
import img_FIN5 from "../../imports/FIN5.png";
import img_Insightimage from "../../imports/Insightimage.png";
import img_HC1 from "../../imports/HC1.png";
import img_HC2 from "../../imports/HC2.png";
import img_HC3 from "../../imports/HC3.png";
import img_HC4 from "../../imports/HC4.png";
import img_Manu1 from "../../imports/Manu1.png";
import img_Manu2 from "../../imports/Manu2.png";
import img_Manu3 from "../../imports/Manu3.png";


export type EditionArticle = DigestArticle & {
  editorNote?: string;
  /* The industry the story belongs to (shown as a headline group on the homepage). */
  industry: string;
};

/* Industry groups in the order they appear in the digest. */
export const maEdition1IndustryOrder = [
  "Media, Technology & AI",
  "Energy & Utilities",
  "Financial Services & Real Estate",
  "Healthcare & Life Sciences",
  "Industrials, Consumer & Telecoms",
];

export const maEdition1Meta = {
  edition: "Edition 1",
  title: "Mergers & Acquisitions",
  subtitle:
    "Major 2026 deals across media, technology, energy, financial services, healthcare and industry.",
  prepared: "Prepared 2 October 2026",
  note: "Deal data reflects a tracker update of 7 to 8 August 2026; statuses may have moved since.",
  nextEdition: "Next edition: Earnings & Markets",
};

const EDITION_NOTE =
  "Global Corporate News Digest, Edition 1 (Mergers & Acquisitions), prepared 2 October 2026. Deal data reflects a tracker update of 7 to 8 August 2026; statuses may have moved since. Figures are headline values on the basis noted in each story. This digest is a summary and not investment advice.";

const base = {
  sectionNumber: 4,
  section: "Mergers & Acquisitions",
  sectionPath: "/mergers-acquisitions",
  author: "The Pride Times Newsroom",
  publishedAt: "October 2026",
  quote: { text: "", by: "" },
  /* -1 = this edition has no pull quote, so none is rendered. */
  quoteAfter: -1,
  editorNote: EDITION_NOTE,
};

export const maEdition1Articles: EditionArticle[] = [
  {
    ...base,
    id: "global-ma-record-pace-2026",
    industry: "Market Overview",
    title: "Global M&A hits a record pace in 2026 as dealmaking tops $2.8 trillion in six months",
    lede: "Dealmaking in 2026 has run at a record pace. According to a deal tracker maintained by DealRoom, global M&A reached about $2.8 trillion in the first half of the year, up 48% on the same period of 2025 and the strongest opening six months since records began in 1980.",
    location: "Global",
    readTime: "1 min read",
    image: img_LN4image,
    body: [
      "Dealmaking in 2026 has run at a record pace. According to a deal tracker maintained by DealRoom, global M&A reached about $2.8 trillion in the first half of the year, up 48% on the same period of 2025 and the strongest opening six months since records began in 1980. Full-year 2025 had already totalled roughly $4.6 trillion, the highest annual figure since 2021.",
      "Scale and stock currency. Several of the largest deals are all-stock combinations or mergers of equals, in utilities, real estate and oil and gas, where no conventional purchase price exists.",
      "Regulation as the main risk. The biggest pending transactions, including Paramount and Warner Bros. Discovery, now depend on courts and regulators more than on shareholders.",
      "Healthcare and AI. Pharmaceutical groups continue to buy clinical-stage biotechs, while AI-related acquisitions are being paid for with newly liquid stock.",
      "Deal values are quoted on different bases: enterprise value (equity plus debt), equity value, or combined enterprise value for mergers of equals. Where a figure is press-reported rather than disclosed by the companies, this edition says so. Summaries are written from company announcements and the tracker listed under Sources.",
    ],
    keyFacts: [{"label": "Global M&A, H1 2026", "value": "About $2.8 trillion"}, {"label": "Change on H1 2025", "value": "Up 48%"}, {"label": "Full-year 2025", "value": "About $4.6 trillion"}, {"label": "Source", "value": "DealRoom deal tracker"}],
    highlights: ["Global M&A, H1 2026: About $2.8 trillion", "Change on H1 2025: Up 48%", "Full-year 2025: About $4.6 trillion", "Source: DealRoom deal tracker"],
  },
  {
    ...base,
    id: "paramount-skydance-and-warner-bros-discovery-a-110-billion-deal-stuck-in-court",
    industry: "Media, Technology & AI",
    title: "Paramount Skydance and Warner Bros. Discovery: a $110 billion deal stuck in court",
    lede: "Paramount has agreed to buy all of Warner Bros. Discovery for $31.00 per share in cash.",
    location: "United States",
    readTime: "1 min read",
    image: img_Smartc4,
    body: [
      "Paramount has agreed to buy all of Warner Bros. Discovery for $31.00 per share in cash. That values the equity at about $81 billion and the enterprise at about $110 billion, and represents a premium of roughly 147% to WBD's unaffected share price of $12.54. Financing combines $47 billion of new equity from the Ellison family and RedBird with $54 billion of debt. Netflix, the rival bidder, withdrew on 26 February rather than raise its offer.",
      "The deal has passed most hurdles. WBD shareholders approved it on 23 April, the US Justice Department cleared it on 12 June without requiring divestitures, and the UK Competition and Markets Authority followed on 6 August. The remaining obstacle is litigation: twelve state attorneys general and the Writers Guild are suing to block it, with a 12-day antitrust trial scheduled to begin on 2 March 2027.",
      "Paramount has committed not to close until five days after a verdict or 1 June 2027, whichever is earlier. In the meantime, ticking fees of around $650 million a quarter accrue, roughly $1.06 billion by the time the trial opens.",
    ],
    keyFacts: [{"label": "Sector", "value": "Media, Technology & AI"}, {"label": "Announced", "value": "27 Feb 2026"}, {"label": "Enterprise value", "value": "$110B"}, {"label": "Status", "value": "Blocked pending trial"}],
    highlights: ["Sector: Media, Technology & AI", "Announced: 27 Feb 2026", "Enterprise value: $110B", "Status: Blocked pending trial"],
  },
  {
    ...base,
    id: "spacex-folds-in-xai-then-buys-cursor",
    industry: "Media, Technology & AI",
    title: "SpaceX folds in xAI, then buys Cursor",
    lede: "SpaceX announced on 2 February that it had acquired Elon Musk's AI company xAI. Neither company disclosed a price or structure.",
    location: "United States",
    readTime: "1 min read",
    image: img_Smartc3,
    body: [
      "SpaceX announced on 2 February that it had acquired Elon Musk's AI company xAI. Neither company disclosed a price or structure. The figures widely quoted, about $250 billion for xAI and about $1.25 trillion for the combined entity, come from unnamed sources cited by CNBC and Reuters and should be treated as press-reported. SpaceX listed publicly on 12 June.",
      "Four days after the listing, SpaceX agreed to acquire AI coding platform Cursor (Anysphere) in an all-stock deal reported at about $60 billion, with completion guided for the third quarter of 2026. Cursor had previously been raising money at a valuation of roughly $50 billion. The $60 billion figure has been reported from a regulatory filing rather than a company release.",
    ],
    keyFacts: [{"label": "Sector", "value": "Media, Technology & AI"}, {"label": "xAI", "value": "Announced 2 Feb 2026, closed"}, {"label": "Cursor", "value": "Announced 16 Jun 2026, pending"}],
    highlights: ["Sector: Media, Technology & AI", "xAI: Announced 2 Feb 2026, closed", "Cursor: Announced 16 Jun 2026, pending"],
  },
  {
    ...base,
    id: "fox-to-buy-roku-for-about-22-billion",
    industry: "Media, Technology & AI",
    title: "Fox to buy Roku for about $22 billion",
    lede: "Fox Corporation will pay $160.00 per Roku share, made up of $96.00 in cash and 0.9693 of a Fox Class A share.",
    location: "United States",
    readTime: "1 min read",
    image: img_Smartc1,
    body: [
      "Fox Corporation will pay $160.00 per Roku share, made up of $96.00 in cash and 0.9693 of a Fox Class A share. Fox holders would own about 73% of the combined business. The premium is only around 11% to the prior close, thin for a deal of this size, and Roku shares have traded roughly 16% below the offer price, a sign that investors see real completion risk. Shareholders of both companies must approve.",
    ],
    keyFacts: [{"label": "Sector", "value": "Media, Technology & AI"}, {"label": "Announced", "value": "15 Jun 2026"}, {"label": "Enterprise value", "value": "$22B"}, {"label": "Status", "value": "Pending, expected H1 2027"}],
    highlights: ["Sector: Media, Technology & AI", "Announced: 15 Jun 2026", "Enterprise value: $22B", "Status: Pending, expected H1 2027"],
  },
  {
    ...base,
    id: "uber-makes-a-eur-41-50-a-share-offer-for-delivery-hero",
    industry: "Media, Technology & AI",
    title: "Uber makes a EUR 41.50-a-share offer for Delivery Hero",
    lede: "Uber is offering EUR 41.50 per share in cash for the Berlin-based delivery group.",
    location: "Berlin",
    readTime: "1 min read",
    image: img_warehouse_robotics,
    body: [
      "Uber is offering EUR 41.50 per share in cash for the Berlin-based delivery group. Uber already holds 24.77% directly, and with other instruments and shareholder commitments its economic interest would reach about 53%, against a minimum acceptance threshold of 50% plus one share. To pre-empt antitrust concerns it has agreed to sell operations in 14 overlapping markets to SSW Partners for around EUR 1.4 billion.",
      "The political concessions are explicit: Delivery Hero's Berlin headquarters and workforce are protected until at least 2029, and Uber has promised EUR 2 billion of German investment through 2031. The 34% premium to the three-month average price before announcement is the fairer measure; a larger 127% figure is measured against a pre-leak price.",
    ],
    keyFacts: [{"label": "Sector", "value": "Media, Technology & AI"}, {"label": "Announced", "value": "16 Jul 2026"}, {"label": "Value", "value": "About $14.8B"}, {"label": "Status", "value": "Pending, expected H2 2027"}],
    highlights: ["Sector: Media, Technology & AI", "Announced: 16 Jul 2026", "Value: About $14.8B", "Status: Pending, expected H2 2027"],
  },
  {
    ...base,
    id: "smaller-technology-deals-google-completes-wiz-as-salesforce-autodesk-lattice-and-qualcomm-buy",
    industry: "Media, Technology & AI",
    title: "Smaller technology deals: Google completes Wiz as Salesforce, Autodesk, Lattice and Qualcomm buy",
    lede: "Google completed its $32 billion all-cash purchase of cybersecurity firm Wiz on 11 March, after the US Justice Department closed its probe early and the European Commission cleared it unconditionally in February.",
    location: "Global",
    readTime: "1 min read",
    image: img_cyber_ops,
    body: [
      "Google completed its $32 billion all-cash purchase of cybersecurity firm Wiz on 11 March, after the US Justice Department closed its probe early and the European Commission cleared it unconditionally in February. Salesforce agreed to buy AI customer-service platform Fin for about $3.6 billion (announced 15 June, expected to close in its fourth fiscal quarter of 2027), and Autodesk agreed to acquire maintenance software company MaintainX for roughly the same amount in cash. Lattice Semiconductor closed its $1.65 billion purchase of AMI on 27 July, its largest acquisition. Qualcomm completed its purchase of Modular on 29 July; no price was disclosed, and a figure of about $3.9 billion in circulation is press-reported only.",
    ],
    keyFacts: [{"label": "Sector", "value": "Media, Technology & AI"}, {"label": "Period", "value": "Various dates, 2026"}],
    highlights: ["Sector: Media, Technology & AI", "Period: Various dates, 2026"],
  },
  {
    ...base,
    id: "nextera-and-dominion-plan-the-largest-regulated-utility-combination",
    industry: "Energy & Utilities",
    title: "NextEra and Dominion plan the largest regulated utility combination",
    lede: "NextEra Energy will acquire Dominion Energy in an all-stock deal. Dominion shareholders receive 0.8138 NextEra shares each plus a one-time aggregate cash payment of $360 million, leaving NextEra holders with about 74.5% of the combined company.",
    location: "United States",
    readTime: "1 min read",
    image: img_Manu1,
    body: [
      "NextEra Energy will acquire Dominion Energy in an all-stock deal. Dominion shareholders receive 0.8138 NextEra shares each plus a one-time aggregate cash payment of $360 million, leaving NextEra holders with about 74.5% of the combined company. Neither company has disclosed a transaction value; figures near $67 billion in trade press are derived calculations.",
      "Approvals will take time: FERC, the NRC, utility regulators in Virginia, North Carolina and South Carolina, antitrust clearance and both shareholder votes. Virginia is the likeliest pressure point because of the data-centre demand growing in Dominion's territory.",
    ],
    keyFacts: [{"label": "Sector", "value": "Energy & Utilities"}, {"label": "Announced", "value": "18 May 2026"}, {"label": "Value", "value": "Not disclosed"}, {"label": "Status", "value": "Pending, expected 12 to 18 months"}],
    highlights: ["Sector: Energy & Utilities", "Announced: 18 May 2026", "Value: Not disclosed", "Status: Pending, expected 12 to 18 months"],
  },
  {
    ...base,
    id: "devon-and-coterra-complete-their-shale-merger",
    industry: "Energy & Utilities",
    title: "Devon and Coterra complete their shale merger",
    lede: "The all-stock combination gave Coterra holders 0.70 Devon shares each and Devon holders about 54% of the result.",
    location: "United States",
    readTime: "1 min read",
    image: img_energy_tanks,
    body: [
      "The all-stock combination gave Coterra holders 0.70 Devon shares each and Devon holders about 54% of the result. The company keeps the Devon name and DVN ticker and targets $1 billion in annual pre-tax synergies. The $58 billion figure is the combined enterprise value, not a price paid; the consideration itself is around $25 billion.",
    ],
    keyFacts: [{"label": "Sector", "value": "Energy & Utilities"}, {"label": "Announced", "value": "2 Feb 2026"}, {"label": "Closed", "value": "7 May 2026"}, {"label": "Combined enterprise value", "value": "About $58B"}],
    highlights: ["Sector: Energy & Utilities", "Announced: 2 Feb 2026", "Closed: 7 May 2026", "Combined enterprise value: About $58B"],
  },
  {
    ...base,
    id: "engie-closes-uk-power-networks-purchase-early",
    industry: "Energy & Utilities",
    title: "Engie closes UK Power Networks purchase early",
    lede: "Engie bought Britain's largest electricity distributor from CK Infrastructure for GBP 10.5 billion in equity, or GBP 15.8 billion including debt (about $21.4 billion).",
    location: "United Kingdom",
    readTime: "1 min read",
    image: img_Energy1,
    body: [
      "Engie bought Britain's largest electricity distributor from CK Infrastructure for GBP 10.5 billion in equity, or GBP 15.8 billion including debt (about $21.4 billion). It is funding the deal with roughly EUR 5 billion of debt and hybrid securities, EUR 4 billion of disposals through 2028 and up to EUR 3 billion of new equity. Completion came ahead of guidance, with the binding condition being independent shareholder approval at the Hong Kong-listed CK parent companies rather than any UK regulatory hurdle.",
    ],
    keyFacts: [{"label": "Sector", "value": "Energy & Utilities"}, {"label": "Announced", "value": "25 Feb 2026"}, {"label": "Closed", "value": "7 May 2026"}, {"label": "Enterprise value", "value": "GBP 15.8B"}],
    highlights: ["Sector: Energy & Utilities", "Announced: 25 Feb 2026", "Closed: 7 May 2026", "Enterprise value: GBP 15.8B"],
  },
  {
    ...base,
    id: "gip-and-eqt-take-aes-private",
    industry: "Energy & Utilities",
    title: "GIP and EQT take AES private",
    lede: "A consortium led by BlackRock's Global Infrastructure Partners and EQT, with CalPERS and the Qatar Investment Authority, will pay $15.00 per share in cash, a 40.3% premium to the 30-day average price before 8 July 2025.",
    location: "United States",
    readTime: "1 min read",
    image: img_Energy2,
    body: [
      "A consortium led by BlackRock's Global Infrastructure Partners and EQT, with CalPERS and the Qatar Investment Authority, will pay $15.00 per share in cash, a 40.3% premium to the 30-day average price before 8 July 2025. Enterprise value is $33.4 billion but equity value is only $10.7 billion, the difference being AES's debt. Stockholders have approved the deal.",
    ],
    keyFacts: [{"label": "Sector", "value": "Energy & Utilities"}, {"label": "Announced", "value": "2 Mar 2026"}, {"label": "Enterprise value", "value": "$33.4B"}, {"label": "Status", "value": "Pending, expected late 2026"}],
    highlights: ["Sector: Energy & Utilities", "Announced: 2 Mar 2026", "Enterprise value: $33.4B", "Status: Pending, expected late 2026"],
  },
  {
    ...base,
    id: "union-pacific-and-norfolk-southern-rail-merger-on-hold",
    industry: "Energy & Utilities",
    title: "Union Pacific and Norfolk Southern: rail merger on hold",
    lede: "The Surface Transportation Board paused its review of the proposed $85 billion railroad merger on 28 May 2026 pending supplemental filings, and no decision timetable has been set.",
    location: "United States",
    readTime: "1 min read",
    image: img_supply_chain_map,
    body: [
      "The Surface Transportation Board paused its review of the proposed $85 billion railroad merger on 28 May 2026 pending supplemental filings, and no decision timetable has been set.",
    ],
    keyFacts: [{"label": "Sector", "value": "Energy & Utilities"}, {"label": "Announced", "value": "29 Jul 2025"}, {"label": "Value", "value": "$85B"}, {"label": "Status", "value": "Held in abeyance"}],
    highlights: ["Sector: Energy & Utilities", "Announced: 29 Jul 2025", "Value: $85B", "Status: Held in abeyance"],
  },
  {
    ...base,
    id: "equity-residential-and-avalonbay-form-a-69-billion-apartment-landlord",
    industry: "Financial Services & Real Estate",
    title: "Equity Residential and AvalonBay form a $69 billion apartment landlord",
    lede: "This all-stock merger of equals would create one of the largest US apartment owners, with more than 180,000 units and a pro forma equity market value near $52 billion.",
    location: "United States",
    readTime: "1 min read",
    image: img_FIN4,
    body: [
      "This all-stock merger of equals would create one of the largest US apartment owners, with more than 180,000 units and a pro forma equity market value near $52 billion. AvalonBay holders receive 2.793 Equity Residential shares each and would own about 51.2% of the combined company. Because it is a merger of equals, no purchase price exists, and the $69 billion is combined enterprise value. Both shareholder groups still need to vote.",
    ],
    keyFacts: [{"label": "Sector", "value": "Financial Services & Real Estate"}, {"label": "Announced", "value": "21 May 2026"}, {"label": "Combined enterprise value", "value": "$69B"}, {"label": "Status", "value": "Pending, expected H2 2026"}],
    highlights: ["Sector: Financial Services & Real Estate", "Announced: 21 May 2026", "Combined enterprise value: $69B", "Status: Pending, expected H2 2026"],
  },
  {
    ...base,
    id: "nuveen-to-buy-schroders-for-gbp-9-9-billion",
    industry: "Financial Services & Real Estate",
    title: "Nuveen to buy Schroders for GBP 9.9 billion",
    lede: "TIAA's investment arm is paying 590p per share in cash, plus permitted dividends of up to 22p, a 29% premium to Schroders' 456p close on 11 February.",
    location: "United Kingdom",
    readTime: "1 min read",
    image: img_FIN5,
    body: [
      "TIAA's investment arm is paying 590p per share in cash, plus permitted dividends of up to 22p, a 29% premium to Schroders' 456p close on 11 February. The combined platform would manage around $2.5 trillion. Shareholder risk has largely gone: irrevocable commitments cover about 42% of the shares, including the Schroder family trustees, and the 16 April meetings passed with 99.92% support. Court sanction and FCA change-of-control approval remain.",
    ],
    keyFacts: [{"label": "Sector", "value": "Financial Services & Real Estate"}, {"label": "Announced", "value": "12 Feb 2026"}, {"label": "Value", "value": "About $13.5B"}, {"label": "Status", "value": "Pending, expected Q4 2026"}],
    highlights: ["Sector: Financial Services & Real Estate", "Announced: 12 Feb 2026", "Value: About $13.5B", "Status: Pending, expected Q4 2026"],
  },
  {
    ...base,
    id: "santander-nears-completion-of-webster-financial-deal",
    industry: "Financial Services & Real Estate",
    title: "Santander nears completion of Webster Financial deal",
    lede: "Santander is paying $75.59 per Webster share, $48.75 in cash plus 2.0548 Santander ADSs, as part of its push into US commercial banking and a stated goal of an 18% US return on tangible equity by 2028.",
    location: "United States",
    readTime: "1 min read",
    image: img_FIN3,
    body: [
      "Santander is paying $75.59 per Webster share, $48.75 in cash plus 2.0548 Santander ADSs, as part of its push into US commercial banking and a stated goal of an 18% US return on tangible equity by 2028. The OCC approved on 12 June, the ECB on 21 July and the Federal Reserve on 4 August. The two companies quote slightly different values ($12.2 billion and $12.3 billion). Readers should confirm completion, as the tracker used here predates the expected closing date.",
    ],
    keyFacts: [{"label": "Sector", "value": "Financial Services & Real Estate"}, {"label": "Announced", "value": "3 Feb 2026"}, {"label": "Value", "value": "$12.2B"}, {"label": "Closing expected", "value": "20 Aug 2026 (per tracker)"}],
    highlights: ["Sector: Financial Services & Real Estate", "Announced: 3 Feb 2026", "Value: $12.2B", "Closing expected: 20 Aug 2026 (per tracker)"],
  },
  {
    ...base,
    id: "other-financial-deals-caesars-goes-private-as-ice-buys-marketaxess-and-capital-one-closes-brex",
    industry: "Financial Services & Real Estate",
    title: "Other financial deals: Caesars goes private as ICE buys MarketAxess and Capital One closes Brex",
    lede: "Fertitta Entertainment agreed on 28 May to take casino operator Caesars private in a $17.6 billion deal, needing approval from gaming regulators in every state where Caesars is licensed.",
    location: "United States",
    readTime: "1 min read",
    image: img_Insightimage,
    body: [
      "Fertitta Entertainment agreed on 28 May to take casino operator Caesars private in a $17.6 billion deal, needing approval from gaming regulators in every state where Caesars is licensed. Intercontinental Exchange will buy MarketAxess for $167 per share in cash, about $6 billion, at a 33% premium (announced 30 July, expected H1 2027). Capital One completed its $5.15 billion purchase of fintech Brex on 7 April.",
    ],
    keyFacts: [{"label": "Sector", "value": "Financial Services & Real Estate"}, {"label": "Period", "value": "2026"}],
    highlights: ["Sector: Financial Services & Real Estate", "Period: 2026"],
  },
  {
    ...base,
    id: "boston-scientific-to-buy-penumbra-for-14-5-billion",
    industry: "Healthcare & Life Sciences",
    title: "Boston Scientific to buy Penumbra for $14.5 billion",
    lede: "The largest medical-device deal of 2026 takes Boston Scientific into stroke and peripheral interventional care.",
    location: "United States",
    readTime: "1 min read",
    image: img_HC3,
    body: [
      "Pharmaceutical and medical-device groups are using acquisitions to refill pipelines ahead of patent expiries. The tracker cites Evaluate's estimate that more than $300 billion of prescription drug revenue will lose exclusivity between 2025 and 2030, and notes buyers are typically paying premiums of 25% to 50%.",
      "The largest medical-device deal of 2026 takes Boston Scientific into stroke and peripheral interventional care. Penumbra holders can elect $374.00 in cash or 3.8721 Boston Scientific shares, with the mix landing at about 73% cash. Penumbra stockholders have approved, leaving antitrust clearance as the main condition.",
    ],
    keyFacts: [{"label": "Sector", "value": "Healthcare & Life Sciences"}, {"label": "Announced", "value": "15 Jan 2026"}, {"label": "Enterprise value", "value": "$14.5B"}, {"label": "Status", "value": "Pending, expected H2 2026"}],
    highlights: ["Sector: Healthcare & Life Sciences", "Announced: 15 Jan 2026", "Enterprise value: $14.5B", "Status: Pending, expected H2 2026"],
  },
  {
    ...base,
    id: "sun-pharma-buys-organon",
    industry: "Healthcare & Life Sciences",
    title: "Sun Pharma buys Organon",
    lede: "India's Sun Pharma will pay $14.00 per share in cash for the Merck spin-off, building a global women's health and biosimilars business in the largest deal in its history.",
    location: "India",
    readTime: "1 min read",
    image: img_HC4,
    body: [
      "India's Sun Pharma will pay $14.00 per share in cash for the Merck spin-off, building a global women's health and biosimilars business in the largest deal in its history. Be careful with the premium: Organon's own materials cite 103%, measured to a close seventeen days before the announcement, while the premium to the last close before announcement is about 24%.",
    ],
    keyFacts: [{"label": "Sector", "value": "Healthcare & Life Sciences"}, {"label": "Announced", "value": "26 Apr 2026"}, {"label": "Enterprise value", "value": "$11.75B"}, {"label": "Status", "value": "Pending, expected early 2027"}],
    highlights: ["Sector: Healthcare & Life Sciences", "Announced: 26 Apr 2026", "Enterprise value: $11.75B", "Status: Pending, expected early 2027"],
  },
  {
    ...base,
    id: "merck-kgaa-buys-bio-techne-as-abbvie-and-gsk-strike-biotech-deals",
    industry: "Healthcare & Life Sciences",
    title: "Merck KGaA buys Bio-Techne as AbbVie and GSK strike biotech deals",
    lede: "Germany's Merck KGaA will acquire life-science tools group Bio-Techne for $73.00 per share in cash, about $11.3 billion enterprise value (EUR 9.9 billion), announced 25 June; the disclosed 36% premium is measured to the one-month average price.",
    location: "Germany",
    readTime: "1 min read",
    image: img_HC2,
    body: [
      "Germany's Merck KGaA will acquire life-science tools group Bio-Techne for $73.00 per share in cash, about $11.3 billion enterprise value (EUR 9.9 billion), announced 25 June; the disclosed 36% premium is measured to the one-month average price. AbbVie agreed on 22 June to buy Apogee Therapeutics for $135.11 per share in cash, about $10.9 billion at a 49% premium. GSK completed its roughly $10.6 billion purchase of Nuvalent on 15 July.",
    ],
    keyFacts: [{"label": "Sector", "value": "Healthcare & Life Sciences"}, {"label": "Period", "value": "June to July 2026"}],
    highlights: ["Sector: Healthcare & Life Sciences", "Period: June to July 2026"],
  },
  {
    ...base,
    id: "eli-lillys-run-of-biotech-purchases-extends-from-centessa-to-kelonia-orna-and-ajax",
    industry: "Healthcare & Life Sciences",
    title: "Eli Lilly's run of biotech purchases extends from Centessa to Kelonia, Orna and Ajax",
    lede: "Lilly closed its Centessa Pharmaceuticals acquisition on 24 June ($38.00 per share in cash plus a contingent value right of up to $9.00, about $6.3 billion headline).",
    location: "United States",
    readTime: "1 min read",
    image: img_HC1,
    body: [
      "Lilly closed its Centessa Pharmaceuticals acquisition on 24 June ($38.00 per share in cash plus a contingent value right of up to $9.00, about $6.3 billion headline). It also agreed to buy Kelonia Therapeutics (about $3.25 billion upfront, up to $7 billion with milestones), Orna Therapeutics (up to $2.4 billion) and Ajax Therapeutics (up to $2.3 billion). Gilead completed its Tubulis purchase on 21 May (about $3.15 billion upfront plus up to $1.85 billion in milestones), and Angelini Pharma closed its $4.1 billion deal for Catalyst Pharmaceuticals on 16 July.",
    ],
    keyFacts: [{"label": "Sector", "value": "Healthcare & Life Sciences"}, {"label": "Period", "value": "Jan to Jun 2026"}],
    highlights: ["Sector: Healthcare & Life Sciences", "Period: Jan to Jun 2026"],
  },
  {
    ...base,
    id: "mccormick-and-unilevers-foods-business-combine",
    industry: "Industrials, Consumer & Telecoms",
    title: "McCormick and Unilever's foods business combine",
    lede: "McCormick is combining with Unilever's foods arm at 13.8 times FY2025 EBITDA. Unilever receives $15.7 billion in cash plus stock equal to 65% of the combined company, worth roughly $29.1 billion, so McCormick's own shareholders end up in the minority.",
    location: "United States",
    readTime: "1 min read",
    image: img_Manu2,
    body: [
      "McCormick is combining with Unilever's foods arm at 13.8 times FY2025 EBITDA. Unilever receives $15.7 billion in cash plus stock equal to 65% of the combined company, worth roughly $29.1 billion, so McCormick's own shareholders end up in the minority.",
    ],
    keyFacts: [{"label": "Sector", "value": "Industrials, Consumer & Telecoms"}, {"label": "Announced", "value": "31 Mar 2026"}, {"label": "Enterprise value", "value": "$44.8B"}, {"label": "Status", "value": "Pending, expected mid-2027"}],
    highlights: ["Sector: Industrials, Consumer & Telecoms", "Announced: 31 Mar 2026", "Enterprise value: $44.8B", "Status: Pending, expected mid-2027"],
  },
  {
    ...base,
    id: "bouygues-iliad-and-orange-to-split-sfr",
    industry: "Industrials, Consumer & Telecoms",
    title: "Bouygues, Iliad and Orange to split SFR",
    lede: "France's three other mobile operators have entered exclusive talks to divide Altice France's SFR, which would cut the market from four national operators to three.",
    location: "France",
    readTime: "1 min read",
    image: img_Smartc2,
    body: [
      "France's three other mobile operators have entered exclusive talks to divide Altice France's SFR, which would cut the market from four national operators to three. Competition authorities have historically resisted this structure, so expect a prolonged review.",
    ],
    keyFacts: [{"label": "Sector", "value": "Industrials, Consumer & Telecoms"}, {"label": "Signed", "value": "6 Jun 2026"}, {"label": "Value", "value": "EUR 20.4B (about $23.4B)"}, {"label": "Status", "value": "Pending"}],
    highlights: ["Sector: Industrials, Consumer & Telecoms", "Signed: 6 Jun 2026", "Value: EUR 20.4B (about $23.4B)", "Status: Pending"],
  },
  {
    ...base,
    id: "martin-marietta-buys-lhoist-north-america",
    industry: "Industrials, Consumer & Telecoms",
    title: "Martin Marietta buys Lhoist North America",
    lede: "Martin Marietta is paying $7.0 billion in cash and $6.5 billion in stock, about 15 times trailing adjusted EBITDA including run-rate cost savings, to expand its specialties business.",
    location: "United States",
    readTime: "1 min read",
    image: img_Manu3,
    body: [
      "Martin Marietta is paying $7.0 billion in cash and $6.5 billion in stock, about 15 times trailing adjusted EBITDA including run-rate cost savings, to expand its specialties business. The Berghmans family will hold about 15% of Martin Marietta on a fully diluted basis, with the right to appoint one director and one board observer.",
    ],
    keyFacts: [{"label": "Sector", "value": "Industrials, Consumer & Telecoms"}, {"label": "Announced", "value": "29 Jun 2026"}, {"label": "Enterprise value", "value": "$13.5B"}, {"label": "Status", "value": "Pending, expected H2 2026"}],
    highlights: ["Sector: Industrials, Consumer & Telecoms", "Announced: 29 Jun 2026", "Enterprise value: $13.5B", "Status: Pending, expected H2 2026"],
  },
];

export const maEdition1DealTable: { deal: string; value: string; announced: string; status: string }[] = [
  { deal: "Paramount / Warner Bros. Discovery", value: "$110B EV", announced: "27 Feb 2026", status: "Blocked pending trial (Mar 2027)" },
  { deal: "SpaceX / xAI", value: "~$250B (press)", announced: "2 Feb 2026", status: "Closed" },
  { deal: "Equity Residential / AvalonBay", value: "$69B combined EV", announced: "21 May 2026", status: "Pending, H2 2026" },
  { deal: "SpaceX / Cursor", value: "~$60B", announced: "16 Jun 2026", status: "Pending, Q3 2026" },
  { deal: "McCormick / Unilever Foods", value: "$44.8B EV", announced: "31 Mar 2026", status: "Pending, mid-2027" },
  { deal: "GIP-EQT / AES", value: "$33.4B EV", announced: "2 Mar 2026", status: "Pending, late 2026" },
  { deal: "Google / Wiz", value: "$32B", announced: "Mar 2025", status: "Closed 11 Mar 2026" },
  { deal: "Bouygues-Iliad-Orange / SFR", value: "~$23.4B", announced: "6 Jun 2026", status: "Pending" },
  { deal: "Fox / Roku", value: "$22B EV", announced: "15 Jun 2026", status: "Pending, H1 2027" },
  { deal: "Engie / UK Power Networks", value: "~$21.4B", announced: "25 Feb 2026", status: "Closed 7 May 2026" },
  { deal: "Fertitta / Caesars", value: "$17.6B", announced: "28 May 2026", status: "Pending" },
  { deal: "Uber / Delivery Hero", value: "~$14.8B", announced: "16 Jul 2026", status: "Pending, H2 2027" },
  { deal: "Boston Scientific / Penumbra", value: "$14.5B EV", announced: "15 Jan 2026", status: "Pending, H2 2026" },
  { deal: "Nuveen / Schroders", value: "~$13.5B", announced: "12 Feb 2026", status: "Pending, Q4 2026" },
  { deal: "Martin Marietta / Lhoist N. America", value: "$13.5B EV", announced: "29 Jun 2026", status: "Pending, H2 2026" },
  { deal: "Santander / Webster", value: "$12.2B", announced: "3 Feb 2026", status: "Closing 20 Aug 2026" },
  { deal: "Sun Pharma / Organon", value: "$11.75B EV", announced: "26 Apr 2026", status: "Pending, early 2027" },
  { deal: "Merck KGaA / Bio-Techne", value: "$11.3B EV", announced: "25 Jun 2026", status: "Pending, late 2026" },
  { deal: "AbbVie / Apogee", value: "$10.9B", announced: "22 Jun 2026", status: "Pending, Q3 2026" },
  { deal: "GSK / Nuvalent", value: "$10.6B", announced: "Jun 2026", status: "Closed 15 Jul 2026" },
  { deal: "Devon / Coterra", value: "~$25B (EV $58B combined)", announced: "2 Feb 2026", status: "Closed 7 May 2026" },
  { deal: "Union Pacific / Norfolk Southern", value: "$85B", announced: "29 Jul 2025", status: "Held in abeyance" },
];

export const maEdition1Sources =
  "Primary compilation: DealRoom, \"Recent M&A Deals 2026: Tracker, Trends & Upcoming\" (dealroom.net), last updated 8 August 2026, which traces values to acquirer announcements and SEC filings. Individual items draw on the companies' own announcements as cited there, including Paramount, AvalonBay, NextEra, Devon Energy, Engie, McCormick, Global Infrastructure Partners, Google, Orange, Fox, Uber, Boston Scientific, Nuveen, Martin Marietta, Santander, Sun Pharma and Bio-Techne. This digest is a summary and not investment advice. Next edition: Earnings & Markets.";

export function maEdition1ArticlePath(article: Pick<EditionArticle, "id">) {
  return `/article/${article.id}`;
}
