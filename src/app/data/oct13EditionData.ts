/* =========================================================
   THE PRIDE TIMES NEWS — GLOBAL & INDIA TECH, INNOVATION AND
   UNICORN EDITION
   Edition of Tuesday, 13 October 2026
   Source: "Global and India Tech, Innovation and Unicorn Report"
   (Corporate briefing, all industries, edition 13 October 2026).

   This file is ADDITIVE. It does not change the 7 October Global
   Industry Edition (octEditionData.ts), the September digest
   (digestArticleData.ts) or Edition 1 (maEdition1Data.ts). The
   homepage leads with these stories; every older story stays in
   the Latest News feed ("Show more stories") and in its own
   section pages.

   All figures are quoted from the report. Unicorn counts differ
   between trackers and dates, so figures are indicative and
   should be compared only within the same source.
========================================================= */

import type { OctEditionArticle } from "./octEditionData";

import img_FIN4 from "../../imports/FIN4.png";
import img_FIN5 from "../../imports/FIN5.png";
import img_Insightimage from "../../imports/Insightimage.png";
import img_Manu3 from "../../imports/Manu3.png";
import img_Techheroimage from "../../imports/Techheroimage.png";
import img_business_jio_digital from "../../imports/business-jio-digital.png";
import img_cyber_ops from "../../imports/cyber-ops.png";
import img_data_centre from "../../imports/data-centre.png";
import img_heroimage from "../../imports/heroimage.png";
import img_pt_digital_economy from "../../imports/pt-digital-economy.png";
import img_pt_global_markets from "../../imports/pt-global-markets.png";
import img_supply_chain_map from "../../imports/supply-chain-map.png";
import img_warehouse_robotics from "../../imports/warehouse-robotics.png";

export const oct13EditionMeta = {
  title: "The Pride Times News",
  edition: "Global and India Tech, Innovation and Unicorn Edition",
  date: "13 October 2026",
  subtitle:
    "Global venture funding, the unicorn club, AI and deep-tech building blocks, industry impact, and India's funding, IPO, AI, semiconductor and policy picture.",
};

const OCT13_NOTE =
  "The Pride Times News, Global and India Tech, Innovation and Unicorn Edition, 13 October 2026. Source: Global and India Tech, Innovation and Unicorn Report (corporate briefing, all industries). Figures come from the trackers named in each story (Crunchbase, PitchBook, BestBrokers, Tracxn, ET, Xpheno). Unicorn counts differ between trackers and dates, so treat them as indicative and compare only within the same source. Check exchange filings for the current status of any IPO. This edition is a summary and not investment advice.";

const base = {
  author: "The Pride Times Newsroom",
  publishedAt: "13 October 2026",
  quote: { text: "", by: "" },
  /* -1 = no pull quote is rendered. */
  quoteAfter: -1,
  editorNote: OCT13_NOTE,
};

export const oct13EditionArticles: OctEditionArticle[] = [
  /* ---------------------------------------------------------
     1. EXECUTIVE SUMMARY — LEAD STORY
  --------------------------------------------------------- */
  {
    ...base,
    id: "ai-absorbs-most-venture-capital-as-the-unicorn-club-hits-a-record",
    sectionNumber: 2,
    section: "Technology and AI",
    sectionPath: "/technology",
    industry: "Venture Capital and AI",
    title: "AI Absorbs Most Venture Capital as the Unicorn Club Hits a Record",
    lede: "About 1,830 private companies are now valued at $1 billion or more, together worth roughly $8.41 trillion, and capital is concentrating in a handful of AI labs.",
    location: "Global",
    readTime: "4 min read",
    image: img_data_centre,
    body: [
      "AI is absorbing most venture capital. Global equity funding for AI companies was on track for a record of about $387.5 billion in the first half of 2026, and one analysis estimates AI took roughly 80% of all venture dollars in the first quarter.",
      "The unicorn club is at an all-time high. About 1,830 private companies are valued at $1 billion or more, together worth roughly $8.41 trillion, according to Crunchbase and PitchBook data as of August 2026. Of those, 173 became unicorns in 2026 alone.",
      "Capital is concentrated. The United States produced 102 of the 173 new unicorns, China 25 and the United Kingdom 13. One analysis reports that three labs, OpenAI, Anthropic and xAI, took about two-thirds of first-quarter AI funding.",
      "India is maturing rather than slowing. Funding rose 7% to $10.3 billion in January to September 2026 while deal count fell 38%, which means fewer, larger and more selective bets. Six new Indian unicorns appeared in nine months, and the IPO market is the busiest in years.",
      "The unicorn mix has also shifted from apps to infrastructure: AI, defence tech, space, semiconductors, energy and robotics.",
      "A reading note from the report: unicorn counts differ between trackers and dates. One count has 47 by March and 98 by mid-year, while another has 173 by August. Treat the figures as indicative and compare only within the same source.",
      "Why it matters: the strongest startups are capital-heavy and can afford to compete for enterprise talent and data-centre capacity, so suppliers, partners and competitors are changing.",
    ],
    keyFacts: [
      { label: "AI equity funding, H1 2026", value: "About $387.5 billion (record pace)" },
      { label: "Unicorns worldwide", value: "About 1,830, worth roughly $8.41 trillion" },
      { label: "New unicorns in 2026", value: "173 (US 102, China 25, UK 13)" },
    ],
    highlights: [
      "AI equity funding, H1 2026: About $387.5 billion (record pace)",
      "Unicorns worldwide: About 1,830, worth roughly $8.41 trillion",
      "New unicorns in 2026: 173 (US 102, China 25, UK 13)",
    ],
  },

  /* ---------------------------------------------------------
     2. GLOBAL FUNDING LANDSCAPE — AI CAPITAL WAVE
  --------------------------------------------------------- */
  {
    ...base,
    id: "the-ai-capital-wave-is-both-the-biggest-boom-and-the-first-real-shakeout",
    sectionNumber: 1,
    section: "Markets and Finance",
    sectionPath: "/markets",
    industry: "Global Venture Funding",
    title: "The AI Capital Wave Is Both the Biggest Boom and the First Real Shakeout",
    lede: "Very large rounds into a handful of frontier AI companies sit on top of a wide base of application and infrastructure startups, with compute, data centres and power as the new bottlenecks.",
    location: "Global",
    readTime: "3 min read",
    image: img_pt_global_markets,
    body: [
      "Venture funding in 2026 is shaped by very large rounds into a handful of frontier AI companies, plus a wide base of application and infrastructure startups.",
      "Commentators describe the moment as both the biggest boom and the first real shakeout. It is capital-intensive, with compute, data centres and power as the new bottlenecks.",
      "The concentration is stark. One analysis reports that OpenAI, Anthropic and xAI took about two-thirds of first-quarter AI funding, and another estimates AI took roughly 80% of all venture dollars in the first quarter.",
      "The report lists concentration risk first among the items to watch: a few AI labs absorb most capital, and a valuation reset would ripple through suppliers and investors.",
      "Why it matters: when a few companies absorb most of the money, the health of the wider startup ecosystem depends on how long that capital keeps flowing.",
    ],
    keyFacts: [
      { label: "AI share of VC dollars, Q1 2026", value: "Roughly 80% (one analysis)" },
      { label: "Three labs' share of Q1 AI funding", value: "About two-thirds (OpenAI, Anthropic, xAI)" },
      { label: "New bottlenecks", value: "Compute, data centres and power" },
    ],
    highlights: [
      "AI share of VC dollars, Q1 2026: Roughly 80% (one analysis)",
      "Three labs' share of Q1 AI funding: About two-thirds (OpenAI, Anthropic, xAI)",
      "New bottlenecks: Compute, data centres and power",
    ],
  },

  /* ---------------------------------------------------------
     3. GEOGRAPHY OF UNICORNS
  --------------------------------------------------------- */
  {
    ...base,
    id: "india-ranks-third-globally-with-89-unicorns-ahead-of-the-uk-and-germany",
    sectionNumber: 2,
    section: "Technology and AI",
    sectionPath: "/technology",
    industry: "Unicorns",
    title: "India Ranks Third Globally With 89 Unicorns, Ahead of the UK and Germany",
    lede: "The United States leads with 938 unicorns worth $5.04 trillion, followed by China with 310, in Crunchbase and PitchBook data compiled by BestBrokers in August 2026.",
    location: "Global",
    readTime: "3 min read",
    image: img_pt_digital_economy,
    body: [
      "The United States has 938 unicorns with a combined value of $5.04 trillion, according to Crunchbase and PitchBook data compiled by BestBrokers in August 2026. China is second with 310 unicorns worth $1.51 trillion.",
      "India ranks third globally with 89 unicorns worth a combined $499 billion. That puts it ahead of the United Kingdom, which has 80 unicorns worth $299 billion, and Germany, which has 47 worth $142.2 billion.",
      "The rest of the top ten: Canada has 38 unicorns worth $97 billion, France 34 worth $88.5 billion, Israel 23 worth $47 billion, Singapore 23 worth $38 billion and South Korea 21 worth $61.1 billion.",
      "Why it matters: India's third place is a measure of how far its startup ecosystem has come, even as the US and China remain far larger in both count and combined value.",
    ],
    keyFacts: [
      { label: "United States", value: "938 unicorns, $5.04 trillion" },
      { label: "China", value: "310 unicorns, $1.51 trillion" },
      { label: "India", value: "89 unicorns, $499 billion (third globally)" },
    ],
    highlights: [
      "United States: 938 unicorns, $5.04 trillion",
      "China: 310 unicorns, $1.51 trillion",
      "India: 89 unicorns, $499 billion (third globally)",
    ],
  },

  /* ---------------------------------------------------------
     4. CLASS OF 2026
  --------------------------------------------------------- */
  {
    ...base,
    id: "the-class-of-2026-us-takes-102-of-173-new-unicorns-while-europe-bets-on-deep-tech",
    sectionNumber: 2,
    section: "Technology and AI",
    sectionPath: "/technology",
    industry: "Unicorns",
    title: "The Class of 2026: US Takes 102 of 173 New Unicorns While Europe Bets on Deep Tech",
    lede: "The UK's 13 new unicorns are worth $21 billion combined, led by AI lab Ineffable Intelligence at a $5.1 billion valuation.",
    location: "Global",
    readTime: "3 min read",
    image: img_Techheroimage,
    body: [
      "The United States produced 102 new unicorns, 59% of the year's total of 173.",
      "The United Kingdom produced 13 new unicorns worth $21 billion combined. The largest is AI lab Ineffable Intelligence at a $5.1 billion valuation after a $700 million Series A, the second most valuable new unicorn globally this year.",
      "Continental Europe is betting on specialist technology. Belgium produced two cybersecurity unicorns, Keyrock and Aikido Security. Spain produced two deep-tech names, aerospace firm Xoople and quantum computing startup Multiverse Computing. France added defence AI startup Harmattan AI.",
      "Space and aviation tech were among the most heavily funded new entrants: Varda Space Industries has raised over $578 million and Skyryse about $543 million. A Bahrain-based crypto platform, Rain, reached a $1.9 billion valuation.",
      "Why it matters: new unicorns are being minted far from the consumer-app model of earlier cycles, in cybersecurity, aerospace, quantum and defence.",
    ],
    keyFacts: [
      { label: "US new unicorns", value: "102 (59% of the year's total)" },
      { label: "UK new unicorns", value: "13, worth $21 billion combined" },
      { label: "Ineffable Intelligence", value: "$5.1 billion valuation after $700 million Series A" },
    ],
    highlights: [
      "US new unicorns: 102 (59% of the year's total)",
      "UK new unicorns: 13, worth $21 billion combined",
      "Ineffable Intelligence: $5.1 billion valuation after $700 million Series A",
    ],
  },

  /* ---------------------------------------------------------
     5. UNICORN MIX — APPS TO INFRASTRUCTURE
  --------------------------------------------------------- */
  {
    ...base,
    id: "defence-space-and-semiconductors-replace-apps-and-fintech-in-the-unicorn-mix",
    sectionNumber: 2,
    section: "Technology and AI",
    sectionPath: "/technology",
    industry: "Deep Technology",
    title: "Defence, Space and Semiconductors Replace Apps and Fintech in the Unicorn Mix",
    lede: "Unlike earlier cycles, this wave centres on strategic infrastructure, which means suppliers, partners and competitors are increasingly capital-heavy.",
    location: "Global",
    readTime: "3 min read",
    image: img_heroimage,
    body: [
      "The unicorn mix has shifted from apps to infrastructure: AI, defence tech, space, semiconductors, energy and robotics.",
      "Defence and security tech and aerospace and space each produced about six unicorns in the 98-company cohort tracked mid-year.",
      "Unlike earlier cycles dominated by consumer apps and fintech, this wave centres on strategic infrastructure. For corporates, that means suppliers, partners and competitors are increasingly capital-heavy, and the strongest startups can afford to compete for enterprise talent and data-centre capacity.",
      "Why it matters: a startup with a large funding round can bid for the same engineers and data-centre capacity as an established company.",
    ],
    keyFacts: [
      { label: "Defence and security tech unicorns", value: "About six (98-company mid-year cohort)" },
      { label: "Aerospace and space unicorns", value: "About six (98-company mid-year cohort)" },
      { label: "Shift", value: "From apps and fintech to infrastructure" },
    ],
    highlights: [
      "Defence and security tech unicorns: About six (98-company mid-year cohort)",
      "Aerospace and space unicorns: About six (98-company mid-year cohort)",
      "Shift: From apps and fintech to infrastructure",
    ],
  },

  /* ---------------------------------------------------------
     6. TECHNOLOGY BUILDING BLOCKS
  --------------------------------------------------------- */
  {
    ...base,
    id: "eight-technology-building-blocks-are-reshaping-every-industry",
    sectionNumber: 2,
    section: "Technology and AI",
    sectionPath: "/technology",
    industry: "AI and Deep Technology",
    title: "Eight Technology Building Blocks Are Reshaping Every Industry",
    lede: "From AI agents and compute to quantum and robotics, value is moving from model access to workflow integration and governance.",
    location: "Global",
    readTime: "4 min read",
    image: img_Insightimage,
    body: [
      "Foundation models and AI agents: the shift is from chat to systems that execute multi-step work such as coding, support, procurement and finance operations. Value is moving from model access to workflow integration and governance.",
      "Compute and AI infrastructure: GPUs, data centres, networking, power and cooling are strategic assets. Expect long-term capacity contracts and sovereign compute programmes.",
      "Semiconductors and advanced packaging: supply-chain resilience and domestic chip ecosystems in the US, EU, India and Japan are policy priorities.",
      "Defence, space and aerospace tech: dual-use drones, satellites, launch and autonomy attract government and venture money together.",
      "Cybersecurity: AI raises both attack speed and defence automation, while identity, cloud and supply-chain security remain high-growth categories.",
      "Quantum and frontier compute: still early commercially, but funding and unicorn formation, such as Multiverse Computing, show investor appetite.",
      "Robotics and physical AI: warehousing, manufacturing and eventually service robotics move from pilots to deployments.",
      "Energy and climate tech: power demand from AI is pulling investment into grid, storage, biogas and nuclear-adjacent technologies.",
      "The report presents this section as analytical framing based on the trends above, not a news log.",
    ],
    keyFacts: [
      { label: "AI agents", value: "From chat to multi-step execution" },
      { label: "Compute", value: "Long-term capacity contracts, sovereign compute" },
      { label: "Energy", value: "AI power demand pulls investment into grid and storage" },
    ],
    highlights: [
      "AI agents: From chat to multi-step execution",
      "Compute: Long-term capacity contracts, sovereign compute",
      "Energy: AI power demand pulls investment into grid and storage",
    ],
  },

  /* ---------------------------------------------------------
     7. INDUSTRY-BY-INDUSTRY IMPACT
  --------------------------------------------------------- */
  {
    ...base,
    id: "industry-by-industry-what-ai-and-deep-tech-mean-for-banking-healthcare-manufacturing-and-retail",
    sectionNumber: 7,
    section: "Industry and Supply Chain",
    sectionPath: "/supply-chain",
    industry: "Industry Impact",
    title: "Industry by Industry: What AI and Deep Tech Mean for Banking, Healthcare, Manufacturing and Retail",
    lede: "Eleven industries face a different technology shift, and the corporate action the report recommends for each ranges from modernising core systems to securing power.",
    location: "Global",
    readTime: "4 min read",
    image: img_warehouse_robotics,
    body: [
      "Banking and fintech: agentic payments, AI underwriting and real-time rails in the style of UPI. Corporate action: modernise the core and pilot agent-based servicing with controls.",
      "Insurance: AI claims triage, usage-based pricing and reinsurance tech. Corporate action: automate claims and rebuild data foundations.",
      "Healthcare and pharma: AI drug discovery, diagnostics and clinical documentation. Corporate action: partner with AI-bio startups and validate regulatory pathways.",
      "Manufacturing: physical AI, predictive maintenance and domestic chip supply. Corporate action: pilot robotics and secure component supply.",
      "Retail and consumer: quick commerce, AI personalisation and retail-tech. Corporate action: tighten unit economics and use AI for forecasting.",
      "Energy and utilities: storage, grid software and AI-driven demand forecasting. Corporate action: secure power for data and operations.",
      "Defence and aerospace: autonomy, space systems and defence AI. Corporate action: engage the startup supply chain early.",
      "Telecom and media: AI infrastructure and content automation. Corporate action: monetise network and data assets.",
      "Logistics and mobility: autonomy, drones and advanced air mobility prototypes. Corporate action: test automation in hubs and last mile.",
      "Professional services and IT: AI-led delivery is shrinking labour-based models. Corporate action: shift to outcome-based pricing and reskilling.",
      "Agriculture and food: precision farming, biogas and supply-chain visibility. Corporate action: back data-driven sourcing.",
    ],
    keyFacts: [
      { label: "Banking and fintech", value: "Agentic payments, AI underwriting, UPI-style rails" },
      { label: "Manufacturing", value: "Physical AI, predictive maintenance, domestic chips" },
      { label: "Professional services and IT", value: "Shift to outcome-based pricing and reskilling" },
    ],
    highlights: [
      "Banking and fintech: Agentic payments, AI underwriting, UPI-style rails",
      "Manufacturing: Physical AI, predictive maintenance, domestic chips",
      "Professional services and IT: Shift to outcome-based pricing and reskilling",
    ],
  },

  /* ---------------------------------------------------------
     8. INDIA — FUNDING
  --------------------------------------------------------- */
  {
    ...base,
    id: "india-tech-funding-rises-7-to-10-3-billion-as-deal-count-falls-38",
    sectionNumber: 1,
    section: "Markets and Finance",
    sectionPath: "/markets",
    industry: "India Startups",
    title: "India Tech Funding Rises 7% to $10.3 Billion as Deal Count Falls 38%",
    lede: "Investors are writing fewer, larger cheques, and first-time seed funding is harder to get, according to Tracxn data for January to September 2026.",
    location: "India",
    readTime: "3 min read",
    image: img_business_jio_digital,
    body: [
      "According to Tracxn data for 1 January to 21 September 2026, total tech funding in India was $10.3 billion, up 7% year on year. Funding rounds numbered 1,134, down 38%.",
      "Early-stage funding was $4.2 billion, up 27%. Seed funding was $698 million, down 37%. Late-stage funding was $5.4 billion, roughly flat.",
      "Six new unicorns appeared in nine months, and founders raised about $101 million on average before reaching unicorn status.",
      "The report's interpretation: investors favour stronger fundamentals, larger cheques and clearer paths to profit. First-time seed funding is harder to get.",
      "Why it matters: India is maturing, not slowing. The money is still arriving, but it is going to fewer and more established companies.",
    ],
    keyFacts: [
      { label: "Total tech funding, Jan to Sep 2026", value: "$10.3 billion, up 7%" },
      { label: "Funding rounds", value: "1,134, down 38%" },
      { label: "Seed funding", value: "$698 million, down 37%" },
    ],
    highlights: [
      "Total tech funding, Jan to Sep 2026: $10.3 billion, up 7%",
      "Funding rounds: 1,134, down 38%",
      "Seed funding: $698 million, down 37%",
    ],
  },

  /* ---------------------------------------------------------
     9. INDIA — IPO BOOM
  --------------------------------------------------------- */
  {
    ...base,
    id: "indias-ipo-boom-61-issues-worth-about-rs-88000-crore-in-three-months",
    sectionNumber: 1,
    section: "Markets and Finance",
    sectionPath: "/markets",
    industry: "India IPO Market",
    title: "India's IPO Boom: 61 Issues Worth About ₹88,000 Crore in Three Months",
    lede: "About 148 SEBI-approved companies worth around ₹2.8 lakh crore are waiting in the pipeline, while Zepto paused its IPO for a smaller pre-IPO raise.",
    location: "India",
    readTime: "3 min read",
    image: img_FIN4,
    body: [
      "India's IPO market is the busiest in years. There were 27 mainboard IPOs in the first half of 2026, then roughly 61 issues worth about ₹88,000 crore in July to September alone, according to ET.",
      "About 148 companies with SEBI approval, worth around ₹2.8 lakh crore, are waiting in the pipeline. A weekly India startup newsletter counted 47 tech IPOs by late July 2026.",
      "Names reported in IPO trackers as at various stages include Razorpay, Amagi, Fractal, boAt, Shiprocket and OYO.",
      "Zepto paused its IPO in favour of a smaller pre-IPO raise, which the report reads as a sign that public investors now demand profitability and lower cash burn.",
      "The report advises readers to check exchange filings for current status before relying on any single name. It also lists IPO saturation as a risk: heavy supply may pressure listing performance.",
    ],
    keyFacts: [
      { label: "Mainboard IPOs, H1 2026", value: "27" },
      { label: "Issues in July to September", value: "About 61, worth about ₹88,000 crore" },
      { label: "SEBI-approved pipeline", value: "About 148 companies, around ₹2.8 lakh crore" },
    ],
    highlights: [
      "Mainboard IPOs, H1 2026: 27",
      "Issues in July to September: About 61, worth about ₹88,000 crore",
      "SEBI-approved pipeline: About 148 companies, around ₹2.8 lakh crore",
    ],
  },

  /* ---------------------------------------------------------
     10. INDIA — AI AND COMPUTE
  --------------------------------------------------------- */
  {
    ...base,
    id: "indiaai-mission-backs-12-startups-as-utho-cloud-adds-10000-gpus",
    sectionNumber: 2,
    section: "Technology and AI",
    sectionPath: "/technology",
    industry: "India AI and Compute",
    title: "IndiaAI Mission Backs 12 Startups as Utho Cloud Adds 10,000 GPUs",
    lede: "A roughly $30 billion infrastructure commitment reported in June 2026 is described as a turning point for India's AI infrastructure story.",
    location: "India",
    readTime: "3 min read",
    image: img_Techheroimage,
    body: [
      "Under the IndiaAI Mission, 12 startups, including Sarvam AI, are building indigenous large language and multimodal models on Indian datasets.",
      "Domestic cloud player Utho Cloud was reported to be adding about 10,000 GPUs to India's AI stack. A roughly $30 billion infrastructure commitment reported in June 2026 is described as a turning point for India's AI infrastructure story.",
      "On regulation, Electronics and IT Minister Ashwini Vaishnaw has spoken of a techno-legal approach to AI risk alongside semiconductor scale-up.",
      "Why it matters: compute capacity and home-grown models are becoming part of India's national technology strategy.",
    ],
    keyFacts: [
      { label: "IndiaAI Mission startups", value: "12, including Sarvam AI" },
      { label: "Utho Cloud GPUs", value: "About 10,000 being added" },
      { label: "Infrastructure commitment, June 2026", value: "Roughly $30 billion" },
    ],
    highlights: [
      "IndiaAI Mission startups: 12, including Sarvam AI",
      "Utho Cloud GPUs: About 10,000 being added",
      "Infrastructure commitment, June 2026: Roughly $30 billion",
    ],
  },

  /* ---------------------------------------------------------
     11. INDIA — SEMICONDUCTORS
  --------------------------------------------------------- */
  {
    ...base,
    id: "indias-chip-push-rs-1-27-lakh-crore-investment-and-at-least-six-startup-tape-outs",
    sectionNumber: 2,
    section: "Technology and AI",
    sectionPath: "/technology",
    industry: "Semiconductors",
    title: "India's Chip Push: ₹1.27 Lakh Crore Investment and at Least Six Startup Tape-Outs",
    lede: "Indian semiconductor startups raised $61.9 million in H1 2026 alone, about 81% of the 2025 total.",
    location: "India",
    readTime: "3 min read",
    image: img_Manu3,
    body: [
      "A semiconductor investment of about ₹1.27 lakh crore, roughly $13 billion, was reported in July 2026.",
      "Indian semiconductor startups raised about $206 million across 51 rounds since 2022. Of that, $61.9 million came in the first half of 2026 alone, about 81% of the 2025 total.",
      "At least six startups have completed chip tape-outs. Focus areas include AI inference chips, power management for AI data centres, design IP and EDA, analog and RF, and advanced packaging.",
      "Why it matters: domestic chip ecosystems in the US, EU, India and Japan are policy priorities, and India's startups are now producing working designs.",
    ],
    keyFacts: [
      { label: "Investment reported, July 2026", value: "About ₹1.27 lakh crore (~$13 billion)" },
      { label: "Startup funding since 2022", value: "About $206 million across 51 rounds" },
      { label: "Tape-outs completed", value: "At least six startups" },
    ],
    highlights: [
      "Investment reported, July 2026: About ₹1.27 lakh crore (~$13 billion)",
      "Startup funding since 2022: About $206 million across 51 rounds",
      "Tape-outs completed: At least six startups",
    ],
  },

  /* ---------------------------------------------------------
     12. INDIA — POLICY AND CAPITAL FORMATION
  --------------------------------------------------------- */
  {
    ...base,
    id: "budget-2026-transition-vcs-rs-1500-crore-fund-and-record-upi-volumes",
    sectionNumber: 1,
    section: "Markets and Finance",
    sectionPath: "/markets",
    industry: "India Policy and Fintech",
    title: "Budget 2026, Transition VC's ₹1,500 Crore Fund and Record UPI Volumes",
    lede: "Policy support, new deep-tech funds and payments growth continue even as tech startup hiring is expected to stay subdued.",
    location: "India",
    readTime: "3 min read",
    image: img_FIN5,
    body: [
      "Budget 2026 announced about ₹10,000 crore of funds and credit support for startups and MSMEs, with deep-tech and high-tech manufacturing emphasised.",
      "Transition VC launched a ₹1,500 crore fund, roughly $155 million, for energy-focused deep-tech founders.",
      "UPI posted record volumes and growing international reach in July 2026.",
      "Indian fintechs are building RBI-aligned MSME credit products, for example SG Finserve and BharatPe Money.",
      "On hiring, tech startup hiring is expected to stay subdued in 2026, according to Xpheno, even as capital flows.",
    ],
    keyFacts: [
      { label: "Budget 2026 support", value: "About ₹10,000 crore for startups and MSMEs" },
      { label: "Transition VC fund", value: "₹1,500 crore (~$155 million), energy deep-tech" },
      { label: "UPI, July 2026", value: "Record volumes" },
    ],
    highlights: [
      "Budget 2026 support: About ₹10,000 crore for startups and MSMEs",
      "Transition VC fund: ₹1,500 crore (~$155 million), energy deep-tech",
      "UPI, July 2026: Record volumes",
    ],
  },

  /* ---------------------------------------------------------
     13. RISKS AND WATCH-LIST
  --------------------------------------------------------- */
  {
    ...base,
    id: "six-risks-on-the-watch-list-concentration-compute-regulation-ipo-saturation-talent-and-geopolitics",
    sectionNumber: 1,
    section: "Markets and Finance",
    sectionPath: "/markets",
    industry: "Risk Watch",
    title: "Six Risks on the Watch-List: Concentration, Compute, Regulation, IPO Saturation, Talent and Geopolitics",
    lede: "A valuation reset at a few AI labs would ripple through suppliers and investors, while compute and power limit how fast AI can scale.",
    location: "Global",
    readTime: "3 min read",
    image: img_cyber_ops,
    body: [
      "Concentration risk: a few AI labs absorb most capital, and a valuation reset would ripple through suppliers and investors.",
      "Compute and power constraints limit how fast AI can scale.",
      "Regulatory divergence across the US, EU, China and India on AI, data and chips.",
      "IPO saturation in India: heavy supply may pressure listing performance.",
      "Talent shifts: automation is changing hiring in IT services and startups.",
      "Geopolitics and export controls affecting AI model and chip access.",
    ],
    keyFacts: [
      { label: "Concentration", value: "A few AI labs absorb most capital" },
      { label: "India IPOs", value: "Heavy supply may pressure listings" },
      { label: "Geopolitics", value: "Export controls on AI models and chips" },
    ],
    highlights: [
      "Concentration: A few AI labs absorb most capital",
      "India IPOs: Heavy supply may pressure listings",
      "Geopolitics: Export controls on AI models and chips",
    ],
  },

  /* ---------------------------------------------------------
     14. RECOMMENDATIONS FOR CORPORATE LEADERS
  --------------------------------------------------------- */
  {
    ...base,
    id: "six-moves-for-corporate-leaders-tie-ai-to-pl-secure-compute-and-engage-startups",
    sectionNumber: 2,
    section: "Technology and AI",
    sectionPath: "/technology",
    industry: "Corporate Strategy",
    title: "Six Moves for Corporate Leaders: Tie AI to P&L, Secure Compute and Engage Startups",
    lede: "The report recommends measurable workflow outcomes over generic pilots, long-term capacity partnerships and governance that scales with deployment.",
    location: "Global",
    readTime: "3 min read",
    image: img_supply_chain_map,
    body: [
      "Build an AI roadmap tied to specific workflows and measurable P&L outcomes, not generic pilots.",
      "Secure compute, data and power capacity early through long-term partnerships.",
      "Create a startup engagement programme, with a venture arm, pilots and a procurement fast-track, targeting infrastructure, security and vertical AI.",
      "Stress-test vendor concentration across a few frontier model providers.",
      "For India: track the IPO window, deep-tech incentives and the semiconductor ecosystem for partnership and M&A opportunities.",
      "Invest in governance: AI risk, security and compliance should scale with deployment.",
    ],
    keyFacts: [
      { label: "AI roadmap", value: "Tied to workflows and P&L outcomes" },
      { label: "Capacity", value: "Secure compute, data and power early" },
      { label: "Governance", value: "Scale AI risk, security and compliance with deployment" },
    ],
    highlights: [
      "AI roadmap: Tied to workflows and P&L outcomes",
      "Capacity: Secure compute, data and power early",
      "Governance: Scale AI risk, security and compliance with deployment",
    ],
  },
];

/* "Numbers at a Glance" — headline figures from the edition. */
export const oct13EditionGlance: { indicator: string; figure: string; source: string }[] = [
  { indicator: "AI equity funding, H1 2026", figure: "About $387.5 billion", source: "Report (record pace)" },
  { indicator: "Unicorns worldwide", figure: "About 1,830, worth ~$8.41 trillion", source: "Crunchbase / PitchBook, Aug 2026" },
  { indicator: "New unicorns in 2026", figure: "173 (US 102, China 25, UK 13)", source: "Crunchbase / PitchBook" },
  { indicator: "India unicorns", figure: "89, worth $499 billion", source: "BestBrokers, Aug 2026" },
  { indicator: "India tech funding, Jan to Sep 2026", figure: "$10.3 billion, +7%", source: "Tracxn" },
  { indicator: "India funding rounds, Jan to Sep 2026", figure: "1,134, -38%", source: "Tracxn" },
  { indicator: "India IPOs, July to September", figure: "About 61 issues, ~₹88,000 crore", source: "ET" },
  { indicator: "India semiconductor investment reported", figure: "About ₹1.27 lakh crore (~$13 billion)", source: "Report, July 2026" },
];

export function oct13EditionArticlePath(article: Pick<OctEditionArticle, "id">) {
  return `/article/${article.id}`;
}
