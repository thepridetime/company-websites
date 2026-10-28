// Target path: supabase/functions/notify-admin/index.ts
// Sends the admin "user signed in" alert. The user is taken from the verified login token,
// so the browser cannot make up an email address or user id.
import { createClient } from "npm:@supabase/supabase-js@2";
import { notifyAdmin } from "../_shared/notify.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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

  const client = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    auth: { persistSession: false },
  });
  const { data, error } = await client.auth.getUser(token);
  const user = data?.user;
  if (error || !user) return json({ error: "not signed in" }, 401);

  const result = await notifyAdmin("sign_in", {
    email: user.email,
    name: (user.user_metadata?.full_name as string) ?? (user.user_metadata?.name as string),
    user_id: user.id,
    provider: user.app_metadata?.provider ?? "email",
  });

  return json({ ok: true, emailSent: result.success });
});
