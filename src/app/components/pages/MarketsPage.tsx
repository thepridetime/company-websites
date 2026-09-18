import { useEffect, useState } from "react";
import { getQuotes } from "../../../services/marketApi";

/*
  Markets Page
  ------------------------------------------------------------
  Editorial market-dashboard layout based on the supplied
  reference design.

  Uses the project's existing market provider and keeps the
  market information already defined for The Pride Times:
  - Global indices
  - Top stocks
  - Cryptocurrency
  - Market categories
  - Existing live-refresh behaviour

  The surrounding site header/footer can continue to be supplied
  by the application's existing layout.
*/

type MarketRow = {
  name: string;
  value: string;
  change: string;
  up: boolean;
  pts?: string;
  company?: string;
  volume?: string;
  marketCap?: string;
  ytd?: string;
};

type MarketData = {
  indices: MarketRow[];
  stocks: MarketRow[];
  crypto: MarketRow[];
};

const fallbackIndices: MarketRow[] = [
  { name: "S&P 500", value: "5,892.31", change: "+1.14%", up: true, ytd: "+18.4%" },
  { name: "Nasdaq Composite", value: "19,245.78", change: "+1.56%", up: true, ytd: "+24.1%" },
  { name: "Dow Jones Ind. Avg.", value: "42,318.45", change: "+0.82%", up: true, ytd: "+12.3%" },
  { name: "Russell 2000", value: "2,134.56", change: "+0.45%", up: true, ytd: "+9.7%" },
  { name: "FTSE 100", value: "8,241.70", change: "+0.19%", up: true, ytd: "+7.2%" },
  { name: "Nikkei 225", value: "38,912.44", change: "-0.21%", up: false, ytd: "+14.8%" },
  { name: "Hang Seng", value: "18,342.10", change: "-0.87%", up: false, ytd: "-3.4%" },
  { name: "Nifty 50", value: "22,419.95", change: "-0.34%", up: false, ytd: "+11.2%" },
  { name: "DAX", value: "18,612.80", change: "+0.54%", up: true, ytd: "+9.8%" },
  { name: "CAC 40", value: "7,984.20", change: "+0.31%", up: true, ytd: "+6.5%" },
];

const fallbackStocks: MarketRow[] = [
  { name: "AAPL", company: "Apple Inc.", value: "$232.15", change: "+0.62%", up: true, volume: "78.4M", marketCap: "$3.52T" },
  { name: "MSFT", company: "Microsoft Corp.", value: "$421.30", change: "+0.35%", up: true, volume: "21.2M", marketCap: "$3.13T" },
  { name: "NVDA", company: "NVIDIA Corp.", value: "$879.50", change: "+2.34%", up: true, volume: "143.8M", marketCap: "$2.16T" },
  { name: "GOOGL", company: "Alphabet Inc.", value: "$168.44", change: "-0.21%", up: false, volume: "19.6M", marketCap: "$2.08T" },
  { name: "AMZN", company: "Amazon.com Inc.", value: "$186.90", change: "+1.02%", up: true, volume: "32.1M", marketCap: "$1.97T" },
  { name: "META", company: "Meta Platforms", value: "$493.28", change: "+1.88%", up: true, volume: "15.9M", marketCap: "$1.25T" },
  { name: "TSLA", company: "Tesla Inc.", value: "$248.44", change: "+3.21%", up: true, volume: "88.5M", marketCap: "$791B" },
  { name: "BRK.B", company: "Berkshire Hathaway", value: "$362.10", change: "-0.08%", up: false, volume: "4.2M", marketCap: "$785B" },
];

const fallbackCrypto: MarketRow[] = [
  { name: "Bitcoin", value: "$612.40", change: "+1.14%", up: true, marketCap: "$89B" },
  { name: "XRP", value: "$0.62", change: "+0.84%", up: true, marketCap: "$34B" },
  { name: "Cardano", value: "$0.48", change: "-0.32%", up: false, marketCap: "$17B" },
];

const navItems = [
  "Overview",
  "Stocks",
  "Indices",
  "Crypto",
  "Forex",
  "Commodities",
  "Mutual Funds",
  "ETFs",
];

function normalizeRows(rows: any[] | undefined, fallback: MarketRow[]): MarketRow[] {
  if (!Array.isArray(rows) || rows.length === 0) return fallback;

  return rows.map((row: any, index: number) => ({
    ...fallback[index],
    ...row,
    name: row?.name ?? fallback[index]?.name ?? "—",
    value: row?.value ?? "—",
    change: row?.change ?? "—",
    up: typeof row?.up === "boolean" ? row.up : fallback[index]?.up ?? true,
  }));
}

function ChangeValue({
  change,
  up,
}: {
  change: string;
  up: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${
        up ? "text-[#08A86B]" : "text-[#E3262E]"
      }`}
    >
      <span className="text-[9px]">{up ? "▲" : "▼"}</span>
      {change}
    </span>
  );
}

function AdBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden border border-[#D7DDE0] bg-[#17333D]">
      <div className="absolute right-2 top-1 text-[7px] text-white/60">
        Advertisement
      </div>

      <div className="flex min-h-[74px] flex-col items-center justify-center px-4 text-center">
        <span className="mb-1 text-[8px] font-bold tracking-[0.18em] text-[#55A8BD]">
          GOOGLE ADSENSE
        </span>

        <span className="font-sans text-[12px] font-semibold text-white sm:text-[14px]">
          {children}
        </span>

        <span className="mt-1 text-[8px] tracking-wide text-[#8BB6C1]">
          728 × 90 • Leaderboard
        </span>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between border-b border-[#17140F] pb-2">
      <h2 className="font-serif text-[17px] font-bold tracking-tight text-[#17140F]">
        {children}
      </h2>
    </div>
  );
}

export function MarketsPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [marketData, setMarketData] = useState<MarketData>({
    indices: fallbackIndices,
    stocks: fallbackStocks,
    crypto: fallbackCrypto,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const data = await getQuotes();

        if (!mounted) return;

        setMarketData({
          indices: normalizeRows(data?.indices, fallbackIndices),
          stocks: normalizeRows(data?.stocks, fallbackStocks),
          crypto: normalizeRows(data?.crypto, fallbackCrypto),
        });
      } catch (error) {
        console.error("Unable to load market data:", error);

        if (mounted) {
          setMarketData({
            indices: fallbackIndices,
            stocks: fallbackStocks,
            crypto: fallbackCrypto,
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    const interval = window.setInterval(loadData, 30000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const displayIndices = marketData.indices.length
    ? marketData.indices
    : fallbackIndices;

  const displayStocks = marketData.stocks.length
    ? marketData.stocks
    : fallbackStocks;

  const displayCrypto = marketData.crypto.length
    ? marketData.crypto
    : fallbackCrypto;

  return (
    <main className="min-h-screen bg-white text-[#17140F] antialiased">
      <div className="mx-auto w-full max-w-[1180px] px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        {/* Page heading */}
        <header className="border-t-[3px] border-[#E31B23] pt-4">
          <h1 className="font-serif text-[28px] font-bold leading-none tracking-tight sm:text-[34px]">
            Markets Dashboard
          </h1>

          <p className="mt-2 text-[11px] text-[#55534C] sm:text-[12px]">
            Real-time market data, indices, commodities, forex, crypto and more.
          </p>
        </header>

        {/* Advertisement */}
        <div className="mt-4">
          <AdBanner>Trade smarter with Pride Times Markets Intelligence</AdBanner>
        </div>

        {/* Market navigation */}
        <nav
          aria-label="Markets navigation"
          className="mt-3 flex overflow-x-auto border-b border-[#D9D4C7] no-scrollbar"
        >
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveTab(item)}
              className={`relative shrink-0 px-4 py-3 text-[11px] font-medium transition-colors ${
                activeTab === item
                  ? "text-[#E31B23]"
                  : "text-[#55534C] hover:text-[#17140F]"
              }`}
            >
              {item}

              {activeTab === item && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#E31B23]" />
              )}
            </button>
          ))}
        </nav>

        {/* Main dashboard */}
        <div className="mt-5">
          {loading ? (
            <div className="border border-[#E5E2DB] py-16 text-center">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#8A887F]">
                Loading market data…
              </p>
            </div>
          ) : (
            <>
              {/* Global indices */}
              <section>
                <SectionHeading>Global Indices</SectionHeading>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] border-collapse">
                    <thead>
                      <tr className="border-b border-[#17140F]">
                        <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-[0.08em]">
                          Index
                        </th>
                        <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-[0.08em]">
                          Value
                        </th>
                        <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-[0.08em]">
                          Change
                        </th>
                        <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-[0.08em]">
                          YTD Return
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {displayIndices.map((row, index) => (
                        <tr
                          key={`${row.name}-${index}`}
                          className="border-b border-[#ECE9E2] hover:bg-[#FAFAF7]"
                        >
                          <td className="py-2.5 text-[11px] font-semibold text-[#17140F]">
                            {row.name}
                          </td>

                          <td className="py-2.5 font-mono text-[11px] text-[#55534C]">
                            {row.value}
                          </td>

                          <td className="py-2.5 text-[11px]">
                            <ChangeValue
                              change={row.change}
                              up={row.up}
                            />
                          </td>

                          <td
                            className={`py-2.5 text-[11px] font-semibold ${
                              row.ytd?.startsWith("-")
                                ? "text-[#E3262E]"
                                : "text-[#08A86B]"
                            }`}
                          >
                            {row.ytd ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Top stocks */}
              <section className="mt-8">
                <SectionHeading>Top Stocks</SectionHeading>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                      <tr className="border-b border-[#17140F]">
                        <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-[0.08em]">
                          Symbol
                        </th>
                        <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-[0.08em]">
                          Company
                        </th>
                        <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-[0.08em]">
                          Price
                        </th>
                        <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-[0.08em]">
                          Change
                        </th>
                        <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-[0.08em]">
                          Volume
                        </th>
                        <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-[0.08em]">
                          Mkt Cap
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {displayStocks.map((row, index) => (
                        <tr
                          key={`${row.name}-${index}`}
                          className="border-b border-[#ECE9E2] hover:bg-[#FAFAF7]"
                        >
                          <td className="py-2.5 text-[11px] font-semibold text-[#E31B23]">
                            {row.name}
                          </td>

                          <td className="py-2.5 text-[11px] text-[#17140F]">
                            {row.company ?? "—"}
                          </td>

                          <td className="py-2.5 font-mono text-[11px] font-semibold">
                            {row.value}
                          </td>

                          <td className="py-2.5 text-[11px]">
                            <ChangeValue
                              change={row.change}
                              up={row.up}
                            />
                          </td>

                          <td className="py-2.5 text-[11px] text-[#77736B]">
                            {row.volume ?? "—"}
                          </td>

                          <td className="py-2.5 text-[11px] font-semibold">
                            {row.marketCap ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Cryptocurrency */}
              <section className="mt-8">
                <SectionHeading>Cryptocurrency</SectionHeading>

                <div className="grid grid-cols-1 border border-[#E5E2DB] sm:grid-cols-3">
                  {displayCrypto.slice(0, 3).map((row, index) => (
                    <article
                      key={`${row.name}-${index}`}
                      className={`p-4 ${
                        index > 0 ? "border-t sm:border-l sm:border-t-0" : ""
                      } border-[#E5E2DB]`}
                    >
                      <p className="text-[10px] text-[#77736B]">{row.name}</p>

                      <p className="mt-1 font-serif text-[20px] font-bold">
                        {row.value}
                      </p>

                      <div className="mt-1 flex items-center justify-between">
                        <ChangeValue
                          change={row.change}
                          up={row.up}
                        />

                        <span className="text-[9px] text-[#8A887F]">
                          Mkt Cap: {row.marketCap ?? "—"}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Existing market report information, condensed to the reference page */}
              <section className="mt-8">
                <SectionHeading>Markets Report</SectionHeading>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <article className="border border-[#E5E2DB] p-4">
                    <p className="text-[9px] uppercase tracking-[0.12em] text-[#8A887F]">
                      S&P 500 — July Close
                    </p>
                    <p className="mt-1 font-serif text-[21px] font-bold text-[#E31B23]">
                      -0.13%
                    </p>
                  </article>

                  <article className="border border-[#E5E2DB] p-4">
                    <p className="text-[9px] uppercase tracking-[0.12em] text-[#8A887F]">
                      Russell 2000 — YTD Gain
                    </p>
                    <p className="mt-1 font-serif text-[21px] font-bold text-[#E31B23]">
                      +22%
                    </p>
                  </article>

                  <article className="border border-[#E5E2DB] p-4">
                    <p className="text-[9px] uppercase tracking-[0.12em] text-[#8A887F]">
                      Nikkei 225 — July
                    </p>
                    <p className="mt-1 font-serif text-[21px] font-bold text-[#E31B23]">
                      -8.1%
                    </p>
                  </article>

                  <article className="border border-[#E5E2DB] p-4">
                    <p className="text-[9px] uppercase tracking-[0.12em] text-[#8A887F]">
                      US 10Y Treasury Yield
                    </p>
                    <p className="mt-1 font-serif text-[21px] font-bold text-[#E31B23]">
                      4.75%
                    </p>
                  </article>
                </div>
              </section>

              {/* Sponsored content */}
              <div className="mt-8">
                <div className="overflow-hidden rounded-[3px] border border-[#E2DED2] bg-[#10162E]">
                  <div className="border-b border-[#D8D1B8] bg-[#F4F0DF] px-2 py-1 text-[7px] uppercase tracking-[0.1em] text-[#77736B]">
                    Sponsored Content
                  </div>

                  <div className="flex min-h-[78px] flex-col items-center justify-center text-center">
                    <span className="text-[8px] font-bold tracking-[0.15em] text-[#F1D100]">
                      MARKETEDGE PRO — ADVANCED TRADING ANALYTICS
                    </span>

                    <span className="mt-1 text-[12px] font-semibold text-white">
                      Your Ad Here
                    </span>

                    <span className="mt-1 text-[8px] text-white/60">
                      Reach 2M+ business readers
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
