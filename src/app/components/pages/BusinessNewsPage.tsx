import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Bookmark,
  Clock,
  MapPin,


} from "lucide-react";

import "../../../styles/business-page.css";
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
import img_FIN4 from "../../../imports/FIN4.png";
import microsoftDatacenterAi from "../../../imports/microsoft-datacenter-ai.jpg";
import hsbcBankBuilding from "../../../imports/hsbc-bank-building.jpg";
import { defaultMarketSnapshot } from "../../data/innovationData";

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
    <section aria-label="Advertisement" className="bz-ad">
      <div className="bz-ad-label">Advertisement</div>

      <div className="bz-ad-inner">
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
  BEAT: "bz-badge is-beat",
  MISS: "bz-badge is-miss",
};

const dealBadge: Record<string, string> = {
  Closed: "bz-badge is-closed",
  Announced: "bz-badge is-announced",
  Pending: "bz-badge is-pending",
};

/* =========================================================
   LOGOS (unchanged SVG content)
========================================================= */

function AppleLogo() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 170 170" fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.050-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.970-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.79-11.97-14.24-6.3-9.52-11.19-20.4-14.67-32.64-3.48-12.24-5.22-23.77-5.22-34.59 0-14.97 3.8-27.42 11.41-37.35 7.6-9.93 17.06-15.010 28.38-15.24 4.58 0 9.8 1.25 15.66 3.76 5.86 2.5 9.77 3.8 11.73 3.91 1.74 0 5.8-1.36 12.18-4.07 6.38-2.71 11.75-3.96 16.11-3.76 12.06.63 21.72 5.09 28.98 13.38-10.45 6.32-15.56 15.23-15.34 26.74.22 9.02 3.65 16.63 10.29 22.83 6.64 6.2 14.59 9.68 23.85 10.44-2.28 6.84-4.89 13.59-7.83 20.25zM119.22 33.15c0-6.85 2.5-13.43 7.51-19.74 5.01-6.31 11.23-10.74 18.66-13.29.33 2.17.5 4.13.5 5.87 0 6.85-2.6 13.54-7.81 20.07-5.21 6.53-11.47 10.74-18.78 12.63-.08-1.85-.08-3.69-.08-5.54z" />
    </svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  );
}

function NvidiaLogo() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#76B900">
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
   SPARKLINES
========================================================= */

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

function EarningsSparkline({ up }: { up: boolean }) {
  return (
    <svg className="w-12 h-4 overflow-visible shrink-0" viewBox="0 0 48 14" fill="none">
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
   SMALL PARTS
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
    <div className="bz-head">
      <h2 className="bz-head-title">{title}</h2>

      {link && (
        <Link to={link} className="bz-head-link">
          {linkText}
          <ArrowRight size={10} />
        </Link>
      )}
    </div>
  );
}

function BookmarkButton({ label = "Bookmark story" }: { label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="bz-bookmark"
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
    <span className="bz-time">
      <Clock size={9} />
      {when}
      {readTime ? ` · ${readTime}` : ""}
    </span>
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

  /* ---------- MARKET DATA ---------- */

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
    const interval = setInterval(loadMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentMarketItems = useMemo(() => {
    const fallbackList = defaultMarketSnapshot[activeMarketTab] || [];
    const liveList = marketSnapshotData[activeMarketTab] || [];
    if (!liveList || liveList.length === 0) return fallbackList;
    return fallbackList.map((item, idx) => {
      const live =
        liveList.find(
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
    <div className="bz-page">
      <div className="bz-wrap">
        <main className="bz-main">
          <PrideTimesAd slot="5373718974" />

          {/* =================================================
              MARKET SNAPSHOT BAR
          ================================================= */}

          <section className="bz-snapshot" aria-label="Market snapshot">
            <div className="bz-snapshot-head">
              <h2 className="bz-snapshot-title">Market Snapshot</h2>

              <div className="bz-seg">
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
                      className={`bz-seg-btn ${isActive ? "is-active" : ""}`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bz-snapshot-grid">
              {currentMarketItems.slice(0, 4).map((market) => (
                <div key={market.symbol} className="bz-snap-card">
                  <span className="bz-snap-name">{market.symbol}</span>
                  <span className="bz-snap-value">{market.value}</span>
                  <span
                    className={`bz-snap-change ${
                      market.up ? "is-up" : "is-down"
                    }`}
                  >
                    <span>{market.up ? "▲" : "▼"}</span> {market.change}
                  </span>
                  <div className="bz-snap-spark">
                    <MiniAreaSparkline up={market.up} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bz-snapshot-foot">
              <span>Delayed 15m · Global Exchanges</span>
              <Link to="/markets">
                <span>View All Markets</span>
                <ArrowRight size={9} />
              </Link>
            </div>
          </section>

          {/* =================================================
              HERO — Top Business Stories | Lead + Corporate Moves | Editor's Pick + Latest
          ================================================= */}

          <section className="bz-hero">
            {/* LEFT — TOP BUSINESS STORIES */}

            <aside className="bz-hero-left">
              <SectionHeader
                title="Top Business Stories"
                link="/supply-chain"
                linkText="View More"
              />

              {majorStories.map((story) => (
                <Link key={story.id} to={story.path} className="bz-compact">
                  <div className="bz-compact-img">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full"
                    />
                  </div>

                  <span className="bz-kicker" style={{ marginTop: 10 }}>
                    {story.label}
                    {story.location ? ` | ${story.location}` : ""}
                  </span>

                  <h3 className="bz-compact-title">{story.title}</h3>

                  <p className="bz-compact-lede">{story.lede}</p>

                  <div className="bz-news-meta">
                    <TimeRow when={story.when} readTime={story.readTime} />
                    <BookmarkButton />
                  </div>
                </Link>
              ))}
            </aside>

            {/* CENTRE — LEAD + CORPORATE MOVES */}

            <div className="bz-hero-center">
              <Link to={leadStory.path} className="bz-lead">
                <ImageWithFallback
                  src={businessNyseTrading}
                  alt={leadStory.title}
                  className="bz-lead-img"
                />

                <div className="bz-lead-shade" />

                <span className="bz-lead-tag">
                  {leadStory.label}
                  {leadStory.location ? ` | ${leadStory.location}` : ""}
                </span>

                <div className="bz-lead-body">
                  <div className="bz-lead-bar" />

                  <h2 className="bz-lead-title">{leadStory.title}</h2>

                  <p className="bz-lead-lede">{leadStory.lede}</p>

                  <span className="bz-lead-cta">
                    Read Full Story
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

              <div className="bz-sub-row">
                {corporateMoves.map((move) => (
                  <Link key={move.id} to={move.href} className="bz-sub">
                    <div className="bz-sub-img">
                      <ImageWithFallback
                        src={move.image}
                        alt={move.alt}
                        className="w-full h-full"
                      />
                    </div>

                    <div>
                      <span className="bz-kicker">
                        {move.label} | {move.region}
                      </span>

                      <h3 className="bz-sub-title">{move.title}</h3>

                      <p className="bz-sub-lede">{move.lede}</p>

                      <div className="bz-news-meta">
                        <TimeRow when={move.when} readTime={move.readTime} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT — EDITOR'S PICK & LATEST NEWS */}

            <aside className="bz-hero-right">
              <div>
                <div className="bz-head" style={{ borderTopWidth: 3, marginBottom: 12 }}>
                  <h2 className="bz-head-title">Editor's Pick</h2>

                  <Link to="/markets" className="bz-pill-link">
                    Explore More
                  </Link>
                </div>

                <Link to={editorsPick.path} className="bz-pick-link">
                  <div className="bz-pick-img">
                    <ImageWithFallback
                      src={editorsPick.image}
                      alt={editorsPick.title}
                      className="w-full h-full"
                    />
                  </div>

                  <span className="bz-kicker" style={{ marginTop: 12 }}>
                    {editorsPick.label}
                  </span>

                  <h3 className="bz-pick-title">{editorsPick.title}</h3>

                  <p className="bz-pick-lede">{editorsPick.lede}</p>

                  <div className="bz-news-meta">
                    <TimeRow when={editorsPick.when} readTime={editorsPick.readTime} />
                    <BookmarkButton label="Bookmark" />
                  </div>
                </Link>
              </div>

              <div>
                <div className="bz-head" style={{ borderTopWidth: 3, marginBottom: 4 }}>
                  <h2 className="bz-head-title" style={{ color: "#e31b23" }}>
                    Latest News
                  </h2>

                  <span className="bz-kicker" style={{ color: "#9a9a9a" }}>
                    Business Desk
                  </span>
                </div>

                {latestNewsStories.map((item) => (
                  <Link key={item.id} to={item.path} className="bz-stream-item">
                    <div className="bz-stream-img">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="bz-stream-foot" style={{ marginTop: 0, marginBottom: 2 }}>
                        <span className="bz-stream-loc">
                          {item.location ?? item.label}
                        </span>
                        <span>October 2026</span>
                      </div>

                      <h4 className="bz-stream-title">{item.title}</h4>

                      <div className="bz-stream-foot">
                        <span>{item.readTime || "3 min read"}</span>
                        <BookmarkButton label="Bookmark story" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </section>

          {/* =================================================
              EARNINGS WATCH
          ================================================= */}

          <section className="bz-section" style={{ paddingTop: 36 }}>
            <SectionHeader title="Earnings Watch" link="/markets" linkText="See More" />

            <div className="bz-earn-grid">
              {earningsWatch.map((item) => (
                <div key={item.id} className="bz-earn-card">
                  <div>
                    <div className="bz-earn-head" style={{ marginBottom: 10 }}>
                      {logoFor(item.id)}
                      <span>{item.name}</span>
                    </div>

                    <div className="bz-earn-price">{item.price}</div>

                    <div className="bz-earn-row">
                      <span
                        className={`bz-earn-change ${
                          item.up ? "is-up" : "is-down"
                        }`}
                      >
                        {item.change}
                      </span>
                      <EarningsSparkline up={item.up} />
                    </div>
                  </div>

                  <div className="bz-earn-note">{item.note}</div>
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
            className="bz-section"
          >
            <SectionHeader
              title={`${octEditionMeta.title} · ${octEditionMeta.edition} · ${octEditionMeta.date}`}
            />

            <p className="bz-section-intro">
              Business stories from the edition: the global economy and finance,
              corporate deals, and industry moves in automotive and aerospace.
            </p>

            <div className="bz-edition">
              {octCards.map((story) => (
                <Link
                  key={story.id}
                  to={story.path}
                  className="bz-card bz-edition-card"
                >
                  <div className="bz-card-img">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full"
                    />
                  </div>

                  <span className="bz-kicker" style={{ marginTop: 14 }}>
                    {story.label}
                  </span>

                  <h3 className="bz-card-title">{story.title}</h3>

                  <p className="bz-card-lede">{story.lede}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* =================================================
              NUMBERS AT A GLANCE
          ================================================= */}

          <section className="bz-section">
            <SectionHeader title="Numbers at a Glance" />

            <p className="bz-section-intro" style={{ marginTop: -8 }}>
              {octEditionMeta.edition} · {octEditionMeta.date}
            </p>

            <div className="bz-glance">
              {businessGlance.map((item) => (
                <div key={item.indicator} className="bz-glance-item">
                  <span className="bz-glance-label">{item.indicator}</span>

                  <span className="bz-glance-figure">{item.figure}</span>

                  <span className="bz-glance-source">{item.source}</span>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              GLOBAL CORPORATE NEWS DIGEST — EDITION 1: M&A
          ================================================= */}

          <section
            aria-label="Global Corporate News Digest Edition 1: Mergers and Acquisitions"
            className="bz-section"
          >
            <SectionHeader
              title={`Global Corporate News Digest · ${maEdition1Meta.edition} · Headlines by Industry`}
              link="/mergers-acquisitions"
              linkText="M&A Hub"
            />

            <p className="bz-section-intro" style={{ marginTop: -8 }}>
              {maEdition1Meta.subtitle}{" "}
              <span style={{ color: "#9a9a9a" }}>
                {maEdition1Meta.prepared}. {maEdition1Meta.note}
              </span>
            </p>

            {maLead && (
              <Link to={maEdition1ArticlePath(maLead)} className="bz-ma-lead">
                <ImageWithFallback
                  src={maLead.image}
                  alt={maLead.title}
                  className="bz-ma-lead-img"
                />

                <div className="bz-ma-lead-shade" />

                <div className="bz-ma-lead-body">
                  <span className="bz-kicker" style={{ color: "#ff5a5f" }}>
                    {maLead.section} · {maEdition1Meta.edition}
                  </span>

                  <h3 className="bz-ma-lead-title">{maLead.title}</h3>

                  <p className="bz-ma-lead-lede">{maLead.lede}</p>
                </div>
              </Link>
            )}

            {maIndustries.map((group) => (
              <div key={group.name} className="bz-ma-group">
                <div className="bz-ma-group-head">
                  <h3 className="bz-ma-group-title">{group.name}</h3>

                  <span className="bz-ma-group-count">
                    {group.stories.length} stories
                  </span>
                </div>

                <div className="bz-ma-grid">
                  {group.stories.map((story) => {
                    const chip = maValueChip(story);

                    return (
                      <Link
                        key={story.id}
                        to={maEdition1ArticlePath(story)}
                        className="bz-card"
                      >
                        <div className="bz-card-img">
                          <ImageWithFallback
                            src={story.image}
                            alt={story.title}
                            className="w-full h-full"
                          />
                        </div>

                        {chip && <span className="bz-value-chip">{chip.value}</span>}

                        <h4 className="bz-card-title">{story.title}</h4>

                        <p className="bz-card-lede">{story.lede}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* DEAL STATUS TRACKER */}

            <details className="bz-details" style={{ marginTop: 28 }}>
              <summary>
                Deal status table (as of the early August 2026 tracker update)
              </summary>

              <div className="bz-table-wrap">
                <table className="bz-table">
                  <thead>
                    <tr>
                      <th>Deal</th>
                      <th>Value</th>
                      <th>Announced</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {maEdition1DealTable.map((row) => (
                      <tr key={row.deal}>
                        <td className="is-strong">{row.deal}</td>
                        <td>{row.value}</td>
                        <td>{row.announced}</td>
                        <td>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="bz-table-note">{maEdition1Sources}</p>
            </details>
          </section>

          <PrideTimesAd slot="5608262547" format="fluid" layoutKey="-ef+6k-30-ac+ty" />

          {/* =================================================
              ALL BUSINESS NEWS + MAGAZINE
          ================================================= */}

          <section className="bz-latest">
            {/* LATEST NEWS (every business story) */}

            <div ref={newsListRef} className="min-w-0 scroll-mt-24">
              <SectionHeader title="All Business News" />

              <div className="bz-tabs">
                {latestNewsTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => selectTab(tab)}
                    className={`bz-filter ${activeNewsTab === tab ? "is-active" : ""}`}
                  >
                    {tab}
                    <span className="bz-filter-count">{tabCount(tab)}</span>
                  </button>
                ))}
              </div>

              <div className="bz-news-list">
                {latestStories.length === 0 && (
                  <p className="bz-empty">No stories in this category yet.</p>
                )}

                {latestStories.map((story) => (
                  <Link key={story.id} to={story.path} className="bz-news-item">
                    <div className="bz-news-img">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="bz-kicker-row">
                        <span>{story.label}</span>

                        {story.location && (
                          <>
                            <span className="bz-sep">•</span>
                            <span className="bz-loc" style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                              <MapPin size={9} />
                              {story.location}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="bz-news-title">{story.title}</h3>

                      <p className="bz-news-lede">{story.lede}</p>

                      <div className="bz-news-meta">
                        <Clock size={9} />
                        <span>{story.when}</span>
                        {story.readTime && <span>· {story.readTime}</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div className="bz-more">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((count) =>
                        Math.min(count + PAGE_SIZE, filteredStories.length)
                      )
                    }
                    className="bz-more-btn"
                  >
                    Show more stories
                  </button>

                  <span className="bz-more-count">
                    Showing {latestStories.length} of {filteredStories.length}
                  </span>
                </div>
              )}
            </div>

            {/* MAGAZINE */}

            <div>
              <SectionHeader title="Magazine" link="/magazine" />

              <Link to="/magazine" className="bz-mag">
                <div className="bz-mag-img">
                  <ImageWithFallback
                    src={magazinePreview.image}
                    alt={magazinePreview.title}
                    className="w-full"
                  />
                </div>

                <div className="bz-mag-body">
                  <span className="bz-mag-kicker">Pride Times Magazine</span>

                  <h3 className="bz-mag-title">{magazinePreview.title}</h3>

                  <p className="bz-mag-sub">{magazinePreview.subtitle}</p>

                  <span className="bz-mag-cta">
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

          <section className="bz-section" style={{ borderBottom: "none" }}>
            <SectionHeader title="The Numbers Behind the Headlines" />

            <details className="bz-details">
              <summary>Corporate Earnings</summary>

              <div className="bz-table-wrap">
                <table className="bz-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th className="is-num">EPS</th>
                      <th className="is-num">vs Est.</th>
                      <th className="is-num">Revenue</th>
                      <th className="is-num">Result</th>
                    </tr>
                  </thead>

                  <tbody>
                    {earningsNews.map((e) => (
                      <tr key={e.ticker}>
                        <td>
                          <span className="is-strong">{e.company}</span>
                          <span style={{ marginLeft: 6, color: "#9a9a9a" }}>
                            ({e.ticker})
                          </span>
                        </td>
                        <td className="is-num">{e.eps}</td>
                        <td
                          className={`is-num ${
                            e.status === "BEAT" ? "is-beat" : "is-miss"
                          }`}
                        >
                          {e.beat}
                        </td>
                        <td className="is-num">{e.revenue}</td>
                        <td className="is-num">
                          <span className={earningsBadge[e.status]}>{e.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>

            <details className="bz-details">
              <summary>Deals &amp; Capital</summary>

              <div className="bz-table-wrap">
                <table className="bz-table">
                  <thead>
                    <tr>
                      <th>Acquirer</th>
                      <th>Target</th>
                      <th className="is-num">Value</th>
                      <th className="hide-sm">Sector</th>
                      <th className="is-num">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {maDeals.map((d) => (
                      <tr key={d.id}>
                        <td className="is-strong">{d.acquirer}</td>
                        <td>{d.target}</td>
                        <td className="is-num is-strong">{d.value}</td>
                        <td className="hide-sm" style={{ color: "#8a8a8a" }}>
                          {d.sector}
                        </td>
                        <td className="is-num">
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
