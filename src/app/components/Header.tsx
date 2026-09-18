import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Search,
  Menu,
  X,
  User,
  ChevronDown,
  Crown,
  LogOut,
  BookOpen,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { searchIndex } from "../data/searchIndex";

/* =========================================================
   PRIMARY NAVIGATION
========================================================= */

const primaryNav = [
  { label: "Markets", path: "/markets" },
  { label: "Business News", path: "/business-news" },
  { label: "International Business", path: "/international-news" },
  { label: "Startup Success", path: "/startup-success" },
  { label: "CEO Spotlight", path: "/ceospotlight" },
  { label: "Magazines", path: "/magazine" },
  { label: "Innovation", path: "/innovation" },
];

const editions = [
  "Asia Edition",
  "Americas Edition",
  "Europe Edition",
  "India Edition",
];

/* =========================================================
   HEADER
========================================================= */

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [editionOpen, setEditionOpen] = useState(false);
  const [edition, setEdition] = useState("Asia Edition");

  const location = useLocation();
  const navigate = useNavigate();

  const { isSignedIn, user, signOut } = useAuth();

  const isPremium = user?.tier === "premium";

  const searchBoxRef = useRef<HTMLDivElement>(null);

  /* =========================================================
     CLOSE EDITION DROPDOWN AUTOMATICALLY
  ========================================================= */

  useEffect(() => {
    if (!editionOpen) return;

    const timer = setTimeout(() => {
      setEditionOpen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [editionOpen]);

  /* =========================================================
     CLOSE SEARCH DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node)
      ) {
        /* Search input remains visible.
           Only the result dropdown closes naturally. */
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================================
     CLOSE MENUS WHEN ROUTE CHANGES
  ========================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setEditionOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  /* =========================================================
     CLOSE MOBILE MENU ON SCROLL
  ========================================================= */

  useEffect(() => {
    if (!mobileOpen) return;

    const handleScroll = () => {
      setMobileOpen(false);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileOpen]);

  /* =========================================================
     LOCK BODY SCROLL WHILE MOBILE MENU IS OPEN
  ========================================================= */

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =========================================================
     SEARCH RESULTS
  ========================================================= */

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

  /* =========================================================
     FULL SEARCH
  ========================================================= */

  const runFullSearch = () => {
    const q = searchQuery.trim();

    if (!q) return;

    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  /* =========================================================
     SIGN OUT
  ========================================================= */

  const handleSignOut = () => {
    signOut();
    setUserMenuOpen(false);
    navigate("/");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <header className="w-full bg-white z-50 relative">
      {/* =====================================================
          BLACK PRIMARY NAVIGATION
      ===================================================== */}

      <div className="pt-top-nav hidden lg:block">
        <div className="pt-container h-full flex items-center justify-between">
          <nav className="flex items-center gap-6 h-full">
            {/* Live TV */}

            <a
              href="https://www.youtube.com/@vmpridetimes"
              target="_blank"
              rel="noopener noreferrer"
              className="pt-focusable flex items-center gap-2"
            >
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />

                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
              </span>

              Live TV
            </a>

            {/* Primary navigation */}

            {primaryNav.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`pt-focusable ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/magazine"
              className="pt-focusable flex items-center gap-1"
            >
              <BookOpen size={12} />

              Digital Edition
            </Link>

            {isSignedIn && (
              <Link
                to="/dashboard"
                className="pt-focusable flex items-center gap-1"
              >
                {isPremium && (
                  <Crown
                    size={10}
                    className="text-yellow-400"
                  />
                )}

                {user?.name.split(" ")[0]}
              </Link>
            )}

            {/* Edition */}

            <div className="relative">
              <button
                className="pt-edition-btn flex items-center gap-1"
                onClick={() => setEditionOpen(!editionOpen)}
                aria-expanded={editionOpen}
              >
                {edition}

                <ChevronDown size={11} />
              </button>

              {editionOpen && (
                <div className="absolute right-0 top-full mt-0 w-44 bg-black border border-gray-800 shadow-lg z-[100] py-1">
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
        </div>
      </div>

      {/* =====================================================
          BRAND HEADER
      ===================================================== */}

      <div className="pt-brand-header">
        <div className="pt-container min-w-0 flex items-center justify-between gap-3 py-5 sm:py-6">
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="flex items-center min-w-0 flex-shrink"
          >
            <div className="block min-w-0">
              <div className="pt-logo text-3xl sm:text-[38px] lg:text-[46px] xl:text-[52px] whitespace-nowrap">
                THE{" "}
                <span className="pt-logo-accent">
                  PRIDE
                </span>{" "}
                TIMES
              </div>

              <div className="pt-tagline block uppercase mt-1 text-[9px] sm:text-[10px] md:text-xs truncate">
                The Global Voice of Innovation, Leadership &amp;
                Success
              </div>
            </div>
          </Link>

          {/* =================================================
              RIGHT CONTROLS
          ================================================= */}

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* User menu */}

            {isSignedIn ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setUserMenuOpen(!userMenuOpen)
                  }
                  className="pt-account-btn hidden md:flex items-center justify-center transition-colors hover:bg-gray-50"
                  aria-label="Account"
                >
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center text-white text-xs ${
                      isPremium
                        ? "bg-black"
                        : "bg-gray-500"
                    }`}
                  >
                    {user?.name?.[0]}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded shadow-lg z-[100]">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm">
                        {user?.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {user?.email}
                      </p>

                      {isPremium && (
                        <span className="inline-flex items-center gap-1 text-xs text-yellow-700 bg-yellow-100 px-1.5 py-0.5 rounded mt-1">
                          <Crown size={10} />

                          Premium
                        </span>
                      )}
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          setUserMenuOpen(false)
                        }
                      >
                        <User
                          size={14}
                          className="text-gray-400"
                        />

                        My Dashboard
                      </Link>

                      <Link
                        to="/magazine"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          setUserMenuOpen(false)
                        }
                      >
                        <BookOpen
                          size={14}
                          className="text-gray-400"
                        />

                        Magazine
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors w-full text-left text-red-600"
                      >
                        <LogOut size={14} />

                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="pt-account-btn hidden md:flex items-center justify-center transition-colors hover:bg-gray-50"
                  aria-label="Sign In"
                >
                  <User
                    size={18}
                    className="text-gray-700"
                  />
                </Link>

                <Link
                  to="/signup"
                  className="pt-subscribe-btn hidden md:inline-flex items-center"
                >
                  Subscribe
                </Link>
              </>
            )}

            {/* Mobile menu button */}

            <button
              className="lg:hidden p-2 flex-shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          FULL WIDTH SEARCH ROW
          
          IMPORTANT:
          Search is now completely separated from the logo
          and right-side controls. This prevents overlap.
      ===================================================== */}

      <div className="w-full border-t border-gray-100 border-b border-gray-200 bg-white">
        <div className="pt-container py-2.5 sm:py-3">
          <div
            ref={searchBoxRef}
            className="relative w-full"
          >
            {/* Search input */}

            <div className="w-full h-10 sm:h-11 border border-gray-200 rounded-md bg-white flex items-center px-3 sm:px-4 gap-2 shadow-sm focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-200 transition-all">
              <Search
                size={16}
                className="text-gray-400 flex-shrink-0"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search for news, topics, companies..."
                className="w-full min-w-0 h-full bg-transparent outline-none border-none text-sm text-gray-800 placeholder:text-gray-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    runFullSearch();
                  }

                  if (e.key === "Escape") {
                    setSearchQuery("");
                  }
                }}
                aria-label="Search"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Clear search"
                >
                  <X
                    size={14}
                    className="text-gray-400 hover:text-black"
                  />
                </button>
              )}
            </div>

            {/* =================================================
                FULL WIDTH SEARCH RESULTS
            ================================================= */}

            {searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-[200] overflow-hidden">
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={item.link}
                        onClick={() =>
                          setSearchQuery("")
                        }
                        className="flex flex-col gap-1 px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
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
                      className="block w-full text-left px-4 py-3 text-xs font-semibold text-red-600 uppercase tracking-wide hover:bg-gray-50 transition-colors"
                    >
                      See all results for "
                      {searchQuery.trim()}"
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-4 text-sm text-gray-500">
                    No results found for "
                    {searchQuery.trim()}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-0 bottom-0 z-[150] bg-white overflow-y-auto">
          {/* Mobile menu header */}

          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="min-w-0"
            >
              <div className="pt-logo text-2xl sm:text-3xl whitespace-nowrap">
                THE{" "}
                <span className="pt-logo-accent">
                  PRIDE
                </span>{" "}
                TIMES
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-col gap-0 px-4 py-4">
            {/* Sign In / Subscribe */}

            {!isSignedIn && (
              <div className="flex items-center gap-2.5 pb-4 mb-2 border-b border-gray-100">
                <Link
                  to="/login"
                  className="flex-1 text-center text-sm font-semibold border border-gray-300 rounded-full py-2.5"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="flex-1 text-center text-sm font-bold uppercase tracking-wide text-white bg-red-600 rounded-full py-2.5 hover:bg-red-700 transition-colors"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  Subscribe
                </Link>
              </div>
            )}

            {/* Home */}

            <Link
              to="/"
              className="py-3 text-sm border-b border-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            {/* Live TV */}

            <a
              href="https://www.youtube.com/@vmpridetimes"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-sm border-b border-gray-100 flex items-center gap-2 text-red-600"
              onClick={() => setMobileOpen(false)}
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />

                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>

              Live TV
            </a>

            {/* Primary navigation */}

            {primaryNav.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="py-3 text-sm border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Signed in user */}

            {isSignedIn && (
              <>
                <Link
                  to="/dashboard"
                  className="py-3 text-sm border-b border-gray-100 flex items-center gap-2"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <User size={15} />

                  My Dashboard
                </Link>

                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileOpen(false);
                  }}
                  className="mt-2 text-red-600 text-sm py-3 text-left"
                >
                  Sign Out
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
