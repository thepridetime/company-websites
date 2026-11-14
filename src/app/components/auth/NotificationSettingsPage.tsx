import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { ArrowLeft, Bell, Mail, Shield, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  NEWSLETTER_CATALOG,
  getNewsletterPreferences,
  setNewsletterSubscribed,
} from "../../../lib/newsletterPreferences";

type EditorialAlert = {
  key: string;
  title: string;
  description: string;
};

const EDITORIAL_ALERTS: EditorialAlert[] = [
  {
    key: "breaking-news",
    title: "Breaking News & Special Bulletins",
    description: "Real-time alerts on major market disruptions, policy decisions, and global business events.",
  },
  {
    key: "morning-digest",
    title: "Morning Market Briefing",
    description: "Daily pre-market analysis delivered every morning before markets open.",
  },
  {
    key: "executive-briefing",
    title: "Executive & Leadership Roundups",
    description: "Exclusive CEO interviews, corporate governance summaries, and long-term strategic insights.",
  },
];

export function NotificationSettingsPage() {
  const { user, isSignedIn, isLoading } = useAuth();
  const [prefs, setPrefs] = useState<Record<string, boolean>>({});
  const [editorialPrefs, setEditorialPrefs] = useState<Record<string, boolean>>({
    "breaking-news": true,
    "morning-digest": true,
    "executive-briefing": false,
  });
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    // Load saved editorial prefs from localStorage if available
    try {
      const savedEd = localStorage.getItem(`tpt_editorial_alerts_${user.id}`);
      if (savedEd) {
        setEditorialPrefs(JSON.parse(savedEd));
      }
    } catch {
      // ignore
    }

    getNewsletterPreferences(user.id)
      .then(setPrefs)
      .catch(() => setError("Could not load your newsletter preferences."))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (!isLoading && !isSignedIn) return <Navigate to="/login" replace />;

  const toggleNewsletter = async (key: string) => {
    if (!user || pending) return;
    const next = !prefs[key];
    setPending(key);
    setError("");
    setSavedSuccess(false);
    setPrefs((p) => ({ ...p, [key]: next })); // optimistic

    const ok = await setNewsletterSubscribed(user.id, key, next);
    if (!ok) {
      setPrefs((p) => ({ ...p, [key]: !next })); // roll back
      setError("Could not save that change. Please try again.");
    } else {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
    setPending(null);
  };

  const toggleEditorialAlert = (key: string) => {
    if (!user) return;
    const next = !editorialPrefs[key];
    const updated = { ...editorialPrefs, [key]: next };
    setEditorialPrefs(updated);
    try {
      localStorage.setItem(`tpt_editorial_alerts_${user.id}`, JSON.stringify(updated));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto px-4 py-10 pb-20">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
        >
          <ArrowLeft size={14} /> Back to dashboard
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">
              Notification Settings
            </h1>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Manage how and when The Pride Times sends you editorial alerts and newsletter editions.
            </p>
          </div>
          {savedSuccess && (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-sm">
              <Check size={14} /> Preferences updated
            </div>
          )}
        </div>

        {/* Editorial Alerts */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <Bell size={16} className="text-red-600" />
            <h2 className="text-base font-serif font-bold text-gray-900">
              Editorial & Market Alerts
            </h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-sm divide-y divide-gray-200">
            {EDITORIAL_ALERTS.map((alert) => {
              const on = !!editorialPrefs[alert.key];
              return (
                <div key={alert.key} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="max-w-xl">
                    <p className="text-sm font-semibold text-gray-800">{alert.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{alert.description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={`${alert.title} alerts`}
                    onClick={() => toggleEditorialAlert(alert.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                      on ? "bg-red-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                        on ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletters Subscriptions */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-3">
            <Mail size={16} className="text-red-600" />
            <h2 className="text-base font-serif font-bold text-gray-900">
              Email Newsletters
            </h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-sm divide-y divide-gray-200">
            {NEWSLETTER_CATALOG.map((n) => {
              const on = !!prefs[n.key];
              return (
                <div key={n.key} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{n.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.freq}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={`${n.name} emails`}
                    disabled={loading || pending === n.key}
                    onClick={() => toggleNewsletter(n.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer disabled:opacity-60 ${
                      on ? "bg-red-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                        on ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
