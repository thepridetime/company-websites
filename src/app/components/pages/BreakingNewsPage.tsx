import { Clock, Zap, ChevronRight, TrendingUp, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";

/* =========================================================
   DATA
========================================================= */

const allBreakingNews = [
  { id: 1, category: "FINANCE", title: "Federal Reserve Announces Surprise 50bps Rate Cut — Biggest in 4 Years", time: "3 min ago", hot: true, priority: "BREAKING", path: "/finance" },
  { id: 2, category: "TECHNOLOGY", title: "OpenAI Launches GPT-5 — Claims Surpasses PhD-Level Performance on All Academic Benchmarks", time: "12 min ago", hot: true, priority: "BREAKING", path: "/technology" },
  { id: 3, category: "WORLD", title: "G20 Emergency Summit Called as Three Major Conflicts Converge", time: "18 min ago", hot: true, priority: "URGENT", path: "/world" },
  { id: 4, category: "MARKETS", title: "S&P 500 Surges 3.2% After Fed Cut — Biggest Single-Day Rally of 2026", time: "24 min ago", hot: true, priority: "BREAKING", path: "/finance" },
  { id: 5, category: "INDIA", title: "RBI Follows Fed with 25bps Cut — Sensex Up 1,400 Points", time: "31 min ago", hot: false, priority: "URGENT", path: "/finance" },
  { id: 6, category: "TECHNOLOGY", title: "Apple Announces 'Reality Pro 2' AR Headset — Ships in 60 Days at $2,499", time: "45 min ago", hot: false, priority: "URGENT", path: "/technology" },
  { id: 7, category: "ENERGY", title: "OPEC+ Emergency Meeting Called — Oil Falls 4% on Demand Fears", time: "52 min ago", hot: false, priority: "URGENT", path: "/energy" },
  { id: 8, category: "CYBERSECURITY", title: "Critical Infrastructure Breach Hits US Power Grid — FBI, CISA Respond", time: "1 hr ago", hot: false, priority: "BREAKING", path: "/cybersecurity" },
  { id: 9, category: "BILLIONAIRES", title: "Jensen Huang's Net Worth Crosses $200 Billion — Joins Ultra-Exclusive Club", time: "1 hr ago", hot: false, priority: "NEWS", path: "/billionaires" },
  { id: 10, category: "HEALTHCARE", title: "WHO Declares New MPOX Strain Public Health Emergency — 14 Countries Affected", time: "1 hr ago", hot: false, priority: "URGENT", path: "/healthcare" },
  { id: 11, category: "MANUFACTURING", title: "TSMC Arizona Fab Achieves 2nm Production Milestone — First Outside Taiwan", time: "2 hrs ago", hot: false, priority: "NEWS", path: "/manufacturing" },
  { id: 12, category: "SUPPLY CHAIN", title: "Red Sea Hostilities Intensify — Container Rates Jump 18% Overnight", time: "2 hrs ago", hot: false, priority: "URGENT", path: "/supply-chain" },
  { id: 13, category: "WORLD", title: "India-Pakistan Border Tensions Ease After US-Brokered Ceasefire Agreement", time: "2 hrs ago", hot: false, priority: "BREAKING", path: "/world" },
  { id: 14, category: "SMART CITIES", title: "Dubai's AI-Powered City Brain Prevents Major Infrastructure Failure Automatically", time: "3 hrs ago", hot: false, priority: "NEWS", path: "/smart-cities" },
  { id: 15, category: "FINANCE", title: "Goldman Sachs Reports $23.4B Record Quarter — Beats All Analyst Estimates", time: "3 hrs ago", hot: false, priority: "NEWS", path: "/finance" },
  { id: 16, category: "TECHNOLOGY", title: "Meta Acquires Quantum Computing Startup IonQ for $8.7B", time: "3 hrs ago", hot: false, priority: "NEWS", path: "/technology" },
  { id: 17, category: "ENERGY", title: "Germany Restarts Three Nuclear Plants Amid Energy Crisis Concerns", time: "4 hrs ago", hot: false, priority: "URGENT", path: "/energy" },
  { id: 18, category: "BILLIONAIRES", title: "Mukesh Ambani Opens World's Largest Retail Mall in Mumbai — 4.5M Sq Ft", time: "4 hrs ago", hot: false, priority: "NEWS", path: "/billionaires" },
  { id: 19, category: "HEALTHCARE", title: "Pfizer's Universal Flu Vaccine Shows 91% Efficacy Across All Strains — Huge Commercial Potential", time: "4 hrs ago", hot: false, priority: "NEWS", path: "/healthcare" },
  { id: 20, category: "WORLD", title: "EU Parliament Votes 523-87 to Admit Ukraine as Full Member State", time: "5 hrs ago", hot: false, priority: "BREAKING", path: "/world" },
];

const priorityColor: Record<string, string> = {
  BREAKING: "bg-red-600 text-white",
  URGENT: "bg-orange-500 text-white",
  NEWS: "bg-gray-800 text-white",
};

/* =========================================================
   MAIN PAGE
========================================================= */

export function BreakingNewsPage() {
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setTicker((t) => (t + 1) % allBreakingNews.length), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* =================================================
            LIVE HEADER (sticky)
        ================================================= */}

        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm flex items-center gap-4 mb-10 pb-6 pt-1 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black text-white shrink-0 relative">
            <Zap size={19} strokeWidth={1.75} className="text-red-500" fill="currentColor" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-600 rounded-full motion-safe:animate-pulse ring-2 ring-white" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
              Live Updates
            </p>
            <h1 className="mt-0.5 font-serif text-3xl md:text-[42px] font-bold tracking-tight leading-tight">
              Breaking News
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Refreshing automatically · May 22, 2026
            </p>
          </div>

          <span className="flex items-center gap-1.5 text-xs font-bold bg-red-600 text-white px-3.5 py-1.5 rounded-[2px] shrink-0">
            <span className="w-1.5 h-1.5 bg-white rounded-full motion-safe:animate-pulse" />
            LIVE
          </span>
        </header>

        {/* =================================================
            TOP 3 FEATURED
        ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {allBreakingNews.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="group border-l-4 border-red-600 pl-4 py-0.5 rounded-r-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              <div className="flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-[2px] tracking-wide ${priorityColor[item.priority]}`}>
                  {item.hot && <Flame size={10} strokeWidth={2.5} />}
                  {item.priority}
                </span>
              </div>

              <h3 className="mt-2.5 font-serif text-lg md:text-xl font-bold leading-[1.25] text-gray-950 transition-colors duration-200 group-hover:text-red-600">
                {item.title}
              </h3>

              <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                <span className="font-semibold text-gray-500 uppercase tracking-wider">{item.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={10} strokeWidth={2.25} />
                  {item.time}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* =================================================
            FULL FEED + TICKER SIDEBAR
        ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Full feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
              <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.16em] text-gray-900 flex-1">
                All Breaking Stories
              </h2>
              <span className="text-[11px] uppercase tracking-wide text-gray-400">
                {allBreakingNews.length} stories
              </span>
            </div>

            <div className="divide-y divide-gray-200">
              {allBreakingNews.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="flex items-start gap-4 py-4 group hover:bg-gray-50 px-2 -mx-2 rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                >
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-[2px] whitespace-nowrap shrink-0 mt-0.5 tracking-wide ${priorityColor[item.priority]}`}>
                    {item.hot && <Flame size={9} strokeWidth={2.5} />}
                    {item.priority}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-[15px] leading-[1.5] text-gray-800 transition-colors group-hover:text-red-600">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                      <span className="font-semibold text-red-600 uppercase tracking-wider">{item.category}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={10} strokeWidth={2.25} />
                        {item.time}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={15}
                    strokeWidth={2}
                    className="text-gray-300 shrink-0 mt-1 motion-safe:transition-all motion-safe:duration-200 group-hover:text-red-600 group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Live ticker sidebar */}
          <div>
            <div className="bg-black text-white rounded-[2px] p-5 lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-4 pb-3.5 border-b border-white/10">
                <div className="w-2 h-2 bg-red-500 rounded-full motion-safe:animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-300">
                  News Ticker
                </span>
              </div>

              <div key={ticker} className="min-h-[92px] mb-4 motion-safe:animate-[fadein_0.4s_ease-out]">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-[2px] tracking-wide ${priorityColor[allBreakingNews[ticker].priority]}`}>
                  {allBreakingNews[ticker].hot && <Flame size={10} strokeWidth={2.5} />}
                  {allBreakingNews[ticker].priority}
                </span>
                <p className="text-sm text-white mt-2.5 leading-[1.5] font-medium">
                  {allBreakingNews[ticker].title}
                </p>
                <span className="text-xs text-gray-500 mt-2 block">
                  {allBreakingNews[ticker].time}
                </span>
              </div>

              <div className="flex gap-1 mb-5">
                {allBreakingNews.slice(0, 8).map((_, i) => (
                  <div
                    key={i}
                    className={`h-[3px] flex-1 rounded-full motion-safe:transition-colors motion-safe:duration-500 ${
                      i === ticker % 8 ? "bg-red-600" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.16em] mb-3">
                  Trending Topics
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Fed Cut", "AI Wars", "OPEC", "Ukraine EU", "NVIDIA", "Red Sea", "RBI"].map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium bg-white/10 text-gray-300 px-2.5 py-1 rounded-[2px] hover:bg-white/20 hover:text-white cursor-pointer motion-safe:transition-all motion-safe:hover:-translate-y-0.5 flex items-center"
                    >
                      <TrendingUp size={9} strokeWidth={2.25} className="mr-1" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
