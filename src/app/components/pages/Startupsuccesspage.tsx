import { Clock, Rocket, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router";

/* =========================================================
   TYPES
========================================================= */

type Story = {
  id?: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  time: string;
  image: string;
  path?: string;
};

/* =========================================================
   DATA
========================================================= */

const hero: Story = {
  category: "STARTUP SUCCESS",
  title: "Perplexity AI Raises $1.2B Series D, Valued at $15B",
  excerpt:
    "The AI search startup secures major backing from SoftBank, Bessemer, and Nvidia as it targets 100M daily active users by Q4 2026.",
  author: "Sagar Kumar",
  time: "2 hr ago",
  image:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
  path: "/startup-success",
};

const latestNews = [
  {
    id: 1,
    category: "TECHNOLOGY",
    title:
      "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and Southeast Asia.",
    time: "12 min ago",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=520&fit=crop",
    path: "/technology",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title:
      "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    excerpt:
      "Hyperscaler capex tops $700B while grid, water and community pushback intensifies across key markets.",
    time: "35 min ago",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=520&fit=crop",
    path: "/technology",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    title:
      "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
    excerpt:
      "IBM and Google jointly announce stable 1,000-qubit processors, marking a watershed moment for enterprise quantum computing.",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&h=520&fit=crop",
    path: "/technology",
  },
  {
    id: 4,
    category: "TECHNOLOGY",
    title:
      "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 8 Languages",
    excerpt:
      "Apple's most ambitious software update rewrites the rules of personal AI, integrating on-device translation and generative features.",
    time: "3 hr ago",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&h=520&fit=crop",
    path: "/technology",
  },
  {
    id: 5,
    category: "TECHNOLOGY",
    title:
      "Meta's Llama 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
    excerpt:
      "Open-source AI takes center stage as Meta's latest model outperforms proprietary systems in enterprise reasoning.",
    time: "5 hr ago",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=900&h=520&fit=crop",
    path: "/technology",
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    title:
      "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
    excerpt:
      "The latest satellite constellation expansion brings high-speed internet to more regions across Africa, South Asia, and Latin America.",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&h=520&fit=crop",
    path: "/technology",
  },
];

/* =========================================================
   MORE STORIES
========================================================= */

const moreStories = [
  {
    category: "STARTUP SUCCESS",
    title: "Indian Unicorn Zepto Hits $10B Valuation, Eyes Global Expansion",
    time: "4 hr ago",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
    path: "/startup-success",
  },
  {
    category: "STARTUP SUCCESS",
    title:
      "Y Combinator W2026 Cohort: 40% of Startups Are Pure AI Companies",
    time: "5 hr ago",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=200&fit=crop",
    path: "/startup-success",
  },
];

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="border-t-2 border-black pt-3 mb-5">
      <h2 className="text-[15px] md:text-[17px] font-bold text-gray-900">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   AD BANNER
========================================================= */

function AdBanner({ secondary = false }: { secondary?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden ${
        secondary
          ? "bg-[#12313b] h-[95px] md:h-[105px]"
          : "bg-[#102d35] h-[88px] md:h-[96px]"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d252c] via-[#173b45] to-[#285968]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        <p className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-cyan-300 uppercase">
          Google Adsense
        </p>

        <p className="mt-1 text-white text-sm md:text-base font-semibold">
          {secondary
            ? "Business Solutions | Powered by The Pride Times"
            : "Advertisement Space"}
        </p>

        <p className="text-[8px] md:text-[9px] text-cyan-200 mt-0.5">
          728 × 90 • Leaderboard
        </p>
      </div>

      <span className="absolute top-1 right-1 text-[6px] bg-white/80 px-1 py-0.5 text-gray-500">
        Advertisement
      </span>
    </div>
  );
}

/* =========================================================
   SPONSORED CONTENT
========================================================= */

function SponsoredContent() {
  return (
    <aside className="w-full">
      <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
            Sponsored Content
          </span>

          <span className="text-[8px] text-gray-400">Ad</span>
        </div>

        <div className="mx-3 mb-3 h-[155px] md:h-[170px] bg-[#11172f] flex flex-col items-center justify-center text-center">
          <p className="text-[9px] font-bold tracking-[0.16em] text-yellow-400">
            FEATURED PARTNER
          </p>

          <p className="text-white text-sm font-semibold mt-2">
            Your Ad Here
          </p>

          <p className="text-[9px] text-gray-300 mt-1">
            Reach 2M+ business readers
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="border-b-2 border-black pb-2 text-[13px] font-bold uppercase">
          More Stories
        </h3>

        <div>
          {moreStories.map((story) => (
            <Link
              key={story.title}
              to={story.path}
              className="flex gap-3 py-3 border-b border-gray-200 group"
            >
              <div className="w-[78px] h-[55px] shrink-0 overflow-hidden rounded-sm">
                <ImageWithFallback
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[8px] font-bold uppercase text-red-600">
                  {story.category}
                </p>

                <p className="mt-1 text-[11px] md:text-[12px] font-semibold leading-[1.3] text-gray-900 group-hover:text-red-600">
                  {story.title}
                </p>

                <p className="text-[8px] text-gray-400 mt-1">
                  {story.time}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   HERO
========================================================= */

function HeroStory() {
  return (
    <article className="group">
      <Link to={hero.path || "#"} className="block">
        <div className="w-full overflow-hidden rounded-md">
          <ImageWithFallback
            src={hero.image}
            alt={hero.title}
            className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>

        <div className="pt-3">
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">
            {hero.category}
          </p>

          <h2 className="mt-1 font-serif text-[25px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-bold leading-[1.08] text-gray-950 group-hover:text-red-600 transition-colors">
            {hero.title}
          </h2>

          <p className="mt-2 text-[12px] md:text-[14px] text-gray-600 leading-[1.55]">
            {hero.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-[9px] md:text-[10px] text-gray-400">
            <span className="font-medium text-gray-500">
              By {hero.author}
            </span>

            <span>{hero.time}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* =========================================================
   NEWS CARD
========================================================= */

function NewsCard({
  story,
}: {
  story: (typeof latestNews)[number];
}) {
  return (
    <Link
      to={story.path}
      className="group block border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
    >
      <div className="w-full h-[165px] sm:h-[180px] md:h-[175px] lg:h-[185px] overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-3">
        <p className="text-[8px] font-bold uppercase text-red-600 tracking-wide">
          {story.category}
        </p>

        <h3 className="mt-1.5 font-serif text-[14px] md:text-[15px] font-bold leading-[1.18] text-gray-900 group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        <p className="mt-1.5 text-[10px] md:text-[11px] text-gray-600 leading-[1.45] line-clamp-2">
          {story.excerpt}
        </p>

        <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-gray-100 text-[8px] text-gray-400">
          <span>By Sagar Kumar</span>

          <span className="flex items-center gap-1 ml-auto">
            <Clock size={9} />
            {story.time}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   SPONSORSHIP
========================================================= */

const sponsorships = [
  "Global Finance Summit 2026",
  "Tech Leaders Forum",
  "Energy Transition Conference",
  "AI & Business World",
];

/* =========================================================
   MAIN PAGE
========================================================= */

export function StartupSuccessPage() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 antialiased">
      {/* =====================================================
          FULL WIDTH PAGE CONTAINER
      ===================================================== */}

      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-6 md:py-8">
        {/* ===================================================
            PAGE TITLE
        =================================================== */}

        <header className="border-t-[3px] border-red-600 pt-4 mb-6">
          <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold leading-tight">
            Startup Success
          </h1>

          <p className="mt-1 text-[11px] md:text-[13px] text-gray-500">
            The world's most exciting startups, funding rounds, and founder
            stories.
          </p>
        </header>

        {/* ===================================================
            TOP AD
        =================================================== */}

        <div className="mb-6">
          <AdBanner />
        </div>

        {/* ===================================================
            HERO + SIDEBAR
        =================================================== */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,3.2fr)_minmax(260px,1fr)] gap-5 lg:gap-6 mb-8">
          <HeroStory />

          <div className="lg:border-l lg:border-gray-200 lg:pl-5">
            <SponsoredContent />
          </div>
        </section>

        {/* ===================================================
            LATEST STARTUP SUCCESS NEWS
        =================================================== */}

        <section className="mb-8">
          <SectionHeader title="Latest Startup Success News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestNews.map((story) => (
              <NewsCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* ===================================================
            SECOND AD
        =================================================== */}

        <div className="mb-6">
          <AdBanner secondary />
        </div>

        {/* ===================================================
            SPONSORED EVENTS
        =================================================== */}

        <section className="bg-[#f8f8f8] border border-gray-100 rounded-md p-4 md:p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 border border-gray-200 bg-white rounded text-[7px] font-bold uppercase tracking-wide text-gray-500">
              Sponsorship
            </span>

            <span className="text-[9px] text-gray-400">
              Presented by our partners
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sponsorships.map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200 rounded-md min-h-[78px] flex flex-col items-center justify-center text-center px-3 hover:border-red-200 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center mb-2">
                  <Rocket
                    size={13}
                    className="text-red-600"
                    strokeWidth={1.8}
                  />
                </div>

                <p className="text-[9px] md:text-[10px] font-semibold text-gray-800">
                  {item}
                </p>

                <p className="text-[7px] text-gray-400 mt-0.5">
                  Sponsored Event
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================
            NEWSLETTER
        =================================================== */}

        <section className="rounded-md bg-[#071a2d] px-5 py-8 md:py-9 text-center mb-8">
          <h2 className="font-serif text-white text-[20px] md:text-[24px] font-bold">
            Stay Ahead with The Pride Times
          </h2>

          <p className="text-[10px] md:text-[11px] text-gray-300 mt-1">
            Daily briefings on Startup Success delivered to your inbox.
          </p>

          <form
            className="flex flex-col sm:flex-row justify-center gap-2 mt-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-[260px] h-9 rounded border border-white/10 bg-[#1d3347] px-3 text-[10px] text-white placeholder:text-gray-400 outline-none focus:border-red-500"
            />

            <button
              type="submit"
              className="h-9 px-5 rounded bg-red-600 hover:bg-red-700 text-white text-[10px] font-semibold transition-colors"
            >
              Subscribe Free
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default StartupSuccessPage;
