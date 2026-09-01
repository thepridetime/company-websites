import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import logoImg from "../../../imports/logo.png";
import { supabase } from "../../../lib/supabase";

export function SignInPage() {
  const { signIn, signInWithGoogle, resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [registerEmail, setRegisterEmail] = useState("");
const [registerPassword, setRegisterPassword] = useState("");
const [country, setCountry] = useState("India");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await signIn(email, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error ?? "Authentication failed.");
    }
  };
const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  setError("");

 const { error } = await supabase.auth.signUp({
  email: registerEmail,
  password: registerPassword,
  options: {
    emailRedirectTo: `${window.location.origin}/signin`,
    data: {
      name: `${firstName} ${lastName}`,
      country,
    },
  },
});

  if (error) {
    setError(error.message);
    return;
  }

  alert("Account created successfully. Please check your email.");
  setMode("signin");
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header bar */}
      <div className="bg-black py-3 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoImg} alt="The Pride Times" className="h-10 w-auto object-contain mb-4"/>
          <span className="text-white text-sm">The Pride Times</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-3.5 text-sm transition-colors ${
                  mode === "signin" ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setMode("signin")}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-3.5 text-sm transition-colors ${
                  mode === "register" ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setMode("register")}
              >
                Create Account
              </button>
            </div>

            <div className="p-6">
              {mode === "signin" ? (
                <>
                  <div className="mb-6">
                    <h1 className="text-xl">Welcome back</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to access your Pride Times account</p>
                  </div>

                  {/* Demo hint */}
                 {/*} <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-5 flex items-start gap-2">
                    <CheckCircle size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-blue-700">Demo credentials:</p>
                      <p className="text-xs text-blue-600">Premium: demo@pridetimes.com / demo123</p>
                      <p className="text-xs text-blue-600">Free: free@pridetimes.com / free123</p>
                    </div>
                  </div>*/}

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 flex items-start gap-2">
                      <AlertCircle size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-red-700">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full border border-gray-300 rounded px-3 py-2.5 pl-9 text-sm outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          required
                          className="w-full border border-gray-300 rounded px-3 py-2.5 pl-9 pr-9 text-sm outline-none focus:border-black transition-colors"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                        <input type="checkbox" className="w-3 h-3" />
                        Remember me
                      </label>
                      <button
  type="button"
  className="text-xs text-red-600 hover:underline"
  onClick={async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }

    const result = await resetPassword(email);

    if (!result.success) {
      setError(result.error || "Failed to send reset email.");
      return;
    }

    alert("Password reset email sent. Please check your inbox.");
  }}
>
  Forgot password?
</button>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-black text-white py-2.5 rounded text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Signing in...
                        </span>
                      ) : "Sign In"}
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      New to The Pride Times?{" "}
                      <button onClick={() => setMode("register")} className="text-red-600 hover:underline">
                        Create free account
                      </button>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <h1 className="text-xl">Create your account</h1>
                    <p className="text-sm text-gray-500 mt-1">Join 50M+ readers. Free forever, premium optional.</p>
                  </div>

                  <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">First Name</label>
                        <input
  type="text"
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
  placeholder="John"
  required
  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-black"
/>
                      </div>
                      <div>
                        <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">Last Name</label>
                        <input
  type="text"
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
  placeholder="Smith"
  required
  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-black"
/>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">Email</label>
                      <input
  type="email"
  value={registerEmail}
  onChange={(e) => setRegisterEmail(e.target.value)}
  placeholder="you@example.com"
  required
  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-black"
/>
                    </div>
                    <div>
  <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={registerPassword}
      onChange={(e) => setRegisterPassword(e.target.value)}
      placeholder="Min 8 characters"
      required
      className="w-full border border-gray-300 rounded px-3 py-2.5 pr-10 text-sm outline-none focus:border-black"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
    >
      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
    </button>
  </div>
</div>
                    <div>
                      <label className="text-xs text-gray-700 uppercase tracking-wider block mb-1.5">Country</label>
                     <select
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-black bg-white"
>
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Singapore</option>
                        <option>UAE</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                      <input type="checkbox" className="w-3 h-3 mt-0.5" required />
                      <span>I agree to The Pride Times <a href="/Terms" className="text-red-600 hover:underline">Terms of Service</a> and <a href="/Privacy" className="text-red-600 hover:underline">Privacy Policy</a></span>
                    </label>
                    <button type="submit" className="w-full bg-black text-white py-2.5 rounded text-sm hover:bg-gray-800 transition-colors">
                      Create Free Account
                    </button>
                  </form>
                </>
              )}

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 border-t border-gray-200" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="flex-1 border-t border-gray-200" />
              </div>

              {/* Social logins */}
              <div className="flex flex-col gap-2">
             <button
  type="button"
  onClick={signInWithGoogle}
  className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded py-2.5 text-sm hover:bg-gray-50 transition-colors"
>
 <svg
  xmlns="http://www.w3.org/2000/svg"
  width="18"
  height="18"
  viewBox="0 0 48 48"
>
  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4C12.9 4 4 12.9 4 24s8.9 20 20 20s20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4C16.3 4 9.7 8.3 6.3 14.7z"/>
  <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.8-3.3-11.5-8l-6.5 5C9.4 39.5 16.1 44 24 44z"/>
  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.1 6.9l6.3 5.3C39.2 36.8 44 31 44 24c0-1.3-.1-2.4-.4-3.5z"/>
</svg>

  Continue with Google
</button>
               {/* <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded py-2.5 text-sm hover:bg-gray-50 transition-colors">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Continue with LinkedIn
                </button>*/}
              </div>
            </div>
          </div>

          {/* Subscribe upsell */}
          <div className="mt-4 bg-black text-white rounded-lg p-4 text-center">
            <p className="text-sm">Unlock Premium — $4.99/month</p>
            <p className="text-xs text-gray-400 mt-1">Ad-free reading · Exclusive reports · Archive access · Priority newsletters</p>
            <Link to="/dashboard" className="inline-block mt-3 bg-red-600 hover:bg-red-700 text-white text-xs px-6 py-2 rounded transition-colors">
              Start Free 30-Day Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
