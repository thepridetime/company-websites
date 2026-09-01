import { Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/* Same publication system as WorldPage.tsx:
   paper #FAFAF7  ink #17140F  ink-soft #55534C
   rule  #D9D4C7  wire #A32F26 (brick, sparing)  navy #2F4858 */

const hero = {
  category: "WHITE HOUSE WATCH",
  title:
    "President Signs Executive Order Establishing $500B National AI Infrastructure Fund — Largest Government Tech Investment in US History",
  excerpt:
    "The order establishes a bipartisan National AI Commission, mandates AI integration across all federal agencies within 24 months, and creates tax incentives for AI R&D investment. Congress is expected to approve the funding package in a separate vote.",
  author: "Sagar Kumar",
  time: "2 hours ago",
  citation: "EO 14298",
  image:
    "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

const administrationActions = [
  { id: 1, docket: "EO 14298", type: "EXECUTIVE ORDER", title: "National AI Infrastructure Investment and Governance Framework", date: "MAY 22, 2026", impact: "High" },
  { id: 2, docket: "WH-2211", type: "STATEMENT", title: "White House Issues Statement on Cybersecurity Breach of Federal Systems", date: "MAY 21, 2026", impact: "High" },
  { id: 3, docket: "USTR-088", type: "TRADE POLICY", title: "USTR Announces New Tariff Framework for Semiconductor Imports from China", date: "MAY 20, 2026", impact: "High" },
  { id: 4, docket: "SEN-078", type: "APPOINTMENT", title: "Senate Confirms New Treasury Secretary in 78-21 Vote", date: "MAY 19, 2026", impact: "Medium" },
  { id: 5, docket: "PB-0519", type: "PRESS BRIEFING", title: "Press Secretary: No Recession Expected Despite Q1 GDP Miss", date: "MAY 18, 2026", impact: "Medium" },
];

const stages = ["Introduced", "Committee", "Floor Vote", "Signed"] as const;
const policyTrackers = [
  { policy: "AI Governance Bill", chamber: "Senate", stage: 1 },
  { policy: "$500B Infrastructure Fund", chamber: "White House", stage: 3 },
  { policy: "CHIPS Act Extension", chamber: "House", stage: 2 },
  { policy: "Financial Regulation Reform", chamber: "Senate", stage: 0 },
  { policy: "Clean Energy Tax Credits 2.0", chamber: "Both", stage: 3 },
];

const economicData = [
  { metric: "GDP Growth (Q1 2026)", value: "2.8%", delta: "-0.3%", good: true },
  { metric: "Unemployment Rate", value: "3.6%", delta: "-0.2%", good: true },
  { metric: "Core Inflation (CPI)", value: "2.1%", delta: "-0.3%", good: true },
  { metric: "Federal Funds Rate", value: "4.75%", delta: "-0.50%", good: true },
  { metric: "10Y Treasury Yield", value: "4.32%", delta: "+0.05%", good: false },
  { metric: "Federal Deficit (FY2026)", value: "$1.87T", delta: "+$180B", good: false },
];

const latestNews = [
  { id: 1, title: "White House cybersecurity advisor raises threat level to 'elevated' after grid breach", time: "1 hr ago" },
  { id: 2, title: "Administration begins formal trade negotiations with 15 nations simultaneously", time: "3 hrs ago" },
  { id: 3, title: "President orders review of all federal contracts with companies having ties to China", time: "5 hrs ago" },
  { id: 4, title: "NSC convenes emergency meeting over escalating situation in South China Sea", time: "7 hrs ago" },
  { id: 5, title: "White House budget office projects $2.1T deficit for FY2027 — markets react negatively", time: "9 hrs ago" },
  { id: 6, title: "President meets with top 20 CEOs to discuss AI job displacement solutions", time: "11 hrs ago" },
];

const impactInk: Record<string, string> = {
  High: "text-[#A32F26]",
  Medium: "text-[#8A6A1F]",
  Low: "text-[#55534C]",
};

function DocketHeader({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex items-baseline justify-between border-b-2 border-[#17140F] pb-2 mb-1">
      <h2 className="uppercase tracking-[0.16em] text-sm font-semibold">{title}</h2>
      {note && <span className="font-mono text-[10px] text-[#8A887F] hidden sm:inline">{note}</span>}
    </div>
  );
}

export function WhiteHouseWatchPage() {
  return (
    <main className="bg-[#FAFAF7] text-[#17140F]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Masthead ───────────────────────────────────────── */}
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-[#17140F] py-2 mb-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#55534C]">
          <span className="flex items-center gap-2 font-semibold text-[#17140F]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A32F26] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A32F26]" />
            </span>
            Live Coverage
          </span>
          <span>Executive Docket &middot; 118th Session</span>
        </div>
        <div className="border-b-4 border-[#17140F] pb-5 mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight">White House Watch</h1>
        </div>

        {/* ── Lead story + policy tracker ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 mb-14">
          <div className="group cursor-pointer">
            <div className="overflow-hidden mb-5 border border-[#17140F]/10">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-64 sm:h-80 lg:h-[26rem] object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#A32F26] font-semibold mb-2">
              <span className="border border-[#A32F26] px-1.5 py-0.5 font-mono">{hero.citation}</span>
              <span className="text-[#55534C]">{hero.category}</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl leading-[1.08] tracking-tight group-hover:text-[#A32F26] transition-colors duration-300
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

          {/* Policy tracker — legislative pipeline */}
          <div>
            <DocketHeader title="Policy Tracker" />
            <div className="flex flex-col">
              {policyTrackers.map((p, i) => (
                <div
                  key={p.policy}
                  className={`py-4 border-b border-[#D9D4C7] ${i === 0 ? "border-t border-[#D9D4C7]" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <p className="text-sm leading-snug text-[#17140F] font-medium">{p.policy}</p>
                    <span className="font-mono text-[10px] text-[#8A887F] whitespace-nowrap shrink-0 uppercase tracking-wide">
                      {p.chamber}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {stages.map((stage, si) => (
                      <div key={stage} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              si <= p.stage ? "bg-[#A32F26]" : "bg-[#D9D4C7]"
                            }`}
                          />
                          <span
                            className={`text-[8.5px] uppercase tracking-wide whitespace-nowrap ${
                              si <= p.stage ? "text-[#17140F] font-semibold" : "text-[#B8B4A8]"
                            }`}
                          >
                            {stage}
                          </span>
                        </div>
                        {si < stages.length - 1 && (
                          <span
                            className={`h-px flex-1 -mt-4 ${si < p.stage ? "bg-[#A32F26]" : "bg-[#D9D4C7]"}`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Administration actions — docket table ─────────── */}
        <section className="mb-14">
          <DocketHeader title="Administration Actions" note={`${administrationActions.length} ENTRIES THIS WEEK`} />
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-[#8A887F]">
                <th className="text-left font-normal py-2 hidden sm:table-cell">Docket</th>
                <th className="text-left font-normal py-2">Action</th>
                <th className="text-left font-normal py-2 hidden md:table-cell">Date</th>
                <th className="text-right font-normal py-2">Impact</th>
              </tr>
            </thead>
            <tbody>
              {administrationActions.map((a) => (
                <tr key={a.id} className="border-t border-[#D9D4C7] hover:bg-[#17140F]/[0.025] transition-colors group cursor-pointer">
                  <td className="py-3 font-mono text-xs text-[#8A887F] whitespace-nowrap hidden sm:table-cell">{a.docket}</td>
                  <td className="py-3">
                    <span className="text-[10px] uppercase tracking-wide text-[#8A887F] block sm:hidden mb-0.5">
                      {a.type}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-[#8A887F] hidden sm:block mb-0.5">
                      {a.type}
                    </span>
                    <span className="text-[#17140F] group-hover:text-[#A32F26] transition-colors leading-snug">
                      {a.title}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-[11px] text-[#8A887F] hidden md:table-cell whitespace-nowrap">
                    {a.date}
                  </td>
                  <td className="py-3 text-right">
                    <span className={`font-mono text-[10px] uppercase tracking-wide font-bold ${impactInk[a.impact]}`}>
                      {a.impact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Economic plate + latest wire ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section>
            <DocketHeader title="Key Economic Indicators" />
            <div>
              {economicData.map((e, i) => (
                <div
                  key={e.metric}
                  className={`py-3 flex items-center justify-between border-b border-[#D9D4C7] ${
                    i === 0 ? "border-t border-[#D9D4C7]" : ""
                  }`}
                >
                  <p className="text-sm text-[#17140F]">{e.metric}</p>
                  <div className="text-right">
                    <p className="text-sm font-mono font-semibold text-[#17140F]">{e.value}</p>
                    <p className={`text-[11px] font-mono ${e.good ? "text-emerald-800" : "text-[#A32F26]"}`}>
                      {e.delta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <DocketHeader title="Latest from the White House" />
            <div>
              {latestNews.map((n, i) => (
                <div
                  key={n.id}
                  className={`py-3.5 group cursor-pointer border-b border-[#D9D4C7] ${
                    i === 0 ? "border-t border-[#D9D4C7]" : ""
                  }`}
                >
                  <p className="text-sm text-[#17140F] leading-snug group-hover:text-[#A32F26] transition-colors">
                    {n.title}
                  </p>
                  <span className="text-[11px] text-[#8A887F] flex items-center gap-1 mt-1.5 tracking-wide uppercase">
                    <Clock size={9} /> {n.time}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
