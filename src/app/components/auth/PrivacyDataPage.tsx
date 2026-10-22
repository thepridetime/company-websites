// Target path: src/app/components/auth/PrivacyDataPage.tsx
// Route: /dashboard/privacy
// Export, clear history, clear saved articles. Account deletion is a support request:
// deleting an auth user needs a service-role edge function, which this repo doesn't have yet.
import { useState } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { clearReadingHistory } from "../../../lib/readingHistory";
import { clearSavedArticles, downloadDataPdf, exportUserData } from "../../../lib/accountData";

// Replace with your real support address before release.
const SUPPORT_EMAIL = "pridetimenews@gmail.com";

export function PrivacyDataPage() {
  const { user, isSignedIn, isLoading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  if (!isLoading && !isSignedIn) return <Navigate to="/login" replace />;
  if (isLoading || !user) return null;

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setMessage(null);
    try {
      await action();
    } catch {
      setMessage({ kind: "error", text: "Something went wrong. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  const onExport = () =>
    run(async () => {
      const data = await exportUserData(user.id, user.email);
      downloadDataPdf(`pride-times-data-${new Date().toISOString().slice(0, 10)}.pdf`, data);
      setMessage({ kind: "ok", text: "Your data file has been downloaded." });
    });

  const onClearHistory = () => {
    if (!window.confirm("Clear your reading history? This cannot be undone.")) return;
    run(async () => {
      const ok = await clearReadingHistory(user.id);
      setMessage(ok ? { kind: "ok", text: "Reading history cleared." } : { kind: "error", text: "Could not clear reading history." });
    });
  };

  const onClearSaved = () => {
    if (!window.confirm("Remove all saved articles? This cannot be undone.")) return;
    run(async () => {
      const ok = await clearSavedArticles(user.id);
      setMessage(ok ? { kind: "ok", text: "Saved articles removed." } : { kind: "error", text: "Could not remove saved articles." });
    });
  };

  const rowCls = "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4";
  const btnCls =
    "self-start sm:self-auto border border-gray-300 hover:border-red-600 hover:text-red-600 disabled:opacity-60 text-sm px-4 py-2 rounded-sm transition-colors";

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-xl mx-auto px-4 py-10">
        <Link to="/dashboard" className="text-sm text-gray-500 hover:text-red-600">
          ← Back to dashboard
        </Link>
        <h1 className="mt-4 text-2xl" style={{ fontFamily: "Georgia, serif" }}>
          Privacy & data
        </h1>

        {message && (
          <p className={`mt-4 text-sm ${message.kind === "error" ? "text-red-600" : "text-green-700"}`}>
            {message.text}
          </p>
        )}

        <div className="mt-8 bg-white border border-gray-200 rounded-sm divide-y divide-gray-200">
          <div className={rowCls}>
            <div>
              <p className="text-sm text-gray-800">Download your data</p>
              <p className="text-xs text-gray-400">Reading history, saved articles and newsletter preferences as a PDF file.</p>
            </div>
            <button type="button" disabled={busy} onClick={onExport} className={btnCls}>
              Download
            </button>
          </div>

          <div className={rowCls}>
            <div>
              <p className="text-sm text-gray-800">Clear reading history</p>
              <p className="text-xs text-gray-400">Removes all articles from your reading history and streak.</p>
            </div>
            <button type="button" disabled={busy} onClick={onClearHistory} className={btnCls}>
              Clear history
            </button>
          </div>

          <div className={rowCls}>
            <div>
              <p className="text-sm text-gray-800">Remove saved articles</p>
              <p className="text-xs text-gray-400">Removes everything on your saved list.</p>
            </div>
            <button type="button" disabled={busy} onClick={onClearSaved} className={btnCls}>
              Remove all
            </button>
          </div>

          <div className={rowCls}>
            <div>
              <p className="text-sm text-gray-800">Delete account</p>
              <p className="text-xs text-gray-400">Permanently deletes your account and all data. Requests are handled by support.</p>
            </div>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Account deletion request")}&body=${encodeURIComponent(`Please delete the account for ${user.email}.`)}`}
              className={btnCls}
            >
              Request deletion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
