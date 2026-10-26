// Target path: supabase/functions/newsletter-notify/index.ts
// Saves a newsletter subscribe/unsubscribe and emails the signed-in user's registered address.
// The email address is read from the verified login token on the server, never from the browser.
//
// Secrets needed (Supabase dashboard > Edge Functions > Secrets):
//   RESEND_API_KEY      API key from resend.com
//   NOTIFY_FROM_EMAIL   e.g. "Pride Times <news@yourdomain.com>" (domain must be verified in Resend)
// SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are provided automatically.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Keep in sync with NEWSLETTER_CATALOG and EXTRA_SUBSCRIPTION_KEYS in src/lib/newsletterPreferences.ts
const NEWSLETTERS: Record<string, string> = {
  "daily-brief": "The Daily Brief",
  "markets-morning": "Markets Morning",
  "technology-weekly": "Technology Weekly",
  "billionaires-tracker": "Billionaires Tracker",
  "india-business-digest": "India Business Digest",
  "ceo-spotlight": "CEO Spotlight",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

  const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "not signed in" }, 401);

  const url = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  // Verify the caller and get their registered email from the server.
  const userClient = createClient(url, anonKey, { auth: { persistSession: false } });
  const { data: userData, error: userError } = await userClient.auth.getUser(token);
  const user = userData?.user;
  if (userError || !user?.email) return json({ error: "not signed in" }, 401);

  let body: { newsletter_key?: string; subscribed?: boolean };
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid request" }, 400);
  }
  const key = body.newsletter_key ?? "";
  const subscribed = body.subscribed === true;
  const name = NEWSLETTERS[key];
  if (!name || typeof body.subscribed !== "boolean") return json({ error: "unknown newsletter" }, 400);

  // Save the preference. The service role bypasses RLS, and the user id comes from the verified token.
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { error: saveError } = await admin.from("newsletter_subscriptions").upsert(
    { user_id: user.id, newsletter_key: key, subscribed, updated_at: new Date().toISOString() },
    { onConflict: "user_id,newsletter_key" }
  );
  if (saveError) {
    console.error("NEWSLETTER_SAVE_FAILED", saveError);
    return json({ error: "could not save" }, 500);
  }

  // Send the confirmation email.
  const subject = subscribed ? `You're subscribed to ${name}` : `You've unsubscribed from ${name}`;
  const text = subscribed
    ? `Hi,\n\nYou are now subscribed to ${name} on Pride Times. You can change this anytime in your account settings.\n\nIf you did not make this change, please sign in and review your settings, or contact support.`
    : `Hi,\n\nYou have unsubscribed from ${name} on Pride Times. You will no longer receive emails for this newsletter.\n\nIf you did not make this change, please sign in and review your settings, or contact support.`;

  let emailSent = false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: Deno.env.get("NOTIFY_FROM_EMAIL"),
        to: [user.email],
        subject,
        text,
      }),
    });
    emailSent = res.ok;
    if (!res.ok) console.error("NEWSLETTER_EMAIL_FAILED", res.status, await res.text());
  } catch (err) {
    console.error("NEWSLETTER_EMAIL_ERROR", err);
  }

  return json({ saved: true, subscribed, emailSent });
});
