import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock } from "lucide-react";
import Ener1Img from "../../../imports/Energy1.png";
import Ener2Img from "../../../imports/Energy2.png";
import Ener3Img from "../../../imports/Energy3.png";

/* Same publication system as WorldPage / WhiteHouseWatchPage:
   paper #FAFAF7  ink #17140F  ink-soft #55534C  rule #D9D4C7
   Section signature ink for Energy: bronze #B8752E (vs. World's brick #A32F26) */

const hero = {
  category: "CLEAN ENERGY TRANSITION",
  title: "Data Centers and AI Workloads Force Energy Policy Reversals Globally",
  excerpt:
    "The insatiable power appetite of AI data centers is generating a policy crisis that is reverberating from Ireland to Indiana. Multiple governments that had committed to rapid renewable energy transitions are finding themselves reversing or delaying coal and gas plant retirements to ensure grid stability in the face of surging demand. In the United States, the Department of Energy has authorized emergency grid reliability protocols in five states where data center construction is outpacing transmission infrastructure deployment. Technology companies — led by Microsoft, Google, Amazon, and a growing cohort of AI infrastructure firms — have publicly committed to 100% clean energy procurement. However, the sheer scale of new compute capacity being built is stretching the practical limits of current renewable energy availability, forcing uncomfortable compromises between decarbonization targets and operational reliability.",
  author: "Sagar Kumar",
  time: "1 June 2026",
  briefing: "BRIEFING 041",
  image: Ener1Img,
};
const hero1 = {
  category: "CLEAN ENERGY TRANSITION",
  title: "JP Morgan: Energy Resiliency Now a National Security Imperative",
  excerpt:
    "A joint assessment by JP Morgan's Climate Advisory and Security and Resiliency teams concludes that energy resiliency and diversified energy mix have become essential components of national security strategy. The report, featuring contributions from Dr. Sarah Kapnick and security lead Michael Johnson, argues that the convergence of AI-driven demand growth with geopolitical supply chain risks has elevated grid security from a utility management issue to a strategic priority for heads of state. The analysis identifies dealmaking in power generation, storage, and transmission as the most active M&A subsector within energy in 2026, as utilities, industrial companies, and sovereign wealth funds compete for assets that provide reliable, resilient power generation capacity.",
  author: "Sagar Kumar",
  time: "May 2026",
  image: Ener2Img,
};
const hero2 = {
  category: "CLEAN ENERGY TRANSITION",
  title: "China's Dominant Position in Clean Tech Supply Chains Creates New Risk Calculus",
  excerpt:
    "China's commanding position across clean technology supply chains — spanning solar panels, battery storage, green hydrogen production equipment, and electric vehicle components — continues to shape global deployment trajectories while generating strategic risk for Western economies. S&P Global's Energy Horizons 2026 report identifies this dynamic as a key variable in the outcome of the US-China AI and clean energy race. Western governments are responding through the combination of tariffs, domestic manufacturing incentives, and allied reshoring initiatives. The U.S. Inflation Reduction Act has catalyzed over $300 billion in clean energy commitments, while the European Union's Net-Zero Industry Act is accelerating its own manufacturing base for critical clean technologies. However, analysts note that China's cost advantages in key components are likely to persist for the remainder of this decade.",
  author: "Sagar Kumar",
  time: "May 2026",
  image: Ener3Img,
};

const energyPrices = [
  { commodity: "CRUDE OIL (WTI)", price: "$78.45", unit: "/bbl", change: "-1.23%", up: false },
  { commodity: "BRENT CRUDE", price: "$82.31", unit: "/bbl", change: "-1.05%", up: false },
  { commodity: "NATURAL GAS (HH)", price: "$2.87", unit: "/MMBtu", change: "+0.78%", up: true },
  { commodity: "EUROPEAN TTF GAS", price: "€28.40", unit: "/MWh", change: "+1.23%", up: true },
  { commodity: "COAL (NEWCASTLE)", price: "$124.50", unit: "/t", change: "-2.10%", up: false },
  { commodity: "EU CARBON CREDITS", price: "€68.20", unit: "/t", change: "+3.40%", up: true },
  { commodity: "URANIUM", price: "$92.75", unit: "/lb", change: "+0.50%", up: true },
];

const renewableStories = [
  { id: 1, title: "India's Adani Green Commissions World's Largest Single Solar Plant at 10 GW", time: "1 hr ago", image: "https://images.unsplash.com/photo-1760433116983-76021bd32307?w=400&h=250&fit=crop" },
  { id: 2, title: "Offshore Wind Auction in UK Draws $45B in Investment — Record for Any Energy Sector", time: "3 hrs ago", image: "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?w=400&h=250&fit=crop" },
  { id: 3, title: "China Completes First Commercial Fusion Power Reactor — 50-Year Dream Becomes Reality", time: "6 hrs ago", image: "https://images.unsplash.com/photo-1760553120312-2821bf54e767?w=400&h=250&fit=crop" },
];

const dispatchGroups = [
  {
    code: "CRUDE",
    title: "Oil & Gas",
    stories: [
      { id: 1, title: "Saudi Aramco cuts capex by $12B as peak oil demand moves closer", time: "2 hrs ago" },
      { id: 2, title: "Chevron and ExxonMobil join forces in $50B Permian Basin megadeal", time: "4 hrs ago" },
      { id: 3, title: "Russia's Arctic LNG 2 project faces new equipment shortfall after sanctions tighten", time: "6 hrs ago" },
      { id: 4, title: "OPEC+ compliance rate falls to 87% as Nigeria and Iraq exceed quotas", time: "8 hrs ago" },
    ],
  },
  {
    code: "ATOM",
    title: "Nuclear Power",
    stories: [
      { id: 1, title: "Three new SMR (small modular reactor) designs win NRC approval in the US", time: "3 hrs ago" },
      { id: 2, title: "UK government approves Wylfa nuclear plant restart with £20B guarantee", time: "5 hrs ago" },
      { id: 3, title: "India signs agreement with France to build 6 pressurized water reactors", time: "7 hrs ago" },
    ],
  },
  {
    code: "REG",
    title: "Policy & Regulation",
    stories: [
      { id: 1, title: "Ohio suspends a major data-center tax incentive after AI infrastructure costs surge", time: "Just now" },
      { id: 2, title: "US IRA clean energy tax credits spur $850B in new investment since 2022", time: "1 hr ago" },
      { id: 3, title: "EU carbon border tax takes full effect — imports now priced on emissions", time: "3 hrs ago" },
      { id: 4, title: "G7 energy ministers agree to phase out coal by 2035 in landmark accord", time: "5 hrs ago" },
      { id: 5, title: "India sets world record: 500 GW renewable capacity target 3 years ahead of schedule", time: "7 hrs ago" },
    ],
  },
];

const snapshot = [
  { label: "Cleantech Investment Needed (5 Yrs)", value: "USD 5–8 Trillion (AI infrastructure + enabling systems)" },
  { label: "US IRA Clean Energy Commitments", value: "Over USD 300 Billion catalyzed since 2022" },
  { label: "EU Net-Zero Industry Act", value: "Accelerating European clean tech manufacturing" },
  { label: "Power Demand Driver", value: "AI data centers forcing grid policy reversals globally" },
  { label: "Top Energy Deal Type (2026)", value: "Power generation, storage, and transmission assets" },
];

/* =========================================================
   ENERGY MARKET REPORT — editorial wire content (2.2 Energy)
========================================================= */

const energyReportGroups = [
  {
    code: "OIL",
    title: "Oil Market Volatility",
    points: [
      "July 2026 was one of the most volatile months for crude oil in recent memory, driven by the U.S.–Iran conflict, Strait of Hormuz shipping attacks, and Houthi strikes on Saudi tankers.",
      "U.S. crude oil production is forecast at a record 13.83 million barrels per day in 2026.",
    ],
  },
  {
    code: "GAS",
    title: "Natural Gas",
    points: [
      "U.S. marketed natural gas production is projected to hit a record 122.5 Bcf/d in 2026 (+3.4% YoY), driven by the Permian and Haynesville regions.",
      "Henry Hub spot prices are forecast to average $2.87/MMBtu in Q3 2026, down 50 cents from the July STEO, due to reduced LNG feedgas demand and robust production.",
    ],
  },
  {
    code: "PWR",
    title: "Power & Renewables",
    points: [
      "Solar, hydropower, and wind generation grew by 21%, 9%, and 6% respectively in H1 2026 vs. H1 2025.",
      "Natural gas-fired electricity generation increased 2% in H1 2026 and is forecast to rise further in 2027 as gas prices remain relatively low.",
    ],
    growth: [
      { label: "Solar", value: 21 },
      { label: "Hydropower", value: 9 },
      { label: "Wind", value: 6 },
      { label: "Gas-fired", value: 2 },
    ],
  },
];

const energyReportStats = [
  { value: "13.83M", label: "US crude output, bbl/d (2026F)" },
  { value: "122.5", label: "US gas output, Bcf/d (2026F)" },
  { value: "$2.87", label: "Henry Hub, /MMBtu (Q3 2026F)" },
  { value: "+21%", label: "Solar generation growth, H1 YoY" },
  { value: "+9%", label: "Hydropower growth, H1 YoY" },
  { value: "+6%", label: "Wind growth, H1 YoY" },
];

/** Bolds percentages, currency amounts, and unit figures inline so key
 *  numbers are scannable instead of buried in paragraph text. */
const STAT_RE =
  /([$€¥]\s?[\d.,]+(?:\s?(?:billion|trillion|million))?|-?\d+(?:\.\d+)?%|\d+(?:\.\d+)?\s?(?:million barrels per day|Bcf\/d|\/MMBtu))/g;

function Emphasize({ text, color = "#B8752E" }: { text: string; color?: string }) {
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

function DocketHeader({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex items-baseline justify-between border-b-2 border-[#17140F] pb-2.5 mb-5">
      <h2 className="uppercase tracking-[0.16em] text-sm font-semibold">{title}</h2>
      {note && <span className="font-mono text-[10px] text-[#8A887F] hidden sm:inline">{note}</span>}
    </div>
  );
}

export function EnergyPage() {
  return (
    <main className="bg-[#FAFAF7] text-[#17140F]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Masthead ───────────────────────────────────────── */}
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-[#17140F] py-2 mb-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#55534C]">
          <span className="font-semibold text-[#17140F]">Power &amp; Resources Desk</span>
          <span>Sunday, 30 August 2026 &middot; Edition 118</span>
        </div>
        <div className="border-b-4 border-[#17140F] pb-5 mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight">Energy &amp; Natural Resources</h1>
        </div>

        {/* ── Lead story + exchange board ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 mb-14">
          <div className="group cursor-pointer">
            <div className="overflow-hidden mb-5 border border-[#17140F]/10">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-64 sm:h-80 lg:h-[26rem] object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#B8752E] font-semibold mb-2">
              <span className="border border-[#B8752E] px-1.5 py-0.5 font-mono">{hero.briefing}</span>
              <span className="text-[#55534C]">{hero.category}</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl leading-[1.08] tracking-tight group-hover:text-[#B8752E] transition-colors duration-300
                         first-letter:text-6xl sm:first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:leading-[0.8] first-letter:mr-2 first-letter:mt-1"
            >
              {hero.title}
            </h2>
            <p className="text-[#3A3934] text-sm sm:text-[15px] mt-4 leading-relaxed max-w-2xl">{hero.excerpt}</p>
            <div className="flex items-center gap-3 mt-5 text-xs text-[#8A887F] border-t border-[#17140F]/10 pt-3">
              <span className="uppercase tracking-wide">By {hero.author}</span>
              <span className="w-1 h-1 bg-[#D9D4C7]" />
              <span className="flex items-center gap-1">
                <Clock size={10} /> {hero.time}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            {/* Exchange board — signature element */}
            <div className="bg-[#17140F] text-[#EDE9DD]">
              <div className="px-4 pt-4 pb-2.5 border-b border-dashed border-[#55534C] flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#EDE9DD]/90">
                  ▮ Commodities Board
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#B8752E]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8752E] opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#B8752E]" />
                  </span>
                  LIVE
                </span>
              </div>
              <div className="px-4 divide-y divide-dashed divide-[#3A3934]">
                {energyPrices.map((e) => (
                  <div key={e.commodity} className="py-2.5 flex items-center justify-between font-mono">
                    <span className="text-[10.5px] text-[#B8B4A8] tracking-wide">{e.commodity}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-[#EDE9DD] tabular-nums">
                        {e.price}
                        <span className="text-[#8A887F]">{e.unit}</span>
                      </span>
                      <span
                        className={`text-[10px] tabular-nums w-14 text-right ${
                          e.up ? "text-emerald-400" : "text-[#C1523F]"
                        }`}
                      >
                        {e.up ? "▲" : "▼"} {e.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-3" />
            </div>

            {/* Quote block */}
            <div className="relative border border-[#D9D4C7] bg-white pl-6 pr-5 py-5">
              <span className="absolute left-2.5 top-1 text-4xl leading-none text-[#B8752E]/30 font-serif select-none">
                &ldquo;
              </span>
              <p className="italic text-sm leading-relaxed text-[#17140F] relative">
                AI-driven load growth, grid bottlenecks, cleantech market fragmentation, and geopolitics are
                redefining the terms of progress in 2026&rsquo;s energy landscape.
              </p>
              <p className="mt-3.5 font-semibold text-[#17140F] text-xs uppercase tracking-wide">
                — S&amp;P Global Energy Horizons Top Trends 2026
              </p>
            </div>
          </div>
        </div>

        {/* ── Secondary hero 1 ───────────────────────────────── */}
        <div className="mb-14 group cursor-pointer">
          <div className="relative overflow-hidden mb-4 border border-[#17140F]/10">
            <ImageWithFallback
              src={hero1.image}
              alt={hero1.title}
              className="w-full h-72 lg:h-96 object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            <span className="absolute bottom-4 left-4 text-[10px] text-[#17140F] bg-[#EDE9DD] px-2 py-1 uppercase tracking-[0.14em] font-semibold border border-[#17140F]/10">
              {hero1.category}
            </span>
          </div>
          <h3 className="mt-2 leading-[1.1] font-serif text-2xl md:text-3xl tracking-tight group-hover:text-[#B8752E] transition-colors duration-300">
            {hero1.title}
          </h3>
          <p className="text-[#3A3934] text-sm mt-2.5 leading-relaxed max-w-3xl">{hero1.excerpt}</p>
          <div className="flex items-center gap-3 mt-3.5 text-xs text-[#8A887F] border-t border-[#17140F]/10 pt-3">
            <span className="uppercase tracking-wide">By {hero1.author}</span>
            <span className="w-1 h-1 bg-[#D9D4C7]" />
            <span className="flex items-center gap-1">
              <Clock size={10} /> {hero1.time}
            </span>
          </div>
        </div>

        {/* ── Secondary hero 2 + Industry snapshot ledger ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14 items-start">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden mb-3.5 border border-[#17140F]/10">
              <ImageWithFallback
                src={hero2.image}
                alt={hero2.title}
                className="w-full h-72 lg:h-96 object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] text-[#17140F] bg-[#EDE9DD] px-2 py-1 uppercase tracking-[0.14em] font-semibold border border-[#17140F]/10">
                {hero2.category}
              </span>
            </div>
            <h3 className="mt-2 leading-[1.1] font-serif text-2xl md:text-3xl tracking-tight group-hover:text-[#B8752E] transition-colors duration-300">
              {hero2.title}
            </h3>
            <p className="text-[#3A3934] text-sm mt-2.5 leading-relaxed">{hero2.excerpt}</p>
            <div className="flex items-center gap-3 mt-3.5 text-xs text-[#8A887F] border-t border-[#17140F]/10 pt-3">
              <span className="uppercase tracking-wide">By {hero2.author}</span>
              <span className="w-1 h-1 bg-[#D9D4C7]" />
              <span className="flex items-center gap-1">
                <Clock size={10} /> {hero2.time}
              </span>
            </div>
          </div>

          <div>
            <DocketHeader title="Industry Snapshot" />
            <div>
              {snapshot.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3.5 border-b border-[#D9D4C7] ${
                    i === 0 ? "border-t border-[#D9D4C7]" : ""
                  }`}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#B8752E] sm:w-2/5 shrink-0">
                    {row.label}
                  </span>
                  <span className="text-sm text-[#17140F] leading-snug">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Renewables gallery ─────────────────────────────── */}
        <section className="mb-14">
          <DocketHeader title="Renewable Energy" note="3 STORIES TODAY" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {renewableStories.map((s) => (
              <div key={s.id} className="group cursor-pointer">
                <div className="overflow-hidden mb-3 relative border border-[#17140F]/10">
                  <ImageWithFallback
                    src={s.image}
                    alt={s.title}
                    className="w-full h-40 object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-wider text-white bg-[#17140F]/70 px-1.5 py-0.5">
                    Renew
                  </span>
                </div>
                <h3 className="text-sm leading-snug text-[#17140F] group-hover:text-[#B8752E] transition-colors duration-300">
                  {s.title}
                </h3>
                <span className="text-[11px] text-[#8A887F] flex items-center gap-1 mt-2 tracking-wide uppercase">
                  <Clock size={10} />
                  {s.time}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Energy Market Report — editorial wire dispatch (2.2 Energy) ── */}
        <section className="mb-14">
          <div className="border-b-2 border-[#17140F] pb-2.5 mb-2 flex items-baseline justify-between">
            <h2 className="uppercase tracking-[0.16em] text-sm font-semibold">Energy Market Report</h2>
            <span className="font-mono text-[10px] text-[#8A887F]">July 2026 Wrap</span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#8A887F] mb-6">2.2 &nbsp;Energy</p>

          {/* Key figures strip */}
          <div className="flex items-stretch overflow-x-auto no-scrollbar border border-[#D9D4C7] bg-white mb-8">
            {energyReportStats.map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 min-w-[140px] px-5 py-4 ${i > 0 ? "border-l border-[#D9D4C7]" : ""}`}
              >
                <p className="text-xl sm:text-2xl font-mono font-semibold tabular-nums text-[#B8752E]">
                  {s.value}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-[#8A887F] mt-1 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {energyReportGroups.map((group) => (
              <div
                key={group.code}
                className="border border-[#D9D4C7] bg-white hover:shadow-[0_2px_10px_rgba(23,20,15,0.06)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-baseline gap-2 px-6 pt-4 pb-3 border-b border-[#D9D4C7]">
                  <span className="font-mono text-[11px] font-bold text-[#B8752E]">{group.code}</span>
                  <span className="text-[11px] text-[#8A887F]">—</span>
                  <h3 className="uppercase tracking-[0.1em] text-xs font-semibold text-[#17140F]">
                    {group.title}
                  </h3>
                </div>
                <ul className="flex flex-col gap-3 px-6 pt-5">
                  {group.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#B8752E] text-[10px] mt-1.5 shrink-0">▪</span>
                      <p className="text-[13.5px] leading-relaxed text-[#3A3934]">
                        <Emphasize text={p} />
                      </p>
                    </li>
                  ))}
                </ul>

                {group.growth && (
                  <div className="px-6 pb-5 pt-4 mt-1">
                    <p className="text-[9.5px] uppercase tracking-wider text-[#8A887F] mb-2.5">
                      Generation growth, H1 2026 vs. H1 2025
                    </p>
                    <div className="flex flex-col gap-2">
                      {group.growth.map((g) => {
                        const max = Math.max(...group.growth!.map((x) => x.value));
                        return (
                          <div key={g.label} className="flex items-center gap-2.5">
                            <span className="text-[10.5px] text-[#55534C] w-[68px] shrink-0">{g.label}</span>
                            <div className="flex-1 h-1.5 bg-[#F0EDE5] overflow-hidden">
                              <div
                                className="h-full bg-[#B8752E]"
                                style={{ width: `${(g.value / max) * 100}%` }}
                              />
                            </div>
                            <span className="text-[10.5px] font-mono font-semibold text-[#B8752E] w-7 text-right shrink-0">
                              +{g.value}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Oil/Gas + Nuclear + Policy — column-ruled dispatches ── */}
        <section>
          <div className="border-b-2 border-[#17140F] pb-2.5 mb-6">
            <h2 className="uppercase tracking-[0.16em] text-sm font-semibold">Sector Dispatches</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D9D4C7]">
            {dispatchGroups.map((group) => (
              <div key={group.code} className="pb-8 md:pb-0 md:px-6 md:first:pl-0 md:last:pr-0">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-mono text-[11px] font-bold text-[#B8752E]">{group.code}</span>
                  <span className="text-[11px] text-[#8A887F]">—</span>
                  <h3 className="uppercase tracking-[0.1em] text-xs font-semibold text-[#17140F]">{group.title}</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {group.stories.map((s) => (
                    <div key={s.id} className="group cursor-pointer">
                      <p className="text-[13.5px] leading-snug text-[#17140F] group-hover:text-[#B8752E] transition-colors">
                        {s.title}
                      </p>
                      <span className="text-[10px] text-[#8A887F] flex items-center gap-1 mt-1.5 tracking-wide uppercase">
                        <Clock size={9} /> {s.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
