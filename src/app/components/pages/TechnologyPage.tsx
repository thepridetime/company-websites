import { TimeAgo } from "../../utils/timeAgo";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import {
  technologyArticles,
  technologyArticlePath,
  technologyCompanies,
  technologySectionGlance,
  technologyWatchNote,
  regionalSnapshot,
} from "../../data/technologyNewsData";
import { PrideTimesAd } from "../AdSenseSlots";

/* =========================================================
   HELPERS
========================================================= */

/* Resize an Unsplash image URL for the slot it is used in. */
function sized(url: string, width: number) {
  return url.replace(/w=\d+/, `w=${width}`);
}

/* Sidebar tag colours, keyed by article category. */
const tagStyles: Record<string, string> = {
  "ENTERPRISE AI": "bg-purple-600 text-white",
  CYBERSECURITY: "bg-red-600 text-white",
  "ENTERPRISE SOFTWARE": "bg-blue-600 text-white",
  "DATA CENTRES": "bg-amber-400 text-black",
  SEMICONDUCTORS: "bg-emerald-600 text-white",
  "TECH POLICY": "bg-slate-800 text-white",
};

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  id,
}: {
  title: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className="flex items-center justify-between border-b-2 border-[#17140F] pb-2.5 mb-5"
    >
      <h2 className="font-serif text-[21px] md:text-[24px] font-bold text-[#17140F]">
        {title}
      </h2>

      <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-red-600 transition-colors">
        See All
        <ChevronRight size={12} />
      </button>
    </div>
  );
}

/* =========================================================
   LISTING DATA
   Every story appears once on this page:
   - Hero            -> story 1
   - More Stories    -> stories 2-3 (text only)
   - Latest grid     -> stories 4-6 (image cards)
========================================================= */

const [leadStory, ...otherStories] = technologyArticles;
const sidebarStories = otherStories.slice(0, 2);
const latestStories = otherStories.slice(2);

const sponsorships = [
  "AI & Business World",
  "Global Technology Forum",
  "Future Infrastructure Summit",
  "Enterprise AI Leadership Forum",
];

/* =========================================================
   PAGE
========================================================= */

export function TechnologyPage() {
  return (
    <main className="w-full bg-white text-[#17140F] antialiased">

      {/* =====================================================
          MAIN FULL WIDTH CONTAINER
      ===================================================== */}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">

        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <header className="pt-5 md:pt-7 pb-4">
          <div className="border-t-[3px] border-red-600 pt-4">

            <h1 className="font-serif text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] font-bold leading-none">
              Technology
            </h1>

            <p className="mt-2 text-[12px] md:text-[13px] text-[#77736D]">
              Platforms, semiconductors, cloud infrastructure and the
              enterprise race to deploy AI.
            </p>

          </div>
        </header>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <div className="my-4 md:my-5">
          <PrideTimesAd variant="first" />
        </div>

        {/* =================================================
            MAIN HERO + MORE STORIES
        ================================================= */}

        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,3.25fr)_minmax(280px,1fr)] gap-5 lg:gap-7 mt-4 md:mt-6">

          {/* =================================================
              MAIN HERO  (IMAGE SLOT 1)
          ================================================= */}

          <Link
            to={technologyArticlePath(leadStory.id)}
            className="group block"
          >

            <div className="overflow-hidden rounded-lg bg-gray-100">

              <ImageWithFallback
                src={sized(leadStory.image, 1400)}
                alt={leadStory.title}
                className="w-full h-[260px] sm:h-[350px] md:h-[440px] lg:h-[500px] xl:h-[520px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />

            </div>

            <div className="pt-3">

              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
                {leadStory.category}
              </span>

              <h2 className="mt-1.5 font-serif text-[25px] sm:text-[29px] md:text-[33px] lg:text-[36px] xl:text-[38px] font-bold leading-[1.08] tracking-tight text-[#17140F] group-hover:text-red-600 transition-colors">
                {leadStory.title}
              </h2>

              <p className="mt-2.5 text-[12px] md:text-[13px] lg:text-[14px] leading-[1.6] text-[#66625D] max-w-[1100px]">
                {leadStory.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px] text-gray-400">

                <span className="font-medium text-gray-500">
                  By {leadStory.author}
                </span>

                <span className="h-3 w-px bg-gray-300" />

                <span className="flex items-center gap-1.5">
                  <Clock size={9} />
                  <TimeAgo iso={leadStory.publishedAt} />
                </span>

                {leadStory.readTime && (
                  <>
                    <span className="h-3 w-px bg-gray-300" />
                    <span>{leadStory.readTime}</span>
                  </>
                )}

              </div>

            </div>

          </Link>

          {/* =================================================
              RIGHT SIDEBAR (TEXT ONLY — NO IMAGES)
          ================================================= */}

          <aside className="xl:border-l xl:border-gray-300 xl:pl-6">

            {/* REAL ADSENSE */}

            <div className="mb-5">
              <PrideTimesAd variant="second" />
            </div>

            {/* MORE STORIES */}

            <div className="border-b-2 border-[#17140F] pb-2 mb-1">

              <h3 className="font-bold text-[14px] uppercase tracking-wide">
                More Stories
              </h3>

            </div>

            <div className="divide-y divide-gray-200">

              {sidebarStories.map((story) => (

                <Link
                  key={story.id}
                  to={technologyArticlePath(story.id)}
                  className="block py-3 group"
                >

                  <span
                    className={`inline-block text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 ${
                      tagStyles[story.category] ?? "bg-amber-400 text-black"
                    }`}
                  >
                    {story.category}
                  </span>

                  <h4 className="mt-1.5 text-[11px] md:text-[12px] font-bold leading-[1.35] text-gray-900 group-hover:text-red-600 transition-colors">
                    {story.title}
                  </h4>

                  <span className="flex items-center gap-1 mt-1 text-[8px] text-gray-400">
                    <Clock size={8} />
                    <TimeAgo iso={story.publishedAt} />
                  </span>

                </Link>

              ))}

            </div>

          </aside>

        </section>

        {/* =================================================
            LATEST TECHNOLOGY NEWS  (IMAGE SLOTS 2-4)
        ================================================= */}

        <section className="mt-12 md:mt-14">

          <SectionHeader title="Latest Technology News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 lg:gap-x-7 gap-y-8">

            {latestStories.map((story) => (

              <Link
                key={story.id}
                to={technologyArticlePath(story.id)}
                className="group block"
              >

                <div className="overflow-hidden rounded-md bg-gray-100">

                  <ImageWithFallback
                    src={sized(story.image, 700)}
                    alt={story.title}
                    className="w-full h-[180px] sm:h-[190px] md:h-[205px] lg:h-[215px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                </div>

                <div className="pt-2.5">

                  <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-red-600">
                    {story.category}
                  </span>

                  <h3 className="mt-1.5 font-serif text-[17px] md:text-[18px] font-bold leading-[1.18] text-[#17140F] group-hover:text-red-600 transition-colors">
                    {story.title}
                  </h3>

                  <p className="mt-1.5 text-[12px] leading-[1.55] text-[#66625D] line-clamp-3">
                    {story.excerpt}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2 text-[9px] text-gray-400">

                    <Clock size={8} />

                    <TimeAgo iso={story.publishedAt} />

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <div className="my-10 md:my-12">
          <PrideTimesAd variant="fifth" />
        </div>

        {/* =================================================
            SPONSORSHIP
        ================================================= */}

        <section className="bg-[#F7F7F5] rounded-lg border border-gray-100 p-4 md:p-5 mb-10">

          <div className="mb-4">

            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-500 border border-gray-200 bg-white px-2 py-1 rounded-sm">
              Sponsorship
            </span>

            <span className="ml-2 text-[9px] text-gray-400">
              Presented by our partners
            </span>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {sponsorships.map((item) => (

              <div
                key={item}
                className="bg-white border border-gray-200 rounded-md min-h-[90px] flex flex-col items-center justify-center text-center px-3"
              >

                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mb-2">

                  <span className="text-red-500 text-sm font-bold">
                    ✦
                  </span>

                </div>

                <p className="text-[10px] md:text-[11px] font-bold text-gray-900">
                  {item}
                </p>

                <p className="text-[8px] text-gray-400 mt-1">
                  Sponsored Event
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* =================================================
            COMPANIES IN FOCUS + TECHNOLOGY WATCH
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-8 md:gap-10 border-t-2 border-black pt-8 mb-12">

          <div>

            <SectionHeader title="Companies in Focus" />

            <div className="divide-y divide-gray-200">

              {technologyCompanies.map((item) => (

                <Link
                  key={item.articleId}
                  to={technologyArticlePath(item.articleId)}
                  className="py-4 first:pt-0 flex items-center justify-between gap-4 group"
                >

                  <div className="min-w-0">

                    <p className="text-[13px] md:text-[14px] font-semibold group-hover:text-red-600 transition-colors">
                      {item.company}
                    </p>

                    <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">
                      {item.location}
                    </p>

                  </div>

                  <div className="text-right shrink-0">

                    <p className="text-[12px] md:text-[13px] font-semibold">
                      {item.headline}
                    </p>

                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {item.detail}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          </div>

          {/* TECHNOLOGY WATCH */}

          <aside className="lg:border-l lg:border-gray-300 lg:pl-7">

            <div className="border-b-2 border-black pb-2 mb-4">

              <h3 className="font-bold text-[13px] uppercase tracking-wide">
                Technology Watch
              </h3>

            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-md p-5">

              <h4 className="font-bold text-[13px] leading-[1.35]">
                {technologyWatchNote.title}
              </h4>

              <p className="text-[12px] leading-[1.65] text-gray-600 mt-3">
                {technologyWatchNote.body}
              </p>

            </div>

          </aside>

        </section>

        {/* =================================================
            TECHNOLOGY MARKET WATCH (SECTION AT A GLANCE)
        ================================================= */}

        <section className="mb-12">

          <SectionHeader title="Technology Market Watch" />

          <div className="overflow-x-auto border border-gray-200 rounded-md">

            <table className="w-full min-w-[520px] border-collapse">

              <thead>

                <tr className="border-b-2 border-black">

                  <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Theme
                  </th>

                  <th className="text-left px-3 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Momentum
                  </th>

                  <th className="text-right px-4 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Outlook
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {technologySectionGlance.map((item) => (

                  <tr
                    key={item.theme}
                    className="hover:bg-gray-50 transition-colors"
                  >

                    <td className="px-4 py-3.5 text-[12px] font-semibold">
                      {item.theme}
                    </td>

                    <td className="px-3 py-3.5 text-[12px] text-gray-600">
                      {item.momentum}
                    </td>

                    <td className="px-4 py-3.5 text-right">

                      <span className="inline-block bg-gray-100 rounded px-2 py-1 text-[9px] font-bold uppercase text-gray-500">
                        {item.outlook}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =================================================
            REGIONAL SNAPSHOT
        ================================================= */}

        <section className="border-t-2 border-black pt-8 mb-12">

          <SectionHeader title="Regional Market Snapshot" />

          <p className="-mt-2 mb-4 text-[10px] text-gray-400">
            Illustrative regional indicators from this edition.
          </p>

          <div className="overflow-x-auto border border-gray-200 rounded-md">

            <table className="w-full min-w-[640px] border-collapse">

              <thead>

                <tr className="border-b-2 border-black">

                  <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Region
                  </th>

                  <th className="text-left px-3 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Deal Value (US$ bn)
                  </th>

                  <th className="text-left px-3 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Earnings Growth
                  </th>

                  <th className="text-right px-4 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Hiring Outlook
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {regionalSnapshot.map((row) => (

                  <tr
                    key={row.region}
                    className="hover:bg-gray-50 transition-colors"
                  >

                    <td className="px-4 py-3.5 text-[12px] font-semibold">
                      {row.region}
                    </td>

                    <td className="px-3 py-3.5 text-[12px] text-gray-600">
                      {row.dealValue}
                    </td>

                    <td className="px-3 py-3.5 text-[12px] text-gray-600">
                      {row.earnings}
                    </td>

                    <td className="px-4 py-3.5 text-right">

                      <span className="inline-block bg-gray-100 rounded px-2 py-1 text-[9px] font-bold uppercase text-gray-500">
                        {row.hiring}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <section className="bg-[#071A2D] rounded-lg px-5 sm:px-8 md:px-12 py-9 md:py-10 text-center mb-14">

          <h2 className="font-serif text-[24px] md:text-[28px] font-bold text-white">
            Stay Ahead with The Pride Times
          </h2>

          <p className="text-[11px] md:text-[12px] text-gray-300 mt-2">
            Daily briefings on AI platforms, chips, data centres and the global technology economy delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5 max-w-[520px] mx-auto">

            <input
              type="email"
              placeholder="Enter your email"
              className="h-10 flex-1 rounded-md border border-white/10 bg-white/10 px-3 text-[11px] text-white placeholder:text-gray-400 outline-none focus:border-red-500"
            />

            <button className="h-10 px-5 rounded-md bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold transition-colors">
              Subscribe Free
            </button>

          </div>

        </section>

      </div>
    </main>
  );
}

export default TechnologyPage;
