import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { Clock, ArrowRight } from "lucide-react";
import { searchIndex } from "../data/searchIndex";

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return [];
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600 mb-2">
          Search Results
        </p>

        <h1 className="font-serif text-2xl font-bold text-gray-950 mb-1">
          {query ? `"${query}"` : "Search"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {query
            ? `${results.length} result${results.length === 1 ? "" : "s"} found`
            : "Enter a search term to see matching articles."}
        </p>

        {query && results.length === 0 && (
          <div className="border border-gray-200 rounded-md p-6 text-sm text-gray-500">
            No articles matched "{query}". Try a different keyword, company
            name, or topic.
          </div>
        )}

        <div className="flex flex-col gap-4">
          {results.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group flex flex-col gap-1.5 p-4 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
            >
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.14em]">
                {item.category}
              </span>

              <h2 className="font-serif text-lg font-bold leading-[1.3] text-gray-950 group-hover:text-red-600 transition-colors">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600 leading-[1.6]">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between mt-1">
                <span className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Clock size={9} strokeWidth={2.25} />
                  {item.time}
                </span>

                <span className="flex items-center gap-1 text-[11px] font-bold text-gray-900 uppercase tracking-wide group-hover:gap-2 transition-all">
                  Read More
                  <ArrowRight size={11} strokeWidth={2.25} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
