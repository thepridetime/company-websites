// ============================================================
// THE PRIDE TIMES — PROMOTION BANNERS
// ============================================================

import type { BannerAd } from "./adsTypes";

export const PROMOTION_BANNERS: BannerAd[] = [
  {
    id: "banner_001",
    name: "Reliance Industries Q1 Earnings",
    format: "banner_top",
    provider: "direct",
    status: "active",
    targeting: "global",
    pages: ["*"],
    priority: 1,
    impressions: 128450,
    clicks: 3213,
    revenue: 2850.00,
    ctr: 2.50,
    createdAt: "2026-05-01",
    expiresAt: "2026-06-30",
    budget: 5000,
    spent: 2850,
    imageUrl: "https://images.unsplash.com/photo-1761233138997-44d9b002a08f?w=1200&h=90&fit=crop",
    linkUrl: "https://www.ril.com",
    altText: "Reliance Industries — Q1 FY2027 Earnings Season",
    width: 1200,
    height: 90,
    animationType: "static",
  },
  {
    id: "banner_002",
    name: "Tata Group Technology Week",
    format: "banner_top",
    provider: "direct",
    status: "active",
    targeting: "india",
    pages: ["/technology", "/finance", "/business-news"],
    priority: 2,
    impressions: 54320,
    clicks: 1087,
    revenue: 1200.00,
    ctr: 2.00,
    createdAt: "2026-05-10",
    expiresAt: "2026-05-31",
    budget: 2000,
    spent: 1200,
    imageUrl: "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?w=1200&h=90&fit=crop",
    linkUrl: "https://www.tata.com",
    altText: "Tata Group — Future of Technology Innovation Week 2026",
    width: 1200,
    height: 90,
    animationType: "fade",
  },
  {
    id: "banner_003",
    name: "HDFC Bank Digital Banking",
    format: "banner_bottom",
    provider: "direct",
    status: "active",
    targeting: "india",
    pages: ["/finance", "/markets", "/business-news"],
    priority: 2,
    impressions: 87650,
    clicks: 2629,
    revenue: 3200.00,
    ctr: 3.00,
    createdAt: "2026-04-15",
    expiresAt: "2026-07-15",
    budget: 6000,
    spent: 3200,
    imageUrl: "https://images.unsplash.com/photo-1778406466505-6129d0555557?w=1200&h=90&fit=crop",
    linkUrl: "https://www.hdfcbank.com",
    altText: "HDFC Bank — Smart Banking for Smart Businesses",
    width: 1200,
    height: 90,
    animationType: "slide",
  },
];

export function getBannerForPage(page: string): BannerAd | null {
  const eligible = PROMOTION_BANNERS.filter(
    (b) =>
      b.status === "active" &&
      (b.pages.includes(page) || b.pages.includes("*")) &&
      (!b.expiresAt || new Date(b.expiresAt) > new Date())
  ).sort((a, b) => a.priority - b.priority);

  return eligible[0] ?? null;
}
