// Target path: src/lib/readingHistory.ts
// Uses the `reading_history` table (user_id, title, category, path, is_premium, read_at)
// plus localStorage fallback for robust offline and guest tracking.

import { supabase } from "./supabase";

export type ArticleRef = { title: string; category: string; path: string };
export type ReadItem = ArticleRef & { read_at: string };
export type ReadingStats = {
  recent: ReadItem[];
  readsThisMonth: number;
  streak: number;
};

const DEDUP_WINDOW_MS = 10 * 60 * 1000; // same article within 10 min = one read
const RECENT_LIMIT = 5;

function getLocalReadsKey(userId?: string): string {
  return `pridetime_reads_${userId || "guest"}`;
}

export function getLocalReads(userId?: string): ReadItem[] {
  try {
    const raw = localStorage.getItem(getLocalReadsKey(userId));
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function setLocalReads(userId: string | undefined, list: ReadItem[]) {
  try {
    localStorage.setItem(getLocalReadsKey(userId), JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("pridetime_reads_updated"));
  } catch (err) {
    console.warn("Could not save reading history locally:", err);
  }
}

function monthStartISO(): string {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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

/** Records a read. Works seamlessly for logged in and guest users. */
export async function recordRead(article: ArticleRef, isPremium = false): Promise<boolean> {
  const now = new Date();
  const nowISO = now.toISOString();

  let userId: string | undefined;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    userId = session?.user?.id;
  } catch {
    // Supabase session check failed; proceed with local tracking
  }

  // Local deduplication check
  const localList = getLocalReads(userId);
  const tenMinsAgo = Date.now() - DEDUP_WINDOW_MS;
  const recentDuplicate = localList.find(
    (item) => item.path === article.path && new Date(item.read_at).getTime() > tenMinsAgo
  );

  if (!recentDuplicate) {
    const newEntry: ReadItem = {
      title: article.title,
      category: article.category,
      path: article.path,
      read_at: nowISO,
    };
    setLocalReads(userId, [newEntry, ...localList.slice(0, 499)]);
  }

  // If user is authenticated, sync to Supabase
  if (userId) {
    try {
      await supabase.from("reading_history").insert({
        user_id: userId,
        title: article.title,
        category: article.category,
        path: article.path,
        is_premium: isPremium,
      });
    } catch (err) {
      console.warn("Supabase recordRead notice:", err);
    }
  }

  return true;
}

/** Latest distinct articles (same article counted once, newest first). */
export async function getRecentReads(userId?: string, limit = RECENT_LIMIT): Promise<ReadItem[]> {
  const local = getLocalReads(userId);

  if (!userId || userId === "guest") {
    const seen = new Set<string>();
    const out: ReadItem[] = [];
    for (const row of local) {
      const key = `${row.path}|${row.title}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(row);
      if (out.length === limit) break;
    }
    return out;
  }

  try {
    const { data, error } = await supabase
      .from("reading_history")
      .select("title, category, path, read_at")
      .eq("user_id", userId)
      .order("read_at", { ascending: false })
      .limit(limit * 6);

    const pool = error || !data || data.length === 0 ? local : (data as ReadItem[]);
    const seen = new Set<string>();
    const out: ReadItem[] = [];
    for (const row of pool) {
      const key = `${row.path}|${row.title}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(row);
      if (out.length === limit) break;
    }
    return out;
  } catch {
    const seen = new Set<string>();
    const out: ReadItem[] = [];
    for (const row of local) {
      const key = `${row.path}|${row.title}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(row);
      if (out.length === limit) break;
    }
    return out;
  }
}

/** Full stats for the dashboard. */
export async function getReadingStats(userId?: string): Promise<ReadingStats> {
  const recent = await getRecentReads(userId);
  const local = getLocalReads(userId);
  let dates: string[] = local.map((r) => r.read_at);

  if (userId && userId !== "guest") {
    try {
      const { data } = await supabase
        .from("reading_history")
        .select("read_at")
        .eq("user_id", userId)
        .order("read_at", { ascending: false })
        .limit(1000);

      if (data && data.length > 0) {
        dates = Array.from(new Set([...data.map((r) => r.read_at as string), ...dates]));
      }
    } catch {
      // Use local dates
    }
  }

  const monthStart = new Date(monthStartISO());
  return {
    recent,
    readsThisMonth: dates.filter((d) => new Date(d) >= monthStart).length,
    streak: computeStreak(dates),
  };
}

/** Deletes the user's whole reading history */
export async function clearReadingHistory(userId?: string): Promise<boolean> {
  setLocalReads(userId, []);

  if (userId && userId !== "guest") {
    try {
      await supabase.from("reading_history").delete().eq("user_id", userId);
    } catch (err) {
      console.warn("Clear reading history notice:", err);
    }
  }
  return true;
}
