import { Fragment, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, Clock, MapPin, Quote, Share2 } from "lucide-react";

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

/* Mergers & Acquisitions article lookup */
import {
  getMAArticleBySlug,
} from "../../data/mergersAcquisitionsData";

type EditorialArticle = BusinessArticle | TechnologyArticle;

type AdSenseWindow = Window & {
  adsbygoogle?: unknown[];
};

type BlogSection = {
  heading: string;
  body: string;
};

/* Shared keyboard-focus style. */
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";

/* =========================================================
   ADSENSE
========================================================= */

function AdSenseUnit({
  slot,
  inArticle = false,
  side = false,
}: {
  slot:
    | "5373718974"
    | "8042854193"
    | "6033028012"
    | "5608262547"
    | "6810700989";
  inArticle?: boolean;
  /** Compact variant used inside the article sidebar. */
  side?: boolean;
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

  if (side) {
    return (
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3">
        <p className="mb-2 select-none text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Advertisement
        </p>

        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: "250px" }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className="clear-both my-12 w-full overflow-hidden border-y border-slate-200 bg-white py-5">
      <div className="mx-auto max-w-3xl px-3 sm:px-5">
        <p className="mb-3 select-none text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Advertisement
        </p>

        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: "90px" }}
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
    </div>
  );
}

/* =========================================================
   SECTION HELPERS
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
    case "International News":
      return "/international-news";

    case "Energy":
      return "/energy";

    case "Markets":
      return "/markets";

    case "Startup Success":
      return "/startup-success";

    case "Technology":
      return "/technology";

    case "Leadership & Governance":
      return "/leadership-governance";

    case "Sustainability & ESG":
      return "/sustainability-esg";

    case "Smart Cities":
      return "/smart-cities";

    case "Supply Chain":
      return "/supply-chain";

    default:
      return "/ceospotlight";
  }
}

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

    case "Leadership & Governance":
      return "Leadership & Governance";

    case "Sustainability & ESG":
      return "Sustainability & ESG";

    case "Markets":
      return "Markets";

    case "Smart Cities":
      return "Smart Cities";

    case "Supply Chain":
      return "Supply Chain";

    default:
      return "CEO Spotlight";
  }
}

/* =========================================================
   BLOG HEADLINE FORMATTING
========================================================= */

function formatBlogTitle(title: string, category: string) {
  const cleanTitle = title.replace(/[.!?]+$/, "").trim();

  const actionMatch = cleanTitle.match(
    /^(.+?)\s+(?:announces|launches|unveils|introduces|raises|secures|expands|posts|surpasses|overtakes|acquires|draws|clears|sells|reports|reaches|hits)\s+(.+)$/i
  );

  if (actionMatch) {
    const company = actionMatch[1].trim();

    const development = actionMatch[2]
      .split(/\s+[—–-]\s+/)[0]
      .trim();

    const context =
      category && category.toLowerCase() !== "general"
        ? category.toLowerCase()
        : "the wider market";

    const possessive = /s$/i.test(company)
      ? `${company}'`
      : `${company}'s`;

    return `What ${possessive} ${development} means for ${context}`;
  }

  if (
    /^(how|why|what|understanding|inside|a guide|the case for)\b/i.test(
      cleanTitle
    )
  ) {
    return cleanTitle;
  }

  return `A closer look at ${cleanTitle}`;
}

/* =========================================================
   BLOG SECTION HEADINGS
========================================================= */

function formatSectionHeading(heading: string, category: string) {
  const normalized = heading.trim().toLowerCase();

  if (normalized === "the development") {
    return "The development in context";
  }

  if (normalized === "why it matters") {
    return `Why this matters for ${category.toLowerCase()}`;
  }

  if (normalized === "the wider context") {
    return "The broader business context";
  }

  if (normalized === "what to watch next") {
    return "What to watch from here";
  }

  if (normalized === "what comes next") {
    return "The next signals to watch";
  }

  if (normalized === "the operating impact") {
    return "How this could affect day-to-day operations";
  }

  if (normalized === "the market question") {
    return "The commercial question";
  }

  if (normalized === "the breakthrough in context") {
    return "The idea behind the development";
  }

  return heading;
}

/* =========================================================
   RELATED ARTICLE HELPERS
========================================================= */

function specialArticlesForSection(
  section: string,
  currentId: string
) {
  return specialArticles
    .filter(
      (article) =>
        article.section === section && article.id !== currentId
    )
    .slice(0, 3);
}

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
   BLOG META
========================================================= */

function BlogMeta({
  author,
  date,
  readTime,
}: {
  author: string;
  date: string;
  readTime?: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-slate-200 py-4 text-[11px] text-slate-500">
      <span className="font-semibold text-slate-800">
        By {author}
      </span>

      <span className="hidden h-1 w-1 shrink-0 rounded-full bg-red-600 sm:block" />

      <time className="tabular-nums">{date}</time>

      {readTime && (
        <>
          <span className="hidden h-1 w-1 shrink-0 rounded-full bg-slate-300 sm:block" />

          <span className="inline-flex items-center gap-1.5 tabular-nums">
            <Clock size={12} className="shrink-0" />
            {readTime}
          </span>
        </>
      )}
    </div>
  );
}

/* =========================================================
   BLOG HIGHLIGHTS
========================================================= */

/* =========================================================
   BLOG BODY
========================================================= */

function BlogBody({
  sections,
  category,
  intro,
}: {
  sections: BlogSection[];
  category: string;
  intro?: string;
}) {
  /* Reading column only: no ads, pull-quotes or extras between
     sections. Those live in the sidebar. */
  return (
    <div className="blog-prose mt-2">
      {intro && (
        <p className="mb-8 border-l-[3px] border-red-600 pl-5 text-xl font-medium leading-8 tracking-[-0.02em] text-slate-800 sm:text-2xl sm:leading-9">
          {intro}
        </p>
      )}

      {sections.map((section, index) => (
        <section
          key={`${section.heading}-${index}`}
          className="mb-8 scroll-mt-24"
        >
          <h2 className="max-w-3xl break-words font-serif text-2xl font-bold leading-tight tracking-[-0.025em] text-slate-950 sm:text-3xl">
            {formatSectionHeading(section.heading, category)}
          </h2>

          <p className="mt-4 break-words text-[16px] leading-[1.85] text-slate-700 sm:text-[17px]">
            {section.body}
          </p>
        </section>
      ))}
    </div>
  );
}

/* =========================================================
   KEY FACTS ("AT A GLANCE")
========================================================= */

/* =========================================================
   BLOG SIDEBAR
========================================================= */

type SideAdSlots = {
  top: "5373718974" | "5608262547" | "6033028012";
  bottom: "8042854193" | "6810700989";
};

const defaultSideAdSlots: SideAdSlots = {
  top: "5373718974",
  bottom: "8042854193",
};

function BlogSidebar({
  highlights,
  category,
  section,
  facts,
  quote,
  adSlots = defaultSideAdSlots,
}: {
  highlights: string[];
  category: string;
  section: string;
  facts?: { label: string; value: string }[];
  quote?: { text: string; by: string };
  adSlots?: SideAdSlots;
}) {
  return (
    <aside className="space-y-5">
      <AdSenseUnit slot={adSlots.top} side />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
          In this post
        </p>

        <h2 className="mt-2 font-serif text-xl font-bold text-slate-950">
          Key points
        </h2>

        <ol className="mt-3 divide-y divide-slate-100">
          {highlights.slice(0, 5).map((point, index) => (
            <li
              key={`${index}-${point}`}
              className="flex items-start gap-3 py-3 text-sm leading-6 text-slate-600"
            >
              <span className="shrink-0 font-semibold tabular-nums text-red-600">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 break-words">{point}</span>
            </li>
          ))}
        </ol>
      </section>

      {quote && (
        <blockquote className="rounded-2xl border-l-4 border-red-600 bg-slate-50 px-5 py-5 not-italic">
          <Quote size={16} className="mb-2 text-red-600" />

          <p className="font-serif text-lg font-semibold leading-7 text-slate-900">
            &ldquo;{quote.text}&rdquo;
          </p>

          <footer className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
            {quote.by}
          </footer>
        </blockquote>
      )}

      {facts && facts.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
            At a glance
          </p>

          <dl className="mt-3 divide-y divide-slate-200">
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-0 py-2.5">
                <dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  {fact.label}
                </dt>

                <dd className="mt-0.5 break-words text-sm font-semibold text-slate-800">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="overflow-hidden rounded-2xl bg-[#101827] p-5 text-white shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
          The Pride Times
        </p>

        <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
          Ideas, context and the bigger picture.
        </p>

        <div className="mt-5 space-y-3 border-t border-white/15 pt-4 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
              Topic
            </p>

            <p className="mt-1 break-words">{category}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
              Coverage
            </p>

            <p className="mt-1 break-words">{section}</p>
          </div>
        </div>
      </section>

      <div className="lg:sticky lg:top-6">
        <AdSenseUnit slot={adSlots.bottom} side />
      </div>
    </aside>
  );
}

/* =========================================================
   SHARE AND BACK NAVIGATION
========================================================= */

function ShareAndBack({
  to,
  label,
  title,
  description,
}: {
  to: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-5">
      <Link
        to={to}
        className={`group inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-red-600 ${focusRing}`}
      >
        <ArrowLeft
          size={15}
          className="transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />

        Back to {label}
      </Link>

      <button
        type="button"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title,
              text: description,
              url: window.location.href,
            }).catch((error) => {
              if (error?.name !== "AbortError") {
                console.warn("Unable to share:", error);
              }
            });
          } else {
            navigator.clipboard?.writeText(
              window.location.href
            );
          }
        }}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-700 active:scale-[0.98] motion-reduce:active:scale-100 ${focusRing}`}
      >
        <Share2 size={14} />
        Share this post
      </button>
    </div>
  );
}

/* =========================================================
   RELATED POSTS
========================================================= */

function RelatedPosts<
  T extends {
    id?: string;
    slug?: string;
    title: string;
    category?: string;
    dek?: string;
    excerpt?: string;
  }
>({
  items,
  getHref,
  plainTitles = false,
}: {
  items: T[];
  getHref: (item: T) => string;
  /* Show the original headline instead of the rewritten blog title. */
  plainTitles?: boolean;
}) {
  if (!items.length) return null;

  return (
    <section className="mt-14 border-t border-slate-200 pt-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
        Keep exploring
      </p>

      <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
        More ideas to explore
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Link
            key={item.id ?? item.slug ?? index}
            to={getHref(item)}
            className={`group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-red-200 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">
              {item.category ?? "The Pride Times"}
            </p>

            <h3 className="mt-3 break-words font-serif text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-red-700">
              {plainTitles
                ? item.title
                : formatBlogTitle(
                    item.title,
                    item.category ?? "Business"
                  )}
            </h3>

            <p className="mt-3 line-clamp-3 break-words text-sm leading-6 text-slate-500">
              {item.dek ??
                item.excerpt ??
                "Explore the context, developments and ideas shaping this topic."}
            </p>

            <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-semibold text-slate-700 transition-colors duration-200 group-hover:text-red-700">
              Read the post

              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   SPECIAL BLOGS
========================================================= */

function SpecialBlog({
  article,
}: {
  article: SpecialArticle;
}) {
  const related = specialArticlesForSection(
    article.section,
    article.id
  );

  const sectionPath = getSectionPath(article.section);
  const sectionName = getSectionName(article.section);

  const title = formatBlogTitle(
    article.title,
    article.category
  );

  return (
    <article className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <Link
            to={sectionPath}
            className={`group inline-flex items-center gap-2 rounded-sm text-xs font-semibold text-slate-500 transition-colors duration-200 hover:text-red-600 ${focusRing}`}
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />

            Back to {sectionName}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <header className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
            <span>The Pride Times Blog</span>

            <span className="text-slate-300">/</span>

            <span>{article.category}</span>
          </div>

          <h1 className="mt-5 max-w-4xl break-words font-serif text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-4xl md:text-5xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl break-words text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            {article.dek}
          </p>

          <BlogMeta
            author={article.author}
            date={article.publishedAt}
            readTime={article.readTime}
          />
        </header>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-14">
          <main className="min-w-0">
            <BlogBody
              sections={article.sections}
              category={article.category}
              intro={article.dek}
            />

            <ShareAndBack
              to={sectionPath}
              label={sectionName}
              title={title}
              description={article.dek}
            />

            <RelatedPosts
              items={related}
              getHref={(item) =>
                specialArticlePath(item.id)
              }
            />
          </main>

          <BlogSidebar
            highlights={article.highlights}
            category={article.category}
            section={article.section}
            facts={article.keyFacts}
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   HOMEPAGE BLOGS
========================================================= */

function HomepageBlog({
  article,
}: {
  article: HomepageArticleType;
}) {
  const related = relatedHomepageArticles(article);

  const title = formatBlogTitle(
    article.title,
    article.category
  );

  const isExpandedAdCategory = [
    "Manufacturing",
    "Smart Cities",
    "Supply Chain",
  ].includes(article.category);

  return (
    <article className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <Link
            to="/"
            className={`group inline-flex items-center gap-2 rounded-sm text-xs font-semibold text-slate-500 transition-colors duration-200 hover:text-red-600 ${focusRing}`}
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />

            Back to Home
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <header className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
            <span>The Pride Times Blog</span>

            <span className="text-slate-300">/</span>

            <span>{article.category}</span>
          </div>

          <h1 className="mt-5 break-words font-serif text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-4xl md:text-5xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl break-words text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            {article.dek}
          </p>

          <BlogMeta
            author={article.author}
            date={article.publishedAt}
            readTime={article.readTime}
          />
        </header>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-14">
          <main className="min-w-0">
            <BlogBody
              sections={article.sections}
              category={article.category}
              intro={article.dek}
            />

            <ShareAndBack
              to="/"
              label="Home"
              title={title}
              description={article.dek}
            />

            <RelatedPosts
              items={related}
              getHref={(item) =>
                articlePath(item.title)
              }
            />
          </main>

          <BlogSidebar
            highlights={article.highlights}
            category={article.category}
            section={article.category}
            adSlots={{
              top: isExpandedAdCategory ? "5608262547" : "5373718974",
              bottom: isExpandedAdCategory ? "6810700989" : "8042854193",
            }}
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   GLOBAL CORPORATE NEWS DIGEST ARTICLE
   Full inner article for every homepage story.
========================================================= */

function DigestBlog({
  article,
}: {
  article: HomepageArticleType;
}) {
  const digest = article.digest;

  if (!digest) return null;

  const related = relatedHomepageArticles(article, 3);

  return (
    <article className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className={`group inline-flex items-center gap-2 rounded-sm text-xs font-semibold text-slate-500 transition-colors duration-200 hover:text-red-600 ${focusRing}`}
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
            Back to Home
          </Link>

          <Link
            to={digest.sectionPath}
            className={`rounded-sm text-xs font-semibold text-slate-500 transition-colors duration-200 hover:text-red-600 ${focusRing}`}
          >
            More in {digest.sectionName}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <header className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
            <span>
              {article.tags.includes("Global Industry Edition")
                ? "The Pride Times News · Global Industry Edition"
                : "Global Corporate News Digest"}
            </span>
            <span className="text-slate-300">/</span>
            <Link
              to={digest.sectionPath}
              className="hover:underline"
            >
              {digest.sectionName}
            </Link>
          </div>

          <h1 className="mt-5 break-words font-serif text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-4xl md:text-5xl">
            {article.title}
          </h1>

          <p className="mt-6 max-w-3xl break-words text-lg font-medium leading-8 text-slate-700 sm:text-xl sm:leading-9">
            {digest.lede}
          </p>

          <p className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
            <MapPin size={12} className="text-red-600" />
            {digest.location}
          </p>

          <BlogMeta
            author={article.author}
            date={article.publishedAt}
            readTime={article.readTime}
          />
        </header>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-14">
          <main className="min-w-0">
            <div className="blog-prose mt-4">
              {digest.body.map((paragraph, index) => (
                <Fragment key={`${index}-${paragraph.slice(0, 24)}`}>
                  <p className="mb-6 break-words text-[16px] leading-[1.9] text-slate-700 sm:text-[17px]">
                    {paragraph}
                  </p>
                </Fragment>
              ))}

            </div>

            <p className="mt-8 border-t border-slate-200 pt-4 text-[11px] leading-5 text-slate-400">
              {article.editorNote}
            </p>

            <ShareAndBack
              to="/"
              label="Home"
              title={article.title}
              description={digest.lede}
            />

            <RelatedPosts
              items={related}
              plainTitles
              getHref={(item) => `/article/${item.slug}`}
            />
          </main>

          <BlogSidebar
            highlights={article.highlights}
            category={article.category}
            section={article.category}
            facts={digest.keyFacts}
            quote={digest.quote}
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   DATE / SECTION HELPERS
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
  if (path === "/business-news") {
    return "Business";
  }

  if (path === "/technology") {
    return "Technology";
  }

  return "Home";
}

/* =========================================================
   BUSINESS / TECHNOLOGY BLOGS
========================================================= */

function MagazineBlog({
  article,
  backTo,
}: {
  article: EditorialArticle;
  backTo: string;
}) {
  const isBusiness = "time" in article;

  const dek = article.excerpt ?? "";

  const dateLabel = isBusiness
    ? (article as BusinessArticle).time
    : formatIsoDate(
        (article as TechnologyArticle).publishedAt
      );

  const readTime = isBusiness
    ? undefined
    : (article as TechnologyArticle).readTime;

  const keyFacts = isBusiness
    ? undefined
    : (article as TechnologyArticle).keyFacts;

  const related = isBusiness
    ? getRelatedBusinessArticles(
        article as BusinessArticle
      )
    : getRelatedTechnologyArticles(
        article as TechnologyArticle
      );

  const relatedPath = (story: EditorialArticle) =>
    isBusiness
      ? `/article/${story.id}`
      : technologyArticlePath(story.id);

  const sectionLabel = backToLabel(backTo);

  const title = formatBlogTitle(
    article.title,
    article.category
  );

  return (
    <article className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <Link
            to={backTo}
            className={`group inline-flex items-center gap-2 rounded-sm text-xs font-semibold text-slate-500 transition-colors duration-200 hover:text-red-600 ${focusRing}`}
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />

            Back to {sectionLabel}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <header className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
            <span>The Pride Times Blog</span>

            <span className="text-slate-300">/</span>

            <span>{article.category}</span>
          </div>

          <h1 className="mt-5 break-words font-serif text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-4xl md:text-5xl">
            {title}
          </h1>

          {dek && (
            <p className="mt-6 max-w-3xl break-words text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
              {dek}
            </p>
          )}

          <BlogMeta
            author={article.author}
            date={dateLabel}
            readTime={readTime}
          />
        </header>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-14">
          <main className="min-w-0">
            <BlogBody
              sections={article.sections}
              category={article.category}
              intro={dek}
            />

            <ShareAndBack
              to={backTo}
              label={sectionLabel}
              title={title}
              description={dek}
            />

            <RelatedPosts
              items={related}
              getHref={relatedPath}
            />
          </main>

          <BlogSidebar
            highlights={article.highlights}
            category={article.category}
            section={sectionLabel}
            facts={keyFacts}
          />
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
   * SCROLL-TO-TOP FIX
   *
   * When a user clicks a related article, React Router may
   * reuse this component instead of mounting a new instance.
   *
   * This effect resets the scroll position whenever the
   * article ID changes.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [id]);

  /*
   * MERGERS & ACQUISITIONS INTEGRATION
   *
   * Check whether this article ID belongs to the M&A data.
   *
   * If it does, redirect to the dedicated M&A article page.
   * The dedicated page is responsible for rendering the
   * M&A article design and content.
   *
   * This allows M&A articles to open correctly even when
   * their links use the general /article/:id route.
   */
  if (id && getMAArticleBySlug(id)) {
    return (
      <Navigate
        to={`/mergers-acquisitions/${id}`}
        replace
      />
    );
  }

  /* SPECIAL ARTICLES */
  const specialArticle = getSpecialArticleById(id);

  if (specialArticle) {
    return <SpecialBlog article={specialArticle} />;
  }

  /* HOMEPAGE ARTICLES */
  const homepageArticle = getHomepageArticleBySlug(id);

  if (homepageArticle) {
    return homepageArticle.digest ? (
      <DigestBlog article={homepageArticle} />
    ) : (
      <HomepageBlog article={homepageArticle} />
    );
  }

  /* BUSINESS ARTICLES */
  const businessArticle = getBusinessArticleById(id);

  if (businessArticle) {
    return (
      <MagazineBlog
        article={businessArticle}
        backTo="/business-news"
      />
    );
  }

  /* TECHNOLOGY ARTICLES */
  const technologyArticle = getTechnologyArticleById(id);

  if (technologyArticle) {
    return (
      <MagazineBlog
        article={technologyArticle}
        backTo="/technology"
      />
    );
  }

  /* ARTICLE NOT FOUND */
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center antialiased sm:px-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
        The Pride Times Blog
      </p>

      <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-slate-950">
        We couldn't find this post
      </h1>

      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500">
        The post may have moved or its link may be outdated.
      </p>

      <Link
        to="/"
        className={`mt-7 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-xs font-semibold text-white transition-colors duration-200 hover:bg-red-600 ${focusRing}`}
      >
        <ArrowLeft size={14} />
        Back to home
      </Link>
    </div>
  );
}
