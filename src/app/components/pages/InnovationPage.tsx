
import { Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/* =========================================================
   DATA — pulled from your existing Innovation page content
========================================================= */

const hero = {
  category: "Innovation",
  title:
    "Solid-State Batteries Cross the Commercialization Threshold — Toyota's QuantumBattery Changes Everything",
  excerpt:
    "After decades of laboratory promise, Toyota's solid-state QuantumBattery enters mass production: 800-mile EV range, 8-minute fast charge, 20-year lifespan, and 40% lower cost than lithium-ion. The technology will reshape energy storage, electric vehicles, and grid infrastructure simultaneously.",
  author: "Sagar Kumar",
  date: "September 15, 2026",
  time: "3 hr ago",
  image:
    "https://images.unsplash.com/photo-1760012945940-74d6bf54c0fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

/* Your Research Breakthroughs data, reused as the "More Stories" rail */
const moreStories = [
  {
    id: 2,
    institution: "Stanford",
    title:
      "AI Model Predicts Climate Change Tipping Points 10 Years in Advance with 87% Accuracy",
    time: "4 hr ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    institution: "Oxford",
    title:
      "Quantum Computer Solves 50-Year-Old Protein Folding Problem in 3 Seconds",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?auto=format&fit=crop&w=200&q=80",
  },
];

/* Your Innovation Awards, Startup Watch and Research Breakthroughs data,
   reformatted as the "Latest Innovation News" grid */
const latestNews = [
  {
    category: "Innovation Awards",
    hot: true,
    title: "Toyota's QuantumBattery Crosses the Commercialization Threshold",
    excerpt:
      "Transforms EV economics globally — 800-mile range, 8-minute fast charge. Toyota Motor Corp's #1 pick at the Pride Times Innovation Awards 2026.",
    author: "Sagar Kumar",
    time: "12 min ago",
    image:
      "https://images.unsplash.com/photo-1760012945940-74d6bf54c0fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    category: "Innovation Awards",
    hot: true,
    title: "NVIDIA Blackwell Ultra GPU Delivers a 40x Leap in LLM Training Speed",
    excerpt:
      "NVIDIA takes the #2 spot in AI / Computing at the Pride Times Innovation Awards 2026 for the Blackwell Ultra GPU.",
    author: "Sagar Kumar",
    time: "35 min ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "Biotechnology",
    hot: false,
    title: "mRNA Universal Cancer Vaccine Hits 94% Efficacy Across 6 Cancer Types",
    excerpt:
      "BioNTech and Moderna's joint program ranks #3 in Biotechnology at the Pride Times Innovation Awards 2026.",
    author: "Sagar Kumar",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1766315746079-215ff5115e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    category: "Space Tech",
    hot: false,
    title: "Starship Full Reusability Cuts Launch Costs by 100x",
    excerpt:
      "SpaceX's #4 Innovation Award pick — full reusability is reshaping the economics of getting to orbit.",
    author: "Sagar Kumar",
    time: "3 hr ago",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "Startup Watch",
    hot: false,
    title: "Isomorphic Labs Raises $600M Series B for AI Drug Discovery",
    excerpt:
      "The UK-based startup enters our Growth-stage Startup Watch list, applying AI to accelerate drug discovery pipelines.",
    author: "Sagar Kumar",
    time: "5 hr ago",
    image:
      "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    category: "Research",
    hot: false,
    title: "Room-Temperature Superconductor Verified in Independent Tests at MIT",
    excerpt:
      "Independent labs confirm MIT's room-temperature superconductor result — a Nobel Prize is considered likely.",
    author: "Sagar Kumar",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?auto=format&fit=crop&w=600&q=80",
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export function InnovationPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">

        {/* ===================================
            PAGE HEADER
        ==================================== */}
        <header className="mb-8 border-b-2 border-red-600 pb-5">
          <h1 className="font-serif text-3xl leading-tight md:text-[40px]">
            Innovation
          </h1>

          <p className="mt-1.5 text-sm text-gray-500 md:text-[15px]">
            Breakthroughs in AI, biotech, space, and next-generation
            technologies.
          </p>
        </header>

        {/* ===================================
            HERO + MORE STORIES RAIL
        ==================================== */}
        <section className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* HERO STORY */}
          <div className="group cursor-pointer lg:col-span-2">
            <div className="overflow-hidden">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:h-[420px]"
              />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-red-600">
              {hero.category}
            </p>

            <h2 className="mt-1 font-serif text-2xl leading-[1.15] text-gray-950 transition-colors duration-200 group-hover:text-red-600 md:text-[34px]">
              {hero.title}
            </h2>

            <p className="mt-3 text-sm leading-[1.7] text-gray-600 md:text-[15px]">
              {hero.excerpt}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span>By {hero.author}</span>
              <span>·</span>
              <span>{hero.date}</span>
              <span>·</span>
              <span>{hero.time}</span>
            </div>
          </div>

          {/* MORE STORIES RAIL */}
          <aside>
            <h3 className="mb-4 border-b border-gray-300 pb-2 text-xs font-bold uppercase tracking-[0.14em]">
              More Stories
            </h3>

            <div className="flex flex-col gap-4">
              {moreStories.map((s) => (
                <div
                  key={s.id}
                  className="group flex cursor-pointer gap-3"
                >
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden">
                    <ImageWithFallback
                      src={s.image}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-red-600">
                      Innovation
                    </p>

                    <p className="mt-0.5 line-clamp-2 text-sm leading-snug transition-colors group-hover:text-red-600">
                      {s.title}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      {s.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* ===================================
            LATEST INNOVATION NEWS
        ==================================== */}
        <section className="mb-12">
          <h2 className="mb-5 text-lg font-bold">
            Latest Innovation News
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {latestNews.map((n) => (
              <div
                key={n.title}
                className="group cursor-pointer"
              >
                <div className="mb-3 overflow-hidden">
                  <ImageWithFallback
                    src={n.image}
                    alt={n.title}
                    className="h-40 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-red-600">
                    {n.category}
                  </span>

                  {n.hot && (
                    <span className="rounded-[2px] bg-orange-500 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                      Hot
                    </span>
                  )}
                </div>

                <p className="font-serif text-base leading-snug transition-colors group-hover:text-red-600">
                  {n.title}
                </p>

                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500">
                  {n.excerpt}
                </p>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-400">
                  <span>By {n.author}</span>

                  <span className="flex items-center gap-1">
                    <Clock size={10} strokeWidth={2.25} />
                    {n.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================
            NEWSLETTER CTA
        ==================================== */}
        <section className="rounded-[2px] bg-[#0b1a30] p-8 text-center text-white md:p-10">
          <h2 className="mb-2 font-serif text-2xl md:text-[30px]">
            Stay Ahead with The Pride Times
          </h2>

          <p className="mb-6 text-sm text-gray-400">
            Daily briefings on Innovation delivered to your inbox.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto flex max-w-md flex-col justify-center gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-[2px] border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-white/50"
            />

            <button
              type="submit"
              className="whitespace-nowrap rounded-[2px] bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Subscribe Free
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

