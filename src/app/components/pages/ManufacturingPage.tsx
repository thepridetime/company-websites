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

const SECTION_LABEL = "Manufacturing";

type ManuItem = {
  id: string;
  href: string;
  title: string;
  lede: string;
  kicker: string;
  image: string;
  meta: string;
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
    image: article.image ?? ManuFallbackImg,
    meta: `${article.publishedAt} · ${article.readTime}`,
    keyFacts: article.keyFacts,
  }));

const leadStory = manuItems[0];
const otherStories = manuItems.slice(1);

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
      const w = window as Window & { adsbygoogle?: unknown[] };
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
          style={{ display: "block", width: "100%", minHeight }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={format === "auto" ? "true" : undefined}
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
      className="mt-5"
    />
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 flex items-center justify-between border-b-2 border-black pb-2">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.13em]">
        {title}
      </h2>
      <span className="hidden text-[8px] uppercase tracking-[0.14em] text-gray-400 sm:block">
        The Pride Times
      </span>
    </div>
  );
}

function StoryMeta({ item }: { item: ManuItem }) {
  return (
    <span className="mt-1.5 flex flex-wrap items-center gap-1 text-[8px] leading-4 text-gray-500">
      <Clock size={9} />
      <span>{item.meta}</span>
      <span className="text-gray-300">|</span>
      <span className="font-semibold uppercase tracking-wide text-red-700">
        {item.kicker}
      </span>
    </span>
  );
}

export function ManufacturingPage() {
  const compactStories = otherStories.slice(0, 4);
  const rightStories = otherStories.slice(4, 10);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      {/* Header and footer are intentionally owned by the existing app layout. */}
      <div className="mx-auto w-full max-w-[1480px] px-4 pb-12 pt-3 sm:px-6 lg:px-8">
        <main>
          <header className="mb-4 border-t-[3px] border-red-600 pt-3">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.2em] text-red-700">
                  Industry · Technology · The Future of Production
                </p>
                <h1 className="font-serif text-[30px] font-bold leading-none tracking-tight sm:text-[36px]">
                  {SECTION_LABEL}
                </h1>
                <p className="mt-2 max-w-2xl text-[11px] leading-relaxed text-gray-500 sm:text-xs">
                  Reshoring, robotics, smart factories and industrial technology from The Pride Times.
                </p>
              </div>
              <span className="hidden pb-1 text-[8px] uppercase tracking-[0.16em] text-gray-400 md:block">
                Factories • Robotics • Production
              </span>
            </div>
          </header>

          <PrideTimesAd variant="first" />

          {!leadStory ? (
            <p className="py-12 text-center text-xs text-gray-400">
              No manufacturing stories yet.
            </p>
          ) : (
            <>
              {/* Magazine-style three-column editorial grid */}
              <section className="mt-4 grid grid-cols-1 gap-5 border-b border-gray-300 pb-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(190px,0.72fr)_minmax(260px,0.95fr)] lg:gap-5">
                {/* Lead story and visual story grid */}
                <div className="min-w-0">
                  <Link
                    to={leadStory.href}
                    className="group relative block aspect-[1.72/1] min-h-[245px] overflow-hidden rounded-[3px] bg-gray-100 sm:min-h-[300px] lg:min-h-0"
                  >
                    <ImageWithFallback
                      src={leadStory.image}
                      alt={leadStory.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-[2px] bg-red-700 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
                      {leadStory.kicker}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <h2 className="max-w-3xl font-serif text-[22px] font-bold leading-[1.08] text-white sm:text-[28px]">
                        {leadStory.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 max-w-2xl text-[10px] leading-relaxed text-gray-200 sm:text-[11px]">
                        {leadStory.lede}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 border-b border-white/60 pb-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
                        Read full story <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>

                  <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-2">
                    {compactStories.map((item) => (
                      <Link
                        key={item.id}
                        to={item.href}
                        className="group min-w-0 border-b border-gray-200 pb-3"
                      >
                        <div className="mb-2 aspect-[1.65/1] overflow-hidden rounded-[3px] bg-gray-100">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <span className="mb-1 inline-block bg-red-700 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-white">
                          {item.kicker}
                        </span>
                        <h3 className="font-serif text-[12px] font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-700 sm:text-[13px]">
                          {item.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-[9px] leading-[1.45] text-gray-500">
                          {item.lede}
                        </p>
                        <StoryMeta item={item} />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Editorial picks: uses existing story content only */}
                <aside className="min-w-0 border-t border-gray-200 pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                  <SectionHeader title="Editor's Picks" />
                  <div className="divide-y divide-gray-200">
                    {[leadStory, ...otherStories].slice(0, 7).map((item, index) => (
                      <Link
                        key={`${item.id}-pick`}
                        to={item.href}
                        className="group block py-3 first:pt-1"
                      >
                        <span className="mb-1 block text-[7px] font-bold uppercase tracking-[0.13em] text-red-700">
                          {index === 0 ? "Top Story" : item.kicker}
                        </span>
                        <h3 className="font-serif text-[11px] font-bold leading-[1.3] text-gray-900 transition-colors group-hover:text-red-700 sm:text-[12px]">
                          {item.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-[9px] leading-[1.45] text-gray-500">
                          {item.lede}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <SidebarAd />
                </aside>

                {/* Compact section rail inspired by the supplied reference */}
                <aside className="min-w-0 border-t border-gray-200 pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                  <div className="mb-2 border-b border-gray-300 pb-2">
                    <h2 className="font-serif text-[19px] font-bold leading-tight">
                      Manufacturing
                    </h2>
                    <p className="mt-1 text-[8px] leading-relaxed text-gray-500">
                      Reshoring, robotics, smart factories and industrial technology from The Pride Times.
                    </p>
                  </div>

                  <Link
                    to={leadStory.href}
                    className="group mb-3 grid grid-cols-[1.1fr_1fr] gap-2"
                  >
                    <div className="aspect-[1.3/1] overflow-hidden rounded-[3px] bg-gray-100">
                      <ImageWithFallback
                        src={leadStory.image}
                        alt={leadStory.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[7px] font-bold uppercase tracking-wide text-red-700">
                        {leadStory.kicker}
                      </span>
                      <h3 className="mt-1 font-serif text-[10px] font-bold leading-[1.3] group-hover:text-red-700">
                        {leadStory.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[8px] leading-[1.4] text-gray-500">
                        {leadStory.lede}
                      </p>
                    </div>
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    {rightStories.slice(0, 4).map((item) => (
                      <Link key={`${item.id}-rail`} to={item.href} className="group min-w-0">
                        <div className="mb-1.5 aspect-[1.45/1] overflow-hidden rounded-[3px] bg-gray-100">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h3 className="font-serif text-[9px] font-bold leading-[1.3] group-hover:text-red-700">
                          {item.title}
                        </h3>
                        <span className="mt-1 block text-[7px] text-gray-400">
                          {item.meta}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {leadStory.keyFacts.length > 0 && (
                    <div className="mt-4 border-t border-gray-200 pt-3">
                      <h3 className="mb-2 text-[8px] font-bold uppercase tracking-[0.14em] text-gray-700">
                        Key Figures
                      </h3>
                      <div className="divide-y divide-gray-100">
                        {leadStory.keyFacts.slice(0, 4).map((fact) => (
                          <div key={fact.label} className="flex items-start justify-between gap-2 py-1.5">
                            <span className="text-[8px] font-semibold text-gray-700">{fact.label}</span>
                            <span className="text-right text-[8px] tabular-nums text-gray-500">{fact.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </aside>
              </section>

              {/* Full story feed retains the existing article text and images */}
              {manuItems.length > 0 && (
                <section className="mb-8 mt-7">
                  <SectionHeader title={`Latest ${SECTION_LABEL} News`} />
                  <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2 xl:grid-cols-3">
                    {manuItems.map((item) => (
                      <Link
                        key={`${item.id}-latest`}
                        to={item.href}
                        className="group grid grid-cols-[112px_minmax(0,1fr)] gap-3 border-b border-gray-200 py-4 sm:grid-cols-1"
                      >
                        <div className="aspect-[1.55/1] overflow-hidden rounded-[3px] bg-gray-100 sm:aspect-[1.8/1]">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-red-700">
                            {item.kicker}
                          </span>
                          <h3 className="mt-1 font-serif text-[14px] font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-700 sm:text-[16px]">
                            {item.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-[10px] leading-[1.5] text-gray-500 sm:text-[11px]">
                            {item.lede}
                          </p>
                          <StoryMeta item={item} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          <PrideTimesAd variant="second" />
        </main>
      </div>
    </div>
  );
}

export default ManufacturingPage;
