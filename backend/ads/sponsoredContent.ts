// ============================================================
// THE PRIDE TIMES — SPONSORED CONTENT ARTICLES
// ============================================================

import type { SponsoredArticle } from "./adsTypes";

export const SPONSORED_ARTICLES: SponsoredArticle[] = [
  {
    id: "sponsor_001",
    name: "Infosys AI Platform Campaign",
    format: "sponsored_article",
    provider: "direct",
    status: "active",
    targeting: "global",
    pages: ["/technology", "/innovation", "/business-news", "/"],
    priority: 1,
    impressions: 34210,
    clicks: 2053,
    revenue: 12000.00,
    ctr: 6.0,
    createdAt: "2026-05-01",
    expiresAt: "2026-06-30",
    budget: 25000,
    spent: 12000,
    headline: "How Infosys Topaz AI Platform is Transforming Enterprise Operations at Fortune 500 Companies",
    excerpt:
      "Infosys Topaz, an AI-first set of services and solutions, is driving $1.2B in documented cost savings across 340+ enterprise deployments in 45 countries. Here's how the platform delivers measurable ROI.",
    body: `Artificial intelligence has moved from pilot projects to production reality. Infosys Topaz — the company's AI-first suite of cloud, data, and digital services — has become the backbone of digital transformation for some of the world's largest corporations.

In a comprehensive study spanning 18 months and 340 enterprise deployments across banking, manufacturing, retail, and healthcare, Infosys documented average operational efficiency gains of 34%, with leading clients achieving over 50% reduction in manual processing costs.

"The question is no longer whether AI will transform your industry — it's whether you'll lead that transformation or be disrupted by it," said Salil Parekh, Infosys CEO. "Topaz gives our clients a production-grade path to AI at enterprise scale."

Key outcomes from enterprise Topaz deployments:
• 67% reduction in document processing time for BFSI clients
• 42% improvement in supply chain prediction accuracy for manufacturing
• $340M in fraud prevented across banking deployments in 2025
• 89% customer satisfaction score on AI-powered service interactions

The platform integrates with all major cloud providers and can be deployed in hybrid, private, or public cloud environments — critical for regulated industries like banking and healthcare.`,
    author: "Sponsored Content | Infosys",
    advertiserName: "Infosys Limited",
    advertiserLogo: "",
    category: "SPONSORED · TECHNOLOGY",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?w=800&h=400&fit=crop",
    linkUrl: "https://www.infosys.com/topaz",
    disclosureText: "This article was produced by Infosys in partnership with The Pride Times content studio. It does not reflect the editorial opinions of The Pride Times.",
  },
  {
    id: "sponsor_002",
    name: "Goldman Sachs Asset Management",
    format: "sponsored_article",
    provider: "direct",
    status: "active",
    targeting: "global",
    pages: ["/finance", "/markets", "/billionaires"],
    priority: 1,
    impressions: 21450,
    clicks: 1287,
    revenue: 18500.00,
    ctr: 6.0,
    createdAt: "2026-04-20",
    expiresAt: "2026-07-31",
    budget: 40000,
    spent: 18500,
    headline: "The Case for Emerging Market Bonds in a Rate-Cutting Environment",
    excerpt:
      "As the Fed pivots toward rate cuts and the dollar weakens, Goldman Sachs Asset Management sees a generational opportunity in EM sovereign and corporate bonds. Our global fixed income team explains the thesis.",
    body: `The macroeconomic setup for emerging market bonds has rarely been more compelling. As the Federal Reserve signals the beginning of a rate-cutting cycle, the dollar is poised to weaken — historically one of the most powerful tailwinds for EM debt.

Goldman Sachs Asset Management's Global Fixed Income team is positioned for what chief strategist Ashish Shah calls "the EM bond renaissance of 2026-2028."

The core thesis rests on four pillars:
1. Dollar weakness amplifies EM returns for USD-based investors
2. Yield differentials remain historically wide at 340-520bps
3. EM fiscal fundamentals have improved dramatically post-pandemic
4. China's reopening continues to lift regional trade flows

"We're seeing the most attractive risk-adjusted entry point in EM bonds since 2016," said Shah. "With investment grade EM sovereign bonds yielding 6-7% and the currency tailwind, total returns of 10-15% over the next 12 months are achievable."

The firm recommends India, Indonesia, Brazil, and Mexico as top picks in the sovereign space, with selected corporate exposure in Indian NBFC and Brazilian commodity exporters.`,
    author: "Sponsored Content | Goldman Sachs Asset Management",
    advertiserName: "Goldman Sachs Asset Management",
    category: "SPONSORED · FINANCE",
    readTime: 6,
    imageUrl: "https://images.unsplash.com/photo-1778406466505-6129d0555557?w=800&h=400&fit=crop",
    linkUrl: "https://www.gsam.com",
    disclosureText: "This is a paid advertisement. Goldman Sachs Asset Management products involve investment risk. Past performance does not guarantee future results.",
  },
];

export function getSponsoredArticle(page: string): SponsoredArticle | null {
  const eligible = SPONSORED_ARTICLES.filter(
    (a) =>
      a.status === "active" &&
      (a.pages.includes(page) || a.pages.includes("*")) &&
      (!a.expiresAt || new Date(a.expiresAt) > new Date())
  ).sort((a, b) => a.priority - b.priority);

  return eligible[0] ?? null;
}
