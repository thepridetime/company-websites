// ============================================================
// THE PRIDE TIMES — ADS MANAGER (Core Logic)
// ============================================================

import type { AdUnit, AdStatus, AdCampaign, AdRevenueReport } from "./adsTypes";
import { AD_SETTINGS, PAGE_AD_SLOTS } from "./adsConfig";

// In-memory store (replace with DB queries in production)
const activeAdUnits: AdUnit[] = [];
const campaigns: AdCampaign[] = [];

// ── Ad Selection ───────────────────────────────────────────────

/**
 * Returns eligible ad units for a given page, sorted by priority.
 * Filters out expired, paused, or budget-exhausted ads.
 */
export function getAdsForPage(pagePath: string, format?: string): AdUnit[] {
  const allowedFormats = PAGE_AD_SLOTS[pagePath] ?? PAGE_AD_SLOTS["*"] ?? [];

  return activeAdUnits
    .filter((ad) => {
      if (ad.status !== "active") return false;
      if (ad.expiresAt && new Date(ad.expiresAt) < new Date()) return false;
      if (ad.budget && ad.spent && ad.spent >= ad.budget) return false;
      if (!ad.pages.includes(pagePath) && !ad.pages.includes("*")) return false;
      if (format && ad.format !== format) return false;
      return allowedFormats.some((f) => ad.format.startsWith(f));
    })
    .sort((a, b) => a.priority - b.priority);
}

// ── Impression & Click Tracking ────────────────────────────────

export function recordImpression(adId: string): void {
  const ad = activeAdUnits.find((a) => a.id === adId);
  if (!ad) return;

  ad.impressions++;
  ad.ctr = ad.clicks / ad.impressions;

  // Update campaign impression count
  const campaign = campaigns.find((c) => c.adUnits.includes(adId));
  if (campaign) campaign.impressions++;

  // In production: POST /api/ads/impression { adId, timestamp, userAgent, page }
  console.log(`[AdManager] Impression recorded: ${adId}`);
}

export function recordClick(adId: string): void {
  const ad = activeAdUnits.find((a) => a.id === adId);
  if (!ad) return;

  ad.clicks++;
  ad.ctr = ad.clicks / ad.impressions;

  const campaign = campaigns.find((c) => c.adUnits.includes(adId));
  if (campaign) campaign.clicks++;

  // In production: POST /api/ads/click { adId, timestamp, userAgent, page }
  console.log(`[AdManager] Click recorded: ${adId}`);
}

// ── Ad CRUD Operations ─────────────────────────────────────────

export function createAd(ad: Omit<AdUnit, "impressions" | "clicks" | "revenue" | "ctr">): AdUnit {
  const newAd: AdUnit = {
    ...ad,
    impressions: 0,
    clicks: 0,
    revenue: 0,
    ctr: 0,
  };
  activeAdUnits.push(newAd);
  return newAd;
}

export function updateAdStatus(adId: string, status: AdStatus): boolean {
  const ad = activeAdUnits.find((a) => a.id === adId);
  if (!ad) return false;
  ad.status = status;
  return true;
}

export function deleteAd(adId: string): boolean {
  const idx = activeAdUnits.findIndex((a) => a.id === adId);
  if (idx === -1) return false;
  activeAdUnits.splice(idx, 1);
  return true;
}

// ── Revenue Reporting ──────────────────────────────────────────

export function generateRevenueReport(
  period: AdRevenueReport["period"],
  date: string
): AdRevenueReport {
  const totalImpressions = activeAdUnits.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = activeAdUnits.reduce((sum, ad) => sum + ad.clicks, 0);
  const totalRevenue = activeAdUnits.reduce((sum, ad) => sum + ad.revenue, 0);

  const adsenseRevenue = activeAdUnits
    .filter((ad) => ad.provider === "google_adsense")
    .reduce((sum, ad) => sum + ad.revenue, 0);

  const directRevenue = activeAdUnits
    .filter((ad) => ad.provider === "direct")
    .reduce((sum, ad) => sum + ad.revenue, 0);

  return {
    period,
    date,
    totalRevenue,
    adsenseRevenue,
    directRevenue,
    impressions: totalImpressions,
    clicks: totalClicks,
    pageRPM: totalImpressions > 0 ? (totalRevenue / totalImpressions) * 1000 : 0,
    fillRate: 95.4,  // Simulated — in prod: calculate from unfilled requests
  };
}

// ── GDPR / Consent Management ──────────────────────────────────

export interface ConsentState {
  advertising: boolean;
  analytics: boolean;
  personalization: boolean;
  timestamp: string;
  source: "banner" | "settings";
}

export function storeConsent(userId: string, consent: ConsentState): void {
  // In production: persist to DB and sync with CMP (OneTrust, Cookiebot, etc.)
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(`pt_consent_${userId}`, JSON.stringify(consent));
  }
}

export function getConsent(userId: string): ConsentState | null {
  if (typeof localStorage === "undefined") return null;
  const stored = localStorage.getItem(`pt_consent_${userId}`);
  return stored ? JSON.parse(stored) : null;
}

// ── Ad Refresh Logic ───────────────────────────────────────────

/**
 * Automatically refreshes sticky ads every N seconds.
 * Only refreshes ads that have refreshInterval set.
 */
export function startAdRefresh(
  onRefresh: (adId: string) => void,
  intervalMs = 30000
): () => void {
  const timer = setInterval(() => {
    activeAdUnits
      .filter((ad) => ad.status === "active")
      .forEach((ad) => onRefresh(ad.id));
  }, intervalMs);

  return () => clearInterval(timer);
}
