import {
  Search,
  User,
  ChevronDown,
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  X,
} from "lucide-react";

import { ImageWithFallback } from "../figma/ImageWithFallback";

import HeroImg from "../../../imports/heroimage.png";
import Hero1Img from "../../../imports/Techheroimage.png";

/* =========================================================
   DATA
========================================================= */

const moreStories = [
  {
    category: "TECHNOLOGY",
    title: "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    time: "35 min ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "TECHNOLOGY",
    title: "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Systems",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "TECHNOLOGY",
    title: "Apple Intelligence Introduces Real-Time AI Translation Across Devices",
    time: "3 hr ago",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "TECHNOLOGY",
    title: "Meta's Llama AI Surpasses GPT-5 in Enterprise Benchmark Tests",
    time: "4 hr ago",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=600&q=80",
  },
];

const latestNews = [
  {
    category: "TECHNOLOGY",
    title: "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
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
    title: "US 30-Year Bonds Erase Gains From Treasury's Buyback Surprise",
    excerpt:
      "The global bond rally triggered by Treasury's plan to increase buybacks of longer-dated debt may prove short lived.",
    time: "1 hr ago",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    category: "FINANCE",
    title: "Fed Holds Rates Steady as Inflation Eases to 2%: Markets Cheer",
    excerpt:
      "The Federal Reserve kept its benchmark rate unchanged, signaling patient approach to its core PCE reaches target range.",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1000&q=80",
  },
  {
    category: "FINANCE",
    title: "BlackRock Launches $10B AI Infrastructure Fund for Institutional Investors",
    excerpt:
      "The world's largest asset manager bets on data centers and GPU farms as the defining infrastructure play of the next decade.",
    time: "4 hr ago",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
  },
  {
    category: "FINANCE",
    title: "JPMorgan Reports Record Q2 Profit of $18.4B, Beats All Estimates",
    excerpt:
      "Investment banking revenues surged as dealmaking revived, while consumer banking margins expanded.",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  },
  {
    category: "BUSINESS NEWS",
    title: "Alibaba's Profit Dives 7% After Amping Up AI Spending",
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

function AdBanner({ label = "Advertisement Space" }: { label?: string }) {
  return (
    <div className="relative h-[82px] w-full overflow-hidden bg-gradient-to-r from-[#12252d] via-[#183641] to-[#2d5968]">
      <span className="absolute right-1 top-0 text-[7px] text-gray-300">
        Advertisement
      </span>

      <div className="flex h-full flex-col items-center justify-center text-white">
        <span className="text-[7px] font-bold tracking-[0.2em] text-sky-300">
          GOOGLE ADSENSE
        </span>

        <span className="mt-1 text-[13px] font-semibold">
          {label}
        </span>

        <span className="mt-0.5 text-[8px] text-gray-300">
          728 × 90 · Leaderboard
        </span>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 border-t-2 border-black pt-3">
      <h2 className="text-[13px] font-bold tracking-tight">
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
      <div className="h-[62px] w-[82px] shrink-0 overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0">
        <span className="text-[6px] font-bold uppercase tracking-[0.12em] text-red-600">
          {story.category}
        </span>

        <h3 className="mt-1 line-clamp-3 text-[10px] font-bold leading-[1.25] group-hover:text-red-700">
          {story.title}
        </h3>

        <span className="mt-1 block text-[7px] text-gray-400">
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
    <article className="group overflow-hidden rounded-[4px] border border-gray-200 bg-white">
      <div className="h-[150px] overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-3">
        <span className="text-[6px] font-bold uppercase tracking-[0.12em] text-red-600">
          {story.category}
        </span>

        <h3 className="mt-1 line-clamp-3 font-serif text-[13px] font-bold leading-[1.15] group-hover:text-red-700">
          {story.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[8px] leading-[1.45] text-gray-500">
          {story.excerpt}
        </p>

        <div className="mt-2 flex items-center gap-1 text-[7px] text-gray-400">
          <Clock size={8} />
          {story.time}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   TECHNOLOGY PAGE
========================================================= */

export function TechnologyPage() {
  return (
    <main className="min-h-screen bg-white text-[#111]">
      {/* =====================================================
          TOP BLACK NAV
      ===================================================== */}

      <div className="bg-[#050505] text-white">
        <div className="mx-auto flex h-[28px] max-w-[1280px] items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 overflow-hidden whitespace-nowrap text-[8px]">
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              Live TV
            </span>

            <span>Markets</span>
            <span>Business News</span>
            <span>International Business</span>
            <span>Startup Success</span>
            <span>CEO Spotlight</span>
            <span>Magazines</span>
            <span>Innovation</span>

            <span className="ml-auto hidden items-center gap-1 lg:flex">
              <span>▯</span>
              Digital Edition
            </span>

            <span className="hidden lg:block">Asia Edition⌄</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          MASTHEAD
      ===================================================== */}

      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-serif text-[31px] font-black leading-none tracking-[-0.06em]">
              THE <span className="text-red-600">PRIDE</span> TIMES
            </h1>

            <p className="mt-1 text-[6px] tracking-[0.18em] text-gray-500">
              THE GLOBAL VOICE OF INNOVATION, LEADERSHIP & SUCCESS
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-1 border border-gray-200 px-2 py-1 text-[7px] sm:flex">
              US
              <span>English</span>
              <ChevronDown size={8} />
            </button>

            <button className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200">
              <Search size={11} />
            </button>

            <button className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200">
              <User size={11} />
            </button>

            <button className="rounded-[4px] bg-red-600 px-3 py-2 text-[7px] font-bold text-white">
              Subscribe
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MARKET TICKER
      ===================================================== */}

      <div className="border-b border-gray-200">
        <div className="mx-auto flex max-w-[1280px] items-center gap-2 overflow-hidden px-4 py-2 sm:px-6 lg:px-8">
          <button className="mr-1 rounded border border-gray-300 px-2 py-1 text-[7px] font-bold">
            Menu⌄
          </button>

          {[
            ["Nifty 50", "22,419.95", "-0.34%", "text-red-600"],
            ["AAPL", "$232.15", "+0.62%", "text-green-600"],
            ["MSFT", "$421.30", "+0.35%", "text-green-600"],
            ["GOOGL", "$168.44", "-0.21%", "text-red-600"],
            ["AMZN", "$186.90", "+1.02%", "text-green-600"],
            ["NVDA", "$879.50", "+2.34%", "text-green-600"],
          ].map(([name, price, change, color]) => (
            <div
              key={name}
              className="flex min-w-[105px] items-center justify-between gap-2 rounded bg-[#101010] px-2 py-1 text-[7px] text-white"
            >
              <span className="font-bold">{name}</span>
              <span>{price}</span>
              <span className={color}>{change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          CATEGORY NAV
      ===================================================== */}

      <nav className="border-b border-gray-200">
        <div className="mx-auto flex max-w-[1280px] items-center gap-7 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
          {[
            "Technology",
            "Finance",
            "Cybersecurity",
            "Energy",
            "Healthcare",
            "Manufacturing",
            "Smart Cities",
            "Supply Chain",
            "Magazine",
            "More",
          ].map((item, index) => (
            <button
              key={item}
              className={`whitespace-nowrap text-[8px] font-semibold ${
                index === 0
                  ? "border-b-2 border-red-600 pb-2 text-red-600"
                  : "text-gray-700 hover:text-red-600"
              }`}
            >
              {item}
              {item === "More" && " ▾"}
            </button>
          ))}
        </div>
      </nav>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* PAGE TITLE */}

        <section className="border-t-[3px] border-red-600 pt-4">
          <h2 className="font-serif text-[28px] font-black tracking-[-0.04em]">
            Technology
          </h2>

          <p className="mt-1 text-[10px] text-gray-500">
            AI, quantum computing, semiconductors, and the digital future.
          </p>
        </section>

        {/* TOP AD */}

        <div className="my-4">
          <AdBanner />
        </div>

        {/* =====================================================
            HERO + MORE STORIES
        ===================================================== */}

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,3fr)_300px]">
          {/* Hero */}

          <article className="group">
            <div className="h-[300px] overflow-hidden rounded-[5px] sm:h-[380px]">
              <ImageWithFallback
                src={HeroImg}
                alt="Nvidia Leads AI Infrastructure Revolution"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>

            <div className="mt-2">
              <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-red-600">
                Technology
              </span>

              <h2 className="mt-1 font-serif text-[25px] font-black leading-[1.05] tracking-[-0.025em] sm:text-[30px]">
                Nvidia Leads AI Infrastructure Revolution with Humanoid Robot
                Push
              </h2>

              <p className="mt-2 max-w-[900px] text-[10px] leading-[1.55] text-gray-600">
                Nvidia has announced an ambitious collaboration with humanoid
                robot manufacturers across the United States, Europe, and
                South Korea, expanding its relationship with China's Unitree.
              </p>

              <div className="mt-2 flex items-center gap-3 text-[7px] text-gray-500">
                <span>By Sagar Kumar</span>
                <span>·</span>
                <span>September 15, 2026</span>
                <span>·</span>
                <span>12 min ago</span>
              </div>
            </div>
          </article>

          {/* More stories */}

          <aside className="rounded-[4px] border border-gray-200 bg-[#faf9f4] p-3">
            <div className="mb-3 bg-[#171c3d] px-3 py-10 text-center">
              <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-yellow-300">
                Featured Partner
              </span>

              <h3 className="mt-2 text-[11px] font-bold text-white">
                Your Ad Here
              </h3>

              <p className="mt-1 text-[7px] text-gray-300">
                Reach 2M+ business readers
              </p>
            </div>

            <div className="border-t-2 border-black pt-2">
              <h3 className="text-[10px] font-bold uppercase">
                More Stories
              </h3>

              <div className="mt-1">
                {moreStories.map((story) => (
                  <MoreStory key={story.title} story={story} />
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* =====================================================
            LATEST TECHNOLOGY NEWS
        ===================================================== */}

        <section className="mt-9">
          <SectionTitle>Latest Technology News</SectionTitle>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((story) => (
              <LatestCard key={story.title} story={story} />
            ))}
          </div>
        </section>

        {/* SECOND AD */}

        <div className="my-7">
          <AdBanner label="Business Solutions | Powered by The Pride Times" />
        </div>

        {/* =====================================================
            SPONSORED CONTENT
        ===================================================== */}

        <section className="rounded-[5px] border border-gray-200 bg-[#fafafa] p-4">
          <div className="mb-4 flex items-center gap-2 text-[7px] text-gray-400">
            <span className="rounded border border-gray-300 px-2 py-1 font-bold">
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
                className="flex h-[90px] flex-col items-center justify-center rounded border border-gray-200 bg-white text-center"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-600">
                  ◆
                </span>

                <h3 className="mt-2 text-[8px] font-bold">
                  {item}
                </h3>

                <span className="mt-1 text-[6px] text-gray-400">
                  Sponsored Event
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            NEWSLETTER
        ===================================================== */}

        <section className="my-7 rounded-[5px] bg-[#071b30] px-5 py-7 text-center text-white">
          <h2 className="font-serif text-[19px] font-bold">
            Stay Ahead with The Pride Times
          </h2>

          <p className="mt-1 text-[8px] text-gray-400">
            Daily briefings on Technology delivered to your inbox.
          </p>

          <div className="mx-auto mt-4 flex max-w-[420px]">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-l border border-gray-600 bg-[#1d3449] px-3 py-2 text-[8px] text-white outline-none placeholder:text-gray-400"
            />

            <button className="rounded-r bg-red-600 px-4 text-[8px] font-bold">
              Subscribe Free
            </button>
          </div>
        </section>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#050505] text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-serif text-[22px] font-black">
                THE <span className="text-red-600">PRIDE</span> TIMES
              </h2>

              <p className="mt-1 text-[6px] tracking-[0.15em] text-gray-500">
                THE GLOBAL VOICE OF INNOVATION, LEADERSHIP & SUCCESS
              </p>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <Facebook size={11} />
              <X size={11} />
              <Linkedin size={11} />
              <Instagram size={11} />
            </div>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-3 border-t border-gray-800 pt-4 text-[6px] text-gray-500 sm:flex-row">
            <span>© 2026 The Pride Times. All rights reserved.</span>

            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
              <span>Cookie Settings</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
