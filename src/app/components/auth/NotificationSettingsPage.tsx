// DRAFT - not wired in yet. Review before merging.
// Target path: src/app/components/auth/NotificationSettingsPage.tsx
// Route: /dashboard/notifications
// Uses the shared newsletter helpers from src/lib/newsletterPreferences.ts.
// Covers newsletter emails only. Push/breaking-news alerts need a backend that doesn't exist yet.
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  NEWSLETTER_CATALOG,
  getNewsletterPreferences,
  setNewsletterSubscribed,
} from "../../../lib/newsletterPreferences";

export function NotificationSettingsPage() {
  const { user, isSignedIn, isLoading } = useAuth();
  const [prefs, setPrefs] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getNewsletterPreferences(user.id)
      .then(setPrefs)
      .catch(() => setError("Could not load your preferences."))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (!isLoading && !isSignedIn) return <Navigate to="/login" replace />;

  const toggle = async (key: string) => {
    if (!user || pending) return;
    const next = !prefs[key];
    setPending(key);
    setError("");
    setPrefs((p) => ({ ...p, [key]: next })); // optimistic
    const ok = await setNewsletterSubscribed(user.id, key, next);
    if (!ok) {
      setPrefs((p) => ({ ...p, [key]: !next })); // roll back
      setError("Could not save that change. Please try again.");
    }
    setPending(null);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link to="/dashboard" className="text-sm font-medium text-gray-500 hover:text-red-600">
          ← Back to dashboard
        </Link>
        <h1 className="mt-4 text-2xl font-medium" style={{ fontFamily: "Georgia, serif" }}>
          Notification settings
        </h1>
        <p className="mt-2 text-sm font-medium text-gray-500">Choose which newsletters you receive by email.</p>

        <div className="mt-8 bg-white border border-gray-200 rounded-sm divide-y divide-gray-200">
          {NEWSLETTER_CATALOG.map((n) => {
            const on = !!prefs[n.key];
            return (
              <div key={n.key} className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-800">{n.name}</p>
                  <p className="text-xs font-medium text-gray-400">{n.freq}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={`${n.name} emails`}
                  disabled={loading || pending === n.key}
                  onClick={() => toggle(n.key)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-60 ${
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

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
