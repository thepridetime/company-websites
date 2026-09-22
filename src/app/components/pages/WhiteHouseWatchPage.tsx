
import { TimeAgo } from "../../utils/timeAgo";
import { Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/* =========================================================
   TYPES
========================================================= */

type Story = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  image: string;
};

/* =========================================================
   HERO STORY
========================================================= */

const hero = {
  category: "WHITE HOUSE WATCH",
  title: "President Signs Historic AI Accountability Act into Law",
  excerpt:
    "The most comprehensive AI legislation in US history mandates transparency, safety audits, and liability frameworks for high-risk AI systems across 14 sectors.",
  author: "Sagar Kumar",
  date: "September 15, 2026",
  publishedAt: "2026-09-21T09:49:00Z",
  image:
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=85",
};

/* =========================================================
   MORE STORIES
========================================================= */

const moreStories = [
  {
    id: 1,
    category: "WHITE HOUSE WATCH",
    title: "White House Announces $500B Infrastructure Investment in AI",
    publishedAt: "2026-09-21T08:19:00Z",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    category: "WHITE HOUSE WATCH",
    title:
      "Administration Begins New Round of Federal Technology Reviews",
    publishedAt: "2026-09-21T06:19:00Z",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    category: "WHITE HOUSE WATCH",
    title:
      "Congress Debates New Framework for Artificial Intelligence",
    publishedAt: "2026-09-21T04:19:00Z",
    image:
      "https://images.unsplash.com/photo-1580130379624-3a069adbffc5?auto=format&fit=crop&w=400&q=80",
  },
];

/* =========================================================
   LATEST NEWS
========================================================= */

const latestNews: Story[] = [
  {
    id: 1,
    category: "TECHNOLOGY",
    title:
      "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and South...",
    publishedAt: "2026-09-21T10:07:00Z",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title:
      "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    excerpt:
      "Hyperscaler capex tops $700B while grid, water and community pushback intensifies across key markets.",
    publishedAt: "2026-09-21T09:44:00Z",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    title:
      "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
    excerpt:
      "IBM and Google jointly announce stable 1,000-qubit processors, marking a watershed moment for enterprise quantum computing.",
    publishedAt: "2026-09-21T08:19:00Z",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    category: "TECHNOLOGY",
    title:
      "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 87 Languages",
    excerpt:
      "Apple's most ambitious software update rewrites the rules of personal AI, integrating on-device translation and generative...",
    publishedAt: "2026-09-21T07:19:00Z",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    category: "TECHNOLOGY",
    title:
      "Meta's LLaMA 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
    excerpt:
      "Open-source AI takes center stage as Meta's latest model outperforms proprietary systems in multiple enterprise reasoning...",
    publishedAt: "2026-09-21T05:19:00Z",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    title:
      "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
    excerpt:
      "The latest satellite constellation expansion brings high-speed internet to remote regions across Africa, South Asia, and Latin...",
    publishedAt: "2026-09-21T04:19:00Z",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=80",
  },
];

/* =========================================================
   SHARED SECTION HEADER
========================================================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center border-b border-black pb-2 mb-4">
      <h2 className="text-[15px] md:text-[17px] font-bold text-gray-900">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   MORE STORIES SIDEBAR
========================================================= */

function MoreStoriesSidebar() {
  return (
    <aside className="w-full">
      <div className="border-b-2 border-black pb-2">
        <h3 className="text-[13px] font-bold uppercase tracking-wide">
          More Stories
        </h3>
      </div>

      <div>
        {moreStories.map((story) => (
          <div
            key={story.id}
            className="flex gap-2.5 py-3 border-b border-gray-200 group cursor-pointer"
          >
            <ImageWithFallback
              src={story.image}
              alt={story.title}
              className="w-[64px] h-[48px] object-cover rounded-[3px] shrink-0"
            />

            <div className="min-w-0">
              <p className="text-[7px] text-red-600 font-bold uppercase tracking-wide">
                {story.category}
              </p>

              <p className="text-[10px] font-bold leading-[1.25] text-gray-900 group-hover:text-red-600 transition-colors">
                {story.title}
              </p>

              <p className="text-[8px] text-gray-400 mt-1">
                <TimeAgo iso={story.publishedAt} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* =========================================================
   LATEST NEWS CARD
========================================================= */

function LatestNewsCard({ story }: { story: Story }) {
  return (
    <article className="border border-gray-200 rounded-md overflow-hidden bg-white group cursor-pointer">
      <div className="h-[150px] md:h-[155px] overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2">
          <span className="text-[7px] font-bold uppercase tracking-wide text-red-600">
            {story.category}
          </span>

          {story.id <= 3 && (
            <span className="text-[7px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded-sm">
              HOT
            </span>
          )}
        </div>

        <h3 className="font-serif text-[14px] md:text-[15px] font-bold leading-[1.15] mt-1.5 text-gray-900 group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        <p className="text-[10px] leading-[1.45] text-gray-500 mt-2 line-clamp-2">
          {story.excerpt}
        </p>

        <div className="flex items-center justify-between mt-2.5">
          <span className="text-[8px] text-gray-500">
            By Sagar Kumar
          </span>

          <span className="flex items-center gap-1 text-[8px] text-gray-400">
            <Clock size={9} />
            <TimeAgo iso={story.publishedAt} />
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   NEWSLETTER
========================================================= */

function Newsletter() {
  return (
    <section className="bg-[#071a2d] rounded-md text-white text-center py-8 md:py-9 px-5">
      <h2 className="font-serif text-xl md:text-[24px] font-bold">
        Stay Ahead with The Pride Times
      </h2>

      <p className="text-[10px] md:text-xs text-gray-400 mt-2">
        Daily briefings on White House Watch delivered to your inbox.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="h-10 flex-1 bg-[#1b3145] border border-[#31485c] rounded-[3px] px-3 text-xs text-white placeholder:text-gray-500 outline-none focus:border-red-500"
        />

        <button className="h-10 px-5 bg-red-600 hover:bg-red-700 transition-colors rounded-[3px] text-xs font-bold">
          Subscribe Free
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function WhiteHouseWatchPage() {
  return (
    <main className="w-full bg-white text-gray-900 antialiased">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="border-t-[3px] border-red-600 pt-4 mb-6">
          <h1 className="font-serif text-[28px] md:text-[34px] lg:text-[36px] font-bold leading-tight">
            White House Watch
          </h1>

          <p className="text-[11px] md:text-xs text-gray-500 mt-1.5">
            US policy, executive decisions, and Washington&apos;s impact on
            global business.
          </p>
        </section>

        {/* =================================================
            HERO + SIDEBAR
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_285px] gap-5 lg:gap-6 mb-10">

          {/* HERO */}

          <article className="min-w-0">
            <div className="group cursor-pointer">

              <div className="relative overflow-hidden rounded-md">
                <ImageWithFallback
                  src={hero.image}
                  alt={hero.title}
                  className="w-full h-[250px] sm:h-[330px] md:h-[390px] lg:h-[360px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex items-center gap-2 mt-3">
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wide text-red-600">
                  {hero.category}
                </span>

                <span className="text-[8px] md:text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-sm">
                  BREAKING
                </span>
              </div>

              <h2 className="font-serif text-[25px] md:text-[31px] lg:text-[34px] font-bold leading-[1.08] mt-2 text-gray-950 group-hover:text-red-600 transition-colors">
                {hero.title}
              </h2>

              <p className="text-[11px] md:text-[13px] text-gray-500 leading-[1.55] mt-2 max-w-[1000px]">
                {hero.excerpt}
              </p>

              <div className="flex items-center gap-3 mt-3 text-[9px] text-gray-400">
                <span>By {hero.author}</span>

                <span>•</span>

                <span>{hero.date}</span>

                <span>•</span>

                <span>
                  <TimeAgo iso={hero.publishedAt} />
                </span>
              </div>
            </div>
          </article>

          {/* MORE STORIES */}

          <MoreStoriesSidebar />

        </section>

        {/* =================================================
            LATEST NEWS
        ================================================= */}

        <section className="mb-9">
          <SectionHeader title="Latest White House Watch News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestNews.map((story) => (
              <LatestNewsCard
                key={story.id}
                story={story}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <Newsletter />

      </div>
    </main>
  );
}

