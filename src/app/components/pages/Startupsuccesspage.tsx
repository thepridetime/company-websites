import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  MapPin,
} from "lucide-react";

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

/* =========================================================
   DATA (startup content, arranged like the homepage)
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
   SMALL UI PIECES (same as homepage)
========================================================= */

function ChangeChip({ change, up }: { change: string; up: boolean }) {
  return (
    <span
      className={`flex items-center gap-1 text-[11px] font-semibold tabular-nums ${
        up ? "text-emerald-600" : "text-red-600"
      }`}
    >
      {up ? (
        <TrendingUp size={11} strokeWidth={2.25} />
      ) : (
        <TrendingDown size={11} strokeWidth={2.25} />
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
                  {sideHeadlines.map((story) => (
                    <li key={story.id}>
                      <Link to={storyHref(story)} className="group block py-3.5">
                        <Kicker>{story.category}</Kicker>

                        <h3 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                          {story.title}
                        </h3>

                        <div className="mt-1.5">
                          <TimeStamp>{story.publishedAt}</TimeStamp>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* CENTER: lead story */}

              <div className="order-1 min-w-0 lg:order-2 lg:col-span-6 lg:px-6">
                <Link to={storyHref(leadStory)} className="group block">
                  <div className="relative overflow-hidden rounded-sm bg-black">
                    <ImageWithFallback
                      src={leadStory.image}
                      alt={leadStory.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-4">
                    <Kicker>{leadStory.category}</Kicker>

                    <h1 className="mt-1.5 font-serif text-[28px] font-bold leading-[1.1] text-gray-950 group-hover:underline md:text-[38px]">
                      {leadStory.title}
                    </h1>

                    <p className="mt-3 text-[15px] leading-[1.55] text-gray-600">
                      {leadStory.summary}
                    </p>

                    <div className="mt-3">
                      <TimeStamp>
                        {leadStory.publishedAt} · {leadStory.readTime}
                      </TimeStamp>
                    </div>
                  </div>
                </Link>

                <div className="mt-6 grid grid-cols-1 gap-6 border-t border-gray-200 pt-5 sm:grid-cols-2">
                  {majorStories.map((story) => (
                    <Link key={story.id} to={storyHref(story)} className="group block">
                      <div className="overflow-hidden rounded-sm">
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="mt-2.5">
                        <Kicker>{story.category}</Kicker>

                        <h3 className="mt-1 font-serif text-[19px] font-bold leading-[1.2] text-gray-950 group-hover:underline">
                          {story.title}
                        </h3>

                        <div className="mt-1.5">
                          <TimeStamp>{story.publishedAt}</TimeStamp>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* RIGHT: startup metrics + editor's pick */}

              <aside className="order-3 min-w-0 lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-6">
                <div className="rounded-sm bg-black p-4 text-white">
                  <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                      Startup Metrics
                    </h2>
                  </div>

                  <div className="divide-y divide-white/10">
                    {defaultStartupMetrics.slice(0, 4).map((metric) => {
                      const negative = metric.change.trim().startsWith("↓");

                      return (
                        <div
                          key={metric.id}
                          className="flex items-center justify-between gap-3 py-2.5"
                        >
                          <div className="min-w-0">
                            <span className="block text-[12px] font-semibold tabular-nums text-gray-100">
                              {metric.value}
                            </span>
                            <span className="block text-[10px] leading-snug text-gray-400">
                              {metric.label}
                            </span>
                          </div>

                          <span
                            className={`shrink-0 text-[11px] font-semibold tabular-nums ${
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

                <div className="mt-6">
                  <div className="mb-3 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                      Editor's Pick
                    </h2>

                    <Link
                      to="/technology"
                      className="text-[10px] font-semibold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      Explore more
                    </Link>
                  </div>

                  <Link to={storyHref(editorsPick)} className="group block">
                    <div className="overflow-hidden rounded-sm">
                      <ImageWithFallback
                        src={editorsPick.image}
                        alt={editorsPick.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-2.5">
                      <Kicker>{editorsPick.category}</Kicker>

                      <h3 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                        {editorsPick.title}
                      </h3>

                      <p className="mt-1.5 text-[12px] leading-[1.5] text-gray-500 line-clamp-2">
                        {editorsPick.summary}
                      </p>
                    </div>
                  </Link>
                </div>
              </aside>
            </div>
          </section>

          <PrideTimesAd />

          {/* =================================================
              2. LATEST NEWS
          ================================================= */}

          <section aria-label="Latest startup news" className="mb-12">
            <SectionHeader title="Latest Startup News" link="/technology" />

            <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {defaultLatestStartupNews
                .concat(defaultTopStartupStories)
                .slice(0, 6)
                .map((story, index) => (
                  <li key={story.id} className="border-b border-gray-200">
                    <Link to={storyHref(story)} className="group flex gap-3 py-3.5">
                      <span className="w-6 shrink-0 font-serif text-[22px] font-bold leading-none tabular-nums text-gray-300">
                        {index + 1}
                      </span>

                      <div className="min-w-0">
                        <Kicker>{story.category}</Kicker>

                        <span className="mt-1 block font-serif text-[16px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                          {story.title}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ol>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.9fr_0.7fr]">
              {/* Feed */}

              <div ref={newsListRef} className="scroll-mt-24 min-w-0">
                <SectionHeader title="More Startup Stories" />

                <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                  {newsTabs.map((tab) => (
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
                      No stories in this category yet.
                    </p>
                  )}

                  {latestStories.map((story) => (
                    <Link
                      key={story.id}
                      to={storyHref(story)}
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
                            {story.category}
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

              {/* Funding watch (sticky sidebar) */}

              <div className="min-w-0">
                <div className="lg:sticky lg:top-24">
                  <SectionHeader title="Funding Watch" link="/markets" />

                  <div className="rounded-sm bg-black p-5 text-white">
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
                              <span className="block font-serif text-[17px] font-bold tabular-nums">
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

                  <div className="mt-8 lg:sticky lg:top-24">
                    <PrideTimesAd />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              3. DEEP DIVE + CATEGORY BRIEFINGS
          ================================================= */}

          <section aria-label="Startup deep dive" className="mb-12">
            <SectionHeader title="Deep Dive" link="/technology" />

            <Link
              to={storyHref(deepDiveStory)}
              className="group relative block min-h-[220px] overflow-hidden rounded-sm bg-black"
            >
              <ImageWithFallback
                src={deepDiveStory.image}
                alt={deepDiveStory.title}
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-400">
                  {deepDiveStory.category}
                </span>

                <h3 className="mt-2 max-w-3xl font-serif text-2xl font-bold leading-[1.15] text-white group-hover:underline sm:text-[30px]">
                  {deepDiveStory.title}
                </h3>

                <p className="mt-2 max-w-3xl text-[13px] leading-[1.5] text-gray-300 line-clamp-2">
                  {deepDiveStory.summary}
                </p>
              </div>
            </Link>
          </section>

          <section className="mb-12">
            <SectionHeader title="Stories by Category" />

            <div className="space-y-8">
              {categoryGroups.map((group) => (
                <div key={group.name}>
                  <div className="mb-4 flex items-baseline justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-gray-950">
                      {group.name}
                    </h3>

                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      {storyCount(group.stories.length)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                    {group.stories.map((story) => (
                      <Link key={story.id} to={storyHref(story)} className="group block">
                        <div className="aspect-[16/10] w-full overflow-hidden rounded-sm bg-gray-100">
                          <ImageWithFallback
                            src={story.image}
                            alt={story.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <span className="mt-2.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                          {story.publishedAt}
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

            {/* Funding table (collapsed by default) */}

            <details className="mt-6 rounded-sm border border-gray-300">
              <summary className="cursor-pointer select-none px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-900">
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
              4. BROWSE BY CATEGORY + KEY FIGURES
          ================================================= */}

          <section className="mb-12">
            <SectionHeader title="Browse by Category" />

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
              {categoryGroups.map((group) => {
                const top = group.stories[0];

                return (
                  <div key={group.name} className="flex flex-col border-b border-gray-200 py-4">
                    <button
                      type="button"
                      onClick={() => openCategoryFeed(group.name)}
                      className="w-fit text-left text-[12px] font-bold uppercase tracking-[0.12em] text-gray-950 hover:underline"
                    >
                      {group.name}
                    </button>

                    {top && (
                      <Link to={storyHref(top)} className="group mt-2 block">
                        <span className="block font-serif text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline line-clamp-4">
                          {top.title}
                        </span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => openCategoryFeed(group.name)}
                      className="mt-3 w-fit text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      {storyCount(group.stories.length)}
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
                  className="flex items-start gap-4 border-b border-gray-200 py-3.5"
                >
                  <span className="w-8 shrink-0 font-serif text-[22px] font-bold leading-none tabular-nums text-gray-300">
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
