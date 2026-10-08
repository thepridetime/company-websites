import { useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  Clock,
  TrendingUp,
} from "lucide-react";

import { TimeAgo } from "../../utils/timeAgo";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  hero,
  headlineNews,
  maDeals,
  earningsNews,
  corporateNews,
  startupNews,
  type BusinessArticle,
} from "../../data/businessNewsData";
import {
  octBusinessArticles,
  octEditionMeta,
  octEditionGlance,
  octEditionArticlePath,
} from "../../data/octEditionData";

/* =========================================================
   LOCAL IMAGES (company-websites/src/imports)
   Stories without their own image get a matching one by
   category so every headline has a picture.
========================================================= */
import businessStockDrop from "../../../imports/business-stock-drop.png";
import businessAviationJet from "../../../imports/business-aviation-jet.png";
import businessJioDigital from "../../../imports/business-jio-digital.png";
import businessGoldmanNyse from "../../../imports/business-goldman-nyse.png";
import energyTanks from "../../../imports/energy-tanks.png";
import warehouseRobotics from "../../../imports/warehouse-robotics.png";
import dataCentre from "../../../imports/data-centre.png";
import supplyChainMap from "../../../imports/supply-chain-map.png";

const categoryImages: Record<string, string> = {
  TELECOM: businessJioDigital,
  BANKING: businessGoldmanNyse,
  AEROSPACE: businessAviationJet,
  ENERGY: energyTanks,
  RETAIL: warehouseRobotics,
  LUXURY: businessStockDrop,
};

const fallbackPool = [dataCentre, supplyChainMap, businessStockDrop, warehouseRobotics];

function storyImage(story: BusinessArticle, index = 0): string {
  return (
    story.image ??
    categoryImages[story.category.toUpperCase()] ??
    fallbackPool[index % fallbackPool.length]
  );
}

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
   STORY LIST
   Newest edition first (The Pride Times News, Global Industry
   Edition), then every earlier business story. Nothing is removed.
   Every story is normalised into one card shape so the page can
   use the same layout as the International News page.
========================================================= */

interface BusinessCard {
  id: string;
  title: string;
  description: string;
  image: string;
  label: string;
  when: string;
  readTime?: string;
  path: string;
}

const newestCards: BusinessCard[] = octBusinessArticles.map((story) => ({
  id: story.id,
  title: story.title,
  description: story.lede,
  image: story.image,
  label: story.industry,
  when: octEditionMeta.date,
  readTime: story.readTime,
  path: octEditionArticlePath(story),
}));

const earlierStories: BusinessArticle[] = [
  hero,
  ...headlineNews,
  ...corporateNews,
  ...startupNews,
];

const earlierCards: BusinessCard[] = earlierStories.map((story, index) => ({
  id: story.id,
  title: story.title,
  description: story.excerpt ?? story.dek,
  image: storyImage(story, index),
  label: story.category,
  when: story.time,
  readTime: story.readTime,
  path: `/article/${story.id}`,
}));

const allCards: BusinessCard[] = [...newestCards, ...earlierCards];

/* =========================================================
   ARTICLE CARD (same card as the International News page)
   ========================================================= */

function ArticleCard({
  article,
  featured = false,
}: {
  article: BusinessCard;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <article className="group overflow-hidden border border-gray-200 bg-white">
        <Link to={article.path} className="block">
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute left-4 top-4">
              <span className="bg-[#e31b23] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                {article.label}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              <span>
                <TimeAgo iso={article.when} />
              </span>

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
              {article.description}
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
      <Link to={article.path} className="block">
        <div className="grid grid-cols-[120px_1fr] gap-4 sm:grid-cols-[180px_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500">
              <span className="text-[#e31b23]">{article.label}</span>
              <span>•</span>
              <span>
                <TimeAgo iso={article.when} />
              </span>
            </div>

            <h3 className="mb-2 font-serif text-lg font-bold leading-tight text-[#071a2d] transition-colors group-hover:text-[#e31b23] md:text-xl">
              {article.title}
            </h3>

            <p className="line-clamp-3 text-xs leading-6 text-gray-600 md:text-sm">
              {article.description}
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
   SECTION HEADING (same heading style as International News)
   ========================================================= */

function ListHeading({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="mb-6 flex items-center justify-between border-b-2 border-[#071a2d] pb-3">
      <h2 className="font-serif text-2xl font-bold">{title}</h2>

      {meta && (
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500">
          {meta}
        </span>
      )}
    </div>
  );
}

/* =========================================================
   EARNINGS + DEALS TABLES
   ========================================================= */

const earningsBadge: Record<string, string> = {
  BEAT: "bg-green-600 text-white",
  MISS: "bg-red-600 text-white",
};

const dealBadge: Record<string, string> = {
  Closed: "bg-green-600 text-white",
  Announced: "bg-blue-600 text-white",
  Pending: "bg-amber-500 text-white",
};

const TH = ({
  children,
  align = "left",
  className = "",
}: {
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
}) => (
  <th
    className={`px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 ${
      align === "right" ? "text-right" : "text-left"
    } ${className}`}
  >
    {children}
  </th>
);

/* =========================================================
   BUSINESS NEWS PAGE
   ========================================================= */

export function BusinessNewsPage() {
  const articles = allCards;

  const featured = articles.slice(0, 2);
  const secondary = articles.slice(2, 8);
  const remaining = articles.slice(8);

  return (
    <main className="min-h-screen bg-white text-[#071a2d]">
      {/* =====================================================
          TOP AD
         ===================================================== */}

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-5 sm:px-6 lg:px-8">
        <AdSenseSlot slot="5373718974" format="auto" minHeight={90} />
      </section>

      {/* =====================================================
          PAGE HEADER
         ===================================================== */}

      <section className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-10 sm:px-6 md:pb-10 lg:px-8">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="flex h-10 w-10 items-center justify-center bg-[#071a2d] text-white">
            <Briefcase size={20} />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e31b23]">
              The Pride Times
            </p>

            <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl">
              Business News
            </h1>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
            Corporate strategy, earnings, deals, the startup economy and the
            decisions shaping companies and markets around the world.
          </p>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
            <TrendingUp size={13} />
            Business Desk · {articles.length} stories
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
            {/* TWO MAIN BUSINESS HEADLINES */}
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
              {featured.map((article) => (
                <ArticleCard key={article.id} article={article} featured />
              ))}
            </div>

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
            {secondary.length > 0 && (
              <div className="mt-8">
                <ListHeading
                  title="More Business Stories"
                  meta="Business Desk"
                />

                <div className="space-y-6">
                  {secondary.map((article) => (
                    <ArticleCard key={article.id} article={article} />
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
            {remaining.length > 0 && (
              <div className="mt-8">
                <ListHeading title="Latest Business Developments" />

                <div className="grid gap-6 md:grid-cols-2">
                  {remaining.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}

            {/* EARNINGS + DEALS */}
            <div className="mt-12">
              <ListHeading
                title="The Numbers Behind the Headlines"
                meta="Earnings & Deals"
              />

              <div className="space-y-5">
                <details className="border border-gray-200">
                  <summary className="cursor-pointer select-none px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-800">
                    Corporate Earnings
                  </summary>

                  <div className="overflow-x-auto border-t border-gray-200">
                    <table className="w-full min-w-[560px] border-collapse text-[12px]">
                      <thead>
                        <tr className="border-b border-gray-300 bg-gray-50">
                          <TH>Company</TH>
                          <TH align="right">EPS</TH>
                          <TH align="right">vs Est.</TH>
                          <TH align="right">Revenue</TH>
                          <TH align="right">Result</TH>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {earningsNews.map((e) => (
                          <tr key={e.ticker} className="hover:bg-gray-50">
                            <td className="px-3 py-2">
                              <span className="font-semibold text-gray-900">
                                {e.company}
                              </span>
                              <span className="ml-1.5 text-[11px] text-gray-400">
                                ({e.ticker})
                              </span>
                            </td>
                            <td className="px-3 py-2 text-right tabular-nums text-gray-700">
                              {e.eps}
                            </td>
                            <td
                              className={`px-3 py-2 text-right font-bold tabular-nums ${
                                e.status === "BEAT"
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {e.beat}
                            </td>
                            <td className="px-3 py-2 text-right tabular-nums text-gray-600">
                              {e.revenue}
                            </td>
                            <td className="px-3 py-2 text-right">
                              <span
                                className={`inline-flex rounded-[2px] px-2 py-0.5 text-[10px] font-bold tracking-wide ${earningsBadge[e.status]}`}
                              >
                                {e.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>

                <details className="border border-gray-200">
                  <summary className="cursor-pointer select-none px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-800">
                    Deals &amp; Capital
                  </summary>

                  <div className="overflow-x-auto border-t border-gray-200">
                    <table className="w-full min-w-[600px] border-collapse text-[12px]">
                      <thead>
                        <tr className="border-b border-gray-300 bg-gray-50">
                          <TH>Acquirer</TH>
                          <TH>Target</TH>
                          <TH align="right">Value</TH>
                          <TH className="hidden md:table-cell">Sector</TH>
                          <TH align="right">Status</TH>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {maDeals.map((d) => (
                          <tr key={d.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-semibold text-gray-900">
                              {d.acquirer}
                            </td>
                            <td className="px-3 py-2 text-gray-600">
                              {d.target}
                            </td>
                            <td className="px-3 py-2 text-right font-bold tabular-nums text-gray-900">
                              {d.value}
                            </td>
                            <td className="hidden px-3 py-2 text-[11px] text-gray-500 md:table-cell">
                              {d.sector}
                            </td>
                            <td className="px-3 py-2 text-right">
                              <span
                                className={`inline-flex rounded-[2px] px-2 py-0.5 text-[10px] font-bold tracking-wide ${dealBadge[d.status]}`}
                              >
                                {d.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDEBAR
             ================================================= */}

          <aside className="space-y-8">
            {/* Sidebar Ad */}
            <div className="border-y border-gray-200 py-4">
              <AdSenseSlot slot="5373718974" format="auto" minHeight={250} />
            </div>

            {/* Numbers at a Glance */}
            <div className="border-t-4 border-[#071a2d] bg-gray-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold">
                  Numbers at a Glance
                </h2>

                <TrendingUp size={17} />
              </div>

              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#e31b23]">
                {octEditionMeta.edition} · {octEditionMeta.date}
              </p>

              <ul className="divide-y divide-gray-200">
                {octEditionGlance.map((item) => (
                  <li key={item.indicator} className="py-3">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.1em] text-gray-500">
                      {item.indicator}
                    </span>
                    <span className="block text-[14px] font-extrabold text-gray-900">
                      {item.figure}
                    </span>
                    <span className="block text-[9px] text-gray-400">
                      {item.source}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-[#071a2d] p-6 text-white">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#e31b23]">
                The Pride Times
              </p>

              <h2 className="font-serif text-2xl font-bold">
                Business Intelligence
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Stay informed about corporate strategy, earnings, deals and
                the developments shaping the global economy.
              </p>

              <Link
                to="/markets"
                className="mt-5 flex w-full items-center justify-center gap-2 bg-[#e31b23] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-700"
              >
                Explore Market Coverage
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Bottom ad */}
            <AdSenseSlot slot="6810700989" format="auto" minHeight={250} />
          </aside>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default BusinessNewsPage;
