import { Clock, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router";

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

const featured = [
  { id: 1, category: "COVER STORY", title: "The AI Economy: How Artificial Intelligence is Reshaping Global GDP and Rewriting the Rules of Competitive Advantage", excerpt: "From Silicon Valley to Shenzhen, every sector is being transformed by AI. Pride Times investigates the winners, the losers, and the trillion-dollar stakes.", author: "Sagar Kumar", time: "Today", image: "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?w=800&h=500&fit=crop", path: "/technology" },
  { id: 2, category: "DEEP DIVE", title: "India's $5 Trillion Dream: Can the World's Fastest-Growing Economy Sustain Its Momentum Through 2030?", excerpt: "Prime Minister Modi's economic ambition is unprecedented. Pride Times examines the infrastructure gap, the talent pipeline, and the geopolitical tailwinds and headwinds.", author: "Sagar Kumar", time: "Yesterday", image: "https://images.unsplash.com/photo-1761233138997-44d9b002a08f?w=800&h=500&fit=crop", path: "/finance" },
  { id: 3, category: "INVESTIGATION", title: "The Cybersecurity Crisis Hidden in Plain Sight: How Nation-State Hackers Are Penetrating the World's Critical Infrastructure", excerpt: "A 14-month investigation reveals that power grids, water systems, and financial networks in 40+ countries have been silently compromised by state-sponsored actors.", author: "Sagar Kumar", time: "2 days ago", image: "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?w=800&h=500&fit=crop", path: "/cybersecurity" },
];

const editorPicks = [
  { id: 1, category: "LEADERSHIP", title: "How Satya Nadella Transformed Microsoft from 'Dying Giant' to World's Most Valuable AI Company", time: "3 days ago", path: "/leadership" },
  { id: 2, category: "ENERGY", title: "The Solar Revolution: How One Technology Disrupted the Energy Sector Faster Than Any Technology in History", time: "4 days ago", path: "/energy" },
  { id: 3, category: "BILLIONAIRES", title: "Inside the Mind of Elon Musk: What Drives the World's Richest Man and Most Consequential CEO", time: "5 days ago", path: "/billionaires" },
  { id: 4, category: "HEALTHCARE", title: "The End of Disease? How mRNA Technology is Opening the Door to Universal Cancer Vaccines by 2030", time: "6 days ago", path: "/healthcare" },
  { id: 5, category: "SMART CITIES", title: "The City of the Future Is Already Here — If You Know Where to Look", time: "1 week ago", path: "/smart-cities" },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export function FeaturedPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-6 mb-12 flex items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white shrink-0">
              <Star size={20} strokeWidth={1.5} className="text-yellow-400" fill="currentColor" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-red-600">
                Editor's Selection
              </p>
              <h1 className="mt-1 font-serif text-[32px] md:text-[46px] font-bold tracking-tight leading-[1.05]">
                Featured Stories
              </h1>
            </div>
          </div>

          <p className="hidden md:block text-xs text-gray-400 uppercase tracking-wide pb-1">
            {featured.length + editorPicks.length} Stories
          </p>
        </header>

        {/* =================================================
            COVER STORY
        ================================================= */}

        <Link
          to={featured[0].path}
          className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 pb-16 border-b border-gray-200"
        >
          <div className="overflow-hidden rounded-[2px] relative order-1 md:order-2">
            <ImageWithFallback
              src={featured[0].image}
              alt={featured[0].title}
              className="w-full h-72 md:h-[460px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-90" />
            <span className="absolute left-4 bottom-4 bg-red-600 text-white px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase rounded-[2px] shadow-sm">
              {featured[0].category}
            </span>
          </div>

          <div className="order-2 md:order-1">
            <h2 className="font-serif text-[30px] md:text-[42px] font-bold leading-[1.08] text-gray-950 transition-colors duration-200 group-hover:text-red-600">
              {featured[0].title}
            </h2>

            <p className="text-[15px] md:text-base text-gray-600 leading-[1.8] mt-4">
              {featured[0].excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-gray-200 text-xs text-gray-400">
              <span className="font-semibold text-gray-600">By {featured[0].author}</span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} strokeWidth={2.25} />
                {featured[0].time}
              </span>
            </div>
          </div>
        </Link>

        {/* =================================================
            SECONDARY FEATURED STORIES
        ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 mb-16">
          {featured.slice(1).map((s) => (
            <Link key={s.id} to={s.path} className="group flex flex-col">
              <div className="overflow-hidden rounded-[2px] mb-4">
                <ImageWithFallback
                  src={s.image}
                  alt={s.title}
                  className="w-full h-56 md:h-64 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              <span className="text-[11px] font-bold text-red-600 uppercase tracking-[0.16em]">
                {s.category}
              </span>

              <h2 className="mt-2 font-serif text-xl md:text-[26px] font-bold leading-[1.2] text-gray-950 transition-colors duration-200 group-hover:text-red-600">
                {s.title}
              </h2>

              <p className="text-sm md:text-[15px] text-gray-600 leading-[1.75] mt-3">
                {s.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-gray-200 text-xs text-gray-400">
                <span className="font-medium text-gray-500">By {s.author}</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={11} strokeWidth={2.25} />
                  {s.time}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* =================================================
            EDITOR'S PICKS
        ================================================= */}

        <section className="border-t-2 border-black pt-10">
          <SH title="Editor's Picks" />

          <div className="divide-y divide-gray-200">
            {editorPicks.map((p, i) => (
              <Link
                key={p.id}
                to={p.path}
                className="flex items-center gap-5 py-5 first:pt-0 group"
              >
                <span className="text-2xl md:text-3xl font-serif font-bold text-gray-200 tabular-nums shrink-0 transition-colors duration-200 group-hover:text-red-100 w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-[0.14em]">
                    {p.category}
                  </span>
                  <p className="text-sm md:text-[15px] leading-[1.5] text-gray-800 mt-1 transition-colors group-hover:text-red-600">
                    {p.title}
                  </p>
                </div>

                <span className="text-[11px] uppercase tracking-wide text-gray-400 flex-shrink-0 flex items-center gap-1.5">
                  <Clock size={10} strokeWidth={2.25} />
                  {p.time}
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
