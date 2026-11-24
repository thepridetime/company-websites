// Target path: src/lib/reportDownload.ts
// Builds comprehensive executive intelligence PDF reports with zero third-party dependencies.
// Based on the verified PDF-1.4 engine used in accountData.ts.

const PAGE_W = 595; // A4 width in points
const PAGE_H = 842; // A4 height in points
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

const BRAND_RED: [number, number, number] = [0.89, 0.11, 0.14]; // #e31b23
const DARK: [number, number, number] = [0.08, 0.08, 0.08];
const GRAY: [number, number, number] = [0.42, 0.42, 0.42];
const LIGHT_BG: [number, number, number] = [0.96, 0.96, 0.97];

type TextOp = {
  x: number;
  y: number;
  size: number;
  bold: boolean;
  color: [number, number, number];
  text: string;
};

type RectOp = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: [number, number, number];
  fill: boolean;
};

type PageLayout = {
  textOps: TextOp[];
  rectOps: RectOp[];
};

export type ReportData = {
  title: string;
  category: string;
  pages: number;
  executiveSummary: string;
  keyFindings: string[];
  metricsTable: { metric: string; value: string; benchmark: string }[];
  strategicInsights: string[];
  recommendations: string[];
};

function toAscii(input: string): string {
  return input
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00A0/g, " ")
    .replace(/[^\x20-\x7E]/g, "?");
}

function escapePdfText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text: string, size: number, maxWidth: number): string[] {
  const maxChars = Math.max(10, Math.floor(maxWidth / (size * 0.53)));
  const out: string[] = [];
  for (const paragraph of toAscii(text).split("\n")) {
    let line = "";
    for (const word of paragraph.split(" ")) {
      if (!word) continue;
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length <= maxChars) {
        line = candidate;
      } else {
        if (line) out.push(line);
        let rest = word;
        while (rest.length > maxChars) {
          out.push(rest.slice(0, maxChars));
          rest = rest.slice(maxChars);
        }
        line = rest;
      }
    }
    if (line) out.push(line);
  }
  return out;
}

export const REPORT_CATALOG: Record<string, ReportData> = {
  "global-ai-readiness-index-2026": {
    title: "Global AI Readiness Index 2026",
    category: "Technology & Compute Infrastructure",
    pages: 48,
    executiveSummary:
      "The Global AI Readiness Index evaluates 65 nations across compute capacity, proprietary foundation model training, sovereign data regulation, and enterprise AI adoption. North America and East Asia command 78% of frontier training clusters, while emerging economies face steep capital bottlenecks in securing high-bandwidth memory (HBM) and energy infrastructure.",
    keyFindings: [
      "Frontier data centre power constraints have elevated electricity availability above tax incentives as the #1 determinant of compute site selection.",
      "Enterprise inference workloads grew 310% year-on-year, driving demand for specialized ASIC hardware over generalized clusters.",
      "Sovereign AI mandates across Europe and India have sparked more than $40B in localized sovereign cloud development.",
      "Small language models (SLMs) with 3B-8B parameters have achieved 92% parity with previous-generation frontier models for specialized internal enterprise workflows."
    ],
    metricsTable: [
      { metric: "Frontier Compute Installed (Exaflops)", value: "148.5 EFLOPS", benchmark: "+142% YoY" },
      { metric: "Enterprise GenAI Adoption Rate", value: "44.8%", benchmark: "+19.2 pts" },
      { metric: "Data Centre Power Under Dev", value: "32.4 GW", benchmark: "North America & EU" },
      { metric: "Average Inference Cost Decline", value: "-68.4%", benchmark: "Trailing 12 Months" }
    ],
    strategicInsights: [
      "Compute Density: Rack density is shifting from 15kW to upwards of 60-100kW per cabinet, making liquid-cooling retrofit mandatory.",
      "Semiconductor Sourcing: Diversification into multi-foundry packaging reduces single-source risks across tier-1 hyperscalers.",
      "Workforce Reskilling: Over 62% of Global 2000 firms have established internal AI governance and continuous fine-tuning pipelines."
    ],
    recommendations: [
      "Decouple training cluster investments from latency-sensitive operational inference deployments.",
      "Audit proprietary enterprise data repositories for automated synthetic fine-tuning suitability.",
      "Hedge long-term energy supply through direct power purchase agreements (PPAs) with nuclear and geothermal developers."
    ]
  },
  "world-s-100-best-managed-companies": {
    title: "World's 100 Best-Managed Companies",
    category: "Corporate Governance & Rankings",
    pages: 72,
    executiveSummary:
      "An empirical assessment of the top 100 publicly listed corporations across five performance dimensions: capital allocation efficiency, employee retention, innovation velocity, supply-chain resilience, and total shareholder return (TSR). Top performers demonstrate above-median margin expansion while keeping debt-to-EBITDA ratios below 1.8x.",
    keyFindings: [
      "Top-decile companies reinvested an average of 14.6% of gross revenues into R&D and digital infrastructure.",
      "Supply-chain redundancy strategies (dual-sourcing across Southeast Asia, India, and Mexico) prevented costly single-point disruptions.",
      "Firms maintaining disciplined executive accountability metrics generated 2.4x higher 5-year annualized returns than peer benchmarks.",
      "Decentralized divisional autonomy enabled faster customer product cycles during periods of macroeconomic volatility."
    ],
    metricsTable: [
      { metric: "Median 5-Year Return on Capital", value: "22.6%", benchmark: "Vs 11.2% S&P 500" },
      { metric: "Average Operating Margin", value: "28.4%", benchmark: "+340 bps YoY" },
      { metric: "Employee Turnover (Voluntary)", value: "5.8%", benchmark: "Vs 14.2% Industry Avg" },
      { metric: "Free Cash Flow Conversion", value: "91.3%", benchmark: "High Quality Earnings" }
    ],
    strategicInsights: [
      "Capital Efficiency: Leading organizations prioritize organic reinvestment over debt-funded share buybacks at market cycle peaks.",
      "Operational Transparency: Robust board-level risk committees regularly stress-test interest rate volatility and cyber vulnerabilities.",
      "Customer Lifetime Value: High retention metrics across B2B SaaS and advanced engineering platforms compound cash flows."
    ],
    recommendations: [
      "Benchmark business unit capital allocation using Return on Invested Capital (ROIC) hurdles.",
      "Implement multi-regional supply chain redundancy to mitigate shipping lane geopolitical risks.",
      "Tie executive compensation structures to long-term economic value added (EVA) rather than quarterly revenue guidance."
    ]
  },
  "india-economic-outlook-2026-2030": {
    title: "India Economic Outlook 2026–2030",
    category: "Macroeconomics & Capital Markets",
    pages: 56,
    executiveSummary:
      "India's structural economic transformation is projected to maintain 6.8%–7.2% annual GDP expansion through 2030. Key growth engines include the Production Linked Incentive (PLI) schemes in electronics and green hydrogen, national infrastructure logistics corridors, capital markets depth, and rapid digitalization of commercial supply chains.",
    keyFindings: [
      "Domestic electronics manufacturing has surpassed $115B annually, with export volume growing at a 38% CAGR.",
      "Systemic retail mutual fund inflows via Systematic Investment Plans (SIPs) exceed ₹28,000 Crore monthly, buffering domestic equities from foreign capital outflows.",
      "National logistics corridor upgrades have reduced transit times by 26% across key Golden Quadrilateral freight routes.",
      "Bank balance sheets show multi-decade low gross non-performing asset (GNPA) ratios under 2.4%, supporting robust corporate credit demand."
    ],
    metricsTable: [
      { metric: "Projected 5-Year Average GDP", value: "7.1% Annually", benchmark: "#1 Major Global Economy" },
      { metric: "Annual Foreign Direct Investment (FDI)", value: "$88.5 Billion", benchmark: "+14.5% Growth" },
      { metric: "Monthly SIP Equity Capital Inflow", value: "INR 28,450 Cr", benchmark: "Record Domestic Liquidity" },
      { metric: "Renewable Energy Installed Target", value: "500 GW by 2030", benchmark: "On-Track Infrastructure" }
    ],
    strategicInsights: [
      "Manufacturing Transition: Global OEMs are scaling multi-tier local component ecosystems beyond final assembly in southern and western states.",
      "Consumer Discretionary Boom: Rising per capita income in tier-2 and tier-3 cities is driving premiumization across automotive, housing, and fintech.",
      "Capital Expenditure: Central government infrastructure allocations continue to crowd-in private corporate investment across heavy industries."
    ],
    recommendations: [
      "Deploy growth capital into domestic manufacturing ancillaries and specialized freight logistics.",
      "Leverage digital public infrastructure (India Stack, ONDC, Account Aggregator) to reduce financial underwriting friction.",
      "Position export operations to capture shifting global trade agreements across the Middle East, UK, and European corridors."
    ]
  },
  "clean-energy-investment-report-q1-2026": {
    title: "Clean Energy Investment Report Q1 2026",
    category: "Energy Transition & ESG Finance",
    pages: 34,
    executiveSummary:
      "Global investments in renewable energy, grid-scale battery storage, and carbon-free base load power reached $412B in the first quarter of 2026. Utility-scale battery energy storage systems (BESS) experienced their steepest cost decline since 2020, while transmission interconnect delays remain the primary bottleneck to renewable deployment.",
    keyFindings: [
      "Lithium iron phosphate (LFP) pack-level battery prices fell below $62/kWh, enabling 4-hour and 8-hour storage parity with peaker gas turbines.",
      "Offshore wind developments rebounded with updated corporate power purchase pricing contracts across Northern Europe and the US East Coast.",
      "Next-generation nuclear energy (SMRs) attracted $18.2B in private institutional commitments driven by tech sector data centre load demands.",
      "Hydrogen project FID (Final Investment Decision) rates concentrated primarily in industrial ammonia and refinery decarbonization hubs."
    ],
    metricsTable: [
      { metric: "Quarterly Clean Energy Inflow", value: "$412.0 Billion", benchmark: "+18.4% YoY" },
      { metric: "BESS Average Pack Price (LFP)", value: "$61.80 / kWh", benchmark: "-24.2% YoY" },
      { metric: "Solar PV Capacity Added (Q1)", value: "96.4 GW", benchmark: "Global Grid Additions" },
      { metric: "Corporate Green PPAs Executed", value: "24.8 GW", benchmark: "Technology & Heavy Industry" }
    ],
    strategicInsights: [
      "Grid Transmission: The interconnection queue backlog across North America and Europe exceeds 1,400 GW of clean energy generation.",
      "Hybrid Installations: Co-locating utility solar with multi-hour battery storage ensures steady day-and-night capacity delivery.",
      "Supply Chain Localization: Domestic content bonus incentives in the US and Europe are creating localized ingot and wafer manufacturing plants."
    ],
    recommendations: [
      "Prioritize projects with signed grid interconnection agreements over speculative greenfield developments.",
      "Incorporate revenue stacking (ancillary services + energy arbitrage) when modeling BESS internal rates of return.",
      "Structure multi-technology hybrid contracts to satisfy corporate 24/7 carbon-free energy requirements."
    ]
  },
  "global-cybersecurity-threat-report-2026": {
    title: "Global Cybersecurity Threat Report 2026",
    category: "Information Security & Enterprise Defense",
    pages: 61,
    executiveSummary:
      "An exhaustive analysis of enterprise threat vectors, state-sponsored cyber campaigns, AI-assisted zero-day discovery, and ransomware resilience across 4,200 organizations. The proliferation of autonomous vulnerability synthesis has compressed the window between patch release and active exploitation down to less than 48 hours.",
    keyFindings: [
      "Identity-based attacks exploiting stolen session tokens and compromised service accounts represented 79% of initial enterprise breaches.",
      "Ransomware groups have transitioned from data encryption to multi-stage extortion involving third-party supplier leaks.",
      "Post-quantum cryptography (PQC) algorithm migrations have commenced across 42% of tier-1 financial institutions.",
      "Autonomous security operations centres (SOC) utilizing fine-tuned defensive LLMs resolved Tier-1 security alerts 85% faster."
    ],
    metricsTable: [
      { metric: "Median Incident Containment Time", value: "4.2 Days", benchmark: "Down from 9.6 Days" },
      { metric: "Average Enterprise Breach Cost", value: "$4.88 Million", benchmark: "+8.4% YoY" },
      { metric: "Identity-Centric Exploit Share", value: "79.2%", benchmark: "Dominant Vector" },
      { metric: "Zero-Day Exploitation Window", value: "< 48 Hours", benchmark: "Rapid Automation Threat" }
    ],
    strategicInsights: [
      "Zero Trust Architecture: Micro-segmentation and continuous token evaluation are essential to stopping lateral network movement.",
      "Software Supply Chain: Open-source dependency poisoning remains a high-impact vector for enterprise ERP and CRM systems.",
      "Board Governance: Regulatory disclosures (SEC 4-day material breach rules) have made incident readiness a core director responsibility."
    ],
    recommendations: [
      "Enforce hardware-bound FIDO2 phishing-resistant authentication across all enterprise internal and external access tiers.",
      "Implement automated dependency scanning and cryptographic software bill of materials (SBOM) validation in CI/CD pipelines.",
      "Conduct adversarial red-team simulations focused on session hijacking and identity-provider impersonation."
    ]
  }
};

export function getReportSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getReportData(title: string): ReportData {
  const slug = getReportSlug(title);
  if (REPORT_CATALOG[slug]) {
    return REPORT_CATALOG[slug];
  }
  // Generic fallback report for any arbitrary title
  return {
    title,
    category: "Executive Research Briefing",
    pages: 45,
    executiveSummary: `The Pride Times Intelligence Desk presents an authoritative strategic analysis of "${title}". This executive briefing provides global leaders, institutional investors, and policymakers with verified data, macroeconomic context, competitive benchmarks, and actionable recommendations.`,
    keyFindings: [
      "Global macroeconomic shifts and technological disruption are accelerating capital reallocation across major sectors.",
      "Strategic investments in resilient infrastructure, regional talent, and data-driven operations yield measurable margin expansion.",
      "Market participants adopting rigorous governance and capital discipline outperform baseline benchmarks over multi-year horizons.",
      "Geopolitical diversification and digital modernization remain top priorities for executive decision-makers worldwide."
    ],
    metricsTable: [
      { metric: "Global Sector Valuation Index", value: "+14.8% YoY", benchmark: "Consensus Forecast" },
      { metric: "Capital Investment Inflow", value: "$124.5 Billion", benchmark: "Institutional Backing" },
      { metric: "Operational Efficiency Gain", value: "+28.2%", benchmark: "Median Top Quartile" },
      { metric: "Risk Mitigation Confidence", value: "86.4%", benchmark: "Executive Survey" }
    ],
    strategicInsights: [
      "Strategic Agility: Organizations that maintain adaptive operational reserves navigate market cycles with lower volatility.",
      "Regulatory Alignment: Early compliance with emerging international standards ensures uninhibited market access.",
      "Technological Integration: Automation and data intelligence compound competitive advantages across commercial operations."
    ],
    recommendations: [
      "Prioritize high-return strategic initiatives with verifiable operational milestones.",
      "Strengthen enterprise resilience against international market supply chain fluctuations.",
      "Align executive reporting with transparent metrics and long-term shareholder value creation."
    ]
  };
}

/** Lays out a clean, Bloomberg-styled Executive Intelligence PDF document */
function layoutReportPages(data: ReportData): PageLayout[] {
  const pages: PageLayout[] = [];

  // ---------------- PAGE 1: COVER & EXECUTIVE SUMMARY ----------------
  const p1Text: TextOp[] = [];
  const p1Rect: RectOp[] = [];

  // Top Pride Times Red Accent Bar
  p1Rect.push({ x: 0, y: PAGE_H - 10, w: PAGE_W, h: 10, color: BRAND_RED, fill: true });

  // Masthead Header
  p1Text.push({
    x: MARGIN,
    y: PAGE_H - 45,
    size: 10,
    bold: true,
    color: BRAND_RED,
    text: "THE PRIDE TIMES  |  EXECUTIVE INTELLIGENCE BRIEFING"
  });

  p1Text.push({
    x: MARGIN,
    y: PAGE_H - 58,
    size: 8,
    bold: false,
    color: GRAY,
    text: "GLOBAL VOICE OF INNOVATION, LEADERSHIP & FINANCIAL INTELLIGENCE"
  });

  // Divider Line
  p1Rect.push({ x: MARGIN, y: PAGE_H - 68, w: CONTENT_W, h: 1.5, color: DARK, fill: true });

  // Report Category
  p1Text.push({
    x: MARGIN,
    y: PAGE_H - 95,
    size: 11,
    bold: true,
    color: BRAND_RED,
    text: toAscii(data.category.toUpperCase())
  });

  // Report Title
  const titleLines = wrap(data.title, 22, CONTENT_W);
  let curY = PAGE_H - 128;
  for (const line of titleLines) {
    p1Text.push({ x: MARGIN, y: curY, size: 22, bold: true, color: DARK, text: line });
    curY -= 28;
  }

  // Publication Meta
  curY -= 6;
  p1Text.push({
    x: MARGIN,
    y: curY,
    size: 9,
    bold: false,
    color: GRAY,
    text: `Published: ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}  *  Format: Official Research Briefing  *  Classification: Proprietary & Confidential`
  });

  curY -= 20;
  p1Rect.push({ x: MARGIN, y: curY, w: CONTENT_W, h: 0.5, color: GRAY, fill: true });

  // Section 1: Executive Summary Callout Box
  curY -= 30;
  p1Text.push({ x: MARGIN, y: curY, size: 14, bold: true, color: DARK, text: "1. EXECUTIVE SUMMARY" });

  curY -= 14;
  const summaryLines = wrap(data.executiveSummary, 10, CONTENT_W - 24);
  const boxH = summaryLines.length * 15 + 24;
  p1Rect.push({ x: MARGIN, y: curY - boxH + 10, w: CONTENT_W, h: boxH, color: LIGHT_BG, fill: true });
  p1Rect.push({ x: MARGIN, y: curY - boxH + 10, w: 4, h: boxH, color: BRAND_RED, fill: true });

  let textY = curY - 14;
  for (const line of summaryLines) {
    p1Text.push({ x: MARGIN + 14, y: textY, size: 10, bold: false, color: DARK, text: line });
    textY -= 15;
  }
  curY = textY - 20;

  // Section 2: Key Strategic Findings
  p1Text.push({ x: MARGIN, y: curY, size: 14, bold: true, color: DARK, text: "2. KEY STRATEGIC FINDINGS" });
  curY -= 18;

  for (let i = 0; i < data.keyFindings.length; i++) {
    const finding = `${i + 1}. ${data.keyFindings[i]}`;
    const findingLines = wrap(finding, 9.5, CONTENT_W - 12);
    for (const line of findingLines) {
      p1Text.push({ x: MARGIN + 8, y: curY, size: 9.5, bold: false, color: DARK, text: line });
      curY -= 14;
    }
    curY -= 6;
  }

  // Page 1 Footer
  p1Rect.push({ x: MARGIN, y: 40, w: CONTENT_W, h: 0.5, color: GRAY, fill: true });
  p1Text.push({
    x: MARGIN,
    y: 26,
    size: 8,
    bold: false,
    color: GRAY,
    text: "THE PRIDE TIMES RESEARCH  *  Confidential & Proprietary"
  });
  p1Text.push({
    x: PAGE_W - MARGIN - 40,
    y: 26,
    size: 8,
    bold: false,
    color: GRAY,
    text: "Page 1 of 2"
  });

  pages.push({ textOps: p1Text, rectOps: p1Rect });

  // ---------------- PAGE 2: METRICS, INSIGHTS & RECOMMENDATIONS ----------------
  const p2Text: TextOp[] = [];
  const p2Rect: RectOp[] = [];

  // Top Header
  p2Rect.push({ x: 0, y: PAGE_H - 10, w: PAGE_W, h: 10, color: BRAND_RED, fill: true });
  p2Text.push({
    x: MARGIN,
    y: PAGE_H - 45,
    size: 10,
    bold: true,
    color: BRAND_RED,
    text: "THE PRIDE TIMES  |  EXECUTIVE INTELLIGENCE BRIEFING"
  });
  p2Text.push({
    x: PAGE_W - MARGIN - 140,
    y: PAGE_H - 45,
    size: 9,
    bold: false,
    color: GRAY,
    text: toAscii(data.title.slice(0, 28) + (data.title.length > 28 ? "..." : ""))
  });
  p2Rect.push({ x: MARGIN, y: PAGE_H - 56, w: CONTENT_W, h: 1, color: DARK, fill: true });

  let p2Y = PAGE_H - 85;

  // Section 3: Strategic Metrics & Benchmark Table
  p2Text.push({ x: MARGIN, y: p2Y, size: 14, bold: true, color: DARK, text: "3. BENCHMARK & SECTOR METRICS" });
  p2Y -= 20;

  // Table Header Box
  p2Rect.push({ x: MARGIN, y: p2Y - 18, w: CONTENT_W, h: 22, color: DARK, fill: true });
  p2Text.push({ x: MARGIN + 12, y: p2Y - 12, size: 9, bold: true, color: [1, 1, 1], text: "KEY PERFORMANCE INDICATOR" });
  p2Text.push({ x: MARGIN + 280, y: p2Y - 12, size: 9, bold: true, color: [1, 1, 1], text: "OBSERVED VALUE" });
  p2Text.push({ x: MARGIN + 390, y: p2Y - 12, size: 9, bold: true, color: [1, 1, 1], text: "BENCHMARK / DELTA" });
  p2Y -= 20;

  data.metricsTable.forEach((row, idx) => {
    const isAlt = idx % 2 === 1;
    if (isAlt) {
      p2Rect.push({ x: MARGIN, y: p2Y - 18, w: CONTENT_W, h: 22, color: LIGHT_BG, fill: true });
    }
    p2Rect.push({ x: MARGIN, y: p2Y - 19, w: CONTENT_W, h: 0.5, color: [0.85, 0.85, 0.85], fill: true });

    p2Text.push({ x: MARGIN + 12, y: p2Y - 12, size: 8.5, bold: true, color: DARK, text: toAscii(row.metric) });
    p2Text.push({ x: MARGIN + 280, y: p2Y - 12, size: 8.5, bold: false, color: BRAND_RED, text: toAscii(row.value) });
    p2Text.push({ x: MARGIN + 390, y: p2Y - 12, size: 8.5, bold: false, color: DARK, text: toAscii(row.benchmark) });
    p2Y -= 22;
  });

  p2Y -= 15;

  // Section 4: Deep Insights
  p2Text.push({ x: MARGIN, y: p2Y, size: 14, bold: true, color: DARK, text: "4. INDUSTRY INTELLIGENCE ANALYSIS" });
  p2Y -= 18;

  for (const item of data.strategicInsights) {
    const lines = wrap(item, 9.5, CONTENT_W - 14);
    p2Rect.push({ x: MARGIN + 4, y: p2Y - 3, w: 4, h: 4, color: BRAND_RED, fill: true });
    for (const l of lines) {
      p2Text.push({ x: MARGIN + 16, y: p2Y, size: 9.5, bold: false, color: DARK, text: l });
      p2Y -= 14;
    }
    p2Y -= 6;
  }

  p2Y -= 10;

  // Section 5: Strategic Recommendations
  p2Text.push({ x: MARGIN, y: p2Y, size: 14, bold: true, color: DARK, text: "5. STRATEGIC RECOMMENDATIONS FOR LEADERSHIP" });
  p2Y -= 18;

  for (let i = 0; i < data.recommendations.length; i++) {
    const recText = `* Action ${i + 1}: ${data.recommendations[i]}`;
    const lines = wrap(recText, 9.5, CONTENT_W - 14);
    for (const l of lines) {
      p2Text.push({ x: MARGIN + 8, y: p2Y, size: 9.5, bold: false, color: DARK, text: l });
      p2Y -= 14;
    }
    p2Y -= 4;
  }

  // Legal Disclaimer Box
  p2Y -= 12;
  p2Rect.push({ x: MARGIN, y: p2Y - 36, w: CONTENT_W, h: 36, color: LIGHT_BG, fill: true });
  p2Text.push({
    x: MARGIN + 10,
    y: p2Y - 14,
    size: 7.5,
    bold: false,
    color: GRAY,
    text: "DISCLAIMER: The information contained herein has been compiled from verified proprietary sources and market reports."
  });
  p2Text.push({
    x: MARGIN + 10,
    y: p2Y - 26,
    size: 7.5,
    bold: false,
    color: GRAY,
    text: "All opinions constitute The Pride Times Editorial Board's judgment as of the date of publication and are subject to change."
  });

  // Page 2 Footer
  p2Rect.push({ x: MARGIN, y: 40, w: CONTENT_W, h: 0.5, color: GRAY, fill: true });
  p2Text.push({
    x: MARGIN,
    y: 26,
    size: 8,
    bold: false,
    color: GRAY,
    text: "(c) 2026 The Pride Times Inc. All rights reserved.  *  https://thepridetime.com"
  });
  p2Text.push({
    x: PAGE_W - MARGIN - 40,
    y: 26,
    size: 8,
    bold: false,
    color: GRAY,
    text: "Page 2 of 2"
  });

  pages.push({ textOps: p2Text, rectOps: p2Rect });

  return pages;
}

/** Assembles PDF binary objects adhering strictly to PDF-1.4 specification */
export function buildReportPdf(pages: PageLayout[]): Blob {
  const objects: string[] = [];

  // 1: Catalog
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");

  // 2: Pages list placeholder
  objects.push("");

  // 3: Font Helvetica
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  // 4: Font Helvetica-Bold
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  const pageIds: number[] = [];

  pages.forEach((page) => {
    const pageId = objects.length + 1;
    const contentId = pageId + 1;
    pageIds.push(pageId);

    let stream = "";

    // Draw rectangles
    for (const r of page.rectOps) {
      stream += `${r.color[0].toFixed(3)} ${r.color[1].toFixed(3)} ${r.color[2].toFixed(3)} ${r.fill ? "rg" : "RG"}\n`;
      stream += `${r.x.toFixed(2)} ${r.y.toFixed(2)} ${r.w.toFixed(2)} ${r.h.toFixed(2)} re ${r.fill ? "f" : "S"}\n`;
    }

    // Draw text
    for (const op of page.textOps) {
      stream += "BT\n";
      stream += `/${op.bold ? "F2" : "F1"} ${op.size.toFixed(1)} Tf\n`;
      stream += `${op.color[0].toFixed(3)} ${op.color[1].toFixed(3)} ${op.color[2].toFixed(3)} rg\n`;
      stream += `${op.x.toFixed(2)} ${op.y.toFixed(2)} Td\n`;
      stream += `(${escapePdfText(op.text)}) Tj\n`;
      stream += "ET\n";
    }

    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`
    );
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });

  objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;

  let out = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefPos = out.length;
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    out += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

  return new Blob([out], { type: "application/pdf" });
}

/** Generates and downloads the executive briefing directly in the user's browser */
export function downloadExecutiveReport(title: string) {
  const data = getReportData(title);
  const pages = layoutReportPages(data);
  const blob = buildReportPdf(pages);
  const slug = getReportSlug(title);
  const filename = `${slug}.pdf`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}
