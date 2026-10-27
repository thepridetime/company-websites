import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { StartupStory } from "../../data/startupData";

export interface FeaturedStartupStoryProps {
  story?: StartupStory | null;
  className?: string;
}

export function FeaturedStartupStory({
  story,
  className = "",
}: FeaturedStartupStoryProps) {
  if (!story) {
    return (
      <div className={`p-8 border border-gray-200 bg-gray-50 text-center text-gray-400 text-sm ${className}`}>
        No featured startup story available at this time.
      </div>
    );
  }

  const destination = story.url || "/technology";

  return (
    <div className={`relative overflow-hidden rounded-none border border-gray-200/80 bg-black group ${className}`}>
      <Link
        to={destination}
        className="block relative w-full h-[430px] sm:h-[480px] lg:h-[520px]"
      >
        {/* EDITORIAL HERO IMAGE */}
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          priority={true}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* REFINED DARK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10" />

        {/* CATEGORY BADGE */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
          <span className="bg-red-600 text-white px-3 py-1 text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase rounded-none shadow-sm">
            {story.category}
          </span>
        </div>

        {/* BOTTOM HEADLINE CONTENT */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8 z-10 flex flex-col justify-end">
          <h2 className="font-serif text-[26px] sm:text-[32px] lg:text-[36px] font-bold leading-[1.12] text-white tracking-tight group-hover:text-gray-100 transition-colors">
            {story.title}
          </h2>

          <p className="mt-2.5 text-[13px] sm:text-[14px] text-gray-200/90 leading-[1.55] max-w-2xl line-clamp-3">
            {story.summary}
          </p>

          <div className="mt-4 pt-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-white group-hover:text-red-400 transition-colors">
              Read Full Story
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FeaturedStartupStory;
