import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import { formatTimestamp, isIsoTimestamp } from "../../utils/timeAgo";
import {
  consumerRetailArticles,
  consumerRetailArticlePath,
  type ConsumerRetailArticle,
} from "../../data/consumerRetailNewsData";

/* Display label for this section (page title, cards and feed). */
const SECTION_LABEL = "Consumer and Retail";

/* =========================================================
   CONSUMER AND RETAIL ITEMS
   Articles from src/app/data/consumerRetailNewsData.ts.
========================================================= */

const retailStories: ConsumerRetailArticle[] = consumerRetailArticles;

/* Top band, same split as the homepage:
   left feature story | centre lead story | right "Today's News" list */
const featureStory = retailStories[0];
const leadStory = retailStories[1] ?? retailStories[0];
const todaysNews = retailStories.slice(2, 6);

function displayDate(value: string) {
  return isIsoTimestamp(value) ? formatTimestamp(value) : value;
}

/* =========================================================
   GOOGLE ADSENSE SLOTS
========================================================= */

type AdSlotProps = {
  slot: string;
  format?: "auto" | "fluid";
  layout?: string;
  layoutKey?: string;
  className?: string;
  minHeight?: number;
};

function AdSlot({
  slot,
  format = "auto",
  layout,
  layoutKey,
  className = "",
  minHeight = 90,
}: AdSlotProps) {
  useEffect(() => {
    try {
      const w = window as Window & {
        adsbygoogle?: unknown[];
      };

      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // AdSense may be unavailable because of an ad blocker,
      // development environment, consent settings, or no inventory.
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="mb-1 text-center text-[7px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        Advertisement
      </div>

      <div className="w-full overflow-hidden" style={{ minHeight }}>
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minHeight,
          }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={
            format === "auto" ? "true" : undefined
          }
          data-ad-layout={layout}
          data-ad-layout-key={layoutKey}
        />
      </div>
    </div>
  );
}

function SidebarAd() {
  return (
    <AdSlot
      slot="5373718974"
      format="auto"
      minHeight={250}
      className="mt-6"
    />
  );
}

/* =========================================================
   SHARED PIECES (identical to the homepage)
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

/* =========================================================
   CONSUMER AND RETAIL PAGE
   Same layout, image sizes and text sizes as the homepage:
   1. Top band: feature | lead | Today's News + Key Figures
   2. Latest feed with a sticky ad column
========================================================= */

export function ConsumerRetailPage() {
  const feedRef = useRef<HTMLDivElement>(null);

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="w-full px-4 md:px-6 xl:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* ---------- PAGE TITLE ---------- */}

          <header className="mb-5 border-t-[3px] border-black pt-3">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-[28px] font-extrabold leading-[1.15] text-gray-950 md:text-[32px]">
                  {SECTION_LABEL}
                </h1>

                <p className="mt-2 text-[14px] leading-[1.5] text-gray-600">
                  Brands, retail strategy, online sales and product safety from
                  The Pride Times.
                </p>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-red-600">
                Brands • Retail • E-commerce
              </span>
            </div>
          </header>

          {!featureStory && (
            <p className="py-10 text-center text-[12px] text-gray-400">
              No consumer and retail stories yet.
            </p>
          )}

          {featureStory && (
            <>
              {/* =================================================
                  1. TOP BAND — 3 columns (same as homepage)
                     LEFT   : feature story
                     CENTRE : lead story
                     RIGHT  : Today's News + Key Figures
              ================================================= */}

              <section className="grid grid-cols-1 items-stretch gap-0 border border-gray-200 md:grid-cols-2 lg:grid-cols-12">
                {/* ---------- LEFT: feature story ---------- */}

                <div className="flex flex-col border-b border-gray-200 p-6 lg:col-span-4 lg:border-b-0 lg:border-r">
                  <Link
                    to={consumerRetailArticlePath(featureStory.id)}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-md bg-gray-100">
                      <ImageWithFallback
                        src={featureStory.image}
                        alt={featureStory.title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="mt-5">
                      <Kicker>{featureStory.category}</Kicker>
                    </div>

                    <h2 className="mt-1.5 line-clamp-3 text-[26px] font-extrabold leading-[1.12] text-gray-950 group-hover:underline md:text-[28px]">
                      {featureStory.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                      {featureStory.excerpt}
                    </p>

                    <div className="mt-3">
                      <TimeStamp>
                        {displayDate(featureStory.publishedAt)} ·{" "}
                        {featureStory.readTime}
                      </TimeStamp>
                    </div>
                  </Link>
                </div>

                {/* ---------- CENTRE: lead story ---------- */}

                <div className="flex flex-col border-b border-gray-200 p-6 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r">
                  <Link
                    to={consumerRetailArticlePath(leadStory.id)}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-md bg-gray-100">
                      <ImageWithFallback
                        src={leadStory.image}
                        alt={leadStory.title}
                        className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="mt-5">
                      <Kicker>{leadStory.category}</Kicker>
                    </div>

                    <h2 className="mt-1.5 line-clamp-3 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[26px]">
                      {leadStory.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                      {leadStory.excerpt}
                    </p>

                    <div className="mt-3">
                      <TimeStamp>
                        {displayDate(leadStory.publishedAt)} ·{" "}
                        {leadStory.readTime}
                      </TimeStamp>
                    </div>
                  </Link>
                </div>

                {/* ---------- RIGHT: Today's News + Key Figures ---------- */}

                <aside className="flex flex-col p-6 md:col-span-2 lg:col-span-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[15px] font-extrabold text-gray-950">
                      More Consumer and Retail News
                    </h2>

                    <button
                      type="button"
                      onClick={scrollToFeed}
                      className="border border-gray-300 px-3 py-1 text-[11px] font-semibold text-gray-700 hover:border-black hover:text-black"
                    >
                      Explore More
                    </button>
                  </div>

                  {todaysNews.length > 0 ? (
                    <ul className="mt-4 divide-y divide-gray-200">
                      {todaysNews.map((story) => (
                        <li key={story.id}>
                          <Link
                            to={consumerRetailArticlePath(story.id)}
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
                              <Kicker>{story.category}</Kicker>
                              <p className="mt-1 line-clamp-2 text-[14px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                                {story.title}
                              </p>
                              <div className="mt-1">
                                <TimeStamp>
                                  {displayDate(story.publishedAt)}
                                </TimeStamp>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-4 text-[12px] text-gray-400">
                      More consumer and retail stories will appear here.
                    </p>
                  )}

                  {/* Key Figures (dark panel, same as homepage black panel) */}

                  <div className="mt-auto pt-6">
                    <div className="bg-black p-6 text-white">
                      <div className="flex items-center justify-between border-b border-white/20 pb-2">
                        <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em]">
                          Key Figures
                        </h2>

                        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          {retailStories.length} stories
                        </span>
                      </div>

                      <div className="divide-y divide-white/10">
                        {featureStory.keyFacts.map((fact) => (
                          <div
                            key={fact.label}
                            className="flex items-start justify-between gap-3 py-2.5"
                          >
                            <span className="text-[13px] font-semibold text-gray-100">
                              {fact.label}
                            </span>

                            <span className="text-right text-[13px] tabular-nums text-gray-300">
                              {fact.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              </section>

              <PrideTimesAd variant="first" />

              {/* =================================================
                  2. LATEST CONSUMER AND RETAIL NEWS
                     feed + sticky ad column, same as homepage
              ================================================= */}

              <section
                aria-label="Latest consumer and retail news"
                className="mb-16 mt-8"
              >
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.9fr_0.7fr]">
                  {/* ---------- Feed ---------- */}

                  <div ref={feedRef} className="min-w-0 scroll-mt-24">
                    <SectionHeader title={`Latest ${SECTION_LABEL} News`} />

                    <div className="divide-y divide-gray-200">
                      {retailStories.map((story) => (
                        <Link
                          key={story.id}
                          to={consumerRetailArticlePath(story.id)}
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
                                {story.category}
                              </span>
                            </div>

                            <h3 className="mt-1 line-clamp-2 text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline sm:text-[21px]">
                              {story.title}
                            </h3>

                            <p className="mt-1.5 hidden text-[13px] leading-[1.5] text-gray-500 line-clamp-2 sm:block">
                              {story.excerpt}
                            </p>

                            <div className="mt-1.5">
                              <TimeStamp>
                                {displayDate(story.publishedAt)} ·{" "}
                                {story.readTime}
                              </TimeStamp>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* ---------- Sticky ad column ---------- */}

                  <div className="min-w-0">
                    <div className="lg:sticky lg:top-24 lg:pt-1">
                      <SidebarAd />
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          <PrideTimesAd variant="second" />
        </main>
      </div>
    </div>
  );
}

export default ConsumerRetailPage;
