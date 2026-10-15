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
import ceoJensen from "../../../imports/ceo-jensen-huang.png";
import ceoSam from "../../../imports/ceo-sam-altman.png";
import ceoMukesh from "../../../imports/ceo-mukesh-ambani.png";
import ceoSundar from "../../../imports/ceo-sundar-pichai.png";
import ceoSatya from "../../../imports/ceo-satya-nadella.png";
import ceoElon from "../../../imports/ceo-elon-musk.png";
import ceoTim from "../../../imports/ceo-tim-cook.png";
import ceoLarry from "../../../imports/ceo-larry-fink.png";
import ceoIndra from "../../../imports/ceo-indra-nooyi.png";
import { PrideTimesAd } from "../AdSenseSlots";

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
   EDITORIAL SECTION HEADER (MATCHING REFERENCE DESIGN)
============================================================ */

function EditorialSectionHeader({
  title,
}: {
  title: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <h2 className="flex items-center font-serif text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
        <span className="mr-3 inline-block h-[4px] w-6 shrink-0 bg-red-600 self-center" />
        {title}
      </h2>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

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
  edition: "Q3 2026 — AI INFRASTRUCTURE EDITION",
  name: "Jensen Huang",
  title: "President & CEO, NVIDIA Corporation · United States",
  bio: "Jensen Huang co-founded NVIDIA in 1993 and has led the company from a gaming graphics specialist to the world's most valuable semiconductor company. His vision of the AI-first computing paradigm has reshaped industries from autonomous vehicles to drug discovery.",
  quote: "The next era of computing will amplify human creativity in ways we've never seen before.",
  quoteAuthor: "JENSEN HUANG",
  image: ceoJensen,
};

/* ============================================================
   LEADERS TO WATCH (8 LEADERS IN 2 ROWS OF 4)
============================================================ */

const leadersToWatch = [
  {
    rank: 1,
    number: "01",
    name: "Jensen Huang",
    title: "President and CEO, NVIDIA",
    bio: "On AI, accelerated computing and the next era of innovation.",
    image: ceoJensen,
  },
  {
    rank: 2,
    number: "02",
    name: "Sam Altman",
    title: "CEO, OpenAI",
    bio: "On artificial general intelligence and the future of human potential.",
    image: ceoSam,
  },
  {
    rank: 3,
    number: "03",
    name: "Mukesh Ambani",
    title: "Chairman and MD, Reliance Industries",
    bio: "On India's digital transformation and global ambitions.",
    image: ceoMukesh,
  },
  {
    rank: 4,
    number: "04",
    name: "Sundar Pichai",
    title: "CEO, Google",
    bio: "On AI, search and building a more helpful internet.",
    image: ceoSundar,
  },
  {
    rank: 5,
    number: "05",
    name: "Satya Nadella",
    title: "Chairman and CEO, Microsoft",
    bio: "On cloud-first, AI-first transformation and the next decade of software.",
    image: ceoSatya,
  },
  {
    rank: 6,
    number: "06",
    name: "Elon Musk",
    title: "CEO, Tesla / SpaceX / xAI",
    bio: "On space exploration, autonomous mobility and frontier artificial intelligence.",
    image: ceoElon,
  },
  {
    rank: 7,
    number: "07",
    name: "Tim Cook",
    title: "CEO, Apple",
    bio: "On Apple Intelligence, privacy-first computing and hardware excellence.",
    image: ceoTim,
  },
  {
    rank: 8,
    number: "08",
    name: "Larry Fink",
    title: "Chairman and CEO, BlackRock",
    bio: "On global capital allocation, infrastructure investing and energy transition.",
    image: ceoLarry,
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
    topic: "IN CONVERSATION",
    quote:
      "The next decade will be defined by how organizations use AI to augment human capability.",
    duration: "35 min read",
    image: ceoSatya,
  },
  {
    id: 2,
    name: "Indra Nooyi",
    title: "Former CEO, PepsiCo",
    topic: "LEADERSHIP",
    quote:
      "The companies that will win in the next 20 years are those that embed purpose into their P&L.",
    duration: "28 min read",
    image: ceoIndra,
  },
  {
    id: 3,
    name: "Jensen Huang",
    title: "CEO, NVIDIA",
    topic: "THE BIG PICTURE",
    quote:
      "We are not a chip company. We are the engine of the AI industrial revolution.",
    duration: "42 min read",
    image: ceoJensen,
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
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 md:py-10 lg:px-8">

        {/* ====================================================
            1. CEO SPOTLIGHT SECTION (WIDE EDITORIAL COMPOSITION)
        ==================================================== */}

        <section className="mb-16 border-b border-gray-200 pb-14 pt-2">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_290px_1fr_270px] lg:gap-10 items-start">
            {/* Column 1: Introduction */}
            <div className="flex flex-col">
              <div className="w-8 h-[3px] bg-red-600 mb-2.5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
                EXECUTIVE PROFILE
              </span>
              <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[44px] leading-[1.05]">
                CEO<br />Spotlight
              </h1>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-gray-600">
                In-depth conversations with the world&apos;s most influential business leaders, innovators and change-makers who are shaping the future.
              </p>
            </div>

            {/* Column 2: Jensen Huang Portrait */}
            <div className="aspect-[3.6/4] w-full max-w-[290px] overflow-hidden bg-gray-100 shadow-sm">
              <ImageWithFallback
                src={featuredLeader.image}
                alt={featuredLeader.name}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Column 3: Name, Title, Bio & Profile Link */}
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                {featuredLeader.edition}
              </span>

              <h2 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 leading-tight">
                {featuredLeader.name}
              </h2>

              <p className="mt-1.5 text-xs sm:text-[13px] font-semibold text-gray-600">
                {featuredLeader.title}
              </p>

              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-gray-700">
                {featuredLeader.bio}
              </p>

              <div className="mt-5 flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">
                  EXECUTIVE PROFILE
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-gray-400">
                  AI INFRASTRUCTURE
                </span>
              </div>

              <Link
                to="/article/ceo-jensen-huang"
                className="mt-4 inline-flex w-fit items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition-colors hover:text-red-600"
              >
                READ FULL PROFILE
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Column 4: Quote Panel */}
            <div className="pt-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold leading-none text-red-600 select-none">
                “
              </span>

              <blockquote className="mt-3 font-serif text-base sm:text-lg italic font-normal leading-snug text-gray-900">
                &ldquo;{featuredLeader.quote}&rdquo;
              </blockquote>

              <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500">
                — {featuredLeader.quoteAuthor}
              </span>
            </div>
          </div>
        </section>

        {/* ====================================================
            ADVERTISEMENT
        ==================================================== */}

        <PrideTimesAd variant="first" className="mb-14" />

        {/* ====================================================
            2. LEADERS TO WATCH (8 HORIZONTAL CARDS IN 2 ROWS OF 4)
        ==================================================== */}

        <section className="mb-14 border-b border-gray-200 pb-12">
          <EditorialSectionHeader
            title="Leaders to Watch"
          />

          <div className="grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadersToWatch.map((leader) => (
              <Link
                to={`/article/ceo-leader-${leader.rank}`}
                key={leader.rank}
                className="group flex flex-col border-b border-gray-200 pb-6 transition-colors"
              >
                {/* Numbered Row */}
                <div className="mb-3.5 flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-sm font-bold text-red-600 tracking-wider">
                    {leader.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-600">
                    Leader
                  </span>
                </div>

                {/* Horizontal card: thumbnail left, details right */}
                <div className="flex gap-4">
                  <div className="aspect-[4/5] w-[95px] sm:w-[105px] shrink-0 overflow-hidden bg-gray-100 shadow-sm">
                    <ImageWithFallback
                      src={leader.image}
                      alt={leader.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex min-w-0 flex-col">
                    <h3 className="font-serif text-base sm:text-[17px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-600">
                      {leader.name}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-500 line-clamp-1">
                      {leader.title}
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-gray-600 line-clamp-3">
                      {leader.bio}
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black group-hover:text-red-600 transition-colors">
                      Read Profile
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ====================================================
            3. INSIDE THE CEO MIND (3 EQUAL-HEIGHT HORIZONTAL CARDS)
        ==================================================== */}

        <section className="mb-16">
          <EditorialSectionHeader
            title="Inside the CEO Mind"
          />

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {ceoInterviews.map((ceo) => (
              <Link
                to={`/article/ceo-interview-${ceo.id}`}
                key={ceo.id}
                className="group flex gap-5 border border-gray-200 bg-white p-5 sm:p-6 transition-all hover:border-gray-300 hover:shadow-md"
              >
                <div className="aspect-[4/5] w-[115px] sm:w-[130px] shrink-0 overflow-hidden bg-gray-100 shadow-sm">
                  <ImageWithFallback
                    src={ceo.image}
                    alt={ceo.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">
                      {ceo.topic}
                    </span>

                    <h3 className="mt-1.5 font-serif text-lg sm:text-xl font-bold text-gray-900 leading-snug transition-colors group-hover:text-red-600">
                      {ceo.name}
                    </h3>

                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-gray-600 line-clamp-4">
                      &ldquo;{ceo.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-[10px] text-gray-400 font-medium">
                      {ceo.duration}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black group-hover:text-red-600 transition-colors">
                      Read Interview
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ====================================================
            ADVERTISEMENT
        ==================================================== */}

        <PrideTimesAd variant="fifth" className="mb-16" />

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
