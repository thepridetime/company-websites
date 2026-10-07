import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  MapPin,
} from "lucide-react";

import MagazineImg from "../../../imports/pt30image.png";

import { getQuotes } from "../../../services/marketApi";
import {
  digestArticles,
  digestArticlePath,
  digestSections,
  regionalSnapshot,
  type DigestArticle,
} from "../../data/digestArticleData";
import {
  maEdition1Articles,
  maEdition1Meta,
  maEdition1DealTable,
  maEdition1Sources,
  maEdition1ArticlePath,
  maEdition1IndustryOrder,
  type EditionArticle,
} from "../../data/maEdition1Data";

import {
  globalSectorReport,
  globalSectorItems,
  globalSectorAnchorId,
} from "../../data/globalSectorReportData";
import {
  octEditionArticles,
  octEditionArticlePath,
  octEditionMeta,
  type OctEditionArticle,
} from "../../data/octEditionData";

/* =========================================================
   TYPES
========================================================= */

type MarketItem = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

/* =========================================================
   GOOGLE ADSENSE
========================================================= */

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function PrideTimesAd() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense Error:", error);
    }
  }, []);

  return (
    <section
      aria-label="Advertisement"
      className="my-8 overflow-hidden border-y border-gray-100 bg-white py-4"
    >
      <div className="mb-2 text-center text-[8px] font-medium uppercase tracking-[0.2em] text-gray-400">
        Advertisement
      </div>

      <div className="mx-auto w-full max-w-5xl overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot="6033028012"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </section>
  );
}

/* =========================================================
   TOP STORIES
   Every story below comes from the Global Corporate News
   Digest (src/app/data/digestArticleData.ts). Each one links to
   its full inner article at /article/:slug.
========================================================= */

const byTitle = (prefix: string): DigestArticle =>
  digestArticles.find((article) => article.title.startsWith(prefix)) ??
  digestArticles[0];

const leadStory = byTitle("Altamira Capital commits $34.1B");

/* The previous lead story now follows the new Global Sector Report
   headline as the first major story. */
const majorStories = [
  leadStory,
  byTitle("Navarro Partners agrees $13.9B takeover"),
];

const editorsPick = byTitle("Tidewater Aerospace reports first green-hydrogen");

const featuredIds = new Set(
  [leadStory, ...majorStories, editorsPick].map((article) => article.id)
);

/* Sidebar stream: the first non-featured story from each of the
   first six sections. */
const sidebarStories = digestSections
  .map((section) =>
    digestArticles.find(
      (article) =>
        article.sectionNumber === section.number &&
        !featuredIds.has(article.id)
    )
  )
  .filter((article): article is DigestArticle => Boolean(article))
  .slice(0, 6);

/* =========================================================
   OCTOBER 7, 2026 — NEW HOMEPAGE HEADLINES
   The October edition leads the homepage. The previous homepage
   coverage remains available below in the More News section.
========================================================= */

const octoberLeadStory = octEditionArticles[0];
const octoberRelatedStories: OctEditionArticle[] = octEditionArticles.slice(1);

/* =========================================================
   LATEST NEWS
   "All" interleaves the ten sections so the feed stays varied;
   a section tab shows every story from that section.
========================================================= */

const sectionNames = digestSections.map((section) => section.name);
const latestNewsTabs = ["All", ...sectionNames];

const interleavedArticles: DigestArticle[] = (() => {
  const bySection = [
    ...digestSections.map((section) =>
      digestArticles.filter(
        (article) => article.sectionNumber === section.number
      )
    ),
    /* Edition 1 stories, one bucket per industry. */
    ...maEdition1IndustryOrder.map((name) =>
      maEdition1Articles.filter((article) => article.industry === name)
    ),
    /* The Edition 1 market overview (not tied to one industry). */
    maEdition1Articles.filter(
      (article) => !maEdition1IndustryOrder.includes(article.industry)
    ),
  ];
  const rounds = Math.max(...bySection.map((list) => list.length));
  const result: DigestArticle[] = [];

  for (let round = 0; round < rounds; round += 1) {
    bySection.forEach((list) => {
      if (list[round]) result.push(list[round]);
    });
  }

  return result;
})();

const PAGE_SIZE = 8;

/* =========================================================
   EDITION 1 — MERGERS & ACQUISITIONS (additive)
   Shown in its own homepage block and in the "Mergers &
   Acquisitions" Latest News tab. The September digest above
   is not modified.
========================================================= */

const editionBy = (prefix: string): EditionArticle | undefined =>
  maEdition1Articles.find((article) => article.title.startsWith(prefix));

const editionLead = maEdition1Articles[0];

/* Every Edition 1 story grouped by industry, in digest order. */
const editionIndustries = maEdition1IndustryOrder.map((name) => ({
  name,
  stories: maEdition1Articles.filter((article) => article.industry === name),
})).filter((group) => group.stories.length > 0);

/* One headline per department (digest section). Mergers &
   Acquisitions leads with the newest Edition 1 deal story; every
   other department leads with its first digest story. */
const allSectionStories: DigestArticle[] = [
  ...maEdition1Articles,
  ...digestArticles,
];

const sectionHeadlines = new Map<number, DigestArticle>(
  digestSections
    .map((section) => {
      const story =
        section.number === 4
          ? editionBy("Paramount") ??
            allSectionStories.find((a) => a.sectionNumber === 4)
          : allSectionStories.find((a) => a.sectionNumber === section.number);

      return story ? ([section.number, story] as const) : null;
    })
    .filter((entry): entry is readonly [number, DigestArticle] =>
      Boolean(entry)
    )
);

const sectionStoryCounts = new Map<number, number>(
  digestSections.map((section) => [
    section.number,
    allSectionStories.filter((a) => a.sectionNumber === section.number).length,
  ])
);

function editionDealChip(article: EditionArticle) {
  return article.keyFacts.find((fact) =>
    ["Enterprise value", "Combined enterprise value", "Value"].includes(
      fact.label
    )
  );
}

/* =========================================================
   MAGAZINE
========================================================= */

const magazinePreview = {
  title: "The 2026 Global Industry Outlook",
  subtitle:
    "Energy security, AI infrastructure, supply-chain resilience and the forces reshaping global business.",
  image: MagazineImg,
};

/* =========================================================
   PRIDE TIMES 30
========================================================= */

const prideTimes30 = [
  { rank: 1, name: "Jensen Huang", company: "Nvidia", sector: "AI infrastructure, accelerated computing and robotics — areas central to Nvidia's technology strategy." },
  { rank: 2, name: "Satya Nadella", company: "Microsoft", sector: "Enterprise AI adoption and large-scale digital transformation across Microsoft's business ecosystem." },
  { rank: 3, name: "Sundar Pichai", company: "Alphabet / Google", sector: "AI integration across search, cloud and emerging technology businesses at Alphabet." },
  { rank: 4, name: "Elon Musk", company: "Tesla / SpaceX / X", sector: "Technology initiatives spanning energy, space, transportation and AI across Musk's companies." },
  { rank: 5, name: "Sam Altman", company: "OpenAI", sector: "Development and deployment of frontier artificial intelligence through OpenAI's research and products." },
  { rank: 6, name: "Andy Jassy", company: "Amazon", sector: "AWS and cloud infrastructure supporting the next generation of AI workloads." },
  { rank: 7, name: "Lisa Su", company: "AMD", sector: "Competitive AI computing across CPUs and GPUs as AMD expands its role in the market." },
  { rank: 8, name: "C.C. Wei", company: "TSMC", sector: "Advanced semiconductor manufacturing serving the global technology industry through TSMC." },
  { rank: 9, name: "Alex Karp", company: "Palantir", sector: "Enterprise AI and data platforms serving commercial and government markets through Palantir." },
  { rank: 10, name: "Mary Barra", company: "General Motors", sector: "Automotive transformation through electrification and technology at General Motors." },
];

/* =========================================================
   CHANGE CHIP
========================================================= */

function ChangeChip({ change, up }: { change: string; up: boolean }) {
  return (
    <span
      className={`text-[10px] font-semibold tabular-nums flex items-center gap-1 ${
        up ? "text-green-600" : "text-red-600"
      }`}
    >
      {up ? (
        <TrendingUp size={10} strokeWidth={2.25} />
      ) : (
        <TrendingDown size={10} strokeWidth={2.25} />
      )}
      {change}
    </span>
  );
}

/* =========================================================
   SECTION HEADER
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
    <div className="flex items-center justify-between border-b-2 border-black pb-2.5 mb-5">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
        {title}
      </h2>

      {link && (
        <Link
          to={link}
          className="text-[9px] font-semibold text-red-600 flex items-center gap-1"
        >
          {linkText}
          <ArrowRight size={9} />
        </Link>
      )}
    </div>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export function HomePage() {
  const [activeMarketTab, setActiveMarketTab] =
    useState<"Indices" | "Crypto">("Indices");

  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const newsListRef = useRef<HTMLDivElement | null>(null);

  const [marketSnapshotData, setMarketSnapshotData] = useState<
    Record<string, MarketItem[]>
  >({
    Indices: [],
    Crypto: [],
  });

  /* =======================================================
     MARKET DATA
  ======================================================= */

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const data = await getQuotes();

        setMarketSnapshotData({
          Indices: data.indices.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: item.change,
            up: item.up,
          })),

          Crypto: data.crypto.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: item.change,
            up: item.up,
          })),
        });
      } catch (error) {
        console.error("Market API Error:", error);
      }
    };

    loadMarketData();
  }, []);

  /* =======================================================
     LATEST NEWS FILTERING
  ======================================================= */

  const filteredStories = useMemo(
    () =>
      activeNewsTab === "All"
        ? interleavedArticles
        : [...maEdition1Articles, ...digestArticles].filter(
            (article) => article.section === activeNewsTab
          ),
    [activeNewsTab]
  );

  const latestStories =
    activeNewsTab === "All"
      ? filteredStories.slice(0, visibleCount)
      : filteredStories;

  const hasMore =
    activeNewsTab === "All" && visibleCount < filteredStories.length;

  const selectTab = (tab: string) => {
    setActiveNewsTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  const openSectionFeed = (sectionName: string) => {
    selectTab(sectionName);

    window.requestAnimationFrame(() => {
      newsListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-4 md:pt-6 pb-16">

          {/* =================================================
              OCTOBER 7, 2026 — CURRENT HEADLINES
          ================================================= */}

          <section className="mb-12 border-b border-gray-300 pb-10">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b-2 border-black pb-2.5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">
                  {octEditionMeta.edition} · {octEditionMeta.date}
                </p>
                <h1 className="mt-1 font-serif text-2xl font-bold leading-tight text-gray-950 md:text-3xl">
                  {octEditionMeta.title}
                </h1>
              </div>
              <Link
                to="/business-news"
                className="text-[9px] font-semibold uppercase tracking-wide text-red-600"
              >
                Full Edition <ArrowRight size={9} className="ml-1 inline" />
              </Link>
            </div>

            <p className="mb-6 max-w-3xl text-[12px] leading-[1.6] text-gray-500">
              {octEditionMeta.subtitle}
            </p>

            <Link
              to={octEditionArticlePath(octoberLeadStory)}
              className="group relative block overflow-hidden rounded-lg border border-gray-200 bg-black"
            >
              <div className="h-[250px] overflow-hidden md:h-[270px]">
                <ImageWithFallback
                  src={octoberLeadStory.image}
                  alt={octoberLeadStory.title}
                  className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-red-400">
                  {octoberLeadStory.industry} · {octoberLeadStory.location}
                </span>
                <h2 className="mt-2 max-w-4xl font-serif text-2xl font-bold leading-[1.1] text-white md:text-3xl">
                  {octoberLeadStory.title}
                </h2>
                <p className="mt-2 max-w-3xl text-[12px] leading-[1.5] text-gray-300 line-clamp-2">
                  {octoberLeadStory.lede}
                </p>
              </div>
            </Link>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {octoberRelatedStories.map((story) => (
                <Link
                  key={story.id}
                  to={octEditionArticlePath(story)}
                  className="group block"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-3 block text-[9px] font-bold uppercase tracking-[0.14em] text-red-600">
                    {story.industry} · {story.location}
                  </span>
                  <h3 className="mt-1.5 font-serif text-xl font-bold leading-[1.2] text-gray-900 transition-colors group-hover:text-red-600">
                    {story.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-[1.55] text-gray-500 line-clamp-2">
                    {story.lede}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <details className="mb-12 rounded-md border border-gray-200" open>
            <summary className="cursor-pointer select-none px-4 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-900">
              More News · Previous Homepage Coverage
            </summary>
            <div className="border-t border-gray-200 px-4 pt-5 sm:px-6">

          {/* =================================================
              TOP STORIES / NEWSROOM LEAD
          ================================================= */}

          <section className="pb-8 mb-8 border-b border-gray-300">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr_0.85fr] gap-5 lg:gap-6">

              {/* LEAD STORY */}

              <a
                href={`#${globalSectorAnchorId}`}
                    className="group relative block overflow-hidden rounded-lg border border-gray-200 min-h-[250px] lg:min-h-[250px] bg-black"
              >
                <ImageWithFallback
                  src={globalSectorReport.image}
                  alt={globalSectorReport.headline}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[9px] font-bold tracking-[0.16em] uppercase rounded-[2px]">
                  {globalSectorReport.kicker} | {globalSectorReport.location}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h1 className="font-serif text-2xl md:text-[30px] lg:text-[34px] font-bold leading-[1.08] text-white">
                    {globalSectorReport.headline}
                  </h1>

                  <p className="text-[13px] md:text-[14px] font-semibold text-red-200 leading-[1.5] mt-3">
                    {globalSectorReport.subheadline}
                  </p>

                  <p className="text-[12px] md:text-[13px] text-gray-200 leading-[1.6] mt-2 line-clamp-3">
                    {globalSectorReport.pattern}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-wide mt-4 border-b border-white/60 pb-1">
                    Read Full Story
                    <ArrowRight size={12} />
                  </span>
                </div>
              </a>

              {/* MAJOR COVERAGE */}

              <div className="min-w-0">
                <div className="mb-4">
                  <span className="block text-[9px] font-bold text-red-600 uppercase tracking-[0.15em] mb-2">
                    {majorStories[0].section} | {majorStories[0].location}
                  </span>

                  <Link
                    to={digestArticlePath(majorStories[0])}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={majorStories[0].image}
                        alt={majorStories[0].title}
                        className="w-full h-[220px] md:h-[250px] object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <h2 className="font-serif text-xl md:text-2xl font-bold leading-[1.15] mt-3 text-gray-950 group-hover:text-red-600 transition-colors">
                      {majorStories[0].title}
                    </h2>

                    <p className="text-[12px] text-gray-600 mt-2 leading-[1.6] line-clamp-3">
                      {majorStories[0].lede}
                    </p>
                  </Link>
                </div>

                {/* SECOND MAJOR STORY */}

                <Link
                  to={digestArticlePath(majorStories[1])}
                  className="group flex gap-3 pt-4 border-t border-gray-200"
                >
                  <div className="shrink-0 w-[105px] h-[75px] overflow-hidden rounded-md">
                    <ImageWithFallback
                      src={majorStories[1].image}
                      alt={majorStories[1].title}
                      className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold text-red-600 uppercase tracking-[0.14em]">
                      {majorStories[1].section}
                    </span>

                    <h3 className="text-[13px] font-bold leading-[1.35] mt-1 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                      {majorStories[1].title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-[1.45] text-gray-500 line-clamp-2">
                      {majorStories[1].lede}
                    </p>

                    <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-2">
                      <Clock size={9} />
                      {majorStories[1].publishedAt}
                    </span>
                  </div>
                </Link>

                {/* MARKET CONTEXT */}

                <div className="mt-5 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em]">
                      Market Snapshot
                    </h3>

                    <div className="flex gap-3">
                      {(["Indices", "Crypto"] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveMarketTab(tab)}
                          className={`text-[9px] font-semibold uppercase tracking-wide ${
                            activeMarketTab === tab
                              ? "text-red-600"
                              : "text-gray-400 hover:text-gray-700"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {(marketSnapshotData[activeMarketTab] || [])
                      .slice(0, 4)
                      .map((market) => (
                        <div
                          key={market.symbol}
                          className="py-2 flex items-center justify-between"
                        >
                          <span className="text-[10px] font-semibold text-gray-800">
                            {market.symbol}
                          </span>

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-gray-500 tabular-nums">
                              {market.value}
                            </span>

                            <ChangeChip
                              change={market.change}
                              up={market.up}
                            />
                          </div>
                        </div>
                      ))}
                  </div>

                  <Link
                    to="/markets"
                    className="mt-2 text-[9px] font-bold text-red-600 flex items-center gap-1 uppercase tracking-wide w-fit"
                  >
                    View All Markets
                    <ArrowRight size={9} />
                  </Link>
                </div>
              </div>

              {/* RIGHT NEWSROOM COLUMN */}

              <aside className="min-w-0">
                {/* EDITOR'S PICK */}

                <div className="pb-5 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-serif text-lg font-bold">
                      Editor's Pick
                    </h2>

                    <Link
                      to={editorsPick.sectionPath}
                      className="border border-gray-300 rounded-full px-3 py-1 text-[9px] font-medium hover:border-gray-500 transition-colors"
                    >
                      Explore More
                    </Link>
                  </div>

                  <Link
                    to={digestArticlePath(editorsPick)}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={editorsPick.image}
                        alt={editorsPick.title}
                        className="w-full h-[175px] object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <span className="block text-[9px] font-bold text-red-600 uppercase tracking-[0.14em] mt-2.5">
                      {editorsPick.section}
                    </span>

                    <h3 className="text-[13px] font-semibold leading-[1.4] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                      {editorsPick.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-[1.5] text-gray-500 line-clamp-3">
                      {editorsPick.lede}
                    </p>
                  </Link>
                </div>

                {/* LATEST NEWS STREAM (sidebar headlines) */}

                <div className="pt-5">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-1">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                      Latest News
                    </h2>

                    <span className="text-[8px] uppercase tracking-wide text-gray-400">
                      Newsroom
                    </span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {sidebarStories.map((item) => (
                      <Link
                        key={item.id}
                        to={digestArticlePath(item)}
                        className="group block py-3"
                      >
                        <div className="flex gap-3">
                          <span className="shrink-0 text-[9px] font-semibold text-red-600 w-[58px] truncate">
                            {item.location}
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
                </div>
              </aside>
            </div>
          </section>

          {/* =================================================
              GLOBAL SECTOR NEWS REPORT 2026 (new; additive)
              Destination of the main headline above.
          ================================================= */}

          <section
            id={globalSectorAnchorId}
            aria-label="Global Sector News Report 2026"
            className="mb-12 scroll-mt-24 border-b border-gray-300 pb-10"
          >
            <SectionHeader title={globalSectorReport.kicker} />

            <p className="-mt-2 mb-4 text-[11px] leading-[1.5] text-gray-500">
              {globalSectorReport.subheadline}
            </p>

            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {globalSectorItems.map((item) => (
                <div key={item.sector}>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-red-600">
                    {item.sector}
                  </span>

                  <h4 className="mt-1.5 font-serif text-xl font-bold leading-[1.25] text-gray-900 md:text-[22px]">
                    {item.headline}
                  </h4>

                  <p className="mt-1.5 text-[12px] font-medium leading-[1.5] text-gray-700">
                    {item.verdict}.
                  </p>

                  <p className="mt-1 text-[11px] leading-[1.55] text-gray-500">
                    {item.signal}. Bottleneck: {item.bottleneck}.
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              GLOBAL CORPORATE NEWS DIGEST — EDITION 1: M&A
              (new; added alongside the existing news)
          ================================================= */}

          <section
            aria-label="Global Corporate News Digest Edition 1: Mergers and Acquisitions"
            className="mb-12 border-b border-gray-300 pb-10"
          >
            <SectionHeader
              title={`Global Corporate News Digest · ${maEdition1Meta.edition} · Headlines by Industry`}
              link="/mergers-acquisitions"
              linkText="M&A Hub"
            />

            <p className="-mt-2 mb-5 text-[11px] leading-[1.5] text-gray-500">
              {maEdition1Meta.subtitle}{" "}
              <span className="text-gray-400">
                {maEdition1Meta.prepared}. {maEdition1Meta.note}
              </span>
            </p>

            {/* EDITION LEAD */}

            <Link
              to={maEdition1ArticlePath(editionLead)}
              className="group relative block overflow-hidden rounded-lg border border-gray-200 min-h-[260px] bg-black"
            >
              <ImageWithFallback
                src={editionLead.image}
                alt={editionLead.title}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-red-500">
                  {editionLead.section} · {maEdition1Meta.edition}
                </span>

                <h3 className="mt-2 max-w-3xl font-serif text-2xl sm:text-3xl font-bold leading-[1.15] text-white group-hover:underline">
                  {editionLead.title}
                </h3>

                <p className="mt-2 max-w-3xl text-[12px] leading-[1.5] text-gray-300 line-clamp-2">
                  {editionLead.lede}
                </p>
              </div>
            </Link>

            {/* HEADLINES BY INDUSTRY — every story = one image + one headline
                (Bloomberg-style cards). Each card opens its article page. */}

            <div className="mt-8 space-y-10">
              {editionIndustries.map((group) => (
                <div key={group.name}>
                  <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gray-900">
                      {group.name}
                    </h3>

                    <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                      {group.stories.length} stories
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                    {group.stories.map((story) => {
                      const chip = editionDealChip(story);

                      return (
                        <Link
                          key={story.id}
                          to={maEdition1ArticlePath(story)}
                          className="group block"
                        >
                          <div className="aspect-[16/10] w-full overflow-hidden rounded-md bg-gray-100">
                            <ImageWithFallback
                              src={story.image}
                              alt={story.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {chip && (
                            <span className="mt-3 block text-[11px] font-bold uppercase tracking-[0.12em] text-red-600">
                              {chip.value}
                            </span>
                          )}

                          <h4 className="mt-1.5 font-serif text-xl font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-600 md:text-[22px]">
                            {story.title}
                          </h4>

                          <p className="mt-1.5 text-[12px] leading-[1.55] text-gray-500 line-clamp-2">
                            {story.lede}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* DEAL STATUS TRACKER */}

            <details className="mt-6 rounded-md border border-gray-200">
              <summary className="cursor-pointer select-none px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-800">
                Deal status table (as of the early August 2026 tracker update)
              </summary>

              <div className="overflow-x-auto border-t border-gray-200">
                <table className="w-full min-w-[560px] text-left text-[11px]">
                  <thead className="bg-gray-50 text-[9px] uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-4 py-2 font-semibold">Deal</th>
                      <th className="px-4 py-2 font-semibold">Value</th>
                      <th className="px-4 py-2 font-semibold">Announced</th>
                      <th className="px-4 py-2 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {maEdition1DealTable.map((row) => (
                      <tr key={row.deal}>
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {row.deal}
                        </td>
                        <td className="px-4 py-2 text-gray-700">{row.value}</td>
                        <td className="px-4 py-2 text-gray-700">
                          {row.announced}
                        </td>
                        <td className="px-4 py-2 text-gray-700">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="border-t border-gray-200 px-4 py-3 text-[10px] leading-[1.5] text-gray-400">
                {maEdition1Sources}
              </p>
            </details>
          </section>

          {/* =================================================
              LATEST NEWS (all 60 digest stories) + MAGAZINE
          ================================================= */}

          <section className="grid grid-cols-1 lg:grid-cols-[1.7fr_0.8fr] gap-7 mb-12">

            {/* LATEST NEWS */}

            <div ref={newsListRef} className="scroll-mt-24">
              <SectionHeader
                title="Latest News"
                link="/business-news"
              />

              {/* FILTER TABS */}

              <div className="flex items-center gap-5 overflow-x-auto no-scrollbar border-b border-gray-200 pb-3 mb-1">
                {latestNewsTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => selectTab(tab)}
                    className={`text-[10px] font-semibold whitespace-nowrap uppercase tracking-wide transition-colors ${
                      activeNewsTab === tab
                        ? "text-red-600"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* STORY LIST */}

              <div className="divide-y divide-gray-200">
                {latestStories.length === 0 && (
                  <p className="py-6 text-[11px] text-gray-400">
                    No stories in this category yet.
                  </p>
                )}

                {latestStories.map((story) => (
                  <Link
                    key={story.id}
                    to={digestArticlePath(story)}
                    className="group grid grid-cols-[130px_1fr] sm:grid-cols-[280px_1fr] gap-4 sm:gap-6 py-6"
                  >
                    <div className="w-full h-[96px] sm:h-[185px] overflow-hidden rounded-md">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2">
                        <span className="text-[8px] font-bold text-red-600 uppercase tracking-[0.14em]">
                          {"industry" in story
                            ? (story as EditionArticle).industry
                            : story.section}
                        </span>

                        <span className="text-[8px] text-gray-300">•</span>

                        <span className="inline-flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-gray-400">
                          <MapPin size={8} />
                          {story.location}
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-2xl font-bold leading-[1.2] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                        {story.title}
                      </h3>

                      <p className="hidden sm:block text-[13px] text-gray-500 leading-[1.55] mt-2 line-clamp-3">
                        {story.lede}
                      </p>

                      <span className="flex items-center gap-1 text-[9px] text-gray-400 mt-1.5">
                        <Clock size={8} />
                        {story.publishedAt} · {story.readTime}
                      </span>
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
                        Math.min(count + PAGE_SIZE, filteredStories.length)
                      )
                    }
                    className="rounded-full border border-gray-300 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-800 transition-colors hover:border-red-600 hover:text-red-600"
                  >
                    Show more stories
                  </button>

                  <span className="text-[9px] text-gray-400">
                    Showing {latestStories.length} of {filteredStories.length}
                  </span>
                </div>
              )}
            </div>

            {/* MAGAZINE */}

            <div>
              <SectionHeader title="Magazine" link="/magazine" />

              <Link
                to="/magazine"
                className="group block overflow-hidden rounded-md bg-black"
              >
                <div className="overflow-hidden">
                  <ImageWithFallback
                    src={magazinePreview.image}
                    alt={magazinePreview.title}
                    className="w-full h-[210px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-gray-500">
                    Pride Times Magazine
                  </span>

                  <h3 className="font-serif text-xl font-bold text-white mt-1">
                    {magazinePreview.title}
                  </h3>

                  <p className="text-[11px] text-gray-400 leading-[1.5] mt-1.5">
                    {magazinePreview.subtitle}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-white border-b border-white/50 pb-1 mt-4">
                    Read Digital Edition
                    <ArrowRight size={10} />
                  </span>
                </div>
              </Link>
            </div>
          </section>

          {/* =================================================
              SECTION BRIEFINGS (one card per digest section)
          ================================================= */}

          <section className="mb-12">
            <SectionHeader title="Global Corporate News Digest · Sections" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {digestSections.map((section) => (
                <div
                  key={section.slug}
                  className="flex flex-col rounded-md border border-gray-200 p-4 transition-colors hover:border-gray-300"
                >
                  <span className="font-serif text-2xl font-bold tabular-nums text-gray-200">
                    {String(section.number).padStart(2, "0")}
                  </span>

                  <h3 className="mt-1 text-[13px] font-bold leading-[1.3] text-gray-900">
                    {section.name}
                  </h3>

                  <p className="mt-1.5 text-[10px] leading-[1.5] text-gray-500 line-clamp-3">
                    {section.tagline}
                  </p>

                  {sectionHeadlines.get(section.number) && (
                    <Link
                      to={digestArticlePath(
                        sectionHeadlines.get(section.number)!
                      )}
                      className="group mt-3 block border-t border-gray-100 pt-3"
                    >
                      <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-red-600">
                        Top headline
                      </span>

                      <span className="mt-1 block font-serif text-[13px] font-bold leading-[1.3] text-gray-900 transition-colors group-hover:text-red-600 line-clamp-4">
                        {sectionHeadlines.get(section.number)!.title}
                      </span>

                      <span className="mt-1 block text-[10px] leading-[1.45] text-gray-500 line-clamp-2">
                        {sectionHeadlines.get(section.number)!.lede}
                      </span>
                    </Link>
                  )}

                  <ul className="mt-3 space-y-1 border-t border-gray-100 pt-3">
                    {section.glance.map((item) => (
                      <li
                        key={item.theme}
                        className="flex items-center justify-between gap-2 text-[9px]"
                      >
                        <span className="truncate text-gray-600">{item.theme}</span>
                        <span className="shrink-0 font-semibold text-red-600">
                          {item.momentum}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => openSectionFeed(section.name)}
                      className="text-[9px] font-bold uppercase tracking-wide text-gray-800 hover:text-red-600"
                    >
                      {sectionStoryCounts.get(section.number) ?? 0} stories
                    </button>

                    <Link
                      to={section.path}
                      className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-red-600"
                    >
                      Section
                      <ArrowRight size={9} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              REGIONAL SNAPSHOT (illustrative)
          ================================================= */}

          <section className="mb-12">
            <SectionHeader title="Regional Snapshot (Illustrative)" />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-[11px]">
                <thead>
                  <tr className="border-b border-gray-300 text-[9px] uppercase tracking-[0.14em] text-gray-500">
                    <th className="py-2 pr-4 font-bold">Region</th>
                    <th className="py-2 pr-4 font-bold">Deal value (US$ bn)</th>
                    <th className="py-2 pr-4 font-bold">Earnings growth</th>
                    <th className="py-2 font-bold">Hiring outlook</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {regionalSnapshot.map((row) => (
                    <tr key={row.region}>
                      <td className="py-2.5 pr-4 font-semibold text-gray-900">
                        {row.region}
                      </td>
                      <td className="py-2.5 pr-4 tabular-nums text-gray-700">
                        {row.dealValue}
                      </td>
                      <td className="py-2.5 pr-4 tabular-nums text-gray-700">
                        {row.earningsGrowth}
                      </td>
                      <td className="py-2.5 text-gray-700">{row.hiring}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-[9px] leading-[1.5] text-gray-400">
              Sample publication — all companies, people, quotations and
              figures are fictional and for layout and demonstration purposes
              only.
            </p>
          </section>

          {/* =================================================
              PRIDE TIMES 30
          ================================================= */}

          <section>
            <SectionHeader
              title="Industry Leaders Shaping the 2026 Transition"
              link="/billionaires"
              linkText="Full List"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prideTimes30.map((leader) => (
                <div
                  key={leader.rank}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
                >
                  <span className="font-serif text-2xl font-bold text-gray-200 tabular-nums shrink-0 w-8">
                    {String(leader.rank).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-gray-900">
                      {leader.name}
                      <span className="font-normal text-gray-400">
                        {" "}
                        · {leader.company}
                      </span>
                    </p>

                    <p className="text-[10px] text-gray-500 leading-[1.5] mt-1">
                      {leader.sector}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
            </div>
          </details>
        </main>
      </div>

      {/* =====================================================
          LOCAL PAGE UTILITIES
      ===================================================== */}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: rgba(227, 27, 35, 0.12);
          color: inherit;
        }
      `}</style>
    </div>
  );
}
