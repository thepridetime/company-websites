import { useEffect, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Clock3,
  Handshake,
  MapPin,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import { NewsletterCTA } from "../NewsletterCTA";
import {
  maEdition1Articles,
  maEdition1ArticlePath,
  type EditionArticle,
} from "../../data/maEdition1Data";
import {
  octEditionArticles,
  octEditionArticlePath,
  type OctEditionArticle,
} from "../../data/octEditionData";
import {
  maDeals,
  getMAArticleBySlug,
  getRelatedMAArticles,
  type MAArticle,
  type MADeal,
} from "../../data/mergersAcquisitionsData";

/* Display label for this section (page title, cards and feed). */
const SECTION_LABEL = "Mergers and Acquisitions";

/* =========================================================
   M&A NEWS ITEMS
   - Deal stories from the M&A Edition 1 (maEdition1Data.ts)
   - "Deals and Moves Roundup" from the October 2026 Global
     Industry Edition (octEditionData.ts, section
     "Mergers and Acquisitions")
   ========================================================= */

type MAItem = {
  id: string;
  href: string;
  title: string;
  lede: string;
  kicker: string;
  location?: string;
  image: string;
  meta: string;
  keyFacts: { label: string; value: string }[];
};

const editionItems: MAItem[] = maEdition1Articles.map(
  (article: EditionArticle) => ({
    id: article.id,
    href: maEdition1ArticlePath(article),
    title: article.title,
    lede: article.lede,
    kicker: article.industry,
    location: article.location,
    image: article.image,
    meta: `${article.publishedAt} · ${article.readTime}`,
    keyFacts: article.keyFacts,
  })
);

const octMAItems: MAItem[] = octEditionArticles
  .filter(
    (article: OctEditionArticle) =>
      article.section === "Mergers and Acquisitions"
  )
  .map((article) => ({
    id: article.id,
    href: octEditionArticlePath(article),
    title: article.title,
    lede: article.lede,
    kicker: article.industry,
    location: article.location,
    image: article.image,
    meta: `${article.publishedAt} · ${article.readTime}`,
    keyFacts: article.keyFacts,
  }));

const maItems: MAItem[] = [...editionItems, ...octMAItems];
const leadStory = maItems[0];
const feedStories = maItems.slice(1);
const topStories = feedStories.slice(0, 4);

/* =========================================================
   DEAL HELPERS
   ========================================================= */

const parseValueB = (value: string) => {
  const n = parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const totalDealValueB = maDeals.reduce(
  (sum, deal) => sum + parseValueB(deal.value),
  0
);

const countByStatus = (status: MADeal["status"]) =>
  maDeals.filter((deal) => deal.status === status).length;

const STATUS_STYLES: Record<MADeal["status"], string> = {
  Announced: "bg-gray-50 text-gray-700 border-gray-300",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Closed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

/* =========================================================
   SMALL UI PIECES
   Same design rules as the homepage:
   - Headlines: serif, hover = underline (not colour change).
   - Red is ONLY for category labels and "view all" links.
   - Black top rule on every section header.
   - Square-ish corners (rounded-sm), light grey dividers.
   ========================================================= */

function SectionHeader({
  title,
  rightLabel = "The Pride Times",
}: {
  title: string;
  rightLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
        {title}
      </h2>
      <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:block">
        {rightLabel}
      </span>
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
      {children}
    </span>
  );
}

function TimeStamp({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[10px] text-gray-400">
      <Clock size={9} />
      {children}
    </span>
  );
}

/* =========================================================
   FEATURED DEAL CARD (left column, dark image card)
   ========================================================= */

function FeaturedDealCard({ item }: { item: MAItem }) {
  return (
    <article className="group relative flex h-full min-h-[560px] flex-col justify-between overflow-hidden rounded-sm bg-black lg:min-h-[640px]">
      <Link
        to={item.href}
        aria-label={item.title}
        className="absolute inset-0 z-0 block"
      >
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          loading="eager"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />
      </Link>

      {/* Badges */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 p-4 sm:p-5">
        <span className="rounded-sm bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
          {item.kicker}
        </span>
        {item.location && (
          <span className="inline-flex items-center gap-1 rounded-sm bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-900">
            <MapPin size={10} />
            {item.location}
          </span>
        )}
      </div>

      {/* Headline, summary, key facts, action */}
      <div className="relative z-10 p-5 sm:p-6 md:p-7">
        <Link to={item.href} className="group/title block">
          <h2 className="font-serif text-[28px] font-bold leading-[1.1] text-white group-hover/title:underline md:text-[34px]">
            {item.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-gray-200">
            {item.lede}
          </p>
        </Link>

        {item.keyFacts.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-white/20 pt-4">
            {item.keyFacts.slice(0, 4).map((fact) => (
              <div key={fact.label} className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  {fact.label}
                </p>
                <p className="mt-0.5 truncate font-serif text-[16px] font-bold leading-tight text-white sm:text-[17px]">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5">
          <Link
            to={item.href}
            className="group/link inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-white hover:underline"
          >
            <span>Read Full Story</span>
            <ArrowRight
              size={10}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   TOP M&A STORIES (middle column, thumbnail list)
   ========================================================= */

function TopDealStories({ items }: { items: MAItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-1 flex items-baseline justify-between border-t-[3px] border-black pt-2">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
          Top M&amp;A Stories
        </h3>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
          {items.length} stories
        </span>
      </div>

      <div className="flex flex-col divide-y divide-gray-200">
        {items.map((item) => (
          <article key={item.id} className="group py-3.5 last:pb-1">
            <div className="flex gap-4">
              <Link
                to={item.href}
                className="block h-[80px] w-[112px] shrink-0 overflow-hidden rounded-sm bg-gray-100 sm:h-[88px] sm:w-[124px]"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <Kicker>
                    {item.location
                      ? `${item.kicker} · ${item.location}`
                      : item.kicker}
                  </Kicker>
                  <Link to={item.href} className="block">
                    <h4 className="mt-1 line-clamp-2 font-serif text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                      {item.title}
                    </h4>
                  </Link>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <TimeStamp>{item.meta}</TimeStamp>
                  <button
                    type="button"
                    aria-label="Bookmark story"
                    className="shrink-0 p-0.5 text-gray-400 transition-colors hover:text-gray-800"
                  >
                    <Bookmark size={12} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   DEAL NUMBERS (right column)
   ========================================================= */

function DealNumbers() {
  const stats = [
    { label: "Tracked deals", value: String(maDeals.length) },
    { label: "Combined value", value: `$${totalDealValueB.toFixed(1)}B` },
    { label: "Pending", value: String(countByStatus("Pending")) },
    { label: "Closed", value: String(countByStatus("Closed")) },
  ];

  return (
    <div className="pb-5">
      <SectionHeader title="Numbers at a Glance" rightLabel="Deal tracker" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-serif text-[24px] font-bold leading-none text-gray-950 sm:text-[26px]">
              {stat.value}
            </div>
            <div className="mt-1.5 text-[11px] text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   DEAL WATCH (right column, compact tracker list)
   ========================================================= */

function DealWatch({ deals }: { deals: MADeal[] }) {
  if (deals.length === 0) {
    return null;
  }

  return (
    <section className="pt-1">
      <div className="mb-1 flex items-baseline justify-between border-t-[3px] border-black pt-2">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
          Deal Watch
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
          {deals.length} tracked
        </span>
      </div>

      <div className="divide-y divide-gray-200">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="flex items-start justify-between gap-3 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold leading-snug text-gray-950">
                {deal.acquirer}{" "}
                <span className="font-normal text-gray-400">→</span>{" "}
                {deal.target}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-gray-500">
                {deal.sector}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <div className="font-serif text-[15px] font-bold leading-tight text-gray-950">
                {deal.value}
              </div>
              <span
                className={`mt-1 inline-block rounded-sm border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${STATUS_STYLES[deal.status]}`}
              >
                {deal.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   LATEST M&A FEED (two-column card grid)
   ========================================================= */

function LatestDealCard({ item }: { item: MAItem }) {
  return (
    <Link to={item.href} className="group block">
      <div className="overflow-hidden rounded-sm bg-gray-100">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-2.5">
        <div className="flex flex-wrap items-center gap-x-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
            {item.kicker}
          </span>
          {item.location && (
            <>
              <span className="text-[10px] text-gray-300">•</span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                <MapPin size={9} />
                {item.location}
              </span>
            </>
          )}
        </div>

        <h3 className="mt-1 font-serif text-[19px] font-bold leading-[1.2] text-gray-950 group-hover:underline sm:text-[21px]">
          {item.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.5] text-gray-500">
          {item.lede}
        </p>

        <div className="mt-1.5">
          <TimeStamp>{item.meta}</TimeStamp>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   MERGERS AND ACQUISITIONS PAGE (LISTING)
   ========================================================= */

export function MergersAcquisitionsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* PAGE HEADER */}
          <header className="mb-6 border-t-[3px] border-black pt-3">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
                  <Handshake size={13} />
                  Deals &amp; Corporate Strategy
                </span>
                <h1 className="mt-1.5 font-serif text-[28px] font-bold leading-[1.1] text-gray-950 md:text-[38px]">
                  {SECTION_LABEL}
                </h1>
                <p className="mt-2 text-[12px] leading-[1.5] text-gray-500 md:text-[13px]">
                  Deals, takeovers, mergers and divestitures from The Pride
                  Times.
                </p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                Deals • Takeovers • Mergers
              </span>
            </div>
          </header>

          {/* TOP AD */}
          <div className="mb-6">
            <PrideTimesAd variant="first" />
          </div>

          {!leadStory && (
            <p className="py-10 text-center text-[12px] text-gray-400">
              No M&amp;A stories yet.
            </p>
          )}

          {leadStory && (
            <>
              {/* =================================================
                  MAIN EDITORIAL SECTION (3-COLUMN MAGAZINE LAYOUT)
              ================================================= */}
              <section className="mb-10 border-b border-gray-300 pb-8">
                <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.16fr_1.18fr_0.92fr] lg:gap-0">
                  {/* LEFT: Featured deal */}
                  <div className="flex min-w-0 flex-col lg:pr-6">
                    <FeaturedDealCard item={leadStory} />
                  </div>

                  {/* MIDDLE: Top stories */}
                  <div className="min-w-0 lg:border-x lg:border-gray-200 lg:px-6">
                    <TopDealStories items={topStories} />
                  </div>

                  {/* RIGHT: Numbers + Deal Watch */}
                  <div className="flex min-w-0 flex-col lg:pl-6">
                    <DealNumbers />
                    <DealWatch deals={maDeals} />
                  </div>
                </div>
              </section>

              {/* MID AD */}
              <div className="mb-12">
                <PrideTimesAd variant="second" />
              </div>

              {/* LATEST FEED */}
              {feedStories.length > 0 && (
                <section aria-label="Latest M&A news" className="mb-12">
                  <SectionHeader
                    title={`Latest ${SECTION_LABEL} News`}
                    rightLabel="Newsroom"
                  />
                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
                    {feedStories.map((item) => (
                      <LatestDealCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* NEWSLETTER CTA */}
          <NewsletterCTA
            title="Stay Ahead with The Pride Times"
            description="Daily briefings on mergers, acquisitions, takeovers and corporate strategy delivered directly to your inbox."
            newsletterKey="daily-brief"
          />
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   M&A ARTICLE PAGE
   Keeps the /mergers-acquisitions/:slug route working.
   ========================================================= */

type AdSenseWindow = Window & {
  adsbygoogle?: unknown[];
};

function MAAdSpace({
  slot = "5373718974",
  inArticle = false,
}: {
  slot?: "5373718974" | "8042854193";
  inArticle?: boolean;
}) {
  useEffect(() => {
    try {
      const adsWindow = window as AdSenseWindow;
      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
    } catch (error) {
      console.warn("AdSense could not initialize:", error);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-4">
      <p className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        Advertisement
      </p>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          minHeight: inArticle ? "120px" : "90px",
        }}
        data-ad-client="ca-pub-2331501617441941"
        data-ad-slot={slot}
        {...(inArticle
          ? {
              "data-ad-layout": "in-article",
              "data-ad-format": "fluid",
            }
          : {
              "data-ad-format": "auto",
              "data-full-width-responsive": "true",
            })}
      />
    </div>
  );
}

function MAArticleDetail({ article }: { article: MAArticle }) {
  const related = getRelatedMAArticles(article, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [article.slug]);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 md:py-10 lg:px-8">
        <Link
          to="/mergers-acquisitions"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-gray-500 transition-colors hover:text-red-600"
        >
          <ArrowLeft size={13} />
          Back to M&amp;A
        </Link>

        <header className="mx-auto mt-8 max-w-3xl border-b border-gray-200 pb-7 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">
            {article.category}
          </p>

          <h1 className="mx-auto mt-4 font-serif text-2xl font-bold leading-[1.15] tracking-tight text-gray-950 sm:text-3xl md:text-[34px]">
            {article.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-[1.75] text-gray-600">
            {article.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-gray-400">
            <span className="font-semibold text-gray-700">
              By {article.author}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span>{article.publishedAt}</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1">
              <Clock3 size={11} />
              {article.readTime}
            </span>
          </div>
        </header>

        <div className="mx-auto mt-9 grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-12">
          <article className="min-w-0">
            <div className="border-l-2 border-red-600 bg-gray-50 px-5 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-red-600">
                The central argument
              </p>
              <p className="mt-2 font-serif text-lg leading-[1.65] text-gray-800">
                {article.subtitle}
              </p>
            </div>

            <section className="mt-9 border-y border-gray-200 py-6">
              <h2 className="font-serif text-xl font-bold text-gray-950">
                Key takeaways
              </h2>
              <ul className="mt-4 space-y-3">
                {article.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm leading-6 text-gray-700"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-1 shrink-0 text-red-600"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-9 space-y-9">
              {article.sections.map((section, index) => (
                <section key={section.heading}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-serif text-sm font-bold text-red-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <h2 className="font-serif text-xl font-bold leading-tight tracking-tight text-gray-950">
                    {section.heading}
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.95] text-gray-700">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <section className="mt-10 border-t-2 border-black pt-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-red-600">
                Editorial note
              </p>
              <p className="mt-2 text-xs leading-6 text-gray-500">
                {article.editorNote}
              </p>
            </section>

            <div className="mt-7 flex flex-wrap gap-2 border-t border-gray-200 pt-5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-gray-200 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <aside className="space-y-7 lg:pt-0">
            <div className="border-t-2 border-black bg-white p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                Story guide
              </p>
              <h2 className="mt-2 font-serif text-xl font-bold text-gray-950">
                About this article
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-gray-400">
                    Publication
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    The Pride Times
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-gray-400">
                    Desk
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    Mergers &amp; Acquisitions
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-gray-400">
                    Reading time
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {article.readTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 bg-[#f8f8f7] p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-red-600">
                The Pride Times
              </p>
              <h3 className="mt-2 font-serif text-xl font-bold text-gray-950">
                Follow the transaction, not just the headline.
              </h3>
              <p className="mt-3 text-xs leading-6 text-gray-600">
                Explore more coverage on deal strategy, valuation, regulation
                and integration.
              </p>
              <Link
                to="/mergers-acquisitions"
                className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-900 hover:text-red-600"
              >
                Explore M&amp;A <ArrowRight size={13} />
              </Link>
            </div>
          </aside>
        </div>

        <div className="mx-auto my-12 max-w-6xl">
          <MAAdSpace slot="8042854193" inArticle />
        </div>

        {related.length > 0 && (
          <section className="mx-auto mt-12 max-w-6xl border-t-2 border-black pt-8">
            <div className="mb-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                Continue reading
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-gray-950">
                More M&amp;A Analysis
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/mergers-acquisitions/${item.slug}`}
                  className="group border border-gray-200 bg-white p-5 transition-colors hover:border-gray-400"
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-red-600">
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-bold leading-tight text-gray-950 transition-colors group-hover:text-red-600">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-xs leading-5 text-gray-500">
                    {item.subtitle}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] text-gray-800">
                    Read article <ArrowUpRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   ARTICLE ROUTE WRAPPER
   ========================================================= */

export function MergersAcquisitionsArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getMAArticleBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!article) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-4xl px-5 py-20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">
          M&amp;A | Article not found
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-gray-950">
          This article is unavailable.
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          The article may have been moved or the link may be incorrect.
        </p>
        <Link
          to="/mergers-acquisitions"
          className="mt-6 inline-flex items-center gap-2 bg-black px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-red-600"
        >
          <ArrowLeft size={13} />
          Return to M&amp;A
        </Link>
      </main>
    );
  }

  return <MAArticleDetail article={article} />;
}

export default MergersAcquisitionsPage;
