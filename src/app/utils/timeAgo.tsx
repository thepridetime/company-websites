import { useSyncExternalStore } from "react";

/* One shared clock for the whole app: a single interval re-renders every
   <TimeAgo /> instead of every component running its own setInterval. */
const listeners = new Set<() => void>();
let now = Date.now();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 30_000); // refresh every 30 seconds
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => now;

/** Turns an ISO timestamp into "Just now", "12 min ago", "2 hr ago", "3 days ago", "2 weeks ago"... */
export function timeAgo(iso: string, current: number = Date.now()): string {
  const seconds = Math.max(0, Math.floor((current - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T/;

/** Live-updating relative time. Usage: <TimeAgo iso={item.publishedAt} />
 *  If the value is not an ISO timestamp (e.g. a fixed label like "1 June 2026")
 *  it is shown as-is. */
export function TimeAgo({ iso }: { iso: string }) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  if (!ISO_DATE.test(iso)) return <>{iso}</>;
  return <time dateTime={iso}>{timeAgo(iso, current)}</time>;
}
