import { Link } from "react-router";
import { ArrowRight, Bookmark, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  defaultTopInnovationStories,
  type InnovationStory,
} from "../../data/innovationData";

export interface TopInnovationStoriesProps {
  stories?: InnovationStory[];
  className?: string;
}

export function TopInnovationStories({
  stories = defaultTopInnovationStories,
  className = "",
}: TopInnovationStoriesProps) {
  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
        <h3 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-red-600">
          Top Innovation Stories
        </h3>
        <Link
          to="/technology"
          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-red-600 hover:text-red-700 transition-colors"
        >
          <span>View More</span>
          <ArrowRight size={11} />
        </Link>
      </div>

      {/* Story list */}
      <div className="flex flex-col divide-y divide-gray-100">
        {stories.map((story) => {
          const storyUrl =
            story.url || `/article/${story.id || "innovation-breakthrough"}`;
          const categoryString = story.location
            ? `${story.category} | ${story.location}`
            : story.category;

          return (
            <article key={story.id} className="py-3.5 first:pt-0 last:pb-1 group">
              <div className="flex gap-4">
                {/* Thumbnail */}
                <Link
                  to={storyUrl}
                  className="shrink-0 w-[112px] sm:w-[124px] h-[80px] sm:h-[88px] overflow-hidden rounded-none border border-gray-200/70 bg-gray-100 block"
                >
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-none transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Content */}
                <div className="min-w-0 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-red-600 truncate mb-1">
                      {categoryString}
                    </span>
                    <Link to={storyUrl} className="block">
                      <h4 className="font-serif text-[15.5px] sm:text-[16.5px] lg:text-[17.5px] font-bold leading-[1.25] text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2">
                        {story.title}
                      </h4>
                    </Link>
                    {story.summary && (
                      <p className="mt-1 text-[12.5px] sm:text-[13px] leading-[1.48] text-gray-500 line-clamp-2">
                        {story.summary}
                      </p>
                    )}
                  </div>

                  {/* Metadata & Bookmark */}
                  <div className="flex items-center justify-between mt-2 pt-0.5 text-[11px] text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} className="text-gray-400" />
                      <span>
                        {story.publishedAt} · {story.readTime}
                      </span>
                    </span>
                    <button
                      type="button"
                      aria-label="Bookmark story"
                      className="text-gray-400 hover:text-gray-700 transition-colors p-0.5"
                    >
                      <Bookmark size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default TopInnovationStories;
