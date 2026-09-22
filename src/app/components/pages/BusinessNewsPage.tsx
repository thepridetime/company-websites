import { TimeAgo } from "../../utils/timeAgo";
import { Clock, Briefcase, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

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
   AD SPACE
========================================================= */

function AdSpace({
  label = "Advertisement Space",
}: {
  label?: string;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-gray-200 bg-gradient-to-r from-[#102b33] via-[#193944] to-[#28596a]">
      <div className="flex min-h-[90px] flex-col items-center justify-center px-4 py-5 text-center">
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.18em] text-sky-300">
          Google AdSense
        </span>

        <span className="mt-1 text-sm sm:text-base font-semibold text-white">
          {label}
        </span>

        <span className="mt-1 text-[8px] sm:text-[9px] text-sky-300">
          728 × 90 • Leaderboard
        </span>
      </div>

      <span className="absolute right-1.5 top-1 text-[7px] text-gray-300">
        Advertisement
      </span>
    </div>
  );
}

/* =========================================================
   SIDEBAR SPONSORED AD
========================================================= */

function SponsoredAd() {
  return (
    <div className="rounded-md border border-gray-200 bg-[#faf9f4] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-gray-500">
          Sponsored Content
        </span>

        <span className="text-[8px] text-gray-400">
          Ad
        </span>
      </div>

      <div className="mx-3 mb-3 flex h-[145px] items-center justify-center bg-[#10162f] px-4 text-center">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-yellow-400">
            Featured Partner
          </p>

          <p className="mt-3 text-base font-semibold text-white">
            Your Ad Here
          </p>

          <p className="mt-2 text-[9px] leading-4 text-gray-300">
            Reach 2M+ business readers
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MORE STORIES SIDEBAR
========================================================= */

function MoreStories({
  stories,
}: {
  stories: {
    title: string;
    publishedAt: string;
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
          <article
            key={`${story.title}-${index}`}
            className="group cursor-pointer py-3"
          >
            <div className="flex gap-3">
              <div className="flex h-[48px] w-[68px] shrink-0 items-center justify-center rounded-sm bg-gray-100">
                <span className="text-[9px] font-bold uppercase text-gray-400">
                  News
                </span>
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
                  <TimeAgo iso={story.publishedAt} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   DATA
========================================================= */

const hero = {
  category: "POLITICS & BUSINESS",
  title:
    "Marco Rubio Remakes Himself as Trump's Unapologetic Global Envoy",
  excerpt:
    "The secretary of state has embraced a more forceful role on the world stage as the Trump administration reshapes US foreign policy.",
  author: "Bloomberg News",
  publishedAt: "2026-09-22T10:00:00Z",
  image:
    "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

const maDeals = [
  {
    id: 1,
    acquirer: "Global Markets",
    target: "The Best Music, TV, Books and Theater",
    value: "—",
    sector: "Culture",
    status: "Featured",
  },
  {
    id: 2,
    acquirer: "Technology",
    target: "The World's Most Reliable AI Detector",
    value: "—",
    sector: "AI",
    status: "Featured",
  },
  {
    id: 3,
    acquirer: "Consumer",
    target: "Fender and the Iconic Strat",
    value: "—",
    sector: "Music",
    status: "Featured",
  },
  {
    id: 4,
    acquirer: "Work",
    target: "America's Favorite Countertops",
    value: "—",
    sector: "Manufacturing",
    status: "Featured",
  },
  {
    id: 5,
    acquirer: "Global Business",
    target: "The New Rules of Washington",
    value: "—",
    sector: "Business",
    status: "Featured",
  },
];

const earningsNews = [
  {
    id: 1,
    company: "Bloomberg Businessweek",
    ticker: "BW",
    eps: "—",
    beat: "FEATURE",
    revenue: "—",
    status: "BEAT",
  },
  {
    id: 2,
    company: "Global Markets",
    ticker: "GLOB",
    eps: "—",
    beat: "FEATURE",
    revenue: "—",
    status: "BEAT",
  },
  {
    id: 3,
    company: "Technology",
    ticker: "TECH",
    eps: "—",
    beat: "FEATURE",
    revenue: "—",
    status: "BEAT",
  },
  {
    id: 4,
    company: "Consumer",
    ticker: "CONS",
    eps: "—",
    beat: "FEATURE",
    revenue: "—",
    status: "BEAT",
  },
  {
    id: 5,
    company: "Work & Society",
    ticker: "WORK",
    eps: "—",
    beat: "FEATURE",
    revenue: "—",
    status: "BEAT",
  },
  {
    id: 6,
    company: "Culture",
    ticker: "CULT",
    eps: "—",
    beat: "FEATURE",
    revenue: "—",
    status: "BEAT",
  },
];

const corporateNews = [
  {
    id: 1,
    title:
      "Why Politicians From the Working Class Are Rare Around the World",
    publishedAt: "2026-09-22T09:30:00Z",
    category: "POLITICS",
  },
  {
    id: 2,
    title:
      "Fender Makes Enemy With Its Melody Fight Over Its Iconic Strat",
    publishedAt: "2026-09-22T08:45:00Z",
    category: "CULTURE",
  },
  {
    id: 3,
    title:
      "The World's Most Reliable AI Detector Has a Human Problem",
    publishedAt: "2026-09-22T08:15:00Z",
    category: "TECHNOLOGY",
  },
  {
    id: 4,
    title:
      "TikTok 'Death Sentences': Crafting America's Favorite Countertops Is Killing Workers",
    publishedAt: "2026-09-22T07:40:00Z",
    category: "WORK",
  },
  {
    id: 5,
    title:
      "The Great Gulf Between the Rich and Everyone Else Is Getting Wider",
    publishedAt: "2026-09-22T07:10:00Z",
    category: "ECONOMY",
  },
  {
    id: 6,
    title:
      "The New Rules of Global Business Are Being Written in Washington",
    publishedAt: "2026-09-22T06:40:00Z",
    category: "GLOBAL BUSINESS",
  },
];

const startupNews = [
  {
    id: 1,
    title:
      "Chinese Brands Resort to Crude Insults to Hawk Legs and Charging Cables",
    publishedAt: "2026-09-22T08:50:00Z",
  },
  {
    id: 2,
    title:
      "The Ex-Bear Baron Turning Washington's Redline Into a $7.8 Billion Empire",
    publishedAt: "2026-09-22T08:05:00Z",
  },
  {
    id: 3,
    title:
      "Hating on Polyester Is Back in Fashion",
    publishedAt: "2026-09-22T07:25:00Z",
  },
  {
    id: 4,
    title:
      "AI Is Changing the Business School Case Study",
    publishedAt: "2026-09-22T06:55:00Z",
  },
];

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
  children: React.ReactNode;
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
                Corporate Intelligence
              </p>

              <h1 className="mt-1 font-serif text-3xl font-bold leading-tight tracking-tight md:text-[42px]">
                Business News
              </h1>
            </div>

          </div>
        </header>


        {/* =================================================
            HERO + SIDEBAR
        ================================================= */}

        <section className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_245px] lg:gap-6">

          {/* =================================================
              HERO STORY
          ================================================= */}

          <article className="group cursor-pointer">

            <div className="relative overflow-hidden rounded-md">
              <ImageWithFallback
                src={hero.image}
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
                  <TimeAgo iso={hero.publishedAt} />
                </span>

              </div>

            </div>
          </article>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="lg:pt-0">

            <MoreStories stories={corporateNews} />

          </aside>

        </section>


        {/* =================================================
            EARNINGS
        ================================================= */}

        <section className="mt-12 mb-12 md:mt-14">

          <SectionHeader title="Earnings Season" />

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

          <SectionHeader title="M&A Tracker" />

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

            <SectionHeader title="Corporate News" />

            <div className="space-y-3">

              {corporateNews.map((n) => (

                <article
                  key={n.id}
                  className="
                    group
                    cursor-pointer
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
                    <TimeAgo iso={n.publishedAt} />
                  </span>

                </article>

              ))}

            </div>

          </div>


          {/* =================================================
              STARTUPS & VENTURE
          ================================================= */}

          <div>

            <SectionHeader title="Startups & Venture" />

            <div className="space-y-3">

              {startupNews.map((n) => (

                <article
                  key={n.id}
                  className="
                    group
                    cursor-pointer
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
                    <TimeAgo iso={n.publishedAt} />
                  </span>

                </article>

              ))}

            </div>

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
            Daily briefings on Business News delivered to your inbox.
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
