import { createClient } from "@supabase/supabase-js";

const env = (import.meta as ImportMeta & {
  readonly env: {
    readonly VITE_SUPABASE_URL?: string;
    readonly VITE_SUPABASE_ANON_KEY?: string;
  };
}).env;

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

// Placeholder values keep the app from crashing on import when the env vars
// are missing. Auth and data calls will fail until real values are provided.
const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_KEY = "placeholder-anon-key";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. " +
      "Set them in your .env file (local) or in the deploy environment variables."
  );
}

export const supabase = createClient(
  supabaseUrl || PLACEHOLDER_URL,
  supabaseAnonKey || PLACEHOLDER_KEY
);
