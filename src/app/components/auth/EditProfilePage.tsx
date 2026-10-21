// DRAFT - not wired in yet. Review before merging.
// Target path: src/app/components/auth/EditProfilePage.tsx
// Route: /dashboard/profile
// Sections: profile (picture, name, country, bio), password, and security (sign out other devices).
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../lib/supabase";
import {
  MIN_PASSWORD_LENGTH,
  changePassword,
  ensureFreshSession,
  signOutOtherSessions,
} from "../../../lib/accountSecurity";
import { removeAvatar, uploadAvatar, validateAvatarFile } from "../../../lib/avatar";

const BIO_MAX = 160;
const SESSION_EXPIRED = "Your session has expired. Please sign in again.";

type Msg = { kind: "ok" | "error"; text: string } | null;

function isSessionError(text: string): boolean {
  return /jwt|expired|not authenticated|refresh token/i.test(text);
}

function errorMsg(raw: string): Msg {
  return { kind: "error", text: isSessionError(raw) ? SESSION_EXPIRED : raw };
}

function Feedback({ msg }: { msg: Msg }) {
  const navigate = useNavigate();
  if (!msg) return null;
  return (
    <div className="flex flex-col gap-3">
      <p className={`text-sm ${msg.kind === "error" ? "text-red-600" : "text-green-700"}`}>{msg.text}</p>
      {msg.text === SESSION_EXPIRED && (
        <button
          type="button"
          onClick={() => navigate("/login", { state: { from: "/dashboard/profile" } })}
          className="self-start border border-red-600 text-red-600 hover:bg-red-50 px-5 py-2 rounded-sm text-sm transition-colors"
        >
          Sign in again
        </button>
      )}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500";
const cardCls = "mt-8 bg-white border border-gray-200 rounded-sm p-6 flex flex-col gap-5";
const primaryBtn =
  "self-start bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-sm text-sm transition-colors";
const secondaryBtn =
  "self-start border border-gray-300 hover:border-red-600 hover:text-red-600 disabled:opacity-60 px-5 py-2 rounded-sm text-sm transition-colors";

export function EditProfilePage() {
  const { user, isSignedIn, isLoading } = useAuth();

  // Profile
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [profileMsg, setProfileMsg] = useState<Msg>(null);
  const [profileBusy, setProfileBusy] = useState(false);

  // Password
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState<Msg>(null);
  const [pwdBusy, setPwdBusy] = useState(false);

  // Security
  const [secMsg, setSecMsg] = useState<Msg>(null);
  const [secBusy, setSecBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setCountry(user.country);
    setAvatarUrl(user.avatar);
    // Bio and avatar_url live in user_metadata, which AuthContext doesn't expose.
    supabase.auth.getUser().then(({ data }) => {
      const meta = data.user?.user_metadata ?? {};
      setBio((meta.bio as string) ?? "");
      setAvatarUrl((meta.avatar_url as string) || user.avatar);
      setHasPassword((data.user?.identities ?? []).some((i) => i.provider === "email"));
    });
  }, [user?.id]);

  if (!isLoading && !isSignedIn) return <Navigate to="/login" replace />;
  if (isLoading || !user) return null;

  const withFreshSession = async (
    setMsg: (m: Msg) => void,
    setBusy: (b: boolean) => void,
    action: () => Promise<Msg>
  ) => {
    setBusy(true);
    setMsg(null);
    if (!(await ensureFreshSession())) {
      setMsg({ kind: "error", text: SESSION_EXPIRED });
      setBusy(false);
      return;
    }
    try {
      setMsg(await action());
    } catch (err) {
      console.error("ACCOUNT_ACTION_FAILED", err);
      setMsg(errorMsg((err as Error)?.message ?? "Something went wrong."));
    } finally {
      setBusy(false);
    }
  };

  // ---- Profile ----
  const onSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setProfileMsg({ kind: "error", text: "Name cannot be empty." });
      return;
    }
    withFreshSession(setProfileMsg, setProfileBusy, async () => {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: trimmedName, name: trimmedName, country: country.trim(), bio: bio.trim() },
      });
      if (error) throw error;
      return { kind: "ok", text: "Profile saved." };
    });
  };

  const onPickAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const problem = validateAvatarFile(file);
    if (problem) {
      setProfileMsg({ kind: "error", text: problem });
      return;
    }
    withFreshSession(setProfileMsg, setProfileBusy, async () => {
      const url = await uploadAvatar(user.id, file);
      setAvatarUrl(url);
      return { kind: "ok", text: "Profile picture updated." };
    });
  };

  const onRemoveAvatar = () =>
    withFreshSession(setProfileMsg, setProfileBusy, async () => {
      await removeAvatar(user.id);
      setAvatarUrl(user.avatar);
      return { kind: "ok", text: "Profile picture removed." };
    });

  // ---- Password ----
  const onChangePassword = (e: FormEvent) => {
    e.preventDefault();
    if (newPwd.length < MIN_PASSWORD_LENGTH) {
      setPwdMsg({ kind: "error", text: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg({ kind: "error", text: "New passwords do not match." });
      return;
    }
    if (hasPassword && !currentPwd) {
      setPwdMsg({ kind: "error", text: "Enter your current password." });
      return;
    }
    if (hasPassword && newPwd === currentPwd) {
      setPwdMsg({ kind: "error", text: "New password must be different from the current one." });
      return;
    }
    const wasSettingFirstPassword = !hasPassword;
    withFreshSession(setPwdMsg, setPwdBusy, async () => {
      const res = await changePassword({
        email: user.email,
        currentPassword: hasPassword ? currentPwd : null,
        newPassword: newPwd,
      });
      if (!res.ok) return { kind: "error", text: res.error };
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
      setHasPassword(true);
      return {
        kind: "ok",
        text: wasSettingFirstPassword
          ? "Password set. You can now also sign in with your email and password."
          : "Password changed.",
      };
    });
  };

  // ---- Security ----
  const onSignOutOthers = () =>
    withFreshSession(setSecMsg, setSecBusy, async () => {
      const ok = await signOutOtherSessions();
      return ok
        ? { kind: "ok", text: "You have been signed out on all other devices." }
        : { kind: "error", text: "Could not sign out other devices. Please try again." };
    });

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-xl mx-auto px-4 py-10 pb-20">
        <Link to="/dashboard" className="text-sm text-gray-500 hover:text-red-600">
          ← Back to dashboard
        </Link>
        <h1 className="mt-4 text-2xl" style={{ fontFamily: "Georgia, serif" }}>
          Edit profile
        </h1>

        {/* ---------- Profile ---------- */}
        <section className={cardCls}>
          <h2 className="text-base" style={{ fontFamily: "Georgia, serif" }}>Profile</h2>

          <div className="flex items-center gap-5">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="h-16 w-16 rounded-full object-cover border border-gray-200" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg">
                {initials || "?"}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className={`${secondaryBtn} cursor-pointer`}>
                Upload picture
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onPickAvatar} disabled={profileBusy} />
              </label>
              <button type="button" onClick={onRemoveAvatar} disabled={profileBusy || !avatarUrl} className={secondaryBtn}>
                Remove picture
              </button>
              <p className="text-xs text-gray-400">JPG, PNG or WebP, up to 2 MB.</p>
            </div>
          </div>

          <form onSubmit={onSaveProfile} className="flex flex-col gap-5">
            <label className="flex flex-col gap-1.5 text-sm text-gray-700">
              Full name
              <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-gray-700">
              Country
              <input className={inputCls} value={country} onChange={(e) => setCountry(e.target.value)} maxLength={80} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-gray-700">
              <span className="flex justify-between">
                <span>Bio</span>
                <span className="text-xs text-gray-400">{bio.length}/{BIO_MAX}</span>
              </span>
              <textarea
                className={`${inputCls} min-h-[84px] resize-y`}
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
                placeholder="A line about you (optional)"
              />
            </label>

            <p className="text-sm text-gray-500">
              Email: {user.email}
              <span className="block text-xs text-gray-400 mt-1">To change your email, contact support.</span>
            </p>

            <Feedback msg={profileMsg} />

            <button type="submit" disabled={profileBusy} className={primaryBtn}>
              {profileBusy ? "Saving…" : "Save changes"}
            </button>
          </form>
        </section>

        {/* ---------- Password ---------- */}
        <section className={cardCls}>
          <h2 className="text-base" style={{ fontFamily: "Georgia, serif" }}>
            {hasPassword === false ? "Set a password" : "Change password"}
          </h2>
          {hasPassword === false && (
            <p className="text-sm text-gray-500">
              You signed in with Google. Set a password to also sign in with your email.
            </p>
          )}

          <form onSubmit={onChangePassword} className="flex flex-col gap-5">
            {hasPassword && (
              <label className="flex flex-col gap-1.5 text-sm text-gray-700">
                Current password
                <input type="password" autoComplete="current-password" className={inputCls} value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
              </label>
            )}
            <label className="flex flex-col gap-1.5 text-sm text-gray-700">
              New password
              <input type="password" autoComplete="new-password" className={inputCls} value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
              <span className="text-xs text-gray-400">At least {MIN_PASSWORD_LENGTH} characters.</span>
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-gray-700">
              Confirm new password
              <input type="password" autoComplete="new-password" className={inputCls} value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
            </label>

            <Feedback msg={pwdMsg} />

            <button type="submit" disabled={pwdBusy || hasPassword === null} className={primaryBtn}>
              {pwdBusy ? "Updating…" : hasPassword === false ? "Set password" : "Update password"}
            </button>
          </form>
        </section>

        {/* ---------- Security ---------- */}
        <section className={cardCls}>
          <h2 className="text-base" style={{ fontFamily: "Georgia, serif" }}>Security</h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-800">Sign out other devices</p>
              <p className="text-xs text-gray-400">Ends every session except this one.</p>
            </div>
            <button type="button" onClick={onSignOutOthers} disabled={secBusy} className={secondaryBtn}>
              {secBusy ? "Signing out…" : "Sign out others"}
            </button>
          </div>
          <Feedback msg={secMsg} />
        </section>
      </div>
    </div>
  );
}
