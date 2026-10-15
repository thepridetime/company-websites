import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, Bookmark, Clock, Link2, MapPin, Quote, Share2 } from "lucide-react";
import {
  TimeAgo,
  estimateReadTime,
  formatTimestamp,
  isIsoTimestamp,
} from "../../utils/timeAgo";

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

/* Page container shared by the back bar, header, article and related posts. */
const pageClass = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

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
  /** Side ad box: 250px tall on mobile/tablet, fills the column height on desktop. */
  side?: boolean;
}) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const el = insRef.current;

    /* Skip if this slot already received an ad (protects against
       StrictMode double-mounting and "already have ads" errors). */
    if (!el || el.getAttribute("data-adsbygoogle-status") === "done") {
      return;
    }

    try {
      const adsWindow = window as AdSenseWindow;

      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
    } catch (error) {
      console.warn("AdSense could not initialize:", error);
    }
  }, [slot]);

  if (side) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
        <p className="mb-2 select-none text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Advertisement
        </p>

        {/* Fixed 250px on mobile/tablet; fills the available height on desktop */}
        <div className="flex min-h-0 w-full flex-1 justify-center overflow-hidden">
          <ins
            ref={insRef}
            className="adsbygoogle block h-[250px] w-[300px] max-w-full lg:h-full"
            style={{ display: "block" }}
            data-ad-client="ca-pub-2331501617441941"
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="false"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="clear-both my-6 w-full overflow-hidden border-y border-slate-200 bg-white py-5">
      <div className="mx-auto max-w-3xl px-3 sm:px-5">
        <p className="mb-3 select-none text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Advertisement
        </p>

        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: "90px" }}
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

    case "Leadership and Governance":
      return "/leadership-governance";

    case "Sustainability and ESG":
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

    case "Leadership and Governance":
      return "Leadership and Governance";

    case "Sustainability and ESG":
      return "Sustainability and ESG";

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
   BLOG META (one line: byline • date • read time)
========================================================= */

/* "By A and B" in one compact, uppercase line with a short accent rule. */
function Byline({ author }: { author: string }) {
  const names = author
    .split(/\s*(?:,|&|\band\b)\s*/i)
    .map((name) => name.trim())
    .filter(Boolean);

  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-900 sm:text-[10px] md:text-[11px]">
      <span aria-hidden className="h-px w-2 bg-slate-900" />
      <span className="text-slate-400">By</span>
      {names.map((name, index) => (
        <span key={`${name}-${index}`}>
          {index > 0 && (index === names.length - 1 ? " and " : ", ")}
          {name}
        </span>
      ))}
    </span>
  );
}

/* Real timestamps show the exact upload time in the reader's time zone.
   Date-only or relative labels are shown as the data provides them, since
   no true upload time exists for them. */
function MetaTime({ value }: { value: string }) {
  if (isIsoTimestamp(value)) {
    return <time dateTime={value}>{formatTimestamp(value)}</time>;
  }

  return <TimeAgo iso={value} />;
}

function MetaDot() {
  return <span aria-hidden className="text-slate-300">•</span>;
}

function BlogMeta({
  author,
  date,
  updatedAt,
  readTime,
  location,
}: {
  /** Shown first, on the same line as the byline, date and read time. */
  location?: string;
  author: string;
  date: string;
  /** ISO timestamp of the last edit, e.g. "2026-10-08T08:14:00Z". */
  updatedAt?: string;
  readTime?: string;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-y border-slate-200 py-2 text-left text-[9px] text-slate-500 sm:text-[10px] md:text-[11px]">
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5">
      {location && (
        <>
          <span className="inline-flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-[9px] md:text-[10px]">
            <MapPin size={10} className="shrink-0 text-red-600" />
            {location}
          </span>

          <MetaDot />
        </>
      )}

      <Byline author={author} />

      <MetaDot />

      <span>
        <MetaTime value={date} />
      </span>

      {updatedAt && updatedAt !== date && (
        <>
          <MetaDot />
          <span className="italic">
            Updated <MetaTime value={updatedAt} />
          </span>
        </>
      )}

      {readTime && (
        <>
          <MetaDot />
          <span className="inline-flex items-center gap-0.5 tabular-nums text-slate-400">
            <Clock size={8} className="shrink-0" />
            {readTime}
          </span>
        </>
      )}
      </div>

      <div className="flex shrink-0 items-center gap-1 text-slate-500">
        <button
          type="button"
          aria-label="Save article"
          className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-slate-100 hover:text-red-600 ${focusRing}`}
        >
          <Bookmark size={13} />
        </button>
        <button
          type="button"
          aria-label="Adjust text size"
          className={`inline-flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-semibold transition-colors duration-200 hover:bg-slate-100 hover:text-red-600 ${focusRing}`}
        >
          Aa
        </button>
        <button
          type="button"
          aria-label="Share article"
          className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-slate-100 hover:text-red-600 ${focusRing}`}
        >
          <Share2 size={13} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   SHARED ARTICLE SHELL
   One layout for every article template.
   - Header (kicker, title, dek, meta) is centred over the
     article column.
   - Desktop (lg+): article body on the left, 300px ad column
     on the right starting just below the heading. The ads
     are clipped to the height of the article body, so they
     never push into or overlap the related posts.
   - Tablet / mobile: single column; ads fall below the article.
   - Only ONE "Back to ..." button exists (the top bar). The
     bottom row holds just the share button.
   - Related posts keep their original card layout.
========================================================= */

function ArticleShell({
  backTo,
  backLabel,
  topRight,
  crumbs,
  kicker,
  title,
  dek,
  extra,
  meta,
  children,
  sidebar,
  adSlots = defaultSideAdSlots,
  share,
}: {
  backTo: string;
  backLabel: string;
  topRight?: ReactNode;
  /** Breadcrumb trail (Home › Section › Article). Replaces the back link when set. */
  crumbs?: { label: string; to?: string }[];
  kicker?: ReactNode;
  title: string;
  dek?: ReactNode;
  /** Optional line shown between the dek and the meta row. */
  extra?: ReactNode;
  meta: ReactNode;
  children: ReactNode;
  sidebar: ReactNode;
  /** Kept so existing call sites compile; related posts now live in the sidebar. */
  related?: ReactNode;
  /** AdSense slots for the banner under the header and the banner above the footer. */
  adSlots?: SideAdSlots;
  share: {
    title: string;
    description: string;
  };
}) {
  return (
    <article className="pt-magazine min-h-screen bg-white text-slate-900 antialiased">

      <style>{`
        .pt-magazine { background:#fff !important; color:#202124 !important; font-family:Arial,Helvetica,sans-serif !important; }
        .pt-magazine * { box-sizing:border-box; }
        .pt-magazine .max-w-6xl { max-width:1240px !important; padding-left:clamp(16px,3vw,42px) !important; padding-right:clamp(16px,3vw,42px) !important; }
        .pt-magazine > .border-b { background:#fff !important; border-color:#e4e7eb !important; }
        .pt-magazine nav[aria-label="Breadcrumb"] { font-size:10px !important; font-weight:500 !important; gap:7px !important; color:#7b8188 !important; }
        .pt-magazine nav[aria-label="Breadcrumb"] a { color:#777e86 !important; }
        .pt-magazine .max-w-6xl.pb-12 { padding-top:14px !important; }
        .pt-magazine header { max-width:none !important; }
        .pt-magazine header > div:first-child { color:#d71920 !important; font-size:9px !important; letter-spacing:.13em !important; line-height:1.5 !important; }
        .pt-magazine header > div:first-child + h1 { margin-top:8px !important; }
        .pt-magazine header h1 { font-family:Georgia,'Times New Roman',serif !important; font-size:clamp(30px,3.5vw,47px) !important; line-height:1.02 !important; font-weight:700 !important; letter-spacing:-.045em !important; color:#17191c !important; margin-left:0 !important; max-width:850px !important; }
        .pt-magazine header > p { margin-top:10px !important; color:#60656c !important; font-family:Georgia,'Times New Roman',serif !important; font-size:16px !important; line-height:1.42 !important; white-space:normal !important; overflow:visible !important; text-overflow:clip !important; }
        .pt-magazine header .border-y { border-color:#e4e7eb !important; margin-top:12px !important; padding:8px 0 !important; }
        .pt-magazine header .border-y button { border:1px solid #e2e5e8 !important; border-radius:50% !important; width:27px !important; height:27px !important; }
        .pt-magazine .pt-article-col { min-width:0; }
        .pt-magazine .blog-prose { max-width:none !important; margin-left:0 !important; margin-right:0 !important; }
        .pt-magazine .blog-prose strong { font-weight:600 !important; color:#17191c !important; }
        .pt-magazine .blog-prose { font-family:Georgia,'Times New Roman',serif !important; font-size:15px !important; line-height:1.55 !important; color:#30343a !important; }
        .pt-magazine .blog-prose section { border-bottom:1px solid #edf0f2 !important; padding:0 0 12px !important; margin:0 0 14px !important; }
        .pt-magazine .blog-prose h2 { font-family:Georgia,'Times New Roman',serif !important; font-size:21px !important; line-height:1.2 !important; color:#202124 !important; margin:22px 0 9px !important; }
        .pt-magazine .blog-prose p { font-family:Georgia,'Times New Roman',serif !important; font-size:15px !important; line-height:1.48 !important; margin:0 0 14px !important; color:#34383d !important; }
        .pt-magazine .blog-prose .drop-cap:first-letter { float:left; font-family:Georgia,'Times New Roman',serif; font-size:62px; line-height:.78; padding:5px 8px 0 0; color:#ed1c24; }
        .pt-magazine aside .rounded-xl { border-radius:0 !important; box-shadow:none !important; border-color:#e3e7eb !important; }
        .pt-magazine aside img { border-radius:0 !important; }
        .pt-magazine aside h2 { font-family:Georgia,'Times New Roman',serif !important; font-size:18px !important; }
        .pt-magazine aside ul li { padding-top:14px !important; padding-bottom:14px !important; }
        .pt-magazine aside ul h3 { font-family:Georgia,'Times New Roman',serif !important; font-size:15px !important; line-height:1.25 !important; }
        .pt-magazine aside .adsbygoogle { border-radius:0 !important; }
        .pt-magazine aside section[aria-label="Related articles"] { margin:0 !important; }
        .pt-magazine aside section[aria-label="Related articles"] > div { margin-bottom:8px !important; padding-bottom:7px !important; border-bottom:1px solid #dfe3e7 !important; }
        .pt-magazine aside section[aria-label="Related articles"] h2 { font-family:Georgia,'Times New Roman',serif !important; font-size:18px !important; line-height:1.15 !important; }
        .pt-magazine aside section[aria-label="Related articles"] ul { margin:0 !important; }
        .pt-magazine aside section[aria-label="Related articles"] ul li { padding:14px 0 !important; }
        .pt-magazine aside section[aria-label="Related articles"] ul li:first-child { padding-top:0 !important; }
        .pt-magazine aside section[aria-label="Related articles"] ul li:last-child { padding-bottom:0 !important; }
        .pt-magazine aside section[aria-label="Related articles"] ul h3 { font-family:Georgia,'Times New Roman',serif !important; font-size:15px !important; line-height:1.25 !important; }
        .pt-magazine aside section[aria-label="Related articles"] ul p { margin:0 !important; }
        .pt-magazine blockquote { border-radius:0 !important; background:#f7f8f9 !important; }
        .pt-magazine .mt-6.border-t { margin-top:24px !important; border-color:#e3e7eb !important; }
        .pt-magazine .mt-6.border-t > p { font-size:9px !important; letter-spacing:.14em !important; }
        .pt-magazine .mt-6.border-t > h2 { font-family:Georgia,'Times New Roman',serif !important; font-size:24px !important; }
        .pt-magazine .mt-5.grid > a { border-radius:0 !important; box-shadow:none !important; padding:16px !important; }
        .pt-magazine .mt-8.flex.flex-wrap.items-center.justify-between { border-color:#e3e7eb !important; border-radius:0 !important; }
        @media (min-width:1024px) {
          .pt-magazine .max-w-6xl.pb-12 { padding-top:12px !important; }
          .pt-magazine .pt-article-grid { display:grid !important; grid-template-columns:minmax(0,1fr) 320px !important; gap:40px !important; align-items:start !important; }
          .pt-magazine main { max-width:none !important; }
          .pt-magazine aside { margin-top:0 !important; position:sticky !important; top:88px !important; }
        }
        @media (max-width:767px) {
          .pt-magazine header h1 { font-size:31px !important; line-height:1.04 !important; }
          .pt-magazine header > p { font-size:15px !important; }
          .pt-magazine .blog-prose p { font-size:16px !important; line-height:1.55 !important; }
          .pt-magazine .max-w-6xl.pb-12 { padding-bottom:28px !important; }
        }
      `}</style>

      <div className="border-b border-slate-200 bg-slate-50/70">
        <div
          className={`${pageClass} flex flex-wrap items-center justify-between gap-3 py-3`}
        >
          {crumbs ? (
            <nav
              aria-label="Breadcrumb"
              className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500"
            >
              {crumbs.map((crumb, index) => (
                <Fragment key={`${index}-${crumb.label}`}>
                  {index > 0 && (
                    <span aria-hidden="true" className="text-slate-300">
                      ›
                    </span>
                  )}
                  {crumb.to ? (
                    <Link
                      to={crumb.to}
                      className={`rounded-sm transition-colors duration-200 hover:text-red-600 ${focusRing}`}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="min-w-0 truncate text-slate-700">
                      {crumb.label}
                    </span>
                  )}
                </Fragment>
              ))}
            </nav>
          ) : (
            <Link
              to={backTo}
              className={`group inline-flex items-center gap-2 rounded-sm text-xs font-semibold text-slate-500 transition-colors duration-200 hover:text-red-600 ${focusRing}`}
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
              Back to {backLabel}
            </Link>
          )}

          {topRight}
        </div>
      </div>

      <div className={`${pageClass} pb-8 pt-4 sm:pt-5`}>
        {/* Ad 1: just below the header bar, above the article */}
        <AdSenseUnit slot={adSlots.top} />

        {/* One column for header + body (same left edge), related news beside it */}
        <div className="pt-article-grid mt-2 lg:mt-4">
          <div className="pt-article-col">
            <header className="w-full text-left">
              {kicker && (
                <div className="flex flex-wrap items-center justify-start gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
                  {kicker}
                </div>
              )}

              <h1 className={`${kicker ? "mt-3" : "mt-0"} break-words font-serif text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-slate-950 sm:text-3xl md:text-[34px]`}>
                {title}
              </h1>

              {/* Dek: wraps on mobile, one line on desktop (cut with "..." if too long). */}
              {dek && (
                <p className="mt-3 break-words text-base leading-7 text-slate-600 sm:truncate sm:whitespace-nowrap sm:text-lg">
                  {dek}
                </p>
              )}

              {extra}

              {meta}
            </header>

            <main className="mt-8 w-full min-w-0">
              {children}

              <ShareRow
                title={share.title}
                description={share.description}
              />
            </main>
          </div>

          {/* Related news with images */}
          <aside className="mt-8 w-full lg:mt-0">{sidebar}</aside>
        </div>

        {/* Ad 2: bottom of the page, above the footer (no extra gap above it) */}
        <div className="mt-4 [&>div]:!my-0">
          <AdSenseUnit slot={adSlots.bottom} />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   BLOG BODY
   Text styling lives in src/styles/article.css (.blog-prose).
   The dek is shown once, in the header, so it is not repeated here.
========================================================= */

/* Make the important words in a paragraph a little bolder:
   key figures, names (people, companies, places) and strong news words.
   Each term is bolded once per paragraph, at most MAX_BOLD per paragraph. */
const MAX_BOLD = 7;

const EMPHASIS_RE = new RegExp(
  [
    // money, percentages, big numbers
    String.raw`[$€£₹]\s?\d[\d,.]*(?:\s?(?:trillion|billion|million|crore|lakh|bn|m|k)\b)?`,
    String.raw`\b\d[\d,.]*\s?(?:%|percent\b|trillion\b|billion\b|million\b|crore\b|lakh\b)`,
    // names: two or more capitalised words (Bank of America, Tim Cook)
    String.raw`\b[A-Z][a-zA-Z&'’-]+(?:\s+(?:of\s+)?[A-Z][a-zA-Z&'’-]+)+`,
    // single capitalised word (Nvidia, India) - skipped at sentence start
    String.raw`\b[A-Z][a-z]{2,}\b`,
    // strong news words
    String.raw`\b(?:record(?:-high|-low)?|unprecedented|largest|biggest|first-ever|surged?|plunged?|soared?|slumped?|acquisitions?|mergers?|breakthrough|crisis|layoffs?)\b`,
  ].join("|"),
  "g"
);

const SKIP_WORDS = new Set([
  "The", "This", "That", "These", "Those", "There", "They", "Their", "However",
  "While", "When", "With", "Within", "Meanwhile", "Still", "Even", "Many", "Some",
  "Most", "Such", "Another", "Several", "Each", "Both", "Over", "Across", "After",
  "Before", "During", "For", "From", "Into", "Its", "And", "But", "Yet", "Also",
]);

function emphasize(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const seen = new Set<string>();
  let last = 0;
  let count = 0;

  for (const m of text.matchAll(EMPHASIS_RE)) {
    let term = m[0];
    let start = m.index ?? 0;

    // drop a leading "The " etc. from a multi-word name
    const first = term.split(/\s+/)[0];
    if (SKIP_WORDS.has(first)) {
      const rest = term.slice(first.length).trimStart();
      if (!rest) continue;
      start += term.length - rest.length;
      term = rest;
    }

    const before = text.slice(0, start).trimEnd();
    const atSentenceStart = before === "" || /[.!?:]["”’)]?$/.test(before);
    const isSingleCapital = /^[A-Z][a-z]+$/.test(term);
    if (isSingleCapital && atSentenceStart) continue;

    const key = term.toLowerCase();
    if (seen.has(key) || count >= MAX_BOLD || start < last) continue;

    seen.add(key);
    count += 1;
    if (start > last) out.push(text.slice(last, start));
    out.push(<strong key={start}>{term}</strong>);
    last = start + term.length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

function BlogBody({
  sections,
  category,
}: {
  sections: BlogSection[];
  category: string;
  /** Kept for compatibility; the dek is already shown in the header. */
  intro?: string;
}) {
  return (
    <div className="blog-prose">
      {sections.map((section, index) => (
        <section
          key={`${section.heading}-${index}`}
          className="scroll-mt-24"
        >
          <h2 className="break-words">
            {formatSectionHeading(section.heading, category)}
          </h2>

          <p className={`break-words${index === 0 ? " drop-cap" : ""}`}>
            {emphasize(section.body)}
          </p>
        </section>
      ))}
    </div>
  );
}

/* =========================================================
   INLINE PULL QUOTE (inside the main article)
========================================================= */

function ArticleQuote({ text, by }: { text: string; by: string }) {
  return (
    <blockquote className="my-7 rounded-r-xl border-l-4 border-red-600 bg-slate-50 px-5 py-4 not-italic">
      <Quote size={16} className="mb-1.5 text-red-600" />

      <p className="font-serif text-lg font-semibold leading-7 text-slate-900 sm:text-xl sm:leading-8">
        &ldquo;{text}&rdquo;
      </p>

      <footer className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
        {by}
      </footer>
    </blockquote>
  );
}

/* =========================================================
   ARTICLE SIDEBAR (ads)
   Desktop: two ads stacked, splitting the article's height.
   Tablet: side by side below the article. Mobile: stacked.
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
  adSlots = defaultSideAdSlots,
  relatedItems,
}: {
  /* Kept optional so existing call sites still compile; the sidebar
     now only holds ads. */
  highlights?: string[];
  category?: string;
  section?: string;
  facts?: { label: string; value: string }[];
  quote?: { text: string; by: string };
  adSlots?: SideAdSlots;
  relatedItems?: {
    title: string;
    category: string;
    image?: string;
    href: string;
    date: string;
  }[];
}) {
  if (relatedItems?.length) {
    return (
      <section aria-label="Related articles">
        <div className="mb-4 flex items-center gap-2">
          <span aria-hidden="true" className="h-4 w-1 bg-red-600" />
          <h2 className="font-serif text-lg font-bold text-slate-950">
            Related News
          </h2>
        </div>

        <ul className="divide-y divide-slate-200">
          {relatedItems.map((item) => (
            <li key={item.href} className="py-3 first:pt-0">
              <Link
                to={item.href}
                className={`group block rounded-sm ${focusRing}`}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="mb-2.5 aspect-[16/9] w-full object-cover"
                  />
                )}

                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-red-600">
                  {item.category}
                </p>
                <h3 className="mt-1 break-words font-serif text-[15px] font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-red-700">
                  {item.title}
                </h3>
                <p className="mt-1 text-[10px] text-slate-400">
                  {formatIsoDate(item.date)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:h-full lg:grid-cols-1 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] lg:justify-items-stretch">
      <AdSenseUnit slot={adSlots.top} side />
      <AdSenseUnit slot={adSlots.bottom} side />
    </div>
  );
}

/* =========================================================
   SHARE ROW
   The extra "Back to ..." button was removed: the top bar
   already has one. Only the share button remains.
========================================================= */

function ShareRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-slate-200 py-4">
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

      <div className="flex items-center gap-1 text-slate-500">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 hover:bg-slate-100 hover:text-red-600 ${focusRing}`}
        >
          X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 hover:bg-slate-100 hover:text-red-600 ${focusRing}`}
        >
          in
        </a>
        <button
          type="button"
          aria-label="Copy link"
          onClick={() => navigator.clipboard?.writeText(window.location.href)}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-slate-100 hover:text-red-600 ${focusRing}`}
        >
          <Link2 size={14} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   RELATED POSTS
   Original card layout: boxed cards in a responsive grid.
   Top spacing is kept tight so it follows the article directly.
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
    <section className="mt-6 border-t border-slate-200 pt-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
        Keep exploring
      </p>

      <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
        More ideas to explore
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
   KICKER HELPERS
========================================================= */

function BlogKicker({ category }: { category: string }) {
  return (
    <>
      <span>The Pride Times Blog</span>
      <span className="text-slate-300">/</span>
      <span>{category}</span>
    </>
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
    <ArticleShell
      backTo={sectionPath}
      backLabel={sectionName}
      kicker={<BlogKicker category={article.category} />}
      title={title}
      dek={article.dek}
      meta={
        <BlogMeta
          author={article.author}
          date={article.publishedAt}
          updatedAt={(article as { updatedAt?: string }).updatedAt}
          readTime={estimateReadTime(
            article.dek,
            ...article.sections.map((x) => x.heading + " " + x.body)
          )}
        />
      }
      share={{
        title,
        description: article.dek,
      }}
      sidebar={
        <BlogSidebar
          highlights={article.highlights}
          category={article.category}
          section={article.section}
          facts={article.keyFacts}
          relatedItems={related.map((item) => ({
            title: item.title,
            category: item.category,
            image: (item as { image?: string }).image,
            href: specialArticlePath(item.id),
            date: item.publishedAt,
          }))}
        />
      }
      related={
        <RelatedPosts
          items={related}
          getHref={(item) => specialArticlePath(item.id)}
        />
      }
    >
      <BlogBody
        sections={article.sections}
        category={article.category}
      />
    </ArticleShell>
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
    <ArticleShell
      backTo="/"
      backLabel="Home"
      adSlots={{
        top: isExpandedAdCategory ? "5608262547" : "5373718974",
        bottom: isExpandedAdCategory ? "6810700989" : "8042854193",
      }}
      kicker={<BlogKicker category={article.category} />}
      title={title}
      dek={article.dek}
      meta={
        <BlogMeta
          author={article.author}
          date={article.publishedAt}
          updatedAt={(article as { updatedAt?: string }).updatedAt}
          readTime={estimateReadTime(
            article.dek,
            ...article.sections.map((x) => x.heading + " " + x.body)
          )}
        />
      }
      share={{
        title,
        description: article.dek,
      }}
      sidebar={
        <BlogSidebar
          highlights={article.highlights}
          category={article.category}
          section={article.category}
          adSlots={{
            top: isExpandedAdCategory ? "5608262547" : "5373718974",
            bottom: isExpandedAdCategory ? "6810700989" : "8042854193",
          }}
          relatedItems={related.map((item) => ({
            title: item.title,
            category: item.category,
            image: item.image,
            href: articlePath(item.title),
            date: item.publishedAt,
          }))}
        />
      }
      related={
        <RelatedPosts
          items={related}
          getHref={(item) => articlePath(item.title)}
        />
      }
    >
      <BlogBody
        sections={article.sections}
        category={article.category}
      />
    </ArticleShell>
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
    <ArticleShell
      backTo="/"
      backLabel="Home"
      crumbs={[
        { label: "Home", to: "/" },
        { label: digest.sectionName, to: digest.sectionPath },
        { label: article.title },
      ]}
      topRight={
        <Link
          to={digest.sectionPath}
          className={`rounded-sm text-xs font-semibold text-slate-500 transition-colors duration-200 hover:text-red-600 ${focusRing}`}
        >
          More in {digest.sectionName}
        </Link>
      }
      title={article.title}
      dek={
        <span className="font-medium text-slate-700">{digest.lede}</span>
      }
      meta={
        <BlogMeta
          location={digest.location}
          author={article.author}
          date={article.publishedAt}
          updatedAt={(article as { updatedAt?: string }).updatedAt}
          readTime={estimateReadTime(
            article.dek,
            ...article.sections.map((x) => x.heading + " " + x.body)
          )}
        />
      }
      share={{
        title: article.title,
        description: digest.lede,
      }}
      sidebar={
        <BlogSidebar
          highlights={article.highlights}
          category={article.category}
          section={article.category}
          facts={digest.keyFacts}
          quote={digest.quote}
          relatedItems={related.map((item) => ({
            title: item.title,
            category: item.category,
            image: item.image,
            href: `/article/${item.slug}`,
            date: item.publishedAt,
          }))}
        />
      }
      related={
        <RelatedPosts
          items={related}
          plainTitles
          getHref={(item) => `/article/${item.slug}`}
        />
      }
    >
      <div className="blog-prose">
        {digest.body.map((paragraph, index) => (
          <Fragment key={`${index}-${paragraph.slice(0, 24)}`}>
            <p className={`break-words${index === 0 ? " drop-cap" : ""}`}>
              {emphasize(paragraph)}
            </p>

            {digest.quote && index === digest.quoteAfter && (
              <ArticleQuote
                text={digest.quote.text}
                by={digest.quote.by}
              />
            )}
          </Fragment>
        ))}
      </div>
    </ArticleShell>
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
    : (article as TechnologyArticle).publishedAt;

  const updatedAt = (article as { updatedAt?: string }).updatedAt;

  const readTime = estimateReadTime(
    dek,
    ...article.sections.map((x) => x.heading + " " + x.body)
  );

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
    <ArticleShell
      backTo={backTo}
      backLabel={sectionLabel}
      kicker={<BlogKicker category={article.category} />}
      title={title}
      dek={dek || undefined}
      meta={
        <BlogMeta
          author={article.author}
          date={dateLabel}
          updatedAt={updatedAt}
          readTime={readTime}
        />
      }
      share={{
        title,
        description: dek,
      }}
      sidebar={
        <BlogSidebar
          highlights={article.highlights}
          category={article.category}
          section={sectionLabel}
          facts={keyFacts}
          relatedItems={related.map((story) => ({
            title: story.title,
            category: story.category,
            image: (story as { image?: string }).image,
            href: relatedPath(story),
            date: "time" in story ? story.time : story.publishedAt,
          }))}
        />
      }
      related={
        <RelatedPosts
          items={related}
          getHref={relatedPath}
        />
      }
    >
      <BlogBody
        sections={article.sections}
        category={article.category}
      />
    </ArticleShell>
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

  /* Keyed by article ID so every new article fully remounts,
     including its ad slots. */
  return <Fragment key={id}>{renderArticle(id)}</Fragment>;
}

function renderArticle(id: string | undefined): ReactNode {
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
