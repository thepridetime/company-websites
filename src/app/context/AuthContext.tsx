import { createContext, useContext, useState, ReactNode, useEffect } from "react";
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
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  upgradeToPremoium: () => void;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
 const loadUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    setUser({
      id: session.user.id,
      name:
        session.user.user_metadata?.full_name ||
        session.user.user_metadata?.name ||
        session.user.email?.split("@")[0] ||
        "User",
      email: session.user.email || "",
      tier: "free",
      joinedDate: "",
      country: "",
      savedArticles: 0,
      readingStreak: 0,
    });
  }

  setIsLoading(false);
};

  loadUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        name:
  session.user.user_metadata?.full_name ||
  session.user.user_metadata?.name ||
  session.user.email?.split("@")[0] ||
  "User",
        email: session.user.email || "",
        tier: "free",
        joinedDate: "",
        country: "",
        savedArticles: 0,
        readingStreak: 0,
      });
   } else {
  setUser(null);
}

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
      redirectTo: window.location.origin,
    },
  });

  if (error) {
    console.error(error);
  }
};

  const signOut = async () => {
  await supabase.auth.signOut();
  setUser(null);
};

  const upgradeToPremoium = () => {
    if (user) setUser({ ...user, tier: "premium" });
  };

  return (
    <AuthContext.Provider
  value={{
    user,
    isSignedIn: !!user,
    isLoading,
    signIn,
    signUp,
    signInWithGoogle,
     resetPassword,
    signOut,
    upgradeToPremoium,
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
