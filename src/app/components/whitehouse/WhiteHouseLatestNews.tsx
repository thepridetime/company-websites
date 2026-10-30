import { Link } from "react-router";
import { Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { WhiteHouseStory } from "../../data/whiteHouseData";

export interface WhiteHouseLatestNewsProps {
  news?: WhiteHouseStory[];
  title?: string;
  viewAllUrl?: string;
  className?: string;
}

export function WhiteHouseLatestNews({
  news = [],
  title = "LATEST WHITE HOUSE NEWS",
  viewAllUrl,
  className = "",
}: WhiteHouseLatestNewsProps) {
  if (!news || news.length === 0) {
    return null;
  }

  return (
    <div className={`pt-5 ${className}`}>
      {/* HEADER */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
        <h2 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-red-600">
          {title}
        </h2>
        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
          Newsroom
        </span>
      </div>

      {/* COMPACT ROWS */}
      <div className="divide-y divide-gray-100">
        {news.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className="group flex gap-3 py-3 hover:bg-gray-50/60 px-1 -mx-1 transition-colors"
          >
            {/* THUMBNAIL */}
            <div className="w-[84px] h-[60px] shrink-0 overflow-hidden rounded-lg border border-gray-200/70 bg-gray-100">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* TEXT */}
            <div className="min-w-0 flex-1 flex flex-col justify-between">
              <div>
                <span className="block text-[10px] sm:text-[11px] font-bold text-red-600 uppercase tracking-[0.14em] leading-none mb-1">
                  {item.category}
                </span>

                <h4 className="font-serif text-[13px] sm:text-[14px] font-bold leading-[1.3] text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                  {item.title}
                </h4>
              </div>

              <span className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                <Clock size={10} />
                {item.publishedAt} · {item.readTime}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER LINK */}
      {viewAllUrl && (
        <div className="pt-3 border-t border-gray-100">
          <Link
            to={viewAllUrl}
            className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-red-600 hover:text-red-700 transition-colors"
          >
            <span>View All White House News</span>
            <ArrowRight
              size={12}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default WhiteHouseLatestNews;
