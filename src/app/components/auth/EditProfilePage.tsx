// Target path: src/app/components/auth/EditProfilePage.tsx
// Route: /dashboard/profile
// Profile (picture, name, country, bio) and password use a pencil button to switch into edit mode.
// Security lists signed-in devices with per-device sign-out.
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../lib/supabase";
import {
  MIN_PASSWORD_LENGTH,
  changePassword,
  ensureFreshSession,
  signOutOtherSessions,
} from "../../../lib/accountSecurity";
import { removeAvatar, uploadAvatar, validateAvatarFile } from "../../../lib/avatar";
import {
  currentSessionId,
  listDevices,
  revokeDevice,
  timeAgo,
  trackCurrentDevice,
  type DeviceSession,
} from "../../../lib/devices";

const BIO_MAX = 160;
const SESSION_EXPIRED = "Your session has expired. Please sign in again.";

type Msg = { kind: "ok" | "error"; text: string } | null;
type Profile = { name: string; country: string; bio: string };

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
const pencilBtn =
  "inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 disabled:opacity-60 transition-colors";
const sectionTitle = { fontFamily: "Georgia, serif" } as const;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-sm text-gray-800 mt-1 whitespace-pre-wrap">{value}</p>
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  autoComplete,
  show,
  onToggle,
}: {
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        autoComplete={autoComplete}
        className={`${inputCls} pr-10`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

export function EditProfilePage() {
  const { user, isSignedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  // Profile: `profile` is what's saved; `draft` is what the form is editing.
  const [profile, setProfile] = useState<Profile>({ name: "", country: "", bio: "" });
  const [draft, setDraft] = useState<Profile>({ name: "", country: "", bio: "" });
  const [editingProfile, setEditingProfile] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [profileMsg, setProfileMsg] = useState<Msg>(null);
  const [profileBusy, setProfileBusy] = useState(false);

  // Password
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [editingPassword, setEditingPassword] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState<Msg>(null);
  const [pwdBusy, setPwdBusy] = useState(false);

  // Security
  const [secMsg, setSecMsg] = useState<Msg>(null);
  const [secBusy, setSecBusy] = useState(false);
  const [devices, setDevices] = useState<DeviceSession[]>([]);
  const [devicesLoading, setDevicesLoading] = useState(true);
  const [currentSid, setCurrentSid] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const initial = { name: user.name, country: user.country, bio: "" };
    setProfile(initial);
    setDraft(initial);
    setAvatarUrl(user.avatar);
    // Bio and avatar_url live in user_metadata, which AuthContext doesn't expose.
    supabase.auth.getUser().then(({ data }) => {
      const meta = data.user?.user_metadata ?? {};
      const loaded = {
        name: user.name,
        country: user.country,
        bio: (meta.bio as string) ?? "",
      };
      setProfile(loaded);
      setDraft(loaded);
      setAvatarUrl((meta.avatar_url as string) || user.avatar);
      setHasPassword((data.user?.identities ?? []).some((i) => i.provider === "email"));
    });
  }, [user?.id]);

  const refreshDevices = async () => {
    setDevicesLoading(true);
    try {
      setDevices(await listDevices());
    } catch (err) {
      console.error("DEVICES_LOAD_FAILED", err);
      setSecMsg({ kind: "error", text: "Could not load your devices." });
    } finally {
      setDevicesLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    trackCurrentDevice(user.id).catch((err) => console.error("DEVICE_TRACK_FAILED", err));
    currentSessionId().then(setCurrentSid);
    refreshDevices();
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
  const startEditingProfile = () => {
    setDraft(profile);
    setProfileMsg(null);
    setEditingProfile(true);
  };

  const cancelEditingProfile = () => {
    setDraft(profile);
    setProfileMsg(null);
    setEditingProfile(false);
  };

  const onSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    const name = draft.name.trim();
    if (!name) {
      setProfileMsg({ kind: "error", text: "Name cannot be empty." });
      return;
    }
    const next: Profile = { name, country: draft.country.trim(), bio: draft.bio.trim() };
    withFreshSession(setProfileMsg, setProfileBusy, async () => {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: next.name, name: next.name, country: next.country, bio: next.bio },
      });
      if (error) throw error;
      setProfile(next);
      setDraft(next);
      setEditingProfile(false);
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
  const startEditingPassword = () => {
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
    setPwdMsg(null);
    setEditingPassword(true);
  };

  const cancelEditingPassword = () => {
    setEditingPassword(false);
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
    setPwdMsg(null);
  };

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
      setEditingPassword(false);
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
      if (ok) await refreshDevices();
      return ok
        ? { kind: "ok", text: "You have been signed out on all other devices." }
        : { kind: "error", text: "Could not sign out other devices. Please try again." };
    });

  const onRevokeDevice = async (d: DeviceSession) => {
    setRevokingId(d.session_id);
    setSecMsg(null);
    const ok = await revokeDevice(d.session_id);
    setRevokingId(null);
    if (ok) {
      setDevices((list) => list.filter((x) => x.session_id !== d.session_id));
      setSecMsg({ kind: "ok", text: `Signed out ${d.label}.` });
    } else {
      setSecMsg({ kind: "error", text: "Could not sign out that device. Please try again." });
    }
  };

  const initials = profile.name
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
        <h1 className="mt-4 text-2xl" style={sectionTitle}>
          Edit profile
        </h1>

        {/* ---------- Profile ---------- */}
        <section className={cardCls}>
          <div className="flex items-center justify-between">
            <h2 className="text-base" style={sectionTitle}>Profile</h2>
            {!editingProfile && (
              <button type="button" onClick={startEditingProfile} aria-label="Edit profile" className={pencilBtn}>
                <Pencil size={14} /> Edit
              </button>
            )}
          </div>

          <div className="flex items-center gap-5">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" referrerPolicy="no-referrer" className="h-16 w-16 rounded-full object-cover border border-gray-200" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg">
                {initials || "?"}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className={`${secondaryBtn} cursor-pointer`}>
                Upload picture
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={onPickAvatar}
                  disabled={profileBusy}
                />
              </label>
              <button type="button" onClick={onRemoveAvatar} disabled={profileBusy || !avatarUrl} className={secondaryBtn}>
                Remove picture
              </button>
              <p className="text-xs text-gray-400">JPG, PNG or WebP, up to 2 MB.</p>
            </div>
          </div>

          {editingProfile ? (
            <form onSubmit={onSaveProfile} className="flex flex-col gap-5">
              <label className="flex flex-col gap-1.5 text-sm text-gray-700">
                Full name
                <input
                  className={inputCls}
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  maxLength={80}
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm text-gray-700">
                Country
                <input
                  className={inputCls}
                  value={draft.country}
                  onChange={(e) => setDraft({ ...draft, country: e.target.value })}
                  maxLength={80}
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm text-gray-700">
                <span className="flex justify-between">
                  <span>Bio</span>
                  <span className="text-xs text-gray-400">
                    {draft.bio.length}/{BIO_MAX}
                  </span>
                </span>
                <textarea
                  className={`${inputCls} min-h-[84px] resize-y`}
                  value={draft.bio}
                  onChange={(e) => setDraft({ ...draft, bio: e.target.value.slice(0, BIO_MAX) })}
                  placeholder="A line about you (optional)"
                />
              </label>

              <p className="text-sm text-gray-500">
                Email: {user.email}
                <span className="block text-xs text-gray-400 mt-1">To change your email, contact support.</span>
              </p>

              <Feedback msg={profileMsg} />

              <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={profileBusy} className={primaryBtn}>
                  {profileBusy ? "Saving…" : "Save changes"}
                </button>
                <button type="button" onClick={cancelEditingProfile} disabled={profileBusy} className={secondaryBtn}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              <InfoRow label="Full name" value={profile.name || "Not set"} />
              <InfoRow label="Country" value={profile.country || "Not set"} />
              <InfoRow label="Bio" value={profile.bio || "Not set"} />
              <p className="text-sm text-gray-500">
                Email: {user.email}
                <span className="block text-xs text-gray-400 mt-1">To change your email, contact support.</span>
              </p>
              <Feedback msg={profileMsg} />
            </div>
          )}
        </section>

        {/* ---------- Password ---------- */}
        <section className={cardCls}>
          <div className="flex items-center justify-between">
            <h2 className="text-base" style={sectionTitle}>
              {hasPassword === false ? "Set a password" : "Password"}
            </h2>
            {hasPassword && !editingPassword && (
              <button type="button" onClick={startEditingPassword} aria-label="Change password" className={pencilBtn}>
                <Pencil size={14} /> Edit
              </button>
            )}
          </div>

          {hasPassword && !editingPassword ? (
            <div>
              {/* Fixed-length mask. The real password is never stored or shown in the app. */}
              <p className="text-sm text-gray-800 tracking-widest">••••••••</p>
              <p className="text-xs text-gray-400 mt-1">Hidden for your security.</p>
              <Feedback msg={pwdMsg} />
            </div>
          ) : (
            <>
              {hasPassword === false && (
                <p className="text-sm text-gray-500">
                  You signed in with Google. Set a password to also sign in with your email.
                </p>
              )}

              <form onSubmit={onChangePassword} className="flex flex-col gap-5">
                {hasPassword && (
                  <label className="flex flex-col gap-1.5 text-sm text-gray-700">
                    Current password
                    <PasswordInput
                      value={currentPwd}
                      onChange={setCurrentPwd}
                      autoComplete="current-password"
                      show={showPwd}
                      onToggle={() => setShowPwd(!showPwd)}
                    />
                  </label>
                )}
                <label className="flex flex-col gap-1.5 text-sm text-gray-700">
                  New password
                  <PasswordInput
                    value={newPwd}
                    onChange={setNewPwd}
                    autoComplete="new-password"
                    show={showPwd}
                    onToggle={() => setShowPwd(!showPwd)}
                  />
                  <span className="text-xs text-gray-400">At least {MIN_PASSWORD_LENGTH} characters.</span>
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-gray-700">
                  Confirm new password
                  <PasswordInput
                    value={confirmPwd}
                    onChange={setConfirmPwd}
                    autoComplete="new-password"
                    show={showPwd}
                    onToggle={() => setShowPwd(!showPwd)}
                  />
                </label>

                <Feedback msg={pwdMsg} />

                <div className="flex flex-wrap gap-3">
                  <button type="submit" disabled={pwdBusy || hasPassword === null} className={primaryBtn}>
                    {pwdBusy ? "Saving…" : hasPassword === false ? "Set password" : "Update password"}
                  </button>
                  {hasPassword && (
                    <button type="button" onClick={cancelEditingPassword} disabled={pwdBusy} className={secondaryBtn}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </section>

        {/* ---------- Security ---------- */}
        <section className={cardCls}>
          <h2 className="text-base" style={sectionTitle}>Signed-in devices</h2>

          {devicesLoading ? (
            <p className="text-sm text-gray-400">Loading devices…</p>
          ) : devices.length === 0 ? (
            <p className="text-sm text-gray-400">No devices found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {devices.map((d) => {
                const isCurrent = d.session_id === currentSid;
                return (
                  <li key={d.session_id} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="text-sm text-gray-800 flex items-center gap-2">
                        {d.label}
                        {isCurrent && (
                          <span className="text-[10px] uppercase tracking-wider text-green-700">This device</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400">Last active {timeAgo(d.last_seen_at)}</p>
                    </div>
                    {!isCurrent && (
                      <button
                        type="button"
                        onClick={() => onRevokeDevice(d)}
                        disabled={revokingId === d.session_id}
                        className={secondaryBtn}
                      >
                        {revokingId === d.session_id ? "Signing out…" : "Sign out"}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-200 pt-5">
            <div>
              <p className="text-sm text-gray-800">Sign out all other devices</p>
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
