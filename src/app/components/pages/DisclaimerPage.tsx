import React from "react";
import { Link } from "react-router";

const sections = [
  {
    title: "1. General News & Editorial Disclaimer",
    content: `The Pride Times is an independent digital news and media publication dedicated to delivering timely reporting, in-depth analysis, and investigative journalism covering global business, technology, finance, markets, and policy.

The information, articles, commentary, and opinions published on The Pride Times (including our website, mobile platforms, newsletters, and digital feeds) are provided for general educational, news reporting, and informational purposes only. While our editorial team makes every reasonable effort to verify facts, dates, citations, and official statements at the time of publication, news evolves rapidly. The Pride Times does not represent, warrant, or guarantee that all content, analysis, and third-party quotes are entirely error-free, complete, or up-to-date at all subsequent times.

Opinions, guest analyses, op-eds, and columns published on our platform represent the personal viewpoints of their respective individual authors and do not necessarily reflect the official editorial stance, corporate policy, or viewpoints of The Pride Times, its editors, directors, or parent entities.`
  },
  {
    title: "2. Financial, Markets & Investment Disclaimer (Not Investment Advice)",
    content: `Market reports, stock quotations, currency exchange rates, cryptocurrency valuations, commodity prices, earnings forecasts, venture capital summaries, and financial analyses published on The Pride Times are provided strictly for informational, educational, and journalistic purposes.

NOTHING CONTAINED ON THIS WEBSITE CONSTITUTES INVESTMENT, LEGAL, ACCOUNTING, TAX, OR FINANCIAL ADVICE, NOR A RECOMMENDATION OR SOLICITATION TO BUY, SELL, HOLD, OR INVEST IN ANY SECURITY, DERIVATIVE, CRYPTOCURRENCY, COMMODITY, OR FINANCIAL PRODUCT.

Financial markets involve substantial risk of monetary loss. Past performance of any company, stock index, or asset class is not indicative of future results. Readers must conduct their own independent research, due diligence, and consult with a licensed, certified financial advisor or legal counsel before making any personal or commercial investment decisions. The Pride Times and its journalists expressly disclaim all liability for any direct, indirect, or consequential financial losses incurred by readers acting upon information found on this platform.`
  },
  {
    title: "3. Health, Medical & Science Content Disclaimer",
    content: `Articles and news reports regarding healthcare breakthroughs, pharmaceuticals, medical technologies, nutrition, or public health policies are provided solely for journalistic and educational reporting.

Such content is not intended to be a substitute for professional medical advice, clinical diagnosis, or medical treatment. Always seek the advice of a qualified physician or licensed healthcare provider with any questions you may have regarding a medical condition or treatment plan. Never disregard professional medical advice or delay seeking medical attention because of an article read on The Pride Times.`
  },
  {
    title: "4. Copyright Notice & Intellectual Property",
    content: `Copyright (c) 2026 The Pride Times Inc. All rights reserved.

All content, features, and functionality on this website - including but not limited to written articles, headlines, editorial copy, photographs, original artwork, infographics, data visualizations, charts, audio, video, software code, stylesheets, and the overall design, selection, and arrangement thereof ("Content") - are the exclusive property of The Pride Times, its content partners, or its licensors and are protected under United States copyright laws, international copyright conventions (including the Berne Convention), and trademark laws.

Unauthorized reproduction, republishing, distribution, modification, public display, syndication, commercial exploitation, or archiving of any content from The Pride Times without prior written authorization is strictly prohibited.

Automated data scraping, web scraping, content harvesting, data extraction, or ingestion of any Content into artificial intelligence (AI) models, large language models (LLMs), or machine learning datasets without an explicit written licensing agreement from The Pride Times is strictly prohibited.`
  },
  {
    title: "5. Fair Use & Quotation Policy",
    content: `Under Section 107 of the U.S. Copyright Act (17 U.S.C. 107), "Fair Use" is recognized for purposes such as criticism, commentary, news reporting, teaching, scholarship, or academic research.

Third-party journalists, bloggers, scholars, and media outlets may quote limited excerpts of our original articles provided that:
• Proper and prominent attribution is given to "The Pride Times";
• A functional, direct hyperlink back to the original source article on thepridetimes.com is included;
• The excerpt does not exceed 100 words or constitute a substantive substitute for reading the original article;
• The context and meaning of the reporting are accurately preserved without misleading distortions.`
  },
  {
    title: "6. Digital Millennium Copyright Act (DMCA) Notice & Takedown Policy",
    content: `The Pride Times respects the intellectual property rights of creators and adheres to the provisions of the Digital Millennium Copyright Act (17 U.S.C. 512).

If you are a copyright owner or an authorized agent and believe in good faith that any content, photograph, or material published on The Pride Times infringes upon your copyright, you may submit a formal DMCA Notice of Infringement containing:
1. Identification of the copyrighted work claimed to have been infringed;
2. A description and URL of where the material you claim is infringing is located on our website;
3. Your full legal name, mailing address, telephone number, and valid email address;
4. A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;
5. A statement made under penalty of perjury that the information in your notice is accurate and that you are the copyright owner or authorized to act on their behalf;
6. An electronic or physical signature of the person authorized to act on behalf of the copyright owner.

Please send all DMCA notices to our designated copyright agent:
Email: dmca@thepridetimes.com / legal@thepridetimes.com
Mailing Address: The Pride Times Legal Department, 1 Enterprise Plaza, New York, NY 10004, USA.`
  },
  {
    title: "7. Third-Party Links, Sponsored Content & Advertising Disclaimer",
    content: `The Pride Times may contain links to third-party websites, partner services, and digital resources. These links are provided solely as a convenience to our readers. The Pride Times does not control, supervise, or endorse the content, privacy policies, safety, or accuracy of any third-party websites. Accessing external links is done entirely at your own risk.

Third-Party Advertising & Google AdSense:
We display advertisements served by third-party ad networks, including Google AdSense. Google and other advertising vendors use cookies (such as the Google DoubleClick cookie) to serve ads based on users' prior visits to our site and other internet locations. The Pride Times does not endorse or guarantee any third-party products, services, or claims advertised in banner, native, or video ads on our website. Advertisers are solely responsible for the content and validity of their advertisements.`
  },
  {
    title: "8. Corrections, Retractions & Editorial Standards",
    content: `The Pride Times adheres to strict journalistic integrity and accuracy standards. When factual errors, misquotes, or inaccuracies occur in our reporting, our editorial policy is to investigate promptly and issue clear, transparent corrections or clarifications at the top or bottom of the affected article.

If you notice a factual error or believe a correction is warranted, please contact our editorial desk at editorial@thepridetimes.com with the article URL, specific details of the factual inaccuracy, and verifiable supporting documentation.`
  },
  {
    title: "9. Contact Information",
    content: `For legal inquiries, copyright questions, reprint permissions, or editorial licensing:
• General Editorial Desk: editorial@thepridetimes.com
• Legal & DMCA Inquiries: legal@thepridetimes.com / dmca@thepridetimes.com
• Corporate Headquarters: The Pride Times Inc., 1 Enterprise Plaza, New York, NY 10004, United States`
  }
];

export function DisclaimerPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="text-[#C9A227] text-xs font-bold uppercase tracking-widest mb-2">
          Legal & Compliance
        </div>
        <h1 className="font-black text-[#0B1D35] text-3xl md:text-4xl mb-3">
          News Disclaimer & Copyright Notice
        </h1>
        <p className="text-[#64748B] text-sm">
          Last Updated & Effective: October 2026 • The Pride Times Inc.
        </p>
        <p className="text-[#374151] text-sm mt-4 leading-relaxed">
          This document sets forth the official editorial disclaimers, financial/medical non-advisory statements, copyright protections, Fair Use guidelines, and DMCA takedown procedures for The Pride Times. By accessing our news platform, you acknowledge and agree to these terms.
        </p>
      </div>

      <div className="space-y-5">
        {sections.map((section) => (
          <div
            key={section.title}
            id={section.title.includes("Contact") ? "permissions" : undefined} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow scroll-mt-24"
          >
            <h2 className="font-bold text-[#0B1D35] text-base md:text-lg mb-3">
              {section.title}
            </h2>
            <p className="text-[#374151] text-sm leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
        <Link to="/terms" className="text-[#C9A227] hover:underline font-medium">
          Terms of Service
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

export default DisclaimerPage;
