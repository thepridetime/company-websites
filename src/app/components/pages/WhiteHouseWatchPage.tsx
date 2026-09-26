import { useNavigate } from "react-router";
import { Clock, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const articleIds: Record<string, string> = {
  "President Signs Historic AI Accountability Act into Law": "whitehouse-president-signs-ai-accountability-act",
  "White House Announces $500B Infrastructure Investment in AI": "whitehouse-500b-ai-infrastructure",
  "Administration Begins New Round of Federal Technology Reviews": "whitehouse-federal-technology-reviews",
  "Congress Debates New Framework for Artificial Intelligence": "whitehouse-congress-ai-framework",
  "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push": "whitehouse-nvidia-humanoid-robot-push",
  "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion": "whitehouse-alphabet-ai-data-center",
  "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved": "whitehouse-quantum-1000-qubit",
  "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 87 Languages": "whitehouse-apple-ai-translation",
  "Meta's LLaMA 4 Surpasses GPT-5 in Enterprise Benchmark Tests": "whitehouse-meta-llama4-enterprise",
  "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally": "whitehouse-starlink-gen3-global"
};

const articlePath = (title: string) =>
  `/article/${articleIds[title] || "whitehouse-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "")}`;

/* =========================================================
   TYPES
========================================================= */

type Story = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  time: string;
  image: string;
};

type SimpleStory = {
  id: number;
  category: string;
  title: string;
  time: string;
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
  time: "30 min ago",
  image:
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=85",
};

/* =========================================================
   MORE STORIES
========================================================= */

const moreStories: SimpleStory[] = [
  {
    id: 1,
    category: "WHITE HOUSE WATCH",
    title: "White House Announces $500B Infrastructure Investment in AI",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    category: "WHITE HOUSE WATCH",
    title: "Administration Begins New Round of Federal Technology Reviews",
    time: "4 hr ago",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    category: "WHITE HOUSE WATCH",
    title: "Congress Debates New Framework for Artificial Intelligence",
    time: "6 hr ago",
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
    title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and South...",
    time: "12 min ago",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title: "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    excerpt:
      "Hyperscaler capex tops $700B while grid, water and community pushback intensifies across key markets.",
    time: "35 min ago",
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
    time: "2 hr ago",
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
    time: "3 hr ago",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    category: "TECHNOLOGY",
    title: "Meta's LLaMA 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
    excerpt:
      "Open-source AI takes center stage as Meta's latest model outperforms proprietary systems in multiple enterprise reasoning...",
    time: "5 hr ago",
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
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=80",
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
   SHARED SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  compact = false,
}: {
  title: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between border-b-2 border-black ${
        compact ? "pb-2 mb-3" : "pb-2.5 mb-5"
      }`}
    >
      <h2
        className={`font-bold uppercase tracking-[0.07em] text-gray-900 ${
          compact
            ? "text-[12px] md:text-[13px]"
            : "text-[14px] md:text-[16px]"
        }`}
      >
        {title}
      </h2>

      <span className="hidden sm:block text-[8px] uppercase tracking-[0.16em] text-gray-400">
        The Pride Times
      </span>
    </div>
  );
}

/* =========================================================
   ADVERTISEMENT
========================================================= */

function Advertisement({
  label = "Advertisement",
}: {
  label?: string;
}) {
  return (
    <div className="relative w-full h-[90px] md:h-[94px] bg-[#102c35] overflow-hidden flex items-center justify-center my-5">
      <span className="absolute top-1 right-1 text-[7px] text-gray-300 bg-white/20 px-1">
        {label}
      </span>

      <div className="text-center text-white">
        <p className="text-[8px] md:text-[9px] font-bold tracking-[0.18em] text-cyan-300">
          GOOGLE ADSENSE
        </p>

        <p className="text-[12px] md:text-[14px] font-semibold mt-1">
          Advertisement Space
        </p>

        <p className="text-[8px] text-cyan-200 mt-1">
          728 × 90 · Leaderboard
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   STORY META
========================================================= */

function StoryMeta({
  time,
  author = "Sagar Kumar",
}: {
  time: string;
  author?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 mt-3 text-[8px] text-gray-400">
      <span>By {author}</span>

      <span className="text-gray-300">•</span>

      <span className="flex items-center gap-1">
        <Clock size={9} />
        {time}
      </span>
    </div>
  );
}

/* =========================================================
   SPONSORED CONTENT
========================================================= */

function SponsoredSidebar() {
  return (
    <aside className="w-full border border-[#ece8dc] rounded-md overflow-hidden bg-[#fffdf6] h-fit">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-[8px] uppercase tracking-[0.12em] text-gray-500 font-semibold">
          Sponsored Content
        </span>

        <span className="text-[8px] text-gray-400">Ad</span>
      </div>

      <div className="mx-3 mb-3 h-[190px] md:h-[210px] bg-[#171b3b] flex items-center justify-center text-white text-center">
        <div>
          <p className="text-[8px] font-bold tracking-[0.14em] text-yellow-300">
            FEATURED PARTNER
          </p>

          <p className="text-sm font-bold mt-3">Your Ad Here</p>

          <p className="text-[9px] text-gray-300 mt-2">
            Reach 2M+ business readers
          </p>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   MORE STORIES
========================================================= */

function MoreStories() {
  const navigate = useNavigate();
  return (
    <div className="mt-5">
      <SectionHeader title="More White House Watch" compact />

      {moreStories.map((story) => (
        <article
          key={story.id}
          onClick={() => navigate(articlePath(story.title))}
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

            <h3 className="text-[10px] font-bold leading-[1.25] text-gray-900 group-hover:text-red-600 transition-colors">
              {story.title}
            </h3>

            <p className="text-[8px] text-gray-400 mt-1">{story.time}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* =========================================================
   MAJOR STORY CARD
========================================================= */

function MajorStoryCard({ story }: { story: Story }) {
  const navigate = useNavigate();
  return (
    <article onClick={() => navigate(articlePath(story.title))}
                className="group cursor-pointer border-b border-gray-200 pb-4">
      <div className="relative overflow-hidden h-[150px] md:h-[175px] bg-gray-100 rounded-sm">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="pt-2.5">
        <span className="text-[7px] uppercase tracking-wider font-bold text-red-600">
          {story.category}
        </span>

        <h3 className="font-serif text-[15px] md:text-[17px] font-bold leading-[1.15] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        <p className="text-[9px] md:text-[10px] leading-4 text-gray-500 mt-1.5 line-clamp-2">
          {story.excerpt}
        </p>

        <StoryMeta time={story.time} />
      </div>
    </article>
  );
}

/* =========================================================
   SUPPORTING STORY CARD
========================================================= */

function SupportingStoryCard({ story }: { story: Story }) {
  const navigate = useNavigate();
  return (
    <article onClick={() => navigate(articlePath(story.title))}
    className="group cursor-pointer">
      <div className="flex gap-3">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-[105px] h-[78px] md:w-[125px] md:h-[88px] object-cover rounded-sm shrink-0"
        />

        <div className="min-w-0">
          <span className="text-[7px] uppercase tracking-wider font-bold text-red-600">
            {story.category}
          </span>

          <h3 className="font-serif text-[12px] md:text-[14px] font-bold leading-[1.2] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
            {story.title}
          </h3>

          <p className="text-[9px] text-gray-500 mt-1 line-clamp-2">
            {story.excerpt}
          </p>

          <div className="flex items-center gap-1 text-[8px] text-gray-400 mt-1.5">
            <Clock size={8} />
            {story.time}
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   NEWSROOM STREAM
========================================================= */

function NewsroomStream() {
  const navigate = useNavigate();
  const newsroomStories = [
    {
      category: "WHITE HOUSE WATCH",
      title: "White House Announces $500B Infrastructure Investment in AI",
      time: "2 hr ago",
    },
    {
      category: "WHITE HOUSE WATCH",
      title: "Administration Begins New Round of Federal Technology Reviews",
      time: "4 hr ago",
    },
    {
      category: "WHITE HOUSE WATCH",
      title: "Congress Debates New Framework for Artificial Intelligence",
      time: "6 hr ago",
    },
    {
      category: "TECHNOLOGY",
      title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
      time: "12 min ago",
    },
    {
      category: "TECHNOLOGY",
      title: "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
      time: "35 min ago",
    },
    {
      category: "TECHNOLOGY",
      title:
        "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
      time: "2 hr ago",
    },
    {
      category: "TECHNOLOGY",
      title:
        "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 87 Languages",
      time: "3 hr ago",
    },
    {
      category: "TECHNOLOGY",
      title: "Meta's LLaMA 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
      time: "5 hr ago",
    },
    {
      category: "TECHNOLOGY",
      title:
        "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
      time: "6 hr ago",
    },
  ];

  return (
    <aside className="border-l-0 lg:border-l lg:border-gray-300 lg:pl-5">
      <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-1">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.08em]">
          Newsroom
        </h2>

        <span className="text-[8px] uppercase tracking-widest text-gray-400">
          Live Feed
        </span>
      </div>

      <div>
        {newsroomStories.map((story, index) => (
          <article
            key={`${story.title}-${index}`}
            onClick={() => navigate(articlePath(story.title))}
            className="py-3 border-b border-gray-200 group cursor-pointer"
          >
            <div className="flex items-start gap-2">
              <span className="text-[8px] font-mono text-gray-300 pt-0.5 w-4 shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <p className="text-[7px] uppercase tracking-wider font-bold text-red-600">
                  {story.category}
                </p>

                <h3 className="text-[10px] md:text-[11px] font-bold leading-[1.3] mt-0.5 text-gray-900 group-hover:text-red-600 transition-colors">
                  {story.title}
                </h3>

                <div className="flex items-center gap-1 mt-1 text-[8px] text-gray-400">
                  <Clock size={8} />
                  {story.time}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}

/* =========================================================
   LATEST NEWS CARD
========================================================= */

function LatestNewsCard({ story }: { story: Story }) {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(articlePath(story.title))}
      className="border border-gray-200 rounded-md overflow-hidden bg-white group cursor-pointer"
    >
      <div className="h-[145px] md:h-[155px] overflow-hidden bg-gray-100">
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

        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100">
          <span className="text-[8px] text-gray-500">By Sagar Kumar</span>

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
   SPONSORED EVENTS
========================================================= */

function SponsorshipSection() {
  return (
    <section className="bg-[#f7f7f7] rounded-md p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[8px] border border-gray-300 rounded-sm px-2 py-1 uppercase tracking-wide text-gray-400 font-bold">
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
            className="bg-white border border-gray-200 rounded-md h-[92px] flex flex-col items-center justify-center text-center hover:shadow-sm transition-shadow"
          >
            <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center mb-2">
              <span className="text-red-600 text-sm font-bold">◆</span>
            </div>

            <p className="text-[10px] font-bold text-gray-800">{event}</p>

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
    <section className="bg-[#071a2d] rounded-md text-white text-center py-8 md:py-9 px-5">
      <p className="text-[8px] uppercase tracking-[0.2em] text-red-400 font-bold">
        Daily Briefing
      </p>

      <h2 className="font-serif text-xl md:text-[24px] font-bold mt-2">
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
  const navigate = useNavigate();
  return (
    <main className="w-full bg-white text-gray-900 antialiased">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-11 xl:px-14 py-5 md:py-7">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-t-[3px] border-red-600 pt-4 mb-5">
          <div className="flex items-end justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[8px] uppercase tracking-[0.18em] font-bold text-red-600">
                  Politics · Policy · Business
                </span>
              </div>

              <h1 className="font-serif text-[29px] md:text-[36px] lg:text-[40px] font-bold leading-none">
                White House Watch
              </h1>

              <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-3xl">
                US policy, executive decisions, and Washington&apos;s impact
                on global business.
              </p>
            </div>

            <div className="hidden md:block text-right">
              <p className="text-[8px] uppercase tracking-[0.18em] text-gray-400">
                Editorial Desk
              </p>

              <p className="text-[10px] text-gray-500 mt-1">
                Washington &amp; Global Business
              </p>
            </div>
          </div>
        </header>

        {/* =================================================
            TOP AD
        ================================================= */}

        <Advertisement />

        {/* =================================================
            LEAD EDITORIAL PACKAGE
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 lg:gap-7 mb-9">
          {/* LEAD STORY */}

          <article onClick={() => navigate(articlePath(hero.title))} className="min-w-0 group cursor-pointer">
            <div className="relative overflow-hidden rounded-md bg-gray-100">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-[255px] sm:h-[340px] md:h-[400px] lg:h-[410px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2">
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wide text-red-600">
                  {hero.category}
                </span>

                <span className="text-[7px] md:text-[8px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-sm uppercase">
                  Breaking
                </span>
              </div>

              <h2 className="font-serif text-[27px] md:text-[34px] lg:text-[40px] font-bold leading-[1.04] mt-2 text-gray-950 group-hover:text-red-600 transition-colors max-w-[1050px]">
                {hero.title}
              </h2>

              <p className="text-[11px] md:text-[13px] text-gray-500 leading-[1.6] mt-2 max-w-[950px]">
                {hero.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-[9px] text-gray-400">
                <span>By {hero.author}</span>

                <span>•</span>

                <span>{hero.date}</span>

                <span>•</span>

                <span className="flex items-center gap-1">
                  <Clock size={9} />
                  {hero.time}
                </span>
              </div>
            </div>
          </article>

          {/* RIGHT EDITORIAL RAIL */}

          <aside className="border-t-2 lg:border-t-0 lg:border-l border-black lg:pl-5">
            <SponsoredSidebar />

            <MoreStories />
          </aside>
        </section>

        {/* =================================================
            MAJOR STORIES
        ================================================= */}

        <section className="border-t-2 border-black pt-5 mb-9">
          <SectionHeader title="Major Technology & Business Stories" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {latestNews.slice(0, 2).map((story) => (
              <MajorStoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* =================================================
            SUPPORTING COVERAGE + NEWSROOM
        ================================================= */}

        <section className="border-t-2 border-black pt-5 mb-9">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(280px,1fr)] gap-7">
            {/* SUPPORTING STORIES */}

            <div>
              <SectionHeader title="Latest Coverage" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                {latestNews.slice(2).map((story) => (
                  <SupportingStoryCard key={story.id} story={story} />
                ))}
              </div>
            </div>

            {/* NEWSROOM */}

            <NewsroomStream />
          </div>
        </section>

        {/* =================================================
            SECOND AD
        ================================================= */}

        <Advertisement />

        {/* =================================================
            SPONSORED EVENTS
        ================================================= */}

        <section className="mb-8">
          <SponsorshipSection />
        </section>

        {/* =================================================
            EDITORIAL STREAM
        ================================================= */}

        <section className="border-t-2 border-black pt-5 mb-9">
          <SectionHeader title="White House Watch Coverage" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {moreStories.map((story) => (
              <article
                key={story.id}
                onClick={() => navigate(articlePath(story.title))}
                className="group cursor-pointer border-b border-gray-200 pb-4"
              >
                <div className="h-[145px] overflow-hidden rounded-sm bg-gray-100">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="pt-2.5">
                  <span className="text-[7px] uppercase tracking-wider font-bold text-red-600">
                    {story.category}
                  </span>

                  <h3 className="font-serif text-[14px] md:text-[16px] font-bold leading-[1.15] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                    {story.title}
                  </h3>

                  <div className="flex items-center gap-1 mt-2 text-[8px] text-gray-400">
                    <Clock size={9} />
                    {story.time}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            FULL LATEST NEWS INDEX
        ================================================= */}

        <section className="border-t-2 border-black pt-5 mb-9">
          <SectionHeader title="Latest News Index" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestNews.map((story) => (
              <LatestNewsCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <div className="mb-8">
          <Newsletter />
        </div>

        {/* =================================================
            BOTTOM EDITORIAL BAR
        ================================================= */}

        <footer className="pt-4 border-t border-gray-300 flex flex-col sm:flex-row justify-between gap-2 text-[8px] md:text-[9px] uppercase tracking-[0.14em] text-gray-400">
          <span>White House Watch</span>

          <span className="flex items-center gap-1">
            Washington · Policy · Technology · Business
            <ChevronRight size={10} />
          </span>
        </footer>
      </div>
    </main>
  );
}
