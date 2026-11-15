import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import MagazineImg from "../../../imports/pt30image.png";

import { getQuotes } from "../../../services/marketApi";
import {
  digestArticles,
  digestArticlePath,
  digestSections,
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
  globalSectorItemArticleId,
} from "../../data/globalSectorReportData";
import {
  octEditionArticles,
  type OctEditionArticle,
} from "../../data/octEditionData";
import { oct13EditionArticles } from "../../data/oct13EditionData";
import { techLaunchArticles } from "../../data/techLaunchReport16OctData";

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
   Kept exported because other pages import this component.
   It is no longer rendered on the homepage.
========================================================= */

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function PrideTimesAd() {
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
      className="my-8 overflow-hidden border-y border-gray-200 bg-white py-4"
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
   DATA (unchanged logic)
========================================================= */

/* ---------- Image allocation: no image appears twice on the page ----------
   1. The Mergers & Acquisitions images are reserved first (that section is fixed).
   2. The top band, newsletter, trending and related slots claim stories in order.
   3. Section modules claim from the remaining digest stories.
   4. The latest feed uses whatever is left.                                      */

const claimedImages = new Set<string>();

maEdition1Articles.forEach((article) => claimedImages.add(article.image));

function claimStories<T extends { image: string }>(
  pool: T[],
  count: number,
  allowRepeat = true
): T[] {
  const out: T[] = [];

  for (const story of pool) {
    if (out.length === count) break;
    if (claimedImages.has(story.image)) continue;
    claimedImages.add(story.image);
    out.push(story);
  }

  // Only used where a repeat is acceptable, so the page never crashes.
  while (allowRepeat && out.length < count && pool.length > 0) {
    out.push(pool[out.length % pool.length]);
  }

  return out;
}

const octoberStories: OctEditionArticle[] = [
  ...techLaunchArticles,
  ...oct13EditionArticles,
  ...octEditionArticles,
];

const [featureStory, leadStory] = claimStories(octoberStories, 2);
const relatedFeature = claimStories(octoberStories, 2);
const relatedLead = claimStories(octoberStories, 2);
const todaysNews = claimStories(octoberStories, 3);
const latestList = claimStories(octoberStories, 6);
const [interviewStory, interviewRelated] = claimStories(octoberStories, 2);
const trendingStrip = claimStories(octoberStories, 4);
const [editorsPick] = claimStories(octoberStories, 1);

/* Newsletter strip: six different stories, three shown at a time.
   The arrows step through them. */
const newsletterLabels = [
  "Magazine",
  "Markets",
  "Editor's Pick",
  "Trending Now",
  "Latest",
  "Today's News",
];
const newsletterStories = claimStories(octoberStories, newsletterLabels.length);

const newsletterPromos = newsletterLabels.map((label, i) => {
  const story = newsletterStories[i];

  return {
    label,
    headline: story.title,
    image: story.image,
    to: label === "Magazine" ? "/magazine" : digestArticlePath(story),
  };
});

const PROMO_VISIBLE = 3;

const PAGE_SIZE = 8;

/* ---------- Edition 1: Mergers & Acquisitions ---------- */

const editionBy = (prefix: string): EditionArticle | undefined =>
  maEdition1Articles.find((article) => article.title.startsWith(prefix));

const editionLead = maEdition1Articles[0];

const editionIndustries = maEdition1IndustryOrder
  .map((name) => ({
    name,
    stories: maEdition1Articles.filter(
      (article) =>
        article.industry === name && article.id !== editionLead.id
    ),
  }))
  .filter((group) => group.stories.length > 0);

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

/* Stories shown as headline-only rows (no image), so no image repeats. */
const textOnlyIds = new Set<string>();

const sectionModules = digestSections
  .slice(0, 4)
  .map((section) => {
    const pool = digestArticles.filter(
      (article) => article.sectionNumber === section.number
    );
    const [lead, ...rest] = claimStories(pool, 4, false);

    const extras = pool
      .filter(
        (article) =>
          article.id !== lead?.id &&
          !rest.some((item) => item.id === article.id)
      )
      .slice(0, Math.max(0, 3 - rest.length));

    extras.forEach((article) => textOnlyIds.add(article.id));

    return { section, lead, rest: [...rest, ...extras] };
  })
  .filter((module) => Boolean(module.lead));

/* Latest feed: unused digest stories (with image), then headline-only stories. */
const feedStories: DigestArticle[] = digestArticles.filter(
  (article) => !claimedImages.has(article.image)
);

const feedExtras: DigestArticle[] = digestArticles
  .filter(
    (article) =>
      !feedStories.some((item) => item.id === article.id) &&
      !maEdition1Articles.some((item) => item.id === article.id)
  )
  .slice(0, 16);

feedExtras.forEach((article) => textOnlyIds.add(article.id));

const feedAll: DigestArticle[] = [...feedStories, ...feedExtras];

const latestNewsTabs = [
  "All",
  ...Array.from(new Set(feedAll.map((article) => article.section))),
];

function editionDealChip(article: EditionArticle) {
  return article.keyFacts.find((fact) =>
    ["Enterprise value", "Combined enterprise value", "Value"].includes(
      fact.label
    )
  );
}

/* ---------- Magazine ---------- */

const magazinePreview = {
  title: "The 2026 Global Industry Outlook",
  subtitle:
    "Energy security, AI infrastructure, supply-chain resilience and the forces reshaping global business.",
  image: MagazineImg,
};

/* ---------- Pride Times 30 ---------- */

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
   SMALL UI PIECES
   Layout rules used on this page:
   - Top band: three columns. Left and centre are story cards
     (image, bold headline, dek, "Related" box). Right is a
     Today's News list above a Latest list with All / Your News tabs.
   - Below: a wide interview row with an image and headline.
   - Headlines are bold sans-serif, left-aligned, clamped to fixed lines.
   - Red is used only for category labels and the section title.
   - Thin grey rules separate items; no boxes except the Related panel.
========================================================= */

function ChangeChip({ change, up }: { change: string; up: boolean }) {
  return (
    <span
      className={`flex items-center gap-1 text-[11px] font-semibold tabular-nums ${
        up ? "text-emerald-500" : "text-red-500"
      }`}
    >
      {up ? (
        <TrendingUp size={11} strokeWidth={2.25} />
      ) : (
        <TrendingDown size={11} strokeWidth={2.25} />
      )}
      {change}
    </span>
  );
}

function SectionHeader({
  title,
  link,
  linkText = "View All",
  onClick,
}: {
  title: string;
  link?: string;
  linkText?: string;
  onClick?: () => void;
}) {
  const linkClass =
    "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline";

  return (
    <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
        {title}
      </h2>

      {onClick ? (
        <button type="button" onClick={onClick} className={linkClass}>
          {linkText}
          <ArrowRight size={10} />
        </button>
      ) : (
        link && (
          <Link to={link} className={linkClass}>
            {linkText}
            <ArrowRight size={10} />
          </Link>
        )
      )}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-red-600">
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

/* Related box used under feature stories */

function RelatedBox({ items }: { items: OctEditionArticle[] }) {
  return (
    <div className="mt-4 border border-gray-200">
      <div className="border-b border-gray-200 px-3 py-1.5 text-[11px] text-gray-500">
        Related
      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={digestArticlePath(item)}
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
   HOME PAGE
========================================================= */

export function HomePage() {
  const [activeMarketTab, setActiveMarketTab] =
    useState<"Indices" | "Crypto">("Indices");

  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [activeLatestTab, setActiveLatestTab] =
    useState<"All" | "Your News">("All");

  const [promoStart, setPromoStart] = useState(0);

  const visiblePromos = Array.from(
    { length: PROMO_VISIBLE },
    (_, i) => newsletterPromos[(promoStart + i) % newsletterPromos.length]
  );

  const showPrevPromo = () =>
    setPromoStart(
      (start) => (start - 1 + newsletterPromos.length) % newsletterPromos.length
    );

  const showNextPromo = () =>
    setPromoStart((start) => (start + 1) % newsletterPromos.length);

  const newsListRef = useRef<HTMLDivElement | null>(null);

  const [marketSnapshotData, setMarketSnapshotData] = useState<
    Record<string, MarketItem[]>
  >({
    Indices: [],
    Crypto: [],
  });

  /* ---------- Market data ---------- */

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

  /* ---------- Latest news filtering ---------- */

  const filteredStories = useMemo(
    () =>
      activeNewsTab === "All"
        ? feedAll
        : feedAll.filter((article) => article.section === activeNewsTab),
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

  const scrollToLatestFeed = () => {
    selectTab("All");

    window.requestAnimationFrame(() => {
      newsListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const marketRows = marketSnapshotData[activeMarketTab] || [];

  const yourNewsList = feedStories.slice(0, 6);
  const currentLatest =
    activeLatestTab === "All" ? latestList : yourNewsList;


  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="w-full px-4 md:px-6 xl:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* =================================================
              0. NEWSLETTER STRIP
          ================================================= */}

          <div className="mb-5 flex items-stretch gap-6 border-y border-gray-200 py-3">
            <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 md:grid-cols-3">
              {visiblePromos.map((promo) => (
                <Link
                  key={promo.label}
                  to={promo.to}
                  className="group flex items-center gap-3"
                >
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <ImageWithFallback
                      src={promo.image}
                      alt={promo.label}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[12px] text-gray-500">
                      {promo.label}
                    </p>
                    <p className="line-clamp-1 text-[13px] font-semibold text-gray-950 group-hover:underline">
                      {promo.headline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 pl-2">
              <button
                type="button"
                aria-label="Show previous stories"
                onClick={showPrevPromo}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-black hover:text-black"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Show next stories"
                onClick={showNextPromo}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-black hover:text-black"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* =================================================
              1. TOP BAND — 3 columns
                 LEFT   : feature story + Related
                 CENTRE : lead story + Related
                 RIGHT  : Today's News + Latest list
          ================================================= */}

          <section className="grid grid-cols-1 items-stretch gap-0 border border-gray-200 md:grid-cols-2 lg:grid-cols-12">
            {/* ---------- LEFT: feature story ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-6 lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link to={digestArticlePath(featureStory)} className="group block">
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={featureStory.image}
                    alt={featureStory.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <h2 className="mt-5 line-clamp-3 text-[26px] font-extrabold leading-[1.12] text-gray-950 group-hover:underline md:text-[28px]">
                  {featureStory.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {featureStory.lede}
                </p>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={relatedFeature} />
              </div>
            </div>

            {/* ---------- CENTRE: lead story ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-6 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link to={digestArticlePath(leadStory)} className="group block">
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <h1 className="mt-5 line-clamp-3 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[26px]">
                  {leadStory.title}
                </h1>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {leadStory.lede}
                </p>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={relatedLead} />
              </div>
            </div>

            {/* ---------- RIGHT: today's news + latest ---------- */}

            <aside className="flex flex-col p-6 md:col-span-2 lg:col-span-4">
              {/* Today's News */}

              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-extrabold text-gray-950">
                  Today's News
                </h2>

                <button
                  type="button"
                  onClick={scrollToLatestFeed}
                  className="border border-gray-300 px-3 py-1 text-[11px] font-semibold text-gray-700 hover:border-black hover:text-black"
                >
                  Explore More
                </button>
              </div>

              <ul className="mt-4 divide-y divide-gray-200">
                {todaysNews.map((story) => (
                  <li key={story.id}>
                    <Link
                      to={digestArticlePath(story)}
                      className="group flex items-start gap-3 py-4"
                    >
                      <div className="h-[64px] w-[96px] shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <Kicker>{story.section}</Kicker>
                        <p className="mt-1 line-clamp-2 text-[14px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                          {story.title}
                        </p>
                        <div className="mt-1">
                          <TimeStamp>{story.publishedAt}</TimeStamp>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Latest */}

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-[20px] font-bold text-red-600">
                    Latest
                  </h2>

                  <div className="flex gap-1.5">
                    {(["All", "Your News"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveLatestTab(tab)}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                          activeLatestTab === tab
                            ? "bg-black text-white"
                            : "border border-gray-300 text-gray-700 hover:border-black"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <ul className="mt-4 divide-y divide-gray-200">
                  {currentLatest.map((story) => (
                    <li key={story.id}>
                      <Link
                        to={digestArticlePath(story)}
                        className="group flex items-start gap-3 py-3.5"
                      >
                        <span className="w-14 shrink-0 pt-0.5 text-[11px] font-semibold text-red-600">
                          {story.publishedAt}
                        </span>

                        <span className="text-[14px] font-semibold leading-[1.3] text-gray-950 group-hover:underline line-clamp-2">
                          {story.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={scrollToLatestFeed}
                  className="mt-2 flex w-full items-center justify-end gap-1 text-[12px] font-semibold text-gray-600 hover:underline"
                >
                  See all latest
                  <ChevronRight size={12} />
                </button>
              </div>
            </aside>
          </section>

          {/* =================================================
              2. WEEKEND INTERVIEW — image left, story right
          ================================================= */}

          <section className="mt-0 grid grid-cols-1 items-stretch gap-0 border-x border-b border-gray-200 lg:grid-cols-12">
            <Link
              to={digestArticlePath(interviewStory)}
              className="group block overflow-hidden bg-gray-100 lg:col-span-6"
            >
              <ImageWithFallback
                src={interviewStory.image}
                alt={interviewStory.title}
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </Link>

            <div className="flex flex-col justify-center p-6 lg:col-span-6 lg:p-12">
              <Kicker>{interviewStory.section}</Kicker>

              <Link to={digestArticlePath(interviewStory)} className="group block">
                <h2 className="mt-2 line-clamp-3 text-[28px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[32px]">
                  {interviewStory.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-gray-600">
                  {interviewStory.lede}
                </p>
              </Link>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <Link
                  to={digestArticlePath(interviewRelated)}
                  className="group block"
                >
                  <span className="block text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline line-clamp-2">
                    {interviewRelated.title}
                  </span>
                </Link>
              </div>
            </div>
          </section>

          {/* =================================================
              3. TRENDING NOW — 4 image cards
          ================================================= */}

          <section className="mt-16 mb-16">
            <SectionHeader title="Trending Now" link="/business-news" />

            <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {trendingStrip.map((story) => (
                <Link
                  key={story.id}
                  to={digestArticlePath(story)}
                  className="group flex h-full flex-col"
                >
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-2.5 flex flex-1 flex-col">
                    <Kicker>{story.section}</Kicker>

                    <h3 className="mt-1 line-clamp-2 min-h-[2.56em] text-[16px] font-bold leading-[1.28] text-gray-950 group-hover:underline">
                      {story.title}
                    </h3>

                    <div className="mt-auto pt-1.5">
                      <TimeStamp>{story.publishedAt}</TimeStamp>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* =================================================
              4. SECTION MODULES — one large story left,
                 stacked thumbnail rows right (one per section)
          ================================================= */}

          {sectionModules.map(({ section, lead, rest }) => (
            <section key={section.slug} className="mb-16">
              <SectionHeader
                title={section.name}
                link={section.path}
                linkText={`${sectionStoryCounts.get(section.number) ?? 0} stories`}
              />

              <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
                <Link
                  to={digestArticlePath(lead)}
                  className="group flex h-full flex-col lg:col-span-7"
                >
                  <div className="overflow-hidden rounded-md bg-gray-100">
                    <ImageWithFallback
                      src={lead.image}
                      alt={lead.title}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-3">
                    <h3 className="line-clamp-2 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[28px]">
                      {lead.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-[14px] leading-[1.5] text-gray-500">
                      {lead.lede}
                    </p>

                    <div className="mt-2">
                      <TimeStamp>{lead.publishedAt}</TimeStamp>
                    </div>
                  </div>
                </Link>

                <div className="flex flex-col justify-center lg:col-span-5">
                  {rest.length === 0 ? (
                    <p className="text-[12px] text-gray-400">
                      More stories coming soon.
                    </p>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {rest.map((story) => (
                        <li key={story.id}>
                          <Link
                            to={digestArticlePath(story)}
                            className="group flex items-start gap-5 py-6"
                          >
                            {!textOnlyIds.has(story.id) && (
                              <div className="h-[72px] w-[104px] shrink-0 overflow-hidden rounded-md bg-gray-100">
                                <ImageWithFallback
                                  src={story.image}
                                  alt={story.title}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <h4 className="line-clamp-2 text-[16px] font-bold leading-[1.28] text-gray-950 group-hover:underline">
                                {story.title}
                              </h4>

                              <div className="mt-1.5">
                                <TimeStamp>{story.publishedAt}</TimeStamp>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          ))}

          {/* =================================================
              5. LATEST NEWS FEED + MAGAZINE
          ================================================= */}

          <section aria-label="Latest news" className="mb-16">
            <SectionHeader
              title="Latest News · 16 October 2026"
              onClick={scrollToLatestFeed}
              linkText="See all"
            />

            <ol className="grid grid-cols-1 items-stretch gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {techLaunchArticles.map((story, index) => (
                <li key={story.id} className="border-b border-gray-200">
                  <Link
                    to={digestArticlePath(story)}
                    className="group flex h-full gap-4 py-5"
                  >
                    <span className="w-6 shrink-0 text-[22px] font-extrabold leading-none tabular-nums text-gray-300">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <Kicker>
                        {story.industry} · {story.location}
                      </Kicker>

                      <span className="mt-1 line-clamp-2 block text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline">
                        {story.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.9fr_0.7fr]">
              <div ref={newsListRef} className="scroll-mt-24 min-w-0">
                <SectionHeader title="More Latest News" />

                <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
                  {latestNewsTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => selectTab(tab)}
                      className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-wide transition-colors ${
                        activeNewsTab === tab
                          ? "border-b-2 border-black pb-1 text-black"
                          : "pb-1 text-gray-400 hover:text-gray-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="divide-y divide-gray-200">
                  {latestStories.length === 0 && (
                    <p className="py-6 text-[12px] text-gray-400">
                      No stories in this category yet.
                    </p>
                  )}

                  {latestStories.map((story) => (
                    <Link
                      key={story.id}
                      to={digestArticlePath(story)}
                      className={`group items-start gap-4 py-7 sm:gap-6 ${
                        textOnlyIds.has(story.id)
                          ? "block"
                          : "grid grid-cols-[110px_1fr] sm:grid-cols-[200px_1fr]"
                      }`}
                    >
                      {!textOnlyIds.has(story.id) && (
                        <div className="h-[80px] w-full overflow-hidden bg-gray-100 sm:h-[126px]">
                          <ImageWithFallback
                            src={story.image}
                            alt={story.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">
                            {"industry" in story
                              ? (story as EditionArticle).industry
                              : story.section}
                          </span>

                          <span className="text-[10px] text-gray-300">•</span>

                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                            <MapPin size={9} />
                            {story.location}
                          </span>
                        </div>

                        <h3 className="mt-1 line-clamp-2 text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline sm:text-[21px]">
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

                {hasMore && (
                  <div className="mt-5 flex flex-col items-center gap-2 border-t border-gray-200 pt-5">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount((count) =>
                          Math.min(count + PAGE_SIZE, filteredStories.length)
                        )
                      }
                      className="border border-black px-6 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-black hover:text-white"
                    >
                      Show more stories
                    </button>

                    <span className="text-[10px] text-gray-400">
                      Showing {latestStories.length} of {filteredStories.length}
                    </span>
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="lg:sticky lg:top-24 lg:pt-1">
                  <SectionHeader title="Magazine" link="/magazine" />

                  <Link
                    to="/magazine"
                    className="group block overflow-hidden rounded-md bg-black"
                  >
                    <div className="overflow-hidden rounded-md">
                      <ImageWithFallback
                        src={magazinePreview.image}
                        alt={magazinePreview.title}
                        className="h-[210px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="p-4">
                      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-500">
                        Pride Times Magazine
                      </span>

                      <h3 className="mt-1 line-clamp-2 text-[20px] font-extrabold leading-[1.2] text-white">
                        {magazinePreview.title}
                      </h3>

                      <p className="mt-1.5 text-[12px] leading-[1.5] text-gray-400">
                        {magazinePreview.subtitle}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1.5 border-b border-white/50 pb-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        Read Digital Edition
                        <ArrowRight size={10} />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              6. MARKETS + EDITOR'S PICK
          ================================================= */}

          <section className="mb-16 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            <div className="bg-black p-6 text-white lg:col-span-5">
              <div className="flex items-center justify-between border-b border-white/20 pb-2">
                <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em]">
                  Markets
                </h2>

                <div className="flex gap-3">
                  {(["Indices", "Crypto"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveMarketTab(tab)}
                      className={`text-[10px] font-semibold uppercase tracking-wide ${
                        activeMarketTab === tab
                          ? "text-white underline underline-offset-4"
                          : "text-gray-500 hover:text-gray-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-white/10">
                {marketRows.length === 0
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3.5"
                      >
                        <span className="h-3 w-20 animate-pulse rounded bg-white/10" />
                        <span className="h-3 w-24 animate-pulse rounded bg-white/10" />
                      </div>
                    ))
                  : marketRows.slice(0, 6).map((market) => (
                      <div
                        key={market.symbol}
                        className="flex items-center justify-between py-3.5"
                      >
                        <span className="text-[12px] font-semibold text-gray-100">
                          {market.symbol}
                        </span>

                        <div className="flex items-center gap-3">
                          <span className="text-[12px] tabular-nums text-gray-300">
                            {market.value}
                          </span>

                          <ChangeChip change={market.change} up={market.up} />
                        </div>
                      </div>
                    ))}
              </div>

              <Link
                to="/markets"
                className="mt-2 flex w-fit items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-white hover:underline"
              >
                View all markets
                <ArrowRight size={10} />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <SectionHeader
                title="Editor's Pick"
                link={editorsPick.sectionPath}
                linkText="Explore more"
              />

              <Link
                to={digestArticlePath(editorsPick)}
                className="group grid grid-cols-1 items-start gap-8 sm:grid-cols-2"
              >
                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={editorsPick.image}
                    alt={editorsPick.title}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div>
                  <Kicker>{editorsPick.section}</Kicker>

                  <h3 className="mt-1.5 line-clamp-3 text-[20px] font-bold leading-[1.22] text-gray-950 group-hover:underline">
                    {editorsPick.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-[13px] leading-[1.5] text-gray-500">
                    {editorsPick.lede}
                  </p>
                </div>
              </Link>
            </div>
          </section>

          {/* =================================================
              7. PREVIOUS COVERAGE
          ================================================= */}

          <section
            id={globalSectorAnchorId}
            aria-label="Global Sector News Report 2026"
            className="mb-16 scroll-mt-24"
          >
            <SectionHeader title={globalSectorReport.kicker} />

            <p className="-mt-1 mb-5 text-[12px] leading-[1.5] text-gray-500">
              {globalSectorReport.subheadline}
            </p>

            <div className="grid grid-cols-1 items-stretch gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
              {globalSectorItems.map((item) => (
                <Link
                  key={item.sector}
                  to={`/article/${globalSectorItemArticleId(item)}`}
                  className="group flex h-full flex-col border-b border-gray-200 py-6"
                >
                  <Kicker>{item.sector}</Kicker>

                  <h4 className="mt-1 line-clamp-2 min-h-[2.5em] text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                    {item.headline}
                  </h4>

                  <p className="mt-1.5 text-[12px] leading-[1.5] text-gray-500 line-clamp-2">
                    {item.verdict}. {item.signal}.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section
            aria-label="Global Corporate News Digest Edition 1: Mergers and Acquisitions"
            className="mb-16"
          >
            <SectionHeader
              title={`Global Corporate News Digest · ${maEdition1Meta.edition}`}
              link="/mergers-acquisitions"
              linkText="M&A Hub"
            />

            <p className="-mt-1 mb-5 text-[12px] leading-[1.5] text-gray-500">
              {maEdition1Meta.subtitle}{" "}
              <span className="text-gray-400">
                {maEdition1Meta.prepared}. {maEdition1Meta.note}
              </span>
            </p>

            <Link
              to={maEdition1ArticlePath(editionLead)}
              className="group relative block min-h-[220px] overflow-hidden rounded-md bg-black"
            >
              <ImageWithFallback
                src={editionLead.image}
                alt={editionLead.title}
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-400">
                  {editionLead.section} · {maEdition1Meta.edition}
                </span>

                <h3 className="mt-2 line-clamp-3 max-w-3xl text-2xl font-extrabold leading-[1.15] text-white group-hover:underline sm:text-[30px]">
                  {editionLead.title}
                </h3>

                <p className="mt-2 max-w-3xl text-[13px] leading-[1.5] text-gray-300 line-clamp-2">
                  {editionLead.lede}
                </p>
              </div>
            </Link>

            <div className="mt-10 space-y-12">
              {editionIndustries.map((group) => (
                <div key={group.name}>
                  <div className="mb-4 flex items-baseline justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-gray-950">
                      {group.name}
                    </h3>

                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      {group.stories.length} stories
                    </span>
                  </div>

                  <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {group.stories.map((story) => {
                      const chip = editionDealChip(story);

                      return (
                        <Link
                          key={story.id}
                          to={maEdition1ArticlePath(story)}
                          className="group flex h-full flex-col"
                        >
                          <div className="aspect-[16/10] w-full overflow-hidden rounded-md bg-gray-100">
                            <ImageWithFallback
                              src={story.image}
                              alt={story.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="flex flex-1 flex-col">
                            <span className="mt-2.5 block min-h-[1.2em] text-[11px] font-bold uppercase tracking-[0.1em] text-red-600">
                              {chip ? chip.value : ""}
                            </span>

                            <h4 className="mt-1 line-clamp-2 min-h-[2.5em] text-[16px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                              {story.title}
                            </h4>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <details className="mt-8 border border-gray-300">
              <summary className="cursor-pointer select-none px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-900">
                Deal status table (as of the early August 2026 tracker update)
              </summary>

              <div className="overflow-x-auto border-t border-gray-200">
                <table className="w-full min-w-[560px] text-left text-[12px]">
                  <thead className="bg-gray-50 text-[10px] uppercase tracking-wide text-gray-500">
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

              <p className="border-t border-gray-200 px-4 py-3 text-[11px] leading-[1.5] text-gray-400">
                {maEdition1Sources}
              </p>
            </details>
          </section>

          <section className="mb-16">
            <SectionHeader title="Browse by Section" />

            <div className="grid grid-cols-1 items-stretch gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
              {digestSections.map((section) => {
                const top = sectionHeadlines.get(section.number);

                return (
                  <div
                    key={section.slug}
                    className="flex h-full flex-col border-b border-gray-200 py-6"
                  >
                    <Link
                      to={section.path}
                      className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-gray-950 hover:underline"
                    >
                      {section.name}
                    </Link>

                    {top && (
                      <Link
                        to={digestArticlePath(top)}
                        className="group mt-2 block"
                      >
                        <span className="block min-h-[5.2em] text-[15px] font-bold leading-[1.3] text-gray-950 group-hover:underline line-clamp-4">
                          {top.title}
                        </span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => openSectionFeed(section.name)}
                      className="mt-auto w-fit pt-3 text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
                    >
                      {sectionStoryCounts.get(section.number) ?? 0} stories
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <SectionHeader
              title="Industry Leaders Shaping the 2026 Transition"
              link="/billionaires"
              linkText="Full List"
            />

            <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              {prideTimes30.map((leader) => (
                <div
                  key={leader.rank}
                  className="flex items-start gap-5 border-b border-gray-200 py-6"
                >
                  <span className="w-8 shrink-0 text-[22px] font-extrabold leading-none tabular-nums text-gray-300">
                    {String(leader.rank).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-gray-950">
                      {leader.name}
                      <span className="font-normal text-gray-400">
                        {" "}
                        · {leader.company}
                      </span>
                    </p>

                    <p className="mt-1 text-[11px] leading-[1.5] text-gray-500 line-clamp-2">
                      {leader.sector}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(227, 27, 35, 0.12); color: inherit; }
      `}</style>
    </div>
  );
}
