import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Bookmark,
  Clock,
  MapPin,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getQuotes } from "../../../services/marketApi";

import MagazineImg from "../../../imports/pt30image.png";
import businessNyseTrading from "../../../imports/business-nyse-trading.jpg";
import businessStockDrop from "../../../imports/business-stock-drop.png";
import businessAviationJet from "../../../imports/business-aviation-jet.png";
import businessJioDigital from "../../../imports/business-jio-digital.png";
import businessGoldmanNyse from "../../../imports/business-goldman-nyse.png";
import energyTanks from "../../../imports/energy-tanks.png";
import warehouseRobotics from "../../../imports/warehouse-robotics.png";
import dataCentre from "../../../imports/data-centre.png";
import supplyChainMap from "../../../imports/supply-chain-map.png";
import img_FIN3 from "../../../imports/FIN3.png";
import img_FIN4 from "../../../imports/FIN4.png";
import img_FIN5 from "../../../imports/FIN5.png";
import microsoftDatacenterAi from "../../../imports/microsoft-datacenter-ai.jpg";
import hsbcBankBuilding from "../../../imports/hsbc-bank-building.jpg";
import {
  defaultMarketSnapshot,
  type MarketIndexItem,
} from "../../data/innovationData";

import {
  hero,
  headlineNews,
  corporateNews,
  startupNews,
  maDeals,
  earningsNews,
  type BusinessArticle,
} from "../../data/businessNewsData";
import {
  octEditionArticles,
  octEditionMeta,
  octEditionGlance,
  octEditionArticlePath,
} from "../../data/octEditionData";
import {
  maEdition1Articles,
  maEdition1Meta,
  maEdition1DealTable,
  maEdition1Sources,
  maEdition1ArticlePath,
  maEdition1IndustryOrder,
} from "../../data/maEdition1Data";
import {
  digestArticles,
  digestArticlePath,
  digestSections,
} from "../../data/digestArticleData";

/* =========================================================
   TYPES
========================================================= */

type MarketItem = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

/* One card shape for every business story, whichever data file it
   comes from, so the whole page can use the homepage layout. */
interface NewsCard {
  id: string;
  title: string;
  lede: string;
  image: string;
  /* Red kicker above the headline (industry or category). */
  label: string;
  /* Filter tab the story belongs to. */
  tab: string;
  location?: string;
  when: string;
  readTime?: string;
  path: string;
}

/* =========================================================
   GOOGLE ADSENSE
========================================================= */

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function PrideTimesAd({
  slot,
  format = "auto",
  layout,
  layoutKey,
}: {
  slot: string;
  format?: "auto" | "fluid";
  layout?: string;
  layoutKey?: string;
}) {
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
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={format === "auto" ? "true" : undefined}
          data-ad-layout={layout}
          data-ad-layout-key={layoutKey}
        />
      </div>
    </section>
  );
}

/* =========================================================
   STORY LIST
   Every business story on the site, newest edition first:
   1. The Pride Times News, Global Industry Edition (7 Oct 2026)
   2. Global Corporate News Digest, Edition 1: M&A (2 Oct 2026)
   3. Global Corporate News Digest, September 2026 (business desks)
   4. Earlier Business News stories (corporate strategy, deals,
      corporate news, startups)
   Nothing is removed; duplicates by id are dropped.
========================================================= */

const categoryImages: Record<string, string> = {
  TELECOM: businessJioDigital,
  BANKING: businessGoldmanNyse,
  AEROSPACE: businessAviationJet,
  ENERGY: energyTanks,
  RETAIL: warehouseRobotics,
  LUXURY: businessStockDrop,
};

const fallbackPool = [
  dataCentre,
  supplyChainMap,
  businessStockDrop,
  warehouseRobotics,
];

function legacyImage(story: BusinessArticle, index: number): string {
  return (
    story.image ??
    categoryImages[story.category.toUpperCase()] ??
    fallbackPool[index % fallbackPool.length]
  );
}

/* Only business desks are shown here. Technology & AI, Energy &
   Climate, Healthcare & Pharma, Sustainability & ESG and the Regional
   Roundup have their own section pages and are left out. */
const BUSINESS_SECTIONS = new Set([
  "Markets and Finance",
  "Mergers and Acquisitions",
  "Consumer and Retail",
  "Industry and Supply Chain",
  "Leadership and Governance",
]);

const octCards: NewsCard[] = octEditionArticles
  .filter((a) => BUSINESS_SECTIONS.has(a.section))
  .map((a) => ({
  id: a.id,
  title: a.title,
  lede: a.lede,
  image: a.image,
  label: a.industry,
  tab: a.section,
  location: a.location,
  when: a.publishedAt,
  readTime: a.readTime,
  path: octEditionArticlePath(a),
}));

/* Business and economy figures only. */
const businessGlance = octEditionGlance.filter(
  (item) => !/obesity/i.test(item.indicator)
);

const maCards: NewsCard[] = maEdition1Articles.map((a) => ({
  id: a.id,
  title: a.title,
  lede: a.lede,
  image: a.image,
  label: a.industry,
  tab: a.section,
  location: a.location,
  when: a.publishedAt,
  readTime: a.readTime,
  path: maEdition1ArticlePath(a),
}));

const digestCards: NewsCard[] = digestArticles
  .filter((a) => BUSINESS_SECTIONS.has(a.section))
  .map((a) => ({
  id: a.id,
  title: a.title,
  lede: a.lede,
  image: a.image,
  label: a.section,
  tab: a.section,
  location: a.location,
  when: a.publishedAt,
  readTime: a.readTime,
  path: digestArticlePath(a),
}));

const LEGACY_TAB = "Corporate & Startups";

const legacyCards: NewsCard[] = [
  hero,
  ...headlineNews,
  ...corporateNews,
  ...startupNews,
].map((a, index) => ({
  id: a.id,
  title: a.title,
  lede: a.excerpt ?? a.dek,
  image: legacyImage(a, index),
  label: a.category,
  tab: LEGACY_TAB,
  when: a.time,
  readTime: a.readTime,
  path: `/article/${a.id}`,
}));

const allCards: NewsCard[] = Array.from(
  new Map(
    [...octCards, ...maCards, ...digestCards, ...legacyCards]
      .filter((card) => card.id)
      .map((card) => [card.id, card] as const)
  ).values()
);

/* =========================================================
   FRONT-PAGE PICKS (same structure as the homepage)
========================================================= */

const leadStory = octCards[0] ?? allCards[0];
const majorStories = [octCards[1] ?? allCards[1], octCards[2] ?? allCards[2]];
const editorsPick: NewsCard = {
  id: "deals-and-moves-roundup",
  title: "Deals and Moves Roundup",
  lede: "Transactions and partnerships reported in the past few weeks, mostly via Semiconductor Engineering's 2 October review.",
  image: img_FIN4,
  label: "CORPORATE",
  tab: "Corporate & Startups",
  when: "7 October 2026",
  readTime: "1 min read",
  path: "/article/deals-and-moves-roundup",
};

const latestNewsStories: NewsCard[] = maCards.slice(0, 5).map((card) => {
  if (card.id === "global-ma-record-pace-2026") {
    return {
      ...card,
      title: "Global M&A hits a record pace in 2026 as dealmaking tops $2.8 trillion",
      readTime: "3 min read",
    };
  }
  return {
    ...card,
    readTime: "3 min read",
  };
});

const featuredIds = new Set(
  [leadStory, ...majorStories, editorsPick].map((card) => card.id)
);

const sidebarStories = latestNewsStories;

/* Filter tabs: department order from the digest first, then any
   other tab that appears in the data. */
const tabOrder = [
  ...digestSections
    .map((section) => section.name)
    .filter((name) => BUSINESS_SECTIONS.has(name)),
  LEGACY_TAB,
];
const presentTabs = new Set(allCards.map((card) => card.tab));
const latestNewsTabs = [
  "All",
  ...tabOrder.filter((tab) => presentTabs.has(tab)),
  ...Array.from(presentTabs).filter((tab) => !tabOrder.includes(tab)),
];

const PAGE_SIZE = 8;

/* M&A edition grouped by industry, in digest order. */
const maIndustries = maEdition1IndustryOrder
  .map((name) => ({
    name,
    stories: maEdition1Articles.filter((a) => a.industry === name),
  }))
  .filter((group) => group.stories.length > 0);

const maLead = maEdition1Articles[0];

const maValueChip = (article: (typeof maEdition1Articles)[number]) =>
  article.keyFacts.find((fact) =>
    ["Enterprise value", "Combined enterprise value", "Value"].includes(
      fact.label
    )
  );

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
   EARNINGS + DEALS BADGES
========================================================= */

const earningsBadge: Record<string, string> = {
  BEAT: "bg-green-600 text-white",
  MISS: "bg-red-600 text-white",
};

const dealBadge: Record<string, string> = {
  Closed: "bg-green-600 text-white",
  Announced: "bg-blue-600 text-white",
  Pending: "bg-amber-500 text-white",
};

/* =========================================================
   SMALL PARTS
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

function MarketSparkline({
  points,
  up,
}: {
  points?: number[];
  up: boolean;
}) {
  if (!points || points.length === 0) return null;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 64;
  const height = 18;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${coords.join(" L ")}`;
  const strokeColor = up ? "#16a34a" : "#dc2626";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-14 sm:w-16 h-4 overflow-visible"
      preserveAspectRatio="none"
    >
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EarningsMiniSparkline({ up }: { up: boolean }) {
  return (
    <svg className="w-10 sm:w-12 h-3.5 overflow-visible shrink-0" viewBox="0 0 48 14" fill="none">
      <path
        d={up ? "M 2 11 Q 14 10, 24 7 T 46 2" : "M 2 3 Q 14 4, 24 7 T 46 12"}
        stroke={up ? "#16a34a" : "#dc2626"}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MiniAreaSparkline({ up }: { up: boolean }) {
  const stroke = up ? "#16a34a" : "#dc2626";
  const fill = up ? "rgba(22, 163, 74, 0.14)" : "rgba(220, 38, 38, 0.14)";
  const pathD = up
    ? "M 0 13 C 14 12, 24 8, 42 7 C 56 6, 68 3, 80 1 L 80 16 L 0 16 Z"
    : "M 0 2 C 14 3, 24 7, 42 8 C 56 9, 68 12, 80 14 L 80 16 L 0 16 Z";
  const lineD = up
    ? "M 0 13 C 14 12, 24 8, 42 7 C 56 6, 68 3, 80 1"
    : "M 0 2 C 14 3, 24 7, 42 8 C 56 9, 68 12, 80 14";

  return (
    <svg className="w-full h-full overflow-hidden" viewBox="0 0 80 16" preserveAspectRatio="none">
      <path d={pathD} fill={fill} />
      <path d={lineD} stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* =========================================================
   BUSINESS NEWS PAGE
========================================================= */

export function BusinessNewsPage() {
  const [activeMarketTab, setActiveMarketTab] =
    useState<"Indices" | "Commodities" | "Crypto">("Indices");

  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const newsListRef = useRef<HTMLDivElement | null>(null);

  const [marketSnapshotData, setMarketSnapshotData] = useState<
    Record<string, MarketItem[]>
  >({
    Indices: [],
    Commodities: [],
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

  const currentMarketItems = useMemo(() => {
    const fallbackList = defaultMarketSnapshot[activeMarketTab] || [];
    const liveList = marketSnapshotData[activeMarketTab] || [];
    if (!liveList || liveList.length === 0) return fallbackList;
    return fallbackList.map((item, idx) => {
      const live = liveList.find(
        (l) => l.symbol.toLowerCase() === item.symbol.toLowerCase()
      ) ?? liveList[idx];
      if (!live) return item;
      return {
        ...item,
        value: String(live.value || item.value),
        change: live.change || item.change,
        up: typeof live.up === "boolean" ? live.up : item.up,
      };
    });
  }, [activeMarketTab, marketSnapshotData]);

  /* =======================================================
     LATEST NEWS FILTERING
  ======================================================= */

  const filteredStories = useMemo(
    () =>
      activeNewsTab === "All"
        ? allCards
        : allCards.filter((card) => card.tab === activeNewsTab),
    [activeNewsTab]
  );

  const latestStories =
    activeNewsTab === "All"
      ? filteredStories.slice(0, visibleCount)
      : filteredStories;

  const hasMore =
    activeNewsTab === "All" && visibleCount < filteredStories.length;

  const selectTab = (tab: string) => {
    setActiveNewsTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  const tabCount = (tab: string) =>
    tab === "All"
      ? allCards.length
      : allCards.filter((card) => card.tab === tab).length;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-4 md:pt-6 pb-16">


          <PrideTimesAd slot="5373718974" />

          {/* =================================================
              TOP STORIES / NEWSROOM LEAD
          ================================================= */}

          <section className="pb-8 mb-8 border-b border-gray-300">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.04fr_1fr] gap-5 lg:gap-6 items-stretch">
              {/* =======================================================
                  1. LEFT SECTION — FEATURED BUSINESS STORY
              ======================================================= */}
              <div className="min-w-0 flex flex-col">
                <Link
                  to={leadStory.path}
                  className="group relative flex flex-col justify-end overflow-hidden rounded-none border border-gray-200/90 bg-gray-950 h-full min-h-[500px] lg:min-h-[540px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  <ImageWithFallback
                    src={businessNyseTrading}
                    alt={leadStory.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Subtle black gradient so the headline remains crisp & readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

                  {/* Red category label at top-left with consistent padding */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-red-600 text-white px-3 py-1 text-[9.5px] font-bold tracking-[0.16em] uppercase rounded-none shadow-sm">
                      {leadStory.label}
                      {leadStory.location ? ` | ${leadStory.location}` : ""}
                    </span>
                  </div>

                  {/* Headline, dek and read link at bottom */}
                  <div className="relative z-10 p-5 sm:p-6 lg:p-7">
                    <div className="w-8 h-[3px] bg-red-600 mb-2.5" />
                    <h2 className="font-serif text-2xl sm:text-[28px] lg:text-[32px] font-bold leading-[1.12] text-white tracking-normal group-hover:text-red-100 transition-colors">
                      {leadStory.title}
                    </h2>

                    <p className="text-[12px] sm:text-[13px] text-gray-200 leading-[1.6] mt-3 line-clamp-3">
                      {leadStory.lede}
                    </p>

                    <div className="mt-4 pt-1">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-wider border-b border-white/60 pb-1 group-hover:text-red-400 group-hover:border-red-400 transition-colors">
                        <span>Read Full Story</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* =======================================================
                  2. MIDDLE SECTION — TOP BUSINESS STORIES, CORPORATE MOVES, EARNINGS WATCH & MARKET SNAPSHOT
              ======================================================= */}
              <div className="min-w-0 lg:border-x lg:border-gray-200/80 lg:px-5 xl:px-6 flex flex-col justify-between">
                <div>
                  {/* A. TOP BUSINESS STORIES */}
                  <div className="flex items-center justify-between border-b-2 border-black pb-1.5 mb-3">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
                      Top Business Stories
                    </h2>
                    <Link
                      to="/supply-chain"
                      className="text-[9.5px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>View More</span>
                      <ArrowRight size={10} />
                    </Link>
                  </div>

                  {/* Story 1: Tariffs and the End of EV Credits (Horizontal Layout) */}
                  <Link
                    to={majorStories[0].path}
                    className="group flex gap-3 items-start pb-3"
                  >
                    <div className="shrink-0 w-[95px] sm:w-[105px] h-[72px] sm:h-[78px] overflow-hidden rounded-none border border-gray-200/80 bg-gray-100">
                      <ImageWithFallback
                        src={majorStories[0].image}
                        alt={majorStories[0].title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-[0.12em] text-red-600">
                        <span>{majorStories[0].label}</span>
                        {majorStories[0].location && (
                          <>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500 font-semibold">{majorStories[0].location}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-serif text-[13.5px] sm:text-[14px] font-bold leading-[1.25] mt-0.5 text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2">
                        {majorStories[0].title}
                      </h3>

                      <p className="mt-0.5 text-[10.5px] leading-[1.4] text-gray-600 line-clamp-2">
                        {majorStories[0].lede}
                      </p>

                      <div className="flex items-center justify-between text-[9px] text-gray-400 mt-1.5">
                        <div className="flex items-center gap-1.5">
                          <Clock size={9} />
                          <span>{majorStories[0].when}</span>
                          {majorStories[0].readTime && (
                            <>
                              <span>·</span>
                              <span>{majorStories[0].readTime}</span>
                            </>
                          )}
                        </div>
                        <button
                          type="button"
                          aria-label="Bookmark story"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="text-gray-400 hover:text-gray-800 transition-colors"
                        >
                          <Bookmark size={11} strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  </Link>

                  {/* Story 2: Airbus (Horizontal Layout) */}
                  <div className="border-t border-gray-200/80 pt-2.5">
                    <Link
                      to={majorStories[1].path}
                      className="group flex gap-3 items-start"
                    >
                      <div className="shrink-0 w-[95px] sm:w-[105px] h-[72px] sm:h-[78px] overflow-hidden rounded-none border border-gray-200/80 bg-gray-100">
                        <ImageWithFallback
                          src={majorStories[1].image}
                          alt={majorStories[1].title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-[0.12em] text-red-600">
                          <span>{majorStories[1].label}</span>
                          {majorStories[1].location && (
                            <>
                              <span className="text-gray-300">|</span>
                              <span className="text-gray-500 font-semibold">{majorStories[1].location}</span>
                            </>
                          )}
                        </div>

                        <h3 className="font-serif text-[13.5px] sm:text-[14px] font-bold leading-[1.25] mt-0.5 text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2">
                          {majorStories[1].title}
                        </h3>

                        <p className="mt-0.5 text-[10.5px] leading-[1.4] text-gray-600 line-clamp-2">
                          {majorStories[1].lede}
                        </p>

                        <div className="flex items-center justify-between text-[9px] text-gray-400 mt-1.5">
                          <div className="flex items-center gap-1.5">
                            <Clock size={9} />
                            <span>{majorStories[1].when}</span>
                            {majorStories[1].readTime && (
                              <>
                                <span>·</span>
                                <span>{majorStories[1].readTime}</span>
                              </>
                            )}
                          </div>
                          <button
                            type="button"
                            aria-label="Bookmark story"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="text-gray-400 hover:text-gray-800 transition-colors"
                          >
                            <Bookmark size={11} strokeWidth={1.75} />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* B. CORPORATE MOVES */}
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between border-b-2 border-black pb-1.5 mb-2.5">
                      <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
                        Corporate Moves
                      </h3>
                      <Link
                        to="/mergers-acquisitions"
                        className="text-[9.5px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 uppercase tracking-wider"
                      >
                        <span>View More</span>
                        <ArrowRight size={10} />
                      </Link>
                    </div>

                    <div className="space-y-2.5">
                      {/* Story 1: Microsoft */}
                      <Link
                        to="/article/paramount-skydance-and-warner-bros-discovery-a-110-billion-deal-stuck-in-court"
                        className="group flex gap-3 items-start"
                      >
                        <div className="shrink-0 w-[95px] sm:w-[105px] h-[72px] sm:h-[78px] overflow-hidden rounded-none border border-gray-200/80 bg-gray-100">
                          <ImageWithFallback
                            src={microsoftDatacenterAi}
                            alt="Microsoft Expands AI Infrastructure with New Data Center Investment"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-[0.12em] text-red-600">
                            <span>MERGERS & ACQUISITIONS</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500 font-semibold">GLOBAL</span>
                          </div>
                          <h4 className="font-serif text-[13.5px] sm:text-[14px] font-bold leading-[1.25] mt-0.5 text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2">
                            Microsoft Expands AI Infrastructure with New Data Center Investment
                          </h4>
                          <p className="mt-0.5 text-[10.5px] leading-[1.4] text-gray-600 line-clamp-2">
                            The company will invest $10 billion in new AI-ready data centers across the US and Europe.
                          </p>
                          <div className="flex items-center justify-between text-[9px] text-gray-400 mt-1.5">
                            <div className="flex items-center gap-1.5">
                              <Clock size={9} />
                              <span>7 October 2026</span>
                              <span>·</span>
                              <span>2 min read</span>
                            </div>
                            <button
                              type="button"
                              aria-label="Bookmark story"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              className="text-gray-400 hover:text-gray-800 transition-colors"
                            >
                              <Bookmark size={11} strokeWidth={1.75} />
                            </button>
                          </div>
                        </div>
                      </Link>

                      {/* Story 2: HSBC */}
                      <div className="border-t border-gray-200/80 pt-2.5">
                        <Link
                          to="/article/deals-and-moves-roundup"
                          className="group flex gap-3 items-start"
                        >
                          <div className="shrink-0 w-[95px] sm:w-[105px] h-[72px] sm:h-[78px] overflow-hidden rounded-none border border-gray-200/80 bg-gray-100">
                            <ImageWithFallback
                              src={hsbcBankBuilding}
                              alt="HSBC to Restructure Operations Amid Cost-Cutting Drive"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-[0.12em] text-red-600">
                              <span>BANKING</span>
                              <span className="text-gray-300">|</span>
                              <span className="text-gray-500 font-semibold">EUROPE</span>
                            </div>
                            <h4 className="font-serif text-[13.5px] sm:text-[14px] font-bold leading-[1.25] mt-0.5 text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2">
                              HSBC to Restructure Operations Amid Cost-Cutting Drive
                            </h4>
                            <p className="mt-0.5 text-[10.5px] leading-[1.4] text-gray-600 line-clamp-2">
                              HSBC announced a new restructuring plan to simplify its global operations and reduce costs.
                            </p>
                            <div className="flex items-center justify-between text-[9px] text-gray-400 mt-1.5">
                              <div className="flex items-center gap-1.5">
                                <Clock size={9} />
                                <span>7 October 2026</span>
                                <span>·</span>
                                <span>2 min read</span>
                              </div>
                              <button
                                type="button"
                                aria-label="Bookmark story"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                className="text-gray-400 hover:text-gray-800 transition-colors"
                              >
                                <Bookmark size={11} strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* C. EARNINGS WATCH */}
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-1.5 mb-2.5">
                      <h3 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-gray-950">
                        Earnings Watch
                      </h3>
                      <Link
                        to="/markets"
                        className="text-[9px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 uppercase tracking-wider"
                      >
                        <span>See More</span>
                        <ArrowRight size={9} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      {/* Apple */}
                      <div className="border border-gray-200/90 bg-white p-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <svg className="w-3.5 h-3.5 text-black shrink-0" viewBox="0 0 170 170" fill="currentColor">
                              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.79-11.97-14.24-6.3-9.52-11.19-20.4-14.67-32.64-3.48-12.24-5.22-23.77-5.22-34.59 0-14.97 3.8-27.42 11.41-37.35 7.6-9.93 17.06-15.01 28.38-15.24 4.58 0 9.8 1.25 15.66 3.76 5.86 2.5 9.77 3.8 11.73 3.91 1.74 0 5.8-1.36 12.18-4.07 6.38-2.71 11.75-3.96 16.11-3.76 12.06.63 21.72 5.09 28.98 13.38-10.45 6.32-15.56 15.23-15.34 26.74.22 9.02 3.65 16.63 10.29 22.83 6.64 6.2 14.59 9.68 23.85 10.44-2.28 6.84-4.89 13.59-7.83 20.25zM119.22 33.15c0-6.85 2.5-13.43 7.51-19.74 5.01-6.31 11.23-10.74 18.66-13.29.33 2.17.5 4.13.5 5.87 0 6.85-2.6 13.54-7.81 20.07-5.21 6.53-11.47 10.74-18.78 12.63-.08-1.85-.08-3.69-.08-5.54z" />
                            </svg>
                            <span className="text-[10px] font-medium text-gray-700 truncate">Apple (AAPL)</span>
                          </div>
                          <div className="text-[13.5px] font-bold text-gray-950 leading-tight">
                            $189.32
                          </div>
                          <div className="flex items-center justify-between gap-1 mt-1">
                            <span className="text-[10px] font-bold text-green-600 tabular-nums">
                              +2.14%
                            </span>
                            <EarningsMiniSparkline up={true} />
                          </div>
                        </div>
                        <div className="text-[8.5px] text-gray-400 mt-2 truncate">
                          Q3 revenue beats estimates
                        </div>
                      </div>

                      {/* Microsoft */}
                      <div className="border border-gray-200/90 bg-white p-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                              <path fill="#F25022" d="M1 1h10v10H1z"/>
                              <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                              <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                              <path fill="#FFB900" d="M13 13h10v10H13z"/>
                            </svg>
                            <span className="text-[10px] font-medium text-gray-700 truncate">Microsoft (MSFT)</span>
                          </div>
                          <div className="text-[13.5px] font-bold text-gray-950 leading-tight">
                            $410.12
                          </div>
                          <div className="flex items-center justify-between gap-1 mt-1">
                            <span className="text-[10px] font-bold text-green-600 tabular-nums">
                              +1.62%
                            </span>
                            <EarningsMiniSparkline up={true} />
                          </div>
                        </div>
                        <div className="text-[8.5px] text-gray-400 mt-2 truncate">
                          Cloud growth remains strong
                        </div>
                      </div>

                      {/* Nvidia */}
                      <div className="border border-gray-200/90 bg-white p-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <svg className="w-3.5 h-3.5 shrink-0 text-[#76B900]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8.938 6.702c.484-.047.98-.07 1.488-.07 4.195 0 7.746 2.375 9.473 5.86-1.399 2.922-4.148 5.008-7.465 5.567v-2.02c2.258-.492 4.102-1.996 5.066-4.004-1.285-2.438-3.82-4.031-6.727-4.031-.383 0-.75.031-1.117.078l-.718-1.38zm-2.094 2.82c.477-.18.984-.32 1.516-.414l.734 1.406c-.344.07-.672.18-.984.32-.977.438-1.766 1.156-2.281 2.055.805 1.766 2.438 3.016 4.383 3.328v1.656c-2.906-.39-5.328-2.227-6.398-4.875.75-1.578 1.836-2.773 3.03-3.476zm-2.844-1.633C5.938 6.133 8.359 5.25 10.984 5.25c5.367 0 9.875 3.383 11.594 8.188-1.898 4.297-5.969 7.375-10.773 7.828v1.734c5.844-.484 10.742-4.32 12.984-9.688C22.75 7.109 17.383 3 10.984 3c-3.156 0-6.07.977-8.484 2.656l1.5 2.235z"/>
                            </svg>
                            <span className="text-[10px] font-medium text-gray-700 truncate">Nvidia (NVDA)</span>
                          </div>
                          <div className="text-[13.5px] font-bold text-gray-950 leading-tight">
                            $1,246.90
                          </div>
                          <div className="flex items-center justify-between gap-1 mt-1">
                            <span className="text-[10px] font-bold text-red-600 tabular-nums">
                              -0.84%
                            </span>
                            <EarningsMiniSparkline up={false} />
                          </div>
                        </div>
                        <div className="text-[8.5px] text-gray-400 mt-2 truncate">
                          Mixed outlook after earnings
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* D. MARKET SNAPSHOT */}
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-gray-200">
                    <h3 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-gray-950">
                      Market Snapshot
                    </h3>

                    <div className="flex items-center gap-3">
                      {(["INDICES", "COMMODITIES", "CRYPTO"] as const).map((tab) => {
                        const standardTab =
                          tab === "INDICES"
                            ? "Indices"
                            : tab === "COMMODITIES"
                            ? "Commodities"
                            : "Crypto";
                        const isActive = activeMarketTab === standardTab;
                        return (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveMarketTab(standardTab)}
                            className={`text-[9px] font-bold uppercase tracking-wider pb-0.5 transition-colors ${
                              isActive
                                ? "text-red-600 border-b-2 border-red-600"
                                : "text-gray-400 hover:text-gray-700"
                            }`}
                          >
                            {tab}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {currentMarketItems.slice(0, 4).map((market) => (
                      <div
                        key={market.symbol}
                        className="border border-gray-200/90 bg-white p-2 flex flex-col justify-between h-[86px]"
                      >
                        <div>
                          <span className="block text-[8.5px] font-bold uppercase tracking-wider text-gray-500 truncate">
                            {market.symbol}
                          </span>
                          <span className="block text-[13px] font-bold text-gray-950 leading-tight mt-0.5 tabular-nums">
                            {market.value}
                          </span>
                          <span
                            className={`text-[9.5px] font-bold tabular-nums flex items-center gap-0.5 mt-0.5 ${
                              market.up ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            <span>{market.up ? "▲" : "▼"}</span>
                            <span>{market.change}</span>
                          </span>
                        </div>

                        <div className="h-4 w-full -mb-1 mt-1">
                          <MiniAreaSparkline up={market.up} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[9px] text-gray-400">
                    <span>Delayed 15m · Global Exchanges</span>
                    <Link
                      to="/markets"
                      className="text-[9.5px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>View All Markets</span>
                      <ArrowRight size={9} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* =======================================================
                  3. RIGHT SECTION — EDITOR'S PICK & LATEST NEWS
              ======================================================= */}
              <aside className="min-w-0 flex flex-col justify-between">
                {/* 4. EDITOR'S PICK */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
                      Editor's Pick
                    </h2>

                    <Link
                      to="/markets"
                      className="border border-gray-300 rounded-full px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-700 hover:text-black hover:border-gray-500 transition-colors"
                    >
                      Explore More
                    </Link>
                  </div>

                  <Link to={editorsPick.path} className="group block">
                    <div className="relative overflow-hidden rounded-none border border-gray-200/80 bg-gray-100 aspect-[16/9]">
                      <ImageWithFallback
                        src={editorsPick.image}
                        alt={editorsPick.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <span className="block text-[9px] font-bold text-red-600 uppercase tracking-[0.14em] mt-2.5">
                      {editorsPick.label}
                    </span>

                    <h3 className="font-serif text-[15px] font-bold leading-[1.3] mt-1 text-gray-950 group-hover:text-red-600 transition-colors">
                      {editorsPick.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-[1.5] text-gray-600 line-clamp-2">
                      {editorsPick.lede}
                    </p>

                    <div className="flex items-center justify-between text-[9.5px] text-gray-400 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Clock size={9} />
                        <span>{editorsPick.when}</span>
                        {editorsPick.readTime && (
                          <>
                            <span>·</span>
                            <span>{editorsPick.readTime}</span>
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        aria-label="Bookmark"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="text-gray-400 hover:text-gray-800 transition-colors"
                      >
                        <Bookmark size={11} strokeWidth={1.75} />
                      </button>
                    </div>
                  </Link>
                </div>

                {/* 5. LATEST NEWS STREAM */}
                <div className="pt-3.5">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-1.5 mb-1">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                      Latest News
                    </h2>

                    <span className="text-[8.5px] font-bold uppercase tracking-wider text-gray-400">
                      Business Desk
                    </span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {latestNewsStories.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="group block py-2.5 first:pt-2 last:pb-1"
                      >
                        <div className="flex gap-2.5 items-start">
                          {item.image && (
                            <div className="shrink-0 w-[58px] h-[58px] overflow-hidden rounded-none border border-gray-200/80 bg-gray-100 mt-0.5">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[8.5px] font-bold uppercase tracking-wider text-red-600 truncate">
                                {item.location ?? item.label}
                              </span>
                              <span className="text-gray-300 text-[8.5px]">·</span>
                              <span className="text-[8.5px] text-gray-400 font-medium shrink-0">
                                October 2026
                              </span>
                            </div>

                            <h4 className="text-[11.5px] font-bold leading-[1.3] text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                              {item.title}
                            </h4>

                            <p className="mt-0.5 text-[10px] leading-[1.35] text-gray-500 line-clamp-2">
                              {item.lede}
                            </p>

                            <div className="flex items-center justify-between text-[8.5px] text-gray-400 mt-1">
                              <span>{item.readTime || "3 min read"}</span>
                              <button
                                type="button"
                                aria-label="Bookmark story"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                className="text-gray-400 hover:text-gray-800 transition-colors"
                              >
                                <Bookmark size={11} strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <PrideTimesAd slot="8042854193" format="fluid" layout="in-article" />

          {/* =================================================
              GLOBAL INDUSTRY EDITION — HEADLINES BY INDUSTRY
          ================================================= */}

          <section
            aria-label="Global Industry Edition business headlines"
            className="mb-12 border-b border-gray-300 pb-10"
          >
            <SectionHeader
              title={`${octEditionMeta.title} · ${octEditionMeta.edition} · ${octEditionMeta.date}`}
            />

            <p className="-mt-2 mb-5 text-[11px] leading-[1.5] text-gray-500">
              Business stories from the edition: the global economy and
              finance, corporate deals, and industry moves in automotive and
              aerospace.
            </p>

            <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {octCards.map((story) => (
                <Link key={story.id} to={story.path} className="group block">
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <span className="mt-3 block text-[11px] font-bold uppercase tracking-[0.12em] text-red-600">
                    {story.label}
                  </span>

                  <h3 className="mt-1.5 font-serif text-xl font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-600 md:text-[22px]">
                    {story.title}
                  </h3>

                  <p className="mt-1.5 text-[12px] leading-[1.55] text-gray-500 line-clamp-2">
                    {story.lede}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* =================================================
              NUMBERS AT A GLANCE
          ================================================= */}

          <section className="mb-12 border-b border-gray-300 pb-10">
            <SectionHeader title="Numbers at a Glance" />

            <p className="-mt-2 mb-5 text-[11px] leading-[1.5] text-gray-500">
              {octEditionMeta.edition} · {octEditionMeta.date}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {businessGlance.map((item) => (
                <div
                  key={item.indicator}
                  className="flex flex-col rounded-md border border-gray-200 p-4 transition-colors hover:border-gray-300"
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-red-600">
                    {item.indicator}
                  </span>

                  <span className="mt-1.5 font-serif text-xl font-bold leading-[1.2] text-gray-900">
                    {item.figure}
                  </span>

                  <span className="mt-auto pt-3 text-[9px] text-gray-400">
                    {item.source}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              GLOBAL CORPORATE NEWS DIGEST — EDITION 1: M&A
          ================================================= */}

          <section
            aria-label="Global Corporate News Digest Edition 1: Mergers and Acquisitions"
            className="mb-12 border-b border-gray-300 pb-10"
          >
            <SectionHeader
              title={`Global Corporate News Digest · ${maEdition1Meta.edition} · Headlines by Industry`}
              link="/mergers-acquisitions"
              linkText="M&A Hub"
            />

            <p className="-mt-2 mb-5 text-[11px] leading-[1.5] text-gray-500">
              {maEdition1Meta.subtitle}{" "}
              <span className="text-gray-400">
                {maEdition1Meta.prepared}. {maEdition1Meta.note}
              </span>
            </p>

            {maLead && (
              <Link
                to={maEdition1ArticlePath(maLead)}
                className="group relative block overflow-hidden rounded-lg border border-gray-200 min-h-[260px] bg-black"
              >
                <ImageWithFallback
                  src={maLead.image}
                  alt={maLead.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-red-500">
                    {maLead.section} · {maEdition1Meta.edition}
                  </span>

                  <h3 className="mt-2 max-w-3xl font-serif text-2xl sm:text-3xl font-bold leading-[1.15] text-white group-hover:underline">
                    {maLead.title}
                  </h3>

                  <p className="mt-2 max-w-3xl text-[12px] leading-[1.5] text-gray-300 line-clamp-2">
                    {maLead.lede}
                  </p>
                </div>
              </Link>
            )}

            <div className="mt-8 space-y-10">
              {maIndustries.map((group) => (
                <div key={group.name}>
                  <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gray-900">
                      {group.name}
                    </h3>

                    <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                      {group.stories.length} stories
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                    {group.stories.map((story) => {
                      const chip = maValueChip(story);

                      return (
                        <Link
                          key={story.id}
                          to={maEdition1ArticlePath(story)}
                          className="group block"
                        >
                          <div className="aspect-[16/10] w-full overflow-hidden rounded-md bg-gray-100">
                            <ImageWithFallback
                              src={story.image}
                              alt={story.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {chip && (
                            <span className="mt-3 block text-[11px] font-bold uppercase tracking-[0.12em] text-red-600">
                              {chip.value}
                            </span>
                          )}

                          <h4 className="mt-1.5 font-serif text-xl font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-600 md:text-[22px]">
                            {story.title}
                          </h4>

                          <p className="mt-1.5 text-[12px] leading-[1.55] text-gray-500 line-clamp-2">
                            {story.lede}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* DEAL STATUS TRACKER */}

            <details className="mt-6 rounded-md border border-gray-200">
              <summary className="cursor-pointer select-none px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-800">
                Deal status table (as of the early August 2026 tracker update)
              </summary>

              <div className="overflow-x-auto border-t border-gray-200">
                <table className="w-full min-w-[560px] text-left text-[11px]">
                  <thead className="bg-gray-50 text-[9px] uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-4 py-2 font-semibold">Deal</th>
                      <th className="px-4 py-2 font-semibold">Value</th>
                      <th className="px-4 py-2 font-semibold">Announced</th>
                      <th className="px-4 py-2 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {maEdition1DealTable.map((row) => (
                      <tr key={row.deal}>
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {row.deal}
                        </td>
                        <td className="px-4 py-2 text-gray-700">{row.value}</td>
                        <td className="px-4 py-2 text-gray-700">
                          {row.announced}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {row.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="border-t border-gray-200 px-4 py-3 text-[10px] leading-[1.5] text-gray-400">
                {maEdition1Sources}
              </p>
            </details>
          </section>

          <PrideTimesAd
            slot="5608262547"
            format="fluid"
            layoutKey="-ef+6k-30-ac+ty"
          />

          {/* =================================================
              ALL BUSINESS NEWS + MAGAZINE
          ================================================= */}

          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.8fr)] gap-7 mb-12">
            {/* LATEST NEWS (every business story) */}

            <div ref={newsListRef} className="scroll-mt-24 min-w-0">
              <SectionHeader title="All Business News" />

              {/* FILTER TABS */}

              <div className="flex items-center gap-5 overflow-x-auto no-scrollbar border-b border-gray-200 pb-3 mb-1">
                {latestNewsTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => selectTab(tab)}
                    className={`text-[10px] font-semibold whitespace-nowrap uppercase tracking-wide transition-colors ${
                      activeNewsTab === tab
                        ? "text-red-600"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                    <span className="ml-1 font-normal text-gray-300">
                      {tabCount(tab)}
                    </span>
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
                    to={story.path}
                    className="group grid grid-cols-[130px_1fr] sm:grid-cols-[280px_1fr] gap-4 sm:gap-6 py-6"
                  >
                    <div className="w-full h-[96px] sm:h-[185px] overflow-hidden rounded-md">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2">
                        <span className="text-[8px] font-bold text-red-600 uppercase tracking-[0.14em]">
                          {story.label}
                        </span>

                        {story.location && (
                          <>
                            <span className="text-[8px] text-gray-300">•</span>

                            <span className="inline-flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-gray-400">
                              <MapPin size={8} />
                              {story.location}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="font-serif text-base sm:text-2xl font-bold leading-[1.2] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                        {story.title}
                      </h3>

                      <p className="hidden sm:block text-[13px] text-gray-500 leading-[1.55] mt-2 line-clamp-3">
                        {story.lede}
                      </p>

                      <span className="flex items-center gap-1 text-[9px] text-gray-400 mt-1.5">
                        <Clock size={8} />
                        {story.when}
                        {story.readTime ? ` · ${story.readTime}` : ""}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div className="mt-5 flex flex-col items-center gap-2 border-t border-gray-200 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((count) =>
                        Math.min(count + PAGE_SIZE, filteredStories.length)
                      )
                    }
                    className="rounded-full border border-gray-300 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-800 transition-colors hover:border-red-600 hover:text-red-600"
                  >
                    Show more stories
                  </button>

                  <span className="text-[9px] text-gray-400">
                    Showing {latestStories.length} of {filteredStories.length}
                  </span>
                </div>
              )}
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
                    className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
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

          {/* =================================================
              EARNINGS + DEALS
          ================================================= */}

          <section className="mb-12">
            <SectionHeader title="The Numbers Behind the Headlines" />

            <div className="space-y-4">
              <details className="rounded-md border border-gray-200">
                <summary className="cursor-pointer select-none px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-800">
                  Corporate Earnings
                </summary>

                <div className="overflow-x-auto border-t border-gray-200">
                  <table className="w-full min-w-[560px] text-left text-[11px]">
                    <thead className="bg-gray-50 text-[9px] uppercase tracking-wide text-gray-500">
                      <tr>
                        <th className="px-4 py-2 font-semibold">Company</th>
                        <th className="px-4 py-2 text-right font-semibold">
                          EPS
                        </th>
                        <th className="px-4 py-2 text-right font-semibold">
                          vs Est.
                        </th>
                        <th className="px-4 py-2 text-right font-semibold">
                          Revenue
                        </th>
                        <th className="px-4 py-2 text-right font-semibold">
                          Result
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {earningsNews.map((e) => (
                        <tr key={e.ticker}>
                          <td className="px-4 py-2">
                            <span className="font-medium text-gray-900">
                              {e.company}
                            </span>
                            <span className="ml-1.5 text-gray-400">
                              ({e.ticker})
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right tabular-nums text-gray-700">
                            {e.eps}
                          </td>
                          <td
                            className={`px-4 py-2 text-right font-bold tabular-nums ${
                              e.status === "BEAT"
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {e.beat}
                          </td>
                          <td className="px-4 py-2 text-right tabular-nums text-gray-700">
                            {e.revenue}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <span
                              className={`inline-flex rounded-[2px] px-2 py-0.5 text-[10px] font-bold tracking-wide ${earningsBadge[e.status]}`}
                            >
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>

              <details className="rounded-md border border-gray-200">
                <summary className="cursor-pointer select-none px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-800">
                  Deals &amp; Capital
                </summary>

                <div className="overflow-x-auto border-t border-gray-200">
                  <table className="w-full min-w-[600px] text-left text-[11px]">
                    <thead className="bg-gray-50 text-[9px] uppercase tracking-wide text-gray-500">
                      <tr>
                        <th className="px-4 py-2 font-semibold">Acquirer</th>
                        <th className="px-4 py-2 font-semibold">Target</th>
                        <th className="px-4 py-2 text-right font-semibold">
                          Value
                        </th>
                        <th className="hidden px-4 py-2 font-semibold md:table-cell">
                          Sector
                        </th>
                        <th className="px-4 py-2 text-right font-semibold">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {maDeals.map((d) => (
                        <tr key={d.id}>
                          <td className="px-4 py-2 font-medium text-gray-900">
                            {d.acquirer}
                          </td>
                          <td className="px-4 py-2 text-gray-700">
                            {d.target}
                          </td>
                          <td className="px-4 py-2 text-right font-bold tabular-nums text-gray-900">
                            {d.value}
                          </td>
                          <td className="hidden px-4 py-2 text-gray-500 md:table-cell">
                            {d.sector}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <span
                              className={`inline-flex rounded-[2px] px-2 py-0.5 text-[10px] font-bold tracking-wide ${dealBadge[d.status]}`}
                            >
                              {d.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
          </section>

          <PrideTimesAd slot="6810700989" />
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

        ::selection {
          background: rgba(227, 27, 35, 0.12);
          color: inherit;
        }
      `}</style>
    </div>
  );
}

export default BusinessNewsPage;
