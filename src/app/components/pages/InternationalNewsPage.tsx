import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Clock,
  Globe2,
  MapPin,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getQuotes } from "../../../services/marketApi";

import MagazineImg from "../../../imports/pt30image.png";
import worldLeaders from "../../../imports/pt-world-leaders.png";
import globalMarkets from "../../../imports/pt-global-markets.png";
import digitalEconomy from "../../../imports/pt-digital-economy.png";
import supplyChainMap from "../../../imports/supply-chain-map.png";
import coverStory from "../../../imports/Coverstory.png";

import globalTradePortImg from "../../../imports/global-trade-port.jpg";
import tajMahalImg from "../../../imports/taj-mahal-india.jpg";
import euUsFlagsImg from "../../../imports/eu-us-trade-flags.jpg";
import shippingCostsImg from "../../../imports/shipping-costs-route.jpg";
import euParliamentImg from "../../../imports/eu-parliament-flags.jpg";
import europeIndustryImg from "../../../imports/europe-industry-clean.jpg";
import ukMobilityImg from "../../../imports/uk-youth-mobility.jpg";
import italyParliamentImg from "../../../imports/italy-parliament.jpg";
import aseanSupplyChainImg from "../../../imports/asean-supply-chain.jpg";

import { MarketSnapshot } from "../innovation/MarketSnapshot";

import {
  specialArticles,
  specialArticlePath,
} from "../../data/specialArticleData";
import {
  digestArticles,
  digestArticlePath,
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

/* One card shape for every international story, whichever data
   file it comes from, so the page can use the homepage layout. */
interface NewsCard {
  id: string;
  title: string;
  lede: string;
  image: string;
  /* Red kicker above the headline (region or desk). */
  label: string;
  /* Filter tab / region group the story belongs to. */
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
   International stories only:
   1. International Business (specialArticleData "international-*")
   2. Regional desks: Europe, Asia-Pacific, Americas, Middle East
      & Africa (specialArticleData "international-*")
   3. Regional Roundup from the Global Corporate News Digest
      (the section that links to /international-news)
   The technology-company stories that carry an "international-"
   id are not international news and are left out.
========================================================= */

const REGION_NAMES: Record<string, string> = {
  "INTERNATIONAL BUSINESS": "International Business",
  EUROPE: "Europe",
  "ASIA-PACIFIC": "Asia-Pacific",
  AMERICAS: "Americas",
  "MIDDLE EAST AND AFRICA": "Middle East and Africa",
};

const ROUNDUP_TAB = "Regional Roundup";

/* Stories without their own picture get a matching one. */
const fallbackPool = [
  worldLeaders,
  globalMarkets,
  digitalEconomy,
  supplyChainMap,
  coverStory,
];

const specialCards: NewsCard[] = specialArticles
  .filter(
    (a) =>
      a.id.startsWith("international-") &&
      a.category.toUpperCase() in REGION_NAMES
  )
  .map((a, index) => {
    const region = REGION_NAMES[a.category.toUpperCase()];

    return {
      id: a.id,
      title: a.title,
      lede: a.dek,
      image: a.image ?? fallbackPool[index % fallbackPool.length],
      label: region,
      tab: region,
      when: a.publishedAt,
      readTime: a.readTime,
      path: specialArticlePath(a.id),
    };
  });

const roundupCards: NewsCard[] = digestArticles
  .filter((a) => a.section === ROUNDUP_TAB)
  .map((a) => ({
    id: a.id,
    title: a.title,
    lede: a.lede,
    image: a.image,
    label: ROUNDUP_TAB,
    tab: ROUNDUP_TAB,
    location: a.location,
    when: a.publishedAt,
    readTime: a.readTime,
    path: digestArticlePath(a),
  }));

const allCards: NewsCard[] = Array.from(
  new Map(
    [...specialCards, ...roundupCards]
      .filter((card) => card.id)
      .map((card) => [card.id, card] as const)
  ).values()
);

/* =========================================================
   FRONT-PAGE PICKS (same structure as the homepage)
========================================================= */

const leadStory = allCards[0];
const majorStories = [allCards[1], allCards[2]];
const editorsPick = allCards[3];

const featuredIds = new Set(
  [leadStory, ...majorStories, editorsPick]
    .filter(Boolean)
    .map((card) => card.id)
);

const sidebarStories = allCards
  .filter((card) => !featuredIds.has(card.id))
  .slice(0, 6);

/* Region order for the filter tabs and the headline groups. */
const tabOrder = [
  "International Business",
  "Europe",
  "Asia-Pacific",
  "Americas",
  "Middle East and Africa",
  ROUNDUP_TAB,
];

const regionTabs = tabOrder.filter((tab) =>
  allCards.some((card) => card.tab === tab)
);

const latestNewsTabs = ["All", ...regionTabs];

const regionGroups = regionTabs.map((name) => ({
  name,
  stories: allCards.filter((card) => card.tab === name),
}));

const PAGE_SIZE = 8;

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

/* =========================================================
   INTERNATIONAL NEWS PAGE
========================================================= */

export function InternationalNewsPage() {
  const [activeMarketTab, setActiveMarketTab] =
    useState<"Indices" | "Crypto">("Indices");

  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const newsListRef = useRef<HTMLDivElement | null>(null);

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

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (!leadStory) {
    return (
      <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <Globe2 size={38} className="mx-auto mb-4 text-gray-400" />
          <h1 className="font-serif text-3xl font-bold">International News</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600">
            International stories are being updated. Please check back
            shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-4 md:pt-6 pb-16">
          {/* =================================================
              PAGE HEADER (PRIDE TIMES EDITORIAL BRANDING)
          ================================================= */}
          <header className="border-t-[3px] border-red-600 pt-4 mb-7 sm:mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold leading-tight tracking-normal text-gray-900">
                  International Business
                </h1>
                <p className="mt-1.5 text-[11px] md:text-[13px] text-gray-500 font-normal">
                  Global markets, trade, economies and policy shaping the world.
                </p>
              </div>

              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold pb-1">
                TRADE · ECONOMY · POLICY · MARKETS
              </div>
            </div>
          </header>

          {/* =================================================
              TOP STORIES / NEWSROOM THREE-COLUMN LAYOUT
          ================================================= */}
          <section className="pb-10 mb-10 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_1.42fr_1fr] gap-6 lg:gap-7 items-stretch">
              {/* =============================================
                  COLUMN 1: FEATURED INTERNATIONAL STORY
              ============================================= */}
              <div className="flex flex-col h-full min-h-[580px] lg:min-h-[660px]">
                <Link
                  to="/article/international-global-trade-asia-growth"
                  className="group relative flex flex-col justify-end overflow-hidden rounded-lg border border-gray-200/80 bg-black h-full"
                >
                  <ImageWithFallback
                    src={globalTradePortImg}
                    alt="Global Trade Realigns as Asia Leads the Next Growth Wave"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

                  <span className="absolute top-4 left-4 bg-red-600 text-white px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] uppercase rounded-none z-10">
                    INTERNATIONAL BUSINESS | GLOBAL TRADE
                  </span>

                  <div className="relative z-10 p-5 sm:p-6">
                    <h2 className="font-serif text-2xl sm:text-[26px] lg:text-[28px] xl:text-[30px] font-bold leading-[1.14] text-white group-hover:text-red-400 transition-colors">
                      Global Trade Realigns as Asia Leads the Next Growth Wave
                    </h2>

                    <p className="text-[12px] sm:text-[12.5px] text-gray-200 leading-[1.55] mt-2.5 line-clamp-3">
                      Manufacturing investment, stronger domestic demand and new trade alliances are shifting global growth momentum toward Asia.
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-wider mt-4 border-b border-white/60 pb-0.5 group-hover:border-white transition-colors">
                      READ FULL STORY →
                    </span>
                  </div>
                </Link>
              </div>

              {/* =============================================
                  COLUMN 2: MAIN COVERAGE + MARKET SNAPSHOT
              ============================================= */}
              <div className="flex flex-col justify-between min-w-0 lg:border-x lg:border-gray-200 lg:px-6">
                <div>
                  {/* SECTION HEADER */}
                  <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-gray-200">
                    <h2 className="text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
                      Top International Business Stories
                    </h2>

                    <Link
                      to="/world"
                      className="text-[9.5px] font-bold uppercase tracking-wider text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <span>View More</span>
                      <ArrowRight size={10} />
                    </Link>
                  </div>

                  {/* STORY 1 (TAJ MAHAL) */}
                  <Link
                    to="/article/international-india-third-largest-economy"
                    className="group flex gap-3.5 sm:gap-4 items-start"
                  >
                    <div className="w-[115px] sm:w-[130px] h-[82px] sm:h-[88px] shrink-0 overflow-hidden rounded-lg border border-gray-200/70 bg-gray-100">
                      <ImageWithFallback
                        src={tajMahalImg}
                        alt="India Overtakes Germany as World's 3rd Largest Economy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[9.5px] font-bold uppercase tracking-[0.14em] text-red-600">
                        ECONOMY | INDIA
                      </span>

                      <h3 className="font-serif text-[15px] sm:text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2 mt-0.5">
                        India Overtakes Germany as World's 3rd Largest Economy
                      </h3>

                      <p className="text-[11.5px] sm:text-[12px] text-gray-500 leading-[1.45] line-clamp-2 mt-1">
                        India's expanding domestic market and investment cycle are reshaping the global economic landscape.
                      </p>

                      <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                        <Clock size={9} />
                        7 October 2026 · 4 min read
                      </span>
                    </div>
                  </Link>

                  {/* DIVIDER */}
                  <div className="border-t border-gray-200/80 my-3" />

                  {/* STORY 2 (EU-US FLAGS) */}
                  <Link
                    to="/article/international-eu-us-digital-trade"
                    className="group flex gap-3.5 sm:gap-4 items-start"
                  >
                    <div className="w-[115px] sm:w-[130px] h-[82px] sm:h-[88px] shrink-0 overflow-hidden rounded-lg border border-gray-200/70 bg-gray-100">
                      <ImageWithFallback
                        src={euUsFlagsImg}
                        alt="EU-US Digital Trade Agreement Unlocks $800B in Annual Commerce"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[9.5px] font-bold uppercase tracking-[0.14em] text-red-600">
                        TRADE | EU-US
                      </span>

                      <h3 className="font-serif text-[15px] sm:text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2 mt-0.5">
                        EU-US Digital Trade Agreement Unlocks $800B in Annual Commerce
                      </h3>

                      <p className="text-[11.5px] sm:text-[12px] text-gray-500 leading-[1.45] line-clamp-2 mt-1">
                        New framework to reduce friction across technology, services and data flows.
                      </p>

                      <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                        <Clock size={9} />
                        7 October 2026 · 3 min read
                      </span>
                    </div>
                  </Link>

                  {/* DIVIDER */}
                  <div className="border-t border-gray-200/80 my-3" />

                  {/* STORY 3 (SHIPPING COSTS) */}
                  <Link
                    to="/article/international-shipping-costs-routes"
                    className="group flex gap-3.5 sm:gap-4 items-start"
                  >
                    <div className="w-[115px] sm:w-[130px] h-[82px] sm:h-[88px] shrink-0 overflow-hidden rounded-lg border border-gray-200/70 bg-gray-100">
                      <ImageWithFallback
                        src={shippingCostsImg}
                        alt="Shipping Costs Decline as Key Trade Routes Stabilize"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[9.5px] font-bold uppercase tracking-[0.14em] text-red-600">
                        SUPPLY CHAIN | GLOBAL
                      </span>

                      <h3 className="font-serif text-[15px] sm:text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2 mt-0.5">
                        Shipping Costs Decline as Key Trade Routes Stabilize
                      </h3>

                      <p className="text-[11.5px] sm:text-[12px] text-gray-500 leading-[1.45] line-clamp-2 mt-1">
                        Easing freight rates offer relief to global manufacturers after months of volatility.
                      </p>

                      <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                        <Clock size={9} />
                        7 October 2026 · 3 min read
                      </span>
                    </div>
                  </Link>
                </div>

                {/* ENHANCED MARKET SNAPSHOT */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <MarketSnapshot tabs={["Indices", "Commodities", "Currencies"]} />
                </div>
              </div>

              {/* =============================================
                  COLUMN 3: EDITOR'S PICK + LATEST NEWS
              ============================================= */}
              <aside className="min-w-0 flex flex-col justify-between">
                {/* EDITOR'S PICK */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200">
                    <h2 className="font-serif text-[16px] sm:text-[17px] font-bold text-gray-950">
                      Editor's Pick
                    </h2>

                    <Link
                      to="/world"
                      className="text-[9.5px] font-bold uppercase tracking-wider text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <span>Explore More</span>
                      <ArrowRight size={10} />
                    </Link>
                  </div>

                  <Link
                    to="/article/international-europe-fiscal-buffer"
                    className="group block"
                  >
                    <div className="w-full h-[160px] sm:h-[172px] overflow-hidden rounded-lg border border-gray-200/70 bg-gray-100">
                      <ImageWithFallback
                        src={euParliamentImg}
                        alt="EU finance ministers agree on joint fiscal buffer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <span className="block text-[9px] sm:text-[9.5px] font-bold text-red-600 uppercase tracking-[0.14em] mt-2.5">
                      EUROPE
                    </span>

                    <h3 className="font-serif text-[14px] sm:text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:text-red-600 transition-colors mt-1">
                      EU finance ministers agree on joint fiscal buffer to shield eurozone from future energy-price shocks.
                    </h3>

                    <p className="mt-1 text-[11px] sm:text-[11.5px] leading-[1.45] text-gray-500 line-clamp-3">
                      The mechanism aims to reduce the impact of future energy-price volatility and strengthen economic resilience across the bloc.
                    </p>

                    <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-1.5">
                      <Clock size={9} />
                      7 October 2026 · 3 min read
                    </span>
                  </Link>
                </div>

                {/* LATEST NEWS */}
                <div className="mt-4 pt-3.5 border-t border-gray-200">
                  <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b border-gray-200">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                      Latest News
                    </h2>

                    <Link
                      to="/all-news"
                      className="text-[9px] font-bold uppercase tracking-wider text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <span>View All</span>
                      <ArrowRight size={9} />
                    </Link>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {/* ITEM 1 */}
                    <Link
                      to="/article/international-france-germany-industrial-policy"
                      className="group flex gap-2.5 py-2.5 first:pt-1 last:pb-0 items-start"
                    >
                      <div className="w-[60px] h-[60px] shrink-0 overflow-hidden rounded-lg border border-gray-200/70 bg-gray-100">
                        <ImageWithFallback
                          src={europeIndustryImg}
                          alt="France and Germany industrial policy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="block text-[8.5px] font-bold text-red-600 uppercase tracking-wide">
                          EUROPE
                        </span>

                        <h4 className="text-[11px] sm:text-[11.5px] font-semibold leading-[1.3] text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mt-0.5">
                          France and Germany unveil joint industrial policy to counter Chinese overcapacity.
                        </h4>

                        <span className="block text-[9.5px] text-gray-400 mt-1">
                          7 October 2026 · 3 min read
                        </span>
                      </div>
                    </Link>

                    {/* ITEM 2 */}
                    <Link
                      to="/article/international-uk-eu-youth-mobility"
                      className="group flex gap-2.5 py-2.5 last:pb-0 items-start"
                    >
                      <div className="w-[60px] h-[60px] shrink-0 overflow-hidden rounded-lg border border-gray-200/70 bg-gray-100">
                        <ImageWithFallback
                          src={ukMobilityImg}
                          alt="UK-EU youth mobility scheme"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="block text-[8.5px] font-bold text-red-600 uppercase tracking-wide">
                          UK & EUROPE
                        </span>

                        <h4 className="text-[11px] sm:text-[11.5px] font-semibold leading-[1.3] text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mt-0.5">
                          UK-EU youth mobility scheme enters final negotiation stage.
                        </h4>

                        <span className="block text-[9.5px] text-gray-400 mt-1">
                          7 October 2026 · 3 min read
                        </span>
                      </div>
                    </Link>

                    {/* ITEM 3 */}
                    <Link
                      to="/article/international-italy-no-confidence"
                      className="group flex gap-2.5 py-2.5 last:pb-0 items-start"
                    >
                      <div className="w-[60px] h-[60px] shrink-0 overflow-hidden rounded-lg border border-gray-200/70 bg-gray-100">
                        <ImageWithFallback
                          src={italyParliamentImg}
                          alt="Italy government survives vote"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="block text-[8.5px] font-bold text-red-600 uppercase tracking-wide">
                          ITALY
                        </span>

                        <h4 className="text-[11px] sm:text-[11.5px] font-semibold leading-[1.3] text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mt-0.5">
                          Italy's government survives no-confidence vote.
                        </h4>

                        <span className="block text-[9.5px] text-gray-400 mt-1">
                          7 October 2026 · 2 min read
                        </span>
                      </div>
                    </Link>

                    {/* ITEM 4 */}
                    <Link
                      to="/article/international-asean-supply-chain-pact"
                      className="group flex gap-2.5 py-2.5 last:pb-0 items-start"
                    >
                      <div className="w-[60px] h-[60px] shrink-0 overflow-hidden rounded-lg border border-gray-200/70 bg-gray-100">
                        <ImageWithFallback
                          src={aseanSupplyChainImg}
                          alt="ASEAN supply-chain resilience pact"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="block text-[8.5px] font-bold text-red-600 uppercase tracking-wide">
                          ASIA-PACIFIC
                        </span>

                        <h4 className="text-[11px] sm:text-[11.5px] font-semibold leading-[1.3] text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mt-0.5">
                          ASEAN bloc finalizes regional supply-chain resilience pact.
                        </h4>

                        <span className="block text-[9.5px] text-gray-400 mt-1">
                          7 October 2026 · 3 min read
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <PrideTimesAd slot="8042854193" format="fluid" layout="in-article" />

          {/* =================================================
              HEADLINES BY REGION
          ================================================= */}

          <section
            aria-label="International headlines by region"
            className="mb-12 border-b border-gray-300 pb-10"
          >
            <SectionHeader title="International Headlines by Region" />

            <div className="space-y-10">
              {regionGroups.map((group) => (
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
                    {group.stories.map((story) => (
                      <Link
                        key={story.id}
                        to={story.path}
                        className="group block"
                      >
                        <div className="aspect-[16/10] w-full overflow-hidden rounded-md bg-gray-100">
                          <ImageWithFallback
                            src={story.image}
                            alt={story.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <span className="mt-3 block text-[11px] font-bold uppercase tracking-[0.12em] text-red-600">
                          {story.location ?? story.label}
                        </span>

                        <h4 className="mt-1.5 font-serif text-xl font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-600 md:text-[22px]">
                          {story.title}
                        </h4>

                        <p className="mt-1.5 text-[12px] leading-[1.55] text-gray-500 line-clamp-2">
                          {story.lede}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <PrideTimesAd
            slot="5608262547"
            format="fluid"
            layoutKey="-ef+6k-30-ac+ty"
          />

          {/* =================================================
              ALL INTERNATIONAL NEWS + MAGAZINE
          ================================================= */}

          <section className="grid grid-cols-1 lg:grid-cols-[1.7fr_0.8fr] gap-7 mb-12">
            {/* LATEST NEWS (every international story) */}

            <div ref={newsListRef} className="scroll-mt-24">
              <SectionHeader title="All International News" />

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

export default InternationalNewsPage;
