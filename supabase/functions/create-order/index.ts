// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Restrict CORS to official domains and local development environments
const ALLOWED_ORIGINS = [
  "https://thepridetime.com",
  "https://www.thepridetime.com",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("Origin") || "";
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : "https://thepridetime.com";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };
}

// Amounts are in paise (₹1 = 100 paise), synced exactly with PremiumPage.tsx
const PLANS: Record<string, number> = {
  monthly: 29900,         // ₹299
  quarterly: 79900,       // ₹799
  annual: 299900,         // ₹2,999
  professional: 599900,   // ₹5,999
  executive: 1199900,     // ₹11,999
  // One-time digital products
  single_report: 9900,        // ₹99
  monthly_magazine: 19900,    // ₹199
  business_analysis: 29900,   // ₹299
  industry_report: 49900,     // ₹499
  annual_bundle: 99900,       // ₹999
  market_research: 149900,    // ₹1,499
};

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // 1. Make sure the caller is signed in
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Not signed in" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Validate the plan
    const { plan } = await req.json();
    const amount = PLANS[plan];
    if (!amount) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Create the Razorpay order
    const keyId = Deno.env.get("RAZORPAY_KEY_ID")!;
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;
    if (!keyId || !keySecret) {
      return new Response(JSON.stringify({ error: "Razorpay keys are not set in Secrets" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${keyId}:${keySecret}`),
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `${user.id.slice(0, 8)}_${Date.now()}`,
        notes: { user_id: user.id, plan },
      }),
    });

    const order = await rzpRes.json();
    if (!rzpRes.ok) {
      console.error("RAZORPAY_ERROR", rzpRes.status, JSON.stringify(order));
      return new Response(
        JSON.stringify({ error: `Razorpay: ${order?.error?.description ?? "rejected the order"}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Send what the browser needs to open the popup
    return new Response(
      JSON.stringify({
        order_id: order.id,
        key_id: keyId,
        amount: order.amount,
        currency: order.currency,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
