import { useEffect } from "react";
import type { ReactNode } from "react";
import { Clock, Briefcase } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  hero,
  maDeals,
  earningsNews,
  corporateNews,
  startupNews,
} from "../../data/businessNewsData";

/* =========================================================
   NEW IMAGES (company-websites/src/imports)
========================================================= */
import businessStockDrop from "../../../imports/business-stock-drop.png";
import businessAviationJet from "../../../imports/business-aviation-jet.png";
import businessJioDigital from "../../../imports/business-jio-digital.png";
import businessGoldmanNyse from "../../../imports/business-goldman-nyse.png";

// Hero image
const heroImage = businessStockDrop;

// "More Stories" sidebar images (in order of the 3 stories)
const moreStoryImages = [
  businessAviationJet,
  businessJioDigital,
  businessGoldmanNyse,
];

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-5">
      <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />

      <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.16em] text-gray-900">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   REAL GOOGLE ADSENSE
   Existing Pride Times publisher + slots are preserved.
========================================================= */
type AdSenseWindow = Window & { adsbygoogle?: unknown[] };

function AdSpace({
  slot = "5373718974",
  inArticle = false,
}: {
  slot?: "5373718974" | "8042854193";
  inArticle?: boolean;
}) {
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
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-4">
      <p className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        Advertisement
      </p>

      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: inArticle ? "120px" : "90px" }}
        data-ad-client="ca-pub-2331501617441941"
        data-ad-slot={slot}
        {...(inArticle
          ? { "data-ad-layout": "in-article", "data-ad-format": "fluid" }
          : { "data-ad-format": "auto", "data-full-width-responsive": "true" })}
      />
    </div>
  );
}

function SidebarAd() {
  return <AdSpace slot="5373718974" />;
}

/* =========================================================
   MORE STORIES SIDEBAR
========================================================= */

function MoreStories({
  stories,
}: {
  stories: {
    id: string;
    title: string;
    time: string;
    category?: string;
  }[];
}) {
  return (
    <div className="mt-5">
      <div className="border-b-2 border-black pb-2">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.08em]">
          More Stories
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {stories.slice(0, 3).map((story, index) => (
          <Link
            key={story.id}
            to={`/article/${story.id}`}
            className="group block py-3"
          >
            <div className="flex gap-3">
              <div className="flex h-[48px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-sm bg-gray-100">
                <ImageWithFallback
                  src={moreStoryImages[index]}
                  alt={story.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                {story.category && (
                  <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-red-600">
                    {story.category}
                  </span>
                )}

                <h4 className="mt-1 text-[11px] sm:text-xs font-semibold leading-[1.35] text-gray-900 transition-colors group-hover:text-red-600">
                  {story.title}
                </h4>

                <span className="mt-1 flex items-center gap-1 text-[9px] text-gray-400">
                  <Clock size={9} />
                  {story.time}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGES
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

/* =========================================================
   TABLE HEADER
========================================================= */

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
    className={`py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 ${
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
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 md:py-9 lg:px-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-5 mb-7 md:mb-8">
          <div className="flex items-center gap-3.5">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
              <Briefcase size={19} strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                Business Briefing
              </p>

              <h1 className="mt-1 font-serif text-3xl font-bold leading-tight tracking-tight md:text-[42px]">
                Business News
              </h1>
            </div>

          </div>
        </header>


        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <div className="mb-7 md:mb-9">
          <AdSpace />
        </div>


        {/* =================================================
            HERO + SIDEBAR
        ================================================= */}

        <section className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_245px] lg:gap-6">

          {/* =================================================
              HERO STORY
          ================================================= */}

          <Link to={`/article/${hero.id}`} className="group block">

            <div className="relative overflow-hidden rounded-md">
              <ImageWithFallback
                src={heroImage}
                alt={hero.title}
                className="h-[240px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:h-[320px] md:h-[390px] lg:h-[420px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90" />
            </div>

            <div className="mt-5">

              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">
                {hero.category}
              </span>

              <h2 className="mt-2 max-w-5xl font-serif text-2xl font-bold leading-[1.08] tracking-tight text-gray-950 transition-colors duration-200 group-hover:text-red-600 sm:text-3xl md:text-4xl lg:text-[40px]">
                {hero.title}
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-[1.7] text-gray-600 md:text-base">
                {hero.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-200 pt-4 text-xs text-gray-400">

                <span className="font-semibold text-gray-600">
                  By {hero.author}
                </span>

                <span className="h-1 w-1 rounded-full bg-gray-300" />

                <span className="flex items-center gap-1.5">
                  <Clock size={11} strokeWidth={2.25} />
                  {hero.time}
                </span>

              </div>

            </div>
          </Link>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="lg:pt-0">

            <SidebarAd />

            <MoreStories stories={corporateNews.slice(3, 6)} />

          </aside>

        </section>


        {/* =================================================
            EARNINGS
        ================================================= */}

        <section className="mt-12 mb-12 md:mt-14">

          <SectionHeader title="Corporate Earnings: The Numbers Behind the Headlines" />

          <p className="mb-5 max-w-3xl text-sm leading-6 text-gray-500">
            A closer look at quarterly results, revenue trends and the financial signals emerging from major companies.
          </p>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] border-collapse text-sm">

              <thead>
                <tr className="border-b-2 border-gray-900">
                  <TH>Company</TH>
                  <TH align="right">EPS</TH>
                  <TH align="right">vs Est.</TH>
                  <TH align="right">Revenue</TH>
                  <TH align="right">Result</TH>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {earningsNews.map((e) => (
                  <tr
                    key={e.ticker}
                    className="transition-colors hover:bg-gray-50"
                  >

                    <td className="py-3.5 pr-4">
                      <span className="font-semibold text-gray-900">
                        {e.company}
                      </span>

                      <span className="ml-1.5 text-xs text-gray-400">
                        ({e.ticker})
                      </span>
                    </td>

                    <td className="px-3 py-3.5 text-right font-medium tabular-nums text-gray-700">
                      {e.eps}
                    </td>

                    <td
                      className={`px-3 py-3.5 text-right font-bold tabular-nums ${
                        e.status === "BEAT"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {e.beat}
                    </td>

                    <td className="px-3 py-3.5 text-right tabular-nums text-gray-600">
                      {e.revenue}
                    </td>

                    <td className="py-3.5 pl-3 text-right">

                      <span
                        className={`inline-flex rounded-[2px] px-2.5 py-1 text-[10px] font-bold tracking-wide ${earningsBadge[e.status]}`}
                      >
                        {e.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* =================================================
            M&A TRACKER
        ================================================= */}

        <section className="mb-12 md:mb-14">

          <SectionHeader title="Deals &amp; Capital: Where Money Is Moving" />

          <p className="mb-5 max-w-3xl text-sm leading-6 text-gray-500">
            Acquisitions, strategic investments and infrastructure deals reshaping industries and corporate balance sheets.
          </p>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] border-collapse text-sm">

              <thead>
                <tr className="border-b-2 border-gray-900">

                  <TH>Acquirer</TH>

                  <TH>Target</TH>

                  <TH align="right">
                    Value
                  </TH>

                  <TH className="hidden md:table-cell">
                    Sector
                  </TH>

                  <TH align="right">
                    Status
                  </TH>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {maDeals.map((d) => (
                  <tr
                    key={d.id}
                    className="transition-colors hover:bg-gray-50"
                  >

                    <td className="py-3.5 pr-4 font-semibold text-gray-900">
                      {d.acquirer}
                    </td>

                    <td className="px-3 py-3.5 text-gray-600">
                      {d.target}
                    </td>

                    <td className="px-3 py-3.5 text-right font-bold tabular-nums text-gray-900">
                      {d.value}
                    </td>

                    <td className="hidden px-3 py-3.5 text-xs text-gray-500 md:table-cell">
                      {d.sector}
                    </td>

                    <td className="py-3.5 pl-3 text-right">

                      <span
                        className={`inline-flex rounded-[2px] px-2.5 py-1 text-[10px] font-bold tracking-wide ${dealBadge[d.status]}`}
                      >
                        {d.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* =================================================
            CORPORATE + STARTUPS
        ================================================= */}

        <section className="grid grid-cols-1 gap-10 border-t-2 border-black pt-10 md:grid-cols-2">

          {/* =================================================
              CORPORATE NEWS
          ================================================= */}

          <div>

            <SectionHeader title="Inside Corporate Strategy" />

            <p className="mb-5 max-w-3xl text-sm leading-6 text-gray-500">
              The decisions behind expansion, technology adoption, leadership changes and competitive strategy at major companies.
            </p>

            <div className="space-y-3">

              {corporateNews.slice(0, 3).map((n) => (

                <Link
                  key={n.id}
                  to={`/article/${n.id}`}
                  className="
                    group
                    block
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    p-4
                    transition-all
                    duration-200
                    hover:border-gray-300
                    hover:bg-gray-50
                  "
                >

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-600">
                    {n.category}
                  </span>

                  <h3
                    className="
                      mt-1.5
                      text-sm
                      font-semibold
                      leading-[1.5]
                      text-gray-900
                      transition-colors
                      duration-200
                      group-hover:text-red-600
                      md:text-[15px]
                    "
                  >
                    {n.title}
                  </h3>

                  <span
                    className="
                      mt-2
                      flex
                      items-center
                      gap-1.5
                      text-[11px]
                      uppercase
                      tracking-wide
                      text-gray-400
                    "
                  >
                    <Clock size={10} strokeWidth={2.25} />
                    {n.time}
                  </span>

                </Link>

              ))}

            </div>

          </div>


          {/* =================================================
              STARTUPS & VENTURE
          ================================================= */}

          <div>

            <SectionHeader title="The Startup Economy" />

            <p className="mb-5 max-w-3xl text-sm leading-6 text-gray-500">
              Funding rounds, valuations, acquisitions and the founders building the next generation of companies.
            </p>

            <div className="space-y-3">

              {startupNews.map((n) => (

                <Link
                  key={n.id}
                  to={`/article/${n.id}`}
                  className="
                    group
                    block
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    p-4
                    transition-all
                    duration-200
                    hover:border-gray-300
                    hover:bg-gray-50
                  "
                >

                  <h3
                    className="
                      text-sm
                      font-semibold
                      leading-[1.5]
                      text-gray-900
                      transition-colors
                      duration-200
                      group-hover:text-red-600
                      md:text-[15px]
                    "
                  >
                    {n.title}
                  </h3>

                  <span
                    className="
                      mt-2
                      flex
                      items-center
                      gap-1.5
                      text-[11px]
                      uppercase
                      tracking-wide
                      text-gray-400
                    "
                  >
                    <Clock size={10} strokeWidth={2.25} />
                    {n.time}
                  </span>

                </Link>

              ))}

            </div>

          </div>

        </section>


        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <div className="my-12 md:my-14">
          <AdSpace slot="8042854193" inArticle />
        </div>


        {/* =================================================
            SPONSORED EVENTS
        ================================================= */}

        <section className="rounded-md border border-gray-100 bg-gray-50 p-4 sm:p-5">

          <div className="mb-4 flex items-center gap-2">

            <span className="rounded-sm border border-gray-200 bg-white px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-gray-500">
              Industry Events &amp; Executive Briefings
            </span>

            <span className="text-[9px] text-gray-400">
              Presented by our partners
            </span>

          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "Global Finance Summit 2026",
              "Tech Leaders Forum",
              "Energy Transition Conference",
              "AI & Business World",
            ].map((item) => (

              <div
                key={item}
                className="flex min-h-[90px] flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-4 text-center"
              >

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <Briefcase size={13} />
                </div>

                <p className="mt-2 text-[10px] font-bold text-gray-900">
                  {item}
                </p>

                <p className="mt-1 text-[8px] text-gray-400">
                  Sponsored Event
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <section className="mt-6 rounded-md bg-[#071a2d] px-5 py-8 text-center sm:px-8 md:py-10">

          <h2 className="font-serif text-xl font-bold text-white md:text-2xl">
            Stay Ahead with The Pride Times
          </h2>

          <p className="mt-2 text-xs text-gray-300 md:text-sm">
            A concise briefing on companies, markets, capital and the business decisions shaping tomorrow's economy.
          </p>

          <div className="mx-auto mt-5 flex max-w-lg flex-col gap-2 sm:flex-row">

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
