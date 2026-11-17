import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, ArrowRight, MapPin, ChevronRight } from "lucide-react";

import { getQuotes } from "../../../services/marketApi";
import { PrideTimesAd } from "./HomePage";
import {
  defaultFeaturedStartup,
  defaultStartupWatch,
  defaultTopStartupStories,
  defaultStartupMetrics,
  defaultFundedStartups,
  defaultLatestStartupNews,
  type StartupStory,
} from "../../data/startupData";

/* =========================================================
   TYPES
========================================================= */

type MarketItem = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

type MarketTab = "Indices" | "Crypto";

type StoryLike = { id: string; title: string; url?: string };

/* =========================================================
   DATA (startup content, unchanged)
========================================================= */

const storyHref = (story: { id: string; url?: string }) =>
  story.url || `/article/${story.id}`;

const storyCount = (n: number) => `${n} ${n === 1 ? "story" : "stories"}`;

const PAGE_SIZE = 8;

// Every unique startup story across the data file
const allStories: StartupStory[] = Array.from(
  new Map(
    [
      defaultFeaturedStartup,
      defaultStartupWatch,
      ...defaultTopStartupStories,
      ...defaultLatestStartupNews,
    ].map((story) => [story.id, story] as const)
  ).values()
);

const leadStory = defaultFeaturedStartup;
const majorStories = [defaultStartupWatch, defaultTopStartupStories[1]].filter(
  Boolean
) as StartupStory[];
const editorsPick = defaultTopStartupStories[0] ?? defaultStartupWatch;
const sideHeadlines = [...defaultTopStartupStories, ...defaultLatestStartupNews].slice(0, 4);
const deepDiveStory = defaultTopStartupStories[1] ?? defaultStartupWatch;

const categoryNames = Array.from(new Set(allStories.map((s) => s.category)));
const newsTabs = ["All", ...categoryNames];

const categoryGroups = categoryNames.map((name) => ({
  name,
  stories: allStories.filter((s) => s.category === name),
}));

/* =========================================================
   SMALL UI PIECES (same look as the homepage)
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
  const linkClass =
    "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline";

  return (
    <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
        {title}
      </h2>

      {link && (
        <Link to={link} className={linkClass}>
          {linkText}
          <ArrowRight size={10} />
        </Link>
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

/* Related box used under the feature story (homepage style) */

function RelatedBox({ items }: { items: StoryLike[] }) {
  return (
    <div className="mt-4 border border-gray-200">
      <div className="border-b border-gray-200 px-3 py-1.5 text-[11px] text-gray-500">
        Related
      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={storyHref(item)}
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
   STARTUP SUCCESS PAGE
========================================================= */

export function StartupSuccessPage() {
  const [activeMarketTab, setActiveMarketTab] = useState<MarketTab>("Indices");
  const [liveMarket, setLiveMarket] = useState<Record<MarketTab, MarketItem[]> | null>(null);

  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const newsListRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Market data (live, with a static fallback) ---------- */

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const data = await getQuotes();

        setLiveMarket({
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

  const marketRows: MarketItem[] = liveMarket?.[activeMarketTab] ?? [];

  /* ---------- Latest news filtering ---------- */

  const filteredStories = useMemo(
    () =>
      activeNewsTab === "All"
        ? allStories
        : allStories.filter((story) => story.category === activeNewsTab),
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

  const openCategoryFeed = (name: string) => {
    selectTab(name);

    window.requestAnimationFrame(() => {
      newsListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="w-full px-4 md:px-6 xl:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* =================================================
              1. TOP BAND — 3 columns
                 LEFT   : lead story + Related
                 CENTRE : two major stories
                 RIGHT  : Startup Metrics + Editor's Pick
          ================================================= */}

          <section className="grid grid-cols-1 items-stretch gap-0 border border-gray-200 md:grid-cols-2 lg:grid-cols-12">
            {/* ---------- LEFT: lead story ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-6 lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link to={storyHref(leadStory)} className="group block">
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-5">
                  <Kicker>{leadStory.category}</Kicker>
                </div>

                <h1 className="mt-2 line-clamp-3 text-[26px] font-extrabold leading-[1.12] text-gray-950 group-hover:underline md:text-[28px]">
                  {leadStory.title}
                </h1>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {leadStory.summary}
                </p>

                <div className="mt-2">
                  <TimeStamp>
                    {leadStory.publishedAt} · {leadStory.readTime}
                  </TimeStamp>
                </div>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={sideHeadlines} />
              </div>
            </div>

            {/* ---------- CENTRE: major stories ---------- */}

            <div className="flex flex-col gap-8 border-b border-gray-200 p-6 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r">
              {majorStories.map((story) => (
                <Link key={story.id} to={storyHref(story)} className="group block">
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-4">
                    <Kicker>{story.category}</Kicker>

                    <h3 className="mt-1.5 line-clamp-2 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[26px]">
                      {story.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-[14px] leading-[1.5] text-gray-500">
                      {story.summary}
                    </p>

                    <div className="mt-2">
                      <TimeStamp>{story.publishedAt}</TimeStamp>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ---------- RIGHT: startup metrics + editor's pick ---------- */}

            <aside className="flex flex-col p-6 md:col-span-2 lg:col-span-4">
              <div className="rounded-md bg-black p-5 text-white">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em]">
                    Startup Metrics
                  </h2>
                </div>

                <div className="divide-y divide-white/10">
                  {defaultStartupMetrics.slice(0, 4).map((metric) => {
                    const negative = metric.change.trim().startsWith("↓");

                    return (
                      <div
                        key={metric.id}
                        className="flex items-center justify-between gap-3 py-3"
                      >
                        <div className="min-w-0">
                          <span className="block text-[12px] font-semibold tabular-nums text-gray-100">
                            {metric.value}
                          </span>
                          <span className="block text-[11px] leading-snug text-gray-400">
                            {metric.label}
                          </span>
                        </div>

                        <span
                          className={`shrink-0 text-[12px] font-semibold tabular-nums ${
                            negative ? "text-red-400" : "text-emerald-400"
                          }`}
                        >
                          {metric.change}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Editor's pick */}

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[15px] font-extrabold text-gray-950">
                    Editor's Pick
                  </h2>

                  <Link
                    to="/technology"
                    className="border border-gray-300 px-3 py-1 text-[11px] font-semibold text-gray-700 hover:border-black hover:text-black"
                  >
                    Explore more
                  </Link>
                </div>

                <Link to={storyHref(editorsPick)} className="group block">
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={editorsPick.image}
                      alt={editorsPick.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-3">
                    <Kicker>{editorsPick.category}</Kicker>

                    <h3 className="mt-1.5 line-clamp-3 text-[20px] font-bold leading-[1.22] text-gray-950 group-hover:underline">
                      {editorsPick.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-[13px] leading-[1.5] text-gray-500">
                      {editorsPick.summary}
                    </p>
                  </div>
                </Link>
              </div>
            </aside>
          </section>

          <div className="mt-10">
            <PrideTimesAd />
          </div>

          {/* =================================================
              2. LATEST NEWS — numbered list (homepage style)
          ================================================= */}

          <section aria-label="Latest startup news" className="mb-16">
            <SectionHeader title="Latest Startup News" link="/technology" />

            <ol className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {defaultLatestStartupNews
                .concat(defaultTopStartupStories)
                .slice(0, 6)
                .map((story, index) => (
                  <li key={story.id} className="border-b border-gray-200">
                    <Link to={storyHref(story)} className="group flex h-full gap-4 py-5">
                      <span className="w-6 shrink-0 text-[22px] font-extrabold leading-none tabular-nums text-gray-300">
                        {index + 1}
                      </span>

                      <div className="min-w-0">
                        <Kicker>{story.category}</Kicker>

                        <span className="mt-1 line-clamp-2 block text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                          {story.title}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ol>

            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.9fr_0.7fr]">
              {/* Feed */}

              <div ref={newsListRef} className="scroll-mt-24 min-w-0">
                <SectionHeader title="More Startup Stories" />

                <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                  {newsTabs.map((tab) => (
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
                      No stories in this category yet.
                    </p>
                  )}

                  {latestStories.map((story) => (
                    <Link
                      key={story.id}
                      to={storyHref(story)}
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
                            {story.category}
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
                          {story.summary}
                        </p>

                        <div className="mt-1.5">
                          <TimeStamp>
                            {story.publishedAt} · {story.readTime}
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
              </div>

              {/* Funding watch (sticky sidebar) */}

              <div className="min-w-0">
                <div className="lg:sticky lg:top-24 lg:pt-1">
                  <SectionHeader title="Funding Watch" link="/markets" />

                  <div className="rounded-md bg-black p-5 text-white">
                    <div className="divide-y divide-white/10">
                      {defaultFundedStartups.map((company) => {
                        const row = (
                          <div className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                            <div className="min-w-0">
                              <span className="block text-[13px] font-bold text-white">
                                {company.name}
                              </span>
                              <span className="block text-[11px] leading-snug text-gray-400">
                                {company.focus}
                              </span>
                            </div>

                            <div className="shrink-0 text-right">
                              <span className="block text-[18px] font-extrabold tabular-nums">
                                {company.amount}
                              </span>
                              <span className="block text-[10px] uppercase tracking-wide text-gray-500">
                                {company.round}
                              </span>
                            </div>
                          </div>
                        );

                        return company.url ? (
                          <Link
                            key={company.id}
                            to={company.url}
                            className="block hover:opacity-80"
                          >
                            {row}
                          </Link>
                        ) : (
                          <div key={company.id}>{row}</div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8">
                    <PrideTimesAd />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              3. DEEP DIVE — image left, story right (homepage interview style)
          ================================================= */}

          <section className="mb-16">
            <SectionHeader title="Deep Dive" link="/technology" />

            <section
              aria-label="Startup deep dive"
              className="grid grid-cols-1 items-stretch gap-0 border-x border-b border-gray-200 lg:grid-cols-12"
            >
              <Link
                to={storyHref(deepDiveStory)}
                className="group block overflow-hidden bg-gray-100 lg:col-span-6"
              >
                <ImageWithFallback
                  src={deepDiveStory.image}
                  alt={deepDiveStory.title}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </Link>

              <div className="flex flex-col justify-center p-6 lg:col-span-6 lg:p-12">
                <Kicker>{deepDiveStory.category}</Kicker>

                <Link to={storyHref(deepDiveStory)} className="group block">
                  <h2 className="mt-2 line-clamp-3 text-[28px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[32px]">
                    {deepDiveStory.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-gray-600">
                    {deepDiveStory.summary}
                  </p>
                </Link>
              </div>
            </section>
          </section>

          {/* =================================================
              4. STORIES BY CATEGORY — 16:10 image cards (homepage style)
          ================================================= */}

          <section className="mb-16">
            <SectionHeader title="Stories by Category" />

            <div className="space-y-12">
              {categoryGroups.map((group) => (
                <div key={group.name}>
                  <div className="mb-5 flex items-baseline justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-gray-950">
                      {group.name}
                    </h3>

                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      {storyCount(group.stories.length)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {group.stories.map((story) => (
                      <Link
                        key={story.id}
                        to={storyHref(story)}
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
                          <Kicker>{story.category}</Kicker>

                          <h4 className="mt-1 line-clamp-2 min-h-[2.56em] text-[16px] font-bold leading-[1.28] text-gray-950 group-hover:underline">
                            {story.title}
                          </h4>

                          <div className="mt-auto pt-1.5">
                            <TimeStamp>{story.publishedAt}</TimeStamp>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Funding table (collapsed by default) */}

            <details className="mt-8 border border-gray-300">
              <summary className="cursor-pointer select-none px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-900">
                Full funding table
              </summary>

              <div className="overflow-x-auto border-t border-gray-200">
                <table className="w-full min-w-[480px] text-left text-[12px]">
                  <thead className="bg-gray-50 text-[10px] uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-4 py-2 font-semibold">Company</th>
                      <th className="px-4 py-2 font-semibold">Focus</th>
                      <th className="px-4 py-2 font-semibold">Amount</th>
                      <th className="px-4 py-2 font-semibold">Round</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {defaultFundedStartups.map((company) => (
                      <tr key={company.id}>
                        <td className="px-4 py-2 font-medium text-gray-900">{company.name}</td>
                        <td className="px-4 py-2 text-gray-700">{company.focus}</td>
                        <td className="px-4 py-2 tabular-nums text-gray-700">{company.amount}</td>
                        <td className="px-4 py-2 text-gray-700">{company.round}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </section>

          {/* =================================================
              5. BROWSE BY CATEGORY + KEY FIGURES
          ================================================= */}

          <section className="mb-16">
            <SectionHeader title="Browse by Category" />

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
              {categoryGroups.map((group) => {
                const top = group.stories[0];

                return (
                  <div key={group.name} className="flex flex-col border-b border-gray-200 py-6">
                    <button
                      type="button"
                      onClick={() => openCategoryFeed(group.name)}
                      className="w-fit text-left text-[12px] font-extrabold uppercase tracking-[0.08em] text-gray-950 hover:underline"
                    >
                      {group.name}
                    </button>

                    {top && (
                      <Link to={storyHref(top)} className="group mt-2 block">
                        <span className="block min-h-[5.2em] text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline line-clamp-4">
                          {top.title}
                        </span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => openCategoryFeed(group.name)}
                      className="mt-auto flex w-fit items-center gap-1 pt-3 text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      {storyCount(group.stories.length)}
                      <ChevronRight size={10} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <SectionHeader title="Key Figures in Startup Success" link="/markets" linkText="Full Data" />

            <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {defaultStartupMetrics.map((metric, index) => (
                <div
                  key={metric.id}
                  className="flex items-start gap-4 border-b border-gray-200 py-4"
                >
                  <span className="w-8 shrink-0 text-[22px] font-extrabold leading-none tabular-nums text-gray-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-gray-950">
                      {metric.value}
                      <span className="font-normal text-gray-400">
                        {" "}
                        · {metric.change} {metric.changePeriod}
                      </span>
                    </p>

                    <p className="mt-1 text-[11px] leading-[1.5] text-gray-500 line-clamp-2">
                      {metric.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(227, 27, 35, 0.12); color: inherit; }
      `}</style>
    </div>
  );
}

export default StartupSuccessPage;
