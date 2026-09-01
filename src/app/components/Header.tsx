import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Search, Menu, X, User, ChevronDown, Crown, LogOut, BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { searchIndex } from "../data/searchIndex";

/* Primary nav — consolidates the old two-row category navigation into one
   compact black bar, per the premium editorial redesign spec. */
const primaryNav = [
  { label: "Markets", path: "/markets" },
  { label: "Business News", path: "/business-news" },
  { label: "International Business", path: "#" }, // no page for this yet
  { label: "Startup Success", path: "#" }, // no page for this yet
  { label: "CEO Spotlight", path: "/ceospotlight" },
  { label: "Magazines", path: "/magazine" },
  { label: "Innovation", path: "/innovation" },
];

const editions = ["Asia Edition", "Americas Edition", "Europe Edition", "India Edition"];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [editionOpen, setEditionOpen] = useState(false);
  const [edition, setEdition] = useState("Asia Edition");
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, user, signOut } = useAuth();
  const isPremium = user?.tier === "premium";
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editionOpen) return;
    const timer = setTimeout(() => {
      setEditionOpen(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [editionOpen]);

  /* Close the search dropdown on an outside click, so it behaves
     like the other dropdowns (edition selector, user menu). */
  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  /* Live results as the user types — matched against title and
     category, capped to a short list for the dropdown. */
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchQuery]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const runFullSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    closeSearch();
  };

  const handleSignOut = () => {
    signOut();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="w-full bg-white z-50">
      {/* ── Black primary navigation ── */}
      <div className="pt-top-nav">
        <div className="pt-container h-full flex items-center justify-between">
          <nav className="hidden lg:flex items-center gap-6 h-full">
            <a
              href="https://www.youtube.com/@vmpridetimes"
              target="_blank"
              rel="noopener noreferrer"
              className="pt-focusable flex items-center gap-2"
            >
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              Live TV
            </a>

            {primaryNav.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`pt-focusable ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Utility line on the right of the black bar (desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/magazine" className="pt-focusable flex items-center gap-1">
              <BookOpen size={12} /> Digital Edition
            </Link>
            {isSignedIn && (
              <Link to="/dashboard" className="pt-focusable flex items-center gap-1">
                {isPremium && <Crown size={10} className="text-yellow-400" />}
                {user?.name.split(" ")[0]}
              </Link>
            )}

            {/* Region / edition selector */}
            <div className="relative">
              <button
                className="pt-edition-btn flex items-center gap-1"
                onClick={() => setEditionOpen(!editionOpen)}
                aria-expanded={editionOpen}
              >
                {edition} <ChevronDown size={11} />
              </button>
              {editionOpen && (
                <div className="absolute right-0 top-full mt-0 w-44 bg-black border border-gray-800 shadow-lg z-50 py-1">
                  {editions.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setEdition(item);
                        setEditionOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-xs text-white hover:bg-gray-900 hover:text-red-500 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: brand mini-label */}
          <span className="lg:hidden text-[11px] text-gray-300 uppercase tracking-widest">
            The Global Voice of Business
          </span>
        </div>
      </div>

      {/* ── Brand header ── */}
      <div className="pt-brand-header">
        <div className="pt-container h-full flex items-center justify-between gap-3 py-6 min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink min-w-0">
            <div className="block min-w-0">
              <div className="pt-logo text-3xl sm:text-[38px] lg:text-[46px] xl:text-[52px] truncate">
                THE <span className="pt-logo-accent">PRIDE</span> TIMES
              </div>
              <div className="pt-tagline hidden sm:block uppercase mt-1">
                The Global Voice of Innovation, Leadership &amp; Success
              </div>
            </div>
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {searchOpen ? (
              <div className="relative" ref={searchBoxRef}>
                <div className="pt-search-box flex items-center gap-2 px-3 w-[220px] sm:w-[300px] lg:w-[420px]">
                  <Search size={14} className="text-gray-400 flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for news, topics, companies..."
                    className="text-sm outline-none w-full bg-transparent"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") closeSearch();
                      if (e.key === "Enter") runFullSearch();
                    }}
                  />
                  <button onClick={closeSearch} aria-label="Close search">
                    <X size={14} className="text-gray-400 hover:text-black" />
                  </button>
                </div>

                {/* Live results dropdown */}
                {searchQuery.trim() && (
                  <div className="absolute right-0 top-full mt-2 w-[280px] sm:w-[360px] lg:w-[420px] bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-[360px] overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <>
                        {searchResults.map((item) => (
                          <Link
                            key={item.id}
                            to={item.link}
                            onClick={closeSearch}
                            className="flex flex-col gap-0.5 px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.12em]">
                              {item.category}
                            </span>
                            <span className="text-sm font-medium text-gray-900 leading-[1.35] line-clamp-2">
                              {item.title}
                            </span>
                          </Link>
                        ))}
                        <button
                          onClick={runFullSearch}
                          className="block w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 uppercase tracking-wide hover:bg-gray-50 transition-colors"
                        >
                          See all results for "{searchQuery.trim()}"
                        </button>
                      </>
                    ) : (
                      <div className="px-4 py-4 text-sm text-gray-500">
                        No results found for "{searchQuery.trim()}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search size={18} className="text-gray-700" />
              </button>
            )}

            {/* User menu */}
            {isSignedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="pt-account-btn hidden sm:flex items-center justify-center transition-colors hover:bg-gray-50"
                >
                  <div className={`w-full h-full rounded-full flex items-center justify-center text-white text-xs ${isPremium ? "bg-black" : "bg-gray-500"}`}>
                    {user?.name[0]}
                  </div>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      {isPremium && (
                        <span className="inline-flex items-center gap-1 text-xs text-yellow-700 bg-yellow-100 px-1.5 py-0.5 rounded mt-1">
                          <Crown size={10} /> Premium
                        </span>
                      )}
                    </div>
                    <div className="py-1">
                      <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors" onClick={() => setUserMenuOpen(false)}>
                        <User size={14} className="text-gray-400" /> My Dashboard
                      </Link>
                      <Link to="/magazine" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors" onClick={() => setUserMenuOpen(false)}>
                        <BookOpen size={14} className="text-gray-400" /> Magazine
                      </Link>
                      <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors w-full text-left text-red-600">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="pt-account-btn hidden sm:flex items-center justify-center transition-colors hover:bg-gray-50" aria-label="Sign In">
                  <User size={18} className="text-gray-700" />
                </Link>
                <Link to="/signin" className="pt-subscribe-btn hidden md:inline-flex items-center">
                  Subscribe
                </Link>
              </>
            )}

            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 max-h-[70vh] overflow-y-auto">
          <nav className="flex flex-col gap-0">
            <Link to="/" className="py-2.5 text-sm border-b border-gray-100" onClick={() => setMobileOpen(false)}>Home</Link>
            <a
              href="https://www.youtube.com/@vmpridetimes"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 text-sm border-b border-gray-100 flex items-center gap-2 text-red-600"
              onClick={() => setMobileOpen(false)}
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Live TV
            </a>
            {primaryNav.map((item) => (
              <Link key={item.label} to={item.path} className="py-2.5 text-sm border-b border-gray-100" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            {!isSignedIn ? (
              <Link to="/signin" className="mt-3 block text-center pt-subscribe-btn" onClick={() => setMobileOpen(false)}>
                Sign In / Subscribe
              </Link>
            ) : (
              <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="mt-2 text-red-600 text-sm py-2.5 text-left">
                Sign Out
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
