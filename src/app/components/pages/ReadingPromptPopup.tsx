import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

/* Subscription wall shown after a reader has spent some time on an article.
   - Appears 10 seconds after the article opens.
   - The article behind is fully obscured (dark, blurred overlay).
   - Premium members never see it.
   - Dismissed with "Maybe later" or the Escape key; stays hidden for that
     article for the rest of the browser session.
   - Shows no prices. */

const PROMPT_DELAY_MS = 10_000;
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

  /* Start the timer. If the reader has switched tabs when it fires,
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

  /* While open: Escape dismisses, and the page behind cannot scroll. */
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
    <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/90 backdrop-blur-md antialiased">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="read-prompt-title"
        className="relative w-full bg-red-600 text-white"
      >
        <div className="mx-auto max-w-4xl px-6 pb-8 pt-14 text-center sm:pt-16">
          <h2
            id="read-prompt-title"
            className="font-sans text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-[32px]"
          >
            Get unlimited access to The Pride Times
          </h2>

          <p className="mt-3 text-sm text-red-100 sm:text-base">
            Keep reading unlimited articles, full archive access and ad-free reading.
          </p>

          <Link
            to="/premium"
            onClick={dismiss}
            className="mt-7 inline-block rounded-sm bg-white px-8 py-3 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-600"
          >
            Subscribe to keep reading
          </Link>

          <button
            type="button"
            onClick={dismiss}
            className="mt-4 block w-full text-xs text-red-100 transition-colors duration-200 hover:text-white sm:mx-auto sm:w-auto"
          >
            Maybe later
          </button>
        </div>

        <div className="border-t border-white/20">
          <nav
            aria-label="Account and legal"
            className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-5 text-xs text-red-100"
          >
            <Link
              to="/login"
              onClick={dismiss}
              className="transition-colors duration-200 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              to="/terms"
              onClick={dismiss}
              className="transition-colors duration-200 hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              onClick={dismiss}
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
