import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  octEditionArticles,
  octEditionArticlePath,
  type OctEditionArticle,
} from "../../data/octEditionData";

/* =========================================================
   SUPPLY CHAIN STORIES
   Stories from the October 2026 Global Industry Edition
   (src/app/data/octEditionData.ts) in the
   "Industry and Supply Chain" section.
========================================================= */

const supplyChainStories: OctEditionArticle[] = octEditionArticles.filter(
  (article) => article.section === "Industry and Supply Chain"
);

const leadStory = supplyChainStories[0];
const otherStories = supplyChainStories.slice(1);

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

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
      {children}
    </span>
  );
}

function TimeStamp({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[10px] text-gray-400">
      <Clock size={9} />
      {children}
    </span>
  );
}

/* =========================================================
   SUPPLY CHAIN PAGE
   Same layout and styling as the homepage:
   1. Newsroom front: headlines | lead story | key figures
   2. Latest feed with a sticky ad column
========================================================= */

export function SupplyChainPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* ---------- PAGE TITLE ---------- */}

          <header className="mb-6 border-t-[3px] border-black pt-3">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-serif text-[28px] font-bold leading-[1.1] text-gray-950 md:text-[38px]">
                  Supply Chain
                </h1>

                <p className="mt-2 text-[15px] leading-[1.55] text-gray-600">
                  Manufacturing bottlenecks, logistics, tariffs and industrial
                  sourcing from The Pride Times Global Industry Edition.
                </p>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
                Logistics • Sourcing • Industry
              </span>
            </div>
          </header>

          {!leadStory && (
            <p className="py-10 text-center text-[12px] text-gray-400">
              No supply chain stories in this edition yet.
            </p>
          )}

          {leadStory && (
            <>
              {/* =================================================
                  1. TOP SECTION — 3 columns, like the homepage
                     LEFT   : text-only headline list
                     CENTER : lead story
                     RIGHT  : Key Figures panel (dark)
              ================================================= */}

              <section className="mb-10 border-b border-gray-300 pb-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0">
                  {/* ---------- LEFT: More Supply Chain News ---------- */}

                  <aside className="order-2 min-w-0 lg:order-1 lg:col-span-3 lg:border-r lg:border-gray-200 lg:pr-6">
                    <div className="mb-1 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                        More Supply Chain News
                      </h2>

                      <span className="text-[10px] uppercase tracking-wide text-gray-400">
                        Newsroom
                      </span>
                    </div>

                    {otherStories.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {otherStories.map((item) => (
                          <li key={item.id}>
                            <Link
                              to={octEditionArticlePath(item)}
                              className="group block py-3.5"
                            >
                              <Kicker>{item.location}</Kicker>

                              <h3 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                                {item.title}
                              </h3>

                              <p className="mt-1.5 text-[12px] leading-[1.5] text-gray-500 line-clamp-2">
                                {item.lede}
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="py-3.5 text-[12px] text-gray-400">
                        More supply chain stories will appear here.
                      </p>
                    )}
                  </aside>

                  {/* ---------- CENTER: lead story ---------- */}

                  <div className="order-1 min-w-0 lg:order-2 lg:col-span-6 lg:px-6">
                    <Link
                      to={octEditionArticlePath(leadStory)}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-sm bg-black">
                        <ImageWithFallback
                          src={leadStory.image}
                          alt={leadStory.title}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="mt-4">
                        <Kicker>
                          {leadStory.industry} · {leadStory.location}
                        </Kicker>

                        <h2 className="mt-1.5 font-serif text-[28px] font-bold leading-[1.1] text-gray-950 group-hover:underline md:text-[38px]">
                          {leadStory.title}
                        </h2>

                        <p className="mt-3 text-[15px] leading-[1.55] text-gray-600">
                          {leadStory.lede}
                        </p>

                        <div className="mt-3">
                          <TimeStamp>
                            {leadStory.publishedAt} · {leadStory.readTime}
                          </TimeStamp>
                        </div>

                        <span className="mt-4 inline-flex items-center gap-1.5 border-b border-black/60 pb-1 text-[10px] font-bold uppercase tracking-wide text-gray-950">
                          Read Full Story
                          <ArrowRight size={10} />
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* ---------- RIGHT: key figures (dark panel) ---------- */}

                  <aside className="order-3 min-w-0 lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-6">
                    <div className="rounded-sm bg-black p-4 text-white">
                      <div className="flex items-center justify-between border-b border-white/20 pb-2">
                        <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
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
                  </aside>
                </div>
              </section>

              <PrideTimesAd variant="first" />

              {/* =================================================
                  2. LATEST SUPPLY CHAIN NEWS
                     feed + sticky ad column, like the homepage
              ================================================= */}

              <section aria-label="Latest supply chain news" className="mb-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.9fr_0.7fr]">
                  {/* ---------- Feed ---------- */}

                  <div className="min-w-0">
                    <SectionHeader title="Latest Supply Chain News" />

                    <div className="divide-y divide-gray-200">
                      {supplyChainStories.map((story) => (
                        <Link
                          key={story.id}
                          to={octEditionArticlePath(story)}
                          className="group grid grid-cols-[110px_1fr] gap-4 py-5 sm:grid-cols-[200px_1fr] sm:gap-5"
                        >
                          <div className="h-[80px] w-full overflow-hidden rounded-sm sm:h-[126px]">
                            <ImageWithFallback
                              src={story.image}
                              alt={story.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2">
                              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
                                {story.industry}
                              </span>

                              <span className="text-[10px] text-gray-300">
                                •
                              </span>

                              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                                <MapPin size={9} />
                                {story.location}
                              </span>
                            </div>

                            <h3 className="mt-1 font-serif text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline sm:text-[21px]">
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
                  </div>

                  {/* ---------- Sticky ad column ---------- */}

                  <div className="min-w-0">
                    <div className="lg:sticky lg:top-24">
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

export default SupplyChainPage;
