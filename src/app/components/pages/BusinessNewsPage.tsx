import { useEffect } from "react";
import type { ReactNode } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  hero,
  headlineNews,
  maDeals,
  earningsNews,
  corporateNews,
  startupNews,
  type BusinessArticle,
} from "../../data/businessNewsData";

/* =========================================================
   LOCAL IMAGES (company-websites/src/imports)
   Stories without their own image get a matching one by
   category so every headline has a picture.
========================================================= */
import businessStockDrop from "../../../imports/business-stock-drop.png";
import businessAviationJet from "../../../imports/business-aviation-jet.png";
import businessJioDigital from "../../../imports/business-jio-digital.png";
import businessGoldmanNyse from "../../../imports/business-goldman-nyse.png";
import energyTanks from "../../../imports/energy-tanks.png";
import warehouseRobotics from "../../../imports/warehouse-robotics.png";
import dataCentre from "../../../imports/data-centre.png";
import supplyChainMap from "../../../imports/supply-chain-map.png";

const categoryImages: Record<string, string> = {
  TELECOM: businessJioDigital,
  BANKING: businessGoldmanNyse,
  AEROSPACE: businessAviationJet,
  ENERGY: energyTanks,
  RETAIL: warehouseRobotics,
  LUXURY: businessStockDrop,
};

const fallbackPool = [dataCentre, supplyChainMap, businessStockDrop, warehouseRobotics];

function storyImage(story: BusinessArticle, index = 0): string {
  return (
    story.image ??
    categoryImages[story.category.toUpperCase()] ??
    fallbackPool[index % fallbackPool.length]
  );
}

/* =========================================================
   PAGE DATA
   Top block  : hero + 2 headline stories + 6 latest (right)
   More block : every remaining story as a compact headline row
   Nothing is repeated, nothing is dropped.
========================================================= */

const latestStories = corporateNews.slice(0, 6);
const moreCorporate = corporateNews.slice(6);

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="mb-3 flex items-center gap-2.5 border-b-2 border-black pb-2">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />

      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-900">
        {title}
      </h2>

      {meta && (
        <span className="ml-auto text-[9px] font-semibold uppercase tracking-wide text-gray-400">
          {meta}
        </span>
      )}
    </div>
  );
}

/* =========================================================
   GOOGLE ADSENSE (existing Pride Times publisher + slots)
========================================================= */
type AdSenseWindow = Window & { adsbygoogle?: unknown[] };

function AdSpace({ slot = "5373718974" }: { slot?: "5373718974" | "8042854193" }) {
  useEffect(() => {
    try {
      const adsWindow = window as AdSenseWindow;
      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
    } catch (error) {
      console.warn("AdSense could not initialize:", error);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-3">
      <p className="mb-1.5 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        Advertisement
      </p>

      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client="ca-pub-2331501617441941"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

/* =========================================================
   HEADLINE ROW — compact: thumbnail + category + headline
   Opens the inner article at /article/:id
========================================================= */

function HeadlineRow({ story, index = 0 }: { story: BusinessArticle; index?: number }) {
  return (
    <Link
      to={`/article/${story.id}`}
      className="group flex gap-3 py-3"
    >
      <div className="h-[62px] w-[92px] shrink-0 overflow-hidden rounded-md bg-gray-100">
        <ImageWithFallback
          src={storyImage(story, index)}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-red-600">
          {story.category}
        </span>

        <h3 className="mt-0.5 line-clamp-2 text-[13px] font-bold leading-[1.35] text-gray-900 transition-colors group-hover:text-red-600">
          {story.title}
        </h3>

        <span className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
          <Clock size={9} />
          {story.time}
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   LATEST STREAM — text-only headlines (right column)
========================================================= */

function LatestStream({ stories }: { stories: BusinessArticle[] }) {
  return (
    <div className="pt-4">
      <div className="mb-1 flex items-center justify-between border-b border-gray-200 pb-2">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
          Latest News
        </h2>

        <span className="text-[8px] uppercase tracking-wide text-gray-400">
          Newsroom
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {stories.map((story) => (
          <Link
            key={story.id}
            to={`/article/${story.id}`}
            className="group block py-2.5"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-red-600">
              {story.category}
              <span className="ml-2 font-medium normal-case tracking-normal text-gray-400">
                {story.time}
              </span>
            </span>

            <span className="mt-0.5 block text-[12px] font-semibold leading-[1.4] text-gray-800 transition-colors group-hover:text-red-600">
              {story.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGES + TABLE HEADER
========================================================= */

const earningsBadge: Record<string, string> = {
  BEAT: "bg-green-600 text-white",
  MISS: "bg-red-600 text-white",
};

const dealBadge: Record<string, string> = {
  Closed: "bg-green-600 text-white",
  Announced: "bg-blue-600 text-white",
  Pending: "bg-amber-500 text-white",
};

const TH = ({
  children,
  align = "left",
  className = "",
}: {
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
}) => (
  <th
    className={`px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 ${
      align === "right" ? "text-right" : "text-left"
    } ${className}`}
  >
    {children}
  </th>
);

/* =========================================================
   MAIN PAGE
========================================================= */

export function BusinessNewsPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:py-6 lg:px-8">

        {/* PAGE HEADER */}

        <header className="mb-5 flex items-end justify-between border-b-4 border-black pb-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
              Business Briefing
            </p>

            <h1 className="mt-0.5 font-serif text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Business News
            </h1>
          </div>

          <span className="pb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            {1 + headlineNews.length + corporateNews.length + startupNews.length} stories
          </span>
        </header>


        {/* =================================================
            TOP STORIES — same newsroom lead as the homepage
        ================================================= */}

        <section className="grid grid-cols-1 gap-5 border-b border-gray-300 pb-6 lg:grid-cols-[1.15fr_1fr_0.85fr] lg:gap-6">

          {/* LEAD STORY */}

          <Link
            to={`/article/${hero.id}`}
            className="group relative block min-h-[360px] overflow-hidden rounded-lg border border-gray-200 bg-black lg:min-h-[420px]"
          >
            <ImageWithFallback
              src={storyImage(hero)}
              alt={hero.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

            <span className="absolute left-4 top-4 rounded-[2px] bg-red-600 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
              {hero.category}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-5">
              <h2 className="font-serif text-2xl font-bold leading-[1.1] text-white lg:text-[26px]">
                {hero.title}
              </h2>

              <p className="mt-2 line-clamp-2 text-[12px] leading-[1.55] text-gray-200">
                {hero.dek}
              </p>

              <span className="mt-3 inline-flex items-center gap-1.5 border-b border-white/60 pb-1 text-[10px] font-bold uppercase tracking-wide text-white">
                Read Full Story
                <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* MAJOR COVERAGE */}

          <div className="min-w-0">
            <Link to={`/article/${headlineNews[0].id}`} className="group block">
              <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.15em] text-red-600">
                {headlineNews[0].category}
              </span>

              <div className="overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={storyImage(headlineNews[0])}
                  alt={headlineNews[0].title}
                  className="h-[200px] w-full rounded-lg object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <h2 className="mt-2.5 font-serif text-xl font-bold leading-[1.15] text-gray-950 transition-colors group-hover:text-red-600">
                {headlineNews[0].title}
              </h2>

              <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.55] text-gray-600">
                {headlineNews[0].excerpt}
              </p>
            </Link>

            <div className="mt-3 border-t border-gray-200">
              <HeadlineRow story={headlineNews[1]} index={1} />
            </div>
          </div>

          {/* RIGHT COLUMN */}

          <aside className="min-w-0">
            <AdSpace />
            <LatestStream stories={latestStories} />
          </aside>

        </section>


        {/* =================================================
            MORE HEADLINES — every remaining story, compact
        ================================================= */}

        <section className="grid grid-cols-1 gap-x-10 gap-y-6 py-6 md:grid-cols-2">

          <div>
            <SectionHeader
              title="Corporate Strategy"
              meta={`${moreCorporate.length} more`}
            />

            <div className="divide-y divide-gray-100">
              {moreCorporate.map((story, i) => (
                <HeadlineRow key={story.id} story={story} index={i} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              title="The Startup Economy"
              meta={`${startupNews.length} stories`}
            />

            <div className="divide-y divide-gray-100">
              {startupNews.map((story, i) => (
                <HeadlineRow key={story.id} story={story} index={i} />
              ))}
            </div>
          </div>

        </section>


        {/* =================================================
            NUMBERS — collapsed so the page stays short
        ================================================= */}

        <section className="space-y-3 border-t-2 border-black pt-5">

          <details className="rounded-md border border-gray-200">
            <summary className="cursor-pointer select-none px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-800">
              Corporate Earnings · The Numbers Behind the Headlines
            </summary>

            <div className="overflow-x-auto border-t border-gray-200">
              <table className="w-full min-w-[560px] border-collapse text-[12px]">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50">
                    <TH>Company</TH>
                    <TH align="right">EPS</TH>
                    <TH align="right">vs Est.</TH>
                    <TH align="right">Revenue</TH>
                    <TH align="right">Result</TH>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {earningsNews.map((e) => (
                    <tr key={e.ticker} className="hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <span className="font-semibold text-gray-900">{e.company}</span>
                        <span className="ml-1.5 text-[11px] text-gray-400">({e.ticker})</span>
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-gray-700">{e.eps}</td>
                      <td
                        className={`px-3 py-2 text-right font-bold tabular-nums ${
                          e.status === "BEAT" ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {e.beat}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-gray-600">{e.revenue}</td>
                      <td className="px-3 py-2 text-right">
                        <span
                          className={`inline-flex rounded-[2px] px-2 py-0.5 text-[10px] font-bold tracking-wide ${earningsBadge[e.status]}`}
                        >
                          {e.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          <details className="rounded-md border border-gray-200">
            <summary className="cursor-pointer select-none px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-800">
              Deals &amp; Capital · Where Money Is Moving
            </summary>

            <div className="overflow-x-auto border-t border-gray-200">
              <table className="w-full min-w-[600px] border-collapse text-[12px]">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50">
                    <TH>Acquirer</TH>
                    <TH>Target</TH>
                    <TH align="right">Value</TH>
                    <TH className="hidden md:table-cell">Sector</TH>
                    <TH align="right">Status</TH>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {maDeals.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-semibold text-gray-900">{d.acquirer}</td>
                      <td className="px-3 py-2 text-gray-600">{d.target}</td>
                      <td className="px-3 py-2 text-right font-bold tabular-nums text-gray-900">{d.value}</td>
                      <td className="hidden px-3 py-2 text-[11px] text-gray-500 md:table-cell">{d.sector}</td>
                      <td className="px-3 py-2 text-right">
                        <span
                          className={`inline-flex rounded-[2px] px-2 py-0.5 text-[10px] font-bold tracking-wide ${dealBadge[d.status]}`}
                        >
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

        </section>


        {/* SECOND ADVERTISEMENT */}

        <div className="my-6">
          <AdSpace slot="8042854193" />
        </div>


        {/* NEWSLETTER */}

        <section className="rounded-md bg-[#071a2d] px-5 py-6 text-center sm:px-8">
          <h2 className="font-serif text-lg font-bold text-white md:text-xl">
            Stay Ahead with The Pride Times
          </h2>

          <p className="mt-1.5 text-xs text-gray-300">
            A concise briefing on companies, markets, capital and the business decisions shaping tomorrow's economy.
          </p>

          <div className="mx-auto mt-4 flex max-w-lg flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-10 flex-1 rounded-sm border border-gray-500 bg-white/10 px-3 text-xs text-white outline-none placeholder:text-gray-400 focus:border-red-500"
            />

            <button
              type="button"
              className="h-10 rounded-sm bg-red-600 px-5 text-xs font-bold text-white transition-colors hover:bg-red-700"
            >
              Subscribe Free
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
