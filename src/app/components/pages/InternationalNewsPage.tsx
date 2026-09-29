import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  ChevronRight,
  ArrowRight,
  Shield,
  Cpu,
  Zap,
  Heart,
  Factory,
  Building2,
  Truck,
} from "lucide-react";

import HeroImg from "../../../imports/heroimage.png";
import Hero1Img from "../../../imports/Techheroimage.png";
import Hero2Img from "../../../imports/hero1image.png";
import { PrideTimesAd } from "../AdSenseSlots";

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  link,
}: {
  title: string;
  link?: string;
}) {
  return (
    <div className="flex items-center justify-between border-t border-b border-black py-2 mb-4">
      <h2 className="text-[13px] md:text-[14px] font-bold uppercase tracking-wide text-black">
        {title}
      </h2>

      {link && (
        <a
          href={link}
          className="text-[10px] uppercase tracking-wide text-gray-500 hover:text-black flex items-center gap-1"
        >
          See All
          <ChevronRight size={11} />
        </a>
      )}
    </div>
  );
}

/* =========================================================
   HERO STORIES
========================================================= */

const techHero = {
  category: "ARTIFICIAL INTELLIGENCE",
  title:
    "AI Moves From Assistive Tools to Autonomous Systems as the Global Technology Race Intensifies",
  excerpt:
    "Artificial intelligence remains the defining theme of the global technology landscape in 2026. AI is moving from assistive tools toward autonomous decision-making systems across healthcare, logistics, finance, and defense, while the U.S.-China race is intensifying: the U.S. is building leading model capabilities and China is pursuing deployment at scale. Enterprise adoption is also moving deeper into workflows, with agentic AI and embedded procurement tools entering business operations. At the infrastructure level, data-center electricity demand is projected to approach 1,000 TWh by 2030, making secure power access increasingly critical as AI infrastructure expands.",
  author: "The Pride Times Technology Desk",
  time: "2026",
  image: HeroImg,
  article: `Artificial intelligence remains the defining theme of the global technology landscape in 2026. The technology is moving beyond assistive tools toward autonomous decision-making systems across healthcare, logistics, finance, and defense.

The shift is also changing the structure of the global AI race. The United States is building leading model capabilities, while China is pursuing deployment at scale. The contrast is increasingly visible not only in model development, but also in how quickly AI can be integrated into real-world enterprise and industrial workflows.

Inside companies, agentic AI and embedded AI procurement tools are beginning to move into enterprise workflows. That represents a broader change in the role of AI: instead of simply helping employees complete individual tasks, systems are increasingly being positioned to participate in processes and decisions.

The infrastructure required for that expansion is becoming a central part of the story. Data-center electricity demand is projected to approach 1,000 TWh by 2030, making secure power access increasingly important for AI infrastructure. The ability to build computing capacity is therefore increasingly connected to the ability to secure reliable energy.

The regulatory environment is also evolving as adoption moves from assistive systems toward autonomous decision-making. As AI becomes more deeply integrated into high-impact sectors, questions around oversight and new regulatory frameworks are becoming part of the technology investment and deployment discussion.`,
};

const techHero1 = {
  category: "AI INFRASTRUCTURE",
  title:
    "AI Data Centers Push Power Demand Toward a New Infrastructure Constraint",
  excerpt:
    "AI infrastructure is increasingly tied to the availability of reliable electricity. Data-center electricity demand is projected to approach 1,000 TWh by 2030, while secure power access is becoming critical as AI infrastructure expands.",
  author: "The Pride Times Technology Desk",
  time: "2026",
  image: Hero1Img,
  article: `The expansion of artificial intelligence is creating an infrastructure challenge that extends beyond chips and data centers. Data-center electricity demand is projected to approach 1,000 TWh by 2030, placing secure and reliable power access at the center of the AI infrastructure discussion.

As AI systems become more computationally demanding and deployment expands across industries, the availability of power increasingly becomes part of the technology equation. Infrastructure can only scale when the underlying energy supply is available and dependable.

This changes the way AI infrastructure is viewed. Data-center construction, computing capacity and power access are no longer separate considerations. Secure electricity is increasingly critical to the ability to expand AI infrastructure at the pace demanded by enterprise adoption.

The result is a technology market in which infrastructure readiness is becoming as important as software capability.`,
};

const techHero2 = {
  category: "ENTERPRISE AI",
  title: "Agentic AI Moves Into Enterprise Workflows as Adoption Shifts Toward Autonomy",
  excerpt:
    "Enterprise AI adoption is moving beyond assistive tools toward systems capable of handling more autonomous decisions. Agentic AI and embedded AI procurement tools are entering workflows, while EY has expanded NVIDIA-powered enterprise AI capabilities with LangChain validation.",
  author: "The Pride Times Technology Desk",
  time: "2026",
  image: Hero2Img,
  article: `Enterprise AI adoption is moving from assistive software toward more autonomous systems. Agentic AI and embedded AI procurement tools are entering enterprise workflows, bringing artificial intelligence closer to operational processes rather than limiting it to standalone assistants.

The shift changes the role of enterprise AI. Instead of only generating information or helping an employee complete a task, these systems can be designed around workflow execution and decision support. That creates new questions for companies around implementation, oversight and governance.

EY has also expanded NVIDIA-powered enterprise AI capabilities with LangChain validation, reflecting the broader movement toward enterprise environments in which AI capabilities are integrated with existing technology stacks.

As adoption moves toward autonomy, companies and regulators are increasingly confronting the need for frameworks that account for AI systems operating more directly inside business processes.`,
};

/* =========================================================
   CATEGORIES
========================================================= */

const techCategories = [
  {
    icon: Cpu,
    label: "AI & Machine Learning",
    color: "text-gray-700",
  },
  {
    icon: Shield,
    label: "Cybersecurity",
    color: "text-gray-700",
  },
  {
    icon: Zap,
    label: "Energy Tech",
    color: "text-gray-700",
  },
  {
    icon: Heart,
    label: "HealthTech",
    color: "text-gray-700",
  },
  {
    icon: Factory,
    label: "Manufacturing",
    color: "text-gray-700",
  },
  {
    icon: Building2,
    label: "Smart Cities",
    color: "text-gray-700",
  },
  {
    icon: Truck,
    label: "Supply Chain",
    color: "text-gray-700",
  },
];

/* =========================================================
   AI STORIES
========================================================= */

const aiStories = [
  {
    id: 1,
    title: "Agentic AI Enters Enterprise Workflows as Companies Move Beyond Assistive Tools",
    excerpt: "Agentic AI is moving into enterprise workflows, marking a shift from systems that assist employees toward systems designed to handle more autonomous tasks and decisions.",
    time: "2026",
    image: HeroImg,
    article: `Agentic AI is becoming part of a broader change in enterprise technology. Companies are moving beyond AI systems that primarily assist employees and toward tools that can participate more directly in workflows.

The development matters because it changes where AI sits inside an organization. Rather than remaining a separate assistant, an agentic system can be positioned within an existing business process, where it may support or execute a sequence of tasks.

This transition also raises the importance of oversight. As AI systems move closer to autonomous decision-making, organizations need to consider how those systems are introduced into workflows and how their decisions are monitored.

The move from assistive to autonomous AI is therefore not simply a product change. It is becoming an operational and regulatory issue for enterprises adopting the technology.`
  },
  {
    id: 2,
    title: "AI Procurement Tools Become Embedded in Enterprise Workflows",
    excerpt: "Embedded AI procurement tools are entering enterprise operations as companies integrate artificial intelligence more directly into purchasing and workflow processes.",
    time: "2026",
    image: Hero1Img,
    article: `AI is moving deeper into enterprise procurement workflows. Embedded AI procurement tools are entering business operations as organizations look to integrate intelligence directly into purchasing and related processes.

The significance is less about AI existing as a separate application and more about its placement inside everyday enterprise systems. Procurement is one example of how AI can become part of a workflow rather than simply serving as an optional assistant.

This development sits alongside the wider enterprise shift toward agentic AI. As AI becomes embedded in operational processes, businesses face a growing need to establish appropriate controls, responsibilities and review mechanisms around automated decisions.

The trend illustrates how enterprise AI adoption is increasingly about integration into business infrastructure, not just access to a model.`
  },
  {
    id: 3,
    title: "AI Data-Center Electricity Demand Could Approach 1,000 TWh by 2030",
    excerpt: "Projected data-center electricity demand highlights the growing connection between AI deployment, computing capacity and energy infrastructure.",
    time: "2026",
    image: Hero2Img,
    article: `The growth of AI is creating an increasingly important link between computing demand and electricity supply. Data-center electricity demand is projected to approach 1,000 TWh by 2030.

For the technology industry, the figure places energy alongside computing capacity as a central infrastructure consideration. Expanding AI systems requires data centers, and data centers require dependable electricity.

That relationship means the future pace of AI infrastructure will depend not only on the availability of models and computing hardware, but also on whether sufficient power can be secured for expanding facilities.

The projected demand is therefore part of a wider infrastructure story: AI growth is increasingly becoming an energy and infrastructure question as well as a software and semiconductor story.`
  },
  {
    id: 4,
    title: "Secure Power Access Becomes a Strategic Constraint for AI Infrastructure",
    excerpt: "As AI infrastructure expands, access to secure and reliable power is becoming increasingly important alongside data-center construction readiness.",
    time: "2026",
    image: HeroImg,
    article: `Secure power access is becoming increasingly critical to the expansion of AI infrastructure. The issue follows the rapid growth of data-center requirements and the projected increase in electricity demand associated with AI computing.

The constraint is important because infrastructure expansion depends on more than physical construction. A data center also requires dependable power, making energy availability an increasingly important part of infrastructure planning.

As AI deployment expands, companies building or relying on AI infrastructure therefore face a technology environment in which power access can influence how quickly new capacity becomes operational.

The broader implication is that the AI infrastructure race increasingly involves energy security as well as computing technology.`
  },
  {
    id: 5,
    title: "EY Expands NVIDIA-Powered Enterprise AI Capabilities With LangChain Validation",
    excerpt: "EY has expanded NVIDIA-powered enterprise AI capabilities with LangChain validation as AI moves deeper into enterprise technology environments.",
    time: "2026",
    image: Hero1Img,
    article: `EY has expanded NVIDIA-powered enterprise AI capabilities with LangChain validation, placing the development within the broader movement to integrate AI into enterprise technology environments.

Enterprise adoption is increasingly focused on how AI systems can be incorporated into existing workflows and technology stacks. Developments involving major technology platforms and enterprise organizations illustrate that shift from experimentation toward operational integration.

The LangChain validation mentioned in the development is part of that enterprise technology context. It reflects the wider focus on the tools and frameworks used to connect AI capabilities with business applications.

As organizations move toward more autonomous and workflow-based AI, enterprise deployment increasingly depends on the surrounding technology infrastructure as well as the underlying models.`
  },
  {
    id: 6,
    title: "AI Adoption Shifts From Assistive Systems Toward Autonomous Decision-Making",
    excerpt: "The transition from assistive to autonomous AI is changing how businesses think about deployment, oversight and emerging regulatory frameworks.",
    time: "2026",
    image: Hero2Img,
    article: `AI adoption is shifting from assistive systems toward autonomous decision-making. The change is significant because AI is moving into areas where systems can have a more direct role in business and operational processes.

Healthcare, logistics, finance and defense are among the sectors identified in the broader AI landscape as areas where autonomous decision-making systems are becoming increasingly relevant.

As deployment changes, the regulatory discussion changes with it. Systems that assist a person and systems that make or execute decisions create different questions around oversight, accountability and governance.

The movement toward autonomy is therefore becoming both a technology trend and a regulatory development. Companies adopting these systems must increasingly consider not only what AI can do, but also how its decisions are governed.`
  },
  {
    id: 7,
    title: "U.S.-China AI Competition Intensifies Around Models and Deployment at Scale",
    excerpt: "The global AI race is increasingly defined by U.S. model capabilities and China's push to deploy AI broadly and at scale.",
    time: "2026",
    image: HeroImg,
    article: `The global AI race between the United States and China is intensifying, with different areas of strength shaping the competition. The United States is building leading model capabilities, while China is pursuing mass deployment at scale.

The distinction highlights two connected dimensions of the AI race: the development of capable models and the ability to deploy those systems broadly across real-world applications.

The competition is therefore extending beyond model development. Enterprise adoption, infrastructure, power availability and the ability to integrate AI into workflows are all becoming part of the wider technology landscape.

As AI moves from assistive tools toward more autonomous systems, the balance between model capability and deployment at scale is becoming an increasingly important part of the global technology story.`
  },
];

/* =========================================================
   OTHER STORIES
========================================================= */

const cyberStories = [
  {
    id: 5,
    title:
      "Florida sues OpenAI and Sam Altman, alleging ChatGPT caused harm as regulators warn growth is being prioritized over safety.",
    time: "Just now",
  },
  {
    id: 6,
    title:
      "White House pressure reportedly pulled back Anthropic's most capable models amid concerns over high-risk AI systems.",
    time: "Just now",
  },
  {
    id: 1,
    title: "Zero-Day Exploit Threatens 2 Billion Android Devices Globally",
    time: "3 hrs ago",
  },
  {
    id: 2,
    title:
      "US CISA Issues Emergency Directive After Critical Infrastructure Breach",
    time: "5 hrs ago",
  },
  {
    id: 3,
    title:
      "Quantum Encryption Startup Raises $400M Series C to Secure Financial Networks",
    time: "7 hrs ago",
  },
  {
    id: 4,
    title:
      "Ransomware Attacks Hit Record High in Q1 2026, Costing Enterprises $12B",
    time: "9 hrs ago",
  },
];

const energyStories = [
  {
    id: 4,
    title:
      "Ohio suspends a major data-center tax incentive after AI infrastructure costs surge, deepening grid and community pushback.",
    time: "Just now",
  },
  {
    id: 5,
    title:
      "Analysts say 30-50% of planned U.S. AI data centers may miss 2026 timelines or be canceled over transformer shortages, grid delays, and local opposition.",
    time: "Just now",
  },
  {
    id: 1,
    title:
      "Global Solar Capacity Crosses 5 Terawatts — a Historic Milestone for Clean Energy",
    time: "2 hrs ago",
  },
  {
    id: 2,
    title:
      "Hydrogen Fuel Cell Trucks Begin Commercial Operations on Trans-European Routes",
    time: "4 hrs ago",
  },
  {
    id: 3,
    title:
      "Saudi Arabia's NEOM Project Reveals 100% Renewable Powered Megacity Grid",
    time: "6 hrs ago",
  },
];

const healthcareStories = [
  {
    id: 1,
    title:
      "CRISPR Gene Editing Achieves 98% Success Rate in Clinical Trials for Sickle Cell Disease",
    time: "1 hr ago",
  },
  {
    id: 2,
    title:
      "AI Diagnostics Platform Outperforms Radiologists in Early Cancer Detection Study",
    time: "3 hrs ago",
  },
  {
    id: 3,
    title:
      "WHO Declares End to Decade-Long Battle with Antibiotic-Resistant Superbugs",
    time: "8 hrs ago",
  },
];

const manufacturingStories = [
  {
    id: 4,
    title:
      "DriveNets raises $410M backed by AMD to expand software-defined networking for AI data centers.",
    time: "Just now",
  },
  {
    id: 1,
    title:
      "Tesla's Gigafactory India Begins Production of Next-Gen 4680 Battery Cells",
    time: "2 hrs ago",
  },
  {
    id: 2,
    title:
      "3D-Printed Steel Bridges Deploy in Rotterdam, Cutting Construction Costs by 65%",
    time: "5 hrs ago",
  },
  {
    id: 3,
    title:
      "South Korea's Hyundai Robotics Ships 50,000 Humanoid Factory Workers Globally",
    time: "7 hrs ago",
  },
];

const smartCityStories = [
  {
    id: 1,
    title:
      "Dubai's Digital Twin City Platform Reduces Emergency Response Times by 40%",
    time: "3 hrs ago",
  },
  {
    id: 2,
    title:
      "Tokyo Smart Traffic System Eliminates Rush Hour Congestion in Pilot District",
    time: "6 hrs ago",
  },
  {
    id: 3,
    title:
      "Copenhagen Becomes First Carbon-Negative Capital City Through Smart Grid Innovations",
    time: "9 hrs ago",
  },
];

const supplyChainStories = [
  {
    id: 1,
    title:
      "Manufacturers Rebuild Supply Chains Around Unified Data, AI Scenario Modeling and Supplier Collaboration",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "91% of Mid-Market Manufacturers Use Generative AI in Supply-Chain Operations, but Operating Models Lag",
    time: "15 min ago",
  },
  {
    id: 3,
    title:
      "Tanker Traffic Through the Strait of Hormuz Jumps After US-Iran Shipping Lane Reopening Deal",
    time: "1 hr ago",
  },
  {
    id: 4,
    title:
      "Cargo Volumes Are Normalizing in 2026 After Companies Frontloaded Goods Ahead of New Tariffs",
    time: "2 hrs ago",
  },
  {
    id: 5,
    title:
      "Rising Corporate Debt Pushes Companies to Stress-Test Suppliers and Diversify Fragile Logistics Corridors",
    time: "3 hrs ago",
  },
  {
    id: 6,
    title:
      "ISG Launches a Study of Service Providers Supporting Manufacturers Through Supply-Chain Restructuring",
    time: "4 hrs ago",
  },
];

/* =========================================================
   INNOVATION FEATURE
========================================================= */

const innovationFeature = {
  title:
    "Innovation of the Year: Solid-State Batteries Set to Transform Electric Mobility",
  excerpt:
    "After decades of promise, solid-state battery technology has finally crossed the threshold of commercial viability. Toyota's new QuantumBattery delivers 800 miles of range, charges in 8 minutes, and lasts 20 years — fundamentally altering the economics of electric vehicles and grid storage alike.",
  author: "Sagar Kumar",
  image:
    "https://images.unsplash.com/photo-1760012945940-74d6bf54c0fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGRpZ2l0YWwlMjBmdXR1cmV8ZW58MXx8fHwxNzc5Mzg1OTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
};

/* =========================================================
   SMALL STORY LIST
========================================================= */

function SmallStoryList({
  stories,
}: {
  stories: Array<{
    id: number;
    title: string;
    time: string;
  }>;
}) {
  return (
    <div>
      {stories.map((s) => (
        <div
          key={s.id}
          className="py-3 border-b border-gray-200 cursor-pointer group"
        >
          <p className="text-[13px] md:text-[14px] font-semibold leading-snug text-gray-900 group-hover:underline">
            {s.title}
          </p>

          <span className="text-[10px] text-gray-500 flex items-center gap-1 mt-1.5">
            <Clock size={9} />
            {s.time}
          </span>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   ARTICLE READER
========================================================= */

function ArticleReader({
  article,
  onClose,
}: {
  article: {
    title: string;
    category?: string;
    author?: string;
    time?: string;
    image?: string;
    article: string;
  };
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 md:p-8 overflow-y-auto">
      <div className="relative w-full max-w-[900px] bg-white shadow-2xl my-4 md:my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 bg-black text-white text-[11px] uppercase tracking-wide px-3 py-2 hover:bg-gray-800"
        >
          Close
        </button>

        {article.image && (
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="w-full h-[220px] md:h-[360px] object-cover"
          />
        )}

        <div className="p-5 md:p-8">
          {article.category && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-red-700">
              {article.category}
            </span>
          )}

          <h2 className="font-serif text-[27px] md:text-[38px] font-bold leading-tight mt-2">
            {article.title}
          </h2>

          <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-500 border-b border-gray-200 pb-4">
            {article.author && <span>By {article.author}</span>}
            {article.time && <span>{article.time}</span>}
          </div>

          <div className="mt-6 max-w-[760px]">
            {article.article.split("\n\n").map((paragraph, index) => (
              <p key={index} className="font-serif text-[15px] md:text-[17px] leading-[1.75] text-gray-800 mb-5">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TECHNOLOGY PAGE
========================================================= */

export function InternationalNewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    category?: string;
    author?: string;
    time?: string;
    image?: string;
    article: string;
  } | null>(null);

  const openArticle = (article: typeof techHero | typeof techHero1 | typeof techHero2 | typeof aiStories[number]) => {
    setSelectedArticle(article);
  };

  return (
    <main className="bg-white text-black min-h-screen">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6">

        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <div className="pt-7 md:pt-9 pb-3 border-b border-black">
          <h1 className="font-serif text-[34px] md:text-[42px] lg:text-[48px] font-bold leading-none tracking-tight">
            Technology
          </h1>
        </div>

        {/* =================================================
            CATEGORY NAVIGATION
        ================================================= */}

        <nav className="border-b border-gray-300 py-2.5 mb-5">
          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto whitespace-nowrap">
            {techCategories.map(
              ({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  className={`flex items-center gap-1.5 text-[10px] md:text-[11px] uppercase tracking-wide ${color} hover:text-black transition-colors`}
                >
                  <Icon size={11} />
                  {label}
                </button>
              )
            )}
          </div>
        </nav>

        {/* =================================================
            TOP NEWS GRID
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] border-b border-gray-300">

          {/* MAIN STORY */}

          <article className="lg:pr-4 lg:border-r border-gray-300 pb-5">
            <div className="overflow-hidden mb-3">
              <ImageWithFallback
                src={techHero.image}
                alt={techHero.title}
                className="w-full h-[230px] md:h-[270px] object-cover"
              />
            </div>

            <span className="text-[9px] font-bold uppercase tracking-wider text-red-700">
              {techHero.category}
            </span>

            <h2 className="font-serif text-[22px] md:text-[25px] font-bold leading-[1.05] mt-1.5 hover:underline cursor-pointer">
              {techHero.title}
            </h2>

            <p className="text-[12px] leading-relaxed text-gray-600 mt-2">
              {techHero.excerpt}
            </p>

            <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-500">
              <span>By {techHero.author}</span>
              <span className="flex items-center gap-1">
                <Clock size={9} />
                {techHero.time}
              </span>
            </div>
          </article>

          {/* SECOND STORY */}

          <article className="lg:px-4 py-5 lg:py-0 border-t lg:border-t-0 border-gray-300">
            <div className="overflow-hidden mb-3">
              <ImageWithFallback
                src={techHero1.image}
                alt={techHero1.title}
                className="w-full h-[210px] md:h-[240px] object-cover"
              />
            </div>

            <span className="text-[9px] font-bold uppercase tracking-wider text-red-700">
              {techHero1.category}
            </span>

            <h2 className="font-serif text-[20px] md:text-[23px] font-bold leading-[1.08] mt-1.5 hover:underline cursor-pointer">
              {techHero1.title}
            </h2>

            <p className="text-[12px] leading-relaxed text-gray-600 mt-2">
              {techHero1.excerpt}
            </p>

            <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-500">
              <span>By {techHero1.author}</span>
              <span className="flex items-center gap-1">
                <Clock size={9} />
                {techHero1.time}
              </span>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}

          <aside className="lg:border-l border-gray-300 lg:pl-4 pt-5 lg:pt-0">

            {/* Innovation */}

            <div className="border border-gray-300 p-3">
              <div className="flex items-center justify-between border-b border-black pb-2 mb-3">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Innovation
                </span>

                <ArrowRight size={11} />
              </div>

              <div className="overflow-hidden mb-3">
                <ImageWithFallback
                  src={innovationFeature.image}
                  alt={innovationFeature.title}
                  className="w-full h-[125px] object-cover"
                />
              </div>

              <h3 className="font-serif text-[16px] font-bold leading-tight">
                {innovationFeature.title}
              </h3>

              <p className="text-[10px] text-gray-500 leading-relaxed mt-2 line-clamp-5">
                {innovationFeature.excerpt}
              </p>

              <button className="mt-3 text-[9px] font-bold uppercase tracking-wide flex items-center gap-1 hover:underline">
                Read Deep Dive
                <ArrowRight size={10} />
              </button>
            </div>

            {/* Quote */}

            <div className="mt-4 border-t border-b border-gray-300 py-3">
              <p className="font-serif italic text-[12px] leading-relaxed">
                "The move from model hype to infrastructure reality is now
                defining where the AI industry places its bets — chips, power
                grids, data centers, robotics, satellites, and government
                access controls."
              </p>

              <p className="text-[9px] font-bold mt-2">
                — Tech Startups Global Analysis, June 2026
              </p>
            </div>
          </aside>
        </section>

        {/* =================================================
            THIRD FEATURE
        ================================================= */}

        <section className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-300">

          <article className="md:pr-4 py-5 md:border-r border-gray-300">
            <div className="overflow-hidden mb-3">
              <ImageWithFallback
                src={techHero2.image}
                alt={techHero2.title}
                className="w-full h-[220px] object-cover"
              />
            </div>

            <span className="text-[9px] font-bold uppercase tracking-wider text-red-700">
              {techHero2.category}
            </span>

            <h2 className="font-serif text-[21px] md:text-[24px] font-bold leading-tight mt-1.5 hover:underline cursor-pointer">
              {techHero2.title}
            </h2>

            <p className="text-[12px] leading-relaxed text-gray-600 mt-2">
              {techHero2.excerpt}
            </p>

            <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-500">
              <span>By {techHero2.author}</span>

              <span className="flex items-center gap-1">
                <Clock size={9} />
                {techHero2.time}
              </span>
            </div>
          </article>

          {/* MARKET OUTLOOK */}

          <div className="md:pl-4 py-5">
            <div className="border-t border-black">
              <div className="py-2 border-b border-gray-300">
                <h3 className="text-[12px] font-bold uppercase tracking-wide">
                  Market Outlook
                </h3>
              </div>

              <div className="py-3">
                <p className="text-[12px] leading-relaxed text-gray-700">
                  Global AI market continues strong growth trajectory. The IMF
                  projects 3.1% global economic growth in 2026, with broader AI
                  adoption cited as a key upside risk to the forecast.
                </p>

                <div className="mt-4 border-t border-gray-200 pt-3">
                  <p className="text-[9px] font-bold uppercase tracking-wide">
                    Key Developments
                  </p>

                  <ul className="mt-2 space-y-2 text-[10px] leading-relaxed text-gray-600 list-disc pl-4">
                    <li>Agentic AI and embedded AI procurement tools entering enterprise workflows.</li>
                    <li>Data-center electricity demand projected to approach 1,000 TWh by 2030.</li>
                    <li>Secure power access increasingly critical for AI infrastructure.</li>
                    <li>EY expanded NVIDIA-powered enterprise AI capabilities with LangChain validation.</li>
                    <li>AI adoption shifting from assistive to autonomous systems, driving new regulatory frameworks.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            AI & MACHINE LEARNING
        ================================================= */}

        <section className="py-6" id="innovation">
          <SectionHeader title="AI & Machine Learning" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
            {aiStories.map((s) => (
              <article
                key={s.id}
                className="group cursor-pointer"
                onClick={() => openArticle(s)}
              >
                <div className="overflow-hidden mb-2">
                  <ImageWithFallback
                    src={s.image}
                    alt={s.title}
                    className="w-full h-[125px] md:h-[145px] object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                <h3 className="font-serif text-[13px] md:text-[14px] font-bold leading-tight group-hover:underline">
                  {s.title}
                </h3>

                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed line-clamp-3">
                  {s.excerpt}
                </p>

                <span className="text-[9px] text-gray-400 flex items-center gap-1 mt-2">
                  <Clock size={8} />
                  {s.time}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            CYBERSECURITY + ENERGY
        ================================================= */}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-300 pt-5 mb-7">

          <div id="cybersecurity">
            <SectionHeader title="Cybersecurity" />
            <SmallStoryList stories={cyberStories} />
          </div>

          <div id="energy">
            <SectionHeader title="Energy Technology" />
            <SmallStoryList stories={energyStories} />
          </div>

        </section>

        {/* =================================================
            HEALTHCARE
        ================================================= */}

        <section className="mb-7" id="healthcare">
          <SectionHeader title="Healthcare & BioTech" />

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6">

            <article className="group cursor-pointer">
              <div className="overflow-hidden mb-3">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1766315746079-215ff5115e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNpbmUlMjBob3NwaXRhbCUyMGlubm92YXRpb258ZW58MXx8fHwxNzc5Mzg1OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Healthcare"
                  className="w-full h-[220px] object-cover group-hover:scale-[1.01] transition-transform duration-300"
                />
              </div>

              <h3 className="font-serif text-[18px] md:text-[21px] font-bold leading-tight group-hover:underline">
                {healthcareStories[0].title}
              </h3>
            </article>

            <div>
              <SmallStoryList
                stories={healthcareStories.slice(1)}
              />

              <div className="mt-4 border-t border-b border-gray-300 py-3">
                <p className="text-[9px] font-bold uppercase tracking-wide">
                  Market Insight
                </p>

                <p className="text-[12px] mt-1 leading-relaxed">
                  Global healthcare AI market projected to reach $187B by 2030,
                  growing at 37% CAGR.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* =================================================
            MANUFACTURING + SMART CITIES
        ================================================= */}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-300 pt-5 mb-7">

          <div id="manufacturing">
            <SectionHeader title="Manufacturing & Industry 4.0" />

            <div className="overflow-hidden mb-3">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760553120312-2821bf54e767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjB1cmJhbiUyMGZ1dHVyZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzkzODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Manufacturing"
                className="w-full h-[170px] object-cover"
              />
            </div>

            <SmallStoryList stories={manufacturingStories} />
          </div>

          <div id="smart-cities">
            <SectionHeader title="Smart Cities" />

            <div className="overflow-hidden mb-3">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760553120209-8e9d5d2493e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzbWFydCUyMGNpdHklMjB1cmJhbiUyMGZ1dHVyZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzkzODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Smart City"
                className="w-full h-[170px] object-cover"
              />
            </div>

            <SmallStoryList stories={smartCityStories} />
          </div>

        </section>

        {/* =================================================
            SUPPLY CHAIN
        ================================================= */}

        <section
          className="mb-10 border-t border-gray-300 pt-5"
          id="supply-chain"
        >
          <SectionHeader title="Supply Chain & Logistics" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <SmallStoryList
              stories={supplyChainStories.slice(0, 3)}
            />

            <SmallStoryList
              stories={supplyChainStories.slice(3)}
            />
          </div>
        </section>

      </div>

      {selectedArticle && (
        <ArticleReader
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
      <PrideTimesAd variant="first" />
    </main>
  );
}
