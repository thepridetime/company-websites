import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Clock,
  MapPin,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import { getQuotes } from "../../../services/marketApi";
import {
  octEditionArticles,
  octEditionGlance,
  octEditionMeta,
  octEditionArticlePath,
  type OctEditionArticle,
} from "../../data/octEditionData";

/* =========================================================
   INNOVATION NEWS — SOURCE
   Every story on this page comes from
   src/app/data/octEditionData.ts (Global Industry Edition).
   Only the industries listed below count as Innovation news.
   Add an industry name here to pull more stories in; any new
   article added to octEditionData.ts with a matching
   `industry` shows up automatically.
========================================================= */

const INNOVATION_INDUSTRIES = [
  "AI & Cloud Infrastructure",
  "Semiconductors",
  "Deep Technology",
];

const innovationStories: OctEditionArticle[] = octEditionArticles.filter(
  (article) => INNOVATION_INDUSTRIES.includes(article.industry)
);

/* Headline figures that relate to innovation (AI, chips, compute). */
const innovationGlance = octEditionGlance.filter((item) =>
  /hyperscaler|nvidia|chip|semiconductor|data-center|ai\b/i.test(
    item.indicator
  )
);

/* =========================================================
   LAYOUT SLOTS (same structure as the homepage)
========================================================= */

const leadStory: OctEditionArticle | undefined = innovationStories[0];
const majorStories = innovationStories.slice(1, 3);
const editorsPick: OctEditionArticle | undefined = innovationStories[3];

const featuredIds = new Set(
  [leadStory, ...majorStories, editorsPick]
    .filter((article): article is OctEditionArticle => Boolean(article))
    .map((article) => article.id)
);

const sidebarStories = innovationStories
  .filter((article) => !featuredIds.has(article.id))
  .slice(0, 6);

const industryNames = Array.from(
  new Set(innovationStories.map((article) => article.industry))
);
const latestNewsTabs = ["All", ...industryNames];

const PAGE_SIZE = 8;

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
   SMALL COMPONENTS
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
   INNOVATION PAGE
========================================================= */

export function InnovationPage() {
  const [activeMarketTab, setActiveMarketTab] = useState<"Indices" | "Crypto">(
    "Indices"
  );
  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [marketSnapshotData, setMarketSnapshotData] = useState<
    Record<string, MarketItem[]>
  >({
    Indices: [],
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
  }, []);

  /* ---------- LATEST NEWS FILTERING ---------- */

  const filteredStories = useMemo(
    () =>
      activeNewsTab === "All"
        ? innovationStories
        : innovationStories.filter(
            (article) => article.industry === activeNewsTab
          ),
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

  /* ---------- EMPTY STATE ---------- */

  if (!leadStory) {
    return (
      <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-serif text-3xl font-bold">Innovation</h1>
          <p className="mt-2 text-sm text-gray-500">
            No innovation stories are available yet.
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
              TOP STORIES / NEWSROOM LEAD
          ================================================= */}

          <section className="pb-8 mb-8 border-b border-gray-300">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr_0.85fr] gap-5 lg:gap-6">
              {/* LEAD STORY */}

              <Link
                to={octEditionArticlePath(leadStory)}
                className="group relative block overflow-hidden rounded-lg border border-gray-200 min-h-[430px] lg:min-h-[500px] bg-black"
              >
                <ImageWithFallback
                  src={leadStory.image}
                  alt={leadStory.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[9px] font-bold tracking-[0.16em] uppercase rounded-[2px]">
                  Innovation | {leadStory.industry} | {leadStory.location}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h1 className="font-serif text-2xl md:text-[30px] lg:text-[34px] font-bold leading-[1.08] text-white">
                    {leadStory.title}
                  </h1>

                  <p className="text-[13px] md:text-[14px] font-semibold text-red-200 leading-[1.5] mt-3">
                    {leadStory.lede}
                  </p>

                  <p className="text-[12px] md:text-[13px] text-gray-200 leading-[1.6] mt-2 line-clamp-3">
                    {leadStory.body[0]}
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
                      {majorStories[0].industry} | {majorStories[0].location}
                    </span>

                    <Link
                      to={octEditionArticlePath(majorStories[0])}
                      className="group block"
                    >
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
                    to={octEditionArticlePath(majorStories[1])}
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
                        {majorStories[1].industry}
                      </span>

                      <h3 className="text-[13px] font-bold leading-[1.35] mt-1 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                        {majorStories[1].title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-[1.45] text-gray-500 line-clamp-2">
                        {majorStories[1].lede}
                      </p>

                      <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-2">
                        <Clock size={9} />
                        {majorStories[1].publishedAt}
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
                {/* EDITOR'S PICK (only when a 4th innovation story exists) */}

                {editorsPick && (
                  <div className="pb-5 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-serif text-lg font-bold">
                        Editor's Pick
                      </h2>

                      <Link
                        to={editorsPick.sectionPath}
                        className="border border-gray-300 rounded-full px-3 py-1 text-[9px] font-medium hover:border-gray-500 transition-colors"
                      >
                        Explore More
                      </Link>
                    </div>

                    <Link
                      to={octEditionArticlePath(editorsPick)}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <ImageWithFallback
                          src={editorsPick.image}
                          alt={editorsPick.title}
                          className="w-full h-[175px] object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>

                      <span className="block text-[9px] font-bold text-red-600 uppercase tracking-[0.14em] mt-2.5">
                        {editorsPick.industry}
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

                {/* INNOVATION NUMBERS AT A GLANCE */}

                {innovationGlance.length > 0 && (
                  <div className={editorsPick ? "pt-5" : ""}>
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-1">
                      <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                        Numbers at a Glance
                      </h2>

                      <span className="text-[8px] uppercase tracking-wide text-gray-400">
                        {octEditionMeta.date}
                      </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {innovationGlance.map((item) => (
                        <div key={item.indicator} className="py-3">
                          <span className="block text-[10px] leading-[1.4] text-gray-500">
                            {item.indicator}
                          </span>

                          <span className="mt-0.5 block font-serif text-lg font-bold leading-[1.2] text-gray-900">
                            {item.figure}
                          </span>

                          <span className="mt-0.5 block text-[9px] text-gray-400">
                            {item.source}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LATEST NEWS STREAM (sidebar headlines) */}

                {sidebarStories.length > 0 && (
                  <div className="pt-5">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-1">
                      <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                        Latest News
                      </h2>

                      <span className="text-[8px] uppercase tracking-wide text-gray-400">
                        Newsroom
                      </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {sidebarStories.map((item) => (
                        <Link
                          key={item.id}
                          to={octEditionArticlePath(item)}
                          className="group block py-3"
                        >
                          <div className="flex gap-3">
                            <span className="shrink-0 text-[9px] font-semibold text-red-600 w-[58px] truncate">
                              {item.location}
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
                )}
              </aside>
            </div>
          </section>

          {/* =================================================
              ADVERTISEMENT
          ================================================= */}

          <PrideTimesAd variant="first" className="mb-8" />

          {/* =================================================
              LATEST INNOVATION NEWS
          ================================================= */}

          <section className="mb-12">
            <SectionHeader
              title={`${octEditionMeta.title} · ${octEditionMeta.edition} · ${octEditionMeta.date}`}
            />

            <div className="-mt-2 mb-5 text-[11px] leading-[1.5] text-gray-500">
              Innovation coverage: AI and cloud infrastructure, semiconductors
              and deep technology.
            </div>

            {/* FILTER TABS */}

            <div className="flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3 mb-1">
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
                  to={octEditionArticlePath(story)}
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
                        {story.industry}
                      </span>

                      <span className="text-[8px] text-gray-300">•</span>

                      <span className="inline-flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        <MapPin size={8} />
                        {story.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-2xl font-bold leading-[1.2] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                      {story.title}
                    </h3>

                    <p className="hidden sm:block text-[13px] text-gray-500 leading-[1.55] mt-2 line-clamp-3">
                      {story.lede}
                    </p>

                    <span className="flex items-center gap-1 text-[9px] text-gray-400 mt-1.5">
                      <Clock size={8} />
                      {story.publishedAt} · {story.readTime}
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

            <p className="mt-6 border-t border-gray-200 pt-4 text-[10px] leading-[1.5] text-gray-400">
              {leadStory.editorNote}
            </p>
          </section>

          {/* =================================================
              SECOND ADVERTISEMENT
          ================================================= */}

          <PrideTimesAd variant="second" className="mb-12" />

          {/* =================================================
              NEWSLETTER CTA
          ================================================= */}

          <section className="bg-[#0b1a30] text-white text-center p-8 md:p-10 rounded-[2px]">
            <h2 className="font-serif text-2xl md:text-[30px] mb-2">
              Stay Ahead with The Pride Times
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              Daily briefings on Innovation delivered to your inbox.
            </p>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 min-w-0 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 px-4 py-3 text-sm outline-none focus:border-white/50 rounded-[2px]"
              />

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold transition-colors rounded-[2px] whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default InnovationPage;
