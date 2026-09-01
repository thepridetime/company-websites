// ============================================================
// THE PRIDE TIMES — ADS SYSTEM TYPE DEFINITIONS
// ============================================================

export type AdFormat =
  | "banner_top"
  | "banner_bottom"
  | "sidebar_left"
  | "sidebar_right"
  | "in_article"
  | "sponsored_article"
  | "video"
  | "whatsapp_promo"
  | "featured_listing"
  | "popup"
  | "interstitial";

export type AdStatus = "active" | "paused" | "expired" | "pending_review";
export type AdProvider = "google_adsense" | "direct" | "programmatic" | "house";
export type AdTargeting = "global" | "india" | "usa" | "europe" | "asia" | "custom";

export interface AdUnit {
  id: string;
  name: string;
  format: AdFormat;
  provider: AdProvider;
  status: AdStatus;
  targeting: AdTargeting;
  pages: string[];           // e.g. ["home", "technology", "finance", "*"]
  priority: number;          // 1 (highest) to 10 (lowest)
  impressions: number;
  clicks: number;
  revenue: number;           // USD
  ctr: number;               // Click-through rate %
  createdAt: string;
  expiresAt?: string;
  budget?: number;
  spent?: number;
}

export interface BannerAd extends AdUnit {
  format: "banner_top" | "banner_bottom";
  imageUrl: string;
  linkUrl: string;
  altText: string;
  width: number;
  height: number;
  animationType?: "static" | "slide" | "fade";
}

export interface SidebarAd extends AdUnit {
  format: "sidebar_left" | "sidebar_right";
  imageUrl: string;
  linkUrl: string;
  altText: string;
  size: "300x250" | "160x600" | "300x600" | "120x600";
}

export interface SponsoredArticle extends AdUnit {
  format: "sponsored_article";
  headline: string;
  excerpt: string;
  body: string;
  author: string;
  advertiserName: string;
  advertiserLogo?: string;
  category: string;
  readTime: number;          // minutes
  imageUrl: string;
  linkUrl: string;
  disclosureText: string;
}

export interface VideoAd extends AdUnit {
  format: "video";
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  duration: number;          // seconds
  skipAfter?: number;        // seconds before skip button appears
  advertiserName: string;
  callToAction: string;
  linkUrl: string;
}

export interface WhatsAppPromoAd extends AdUnit {
  format: "whatsapp_promo";
  businessName: string;
  phoneNumber: string;
  message: string;           // pre-filled WhatsApp message
  description: string;
  logoUrl?: string;
  badgeText?: string;
}

export interface FeaturedListingAd extends AdUnit {
  format: "featured_listing";
  businessName: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  website: string;
  category: string;
  location: string;
  contactEmail: string;
  phoneNumber?: string;
  rating?: number;
  reviewCount?: number;
  badge: "featured" | "sponsored" | "partner" | "premium";
}

export interface GoogleAdSenseConfig {
  publisherId: string;         // ca-pub-XXXXXXXXXXXXXXXXX
  autoAds: boolean;
  adUnits: GoogleAdUnit[];
}

export interface GoogleAdUnit {
  slotId: string;
  name: string;
  format: "auto" | "rectangle" | "vertical" | "horizontal" | "fluid";
  responsive: boolean;
  position: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  advertiser: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: AdStatus;
  adUnits: string[];         // Ad unit IDs
  targetPages: string[];
  targeting: AdTargeting;
  impressionsGoal: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface AdRevenueReport {
  period: "daily" | "weekly" | "monthly" | "yearly";
  date: string;
  totalRevenue: number;
  adsenseRevenue: number;
  directRevenue: number;
  impressions: number;
  clicks: number;
  pageRPM: number;           // Revenue per 1000 page views
  fillRate: number;          // %
}
