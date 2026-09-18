import { Clock, Globe } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/* =========================================================
   WORLD & GEOPOLITICS PAGE
   Designed to match the supplied THE PRIDE TIMES reference
========================================================= */

/* =========================================================
   HERO DATA
========================================================= */

const worldHero = {
  category: "WORLD & GEOPOLITICS",
  title:
    "Saudi Crown Prince to Meet French Premier in Paris on Monday",
  excerpt:
    "High-stakes bilateral talks expected to cover energy cooperation, defense contracts, and the Kingdom's Vision 2030 investment partnership with European firms.",
  author: "Sagar Kumar",
  time: "17 min ago",
  image:
    "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1400&auto=format&fit=crop&q=85",
};

/* =========================================================
   MORE STORIES
========================================================= */

const moreStories = [
  {
    id: 1,
    category: "WORLD & GEOPOLITICS",
    title:
      "NATO Deploys 50,000 Additional Troops Along Eastern Flank",
    time: "25 min ago",
    image:
      "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    category: "WORLD & GEOPOLITICS",
    title:
      "South China Sea: Philippines and US Begin Joint Naval Patrols",
    time: "1 hr ago",
    image:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    category: "WORLD & GEOPOLITICS",
    title:
      "UN Security Council Passes Historic AI Governance Resolution",
    time: "2 hrs ago",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    category: "WORLD & GEOPOLITICS",
    title:
      "Iran Nuclear Talks Resume in Vienna: Deal Framework Emerging",
    time: "3 hrs ago",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&auto=format&fit=crop&q=80",
  },
];

/* =========================================================
   LATEST NEWS
========================================================= */

const latestNews = [
  {
    id: 1,
    category: "TECHNOLOGY",
    tag: "HOT",
    title:
      "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and Southeast Asia.",
    time: "12 min ago",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=700&auto=format&fit=crop&q=85",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    tag: "HOT",
    title:
      "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    excerpt:
      "Hyperscaler capex tops $700B while grid, water and community pushback intensifies across key markets.",
    time: "35 min ago",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=700&auto=format&fit=crop&q=85",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    tag: "",
    title:
      "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
    excerpt:
      "IBM and Google jointly announce stable 1,000-qubit processors, marking a watershed moment for enterprise quantum computing.",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&auto=format&fit=crop&q=85",
  },
  {
    id: 4,
    category: "TECHNOLOGY",
    tag: "",
    title:
      "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 87 Languages",
    excerpt:
      "Apple's most ambitious software update rewrites the rules of personal AI, integrating on-device translation and generative intelligence.",
    time: "3 hr ago",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&auto=format&fit=crop&q=85",
  },
  {
    id: 5,
    category: "TECHNOLOGY",
    tag: "",
    title:
      "Meta's LLaMA 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
    excerpt:
      "Open-source AI takes center stage as Meta's latest model outperforms proprietary systems in enterprise reasoning tests.",
    time: "5 hr ago",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700&auto=format&fit=crop&q=85",
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    tag: "",
    title:
      "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
    excerpt:
      "The latest satellite constellation expansion brings high-speed internet to remote regions across Africa, South Asia, and Latin America.",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1517976547714-720226b864c1?w=700&auto=format&fit=crop&q=85",
  },
];

/* =========================================================
   SPONSORED EVENTS
========================================================= */

const sponsoredEvents = [
  "Global Finance Summit 2026",
  "Tech Leaders Forum",
  "Energy Transition Conference",
  "AI & Business World",
];

/* =========================================================
   ADVERTISEMENT
========================================================= */

function Advertisement({
  label = "Advertisement Space",
}: {
  label?: string;
}) {
  return (
    <div className="relative w-full h-[90px] md:h-[90px] bg-gradient-to-r from-[#0c252d] via-[#173943] to-[#28596a] overflow-hidden">
      <span className="absolute top-1 right-1 text-[6px] md:text-[7px] bg-white/80 text-gray-500 px-1.5 py-0.5">
        Advertisement
      </span>

      <div className="h-full flex flex-col items-center justify-center text-center">
        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-[#52a8cf]">
          GOOGLE ADSENSE
        </span>

        <span className="mt-1 text-[13px] md:text-sm font-semibold text-white">
          {label}
        </span>

        <span className="mt-1 text-[8px] md:text-[9px] text-[#8ebdce]">
          728 × 90 · Leaderboard
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-black pb-2 mb-5">
      <h2 className="font-bold text-[15px] md:text-base text-[#17140F]">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   SPONSORED CONTENT
========================================================= */

function SponsoredCard() {
  return (
    <div className="border border-[#e5dfd0] bg-[#fffdf7] overflow-hidden rounded-[4px]">
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Sponsored Content
        </span>

        <span className="text-[7px] text-gray-400">
          Ad
        </span>
      </div>

      <div className="mx-3 mb-3 h-[155px] md:h-[158px] bg-[#151a39] flex flex-col items-center justify-center text-center">
        <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-yellow-400">
          Featured Partner
        </span>

        <span className="mt-2 text-white text-sm font-semibold">
          Your Ad Here
        </span>

        <span className="mt-1 text-[9px] text-gray-300">
          Reach 2M+ business readers
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   MORE STORIES SIDEBAR
========================================================= */

function MoreStories() {
  return (
    <div className="mt-5">
      <div className="border-b border-black pb-1.5 mb-2.5">
        <h3 className="text-[12px] font-bold uppercase tracking-wide">
          More Stories
        </h3>
      </div>

      <div>
        {moreStories.map((story) => (
          <article
            key={story.id}
            className="flex gap-3 py-2.5 border-b border-gray-200 group cursor-pointer"
          >
            <div className="w-[62px] h-[50px] shrink-0 overflow-hidden rounded-[3px] bg-gray-100">
              <ImageWithFallback
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="min-w-0">
              <p className="text-[7px] uppercase font-bold tracking-wide text-red-600 mb-0.5">
                {story.category}
              </p>

              <h4 className="text-[10px] md:text-[11px] font-semibold leading-[1.2] text-[#17140F] group-hover:text-red-600 transition-colors">
                {story.title}
              </h4>

              <span className="text-[8px] text-gray-400 mt-1 block">
                {story.time}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   LATEST NEWS CARD
========================================================= */

function NewsCard({
  story,
}: {
  story: (typeof latestNews)[number];
}) {
  return (
    <article className="group border border-gray-200 rounded-[5px] overflow-hidden bg-white cursor-pointer hover:shadow-md transition-shadow duration-300">
      <div className="relative h-[155px] sm:h-[165px] md:h-[155px] lg:h-[165px] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-wide text-red-600">
            {story.category}
          </span>

          {story.tag && (
            <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-[2px] text-[6px] md:text-[7px] font-bold uppercase">
              {story.tag}
            </span>
          )}
        </div>

        <h3 className="font-serif text-[13px] md:text-[14px] font-bold leading-[1.2] text-[#17140F] group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        <p className="mt-1.5 text-[9px] md:text-[10px] text-gray-500 leading-[1.4] line-clamp-2">
          {story.excerpt}
        </p>

        <div className="flex items-center justify-between mt-2.5">
          <span className="text-[8px] text-gray-400">
            By Sagar Kumar
          </span>

          <span className="flex items-center gap-1 text-[8px] text-gray-400">
            <Clock size={8} />
            {story.time}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SPONSORED EVENTS
========================================================= */

function SponsoredEvents() {
  return (
    <section className="bg-[#f8f8f8] rounded-[5px] p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="border border-gray-300 rounded-[3px] px-2 py-1 text-[7px] font-bold uppercase tracking-wide text-gray-400">
          Sponsorship
        </span>

        <span className="text-[8px] text-gray-400">
          Presented by our partners
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {sponsoredEvents.map((event) => (
          <div
            key={event}
            className="bg-white border border-gray-200 rounded-[4px] min-h-[92px] flex flex-col items-center justify-center text-center px-3 py-3"
          >
            <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <Globe
                size={13}
                className="text-red-500"
                strokeWidth={2}
              />
            </div>

            <h3 className="text-[9px] font-bold text-gray-800">
              {event}
            </h3>

            <span className="text-[7px] text-gray-400 mt-1">
              Sponsored Event
            </span>
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
    <section className="bg-[#061a2d] rounded-[5px] px-5 py-7 md:py-8 text-center text-white">
      <h2 className="font-serif text-xl md:text-2xl font-bold">
        Stay Ahead with The Pride Times
      </h2>

      <p className="text-[10px] md:text-[11px] text-gray-400 mt-1.5">
        Daily briefings on World &amp; Geopolitics delivered to your inbox.
      </p>

      <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2.5">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:w-[190px] md:w-[210px] h-9 px-3 rounded-[3px] bg-[#20364a] border border-[#33495b] text-[10px] text-white placeholder:text-gray-400 outline-none focus:border-gray-400"
        />

        <button className="h-9 px-5 bg-[#e31b23] hover:bg-[#c9151c] text-white text-[10px] font-bold rounded-[3px] transition-colors">
          Subscribe Free
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function WorldPage() {
  return (
    <main className="w-full bg-white text-[#17140F] antialiased">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8">

        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <header className="border-t-[3px] border-[#e31b23] pt-4 md:pt-5 mb-5 md:mb-6">
          <h1 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] font-bold leading-tight tracking-tight">
            World &amp; Geopolitics
          </h1>

          <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-500 mt-1">
            International relations, security, diplomacy, and global power dynamics.
          </p>
        </header>

        {/* =================================================
            TOP AD
        ================================================= */}

        <div className="mb-5 md:mb-6">
          <Advertisement />
        </div>

        {/* =================================================
            HERO + SIDEBAR
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_235px] xl:grid-cols-[minmax(0,1fr)_260px] gap-4 md:gap-5 lg:gap-6 mb-10 md:mb-12">

          {/* HERO STORY */}

          <article className="group cursor-pointer min-w-0">
            <div className="relative overflow-hidden rounded-[5px] bg-gray-100 h-[250px] sm:h-[330px] md:h-[390px] lg:h-[360px] xl:h-[400px]">
              <ImageWithFallback
                src={worldHero.image}
                alt={worldHero.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wide text-red-600">
                  {worldHero.category}
                </span>
              </div>

              <h2 className="font-serif text-[23px] sm:text-[29px] md:text-[34px] lg:text-[30px] xl:text-[34px] font-bold leading-[1.08] tracking-tight group-hover:text-red-600 transition-colors">
                {worldHero.title}
              </h2>

              <p className="text-[11px] sm:text-xs md:text-[13px] text-gray-500 leading-[1.5] mt-2 max-w-5xl">
                {worldHero.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 pt-2.5 border-t border-gray-200 text-[8px] sm:text-[9px] text-gray-400">
                <span>By {worldHero.author}</span>

                <span className="w-1 h-1 bg-gray-300 rounded-full" />

                <span>
                  September 15, 2026
                </span>

                <span className="w-1 h-1 bg-gray-300 rounded-full" />

                <span className="flex items-center gap-1">
                  <Clock size={9} />
                  {worldHero.time}
                </span>
              </div>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}

          <aside>
            <SponsoredCard />
            <MoreStories />
          </aside>
        </section>

        {/* =================================================
            LATEST NEWS
        ================================================= */}

        <section className="mb-9 md:mb-11">
          <SectionHeader title="Latest World & Geopolitics News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {latestNews.map((story) => (
              <NewsCard
                key={story.id}
                story={story}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            SECOND AD
        ================================================= */}

        <div className="mb-5 md:mb-6">
          <Advertisement label="Business Solutions | Powered by The Pride Times" />
        </div>

        {/* =================================================
            SPONSORED EVENTS
        ================================================= */}

        <div className="mb-5 md:mb-6">
          <SponsoredEvents />
        </div>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <div className="mb-12 md:mb-16">
          <Newsletter />
        </div>
      </div>
    </main>
  );
}
