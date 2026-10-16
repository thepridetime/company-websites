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

// HMAC-SHA256 hex, used to check Razorpay's signature
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

    // 2. Check Razorpay's signature so nobody can fake a payment
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return json({ error: "Missing payment details" }, 400);
    }

    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;
    const expected = await hmacHex(keySecret, `${razorpay_order_id}|${razorpay_payment_id}`);
    if (expected !== razorpay_signature) {
      console.error("BAD_SIGNATURE", razorpay_payment_id);
      return json({ error: "Payment signature did not match" }, 400);
    }

    // 3. Mark the user as Premium (admin client, bypasses row rules)
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ASSUMPTION: your users live in a "profiles" table with an "id" matching
    // the auth user id and a "tier" column. Change these names if yours differ.
    const { error: updateError } = await admin
      .from("profiles")
      .update({ tier: "premium" })
      .eq("id", user.id);

    if (updateError) {
      console.error("PROFILE_UPDATE_FAILED", JSON.stringify(updateError));
      return json({ error: "Could not activate Premium: " + updateError.message }, 500);
    }

    console.log("PREMIUM_ACTIVATED", user.id, razorpay_payment_id);
    return json({ ok: true });
  } catch (e) {
    console.error("VERIFY_ERROR", String(e));
    return json({ error: String(e) }, 500);
  }
});