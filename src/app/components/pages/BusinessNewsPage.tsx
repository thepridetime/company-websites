import { TimeAgo } from "../../utils/timeAgo";
import { Clock, Briefcase, ChevronRight, Radio } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/* =========================================================
   MASTHEAD BAR
========================================================= */

function Masthead() {
  return (
    <div className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <span className="font-serif text-lg font-bold tracking-tight sm:text-xl">
            The Pride Times
          </span>

          <span className="hidden items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-red-500 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Live
          </span>

          <nav className="hidden items-center gap-4 text-[11px] font-medium text-gray-300 md:flex">
            <span className="cursor-pointer transition-colors hover:text-white">
              Markets
            </span>
            <span className="cursor-pointer transition-colors hover:text-white">
              Technology
            </span>
            <span className="cursor-pointer text-white">
              Businessweek
            </span>
            <span className="cursor-pointer transition-colors hover:text-white">
              Opinion
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden text-[11px] font-semibold text-gray-300 transition-colors hover:text-white sm:block"
          >
            Sign In
          </button>
          <button
            type="button"
            className="rounded-sm bg-red-600 px-3.5 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-red-700"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-2.5">
      <div className="flex items-center gap-2.5">
        <span className="h-3 w-1 shrink-0 bg-red-600" />

        <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-gray-900 md:text-sm">
          {title}
        </h2>
      </div>
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
    <div className="relative w-full overflow-hidden rounded-md border border-gray-200 bg-[#0d1117]">
      <div className="flex min-h-[90px] flex-col items-center justify-center px-4 py-5 text-center">
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.18em] text-red-500">
          Google AdSense
        </span>

        <span className="mt-1 text-sm sm:text-base font-semibold text-white">
          {label}
        </span>

        <span className="mt-1 text-[8px] sm:text-[9px] text-gray-400">
          728 × 90 • Leaderboard
        </span>
      </div>

      <span className="absolute right-1.5 top-1 text-[7px] text-gray-500">
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
    <div className="overflow-hidden rounded-md border border-gray-200">
      <div className="flex items-center justify-between bg-[#faf9f4] px-3 py-2">
        <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-gray-500">
          Businessweek Daily Newsletter
        </span>

        <span className="text-[8px] text-gray-400">Ad</span>
      </div>

      <div className="flex flex-col items-start gap-1.5 bg-black px-4 py-5">
        <span className="inline-flex items-center gap-1 rounded-sm bg-red-600 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-white">
          Free
        </span>

        <p className="text-[13px] leading-[1.4] text-white">
          Fresh perspectives on business, economics, politics and tech —
          straight from The Pride Times Businessweek desk.
        </p>

        <button
          type="button"
          className="mt-2 w-full rounded-sm bg-red-600 py-2 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
        >
          Sign Up Free
        </button>
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
              <div className="flex h-[48px] w-[68px] shrink-0 items-center justify-center rounded-sm bg-gray-100 transition-colors group-hover:bg-red-50">
                <span className="text-[9px] font-bold uppercase text-gray-400 group-hover:text-red-500">
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
  category: "BUSINESSWEEK",
  title: "A $5,000 Bike Shows Why It's Hard to Build in America",
  excerpt:
    "A startup's attempt to build a bicycle almost entirely from US-made parts reveals just how much manufacturing capacity, skilled labor and supply chain depth the country has lost — and how expensive it is to rebuild.",
  author: "Sagar Kumar",
  publishedAt: "2026-09-23T08:19:00Z",
  image:
    "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

const maDeals = [
  {
    id: 1,
    acquirer: "Amazon",
    target: "NuScale Power",
    value: "$12B",
    sector: "Nuclear Energy",
    status: "Announced",
  },
  {
    id: 2,
    acquirer: "Microsoft",
    target: "IonQ",
    value: "$8.7B",
    sector: "Quantum Computing",
    status: "Pending",
  },
  {
    id: 3,
    acquirer: "BlackRock",
    target: "Global Infrastructure Partners",
    value: "$12.5B",
    sector: "Infrastructure",
    status: "Closed",
  },
  {
    id: 4,
    acquirer: "JPMorgan",
    target: "First Republic (Assets)",
    value: "$10.6B",
    sector: "Banking",
    status: "Closed",
  },
  {
    id: 5,
    acquirer: "Reliance",
    target: "Disney India",
    value: "$8.5B",
    sector: "Media / Streaming",
    status: "Closed",
  },
];

const earningsNews = [
  {
    id: 1,
    company: "Apple",
    ticker: "AAPL",
    eps: "$2.45",
    beat: "+12%",
    revenue: "$98.3B",
    status: "BEAT",
  },
  {
    id: 2,
    company: "Microsoft",
    ticker: "MSFT",
    eps: "$3.12",
    beat: "+8%",
    revenue: "$71.2B",
    status: "BEAT",
  },
  {
    id: 3,
    company: "Alphabet",
    ticker: "GOOGL",
    eps: "$2.89",
    beat: "+15%",
    revenue: "$88.3B",
    status: "BEAT",
  },
  {
    id: 4,
    company: "Meta",
    ticker: "META",
    eps: "$6.43",
    beat: "+23%",
    revenue: "$41.5B",
    status: "BEAT",
  },
  {
    id: 5,
    company: "Amazon",
    ticker: "AMZN",
    eps: "$1.91",
    beat: "+5%",
    revenue: "$187.8B",
    status: "BEAT",
  },
  {
    id: 6,
    company: "Intel",
    ticker: "INTC",
    eps: "$0.18",
    beat: "-8%",
    revenue: "$12.4B",
    status: "MISS",
  },
];

const corporateNews = [
  {
    id: 1,
    title:
      "Fender Is Making Enemies With a Messy Fight Over Its Iconic Strat",
    publishedAt: "2026-09-23T09:19:00Z",
    category: "THE BIG TAKE",
  },
  {
    id: 2,
    title:
      "Marco Rubio Remakes Himself as Trump's Unapologetic Global Envoy",
    publishedAt: "2026-09-23T08:44:00Z",
    category: "THE BIG TAKE",
  },
  {
    id: 3,
    title:
      "Why Politicians From the Working Class Are Rare Around the World",
    publishedAt: "2026-09-23T07:19:00Z",
    category: "POLITICS",
  },
  {
    id: 4,
    title: "These Are the Best Business Schools",
    publishedAt: "2026-09-23T06:19:00Z",
    category: "EDUCATION",
  },
  {
    id: 5,
    title:
      "Paramount Settles Lawsuits, Allowing for Warner Bros. Deal",
    publishedAt: "2026-09-23T05:19:00Z",
    category: "MEDIA",
  },
  {
    id: 6,
    title: "The Great Stuff Transfer Has a $750 Billion Golden Lining",
    publishedAt: "2026-09-23T04:19:00Z",
    category: "WEALTH",
  },
];

const startupNews = [
  {
    id: 1,
    title: "AI Is Changing the Business School Case Study",
    publishedAt: "2026-09-23T08:19:00Z",
  },
  {
    id: 2,
    title: "How a Gambling Addict Relapsed After He Discovered Kalshi",
    publishedAt: "2026-09-23T06:19:00Z",
  },
  {
    id: 3,
    title:
      "Chinese Brands Resort to Crude Insults to Hawk LED Signs and Charging Cables",
    publishedAt: "2026-09-23T04:19:00Z",
  },
  {
    id: 4,
    title:
      "The Ex-Beer Baron Turning Windshield Repair Into a $7.8 Billion-a-Year Empire",
    publishedAt: "2026-09-23T02:19:00Z",
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

      <Masthead />

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 md:py-9 lg:px-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="mb-7 border-t-[3px] border-red-600 pb-5 pt-5 md:mb-8">
          <div className="flex items-center gap-3.5">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
              <Briefcase size={19} strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                The Pride Times Businessweek
              </p>

              <h1 className="mt-1 font-serif text-3xl font-bold leading-tight tracking-tight md:text-[42px]">
                Businessweek
              </h1>
            </div>

          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-gray-200 pt-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">
            <span className="cursor-pointer text-red-600">The Big Take</span>
            <span className="cursor-pointer transition-colors hover:text-gray-900">Pursuits</span>
            <span className="cursor-pointer transition-colors hover:text-gray-900">B-Schools</span>
            <span className="cursor-pointer transition-colors hover:text-gray-900">Markets</span>
            <span className="cursor-pointer transition-colors hover:text-gray-900">Politics</span>
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

          <article className="group cursor-pointer">

            <div className="relative overflow-hidden rounded-md">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="h-[240px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:h-[320px] md:h-[390px] lg:h-[420px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90" />

              <span className="absolute left-4 top-4 rounded-sm bg-red-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
                {hero.category}
              </span>
            </div>

            <div className="mt-5">

              <h2 className="max-w-5xl font-serif text-2xl font-bold leading-[1.08] tracking-tight text-gray-950 transition-colors duration-200 group-hover:text-red-600 sm:text-3xl md:text-4xl lg:text-[40px]">
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

            <SponsoredAd />

            <MoreStories stories={corporateNews} />

          </aside>

        </section>


        {/* =================================================
            EARNINGS
        ================================================= */}

        <section className="mt-12 mb-12 md:mt-14">

          <SectionHeader title="Earnings Season" />

          <div className="overflow-x-auto rounded-md border border-gray-200">

            <table className="w-full min-w-[650px] border-collapse text-sm">

              <thead>
                <tr className="border-b-2 border-gray-900 bg-gray-50">
                  <TH className="pl-4">Company</TH>
                  <TH align="right">EPS</TH>
                  <TH align="right">vs Est.</TH>
                  <TH align="right">Revenue</TH>
                  <TH align="right" className="pr-4">Result</TH>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {earningsNews.map((e, i) => (
                  <tr
                    key={e.ticker}
                    className={`transition-colors hover:bg-red-50/40 ${
                      i % 2 === 1 ? "bg-gray-50/50" : ""
                    }`}
                  >

                    <td className="py-3.5 pl-4 pr-4">
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

                    <td className="py-3.5 pl-3 pr-4 text-right">

                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${earningsBadge[e.status]}`}
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

          <div className="overflow-x-auto rounded-md border border-gray-200">

            <table className="w-full min-w-[700px] border-collapse text-sm">

              <thead>
                <tr className="border-b-2 border-gray-900 bg-gray-50">

                  <TH className="pl-4">Acquirer</TH>

                  <TH>Target</TH>

                  <TH align="right">
                    Value
                  </TH>

                  <TH className="hidden md:table-cell">
                    Sector
                  </TH>

                  <TH align="right" className="pr-4">
                    Status
                  </TH>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {maDeals.map((d, i) => (
                  <tr
                    key={d.id}
                    className={`transition-colors hover:bg-red-50/40 ${
                      i % 2 === 1 ? "bg-gray-50/50" : ""
                    }`}
                  >

                    <td className="py-3.5 pl-4 pr-4 font-semibold text-gray-900">
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

                    <td className="py-3.5 pl-3 pr-4 text-right">

                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${dealBadge[d.status]}`}
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
            CORPORATE + IDEAS
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
                    hover:-translate-y-0.5
                    hover:border-red-200
                    hover:shadow-sm
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
              IDEAS & INSIGHT
          ================================================= */}

          <div>

            <SectionHeader title="Ideas & Insight" />

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
                    hover:-translate-y-0.5
                    hover:border-red-200
                    hover:shadow-sm
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
            SECOND ADVERTISEMENT
        ================================================= */}

        <div className="my-12 md:my-14">
          <AdSpace label="Business Solutions | Powered by The Pride Times" />
        </div>


        {/* =================================================
            SPONSORED EVENTS
        ================================================= */}

        <section className="rounded-md border border-gray-100 bg-gray-50 p-4 sm:p-5">

          <div className="mb-4 flex items-center gap-2">

            <span className="rounded-sm border border-gray-200 bg-white px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-gray-500">
              Sponsorship
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
                className="flex min-h-[90px] flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-sm"
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

        <section className="mt-6 rounded-md bg-black px-5 py-8 text-center sm:px-8 md:py-10">

          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
            <Radio size={17} className="text-white" strokeWidth={1.75} />
          </div>

          <h2 className="font-serif text-xl font-bold text-white md:text-2xl">
            Stay Ahead with The Pride Times
          </h2>

          <p className="mt-2 text-xs text-gray-300 md:text-sm">
            Daily briefings on Businessweek delivered to your inbox.
          </p>

          <div className="mx-auto mt-5 flex max-w-lg flex-col gap-2 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email"
              className="h-10 flex-1 rounded-sm border border-gray-700 bg-white/5 px-3 text-xs text-white outline-none placeholder:text-gray-500 focus:border-red-500"
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
