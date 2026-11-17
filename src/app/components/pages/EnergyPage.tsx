import { useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
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

const SECTION_LABEL = "Energy";
const PAGE_SIZE = 8;
const PROMO_VISIBLE = 3;

/* =========================================================
   STORY DATA (unchanged source)
   Only Energy stories from octEditionData.ts are shown.
========================================================= */

const energyStories: OctEditionArticle[] = octEditionArticles.filter(
  (article) => article.industry === SECTION_LABEL
);

/* =========================================================
   SLOT ALLOCATION
   Stories are handed out in order so the top of the page does
   not repeat a story. If the pool runs out it wraps around,
   so the layout never breaks.
========================================================= */

let cursor = 0;

function take(count: number): OctEditionArticle[] {
  if (energyStories.length === 0) return [];
  const out: OctEditionArticle[] = [];
  for (let i = 0; i < count; i++) {
    out.push(energyStories[cursor % energyStories.length]);
    cursor += 1;
  }
  return out;
}

const [featureStory, leadStory] = take(2);
const relatedFeature = take(2);
const relatedLead = take(2);
const todaysNews = take(3);
const latestList = take(6);
const [interviewStory, interviewRelated] = take(2);
const trendingStrip = take(4);
const [editorsPick] = take(1);
const [deepDiveStory] = take(1);

const promoLabels = [
  "Top Story",
  "Trending Now",
  "Editor's Pick",
  "Latest",
  "Today's News",
  "Deep Dive",
];
const promoStories = take(promoLabels.length);
const newsletterPromos = promoLabels.map((label, i) => ({
  label,
  story: promoStories[i],
}));

const locationNames = Array.from(
  new Set(energyStories.map((story) => story.location).filter(Boolean))
) as string[];

const feedTabs = ["All", ...locationNames];

const locationGroups = locationNames.map((name) => ({
  name,
  stories: energyStories.filter((story) => story.location === name),
}));

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
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
        {title}
      </h2>

      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
        >
          {linkText}
          <ArrowRight size={10} />
        </Link>
      )}
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-red-600">
      {children}
    </span>
  );
}

function TimeStamp({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-gray-400">
      <Clock size={9} />
      {children}
    </span>
  );
}

function RelatedBox({ items }: { items: OctEditionArticle[] }) {
  return (
    <div className="mt-4 border border-gray-200">
      <div className="border-b border-gray-200 px-3 py-1.5 text-[11px] text-gray-500">
        Related
      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={octEditionArticlePath(item)}
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
   ENERGY PAGE
========================================================= */

export function EnergyPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [promoStart, setPromoStart] = useState(0);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const visiblePromos = Array.from(
    { length: Math.min(PROMO_VISIBLE, newsletterPromos.length) },
    (_, i) => newsletterPromos[(promoStart + i) % newsletterPromos.length]
  );

  const showPrevPromo = () =>
    setPromoStart(
      (start) => (start - 1 + newsletterPromos.length) % newsletterPromos.length
    );
  const showNextPromo = () =>
    setPromoStart((start) => (start + 1) % newsletterPromos.length);

  /* ---------- Feed filtering ---------- */

  const filteredStories = useMemo(
    () =>
      activeTab === "All"
        ? energyStories
        : energyStories.filter((story) => story.location === activeTab),
    [activeTab]
  );

  const visibleStories =
    activeTab === "All"
      ? filteredStories.slice(0, visibleCount)
      : filteredStories;

  const hasMore = activeTab === "All" && visibleCount < filteredStories.length;

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  const scrollToFeed = (tab = "All") => {
    selectTab(tab);

    window.requestAnimationFrame(() => {
      feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  if (!leadStory || !featureStory) {
    return (
      <div className="min-h-screen bg-white px-4 py-16 text-center text-[12px] text-gray-400">
        No energy stories available right now.
      </div>
    );
  }

  const keyFacts = leadStory.keyFacts ?? [];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="w-full px-4 md:px-6 xl:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* =================================================
              PAGE HEADING
          ================================================= */}

          <header className="mb-5 border-b border-gray-200 pb-4">
            <h1 className="text-[36px] font-extrabold leading-[1.05] tracking-[-0.01em] text-gray-950 md:text-[44px]">
              {SECTION_LABEL}
            </h1>
            <p className="mt-2 text-[13px] text-gray-500">
              Oil, gas, power and the energy transition from The Pride Times.
            </p>
          </header>

          {/* =================================================
              0. PROMO STRIP
          ================================================= */}

          <div className="mb-5 flex items-stretch gap-6 border-y border-gray-200 py-3">
            <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 md:grid-cols-3">
              {visiblePromos.map(({ label, story }) => (
                <Link
                  key={label}
                  to={octEditionArticlePath(story)}
                  className="group flex items-center gap-3"
                >
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <ImageWithFallback
                      src={story.image}
                      alt={label}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[12px] text-gray-500">{label}</p>
                    <p className="line-clamp-1 text-[13px] font-semibold text-gray-950 group-hover:underline">
                      {story.title}
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
                 RIGHT  : Today's News + Latest
          ================================================= */}

          <section className="grid grid-cols-1 items-stretch gap-0 border border-gray-200 md:grid-cols-2 lg:grid-cols-12">
            {/* ---------- LEFT ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-6 lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link to={octEditionArticlePath(featureStory)} className="group block">
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={featureStory.image}
                    alt={featureStory.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <h2 className="mt-5 line-clamp-3 text-[26px] font-extrabold leading-[1.12] text-gray-950 group-hover:underline md:text-[28px]">
                  {featureStory.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {featureStory.lede}
                </p>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={relatedFeature} />
              </div>
            </div>

            {/* ---------- CENTRE ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-6 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link to={octEditionArticlePath(leadStory)} className="group block">
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={leadStory.image}
                    alt={leadStory.title}
                    loading="eager"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <h1 className="mt-5 line-clamp-3 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[26px]">
                  {leadStory.title}
                </h1>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {leadStory.lede}
                </p>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={relatedLead} />
              </div>
            </div>

            {/* ---------- RIGHT ---------- */}

            <aside className="flex flex-col p-6 md:col-span-2 lg:col-span-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-extrabold text-gray-950">
                  Today's News
                </h2>

                <button
                  type="button"
                  onClick={() => scrollToFeed("All")}
                  className="border border-gray-300 px-3 py-1 text-[11px] font-semibold text-gray-700 hover:border-black hover:text-black"
                >
                  Explore More
                </button>
              </div>

              <ul className="mt-4 divide-y divide-gray-200">
                {todaysNews.map((story) => (
                  <li key={story.id}>
                    <Link
                      to={octEditionArticlePath(story)}
                      className="group flex items-start gap-3 py-4"
                    >
                      <div className="h-[64px] w-[96px] shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <Kicker>{story.location ?? SECTION_LABEL}</Kicker>
                        <p className="mt-1 line-clamp-2 text-[14px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                          {story.title}
                        </p>
                        <div className="mt-1">
                          <TimeStamp>{story.publishedAt}</TimeStamp>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h2 className="font-serif text-[20px] font-bold text-red-600">
                  Latest
                </h2>

                <ul className="mt-4 divide-y divide-gray-200">
                  {latestList.map((story) => (
                    <li key={story.id}>
                      <Link
                        to={octEditionArticlePath(story)}
                        className="group flex items-start gap-3 py-3.5"
                      >
                        <span className="w-14 shrink-0 pt-0.5 text-[11px] font-semibold text-red-600">
                          {story.publishedAt}
                        </span>

                        <span className="line-clamp-2 text-[14px] font-semibold leading-[1.3] text-gray-950 group-hover:underline">
                          {story.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToFeed("All")}
                  className="mt-2 flex w-full items-center justify-end gap-1 text-[12px] font-semibold text-gray-600 hover:underline"
                >
                  See all latest
                  <ChevronRight size={12} />
                </button>
              </div>
            </aside>
          </section>

          {/* =================================================
              2. INTERVIEW ROW — image left, story right
          ================================================= */}

          <section className="grid grid-cols-1 items-stretch gap-0 border-x border-b border-gray-200 lg:grid-cols-12">
            <Link
              to={octEditionArticlePath(interviewStory)}
              className="group block overflow-hidden bg-gray-100 lg:col-span-6"
            >
              <ImageWithFallback
                src={interviewStory.image}
                alt={interviewStory.title}
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </Link>

            <div className="flex flex-col justify-center p-6 lg:col-span-6 lg:p-12">
              <Kicker>{interviewStory.location ?? SECTION_LABEL}</Kicker>

              <Link to={octEditionArticlePath(interviewStory)} className="group block">
                <h2 className="mt-2 line-clamp-3 text-[28px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[32px]">
                  {interviewStory.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-gray-600">
                  {interviewStory.lede}
                </p>
              </Link>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <Link
                  to={octEditionArticlePath(interviewRelated)}
                  className="group block"
                >
                  <span className="line-clamp-2 block text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                    {interviewRelated.title}
                  </span>
                </Link>
              </div>
            </div>
          </section>

          {/* =================================================
              3. TRENDING NOW — 4 image cards
          ================================================= */}

          <section className="mb-16 mt-16">
            <SectionHeader title="Trending Now" />

            <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {trendingStrip.map((story) => (
                <Link
                  key={story.id}
                  to={octEditionArticlePath(story)}
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
                    <Kicker>{story.location ?? SECTION_LABEL}</Kicker>

                    <h3 className="mt-1 line-clamp-2 min-h-[2.56em] text-[16px] font-bold leading-[1.28] text-gray-950 group-hover:underline">
                      {story.title}
                    </h3>

                    <div className="mt-auto pt-1.5">
                      <TimeStamp>{story.publishedAt}</TimeStamp>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <PrideTimesAd variant="first" className="my-8" />

          {/* =================================================
              4. LATEST FEED (tabs + Show more) + LOCATIONS
          ================================================= */}

          <section aria-label="Latest energy news" className="mb-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.9fr_0.7fr]">
              <div ref={feedRef} className="min-w-0 scroll-mt-24">
                <SectionHeader title="Latest Energy News" />

                <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                  {feedTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => selectTab(tab)}
                      className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-wide transition-colors ${
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
                      className="group grid grid-cols-[110px_1fr] items-start gap-4 py-7 sm:grid-cols-[200px_1fr] sm:gap-6"
                    >
                      <div className="h-[80px] w-full overflow-hidden bg-gray-100 sm:h-[126px]">
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">
                            {SECTION_LABEL}
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
                      Showing {visibleStories.length} of {filteredStories.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Sidebar: Locations (sticky) */}
              <div className="min-w-0">
                <div className="lg:sticky lg:top-24 lg:pt-1">
                  <SectionHeader title="Locations" />

                  <div className="bg-black p-5 text-white">
                    <div className="divide-y divide-white/10">
                      {locationGroups.map((group) => (
                        <button
                          key={group.name}
                          type="button"
                          onClick={() => scrollToFeed(group.name)}
                          className="flex w-full items-center justify-between gap-3 py-3 text-left"
                        >
                          <span className="text-[12px] font-semibold text-gray-100">
                            {group.name}
                          </span>
                          <span className="shrink-0 text-[12px] tabular-nums text-gray-400">
                            {group.stories.length}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              5. KEY FIGURES + EDITOR'S PICK
          ================================================= */}

          <section className="mb-16 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            {keyFacts.length > 0 && (
              <div className="bg-black p-6 text-white lg:col-span-5">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em]">
                    Key Figures
                  </h2>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                    Lead story
                  </span>
                </div>

                <div className="divide-y divide-white/10">
                  {keyFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-start justify-between gap-4 py-3.5"
                    >
                      <span className="text-[12px] font-semibold text-gray-100">
                        {fact.label}
                      </span>
                      <span className="text-right text-[12px] tabular-nums text-gray-300">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to={octEditionArticlePath(leadStory)}
                  className="mt-2 flex w-fit items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-white hover:underline"
                >
                  Read the full story
                  <ArrowRight size={10} />
                </Link>
              </div>
            )}

            <div
              className={keyFacts.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}
            >
              <SectionHeader
                title="Editor's Pick"
                link={octEditionArticlePath(editorsPick)}
                linkText="Read more"
              />

              <Link
                to={octEditionArticlePath(editorsPick)}
                className="group grid grid-cols-1 items-start gap-8 sm:grid-cols-2"
              >
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={editorsPick.image}
                    alt={editorsPick.title}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div>
                  <Kicker>{editorsPick.location ?? SECTION_LABEL}</Kicker>

                  <h3 className="mt-1.5 line-clamp-3 text-[20px] font-bold leading-[1.22] text-gray-950 group-hover:underline">
                    {editorsPick.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-[13px] leading-[1.5] text-gray-500">
                    {editorsPick.lede}
                  </p>
                </div>
              </Link>
            </div>
          </section>

          {/* =================================================
              6. OIL PRICE TREND (chart from energyTrendData)
          ================================================= */}

          <section aria-label="Energy price trend" className="mb-16">
            <SectionHeader title="Oil Price Trend" />

            <div className="border border-gray-200 bg-white p-4 sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-700">
                Annual average crude oil spot price
              </p>
              <p className="mb-4 text-[11px] text-gray-500">US$ per barrel</p>

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

                  <p className="mt-3 text-[10px] text-gray-400">
                    {energyTrendSource}
                  </p>
                </>
              ) : (
                <div className="flex h-[240px] items-center justify-center border border-dashed border-gray-300 bg-gray-50 text-[12px] text-gray-400">
                  Chart data will appear here once verified figures are added.
                </div>
              )}
            </div>
          </section>

          {/* =================================================
              7. DEEP DIVE
          ================================================= */}

          <section aria-label="Energy deep dive" className="mb-16">
            <SectionHeader
              title="Deep Dive"
              link={octEditionArticlePath(deepDiveStory)}
              linkText="Read story"
            />

            <Link
              to={octEditionArticlePath(deepDiveStory)}
              className="group relative block min-h-[220px] overflow-hidden rounded-md bg-black"
            >
              <ImageWithFallback
                src={deepDiveStory.image}
                alt={deepDiveStory.title}
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-400">
                  {SECTION_LABEL}
                  {deepDiveStory.location ? ` · ${deepDiveStory.location}` : ""}
                </span>

                <h3 className="mt-2 line-clamp-3 max-w-3xl text-2xl font-extrabold leading-[1.15] text-white group-hover:underline sm:text-[30px]">
                  {deepDiveStory.title}
                </h3>

                <p className="mt-2 line-clamp-2 max-w-3xl text-[13px] leading-[1.5] text-gray-300">
                  {deepDiveStory.lede}
                </p>
              </div>
            </Link>
          </section>

          {/* =================================================
              8. STORIES BY LOCATION
          ================================================= */}

          <section aria-label="Stories by location" className="mb-16">
            <SectionHeader title="Stories by Location" />

            <div className="space-y-12">
              {locationGroups.map((group) => (
                <div key={group.name}>
                  <div className="mb-4 flex items-baseline justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-gray-950">
                      {group.name}
                    </h3>

                    <button
                      type="button"
                      onClick={() => scrollToFeed(group.name)}
                      className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 hover:text-red-600"
                    >
                      {group.stories.length}{" "}
                      {group.stories.length === 1 ? "story" : "stories"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {group.stories.slice(0, 4).map((story) => (
                      <Link
                        key={story.id}
                        to={octEditionArticlePath(story)}
                        className="group flex h-full flex-col"
                      >
                        <div className="aspect-[16/10] w-full overflow-hidden rounded-md bg-gray-100">
                          <ImageWithFallback
                            src={story.image}
                            alt={story.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <span className="mt-2.5 block text-[11px] font-bold uppercase tracking-[0.1em] text-red-600">
                          {story.publishedAt}
                        </span>

                        <h4 className="mt-1 line-clamp-2 min-h-[2.5em] text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                          {story.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <PrideTimesAd variant="second" className="my-8" />
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

export default EnergyPage;