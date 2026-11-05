import { useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { Clock, MapPin } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  specialArticles,
  specialArticlePath,
} from "../../data/specialArticleData";
import ManuFallbackImg from "../../../imports/Manu1.png";
import img_manu_plant from "../../../imports/Manu1.png";
import img_manu_worker from "../../../imports/Manu2.png";
import img_manu_robot_arm from "../../../imports/Manu3.png";
import img_warehouse_robotics from "../../../imports/warehouse-robotics.png";
import img_supply_chain_map from "../../../imports/supply-chain-map.png";
import img_lantronix_robot from "../../../imports/tech16-lantronix-robot.png";
import img_smart_city from "../../../imports/Smartc1.png";
import img_smart_cloud from "../../../imports/Smartc2.png";
import img_smart_globe from "../../../imports/Smartc3.png";
import img_smart_skyline from "../../../imports/Smartc4.png";
import img_digital_code from "../../../imports/pt-digital-economy.png";
import img_cyber_ops from "../../../imports/cyber-ops.png";
import img_data_centre from "../../../imports/data-centre.png";
import img_energy_costs from "../../../imports/Energy1.png";
import img_ai_future from "../../../imports/tech16-ai-future.png";

/* Display label for this section (page title, cards and feed). */
const SECTION_LABEL = "Manufacturing";
const PAGE_SIZE = 8;

/* Each manufacturing article gets its own image, keyed by article ID.
   Articles without a mapping fall back to their own image, then Manu1.png. */
const imageById: Record<string, string> = {
  "manufacturing-reshoring-2026": img_manu_plant,
  "manufacturing-demand-output-prices": img_smart_skyline,
  "manufacturing-hyundai-80-percent-us-suppliers": img_manu_worker,
  "manufacturing-mind-robotics-500m": img_manu_robot_arm,
  "manufacturing-uber-rivian-50000-robotaxis": img_smart_city,
  "manufacturing-dhl-10-warehousing-sites": img_warehouse_robotics,
  "manufacturing-advanced-chip-fault-tracing": img_digital_code,
  "manufacturing-ai-robotics-digital-twins": img_smart_cloud,
  "manufacturing-imts-2026-ai-robotics": img_lantronix_robot,
  "manufacturing-domestic-supply-chain-partnerships": img_smart_globe,
  "manufacturing-supply-chain-fragmentation": img_supply_chain_map,
  "manufacturing-energy-costs": img_energy_costs,
  "manufacturing-southeast-asia-ai-cybersecurity": img_cyber_ops,
  "manufacturing-ai-hardware-production": img_data_centre,
  "manufacturing-smart-factory-strategy": img_ai_future,
};

/* =========================================================
   MANUFACTURING ITEMS
   Stories from src/app/data/specialArticleData.ts
   (section "Manufacturing").
   ========================================================= */

type ManuItem = {
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

const manuItems: ManuItem[] = specialArticles
  .filter((article) => article.section === "Manufacturing")
  .map((article) => ({
    id: article.id,
    href: specialArticlePath(article.id),
    title: article.title,
    lede: article.dek,
    kicker: article.category,
    location: undefined,
    image: imageById[article.id] ?? article.image ?? ManuFallbackImg,
    meta: `${article.publishedAt} · ${article.readTime}`,
    keyFacts: article.keyFacts,
  }));

/* Homepage-style layout slots */
const leadStory: ManuItem | undefined = manuItems[0];
const majorStories = manuItems.slice(1, 3);
const editorsPick: ManuItem | undefined = manuItems[3];
const sideHeadlines = manuItems.slice(4, 8);

const categoryTabs = [
  "All",
  ...Array.from(new Set(manuItems.map((item) => item.kicker))),
];

/* =========================================================
   SMALL UI PIECES (same as homepage)
   - Headlines: serif. Hover = underline (not colour change).
   - Red is ONLY for category labels and "view" links.
   - Black top rule on every section header.
   ========================================================= */

function SectionHeader({
  title,
  rightLabel = "The Pride Times",
}: {
  title: string;
  rightLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
        {title}
      </h2>
      <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:block">
        {rightLabel}
      </span>
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
   KEY FIGURES (dark panel, same style as homepage Markets)
   Uses the lead story's key facts.
   ========================================================= */

function KeyFiguresPanel({
  title,
  facts,
}: {
  title: string;
  facts: { label: string; value: string }[];
}) {
  if (facts.length === 0) {
    return null;
  }

  return (
    <div className="rounded-sm bg-black p-4 text-white">
      <div className="flex items-center justify-between border-b border-white/20 pb-2">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
          {title}
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
          {facts.length} facts
        </span>
      </div>

      <div className="divide-y divide-white/10">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-start justify-between gap-3 py-2.5"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              {fact.label}
            </span>
            <span className="text-right text-[12px] tabular-nums text-gray-100">
              {fact.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR: NUMBERS
   ========================================================= */

function ManuNumbers() {
  const stats = [
    { label: "Total stories", value: String(manuItems.length) },
    { label: "Categories", value: String(categoryTabs.length - 1) },
    {
      label: "Key facts (lead)",
      value: String(leadStory?.keyFacts.length ?? 0),
    },
    {
      label: "Unique images",
      value: String(new Set(manuItems.map((item) => item.image)).size),
    },
  ];

  return (
    <div>
      <SectionHeader title="Numbers at a Glance" rightLabel="Desk" />
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
   MANUFACTURING PAGE
   ========================================================= */

export function ManufacturingPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = useMemo(
    () =>
      activeTab === "All"
        ? manuItems
        : manuItems.filter((item) => item.kicker === activeTab),
    [activeTab]
  );

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  const openCategoryFeed = (tab: string) => {
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
                  Industry · The Future of Production
                </span>
                <h1 className="mt-1.5 font-serif text-[28px] font-bold leading-[1.1] text-gray-950 md:text-[38px]">
                  {SECTION_LABEL}
                </h1>
                <p className="mt-2 text-[12px] leading-[1.5] text-gray-500 md:text-[13px]">
                  Reshoring, robotics, smart factories and industrial technology
                  from The Pride Times.
                </p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                Factories • Robotics • Production
              </span>
            </div>
          </header>

          <PrideTimesAd variant="first" />

          {!leadStory && (
            <p className="py-10 text-center text-[12px] text-gray-400">
              No manufacturing stories yet.
            </p>
          )}

          {leadStory && (
            <>
              {/* =================================================
                  1. TOP SECTION — 3 columns, like the homepage
                     LEFT   : text-only Top Stories list
                     CENTER : lead story + 2 secondary stories
                     RIGHT  : Key Figures panel + Editor's Pick
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
                          <Link to={story.href} className="group block py-3.5">
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
                        <Kicker>{leadStory.kicker}</Kicker>

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

                  {/* RIGHT: Key figures + Editor's Pick */}
                  <aside className="order-3 min-w-0 lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-6">
                    <KeyFiguresPanel
                      title="Key Figures"
                      facts={leadStory.keyFacts}
                    />

                    {editorsPick && (
                      <div className="mt-6">
                        <div className="mb-3 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                          <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                            Editor's Pick
                          </h2>
                        </div>

                        <Link to={editorsPick.href} className="group block">
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
                  2. LATEST MANUFACTURING NEWS
                     LEFT  : tabs + filterable feed with "Show more"
                     RIGHT : sticky numbers + browse by category
              ================================================= */}
              <section aria-label="Latest manufacturing news" className="mb-12">
                <SectionHeader title={`Latest ${SECTION_LABEL} News`} />

                <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.9fr_0.7fr]">
                  {/* Feed */}
                  <div ref={feedRef} className="scroll-mt-24 min-w-0">
                    <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                      {categoryTabs.map((tab) => (
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
                      <ManuNumbers />

                      <div className="mt-8">
                        <SectionHeader
                          title="Browse by Category"
                          rightLabel="Sections"
                        />

                        <div className="divide-y divide-gray-200">
                          {categoryTabs
                            .filter((tab) => tab !== "All")
                            .map((tab) => {
                              const count = manuItems.filter(
                                (item) => item.kicker === tab
                              ).length;

                              return (
                                <button
                                  key={tab}
                                  type="button"
                                  onClick={() => openCategoryFeed(tab)}
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
            </>
          )}
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

export default ManufacturingPage;
