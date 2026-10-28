// Target path: supabase/functions/newsletter-notify/index.ts
// Saves a newsletter subscribe/unsubscribe, emails the signed-in user, and alerts the admin.
// The email address is read from the verified login token on the server, never from the browser.
//
// Secrets needed (Supabase dashboard > Edge Functions > Secrets): see _shared/notify.ts
// SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are provided automatically.
import { createClient } from "npm:@supabase/supabase-js@2";
import { notifyAdmin, newsletterEmailHtml, sendEmail } from "../_shared/notify.ts";

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

  // Confirmation email to the subscriber, and an alert to the admin. Neither can fail the request.
  const subject = subscribed ? `You're subscribed to ${name}` : `You've unsubscribed from ${name}`;
  const [userMail] = await Promise.all([
    sendEmail({
      to: user.email,
      subject,
      html: newsletterEmailHtml(name, subscribed),
    }),
    notifyAdmin(subscribed ? "newsletter_subscribe" : "newsletter_unsubscribe", {
      email: user.email,
      name: (user.user_metadata?.full_name as string) ?? undefined,
      user_id: user.id,
      newsletter: name,
    }),
  ]);

  return json({ saved: true, subscribed, emailSent: userMail.success });
});
