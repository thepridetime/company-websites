// DRAFT - not wired in yet. Do not import until reviewed.
// Target path: src/lib/savedArticles.ts
// Backs the Bookmark button in ArticleDetailPage and the "saved" list on DashboardPage.
// Uniqueness is (user_id, path), so saving twice is harmless.
import { supabase } from "./supabase";

export type SavedArticle = { title: string; category: string; path: string; saved_at: string };
export type ArticleRef = { title: string; category: string; path: string };

export async function isArticleSaved(userId: string, path: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("saved_articles")
    .select("path")
    .eq("user_id", userId)
    .eq("path", path)
    .maybeSingle();
  if (error) {
    console.error("SAVED_CHECK_FAILED", error);
    return false;
  }
  return !!data;
}

export async function saveArticle(userId: string, article: ArticleRef): Promise<boolean> {
  const { error } = await supabase.from("saved_articles").upsert(
    {
      user_id: userId,
      title: article.title,
      category: article.category,
      path: article.path,
      saved_at: new Date().toISOString(),
    },
    { onConflict: "user_id,path", ignoreDuplicates: true }
  );
  if (error) {
    console.error("SAVE_ARTICLE_FAILED", error);
    return false;
  }
  return true;
}

export async function unsaveArticle(userId: string, path: string): Promise<boolean> {
  const { error } = await supabase
    .from("saved_articles")
    .delete()
    .eq("user_id", userId)
    .eq("path", path);
  if (error) {
    console.error("UNSAVE_ARTICLE_FAILED", error);
    return false;
  }
  return true;
}

/** Flips the saved state. Pass the current state so the UI can update optimistically. */
export async function toggleSavedArticle(
  userId: string,
  article: ArticleRef,
  currentlySaved: boolean
): Promise<boolean> {
  return currentlySaved
    ? unsaveArticle(userId, article.path)
    : saveArticle(userId, article);
}

export async function listSavedArticles(userId: string): Promise<SavedArticle[]> {
  const { data, error } = await supabase
    .from("saved_articles")
    .select("title, category, path, saved_at")
    .eq("user_id", userId)
    .order("saved_at", { ascending: false });
  if (error) {
    console.error("SAVED_FETCH_FAILED", error);
    throw error;
  }
  return (data ?? []) as SavedArticle[];
}
