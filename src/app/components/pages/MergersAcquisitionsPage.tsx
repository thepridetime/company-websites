/* =========================================================
   M&A ARTICLE PAGE (restored)
   Append this block to the END of
   src/app/components/pages/MergersAcquisitionsPage.tsx
   (below the listing page). Keeps the /mergers-acquisitions/:slug route working.
========================================================= */

// Already imported at the top of the listing page: useEffect, Link, ArrowRight.
import { useParams } from "react-router";
import {
  ArrowLeft,
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

export default MergersAcquisitionsArticlePage;
