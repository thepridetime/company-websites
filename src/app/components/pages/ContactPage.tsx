import { useState } from "react";

/* ─────────────────────────────────────────────────────────
   CONTACT US — matches the provided reference screenshot:
   masthead-style heading, a contact form (Name, Email,
   Subject, Message, Send Message) on the left, and a list
   of office locations on the right.

   Uses the site's existing design tokens (pt-red #e31b23,
   pt-black #111111, Times New Roman masthead, Arial body)
   so it stays consistent with the rest of the publication.
───────────────────────────────────────────────────────── */

const offices = [
  {
    name: "New York (HQ)",
    address: "1221 Avenue of the Americas, New York, NY 10020",
    email: "editorial@pridetimes.com",
  },
  {
    name: "London",
    address: "30 St Mary Axe, London EC3A 8EP, UK",
    email: "europe@pridetimes.com",
  },
  {
    name: "Dubai",
    address: "DIFC, Gate District, Dubai, UAE",
    email: "mena@pridetimes.com",
  },
  {
    name: "Singapore",
    address: "10 Marina Blvd, Marina Bay Financial Centre, Singapore",
    email: "asia@pridetimes.com",
  },
];

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="bg-white text-[#111111]">
      <div className="pt-container py-10">

        {/* ── Top red editorial line ─────────────────────── */}
        <div className="border-t-[3px] border-[#e31b23] mb-6" />

        {/* ── Page heading ────────────────────────────────── */}
        <h1 className="font-serif text-[26px] sm:text-[30px] font-bold text-[#111111] mb-2">
          Contact Us
        </h1>

        <p className="text-[14px] sm:text-[15px] text-[#666666] mb-8">
          Have a story tip, a question, or want to get in touch? We'd
          love to hear from you.
        </p>

        {/* ── Main layout: form + offices ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10">

          {/* =================================================
              LEFT — CONTACT FORM
          ================================================= */}
          <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#666666] mb-2"
              >
                Name
              </label>

              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="w-full h-11 border border-[#d9d9d9] rounded-md px-3 text-[14px] outline-none focus:border-[#111111] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#666666] mb-2"
              >
                Email
              </label>

              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full h-11 border border-[#d9d9d9] rounded-md px-3 text-[14px] outline-none focus:border-[#111111] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#666666] mb-2"
              >
                Subject
              </label>

              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Message subject"
                required
                className="w-full h-11 border border-[#d9d9d9] rounded-md px-3 text-[14px] outline-none focus:border-[#111111] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#666666] mb-2"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                required
                rows={7}
                className="w-full border border-[#d9d9d9] rounded-md px-3 py-2.5 text-[14px] outline-none focus:border-[#111111] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="pt-subscribe-btn w-full inline-flex items-center justify-center px-6 py-3"
            >
              {submitted ? "Message Sent" : "Send Message"}
            </button>
          </form>

          {/* =================================================
              RIGHT — OFFICE LOCATIONS
          ================================================= */}
          <aside className="space-y-4">
            {offices.map((office) => (
              <div
                key={office.name}
                className="border border-[#e2e2e2] rounded-md p-5"
              >
                <h3 className="text-[15px] font-bold text-[#111111] mb-1">
                  {office.name}
                </h3>

                <p className="text-[13px] text-[#555555] leading-[1.5]">
                  {office.address}
                </p>

                <p className="text-[13px] text-[#e31b23] mt-1">
                  {office.email}
                </p>
              </div>
            ))}
          </aside>

        </div>
      </div>
    </main>
  );
}
