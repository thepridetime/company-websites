import {
  Clock,
  ChevronRight,
  TrendingUp,
  Flame,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/* =========================================================
   IMAGE DATA
========================================================= */

const images = {
  hero:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1400&q=85",

  tech:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",

  earth:
    "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=900&q=80",

  quantum:
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80",

  apple:
    "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80",

  ai:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",

  space:
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",

  fed:
    "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=700&q=80",

  openai:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",

  world:
    "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=700&q=80",
};

/* =========================================================
   DATA
========================================================= */

const heroStory = {
  category: "BREAKING NEWS",
  title:
    "Global Markets Rally as Central Banks Signal Coordinated Rate Cuts",
  excerpt:
    "Markets react sharply as investors digest fresh monetary policy signals, stronger corporate earnings and a rapidly changing global economic outlook.",
  author: "Sagar Kumar",
  time: "1 hr ago",
  image: images.hero,
  path: "/finance",
};

const moreStories = [
  {
    id: 1,
    category: "FINANCE",
    title:
      "Federal Reserve Announces Surprise 50bps Rate Cut — Biggest in 4 Years",
    time: "3 min ago",
    image: images.fed,
    path: "/finance",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title:
      "OpenAI Launches GPT-5 — Claims Surpasses PhD-Level Performance",
    time: "12 min ago",
    image: images.openai,
    path: "/technology",
  },
  {
    id: 3,
    category: "WORLD",
    title:
      "G20 Emergency Summit Called as Three Major Conflicts Converge",
    time: "18 min ago",
    image: images.world,
    path: "/world",
  },
];

const latestStories = [
  {
    id: 1,
    category: "FINANCE",
    title:
      "Federal Reserve Announces Surprise 50bps Rate Cut — Biggest in 4 Years",
    excerpt:
      "Markets respond to the central bank's latest policy decision as investors reassess economic growth expectations.",
    time: "3 min ago",
    image: images.fed,
    path: "/finance",
    hot: true,
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title:
      "OpenAI Launches GPT-5 — Claims Surpasses PhD-Level Performance",
    excerpt:
      "The latest AI model arrives with major improvements across reasoning, coding and multimodal capabilities.",
    time: "12 min ago",
    image: images.openai,
    path: "/technology",
    hot: true,
  },
  {
    id: 3,
    category: "WORLD",
    title:
      "G20 Emergency Summit Called as Three Major Conflicts Converge",
    excerpt:
      "World leaders prepare for emergency talks as geopolitical tensions increase across several regions.",
    time: "18 min ago",
    image: images.world,
    path: "/world",
    hot: true,
  },
  {
    id: 4,
    category: "MARKETS",
    title:
      "S&P 500 Surges 3.2% After Fed Cut — Biggest Single-Day Rally of 2026",
    excerpt:
      "Wall Street stocks jump sharply following fresh monetary policy guidance from the Federal Reserve.",
    time: "24 min ago",
    image: images.tech,
    path: "/markets",
    hot: false,
  },
  {
    id: 5,
    category: "INDIA",
    title:
      "RBI Follows Fed with 25bps Cut — Sensex Up 1,400 Points",
    excerpt:
      "Indian equities climb as the Reserve Bank of India announces a fresh reduction in its policy rate.",
    time: "31 min ago",
    image: images.earth,
    path: "/finance",
    hot: false,
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    title:
      "Apple Announces Reality Pro 2 AR Headset — Ships in 60 Days",
    excerpt:
      "Apple unveils its next-generation spatial computing hardware with significant upgrades.",
    time: "45 min ago",
    image: images.apple,
    path: "/technology",
    hot: false,
  },
];

const breakingFeed = [
  {
    id: 1,
    category: "FINANCE",
    title:
      "Federal Reserve Announces Surprise 50bps Rate Cut — Biggest in 4 Years",
    time: "3 min ago",
    priority: "BREAKING",
    path: "/finance",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title:
      "OpenAI Launches GPT-5 — Claims Surpasses PhD-Level Performance on All Academic Benchmarks",
    time: "12 min ago",
    priority: "BREAKING",
    path: "/technology",
  },
  {
    id: 3,
    category: "WORLD",
    title:
      "G20 Emergency Summit Called as Three Major Conflicts Converge",
    time: "18 min ago",
    priority: "URGENT",
    path: "/world",
  },
  {
    id: 4,
    category: "MARKETS",
    title:
      "S&P 500 Surges 3.2% After Fed Cut — Biggest Single-Day Rally of 2026",
    time: "24 min ago",
    priority: "BREAKING",
    path: "/markets",
  },
  {
    id: 5,
    category: "INDIA",
    title:
      "RBI Follows Fed with 25bps Cut — Sensex Up 1,400 Points",
    time: "31 min ago",
    priority: "URGENT",
    path: "/finance",
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    title:
      "Apple Announces Reality Pro 2 AR Headset — Ships in 60 Days at $2,499",
    time: "45 min ago",
    priority: "URGENT",
    path: "/technology",
  },
  {
    id: 7,
    category: "ENERGY",
    title:
      "OPEC+ Emergency Meeting Called — Oil Falls 4% on Demand Fears",
    time: "52 min ago",
    priority: "URGENT",
    path: "/energy",
  },
  {
    id: 8,
    category: "CYBERSECURITY",
    title:
      "Critical Infrastructure Breach Hits US Power Grid — FBI, CISA Respond",
    time: "1 hr ago",
    priority: "BREAKING",
    path: "/cybersecurity",
  },
];

const priorityClasses: Record<string, string> = {
  BREAKING: "bg-red-600 text-white",
  URGENT: "bg-orange-500 text-white",
  NEWS: "bg-gray-800 text-white",
};

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  count,
}: {
  title: string;
  count?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 border-b border-black pb-2.5 mb-5">
      <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />

      <h2 className="flex-1 text-[13px] md:text-sm font-bold uppercase tracking-[0.14em] text-gray-900">
        {title}
      </h2>

      {count && (
        <span className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
          {count}
        </span>
      )}
    </div>
  );
}

/* =========================================================
   AD BANNER
========================================================= */

function AdBanner({ label = "Advertisement Space" }) {
  return (
    <div className="relative w-full h-[76px] md:h-[90px] bg-gradient-to-r from-[#10272d] via-[#17343c] to-[#285666] flex items-center justify-center overflow-hidden">
      <div className="text-center">
        <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-sky-300">
          Google Adsense
        </p>

        <p className="mt-1 text-xs md:text-sm font-bold text-white">
          {label}
        </p>

        <p className="mt-0.5 text-[8px] md:text-[9px] text-sky-200">
          728 × 90 · Leaderboard
        </p>
      </div>

      <span className="absolute top-1 right-1 text-[7px] bg-white/80 text-gray-500 px-1">
        Advertisement
      </span>
    </div>
  );
}

/* =========================================================
   HERO STORY
========================================================= */

function HeroStory() {
  return (
    <article className="group">
      <Link to={heroStory.path} className="block">
        <div className="overflow-hidden rounded-md">
          <ImageWithFallback
            src={heroStory.image}
            alt={heroStory.title}
            className="w-full h-[250px] sm:h-[330px] lg:h-[390px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </div>
      </Link>

      <div className="mt-3">
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
          {heroStory.category}
        </span>

        <Link to={heroStory.path}>
          <h1 className="mt-1 font-serif text-[25px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-bold leading-[1.08] tracking-tight text-gray-950 transition-colors group-hover:text-red-600">
            {heroStory.title}
          </h1>
        </Link>

        <p className="mt-2 text-[12px] md:text-sm leading-[1.55] text-gray-600 max-w-4xl">
          {heroStory.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-3 pt-2.5 border-t border-gray-200 text-[10px] text-gray-400">
          <span className="font-semibold text-gray-500">
            By {heroStory.author}
          </span>

          <span>·</span>

          <span className="flex items-center gap-1">
            <Clock size={10} />
            {heroStory.time}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SPONSORED CARD
========================================================= */

function SponsoredCard() {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
      <div className="px-3 py-2 bg-[#faf8ef] flex items-center justify-between">
        <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Sponsored Content
        </span>

        <span className="text-[8px] text-gray-400">Ad</span>
      </div>

      <div className="mx-3 mb-3 h-[170px] bg-[#171c3b] flex items-center justify-center text-center">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-yellow-400">
            Featured Partner
          </p>

          <p className="mt-2 text-sm font-bold text-white">
            Your Ad Here
          </p>

          <p className="mt-1 text-[9px] text-gray-300">
            Reach 2M+ business readers
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MORE STORIES
========================================================= */

function MoreStories() {
  return (
    <div className="mt-5">
      <SectionHeader title="More Stories" />

      <div className="space-y-3">
        {moreStories.map((story) => (
          <Link
            key={story.id}
            to={story.path}
            className="group flex gap-3 pb-3 border-b border-gray-200 last:border-0"
          >
            <div className="w-[78px] h-[58px] shrink-0 overflow-hidden rounded-[3px]">
              <ImageWithFallback
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="min-w-0">
              <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-red-600">
                {story.category}
              </span>

              <h3 className="mt-0.5 text-[11px] md:text-xs font-bold leading-[1.25] text-gray-900 group-hover:text-red-600">
                {story.title}
              </h3>

              <span className="mt-1 flex items-center gap-1 text-[8px] text-gray-400">
                <Clock size={8} />
                {story.time}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   LATEST STORY CARD
========================================================= */

function LatestStoryCard({
  story,
}: {
  story: (typeof latestStories)[number];
}) {
  return (
    <article className="group border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-sm transition-shadow duration-300">
      <Link to={story.path} className="block">
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={story.image}
            alt={story.title}
            className="w-full h-[150px] sm:h-[170px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />

          {story.hot && (
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-red-600 text-white text-[8px] font-bold px-2 py-1 rounded-[2px]">
              <Flame size={8} />
              BREAKING
            </span>
          )}
        </div>
      </Link>

      <div className="p-3">
        <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-red-600">
          {story.category}
        </span>

        <Link to={story.path}>
          <h3 className="mt-1 font-serif text-[15px] md:text-[16px] font-bold leading-[1.2] text-gray-950 group-hover:text-red-600 transition-colors">
            {story.title}
          </h3>
        </Link>

        <p className="mt-1.5 text-[10px] md:text-[11px] leading-[1.45] text-gray-500 line-clamp-2">
          {story.excerpt}
        </p>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
          <span className="text-[9px] text-gray-400">
            By Sagar Kumar
          </span>

          <span className="flex items-center gap-1 text-[9px] text-gray-400">
            <Clock size={8} />
            {story.time}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   BREAKING FEED
========================================================= */

function BreakingFeed() {
  return (
    <div>
      <SectionHeader
        title="Breaking News Feed"
        count={`${breakingFeed.length} stories`}
      />

      <div className="divide-y divide-gray-200">
        {breakingFeed.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="group flex items-start gap-3 py-3.5 px-1 hover:bg-gray-50 transition-colors"
          >
            <span
              className={`inline-flex items-center text-[8px] font-bold px-2 py-1 rounded-[2px] whitespace-nowrap shrink-0 ${priorityClasses[item.priority]}`}
            >
              {item.priority}
            </span>

            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium leading-[1.45] text-gray-800 group-hover:text-red-600">
                {item.title}
              </p>

              <div className="flex items-center gap-2 mt-1.5 text-[9px] text-gray-400">
                <span className="font-bold text-red-600 uppercase tracking-wide">
                  {item.category}
                </span>

                <span>·</span>

                <span className="flex items-center gap-1">
                  <Clock size={8} />
                  {item.time}
                </span>
              </div>
            </div>

            <ChevronRight
              size={14}
              className="text-gray-300 shrink-0 mt-1 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SPONSORSHIP SECTION
========================================================= */

function SponsorshipSection() {
  const sponsors = [
    "Global Finance Summit 2026",
    "Tech Leaders Forum",
    "Energy Transition Conference",
    "AI & Business World",
  ];

  return (
    <section className="bg-[#f7f7f7] border border-gray-100 rounded-md p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-gray-400 border border-gray-200 px-2 py-1 rounded-sm">
          Sponsorship
        </span>

        <span className="text-[9px] text-gray-400">
          Presented by our partners
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor}
            className="bg-white border border-gray-200 rounded-md min-h-[85px] flex flex-col items-center justify-center text-center px-3"
          >
            <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <span className="text-red-600 text-xs font-bold">✦</span>
            </div>

            <p className="text-[10px] font-bold text-gray-800">
              {sponsor}
            </p>

            <p className="text-[8px] text-gray-400 mt-1">
              Sponsored Event
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   NEWSLETTER
========================================================= */

function Newsletter() {
  return (
    <section className="bg-[#071a2d] rounded-md px-5 py-8 md:py-10 text-center">
      <h2 className="font-serif text-xl md:text-2xl font-bold text-white">
        Stay Ahead with The Pride Times
      </h2>

      <p className="mt-2 text-[10px] md:text-xs text-gray-400">
        Daily briefings on breaking news delivered to your inbox.
      </p>

      <form
        className="flex flex-col sm:flex-row justify-center gap-2 mt-5 max-w-[480px] mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="h-10 flex-1 min-w-0 px-3 text-xs bg-white/10 border border-white/10 rounded text-white placeholder:text-gray-500 outline-none focus:border-red-500"
        />

        <button
          type="submit"
          className="h-10 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded transition-colors"
        >
          Subscribe Free
        </button>
      </form>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function BreakingNewsPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <main className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10 py-5 md:py-7">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-t-[3px] border-red-600 pt-4 md:pt-5 mb-7 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
              <Zap
                size={17}
                strokeWidth={2}
                className="text-red-500"
                fill="currentColor"
              />
            </div>

            <div>
              <h1 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] font-bold leading-none tracking-tight text-gray-950">
                Breaking News
              </h1>

              <p className="mt-1.5 text-[10px] md:text-xs text-gray-500">
                Live updates, major developments, and the latest stories from
                around the world.
              </p>
            </div>
          </div>
        </header>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <section className="mb-6 md:mb-7">
          <AdBanner label="Advertisement Space" />
        </section>

        {/* =================================================
            HERO + SIDEBAR
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.7fr)_minmax(260px,0.9fr)] gap-7 lg:gap-8 mb-10">

          {/* HERO */}

          <div className="min-w-0">
            <HeroStory />
          </div>

          {/* SIDEBAR */}

          <aside className="lg:border-l lg:border-gray-200 lg:pl-6">
            <SponsoredCard />
            <MoreStories />
          </aside>
        </section>

        {/* =================================================
            LATEST BREAKING NEWS
        ================================================= */}

        <section className="border-t border-black pt-4 mb-10">
          <SectionHeader title="Latest Breaking News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestStories.map((story) => (
              <LatestStoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <section className="mb-7">
          <AdBanner label="Business Solutions | Powered by The Pride Times" />
        </section>

        {/* =================================================
            SPONSORSHIP
        ================================================= */}

        <section className="mb-7">
          <SponsorshipSection />
        </section>

        {/* =================================================
            BREAKING FEED
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.8fr)] gap-8 mb-8">

          <BreakingFeed />

          <aside className="lg:border-l lg:border-gray-200 lg:pl-7">
            <div className="bg-black text-white rounded-md p-5 lg:sticky lg:top-24">

              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-300">
                  Live News
                </span>
              </div>

              <div className="py-5">
                <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[8px] font-bold px-2 py-1 rounded-[2px]">
                  <Flame size={8} />
                  BREAKING
                </span>

                <h3 className="font-serif text-lg font-bold leading-[1.25] mt-3">
                  Global markets remain in focus as investors react to major
                  economic developments.
                </h3>

                <p className="text-[10px] text-gray-500 mt-3">
                  Updated moments ago
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">
                  Trending Topics
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Fed Cut",
                    "AI",
                    "Markets",
                    "OPEC",
                    "NVIDIA",
                    "India",
                    "Global Trade",
                  ].map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1 text-[9px] bg-white/10 text-gray-300 px-2 py-1 rounded-sm hover:bg-white/20 hover:text-white transition-colors"
                    >
                      <TrendingUp size={8} />
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/markets"
                className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-bold text-gray-300 hover:text-white"
              >
                View Markets
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </aside>
        </section>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <Newsletter />
      </main>
    </div>
  );
}
