import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  User, BookOpen, Star, Bell, CreditCard, Settings,
  TrendingUp, Bookmark, Clock, Globe, LogOut, Crown,
  ChevronRight, Newspaper, Mail, Shield,
} from "lucide-react";
import { useEffect } from "react";
import logoImg from "../../../imports/logo.png";

const recentlyRead = [
  { title: "Global Markets Surge as Fed Signals Rate Cuts", category: "Finance", color: "#dc2626", time: "2 hrs ago", path: "/finance" },
  { title: "OpenAI's New Model Surpasses Human Benchmarks", category: "Technology", color: "#2563eb", time: "Yesterday", path: "/technology" },
  { title: "Elon Musk Adds $15B to Net Worth in Single Day", category: "Billionaires", color: "#ca8a04", time: "2 days ago", path: "/billionaires" },
  { title: "India Surpasses China as Fastest Growing Economy", category: "World", color: "#0d9488", time: "3 days ago", path: "/world" },
  { title: "CRISPR Gene Editing Achieves 98% Success Rate", category: "Healthcare", color: "#7c3aed", time: "4 days ago", path: "/healthcare" },
];

const savedArticles = [
  { title: "The AI Economy: How AI is Reshaping Global GDP", category: "Technology", saved: "May 18" },
  { title: "Saudi Aramco's $15B Renewable Energy Transition", category: "Energy", saved: "May 15" },
  { title: "Pride Times 30 — World's Most Powerful Business Leaders", category: "Rankings", saved: "May 12" },
];

const newsletters = [
  { name: "The Daily Brief", freq: "Every morning", subscribed: true },
  { name: "Markets Morning", freq: "Weekdays 7am IST", subscribed: true },
  { name: "Technology Weekly", freq: "Every Monday", subscribed: false },
  { name: "Billionaires Tracker", freq: "Every Friday", subscribed: true },
  { name: "India Business Digest", freq: "Daily", subscribed: false },
];

const premiumFeatures = [
  { icon: Shield, title: "Ad-free reading", desc: "No ads on any page" },
  { icon: Newspaper, title: "Full archive access", desc: "25+ years of Pride Times" },
  { icon: Mail, title: "Priority newsletters", desc: "Early edition & alerts" },
  { icon: Globe, title: "Global editions", desc: "India, US, UK & Asia" },
  { icon: Star, title: "Exclusive interviews", desc: "CEO Q&As & profiles" },
  { icon: BookOpen, title: "Analyst reports", desc: "Market deep-dives" },
];

const stats = [
  { icon: BookOpen, label: "Articles read", value: "247", sub: "this month" },
  { icon: Bookmark, label: "Saved", value: null, sub: "in your library" },
  { icon: Clock, label: "Reading streak", value: null, sub: "days running" },
  { icon: Globe, label: "Editions", value: "3", sub: "US, India, Global" },
];

export function DashboardPage() {
  const { user, isSignedIn, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoading, isSignedIn, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading your dashboard…
      </div>
    );
  }
  if (!user) return null;

  const isPremium = user.tier === "premium";

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Masthead */}
      <div className="bg-black text-white border-b-2 border-red-600">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="The Pride Times" className="h-9 w-auto object-contain" />
            <span className="text-white text-sm hidden sm:inline" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              The Pride Times
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/" className="text-xs text-gray-400 hover:text-white transition-colors">
              ← Back to Home
            </Link>
            <button
              onClick={() => { signOut(); navigate("/"); }}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        {/* Welcome / byline block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-5">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ring-2 ring-offset-4 ring-offset-[#faf9f6] ${
                isPremium ? "bg-black ring-amber-400" : "bg-gray-800 ring-gray-300"
              }`}
              style={{ fontFamily: "Georgia, serif" }}
            >
              {user.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-3xl leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  Welcome back, {user.name.split(" ")[0]}
                </h1>
                {isPremium && (
                  <span className="flex items-center gap-1 bg-amber-400 text-black text-xs px-2 py-0.5 rounded-sm">
                    <Crown size={10} /> Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1.5 flex items-center flex-wrap gap-x-3 gap-y-1">
                <span>{user.email}</span>
                <span className="text-gray-300">|</span>
                <span>Member since {user.joinedDate}</span>
                <span className="text-gray-300">|</span>
                <span>Reading from {user.country}</span>
              </p>
            </div>
          </div>
          {!isPremium && (
            <Link
              to="/premium"
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-6 py-2.5 rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Crown size={14} /> Upgrade to Premium
            </Link>
          )}
        </div>

        {/* Stat strip — one bordered strip, not four separate cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border border-gray-200 rounded-sm mb-10 bg-white">
          {[
            { ...stats[0] },
            { ...stats[1], value: String(user.savedArticles) },
            { ...stats[2], value: `${user.readingStreak}` },
            { ...stats[3] },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="p-5">
              <Icon size={15} className="text-gray-400 mb-3" />
              <p className="text-3xl" style={{ fontFamily: "Georgia, serif" }}>{value}</p>
              <p className="text-sm text-gray-700 mt-1">{label}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Recently Read + Saved */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Continue reading */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl" style={{ fontFamily: "Georgia, serif" }}>Continue reading</h2>
                <Clock size={14} className="text-gray-400" />
              </div>
              <div className="divide-y divide-gray-200 border-t border-gray-200 mt-3">
                {recentlyRead.map((a) => (
                  <Link
                    key={a.title}
                    to={a.path}
                    className="flex items-center justify-between py-4 group relative pl-0 hover:pl-3 transition-all duration-200"
                  >
                    <span
                      className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: a.color }}
                    />
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.color }} />
                        {a.category}
                      </span>
                      <p className="text-[15px] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                        {a.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
                      <ChevronRight size={13} className="text-gray-300 group-hover:text-red-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Saved articles */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl" style={{ fontFamily: "Georgia, serif" }}>Saved articles</h2>
                <Bookmark size={14} className="text-gray-400" />
              </div>
              <div className="divide-y divide-gray-200 border-t border-gray-200 mt-3">
                {savedArticles.map((a) => (
                  <div key={a.title} className="py-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500">{a.category}</span>
                      <p className="text-[15px] mt-1 text-gray-900">{a.title}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{a.saved}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium panel */}
            {!isPremium && (
              <div className="relative overflow-hidden rounded-sm bg-black text-white p-7">
                <div
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 pointer-events-none"
                  style={{ background: "radial-gradient(circle, #eab308 0%, transparent 70%)" }}
                />
                <div className="relative">
                  <Crown size={18} className="text-amber-400 mb-3" />
                  <h2 className="text-2xl leading-snug max-w-sm" style={{ fontFamily: "Georgia, serif" }}>
                    Read The Pride Times without limits.
                  </h2>
                  <p className="text-gray-400 text-sm mt-2 mb-6">$4.99/month — cancel anytime.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-7 max-w-lg">
                    {premiumFeatures.map(({ icon: Icon, title, desc }) => (
                      <div key={title} className="flex items-start gap-2.5 py-2 border-t border-white/10">
                        <Icon size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-white">{title}</p>
                          <p className="text-xs text-gray-500">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/premium"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-sm text-sm transition-colors"
                  >
                    Start your free 30-day trial
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right — Profile + Newsletters */}
          <div className="flex flex-col gap-8">
            {/* Account */}
            <div className="bg-white border border-gray-200 rounded-sm p-5">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                <h2 className="text-base" style={{ fontFamily: "Georgia, serif" }}>Account</h2>
                <Settings size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-col">
                {[
                  { icon: User, label: "Edit profile", to: "#" },
                  { icon: CreditCard, label: isPremium ? "Manage subscription" : "Upgrade to Premium", to: "/premium" },
                  { icon: Bell, label: "Notification settings", to: "#" },
                  { icon: Shield, label: "Privacy & data", to: "#" },
                  { icon: Mail, label: "Newsletter preferences", to: "#" },
                ].map(({ icon: Icon, label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="flex items-center gap-3 text-sm text-gray-700 hover:text-red-600 transition-colors group py-2.5"
                  >
                    <Icon size={14} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                    {label}
                    <ChevronRight size={12} className="text-gray-300 ml-auto group-hover:text-red-600 transition-colors" />
                  </Link>
                ))}
                <button
                  onClick={() => { signOut(); navigate("/"); }}
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-red-600 transition-colors group mt-1 pt-3 border-t border-gray-200"
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            </div>

            {/* Newsletters */}
            <div className="bg-white border border-gray-200 rounded-sm p-5">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                <h2 className="text-base" style={{ fontFamily: "Georgia, serif" }}>Newsletters</h2>
                <Mail size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-col divide-y divide-gray-100">
                {newsletters.map((n) => (
                  <div key={n.name} className="flex items-center justify-between py-2.5">
                    <div>
                      <p className="text-sm text-gray-900">{n.name}</p>
                      <p className="text-xs text-gray-400">{n.freq}</p>
                    </div>
                    <button
                      className={`text-xs px-3 py-1 rounded-sm transition-colors flex-shrink-0 ml-3 ${
                        n.subscribed
                          ? "bg-black text-white hover:bg-gray-800"
                          : "border border-gray-300 text-gray-600 hover:border-black hover:text-black"
                      }`}
                    >
                      {n.subscribed ? "Subscribed" : "Subscribe"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending topics */}
            <div className="bg-white border border-gray-200 rounded-sm p-5">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                <h2 className="text-base" style={{ fontFamily: "Georgia, serif" }}>Trending for you</h2>
                <TrendingUp size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {["AI", "Fed Policy", "India Markets", "Billionaires", "EV", "Cybersecurity", "NVIDIA", "OpenAI", "Clean Energy", "Supply Chain"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
