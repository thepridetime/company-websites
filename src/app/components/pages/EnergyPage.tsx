// src/app/components/pages/EnergyPage.tsx
import { useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Clock,
  MapPin,
  Zap,
  Factory,
  Wind,
  Sun,
  ShieldCheck,
  Activity,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  octEditionArticles,
  octEditionArticlePath,
  octEditionMeta,
  type OctEditionArticle,
} from "../../data/octEditionData";

/*
 * Energy page refresh
 * - Keeps articles connected to octEditionData.ts.
 * - Adds evergreen Energy Desk coverage guides so the page remains useful
 *   even when the edition currently contains only one Energy article.
 * - Does not invent market prices or present sample headlines as breaking news.
 */

const energyStories: OctEditionArticle[] = octEditionArticles.filter(
  (article) => article.industry === "Energy"
);

const leadStory = energyStories[0];
const otherStories = energyStories.slice(1);
const latestStories = leadStory
  ? energyStories.filter((story) => story.id !== leadStory.id)
  : energyStories;

const TOPICS = ["Oil & Gas", "Power", "Climate", "Energy Security"];

const coverageGuides = [
  {
    id: "oil-gas",
    label: "Oil & Gas",
    title: "Supply, prices and geopolitics",
    description:
      "Follow production decisions, shipping routes, refinery capacity and the forces shaping global oil and gas markets.",
    icon: Factory,
    tone: "bg-amber-50 text-amber-800",
  },
  {
    id: "renewables",
    label: "Renewables",
    title: "The transition to cleaner power",
    description:
      "Track solar and wind deployment, storage technology, project finance and the companies building new energy capacity.",
    icon: Wind,
    tone: "bg-emerald-50 text-emerald-800",
  },
  {
    id: "power-grid",
    label: "Power & Grids",
    title: "The infrastructure behind electricity",
    description:
      "Explore grid upgrades, electricity demand, transmission bottlenecks and investment in more resilient power systems.",
    icon: Activity,
    tone: "bg-sky-50 text-sky-800",
  },
  {
    id: "climate-policy",
    label: "Climate & Policy",
    title: "Policy, emissions and energy security",
    description:
      "Understand how regulation, climate commitments and national security priorities influence energy decisions.",
    icon: ShieldCheck,
    tone: "bg-violet-50 text-violet-800",
  },
];

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
      const w = window as Window & { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // AdSense can be unavailable in development or when consent/ad blocking applies.
    }
  }, []);

  return (
    <div className={`energy-ad-slot w-full ${className}`}>
      <div className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
        Advertisement
      </div>
      <div
        className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white"
        style={{ minHeight }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={format === "auto" ? "true" : undefined}
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

function SectionHeader({
  title,
  kicker,
  description,
}: {
  title: string;
  kicker?: string;
  description?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {kicker && (
          <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-red-600">
            {kicker}
          </p>
        )}
        <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      <span className="hidden shrink-0 pb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
        The Pride Times
      </span>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-red-600">
      {children}
    </span>
  );
}

export function EnergyPage() {
  return (
    <div className="energy-page min-h-screen bg-[#f5f6f8] font-sans text-slate-900 antialiased">
      {/* Editorial masthead / category hero */}
      <section className="relative isolate overflow-hidden bg-[#090b0e] text-white">
        <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-red-700/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-gradient-to-l from-red-950/40 to-transparent lg:block" />

        <div className="relative mx-auto max-w-[1320px] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5">
                <Zap size={12} className="text-amber-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.19em] text-slate-300">
                  {octEditionMeta.edition} · {octEditionMeta.date}
                </span>
              </div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.28em] text-red-400">
                The Global Energy Briefing
              </p>
              <h1 className="mt-2 font-serif text-5xl font-bold leading-none tracking-tight sm:text-6xl md:text-7xl">
                Energy<span className="text-red-500">.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Reporting on oil, gas, electricity, climate policy and the
                technologies reshaping the global energy economy.
              </p>
              <div className="mt-7 h-[3px] w-16 rounded-full bg-red-600" />
            </div>

            <div className="max-w-xl lg:pb-1">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Explore the desk
              </p>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-[10px] font-medium text-slate-200 transition-colors hover:border-red-500/60 hover:bg-red-500/10"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1320px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="py-7 md:py-9">
          <PrideTimesAd variant="first" />
        </div>

        {!leadStory && (
          <div className="mb-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <Zap className="mx-auto mb-3 text-slate-300" size={30} />
            <h2 className="font-serif text-2xl font-bold text-slate-800">
              The Energy Desk
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Energy articles from this edition will appear here. In the
              meantime, explore the coverage guides below.
            </p>
          </div>
        )}

        {/* Lead story and useful sidebar */}
        {leadStory && (
          <section className="mb-14">
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(310px,0.8fr)] lg:gap-7">
              <Link
                to={octEditionArticlePath(leadStory)}
                className="group relative block min-h-[430px] overflow-hidden rounded-2xl bg-slate-900 shadow-[0_16px_45px_rgba(15,23,42,0.14)] ring-1 ring-black/5 sm:min-h-[500px] lg:min-h-[570px]"
              >
                <ImageWithFallback
                  src={leadStory.image}
                  alt={leadStory.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/5" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />

                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-3.5 py-2 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white shadow-lg">
                  <Zap size={11} />
                  Lead Story
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10">
                  <p className="mb-3 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-amber-300">
                    <MapPin size={11} />
                    {leadStory.location}
                  </p>
                  <h2 className="max-w-3xl font-serif text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
                    {leadStory.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
                    {leadStory.lede}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-950 transition-all group-hover:gap-3 group-hover:bg-red-600 group-hover:text-white">
                    Read full story <ArrowRight size={13} />
                  </span>
                </div>
              </Link>

              <aside className="min-w-0 space-y-5">
                <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <Eyebrow>At a glance</Eyebrow>
                      <h2 className="mt-1 font-serif text-xl font-bold text-slate-950">
                        Key Figures
                      </h2>
                    </div>
                    <span className="rounded-full bg-red-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wide text-red-600">
                      {energyStories.length}{" "}
                      {energyStories.length === 1 ? "story" : "stories"}
                    </span>
                  </div>
                  <dl className="divide-y divide-slate-100">
                    {leadStory.keyFacts.map((fact) => (
                      <div
                        key={fact.label}
                        className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-3.5"
                      >
                        <dt className="text-xs font-semibold leading-5 text-slate-700">
                          {fact.label}
                        </dt>
                        <dd className="max-w-[145px] text-right text-xs leading-5 tabular-nums text-slate-500">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-1 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <Eyebrow>From the newsroom</Eyebrow>
                      <h2 className="mt-1 font-serif text-xl font-bold text-slate-950">
                        More Energy News
                      </h2>
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      Latest
                    </span>
                  </div>
                  {otherStories.length > 0 ? (
                    <ul className="divide-y divide-slate-100">
                      {otherStories.slice(0, 5).map((item) => (
                        <li key={item.id}>
                          <Link
                            to={octEditionArticlePath(item)}
                            className="group flex gap-3 py-4"
                          >
                            <span className="mt-1 h-8 w-1 shrink-0 rounded-full bg-red-100 transition-colors group-hover:bg-red-600" />
                            <span className="min-w-0">
                              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                                {item.location}
                              </span>
                              <span className="mt-1 block text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-red-600">
                                {item.title}
                              </span>
                              <span className="mt-1.5 block line-clamp-2 text-xs leading-5 text-slate-500">
                                {item.lede}
                              </span>
                            </span>
                            <ChevronRight
                              size={15}
                              className="mt-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-red-600"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-4 text-xs leading-5 text-slate-500">
                      New reports will appear here as more Energy stories are
                      added to the edition.
                    </p>
                  )}
                </section>

                <SidebarAd />
              </aside>
            </div>
          </section>
        )}

        {/* Additional evergreen editorial content */}
        <section className="mb-14">
          <SectionHeader
            title="Inside the Energy Economy"
            kicker="Energy Desk"
            description="Explore the industries, technologies and policy decisions behind the global energy transition."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {coverageGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <article
                  key={guide.id}
                  className="group flex min-h-[230px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg sm:p-6"
                >
                  <div
                    className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${guide.tone}`}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-red-600">
                    {guide.label}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-slate-950">
                    {guide.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                    {guide.description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-slate-700 transition-colors group-hover:text-red-600">
                    Explore coverage <ArrowRight size={12} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Latest article feed: lead story is excluded to avoid repetition */}
        {latestStories.length > 0 && (
          <section className="mb-14">
            <SectionHeader
              title="Latest Energy News"
              kicker="The Newsroom"
              description="Reporting and analysis from the October 2026 Global Industry Edition."
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {latestStories.map((story) => (
                <Link
                  key={story.id}
                  to={octEditionArticlePath(story)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100 sm:h-60">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-70" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-red-600 shadow-sm">
                      {story.industry}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <MapPin size={10} /> {story.location}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-slate-950 transition-colors group-hover:text-red-600 sm:text-2xl">
                      {story.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                      {story.lede}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 mt-5">
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-400">
                        <Clock size={11} />
                        {story.publishedAt} · {story.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide text-red-600">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Editor's briefing: adds useful content without inventing current events */}
        <section className="mb-14 overflow-hidden rounded-2xl bg-[#101820] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr]">
            <div className="p-6 sm:p-9 lg:p-10">
              <Eyebrow>Energy briefing</Eyebrow>
              <h2 className="mt-3 max-w-xl font-serif text-3xl font-bold leading-tight sm:text-4xl">
                The forces shaping tomorrow’s energy system
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Energy security, affordability and decarbonisation increasingly
                intersect. Our coverage examines how governments, utilities,
                investors and technology companies navigate those competing
                priorities.
              </p>
            </div>
            <div className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 lg:border-l lg:border-t-0">
              {[
                ["01", "Security of supply", "Infrastructure, shipping routes and strategic reserves."],
                ["02", "Investment & innovation", "Capital flows into generation, storage and grid technology."],
                ["03", "The policy landscape", "Regulation, climate targets and industrial competitiveness."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-4 p-5 sm:p-6">
                  <span className="font-serif text-2xl text-red-500">{number}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pb-4 pt-1">
          <PrideTimesAd variant="second" />
        </div>
      </main>
    </div>
  );
}

export default EnergyPage;
