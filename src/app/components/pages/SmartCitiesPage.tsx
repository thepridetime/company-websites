import { useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { Clock, MapPin } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  specialArticles,
  specialArticlePath,
} from "../../data/specialArticleData";
import SmartFallbackImg from "../../../imports/Smartc1.png";

/* =========================================================
   STORY DATA (unchanged source)
   Every article in specialArticleData.ts whose section is
   "Smart Cities".
========================================================= */

const SECTION_LABEL = "Smart Cities";
const PAGE_SIZE = 8;

type CityItem = {
  id: string;
  href: string;
  title: string;
  lede: string;
  /* Topic label, shown as the red kicker. */
  topic: string;
  image: string;
  when: string;
  readTime: string;
  keyFacts: { label: string; value: string }[];
};

const cityItems: CityItem[] = specialArticles
  .filter((article) => article.section === SECTION_LABEL)
  .map((article) => ({
    id: article.id,
    href: specialArticlePath(article.id),
    title: article.title,
    lede: article.dek,
    topic: article.category,
    image: article.image ?? SmartFallbackImg,
    when: article.publishedAt,
    readTime: article.readTime,
    keyFacts: article.keyFacts,
  }));

/* =========================================================
   FRONT-PAGE PICKS (same structure as the homepage)
========================================================= */

const leadStory = cityItems[0];
const majorStories = [cityItems[1], cityItems[2]].filter(
  Boolean
) as CityItem[];
const editorsPick = cityItems[3] ?? cityItems[0];
const deepDiveStory = cityItems[4] ?? cityItems[0];

const featuredIds = new Set(
  [leadStory, ...majorStories, editorsPick]
    .filter(Boolean)
    .map((item) => item.id)
);

const sidebarStories = cityItems
  .filter((item) => !featuredIds.has(item.id))
  .slice(0, 4);

const topicNames = Array.from(new Set(cityItems.map((item) => item.topic)));
const feedTabs = ["All", ...topicNames];

const topicGroups = topicNames.map((name) => ({
  name,
  stories: cityItems.filter((item) => item.topic === name),
}));

/* =========================================================
   SMALL UI PIECES (same as homepage)
========================================================= */

function SectionHeader({
  title,
  link,
  linkText = "View All",
  rightLabel,
}: {
  title: string;
  link?: string;
  linkText?: string;
  rightLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
        {title}
      </h2>

      {link ? (
        <Link
          to={link}
          className="text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
        >
          {linkText}
        </Link>
      ) : (
        rightLabel && (
          <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:block">
            {rightLabel}
          </span>
        )
      )}
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-red-600">
      {children}
    </span>
  );
}

function TimeStamp({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-gray-400">
      <Clock size={9} />
      {children}
    </span>
  );
}

/* Related box used under the lead story (homepage style) */

function RelatedBox({ items }: { items: CityItem[] }) {
  return (
    <div className="mt-4 border border-gray-200">
      <div className="border-b border-gray-200 px-3 py-1.5 text-[11px] text-gray-500">
        Top Stories
      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={item.href}
              className="block px-3 py-2.5 text-[14px] font-bold leading-[1.3] text-gray-950 hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================================================
   KEY FIGURES (dark panel, same style as homepage Markets)
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
    <div className="rounded-md bg-black p-5 text-white">
      <div className="flex items-center justify-between border-b border-white/20 pb-2">
        <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em]">
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
            className="flex items-start justify-between gap-3 py-3"
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

function CityNumbers() {
  const stats = [
    { label: "Total stories", value: String(cityItems.length) },
    { label: "Topics", value: String(topicNames.length) },
    {
      label: "Key facts (lead)",
      value: String(leadStory.keyFacts.length),
    },
    {
      label: "Unique images",
      value: String(new Set(cityItems.map((item) => item.image)).size),
    },
  ];

  return (
    <div>
      <SectionHeader title="Numbers at a Glance" rightLabel="Desk" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-[26px] font-extrabold leading-none text-gray-950">
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
   SMART CITIES PAGE
========================================================= */

export function SmartCitiesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = useMemo(
    () =>
      activeTab === "All"
        ? cityItems
        : cityItems.filter((item) => item.topic === activeTab),
    [activeTab]
  );

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  const openTopicFeed = (tab: string) => {
    selectTab(tab);

    window.requestAnimationFrame(() => {
      feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  if (!leadStory) {
    return (
      <div className="w-full px-4 py-16 text-center text-[12px] text-gray-400">
        No smart city stories available right now.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="w-full px-4 md:px-6 xl:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* PAGE TITLE */}
          <header className="mb-6 border-t-[3px] border-black pt-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-red-600">
                  Cities &amp; Infrastructure
                </span>
                <h1 className="mt-1.5 text-[26px] font-extrabold leading-[1.12] text-gray-950 md:text-[32px]">
                  {SECTION_LABEL}
                </h1>
                <p className="mt-2 text-[13px] leading-[1.5] text-gray-500">
                  Urban technology, connected infrastructure and the cities
                  building the future from The Pride Times.
                </p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                Cities • Infrastructure • Technology
              </span>
            </div>
          </header>

          {/* =================================================
              1. TOP SECTION — 3 columns, like the homepage
                 LEFT   : lead story + Top Stories
                 CENTRE : two secondary stories
                 RIGHT  : Key Figures panel + Editor's Pick
          ================================================= */}
          <section className="mb-10">
            <div className="grid grid-cols-1 items-stretch gap-0 border border-gray-200 md:grid-cols-2 lg:grid-cols-12">
              {/* LEFT: lead story */}
              <div className="flex flex-col border-b border-gray-200 p-6 lg:col-span-4 lg:border-b-0 lg:border-r">
                <Link to={leadStory.href} className="group block">
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={leadStory.image}
                      alt={leadStory.title}
                      loading="eager"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-5">
                    <Kicker>
                      {SECTION_LABEL} · {leadStory.topic}
                    </Kicker>
                  </div>

                  <h1 className="mt-2 line-clamp-3 text-[26px] font-extrabold leading-[1.12] text-gray-950 group-hover:underline md:text-[28px]">
                    {leadStory.title}
                  </h1>

                  <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                    {leadStory.lede}
                  </p>

                  <div className="mt-2">
                    <TimeStamp>
                      {leadStory.when} · {leadStory.readTime}
                    </TimeStamp>
                  </div>
                </Link>

                <div className="mt-auto">
                  <RelatedBox items={sidebarStories} />
                </div>
              </div>

              {/* CENTRE: two secondary stories */}
              <div className="flex flex-col gap-8 border-b border-gray-200 p-6 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r">
                {majorStories.map((item) => (
                  <Link key={item.id} to={item.href} className="group block">
                    <div className="overflow-hidden rounded-md bg-gray-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="mt-4">
                      <Kicker>{item.topic}</Kicker>

                      <h3 className="mt-1.5 line-clamp-2 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[26px]">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-[14px] leading-[1.5] text-gray-500">
                        {item.lede}
                      </p>

                      <div className="mt-2">
                        <TimeStamp>{item.when}</TimeStamp>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* RIGHT: Key figures + Editor's Pick */}
              <aside className="flex flex-col p-6 md:col-span-2 lg:col-span-4">
                <KeyFiguresPanel
                  title="Key Figures"
                  facts={leadStory.keyFacts}
                />

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[15px] font-extrabold text-gray-950">
                      Editor's Pick
                    </h2>
                  </div>

                  <Link to={editorsPick.href} className="group block">
                    <div className="overflow-hidden rounded-md bg-gray-100">
                      <ImageWithFallback
                        src={editorsPick.image}
                        alt={editorsPick.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-3">
                      <Kicker>{editorsPick.topic}</Kicker>

                      <h3 className="mt-1.5 line-clamp-3 text-[20px] font-bold leading-[1.22] text-gray-950 group-hover:underline">
                        {editorsPick.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-[13px] leading-[1.5] text-gray-500">
                        {editorsPick.lede}
                      </p>
                    </div>
                  </Link>
                </div>
              </aside>
            </div>
          </section>

          <PrideTimesAd variant="second" />

          {/* =================================================
              2. LATEST SMART CITIES NEWS
                 LEFT  : tabs + filterable feed with "Show more"
                 RIGHT : sticky numbers + browse by topic
          ================================================= */}
          <section aria-label="Latest smart cities news" className="mb-12">
            <SectionHeader title={`Latest ${SECTION_LABEL} News`} />

            <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[1.9fr_0.7fr]">
              {/* Feed */}
              <div ref={feedRef} className="scroll-mt-24 min-w-0">
                <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                  {feedTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => selectTab(tab)}
                      className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-wide transition-colors ${
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
                      No stories in this topic yet.
                    </p>
                  )}

                  {visibleItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className="group grid grid-cols-[110px_1fr] items-start gap-4 py-7 sm:grid-cols-[200px_1fr] sm:gap-6"
                    >
                      <div className="h-[80px] w-full overflow-hidden rounded-md bg-gray-100 sm:h-[126px]">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">
                            {item.topic}
                          </span>
                          <span className="text-[10px] text-gray-300">•</span>
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                            <MapPin size={9} />
                            {SECTION_LABEL}
                          </span>
                        </div>

                        <h3 className="mt-1 line-clamp-2 text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline sm:text-[21px]">
                          {item.title}
                        </h3>

                        <p className="mt-1.5 hidden text-[13px] leading-[1.5] text-gray-500 line-clamp-2 sm:block">
                          {item.lede}
                        </p>

                        <div className="mt-1.5">
                          <TimeStamp>
                            {item.when} · {item.readTime}
                          </TimeStamp>
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
                      className="border border-black px-6 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-black hover:text-white"
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
                <div className="lg:sticky lg:top-24 lg:pt-1">
                  <CityNumbers />

                  <div className="mt-8">
                    <SectionHeader title="Browse by Topic" rightLabel="Sections" />

                    <div className="divide-y divide-gray-200">
                      {topicGroups.map((group) => (
                        <button
                          key={group.name}
                          type="button"
                          onClick={() => openTopicFeed(group.name)}
                          className="flex w-full items-center justify-between py-3 text-left"
                        >
                          <span className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-gray-950 hover:underline">
                            {group.name}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-red-600">
                            {group.stories.length}{" "}
                            {group.stories.length === 1 ? "story" : "stories"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <PrideTimesAd variant="third" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              3. DEEP DIVE — image left, story right (homepage style)
          ================================================= */}
          <section aria-label="Smart cities deep dive" className="mb-16">
            <SectionHeader title="Deep Dive" link={deepDiveStory.href} linkText="Read story" />

            <section className="grid grid-cols-1 items-stretch gap-0 border-x border-b border-gray-200 lg:grid-cols-12">
              <Link
                to={deepDiveStory.href}
                className="group block overflow-hidden bg-gray-100 lg:col-span-6"
              >
                <ImageWithFallback
                  src={deepDiveStory.image}
                  alt={deepDiveStory.title}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </Link>

              <div className="flex flex-col justify-center p-6 lg:col-span-6 lg:p-12">
                <Kicker>{deepDiveStory.topic}</Kicker>

                <Link to={deepDiveStory.href} className="group block">
                  <h2 className="mt-2 line-clamp-3 text-[28px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[32px]">
                    {deepDiveStory.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-gray-600">
                    {deepDiveStory.lede}
                  </p>
                </Link>
              </div>
            </section>
          </section>

          {/* =================================================
              4. STORIES BY TOPIC — 16:10 image cards (homepage style)
          ================================================= */}
          <section aria-label="Stories by topic" className="mb-16">
            <SectionHeader title="Stories by Topic" />

            <div className="space-y-12">
              {topicGroups.map((group) => (
                <div key={group.name}>
                  <div className="mb-5 flex items-baseline justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-gray-950">
                      {group.name}
                    </h3>

                    <button
                      type="button"
                      onClick={() => openTopicFeed(group.name)}
                      className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 hover:text-red-600"
                    >
                      {group.stories.length}{" "}
                      {group.stories.length === 1 ? "story" : "stories"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {group.stories.slice(0, 4).map((item) => (
                      <Link
                        key={item.id}
                        to={item.href}
                        className="group flex h-full flex-col"
                      >
                        <div className="overflow-hidden rounded-md bg-gray-100">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>

                        <div className="mt-2.5 flex flex-1 flex-col">
                          <Kicker>{item.topic}</Kicker>

                          <h4 className="mt-1 line-clamp-2 min-h-[2.56em] text-[16px] font-bold leading-[1.28] text-gray-950 group-hover:underline">
                            {item.title}
                          </h4>

                          <div className="mt-auto pt-1.5">
                            <TimeStamp>{item.when}</TimeStamp>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <PrideTimesAd variant="second" />

          {/* =================================================
              5. BROWSE BY TOPIC + KEY FIGURES
          ================================================= */}
          <section className="mb-16">
            <SectionHeader title="Browse by Topic" />

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
              {topicGroups.map((group) => {
                const top = group.stories[0];

                return (
                  <div
                    key={group.name}
                    className="flex flex-col border-b border-gray-200 py-6"
                  >
                    <button
                      type="button"
                      onClick={() => openTopicFeed(group.name)}
                      className="w-fit text-left text-[12px] font-extrabold uppercase tracking-[0.08em] text-gray-950 hover:underline"
                    >
                      {group.name}
                    </button>

                    {top && (
                      <Link to={top.href} className="group mt-2 block">
                        <span className="block min-h-[5.2em] text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline line-clamp-4">
                          {top.title}
                        </span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => openTopicFeed(group.name)}
                      className="mt-auto w-fit pt-3 text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      {group.stories.length}{" "}
                      {group.stories.length === 1 ? "story" : "stories"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <PrideTimesAd variant="first" />
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

export default SmartCitiesPage;
