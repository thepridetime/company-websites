import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Mail,
  Clock,
  MapPin,
  ChevronDown,
  Send,
  CheckCircle2,
  Newspaper,
  Briefcase,
  BookOpen,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   THE PRIDE TIMES — CONTACT US
   Designed in the tradition of premier international business
   periodicals (Financial Times, Reuters, Bloomberg).
   - Strict black-and-white editorial foundation
   - Signature Pride Times red accents (#e31b23)
   - Serif headlines (40-48px hero, 24-30px sections)
   - Thin dividers and clean, uncluttered spacing
   - Centered container width (1,100px - 1,200px)
   - No generic customer-support fluff; true publication feel
────────────────────────────────────────────────────────────── */

interface ContactCategory {
  title: string;
  kicker: string;
  description: string;
  actionText: string;
  email: string;
  subjectValue: string;
  icon: typeof Newspaper;
}

const contactCategories: ContactCategory[] = [
  {
    kicker: "NEWSROOM & PITCHES",
    title: "Editorial & Newsroom",
    description: "Story ideas, corrections, news tips, and editorial inquiries.",
    actionText: "Contact the editorial team",
    email: "editorial@pridetimes.com",
    subjectValue: "Editorial & Story Pitch",
    icon: Newspaper,
  },
  {
    kicker: "SPONSORSHIPS & COMMERCIAL",
    title: "Advertising & Partnerships",
    description: "Advertising opportunities, sponsorships, and brand partnerships.",
    actionText: "Discuss a partnership",
    email: "partnerships@pridetimes.com",
    subjectValue: "Advertising & Partnerships",
    icon: Briefcase,
  },
  {
    kicker: "CIRCULATION & MEMBERSHIP",
    title: "Magazine & Subscriptions",
    description: "Digital editions, print subscriptions, and membership questions.",
    actionText: "Get subscription help",
    email: "subscriptions@pridetimes.com",
    subjectValue: "Magazine & Subscriptions",
    icon: BookOpen,
  },
  {
    kicker: "GENERAL ENQUIRIES",
    title: "General Inquiries",
    description: "Questions about the publication, website, or other matters.",
    actionText: "Send an inquiry",
    email: "contact@pridetimes.com",
    subjectValue: "General Inquiry",
    icon: HelpCircle,
  },
];

const bureaus = [
  {
    city: "London Bureau",
    address: "30 St Mary Axe, London EC3A 8EP, United Kingdom",
  },
  {
    city: "New York Bureau",
    address: "1221 Avenue of the Americas, New York, NY 10020, United States",
  },
  {
    city: "Singapore Bureau",
    address: "Marina Bay Financial Centre, 10 Marina Blvd, Singapore",
  },
];

const faqs = [
  {
    question: "How can I submit a news tip or story idea?",
    answer:
      "We welcome pitches and verified tips from journalists, industry analysts, and insiders. Please send detailed story outlines with supporting documentation directly to our editorial team at editorial@pridetimes.com. For sensitive disclosures, our desk can coordinate encrypted or confidential communication.",
  },
  {
    question: "How do I report an error in an article?",
    answer:
      "The Pride Times adheres to rigorous factual standards. If you believe a story contains a factual or contextual inaccuracy, please email corrections@pridetimes.com with the headline, published URL, and the specific correction needed. Our standards editor reviews all submissions in accordance with our correction policy.",
  },
  {
    question: "How can I subscribe to the magazine?",
    answer:
      "You can access both digital editions and print briefings through our Magazines directory or by choosing a plan on our Premium Access page. We also offer multi-seat corporate subscriptions and institutional licensing for financial firms, libraries, and universities.",
  },
  {
    question: "How can my company discuss advertising or partnerships?",
    answer:
      "Our commercial team crafts bespoke executive content, newsletter sponsorships, display placements, and high-impact event partnerships. Email partnerships@pridetimes.com or select 'Advertising & Partnerships' in the message form above to request our media kit and editorial calendar.",
  },
  {
    question: "How can I access premium content?",
    answer:
      "Subscribers can log in at any time via the Login page to unlock executive dossiers, intelligence briefs, and complete digital magazine archives. If you encounter any access difficulty, our subscription desk is available to assist.",
  },
];

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.507 17.523 2 12 2S2 6.507 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.459h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate lightweight client submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleCategorySelect = (subjectValue: string) => {
    setSubject(subjectValue);
    // Smoothly scroll down to the contact form
    const formElement = document.getElementById("contact-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <article className="bg-white text-[#111111] min-h-screen">
      {/* Centered content width: 1,100px – 1,200px */}
      <div className="w-full max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">

        {/* ── Top Red Editorial Line ──────────────────────────────── */}
        <div className="w-full border-t-[3px] border-[#e31b23] mb-6 sm:mb-8" />

        {/* ==========================================================
            1. HERO SECTION — GET IN TOUCH
        =========================================================== */}
        <header className="mb-12 sm:mb-14">
          <div className="max-w-[820px]">
            {/* Small Red Label */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#e31b23]" />
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#e31b23]">
                Contact The Pride Times
              </span>
            </div>

            {/* Main Heading: 40–48 px serif */}
            <h1 className="font-serif text-[34px] sm:text-[42px] lg:text-[46px] font-bold text-[#111111] leading-[1.08] tracking-[-0.02em] mb-4">
              “We’d Like to Hear From You.”
            </h1>

            {/* Supporting Text */}
            <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#333333]">
              Whether you have a story idea, a media inquiry, or a question about
              our publication, our team is here to help.
            </p>
          </div>

          {/* Thin Black Divider */}
          <hr className="border-t border-[#111111] mt-8 sm:mt-10" />
        </header>

        {/* ==========================================================
            2. CONTACT CATEGORIES (Two-Column Grid on Desktop)
        =========================================================== */}
        <section className="mb-14 sm:mb-16">
          <div className="flex items-center justify-between pb-2 mb-6 border-b border-[#e5e5e5]">
            <h2 className="font-serif text-[20px] sm:text-[22px] font-bold text-[#111111]">
              Select a Direct Department
            </h2>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#777777]">
              Fast Routing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {contactCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="group border border-[#e2e2e2] bg-[#ffffff] p-5 sm:p-6 transition-all duration-200 hover:border-[#111111] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#f0f0f0]">
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e31b23]">
                        {cat.kicker}
                      </span>
                      <Icon size={16} className="text-[#666666] group-hover:text-[#e31b23] transition-colors" />
                    </div>

                    <h3 className="font-serif text-[19px] sm:text-[20px] font-bold text-[#111111] mb-1.5 group-hover:text-[#e31b23] transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-[13.5px] sm:text-[14px] leading-[1.65] text-[#4a4a4a] mb-4">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f2f2f2] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(cat.subjectValue)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.06em] text-[#111111] group-hover:text-[#e31b23] transition-colors"
                    >
                      {cat.actionText}
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </button>

                    <a
                      href={`mailto:${cat.email}`}
                      className="text-[11px] text-[#777777] hover:text-[#111111] hover:underline transition-colors"
                    >
                      {cat.email}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================================
            3. & 4. MAIN CONTACT FORM & EDITORIAL OFFICE INFORMATION
            Form is the main focus beside compact info panel on desktop
        =========================================================== */}
        <section
          id="contact-form-section"
          className="scroll-mt-8 mb-14 sm:mb-16 lg:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ── 3. MAIN CONTACT FORM (7 cols on desktop) ──────── */}
            <div className="lg:col-span-7 border border-[#e0e0e0] bg-[#ffffff] p-6 sm:p-8">
              <div className="border-b border-[#e5e5e5] pb-4 mb-6">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#e31b23] block mb-1">
                  Online Dispatch
                </span>
                <h2 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#111111]">
                  Send Us a Message
                </h2>
                <p className="text-[13.5px] text-[#555555] mt-1">
                  Fill in the details below and select the subject of your inquiry.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 bg-[#fafafa] border border-[#d4d4d4] text-center my-6">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-[#111111] text-white">
                    <CheckCircle2 size={24} className="text-[#ffffff]" />
                  </div>
                  <h3 className="font-serif text-[20px] font-bold text-[#111111] mb-2">
                    Message Dispatched
                  </h3>
                  <p className="text-[14px] text-[#555555] max-w-[420px] mx-auto mb-5 leading-relaxed">
                    Thank you, <span className="font-semibold text-[#111111]">{fullName || "Reader"}</span>.
                    Your dispatch has been logged. Our editorial or administrative desk will respond to your email.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-[0.08em] hover:bg-[#e31b23] transition-colors"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111] mb-1.5"
                    >
                      Full name <span className="text-[#e31b23]">*</span>
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full h-11 px-3.5 bg-white border border-[#cccccc] text-[14px] text-[#111111] placeholder:text-[#999999] outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email-address"
                      className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111] mb-1.5"
                    >
                      Email address <span className="text-[#e31b23]">*</span>
                    </label>
                    <input
                      id="email-address"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. evance@institution.com"
                      className="w-full h-11 px-3.5 bg-white border border-[#cccccc] text-[14px] text-[#111111] placeholder:text-[#999999] outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <label
                      htmlFor="inquiry-subject"
                      className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111] mb-1.5"
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="inquiry-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full h-11 px-3.5 pr-10 bg-white border border-[#cccccc] text-[14px] text-[#111111] outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all appearance-none cursor-pointer"
                      >
                        <option value="General inquiry">General inquiry</option>
                        <option value="Editorial & Story Pitch">Editorial &amp; Story Pitch</option>
                        <option value="Corrections & Fact-Checking">Corrections &amp; Fact-Checking</option>
                        <option value="Advertising & Partnerships">Advertising &amp; Partnerships</option>
                        <option value="Magazine & Subscriptions">Magazine &amp; Subscriptions</option>
                        <option value="Press & Media Requests">Press &amp; Media Requests</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777777] pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Your Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111] mb-1.5"
                    >
                      Your message <span className="text-[#e31b23]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please provide specific context, references, or details regarding your inquiry..."
                      className="w-full p-3.5 bg-white border border-[#cccccc] text-[14px] text-[#111111] placeholder:text-[#999999] outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Primary Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#e31b23] text-white text-[12.5px] font-bold uppercase tracking-[0.1em] transition-all duration-200 hover:bg-[#c9151c] hover:shadow-[0_4px_16px_rgba(227,27,35,0.25)] disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>Processing dispatch...</>
                      ) : (
                        <>
                          <Send size={14} />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>

                  {/* Implementation Note Banner */}
                  <div className="pt-4 border-t border-[#f0f0f0] text-[11.5px] leading-relaxed text-[#777777] flex items-start gap-2 bg-[#fbfbfb] p-3 border border-[#eeeeee]">
                    <ShieldAlert size={14} className="text-[#888888] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-[#555555]">Prepare form implementation:</strong> This is a design preview. The form needs a connected backend or form service to deliver messages.
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* ── 4. EDITORIAL OFFICE INFORMATION (5 cols on desktop) ── */}
            <aside className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Bureau Information Panel */}
              <div className="border border-[#e0e0e0] bg-[#fafafa] p-6 sm:p-7">
                <div className="border-b border-[#e5e5e5] pb-3 mb-5 flex items-center justify-between">
                  <h3 className="font-serif text-[19px] sm:text-[21px] font-bold text-[#111111]">
                    Editorial Office Information
                  </h3>
                  <span className="w-2 h-2 bg-[#111111]" />
                </div>

                {/* General Contact Email */}
                <div className="mb-5 pb-5 border-b border-[#e8e8e8]">
                  <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#e31b23] mb-1.5">
                    <Mail size={13} />
                    Direct Publication Email
                  </div>
                  <p className="text-[14px] text-[#111111] font-medium">
                    <a href="mailto:contact@pridetimes.com" className="hover:text-[#e31b23] hover:underline">
                      contact@pridetimes.com
                    </a>
                  </p>
                  <p className="text-[12px] text-[#666666] mt-0.5">
                    News tips:{" "}
                    <a href="mailto:editorial@pridetimes.com" className="text-[#111111] hover:underline font-medium">
                      editorial@pridetimes.com
                    </a>
                  </p>
                </div>

                {/* Office Hours & Response Window */}
                <div className="mb-5 pb-5 border-b border-[#e8e8e8]">
                  <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#111111] mb-1.5">
                    <Clock size={13} />
                    Desk Hours &amp; Response Time
                  </div>
                  <p className="text-[13px] leading-[1.65] text-[#444444]">
                    <strong>Monday – Friday:</strong> 08:00 – 19:00 (GMT &amp; EST)
                  </p>
                  <p className="text-[12px] text-[#666666] mt-1">
                    Standard inquiries receive responses within 24 to 48 business hours. Urgent breaking stories are monitored continuously by the duty desk.
                  </p>
                </div>

                {/* Verified Bureau Locations */}
                <div className="mb-5 pb-5 border-b border-[#e8e8e8]">
                  <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#111111] mb-2.5">
                    <MapPin size={13} />
                    Key Reporting Bureaus
                  </div>
                  <div className="space-y-3">
                    {bureaus.map((bureau) => (
                      <div key={bureau.city} className="border-l-2 border-[#111111] pl-3 py-0.5">
                        <div className="text-[12.5px] font-bold text-[#111111]">
                          {bureau.city}
                        </div>
                        <div className="text-[11.5px] text-[#666666] leading-snug">
                          {bureau.address}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Social Media Channels */}
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#777777] mb-2.5">
                    Official Publication Channels
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://x.com/thepridetime"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="The Pride Times on X"
                      className="w-9 h-9 border border-[#d8d8d8] bg-white flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all"
                    >
                      <XIcon size={15} />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/thepridetimes"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="The Pride Times on LinkedIn"
                      className="w-9 h-9 border border-[#d8d8d8] bg-white flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all"
                    >
                      <LinkedInIcon size={15} />
                    </a>
                    <a
                      href="https://www.facebook.com/thepridetime"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="The Pride Times on Facebook"
                      className="w-9 h-9 border border-[#d8d8d8] bg-white flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all"
                    >
                      <FacebookIcon size={15} />
                    </a>
                    <a
                      href="https://www.instagram.com/thepridetime/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="The Pride Times on Instagram"
                      className="w-9 h-9 border border-[#d8d8d8] bg-white flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all"
                    >
                      <InstagramIcon size={15} />
                    </a>
                  </div>
                </div>

              </div>

              {/* Editorial Charter Notice */}
              <div className="p-5 border-l-3 border-[#b89758] bg-[#fdfdfd] border border-[#eeeeee]">
                <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#b89758] block mb-1">
                  Journalistic Protection
                </span>
                <p className="text-[12px] leading-[1.65] text-[#555555]">
                  The Pride Times strictly protects confidential sources in accordance with international press freedom conventions. We never disclose source identities without explicit consent.
                </p>
              </div>

            </aside>

          </div>
        </section>

        {/* ==========================================================
            5. FREQUENTLY ASKED QUESTIONS
            Expandable accordion with subtle hairline dividers
        =========================================================== */}
        <section className="mb-14 sm:mb-16">
          <div className="border-b-2 border-[#111111] pb-3 mb-6">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#e31b23] block mb-1">
              Reader Support
            </span>
            <h2 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#111111]">
              Frequently Asked Questions
            </h2>
            <p className="text-[13.5px] text-[#666666] mt-1">
              Quick answers to common questions about our reporting, submissions, and subscriptions.
            </p>
          </div>

          <div className="divide-y divide-[#e5e5e5] border-t border-b border-[#e5e5e5]">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="py-4 sm:py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-[17px] sm:text-[18px] font-bold text-[#111111] group-hover:text-[#e31b23] transition-colors">
                      {faq.question}
                    </span>
                    <span className="shrink-0 w-7 h-7 flex items-center justify-center border border-[#d9d9d9] group-hover:border-[#111111] transition-colors">
                      <ChevronDown
                        size={15}
                        className={`text-[#555555] group-hover:text-[#111111] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pb-1 pr-6 text-[14px] leading-[1.7] text-[#4a4a4a] animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] text-[#666666] bg-[#fafafa] p-4 border border-[#e5e5e5]">
            <span>
              Have a specialized inquiry not answered here? Our editors and desk staff review all incoming mail daily.
            </span>
            <Link
              to="/about-us"
              className="inline-flex items-center gap-1 font-semibold text-[#111111] hover:text-[#e31b23] transition-colors whitespace-nowrap"
            >
              Read About Our Editorial Standards <ArrowRight size={13} />
            </Link>
          </div>
        </section>

      </div>
    </article>
  );
}
