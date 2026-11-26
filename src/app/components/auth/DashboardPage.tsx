import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  BookOpen,
  Bell,
  CreditCard,
  Settings,
  TrendingUp,
  Bookmark,
  Clock,
  LogOut,
  Crown,
  ChevronRight,
  Newspaper,
  Shield,
  Download,
  Smartphone,
  Monitor,
  Search,
  Headphones,
  Edit3,
  Layers,
  Flame,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Menu,
  X,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import logoImg from "../../../imports/logo.png";
import { supabase } from "../../../lib/supabase";
import { setNewsletterSubscribed } from "../../../lib/newsletterPreferences";
import { unsaveArticle, listSavedArticles } from "../../../lib/savedArticles";
import { clearReadingHistory, getReadingStats } from "../../../lib/readingHistory";
import { downloadExecutiveReport } from "../../../lib/reportDownload";
import { triggerAppInstallModal } from "../common/AppInstallPrompt";

type ReadItem = {
  title: string;
  category: string;
  path: string;
  read_at: string;
};

type SavedItem = {
  title: string;
  category: string;
  path: string;
  saved_at: string;
};

const DASHBOARD_REPORTS = [
  { title: "Global AI Readiness Index 2026", category: "Technology", pages: 48 },
  { title: "India Economic Outlook 2026-2030", category: "Macroeconomics", pages: 56 },
  { title: "Clean Energy Investment Report Q1 2026", category: "Energy", pages: 34 },
  { title: "Global Cybersecurity Threat Report 2026", category: "Security", pages: 61 },
  { title: "World's 100 Best-Managed Companies", category: "Governance", pages: 72 },
];

const MAGAZINE_CATEGORIES = [
  {
    name: "Politics",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80",
    path: "/politics",
  },
  {
    name: "Technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
    path: "/technology",
  },
  {
    name: "Business",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    path: "/business-news",
  },
  {
    name: "Health",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80",
    path: "/healthcare-pharma",
  },
  {
    name: "Lifestyle",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80",
    path: "/consumer-retail",
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80",
    path: "/sports",
  },
];

export function DashboardPage() {
  const { user, isSignedIn, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [dataLoading, setDataLoading] = useState(true);
  const [recentlyRead, setRecentlyRead] = useState<ReadItem[]>([]);
  const [savedArticles, setSavedArticles] = useState<SavedItem[]>([]);
  const [articlesThisMonth, setArticlesThisMonth] = useState(0);
  const [streak, setStreak] = useState(0);
  const [joinedDate, setJoinedDate] = useState("");
  const [subscribed, setSubscribed] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState("This Month");

  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoading, isSignedIn, navigate]);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;

    const load = async () => {
      setDataLoading(true);

      const [saved, stats, nlRes, sessionRes] = await Promise.all([
        listSavedArticles(user.id),
        getReadingStats(user.id),
        supabase
          .from("newsletter_subscriptions")
          .select("newsletter_key, subscribed")
          .eq("user_id", user.id),
        supabase.auth.getSession(),
      ]);

      if (cancelled) return;

      const createdAt = sessionRes.data?.session?.user?.created_at;
      if (createdAt) {
        setJoinedDate(
          new Date(createdAt).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        );
      }

      setRecentlyRead(stats.recent);
      setArticlesThisMonth(stats.readsThisMonth);
      setStreak(stats.streak);
      setSavedArticles(saved);

      const map: Record<string, boolean> = {};
      for (const row of nlRes.data ?? []) {
        map[row.newsletter_key] = row.subscribed;
      }
      setSubscribed(map);

      setDataLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleUnsave = async (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.id) return;
    setSavedArticles((prev) => prev.filter((a) => a.path !== path));
    await unsaveArticle(user.id, path);
  };

  const handleInstallClick = () => {
    triggerAppInstallModal();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b132b] flex items-center justify-center text-white text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading your personalized dashboard…</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isPremium = user.tier === "premium";
  const userDisplayName = user.name || "Reader";

  // Calculate goal percentage: default base 24 articles/month
  const readGoalTotal = 24;
  const currentReadCount = articlesThisMonth > 0 ? articlesThisMonth : 16;
  const goalPercent = Math.min(100, Math.round((currentReadCount / readGoalTotal) * 100));

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-800 flex">
      {/* ─────────────────────────────────────────────────────────────
          1. LEFT SIDEBAR (Dark Navy Slate #0B132B)
      ────────────────────────────────────────────────────────────── */}
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0b132b] text-slate-300 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo & Tagline */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logoImg} alt="The Pride Times" className="h-8 w-auto object-contain brightness-110" />
              <div>
                <span className="font-serif font-bold text-white text-[17px] tracking-tight block leading-tight">
                  The Pride Times
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-red-500 font-semibold block">
                  Read · Reflect · Rise
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Menu Links */}
          <nav className="mt-6 space-y-1 text-[13px] font-medium">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#e31b23] text-white font-semibold shadow-md shadow-red-900/30 transition"
            >
              <Layers size={17} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/breaking-news"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <Newspaper size={17} />
              <span>Latest News</span>
            </Link>

            <Link
              to="/magazine"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <Compass size={17} />
              <span>Magazines &amp; Reports</span>
            </Link>

            <a
              href="#saved-articles-section"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <Bookmark size={17} />
              <span>Saved Articles</span>
              {savedArticles.length > 0 && (
                <span className="ml-auto bg-slate-800 text-slate-300 text-[10.5px] px-2 py-0.5 rounded-full">
                  {savedArticles.length}
                </span>
              )}
            </a>

            <a
              href="#reading-activity-section"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <Clock size={17} />
              <span>Reading History</span>
            </a>

            <Link
              to="/premium"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <Crown size={17} className="text-amber-400" />
              <span>My Subscriptions</span>
            </Link>

            <Link
              to="/dashboard/notifications"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <Bell size={17} />
              <span>Notifications</span>
              <span className="ml-auto bg-[#e31b23] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                1
              </span>
            </Link>

            <Link
              to="/dashboard/profile"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <Settings size={17} />
              <span>Account Settings</span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <Headphones size={17} />
              <span>Help &amp; Support</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                signOut();
                navigate("/");
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800/40 transition text-left"
            >
              <LogOut size={17} />
              <span>Log Out</span>
            </button>
          </nav>
        </div>

        {/* Go Premium Sidebar Widget */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-[#141d38] border border-amber-500/30 p-4 text-center shadow-lg">
            <div className="w-9 h-9 mx-auto mb-2 flex items-center justify-center rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <Crown size={18} />
            </div>
            <h4 className="font-bold text-white text-[13px] tracking-wide">
              Go Premium
            </h4>
            <p className="text-[11px] text-slate-300 mt-1 mb-3 leading-snug">
              Unlock exclusive intelligence, ad-free reading &amp; download reports.
            </p>
            <Link
              to="/premium"
              className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-[11px] tracking-wide shadow-md hover:from-amber-300 hover:to-amber-400 transition"
            >
              Upgrade Now &rarr;
            </Link>
          </div>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT AREA (Light Canvas)
      ────────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news, topics or articles..."
                className="w-full h-10 pl-10 pr-4 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 rounded-full border border-transparent focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
              />
            </form>
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Install App Quick Trigger */}
            <button
              type="button"
              onClick={handleInstallClick}
              title="Install The Pride Times App"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold rounded-full border border-red-200 transition"
            >
              <Download size={13} className="animate-pulse" />
              <span className="hidden md:inline">Install App</span>
            </button>

            {/* Notifications */}
            <Link
              to="/dashboard/notifications"
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e31b23] rounded-full ring-2 ring-white" />
            </Link>

            {/* User Profile Avatar Link */}
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2 pl-2 border-l border-slate-200"
            >
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm ring-2 ring-slate-200">
                    {userDisplayName.charAt(0)}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
            </Link>
          </div>
        </header>

        {/* Dashboard Canvas Container */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* ==========================================================
              3. HERO WELCOME BANNER CARD (Mockup matching)
          =========================================================== */}
          <section className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
            {/* Right decorative skyline illustration */}
            <div className="absolute right-0 top-0 bottom-0 w-2/5 hidden md:flex items-center justify-end pr-6 pointer-events-none opacity-20 lg:opacity-30">
              <div className="text-right">
                <span className="font-serif italic text-2xl lg:text-3xl font-bold text-slate-900 block">
                  The Pride Times
                </span>
                <span className="text-xs uppercase tracking-widest text-red-600 font-bold block mt-1">
                  News Today · Better Tomorrow
                </span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
              {/* Avatar with edit badge */}
              <div className="relative shrink-0 w-20 h-20">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-100 shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-900 to-slate-700 text-white font-serif font-bold text-3xl flex items-center justify-center ring-4 ring-slate-100 shadow-md">
                    {userDisplayName.charAt(0)}
                  </div>
                )}
                <Link
                  to="/dashboard/profile"
                  title="Edit profile photo"
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0b132b] text-white flex items-center justify-center hover:bg-red-600 transition shadow"
                >
                  <Edit3 size={12} />
                </Link>
              </div>

              {/* Welcome text & badge strip */}
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Welcome back, {userDisplayName}!
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Stay informed. Stay inspired.
                </p>

                {/* Stat pills row */}
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap mt-4">
                  {/* Articles read */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-100 text-xs font-semibold">
                    <BookOpen size={14} className="text-red-600" />
                    <span>{dataLoading ? "…" : currentReadCount} Articles Read</span>
                  </div>

                  {/* Saved articles */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 text-xs font-semibold">
                    <Bookmark size={14} className="text-amber-500" />
                    <span>{savedArticles.length > 0 ? savedArticles.length : 8} Saved Articles</span>
                  </div>

                  {/* Premium status */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-100/70 text-slate-900 border border-amber-200 text-xs font-bold">
                    <Crown size={14} className="text-amber-600" />
                    <span>{isPremium ? "Premium (Active)" : "Premium Member"}</span>
                  </div>

                  {/* Member since */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium">
                    <Clock size={14} className="text-slate-500" />
                    <span>Member Since {joinedDate || "Sep 2024"}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================================
              4. MAIN GRID LAYOUT (Left Column: Latest News & Magazines,
                                   Right Column: Reading Activity, Saved, Quick Links)
          =========================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ── LEFT COLUMN (7 COLS) ─────────────────────────── */}
            <div className="lg:col-span-7 space-y-6">
              {/* CARD: LATEST NEWS */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e31b23] animate-pulse" />
                    <h2 className="font-serif text-lg font-bold text-slate-900">
                      Latest News
                    </h2>
                  </div>
                  <Link
                    to="/breaking-news"
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group"
                  >
                    See All <ChevronRight size={13} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>

                {/* News Grid (1 Featured + 3 Compact) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                  {/* Big Featured Story (7 cols) */}
                  <div className="sm:col-span-7 group">
                    <Link to="/breaking-news" className="block overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1517976487507-5b3b114f045c?auto=format&fit=crop&w=700&q=80"
                          alt="Gaganyaan Mission Space Rocket"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-[#e31b23] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow">
                          Top Story
                        </span>
                      </div>
                      <div className="p-3.5">
                        <h3 className="font-serif font-bold text-slate-900 text-[15px] leading-snug group-hover:text-red-600 transition line-clamp-2">
                          ISRO's Next Leap: Gaganyaan Mission a Step Closer to Reality
                        </h3>
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                          India's human spaceflight mission is on track, marking a new chapter in commercial space exploration.
                        </p>
                        <span className="text-[11px] text-slate-400 mt-2 block font-medium">
                          6 min read &bull; Sep 5, 2026
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* 3 Compact Stacking Stories (5 cols) */}
                  <div className="sm:col-span-5 flex flex-col justify-between gap-3">
                    <Link
                      to="/sustainability"
                      className="group flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=150&q=80"
                        alt="Earth climate"
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-xs text-slate-900 leading-snug group-hover:text-red-600 transition line-clamp-2">
                          Climate Action Gets Global Push
                        </h4>
                        <span className="text-[10.5px] text-slate-400 mt-1 block">
                          4 min read
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/sports"
                      className="group flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=150&q=80"
                        alt="Cricket stadium"
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-xs text-slate-900 leading-snug group-hover:text-red-600 transition line-clamp-2">
                          India Clinches Thrilling Win
                        </h4>
                        <span className="text-[10.5px] text-slate-400 mt-1 block">
                          3 min read
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/technology"
                      className="group flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80"
                        alt="AI computing chip"
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-xs text-slate-900 leading-snug group-hover:text-red-600 transition line-clamp-2">
                          AI Revolution Transforms Work
                        </h4>
                        <span className="text-[10.5px] text-slate-400 mt-1 block">
                          5 min read
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>

              {/* CARD: YOUR MAGAZINES (Horizontal Cover Capsules) */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e31b23]" />
                    <h2 className="font-serif text-lg font-bold text-slate-900">
                      Your Magazines
                    </h2>
                  </div>
                  <Link
                    to="/magazine"
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group"
                  >
                    Explore All <ChevronRight size={13} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {MAGAZINE_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      className="group flex flex-col items-center text-center"
                    >
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:border-red-500 group-hover:shadow-md transition">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute bottom-1.5 inset-x-1 text-[11px] font-bold text-white tracking-wide truncate">
                          {cat.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* CARD: EXECUTIVE REPORTS DOWNLOADS */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-slate-900">
                      Executive Intelligence Reports
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Full-length research briefings available for immediate PDF download
                    </p>
                  </div>
                  <Link
                    to="/magazine"
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 shrink-0"
                  >
                    All Briefings &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {DASHBOARD_REPORTS.slice(0, 4).map((rep) => (
                    <div
                      key={rep.title}
                      className="border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between hover:border-red-300 hover:shadow-sm transition bg-slate-50/50"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10.5px] font-bold text-red-600 uppercase tracking-wider mb-1">
                          <span>{rep.category}</span>
                          <span className="text-slate-400 font-normal">{rep.pages} pages</span>
                        </div>
                        <h4 className="font-serif font-bold text-slate-900 text-xs leading-snug line-clamp-2">
                          {rep.title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => downloadExecutiveReport(rep.title)}
                        className="mt-2.5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-600 transition cursor-pointer"
                      >
                        <Download size={12} /> Download PDF Briefing
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ── RIGHT COLUMN (5 COLS) ────────────────────────── */}
            <div className="lg:col-span-5 space-y-6">
              {/* CARD: READING ACTIVITY (with Donut gauge & sparkline) */}
              <section id="reading-activity-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <h2 className="font-serif text-lg font-bold text-slate-900">
                    Your Reading Activity
                  </h2>
                  <div className="relative">
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-transparent rounded-lg px-2.5 py-1 outline-none cursor-pointer"
                    >
                      <option value="This Month">This Month</option>
                      <option value="Last Month">Last Month</option>
                      <option value="This Year">This Year</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* SVG Circular Donut Chart */}
                  <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#f1f5f9"
                        strokeWidth="10"
                      />
                      {/* Foreground Progress arc */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#e31b23"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * goalPercent) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-bold text-xl text-slate-900 leading-none">
                        {goalPercent}%
                      </span>
                      <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                        Reading Goal
                      </span>
                    </div>
                  </div>

                  {/* Metrics & Sparkline Trend */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900">
                      {currentReadCount} / {readGoalTotal} Articles read
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-0.5">
                      <ArrowUpRight size={14} />
                      <span>+12% vs last month</span>
                    </div>

                    {/* Smooth Sparkline trend curve */}
                    <div className="mt-3 h-10 w-full">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 120 40">
                        <defs>
                          <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#e31b23" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#e31b23" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,35 Q20,30 40,22 T80,18 T120,8 L120,40 L0,40 Z"
                          fill="url(#sparklineGrad)"
                        />
                        <path
                          d="M0,35 Q20,30 40,22 T80,18 T120,8"
                          fill="none"
                          stroke="#e31b23"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="120" cy="8" r="3.5" fill="#e31b23" className="animate-pulse" />
                      </svg>
                    </div>
                  </div>
                </div>
              </section>

              {/* CARD: SAVED ARTICLES */}
              <section id="saved-articles-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Bookmark size={17} className="text-[#e31b23]" />
                    <h2 className="font-serif text-lg font-bold text-slate-900">
                      Saved Articles
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {savedArticles.length} Saved
                  </span>
                </div>

                <div className="space-y-3">
                  {savedArticles.length > 0 ? (
                    savedArticles.map((a) => (
                      <div
                        key={`${a.path}|${a.title}`}
                        className="group flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition"
                      >
                        <Link to={a.path} className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-slate-900 text-white font-serif font-bold text-sm flex items-center justify-center shrink-0">
                            PT
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                              {a.category}
                            </span>
                            <h4 className="font-serif font-bold text-xs text-slate-900 truncate group-hover:text-red-600 transition">
                              {a.title}
                            </h4>
                          </div>
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => handleUnsave(e, a.path)}
                          title="Remove from saved articles"
                          className="p-1.5 text-slate-300 hover:text-red-600 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    /* Default Mockup Saved Story */
                    <Link
                      to="/featured"
                      className="group flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80"
                        alt="Breathtaking Destinations"
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-serif font-bold text-xs text-slate-900 leading-snug group-hover:text-red-600 transition line-clamp-2">
                          10 Breathtaking Destinations to Visit
                        </h4>
                        <span className="text-[10.5px] text-slate-400 mt-1 block">
                          Sep 4, 2026
                        </span>
                      </div>
                      <Bookmark size={15} className="text-amber-500 fill-amber-500 shrink-0" />
                    </Link>
                  )}
                </div>
              </section>

              {/* CARD: ACCOUNT QUICK LINKS (2x2 Grid) */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                  <Settings size={17} className="text-slate-600" />
                  <h2 className="font-serif text-lg font-bold text-slate-900">
                    Account Quick Links
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/dashboard/profile"
                    className="p-3 rounded-xl border border-slate-200/90 hover:border-slate-900 hover:bg-slate-50 transition flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                  >
                    <User size={15} className="text-slate-500 shrink-0" />
                    <span className="truncate">Edit Profile</span>
                  </Link>

                  <Link
                    to="/dashboard/notifications"
                    className="p-3 rounded-xl border border-slate-200/90 hover:border-slate-900 hover:bg-slate-50 transition flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                  >
                    <Bell size={15} className="text-slate-500 shrink-0" />
                    <span className="truncate">Notification Settings</span>
                  </Link>

                  <Link
                    to="/premium"
                    className="p-3 rounded-xl border border-slate-200/90 hover:border-slate-900 hover:bg-slate-50 transition flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                  >
                    <CreditCard size={15} className="text-slate-500 shrink-0" />
                    <span className="truncate">Manage Subscription</span>
                  </Link>

                  <Link
                    to="/dashboard/privacy"
                    className="p-3 rounded-xl border border-slate-200/90 hover:border-slate-900 hover:bg-slate-50 transition flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                  >
                    <Shield size={15} className="text-slate-500 shrink-0" />
                    <span className="truncate">Privacy &amp; Security</span>
                  </Link>
                </div>
              </section>

              {/* CARD: MOBILE & DESKTOP APP CONNECT (PWA) */}
              <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 shadow-md border border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 font-serif font-black text-lg text-white shadow-lg shadow-red-900/50">
                    PT
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-400 uppercase tracking-wider mb-1">
                      <Smartphone size={13} /> Mobile &amp; Desktop App Connected
                    </div>
                    <h3 className="font-serif font-bold text-white text-base leading-snug">
                      Install The Pride Times App
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Instant standalone app on Windows, macOS, Android &amp; iOS. Lightning-fast offline reading &amp; live market alerts.
                    </p>
                    <button
                      type="button"
                      onClick={handleInstallClick}
                      className="mt-3.5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#e31b23] px-4 py-2 text-xs font-bold text-white hover:bg-red-700 shadow-md transition cursor-pointer"
                    >
                      <Download size={13} /> Install on This Device
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
