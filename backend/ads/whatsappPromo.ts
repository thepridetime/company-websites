// ============================================================
// THE PRIDE TIMES — WHATSAPP PROMOTION CONFIGURATION
// ============================================================
// Businesses pay to have a direct WhatsApp contact button
// displayed to Pride Times readers relevant to their industry.
// ============================================================

import type { WhatsAppPromoAd } from "./adsTypes";

export const WHATSAPP_PROMOS: WhatsAppPromoAd[] = [
  {
    id: "wa_001",
    name: "Bajaj Finserv Business Loans",
    format: "whatsapp_promo",
    provider: "direct",
    status: "active",
    targeting: "india",
    pages: ["/finance", "/business-news", "/leadership", "/"],
    priority: 1,
    impressions: 8450,
    clicks: 423,
    revenue: 1800.00,
    ctr: 5.0,
    createdAt: "2026-05-01",
    expiresAt: "2026-07-31",
    budget: 4000,
    spent: 1800,
    businessName: "Bajaj Finserv",
    phoneNumber: "+919999999999",  // Replace with real business WhatsApp number
    message: "Hi! I saw your ad on The Pride Times and I'm interested in learning more about business loans.",
    description: "Get instant business loans up to ₹50 Lakh. 48-hour approval. Minimal documentation.",
    badgeText: "Instant Approval",
  },
  {
    id: "wa_002",
    name: "Edelweiss Wealth Management",
    format: "whatsapp_promo",
    provider: "direct",
    status: "active",
    targeting: "india",
    pages: ["/billionaires", "/markets", "/finance"],
    priority: 2,
    impressions: 4230,
    clicks: 169,
    revenue: 1200.00,
    ctr: 4.0,
    createdAt: "2026-05-10",
    expiresAt: "2026-08-31",
    budget: 3000,
    spent: 1200,
    businessName: "Edelweiss Wealth",
    phoneNumber: "+919888888888",  // Replace with real business WhatsApp number
    message: "Hello! I'm a Pride Times reader interested in your premium wealth management services.",
    description: "Private wealth management for HNI & UHNI clients. ₹2Cr+ minimum investment.",
    badgeText: "Private Banking",
  },
  {
    id: "wa_003",
    name: "IIT Delhi Executive MBA",
    format: "whatsapp_promo",
    provider: "direct",
    status: "active",
    targeting: "india",
    pages: ["/leadership", "/innovation", "/business-news"],
    priority: 3,
    impressions: 6780,
    clicks: 407,
    revenue: 950.00,
    ctr: 6.0,
    createdAt: "2026-04-20",
    expiresAt: "2026-06-30",
    budget: 2000,
    spent: 950,
    businessName: "IIT Delhi EMB",
    phoneNumber: "+919777777777",  // Replace with real WhatsApp number
    message: "Hi! I'm interested in the IIT Delhi Executive MBA program. I read about it on The Pride Times.",
    description: "Executive MBA for working professionals. Weekend classes. IIT Delhi certification.",
    badgeText: "2026 Admissions Open",
  },
];

/**
 * Builds a WhatsApp deep link URL.
 * @param phone - International format without '+' (e.g. "919999999999")
 * @param message - Pre-filled message text
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function getWhatsAppPromoForPage(page: string): WhatsAppPromoAd | null {
  const eligible = WHATSAPP_PROMOS.filter(
    (w) =>
      w.status === "active" &&
      (w.pages.includes(page) || w.pages.includes("*")) &&
      (!w.expiresAt || new Date(w.expiresAt) > new Date())
  ).sort((a, b) => a.priority - b.priority);

  return eligible[0] ?? null;
}
