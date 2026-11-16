import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import MagazineImg from "../../../imports/pt30image.png";
import {
  octEditionArticles,
  octEditionArticlePath,
  type OctEditionArticle,
} from "../../data/octEditionData";

/* =========================================================
   SUPPLY CHAIN STORIES (unchanged source)
   Stories from the October 2026 Global Industry Edition
   (src/app/data/octEditionData.ts) in the
   "Industry and Supply Chain" section.
========================================================= */

const supplyChainStories: OctEditionArticle[] = octEditionArticles.filter(
  (article) => article.section === "Industry and Supply Chain"
);

const leadStory = supplyChainStories[0];

/* Stories used in the layout. Missing slots fall back to the
   lead story, and sections that have no stories are hidden. */
const pickStory = (index: number) => supplyChainStories[index] ?? leadStory;

const featureStory = pickStory(1);
const interviewStory = pickStory(2);
const interviewRelated = supplyChainStories[3];
const trendingAll = supplyChainStories.slice(3);

const PROMO_VISIBLE = 3;
const promoStories = supplyChainStories.slice(0, 6);
const TRENDING_DEFAULT = 4;
const PAGE_SIZE = 8;

const magazinePreview = {
  title: "The 2026 Global Industry Outlook",
  subtitle:
    "Energy security, AI infrastructure, supply-chain resilience and the forces reshaping global business.",
  image: MagazineImg,
};

/* =========================================================
   GOOGLE ADSENSE SLOTS
   Four ads per page: below the top band, mid-page, sticky
   sidebar, and at the bottom.
========================================================= */

const AD_SLOTS = {
  inArticle: "8042854193",
  sidebar: "5373718974",
} as const;

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

function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`block text-[11px] font-bold uppercase tracking-[0.08em] text-red-600 ${className}`}
    >
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
  items: OctEditionArticle[];
}) {
  if (items.length === 0) return null;

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
   SUPPLY CHAIN PAGE
   Same layout and styling as the homepage:
   0. Newsletter strip
   1. Top band: feature | lead | key figures + more stories
   2. Interview row
   3. Trending Now (expandable)
   4. Latest numbered list
   5. Latest feed + sticky sidebar
========================================================= */

export function SupplyChainPage() {
  const [promoStart, setPromoStart] = useState(0);
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const feedRef = useRef<HTMLDivElement | null>(null);

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

  /* ---------- Feed and trending ---------- */

  const trendingStrip = showAllTrending
    ? trendingAll
    : trendingAll.slice(0, TRENDING_DEFAULT);

  const trendingHasMore = trendingAll.length > TRENDING_DEFAULT;

  const feedStories = supplyChainStories.slice(0, visibleCount);
  const feedHasMore = visibleCount < supplyChainStories.length;

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* ---------- Related boxes ---------- */

  const relatedFeature = supplyChainStories.slice(2, 4);
  const relatedLead = supplyChainStories.slice(1, 3);

  /* ---------- Empty state ---------- */

  if (!leadStory) {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <header className="mb-6 border-b border-gray-200 pb-4">
            <h1 className="text-[28px] font-extrabold tracking-tight text-gray-950 md:text-[36px]">
              Supply Chain
            </h1>
          </header>

          <p className="py-10 text-center text-[12px] text-gray-400">
            No supply chain stories in this edition yet.
          </p>
        </div>
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
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-[28px] font-extrabold leading-[1.1] tracking-tight text-gray-950 md:text-[36px]">
                  Supply Chain
                </h1>

                <p className="mt-2 text-[14px] leading-[1.55] text-gray-600">
                  Manufacturing bottlenecks, logistics, tariffs and industrial
                  sourcing from The Pride Times Global Industry Edition.
                </p>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
                Logistics • Sourcing • Industry
              </span>
            </div>
          </header>

          {/* =================================================
              0. NEWSLETTER STRIP
          ================================================= */}

          {promoStories.length > 0 && (
            <div className="mb-5 flex items-stretch gap-6 border-y border-gray-200 py-3">
              <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 md:grid-cols-3">
                {visiblePromos.map((promo) => (
                  <Link
                    key={promo.id}
                    to={octEditionArticlePath(promo)}
                    className="group flex items-center gap-3"
                  >
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      <ImageWithFallback
                        src={promo.image}
                        alt={promo.industry}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[12px] text-gray-500">
                        {promo.industry}
                      </p>
                      <p className="line-clamp-1 text-[13px] font-semibold text-gray-950 group-hover:underline">
                        {promo.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {promoStories.length > PROMO_VISIBLE && (
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
              )}
            </div>
          )}

          {/* =================================================
              1. TOP BAND — 3 columns
                 LEFT   : feature story + Related
                 CENTRE : lead story + Related
                 RIGHT  : Key Figures panel + More Supply Chain News
          ================================================= */}

          <section className="grid grid-cols-1 items-stretch gap-0 border border-gray-200 md:grid-cols-2 lg:grid-cols-12">
            {/* ---------- LEFT: feature story ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-6 lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link
                to={octEditionArticlePath(featureStory)}
                className="group block"
              >
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={featureStory.image}
                    alt={featureStory.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <Kicker className="mt-5">
                  {featureStory.industry} · {featureStory.location}
                </Kicker>

                <h2 className="mt-2 line-clamp-3 text-[26px] font-extrabold leading-[1.12] text-gray-950 group-hover:underline md:text-[28px]">
                  {featureStory.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {featureStory.lede}
                </p>

                <div className="mt-3">
                  <TimeStamp>
                    {featureStory.publishedAt} · {featureStory.readTime}
                  </TimeStamp>
                </div>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={relatedFeature} />
              </div>
            </div>

            {/* ---------- CENTRE: lead story ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-6 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link
                to={octEditionArticlePath(leadStory)}
                className="group block"
              >
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <Kicker className="mt-5">
                  {leadStory.industry} · {leadStory.location}
                </Kicker>

                <h2 className="mt-2 line-clamp-3 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[26px]">
                  {leadStory.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {leadStory.lede}
                </p>

                <div className="mt-3">
                  <TimeStamp>
                    {leadStory.publishedAt} · {leadStory.readTime}
                  </TimeStamp>
                </div>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={relatedLead} />
              </div>
            </div>

            {/* ---------- RIGHT: key figures + more stories ---------- */}

            <aside className="flex flex-col p-6 md:col-span-2 lg:col-span-4">
              <div className="rounded-md bg-black p-4 text-white">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em]">
                    Key Figures
                  </h2>

                  <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    {supplyChainStories.length} stories
                  </span>
                </div>

                <div className="divide-y divide-white/10">
                  {leadStory.keyFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-start justify-between gap-3 py-2.5"
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
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="mb-2 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                  <h2 className="text-[18px] font-bold text-red-600">
                    More Supply Chain News
                  </h2>

                  <span className="text-[11px] font-semibold text-gray-400">
                    Newsroom
                  </span>
                </div>

                {supplyChainStories.length > 1 ? (
                  <ul className="mt-4 divide-y divide-gray-200">
                    {supplyChainStories.slice(1, 4).map((item) => (
                      <li key={item.id}>
                        <Link
                          to={octEditionArticlePath(item)}
                          className="group block py-3.5"
                        >
                          <Kicker>{item.location}</Kicker>

                          <span className="mt-1 line-clamp-2 block text-[14px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                            {item.title}
                          </span>

                          <div className="mt-1.5">
                            <TimeStamp>
                              {item.publishedAt} · {item.readTime}
                            </TimeStamp>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-[12px] text-gray-400">
                    More supply chain stories will appear here.
                  </p>
                )}
              </div>
            </aside>
          </section>

          {/* AD 1 of 4 — below the top band */}
          <div className="mt-8">
            <PrideTimesAd variant="first" />
          </div>

          {/* =================================================
              2. INTERVIEW ROW — image left, story right
          ================================================= */}

          {supplyChainStories.length >= 3 && (
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
                <Kicker>{interviewStory.industry}</Kicker>

                <Link
                  to={octEditionArticlePath(interviewStory)}
                  className="group block"
                >
                  <h2 className="mt-2 line-clamp-3 text-[28px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[32px]">
                    {interviewStory.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-gray-600">
                    {interviewStory.lede}
                  </p>
                </Link>

                {interviewRelated && (
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <Link
                      to={octEditionArticlePath(interviewRelated)}
                      className="group block"
                    >
                      <span className="block text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline line-clamp-2">
                        {interviewRelated.title}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </section>
          )}

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
                      <Kicker>{story.industry}</Kicker>

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
          )}

          {/* AD 2 of 4 — mid-page */}
          <AdSlot
            slot={AD_SLOTS.inArticle}
            format="fluid"
            layout="in-article"
            minHeight={120}
          />

          {/* =================================================
              4. LATEST SUPPLY CHAIN NEWS — numbered list
          ================================================= */}

          <section aria-label="Latest supply chain news" className="mt-16 mb-16">
            <SectionHeader
              title="Latest Supply Chain News"
              onClick={scrollToFeed}
              linkText="See all"
            />

            <ol className="grid grid-cols-1 items-stretch gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {supplyChainStories.slice(0, 6).map((story, index) => (
                <li key={story.id} className="border-b border-gray-200">
                  <Link
                    to={octEditionArticlePath(story)}
                    className="group flex h-full gap-4 py-5"
                  >
                    <span className="w-6 shrink-0 text-[22px] font-extrabold leading-none tabular-nums text-gray-300">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <Kicker>
                        {story.industry} · {story.location}
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
              5. LATEST FEED + STICKY SIDEBAR
          ================================================= */}

          <section ref={feedRef} aria-label="Supply chain feed" className="mb-12 scroll-mt-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.9fr_0.7fr]">
              {/* ---------- Feed ---------- */}

              <div className="min-w-0">
                <SectionHeader title="All Supply Chain News" />

                <div className="divide-y divide-gray-200">
                  {feedStories.map((story) => (
                    <Link
                      key={story.id}
                      to={octEditionArticlePath(story)}
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
                            {story.industry}
                          </span>

                          <span className="text-[10px] text-gray-300">•</span>

                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                            <MapPin size={9} />
                            {story.location}
                          </span>
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

                {feedHasMore && (
                  <div className="mt-5 flex flex-col items-center gap-2 border-t border-gray-200 pt-5">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount((count) =>
                          Math.min(count + PAGE_SIZE, supplyChainStories.length)
                        )
                      }
                      className="border border-black px-6 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-black hover:text-white"
                    >
                      Show more stories
                    </button>

                    <span className="text-[10px] text-gray-400">
                      Showing {feedStories.length} of {supplyChainStories.length}
                    </span>
                  </div>
                )}
              </div>

              {/* ---------- Sticky column: magazine + ad ---------- */}

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

                  {/* AD 3 of 4 — sticky sidebar */}
                  <div className="mt-8">
                    <AdSlot
                      slot={AD_SLOTS.sidebar}
                      format="auto"
                      minHeight={250}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AD 4 of 4 — bottom of page */}
          <PrideTimesAd variant="second" />
        </main>
      </div>
    </div>
  );
}

export default SupplyChainPage;
