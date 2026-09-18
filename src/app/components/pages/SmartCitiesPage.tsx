import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock } from "lucide-react";

import Smartc1Img from "../../../imports/Smartc1.png";
import Smartc2Img from "../../../imports/Smartc2.png";
import Smartc3Img from "../../../imports/Smartc3.png";
import Smartc4Img from "../../../imports/Smartc4.png";

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
      <h2 className="font-serif text-lg md:text-xl font-bold text-gray-950">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

const hero = {
  category: "SMART CITIES",
  title: "Cities of Tomorrow: Building Smarter & Greener Urban Ecosystems",
  excerpt:
    "From Singapore's data-driven governance to Copenhagen's carbon-neutral neighborhoods, the blueprint for the 21st century city is taking shape.",
  author: "Sagar Kumar",
  time: "September 15, 2026",
  image: Smartc1Img,
};

/* =========================================================
   MORE STORIES
========================================================= */

const moreStories = [
  {
    category: "SMART CITIES",
    title: "NEOM's The Line: 170km Linear City Begins First Phase Occupancy",
    time: "5 hr ago",
    image: Smartc2Img,
  },
  {
    category: "URBAN FUTURES",
    title: "Cities Accelerate Digital Infrastructure Investment",
    time: "7 hr ago",
    image: Smartc3Img,
  },
  {
    category: "SMART CITIES",
    title: "Urban Technology Reshapes the Future of City Planning",
    time: "9 hr ago",
    image: Smartc4Img,
  },
];

/* =========================================================
   LATEST NEWS
========================================================= */

const latestNews = [
  {
    category: "TECHNOLOGY",
    badge: "HOT",
    title:
      "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and South...",
    time: "12 min ago",
    image: Smartc2Img,
  },
  {
    category: "TECHNOLOGY",
    badge: "HOT",
    title:
      "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    excerpt:
      "Hyperscaler capex tops $700B while grid, water and community pushback intensifies across key markets.",
    time: "35 min ago",
    image: Smartc3Img,
  },
  {
    category: "TECHNOLOGY",
    badge: "",
    title:
      "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
    excerpt:
      "IBM and Google jointly announce stable 1,000-qubit processors, marking a watershed moment for enterprise quantum computing...",
    time: "2 hr ago",
    image: Smartc4Img,
  },
  {
    category: "TECHNOLOGY",
    badge: "",
    title:
      "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 87 Languages",
    excerpt:
      "Apple's most ambitious software update rewrites the rules of personal AI, integrating on-device translation and generative...",
    time: "3 hr ago",
    image: Smartc1Img,
  },
  {
    category: "TECHNOLOGY",
    badge: "",
    title:
      "Meta's LLaMA 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
    excerpt:
      "Open-source AI takes center stage as Meta's latest model outperforms proprietary systems in 14 of 18 enterprise reasoning...",
    time: "5 hr ago",
    image: Smartc2Img,
  },
  {
    category: "TECHNOLOGY",
    badge: "",
    title:
      "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
    excerpt:
      "The latest satellite constellation expansion brings high-speed internet to remote regions across Africa, South Asia, and Latin...",
    time: "6 hr ago",
    image: Smartc3Img,
  },
];

/* =========================================================
   PAGE
========================================================= */

export function SmartCitiesPage() {
  return (
    <div className="w-full bg-white text-[#17140F]">
      <main className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <section className="pt-5 md:pt-7">
          <div className="border-t-[3px] border-[#e31b23] pt-4 md:pt-5">
            <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] font-bold leading-tight">
              Smart Cities
            </h1>

            <p className="mt-1 text-[12px] md:text-[13px] text-[#777]">
              Urban technology, sustainable infrastructure, and future city
              design.
            </p>
          </div>
        </section>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <section className="mt-4 md:mt-5">
          <div className="relative h-[58px] md:h-[72px] overflow-hidden bg-[#102c35] flex flex-col items-center justify-center text-center">
            <span className="absolute top-1 right-1 text-[7px] text-gray-400 border border-gray-500 px-1">
              Advertisement
            </span>

            <p className="text-[7px] md:text-[8px] tracking-[0.18em] uppercase text-[#65b9d5] font-bold">
              GOOGLE ADSENSE
            </p>

            <p className="mt-0.5 text-[10px] md:text-[12px] text-white font-semibold">
              Advertisement Space
            </p>

            <p className="text-[7px] md:text-[8px] text-[#73a9b8]">
              728 × 90 • Leaderboard
            </p>
          </div>
        </section>

        {/* =================================================
            HERO + SIDEBAR
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_215px] gap-4 md:gap-5 mt-4 md:mt-5">

          {/* HERO */}

          <article className="min-w-0">
            <div className="relative overflow-hidden rounded-md h-[250px] sm:h-[330px] md:h-[400px] lg:h-[390px]">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-2.5 md:pt-3">
              <p className="text-[8px] md:text-[9px] font-bold tracking-[0.14em] uppercase text-[#e31b23]">
                {hero.category}
              </p>

              <h2 className="mt-1 font-serif text-[20px] sm:text-[24px] md:text-[28px] lg:text-[29px] font-bold leading-[1.12] text-gray-950">
                {hero.title}
              </h2>

              <p className="mt-2 text-[11px] md:text-[12px] leading-[1.5] text-[#666] max-w-[950px]">
                {hero.excerpt}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-[8px] md:text-[9px] text-[#999]">
                <span>By {hero.author}</span>

                <span>·</span>

                <span>{hero.time}</span>

                <span>·</span>

                <span>2 hr ago</span>
              </div>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}

          <aside className="lg:border-l lg:border-[#dedede] lg:pl-4">

            {/* SPONSORED CONTENT */}

            <div className="border border-[#eee] rounded-md overflow-hidden">
              <div className="px-2 py-1.5 flex items-center justify-between bg-[#faf9f4]">
                <span className="text-[7px] font-bold tracking-[0.12em] uppercase text-[#999]">
                  Sponsored Content
                </span>

                <span className="text-[7px] text-[#aaa]">
                  Ad
                </span>
              </div>

              <div className="h-[150px] md:h-[160px] bg-[#171d3b] flex flex-col items-center justify-center text-center px-3">
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

            {/* MORE STORIES */}

            <div className="mt-4">
              <SectionHeader title="More Stories" />

              <div className="space-y-3">
                {moreStories.map((story) => (
                  <article
                    key={story.title}
                    className="flex gap-2.5 group cursor-pointer"
                  >
                    <div className="w-[54px] h-[42px] shrink-0 overflow-hidden rounded-sm bg-gray-100">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[7px] uppercase font-bold text-[#e31b23]">
                        {story.category}
                      </p>

                      <h3 className="mt-0.5 font-serif text-[10px] md:text-[11px] leading-[1.25] font-bold group-hover:text-[#e31b23] transition-colors">
                        {story.title}
                      </h3>

                      <p className="mt-1 text-[7px] text-[#aaa]">
                        {story.time}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* =================================================
            LATEST SMART CITIES NEWS
        ================================================= */}

        <section className="mt-7 md:mt-9">
          <SectionHeader title="Latest Smart Cities News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {latestNews.map((news) => (
              <article
                key={news.title}
                className="group border border-[#dedede] rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
              >
                {/* IMAGE */}

                <div className="relative h-[145px] sm:h-[135px] md:h-[145px] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                {/* CONTENT */}

                <div className="p-2.5 md:p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[7px] font-bold uppercase tracking-[0.08em] text-[#e31b23]">
                      {news.category}
                    </span>

                    {news.badge && (
                      <span className="bg-[#e31b23] text-white text-[6px] font-bold px-1.5 py-0.5 rounded-sm uppercase">
                        {news.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1.5 font-serif text-[13px] md:text-[14px] font-bold leading-[1.25] text-gray-900 group-hover:text-[#e31b23] transition-colors">
                    {news.title}
                  </h3>

                  <p className="mt-1.5 text-[9px] md:text-[10px] leading-[1.45] text-[#777]">
                    {news.excerpt}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[7px] text-[#aaa]">
                    <span>By Sagar Kumar</span>

                    <span className="flex items-center gap-1">
                      <Clock size={8} />
                      {news.time}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <section className="mt-6 md:mt-7">
          <div className="relative h-[58px] md:h-[72px] overflow-hidden bg-[#102c35] flex flex-col items-center justify-center text-center">
            <span className="absolute top-1 right-1 text-[7px] text-gray-400 border border-gray-500 px-1">
              Advertisement
            </span>

            <p className="text-[7px] md:text-[8px] tracking-[0.18em] uppercase text-[#65b9d5] font-bold">
              GOOGLE ADSENSE
            </p>

            <p className="mt-0.5 text-[10px] md:text-[12px] text-white font-semibold">
              Business Solutions | Powered by The Pride Times
            </p>

            <p className="text-[7px] md:text-[8px] text-[#73a9b8]">
              728 × 90 • Leaderboard
            </p>
          </div>
        </section>

        {/* =================================================
            SPONSORED EVENTS
        ================================================= */}

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
            {[
              "Global Finance Summit 2026",
              "Tech Leaders Forum",
              "Energy Transition Conference",
              "AI & Business World",
            ].map((event) => (
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

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <section className="mt-6 md:mt-8 mb-10">
          <div className="rounded-md bg-[#071a2d] px-5 py-7 md:py-8 text-center">
            <h2 className="font-serif text-[18px] md:text-[20px] font-bold text-white">
              Stay Ahead with The Pride Times
            </h2>

            <p className="mt-1 text-[9px] md:text-[10px] text-gray-300">
              Daily briefings from Smart Cities delivered to your inbox.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
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

      </main>
    </div>
  );
}
