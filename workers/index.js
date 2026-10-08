// Cloudflare Worker: serverless proxy for Marketstack EOD quotes.
//
// - Keeps the API key on the server. Set MARKETSTACK_API_KEY as a Worker secret
//   (NOT a VITE_ variable, so it never ends up in the public JS bundle).
// - Caches successful responses for 6 hours with the Cache API, so Marketstack
//   is hit a few times a day regardless of traffic. (The Cache API only works on
//   a custom domain routed through Cloudflare, not on *.workers.dev.)
// - Only /api/* requests reach this Worker (see run_worker_first in
//   wrangler.jsonc). Everything else is served straight from the static assets.
//
// Called from the app as: /api/marketstack?symbols=TCS.XNSE,INFY.XNSE

const SYMBOL_RE = /^[A-Za-z0-9.\-]+$/;
const MAX_SYMBOLS = 10;
const EDGE_TTL_S = 6 * 60 * 60; // 6 hours

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/marketstack") {
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return marketstack(url, env, ctx);
    }

    if (url.pathname.startsWith("/api/")) return json({ error: "Not found" }, 404);

    // Safety net: anything else goes to the static assets / SPA.
    return env.ASSETS.fetch(request);
  },
};

async function marketstack(url, env, ctx) {
  const key = env.MARKETSTACK_API_KEY;
  if (!key) return json({ error: "MARKETSTACK_API_KEY is not configured" }, 500);

  const symbols = (url.searchParams.get("symbols") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (
    symbols.length === 0 ||
    symbols.length > MAX_SYMBOLS ||
    !symbols.every((s) => SYMBOL_RE.test(s))
  ) {
    return json({ error: "Invalid symbols" }, 400);
  }

  // Normalised cache key: same symbols in any order share one cache entry.
  const sorted = [...symbols].sort().join(",");
  const cacheKey = new Request(`${url.origin}/api/marketstack?symbols=${sorted}`);
  const cache = caches.default;

  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  let upstream;
  try {
    upstream = await fetch(
      `https://api.marketstack.com/v1/eod/latest?access_key=${encodeURIComponent(key)}` +
        `&symbols=${encodeURIComponent(symbols.join(","))}&limit=${symbols.length}`
    );
  } catch {
    return json({ error: "Upstream unreachable" }, 502);
  }

  const body = await upstream.text();

  // Only cache successful responses; never cache a 429 or other error.
  if (!upstream.ok) {
    return new Response(body, {
      status: upstream.status,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  }

  const response = new Response(body, {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": `public, max-age=300, s-maxage=${EDGE_TTL_S}`,
    },
  });
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
