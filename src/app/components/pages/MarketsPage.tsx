import { NewsletterCTA } from "../NewsletterCTA";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getQuotes } from "../../../services/marketApi";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  octEditionArticles,
  octEditionGlance,
  octEditionMeta,
  octEditionArticlePath,
  type OctEditionArticle,
} from "../../data/octEditionData";

/* Builds /markets?tab=<Tab> links. */
const marketTabPath = (tab: string) => `/markets?tab=${encodeURIComponent(tab)}`;

/* =========================================================
   MARKETS NEWS — SOURCE
   Every story on this page comes from
   src/app/data/octEditionData.ts (Global Industry Edition).
========================================================= */

const MARKET_INDUSTRIES = [
  "Global Economy and Finance",
  "Energy",
  "AI and Cloud Infrastructure",
  "Corporate",
];

const marketStories: OctEditionArticle[] = octEditionArticles.filter(
  (article) => MARKET_INDUSTRIES.includes(article.industry)
);

/* Headline figures that relate to markets. */
const marketGlance = octEditionGlance.filter((item) =>
  /growth|inflation|oil|hyperscaler|nvidia/i.test(item.indicator)
);

const industryNames = Array.from(
  new Set(marketStories.map((article) => article.industry))
);
const latestNewsTabs = ["All", ...industryNames];

const PAGE_SIZE = 6;

/* Safe accessor: wraps around when the data set is short.
   Only called after the empty-state guard inside the component. */
const pickStory = (index: number): OctEditionArticle =>
  marketStories[index % marketStories.length];

type MarketItem = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

/* =========================================================
   SMALL UI PIECES (same as homepage)
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
}: {
  title: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between border-t-[3px] border-black pt-2">
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
        {title}
      </h2>

      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
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
              to={octEditionArticlePath(item)}
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
   MARKETS PAGE
========================================================= */

export function MarketsPage() {
  const [activeMarketTab, setActiveMarketTab] =
    useState<"Indices" | "Crypto">("Indices");
  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [marketSnapshotData, setMarketSnapshotData] = useState<
    Record<string, MarketItem[]>
  >({
    Indices: [],
    Crypto: [],
  });

  /* ---------- MARKET DATA ---------- */

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
    const interval = setInterval(loadMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- LATEST NEWS FILTERING ---------- */

  const filteredStories = useMemo(
    () =>
      activeNewsTab === "All"
        ? marketStories
        : marketStories.filter((article) => article.industry === activeNewsTab),
    [activeNewsTab]
  );

  const latestStories = filteredStories.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStories.length;

  const selectTab = (tab: string) => {
    setActiveNewsTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  /* ---------- EMPTY STATE ---------- */

  if (marketStories.length === 0) {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-[32px] font-extrabold text-gray-950">Markets</h1>
          <p className="mt-3 text-[14px] text-gray-500">
            No markets stories are available yet.
          </p>
        </div>
      </div>
    );
  }

  /* ---------- DERIVED STORY SLOTS (safe after guard) ---------- */

  const leadStory = pickStory(0);          // centre column
  const featureStory = pickStory(1);       // left column
  const interviewStory = pickStory(6);     // wide analysis row
  const interviewRelated = pickStory(7);
  const editorsPick = pickStory(8);
  const latestList = marketStories.slice(0, 6);

  const quotes = marketSnapshotData[activeMarketTab] || [];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 pt-4 md:pt-6">
          {/* =================================================
              1. TOP BAND — 3 columns
                 LEFT   : feature story + Related
                 CENTRE : lead story + Related
                 RIGHT  : Markets panel + Latest list
          ================================================= */}

          <section className="grid grid-cols-1 items-stretch gap-0 border border-gray-200 md:grid-cols-2 lg:grid-cols-12">
            {/* ---------- LEFT: feature story ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-4 lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link to={octEditionArticlePath(featureStory)} className="group block">
                <div className="overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={featureStory.image}
                    alt={featureStory.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <Kicker>{featureStory.industry}</Kicker>

                <h2 className="mt-2 line-clamp-3 text-[26px] font-extrabold leading-[1.12] text-gray-950 group-hover:underline md:text-[28px]">
                  {featureStory.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {featureStory.lede}
                </p>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={[pickStory(2), pickStory(3)]} />
              </div>
            </div>

            {/* ---------- CENTRE: lead story ---------- */}

            <div className="flex flex-col border-b border-gray-200 p-4 md:border-r lg:col-span-4 lg:border-b-0 lg:border-r">
              <Link to={octEditionArticlePath(leadStory)} className="group block">
                <div className="overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <Kicker>
                  {leadStory.industry} · {leadStory.location}
                </Kicker>

                <h1 className="mt-2 line-clamp-3 text-[24px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[26px]">
                  {leadStory.title}
                </h1>

                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-gray-600">
                  {leadStory.lede}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-2 text-[11px] text-gray-400">
                  <span>By {leadStory.author}</span>
                  <span>|</span>
                  <span>{leadStory.publishedAt}</span>
                  <span>|</span>
                  <span>{leadStory.readTime}</span>
                </div>
              </Link>

              <div className="mt-auto">
                <RelatedBox items={[pickStory(4), pickStory(5)]} />
              </div>
            </div>

            {/* ---------- RIGHT: markets panel + latest ---------- */}

            <aside className="flex flex-col p-4 md:col-span-2 lg:col-span-4">
              <div className="bg-black p-4 text-white">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <h3 className="text-[15px] font-extrabold">Markets</h3>

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

                {quotes.length === 0 && (
                  <p className="py-3 text-[12px] text-gray-400">
                    Loading live quotes…
                  </p>
                )}

                <div className="divide-y divide-white/10">
                  {quotes.slice(0, 6).map((market) => (
                    <div
                      key={market.symbol}
                      className="flex items-center justify-between py-2.5"
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
                  to={marketTabPath("Overview")}
                  className="mt-2 flex w-fit items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-white hover:underline"
                >
                  View all markets
                  <ArrowRight size={10} />
                </Link>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-baseline justify-between border-t-[3px] border-black pt-2">
                  <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
                    Latest
                  </h2>

                  <Link
                    to="/business-news"
                    className="text-[10px] font-bold uppercase tracking-wide text-red-600 hover:underline"
                  >
                    See all
                  </Link>
                </div>

                <ul className="divide-y divide-gray-200">
                  {latestList.map((story) => (
                    <li key={story.id}>
                      <Link
                        to={octEditionArticlePath(story)}
                        className="group flex items-start gap-3 py-2.5"
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

                <Link
                  to="/business-news"
                  className="mt-2 flex items-center justify-end gap-1 text-[12px] font-semibold text-gray-600 hover:underline"
                >
                  See all latest
                  <ChevronRight size={12} />
                </Link>
              </div>
            </aside>
          </section>

          {/* =================================================
              2. ANALYSIS ROW — image left, story right
          ================================================= */}

          <section className="grid grid-cols-1 items-stretch gap-0 border-x border-b border-gray-200 lg:grid-cols-12">
            <Link
              to={octEditionArticlePath(interviewStory)}
              className="group block overflow-hidden bg-gray-100 lg:col-span-6"
            >
              <ImageWithFallback
                src={interviewStory.image}
                alt={interviewStory.title}
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </Link>

            <div className="flex flex-col justify-center p-5 lg:col-span-6 lg:p-8">
              <Kicker>{interviewStory.industry}</Kicker>

              <Link
                to={octEditionArticlePath(interviewStory)}
                className="group block"
              >
                <h2 className="mt-2 line-clamp-3 text-[28px] font-extrabold leading-[1.15] text-gray-950 group-hover:underline md:text-[32px]">
                  {interviewStory.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-gray-600">
                  {interviewStory.lede}
                </p>
              </Link>

              <div className="mt-5 border-t border-gray-200 pt-4">
                <Link
                  to={octEditionArticlePath(interviewRelated)}
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
              3. EDITOR'S PICK + NUMBERS AT A GLANCE
          ================================================= */}

          <section className="mt-12 mb-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeader
                title="Editor's Pick"
                link={editorsPick.sectionPath}
                linkText="Explore More"
              />

              <Link
                to={octEditionArticlePath(editorsPick)}
                className="group grid grid-cols-1 items-start gap-5 sm:grid-cols-2"
              >
                <div className="overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={editorsPick.image}
                    alt={editorsPick.title}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div>
                  <Kicker>{editorsPick.industry}</Kicker>

                  <h3 className="mt-1.5 line-clamp-3 text-[20px] font-bold leading-[1.22] text-gray-950 group-hover:underline">
                    {editorsPick.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-[13px] leading-[1.5] text-gray-500">
                    {editorsPick.lede}
                  </p>
                </div>
              </Link>
            </div>

            {marketGlance.length > 0 && (
              <div className="lg:col-span-5">
                <SectionHeader title="Numbers at a Glance" />

                <ul className="divide-y divide-gray-200">
                  {marketGlance.map((item) => (
                    <li
                      key={item.indicator}
                      className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[1fr_auto]"
                    >
                      <div>
                        <p className="text-[13px] font-bold leading-[1.3] text-gray-950">
                          {item.indicator}
                        </p>
                        <p className="mt-0.5 text-[11px] text-gray-400">
                          {item.source}
                        </p>
                      </div>

                      <p className="text-[14px] font-extrabold tabular-nums text-red-600 sm:text-right">
                        {item.figure}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* =================================================
              ADVERTISEMENT
          ================================================= */}

          <PrideTimesAd variant="first" className="my-8" />

          {/* =================================================
              4. LATEST MARKETS NEWS — card grid with filters
          ================================================= */}

          <section className="mb-12">
            <SectionHeader
              title={`Latest Markets News · ${octEditionMeta.edition} · ${octEditionMeta.date}`}
            />

            <p className="-mt-1 mb-5 text-[12px] leading-[1.5] text-gray-500">
              Markets coverage: the global economy and inflation, energy and oil
              prices, AI spending and funding, and deals.
            </p>

            <div className="no-scrollbar mb-6 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
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

            {latestStories.length === 0 ? (
              <p className="py-6 text-[12px] text-gray-400">
                No stories in this category yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {latestStories.map((story) => (
                  <Link
                    key={story.id}
                    to={octEditionArticlePath(story)}
                    className="group flex h-full flex-col"
                  >
                    <div className="overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-2.5 flex flex-1 flex-col">
                      <Kicker>{story.industry}</Kicker>

                      <h3 className="mt-1 line-clamp-2 min-h-[2.56em] text-[17px] font-bold leading-[1.25] text-gray-950 group-hover:underline">
                        {story.title}
                      </h3>

                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.5] text-gray-500">
                        {story.lede}
                      </p>

                      <div className="mt-auto flex flex-wrap items-center gap-x-2 pt-2 text-[11px] text-gray-400">
                        <TimeStamp>{story.publishedAt}</TimeStamp>
                        <span>·</span>
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="mt-8 flex flex-col items-center gap-2 border-t border-gray-200 pt-5">
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

            <p className="mt-8 border-t border-gray-200 pt-4 text-[11px] leading-[1.5] text-gray-400">
              {leadStory.editorNote}
            </p>
          </section>

          {/* =================================================
              SECOND ADVERTISEMENT
          ================================================= */}

          <PrideTimesAd variant="second" className="my-8" />

          {/* =================================================
              NEWSLETTER CTA
          ================================================= */}

          <NewsletterCTA
            title="Stay Ahead with The Pride Times"
            description="Daily briefings on Markets delivered to your inbox."
            newsletterKey="markets-morning"
          />
        </main>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default MarketsPage;
