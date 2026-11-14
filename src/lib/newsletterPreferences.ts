import { supabase } from "./supabase";

export type Newsletter = { key: string; name: string; freq: string };

export const NEWSLETTER_CATALOG: Newsletter[] = [
  { key: "daily-brief", name: "The Daily Brief", freq: "Every morning" },
  { key: "markets-morning", name: "Markets Morning", freq: "Weekdays 7am IST" },
  { key: "technology-weekly", name: "Technology Weekly", freq: "Every Monday" },
  { key: "billionaires-tracker", name: "Billionaires Tracker", freq: "Every Friday" },
  { key: "india-business-digest", name: "India Business Digest", freq: "Daily" },
];

/* Keys that can be subscribed to but are not shown in the notification settings list.
   "ceo-spotlight" is used by the CEO Spotlight page's newsletter box. */
const EXTRA_SUBSCRIPTION_KEYS = ["ceo-spotlight"];

const VALID_KEYS = new Set<string>([
  ...NEWSLETTER_CATALOG.map((n) => n.key),
  ...EXTRA_SUBSCRIPTION_KEYS,
]);

/** Map of newsletter key -> subscribed. Keys with no row default to false. */
export async function getNewsletterPreferences(userId: string): Promise<Record<string, boolean>> {
  const prefs: Record<string, boolean> = Object.fromEntries(
    [...VALID_KEYS].map((key) => [key, false])
  );
  try {
    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .select("newsletter_key, subscribed")
      .eq("user_id", userId);
    if (error) {
      console.warn("NEWSLETTER_FETCH_FAILED, using defaults", error);
      return prefs;
    }
    for (const row of data ?? []) {
      if (VALID_KEYS.has(row.newsletter_key)) prefs[row.newsletter_key] = row.subscribed;
    }
  } catch (err) {
    console.warn("NEWSLETTER_FETCH_EXCEPTION", err);
  }
  return prefs;
}

/**
 * Subscribes or unsubscribes. The server attempts to save the change and email the user.
 * If the edge function is offline/fails, it gracefully falls back to directly updating the database.
 */
export async function setNewsletterSubscribed(
  userId: string,
  key: string,
  subscribed: boolean
): Promise<boolean> {
  if (!VALID_KEYS.has(key)) {
    console.error("NEWSLETTER_UNKNOWN_KEY", key);
    return false;
  }

  // 1. Try edge function first
  try {
    const { data, error } = await supabase.functions.invoke("newsletter-notify", {
      body: { newsletter_key: key, subscribed },
    });
    if (!error) {
      if (data && data.emailSent === false) {
        console.warn("NEWSLETTER_EMAIL_NOT_SENT", key);
      }
      return true;
    }
    console.warn("NEWSLETTER_FUNCTION_FAILED, falling back to direct DB upsert:", error);
  } catch (err) {
    console.warn("NEWSLETTER_INVOKE_FAILED, falling back to direct DB upsert:", err);
  }

  // 2. Direct database fallback
  try {
    const { error: dbError } = await supabase.from("newsletter_subscriptions").upsert(
      {
        user_id: userId,
        newsletter_key: key,
        subscribed,
      },
      { onConflict: "user_id,newsletter_key" }
    );
    if (!dbError) return true;
    console.error("NEWSLETTER_DIRECT_DB_SAVE_FAILED", dbError);
  } catch (dbErr) {
    console.error("NEWSLETTER_DB_FALLBACK_EXCEPTION", dbErr);
  }

  return false;
}

/** Turns off every newsletter at once (unsubscribe-all). */
export async function unsubscribeAllNewsletters(userId: string): Promise<boolean> {
  const results = await Promise.all(
    NEWSLETTER_CATALOG.map((n) => setNewsletterSubscribed(userId, n.key, false))
  );
  return results.every(Boolean);
}
