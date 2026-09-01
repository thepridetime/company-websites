import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Download, BookOpen, Clock, ChevronRight, Newspaper } from "lucide-react";
import { Link } from "react-router";
import CVImg from "../../../imports/Coverstory.png";

/* =========================================================
   SECTION HEADER
========================================================= */

function SH({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-6">
      <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
      <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.16em] text-gray-900">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   DATA
========================================================= */

const hero = {
  category: "Deal Tracker",
  title: "Deal Activity Snapshot: May 25 – June 3, 2026   ",
  excerpt:"The last 10 days of May and opening days of June 2026 saw a sustained wave of high-value corporate transactions, spanning gaming, financial services, homebuilding, technology, industrial software, and insurance. Below is a comprehensive tracker of the most significant confirmed deals across all sectors during this period.  ",
  author: "Sagar Kumar",
  time: "May-June 2026",
  image: CVImg,
};

const dealRows = [
  ["Jun 1", "Berkshire Hathaway", "Taylor Morrison Home", "$6.8B", "Real Estate / Homebuilding"],
  ["May 30", "AIG", "Everest Insurance (Colombia)", "Undisclosed", "Insurance / LatAm"],
  ["May 29", "Fertitta Entertainment", "Caesars Entertainment", "$17.6B", "Gaming & Hospitality"],
  ["May 29", "Scotiabank", "Maple Financial Group", "Undisclosed", "Banking & Wealth Mgmt"],
  ["May 28", "Autodesk", "MaintainX", "Undisclosed", "Industrial Software"],
  ["May 28", "GlobalFoundries", "Synopsys Processor IP", "Undisclosed", "Semiconductors / AI"],
  ["May 27", "CordenPharma", "Undisclosed CDMO Target", "Undisclosed", "Pharma Manufacturing"],
  ["May 26", "Laurentide Controls", "C. Latendresse Inc.", "Undisclosed", "Industrial Controls"],
  ["Ongoing", "SoftBank Group", "European Data Center Assets", "Multi-Bn", "AI Infrastructure"],
  ["Q2 2026", "ProCap Financial", "CFO Silvia Inc.", "Undisclosed", "Agentic Finance / AI"],
];

const keyThemes = [
  "AI-driven consolidation continues to dominate technology and semiconductor deal flow, with acquirers seeking to build end-to-end stacks from chip design to application layer.",
  "Financial services deal-making is accelerating as banks and insurers seek scale, geographic diversification, and wealth management capability ahead of anticipated regulatory changes.",
  "Gaming and hospitality mega-deals signal private capital confidence in the durability of integrated entertainment spending despite macroeconomic uncertainty.",
  "Industrial software acquisitions reflect manufacturers' growing demand for connected operations platforms that unify design, build, and maintain workflows.",
];

const covers = [
  { month: "May 2026", headline: "The AI Economy: How Artificial Intelligence is Reshaping Global GDP", subhead: "Plus: World Billionaires · India's Rise · Green Energy Revolution", image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400&h=550&fit=crop", current: true, path: "/technology" },
  { month: "April 2026", headline: "India Rising: The New Superpower Transforming Global Business Dynamics", subhead: "Exclusive CEO Interviews · Markets Special · Leadership 100", image: "https://images.unsplash.com/photo-1761233138997-44d9b002a08f?w=400&h=550&fit=crop&crop=top", current: false, path: "/finance" },
  { month: "March 2026", headline: "Healthcare 2030: The Biotech Revolution Saving Millions of Lives", subhead: "CRISPR · AI Diagnostics · Pharma Rankings · Hospital Innovation", image: "https://images.unsplash.com/photo-1766315746079-215ff5115e9f?w=400&h=550&fit=crop", current: false, path: "/healthcare" },
  { month: "February 2026", headline: "The Electric Future: How EVs Are Rewriting the Rules of Mobility", subhead: "Battery Breakthrough · Charging Infrastructure · Auto Rankings", image: "https://images.unsplash.com/photo-1760012945940-74d6bf54c0fb?w=400&h=550&fit=crop", current: false, path: "/manufacturing" },
  { month: "January 2026", headline: "2026 Outlook: The Trends That Will Define the Global Economy", subhead: "Economic Forecasts · Sector Winners · Key Risks · CEO Survey", image: "https://images.unsplash.com/photo-1679583721525-658d164e609b?w=400&h=550&fit=crop", current: false, path: "/finance" },
  { month: "December 2025", headline: "Person of the Year: The Leaders Who Shaped 2025", subhead: "Annual Awards · 50 Leaders to Watch · Year in Review", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=550&fit=crop", current: false, path: "/leadership" },
];

const dailyStories = [
  { id: 1, time: "6:00 AM IST", title: "Morning Market Brief: Asia Opens Mixed, Shanghai Up 1.2%", category: "Markets" },
  { id: 2, time: "7:30 AM IST", title: "The Pride Times Daily Cover: AI Investment Supercycle Begins", category: "Technology" },
  { id: 3, time: "9:00 AM IST", title: "India Open: RBI Rate Decision Day — Markets Hold Breath", category: "India" },
  { id: 4, time: "12:00 PM IST", title: "Midday Brief: Europe Stocks Up on ECB Signals", category: "Finance" },
  { id: 5, time: "3:30 PM IST", title: "US Pre-Market: Futures Point to Record High Open", category: "Markets" },
  { id: 6, time: "6:00 PM IST", title: "Evening Digest: Today's Top 10 Business Stories", category: "All" },
];

const currentIssueFeatures = [
  "The $2 Trillion AI Investment Wave",
  "Which Sectors Win and Which Get Disrupted",
  "How to Position Your Portfolio",
  "The Human Capital Challenge",
  "Government Policy and AI Governance",
];

/* =========================================================
   MAIN PAGE
========================================================= */

export function CoverStoriesPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-5 mb-10">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black text-white shrink-0">
              <Newspaper size={19} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                Mergers & Acquisitions
              </p>
              <h1 className="mt-1 font-serif text-3xl md:text-[42px] font-bold tracking-tight leading-tight">
                Global M&A Tracker
              </h1>
            </div>
          </div>
        </header>

        {/* =================================================
            HERO
        ================================================= */}

        <article className="group cursor-pointer mb-10">
          <div className="relative overflow-hidden rounded-[2px]">
            <ImageWithFallback
              src={hero.image}
              alt={hero.title}
              className="w-full h-72 lg:h-[420px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />
            <span className="absolute left-4 bottom-4 bg-red-600 text-white px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase rounded-[2px] shadow-sm">
              {hero.category}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-2xl md:text-[36px] font-bold leading-[1.15] text-gray-950 transition-colors duration-200 group-hover:text-red-600">
            {hero.title}
          </h1>

          <p className="text-gray-600 text-sm md:text-[15px] leading-[1.75] mt-3 max-w-4xl">
            {hero.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-gray-200 text-xs text-gray-400">
            <span className="font-medium text-gray-500">By {hero.author}</span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} strokeWidth={2.25} />
              {hero.time}
            </span>
          </div>
        </article>

        {/* =================================================
            RECENT M&A DEALS TABLE
        ================================================= */}

        <section className="mb-14">
          <SH title="Recent M&A Deals" />

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="py-3 pr-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Date</th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Acquirer</th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Target</th>
                  <th className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Value</th>
                  <th className="pl-3 py-3 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 hidden sm:table-cell">Sector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dealRows.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 pr-4 text-gray-500 whitespace-nowrap">{row[0]}</td>
                    <td className="px-3 py-3.5 font-semibold text-gray-900">{row[1]}</td>
                    <td className="px-3 py-3.5 text-gray-600">{row[2]}</td>
                    <td className={`px-3 py-3.5 text-right font-bold tabular-nums whitespace-nowrap ${row[3] === "Undisclosed" ? "text-gray-400 font-medium" : "text-gray-900"}`}>
                      {row[3]}
                    </td>
                    <td className="pl-3 py-3.5 text-xs text-gray-500 hidden sm:table-cell">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================
            KEY THEMES + QUOTE
        ================================================= */}

        <section className="mb-14">
          <SH title="Key Themes in Recent M&A Activity" />

          <ol className="space-y-4">
            {keyThemes.map((theme, i) => (
              <li key={i} className="flex gap-4">
                <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-black text-white text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-[1.75] text-gray-700 pt-0.5">{theme}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 border-l-4 border-red-600 bg-gray-50 pl-6 pr-6 py-6">
            <blockquote className="italic text-[15px] md:text-base leading-[1.75] text-gray-900">
              "Approximately one-third of the 100 largest corporate M&A
              transactions in 2025 cited AI as part of their strategic rationale —
              with Technology, Manufacturing, and Power the most active
              AI-referencing sectors."
            </blockquote>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
              — PwC Global M&A Industry Trends 2026
            </p>
          </div>
        </section>

        {/* =================================================
            DAILY COVER SCHEDULE
        ================================================= */}

        <section className="bg-black text-white rounded-[2px] p-6 md:p-7 mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-5">
            Today's Cover Story Schedule — May 22, 2026
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dailyStories.map((s) => (
              <div
                key={s.id}
                className="border border-white/10 rounded-[2px] p-4 hover:border-white/30 hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={10} strokeWidth={2.25} className="text-gray-500" />
                  <span className="text-[11px] text-gray-500 tabular-nums">{s.time}</span>
                  <span className="text-[10px] font-bold bg-white/10 text-gray-300 px-2 py-0.5 rounded-[2px] ml-auto uppercase tracking-wide">
                    {s.category}
                  </span>
                </div>
                <p className="text-sm text-gray-200 leading-[1.5] transition-colors group-hover:text-white">
                  {s.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            MAGAZINE COVERS ARCHIVE
        ================================================= */}

        <section className="mb-14">
          <SH title="Magazine Covers Archive" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {covers.map((cover) => (
              <Link key={cover.month} to={cover.path} className="group">
                <div className="relative overflow-hidden rounded-[2px] mb-2.5">
                  <ImageWithFallback
                    src={cover.image}
                    alt={cover.month}
                    className="w-full h-60 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  {cover.current && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] tracking-wide">
                      CURRENT
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p className="text-white text-xs font-medium flex items-center gap-1.5">
                        <BookOpen size={11} strokeWidth={2.25} />
                        Read Issue
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em]">{cover.month}</p>
                <p className="text-xs leading-[1.4] mt-1 text-gray-700 transition-colors group-hover:text-red-600">
                  {cover.headline}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* =================================================
            CURRENT ISSUE DEEP DIVE
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 border border-gray-200 rounded-[2px] p-6 md:p-8">
          <div>
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-[0.16em]">
              Current Issue Deep Dive
            </span>

            <h2 className="mt-2 font-serif text-2xl md:text-[28px] font-bold leading-[1.2] text-gray-950">
              {covers[0].headline}
            </h2>

            <p className="text-gray-500 text-sm leading-[1.6] mt-2 mb-5">{covers[0].subhead}</p>

            <ul className="flex flex-col gap-2.5 mb-6">
              {currentIssueFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <ChevronRight size={13} strokeWidth={2.25} className="text-red-600 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <button className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-[2px] hover:bg-gray-800 transition-colors flex items-center gap-2">
                <BookOpen size={14} strokeWidth={2} />
                Read Online
              </button>
              <button className="border border-gray-300 text-sm font-semibold px-5 py-2.5 rounded-[2px] hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-2">
                <Download size={14} strokeWidth={2} />
                Download
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2px]">
            <ImageWithFallback
              src={covers[0].image}
              alt={covers[0].headline}
              className="w-full h-72 lg:h-full object-cover shadow-lg"
            />
          </div>
        </section>

      </div>
    </div>
  );
}
