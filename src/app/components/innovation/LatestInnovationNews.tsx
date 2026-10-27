import { Link } from "react-router";
import { ArrowRight, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  defaultLatestInnovationNews,
  type InnovationStory,
} from "../../data/innovationData";

export interface LatestInnovationNewsProps {
  stories?: InnovationStory[];
  className?: string;
}

export function LatestInnovationNews({
  stories = defaultLatestInnovationNews,
  className = "",
}: LatestInnovationNewsProps) {
  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <div className={`mt-6 pt-5 border-t border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
        <h3 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-red-600">
          Latest in Innovation
        </h3>
        <Link
          to="/energy"
          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-red-600 hover:text-red-700 transition-colors"
        >
          <span>View All</span>
          <ArrowRight size={11} />
        </Link>
      </div>

      {/* Stories list */}
      <div className="divide-y divide-gray-100">
        {stories.map((story) => {
          const storyUrl =
            story.url || `/article/${story.id || "innovation-breakthrough"}`;

          return (
            <article key={story.id} className="py-3 first:pt-0 last:pb-0 group">
              <div className="flex gap-3.5">
                {/* Thumbnail */}
                <Link
                  to={storyUrl}
                  className="shrink-0 w-[95px] sm:w-[102px] h-[68px] sm:h-[72px] overflow-hidden rounded-none border border-gray-200/70 bg-gray-100 block"
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
                    <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-red-600 truncate mb-0.5">
                      {story.category}
                    </span>
                    <Link to={storyUrl} className="block">
                      <h4 className="font-serif text-[13px] sm:text-[14px] font-bold leading-[1.3] text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2">
                        {story.title}
                      </h4>
                    </Link>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                    <Clock size={10} />
                    <span>
                      {story.publishedAt} · {story.readTime}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default LatestInnovationNews;
