import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  Clock,
  Coins,
  Cpu,
  Lightbulb,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { NewsletterCTA } from "../NewsletterCTA";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AdvertisementSlot } from "../innovation/AdvertisementSlot";
import {
  defaultFeaturedInnovation,
  defaultTopInnovationStories,
  defaultMarketSnapshot,
  defaultInnovationMetrics,
  defaultLatestInnovationNews,
  type InnovationMetric,
  type InnovationStory,
  type MarketIndexItem,
} from "../../data/innovationData";

const MARKET_TABS = ["Indices", "Commodities", "Crypto"] as const;
type MarketTab = (typeof MARKET_TABS)[number];

const METRIC_ICONS: Record<InnovationMetric["iconType"], LucideIcon> = {
  capex: Coins,
  revenue: BarChart3,
  exports: Cpu,
  funding: Lightbulb,
};

const storyHref = (story: { id: string; url?: string }) =>
  story.url || `/article/${story.id}`;

const isNegative = (value: string) => value.trim().startsWith("-");

/* ---------- Small presentational pieces ---------- */

function SectionHeading({
  title,
  linkTo,
  linkLabel,
}: {
  title: string;
  linkTo?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-b-2 border-gray-950 pb-2.5 mb-6">
      <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-gray-950 leading-none">
        {title}
      </h2>
      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-red-600 hover:text-red-700 transition-colors whitespace-nowrap"
        >
          <span>{linkLabel}</span>
          <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}

function CategoryTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[10.5px] font-bold uppercase tracking-[0.14em] text-red-600">
      {children}
    </span>
  );
}

function Sparkline({ points, up }: { points: number[]; up: boolean }) {
  if (!points || points.length < 2) return null;

  const width = 100;
  const height = 32;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="w-full h-8"
      aria-hidden="true"
    >
      <polyline
        points={coords}
        fill="none"
        stroke={up ? "#16a34a" : "#dc2626"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function StoryCard({ story }: { story: InnovationStory }) {
  const label = story.location
    ? `${story.category} · ${story.location}`
    : story.category;

  return (
    <article className="group flex flex-col">
      <Link
        to={storyHref(story)}
        className="block overflow-hidden rounded-md bg-gray-100 aspect-[16/10]"
      >
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-1 pt-4">
        <CategoryTag>{label}</CategoryTag>
        <Link to={storyHref(story)} className="block mt-2">
          <h3 className="font-serif text-[19px] sm:text-[20px] font-bold leading-[1.22] text-gray-950 group-hover:text-red-600 transition-colors line-clamp-3">
            {story.title}
          </h3>
        </Link>
        {story.summary && (
          <p className="mt-2 text-[14px] leading-[1.55] text-gray-600 line-clamp-3">
            {story.summary}
          </p>
        )}
        <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[12px] text-gray-400">
          <Clock size={12} />
          {story.publishedAt} · {story.readTime}
        </span>
      </div>
    </article>
  );
}

function LatestItem({ story }: { story: InnovationStory }) {
  return (
    <article className="group flex gap-4 py-4 border-b border-gray-200 last:border-b-0">
      <Link
        to={storyHref(story)}
        className="shrink-0 w-[104px] h-[72px] sm:w-[120px] sm:h-[80px] overflow-hidden rounded-md bg-gray-100"
      >
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <CategoryTag>{story.category}</CategoryTag>
        <Link to={storyHref(story)} className="block mt-1">
          <h3 className="font-serif text-[15px] sm:text-[16px] font-bold leading-[1.3] text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2">
            {story.title}
          </h3>
        </Link>
        <span className="mt-1.5 inline-flex items-center gap-1 text-[12px] text-gray-400">
          <Clock size={11} />
          {story.publishedAt} · {story.readTime}
        </span>
      </div>
    </article>
  );
}

function MarketTile({ item }: { item: MarketIndexItem }) {
  const Trend = item.up ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 flex flex-col">
      <span
        className="text-[11px] font-bold uppercase tracking-wider text-gray-500 truncate"
        title={item.symbol}
      >
        {item.symbol}
      </span>
      <span className="mt-1 font-serif text-[20px] font-bold text-gray-950 tabular-nums">
        {item.value}
      </span>
      <span
        className={`mt-0.5 inline-flex items-center gap-1 text-[12.5px] font-semibold tabular-nums ${
          item.up ? "text-green-600" : "text-red-600"
        }`}
      >
        <Trend size={12} strokeWidth={2.5} />
        {item.change}
      </span>
      <div className="mt-3">
        <Sparkline points={item.sparkline} up={item.up} />
      </div>
    </div>
  );
}

function MetricRow({ metric }: { metric: InnovationMetric }) {
  const Icon = METRIC_ICONS[metric.iconType] ?? BarChart3;
  const negative = isNegative(metric.change);

  return (
    <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
      <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-red-400" strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1">
        <span className="block font-serif text-[24px] font-bold text-white leading-tight tabular-nums">
          {metric.value}
        </span>
        <span className="block text-[13px] text-gray-400 leading-snug mt-0.5">
          {metric.label}
        </span>
      </div>
      <div className="shrink-0 text-right">
        <span
          className={`block text-[14px] font-bold tabular-nums ${
            negative ? "text-red-400" : "text-green-400"
          }`}
        >
          {metric.change}
        </span>
        <span className="block text-[11px] text-gray-500 mt-0.5">
          {metric.changePeriod}
        </span>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export function InnovationPage() {
  const [marketTab, setMarketTab] = useState<MarketTab>(MARKET_TABS[0]);
  const marketItems = defaultMarketSnapshot[marketTab] ?? [];

  const featured = defaultFeaturedInnovation;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-8 md:pt-10 pb-16">
          {/* ---------- Page header ---------- */}
          <header className="mb-10 sm:mb-12">
            <CategoryTag>Innovation</CategoryTag>
            <h1 className="mt-2 font-serif text-[34px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.05] text-gray-950 max-w-3xl">
              The technologies reshaping industry, markets and policy
            </h1>
          </header>

          {/* ---------- Hero: featured story + numbers ---------- */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-14">
            <article className="lg:col-span-8 group">
              <Link
                to={storyHref(featured)}
                className="block overflow-hidden rounded-md bg-gray-100 aspect-[16/9]"
              >
                <ImageWithFallback
                  src={featured.image}
                  alt={featured.title}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </Link>

              <div className="pt-6">
                <CategoryTag>{featured.category}</CategoryTag>
                <Link to={storyHref(featured)} className="block mt-2">
                  <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold leading-[1.1] text-gray-950 group-hover:text-red-600 transition-colors">
                    {featured.title}
                  </h2>
                </Link>
                <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.6] text-gray-600 max-w-2xl">
                  {featured.summary}
                </p>
                <Link
                  to={storyHref(featured)}
                  className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-gray-950 hover:text-red-600 transition-colors"
                >
                  <span>Read full story</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>

            <aside className="lg:col-span-4 bg-gray-950 rounded-md p-6 sm:p-7 h-fit">
              <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-red-400">
                  Numbers at a Glance
                </h2>
              </div>
              <div className="divide-y divide-white/10">
                {defaultInnovationMetrics.map((metric) => (
                  <MetricRow key={metric.id} metric={metric} />
                ))}
              </div>
            </aside>
          </section>

          {/* ---------- Top stories ---------- */}
          <section className="mb-14">
            <SectionHeading
              title="Top Innovation Stories"
              linkTo="/technology"
              linkLabel="View more"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
              {defaultTopInnovationStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>

          {/* ---------- Market snapshot ---------- */}
          <section className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b-2 border-gray-950 pb-2.5 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-gray-950 leading-none">
                  Market Snapshot
                </h2>
              </div>
              <div role="tablist" className="flex items-center gap-4">
                {MARKET_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={marketTab === tab}
                    onClick={() => setMarketTab(tab)}
                    className={`text-[11px] font-bold uppercase tracking-[0.12em] pb-1 border-b-2 transition-colors ${
                      marketTab === tab
                        ? "text-red-600 border-red-600"
                        : "text-gray-400 border-transparent hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {marketItems.slice(0, 4).map((item) => (
                <MarketTile key={item.symbol} item={item} />
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 text-[12px]">
              <span className="text-gray-400">Delayed 15m · Global exchanges</span>
              <Link
                to="/markets"
                className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
              >
                <span>View all markets</span>
                <ArrowRight size={11} />
              </Link>
            </div>
          </section>

          {/* ---------- Latest ---------- */}
          <section className="mb-12">
            <SectionHeading
              title="Latest in Innovation"
              linkTo="/energy"
              linkLabel="View all"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
              {defaultLatestInnovationNews.map((story) => (
                <LatestItem key={story.id} story={story} />
              ))}
            </div>
          </section>

          {/* ---------- Ad + newsletter ---------- */}
          <AdvertisementSlot variant="first" className="mb-12" />

          <NewsletterCTA
            title="Stay Ahead with The Pride Times"
            description="Daily briefings on AI, semiconductors, quantum breakthroughs, and global tech policy delivered directly to your inbox."
            newsletterKey="daily-brief"
          />
        </main>
      </div>
    </div>
  );
}

export default InnovationPage;
