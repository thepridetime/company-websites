// Target path: src/lib/savedArticles.ts
// Backs the Bookmark button in ArticleDetailPage, DynamicArticlePage, and DashboardPage.
// Supports bidirectional sync: Supabase cloud database + LocalStorage fallback.

import { supabase } from "./supabase";

export type SavedArticle = {
  title: string;
  category: string;
  path: string;
  saved_at: string;
};

export type ArticleRef = {
  title: string;
  category: string;
  path: string;
};

function getLocalKey(userId: string): string {
  return `pridetime_saved_${userId || "guest"}`;
}

export function getLocalSaved(userId: string): SavedArticle[] {
  try {
    const raw = localStorage.getItem(getLocalKey(userId));
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function setLocalSaved(userId: string, list: SavedArticle[]) {
  try {
    localStorage.setItem(getLocalKey(userId), JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("pridetime_saved_updated"));
  } catch (err) {
    console.warn("Could not save to localStorage:", err);
  }
}

export async function isArticleSaved(userId: string, path: string): Promise<boolean> {
  // Check local first for immediate feedback
  const localList = getLocalSaved(userId);
  if (localList.some((item) => item.path === path)) {
    return true;
  }

  // Then check Supabase if user is signed in
  if (!userId || userId === "guest") return false;

  try {
    const { data, error } = await supabase
      .from("saved_articles")
      .select("path")
      .eq("user_id", userId)
      .eq("path", path)
      .maybeSingle();

    if (error) {
      return false;
    }
    return !!data;
  } catch {
    return false;
  }
}

export async function saveArticle(userId: string, article: ArticleRef): Promise<boolean> {
  const current = getLocalSaved(userId);
  if (!current.some((item) => item.path === article.path)) {
    const newItem: SavedArticle = {
      title: article.title,
      category: article.category,
      path: article.path,
      saved_at: new Date().toISOString(),
    };
    setLocalSaved(userId, [newItem, ...current]);
  }

  if (!userId || userId === "guest") return true;

  try {
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
      console.warn("Supabase save sync notice:", error);
    }
  } catch (err) {
    console.warn("Supabase network error:", err);
  }

  return true;
}

export async function unsaveArticle(userId: string, path: string): Promise<boolean> {
  const current = getLocalSaved(userId);
  const filtered = current.filter((item) => item.path !== path);
  setLocalSaved(userId, filtered);

  if (!userId || userId === "guest") return true;

  try {
    const { error } = await supabase
      .from("saved_articles")
      .delete()
      .eq("user_id", userId)
      .eq("path", path);
    if (error) {
      console.warn("Supabase unsave notice:", error);
    }
  } catch (err) {
    console.warn("Supabase network error:", err);
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
  const localList = getLocalSaved(userId);

  if (!userId || userId === "guest") {
    return localList;
  }

  try {
    const { data, error } = await supabase
      .from("saved_articles")
      .select("title, category, path, saved_at")
      .eq("user_id", userId)
      .order("saved_at", { ascending: false });

    if (error || !data) {
      return localList;
    }

    const remoteList = data as SavedArticle[];
    // Merge remote and local
    const map = new Map<string, SavedArticle>();
    for (const item of remoteList) map.set(item.path, item);
    for (const item of localList) {
      if (!map.has(item.path)) map.set(item.path, item);
    }
    const merged = Array.from(map.values()).sort(
      (a, b) => new Date(b.saved_at).getTime() - new Date(a.saved_at).getTime()
    );
    setLocalSaved(userId, merged);
    return merged;
  } catch {
    return localList;
  }
}
