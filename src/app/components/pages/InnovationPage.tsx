import { Clock, Lightbulb, Rocket, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/* =========================================================
   SECTION HEADER
========================================================= */

function SH({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-5">
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
  category: "INNOVATION OF THE YEAR",
  title: "Solid-State Batteries Cross the Commercialization Threshold — Toyota's QuantumBattery Changes Everything",
  excerpt: "After decades of laboratory promise, Toyota's solid-state QuantumBattery enters mass production: 800-mile EV range, 8-minute fast charge, 20-year lifespan, and 40% lower cost than lithium-ion. The technology will reshape energy storage, electric vehicles, and grid infrastructure simultaneously.",
  author: "Sagar Kumar",
  time: "4 hours ago",
  image: "https://images.unsplash.com/photo-1760012945940-74d6bf54c0fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

const innovationAwards = [
  { rank: 1, category: "Energy Storage", innovation: "Toyota QuantumBattery", company: "Toyota Motor Corp", impact: "Transforms EV economics globally" },
  { rank: 2, category: "AI / Computing", innovation: "NVIDIA Blackwell Ultra GPU", company: "NVIDIA", impact: "40x speed gain for LLM training" },
  { rank: 3, category: "Biotechnology", innovation: "mRNA Universal Cancer Vaccine", company: "BioNTech / Moderna", impact: "94% efficacy across 6 cancer types" },
  { rank: 4, category: "Space Tech", innovation: "Starship Full Reusability", company: "SpaceX", impact: "Reduces launch cost 100x" },
  { rank: 5, category: "Agriculture", innovation: "Precision Fermentation Protein", company: "Impossible Foods", impact: "Eliminates 90% of land use for protein" },
];

const startupWatch = [
  { name: "Isomorphic Labs", focus: "AI Drug Discovery", funding: "$600M Series B", stage: "Growth", country: "UK" },
  { name: "Commonwealth Fusion", focus: "Compact Fusion Energy", funding: "$1.8B raised", stage: "Pre-revenue", country: "USA" },
  { name: "Orbital Composites", focus: "In-Space Manufacturing", funding: "$120M Series A", stage: "Early", country: "USA" },
  { name: "Syngenta Digital", focus: "AI Precision Agriculture", funding: "$350M", stage: "Growth", country: "Switzerland" },
  { name: "Niramai", focus: "AI Breast Cancer Screening", funding: "$45M", stage: "Early", country: "India" },
];

const researchBreakthroughs = [
  { id: 1, institution: "MIT", title: "Room-Temperature Superconductor Verified in Independent Tests — Nobel Prize Likely", time: "2 hrs ago" },
  { id: 2, institution: "Stanford", title: "AI Model Predicts Climate Change Tipping Points 10 Years in Advance with 87% Accuracy", time: "4 hrs ago" },
  { id: 3, institution: "IISc Bangalore", title: "Indian Researchers Develop World's Most Efficient Solar Cell at 47.1% Efficiency", time: "6 hrs ago" },
  { id: 4, institution: "Oxford", title: "Quantum Computer Solves 50-Year-Old Protein Folding Problem in 3 Seconds", time: "8 hrs ago" },
];

const techTrends = [
  { trend: "Agentic AI", desc: "AI systems that plan, execute, and self-correct across complex multi-step workflows", growth: "+340% YoY adoption" },
  { trend: "Spatial Computing", desc: "Merging physical and digital worlds through AR/VR/MR platforms", growth: "+127% YoY adoption" },
  { trend: "Synthetic Biology", desc: "Programming living organisms for medicine, materials, and food production", growth: "+89% YoY funding" },
  { trend: "Neuromorphic Chips", desc: "Brain-inspired computing that delivers AI at 1000x lower power consumption", growth: "+210% YoY research" },
];

/* =========================================================
   STAGE BADGE HELPER
========================================================= */

const stageBadge: Record<string, string> = {
  Growth: "bg-green-50 text-green-700",
  Early: "bg-blue-50 text-blue-700",
  "Pre-revenue": "bg-amber-50 text-amber-700",
};

/* =========================================================
   MAIN PAGE
========================================================= */

export function InnovationPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-5 mb-10">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black text-white shrink-0">
              <Lightbulb size={19} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                Future Intelligence
              </p>
              <h1 className="mt-1 font-serif text-3xl md:text-[42px] font-bold tracking-tight leading-tight">
                Innovation & Emerging Technology
              </h1>
            </div>
          </div>
        </header>

        {/* =================================================
            HERO + EMERGING TRENDS
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          <div className="lg:col-span-2 group cursor-pointer">
            <div className="overflow-hidden rounded-[2px] relative">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-72 md:h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-90" />
              <span className="absolute left-4 bottom-4 bg-red-600 text-white px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase rounded-[2px] shadow-sm">
                {hero.category}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-2xl md:text-[34px] font-bold leading-[1.15] text-gray-950 transition-colors duration-200 group-hover:text-red-600">
              {hero.title}
            </h1>

            <p className="text-gray-600 text-sm md:text-[15px] leading-[1.75] mt-3">
              {hero.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-gray-200 text-xs text-gray-400">
              <span className="font-medium text-gray-500">By {hero.author}</span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} strokeWidth={2.25} />
                {hero.time}
              </span>
            </div>
          </div>

          {/* Emerging trends */}
          <aside className="lg:border-l lg:border-gray-200 lg:pl-8">
            <SH title="Emerging Tech Trends" />
            <div className="flex flex-col gap-3.5">
              {techTrends.map((t) => (
                <div
                  key={t.trend}
                  className="border border-gray-200 rounded-[2px] p-4 hover:border-gray-900 hover:shadow-[0_2px_0_0_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer"
                >
                  <p className="text-sm font-semibold text-gray-900">{t.trend}</p>
                  <p className="text-xs text-gray-500 leading-5 mt-1.5">{t.desc}</p>
                  <p className="text-xs font-bold text-green-700 mt-2 tabular-nums">{t.growth}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* =================================================
            INNOVATION AWARDS
        ================================================= */}

        <section className="mb-14">
          <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-5">
            <Star size={14} className="text-yellow-500" fill="currentColor" />
            <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.16em] text-gray-900">
              Pride Times Innovation Awards 2026
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="text-left py-3 text-[10px] text-gray-400 font-bold uppercase tracking-[0.14em] w-10">#</th>
                  <th className="text-left py-3 text-[10px] text-gray-400 font-bold uppercase tracking-[0.14em]">Innovation</th>
                  <th className="text-left py-3 text-[10px] text-gray-400 font-bold uppercase tracking-[0.14em] hidden md:table-cell">Category</th>
                  <th className="text-left py-3 text-[10px] text-gray-400 font-bold uppercase tracking-[0.14em] hidden lg:table-cell">Company</th>
                  <th className="text-left py-3 text-[10px] text-gray-400 font-bold uppercase tracking-[0.14em] hidden sm:table-cell">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {innovationAwards.map((a) => (
                  <tr key={a.rank} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                    <td className="py-3.5 text-gray-300 text-sm font-bold tabular-nums">
                      {String(a.rank).padStart(2, "0")}
                    </td>
                    <td className="py-3.5 pr-3 font-semibold text-gray-900 transition-colors group-hover:text-red-600">
                      {a.innovation}
                    </td>
                    <td className="py-3.5 pr-3 text-gray-500 text-xs hidden md:table-cell">{a.category}</td>
                    <td className="py-3.5 pr-3 text-gray-500 text-xs hidden lg:table-cell">{a.company}</td>
                    <td className="py-3.5 text-xs text-gray-600 leading-5 hidden sm:table-cell">{a.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================
            STARTUP WATCH + RESEARCH BREAKTHROUGHS
        ================================================= */}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t-2 border-black pt-10">

          {/* Startup watch */}
          <div>
            <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-5">
              <Rocket size={14} strokeWidth={2} className="text-gray-900" />
              <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.16em] text-gray-900">
                Startup Watch
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {startupWatch.map((s) => (
                <div key={s.name} className="py-4 first:pt-0 group cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-red-600">
                        {s.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {s.focus} · {s.country}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-green-700 tabular-nums">{s.funding}</p>
                      <span
                        className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-[2px] ${stageBadge[s.stage]}`}
                      >
                        {s.stage}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research breakthroughs */}
          <div>
            <SH title="Research Breakthroughs" />
            <div className="divide-y divide-gray-200">
              {researchBreakthroughs.map((r) => (
                <div key={r.id} className="py-4 first:pt-0 group cursor-pointer">
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-[0.14em]">
                    {r.institution}
                  </span>
                  <p className="text-sm leading-[1.5] text-gray-800 mt-1 transition-colors group-hover:text-red-600">
                    {r.title}
                  </p>
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 flex items-center gap-1.5 mt-2">
                    <Clock size={10} strokeWidth={2.25} />
                    {r.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
