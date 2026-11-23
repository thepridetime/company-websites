import React from "react";
import { Link } from "react-router";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, subscribe to our services, or contact us for support. This includes:

Personal identification information: Name, email address, job title, company name, and other professional details you provide during registration.

Payment information: When you subscribe to a paid plan, we collect payment card details. This information is processed securely by our PCI-DSS compliant payment processor and is not stored on our servers.

Usage data: We automatically collect information about how you interact with our services, including articles read, time spent on pages, search queries, and navigation patterns. This data is used in aggregate form to improve our editorial and product offerings.

Device and technical information: IP address, browser type, operating system, referring URLs, device identifiers, and technical telemetry collected when you access our platform.`
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:
• Provide, maintain, and enhance our services, personalized news recommendations, and market analysis;
• Process subscription orders, issue invoices, and manage user accounts;
• Deliver editorial briefings, breaking news bulletins, and relevant newsletters (which you may opt out of at any time);
• Monitor and analyze readership trends, security events, and technical performance;
• Protect against fraud, unauthorized scraping, abuse, and security threats.`
  },
  {
    title: "3. Information Sharing & Third-Party Service Providers",
    content: `We do not sell, rent, or trade your personal information. We may share information with trusted third-party service providers who assist us in operating our platform, such as payment gateways, email distribution platforms, and hosting infrastructure under strict confidentiality agreements.

We may also disclose information if required by applicable law, regulation, legal process, or lawful governmental request.`
  },
  {
    title: "4. Third-Party Advertising & Google AdSense Cookies",
    content: `We partner with third-party advertising vendors, including Google AdSense, to display advertisements when you visit our website.

Google AdSense & DoubleClick Cookies:
• Third-party vendors, including Google, use cookies and web beacons to serve ads based on your prior visits to our website or other sites on the internet.
• Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to The Pride Times and/or other sites across the internet.
• Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or by visiting the Digital Advertising Alliance Consumer Choice page at https://optout.aboutads.info.

For more information on how Google collects and processes data when you visit partner sites, please review Google's Privacy & Terms: "How Google uses data when you use our partners' sites or apps" at https://policies.google.com/technologies/partner-sites.`
  },
  {
    title: "5. Cookies & Tracking Technologies",
    content: `We use cookies, web beacons, and local storage to keep you logged in, save your article bookmarks, remember your reading preferences, and measure web traffic. You can configure your browser to reject cookies or manage preferences via our Cookie Settings at /cookiepolicy.`
  },
  {
    title: "6. Data Retention & Security",
    content: `We retain personal data for as long as necessary to provide our services and satisfy legitimate business, legal, and reporting obligations. We maintain rigorous administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, or alteration.`
  },
  {
    title: "7. Your Privacy Rights (GDPR & CCPA/CPRA)",
    content: `Depending on your jurisdiction, you may have rights to access, correct, delete, or export your personal information, or to restrict or object to certain processing. To exercise your rights, please reach out to our Privacy Office at privacy@thepridetime.com.`
  },
  {
    title: "8. Contact Us",
    content: `If you have questions about this Privacy Policy or our data practices, please contact:
The Pride Times Privacy Team
Operating Entity: VIGOMERGE TECHNOLOGY (OPC) PRIVATE LIMITED
Email: privacy@thepridetime.com
Address: WeWork Forum, DLF Cyber City, DLF Phase 3, Sector 24, Gurugram, Haryana 122002, India`
  }
];

export function Privacy() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="text-[#C9A227] text-xs font-bold uppercase tracking-widest mb-2">
          Legal & Compliance
        </div>
        <h1 className="font-black text-[#0B1D35] text-3xl md:text-4xl mb-3">
          Privacy Policy
        </h1>
        <p className="text-[#64748B] text-sm">
          Last updated: October 2026 • Effective Date: October 2026 • The Pride Times Inc.
        </p>
        <p className="text-[#374151] text-sm mt-4 leading-relaxed">
          The Pride Times ("The Pride Times," "we," "us," or "our"), operated by VIGOMERGE TECHNOLOGY (OPC) PRIVATE LIMITED, is committed to protecting your personal data and upholding your privacy rights. This Privacy Policy outlines our data handling practices and discloses our use of cookies and third-party advertising partners, including Google AdSense.
        </p>
      </div>

      <div className="space-y-5">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="font-bold text-[#0B1D35] text-base md:text-lg mb-2">
              {section.title}
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
        <Link to="/terms" className="text-[#C9A227] hover:underline font-medium">
          Terms of Service
        </Link>
        <span className="text-[#94A3B8]">•</span>
        <Link to="/disclaimer" className="text-[#C9A227] hover:underline font-medium">
          News Disclaimer & Copyright
        </Link>
        <span className="text-[#94A3B8]">•</span>
        <Link to="/cookiepolicy" className="text-[#C9A227] hover:underline font-medium">
          Cookie Policy
        </Link>
        <span className="text-[#94A3B8]">•</span>
        <Link to="/about-us" className="text-[#C9A227] hover:underline font-medium">
          About Us
        </Link>
      </div>
    </div>
  );
}

export default Privacy;
