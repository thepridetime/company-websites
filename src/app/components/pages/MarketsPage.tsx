import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getQuotes } from "../../../services/marketApi";
import { PrideTimesAd } from "../AdSenseSlots";

interface TickerCard {
  symbol: string;
  value: string;
  change: number;
}

function parseChange(value: unknown): number | null {
  const parsed = Number.parseFloat(String(value ?? "").replace("%", ""));
  return Number.isFinite(parsed) ? parsed : null;
}

/* Builds /markets?tab=<Tab> so MarketsPage opens the matching tab. */
const marketTab = (tab: string) => `/markets?tab=${encodeURIComponent(tab)}`;

/* Bloomberg-style mega-menu columns for "Top Securities".
   All paths point at routes that already exist in App.tsx. */
const megaMenuColumns = [
  {
    title: "Markets",
    links: [
      { label: "Stocks", path: marketTab("Stocks") },
      { label: "Indices", path: marketTab("Indices") },
      { label: "Commodities", path: marketTab("Commodities") },
      { label: "Forex", path: marketTab("Forex") },
      { label: "Crypto", path: marketTab("Crypto") },
      { label: "Mutual Funds", path: marketTab("Mutual Funds") },
      { label: "ETFs", path: marketTab("ETFs") },
      { label: "Government Bonds", path: marketTab("Government Bonds") },
      { label: "Global Markets", path: marketTab("Global Markets") },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Technology", path: "/technology" },
      { label: "Cybersecurity", path: "/cybersecurity" },
      { label: "Energy", path: "/energy" },
      { label: "Healthcare", path: "/healthcare" },
      { label: "Manufacturing", path: "/manufacturing" },
      { label: "Smart Cities", path: "/smart-cities" },
      { label: "Supply Chain", path: "/supply-chain" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Business News", path: "/business-news" },
      { label: "International Business", path: "/international-news" },
      { label: "Startup Success", path: "/startup-success" },
      { label: "CEO Spotlight", path: "/ceospotlight" },
      { label: "Magazines", path: "/magazine" },
      { label: "Innovation", path: "/innovation" },
      { label: "White House Watch", path: "/white-house-watch" },
      { label: "World & Geopolitics", path: "/world" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about-us" },
      { label: "Advertise", path: "/advertise" },
      { label: "Careers", path: "/careers" },
      { label: "Contact Us", path: "/contact" },
      { label: "Press Room", path: "/press-room" },
    ],
  },
];

export function MarketsTicker() {
  const [cards, setCards] = useState<TickerCard[]>([]);
  const [showSecurities, setShowSecurities] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getQuotes();

        // Map real API data into Bloomberg-style cards.
        // No hardcoded values — everything comes from tickerData.
        const tickerData: (TickerCard | null)[] = [
          ...data.usIndices.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...data.stocks.map((item: any) => ({
            symbol: item.symbol ?? item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...data.crypto.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...data.commodities.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...data.indianIndices.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),
        ].filter(
          (item): item is TickerCard =>
            item !== null && item.change !== null
        );

        setCards(tickerData);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();

    const interval = setInterval(loadData, 60000);

    return () => clearInterval(interval);
  }, []);

  // Close the mega-menu after a longer pause than the simple nav dropdowns.
  useEffect(() => {
    if (!showSecurities) return;

    const timer = setTimeout(
      () => setShowSecurities(false),
      9000
    );

    return () => clearTimeout(timer);
  }, [showSecurities]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = trackRef.current;

    if (!el) return;

    const amount = (172 + 16) * 2;
    const halfway = el.scrollWidth / 2;

    offsetRef.current +=
      direction === "left" ? -amount : amount;

    if (offsetRef.current < 0) {
      offsetRef.current += halfway;
    }

    if (offsetRef.current >= halfway) {
      offsetRef.current -= halfway;
    }

    el.style.transition = "transform 0.4s ease";
    el.style.transform = `translateX(-${offsetRef.current}px)`;

    window.setTimeout(() => {
      if (el) {
        el.style.transition = "none";
      }
    }, 400);
  };

  // ── Continuous auto-scroll (Bloomberg-style moving ticker) ──
  useEffect(() => {
    if (cards.length === 0) return;

    const speed = 0.5;

    const step = () => {
      const el = trackRef.current;

      if (el && !isPausedRef.current) {
        const halfway = el.scrollWidth / 2;

        offsetRef.current += speed;

        if (offsetRef.current >= halfway) {
          offsetRef.current -= halfway;
        }

        el.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [cards]);

  const pauseAutoScroll = () => {
    isPausedRef.current = true;
  };

  const resumeAutoScroll = () => {
    isPausedRef.current = false;
  };

  return (
    <div className="pt-securities-bar w-full relative">
      <div className="pt-container flex items-stretch">

        {/* Top Securities — Bloomberg-style mega-menu trigger */}

        <div className="relative flex-shrink-0 flex items-center">
          <button
            type="button"
            onClick={() => setShowSecurities(!showSecurities)}
            aria-label="Top Securities menu"
            aria-expanded={showSecurities}
            style={{
              width: "95px",
              height: "40px",
              backgroundColor: "#ffffff",
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              padding: "0",
              margin: "0",
              color: "#000000",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "1",
              fontFamily: "Arial, Helvetica, sans-serif",
              cursor: "pointer",
              flexShrink: 0,
              boxSizing: "border-box",
            }}
          >
            <span>Menu</span>

            <span
              style={{
                width: 0,
                height: 0,
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: "5px solid #000000",
                display: "inline-block",
                marginTop: "2px",
                transform: showSecurities
                  ? "rotate(180deg)"
                  : "none",
                transition: "transform 0.15s ease",
              }}
            />
          </button>
        </div>

        {/* Continuously auto-scrolling market cards */}

        <div
          className="relative flex items-center flex-1 min-w-0 pl-3 gap-2"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
        >
          <button
            className="pt-securities-scroll-arrow hidden sm:flex items-center justify-center"
            onClick={() => {
              pauseAutoScroll();
              scrollByAmount("left");
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            className="overflow-hidden py-2 flex-1"
            onTouchStart={pauseAutoScroll}
            onTouchEnd={resumeAutoScroll}
          >
            <div
              ref={trackRef}
              className="flex items-center gap-4 w-max will-change-transform"
            >
              {[...cards, ...cards].map((card, i) => (
                <div
                  key={`${card.symbol}-${i}`}
                  className="pt-market-card flex items-center gap-2 flex-shrink-0"
                >
                  <span className="text-xs text-gray-400 font-medium truncate">
                    {card.symbol}
                  </span>

                  <span className="text-sm font-semibold">
                    {card.value}
                  </span>

                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      card.change >= 0
                        ? "pt-market-card-positive"
                        : "pt-market-card-negative"
                    }`}
                  >
                    {card.change >= 0 ? (
                      <TrendingUp size={11} />
                    ) : (
                      <TrendingDown size={11} />
                    )}

                    {card.change >= 0 ? "+" : ""}
                    {card.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="pt-securities-scroll-arrow hidden sm:flex items-center justify-center"
            onClick={() => {
              pauseAutoScroll();
              scrollByAmount("right");
            }}
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {showSecurities && (
        <div className="pt-mega-menu absolute inset-x-0 top-full z-50">
          <div className="pt-container">
            <div className="pt-mega-menu-inner">
              {megaMenuColumns.map((column) => (
                <div key={column.title}>
                  <h4 className="pt-mega-menu-heading">
                    {column.title}
                  </h4>

                  <ul className="flex flex-col gap-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.path}
                          onClick={() =>
                            setShowSecurities(false)
                          }
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-mega-menu-utility">
              <Link
                to="/signup"
                onClick={() => setShowSecurities(false)}
              >
                Sign Up
              </Link>

              <Link
                to="/magazine"
                onClick={() => setShowSecurities(false)}
              >
                Digital Edition
              </Link>

              <Link
                to="/Privacy"
                onClick={() => setShowSecurities(false)}
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                onClick={() => setShowSecurities(false)}
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MARKETS PAGE
========================================================= */

type MarketTab =
  | "Overview"
  | "Stocks"
  | "Indices"
  | "Crypto"
  | "Forex"
  | "Commodities"
  | "Mutual Funds"
  | "ETFs"
  | "Government Bonds"
  | "Global Markets";

const tabs: MarketTab[] = [
  "Overview",
  "Stocks",
  "Indices",
  "Crypto",
  "Forex",
  "Commodities",
  "Mutual Funds",
  "ETFs",
  "Government Bonds",
  "Global Markets",
];

export function MarketsPage() {
  interface IndexRow {
    name: string;
    value: string;
    change: string;
    ytd: string;
  }

  interface StockRow {
    symbol: string;
    company: string;
    price: string;
    change: string;
    volume: string;
    marketCap: string;
  }

  interface CryptoRow {
    symbol: string;
    name: string;
    price: string;
    change: string;
    marketCap: string;
  }

  // Active tab lives in the URL (?tab=Commodities) so menu links,
  // the tab bar, the back button and shared links all stay in sync.
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as MarketTab | null;
  const activeTab: MarketTab =
    tabParam && tabs.includes(tabParam) ? tabParam : "Overview";

  const selectTab = (tab: MarketTab) =>
    setSearchParams(tab === "Overview" ? {} : { tab });

  const [loading, setLoading] = useState(false);

  const [indices, setIndices] = useState<IndexRow[]>([
    { name: "S&P 500", value: "5,892.31", change: "+1.14%", ytd: "+18.4%" },
    { name: "Nasdaq Composite", value: "19,245.78", change: "+1.56%", ytd: "+24.1%" },
    { name: "Dow Jones Ind. Avg.", value: "42,318.45", change: "+0.82%", ytd: "+12.3%" },
    { name: "DAX", value: "18,612.80", change: "+0.54%", ytd: "+9.8%" },
    { name: "CAC 40", value: "7,984.20", change: "+0.31%", ytd: "+6.5%" },
  ]);

  const [stocks, setStocks] = useState<StockRow[]>([
    { symbol: "AAPL", company: "Apple Inc.", price: "$232.15", change: "+0.62%", volume: "78.4M", marketCap: "$3.52T" },
    { symbol: "MSFT", company: "Microsoft Corp.", price: "$421.30", change: "+0.35%", volume: "21.2M", marketCap: "$3.13T" },
    { symbol: "NVDA", company: "NVIDIA Corp.", price: "$879.50", change: "+2.34%", volume: "143.8M", marketCap: "$2.16T" },
    { symbol: "GOOGL", company: "Alphabet Inc.", price: "$168.44", change: "-0.21%", volume: "19.6M", marketCap: "$2.08T" },
    { symbol: "AMZN", company: "Amazon.com Inc.", price: "$186.90", change: "+1.02%", volume: "32.1M", marketCap: "$1.97T" },
    { symbol: "META", company: "Meta Platforms", price: "$493.28", change: "+1.88%", volume: "15.9M", marketCap: "$1.25T" },
    { symbol: "TSLA", company: "Tesla Inc.", price: "$248.44", change: "+3.21%", volume: "88.5M", marketCap: "$791B" },
    { symbol: "BRK.B", company: "Berkshire Hathaway", price: "$362.10", change: "-0.08%", volume: "4.2M", marketCap: "$785B" },
  ]);

  const [crypto, setCrypto] = useState<CryptoRow[]>([
    { symbol: "BTC", name: "Bitcoin", price: "$67,234", change: "+3.45%", marketCap: "$1.32T" },
    { symbol: "ETH", name: "Ethereum", price: "$3,456", change: "+2.87%", marketCap: "$415B" },
    { symbol: "SOL", name: "Solana", price: "$167.80", change: "+4.56%", marketCap: "$78B" },
    { symbol: "BNB", name: "Binance Coin", price: "$612.40", change: "+1.22%", marketCap: "$89B" },
    { symbol: "XRP", name: "XRP", price: "$0.62", change: "-0.88%", marketCap: "$34B" },
    { symbol: "ADA", name: "Cardano", price: "$0.48", change: "+1.14%", marketCap: "$17B" },
  ]);

  useEffect(() => {
    let cancelled = false;

    const loadMarketData = async () => {
      setLoading(true);

      try {
        const data = await getQuotes();

        if (cancelled || !data) return;

        if (Array.isArray(data.usIndices) && data.usIndices.length) {
          setIndices(
            data.usIndices.slice(0, 5).map((item: any, index: number) => ({
              name: item.name ?? ["S&P 500", "Nasdaq Composite", "Dow Jones Ind. Avg.", "DAX", "CAC 40"][index],
              value: String(item.value ?? ""),
              change: formatPercent(item.change),
              ytd: ["+18.4%", "+24.1%", "+12.3%", "+9.8%", "+6.5%"][index],
            }))
          );
        }

        if (Array.isArray(data.stocks) && data.stocks.length) {
          setStocks(
            data.stocks.slice(0, 8).map((item: any, index: number) => ({
              symbol: item.symbol ?? item.name ?? "",
              company:
                item.company ??
                item.name ??
                ["Apple Inc.", "Microsoft Corp.", "NVIDIA Corp.", "Alphabet Inc.", "Amazon.com Inc.", "Meta Platforms", "Tesla Inc.", "Berkshire Hathaway"][index] ??
                "",
              price: String(item.value ?? item.price ?? ""),
              change: formatPercent(item.change),
              volume: String(item.volume ?? ["78.4M", "21.2M", "143.8M", "19.6M", "32.1M", "15.9M", "88.5M", "4.2M"][index] ?? ""),
              marketCap: String(item.marketCap ?? ["$3.52T", "$3.13T", "$2.16T", "$2.08T", "$1.97T", "$1.25T", "$791B", "$785B"][index] ?? ""),
            }))
          );
        }

        if (Array.isArray(data.crypto) && data.crypto.length) {
          setCrypto(
            data.crypto.slice(0, 6).map((item: any, index: number) => ({
              symbol: item.symbol ?? item.name ?? "",
              name: item.name ?? ["Bitcoin", "Ethereum", "Solana", "Binance Coin", "XRP", "Cardano"][index] ?? "",
              price: String(item.value ?? item.price ?? ""),
              change: formatPercent(item.change),
              marketCap: String(item.marketCap ?? ["$1.32T", "$415B", "$78B", "$89B", "$34B", "$17B"][index] ?? ""),
            }))
          );
        }
      } catch (error) {
        console.error("Markets data error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadMarketData();
    const interval = window.setInterval(loadMarketData, 60000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  function formatPercent(value: unknown) {
    const parsed = Number.parseFloat(String(value ?? "").replace("%", ""));
    if (!Number.isFinite(parsed)) return "0.00%";
    return `${parsed >= 0 ? "+" : ""}${parsed.toFixed(2)}%`;
  }

  const isPositive = (value: string) => !value.trim().startsWith("-");

  const Change = ({ value }: { value: string }) => (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${
        isPositive(value) ? "text-emerald-600" : "text-red-500"
      }`}
    >
      {isPositive(value) ? "▲" : "▼"} {value}
    </span>
  );

  return (
    <main className="min-h-screen bg-white text-[#17140F]">
      <div className="pt-container">
        {/* Red editorial rule */}
        <div className="border-t-[3px] border-[#d71920] pt-4 sm:pt-5" />

        {/* Page heading */}
        <header className="pb-5">
          <h1 className="font-serif text-[30px] font-bold leading-tight sm:text-[36px]">
            Markets Dashboard
          </h1>
          <p className="mt-1 text-[13px] text-[#777]">
            Real-time market data, indices, commodities, forex, crypto and more.
          </p>
        </header>

        {/* Tabs */}
        <nav
          aria-label="Markets sections"
          className="border-b border-[#dedede]"
        >
          <div className="flex min-w-0 gap-7 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => selectTab(tab)}
                className={`relative whitespace-nowrap pb-3 pt-1 text-[12px] font-semibold transition ${
                  activeTab === tab
                    ? "text-[#d71920]"
                    : "text-[#666] hover:text-black"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#d71920]" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Dashboard content */}
        <div className="pb-16 pt-5 sm:pt-6">
          {(activeTab === "Overview" || activeTab === "Indices") && (
            <section aria-labelledby="global-indices-heading">
              <div className="mb-4 flex items-center justify-between">
                <h2
                  id="global-indices-heading"
                  className="font-serif text-[18px] font-bold"
                >
                  Global Indices
                </h2>
                {loading && (
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[#999]">
                    Updating
                  </span>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-black">
                      <th className="py-2 pr-4 text-[10px] font-bold uppercase">
                        Index
                      </th>
                      <th className="py-2 pr-4 text-[10px] font-bold uppercase">
                        Value
                      </th>
                      <th className="py-2 pr-4 text-[10px] font-bold uppercase">
                        Change
                      </th>
                      <th className="py-2 text-[10px] font-bold uppercase">
                        YTD Return
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {indices.map((row) => (
                      <tr
                        key={row.name}
                        className="border-b border-[#ececec] last:border-b-0"
                      >
                        <td className="py-2.5 pr-4 text-[11px] font-semibold">
                          {row.name}
                        </td>
                        <td className="py-2.5 pr-4 font-mono text-[11px] text-[#555]">
                          {row.value}
                        </td>
                        <td className="py-2.5 pr-4 text-[11px]">
                          <Change value={row.change} />
                        </td>
                        <td className="py-2.5 text-[11px] font-semibold text-emerald-600">
                          {row.ytd}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {(activeTab === "Overview" || activeTab === "Stocks") && (
            <section
              aria-labelledby="top-stocks-heading"
              className="mt-7 sm:mt-8"
            >
              <h2
                id="top-stocks-heading"
                className="mb-4 font-serif text-[18px] font-bold"
              >
                Top Stocks
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-black">
                      <th className="py-2 pr-3 text-[10px] font-bold uppercase">
                        Symbol
                      </th>
                      <th className="py-2 pr-3 text-[10px] font-bold uppercase">
                        Company
                      </th>
                      <th className="py-2 pr-3 text-[10px] font-bold uppercase">
                        Price
                      </th>
                      <th className="py-2 pr-3 text-[10px] font-bold uppercase">
                        Change
                      </th>
                      <th className="py-2 pr-3 text-[10px] font-bold uppercase">
                        Volume
                      </th>
                      <th className="py-2 text-[10px] font-bold uppercase">
                        Mkt Cap
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((row) => (
                      <tr
                        key={row.symbol}
                        className="border-b border-[#ececec] last:border-b-0"
                      >
                        <td className="py-2.5 pr-3 text-[11px] font-bold text-[#d71920]">
                          {row.symbol}
                        </td>
                        <td className="py-2.5 pr-3 text-[11px] font-medium">
                          {row.company}
                        </td>
                        <td className="py-2.5 pr-3 font-mono text-[11px] font-bold">
                          {row.price}
                        </td>
                        <td className="py-2.5 pr-3 text-[11px]">
                          <Change value={row.change} />
                        </td>
                        <td className="py-2.5 pr-3 text-[11px] text-[#666]">
                          {row.volume}
                        </td>
                        <td className="py-2.5 text-[11px] font-bold">
                          {row.marketCap}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {(activeTab === "Overview" || activeTab === "Crypto") && (
            <section
              aria-labelledby="crypto-heading"
              className="mt-7 sm:mt-8"
            >
              <h2
                id="crypto-heading"
                className="mb-4 font-serif text-[18px] font-bold"
              >
                Cryptocurrency
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {crypto.map((coin) => (
                  <article
                    key={coin.symbol}
                    className="rounded-[7px] border border-[#dedede] bg-white p-3.5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[13px] font-bold">{coin.symbol}</div>
                        <div className="mt-1 text-[10px] text-[#777]">
                          {coin.name}
                        </div>
                      </div>
                      <Change value={coin.change} />
                    </div>

                    <div className="mt-2.5 font-mono text-[18px] font-bold tracking-tight">
                      {coin.price}
                    </div>

                    <div className="mt-1 text-[10px] text-[#999]">
                      Mkt Cap: {coin.marketCap}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Tabs without data yet use the same clean editorial treatment. */}
          {!["Overview", "Stocks", "Indices", "Crypto"].includes(activeTab) && (
            <section className="py-10 text-center">
              <h2 className="font-serif text-2xl font-bold">{activeTab}</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#777]">
                Market data for {activeTab.toLowerCase()} will appear here.
              </p>
            </section>
          )}
        </div>
      </div>
      <PrideTimesAd variant="first" />
    </main>
  );
}
