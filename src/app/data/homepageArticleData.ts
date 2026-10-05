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

function toHomepageArticle(article: DigestArticle): HomepageArticle {
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
    tags: [article.section, "Global Corporate News Digest", "The Pride Times"],
    editorNote:
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

export const homepageArticles: HomepageArticle[] = digestArticles.map(toHomepageArticle);

export function getHomepageArticleBySlug(slug?: string) {
  return homepageArticles.find((article) => article.slug === slug);
}
