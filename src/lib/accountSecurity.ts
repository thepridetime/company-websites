// DRAFT - not wired in yet. Review before merging.
// Target path: src/lib/accountSecurity.ts
// Password change, "sign out other devices", and a session refresh helper.
import { supabase } from "./supabase";

export const MIN_PASSWORD_LENGTH = 8;

/** Gets a fresh access token. Returns false if the session is gone and the user must sign in again. */
export async function ensureFreshSession(): Promise<boolean> {
  const { data, error } = await supabase.auth.refreshSession();
  if (error) console.error("SESSION_REFRESH_FAILED", error);
  return !error && !!data.session;
}

/**
 * Changes the password.
 * - Pass currentPassword for accounts that already have one. It's checked by signing in again.
 * - Pass null for accounts that only use Google sign-in: this sets a first password.
 */
export async function changePassword(params: {
  email: string;
  currentPassword: string | null;
  newPassword: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (params.currentPassword) {
    const { error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.currentPassword,
    });
    if (error) return { ok: false, error: "Your current password is incorrect." };
  }

  const { error } = await supabase.auth.updateUser({ password: params.newPassword });
  if (error) {
    console.error("PASSWORD_UPDATE_FAILED", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/** Signs this user out on every other device. The current session stays signed in. */
export async function signOutOtherSessions(): Promise<boolean> {
  const { error } = await supabase.auth.signOut({ scope: "others" });
  if (error) {
    console.error("SIGN_OUT_OTHERS_FAILED", error);
    return false;
  }
  return true;
}
