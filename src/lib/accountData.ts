// Target path: src/lib/accountData.ts
// Builds the "Download your data" PDF with no extra libraries.
// Uses the built-in Helvetica font, so characters outside basic English/European
// Latin are replaced with "?" in the PDF.
import { supabase } from "./supabase";
import { NEWSLETTER_CATALOG } from "./newsletterPreferences";

export type ExportData = {
  exported_at: string;
  account: { user_id: string; email: string };
  reading_history: { title: string; category: string; path: string; read_at: string }[];
  saved_articles: { title: string; category: string; path: string; saved_at: string }[];
  newsletter_subscriptions: { newsletter_key: string; subscribed: boolean; updated_at: string }[];
};

export async function exportUserData(userId: string, email: string): Promise<ExportData> {
  const [reads, saved, newsletters] = await Promise.all([
    supabase
      .from("reading_history")
      .select("title, category, path, read_at")
      .eq("user_id", userId)
      .order("read_at", { ascending: false }),
    supabase
      .from("saved_articles")
      .select("title, category, path, saved_at")
      .eq("user_id", userId)
      .order("saved_at", { ascending: false }),
    supabase
      .from("newsletter_subscriptions")
      .select("newsletter_key, subscribed, updated_at")
      .eq("user_id", userId),
  ]);
  for (const res of [reads, saved, newsletters]) {
    if (res.error) throw res.error;
  }
  return {
    exported_at: new Date().toISOString(),
    account: { user_id: userId, email },
    reading_history: reads.data ?? [],
    saved_articles: saved.data ?? [],
    newsletter_subscriptions: newsletters.data ?? [],
  };
}

// ---------- Minimal PDF writer (text only, no libraries) ----------

const PAGE_W = 595; // A4 in points
const PAGE_H = 842;
const MARGIN = 48;
const GRAY: [number, number, number] = [0.43, 0.43, 0.43];
const DARK: [number, number, number] = [0.12, 0.12, 0.12];

type TextOp = { x: number; y: number; size: number; bold: boolean; color: [number, number, number]; text: string };

/** Keeps PDF text plain ASCII so byte offsets equal character offsets. */
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

/** Splits text into lines that fit the width, using an average Helvetica character width. */
function wrap(text: string, size: number, maxWidth: number): string[] {
  const maxChars = Math.max(10, Math.floor(maxWidth / (size * 0.55)));
  const out: string[] = [];
  for (const paragraph of toAscii(text).split("\n")) {
    let line = "";
    for (const word of paragraph.split(" ")) {
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length <= maxChars) {
        line = candidate;
      } else {
        if (line) out.push(line);
        // Break very long words (e.g. URLs) so they still fit.
        let rest = word;
        while (rest.length > maxChars) {
          out.push(rest.slice(0, maxChars));
          rest = rest.slice(maxChars);
        }
        line = rest;
      }
    }
    out.push(line);
  }
  return out;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

/** Lays out the user's data as pages of text. */
function layoutPages(data: ExportData): TextOp[][] {
  const pages: TextOp[][] = [];
  let ops: TextOp[] = [];
  let y = PAGE_H - MARGIN;
  const maxWidth = PAGE_W - MARGIN * 2;

  const newPage = () => {
    pages.push(ops);
    ops = [];
    y = PAGE_H - MARGIN;
  };

  const write = (
    text: string,
    opts: { size?: number; bold?: boolean; color?: [number, number, number]; gapAfter?: number } = {}
  ) => {
    const size = opts.size ?? 10;
    for (const line of wrap(text, size, maxWidth)) {
      if (y - size < MARGIN) newPage();
      ops.push({ x: MARGIN, y, size, bold: !!opts.bold, color: opts.color ?? DARK, text: line });
      y -= size + 5;
    }
    y -= opts.gapAfter ?? 0;
  };

  const heading = (text: string) => {
    y -= 12;
    if (y - 30 < MARGIN) newPage();
    write(text, { size: 13, bold: true, gapAfter: 4 });
  };

  write("Pride Times: Your data", { size: 18, bold: true, gapAfter: 6 });
  write(`Exported: ${formatDate(data.exported_at)}`, { color: GRAY });
  write(`Account email: ${data.account.email}`, { color: GRAY, gapAfter: 4 });
  write("This file contains the reading history, saved articles and newsletter preferences stored for your account.", {
    size: 9,
    color: GRAY,
  });

  heading(`Reading history (${data.reading_history.length})`);
  if (data.reading_history.length === 0) write("No reading history.", { color: GRAY });
  for (const r of data.reading_history) {
    const cat = r.category ? ` (${r.category})` : "";
    write(`${formatDate(r.read_at)}  -  ${r.title}${cat}`, { gapAfter: 3 });
  }

  heading(`Saved articles (${data.saved_articles.length})`);
  if (data.saved_articles.length === 0) write("No saved articles.", { color: GRAY });
  for (const s of data.saved_articles) {
    const cat = s.category ? ` (${s.category})` : "";
    write(`${formatDate(s.saved_at)}  -  ${s.title}${cat}`, { gapAfter: 3 });
  }

  heading("Newsletter preferences");
  const subscribed = new Map(data.newsletter_subscriptions.map((n) => [n.newsletter_key, n.subscribed]));
  for (const n of NEWSLETTER_CATALOG) {
    write(`${n.name}: ${subscribed.get(n.key) === true ? "Subscribed" : "Not subscribed"}`, { gapAfter: 3 });
  }

  pages.push(ops);
  return pages;
}

/** Turns laid-out pages into a valid PDF file. */
function buildPdf(pages: TextOp[][]): Blob {
  const total = pages.length;
  // Object numbering: 1 catalog, 2 pages, 3 Helvetica, 4 Helvetica-Bold, then (page, content) pairs.
  const objects: string[] = [];
  const pageIds: number[] = [];
  const firstPageObj = 5;

  objects[0] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

  pages.forEach((ops, i) => {
    const pageId = firstPageObj + i * 2; // page object
    const contentId = pageId + 1; // content stream
    pageIds.push(pageId);

    const footer: TextOp = {
      x: PAGE_W / 2 - 25,
      y: 24,
      size: 8,
      bold: false,
      color: GRAY,
      text: `Page ${i + 1} of ${total}`,
    };
    const all = [...ops, footer];

    const stream = all
      .map((op) => {
        const [r, g, b] = op.color;
        return `BT /${op.bold ? "F2" : "F1"} ${op.size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${op.x.toFixed(2)} ${op.y.toFixed(2)} Tm (${escapePdfText(op.text)}) Tj ET`;
      })
      .join("\n");

    objects[pageId - 1] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId - 1] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });

  objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${total} >>`;

  let out = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefPos = out.length;
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) out += `${String(off).padStart(10, "0")} 00000 n \n`;
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

  return new Blob([out], { type: "application/pdf" });
}

export function downloadDataPdf(filename: string, data: ExportData) {
  const blob = buildPdf(layoutPages(data));
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function clearSavedArticles(userId: string): Promise<boolean> {
  const { error } = await supabase.from("saved_articles").delete().eq("user_id", userId);
  if (error) {
    console.error("CLEAR_SAVED_FAILED", error);
    return false;
  }
  return true;
}
