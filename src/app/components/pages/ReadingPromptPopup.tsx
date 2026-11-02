import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Lock, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

/* Subscription prompt shown after a reader has spent some time on an article.
   - Premium members never see it.
   - Once dismissed, it stays hidden for that article for the rest of the browser session.
   - Shows no prices. */

const PROMPT_DELAY_MS = 45_000;
const STORAGE_PREFIX = "pt-read-prompt-seen:";

function wasDismissed(key: string) {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function markDismissed(key: string) {
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    /* storage unavailable (private mode); the prompt just may reappear */
  }
}

export function ReadingPromptPopup({
  delayMs = PROMPT_DELAY_MS,
}: {
  delayMs?: number;
}) {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();
  const storageKey = STORAGE_PREFIX + pathname;
  const isPremium = user?.tier === "premium";

  const [open, setOpen] = useState(false);

  /* Start the reading timer. If the reader has switched tabs when it fires,
     wait until the tab is visible again before showing the prompt. */
  useEffect(() => {
    if (isLoading || isPremium || wasDismissed(storageKey)) return;

    let timer: number | undefined;
    let cancelled = false;

    const show = () => {
      if (cancelled) return;
      if (document.visibilityState === "visible") {
        setOpen(true);
      } else {
        document.addEventListener("visibilitychange", onVisible);
      }
    };

    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onVisible);
      show();
    };

    timer = window.setTimeout(show, delayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [isLoading, isPremium, storageKey, delayMs]);

  const dismiss = useCallback(() => {
    markDismissed(storageKey);
    setOpen(false);
  }, [storageKey]);

  /* While open: close on Escape and stop the page behind from scrolling. */
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 antialiased"
      onClick={dismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="read-prompt-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md rounded-xl bg-white p-7 text-center shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <X size={16} />
        </button>

        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-amber-400">
          <Lock size={16} />
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
          The Pride Times
        </p>

        <h2
          id="read-prompt-title"
          className="mt-2 font-serif text-2xl font-bold leading-tight text-slate-950"
        >
          Enjoying this story?
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
          Subscribe to keep reading unlimited articles, get full access to our
          archive and enjoy an ad-free experience.
        </p>

        <Link
          to="/premium"
          onClick={dismiss}
          className="mt-6 inline-block w-full rounded-sm bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Subscribe to keep reading
        </Link>

        <div className="mt-4 flex flex-col items-center gap-2 text-xs">
          <Link
            to="/login"
            onClick={dismiss}
            className="font-semibold text-slate-700 underline-offset-4 hover:text-red-600 hover:underline"
          >
            Already a subscriber? Sign in
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="text-slate-500 transition-colors duration-200 hover:text-slate-800"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
