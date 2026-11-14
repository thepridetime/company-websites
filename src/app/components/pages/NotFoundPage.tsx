import { Link } from "react-router";
import { Home, Search, Compass, ArrowRight } from "lucide-react";

export function NotFoundPage() {
  const popularSections = [
    { name: "Business News", path: "/business-news", desc: "Corporate strategy, earnings & deals" },
    { name: "Global Markets", path: "/markets", desc: "Indices, currencies & commodities" },
    { name: "Technology & AI", path: "/technology", desc: "Infrastructure, robotics & semiconductors" },
    { name: "International News", path: "/international-news", desc: "Global trade & geopolitical reporting" },
    { name: "Startup Success", path: "/startup-success", desc: "Venture capital & high-growth founders" },
    { name: "Digital Magazines", path: "/magazine", desc: "In-depth quarterly editions & specials" },
  ];

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
      {/* Kicker */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 text-[#ED1C24] text-[11px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
        <span>Error 404</span>
        <span className="text-gray-300">•</span>
        <span>Page Not Found</span>
      </div>

      {/* Main Masthead / Headline */}
      <h1
        className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0B1D35] tracking-tight leading-[1.15] mb-5"
        style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
      >
        The Story You Are Looking For <br className="hidden sm:inline" />
        Could Not Be Found
      </h1>

      {/* Description */}
      <p className="max-w-[620px] mx-auto text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
        The link you followed may be broken, outdated, or the page may have been moved or archived.
        Use the options below or return to the front page for breaking coverage.
      </p>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#0B1D35] hover:bg-[#ED1C24] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-sm transition-colors duration-200 shadow-sm"
        >
          <Home size={16} />
          Return to Front Page
        </Link>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-3.5 rounded-sm transition-colors duration-200"
        >
          <Search size={16} />
          Search The Pride Times
        </Link>
      </div>

      {/* Divider with label */}
      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest text-gray-400">
          <span className="bg-white px-4 flex items-center gap-1.5 font-bold">
            <Compass size={13} className="text-[#ED1C24]" />
            Explore Major Desks
          </span>
        </div>
      </div>

      {/* Popular Desks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
        {popularSections.map((sec) => (
          <Link
            key={sec.path}
            to={sec.path}
            className="group p-4 border border-gray-200 hover:border-[#ED1C24] rounded-sm bg-white hover:bg-gray-50/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-serif font-bold text-sm text-[#0B1D35] group-hover:text-[#ED1C24] transition-colors">
                {sec.name}
              </span>
              <ArrowRight
                size={13}
                className="text-gray-400 group-hover:text-[#ED1C24] group-hover:translate-x-0.5 transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 leading-normal">
              {sec.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NotFoundPage;

