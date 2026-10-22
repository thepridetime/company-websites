// DRAFT - not wired in yet. Do not import until reviewed.
// Target path: src/lib/readingHistory.ts
// Uses the existing `reading_history` table (columns: user_id, title, category,
// path, is_premium, read_at). Does NOT replace src/lib/activity.ts or src/lib/access.ts.
import { supabase } from "./supabase";

export type ArticleRef = { title: string; category: string; path: string };
export type ReadItem = ArticleRef & { read_at: string };
export type ReadingStats = {
  recent: ReadItem[];      // latest distinct articles
  readsThisMonth: number;  // total read events since the 1st of the month
  streak: number;          // consecutive days ending today (or yesterday)
};

const DEDUP_WINDOW_MS = 10 * 60 * 1000; // same article within 10 min = one read
const RECENT_LIMIT = 5;

function monthStartISO(): string {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/** Pure helper: consecutive reading days, ending today or yesterday. */
export function computeStreak(readDates: string[], now: Date = new Date()): number {
  const days = new Set(readDates.map((iso) => dayKey(new Date(iso))));
  const cursor = new Date(now);
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Records a read. Safe to call when signed out (does nothing). Returns true if stored. */
export async function recordRead(article: ArticleRef, isPremium = false): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return false;

  const since = new Date(Date.now() - DEDUP_WINDOW_MS).toISOString();
  const { data: recent, error: checkError } = await supabase
    .from("reading_history")
    .select("id")
    .eq("user_id", userId)
    .eq("path", article.path)
    .eq("title", article.title)
    .gt("read_at", since)
    .limit(1);
  if (checkError) console.error("READ_DEDUP_CHECK_FAILED", checkError);
  if (recent && recent.length > 0) return false;

  const { error } = await supabase.from("reading_history").insert({
    user_id: userId,
    title: article.title,
    category: article.category,
    path: article.path,
    is_premium: isPremium,
  });
  if (error) {
    console.error("READ_RECORD_FAILED", error);
    return false;
  }
  return true;
}

/** Latest distinct articles (same article counted once, newest first). */
export async function getRecentReads(userId: string, limit = RECENT_LIMIT): Promise<ReadItem[]> {
  const { data, error } = await supabase
    .from("reading_history")
    .select("title, category, path, read_at")
    .eq("user_id", userId)
    .order("read_at", { ascending: false })
    .limit(limit * 6); // over-fetch so dedupe still yields `limit` items
  if (error) {
    console.error("RECENT_READS_FETCH_FAILED", error);
    throw error;
  }
  const seen = new Set<string>();
  const out: ReadItem[] = [];
  for (const row of (data ?? []) as ReadItem[]) {
    const key = `${row.path}|${row.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
    if (out.length === limit) break;
  }
  return out;
}

/** Full stats for a dashboard. Reads up to 1000 recent events for the streak. */
export async function getReadingStats(userId: string): Promise<ReadingStats> {
  const [recent, datesRes] = await Promise.all([
    getRecentReads(userId),
    supabase
      .from("reading_history")
      .select("read_at")
      .eq("user_id", userId)
      .order("read_at", { ascending: false })
      .limit(1000),
  ]);
  if (datesRes.error) {
    console.error("READ_DATES_FETCH_FAILED", datesRes.error);
    throw datesRes.error;
  }
  const dates = (datesRes.data ?? []).map((r) => r.read_at as string);
  const monthStart = new Date(monthStartISO());
  return {
    recent,
    readsThisMonth: dates.filter((d) => new Date(d) >= monthStart).length,
    streak: computeStreak(dates),
  };
}

/** Deletes the user's whole reading history (for a "clear history" button). */
export async function clearReadingHistory(userId: string): Promise<boolean> {
  const { error } = await supabase.from("reading_history").delete().eq("user_id", userId);
  if (error) {
    console.error("READ_HISTORY_CLEAR_FAILED", error);
    return false;
  }
  return true;
}
