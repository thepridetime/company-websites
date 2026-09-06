import { BarChart2, Radio } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";
import { getQuotes } from "../../../services/marketApi";

/* Same publication system as WorldPage / EnergyPage / WhiteHouseWatchPage:
   paper #FAFAF7  ink #17140F  ink-soft #55534C  rule #D9D4C7  wire (live) #A32F26

   The Markets dashboard used to be styled as a dark "Mac terminal" console
   (traffic-light dots, near-black background). That's been replaced with a
   "ticker board" treatment: a white, letterpress-bordered panel that still
   reads as a live feed — the wire-red accent and a pulsing LIVE mark carry
   that signal instead of a dark chrome window. */

const spChartData = [
  { time: "9am", value: 5820 },
  { time: "10am", value: 5845 },
  { time: "11am", value: 5830 },
  { time: "12pm", value: 5855 },
  { time: "1pm", value: 5848 },
  { time: "2pm", value: 5870 },
  { time: "3pm", value: 5880 },
  { time: "4pm", value: 5892 },
];

const sectorData = [
  { sector: "Tech", change: 2.1 },
  { sector: "Finance", change: 1.4 },
  { sector: "Health", change: 0.8 },
  { sector: "Energy", change: -1.2 },
  { sector: "Retail", change: 0.6 },
  { sector: "Utilities", change: -0.3 },
  { sector: "Materials", change: 1.8 },
  { sector: "Industrial", change: 0.9 },
];

const UP = "#1E7A4C";
const DOWN = "#A32F26";
const GRID = "#E3DECF";
const MUTE = "#8A887F";
const INK = "#17140F";
const INK_SOFT = "#55534C";
const RULE = "#D9D4C7";

/* =========================================================
   GLOBAL MARKETS REPORT — editorial wire content
========================================================= */

const equityRegions = [
  {
    wire: "US",
    region: "United States",
    points: [
      "The S&P 500 finished July marginally lower (-0.13%), marking its first losing July since 2014, despite one of the strongest earnings seasons in history.",
      "The Nasdaq-100 dropped 6.6% as semiconductor and AI-exposed stocks faced significant pressure amid questions about AI monetization and overcapacity.",
      "Market breadth showed resilience: the equal-weighted S&P 500 advanced 0.78–0.9%, outperforming the cap-weighted index by over 100 basis points.",
      "The Russell 2000 (small-cap index) gained 22% over the first seven months of 2026 — the best start to a year for small U.S. companies since 1991.",
    ],
  },
  {
    wire: "EU",
    region: "Europe",
    points: [
      "The STOXX 600 posted a fourth consecutive monthly gain, reaching a new record high despite volatility from U.S.–Iran tensions.",
      "Oil & Gas was the best-performing sector, benefiting from elevated crude prices.",
      "Financials delivered strong gains — Santander +1.9%, BNP Paribas +7.4%.",
    ],
  },
  {
    wire: "ASIA",
    region: "Asia",
    points: [
      "Japan's Nikkei 225 lost 8.1% in July as semiconductor and AI stocks corrected sharply.",
      "A historic joint U.S.–Japan currency intervention in late July stabilized the yen, which had weakened to multi-decade lows (160–165 per dollar).",
      "Japan spent approximately ¥8.45 trillion (~$52.8 billion) on July 31 alone.",
    ],
  },
];

const fixedIncomePoints = [
  "U.S. Treasury yields rose sharply: the 10-year yield climbed from ~4.45% to 4.75%, while the 30-year yield hit ~5.5% — levels not seen in nearly two decades.",
  "The Federal Reserve, under new Chair Kevin Warsh, held rates steady at 3.75% in late July, though two officials dissented in favor of an immediate hike.",
  "German Bund yields rose from ~2.95% to 3.20% as investors reassessed the likelihood of further ECB tightening.",
];

const reportStats = [
  { value: "-0.13%", label: "S&P 500 — July close" },
  { value: "+22%", label: "Russell 2000 — YTD gain" },
  { value: "-8.1%", label: "Nikkei 225 — July" },
  { value: "4.75%", label: "US 10Y Treasury yield" },
  { value: "3.75%", label: "Fed funds rate" },
];

/** Bolds percentages, currency amounts, and basis-point figures inline
 *  so key numbers are scannable instead of buried in paragraph text. */
const STAT_RE =
  /([$€¥]\s?[\d.,]+(?:\s?(?:billion|trillion|million))?|-?\d+(?:\.\d+)?%|\d+(?:\.\d+)?\s?(?:basis points|bps))/g;

function Emphasize({ text, color = "#A32F26" }: { text: string; color?: string }) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  const re = new RegExp(STAT_RE);
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    nodes.push(
      <strong key={key++} className="font-semibold tabular-nums" style={{ color }}>
        {match[0]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return <>{nodes}</>;
}

/* =========================================================
   MARKET TABLE — light "ticker board" register
========================================================= */

function MarketTable({
  data,
  cols,
}: {
  data: Record<string, string | boolean>[];
  cols: string[];
}) {
  const visibleCols = cols.filter((c) => c !== "up");

  return (
    <table className="w-full text-sm border-collapse font-mono">
      <thead>
        <tr className="text-[10px] uppercase tracking-[0.14em] text-[#8A887F]">
          {visibleCols.map((col) => (
            <th
              key={col}
              className={`text-left font-normal py-2.5 border-b border-[#D9D4C7] ${
                col === "change" ? "text-right" : ""
              }`}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className="border-b border-[#EFEBE1] last:border-b-0 hover:bg-[#FAFAF7] transition-colors"
          >
            {visibleCols.map((col) => (
              <td
                key={col}
                className={`py-3 text-[13px] ${
                  col === "change"
                    ? "text-right font-semibold tabular-nums"
                    : col === "name" ||
                      col === "pair" ||
                      col === "bond"
                    ? "font-semibold text-[#17140F]"
                    : "text-[#55534C] tabular-nums"
                }`}
                style={
                  col === "change"
                    ? { color: row.up ? UP : DOWN }
                    : undefined
                }
              >
                {col === "change" ? (
                  <span className="inline-flex items-center justify-end gap-1.5">
                    <span className="text-[10px]">
                      {row.up ? "▲" : "▼"}
                    </span>
                    {String(row[col])}
                  </span>
                ) : typeof row[col] !== "boolean" ? (
                  String(row[col])
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function MarketsPage() {
  const [activeTab, setActiveTab] = useState("indices");

  const [marketData, setMarketData] = useState<{
    indices: any[];
    crypto: any[];
  }>({
    indices: [],
    crypto: [],
  });

  const [loading, setLoading] = useState(true);

  const tabs = ["indices", "crypto"];

  /* =======================================================
     LOAD MARKET DATA
  ======================================================= */

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getQuotes();

        setMarketData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();

    const interval = setInterval(loadData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-[#FAFAF7] text-[#17140F] antialiased">

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

        {/* =================================================
            MASTHEAD
        ================================================= */}

        <div
          className="
            flex
            items-baseline
            justify-between
            border-t-[3px]
            border-b
            border-[#17140F]
            py-2.5
            mb-1
            text-[10px]
            sm:text-xs
            uppercase
            tracking-[0.22em]
            text-[#55534C]
          "
        >
          <span className="flex items-center gap-2 font-semibold text-[#17140F]">

            <span className="relative flex h-2 w-2">

              <span
                className="
                  motion-safe:animate-ping
                  absolute
                  inline-flex
                  h-full
                  w-full
                  rounded-full
                  bg-[#A32F26]
                  opacity-60
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  rounded-full
                  h-2
                  w-2
                  bg-[#A32F26]
                "
              />

            </span>

            Real-Time Data

          </span>

          <span className="hidden sm:inline">
            Terminal Feed &middot; Refreshes every 30s
          </span>

          <span className="sm:hidden">
            Refreshes / 30s
          </span>
        </div>


        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <div
          className="
            border-b-4
            border-[#17140F]
            pb-5
            mb-8
            flex
            items-end
            justify-between
            gap-4
          "
        >

          <h1
            className="
              font-serif
              text-4xl
              sm:text-5xl
              tracking-tight
              leading-none
            "
          >
            Global Markets
          </h1>

          <p
            className="
              hidden
              md:block
              text-[11px]
              uppercase
              tracking-[0.16em]
              text-[#8A887F]
              pb-1
            "
          >
            Indices &middot; Sectors &middot; Crypto
          </p>

        </div>


        {/* =================================================
            QUICK JUMP
        ================================================= */}

        <div className="flex flex-wrap gap-x-7 gap-y-2 mb-8">

          <a
            href="#sectors"
            className="
              text-[11px]
              font-sans
              uppercase
              tracking-[0.12em]
              leading-none
              text-[#55534C]
              hover:text-[#A32F26]
              transition-colors
              border-b
              border-transparent
              hover:border-[#A32F26]
              pb-0.5
            "
          >
            Overview
          </a>


          <a
            href="#sectors"
            className="
              text-[11px]
              font-sans
              uppercase
              tracking-[0.12em]
              leading-none
              text-[#55534C]
              hover:text-[#A32F26]
              transition-colors
              border-b
              border-transparent
              hover:border-[#A32F26]
              pb-0.5
            "
          >
            Sector Performance
          </a>


          <button
            type="button"
            onClick={() => {
              setActiveTab("indices");

              document
                .getElementById("markets-table")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
            className="
              text-[11px]
              font-sans
              uppercase
              tracking-[0.12em]
              leading-none
              text-[#55534C]
              hover:text-[#A32F26]
              transition-colors
              border-b
              border-transparent
              hover:border-[#A32F26]
              pb-0.5
            "
          >
            Global Indices
          </button>


          <button
            type="button"
            onClick={() => {
              setActiveTab("crypto");

              document
                .getElementById("markets-table")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
            className="
              text-[11px]
              font-sans
              uppercase
              tracking-[0.12em]
              leading-none
              text-[#55534C]
              hover:text-[#A32F26]
              transition-colors
              border-b
              border-transparent
              hover:border-[#A32F26]
              pb-0.5
            "
          >
            Cryptocurrency
          </button>


          <a
            href="#markets-report"
            className="
              text-[11px]
              font-sans
              uppercase
              tracking-[0.12em]
              leading-none
              text-[#55534C]
              hover:text-[#A32F26]
              transition-colors
              border-b
              border-transparent
              hover:border-[#A32F26]
              pb-0.5
            "
          >
            Markets Report
          </a>

        </div>


        {/* =================================================
            GLOBAL MARKETS DASHBOARD — "Ticker Board"
            White letterpress-bordered panel. A thin wire-red
            rule along the top and a pulsing LIVE mark carry
            the "live feed" signal instead of a dark console.
        ================================================= */}

        <div
          className="
            bg-white
            border
            border-[#D9D4C7]
            border-t-[3px]
            border-t-[#A32F26]
            rounded-sm
            overflow-hidden
            shadow-[0_10px_30px_-12px_rgba(23,20,15,0.12)]
          "
        >

          {/* =================================================
              BOARD HEADER
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              px-4
              sm:px-5
              py-3.5
              border-b
              border-[#D9D4C7]
            "
          >

            <div className="flex items-center gap-2.5">

              <BarChart2
                size={15}
                strokeWidth={2}
                className="text-[#17140F]"
              />

              <span
                className="
                  font-serif
                  text-[15px]
                  tracking-tight
                  text-[#17140F]
                "
              >
                Market Ticker
              </span>

            </div>


            <span
              className="
                font-mono
                text-[9px]
                font-semibold
                tracking-[0.12em]
                text-[#A32F26]
                flex
                items-center
                gap-1.5
              "
            >

              <Radio
                size={11}
                strokeWidth={2.25}
                className="motion-safe:animate-pulse"
              />

              LIVE

            </span>

          </div>


          {/* =================================================
              LOADING STATE
          ================================================= */}

          {loading ? (

            <div
              className="
                py-20
                text-center
                font-mono
                text-xs
                text-[#8A887F]
                uppercase
                tracking-[0.2em]
              "
            >

              <BarChart2
                size={20}
                className="mx-auto mb-3 opacity-40"
              />

              Loading market data&hellip;

            </div>

          ) : (

            <>

              {/* =================================================
                  INDEX STRIP
              ================================================= */}

              <div
                className="
                  flex
                  items-stretch
                  gap-0
                  overflow-x-auto
                  no-scrollbar
                  border-b
                  border-[#D9D4C7]
                  bg-[#FCFBF8]
                "
              >

                {marketData.indices.map(
                  (idx: any, i: number) => (

                    <div
                      key={idx.name}
                      className={`
                        flex-shrink-0
                        px-5
                        py-4
                        ${
                          i > 0
                            ? "border-l border-[#E3DECF]"
                            : ""
                        }
                      `}
                    >

                      <p
                        className="
                          font-mono
                          text-[10px]
                          uppercase
                          tracking-[0.14em]
                          text-[#8A887F]
                        "
                      >
                        {idx.name}
                      </p>


                      <p
                        className="
                          font-serif
                          text-[19px]
                          text-[#17140F]
                          mt-1
                          tabular-nums
                        "
                      >
                        {idx.value}
                      </p>


                      <span
                        className="
                          font-mono
                          text-[11px]
                          tabular-nums
                          flex
                          items-center
                          gap-1
                          mt-1
                          font-semibold
                        "
                        style={{
                          color: idx.up ? UP : DOWN,
                        }}
                      >

                        <span className="text-[9px]">
                          {idx.up ? "▲" : "▼"}
                        </span>

                        {idx.change} ({idx.pts})

                      </span>

                    </div>

                  )
                )}

              </div>


              {/* =================================================
                  CHARTS
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  divide-y
                  md:divide-y-0
                  md:divide-x
                  divide-[#D9D4C7]
                "
                id="sectors"
              >

                {/* S&P 500 CHART */}

                <div className="p-4 md:p-5">

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-3
                    "
                  >

                    <p
                      className="
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.14em]
                        text-[#8A887F]
                      "
                    >
                      S&amp;P 500 — Today
                    </p>

                    <span
                      className="
                        text-[10px]
                        font-mono
                        font-semibold
                        tabular-nums
                      "
                      style={{ color: UP }}
                    >
                      +1.2%
                    </span>

                  </div>


                  <ResponsiveContainer
                    width="100%"
                    height={170}
                  >

                    <LineChart data={spChartData}>

                      <CartesianGrid
                        strokeDasharray="2 4"
                        stroke={GRID}
                        vertical={false}
                      />

                      <XAxis
                        dataKey="time"
                        tick={{
                          fontSize: 10,
                          fill: MUTE,
                        }}
                        axisLine={{
                          stroke: GRID,
                        }}
                        tickLine={false}
                      />

                      <YAxis
                        tick={{
                          fontSize: 10,
                          fill: MUTE,
                        }}
                        domain={[5800, 5900]}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        contentStyle={{
                          fontSize: 11,
                          borderRadius: 0,
                          border: `1px solid ${RULE}`,
                          background: "#FFFFFF",
                          color: INK,
                        }}
                        labelStyle={{
                          color: MUTE,
                        }}
                      />

                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={UP}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                          r: 4,
                          fill: UP,
                          stroke: "#FFFFFF",
                          strokeWidth: 2,
                        }}
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>


                {/* SECTOR PERFORMANCE */}

                <div className="p-4 md:p-5">

                  <p
                    className="
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.14em]
                      text-[#8A887F]
                      mb-3
                    "
                  >
                    Sector Performance Today (%)
                  </p>


                  <ResponsiveContainer
                    width="100%"
                    height={170}
                  >

                    <BarChart
                      data={sectorData}
                      layout="vertical"
                    >

                      <XAxis
                        type="number"
                        tick={{
                          fontSize: 10,
                          fill: MUTE,
                        }}
                        axisLine={{
                          stroke: GRID,
                        }}
                        tickLine={false}
                      />

                      <YAxis
                        dataKey="sector"
                        type="category"
                        tick={{
                          fontSize: 10,
                          fill: INK_SOFT,
                        }}
                        width={58}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        contentStyle={{
                          fontSize: 11,
                          borderRadius: 0,
                          border: `1px solid ${RULE}`,
                          background: "#FFFFFF",
                          color: INK,
                        }}
                        cursor={{
                          fill: "rgba(23,20,15,0.035)",
                        }}
                      />

                      <Bar
                        dataKey="change"
                        radius={0}
                      >

                        {sectorData.map(
                          (entry, i) => (

                            <Cell
                              key={i}
                              fill={
                                entry.change >= 0
                                  ? UP
                                  : DOWN
                              }
                            />

                          )
                        )}

                      </Bar>

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>


              {/* =================================================
                  TABS
              ================================================= */}

              <div
                className="
                  flex
                  gap-1
                  px-4
                  pt-3
                  border-t
                  border-[#D9D4C7]
                "
              >

                {tabs.map((tab) => (

                  <button
                    key={tab}
                    type="button"
                    onClick={() =>
                      setActiveTab(tab)
                    }
                    className={`
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.14em]
                      px-3
                      py-2.5
                      transition-colors
                      ${
                        activeTab === tab
                          ? "text-[#17140F] border-b-2 border-[#A32F26]"
                          : "text-[#8A887F] border-b-2 border-transparent hover:text-[#3A3934]"
                      }
                    `}
                  >
                    &gt; {tab}
                  </button>

                ))}

              </div>


              {/* =================================================
                  MARKET TABLE
              ================================================= */}

              <div
                className="px-4 pb-5"
                id="markets-table"
              >

                {activeTab === "indices" && (

                  <MarketTable
                    data={marketData.indices as any}
                    cols={[
                      "name",
                      "value",
                      "change",
                      "up",
                    ]}
                  />

                )}


                {activeTab === "crypto" && (

                  <MarketTable
                    data={marketData.crypto as any}
                    cols={[
                      "name",
                      "value",
                      "change",
                      "up",
                    ]}
                  />

                )}

              </div>

            </>

          )}

        </div>


        {/* =================================================
            GLOBAL MARKETS REPORT — editorial wire dispatch
            Matches the column-ruled dispatch pattern used on
            WorldPage / EnergyPage, on the paper background.
        ================================================= */}

        <section id="markets-report" className="mt-16 scroll-mt-6">

          <div className="border-b-2 border-[#17140F] pb-2.5 mb-2 flex items-baseline justify-between">
            <h2 className="uppercase tracking-[0.16em] text-sm font-semibold">
              Global Markets Report
            </h2>
            <span className="font-mono text-[10px] text-[#8A887F]">July 2026 Wrap</span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#8A887F] mb-6">
            1. Global Markets
          </p>

          {/* Key figures strip */}
          <div className="flex items-stretch overflow-x-auto no-scrollbar border border-[#D9D4C7] bg-white mb-10">
            {reportStats.map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 min-w-[130px] px-5 py-4 ${i > 0 ? "border-l border-[#D9D4C7]" : ""}`}
              >
                <p className="text-xl sm:text-2xl font-mono font-semibold tabular-nums text-[#A32F26]">
                  {s.value}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-[#8A887F] mt-1 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* 1.1 Equity Markets */}
          <div className="mb-12">
            <h3 className="text-[13px] uppercase tracking-[0.14em] font-semibold text-[#A32F26] mb-5">
              1.1 &nbsp;Equity Markets
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {equityRegions.map((r) => (
                <div
                  key={r.region}
                  className="border border-[#D9D4C7] bg-white hover:shadow-[0_2px_10px_rgba(23,20,15,0.06)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-baseline gap-2 px-5 pt-4 pb-3 border-b border-[#D9D4C7]">
                    <span className="font-mono text-[11px] font-bold text-[#A32F26]">{r.wire}</span>
                    <span className="text-[11px] text-[#8A887F]">—</span>
                    <h4 className="uppercase tracking-[0.1em] text-xs font-semibold text-[#17140F]">
                      {r.region}
                    </h4>
                  </div>
                  <ul className="flex flex-col gap-3 px-5 py-4">
                    {r.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#A32F26] text-[10px] mt-1.5 shrink-0">▪</span>
                        <p className="text-[13px] leading-relaxed text-[#3A3934]">
                          <Emphasize text={p} />
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 1.2 Fixed Income & Bonds */}
          <div>
            <h3 className="text-[13px] uppercase tracking-[0.14em] font-semibold text-[#A32F26] mb-5">
              1.2 &nbsp;Fixed Income &amp; Bonds
            </h3>
            <div className="border border-[#D9D4C7] bg-white px-6 py-5">
              <ul className="flex flex-col gap-3.5 max-w-3xl">
                {fixedIncomePoints.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#A32F26] text-[10px] mt-1.5 shrink-0">▪</span>
                    <p className="text-[13.5px] leading-relaxed text-[#3A3934]">
                      <Emphasize text={p} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </section>

      </div>


      {/* =====================================================
          GLOBAL STYLES
      ===================================================== */}

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
