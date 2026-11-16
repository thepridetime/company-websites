import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import MagazineImg from "../../../imports/pt30image.png";
import worldLeaders from "../../../imports/pt-world-leaders.png";
import globalMarkets from "../../../imports/pt-global-markets.png";
import digitalEconomy from "../../../imports/pt-digital-economy.png";
import supplyChainMap from "../../../imports/supply-chain-map.png";
import coverStory from "../../../imports/Coverstory.png";

import { MarketSnapshot } from "../market/MarketSnapshot";
import {
  specialArticles,
  specialArticlePath,
} from "../../data/specialArticleData";
import {
  digestArticles,
  digestArticlePath,
} from "../../data/digestArticleData";

/* =========================================================
   AD SLOTS
   Existing ad units are reused for the new placements below.
   For best fill, create a new ad unit in AdSense for each
   "extra" placement and paste its slot ID here.
========================================================= */

const AD_SLOTS = {
  topBand: "5373718974",
  inArticle: "8042854193",
  digest: "5608262547",
  bottom: "6810700989",
  extra1: "5373718974", // after Latest International News
  extra2: "6810700989", // after Global Markets
  extra3: "8042854193", // after Regional Coverage
  extra4: "5373718974", // beside the magazine
  extra5: "6810700989", // after Browse by Region
} as const;

/* =========================================================
   TYPES
========================================================= */

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
   STORY DATA (unchanged sources)
   1. International Business (specialArticleData "international-*")
   2. Regional desks: Europe, Asia-Pacific, Americas, Middle East
      and Africa (specialArticleData "international-*")
   3. Regional Roundup from the Global Corporate News Digest
   Technology-company stories are not international news and are
   left out.
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
   FRONT-PAGE PICKS
========================================================= */

const leadStory = allCards[0];
const majorStories = [allCards[1], allCards[2]].filter(
  Boolean
) as NewsCard[];
const editorsPick = allCards[3] ?? allCards[0];
const interviewStory = allCards[4] ?? allCards[0];
const interviewRelated = allCards[5] ?? allCards[0];

const featuredIds = new Set(
  [leadStory, ...majorStories, editorsPick, interviewStory]
    .filter(Boolean)
    .map((card) => card.id)
);

const sidebarStories = allCards
  .filter((card) => !featuredIds.has(card.id))
  .slice(0, 6);

/* Trending Now: four shown by default, the rest on "View all". */
const TRENDING_DEFAULT = 4;
const trendingAll = allCards.slice(6);

/* Newsletter strip: international stories, three shown at a time. */
const PROMO_VISIBLE = 3;
const promoStories = allCards.slice(0, 6);

/* Region order for the filter tabs and the region groups. */
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
   SMALL UI PIECES (same as homepage)
========================================================= */

function SectionHeader({
  title,
  link,
  linkText = "View All",
  onClick,
}: {
  title: string;
  link?: string;
  linkText?: string;
  onClick?: () => void;
}) {
  const linkClass =
    "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline";

  return (
    <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
        {title}
      </h2>

      {onClick ? (
        <button type="button" onClick={onClick} className={linkClass}>
          {linkText}
          <ArrowRight size={10} />
        </button>
      ) : (
        link && (
          <Link to={link} className={linkClass}>
            {linkText}
            <ArrowRight size={10} />
          </Link>
        )
      )}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-red-600">
      {children}
    </span>
  );
}

function TimeStamp({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-gray-400">
      <Clock size={9} />
      {children}
    </span>
  );
}

/* Related box used under feature stories (same as homepage). */

function RelatedBox({
  items,
}: {
  items: { id: string; title: string; href: string }[];
}) {
  return (
    <div className="mt-4 border border-gray-200">
      <div className="border-b border-gray-200 px-3 py-1.5 text-[11px] text-gray-500">
        Related
      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={item.href}
              className="block px-3 py-2.5 text-[14px] font-bold leading-[1.3] text-gray-950 hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================================================
   INTERNATIONAL NEWS PAGE
========================================================= */

export function InternationalNewsPage() {
  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [promoStart, setPromoStart] = useState(0);
  const [showAllTrending, setShowAllTrending] = useState(false);

  const newsListRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Newsletter strip ---------- */

  const visiblePromos = Array.from(
    { length: Math.min(PROMO_VISIBLE, promoStories.length) },
    (_, i) => promoStories[(promoStart + i) % promoStories.length]
  );

  const showPrevPromo = () =>
    setPromoStart(
      (s) => (s - 1 + promoStories.length) % promoStories.length
    );
  const showNextPromo = () =>
    setPromoStart((s) => (s + 1) % promoStories.length);

  /* ---------- Latest news filtering ---------- */

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

  const scrollToFeed = () => {
    newsListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const openRegionFeed = (tab: string) => {
    selectTab(tab);

    window.requestAnimationFrame(() => {
      scrollToFeed();
    });
  };

  /* ---------- Trending Now ---------- */

  const trendingStrip = showAllTrending
    ? trendingAll
    : trendingAll.slice(0, TRENDING_DEFAULT);

  const trendingHasMore = trendingAll.length > TRENDING_DEFAULT;

  /* ---------- Related boxes ---------- */

  const relatedFeature = sidebarStories.slice(0, 2).map((s) => ({
    id: s.id,
    title: s.title,
    href: s.path,
  }));

  const relatedLead = sidebarStories.slice(2, 4).map((s) => ({
    id: s.id,
    title: s.title,
    href: s.path,
  }));

  if (!leadStory) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">
        No international stories available right now.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="w-full px-4 md:px-6 xl:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* =================================================
              PAGE HEADING
          ================================================= */}

          <header className="mb-6 border-b border-gray-200 pb-4">
            <h1 className="text-[28px] font-extrabold tracking-tight text-gray-950 md:text-[36px]">
              International News
            </h1>
          </header>

          {/* =================================================
              0. NEWSLETTER STRIP
          ================================================= */}

          <div className="mb-5 flex items-stretch gap-6 border-y border-gray-200 py-3">
            <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 md:grid-cols-3">
              {visiblePromos.map((promo) => (
                <Link
                  key={promo.id}
                  to={promo.path}
                  className="group flex items-center gap-3"
                >
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <ImageWithFallback
                      src={promo.image}
                      alt={promo.label}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[12px] text-gray-500">{promo.label}</p>
                    <p className="line-clamp-1 text-[13px] font-semibold text-gray-950 group-hover:underline">
                      {promo.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 pl-2">
              <button
                type="button"
                aria-label="Show previous stories"
                onClick={showPrevPromo}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-black hover:text-black"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Show next stories"
                onClick={showNextPromo}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-black hover:text-black"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* =================================================
              1. TOP BAND — 3 columns
                 LEFT   : feature story + Related
                 CENTRE : lead story + Related
                 RIGHT  : Regions panel + Editor's Pick
          ================================================= */}

          <section className="grid grid-cols-1 items-stretch gap-0 border border-gray-200 md:grid-cols-2 lg:grid-cols-12">
            {/* ---------- LEFT: feature story ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-6 lg:col-span-4 lg:border-b-0 lg:border-r">
              {majorStories[0] && (
                <Link to={majorStories[0].path} className="group block">
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={majorStories[0].image}
                      alt={majorStories[0].title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <Kicker>
                    {majorStories[0].label}
                    {majorStories[0].location
                      ? ` · ${majorStories[0].location}`
                      : ""}
                  </Kicker>

                  <h2 className="mt-2 line-clamp-3 text-[26px] font-extrabold leading-[1.12] text-gray-950 group-hover:underline md:text-[28px]">
                    {majorStories[0].title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                    {majorStories[0].lede}
                  </p>

                  <div className="mt-3">
                    <TimeStamp>{majorStories[0].when}</TimeStamp>
                  </div>
                </Link>
              )}

              <div className="mt-auto">
                <RelatedBox items={relatedFeature} />
              </div>
            </div>

            {/* ---------- CENTRE: lead story ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-6 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link to={leadStory.path} className="group block">
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <Kicker>
                  {leadStory.label}
                  {leadStory.location ? ` · ${leadStory.location}` : ""}
                </Kicker>

                <h2 className="mt-2 line-clamp-3 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[26px]">
                  {leadStory.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {leadStory.lede}
                </p>

                <div className="mt-3">
                  <TimeStamp>
                    {leadStory.when}
                    {leadStory.readTime ? ` · ${leadStory.readTime}` : ""}
                  </TimeStamp>
                </div>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={relatedLead} />
              </div>
            </div>

            {/* ---------- RIGHT: regions panel + editor's pick ---------- */}

            <aside className="flex flex-col p-6 md:col-span-2 lg:col-span-4">
              <div className="rounded-md bg-black p-4 text-white">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em]">
                    Regions
                  </h2>
                </div>

                <div className="divide-y divide-white/10">
                  {regionGroups.map((group) => (
                    <button
                      key={group.name}
                      type="button"
                      onClick={() => openRegionFeed(group.name)}
                      className="flex w-full items-center justify-between py-2.5 text-left"
                    >
                      <span className="text-[12px] font-semibold text-gray-100">
                        {group.name}
                      </span>
                      <span className="text-[11px] tabular-nums text-gray-400">
                        {group.stories.length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                  <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
                    Editor's Pick
                  </h2>

                  <Link
                    to={editorsPick.path}
                    className="border border-gray-300 px-3 py-1 text-[11px] font-semibold text-gray-700 hover:border-black hover:text-black"
                  >
                    Read more
                  </Link>
                </div>

                <Link to={editorsPick.path} className="group block">
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={editorsPick.image}
                      alt={editorsPick.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-2.5">
                    <Kicker>{editorsPick.label}</Kicker>

                    <h3 className="mt-1 line-clamp-2 text-[18px] font-extrabold leading-[1.25] text-gray-950 group-hover:underline">
                      {editorsPick.title}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.5] text-gray-500">
                      {editorsPick.lede}
                    </p>
                  </div>
                </Link>
              </div>
            </aside>
          </section>

          <PrideTimesAd slot={AD_SLOTS.topBand} />

          {/* =================================================
              2. INTERVIEW ROW — image left, story right
          ================================================= */}

          <section className="mt-0 grid grid-cols-1 items-stretch gap-0 border-x border-b border-gray-200 lg:grid-cols-12">
            <Link
              to={interviewStory.path}
              className="group block overflow-hidden bg-gray-100 lg:col-span-6"
            >
              <ImageWithFallback
                src={interviewStory.image}
                alt={interviewStory.title}
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </Link>

            <div className="flex flex-col justify-center p-6 lg:col-span-6 lg:p-12">
              <Kicker>{interviewStory.label}</Kicker>

              <Link to={interviewStory.path} className="group block">
                <h2 className="mt-2 line-clamp-3 text-[28px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[32px]">
                  {interviewStory.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-gray-600">
                  {interviewStory.lede}
                </p>
              </Link>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <Link to={interviewRelated.path} className="group block">
                  <span className="block text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline line-clamp-2">
                    {interviewRelated.title}
                  </span>
                </Link>
              </div>
            </div>
          </section>

          {/* =================================================
              3. TRENDING NOW — image cards, expandable
          ================================================= */}

          {trendingAll.length > 0 && (
            <section className="mt-16 mb-16">
              <SectionHeader
                title="Trending Now"
                onClick={
                  trendingHasMore
                    ? () => setShowAllTrending((value) => !value)
                    : undefined
                }
                linkText={showAllTrending ? "Show less" : "View all"}
              />

              <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {trendingStrip.map((story) => (
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

                      <div className="mt-auto pt-1.5">
                        <TimeStamp>{story.when}</TimeStamp>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <PrideTimesAd slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" />

          {/* =================================================
              4. LATEST INTERNATIONAL NEWS — numbered list
          ================================================= */}

          <section aria-label="Latest international news" className="mb-16">
            <SectionHeader
              title="Latest International News"
              onClick={scrollToFeed}
              linkText="See all"
            />

            <ol className="grid grid-cols-1 items-stretch gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {allCards.slice(0, 6).map((story, index) => (
                <li key={story.id} className="border-b border-gray-200">
                  <Link to={story.path} className="group flex h-full gap-4 py-5">
                    <span className="w-6 shrink-0 text-[22px] font-extrabold leading-none tabular-nums text-gray-300">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <Kicker>
                        {story.label}
                        {story.location ? ` · ${story.location}` : ""}
                      </Kicker>

                      <span className="mt-1 line-clamp-2 block text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                        {story.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          {/* =================================================
              5. GLOBAL MARKETS (shared component)
          ================================================= */}

          <section aria-label="Global markets" className="mb-16">
            <SectionHeader
              title="Global Markets"
              link="/markets"
              linkText="All Markets"
            />

            <MarketSnapshot
              tabs={["Indices", "Commodities", "Currencies"]}
              title="Market Snapshot"
            />
          </section>

          <PrideTimesAd slot={AD_SLOTS.extra1} format="fluid" layout="in-article" />

          {/* =================================================
              6. REGIONAL COVERAGE (one group per region)
          ================================================= */}

          <section aria-label="Regional coverage" className="mb-16">
            <SectionHeader title="Regional Coverage" />

            <div className="space-y-12">
              {regionGroups.map((group) => (
                <div key={group.name}>
                  <div className="mb-5 flex items-baseline justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
                      {group.name}
                    </h3>

                    <button
                      type="button"
                      onClick={() => openRegionFeed(group.name)}
                      className="text-[10px] font-semibold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      {group.stories.length}{" "}
                      {group.stories.length === 1 ? "story" : "stories"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {group.stories.slice(0, 4).map((story) => (
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
                          <Kicker>{story.when}</Kicker>

                          <h4 className="mt-1 line-clamp-2 min-h-[2.56em] text-[16px] font-bold leading-[1.28] text-gray-950 group-hover:underline">
                            {story.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <PrideTimesAd slot={AD_SLOTS.extra2} />

          {/* =================================================
              7. MORE INTERNATIONAL STORIES + MAGAZINE
          ================================================= */}

          <section className="mb-16">
            <SectionHeader
              title="More International Stories"
              onClick={scrollToFeed}
              linkText="See all"
            />

            <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[1.9fr_0.7fr]">
              {/* ---------- Feed ---------- */}

              <div ref={newsListRef} className="scroll-mt-24 min-w-0">
                <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                  {latestNewsTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => selectTab(tab)}
                      className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-wide transition-colors ${
                        activeNewsTab === tab
                          ? "border-b-2 border-black pb-1 text-black"
                          : "pb-1 text-gray-400 hover:text-gray-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="divide-y divide-gray-200">
                  {latestStories.length === 0 && (
                    <p className="py-6 text-[12px] text-gray-400">
                      No stories in this region yet.
                    </p>
                  )}

                  {latestStories.map((story) => (
                    <Link
                      key={story.id}
                      to={story.path}
                      className="group grid grid-cols-[110px_1fr] items-start gap-4 py-7 sm:grid-cols-[200px_1fr] sm:gap-6"
                    >
                      <div className="h-[80px] w-full overflow-hidden rounded-md bg-gray-100 sm:h-[126px]">
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

                        <p className="mt-1.5 hidden text-[13px] leading-[1.5] text-gray-500 line-clamp-2 sm:block">
                          {story.lede}
                        </p>

                        <div className="mt-1.5">
                          <TimeStamp>
                            {story.when}
                            {story.readTime ? ` · ${story.readTime}` : ""}
                          </TimeStamp>
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

                <PrideTimesAd slot={AD_SLOTS.extra3} format="fluid" layout="in-article" />
              </div>

              {/* ---------- Magazine (sticky) ---------- */}

              <div className="min-w-0">
                <div className="lg:sticky lg:top-24 lg:pt-1">
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

                  <div className="mt-8">
                    <PrideTimesAd slot={AD_SLOTS.extra4} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              8. BROWSE BY REGION
          ================================================= */}

          <section className="mb-16">
            <SectionHeader title="Browse by Region" />

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
              {regionGroups.map((group) => {
                const top = group.stories[0];

                return (
                  <div
                    key={group.name}
                    className="flex flex-col border-b border-gray-200 py-4"
                  >
                    <button
                      type="button"
                      onClick={() => openRegionFeed(group.name)}
                      className="w-fit text-left text-[12px] font-extrabold uppercase tracking-[0.04em] text-gray-950 hover:underline"
                    >
                      {group.name}
                    </button>

                    {top && (
                      <Link to={top.path} className="group mt-2 block">
                        <span className="line-clamp-4 block text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                          {top.title}
                        </span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => openRegionFeed(group.name)}
                      className="mt-3 w-fit text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      {group.stories.length}{" "}
                      {group.stories.length === 1 ? "story" : "stories"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <PrideTimesAd slot={AD_SLOTS.extra5} />

          <PrideTimesAd slot={AD_SLOTS.bottom} />
        </main>
      </div>

      {/* Local page utilities */}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(227, 27, 35, 0.12); color: inherit; }
      `}</style>
    </div>
  );
}

export default InternationalNewsPage;
