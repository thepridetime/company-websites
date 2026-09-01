// ============================================================
// THE PRIDE TIMES — VIDEO ADVERTISEMENT CONFIGURATION
// ============================================================

import type { VideoAd } from "./adsTypes";

export const VIDEO_ADS: VideoAd[] = [
  {
    id: "video_001",
    name: "Mahindra Electric Vehicles Launch",
    format: "video",
    provider: "direct",
    status: "active",
    targeting: "india",
    pages: ["/", "/technology", "/energy"],
    priority: 1,
    impressions: 18430,
    clicks: 1475,
    revenue: 8200.00,
    ctr: 8.0,
    createdAt: "2026-05-01",
    expiresAt: "2026-06-30",
    budget: 15000,
    spent: 8200,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",  // Replace with actual ad video
    thumbnailUrl: "https://images.unsplash.com/photo-1760012945940-74d6bf54c0fb?w=640&h=360&fit=crop",
    title: "Mahindra BE 6 — The Future of Electric Mobility in India",
    duration: 30,
    skipAfter: 5,
    advertiserName: "Mahindra Group",
    callToAction: "Book a Test Drive",
    linkUrl: "https://www.mahindra.com/electric",
  },
  {
    id: "video_002",
    name: "Microsoft Azure Cloud Summit 2026",
    format: "video",
    provider: "direct",
    status: "active",
    targeting: "global",
    pages: ["/technology", "/innovation", "/cybersecurity"],
    priority: 2,
    impressions: 12300,
    clicks: 984,
    revenue: 6150.00,
    ctr: 8.0,
    createdAt: "2026-05-05",
    expiresAt: "2026-06-30",
    budget: 12000,
    spent: 6150,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",  // Replace with actual ad video
    thumbnailUrl: "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?w=640&h=360&fit=crop",
    title: "Microsoft Azure — Power Your AI Transformation",
    duration: 20,
    skipAfter: 5,
    advertiserName: "Microsoft Corporation",
    callToAction: "Start Free Trial",
    linkUrl: "https://azure.microsoft.com",
  },
];

export function getVideoAdForPage(page: string): VideoAd | null {
  const eligible = VIDEO_ADS.filter(
    (v) =>
      v.status === "active" &&
      (v.pages.includes(page) || v.pages.includes("*")) &&
      (!v.expiresAt || new Date(v.expiresAt) > new Date())
  ).sort((a, b) => a.priority - b.priority);

  return eligible[0] ?? null;
}
