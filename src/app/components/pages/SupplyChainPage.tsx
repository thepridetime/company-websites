import { Clock } from "lucide-react";
import { Link } from "react-router";
import { specialArticlePathByTitle } from "../../data/specialArticleData";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import SC1Img from "../../../imports/SC1.png";
import SC2Img from "../../../imports/SC2.png";
import SC3Img from "../../../imports/SC3.png";

/* =========================================================
   TYPES
========================================================= */

type Story = {
  category: string;
  title: string;
  excerpt?: string;
  author?: string;
  time: string;
  image: string;
  badge?: string;
};

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-t-2 border-black pt-3 pb-2 mb-4">
      <h2 className="font-serif text-[15px] md:text-[17px] font-bold text-gray-950 uppercase tracking-tight">
        {title}
      </h2>

      <span className="hidden sm:block text-[7px] md:text-[8px] uppercase tracking-[0.16em] text-[#999]">
        The Pride Times
      </span>
    </div>
  );
}

/* =========================================================
   HERO DATA
========================================================= */

const hero: Story = {
  category: "SUPPLY CHAIN",
  title: "Red Sea Rerouting Adds $22B to Global Shipping Costs in H1 2026",
  excerpt:
    "Continued Houthi threats force 85% of Asia-Europe shipping around the Cape of Good Hope, adding 14 days to transit times.",
  author: "Sagar Kumar",
  time: "September 15, 2026",
  image: SC1Img,
};

/* =========================================================
   MAJOR STORIES
========================================================= */

const majorStories: Story[] = [
  {
    category: "SUPPLY CHAIN",
    title:
      "Apple Moves 25% of iPhone Production to India Ahead of Schedule",
    time: "4 hr ago",
    image: SC2Img,
  },
  {
    category: "GLOBAL TRADE",
    title:
      "Global Manufacturers Redesign Supply Networks Amid Trade Uncertainty",
    time: "6 hr ago",
    image: SC3Img,
  },
];

/* =========================================================
   RELATED COVERAGE
========================================================= */

const relatedStories: Story[] = [
  {
    category: "LOGISTICS",
    title:
      "Shipping Companies Accelerate Digital Transformation Across Global Routes",
    time: "8 hr ago",
    image: SC1Img,
  },
  {
    category: "SUPPLY CHAIN",
    title:
      "Apple Moves 25% of iPhone Production to India Ahead of Schedule",
    time: "4 hr ago",
    image: SC2Img,
  },
];

/* =========================================================
   LATEST SUPPLY CHAIN NEWS
========================================================= */

const latestNews: Story[] = [
  {
    category: "TECHNOLOGY",
    badge: "HOT",
    title:
      "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and South...",
    time: "12 min ago",
    image: SC2Img,
  },
  {
    category: "TECHNOLOGY",
    badge: "HOT",
    title:
      "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    excerpt:
      "Hyperscaler capex tops $700B while grid, water and community pushback intensifies across key markets.",
    time: "35 min ago",
    image: SC3Img,
  },
  {
    category: "TECHNOLOGY",
    title:
      "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
    excerpt:
      "IBM and Google jointly announce stable 1,000-qubit processors, marking a watershed moment for enterprise quantum computing...",
    time: "2 hr ago",
    image: SC1Img,
  },
  {
    category: "TECHNOLOGY",
    title:
      "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 87 Languages",
    excerpt:
      "Apple's most ambitious software update rewrites the rules of personal AI, integrating on-device translation and generative...",
    time: "3 hr ago",
    image: SC2Img,
  },
  {
    category: "TECHNOLOGY",
    title:
      "Meta's LLaMA 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
    excerpt:
      "Open-source AI takes center stage as Meta's latest model outperforms proprietary systems in 14 of 18 enterprise reasoning...",
    time: "5 hr ago",
    image: SC3Img,
  },
  {
    category: "TECHNOLOGY",
    title:
      "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
    excerpt:
      "The latest satellite constellation expansion brings high-speed internet to remote regions across Africa, South Asia, and Latin...",
    time: "6 hr ago",
    image: SC1Img,
  },
];

/* =========================================================
   ADVERTISEMENT
========================================================= */

function AdBanner({
  secondary = false,
}: {
  secondary?: boolean;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-[#102c35]">
      <div
        className={`flex flex-col items-center justify-center text-center ${
          secondary
            ? "h-[64px] md:h-[74px]"
            : "h-[58px] md:h-[72px]"
        }`}
      >
        <span className="absolute top-1 right-1 text-[7px] text-gray-400 border border-gray-500 px-1">
          Advertisement
        </span>

        <p className="text-[7px] md:text-[8px] tracking-[0.18em] uppercase text-[#65b9d5] font-bold">
          GOOGLE ADSENSE
        </p>

        <p className="mt-0.5 text-[10px] md:text-[12px] text-white font-semibold">
          {secondary
            ? "Business Solutions | Powered by The Pride Times"
            : "Advertisement Space"}
        </p>

        <p className="text-[7px] md:text-[8px] text-[#73a9b8]">
          728 × 90 • Leaderboard
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   SPONSORED CONTENT
========================================================= */

function SponsoredContent() {
  return (
    <div className="border border-[#eee] rounded-md overflow-hidden">
      <div className="px-2.5 py-2 flex items-center justify-between bg-[#faf9f4]">
        <span className="text-[7px] font-bold tracking-[0.12em] uppercase text-[#999]">
          Sponsored Content
        </span>

        <span className="text-[7px] text-[#aaa]">Ad</span>
      </div>

      <div className="h-[145px] md:h-[160px] bg-[#171d3b] flex flex-col items-center justify-center text-center px-3">
        <p className="text-[8px] font-bold tracking-[0.12em] text-[#e7c829] uppercase">
          Featured Partner
        </p>

        <p className="mt-2 text-[12px] font-semibold text-white">
          Your Ad Here
        </p>

        <p className="mt-1 text-[8px] text-gray-300">
          Reach 2M+ business readers
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   HERO STORY
========================================================= */

function HeroStory() {
  return (
    <Link to={specialArticlePathByTitle(hero.title)} className="min-w-0 block">
      <div className="relative overflow-hidden rounded-md h-[250px] sm:h-[330px] md:h-[400px] lg:h-[405px]">
        <ImageWithFallback
          src={hero.image}
          alt={hero.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="pt-3">
        <p className="text-[8px] md:text-[9px] font-bold tracking-[0.14em] uppercase text-[#e31b23]">
          {hero.category}
        </p>

        <h1 className="mt-1.5 font-serif text-[24px] sm:text-[28px] md:text-[33px] lg:text-[36px] font-bold leading-[1.08] text-gray-950">
          {hero.title}
        </h1>

        <p className="mt-2.5 text-[11px] md:text-[12px] leading-[1.55] text-[#666] max-w-[950px]">
          {hero.excerpt}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[8px] md:text-[9px] text-[#999]">
          <span className="font-medium text-gray-600">
            By {hero.author}
          </span>

          <span>·</span>

          <span>{hero.time}</span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   MAJOR STORY
========================================================= */

function MajorStory({ story }: { story: Story }) {
  return (
    <Link
      to={specialArticlePathByTitle(story.title)}
      className="group grid grid-cols-[82px_minmax(0,1fr)] sm:grid-cols-[105px_minmax(0,1fr)] gap-3 py-3 border-b border-[#dedede]"
    >
      <div className="w-full h-[64px] sm:h-[76px] overflow-hidden rounded-sm bg-gray-100">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[7px] uppercase font-bold tracking-[0.08em] text-[#e31b23]">
          {story.category}
        </p>

        <h3 className="mt-1 font-serif text-[11px] sm:text-[13px] leading-[1.22] font-bold text-gray-900 group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h3>

        <p className="mt-1 text-[7px] text-[#aaa] flex items-center gap-1">
          <Clock size={8} />
          {story.time}
        </p>
      </div>
    </Link>
  );
}

/* =========================================================
   SUPPORTING STORY
========================================================= */

function SupportingStory({ story }: { story: Story }) {
  return (
    <Link
      to={specialArticlePathByTitle(story.title)}
      className="group flex gap-3 py-3 border-b border-[#dedede]"
    >
      <div className="w-[95px] sm:w-[120px] h-[68px] sm:h-[78px] shrink-0 overflow-hidden rounded-sm">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[7px] uppercase font-bold tracking-[0.08em] text-[#e31b23]">
          {story.category}
        </p>

        <h3 className="mt-1 font-serif text-[12px] sm:text-[14px] font-bold leading-[1.22] text-gray-900 group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h3>

        <p className="mt-1 text-[7px] sm:text-[8px] text-[#aaa] flex items-center gap-1">
          <Clock size={8} />
          {story.time}
        </p>
      </div>
    </Link>
  );
}

/* =========================================================
   NEWS CARD
========================================================= */

function NewsCard({ story }: { story: Story }) {
  return (
    <Link
      to={specialArticlePathByTitle(story.title)}
      className="group block min-w-0 border-t border-[#dedede] pt-3"
    >
      <div className="relative h-[145px] sm:h-[155px] md:h-[160px] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      <div className="pt-2.5">
        <div className="flex items-center gap-1.5">
          <p className="text-[7px] font-bold uppercase tracking-[0.08em] text-[#e31b23]">
            {story.category}
          </p>

          {story.badge && (
            <span className="bg-[#e31b23] text-white text-[6px] font-bold px-1.5 py-0.5 rounded-sm uppercase">
              {story.badge}
            </span>
          )}
        </div>

        <h3 className="mt-1.5 font-serif text-[13px] md:text-[14px] font-bold leading-[1.22] text-gray-900 group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h3>

        {story.excerpt && (
          <p className="mt-1.5 text-[9px] md:text-[10px] leading-[1.45] text-[#777] line-clamp-2">
            {story.excerpt}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between text-[7px] text-[#aaa]">
          <span>By Sagar Kumar</span>

          <span className="flex items-center gap-1">
            <Clock size={8} />
            {story.time}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   NEWSROOM STREAM
========================================================= */

function NewsroomStream() {
  return (
    <section>
      <SectionHeader title="Newsroom" />

      <div className="border-t border-[#dedede]">
        {latestNews.map((news) => (
          <Link
            key={`stream-${news.title}`}
            to={specialArticlePathByTitle(news.title)}
            className="grid grid-cols-[70px_minmax(0,1fr)] sm:grid-cols-[82px_minmax(0,1fr)] gap-3 py-3 border-b border-[#dedede] group"
          >
            <div className="text-[8px] text-[#999] pt-0.5">
              <span className="flex items-center gap-1">
                <Clock size={8} />
                {news.time}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[7px] font-bold uppercase tracking-[0.08em] text-[#e31b23]">
                {news.category}
              </p>

              <h3 className="mt-1 text-[11px] sm:text-[12px] font-semibold leading-[1.3] text-gray-900 group-hover:text-[#e31b23] transition-colors">
                {news.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   SPONSORED EVENTS
========================================================= */

const sponsorships = [
  "Global Finance Summit 2026",
  "Tech Leaders Forum",
  "Energy Transition Conference",
  "AI & Business World",
];

function SponsorshipSection() {
  return (
    <section className="mt-5 md:mt-7 bg-[#fafafa] border border-[#eee] rounded-md p-3 md:p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[7px] font-bold uppercase tracking-[0.12em] border border-[#ddd] rounded px-1.5 py-1 text-[#aaa]">
          Sponsorship
        </span>

        <span className="text-[8px] text-[#aaa]">
          Presented by our partners
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {sponsorships.map((event) => (
          <div
            key={event}
            className="min-h-[74px] border border-[#e2e2e2] bg-white rounded-md flex flex-col items-center justify-center text-center px-2"
          >
            <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <span className="text-[#e31b23] text-xs">✦</span>
            </div>

            <p className="text-[9px] font-bold text-gray-800">
              {event}
            </p>

            <p className="mt-0.5 text-[7px] text-[#aaa]">
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
    <section className="mt-6 md:mt-8 mb-10">
      <div className="rounded-md bg-[#071a2d] px-5 py-7 md:py-8 text-center">
        <h2 className="font-serif text-[18px] md:text-[20px] font-bold text-white">
          Stay Ahead with The Pride Times
        </h2>

        <p className="mt-1 text-[9px] md:text-[10px] text-gray-300">
          Daily briefings on Supply Chain delivered to your inbox.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            className="h-8 w-full sm:w-[190px] rounded border border-[#42566b] bg-[#1c344b] px-3 text-[9px] text-white placeholder:text-[#8796a6] outline-none focus:border-[#e31b23]"
          />

          <button
            type="button"
            className="h-8 px-4 rounded bg-[#e31b23] text-white text-[9px] font-bold hover:bg-[#c9151c] transition-colors"
          >
            Subscribe Free
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function SupplyChainPage() {
  return (
    <div className="w-full bg-white text-[#17140F]">
      <main className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="pt-5 md:pt-7">
          <div className="border-t-[3px] border-[#e31b23] pt-4 md:pt-5">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
              <div>
                <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] font-bold leading-tight">
                  Supply Chain
                </h1>

                <p className="mt-1 text-[12px] md:text-[13px] text-[#777]">
                  Global logistics, trade disruption, and the future of
                  commerce.
                </p>
              </div>

              <span className="text-[7px] md:text-[8px] uppercase tracking-[0.16em] text-[#aaa]">
                Logistics • Trade • Global Commerce
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <section className="mt-4 md:mt-5">
          <AdBanner />
        </section>

        {/* =================================================
            LEAD EDITORIAL AREA
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_285px] gap-5 md:gap-6 mt-5 md:mt-6">

          {/* LEAD STORY */}

          <HeroStory />

          {/* EDITORIAL RAIL */}

          <aside className="lg:border-l lg:border-[#dedede] lg:pl-5">

            <div className="border-t-2 border-black pt-3">
              <h2 className="font-serif text-[13px] md:text-[14px] font-bold uppercase">
                Major Supply Chain Stories
              </h2>
            </div>

            {majorStories.map((story) => (
              <MajorStory
                key={story.title}
                story={story}
              />
            ))}

            <div className="mt-5">
              <SponsoredContent />
            </div>

          </aside>
        </section>

        {/* =================================================
            SUPPORTING COVERAGE
        ================================================= */}

        <section className="mt-8 md:mt-10">
          <SectionHeader title="Supply Chain Coverage" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8">
            {relatedStories.map((story) => (
              <SupportingStory
                key={story.title}
                story={story}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            LATEST NEWS + NEWSROOM STREAM
        ================================================= */}

        <section className="mt-8 md:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)] gap-7">

            {/* LATEST STORIES */}

            <div>
              <SectionHeader title="Latest Supply Chain News" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
                {latestNews.map((news) => (
                  <NewsCard
                    key={news.title}
                    story={news}
                  />
                ))}
              </div>
            </div>

            {/* NEWSROOM */}

            <div className="lg:border-l lg:border-[#dedede] lg:pl-5">
              <NewsroomStream />
            </div>

          </div>
        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <section className="mt-7 md:mt-8">
          <AdBanner secondary />
        </section>

        {/* =================================================
            MORE FROM SUPPLY CHAIN
        ================================================= */}

        <section className="mt-7 md:mt-9">
          <SectionHeader title="More From Supply Chain" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
            {relatedStories.map((story) => (
              <SupportingStory
                key={`more-${story.title}`}
                story={story}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            SPONSORED EVENTS
        ================================================= */}

        <SponsorshipSection />

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <Newsletter />

      </main>
    </div>
  );
}

export default SupplyChainPage;
