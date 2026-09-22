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

/*
 * IMPORTANT:
 * App.tsx imports:
 *
 * import { TechnologyPage } from "./components/pages/TechnologyPage";
 *
 * Therefore this component MUST be exported as TechnologyPage.
 */

export function TechnologyPage() {
  return (
    <main className="w-full bg-white text-[#17140F] antialiased">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">

        {/* PAGE TITLE */}

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

        {/* TOP ADVERTISEMENT */}

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

        {/* MAIN HERO + MORE STORIES */}

        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,3.25fr)_minmax(280px,1fr)] gap-5 lg:gap-7 mt-4 md:mt-6">

          {/* MAIN HERO */}

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

                <span
