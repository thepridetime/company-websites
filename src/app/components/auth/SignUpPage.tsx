import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Mail,
  User,
  Lock,
  Globe2,
  Newspaper,
  BookMarked,
  ShieldCheck,
} from "lucide-react";
import logoImg from "../../../imports/logo.png";
import { supabase } from "../../../lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const countries = ["India", "United States", "United Kingdom", "Singapore", "UAE", "Other"];

const perks = [
  { icon: Newspaper, text: "50M+ readers trust our reporting every month" },
  { icon: BookMarked, text: "Save articles and pick up where you left off, on any device" },
  { icon: ShieldCheck, text: "Ad-free reading and exclusive investigative reports with Premium" },
];

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

/** Simple 0–4 strength score: length + character variety. */
function scorePassword(pw: string): number {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

const STRENGTH_LABEL = ["Too short", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["bg-gray-200", "bg-red-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"];

export function SignUpPage() {
  const { signUp, signInWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("India");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const strength = useMemo(() => scorePassword(password), [password]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = "Required";
    if (!lastName.trim()) next.lastName = "Required";
    if (!email) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 8) next.password = "At least 8 characters.";
    if (confirmPassword !== password) next.confirmPassword = "Passwords don't match.";
    if (!agreed) next.agreed = "You must agree to continue.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setSubmitting(true);
    const result = await signUp(email, password, {
      name: `${firstName} ${lastName}`.trim(),
      country,
    });
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? "Could not create your account. Please try again.");
      return;
    }

    if (result.needsEmailConfirmation === false) {
      // Project has email confirmation off — user is already signed in.
      navigate("/dashboard", { replace: true });
      return;
    }

    setSuccess(true);
  };

  const handleResend = async () => {
    setResending(true);
    setResent(false);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/login` },
    });
    setResending(false);
    if (!error) setResent(true);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
          <CheckCircle2 size={36} className="text-emerald-600 mx-auto mb-4" />
          <h1 className="text-xl">Check your inbox</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            We've sent a confirmation link to <span className="text-gray-900 font-medium">{email}</span>. Verify
            your email to activate your account.
          </p>

          <button
            onClick={handleResend}
            disabled={resending}
            className="text-xs text-red-600 hover:underline mt-4 disabled:opacity-50"
          >
            {resending ? "Resending..." : "Didn't get it? Resend email"}
          </button>
          {resent && <p className="text-[11px] text-emerald-600 mt-1">Confirmation email resent.</p>}

          <Link
            to="/login"
            className="block mt-6 bg-black text-white text-sm px-6 py-2.5 rounded hover:bg-gray-800 transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

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
          <h2 className="text-3xl leading-tight mb-6">Join 50M+ readers. Free forever, premium optional.</h2>
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

        <div className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-sm">
            <div className="mb-6">
              <h1 className="text-2xl">Create your account</h1>
              <p className="text-sm text-gray-500 mt-1">Join 50M+ readers. Free forever, premium optional.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 flex items-start gap-2">
                <AlertCircle size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">First Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (fieldErrors.firstName) setFieldErrors((f) => ({ ...f, firstName: "" }));
                      }}
                      placeholder="John"
                      className={`w-full border rounded px-3 py-2.5 pl-9 text-sm outline-none transition-colors ${
                        fieldErrors.firstName ? "border-red-400" : "border-gray-300 focus:border-black"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (fieldErrors.lastName) setFieldErrors((f) => ({ ...f, lastName: "" }));
                    }}
                    placeholder="Smith"
                    className={`w-full border rounded px-3 py-2.5 text-sm outline-none transition-colors ${
                      fieldErrors.lastName ? "border-red-400" : "border-gray-300 focus:border-black"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: "" }));
                    }}
                    placeholder="you@example.com"
                    className={`w-full border rounded px-3 py-2.5 pl-9 text-sm outline-none transition-colors ${
                      fieldErrors.email ? "border-red-400" : "border-gray-300 focus:border-black"
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
                      if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: "" }));
                    }}
                    placeholder="Min 8 characters"
                    className={`w-full border rounded px-3 py-2.5 pl-9 pr-10 text-sm outline-none transition-colors ${
                      fieldErrors.password ? "border-red-400" : "border-gray-300 focus:border-black"
                    }`}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                {password.length > 0 && (
                  <div className="mt-1.5">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i < strength ? STRENGTH_COLOR[strength] : "bg-gray-150"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">{STRENGTH_LABEL[strength]}</p>
                  </div>
                )}
                {fieldErrors.password && <p className="text-[11px] text-red-600 mt-1">{fieldErrors.password}</p>}
              </div>

              <div>
                <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (fieldErrors.confirmPassword) setFieldErrors((f) => ({ ...f, confirmPassword: "" }));
                    }}
                    placeholder="Re-enter password"
                    className={`w-full border rounded px-3 py-2.5 pl-9 pr-10 text-sm outline-none transition-colors ${
                      fieldErrors.confirmPassword ? "border-red-400" : "border-gray-300 focus:border-black"
                    }`}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-[11px] text-red-600 mt-1">{fieldErrors.confirmPassword}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">Country</label>
                <div className="relative">
                  <Globe2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 pl-9 text-sm outline-none focus:border-black bg-white transition-colors appearance-none"
                  >
                    {countries.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (fieldErrors.agreed) setFieldErrors((f) => ({ ...f, agreed: "" }));
                    }}
                    className="w-3 h-3 mt-0.5"
                  />
                  <span>
                    I agree to The Pride Times{" "}
                    <Link to="/Terms" className="text-red-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/Privacy" className="text-red-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {fieldErrors.agreed && <p className="text-[11px] text-red-600 mt-1">{fieldErrors.agreed}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading || submitting}
                className="w-full bg-black text-white py-2.5 rounded text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading || submitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create Free Account"
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-red-600 hover:underline">
                  Sign in
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
