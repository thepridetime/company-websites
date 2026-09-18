import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Search,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [editionOpen, setEditionOpen] = useState(false);
  const [edition, setEdition] = useState("Asia Edition");

  const location = useLocation();
  const navigate = useNavigate();

  const { isSignedIn, user, signOut } = useAuth();

  const isPremium = user?.tier === "premium";

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
     SEARCH OUTSIDE CLICK HANDLER
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node)
      ) {
        // Search remains visible.
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
    setUserMenuOpen(false);
    setEditionOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  /* =========================================================
     FOCUS SEARCH INPUT WHEN THE SEARCH BAR OPENS
  ========================================================= */

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

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
    <header className="w-full bg-white relative z-50">
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

            {/* Primary Navigation */}

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

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="hidden lg:flex items-center gap-4">
            {/* Digital Edition */}

            <Link
              to="/magazine"
              className="pt-focusable flex items-center gap-1"
            >
              <BookOpen size={12} />
              Digital Edition
            </Link>

            {/* Signed In User */}

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

            {/* =================================================
                EDITION SELECTOR
            ================================================= */}

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
            {/* =================================================
                SEARCH TOGGLE

                Circular icon button matching the account button.
                Clicking it opens/closes the full-width (100%)
                search bar directly below the header.
            ================================================= */}

            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="pt-account-btn flex items-center justify-center transition-colors hover:bg-gray-50"
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search size={18} className="text-gray-700" />
            </button>

            {/* =================================================
                USER MENU
            ================================================= */}

            {isSignedIn ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setUserMenuOpen(!userMenuOpen)
                  }
                  className="pt-account-btn hidden md:flex items-center justify-center transition-colors hover:bg-gray-50"
                  aria-label="Account"
                  aria-expanded={userMenuOpen}
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
                {/* Sign In */}

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

                {/* Subscribe */}

                <Link
                  to="/signup"
                  className="pt-subscribe-btn hidden md:inline-flex items-center"
                >
                  Subscribe
                </Link>
              </>
            )}

          </div>
        </div>
      </div>

      {/* =====================================================
          FULL WIDTH SEARCH ROW

          Search is completely separated from:
          - Logo
          - Account
          - Subscribe
          - Menu

          It occupies 100% of the available container width.
      ===================================================== */}

      {searchOpen && (
        <div className="w-full border-t border-gray-100 border-b border-gray-200 bg-white relative">
          <div className="pt-container w-full py-2.5 sm:py-3">
            <div
              ref={searchBoxRef}
              className="relative w-full min-w-0"
            >
              {/* =================================================
                  SEARCH INPUT
              ================================================= */}

              <div
                className="
                  w-full
                  h-10
                  sm:h-11
                  border
                  border-gray-200
                  rounded-md
                  bg-white
                  flex
                  items-center
                  px-3
                  sm:px-4
                  gap-2
                  shadow-sm
                  focus-within:border-gray-400
                  focus-within:ring-1
                  focus-within:ring-gray-200
                  transition-all
                  overflow-hidden
                  box-border
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      runFullSearch();
                    } else {
                      searchInputRef.current?.focus();
                    }
                  }}
                  aria-label="Search"
                  className="flex-shrink-0"
                >
                  <Search
                    size={16}
                    className="text-gray-400 hover:text-black transition-colors"
                  />
                </button>

                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search for news, topics, companies..."
                  className="
                    w-full
                    min-w-0
                    h-full
                    flex-1
                    bg-transparent
                    outline-none
                    border-none
                    text-sm
                    text-gray-800
                    placeholder:text-gray-400
                  "
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      runFullSearch();
                    }

                    if (e.key === "Escape") {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }
                  }}
                  aria-label="Search"
                />

                {searchQuery && (
                  <button
                    type="button"
                  onClick={() => setSearchQuery("")}
                  className="
                    flex-shrink-0
                    p-1
                    rounded-full
                    hover:bg-gray-100
                    transition-colors
                  "
                  aria-label="Clear search"
                >
                  <X
                    size={14}
                    className="text-gray-400 hover:text-black"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            SEARCH RESULTS

            Rendered outside `pt-container` so it spans the
            full width of the page (100%), edge to edge,
            directly below the search bar — not just the
            width of the search input.
        ================================================= */}

        {searchQuery.trim() && (
          <div
            className="
              absolute
              inset-x-0
              top-full
              w-full
              bg-white
              border-t
              border-gray-200
              shadow-xl
              z-[200]
              overflow-hidden
            "
          >
            <div className="pt-container w-full">
              {searchResults.length > 0 ? (
                <>
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      onClick={() =>
                        setSearchQuery("")
                      }
                      className="
                        flex
                        flex-col
                        gap-1
                        px-4
                        py-3
                        border-b
                        border-gray-100
                        last:border-b-0
                        hover:bg-gray-50
                        transition-colors
                      "
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
                    type="button"
                    onClick={runFullSearch}
                    className="
                      block
                      w-full
                      text-left
                      px-4
                      py-3
                      text-xs
                      font-semibold
                      text-red-600
                      uppercase
                      tracking-wide
                      hover:bg-gray-50
                      transition-colors
                    "
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
          </div>
        )}
        </div>
      )}
    </header>
  );
}
