import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, Globe } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Design tokens (informal — see inline classes)
   paper   #FAFAF7   ink   #17140F   ink-soft #55534C
   rule    #D9D4C7   wire  #A32F26 (brick red, used sparingly)
   navy    #2F4858 (diplomacy/status ink)
───────────────────────────────────────────────────────── */

const worldHero = {
  category: "WHITE HOUSE WATCH",
  title: "President Orders Sweeping Trade Negotiations with 15 Nations — Biggest Diplomatic Push in a Decade",
  excerpt:
    "A historic economic summit convenes at Camp David as the administration seeks to reshape global trade architecture, targeting $2 trillion in new bilateral agreements spanning Asia, Europe, and the Americas.",
  author: "Sagar Kumar",
  time: "1 hour ago",
  dateline: "WASHINGTON",
  image:
    "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwY292ZXIlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzc5Mzg1OTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
};

const whiteHouseNews = [
  { id: 1, title: "Administration proposes $500B Infrastructure Revival Act, largest since New Deal", time: "3H AGO", tag: "POLICY" },
  { id: 2, title: "Cybersecurity advisor warns of elevated nation-state threat level", time: "5H AGO", tag: "SECURITY" },
  { id: 3, title: "Executive order targets AI chip export controls to adversary nations", time: "7H AGO", tag: "TECH" },
  { id: 4, title: "Treasury issues new sanctions on Russian energy sector", time: "9H AGO", tag: "SANCTIONS" },
  { id: 5, title: "Council of Economic Advisors raises GDP forecast to 2.8%", time: "11H AGO", tag: "ECONOMY" },
  { id: 6, title: "President nominates former Fed governor as next Commerce Secretary", time: "13H AGO", tag: "APPOINTMENT" },
];

const globalRegions = [
  {
    wire: "AP",
    region: "Asia Pacific",
    stories: [
      { id: 1, title: "India-US strategic partnership elevates to 'Comprehensive Global Alliance' status", time: "2 hrs ago" },
      { id: 2, title: "China's PBOC cuts reserve requirements to boost sluggish property market", time: "4 hrs ago" },
      { id: 3, title: "ASEAN summit agrees on new regional currency swap framework", time: "6 hrs ago" },
      { id: 4, title: "Japan ramps up defense budget to record 2.3% of GDP", time: "8 hrs ago" },
    ],
  },
  {
    wire: "RTR",
    region: "Europe",
    stories: [
      { id: 1, title: "EU announces €500B defence and security investment plan for 2026–2030", time: "3 hrs ago" },
      { id: 2, title: "Germany's new government unveils €200B economic modernisation package", time: "5 hrs ago" },
      { id: 3, title: "NATO summit agrees to expand rapid reaction force to 500,000 troops", time: "7 hrs ago" },
      { id: 4, title: "UK-EU trade deal enters final ratification stage after 3-year negotiation", time: "9 hrs ago" },
    ],
  },
  {
    wire: "DPA",
    region: "Middle East & Africa",
    stories: [
      { id: 1, title: "Saudi Arabia's Vision 2030 surpasses economic diversification targets by 40%", time: "4 hrs ago" },
      { id: 2, title: "UAE launches world's first carbon-negative industrial free zone", time: "6 hrs ago" },
      { id: 3, title: "African Continental Free Trade Area reports $300B in intra-Africa trade", time: "8 hrs ago" },
      { id: 4, title: "Egypt's new administrative capital becomes hub for global tech investment", time: "10 hrs ago" },
    ],
  },
  {
    wire: "AFP",
    region: "Americas",
    stories: [
      { id: 1, title: "Brazil's Lula unveils Amazon digital economy initiative worth $80B", time: "3 hrs ago" },
      { id: 2, title: "Mexico surpasses China as US's largest trading partner for third consecutive year", time: "5 hrs ago" },
      { id: 3, title: "Canada's AI investment fund attracts $12B in international capital", time: "7 hrs ago" },
      { id: 4, title: "G7 leaders agree on new framework for regulating global AI development", time: "9 hrs ago" },
    ],
  },
];

const geopoliticsAlerts = [
  { id: 1, severity: "high", title: "Taiwan Strait tension rises as China conducts military exercises", region: "Asia Pacific" },
  { id: 2, severity: "medium", title: "Iran nuclear talks stall again; IAEA calls for emergency session", region: "Middle East" },
  { id: 3, severity: "low", title: "South China Sea territorial dispute referred to international court", region: "Asia Pacific" },
  { id: 4, severity: "medium", title: "Sudan peace agreement unravels as conflict spreads to new regions", region: "Africa" },
];

const unResolutions = [
  { id: 1, title: "UN Security Council passes historic resolution on AI weapons systems governance", votes: "14–1" },
  { id: 2, title: "General Assembly votes 187-2 for global plastic treaty with binding targets", votes: "187–2" },
  { id: 3, title: "WHO declares end to global health emergency framework for COVID-related viruses", votes: "UNANIMOUS" },
];

const diplomacyTracker = [
  { country1: "USA", country2: "India", status: "Active", type: "Technology Partnership", date: "MAY '26" },
  { country1: "EU", country2: "UK", status: "Finalizing", type: "Trade Agreement", date: "MAY '26" },
  { country1: "China", country2: "Russia", status: "Signed", type: "Energy Deal", date: "APR '26" },
  { country1: "Brazil", country2: "EU", status: "Negotiating", type: "Mercosur Trade", date: "MAR '26" },
  { country1: "Japan", country2: "S. Korea", status: "Active", type: "Security Pact", date: "FEB '26" },
];

const severityLabel: Record<string, string> = { high: "HIGH", medium: "MED", low: "LOW" };
const severityInk: Record<string, string> = {
  high: "text-[#A32F26]",
  medium: "text-[#8A6A1F]",
  low: "text-[#2F4858]",
};

const statusInk: Record<string, string> = {
  Signed: "text-emerald-800",
  Active: "text-[#2F4858]",
  Finalizing: "text-[#8A6A1F]",
  Negotiating: "text-[#55534C]",
};

export function WorldPage() {
  return (
    <main className="bg-[#FAFAF7] text-[#17140F]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Masthead / dateline strip ─────────────────────── */}
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-[#17140F] py-2 mb-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#55534C]">
          <span className="flex items-center gap-2 font-semibold text-[#17140F]">
            <Globe size={12} /> World Desk
          </span>
          <span>Sunday, 30 August 2026 &middot; Edition 118</span>
        </div>
        <div className="flex items-center justify-between border-b-4 border-[#17140F] pb-5 mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight">World &amp; Geopolitics</h1>
          <span className="hidden sm:block text-xs uppercase tracking-[0.2em] text-[#A32F26] font-semibold">
            Dispatches &amp; Analysis
          </span>
        </div>

        {/* ── Lead story (drop cap) + wire ticker ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 mb-14">
          <div className="group cursor-pointer">
            <div className="overflow-hidden mb-5 border border-[#17140F]/10">
              <ImageWithFallback
                src={worldHero.image}
                alt={worldHero.title}
                className="w-full h-64 sm:h-80 lg:h-[26rem] object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#A32F26] font-semibold mb-2">
              <span className="border border-[#A32F26] px-1.5 py-0.5">{worldHero.dateline}</span>
              <span className="text-[#55534C]">{worldHero.category}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.08] tracking-tight group-hover:text-[#A32F26] transition-colors duration-300
                            first-letter:font-serif first-letter:text-6xl sm:first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:leading-[0.8] first-letter:mr-2 first-letter:mt-1">
              {worldHero.title}
            </h2>
            <p className="text-[#3A3934] text-sm sm:text-[15px] mt-4 leading-relaxed max-w-2xl">{worldHero.excerpt}</p>
            <div className="flex items-center gap-3 mt-5 text-xs text-[#8A887F] border-t border-[#17140F]/10 pt-3">
              <span className="uppercase tracking-wide">By {worldHero.author}</span>
              <span className="w-1 h-1 bg-[#D9D4C7]" />
              <span className="flex items-center gap-1">
                <Clock size={10} /> {worldHero.time}
              </span>
            </div>
          </div>

          {/* Wire ticker — signature element */}
          <div className="bg-[#17140F] text-[#EDE9DD] relative">
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-[repeating-radial-gradient(circle_at_4px_10px,#FAFAF7_0px,#FAFAF7_1.5px,transparent_1.5px,transparent_12px)] opacity-30" />
            <div className="pl-5 pr-4 pt-4 pb-2 border-b border-dashed border-[#55534C] flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#EDE9DD]/90">
                ▮ White House Wire
              </span>
              <span className="font-mono text-[9px] text-[#A32F26]">LIVE</span>
            </div>
            <div className="pl-5 pr-4 divide-y divide-dashed divide-[#3A3934]">
              {whiteHouseNews.map((item) => (
                <div key={item.id} className="py-3 font-mono group/wire cursor-pointer">
                  <div className="flex items-center gap-2 text-[9px] text-[#A32F26] tracking-wider">
                    <span>[{item.tag}]</span>
                    <span className="text-[#8A887F]">{item.time}</span>
                  </div>
                  <p className="text-[12.5px] leading-snug mt-1 text-[#EDE9DD]/95 group-hover/wire:text-white transition-colors">
                    {item.title.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
            <div className="h-3" />
          </div>
        </div>

        {/* ── Risk ledger ────────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between border-b-2 border-[#17140F] pb-2 mb-1">
            <h2 className="uppercase tracking-[0.16em] text-sm font-semibold">Geopolitical Risk Monitor</h2>
            <span className="font-mono text-[10px] text-[#8A887F]">{geopoliticsAlerts.length} FLAGGED</span>
          </div>
          <div>
            {geopoliticsAlerts.map((alert, i) => (
              <div
                key={alert.id}
                className={`flex items-center gap-4 py-3 border-b border-[#D9D4C7] hover:bg-[#17140F]/[0.025] transition-colors cursor-pointer ${
                  i === 0 ? "border-t border-[#D9D4C7]" : ""
                }`}
              >
                <span className={`font-mono text-[11px] font-bold w-9 shrink-0 ${severityInk[alert.severity]}`}>
                  {severityLabel[alert.severity]}
                </span>
                <p className="text-sm text-[#17140F] flex-1 leading-snug">{alert.title}</p>
                <span className="hidden sm:block text-[11px] text-[#8A887F] uppercase tracking-wide shrink-0">
                  {alert.region}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Regional dispatches — column-ruled wire feed ──── */}
        <section className="mb-14">
          <div className="border-b-2 border-[#17140F] pb-2 mb-6">
            <h2 className="uppercase tracking-[0.16em] text-sm font-semibold">Regional Dispatches</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y xl:divide-y-0 xl:divide-x divide-[#D9D4C7]">
            {globalRegions.map((region) => (
              <div key={region.region} className="pb-8 xl:pb-0 xl:px-6 xl:first:pl-0 xl:last:pr-0">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-mono text-[11px] font-bold text-[#A32F26]">{region.wire}</span>
                  <span className="text-[11px] text-[#8A887F]">—</span>
                  <h3 className="uppercase tracking-[0.1em] text-xs font-semibold text-[#17140F]">{region.region}</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {region.stories.map((s) => (
                    <div key={s.id} className="group cursor-pointer">
                      <p className="text-[13.5px] leading-snug text-[#17140F] group-hover:text-[#A32F26] transition-colors">
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

        {/* ── UN ledger + Diplomacy register ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* UN resolutions */}
          <section>
            <div className="border-b-2 border-[#17140F] pb-2 mb-1">
              <h2 className="uppercase tracking-[0.16em] text-sm font-semibold">UN &amp; International Bodies</h2>
            </div>
            <div>
              {unResolutions.map((r, i) => (
                <div
                  key={r.id}
                  className={`flex items-start gap-4 py-3.5 border-b border-[#D9D4C7] hover:bg-[#17140F]/[0.025] transition-colors cursor-pointer ${
                    i === 0 ? "border-t border-[#D9D4C7]" : ""
                  }`}
                >
                  <span className="font-mono text-[11px] text-[#8A887F] shrink-0 mt-0.5">
                    DOC.{String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-[#17140F] leading-snug flex-1">{r.title}</p>
                  <span className="font-mono text-[11px] text-[#17140F] font-semibold shrink-0">{r.votes}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Diplomacy tracker — treaty register */}
          <section>
            <div className="border-b-2 border-[#17140F] pb-2 mb-1 flex items-baseline justify-between">
              <h2 className="uppercase tracking-[0.16em] text-sm font-semibold">Diplomacy Tracker</h2>
              <span className="text-[10px] text-[#8A887F] uppercase tracking-wide hidden sm:inline">
                Active negotiations
              </span>
            </div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-[#8A887F]">
                  <th className="text-left font-normal py-2">Parties</th>
                  <th className="text-left font-normal py-2 hidden sm:table-cell">Type</th>
                  <th className="text-right font-normal py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {diplomacyTracker.map((d, i) => (
                  <tr key={i} className="border-t border-[#D9D4C7] hover:bg-[#17140F]/[0.025] transition-colors">
                    <td className="py-3 text-[13.5px] font-medium text-[#17140F]">
                      {d.country1} <span className="text-[#B8B4A8]">/</span> {d.country2}
                    </td>
                    <td className="py-3 text-xs text-[#55534C] hidden sm:table-cell">{d.type}</td>
                    <td className="py-3 text-right">
                      <span className={`font-mono text-[10px] uppercase tracking-wide font-semibold ${statusInk[d.status] ?? "text-[#55534C]"}`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  );
}
