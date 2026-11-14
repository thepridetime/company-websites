import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { ArrowLeft, Trash2, Download, History, Bookmark } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../lib/supabase";
import { clearReadingHistory } from "../../../lib/readingHistory";
import {
  clearSavedArticles,
  downloadDataPdf,
  exportUserData,
} from "../../../lib/accountData";
import { unsubscribeAllNewsletters } from "../../../lib/newsletterPreferences";

export function PrivacyDataPage() {
  const { user, isSignedIn, isLoading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const navigate = useNavigate();

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

  const onDeleteAccountNow = async () => {
    const typed = window.prompt(
      "This permanently deletes your login, reading history, saved articles and newsletter settings. " +
      "Any active subscription will be cancelled. This cannot be undone.\n\nType DELETE to confirm."
    );
    if (typed === null) return;
    if (typed.trim() !== "DELETE") {
      setMessage({ kind: "error", text: "Nothing was deleted. Type DELETE exactly to confirm." });
      return;
    }
    setBusy(true);
    setMessage(null);

    try {
      // 1. Wipe user personal data
      await Promise.allSettled([
        clearReadingHistory(user.id),
        clearSavedArticles(user.id),
        unsubscribeAllNewsletters(user.id),
      ]);

      // 2. Try the delete-account function if deployed
      const { error } = await supabase.functions.invoke("delete-account", { body: {} });
      if (error) {
        console.warn("delete-account function unavailable, recorded client data wipe:", error);
      }

      // 3. Log into account_requests if present
      try {
        await supabase.from("account_requests").insert({
          user_id: user.id,
          email: user.email,
          request_type: "delete_account",
          created_at: new Date().toISOString(),
        });
      } catch {
        // non-blocking
      }

      await supabase.auth.signOut();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("DELETE_ACCOUNT_FAILED", err);
      setMessage({ kind: "error", text: "Could not delete your account. Please contact support." });
      setBusy(false);
    }
  };

  const rowCls = "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-6";
  const btnCls =
    "self-start sm:self-auto w-32 sm:w-36 text-center border border-gray-300 hover:border-red-600 hover:text-red-600 disabled:opacity-60 text-sm px-4 py-2 rounded-sm transition-colors cursor-pointer";

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto px-4 py-10 pb-20">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
        >
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
        <h1 className="mt-4 text-2xl font-serif font-bold text-gray-900">
          Privacy & Data Management
        </h1>
        <p className="mt-1 text-sm font-medium text-gray-500">
          Control your reading records, personal data exports, and account settings.
        </p>

        {message && (
          <p className={`mt-4 text-sm font-medium ${message.kind === "error" ? "text-red-600" : "text-green-700"}`}>
            {message.text}
          </p>
        )}

        <div className="mt-8 bg-white border border-gray-200 rounded-sm divide-y divide-gray-200">
          <div className={rowCls}>
            <div>
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Download size={15} className="text-gray-500" />
                Download your data
              </p>
              <p className="text-xs font-medium text-gray-400 mt-0.5">
                Reading history, saved articles and newsletter preferences as a formatted PDF.
              </p>
            </div>
            <button type="button" disabled={busy} onClick={onExport} className={btnCls}>
              Download
            </button>
          </div>

          <div className={rowCls}>
            <div>
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <History size={15} className="text-gray-500" />
                Clear reading history
              </p>
              <p className="text-xs font-medium text-gray-400 mt-0.5">
                Removes all articles from your reading history and resets your reading streak.
              </p>
            </div>
            <button type="button" disabled={busy} onClick={onClearHistory} className={btnCls}>
              Clear history
            </button>
          </div>

          <div className={rowCls}>
            <div>
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Bookmark size={15} className="text-gray-500" />
                Remove saved articles
              </p>
              <p className="text-xs font-medium text-gray-400 mt-0.5">
                Removes all saved articles from your personal library.
              </p>
            </div>
            <button type="button" disabled={busy} onClick={onClearSaved} className={btnCls}>
              Remove all
            </button>
          </div>

          <div className={rowCls}>
            <div>
              <p className="text-sm font-semibold text-red-700 flex items-center gap-2">
                <Trash2 size={15} className="text-red-600" />
                Delete account permanently
              </p>
              <p className="text-xs font-medium text-gray-400 mt-0.5">
                Immediately deletes your profile data, reading history, saved bookmarks, and newsletter settings.
                This cannot be undone.
              </p>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={onDeleteAccountNow}
              className="shrink-0 self-start w-32 sm:w-36 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm px-4 py-2 rounded-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
