import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, ChevronRight } from "lucide-react";
import CS2Img from "../../../imports/CS2.png";
import CS3Img from "../../../imports/CS3.png";

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  id,
}: {
  title: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className="flex items-center justify-between border-b-2 border-[#17140F] pb-2.5 mb-5"
    >
      <h2 className="font-serif text-[21px] md:text-[24px] font-bold text-[#17140F]">
        {title}
      </h2>

      <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-red-600 transition-colors">
        See All
        <ChevronRight size={12} />
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
  {
    id: 1,
    severity: "CRITICAL",
    title:
      "CVE-2026-1247: Zero-Day in OpenSSL Affects 400M Servers Worldwide",
    time: "2 hrs ago",
  },
  {
    id: 2,
    severity: "HIGH",
    title:
      "BlackCat Ransomware Group Targets Healthcare Organizations in 12 Countries",
    time: "4 hrs ago",
  },
  {
    id: 3,
    severity: "HIGH",
    title:
      "Lazarus Group Steals $340M from Crypto Exchange Using Novel Smart Contract Exploit",
    time: "6 hrs ago",
  },
  {
    id: 4,
    severity: "MEDIUM",
    title:
      "Phishing Campaign Impersonating IMF Emails Targets G20 Finance Ministries",
    time: "8 hrs ago",
  },
  {
    id: 5,
    severity: "MEDIUM",
    title:
      "New Android Spyware Found in 230 Apps on Google Play Store",
    time: "10 hrs ago",
  },
];

/* =========================================================
   LATEST STORIES
========================================================= */

const stories = [
  {
    id: 1,
    category: "RANSOMWARE",
    title:
      "LockBit 4.0 Launches Unprecedented Attack on UK National Health Service Systems",
    time: "3 hrs ago",
    image:
      "https://images.unsplash.com/photo-1768839722988-91767bb82b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 2,
    category: "AI SECURITY",
    title:
      "GPT-7 Used to Generate Undetectable Phishing Emails at Scale — New Research",
    time: "5 hrs ago",
    image:
      "https://images.unsplash.com/photo-1767972464040-8bfee42d7bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 3,
    category: "DATA BREACH",
    title:
      "1.4 Billion User Records Exposed in Major Social Media Platform Breach",
    time: "7 hrs ago",
    image:
      "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 4,
    category: "AI SYSTEMS",
    title:
      "Hackers exploit AI-powered customer support systems and breach Amazon's One Medical, exposing sensitive healthcare records.",
    time: "Just now",
    image:
      "https://images.unsplash.com/photo-1768839722988-91767bb82b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
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

/* =========================================================
   ZERO TRUST
========================================================= */

const zeroTrustNote = {
  title: "Zero-Trust Implication: Identity Becomes the Control Plane",
  body:
    "As AI agents receive credentials and tool access, conventional network boundaries become less sufficient. The operating model should emphasize short-lived credentials, human approval gates for high-impact actions, continuous logging, model provenance, and segmented tool permissions — every agent needs a smaller blast radius than the employee it assists.",
};

/* =========================================================
   SECURITY RESPONSE MATRIX
========================================================= */

const responseMatrix = [
  {
    threat: "AI-Assisted Phishing",
    control: "MFA Enforcement",
    risk: "Data Breach / Ransom",
    cadence: "Immediate",
  },
  {
    threat: "SaaS Credential Theft",
    control: "Access Privilege Review",
    risk: "IP / Client Data Loss",
    cadence: "24–48 Hours",
  },
  {
    threat: "Ransomware-as-a-Service",
    control: "Endpoint Protection + Backup",
    risk: "Business Continuity",
    cadence: "Ongoing",
  },
  {
    threat: "Vendor/Supply Chain Attack",
    control: "Third-Party Risk Audits",
    risk: "Regulatory Exposure",
    cadence: "Quarterly",
  },
  {
    threat: "Prompt Injection (AI Models)",
    control: "AI Security Layer / WAF",
    risk: "Data Manipulation",
    cadence: "Emerging Priority",
  },
];

/* =========================================================
   DEFENSE NEWS
========================================================= */

const defenseNews = [
  {
    id: 1,
    title:
      "Pentagon's Cyber Command Gets $8.7B Budget Increase for FY2027",
    time: "2 hrs ago",
  },
  {
    id: 2,
    title:
      "EU's Cyber Solidarity Act Creates €1.1B Emergency Cyber Response Fund",
    time: "4 hrs ago",
  },
  {
    id: 3,
    title:
      "India's CERT-In Mandates 6-Hour Breach Notification for All Critical Infrastructure",
    time: "6 hrs ago",
  },
  {
    id: 4,
    title:
      "NATO Activates Article 5 Cyber Defense Clause for First Time in History",
    time: "8 hrs ago",
  },
  {
    id: 5,
    title:
      "Australia Bans All Chinese Technology from Government Networks by 2027",
    time: "10 hrs ago",
  },
];

/* =========================================================
   MARKET DATA
========================================================= */

const marketData = [
  {
    company: "CrowdStrike",
    ticker: "CRWD",
    price: "$342.50",
    change: "+4.2%",
    up: true,
  },
  {
    company: "Palo Alto Networks",
    ticker: "PANW",
    price: "$287.30",
    change: "+2.8%",
    up: true,
  },
  {
    company: "Fortinet",
    ticker: "FTNT",
    price: "$76.90",
    change: "+1.9%",
    up: true,
  },
  {
    company: "Zscaler",
    ticker: "ZS",
    price: "$198.40",
    change: "+3.5%",
    up: true,
  },
  {
    company: "SentinelOne",
    ticker: "S",
    price: "$29.80",
    change: "-0.8%",
    up: false,
  },
];

/* =========================================================
   SECONDARY ARTICLE
========================================================= */

function SecondaryArticle({
  data,
}: {
  data: typeof hero1;
}) {
  return (
    <article className="group cursor-pointer">
      <div className="overflow-hidden rounded-md bg-gray-100 mb-3">
        <ImageWithFallback
          src={data.image}
          alt={data.title}
          className="w-full h-[220px] md:h-[260px] lg:h-[300px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-red-600">
        {data.category}
      </span>

      <h2 className="mt-1.5 font-serif text-[20px] md:text-[24px] lg:text-[26px] font-bold leading-[1.12] text-[#17140F] group-hover:text-red-600 transition-colors">
        {data.title}
      </h2>

      <p className="mt-2.5 text-[12px] md:text-[13px] leading-[1.6] text-[#55534C]">
        {data.excerpt}
      </p>

      <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-400">
        <span className="font-medium text-gray-500">
          By {data.author}
        </span>

        <span className="h-3 w-px bg-gray-300" />

        <span className="flex items-center gap-1.5">
          <Clock size={9} />
          {data.time}
        </span>
      </div>
    </article>
  );
}

/* =========================================================
   SPONSORSHIP CARDS
========================================================= */

const sponsorships = [
  "Global Finance Summit 2026",
  "Tech Leaders Forum",
  "Energy Transition Conference",
  "AI & Business World",
];

/* =========================================================
   PAGE
========================================================= */

export function CybersecurityPage() {
  return (
    <main className="w-full bg-white text-[#17140F] antialiased">

      {/* =====================================================
          MAIN FULL WIDTH CONTAINER
      ===================================================== */}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">

        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <header className="pt-5 md:pt-7 pb-4">
          <div className="border-t-[3px] border-red-600 pt-4">

            <h1 className="font-serif text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] font-bold leading-none">
              Cybersecurity
            </h1>

            <p className="mt-2 text-[12px] md:text-[13px] text-[#77736D]">
              Digital threats, enterprise security, nation-state actors, and data protection.
            </p>

          </div>
        </header>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <div className="w-full h-[70px] md:h-[78px] bg-[#17313A] flex items-center justify-center my-4 md:my-5 relative overflow-hidden">

          <div className="text-center text-white">
            <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-300">
              GOOGLE ADSENSE
            </p>

            <p className="mt-1 text-[13px] md:text-[15px] font-semibold">
              Advertisement Space
            </p>

            <p className="mt-0.5 text-[8px] text-cyan-200">
              728 × 90 • Leaderboard
            </p>
          </div>

          <span className="absolute top-1 right-1 text-[7px] bg-white/80 text-gray-500 px-1.5 py-0.5">
            Advertisement
          </span>

        </div>

        {/* =================================================
            MAIN HERO + MORE STORIES
        ================================================= */}

        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,3.25fr)_minmax(280px,1fr)] gap-5 lg:gap-7 mt-4 md:mt-6">

          {/* =================================================
              MAIN HERO
          ================================================= */}

          <article className="group cursor-pointer">

            <div className="overflow-hidden rounded-lg bg-gray-100">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-[260px] sm:h-[350px] md:h-[440px] lg:h-[500px] xl:h-[520px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
            </div>

            <div className="pt-3">

              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">
                {hero.category}
              </span>

              <h2 className="mt-1.5 font-serif text-[25px] sm:text-[29px] md:text-[33px] lg:text-[36px] xl:text-[38px] font-bold leading-[1.08] tracking-tight text-[#17140F] group-hover:text-red-600 transition-colors">
                {hero.title}
              </h2>

              <p className="mt-2.5 text-[12px] md:text-[13px] lg:text-[14px] leading-[1.6] text-[#66625D] max-w-[1100px]">
                {hero.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px] text-gray-400">
                <span className="font-medium text-gray-500">
                  By {hero.author}
                </span>

                <span className="h-3 w-px bg-gray-300" />

                <span className="flex items-center gap-1.5">
                  <Clock size={9} />
                  {hero.time}
                </span>
              </div>

            </div>
          </article>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="xl:border-l xl:border-gray-300 xl:pl-6">

            {/* SPONSORED BOX */}

            <div className="border border-gray-200 rounded-md overflow-hidden mb-5">

              <div className="px-3 py-2 bg-[#F7F4EC]">
                <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-gray-500">
                  Sponsored Content
                </span>
              </div>

              <div className="h-[150px] md:h-[170px] bg-[#101731] flex items-center justify-center text-center px-4">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                    Featured Partner
                  </p>

                  <p className="text-white text-[14px] font-semibold mt-2">
                    Your Ad Here
                  </p>

                  <p className="text-gray-300 text-[9px] mt-1">
                    Reach 2M+ business readers
                  </p>
                </div>

              </div>

            </div>

            {/* MORE STORIES */}

            <div className="border-b-2 border-[#17140F] pb-2 mb-1">
              <h3 className="font-bold text-[14px] uppercase tracking-wide">
                More Stories
              </h3>
            </div>

            <div className="divide-y divide-gray-200">

              {threatAlerts.slice(0, 4).map((story) => (
                <article
                  key={story.id}
                  className="py-3 group cursor-pointer"
                >

                  <span
                    className={`inline-block text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 ${
                      story.severity === "CRITICAL"
                        ? "bg-red-600 text-white"
                        : story.severity === "HIGH"
                        ? "bg-orange-500 text-white"
                        : "bg-amber-400 text-black"
                    }`}
                  >
                    {story.severity}
                  </span>

                  <h4 className="mt-1.5 text-[11px] md:text-[12px] font-bold leading-[1.35] text-gray-900 group-hover:text-red-600 transition-colors">
                    {story.title}
                  </h4>

                  <span className="flex items-center gap-1 mt-1 text-[8px] text-gray-400">
                    <Clock size={8} />
                    {story.time}
                  </span>

                </article>
              ))}

            </div>

          </aside>

        </section>

        {/* =================================================
            LATEST CYBERSECURITY NEWS
        ================================================= */}

        <section className="mt-12 md:mt-14">

          <SectionHeader title="Latest Cybersecurity News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 lg:gap-x-7 gap-y-8">

            {stories.map((story) => (
              <article
                key={story.id}
                className="group cursor-pointer"
              >

                <div className="overflow-hidden rounded-md bg-gray-100">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-full h-[180px] sm:h-[190px] md:h-[205px] lg:h-[215px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="pt-2.5">

                  <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-red-600">
                    {story.category}
                  </span>

                  <h3 className="mt-1.5 font-serif text-[17px] md:text-[18px] font-bold leading-[1.18] text-[#17140F] group-hover:text-red-600 transition-colors">
                    {story.title}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-2 text-[9px] text-gray-400">
                    <Clock size={8} />
                    {story.time}
                  </div>

                </div>

              </article>
            ))}

          </div>

        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <div className="w-full h-[68px] md:h-[76px] bg-[#17313A] flex items-center justify-center my-10 md:my-12 relative">

          <div className="text-center text-white">

            <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-cyan-300">
              GOOGLE ADSENSE
            </p>

            <p className="mt-1 text-[12px] md:text-[14px] font-semibold">
              Business Solutions | Powered by The Pride Times
            </p>

            <p className="text-[8px] text-cyan-200 mt-0.5">
              728 × 90 • Leaderboard
            </p>

          </div>

          <span className="absolute top-1 right-1 text-[7px] bg-white/80 text-gray-500 px-1.5 py-0.5">
            Advertisement
          </span>

        </div>

        {/* =================================================
            SPONSORSHIP
        ================================================= */}

        <section className="bg-[#F7F7F5] rounded-lg border border-gray-100 p-4 md:p-5 mb-10">

          <div className="mb-4">

            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-500 border border-gray-200 bg-white px-2 py-1 rounded-sm">
              Sponsorship
            </span>

            <span className="ml-2 text-[9px] text-gray-400">
              Presented by our partners
            </span>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {sponsorships.map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200 rounded-md min-h-[90px] flex flex-col items-center justify-center text-center px-3"
              >

                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mb-2">
                  <span className="text-red-500 text-sm font-bold">
                    ✦
                  </span>
                </div>

                <p className="text-[10px] md:text-[11px] font-bold text-gray-900">
                  {item}
                </p>

                <p className="text-[8px] text-gray-400 mt-1">
                  Sponsored Event
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* =================================================
            AI & NATIONAL INFRASTRUCTURE
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-8 md:gap-10 border-t-2 border-black pt-8 mb-12">

          <div>

            <SectionHeader title="AI & National Infrastructure" />

            <div className="divide-y divide-gray-200">

              {aiInfraStories.map((story) => (
                <article
                  key={story.id}
                  className="py-4 first:pt-0 group cursor-pointer"
                >

                  <p className="text-[13px] md:text-[14px] font-semibold leading-[1.5] text-gray-900 group-hover:text-red-600 transition-colors">
                    {story.title}
                  </p>

                  <span className="flex items-center gap-1.5 mt-1.5 text-[9px] text-gray-400">
                    <Clock size={8} />
                    {story.time}
                  </span>

                </article>
              ))}

            </div>

          </div>

          {/* ZERO TRUST */}

          <aside className="lg:border-l lg:border-gray-300 lg:pl-7">

            <div className="border-b-2 border-black pb-2 mb-4">

              <h3 className="font-bold text-[13px] uppercase tracking-wide">
                Zero-Trust Watch
              </h3>

            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-md p-5">

              <h4 className="font-bold text-[13px] leading-[1.35]">
                {zeroTrustNote.title}
              </h4>

              <p className="text-[12px] leading-[1.65] text-gray-600 mt-3">
                {zeroTrustNote.body}
              </p>

            </div>

          </aside>

        </section>

        {/* =================================================
            SECURITY RESPONSE
        ================================================= */}

        <section className="mb-12">

          <SectionHeader title="Security Response" />

          <div className="overflow-x-auto border border-gray-200 rounded-md">

            <table className="w-full min-w-[720px] border-collapse">

              <thead>

                <tr className="border-b-2 border-black">

                  <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Threat
                  </th>

                  <th className="text-left px-3 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Control
                  </th>

                  <th className="text-left px-3 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Risk
                  </th>

                  <th className="text-right px-4 py-3 text-[9px] uppercase tracking-wider text-gray-400">
                    Cadence
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {responseMatrix.map((item) => (
                  <tr
                    key={item.threat}
                    className="hover:bg-gray-50 transition-colors"
                  >

                    <td className="px-4 py-3.5 text-[12px] font-semibold">
                      {item.threat}
                    </td>

                    <td className="px-3 py-3.5 text-[12px] text-gray-600">
                      {item.control}
                    </td>

                    <td className="px-3 py-3.5 text-[11px] text-gray-500">
                      {item.risk}
                    </td>

                    <td className="px-4 py-3.5 text-right">

                      <span className="inline-block bg-gray-100 rounded px-2 py-1 text-[9px] font-bold uppercase text-gray-500">
                        {item.cadence}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =================================================
            POLICY + STOCKS
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 border-t-2 border-black pt-8 mb-12">

          {/* POLICY */}

          <div>

            <SectionHeader title="Policy & Defense" />

            <div className="divide-y divide-gray-200">

              {defenseNews.map((item) => (
                <article
                  key={item.id}
                  className="py-4 first:pt-0 group cursor-pointer"
                >

                  <h3 className="text-[13px] md:text-[14px] font-semibold leading-[1.45] group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>

                  <span className="flex items-center gap-1.5 mt-1.5 text-[9px] text-gray-400">
                    <Clock size={8} />
                    {item.time}
                  </span>

                </article>
              ))}

            </div>

          </div>

          {/* STOCKS */}

          <div>

            <SectionHeader title="Cyber Stocks" />

            <div className="divide-y divide-gray-200">

              {marketData.map((stock) => (
                <div
                  key={stock.ticker}
                  className="py-4 first:pt-0 flex items-center justify-between"
                >

                  <div>

                    <p className="text-[13px] md:text-[14px] font-semibold">
                      {stock.company}
                    </p>

                    <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">
                      {stock.ticker}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-[13px] font-semibold">
                      {stock.price}
                    </p>

                    <p
                      className={`text-[10px] font-bold mt-0.5 ${
                        stock.up
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {stock.change}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <section className="bg-[#071A2D] rounded-lg px-5 sm:px-8 md:px-12 py-9 md:py-10 text-center mb-14">

          <h2 className="font-serif text-[24px] md:text-[28px] font-bold text-white">
            Stay Ahead with The Pride Times
          </h2>

          <p className="text-[11px] md:text-[12px] text-gray-300 mt-2">
            Daily briefings on Cybersecurity delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5 max-w-[520px] mx-auto">

            <input
              type="email"
              placeholder="Enter your email"
              className="h-10 flex-1 rounded-md border border-white/10 bg-white/10 px-3 text-[11px] text-white placeholder:text-gray-400 outline-none focus:border-red-500"
            />

            <button className="h-10 px-5 rounded-md bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold transition-colors">
              Subscribe Free
            </button>

          </div>

        </section>

      </div>
    </main>
  );
}
