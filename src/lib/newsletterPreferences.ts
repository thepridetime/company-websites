// DRAFT - not wired in yet. Do not import until reviewed.
// Target path: src/lib/newsletterPreferences.ts
// Moves NEWSLETTER_CATALOG out of DashboardPage.tsx so both the dashboard and any
// future signup/settings page share one list. Backed by `newsletter_subscriptions`
// (PK user_id + newsletter_key), the same table DashboardPage already uses.
import { supabase } from "./supabase";

export type Newsletter = { key: string; name: string; freq: string };

export const NEWSLETTER_CATALOG: Newsletter[] = [
  { key: "daily-brief", name: "The Daily Brief", freq: "Every morning" },
  { key: "markets-morning", name: "Markets Morning", freq: "Weekdays 7am IST" },
  { key: "technology-weekly", name: "Technology Weekly", freq: "Every Monday" },
  { key: "billionaires-tracker", name: "Billionaires Tracker", freq: "Every Friday" },
  { key: "india-business-digest", name: "India Business Digest", freq: "Daily" },
];

const VALID_KEYS = new Set(NEWSLETTER_CATALOG.map((n) => n.key));

/** Map of newsletter key -> subscribed. Keys with no row default to false. */
export async function getNewsletterPreferences(userId: string): Promise<Record<string, boolean>> {
  const prefs: Record<string, boolean> = Object.fromEntries(
    NEWSLETTER_CATALOG.map((n) => [n.key, false])
  );
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .select("newsletter_key, subscribed")
    .eq("user_id", userId);
  if (error) {
    console.error("NEWSLETTER_FETCH_FAILED", error);
    throw error;
  }
  for (const row of data ?? []) {
    if (VALID_KEYS.has(row.newsletter_key)) prefs[row.newsletter_key] = row.subscribed;
  }
  return prefs;
}

export async function setNewsletterSubscribed(
  userId: string,
  key: string,
  subscribed: boolean
): Promise<boolean> {
  if (!VALID_KEYS.has(key)) {
    console.error("NEWSLETTER_UNKNOWN_KEY", key);
    return false;
  }
  const { error } = await supabase.from("newsletter_subscriptions").upsert(
    {
      user_id: userId,
      newsletter_key: key,
      subscribed,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,newsletter_key" }
  );
  if (error) {
    console.error("NEWSLETTER_SAVE_FAILED", error);
    return false;
  }
  return true;
}

/** Turns off every newsletter at once (unsubscribe-all). */
export async function unsubscribeAllNewsletters(userId: string): Promise<boolean> {
  const results = await Promise.all(
    NEWSLETTER_CATALOG.map((n) => setNewsletterSubscribed(userId, n.key, false))
  );
  return results.every(Boolean);
}
