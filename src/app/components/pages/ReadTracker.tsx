// DRAFT - not wired in yet. Review before merging.
// Target path: src/app/components/pages/ReadTracker.tsx
// Renders nothing. Records one read in `reading_history` when a signed-in user opens an article.
// The DB dedupe window in recordRead() stops repeat rows on reload.
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { recordRead } from "../../../lib/readingHistory";

export function ReadTracker({ title, category }: { title: string; category: string }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  // Guards against React StrictMode running the effect twice in development.
  const recordedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const key = `${user.id}|${pathname}`;
    if (recordedFor.current === key) return;
    recordedFor.current = key;
    recordRead({ title, category, path: pathname }).catch((err) =>
      console.error("READ_TRACK_FAILED", err)
    );
  }, [user?.id, pathname, title, category]);

  return null;
}
