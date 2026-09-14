const FINNHUB_KEY        = import.meta.env.VITE_FINNHUB_API_KEY;
const ALPHA_VANTAGE_KEY  = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const MARKETSTACK_KEY    = import.meta.env.VITE_MARKETSTACK_API_KEY;

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

async function finnhubForex(base: string) {
  const res = await fetch(
    `https://finnhub.io/api/v1/forex/rates?base=${base}&token=${FINNHUB_KEY}`
  );
  if (!res.ok) throw new Error(`Finnhub forex failed`);
  return res.json();
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

// ── 3. MARKETSTACK ─────────────────────────────────────────────
// EOD (end-of-day) data — this is the free tier's ceiling. Values
// reflect the PREVIOUS completed trading session's close, not the
// live intraday price. That's expected behavior, not a bug.
async function marketstackQuote(symbol: string) {
  const res = await fetch(
    `https://api.marketstack.com/v1/eod/latest?access_key=${MARKETSTACK_KEY}&symbols=${symbol}`
  );
  if (!res.ok) throw new Error(`Marketstack failed: ${symbol}`);
  const data = await res.json();
  const eod = data.data?.[0];
  if (!eod) throw new Error(`Marketstack no data: ${symbol}`);
  const changePct = ((eod.close - eod.open) / eod.open) * 100;
  return {
    price:     eod.close,
    changePct,
    changeAbs: eod.close - eod.open,
    open:      eod.open,
    high:      eod.high,
    low:       eod.low,
    volume:    eod.volume,
    date:      eod.date,
  };
}

async function marketstackBatch(symbols: string[]) {
  const joined = symbols.join(",");
  const res = await fetch(
    `https://api.marketstack.com/v1/eod/latest?access_key=${MARKETSTACK_KEY}&symbols=${joined}&limit=${symbols.length}`
  );
  if (!res.ok) throw new Error(`Marketstack batch failed`);
  const data = await res.json();
  return data.data ?? [];
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
    { name: "NIFTY 50", value: "24,678.90", change: "-0.34%", pts: "-84.21",  up: false },
    { name: "SENSEX",   value: "81,245.60", change: "-0.21%", pts: "-170.61", up: false },
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
  ],
};

// ── MAIN EXPORT ────────────────────────────────────────────────
export async function getQuotes() {

  const [
    spyR, qqqR, diaR, iwmR,
    btcR, ethR, solR,
    forexR,
    goldR, oilR,
    stocksR,

    niftyR, usdInrR,

    mstackR,

  ] = await Promise.allSettled([
    finnhubQuote("SPY"),
    finnhubQuote("QQQ"),
    finnhubQuote("DIA"),
    finnhubQuote("IWM"),
    finnhubQuote("BINANCE:BTCUSDT"),
    finnhubQuote("BINANCE:ETHUSDT"),
    finnhubQuote("BINANCE:SOLUSDT"),
    finnhubForex("USD"),
    finnhubQuote("GLD"),
    finnhubQuote("USO"),

    Promise.allSettled(
      STOCK_WATCHLIST.map((s) => finnhubQuote(s.symbol))
    ),

    // Alpha Vantage — Nifty 50 only. Sensex dropped: there is no
    // reliable free-tier Sensex-tracking symbol on Alpha Vantage,
    // and the previous "SETFNIF50.BSE * 1000" hack was actually a
    // Nifty ETF, not Sensex — it never matched. Sensex now uses
    // the fallback value until a proper Sensex data source is wired up.
    avQuote("NIFTYBEES.BSE"),
    avForex("USD", "INR"),

    // Marketstack — Indian stocks (EOD only, since Upstox is out)
    marketstackBatch(["RELIANCE.XNSE", "TCS.XNSE", "HDFCBANK.XNSE", "INFY.XNSE"]),
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

  // ── INDIAN INDICES (Nifty via Alpha Vantage; Sensex = fallback) ──
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

  // Sensex: no reliable free-tier proxy currently wired up.
  indianIndices.push({ ...FALLBACK.indianIndices[1], live: false, source: "fallback" });

  // ── INDIAN STOCKS (Marketstack EOD — Upstox removed) ────────
  const indianStockSymbols = [
    { name: "Reliance",  symbol: "RELIANCE.XNSE" },
    { name: "TCS",       symbol: "TCS.XNSE" },
    { name: "HDFC Bank", symbol: "HDFCBANK.XNSE" },
    { name: "Infosys",   symbol: "INFY.XNSE" },
  ];

  const mstackData: any[] = mstackR.status === "fulfilled" ? mstackR.value : [];

  const indianStocks: any[] = indianStockSymbols.map(({ name, symbol }, i) => {
    const ms = mstackData.find((d: any) => d.symbol === symbol);
    if (ms) {
      const changePct = ((ms.close - ms.open) / ms.open) * 100;
      return {
        name,
        value:  `₹${Number(ms.close).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`,
        change: `${changePct.toFixed(2)}%`,
        pts:    (ms.close - ms.open).toFixed(2),
        up:     changePct >= 0,
        live:   false, // EOD data — previous session's close, not live
        source: "Marketstack (EOD)",
      };
    }
    return { ...FALLBACK.indianStocks[i], live: false, source: "fallback" };
  });

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

  // ── FOREX (Alpha Vantage primary, Finnhub backup) ───────────
  const forex: any[] = [];

  if (usdInrR.status === "fulfilled") {
    forex.push({ pair: "USD/INR", value: usdInrR.value.toFixed(2), change: "—", up: true, live: true, source: "Alpha Vantage" });
  } else if (forexR.status === "fulfilled") {
    const inr = forexR.value?.quote?.INR;
    if (inr) forex.push({ pair: "USD/INR", value: Number(inr).toFixed(2), change: "—", up: true, live: true, source: "Finnhub" });
    else forex.push({ ...FALLBACK.forex[0], live: false, source: "fallback" });
  } else {
    forex.push({ ...FALLBACK.forex[0], live: false, source: "fallback" });
  }

  if (forexR.status === "fulfilled") {
    const q = forexR.value?.quote;
    if (q?.EUR) forex.push({ pair: "EUR/USD", value: (1 / Number(q.EUR)).toFixed(4), change: "—", up: true, live: true, source: "Finnhub" });
    if (q?.GBP) forex.push({ pair: "GBP/USD", value: (1 / Number(q.GBP)).toFixed(4), change: "—", up: true, live: true, source: "Finnhub" });
  } else {
    forex.push(...FALLBACK.forex.slice(1).map(f => ({ ...f, live: false, source: "fallback" })));
  }

  // ── COMMODITIES (Finnhub ETF proxies) ───────────────────────
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
}fv
