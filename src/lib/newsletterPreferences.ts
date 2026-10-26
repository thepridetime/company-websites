// Target path: src/lib/newsletterPreferences.ts
// Reads preferences directly from newsletter_subscriptions (RLS: own rows only).
// Changes go through the newsletter-notify edge function, which saves the row and emails the user.
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

/**
 * Subscribes or unsubscribes. The server saves the change and emails the user's registered address.
 * Returns true if the change was saved. Check the console for NEWSLETTER_EMAIL_NOT_SENT if the email failed.
 */
export async function setNewsletterSubscribed(
  _userId: string,
  key: string,
  subscribed: boolean
): Promise<boolean> {
  if (!VALID_KEYS.has(key)) {
    console.error("NEWSLETTER_UNKNOWN_KEY", key);
    return false;
  }
  const { data, error } = await supabase.functions.invoke("newsletter-notify", {
    body: { newsletter_key: key, subscribed },
  });
  if (error) {
    console.error("NEWSLETTER_SAVE_FAILED", error);
    return false;
  }
  if (data && data.emailSent === false) {
    console.warn("NEWSLETTER_EMAIL_NOT_SENT", key);
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
