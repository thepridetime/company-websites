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
  "MIDDLE EAST & AFRICA": "Middle East & Africa",
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
  "Middle East & Africa",
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
              PAGE TITLE
          ================================================= */}

          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-gray-300 pb-4">
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                The Pride Times
              </span>

              <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
                International News
              </h1>

              <p className="mt-1.5 max-w-2xl text-[12px] leading-[1.6] text-gray-500">
                Global developments, diplomacy, trade and the events shaping
                economies in Europe, Asia-Pacific, the Americas, the Middle
                East and Africa.
              </p>
            </div>

            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">
              <Globe2 size={11} />
              Global Desk · {allCards.length} stories
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
                {majorStories[0] && (
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
                )}

                {/* SECOND MAJOR STORY */}

                {majorStories[1] && (
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
                )}

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

                {editorsPick && (
                  <div className="pb-5 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-serif text-lg font-bold">
                        Editor's Pick
                      </h2>

                      <Link
                        to="/world"
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
                )}

                {/* LATEST NEWS STREAM (sidebar headlines) */}

                <div className="pt-5">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-1">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                      Latest News
                    </h2>

                    <span className="text-[8px] uppercase tracking-wide text-gray-400">
                      Global Desk
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
