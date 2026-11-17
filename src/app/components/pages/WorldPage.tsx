import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  specialArticles,
  specialArticlePath,
} from "../../data/specialArticleData";
import WorldFallbackImg from "../../../imports/Insightimage.png";

/* Display label for this section (page title, cards and feed). */
const SECTION_LABEL = "World";

/* =========================================================
   WORLD ITEMS
   Articles from src/app/data/specialArticleData.ts whose
   section is "World and Geopolitics".
========================================================= */

type WorldItem = {
  id: string;
  href: string;
  title: string;
  lede: string;
  kicker: string;
  image: string;
  meta: string;
  keyFacts: { label: string; value: string }[];
};

const worldItems: WorldItem[] = specialArticles
  .filter((article) => article.section === "World and Geopolitics")
  .map((article) => ({
    id: article.id,
    href: specialArticlePath(article.id),
    title: article.title,
    lede: article.dek,
    kicker: article.category,
    image: article.image ?? WorldFallbackImg,
    meta: `${article.publishedAt} · ${article.readTime}`,
    keyFacts: article.keyFacts,
  }));

const leadStory = worldItems[0];
const otherStories = worldItems.slice(1);

// NEW (added, nothing removed above):
const centreStory = worldItems[1];
const sideStories = worldItems.slice(2, 8);

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

// OLD (commented):
// function SectionHeader({ title }: { title: string }) {
//   return (
//     <div className="flex items-center justify-between border-b-2 border-black pb-2.5 mb-5">
//       <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
//         {title}
//       </h2>
//
//       <span className="hidden sm:block text-[8px] uppercase tracking-[0.16em] text-gray-400">
//         The Pride Times
//       </span>
//     </div>
//   );
// }

// NEW:
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
        {title}
      </h2>
    </div>
  );
}

// NEW (added): small pieces, Bloomberg style
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
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
   WORLD PAGE
========================================================= */

export function WorldPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
       {/* <main className="pt-4 md:pt-6 pb-16"> 1 ST CHNG */}
       <div className="w-full px-4 md:px-6 xl:px-8">
  <main className="pb-16 pt-4 md:pt-6">

          {/* PAGE TITLE */}

          {/* OLD (commented):
          <header className="border-t-[3px] border-red-600 pt-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
              <div>
                <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold leading-tight">
                  {SECTION_LABEL}
                </h1>

                <p className="mt-1 text-[11px] md:text-[13px] text-gray-500">
                  Geopolitics, diplomacy, security and global institutions from
                  The Pride Times.
                </p>
              </div>

              <span className="text-[8px] uppercase tracking-[0.18em] text-gray-400">
                Geopolitics • Diplomacy • Security
              </span>
            </div>
          </header>
          */}

          {/* NEW: */}
          <header className="mb-6 border-t-[3px] border-black pt-3">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-[28px] font-bold leading-tight tracking-tight text-gray-950 sm:text-[32px] md:text-[38px]">
                  {SECTION_LABEL}
                </h1>

                <p className="mt-1 text-[13px] text-gray-500">
                  Geopolitics, diplomacy, security and global institutions from
                  The Pride Times.
                </p>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Geopolitics • Diplomacy • Security
              </span>
            </div>
          </header>

          <PrideTimesAd variant="first" />

          {!leadStory && (
            <p className="py-10 text-center text-[11px] text-gray-400">
              No world stories yet.
            </p>
          )}

          {/* OLD (commented): dark lead card + right aside (Key Figures + More World News)
          {leadStory && (
            <section className="pb-8 mb-8 border-b border-gray-300">
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 lg:gap-6">

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
                    {SECTION_LABEL} | {leadStory.kicker}
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

                <aside className="min-w-0">
                  <div className="pb-5 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-serif text-lg font-bold">
                        Key Figures
                      </h2>

                      <span className="border border-gray-300 rounded-full px-3 py-1 text-[9px] font-medium">
                        {worldItems.length} stories
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
                        More World News
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
                                {item.kicker}
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
                        More world stories will appear here.
                      </p>
                    )}
                  </div>

                  <SidebarAd />
                </aside>
              </div>
            </section>
          )}
          */}

          {/* NEW: 3-column top band, Bloomberg style */}
          {leadStory && (
            <section className="grid grid-cols-1 items-stretch gap-0 border border-gray-300 md:grid-cols-2 lg:grid-cols-12">
              {/* LEFT: lead story */}
              <div className="flex flex-col border-b border-gray-300 p-4 lg:col-span-4 lg:border-b-0 lg:border-r">
                <Link to={leadStory.href} className="group block">
                  <div className="overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={leadStory.image}
                      alt={leadStory.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-3">
                    <Kicker>
                      {SECTION_LABEL} | {leadStory.kicker}
                    </Kicker>
                  </div>

                  <h2 className="mt-1.5 line-clamp-3 text-[22px] font-bold leading-[1.1] tracking-tight text-gray-950 group-hover:underline md:text-[24px]">
                    {leadStory.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-[13px] leading-snug text-gray-700">
                    {leadStory.lede}
                  </p>
                </Link>
              </div>

              {/* CENTRE: second story */}
              <div className="flex flex-col border-b border-gray-300 p-4 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r">
                {centreStory && (
                  <Link to={centreStory.href} className="group block">
                    <div className="overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={centreStory.image}
                        alt={centreStory.title}
                        className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="mt-3">
                      <Kicker>{centreStory.kicker}</Kicker>
                    </div>

                    <h2 className="mt-1.5 line-clamp-3 text-[20px] font-bold leading-[1.15] tracking-tight text-gray-950 group-hover:underline md:text-[22px]">
                      {centreStory.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-[13px] leading-snug text-gray-700">
                      {centreStory.lede}
                    </p>
                  </Link>
                )}
              </div>

              {/* RIGHT: More World News + ad */}
              <aside className="flex flex-col p-4 md:col-span-2 lg:col-span-4">
                <h2 className="text-[15px] font-bold tracking-tight text-gray-950">
                  More World News
                </h2>

                {otherStories.length > 0 ? (
                  <ul className="mt-3 divide-y divide-gray-300">
                    {sideStories.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.href}
                          className="group flex items-start gap-3 py-3"
                        >
                          <div className="h-[64px] w-[96px] shrink-0 overflow-hidden bg-gray-100">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <Kicker>{item.kicker}</Kicker>
                            <p className="mt-1 line-clamp-2 text-[14px] font-bold leading-[1.25] tracking-tight text-gray-950 group-hover:underline">
                              {item.title}
                            </p>
                            <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-gray-700">
                              {item.lede}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-3 text-[12px] text-gray-400">
                    More world stories will appear here.
                  </p>
                )}

                <SidebarAd />
              </aside>
            </section>
          )}

          {/* NEW: Key Figures (same data as before, now below the band) */}
          {leadStory && leadStory.keyFacts.length > 0 && (
            <section className="border-x border-b border-gray-300 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-bold tracking-tight text-gray-950">
                  Key Figures
                </h2>

                <span className="border border-gray-300 px-3 py-1 text-[11px] font-semibold text-gray-700">
                  {worldItems.length} stories
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
                {leadStory.keyFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start justify-between gap-4 border-b border-gray-300 py-2.5"
                  >
                    <span className="text-[13px] font-bold text-gray-950">
                      {fact.label}
                    </span>

                    <span className="text-right text-[13px] tabular-nums text-gray-600">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LATEST WORLD FEED */}

          {worldItems.length > 0 && (
            /* OLD (commented): <section className="mb-12"> */
            /* NEW: */
            <section className="mb-16 mt-12">
              <SectionHeader title={`Latest ${SECTION_LABEL} News`} />

              {/* OLD (commented): <div className="divide-y divide-gray-200"> */}
              {/* NEW: */}
              <div className="divide-y divide-gray-300">
                {worldItems.map((item) => (
                  /* OLD (commented):
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
                  */
                  /* NEW: */
                  <Link
                    key={item.id}
                    to={item.href}
                    className="group grid grid-cols-[110px_1fr] items-start gap-4 py-5 sm:grid-cols-[200px_1fr] sm:gap-5"
                  >
                    <div className="h-[80px] w-full overflow-hidden bg-gray-100 sm:h-[126px]">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <Kicker>{item.kicker}</Kicker>

                      <h3 className="mt-1 line-clamp-2 text-[16px] font-bold leading-[1.2] tracking-tight text-gray-950 group-hover:underline sm:text-[19px]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 hidden text-[13px] leading-snug text-gray-700 line-clamp-3 sm:block">
                        {item.lede}
                      </p>

                      <div className="mt-1.5">
                        <TimeStamp>{item.meta}</TimeStamp>
                      </div>
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

export default WorldPage;