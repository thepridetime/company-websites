
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  Scale,
  TrendingUp,
} from "lucide-react";

import {
  maArticles,
  maDeals,
  maHeroArticle,
  getMAArticleBySlug,
  getRelatedMAArticles,
  type MAArticle,
  type MADeal,
} from "../../data/mergersAcquisitionsData";

/* =========================================================
   ADSENSE
========================================================= */

type AdSenseWindow = Window & {
  adsbygoogle?: unknown[];
};

function MAAdSpace({
  slot = "5373718974",
  inArticle = false,
}: {
  slot?: "5373718974" | "8042854193";
  inArticle?: boolean;
}) {
  useEffect(() => {
    try {
      const adsWindow = window as AdSenseWindow;
      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
    } catch (error) {
      console.warn("AdSense could not initialize:", error);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-4">
      <p className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        Advertisement
      </p>

      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          minHeight: inArticle ? "120px" : "90px",
        }}
        data-ad-client="ca-pub-2331501617441941"
        data-ad-slot={slot}
        {...(inArticle
          ? {
              "data-ad-layout": "in-article",
              "data-ad-format": "fluid",
            }
          : {
              "data-ad-format": "auto",
              "data-full-width-responsive": "true",
            })}
      />
    </div>
  );
}

/* =========================================================
   SHARED EDITORIAL COMPONENTS
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 border-b-2 border-black pb-4">
      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
        {eyebrow}
      </p>

      <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight text-gray-950 md:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: MADeal["status"] }) {
  const styles: Record<MADeal["status"], string> = {
    Announced: "border-blue-200 bg-blue-50 text-blue-700",
    Pending: "border-amber-200 bg-amber-50 text-amber-700",
    Closed: "border-green-200 bg-green-50 text-green-700",
  };

  return (
    <span
      className={`inline-flex rounded-sm border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* =========================================================
   TOPIC NAVIGATION
========================================================= */

const topics = [
  "M&A Strategy",
  "Due Diligence",
  "Valuation",
  "Regulation",
  "Integration",
  "Corporate Finance",
];

function TopicNavigation() {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <span
          key={topic}
          className="border border-gray-200 bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-gray-600"
        >
          {topic}
        </span>
      ))}
    </div>
  );
}

/* =========================================================
   ARTICLE CARD
========================================================= */

function ArticleCard({
  article,
  featured = false,
}: {
  article: MAArticle;
  featured?: boolean;
}) {
  return (
    <Link
      to={`/mergers-acquisitions/${article.slug}`}
      className={`group flex h-full flex-col border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-gray-400 hover:shadow-sm ${
        featured ? "md:p-7" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-red-600">
          {article.category}
        </span>

        <span className="flex shrink-0 items-center gap-1 text-[9px] text-gray-400">
          <Clock3 size={10} />
          {article.readTime}
        </span>
      </div>

      <h3
        className={`mt-3 font-serif font-bold leading-[1.2] tracking-tight text-gray-950 transition-colors group-hover:text-red-600 ${
          featured ? "text-2xl md:text-3xl" : "text-lg"
        }`}
      >
        {article.title}
      </h3>

      <p className="mt-3 text-sm leading-[1.75] text-gray-600">
        {article.subtitle}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 mt-5">
        <span className="text-[10px] font-semibold text-gray-500">
          {article.author}
        </span>

        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-900 transition-colors group-hover:text-red-600">
          Read article
          <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   DEAL TRACKER
========================================================= */

function DealTracker() {
  const announced = maDeals.filter(
    (deal) => deal.status === "Announced"
  ).length;

  const pending = maDeals.filter(
    (deal) => deal.status === "Pending"
  ).length;

  const closed = maDeals.filter(
    (deal) => deal.status === "Closed"
  ).length;

  return (
    <section className="mt-14 md:mt-16">
      <SectionHeading
        eyebrow="The transaction monitor"
        title="M&A Deal Tracker"
        description="A snapshot of the transaction entries currently held in the editorial dataset. Confirm deal details and status against official disclosures before publication."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Listed entries", value: maDeals.length },
          { label: "Announced", value: announced },
          { label: "Pending", value: pending },
          { label: "Closed", value: closed },
        ].map((item) => (
          <div
            key={item.label}
            className="border border-gray-200 bg-white p-4"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-gray-400">
              {item.label}
            </p>

            <p className="mt-2 font-serif text-3xl font-bold text-gray-950">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto border-y border-gray-200">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-300 text-left">
              <th className="py-3 pr-4 text-[9px] font-bold uppercase tracking-[0.13em] text-gray-400">
                Acquirer
              </th>

              <th className="px-3 py-3 text-[9px] font-bold uppercase tracking-[0.13em] text-gray-400">
                Target
              </th>

              <th className="px-3 py-3 text-right text-[9px] font-bold uppercase tracking-[0.13em] text-gray-400">
                Listed value
              </th>

              <th className="px-3 py-3 text-[9px] font-bold uppercase tracking-[0.13em] text-gray-400">
                Sector
              </th>

              <th className="py-3 pl-3 text-right text-[9px] font-bold uppercase tracking-[0.13em] text-gray-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {maDeals.map((deal) => (
              <tr
                key={deal.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="py-4 pr-4 font-semibold text-gray-900">
                  {deal.acquirer}
                </td>

                <td className="px-3 py-4 text-gray-600">
                  {deal.target}
                </td>

                <td className="px-3 py-4 text-right font-semibold tabular-nums text-gray-900">
                  {deal.value}
                </td>

                <td className="px-3 py-4 text-xs text-gray-500">
                  {deal.sector}
                </td>

                <td className="py-4 pl-3 text-right">
                  <StatusBadge status={deal.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[10px] leading-5 text-gray-400">
        Verification note: Deal names, values and statuses in this initial
        tracker were carried over from the previous project data. They have
        not been independently verified for this new page.
      </p>
    </section>
  );
}

/* =========================================================
   M&A PROCESS
========================================================= */

const processSteps = [
  {
    number: "01",
    title: "Strategic rationale",
    text: "Understand why the buyer wants the business.",
    icon: TrendingUp,
  },
  {
    number: "02",
    title: "Due diligence",
    text: "Examine financial, legal and operational risks.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Regulatory review",
    text: "Identify approvals and closing conditions.",
    icon: Scale,
  },
  {
    number: "04",
    title: "Integration",
    text: "Bring teams, systems and operations together.",
    icon: BriefcaseBusiness,
  },
];

function DealProcess() {
  return (
    <section className="mt-14 border-y border-gray-200 py-8 md:py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
            From announcement to integration
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-gray-950 md:text-3xl">
            Every acquisition has a story beyond the headline.
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            A transaction moves through several stages, each with its own
            commercial and operational questions. Following the complete
            lifecycle helps readers understand what a deal could mean for
            the companies involved.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="border border-gray-200 bg-[#fafafa] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl font-bold text-red-600">
                    {step.number}
                  </span>

                  <Icon size={17} className="text-gray-400" />
                </div>

                <h3 className="mt-4 text-sm font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-1 text-[11px] leading-5 text-gray-500">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EDITORIAL NOTE
========================================================= */

function EditorialNote() {
  return (
    <section className="mt-10 border-l-2 border-red-600 bg-gray-50 px-5 py-5">
      <div className="flex items-center gap-2">
        <FileText size={15} className="text-red-600" />

        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-800">
          About this coverage
        </p>
      </div>

      <p className="mt-2 max-w-4xl text-xs leading-6 text-gray-600">
        The Pride Times M&A desk covers corporate transactions through
        strategy, valuation, due diligence, regulation and post-merger
        integration. Transaction facts and figures should be checked against
        company announcements, exchange filings and regulatory disclosures.
      </p>
    </section>
  );
}

/* =========================================================
   NEWSLETTER
========================================================= */

function MANewsletter() {
  return (
    <section className="mt-12 bg-[#071a2d] px-5 py-9 text-center sm:px-8 md:py-11">
      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-400">
        The Pride Times | M&A
      </p>

      <h2 className="mt-3 font-serif text-2xl font-bold text-white md:text-3xl">
        Understand the deals behind the headlines.
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-gray-300 md:text-sm">
        Follow the transactions, capital decisions and corporate strategies
        reshaping industries.
      </p>

      <form
        className="mx-auto mt-6 flex max-w-lg flex-col gap-2 sm:flex-row"
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          type="email"
          required
          aria-label="Email address"
          placeholder="Enter your email address"
          className="h-11 min-w-0 flex-1 rounded-sm border border-white/20 bg-white px-4 text-xs text-gray-900 outline-none placeholder:text-gray-400 focus:border-red-500"
        />

        <button
          type="submit"
          className="h-11 rounded-sm bg-red-600 px-6 text-xs font-bold text-white transition-colors hover:bg-red-700"
        >
          Subscribe Free
        </button>
      </form>

      <p className="mt-3 text-[9px] text-gray-400">
        Subscription handling needs to be connected to your newsletter service.
      </p>
    </section>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */

export function MergersAcquisitionsPage() {
  return (
    <main className="w-full bg-white text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 md:py-9 lg:px-8">
        <header className="mb-7 border-b-4 border-black pb-5 md:mb-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <BriefcaseBusiness size={20} strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
                  The Pride Times | Corporate Intelligence
                </p>

                <h1 className="mt-1 font-serif text-3xl font-bold leading-tight tracking-tight text-gray-950 md:text-[43px]">
                  Mergers &amp; Acquisitions
                </h1>
              </div>
            </div>

            <p className="max-w-xs text-xs leading-5 text-gray-500">
              The strategy, capital and decisions behind corporate
              transactions.
            </p>
          </div>
        </header>

        <div className="mb-8 md:mb-10">
          <MAAdSpace />
        </div>

        <section className="mb-9">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />

            <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-gray-500">
              Explore the M&A desk
            </p>
          </div>

          <TopicNavigation />
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-8">
          <article className="min-w-0">
            <Link
              to={`/mergers-acquisitions/${maHeroArticle.slug}`}
              className="group block"
            >
              <div className="relative flex h-[240px] items-end overflow-hidden bg-[#101820] sm:h-[330px] md:h-[410px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(180,35,35,0.45),transparent_35%),linear-gradient(125deg,#071a2d,#172c3c_55%,#111827)]" />

                <div className="absolute inset-0 opacity-20">
                  <div className="absolute left-[12%] top-[20%] h-40 w-40 rounded-full border border-white/50" />
                  <div className="absolute left-[18%] top-[29%] h-28 w-28 rounded-full border border-white/40" />
                  <div className="absolute right-[12%] top-[15%] h-52 w-52 rounded-full border border-white/30" />
                  <div className="absolute bottom-0 left-0 h-px w-full bg-white/50" />
                </div>

                <div className="relative z-10 max-w-3xl p-6 sm:p-9 md:p-11">
                  <span className="inline-block bg-red-600 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white">
                    Editor's Analysis
                  </span>

                  <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300">
                    {maHeroArticle.category}
                  </p>

                  <h2 className="mt-3 font-serif text-2xl font-bold leading-[1.1] tracking-tight text-white transition-colors group-hover:text-red-200 sm:text-3xl md:text-4xl">
                    {maHeroArticle.title}
                  </h2>

                  <p className="mt-4 max-w-2xl text-xs leading-6 text-gray-300 sm:text-sm">
                    {maHeroArticle.subtitle}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    Read the feature
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200 pb-4 text-[10px] text-gray-400">
              <span className="font-semibold text-gray-700">
                By {maHeroArticle.author}
              </span>

              <span>{maHeroArticle.readTime}</span>

              <span className="text-red-600">
                Long-form business analysis
              </span>
            </div>
          </article>

          <aside>
            <div className="border-b-2 border-black pb-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                The M&A reading list
              </p>

              <h3 className="mt-1 font-serif text-xl font-bold text-gray-950">
                Essential Analysis
              </h3>
            </div>

            <div className="divide-y divide-gray-200">
              {maArticles.slice(1, 4).map((article) => (
                <Link
                  key={article.slug}
                  to={`/mergers-acquisitions/${article.slug}`}
                  className="group block py-4"
                >
                  <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-red-600">
                    {article.category}
                  </span>

                  <h4 className="mt-1 font-serif text-base font-bold leading-[1.3] text-gray-900 transition-colors group-hover:text-red-600">
                    {article.title}
                  </h4>

                  <span className="mt-2 flex items-center gap-1 text-[9px] text-gray-400">
                    <Clock3 size={10} />
                    {article.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <DealTracker />

        <section className="mt-14 border-t-2 border-black pt-9 md:mt-16">
          <SectionHeading
            eyebrow="The business of deal making"
            title="M&A Analysis & Insights"
            description="Long-form reporting and explainers on the commercial, financial and operational questions that shape corporate transactions."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {maArticles.slice(0, 2).map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                featured
              />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-gray-200 pb-3">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                Understand the process
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold text-gray-950">
                The M&A Playbook
              </h2>
            </div>

            <span className="hidden text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400 sm:block">
              Explainers &amp; Guides
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {maArticles.slice(2).map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
              />
            ))}
          </div>
        </section>

        <DealProcess />

        <div className="my-12 md:my-14">
          <MAAdSpace slot="8042854193" inArticle />
        </div>

        <EditorialNote />

        <MANewsletter />
      </div>
    </main>
  );
}

/* =========================================================
   ARTICLE DETAIL
========================================================= */

function MAArticleDetail({ article }: { article: MAArticle }) {
  const related = getRelatedMAArticles(article, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [article.slug]);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 md:py-10 lg:px-8">
        <Link
          to="/mergers-acquisitions"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-gray-500 transition-colors hover:text-red-600"
        >
          <ArrowLeft size={13} />
          Back to M&A
        </Link>

        <header className="mx-auto mt-8 max-w-4xl border-b border-gray-200 pb-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">
            {article.category}
          </p>

          <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.12] tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            {article.title}
          </h1>

          <p className="mt-5 text-base leading-[1.8] text-gray-600 md:text-lg">
            {article.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-gray-400">
            <span className="font-semibold text-gray-700">
              By {article.author}
            </span>

            <span className="h-1 w-1 rounded-full bg-gray-300" />

            <span>{article.publishedAt}</span>

            <span className="h-1 w-1 rounded-full bg-gray-300" />

            <span className="flex items-center gap-1">
              <Clock3 size={11} />
              {article.readTime}
            </span>
          </div>
        </header>

        <div className="mx-auto mt-9 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-14">
          <article className="min-w-0">
            <div className="border-l-2 border-red-600 bg-gray-50 px-5 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-red-600">
                The central argument
              </p>

              <p className="mt-2 font-serif text-lg leading-[1.65] text-gray-800">
                {article.subtitle}
              </p>
            </div>

            <section className="mt-9 border-y border-gray-200 py-6">
              <h2 className="font-serif text-xl font-bold text-gray-950">
                Key takeaways
              </h2>

              <ul className="mt-4 space-y-3">
                {article.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm leading-6 text-gray-700"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-1 shrink-0 text-red-600"
                    />

                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-9 space-y-9">
              {article.sections.map((section, index) => (
                <section key={section.heading}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-serif text-sm font-bold text-red-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight text-gray-950">
                    {section.heading}
                  </h2>

                  <p className="mt-4 text-[15px] leading-[1.95] text-gray-700">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <section className="mt-10 border-t-2 border-black pt-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-red-600">
                Editorial note
              </p>

              <p className="mt-2 text-xs leading-6 text-gray-500">
                {article.editorNote}
              </p>
            </section>

            <div className="mt-7 flex flex-wrap gap-2 border-t border-gray-200 pt-5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-gray-200 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <aside className="space-y-7 lg:pt-0">
            <div className="border-t-2 border-black bg-white p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                Story guide
              </p>

              <h2 className="mt-2 font-serif text-xl font-bold text-gray-950">
                About this article
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-gray-400">
                    Publication
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    The Pride Times
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-gray-400">
                    Desk
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    Mergers &amp; Acquisitions
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-gray-400">
                    Reading time
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {article.readTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 bg-[#f8f8f7] p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-red-600">
                The Pride Times
              </p>

              <h3 className="mt-2 font-serif text-xl font-bold text-gray-950">
                Follow the transaction, not just the headline.
              </h3>

              <p className="mt-3 text-xs leading-6 text-gray-600">
                Explore more coverage on deal strategy, valuation, regulation
                and integration.
              </p>

              <Link
                to="/mergers-acquisitions"
                className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-900 hover:text-red-600"
              >
                Explore M&A
                <ArrowRight size={13} />
              </Link>
            </div>
          </aside>
        </div>

        <div className="mx-auto my-12 max-w-6xl">
          <MAAdSpace slot="8042854193" inArticle />
        </div>

        {related.length > 0 && (
          <section className="mx-auto mt-12 max-w-6xl border-t-2 border-black pt-8">
            <div className="mb-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                Continue reading
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold text-gray-950">
                More M&A Analysis
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/mergers-acquisitions/${item.slug}`}
                  className="group border border-gray-200 bg-white p-5 transition-colors hover:border-gray-400"
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-red-600">
                    {item.category}
                  </p>

                  <h3 className="mt-2 font-serif text-lg font-bold leading-tight text-gray-950 transition-colors group-hover:text-red-600">
                    {item.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-xs leading-5 text-gray-500">
                    {item.subtitle}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] text-gray-800">
                    Read article
                    <ArrowUpRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   ARTICLE ROUTE WRAPPER
========================================================= */

export function MergersAcquisitionsArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  const article = getMAArticleBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!article) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-4xl px-5 py-20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">
          M&A | Article not found
        </p>

        <h1 className="mt-3 font-serif text-3xl font-bold text-gray-950">
          This article is unavailable.
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          The article may have been moved or the link may be incorrect.
        </p>

        <Link
          to="/mergers-acquisitions"
          className="mt-6 inline-flex items-center gap-2 bg-black px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-red-600"
        >
          <ArrowLeft size={13} />
          Return to M&A
        </Link>
      </main>
    );
  }

  return <MAArticleDetail article={article} />;
}

export default MergersAcquisitionsPage;
