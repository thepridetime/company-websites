import { supabase } from "./supabase";

/* Save as src/lib/activity.ts (same folder as supabase.ts). */

/** Call when a signed-in user opens an article. Safe to call when signed out. */
export async function trackRead(article: { title: string; category: string; path: string }) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return;

  // Skip if the same article was already logged in the last 10 minutes (avoids refresh spam)
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { data: recent } = await supabase
    .from("reading_history")
    .select("id")
    .eq("user_id", session.user.id)
    .eq("path", article.path)
    .eq("title", article.title)
    .gt("read_at", since)
    .limit(1);
  if (recent && recent.length > 0) return;

  const { error } = await supabase.from("reading_history").insert({
    user_id: session.user.id,
    title: article.title,
    category: article.category,
    path: article.path,
  });
  if (error) console.error("TRACK_READ_FAILED", error);
}

/** Save an article to the user's library. */
export async function saveArticle(article: { title: string; category: string; path: string }) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return { success: false, error: "not signed in" };

  const { error } = await supabase.from("saved_articles").upsert(
    { user_id: session.user.id, ...article },
    { onConflict: "user_id,path,title", ignoreDuplicates: true }
  );
  if (error) {
    console.error("SAVE_ARTICLE_FAILED", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

/** Remove an article from the user's library. */
export async function unsaveArticle(article: { title: string; path: string }) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return { success: false, error: "not signed in" };

  const { error } = await supabase
    .from("saved_articles")
    .delete()
    .eq("user_id", session.user.id)
    .eq("path", article.path)
    .eq("title", article.title);
  if (error) return { success: false, error: error.message };
  return { success: true };
}