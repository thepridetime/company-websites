import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  ArrowRight,
  Clock,
  TrendingDown,
  TrendingUp,
  MapPin,
  ChevronRight,
} from "lucide-react";

import MagazineImg from "../../../imports/pt30image.png";

import GlobalMarketsImg from "../../../imports/pt-global-markets.png";
import EnergyRefineryImg from "../../../imports/pt-energy-refinery.png";
import DigitalEconomyImg from "../../../imports/pt-digital-economy.png";
import WorldLeadersImg from "../../../imports/pt-world-leaders.png";

import { getQuotes } from "../../../services/marketApi";

import {
  digestArticles,
  digestArticlePath,
  digestSections,
  regionalSnapshot,
  type DigestArticle,
} from "../../data/digestArticleData";

import {
  maEdition1Articles,
  maEdition1Meta,
  maEdition1DealTable,
  maEdition1Sources,
  maEdition1ArticlePath,
  maEdition1IndustryOrder,
  type EditionArticle,
} from "../../data/maEdition1Data";

import {
  globalSectorItems,
  globalSectorArticleId,
} from "../../data/globalSectorReportData";

import { globalSectorMoreNews } from "../../data/globalSectorMoreNewsData";

import {
  octEditionArticles,
  octEditionMeta,
  octEditionGlance,
  type OctEditionArticle,
} from "../../data/octEditionData";

/* =========================================================
   TYPES
========================================================= */

type MarketItem = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

/* =========================================================
   NEW HOMEPAGE IMAGE SYSTEM

   These images are used only for the editorial homepage lead.
   Existing article data, routes and article images remain intact.
========================================================= */

const homepageImages = {
  markets: GlobalMarketsImg,
  energy: EnergyRefineryImg,
  technology: DigitalEconomyImg,
  world: WorldLeadersImg,
};

/* =========================================================
   NEWSROOM STORIES
========================================================= */

const newsroomStories: OctEditionArticle[] = octEditionArticles;

const leadStory = newsroomStories[0];
const majorStory = newsroomStories[1];
const secondStory = newsroomStories[2];
const editorsPick = newsroomStories[3];

const sidebarStories = newsroomStories.slice(4, 10);

/*
 * Homepage-specific image mapping.
 *
 * This changes the visual presentation without changing the
 * underlying article data.
 */
const leadImage = homepageImages.markets;
const majorImage = homepageImages.energy;
const secondImage = homepageImages.technology;
const editorsPickImage = homepageImages.world;

/* =========================================================
   LATEST NEWS
========================================================= */

const sectionNames = digestSections.map((section) => section.name);

const latestNewsTabs = ["All", ...sectionNames];

const interleavedArticles: DigestArticle[] = (() => {
  const bySection = [
    ...digestSections.map((section) =>
      digestArticles.filter(
        (article) => article.sectionNumber === section.number
      )
    ),

    ...maEdition1IndustryOrder.map((name) =>
      maEdition1Articles.filter((article) => article.industry === name)
    ),

    maEdition1Articles.filter(
      (article) => !maEdition1IndustryOrder.includes(article.industry)
    ),
  ];

  const rounds = Math.max(...bySection.map((list) => list.length));

  const result: DigestArticle[] = [...octEditionArticles];

  for (let round = 0; round < rounds; round += 1) {
    bySection.forEach((list) => {
      if (list[round]) {
        result.push(list[round]);
      }
    });
  }

  return result;
})();

const PAGE_SIZE = octEditionArticles.length;

/* =========================================================
   EDITION 1 — M&A
========================================================= */

const editionBy = (
  prefix: string
): EditionArticle | undefined =>
  maEdition1Articles.find((article) =>
    article.title.startsWith(prefix)
  );

const editionLead = maEdition1Articles[0];

const editionIndustries = maEdition1IndustryOrder
  .map((name) => ({
    name,
    stories: maEdition1Articles.filter(
      (article) => article.industry === name
    ),
  }))
  .filter((group) => group.stories.length > 0);

const allSectionStories: DigestArticle[] = [
  ...maEdition1Articles,
  ...digestArticles,
];

const sectionHeadlines = new Map<number, DigestArticle>(
  digestSections
    .map((section) => {
      const story =
        section.number === 4
          ? editionBy("Paramount") ??
            allSectionStories.find(
              (a) => a.sectionNumber === 4
            )
          : allSectionStories.find(
              (a) => a.sectionNumber === section.number
            );

      return story
        ? ([section.number, story] as const)
        : null;
    })
    .filter(
      (
        entry
      ): entry is readonly [number, DigestArticle] =>
        Boolean(entry)
    )
);

const sectionStoryCounts = new Map<number, number>(
  digestSections.map((section) => [
    section.number,
    allSectionStories.filter(
      (a) => a.sectionNumber === section.number
    ).length,
  ])
);

function editionDealChip(article: EditionArticle) {
  return article.keyFacts.find((fact) =>
    [
      "Enterprise value",
      "Combined enterprise value",
      "Value",
    ].includes(fact.label)
  );
}

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
  {
    rank: 1,
    name: "Jensen Huang",
    company: "Nvidia",
    sector:
      "AI infrastructure, accelerated computing and robotics — areas central to Nvidia's technology strategy.",
  },
  {
    rank: 2,
    name: "Satya Nadella",
    company: "Microsoft",
    sector:
      "Enterprise AI adoption and large-scale digital transformation across Microsoft's business ecosystem.",
  },
  {
    rank: 3,
    name: "Sundar Pichai",
    company: "Alphabet / Google",
    sector:
      "AI integration across search, cloud and emerging technology businesses at Alphabet.",
  },
  {
    rank: 4,
    name: "Elon Musk",
    company: "Tesla / SpaceX / X",
    sector:
      "Technology initiatives spanning energy, space, transportation and AI across Musk's companies.",
  },
  {
    rank: 5,
    name: "Sam Altman",
    company: "OpenAI",
    sector:
      "Development and deployment of frontier artificial intelligence through OpenAI's research and products.",
  },
  {
    rank: 6,
    name: "Andy Jassy",
    company: "Amazon",
    sector:
      "AWS and cloud infrastructure supporting the next generation of AI workloads.",
  },
  {
    rank: 7,
    name: "Lisa Su",
    company: "AMD",
    sector:
      "Competitive AI computing across CPUs and GPUs as AMD expands its role in the market.",
  },
  {
    rank: 8,
    name: "C.C. Wei",
    company: "TSMC",
    sector:
      "Advanced semiconductor manufacturing serving the global technology industry through TSMC.",
  },
  {
    rank: 9,
    name: "Alex Karp",
    company: "Palantir",
    sector:
      "Enterprise AI and data platforms serving commercial and government markets through Palantir.",
  },
  {
    rank: 10,
    name: "Mary Barra",
    company: "General Motors",
    sector:
      "Automotive transformation through electrification and technology at General Motors.",
  },
];

/* =========================================================
   CHANGE CHIP
========================================================= */

function ChangeChip({
  change,
  up,
}: {
  change: string;
  up: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold tabular-nums ${
        up ? "text-emerald-600" : "text-red-600"
      }`}
    >
      {up ? (
        <TrendingUp size={10} strokeWidth={2.4} />
      ) : (
        <TrendingDown size={10} strokeWidth={2.4} />
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
    <div className="mb-5 flex items-end justify-between border-b border-black pb-2.5">
      <h2 className="font-sans text-[12px] font-black uppercase tracking-[0.18em] text-black">
        {title}
      </h2>

      {link && (
        <Link
          to={link}
          className="group inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] text-red-600"
        >
          {linkText}

          <ArrowRight
            size={10}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}

/* =========================================================
   EDITORIAL STORY CARD
========================================================= */

function SmallStory({
  story,
  image,
  category,
}: {
  story: OctEditionArticle;
  image: string;
  category?: string;
}) {
  return (
    <Link
      to={digestArticlePath(story)}
      className="group block"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={image}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        <span className="absolute bottom-0 left-0 bg-black px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white">
          {category || story.industry}
        </span>
      </div>

      <h3 className="mt-2 font-serif text-[18px] font-bold leading-[1.15] text-gray-950 transition-colors group-hover:text-red-600">
        {story.title}
      </h3>

      <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.5] text-gray-500">
        {story.lede}
      </p>
    </Link>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export function HomePage() {
  const [activeMarketTab, setActiveMarketTab] =
    useState<"Indices" | "Crypto">("Indices");

  const [activeNewsTab, setActiveNewsTab] =
    useState("All");

  const [visibleCount, setVisibleCount] =
    useState(PAGE_SIZE);

  const [showOlder, setShowOlder] =
    useState(false);

  const newsListRef =
    useRef<HTMLDivElement | null>(null);

  const [marketSnapshotData, setMarketSnapshotData] =
    useState<Record<string, MarketItem[]>>({
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
        ? interleavedArticles
        : [
            ...octEditionArticles,
            ...maEdition1Articles,
            ...digestArticles,
          ].filter(
            (article) =>
              article.section === activeNewsTab
          ),
    [activeNewsTab]
  );

  const latestStories =
    activeNewsTab === "All"
      ? filteredStories.slice(0, visibleCount)
      : filteredStories;

  const hasMore =
    activeNewsTab === "All" &&
    visibleCount < filteredStories.length;

  const selectTab = (tab: string) => {
    setActiveNewsTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  const openSectionFeed = (sectionName: string) => {
    selectTab(sectionName);

    window.requestAnimationFrame(() => {
      newsListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-950 antialiased">

      {/* =====================================================
          MARKET TICKER
      ===================================================== */}

      <div className="border-y border-gray-200 bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[38px] items-center gap-4 overflow-x-auto no-scrollbar">

            <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.18em] text-red-600">
              Markets
            </span>

            {(marketSnapshotData.Indices || [])
              .slice(0, 5)
              .map((market) => (
                <div
                  key={market.symbol}
                  className="flex shrink-0 items-center gap-2 border-l border-gray-200 pl-4"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wide text-gray-700">
                    {market.symbol}
                  </span>

                  <span className="text-[10px] font-bold tabular-nums text-black">
                    {market.value}
                  </span>

                  <ChangeChip
                    change={market.change}
                    up={market.up}
                  />
                </div>
              ))}

            <Link
              to="/markets"
              className="ml-auto flex shrink-0 items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] text-gray-500 hover:text-red-600"
            >
              Full Markets
              <ChevronRight size={10} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        <main className="pb-16 pt-6">

          {/* =================================================
              MAIN EDITORIAL HERO
          ================================================= */}

          <section className="mb-10">

            {/* Section label */}

            <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-2">
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.22em] text-red-600">
                  Global Industry Edition
                </span>

                <span className="ml-2 text-[9px] font-medium uppercase tracking-[0.12em] text-gray-400">
                  {octEditionMeta.date}
                </span>
              </div>

              <span className="hidden text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 sm:block">
                The Pride Times Newsroom
              </span>
            </div>

            {/* HERO GRID */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)]">

              {/* MAIN LEAD */}

              <Link
                to={digestArticlePath(leadStory)}
                className="group block"
              >
                <div className="relative aspect-[16/8.4] overflow-hidden bg-gray-100">

                  <ImageWithFallback
                    src={leadImage}
                    alt={leadStory.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 pt-24 sm:p-7 sm:pt-32">

                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="bg-red-600 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-white">
                        {leadStory.industry}
                      </span>

                      <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/80">
                        {leadStory.location}
                      </span>
                    </div>

                    <h1 className="max-w-4xl font-serif text-[30px] font-black leading-[1.02] text-white sm:text-[38px] lg:text-[46px]">
                      {leadStory.title}
                    </h1>

                    <p className="mt-3 max-w-3xl text-[12px] leading-[1.55] text-white/85 sm:text-[13px]">
                      {leadStory.lede}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-white">
                      Read Full Story
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>

              {/* RIGHT EDITORIAL COLUMN */}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">

                <SmallStory
                  story={majorStory}
                  image={majorImage}
                  category="Energy"
                />

                <SmallStory
                  story={secondStory}
                  image={secondImage}
                  category="Technology"
                />

              </div>
            </div>

            {/* =================================================
                NEWS BELOW MAIN IMAGE
                This directly fills the space that looked empty.
            ================================================= */}

            <div className="mt-6 border-y border-gray-200 py-5">

              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
                  World Brief
                </h2>

                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400">
                  Across markets · technology · geopolitics
                </span>
              </div>

              <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

                {[
                  {
                    story: editorsPick,
                    image: editorsPickImage,
                    label: "World",
                  },
                  {
                    story: sidebarStories[0],
                    image: homepageImages.energy,
                    label: "Energy",
                  },
                  {
                    story: sidebarStories[1],
                    image: homepageImages.technology,
                    label: "Technology",
                  },
                  {
                    story: sidebarStories[2],
                    image: homepageImages.world,
                    label: "Geopolitics",
                  },
                ].map((item, index) => (
                  <Link
                    key={`${item.story.id}-${index}`}
                    to={digestArticlePath(item.story)}
                    className="group flex gap-3 px-0 py-4 sm:px-4 sm:py-0 first:sm:pl-0 last:sm:pr-0"
                  >
                    <div className="h-[62px] w-[86px] shrink-0 overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.story.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[8px] font-black uppercase tracking-[0.14em] text-red-600">
                        {item.label}
                      </span>

                      <h3 className="mt-1 line-clamp-3 text-[11px] font-bold leading-[1.3] text-gray-900 transition-colors group-hover:text-red-600">
                        {item.story.title}
                      </h3>
                    </div>
                  </Link>
                ))}

              </div>
            </div>

          </section>

          {/* =================================================
              THREE COLUMN INFORMATION STRIP
          ================================================= */}

          <section className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.8fr_0.8fr]">

            {/* MARKET SNAPSHOT */}

            <div>
              <SectionHeader
                title="Market Snapshot"
                link="/markets"
                linkText="View Markets"
              />

              <div className="border-t border-gray-200">

                <div className="flex items-center gap-5 border-b border-gray-200 py-3">

                  {(["Indices", "Crypto"] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() =>
                          setActiveMarketTab(tab)
                        }
                        className={`text-[9px] font-black uppercase tracking-[0.14em] transition-colors ${
                          activeMarketTab === tab
                            ? "text-red-600"
                            : "text-gray-400 hover:text-black"
                        }`}
                      >
                        {tab}
                      </button>
                    )
                  )}

                </div>

                <div className="divide-y divide-gray-100">

                  {(marketSnapshotData[
                    activeMarketTab
                  ] || [])
                    .slice(0, 5)
                    .map((market) => (
                      <div
                        key={market.symbol}
                        className="flex items-center justify-between py-3"
                      >
                        <span className="text-[10px] font-bold text-gray-800">
                          {market.symbol}
                        </span>

                        <div className="flex items-center gap-5">
                          <span className="text-[10px] font-medium tabular-nums text-gray-500">
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

              </div>
            </div>

            {/* NUMBERS AT A GLANCE */}

            <div className="border-l-0 border-gray-200 lg:border-l lg:pl-7">

              <SectionHeader title="Numbers at a Glance" />

              <div className="mb-3">
                <span className="text-[9px] font-medium text-gray-400">
                  {octEditionMeta.edition} ·{" "}
                  {octEditionMeta.date}
                </span>
              </div>

              <div className="divide-y divide-gray-100">

                {octEditionGlance
                  .slice(0, 5)
                  .map((item) => (
                    <div
                      key={item.indicator}
                      className="py-2.5"
                    >
                      <span className="block text-[8px] font-black uppercase tracking-[0.1em] text-gray-500">
                        {item.indicator}
                      </span>

                      <span className="mt-0.5 block font-serif text-[18px] font-black leading-none text-black">
                        {item.figure}
                      </span>

                      <span className="mt-1 block text-[8px] text-gray-400">
                        {item.source}
                      </span>
                    </div>
                  ))}

              </div>
            </div>

            {/* EDITOR'S PICK */}

            <div className="border-l-0 border-gray-200 lg:border-l lg:pl-7">

              <SectionHeader
                title="Editor's Pick"
                link={editorsPick.sectionPath}
                linkText="Explore"
              />

              <Link
                to={digestArticlePath(editorsPick)}
                className="group block"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={editorsPickImage}
                    alt={editorsPick.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <span className="mt-2.5 block text-[8px] font-black uppercase tracking-[0.14em] text-red-600">
                  {editorsPick.industry}
                </span>

                <h3 className="mt-1 font-serif text-[18px] font-bold leading-[1.15] text-gray-900 transition-colors group-hover:text-red-600">
                  {editorsPick.title}
                </h3>

                <p className="mt-1.5 line-clamp-3 text-[11px] leading-[1.5] text-gray-500">
                  {editorsPick.lede}
                </p>
              </Link>

            </div>

          </section>

          {/* =================================================
              LATEST NEWS
          ================================================= */}

          <section
            ref={newsListRef}
            className="mb-14 scroll-mt-24"
          >

            <SectionHeader
              title="Latest News"
              link="/business-news"
              linkText="View All News"
            />

            {/* FILTER TABS */}

            <div className="mb-2 flex items-center gap-6 overflow-x-auto border-b border-gray-200 pb-3 no-scrollbar">

              {latestNewsTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => selectTab(tab)}
                  className={`shrink-0 text-[9px] font-black uppercase tracking-[0.13em] transition-colors ${
                    activeNewsTab === tab
                      ? "text-red-600"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}

            </div>

            {/* STORY LIST */}

            <div className="divide-y divide-gray-200">

              {latestStories.length === 0 && (
                <p className="py-8 text-[11px] text-gray-400">
                  No stories in this category yet.
                </p>
              )}

              {latestStories.map((story) => (
                <Link
                  key={story.id}
                  to={digestArticlePath(story)}
                  className="group grid grid-cols-[110px_1fr] gap-4 py-5 sm:grid-cols-[260px_1fr] sm:gap-6 lg:grid-cols-[300px_1fr]"
                >

                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">

                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />

                  </div>

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-x-2">

                      <span className="text-[8px] font-black uppercase tracking-[0.14em] text-red-600">
                        {"industry" in story
                          ? (story as EditionArticle)
                              .industry
                          : story.section}
                      </span>

                      <span className="text-[8px] text-gray-300">
                        •
                      </span>

                      <span className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.12em] text-gray-400">
                        <MapPin size={8} />
                        {story.location}
                      </span>

                    </div>

                    <h3 className="mt-1.5 font-serif text-[19px] font-black leading-[1.15] text-gray-950 transition-colors group-hover:text-red-600 sm:text-[23px]">
                      {story.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 hidden text-[12px] leading-[1.55] text-gray-500 sm:block">
                      {story.lede}
                    </p>

                    <span className="mt-2 flex items-center gap-1 text-[8px] font-medium uppercase tracking-wide text-gray-400">
                      <Clock size={8} />
                      {story.publishedAt} ·{" "}
                      {story.readTime}
                    </span>

                  </div>

                </Link>
              ))}

            </div>

            {hasMore && (
              <div className="mt-6 flex flex-col items-center gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) =>
                      Math.min(
                        count + PAGE_SIZE,
                        filteredStories.length
                      )
                    )
                  }
                  className="border border-black px-7 py-2.5 text-[9px] font-black uppercase tracking-[0.15em] text-black transition-colors hover:bg-black hover:text-white"
                >
                  Read More Articles
                </button>

                <span className="text-[8px] text-gray-400">
                  Showing {latestStories.length} of{" "}
                  {filteredStories.length}
                </span>

              </div>
            )}

          </section>

          {/* =================================================
              MAGAZINE FEATURE
          ================================================= */}

          <section className="mb-14">

            <SectionHeader
              title="The Pride Times Magazine"
              link="/magazine"
              linkText="Digital Edition"
            />

            <Link
              to="/magazine"
              className="group grid grid-cols-1 overflow-hidden bg-black md:grid-cols-[1.15fr_0.85fr]"
            >

              <div className="aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[360px]">

                <ImageWithFallback
                  src={magazinePreview.image}
                  alt={magazinePreview.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10">

                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-red-500">
                  Global Industry Edition
                </span>

                <h3 className="mt-3 font-serif text-[30px] font-black leading-[1.05] text-white sm:text-[38px]">
                  {magazinePreview.title}
                </h3>

                <p className="mt-4 max-w-lg text-[12px] leading-[1.6] text-gray-400">
                  {magazinePreview.subtitle}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-white">
                  Read Digital Edition
                  <ArrowRight size={11} />
                </span>

              </div>

            </Link>

          </section>

          {/* =================================================
              MORE ARTICLES
          ================================================= */}

          <section
            aria-label="Older articles"
            className="mb-12 border-y border-gray-200 py-7 text-center"
          >

            <button
              type="button"
              onClick={() =>
                setShowOlder((open) => !open)
              }
              aria-expanded={showOlder}
              className="border border-black px-7 py-2.5 text-[9px] font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-black hover:text-white"
            >
              {showOlder
                ? "Hide Older Articles"
                : "More Articles"}
            </button>

            <p className="mt-2 text-[9px] text-gray-400">
              September digest, M&A Edition 1 and Global
              Sector News Report 2026
            </p>

          </section>

          {showOlder && (
            <>

              {/* =================================================
                  M&A EDITION
              ================================================= */}

              <section
                aria-label="Global Corporate News Digest Edition 1: Mergers and Acquisitions"
                className="mb-14"
              >

                <SectionHeader
                  title={`Global Corporate News Digest · ${maEdition1Meta.edition}`}
                  link="/mergers-acquisitions"
                  linkText="M&A Hub"
                />

                <p className="mb-6 max-w-4xl text-[11px] leading-[1.5] text-gray-500">
                  {maEdition1Meta.subtitle}{" "}
                  <span className="text-gray-400">
                    {maEdition1Meta.prepared}.{" "}
                    {maEdition1Meta.note}
                  </span>
                </p>

                <Link
                  to={maEdition1ArticlePath(
                    editionLead
                  )}
                  className="group block max-w-xl"
                >

                  <div className="aspect-[16/9] overflow-hidden bg-gray-100">

                    <ImageWithFallback
                      src={editionLead.image}
                      alt={editionLead.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                  </div>

                  <span className="mt-3 block text-[8px] font-black uppercase tracking-[0.16em] text-red-600">
                    {editionLead.section} ·{" "}
                    {maEdition1Meta.edition}
                  </span>

                  <h3 className="mt-1.5 font-serif text-[25px] font-black leading-[1.1] text-gray-950 transition-colors group-hover:text-red-600">
                    {editionLead.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-[1.5] text-gray-500">
                    {editionLead.lede}
                  </p>

                </Link>

                <div className="mt-10 space-y-12">

                  {editionIndustries.map((group) => (
                    <div key={group.name}>

                      <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-2">

                        <h3 className="text-[11px] font-black uppercase tracking-[0.15em]">
                          {group.name}
                        </h3>

                        <span className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                          {group.stories.length} stories
                        </span>

                      </div>

                      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {group.stories.map((story) => {
                          const chip =
                            editionDealChip(story);

                          return (
                            <Link
                              key={story.id}
                              to={maEdition1ArticlePath(
                                story
                              )}
                              className="group block"
                            >

                              <div className="aspect-[16/10] overflow-hidden bg-gray-100">

                                <ImageWithFallback
                                  src={story.image}
                                  alt={story.title}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                              </div>

                              {chip && (
                                <span className="mt-3 block text-[9px] font-black uppercase tracking-[0.12em] text-red-600">
                                  {chip.value}
                                </span>
                              )}

                              <h4 className="mt-1.5 font-serif text-[20px] font-black leading-[1.15] text-gray-900 transition-colors group-hover:text-red-600">
                                {story.title}
                              </h4>

                              <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.55] text-gray-500">
                                {story.lede}
                              </p>

                            </Link>
                          );
                        })}

                      </div>

                    </div>
                  ))}

                </div>

                <details className="mt-8 border border-gray-200">

                  <summary className="cursor-pointer select-none px-4 py-3 text-[9px] font-black uppercase tracking-[0.14em]">
                    Deal status table
                  </summary>

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[560px] text-left text-[10px]">

                      <thead className="bg-gray-50 text-[8px] uppercase tracking-wide text-gray-500">
                        <tr>
                          <th className="px-4 py-2">
                            Deal
                          </th>
                          <th className="px-4 py-2">
                            Value
                          </th>
                          <th className="px-4 py-2">
                            Announced
                          </th>
                          <th className="px-4 py-2">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                        {maEdition1DealTable.map(
                          (row) => (
                            <tr
                              key={row.deal}
                              className="border-t border-gray-100"
                            >
                              <td className="px-4 py-2 font-semibold">
                                {row.deal}
                              </td>

                              <td className="px-4 py-2">
                                {row.value}
                              </td>

                              <td className="px-4 py-2">
                                {row.announced}
                              </td>

                              <td className="px-4 py-2">
                                {row.status}
                              </td>
                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                  <p className="px-4 py-3 text-[9px] leading-[1.5] text-gray-400">
                    {maEdition1Sources}
                  </p>

                </details>

              </section>

              {/* =================================================
                  SECTION BRIEFINGS
              ================================================= */}

              <section className="mb-14">

                <SectionHeader title="Global Corporate News Digest · Sections" />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">

                  {digestSections.map((section) => (
                    <div
                      key={section.slug}
                      className="flex flex-col border border-gray-200 p-5 transition-colors hover:border-black"
                    >

                      <span className="font-serif text-[30px] font-black text-gray-200">
                        {String(section.number).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <h3 className="mt-1 text-[13px] font-black leading-[1.3]">
                        {section.name}
                      </h3>

                      <p className="mt-1.5 text-[10px] leading-[1.5] text-gray-500">
                        {section.tagline}
                      </p>

                      {sectionHeadlines.get(
                        section.number
                      ) && (
                        <Link
                          to={digestArticlePath(
                            sectionHeadlines.get(
                              section.number
                            )!
                          )}
                          className="group mt-4 border-t border-gray-200 pt-4"
                        >

                          <span className="text-[8px] font-black uppercase tracking-[0.14em] text-red-600">
                            Top headline
                          </span>

                          <span className="mt-1 block line-clamp-4 font-serif text-[14px] font-bold leading-[1.3] transition-colors group-hover:text-red-600">
                            {
                              sectionHeadlines.get(
                                section.number
                              )!.title
                            }
                          </span>

                        </Link>
                      )}

                      <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-3">

                        {section.glance.map(
                          (item) => (
                            <li
                              key={item.theme}
                              className="flex items-center justify-between gap-2 text-[9px]"
                            >
                              <span className="truncate text-gray-600">
                                {item.theme}
                              </span>

                              <span className="shrink-0 font-bold text-red-600">
                                {item.momentum}
                              </span>
                            </li>
                          )
                        )}

                      </ul>

                      <div className="mt-auto flex items-center justify-between pt-5">

                        <button
                          type="button"
                          onClick={() =>
                            openSectionFeed(
                              section.name
                            )
                          }
                          className="text-[8px] font-black uppercase tracking-wide hover:text-red-600"
                        >
                          {sectionStoryCounts.get(
                            section.number
                          ) ?? 0}{" "}
                          stories
                        </button>

                        <Link
                          to={section.path}
                          className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wide text-red-600"
                        >
                          Section
                          <ArrowRight size={9} />
                        </Link>

                      </div>

                    </div>
                  ))}

                </div>

              </section>

              {/* =================================================
                  GLOBAL SECTOR HEADLINES
              ================================================= */}

              <section className="mb-14">

                <SectionHeader
                  title="Sector Headlines · Global Sector News Report 2026"
                  link={`/article/${globalSectorArticleId}`}
                  linkText="Read Report"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                  {globalSectorItems.map((item) => (
                    <Link
                      key={item.sector}
                      to={`/article/${globalSectorArticleId}`}
                      className="group border border-gray-200 p-5 transition-colors hover:border-black"
                    >

                      <span className="block text-[8px] font-black uppercase tracking-[0.14em] text-red-600">
                        {item.sector}
                      </span>

                      <h3 className="mt-2 font-serif text-[16px] font-black leading-[1.25] transition-colors group-hover:text-red-600">
                        {item.headline}
                      </h3>

                      <p className="mt-2 text-[10px] font-medium leading-[1.5] text-gray-600">
                        {item.verdict}.
                      </p>

                    </Link>
                  ))}

                </div>

              </section>

              {/* =================================================
                  MORE SECTOR NEWS
              ================================================= */}

              <section className="mb-14">

                <SectionHeader
                  title="More Sector News · Global Sector News Report 2026"
                  link={`/article/${globalSectorArticleId}`}
                  linkText="Read Report"
                />

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

                  {globalSectorMoreNews.map(
                    (group) => (
                      <div key={group.sector}>

                        <span className="block border-b border-black pb-2 text-[9px] font-black uppercase tracking-[0.14em] text-red-600">
                          {group.sector}
                        </span>

                        <ul className="mt-2">

                          {group.headlines.map(
                            (headline) => (
                              <li key={headline}>

                                <Link
                                  to={`/article/${globalSectorArticleId}`}
                                  className="block border-b border-gray-100 py-3 font-serif text-[13px] font-bold leading-[1.35] transition-colors hover:text-red-600"
                                >
                                  {headline}
                                </Link>

                              </li>
                            )
                          )}

                        </ul>

                      </div>
                    )
                  )}

                </div>

              </section>

            </>
          )}

          {/* =================================================
              REGIONAL SNAPSHOT
          ================================================= */}

          <section className="mb-14">

            <SectionHeader title="Regional Snapshot" />

            <div className="overflow-x-auto">

              <table className="w-full min-w-[520px] text-left text-[10px]">

                <thead>
                  <tr className="border-b-2 border-black text-[8px] uppercase tracking-[0.14em] text-gray-500">

                    <th className="py-3 pr-4">
                      Region
                    </th>

                    <th className="py-3 pr-4">
                      Deal value (US$ bn)
                    </th>

                    <th className="py-3 pr-4">
                      Earnings growth
                    </th>

                    <th className="py-3">
                      Hiring outlook
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {regionalSnapshot.map((row) => (
                    <tr
                      key={row.region}
                      className="border-b border-gray-100"
                    >

                      <td className="py-3 pr-4 font-bold text-gray-900">
                        {row.region}
                      </td>

                      <td className="py-3 pr-4 tabular-nums text-gray-700">
                        {row.dealValue}
                      </td>

                      <td className="py-3 pr-4 tabular-nums text-gray-700">
                        {row.earningsGrowth}
                      </td>

                      <td className="py-3 text-gray-700">
                        {row.hiring}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            <p className="mt-3 text-[8px] leading-[1.5] text-gray-400">
              Sample publication — all companies, people,
              quotations and figures are fictional and for
              layout and demonstration purposes only.
            </p>

          </section>

          {/* =================================================
              PRIDE TIMES 30
          ================================================= */}

          <section>

            <SectionHeader
              title="Industry Leaders Shaping the 2026 Transition"
              link="/billionaires"
              linkText="Full List"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {prideTimes30.map((leader) => (
                <div
                  key={leader.rank}
                  className="flex items-start gap-4 border border-gray-200 p-4 transition-colors hover:border-black"
                >

                  <span className="w-8 shrink-0 font-serif text-[25px] font-black tabular-nums text-gray-200">
                    {String(leader.rank).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div className="min-w-0">

                    <p className="text-[13px] font-black text-gray-900">

                      {leader.name}

                      <span className="font-normal text-gray-400">
                        {" "}
                        · {leader.company}
                      </span>

                    </p>

                    <p className="mt-1 text-[10px] leading-[1.5] text-gray-500">
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
          LOCAL PAGE CSS
      ===================================================== */}

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        ::selection {
          background: rgba(220, 38, 38, 0.14);
          color: inherit;
        }

        @media (max-width: 640px) {
          h1,
          h2,
          h3,
          h4 {
            text-wrap: balance;
          }
        }
      `}</style>

    </div>
  );
}
