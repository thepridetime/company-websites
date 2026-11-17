import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Clock, Share2, Bookmark, Check, Calendar } from "lucide-react";
import { EditorialArticle, fetchArticleBySlug } from "../../../lib/editorialApi";
import { ReadTracker } from "./ReadTracker";
import { SaveArticleButton } from "./SaveArticleButton";
import { PrideTimesAd } from "../AdSenseSlots";
import { ArticleFeedback } from "../feedback/ArticleFeedback";

export function DynamicArticlePage() {
  const { section, slug } = useParams<{ section: string; slug: string }>();
  const [article, setArticle] = useState<EditorialArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchArticleBySlug(slug).then((res) => {
      setArticle(res);
      setLoading(false);
    });
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#dc2626] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Loading dispatch...
          </p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-3">
          Story Not Found
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
          The requested dispatch could not be located or may have been archived.
        </p>
        <Link
          to={section ? `/${section}` : "/"}
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#dc2626] text-white px-4 py-2 rounded-xs hover:bg-red-700 transition-colors"
        >
          <ArrowLeft size={14} /> Back to {section ? section.toUpperCase() : "Home"}
        </Link>
      </div>
    );
  }

  const paragraphs = article.content.split(/\n\n+/).filter(Boolean);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans pb-20">
      <ReadTracker title={article.title} category={article.section_slug} />

      {/* Top Breadcrumb Header */}
      <div className="border-b border-gray-200 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between text-xs">
          <Link
            to={`/${article.section_slug}`}
            className="text-gray-500 hover:text-[#dc2626] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={13} /> {article.section_slug.replace("-", " ").toUpperCase()}
          </Link>
          <div className="flex items-center gap-3">
            <SaveArticleButton title={article.title} category={article.section_slug} />
            <button
              type="button"
              onClick={handleShare}
              className="text-gray-500 hover:text-black flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? <Check size={13} className="text-green-600" /> : <Share2 size={13} />}
              <span className="text-[11px]">{copied ? "Copied" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 pt-8">
        {/* Kicker badge */}
        <div className="mb-3">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-[#dc2626]">
            {article.kicker}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.15] tracking-tight text-gray-950 mb-4">
          {article.title}
        </h1>

        {/* Subheadline / Lede */}
        {article.subheadline && (
          <p className="font-serif text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 font-normal">
            {article.subheadline}
          </p>
        )}

        {/* Byline & Metadata row */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 py-3.5 border-y border-gray-200 text-xs text-gray-500 mb-8">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">{article.author_name}</span>
            <span>•</span>
            <span>{article.author_title}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(article.published_at).toLocaleDateString("en-US", {
                dateStyle: "medium",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {article.read_time}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        {article.hero_image_url && (
          <div className="mb-8">
            <div className="aspect-[16/9] overflow-hidden rounded-xs bg-gray-100">
              <img
                src={article.hero_image_url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            {(article.image_caption || article.image_credit) && (
              <p className="mt-2 text-[11px] text-gray-500 flex flex-wrap justify-between gap-2 border-b border-gray-100 pb-2">
                <span>{article.image_caption}</span>
                <span className="italic">{article.image_credit}</span>
              </p>
            )}
          </div>
        )}

        {/* Key Figures Callout Box */}
        {article.key_figures && article.key_figures.length > 0 && (
          <aside className="my-8 p-5 bg-[#faf9f6] border-t-2 border-b-2 border-black">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-900 mb-3">
              Key Figures & Editorial Context
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {article.key_figures.map((kf, i) => (
                <div key={i} className="border-l border-gray-300 pl-3">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 block">
                    {kf.label}
                  </span>
                  <span className="font-serif text-lg font-bold text-gray-950 mt-0.5 block">
                    {kf.value}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none font-serif text-base sm:text-[18px] leading-[1.8] text-gray-800 space-y-6">
          {paragraphs.map((p, idx) => {
            if (p.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className="font-serif font-bold text-2xl text-gray-950 mt-8 mb-3"
                >
                  {p.replace(/^##\s+/, "")}
                </h2>
              );
            }
            if (p.startsWith("> ")) {
              return (
                <blockquote
                  key={idx}
                  className="border-l-3 border-[#dc2626] pl-5 italic text-xl font-serif text-gray-900 my-6"
                >
                  {p.replace(/^>\s+/, "")}
                </blockquote>
              );
            }
            return <p key={idx}>{p}</p>;
          })}
        </div>

        {/* In-article Ad slot */}
        <div className="my-10">
          <PrideTimesAd variant="second" />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Filed Under
            </span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-black hover:text-white rounded-xs transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reader Feedback & Editorial Standards */}
        <ArticleFeedback
          articleTitle={article.title}
          articleSlug={article.slug}
        />
      </article>
    </main>
  );
}

export default DynamicArticlePage;

