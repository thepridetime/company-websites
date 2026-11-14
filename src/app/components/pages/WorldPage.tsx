import { useEffect, useState } from "react";
import { fetchSectionArticles, EditorialArticle } from "../../../lib/editorialApi";
import { Link } from "react-router";
import {
  ArrowRight,
  Clock,
  Globe2,
  TrendingUp,
  Zap,
  Cpu,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  specialArticles,
  specialArticlePath,
} from "../../data/specialArticleData";
import WorldFallbackImg from "../../../imports/Insightimage.png";

// In Focus background imagery
import img_geopolitics from "../../../imports/pt-world-leaders.png";
import img_trade from "../../../imports/global-trade-port.jpg";
import img_energy from "../../../imports/clean-energy-refinery.jpg";
import img_tech from "../../../imports/semiconductor-ai-chip.jpg";

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
const topStories = worldItems.slice(1, 5); // 4 Top Stories in 2x2 grid
const moreNews = worldItems.slice(5, 11); // 6 stories in More World News list

/* In Focus visual category definitions */
const IN_FOCUS_CATEGORIES = [
  {
    name: "Geopolitics",
    icon: Globe2,
    href: "/international-news",
    image: img_geopolitics,
    description: "Multilateral relations & diplomacy",
  },
  {
    name: "Trade & Economy",
    icon: TrendingUp,
    href: "/markets",
    image: img_trade,
    description: "Supply chains, currency & tariffs",
  },
  {
    name: "Energy",
    icon: Zap,
    href: "/energy",
    image: img_energy,
    description: "Hydrocarbons, grid & transition",
  },
  {
    name: "Technology",
    icon: Cpu,
    href: "/technology",
    image: img_tech,
    description: "Frontier chips, AI & infrastructure",
  },
];

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
  minHeight = 250,
}: AdSlotProps) {
  useEffect(() => {
    try {
      const w = window as Window & {
        adsbygoogle?: unknown[];
      };

      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // AdSense fallback
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
        Advertisement
      </div>

      <div
        className="w-full overflow-hidden rounded-xs border border-dashed border-gray-200 bg-gray-50/50 flex items-center justify-center"
        style={{ minHeight }}
      >
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
      className="mt-6 pt-4 border-t border-gray-200"
    />
  );
}

/* =========================================================
   SECTION HEADER (same style as homepage)
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
    <div className="flex items-baseline justify-between border-t-[3px] border-black pt-2 mb-4">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
        {title}
      </h2>

      {link ? (
        <a
          href={link}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
        >
          {linkText}
          <ArrowRight size={10} />
        </a>
      ) : (
        <span className="hidden sm:block text-[10px] uppercase tracking-[0.14em] text-gray-400 font-semibold">
          The Pride Times
        </span>
      )}
    </div>
  );
}

/* =========================================================
   WORLD PAGE
========================================================= */

export function WorldPage() {
  const [liveItems, setLiveItems] = useState<WorldItem[]>(worldItems);

  useEffect(() => {
    fetchSectionArticles("world").then((dbArticles) => {
      if (dbArticles && dbArticles.length > 0) {
        // If Supabase returned database records (not fallback IDs), map them
        const hasDbRecords = dbArticles.some((a) => !a.id.startsWith("local-"));
        if (hasDbRecords) {
          const mapped: WorldItem[] = dbArticles.map((a) => ({
            id: a.id,
            href: `/world/${a.slug}`,
            title: a.title,
            lede: a.subheadline,
            kicker: a.kicker,
            image: a.hero_image_url || WorldFallbackImg,
            meta: `${new Date(a.published_at).toLocaleDateString("en-US", { dateStyle: "medium" })} · ${a.read_time}`,
            keyFacts: a.key_figures || [],
          }));
          setLiveItems(mapped);
        }
      }
    });
  }, []);

  const activeLeadStory = liveItems[0] || leadStory;
  const activeTopStories = liveItems.slice(1, 5).length > 0 ? liveItems.slice(1, 5) : topStories;
  const activeMoreNews = liveItems.slice(5, 11).length > 0 ? liveItems.slice(5, 11) : moreNews;
  const activeAllItems = liveItems.length > 0 ? liveItems : worldItems;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-4 md:pt-6 pb-16">

          {/* PAGE TITLE */}
          <header className="border-t-[3px] border-red-600 pt-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">
                  Global Affairs · Diplomatic Relations · Geopolitics
                </p>
                <h1 className="font-serif text-[30px] sm:text-[34px] md:text-[38px] lg:text-[42px] font-bold leading-tight text-gray-950">
                  {SECTION_LABEL}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-2xl">
                  Geopolitics, diplomacy, international security and multilateral institutions from The Pride Times.
                </p>
              </div>

              <span className="text-[10px] uppercase tracking-[0.16em] text-gray-400 font-semibold pb-1">
                Geopolitics • Diplomacy • Security
              </span>
            </div>
          </header>

          <PrideTimesAd variant="first" />

          {!activeLeadStory ? (
            <p className="py-12 text-center text-sm text-gray-400">
              No world stories available right now.
            </p>
          ) : (
            <section className="pb-10 mb-10 border-b border-gray-200">
              {/* TWO-COLUMN NEWSPAPER LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.28fr_0.72fr] gap-8 items-start">

                {/* =====================================================
                    LEFT COLUMN: Featured News, Top Stories, In Focus
                    ===================================================== */}
                <div className="flex flex-col">

                  {/* 1. FEATURED WORLD NEWS */}
                  <Link
                    to={activeLeadStory.href}
                    className="group relative block overflow-hidden rounded-xs border border-gray-200 min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] bg-black shadow-xs cursor-pointer"
                  >
                    {/* Background image positioned to capture skyline, reducing excessive sky */}
                    <ImageWithFallback
                      src={activeLeadStory.image}
                      alt={activeLeadStory.title}
                      className="absolute inset-0 w-full h-full object-cover object-[center_68%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Deep bottom gradient for optimal text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 via-45% to-transparent" />

                    {/* Red Category Badge at top-left */}
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] uppercase rounded-xs shadow-xs">
                      {SECTION_LABEL} | {activeLeadStory.kicker}
                    </span>

                    {/* Headline & Description with comfortable spacing */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold leading-[1.18] text-white tracking-tight group-hover:underline">
                        {activeLeadStory.title}
                      </h2>

                      <p className="text-xs sm:text-[13px] text-gray-200 leading-[1.65] mt-3 line-clamp-3 max-w-2xl">
                        {activeLeadStory.lede}
                      </p>

                      <div className="mt-5">
                        <span className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xs transition-colors shadow-xs">
                          Read Full Story
                          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* 2. TOP STORIES IN WORLD (NEW 2x2 GRID SECTION) */}
                  <div className="mt-9">
                    <SectionHeader
                      title="Top Stories in World"
                      link="#latest-world-feed"
                      linkText="View All"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeTopStories.map((item) => (
                        <Link
                          key={item.id}
                          to={item.href}
                          className="group grid grid-cols-[105px_minmax(0,1fr)] sm:grid-cols-[115px_minmax(0,1fr)] gap-3.5 p-3 rounded-xs border border-gray-200 bg-white hover:bg-gray-50/70 hover:border-gray-300 transition-all cursor-pointer shadow-xs"
                        >
                          <div className="aspect-[4/3] rounded-xs overflow-hidden bg-gray-100 shrink-0">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="min-w-0 flex flex-col justify-between">
                            <div>
                              <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-red-600 truncate mb-1">
                                {item.kicker}
                              </span>
                              <h3 className="font-serif text-[14px] sm:text-[15px] font-bold leading-[1.25] text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2">
                                {item.title}
                              </h3>
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium mt-2">
                              {item.meta.split("·")[0]}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* 3. IN FOCUS (NEW VISUAL CATEGORY CARDS SECTION) */}
                  <div className="mt-9">
                    <SectionHeader
                      title="In Focus"
                      linkText="Global Topics"
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      {IN_FOCUS_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Link
                            key={cat.name}
                            to={cat.href}
                            className="group relative block aspect-[4/3] sm:aspect-[1/1] overflow-hidden rounded-xs border border-gray-200 bg-gray-900 cursor-pointer shadow-xs"
                          >
                            <ImageWithFallback
                              src={cat.image}
                              alt={cat.name}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 group-hover:from-black/95 transition-colors" />

                            <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end">
                              <div className="flex items-center gap-1.5 text-white">
                                <Icon size={14} className="text-red-500 group-hover:text-red-400 transition-colors shrink-0" />
                                <span className="text-xs sm:text-[13px] font-serif font-bold text-white tracking-wide group-hover:text-red-200 transition-colors">
                                  {cat.name}
                                </span>
                              </div>
                              <span className="text-[9px] text-gray-300 font-medium mt-0.5 line-clamp-1 hidden sm:block">
                                {cat.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* =====================================================
                    RIGHT COLUMN: Key Figures, More World News, Advertisement
                    ===================================================== */}
                <aside className="min-w-0 flex flex-col gap-6">

                  {/* 4. KEY FIGURES SECTION */}
                  <div className="bg-white border border-gray-200 rounded-xs p-5 shadow-xs">
                    <div className="flex items-center justify-between pb-2.5 border-b-2 border-black mb-3">
                      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
                        Key Figures
                      </h2>

                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-xs border border-gray-200">
                        {activeAllItems.length} stories
                      </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {activeLeadStory.keyFacts.map((fact) => (
                        <div
                          key={fact.label}
                          className="py-2.5 flex items-center justify-between gap-3 text-xs"
                        >
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                            {fact.label}
                          </span>

                          <span className="text-xs font-semibold text-gray-900 text-right tabular-nums">
                            {fact.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. MORE WORLD NEWS SECTION */}
                  <div className="bg-white border border-gray-200 rounded-xs p-5 shadow-xs">
                    <div className="flex items-center justify-between pb-2.5 border-b-2 border-red-600 mb-3">
                      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-red-600">
                        More World News
                      </h2>

                      <span className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">
                        Newsroom
                      </span>
                    </div>

                    {moreNews.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {activeMoreNews.map((item) => (
                          <Link
                            key={item.id}
                            to={item.href}
                            className="group block p-3 -mx-3 rounded-xs hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            {/* Complete category label with publication date & arrow indicator */}
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-600 whitespace-nowrap">
                                {item.kicker}
                              </span>
                              <span className="text-gray-300">•</span>
                              <span className="text-[10px] text-gray-400 font-medium">
                                {item.meta.split("·")[0]}
                              </span>
                              <ChevronRight size={13} className="text-gray-300 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all ml-auto" />
                            </div>

                            <h3 className="font-serif text-[14px] sm:text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:text-red-600 transition-colors">
                              {item.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                              {item.lede}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="py-4 text-xs text-gray-400 text-center">
                        More world stories will appear here.
                      </p>
                    )}

                    {/* 6. ADVERTISEMENT SECTION */}
                    <SidebarAd />
                  </div>
                </aside>
              </div>
            </section>
          )}

          {/* =====================================================
              7. FULL LATEST WORLD FEED
              ===================================================== */}
          {activeAllItems.length > 0 && (
            <section id="latest-world-feed" className="mb-12 scroll-mt-6">
              <SectionHeader title={`Latest ${SECTION_LABEL} News`} />

              <div className="divide-y divide-gray-200">
                {activeAllItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="group grid grid-cols-[130px_1fr] sm:grid-cols-[260px_1fr] gap-4 sm:gap-6 py-6 p-2 -mx-2 rounded-xs hover:bg-gray-50/70 transition-colors cursor-pointer"
                  >
                    <div className="w-full h-[100px] sm:h-[175px] overflow-hidden rounded-xs bg-gray-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-x-2 mb-1.5">
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.14em]">
                          {item.kicker}
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-xl md:text-2xl font-bold leading-[1.25] text-gray-950 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>

                      <p className="hidden sm:block text-xs sm:text-[13px] text-gray-600 leading-[1.6] mt-2 line-clamp-2">
                        {item.lede}
                      </p>

                      <span className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-2 font-medium">
                        <Clock size={11} className="shrink-0" />
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

export default WorldPage;
