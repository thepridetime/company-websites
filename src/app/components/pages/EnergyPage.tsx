import { useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  energyTrendData,
  energyTrendKeys,
  energyTrendSource,
} from "../../data/energyTrendData";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  octEditionArticles,
  octEditionArticlePath,
  type OctEditionArticle,
} from "../../data/octEditionData";

/* =========================================================
   STORY DATA (unchanged source)
   Only Energy stories from octEditionData.ts are shown.
========================================================= */

const SECTION_LABEL = "Energy";

const energyStories: OctEditionArticle[] = octEditionArticles.filter(
  (article) => article.industry === SECTION_LABEL
);

/* =========================================================
   FRONT-PAGE PICKS (same structure as the homepage)
========================================================= */

const leadStory = energyStories[0];
const majorStories = [energyStories[1], energyStories[2]].filter(
  Boolean
) as OctEditionArticle[];
const editorsPick = energyStories[3] ?? energyStories[0];
const deepDiveStory = energyStories[4] ?? energyStories[0];

const featuredIds = new Set(
  [leadStory, ...majorStories, editorsPick]
    .filter(Boolean)
    .map((story) => story.id)
);

const sidebarStories = energyStories
  .filter((story) => !featuredIds.has(story.id))
  .slice(0, 4);

const locationNames = Array.from(
  new Set(energyStories.map((story) => story.location).filter(Boolean))
) as string[];

const feedTabs = ["All", ...locationNames];

const locationGroups = locationNames.map((name) => ({
  name,
  stories: energyStories.filter((story) => story.location === name),
}));

const PAGE_SIZE = 8;

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
   ENERGY PAGE
========================================================= */

export function EnergyPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const feedRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Feed filtering ---------- */

  const filteredStories = useMemo(
    () =>
      activeTab === "All"
        ? energyStories
        : energyStories.filter((story) => story.location === activeTab),
    [activeTab]
  );

  const visibleStories =
    activeTab === "All" ? filteredStories.slice(0, visibleCount) : filteredStories;

  const hasMore = activeTab === "All" && visibleCount < filteredStories.length;

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  const openLocationFeed = (tab: string) => {
    selectTab(tab);

    window.requestAnimationFrame(() => {
      feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  if (!leadStory) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">
        No energy stories available right now.
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
                  {[leadStory, ...sidebarStories].slice(0, 4).map((story) => (
                    <li key={story.id}>
                      <Link
                        to={octEditionArticlePath(story)}
                        className="group block py-3.5"
                      >
                        <Kicker>{story.location ?? SECTION_LABEL}</Kicker>

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
                <Link to={octEditionArticlePath(leadStory)} className="group block">
                  <div className="relative overflow-hidden rounded-sm bg-black">
                    <ImageWithFallback
                      src={leadStory.image}
                      alt={leadStory.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-4">
                    <Kicker>
                      {SECTION_LABEL}
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
                        {leadStory.publishedAt} · {leadStory.readTime}
                      </TimeStamp>
                    </div>
                  </div>
                </Link>

                <div className="mt-6 grid grid-cols-1 gap-6 border-t border-gray-200 pt-5 sm:grid-cols-2">
                  {majorStories.map((story) => (
                    <Link
                      key={story.id}
                      to={octEditionArticlePath(story)}
                      className="group block"
                    >
                      <div className="overflow-hidden rounded-sm">
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="mt-2.5">
                        <Kicker>{story.location ?? SECTION_LABEL}</Kicker>

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

              {/* RIGHT: key figures panel + editor's pick */}

              <aside className="order-3 min-w-0 lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-6">
                <div className="rounded-sm bg-black p-4 text-white">
                  <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                      Key Figures
                    </h2>
                  </div>

                  <div className="divide-y divide-white/10">
                    {leadStory.keyFacts.map((fact) => (
                      <div
                        key={fact.label}
                        className="flex items-start justify-between gap-3 py-2.5"
                      >
                        <span className="text-[11px] font-semibold text-gray-300">
                          {fact.label}
                        </span>
                        <span className="text-right text-[11px] tabular-nums text-gray-400">
                          {fact.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                      Editor's Pick
                    </h2>

                    <Link
                      to={octEditionArticlePath(editorsPick)}
                      className="text-[10px] font-semibold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      Read more
                    </Link>
                  </div>

                  <Link to={octEditionArticlePath(editorsPick)} className="group block">
                    <div className="overflow-hidden rounded-sm">
                      <ImageWithFallback
                        src={editorsPick.image}
                        alt={editorsPick.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-2.5">
                      <Kicker>{editorsPick.location ?? SECTION_LABEL}</Kicker>

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

          <PrideTimesAd variant="first" />

          {/* =================================================
              2. LATEST NEWS
          ================================================= */}

          <section aria-label="Latest energy news" className="mb-12">
            <SectionHeader title="Latest Energy News" />

            <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {energyStories.slice(0, 6).map((story, index) => (
                <li key={story.id} className="border-b border-gray-200">
                  <Link
                    to={octEditionArticlePath(story)}
                    className="group flex gap-3 py-3.5"
                  >
                    <span className="w-6 shrink-0 font-serif text-[22px] font-bold leading-none tabular-nums text-gray-300">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <Kicker>{story.location ?? SECTION_LABEL}</Kicker>

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

              <div ref={feedRef} className="scroll-mt-24 min-w-0">
                <SectionHeader title="More Energy Stories" />

                <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                  {feedTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => selectTab(tab)}
                      className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                        activeTab === tab
                          ? "border-b-2 border-black pb-1 text-black"
                          : "pb-1 text-gray-400 hover:text-gray-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="divide-y divide-gray-200">
                  {visibleStories.length === 0 && (
                    <p className="py-6 text-[12px] text-gray-400">
                      No stories in this location yet.
                    </p>
                  )}

                  {visibleStories.map((story) => (
                    <Link
                      key={story.id}
                      to={octEditionArticlePath(story)}
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
                            {SECTION_LABEL}
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
                      Showing {visibleStories.length} of {filteredStories.length}
                    </span>
                  </div>
                )}
              </div>

              {/* ---------- Locations (sticky sidebar) ---------- */}

              <div className="min-w-0">
                <div className="lg:sticky lg:top-24">
                  <SectionHeader title="Locations" />

                  <div className="rounded-sm bg-black p-5 text-white">
                    <div className="divide-y divide-white/10">
                      {locationGroups.map((group) => (
                        <button
                          key={group.name}
                          type="button"
                          onClick={() => openLocationFeed(group.name)}
                          className="flex w-full items-center justify-between gap-3 py-2.5 text-left"
                        >
                          <span className="text-[11px] font-semibold text-gray-100">
                            {group.name}
                          </span>
                          <span className="shrink-0 text-[11px] tabular-nums text-gray-400">
                            {group.stories.length}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <PrideTimesAd variant="second" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              3. OIL PRICE TREND (chart from energyTrendData)
          ================================================= */}

          <section aria-label="Energy price trend" className="mb-12">
            <SectionHeader title="Oil Price Trend" />

            <div className="rounded-sm border border-gray-200 bg-white p-4 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-700">
                Annual average crude oil spot price
              </p>
              <p className="mb-4 text-[10px] text-gray-500">US$ per barrel</p>

              {energyTrendData.length > 0 ? (
                <>
                  <div className="h-[240px] sm:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={energyTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          tickFormatter={(v) => `$${v}`}
                        />
                        <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        {energyTrendKeys.map((series) => (
                          <Area
                            key={series.key}
                            type="monotone"
                            dataKey={series.key}
                            name={series.label}
                            stroke={series.color}
                            fill={series.color}
                            fillOpacity={0.12}
                          />
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <p className="mt-3 text-[9px] text-gray-400">{energyTrendSource}</p>
                </>
              ) : (
                <div className="flex h-[240px] items-center justify-center rounded-sm border border-dashed border-gray-300 bg-gray-50 text-[11px] text-gray-400">
                  Chart data will appear here once verified figures are added.
                </div>
              )}
            </div>
          </section>

          {/* =================================================
              4. DEEP DIVE
          ================================================= */}

          <section aria-label="Energy deep dive" className="mb-12">
            <SectionHeader
              title="Deep Dive"
              link={octEditionArticlePath(deepDiveStory)}
              linkText="Read story"
            />

            <Link
              to={octEditionArticlePath(deepDiveStory)}
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
                  {SECTION_LABEL}
                  {deepDiveStory.location ? ` · ${deepDiveStory.location}` : ""}
                </span>

                <h3 className="mt-2 max-w-3xl font-serif text-2xl font-bold leading-[1.15] text-white group-hover:underline sm:text-[30px]">
                  {deepDiveStory.title}
                </h3>

                <p className="mt-2 max-w-3xl text-[13px] leading-[1.5] text-gray-300 line-clamp-2">
                  {deepDiveStory.lede}
                </p>
              </div>
            </Link>
          </section>

          {/* =================================================
              5. STORIES BY LOCATION
          ================================================= */}

          <section aria-label="Stories by location" className="mb-12">
            <SectionHeader title="Stories by Location" />

            <div className="space-y-10">
              {locationGroups.map((group) => (
                <div key={group.name}>
                  <div className="mb-4 flex items-baseline justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-gray-950">
                      {group.name}
                    </h3>

                    <button
                      type="button"
                      onClick={() => openLocationFeed(group.name)}
                      className="text-[10px] font-semibold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      {group.stories.length}{" "}
                      {group.stories.length === 1 ? "story" : "stories"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                    {group.stories.slice(0, 4).map((story) => (
                      <Link
                        key={story.id}
                        to={octEditionArticlePath(story)}
                        className="group block"
                      >
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
          </section>

          <PrideTimesAd variant="second" />
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

export default EnergyPage;
