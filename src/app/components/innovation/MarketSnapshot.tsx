import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import {
  defaultMarketSnapshot,
  type MarketIndexItem,
} from "../../data/innovationData";

export interface MarketSnapshotProps {
  data?: Record<string, MarketIndexItem[]>;
  tabs?: readonly string[];
  className?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

function getSparklinePoints(symbol: string, up: boolean, sparkline?: number[]): number[] {
  if (sparkline && sparkline.length > 0) return sparkline;
  const s = symbol.toUpperCase();
  if (s.includes("S&P") || s.includes("500")) {
    return [40, 45, 42, 48, 55, 52, 60, 68, 75];
  }
  if (s.includes("NASDAQ")) {
    return [35, 38, 45, 50, 48, 62, 65, 78, 85];
  }
  if (s.includes("DOW")) {
    return [50, 52, 49, 54, 58, 56, 62, 65, 70];
  }
  if (s.includes("RUSSELL")) {
    return up
      ? [45, 48, 52, 50, 56, 58, 62, 65, 68]
      : [65, 62, 58, 60, 55, 50, 52, 48, 44];
  }
  return up
    ? [40, 44, 42, 48, 52, 50, 58, 62, 68]
    : [65, 60, 62, 55, 52, 54, 48, 45, 40];
}

function MiniSparkline({
  points,
  up,
}: {
  points: number[];
  up: boolean;
}) {
  if (!points || points.length === 0) return null;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 80;
  const height = 24;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${coords.join(" L ")}`;
  const strokeColor = up ? "#16a34a" : "#dc2626";
  const fillColor = up ? "rgba(22, 163, 74, 0.12)" : "rgba(220, 38, 38, 0.12)";
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-6 overflow-visible"
      preserveAspectRatio="none"
    >
      <path d={areaD} fill={fillColor} />
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MarketSnapshot({
  data = defaultMarketSnapshot,
  tabs = ["Indices", "Commodities", "Crypto"] as const,
  className = "",
  activeTab: controlledTab,
  onTabChange,
}: MarketSnapshotProps) {
  const [internalTab, setInternalTab] = useState<string>(tabs[0] || "Indices");

  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const items = data[activeTab] || [];

  return (
    <div
      className={`bg-gray-50/60 p-3 sm:p-3.5 rounded-none border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${className}`}
    >
      {/* Top bar with heading and category tabs */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-gray-200">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <h3 className="text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.14em] text-gray-950">
            Market Snapshot
          </h3>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabClick(tab)}
              className={`text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider pb-0.5 transition-colors relative ${
                activeTab === tab
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4-column market metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        {items.slice(0, 4).map((item) => {
          const sparklinePoints = getSparklinePoints(item.symbol, item.up, item.sparkline);

          return (
            <div
              key={item.symbol}
              className="bg-white p-2 sm:p-2.5 rounded-none border border-gray-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                <span
                  className="block text-[8px] sm:text-[9px] font-bold text-gray-600 uppercase tracking-tight truncate"
                  title={item.symbol}
                >
                  {item.symbol}
                </span>
                <span className="block text-[13px] sm:text-[14px] font-bold text-gray-950 tabular-nums mt-0.5">
                  {item.value}
                </span>
                <div
                  className={`flex items-center gap-0.5 text-[9.5px] sm:text-[10px] font-semibold tabular-nums mt-0.5 ${
                    item.up ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.up ? (
                    <TrendingUp size={10} strokeWidth={2.5} />
                  ) : (
                    <TrendingDown size={10} strokeWidth={2.5} />
                  )}
                  <span>{item.change}</span>
                </div>
              </div>

              <div className="mt-1.5 pt-0.5">
                <MiniSparkline points={sparklinePoints} up={item.up} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between mt-2.5 pt-1 text-[10px] sm:text-[10.5px]">
        <span className="text-gray-400">Delayed 15m · Global Exchanges</span>
        <Link
          to="/markets"
          className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
        >
          <span>View All Markets</span>
          <ArrowRight size={10} />
        </Link>
      </div>
    </div>
  );
}

export default MarketSnapshot;
