/* =========================================================
   HOMEPAGE ARTICLES
   THE PRIDE TIMES

   All homepage stories now come from the Global Corporate News
   Digest (see digestArticleData.ts). This module keeps the
   original HomepageArticle API so /article/:slug keeps working.
========================================================= */

import {
  articleSlug,
  digestArticles,
  type DigestArticle,
  type DigestKeyFact,
} from "./digestArticleData";
import { maEdition1Articles, type EditionArticle } from "./maEdition1Data";
import { octEditionArticles, type OctEditionArticle } from "./octEditionData";
import {
  globalSectorReport,
  globalSectorItems,
  globalSectorArticleId,
} from "./globalSectorReportData";

export { articleSlug };

export type HomepageArticleDigest = {
  sectionName: string;
  sectionPath: string;
  location: string;
  lede: string;
  body: string[];
  quote: { text: string; by: string };
  quoteAfter: number;
  keyFacts: DigestKeyFact[];
};

export type HomepageArticle = {
  slug: string;
  title: string;
  category: string;
  dek: string;
  image: string;
  author: string;
  publishedAt: string;
  readTime: string;
  highlights: string[];
  tags: string[];
  editorNote: string;
  sections: { heading: string; body: string }[];
  /* Present for every Global Corporate News Digest article. */
  digest?: HomepageArticleDigest;
};

export function articlePath(title: string) {
  return `/article/${articleSlug(title)}`;
}

function toHomepageArticle(
  article: DigestArticle | EditionArticle | OctEditionArticle,
  collection = "Global Corporate News Digest"
): HomepageArticle {
  return {
    slug: article.id,
    title: article.title,
    category: article.section,
    dek: article.lede,
    image: article.image,
    author: article.author,
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    highlights: article.highlights,
    tags: [article.section, collection, "The Pride Times"],
    editorNote:
      ("editorNote" in article && article.editorNote) ||
      "Sample publication — all companies, people, quotations and figures are fictional and for layout and demonstration purposes only.",
    sections: article.body.map((body, index) => ({
      heading: `Paragraph ${index + 1}`,
      body,
    })),
    digest: {
      sectionName: article.section,
      sectionPath: article.sectionPath,
      location: article.location,
      lede: article.lede,
      body: article.body,
      quote: article.quote,
      quoteAfter: article.quoteAfter,
      keyFacts: article.keyFacts,
    },
  };
}

/* Global Sector News Report 2026 — inner article opened by the
   homepage lead story. Built from globalSectorReportData.ts. */
const globalSectorBody: string[] = [
  globalSectorReport.pattern,
  ...globalSectorItems.map(
    (item) =>
      `${item.sector}: ${item.headline}. ${item.signal}. ${item.verdict}. Bottleneck: ${item.bottleneck}.`
  ),
];

const globalSectorArticle: HomepageArticle = {
  slug: globalSectorArticleId,
  title: globalSectorReport.headline,
  category: globalSectorReport.kicker,
  dek: globalSectorReport.subheadline,
  image: globalSectorReport.image,
  author: "The Pride Times",
  publishedAt: "2026",
  readTime: "4 min read",
  highlights: globalSectorItems.map((item) => `${item.sector}: ${item.verdict}`),
  tags: [globalSectorReport.kicker, "The Pride Times"],
  editorNote:
    "Source: Global Sector News Report 2026. Figures are quoted from the report.",
  sections: globalSectorBody.map((body, index) => ({
    heading: `Paragraph ${index + 1}`,
    body,
  })),
  digest: {
    sectionName: globalSectorReport.kicker,
    sectionPath: "/business-news",
    location: globalSectorReport.location,
    lede: globalSectorReport.subheadline,
    body: globalSectorBody,
    quote: {
      text: globalSectorReport.subheadline,
      by: globalSectorReport.kicker,
    },
    quoteAfter: -1,
    keyFacts: globalSectorReport.stats.map((stat) => ({
      label: stat.label,
      value: stat.value,
    })),
  },
};

/* Newest edition first (Global Industry Edition, 7 October 2026), then
   the existing September digest (unchanged), Edition 1 (M&A), and the
   Global Sector News Report 2026 article. */
export const homepageArticles: HomepageArticle[] = [
  ...octEditionArticles.map((article) =>
    toHomepageArticle(article, "Global Industry Edition")
  ),
  ...[...digestArticles, ...maEdition1Articles].map((article) =>
    toHomepageArticle(article)
  ),
  globalSectorArticle,
];

export function getHomepageArticleBySlug(slug?: string) {
  return homepageArticles.find((article) => article.slug === slug);
}
