import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Crown, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  FREE_PREMIUM_LIMIT,
  articleKey,
  getPremiumReadKeys,
  recordPremiumRead,
} from "../../lib/access";

/* Save as src/app/components/PremiumGate.tsx
   (fix the two import paths above if your folders differ).

   Usage:
     <PremiumGate title="Article title" category="Finance">...article...</PremiumGate>
        -> Premium: always open. Free: the first 3 different premium articles each month.
     <PremiumGate title="Analyst report" mode="premium-only">...</PremiumGate>
        -> Premium only (archive, analyst reports, exclusive interviews). */

type Props = {
  title: string;
  category?: string;
  mode?: "metered" | "premium-only";
  children: ReactNode;
};

type Decision = "checking" | "allowed" | "need-signin" | "limit-reached" | "premium-only";

export function PremiumGate({ title, category = "", mode = "metered", children }: Props) {
  const { user, isSignedIn, isLoading } = useAuth();
  const { pathname } = useLocation();
  const [decision, setDecision] = useState<Decision>("checking");
  const [used, setUsed] = useState(0);

  useEffect(() => {
    if (isLoading) return;
    let cancelled = false;

    const decide = async () => {
      if (!isSignedIn || !user) {
        setDecision("need-signin");
        return;
      }
      if (user.tier === "premium") {
        setDecision("allowed");
        return;
      }
      if (mode === "premium-only") {
        setDecision("premium-only");
        return;
      }

      setDecision("checking");
      try {
        const keys = await getPremiumReadKeys(user.id);
        if (cancelled) return;

        const key = articleKey(pathname, title);
        if (keys.has(key)) {
          setUsed(keys.size); // already counted this month, free to reopen
          setDecision("allowed");
          return;
        }
        if (keys.size >= FREE_PREMIUM_LIMIT) {
          setUsed(keys.size);
          setDecision("limit-reached");
          return;
        }

        const recorded = await recordPremiumRead(user.id, { title, category, path: pathname });
        if (cancelled) return;
        setUsed(keys.size + (recorded ? 1 : 0));
        setDecision("allowed");
      } catch {
        // If we cannot check, fail closed for the lock but tell the reader plainly
        if (!cancelled) setDecision("limit-reached");
      }
    };

    decide();
    return () => {
      cancelled = true;
    };
  }, [isLoading, isSignedIn, user?.id, user?.tier, pathname, title, category, mode]);

  if (decision === "checking") {
    return <div className="py-10 text-center text-sm text-gray-500">Checking your access…</div>;
  }

  if (decision === "allowed") {
    const isFree = user?.tier !== "premium" && mode === "metered";
    return (
      <>
        {isFree && (
          <div className="mb-4 flex items-center justify-between gap-4 border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs text-gray-700 rounded-sm">
            <span>
              Free plan: {used} of {FREE_PREMIUM_LIMIT} premium articles used this month.
            </span>
            <Link to="/premium" className="text-red-600 hover:underline whitespace-nowrap">
              Go unlimited
            </Link>
          </div>
        )}
        {children}
      </>
    );
  }

  const copy =
    decision === "need-signin"
      ? {
          heading: "Sign in to keep reading",
          body: "Create a free account to read premium articles, or sign in if you already have one.",
          cta: "Sign in",
          to: "/login",
        }
      : decision === "limit-reached"
      ? {
          heading: `You’ve used your ${FREE_PREMIUM_LIMIT} free premium articles this month`,
          body: "Go Premium for unlimited articles, the full archive and ad-free reading. Your free articles reset on the 1st.",
          cta: "See Premium plans",
          to: "/premium",
        }
      : {
          heading: "This is a Premium feature",
          body: "Upgrade to unlock analyst reports, the full 25-year archive and exclusive interviews.",
          cta: "See Premium plans",
          to: "/premium",
        };

  return (
    <div className="my-10 mx-auto max-w-xl border border-gray-200 bg-white rounded-sm p-8 text-center">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-black text-amber-400">
        {decision === "need-signin" ? <Lock size={16} /> : <Crown size={16} />}
      </div>
      <h2 className="text-xl mb-2" style={{ fontFamily: "Georgia, serif" }}>
        {copy.heading}
      </h2>
      <p className="text-sm text-gray-500 mb-6">{copy.body}</p>
      <Link
        to={copy.to}
        className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm px-6 py-2.5 rounded-sm transition-colors"
      >
        {copy.cta}
      </Link>
    </div>
  );
}