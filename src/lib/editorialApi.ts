// ============================================================
// THE PRIDE TIMES — EDITORIAL API SERVICE
// src/lib/editorialApi.ts
// Handles CRUD for articles, sections, authors, and media
// with transparent fallback to local seeds when database is empty
// ============================================================

import { supabase } from "./supabase";
import { specialArticles } from "../app/data/specialArticleData";

export interface KeyFigure {
  label: string;
  value: string;
}

export interface EditorialArticle {
  id: string;
  slug: string;
  title: string;
  subheadline: string;
  kicker: string;
  section_slug: string;
  author_id?: string;
  author_name: string;
  author_title: string;
  hero_image_url: string;
  image_caption?: string;
  image_credit?: string;
  content: string;
  key_figures: KeyFigure[];
  tags: string[];
  status: "draft" | "scheduled" | "published" | "archived";
  is_featured: boolean;
  is_breaking: boolean;
  is_lead_story: boolean;
  is_editors_pick: boolean;
  is_premium: boolean;
  read_time: string;
  published_at: string;
  updated_at: string;
}

export interface EditorialSection {
  id: string;
  slug: string;
  name: string;
  description?: string;
  display_order: number;
}

export interface EditorialAuthor {
  id: string;
  name: string;
  title: string;
  avatar_url?: string;
  bio?: string;
}

export type NewArticlePayload = Omit<EditorialArticle, "id" | "published_at" | "updated_at"> & {
  id?: string;
  published_at?: string;
};

export const DEFAULT_SECTIONS: EditorialSection[] = [
  { id: "s-1", slug: "world", name: "World & Geopolitics", display_order: 1 },
  { id: "s-2", slug: "business-news", name: "Business News", display_order: 2 },
  { id: "s-3", slug: "markets", name: "Markets & Finance", display_order: 3 },
  { id: "s-4", slug: "tech", name: "Technology & AI", display_order: 4 },
  { id: "s-5", slug: "manufacturing", name: "Manufacturing & Industry", display_order: 5 },
  { id: "s-6", slug: "healthcare", name: "Healthcare & Pharma", display_order: 6 },
  { id: "s-7", slug: "energy", name: "Energy & Commodities", display_order: 7 },
  { id: "s-8", slug: "sustainability", name: "Sustainability & ESG", display_order: 8 },
  { id: "s-9", slug: "leadership", name: "Leadership & Governance", display_order: 9 },
  { id: "s-10", slug: "mergers-acquisitions", name: "Deals & M&A", display_order: 10 },
  { id: "s-11", slug: "startups", name: "Startups & Venture Capital", display_order: 11 },
];

export const DEFAULT_AUTHORS: EditorialAuthor[] = [
  { id: "a-1", name: "The Pride Times Staff", title: "Editorial Bureau" },
  { id: "a-2", name: "Alexander Wright", title: "Senior Geopolitical Analyst" },
  { id: "a-3", name: "Priya Sharma", title: "Chief Financial Correspondent" },
  { id: "a-4", name: "Marcus Vance", title: "Technology & AI Bureau Chief" },
  { id: "a-5", name: "Elena Rostova", title: "Energy Transition Lead" },
];

/** Helper: Generate a URL-safe slug from title */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Helper: Calculate estimated read time from word count */
export function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/** Fetch published articles for any section */
export async function fetchSectionArticles(
  sectionSlug: string,
  limit = 20
): Promise<EditorialArticle[]> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("section_slug", sectionSlug)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data || data.length === 0) {
      return getLocalFallbackSectionArticles(sectionSlug);
    }

    return data as EditorialArticle[];
  } catch (err) {
    console.warn("fetchSectionArticles error, falling back to local seed:", err);
    return getLocalFallbackSectionArticles(sectionSlug);
  }
}

/** Fetch single article by slug */
export async function fetchArticleBySlug(slug: string): Promise<EditorialArticle | null> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      // Check local seed
      const local = getLocalFallbackArticle(slug);
      return local;
    }

    return data as EditorialArticle;
  } catch {
    return getLocalFallbackArticle(slug);
  }
}

/** Fetch all articles for admin newsroom list */
export async function listAllArticles(filters?: {
  section?: string;
  status?: string;
  search?: string;
}): Promise<EditorialArticle[]> {
  try {
    let query = supabase.from("articles").select("*").order("published_at", { ascending: false });

    if (filters?.section && filters.section !== "all") {
      query = query.eq("section_slug", filters.section);
    }
    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }
    if (filters?.search && filters.search.trim()) {
      query = query.ilike("title", `%${filters.search.trim()}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.warn("listAllArticles error:", error);
      return getLocalFallbackSectionArticles("world");
    }

    return (data ?? []) as EditorialArticle[];
  } catch (err) {
    console.warn("listAllArticles network error:", err);
    return getLocalFallbackSectionArticles("world");
  }
}

/** Create new news article */
export async function createArticle(
  payload: NewArticlePayload
): Promise<{ data: EditorialArticle | null; error: string | null }> {
  try {
    const slug = payload.slug || generateSlug(payload.title);
    const readTime = payload.read_time || calculateReadTime(payload.content);

    const record = {
      ...payload,
      slug,
      read_time: readTime,
      published_at: payload.published_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("articles")
      .insert(record)
      .select()
      .single();

    if (error) {
      console.error("CREATE_ARTICLE_FAILED", error);
      return { data: null, error: error.message };
    }

    return { data: data as EditorialArticle, error: null };
  } catch (err: any) {
    return { data: null, error: err.message || "Failed to create article." };
  }
}

/** Update existing article */
export async function updateArticle(
  id: string,
  updates: Partial<EditorialArticle>
): Promise<{ data: EditorialArticle | null; error: string | null }> {
  try {
    const payload = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("articles")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data as EditorialArticle, error: null };
  } catch (err: any) {
    return { data: null, error: err.message || "Failed to update article." };
  }
}

/** Delete article */
export async function deleteArticle(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete article." };
  }
}

/** Upload media to editorial storage bucket */
export async function uploadArticleImage(file: File): Promise<{ url: string | null; error: string | null }> {
  try {
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `editorial-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const path = `uploads/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from("editorial-media")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      // If bucket doesn't exist, provide clear error
      return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage.from("editorial-media").getPublicUrl(path);
    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || "Image upload failed" };
  }
}

/** Fetch sections list */
export async function fetchSections(): Promise<EditorialSection[]> {
  try {
    const { data, error } = await supabase
      .from("editorial_sections")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_SECTIONS;
    }
    return data as EditorialSection[];
  } catch {
    return DEFAULT_SECTIONS;
  }
}

/** Fetch authors list */
export async function fetchAuthors(): Promise<EditorialAuthor[]> {
  try {
    const { data, error } = await supabase
      .from("editorial_authors")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_AUTHORS;
    }
    return data as EditorialAuthor[];
  } catch {
    return DEFAULT_AUTHORS;
  }
}

// ── Local Fallback Helpers ─────────────────────────────────────
function getLocalFallbackSectionArticles(sectionSlug: string): EditorialArticle[] {
  if (sectionSlug === "world") {
    const worldSeeds = specialArticles.filter((a) => a.section === "World and Geopolitics");
    return worldSeeds.map((seed, idx) => ({
      id: `local-world-${idx}`,
      slug: generateSlug(seed.title),
      title: seed.title,
      subheadline: seed.dek || "",
      kicker: seed.category || "WORLD AND GEOPOLITICS",
      section_slug: "world",
      author_name: seed.author || "Sagar Kumar",
      author_title: "Senior Geopolitical Correspondent",
      hero_image_url: seed.image || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80",
      image_caption: "Global diplomatic summit and strategic dialogue.",
      image_credit: "The Pride Times / Reuters",
      content: seed.bodyHtml ? seed.bodyHtml.replace(/<[^>]+>/g, " ") : seed.dek || "",
      key_figures: seed.keyFacts || [
        { label: "Coverage", value: "Detailed editorial report" },
        { label: "Category", value: seed.category || "WORLD" },
      ],
      tags: ["World", "Geopolitics", "Diplomacy"],
      status: "published",
      is_featured: idx === 0,
      is_breaking: false,
      is_lead_story: idx === 0,
      is_editors_pick: idx > 0 && idx <= 3,
      is_premium: false,
      read_time: seed.readTime || "4 min read",
      published_at: seed.publishedAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  }

  return [];
}

function getLocalFallbackArticle(slug: string): EditorialArticle | null {
  const match = specialArticles.find((s) => generateSlug(s.title) === slug);
  if (!match) return null;

  return {
    id: `local-${slug}`,
    slug,
    title: match.title,
    subheadline: match.dek || "",
    kicker: match.category || "SPECIAL REPORT",
    section_slug: "world",
    author_name: match.author || "The Pride Times Staff",
    author_title: "Staff Reporter",
    hero_image_url: match.image || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80",
    image_caption: "Archival editorial reporting.",
    image_credit: "The Pride Times",
    content: match.bodyHtml ? match.bodyHtml.replace(/<[^>]+>/g, "\n\n") : match.dek || "",
    key_figures: match.keyFacts || [],
    tags: ["World"],
    status: "published",
    is_featured: false,
    is_breaking: false,
    is_lead_story: false,
    is_editors_pick: false,
    is_premium: false,
    read_time: match.readTime || "4 min read",
    published_at: match.publishedAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
