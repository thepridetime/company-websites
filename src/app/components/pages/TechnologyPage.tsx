import { TimeAgo } from "../../utils/timeAgo";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, ChevronRight } from "lucide-react";

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
   TECHNOLOGY HERO DATA
========================================================= */

const hero = {
  category: "TECHNOLOGY",
  title: "Pagaya Closes $460 Million Revolving Personal Loan Facility",
  excerpt:
    "Pagaya has closed a $460 million revolving personal loan facility, highlighting continued activity in technology-driven financial services and alternative lending markets.",
  author: "Bloomberg News",
  publishedAt: "2026-09-22T10:00:00Z",
  image:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
};

const hero1 = {
  category: "AI",
  title: "AI Startup Heidi Doubles Valuation to $900 Million in New Round",
  excerpt:
    "AI startup Heidi has raised new funding that doubles its valuation to $900 million, highlighting continued investor interest in artificial intelligence startups.",
  author: "Bloomberg News",
  publishedAt: "2026-09-22T09:30:00Z",
  image:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
};

const hero2 = {
  category: "AI",
  title: "Anthropic CEO Dario Amodei to Brief UN Security Council on AI",
  excerpt:
    "Anthropic CEO Dario Amodei is set to brief the United Nations Security Council on artificial intelligence as governments continue examining the opportunities and risks surrounding advanced AI systems.",
  author: "Bloomberg News",
  publishedAt: "2026-09-22T08:30:00Z",
  image:
    "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=1000&q=80",
};

/* =========================================================
   TECHNOLOGY MORE STORIES
========================================================= */

const threatAlerts = [
  {
    id: 1,
    severity: "TECH",
    title:
      "Data Center Firm Acceleration, Becker Seek $720 Million in IPO",
    publishedAt: "2026-09-22T08:19:00Z",
  },
  {
    id: 2,
    severity: "BUSINESS",
    title:
      "DoorDash to Pay $132 Million to NYC, Workers Over Missing Wages",
    publishedAt: "2026-09-22T07:19:00Z",
  },
  {
    id: 3,
    severity: "TECH",
    title:
      "Peloton Debuts Three New Treadmills, Including $2,195 Foldable Model",
    publishedAt: "2026-09-22T06:19:00Z",
  },
  {
    id: 4,
    severity: "MARKETS",
    title:
      "SoftBank Draws Over $20 Billion of Early Interest in Junk Bond",
    publishedAt: "2026-09-22T05:19:00Z",
  },
  {
    id: 5,
    severity: "AI",
    title:
      "AI Cloud Startup Verda Raises $189 Million in Funding Round",
    publishedAt: "2026-09-22T04:19:00Z",
  },
];

/* =========================================================
   LATEST TECHNOLOGY NEWS
========================================================= */

const stories = [
  {
    id: 1,
    category: "TECHNOLOGY",
    title:
      "Pagaya Closes $460 Million Revolving Personal Loan Facility",
    publishedAt: "2026-09-22T10:00:00Z",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    category: "AI",
    title:
      "AI Startup Heidi Doubles Valuation to $900 Million in New Round",
    publishedAt: "2026-09-22T09:30:00Z",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    category: "AI",
    title:
      "Anthropic CEO Dario Amodei to Brief UN Security Council on AI",
    publishedAt: "2026-09-22T08:30:00Z",
    image:
      "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    category: "DATA CENTERS",
    title:
      "Data Center Firm Acceleration, Becker Seek $720 Million in IPO",
    publishedAt: "2026-09-22T08:00:00Z",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    category: "BUSINESS",
    title:
      "DoorDash to Pay $132 Million to NYC, Workers Over Missing Wages",
    publishedAt: "2026-09-22T07:19:00Z",
    image:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    title:
      "Peloton Debuts Three New Treadmills, Including $2,195 Foldable Model",
    publishedAt: "2026-09-22T06:19:00Z",
    image:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    category: "MARKETS",
    title:
      "SoftBank Draws Over $20 Billion of Early Interest in Junk Bond",
    publishedAt: "2026-09-22T05:19:00Z",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    category: "TECHNOLOGY",
    title:
      "Chinese App Founder Sells $110 Million in Shares to Pay Taxman",
    publishedAt: "2026-09-22T04:30:00Z",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 9,
    category: "AI",
    title:
      "AI Cloud Startup Verda Raises $189 Million in Funding Round",
    publishedAt: "2026-09-22T04:00:00Z",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",
  },
];

/* =========================================================
   TECHNOLOGY & AI
========================================================= */

const aiInfraStories = [
  {
    id: 1,
    title:
      "Chinese App Founder Sells $110 Million in Shares to Pay Taxman",
    publishedAt: "2026-09-22T05:00:00Z",
  },
  {
    id: 2,
    title:
      "AI Cloud Startup Verda Raises $189 Million in Funding Round",
    publishedAt: "2026-09-22T04:00:00Z",
  },
  {
    id: 3,
    title:
      "Trump's Nvidia Deal Turns Armenia Into Surprising AI Hotspot",
    publishedAt: "2026-09-22T03:00:00Z",
  },
  {
    id: 4,
    title:
      "SoftBank Draws Over $20 Billion of Early Interest in Junk Bond",
    publishedAt: "2026-09-22T02:00:00Z",
  },
  {
    id: 5,
    title:
      "Peloton Debuts Three New Treadmills, Including $2,195 Foldable Model",
    publishedAt: "2026-09-22T01:00:00Z",
  },
];

/* =========================================================
   TECHNOLOGY WATCH
========================================================= */

const zeroTrustNote = {
  title: "Technology Watch: The AI Infrastructure Race",
  body:
    "The expansion of artificial intelligence is increasing demand for computing infrastructure, data centers and specialized hardware. Technology companies are balancing rapid AI investment with financing requirements, regulatory scrutiny and the growing cost of operating advanced systems.",
};

/* =========================================================
   TECHNOLOGY MARKET MATRIX
========================================================= */

const responseMatrix = [
  {
    threat: "AI Infrastructure",
    control: "Compute Capacity",
    risk: "Capital Intensity",
    cadence: "Expanding",
  },
  {
    threat: "AI Startups",
    control: "Venture Funding",
    risk: "Valuation Pressure",
    cadence: "Ongoing",
  },
  {
    threat: "Data Centers",
    control: "Power + Capacity",
    risk: "Infrastructure Costs",
    cadence: "High Priority",
  },
  {
    threat: "Cloud Computing",
    control: "Enterprise Demand",
    risk: "Margin Pressure",
    cadence: "Quarterly",
  },
  {
    threat: "Consumer Technology",
    control: "Product Innovation",
    risk: "Demand Shifts",
    cadence: "Emerging",
  },
];

/* =========================================================
   TECHNOLOGY BUSINESS NEWS
========================================================= */

const defenseNews = [
  {
    id: 1,
    title:
      "Pagaya Closes $460 Million Revolving Personal Loan Facility",
    publishedAt: "2026-09-22T10:00:00Z",
  },
  {
    id: 2,
    title:
      "AI Startup Heidi Doubles Valuation to $900 Million in New Round",
    publishedAt: "2026-09-22T09:30:00Z",
  },
  {
    id: 3,
    title:
      "Anthropic CEO Dario Amodei to Brief UN Security Council on AI",
    publishedAt: "2026-09-22T08:30:00Z",
  },
  {
    id: 4,
    title:
      "Data Center Firm Acceleration, Becker Seek $720 Million in IPO",
    publishedAt: "2026-09-22T08:00:00Z",
  },
  {
    id: 5,
    title:
      "Trump's Nvidia Deal Turns Armenia Into Surprising AI Hotspot",
    publishedAt: "2026-09-22T03:00:00Z",
  },
];

/* =========================================================
   TECHNOLOGY STOCKS
========================================================= */

const marketData = [
  {
    company: "Nvidia",
    ticker: "NVDA",
    price: "$184.30",
    change: "+2.4%",
    up: true,
  },
  {
    company: "Microsoft",
    ticker: "MSFT",
    price: "$511.20",
    change: "+1.7%",
    up: true,
  },
  {
    company: "Apple",
    ticker: "AAPL",
    price: "$245.80",
    change: "+0.9%",
    up: true,
  },
  {
    company: "Amazon",
    ticker: "AMZN",
    price: "$231.40",
    change: "-0.4%",
    up: false,
  },
  {
    company: "Meta Platforms",
    ticker: "META",
    price: "$774.60",
    change: "+1.3%",
    up: true,
  },
];

/* =========================================================
   SPONSORSHIP CARDS
========================================================= */

const sponsorships = [
  "Global Finance Summit 2026",
  "Tech Leaders Forum",
  "Energy Transition Conference",
  "AI & Business World",
];

/* =========================================================
   SECONDARY ARTICLE
========================================================= */

function SecondaryArticle({
  data,
}: {
  data: typeof hero1;
}) {
  return (
    <article className="group cursor-pointer">
      <div className="overflow-hidden rounded-md bg-gray-100 mb-3">
        <ImageWithFallback
          src={data.image}
          alt={data.title}
          className="w-full h-[220px] md:h-[260px] lg:h-[300px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-red-600">
        {data.category}
      </span>

      <h2 className="mt-1.5 font-serif text-[20px] md:text-[24px] lg:text-[26px] font-bold leading-[1.12] text-[#17140F] group-hover:text-red-600 transition-colors">
        {data.title}
      </h2>

      <p className="mt-2.5 text-[12px] md:text-[13px] leading-[1.6] text-[#55534C]">
        {data.excerpt}
      </p>

      <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-400">
        <span className="font-medium text-gray-500">
          By {data.author}
        </span>

        <span className="h-3 w-px bg-gray-300" />

        <span className="flex items-center gap-1.5">
          <Clock size={9} />
          <TimeAgo iso={data.publishedAt} />
        </span>
      </div>
    </article>
  );
}

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
              AI, technology companies, startups, data centers, markets and
              the future of business.
            </p>

          </div>
        </header>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <div className="w-full h-[70px] md:h-[78px] bg-[#17313A] flex items-center justify-center my-4 md:my-5 relative overflow-hidden">

          <div className="text-center text-white">

            <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-300">
              GOOGLE ADSENSE
            </p>

            <p className="mt-1 text-[13px] md:text-[15px] font-semibold">
              Advertisement Space
            </p>

            <p className="mt-0.5 text-[8px] text-cyan-200">
              728 × 90 • Leaderboard
            </p>

          </div>

          <span className="absolute top-1 right-1 text-[7px] bg-white/80 text-gray-500 px-1.5 py-0.5">
            Advertisement
          </span>

        </div>

        {/* =================================================
            MAIN HERO + MORE STORIES
        ================================================= */}

        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,3.25fr)_minmax(280px,1fr)] gap-5 lg:gap-7 mt-4 md:mt-6">

          {/* =================================================
              MAIN HERO
          ================================================= */}

          <article className="group cursor-pointer">

            <div className="overflow-hidden rounded-lg bg-gray-100">

              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-[260px] sm:h-[350px] md:h-[440px] lg:h-[500px] xl:h-[520px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />

            </div>

            <div className="pt-3">

              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
                {hero.category}
              </span>

              <h2 className="mt-1.5 font-serif text-[25px] sm:text-[29px] md:text-[33px] lg:text-[36px] xl:text-[38px] font-bold leading-[1.08] tracking-tight text-[#17140F] group-hover:text-red-600 transition-colors">
                {hero.title}
              </h2>

              <p className="mt-2.5 text-[12px] md:text-[13px] lg:text-[14px] leading-[1.6] text-[#66625D] max-w-[1100px]">
                {hero.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px] text-gray-400">

                <span className="font-medium text-gray-500">
                  By {hero.author}
                </span>

                <span className="h-3 w-px bg-gray-300" />

                <span className="flex items-center gap-1.5">
                  <Clock size={9} />
                  <TimeAgo iso={hero.publishedAt} />
                </span>

              </div>

            </div>

          </article>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="xl:border-l xl:border-gray-300 xl:pl-6">

            {/* SPONSORED BOX */}

            <div className="border border-gray-200 rounded-md overflow-hidden mb-5">

              <div className="px-3 py-2 bg-[#F7F4EC]">

                <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-gray-500">
                  Sponsored Content
                </span>

              </div>

              <div className="h-[150px] md:h-[170px] bg-[#101731] flex items-center justify-center text-center px-4">

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                    Featured Partner
                  </p>

                  <p className="text-white text-[14px] font-semibold mt-2">
                    Your Ad Here
                  </p>

                  <p className="text-gray-300 text-[9px] mt-1">
                    Reach 2M+ business readers
                  </p>

                </div>

              </div>

            </div>

            {/* MORE STORIES */}

            <div className="border-b-2 border-[#17140F] pb-2 mb-1">

              <h3 className="font-bold text-[14px] uppercase tracking-wide">
                More Stories
              </h3>

            </div>

            <div className="divide-y divide-gray-200">

              {threatAlerts.slice(0, 4).map((story) => (

                <article
                  key={story.id}
                  className="py-3 group cursor-pointer"
                >

                  <span
                    className={`inline-block text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 ${
                      story.severity === "TECH"
                        ? "bg-blue-600 text-white"
                        : story.severity === "AI"
                        ? "bg-purple-600 text-white"
                        : story.severity === "BUSINESS"
                        ? "bg-red-600 text-white"
                        : "bg-amber-400 text-black"
                    }`}
                  >
                    {story.severity}
                  </span>

                  <h4 className="mt-1.5 text-[11px] md:text-[12px] font-bold leading-[1.35] text-gray-900 group-hover:text-red-600 transition-colors">
                    {story.title}
                  </h4>

                  <span className="flex items-center gap-1 mt-1 text-[8px] text-gray-400">
                    <Clock size={8} />
                    <TimeAgo iso={story.publishedAt} />
                  </span>

                </article>

              ))}

            </div>

          </aside>

        </section>

        {/* =================================================
            LATEST TECHNOLOGY NEWS
        ================================================= */}

        <section className="mt-12 md:mt-14">

          <SectionHeader title="Latest Technology News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 lg:gap-x-7 gap-y-8">

            {stories.map((story) => (

              <article
                key={story.id}
                className="group cursor-pointer"
              >

                <div className="overflow-hidden rounded-md bg-gray-100">

                  <ImageWithFallback
                    src={story.image}
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

                  <div className="flex items-center gap-1.5 mt-2 text-[9px] text-gray-400">

                    <Clock size={8} />

                    <TimeAgo iso={story.publishedAt} />

                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <div className="w-full h-[68px] md:h-[76px] bg-[#17313A] flex items-center justify-center my-10 md:my-12 relative">

          <div className="text-center text-white">

            <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-cyan-300">
              GOOGLE ADSENSE
            </p>

            <p className="mt-1 text-[12px] md:text-[14px] font-semibold">
              Business Solutions | Powered by The Pride Times
            </p>

            <p className="text-[8px] text-cyan-200 mt-0.5">
              728 × 90 • Leaderboard
            </p>

          </div>

          <span className="absolute top-1 right-1 text-[7px] bg-white/80 text-gray-500 px-1.5 py-0.5">
            Advertisement
          </span>

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
            TECHNOLOGY & AI
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-8 md:gap-10 border-t-2 border-black pt-8 mb-12">

          <div>

            <SectionHeader title="Technology & AI" />

            <div className="divide-y divide-gray-200">

              {aiInfraStories.map((story) => (

                <article
                  key={story.id}
                  className="py-4 first:pt-0 group cursor-pointer"
                >

                  <p className="text-[13px] md:text-[14px] font-semibold leading-[1.5] text-gray-900 group-hover:text-red-600 transition-colors">
                    {story.title}
                  </p>

                  <span className="flex items-center gap-1.5 mt-1.5 text-[9px] text-gray-400">

                    <Clock size={8} />

                    <TimeAgo iso={story.publishedAt} />

                  </span>

                </article>

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
                {zeroTrustNote.title}
              </h4>

              <p className="text-[12px] leading-[1.65] text-gray-600 mt-3">
                {zeroTrustNote.body}
              </p>

            </div>

          </aside>

        </section>

        {/* =================================================
            TECHNOLOGY MARKET WATCH
        ================================================= */}

        <section className="mb-12">

          <SectionHeader title="Technology Market Watch" />

          <div className="overflow-x-auto border border-gray-200 rounded-md">

            <table className="w-full min-w-[720px] border-collapse">

              <thead>

                <tr className="border-b-2 border-black">

                  <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Technology
                  </th>

                  <th className="text-left px-3 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Driver
                  </th>

                  <th className="text-left px-3 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Market Risk
                  </th>

                  <th className="text-right px-4 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Outlook
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {responseMatrix.map((item) => (

                  <tr
                    key={item.threat}
                    className="hover:bg-gray-50 transition-colors"
                  >

                    <td className="px-4 py-3.5 text-[12px] font-semibold">
                      {item.threat}
                    </td>

                    <td className="px-3 py-3.5 text-[12px] text-gray-600">
                      {item.control}
                    </td>

                    <td className="px-3 py-3.5 text-[11px] text-gray-500">
                      {item.risk}
                    </td>

                    <td className="px-4 py-3.5 text-right">

                      <span className="inline-block bg-gray-100 rounded px-2 py-1 text-[9px] font-bold uppercase text-gray-500">
                        {item.cadence}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =================================================
            TECHNOLOGY BUSINESS + STOCKS
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 border-t-2 border-black pt-8 mb-12">

          {/* TECHNOLOGY BUSINESS */}

          <div>

            <SectionHeader title="Technology Business" />

            <div className="divide-y divide-gray-200">

              {defenseNews.map((item) => (

                <article
                  key={item.id}
                  className="py-4 first:pt-0 group cursor-pointer"
                >

                  <h3 className="text-[13px] md:text-[14px] font-semibold leading-[1.45] group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>

                  <span className="flex items-center gap-1.5 mt-1.5 text-[9px] text-gray-400">

                    <Clock size={8} />

                    <TimeAgo iso={item.publishedAt} />

                  </span>

                </article>

              ))}

            </div>

          </div>

          {/* TECHNOLOGY STOCKS */}

          <div>

            <SectionHeader title="Technology Stocks" />

            <div className="divide-y divide-gray-200">

              {marketData.map((stock) => (

                <div
                  key={stock.ticker}
                  className="py-4 first:pt-0 flex items-center justify-between"
                >

                  <div>

                    <p className="text-[13px] md:text-[14px] font-semibold">
                      {stock.company}
                    </p>

                    <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">
                      {stock.ticker}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-[13px] font-semibold">
                      {stock.price}
                    </p>

                    <p
                      className={`text-[10px] font-bold mt-0.5 ${
                        stock.up
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {stock.change}
                    </p>

                  </div>

                </div>

              ))}

            </div>

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
            Daily briefings on Technology, AI and Business delivered to your inbox.
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
