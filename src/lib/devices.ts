// DRAFT - not wired in yet. Review before merging.
// Target path: src/lib/devices.ts
// Signed-in device list and per-device sign-out.
// Each browser stores a random device id in localStorage and records its current session
// in the user_devices table. The session id comes from the access token's session_id claim.
import { supabase } from "./supabase";

export type DeviceSession = {
  device_id: string;
  session_id: string;
  label: string;
  last_seen_at: string;
  created_at: string;
};

const DEVICE_KEY = "pt_device_id";

function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

/** Reads session_id from the current access token. The token is decoded only, not verified here. */
export async function currentSessionId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return null;
  try {
    const raw = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = raw + "=".repeat((4 - (raw.length % 4)) % 4);
    const payload = JSON.parse(atob(padded));
    return typeof payload.session_id === "string" ? payload.session_id : null;
  } catch {
    return null;
  }
}

/** "Chrome on Windows", "Safari on iOS", and so on, from the user agent string. */
export function deviceLabel(ua: string = navigator.userAgent): string {
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\//.test(ua)
    ? "Opera"
    : /Chrome\//.test(ua)
    ? "Chrome"
    : /Firefox\//.test(ua)
    ? "Firefox"
    : /Safari\//.test(ua)
    ? "Safari"
    : "Browser";
  const os = /Android/.test(ua)
    ? "Android"
    : /iPhone|iPad/.test(ua)
    ? "iOS"
    : /Windows/.test(ua)
    ? "Windows"
    : /Mac OS X/.test(ua)
    ? "macOS"
    : /Linux/.test(ua)
    ? "Linux"
    : "Unknown OS";
  return `${browser} on ${os}`;
}

/** Records or refreshes this browser's entry. Call it whenever a session is active. */
export async function trackCurrentDevice(userId: string): Promise<void> {
  const sessionId = await currentSessionId();
  if (!sessionId) return;
  const { error } = await supabase.from("user_devices").upsert(
    {
      device_id: getDeviceId(),
      user_id: userId,
      session_id: sessionId,
      label: deviceLabel(),
      user_agent: navigator.userAgent.slice(0, 300),
      last_seen_at: new Date().toISOString(),
    },
    { onConflict: "device_id" }
  );
  if (error) throw error;
}

/** Devices whose session is still active. Sessions that were already signed out are filtered out. */
export async function listDevices(): Promise<DeviceSession[]> {
  const { data, error } = await supabase.rpc("list_my_sessions");
  if (error) throw error;
  return (data ?? []) as DeviceSession[];
}

/** Signs out one device. Returns true on success. */
export async function revokeDevice(sessionId: string): Promise<boolean> {
  const { error } = await supabase.rpc("revoke_my_session", { p_session_id: sessionId });
  if (error) {
    console.error("REVOKE_DEVICE_FAILED", error);
    return false;
  }
  return true;
}

export function timeAgo(iso: string): string {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
}
