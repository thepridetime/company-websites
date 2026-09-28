import React, { useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Clock,
  Globe2,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  specialArticles,
  specialArticlePathByTitle,
} from "../../data/specialArticleData";

/* =========================================================
   GOOGLE ADSENSE
   ========================================================= */

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSenseSlotProps {
  slot: string;
  format?: "auto" | "fluid";
  layout?: string;
  layoutKey?: string;
  minHeight?: number;
  className?: string;
}

function AdSenseSlot({
  slot,
  format = "auto",
  layout,
  layoutKey,
  minHeight = 90,
  className = "",
}: AdSenseSlotProps) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
        Advertisement
      </div>

      <div
        className="w-full overflow-hidden"
        style={{ minHeight: `${minHeight}px` }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minHeight: `${minHeight}px`,
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
   TYPES
   ========================================================= */

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    excerpt?: string;
    summary?: string;
    image?: string;
    imageUrl?: string;
    category?: string;
    date?: string;
    publishedAt?: string;
    readTime?: string;
    author?: string;
  };
  featured?: boolean;
}

/* =========================================================
   ARTICLE CARD
   ========================================================= */

function ArticleCard({
  article,
  featured = false,
}: ArticleCardProps) {
  const image =
    article.image ||
    article.imageUrl ||
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80";

  const description =
    article.excerpt ||
    article.summary ||
    "Read the latest international developments and global business news from The Pride Times.";

  const date =
    article.date ||
    article.publishedAt ||
    "September 2026";

  const path = specialArticlePathByTitle(article.title);

  if (featured) {
    return (
      <article className="group overflow-hidden border border-gray-200 bg-white">
        <Link to={path} className="block">
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute left-4 top-4">
              <span className="bg-[#e31b23] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                International
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              <span>{date}</span>

              {article.readTime && (
                <>
                  <span className="h-1 w-1 rounded-full bg-gray-400" />
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {article.readTime}
                  </span>
                </>
              )}
            </div>

            <h2 className="mb-4 font-serif text-2xl font-bold leading-tight text-[#071a2d] transition-colors group-hover:text-[#e31b23] md:text-4xl">
              {article.title}
            </h2>

            <p className="mb-5 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
              {description}
            </p>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#071a2d] transition-colors group-hover:text-[#e31b23]">
              Read Full Story
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group border-b border-gray-200 pb-6">
      <Link to={path} className="block">
        <div className="grid grid-cols-[120px_1fr] gap-4 sm:grid-cols-[180px_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500">
              <span className="text-[#e31b23]">International</span>
              <span>•</span>
              <span>{date}</span>
            </div>

            <h3 className="mb-2 font-serif text-lg font-bold leading-tight text-[#071a2d] transition-colors group-hover:text-[#e31b23] md:text-xl">
              {article.title}
            </h3>

            <p className="line-clamp-3 text-xs leading-6 text-gray-600 md:text-sm">
              {description}
            </p>

            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#071a2d]">
              Read More
              <ChevronRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* =========================================================
   INTERNATIONAL NEWS PAGE
   ========================================================= */

export function InternationalNewsPage() {
  /*
   * Get all international articles from the centralized
   * specialArticleData.ts registry.
   */
  const internationalArticles = specialArticles.filter(
    (article) =>
      article.category?.toLowerCase().includes("international") ||
      article.section?.toLowerCase().includes("international") ||
      article.id.startsWith("international-")
  );

  /*
   * Safety fallback:
   * If the category metadata changes, use IDs beginning
   * with international- rather than rendering a blank page.
   */
  const articles =
    internationalArticles.length > 0
      ? internationalArticles
      : specialArticles.filter((article) =>
          article.id.startsWith("international-")
        );

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 7);

  return (
    <main className="min-h-screen bg-white text-[#071a2d]">
      {/* =====================================================
          TOP AD
         ===================================================== */}

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-5 sm:px-6 lg:px-8">
        <AdSenseSlot
          slot="5373718974"
          format="auto"
          minHeight={90}
        />
      </section>

      {/* =====================================================
          PAGE HEADER
         ===================================================== */}

      <section className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-10 sm:px-6 md:pb-10 lg:px-8">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="flex h-10 w-10 items-center justify-center bg-[#071a2d] text-white">
            <Globe2 size={20} />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e31b23]">
              The Pride Times
            </p>

            <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl">
              International News
            </h1>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
            Global developments, diplomacy, geopolitics, international
            business, technology and the events shaping economies around
            the world.
          </p>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
            <TrendingUp size={13} />
            Global Desk
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
         ===================================================== */}

      <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* =================================================
              LEFT COLUMN
             ================================================= */}

          <div>
            {featuredArticle ? (
              <>
                <ArticleCard
                  article={featuredArticle}
                  featured
                />

                {/* In-article ad */}
                <div className="my-8">
                  <AdSenseSlot
                    slot="8042854193"
                    format="fluid"
                    layout="in-article"
                    minHeight={180}
                  />
                </div>

                {/* More stories */}
                {secondaryArticles.length > 0 && (
                  <div className="mt-8">
                    <div className="mb-6 flex items-center justify-between border-b-2 border-[#071a2d] pb-3">
                      <h2 className="font-serif text-2xl font-bold">
                        More International Stories
                      </h2>

                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500">
                        Global Desk
                      </span>
                    </div>

                    <div className="space-y-6">
                      {secondaryArticles.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Secondary ad */}
                <div className="my-10">
                  <AdSenseSlot
                    slot="5608262547"
                    format="fluid"
                    layoutKey="-ef+6k-30-ac+ty"
                    minHeight={180}
                  />
                </div>

                {/* Remaining stories */}
                {articles.length > 7 && (
                  <div className="mt-8">
                    <div className="mb-6 flex items-center justify-between border-b-2 border-[#071a2d] pb-3">
                      <h2 className="font-serif text-2xl font-bold">
                        Latest Global Developments
                      </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {articles.slice(7).map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* =================================================
                 EMPTY STATE
                 ================================================= */

              <div className="border border-gray-200 bg-gray-50 p-10 text-center">
                <Globe2
                  size={38}
                  className="mx-auto mb-4 text-gray-400"
                />

                <h2 className="font-serif text-2xl font-bold text-[#071a2d]">
                  International News
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600">
                  International stories are currently being updated.
                  Please check back shortly for the latest global
                  developments.
                </p>
              </div>
            )}
          </div>

          {/* =================================================
              RIGHT SIDEBAR
             ================================================= */}

          <aside className="space-y-8">
            {/* Sidebar Ad */}
            <div className="border-y border-gray-200 py-4">
              <AdSenseSlot
                slot="5373718974"
                format="auto"
                minHeight={250}
              />
            </div>

            {/* Global Brief */}
            <div className="border-t-4 border-[#071a2d] bg-gray-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold">
                  Global Brief
                </h2>

                <Globe2 size={17} />
              </div>

              <div className="space-y-4 text-sm leading-6 text-gray-600">
                <p>
                  Follow major developments across diplomacy,
                  international markets, technology and geopolitics.
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#e31b23]">
                    The Pride Times
                  </p>

                  <p className="mt-1 font-serif text-lg font-bold text-[#071a2d]">
                    Global coverage. Business perspective.
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#071a2d] p-6 text-white">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#e31b23]">
                The Pride Times
              </p>

              <h2 className="font-serif text-2xl font-bold">
                Global Intelligence
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Stay informed about international business,
                geopolitics and the developments shaping the global
                economy.
              </p>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 bg-[#e31b23] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-700"
              >
                Explore Global Coverage
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Bottom ad */}
            <AdSenseSlot
              slot="6810700989"
              format="auto"
              minHeight={250}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default InternationalNewsPage;
