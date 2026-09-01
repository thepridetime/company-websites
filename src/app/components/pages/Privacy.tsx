import { Link } from "react-router";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, subscribe to our services, or contact us for support. This includes:
    
    Personal identification information: Name, email address, job title, company name, and other professional details you provide during registration.
    
    Payment information: When you subscribe to a paid plan, we collect payment card details. This information is processed by our PCI-DSS compliant payment processor and is not stored on our servers.
    
    Usage data: We automatically collect information about how you interact with our services, including articles read, time spent on pages, search queries, and navigation patterns. This data is used in aggregate form to improve our editorial and product offerings.
    
    Device and technical information: IP address, browser type, operating system, referring URLs, and other technical information about the devices and software you use to access our services.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:
    
    Provide, maintain, and improve our services, including personalizing your reading experience and delivering relevant content recommendations.
    
    Process transactions and send you related information, including purchase confirmations and invoices.
    
    Send you marketing and editorial communications, including our daily morning briefing, breaking news alerts, and promotional information about our subscription plans. You can opt out of marketing communications at any time.
    
    Monitor and analyze trends, usage, and activities in connection with our services to improve our editorial offering and user experience.
    
    Detect, investigate, and prevent fraudulent transactions and other illegal activities and protect the rights and property of The Pride Times and others.`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share information about you as follows:
    
    With vendors and service providers who need access to such information to carry out work on our behalf, including payment processors, email service providers, analytics services, and customer support platforms. These providers are bound by confidentiality agreements and are prohibited from using your information for any purpose other than providing services to us.
    
    In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process, including lawful requests by public authorities to meet national security or law enforcement requirements.
    
    If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of us or others.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When you close your account, we will delete or anonymize your personal information within 90 days, except where retention is required for legal, accounting, or legitimate business purposes.`,
  },
  {
    title: "5. Your Rights",
    content: `Depending on your location, you may have certain rights regarding your personal information, including:
    
    Right to access: You can request a copy of the personal information we hold about you.
    
    Right to correction: You can request that we correct inaccurate personal information.
    
    Right to deletion: You can request that we delete your personal information, subject to certain exceptions required by law.
    
    Right to portability: You can request a machine-readable export of your personal data.
    
    Right to restrict or object to processing: You can request that we restrict or stop processing your personal information.
    
    To exercise any of these rights, please contact our Privacy Team at privacy@thepridetimes.com.`,
  },
  {
    title: "6. Cookies",
    content: `We use cookies and similar tracking technologies to collect and use personal information about you. Our full Cookie Policy is available at thepridetimes.com/cookie-policy. You can control your cookie preferences through our Cookie Consent Manager, accessible from the footer of any page.`,
  },
  {
    title: "7. International Transfers",
    content: `The Pride Times operates globally, and your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. We take appropriate safeguards to require that your personal information will remain protected in accordance with this Privacy Policy.`,
  },
  {
    title: "8. Contact Us",
    content: `If you have questions about this Privacy Policy or our privacy practices, please contact our Privacy Team at privacy@thepridetimes.com or by post at: The Pride Times Privacy Team, 1 Enterprise Plaza, New York, NY 10004, United States.`,
  },
];

export function Privacy() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="text-[#C9A227] text-xs font-bold uppercase tracking-widest mb-2">Legal</div>
        <h1 className="font-black text-[#0B1D35] text-3xl mb-2">Privacy Policy</h1>
        <p className="text-[#64748B] text-sm">
          Last updated: May 1, 2026 · Effective Date: May 1, 2026
        </p>
        <p className="text-[#374151] text-sm mt-4 leading-relaxed">
          The Pride Times Inc. ("The Pride Times," "we," "us," or "our") is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use
          our website thepridetimes.com, our mobile applications, and our other digital products and services.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-black text-[#0B1D35] text-base mb-3">{section.title}</h2>
            <div className="text-[#374151] text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Link to="/terms" className="text-[#C9A227] text-sm hover:underline font-medium">Terms of Use</Link>
        <span className="text-[#94A3B8]">·</span>
        <Link to="/cookie-policy" className="text-[#C9A227] text-sm hover:underline font-medium">Cookie Policy</Link>
        <span className="text-[#94A3B8]">·</span>
        <Link to="/accessibility" className="text-[#C9A227] text-sm hover:underline font-medium">Accessibility</Link>
      </div>
    </div>
  );
}
