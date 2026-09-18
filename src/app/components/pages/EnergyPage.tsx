import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock } from "lucide-react";
import Ener1Img from "../../../imports/Energy1.png";
import Ener2Img from "../../../imports/Energy2.png";
import Ener3Img from "../../../imports/Energy3.png";

/* =========================================================
   HERO DATA — CONTENT UNCHANGED
========================================================= */

const hero = {
  category: "CLEAN ENERGY TRANSITION",
  title: "Data Centers and AI Workloads Force Energy Policy Reversals Globally",
  excerpt:
    "The insatiable power appetite of AI data centers is generating a policy crisis that is reverberating from Ireland to Indiana. Multiple governments that had committed to rapid renewable energy transitions are finding themselves reversing or delaying coal and gas plant retirements to ensure grid stability in the face of surging demand. In the United States, the Department of Energy has authorized emergency grid reliability protocols in five states where data center construction is outpacing transmission infrastructure deployment. Technology companies — led by Microsoft, Google, Amazon, and a growing cohort of AI infrastructure firms — have publicly committed to 100% clean energy procurement. However, the sheer scale of new compute capacity being built is stretching the practical limits of current renewable energy availability, forcing uncomfortable compromises between decarbonization targets and operational reliability.",
  author: "Sagar Kumar",
  time: "1 June 2026",
  briefing: "BRIEFING 041",
  image: Ener1Img,
};

const hero1 = {
  category: "CLEAN ENERGY TRANSITION",
  title: "JP Morgan: Energy Resiliency Now a National Security Imperative",
  excerpt:
    "A joint assessment by JP Morgan's Climate Advisory and Security and Resiliency teams concludes that energy resiliency and diversified energy mix have become essential components of national security strategy. The report, featuring contributions from Dr. Sarah Kapnick and security lead Michael Johnson, argues that the convergence of AI-driven demand growth with geopolitical supply chain risks has elevated grid security from a utility management issue to a strategic priority for heads of state. The analysis identifies dealmaking in power generation, storage, and transmission as the most active M&A subsector within energy in 2026, as utilities, industrial companies, and sovereign wealth funds compete for assets that provide reliable, resilient power generation capacity.",
  author: "Sagar Kumar",
  time: "May 2026",
  image: Ener2Img,
};

const hero2 = {
  category: "CLEAN ENERGY TRANSITION",
  title: "China's Dominant Position in Clean Tech Supply Chains Creates New Risk Calculus",
  excerpt:
    "China's commanding position across clean technology supply chains — spanning solar panels, battery storage, green hydrogen production equipment, and electric vehicle components — continues to shape global deployment trajectories while generating strategic risk for Western economies. S&P Global's Energy Horizons 2026 report identifies this dynamic as a key variable in the outcome of the US-China AI and clean energy race. Western governments are responding through the combination of tariffs, domestic manufacturing incentives, and allied reshoring initiatives. The U.S. Inflation Reduction Act has catalyzed over $300 billion in clean energy commitments, while the European Union's Net-Zero Industry Act is accelerating its own manufacturing base for critical clean technologies. However, analysts note that China's cost advantages in key components are likely to persist for the remainder of this decade.",
  author: "Sagar Kumar",
  time: "May 2026",
  image: Ener3Img,
};

/* =========================================================
   ENERGY PRICES — CONTENT UNCHANGED
========================================================= */

const energyPrices = [
  {
    commodity: "CRUDE OIL (WTI)",
    price: "$78.45",
    unit: "/bbl",
    change: "-1.23%",
    up: false,
  },
  {
    commodity: "BRENT CRUDE",
    price: "$82.31",
    unit: "/bbl",
    change: "-1.05%",
    up: false,
  },
  {
    commodity: "NATURAL GAS (HH)",
    price: "$2.87",
    unit: "/MMBtu",
    change: "+0.78%",
    up: true,
  },
  {
    commodity: "EUROPEAN TTF GAS",
    price: "€28.40",
    unit: "/MWh",
    change: "+1.23%",
    up: true,
  },
  {
    commodity: "COAL (NEWCASTLE)",
    price: "$124.50",
    unit: "/t",
    change: "-2.10%",
    up: false,
  },
  {
    commodity: "EU CARBON CREDITS",
    price: "€68.20",
    unit: "/t",
    change: "+3.40%",
    up: true,
  },
  {
    commodity: "URANIUM",
    price: "$92.75",
    unit: "/lb",
    change: "+0.50%",
    up: true,
  },
];

/* =========================================================
   RENEWABLE STORIES — CONTENT + IMAGES UNCHANGED
========================================================= */

const renewableStories = [
  {
    id: 1,
    title:
      "India's Adani Green Commissions World's Largest Single Solar Plant at 10 GW",
    time: "1 hr ago",
    image:
      "https://images.unsplash.com/photo-1760433116983-76021bd32307?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title:
      "Offshore Wind Auction in UK Draws $45B in Investment — Record for Any Energy Sector",
    time: "3 hrs ago",
    image:
      "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title:
      "China Completes First Commercial Fusion Power Reactor — 50-Year Dream Becomes Reality",
    time: "6 hrs ago",
    image:
      "https://images.unsplash.com/photo-1760553120312-2821bf54e767?w=400&h=250&fit=crop",
  },
];

/* =========================================================
   DISPATCH GROUPS — CONTENT UNCHANGED
========================================================= */

const dispatchGroups = [
  {
    code: "CRUDE",
    title: "Oil & Gas",
    stories: [
      {
        id: 1,
        title:
          "Saudi Aramco cuts capex by $12B as peak oil demand moves closer",
        time: "2 hrs ago",
      },
      {
        id: 2,
        title:
          "Chevron and ExxonMobil join forces in $50B Permian Basin megadeal",
        time: "4 hrs ago",
      },
      {
        id: 3,
        title:
          "Russia's Arctic LNG 2 project faces new equipment shortfall after sanctions tighten",
        time: "6 hrs ago",
      },
      {
        id: 4,
        title:
          "OPEC+ compliance rate falls to 87% as Nigeria and Iraq exceed quotas",
        time: "8 hrs ago",
      },
    ],
  },
  {
    code: "ATOM",
    title: "Nuclear Power",
    stories: [
      {
        id: 1,
        title:
          "Three new SMR (small modular reactor) designs win NRC approval in the US",
        time: "3 hrs ago",
      },
      {
        id: 2,
        title:
          "UK government approves Wylfa nuclear plant restart with £20B guarantee",
        time: "5 hrs ago",
      },
      {
        id: 3,
        title:
          "India signs agreement with France to build 6 pressurized water reactors",
        time: "7 hrs ago",
      },
    ],
  },
  {
    code: "REG",
    title: "Policy & Regulation",
    stories: [
      {
        id: 1,
        title:
          "Ohio suspends a major data-center tax incentive after AI infrastructure costs surge",
        time: "Just now",
      },
      {
        id: 2,
        title:
          "US IRA clean energy tax credits spur $850B in new investment since 2022",
        time: "1 hr ago",
      },
      {
        id: 3,
        title:
          "EU carbon border tax takes full effect — imports now priced on emissions",
        time: "3 hrs ago",
      },
      {
        id: 4,
        title:
          "G7 energy ministers agree to phase out coal by 2035 in landmark accord",
        time: "5 hrs ago",
      },
      {
        id: 5,
        title:
          "India sets world record: 500 GW renewable capacity target 3 years ahead of schedule",
        time: "7 hrs ago",
      },
    ],
  },
];

/* =========================================================
   SNAPSHOT — CONTENT UNCHANGED
========================================================= */

const snapshot = [
  {
    label: "Cleantech Investment Needed (5 Yrs)",
    value: "USD 5–8 Trillion (AI infrastructure + enabling systems)",
  },
  {
    label: "US IRA Clean Energy Commitments",
    value: "Over USD 300 Billion catalyzed since 2022",
  },
  {
    label: "EU Net-Zero Industry Act",
    value: "Accelerating European clean tech manufacturing",
  },
  {
    label: "Power Demand Driver",
    value: "AI data centers forcing grid policy reversals globally",
  },
  {
    label: "Top Energy Deal Type (2026)",
    value: "Power generation, storage, and transmission assets",
  },
];

/* =========================================================
   ENERGY MARKET REPORT — CONTENT UNCHANGED
========================================================= */

const energyReportGroups = [
  {
    code: "OIL",
    title: "Oil Market Volatility",
    points: [
      "July 2026 was one of the most volatile months for crude oil in recent memory, driven by the U.S.–Iran conflict, Strait of Hormuz shipping attacks, and Houthi strikes on Saudi tankers.",
      "U.S. crude oil production is forecast at a record 13.83 million barrels per day in 2026.",
    ],
  },
  {
    code: "GAS",
    title: "Natural Gas",
    points: [
      "U.S. marketed natural gas production is projected to hit a record 122.5 Bcf/d in 2026 (+3.4% YoY), driven by the Permian and Haynesville regions.",
      "Henry Hub spot prices are forecast to average $2.87/MMBtu in Q3 2026, down 50 cents from the July STEO, due to reduced LNG feedgas demand and robust production.",
    ],
  },
  {
    code: "PWR",
    title: "Power & Renewables",
    points: [
      "Solar, hydropower, and wind generation grew by 21%, 9%, and 6% respectively in H1 2026 vs. H1 2025.",
      "Natural gas-fired electricity generation increased 2% in H1 2026 and is forecast to rise further in 2027 as gas prices remain relatively low.",
    ],
    growth: [
      { label: "Solar", value: 21 },
      { label: "Hydropower", value: 9 },
      { label: "Wind", value: 6 },
      { label: "Gas-fired", value: 2 },
    ],
  },
];

const energyReportStats = [
  { value: "13.83M", label: "US crude output, bbl/d (2026F)" },
  { value: "122.5", label: "US gas output, Bcf/d (2026F)" },
  { value: "$2.87", label: "Henry Hub, /MMBtu (Q3 2026F)" },
  { value: "+21%", label: "Solar generation growth, H1 YoY" },
  { value: "+9%", label: "Hydropower growth, H1 YoY" },
  { value: "+6%", label: "Wind growth, H1 YoY" },
];

/* =========================================================
   HELPERS
========================================================= */

function SectionHeader({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b-2 border-[#17140F] pb-2.5 mb-5">
      <h2 className="font-bold text-[14px] md:text-[15px] text-[#17140F]">
        {title}
      </h2>

      {note && (
        <span className="text-[9px] uppercase tracking-[0.15em] text-[#8A887F]">
          {note}
        </span>
      )}
    </div>
  );
}

function StoryMeta({
  author = "Sagar Kumar",
  time,
}: {
  author?: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 mt-3 text-[10px] text-[#8A887F]">
      <span>By {author}</span>

      <span className="w-1 h-1 rounded-full bg-[#C9C5BB]" />

      <span className="flex items-center gap-1">
        <Clock size={10} />
        {time}
      </span>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export function EnergyPage() {
  return (
    <main className="w-full min-h-screen bg-[#FAFAF7] text-[#17140F] overflow-x-hidden">
      {/* =====================================================
          FULL WIDTH PAGE CONTAINER
      ===================================================== */}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-5 md:py-7">

        {/* ===================================================
            PAGE TITLE
        =================================================== */}

        <header className="border-t-[3px] border-[#D92323] pt-4 pb-5 mb-8">
          <h1 className="font-serif text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] font-bold leading-none tracking-tight">
            Energy
          </h1>

          <p className="mt-2 text-[12px] sm:text-[13px] text-[#77736B]">
            Oil &amp; gas, renewables, nuclear, and the global energy transition.
          </p>
        </header>

        {/* ===================================================
            TOP ADVERTISEMENT BANNER
        =================================================== */}

        <div className="w-full h-[72px] sm:h-[82px] mb-5 bg-gradient-to-r from-[#102B32] via-[#1D414A] to-[#315B69] flex items-center justify-center relative overflow-hidden">
          <div className="text-center text-white">
            <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#55B5CE] font-bold">
              GOOGLE ADSENSE
            </p>

            <p className="text-[12px] sm:text-[14px] font-semibold mt-1">
              Advertisement Space
            </p>

            <p className="text-[8px] text-[#8BBBC6] mt-0.5">
              728 × 90 • Leaderboard
            </p>
          </div>

          <span className="absolute right-1 top-1 text-[7px] bg-white/70 text-gray-500 px-1">
            Advertisement
          </span>
        </div>

        {/* ===================================================
            HERO AREA
        =================================================== */}

        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,3.3fr)_300px] gap-6 xl:gap-7 mb-12">

          {/* MAIN HERO */}

          <article className="group cursor-pointer min-w-0">
            <div className="overflow-hidden rounded-lg bg-[#E8E5DD]">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-[260px] sm:h-[350px] md:h-[430px] lg:h-[500px] xl:h-[520px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
            </div>

            <div className="mt-3">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-[#B8752E]">
                {hero.category}
              </span>

              <h2 className="font-serif text-[24px] sm:text-[30px] md:text-[35px] lg:text-[38px] xl:text-[40px] font-bold leading-[1.05] mt-1.5 tracking-tight group-hover:text-[#B8752E] transition-colors duration-200">
                {hero.title}
              </h2>

              <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#66625A] leading-[1.6] mt-3 max-w-5xl">
                {hero.excerpt}
              </p>

              <StoryMeta time={hero.time} />
            </div>
          </article>

          {/* RIGHT SIDEBAR */}

          <aside className="min-w-0">

            {/* SPONSORED CONTENT */}

            <div className="border border-[#E3DED1] bg-[#F8F4E8] rounded-md p-2 mb-4">
              <div className="text-[7px] uppercase tracking-widest text-[#8A887F] mb-2">
                Sponsored Content
              </div>

              <div className="h-[145px] sm:h-[170px] xl:h-[185px] bg-[#111A3A] flex items-center justify-center text-center">
                <div>
                  <p className="text-[8px] text-[#E4C94C] uppercase font-bold tracking-widest">
                    Featured Partner
                  </p>

                  <p className="text-white font-semibold text-[12px] mt-2">
                    Your Ad Here
                  </p>

                  <p className="text-[8px] text-gray-300 mt-1">
                    Reach 2M+ business readers
                  </p>
                </div>
              </div>
            </div>

            {/* MORE STORIES */}

            <SectionHeader title="More Stories" />

            <div className="divide-y divide-[#DED9CE]">
              {renewableStories.map((story) => (
                <article
                  key={story.id}
                  className="py-3 first:pt-0 flex gap-3 group cursor-pointer"
                >
                  <div className="w-[82px] h-[60px] shrink-0 overflow-hidden rounded-md bg-gray-200">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="min-w-0">
                    <span className="text-[7px] uppercase font-bold text-[#B8752E]">
                      Energy
                    </span>

                    <h3 className="text-[11px] sm:text-[12px] font-bold leading-[1.25] mt-0.5 group-hover:text-[#B8752E] transition-colors">
                      {story.title}
                    </h3>

                    <span className="text-[8px] text-[#99958B] mt-1 block">
                      {story.time}
                    </span>
                  </div>
                </article>
              ))}
            </div>

          </aside>
        </section>

        {/* ===================================================
            LATEST ENERGY NEWS
        =================================================== */}

        <section className="mb-10">
          <SectionHeader title="Latest Energy News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

            {/* Existing renewable stories */}

            {renewableStories.map((story) => (
              <article
                key={`renewable-${story.id}`}
                className="group cursor-pointer border border-[#E2DED5] bg-white rounded-md overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="overflow-hidden h-[180px] sm:h-[190px] md:h-[205px] bg-gray-100">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                </div>

                <div className="p-3.5">
                  <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#B8752E]">
                    Renewable Energy
                  </span>

                  <h3 className="font-serif text-[16px] sm:text-[17px] font-bold leading-[1.15] mt-1.5 group-hover:text-[#B8752E] transition-colors">
                    {story.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[9px] text-[#99958B] mt-2.5">
                    <Clock size={9} />
                    {story.time}
                  </div>
                </div>
              </article>
            ))}

            {/* Existing hero 1 */}

            <article className="group cursor-pointer border border-[#E2DED5] bg-white rounded-md overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="overflow-hidden h-[180px] sm:h-[190px] md:h-[205px] bg-gray-100">
                <ImageWithFallback
                  src={hero1.image}
                  alt={hero1.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>

              <div className="p-3.5">
                <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#B8752E]">
                  {hero1.category}
                </span>

                <h3 className="font-serif text-[16px] sm:text-[17px] font-bold leading-[1.15] mt-1.5 group-hover:text-[#B8752E] transition-colors">
                  {hero1.title}
                </h3>

                <StoryMeta time={hero1.time} />
              </div>
            </article>

            {/* Existing hero 2 */}

            <article className="group cursor-pointer border border-[#E2DED5] bg-white rounded-md overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="overflow-hidden h-[180px] sm:h-[190px] md:h-[205px] bg-gray-100">
                <ImageWithFallback
                  src={hero2.image}
                  alt={hero2.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>

              <div className="p-3.5">
                <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#B8752E]">
                  {hero2.category}
                </span>

                <h3 className="font-serif text-[16px] sm:text-[17px] font-bold leading-[1.15] mt-1.5 group-hover:text-[#B8752E] transition-colors">
                  {hero2.title}
                </h3>

                <StoryMeta time={hero2.time} />
              </div>
            </article>

          </div>
        </section>

        {/* ===================================================
            SECOND ADVERTISEMENT BANNER
        =================================================== */}

        <div className="w-full h-[72px] sm:h-[82px] mb-8 bg-gradient-to-r from-[#102B32] via-[#1D414A] to-[#315B69] flex items-center justify-center relative overflow-hidden">
          <div className="text-center text-white">
            <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#55B5CE] font-bold">
              GOOGLE ADSENSE
            </p>

            <p className="text-[12px] sm:text-[14px] font-semibold mt-1">
              Business Solutions | Powered by The Pride Times
            </p>

            <p className="text-[8px] text-[#8BBBC6] mt-0.5">
              728 × 90 • Leaderboard
            </p>
          </div>

          <span className="absolute right-1 top-1 text-[7px] bg-white/70 text-gray-500 px-1">
            Advertisement
          </span>
        </div>

        {/* ===================================================
            SPONSORSHIP
        =================================================== */}

        <section className="bg-[#F5F3EE] border border-[#E6E1D7] rounded-md p-4 sm:p-5 mb-8">

          <div className="flex items-center gap-2 mb-4">
            <span className="text-[8px] uppercase tracking-[0.14em] bg-white border border-[#DED9CE] px-2 py-1 text-[#8A887F]">
              Sponsorship
            </span>

            <span className="text-[9px] text-[#9A968D]">
              Presented by our partners
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {[
              "Global Finance Summit 2026",
              "Tech Leaders Forum",
              "Energy Transition Conference",
              "AI & Business World",
            ].map((title) => (
              <div
                key={title}
                className="bg-white border border-[#E4DFD6] rounded-md h-[90px] flex flex-col items-center justify-center text-center"
              >
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center mb-2">
                  <span className="text-[#D92323] text-[11px]">✦</span>
                </div>

                <p className="text-[9px] font-bold text-[#17140F]">
                  {title}
                </p>

                <p className="text-[7px] text-[#99958B] mt-1">
                  Sponsored Event
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* ===================================================
            ENERGY MARKET REPORT
        =================================================== */}

        <section className="mb-10">

          <SectionHeader
            title="Energy Market Report"
            note="July 2026 Wrap"
          />

          <p className="text-[9px] uppercase tracking-[0.14em] text-[#8A887F] mb-4">
            2.2 &nbsp; Energy
          </p>

          {/* Key figures */}

          <div className="w-full overflow-x-auto border border-[#D9D4C7] bg-white mb-6">
            <div className="flex min-w-[850px]">
              {energyReportStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex-1 px-4 py-4 ${
                    index > 0 ? "border-l border-[#D9D4C7]" : ""
                  }`}
                >
                  <p className="text-xl md:text-2xl font-mono font-semibold text-[#B8752E]">
                    {stat.value}
                  </p>

                  <p className="text-[8px] uppercase tracking-wide text-[#8A887F] mt-1 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {energyReportGroups.map((group) => (
              <div
                key={group.code}
                className="bg-white border border-[#D9D4C7]"
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#D9D4C7]">
                  <span className="font-mono text-[10px] font-bold text-[#B8752E]">
                    {group.code}
                  </span>

                  <span className="text-[#AAA69D]">—</span>

                  <h3 className="text-[10px] uppercase tracking-[0.1em] font-bold">
                    {group.title}
                  </h3>
                </div>

                <div className="p-4">
                  {group.points.map((point, index) => (
                    <div
                      key={index}
                      className="flex gap-2 mb-3 last:mb-0"
                    >
                      <span className="text-[#B8752E] text-[9px] mt-1">
                        ▪
                      </span>

                      <p className="text-[12px] leading-[1.55] text-[#55534C]">
                        {point}
                      </p>
                    </div>
                  ))}

                  {group.growth && (
                    <div className="pt-3 mt-3 border-t border-[#E5E1D8]">
                      <p className="text-[8px] uppercase tracking-wide text-[#8A887F] mb-2">
                        Generation growth, H1 2026 vs. H1 2025
                      </p>

                      {group.growth.map((growth) => (
                        <div
                          key={growth.label}
                          className="flex items-center gap-2 mb-2"
                        >
                          <span className="text-[9px] w-[65px] text-[#66625A]">
                            {growth.label}
                          </span>

                          <div className="flex-1 h-1.5 bg-[#EEEAE1] overflow-hidden">
                            <div
                              className="h-full bg-[#B8752E]"
                              style={{
                                width: `${(growth.value / 21) * 100}%`,
                              }}
                            />
                          </div>

                          <span className="text-[9px] font-mono text-[#B8752E] w-7 text-right">
                            +{growth.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* ===================================================
            INDUSTRY SNAPSHOT + SECONDARY HERO
        =================================================== */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          <article className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg bg-gray-100">
              <ImageWithFallback
                src={hero2.image}
                alt={hero2.title}
                className="w-full h-[270px] sm:h-[350px] lg:h-[400px] object-cover group-hover:scale-[1.025] transition-transform duration-700"
              />
            </div>

            <span className="block mt-3 text-[9px] font-bold uppercase tracking-[0.14em] text-[#B8752E]">
              {hero2.category}
            </span>

            <h2 className="font-serif text-[23px] sm:text-[28px] font-bold leading-[1.1] mt-1.5 group-hover:text-[#B8752E] transition-colors">
              {hero2.title}
            </h2>

            <p className="text-[12px] sm:text-[13px] text-[#66625A] leading-[1.6] mt-2.5">
              {hero2.excerpt}
            </p>

            <StoryMeta time={hero2.time} />
          </article>

          <div>
            <SectionHeader title="Industry Snapshot" />

            <div>
              {snapshot.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-1 sm:grid-cols-[40%_1fr] gap-2 sm:gap-5 py-4 border-b border-[#D9D4C7] ${
                    index === 0 ? "border-t border-[#D9D4C7]" : ""
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-wide text-[#B8752E]">
                    {row.label}
                  </span>

                  <span className="text-[12px] sm:text-[13px] leading-snug text-[#17140F]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Commodities */}

            <div className="mt-8">
              <SectionHeader title="Energy Prices" />

              <div className="border border-[#D9D4C7] bg-[#17140F] text-[#EDE9DD]">
                {energyPrices.map((energy) => (
                  <div
                    key={energy.commodity}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 border-b border-[#3A3934] last:border-b-0"
                  >
                    <span className="text-[8px] sm:text-[9px] font-mono text-[#B8B4A8]">
                      {energy.commodity}
                    </span>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono">
                        {energy.price}
                        <span className="text-[#8A887F]">
                          {energy.unit}
                        </span>
                      </span>

                      <span
                        className={`text-[8px] font-mono ${
                          energy.up
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {energy.up ? "▲" : "▼"} {energy.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* ===================================================
            SECTOR DISPATCHES
        =================================================== */}

        <section className="mb-10">

          <SectionHeader title="Sector Dispatches" />

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D9D4C7]">

            {dispatchGroups.map((group) => (
              <div
                key={group.code}
                className="py-5 md:py-0 md:px-6 first:pl-0 last:pr-0"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[10px] font-bold text-[#B8752E]">
                    {group.code}
                  </span>

                  <span className="text-[#AAA69D]">—</span>

                  <h3 className="text-[10px] uppercase tracking-[0.1em] font-bold">
                    {group.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {group.stories.map((story) => (
                    <article
                      key={story.id}
                      className="group cursor-pointer"
                    >
                      <p className="text-[12px] sm:text-[13px] leading-[1.45] group-hover:text-[#B8752E] transition-colors">
                        {story.title}
                      </p>

                      <span className="flex items-center gap-1 text-[8px] uppercase tracking-wide text-[#8A887F] mt-1.5">
                        <Clock size={9} />
                        {story.time}
                      </span>
                    </article>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* ===================================================
            NEWSLETTER — LIKE SCREENSHOT
        =================================================== */}

        <section className="w-full bg-[#071C30] rounded-md px-5 sm:px-8 py-8 sm:py-9 mb-2 text-center">
          <h2 className="font-serif text-white text-[22px] sm:text-[26px] font-bold">
            Stay Ahead with The Pride Times
          </h2>

          <p className="text-[10px] sm:text-[11px] text-gray-300 mt-1">
            Daily briefings on Energy delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5 max-w-[480px] mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-10 flex-1 bg-[#20374B] border border-[#385067] rounded-sm px-3 text-[11px] text-white placeholder:text-gray-400 outline-none focus:border-[#B8752E]"
            />

            <button className="h-10 px-5 bg-[#E31B23] hover:bg-[#C8171E] text-white rounded-sm text-[10px] font-bold transition-colors">
              Subscribe Free
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}
