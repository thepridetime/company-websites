import { useState } from "react";
import { Link } from "react-router";
import { Clock, Bookmark, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { StartupStory } from "../../data/startupData";

export interface StartupStoryListProps {
  stories?: StartupStory[];
  title?: string;
  viewMoreUrl?: string;
  className?: string;
}

export function StartupStoryList({
  stories = [],
  title = "TOP STARTUP STORIES",
  viewMoreUrl = "/technology",
  className = "",
}: StartupStoryListProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!stories || stories.length === 0) {
    return (
      <div className={`pt-6 pb-4 border-b border-gray-200 ${className}`}>
        <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-red-600">
            {title}
          </h2>
        </div>
        <p className="text-[11px] text-gray-400 py-4 text-center">
          No stories available in this category.
        </p>
      </div>
    );
  }

  return (
    <section className={`pt-6 ${className}`}>
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-red-600">
          {title}
        </h2>

        {viewMoreUrl && (
          <Link
            to={viewMoreUrl}
            className="group flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
          >
            <span>View More</span>
            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* STORY ROWS */}
      <div className="divide-y divide-gray-100">
        {stories.map((story) => {
          const isSaved = !!bookmarkedIds[story.id];
          const destination = story.url || `/article/${story.id}`;

          return (
            <Link
              key={story.id}
              to={destination}
              className="group block py-3.5 sm:py-4 transition-colors"
            >
              <div className="flex gap-3.5 sm:gap-4 items-start">
                {/* THUMBNAIL */}
                <div className="w-[115px] h-[82px] sm:w-[135px] sm:h-[92px] shrink-0 overflow-hidden rounded-none border border-gray-200/70 bg-gray-100">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    priority={true}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className="min-w-0 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-red-600 mb-1">
                      {story.category}
                    </span>

                    <h3 className="font-serif text-[16px] sm:text-[18px] font-bold leading-[1.25] text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                      {story.title}
                    </h3>

                    <p className="mt-1 text-[13px] leading-[1.5] text-gray-500 line-clamp-2 hidden sm:block">
                      {story.summary}
                    </p>
                  </div>

                  {/* METADATA & BOOKMARK */}
                  <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={10} className="text-gray-400" />
                      {story.publishedAt} · {story.readTime}
                    </span>

                    <button
                      type="button"
                      aria-label="Bookmark story"
                      onClick={(e) => toggleBookmark(e, story.id)}
                      className="p-1 hover:text-gray-700 transition-colors"
                    >
                      <Bookmark
                        size={12}
                        className={isSaved ? "fill-red-600 text-red-600" : "text-gray-400 hover:text-gray-700"}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default StartupStoryList;
