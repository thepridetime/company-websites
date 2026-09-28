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
    month: "September 28, 2026",
    headline:
      "The Global Business Issue 2026: The Forces Reshaping Business, Technology and the World Economy",
    image: AxisImg,
    premium: false,
    category: "Cover Story",
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
    headline:
      "Healthcare 2030: The Biotech Revolution Saving Millions of Lives",
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
    headline:
      "The Electric Future: How EVs Are Rewriting the Rules of Mobility",
    image: EyeslImg1,
    images: [EyeslImg1, EyeslImg2],
    premium: false,
    category: "Manufacturing",
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
    headline:
      "Person of the Year: The Leaders Who Shaped the New Business Era",
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
    image: EddieImg,
  },
  {
    title:
      "Pride Times Annual Investor Conference: All 40 Speaker Sessions",
    duration: "16 hrs",
    type: "Video",
    category: "Finance",
    image: AxisImg,
  },
  {
    title:
      "Deep Dive: India's Unicorn Ecosystem — 200 Startups Analyzed",
    duration: "90 min read",
    type: "Research",
    category: "India",
    image: TribeImg,
  },
  {
    title:
      "Quarterly Market Analysis: Professional-Grade Data for Every Sector",
    duration: "45 min read",
    type: "Markets",
    category: "Finance",
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
  },
  {
    title: "World's 100 Best-Managed Companies",
    pages: 72,
    format: "PDF",
    category: "Rankings",
  },
  {
    title: "India Economic Outlook 2026–2030",
    pages: 56,
    format: "PDF",
    category: "Economy",
  },
  {
    title: "Clean Energy Investment Report Q1 2026",
    pages: 34,
    format: "PDF",
    category: "Energy",
  },
  {
    title: "Global Cybersecurity Threat Report 2026",
    pages: 62,
    format: "PDF",
    category: "Security",
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

  const heroArticle = Articles[0];

  const openArticle = (article: any) => {
    setSelectedArticle(article);
    setCurrentImage(0);
    setZoom(1);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">

      {/* =====================================================
          MAGAZINE HEADER
         ===================================================== */}

      <div className="mb-10 flex items-center gap-3 border-b-4 border-black pb-3">
        <BookOpen size={22} />

        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gray-500">
            Digital &amp; Print
          </span>

          <h1 className="mt-0.5 font-serif text-3xl md:text-4xl">
            The Pride Times Magazine
          </h1>
        </div>
      </div>

      {/* =====================================================
          LATEST ISSUE
         ===================================================== */}

      <section className="mb-14">

        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-red-600">
              September 2026 Edition
            </p>

            <h2 className="font-serif text-2xl md:text-3xl">
              Latest Issue
            </h2>
          </div>

          <span className="hidden text-xs uppercase tracking-widest text-gray-400 sm:block">
            The Global Business Issue
          </span>
        </div>

        <div
          onClick={() => openArticle(heroArticle)}
          className="group cursor-pointer overflow-hidden border border-gray-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* COVER */}
            <div className="relative overflow-hidden bg-black">

              <span className="absolute left-3 top-3 z-10 bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                September 2026
              </span>

              <ImageWithFallback
                src={heroArticle.image}
                alt={heroArticle.headline}
                className="h-72 w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.04] md:h-[460px]"
              />

              <div className="absolute bottom-4 left-4">
                <div className="border border-white/40 bg-black/70 px-3 py-2 backdrop-blur-sm">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-300">
                    THE PRIDE TIMES
                  </p>

                  <p className="mt-1 font-serif text-lg text-white">
                    GLOBAL BUSINESS
                  </p>
                </div>
              </div>
            </div>

            {/* COVER STORY */}
            <div className="flex flex-col justify-center bg-black p-8 text-white md:p-10">

              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-red-500">
                {heroArticle.category}
              </p>

              <h2 className="mb-4 font-serif text-2xl leading-[1.15] md:text-[36px]">
                {heroArticle.headline}
              </h2>

              <p className="mb-2 text-sm leading-6 text-gray-400">
                The September 2026 edition examines the forces
                transforming global business, technology, energy
                and the world economy.
              </p>

              <p className="mb-7 text-sm text-gray-500">
                {heroArticle.author} · {heroArticle.readTime}
              </p>

              <div className="flex flex-wrap gap-3">

                <span className="bg-red-600 px-5 py-2.5 text-sm font-semibold transition-colors group-hover:bg-red-700">
                  Read Digital Edition →
                </span>

                <span className="border border-gray-600 px-5 py-2.5 text-sm font-semibold transition-colors group-hover:border-gray-400">
                  Subscribe for Print
                </span>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          ALL EDITIONS
         ===================================================== */}

      <section className="mb-16">

        <div className="mb-6">
          <SH
            title="All Editions"
            icon={BookOpen}
          />

          <p className="max-w-2xl text-sm leading-6 text-gray-500">
            Explore the regular Pride Times magazine editions.
            These issues cover business, healthcare, manufacturing,
            leadership and other major themes.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">

          {Articles.map((issue) => (
            <div
              key={issue.id}
              className="group flex cursor-pointer flex-col"
              onClick={() => openArticle(issue)}
            >

              <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-gray-100 shadow-md transition-transform duration-300 group-hover:-translate-y-0.5">

                <ImageWithFallback
                  src={issue.image}
                  alt={issue.headline}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-2 top-2 bg-black/75 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white">
                  {issue.category}
                </div>

              </div>

              <p className="text-[11px] uppercase tracking-wider text-gray-500">
                {issue.month}
              </p>

              <p className="mt-1 line-clamp-3 font-serif text-sm leading-snug transition-colors group-hover:text-red-600">
                {issue.headline}
              </p>

              <div className="mt-1.5 flex items-center gap-1 text-red-600">

                <span className="text-[9px] font-semibold uppercase tracking-wider">
                  Read Issue
                </span>

                <ChevronRight
                  size={12}
                  className="transition-transform group-hover:translate-x-1"
                />

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* =====================================================
          SEPARATOR
         ===================================================== */}

      <div className="mb-16 border-t-4 border-black pt-2">
        <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <span>The Pride Times</span>
          <span>Premium Desk</span>
        </div>
      </div>

      {/* =====================================================
          PREMIUM CONTENT
         ===================================================== */}

      <section className="mb-16">

        <div className="mb-6 flex items-center gap-3 border-b-2 border-black pb-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
            <Crown size={15} className="text-yellow-600" />
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-yellow-600">
              Members Only
            </p>

            <h2 className="font-serif text-2xl">
              Premium Exclusive Content
            </h2>
          </div>

          {!isPremium && (
            <span className="ml-auto hidden bg-yellow-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-yellow-700 sm:block">
              Premium Only
            </span>
          )}

        </div>

        <div className="mb-7 max-w-3xl">

          <p className="text-sm leading-7 text-gray-600">
            Premium Exclusive Content is separate from the regular
            magazine editions. It includes long-form interviews,
            professional research, conference sessions and
            in-depth market intelligence available to subscribers.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {premiumContent.map((content) => (

            <div
              key={content.title}
              className={`group relative overflow-hidden border border-gray-200 bg-black ${
                !isPremium ? "cursor-pointer" : "cursor-pointer"
              }`}
            >

              <div className="relative aspect-[4/5] overflow-hidden">

                <ImageWithFallback
                  src={content.image}
                  alt={content.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />

                <span className="absolute left-2.5 top-2.5 bg-black/70 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white">
                  {content.category}
                </span>

                <span className="absolute right-2.5 top-2.5 rounded-full bg-yellow-400 p-1.5">
                  <Crown size={12} className="text-black" />
                </span>

                <div className="absolute bottom-4 left-3 right-3">

                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/15">
                    {content.type === "Video" ? (
                      <Play size={14} className="text-white" />
                    ) : (
                      <BookOpen size={14} className="text-white" />
                    )}
                  </div>

                  <p className="line-clamp-3 text-sm font-semibold leading-snug text-white">
                    {content.title}
                  </p>

                  <p className="mt-1 text-[11px] text-gray-300">
                    {content.type} · {content.duration}
                  </p>

                </div>

              </div>

              {!isPremium && (
                <div className="border-t border-white/10 bg-black px-3 py-2.5">

                  <div className="flex items-center justify-between">

                    <span className="text-[9px] font-bold uppercase tracking-wider text-yellow-400">
                      Premium Access
                    </span>

                    <ArrowRight
                      size={12}
                      className="text-gray-400"
                    />

                  </div>

                </div>
              )}

            </div>

          ))}

        </div>

        {/* Premium CTA */}

        {!isPremium && (
          <div className="mt-7 border border-yellow-200 bg-yellow-50 p-5">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-3">

                <Crown
                  size={20}
                  className="mt-0.5 flex-shrink-0 text-yellow-600"
                />

                <div>

                  <h3 className="font-serif text-lg">
                    Unlock Premium Intelligence
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    Access exclusive interviews, research,
                    market analysis and premium conference content.
                  </p>

                </div>

              </div>

              <Link
                to={isSignedIn ? "/dashboard" : "/login"}
                className="flex flex-shrink-0 items-center justify-center gap-2 bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-red-600"
              >
                Unlock Premium
                <ArrowRight size={13} />
              </Link>

            </div>

          </div>
        )}

      </section>

      {/* =====================================================
          SPECIAL REPORTS
         ===================================================== */}

      <section className="mb-14">

        <SH
          title="Special Reports & Research"
          icon={FileText}
        />

        <p className="mb-6 max-w-2xl text-sm leading-6 text-gray-500">
          Research publications and downloadable reports covering
          technology, markets, energy, cybersecurity and the
          global economy.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {specialReports.map((report) => (

            <div
              key={report.title}
              className="group flex cursor-pointer items-center justify-between border border-gray-200 p-4 transition-colors duration-300 hover:border-black"
            >

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-gray-100">
                  <FileText
                    size={14}
                    className="text-gray-400"
                  />
                </div>

                <div>

                  <p className="text-sm transition-colors group-hover:text-red-600">
                    {report.title}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    {report.pages} pages · {report.format} ·{" "}
                    {report.category}
                  </p>

                </div>

              </div>

              <div className="flex flex-shrink-0 items-center gap-2">

                {!isPremium && (
                  <Crown
                    size={14}
                    className="text-yellow-500"
                  />
                )}

                <Download
                  size={14}
                  className="text-gray-400"
                />

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =====================================================
          SUBSCRIBE CTA
         ===================================================== */}

      {!isPremium && (

        <section className="mb-10 overflow-hidden bg-gradient-to-br from-black to-zinc-900 p-8 text-center text-white md:p-10">

          <Sparkles
            size={24}
            className="mx-auto mb-3 text-yellow-400"
          />

          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-red-500">
            Premium Membership
          </p>

          <h2 className="font-serif text-2xl md:text-3xl">
            Unlock the Complete Pride Times Experience
          </h2>

          <p className="mx-auto mb-6 mt-3 max-w-2xl text-sm leading-6 text-gray-400">
            Get access to premium interviews, research reports,
            exclusive conference sessions, market intelligence
            and subscriber-only newsletters.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to={isSignedIn ? "/dashboard" : "/login"}
              className="bg-red-600 px-8 py-3 text-sm transition-colors hover:bg-red-700"
            >
              Start Free 30-Day Trial
            </Link>

            <button
              type="button"
              className="border border-gray-600 px-8 py-3 text-sm transition-colors hover:border-gray-400"
            >
              Compare Plans
            </button>

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
