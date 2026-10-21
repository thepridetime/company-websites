// DRAFT - not wired in yet. Review before merging.
// Target path: src/app/components/auth/EditProfilePage.tsx
// Route: /dashboard/profile
// Saves name and country to Supabase auth user_metadata. AuthContext already reads
// full_name / name and country from there, and onAuthStateChange refreshes the user.
// Email and avatar are not editable here: email needs Supabase's confirmation flow,
// and the avatar comes from Google sign-in.
import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../lib/supabase";

type Status = { kind: "idle" | "saving" | "ok" | "error"; message?: string };

export function EditProfilePage() {
  const { user, isSignedIn, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setCountry(user.country);
    }
  }, [user?.id]);

  if (!isLoading && !isSignedIn) return <Navigate to="/login" replace />;
  if (isLoading || !user) return null;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setStatus({ kind: "error", message: "Name cannot be empty." });
      return;
    }
    setStatus({ kind: "saving" });
    const { error } = await supabase.auth.updateUser({
      data: { full_name: trimmedName, name: trimmedName, country: country.trim() },
    });
    setStatus(
      error
        ? { kind: "error", message: error.message }
        : { kind: "ok", message: "Profile saved." }
    );
  };

  const inputCls =
    "w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500";

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-xl mx-auto px-4 py-10">
        <Link to="/dashboard" className="text-sm text-gray-500 hover:text-red-600">
          ← Back to dashboard
        </Link>
        <h1 className="mt-4 text-2xl" style={{ fontFamily: "Georgia, serif" }}>
          Edit profile
        </h1>

        <form onSubmit={onSubmit} className="mt-8 bg-white border border-gray-200 rounded-sm p-6 flex flex-col gap-5">
          <label className="flex flex-col gap-1.5 text-sm text-gray-700">
            Full name
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-gray-700">
            Country
            <input className={inputCls} value={country} onChange={(e) => setCountry(e.target.value)} maxLength={80} />
          </label>

          <div className="text-sm text-gray-500">
            <p>Email: {user.email}</p>
            <p className="text-xs text-gray-400 mt-1">To change your email, contact support.</p>
          </div>

          {status.message && (
            <p className={`text-sm ${status.kind === "error" ? "text-red-600" : "text-green-700"}`}>
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={status.kind === "saving"}
            className="self-start bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-sm text-sm transition-colors"
          >
            {status.kind === "saving" ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
