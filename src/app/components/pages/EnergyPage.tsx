// src/app/components/pages/EnergyPage.tsx
import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  octEditionArticles,
  octEditionArticlePath,
  type OctEditionArticle,
} from "../../data/octEditionData";

/* =========================================================
   DATA
   Only real Energy stories from octEditionData.ts are shown.
   trendSeries stays empty until verified figures are supplied.
   Expected shape: [{ year: "2024", supply: 12, demand: 10 }, ...]
========================================================= */

const energyStories: OctEditionArticle[] = octEditionArticles.filter(
  (article) => article.industry === "Energy"
);

const leadStory = energyStories[0];
const otherStories = energyStories.slice(1);

const trendSeries: { year: string; [series: string]: string | number }[] = [];
const trendKeys = [
  { key: "supply", label: "Supply", color: "#0f766e" },
  { key: "demand", label: "Demand", color: "#b45309" },
];

const THEMES = ["Global Energy", "Markets", "Decarbonization", "Security"];

/* =========================================================
   GOOGLE ADSENSE SLOTS
========================================================= */

type AdSlotProps = {
  slot: string;
  format?: "auto" | "fluid";
  className?: string;
  minHeight?: number;
};

function AdSlot({
  slot,
  format = "auto",
  className = "",
  minHeight = 90,
}: AdSlotProps) {
  useEffect(() => {
    try {
      const w = window as Window & { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // Ad blockers, consent settings or missing inventory are expected.
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
        />
      </div>
    </div>
  );
}

/* =========================================================
   SHARED PIECES
========================================================= */

function SectionHeader({ title, label = "The Pride Times" }: { title: string; label?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-2.5">
      <h2 className="font-serif text-xl font-bold text-gray-900 md:text-2xl">{title}</h2>
      <span className="hidden text-[8px] uppercase tracking-[0.18em] text-gray-400 sm:block">
        {label}
      </span>
    </div>
  );
}

function PlaceholderCard({ label }: { label: string }) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-sm border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
        Placeholder
      </span>
      <p className="mt-2 text-[12px] text-gray-500">{label}</p>
    </div>
  );
}

function NewsCard({ story }: { story: OctEditionArticle }) {
  return (
    <Link
      to={octEditionArticlePath(story)}
      className="group flex flex-col overflow-hidden rounded-sm border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="h-44 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="self-start rounded-sm bg-red-600 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-white">
          {story.industry}
        </span>
        <h3 className="mt-3 font-serif text-[17px] font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-600">
          {story.title}
        </h3>
        <span className="mt-auto flex items-center gap-1 pt-3 text-[9px] text-gray-400">
          <Clock size={9} />
          {story.publishedAt}
        </span>
      </div>
    </Link>
  );
}

function InsightCard({ story }: { story: OctEditionArticle }) {
  return (
    <Link
      to={octEditionArticlePath(story)}
      className="group flex flex-col rounded-sm border border-gray-200 bg-white p-5 transition-shadow duration-300 hover:shadow-lg"
    >
      <span className="self-start rounded-sm bg-gray-900 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-white">
        {story.location}
      </span>
      <h3 className="mt-3 font-serif text-[17px] font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-600">
        {story.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-gray-500">{story.lede}</p>
    </Link>
  );
}

/* =========================================================
   ENERGY PAGE
========================================================= */

export function EnergyPage() {
  return (
    <div className="min-h-screen bg-[#f7f5f0] font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 pt-6 md:pt-8">

          {/* PAGE TITLE */}

          <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-serif text-[40px] font-bold leading-tight md:text-[52px]">Energy</h1>
              <p className="mt-1 max-w-2xl text-[12px] text-gray-500 md:text-[13px]">
                Oil, gas, power, climate and energy security coverage from The Pride Times
                Global Industry Edition.
              </p>
            </div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              {THEMES.join("  •  ")}
            </p>
          </header>

          <PrideTimesAd variant="first" />

          {!leadStory && (
            <p className="py-16 text-center text-[12px] text-gray-400">
              No energy stories in this edition yet.
            </p>
          )}

          {/* HERO + KEY FIGURES + TRENDS */}

          {leadStory && (
            <section className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
              <Link
                to={octEditionArticlePath(leadStory)}
                className="group relative block min-h-[380px] overflow-hidden rounded-sm bg-neutral-900 md:min-h-[480px]"
              >
                <ImageWithFallback
                  src={leadStory.image}
                  alt={leadStory.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                <span className="absolute left-4 top-4 rounded-sm bg-red-600 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
                  {leadStory.industry} | {leadStory.location}
                </span>

                <div className="absolute right-4 top-4 hidden flex-col gap-2 sm:flex">
                  {leadStory.keyFacts.slice(0, 2).map((fact) => (
                    <span
                      key={fact.label}
                      className="max-w-[220px] rounded-sm bg-black/60 px-3 py-2 text-right text-[10px] text-white backdrop-blur-sm"
                    >
                      <span className="block text-[8px] uppercase tracking-wider text-gray-300">
                        {fact.label}
                      </span>
                      <span className="font-semibold">{fact.value}</span>
                    </span>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <h2 className="font-serif text-2xl font-bold leading-[1.1] text-white text-balance md:text-[32px] lg:text-[36px]">
                    {leadStory.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-gray-200">
                    {leadStory.lede}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 border-b border-white/60 pb-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Read Full Story
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

              <aside className="min-w-0 space-y-6">
                {/* KEY FIGURES */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-serif text-lg font-bold">Key Figures</h2>
                    <span className="rounded-full border border-gray-300 bg-white px-3 py-0.5 text-[9px] font-medium">
                      {energyStories.length} {energyStories.length === 1 ? "story" : "stories"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {leadStory.keyFacts.map((fact) => (
                      <div key={fact.label} className="rounded-sm border border-gray-200 bg-white p-3 shadow-sm">
                        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-gray-500">
                          {fact.label}
                        </p>
                        <p className="mt-2 font-serif text-[15px] font-bold leading-snug text-gray-900">
                          {fact.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TRENDING ENERGY DATA */}
                <div className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-700">
                    Trending Energy Data
                  </p>

                  {trendSeries.length > 0 ? (
                    <div className="h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendSeries}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: 10 }} />
                          {trendKeys.map((s) => (
                            <Area
                              key={s.key}
                              type="monotone"
                              dataKey={s.key}
                              name={s.label}
                              stroke={s.color}
                              fill={s.color}
                              fillOpacity={0.12}
                            />
                          ))}
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex h-[180px] items-center justify-center rounded-sm border border-dashed border-gray-300 bg-gray-50 text-[11px] text-gray-400">
                      Chart data will appear here once verified figures are added.
                    </div>
                  )}
                </div>

                {/* MORE ENERGY NEWS */}
                <div>
                  <div className="mb-1 flex items-center justify-between border-b border-gray-200 pb-2">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                      More Energy News
                    </h2>
                    <span className="text-[8px] uppercase tracking-wide text-gray-400">Newsroom</span>
                  </div>

                  {otherStories.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {otherStories.map((item) => (
                        <li key={item.id}>
                          <Link to={octEditionArticlePath(item)} className="group block py-3">
                            <span className="block text-[9px] font-bold uppercase tracking-wide text-gray-400">
                              {item.location}
                            </span>
                            <span className="mt-1 block text-[12px] font-semibold leading-snug text-gray-900 transition-colors group-hover:text-red-600">
                              {item.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-4 text-[11px] text-gray-400">More energy stories will appear here.</p>
                  )}
                </div>

                <AdSlot slot="5373718974" format="auto" minHeight={250} className="mt-2" />
              </aside>
            </section>
          )}

          {/* GLOBAL NEWS */}

          <section className="mb-12">
            <SectionHeader title="Global News" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {energyStories.map((story) => (
                <NewsCard key={story.id} story={story} />
              ))}
              {energyStories.length < 4 &&
                Array.from({ length: 4 - energyStories.length }).map((_, i) => (
                  <PlaceholderCard key={`news-ph-${i}`} label="Add another Energy story" />
                ))}
            </div>
          </section>

          {/* SPOTLIGHT + INFOGRAPHICS */}

          {leadStory && (
            <section className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <SectionHeader title="Spotlight on Data" />
                <div className="rounded-sm border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-red-600">
                    <MapPin size={10} />
                    {leadStory.location}
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-snug">{leadStory.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {leadStory.highlights.map((point) => (
                      <li key={point} className="flex gap-3 text-[12px] leading-relaxed text-gray-600">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={octEditionArticlePath(leadStory)}
                    className="mt-6 inline-flex items-center gap-1.5 border-b border-gray-900 pb-0.5 text-[10px] font-bold uppercase tracking-wide hover:border-red-600 hover:text-red-600"
                  >
                    Read More
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </div>

              <div>
                <SectionHeader title="Infographics" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {leadStory.keyFacts.map((fact) => (
                    <div key={fact.label} className="rounded-sm border border-gray-200 bg-white p-5 shadow-sm">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-500">
                        {fact.label}
                      </p>
                      <p className="mt-3 font-serif text-[22px] font-bold leading-tight text-gray-900">
                        {fact.value}
                      </p>
                      <div className="mt-4 h-1.5 w-full rounded-full bg-gray-100">
                        <div className="h-1.5 w-2/3 rounded-full bg-red-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* INDUSTRY INSIGHT */}

          <section className="mb-12">
            <SectionHeader title="Industry Insight" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {otherStories.slice(0, 4).map((story) => (
                <InsightCard key={story.id} story={story} />
              ))}
              {otherStories.length < 4 &&
                Array.from({ length: 4 - Math.min(otherStories.length, 4) }).map((_, i) => (
                  <PlaceholderCard key={`insight-ph-${i}`} label="Awaiting an Energy insight story" />
                ))}
            </div>
          </section>

          <PrideTimesAd variant="second" />
        </main>
      </div>
    </div>
  );
}

export default EnergyPage;
