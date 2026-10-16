// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const plan = order.notes?.plan === "annual" ? "annual" : "monthly";

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

    // Subscription window
    const start = new Date();
    const end = new Date(start);
    if (plan === "annual") end.setFullYear(end.getFullYear() + 1);
    else end.setMonth(end.getMonth() + 1);

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
    return json({ ok: true });
  } catch (e) {
    console.error("VERIFY_ERROR", String(e));
    return json({ error: String(e) }, 500);
  }
});