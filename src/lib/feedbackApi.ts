// ============================================================
// THE PRIDE TIMES — FEEDBACK & INQUIRIES API SERVICE
// src/lib/feedbackApi.ts
// Handles submissions and management of reader feedback,
// story pitches, corrections, and general contact inquiries.
// ============================================================

import { supabase } from "./supabase";

export interface FeedbackSubmissionPayload {
  name?: string;
  email: string;
  category?: string; // 'general', 'editorial_pitch', 'correction', 'advertising', 'subscription', 'press', 'bug', 'article_feedback'
  subject: string;
  message: string;
  rating?: number | null;
  article_slug?: string;
  article_title?: string;
  page_url?: string;
  metadata?: Record<string, any>;
}

export interface FeedbackRecord {
  id: string;
  created_at: string;
  updated_at: string;
  user_id?: string | null;
  name?: string | null;
  email: string;
  category: string;
  subject: string;
  message: string;
  rating?: number | null;
  article_slug?: string | null;
  article_title?: string | null;
  page_url?: string | null;
  status: "new" | "in_review" | "resolved" | "archived";
  admin_notes?: string | null;
  metadata?: Record<string, any>;
}

/**
 * Submits feedback or a contact inquiry to Supabase.
 * Automatically attaches authenticated user id if present in the active session.
 */
export async function submitFeedback(
  payload: FeedbackSubmissionPayload
): Promise<{ success: boolean; data?: FeedbackRecord; error?: string }> {
  try {
    // 1. Check for logged in user session
    let userId: string | null = null;
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      userId = sessionData?.session?.user?.id ?? null;
    } catch {
      // Continue anonymously
    }

    const insertData = {
      user_id: userId,
      name: payload.name?.trim() || null,
      email: payload.email.trim(),
      category: payload.category || "general",
      subject: payload.subject.trim(),
      message: payload.message.trim(),
      rating: payload.rating ?? null,
      article_slug: payload.article_slug || null,
      article_title: payload.article_title || null,
      page_url: payload.page_url || (typeof window !== "undefined" ? window.location.href : null),
      status: "new",
      metadata: payload.metadata || {},
    };

    const { data, error } = await supabase
      .from("feedback_submissions")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("[FeedbackAPI] Submission failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as FeedbackRecord };
  } catch (err: any) {
    console.error("[FeedbackAPI] Unexpected submission error:", err);
    return { success: false, error: err?.message || "Failed to submit feedback" };
  }
}

/**
 * Lists feedback submissions for newsroom or admin dashboard.
 */
export async function listFeedback(options?: {
  category?: string;
  status?: string;
  limit?: number;
}): Promise<{ success: boolean; data: FeedbackRecord[]; error?: string }> {
  try {
    let query = supabase
      .from("feedback_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (options?.category && options.category !== "all") {
      query = query.eq("category", options.category);
    }

    if (options?.status && options.status !== "all") {
      query = query.eq("status", options.status);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    } else {
      query = query.limit(100);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[FeedbackAPI] Failed to fetch feedback list:", error);
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: (data as FeedbackRecord[]) || [] };
  } catch (err: any) {
    console.error("[FeedbackAPI] Unexpected error fetching feedback:", err);
    return { success: false, data: [], error: err?.message || "Error fetching records" };
  }
}

/**
 * Updates status and administrative triage notes for a feedback submission.
 */
export async function updateFeedbackStatus(
  id: string,
  status: "new" | "in_review" | "resolved" | "archived",
  adminNotes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const updatePayload: Record<string, any> = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (adminNotes !== undefined) {
      updatePayload.admin_notes = adminNotes;
    }

    const { error } = await supabase
      .from("feedback_submissions")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      console.error("[FeedbackAPI] Failed to update status:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[FeedbackAPI] Unexpected error updating status:", err);
    return { success: false, error: err?.message || "Update failed" };
  }
}
