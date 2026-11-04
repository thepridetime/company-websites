import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Clock3,
  MapPin,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import { NewsletterCTA } from "../NewsletterCTA";
import {
  maEdition1Articles,
  maEdition1ArticlePath,
  maEdition1DealTable,
  maEdition1Sources,
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
const PAGE_SIZE = 8;

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

/* Homepage-style layout slots */
const leadStory: MAItem | undefined = maItems[0];
const majorStories = maItems.slice(1, 3);
const editorsPick: MAItem | undefined = maItems[3];
const sideHeadlines = maItems.slice(4, 8);

const industryTabs = [
  "All",
  ...Array.from(new Set(maItems.map((item) => item.kicker))),
];

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

/* Status chips on the dark Deal Watch panel */
const DARK_STATUS_STYLES: Record<MADeal["status"], string> = {
  Announced: "border-white/30 text-gray-300",
  Pending: "border-amber-400/40 text-amber-300",
  Closed: "border-emerald-400/40 text-emerald-300",
};

/* =========================================================
   SMALL UI PIECES (same as homepage)
   - Headlines: serif. Hover = underline (not colour change).
   - Red is ONLY for category labels and "view" links.
   - Black top rule on every section header.
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
   DEAL WATCH (dark panel, same style as homepage Markets)
   ========================================================= */

function DealWatchPanel({ deals }: { deals: MADeal[] }) {
  if (deals.length === 0) {
    return null;
  }

  return (
    <div className="rounded-sm bg-black p-4 text-white">
      <div className="flex items-center justify-between border-b border-white/20 pb-2">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
          Deal Watch
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
          {deals.length} tracked
        </span>
      </div>

      <div className="divide-y divide-white/10">
        {deals.map((deal) => (
          <div key={deal.id} className="flex items-start justify-between gap-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-gray-100">
                {deal.acquirer}{" "}
                <span className="font-normal text-gray-500">→</span>{" "}
                {deal.target}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-gray-500">
                {deal.sector}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-[12px] tabular-nums text-gray-300">
                {deal.value}
              </div>
              <span
                className={`mt-1 inline-block rounded-sm border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${DARK_STATUS_STYLES[deal.status]}`}
              >
                {deal.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR: NUMBERS + BROWSE BY INDUSTRY
   ========================================================= */

function DealNumbers() {
  const stats = [
    { label: "Tracked deals", value: String(maDeals.length) },
    { label: "Combined value", value: `$${totalDealValueB.toFixed(1)}B` },
    { label: "Pending", value: String(countByStatus("Pending")) },
    { label: "Closed", value: String(countByStatus("Closed")) },
  ];

  return (
    <div>
      <SectionHeader title="Numbers at a Glance" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-serif text-[24px] font-bold leading-none text-gray-950">
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
   MERGERS AND ACQUISITIONS PAGE (LISTING)
   ========================================================= */

export function MergersAcquisitionsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = useMemo(
    () =>
      activeTab === "All"
        ? maItems
        : maItems.filter((item) => item.kicker === activeTab),
    [activeTab]
  );

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  const openIndustryFeed = (tab: string) => {
    selectTab(tab);

    window.requestAnimationFrame(() => {
      feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* PAGE TITLE */}
          <header className="mb-6 border-t-[3px] border-black pt-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
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

          <PrideTimesAd variant="first" />

          {!leadStory && (
            <p className="py-10 text-center text-[12px] text-gray-400">
              No M&amp;A stories yet.
            </p>
          )}

          {leadStory && (
            <>
              {/* =================================================
                  1. TOP SECTION — 3 columns, like the homepage
                     LEFT   : text-only Top Stories list
                     CENTER : lead story + 2 secondary stories
                     RIGHT  : Deal Watch panel + Editor's Pick
              ================================================= */}
              <section className="mb-10 border-b border-gray-300 pb-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0">
                  {/* LEFT: Top stories (text only) */}
                  <aside className="order-2 min-w-0 lg:order-1 lg:col-span-3 lg:border-r lg:border-gray-200 lg:pr-6">
                    <div className="mb-1 border-t-[3px] border-black pt-2">
                      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                        Top Stories
                      </h2>
                    </div>

                    <ul className="divide-y divide-gray-200">
                      {sideHeadlines.map((story) => (
                        <li key={story.id}>
                          <Link
                            to={story.href}
                            className="group block py-3.5"
                          >
                            <Kicker>{story.kicker}</Kicker>

                            <h3 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                              {story.title}
                            </h3>

                            <div className="mt-1.5">
                              <TimeStamp>{story.meta}</TimeStamp>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </aside>

                  {/* CENTER: lead story */}
                  <div className="order-1 min-w-0 lg:order-2 lg:col-span-6 lg:px-6">
                    <Link to={leadStory.href} className="group block">
                      <div className="relative overflow-hidden rounded-sm bg-black">
                        <ImageWithFallback
                          src={leadStory.image}
                          alt={leadStory.title}
                          loading="eager"
                          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="mt-4">
                        <Kicker>
                          {leadStory.kicker}
                          {leadStory.location ? ` · ${leadStory.location}` : ""}
                        </Kicker>

                        <h1 className="mt-1.5 font-serif text-[28px] font-bold leading-[1.1] text-gray-950 group-hover:underline md:text-[38px]">
                          {leadStory.title}
                        </h1>

                        <p className="mt-3 text-[15px] leading-[1.55] text-gray-600">
                          {leadStory.lede}
                        </p>

                        <div className="mt-3">
                          <TimeStamp>{leadStory.meta}</TimeStamp>
                        </div>
                      </div>
                    </Link>

                    {/* Two secondary stories under the lead */}
                    {majorStories.length > 0 && (
                      <div className="mt-6 grid grid-cols-1 gap-6 border-t border-gray-200 pt-5 sm:grid-cols-2">
                        {majorStories.map((story) => (
                          <Link
                            key={story.id}
                            to={story.href}
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
                              <Kicker>{story.kicker}</Kicker>

                              <h3 className="mt-1 font-serif text-[19px] font-bold leading-[1.2] text-gray-950 group-hover:underline">
                                {story.title}
                              </h3>

                              <div className="mt-1.5">
                                <TimeStamp>{story.meta}</TimeStamp>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RIGHT: Deal Watch + Editor's Pick */}
                  <aside className="order-3 min-w-0 lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-6">
                    <DealWatchPanel deals={maDeals} />

                    {editorsPick && (
                      <div className="mt-6">
                        <div className="mb-3 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                          <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                            Editor's Pick
                          </h2>
                        </div>

                        <Link
                          to={editorsPick.href}
                          className="group block"
                        >
                          <div className="overflow-hidden rounded-sm">
                            <ImageWithFallback
                              src={editorsPick.image}
                              alt={editorsPick.title}
                              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </div>

                          <div className="mt-2.5">
                            <Kicker>{editorsPick.kicker}</Kicker>

                            <h3 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                              {editorsPick.title}
                            </h3>

                            <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.5] text-gray-500">
                              {editorsPick.lede}
                            </p>
                          </div>
                        </Link>
                      </div>
                    )}
                  </aside>
                </div>
              </section>

              <PrideTimesAd variant="second" />

              {/* =================================================
                  2. LATEST M&A NEWS
                     LEFT  : tabs + filterable feed with "Show more"
                     RIGHT : sticky numbers + browse by industry
              ================================================= */}
              <section aria-label="Latest M&A news" className="mb-12">
                <SectionHeader title={`Latest ${SECTION_LABEL} News`} />

                <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.9fr_0.7fr]">
                  {/* Feed */}
                  <div ref={feedRef} className="scroll-mt-24 min-w-0">
                    <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                      {industryTabs.map((tab) => (
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
                      {visibleItems.length === 0 && (
                        <p className="py-6 text-[12px] text-gray-400">
                          No stories in this category yet.
                        </p>
                      )}

                      {visibleItems.map((item) => (
                        <Link
                          key={item.id}
                          to={item.href}
                          className="group grid grid-cols-[110px_1fr] gap-4 py-5 sm:grid-cols-[200px_1fr] sm:gap-5"
                        >
                          <div className="h-[80px] w-full overflow-hidden rounded-sm bg-gray-100 sm:h-[126px]">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="min-w-0">
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

                            <h3 className="mt-1 font-serif text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline sm:text-[21px]">
                              {item.title}
                            </h3>

                            <p className="mt-1.5 hidden text-[13px] leading-[1.5] text-gray-500 line-clamp-2 sm:block">
                              {item.lede}
                            </p>

                            <div className="mt-1.5">
                              <TimeStamp>{item.meta}</TimeStamp>
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
                              Math.min(count + PAGE_SIZE, filteredItems.length)
                            )
                          }
                          className="rounded-sm border border-black px-6 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-black hover:text-white"
                        >
                          Show more stories
                        </button>

                        <span className="text-[10px] text-gray-400">
                          Showing {visibleItems.length} of {filteredItems.length}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="min-w-0">
                    <div className="lg:sticky lg:top-24">
                      <DealNumbers />

                      <div className="mt-8">
                        <SectionHeader title="Browse by Industry" />

                        <div className="divide-y divide-gray-200">
                          {industryTabs
                            .filter((tab) => tab !== "All")
                            .map((tab) => {
                              const count = maItems.filter(
                                (item) => item.kicker === tab
                              ).length;

                              return (
                                <button
                                  key={tab}
                                  type="button"
                                  onClick={() => openIndustryFeed(tab)}
                                  className="flex w-full items-center justify-between py-3 text-left"
                                >
                                  <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-gray-950 hover:underline">
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

                      <div className="mt-8">
                        <PrideTimesAd variant="third" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* =================================================
                  3. DEAL STATUS TABLE (collapsed, as on homepage)
              ================================================= */}
              {maEdition1DealTable.length > 0 && (
                <section className="mb-12">
                  <details className="rounded-sm border border-gray-300">
                    <summary className="cursor-pointer select-none px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-900">
                      Deal status table
                    </summary>

                    <div className="overflow-x-auto border-t border-gray-200">
                      <table className="w-full min-w-[560px] text-left text-[12px]">
                        <thead className="bg-gray-50 text-[10px] uppercase tracking-wide text-gray-500">
                          <tr>
                            <th className="px-4 py-2 font-semibold">Deal</th>
                            <th className="px-4 py-2 font-semibold">Value</th>
                            <th className="px-4 py-2 font-semibold">Announced</th>
                            <th className="px-4 py-2 font-semibold">Status</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                          {maEdition1DealTable.map((row) => (
                            <tr key={row.deal}>
                              <td className="px-4 py-2 font-medium text-gray-900">
                                {row.deal}
                              </td>
                              <td className="px-4 py-2 text-gray-700">{row.value}</td>
                              <td className="px-4 py-2 text-gray-700">
                                {row.announced}
                              </td>
                              <td className="px-4 py-2 text-gray-700">{row.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="border-t border-gray-200 px-4 py-3 text-[11px] leading-[1.5] text-gray-400">
                      {maEdition1Sources}
                    </p>
                  </details>
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

      {/* Local page utilities (same as homepage) */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(227, 27, 35, 0.12); color: inherit; }
      `}</style>
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
