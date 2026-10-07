import { useEffect, useState } from "react";
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
import {
  octBusinessArticles,
  octEditionMeta,
  octEditionGlance,
  octEditionArticlePath,
  type OctEditionArticle,
} from "../../data/octEditionData";

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
   Top block  : every business headline of the newest edition
                (The Pride Times News, Global Industry Edition,
                7 October 2026 - src/app/data/octEditionData.ts)
   Hidden     : ALL earlier business stories, behind the
                "More articles" toggle. Nothing is removed.
========================================================= */

const newStories: OctEditionArticle[] = octBusinessArticles;

const earlierHeadlines: BusinessArticle[] = [hero, ...headlineNews];

const earlierCount =
  earlierHeadlines.length + corporateNews.length + startupNews.length;

/* Every image uses the homepage 16:10 frame. */
const IMG_FRAME = "aspect-[16/10] w-full overflow-hidden";

/* =========================================================
   SECTION HEADER (same as homepage)
========================================================= */

function SectionHeader({
  title,
  meta,
}: {
  title: string;
  meta?: string;
}) {
  return (
    <div className="mb-8 flex items-center justify-between border-b-2 border-black pb-3">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]">
        {title}
      </h2>

      {meta && (
        <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
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
   NEWSROOM CARD (same card as the homepage)
========================================================= */

function NewsroomCard({
  story,
  also,
}: {
  story: OctEditionArticle;
  also?: OctEditionArticle;
}) {
  return (
    <article className="flex h-full flex-col bg-white p-7">
      <Link to={octEditionArticlePath(story)} className="group block flex-1">
        <div className={`${IMG_FRAME} rounded-sm bg-gray-100`}>
          <ImageWithFallback
            src={story.image}
            alt={story.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <span className="mt-5 block text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
          {story.industry} · {story.location}
        </span>

        <h2 className="mt-2.5 font-sans text-[22px] font-extrabold leading-[1.15] tracking-tight text-gray-950 transition-colors group-hover:text-red-600">
          {story.title}
        </h2>

        <p className="mt-4 line-clamp-3 text-[12.5px] leading-[1.6] text-gray-600">
          {story.lede}
        </p>
      </Link>

      {also && (
        <Link
          to={octEditionArticlePath(also)}
          className="group mt-6 block rounded-lg border border-[#4a4a4a] px-4 py-3.5 transition-colors hover:border-red-600"
        >
          <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-gray-500">
            Also in this edition
          </span>

          <span className="mt-0.5 block line-clamp-2 text-[13px] font-bold leading-[1.3] text-gray-900 transition-colors group-hover:text-red-600">
            {also.title}
          </span>
        </Link>
      )}
    </article>
  );
}

/* =========================================================
   FEED ROW (same row as the homepage Latest News feed)
   Used for the earlier stories. Opens /article/:id
========================================================= */

function FeedRow({ story, index = 0 }: { story: BusinessArticle; index?: number }) {
  return (
    <Link
      to={`/article/${story.id}`}
      className="group grid grid-cols-[130px_1fr] gap-5 py-9 sm:grid-cols-[365px_1fr] sm:gap-8"
    >
      <div className={`${IMG_FRAME} self-start rounded-md`}>
        <ImageWithFallback
          src={storyImage(story, index)}
          alt={story.title}
          className="h-full w-full rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0">
        <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-red-600">
          {story.category}
        </span>

        <h3 className="mt-2 font-sans text-base font-extrabold leading-[1.2] tracking-tight text-gray-900 transition-colors group-hover:text-red-600 sm:text-xl">
          {story.title}
        </h3>

        <p className="mt-3 hidden line-clamp-3 text-[13px] leading-[1.6] text-gray-500 sm:block">
          {story.excerpt ?? story.dek}
        </p>

        <span className="mt-3 flex items-center gap-1 text-[9px] text-gray-400">
          <Clock size={8} />
          {story.time} · {story.readTime}
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function BusinessNewsPage() {
  const [showOlder, setShowOlder] = useState(false);

  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-10 lg:px-8">

        {/* PAGE HEADER */}

        <header className="mb-10 flex items-end justify-between border-b-4 border-black pb-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
              Business Briefing
            </p>

            <h1 className="mt-0.5 font-serif text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Business News
            </h1>
          </div>

          <span className="pb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            {newStories.length + earlierCount} stories
          </span>
        </header>


        {/* =================================================
            TOP STORIES - every headline is from the newest edition.
            Same boxed newsroom grid as the homepage.
        ================================================= */}

        <section
          aria-label="Top business stories"
          className="mb-20 border border-[#4a4a4a] bg-[#4a4a4a]"
        >
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
            {newStories.map((story, index) => (
              <NewsroomCard
                key={story.id}
                story={story}
                also={newStories[(index + 1) % newStories.length]}
              />
            ))}

            {/* NUMBERS AT A GLANCE */}

            <div className="bg-white p-7 sm:col-span-2 lg:col-span-1">
              <div className="mb-5 border-b-2 border-black pb-3">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.16em]">
                  Numbers at a Glance
                </h3>
                <span className="text-[9px] text-gray-400">
                  {octEditionMeta.edition} · {octEditionMeta.date}
                </span>
              </div>

              <ul className="divide-y divide-[#4a4a4a]">
                {octEditionGlance.map((item) => (
                  <li key={item.indicator} className="py-3.5">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.1em] text-gray-500">
                      {item.indicator}
                    </span>
                    <span className="block text-[14px] font-extrabold text-gray-900">
                      {item.figure}
                      <span className="ml-2 text-[9px] font-normal text-gray-400">
                        {item.source}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ADVERTISEMENT */}

        <div className="mb-20">
          <AdSpace />
        </div>


        {/* =================================================
            EARLIER BUSINESS NEWS - nothing is removed; it opens on demand
        ================================================= */}

        <section
          aria-label="Earlier business articles"
          className="mb-20 border-y border-[#4a4a4a] py-10 text-center"
        >
          <button
            type="button"
            onClick={() => setShowOlder((open) => !open)}
            aria-expanded={showOlder}
            className="rounded-full border border-[#4a4a4a] px-6 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-800 transition-colors hover:border-red-600 hover:text-red-600"
          >
            {showOlder ? "Hide older articles" : "More articles"}
          </button>

          <p className="mt-2 text-[10px] text-gray-400">
            {earlierCount} earlier business stories: headlines, corporate
            strategy, the startup economy, earnings and deals
          </p>
        </section>

        {showOlder && (
          <>
            <section className="mb-20">
              <SectionHeader
                title="Earlier Headlines"
                meta={`${earlierHeadlines.length} stories`}
              />

              <div className="divide-y divide-[#4a4a4a]">
                {earlierHeadlines.map((story, i) => (
                  <FeedRow key={story.id} story={story} index={i} />
                ))}
              </div>
            </section>

            <section className="mb-20">
              <SectionHeader
                title="Corporate Strategy"
                meta={`${corporateNews.length} stories`}
              />

              <div className="divide-y divide-[#4a4a4a]">
                {corporateNews.map((story, i) => (
                  <FeedRow key={story.id} story={story} index={i} />
                ))}
              </div>
            </section>

            <section className="mb-20">
              <SectionHeader
                title="The Startup Economy"
                meta={`${startupNews.length} stories`}
              />

              <div className="divide-y divide-[#4a4a4a]">
                {startupNews.map((story, i) => (
                  <FeedRow key={story.id} story={story} index={i} />
                ))}
              </div>
            </section>

            {/* EARNINGS + DEALS TABLES */}

            <section className="mb-20 space-y-5 border-t-2 border-black pt-10">

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
          </>
        )}


        {/* SECOND ADVERTISEMENT */}

        <div className="my-10">
          <AdSpace slot="8042854193" />
        </div>


      </div>
    </div>
  );
}
