import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  ChevronRight,
  BookOpen,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router";
import CVImg from "../../../imports/Coverstory.png";

/* =========================================================
   TYPES
========================================================= */

type Story = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  time: string;
  image: string;
  path: string;
  hot?: boolean;
};

/* =========================================================
   HERO STORY
========================================================= */

const heroStory = {
  category: "COVER STORIES",
  title:
    "The AI Revolution: Reshaping Business, Economies, and the Future of Work",
  excerpt:
    "Our landmark cover story examines how artificial general intelligence is redefining every industry, labor market, and geopolitical equation on earth.",
  author: "Sagar Kumar",
  date: "September 15, 2026",
  time: "1 day ago",
  image: CVImg,
  path: "/technology",
};

/* =========================================================
   MORE STORIES
========================================================= */

const moreStories = [
  {
    id: 1,
    category: "COVER STORIES",
    title: "Pride Times 30: Leaders to Watch in 2026",
    time: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=350&fit=crop",
    path: "/leadership",
  },
];

/* =========================================================
   LATEST STORIES
========================================================= */

const latestStories: Story[] = [
  {
    id: 1,
    category: "TECHNOLOGY",
    title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and South...",
    author: "Sagar Kumar",
    time: "12 min ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=550&fit=crop",
    path: "/technology",
    hot: true,
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
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=900&h=550&fit=crop",
    path: "/technology",
    hot: true,
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
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&h=550&fit=crop",
    path: "/technology",
  },
  {
    id: 4,
    category: "TECHNOLOGY",
    title:
      "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 87 Languages",
    excerpt:
      "Apple's most ambitious software update rewrites the rules of personal AI, integrating on-device translation and generative...",
    author: "Sagar Kumar",
    time: "3 hr ago",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=900&h=550&fit=crop",
    path: "/technology",
  },
  {
    id: 5,
    category: "TECHNOLOGY",
    title: "Meta's LLaMA 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
    excerpt:
      "Open-source AI takes center stage as Meta's latest model outperforms proprietary systems in 14 of 18 enterprise reasoning...",
    author: "Sagar Kumar",
    time: "5 hr ago",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=550&fit=crop",
    path: "/technology",
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    title:
      "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
    excerpt:
      "The latest satellite constellation expansion brings high-speed internet to remote regions across Africa, South Asia, and Latin...",
    author: "Sagar Kumar",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&h=550&fit=crop",
    path: "/technology",
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
   AD COMPONENT
========================================================= */

function LeaderboardAd({
  label = "Advertisement Space",
}: {
  label?: string;
}) {
  return (
    <div className="relative w-full h-[90px] md:h-[96px] bg-[#102b33] overflow-hidden">
      <span className="absolute top-1.5 right-1.5 bg-white/80 text-[7px] text-gray-500 px-1.5 py-0.5">
        Advertisement
      </span>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
          Google AdSense
        </span>

        <span className="mt-1 text-sm md:text-base font-semibold text-white">
          {label}
        </span>

        <span className="mt-1 text-[8px] md:text-[9px] text-cyan-300">
          728 × 90 • Leaderboard
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SPONSORED CONTENT
========================================================= */

function SponsoredContent() {
  return (
    <aside className="w-full">
      <div className="border border-[#eee8d9] rounded-md overflow-hidden bg-[#fcfaf4]">
        <div className="flex items-center justify-between px-2.5 py-2">
          <span className="text-[8px] font-semibold tracking-[0.12em] text-gray-500 uppercase">
            Sponsored Content
          </span>

          <span className="text-[8px] text-gray-400">Ad</span>
        </div>

        <div className="mx-2.5 mb-2.5 h-[165px] md:h-[175px] bg-[#151a3b] flex flex-col items-center justify-center text-center px-4">
          <span className="text-[8px] font-bold tracking-[0.14em] text-yellow-300 uppercase">
            Featured Partner
          </span>

          <h3 className="mt-2 text-sm font-bold text-white">
            Your Ad Here
          </h3>

          <p className="mt-1 text-[9px] text-gray-300">
            Reach 2M+ business readers
          </p>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-black pb-2.5 mb-5">
      <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />

      <h2 className="text-[13px] md:text-sm font-bold tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   STORY CARD
========================================================= */

function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      to={story.path}
      className="group block border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative h-[155px] md:h-[165px] overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2">
          <span className="text-[8px] md:text-[9px] font-bold text-red-600 uppercase tracking-wide">
            {story.category}
          </span>

          {story.hot && (
            <span className="text-[8px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded-[2px]">
              HOT
            </span>
          )}
        </div>

        <h3 className="mt-1.5 font-serif text-[15px] md:text-[16px] font-bold leading-[1.18] text-gray-950 group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        <p className="mt-1.5 text-[10px] md:text-[11px] leading-[1.45] text-gray-500 line-clamp-2">
          {story.excerpt}
        </p>

        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100">
          <span className="text-[9px] text-gray-400">
            By {story.author}
          </span>

          <span className="flex items-center gap-1 text-[9px] text-gray-400">
            <Clock size={9} />
            {story.time}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function CoverStoriesPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <section className="pt-5 md:pt-6">
          <div className="border-t-[3px] border-red-600 pt-4 md:pt-5">
            <h1 className="font-serif text-[28px] md:text-[34px] lg:text-[38px] font-bold leading-tight text-gray-950">
              Cover Stories
            </h1>

            <p className="mt-1 text-[11px] md:text-[12px] text-gray-500">
              Our signature long-form investigations and magazine cover features.
            </p>
          </div>
        </section>

        {/* =================================================
            TOP AD
        ================================================= */}

        <section className="mt-5 md:mt-6">
          <LeaderboardAd label="Advertisement Space" />
        </section>

        {/* =================================================
            HERO + SIDEBAR
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,3.7fr)_minmax(220px,1.15fr)] gap-5 lg:gap-6 mt-5">

          {/* Hero */}
          <article className="min-w-0">
            <Link to={heroStory.path} className="group block">
              <div className="relative overflow-hidden rounded-md">
                <ImageWithFallback
                  src={heroStory.image}
                  alt={heroStory.title}
                  className="w-full h-[270px] sm:h-[350px] md:h-[430px] lg:h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-3">
                <span className="text-[8px] md:text-[9px] font-bold text-red-600 uppercase tracking-[0.12em]">
                  {heroStory.category}
                </span>

                <h2 className="mt-1.5 font-serif text-[25px] sm:text-[29px] md:text-[34px] lg:text-[31px] xl:text-[34px] font-bold leading-[1.12] text-gray-950 group-hover:text-red-600 transition-colors">
                  {heroStory.title}
                </h2>

                <p className="mt-2 text-[12px] md:text-[13px] lg:text-[14px] leading-[1.55] text-gray-600 max-w-5xl">
                  {heroStory.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-3 text-[9px] md:text-[10px] text-gray-400">
                  <span className="font-medium text-gray-500">
                    By {heroStory.author}
                  </span>

                  <span>•</span>

                  <span>{heroStory.date}</span>

                  <span>•</span>

                  <span>{heroStory.time}</span>
                </div>
              </div>
            </Link>
          </article>

          {/* Sidebar */}
          <aside className="lg:pt-0">
            <SponsoredContent />

            <div className="mt-5">
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <h3 className="text-[12px] font-bold uppercase tracking-wide">
                  More Stories
                </h3>
              </div>

              <div className="mt-2.5">
                {moreStories.map((story) => (
                  <Link
                    key={story.id}
                    to={story.path}
                    className="group flex gap-2.5 py-2.5 border-b border-gray-200"
                  >
                    <div className="w-[74px] h-[48px] shrink-0 overflow-hidden rounded-[3px]">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[7px] font-bold text-red-600 uppercase">
                        {story.category}
                      </span>

                      <h4 className="mt-0.5 text-[10px] md:text-[11px] font-bold leading-[1.25] text-gray-900 group-hover:text-red-600 transition-colors">
                        {story.title}
                      </h4>

                      <span className="mt-1 block text-[8px] text-gray-400">
                        {story.time}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* =================================================
            LATEST COVER STORIES
        ================================================= */}

        <section className="mt-8 md:mt-10">
          <SectionHeader title="Latest Cover Stories News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {latestStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* =================================================
            SECOND AD
        ================================================= */}

        <section className="mt-7 md:mt-9">
          <LeaderboardAd label="Business Solutions | Powered by The Pride Times" />
        </section>

        {/* =================================================
            SPONSORED EVENTS
        ================================================= */}

        <section className="mt-5 md:mt-6 rounded-md bg-[#f8f8f8] border border-gray-100 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-gray-400 border border-gray-200 bg-white px-2 py-1 rounded">
              Sponsorship
            </span>

            <span className="text-[9px] text-gray-400">
              Presented by our partners
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sponsoredEvents.map((event) => (
              <div
                key={event}
                className="min-h-[88px] bg-white border border-gray-200 rounded-md flex flex-col items-center justify-center text-center px-3 hover:border-gray-300 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center mb-2">
                  <span className="text-red-600 text-xs font-bold">✦</span>
                </div>

                <h3 className="text-[10px] md:text-[11px] font-bold text-gray-800">
                  {event}
                </h3>

                <p className="mt-1 text-[8px] text-gray-400">
                  Sponsored Event
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <section className="mt-6 md:mt-8 mb-12 md:mb-16">
          <div className="bg-[#071a2d] rounded-md px-5 py-8 md:py-9 text-center">
            <h2 className="font-serif text-[22px] md:text-[25px] font-bold text-white">
              Stay Ahead with The Pride Times
            </h2>

            <p className="mt-1.5 text-[10px] md:text-[11px] text-gray-400">
              Daily briefings on Cover Stories delivered to your inbox.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col sm:flex-row justify-center gap-2 max-w-[430px] mx-auto"
            >
              <div className="relative flex-1">
                <Mail
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-9 bg-[#20364b] border border-[#344b60] rounded-[3px] pl-9 pr-3 text-[10px] text-white placeholder:text-gray-500 outline-none focus:border-gray-400"
                />
              </div>

              <button
                type="submit"
                className="h-9 px-5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-[3px] transition-colors"
              >
                Subscribe Free
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
