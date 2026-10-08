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

declare const __BUILD_TIME__: string;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T/;

/* Many stories only carry hard-coded relative labels ("2 hrs ago",
   "Just now", "Yesterday"). Those labels never change, so they were wrong
   as soon as they were typed. Each label is treated as an offset from the
   moment the site was built and turned into a real timestamp, so it keeps
   ageing correctly ("2 hrs ago" -> "3 days ago"). */
const BUILD_MS = (() => {
  const t = new Date(
    typeof __BUILD_TIME__ === "string" ? __BUILD_TIME__ : Date.now()
  ).getTime();
  return Number.isNaN(t) ? Date.now() : t;
})();

const UNIT_MS: Record<string, number> = {
  min: 60_000, mins: 60_000, minute: 60_000, minutes: 60_000,
  hr: 3_600_000, hrs: 3_600_000, hour: 3_600_000, hours: 3_600_000,
  day: 86_400_000, days: 86_400_000,
};

/** Offset in ms for labels like "2 hrs ago"; null when not a relative label. */
function relativeOffset(text: string): number | null {
  const t = text.trim().toLowerCase();
  if (["just now", "moments ago", "updated moments ago", "today"].includes(t)) return 0;
  if (t === "yesterday") return 86_400_000;
  const m = t.match(/^(\d+)\s*([a-z]+)\s+ago$/);
  if (m && UNIT_MS[m[2]]) return Number(m[1]) * UNIT_MS[m[2]];
  return null;
}

/** True for hard-coded relative labels such as "2 hrs ago". */
export function isRelativeLabel(text: string): boolean {
  return relativeOffset(text) !== null;
}

/** Real ISO timestamp for an ISO string or relative label; null for plain dates/text. */
export function toIso(value: string): string | null {
  if (ISO_DATE.test(value)) return value;
  const off = relativeOffset(value);
  return off === null ? null : new Date(BUILD_MS - off).toISOString();
}

/** True only for real ISO timestamps (the only values that carry a true upload time). */
export function isIsoTimestamp(value: string): boolean {
  return ISO_DATE.test(value) && !Number.isNaN(new Date(value).getTime());
}

/** "October 8, 2026 at 12:15 PM GMT+5:30" in the reader's own time zone. */
export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "shortOffset",
  });
  return `${day} at ${time}`;
}

/** Reading time estimated from the real article text (~200 words/min). */
export function estimateReadTime(...parts: (string | undefined)[]): string {
  const words = parts.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/** Live-updating relative time. Usage: <TimeAgo iso={item.publishedAt} />
 *  Accepts ISO timestamps and legacy labels like "2 hrs ago". Fixed calendar
 *  dates (e.g. "September 30, 2026") are shown as written. */
export function TimeAgo({ iso }: { iso: string }) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const resolved = toIso(iso);
  if (!resolved) return <>{iso}</>;
  return <time dateTime={resolved}>{timeAgo(resolved, current)}</time>;
}
