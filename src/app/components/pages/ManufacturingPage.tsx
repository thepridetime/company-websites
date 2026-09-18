import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  Factory,
  TrendingUp,
  Cpu,
  Car,
  Plane,
  Globe2,
  ArrowRight,
} from "lucide-react";

import Manu1Img from "../../../imports/Manu1.png";
import Manu2Img from "../../../imports/Manu2.png";
import Manu3Img from "../../../imports/Manu3.png";

/* =========================================================
   TYPES
========================================================= */

interface Story {
  id: number;
  title: string;
  time: string;
  category?: string;
  excerpt?: string;
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
  category: "MANUFACTURING",
  title:
    "Reshoring Accelerates: US Manufacturing Output Hits 40-Year High",
  excerpt:
    "Semiconductor and EV battery factories drive the strongest domestic manufacturing renaissance since the post-war industrial boom.",
  author: "Sagar Kumar",
  time: "September 15, 2026",
  image: Manu1Img,
};

const latestStories: Story[] = [
  {
    id: 1,
    category: "TECHNOLOGY",
    title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and South Asia.",
    time: "12 min ago",
    image: Manu2Img,
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title:
      "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    excerpt:
      "Hyperscaler capex tops $700B while grid, water and community pushback intensifies across key markets.",
    time: "35 min ago",
    image: Manu3Img,
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    title:
      "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
    excerpt:
      "IBM and Google announce new advances as enterprise quantum computing moves toward commercial deployment.",
    time: "2 hr ago",
    image: Manu1Img,
  },
  {
    id: 4,
    category: "TECHNOLOGY",
    title:
      "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 87 Languages",
    excerpt:
      "Apple's latest software update expands on-device translation and generative AI capabilities.",
    time: "3 hr ago",
    image: Manu2Img,
  },
  {
    id: 5,
    category: "TECHNOLOGY",
    title:
      "Meta's LLaMA 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
    excerpt:
      "Open-source AI takes center stage as Meta's latest model competes across enterprise reasoning benchmarks.",
    time: "5 hr ago",
    image: Manu3Img,
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    title:
      "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
    excerpt:
      "The latest satellite constellation expansion brings high-speed internet to remote regions worldwide.",
    time: "6 hr ago",
    image: Manu1Img,
  },
];

const autoStories: Story[] = [
  {
    id: 1,
    title:
      "Manufacturing executives say Middle East tensions are inflating supply-chain costs across transportation-equipment networks.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Major automotive suppliers announce new labor agreements as manufacturers expand North American production.",
    time: "1 hr ago",
  },
  {
    id: 3,
    title:
      "Toyota expands next-generation EV battery production as global demand for electric vehicles rises.",
    time: "3 hrs ago",
  },
  {
    id: 4,
    title:
      "Volkswagen's Wolfsburg plant becomes one of Europe's largest low-carbon automotive facilities.",
    time: "4 hrs ago",
  },
  {
    id: 5,
    title:
      "Tesla expands manufacturing capacity as next-generation vehicle platform enters production.",
    time: "6 hrs ago",
  },
];

const roboticsStories: Story[] = [
  {
    id: 1,
    title:
      "Neura raises capital to scale humanoid and industrial robot manufacturing infrastructure.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Boston Dynamics humanoid robots begin pilot assembly operations at a major automotive facility.",
    time: "2 hrs ago",
  },
  {
    id: 3,
    title:
      "Foxconn expands deployment of AI-guided robotic arms across high-volume electronics production.",
    time: "4 hrs ago",
  },
  {
    id: 4,
    title:
      "ABB's new collaborative robot receives safety certification for human-facing assembly lines.",
    time: "6 hrs ago",
  },
  {
    id: 5,
    title:
      "Amazon's manufacturing robotics division expands industrial automation research.",
    time: "8 hrs ago",
  },
];

const semiconductors: Story[] = [
  {
    id: 1,
    title:
      "US manufacturing commitments continue to rise as AI infrastructure investment accelerates.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "CHIPS Act awards support additional semiconductor manufacturing expansion across the United States.",
    time: "1 hr ago",
  },
  {
    id: 3,
    title:
      "TSMC expands advanced chip manufacturing capacity as demand for AI processors grows.",
    time: "3 hrs ago",
  },
  {
    id: 4,
    title:
      "Samsung announces additional investment in next-generation memory manufacturing.",
    time: "4 hrs ago",
  },
  {
    id: 5,
    title:
      "Intel's foundry business expands domestic semiconductor production partnerships.",
    time: "6 hrs ago",
  },
];

const aeroDefense: Story[] = [
  {
    id: 1,
    title:
      "Airbus backlog reaches new milestone as production ramp-up puts pressure on suppliers.",
    time: "3 hrs ago",
  },
  {
    id: 2,
    title:
      "Space manufacturing facilities accelerate production of next-generation launch systems.",
    time: "5 hrs ago",
  },
  {
    id: 3,
    title:
      "India's aerospace manufacturing ecosystem expands as domestic production programs grow.",
    time: "7 hrs ago",
  },
  {
    id: 4,
    title:
      "Defense manufacturers increase capacity to strengthen regional supply-chain resilience.",
    time: "8 hrs ago",
  },
];

const mfgIndex = [
  {
    country: "USA",
    label: "ISM Manufacturing PMI",
    value: "54.2",
    status: "Expanding",
  },
  {
    country: "Germany",
    label: "Manufacturing PMI",
    value: "52.4",
    status: "Expanding",
  },
  {
    country: "China",
    label: "Caixin PMI",
    value: "51.8",
    status: "Expanding",
  },
  {
    country: "India",
    label: "Manufacturing PMI",
    value: "58.9",
    status: "Strong Growth",
  },
  {
    country: "Japan",
    label: "Manufacturing PMI",
    value: "49.7",
    status: "Contracting",
  },
  {
    country: "UK",
    label: "Manufacturing PMI",
    value: "50.3",
    status: "Flat",
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

        <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.08em] text-gray-900">
          {title}
        </h2>
      </div>

      <span className="hidden sm:block text-[9px] uppercase tracking-widest text-gray-400">
        The Pride Times
      </span>
    </div>
  );
}

/* =========================================================
   ADVERTISEMENT BAR
========================================================= */

function AdvertisementBar({ bottom = false }: { bottom?: boolean }) {
  return (
    <div className="w-full h-[78px] md:h-[90px] bg-[#12313b] flex flex-col items-center justify-center text-white my-5 relative overflow-hidden">
      <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#64c7e6] font-bold">
        Google Adsense
      </span>

      <span className="text-sm md:text-base font-semibold mt-1">
        {bottom
          ? "Business Solutions | Powered by The Pride Times"
          : "Advertisement Space"}
      </span>

      <span className="text-[8px] md:text-[9px] text-[#83b8c8] mt-1">
        728 × 90 · Leaderboard
      </span>

      <span className="absolute right-1 top-1 text-[7px] text-gray-300">
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
    <aside className="border border-gray-200 bg-[#faf9f4] h-fit">
      <div className="px-3 py-2 flex justify-between items-center text-[8px] uppercase tracking-wider text-gray-400">
        <span>Sponsored Content</span>
        <span>Ad</span>
      </div>

      <div className="mx-3 mb-3 h-[190px] md:h-[210px] bg-[#151b3a] flex flex-col items-center justify-center text-center px-4">
        <span className="text-[9px] font-bold tracking-[0.15em] text-yellow-400">
          FEATURED PARTNER
        </span>

        <h3 className="text-white font-semibold mt-2 text-base">
          Your Ad Here
        </h3>

        <p className="text-gray-300 text-[9px] mt-2">
          Reach 2M+ business readers
        </p>
      </div>
    </aside>
  );
}

/* =========================================================
   MORE STORIES
========================================================= */

function MoreStories() {
  const stories = [
    {
      title:
        "Foxconn's AI-Driven Factories Reduce Human Labor by 70% in Two Years",
      time: "6 hr ago",
      image: Manu2Img,
    },
    {
      title:
        "Industrial Automation Investment Reaches New Record as AI Adoption Accelerates",
      time: "8 hr ago",
      image: Manu3Img,
    },
  ];

  return (
    <div className="mt-4">
      <div className="border-b-2 border-black pb-2 mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wide">
          More Stories
        </h3>
      </div>

      {stories.map((story) => (
        <article
          key={story.title}
          className="flex gap-3 py-3 border-b border-gray-200"
        >
          <ImageWithFallback
            src={story.image}
            alt={story.title}
            className="w-16 h-12 object-cover rounded-sm shrink-0"
          />

          <div>
            <span className="text-[7px] uppercase font-bold text-red-600">
              Manufacturing
            </span>

            <h4 className="text-[10px] leading-snug font-bold text-gray-900 mt-0.5">
              {story.title}
            </h4>

            <p className="text-[8px] text-gray-400 mt-1">{story.time}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* =========================================================
   HERO STORY
========================================================= */

function HeroStoryCard({
  story,
  large = false,
}: {
  story: HeroStory;
  large?: boolean;
}) {
  return (
    <article className="group cursor-pointer">
      <div
        className={`relative overflow-hidden bg-gray-100 rounded-md ${
          large ? "h-[270px] sm:h-[360px] lg:h-[390px]" : "h-[250px]"
        }`}
      >
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>

      <div className="pt-3">
        <p className="text-[8px] md:text-[9px] uppercase tracking-wider font-bold text-red-600">
          {story.category}
        </p>

        <h2
          className={`font-serif font-bold leading-tight text-gray-950 mt-1 group-hover:text-red-600 transition-colors ${
            large
              ? "text-2xl md:text-3xl lg:text-[30px]"
              : "text-xl md:text-2xl"
          }`}
        >
          {story.title}
        </h2>

        <p className="mt-2 text-xs md:text-sm leading-6 text-gray-600">
          {story.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-3 text-[9px] text-gray-400">
          <span>By {story.author}</span>

          <span className="flex items-center gap-1">
            <Clock size={10} />
            {story.time}
          </span>

          <span>4 hr ago</span>
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
    <article className="group border border-gray-200 rounded-md overflow-hidden bg-white cursor-pointer hover:shadow-md transition-shadow duration-200">
      <div className="h-[145px] md:h-[160px] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={story.image || Manu1Img}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[7px] uppercase tracking-wider font-bold text-red-600">
            {story.category || "MANUFACTURING"}
          </span>

          <span className="bg-red-600 text-white text-[6px] font-bold px-1.5 py-0.5 rounded-sm">
            HOT
          </span>
        </div>

        <h3 className="font-serif font-bold text-[13px] md:text-[14px] leading-snug text-gray-900 group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        {story.excerpt && (
          <p className="text-[10px] leading-4 text-gray-500 mt-2 line-clamp-2">
            {story.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
          <span className="text-[8px] text-gray-400">By Sagar Kumar</span>

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
   PMI PANEL
========================================================= */

function ManufacturingPMI() {
  return (
    <aside className="border border-gray-200 bg-[#fafafa] p-4 md:p-5 h-fit">
      <div className="flex items-center gap-2 border-b border-gray-300 pb-3 mb-1">
        <TrendingUp size={15} className="text-red-600" />

        <h2 className="text-[11px] font-bold uppercase tracking-[0.12em]">
          Manufacturing PMI
        </h2>
      </div>

      {mfgIndex.map((item) => {
        const positive = Number(item.value) >= 50;

        return (
          <div
            key={`${item.country}-${item.value}`}
            className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
          >
            <div className="pr-2">
              <p className="text-xs font-semibold text-gray-900">
                {item.country}
              </p>

              <p className="text-[8px] text-gray-500 uppercase tracking-wide mt-0.5">
                {item.label}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="font-mono text-xs font-bold">{item.value}</p>

              <p
                className={`text-[8px] font-semibold uppercase ${
                  positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.status}
              </p>
            </div>
          </div>
        );
      })}

      <p className="text-[8px] leading-4 text-gray-400 mt-3">
        PMI above 50 indicates expansion. Data referenced: May 2026.
      </p>
    </aside>
  );
}

/* =========================================================
   INDUSTRY STATISTICS
========================================================= */

function IndustryStatistics() {
  return (
    <section>
      <SectionHeader title="Industry Statistics" icon={<Factory size={15} />} />

      <div className="overflow-x-auto border border-gray-300">
        <table className="w-full border-collapse text-xs">
          <tbody>
            <tr>
              <td className="w-1/3 bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                ISM Manufacturing Index
              </td>
              <td className="border-b border-gray-300 p-3">
                54.0 — above consensus of 53.2
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                New Orders Sub-Index
              </td>
              <td className="border-b border-gray-300 p-3">
                56.8 — up 2.7 points from April
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                Manufacturing M&A
              </td>
              <td className="border-b border-gray-300 p-3">
                11 megadeals in 2025 — ranked 3rd globally
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                AI in Manufacturing Deals
              </td>
              <td className="border-b border-gray-300 p-3">
                Among the most frequently cited technologies
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-r border-gray-300 p-3 font-bold">
                Cobot ROI Threshold
              </td>
              <td className="p-3">
                Reduced from roughly 4 years in 2020 to about 18 months in
                2026
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* =========================================================
   SPONSORSHIP SECTION
========================================================= */

function SponsorshipSection() {
  const events = [
    "Global Finance Summit 2026",
    "Tech Leaders Forum",
    "Energy Transition Conference",
    "AI & Business World",
  ];

  return (
    <section className="bg-[#f8f8f8] border border-gray-100 rounded-md p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="border border-gray-300 rounded px-2 py-1 text-[7px] uppercase tracking-widest text-gray-400">
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
            className="bg-white border border-gray-200 rounded-md min-h-[85px] flex flex-col items-center justify-center text-center px-3"
          >
            <div className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-2">
              <span className="text-sm">✦</span>
            </div>

            <h3 className="text-[9px] font-bold text-gray-800">{event}</h3>

            <p className="text-[7px] text-gray-400 mt-1">Sponsored Event</p>
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
    <section className="bg-[#071a2d] rounded-md px-5 py-8 md:py-10 text-center text-white">
      <h2 className="font-serif font-bold text-xl md:text-2xl">
        Stay Ahead with The Pride Times
      </h2>

      <p className="text-[10px] md:text-xs text-gray-400 mt-2">
        Daily briefings on Manufacturing delivered to your inbox.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="h-10 flex-1 rounded-sm border border-gray-600 bg-[#162c40] px-3 text-xs text-white outline-none placeholder:text-gray-500"
        />

        <button className="h-10 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-sm transition-colors">
          Subscribe Free
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function ManufacturingPage() {
  return (
    <main className="w-full min-h-screen bg-white text-gray-900 antialiased">
      {/* FULL WIDTH CONTENT CONTAINER
          No max-w-7xl restriction.
          Uses almost the complete browser width.
      */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-11 xl:px-14 py-5 md:py-7">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-t-[3px] border-red-600 pt-4 mb-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-[38px] font-bold leading-none">
                Manufacturing
              </h1>

              <p className="text-xs md:text-sm text-gray-500 mt-2">
                Industrial automation, reshoring, supply chain evolution, and
                factory innovation.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-gray-400">
              <Factory size={19} />
              <span className="text-[9px] uppercase tracking-widest">
                Industry & Production
              </span>
            </div>
          </div>
        </header>

        {/* =================================================
            TOP AD
        ================================================= */}

        <AdvertisementBar />

        {/* =================================================
            HERO + SPONSORED SIDEBAR
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_280px] xl:grid-cols-[minmax(0,3.2fr)_300px] gap-5 lg:gap-6 mb-8">
          <HeroStoryCard story={hero} large />

          <div>
            <SponsoredContent />
            <MoreStories />
          </div>
        </section>

        {/* =================================================
            LATEST MANUFACTURING NEWS
        ================================================= */}

        <section className="mb-8">
          <SectionHeader
            title="Latest Manufacturing News"
            icon={<Factory size={15} />}
          />

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
            SECOND AD
        ================================================= */}

        <AdvertisementBar bottom />

        {/* =================================================
            SPONSORSHIP
        ================================================= */}

        <div className="mt-5">
          <SponsorshipSection />
        </div>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <div className="mt-6 mb-10">
          <Newsletter />
        </div>

        {/* =================================================
            MANUFACTURING DATA
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-7 border-t-2 border-black pt-7 mb-10">
          <div className="lg:col-span-2">
            <SectionHeader
              title="Manufacturing Outlook"
              icon={<TrendingUp size={15} />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ManufacturingPMI />

              <IndustryStatistics />
            </div>
          </div>

          <div>
            <SectionHeader
              title="Industry Focus"
              icon={<Globe2 size={15} />}
            />

            <p className="text-sm leading-7 text-gray-600">
              Manufacturers are increasing investment in automation,
              semiconductors, electric vehicles, robotics, and domestic
              production capacity as global supply chains continue to evolve.
            </p>

            <div className="mt-5 border-l-4 border-red-600 pl-4">
              <p className="font-serif italic text-base leading-6 text-gray-800">
                "The next manufacturing cycle will be defined by automation,
                resilient supply chains and intelligent factories."
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            AUTOMOTIVE + ROBOTICS
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t-2 border-black pt-7 mb-10">
          <div>
            <SectionHeader
              title="Automotive & EV"
              icon={<Car size={15} />}
            />

            {autoStories.map((story) => (
              <article
                key={story.id}
                className="group py-3 border-b border-gray-200 last:border-0 cursor-pointer"
              >
                <h3 className="text-sm leading-snug font-medium group-hover:text-red-600 transition-colors">
                  {story.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-2 text-[9px] text-gray-400">
                  <Clock size={10} />
                  {story.time}
                </div>
              </article>
            ))}
          </div>

          <div>
            <SectionHeader
              title="Robotics & Automation"
              icon={<Cpu size={15} />}
            />

            {roboticsStories.map((story) => (
              <article
                key={story.id}
                className="group py-3 border-b border-gray-200 last:border-0 cursor-pointer"
              >
                <h3 className="text-sm leading-snug font-medium group-hover:text-red-600 transition-colors">
                  {story.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-2 text-[9px] text-gray-400">
                  <Clock size={10} />
                  {story.time}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            SEMICONDUCTORS + AEROSPACE
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t-2 border-black pt-7">
          <div>
            <SectionHeader
              title="Semiconductors & Electronics"
              icon={<Cpu size={15} />}
            />

            {semiconductors.map((story) => (
              <article
                key={story.id}
                className="group py-3 border-b border-gray-200 last:border-0 cursor-pointer"
              >
                <h3 className="text-sm leading-snug font-medium group-hover:text-red-600 transition-colors">
                  {story.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-2 text-[9px] text-gray-400">
                  <Clock size={10} />
                  {story.time}
                </div>
              </article>
            ))}
          </div>

          <div>
            <SectionHeader
              title="Aerospace & Defense"
              icon={<Plane size={15} />}
            />

            {aeroDefense.map((story) => (
              <article
                key={story.id}
                className="group py-3 border-b border-gray-200 last:border-0 cursor-pointer"
              >
                <h3 className="text-sm leading-snug font-medium group-hover:text-red-600 transition-colors">
                  {story.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-2 text-[9px] text-gray-400">
                  <Clock size={10} />
                  {story.time}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            BOTTOM EDITORIAL BAR
        ================================================= */}

        <div className="mt-10 pt-4 border-t border-gray-300 flex flex-col sm:flex-row justify-between gap-2 text-[9px] uppercase tracking-widest text-gray-400">
          <span>Manufacturing</span>

          <span>
            Industry 4.0 · Automation · Supply Chain · Automotive · Robotics
          </span>
        </div>
      </div>
    </main>
  );
}
