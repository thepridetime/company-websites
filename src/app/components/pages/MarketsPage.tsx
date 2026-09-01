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
   Markets gets its own register — a terminal console bolted into the paper page,
   because live numeric feeds read differently from prose and deserve to look like it. */

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

const UP = "#34D399";
const DOWN = "#C1523F";
const GRID = "#3A3934";
const MUTE = "#8A887F";

/* =========================================================
   MARKET TABLE
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
              className={`text-left font-normal py-2.5 border-b border-dashed border-[#3A3934] ${
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
            className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.035] transition-colors"
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
                    ? "font-semibold text-[#EDE9DD]"
                    : "text-[#B8B4A8] tabular-nums"
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

        </div>


        {/* =================================================
            GLOBAL MARKETS DASHBOARD / TERMINAL

            UPDATED:
            - rounded-md
            - overflow-hidden

            Everything else remains unchanged.
        ================================================= */}

        <div
          className="
            bg-[#17140F]
            text-[#EDE9DD]
            border
            border-[#17140F]
            rounded-md
            overflow-hidden
            shadow-[0_1px_0_0_#D9D4C7]
          "
        >

          {/* =================================================
              CONSOLE CHROME
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              px-4
              py-3.5
              border-b
              border-dashed
              border-[#55534C]
            "
          >

            <div className="flex items-center gap-3">

              <span className="flex gap-1.5">

                <span className="w-2 h-2 rounded-full bg-[#C1523F]" />

                <span className="w-2 h-2 rounded-full bg-[#B8752E]" />

                <span className="w-2 h-2 rounded-full bg-emerald-500" />

              </span>

              <span
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  text-[#EDE9DD]/80
                "
              >
                Market Terminal
              </span>

            </div>


            <span
              className="
                font-mono
                text-[9px]
                font-semibold
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
                  border-dashed
                  border-[#55534C]
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
                        font-mono
                        ${
                          i > 0
                            ? "border-l border-[#3A3934]"
                            : ""
                        }
                      `}
                    >

                      <p
                        className="
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
                          text-[15px]
                          text-[#EDE9DD]
                          mt-1
                          tabular-nums
                          font-semibold
                        "
                      >
                        {idx.value}
                      </p>


                      <span
                        className="
                          text-[11px]
                          tabular-nums
                          flex
                          items-center
                          gap-1
                          mt-1
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
                  divide-dashed
                  divide-[#3A3934]
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
                          border:
                            "1px solid #3A3934",
                          background: "#17140F",
                          color: "#EDE9DD",
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
                          stroke: "#17140F",
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
                          fill: "#B8B4A8",
                        }}
                        width={58}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        contentStyle={{
                          fontSize: 11,
                          borderRadius: 0,
                          border:
                            "1px solid #3A3934",
                          background: "#17140F",
                          color: "#EDE9DD",
                        }}
                        cursor={{
                          fill:
                            "rgba(255,255,255,0.03)",
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
                  border-dashed
                  border-[#55534C]
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
                          ? "text-[#EDE9DD] border-b-2 border-[#A32F26]"
                          : "text-[#8A887F] border-b-2 border-transparent hover:text-[#B8B4A8]"
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
