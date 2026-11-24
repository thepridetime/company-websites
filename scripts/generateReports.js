// Generates static PDF files for public/reports/
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "public", "reports");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const PAGE_W = 595;
const PAGE_H = 842;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BRAND_RED = [0.89, 0.11, 0.14];
const DARK = [0.08, 0.08, 0.08];
const GRAY = [0.42, 0.42, 0.42];
const LIGHT_BG = [0.96, 0.96, 0.97];

function toAscii(input) {
  return input
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00A0/g, " ")
    .replace(/[^\x20-\x7E]/g, "?");
}

function escapePdfText(s) {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text, size, maxWidth) {
  const maxChars = Math.max(10, Math.floor(maxWidth / (size * 0.53)));
  const out = [];
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

const REPORTS = [
  {
    slug: "global-ai-readiness-index-2026",
    title: "Global AI Readiness Index 2026",
    category: "Technology & Compute Infrastructure",
    summary: "The Global AI Readiness Index evaluates 65 nations across compute capacity, proprietary foundation model training, sovereign data regulation, and enterprise AI adoption. North America and East Asia command 78% of frontier training clusters.",
    findings: [
      "Frontier data centre power constraints have elevated electricity availability above tax incentives as the #1 determinant of compute site selection.",
      "Enterprise inference workloads grew 310% year-on-year, driving demand for specialized ASIC hardware over generalized clusters.",
      "Sovereign AI mandates across Europe and India have sparked more than $40B in localized sovereign cloud development."
    ],
    table: [
      ["Frontier Compute Installed (Exaflops)", "148.5 EFLOPS", "+142% YoY"],
      ["Enterprise GenAI Adoption Rate", "44.8%", "+19.2 pts"],
      ["Data Centre Power Under Dev", "32.4 GW", "North America & EU"],
      ["Average Inference Cost Decline", "-68.4%", "Trailing 12 Months"]
    ],
    insights: [
      "Compute Density: Rack density is shifting from 15kW to upwards of 60-100kW per cabinet, making liquid-cooling retrofit mandatory.",
      "Semiconductor Sourcing: Diversification into multi-foundry packaging reduces single-source risks across tier-1 hyperscalers."
    ],
    recommendations: [
      "Decouple training cluster investments from latency-sensitive operational inference deployments.",
      "Hedge long-term energy supply through direct power purchase agreements (PPAs) with nuclear and clean developers."
    ]
  },
  {
    slug: "world-s-100-best-managed-companies",
    title: "World's 100 Best-Managed Companies",
    category: "Corporate Governance & Rankings",
    summary: "An empirical assessment of the top 100 publicly listed corporations across five performance dimensions: capital allocation efficiency, employee retention, innovation velocity, supply-chain resilience, and total shareholder return (TSR).",
    findings: [
      "Top-decile companies reinvested an average of 14.6% of gross revenues into R&D and digital infrastructure.",
      "Supply-chain redundancy strategies (dual-sourcing across Southeast Asia, India, and Mexico) prevented costly single-point disruptions.",
      "Firms maintaining disciplined executive accountability metrics generated 2.4x higher 5-year annualized returns than peer benchmarks."
    ],
    table: [
      ["Median 5-Year Return on Capital", "22.6%", "Vs 11.2% S&P 500"],
      ["Average Operating Margin", "28.4%", "+340 bps YoY"],
      ["Employee Turnover (Voluntary)", "5.8%", "Vs 14.2% Industry Avg"],
      ["Free Cash Flow Conversion", "91.3%", "High Quality Earnings"]
    ],
    insights: [
      "Capital Efficiency: Leading organizations prioritize organic reinvestment over debt-funded share buybacks at market cycle peaks.",
      "Operational Transparency: Robust board-level risk committees regularly stress-test interest rate volatility and cyber vulnerabilities."
    ],
    recommendations: [
      "Benchmark business unit capital allocation using Return on Invested Capital (ROIC) hurdles.",
      "Tie executive compensation structures to long-term economic value added (EVA) rather than quarterly revenue guidance."
    ]
  },
  {
    slug: "india-economic-outlook-2026-2030",
    title: "India Economic Outlook 2026–2030",
    category: "Macroeconomics & Capital Markets",
    summary: "India's structural economic transformation is projected to maintain 6.8%-7.2% annual GDP expansion through 2030. Key growth engines include the Production Linked Incentive (PLI) schemes in electronics and green hydrogen, national infrastructure logistics corridors, capital markets depth, and rapid digitalization.",
    findings: [
      "Domestic electronics manufacturing has surpassed $115B annually, with export volume growing at a 38% CAGR.",
      "Systemic retail mutual fund inflows via Systematic Investment Plans (SIPs) exceed INR 28,000 Crore monthly, buffering domestic equities from foreign capital outflows.",
      "National logistics corridor upgrades have reduced transit times by 26% across key freight routes."
    ],
    table: [
      ["Projected 5-Year Average GDP", "7.1% Annually", "#1 Major Global Economy"],
      ["Annual Foreign Direct Investment (FDI)", "$88.5 Billion", "+14.5% Growth"],
      ["Monthly SIP Equity Capital Inflow", "INR 28,450 Cr", "Record Domestic Liquidity"],
      ["Renewable Energy Installed Target", "500 GW by 2030", "On-Track Infrastructure"]
    ],
    insights: [
      "Manufacturing Transition: Global OEMs are scaling multi-tier local component ecosystems beyond final assembly in southern and western states.",
      "Consumer Discretionary Boom: Rising per capita income in tier-2 and tier-3 cities is driving premiumization across automotive, housing, and fintech."
    ],
    recommendations: [
      "Deploy growth capital into domestic manufacturing ancillaries and specialized freight logistics.",
      "Leverage digital public infrastructure (India Stack, ONDC, Account Aggregator) to reduce financial underwriting friction."
    ]
  },
  {
    slug: "clean-energy-investment-report-q1-2026",
    title: "Clean Energy Investment Report Q1 2026",
    category: "Energy Transition & ESG Finance",
    summary: "Global investments in renewable energy, grid-scale battery storage, and carbon-free base load power reached $412B in the first quarter of 2026. Utility-scale battery energy storage systems (BESS) experienced their steepest cost decline since 2020.",
    findings: [
      "Lithium iron phosphate (LFP) pack-level battery prices fell below $62/kWh, enabling 4-hour and 8-hour storage parity with peaker gas turbines.",
      "Offshore wind developments rebounded with updated corporate power purchase pricing contracts across Northern Europe and the US East Coast.",
      "Next-generation nuclear energy (SMRs) attracted $18.2B in private institutional commitments driven by tech sector data centre load demands."
    ],
    table: [
      ["Quarterly Clean Energy Inflow", "$412.0 Billion", "+18.4% YoY"],
      ["BESS Average Pack Price (LFP)", "$61.80 / kWh", "-24.2% YoY"],
      ["Solar PV Capacity Added (Q1)", "96.4 GW", "Global Grid Additions"],
      ["Corporate Green PPAs Executed", "24.8 GW", "Technology & Heavy Industry"]
    ],
    insights: [
      "Grid Transmission: The interconnection queue backlog across North America and Europe exceeds 1,400 GW of clean energy generation.",
      "Hybrid Installations: Co-locating utility solar with multi-hour battery storage ensures steady day-and-night capacity delivery."
    ],
    recommendations: [
      "Prioritize projects with signed grid interconnection agreements over speculative greenfield developments.",
      "Incorporate revenue stacking (ancillary services + energy arbitrage) when modeling BESS internal rates of return."
    ]
  },
  {
    slug: "global-cybersecurity-threat-report-2026",
    title: "Global Cybersecurity Threat Report 2026",
    category: "Information Security & Enterprise Defense",
    summary: "An exhaustive analysis of enterprise threat vectors, state-sponsored cyber campaigns, AI-assisted zero-day discovery, and ransomware resilience across 4,200 organizations. The proliferation of autonomous vulnerability synthesis has compressed the window between patch release and active exploitation down to less than 48 hours.",
    findings: [
      "Identity-based attacks exploiting stolen session tokens and compromised service accounts represented 79% of initial enterprise breaches.",
      "Ransomware groups have transitioned from data encryption to multi-stage extortion involving third-party supplier leaks.",
      "Autonomous security operations centres (SOC) utilizing fine-tuned defensive LLMs resolved Tier-1 security alerts 85% faster."
    ],
    table: [
      ["Median Incident Containment Time", "4.2 Days", "Down from 9.6 Days"],
      ["Average Enterprise Breach Cost", "$4.88 Million", "+8.4% YoY"],
      ["Identity-Centric Exploit Share", "79.2%", "Dominant Vector"],
      ["Zero-Day Exploitation Window", "< 48 Hours", "Rapid Automation Threat"]
    ],
    insights: [
      "Zero Trust Architecture: Micro-segmentation and continuous token evaluation are essential to stopping lateral network movement.",
      "Software Supply Chain: Open-source dependency poisoning remains a high-impact vector for enterprise ERP and CRM systems."
    ],
    recommendations: [
      "Enforce hardware-bound FIDO2 phishing-resistant authentication across all enterprise internal and external access tiers.",
      "Implement automated dependency scanning and cryptographic software bill of materials (SBOM) validation in CI/CD pipelines."
    ]
  }
];

function buildPdfString(report) {
  const p1Text = [];
  const p1Rect = [];

  p1Rect.push({ x: 0, y: PAGE_H - 10, w: PAGE_W, h: 10, color: BRAND_RED, fill: true });
  p1Text.push({ x: MARGIN, y: PAGE_H - 45, size: 10, bold: true, color: BRAND_RED, text: "THE PRIDE TIMES  |  EXECUTIVE INTELLIGENCE BRIEFING" });
  p1Text.push({ x: MARGIN, y: PAGE_H - 58, size: 8, bold: false, color: GRAY, text: "GLOBAL VOICE OF INNOVATION, LEADERSHIP & FINANCIAL INTELLIGENCE" });
  p1Rect.push({ x: MARGIN, y: PAGE_H - 68, w: CONTENT_W, h: 1.5, color: DARK, fill: true });

  p1Text.push({ x: MARGIN, y: PAGE_H - 95, size: 11, bold: true, color: BRAND_RED, text: toAscii(report.category.toUpperCase()) });

  const titleLines = wrap(report.title, 22, CONTENT_W);
  let curY = PAGE_H - 128;
  for (const line of titleLines) {
    p1Text.push({ x: MARGIN, y: curY, size: 22, bold: true, color: DARK, text: line });
    curY -= 28;
  }

  curY -= 6;
  p1Text.push({ x: MARGIN, y: curY, size: 9, bold: false, color: GRAY, text: "Published: October 2026  *  Format: Official Research Briefing  *  Classification: Proprietary & Confidential" });

  curY -= 20;
  p1Rect.push({ x: MARGIN, y: curY, w: CONTENT_W, h: 0.5, color: GRAY, fill: true });

  curY -= 30;
  p1Text.push({ x: MARGIN, y: curY, size: 14, bold: true, color: DARK, text: "1. EXECUTIVE SUMMARY" });

  curY -= 14;
  const summaryLines = wrap(report.summary, 10, CONTENT_W - 24);
  const boxH = summaryLines.length * 15 + 24;
  p1Rect.push({ x: MARGIN, y: curY - boxH + 10, w: CONTENT_W, h: boxH, color: LIGHT_BG, fill: true });
  p1Rect.push({ x: MARGIN, y: curY - boxH + 10, w: 4, h: boxH, color: BRAND_RED, fill: true });

  let textY = curY - 14;
  for (const line of summaryLines) {
    p1Text.push({ x: MARGIN + 14, y: textY, size: 10, bold: false, color: DARK, text: line });
    textY -= 15;
  }
  curY = textY - 20;

  p1Text.push({ x: MARGIN, y: curY, size: 14, bold: true, color: DARK, text: "2. KEY STRATEGIC FINDINGS" });
  curY -= 18;

  for (let i = 0; i < report.findings.length; i++) {
    const finding = `${i + 1}. ${report.findings[i]}`;
    const flines = wrap(finding, 9.5, CONTENT_W - 12);
    for (const line of flines) {
      p1Text.push({ x: MARGIN + 8, y: curY, size: 9.5, bold: false, color: DARK, text: line });
      curY -= 14;
    }
    curY -= 6;
  }

  p1Rect.push({ x: MARGIN, y: 40, w: CONTENT_W, h: 0.5, color: GRAY, fill: true });
  p1Text.push({ x: MARGIN, y: 26, size: 8, bold: false, color: GRAY, text: "THE PRIDE TIMES RESEARCH  *  Confidential & Proprietary" });
  p1Text.push({ x: PAGE_W - MARGIN - 40, y: 26, size: 8, bold: false, color: GRAY, text: "Page 1 of 2" });

  // PAGE 2
  const p2Text = [];
  const p2Rect = [];

  p2Rect.push({ x: 0, y: PAGE_H - 10, w: PAGE_W, h: 10, color: BRAND_RED, fill: true });
  p2Text.push({ x: MARGIN, y: PAGE_H - 45, size: 10, bold: true, color: BRAND_RED, text: "THE PRIDE TIMES  |  EXECUTIVE INTELLIGENCE BRIEFING" });
  p2Text.push({ x: PAGE_W - MARGIN - 140, y: PAGE_H - 45, size: 9, bold: false, color: GRAY, text: toAscii(report.title.slice(0, 28)) });
  p2Rect.push({ x: MARGIN, y: PAGE_H - 56, w: CONTENT_W, h: 1, color: DARK, fill: true });

  let p2Y = PAGE_H - 85;
  p2Text.push({ x: MARGIN, y: p2Y, size: 14, bold: true, color: DARK, text: "3. BENCHMARK & SECTOR METRICS" });
  p2Y -= 20;

  p2Rect.push({ x: MARGIN, y: p2Y - 18, w: CONTENT_W, h: 22, color: DARK, fill: true });
  p2Text.push({ x: MARGIN + 12, y: p2Y - 12, size: 9, bold: true, color: [1, 1, 1], text: "KEY PERFORMANCE INDICATOR" });
  p2Text.push({ x: MARGIN + 280, y: p2Y - 12, size: 9, bold: true, color: [1, 1, 1], text: "OBSERVED VALUE" });
  p2Text.push({ x: MARGIN + 390, y: p2Y - 12, size: 9, bold: true, color: [1, 1, 1], text: "BENCHMARK / DELTA" });
  p2Y -= 20;

  report.table.forEach((row, idx) => {
    if (idx % 2 === 1) {
      p2Rect.push({ x: MARGIN, y: p2Y - 18, w: CONTENT_W, h: 22, color: LIGHT_BG, fill: true });
    }
    p2Rect.push({ x: MARGIN, y: p2Y - 19, w: CONTENT_W, h: 0.5, color: [0.85, 0.85, 0.85], fill: true });
    p2Text.push({ x: MARGIN + 12, y: p2Y - 12, size: 8.5, bold: true, color: DARK, text: toAscii(row[0]) });
    p2Text.push({ x: MARGIN + 280, y: p2Y - 12, size: 8.5, bold: false, color: BRAND_RED, text: toAscii(row[1]) });
    p2Text.push({ x: MARGIN + 390, y: p2Y - 12, size: 8.5, bold: false, color: DARK, text: toAscii(row[2]) });
    p2Y -= 22;
  });

  p2Y -= 15;
  p2Text.push({ x: MARGIN, y: p2Y, size: 14, bold: true, color: DARK, text: "4. INDUSTRY INTELLIGENCE ANALYSIS" });
  p2Y -= 18;

  for (const item of report.insights) {
    const lines = wrap(item, 9.5, CONTENT_W - 14);
    p2Rect.push({ x: MARGIN + 4, y: p2Y - 3, w: 4, h: 4, color: BRAND_RED, fill: true });
    for (const l of lines) {
      p2Text.push({ x: MARGIN + 16, y: p2Y, size: 9.5, bold: false, color: DARK, text: l });
      p2Y -= 14;
    }
    p2Y -= 6;
  }

  p2Y -= 10;
  p2Text.push({ x: MARGIN, y: p2Y, size: 14, bold: true, color: DARK, text: "5. STRATEGIC RECOMMENDATIONS FOR LEADERSHIP" });
  p2Y -= 18;

  for (let i = 0; i < report.recommendations.length; i++) {
    const recText = `* Action ${i + 1}: ${report.recommendations[i]}`;
    const lines = wrap(recText, 9.5, CONTENT_W - 14);
    for (const l of lines) {
      p2Text.push({ x: MARGIN + 8, y: p2Y, size: 9.5, bold: false, color: DARK, text: l });
      p2Y -= 14;
    }
    p2Y -= 4;
  }

  p2Rect.push({ x: MARGIN, y: 40, w: CONTENT_W, h: 0.5, color: GRAY, fill: true });
  p2Text.push({ x: MARGIN, y: 26, size: 8, bold: false, color: GRAY, text: "(c) 2026 The Pride Times Inc. All rights reserved.  *  https://thepridetime.com" });
  p2Text.push({ x: PAGE_W - MARGIN - 40, y: 26, size: 8, bold: false, color: GRAY, text: "Page 2 of 2" });

  const pages = [{ textOps: p1Text, rectOps: p1Rect }, { textOps: p2Text, rectOps: p2Rect }];

  const objects = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  const pageIds = [];
  pages.forEach((page) => {
    const pageId = objects.length + 1;
    const contentId = pageId + 1;
    pageIds.push(pageId);

    let stream = "";
    for (const r of page.rectOps) {
      stream += `${r.color[0].toFixed(3)} ${r.color[1].toFixed(3)} ${r.color[2].toFixed(3)} ${r.fill ? "rg" : "RG"}\n`;
      stream += `${r.x.toFixed(2)} ${r.y.toFixed(2)} ${r.w.toFixed(2)} ${r.h.toFixed(2)} re ${r.fill ? "f" : "S"}\n`;
    }
    for (const op of page.textOps) {
      stream += "BT\n";
      stream += `/${op.bold ? "F2" : "F1"} ${op.size.toFixed(1)} Tf\n`;
      stream += `${op.color[0].toFixed(3)} ${op.color[1].toFixed(3)} ${op.color[2].toFixed(3)} rg\n`;
      stream += `${op.x.toFixed(2)} ${op.y.toFixed(2)} Td\n`;
      stream += `(${escapePdfText(op.text)}) Tj\n`;
      stream += "ET\n";
    }

    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });

  objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;

  let out = "%PDF-1.4\n";
  const offsets = [];
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

  return Buffer.from(out, "utf-8");
}

for (const report of REPORTS) {
  const buf = buildPdfString(report);
  const outPath = path.join(outDir, `${report.slug}.pdf`);
  fs.writeFileSync(outPath, buf);
  console.log(`Generated: ${outPath} (${buf.length} bytes)`);
}
console.log("All static reports generated successfully.");
