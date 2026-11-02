import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

/* Subscription wall shown 10 seconds after an article opens.
   - Appears on every visit to the article, including after the reader
     comes back from the subscribe or sign-in pages without subscribing.
   - No close, skip or "maybe later" control.
   - Pressing Escape leaves the article and returns the reader to the home page.
   - The article behind is fully obscured (dark, blurred overlay).
   - Premium members never see it.
   - The timer starts as soon as the article mounts; it does not wait for
     the account check to finish.
   - Shows no prices. */

const PROMPT_DELAY_MS = 10_000;

export function ReadingPromptPopup({
  delayMs = PROMPT_DELAY_MS,
}: {
  delayMs?: number;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isPremium = user?.tier === "premium";

  const [open, setOpen] = useState(false);

  /* Keep the latest premium status in a ref so the timer can read it
     without being restarted every time the account check finishes. */
  const isPremiumRef = useRef(isPremium);
  isPremiumRef.current = isPremium;

  /* Start the timer when the article mounts. If the reader has switched
     tabs when it fires, wait until the tab is visible again. */
  useEffect(() => {
    let timer: number | undefined;
    let cancelled = false;

    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onVisible);
      show();
    };

    const show = () => {
      if (cancelled) return;
      if (document.visibilityState === "visible") {
        setOpen(true);
      } else {
        document.addEventListener("visibilitychange", onVisible);
      }
    };

    timer = window.setTimeout(show, delayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [delayMs]);

  /* While open: Escape leaves the article, and the page behind cannot scroll. */
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        navigate("/");
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, navigate]);

  /* Premium members never see the wall, even if it was already open
     while their account was still loading. */
  if (!open || isPremium) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/90 backdrop-blur-md antialiased">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="read-prompt-title"
        className="relative w-full bg-black text-white"
      >
        <div className="mx-auto max-w-4xl px-6 pb-8 pt-14 text-center sm:pt-16">
          <h2
            id="read-prompt-title"
            className="font-sans text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-[32px]"
          >
            Get unlimited access to The Pride Times
          </h2>

          <p className="mt-3 text-sm text-zinc-300 sm:text-base">
            Keep reading unlimited articles, full archive access and ad-free reading.
          </p>

          <Link
            to="/premium"
            className="mt-7 inline-block rounded-sm bg-white px-8 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Subscribe to keep reading
          </Link>
        </div>

        <div className="border-t border-white/20">
          <nav
            aria-label="Account and legal"
            className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-5 text-xs text-zinc-300"
          >
            <Link to="/login" className="transition-colors duration-200 hover:text-white">
              Sign In
            </Link>
            <Link to="/terms" className="transition-colors duration-200 hover:text-white">
              Terms of Service
            </Link>
            <Link to="/privacy" className="transition-colors duration-200 hover:text-white">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
