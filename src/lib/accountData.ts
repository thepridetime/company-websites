// Target path: src/lib/accountData.ts
// Builds the "Download your data" PDF. Requires: pnpm add jspdf
// RLS limits every query to the signed-in user's own rows.
import { jsPDF } from "jspdf";
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

const MARGIN = 48;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

/** Lays out the user's data as a text PDF with page breaks and page numbers. */
export function buildDataPdf(data: ExportData): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = doc.internal.pageSize.getWidth() - MARGIN * 2;
  let y = MARGIN;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const writeText = (
    text: string,
    opts: { size?: number; bold?: boolean; color?: [number, number, number]; gapAfter?: number } = {}
  ) => {
    const size = opts.size ?? 10;
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...(opts.color ?? [30, 30, 30]));
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    for (const line of lines) {
      ensureSpace(size + 4);
      doc.text(line, MARGIN, y);
      y += size + 4;
    }
    y += opts.gapAfter ?? 0;
  };

  const heading = (text: string) => {
    y += 14;
    ensureSpace(30);
    writeText(text, { size: 13, bold: true, gapAfter: 4 });
  };

  const GRAY: [number, number, number] = [110, 110, 110];

  writeText("Pride Times: Your data", { size: 18, bold: true, gapAfter: 6 });
  writeText(`Exported: ${formatDate(data.exported_at)}`, { color: GRAY });
  writeText(`Account email: ${data.account.email}`, { color: GRAY, gapAfter: 4 });
  writeText(
    "This file contains the reading history, saved articles and newsletter preferences stored for your account.",
    { size: 9, color: GRAY }
  );

  heading(`Reading history (${data.reading_history.length})`);
  if (data.reading_history.length === 0) {
    writeText("No reading history.", { color: GRAY });
  }
  for (const r of data.reading_history) {
    const cat = r.category ? ` (${r.category})` : "";
    writeText(`${formatDate(r.read_at)}  -  ${r.title}${cat}`, { gapAfter: 2 });
  }

  heading(`Saved articles (${data.saved_articles.length})`);
  if (data.saved_articles.length === 0) {
    writeText("No saved articles.", { color: GRAY });
  }
  for (const s of data.saved_articles) {
    const cat = s.category ? ` (${s.category})` : "";
    writeText(`${formatDate(s.saved_at)}  -  ${s.title}${cat}`, { gapAfter: 2 });
  }

  heading("Newsletter preferences");
  const subscribed = new Map(data.newsletter_subscriptions.map((n) => [n.newsletter_key, n.subscribed]));
  for (const n of NEWSLETTER_CATALOG) {
    const on = subscribed.get(n.key) === true;
    writeText(`${n.name}: ${on ? "Subscribed" : "Not subscribed"}`, { gapAfter: 2 });
  }

  // Page numbers on every page
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    doc.text(`Page ${i} of ${total}`, doc.internal.pageSize.getWidth() / 2, pageHeight - 24, { align: "center" });
  }

  return doc;
}

export function downloadDataPdf(filename: string, data: ExportData) {
  buildDataPdf(data).save(filename);
}

export async function clearSavedArticles(userId: string): Promise<boolean> {
  const { error } = await supabase.from("saved_articles").delete().eq("user_id", userId);
  if (error) {
    console.error("CLEAR_SAVED_FAILED", error);
    return false;
  }
  return true;
}
