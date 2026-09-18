import { Clock, Globe, Landmark, Plane, Users } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/* =========================================================
   TYPES
========================================================= */

interface Story {
  id: number;
  category?: string;
  title: string;
  excerpt?: string;
  author?: string;
  time: string;
  image?: string;
}

interface HeroStory {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  time: string;
  image: string;
}

/* =========================================================
   DATA
========================================================= */

const hero: HeroStory = {
  category: "INTERNATIONAL BUSINESS",
  title:
    "China's Manufacturing Sector Rebounds: PMI Hits 4-Year High of 54.2",
  excerpt:
    "Factory activity surges as domestic consumption recovers and export orders from Global South nations accelerate, defying Western trade barriers.",
  author: "Sagar Kumar",
  time: "1 hr ago",
  image:
    "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=1600&h=900&fit=crop",
};

const moreStories: Story[] = [
  {
    id: 1,
    category: "INTERNATIONAL BUSINESS",
    title: "India Overtakes Germany as World's 3rd Largest Economy",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    category: "INTERNATIONAL BUSINESS",
    title: "EU-US Digital Trade Agreement Unlocks $800B in Annual Commerce",
    time: "3 hr ago",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop",
  },
];

const latestStories: Story[] = [
  {
    id: 1,
    category: "TECHNOLOGY",
    title:
      "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "Nvidia announces an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and Southeast Asia.",
    author: "Sagar Kumar",
    time: "12 min ago",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title:
      "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    excerpt:
      "Hyperscaler capex tops $700B while grid, water and community pushback intensifies across key markets.",
    author: "Sagar Kumar",
    time: "35 min ago",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    title:
      "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
    excerpt:
      "IBM and Google jointly announce stable 1,000-qubit processors, marking a watershed moment for enterprise quantum computing.",
    author: "Sagar Kumar",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    category: "TECHNOLOGY",
    title:
      "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 87 Languages",
    excerpt:
      "Apple's latest ambitious software update rewrites the rules of personal AI, integrating on-device translation and generative features.",
    author: "Sagar Kumar",
    time: "3 hr ago",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    category: "TECHNOLOGY",
    title:
      "Meta's LLaMA 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
    excerpt:
      "Open-source AI takes center stage as Meta's latest model outperforms proprietary systems in enterprise reasoning benchmarks.",
    author: "Sagar Kumar",
    time: "5 hr ago",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    title:
      "SpaceX Starlink Gen 3 Delivers 1Gbps to 50 Million New Users Globally",
    excerpt:
      "The latest satellite constellation expansion brings high-speed internet to remote regions across Africa, South Asia, and Latin America.",
    author: "Sagar Kumar",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=500&fit=crop",
  },
];

/* =========================================================
   REGIONAL STORIES
========================================================= */

const europeStories: Story[] = [
  {
    id: 1,
    title:
      "EU finance ministers agree on joint fiscal buffer to shield eurozone from future energy-price shocks.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "France and Germany unveil joint industrial policy to counter Chinese overcapacity in green technology.",
    time: "1 hr ago",
  },
  {
    id: 3,
    title:
      "UK-EU youth mobility scheme enters final negotiation stage after years of post-Brexit deadlock.",
    time: "3 hrs ago",
  },
  {
    id: 4,
    title:
      "Italy's coalition government survives no-confidence vote tied to pension reform dispute.",
    time: "5 hrs ago",
  },
];

const asiaPacificStories: Story[] = [
  {
    id: 1,
    title:
      "ASEAN bloc finalizes regional supply-chain resilience pact covering semiconductors and critical minerals.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Japan and South Korea restart high-level trade talks after three-year diplomatic freeze.",
    time: "2 hrs ago",
  },
  {
    id: 3,
    title:
      "China's central bank signals further stimulus as property-sector deleveraging drags on growth.",
    time: "4 hrs ago",
  },
  {
    id: 4,
    title:
      "India overtakes Japan to become world's fourth-largest economy by nominal GDP.",
    time: "6 hrs ago",
  },
];

const americasStories: Story[] = [
  {
    id: 1,
    title:
      "Mercosur-EU trade deal clears final ratification hurdle after 25 years of negotiation.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Mexico's peso strengthens on record nearshoring investment inflows from US manufacturers.",
    time: "3 hrs ago",
  },
  {
    id: 3,
    title:
      "Brazil hosts first-ever BRICS+ summit expansion talks, weighing new membership bids.",
    time: "5 hrs ago",
  },
  {
    id: 4,
    title:
      "Canada and US resolve softwood lumber dispute after a decade of intermittent tariffs.",
    time: "7 hrs ago",
  },
];

const menaAfricaStories: Story[] = [
  {
    id: 1,
    title:
      "African Continental Free Trade Area reports record intra-African trade volumes for H1 2026.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Gulf sovereign wealth funds pledge $40B toward African renewable-energy infrastructure.",
    time: "2 hrs ago",
  },
  {
    id: 3,
    title:
      "Egypt and Ethiopia reach preliminary agreement on Nile water-sharing after decade-long dispute.",
    time: "4 hrs ago",
  },
  {
    id: 4,
    title:
      "Saudi Arabia and UAE deepen economic integration with new joint investment authority.",
    time: "6 hrs ago",
  },
];

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b-2 border-black pb-2.5 mb-5">
      <div className="flex items-center gap-2">
        {icon && <span className="text-red-600">{icon}</span>}

        <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.12em] text-gray-900">
          {title}
        </h2>
      </div>
    </div>
  );
}

/* =========================================================
   AD BANNER
========================================================= */

function AdBanner({ bottom = false }: { bottom?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden ${
        bottom ? "mt-8 mb-8" : "mb-5 md:mb-6"
      }`}
    >
      <div className="h-[88px] md:h-[90px] w-full bg-[#102a32] flex flex-col items-center justify-center text-center">
        <span className="text-[8px] md:text-[9px] font-bold tracking-[0.18em] text-cyan-400 uppercase">
          GOOGLE ADSENSE
        </span>

        <span className="mt-1 text-[12px] md:text-sm font-semibold text-white">
          {bottom
            ? "Business Solutions | Powered by The Pride Times"
            : "Advertisement Space"}
        </span>

        <span className="mt-1 text-[8px] md:text-[9px] text-cyan-300">
          728 × 90 • Leaderboard
        </span>
      </div>

      <span className="absolute right-1 top-1 text-[7px] text-gray-500 bg-white/70 px-1">
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
      <div className="border border-[#eee9db] bg-[#fbfaf4] p-2">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[8px] font-semibold uppercase tracking-widest text-gray-400">
            Sponsored Content
          </span>

          <span className="text-[8px] text-gray-400">Ad</span>
        </div>

        <div className="h-[160px] md:h-[168px] bg-[#171d3d] flex flex-col items-center justify-center text-center">
          <span className="text-[8px] font-bold tracking-widest text-yellow-400 uppercase">
            Featured Partner
          </span>

          <h3 className="text-white font-semibold text-sm mt-2">
            Your Ad Here
          </h3>

          <p className="text-[9px] text-gray-300 mt-2">
            Reach 2M+ business readers
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="border-b-2 border-black pb-2">
          <h3 className="text-[12px] font-bold uppercase tracking-wide">
            More Stories
          </h3>
        </div>

        <div>
          {moreStories.map((story) => (
            <article
              key={story.id}
              className="flex gap-3 py-3 border-b border-gray-200 group cursor-pointer"
            >
              <div className="w-[72px] h-[48px] shrink-0 overflow-hidden rounded-sm">
                <ImageWithFallback
                  src={story.image || ""}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0">
                <span className="text-[7px] font-bold text-red-600 uppercase tracking-wide">
                  {story.category}
                </span>

                <h4 className="text-[10px] md:text-[11px] font-semibold leading-tight mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
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
    </aside>
  );
}

/* =========================================================
   HERO
========================================================= */

function HeroStoryCard({ story }: { story: HeroStory }) {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-[6px]">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-[300px] sm:h-[370px] md:h-[440px] lg:h-[455px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
      </div>

      <div className="pt-3 md:pt-4">
        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.12em] text-red-600">
          {story.category}
        </span>

        <h2 className="mt-1.5 font-serif text-[25px] sm:text-[30px] md:text-[36px] lg:text-[39px] font-bold leading-[1.08] text-gray-950 group-hover:text-red-600 transition-colors">
          {story.title}
        </h2>

        <p className="mt-2 text-[13px] md:text-[14px] leading-[1.55] text-gray-600 max-w-5xl">
          {story.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-3 pt-2 border-t border-gray-200 text-[9px] md:text-[10px] text-gray-400">
          <span>By {story.author}</span>

          <span className="flex items-center gap-1">
            <Clock size={10} />
            {story.time}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   LATEST NEWS CARD
========================================================= */

function LatestNewsCard({ story }: { story: Story }) {
  return (
    <article className="group overflow-hidden border border-gray-200 rounded-[5px] bg-white hover:shadow-sm transition-shadow">
      <div className="h-[155px] sm:h-[175px] md:h-[185px] overflow-hidden">
        <ImageWithFallback
          src={story.image || ""}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        />
      </div>

      <div className="p-3 md:p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[7px] md:text-[8px] font-bold text-red-600 uppercase tracking-[0.12em]">
            {story.category}
          </span>

          <span className="text-[7px] text-gray-400 uppercase">
            Latest
          </span>
        </div>

        <h3 className="font-serif text-[15px] md:text-[17px] font-bold leading-[1.16] mt-1.5 text-gray-900 group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        <p className="mt-1.5 text-[10px] md:text-[11px] leading-[1.45] text-gray-500 line-clamp-2">
          {story.excerpt}
        </p>

        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100">
          <span className="text-[8px] text-gray-400">
            By {story.author}
          </span>

          <span className="flex items-center gap-1 text-[8px] text-gray-400">
            <Clock size={9} />
            {story.time}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   REGIONAL STORY LIST
========================================================= */

function RegionalStories({
  title,
  icon,
  stories,
}: {
  title: string;
  icon: React.ReactNode;
  stories: Story[];
}) {
  return (
    <section>
      <SectionHeader title={title} icon={icon} />

      <div>
        {stories.map((story) => (
          <article
            key={story.id}
            className="group py-3 border-b border-gray-200 last:border-b-0 cursor-pointer"
          >
            <h3 className="text-[12px] md:text-[13px] font-medium leading-[1.45] text-gray-900 group-hover:text-red-600 transition-colors">
              {story.title}
            </h3>

            <div className="flex items-center gap-1.5 mt-1.5 text-[9px] text-gray-400">
              <Clock size={9} />
              <span>{story.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   SPONSORSHIP
========================================================= */

function SponsorshipSection() {
  const events = [
    "Global Finance Summit 2026",
    "Tech Leaders Forum",
    "Energy Transition Conference",
    "AI & Business World",
  ];

  return (
    <section className="mt-5 rounded-[6px] bg-[#f7f7f7] border border-gray-100 p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="border border-gray-300 rounded px-2 py-1 text-[7px] font-semibold uppercase tracking-widest text-gray-400">
          Sponsorship
        </span>

        <span className="text-[9px] text-gray-400">
          Presented by our partners
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {events.map((event) => (
          <div
            key={event}
            className="bg-white border border-gray-200 rounded-[4px] min-h-[90px] flex flex-col items-center justify-center text-center px-3"
          >
            <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <span className="text-red-500 text-xs">◆</span>
            </div>

            <h3 className="text-[9px] md:text-[10px] font-semibold text-gray-800">
              {event}
            </h3>

            <span className="text-[8px] text-gray-400 mt-1">
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
    <section className="mt-5 mb-12 rounded-[6px] bg-[#061b31] px-5 py-8 md:py-10 text-center">
      <h2 className="font-serif text-xl md:text-2xl font-bold text-white">
        Stay Ahead with The Pride Times
      </h2>

      <p className="text-[10px] md:text-[11px] text-gray-400 mt-2">
        Daily briefings on International Business delivered to your inbox.
      </p>

      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="h-9 flex-1 rounded-[3px] border border-gray-600 bg-[#172d43] px-3 text-[10px] text-white placeholder:text-gray-400 outline-none focus:border-red-500"
        />

        <button
          type="button"
          className="h-9 rounded-[3px] bg-red-600 hover:bg-red-700 px-5 text-[10px] font-semibold text-white transition-colors"
        >
          Subscribe Free
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function InternationalNewsPage() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 antialiased">
      {/* =====================================================
          FULL WIDTH PAGE CONTAINER
          No max-w-7xl restriction
      ===================================================== */}

      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-5 md:py-6">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-t-[3px] border-red-600 pt-4 pb-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
            <div>
              <h1 className="font-serif text-[30px] sm:text-[34px] md:text-[38px] lg:text-[42px] font-bold leading-none text-gray-950">
                International Business
              </h1>

              <p className="mt-2 text-[11px] md:text-xs text-gray-500">
                Trade, FDI, emerging markets, and global corporate strategy.
              </p>
            </div>

            <span className="hidden md:block text-[9px] uppercase tracking-[0.16em] text-gray-400">
              The Pride Times
            </span>
          </div>
        </header>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <AdBanner />

        {/* =================================================
            HERO + SPONSORED CONTENT
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,3.3fr)_minmax(260px,1fr)] gap-5 xl:gap-6 mb-8">
          <div className="min-w-0">
            <HeroStoryCard story={hero} />
          </div>

          <div className="min-w-0">
            <SponsoredContent />
          </div>
        </section>

        {/* =================================================
            LATEST INTERNATIONAL BUSINESS NEWS
        ================================================= */}

        <section className="border-t-2 border-black pt-4">
          <SectionHeader title="Latest International Business News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestStories.map((story) => (
              <LatestNewsCard
                key={story.id}
                story={story}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <AdBanner bottom />

        {/* =================================================
            REGIONAL COVERAGE
        ================================================= */}

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 border-t-2 border-black pt-5">
          <RegionalStories
            title="Europe"
            icon={<Landmark size={15} />}
            stories={europeStories}
          />

          <RegionalStories
            title="Asia-Pacific"
            icon={<Globe size={15} />}
            stories={asiaPacificStories}
          />

          <RegionalStories
            title="Americas"
            icon={<Plane size={15} />}
            stories={americasStories}
          />

          <RegionalStories
            title="Middle East & Africa"
            icon={<Users size={15} />}
            stories={menaAfricaStories}
          />
        </section>

        {/* =================================================
            SPONSORSHIP
        ================================================= */}

        <SponsorshipSection />

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <Newsletter />

        {/* =================================================
            BOTTOM EDITORIAL LINE
        ================================================= */}

        <div className="border-t border-gray-200 pt-3 pb-2 flex flex-col sm:flex-row justify-between gap-2 text-[8px] md:text-[9px] uppercase tracking-[0.12em] text-gray-400">
          <span>International Business</span>

          <span>
            Trade · FDI · Global Markets · Global Affairs
          </span>
        </div>
      </main>
    </div>
  );
}
