import {
  Clock,
  Users,
  Award,
  ChevronRight,
  Quote,
  MessageSquare,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import { ImageWithFallback } from "../figma/ImageWithFallback";
import CeospotImg from "../../../imports/Ceospot.png";

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow?: string;
  title: string;
  icon?: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
}) {
  return (
    <div className="mb-6 border-b border-black pb-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.22em] text-red-600">
              {eyebrow}
            </p>
          )}

          <div className="flex items-center gap-2">
            {Icon && <Icon size={15} strokeWidth={1.8} />}

            <h2 className="font-serif text-xl font-bold tracking-tight md:text-2xl">
              {title}
            </h2>
          </div>
        </div>

        <span className="hidden h-[3px] w-10 bg-red-600 sm:block" />
      </div>
    </div>
  );
}

/* ============================================================
   HERO
============================================================ */

const hero = {
  category: "CEO SPOTLIGHT",
  title:
    "Tilman Fertitta: Building America's Largest Integrated Entertainment Empire",
  excerpt:
    "Few executives have demonstrated the appetite for bold, large-scale deal-making that characterizes Tilman Fertitta's approach to business in 2026. The chairman and CEO of Fertitta Entertainment, whose holdings already include the Golden Nugget casino brand and the Houston Rockets, has staked a $17.6 billion claim on Caesars Entertainment — a move that would transform him into the undisputed titan of American gaming and hospitality.",
  author: "Sagar Kumar",
  time: "May 2026",
  image: CeospotImg,
};

/* ============================================================
   CEO INTERVIEWS
============================================================ */

const ceoInterviews = [
  {
    id: 1,
    name: "Satya Nadella",
    title: "CEO, Microsoft",
    topic: "AI Strategy",
    quote:
      "The next decade will be defined by how organizations use AI to augment human capability.",
    duration: "35 min read",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    name: "Indra Nooyi",
    title: "Former CEO, PepsiCo",
    topic: "Leadership",
    quote:
      "The companies that will win in the next 20 years are those that embed purpose into their P&L.",
    duration: "28 min read",
    image:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "Jensen Huang",
    title: "CEO, NVIDIA",
    topic: "AI Infrastructure",
    quote:
      "We are not a chip company. We are the engine of the AI industrial revolution.",
    duration: "42 min read",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
  },
];

/* ============================================================
   WOMEN LEADERS
============================================================ */

const womenLeaders = [
  {
    rank: "01",
    name: "Mary Barra",
    title: "CEO, General Motors",
    achievement:
      "Leading GM's transition toward an electric and software-defined vehicle portfolio.",
  },
  {
    rank: "02",
    name: "Jane Fraser",
    title: "CEO, Citigroup",
    achievement:
      "Driving a major organizational transformation across Citigroup's global businesses.",
  },
  {
    rank: "03",
    name: "Gita Gopinath",
    title: "First Deputy Managing Director, IMF",
    achievement:
      "A leading voice on global economic policy, trade and financial stability.",
  },
  {
    rank: "04",
    name: "Sunita Williams",
    title: "NASA Astronaut / Engineer",
    achievement:
      "A prominent figure in human spaceflight, engineering and international space cooperation.",
  },
  {
    rank: "05",
    name: "Nirmala Sitharaman",
    title: "Finance Minister, India",
    achievement:
      "A central figure in India's fiscal policy and infrastructure investment strategy.",
  },
];

/* ============================================================
   LEADERSHIP OPINIONS
============================================================ */

const leadershipOpinions = [
  {
    id: 1,
    title:
      "On AI and Investing: Why I Still Trust Human Judgment Over Algorithms",
    time: "1 day ago",
  },
  {
    id: 2,
    title:
      "The Debt Cycle Is Approaching Its Peak — And Leaders Must Prepare Now",
    time: "2 days ago",
  },
  {
    id: 3,
    title:
      "Why AGI Will Arrive Before 2030 — And Why That's Not Something to Fear",
    time: "3 days ago",
  },
  {
    id: 4,
    title:
      "India's Moment Has Arrived — The Next 25 Years Belong to Us",
    time: "4 days ago",
  },
];

/* ============================================================
   EXECUTIVE MOVES
============================================================ */

const executiveMoves = [
  {
    id: 1,
    person: "Bob Iger",
    role: "DISNEY",
    move:
      "Returns as Disney CEO for a third term after renewed shareholder pressure.",
    time: "3 hrs ago",
  },
  {
    id: 2,
    person: "Christine Lagarde",
    role: "ECB",
    move:
      "ECB leadership transition draws attention as potential successors emerge.",
    time: "5 hrs ago",
  },
  {
    id: 3,
    person: "Shantanu Narayen",
    role: "ADOBE",
    move:
      "Adobe CEO receives a major compensation package following a record year.",
    time: "7 hrs ago",
  },
  {
    id: 4,
    person: "Arvind Krishna",
    role: "IBM",
    move:
      "IBM CEO outlines a strategic review of the company's consulting operations.",
    time: "9 hrs ago",
  },
];

/* ============================================================
   PT30
============================================================ */

const pt30Features = [
  {
    rank: "01",
    name: "Jensen Huang",
    role: "NVIDIA",
    insight:
      "Defining the AI infrastructure era through accelerated computing, robotics and data-center innovation.",
  },
  {
    rank: "02",
    name: "Satya Nadella",
    role: "MICROSOFT",
    insight:
      "Leading enterprise AI adoption while reshaping Microsoft's cloud and productivity ecosystem.",
  },
  {
    rank: "03",
    name: "Sundar Pichai",
    role: "ALPHABET",
    insight:
      "Driving AI integration across search, cloud, consumer products and emerging technology.",
  },
];

/* ============================================================
   STORY ROW
============================================================ */

function StoryRow({
  title,
  time,
  index,
}: {
  title: string;
  time: string;
  index?: number;
}) {
  return (
    <article className="group flex cursor-pointer gap-4 border-b border-gray-200 py-4 last:border-b-0">
      {typeof index === "number" && (
        <span className="pt-0.5 font-serif text-xl text-gray-300 transition-colors group-hover:text-red-600">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <div className="min-w-0">
        <h3 className="font-serif text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-600 md:text-[15px]">
          {title}
        </h3>

        <span className="mt-2 flex items-center gap-1 text-[10px] uppercase tracking-wide text-gray-400">
          <Clock size={9} />
          {time}
        </span>
      </div>
    </article>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export function CeoSpotlightPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-7 sm:px-6 md:py-9 lg:px-8">

        {/* ====================================================
            MASTHEAD
        ==================================================== */}

        <header className="mb-8 border-b-4 border-black pb-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-black text-white">
                <Users size={23} strokeWidth={1.7} />
              </div>

              <div>
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-red-600">
                  Executive Intelligence
                </p>

                <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  CEO Spotlight
                </h1>
              </div>
            </div>

            <div className="max-w-sm text-left sm:text-right">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                The Pride Times
              </p>

              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                Profiles, interviews and ideas from the people shaping global
                business.
              </p>
            </div>
          </div>
        </header>

        {/* ====================================================
            HERO
        ==================================================== */}

        <section className="mb-12">
          <article className="group cursor-pointer">

            <div className="relative overflow-hidden rounded-md border border-gray-200 bg-gray-100 shadow-sm">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="h-[290px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] sm:h-[390px] md:h-[500px] lg:h-[570px]"
              />

              <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-black/10" />

              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                <span className="inline-flex items-center gap-2 rounded-sm bg-red-600 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {hero.category}
                </span>
              </div>
            </div>

            <div className="mt-6 max-w-[1050px]">
              <h2 className="font-serif text-[30px] font-bold leading-[1.04] tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-[56px]">
                {hero.title}
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[1fr_280px] md:gap-10">
                <p className="text-sm leading-7 text-gray-600 md:text-[16px]">
                  {hero.excerpt}
                </p>

                <div className="border-l-2 border-red-600 pl-4 md:self-start">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                    By
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {hero.author}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                    <Clock size={10} />
                    {hero.time}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* ====================================================
            INTERVIEW SECTION
        ==================================================== */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="The Interview"
            title="Inside the CEO Mind"
            icon={Quote}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ceoInterviews.map((ceo) => (
              <article
                key={ceo.id}
                className="group overflow-hidden rounded-md border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]"
              >
                <div className="relative overflow-hidden border-b border-gray-200 bg-gray-100">
                  <ImageWithFallback
                    src={ceo.image}
                    alt={ceo.name}
                    className="h-[230px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />

                  <span className="absolute left-4 top-4 rounded-sm bg-black px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white">
                    {ceo.topic}
                  </span>
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    {ceo.title}
                  </p>

                  <h3 className="mt-1 font-serif text-2xl font-bold">
                    {ceo.name}
                  </h3>

                  <div className="my-5 h-px bg-gray-200" />

                  <div className="relative">
                    <Quote
                      size={20}
                      className="absolute -left-1 -top-2 text-red-600 opacity-30"
                    />

                    <p className="pl-4 font-serif text-sm italic leading-6 text-gray-600">
                      {ceo.quote}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-[10px] text-gray-400">
                      {ceo.duration}
                    </span>

                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-red-600 transition-all group-hover:gap-2">
                      Read Interview
                      <ChevronRight size={11} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====================================================
            PT30
        ==================================================== */}

        <section className="mb-14 overflow-hidden rounded-md bg-[#090909] text-white">
          <div className="p-6 sm:p-8 md:p-10">

            <div className="mb-8 flex flex-col gap-4 border-b border-white/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Award size={16} className="text-yellow-400" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                    The Pride Times
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-bold md:text-3xl">
                  PT30 Leadership Profiles
                </h2>
              </div>

              <p className="max-w-xs text-[10px] leading-relaxed text-gray-500 sm:text-right">
                The executives influencing technology, capital, industry and
                the future of business.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {pt30Features.map((person) => (
                <article
                  key={person.rank}
                  className="group relative overflow-hidden rounded-md border border-white/10 p-6 transition-colors hover:border-yellow-400"
                >
                  <div className="absolute right-3 top-0 font-serif text-[100px] font-bold leading-none text-white/[0.035]">
                    {person.rank}
                  </div>

                  <div className="relative">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500">
                      {person.role}
                    </span>

                    <h3 className="mt-2 font-serif text-2xl font-bold">
                      {person.name}
                    </h3>

                    <div className="my-5 h-px w-8 bg-yellow-400" />

                    <p className="text-xs leading-6 text-gray-400">
                      {person.insight}
                    </p>

                    <button className="mt-6 flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.15em] text-yellow-400 transition-all group-hover:gap-2">
                      View Profile
                      <ArrowUpRight size={11} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================
            LOWER EDITORIAL GRID
        ==================================================== */}

        <section className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr_1fr]">

          {/* WOMEN IN LEADERSHIP */}

          <div>
            <SectionHeader
              eyebrow="Leadership"
              title="Women in Leadership"
              icon={Users}
            />

            <div>
              {womenLeaders.map((leader) => (
                <article
                  key={leader.rank}
                  className="group flex cursor-pointer gap-4 border-b border-gray-200 py-5 first:pt-0"
                >
                  <span className="font-serif text-2xl text-gray-300 transition-colors group-hover:text-red-600">
                    {leader.rank}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-serif text-base font-bold leading-tight transition-colors group-hover:text-red-600">
                      {leader.name}
                    </h3>

                    <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                      {leader.title}
                    </p>

                    <p className="mt-2 text-[11px] leading-5 text-gray-600">
                      {leader.achievement}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* OPINIONS */}

          <div>
            <SectionHeader
              eyebrow="The Boardroom"
              title="Leadership Opinions"
              icon={MessageSquare}
            />

            <div>
              {leadershipOpinions.map((opinion, index) => (
                <StoryRow
                  key={opinion.id}
                  title={opinion.title}
                  time={opinion.time}
                  index={index}
                />
              ))}
            </div>

            <button className="mt-5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
              More Opinions
              <ChevronRight size={11} />
            </button>
          </div>

          {/* EXECUTIVE MOVES */}

          <div>
            <SectionHeader
              eyebrow="Corporate World"
              title="Executive Moves"
              icon={Briefcase}
            />

            <div>
              {executiveMoves.map((move) => (
                <article
                  key={move.id}
                  className="group cursor-pointer border-b border-gray-200 py-4 last:border-b-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-red-600">
                      {move.role}
                    </span>

                    <span className="text-[9px] text-gray-400">
                      {move.time}
                    </span>
                  </div>

                  <h3 className="mt-1.5 font-serif text-sm font-bold leading-snug transition-colors group-hover:text-red-600">
                    {move.person}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-5 text-gray-600">
                    {move.move}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================
            EXECUTIVE PRINCIPLES
        ==================================================== */}

        <section className="border-t-4 border-black pt-5">
          <SectionHeader
            eyebrow="The Leadership Playbook"
            title="Executive Principles"
            icon={TrendingUp}
          />

          <div className="grid grid-cols-1 gap-px bg-gray-200 md:grid-cols-3">

            <article className="bg-white p-6 md:p-7">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                01 · Strategy
              </span>

              <h3 className="mt-3 font-serif text-xl font-bold leading-tight">
                Build for the next decade
              </h3>

              <p className="mt-3 text-xs leading-6 text-gray-500">
                The strongest executives balance immediate performance with
                long-term investments in people, technology and markets.
              </p>
            </article>

            <article className="bg-white p-6 md:p-7">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                02 · Technology
              </span>

              <h3 className="mt-3 font-serif text-xl font-bold leading-tight">
                Turn technology into advantage
              </h3>

              <p className="mt-3 text-xs leading-6 text-gray-500">
                Technology leadership increasingly depends on translating
                emerging capabilities into measurable business outcomes.
              </p>
            </article>

            <article className="bg-white p-6 md:p-7">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                03 · Leadership
              </span>

              <h3 className="mt-3 font-serif text-xl font-bold leading-tight">
                Lead through uncertainty
              </h3>

              <p className="mt-3 text-xs leading-6 text-gray-500">
                Resilient leaders create clarity during periods of economic,
                technological and organizational change.
              </p>
            </article>

          </div>
        </section>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <footer className="mt-10 border-t border-gray-300 pt-4">
          <div className="flex flex-col gap-2 text-[9px] uppercase tracking-[0.15em] text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <span>The Pride Times · CEO Spotlight</span>
            <span>Executive Intelligence Desk</span>
          </div>
        </footer>

      </div>
    </main>
  );
}
