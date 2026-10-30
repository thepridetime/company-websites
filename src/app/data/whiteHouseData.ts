import { specialArticles, specialArticlePath } from "./specialArticleData";
import WhiteHouseFallbackImg from "../../imports/Insightimage.png";

export type WhiteHouseKeyFact = {
  label: string;
  value: string;
};

export type WhiteHouseStory = {
  id: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  href: string;
  publishedAt: string;
  readTime: string;
  keyFacts: WhiteHouseKeyFact[];
};

export const whiteHouseStories: WhiteHouseStory[] = specialArticles
  .filter(
    (article) =>
      article.section === "White House Watch" &&
      article.category === "WHITE HOUSE WATCH"
  )
  .map((article) => ({
    id: article.id,
    title: article.title,
    summary: article.dek,
    category: article.category,
    image: article.image ?? WhiteHouseFallbackImg,
    href: specialArticlePath(article.id),
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    keyFacts: article.keyFacts,
  }));

export const whiteHouseFeatured: WhiteHouseStory | null =
  whiteHouseStories[0] ?? null;

export const whiteHouseOtherStories: WhiteHouseStory[] =
  whiteHouseStories.slice(1);

export const whiteHouseLatestNews: WhiteHouseStory[] =
  whiteHouseStories.slice(0, 4);
