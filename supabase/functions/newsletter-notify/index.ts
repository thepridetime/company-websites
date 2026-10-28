// Target path: supabase/functions/newsletter-notify/index.ts
// Saves a newsletter subscribe/unsubscribe, emails the signed-in user, and alerts the admin.
// The email address is read from the verified login token on the server, never from the browser.
//
// Secrets needed (Supabase dashboard > Edge Functions > Secrets): see the SMTP section below
// SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are provided automatically.
import { createClient } from "npm:@supabase/supabase-js@2";

// ---- Shared email code (inlined so this function deploys on its own) ----
// Credentials come from Supabase Edge Function Secrets only.
const SMTP_HOST = Deno.env.get("SMTP_HOST") ?? "";
const SMTP_PORT = parseInt(Deno.env.get("SMTP_PORT") ?? "465");
const SMTP_USER = Deno.env.get("SMTP_USER") ?? "";
const SMTP_PASS = Deno.env.get("SMTP_PASS") ?? "";
const FROM_NAME = Deno.env.get("SMTP_FROM_NAME") ?? "The Pride Times";
const FROM_EMAIL = Deno.env.get("SMTP_FROM_EMAIL") ?? SMTP_USER;
const ADMIN_EMAIL = Deno.env.get("ADMIN_NOTIFY_EMAIL") ?? "";

export type SendResult = { success: boolean; error?: string };

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripTags(html: string): string {
  return html.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function istNow(): string {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
}

/** Sends one HTML email through SMTP. Never throws. */
export async function sendEmail(opts: { to: string; toName?: string; subject: string; html: string }): Promise<SendResult> {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP_NOT_CONFIGURED");
    return { success: false, error: "SMTP secrets are not set" };
  }
  let client: any;
  try {
    const { SMTPClient } = await import("https://deno.land/x/denomailer@1.6.0/mod.ts");
    client = new SMTPClient({
      connection: {
        hostname: SMTP_HOST,
        port: SMTP_PORT,
        tls: SMTP_PORT === 465,
        auth: { username: SMTP_USER, password: SMTP_PASS },
      },
    });
    await client.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: opts.toName ? `${opts.toName} <${opts.to}>` : opts.to,
      subject: opts.subject,
      content: stripTags(opts.html),
      html: opts.html,
    });
    return { success: true };
  } catch (err) {
    console.error("SMTP_SEND_FAILED", opts.to, err);
    return { success: false, error: String(err) };
  } finally {
    try { await client?.close(); } catch { /* ignore */ }
  }
}

/* ------------------------------------------------------------------
   Admin alerts
   ------------------------------------------------------------------ */

export type AdminEvent = "sign_in" | "newsletter_subscribe" | "newsletter_unsubscribe" | "premium_purchase";

const EVENT_TITLES: Record<AdminEvent, string> = {
  sign_in: "User signed in",
  newsletter_subscribe: "New newsletter subscription",
  newsletter_unsubscribe: "Newsletter unsubscribe",
  premium_purchase: "Premium purchase",
};

const LABELS: Record<string, string> = {
  email: "Email",
  name: "Name",
  user_id: "User ID",
  newsletter: "Newsletter",
  plan: "Plan / product",
  amount: "Amount (INR)",
  payment_id: "Payment ID",
  order_id: "Order ID",
  provider: "Sign-in method",
};

/** Sends an alert to ADMIN_NOTIFY_EMAIL describing one event. Never throws. */
export async function notifyAdmin(event: AdminEvent, details: Record<string, string | number | undefined>): Promise<SendResult> {
  if (!ADMIN_EMAIL) {
    console.warn("ADMIN_NOTIFY_EMAIL not set, admin alert skipped", event);
    return { success: false, error: "ADMIN_NOTIFY_EMAIL is not set" };
  }
  const rows = Object.entries(details)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) =>
      `<tr><td style="padding:10px 14px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #e5e7eb">${escapeHtml(LABELS[k] ?? k)}</td>` +
      `<td style="padding:10px 14px;font-size:14px;color:#111827;border-bottom:1px solid #e5e7eb">${escapeHtml(v)}</td></tr>`
    )
    .join("");

  const title = EVENT_TITLES[event];
  const html = `<!DOCTYPE html><html><body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-top:4px solid #dc2626">
    <div style="padding:24px 28px;border-bottom:1px solid #e5e7eb">
      <div style="font-size:11px;letter-spacing:2px;color:#dc2626;font-weight:700;text-transform:uppercase">The Pride Times · Admin alert</div>
      <div style="font-size:20px;color:#111827;font-weight:700;margin-top:6px">${escapeHtml(title)}</div>
      <div style="font-size:12px;color:#6b7280;margin-top:4px">${escapeHtml(istNow())} (IST)</div>
    </div>
    <table style="width:100%;border-collapse:collapse">${rows}</table>
  </div></body></html>`;

  return sendEmail({ to: ADMIN_EMAIL, subject: `[Pride Times] ${title}`, html });
}

/* ------------------------------------------------------------------
   Customer emails
   ------------------------------------------------------------------ */

function userShell(heading: string, bodyHtml: string): string {
  return `<!DOCTYPE html><html><body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-top:4px solid #dc2626">
    <div style="padding:24px 28px;border-bottom:1px solid #e5e7eb">
      <div style="font-size:11px;letter-spacing:2px;color:#dc2626;font-weight:700;text-transform:uppercase">The Pride Times</div>
      <div style="font-size:20px;color:#111827;font-weight:700;margin-top:6px">${escapeHtml(heading)}</div>
    </div>
    <div style="padding:24px 28px;font-size:14px;line-height:1.6;color:#374151">${bodyHtml}</div>
    <div style="padding:16px 28px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af">
      If you did not make this change, please sign in and review your account, or reply to this email.
    </div>
  </div></body></html>`;
}

export function newsletterEmailHtml(name: string, subscribed: boolean): string {
  const body = subscribed
    ? `<p>You are now subscribed to <strong>${escapeHtml(name)}</strong>.</p><p>You can change this anytime in your account settings.</p>`
    : `<p>You have unsubscribed from <strong>${escapeHtml(name)}</strong>. You will no longer receive emails for this newsletter.</p>`;
  return userShell(subscribed ? `You're subscribed to ${name}` : `You've unsubscribed from ${name}`, body);
}

export function premiumReceiptHtml(opts: { plan: string; amount: number; paymentId: string; validUntil?: string }): string {
  const rupees = (opts.amount / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 });
  const until = opts.validUntil
    ? `<p>Your access is valid until <strong>${escapeHtml(new Date(opts.validUntil).toLocaleDateString("en-IN", { dateStyle: "medium" }))}</strong>.</p>`
    : "";
  const body = `<p>Thank you for your purchase. Your payment has been received.</p>
    <p><strong>Plan / product:</strong> ${escapeHtml(opts.plan)}<br/>
    <strong>Amount paid:</strong> ₹${escapeHtml(rupees)}<br/>
    <strong>Payment ID:</strong> ${escapeHtml(opts.paymentId)}</p>${until}
    <p>Keep this email as your receipt.</p>`;
  return userShell("Thank you for your purchase", body);
}



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
