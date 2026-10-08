const FINNHUB_KEY        = import.meta.env.VITE_FINNHUB_API_KEY;
const ALPHA_VANTAGE_KEY  = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

// ── 1. FINNHUB ─────────────────────────────────────────────────
async function finnhubQuote(symbol: string) {
  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
  );
  if (!res.ok) throw new Error(`Finnhub failed: ${symbol}`);
  const d = await res.json();
  if (!d || d.c === 0) throw new Error(`No data: ${symbol}`);
  return d;
}

// NOTE: Finnhub's /forex/rates endpoint is premium-only (returns 403 on the
// free plan), so forex now comes from Frankfurter: free, no API key, CORS-enabled.
async function fxRates(): Promise<{ INR?: number; EUR?: number; GBP?: number }> {
  const res = await fetch(
    "https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR,EUR,GBP"
  );
  if (!res.ok) throw new Error("FX rates failed");
  const data = await res.json();
  if (!data?.rates) throw new Error("FX rates: no data");
  return data.rates;
}

// ── 2. ALPHA VANTAGE ───────────────────────────────────────────
async function avQuote(symbol: string) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`
  );
  if (!res.ok) throw new Error(`AV failed: ${symbol}`);
  const data = await res.json();
  const q = data["Global Quote"];
  if (!q || !q["05. price"]) throw new Error(`AV no data: ${symbol}`);
  return {
    price:     parseFloat(q["05. price"]),
    changePct: parseFloat((q["10. change percent"] ?? q["09. % change"] ?? "0").replace("%", "")),
    changeAbs: parseFloat(q["09. change"] ?? "0"),
  };
}

async function avForex(from: string, to: string) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${ALPHA_VANTAGE_KEY}`
  );
  if (!res.ok) throw new Error(`AV forex failed`);
  const data = await res.json();
  const r = data["Realtime Currency Exchange Rate"];
  if (!r) throw new Error("AV forex no data");
  return parseFloat(r["5. Exchange Rate"]);
}

// ── STOCK WATCHLIST (Finnhub real-time quotes) ─────────────────
const STOCK_WATCHLIST: { symbol: string; name: string }[] = [
  { symbol: "AAPL",  name: "Apple" },
  { symbol: "MSFT",  name: "Microsoft" },
  { symbol: "GOOGL", name: "Alphabet" },
  { symbol: "AMZN",  name: "Amazon" },
  { symbol: "TSLA",  name: "Tesla" },
  { symbol: "NVDA",  name: "Nvidia" },
  { symbol: "META",  name: "Meta" },
  { symbol: "NFLX",  name: "Netflix" },
];

// ── ETF → INDEX SCALING ─────────────────────────────────────────
// Free-tier APIs don't expose raw index values, so we track the
// ETF that mirrors each index and scale its price back up. This
// is an approximation (ETF fees + tracking drift mean it will
// never match the index to the last decimal) but it's in the
// right ballpark — unlike using the raw ETF price directly.
const ETF_INDEX_MULTIPLIER: Record<string, number> = {
  "S&P 500":      10,   // SPY ≈ 1/10th of the S&P 500
  "DOW JONES":    100,  // DIA ≈ 1/100th of the Dow
  "RUSSELL 2000": 10,   // IWM ≈ 1/10th of the Russell 2000
  "NASDAQ":       1,    // QQQ tracks the Nasdaq-100, NOT the Nasdaq
                         // Composite — there is no clean multiplier
                         // between the two. Treat this value as
                         // "Nasdaq-100 (via QQQ)", not the Composite.
};

// ── FALLBACK DATA ──────────────────────────────────────────────
const FALLBACK = {
  stocks: [
    { name: "Apple",     value: "$232.15", change: "+0.62%", pts: "+1.43",  up: true  },
    { name: "Microsoft", value: "$421.30", change: "+0.35%", pts: "+1.47",  up: true  },
    { name: "Alphabet",  value: "$168.44", change: "-0.21%", pts: "-0.36",  up: false },
    { name: "Amazon",    value: "$186.90", change: "+0.88%", pts: "+1.63",  up: true  },
    { name: "Tesla",     value: "$248.50", change: "-1.12%", pts: "-2.82",  up: false },
    { name: "Nvidia",    value: "$134.75", change: "+2.14%", pts: "+2.82",  up: true  },
    { name: "Meta",      value: "$563.20", change: "+0.47%", pts: "+2.63",  up: true  },
    { name: "Netflix",   value: "$712.40", change: "-0.18%", pts: "-1.28",  up: false },
  ],
  usIndices: [
    { name: "S&P 500",      value: "5,892.31",  change: "+1.14%", pts: "+66.43",  up: true  },
    { name: "NASDAQ",       value: "19,245.78", change: "+1.56%", pts: "+296.12", up: true  },
    { name: "DOW JONES",    value: "42,318.45", change: "+0.82%", pts: "+343.89", up: true  },
    { name: "RUSSELL 2000", value: "2,134.56",  change: "+0.45%", pts: "+9.56",   up: true  },
  ],
  indianIndices: [
    { name: "NIFTY 50",   value: "24,678.90", change: "-0.34%", pts: "-84.21",  up: false },
    { name: "SENSEX",     value: "81,245.60", change: "-0.21%", pts: "-170.61", up: false },
    { name: "NIFTY BANK", value: "52,340.15", change: "+0.45%", pts: "+234.50", up: true  },
    { name: "NIFTY IT",   value: "38,920.30", change: "+1.12%", pts: "+431.20", up: true  },
  ],
  indianStocks: [
    { name: "Reliance",  value: "₹2,934.50", change: "+0.87%", up: true  },
    { name: "TCS",       value: "₹3,456.20", change: "+1.23%", up: true  },
    { name: "HDFC Bank", value: "₹1,678.90", change: "-0.34%", up: false },
    { name: "Infosys",   value: "₹1,567.30", change: "+0.92%", up: true  },
  ],
  crypto: [
    { name: "Bitcoin (BTC)",  value: "$67,234", change: "+3.45%", up: true },
    { name: "Ethereum (ETH)", value: "$3,456",  change: "+2.87%", up: true },
    { name: "Solana (SOL)",   value: "$167",    change: "+4.56%", up: true },
  ],
  forex: [
    { pair: "USD/INR", value: "83.45", change: "—", up: true },
    { pair: "EUR/USD", value: "1.0876", change: "—", up: true },
    { pair: "GBP/USD", value: "1.2734", change: "—", up: true },
  ],
  commodities: [
    { name: "Gold",      value: "$2,345.60", change: "+0.89%", up: true  },
    { name: "Crude Oil", value: "$78.45",    change: "-1.23%", up: false },
    { name: "Silver",    value: "$29.45",    change: "+0.45%", up: true  },
  ],
};

// ── MAIN FETCH (not exported: use getQuotes below) ─────────────
async function fetchQuotes() {

  const [
    spyR, qqqR, diaR, iwmR,
    btcR, ethR, solR,
    forexR,
    goldR, oilR,
    stocksR,

    niftyR, usdInrR,

  ] = await Promise.allSettled([
    finnhubQuote("SPY"),
    finnhubQuote("QQQ"),
    finnhubQuote("DIA"),
    finnhubQuote("IWM"),
    finnhubQuote("BINANCE:BTCUSDT"),
    finnhubQuote("BINANCE:ETHUSDT"),
    finnhubQuote("BINANCE:SOLUSDT"),
    fxRates(),
    finnhubQuote("GLD"),
    finnhubQuote("USO"),

    Promise.allSettled(
      STOCK_WATCHLIST.map((s) => finnhubQuote(s.symbol))
    ),

    // Alpha Vantage — Nifty 50 only. Sensex dropped from live fetching:
    // there is no reliable free-tier Sensex-tracking symbol on Alpha
    // Vantage, and the old "SETFNIF50.BSE * 1000" hack was actually a
    // Nifty ETF, not Sensex — it never matched. Sensex, Nifty Bank, and
    // Nifty IT below use fallback values until a proper source is wired up.
    avQuote("NIFTYBEES.BSE"),
    avForex("USD", "INR"),

  ]);

  // ── US INDICES (Finnhub + ETF scaling) ──────────────────────
  const usRaw = [
    { r: spyR, name: "S&P 500",      fb: FALLBACK.usIndices[0] },
    { r: qqqR, name: "NASDAQ",       fb: FALLBACK.usIndices[1] },
    { r: diaR, name: "DOW JONES",    fb: FALLBACK.usIndices[2] },
    { r: iwmR, name: "RUSSELL 2000", fb: FALLBACK.usIndices[3] },
  ];

  const usIndices = usRaw.map(({ r, name, fb }) => {
    if (r.status === "fulfilled") {
      const d = r.value;
      const multiplier = ETF_INDEX_MULTIPLIER[name] ?? 1;
      return {
        name,
        value:  (Number(d.c) * multiplier).toLocaleString("en-US", { maximumFractionDigits: 2 }),
        change: `${Number(d.dp).toFixed(2)}%`,
        pts:    (Number(d.d) * multiplier).toFixed(2),
        up:     Number(d.d) >= 0,
        live:   true,
        source: "Finnhub (ETF proxy)",
      };
    }
    return { ...fb, live: false, source: "fallback" };
  });

  // ── STOCKS (Finnhub real-time quotes) ───────────────────────
  const stocks: any[] = STOCK_WATCHLIST.map(({ symbol, name }, i) => {
    const fb = FALLBACK.stocks[i];
    if (stocksR.status !== "fulfilled") {
      return { ...fb, symbol, live: false, source: "fallback" };
    }
    const r = stocksR.value[i];
    if (r.status === "fulfilled") {
      const d = r.value;
      return {
        name,
        symbol,
        value:  `$${Number(d.c).toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
        change: `${Number(d.dp).toFixed(2)}%`,
        pts:    Number(d.d).toFixed(2),
        up:     Number(d.d) >= 0,
        live:   true,
        source: "Finnhub",
      };
    }
    return { ...fb, symbol, live: false, source: "fallback" };
  });

  // ── INDIAN INDICES ───────────────────────────────────────────
  // NIFTY 50: live via Alpha Vantage (NIFTYBEES ETF proxy).
  // SENSEX / NIFTY BANK / NIFTY IT: no reliable free-tier live source
  // wired up yet — these stay on fallback data. Kept in the array
  // (rather than removed) so anything indexing indianIndices[1..3]
  // doesn't break.
  const indianIndices: any[] = [];

  if (niftyR.status === "fulfilled") {
    const d = niftyR.value;
    indianIndices.push({
      name: "NIFTY 50",
      value:  (d.price * 100).toLocaleString("en-IN", { maximumFractionDigits: 2 }),
      change: `${d.changePct.toFixed(2)}%`,
      pts:    d.changeAbs.toFixed(2),
      up:     d.changePct >= 0,
      live:   true,
      source: "Alpha Vantage (NIFTYBEES ETF proxy)",
    });
  } else {
    indianIndices.push({ ...FALLBACK.indianIndices[0], live: false, source: "fallback" });
  }

  indianIndices.push({ ...FALLBACK.indianIndices[1], live: false, source: "fallback" }); // SENSEX
  indianIndices.push({ ...FALLBACK.indianIndices[2], live: false, source: "fallback" }); // NIFTY BANK
  indianIndices.push({ ...FALLBACK.indianIndices[3], live: false, source: "fallback" }); // NIFTY IT

  // ── INDIAN STOCKS ────────────────────────────────────────────
  // No live source wired up (Marketstack removed), so these use fallback values.
  // Add a new source here later if you want live NSE prices.
  const indianStocks: any[] = FALLBACK.indianStocks.map((f) => ({
    ...f,
    live: false,
    source: "fallback",
  }));

  // ── CRYPTO (Finnhub) ────────────────────────────────────────
  const cryptoRaw = [
    { r: btcR, name: "Bitcoin (BTC)",  fb: FALLBACK.crypto[0] },
    { r: ethR, name: "Ethereum (ETH)", fb: FALLBACK.crypto[1] },
    { r: solR, name: "Solana (SOL)",   fb: FALLBACK.crypto[2] },
  ];

  const crypto = cryptoRaw.map(({ r, name, fb }) => {
    if (r.status === "fulfilled") {
      const d = r.value;
      return {
        name,
        value:  `$${Number(d.c).toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
        change: `${Number(d.dp).toFixed(2)}%`,
        up:     Number(d.d) >= 0,
        live:   true,
        source: "Finnhub",
      };
    }
    return { ...fb, live: false, source: "fallback" };
  });

  // ── FOREX (USD/INR: Alpha Vantage, then Frankfurter; EUR & GBP: Frankfurter) ──
  const forex: any[] = [];
  const fx = forexR.status === "fulfilled" ? forexR.value : null;

  if (usdInrR.status === "fulfilled") {
    forex.push({ pair: "USD/INR", value: usdInrR.value.toFixed(2), change: "—", up: true, live: true, source: "Alpha Vantage" });
  } else if (fx?.INR) {
    forex.push({ pair: "USD/INR", value: Number(fx.INR).toFixed(2), change: "—", up: true, live: true, source: "Frankfurter" });
  } else {
    forex.push({ ...FALLBACK.forex[0], live: false, source: "fallback" });
  }

  if (fx?.EUR) forex.push({ pair: "EUR/USD", value: (1 / Number(fx.EUR)).toFixed(4), change: "—", up: true, live: true, source: "Frankfurter" });
  else forex.push({ ...FALLBACK.forex[1], live: false, source: "fallback" });

  if (fx?.GBP) forex.push({ pair: "GBP/USD", value: (1 / Number(fx.GBP)).toFixed(4), change: "—", up: true, live: true, source: "Frankfurter" });
  else forex.push({ ...FALLBACK.forex[2], live: false, source: "fallback" });

  // ── COMMODITIES (Finnhub ETF proxies + fallback) ────────────
  const commodities: any[] = [];

  if (goldR.status === "fulfilled") {
    const d = goldR.value;
    commodities.push({
      name: "Gold (GLD ETF)", value: `$${Number(d.c).toFixed(2)}`,
      change: `${Number(d.dp).toFixed(2)}%`, up: Number(d.d) >= 0,
      live: true, source: "Finnhub",
    });
  } else {
    commodities.push({ ...FALLBACK.commodities[0], live: false, source: "fallback" });
  }

  if (oilR.status === "fulfilled") {
    const d = oilR.value;
    commodities.push({
      name: "Crude Oil (USO)", value: `$${Number(d.c).toFixed(2)}`,
      change: `${Number(d.dp).toFixed(2)}%`, up: Number(d.d) >= 0,
      live: true, source: "Finnhub",
    });
  } else {
    commodities.push({ ...FALLBACK.commodities[1], live: false, source: "fallback" });
  }

  // Silver: no live source wired up — fallback only, kept so the
  // array length matches what other components expect.
  commodities.push({ ...FALLBACK.commodities[2], live: false, source: "fallback" });

  const indices = [...usIndices, ...indianIndices];

  return {
    indices,
    usIndices,
    indianIndices,
    indianStocks,
    stocks,
    crypto,
    forex,
    commodities,
    bonds: [],
  };
}

// ── PUBLIC API: shared cache + in-flight de-duplication ────────
// MarketsTicker, HomePage and MarketsPage all call getQuotes(). Without this,
// every page view fired the full set of API requests several times over, which
// used to cause a burst of duplicate API calls and rate-limit (429) errors.
type Quotes = Awaited<ReturnType<typeof fetchQuotes>>;
const QUOTES_TTL_MS = 5 * 60 * 1000;
let quotesCache: { at: number; data: Quotes } | null = null;
let quotesInflight: Promise<Quotes> | null = null;

export function getQuotes(): Promise<Quotes> {
  if (quotesCache && Date.now() - quotesCache.at < QUOTES_TTL_MS) {
    return Promise.resolve(quotesCache.data);
  }
  if (quotesInflight) return quotesInflight;

  quotesInflight = fetchQuotes()
    .then((data) => {
      quotesCache = { at: Date.now(), data };
      return data;
    })
    .finally(() => {
      quotesInflight = null;
    });

  return quotesInflight;
}
