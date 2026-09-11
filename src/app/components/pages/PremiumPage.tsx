import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Crown, Check, X, Shield, Newspaper, BarChart2, Mail, Globe, Star,
  ChevronRight, Lock, Smartphone,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "../ui/accordion";

/* =========================================================
   SECTION HEADER — matches the eyebrow + rule pattern used
   across the site's other editorial pages.
========================================================= */

function SH({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div className={`mb-10 md:mb-14 ${dark ? "text-white" : "text-gray-950"}`}>
      <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-red-600 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
        {eyebrow}
      </p>
      <h2 className="font-serif text-[28px] md:text-[38px] font-bold tracking-tight leading-[1.1]">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   DATA
========================================================= */

const features = [
  { icon: Shield, title: "Ad-Free Reading", desc: "Every page, every edition — no banners, no pop-ups, no interruptions." },
  { icon: BarChart2, title: "Exclusive Market Reports", desc: "Analyst-grade deep dives on the sectors and stocks moving the world." },
  { icon: Newspaper, title: "Full Archive Access", desc: "25+ years of Pride Times reporting, searchable and unlocked." },
  { icon: Mail, title: "Priority Newsletters", desc: "Early-edition briefings before they reach the free list." },
  { icon: Globe, title: "Global Editions", desc: "Switch between India, US, UK and Asia coverage in one login." },
  { icon: Star, title: "Exclusive Interviews", desc: "CEO conversations and leadership profiles you won't find elsewhere." },
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

const plans = [
  {
    id: "monthly" as const,
    name: "Monthly",
    price: "₹399",
    cadence: "/ month",
    billed: "Billed every month, cancel anytime",
    badge: null,
  },
  {
    id: "annual" as const,
    name: "Annual",
    price: "₹3,499",
    cadence: "/ year",
    billed: "Just ₹291/month — save 27%",
    badge: "Best Value",
  },
];

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
  const { user, isSignedIn, isLoading, upgradeToPremoium } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual");

  const isPremium = user?.tier === "premium";

  /** Kicks off the upgrade flow for the selected plan. Real checkout
   *  (Razorpay order creation + server-side verification) should be
   *  wired in here; until then this reflects the same optimistic-only
   *  flip the rest of the app uses, and always defers to refreshProfile
   *  / the server as the source of truth on next load. */
  const handleChoosePlan = (plan: "monthly" | "annual") => {
    setSelectedPlan(plan);

    if (!isSignedIn) {
      navigate("/signup");
      return;
    }
    if (isPremium) {
      navigate("/dashboard");
      return;
    }
    upgradeToPremoium();
    navigate("/dashboard");
  };

  return (
    <div className="w-full bg-white text-gray-900 antialiased">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 mb-6">
              <Crown size={13} className="text-yellow-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                Pride Times Premium
              </span>
            </div>

            <h1 className="font-serif text-[38px] md:text-[58px] font-bold leading-[1.05] tracking-tight">
              Reporting worth paying attention to — and worth paying for.
            </h1>

            <p className="text-gray-400 text-base md:text-lg leading-[1.7] mt-6 max-w-xl">
              Unlimited access to every story, report and archive Pride Times
              publishes, with none of the ads and none of the paywall
              guesswork. Cancel whenever you like.
            </p>

            {isLoading ? null : isPremium ? (
              <div className="flex items-center gap-3 mt-9">
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
              <div className="flex flex-wrap items-center gap-4 mt-9">
                <button
                  onClick={() => handleChoosePlan("annual")}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-7 py-3.5 rounded-[2px] transition-colors flex items-center gap-2"
                >
                  Start your free 30-day trial
                  <ChevronRight size={15} />
                </button>
                <a
                  href="#pricing"
                  className="text-sm text-gray-300 hover:text-white underline underline-offset-4 transition-colors"
                >
                  See pricing
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-12 pt-8 border-t border-white/10 text-xs text-gray-400">
              <span>40,000+ premium readers</span>
              <span>25+ years of archive</span>
              <span>Cancel anytime, no lock-in</span>
              <span>Secure payments via Razorpay</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          WHY GO PREMIUM — FEATURE GRID
      ================================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <SH eyebrow="Why Subscribe" title="Everything a free account leaves on the table" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-yellow-400 shrink-0">
                <Icon size={17} strokeWidth={1.75} />
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
          FREE VS PREMIUM COMPARISON
      ================================================= */}

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <SH eyebrow="Compare Plans" title="What changes when you upgrade" />

          <div className="border border-gray-200 rounded-[2px] overflow-hidden bg-white">
            <div className="grid grid-cols-[1fr,88px,88px] md:grid-cols-[1fr,120px,120px] border-b border-gray-200 bg-gray-950 text-white">
              <div className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Feature
              </div>
              <div className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-center">
                Free
              </div>
              <div className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-center text-yellow-400">
                Premium
              </div>
            </div>

            {comparison.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr,88px,88px] md:grid-cols-[1fr,120px,120px] items-center ${
                  i !== comparison.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="px-5 py-3.5 text-sm text-gray-800">{row.label}</div>
                <div className="px-3 py-3.5 flex justify-center">
                  {row.free ? (
                    <Check size={16} className="text-gray-400" strokeWidth={2.5} />
                  ) : (
                    <X size={14} className="text-gray-300" strokeWidth={2.5} />
                  )}
                </div>
                <div className="px-3 py-3.5 flex justify-center">
                  {row.premium ? (
                    <Check size={16} className="text-red-600" strokeWidth={2.5} />
                  ) : (
                    <X size={14} className="text-gray-300" strokeWidth={2.5} />
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

      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 scroll-mt-8">
        <SH eyebrow="Membership" title="Pick the plan that fits how you read" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative rounded-[2px] border p-7 flex flex-col transition-colors ${
                  plan.badge
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-950"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-7 bg-yellow-400 text-black text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-[2px]">
                    {plan.badge}
                  </span>
                )}

                <p className={`text-xs font-bold uppercase tracking-[0.18em] ${plan.badge ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.name}
                </p>

                <div className="flex items-baseline gap-1.5 mt-3">
                  <span className="font-serif text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.badge ? "text-gray-400" : "text-gray-500"}`}>
                    {plan.cadence}
                  </span>
                </div>

                <p className={`text-xs mt-2 ${plan.badge ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.billed}
                </p>

                <ul className="flex flex-col gap-2.5 mt-6 mb-8 flex-1">
                  {["Unlimited premium articles", "Full archive access", "Ad-free everywhere", "Priority newsletters"].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <Check size={14} className={plan.badge ? "text-yellow-400" : "text-red-600"} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleChoosePlan(plan.id)}
                  disabled={isPremium}
                  className={`w-full py-3 rounded-[2px] text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                    plan.badge
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-black hover:bg-gray-900 text-white"
                  }`}
                >
                  {isPremium ? "Current Plan" : isSignedIn ? `Choose ${plan.name}` : "Sign up to subscribe"}
                </button>
              </div>
            );
          })}
        </div>

        <p className="flex items-center gap-2 text-xs text-gray-400 mt-6">
          <Lock size={12} /> Payments are processed securely via Razorpay. We never store your card details.
        </p>
      </section>

      {/* =================================================
          TESTIMONIALS
      ================================================= */}

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <SH eyebrow="Reader Notes" title="What premium readers say" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-white border border-gray-200 rounded-[2px] p-6 flex flex-col">
                <blockquote className="text-[15px] text-gray-700 leading-[1.75] flex-1">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-950">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          FAQ
      ================================================= */}

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <SH eyebrow="Questions" title="Frequently asked" />

        <Accordion type="single" collapsible className="border-t border-gray-200">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-[15px] font-semibold text-gray-950 hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-[1.7] pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}

      {!isLoading && !isPremium && (
        <section className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="font-serif text-[28px] md:text-[34px] font-bold leading-[1.15]">
                Start your 30-day free trial today.
              </h2>
              <p className="text-gray-400 text-sm mt-2 flex items-center justify-center md:justify-start gap-2">
                <Smartphone size={13} /> Works on web and mobile. No card charged until the trial ends.
              </p>
            </div>
            <button
              onClick={() => handleChoosePlan("annual")}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-8 py-3.5 rounded-[2px] transition-colors flex items-center gap-2 shrink-0"
            >
              Get Premium <ChevronRight size={15} />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
