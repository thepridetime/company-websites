// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function hmacHex(secret: string, message: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Admin alert + customer receipt. Never throws, so a failed email cannot undo a payment.
async function sendPurchaseEmails(opts: {
  email?: string; name?: string; userId: string; plan: string;
  amount: number; paymentId: string; orderId: string; validUntil?: string;
}) {
  await notifyAdmin("premium_purchase", {
    email: opts.email,
    name: opts.name,
    user_id: opts.userId,
    plan: opts.plan,
    amount: (opts.amount / 100).toFixed(2),
    payment_id: opts.paymentId,
    order_id: opts.orderId,
  });
  if (opts.email) {
    await sendEmail({
      to: opts.email,
      toName: opts.name,
      subject: "Your Pride Times purchase",
      html: premiumReceiptHtml({
        plan: opts.plan, amount: opts.amount, paymentId: opts.paymentId, validUntil: opts.validUntil,
      }),
    });
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // 1. Who is calling?
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } }
    );
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return json({ error: "Not signed in" }, 401);

    // 2. Check Razorpay's signature
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return json({ error: "Missing payment details" }, 400);
    }

    const keyId = Deno.env.get("RAZORPAY_KEY_ID")!;
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;
    const expected = await hmacHex(keySecret, `${razorpay_order_id}|${razorpay_payment_id}`);
    if (expected !== razorpay_signature) {
      console.error("BAD_SIGNATURE", razorpay_payment_id);
      return json({ error: "Payment signature did not match" }, 400);
    }

    // 3. Ask Razorpay which plan this order was for, and who owns it
    const orderRes = await fetch(`https://api.razorpay.com/v1/orders/${razorpay_order_id}`, {
      headers: { Authorization: "Basic " + btoa(`${keyId}:${keySecret}`) },
    });
    const order = await orderRes.json();
    if (!orderRes.ok) {
      console.error("ORDER_LOOKUP_FAILED", JSON.stringify(order));
      return json({ error: "Could not read the order from Razorpay" }, 502);
    }
    if (order.notes?.user_id !== user.id) {
      console.error("WRONG_USER", user.id, order.notes?.user_id);
      return json({ error: "This payment belongs to another account" }, 403);
    }
    const PLAN_IDS = ["monthly", "quarterly", "annual", "professional", "executive"];
    const PRODUCT_IDS = [
      "single_report", "business_analysis", "monthly_magazine",
      "industry_report", "annual_bundle", "market_research",
    ];
    const item = order.notes?.plan;
    const isProduct = PRODUCT_IDS.includes(item);
    const plan = isProduct ? item : PLAN_IDS.includes(item) ? item : "monthly";

    // 4. Database work with the admin client
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Already processed? (the browser may retry)
    const { data: already } = await admin
      .from("payments")
      .select("id")
      .eq("razorpay_payment_id", razorpay_payment_id)
      .maybeSingle();
    if (already) return json({ ok: true, already: true });

    // One-time product: record the purchase only, no subscription
    if (isProduct) {
      const { error: prodPayError } = await admin.from("payments").insert({
        user_id: user.id,
        plan, // holds the product id
        razorpay_order_id,
        razorpay_payment_id,
        amount: order.amount,
        status: "paid",
      });
      if (prodPayError) {
        console.error("PRODUCT_PAYMENT_FAILED", JSON.stringify(prodPayError));
        return json({ error: "Could not record the purchase: " + prodPayError.message }, 500);
      }
      console.log("PRODUCT_PURCHASED", user.id, plan, razorpay_payment_id);
      await sendPurchaseEmails({
        email: user.email, name: user.user_metadata?.full_name, userId: user.id, plan,
        amount: order.amount, paymentId: razorpay_payment_id, orderId: razorpay_order_id,
      });
      return json({ ok: true, product: plan });
    }

    // Subscription window
    const start = new Date();
    const end = new Date(start);
    if (plan === "monthly") end.setMonth(end.getMonth() + 1);
    else if (plan === "quarterly") end.setMonth(end.getMonth() + 3);
    else end.setFullYear(end.getFullYear() + 1); // annual, professional, executive

    const subRow = {
      user_id: user.id,
      plan,
      status: "active", // ASSUMPTION: the site treats status "active" as Premium
      start_date: start.toISOString(),
      end_date: end.toISOString(),
      razorpay_payment_id,
    };

    // Update the user's latest subscription if there is one (e.g. a trial), else create one
    const { data: existingSub } = await admin
      .from("subscriptions")
      .select("id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error: subError } = existingSub
      ? await admin.from("subscriptions").update(subRow).eq("id", existingSub.id)
      : await admin.from("subscriptions").insert(subRow);

    if (subError) {
      console.error("SUBSCRIPTION_FAILED", JSON.stringify(subError));
      return json({ error: "Could not activate Premium: " + subError.message }, 500);
    }

    // Record the payment (a failure here should not undo Premium)
    const { error: payError } = await admin.from("payments").insert({
      user_id: user.id,
      plan,
      razorpay_order_id,
      razorpay_payment_id,
      amount: order.amount,
      status: "paid",
    });
    if (payError) console.error("PAYMENT_INSERT_FAILED", JSON.stringify(payError));

    console.log("PREMIUM_ACTIVATED", user.id, plan, razorpay_payment_id);
    await sendPurchaseEmails({
      email: user.email, name: user.user_metadata?.full_name, userId: user.id, plan,
      amount: order.amount, paymentId: razorpay_payment_id, orderId: razorpay_order_id,
      validUntil: end.toISOString(),
    });
    return json({ ok: true });
  } catch (e) {
    console.error("VERIFY_ERROR", String(e));
    return json({ error: String(e) }, 500);
  }
});
