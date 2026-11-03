import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, MapPin } from "lucide-react";
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
   FRONT-PAGE PICKS (same structure as the homepage)
========================================================= */

const leadStory = allCards[0];
const majorStories = [allCards[1], allCards[2]].filter(
  Boolean
) as NewsCard[];
const editorsPick = allCards[3] ?? allCards[0];

const featuredIds = new Set(
  [leadStory, ...majorStories, editorsPick]
    .filter(Boolean)
    .map((card) => card.id)
);

const sidebarStories = allCards
  .filter((card) => !featuredIds.has(card.id))
  .slice(0, 6);

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
}: {
  title: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
        {title}
      </h2>

      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-red-600 hover:underline"
        >
          {linkText}
          <ArrowRight size={10} />
        </Link>
      )}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
      {children}
    </span>
  );
}

function TimeStamp({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[10px] text-gray-400">
      <Clock size={9} />
      {children}
    </span>
  );
}

/* =========================================================
   INTERNATIONAL NEWS PAGE
========================================================= */

export function InternationalNewsPage() {
  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const newsListRef = useRef<HTMLDivElement | null>(null);

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

  const openRegionFeed = (tab: string) => {
    selectTab(tab);

    window.requestAnimationFrame(() => {
      newsListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  if (!leadStory) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">
        No international stories available right now.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* =================================================
              1. TOP SECTION
          ================================================= */}

          <section className="mb-10 border-b border-gray-300 pb-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0">
              {/* LEFT: top headlines (text only) */}

              <aside className="order-2 min-w-0 lg:order-1 lg:col-span-3 lg:border-r lg:border-gray-200 lg:pr-6">
                <div className="mb-1 border-t-[3px] border-black pt-2">
                  <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                    Top Stories
                  </h2>
                </div>

                <ul className="divide-y divide-gray-200">
                  {sidebarStories.slice(0, 4).map((story) => (
                    <li key={story.id}>
                      <Link to={story.path} className="group block py-3.5">
                        <Kicker>{story.label}</Kicker>

                        <h3 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                          {story.title}
                        </h3>

                        <div className="mt-1.5">
                          <TimeStamp>{story.when}</TimeStamp>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* CENTER: lead story */}

              <div className="order-1 min-w-0 lg:order-2 lg:col-span-6 lg:px-6">
                <Link to={leadStory.path} className="group block">
                  <div className="relative overflow-hidden rounded-sm bg-black">
                    <ImageWithFallback
                      src={leadStory.image}
                      alt={leadStory.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-4">
                    <Kicker>
                      {leadStory.label}
                      {leadStory.location ? ` · ${leadStory.location}` : ""}
                    </Kicker>

                    <h1 className="mt-1.5 font-serif text-[28px] font-bold leading-[1.1] text-gray-950 group-hover:underline md:text-[38px]">
                      {leadStory.title}
                    </h1>

                    <p className="mt-3 text-[15px] leading-[1.55] text-gray-600">
                      {leadStory.lede}
                    </p>

                    <div className="mt-3">
                      <TimeStamp>
                        {leadStory.when}
                        {leadStory.readTime ? ` · ${leadStory.readTime}` : ""}
                      </TimeStamp>
                    </div>
                  </div>
                </Link>

                <div className="mt-6 grid grid-cols-1 gap-6 border-t border-gray-200 pt-5 sm:grid-cols-2">
                  {majorStories.map((story) => (
                    <Link key={story.id} to={story.path} className="group block">
                      <div className="overflow-hidden rounded-sm">
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="mt-2.5">
                        <Kicker>{story.label}</Kicker>

                        <h3 className="mt-1 font-serif text-[19px] font-bold leading-[1.2] text-gray-950 group-hover:underline">
                          {story.title}
                        </h3>

                        <div className="mt-1.5">
                          <TimeStamp>{story.when}</TimeStamp>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* RIGHT: regions panel + editor's pick */}

              <aside className="order-3 min-w-0 lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-6">
                <div className="rounded-sm bg-black p-4 text-white">
                  <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
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

                <div className="mt-6">
                  <div className="mb-3 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                      Editor's Pick
                    </h2>

                    <Link
                      to={editorsPick.path}
                      className="text-[10px] font-semibold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      Read more
                    </Link>
                  </div>

                  <Link to={editorsPick.path} className="group block">
                    <div className="overflow-hidden rounded-sm">
                      <ImageWithFallback
                        src={editorsPick.image}
                        alt={editorsPick.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-2.5">
                      <Kicker>{editorsPick.label}</Kicker>

                      <h3 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                        {editorsPick.title}
                      </h3>

                      <p className="mt-1.5 text-[12px] leading-[1.5] text-gray-500 line-clamp-2">
                        {editorsPick.lede}
                      </p>
                    </div>
                  </Link>
                </div>
              </aside>
            </div>
          </section>

          <PrideTimesAd slot="8042854193" format="fluid" layout="in-article" />

          {/* =================================================
              2. LATEST NEWS
          ================================================= */}

          <section aria-label="Latest international news" className="mb-12">
            <SectionHeader title="Latest International News" />

            <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {allCards.slice(0, 6).map((story, index) => (
                <li key={story.id} className="border-b border-gray-200">
                  <Link to={story.path} className="group flex gap-3 py-3.5">
                    <span className="w-6 shrink-0 font-serif text-[22px] font-bold leading-none tabular-nums text-gray-300">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <Kicker>
                        {story.label}
                        {story.location ? ` · ${story.location}` : ""}
                      </Kicker>

                      <span className="mt-1 block font-serif text-[16px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                        {story.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.9fr_0.7fr]">
              {/* ---------- Feed ---------- */}

              <div ref={newsListRef} className="scroll-mt-24 min-w-0">
                <SectionHeader title="More International Stories" />

                <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                  {latestNewsTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => selectTab(tab)}
                      className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide transition-colors ${
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
                      className="group grid grid-cols-[110px_1fr] gap-4 py-5 sm:grid-cols-[200px_1fr] sm:gap-5"
                    >
                      <div className="h-[80px] w-full overflow-hidden rounded-sm sm:h-[126px]">
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
                            {story.label}
                          </span>

                          {story.location && (
                            <>
                              <span className="text-[10px] text-gray-300">•</span>
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                                <MapPin size={9} />
                                {story.location}
                              </span>
                            </>
                          )}
                        </div>

                        <h3 className="mt-1 font-serif text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline sm:text-[21px]">
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
                      className="rounded-sm border border-black px-6 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-black hover:text-white"
                    >
                      Show more stories
                    </button>

                    <span className="text-[10px] text-gray-400">
                      Showing {latestStories.length} of {filteredStories.length}
                    </span>
                  </div>
                )}
              </div>

              {/* ---------- Magazine (sticky) ---------- */}

              <div className="min-w-0">
                <div className="lg:sticky lg:top-24">
                  <SectionHeader title="Magazine" link="/magazine" />

                  <Link
                    to="/magazine"
                    className="group block overflow-hidden rounded-sm bg-black"
                  >
                    <div className="overflow-hidden">
                      <ImageWithFallback
                        src={magazinePreview.image}
                        alt={magazinePreview.title}
                        className="h-[210px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="p-4">
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">
                        Pride Times Magazine
                      </span>

                      <h3 className="mt-1 font-serif text-xl font-bold text-white">
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
                    <PrideTimesAd slot="6810700989" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              3. GLOBAL MARKETS (shared component)
          ================================================= */}

          <section aria-label="Global markets" className="mb-12">
            <SectionHeader title="Global Markets" link="/markets" linkText="All Markets" />

            <MarketSnapshot
              tabs={["Indices", "Commodities", "Currencies"]}
              title="Market Snapshot"
            />
          </section>

          {/* =================================================
              4. REGIONAL COVERAGE (one group per region)
          ================================================= */}

          <section aria-label="Regional coverage" className="mb-12">
            <SectionHeader title="Regional Coverage" />

            <div className="space-y-10">
              {regionGroups.map((group) => (
                <div key={group.name}>
                  <div className="mb-4 flex items-baseline justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-gray-950">
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

                  <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                    {group.stories.slice(0, 4).map((story) => (
                      <Link key={story.id} to={story.path} className="group block">
                        <div className="aspect-[16/10] w-full overflow-hidden rounded-sm bg-gray-100">
                          <ImageWithFallback
                            src={story.image}
                            alt={story.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <span className="mt-2.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                          {story.when}
                        </span>

                        <h4 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                          {story.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <PrideTimesAd slot="5373718974" />

          {/* =================================================
              5. BROWSE BY REGION
          ================================================= */}

          <section>
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
                      className="w-fit text-left text-[12px] font-bold uppercase tracking-[0.12em] text-gray-950 hover:underline"
                    >
                      {group.name}
                    </button>

                    {top && (
                      <Link to={top.path} className="group mt-2 block">
                        <span className="block font-serif text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline line-clamp-4">
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
