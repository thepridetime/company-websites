import { Link } from "react-router";
import { ArrowUpRight, Compass, FileCode } from "lucide-react";

interface SitemapSection {
  title: string;
  links: { label: string; path: string; description?: string }[];
}

const sitemapSections: SitemapSection[] = [
  {
    title: "News & Markets",
    links: [
      { label: "Home", path: "/", description: "Front page top stories and daily dispatches" },
      { label: "Markets", path: "/markets", description: "Real-time global indices, commodities and treasury rates" },
      { label: "Breaking News", path: "/breaking-news", description: "Fast-moving corporate and macroeconomic alerts" },
      { label: "Business News", path: "/business-news", description: "In-depth corporate coverage and executive strategies" },
      { label: "International News", path: "/international-news", description: "Geopolitical, trade and multilateral business reports" },
      { label: "Mergers & Acquisitions", path: "/mergers-acquisitions", description: "Deal tracker, hostile takeovers and buyout analyses" },
    ],
  },
  {
    title: "Industry & Tech",
    links: [
      { label: "Technology", path: "/technology", description: "AI, enterprise software and silicon hardware" },
      { label: "Finance & Banking", path: "/finance", description: "Investment banking, private credit and monetary policy" },
      { label: "Cybersecurity", path: "/cybersecurity", description: "Enterprise threats, zero-trust and cloud infrastructure" },
      { label: "Energy & Transition", path: "/energy", description: "Renewables, hydrocarbons and grid modernization" },
      { label: "Healthcare & Biotech", path: "/healthcare", description: "Pharmaceutical breakthroughs and digital health" },
      { label: "Smart Manufacturing", path: "/manufacturing", description: "Industrial robotics, digital twins and supply chain" },
      { label: "Consumer & Retail", path: "/consumer-retail", description: "E-commerce trends and consumer behavior" },
    ],
  },
  {
    title: "Executive & Features",
    links: [
      { label: "Billionaires", path: "/billionaires", description: "Wealth trackers, family offices and founder profiles" },
      { label: "CEO Spotlight", path: "/ceospotlight", description: "Exclusive executive interviews and career lessons" },
      { label: "Startup Success", path: "/startup-success", description: "Unicorn scale-ups, venture capital and founder stories" },
      { label: "Innovation", path: "/innovation", description: "Quantum, frontier tech and applied science" },
      { label: "Leadership & Governance", path: "/leadership", description: "Boardroom governance and executive management" },
      { label: "Sustainability & ESG", path: "/sustainability-esg", description: "Corporate carbon accounting and green bonds" },
      { label: "Cover Stories", path: "/cover-stories", description: "Flagship investigative long-form journalism" },
      { label: "Magazine Editions", path: "/magazine", description: "Digital monthly magazine print-replica archive" },
    ],
  },
  {
    title: "Company & Media",
    links: [
      { label: "About Us", path: "/about-us", description: "Editorial charter, ownership and standards" },
      { label: "Contact Newsroom", path: "/contact-us", description: "Direct press, bureau desks and story tips" },
      { label: "Advertise with Us", path: "/advertise", description: "Commercial partnerships, display and executive newsletters" },
      { label: "Careers", path: "/careers", description: "Newsroom, engineering and commercial opportunities" },
      { label: "The Pride Times Premium", path: "/premium", description: "Subscription plans, archive access and ad-free reading" },
    ],
  },
  {
    title: "Legal & Compliance",
    links: [
      { label: "Terms of Service", path: "/terms", description: "User agreement and acceptable use policy" },
      { label: "Privacy Policy", path: "/privacy", description: "Data handling, retention and user privacy rights" },
      { label: "Disclaimer", path: "/disclaimer", description: "Financial and informational editorial disclaimers" },
      { label: "Cookie Policy", path: "/cookiepolicy", description: "Analytics, preferences and cookie management" },
      { label: "Accessibility Statement", path: "/accessibility", description: "WCAG 2.1 compliance and accessibility standards" },
    ],
  },
];

export function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 pb-20">
      {/* Top Header */}
      <div className="bg-[#071a2d] text-white py-12 border-b-2 border-red-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-red-500 mb-2">
            <Compass size={14} />
            Directory
          </div>
          <h1
            className="text-3xl sm:text-4xl text-white font-bold tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Website Sitemap
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl">
            A comprehensive index of all editorial sections, reporting desks, executive archives, and corporate policies across The Pride Times.
          </p>
          <div className="mt-5 flex items-center gap-4">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-sm transition-colors"
            >
              <FileCode size={13} />
              View XML Sitemap
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section) => (
            <div
              key={section.title}
              className="bg-white border border-gray-200 rounded-sm p-6 shadow-xs flex flex-col"
            >
              <h2
                className="text-lg font-bold text-gray-900 pb-3 border-b-2 border-red-600 mb-4"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {section.title}
              </h2>
              <ul className="space-y-3.5 flex-1">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="group flex flex-col hover:text-red-600 transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600 flex items-center justify-between">
                        {link.label}
                        <span className="text-gray-300 group-hover:text-red-600 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                      {link.description && (
                        <span className="text-xs text-gray-500 mt-0.5 leading-snug">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SitemapPage;

