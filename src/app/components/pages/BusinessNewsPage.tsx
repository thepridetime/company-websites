import { useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Briefcase,
  Clock,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";

import {
  hero,
  maDeals,
  earningsNews,
  corporateNews,
  startupNews,
  type BusinessArticle,
} from "../../data/businessNewsData";

/* =========================================================
   SECTION HEADER — EDITORIAL BLOG STYLE
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
  link,
  linkText = "View all",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="mb-6 border-b-2 border-black pb-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-red-600">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold leading-tight tracking-[-0.025em] text-gray-950 sm:text-3xl md:text-4xl">
            {title}
          </h2>
        </div>

        {link && (
          <Link
            to={link}
            className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.16em] text-red-600 transition-colors hover:text-black"
          >
            {linkText}
            <ArrowRight size={11} />
          </Link>
        )}
      </div>

      {description && (
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500 sm:text-[15px]">
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   ADAPTERS
========================================================= */

function articleExcerpt(article: BusinessArticle) {
  return article.excerpt || "";
}

function articleTime(article: BusinessArticle) {
  return article.time || article.publishedAt || "";
}

function articleLink(article: BusinessArticle) {
  return `/article/${article.id}`;
}

/* =========================================================
   SMALL STATUS CHIPS
========================================================= */

function EarningsStatus({ status }: { status: string }) {
  const positive = status === "BEAT";

  return (
    <span
      className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] ${
        positive ? "text-green-700" : "text-red-600"
      }`}
    >
      {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {status}
    </span>
  );
}

function DealStatus({ status }: { status: string }) {
  const tone =
    status === "Closed"
      ? "text-green-700"
      : status === "Pending"
        ? "text-amber-700"
        : "text-red-600";

  return (
    <span className={`text-[9px] font-bold uppercase tracking-[0.12em] ${tone}`}>
      {status}
    </span>
  );
}

/* =========================================================
   FEATURE STORY
========================================================= */

function LeadStory({ article }: { article: BusinessArticle }) {
  return (
    <Link
      to={articleLink(article)}
      className="group block overflow-hidden border border-gray-200 bg-[#171717]"
    >
      <div className="relative h-[360px] overflow-hidden sm:h-[460px] md:h-[520px]">
        {article.image && (
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-9">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-400">
            {article.category}
          </p>

          <h2 className="mt-3 max-w-4xl font-serif text-3xl font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            {article.title}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-200 sm:text-base sm:leading-7">
            {articleExcerpt(article)}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] uppercase tracking-[0.15em] text-gray-400">
            <span className="font-bold text-white">The Pride Times</span>
            <span>{articleTime(article)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} />
              Editorial analysis
            </span>
          </div>

          <span className="mt-5 inline-flex items-center gap-2 border-b border-white/60 pb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
            Read the full story
            <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   ARTICLE CARD
========================================================= */

function ArticleCard({ article }: { article: BusinessArticle }) {
  return (
    <Link
      to={articleLink(article)}
      className="group block border-b border-gray-200 pb-5"
    >
      {article.image && (
        <div className="overflow-hidden border border-gray-200 bg-gray-100">
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />
        </div>
      )}

      <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
        {article.category}
      </p>

      <h3 className="mt-2 font-serif text-xl font-bold leading-tight tracking-[-0.015em] text-gray-950 transition-colors group-hover:text-red-600 sm:text-2xl">
        {article.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
        {articleExcerpt(article)}
      </p>

      <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-gray-400">
        <Clock size={11} />
        {articleTime(article)}
      </div>
    </Link>
  );
}

/* =========================================================
   BUSINESS NEWS PAGE
========================================================= */

export function BusinessNewsPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f3] text-[#171717]">
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 md:py-10 lg:px-8">
        {/* =====================================================
            PAGE INTRO
        ===================================================== */}
        <header className="mb-8 border-b-2 border-black pb-7">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.24em] text-red-600">
                <Briefcase size={12} />
                Business Briefing
              </div>

              <h1 className="mt-3 max-w-5xl font-serif text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-gray-950 sm:text-5xl md:text-6xl">
                Business &amp; Corporate Affairs
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                The companies, capital, deals and strategic decisions shaping the
                business landscape — presented as a deeper editorial briefing,
                not just a stream of headlines.
              </p>
            </div>

            <div className="hidden text-right md:block">
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-gray-400">
                The Pride Times
              </p>
              <p className="mt-1 font-serif text-sm font-bold text-gray-900">
                Business Desk
              </p>
            </div>
          </div>
        </header>

        <PrideTimesAd variant="first" />

        {/* =====================================================
            LEAD + BUSINESS CONTEXT
        ===================================================== */}
        <section className="mb-12 grid gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)]">
          <LeadStory article={hero} />

          <aside className="border-t-2 border-black bg-white p-5 sm:p-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-600">
              Why this story matters
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold leading-tight">
              The business signals behind the headline
            </h2>

            <div className="mt-5 divide-y divide-gray-200">
              {hero.highlights.map((point, index) => (
                <div key={point} className="flex gap-4 py-4">
                  <span className="font-serif text-xl font-bold text-red-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-6 text-gray-600">{point}</p>
                </div>
              ))}
            </div>

            <Link
              to={articleLink(hero)}
              className="mt-4 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-red-600"
            >
              Read the analysis
              <ArrowRight size={11} />
            </Link>
          </aside>
        </section>

        {/* =====================================================
            EARNINGS
        ===================================================== */
        <section className="mb-12">
          <SectionHeader
            eyebrow="Corporate earnings"
            title="Corporate Earnings: The Numbers Behind the Headlines"
            description="A concise view of quarterly results, revenue trends and the financial signals emerging from major companies."
            link="/business-news"
            linkText="Business desk"
          />

          <div className="overflow-x-auto border border-gray-200 bg-white">
            <table className="min-w-[760px] w-full border-collapse text-left">
              <thead className="bg-[#171717] text-white">
                <tr>
                  {[
                    "Company",
                    "EPS",
                    "Vs. Estimate",
                    "Revenue",
                    "Signal",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {earningsNews.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 last:border-0">
                    <td className="px-4 py-4">
                      <p className="font-serif text-base font-bold text-gray-950">
                        {item.company}
                      </p>
                      <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400">
                        {item.ticker}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold tabular-nums">
                      {item.eps}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold tabular-nums">
                      {item.beat}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold tabular-nums">
                      {item.revenue}
                    </td>
                    <td className="px-4 py-4">
                      <EarningsStatus status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <PrideTimesAd variant="second" />

        {/* =====================================================
            M&A
        ===================================================== */}
        <section className="mb-12">
          <SectionHeader
            eyebrow="Deals & capital"
            title="Deals & Capital: Where Money Is Moving"
            description="Acquisitions, strategic investments and infrastructure transactions that reveal where corporate capital is being deployed."
            link="/business-news"
            linkText="Follow the deals"
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {maDeals.map((deal) => (
              <article
                key={deal.id}
                className="border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                    {deal.sector}
                  </p>
                  <DealStatus status={deal.status} />
                </div>

                <h3 className="mt-5 font-serif text-xl font-bold leading-tight text-gray-950">
                  {deal.acquirer}
                  <span className="mx-2 text-gray-300">→</span>
                  {deal.target}
                </h3>

                <div className="mt-5 flex items-end justify-between border-t border-gray-200 pt-4">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400">
                      Deal value
                    </p>
                    <p className="mt-1 font-serif text-2xl font-bold text-gray-950">
                      {deal.value}
                    </p>
                  </div>
                  <ArrowRight size={15} className="text-red-600" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================
            CORPORATE NEWS
        ===================================================== */}
        <section className="mb-12">
          <SectionHeader
            eyebrow="Companies in focus"
            title="Inside Corporate Strategy"
            description="The decisions behind expansion, technology adoption, leadership, operations and competitive positioning at major companies."
            link="/business-news"
            linkText="More company news"
          />

          <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {corporateNews.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <PrideTimesAd variant="fifth" />

        {/* =====================================================
            STARTUPS
        ===================================================== */}
        <section className="mb-12">
          <SectionHeader
            eyebrow="Startup capital & growth"
            title="The Startup Economy"
            description="Funding, valuations, acquisitions and strategic moves across the companies building the next generation of technology and services."
            link="/startup-success"
            linkText="Startup coverage"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {startupNews.map((article, index) => (
              <Link
                key={article.id}
                to={articleLink(article)}
                className="group grid gap-5 border-b border-gray-200 pb-6 sm:grid-cols-[180px_1fr]"
              >
                {article.image && (
                  <div className="overflow-hidden border border-gray-200 bg-gray-100">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] sm:h-full"
                    />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-2xl font-bold text-gray-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-gray-950 transition-colors group-hover:text-red-600 sm:text-2xl">
                    {article.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {articleExcerpt(article)}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 group-hover:text-red-600">
                    Read story
                    <ArrowRight size={10} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =====================================================
            EDITORIAL NOTE / NEWSLETTER
        ===================================================== */
        <section className="grid gap-6 border-t-2 border-black pt-7 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="bg-white p-6 sm:p-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-600">
              The Pride Times Editorial Desk
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-gray-950 sm:text-4xl">
              The Business Brief
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              A concise briefing on companies, capital, strategy and the
              business decisions shaping the next phase of the global economy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/business-news"
                className="inline-flex items-center gap-2 bg-[#171717] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-600"
              >
                Explore Business
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>

          <div className="border border-gray-200 bg-[#171717] p-6 text-white sm:p-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-400">
              Newsletter
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold">
              The Pride Times Business Brief
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              The essential corporate developments, deal activity and strategic
              signals, delivered in a concise editorial format.
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 border border-white/20 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-red-500"
              />
              <button
                type="button"
                className="bg-red-600 px-5 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-700"
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>

        <PrideTimesAd variant="first" />
      </main>
    </div>
  );
}

export default BusinessNewsPage;
