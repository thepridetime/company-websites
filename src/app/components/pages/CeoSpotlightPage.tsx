import {
  Clock,
  Users,
  ChevronRight,
  Quote,
  MessageSquare,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router";
import CeospotImg from "../../../imports/Ceospot.png";
import { PrideTimesAd } from "../AdSenseSlots";

/* ============================================================
   AD SLOT
   Existing advertising presentation retained
============================================================ */



/* ============================================================
   SPONSORED BANNER
============================================================ */

function SponsoredBanner() {
  return (
    <div className="relative mb-10 rounded-[2px] border border-white/10 bg-[#0b1220] px-4 py-7 text-center text-white sm:py-8">
      <span className="absolute left-3 top-2 text-[9px] uppercase tracking-[0.15em] text-gray-500">
        Sponsored Content
      </span>

      <span className="absolute right-3 top-2 text-[9px] uppercase tracking-wide text-gray-500">
        Ad
      </span>

      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400">
        Executive Leadership Program — Partner Content
      </p>

      <p className="font-serif text-xl font-bold sm:text-2xl">
        Your Ad Here
      </p>

      <p className="mt-1 text-xs text-gray-400">
        Reach 2M+ business readers
      </p>
    </div>
  );
}

/* ============================================================
   NEWSLETTER CTA
============================================================ */

function NewsletterCTA() {
  return (
    <section className="mb-14 rounded-[2px] bg-[#0b1a30] p-8 text-center text-white md:p-10">
      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-red-400">
        Executive Intelligence
      </p>

      <h2 className="mb-2 font-serif text-2xl md:text-[30px]">
        Exclusive CEO Interviews
      </h2>

      <p className="mb-6 text-sm text-gray-400">
        Be first to read our in-depth leader profiles and executive
        briefings.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto flex max-w-md flex-col justify-center gap-3 sm:flex-row"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-[2px] border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-white/50"
        />

        <button
          type="submit"
          className="whitespace-nowrap rounded-[2px] bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Subscribe Free
        </button>
      </form>
    </section>
  );
}

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
   FEATURED LEADER
============================================================ */

const featuredLeader = {
  rank: "#1 LEADER 2026",
  edition: "Q3 2026 — AI Infrastructure Edition",
  name: "Jensen Huang",
  title: "President & CEO, NVIDIA Corporation · United States",
  bio: "Jensen Huang co-founded NVIDIA in 1993 and has led the company from a gaming graphics specialist to the world's most valuable semiconductor company. His vision of the AI-first computing paradigm has reshaped industries from autonomous vehicles to drug discovery. Under his leadership, NVIDIA's market capitalization has grown into one of the defining stories of the AI infrastructure era.",
  image: CeospotImg,
};

/* ============================================================
   PRIDE TIMES 30
============================================================ */

const leadersToWatch = [
  {
    rank: 1,
    name: "Jensen Huang",
    title: "President & CEO",
    company: "NVIDIA Corporation",
    bio: "Jensen Huang co-founded NVIDIA in 1993 and has led the company from a gaming graphics specialist to the world's most valuable semiconductor company.",
    edition: "Q3 2026 — AI Infrastructure Edition",
    initials: "JH",
  },
  {
    rank: 2,
    name: "Sam Altman",
    title: "CEO",
    company: "OpenAI",
    bio: "Sam Altman leads OpenAI, the company at the forefront of developing artificial general intelligence and bringing it into everyday products.",
    edition: "Q2 2026 — AGI Edition",
    initials: "SA",
  },
  {
    rank: 3,
    name: "Mukesh Ambani",
    title: "Chairman & MD",
    company: "Reliance Industries",
    bio: "Asia's richest man has transformed Reliance Industries from a petrochemicals and refining conglomerate into a diversified force in telecom and retail.",
    edition: "Q1 2026 — Green Energy Edition",
    initials: "MA",
  },
  {
    rank: 4,
    name: "Sundar Pichai",
    title: "CEO",
    company: "Alphabet / Google",
    bio: "Sundar Pichai leads Alphabet through its most transformative period since the founding of Google, weaving AI across search, cloud and devices.",
    edition: "Q2 2026 — Search & AI Edition",
    initials: "SP",
  },
  {
    rank: 5,
    name: "Satya Nadella",
    title: "Chairman & CEO",
    company: "Microsoft",
    bio: "Satya Nadella's decade at Microsoft's helm has been defined by a relentless cloud-first, AI-first transformation of the company's product line.",
    edition: "Q1 2026 — Cloud & Copilot Edition",
    initials: "SN",
  },
  {
    rank: 6,
    name: "Elon Musk",
    title: "CEO",
    company: "Tesla / SpaceX / xAI",
    bio: "Elon Musk remains the most consequential entrepreneur of his generation, simultaneously running Tesla, SpaceX and xAI's rapid model development.",
    edition: "Q3 2026 — Space & EV Edition",
    initials: "EM",
  },
  {
    rank: 7,
    name: "Tim Cook",
    title: "CEO",
    company: "Apple Inc.",
    bio: "Tim Cook has stewarded Apple through its most profitable era, guiding its journey to becoming one of the world's most valuable companies.",
    edition: "Q2 2026 — Apple Intelligence Edition",
    initials: "TC",
  },
  {
    rank: 8,
    name: "Larry Fink",
    title: "Chairman & CEO",
    company: "BlackRock",
    bio: "Larry Fink manages more money than any other person in history, directing BlackRock's roughly $11.6 trillion in assets under management.",
    edition: "Q1 2026 — Asset Management Edition",
    initials: "LF",
  },
];

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
    <Link to={`/article/ceo-opinion-${index !== undefined ? index + 1 : 1}`} className="group flex cursor-pointer gap-4 border-b border-gray-200 py-4 last:border-b-0">
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
    </Link>
  );
}

/* ============================================================
   COMPANY COVERAGE ROW
============================================================ */

function CompanyCoverage({
  company,
  title,
  time,
}: {
  company: string;
  title: string;
  time: string;
}) {
  return (
    <article className="group border-b border-gray-200 py-4 last:border-b-0">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-red-600">
          {company}
        </span>

        <span className="flex items-center gap-1 text-[9px] uppercase tracking-wide text-gray-400">
          <Clock size={9} />
          {time}
        </span>
      </div>

      <h3 className="font-serif text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-600">
        {title}
      </h3>
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
            ADVERTISEMENT
        ==================================================== */}

        <PrideTimesAd variant="fifth" />

        {/* ====================================================
            TOP STORIES / LEAD PROFILE
        ==================================================== */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="Top Executive Story"
            title="Lead Profile"
            icon={Users}
          />

          <article className="group grid grid-cols-1 overflow-hidden border-y border-black md:grid-cols-[1.15fr_0.85fr]">

            <div className="relative overflow-hidden bg-gray-100">
              <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-sm bg-red-600 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                {featuredLeader.rank}
              </span>

              <ImageWithFallback
                src={featuredLeader.image}
                alt={featuredLeader.name}
                className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-full md:min-h-[430px]"
              />

              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
            </div>

            <div className="flex flex-col justify-center bg-white p-6 sm:p-8 md:p-10">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                {featuredLeader.edition}
              </p>

              <h2 className="font-serif text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
                {featuredLeader.name}
              </h2>

              <p className="mt-2 text-sm font-medium text-gray-500">
                {featuredLeader.title}
              </p>

              <div className="my-5 h-px bg-gray-200" />

              <p className="text-sm leading-7 text-gray-600">
                {featuredLeader.bio}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-red-600">
                  Executive Profile
                </span>

                <span className="text-[9px] uppercase tracking-[0.12em] text-gray-400">
                  AI Infrastructure
                </span>
              </div>

              <Link to="/article/ceo-jensen-huang" className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-black pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-colors hover:border-red-600 hover:text-red-600">
                Read Full Profile
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </article>
        </section>

        {/* ====================================================
            MAJOR STORIES
        ==================================================== */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="Major Executive Coverage"
            title="Leaders to Watch"
            icon={TrendingUp}
          />

          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadersToWatch.map((leader) => (
              <Link
                to={`/article/ceo-leader-${leader.rank}`}
                key={leader.rank}
                className="group flex cursor-pointer flex-col border-b border-gray-200 py-5 first:pt-0 sm:odd:border-r sm:sm:pr-5 lg:nth-[4n+1]:pr-5 lg:nth-[4n+2]:pr-5 lg:nth-[4n+3]:border-r lg:nth-[4n+3]:pr-5 lg:nth-[4n+4]:border-r-0 lg:nth-[4n+4]:pr-0"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="font-serif text-3xl text-gray-300 transition-colors group-hover:text-red-600">
                    {String(leader.rank).padStart(2, "0")}
                  </span>

                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-red-600">
                    Leader
                  </span>
                </div>

                <div className="mb-4 flex h-[110px] items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
                  <span className="font-serif text-4xl font-bold text-white/90">
                    {leader.initials}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold leading-tight transition-colors group-hover:text-red-600">
                  {leader.name}
                </h3>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  {leader.title}
                </p>

                <p className="mt-1 text-xs font-bold text-gray-900">
                  {leader.company}
                </p>

                <p className="mt-3 line-clamp-3 text-[11px] leading-5 text-gray-600">
                  {leader.bio}
                </p>

                <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.1em] text-red-600">
                  {leader.edition}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ====================================================
            SPONSORED CONTENT
        ==================================================== */}

        <SponsoredBanner />

        {/* ====================================================
            INTERVIEW DESK
        ==================================================== */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="The Interview"
            title="Inside the CEO Mind"
            icon={Quote}
          />

          <div className="grid grid-cols-1 gap-0 border-y border-black lg:grid-cols-[1.35fr_1fr_1fr]">

            {ceoInterviews.map((ceo, index) => (
              <Link
                to={`/article/ceo-interview-${ceo.id}`}
                key={ceo.id}
                className={`group border-b border-gray-200 py-6 lg:border-b-0 lg:px-6 lg:py-6 ${
                  index !== 0 ? "lg:border-l lg:border-gray-200" : ""
                }`}
              >
                <div className="relative mb-5 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={ceo.image}
                    alt={ceo.name}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                      index === 0 ? "h-[270px]" : "h-[190px]"
                    }`}
                  />

                  <span className="absolute left-3 top-3 rounded-sm bg-black px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white">
                    {ceo.topic}
                  </span>
                </div>

                <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                  {ceo.title}
                </p>

                <h3
                  className={`mt-1 font-serif font-bold leading-tight ${
                    index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                  }`}
                >
                  {ceo.name}
                </h3>

                <div className="my-4 h-px bg-gray-200" />

                <div className="relative">
                  <Quote
                    size={18}
                    className="absolute -left-1 -top-2 text-red-600 opacity-30"
                  />

                  <p className="pl-4 font-serif text-sm italic leading-6 text-gray-600">
                    {ceo.quote}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-[10px] text-gray-400">
                    {ceo.duration}
                  </span>

                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-red-600 transition-all group-hover:gap-2">
                    Read Interview
                    <ChevronRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ====================================================
            EDITORIAL DESK
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
                <Link
                  to={`/article/ceo-women-${leader.rank}`}
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
                </Link>
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
                <Link
                  to={`/article/ceo-move-${move.id}`}
                  key={move.id}
                  className="group cursor-pointer border-b border-gray-200 py-4 last:border-b-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-red-600">
                      {move.role}
                    </span>

                    <span className="flex items-center gap-1 text-[9px] text-gray-400">
                      <Clock size={9} />
                      {move.time}
                    </span>
                  </div>

                  <h3 className="mt-1.5 font-serif text-sm font-bold leading-snug transition-colors group-hover:text-red-600">
                    {move.person}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-5 text-gray-600">
                    {move.move}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================
            COMPANY / TOPIC COVERAGE
        ==================================================== */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="Corporate Intelligence"
            title="Executive Company Coverage"
            icon={Briefcase}
          />

          <div className="grid grid-cols-1 gap-x-8 border-y border-black md:grid-cols-3">

            <div className="border-b border-gray-200 md:border-b-0 md:border-r md:pr-6">
              <div className="py-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
                  Technology
                </p>

                <h3 className="mt-1 font-serif text-xl font-bold">
                  AI & Technology Leaders
                </h3>
              </div>

              <CompanyCoverage
                company="NVIDIA"
                title="AI infrastructure remains central to executive strategy"
                time="Latest"
              />

              <CompanyCoverage
                company="MICROSOFT"
                title="Cloud and AI remain central themes in leadership strategy"
                time="Latest"
              />

              <CompanyCoverage
                company="ALPHABET"
                title="AI reshapes search, cloud and digital services"
                time="Latest"
              />
            </div>

            <div className="border-b border-gray-200 md:border-b-0 md:border-r md:px-6">
              <div className="py-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
                  Corporate
                </p>

                <h3 className="mt-1 font-serif text-xl font-bold">
                  Global Business Leaders
                </h3>
              </div>

              <CompanyCoverage
                company="APPLE"
                title="Leadership focus remains on technology and product strategy"
                time="Latest"
              />

              <CompanyCoverage
                company="BLACKROCK"
                title="Asset management leadership faces changing market conditions"
                time="Latest"
              />

              <CompanyCoverage
                company="TESLA"
                title="Executive strategy spans mobility, energy and technology"
                time="Latest"
              />
            </div>

            <div className="md:pl-6">
              <div className="py-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
                  Global Business
                </p>

                <h3 className="mt-1 font-serif text-xl font-bold">
                  Leadership Across Markets
                </h3>
              </div>

              <CompanyCoverage
                company="RELIANCE"
                title="Leadership strategy expands across telecom, retail and energy"
                time="Latest"
              />

              <CompanyCoverage
                company="IBM"
                title="Corporate leadership continues strategic transformation"
                time="Latest"
              />

              <CompanyCoverage
                company="ADOBE"
                title="Technology leadership focuses on evolving digital markets"
                time="Latest"
              />
            </div>
          </div>
        </section>

        {/* ====================================================
            LEADERSHIP PLAYBOOK
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
            NEWSLETTER
        ==================================================== */}

        <div className="mt-14">
          <NewsletterCTA />
        </div>

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
