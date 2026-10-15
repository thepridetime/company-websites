import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  octEditionArticles,
  octEditionArticlePath,
} from "../../data/octEditionData";
import {
  specialArticles,
  specialArticlePath,
} from "../../data/specialArticleData";
import HealthFallbackImg from "../../../imports/HC1.png";

/* Display label for this section (page title, cards and feed). */
const SECTION_LABEL = "Healthcare and Pharma";

/* =========================================================
   HEALTHCARE ITEMS
   - Healthcare & Pharma stories from the October 2026 Global
     Industry Edition (src/app/data/octEditionData.ts)
   - Healthcare articles from src/app/data/specialArticleData.ts
     (section "Healthcare")
   The October edition story comes first (most recent).
========================================================= */

type HealthItem = {
  id: string;
  href: string;
  title: string;
  lede: string;
  location?: string;
  image: string;
  meta: string;
  keyFacts: { label: string; value: string }[];
};

const octHealthItems: HealthItem[] = octEditionArticles
  .filter((article) => article.section === "Healthcare and Pharma")
  .map((article) => ({
    id: article.id,
    href: octEditionArticlePath(article),
    title: article.title,
    lede: article.lede,
    location: article.location,
    image: article.image,
    meta: `${article.publishedAt} · ${article.readTime}`,
    keyFacts: article.keyFacts,
  }));

const specialHealthItems: HealthItem[] = specialArticles
  .filter((article) => article.section === "Healthcare")
  .map((article) => ({
    id: article.id,
    href: specialArticlePath(article.id),
    title: article.title,
    lede: article.dek,
    location: undefined,
    image: article.image ?? HealthFallbackImg,
    meta: `${article.publishedAt} · ${article.readTime}`,
    keyFacts: article.keyFacts,
  }));

const healthItems: HealthItem[] = [...octHealthItems, ...specialHealthItems];

const leadStory = healthItems[0];
const otherStories = healthItems.slice(1);

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
   HEALTHCARE AND PHARMA PAGE
========================================================= */

export function HealthcarePage() {
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
                  Drugs, medtech, healthcare services and pharmaceutical
                  business from The Pride Times.
                </p>
              </div>

              <span className="text-[8px] uppercase tracking-[0.18em] text-gray-400">
                Pharma • Medtech • Care
              </span>
            </div>
          </header>

          <PrideTimesAd variant="first" />

          {!leadStory && (
            <p className="py-10 text-center text-[11px] text-gray-400">
              No healthcare and pharma stories yet.
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
                    {SECTION_LABEL}
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
                      Read Full Story
                      <ArrowRight size={12} />
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
                        {healthItems.length} stories
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
                        More Healthcare News
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
                                {item.location ?? "Healthcare"}
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
                        More healthcare stories will appear here.
                      </p>
                    )}
                  </div>

                  <SidebarAd />
                </aside>
              </div>
            </section>
          )}

          {/* LATEST HEALTHCARE FEED */}

          {healthItems.length > 0 && (
            <section className="mb-12">
              <SectionHeader title={`Latest ${SECTION_LABEL} News`} />

              <div className="divide-y divide-gray-200">
                {healthItems.map((item) => (
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
                          {SECTION_LABEL}
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

export default HealthcarePage;
