import { Fragment, useEffect, useMemo } from "react";
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

type AdSenseWindow = Window & { adsbygoogle?: unknown[] };

function AdSenseUnit({
  slot,
  inArticle = false,
}: {
  slot: "5373718974" | "8042854193" | "6033028012" | "5608262547" | "6810700989";
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
    <div className="my-10 w-full border-y border-gray-200 bg-white py-5">
      <div className="mx-auto max-w-4xl px-2 sm:px-4">
        <p className="mb-2 text-center text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400">
          Advertisement
        </p>
        <ins
          className="adsbygoogle"
          style={{ display: inArticle ? "block" : "block", minHeight: "90px" }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot={slot}
          {...(inArticle
            ? { "data-ad-layout": "in-article", "data-ad-format": "fluid" }
            : { "data-ad-format": "auto", "data-full-width-responsive": "true" })}
        />
      </div>
    </div>
  );
}

function HomepageArticleAd() {
  return <AdSenseUnit slot="6033028012" />;
}


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

    case "International News":
      return "/international-news";

    case "Energy":
      return "/energy";

    case "Startup Success":
      return "/startup-success";

    case "Technology":
      return "/technology";

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

    case "Energy":
      return "Energy";

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

          <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-6xl">
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
