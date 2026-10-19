import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Link, useNavigate } from "react-router";
import {
  Crown, Check, X, Shield, Newspaper, BarChart2, Mail, Globe, Star,
  ChevronRight, Lock, Smartphone, AlertCircle, Loader2, CreditCard,
  UserPlus, Unlock, ShieldCheck, ArrowRight, FileText,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "../ui/accordion";

/* =========================================================
   SMALL SHARED PIECES
========================================================= */

function SH({
  eyebrow, title, subtitle, center = false,
}: { eyebrow: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-10 md:mb-14 text-gray-950 ${center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
      <p className={`flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-red-600 mb-3 ${center ? "justify-center" : ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
        {eyebrow}
      </p>
      <h2 className="font-serif text-[28px] md:text-[40px] font-bold tracking-tight leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-[15px] md:text-base leading-[1.7] mt-4">{subtitle}</p>
      )}
    </div>
  );
}

function ErrorBanner({ message, dark = false }: { message: string; dark?: boolean }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex items-start gap-2.5 rounded-[2px] border px-4 py-3 text-sm mt-5 max-w-xl ${
        dark
          ? "border-red-500/40 bg-red-500/10 text-red-200"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

/* =========================================================
   HELPERS
========================================================= */

// Supabase hides the real server error inside fnError.context. Dig it out.
async function readFnError(err: any, fallback: string): Promise<string> {
  try {
    const ctx = err?.context;
    if (ctx && typeof ctx.json === "function") {
      const body = await ctx.json();
      const msg = body?.error || body?.message;
      return `${msg || fallback} (HTTP ${ctx.status})`;
    }
  } catch {
    /* ignore */
  }
  return err?.message ? `${fallback} (${err.message})` : fallback;
}

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

/* =========================================================
   DATA
========================================================= */

const stats = [
  { value: "40,000+", label: "Premium readers" },
  { value: "25+ yrs", label: "Of searchable archive" },
  { value: "0", label: "Ads, on every page" },
  { value: "Anytime", label: "Cancel, no lock-in" },
];

const features = [
  { icon: Shield, title: "Ad-Free Reading", desc: "Every page, every edition — no banners, no pop-ups, no interruptions." },
  { icon: BarChart2, title: "Exclusive Market Reports", desc: "Analyst-grade deep dives on the sectors and stocks moving the world." },
  { icon: Newspaper, title: "Full Archive Access", desc: "25+ years of Pride Times reporting, searchable and unlocked." },
  { icon: Mail, title: "Priority Newsletters", desc: "Early-edition briefings before they reach the free list." },
  { icon: Globe, title: "Global Editions", desc: "Switch between India, US, UK and Asia coverage in one login." },
  { icon: Star, title: "Exclusive Interviews", desc: "CEO conversations and leadership profiles you won't find elsewhere." },
];

const steps = [
  { icon: UserPlus, title: "Sign in or create a free account", desc: "It takes under a minute. Your subscription lives on your account, not a device." },
  { icon: CreditCard, title: "Pick a plan and pay securely", desc: "UPI, cards or net banking through Razorpay. A secure window opens right on this page." },
  { icon: Unlock, title: "Premium unlocks straight away", desc: "You land on your dashboard with unlimited reading, no ads and the full archive." },
];

const comparison: { label: string; free: boolean; premium: boolean }[] = [
  { label: "Daily headlines & breaking news", free: true, premium: true },
  { label: "Markets ticker & basic quotes", free: true, premium: true },
  { label: "3 premium articles per month", free: true, premium: true },
  { label: "Unlimited premium articles", free: false, premium: true },
  { label: "Ad-free reading on every page", free: false, premium: true },
  { label: "Full 25-year archive", free: false, premium: true },
  { label: "Exclusive market & analyst reports", free: false, premium: true },
  { label: "Early-edition newsletters", free: false, premium: true },
  { label: "Global edition switching", free: false, premium: true },
  { label: "Offline reading in the app", free: false, premium: true },
];

type PlanId = "monthly" | "quarterly" | "annual" | "professional" | "executive";
type Currency = "INR" | "USD";

const PLAN_META: { id: PlanId; name: string; badge: string | null }[] = [
  { id: "monthly", name: "Monthly", badge: null },
  { id: "quarterly", name: "Quarterly", badge: null },
  { id: "annual", name: "Annual", badge: "Best Value" },
  { id: "professional", name: "Professional", badge: null },
  { id: "executive", name: "Executive / VIP", badge: null },
];

// Display prices. The server (create-order) holds the real amounts, so keep both in sync.
const PRICING: Record<Currency, Record<PlanId, { price: string; cadence: string; billed: string }>> = {
  INR: {
    monthly: { price: "₹299", cadence: "/ month", billed: "Billed every month, cancel anytime" },
    quarterly: { price: "₹799", cadence: "/ 3 months", billed: "Just ₹266/month — save 11%" },
    annual: { price: "₹2,999", cadence: "/ year", billed: "Just ₹250/month — save 16%" },
    professional: { price: "₹5,999", cadence: "/ year", billed: "Billed yearly, about ₹500/month" },
    executive: { price: "₹11,999", cadence: "/ year", billed: "Billed yearly, about ₹1,000/month" },
  },
  USD: {
    monthly: { price: "$5.99", cadence: "/ month", billed: "Billed every month, cancel anytime" },
    quarterly: { price: "$15.99", cadence: "/ 3 months", billed: "Just $5.33/month — save 11%" },
    annual: { price: "$59.99", cadence: "/ year", billed: "Just $5.00/month — save 17%" },
    professional: { price: "$119.99", cadence: "/ year", billed: "Billed yearly, about $10/month" },
    executive: { price: "$249", cadence: "/ year", billed: "Billed yearly, about $20.75/month" },
  },
};

const ANNUAL_SAVING: Record<Currency, string> = { INR: "₹589", USD: "$11.89" };

/* One-time digital products (not subscriptions) */
type ProductId =
  | "single_report"
  | "business_analysis"
  | "monthly_magazine"
  | "industry_report"
  | "annual_bundle"
  | "market_research";
type ItemId = PlanId | ProductId;

const PRODUCT_META: { id: ProductId; name: string }[] = [
  { id: "single_report", name: "Single premium news report" },
  { id: "business_analysis", name: "In-depth business analysis" },
  { id: "monthly_magazine", name: "Monthly digital magazine" },
  { id: "industry_report", name: "Special industry report" },
  { id: "annual_bundle", name: "Annual special-edition bundle" },
  { id: "market_research", name: "Premium market research report" },
];

// Display prices. The server (create-order) holds the real amounts, so keep both in sync.
const PRODUCT_PRICING: Record<Currency, Record<ProductId, string>> = {
  INR: {
    single_report: "₹99",
    business_analysis: "₹299",
    monthly_magazine: "₹199",
    industry_report: "₹499",
    annual_bundle: "₹999",
    market_research: "₹1,499",
  },
  USD: {
    single_report: "$1.99",
    business_analysis: "$5.99",
    monthly_magazine: "$3.99",
    industry_report: "$9.99",
    annual_bundle: "$19.99",
    market_research: "$29.99",
  },
};

const detectCurrency = (): Currency => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    return tz === "Asia/Calcutta" || tz === "Asia/Kolkata" ? "INR" : "USD";
  } catch {
    return "INR";
  }
};

const planPerks = ["Unlimited premium articles", "Full archive access", "Ad-free everywhere", "Priority newsletters"];

const testimonials = [
  { quote: "I read Pride Times every morning before my first meeting. Premium's early-edition briefing means I'm never the last one in the room to know.", name: "Neha Kapoor", role: "Portfolio Manager, Mumbai" },
  { quote: "The archive alone is worth it. I cite Pride Times reporting from a decade ago in client memos more often than I'd like to admit.", name: "Daniel Osei", role: "Strategy Consultant, London" },
  { quote: "Ad-free reading sounds like a small thing until you have it. I actually finish long-form pieces now instead of bouncing off after a paragraph.", name: "Arjun Mehta", role: "Product Lead, Bengaluru" },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Premium is month-to-month or year-to-year with no lock-in. Cancel from your account dashboard and you'll keep access until the end of your current billing period.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We process payments securely through Razorpay, which supports UPI, credit and debit cards, and net banking for Indian customers, plus major international cards.",
  },
  {
    q: "Does Premium cover the mobile app too?",
    a: "Yes — your subscription is tied to your account, not a device. Sign in on web or mobile and Premium access, including offline reading, follows you.",
  },
  {
    q: "Is there a free trial?",
    a: "New subscribers get a 30-day free trial on the monthly plan. You won't be charged until the trial ends, and you can cancel before then at no cost.",
  },
  {
    q: "Can I switch between monthly and annual?",
    a: "Yes, anytime from your account dashboard. If you switch to annual mid-cycle, we prorate the difference automatically.",
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export function PremiumPage() {
  const { user, isSignedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  const [busy, setBusy] = useState(false);
  const [busyPlan, setBusyPlan] = useState<ItemId | null>(null);
  const [trialBusy, setTrialBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [area, setArea] = useState<"plans" | "products">("plans");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");
  const [currency, setCurrency] = useState<Currency>(detectCurrency);

  const heroRef = useRef<HTMLElement | null>(null);
  const pricingRef = useRef<HTMLElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [pricingVisible, setPricingVisible] = useState(false);

  const isPremium = user?.tier === "premium";

  // Show the mobile sticky bar only when neither hero nor pricing is on screen
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === heroRef.current) setHeroVisible(e.isIntersecting);
          if (e.target === pricingRef.current) setPricingVisible(e.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    if (heroRef.current) io.observe(heroRef.current);
    if (pricingRef.current) io.observe(pricingRef.current);
    return () => io.disconnect();
  }, []);

  const showStickyBar = !isLoading && !isPremium && !heroVisible && !pricingVisible;

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buttonLabel = (name: string) =>
    isPremium ? "Current Plan" : isSignedIn ? `Choose ${name}` : "Sign up to subscribe";

  const handleChoosePlan = async (plan: ItemId) => {
    const isProduct = PRODUCT_META.some((p) => p.id === plan);
    if (!isProduct) setSelectedPlan(plan as PlanId);
    setArea(isProduct ? "products" : "plans");
    setError("");
    setSuccess("");
    if (isLoading) return;
    if (!isSignedIn || !user) { navigate("/signup"); return; }
    if (!isProduct && isPremium) { navigate("/dashboard"); return; }

    setBusy(true);
    setBusyPlan(plan);
    try {
      if (!(await loadRazorpay())) {
        throw new Error("Could not load the payment window. Check your internet or ad-blocker and try again.");
      }

      const { data, error: fnError } = await supabase.functions.invoke("create-order", {
        body: { plan, currency },
      });
      if (fnError) {
        throw new Error(await readFnError(fnError, "Could not start the payment"));
      }
      if (!data?.order_id) {
        throw new Error("Payment server did not return an order. Please try again.");
      }

      const rzp = new (window as any).Razorpay({
        key: data.key_id,
        order_id: data.order_id,
        amount: data.amount,
        currency: data.currency,
        name: "The Pride Times",
        description: isProduct ? `Digital product: ${plan}` : `Premium, ${plan}`,
        prefill: { name: user.name, email: user.email },
        theme: { color: "#dc2626" },
        handler: async (response: any) => {
          const { error: verifyError } = await supabase.functions.invoke("verify-payment", {
            body: response,
          });
          if (verifyError) {
            const detail = await readFnError(verifyError, "Could not confirm the payment");
            setError(
              `Payment received but not confirmed yet: ${detail}. Contact us with payment ID ` +
                response.razorpay_payment_id
            );
            setBusy(false);
            setBusyPlan(null);
            return;
          }
          if (isProduct) {
            setSuccess(
              `Thank you! Your purchase is confirmed. Payment ID: ${response.razorpay_payment_id}`
            );
            setBusy(false);
            setBusyPlan(null);
            return;
          }
          window.location.assign("/dashboard");
        },
        modal: {
          ondismiss: () => { setBusy(false); setBusyPlan(null); },
        },
      });
      rzp.on("payment.failed", () => {
        setError("Payment failed. You have not been charged.");
        setBusy(false);
        setBusyPlan(null);
      });
      rzp.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
      setBusyPlan(null);
    }
  };

  const handleTrial = async () => {
    setError("");
    if (isLoading) return;
    if (!isSignedIn) { navigate("/signup"); return; }
    setTrialBusy(true);
    setBusy(true);
    try {
      const { error: rpcError } = await supabase.rpc("start_trial");
      if (rpcError) {
        setError(
          rpcError.message?.includes("already")
            ? "You have already used your free trial."
            : "Could not start your trial. Please try again."
        );
        setBusy(false);
        setTrialBusy(false);
        return;
      }
      window.location.assign("/dashboard");
    } catch {
      setError("Could not start your trial. Please try again.");
      setBusy(false);
      setTrialBusy(false);
    }
  };

  const plans = PLAN_META.map((m) => ({ ...m, ...PRICING[currency][m.id] }));
  const selected = plans.find((p) => p.id === selectedPlan)!;
  const annualPlan = plans.find((p) => p.id === "annual")!;

  return (
    <div className={`w-full bg-white text-gray-900 antialiased ${showStickyBar ? "pb-24 md:pb-0" : ""}`}>

      {/* =================================================
          HERO
      ================================================= */}

      <section ref={heroRef} className="relative overflow-hidden bg-black text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.28),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:48px_48px]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left: copy + CTAs */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 mb-6">
                <Crown size={13} className="text-yellow-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                  Pride Times Premium
                </span>
              </div>

              <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[58px] font-bold leading-[1.05] tracking-tight">
                Reporting worth paying attention to — and worth paying for.
              </h1>

              <p className="text-gray-400 text-base md:text-lg leading-[1.7] mt-6 max-w-xl">
                Unlimited access to every story, report and archive Pride Times
                publishes, with none of the ads and none of the paywall
                guesswork. Cancel whenever you like.
              </p>

              {isLoading ? (
                <div className="mt-9 h-12 w-64 rounded-[2px] bg-white/10 animate-pulse" aria-hidden="true" />
              ) : isPremium ? (
                <div className="flex flex-wrap items-center gap-3 mt-9">
                  <span className="inline-flex items-center gap-2 bg-yellow-400 text-black text-sm font-semibold px-5 py-3 rounded-[2px]">
                    <Crown size={15} /> You're already Premium
                  </span>
                  <Link
                    to="/dashboard"
                    className="text-sm text-gray-300 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    Manage subscription
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-9">
                    <button
                      type="button"
                      onClick={handleTrial}
                      disabled={busy}
                      className={`bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-7 py-3.5 rounded-[2px] transition-colors flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
                    >
                      {trialBusy ? (
                        <><Loader2 size={15} className="animate-spin" /> Starting trial…</>
                      ) : (
                        <>Start your free 30-day trial <ChevronRight size={15} /></>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={scrollToPricing}
                      className={`text-sm text-gray-300 hover:text-white underline underline-offset-4 transition-colors ${focusRing}`}
                    >
                      See pricing
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    No card charged until the trial ends. Cancel before then at no cost.
                  </p>
                  <ErrorBanner message={error} dark />
                </>
              )}
            </div>

            {/* Right: what-you-get card */}
            <aside
              aria-label="What Premium includes"
              className="relative rounded-[2px] border border-white/15 bg-white/[0.04] backdrop-blur-sm p-7"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                  <Crown size={13} /> Premium member
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] bg-yellow-400 text-black px-2 py-1 rounded-[2px]">
                  Best Value
                </span>
              </div>
              <p className="font-serif text-4xl font-bold mt-5">
                {annualPlan.price}{" "}
                <span className="text-sm font-sans font-normal text-gray-400">{annualPlan.cadence}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">{annualPlan.billed}</p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
                {planPerks.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-200">
                    <Check size={14} className="text-yellow-400 shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              {!isPremium && !isLoading && (
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className={`mt-7 w-full inline-flex items-center justify-center gap-2 border border-white/25 hover:bg-white hover:text-black text-white text-sm font-semibold py-3 rounded-[2px] transition-colors ${focusRing}`}
                >
                  Compare plans <ArrowRight size={15} />
                </button>
              )}
            </aside>
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap gap-x-8 gap-y-3 text-xs text-gray-400">
            <span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-yellow-400" /> Secure payments via Razorpay</span>
            <span className="inline-flex items-center gap-2"><Check size={14} className="text-yellow-400" /> Cancel anytime, no lock-in</span>
            <span className="inline-flex items-center gap-2"><Smartphone size={14} className="text-yellow-400" /> Works on web and mobile</span>
            <span className="inline-flex items-center gap-2"><Newspaper size={14} className="text-yellow-400" /> 25+ years of archive</span>
          </div>
        </div>
      </section>

      {/* =================================================
          STATS BAND
      ================================================= */}

      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-serif text-3xl md:text-4xl font-bold text-gray-950">{s.value}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================
          FEATURE GRID
      ================================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SH
          eyebrow="Why Subscribe"
          title="Everything a free account leaves on the table"
          subtitle="Six things that change the moment you upgrade."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group flex gap-4 rounded-[2px] border border-gray-200 bg-white p-6 transition-all hover:border-gray-950 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black text-yellow-400 shrink-0 transition-transform group-hover:scale-105">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-[15px] text-gray-950">{title}</h3>
                <p className="text-sm text-gray-600 leading-[1.65] mt-1.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================
          HOW IT WORKS
      ================================================= */}

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SH
            eyebrow="How It Works"
            title="From free reader to Premium in three steps"
          />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="relative rounded-[2px] border border-gray-200 bg-white p-7">
                <span className="absolute -top-3 left-7 bg-black text-yellow-400 text-[11px] font-bold px-2.5 py-1 rounded-[2px]">
                  Step {i + 1}
                </span>
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-red-600 text-white">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-[16px] text-gray-950 mt-5">{title}</h3>
                <p className="text-sm text-gray-600 leading-[1.65] mt-2">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =================================================
          FREE VS PREMIUM COMPARISON
      ================================================= */}

      <section className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SH eyebrow="Compare Plans" title="What changes when you upgrade" />

          <div className="border border-gray-200 rounded-[2px] overflow-hidden bg-white shadow-[0_8px_30px_-16px_rgba(0,0,0,0.2)]">
            <div className="grid grid-cols-[1fr_72px_84px] sm:grid-cols-[1fr_88px_104px] md:grid-cols-[1fr_120px_140px] bg-gray-950 text-white">
              <div className="px-4 sm:px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Feature
              </div>
              <div className="px-2 py-4 text-xs font-semibold uppercase tracking-wider text-center">
                Free
              </div>
              <div className="px-2 py-4 text-xs font-semibold uppercase tracking-wider text-center text-yellow-400 flex items-center justify-center gap-1.5">
                <Crown size={12} /> Premium
              </div>
            </div>

            {comparison.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_72px_84px] sm:grid-cols-[1fr_88px_104px] md:grid-cols-[1fr_120px_140px] items-center transition-colors hover:bg-gray-50 ${
                  i !== comparison.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="px-4 sm:px-5 py-3.5 text-sm text-gray-800">{row.label}</div>
                <div className="px-2 py-3.5 flex justify-center">
                  {row.free ? (
                    <Check size={16} className="text-gray-400" strokeWidth={2.5} aria-label="Included" />
                  ) : (
                    <X size={14} className="text-gray-300" strokeWidth={2.5} aria-label="Not included" />
                  )}
                </div>
                <div className="px-2 py-3.5 flex justify-center self-stretch items-center bg-red-50/60">
                  {row.premium ? (
                    <Check size={16} className="text-red-600" strokeWidth={2.5} aria-label="Included" />
                  ) : (
                    <X size={14} className="text-gray-300" strokeWidth={2.5} aria-label="Not included" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          PRICING
      ================================================= */}

      <section
        id="pricing"
        ref={pricingRef}
        className="border-t border-gray-200 bg-gray-50 scroll-mt-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SH
            eyebrow="Membership"
            title="Pick the plan that fits how you read"
            subtitle={`Annual saves ${ANNUAL_SAVING[currency]} compared with paying monthly for a year.`}
          />

          {/* Region / currency switch */}
          <div
            role="group"
            aria-label="Choose your region"
            className="inline-flex rounded-[2px] border border-gray-300 bg-white p-1 mb-8"
          >
            {([
              { id: "INR", label: "India (₹ INR)" },
              { id: "USD", label: "International ($ USD)" },
            ] as { id: Currency; label: string }[]).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCurrency(c.id)}
                aria-pressed={currency === c.id}
                className={`px-4 py-2 text-xs font-semibold rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${
                  currency === c.id ? "bg-black text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div
            role="radiogroup"
            aria-label="Choose a plan"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          >
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const isThisBusy = busyPlan === plan.id;
              const dark = !!plan.badge;
              return (
                <div
                  key={plan.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative cursor-pointer rounded-[2px] border p-6 flex flex-col transition-all ${
                    dark
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-950"
                  } ${
                    isSelected
                      ? "ring-2 ring-red-600 ring-offset-2 ring-offset-gray-50 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.45)]"
                      : "hover:border-gray-950"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-7 bg-yellow-400 text-black text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-[2px]">
                      {plan.badge}
                    </span>
                  )}

                  {/* selection indicator */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-6 right-6 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                      isSelected
                        ? "border-red-600 bg-red-600 text-white"
                        : dark ? "border-white/30" : "border-gray-300"
                    }`}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </span>

                  <p className={`text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    {plan.name}
                  </p>

                  <div className="flex items-baseline gap-1.5 mt-3">
                    <span className="font-serif text-3xl xl:text-4xl font-bold">{plan.price}</span>
                    <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
                      {plan.cadence}
                    </span>
                  </div>

                  <p className={`text-xs mt-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    {plan.billed}
                  </p>

                  <ul className="flex flex-col gap-2.5 mt-6 mb-8 flex-1">
                    {planPerks.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <Check size={14} className={dark ? "text-yellow-400" : "text-red-600"} strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleChoosePlan(plan.id); }}
                    disabled={isPremium || busy}
                    className={`w-full py-3.5 rounded-[2px] text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${
                      dark
                        ? "bg-red-600 hover:bg-red-700 text-white focus-visible:ring-offset-black"
                        : "bg-black hover:bg-gray-900 text-white"
                    }`}
                  >
                    {isThisBusy ? (
                      <><Loader2 size={15} className="animate-spin" /> Opening payment…</>
                    ) : (
                      buttonLabel(plan.name)
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Errors from the payment flow show here, right under the cards */}
          <ErrorBanner message={area === "plans" ? error : ""} />

          {/* Payment trust row */}
          <div className="mt-8 max-w-3xl flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {["UPI", "Credit & debit cards", "Net banking", "International cards"].map((m) => (
                <span key={m} className="text-xs font-medium text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                  {m}
                </span>
              ))}
            </div>
            <p className="flex items-center gap-2 text-xs text-gray-500">
              <Lock size={12} /> Payments are processed securely via Razorpay. We never store your card details.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          DIGITAL PRODUCTS (ONE-TIME PURCHASES)
      ================================================= */}

      <section id="reports" className="border-t border-gray-200 bg-white scroll-mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SH
            eyebrow="Buy Individually"
            title="Not ready to subscribe? Buy just what you need"
            subtitle={`One-time purchases with no subscription and no renewal. Prices shown in ${
              currency === "INR" ? "₹ INR" : "$ USD"
            }; switch region in the plans section above.`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_META.map((p) => {
              const isThisBusy = busyPlan === p.id;
              return (
                <div
                  key={p.id}
                  className="flex flex-col rounded-[2px] border border-gray-200 bg-white p-6 transition-all hover:border-gray-950 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-yellow-400">
                    <FileText size={17} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-semibold text-[15px] text-gray-950 mt-4">{p.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">One-time purchase</p>
                  <p className="font-serif text-3xl font-bold text-gray-950 mt-4 flex-1">
                    {PRODUCT_PRICING[currency][p.id]}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleChoosePlan(p.id)}
                    disabled={busy}
                    className="mt-5 w-full py-3 rounded-[2px] bg-black hover:bg-gray-900 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                  >
                    {isThisBusy ? (
                      <><Loader2 size={15} className="animate-spin" /> Opening payment…</>
                    ) : isSignedIn ? (
                      "Buy now"
                    ) : (
                      "Sign up to buy"
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <ErrorBanner message={area === "products" ? error : ""} />
          {success && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-start gap-2.5 rounded-[2px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 mt-5 max-w-xl"
            >
              <Check size={16} className="mt-0.5 shrink-0" />
              <span>{success}</span>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          TESTIMONIALS
      ================================================= */}

      <section className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SH eyebrow="Reader Notes" title="What premium readers say" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-gray-50 border border-gray-200 rounded-[2px] p-7 flex flex-col">
                <div className="flex gap-0.5 text-yellow-500" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} size={14} className="fill-current" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="text-[15px] text-gray-700 leading-[1.75] flex-1 mt-4">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-gray-200 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-yellow-400 text-xs font-bold shrink-0"
                  >
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-950">{t.name}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          FAQ
      ================================================= */}

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SH eyebrow="Questions" title="Frequently asked" />

          <Accordion type="single" collapsible className="border-t border-gray-300">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-300">
                <AccordionTrigger className="text-[15px] font-semibold text-gray-950 hover:no-underline py-5 text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-[1.7] pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}

      {!isLoading && !isPremium && (
        <section className="relative overflow-hidden bg-black text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(220,38,38,0.28),transparent_55%)]"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="font-serif text-[28px] md:text-[36px] font-bold leading-[1.15]">
                Start your 30-day free trial today.
              </h2>
              <p className="text-gray-400 text-sm mt-3 flex items-center justify-center md:justify-start gap-2">
                <Smartphone size={13} /> Works on web and mobile. No card charged until the trial ends.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={handleTrial}
                disabled={busy}
                className={`bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-8 py-3.5 rounded-[2px] transition-colors flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
              >
                {trialBusy ? (
                  <><Loader2 size={15} className="animate-spin" /> Starting trial…</>
                ) : (
                  <>Start free trial <ChevronRight size={15} /></>
                )}
              </button>
              <button
                type="button"
                onClick={scrollToPricing}
                className={`text-sm text-gray-300 hover:text-white underline underline-offset-4 transition-colors ${focusRing}`}
              >
                See plans
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          MOBILE STICKY BAR
      ================================================= */}

      {showStickyBar && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/95 backdrop-blur px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-yellow-400">
              {selected.name}
            </p>
            <p className="text-white text-sm font-semibold truncate">
              {selected.price} <span className="text-gray-400 font-normal">{selected.cadence}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleChoosePlan(selectedPlan)}
            disabled={busy}
            className="shrink-0 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-[2px] transition-colors flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? (
              <><Loader2 size={14} className="animate-spin" /> Please wait…</>
            ) : isSignedIn ? (
              <>Continue <ChevronRight size={14} /></>
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      )}
    </div>
  );
}