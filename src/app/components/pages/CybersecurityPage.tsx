import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  Shield,
  AlertTriangle,
  ChevronRight,
  Cpu,
  Bot,
  KeyRound,
} from "lucide-react";
import CS2Img from "../../../imports/CS2.png";
import CS3Img from "../../../imports/CS3.png";

/* =========================================================
   SECTION HEADER
========================================================= */

function SH({ title, id }: { title: string; id?: string }) {
  return (
    <div id={id} className="flex items-center justify-between border-b-2 border-black pb-2.5 mb-5">
      <div className="flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
        <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.16em] text-gray-900">
          {title}
        </h2>
      </div>

      <button className="text-[11px] font-semibold text-gray-400 hover:text-red-600 transition-colors duration-200 flex items-center gap-1">
        See All
        <ChevronRight size={12} strokeWidth={2.25} />
      </button>
    </div>
  );
}

/* =========================================================
   HERO DATA
========================================================= */

const hero = {
  category: "CYBER THREAT INTELLIGENCE",
  title:
    "PwC 2026 Global Digital Trust Insights: Enterprises Escalate Defense Spending ",
  excerpt:
    "PwC's 2026 Global Digital Trust Insights survey, conducted across 3,887 business and technology executives in 72 countries, reveals that cybersecurity has risen to the top tier of board-level concerns across every major industry. The survey found that financial services (21%), industrial manufacturing (21%), and technology, media and telecom (19%) sectors represent the highest concentration of respondents, underscoring the cross-sector urgency of the digital trust imperative.The findings highlight that AI-driven attack methods are prompting accelerated investment in both preventive and detection-oriented security frameworks. Executives report that the attack surface has expanded dramatically with the proliferation of generative AI tools inside enterprises — as every AI integration creates a new potential entry point for adversarial prompt injection, data exfiltration, and credential harvesting. ",
  author: "Sagar Kumar",
  time: "30 April 2026",
  image:
    "https://images.unsplash.com/photo-1747499967281-c0c5eec9933c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzbWFydCUyMGNpdHklMjB1cmJhbiUyMGZ1dHVyZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzkzODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

const hero1 = {
  category: "CYBER THREAT INTELLIGENCE",
  title:
    "KPMG: AI-Dominated Business Environments Raise Security Stakes  ",
  excerpt:
    "KPMG's Global Tech Report 2026, drawing on responses from 2,500 technology executives across 27 countries, identifies cybersecurity as the foundational prerequisite for realizing the full value of AI investment. The report warns that organizations rushing to scale AI deployments are outpacing their security frameworks, creating dangerous gaps between innovation velocity and risk management maturity.Notably, 50% of surveyed executives reported expectations of reaching top technology maturity in 2026, yet a significant share acknowledged that tech debt, cost pressures, and talent shortages remain the principal barriers. Security teams are being asked to simultaneously defend legacy systems while architecting protections for AI-native infrastructure — a dual mandate that is straining capacity across most enterprise IT organizations.  ",
  author: "Sagar Kumar",
  time: "June 2026",
  image: CS2Img,
};

const hero2 = {
  category: "CYBER THREAT INTELLIGENCE",
  title:
    "KPMG: AI-Dominated Business Environments Raise Security Stakes  ",
  excerpt:
    "KPMG's Global Tech Report 2026, drawing on responses from 2,500 technology executives across 27 countries, identifies cybersecurity as the foundational prerequisite for realizing the full value of AI investment. The report warns that organizations rushing to scale AI deployments are outpacing their security frameworks, creating dangerous gaps between innovation velocity and risk management maturity.Notably, 50% of surveyed executives reported expectations of reaching top technology maturity in 2026, yet a significant share acknowledged that tech debt, cost pressures, and talent shortages remain the principal barriers. Security teams are being asked to simultaneously defend legacy systems while architecting protections for AI-native infrastructure — a dual mandate that is straining capacity across most enterprise IT organizations.  ",
  author: "Sagar Kumar",
  time: "June 2026",
  image: CS3Img,
};

/* =========================================================
   THREAT ALERTS
========================================================= */

const threatAlerts = [
  { id: 1, severity: "CRITICAL", title: "CVE-2026-1247: Zero-Day in OpenSSL Affects 400M Servers Worldwide", time: "2 hrs ago" },
  { id: 2, severity: "HIGH", title: "BlackCat Ransomware Group Targets Healthcare Organizations in 12 Countries", time: "4 hrs ago" },
  { id: 3, severity: "HIGH", title: "Lazarus Group Steals $340M from Crypto Exchange Using Novel Smart Contract Exploit", time: "6 hrs ago" },
  { id: 4, severity: "MEDIUM", title: "Phishing Campaign Impersonating IMF Emails Targets G20 Finance Ministries", time: "8 hrs ago" },
  { id: 5, severity: "MEDIUM", title: "New Android Spyware Found in 230 Apps on Google Play Store", time: "10 hrs ago" },
];

const threatColor: Record<string, string> = {
  CRITICAL: "bg-red-600 text-white",
  HIGH: "bg-orange-500 text-white",
  MEDIUM: "bg-amber-400 text-black",
  LOW: "bg-blue-500 text-white",
};

/* =========================================================
   LATEST STORIES
========================================================= */

const stories = [
  { id: 1, category: "RANSOMWARE", title: "LockBit 4.0 Launches Unprecedented Attack on UK National Health Service Systems", time: "3 hrs ago", image: "https://images.unsplash.com/photo-1768839722988-91767bb82b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 2, category: "AI SECURITY", title: "GPT-7 Used to Generate Undetectable Phishing Emails at Scale — New Research", time: "5 hrs ago", image: "https://images.unsplash.com/photo-1767972464040-8bfee42d7bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 3, category: "DATA BREACH", title: "1.4 Billion User Records Exposed in Major Social Media Platform Breach", time: "7 hrs ago", image: "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { id: 4, category: "AI SYSTEMS", title: "Hackers exploit AI-powered customer support systems and breach Amazon's One Medical, exposing sensitive healthcare records.", time: "Just now", image: "https://images.unsplash.com/photo-1768839722988-91767bb82b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
];

/* =========================================================
   AI & NATIONAL INFRASTRUCTURE
========================================================= */

const aiInfraStories = [
  {
    id: 1,
    title:
      "H200 shipments to China resume under authorization — the compute chokepoint persists at the intersection of export controls and national security.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "U.S. announces restrictions on Chinese humanoid and quadruped robots plus certain power inverters, extending export policy to physical AI.",
    time: "Just now",
  },
  {
    id: 3,
    title:
      "AI agents as cyber operators: August disclosures show models taking unauthorized cyber actions under test conditions, raising new enterprise control questions.",
    time: "2 hrs ago",
  },
  {
    id: 4,
    title:
      "100+ tech firms publicly urge governments to strengthen defenses against AI-driven hacking, reframing cybersecurity as infrastructure-level risk.",
    time: "3 hrs ago",
  },
  {
    id: 5,
    title:
      "IBM and Together AI sign a $240M agreement pairing IBM Cloud with thousands of Nvidia Blackwell processors for an AI inference cluster.",
    time: "5 hrs ago",
  },
];

const zeroTrustNote = {
  title: "Zero-Trust Implication: Identity Becomes the Control Plane",
  body:
    "As AI agents receive credentials and tool access, conventional network boundaries become less sufficient. The operating model should emphasize short-lived credentials, human approval gates for high-impact actions, continuous logging, model provenance, and segmented tool permissions — every agent needs a smaller blast radius than the employee it assists.",
};

/* =========================================================
   SECURITY RESPONSE MATRIX
========================================================= */

const responseMatrix = [
  { threat: "AI-Assisted Phishing", control: "MFA Enforcement", risk: "Data Breach / Ransom", cadence: "Immediate" },
  { threat: "SaaS Credential Theft", control: "Access Privilege Review", risk: "IP / Client Data Loss", cadence: "24–48 Hours" },
  { threat: "Ransomware-as-a-Service", control: "Endpoint Protection + Backup", risk: "Business Continuity", cadence: "Ongoing" },
  { threat: "Vendor/Supply Chain Attack", control: "Third-Party Risk Audits", risk: "Regulatory Exposure", cadence: "Quarterly" },
  { threat: "Prompt Injection (AI Models)", control: "AI Security Layer / WAF", risk: "Data Manipulation", cadence: "Emerging Priority" },
];

/* =========================================================
   DEFENSE NEWS
========================================================= */

const defenseNews = [
  { id: 1, title: "Pentagon's Cyber Command Gets $8.7B Budget Increase for FY2027", time: "2 hrs ago" },
  { id: 2, title: "EU's Cyber Solidarity Act Creates €1.1B Emergency Cyber Response Fund", time: "4 hrs ago" },
  { id: 3, title: "India's CERT-In Mandates 6-Hour Breach Notification for All Critical Infrastructure", time: "6 hrs ago" },
  { id: 4, title: "NATO Activates Article 5 Cyber Defense Clause for First Time in History", time: "8 hrs ago" },
  { id: 5, title: "Australia Bans All Chinese Technology from Government Networks by 2027", time: "10 hrs ago" },
];

/* =========================================================
   MARKET DATA
========================================================= */

const marketData = [
  { company: "CrowdStrike", ticker: "CRWD", price: "$342.50", change: "+4.2%", up: true },
  { company: "Palo Alto Networks", ticker: "PANW", price: "$287.30", change: "+2.8%", up: true },
  { company: "Fortinet", ticker: "FTNT", price: "$76.90", change: "+1.9%", up: true },
  { company: "Zscaler", ticker: "ZS", price: "$198.40", change: "+3.5%", up: true },
  { company: "SentinelOne", ticker: "S", price: "$29.80", change: "-0.8%", up: false },
];

/* =========================================================
   ARTICLE BLOCK (reusable — used for hero1 / hero2)
========================================================= */

function SplitArticle({ data }: { data: typeof hero1 }) {
  return (
    <article className="group cursor-pointer">
      <div className="overflow-hidden rounded-xl mb-3 bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <ImageWithFallback
          src={data.image}
          alt={data.title}
          className="w-full h-[210px] md:h-[240px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.14em]">
        {data.category}
      </span>

      <h2 className="mt-1.5 font-serif text-xl md:text-[24px] font-bold leading-[1.15] text-gray-950 transition-colors duration-200 group-hover:text-red-600">
        {data.title}
      </h2>

      <p className="text-[13px] text-gray-600 leading-[1.65] mt-2.5">
        {data.excerpt}
      </p>

      <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400">
        <span className="font-medium text-gray-500">By {data.author}</span>
        <span className="h-3 w-px bg-gray-300" />
        <span className="flex items-center gap-1.5">
          <Clock size={10} strokeWidth={2.25} />
          {data.time}
        </span>
      </div>
    </article>
  );
}

/* =========================================================
   PAGE
========================================================= */

export function CybersecurityPage() {
  return (
    <main className="bg-white text-gray-900 antialiased min-h-screen">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-5 mb-10">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black text-white shrink-0 shadow-sm">
              <Shield size={19} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                Security Intelligence
              </p>
              <h1 className="mt-1 font-serif text-3xl md:text-[42px] font-bold tracking-tight leading-tight">
                Cybersecurity
              </h1>
            </div>
          </div>
        </header>

        {/* =================================================
            HERO + LIVE THREAT ALERTS
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14 pb-14 border-b border-gray-200">

          <article className="lg:col-span-2 group cursor-pointer">
            <div className="overflow-hidden rounded-xl mb-4 bg-gray-100 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-[230px] md:h-[340px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <span className="text-[11px] font-bold text-red-600 uppercase tracking-[0.16em]">
              {hero.category}
            </span>

            <h1 className="font-serif text-2xl md:text-[34px] font-bold leading-[1.1] tracking-tight mt-2.5 text-gray-950 transition-colors duration-200 group-hover:text-red-600">
              {hero.title}
            </h1>

            <p className="text-sm md:text-[15px] text-gray-600 leading-[1.75] mt-4 max-w-3xl">
              {hero.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-gray-200 text-xs text-gray-400">
              <span className="font-medium text-gray-500">By {hero.author}</span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} strokeWidth={2.25} />
                {hero.time}
              </span>
            </div>
          </article>

          <aside className="lg:border-l lg:border-gray-200 lg:pl-8">
            <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-1">
              <AlertTriangle size={14} strokeWidth={2} className="text-red-600" />
              <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-gray-900">
                Live Threat Alerts
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {threatAlerts.map((a) => (
                <div key={a.id} className="py-3.5 first:pt-0 group cursor-pointer transition-colors duration-200 hover:bg-gray-50/70 -mx-2 px-2 rounded-md">
                  <span className={`inline-block text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-md ${threatColor[a.severity]}`}>
                    {a.severity}
                  </span>

                  <p className="text-[13px] leading-[1.35] mt-2 font-semibold text-gray-900 transition-colors duration-200 group-hover:text-red-600">
                    {a.title}
                  </p>

                  <span className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-1.5">
                    <Clock size={9} strokeWidth={2.25} />
                    {a.time}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* =================================================
            SECOND ROW OF HEROES
        ================================================= */}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14 pb-14 border-b border-gray-200">
          <SplitArticle data={hero1} />
          <SplitArticle data={hero2} />
        </section>

        {/* =================================================
            AI & NATIONAL INFRASTRUCTURE
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14 pb-14 border-b border-gray-200">
          <div className="lg:col-span-2">
            <SH title="AI & National Infrastructure" />

            <div className="divide-y divide-gray-200">
              {aiInfraStories.map((s) => (
                <div key={s.id} className="py-3.5 first:pt-0 group cursor-pointer transition-colors duration-200 hover:bg-gray-50/70 -mx-2 px-2 rounded-md">
                  <p className="text-[14px] leading-[1.5] font-semibold text-gray-900 transition-colors duration-200 group-hover:text-red-600">
                    {s.title}
                  </p>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-1.5">
                    <Clock size={9} strokeWidth={2.25} />
                    {s.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:border-l lg:border-gray-200 lg:pl-8">
            <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-3">
              <KeyRound size={14} strokeWidth={2} className="text-red-600" />
              <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-gray-900">
                Zero-Trust Watch
              </h2>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Bot size={14} className="text-red-600" strokeWidth={2} />
                <p className="text-[12px] font-bold uppercase tracking-wide text-gray-900">
                  {zeroTrustNote.title}
                </p>
              </div>
              <p className="text-[13px] leading-[1.6] text-gray-600">
                {zeroTrustNote.body}
              </p>
            </div>
          </aside>
        </section>

        {/* =================================================
            SECURITY RESPONSE MATRIX
        ================================================= */}

        <section className="mb-14">
          <SH title="Security Response" />

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="py-3 pl-4 pr-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Threat</th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Control</th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 hidden sm:table-cell">Risk</th>
                  <th className="pl-3 pr-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Cadence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {responseMatrix.map((r) => (
                  <tr key={r.threat} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3.5 pl-4 pr-4 font-semibold text-gray-900">{r.threat}</td>
                    <td className="px-3 py-3.5 text-gray-600">{r.control}</td>
                    <td className="px-3 py-3.5 text-gray-500 text-xs hidden sm:table-cell">{r.risk}</td>
                    <td className="pl-3 pr-4 py-3.5 text-right">
                      <span className="inline-flex text-[10px] font-bold uppercase tracking-wide text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                        {r.cadence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================
            LATEST CYBER INCIDENTS
        ================================================= */}

        <section className="mb-14">
          <SH title="Latest Cyber Incidents" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map((s) => (
              <article key={s.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl mb-3 bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <ImageWithFallback
                    src={s.image}
                    alt={s.title}
                    className="w-full h-[140px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>

                <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.14em]">
                  {s.category}
                </span>

                <h3 className="text-sm font-bold leading-[1.3] mt-1.5 text-gray-950 transition-colors duration-200 group-hover:text-red-600">
                  {s.title}
                </h3>

                <span className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-2">
                  <Clock size={9} strokeWidth={2.25} />
                  {s.time}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            POLICY + STOCKS
        ================================================= */}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t-2 border-black pt-10">

          {/* POLICY */}
          <div>
            <SH title="Policy & Defense" />
            <div className="divide-y divide-gray-200">
              {defenseNews.map((n) => (
                <div key={n.id} className="py-3.5 first:pt-0 group cursor-pointer transition-colors duration-200 hover:bg-gray-50/70 -mx-2 px-2 rounded-md">
                  <p className="text-sm font-semibold leading-[1.5] text-gray-900 transition-colors duration-200 group-hover:text-red-600">
                    {n.title}
                  </p>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-1.5">
                    <Clock size={9} strokeWidth={2.25} />
                    {n.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* STOCKS */}
          <div>
            <SH title="Cyber Stocks" />
            <div className="divide-y divide-gray-200">
              {marketData.map((m) => (
                <div key={m.ticker} className="py-3.5 first:pt-0 flex items-center justify-between transition-colors duration-200 hover:bg-gray-50/70 -mx-2 px-2 rounded-md">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{m.company}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">{m.ticker}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums text-gray-900">{m.price}</p>
                    <p className={`text-[11px] font-bold tabular-nums mt-0.5 ${m.up ? "text-green-700" : "text-red-600"}`}>
                      {m.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
