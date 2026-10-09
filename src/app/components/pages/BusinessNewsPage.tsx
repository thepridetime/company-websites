import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Clock,
  MapPin,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getQuotes } from "../../../services/marketApi";

import MagazineImg from "../../../imports/pt30image.png";
import businessStockDrop from "../../../imports/business-stock-drop.png";
import businessAviationJet from "../../../imports/business-aviation-jet.png";
import businessJioDigital from "../../../imports/business-jio-digital.png";
import businessGoldmanNyse from "../../../imports/business-goldman-nyse.png";
import energyTanks from "../../../imports/energy-tanks.png";
import warehouseRobotics from "../../../imports/warehouse-robotics.png";
import dataCentre from "../../../imports/data-centre.png";
import supplyChainMap from "../../../imports/supply-chain-map.png";

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
  octBusinessArticles,
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
   3. Global Corporate News Digest, September 2026 (all sections)
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

const octCards: NewsCard[] = octBusinessArticles.map((a) => ({
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

const digestCards: NewsCard[] = digestArticles.map((a) => ({
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
const editorsPick = octCards[3] ?? allCards[3];

const featuredIds = new Set(
  [leadStory, ...majorStories, editorsPick].map((card) => card.id)
);

const sidebarStories = allCards
  .filter((card) => !featuredIds.has(card.id))
  .slice(0, 6);

/* Filter tabs: department order from the digest first, then any
   other tab that appears in the data. */
const tabOrder = [
  ...digestSections.map((section) => section.name),
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

/* =========================================================
   BUSINESS NEWS PAGE
========================================================= */

export function BusinessNewsPage() {
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

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-4 md:pt-6 pb-16">
          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-gray-300 pb-4">
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                The Pride Times
              </span>

              <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
                Business News
              </h1>

              <p className="mt-1.5 max-w-2xl text-[12px] leading-[1.6] text-gray-500">
                Corporate strategy, earnings, deals, the startup economy and
                the decisions shaping companies and markets around the world.
              </p>
            </div>

            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">
              <TrendingUp size={11} />
              Business Desk · {allCards.length} stories
            </span>
          </div>

          <PrideTimesAd slot="5373718974" />

          {/* =================================================
              TOP STORIES / NEWSROOM LEAD
          ================================================= */}

          <section className="pb-8 mb-8 border-b border-gray-300">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr_0.85fr] gap-5 lg:gap-6">
              {/* LEAD STORY */}

              <Link
                to={leadStory.path}
                className="group relative block overflow-hidden rounded-lg border border-gray-200 min-h-[430px] lg:min-h-[500px] bg-black"
              >
                <ImageWithFallback
                  src={leadStory.image}
                  alt={leadStory.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[9px] font-bold tracking-[0.16em] uppercase rounded-[2px]">
                  {leadStory.label}
                  {leadStory.location ? ` | ${leadStory.location}` : ""}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h2 className="font-serif text-2xl md:text-[30px] lg:text-[34px] font-bold leading-[1.08] text-white">
                    {leadStory.title}
                  </h2>

                  <p className="text-[12px] md:text-[13px] text-gray-200 leading-[1.6] mt-3 line-clamp-3">
                    {leadStory.lede}
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
                    {majorStories[0].label}
                    {majorStories[0].location
                      ? ` | ${majorStories[0].location}`
                      : ""}
                  </span>

                  <Link to={majorStories[0].path} className="group block">
                    <div className="overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={majorStories[0].image}
                        alt={majorStories[0].title}
                        className="w-full h-[220px] md:h-[250px] object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <h2 className="font-serif text-xl md:text-2xl font-bold leading-[1.15] mt-3 text-gray-950 group-hover:text-red-600 transition-colors">
                      {majorStories[0].title}
                    </h2>

                    <p className="text-[12px] text-gray-600 mt-2 leading-[1.6] line-clamp-3">
                      {majorStories[0].lede}
                    </p>
                  </Link>
                </div>

                {/* SECOND MAJOR STORY */}

                <Link
                  to={majorStories[1].path}
                  className="group flex gap-3 pt-4 border-t border-gray-200"
                >
                  <div className="shrink-0 w-[105px] h-[75px] overflow-hidden rounded-md">
                    <ImageWithFallback
                      src={majorStories[1].image}
                      alt={majorStories[1].title}
                      className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold text-red-600 uppercase tracking-[0.14em]">
                      {majorStories[1].label}
                    </span>

                    <h3 className="text-[13px] font-bold leading-[1.35] mt-1 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                      {majorStories[1].title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-[1.45] text-gray-500 line-clamp-2">
                      {majorStories[1].lede}
                    </p>

                    <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-2">
                      <Clock size={9} />
                      {majorStories[1].when}
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

              {/* RIGHT NEWSROOM COLUMN */}

              <aside className="min-w-0">
                {/* EDITOR'S PICK */}

                <div className="pb-5 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-serif text-lg font-bold">
                      Editor's Pick
                    </h2>

                    <Link
                      to="/markets"
                      className="border border-gray-300 rounded-full px-3 py-1 text-[9px] font-medium hover:border-gray-500 transition-colors"
                    >
                      Explore More
                    </Link>
                  </div>

                  <Link to={editorsPick.path} className="group block">
                    <div className="relative overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={editorsPick.image}
                        alt={editorsPick.title}
                        className="w-full h-[175px] object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <span className="block text-[9px] font-bold text-red-600 uppercase tracking-[0.14em] mt-2.5">
                      {editorsPick.label}
                    </span>

                    <h3 className="text-[13px] font-semibold leading-[1.4] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                      {editorsPick.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-[1.5] text-gray-500 line-clamp-3">
                      {editorsPick.lede}
                    </p>
                  </Link>
                </div>

                {/* LATEST NEWS STREAM (sidebar headlines) */}

                <div className="pt-5">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-1">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                      Latest News
                    </h2>

                    <span className="text-[8px] uppercase tracking-wide text-gray-400">
                      Business Desk
                    </span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {sidebarStories.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="group block py-3"
                      >
                        <div className="flex gap-3">
                          <span className="shrink-0 text-[9px] font-semibold text-red-600 w-[58px] truncate">
                            {item.location ?? item.label}
                          </span>

                          <div className="min-w-0">
                            <span className="block text-[11px] font-medium leading-[1.4] text-gray-800 group-hover:text-red-600 transition-colors">
                              {item.title}
                            </span>

                            <span className="mt-1 block text-[10px] leading-[1.45] text-gray-500 line-clamp-2">
                              {item.lede}
                            </span>
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
              {octEditionMeta.subtitle}
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
              {octEditionGlance.map((item) => (
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

          <section className="grid grid-cols-1 lg:grid-cols-[1.7fr_0.8fr] gap-7 mb-12">
            {/* LATEST NEWS (every business story) */}

            <div ref={newsListRef} className="scroll-mt-24">
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
