import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router";
import { specialArticlePath } from "../../data/specialArticleData";
import { PrideTimesAd } from "../AdSenseSlots";
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
  slug?: string;
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
   HERO DATA
========================================================= */

const hero: HeroStory = {
  category: "MANUFACTURING",
  title:
    "Global Manufacturing Faces Tariffs, Labor Shortages, Energy Costs and Supply-Chain Fragmentation",
  excerpt:
    "Manufacturing demand remains resilient for now, but tariff uncertainty, labor shortages and energy costs are reshaping investment. At IMTS 2026, AI, robotics and domestic supply-chain partnerships emerged as central themes of the next industrial cycle.",
  author: "The Pride Times Editorial Desk",
  time: "September 29, 2026",
  image: Manu1Img,
};

const majorStories: Story[] = [
  {
    id: 1,
    category: "AUTOMOTIVE SUPPLY CHAIN",
    title: "Hyundai Plans to Source 80% of Vehicle Parts From U.S. Suppliers by 2030",
    excerpt:
      "Hyundai's localization target illustrates how automakers are reassessing supplier networks as tariff uncertainty and supply-chain resilience become larger manufacturing considerations.",
    time: "1 hr ago",
    image: Manu2Img,
    slug: "manufacturing-hyundai-80-percent-us-suppliers",
  },
  {
    id: 2,
    category: "INDUSTRIAL ROBOTICS",
    title: "Mind Robotics Raises $500M Series A as Western Manufacturers Address Labor Shortages",
    excerpt:
      "The Rivian spin-off is part of a broader industrial push toward robotics as manufacturers seek ways to increase capacity while managing persistent workforce constraints.",
    time: "2 hrs ago",
    image: Manu3Img,
    slug: "manufacturing-mind-robotics-500m",
  },
];

const manufacturingCoverage: Story[] = [
  {
    id: 1,
    category: "AUTONOMOUS MOBILITY",
    title: "Uber and Rivian Target 50,000 Autonomous Robotaxis by 2031",
    excerpt:
      "The partnership combines autonomous-vehicle manufacturing ambitions with Uber's planned investment of more than $1 billion in the program.",
    time: "3 hrs ago",
    image: Manu1Img,
    slug: "manufacturing-uber-rivian-50000-robotaxis",
  },
  {
    id: 2,
    category: "DATA CENTER MANUFACTURING",
    title: "DHL Announces 10 Warehousing Sites to Support Data-Center Manufacturing Capacity",
    excerpt:
      "New logistics capacity reflects the growing physical supply chain behind data centers, advanced computing equipment and AI infrastructure.",
    time: "4 hrs ago",
    image: Manu2Img,
    slug: "manufacturing-dhl-10-warehousing-sites",
  },
  {
    id: 3,
    category: "SEMICONDUCTORS",
    title: "Advanced Chip Makers Push Fault Tracing Earlier as Packaging Complexity Rises",
    excerpt:
      "More complex semiconductor packaging is increasing the importance of earlier defect detection, process monitoring and manufacturing quality control.",
    time: "5 hrs ago",
    image: Manu3Img,
    slug: "manufacturing-advanced-chip-fault-tracing",
  },
  {
    id: 4,
    category: "SMART MANUFACTURING",
    title: "AI, Robotics and Digital Twins Reshape the Modern Factory",
    excerpt:
      "Smart manufacturing technologies are moving deeper into production planning, predictive maintenance, quality control and factory simulation.",
    time: "6 hrs ago",
    image: Manu1Img,
    slug: "manufacturing-ai-robotics-digital-twins",
  },
];

const latestStories: Story[] = [
  {
    id: 1,
    category: "MACROECONOMICS",
    title: "Manufactured-Goods Demand Remains Resilient for Now but Faces Output-Price Pressure",
    excerpt:
      "Pantheon Macroeconomics' assessment highlights a manufacturing sector that remains supported by demand while rising output prices create a growing vulnerability.",
    time: "Just now",
    image: Manu2Img,
    slug: "manufacturing-demand-output-prices",
  },
  {
    id: 2,
    category: "AUTOMOTIVE",
    title: "Hyundai's 80% U.S. Sourcing Target Signals a New Phase of Supplier Localization",
    excerpt:
      "The planned sourcing shift places domestic suppliers at the center of Hyundai's longer-term manufacturing strategy.",
    time: "1 hr ago",
    image: Manu3Img,
    slug: "manufacturing-hyundai-80-percent-us-suppliers",
  },
  {
    id: 3,
    category: "ROBOTICS",
    title: "Mind Robotics' $500M Series A Targets Western Manufacturing Labor Gaps",
    excerpt:
      "Industrial robotics investment is increasingly being framed around workforce availability, production capacity and the economics of automation.",
    time: "2 hrs ago",
    image: Manu1Img,
    slug: "manufacturing-mind-robotics-500m",
  },
  {
    id: 4,
    category: "AUTONOMOUS VEHICLES",
    title: "Uber-Rivian Partnership Links Vehicle Manufacturing With Autonomous Fleet Scale",
    excerpt:
      "A planned 50,000-vehicle robotaxi target by 2031 connects manufacturing capacity with the future scale of autonomous mobility services.",
    time: "3 hrs ago",
    image: Manu2Img,
    slug: "manufacturing-uber-rivian-50000-robotaxis",
  },
  {
    id: 5,
    category: "LOGISTICS",
    title: "DHL's 10 Warehousing Sites Highlight the Logistics Layer Behind AI Infrastructure",
    excerpt:
      "Warehousing and logistics are becoming increasingly important as data-center manufacturing expands and equipment flows become more complex.",
    time: "5 hrs ago",
    image: Manu3Img,
    slug: "manufacturing-dhl-10-warehousing-sites",
  },
  {
    id: 6,
    category: "SEMICONDUCTORS",
    title: "Chip Manufacturing Moves Fault Detection Earlier in the Production Process",
    excerpt:
      "Advanced packaging is increasing manufacturing complexity and making early process diagnostics more important for yield and quality.",
    time: "6 hrs ago",
    image: Manu1Img,
    slug: "manufacturing-advanced-chip-fault-tracing",
  },
];

const autoStories: Story[] = [
  {
    id: 1,
    title: "Hyundai's 2030 sourcing target would place 80% of vehicle parts with U.S. suppliers.",
    time: "1 hr ago",
    slug: "manufacturing-hyundai-80-percent-us-suppliers",
  },
  {
    id: 2,
    title: "Tariff uncertainty is encouraging automakers to reassess supplier geography and domestic capacity.",
    time: "2 hrs ago",
    slug: "manufacturing-demand-output-prices",
  },
  {
    id: 3,
    title: "Uber and Rivian's autonomous-vehicle partnership targets 50,000 robotaxis by 2031.",
    time: "3 hrs ago",
    slug: "manufacturing-uber-rivian-50000-robotaxis",
  },
  {
    id: 4,
    title: "Vehicle manufacturers are balancing localization, labor availability and energy costs in new investment decisions.",
    time: "5 hrs ago",
    slug: "manufacturing-smart-factory-strategy",
  },
  {
    id: 5,
    title: "Domestic supplier partnerships are becoming a larger part of North American manufacturing planning.",
    time: "7 hrs ago",
    slug: "manufacturing-domestic-supply-chain-partnerships",
  },
];

const roboticsStories: Story[] = [
  {
    id: 1,
    title: "Mind Robotics raises $500M Series A to address labor shortages across Western manufacturing.",
    time: "Just now",
    slug: "manufacturing-mind-robotics-500m",
  },
  {
    id: 2,
    title: "IMTS 2026 highlights accelerating investment in industrial AI, robotics and automation.",
    time: "2 hrs ago",
    slug: "manufacturing-imts-2026-ai-robotics",
  },
  {
    id: 3,
    title: "Robotics investment is increasingly tied to workforce availability and factory throughput.",
    time: "4 hrs ago",
    slug: "manufacturing-mind-robotics-500m",
  },
  {
    id: 4,
    title: "Digital twins allow manufacturers to simulate production changes before committing to physical reconfiguration.",
    time: "6 hrs ago",
    slug: "manufacturing-ai-robotics-digital-twins",
  },
  {
    id: 5,
    title: "Thailand and Southeast Asian manufacturers are weighing automation investment alongside cybersecurity risk.",
    time: "8 hrs ago",
    slug: "manufacturing-southeast-asia-ai-cybersecurity",
  },
];

const semiconductors: Story[] = [
  {
    id: 1,
    title: "Advanced chip makers are moving fault tracing earlier as packaging complexity raises defect risk.",
    time: "Just now",
    slug: "manufacturing-advanced-chip-fault-tracing",
  },
  {
    id: 2,
    title: "AI hardware manufacturing is increasing the importance of process monitoring and yield management.",
    time: "1 hr ago",
    slug: "manufacturing-ai-hardware-production",
  },
  {
    id: 3,
    title: "Complex packaging is changing how manufacturers approach inspection, testing and quality control.",
    time: "3 hrs ago",
    slug: "manufacturing-advanced-chip-fault-tracing",
  },
  {
    id: 4,
    title: "Domestic supply-chain partnerships are becoming more important for strategic manufacturing capacity.",
    time: "5 hrs ago",
    slug: "manufacturing-domestic-supply-chain-partnerships",
  },
  {
    id: 5,
    title: "Data-center demand is creating additional pressure across the semiconductor manufacturing ecosystem.",
    time: "7 hrs ago",
    slug: "manufacturing-dhl-10-warehousing-sites",
  },
];

const aeroDefense: Story[] = [
  {
    id: 1,
    title: "Manufacturing fragmentation is pushing companies to evaluate regional production capacity more closely.",
    time: "3 hrs ago",
    slug: "manufacturing-supply-chain-fragmentation",
  },
  {
    id: 2,
    title: "Energy costs are becoming a larger factor in decisions about where energy-intensive production is located.",
    time: "5 hrs ago",
    slug: "manufacturing-energy-costs",
  },
  {
    id: 3,
    title: "Domestic supply-chain partnerships are emerging as a resilience strategy across industrial sectors.",
    time: "7 hrs ago",
    slug: "manufacturing-domestic-supply-chain-partnerships",
  },
  {
    id: 4,
    title: "AI and automation are being deployed to offset workforce constraints while maintaining production capacity.",
    time: "8 hrs ago",
    slug: "manufacturing-ai-robotics-digital-twins",
  },
];

const mfgIndex = [
  { country: "Global", label: "Manufacturing environment", value: "2026", status: "Under pressure" },
  { country: "U.S.", label: "Industrial strategy", value: "AI + Robotics", status: "Accelerating" },
  { country: "Automotive", label: "Supplier localization", value: "80%", status: "2030 target" },
  { country: "Mind Robotics", label: "Series A", value: "$500M", status: "Raised" },
  { country: "Uber + Rivian", label: "Robotaxi target", value: "50,000", status: "By 2031" },
  { country: "DHL", label: "Warehousing sites", value: "10", status: "Announced" },
];

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  icon,
  subtitle,
}: {
  title: string;
  icon?: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="border-t-2 border-black pt-3 mb-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-[#e31b23]">
                {icon}
              </span>
            )}

            <h2 className="font-serif text-[17px] md:text-[20px] font-bold text-gray-950">
              {title}
            </h2>
          </div>

          {subtitle && (
            <p className="mt-1 text-[8px] md:text-[9px] text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        <ArrowRight
          size={14}
          className="shrink-0 text-gray-400"
        />
      </div>
    </div>
  );
}

/* =========================================================
   ADVERTISEMENT BAR
========================================================= */

function AdvertisementBar({
  bottom = false,
}: {
  bottom?: boolean;
}) {
  return (
    <div className="w-full py-2">
      <PrideTimesAd variant={bottom ? "second" : "first"} />
    </div>
  );
}

/* =========================================================
   STORY META
========================================================= */

function StoryMeta({
  author,
  time,
}: {
  author?: string;
  time: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-[8px] md:text-[9px] text-gray-400">
      {author && <span>By {author}</span>}

      {author && <span>·</span>}

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

function SponsoredContent() {
  return (
    <aside className="border border-gray-200 bg-[#faf9f4] rounded-md overflow-hidden">
      <div className="px-2.5 py-1.5 flex justify-between items-center text-[7px] uppercase tracking-[0.12em] text-gray-400">
        <span>Sponsored Content</span>
        <span>Ad</span>
      </div>

      <div className="h-[150px] md:h-[165px] bg-[#151b3a] flex flex-col items-center justify-center text-center px-4">
        <span className="text-[8px] font-bold tracking-[0.15em] text-yellow-400">
          FEATURED PARTNER
        </span>

        <h3 className="text-white font-semibold mt-2 text-[13px]">
          Your Ad Here
        </h3>

        <p className="text-gray-300 text-[8px] mt-1.5">
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
    <div className="mt-5">
      <div className="border-b-2 border-black pb-2 mb-1">
        <h3 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.08em]">
          More Stories
        </h3>
      </div>

      {stories.map((story) => (
        <article
          key={story.title}
          className="group flex gap-2.5 py-2.5 border-b border-gray-200 last:border-b-0"
        >
          <div className="w-[60px] h-[46px] shrink-0 overflow-hidden rounded-sm">
            <ImageWithFallback
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0">
            <span className="text-[7px] uppercase font-bold text-[#e31b23]">
              Manufacturing
            </span>

            <h4 className="font-serif text-[9px] md:text-[10px] leading-[1.25] font-bold text-gray-900 mt-0.5 group-hover:text-[#e31b23] transition-colors">
              {story.title}
            </h4>

            <p className="text-[7px] text-gray-400 mt-1">
              {story.time}
            </p>
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
}: {
  story: HeroStory;
}) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-md h-[250px] sm:h-[330px] md:h-[390px] lg:h-[400px]">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />

        <span className="absolute left-3 bottom-3 bg-black/75 px-2 py-1 text-[7px] font-bold tracking-[0.12em] uppercase text-white">
          Lead Story
        </span>
      </div>

      <div className="pt-2.5 md:pt-3">
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.14em] font-bold text-[#e31b23]">
          {story.category}
        </p>

        <h2 className="font-serif font-bold leading-[1.08] text-gray-950 mt-1 text-[23px] sm:text-[27px] md:text-[31px] lg:text-[34px] group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h2>

        <p className="mt-2 text-[10px] md:text-[12px] leading-[1.55] text-gray-500 max-w-5xl">
          {story.excerpt}
        </p>

        <div className="mt-2.5 pt-2 border-t border-gray-200">
          <StoryMeta
            author={story.author}
            time={story.time}
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MAJOR STORY
========================================================= */

function MajorStory({
  story,
}: {
  story: Story;
}) {
  return (
    <article className="group border-b border-gray-200 pb-3">
      <div className="relative h-[125px] md:h-[145px] overflow-hidden rounded-sm">
        <ImageWithFallback
          src={story.image || Manu1Img}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="pt-2">
        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.1em] font-bold text-[#e31b23]">
          {story.category || "MANUFACTURING"}
        </p>

        <h3 className="mt-1 font-serif text-[13px] md:text-[15px] font-bold leading-[1.2] text-gray-900 group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h3>

        {story.excerpt && (
          <p className="mt-1.5 text-[8px] md:text-[9px] leading-[1.45] text-gray-500 line-clamp-3">
            {story.excerpt}
          </p>
        )}

        <div className="mt-1.5">
          <StoryMeta time={story.time} />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   COVERAGE STORY
========================================================= */

function CoverageStory({
  story,
}: {
  story: Story;
}) {
  return (
    <article className="group flex gap-3 py-3 border-b border-gray-200 last:border-b-0">
      <div className="w-[95px] h-[68px] md:w-[125px] md:h-[82px] shrink-0 overflow-hidden rounded-sm">
        <ImageWithFallback
          src={story.image || Manu1Img}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.08em] font-bold text-[#e31b23]">
          {story.category}
        </p>

        <h3 className="mt-0.5 font-serif text-[12px] md:text-[14px] font-bold leading-[1.2] text-gray-900 group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h3>

        <p className="mt-1 text-[8px] md:text-[9px] leading-[1.4] text-gray-500 line-clamp-2">
          {story.excerpt}
        </p>

        <div className="mt-1.5">
          <StoryMeta time={story.time} />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   LATEST NEWS CARD
========================================================= */

function LatestNewsCard({
  story,
}: {
  story: Story;
}) {
  return (
    <article className="group border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
      <div className="relative h-[140px] sm:h-[150px] md:h-[155px] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={story.image || Manu1Img}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        <span className="absolute top-2 left-2 bg-[#e31b23] text-white text-[6px] font-bold px-1.5 py-1 rounded-sm">
          HOT
        </span>
      </div>

      <div className="p-2.5 md:p-3">
        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.08em] font-bold text-[#e31b23]">
          {story.category || "MANUFACTURING"}
        </p>

        <h3 className="font-serif font-bold text-[13px] md:text-[14px] leading-[1.22] text-gray-900 mt-1 group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h3>

        {story.excerpt && (
          <p className="text-[8px] md:text-[9px] leading-[1.45] text-gray-500 mt-1.5 line-clamp-3">
            {story.excerpt}
          </p>
        )}

        <div className="mt-2 pt-2 border-t border-gray-100">
          <StoryMeta
            author="The Pride Times Editorial Desk"
            time={story.time}
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   NEWSROOM STREAM
========================================================= */

function NewsroomStream() {
  return (
    <aside className="lg:border-l lg:border-gray-200 lg:pl-4">
      <div className="border-t-2 border-black pt-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-[16px] md:text-[18px] font-bold text-gray-950">
            Newsroom
          </h3>

          <span className="text-[7px] uppercase tracking-[0.1em] font-bold text-gray-400">
            Latest
          </span>
        </div>
      </div>

      <div className="mt-1">
        {latestStories.map((story) => (
          <article
            key={`newsroom-${story.id}`}
            className="group py-2.5 border-b border-gray-200"
          >
            <div className="flex items-start gap-2">
              <Clock
                size={9}
                className="mt-1 shrink-0 text-[#e31b23]"
              />

              <div className="min-w-0">
                <p className="text-[6px] uppercase tracking-[0.08em] font-bold text-[#e31b23]">
                  {story.category}
                </p>

                <h4 className="mt-0.5 font-serif text-[10px] md:text-[11px] font-bold leading-[1.25] text-gray-900 group-hover:text-[#e31b23] transition-colors">
                  {story.title}
                </h4>

                <p className="mt-1 text-[7px] text-gray-400">
                  {story.time}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}

/* =========================================================
   MANUFACTURING PMI
========================================================= */

function ManufacturingPMI() {
  return (
    <aside className="border border-gray-200 bg-[#fafafa] p-3 md:p-4 rounded-md">
      <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
        <TrendingUp
          size={15}
          className="text-[#e31b23]"
        />

        <h2 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em]">
          Manufacturing PMI
        </h2>
      </div>

      {mfgIndex.map((item) => {
        const positive = Number(item.value) >= 50;

        return (
          <div
            key={`${item.country}-${item.value}`}
            className="flex items-center justify-between py-2.5 border-b border-gray-200 last:border-0"
          >
            <div className="pr-2">
              <p className="text-[11px] font-semibold text-gray-900">
                {item.country}
              </p>

              <p className="text-[7px] text-gray-500 uppercase tracking-wide mt-0.5">
                {item.label}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="font-mono text-[11px] font-bold">
                {item.value}
              </p>

              <p
                className={`text-[7px] font-semibold uppercase ${
                  positive
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.status}
              </p>
            </div>
          </div>
        );
      })}

      <p className="text-[7px] leading-4 text-gray-400 mt-3">
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
      <SectionHeader
        title="Industry Statistics"
        icon={<Factory size={15} />}
      />

      <div className="overflow-x-auto border border-gray-300">
        <table className="w-full border-collapse text-[10px] md:text-xs">
          <tbody>
            <tr>
              <td className="w-1/3 bg-gray-100 border-b border-r border-gray-300 p-2.5 md:p-3 font-bold">
                ISM Manufacturing Index
              </td>
              <td className="border-b border-gray-300 p-2.5 md:p-3">
                54.0 — above consensus of 53.2
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-2.5 md:p-3 font-bold">
                New Orders Sub-Index
              </td>
              <td className="border-b border-gray-300 p-2.5 md:p-3">
                56.8 — up 2.7 points from April
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-2.5 md:p-3 font-bold">
                Manufacturing M&A
              </td>
              <td className="border-b border-gray-300 p-2.5 md:p-3">
                11 megadeals in 2025 — ranked 3rd globally
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-2.5 md:p-3 font-bold">
                AI in Manufacturing Deals
              </td>
              <td className="border-b border-gray-300 p-2.5 md:p-3">
                Among the most frequently cited technologies
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-r border-gray-300 p-2.5 md:p-3 font-bold">
                Cobot ROI Threshold
              </td>
              <td className="p-2.5 md:p-3">
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
   INDUSTRY STREAM
========================================================= */

function IndustryStream({
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
      <SectionHeader
        title={title}
        icon={icon}
      />

      <div>
        {stories.map((story, index) => (
          <Link
            key={story.id}
            to={specialArticlePath(story.slug || `manufacturing-industry-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`)}
            className="group block py-2.5 border-b border-gray-200 last:border-0"
          >
            <h3 className="text-[11px] md:text-[12px] leading-[1.4] font-medium text-gray-900 group-hover:text-[#e31b23] transition-colors">
              {story.title}
            </h3>

            <div className="flex items-center gap-1.5 mt-1.5 text-[7px] md:text-[8px] text-gray-400">
              <Clock size={9} />
              {story.time}
            </div>
          </Link>
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
    <section className="bg-[#f8f8f8] border border-gray-100 rounded-md p-3 md:p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="border border-gray-300 rounded px-1.5 py-1 text-[7px] uppercase tracking-widest text-gray-400">
          Sponsorship
        </span>

        <span className="text-[8px] text-gray-400">
          Presented by our partners
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {events.map((event) => (
          <div
            key={event}
            className="bg-white border border-gray-200 rounded-md min-h-[74px] flex flex-col items-center justify-center text-center px-2"
          >
            <div className="w-7 h-7 rounded-full bg-red-50 text-[#e31b23] flex items-center justify-center mb-2">
              <span className="text-[10px]">
                ✦
              </span>
            </div>

            <h3 className="text-[9px] font-bold text-gray-800">
              {event}
            </h3>

            <p className="text-[7px] text-gray-400 mt-0.5">
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
    <section className="bg-[#071a2d] rounded-md px-5 py-7 md:py-8 text-center text-white">
      <h2 className="font-serif font-bold text-[18px] md:text-[20px]">
        Stay Ahead with The Pride Times
      </h2>

      <p className="text-[9px] md:text-[10px] text-gray-400 mt-1">
        Daily briefings on Manufacturing delivered to your inbox.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          className="h-8 flex-1 rounded-sm border border-gray-600 bg-[#162c40] px-3 text-[9px] text-white outline-none placeholder:text-gray-500 focus:border-[#e31b23]"
        />

        <button
          type="button"
          className="h-8 px-5 bg-[#e31b23] hover:bg-[#c9151c] text-white text-[9px] font-bold rounded-sm transition-colors"
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

export function ManufacturingPage() {
  return (
    <main className="w-full min-h-screen bg-white text-gray-900 antialiased">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="pt-5 md:pt-7">
          <div className="border-t-[3px] border-[#e31b23] pt-4 md:pt-5">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-1">
              <div>
                <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] font-bold leading-tight text-gray-950">
                  Manufacturing
                </h1>

                <p className="mt-1 text-[10px] md:text-[12px] text-gray-500">
                  Industrial automation, reshoring, supply chain evolution,
                  and factory innovation.
                </p>
              </div>

              <div className="hidden md:flex items-center gap-2 text-gray-400">
                <Factory size={17} />

                <span className="text-[7px] uppercase tracking-[0.14em]">
                  Industry & Production
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <section className="mt-4 md:mt-5">
          <AdvertisementBar />
        </section>

        {/* =================================================
            LEAD STORY + MAJOR STORIES
        ================================================= */}

        <section className="mt-4 md:mt-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_255px] gap-5 md:gap-6">

          {/* LEAD STORY */}
          <div className="min-w-0">
            <Link to={specialArticlePath("manufacturing-reshoring") } className="block"><HeroStoryCard story={hero} /></Link>
          </div>

          {/* MAJOR STORIES RAIL */}
          <aside className="lg:border-l lg:border-gray-200 lg:pl-4">
            <div className="border-t-2 border-black pt-3">
              <h2 className="font-serif text-[16px] md:text-[18px] font-bold text-gray-950">
                Major Manufacturing Stories
              </h2>
            </div>

            <div className="mt-3 space-y-4">
              {majorStories.map((story) => (
                <Link key={story.id} to={specialArticlePath(story.slug || `manufacturing-major-${story.id}`)} className="block"><MajorStory story={story} /></Link>
              ))}
            </div>

            <div className="mt-4">
              <SponsoredContent />
            </div>
          </aside>
        </section>

        {/* =================================================
            MANUFACTURING COVERAGE
        ================================================= */}

        <section className="mt-7 md:mt-9">
          <SectionHeader
            title="Manufacturing Coverage"
            icon={<Factory size={15} />}
            subtitle="Technology, automation and industrial production"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            {manufacturingCoverage.map((story) => (
              <Link key={story.id} to={specialArticlePath(story.slug || `manufacturing-coverage-${story.id}`)} className="block"><CoverageStory story={story} /></Link>
            ))}
          </div>
        </section>

        {/* =================================================
            LATEST NEWS + NEWSROOM
        ================================================= */}

        <section className="mt-7 md:mt-9">
          <SectionHeader
            title="Latest Manufacturing News"
            icon={<TrendingUp size={15} />}
            subtitle="The latest developments across global manufacturing"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_235px] gap-5 md:gap-6">

            {/* NEWS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {latestStories.map((story) => (
                <Link key={story.id} to={specialArticlePath(story.slug || `manufacturing-latest-${story.id}`)} className="block"><LatestNewsCard story={story} /></Link>
              ))}
            </div>

            {/* NEWSROOM */}
            <NewsroomStream />
          </div>
        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <section className="mt-6 md:mt-7">
          <AdvertisementBar bottom />
        </section>

        {/* =================================================
            MORE FROM MANUFACTURING
        ================================================= */}

        <section className="mt-6 md:mt-8">
          <SectionHeader
            title="More From Manufacturing"
            icon={<Globe2 size={15} />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {[
              {
                title:
                  "Foxconn's AI-Driven Factories Reduce Human Labor by 70% in Two Years",
                time: "6 hr ago",
                image: Manu2Img,
                slug: "manufacturing-ai-robotics-digital-twins",
              },
              {
                title:
                  "Industrial Automation Investment Reaches New Record as AI Adoption Accelerates",
                time: "8 hr ago",
                image: Manu3Img,
                slug: "manufacturing-imts-2026-ai-robotics",
              },
            ].map((story, index) => (
              <Link
                key={story.title}
                to={specialArticlePath(story.slug || `manufacturing-more-${index + 1}`)}
                className="group flex gap-3 py-3 border-b border-gray-200"
              >
                <div className="w-[85px] h-[60px] shrink-0 overflow-hidden rounded-sm">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[7px] uppercase font-bold text-[#e31b23]">
                    Manufacturing
                  </p>

                  <h3 className="mt-0.5 font-serif text-[11px] md:text-[12px] font-bold leading-[1.25] text-gray-900 group-hover:text-[#e31b23] transition-colors">
                    {story.title}
                  </h3>

                  <p className="mt-1 text-[7px] text-gray-400">
                    {story.time}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =================================================
            MANUFACTURING DATA
        ================================================= */}

        <section className="mt-7 md:mt-9">
          <SectionHeader
            title="Manufacturing Outlook"
            icon={<TrendingUp size={15} />}
            subtitle="Selected manufacturing indicators and industry context"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6">

            <IndustryStatistics />

            <ManufacturingPMI />

          </div>
        </section>

        {/* =================================================
            INDUSTRY FOCUS
        ================================================= */}

        <section className="mt-7 md:mt-9 grid grid-cols-1 lg:grid-cols-3 gap-6 border-t-2 border-black pt-6">

          <div className="lg:col-span-2">
            <SectionHeader
              title="Industry Focus"
              icon={<Globe2 size={15} />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Factory
                    size={14}
                    className="text-[#e31b23]"
                  />

                  <h3 className="font-serif text-[14px] font-bold">
                    Intelligent Factories
                  </h3>
                </div>

                <p className="text-[9px] md:text-[10px] leading-[1.6] text-gray-500">
                  Manufacturers are increasing investment in automation,
                  robotics and intelligent production systems.
                </p>
              </div>

              <div className="border border-gray-200 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu
                    size={14}
                    className="text-[#e31b23]"
                  />

                  <h3 className="font-serif text-[14px] font-bold">
                    Industrial AI
                  </h3>
                </div>

                <p className="text-[9px] md:text-[10px] leading-[1.6] text-gray-500">
                  AI adoption is increasingly connected with factory
                  automation, electronics production and industrial
                  decision-making.
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionHeader
              title="At a Glance"
              icon={<TrendingUp size={15} />}
            />

            <div className="border-l-4 border-[#e31b23] pl-4">
              <p className="font-serif italic text-[14px] md:text-[15px] leading-6 text-gray-800">
                "The next manufacturing cycle will be defined by automation,
                resilient supply chains and intelligent factories."
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            AUTOMOTIVE + ROBOTICS
        ================================================= */}

        <section className="mt-7 md:mt-9 grid grid-cols-1 lg:grid-cols-2 gap-7 border-t-2 border-black pt-6">

          <IndustryStream
            title="Automotive & EV"
            icon={<Car size={15} />}
            stories={autoStories}
          />

          <IndustryStream
            title="Robotics & Automation"
            icon={<Cpu size={15} />}
            stories={roboticsStories}
          />
        </section>

        {/* =================================================
            SEMICONDUCTORS + AEROSPACE
        ================================================= */}

        <section className="mt-7 md:mt-9 grid grid-cols-1 lg:grid-cols-2 gap-7 border-t-2 border-black pt-6">

          <IndustryStream
            title="Semiconductors & Electronics"
            icon={<Cpu size={15} />}
            stories={semiconductors}
          />

          <IndustryStream
            title="Aerospace & Defense"
            icon={<Plane size={15} />}
            stories={aeroDefense}
          />
        </section>

        {/* =================================================
            SPONSORED EVENTS
        ================================================= */}

        <section className="mt-7 md:mt-9">
          <SponsorshipSection />
        </section>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <section className="mt-6 md:mt-8 mb-10">
          <Newsletter />
        </section>

        {/* =================================================
            BOTTOM EDITORIAL BAR
        ================================================= */}

        <div className="pb-6 pt-4 border-t border-gray-300 flex flex-col sm:flex-row justify-between gap-2 text-[8px] uppercase tracking-widest text-gray-400">
          <span>Manufacturing</span>

          <span>
            Industry 4.0 · Automation · Supply Chain · Automotive · Robotics
          </span>
        </div>
      </div>
    </main>
  );
}

export default ManufacturingPage;
