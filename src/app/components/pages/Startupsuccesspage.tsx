import { Clock, Rocket } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router";
import { specialArticlePathByTitle } from "../../data/specialArticleData";

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
   RELATED / MORE STORIES
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
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-[15px] md:text-[17px] font-bold text-gray-900 uppercase tracking-tight">
          {title}
        </h2>

        <span className="hidden sm:block text-[8px] uppercase tracking-[0.16em] text-gray-400">
          The Pride Times
        </span>
      </div>
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
   SPONSORED CONTENT + RELATED COVERAGE
========================================================= */

function SponsoredContent() {
  return (
    <aside className="w-full">
      <div className="border border-gray-200 bg-white overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-gray-500">
            Sponsored Content
          </span>

          <span className="text-[8px] text-gray-400">Ad</span>
        </div>

        <div className="mx-3 my-3 h-[145px] md:h-[160px] bg-[#11172f] flex flex-col items-center justify-center text-center">
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

      <div className="mt-6">
        <div className="border-t-2 border-black pt-3 mb-2">
          <h3 className="text-[12px] font-bold uppercase tracking-tight text-gray-900">
            Related Coverage
          </h3>
        </div>

        <div>
          {moreStories.map((story) => (
            <Link
              key={story.title}
              to={specialArticlePathByTitle(story.title)}
              className="group flex gap-3 py-3 border-b border-gray-200"
            >
              <div className="w-[82px] h-[58px] shrink-0 overflow-hidden">
                <ImageWithFallback
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[8px] font-bold uppercase tracking-wide text-red-600">
                  {story.category}
                </p>

                <p className="mt-1 text-[11px] md:text-[12px] font-semibold leading-[1.3] text-gray-900 group-hover:text-red-600 transition-colors">
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
   HERO STORY
========================================================= */

function HeroStory() {
  return (
    <article className="group">
      <Link to={specialArticlePathByTitle(hero.title)} className="block">
        <div className="w-full overflow-hidden">
          <ImageWithFallback
            src={hero.image}
            alt={hero.title}
            className="w-full h-[250px] sm:h-[330px] md:h-[410px] lg:h-[445px] object-cover transition-transform duration-700 group-hover:scale-[1.015]"
          />
        </div>

        <div className="pt-3">
          <div className="flex items-center gap-2">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
              {hero.category}
            </span>

            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <h2 className="mt-2 font-serif text-[27px] sm:text-[31px] md:text-[36px] lg:text-[40px] font-bold leading-[1.06] text-gray-950 group-hover:text-red-600 transition-colors">
            {hero.title}
          </h2>

          <p className="mt-3 max-w-4xl text-[12px] md:text-[14px] text-gray-600 leading-[1.55]">
            {hero.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[9px] md:text-[10px]">
            <span className="font-semibold text-gray-700">
              By {hero.author}
            </span>

            <span className="text-gray-400 flex items-center gap-1">
              <Clock size={10} />
              {hero.time}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* =========================================================
   MAJOR STORY
========================================================= */

function MajorStory({
  story,
}: {
  story: (typeof latestNews)[number];
}) {
  return (
    <Link
      to={specialArticlePathByTitle(story.title)}
      className="group grid grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[145px_minmax(0,1fr)] gap-3 py-3 border-b border-gray-200"
    >
      <div className="w-full h-[78px] sm:h-[92px] overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-bold uppercase tracking-wide text-red-600">
          {story.category}
        </p>

        <h3 className="mt-1 font-serif text-[13px] sm:text-[15px] font-bold leading-[1.18] text-gray-900 group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        <p className="hidden sm:block mt-1 text-[10px] text-gray-500 leading-[1.4] line-clamp-2">
          {story.excerpt}
        </p>

        <div className="mt-1.5 text-[8px] text-gray-400 flex items-center gap-1">
          <Clock size={9} />
          {story.time}
        </div>
      </div>
    </Link>
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
      to={specialArticlePathByTitle(story.title)}
      className="group block border-t border-gray-200 pt-3"
    >
      <div className="w-full h-[155px] sm:h-[170px] overflow-hidden mb-3">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
        />
      </div>

      <p className="text-[8px] font-bold uppercase tracking-wide text-red-600">
        {story.category}
      </p>

      <h3 className="mt-1.5 font-serif text-[14px] md:text-[15px] font-bold leading-[1.18] text-gray-900 group-hover:text-red-600 transition-colors">
        {story.title}
      </h3>

      <p className="mt-1.5 text-[10px] md:text-[11px] text-gray-600 leading-[1.45] line-clamp-2">
        {story.excerpt}
      </p>

      <div className="flex items-center justify-between gap-2 mt-2.5 text-[8px] text-gray-400">
        <span>By Sagar Kumar</span>

        <span className="flex items-center gap-1">
          <Clock size={9} />
          {story.time}
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   LATEST NEWS STREAM
========================================================= */

function LatestNewsStream() {
  return (
    <section>
      <SectionHeader title="Latest News" />

      <div className="border-t border-gray-200">
        {latestNews.map((story) => (
          <Link
            key={`stream-${story.id}`}
            to={specialArticlePathByTitle(story.title)}
            className="group grid grid-cols-[72px_minmax(0,1fr)] sm:grid-cols-[95px_minmax(0,1fr)] gap-3 py-3 border-b border-gray-200"
          >
            <div className="text-[9px] md:text-[10px] text-gray-400 font-medium">
              <span className="flex items-center gap-1">
                <Clock size={9} />
                {story.time}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[8px] font-bold uppercase tracking-wide text-red-600">
                {story.category}
              </p>

              <h3 className="mt-1 text-[12px] md:text-[13px] font-semibold leading-[1.3] text-gray-900 group-hover:text-red-600 transition-colors">
                {story.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
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
   SPONSORSHIP SECTION
========================================================= */

function SponsorshipSection() {
  return (
    <section className="bg-[#f8f8f8] border border-gray-100 p-4 md:p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-1 border border-gray-200 bg-white text-[7px] font-bold uppercase tracking-wide text-gray-500">
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
            className="bg-white border border-gray-200 min-h-[78px] flex flex-col items-center justify-center text-center px-3 hover:border-red-200 transition-colors"
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
  );
}

/* =========================================================
   NEWSLETTER
========================================================= */

function Newsletter() {
  return (
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
          aria-label="Email address"
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
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function StartupSuccessPage() {
  const majorStories = latestNews.slice(0, 2);
  const secondaryStories = latestNews.slice(2, 5);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 antialiased">
      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-6 md:py-8">
        {/* ===================================================
            PAGE TITLE
        =================================================== */}

        <header className="border-t-[3px] border-red-600 pt-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
            <div>
              <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold leading-tight">
                Startup Success
              </h1>

              <p className="mt-1 text-[11px] md:text-[13px] text-gray-500">
                The world's most exciting startups, funding rounds, and founder
                stories.
              </p>
            </div>

            <span className="text-[8px] uppercase tracking-[0.18em] text-gray-400">
              Business • Technology • Startups
            </span>
          </div>
        </header>

        {/* ===================================================
            TOP AD
        =================================================== */}

        <div className="mb-7">
          <AdBanner />
        </div>

        {/* ===================================================
            LEAD EDITORIAL AREA
        =================================================== */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.45fr)_minmax(280px,1fr)] gap-6 lg:gap-7 mb-9">
          {/* Lead Story */}

          <HeroStory />

          {/* Supporting Editorial Rail */}

          <aside className="lg:border-l lg:border-gray-200 lg:pl-5">
            <div className="border-t-2 border-black pt-3 mb-1">
              <h2 className="text-[12px] font-bold uppercase tracking-tight">
                Major Technology Stories
              </h2>
            </div>

            {majorStories.map((story) => (
              <MajorStory key={`major-${story.id}`} story={story} />
            ))}

            <SponsoredContent />
          </aside>
        </section>

        {/* ===================================================
            STARTUP COVERAGE
        =================================================== */}

        <section className="mb-9">
          <SectionHeader title="Startup & Technology Coverage" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8">
            {secondaryStories.map((story) => (
              <MajorStory
                key={`secondary-${story.id}`}
                story={story}
              />
            ))}
          </div>
        </section>

        {/* ===================================================
            LATEST STARTUP SUCCESS NEWS
        =================================================== */}

        <section className="mb-9">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)] gap-7">
            {/* News Cards */}

            <div>
              <SectionHeader title="Latest Startup Success News" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-7">
                {latestNews.slice(0, 4).map((story) => (
                  <NewsCard key={`latest-${story.id}`} story={story} />
                ))}
              </div>
            </div>

            {/* Chronological Stream */}

            <div className="lg:border-l lg:border-gray-200 lg:pl-5">
              <LatestNewsStream />
            </div>
          </div>
        </section>

        {/* ===================================================
            SECOND AD
        =================================================== */}

        <div className="mb-7">
          <AdBanner secondary />
        </div>

        {/* ===================================================
            MORE STARTUP COVERAGE
        =================================================== */}

        <section className="mb-8">
          <SectionHeader title="More Startup Coverage" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {moreStories.map((story) => (
              <Link
                key={`coverage-${story.title}`}
                to={specialArticlePathByTitle(story.title)}
                className="group flex gap-4 py-4 border-b border-gray-200"
              >
                <div className="w-[120px] sm:w-[150px] h-[82px] sm:h-[96px] shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[8px] font-bold uppercase tracking-wide text-red-600">
                    {story.category}
                  </p>

                  <h3 className="mt-1 font-serif text-[13px] sm:text-[15px] font-bold leading-[1.2] text-gray-900 group-hover:text-red-600 transition-colors">
                    {story.title}
                  </h3>

                  <p className="mt-2 text-[8px] text-gray-400">
                    {story.time}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===================================================
            SPONSORED EVENTS
        =================================================== */}

        <SponsorshipSection />

        {/* ===================================================
            NEWSLETTER
        =================================================== */}

        <Newsletter />
      </main>
    </div>
  );
}

export default StartupSuccessPage;
