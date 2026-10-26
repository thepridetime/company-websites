// Target path: src/app/components/NewsletterCTA.tsx
// Shared newsletter box used across section pages. Same look and behaviour as the CEO Spotlight box:
// - Signed in, not subscribed: one "Subscribe Free" button, no email field.
// - Signed in, subscribed: green "Subscribed" button.
// - Signed out: email field, then goes to /login with the email pre-filled.
import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  getNewsletterPreferences,
  setNewsletterSubscribed,
} from "../../lib/newsletterPreferences";

type NewsletterCTAProps = {
  title: string;
  description: string;
  /** Must match a key in newsletterPreferences.ts and the newsletter-notify edge function. */
  newsletterKey: string;
  className?: string;
};

export function NewsletterCTA({
  title,
  description,
  newsletterKey,
  className = "",
}: NewsletterCTAProps) {
  const { user, isSignedIn, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Load the real subscription state for the signed-in user.
  useEffect(() => {
    if (!isSignedIn || !user) {
      setIsSubscribed(false);
      return;
    }

    let cancelled = false;
    setChecking(true);

    getNewsletterPreferences(user.id)
      .then((prefs) => {
        if (!cancelled) setIsSubscribed(prefs[newsletterKey] === true);
      })
      .catch(() => {
        // Error is logged in the helper. Keep the subscribe button available.
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isSignedIn, user?.id, newsletterKey]);

  function showError(message: string) {
    setStatus("error");
    setErrorMessage(message);
  }

  // Signed-in user: subscribe the account directly.
  async function handleSubscribeAccount() {
    if (!user || status === "saving") return;

    setStatus("saving");
    setErrorMessage("");

    const ok = await setNewsletterSubscribed(user.id, newsletterKey, true);

    if (ok) {
      setIsSubscribed(true);
      setStatus("idle");
    } else {
      showError("Could not subscribe right now. Please try again in a moment.");
    }
  }

  // Signed-out user: keep the typed email and continue to login.
  function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const typedEmail = email.trim().toLowerCase();

    if (!typedEmail) {
      showError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(typedEmail)) {
      showError("Please enter a valid email address.");
      return;
    }

    navigate("/login", {
      state: { from: location.pathname, email: typedEmail },
    });
  }

  const inputClass =
    "flex-1 rounded-[2px] border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-white/50";

  const buttonClass =
    "whitespace-nowrap rounded-[2px] bg-red-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60";

  function renderAction() {
    if (isLoading) return null;

    if (checking) {
      return (
        <button type="button" disabled className={buttonClass}>
          Checking...
        </button>
      );
    }

    if (isSignedIn && isSubscribed) {
      return (
        <button
          type="button"
          disabled
          className="whitespace-nowrap rounded-[2px] bg-green-700 px-8 py-3 text-sm font-semibold text-white cursor-default"
        >
          Subscribed
        </button>
      );
    }

    if (isSignedIn) {
      return (
        <button
          type="button"
          onClick={handleSubscribeAccount}
          disabled={status === "saving"}
          className={buttonClass}
        >
          {status === "saving" ? "Subscribing..." : "Subscribe Free"}
        </button>
      );
    }

    return (
      <form
        onSubmit={handleEmailSubmit}
        noValidate
        className="mx-auto flex max-w-md flex-col justify-center gap-3 sm:flex-row"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter your email"
          aria-label="Email address"
          className={inputClass}
        />
        <button type="submit" className={buttonClass}>
          Subscribe Free
        </button>
      </form>
    );
  }

  return (
    <section
      className={`rounded-[2px] bg-[#0b1a30] p-8 text-center text-white md:p-10 ${className}`}
    >
      <h2 className="mb-2 font-serif text-2xl md:text-[30px]">{title}</h2>

      <p className="mb-6 text-sm text-gray-400">{description}</p>

      {renderAction()}

      {status === "error" && errorMessage && (
        <p className="mt-4 text-xs text-red-300">{errorMessage}</p>
      )}
    </section>
  );
}
