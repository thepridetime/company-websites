import { useState } from "react";
import { Link } from "react-router";
import { Clock, Bookmark, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { StartupStory } from "../../data/startupData";

export interface StartupWatchProps {
  story?: StartupStory | null;
  exploreUrl?: string;
  className?: string;
}

export function StartupWatch({
  story,
  exploreUrl = "/technology",
  className = "",
}: StartupWatchProps) {
  const [isSaved, setIsSaved] = useState(false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  if (!story) {
    return null;
  }

  const destination = story.url || `/article/${story.id}`;

  return (
    <div className={`pb-5 border-b border-gray-200 ${className}`}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-[20px] sm:text-[22px] font-bold text-gray-900 leading-tight">
          Startup Watch
        </h2>

        {exploreUrl && (
          <Link
            to={exploreUrl}
            className="group inline-flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-[10px] font-medium text-gray-700 hover:border-black hover:text-black transition-colors"
          >
            <span>Explore More</span>
            <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* STORY CARD */}
      <Link to={destination} className="group block">
        {/* IMAGE */}
        <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden rounded-none border border-gray-200/80 bg-gray-100 mb-3">
          <ImageWithFallback
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* CATEGORY */}
        <span className="block text-[10px] font-bold text-red-600 uppercase tracking-[0.14em] mb-1">
          {story.category}
        </span>

        {/* HEADLINE */}
        <h3 className="font-serif text-[17px] sm:text-[19px] font-bold leading-[1.28] text-gray-900 group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        {/* SUMMARY */}
        <p className="mt-1.5 text-[13px] leading-[1.55] text-gray-500 line-clamp-3">
          {story.summary}
        </p>

        {/* METADATA & BOOKMARK */}
        <div className="mt-2.5 flex items-center justify-between text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={10} className="text-gray-400" />
            {story.publishedAt} · {story.readTime}
          </span>

          <button
            type="button"
            aria-label="Bookmark story"
            onClick={toggleBookmark}
            className="p-1 hover:text-gray-700 transition-colors"
          >
            <Bookmark
              size={12}
              className={isSaved ? "fill-red-600 text-red-600" : "text-gray-400 hover:text-gray-700"}
            />
          </button>
        </div>
      </Link>
    </div>
  );
}

export default StartupWatch;
