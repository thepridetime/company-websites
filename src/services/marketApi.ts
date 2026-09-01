const FINNHUB_KEY        = import.meta.env.VITE_FINNHUB_API_KEY;
const ALPHA_VANTAGE_KEY  = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const MARKETSTACK_KEY    = import.meta.env.VITE_MARKETSTACK_API_KEY;
const INDIAN_API_KEY     = import.meta.env.VITE_INDIAN_MARKET_API_KEY;

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
// EOD data for Indian + Global stocks
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

// Fetch multiple Marketstack symbols in one call
async function marketstackBatch(symbols: string[]) {
  const joined = symbols.join(",");
  const res = await fetch(
    `https://api.marketstack.com/v1/eod/latest?access_key=${MARKETSTACK_KEY}&symbols=${joined}&limit=${symbols.length}`
  );
  if (!res.ok) throw new Error(`Marketstack batch failed`);
  const data = await res.json();
  return data.data ?? [];
}

// ── 4. UPSTOX (Indian API) ─────────────────────────────────────
// Upstox v2 API - LTP (Last Traded Price) for NSE instruments
async function upstoxLTP(instrumentKey: string) {
  const res = await fetch(
    `https://api.upstox.com/v2/market-quote/ltp?instrument_key=${instrumentKey}`,
    {
      headers: {
        "Authorization": `Bearer ${INDIAN_API_KEY}`,
        "Accept": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error(`Upstox failed: ${instrumentKey}`);
  const data = await res.json();
  return data.data;
}

// Upstox - Full market quote with OHLC
async function upstoxQuote(instrumentKey: string) {
  const res = await fetch(
    `https://api.upstox.com/v2/market-quote/quotes?instrument_key=${instrumentKey}`,
    {
      headers: {
        "Authorization": `Bearer ${INDIAN_API_KEY}`,
        "Accept": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error(`Upstox quote failed: ${instrumentKey}`);
  const data = await res.json();
  // Returns { data: { [instrumentKey]: { last_price, ohlc, net_change, ... } } }
  const quote = data.data?.[instrumentKey];
  if (!quote) throw new Error(`No Upstox data: ${instrumentKey}`);
  return quote;
}

// ── FALLBACK DATA ──────────────────────────────────────────────
const FALLBACK = {
  usIndices: [
    { name: "S&P 500",      value: "5,892.31",  change: "+1.14%", pts: "+66.43",  up: true  },
    { name: "NASDAQ",       value: "19,245.78", change: "+1.56%", pts: "+296.12", up: true  },
    { name: "DOW JONES",    value: "42,318.45", change: "+0.82%", pts: "+343.89", up: true  },
    { name: "RUSSELL 2000", value: "2,134.56",  change: "+0.45%", pts: "+9.56",   up: true  },
  ],
  indianIndices: [
    { name: "NIFTY 50", value: "24,678.90", change: "-0.34%", pts: "-84.21",  up: false },
    { name: "SENSEX",   value: "81,245.60", change: "-0.21%", pts: "-170.61", up: false },
    { name: "NIFTY BANK", value: "52,340.15", change: "+0.45%", pts: "+234.50", up: true },
    { name: "NIFTY IT",   value: "38,920.30", change: "+1.12%", pts: "+431.20", up: true },
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

// ── MAIN EXPORT ────────────────────────────────────────────────
export async function getQuotes() {

  // All 4 APIs fire in parallel
  const [
    // 1. FINNHUB — US Indices + Crypto + Commodities + Forex
    spyR, qqqR, diaR, iwmR,
    btcR, ethR, solR,
    forexR,
    goldR, oilR,

    // 2. ALPHA VANTAGE — Indian Indices + USD/INR
    niftyR, sensexR, usdInrR,

    // 3. MARKETSTACK — Indian + Global EOD batch
    mstackR,

    // 4. UPSTOX — Indian stocks live LTP
    relR, tcsR, hdfcR, infoR,

  ] = await Promise.allSettled([
    // Finnhub
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

    // Alpha Vantage
    avQuote("NIFTYBEES.BSE"),
    avQuote("SETFNIF50.BSE"),
    avForex("USD", "INR"),

    // Marketstack — top Indian stocks EOD batch
    marketstackBatch(["RELIANCE.XNSE", "TCS.XNSE", "HDFCBANK.XNSE", "INFY.XNSE", "WIPRO.XNSE"]),

    // Upstox — NSE instrument keys for top stocks
    upstoxQuote("NSE_EQ|INE002A01018"),   // Reliance
    upstoxQuote("NSE_EQ|INE467B01029"),   // TCS
    upstoxQuote("NSE_EQ|INE040A01034"),   // HDFC Bank
    upstoxQuote("NSE_EQ|INE009A01021"),   // Infosys
  ]);

  // ── US INDICES (Finnhub) ───────────────────────────────────
  const usRaw = [
    { r: spyR, name: "S&P 500",      fb: FALLBACK.usIndices[0] },
    { r: qqqR, name: "NASDAQ",       fb: FALLBACK.usIndices[1] },
    { r: diaR, name: "DOW JONES",    fb: FALLBACK.usIndices[2] },
    { r: iwmR, name: "RUSSELL 2000", fb: FALLBACK.usIndices[3] },
  ];

  const usIndices = usRaw.map(({ r, name, fb }) => {
    if (r.status === "fulfilled") {
      const d = r.value;
      return {
        name,
        value:  Number(d.c).toLocaleString("en-US", { maximumFractionDigits: 2 }),
        change: `${Number(d.dp).toFixed(2)}%`,
        pts:    Number(d.d).toFixed(2),
        up:     Number(d.d) >= 0,
        live:   true,
        source: "Finnhub",
      };
    }
    return { ...fb, live: false, source: "fallback" };
  });

  // ── INDIAN INDICES (Alpha Vantage primary, Marketstack backup) ──
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
      source: "Alpha Vantage",
    });
  } else {
    indianIndices.push({ ...FALLBACK.indianIndices[0], live: false, source: "fallback" });
  }

  if (sensexR.status === "fulfilled") {
    const d = sensexR.value;
    indianIndices.push({
      name: "SENSEX",
      value:  (d.price * 1000).toLocaleString("en-IN", { maximumFractionDigits: 2 }),
      change: `${d.changePct.toFixed(2)}%`,
      pts:    d.changeAbs.toFixed(2),
      up:     d.changePct >= 0,
      live:   true,
      source: "Alpha Vantage",
    });
  } else {
    indianIndices.push({ ...FALLBACK.indianIndices[1], live: false, source: "fallback" });
  }

  // ── INDIAN STOCKS (Upstox primary, Marketstack backup) ────
  const indianStocks: any[] = [];

  const upstoxRaw = [
    { r: relR,  name: "Reliance",  mstackSym: "RELIANCE.XNSE",  fb: FALLBACK.indianStocks[0] },
    { r: tcsR,  name: "TCS",       mstackSym: "TCS.XNSE",        fb: FALLBACK.indianStocks[1] },
    { r: hdfcR, name: "HDFC Bank", mstackSym: "HDFCBANK.XNSE",   fb: FALLBACK.indianStocks[2] },
    { r: infoR, name: "Infosys",   mstackSym: "INFY.XNSE",       fb: FALLBACK.indianStocks[3] },
  ];

  // Marketstack batch results
  const mstackData: any[] = mstackR.status === "fulfilled" ? mstackR.value : [];

  upstoxRaw.forEach(({ r, name, mstackSym, fb }) => {
    if (r.status === "fulfilled") {
      // Upstox live data
      const q = r.value;
      const changePct = q.net_change ?? 0;
      indianStocks.push({
        name,
        value:  `₹${Number(q.last_price).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`,
        change: `${Number(changePct).toFixed(2)}%`,
        up:     Number(changePct) >= 0,
        live:   true,
        source: "Upstox",
      });
    } else {
      // Try Marketstack as backup
      const ms = mstackData.find((d: any) => d.symbol === mstackSym);
      if (ms) {
        const changePct = ((ms.close - ms.open) / ms.open) * 100;
        indianStocks.push({
          name,
          value:  `₹${Number(ms.close).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`,
          change: `${changePct.toFixed(2)}%`,
          pts:    (ms.close - ms.open).toFixed(2),
          up:     changePct >= 0,
          live:   false,
          source: "Marketstack",
        });
      } else {
        // Final fallback
        indianStocks.push({ ...fb, live: false, source: "fallback" });
      }
    }
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

  // ── FOREX (Alpha Vantage + Finnhub) ────────────────────────
  const forex: any[] = [];

  if (usdInrR.status === "fulfilled") {
    forex.push({ pair: "USD/INR", value: usdInrR.value.toFixed(2), change: "—", up: true, live: true, source: "Alpha Vantage" });
  } else if (forexR.status === "fulfilled") {
    const inr = forexR.value?.quote?.INR;
    if (inr) forex.push({ pair: "USD/INR", value: Number(inr).toFixed(2), change: "—", up: true, live: true, source: "Finnhub" });
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

  // ── COMMODITIES (Finnhub) ───────────────────────────────────
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

  // Combined for MarketsTicker top bar
  const indices = [...usIndices, ...indianIndices];

  return {
    indices,
    usIndices,
    indianIndices,
    indianStocks,  
    crypto,
    forex,
    commodities,
    bonds: [],
  };
}