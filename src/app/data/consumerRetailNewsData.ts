/* =========================================================
   CONSUMER & RETAIL NEWS — SHARED DATA
   THE PRIDE TIMES
   Source: Global Corporate News Digest — "Consumer & Retail"
========================================================= */

export type ConsumerRetailKeyFact = {
  label: string;
  value: string;
};

export type ConsumerRetailArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  image: string;
  readTime: string;
  highlights: string[];
  keyFacts: ConsumerRetailKeyFact[];
};

export const consumerRetailSectionGlance = [
  { theme: "Shoppers & brands", momentum: "Building", outlook: "Positive" },
  { theme: "E-commerce penetration", momentum: "Accelerating", outlook: "Positive" },
  { theme: "Freight & logistics", momentum: "Uneven", outlook: "Neutral" },
  { theme: "Product safety", momentum: "Under review", outlook: "Watch closely" },
];

const AUTHOR = "Sagar Kumar";

export const consumerRetailArticles: ConsumerRetailArticle[] = [
  {
    id: "consumer-cobalt-ridge-premium-repositioning",
    category: "BRAND STRATEGY",
    title: "Cobalt Ridge Networks reinvents flagship brand with premium repositioning",
    excerpt: "Cobalt Ridge Networks unveiled a premium repositioning of its flagship brand, targeting higher-income urban consumers.",
    author: AUTHOR,
    publishedAt: "2026-09-30T08:00:00Z",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    highlights: [
      "Cobalt Ridge Networks is targeting higher-income urban consumers with a premium repositioning.",
      "The company says the move is a long-term bet rather than a reaction to one quarter.",
      "Analysts point to accelerating e-commerce penetration across North America, Europe and East Asia.",
      "Regulatory approvals and execution remain the key risks to the plan.",
    ],
    keyFacts: [
      { label: "Company", value: "Cobalt Ridge Networks" },
      { label: "Location", value: "Tokyo" },
      { label: "Focus", value: "Premium brand repositioning" },
      { label: "Analyst lens", value: "Execution and disciplined growth" },
    ],
  },
  {
    id: "consumer-yarrow-product-recall",
    category: "PRODUCT SAFETY",
    title: "Yarrow Partners recalls product line after safety review",
    excerpt: "Yarrow Partners voluntarily recalled a product line in several markets following an internal safety review.",
    author: AUTHOR,
    publishedAt: "2026-09-29T08:00:00Z",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80",
    readTime: "4 min read",
    highlights: [
      "Yarrow Partners initiated a voluntary recall across several markets.",
      "The review arrives as companies face heightened scrutiny over product quality and customer trust.",
      "Management says it will consult staff and invest in digital and technical training.",
      "Approvals and market-by-market execution will shape the cost of the response.",
    ],
    keyFacts: [
      { label: "Company", value: "Yarrow Partners" },
      { label: "Location", value: "Zurich" },
      { label: "Action", value: "Voluntary product recall" },
      { label: "Risk watch", value: "Customer trust and regulatory review" },
    ],
  },
  {
    id: "consumer-tidewater-online-sales-freight",
    category: "E-COMMERCE",
    title: "Tidewater Energy reports surge in online sales, warns on freight costs",
    excerpt: "Tidewater Energy said digital sales rose 8.9% but higher logistics costs weighed on profitability.",
    author: AUTHOR,
    publishedAt: "2026-09-28T08:00:00Z",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    readTime: "4 min read",
    highlights: [
      "Digital sales increased 8.9% in the latest update.",
      "Higher freight and logistics costs are offsetting part of the online growth story.",
      "The result reflects the trade-off between convenience, scale and margin discipline.",
      "Investors will watch whether cost pressure persists as volumes expand.",
    ],
    keyFacts: [
      { label: "Company", value: "Tidewater Energy" },
      { label: "Location", value: "Frankfurt" },
      { label: "Online sales", value: "+8.9%" },
      { label: "Pressure", value: "Freight and logistics costs" },
    ],
  },
  {
    id: "consumer-stratos-logistics-product-recall",
    category: "SUPPLY CHAIN",
    title: "Stratos Logistics recalls product line after safety review",
    excerpt: "Stratos Logistics voluntarily recalled a product line in several markets following an internal safety review.",
    author: AUTHOR,
    publishedAt: "2026-09-27T08:00:00Z",
    image: "https://images.unsplash.com/photo-1586528116493-da8b8f2e8b1b?auto=format&fit=crop&w=1200&q=80",
    readTime: "4 min read",
    highlights: [
      "Stratos Logistics has begun a voluntary product recall in multiple markets.",
      "The decision puts supply-chain visibility and customer communication under the spotlight.",
      "The company expects service improvements and product options to roll out progressively.",
      "Regulatory review timelines remain a variable for the next phase.",
    ],
    keyFacts: [
      { label: "Company", value: "Stratos Logistics" },
      { label: "Location", value: "Jakarta" },
      { label: "Action", value: "Voluntary product recall" },
      { label: "Focus", value: "Supply-chain resilience" },
    ],
  },
  {
    id: "consumer-ardent-capital-product-recall",
    category: "CUSTOMER TRUST",
    title: "Ardent Capital recalls product line after safety review",
    excerpt: "Ardent Capital voluntarily recalled a product line in several markets following an internal safety review.",
    author: AUTHOR,
    publishedAt: "2026-09-26T08:00:00Z",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    readTime: "4 min read",
    highlights: [
      "Ardent Capital has joined a wider run of product-safety reviews across consumer markets.",
      "Management says it will prioritize customer communication and operational follow-through.",
      "The response comes as businesses navigate uneven growth and shifting trade patterns.",
      "The next test is whether execution protects the brand beyond the initial announcement.",
    ],
    keyFacts: [
      { label: "Company", value: "Ardent Capital" },
      { label: "Location", value: "Shanghai" },
      { label: "Action", value: "Voluntary product recall" },
      { label: "Watch", value: "Execution and customer confidence" },
    ],
  },
  {
    id: "consumer-kestrel-partners-product-recall",
    category: "RETAIL RISK",
    title: "Kestrel Partners recalls product line after safety review",
    excerpt: "Kestrel Partners voluntarily recalled a product line in several markets following an internal safety review.",
    author: AUTHOR,
    publishedAt: "2026-09-25T08:00:00Z",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    readTime: "4 min read",
    highlights: [
      "Kestrel Partners has recalled a product line after an internal safety review.",
      "The announcement comes as regulators and customers demand faster, clearer responses.",
      "The company says product options and service improvements will be introduced progressively.",
      "Pricing, approvals and the pace of implementation remain key questions.",
    ],
    keyFacts: [
      { label: "Company", value: "Kestrel Partners" },
      { label: "Location", value: "Dubai" },
      { label: "Action", value: "Voluntary product recall" },
      { label: "Key question", value: "Can trust be rebuilt quickly?" },
    ],
  },
];

export function consumerRetailArticlePath(id: string) {
  return `/consumer-retail#${id}`;
}
