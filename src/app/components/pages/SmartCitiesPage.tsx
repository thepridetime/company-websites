import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  Building2,
  Wifi,
  Leaf,
  Car,
  BarChart2,
  Cpu,
} from "lucide-react";

import Smartc1Img from "../../../imports/Smartc1.png";
import Smartc2Img from "../../../imports/Smartc2.png";
import Smartc3Img from "../../../imports/Smartc3.png";
import Smartc4Img from "../../../imports/Smartc4.png";

/* =========================================================
   SECTION HEADER
========================================================= */

function SH({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-6">
      <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />

      <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.16em] text-gray-900">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   HERO DATA
========================================================= */

const hero = {
  category: "URBAN FUTURES",
  title:
    "Smart Cities Market on Track for $873 Billion Valuation — Momentum Continues in 2026",
  excerpt:
    "The global Smart Cities market, projected to reach $873.7 billion by the end of 2026 based on a compound annual growth rate of 13.8% from a $457 billion base in 2021, is demonstrating strong momentum across transportation, utilities, public safety, and digital governance segments. The smart transportation sub-segment continues to command the fastest growth rate, driven by urban mobility platforms, autonomous vehicle infrastructure, and integrated traffic management systems. The energy component of smart utilities holds the largest individual market share, reflecting significant investment in smart metering, distributed grid management, and real-time demand response systems.",
  author: "Sagar Kumar",
  time: "June 2026",
  image: Smartc1Img,
};

const hero1 = {
  category: "URBAN FUTURES",
  title:
    "Suffolk Technologies Backs Built-World Startups Through Smart City Incubator",
  excerpt:
    "Suffolk Technologies, the venture arm of construction giant Suffolk, has launched a new cohort of its built-world incubator program, targeting early-stage startups operating at the intersection of construction technology, smart buildings, and urban infrastructure. The program offers $150,000 in initial funding structured as a post-money SAFE in exchange for 4.5% equity, alongside access to Suffolk's network of industry advisors and major construction project sites.",
  author: "Sagar Kumar",
  time: "June 2026",
  image: Smartc2Img,
};

const hero2 = {
  category: "URBAN FUTURES",
  title:
    "De Nora Industrial Innovation Program Opens Global Applications",
  excerpt:
    "Italy's De Nora has opened a global call for startup applications to its industrial innovation program, offering up to EUR 50,000 per venture through a SAFE-based financing structure. The program targets startups working on industrial operations redesign, manufacturing optimization, automation, health and safety technology, and resource use optimization.",
  author: "Sagar Kumar",
  time: "June 2026",
  image: Smartc3Img,
};

const hero3 = {
  category: "URBAN FUTURES",
  title:
    "Smart Public Safety: AI-Driven Urban Security Systems Gain Adoption",
  excerpt:
    "AI-powered public safety platforms — encompassing gunshot detection, smart surveillance, and emergency response optimization — are seeing accelerated adoption across major metropolitan areas. Cities that have deployed integrated safety intelligence platforms report measurable reductions in emergency response times and improvements in crime pattern analysis.",
  author: "Sagar Kumar",
  time: "June 2026",
  image: Smartc4Img,
};

/* =========================================================
   CITY RANKINGS
========================================================= */

const cityRankings = [
  {
    rank: 1,
    city: "Singapore",
    score: 98.4,
    population: "5.8M",
    tag: "Digital Leader",
  },
  {
    rank: 2,
    city: "Copenhagen",
    score: 96.7,
    population: "0.8M",
    tag: "Green Capital",
  },
  {
    rank: 3,
    city: "Tokyo",
    score: 95.2,
    population: "14M",
    tag: "Mobility Pioneer",
  },
  {
    rank: 4,
    city: "Amsterdam",
    score: 93.8,
    population: "0.9M",
    tag: "Bike + Tech",
  },
  {
    rank: 5,
    city: "Seoul",
    score: 92.4,
    population: "10M",
    tag: "5G Leader",
  },
  {
    rank: 6,
    city: "Dubai",
    score: 91.3,
    population: "3.4M",
    tag: "AI Hub",
  },
  {
    rank: 7,
    city: "Bangalore",
    score: 87.6,
    population: "13M",
    tag: "Tech Ecosystem",
  },
];

/* =========================================================
   NEWS DATA
========================================================= */

const govTechNews = [
  {
    id: 1,
    title:
      "IMD Smart City Index 2026 finds governance, transparency and infrastructure now matter more than tech deployment.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Southeast Asia's first Smart City Expo opens in Kuala Lumpur, highlighting AI-powered urban innovation.",
    time: "Just now",
  },
  {
    id: 3,
    title:
      "U.S. local governments face a July 13 deadline to apply for federal grants for automated permitting systems.",
    time: "Just now",
  },
  {
    id: 4,
    title:
      "London Climate Week hosts the SmartCitiesWorld Summit 2026.",
    time: "1 hr ago",
  },
  {
    id: 5,
    title:
      "Estonia's E-Government Platform expands internationally as digital democracy tools gain adoption.",
    time: "2 hrs ago",
  },
  {
    id: 6,
    title:
      "India's DigiCity Initiative connects hundreds of cities with real-time data dashboards.",
    time: "4 hrs ago",
  },
];

const mobilityNews = [
  {
    id: 1,
    title:
      "Miami-Dade Aviation Department begins testing an air-traffic management system for future air-taxi operations.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Waymo's autonomous taxi fleet expands operations across major metropolitan markets.",
    time: "1 hr ago",
  },
  {
    id: 3,
    title:
      "Dubai advances plans for next-generation high-speed urban transportation infrastructure.",
    time: "3 hrs ago",
  },
  {
    id: 4,
    title:
      "Paris expands its electric bus network as cities accelerate zero-emission transportation.",
    time: "5 hrs ago",
  },
  {
    id: 5,
    title:
      "Berlin unveils plans for an on-demand autonomous shuttle network.",
    time: "7 hrs ago",
  },
];

const sustainabilityNews = [
  {
    id: 1,
    title:
      "Cities reassess climate-resilience funding as environmental programs face changing financial priorities.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Urban pedestrian safety becomes a growing priority for city infrastructure planners.",
    time: "Just now",
  },
  {
    id: 3,
    title:
      "Cities accelerate carbon-neutrality programs through renewable energy and smart infrastructure.",
    time: "2 hrs ago",
  },
  {
    id: 4,
    title:
      "Singapore expands its Green Plan with new urban agriculture initiatives.",
    time: "4 hrs ago",
  },
  {
    id: 5,
    title:
      "African cities invest in smart water-grid systems to reduce infrastructure losses.",
    time: "6 hrs ago",
  },
];

const aiInfraCityNews = [
  {
    id: 1,
    title:
      "Dubai launches a Digital Twin Platform phase focused on urban planning, infrastructure and asset management.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "GCC infrastructure leaders say the region is moving AI deployment from individual projects to entire infrastructure portfolios.",
    time: "Just now",
  },
  {
    id: 3,
    title:
      "City leaders worldwide organize around the rising power and water burden of AI data centers.",
    time: "1 hr ago",
  },
  {
    id: 4,
    title:
      "Mayors begin treating compute capacity as a utility-planning issue rather than a conventional commercial real-estate decision.",
    time: "3 hrs ago",
  },
];

/* =========================================================
   FEATURE DATA
========================================================= */

const features = [
  {
    icon: Wifi,
    title: "5G & Connectivity",
    news:
      "Cities accelerate 5G deployment as connected infrastructure becomes central to urban services.",
  },
  {
    icon: Leaf,
    title: "Green Infrastructure",
    news:
      "Urban planners expand green infrastructure, renewable energy and climate-resilience programs.",
  },
  {
    icon: Car,
    title: "Autonomous Mobility",
    news:
      "Self-driving transportation and autonomous delivery systems continue expanding across cities.",
  },
  {
    icon: BarChart2,
    title: "Data & IoT",
    news:
      "Connected sensors and real-time analytics are transforming the way cities monitor infrastructure.",
  },
];

/* =========================================================
   ARTICLE CARD
========================================================= */

function ArticleCard({
  data,
  large = false,
}: {
  data: typeof hero;
  large?: boolean;
}) {
  return (
    <article className="group cursor-pointer">
      <div
        className={`relative overflow-hidden rounded-xl bg-gray-100 shadow-sm group-hover:shadow-lg transition-shadow duration-300 ${
          large ? "h-72 md:h-[440px]" : "h-64 md:h-80"
        }`}
      >
        <ImageWithFallback
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />

        <span className="absolute left-4 bottom-4 bg-red-600 text-white px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase rounded-md shadow-sm">
          {data.category}
        </span>
      </div>

      <div className="pt-5">
        <h2
          className={`font-serif font-bold leading-[1.15] text-gray-950 transition-colors duration-200 group-hover:text-red-600 ${
            large
              ? "text-[26px] md:text-[42px]"
              : "text-xl md:text-2xl"
          }`}
        >
          {data.title}
        </h2>

        <p className="mt-3 text-sm md:text-[15px] text-gray-600 leading-[1.75]">
          {data.excerpt}
        </p>

        <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <span className="font-medium text-gray-500">By {data.author}</span>

          <span className="flex items-center gap-1.5">
            <Clock size={11} strokeWidth={2.25} />
            {data.time}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   NEWS COLUMN
========================================================= */

function NewsColumn({
  title,
  items,
}: {
  title: string;
  items: { id: number; title: string; time: string }[];
}) {
  return (
    <section>
      <SH title={title} />

      <div className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <article
            key={`${title}-${item.id}-${index}`}
            className="group py-4 first:pt-0 cursor-pointer transition-colors duration-200 hover:bg-gray-50/70 -mx-2 px-2 rounded-md"
          >
            <h3 className="text-[14px] md:text-[15px] leading-[1.55] text-gray-800 transition-colors duration-200 group-hover:text-red-600">
              {item.title}
            </h3>

            <div className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-gray-400">
              <Clock size={10} strokeWidth={2.25} />
              {item.time}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function SmartCitiesPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-5 mb-10">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black text-white shrink-0 shadow-sm">
              <Building2 size={20} strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                Urban Intelligence
              </p>

              <h1 className="mt-1 font-serif text-3xl md:text-[42px] font-bold tracking-tight leading-tight">
                Smart Cities & Urban Innovation
              </h1>
            </div>
          </div>
        </header>

        {/* =================================================
            HERO + CITY RANKINGS
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">

          <div className="lg:col-span-2">
            <ArticleCard data={hero} large />
          </div>

          <aside className="lg:border-l lg:border-gray-200 lg:pl-8">
            <SH title="Smart City Index 2026" />

            <div className="divide-y divide-gray-200">
              {cityRankings.map((city) => (
                <div
                  key={city.rank}
                  className="py-3.5 flex items-center gap-3.5 transition-colors duration-200 hover:bg-gray-50/70 -mx-2 px-2 rounded-md"
                >
                  <span className="w-6 shrink-0 text-sm font-bold text-gray-300 tabular-nums">
                    {String(city.rank).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900">
                      {city.city}
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5">
                      {city.tag} · Pop {city.population}
                    </p>
                  </div>

                  <span className="text-sm font-bold text-green-700 tabular-nums">
                    {city.score}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] leading-5 text-gray-400">
              Index scores represent the comparative smart-city performance
              ranking presented on this page.
            </p>
          </aside>
        </section>

        {/* =================================================
            SECONDARY STORIES
        ================================================= */}

        <section className="mb-14">
          <ArticleCard data={hero1} large />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          <ArticleCard data={hero2} />
          <ArticleCard data={hero3} />
        </section>

        {/* =================================================
            AI INFRASTRUCTURE & SMART CITIES
        ================================================= */}

        <section className="mb-14 border-t-2 border-black pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <SH title="AI Infrastructure & Smart Cities" />

              <div className="divide-y divide-gray-200">
                {aiInfraCityNews.map((item) => (
                  <article
                    key={item.id}
                    className="group py-4 first:pt-0 cursor-pointer transition-colors duration-200 hover:bg-gray-50/70 -mx-2 px-2 rounded-md"
                  >
                    <h3 className="text-[14px] md:text-[15px] leading-[1.55] text-gray-800 transition-colors duration-200 group-hover:text-red-600">
                      {item.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-gray-400">
                      <Clock size={10} strokeWidth={2.25} />
                      {item.time}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="lg:border-l lg:border-gray-200 lg:pl-8">
              <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-3">
                <Cpu size={14} strokeWidth={2} className="text-red-600" />
                <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-gray-900">
                  Executive Takeaway
                </h2>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <p className="text-[13px] leading-[1.6] text-gray-600">
                  Cities with fast grid interconnection, transparent
                  permitting, reliable water policy and strong cyber
                  standards may become the preferred locations for the
                  next wave of AI infrastructure.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* =================================================
            FEATURE BOXES
        ================================================= */}

        <section className="mb-14">
          <SH title="Urban Technology Focus" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(
              ({ icon: Icon, title, news }) => (
                <article
                  key={title}
                  className="group border border-gray-200 bg-gray-50/60 rounded-xl p-5 hover:bg-white hover:border-gray-900 hover:shadow-[0_2px_0_0_rgba(0,0,0,1)] transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white mb-4 group-hover:bg-red-600 transition-colors duration-300">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>

                  <p className="text-[11px] font-bold text-red-600 uppercase tracking-[0.14em]">
                    {title}
                  </p>

                  <h3 className="mt-2 text-sm leading-[1.6] text-gray-600 group-hover:text-gray-950 transition-colors duration-200">
                    {news}
                  </h3>
                </article>
              )
            )}
          </div>
        </section>

        {/* =================================================
            NEWS SECTIONS
        ================================================= */}

        <section className="border-t-2 border-black pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <NewsColumn
              title="GovTech & Digital Services"
              items={govTechNews}
            />

            <NewsColumn
              title="Mobility & Transport"
              items={mobilityNews}
            />

            <NewsColumn
              title="Green & Sustainable Cities"
              items={sustainabilityNews}
            />

          </div>
        </section>

        {/* =================================================
            BOTTOM EDITORIAL BAR
        ================================================= */}

        <section className="mt-14 border-t-4 border-black pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">
                The Pride Times
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Smart cities, infrastructure and the future of urban life.
              </p>
            </div>

            <div className="text-[11px] uppercase tracking-wide text-gray-400">
              Urban Futures · 2026
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
