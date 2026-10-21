// DRAFT - not wired in yet. Review before merging.
// Target path: src/lib/accountData.ts
// Export and clear helpers used by the Privacy & data page. RLS limits every
// query to the signed-in user's own rows.
import { supabase } from "./supabase";

export async function exportUserData(userId: string, email: string) {
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

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
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
