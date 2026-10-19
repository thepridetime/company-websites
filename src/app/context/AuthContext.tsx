import { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

export type UserTier = "free" | "premium";

export interface User {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
  avatar?: string;
  joinedDate: string;
  country: string;
  savedArticles: number;
  readingStreak: number;
}
interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    email: string,
    password: string,
    metadata?: Record<string, unknown>
  ) => Promise<{ success: boolean; error?: string; needsEmailConfirmation?: boolean }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  /** Error that Google/Supabase sent back in the URL after the redirect. */
  authError: string;
  clearAuthError: () => void;
  signOut: () => Promise<void>;
  upgradeToPremoium: () => void;
  refreshTier: () => Promise<void>;
  resetPassword: (
  email: string
) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

{/*const MOCK_USERS: Record<string, User & { password: string }> = {
  "demo@pridetimes.com": {
    id: "usr_001",
    name: "Alex Morgan",
    email: "demo@pridetimes.com",
    password: "demo123",
    tier: "premium",
    joinedDate: "January 2025",
    country: "United States",
    savedArticles: 47,
    readingStreak: 23,
  },
  "free@pridetimes.com": {
    id: "usr_002",
    name: "Jordan Lee",
    email: "free@pridetimes.com",
    password: "free123",
    tier: "free",
    joinedDate: "March 2026",
    country: "United Kingdom",
    savedArticles: 5,
    readingStreak: 3,
  },
};*/}

/* One place that turns a Supabase user (email/password OR Google) into the
   app's User. Google puts the name in full_name/name and the photo in
   avatar_url/picture. */
function toUser(u: SupabaseUser): User {
  const meta = u.user_metadata ?? {};

  return {
    id: u.id,
    name: meta.full_name || meta.name || u.email?.split("@")[0] || "User",
    email: u.email || "",
    tier: "free",
    avatar: meta.avatar_url || meta.picture || undefined,
    joinedDate: "",
    country: meta.country || "",
    savedArticles: 0,
    readingStreak: 0,
  };
}

/* Reads the subscriptions table and decides free vs premium.
   Premium = at least one row with status 'active' and an end_date in the future. */
async function fetchTier(userId: string): Promise<UserTier> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("plan, status, end_date")
    .eq("user_id", userId)
    .eq("status", "active")
    .gt("end_date", new Date().toISOString())
    .limit(1);

  if (error) {
    console.error("TIER_FETCH_FAILED", error);
    return "free";
  }
  return data && data.length > 0 ? "premium" : "free";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [tier, setTier] = useState<UserTier>("free");
  const [tierLoading, setTierLoading] = useState(false);

  const refreshTier = useCallback(async () => {
    if (!user?.id) {
      setTier("free");
      return;
    }
    setTierLoading(true);
    setTier(await fetchTier(user.id));
    setTierLoading(false);
  }, [user?.id]);

  useEffect(() => {
    refreshTier();
  }, [refreshTier]);

  const userWithTier = useMemo(
    () => (user ? { ...user, tier } : null),
    [user, tier]
  );

  useEffect(() => {
    /* If Google/Supabase could not finish the sign-in, they send the user
       back with ?error=...&error_description=... (or the same in the #hash).
       Read it once, show it on the login/sign-up page, and clean the URL. */
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const description =
      params.get("error_description") ||
      hashParams.get("error_description") ||
      params.get("error") ||
      hashParams.get("error");

    if (description) {
      setAuthError(description.replace(/\+/g, " "));
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ? toUser(session.user) : null);
      setIsLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toUser(session.user) : null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
  setIsLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setIsLoading(false);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  if (data.user) {
    setUser({
      id: data.user.id,
      name: data.user.user_metadata?.name || "User",
      email: data.user.email || "",
      tier: "free",
      joinedDate: "",
      country: "",
      savedArticles: 0,
      readingStreak: 0,
    });

    return { success: true };
  }

  return {
    success: false,
    error: "Login failed",
  };
};
const signUp = async (
  email: string,
  password: string,
  metadata?: Record<string, unknown>
) => {
  setIsLoading(true);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
      data: metadata,
    },
  });

  setIsLoading(false);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  // If the project has email confirmation disabled, Supabase returns an
  // active session immediately — sign the user in right away instead of
  // making them wait on a confirmation email that was never sent.
  if (data.session && data.user) {
    setUser({
      id: data.user.id,
      name: (metadata?.name as string) || data.user.email?.split("@")[0] || "User",
      email: data.user.email || "",
      tier: "free",
      joinedDate: "",
      country: (metadata?.country as string) || "",
      savedArticles: 0,
      readingStreak: 0,
    });
    return { success: true, needsEmailConfirmation: false };
  }

  return { success: true, needsEmailConfirmation: true };
};

const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
};
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      /* Must be listed under Supabase > Authentication > URL Configuration
         > Redirect URLs (for localhost AND the live domain). */
      redirectTo: `${window.location.origin}/dashboard`,
      queryParams: { prompt: "select_account" },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // The browser now leaves for Google; nothing more to do here.
  return { success: true };
};

  const signOut = async () => {
  await supabase.auth.signOut();
  setUser(null);
};

  const upgradeToPremoium = () => {
    setTier("premium");
  };

  return (
    <AuthContext.Provider
  value={{
    user: userWithTier,
    isSignedIn: !!user,
    isLoading: isLoading || tierLoading,
    signIn,
    signUp,
    signInWithGoogle,
    authError,
    clearAuthError: () => setAuthError(""),
    resetPassword,
    signOut,
    upgradeToPremoium,
    refreshTier,
  }}
>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}