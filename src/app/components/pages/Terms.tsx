import React from "react";
import { Link } from "react-router";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using The Pride Times website (thepridetime.com), mobile applications, newsletters, feeds, or any of our digital products and services (collectively, the "Services"), you agree to be bound by these Terms of Service, our Privacy Policy, and our News Disclaimer & Copyright Notice. If you do not agree to these terms, you must discontinue using our services immediately.`
  },
  {
    title: "2. News, Editorial & Market Data Disclaimer",
    content: `The Pride Times is a digital news and media organization. All articles, market summaries, stock quotes, financial reports, cryptocurrency metrics, economic data, and editorial analyses are published strictly for general informational, educational, and journalistic purposes.

NOTHING ON OUR SERVICES CONSTITUTES FINANCIAL, INVESTMENT, TAX, ACCOUNTING, OR LEGAL ADVICE. We do not recommend or endorse the buying, selling, or holding of any stock, asset, or commodity. Market investments carry inherent risk of capital loss. Readers must perform independent due diligence and seek professional advice from qualified financial consultants before taking action.

For our full editorial policies, please review our comprehensive News Disclaimer & Copyright Notice at /disclaimer.`
  },
  {
    title: "3. Copyright, Intellectual Property & Fair Use",
    content: `All content published on The Pride Times - including articles, investigative reports, graphics, original artwork, photographs, audio/video, design layouts, and software code - is the exclusive property of The Pride Times Inc. or its licensors and is protected by United States and international copyright, trademark, and intellectual property laws.

You may not copy, reproduce, distribute, republish, syndicate, sell, modify, or create derivative works from any content without prior written permission from The Pride Times.

Fair Use: Limited quotation of our news content (under 100 words) for commentary, criticism, or news reporting is permitted under 17 U.S.C. 107, provided clear editorial attribution is given with a direct, clickable hyperlink to the original article on thepridetime.com.

Data Scraping & AI Prohibition: Automated scraping, bot harvesting, or utilizing our content to train artificial intelligence models or machine learning systems without an explicit written license agreement is strictly prohibited.`
  },
  {
    title: "4. Subscription Services, Billing & Cancellation",
    content: `Our subscription plans provide access to premium editorial content, investigative deep-dives, industry reports, and exclusive features. Subscriptions are offered across multiple tiers (such as Digital, Premium, and Enterprise).

Billing: Subscription fees are billed in advance on a recurring monthly or annual basis. All payments are non-refundable except where expressly required by applicable consumer law. We reserve the right to modify subscription pricing with at least 30 days advance notice.

Renewal & Cancellation: Your subscription will automatically renew at the end of each billing period unless canceled prior to the renewal date. You can cancel your subscription at any time through your Account Dashboard or by contacting customer support.`
  },
  {
    title: "5. User Conduct & Acceptable Use",
    content: `You agree to use our Services only for lawful purposes. You agree not to:
(a) Access or tamper with non-public areas of the platform or our computer systems;
(b) Probe, scan, or test the vulnerability of any system, network, or authentication measures;
(c) Use automated systems, bots, crawlers, or scrapers without express written authorization;
(d) Transmit harmful, unlawful, infringing, defamatory, abusive, or malicious code or software;
(e) Share subscription account login credentials with unauthorized third parties.`
  },
  {
    title: "6. Third-Party Links & Advertising Disclosures (Google AdSense)",
    content: `Our Services contain links to third-party websites and display advertisements served by third-party advertising networks, including Google AdSense. We do not control or endorse the content, policies, or products offered on external sites or by advertisers. Advertisers and third-party vendors (including Google) may use cookies and web beacons to serve personalized ads based on previous visits. Your interactions with third-party advertisers are solely between you and the advertiser.`
  },
  {
    title: "7. Disclaimer of Warranties & Limitation of Liability",
    content: `THE SERVICES AND ALL CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR ACCURACY.

TO THE FULLEST EXTENT PERMITTED BY LAW, THE PRIDE TIMES INC., ITS DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR REVENUE ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF OUR SERVICES.`
  },
  {
    title: "8. Digital Millennium Copyright Act (DMCA) / Takedowns",
    content: `The Pride Times complies with the Digital Millennium Copyright Act (17 U.S.C. 512). If you believe any material on our site infringes upon your copyright, please review our DMCA Takedown procedure on our Disclaimer page (/disclaimer) or submit a notice to dmca@thepridetime.com.`
  },
  {
    title: "9. Governing Law & Jurisdiction",
    content: `These Terms of Service are governed by and construed in accordance with the laws of the State of New York, United States, without regard to conflict of law principles. Any legal action or dispute arising from these terms shall be settled exclusively in the state or federal courts located in New York County, New York.`
  },
  {
    title: "10. Contact Us & Modifications",
    content: `We may revise these Terms of Service periodically. We will post any updates here with the revised effective date. For legal questions or permissions requests, contact us at legal@thepridetime.com or by mail at The Pride Times Inc., 1 Enterprise Plaza, New York, NY 10004, United States.`
  }
];

export function Terms() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="text-[#C9A227] text-xs font-bold uppercase tracking-widest mb-2">
          Legal & Compliance
        </div>
        <h1 className="font-black text-[#0B1D35] text-3xl md:text-4xl mb-3">
          Terms of Service
        </h1>
        <p className="text-[#64748B] text-sm">
          Last updated: October 2026 • Effective Date: October 2026 • The Pride Times Inc.
        </p>
        <p className="text-[#374151] text-sm mt-4 leading-relaxed">
          These Terms of Service govern your use of The Pride Times website, digital publications, newsletters, and subscription services. Please read them thoroughly before using our platform.
        </p>
      </div>

      <div className="space-y-5">
        {sections.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="font-bold text-[#0B1D35] text-base md:text-lg mb-2">
              {s.title}
            </h2>
            <p className="text-[#374151] text-sm leading-relaxed whitespace-pre-line">
              {s.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
        <Link to="/disclaimer" className="text-[#C9A227] hover:underline font-medium">
          News Disclaimer & Copyright
        </Link>
        <span className="text-[#94A3B8]">•</span>
        <Link to="/privacy" className="text-[#C9A227] hover:underline font-medium">
          Privacy Policy
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

export default Terms;
