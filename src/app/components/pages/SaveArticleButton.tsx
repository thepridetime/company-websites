// DRAFT - not wired in yet. Review before merging.
// Target path: src/app/components/pages/SaveArticleButton.tsx
// Bookmark button for article pages. Saves to `saved_articles` via src/lib/savedArticles.ts.
// The article path is taken from the current URL, so callers only pass title and category.
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Bookmark } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { isArticleSaved, toggleSavedArticle } from "../../../lib/savedArticles";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";

export function SaveArticleButton({ title, category }: { title: string; category: string }) {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  // Load the saved state whenever the signed-in user or the article changes.
  useEffect(() => {
    let cancelled = false;
    setSaved(false);
    if (!user) return;
    isArticleSaved(user.id, pathname).then((value) => {
      if (!cancelled) setSaved(value);
    });
    return () => {
      cancelled = true;
    };
  }, [user?.id, pathname]);

  const handleClick = async () => {
    if (isLoading || busy) return;

    // Signed out: send to login and come back to this article afterwards.
    if (!user) {
      navigate("/login", { state: { from: pathname } });
      return;
    }

    const wasSaved = saved;
    setBusy(true);
    setSaved(!wasSaved); // optimistic update
    const ok = await toggleSavedArticle(user.id, { title, category, path: pathname }, wasSaved);
    if (!ok) setSaved(wasSaved); // roll back if the database call failed
    setBusy(false);
  };

  const label = saved ? "Remove from saved articles" : "Save article";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-label={label}
      aria-pressed={saved}
      title={label}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-slate-100 hover:text-red-600 disabled:opacity-60 ${
        saved ? "text-red-600" : ""
      } ${focusRing}`}
    >
      <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
