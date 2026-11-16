import { useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { NewsletterCTA } from "../NewsletterCTA";
import { TimeAgo } from "../../utils/timeAgo";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  technologyArticles,
  technologyArticlePath,
  technologyCompanies,
  technologySectionGlance,
  technologyWatchNote,
  regionalSnapshot,
} from "../../data/technologyNewsData";

const PAGE_SIZE = 8;
const PROMO_VISIBLE = 3;

/* =========================================================
   HELPERS
========================================================= */

/* Resize an Unsplash image URL for the slot it is used in. */
function sized(url: string, width: number) {
  return url.replace(/w=\d+/, `w=${width}`);
}

/* Pill colours for the outlook / hiring cells. */
const pillClass = (tone: "up" | "mid" | "none") =>
  tone === "up"
    ? "bg-emerald-50 text-emerald-700"
    : tone === "mid"
      ? "bg-amber-50 text-amber-700"
      : "bg-gray-100 text-gray-600";

type Story = (typeof technologyArticles)[number];

/* =========================================================
   SLOT ALLOCATION
   Stories are handed out in order so the top of the page does
   not repeat a story. If the pool runs out it wraps around,
   so the layout never breaks.
========================================================= */

let cursor = 0;

function take(count: number): Story[] {
  if (technologyArticles.length === 0) return [];
  const out: Story[] = [];
  for (let i = 0; i < count; i++) {
    out.push(technologyArticles[cursor % technologyArticles.length]);
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

const feedTabs = [
  "All",
  ...Array.from(new Set(technologyArticles.map((a) => a.category))),
];

const sponsorships = [
  "AI & Business World",
  "Global Technology Forum",
  "Future Infrastructure Summit",
  "Enterprise AI Leadership Forum",
];

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

function TimeStamp({ iso }: { iso: string }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-gray-400">
      <Clock size={9} />
      <TimeAgo iso={iso} />
    </span>
  );
}

function RelatedBox({ items }: { items: Story[] }) {
  return (
    <div className="mt-4 border border-gray-200">
      <div className="border-b border-gray-200 px-3 py-1.5 text-[11px] text-gray-500">
        Related
      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={technologyArticlePath(item.id)}
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
   PAGE
========================================================= */

export function TechnologyPage() {
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

  const filteredStories = useMemo(
    () =>
      activeTab === "All"
        ? technologyArticles
        : technologyArticles.filter((a) => a.category === activeTab),
    [activeTab]
  );

  const feedStories =
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
      <div className="min-h-screen bg-white p-10 text-center text-[12px] text-gray-400">
        No technology stories yet.
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

          <header className="mb-5 border-b border-gray-200 pb-4">
            <h1 className="text-[36px] font-extrabold leading-[1.05] tracking-[-0.01em] text-gray-950 md:text-[44px]">
              Technology
            </h1>
            <p className="mt-2 text-[13px] text-gray-500">
              Platforms, semiconductors, cloud infrastructure and the enterprise
              race to deploy AI.
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
                  to={technologyArticlePath(story.id)}
                  className="group flex items-center gap-3"
                >
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <ImageWithFallback
                      src={sized(story.image, 200)}
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
              <Link
                to={technologyArticlePath(featureStory.id)}
                className="group block"
              >
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={sized(featureStory.image, 900)}
                    alt={featureStory.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <h2 className="mt-5 line-clamp-3 text-[26px] font-extrabold leading-[1.12] text-gray-950 group-hover:underline md:text-[28px]">
                  {featureStory.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {featureStory.excerpt}
                </p>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={relatedFeature} />
              </div>
            </div>

            {/* ---------- CENTRE ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-6 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link
                to={technologyArticlePath(leadStory.id)}
                className="group block"
              >
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={sized(leadStory.image, 900)}
                    alt={leadStory.title}
                    loading="eager"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <h1 className="mt-5 line-clamp-3 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[26px]">
                  {leadStory.title}
                </h1>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {leadStory.excerpt}
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
                      to={technologyArticlePath(story.id)}
                      className="group flex items-start gap-3 py-4"
                    >
                      <div className="h-[64px] w-[96px] shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <ImageWithFallback
                          src={sized(story.image, 400)}
                          alt={story.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <Kicker>{story.category}</Kicker>
                        <p className="mt-1 line-clamp-2 text-[14px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                          {story.title}
                        </p>
                        <div className="mt-1">
                          <TimeStamp iso={story.publishedAt} />
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
                        to={technologyArticlePath(story.id)}
                        className="group flex items-start gap-3 py-3.5"
                      >
                        <span className="w-16 shrink-0 pt-0.5 text-[11px] font-semibold text-red-600">
                          <TimeAgo iso={story.publishedAt} />
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
              to={technologyArticlePath(interviewStory.id)}
              className="group block overflow-hidden bg-gray-100 lg:col-span-6"
            >
              <ImageWithFallback
                src={sized(interviewStory.image, 1200)}
                alt={interviewStory.title}
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </Link>

            <div className="flex flex-col justify-center p-6 lg:col-span-6 lg:p-12">
              <Kicker>{interviewStory.category}</Kicker>

              <Link
                to={technologyArticlePath(interviewStory.id)}
                className="group block"
              >
                <h2 className="mt-2 line-clamp-3 text-[28px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[32px]">
                  {interviewStory.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-gray-600">
                  {interviewStory.excerpt}
                </p>
              </Link>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <Link
                  to={technologyArticlePath(interviewRelated.id)}
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
            <SectionHeader title="Trending Now" link="/innovation" />

            <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {trendingStrip.map((story) => (
                <Link
                  key={story.id}
                  to={technologyArticlePath(story.id)}
                  className="group flex h-full flex-col"
                >
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={sized(story.image, 700)}
                      alt={story.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-2.5 flex flex-1 flex-col">
                    <Kicker>{story.category}</Kicker>

                    <h3 className="mt-1 line-clamp-2 min-h-[2.56em] text-[16px] font-bold leading-[1.28] text-gray-950 group-hover:underline">
                      {story.title}
                    </h3>

                    <div className="mt-auto pt-1.5">
                      <TimeStamp iso={story.publishedAt} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <PrideTimesAd variant="first" className="my-8" />

          {/* =================================================
              4. LATEST TECHNOLOGY NEWS FEED + SIDEBAR
          ================================================= */}

          <section aria-label="Latest technology news" className="mb-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.9fr_0.7fr]">
              <div ref={feedRef} className="min-w-0 scroll-mt-24">
                <SectionHeader title="Latest Technology News" />

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
                  {feedStories.length === 0 && (
                    <p className="py-6 text-[12px] text-gray-400">
                      No stories in this category yet.
                    </p>
                  )}

                  {feedStories.map((story) => (
                    <Link
                      key={story.id}
                      to={technologyArticlePath(story.id)}
                      className="group grid grid-cols-[110px_1fr] items-start gap-4 py-7 sm:grid-cols-[200px_1fr] sm:gap-6"
                    >
                      <div className="h-[80px] w-full overflow-hidden bg-gray-100 sm:h-[126px]">
                        <ImageWithFallback
                          src={sized(story.image, 500)}
                          alt={story.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">
                          {story.category}
                        </span>

                        <h3 className="mt-1 line-clamp-2 text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline sm:text-[21px]">
                          {story.title}
                        </h3>

                        <p className="mt-1.5 hidden text-[13px] leading-[1.5] text-gray-500 line-clamp-2 sm:block">
                          {story.excerpt}
                        </p>

                        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[11px] text-gray-400">
                          <TimeStamp iso={story.publishedAt} />
                          {story.readTime && (
                            <>
                              <span>|</span>
                              <span>{story.readTime}</span>
                            </>
                          )}
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
                      Showing {feedStories.length} of {filteredStories.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Sidebar: Technology Watch + browse by category */}
              <div className="min-w-0">
                <div className="lg:sticky lg:top-24 lg:pt-1">
                  <div className="bg-black p-6 text-white">
                    <div className="border-b border-white/20 pb-2">
                      <h3 className="text-[13px] font-extrabold uppercase tracking-[0.04em]">
                        Technology Watch
                      </h3>
                    </div>

                    <h4 className="mt-4 text-[17px] font-extrabold leading-[1.25]">
                      {technologyWatchNote.title}
                    </h4>

                    <p className="mt-2 text-[13px] leading-[1.55] text-gray-300">
                      {technologyWatchNote.body}
                    </p>
                  </div>

                  <div className="mt-10">
                    <SectionHeader title="Browse by Category" />

                    <div className="divide-y divide-gray-200">
                      {feedTabs
                        .filter((tab) => tab !== "All")
                        .map((tab) => {
                          const count = technologyArticles.filter(
                            (a) => a.category === tab
                          ).length;

                          return (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => scrollToFeed(tab)}
                              className="flex w-full items-center justify-between py-3 text-left"
                            >
                              <span className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-gray-950 hover:underline">
                                {tab}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wide text-red-600">
                                {count} {count === 1 ? "story" : "stories"}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              5. EDITOR'S PICK + COMPANIES IN FOCUS
          ================================================= */}

          <section className="mb-16 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeader title="Editor's Pick" link="/innovation" linkText="Explore more" />

              <Link
                to={technologyArticlePath(editorsPick.id)}
                className="group grid grid-cols-1 items-start gap-8 sm:grid-cols-2"
              >
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={sized(editorsPick.image, 800)}
                    alt={editorsPick.title}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div>
                  <Kicker>{editorsPick.category}</Kicker>

                  <h3 className="mt-1.5 line-clamp-3 text-[20px] font-bold leading-[1.22] text-gray-950 group-hover:underline">
                    {editorsPick.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-[13px] leading-[1.5] text-gray-500">
                    {editorsPick.excerpt}
                  </p>
                </div>
              </Link>
            </div>

            <div className="lg:col-span-5">
              <SectionHeader title="Companies in Focus" link="/business-news" />

              <div>
                {technologyCompanies.map((item) => (
                  <Link
                    key={item.articleId}
                    to={technologyArticlePath(item.articleId)}
                    className="group flex items-start justify-between gap-5 border-b border-gray-200 py-5"
                  >
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-gray-950 group-hover:underline">
                        {item.company}
                        <span className="font-normal text-gray-400">
                          {" "}
                          · {item.location}
                        </span>
                      </p>

                      <p className="mt-1 text-[11px] leading-[1.5] text-gray-500">
                        {item.detail}
                      </p>
                    </div>

                    <p className="flex max-w-[45%] shrink-0 items-start gap-1 text-right text-[13px] font-bold leading-[1.3] text-gray-950">
                      {item.headline}
                      <ChevronRight
                        size={12}
                        className="mt-0.5 shrink-0 text-red-600"
                      />
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              6. SPONSORSHIP
          ================================================= */}

          <section className="mb-16">
            <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
                Sponsorship
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Presented by our partners
              </span>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
              {sponsorships.map((item) => (
                <div
                  key={item}
                  className="flex h-full flex-col border-b border-gray-200 py-6"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-[13px] text-white">
                    ✦
                  </div>

                  <p className="mt-3 text-[17px] font-bold leading-[1.25] text-gray-950">
                    {item}
                  </p>

                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-400">
                    Sponsored Event
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              7. MARKET WATCH + REGIONAL SNAPSHOT
          ================================================= */}

          <div className="mb-16 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            <section>
              <SectionHeader title="Technology Market Watch" link="/markets" />

              <div className="overflow-x-auto border border-gray-300">
                <table className="w-full min-w-[360px] text-left text-[12px]">
                  <thead className="bg-gray-50 text-[10px] uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-4 py-2 font-semibold">Theme</th>
                      <th className="px-4 py-2 font-semibold">Momentum</th>
                      <th className="px-4 py-2 text-right font-semibold">
                        Outlook
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {technologySectionGlance.map((item) => (
                      <tr key={item.theme}>
                        <td className="px-4 py-2.5 font-medium text-gray-900">
                          {item.theme}
                        </td>

                        <td className="px-4 py-2.5 text-gray-700">
                          {item.momentum}
                        </td>

                        <td className="px-4 py-2.5 text-right">
                          <span
                            className={`inline-block px-2 py-0.5 text-[11px] font-semibold ${pillClass(
                              /positive|improv/i.test(item.outlook)
                                ? "up"
                                : /neutral|cautious/i.test(item.outlook)
                                  ? "mid"
                                  : "none"
                            )}`}
                          >
                            {item.outlook}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <SectionHeader title="Regional Market Snapshot" link="/world" />

              <p className="-mt-1 mb-5 text-[12px] leading-[1.5] text-gray-500">
                Illustrative regional indicators from this edition.
              </p>

              <div className="overflow-x-auto border border-gray-300">
                <table className="w-full min-w-[460px] text-left text-[12px]">
                  <thead className="bg-gray-50 text-[10px] uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-4 py-2 font-semibold">Region</th>
                      <th className="px-4 py-2 font-semibold">
                        Deal Value (US$ bn)
                      </th>
                      <th className="px-4 py-2 font-semibold">
                        Earnings Growth
                      </th>
                      <th className="px-4 py-2 text-right font-semibold">
                        Hiring Outlook
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {regionalSnapshot.map((row) => (
                      <tr key={row.region}>
                        <td className="px-4 py-2.5 font-medium text-gray-900">
                          {row.region}
                        </td>

                        <td className="px-4 py-2.5 tabular-nums text-gray-700">
                          {row.dealValue}
                        </td>

                        <td className="px-4 py-2.5 tabular-nums text-gray-700">
                          {row.earnings}
                        </td>

                        <td className="px-4 py-2.5 text-right">
                          <span
                            className={`inline-block px-2 py-0.5 text-[11px] font-semibold ${pillClass(
                              /growing|strong|expan|increas/i.test(row.hiring)
                                ? "up"
                                : /stable|mixed|flat/i.test(row.hiring)
                                  ? "mid"
                                  : "none"
                            )}`}
                          >
                            {row.hiring}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <PrideTimesAd variant="second" className="my-8" />

          <NewsletterCTA
            title="Stay Ahead with The Pride Times"
            description="Daily briefings on AI platforms, chips, data centres and the global technology economy delivered to your inbox."
            newsletterKey="technology-weekly"
          />
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

export default TechnologyPage;