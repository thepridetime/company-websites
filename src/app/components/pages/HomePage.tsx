import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Play,
} from "lucide-react";

import EnergyImg from "../../../imports/energy-tanks.png";
import DataCentreImg from "../../../imports/data-centre.png";
import RoboticsImg from "../../../imports/warehouse-robotics.png";
import SupplyChainImg from "../../../imports/supply-chain-map.png";
import HealthcareImg from "../../../imports/ai-healthcare.png";
import CyberImg from "../../../imports/cyber-ops.png";
import MagazineImg from "../../../imports/pt30image.png"; // original magazine image (unchanged)

import { getQuotes } from "../../../services/marketApi";
import { articlePath } from "../../data/homepageArticleData";

/* =========================================================
   TYPES
========================================================= */

type NewsItem = {
  id: number;
  hot: boolean;
  category: string;
  tabs: string[];
  title: string;
  excerpt: string;
  publishedAt: string;
  image: string;
  link: string;
};

type MarketItem = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

/* =========================================================
   GOOGLE ADSENSE
========================================================= */

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function PrideTimesAd() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense Error:", error);
    }
  }, []);

  return (
    <section
      aria-label="Advertisement"
      className="my-8 overflow-hidden border-y border-gray-100 bg-white py-4"
    >
      <div className="mb-2 text-center text-[8px] font-medium uppercase tracking-[0.2em] text-gray-400">
        Advertisement
      </div>

      <div className="mx-auto w-full max-w-5xl overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot="6033028012"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </section>
  );
}

/* =========================================================
   TOP STORIES (HERO, CENTRE, VIDEO)
========================================================= */

const heroStory = {
  category: "ENERGY | GLOBAL MARKETS",
  title: "Middle East Supply Disruptions Put Global Energy Markets Under Pressure",
  excerpt:
    "Oil supply interruptions, tanker-route risks and volatile freight costs are reshaping the global energy outlook. The Pride Times report tracks the demand forecast, inventory drawdowns and peak Gulf production losses behind the disruption.",
  image: EnergyImg,
  link: "/markets",
};

const centerStories = [
  {
    id: 1,
    tag: "TECHNOLOGY | ENERGY",
    title: "AI Data-Centre Expansion Is Turning Secure Electricity Into a Strategic Constraint",
    excerpt:
      "Data-centre electricity demand is projected to approach 1,000 TWh by 2030, making secure power access and grid readiness central to the next phase of AI infrastructure.",
    publishedAt: "September 2026",
    image: DataCentreImg,
    link: "/technology",
  },
  {
    id: 2,
    tag: "SUPPLY CHAIN",
    title: "Global Supply Chains Reconfigure as Nearshoring and Geopolitical Risk Rise",
    excerpt:
      "Companies are balancing resilience against cost as tariffs, commodity prices and regional sourcing strategies reshape trade networks.",
    publishedAt: "September 2026",
    image: SupplyChainImg,
    link: "/supply-chain",
  },
];

const videoFeature = {
  title: "Autonomous Systems Move Into Mobility, Warehousing and Industrial Operations",
  image: RoboticsImg,
  link: "/innovation",
};

/* =========================================================
   LATEST NEWS (single merged list: one story = one entry)
   Stories already featured above are intentionally NOT repeated.
========================================================= */

const latestNewsTabs = [
  "All",
  "Markets",
  "Technology",
  "Cybersecurity",
  "Energy",
  "Industries",
  "World",
];

const latestNews: NewsItem[] = [
  {
    id: 1,
    hot: true,
    category: "CYBERSECURITY",
    tabs: ["Cybersecurity"],
    title: "Cybersecurity Teams Face a Shorter Window to Patch Critical Vulnerabilities",
    excerpt:
      "AI is accelerating the speed of cyber exploitation, putting critical infrastructure and industrial operators under pressure to shorten remediation cycles.",
    publishedAt: "September 2026",
    image: CyberImg,
    link: "/cybersecurity",
  },
  {
    id: 2,
    hot: true,
    category: "HEALTHCARE",
    tabs: ["Industries"],
    title: "Healthcare Supply Chains Turn to AI for Forecasting and Resilience",
    excerpt:
      "Software-led systems and AI tools are improving inventory visibility, demand forecasting and supplier-risk management across healthcare.",
    publishedAt: "September 2026",
    image: HealthcareImg,
    link: "/healthcare",
  },
  {
    id: 3,
    hot: false,
    category: "MANUFACTURING",
    tabs: ["Industries"],
    title: "Manufacturers Accelerate Robotics and AI as Tariffs and Labour Costs Bite",
    excerpt:
      "Robotics, digital twins and domestic supplier partnerships are becoming part of the manufacturing response to labour, tariff and energy pressures.",
    publishedAt: "September 2026",
    image: RoboticsImg,
    link: "/manufacturing",
  },
  {
    id: 4,
    hot: false,
    category: "MARKETS",
    tabs: ["Markets", "World"],
    title: "Central Banks Reassess Reserve Exposure as Gold Gains Strategic Attention",
    excerpt:
      "Reserve managers are weighing currency exposure against gold holdings as geopolitical risk shapes allocation decisions.",
    publishedAt: "September 2026",
    image: EnergyImg,
    link: "/markets",
  },
  {
    id: 5,
    hot: false,
    category: "WORLD",
    tabs: ["Markets", "World"],
    title: "Global Growth Outlook Faces Pressure From Energy Disruption and Fragmentation",
    excerpt:
      "Energy disruption and trade fragmentation are weighing on growth forecasts across major economies.",
    publishedAt: "September 2026",
    image: SupplyChainImg,
    link: "/world",
  },
  {
    id: 6,
    hot: false,
    category: "TECHNOLOGY",
    tabs: ["Technology"],
    title: "AI Moves From Assistive Tools to Autonomous Enterprise Workflows",
    excerpt:
      "Enterprises are shifting from AI assistants to agents that run multi-step business processes with limited human input.",
    publishedAt: "September 2026",
    image: RoboticsImg,
    link: "/technology",
  },
  {
    id: 7,
    hot: false,
    category: "TECHNOLOGY | WORLD",
    tabs: ["Technology", "World"],
    title: "U.S.–China AI Competition Expands From Models to Global Infrastructure",
    excerpt:
      "The AI race is moving beyond model quality to chips, data centres and the networks that connect them.",
    publishedAt: "September 2026",
    image: CyberImg,
    link: "/world",
  },
  {
    id: 8,
    hot: false,
    category: "ENERGY | CITIES",
    tabs: ["Energy", "Technology", "Industries"],
    title: "Smart-City Investment Converges Around AI, Grid Modernisation and Mobility",
    excerpt:
      "City planners are combining AI, grid upgrades and mobility projects into integrated infrastructure programmes.",
    publishedAt: "September 2026",
    image: DataCentreImg,
    link: "/smart-cities",
  },
];

/* =========================================================
   MAGAZINE
========================================================= */

const magazinePreview = {
  title: "The 2026 Global Industry Outlook",
  subtitle:
    "Energy security, AI infrastructure, supply-chain resilience and the forces reshaping global business.",
  image: MagazineImg,
};

/* =========================================================
   PRIDE TIMES 30
========================================================= */

const prideTimes30 = [
  { rank: 1, name: "Jensen Huang", company: "Nvidia", sector: "AI infrastructure, accelerated computing and robotics — areas central to Nvidia's technology strategy." },
  { rank: 2, name: "Satya Nadella", company: "Microsoft", sector: "Enterprise AI adoption and large-scale digital transformation across Microsoft's business ecosystem." },
  { rank: 3, name: "Sundar Pichai", company: "Alphabet / Google", sector: "AI integration across search, cloud and emerging technology businesses at Alphabet." },
  { rank: 4, name: "Elon Musk", company: "Tesla / SpaceX / X", sector: "Technology initiatives spanning energy, space, transportation and AI across Musk's companies." },
  { rank: 5, name: "Sam Altman", company: "OpenAI", sector: "Development and deployment of frontier artificial intelligence through OpenAI's research and products." },
  { rank: 6, name: "Andy Jassy", company: "Amazon", sector: "AWS and cloud infrastructure supporting the next generation of AI workloads." },
  { rank: 7, name: "Lisa Su", company: "AMD", sector: "Competitive AI computing across CPUs and GPUs as AMD expands its role in the market." },
  { rank: 8, name: "C.C. Wei", company: "TSMC", sector: "Advanced semiconductor manufacturing serving the global technology industry through TSMC." },
  { rank: 9, name: "Alex Karp", company: "Palantir", sector: "Enterprise AI and data platforms serving commercial and government markets through Palantir." },
  { rank: 10, name: "Mary Barra", company: "General Motors", sector: "Automotive transformation through electrification and technology at General Motors." },
];

/* =========================================================
   CHANGE CHIP
========================================================= */

function ChangeChip({ change, up }: { change: string; up: boolean }) {
  return (
    <span
      className={`text-[10px] font-semibold tabular-nums flex items-center gap-1 ${
        up ? "text-green-600" : "text-red-600"
      }`}
    >
      {up ? (
        <TrendingUp size={10} strokeWidth={2.25} />
      ) : (
        <TrendingDown size={10} strokeWidth={2.25} />
      )}
      {change}
    </span>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  link,
  linkText = "View All",
}: {
  title: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b-2 border-black pb-2.5 mb-5">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
        {title}
      </h2>

      {link && (
        <Link
          to={link}
          className="text-[9px] font-semibold text-red-600 flex items-center gap-1"
        >
          {linkText}
          <ArrowRight size={9} />
        </Link>
      )}
    </div>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export function HomePage() {
  const [activeMarketTab, setActiveMarketTab] =
    useState<"Indices" | "Crypto">("Indices");

  const [activeNewsTab, setActiveNewsTab] = useState("All");

  const [marketSnapshotData, setMarketSnapshotData] = useState<
    Record<string, MarketItem[]>
  >({
    Indices: [],
    Crypto: [],
  });

  /* =======================================================
     MARKET DATA
  ======================================================= */

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const data = await getQuotes();

        setMarketSnapshotData({
          Indices: data.indices.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: item.change,
            up: item.up,
          })),

          Crypto: data.crypto.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: item.change,
            up: item.up,
          })),
        });
      } catch (error) {
        console.error("Market API Error:", error);
      }
    };

    loadMarketData();
  }, []);

  /* =======================================================
     LATEST NEWS FILTER
  ======================================================= */

  const latestStories =
    activeNewsTab === "All"
      ? latestNews
      : latestNews.filter((story) => story.tabs.includes(activeNewsTab));

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-4 md:pt-6 pb-16">

          {/* =================================================
              TOP STORIES / NEWSROOM LEAD
          ================================================= */}

          <section className="pb-8 mb-8 border-b border-gray-300">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr_0.85fr] gap-5 lg:gap-6">

              {/* LEAD STORY */}

              <Link
                to={articlePath(heroStory.title)}
                className="group relative block overflow-hidden rounded-lg border border-gray-200 min-h-[430px] lg:min-h-[500px] bg-black"
              >
                <ImageWithFallback
                  src={heroStory.image}
                  alt={heroStory.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[9px] font-bold tracking-[0.16em] uppercase rounded-[2px]">
                  {heroStory.category}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h1 className="font-serif text-2xl md:text-[30px] lg:text-[34px] font-bold leading-[1.08] text-white">
                    {heroStory.title}
                  </h1>

                  <p className="text-[12px] md:text-[13px] text-gray-200 leading-[1.6] mt-3 line-clamp-3">
                    {heroStory.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-wide mt-4 border-b border-white/60 pb-1">
                    Read Full Story
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

              {/* MAJOR COVERAGE */}

              <div className="min-w-0">
                <div className="mb-4">
                  <span className="block text-[9px] font-bold text-red-600 uppercase tracking-[0.15em] mb-2">
                    {centerStories[0].tag}
                  </span>

                  <Link
                    to={articlePath(centerStories[0].title)}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={centerStories[0].image}
                        alt={centerStories[0].title}
                        className="w-full h-[220px] md:h-[250px] object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <h2 className="font-serif text-xl md:text-2xl font-bold leading-[1.15] mt-3 text-gray-950 group-hover:text-red-600 transition-colors">
                      {centerStories[0].title}
                    </h2>

                    <p className="text-[12px] text-gray-600 mt-2 leading-[1.6] line-clamp-3">
                      {centerStories[0].excerpt}
                    </p>
                  </Link>
                </div>

                {/* SECOND MAJOR STORY */}

                <Link
                  to={articlePath(centerStories[1].title)}
                  className="group flex gap-3 pt-4 border-t border-gray-200"
                >
                  <div className="shrink-0 w-[105px] h-[75px] overflow-hidden rounded-md">
                    <ImageWithFallback
                      src={centerStories[1].image}
                      alt={centerStories[1].title}
                      className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold text-red-600 uppercase tracking-[0.14em]">
                      {centerStories[1].tag}
                    </span>

                    <h3 className="text-[13px] font-bold leading-[1.35] mt-1 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                      {centerStories[1].title}
                    </h3>

                    <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-2">
                      <Clock size={9} />
                      {centerStories[1].publishedAt}
                    </span>
                  </div>
                </Link>

                {/* MARKET CONTEXT */}

                <div className="mt-5 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em]">
                      Market Snapshot
                    </h3>

                    <div className="flex gap-3">
                      {(["Indices", "Crypto"] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveMarketTab(tab)}
                          className={`text-[9px] font-semibold uppercase tracking-wide ${
                            activeMarketTab === tab
                              ? "text-red-600"
                              : "text-gray-400 hover:text-gray-700"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {(marketSnapshotData[activeMarketTab] || [])
                      .slice(0, 4)
                      .map((market) => (
                        <div
                          key={market.symbol}
                          className="py-2 flex items-center justify-between"
                        >
                          <span className="text-[10px] font-semibold text-gray-800">
                            {market.symbol}
                          </span>

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-gray-500 tabular-nums">
                              {market.value}
                            </span>

                            <ChangeChip
                              change={market.change}
                              up={market.up}
                            />
                          </div>
                        </div>
                      ))}
                  </div>

                  <Link
                    to="/markets"
                    className="mt-2 text-[9px] font-bold text-red-600 flex items-center gap-1 uppercase tracking-wide w-fit"
                  >
                    View All Markets
                    <ArrowRight size={9} />
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: VIDEO */}

              <aside className="min-w-0">
                <div className="pb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-serif text-lg font-bold">
                      Today's Videos
                    </h2>

                    <button
                      type="button"
                      className="border border-gray-300 rounded-full px-3 py-1 text-[9px] font-medium hover:border-gray-500 transition-colors"
                    >
                      Explore More
                    </button>
                  </div>

                  <Link
                    to={articlePath(videoFeature.title)}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={videoFeature.image}
                        alt={videoFeature.title}
                        className="w-full h-[175px] object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.03]"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors">
                        <div className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-md">
                          <Play
                            size={16}
                            fill="black"
                            className="text-black ml-0.5"
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-[13px] font-semibold leading-[1.4] mt-2.5 text-gray-900 group-hover:text-red-600 transition-colors">
                      {videoFeature.title}
                    </h3>
                  </Link>
                </div>
              </aside>
            </div>
          </section>

          <PrideTimesAd />

          {/* =================================================
              LATEST NEWS (merged) + MAGAZINE
          ================================================= */}

          <section className="grid grid-cols-1 lg:grid-cols-[1.7fr_0.8fr] gap-7 mb-12">

            {/* LATEST NEWS */}

            <div>
              <SectionHeader
                title="Latest News"
                link="/business-news"
              />

              {/* FILTER TABS */}

              <div className="flex items-center gap-5 overflow-x-auto no-scrollbar border-b border-gray-200 pb-3 mb-1">
                {latestNewsTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveNewsTab(tab)}
                    className={`text-[10px] font-semibold whitespace-nowrap uppercase tracking-wide transition-colors ${
                      activeNewsTab === tab
                        ? "text-red-600"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* STORY LIST */}

              <div className="divide-y divide-gray-200">
                {latestStories.length === 0 && (
                  <p className="py-6 text-[11px] text-gray-400">
                    No stories in this category yet.
                  </p>
                )}

                {latestStories.map((story) => (
                  <Link
                    key={story.id}
                    to={articlePath(story.title)}
                    className="group grid grid-cols-[120px_1fr] sm:grid-cols-[155px_1fr] gap-4 py-4"
                  >
                    <div className="w-full h-[80px] sm:h-[100px] overflow-hidden rounded-md">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[8px] font-bold uppercase tracking-[0.14em] ${
                            story.hot ? "text-red-600" : "text-gray-400"
                          }`}
                        >
                          {story.hot ? "Breaking" : "Latest"}
                        </span>

                        <span className="text-[8px] text-gray-300">•</span>

                        <span className="text-[8px] font-bold text-red-600 uppercase tracking-[0.14em]">
                          {story.category}
                        </span>
                      </div>

                      <h3 className="font-serif text-base md:text-lg font-bold leading-[1.2] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                        {story.title}
                      </h3>

                      <p className="hidden sm:block text-[10px] text-gray-500 leading-[1.5] mt-1 line-clamp-2">
                        {story.excerpt}
                      </p>

                      <span className="flex items-center gap-1 text-[9px] text-gray-400 mt-1.5">
                        <Clock size={8} />
                        {story.publishedAt}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* MAGAZINE */}

            <div>
              <SectionHeader title="Magazine" link="/magazine" />

              <Link
                to="/magazine"
                className="group block overflow-hidden rounded-md bg-black"
              >
                <div className="overflow-hidden">
                  <ImageWithFallback
                    src={magazinePreview.image}
                    alt={magazinePreview.title}
                    className="w-full h-[210px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-gray-500">
                    Pride Times Magazine
                  </span>

                  <h3 className="font-serif text-xl font-bold text-white mt-1">
                    {magazinePreview.title}
                  </h3>

                  <p className="text-[11px] text-gray-400 leading-[1.5] mt-1.5">
                    {magazinePreview.subtitle}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-white border-b border-white/50 pb-1 mt-4">
                    Read Digital Edition
                    <ArrowRight size={10} />
                  </span>
                </div>
              </Link>
            </div>
          </section>

          <PrideTimesAd />

          {/* =================================================
              PRIDE TIMES 30
          ================================================= */}

          <section>
            <SectionHeader
              title="Industry Leaders Shaping the 2026 Transition"
              link="/billionaires"
              linkText="Full List"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prideTimes30.map((leader) => (
                <div
                  key={leader.rank}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
                >
                  <span className="font-serif text-2xl font-bold text-gray-200 tabular-nums shrink-0 w-8">
                    {String(leader.rank).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-gray-900">
                      {leader.name}
                      <span className="font-normal text-gray-400">
                        {" "}
                        · {leader.company}
                      </span>
                    </p>

                    <p className="text-[10px] text-gray-500 leading-[1.5] mt-1">
                      {leader.sector}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* =====================================================
          LOCAL PAGE UTILITIES
      ===================================================== */}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: rgba(227, 27, 35, 0.12);
          color: inherit;
        }
      `}</style>
    </div>
  );
}
