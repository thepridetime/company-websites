import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  BookOpen,
  Download,
  Crown,
  ChevronRight,
  Play,
  FileText,
  Sparkles,
  X,
  ArrowRight,
  Compass,
  Users,
  TrendingUp,
  Clock,
  Lock,
} from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

import AxisImg from "../../../imports/Axis03.png";
import ErikaImg from "../../../imports/Erika.png";
import ErikaImg1 from "../../../imports/Erika01.png";
import ErikaImg2 from "../../../imports/Erika02.png";
import EyeslImg1 from "../../../imports/Eyesl01.png";
import EyeslImg2 from "../../../imports/Eyesl02.png";
import EddieImg from "../../../imports/Eddie.png";
import TribeImg from "../../../imports/TribePay.png";
import TribePayImg from "../../../imports/TribePay04.png";
import ceoJensenHuang from "../../../imports/ceo-jensen-huang.png";
import ptGlobalMarkets from "../../../imports/pt-global-markets.png";

/* =========================================================
   SECTION HEADER
   ========================================================= */

function SH({
  title,
  icon: Icon,
}: {
  title: string;
  icon?: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
}) {
  return (
    <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className="text-gray-400" />}

        <h2 className="font-serif text-2xl leading-snug">
          {title}
        </h2>
      </div>

      <span className="hidden h-[2px] w-6 bg-red-600 sm:block" />
    </div>
  );
}

/* =========================================================
   MAGAZINE ARTICLE DATA
   ========================================================= */

const Articles = [
  {
    id: 1,
    month: "September 2026",
    editionLabel: "SEPTEMBER 2026",
    headline:
      "The Global Business Issue 2026: The Forces Reshaping Business, Technology and the World Economy",
    dek: "The forces transforming global business, technology and the world economy.",
    image: AxisImg,
    premium: false,
    category: "Business",
    author: "The Pride Times Editorial Desk",
    readTime: "12 min read",
    content: `
The world economy is entering a new phase defined by artificial intelligence, changing supply chains, technological competition, energy transformation and a rapidly evolving global business environment.

The September 2026 edition of The Pride Times examines the forces that are changing how companies operate, how investors evaluate opportunities and how governments compete for economic influence.

GLOBAL BUSINESS IN A CHANGING WORLD

Businesses are increasingly required to operate across multiple economic and technological environments. Supply-chain resilience, digital infrastructure and access to skilled talent have become strategic priorities rather than secondary considerations.

Artificial intelligence is also changing the structure of corporate decision-making. Companies are moving beyond experimentation and beginning to integrate AI into research, customer operations, software development, manufacturing and financial analysis.

THE AI ECONOMY

The rapid expansion of artificial intelligence is creating new markets while transforming established industries.

Technology companies are investing heavily in computing infrastructure, data centers, semiconductor capacity and enterprise AI platforms. At the same time, businesses outside the traditional technology sector are adopting AI tools to improve productivity and automate repetitive workflows.

The long-term economic impact will depend not only on computing power but also on how effectively organizations integrate AI into their existing processes.

INDIA'S GLOBAL BUSINESS ROLE

India continues to attract international attention because of its large consumer market, expanding digital infrastructure, technology workforce and growing manufacturing ambitions.

Indian companies are increasingly participating in global technology, financial services, healthcare and manufacturing markets.

The next stage of India's development will depend on productivity growth, infrastructure investment, education, innovation and the ability of businesses to compete internationally.

THE NEW MANUFACTURING LANDSCAPE

Manufacturing is being transformed by automation, robotics, electric vehicles, advanced materials and digitally connected factories.

Companies are reassessing where products are manufactured and how components move across international supply networks.

This has created opportunities for countries that can combine competitive costs with reliable infrastructure and skilled workers.

ENERGY AND THE NEXT INDUSTRIAL CYCLE

Energy remains central to economic growth.

The expansion of renewable energy, battery storage, electric mobility and advanced power infrastructure is creating new investment opportunities while forcing traditional energy companies to rethink their strategies.

The transition will not happen uniformly across markets. Different countries will follow different energy pathways depending on resources, infrastructure and economic priorities.

WHAT COMES NEXT

The coming years will be defined by the interaction between technology, capital, energy and geopolitics.

For companies, adaptability will increasingly become a core competitive advantage.

For investors, understanding structural changes rather than short-term headlines will remain important.

For governments, the ability to build infrastructure, develop talent and encourage innovation will influence economic competitiveness.

The Pride Times September 2026 edition explores these developments through business analysis, technology reporting, leadership perspectives and global economic trends.
`,
  },

  {
    id: 2,
    month: "August 2026",
    editionLabel: "AUGUST 2026",
    headline:
      "Healthcare 2030: The Biotech Revolution Saving Millions of Lives",
    dek: "The biotech revolution saving millions of lives.",
    image: ErikaImg,
    images: [ErikaImg, ErikaImg1, ErikaImg2],
    premium: false,
    category: "Healthcare",
    author: "The Pride Times Health Desk",
    readTime: "10 min read",
    content: `
Biotechnology is transforming modern medicine.

From gene editing to advanced diagnostics, researchers are developing technologies that could change how diseases are detected, treated and prevented.

GENE EDITING

Gene-editing technologies have created new possibilities for treating diseases associated with specific genetic mutations.

The field continues to evolve as researchers work on improving precision, safety and accessibility.

DIGITAL HEALTH

Artificial intelligence is increasingly being used to analyze medical data, support diagnostics and accelerate research.

Healthcare organizations are also adopting digital systems that allow patients and clinicians to access information more efficiently.

THE FUTURE OF MEDICINE

The healthcare industry is moving toward more personalized approaches to treatment.

Instead of relying exclusively on generalized therapies, researchers are exploring treatments designed around individual biological characteristics.

The combination of biotechnology, AI and advanced diagnostics could become one of the defining healthcare trends of the coming decade.
`,
  },

  {
    id: 3,
    month: "July 2026",
    editionLabel: "JULY 2026",
    headline:
      "The Electric Future: How EVs Are Rewriting the Rules of Mobility",
    dek: "How EVs are rewriting the rules of mobility.",
    image: EyeslImg1,
    images: [EyeslImg1, EyeslImg2],
    premium: false,
    category: "Technology",
    author: "The Pride Times Mobility Desk",
    readTime: "8 min read",
    content: `
Electric vehicles are changing the automotive industry.

The transformation extends beyond replacing combustion engines with electric motors. It is also reshaping battery manufacturing, charging infrastructure, software and automotive supply chains.

BATTERY TECHNOLOGY

Battery technology remains one of the most important areas of competition in the EV industry.

Manufacturers are working to increase energy density, reduce costs and improve charging performance.

SOFTWARE-DEFINED VEHICLES

Modern vehicles increasingly rely on software.

Vehicle manufacturers are developing connected platforms capable of receiving software updates, collecting data and supporting new digital services.

THE CHARGING NETWORK

Charging infrastructure will remain critical as EV adoption grows.

Governments, utilities and private companies are investing in charging networks designed to support both urban drivers and long-distance travel.

THE NEXT AUTOMOTIVE INDUSTRY

The future automotive market will increasingly combine manufacturing, software, energy and digital services.

Companies that adapt to these changes will operate in an industry fundamentally different from the traditional automobile business.
`,
  },

  {
    id: 4,
    month: "June 2026",
    editionLabel: "JUNE 2026",
    headline:
      "Person of the Year: The Leaders Who Shaped the New Business Era",
    dek: "The leaders who shaped the new business era.",
    image: EddieImg,
    images: [EddieImg, TribeImg, TribePayImg],
    premium: false,
    category: "Leadership",
    author: "The Pride Times Editorial Desk",
    readTime: "11 min read",
    content: `
Leadership is being transformed by technology, global competition and changing expectations from employees and consumers.

The leaders featured in this edition represent different approaches to innovation, organizational growth and long-term strategy.

TECHNOLOGY LEADERS

Technology executives continue to influence industries far beyond software.

Artificial intelligence, cloud computing, semiconductors and robotics are becoming central components of the global economy.

BUSINESS TRANSFORMATION

Successful organizations increasingly need leaders who can manage technological change while maintaining a clear organizational strategy.

THE NEXT GENERATION OF LEADERSHIP

Future leadership will require a combination of technical understanding, strategic thinking and the ability to operate across international markets.

The Pride Times examines the people and ideas influencing this new era of business.
`,
  },
];

/* =========================================================
   PREMIUM CONTENT
   ========================================================= */

const premiumContent = [
  {
    title:
      "The Full Jensen Huang Interview: 2 Hours with the Most Important CEO in Tech",
    duration: "2 hr read",
    type: "Interview",
    category: "Technology",
    badge: "INTERVIEW",
    image: ceoJensenHuang,
  },
  {
    title:
      "Pride Times Annual Investor Conference: Speaker Sessions",
    duration: "16 hrs",
    type: "Video",
    category: "Finance",
    badge: "CONFERENCE",
    image: AxisImg,
  },
  {
    title:
      "Deep Dive: India's Unicorn Ecosystem — 200 Startups Analyzed",
    duration: "90 min read",
    type: "Research",
    category: "India",
    badge: "RESEARCH",
    image: TribeImg,
  },
  {
    title:
      "Quarterly Market Analysis: Professional-Grade Data for Every Sector",
    duration: "45 min read",
    type: "Markets",
    category: "Finance",
    badge: "MARKET ANALYSIS",
    image: TribePayImg,
  },
];

/* =========================================================
   SPECIAL REPORTS
   ========================================================= */

const specialReports = [
  {
    title: "Global AI Readiness Index 2026",
    pages: 48,
    format: "PDF",
    category: "Technology",
    premium: true,
  },
  {
    title: "World's 100 Best-Managed Companies",
    pages: 72,
    format: "PDF",
    category: "Rankings",
    premium: false,
  },
  {
    title: "India Economic Outlook 2026–2030",
    pages: 56,
    format: "PDF",
    category: "Economy",
    premium: true,
  },
  {
    title: "Clean Energy Investment Report Q1 2026",
    pages: 34,
    format: "PDF",
    category: "Energy",
    premium: false,
  },
  {
    title: "Global Cybersecurity Threat Report 2026",
    pages: 61,
    format: "PDF",
    category: "Security",
    premium: true,
  },
];

/* =========================================================
   MAGAZINE PAGE
   ========================================================= */

export function MagazinePage() {
  const { isSignedIn, user } = useAuth();

  const isPremium = user?.tier === "premium";

  const [selectedArticle, setSelectedArticle] =
    useState<any>(null);

  const [currentImage, setCurrentImage] = useState(0);

  const [zoom, setZoom] = useState(1);

  const [activeFilter, setActiveFilter] = useState("All Editions");

  const heroArticle = Articles[0];

  const openArticle = (article: any) => {
    setSelectedArticle(article);
    setCurrentImage(0);
    setZoom(1);
  };

  const filteredIssues =
    activeFilter === "All Editions"
      ? Articles
      : Articles.filter((issue) => issue.category === activeFilter);

  // "View All Editions": show every edition and bring the list into view.
  const showAllEditions = () => {
    setActiveFilter("All Editions");
    document
      .getElementById("all-editions")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">

      {/* =====================================================
          MAGAZINE HEADER
         ===================================================== */}

      <div className="mb-8 border-b-2 border-black pb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-gray-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500">
                Digital &amp; Print
              </span>
            </div>

            <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-gray-900 md:text-4xl">
              The Pride Times Magazine
            </h1>

            <p className="mt-1 text-xs text-gray-500 md:text-sm">
              In-depth stories, exclusive interviews and global insights for tomorrow's leaders.
            </p>
          </div>

          <Link
            to="/archive"
            className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black transition-colors hover:text-red-600"
          >
            <span>Explore Magazine</span>
            <ArrowRight size={13} className="text-red-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* =====================================================
          1. LATEST ISSUE
         ===================================================== */}

      <section className="mb-14">

        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-600">
            September 2026 Edition
          </p>

          <span className="hidden text-[11px] font-semibold uppercase tracking-widest text-gray-400 sm:block">
            The Global Business Issue
          </span>
        </div>

        {/* Hero Magazine Card */}
        <div className="overflow-hidden border border-zinc-800 bg-[#0c0d0e] text-white">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">

            {/* Left: Magazine Cover */}
            <div className="flex items-center justify-center p-6 sm:p-8 lg:col-span-5 lg:p-10">
              <div
                onClick={() => openArticle(heroArticle)}
                className="group relative aspect-[3/4] w-full max-w-[320px] cursor-pointer overflow-hidden border border-zinc-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10 transition-transform duration-500 ease-out hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              >
                <ImageWithFallback
                  src={heroArticle.image}
                  alt={heroArticle.headline}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Right: Issue Details */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7 lg:p-10 lg:pl-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-red-500">
                COVER STORY
              </p>

              <h2 className="font-serif text-3xl leading-[1.15] text-white md:text-4xl">
                The Global Business Issue 2026
              </h2>

              <p className="mt-2 text-base font-normal text-gray-300 md:text-lg">
                The Forces Reshaping Business, Technology and the World Economy
              </p>

              <p className="mt-4 text-xs leading-6 text-gray-400 md:text-sm">
                The September 2026 edition examines the forces transforming global business, technology, energy and the world economy, with exclusive interviews, data-driven insights and expert analysis.
              </p>

              <div className="mt-5 flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1.5 text-gray-300">
                  <Clock size={13} className="text-red-500" />
                  12 min read
                </span>
                <span>•</span>
                <span>The Pride Times Editorial Desk</span>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openArticle(heroArticle)}
                  className="flex items-center gap-2 bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 cursor-pointer"
                >
                  Read Digital Edition
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  className="border border-zinc-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-zinc-400 hover:bg-white/5 cursor-pointer"
                >
                  Subscribe for Print
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Highlight Cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3.5 border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-200/60">
              <Compass size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Global Insights</h3>
              <p className="mt-0.5 text-xs text-gray-500">
                In-depth analysis from industry leaders
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-200/60">
              <Users size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Exclusive Interviews</h3>
              <p className="mt-0.5 text-xs text-gray-500">
                Conversations with global CEOs
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-200/60">
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Future Trends</h3>
              <p className="mt-0.5 text-xs text-gray-500">
                Technology, markets and the next decade
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* =====================================================
          2. ALL EDITIONS
         ===================================================== */}

      <section id="all-editions" className="mb-16 scroll-mt-24">

        <div className="mb-4 flex items-center justify-between border-b-2 border-black pb-2">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-gray-700" />
            <h2 className="font-serif text-2xl font-normal text-gray-900 md:text-3xl">
              All Editions
            </h2>
          </div>

          <button
            type="button"
            onClick={showAllEditions}
            className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-red-600 transition-colors hover:text-red-700 cursor-pointer"
          >
            <span>View All Editions</span>
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <p className="mb-5 max-w-2xl text-xs text-gray-500 md:text-sm">
          Explore our magazine archive featuring business, technology, healthcare, manufacturing, leadership and more.
        </p>

        {/* Filter Row */}
        <div className="mb-7 flex flex-wrap items-center gap-2">
          {["All Editions", "Business", "Technology", "Healthcare", "Leadership"].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="group flex cursor-pointer flex-col"
              onClick={() => openArticle(issue)}
            >
              {/* Magazine Cover */}
              <div className="relative aspect-[3/4] overflow-hidden border border-gray-200 bg-gray-100 shadow-md transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:shadow-xl">
                <ImageWithFallback
                  src={issue.image}
                  alt={issue.headline}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Information below cover */}
              <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-red-600">
                {issue.editionLabel}
              </p>

              <h3 className="mt-1 line-clamp-3 font-serif text-sm font-medium leading-snug text-gray-900 transition-colors group-hover:text-red-600">
                {issue.headline}
              </h3>

              <div className="mt-2.5 flex items-center gap-1 text-red-600">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Read Issue
                </span>
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =====================================================
          3. PREMIUM EXCLUSIVE CONTENT
         ===================================================== */}

      <section className="mb-16">

        <div className="mb-4 flex items-center justify-between border-b-2 border-black pb-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 ring-1 ring-amber-300">
              <Crown size={14} className="text-amber-600" />
            </div>

            <h2 className="font-serif text-2xl font-normal text-gray-900 md:text-3xl">
              Premium Exclusive Content
            </h2>
          </div>

          <Link
            to={isSignedIn ? "/dashboard" : "/login"}
            className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-red-600 transition-colors hover:text-red-700"
          >
            <span>View All Premium</span>
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <p className="mb-6 max-w-3xl text-xs text-gray-500 md:text-sm">
          Go beyond the headlines with exclusive interviews, research, conference sessions and market intelligence.
        </p>

        {/* 4 Equal-sized Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {premiumContent.map((content) => (
            <div
              key={content.title}
              className="group relative cursor-pointer overflow-hidden border border-zinc-800 bg-[#0c0d0e] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-zinc-700 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <ImageWithFallback
                  src={content.image}
                  alt={content.title}
                  className="h-full w-full object-cover opacity-85"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

                {/* Content Category Badge */}
                <span className="absolute left-3 top-3 bg-amber-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">
                  {content.badge}
                </span>

                {/* Subtle Gold Lock Badge */}
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-amber-400/50 bg-black/80 text-amber-400">
                  <Lock size={11} />
                </span>

                {/* Content Details */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="line-clamp-3 font-serif text-sm font-medium leading-snug text-white">
                    {content.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-300">
                    <Clock size={11} className="text-amber-400" />
                    <span>{content.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Unlock Premium Strip */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border border-amber-300/60 bg-[#fff9ea] p-4 sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <Crown size={16} />
            </div>

            <div>
              <h3 className="font-serif text-sm font-bold text-gray-900 md:text-base">
                Unlock Premium Intelligence
              </h3>

              <p className="text-xs text-gray-600">
                Access exclusive content, research, data and expert interviews.
              </p>
            </div>
          </div>

          <Link
            to={isSignedIn ? "/dashboard" : "/login"}
            className="flex flex-shrink-0 items-center gap-1.5 bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-amber-600"
          >
            Start Free 30-Day Trial
            <ArrowRight size={13} />
          </Link>
        </div>

      </section>

      {/* =====================================================
          4. SPECIAL REPORTS & RESEARCH
         ===================================================== */}

      <section className="mb-16">

        <div className="mb-4 flex items-center justify-between border-b-2 border-black pb-2">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-gray-700" />
            <h2 className="font-serif text-2xl font-normal text-gray-900 md:text-3xl">
              Special Reports &amp; Research
            </h2>
          </div>

          <Link
            to="/archive"
            className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-red-600 transition-colors hover:text-red-700"
          >
            <span>View All Reports</span>
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <p className="mb-6 max-w-2xl text-xs text-gray-500 md:text-sm">
          Downloadable reports covering technology, markets, energy, cybersecurity and the global economy.
        </p>

        {/* 2-Column Document Rows */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {specialReports.map((report) => (
            <div
              key={report.title}
              className="group flex cursor-pointer items-center justify-between border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-gray-400 hover:shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded border border-red-200 bg-red-50 text-red-600">
                  <FileText size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-red-600">
                    {report.title}
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {report.pages} pages • {report.format} • {report.category}
                  </p>
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center gap-3">
                {report.premium && (
                  <Crown size={15} className="text-amber-500" />
                )}

                <div className="flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors group-hover:bg-gray-100 group-hover:text-black">
                  <Download size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =====================================================
          5. PREMIUM SUBSCRIPTION BANNER
         ===================================================== */}

      {!isPremium && (

        <section className="relative mb-12 overflow-hidden border border-zinc-800 bg-[#0c0d0e] p-8 text-white md:p-12">

          {/* Subtle Globe Texture on Right */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-25 md:w-1/2">
            <ImageWithFallback
              src={ptGlobalMarkets}
              alt="Global Markets"
              className="h-full w-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0e] via-[#0c0d0e]/60 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl text-center">

            <div className="mb-2 flex items-center justify-center gap-1.5 text-amber-400">
              <Crown size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                Premium Membership
              </span>
            </div>

            <h2 className="font-serif text-2xl font-normal text-white md:text-3xl">
              Unlock the Complete Pride Times Experience
            </h2>

            {/* Feature Row */}
            <div className="my-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-300">
              <span className="flex items-center gap-1.5">
                <Crown size={13} className="text-amber-400" />
                Premium Interviews
              </span>

              <span className="flex items-center gap-1.5">
                <FileText size={13} className="text-amber-400" />
                Exclusive Research
              </span>

              <span className="flex items-center gap-1.5">
                <Users size={13} className="text-amber-400" />
                Conference Access
              </span>

              <span className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" />
                Subscriber Newsletters
              </span>
            </div>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to={isSignedIn ? "/dashboard" : "/login"}
                className="bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
              >
                Start Free 30-Day Trial
              </Link>

              <button
                type="button"
                className="border border-zinc-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-zinc-400 hover:bg-white/5 cursor-pointer"
              >
                Compare Plans
              </button>
            </div>

          </div>

        </section>

      )}

      {/* =====================================================
          ARTICLE MODAL
         ===================================================== */}

      {selectedArticle && (

        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/70">

          <div className="relative mx-auto min-h-screen max-w-5xl bg-white">

            {/* CLOSE */}

            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition-colors hover:bg-gray-100"
              aria-label="Close article"
            >
              <X size={18} />
            </button>

            {/* =================================================
                IMAGE VIEWER
               ================================================= */}

            <div
              className="relative overflow-auto bg-black"
              onWheel={(event) => {

                event.preventDefault();

                if (event.deltaY < 0) {
                  setZoom((value) =>
                    Math.min(value + 0.1, 5)
                  );
                } else {
                  setZoom((value) =>
                    Math.max(value - 0.1, 1)
                  );
                }

              }}
            >

              <img
                src={
                  selectedArticle.images
                    ? selectedArticle.images[currentImage]
                    : selectedArticle.image
                }
                alt={selectedArticle.headline}
                className="max-h-[700px] w-full object-contain transition-transform duration-200"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center center",
                }}
              />

              {/* IMAGE NAVIGATION */}

              {selectedArticle.images &&
                selectedArticle.images.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        setCurrentImage((previous) =>
                          previous === 0
                            ? selectedArticle.images.length - 1
                            : previous - 1
                        );

                        setZoom(1);
                      }}
                      className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition-colors hover:bg-gray-100"
                    >
                      ←
                    </button>

                    <button
                      onClick={() => {
                        setCurrentImage((previous) =>
                          previous ===
                          selectedArticle.images.length - 1
                            ? 0
                            : previous + 1
                        );

                        setZoom(1);
                      }}
                      className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition-colors hover:bg-gray-100"
                    >
                      →
                    </button>
                  </>
                )}

            </div>

            {/* =================================================
                ARTICLE CONTENT
               ================================================= */}

            <div className="px-6 py-8 md:px-12 md:py-10">

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600">
                {selectedArticle.category}
              </p>

              <h1 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
                {selectedArticle.headline}
              </h1>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-500">

                <span>
                  {selectedArticle.author}
                </span>

                <span>•</span>

                <span>
                  {selectedArticle.readTime || "4 min read"}
                </span>

                <span>•</span>

                <span>
                  {selectedArticle.month}
                </span>

              </div>

              {selectedArticle.content && (

                <div className="mt-8 whitespace-pre-line text-base leading-8 text-gray-700">

                  {selectedArticle.content}

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default MagazinePage;
