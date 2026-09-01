import { Clock, Briefcase } from "lucide-react";
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
   DATA
========================================================= */

const hero = {
  category: "CORPORATE STRATEGY",
  title:
    "The Great Corporate AI Arms Race: How Fortune 500 Companies Are Spending $2.3 Trillion to Win the Intelligence Economy",
  excerpt:
    "Microsoft, Google, Amazon, Meta and Apple have collectively committed $2.3 trillion in AI investment through 2030. Every sector — from banking to retail, healthcare to manufacturing — is being redrawn. The companies that win this race will dominate the 21st century economy.",
  author: "Sagar Kumar",
  time: "2 hours ago",
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
      "LVMH Posts €21B Revenue — Luxury Demand Defies Global Economic Uncertainty",
    time: "1 hr ago",
    category: "LUXURY",
  },
  {
    id: 2,
    title:
      "Walmart Launches AI-Powered Supply Chain Platform — 50,000 Suppliers Enrolled",
    time: "2 hrs ago",
    category: "RETAIL",
  },
  {
    id: 3,
    title:
      "Saudi Aramco Overtakes Apple as World's Most Profitable Company in Q1 2026",
    time: "3 hrs ago",
    category: "ENERGY",
  },
  {
    id: 4,
    title:
      "Boeing's 737 MAX Returns to Full Delivery Schedule After 18-Month Production Fix",
    time: "4 hrs ago",
    category: "AEROSPACE",
  },
  {
    id: 5,
    title:
      "Reliance Jio Surpasses 500 Million Subscribers — World's Largest Telecom by Users",
    time: "5 hrs ago",
    category: "TELECOM",
  },
  {
    id: 6,
    title:
      "Goldman Sachs CEO David Solomon Takes Personal Pay Cut After Criticism of $30B Losses",
    time: "6 hrs ago",
    category: "BANKING",
  },
];

const startupNews = [
  {
    id: 1,
    title:
      "Anthropic Raises $4B Series E at $40B Valuation — AI Safety Startup Now Among World's Most Valuable",
    time: "2 hrs ago",
  },
  {
    id: 2,
    title:
      "Indian SaaS Startup Freshworks Acquires Two US Companies in $1.2B Deal",
    time: "4 hrs ago",
  },
  {
    id: 3,
    title:
      "Rapido Raises $250M as India's Bike-Taxi Market Explodes to 50M Monthly Rides",
    time: "6 hrs ago",
  },
  {
    id: 4,
    title:
      "SpaceX Valuation Hits $350B — Overtakes Boeing and Airbus Combined",
    time: "8 hrs ago",
  },
];

/* =========================================================
   STATUS BADGE HELPERS
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-5 mb-10">
          <div className="flex items-center gap-3.5">

            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black text-white shrink-0">
              <Briefcase size={19} strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                Corporate Intelligence
              </p>

              <h1 className="mt-1 font-serif text-3xl md:text-[42px] font-bold tracking-tight leading-tight">
                Business News
              </h1>
            </div>

          </div>
        </header>


        {/* =================================================
            HERO STORY
        ================================================= */}

        <article className="group cursor-pointer mb-14">

          <div className="overflow-hidden rounded-md relative">
            <ImageWithFallback
              src={hero.image}
              alt={hero.title}
              className="w-full h-[240px] sm:h-[320px] md:h-[390px] lg:h-[460px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90" />
          </div>

          <div className="mt-5 max-w-5xl">

            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
              {hero.category}
            </span>

            <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold leading-[1.08] tracking-tight text-gray-950 transition-colors duration-200 group-hover:text-red-600">
              {hero.title}
            </h2>

            <p className="mt-4 max-w-4xl text-sm md:text-base lg:text-[17px] leading-[1.75] text-gray-600">
              {hero.excerpt}
            </p>

            <div className="mt-5 pt-4 border-t border-gray-200 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">

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
        </article>


        {/* =================================================
            EARNINGS
        ================================================= */}

        <section className="mb-14">

          <SectionHeader title="Earnings Season" />

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-sm border-collapse">

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

                      <span className="ml-1.5 text-gray-400 text-xs">
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

        <section className="mb-14">

          <SectionHeader title="M&A Tracker" />

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-sm border-collapse">

              <thead>
                <tr className="border-b-2 border-gray-900">
                  <TH>Acquirer</TH>
                  <TH>Target</TH>
                  <TH align="right">Value</TH>
                  <TH className="hidden md:table-cell">
                    Sector
                  </TH>
                  <TH align="right">Status</TH>
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

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t-2 border-black pt-10">

          {/* =================================================
              CORPORATE NEWS
          ================================================= */}

          <div>

            <SectionHeader title="Corporate News" />

            {/* Each news item now has:
                - Border on all 4 sides
                - Slight rounded corners
                - Separate spacing
                - Subtle hover background
            */}

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
                      md:text-[15px]
                      font-semibold
                      leading-[1.5]
                      text-gray-900
                      transition-colors
                      duration-200
                      group-hover:text-red-600
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

                </article>

              ))}

            </div>
          </div>


          {/* =================================================
              STARTUPS & VENTURE
          ================================================= */}

          <div>

            <SectionHeader title="Startups & Venture" />

            {/* Each startup story has the same subtle
                4-side border and rounded treatment.
            */}

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
                      md:text-[15px]
                      font-semibold
                      leading-[1.5]
                      text-gray-900
                      transition-colors
                      duration-200
                      group-hover:text-red-600
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

                </article>

              ))}

            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
