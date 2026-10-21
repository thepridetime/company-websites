import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  User, BookOpen, Star, Bell, CreditCard, Settings,
  TrendingUp, Bookmark, Clock, Globe, LogOut, Crown,
  ChevronRight, Newspaper, Mail, Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import logoImg from "../../../imports/logo.png";
import { supabase } from "../../../lib/supabase";

type ReadItem = { title: string; category: string; path: string; read_at: string };
type SavedItem = { title: string; category: string; path: string; saved_at: string };

const CATEGORY_COLORS: Record<string, string> = {
  Finance: "#dc2626",
  Technology: "#2563eb",
  Billionaires: "#ca8a04",
  World: "#0d9488",
  Healthcare: "#7c3aed",
};
const colorFor = (category: string) => CATEGORY_COLORS[category] ?? "#6b7280";

const NEWSLETTER_CATALOG = [
  { key: "daily-brief", name: "The Daily Brief", freq: "Every morning" },
  { key: "markets-morning", name: "Markets Morning", freq: "Weekdays 7am IST" },
  { key: "technology-weekly", name: "Technology Weekly", freq: "Every Monday" },
  { key: "billionaires-tracker", name: "Billionaires Tracker", freq: "Every Friday" },
  { key: "india-business-digest", name: "India Business Digest", freq: "Daily" },
];

const TRENDING_TAGS = ["AI", "Fed Policy", "India Markets", "Billionaires", "EV", "Cybersecurity", "NVIDIA", "OpenAI", "Clean Energy", "Supply Chain"];

const premiumFeatures = [
  { icon: Shield, title: "Ad-free reading", desc: "No ads on any page" },
  { icon: Newspaper, title: "Full archive access", desc: "25+ years of Pride Times" },
  { icon: Mail, title: "Priority newsletters", desc: "Early edition & alerts" },
  { icon: Globe, title: "Global editions", desc: "India, US, UK & Asia" },
  { icon: Star, title: "Exclusive interviews", desc: "CEO Q&As & profiles" },
  { icon: BookOpen, title: "Analyst reports", desc: "Market deep-dives" },
];

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function calcStreak(readDates: string[]): number {
  const days = new Set(readDates.map((iso) => dayKey(new Date(iso))));
  const cursor = new Date();
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

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

      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const [authRes, recentRes, datesRes, savedRes, nlRes] = await Promise.all([
        supabase.auth.getUser(),
        supabase
          .from("reading_history")
          .select("title, category, path, read_at")
          .eq("user_id", user.id)
          .order("read_at", { ascending: false })
          .limit(30),
        supabase
          .from("reading_history")
          .select("read_at")
          .eq("user_id", user.id)
          .order("read_at", { ascending: false })
          .limit(1000),
        supabase
          .from("saved_articles")
          .select("title, category, path, saved_at")
          .eq("user_id", user.id)
          .order("saved_at", { ascending: false }),
        supabase
          .from("newsletter_subscriptions")
          .select("newsletter_key, subscribed")
          .eq("user_id", user.id),
      ]);

      if (cancelled) return;

      if (authRes.data?.user?.created_at) {
        setJoinedDate(
          new Date(authRes.data.user.created_at).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })
        );
      }

      if (recentRes.error) console.error("RECENT_FETCH_FAILED", recentRes.error);
      const seen = new Set<string>();
      const distinct: ReadItem[] = [];
      for (const row of recentRes.data ?? []) {
        const k = `${row.path}|${row.title}`;
        if (seen.has(k)) continue;
        seen.add(k);
        distinct.push(row as ReadItem);
        if (distinct.length === 5) break;
      }
      setRecentlyRead(distinct);

      if (datesRes.error) console.error("READ_DATES_FETCH_FAILED", datesRes.error);
      const dates = (datesRes.data ?? []).map((r) => r.read_at as string);
      setArticlesThisMonth(dates.filter((d) => new Date(d) >= monthStart).length);
      setStreak(calcStreak(dates));

      if (savedRes.error) console.error("SAVED_FETCH_FAILED", savedRes.error);
      setSavedArticles((savedRes.data ?? []) as SavedItem[]);

      if (nlRes.error) console.error("NEWSLETTER_FETCH_FAILED", nlRes.error);
      const map: Record<string, boolean> = {};
      for (const row of nlRes.data ?? []) map[row.newsletter_key] = row.subscribed;
      setSubscribed(map);

      setDataLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const toggleNewsletter = async (key: string) => {
    if (!user?.id) return;
    const next = !subscribed[key];
    setSubscribed((prev) => ({ ...prev, [key]: next }));

    const { error } = await supabase
      .from("newsletter_subscriptions")
      .upsert(
        { user_id: user.id, newsletter_key: key, subscribed: next, updated_at: new Date().toISOString() },
        { onConflict: "user_id,newsletter_key" }
      );

    if (error) {
      console.error("NEWSLETTER_SAVE_FAILED", error);
      setSubscribed((prev) => ({ ...prev, [key]: !next }));
    }
  };

  const scrollToNewsletters = () =>
    document.getElementById("newsletters")?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading your dashboard…
      </div>
    );
  }
  if (!user) return null;

  const isPremium = user.tier === "premium";

  const stats = [
    { icon: BookOpen, label: "Articles read", value: String(articlesThisMonth), sub: "this month" },
    { icon: Bookmark, label: "Saved", value: String(savedArticles.length), sub: "in your library" },
    { icon: Clock, label: "Reading streak", value: String(streak), sub: streak === 1 ? "day running" : "days running" },
    { icon: Globe, label: "Edition", value: user.country || "Global", sub: "your region" },
  ];

  const accountItems: any[] = [
    { icon: CreditCard, label: isPremium ? "Manage subscription" : "Upgrade to Premium", to: "/premium" },
    { icon: Mail, label: "Newsletter preferences", onClick: scrollToNewsletters },
    { icon: User, label: "Edit profile", to: "/dashboard/profile" },
    { icon: Bell, label: "Notification settings", to: "/dashboard/notifications" },
    { icon: Shield, label: "Privacy & data", to: "/dashboard/privacy" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6]">
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
                {joinedDate && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span>Member since {joinedDate}</span>
                  </>
                )}
                {user.country && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span>Reading from {user.country}</span>
                  </>
                )}
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

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border border-gray-200 rounded-sm mb-10 bg-white">
          {stats.map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="p-5">
              <Icon size={15} className="text-gray-400 mb-3" />
              <p className="text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                {dataLoading && label !== "Edition" ? "–" : value}
              </p>
              <p className="text-sm text-gray-700 mt-1">{label}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl" style={{ fontFamily: "Georgia, serif" }}>Continue reading</h2>
                <Clock size={14} className="text-gray-400" />
              </div>
              <div className="divide-y divide-gray-200 border-t border-gray-200 mt-3">
                {!dataLoading && recentlyRead.length === 0 && (
                  <p className="py-6 text-sm text-gray-500">Articles you read will show up here.</p>
                )}
                {recentlyRead.map((a) => {
                  const color = colorFor(a.category);
                  return (
                    <Link
                      key={`${a.path}|${a.title}`}
                      to={a.path}
                      className="flex items-center justify-between py-4 group relative pl-0 hover:pl-3 transition-all duration-200"
                    >
                      <span
                        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: color }}
                      />
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                          {a.category}
                        </span>
                        <p className="text-[15px] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                          {a.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                        <span className="text-xs text-gray-400 whitespace-nowrap">{timeAgo(a.read_at)}</span>
                        <ChevronRight size={13} className="text-gray-300 group-hover:text-red-600 transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl" style={{ fontFamily: "Georgia, serif" }}>Saved articles</h2>
                <Bookmark size={14} className="text-gray-400" />
              </div>
              <div className="divide-y divide-gray-200 border-t border-gray-200 mt-3">
                {!dataLoading && savedArticles.length === 0 && (
                  <p className="py-6 text-sm text-gray-500">You haven’t saved any articles yet.</p>
                )}
                {savedArticles.map((a) => (
                  <Link
                    key={`${a.path}|${a.title}`}
                    to={a.path}
                    className="py-4 flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs text-gray-500">{a.category}</span>
                      <p className="text-[15px] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">{a.title}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{shortDate(a.saved_at)}</span>
                  </Link>
                ))}
              </div>
            </div>

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
                  <p className="text-gray-400 text-sm mt-2 mb-6">From ₹299/month — cancel anytime.</p>
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

          <div className="flex flex-col gap-8">
            <div className="bg-white border border-gray-200 rounded-sm p-5">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                <h2 className="text-base" style={{ fontFamily: "Georgia, serif" }}>Account</h2>
                <Settings size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-col">
                {accountItems.map(({ icon: Icon, label, to, onClick, soon }) => {
                  const inner = (
                    <>
                      <Icon size={14} className={soon ? "text-gray-300" : "text-gray-400 group-hover:text-red-600 transition-colors"} />
                      {label}
                      {soon ? (
                        <span className="ml-auto text-[10px] uppercase tracking-wider text-gray-400">Soon</span>
                      ) : (
                        <ChevronRight size={12} className="text-gray-300 ml-auto group-hover:text-red-600 transition-colors" />
                      )}
                    </>
                  );
                  const cls = "flex items-center gap-3 text-sm text-gray-700 hover:text-red-600 transition-colors group py-2.5 w-full text-left";
                  if (soon) {
                    return (
                      <div key={label} className="flex items-center gap-3 text-sm text-gray-400 py-2.5">
                        {inner}
                      </div>
                    );
                  }
                  if (onClick) {
                    return (
                      <button key={label} type="button" onClick={onClick} className={cls}>
                        {inner}
                      </button>
                    );
                  }
                  return (
                    <Link key={label} to={to} className={cls}>
                      {inner}
                    </Link>
                  );
                })}
                <button
                  onClick={() => { signOut(); navigate("/"); }}
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-red-600 transition-colors group mt-1 pt-3 border-t border-gray-200"
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            </div>

            <div id="newsletters" className="bg-white border border-gray-200 rounded-sm p-5 scroll-mt-6">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                <h2 className="text-base" style={{ fontFamily: "Georgia, serif" }}>Newsletters</h2>
                <Mail size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-col divide-y divide-gray-100">
                {NEWSLETTER_CATALOG.map((n) => {
                  const isOn = !!subscribed[n.key];
                  return (
                    <div key={n.key} className="flex items-center justify-between py-2.5">
                      <div>
                        <p className="text-sm text-gray-900">{n.name}</p>
                        <p className="text-xs text-gray-400">{n.freq}</p>
                      </div>
                      <button
                        onClick={() => toggleNewsletter(n.key)}
                        className={`text-xs px-3 py-1 rounded-sm transition-colors flex-shrink-0 ml-3 ${
                          isOn
                            ? "bg-black text-white hover:bg-gray-800"
                            : "border border-gray-300 text-gray-600 hover:border-black hover:text-black"
                        }`}
                      >
                        {isOn ? "Subscribed" : "Subscribe"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-sm p-5">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                <h2 className="text-base" style={{ fontFamily: "Georgia, serif" }}>Trending for you</h2>
                <TrendingUp size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TAGS.map((tag) => (
                  <Link
                    key={tag}
                    to={`/search?q=${encodeURIComponent(tag)}`}
                    className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-sm hover:bg-black hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
