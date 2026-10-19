import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  specialArticles,
  specialArticlePath,
} from "../../data/specialArticleData";
import ManuFallbackImg from "../../../imports/Manu1.png";

/* Display label for this section (page title, cards and feed). */
const SECTION_LABEL = "Manufacturing";

/* =========================================================
   MANUFACTURING ITEMS
   Articles from src/app/data/specialArticleData.ts whose
   section is "Manufacturing".
========================================================= */

type ManuItem = {
  id: string;
  href: string;
  title: string;
  lede: string;
  kicker: string;
  author: string;
  image: string;
  meta: string;
  publishedAt: string;
  keyFacts: { label: string; value: string }[];
};

const manuItems: ManuItem[] = specialArticles
  .filter((article) => article.section === "Manufacturing")
  .map((article) => ({
    id: article.id,
    href: specialArticlePath(article.id),
    title: article.title,
    lede: article.dek,
    kicker: article.category,
    author: article.author,
    image: article.image ?? ManuFallbackImg,
    meta: `${article.publishedAt} · ${article.readTime}`,
    publishedAt: article.publishedAt,
    keyFacts: article.keyFacts,
  }));

const leadStory = manuItems[0];
const secondStory = manuItems[1];
const pickItems = manuItems.slice(0, 6);
const cardItems = manuItems.slice(2, 6);
const feedItems = manuItems.slice(1);

/* =========================================================
   GOOGLE ADSENSE SLOTS
========================================================= */

type AdSlotProps = {
  slot: string;
  format?: "auto" | "fluid";
  className?: string;
  minHeight?: number;
};

function AdSlot({ slot, format = "auto", className = "", minHeight = 90 }: AdSlotProps) {
  useEffect(() => {
    try {
      const w = window as Window & { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // Ad blockers, consent settings or missing inventory are expected.
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
          style={{ display: "block", width: "100%", minHeight }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={format === "auto" ? "true" : undefined}
        />
      </div>
    </div>
  );
}

/* =========================================================
   SHARED PIECES
========================================================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-2.5">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">{title}</h2>
      <span className="hidden text-[8px] uppercase tracking-[0.16em] text-gray-400 sm:block">
        The Pride Times
      </span>
    </div>
  );
}

function CategoryTag({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-[2px] bg-red-600 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-white">
      {children}
    </span>
  );
}

/* =========================================================
   MANUFACTURING PAGE
========================================================= */

export function ManufacturingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 pt-6 md:pt-8">

          {/* PAGE TITLE */}

          <header className="mb-8 flex flex-col gap-3 border-t-[3px] border-red-600 pt-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-serif text-[36px] font-bold leading-tight md:text-[46px]">
                {SECTION_LABEL}
              </h1>
              <p className="mt-1 max-w-2xl text-[12px] text-gray-500 md:text-[13px]">
                Reshoring, robotics, smart factories and industrial technology from The Pride Times.
              </p>
            </div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              Factories • Robotics • Production
            </p>
          </header>

          <PrideTimesAd variant="first" />

          {!leadStory && (
            <p className="py-16 text-center text-[12px] text-gray-400">
              No manufacturing stories yet.
            </p>
          )}

          {/* HERO ROW: LEAD + SECOND STORY + EDITOR'S PICKS */}

          {leadStory && (
            <section className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-6">

              {/* LEAD */}

              <Link
                to={leadStory.href}
                className="group relative block min-h-[380px] overflow-hidden rounded-sm bg-neutral-900 md:min-h-[460px]"
              >
                <ImageWithFallback
                  src={leadStory.image}
                  alt={leadStory.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-3">
                    <CategoryTag>{leadStory.kicker}</CategoryTag>
                  </div>
                  <h2 className="font-serif text-2xl font-bold leading-[1.12] text-white text-balance md:text-[30px]">
                    {leadStory.title}
                  </h2>
                  <p className="mt-2 text-[11px] text-gray-300">
                    By {leadStory.author} | {leadStory.publishedAt}
                  </p>
                </div>
              </Link>

              {/* SECOND STORY */}

              {secondStory && (
                <Link to={secondStory.href} className="group flex flex-col">
                  <div className="relative h-[200px] overflow-hidden rounded-sm bg-gray-100 md:h-[230px]">
                    <ImageWithFallback
                      src={secondStory.image}
                      alt={secondStory.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <CategoryTag>{secondStory.kicker}</CategoryTag>
                    <h3 className="mt-3 font-serif text-[20px] font-bold leading-[1.2] text-gray-900 transition-colors group-hover:text-red-600">
                      {secondStory.title}
                    </h3>
                    <p className="mt-2 text-[11px] text-gray-500">
                      By {secondStory.author} | {secondStory.publishedAt}
                    </p>
                  </div>
                </Link>
              )}

              {/* EDITOR'S PICKS */}

              <aside>
                <h2 className="mb-4 border-b border-gray-200 pb-2 font-serif text-xl font-bold">
                  Editor&apos;s Picks
                </h2>
                <ol className="space-y-4">
                  {pickItems.map((item) => (
                    <li key={item.id}>
                      <Link to={item.href} className="group block">
                        <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-red-600">
                          {item.kicker}
                        </span>
                        <span className="mt-1 block text-[13px] font-semibold leading-snug text-gray-900 transition-colors group-hover:text-red-600">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <AdSlot slot="5373718974" format="auto" minHeight={250} className="mt-6" />
              </aside>
            </section>
          )}

          {/* CARD ROW */}

          {cardItems.length > 0 && (
            <section className="mb-12">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {cardItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="group flex flex-col overflow-hidden rounded-sm border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg"
                  >
                    <div className="h-40 overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <CategoryTag>{item.kicker}</CategoryTag>
                      <h3 className="mt-3 font-serif text-[17px] font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-600">
                        {item.title}
                      </h3>
                      <p className="mt-auto pt-3 text-[10px] text-gray-500">
                        By {item.author} | {item.publishedAt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* LATEST FEED */}

          {feedItems.length > 0 && (
            <section className="mb-12">
              <SectionHeader title={`Latest ${SECTION_LABEL} News`} />

              <div className="divide-y divide-gray-200">
                {feedItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="group grid grid-cols-[130px_1fr] gap-4 py-6 sm:grid-cols-[280px_1fr] sm:gap-6"
                  >
                    <div className="h-[96px] w-full overflow-hidden rounded-md sm:h-[185px]">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-red-600">
                        {item.kicker}
                      </span>
                      <h3 className="mt-1 font-serif text-base font-bold leading-[1.2] text-gray-900 transition-colors group-hover:text-red-600 sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 hidden line-clamp-3 text-[13px] leading-[1.55] text-gray-500 sm:block">
                        {item.lede}
                      </p>
                      <span className="mt-1.5 flex items-center gap-1 text-[9px] text-gray-400">
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

export default ManufacturingPage;
