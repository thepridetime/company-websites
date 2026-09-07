import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2, ShieldCheck, BookMarked, Newspaper } from "lucide-react";
import logoImg from "../../../imports/logo.png";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4C12.9 4 4 12.9 4 24s8.9 20 20 20s20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4C16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.8-3.3-11.5-8l-6.5 5C9.4 39.5 16.1 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.1 6.9l6.3 5.3C39.2 36.8 44 31 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

const perks = [
  { icon: Newspaper, text: "50M+ readers trust our reporting every month" },
  { icon: BookMarked, text: "Save articles and pick up where you left off, on any device" },
  { icon: ShieldCheck, text: "Ad-free reading and exclusive investigative reports with Premium" },
];

export function LoginPage() {
  const { signIn, signInWithGoogle, resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [resetSent, setResetSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: typeof fieldErrors = {};
    if (!email) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResetSent(false);
    if (!validate()) return;

    setSubmitting(true);
    const result = await signIn(email, password);
    setSubmitting(false);

    if (result.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.error ?? "Invalid email or password.");
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetSent(false);
    if (!email || !EMAIL_RE.test(email)) {
      setFieldErrors((f) => ({ ...f, email: "Enter your email above first." }));
      return;
    }
    const result = await resetPassword(email);
    if (!result.success) {
      setError(result.error || "Failed to send reset email.");
      return;
    }
    setResetSent(true);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* ── Left brand panel (desktop only) ───────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] bg-black text-white flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-red-600/10 blur-3xl" />

        <Link to="/" className="flex items-center gap-3 relative z-10">
          <img src={logoImg} alt="The Pride Times" className="h-10 w-auto object-contain" />
          <span className="pt-logo text-xl tracking-wide" style={{ color: "#fff" }}>
            THE <span className="pt-logo-accent">PRIDE</span> TIMES
          </span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-3xl leading-tight mb-6">
            Journalism you can trust, right where you left off.
          </h2>
          <div className="flex flex-col gap-4">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={15} />
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-500 relative z-10">
          © {new Date().getFullYear()} The Pride Times. All rights reserved.
        </p>
      </div>

      {/* ── Right form panel ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col">
        <div className="lg:hidden bg-black py-3 px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="The Pride Times" className="h-9 w-auto object-contain" />
            <span className="pt-logo text-lg" style={{ color: "#fff" }}>
              THE <span className="pt-logo-accent">PRIDE</span> TIMES
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm">
            <div className="mb-7">
              <h1 className="text-2xl">Welcome back</h1>
              <p className="text-sm text-gray-500 mt-1">Sign in to access your Pride Times account</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 flex items-start gap-2">
                <AlertCircle size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}
            {resetSent && (
              <div className="bg-emerald-50 border border-emerald-200 rounded p-3 mb-4 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-emerald-700">
                  Password reset email sent to <span className="font-medium">{email}</span>. Check your inbox.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    aria-invalid={!!fieldErrors.email}
                    className={`w-full border rounded px-3 py-2.5 pl-9 text-sm outline-none transition-colors ${
                      fieldErrors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-300 focus:border-black"
                    }`}
                  />
                </div>
                {fieldErrors.email && <p className="text-[11px] text-red-600 mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: undefined }));
                    }}
                    placeholder="Enter password"
                    aria-invalid={!!fieldErrors.password}
                    className={`w-full border rounded px-3 py-2.5 pl-9 pr-9 text-sm outline-none transition-colors ${
                      fieldErrors.password
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-300 focus:border-black"
                    }`}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-[11px] text-red-600 mt-1">{fieldErrors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-3 h-3"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-xs text-red-600 hover:underline"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || submitting}
                className="w-full bg-black text-white py-2.5 rounded text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading || submitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                New to The Pride Times?{" "}
                <Link to="/signup" className="text-red-600 hover:underline">
                  Create free account
                </Link>
              </p>
            </div>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 border-t border-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            <button
              type="button"
              onClick={signInWithGoogle}
              className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded py-2.5 text-sm hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
