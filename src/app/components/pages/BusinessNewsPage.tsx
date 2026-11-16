import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Bookmark, Clock, MapPin } from "lucide-react";

import "../../../styles/business-page.css"; // kept so MarketSnapshot styling is unaffected
import { ImageWithFallback } from "../figma/ImageWithFallback";

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
import img_FIN4 from "../../../imports/FIN4.png";
import microsoftDatacenterAi from "../../../imports/microsoft-datacenter-ai.jpg";
import hsbcBankBuilding from "../../../imports/hsbc-bank-building.jpg";

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
import { MarketSnapshot } from "../market/MarketSnapshot";

/* =========================================================
   TYPES
========================================================= */

/* One card shape for every business story, whichever data file it
   comes from, so the whole page can use the same layout. */
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
      className="my-8 overflow-hidden border-y border-gray-200 bg-white py-4"
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
   Every business story on the site, newest edition first.
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

/* Only business desks are shown here. */
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
   FRONT-PAGE PICKS
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

/* Hard-coded corporate moves and earnings (unchanged content). */

const corporateMoves = [
  {
    id: "microsoft-ai-datacenter",
    href: "/article/paramount-skydance-and-warner-bros-discovery-a-110-billion-deal-stuck-in-court",
    image: microsoftDatacenterAi,
    alt: "Microsoft Expands AI Infrastructure with New Data Center Investment",
    label: "MERGERS & ACQUISITIONS",
    region: "GLOBAL",
    title: "Microsoft Expands AI Infrastructure with New Data Center Investment",
    lede: "The company will invest $10 billion in new AI-ready data centers across the US and Europe.",
    when: "7 October 2026",
    readTime: "2 min read",
  },
  {
    id: "hsbc-restructuring",
    href: "/article/deals-and-moves-roundup",
    image: hsbcBankBuilding,
    alt: "HSBC to Restructure Operations Amid Cost-Cutting Drive",
    label: "BANKING",
    region: "EUROPE",
    title: "HSBC to Restructure Operations Amid Cost-Cutting Drive",
    lede: "HSBC announced a new restructuring plan to simplify its global operations and reduce costs.",
    when: "7 October 2026",
    readTime: "2 min read",
  },
];

const earningsWatch = [
  {
    id: "apple",
    name: "Apple (AAPL)",
    price: "$189.32",
    change: "+2.14%",
    up: true,
    note: "Q3 revenue beats estimates",
  },
  {
    id: "microsoft",
    name: "Microsoft (MSFT)",
    price: "$410.12",
    change: "+1.62%",
    up: true,
    note: "Cloud growth remains strong",
  },
  {
    id: "nvidia",
    name: "Nvidia (NVDA)",
    price: "$1,246.90",
    change: "-0.84%",
    up: false,
    note: "Mixed outlook after earnings",
  },
];

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
   BADGES
========================================================= */

const earningsBadge: Record<string, string> = {
  BEAT: "inline-block bg-green-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700",
  MISS: "inline-block bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700",
};

const dealBadge: Record<string, string> = {
  Closed: "inline-block bg-gray-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white",
  Announced: "inline-block bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700",
  Pending: "inline-block bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700",
};

/* =========================================================
   LOGOS (unchanged SVG content)
========================================================= */

function AppleLogo() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 170 170" fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.050-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.690 0-8.14-1.05-13.32-3.18-5.19-2.12-9.970-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.79-11.97-14.24-6.3-9.52-11.19-20.4-14.67-32.64-3.48-12.24-5.22-23.77-5.22-34.59 0-14.97 3.8-27.42 11.41-37.35 7.6-9.93 17.06-15.010 28.38-15.24 4.58 0 9.8 1.25 15.66 3.76 5.86 2.5 9.77 3.8 11.73 3.91 1.74 0 5.8-1.36 12.18-4.07 6.38-2.71 11.75-3.96 16.11-3.76 12.06.63 21.72 5.09 28.98 13.38-10.45 6.32-15.56 15.23-15.34 26.74.22 9.02 3.65 16.63 10.29 22.83 6.64 6.2 14.59 9.68 23.85 10.44-2.28 6.84-4.89 13.59-7.83 20.25zM119.22 33.15c0-6.85 2.5-13.43 7.51-19.74 5.01-6.31 11.23-10.74 18.66-13.29.33 2.17.5 4.13.5 5.87 0 6.85-2.6 13.54-7.81 20.07-5.21 6.53-11.47 10.74-18.78 12.63-.08-1.85-.08-3.69-.08-5.54z" />
    </svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  );
}

function NvidiaLogo() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="#76B900">
      <path d="M8.938 6.702c.484-.047.98-.07 1.488-.07 4.195 0 7.746 2.375 9.473 5.86-1.399 2.922-4.148 5.008-7.465 5.567v-2.02c2.258-.492 4.102-1.996 5.066-4.004-1.285-2.438-3.82-4.031-6.727-4.031-.383 0-.75.031-1.117.078l-.718-1.38zm-2.094 2.82c.477-.18.984-.32 1.516-.414l.734 1.406c-.344.07-.672.18-.984.32-.977.438-1.766 1.156-2.281 2.055.805 1.766 2.438 3.016 4.383 3.328v1.656c-2.906-.39-5.328-2.227-6.398-4.875.75-1.578 1.836-2.773 3.03-3.476zm-2.844-1.633C5.938 6.133 8.359 5.25 10.984 5.25c5.367 0 9.875 3.383 11.594 8.188-1.898 4.297-5.969 7.375-10.773 7.828v1.734c5.844-.484 10.742-4.32 12.984-9.688C22.75 7.109 17.383 3 10.984 3c-3.156 0-6.07.977-8.484 2.656l1.5 2.235z" />
    </svg>
  );
}

function logoFor(id: string) {
  if (id === "apple") return <AppleLogo />;
  if (id === "microsoft") return <MicrosoftLogo />;
  return <NvidiaLogo />;
}

/* =========================================================
   SPARKLINE
========================================================= */

function EarningsSparkline({ up }: { up: boolean }) {
  return (
    <svg className="h-4 w-12 shrink-0 overflow-visible" viewBox="0 0 48 14" fill="none">
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

/* =========================================================
   SMALL PARTS (styled like the homepage)
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
    <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
        {title}
      </h2>

      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-[11px] font-semibold text-gray-600 hover:underline"
        >
          {linkText}
          <ArrowRight size={10} />
        </Link>
      )}
    </div>
  );
}

function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`block text-[11px] font-bold uppercase tracking-[0.08em] text-red-600 ${className}`}>
      {children}
    </span>
  );
}

function BookmarkButton({ label = "Bookmark story" }: { label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="text-gray-400 transition-colors hover:text-black"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Bookmark size={12} strokeWidth={1.75} />
    </button>
  );
}

function TimeRow({ when, readTime }: { when: string; readTime?: string }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-gray-400">
      <Clock size={10} />
      {when}
      {readTime ? ` · ${readTime}` : ""}
    </span>
  );
}

/* =========================================================
   BUSINESS NEWS PAGE
========================================================= */

export function BusinessNewsPage() {
  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const newsListRef = useRef<HTMLDivElement | null>(null);

  /* ---------- LATEST NEWS FILTERING ---------- */

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
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="w-full px-4 md:px-6 xl:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          <PrideTimesAd slot="5373718974" />

          {/* MARKET SNAPSHOT BAR */}
          <div className="mb-5">
            <MarketSnapshot tabs={["Indices", "Commodities", "Crypto"]} />
          </div>

          {/* =================================================
              HERO — Top Business Stories | Lead + Corporate Moves | Editor's Pick + Latest
          ================================================= */}
          <section className="grid grid-cols-1 items-stretch gap-0 border border-gray-200 md:grid-cols-2 lg:grid-cols-12">
            {/* LEFT — TOP BUSINESS STORIES */}
            <aside className="flex flex-col p-6 md:col-span-2 lg:col-span-4 lg:border-r lg:border-gray-200">
              <SectionHeader
                title="Top Business Stories"
                link="/supply-chain"
                linkText="View More"
              />

              {majorStories.map((story, index) => (
                <Link
                  key={story.id}
                  to={story.path}
                  className={`group block ${
                    index === 0 ? "border-b border-gray-200 pb-6 mb-6" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <Kicker className="mt-4">
                    {story.label}
                    {story.location ? ` | ${story.location}` : ""}
                  </Kicker>

                  <h3 className="mt-2 line-clamp-2 text-[18px] font-extrabold leading-[1.2] text-gray-950 group-hover:underline">
                    {story.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-[14px] leading-[1.5] text-gray-600">
                    {story.lede}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <TimeRow when={story.when} readTime={story.readTime} />
                    <BookmarkButton />
                  </div>
                </Link>
              ))}
            </aside>

            {/* CENTRE — LEAD + CORPORATE MOVES */}
            <div className="flex flex-col border-b border-gray-200 p-6 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r lg:border-gray-200">
              <Link to={leadStory.path} className="group block">
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={businessNyseTrading}
                    alt={leadStory.title}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <Kicker className="mt-5">
                  {leadStory.label}
                  {leadStory.location ? ` | ${leadStory.location}` : ""}
                </Kicker>

                <h2 className="mt-2 line-clamp-3 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[26px]">
                  {leadStory.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {leadStory.lede}
                </p>
              </Link>

              <div className="mt-auto border-t border-gray-200 pt-6">
                {corporateMoves.map((move, index) => (
                  <Link
                    key={move.id}
                    to={move.href}
                    className={`group flex items-start gap-3 py-3.5 ${
                      index === 0 ? "border-b border-gray-200" : ""
                    }`}
                  >
                    <div className="h-[64px] w-[96px] shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <ImageWithFallback
                        src={move.image}
                        alt={move.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <Kicker>
                        {move.label} | {move.region}
                      </Kicker>

                      <h3 className="mt-1 line-clamp-2 text-[14px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                        {move.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-[12px] leading-[1.5] text-gray-500">
                        {move.lede}
                      </p>

                      <div className="mt-1.5">
                        <TimeRow when={move.when} readTime={move.readTime} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT — EDITOR'S PICK & LATEST NEWS */}
            <aside className="flex flex-col p-6 md:col-span-2 lg:col-span-4">
              <div>
                <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                  <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
                    Editor's Pick
                  </h2>

                  <Link
                    to="/markets"
                    className="border border-gray-300 px-3 py-1 text-[11px] font-semibold text-gray-700 hover:border-black hover:text-black"
                  >
                    Explore More
                  </Link>
                </div>

                <Link to={editorsPick.path} className="group block">
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={editorsPick.image}
                      alt={editorsPick.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <Kicker className="mt-3">{editorsPick.label}</Kicker>

                  <h3 className="mt-1 line-clamp-2 text-[20px] font-extrabold leading-[1.2] text-gray-950 group-hover:underline">
                    {editorsPick.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-gray-600">
                    {editorsPick.lede}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <TimeRow when={editorsPick.when} readTime={editorsPick.readTime} />
                    <BookmarkButton label="Bookmark" />
                  </div>
                </Link>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="mb-2 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                  <h2 className="text-[20px] font-serif font-bold text-red-600">
                    Latest News
                  </h2>

                  <span className="text-[11px] font-semibold text-gray-400">
                    Business Desk
                  </span>
                </div>

                <ul className="divide-y divide-gray-200">
                  {latestNewsStories.map((item) => (
                    <li key={item.id}>
                      <Link to={item.path} className="group flex items-start gap-3 py-3.5">
                        <div className="h-[64px] w-[96px] shrink-0 overflow-hidden rounded-md bg-gray-100">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between text-[11px] text-gray-400">
                            <span className="font-semibold text-red-600">
                              {item.location ?? item.label}
                            </span>
                            <span>October 2026</span>
                          </div>

                          <h4 className="mt-1 line-clamp-2 text-[14px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                            {item.title}
                          </h4>

                          <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-400">
                            <span>{item.readTime || "3 min read"}</span>
                            <BookmarkButton label="Bookmark story" />
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </section>

          {/* =================================================
              EARNINGS WATCH
          ================================================= */}

          <section className="mt-16">
            <SectionHeader title="Earnings Watch" link="/markets" linkText="See More" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {earningsWatch.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between border border-gray-200 p-5"
                >
                  <div>
                    <div className="mb-2.5 flex items-center gap-2 text-[12px] font-semibold text-gray-500">
                      {logoFor(item.id)}
                      <span>{item.name}</span>
                    </div>

                    <div className="text-[26px] font-extrabold tabular-nums text-gray-950">
                      {item.price}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`text-[13px] font-bold ${
                          item.up ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.change}
                      </span>
                      <EarningsSparkline up={item.up} />
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-3 text-[13px] text-gray-600">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <PrideTimesAd slot="8042854193" format="fluid" layout="in-article" />

          {/* =================================================
              GLOBAL INDUSTRY EDITION — HEADLINES BY INDUSTRY
          ================================================= */}

          <section
            aria-label="Global Industry Edition business headlines"
            className="mt-16"
          >
            <SectionHeader
              title={`${octEditionMeta.title} · ${octEditionMeta.edition} · ${octEditionMeta.date}`}
            />

            <p className="-mt-2 mb-8 max-w-3xl text-[14px] leading-[1.5] text-gray-500">
              Business stories from the edition: the global economy and finance,
              corporate deals, and industry moves in automotive and aerospace.
            </p>

            <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {octCards.map((story) => (
                <Link
                  key={story.id}
                  to={story.path}
                  className="group flex h-full flex-col"
                >
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-2.5 flex flex-1 flex-col">
                    <Kicker>{story.label}</Kicker>

                    <h3 className="mt-1 line-clamp-2 min-h-[2.56em] text-[16px] font-bold leading-[1.28] text-gray-950 group-hover:underline">
                      {story.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-gray-500">
                      {story.lede}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* =================================================
              NUMBERS AT A GLANCE
          ================================================= */}

          <section className="mt-16">
            <SectionHeader title="Numbers at a Glance" />

            <p className="-mt-2 mb-6 text-[12px] text-gray-400">
              {octEditionMeta.edition} · {octEditionMeta.date}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
              {businessGlance.map((item) => (
                <div key={item.indicator} className="border-t border-gray-200 pt-3">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500">
                    {item.indicator}
                  </span>

                  <span className="mt-1 block text-[28px] font-extrabold leading-none tabular-nums text-gray-950">
                    {item.figure}
                  </span>

                  <span className="mt-2 block text-[11px] text-gray-400">
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
            className="mt-16"
          >
            <SectionHeader
              title={`Global Corporate News Digest · ${maEdition1Meta.edition} · Headlines by Industry`}
              link="/mergers-acquisitions"
              linkText="M&A Hub"
            />

            <p className="-mt-2 mb-8 max-w-3xl text-[14px] leading-[1.5] text-gray-500">
              {maEdition1Meta.subtitle}{" "}
              <span className="text-gray-400">
                {maEdition1Meta.prepared}. {maEdition1Meta.note}
              </span>
            </p>

            {maLead && (
              <Link
                to={maEdition1ArticlePath(maLead)}
                className="group mb-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
              >
                <div className="overflow-hidden rounded-md bg-gray-100 lg:col-span-7">
                  <ImageWithFallback
                    src={maLead.image}
                    alt={maLead.title}
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="lg:col-span-5">
                  <Kicker>
                    {maLead.section} · {maEdition1Meta.edition}
                  </Kicker>

                  <h3 className="mt-2 line-clamp-3 text-[28px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[32px]">
                    {maLead.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-gray-600">
                    {maLead.lede}
                  </p>
                </div>
              </Link>
            )}

            {maIndustries.map((group) => (
              <div key={group.name} className="mb-12">
                <div className="mb-6 flex items-baseline justify-between border-b border-gray-200 pb-2">
                  <h3 className="text-[18px] font-extrabold text-gray-950">
                    {group.name}
                  </h3>

                  <span className="text-[11px] font-semibold text-gray-400">
                    {group.stories.length} stories
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                  {group.stories.map((story) => {
                    const chip = maValueChip(story);

                    return (
                      <Link
                        key={story.id}
                        to={maEdition1ArticlePath(story)}
                        className="group flex h-full flex-col"
                      >
                        <div className="overflow-hidden rounded-md bg-gray-100">
                          <ImageWithFallback
                            src={story.image}
                            alt={story.title}
                            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>

                        {chip && (
                          <span className="mt-2.5 inline-block text-[11px] font-bold text-red-600">
                            {chip.value}
                          </span>
                        )}

                        <h4 className="mt-1 line-clamp-2 text-[16px] font-bold leading-[1.28] text-gray-950 group-hover:underline">
                          {story.title}
                        </h4>

                        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-gray-500">
                          {story.lede}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* DEAL STATUS TRACKER */}

            <details className="group border border-gray-200">
              <summary className="cursor-pointer list-none px-4 py-3 text-[13px] font-bold text-gray-950 hover:bg-gray-50">
                Deal status table (as of the early August 2026 tracker update)
              </summary>

              <div className="overflow-x-auto border-t border-gray-200">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">Deal</th>
                      <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">Value</th>
                      <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">Announced</th>
                      <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {maEdition1DealTable.map((row) => (
                      <tr key={row.deal} className="border-t border-gray-100">
                        <td className="px-3 py-2.5 font-bold text-gray-950">{row.deal}</td>
                        <td className="px-3 py-2.5 text-gray-700">{row.value}</td>
                        <td className="px-3 py-2.5 text-gray-700">{row.announced}</td>
                        <td className="px-3 py-2.5 text-gray-700">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="border-t border-gray-200 px-4 py-3 text-[11px] text-gray-400">
                {maEdition1Sources}
              </p>
            </details>
          </section>

          <PrideTimesAd slot="5608262547" format="fluid" layoutKey="-ef+6k-30-ac+ty" />

          {/* =================================================
              ALL BUSINESS NEWS + MAGAZINE
          ================================================= */}

          <section className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.9fr_0.7fr]">
            {/* LATEST NEWS (every business story) */}

            <div ref={newsListRef} className="min-w-0 scroll-mt-24">
              <SectionHeader title="All Business News" />

              <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                {latestNewsTabs.map((tab) => {
                  const active = activeNewsTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => selectTab(tab)}
                      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 pb-2 text-[13px] font-semibold transition-colors ${
                        active
                          ? "border-black text-black"
                          : "border-transparent text-gray-500 hover:text-black"
                      }`}
                    >
                      {tab}
                      <span className="text-[10px] text-gray-400">{tabCount(tab)}</span>
                    </button>
                  );
                })}
              </div>

              <div className="divide-y divide-gray-200">
                {latestStories.length === 0 && (
                  <p className="py-6 text-[12px] text-gray-400">
                    No stories in this category yet.
                  </p>
                )}

                {latestStories.map((story) => (
                  <Link
                    key={story.id}
                    to={story.path}
                    className="group flex gap-4 py-6"
                  >
                    <div className="h-[80px] w-[120px] shrink-0 overflow-hidden rounded-md bg-gray-100 sm:h-[126px] sm:w-[200px]">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">
                          {story.label}
                        </span>

                        {story.location && (
                          <>
                            <span className="text-[10px] text-gray-300">•</span>
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                              <MapPin size={9} />
                              {story.location}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="mt-1 line-clamp-2 text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline sm:text-[21px]">
                        {story.title}
                      </h3>

                      <p className="mt-1.5 hidden line-clamp-2 text-[13px] leading-[1.5] text-gray-500 sm:block">
                        {story.lede}
                      </p>

                      <div className="mt-1.5 flex items-center gap-1 text-[11px] text-gray-400">
                        <Clock size={9} />
                        <span>{story.when}</span>
                        {story.readTime && <span>· {story.readTime}</span>}
                      </div>
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
                    className="border border-black px-6 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-black hover:text-white"
                  >
                    Show more stories
                  </button>

                  <span className="text-[10px] text-gray-400">
                    Showing {latestStories.length} of {filteredStories.length}
                  </span>
                </div>
              )}
            </div>

            {/* MAGAZINE */}

            <div>
              <div className="lg:sticky lg:top-24">
                <SectionHeader title="Magazine" link="/magazine" />

                <Link
                  to="/magazine"
                  className="group block overflow-hidden rounded-md bg-black"
                >
                  <div className="overflow-hidden rounded-md">
                    <ImageWithFallback
                      src={magazinePreview.image}
                      alt={magazinePreview.title}
                      className="h-[210px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-500">
                      Pride Times Magazine
                    </span>

                    <h3 className="mt-1 line-clamp-2 text-[20px] font-extrabold leading-[1.2] text-white">
                      {magazinePreview.title}
                    </h3>

                    <p className="mt-1.5 text-[12px] leading-[1.5] text-gray-400">
                      {magazinePreview.subtitle}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1.5 border-b border-white/50 pb-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      Read Digital Edition
                      <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* =================================================
              EARNINGS + DEALS
          ================================================= */}

          <section className="mt-16">
            <SectionHeader title="The Numbers Behind the Headlines" />

            <details className="group mb-4 border border-gray-200">
              <summary className="cursor-pointer list-none px-4 py-3 text-[13px] font-bold text-gray-950 hover:bg-gray-50">
                Corporate Earnings
              </summary>

              <div className="overflow-x-auto border-t border-gray-200">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">Company</th>
                      <th className="px-3 py-2 text-right text-[11px] font-bold uppercase tracking-wide text-gray-500">EPS</th>
                      <th className="px-3 py-2 text-right text-[11px] font-bold uppercase tracking-wide text-gray-500">vs Est.</th>
                      <th className="px-3 py-2 text-right text-[11px] font-bold uppercase tracking-wide text-gray-500">Revenue</th>
                      <th className="px-3 py-2 text-right text-[11px] font-bold uppercase tracking-wide text-gray-500">Result</th>
                    </tr>
                  </thead>

                  <tbody>
                    {earningsNews.map((e) => (
                      <tr key={e.ticker} className="border-t border-gray-100">
                        <td className="px-3 py-2.5">
                          <span className="font-bold text-gray-950">{e.company}</span>
                          <span className="ml-1.5 text-gray-400">({e.ticker})</span>
                        </td>
                        <td className="px-3 py-2.5 text-right text-gray-700">{e.eps}</td>
                        <td
                          className={`px-3 py-2.5 text-right ${
                            e.status === "BEAT" ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {e.beat}
                        </td>
                        <td className="px-3 py-2.5 text-right text-gray-700">{e.revenue}</td>
                        <td className="px-3 py-2.5 text-right">
                          <span className={earningsBadge[e.status]}>{e.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>

            <details className="group border border-gray-200">
              <summary className="cursor-pointer list-none px-4 py-3 text-[13px] font-bold text-gray-950 hover:bg-gray-50">
                Deals &amp; Capital
              </summary>

              <div className="overflow-x-auto border-t border-gray-200">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">Acquirer</th>
                      <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">Target</th>
                      <th className="px-3 py-2 text-right text-[11px] font-bold uppercase tracking-wide text-gray-500">Value</th>
                      <th className="hidden px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500 sm:table-cell">Sector</th>
                      <th className="px-3 py-2 text-right text-[11px] font-bold uppercase tracking-wide text-gray-500">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {maDeals.map((d) => (
                      <tr key={d.id} className="border-t border-gray-100">
                        <td className="px-3 py-2.5 font-bold text-gray-950">{d.acquirer}</td>
                        <td className="px-3 py-2.5 text-gray-700">{d.target}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-gray-950">{d.value}</td>
                        <td className="hidden px-3 py-2.5 text-gray-500 sm:table-cell">{d.sector}</td>
                        <td className="px-3 py-2.5 text-right">
                          <span className={dealBadge[d.status]}>{d.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </section>

          <PrideTimesAd slot="6810700989" />
        </main>
      </div>
    </div>
  );
}

export default BusinessNewsPage;
