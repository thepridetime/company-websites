import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { getQuotes } from "../../../services/marketApi";
import { defaultMarketSnapshot } from "../../data/innovationData";

/* =========================================================
   MARKET SNAPSHOT (shared)
   One component used across the editorial pages.
   - Live data from getQuotes(), refreshed every 60 seconds
   - Falls back to the static reference data when live data
     is unavailable, so the panel is never empty
   - Tabs are chosen per page through the `tabs` prop
========================================================= */

export type MarketTabName = "Indices" | "Commodities" | "Crypto" | "Currencies";

type RawQuote = {
  name?: string;
  pair?: string;
  value: string | number;
  change: string;
  up: boolean;
};

type QuotesShape = {
  indices?: RawQuote[];
  commodities?: RawQuote[];
  crypto?: RawQuote[];
  forex?: RawQuote[];
};

type Row = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

const REFRESH_MS = 60_000;

const toRows = (list: RawQuote[] | undefined): Row[] =>
  (list ?? []).map((item) => ({
    symbol: item.name ?? item.pair ?? "",
    value: item.value,
    change: item.change,
    up: item.up,
  }));

const liveRowsFor = (tab: MarketTabName, quotes: QuotesShape | null): Row[] => {
  if (!quotes) return [];
  switch (tab) {
    case "Indices":
      return toRows(quotes.indices);
    case "Commodities":
      return toRows(quotes.commodities);
    case "Crypto":
      return toRows(quotes.crypto);
    case "Currencies":
      return toRows(quotes.forex);
    default:
      return [];
  }
};

const fallbackRowsFor = (tab: MarketTabName): Row[] =>
  (defaultMarketSnapshot[tab] ?? []).map((item) => ({
    symbol: item.symbol,
    value: item.value,
    change: item.change,
    up: item.up,
  }));

export interface MarketSnapshotProps {
  tabs?: MarketTabName[];
  defaultTab?: MarketTabName;
  title?: string;
  limit?: number;
  viewAllUrl?: string;
  className?: string;
}

export function MarketSnapshot({
  tabs = ["Indices", "Commodities", "Crypto"],
  defaultTab,
  title = "Market Snapshot",
  limit = 4,
  viewAllUrl = "/markets",
  className = "",
}: MarketSnapshotProps) {
  const [activeTab, setActiveTab] = useState<MarketTabName>(
    defaultTab ?? tabs[0]
  );
  const [quotes, setQuotes] = useState<QuotesShape | null>(null);

  /* ---------- Live data with periodic refresh ---------- */

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = (await getQuotes()) as unknown as QuotesShape;
        if (!cancelled) setQuotes(data);
      } catch (error) {
        console.error("Market snapshot: live quotes unavailable", error);
      }
    };

    load();
    const timer = window.setInterval(load, REFRESH_MS);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  /* ---------- Rows for the active tab (live first, then fallback) ---------- */

  const { rows, isLive } = useMemo(() => {
    const live = liveRowsFor(activeTab, quotes);
    const isLive = live.length > 0;
    const source = isLive ? live : fallbackRowsFor(activeTab);
    return { rows: source.slice(0, limit), isLive };
  }, [activeTab, quotes, limit]);

  return (
    <section
      aria-label={title}
      className={`rounded-sm border border-gray-200 bg-white ${className}`}
    >
      {/* Header: title, live indicator and tabs */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-black px-4 pb-2.5 pt-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isLive ? "animate-pulse bg-emerald-500" : "bg-gray-300"
            }`}
            aria-hidden="true"
          />
          <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
            {title}
          </h2>
        </div>

        <div role="tablist" className="flex items-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-0.5 text-[10px] font-bold uppercase tracking-wide transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Quote tiles */}

      {rows.length === 0 ? (
        <p className="px-4 py-6 text-center text-[12px] text-gray-400">
          No market data available right now.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-px bg-gray-200 sm:grid-cols-4">
          {rows.map((row) => (
            <div key={`${activeTab}-${row.symbol}`} className="bg-white p-3">
              <span
                className="block truncate text-[10px] font-bold uppercase tracking-wide text-gray-500"
                title={row.symbol}
              >
                {row.symbol}
              </span>

              <span className="mt-1 block font-serif text-[17px] font-bold tabular-nums text-gray-950">
                {row.value}
              </span>

              <span
                className={`mt-0.5 flex items-center gap-1 text-[11px] font-semibold tabular-nums ${
                  row.up ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {row.up ? (
                  <TrendingUp size={11} strokeWidth={2.25} />
                ) : (
                  <TrendingDown size={11} strokeWidth={2.25} />
                )}
                {row.change}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}

      <div className="flex items-center justify-between px-4 py-2.5 text-[10px] text-gray-400">
        <span>{isLive ? "Delayed 15m · Global exchanges" : "Reference data"}</span>

        <Link
          to={viewAllUrl}
          className="inline-flex items-center gap-1 font-bold uppercase tracking-wide text-red-600 hover:underline"
        >
          View all markets
          <ArrowRight size={10} />
        </Link>
      </div>
    </section>
  );
}

export default MarketSnapshot;
