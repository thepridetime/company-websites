import { supabase } from "./supabase";

/** Call when a signed-in user opens an article. Safe to call when signed out. */
export async function trackRead(article: { title: string; category: string; path: string }) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return;

  // Skip if the same article was already logged in the last 10 minutes
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