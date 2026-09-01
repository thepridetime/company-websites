import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  User, BookOpen, Star, Bell, CreditCard, Settings,
  TrendingUp, Bookmark, Clock, Globe, LogOut, Crown,
  ChevronRight, BarChart2, Newspaper, Mail, Shield,
} from "lucide-react";
import { useEffect } from "react";
import logoImg from "../../../imports/logo.png";

const recentlyRead = [
  { title: "Global Markets Surge as Fed Signals Rate Cuts", category: "Finance", time: "2 hrs ago", path: "/finance" },
  { title: "OpenAI's New Model Surpasses Human Benchmarks", category: "Technology", time: "Yesterday", path: "/technology" },
  { title: "Elon Musk Adds $15B to Net Worth in Single Day", category: "Billionaires", time: "2 days ago", path: "/billionaires" },
  { title: "India Surpasses China as Fastest Growing Economy", category: "World", time: "3 days ago", path: "/world" },
  { title: "CRISPR Gene Editing Achieves 98% Success Rate", category: "Healthcare", time: "4 days ago", path: "/healthcare" },
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
  { icon: Shield, title: "Ad-Free Reading", desc: "No ads on any page" },
  { icon: BarChart2, title: "Exclusive Market Reports", desc: "Analyst reports & deep dives" },
  { icon: Newspaper, title: "Full Archive Access", desc: "25+ years of Pride Times content" },
  { icon: Mail, title: "Priority Newsletters", desc: "Early edition + premium alerts" },
  { icon: Globe, title: "Global Editions", desc: "Access India, US, UK, Asia editions" },
  { icon: Star, title: "Exclusive Interviews", desc: "CEO Q&As and leadership profiles" },
];

export function DashboardPage() {
 const { user, isSignedIn, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

 useEffect(() => {
  if (!isLoading && !isSignedIn) {
    navigate("/signin");
  }
}, [isLoading, isSignedIn, navigate]);
if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}
  if (!user) return null;

  const isPremium = user.tier === "premium";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard header */}
      <div className="bg-black text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="The Pride Times" className="h-10 w-auto object-contain mb-4"/>
            <span className="text-white text-sm">The Pride Times</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs text-gray-400 hover:text-white transition-colors">← Back to Home</Link>
            <button
              onClick={() => { signOut(); navigate("/"); }}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Welcome + tier badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl ${isPremium ? "bg-black" : "bg-gray-400"}`}>
              {user.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl">Welcome back, {user.name.split(" ")[0]}</h1>
                {isPremium && (
                  <span className="flex items-center gap-1 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded">
                    <Crown size={10} /> Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{user.email} · Joined {user.joinedDate} · {user.country}</p>
            </div>
          </div>
          {!isPremium && (
            <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-6 py-2.5 rounded transition-colors flex items-center gap-2">
              <Crown size={14} /> Upgrade to Premium
            </button>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: "Articles Read", value: "247", sub: "this month" },
            { icon: Bookmark, label: "Saved Articles", value: String(user.savedArticles), sub: "in library" },
            { icon: Clock, label: "Reading Streak", value: `${user.readingStreak} days`, sub: "keep it up!" },
            { icon: Globe, label: "Editions Read", value: "3", sub: "US, India, Global" },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="bg-white border border-gray-200 rounded p-4">
              <Icon size={16} className="text-gray-400 mb-2" />
              <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
              <p className="text-xl mt-0.5">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Recently Read + Saved */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Recently read */}
            <div className="bg-white border border-gray-200 rounded p-5">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <h2 className="text-sm uppercase tracking-wider">Continue Reading</h2>
                <Clock size={14} className="text-gray-400" />
              </div>
              <div className="divide-y divide-gray-100">
                {recentlyRead.map((a) => (
                  <Link key={a.title} to={a.path} className="flex items-center justify-between py-3 group">
                    <div>
                      <span className="text-xs text-red-600 uppercase tracking-wider">{a.category}</span>
                      <p className="text-sm group-hover:text-red-600 transition-colors mt-0.5">{a.title}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
                      <ChevronRight size={12} className="text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Saved articles */}
            <div className="bg-white border border-gray-200 rounded p-5">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <h2 className="text-sm uppercase tracking-wider">Saved Articles</h2>
                <Bookmark size={14} className="text-gray-400" />
              </div>
              <div className="divide-y divide-gray-100">
                {savedArticles.map((a) => (
                  <div key={a.title} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">{a.category}</span>
                      <p className="text-sm mt-0.5">{a.title}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{a.saved}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Features */}
            {!isPremium && (
              <div className="bg-black text-white rounded p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Crown size={16} className="text-yellow-400" />
                  <h2 className="text-sm uppercase tracking-wider text-yellow-400">Pride Times Premium</h2>
                </div>
                <p className="text-gray-400 text-sm mb-4">Upgrade for the complete experience. $4.99/month.</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {premiumFeatures.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-2">
                      <Icon size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-white">{title}</p>
                        <p className="text-xs text-gray-500">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded text-sm transition-colors">
                  Start Free 30-Day Trial
                </button>
              </div>
            )}
          </div>

          {/* Right — Profile + Newsletters */}
          <div className="flex flex-col gap-6">
            {/* Profile card */}
            <div className="bg-white border border-gray-200 rounded p-5">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <h2 className="text-sm uppercase tracking-wider">Account</h2>
                <Settings size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { icon: User, label: "Edit Profile", href: "#" },
                  { icon: CreditCard, label: isPremium ? "Manage Subscription" : "Upgrade to Premium", href: "#" },
                  { icon: Bell, label: "Notification Settings", href: "#" },
                  { icon: Shield, label: "Privacy & Data", href: "#" },
                  { icon: Mail, label: "Newsletter Preferences", href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3 text-sm hover:text-red-600 transition-colors group">
                    <Icon size={14} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                    {label}
                    <ChevronRight size={12} className="text-gray-300 ml-auto group-hover:text-red-600 transition-colors" />
                  </a>
                ))}
                <button
                  onClick={() => { signOut(); navigate("/"); }}
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-red-600 transition-colors group mt-1 pt-3 border-t border-gray-100"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Newsletters */}
            <div className="bg-white border border-gray-200 rounded p-5">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <h2 className="text-sm uppercase tracking-wider">Newsletters</h2>
                <Mail size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-col gap-3">
                {newsletters.map((n) => (
                  <div key={n.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{n.name}</p>
                      <p className="text-xs text-gray-400">{n.freq}</p>
                    </div>
                    <button
                      className={`text-xs px-3 py-1 rounded transition-colors ${
                        n.subscribed
                          ? "bg-black text-white hover:bg-gray-800"
                          : "border border-gray-300 text-gray-600 hover:border-black"
                      }`}
                    >
                      {n.subscribed ? "Subscribed" : "Subscribe"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending topics */}
            <div className="bg-white border border-gray-200 rounded p-5">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <h2 className="text-sm uppercase tracking-wider">Trending For You</h2>
                <TrendingUp size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {["AI", "Fed Policy", "India Markets", "Billionaires", "EV", "Cybersecurity", "NVIDIA", "OpenAI", "Clean Energy", "Supply Chain"].map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded hover:bg-black hover:text-white transition-colors cursor-pointer">
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
