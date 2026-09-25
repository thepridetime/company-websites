import { Clock } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/* =========================================================
   ADVERTISEMENT SLOT
========================================================= */

function AdSlot({
  label = "728 × 90 · Leaderboard",
  title = "Advertisement Space",
}: {
  label?: string;
  title?: string;
}) {
  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-teal-900 text-white text-center py-8 px-4 mb-8 rounded-[2px] overflow-hidden">
      <span className="absolute top-2 right-3 text-[10px] text-gray-400 uppercase tracking-wide">
        Advertisement
      </span>

      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 mb-1">
        Google AdSense
      </p>

      <p className="font-semibold text-sm md:text-base">{title}</p>

      <p className="text-xs text-sky-300/80 mt-1">{label}</p>
    </div>
  );
}

/* =========================================================
   DATA
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

/* =========================================================
   MORE STORIES
========================================================= */

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

/* =========================================================
   LATEST INNOVATION NEWS
========================================================= */

const latestNews = [
  {
    category: "Innovation Awards",
    hot: true,
    title:
      "Toyota's QuantumBattery Crosses the Commercialization Threshold",
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
    title:
      "mRNA Universal Cancer Vaccine Hits 94% Efficacy Across 6 Cancer Types",
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
    title:
      "Room-Temperature Superconductor Verified in Independent Tests at MIT",
    excerpt:
      "Independent labs confirm MIT's room-temperature superconductor result — a Nobel Prize is considered likely.",
    author: "Sagar Kumar",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?auto=format&fit=crop&w=600&q=80",
  },
];

/* =========================================================
   SPONSORED EVENTS
========================================================= */

const sponsoredEvents = [
  {
    name: "Finance Summit 2026",
    tag: "Finance",
  },
  {
    name: "Technology Leaders Forum",
    tag: "Technology",
  },
  {
    name: "Energy Transition Conference",
    tag: "Energy",
  },
  {
    name: "Smart Cities World",
    tag: "Smart Cities",
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export function InnovationPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* =================================================
            PAGE HEADER
        ================================================== */}

        <header className="border-b-2 border-red-600 pb-5 mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[40px] leading-tight">
            Innovation
          </h1>

          <p className="text-gray-500 text-sm md:text-[15px] mt-1.5 max-w-2xl">
            Breakthroughs in AI, biotech, space, and next-generation
            technologies.
          </p>
        </header>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================== */}

        <AdSlot />

        {/* =================================================
            HERO + MORE STORIES
        ================================================== */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          {/* Main Hero */}

          <Link to="/article/innovation-quantumbattery" className="lg:col-span-2 group cursor-pointer min-w-0 block">
            <div className="overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-64 sm:h-80 md:h-[420px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.14em] mt-4">
              {hero.category}
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] leading-[1.15] mt-1 text-gray-950 transition-colors duration-200 group-hover:text-red-600">
              {hero.title}
            </h2>

            <p className="text-gray-600 text-sm md:text-[15px] leading-[1.7] mt-3 max-w-4xl">
              {hero.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 text-xs text-gray-500">
              <span>By {hero.author}</span>
              <span>·</span>
              <span>{hero.date}</span>
              <span>·</span>
              <span>{hero.time}</span>
            </div>
          </Link>

          {/* =================================================
              RIGHT RAIL
          ================================================== */}

          <aside className="min-w-0">

            {/* Sponsored Advertisement */}

            <div className="relative bg-[#0b1a30] text-white p-6 mb-6 rounded-[2px] overflow-hidden">
              <span className="absolute top-2 right-3 text-[10px] text-gray-400 uppercase tracking-wide">
                Ad
              </span>

              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                Sponsored Content
              </p>

              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-400 mt-4">
                Featured Partner
              </p>

              <p className="font-semibold text-lg mt-1">
                Your Ad Here
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Reach 2M+ business readers
              </p>
            </div>

            {/* More Stories */}

            <h3 className="text-xs font-bold uppercase tracking-[0.14em] border-b border-gray-300 pb-2 mb-4">
              More Stories
            </h3>

            <div className="flex flex-col gap-4">
              {moreStories.map((story) => (
                <Link
                  to={`/article/${story.id === 2 ? "innovation-climate-ai" : "innovation-quantum-protein"}`}
                  key={story.id}
                  className="flex gap-3 group cursor-pointer"
                >
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-red-600 text-[10px] font-bold uppercase tracking-wide">
                      Innovation
                    </p>

                    <p className="text-sm leading-snug mt-0.5 group-hover:text-red-600 transition-colors line-clamp-2">
                      {story.title}
                    </p>

                    <p className="text-[11px] text-gray-400 mt-1">
                      {story.time}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        {/* =================================================
            LATEST INNOVATION NEWS
        ================================================== */}

        <section className="mb-12">
          <div className="flex items-end justify-between border-b border-gray-200 pb-3 mb-5">
            <h2 className="text-lg md:text-xl font-bold">
              Latest Innovation News
            </h2>

            <span className="hidden sm:block text-[10px] text-gray-400 uppercase tracking-[0.15em]">
              Latest Updates
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {latestNews.map((news) => (
              <Link
                to={`/article/${{"Toyota's QuantumBattery Crosses the Commercialization Threshold":"innovation-quantumbattery","NVIDIA Blackwell Ultra GPU Delivers a 40x Leap in LLM Training Speed":"innovation-blackwell","mRNA Universal Cancer Vaccine Hits 94% Efficacy Across 6 Cancer Types":"innovation-mrna","Starship Full Reusability Cuts Launch Costs by 100x":"innovation-starship","Isomorphic Labs Raises $600M Series B for AI Drug Discovery":"innovation-drug-discovery","Room-Temperature Superconductor Verified in Independent Tests at MIT":"innovation-superconductor"}[news.title] || "innovation-quantumbattery"}`}
                key={news.title}
                className="group cursor-pointer min-w-0"
              >
                <div className="overflow-hidden mb-3 bg-gray-100">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 sm:h-40 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-red-600 text-[10px] font-bold uppercase tracking-wide">
                    {news.category}
                  </span>

                  {news.hot && (
                    <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase">
                      Hot
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-base leading-snug group-hover:text-red-600 transition-colors">
                  {news.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                  {news.excerpt}
                </p>

                <div className="flex items-center justify-between gap-3 text-[11px] text-gray-400 mt-2.5">
                  <span className="truncate">
                    By {news.author}
                  </span>

                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Clock size={10} strokeWidth={2.25} />
                    {news.time}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================== */}

        <AdSlot
          title="Business Solutions | Powered by The Pride Times"
          label="728 × 90 · Leaderboard"
        />

        {/* =================================================
            SPONSORED EVENTS
        ================================================== */}

        <section className="bg-gray-50 border border-gray-200 py-6 px-4 mb-12 rounded-[2px]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5">
            <span className="w-fit text-[10px] font-bold uppercase tracking-wide bg-gray-200 text-gray-600 px-2 py-1 rounded-[2px]">
              Sponsorship
            </span>

            <span className="text-xs text-gray-500">
              Presented by our partners
            </span>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {sponsoredEvents.map((event) => (
              <article
                key={event.name}
                className="bg-white border border-gray-200 py-6 px-4 text-center hover:border-black transition-colors cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 font-bold text-sm">
                  {event.tag[0]}
                </div>

                <p className="text-sm font-semibold">
                  {event.name}
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                  Sponsored Event
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            NEWSLETTER CTA
        ================================================== */}

        <section className="bg-[#0b1a30] text-white text-center p-8 md:p-10 rounded-[2px]">
          <h2 className="font-serif text-2xl md:text-[30px] mb-2">
            Stay Ahead with The Pride Times
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Daily briefings on Innovation delivered to your inbox.
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 min-w-0 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 px-4 py-3 text-sm outline-none focus:border-white/50 rounded-[2px]"
            />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold transition-colors rounded-[2px] whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
