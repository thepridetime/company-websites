import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  Rocket,
  TrendingUp,
  Users,
  Globe2,
  Award,
  Building,
} from "lucide-react";

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
  category: "FOUNDER ECONOMY",
  title:
    "Global Startup Funding Crosses $412 Billion in 2026 as AI Ventures Absorb Half of All Venture Capital",
  excerpt:
    "Venture funding rebounded sharply through the first half of 2026, with global deal value reaching $412 billion — the strongest run since 2021's peak. AI-native startups accounted for roughly 51% of total capital deployed, spanning applied-AI tooling, robotics, and vertical enterprise software. Late-stage rounds grew fastest as investors concentrated capital in a smaller number of companies with proven revenue traction, while seed funding stayed selective but resilient, favoring founders with prior exits or deep technical pedigrees.",
  author: "Sagar Kumar",
  time: "August 2026",
  image:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
};

const hero1 = {
  category: "FOUNDER ECONOMY",
  title: "From Garage to Unicorn: The 18-Month Playbook Founders Are Repeating",
  excerpt:
    "A new class of startups is reaching unicorn status in under 18 months, compressing a timeline that once took the better part of a decade. Interviews with founders across fintech, climate hardware, and applied-AI point to a common pattern: a narrow initial wedge, aggressive early customer concentration in one industry, and a fundraising strategy built around signaling from a small number of high-conviction investors rather than broad market validation.",
  author: "Sagar Kumar",
  time: "July 2026",
  image:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
};

const hero2 = {
  category: "FOUNDER ECONOMY",
  title: "Bootstrapped and Proud: The Founders Skipping the Term Sheet",
  excerpt:
    "A growing cohort of founders is deliberately avoiding venture capital altogether, using revenue-based financing and customer prepayments to fund growth instead. Several profitable, fully bootstrapped companies have crossed $50 million in annual recurring revenue in the past year without raising a priced round, arguing that ownership and decision speed matter more than capital velocity.",
  author: "Sagar Kumar",
  time: "June 2026",
  image:
    "https://images.unsplash.com/photo-1531973576160-7125cd663d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
};

/* =========================================================
   UNICORN WATCH PANEL
========================================================= */

const unicornWatch = [
  { company: "Solvane AI", sector: "Applied AI", valuation: "$9.2B", status: "New Unicorn" },
  { company: "Fenwick Robotics", sector: "Industrial Robotics", valuation: "$6.8B", status: "New Unicorn" },
  { company: "Cascade Health", sector: "Digital Health", valuation: "$4.1B", status: "Markup" },
  { company: "Northwind Energy", sector: "Climate Hardware", valuation: "$3.4B", status: "New Unicorn" },
  { company: "Ledgerly", sector: "Fintech Infra", valuation: "$2.9B", status: "Markup" },
  { company: "Quiet Room", sector: "Consumer Audio", valuation: "$1.6B", status: "New Unicorn" },
];

/* =========================================================
   FUNDING & VC NEWS
========================================================= */

const fundingNews = [
  {
    id: 1,
    title:
      "Sequoia closes a $2.3 billion early-stage fund focused entirely on applied-AI and robotics startups.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Seed-stage valuations climb 22% year-over-year as investors compete for technical founding teams.",
    time: "Just now",
  },
  {
    id: 3,
    title:
      "Sovereign wealth funds increase direct startup investment, bypassing traditional VC intermediaries.",
    time: "2 hrs ago",
  },
  {
    id: 4,
    title:
      "Revenue-based financing platforms report record volume as founders seek non-dilutive capital.",
    time: "4 hrs ago",
  },
  {
    id: 5,
    title:
      "Corporate venture arms account for nearly a third of Series B rounds in the first half of 2026.",
    time: "6 hrs ago",
  },
];

const founderNews = [
  {
    id: 1,
    title:
      "Second-time founders raise pre-seed rounds at triple the valuation of first-time peers, data shows.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "A 19-year-old dropout's climate-materials startup raises $40M Series A led by a top-tier fund.",
    time: "1 hr ago",
  },
  {
    id: 3,
    title:
      "Solo founders now represent 1 in 5 venture-backed seed rounds, up from 1 in 12 five years ago.",
    time: "3 hrs ago",
  },
  {
    id: 4,
    title:
      "Founder wellbeing platforms see rising demand as burnout becomes a board-level topic.",
    time: "5 hrs ago",
  },
  {
    id: 5,
    title:
      "Remote-first startups now outpace hub-based peers on early revenue growth, new study finds.",
    time: "7 hrs ago",
  },
];

/* =========================================================
   IPO & EXITS
========================================================= */

const exitNews = [
  { id: 1, title: "Enterprise data-infrastructure startup files for a $6B IPO, the year's largest tech listing so far.", time: "Just now" },
  { id: 2, title: "A climate-hardware unicorn is acquired by an industrial conglomerate in an all-cash $2.1B deal.", time: "2 hrs ago" },
  { id: 3, title: "Secondary markets for private startup shares see record trading volume as employees seek liquidity.", time: "4 hrs ago" },
  { id: 4, title: "A decade-old fintech startup completes a rare direct listing, skipping the traditional IPO roadshow.", time: "6 hrs ago" },
];

const acceleratorNews = [
  { id: 1, title: "Y Combinator's newest batch skews heavily toward applied-AI and defense-tech startups.", time: "Just now" },
  { id: 2, title: "Africa's largest startup accelerator graduates its biggest cohort yet, spanning 14 countries.", time: "3 hrs ago" },
  { id: 3, title: "Corporate accelerators pivot from innovation theater toward direct equity investment.", time: "5 hrs ago" },
  { id: 4, title: "University-backed deep-tech incubators see applications double amid an AI hardware wave.", time: "7 hrs ago" },
];

/* =========================================================
   FEATURE DATA
========================================================= */

const features = [
  {
    icon: TrendingUp,
    title: "Fundraising",
    news: "Founders navigate a bifurcated market — AI ventures raise easily, everything else competes harder.",
  },
  {
    icon: Users,
    title: "Team Building",
    news: "Early hires increasingly come from equity-heavy compensation as cash-strapped startups compete for talent.",
  },
  {
    icon: Globe2,
    title: "Global Expansion",
    news: "Startups internationalize earlier, often within 12 months of a seed round, chasing larger addressable markets.",
  },
  {
    icon: Award,
    title: "Exit Strategy",
    news: "Founders increasingly plan acquisition paths from day one rather than defaulting to an IPO ambition.",
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
            large ? "text-[26px] md:text-[42px]" : "text-xl md:text-2xl"
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

export function StartupSuccessPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-5 mb-10">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black text-white shrink-0 shadow-sm">
              <Rocket size={20} strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                Founder Economy
              </p>

              <h1 className="mt-1 font-serif text-3xl md:text-[42px] font-bold tracking-tight leading-tight">
                Startup Success
              </h1>
            </div>
          </div>
        </header>

        {/* =================================================
            HERO + UNICORN WATCH
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          <div className="lg:col-span-2">
            <ArticleCard data={hero} large />
          </div>

          <aside className="lg:border-l lg:border-gray-200 lg:pl-8">
            <SH title="Unicorn Watch 2026" />

            <div className="divide-y divide-gray-200">
              {unicornWatch.map((c) => (
                <div
                  key={c.company}
                  className="py-3.5 flex items-center justify-between gap-3 transition-colors duration-200 hover:bg-gray-50/70 -mx-2 px-2 rounded-md"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {c.company}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.sector}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold tabular-nums text-gray-900">
                      {c.valuation}
                    </p>
                    <p className="text-[10px] font-semibold uppercase text-green-700 mt-0.5">
                      {c.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] leading-5 text-gray-400">
              Valuations reflect most recent priced or secondary rounds.
            </p>
          </aside>
        </section>

        {/* =================================================
            SECONDARY STORIES
        ================================================= */}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          <ArticleCard data={hero1} />
          <ArticleCard data={hero2} />
        </section>

        {/* =================================================
            FEATURE BOXES
        ================================================= */}

        <section className="mb-14">
          <SH title="Founder Focus" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, news }) => (
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
            ))}
          </div>
        </section>

        {/* =================================================
            FUNDING & FOUNDER NEWS
        ================================================= */}

        <section className="border-t-2 border-black pt-10 mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <NewsColumn title="Funding & Venture Capital" items={fundingNews} />
            <NewsColumn title="Founder Spotlight" items={founderNews} />
          </div>
        </section>

        {/* =================================================
            IPO/EXITS + ACCELERATORS
        ================================================= */}

        <section className="border-t-2 border-black pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-6">
                <Building size={14} strokeWidth={2} className="text-red-600" />
                <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.16em] text-gray-900">
                  IPO &amp; Exits
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {exitNews.map((n) => (
                  <div
                    key={n.id}
                    className="py-3.5 first:pt-0 group cursor-pointer transition-colors duration-200 hover:bg-gray-50/70 -mx-2 px-2 rounded-md"
                  >
                    <p className="text-sm font-semibold leading-[1.5] text-gray-900 transition-colors duration-200 group-hover:text-red-600">
                      {n.title}
                    </p>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-1.5">
                      <Clock size={9} strokeWidth={2.25} />
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <NewsColumn title="Accelerators & Incubators" items={acceleratorNews} />
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
                Founders, funding rounds, and the companies redefining growth.
              </p>
            </div>

            <div className="text-[11px] uppercase tracking-wide text-gray-400">
              Founder Economy · 2026
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
