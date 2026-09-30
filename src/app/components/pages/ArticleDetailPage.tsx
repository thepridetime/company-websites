import { useEffect, useMemo } from "react";
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
import { PrideTimesAd } from "../AdSenseSlots";

import {
  getHomepageArticleBySlug,
  homepageArticles,
  articlePath,
  type HomepageArticle as HomepageArticleType,
} from "../../data/homepageArticleData";

import {
  getBusinessArticleById,
  getRelatedBusinessArticles,
  type BusinessArticle,
} from "../../data/businessNewsData";

import {
  getTechnologyArticleById,
  getRelatedTechnologyArticles,
  type TechnologyArticle,
  technologyArticlePath,
} from "../../data/technologyNewsData";

import {
  getSpecialArticleById,
  specialArticlePath,
  specialArticles,
  type SpecialArticle,
} from "../../data/specialArticleData";

type EditorialArticle = BusinessArticle | TechnologyArticle;

/* =========================================================
   SPECIAL ARTICLE SECTION PATH
========================================================= */

function getSectionPath(section: string) {
  switch (section) {
    case "Innovation":
      return "/innovation";

    case "Cybersecurity":
      return "/cybersecurity";

    case "Healthcare":
      return "/healthcare";

    case "Manufacturing":
      return "/manufacturing";

    case "Business":
      return "/business-news";

    case "International Business":
      return "/international-news";

    case "Startup Success":
      return "/startup-success";

    case "Technology":
      return "/technology";

    case "Smart Cities":
      return "/smart-cities";

    case "Supply Chain":
      return "/supply-chain";

    case "White House Watch":
      return "/white-house-watch";

    case "World & Geopolitics":
      return "/world";

    default:
      return "/ceospotlight";
  }
}

/* =========================================================
   SPECIAL ARTICLE SECTION NAME
========================================================= */

function getSectionName(section: string) {
  switch (section) {
    case "Innovation":
      return "Innovation";

    case "Cybersecurity":
      return "Cybersecurity";

    case "Healthcare":
      return "Healthcare";

    case "Manufacturing":
      return "Manufacturing";

    case "Business":
      return "Business";

    case "International Business":
      return "International Business";

    case "Startup Success":
      return "Startup Success";

    case "Technology":
      return "Technology";

    case "Smart Cities":
      return "Smart Cities";

    case "Supply Chain":
      return "Supply Chain";

    case "White House Watch":
      return "White House Watch";

    case "World & Geopolitics":
      return "World & Geopolitics";

    default:
      return "CEO Spotlight";
  }
}

/* =========================================================
   RELATED SPECIAL ARTICLES
========================================================= */

function specialArticlesForSection(
  section: string,
  currentId: string
) {
  return specialArticles.filter(
    (article) =>
      article.section === section &&
      article.id !== currentId
  );
}

/* =========================================================
   SPECIAL ARTICLE EDITORIAL
========================================================= */

function SpecialArticleEditorial({
  article,
}: {
  article: SpecialArticle;
}) {
  const related = specialArticlesForSection(
    article.section,
    article.id
  ).slice(0, 3);

  const sectionPath = getSectionPath(article.section);
  const sectionName = getSectionName(article.section);
  const showSectionAds = [
    "Innovation",
    "CEO Spotlight",
    "Technology",
    "Cybersecurity",
    "Healthcare",
    "Manufacturing",
    "Smart Cities",
    "Supply Chain",
    "Energy",
    "White House Watch",
    "World & Geopolitics",
  ].includes(article.section);

  return (
    <article className="bg-[#f8f7f3] text-[#171717]">

      {/* =================================================
          BACK TO SECTION
      ================================================= */}

      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">

          <Link
            to={sectionPath}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 hover:text-red-600"
          >
            <ArrowLeft size={13} />

            Back to {sectionName}
          </Link>

        </div>
      </div>

      {/* =================================================
          ARTICLE HEADER
      ================================================= */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">

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

            <span>
              {article.publishedAt}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {article.readTime}
            </span>

          </div>

        </header>

        {/* =================================================
            ARTICLE IMAGE
        ================================================= */}

        {article.image && (
          <figure className="mx-auto mt-9 max-w-6xl">

            <div className="overflow-hidden border border-gray-200 bg-gray-100">

              <ImageWithFallback
                src={article.image}
                alt={article.title}
                className="h-[300px] w-full object-cover sm:h-[460px] md:h-[590px]"
              />

            </div>

            <figcaption className="mt-2 text-[9px] uppercase tracking-[0.14em] text-gray-400">
              The Pride Times · {article.section} Desk
            </figcaption>

          </figure>
        )}

        {/* =================================================
            ARTICLE BODY
        ================================================= */}

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">

          <main>

            {/* INTRO */}

            <p className="font-serif text-xl leading-[1.65] text-gray-950 sm:text-2xl">

              <span className="float-left mr-2 mt-1 font-serif text-6xl font-bold leading-[0.75] text-red-600">
                {article.dek.charAt(0)}
              </span>

              {article.dek}

            </p>

            {/* =================================================
                AT A GLANCE
            ================================================= */}

            <section className="mt-10 border-y-2 border-black py-6">

              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-red-600" />

                <p className="text-[10px] font-bold uppercase tracking-[0.22em]">
                  At a glance
                </p>

              </div>

              <div className="mt-5 grid gap-0 sm:grid-cols-2">

                {article.highlights.map(
                  (point, index) => (
                    <div
                      key={point}
                      className="flex gap-4 border-b border-gray-200 py-4 sm:pr-5"
                    >

                      <span className="font-serif text-2xl font-bold text-red-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-sm leading-6 text-gray-700">
                        {point}
                      </p>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* =================================================
                ARTICLE SECTIONS
            ================================================= */}

            {showSectionAds && (
              <PrideTimesAd variant="fifth" className="mt-10" />
            )}

            <div className="mt-10 font-serif text-[17px] leading-[1.9] text-gray-800 sm:text-[18px]">

              {article.sections.map(
                (section, index) => (
                  <section
                    key={section.heading}
                    className="mb-11"
                  >

                    <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
                      {String(index + 1).padStart(2, "0")} · The story
                    </p>

                    <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl">
                      {section.heading}
                    </h2>

                    <p className="mt-4">
                      {section.body}
                    </p>

                    {index === 0 && (
                      <blockquote className="my-8 border-l-4 border-red-600 bg-white px-6 py-5 font-serif text-xl font-semibold leading-8 text-gray-950">

                        <Quote
                          size={20}
                          className="mb-2 text-red-600"
                        />

                        {article.dek}

                      </blockquote>
                    )}

                  </section>
                )
              )}

              {/* =================================================
                  KEY FACTS
              ================================================= */}

              <section className="border-y border-gray-300 bg-white px-5 py-7 sm:px-8">

                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
                  Key facts
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  {article.keyFacts.map(
                    (fact) => (
                      <div
                        key={fact.label}
                        className="border-l-2 border-red-600 pl-4"
                      >

                        <p className="font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
                          {fact.label}
                        </p>

                        <p className="mt-1 font-sans text-sm font-semibold text-gray-950">
                          {fact.value}
                        </p>

                      </div>
                    )
                  )}

                </div>

              </section>

              {/* =================================================
                  TAKEAWAY
              ================================================= */}

              <section className="mt-11 border-t-2 border-black pt-7">

                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
                  The takeaway
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-gray-950 sm:text-4xl">
                  What readers should watch next
                </h2>

                <p className="mt-4">
                  The next stage of this story will be defined by measurable
                  developments rather than headlines alone. Product launches,
                  customer adoption, investment decisions, independent testing,
                  partnerships and operating results will provide the clearest
                  evidence of how the story evolves.
                </p>

                <ul className="mt-5 space-y-4 font-sans text-sm leading-6 text-gray-700">

                  {article.highlights.map(
                    (point) => (
                      <li
                        key={point}
                        className="flex gap-3"
                      >

                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />

                        <span>
                          {point}
                        </span>

                      </li>
                    )
                  )}

                </ul>

              </section>

            </div>

            {/* =================================================
                ARTICLE FOOTER
            ================================================= */}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-gray-300 py-5">

              <Link
                to={sectionPath}
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600 hover:text-red-600"
              >
                <ArrowLeft size={13} />

                Back to {sectionName}
              </Link>

              <div className="flex items-center gap-5">

                <button
                  type="button"
                  aria-label="Bookmark article"
                  className="text-gray-500 hover:text-red-600"
                >
                  <Bookmark size={17} />
                </button>

                <button
                  type="button"
                  aria-label="Share article"
                  className="text-gray-500 hover:text-red-600"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: article.dek,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard?.writeText(
                        window.location.href
                      );
                    }
                  }}
                >
                  <Share2 size={17} />
                </button>

              </div>

            </div>

            {/* =================================================
                RELATED ARTICLES
            ================================================= */}

            {related.length > 0 && (
              <section className="mt-16 border-t-2 border-black pt-6">

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
                  Continue reading
                </p>

                <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">
                  More from {sectionName}
                </h2>

                <div className="mt-6 grid gap-5 md:grid-cols-3">

                  {related.map(
                    (story) => (
                      <Link
                        key={story.id}
                        to={specialArticlePath(story.id)}
                        className="group overflow-hidden border border-gray-200 bg-white"
                      >

                        {story.image && (
                          <ImageWithFallback
                            src={story.image}
                            alt={story.title}
                            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        )}

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
                    )
                  )}

                </div>

              </section>
            )}

          </main>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

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

                  {article.highlights.map(
                    (point, index) => (
                      <li
                        key={point}
                        className="flex gap-3 py-4 text-sm leading-6 text-gray-700"
                      >

                        <span className="font-serif text-lg font-bold text-red-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span>
                          {point}
                        </span>

                      </li>
                    )
                  )}

                </ol>

              </section>

              {showSectionAds && (
                <PrideTimesAd variant="first" />
              )}

              <section className="border border-gray-200 bg-[#171717] p-5 text-white">

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
                  Story guide
                </p>

                <div className="mt-5 space-y-4">

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                      Publication
                    </p>

                    <p className="mt-1 text-sm">
                      The Pride Times
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                      Editor
                    </p>

                    <p className="mt-1 text-sm">
                      The Pride Times Editorial Desk
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                      Section
                    </p>

                    <p className="mt-1 text-sm">
                      {article.section}
                    </p>
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

/* =========================================================
   SHARED HELPERS FOR HOMEPAGE / MAGAZINE EDITORIALS
========================================================= */

function formatIsoDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function backToLabel(path: string) {
  switch (path) {
    case "/business-news":
      return "Business News";

    case "/technology":
      return "Technology";

    default:
      return "Home";
  }
}

/* =========================================================
   HOMEPAGE ARTICLE EDITORIAL
========================================================= */

function relatedHomepageArticles(
  article: HomepageArticleType,
  limit = 3
) {
  const sameCategory = homepageArticles.filter(
    (item) =>
      item.slug !== article.slug &&
      item.category === article.category
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const fallback = homepageArticles.filter(
    (item) =>
      item.slug !== article.slug &&
      !sameCategory.includes(item)
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}

/* =========================================================
   HOMEPAGE ARTICLE AD
========================================================= */

function HomepageArticleAd() {
  useEffect(() => {
    try {
      const ads = (window as any).adsbygoogle || [];
      ads.push({});
    } catch (error) {
      console.warn("AdSense initialization skipped:", error);
    }
  }, []);

  return (
    <div className="my-10 w-full overflow-hidden border-y border-gray-200 bg-white py-4">
      <p className="mb-3 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        Advertisement
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "120px" }}
        data-ad-client="ca-pub-2331501617441941"
        data-ad-slot="6033028012"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

function ReadingProgress() {
  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      document.documentElement.style.setProperty(
        "--article-progress",
        `${Math.min(100, Math.max(0, progress))}%`
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-0.5 bg-red-600"
      style={{ width: "var(--article-progress, 0%)" }}
    />
  );
}

function HomepageArticle({
  article,
}: {
  article: HomepageArticleType;
}) {
  const related = relatedHomepageArticles(article);

  const shareArticle = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.dek,
        url,
      }).catch(() => undefined);
      return;
    }

    await navigator.clipboard?.writeText(url);
  };

  return (
    <article className="min-h-screen bg-[#f8f7f3] text-[#171717]">
      <ReadingProgress />

      {/* BLOG TOP BAR */}
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 transition-colors hover:text-red-600"
          >
            <ArrowLeft size={13} />
            Back to Home
          </Link>

          <span className="hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 sm:block">
            The Pride Times · Editorial Blog
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        {/* EDITORIAL HEADER */}
        <header className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
            <span>{article.category}</span>
            <span className="h-1 w-1 rounded-full bg-red-600" />
            <span>Analysis</span>
          </div>

          <h1 className="mt-5 max-w-5xl font-serif text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-gray-950 sm:text-5xl md:text-6xl lg:text-7xl">
            {article.title}
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-600 sm:text-xl md:text-2xl md:leading-9">
            {article.dek}
          </p>

          {/* AUTHOR / META */}
          <div className="mt-8 flex flex-col gap-5 border-y border-gray-300 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] font-serif text-sm font-bold text-white">
                {article.author
                  .split(" ")
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
                  Written by
                </p>
                <p className="mt-0.5 text-sm font-bold text-gray-900">
                  {article.author}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.13em] text-gray-500">
              <span>{article.publishedAt}</span>
              <span className="hidden h-1 w-1 rounded-full bg-red-600 sm:block" />
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {article.readTime}
              </span>
              <span>Updated editorial format</span>
            </div>
          </div>
        </header>

        {/* HERO IMAGE */}
        {article.image && (
          <figure className="mx-auto mt-9 max-w-6xl">
            <div className="overflow-hidden border border-gray-200 bg-gray-100">
              <ImageWithFallback
                src={article.image}
                alt={article.title}
                className="h-[300px] w-full object-cover sm:h-[460px] md:h-[600px]"
              />
            </div>

            <figcaption className="mt-2 flex flex-wrap justify-between gap-2 text-[9px] uppercase tracking-[0.14em] text-gray-400">
              <span>The Pride Times · {article.category}</span>
              <span>Editorial image</span>
            </figcaption>
          </figure>
        )}

        {/* BLOG LAYOUT */}
        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <main>
            {/* EDITOR'S NOTE */}
            <section className="border-l-2 border-red-600 bg-white px-5 py-5 sm:px-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-600">
                Editor's note
              </p>
              <p className="mt-2 font-serif text-base leading-7 text-gray-700">
                {article.editorNote}
              </p>
            </section>

            {/* OPENING */}
            <section className="mt-10">
              <p className="font-serif text-xl leading-[1.75] text-gray-950 sm:text-2xl">
                <span className="float-left mr-2 mt-1 font-serif text-7xl font-bold leading-[0.72] text-red-600">
                  {article.dek.charAt(0)}
                </span>
                {article.dek}
              </p>
            </section>

            {/* AT A GLANCE */}
            <section className="mt-12 border-y-2 border-black py-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-600">
                    Quick read
                  </p>
                  <h2 className="mt-1 font-serif text-2xl font-bold sm:text-3xl">
                    What matters most
                  </h2>
                </div>

                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-400 sm:block">
                  {article.highlights.length} key signals
                </span>
              </div>

              <div className="mt-6 grid gap-0 sm:grid-cols-2">
                {article.highlights.map((point, index) => (
                  <div
                    key={point}
                    className="flex gap-4 border-b border-gray-200 py-5 first:border-t sm:pr-6"
                  >
                    <span className="font-serif text-2xl font-bold text-red-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-sm leading-6 text-gray-700">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* BLOG BODY */}
            <div className="mt-12 font-serif text-[17px] leading-[1.9] text-gray-800 sm:text-[18px]">
              {article.sections.map((section, index) => (
                <section
                  key={section.heading}
                  className="mb-14 scroll-mt-20"
                  id={`section-${index + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-gray-300" />
                  </div>

                  <h2 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-[-0.02em] text-gray-950 sm:text-4xl">
                    {section.heading}
                  </h2>

                  <p className="mt-5">{section.body}</p>

                  {/* PULL QUOTE */}
                  {index === 0 && article.highlights[0] && (
                    <blockquote className="my-10 border-y border-black bg-white px-6 py-7 sm:px-9">
                      <Quote size={20} className="text-red-600" />
                      <p className="mt-3 font-serif text-xl font-bold leading-8 text-gray-950 sm:text-2xl">
                        “{article.highlights[0]}”
                      </p>
                      <p className="mt-3 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                        Key signal · The Pride Times
                      </p>
                    </blockquote>
                  )}

                  {/* INLINE TAKEAWAY */}
                  {index === 1 && (
                    <div className="my-10 bg-[#171717] px-6 py-7 text-white sm:px-8">
                      <p className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
                        Reader takeaway
                      </p>
                      <p className="mt-3 font-serif text-xl font-semibold leading-8">
                        The headline is the starting point. The more important
                        question is whether the underlying change persists.
                      </p>
                    </div>
                  )}
                </section>
              ))}

              {/* WHAT TO WATCH */}
              <section className="border-t-2 border-black pt-8">
                <p className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-red-600">
                  The takeaway
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-gray-950 sm:text-4xl">
                  What to watch next
                </h2>

                <p className="mt-5">
                  The next stage of this story should be measured through
                  evidence rather than headlines alone. Watch how the key
                  signals develop, whether the underlying trend persists, and
                  how businesses, investors and policymakers respond.
                </p>

                <ul className="mt-6 space-y-4 font-sans text-sm leading-6 text-gray-700">
                  {article.highlights.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* TAGS */}
              <section className="mt-10 border-y border-gray-300 py-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-2 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                    Filed under
                  </span>

                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-gray-300 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* SHARE / NAV */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-gray-300 py-5">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600 transition-colors hover:text-red-600"
              >
                <ArrowLeft size={13} />
                Back to Home
              </Link>

              <div className="flex items-center gap-5">
                <button
                  type="button"
                  aria-label="Bookmark article"
                  className="text-gray-500 transition-colors hover:text-red-600"
                  onClick={() => {
                    const key = `pride-times-bookmark:${article.slug}`;
                    const saved = localStorage.getItem(key) === "true";
                    localStorage.setItem(key, String(!saved));
                  }}
                >
                  <Bookmark size={17} />
                </button>

                <button
                  type="button"
                  aria-label="Share article"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600 transition-colors hover:text-red-600"
                  onClick={shareArticle}
                >
                  <Share2 size={17} />
                  Share
                </button>
              </div>
            </div>

            {/* RELATED */}
            {related.length > 0 && (
              <section className="mt-16 border-t-2 border-black pt-7">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-600">
                  Continue reading
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                  More from The Pride Times
                </h2>

                <div className="mt-7 grid gap-5 md:grid-cols-3">
                  {related.map((story) => (
                    <Link
                      key={story.slug}
                      to={articlePath(story.title)}
                      className="group overflow-hidden border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                    >
                      {story.image && (
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}

                      <div className="p-4">
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">
                          {story.category}
                        </p>

                        <h3 className="mt-2 font-serif text-lg font-bold leading-tight transition-colors group-hover:text-red-600">
                          {story.title}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-500">
                          {story.dek}
                        </p>

                        <span className="mt-4 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-hover:text-red-600">
                          Read blog
                          <ArrowRight size={10} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* SIDEBAR */}
          <aside className="lg:pt-2">
            <div className="sticky top-6 space-y-6">
              <section className="border-t-2 border-black bg-white p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
                  Inside this blog
                </p>

                <h2 className="mt-2 font-serif text-2xl font-bold">
                  Story guide
                </h2>

                <nav className="mt-4">
                  <ol className="divide-y divide-gray-200">
                    {article.sections.map((section, index) => (
                      <li key={section.heading}>
                        <a
                          href={`#section-${index + 1}`}
                          className="flex gap-3 py-4 text-sm leading-5 text-gray-700 transition-colors hover:text-red-600"
                        >
                          <span className="font-serif text-lg font-bold text-red-600">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{section.heading}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </section>

              <section className="border border-gray-200 bg-[#171717] p-5 text-white">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
                  About this post
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                      Publication
                    </p>
                    <p className="mt-1 text-sm">The Pride Times</p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                      Author
                    </p>
                    <p className="mt-1 text-sm">{article.author}</p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                      Reading time
                    </p>
                    <p className="mt-1 text-sm">{article.readTime}</p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                      Format
                    </p>
                    <p className="mt-1 text-sm">Editorial blog</p>
                  </div>
                </div>
              </section>

              <section className="border-t border-gray-300 pt-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Key signals
                </p>

                <div className="mt-3 space-y-3">
                  {article.highlights.slice(0, 3).map((point, index) => (
                    <div key={point} className="flex gap-3">
                      <span className="font-serif text-lg font-bold text-red-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-xs leading-5 text-gray-600">{point}</p>
                    </div>
                  ))}
                </div>
              </section>

              <PrideTimesAd variant="first" />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   ARTICLE ROUTER
========================================================= */

export function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  /*
   * IMPORTANT:
   * Special articles are checked FIRST.
   *
   * This is what allows:
   *
   * /article/innovation-quantumbattery
   * /article/innovation-blackwell
   * /article/cybersecurity-...
   *
   * to open the same way as homepage/business articles.
   */

  const specialArticle = getSpecialArticleById(id);

  if (specialArticle) {
    return (
      <SpecialArticleEditorial
        article={specialArticle}
      />
    );
  }

  /* =======================================================
     HOMEPAGE ARTICLES
  ======================================================= */

  const homepageArticle =
    getHomepageArticleBySlug(id);

  if (homepageArticle) {
    return (
      <HomepageArticle
        article={homepageArticle}
      />
    );
  }

  /* =======================================================
     BUSINESS ARTICLES
  ======================================================= */

  const businessArticle =
    getBusinessArticleById(id);

  if (businessArticle) {
    return (
      <MagazineEditorial
        article={businessArticle}
        backTo="/business-news"
      />
    );
  }

  /* =======================================================
     TECHNOLOGY ARTICLES
  ======================================================= */

  const technologyArticle =
    getTechnologyArticleById(id);

  if (technologyArticle) {
    return (
      <MagazineEditorial
        article={technologyArticle}
        backTo="/technology"
      />
    );
  }

  /* =======================================================
     ARTICLE NOT FOUND
  ======================================================= */

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
