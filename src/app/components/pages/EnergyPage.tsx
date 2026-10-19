// src/app/components/pages/EnergyPage.tsx
import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, MapPin, Zap } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  octEditionArticles,
  octEditionArticlePath,
  octEditionMeta,
  type OctEditionArticle,
} from "../../data/octEditionData";

/* =========================================================
   ENERGY STORIES
   Only the Energy stories from the October 2026
   Global Industry Edition (src/app/data/octEditionData.ts).
========================================================= */

const energyStories: OctEditionArticle[] = octEditionArticles.filter(
  (article) => article.industry === "Energy"
);

const leadStory = energyStories[0];
const otherStories = energyStories.slice(1);

const TOPICS = ["Oil & Gas", "Power", "Climate", "Energy Security"];

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
  minHeight = 90,
}: AdSlotProps) {
  useEffect(() => {
    try {
      const w = window as Window & {
        adsbygoogle?: unknown[];
      };

      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // AdSense may be unavailable because of an ad blocker,
      // development environment, consent settings, or no inventory.
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="mb-1.5 text-center text-[7px] font-semibold uppercase tracking-[0.2em] text-gray-400">
        Advertisement
      </div>

      <div
        className="w-full overflow-hidden rounded-xl bg-gray-50"
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
      className="mt-6"
    />
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  kicker,
}: {
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-gray-200 pb-3">
      <div>
        {kicker && (
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
            {kicker}
          </p>
        )}
        <h2 className="mt-1 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
          {title}
        </h2>
      </div>

      <span className="hidden text-[8px] uppercase tracking-[0.18em] text-gray-400 sm:block">
        The Pride Times
      </span>
    </div>
  );
}

/* =========================================================
   ENERGY PAGE
========================================================= */

export function EnergyPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      {/* HERO */}

      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 md:pb-14 md:pt-12 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                <Zap size={11} className="text-amber-400" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-300">
                  {octEditionMeta.edition} · {octEditionMeta.date}
                </span>
              </div>

              <h1 className="mt-4 font-serif text-[40px] font-bold leading-[1.02] sm:text-[52px] md:text-[64px]">
                Energy
              </h1>

              <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-gray-300 md:text-[15px]">
                Oil, gas, power, climate and energy security coverage from
                The Pride Times Global Industry Edition.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              {TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-gray-200"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 h-[3px] w-16 rounded-full bg-red-600" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="py-8 md:py-10">
          <PrideTimesAd variant="first" />

          {/* EMPTY STATE */}

          {!leadStory && (
            <div className="my-10 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <Zap className="mx-auto mb-3 text-gray-300" size={28} />
              <p className="text-sm font-medium text-gray-500">
                No energy stories in this edition yet.
              </p>
            </div>
          )}

          {/* LEAD STORY + SIDEBAR */}

          {leadStory && (
            <section className="mb-14">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
                {/* LEAD CARD */}

                <Link
                  to={octEditionArticlePath(leadStory)}
                  className="group relative block min-h-[440px] overflow-hidden rounded-2xl bg-neutral-900 shadow-lg shadow-gray-900/10 lg:min-h-[540px]"
                >
                  <ImageWithFallback
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-md">
                    <Zap size={10} />
                    Lead Story
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="mb-3 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-300">
                      <MapPin size={10} />
                      {leadStory.location}
                    </p>

                    <h2 className="font-serif text-[26px] font-bold leading-[1.1] text-white md:text-[32px] lg:text-[36px] text-balance">
                      {leadStory.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-gray-300 md:text-[14px]">
                      {leadStory.lede}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-neutral-900 transition-all group-hover:gap-3 group-hover:bg-red-600 group-hover:text-white">
                      Read Full Story
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>

                {/* SIDEBAR */}

                <aside className="min-w-0">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="font-serif text-lg font-bold">
                        Key Figures
                      </h2>

                      <span className="rounded-full bg-red-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-red-600">
                        {energyStories.length}{" "}
                        {energyStories.length === 1 ? "story" : "stories"}
                      </span>
                    </div>

                    <dl className="divide-y divide-gray-100">
                      {leadStory.keyFacts.map((fact) => (
                        <div
                          key={fact.label}
                          className="flex items-start justify-between gap-4 py-3"
                        >
                          <dt className="text-[11px] font-semibold text-gray-800">
                            {fact.label}
                          </dt>

                          <dd className="text-right text-[11px] tabular-nums text-gray-500">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                    <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-3">
                      <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                        More Energy News
                      </h2>

                      <span className="text-[8px] uppercase tracking-wide text-gray-400">
                        Newsroom
                      </span>
                    </div>

                    {otherStories.length > 0 ? (
                      <ul className="divide-y divide-gray-100">
                        {otherStories.map((item) => (
                          <li key={item.id}>
                            <Link
                              to={octEditionArticlePath(item)}
                              className="group block py-3.5"
                            >
                              <span className="block text-[9px] font-bold uppercase tracking-wide text-gray-400">
                                {item.location}
                              </span>

                              <span className="mt-1 block text-[12px] font-semibold leading-snug text-gray-900 transition-colors group-hover:text-red-600">
                                {item.title}
                              </span>

                              <span className="mt-1 block line-clamp-2 text-[11px] leading-relaxed text-gray-500">
                                {item.lede}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="py-4 text-[11px] text-gray-400">
                        More energy stories will appear here.
                      </p>
                    )}
                  </div>

                  <SidebarAd />
                </aside>
              </div>
            </section>
          )}

          {/* LATEST ENERGY FEED */}

          {energyStories.length > 0 && (
            <section className="mb-12">
              <SectionHeader title="Latest Energy News" kicker="Newsroom" />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {energyStories.map((story) => (
                  <Link
                    key={story.id}
                    to={octEditionArticlePath(story)}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-900/10"
                  >
                    <div className="relative h-52 overflow-hidden bg-gray-100 sm:h-60">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-red-600 shadow-sm">
                        {story.industry}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        <MapPin size={9} />
                        {story.location}
                      </span>

                      <h3 className="mt-2 font-serif text-xl font-bold leading-[1.2] text-gray-900 transition-colors group-hover:text-red-600 md:text-[22px] text-balance">
                        {story.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-gray-500">
                        {story.lede}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-5">
                        <span className="inline-flex items-center gap-1.5 text-[10px] text-gray-400">
                          <Clock size={10} />
                          {story.publishedAt} · {story.readTime}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-red-600 opacity-0 transition-all group-hover:opacity-100">
                          Read
                          <ArrowRight size={11} />
                        </span>
                      </div>
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

export default EnergyPage;
