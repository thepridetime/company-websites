import { Clock } from "lucide-react";

import { ImageWithFallback } from "../figma/ImageWithFallback";

import HeroImg from "../../../imports/heroimage.png";

/* =========================================================
   DATA
========================================================= */

const moreStories = [
  {
    category: "TECHNOLOGY",
    title:
      "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    time: "35 min ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "TECHNOLOGY",
    title:
      "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Systems",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "TECHNOLOGY",
    title:
      "Apple Intelligence Introduces Real-Time AI Translation Across Devices",
    time: "3 hr ago",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "TECHNOLOGY",
    title:
      "Meta's Llama AI Surpasses GPT-5 in Enterprise Benchmark Tests",
    time: "4 hr ago",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=600&q=80",
  },
];

const latestNews = [
  {
    category: "TECHNOLOGY",
    title:
      "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
    excerpt:
      "The latest satellite constellation expansion brings high-speed internet to remote regions across Africa, South Asia, and Latin America.",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1000&q=80",
  },
  {
    category: "FINANCE",
    title: "US Equity Markets Rally on Strong Manufacturing Data",
    excerpt:
      "US equity markets extended a recovery rally driven by stronger-than-expected domestic factory data and a continued surge in...",
    time: "35 min ago",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    category: "FINANCE",
    title:
      "US 30-Year Bonds Erase Gains From Treasury's Buyback Surprise",
    excerpt:
      "The global bond rally triggered by Treasury's plan to increase buybacks of longer-dated debt may prove short lived.",
    time: "1 hr ago",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    category: "FINANCE",
    title:
      "Fed Holds Rates Steady as Inflation Eases to 2%: Markets Cheer",
    excerpt:
      "The Federal Reserve kept its benchmark rate unchanged, signaling patient approach to its core PCE reaches target range.",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1000&q=80",
  },
  {
    category: "FINANCE",
    title:
      "BlackRock Launches $10B AI Infrastructure Fund for Institutional Investors",
    excerpt:
      "The world's largest asset manager bets on data centers and GPU farms as the defining infrastructure play of the next decade.",
    time: "4 hr ago",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
  },
  {
    category: "FINANCE",
    title:
      "JPMorgan Reports Record Q2 Profit of $18.4B, Beats All Estimates",
    excerpt:
      "Investment banking revenues surged as dealmaking revived, while consumer banking margins expanded.",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  },
  {
    category: "BUSINESS NEWS",
    title:
      "Alibaba's Profit Dives 7% After Amping Up AI Spending",
    excerpt:
      "China's e-commerce giant reports steep quarterly earnings drop as aggressive AI infrastructure investment weighs on margins.",
    time: "7 hr ago",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
  },
];

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 border-t-2 border-black pt-3">
      <h2 className="text-[13px] font-bold tracking-tight text-gray-900 sm:text-[14px]">
        {children}
      </h2>
    </div>
  );
}

function MoreStory({
  story,
}: {
  story: (typeof moreStories)[number];
}) {
  return (
    <article className="group flex gap-3 border-b border-gray-200 py-3 last:border-b-0">
      {/* Story image */}
      <div className="h-[66px] w-[86px] shrink-0 overflow-hidden rounded-[3px]">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Story information */}
      <div className="min-w-0">
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-red-600">
          {story.category}
        </span>

        <h3 className="mt-1 line-clamp-3 text-[12px] font-bold leading-[1.4] text-gray-900 group-hover:text-red-700">
          {story.title}
        </h3>

        <span className="mt-1.5 block text-[10px] font-medium text-gray-600">
          {story.time}
        </span>
      </div>
    </article>
  );
}

function LatestCard({
  story,
}: {
  story: (typeof latestNews)[number];
}) {
  return (
    <article className="group overflow-hidden rounded-[5px] border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-md">
      {/* Image */}
      <div className="h-[150px] overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-3.5">
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-red-600">
          {story.category}
        </span>

        <h3 className="mt-1.5 line-clamp-3 font-serif text-[14px] font-bold leading-[1.3] text-gray-900 group-hover:text-red-700">
          {story.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-[11px] leading-[1.55] text-gray-600">
          {story.excerpt}
        </p>

        <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-medium text-gray-600">
          <Clock size={10} />
          {story.time}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   TECHNOLOGY PAGE

   IMPORTANT:
   This component intentionally contains ONLY the Technology
   page content.

   Header, MarketsTicker, PageLayout and Footer are already
   provided by App.tsx / MagazineLayout.
========================================================= */

export function TechnologyPage() {
  return (
    <main className="min-h-screen bg-white text-[#111]">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            PAGE TITLE
        ====================================================== */}

        <section className="border-t-[3px] border-red-600 pt-4">
          <h1 className="font-serif text-[28px] font-black tracking-[-0.04em] text-gray-950 sm:text-[32px]">
            Technology
          </h1>

          <p className="mt-1.5 text-[11px] leading-[1.5] text-gray-600 sm:text-[12px]">
            AI, quantum computing, semiconductors, and the digital future.
          </p>
        </section>

        {/* =====================================================
            HERO + MORE STORIES
        ====================================================== */}

        <section className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_300px]">
          {/* =================================================
              HERO
          ================================================== */}

          <article className="group">
            <div className="h-[300px] overflow-hidden rounded-[6px] sm:h-[380px] lg:h-[410px]">
              <ImageWithFallback
                src={HeroImg}
                alt="Nvidia Leads AI Infrastructure Revolution"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>

            <div className="mt-3">
              {/* Category */}
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">
                Technology
              </span>

              {/* Title */}
              <h2 className="mt-1.5 font-serif text-[25px] font-black leading-[1.08] tracking-[-0.025em] text-gray-950 sm:text-[30px] lg:text-[32px]">
                Nvidia Leads AI Infrastructure Revolution with Humanoid Robot
                Push
              </h2>

              {/* Description */}
              <p className="mt-2.5 max-w-[900px] text-[11px] leading-[1.6] text-gray-700 sm:text-[12px]">
                Nvidia has announced an ambitious collaboration with humanoid
                robot manufacturers across the United States, Europe, and
                South Korea, expanding its relationship with China's Unitree.
              </p>

              {/* Metadata */}
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-medium text-gray-600 sm:text-[11px]">
                <span>By Sagar Kumar</span>
                <span>·</span>
                <span>September 15, 2026</span>
                <span>·</span>
                <span>12 min ago</span>
              </div>
            </div>
          </article>

          {/* =================================================
              MORE STORIES
          ================================================== */}

          <aside className="rounded-[5px] border border-gray-200 bg-[#faf9f4] p-3.5">
            <div className="border-t-2 border-black pt-2.5">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-900">
                More Stories
              </h3>

              <div className="mt-1">
                {moreStories.map((story) => (
                  <MoreStory
                    key={story.title}
                    story={story}
                  />
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* =====================================================
            LATEST TECHNOLOGY NEWS
        ====================================================== */}

        <section className="mt-10">
          <SectionTitle>Latest Technology News</SectionTitle>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((story) => (
              <LatestCard
                key={story.title}
                story={story}
              />
            ))}
          </div>
        </section>

        {/* =====================================================
            SPONSORED CONTENT
        ====================================================== */}

        <section className="mt-8 rounded-[5px] border border-gray-200 bg-[#fafafa] p-4">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-medium text-gray-600">
            <span className="rounded border border-gray-300 px-2 py-1 text-[9px] font-bold tracking-wide text-gray-700">
              SPONSORSHIP
            </span>

            <span>Presented by our partners</span>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              "Global Finance Summit 2026",
              "Tech Leaders Forum",
              "Energy Transition Conference",
              "AI & Business World",
            ].map((item) => (
              <div
                key={item}
                className="flex h-[90px] flex-col items-center justify-center rounded border border-gray-200 bg-white px-2 text-center"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-600">
                  ◆
                </span>

                <h3 className="mt-2 text-[10px] font-bold leading-[1.3] text-gray-900">
                  {item}
                </h3>

                <span className="mt-1 text-[9px] font-medium text-gray-600">
                  Sponsored Event
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            NEWSLETTER
        ====================================================== */}

        <section className="my-8 rounded-[6px] bg-[#071b30] px-5 py-7 text-center text-white">
          <h2 className="font-serif text-[19px] font-bold sm:text-[21px]">
            Stay Ahead with The Pride Times
          </h2>

          <p className="mt-1.5 text-[10px] leading-[1.5] text-gray-300 sm:text-[11px]">
            Daily briefings on Technology delivered to your inbox.
          </p>

          <div className="mx-auto mt-4 flex max-w-[420px]">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-l border border-gray-600 bg-[#1d3449] px-3 py-2.5 text-[10px] text-white outline-none placeholder:text-gray-300"
            />

            <button className="rounded-r bg-red-600 px-4 text-[10px] font-bold text-white transition-colors hover:bg-red-700">
              Subscribe Free
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
