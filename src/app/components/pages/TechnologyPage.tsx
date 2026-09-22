import { TimeAgo } from "../../utils/timeAgo";
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

import { ImageWithFallback } from "../figma/ImageWithFallback";

import HeroImg from "../../../imports/heroimage.png";
import Hero1Img from "../../../imports/Techheroimage.png";

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
    <div className="flex items-center justify-between border-t-2 border-black border-b border-gray-300 py-2.5 mb-6">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-red-700 rounded-full" />

        <h2 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.15em]">
          {title}
        </h2>
      </div>

      {link && (
        <a
          href={link}
          className="text-[9px] uppercase tracking-[0.12em] text-gray-500 hover:text-red-700 flex items-center gap-1"
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
   ONLY TWO STORIES
========================================================= */

const leadStory = {
  category: "ARTIFICIAL INTELLIGENCE",
  title:
    "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
  excerpt:
    "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and South Korea, expanding its already well-established relationship with China's Unitree. The chipmaker's shares climbed approximately 6% during the June 1 session, bringing its year-to-date gains to roughly 20%.",
  author: "Sagar Kumar",
  publishedAt: "1 June 2026",
  image: HeroImg,
};

const secondaryStory = {
  category: "ARTIFICIAL INTELLIGENCE",
  title:
    "Intel Attempts Inference-Chip Comeback as AI Compute Wars Intensify",
  excerpt:
    "Intel has unveiled a renewed push into the inference accelerator market, positioning its next-generation Gaudi chips as a cost-effective alternative for enterprises deploying large-scale AI models.",
  author: "Sagar Kumar",
  publishedAt: "1 June 2026",
  image: Hero1Img,
};

/* =========================================================
   CATEGORY NAVIGATION
========================================================= */

const techCategories = [
  { icon: Cpu, label: "AI & Machine Learning" },
  { icon: Shield, label: "Cybersecurity" },
  { icon: Zap, label: "Energy Tech" },
  { icon: Heart, label: "HealthTech" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Building2, label: "Smart Cities" },
  { icon: Truck, label: "Supply Chain" },
];

/* =========================================================
   AI STORIES
========================================================= */

const aiStories = [
  {
    id: 1,
    title:
      "SpaceX prices IPO at $135 per share, raising $75B at a $1.77T valuation in the largest IPO ever.",
    excerpt:
      "The share listing positions SpaceX among the world's five largest companies while underscoring investor appetite for AI infrastructure and space-tech capital.",
    publishedAt: "2026-09-21T10:19:00Z",
    image:
      "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 2,
    title:
      "SpaceX agrees to acquire AI coding startup Cursor for $60B, folding the asset into xAI.",
    excerpt:
      "The all-stock deal is expected to close in Q3 2026 and signals a major move into coding agents.",
    publishedAt: "2026-09-21T10:19:00Z",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 3,
    title:
      "Anthropic surpasses OpenAI with a $30B run rate and prepares a confidential IPO filing.",
    excerpt:
      "Enterprise API and agentic product usage continue to drive rapid growth across the AI industry.",
    publishedAt: "2026-09-21T10:19:00Z",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 4,
    title:
      "Nvidia unveils the RTX Spark Superchip at Computex, pairing Blackwell RTX graphics with Grace CPU for AI PCs.",
    excerpt:
      "The new chip brings powerful AI processing capabilities to desktops and professional workstations.",
    publishedAt: "2026-09-21T10:19:00Z",
    image:
      "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 5,
    title:
      "NVIDIA's Blackwell Ultra GPU Delivers 40x Speed Boost for LLM Training",
    excerpt:
      "The architecture changes what is possible in real-time AI inference at scale.",
    publishedAt: "2026-09-21T08:19:00Z",
    image:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 6,
    title:
      "Google DeepMind Achieves Breakthrough in Protein Structure Prediction for Drug Discovery",
    excerpt:
      "New AI models are opening new possibilities for pharmaceutical research.",
    publishedAt: "2026-09-21T06:19:00Z",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85",
  },
];

/* =========================================================
   CYBERSECURITY
========================================================= */

const cyberStories = [
  {
    id: 1,
    title:
      "Florida sues OpenAI and Sam Altman, alleging ChatGPT caused harm as regulators warn growth is being prioritized over safety.",
    publishedAt: "2026-09-21T10:19:00Z",
  },
  {
    id: 2,
    title:
      "White House pressure reportedly pulled back Anthropic's most capable models amid concerns over high-risk AI systems.",
    publishedAt: "2026-09-21T10:19:00Z",
  },
  {
    id: 3,
    title:
      "Zero-Day Exploit Threatens 2 Billion Android Devices Globally",
    publishedAt: "2026-09-21T07:19:00Z",
  },
  {
    id: 4,
    title:
      "US CISA Issues Emergency Directive After Critical Infrastructure Breach",
    publishedAt: "2026-09-21T05:19:00Z",
  },
  {
    id: 5,
    title:
      "Quantum Encryption Startup Raises $400M Series C to Secure Financial Networks",
    publishedAt: "2026-09-21T03:19:00Z",
  },
  {
    id: 6,
    title:
      "Ransomware Attacks Hit Record High in Q1 2026, Costing Enterprises $12B",
    publishedAt: "2026-09-21T01:19:00Z",
  },
];

/* =========================================================
   ENERGY
========================================================= */

const energyStories = [
  {
    id: 1,
    title:
      "Ohio suspends a major data-center tax incentive after AI infrastructure costs surge, deepening grid and community pushback.",
    publishedAt: "2026-09-21T10:19:00Z",
  },
  {
    id: 2,
    title:
      "Analysts say 30-50% of planned U.S. AI data centers may miss 2026 timelines or be canceled over transformer shortages, grid delays, and local opposition.",
    publishedAt: "2026-09-21T10:19:00Z",
  },
  {
    id: 3,
    title:
      "Global Solar Capacity Crosses 5 Terawatts — a Historic Milestone for Clean Energy",
    publishedAt: "2026-09-21T08:19:00Z",
  },
  {
    id: 4,
    title:
      "Hydrogen Fuel Cell Trucks Begin Commercial Operations on Trans-European Routes",
    publishedAt: "2026-09-21T06:19:00Z",
  },
  {
    id: 5,
    title:
      "Saudi Arabia's NEOM Project Reveals 100% Renewable Powered Megacity Grid",
    publishedAt: "2026-09-21T04:19:00Z",
  },
];

/* =========================================================
   HEALTHCARE
========================================================= */

const healthcareStories = [
  {
    id: 1,
    title:
      "CRISPR Gene Editing Achieves 98% Success Rate in Clinical Trials for Sickle Cell Disease",
    publishedAt: "2026-09-21T09:19:00Z",
  },
  {
    id: 2,
    title:
      "AI Diagnostics Platform Outperforms Radiologists in Early Cancer Detection Study",
    publishedAt: "2026-09-21T07:19:00Z",
  },
  {
    id: 3,
    title:
      "WHO Declares End to Decade-Long Battle with Antibiotic-Resistant Superbugs",
    publishedAt: "2026-09-21T02:19:00Z",
  },
];

/* =========================================================
   MANUFACTURING
========================================================= */

const manufacturingStories = [
  {
    id: 1,
    title:
      "DriveNets raises $410M backed by AMD to expand software-defined networking for AI data centers.",
    publishedAt: "2026-09-21T10:19:00Z",
  },
  {
    id: 2,
    title:
      "Tesla's Gigafactory India Begins Production of Next-Gen 4680 Battery Cells",
    publishedAt: "2026-09-21T08:19:00Z",
  },
  {
    id: 3,
    title:
      "3D-Printed Steel Bridges Deploy in Rotterdam, Cutting Construction Costs by 65%",
    publishedAt: "2026-09-21T05:19:00Z",
  },
  {
    id: 4,
    title:
      "South Korea's Hyundai Robotics Ships 50,000 Humanoid Factory Workers Globally",
    publishedAt: "2026-09-21T03:19:00Z",
  },
];

/* =========================================================
   SMART CITIES
========================================================= */

const smartCityStories = [
  {
    id: 1,
    title:
      "Dubai's Digital Twin City Platform Reduces Emergency Response Times by 40%",
    publishedAt: "2026-09-21T07:19:00Z",
  },
  {
    id: 2,
    title:
      "Tokyo Smart Traffic System Eliminates Rush Hour Congestion in Pilot District",
    publishedAt: "2026-09-21T04:19:00Z",
  },
  {
    id: 3,
    title:
      "Copenhagen Becomes First Carbon-Negative Capital City Through Smart Grid Innovations",
    publishedAt: "2026-09-21T01:19:00Z",
  },
];

/* =========================================================
   SUPPLY CHAIN
========================================================= */

const supplyChainStories = [
  {
    id: 1,
    title:
      "Manufacturers Rebuild Supply Chains Around Unified Data, AI Scenario Modeling and Supplier Collaboration",
    publishedAt: "2026-09-21T10:19:00Z",
  },
  {
    id: 2,
    title:
      "91% of Mid-Market Manufacturers Use Generative AI in Supply-Chain Operations, but Operating Models Lag",
    publishedAt: "2026-09-21T10:04:00Z",
  },
  {
    id: 3,
    title:
      "Tanker Traffic Through the Strait of Hormuz Jumps After US-Iran Shipping Lane Reopening Deal",
    publishedAt: "2026-09-21T09:19:00Z",
  },
  {
    id: 4,
    title:
      "Cargo Volumes Are Normalizing in 2026 After Companies Frontloaded Goods Ahead of New Tariffs",
    publishedAt: "2026-09-21T08:19:00Z",
  },
  {
    id: 5,
    title:
      "Rising Corporate Debt Pushes Companies to Stress-Test Suppliers and Diversify Fragile Logistics Corridors",
    publishedAt: "2026-09-21T07:19:00Z",
  },
  {
    id: 6,
    title:
      "ISG Launches a Study of Service Providers Supporting Manufacturers Through Supply-Chain Restructuring",
    publishedAt: "2026-09-21T06:19:00Z",
  },
];

/* =========================================================
   UNIQUE SECTION IMAGES
========================================================= */

const sectionImages = {
  cybersecurity:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85",

  energy:
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=85",

  healthcare:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",

  manufacturing:
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1400&q=85",

  smartCities:
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=85",

  supplyChain:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
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
    publishedAt: string;
  }>;
}) {
  return (
    <div>
      {stories.map((story, index) => (
        <article
          key={`${story.id}-${index}`}
          className="py-4 border-b border-gray-200 cursor-pointer group px-1 hover:bg-gray-50 transition-colors"
        >
          <div className="flex gap-3">
            <span className="font-serif text-[18px] font-bold text-gray-300 leading-none min-w-[24px]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="text-[13px] md:text-[14px] font-semibold leading-[1.3] text-gray-900 group-hover:text-red-700 transition-colors">
                {story.title}
              </h3>

              <span className="text-[9px] text-gray-400 flex items-center gap-1 mt-2">
                <Clock size={9} />
                <TimeAgo iso={story.publishedAt} />
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}


/* =========================================================
   TECHNOLOGY PAGE
   Layout inspired by the supplied editorial reference image.
   Existing Technology content and image sources are preserved.
========================================================= */

export function TechnologyPage() {
  const latestStories = aiStories.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}
        <header className="border-t-[3px] border-red-600 pt-5 sm:pt-6 pb-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] font-black leading-none tracking-[-0.03em]">
              Technology
            </h1>
            <p className="text-[10px] sm:text-[11px] text-gray-500">
              Artificial intelligence, cybersecurity, robotics, biotechnology and the technologies reshaping the global economy.
            </p>
          </div>
        </header>

        {/* HERO + SIDEBAR */}
        <section className="grid grid-cols-1 gap-4 border-b-2 border-black pb-6 lg:grid-cols-[minmax(0,1fr)_270px]">

          {/* LEAD STORY */}
          <article className="group min-w-0">
            <div className="relative overflow-hidden rounded-md bg-gray-200">
              <ImageWithFallback
                src={leadStory.image}
                alt={leadStory.title}
                className="h-[250px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:h-[330px] md:h-[390px] lg:h-[390px]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="pt-3">
              <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-red-700">
                {leadStory.category}
              </span>

              <h2 className="mt-1 font-serif text-[23px] font-black leading-[1.03] tracking-[-0.02em] sm:text-[28px] md:text-[34px] lg:text-[36px]">
                {leadStory.title}
              </h2>

              <p className="mt-2 max-w-[900px] text-[10px] leading-[1.55] text-gray-600 sm:text-[11px]">
                {leadStory.excerpt}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-[7px] uppercase tracking-wider text-gray-500 sm:text-[8px]">
                <span className="font-bold text-gray-800">
                  By {leadStory.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={9} />
                  <TimeAgo iso={leadStory.publishedAt} />
                </span>
              </div>
            </div>
          </article>

          {/* RIGHT RAIL */}
          <aside className="border-t border-gray-300 pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <div className="border-b border-black pb-1">
              <h3 className="text-[9px] font-black uppercase tracking-[0.1em]">
                More Stories
              </h3>
            </div>

            <div>
              {aiStories.slice(0, 2).map((story, index) => (
                <article
                  key={`rail-${story.id}`}
                  className="group flex gap-2 border-b border-gray-200 py-2.5"
                >
                  <div className="h-[52px] w-[72px] shrink-0 overflow-hidden rounded-sm">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[6px] font-bold uppercase tracking-wider text-red-700">
                      Technology
                    </span>
                    <h4 className="mt-0.5 font-serif text-[10px] font-bold leading-[1.15] group-hover:underline">
                      {index === 0 ? leadStory.title : story.title}
                    </h4>
                    <p className="mt-1 text-[6px] text-gray-400">
                      <TimeAgo iso={story.publishedAt} />
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>

        {/* SECONDARY HERO STORY */}
        <section className="grid grid-cols-1 gap-5 border-b border-gray-300 py-5 md:grid-cols-[1.3fr_1fr]">
          <article className="group">
            <div className="overflow-hidden rounded-md">
              <ImageWithFallback
                src={secondaryStory.image}
                alt={secondaryStory.title}
                className="h-[190px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] sm:h-[240px] md:h-[255px]"
              />
            </div>
          </article>

          <article className="flex flex-col justify-center">
            <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-red-700">
              {secondaryStory.category}
            </span>
            <h2 className="mt-1 font-serif text-[21px] font-black leading-[1.05] sm:text-[25px] md:text-[29px]">
              {secondaryStory.title}
            </h2>
            <p className="mt-2 text-[10px] leading-[1.55] text-gray-600 sm:text-[11px]">
              {secondaryStory.excerpt}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[7px] uppercase tracking-wider text-gray-500">
              <span className="font-bold text-gray-800">
                By {secondaryStory.author}
              </span>
              <span>•</span>
              <span><TimeAgo iso={secondaryStory.publishedAt} /></span>
            </div>
          </article>
        </section>

        {/* LATEST TECHNOLOGY NEWS */}
        <section className="py-6 sm:py-7">
          <div className="mb-4 flex items-center justify-between border-t-2 border-black pt-2">
            <h2 className="text-[13px] font-black sm:text-[15px]">
              Latest Technology News
            </h2>
            <span className="hidden text-[7px] uppercase tracking-[0.14em] text-gray-500 sm:block">
              Artificial Intelligence • Innovation • Industry
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {latestStories.map((story, index) => (
              <article
                key={`latest-${story.id}`}
                className="group overflow-hidden rounded-md border border-gray-200 bg-white"
              >
                <div className="overflow-hidden">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="h-[165px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.035] sm:h-[150px] lg:h-[155px]"
                  />
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[6px] font-bold uppercase tracking-[0.14em] text-red-700">
                      {index < 4 ? "Technology" : "AI"}
                    </span>
                    {index < 4 && (
                      <span className="bg-red-600 px-1.5 py-0.5 text-[5px] font-bold uppercase tracking-wider text-white">
                        Hot
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1 font-serif text-[13px] font-bold leading-[1.12] sm:text-[14px]">
                    {story.title}
                  </h3>

                  <p className="mt-1.5 line-clamp-2 text-[8px] leading-[1.45] text-gray-500 sm:text-[9px]">
                    {story.excerpt}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-[6px] text-gray-400">
                    <Clock size={8} />
                    <TimeAgo iso={story.publishedAt} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CATEGORY SECTIONS */}
        <section className="grid grid-cols-1 gap-0 border-t-2 border-black lg:grid-cols-2">

          <div className="py-6 lg:pr-6 lg:border-r lg:border-gray-300">
            <SectionHeader title="Cybersecurity" />
            <div className="mb-4 overflow-hidden rounded-md">
              <ImageWithFallback
                src={sectionImages.cybersecurity}
                alt="Cybersecurity technology"
                className="h-[190px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] sm:h-[230px]"
              />
            </div>
            <SmallStoryList stories={cyberStories.slice(0, 4)} />
          </div>

          <div className="py-6 lg:pl-6">
            <SectionHeader title="Energy Technology" />
            <div className="mb-4 overflow-hidden rounded-md">
              <ImageWithFallback
                src={sectionImages.energy}
                alt="Energy technology"
                className="h-[190px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] sm:h-[230px]"
              />
            </div>
            <SmallStoryList stories={energyStories.slice(0, 4)} />
          </div>
        </section>

        <section className="border-t-2 border-black py-7" id="healthcare">
          <SectionHeader title="Healthcare & BioTech" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_1fr]">
            <article className="group overflow-hidden rounded-md">
              <div className="relative">
                <ImageWithFallback
                  src={sectionImages.healthcare}
                  alt="Healthcare and biotechnology"
                  className="h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:h-[320px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-20">
                  <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-white">
                    Healthcare Innovation
                  </span>
                  <h3 className="mt-1 font-serif text-[18px] font-bold leading-tight text-white sm:text-[23px]">
                    {healthcareStories[0].title}
                  </h3>
                </div>
              </div>
            </article>

            <div>
              <SmallStoryList stories={healthcareStories.slice(1)} />
              <div className="mt-5 bg-black p-5 text-white">
                <span className="text-[7px] uppercase tracking-[0.15em] text-gray-400">
                  Market Insight
                </span>
                <p className="mt-2 font-serif text-[16px] leading-tight">
                  Global healthcare AI market projected to reach $187B by 2030, growing at 37% CAGR.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 border-t-2 border-black lg:grid-cols-2">
          <div className="py-6 lg:pr-6 lg:border-r lg:border-gray-300">
            <SectionHeader title="Manufacturing & Industry 4.0" />
            <div className="mb-4 overflow-hidden rounded-md">
              <ImageWithFallback
                src={sectionImages.manufacturing}
                alt="Advanced manufacturing"
                className="h-[190px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] sm:h-[230px]"
              />
            </div>
            <SmallStoryList stories={manufacturingStories} />
          </div>

          <div className="py-6 lg:pl-6">
            <SectionHeader title="Smart Cities" />
            <div className="mb-4 overflow-hidden rounded-md">
              <ImageWithFallback
                src={sectionImages.smartCities}
                alt="Smart city technology"
                className="h-[190px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] sm:h-[230px]"
              />
            </div>
            <SmallStoryList stories={smartCityStories} />
          </div>
        </section>

        <section className="border-t-2 border-black py-7 pb-12" id="supply-chain">
          <SectionHeader title="Supply Chain & Logistics" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
            <div className="group overflow-hidden">
              <ImageWithFallback
                src={sectionImages.supplyChain}
                alt="Supply chain and logistics"
                className="h-[250px] w-full rounded-md object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:h-[330px]"
              />
              <div className="border-x border-b border-gray-300 bg-white p-4">
                <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-red-700">
                  Logistics & Trade
                </span>
                <h3 className="mt-1 font-serif text-[18px] font-bold leading-tight sm:text-[22px]">
                  The global supply chain is being rebuilt around data, automation and artificial intelligence.
                </h3>
              </div>
            </div>

            <div>
              <SmallStoryList stories={supplyChainStories} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
