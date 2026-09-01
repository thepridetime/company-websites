import { Link } from "react-router";

export function Accessibility() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="text-[#C9A227] text-xs font-bold uppercase tracking-widest mb-2">Accessibility</div>
        <h1 className="font-black text-[#0B1D35] text-3xl mb-2">Accessibility Statement</h1>
        <p className="text-[#64748B] text-sm">Last reviewed: May 1, 2026</p>
      </div>

      <div className="space-y-4">
        {[
          {
            title: "Our Commitment",
            content: "The Pride Times is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards. Our goal is to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.",
          },
          {
            title: "Measures We Take",
            content: `We take the following measures to ensure accessibility:\n\n• Include accessibility as part of our mission and standards\n• Integrate accessibility into our procurement practices\n• Provide continual accessibility training for our staff\n• Include people with disabilities in our user experience research\n• Employ formal accessibility testing before major product releases\n• Address known accessibility issues promptly`,
          },
          {
            title: "Technical Specifications",
            content: "Our website relies on the following technologies for conformance: HTML, CSS, JavaScript, ARIA. The following features are used to support accessibility: semantic HTML landmarks, ARIA labels and roles, keyboard navigation support, focus management, color contrast meeting WCAG AA standards, and alternative text for all meaningful images.",
          },
          {
            title: "Known Limitations",
            content: "Despite our best efforts, some content may not yet fully meet our accessibility goals. Legacy content predating our accessibility standards, some third-party embedded content, and certain interactive data visualizations may have limitations. We are actively working to address these issues.",
          },
          {
            title: "Feedback & Contact",
            content: "We welcome your feedback on the accessibility of The Pride Times. Please let us know if you encounter accessibility barriers. We aim to respond to feedback within 2 business days.\n\nEmail: accessibility@thepridetimes.com\nPhone: +1 (212) 555-0147\nPostal address: Accessibility Team, The Pride Times, 1 Enterprise Plaza, New York, NY 10004",
          },
        ].map((s) => (
          <div key={s.title} className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-black text-[#0B1D35] text-sm mb-2">{s.title}</h2>
            <p className="text-[#374151] text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/privacy" className="text-[#C9A227] text-sm hover:underline font-medium">Privacy Policy</Link>
        <span className="text-[#94A3B8]">·</span>
        <Link to="/terms" className="text-[#C9A227] text-sm hover:underline font-medium">Terms of Use</Link>
      </div>
    </div>
  );
}
