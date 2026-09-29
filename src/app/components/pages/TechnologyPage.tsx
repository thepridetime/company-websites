import { TimeAgo } from "../../utils/timeAgo";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { technologyArticlePath } from "../../data/technologyNewsData";
import { PrideTimesAd } from "../AdSenseSlots";

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
   UPDATED TECHNOLOGY INTELLIGENCE — 2026
   THE PRIDE TIMES
========================================================= */

const hero = {
  category: "TECHNOLOGY • AI",
  title:
    "Artificial Intelligence Becomes the Defining Theme of the Global Technology Landscape",
  excerpt:
    "AI is moving from assistive software into autonomous decision-making systems across healthcare, logistics, finance and defense. The shift is changing enterprise workflows, infrastructure requirements and the regulatory questions surrounding advanced technology.",
  author: "The Pride Times Editorial Desk",
  publishedAt: "2026-09-29T09:00:00Z",
  image:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
};

const hero1 = {
  category: "AI INFRASTRUCTURE",
  title:
    "Agentic AI Moves Into Enterprise Workflows as Companies Automate Decisions",
  excerpt:
    "Agentic AI systems are moving beyond simple assistance toward multi-step planning, execution and decision-making, including embedded procurement and workflow tools.",
  author: "The Pride Times Editorial Desk",
  publishedAt: "2026-09-29T08:30:00Z",
  image:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
};

const hero2 = {
  category: "AI POWER DEMAND",
  title:
    "AI Data Centers Push Power Security to the Center of Technology Strategy",
  excerpt:
    "AI infrastructure is creating a new technology constraint: access to secure electricity. IEA projections put global data-center electricity demand on a trajectory toward almost 1,000 TWh by 2030.",
  author: "The Pride Times Editorial Desk",
  publishedAt: "2026-09-29T08:00:00Z",
  image:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
};

const threatAlerts = [
  {
    id: 1,
    severity: "AI",
    title:
      "Agentic AI and Embedded Procurement Tools Enter Enterprise Workflows",
    publishedAt: "2026-09-29T08:19:00Z",
  },
  {
    id: 2,
    severity: "POWER",
    title:
      "Secure Power Access Emerges as a Critical Constraint for AI Infrastructure",
    publishedAt: "2026-09-29T07:45:00Z",
  },
  {
    id: 3,
    severity: "INFRA",
    title:
      "Global Data-Center Electricity Demand Tracks Toward Almost 1,000 TWh by 2030",
    publishedAt: "2026-09-29T07:15:00Z",
  },
  {
    id: 4,
    severity: "GLOBAL",
    title:
      "U.S.-China AI Competition Intensifies Across Model Capability and Deployment",
    publishedAt: "2026-09-29T06:45:00Z",
  },
  {
    id: 5,
    severity: "ENTERPRISE",
    title:
      "EY Expands NVIDIA-Powered Enterprise AI Capabilities With LangChain Validation",
    publishedAt: "2026-09-29T06:15:00Z",
  },
];

const stories = [
  {
    id: 1,
    category: "ARTIFICIAL INTELLIGENCE",
    title:
      "Artificial Intelligence Becomes the Defining Theme of the Global Technology Landscape",
    publishedAt: "2026-09-29T09:00:00Z",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    category: "AI AGENTS",
    title:
      "Agentic AI Moves Into Enterprise Workflows and Procurement",
    publishedAt: "2026-09-29T08:30:00Z",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    category: "AI INFRASTRUCTURE",
    title:
      "Data-Center Electricity Demand Could Approach 1,000 TWh by 2030",
    publishedAt: "2026-09-29T08:00:00Z",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    category: "ENERGY & AI",
    title:
      "Secure Power Access Becomes a Strategic Requirement for AI Infrastructure",
    publishedAt: "2026-09-29T07:30:00Z",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    category: "ENTERPRISE AI",
    title:
      "EY Expands NVIDIA-Powered Enterprise AI Capabilities With LangChain Validation",
    publishedAt: "2026-09-29T07:00:00Z",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    category: "GLOBAL AI RACE",
    title:
      "U.S.-China AI Competition Intensifies Around Capability and Deployment",
    publishedAt: "2026-09-29T06:30:00Z",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    category: "REGULATION",
    title:
      "AI Adoption Moves From Assistive to Autonomous, Increasing Regulatory Pressure",
    publishedAt: "2026-09-29T06:00:00Z",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    category: "ECONOMY",
    title:
      "Broader AI Adoption Becomes a Potential Upside Risk to the Global Growth Outlook",
    publishedAt: "2026-09-29T05:30:00Z",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 9,
    category: "ENTERPRISE TECHNOLOGY",
    title:
      "Technology Leaders Rework Infrastructure Plans Around Compute, Power and Autonomy",
    publishedAt: "2026-09-29T05:00:00Z",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",
  },
];

const aiInfraStories = [
  {
    id: 1,
    title:
      "Agentic AI is entering enterprise workflows as companies move from assistance toward autonomous execution.",
    publishedAt: "2026-09-29T08:30:00Z",
  },
  {
    id: 2,
    title:
      "Embedded AI procurement tools are beginning to connect software intelligence with purchasing workflows.",
    publishedAt: "2026-09-29T08:15:00Z",
  },
  {
    id: 3,
    title:
      "Data-center electricity demand is projected to approach 1,000 TWh by 2030, increasing pressure on power systems.",
    publishedAt: "2026-09-29T08:00:00Z",
  },
  {
    id: 4,
    title:
      "Secure power access is becoming a critical AI infrastructure requirement, with power availability increasingly competing with construction readiness.",
    publishedAt: "2026-09-29T07:45:00Z",
  },
  {
    id: 5,
    title:
      "AI adoption is shifting from assistive tools toward autonomous systems, raising new questions for governance and regulation.",
    publishedAt: "2026-09-29T07:30:00Z",
  },
];

const zeroTrustNote = {
  title: "Technology Watch: The AI Autonomy and Infrastructure Race",
  body:
    "Artificial intelligence is no longer only a software-product story. The next phase combines autonomous decision-making, enterprise workflow integration, model capability, specialized compute and dependable electricity. Companies now have to evaluate AI deployment alongside infrastructure availability, regulatory requirements and operating costs.",
};

const responseMatrix = [
  {
    threat: "Agentic AI",
    control: "Autonomous Workflows",
    risk: "Governance + Reliability",
    cadence: "Accelerating",
  },
  {
    threat: "AI Procurement",
    control: "Embedded Enterprise Tools",
    risk: "Decision Oversight",
    cadence: "Emerging",
  },
  {
    threat: "Data Centers",
    control: "Compute + Power",
    risk: "Electricity Availability",
    cadence: "High Priority",
  },
  {
    threat: "AI Models",
    control: "Capability + Deployment",
    risk: "Geopolitical Competition",
    cadence: "Intensifying",
  },
  {
    threat: "AI Regulation",
    control: "Autonomous Adoption",
    risk: "Compliance Complexity",
    cadence: "Expanding",
  },
];

const defenseNews = [
  {
    id: 1,
    title:
      "AI Moves From Assistive Tools Toward Autonomous Decision-Making Systems",
    publishedAt: "2026-09-29T09:00:00Z",
  },
  {
    id: 2,
    title:
      "Agentic AI and Embedded Procurement Tools Enter Enterprise Workflows",
    publishedAt: "2026-09-29T08:30:00Z",
  },
  {
    id: 3,
    title:
      "Data-Center Electricity Demand Tracks Toward Almost 1,000 TWh by 2030",
    publishedAt: "2026-09-29T08:00:00Z",
  },
  {
    id: 4,
    title:
      "Secure Power Access Becomes Critical to the Next AI Infrastructure Buildout",
    publishedAt: "2026-09-29T07:30:00Z",
  },
  {
    id: 5,
    title:
      "EY Expands NVIDIA-Powered Enterprise AI Capabilities With LangChain Validation",
    publishedAt: "2026-09-29T07:00:00Z",
  },
];

const marketData = [
  {
    company: "NVIDIA",
    ticker: "AI INFRA",
    price: "AI compute",
    change: "Core enabler",
    up: true,
  },
  {
    company: "Data Centers",
    ticker: "INFRA",
    price: "≈1,000 TWh",
    change: "2030 demand path",
    up: true,
  },
  {
    company: "Enterprise AI",
    ticker: "AGENTS",
    price: "Autonomous",
    change: "Adoption shift",
    up: true,
  },
  {
    company: "Power Systems",
    ticker: "ENERGY",
    price: "Strategic",
    change: "Access constraint",
    up: true,
  },
  {
    company: "Global AI",
    ticker: "MACRO",
    price: "3.1%",
    change: "IMF 2026 growth",
    up: true,
  },
];

const sponsorships = [
  "AI & Business World",
  "Global Technology Forum",
  "Future Infrastructure Summit",
  "Enterprise AI Leadership Forum",
];

/* =========================================================
   SECONDARY ARTICLE
========================================================= */

function SecondaryArticle({
  data,
}: {
  data: typeof hero1;
}) {
  const articleId =
    data.title === hero1.title ? "tech-heidi" : "tech-anthropic";

  return (
    <Link to={technologyArticlePath(articleId)} className="group block">
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
    </Link>
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
              AI, autonomous systems, enterprise technology, data centers,
              power demand and the global AI race.
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
              MAIN HERO
          ================================================= */}

          <Link
            to={technologyArticlePath("tech-pagaya")}
            className="group block"
          >

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

          </Link>

          {/* =================================================
              RIGHT SIDEBAR
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

              {threatAlerts.slice(0, 4).map((story) => (

                <Link
                  key={story.id}
                  to={technologyArticlePath(
                    [
                      "tech-heidi",
                      "tech-datacenter",
                      "tech-anthropic",
                      "tech-peloton",
                    ][story.id - 1] || "tech-pagaya"
                  )}
                  className="block py-3 group"
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

                </Link>

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

              <Link
                key={story.id}
                to={technologyArticlePath(
                  [
                    "tech-pagaya",
                    "tech-heidi",
                    "tech-anthropic",
                    "tech-datacenter",
                    "tech-doordash",
                    "tech-peloton",
                    "tech-softbank",
                    "tech-founder",
                    "tech-verda",
                  ][story.id - 1] || "tech-pagaya"
                )}
                className="group block"
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
            TECHNOLOGY & AI
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-8 md:gap-10 border-t-2 border-black pt-8 mb-12">

          <div>

            <SectionHeader title="Technology & AI" />

            <div className="divide-y divide-gray-200">

              {aiInfraStories.map((story) => (

                <Link
                  key={story.id}
                  to={technologyArticlePath(
                    [
                      "tech-heidi",
                      "tech-anthropic",
                      "tech-datacenter",
                      "tech-peloton",
                      "tech-softbank",
                    ][story.id - 1] || "tech-pagaya"
                  )}
                  className="block py-4 first:pt-0 group"
                >

                  <p className="text-[13px] md:text-[14px] font-semibold leading-[1.5] text-gray-900 group-hover:text-red-600 transition-colors">
                    {story.title}
                  </p>

                  <span className="flex items-center gap-1.5 mt-1.5 text-[9px] text-gray-400">

                    <Clock size={8} />

                    <TimeAgo iso={story.publishedAt} />

                  </span>

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

                <Link
                  key={item.id}
                  to={technologyArticlePath(
                    [
                      "tech-pagaya",
                      "tech-heidi",
                      "tech-anthropic",
                      "tech-datacenter",
                      "tech-doordash",
                    ][item.id - 1] || "tech-pagaya"
                  )}
                  className="block py-4 first:pt-0 group"
                >

                  <h3 className="text-[13px] md:text-[14px] font-semibold leading-[1.45] group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>

                  <span className="flex items-center gap-1.5 mt-1.5 text-[9px] text-gray-400">

                    <Clock size={8} />

                    <TimeAgo iso={item.publishedAt} />

                  </span>

                </Link>

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
            Daily briefings on AI, technology infrastructure and the global digital economy delivered to your inbox.
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
