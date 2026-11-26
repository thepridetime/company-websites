import { supabase } from "./supabase";

export type FeedbackCategory =
  | "general"
  | "editorial"
  | "corrections"
  | "partnerships"
  | "subscriptions"
  | "press"
  | "other";

export interface FeedbackSubmissionPayload {
  name?: string | null;
  email: string;
  category?: FeedbackCategory | string;
  subject: string;
  message: string;
  rating?: number | null;
  article_slug?: string | null;
  article_title?: string | null;
  page_url?: string | null;
  metadata?: Record<string, unknown>;
}

export interface FeedbackSubmissionRecord {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string | null;
  name: string | null;
  email: string;
  category: string;
  subject: string;
  message: string;
  rating: number | null;
  article_slug: string | null;
  article_title: string | null;
  page_url: string | null;
  status: "new" | "in_review" | "resolved" | "archived";
  admin_notes: string | null;
  metadata: Record<string, unknown>;
}

export interface FeedbackResult {
  success: boolean;
  data?: FeedbackSubmissionRecord;
  error?: string;
}

/**
 * Submit feedback or contact inquiry to Supabase feedback_submissions table
 */
export async function submitFeedback(payload: FeedbackSubmissionPayload): Promise<FeedbackResult> {
  try {
    if (!payload.email || !payload.email.trim()) {
      return { success: false, error: "Email address is required." };
    }
    if (!payload.message || !payload.message.trim()) {
      return { success: false, error: "Message content is required." };
    }

    // Check if user is currently authenticated
    const { data: { user } } = await supabase.auth.getUser();

    const insertPayload = {
      name: payload.name?.trim() || null,
      email: payload.email.trim().toLowerCase(),
      category: payload.category || "general",
      subject: payload.subject?.trim() || "General Inquiry",
      message: payload.message.trim(),
      rating: payload.rating ?? null,
      article_slug: payload.article_slug || null,
      article_title: payload.article_title || null,
      page_url: payload.page_url || (typeof window !== "undefined" ? window.location.href : null),
      user_id: user?.id || null,
      metadata: payload.metadata || {},
    };

    const { data, error } = await supabase
      .from("feedback_submissions")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error("Failed to submit inquiry to Supabase:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as FeedbackSubmissionRecord };
  } catch (err: any) {
    console.error("Unexpected error in submitFeedback:", err);
    return { success: false, error: err?.message || "Failed to submit inquiry. Please try again." };
  }
}

/**
 * Fetch feedback submissions submitted by the logged-in user
 */
export async function getUserFeedbackSubmissions(): Promise<FeedbackSubmissionRecord[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("feedback_submissions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch user feedback:", error);
      return [];
    }

    return (data || []) as FeedbackSubmissionRecord[];
  } catch (err) {
    console.error("Error fetching user feedback:", err);
    return [];
  }
}
