/* =========================================================
   GLOBAL SECTOR NEWS REPORT 2026 — HOMEPAGE LEAD DATA
   THE PRIDE TIMES
   Source: Global_Sector_News_Report_2026.docx
   Used by the homepage main headline and the Global Sector
   Report block. Figures are quoted from the report.
========================================================= */

import img_dataCentre from "../../imports/data-centre.png";

export const globalSectorAnchorId = "global-sector-report";

export const globalSectorReport = {
  kicker: "Global Sector News Report 2026",
  image: img_dataCentre,
  location: "Global",
  headline:
    "Seven Industries at the Edge of the Next Operating Cycle: AI, Finance, Healthcare, Energy, Automotive, Agriculture and Entertainment",
  subheadline:
    "Seven sectors, one operating pattern: digitize the control layer, then industrialize the workflow.",
  pattern:
    "The technology is increasingly available; the scarce asset is the operating system around it: trusted data, repeatable process, compliance, distribution and unit economics.",
  stats: [
    { value: "22%", label: "of organizations have scaled AI across business units (Gartner)" },
    { value: "$234B", label: "of enterprise software spend exposed to agentic AI by 2030" },
    { value: "20M+", label: "lifetime Waymo rides, 270M+ autonomous miles" },
    { value: "68", label: "projects from 26 countries at Venice Immersive" },
  ],
};

export type GlobalSectorItem = {
  sector: string;
  headline: string;
  signal: string;
  bottleneck: string;
  verdict: string;
};

export const globalSectorItems: GlobalSectorItem[] = [
  {
    sector: "Technology",
    headline:
      "AI integration stops being a feature and starts becoming the enterprise operating layer",
    signal: "AI moves from software feature to execution layer",
    bottleneck: "Data, governance, integration and ROI",
    verdict: "Saturation is operational, not numerical",
  },
  {
    sector: "Finance",
    headline:
      "Digital-currency rules harden as markets regain selective confidence",
    signal: "Digital money moves into detailed regulation",
    bottleneck: "Cross-border rule divergence and macro rates",
    verdict: "Stabilization is real, but uneven",
  },
  {
    sector: "Healthcare",
    headline:
      "mRNA 2.0: from vaccine platform to therapeutic manufacturing system",
    signal: "mRNA gains therapeutic credibility",
    bottleneck: "Personalized manufacturing and delivery",
    verdict: "The breakthrough is credibility, not completion",
  },
  {
    sector: "Energy",
    headline:
      "Solid-state batteries reach the pilot line, not yet the mass market",
    signal: "Solid-state reaches production engineering",
    bottleneck: "Yield, cost and qualification",
    verdict: "Production engineering is the story",
  },
  {
    sector: "Automotive",
    headline:
      "Robotaxis move from pilot programs toward networked urban fleets",
    signal: "Robotaxis scale in urban hubs",
    bottleneck: "Permits, utilization and local operations",
    verdict: "Autonomy is becoming transportation infrastructure",
  },
  {
    sector: "Agriculture",
    headline:
      "Vertical farming wins on land intensity, and still faces an energy equation",
    signal: "Vertical farming proves land productivity",
    bottleneck: "Energy and capital intensity",
    verdict: "Yield is the easy headline; cost is the test",
  },
  {
    sector: "Entertainment",
    headline:
      "Volumetric cinema moves from experiment toward a new grammar of filmmaking",
    signal: "Immersive media becomes institutional",
    bottleneck: "Hardware and venue economics",
    verdict: "Mainstream adoption is beginning, but the format is still niche",
  },
];
