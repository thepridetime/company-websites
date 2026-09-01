// ============================================================
// THE PRIDE TIMES — ADS CONFIGURATION
// Replace placeholder values with real credentials before deploying
// ============================================================

import type { GoogleAdSenseConfig } from "./adsTypes";

// ── Google AdSense Configuration ──────────────────────────────
// Register at: https://www.google.com/adsense/
// Replace YOUR_PUBLISHER_ID with your actual ca-pub-XXXXXXXXXXXXXXXXX
export const GOOGLE_ADSENSE_CONFIG: GoogleAdSenseConfig = {
  publisherId: "ca-pub-YOUR_PUBLISHER_ID_HERE",
  autoAds: false,           // Set to true to enable Auto Ads
  adUnits: [
    {
      slotId: "1234567890",
      name: "Homepage Top Banner",
      format: "horizontal",
      responsive: true,
      position: "header",
    },
    {
      slotId: "0987654321",
      name: "Article Sidebar Right",
      format: "rectangle",
      responsive: true,
      position: "sidebar_right",
    },
    {
      slotId: "1122334455",
      name: "Left Sidebar Vertical",
      format: "vertical",
      responsive: true,
      position: "sidebar_left",
    },
    {
      slotId: "5544332211",
      name: "In-Article Mid",
      format: "fluid",
      responsive: true,
      position: "in_article",
    },
    {
      slotId: "9988776655",
      name: "Footer Banner",
      format: "horizontal",
      responsive: true,
      position: "footer",
    },
  ],
};

// ── Ad Display Settings ────────────────────────────────────────
export const AD_SETTINGS = {
  // Minimum time (ms) between ads shown to same user
  adFrequencyCap: 30000,

  // Show ads to premium subscribers?
  showAdsToPremoium: false,

  // Max ads per page
  maxAdsPerPage: {
    banner: 2,
    sidebar: 2,
    inArticle: 3,
    sponsored: 1,
  },

  // Lazy load ads below the fold
  lazyLoadAds: true,

  // GDPR consent required before loading ads
  requireConsentEU: true,
};

// ── Page-Level Ad Placement Configuration ─────────────────────
export const PAGE_AD_SLOTS: Record<string, string[]> = {
  "/":              ["banner_top", "sidebar_left", "sidebar_right", "in_article", "sponsored"],
  "/technology":    ["banner_top", "sidebar_left", "sidebar_right", "in_article"],
  "/finance":       ["banner_top", "sidebar_left", "sidebar_right", "in_article", "sponsored"],
  "/cybersecurity": ["banner_top", "sidebar_right", "in_article"],
  "/energy":        ["banner_top", "sidebar_left", "sidebar_right"],
  "/healthcare":    ["banner_top", "sidebar_left", "sidebar_right", "sponsored"],
  "/manufacturing": ["banner_top", "sidebar_right"],
  "/smart-cities":  ["banner_top", "sidebar_right"],
  "/supply-chain":  ["banner_top", "sidebar_right"],
  "/markets":       ["sidebar_left", "sidebar_right", "in_article"],
  "/billionaires":  ["banner_top", "sidebar_left", "sidebar_right", "sponsored"],
  "/business-news": ["banner_top", "sidebar_left", "sidebar_right", "in_article", "sponsored"],
  "/leadership":    ["banner_top", "sidebar_right", "sponsored"],
  "/magazine":      ["banner_top", "sidebar_right"],
  "*":              ["sidebar_right"],
};

// ── Programmatic Partners ──────────────────────────────────────
export const PROGRAMMATIC_PARTNERS = {
  openRTB: {
    endpoint: "https://your-ssp-endpoint.com/bid",  // Replace with real SSP
    timeout: 500,   // ms
    floorPrice: 0.50, // USD CPM
  },
  headerBidding: {
    enabled: true,
    partners: [
      { name: "AppNexus",  code: "appnexus",   params: { placementId: "YOUR_APPNEXUS_ID" } },
      { name: "Rubicon",   code: "rubicon",    params: { accountId: "YOUR_RUBICON_ACCOUNT" } },
      { name: "OpenX",     code: "openx",      params: { delDomain: "YOUR_OPENX_DOMAIN" } },
      { name: "Amazon",    code: "a9",         params: { pubID: "YOUR_AMAZON_PUB_ID" } },
    ],
  },
};

// ── Revenue Targets (Monthly) ──────────────────────────────────
export const REVENUE_TARGETS = {
  adsense:     5000,    // USD/month
  direct:      8000,    // USD/month
  sponsored:   15000,   // USD/month
  featured:    3000,    // USD/month
  video:       2500,    // USD/month
  total:       33500,   // USD/month
};
