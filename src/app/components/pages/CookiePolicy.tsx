import { Link } from "react-router";

export function CookiePolicy() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="text-[#C9A227] text-xs font-bold uppercase tracking-widest mb-2">Legal</div>
        <h1 className="font-black text-[#0B1D35] text-3xl mb-2">Cookie Policy</h1>
        <p className="text-[#64748B] text-sm">Last updated: May 1, 2026</p>
      </div>

      <div className="space-y-4">
        {[
          {
            title: "What Are Cookies?",
            content: "Cookies are small text files that are stored on your device when you visit a website. They allow the website to recognize your device and remember certain information about your visit, such as your login status, preferences, and browsing activity.",
          },
          {
            title: "Cookies We Use",
            content: `Essential Cookies: These cookies are necessary for our website to function properly and cannot be disabled. They enable core functionality such as user authentication, security, and access to paid subscription content.\n\nPerformance Cookies: These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and editorial offering.\n\nFunctional Cookies: These cookies enable enhanced functionality and personalization, such as remembering your reading history, preferred language, and regional settings.\n\nTargeting/Advertising Cookies: These cookies may be set by our advertising partners to build a profile of your interests and show you relevant advertisements on other websites. They work by uniquely identifying your browser and device. If you do not allow these cookies, you will experience less targeted advertising.`,
          },
          {
            title: "Managing Cookies",
            content: "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed. Most browsers allow you to view, manage, delete and block cookies through the browser settings. The Help section of your browser should provide more information on this. Note that if you delete or block certain cookies, some features of our website may not function correctly.",
          },
          {
            title: "Third-Party Cookies",
            content: "Some cookies on our website are set by third parties, including analytics providers (Google Analytics), advertising networks, and social media platforms. These third parties may use cookies to collect information about your online activity over time and across different websites. We do not control these third-party cookies and they are governed by the respective privacy policies of those third parties.",
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
