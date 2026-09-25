import { useMemo } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Clock,
  Quote,
  Share2,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  getBusinessArticleById,
  getRelatedBusinessArticles,
} from "../../data/businessNewsData";
import {
  getHomepageArticleBySlug,
  homepageArticles,
  articlePath,
} from "../../data/homepageArticleData";

/*
  Homepage Article Detail
  ------------------------------------------------------------
  Every homepage story resolves through /article/:id.
  This page deliberately uses the homepage article data instead
  of sending readers to category pages such as /markets.
*/

function RelatedHomepageStories({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const related = useMemo(
    () =>
      homepageArticles
        .filter((item) => item.slug !== currentSlug)
        .filter((item) => item.category.split("|")[0].trim())
        .slice(0, 3),
    [currentSlug]
  );

  return (
    <section className="mt-16 border-t-2 border-black pt-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
            Continue reading
          </p>
          <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">
            Related Stories
          </h2>
        </div>
        <Link
          to="/"
          className="hidden items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500 hover:text-red-600 sm:flex"
        >
          Front Page <ArrowRight size={13} />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {related.map((story) => (
          <Link
            key={story.slug}
            to={articlePath(story.title)}
            className="group overflow-hidden border border-gray-200 bg-white"
          >
            <div className="overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={story.image}
                alt={story.title}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                {story.category}
              </p>
              <h3 className="mt-2 font-serif text-lg font-bold leading-tight group-hover:text-red-600">
                {story.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-500">
                {story.dek}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HomepageArticle({ article }: { article: (typeof homepageArticles)[number] }) {
  return (
    <article className="bg-[#f8f7f3] text-[#171717]">
      {/* Editorial masthead */}
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 transition-colors hover:text-red-600"
          >
            <ArrowLeft size={13} />
            Back to the front page
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        {/* Header */}
        <header className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-red-600">
            {article.category}
          </p>

          <h1 className="mt-4 font-serif text-4xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-5xl md:text-7xl">
            {article.title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg md:text-xl">
            {article.dek}
          </p>

          <div className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-3 border-y border-gray-300 py-4 text-[10px] uppercase tracking-[0.12em] text-gray-500">
            <span className="font-bold text-gray-800">
              By {article.author}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-red-600 sm:block" />
            <span>{article.publishedAt}</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>
        </header>

        {/* Hero image */}
        <figure className="mx-auto mt-9 max-w-6xl">
          <div className="overflow-hidden border border-gray-200 bg-gray-100">
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="h-[300px] w-full object-cover sm:h-[460px] md:h-[590px]"
            />
          </div>
          <figcaption className="mt-2 text-[9px] uppercase tracking-[0.14em] text-gray-400">
            The Pride Times · Editorial coverage
          </figcaption>
        </figure>

        {/* Main editorial grid */}
        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <main>
            {/* Lead */}
            <p className="font-serif text-xl leading-[1.65] text-gray-950 sm:text-2xl">
              <span className="float-left mr-2 mt-1 font-serif text-6xl font-bold leading-[0.75] text-red-600">
                {article.dek.charAt(0)}
              </span>
              {article.dek.slice(1)} The development is being watched beyond
              the immediate headline because it touches decisions around
              capital, strategy, regulation and the wider global economy.
            </p>

            {/* Key highlights */}
            <section className="mt-10 border-y-2 border-black py-6">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-red-600" />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em]">
                  At a glance
                </p>
              </div>

              <div className="mt-5 grid gap-0 sm:grid-cols-2">
                {article.highlights.map((point, index) => (
                  <div
                    key={point}
                    className={`flex gap-4 py-4 ${
                      index < article.highlights.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    } sm:border-b sm:border-gray-200 sm:pr-5`}
                  >
                    <span className="font-serif text-2xl font-bold text-red-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Story body */}
            <div className="mt-10 font-serif text-[17px] leading-[1.9] text-gray-800 sm:text-[18px]">
              {article.sections.map((section, index) => (
                <section key={section.heading} className="mb-11">
                  <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
                    {String(index + 1).padStart(2, "0")} · The story
                  </p>

                  <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl">
                    {section.heading}
                  </h2>

                  <p className="mt-4">{section.body}</p>

                  {index === 0 && (
                    <blockquote className="my-8 border-l-4 border-red-600 bg-white px-6 py-5 font-serif text-xl font-semibold leading-8 text-gray-950">
                      <Quote
                        size={20}
                        className="mb-2 text-red-600"
                        aria-hidden="true"
                      />
                      {article.dek}
                    </blockquote>
                  )}
                </section>
              ))}

              {/* Magazine-style analysis block */}
              <section className="border-y border-gray-300 bg-white px-5 py-7 sm:px-8">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
                  What to watch next
                </p>

                <div className="mt-5 grid gap-6 sm:grid-cols-3">
                  {[
                    "New data and announcements",
                    "Business and market response",
                    "Policy and regulatory follow-through",
                  ].map((item, index) => (
                    <div key={item}>
                      <span className="font-serif text-3xl font-bold text-gray-300">
                        0{index + 1}
                      </span>
                      <h3 className="mt-2 font-sans text-sm font-bold text-gray-950">
                        {item}
                      </h3>
                      <p className="mt-2 font-sans text-xs leading-5 text-gray-500">
                        These are the signals that can help distinguish a
                        temporary reaction from a longer-term shift.
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-11">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
                  The wider context
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-gray-950 sm:text-4xl">
                  Why the next phase matters
                </h2>
                <p className="mt-4">
                  The immediate headline is only one part of the story. The
                  longer-term effect will depend on how companies, investors
                  and policymakers respond. Changes in costs, demand,
                  regulation and confidence can take time to move through the
                  wider economy, which is why the next set of decisions may be
                  as important as the original announcement.
                </p>
                <p className="mt-6">
                  For readers following the story, the most useful signals are
                  measurable developments: new company guidance, official
                  announcements, market data and evidence of changes in
                  operating behaviour. Those indicators provide a clearer
                  picture of what is changing than a single day's reaction.
                </p>
              </section>

              <section className="mt-11 border-t-2 border-black pt-7">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
                  The takeaway
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-gray-950">
                  The signals behind the headline
                </h2>
                <ul className="mt-5 space-y-4 font-sans text-sm leading-6 text-gray-700">
                  {article.highlights.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Bottom actions */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-gray-300 py-5">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600 hover:text-red-600"
              >
                <ArrowLeft size={13} />
                Back to front page
              </Link>

              <div className="flex items-center gap-5 text-gray-500">
                <button
                  type="button"
                  aria-label="Bookmark article"
                  className="transition-colors hover:text-red-600"
                >
                  <Bookmark size={17} />
                </button>
                <button
                  type="button"
                  aria-label="Share article"
                  className="transition-colors hover:text-red-600"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: article.dek,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard?.writeText(window.location.href);
                    }
                  }}
                >
                  <Share2 size={17} />
                </button>
              </div>
            </div>

            <RelatedHomepageStories currentSlug={article.slug} />
          </main>

          {/* Magazine sidebar */}
          <aside className="lg:pt-2">
            <div className="sticky top-6 space-y-6">
              <section className="border-t-2 border-black bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
                  Inside the story
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold">
                  Key highlights
                </h2>

                <ol className="mt-4 divide-y divide-gray-200">
                  {article.highlights.map((point, index) => (
                    <li
                      key={point}
                      className="flex gap-3 py-4 text-sm leading-6 text-gray-700"
                    >
                      <span className="font-serif text-lg font-bold text-red-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="border border-gray-200 bg-[#171717] p-5 text-white">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
                  Story guide
                </p>
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                      Section
                    </p>
                    <p className="mt-1 text-sm">{article.category}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                      Published
                    </p>
                    <p className="mt-1 text-sm">{article.publishedAt}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                      Reading time
                    </p>
                    <p className="mt-1 text-sm">{article.readTime}</p>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

export function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  /*
    Homepage articles are checked FIRST. This prevents a homepage
    headline from falling through to a category page such as Markets.
  */
  const homepageArticle = getHomepageArticleBySlug(id);

  if (homepageArticle) {
    return <HomepageArticle article={homepageArticle} />;
  }

  /*
    Keep existing business article support intact.
  */
  const article = getBusinessArticleById(id);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
          Story not found
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold">
          We couldn't find that article
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          The story may have moved or its link may be outdated.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-red-600"
        >
          <ArrowLeft size={13} />
          Back to home
        </Link>
      </div>
    );
  }

  const related = getRelatedBusinessArticles(article);

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">
      <Link
        to="/business-news"
        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 hover:text-red-600"
      >
        <ArrowLeft size={13} />
        Business News
      </Link>

      <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
        {article.category}
      </p>

      <h1 className="mt-3 max-w-4xl font-serif text-4xl font-bold leading-tight text-gray-950 sm:text-5xl">
        {article.title}
      </h1>

      {article.excerpt && (
        <p className="mt-5 max-w-3xl text-lg leading-7 text-gray-600">
          {article.excerpt}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-gray-200 py-4 text-xs text-gray-500">
        <span className="font-semibold text-gray-800">
          By {article.author}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={12} />
          {article.time}
        </span>
      </div>

      {article.image && (
        <div className="mt-7 overflow-hidden border border-gray-200">
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="h-[280px] w-full object-cover sm:h-[500px]"
          />
        </div>
      )}

      <div className="mt-9 max-w-3xl font-serif text-[17px] leading-[1.9] text-gray-800">
        <p>
          {article.excerpt ||
            "Our newsroom is following the people, decisions and market forces shaping this story."}
        </p>
        <p className="mt-6">
          The implications will become clearer as companies respond,
          policymakers weigh their next steps and new information enters the
          public record.
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-12 border-t-2 border-black pt-6">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.16em]">
            Related Coverage
          </h2>
          <div className="mt-4 divide-y divide-gray-200">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/article/${item.id}`}
                className="group flex items-center justify-between gap-4 py-4"
              >
                <h3 className="text-sm font-semibold leading-[1.4] group-hover:text-red-600">
                  {item.title}
                </h3>
                <ArrowRight
                  size={14}
                  className="shrink-0 text-gray-300"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
