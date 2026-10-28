// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { notifyAdmin, premiumReceiptHtml, sendEmail } from "../_shared/notify.ts";

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
