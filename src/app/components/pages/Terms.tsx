import { Link } from "react-router";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using The Pride Times website, mobile applications, or any of our digital products and services, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "2. Subscription Services",
    content: `Our subscription plans provide access to premium editorial content, research reports, market data, and other exclusive features. Subscriptions are offered at Digital ($9/month), Premium ($19/month), and Enterprise ($49/month) tiers.\n\nSubscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as expressly set forth in these terms or as required by applicable law. We reserve the right to modify subscription pricing with 30 days advance notice to subscribers.\n\nYour subscription will automatically renew at the end of each billing period unless you cancel before the renewal date. You may cancel your subscription at any time through your account settings.`,
  },
  {
    title: "3. Intellectual Property",
    content: `All content published on The Pride Times — including articles, reports, data, graphics, photographs, and design elements — is protected by copyright and other intellectual property laws. You may not reproduce, distribute, transmit, modify, create derivative works of, or otherwise use any content without our express written permission.\n\nYou may share links to our articles and content on social media and other platforms. Limited quotation of our content for purposes of commentary, criticism, or news reporting is permitted, provided that proper attribution is given and a link to the original article is included.`,
  },
  {
    title: "4. User Conduct",
    content: `You agree not to: (a) use our services for any unlawful purpose or in violation of any regulations; (b) attempt to gain unauthorized access to any portion of our services or related systems; (c) use automated systems, bots, or scrapers to access our services without our written permission; (d) transmit any content that is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable; (e) share your subscription credentials with others who have not paid for access.`,
  },
  {
    title: "5. Disclaimer of Warranties",
    content: `Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, error-free, or free from viruses or other harmful components. Financial and market data published on The Pride Times is provided for informational purposes only and does not constitute investment advice.`,
  },
  {
    title: "6. Limitation of Liability",
    content: `To the maximum extent permitted by law, The Pride Times and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, our services. Our total liability to you for any claims arising from these terms or your use of our services shall not exceed the amount you paid us in the twelve months preceding the claim.`,
  },
  {
    title: "7. Governing Law",
    content: "These Terms of Use shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the state and federal courts located in New York County, New York.",
  },
  {
    title: "8. Changes to Terms",
    content: "We may revise these Terms of Use at any time. We will notify registered users of material changes by email and by displaying a notice on our website. Continued use of our services after notice of changes constitutes acceptance of the revised terms.",
  },
];

export function Terms() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="text-[#C9A227] text-xs font-bold uppercase tracking-widest mb-2">Legal</div>
        <h1 className="font-black text-[#0B1D35] text-3xl mb-2">Terms of Use</h1>
        <p className="text-[#64748B] text-sm">Last updated: May 1, 2026 · Effective Date: May 1, 2026</p>
        <p className="text-[#374151] text-sm mt-4 leading-relaxed">
          These Terms of Use govern your use of The Pride Times website, mobile applications, and digital services.
          Please read them carefully. These terms constitute a binding legal agreement between you and The Pride Times Inc.
        </p>
      </div>
      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.title} className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-black text-[#0B1D35] text-sm mb-2">{s.title}</h2>
            <p className="text-[#374151] text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <Link to="/privacy" className="text-[#C9A227] text-sm hover:underline font-medium">Privacy Policy</Link>
        <span className="text-[#94A3B8]">·</span>
        <Link to="/cookie-policy" className="text-[#C9A227] text-sm hover:underline font-medium">Cookie Policy</Link>
      </div>
    </div>
  );
}
