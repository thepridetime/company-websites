import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  defaultFeaturedInnovation,
  type InnovationFeaturedStoryData,
} from "../../data/innovationData";

export interface InnovationFeaturedStoryProps {
  story?: InnovationFeaturedStoryData;
  className?: string;
}

export function InnovationFeaturedStory({
  story = defaultFeaturedInnovation,
  className = "",
}: InnovationFeaturedStoryProps) {
  if (!story) {
    return null;
  }

  const linkTarget = story.url || "/article/ai-infrastructure-supercomputing";

  return (
    <article className={`relative overflow-hidden rounded-lg border border-gray-200 bg-black group h-full min-h-[560px] lg:min-h-[620px] flex flex-col justify-between ${className}`}>
      <Link to={linkTarget} className="absolute inset-0 z-0 block">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover rounded-none transition-transform duration-700 group-hover:scale-[1.03]"
          loading="eager"
        />
        {/* Soft top gradient and deep bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />
      </Link>

      {/* Top category label badge */}
      <div className="relative z-10 p-4 sm:p-5">
        <span className="inline-block bg-red-600 text-white text-[10px] sm:text-[10.5px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-none shadow-sm">
          {story.category}
        </span>
      </div>

      {/* Bottom headline, summary, and action link */}
      <div className="relative z-10 p-5 sm:p-6 md:p-7">
        <Link to={linkTarget} className="block">
          <h2 className="font-serif text-[26px] sm:text-[30px] lg:text-[34px] font-bold leading-[1.12] text-white group-hover:text-gray-100 transition-colors">
            {story.title}
          </h2>
          <p className="mt-3 text-[13.5px] sm:text-[14px] text-gray-200 leading-[1.55] line-clamp-3">
            {story.summary}
          </p>
        </Link>

        <div className="mt-5 pt-1">
          <Link
            to={linkTarget}
            className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-bold text-white uppercase tracking-[0.14em] hover:text-red-400 transition-colors group/link"
          >
            <span>Read Full Story</span>
            <ArrowRight
              size={13}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default InnovationFeaturedStory;
