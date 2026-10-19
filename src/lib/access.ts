import { supabase } from "./supabase";

/* Save as src/lib/access.ts (same folder as supabase.ts). */

/** Premium articles a Free user may open per calendar month. */
export const FREE_PREMIUM_LIMIT = 3;

export type ArticleRef = { title: string; category: string; path: string };

export const articleKey = (path: string, title: string) => `${path}|${title}`;

function monthStartISO(): string {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

/** The distinct premium articles this user has opened since the 1st of this month. */
export async function getPremiumReadKeys(userId: string): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("reading_history")
    .select("path, title")
    .eq("user_id", userId)
    .eq("is_premium", true)
    .gte("read_at", monthStartISO());

  if (error) {
    console.error("PREMIUM_READS_FETCH_FAILED", error);
    throw error;
  }
  return new Set((data ?? []).map((r) => articleKey(r.path, r.title)));
}

/** Records that the user opened a premium article (counts toward the monthly limit). */
export async function recordPremiumRead(userId: string, a: ArticleRef): Promise<boolean> {
  const { error } = await supabase.from("reading_history").insert({
    user_id: userId,
    title: a.title,
    category: a.category,
    path: a.path,
    is_premium: true,
  });
  if (error) {
    console.error("PREMIUM_READ_RECORD_FAILED", error);
    return false;
  }
  return true;
}