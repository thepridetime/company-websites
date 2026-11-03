import { useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, MapPin } from "lucide-react";
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

const PAGE_SIZE = 8;

/* =========================================================
   SMALL UI PIECES (same as homepage)
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
   SMART CITIES PAGE
========================================================= */

export function SmartCitiesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const feedRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Feed filtering ---------- */

  const filteredItems = useMemo(
    () =>
      activeTab === "All"
        ? cityItems
        : cityItems.filter((item) => item.topic === activeTab),
    [activeTab]
  );

  const visibleItems =
    activeTab === "All" ? filteredItems.slice(0, visibleCount) : filteredItems;

  const hasMore = activeTab === "All" && visibleCount < filteredItems.length;

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
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">
        No smart city stories available right now.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* =================================================
              1. TOP SECTION
          ================================================= */}

          <section className="mb-10 border-b border-gray-300 pb-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0">
              {/* LEFT: top headlines (text only) */}

              <aside className="order-2 min-w-0 lg:order-1 lg:col-span-3 lg:border-r lg:border-gray-200 lg:pr-6">
                <div className="mb-1 border-t-[3px] border-black pt-2">
                  <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                    Top Stories
                  </h2>
                </div>

                <ul className="divide-y divide-gray-200">
                  {[leadStory, ...sidebarStories].slice(0, 4).map((item) => (
                    <li key={item.id}>
                      <Link to={item.href} className="group block py-3.5">
                        <Kicker>{item.topic}</Kicker>

                        <h3 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                          {item.title}
                        </h3>

                        <div className="mt-1.5">
                          <TimeStamp>{item.when}</TimeStamp>
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
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-4">
                    <Kicker>
                      {SECTION_LABEL} · {leadStory.topic}
                    </Kicker>

                    <h1 className="mt-1.5 font-serif text-[28px] font-bold leading-[1.1] text-gray-950 group-hover:underline md:text-[38px]">
                      {leadStory.title}
                    </h1>

                    <p className="mt-3 text-[15px] leading-[1.55] text-gray-600">
                      {leadStory.lede}
                    </p>

                    <div className="mt-3">
                      <TimeStamp>
                        {leadStory.when} · {leadStory.readTime}
                      </TimeStamp>
                    </div>
                  </div>
                </Link>

                <div className="mt-6 grid grid-cols-1 gap-6 border-t border-gray-200 pt-5 sm:grid-cols-2">
                  {majorStories.map((item) => (
                    <Link key={item.id} to={item.href} className="group block">
                      <div className="overflow-hidden rounded-sm">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="mt-2.5">
                        <Kicker>{item.topic}</Kicker>

                        <h3 className="mt-1 font-serif text-[19px] font-bold leading-[1.2] text-gray-950 group-hover:underline">
                          {item.title}
                        </h3>

                        <div className="mt-1.5">
                          <TimeStamp>{item.when}</TimeStamp>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* RIGHT: key figures panel + editor's pick */}

              <aside className="order-3 min-w-0 lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-6">
                <div className="rounded-sm bg-black p-4 text-white">
                  <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                      Key Figures
                    </h2>
                  </div>

                  <div className="divide-y divide-white/10">
                    {leadStory.keyFacts.map((fact) => (
                      <div
                        key={fact.label}
                        className="flex items-start justify-between gap-3 py-2.5"
                      >
                        <span className="text-[11px] font-semibold text-gray-300">
                          {fact.label}
                        </span>
                        <span className="text-right text-[11px] tabular-nums text-gray-400">
                          {fact.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                      Editor's Pick
                    </h2>

                    <Link
                      to={editorsPick.href}
                      className="text-[10px] font-semibold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      Read more
                    </Link>
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
                      <Kicker>{editorsPick.topic}</Kicker>

                      <h3 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                        {editorsPick.title}
                      </h3>

                      <p className="mt-1.5 text-[12px] leading-[1.5] text-gray-500 line-clamp-2">
                        {editorsPick.lede}
                      </p>
                    </div>
                  </Link>
                </div>
              </aside>
            </div>
          </section>

          <PrideTimesAd variant="first" />

          {/* =================================================
              2. LATEST NEWS
          ================================================= */}

          <section aria-label="Latest smart cities news" className="mb-12">
            <SectionHeader title={`Latest ${SECTION_LABEL} News`} />

            <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {cityItems.slice(0, 6).map((item, index) => (
                <li key={item.id} className="border-b border-gray-200">
                  <Link to={item.href} className="group flex gap-3 py-3.5">
                    <span className="w-6 shrink-0 font-serif text-[22px] font-bold leading-none tabular-nums text-gray-300">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <Kicker>{item.topic}</Kicker>

                      <span className="mt-1 block font-serif text-[16px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.9fr_0.7fr]">
              {/* ---------- Feed ---------- */}

              <div ref={feedRef} className="scroll-mt-24 min-w-0">
                <SectionHeader title="More Smart City Stories" />

                <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                  {feedTabs.map((tab) => (
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
                      No stories in this topic yet.
                    </p>
                  )}

                  {visibleItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className="group grid grid-cols-[110px_1fr] gap-4 py-5 sm:grid-cols-[200px_1fr] sm:gap-5"
                    >
                      <div className="h-[80px] w-full overflow-hidden rounded-sm sm:h-[126px]">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
                            {item.topic}
                          </span>
                          <span className="text-[10px] text-gray-300">•</span>
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                            <MapPin size={9} />
                            {SECTION_LABEL}
                          </span>
                        </div>

                        <h3 className="mt-1 font-serif text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline sm:text-[21px]">
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

              {/* ---------- Topics (sticky sidebar) ---------- */}

              <div className="min-w-0">
                <div className="lg:sticky lg:top-24">
                  <SectionHeader title="Topics" />

                  <div className="rounded-sm bg-black p-5 text-white">
                    <div className="divide-y divide-white/10">
                      {topicGroups.map((group) => (
                        <button
                          key={group.name}
                          type="button"
                          onClick={() => openTopicFeed(group.name)}
                          className="flex w-full items-center justify-between gap-3 py-2.5 text-left"
                        >
                          <span className="text-[11px] font-semibold text-gray-100">
                            {group.name}
                          </span>
                          <span className="shrink-0 text-[11px] tabular-nums text-gray-400">
                            {group.stories.length}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <PrideTimesAd variant="second" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              3. DEEP DIVE
          ================================================= */}

          <section aria-label="Smart cities deep dive" className="mb-12">
            <SectionHeader title="Deep Dive" link={deepDiveStory.href} linkText="Read story" />

            <Link
              to={deepDiveStory.href}
              className="group relative block min-h-[220px] overflow-hidden rounded-sm bg-black"
            >
              <ImageWithFallback
                src={deepDiveStory.image}
                alt={deepDiveStory.title}
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-400">
                  {deepDiveStory.topic}
                </span>

                <h3 className="mt-2 max-w-3xl font-serif text-2xl font-bold leading-[1.15] text-white group-hover:underline sm:text-[30px]">
                  {deepDiveStory.title}
                </h3>

                <p className="mt-2 max-w-3xl text-[13px] leading-[1.5] text-gray-300 line-clamp-2">
                  {deepDiveStory.lede}
                </p>
              </div>
            </Link>
          </section>

          {/* =================================================
              4. STORIES BY TOPIC
          ================================================= */}

          <section aria-label="Stories by topic" className="mb-12">
            <SectionHeader title="Stories by Topic" />

            <div className="space-y-10">
              {topicGroups.map((group) => (
                <div key={group.name}>
                  <div className="mb-4 flex items-baseline justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-gray-950">
                      {group.name}
                    </h3>

                    <button
                      type="button"
                      onClick={() => openTopicFeed(group.name)}
                      className="text-[10px] font-semibold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      {group.stories.length}{" "}
                      {group.stories.length === 1 ? "story" : "stories"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                    {group.stories.slice(0, 4).map((item) => (
                      <Link key={item.id} to={item.href} className="group block">
                        <div className="aspect-[16/10] w-full overflow-hidden rounded-sm bg-gray-100">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <span className="mt-2.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                          {item.when}
                        </span>

                        <h4 className="mt-1 font-serif text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                          {item.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <PrideTimesAd variant="second" />

          {/* =================================================
              5. BROWSE BY TOPIC
          ================================================= */}

          <section>
            <SectionHeader title="Browse by Topic" />

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
              {topicGroups.map((group) => {
                const top = group.stories[0];

                return (
                  <div
                    key={group.name}
                    className="flex flex-col border-b border-gray-200 py-4"
                  >
                    <button
                      type="button"
                      onClick={() => openTopicFeed(group.name)}
                      className="w-fit text-left text-[12px] font-bold uppercase tracking-[0.12em] text-gray-950 hover:underline"
                    >
                      {group.name}
                    </button>

                    {top && (
                      <Link to={top.href} className="group mt-2 block">
                        <span className="block font-serif text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline line-clamp-4">
                          {top.title}
                        </span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => openTopicFeed(group.name)}
                      className="mt-3 w-fit text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      {group.stories.length}{" "}
                      {group.stories.length === 1 ? "story" : "stories"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      {/* Local page utilities */}

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
