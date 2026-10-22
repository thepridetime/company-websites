import { useEffect } from "react";
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
  maArticles,
  maDeals,
  maHeroArticle,
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
const otherStories = maItems.slice(1);

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
   SECTION HEADER (same style as homepage)
   ========================================================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-black pb-2.5 mb-5">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
        {title}
      </h2>
      <span className="hidden sm:block text-[8px] uppercase tracking-[0.16em] text-gray-400">
        The Pride Times
      </span>
    </div>
  );
}

/* =========================================================
   MERGERS AND ACQUISITIONS PAGE
   ========================================================= */

export function MergersAcquisitionsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-4 md:pt-6 pb-16">
          {/* PAGE TITLE */}
          <header className="border-t-[3px] border-red-600 pt-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
              <div>
                <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold leading-tight">
                  {SECTION_LABEL}
                </h1>
                <p className="mt-1 text-[11px] md:text-[13px] text-gray-500">
                  Deals, takeovers, mergers and divestitures from The Pride
                  Times.
                </p>
              </div>
              <span className="text-[8px] uppercase tracking-[0.18em] text-gray-400">
                Deals • Takeovers • Mergers
              </span>
            </div>
          </header>

          <PrideTimesAd variant="first" />

          {!leadStory && (
            <p className="py-10 text-center text-[11px] text-gray-400">
              No M&amp;A stories yet.
            </p>
          )}

          {leadStory && (
            <section className="pb-8 mb-8 border-b border-gray-300">
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 lg:gap-6">
                {/* LEAD STORY */}
                <Link
                  to={leadStory.href}
                  className="group relative block overflow-hidden rounded-lg border border-gray-200 min-h-[430px] lg:min-h-[500px] bg-black"
                >
                  <ImageWithFallback
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                  <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[9px] font-bold tracking-[0.16em] uppercase rounded-[2px]">
                    {leadStory.kicker}
                    {leadStory.location ? ` | ${leadStory.location}` : ""}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h2 className="font-serif text-2xl md:text-[30px] lg:text-[34px] font-bold leading-[1.08] text-white">
                      {leadStory.title}
                    </h2>
                    <p className="text-[12px] md:text-[13px] text-gray-200 leading-[1.6] mt-3 line-clamp-3">
                      {leadStory.lede}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-wide mt-4 border-b border-white/60 pb-1">
                      Read Full Story <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>

                {/* RIGHT COLUMN */}
                <aside className="min-w-0">
                  <div className="pb-5 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-serif text-lg font-bold">
                        Key Figures
                      </h2>
                      <span className="border border-gray-300 rounded-full px-3 py-1 text-[9px] font-medium">
                        {maItems.length} stories
                      </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {leadStory.keyFacts.map((fact) => (
                        <div
                          key={fact.label}
                          className="py-2 flex items-start justify-between gap-3"
                        >
                          <span className="text-[10px] font-semibold text-gray-800">
                            {fact.label}
                          </span>
                          <span className="text-[10px] text-gray-500 text-right tabular-nums">
                            {fact.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-1">
                      <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                        More M&amp;A News
                      </h2>
                      <span className="text-[8px] uppercase tracking-wide text-gray-400">
                        Newsroom
                      </span>
                    </div>

                    {otherStories.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {otherStories.slice(0, 6).map((item) => (
                          <Link
                            key={item.id}
                            to={item.href}
                            className="group block py-3"
                          >
                            <div className="flex gap-3">
                              <span className="shrink-0 text-[9px] font-semibold text-red-600 w-[58px] truncate">
                                {item.location ?? item.kicker}
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
                    ) : (
                      <p className="py-3 text-[10px] text-gray-400">
                        More M&amp;A stories will appear here.
                      </p>
                    )}
                  </div>

                  <SidebarAd />
                </aside>
              </div>
            </section>
          )}

          {/* LATEST M&A FEED */}
          {maItems.length > 0 && (
            <section className="mb-12">
              <SectionHeader title={`Latest ${SECTION_LABEL} News`} />

              <div className="divide-y divide-gray-200">
                {maItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="group grid grid-cols-[130px_1fr] sm:grid-cols-[280px_1fr] gap-4 sm:gap-6 py-6"
                  >
                    <div className="w-full h-[96px] sm:h-[185px] overflow-hidden rounded-md">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2">
                        <span className="text-[8px] font-bold text-red-600 uppercase tracking-[0.14em]">
                          {item.kicker}
                        </span>
                        {item.location && (
                          <>
                            <span className="text-[8px] text-gray-300">•</span>
                            <span className="inline-flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-gray-400">
                              <MapPin size={8} />
                              {item.location}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="font-serif text-base sm:text-2xl font-bold leading-[1.2] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>

                      <p className="hidden sm:block text-[13px] text-gray-500 leading-[1.55] mt-2 line-clamp-3">
                        {item.lede}
                      </p>

                      <span className="flex items-center gap-1 text-[9px] text-gray-400 mt-1.5">
                        <Clock size={8} />
                        {item.meta}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <PrideTimesAd variant="second" />
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
