/* =========================================================
   SEARCH INDEX

   One flat, site-wide list of searchable content. Both the
   header search dropdown and the /search results page read
   from this single source, so results stay consistent no
   matter where a search is triggered from.

   If you already have per-page article arrays (e.g. inside
   HomePage.tsx), the long-term fix is to import and flatten
   those here instead of hand-listing entries, so nothing
   drifts out of sync. This file is a working starting point.
========================================================= */

export type SearchItem = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  time: string;
  link: string;
};

export const searchIndex: SearchItem[] = [
  {
    id: "nvidia-humanoid",
    title:
      "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    category: "Technology",
    excerpt:
      "Nvidia expands its collaboration with humanoid robot manufacturers across the US, Europe, and South Korea.",
    time: "12 min ago",
    link: "/technology",
  },
  {
    id: "alphabet-stock-offering",
    title:
      "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    category: "Technology",
    excerpt:
      "Hyperscaler capex tops $700B while grid, water and community pushback intensify.",
    time: "Just now",
    link: "/technology",
  },
  {
    id: "equity-markets-rally",
    title: "U.S. Equity Markets Rally on Strong Manufacturing Data",
    category: "Markets",
    excerpt:
      "Stronger-than-expected domestic factory data drives a continued surge in technology stocks.",
    time: "35 min ago",
    link: "/markets",
  },
  {
    id: "sp500-fed-holds",
    title: "S&P 500 Hits All-Time High as Fed Holds Rates Steady",
    category: "Markets",
    excerpt: "Markets extend their rally after the latest Fed decision.",
    time: "10 min ago",
    link: "/markets",
  },
  {
    id: "gold-surges",
    title: "Gold Surges to $2,400 Amid Global Uncertainty",
    category: "Markets",
    excerpt: "Safe-haven demand climbs as investors weigh macro risk.",
    time: "40 min ago",
    link: "/markets",
  },
  {
    id: "bitcoin-70k",
    title: "Bitcoin Crosses $70,000 as ETF Inflows Hit Record",
    category: "Markets",
    excerpt: "Spot ETF demand pushes crypto markets to new highs.",
    time: "2 hr ago",
    link: "/markets",
  },
  {
    id: "pwc-digital-trust",
    title:
      "PwC 2026 Global Digital Trust Insights: Enterprises Escalate Defense Spending",
    category: "Cybersecurity",
    excerpt:
      "A survey of 3,887 executives across 72 countries shows cybersecurity has become a top-tier board concern.",
    time: "25 min ago",
    link: "/cybersecurity",
  },
  {
    id: "global-markets-rally-finance",
    title: "Global Markets Rally as Investors Digest Latest Economic Data",
    category: "Finance",
    excerpt: "Central banks signal a cautious approach to interest rates.",
    time: "20 min ago",
    link: "/finance",
  },
  {
    id: "banking-sector-results",
    title: "Banking Sector Posts Stronger-Than-Expected Quarterly Results",
    category: "Finance",
    excerpt: "Global investors increase exposure to emerging markets.",
    time: "2 hr ago",
    link: "/finance",
  },
  {
    id: "apple-vision-pro-2",
    title: "Apple Unveils Vision Pro 2 with 40% Thinner Design",
    category: "Business",
    excerpt: "The next-generation headset targets broader consumer adoption.",
    time: "15 min ago",
    link: "/business-news",
  },
  {
    id: "amazon-logistics-acquisition",
    title: "Amazon Acquires Indian Logistics Firm for $1.2 Billion",
    category: "Business",
    excerpt: "The deal expands Amazon's last-mile delivery footprint in India.",
    time: "1 hr ago",
    link: "/business-news",
  },
  {
    id: "goldman-sp500-target",
    title: "Goldman Sachs Raises S&P 500 Year-End Target to 6,500",
    category: "Business",
    excerpt: "Analysts point to resilient earnings and AI-driven capex.",
    time: "2 hr ago",
    link: "/business-news",
  },
  {
    id: "energy-policy-reversals",
    title: "Data Centers and AI Workloads Force Energy Policy Reversals Globally",
    category: "Energy",
    excerpt:
      "Governments revisit grid and permitting rules as AI power demand surges.",
    time: "25 min ago",
    link: "/energy",
  },
  {
    id: "clean-tech-supply-chains",
    title:
      "China's Dominant Position in Clean Tech Supply Chains Creates New Risk Calculus",
    category: "Energy",
    excerpt: "Analysts weigh the geopolitical risk of concentrated supply chains.",
    time: "1 hr ago",
    link: "/energy",
  },
  {
    id: "jpmorgan-energy-resiliency",
    title: "JP Morgan: Energy Resiliency Now a National Security Imperative",
    category: "Energy",
    excerpt: "The bank frames energy infrastructure as a strategic priority.",
    time: "2 hr ago",
    link: "/energy",
  },
  {
    id: "shell-record-profits",
    title: "Shell Posts Record Profits as LNG Demand Surges in Asia",
    category: "Energy",
    excerpt: "Rising Asian demand for LNG lifts Shell's quarterly earnings.",
    time: "3 hr ago",
    link: "/energy",
  },
  {
    id: "quantum-computing-milestone",
    title: "Quantum Computing Startup Achieves 1,000-Qubit Milestone",
    category: "Technology",
    excerpt: "The breakthrough moves the field closer to practical quantum advantage.",
    time: "2 hr ago",
    link: "/technology",
  },
  {
    id: "pride-times-30",
    title: "Pride Times 30 — Leaders to Watch in 2026",
    category: "Leadership",
    excerpt:
      "Thirty global leaders across business, technology, and innovation defining the direction of the global economy.",
    time: "25 min ago",
    link: "/billionaires",
  },
  {
    id: "intelligence-age-ceos",
    title: "The Intelligence Age: How CEOs Are Navigating Transformation",
    category: "Leadership",
    excerpt:
      "A leadership class grappling with the most consequential technology transition in corporate history.",
    time: "3 hr ago",
    link: "/leadership",
  },
  {
    id: "meta-microsoft-ai-customer",
    title: "Meta Has Quietly Become One of Microsoft's Largest AI Customers",
    category: "Technology",
    excerpt: "Cross-cloud AI spending deepens ties between the two rivals.",
    time: "1 hr ago",
    link: "/technology",
  },
];
