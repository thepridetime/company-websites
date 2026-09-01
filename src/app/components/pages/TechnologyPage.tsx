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
  time: "1 June 2026",
  image: HeroImg,
};

const secondaryStory = {
  category: "ARTIFICIAL INTELLIGENCE",
  title:
    "Intel Attempts Inference-Chip Comeback as AI Compute Wars Intensify",
  excerpt:
    "Intel has unveiled a renewed push into the inference accelerator market, positioning its next-generation Gaudi chips as a cost-effective alternative for enterprises deploying large-scale AI models.",
  author: "Sagar Kumar",
  time: "1 June 2026",
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
    time: "Just now",
    image:
      "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 2,
    title:
      "SpaceX agrees to acquire AI coding startup Cursor for $60B, folding the asset into xAI.",
    excerpt:
      "The all-stock deal is expected to close in Q3 2026 and signals a major move into coding agents.",
    time: "Just now",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 3,
    title:
      "Anthropic surpasses OpenAI with a $30B run rate and prepares a confidential IPO filing.",
    excerpt:
      "Enterprise API and agentic product usage continue to drive rapid growth across the AI industry.",
    time: "Just now",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 4,
    title:
      "Nvidia unveils the RTX Spark Superchip at Computex, pairing Blackwell RTX graphics with Grace CPU for AI PCs.",
    excerpt:
      "The new chip brings powerful AI processing capabilities to desktops and professional workstations.",
    time: "Just now",
    image:
      "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 5,
    title:
      "NVIDIA's Blackwell Ultra GPU Delivers 40x Speed Boost for LLM Training",
    excerpt:
      "The architecture changes what is possible in real-time AI inference at scale.",
    time: "2 hrs ago",
    image:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 6,
    title:
      "Google DeepMind Achieves Breakthrough in Protein Structure Prediction for Drug Discovery",
    excerpt:
      "New AI models are opening new possibilities for pharmaceutical research.",
    time: "4 hrs ago",
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
    time: "Just now",
  },
  {
    id: 2,
    title:
      "White House pressure reportedly pulled back Anthropic's most capable models amid concerns over high-risk AI systems.",
    time: "Just now",
  },
  {
    id: 3,
    title:
      "Zero-Day Exploit Threatens 2 Billion Android Devices Globally",
    time: "3 hrs ago",
  },
  {
    id: 4,
    title:
      "US CISA Issues Emergency Directive After Critical Infrastructure Breach",
    time: "5 hrs ago",
  },
  {
    id: 5,
    title:
      "Quantum Encryption Startup Raises $400M Series C to Secure Financial Networks",
    time: "7 hrs ago",
  },
  {
    id: 6,
    title:
      "Ransomware Attacks Hit Record High in Q1 2026, Costing Enterprises $12B",
    time: "9 hrs ago",
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
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Analysts say 30-50% of planned U.S. AI data centers may miss 2026 timelines or be canceled over transformer shortages, grid delays, and local opposition.",
    time: "Just now",
  },
  {
    id: 3,
    title:
      "Global Solar Capacity Crosses 5 Terawatts — a Historic Milestone for Clean Energy",
    time: "2 hrs ago",
  },
  {
    id: 4,
    title:
      "Hydrogen Fuel Cell Trucks Begin Commercial Operations on Trans-European Routes",
    time: "4 hrs ago",
  },
  {
    id: 5,
    title:
      "Saudi Arabia's NEOM Project Reveals 100% Renewable Powered Megacity Grid",
    time: "6 hrs ago",
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

/* =========================================================
   MANUFACTURING
========================================================= */

const manufacturingStories = [
  {
    id: 1,
    title:
      "DriveNets raises $410M backed by AMD to expand software-defined networking for AI data centers.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Tesla's Gigafactory India Begins Production of Next-Gen 4680 Battery Cells",
    time: "2 hrs ago",
  },
  {
    id: 3,
    title:
      "3D-Printed Steel Bridges Deploy in Rotterdam, Cutting Construction Costs by 65%",
    time: "5 hrs ago",
  },
  {
    id: 4,
    title:
      "South Korea's Hyundai Robotics Ships 50,000 Humanoid Factory Workers Globally",
    time: "7 hrs ago",
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

/* =========================================================
   SUPPLY CHAIN
========================================================= */

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
    time: string;
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
                {story.time}
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
========================================================= */

export function TechnologyPage() {
  return (
    <main className="bg-[#f7f7f5] text-[#111] min-h-screen">

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="pt-8 md:pt-12 pb-5 border-b-[3px] border-black">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>

              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-bold text-red-700 mb-2">
                The Future of Business & Innovation
              </p>

              <h1 className="font-serif text-[42px] md:text-[54px] lg:text-[64px] font-black leading-[0.9] tracking-[-0.04em]">
                Technology
              </h1>

            </div>

            <p className="max-w-[380px] text-[11px] md:text-[12px] leading-[1.7] text-gray-500">
              Artificial intelligence, cybersecurity, robotics,
              biotechnology and the technologies reshaping the global economy.
            </p>

          </div>

        </header>

        {/* =================================================
            CATEGORY NAV
        ================================================= */}

        <nav className="border-b border-gray-300 py-3 mb-8">

          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">

            {techCategories.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.12em] font-semibold text-gray-600 hover:text-red-700 transition-colors whitespace-nowrap"
              >

                <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                  <Icon size={11} />
                </span>

                {label}

              </button>
            ))}

          </div>

        </nav>

        {/* =================================================
            OPENING NEWS AREA
            ONLY 2 STORIES
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-0 border-b-2 border-black pb-8">

          {/* MAIN NEWS */}

          <article className="group lg:pr-8">

            <div className="relative overflow-hidden mb-5">

              <ImageWithFallback
                src={leadStory.image}
                alt={leadStory.title}
                className="w-full h-[300px] sm:h-[380px] md:h-[440px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <span className="absolute bottom-4 left-4 bg-red-700 text-white px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em]">
                {leadStory.category}
              </span>

            </div>

            <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-black leading-[0.98] tracking-[-0.025em] group-hover:underline decoration-2 underline-offset-4">
              {leadStory.title}
            </h2>

            <p className="text-[12px] md:text-[13px] leading-[1.75] text-gray-600 mt-4 max-w-[850px]">
              {leadStory.excerpt}
            </p>

            <div className="flex items-center gap-4 mt-4 text-[9px] uppercase tracking-wider text-gray-500">

              <span className="font-bold text-black">
                By {leadStory.author}
              </span>

              <span className="flex items-center gap-1">
                <Clock size={10} />
                {leadStory.time}
              </span>

            </div>

          </article>

          {/* SECOND NEWS */}

          <article className="group lg:pl-8 mt-8 lg:mt-0 lg:border-l border-gray-300">

            <div className="overflow-hidden mb-5">

              <ImageWithFallback
                src={secondaryStory.image}
                alt={secondaryStory.title}
                className="w-full h-[250px] sm:h-[300px] lg:h-[330px] object-cover transition-transform duration-600 group-hover:scale-[1.035]"
              />

            </div>

            <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-red-700">
              {secondaryStory.category}
            </span>

            <h2 className="font-serif text-[24px] md:text-[29px] lg:text-[32px] font-black leading-[1.02] mt-2 group-hover:underline">
              {secondaryStory.title}
            </h2>

            <p className="text-[11px] md:text-[12px] leading-[1.7] text-gray-600 mt-4">
              {secondaryStory.excerpt}
            </p>

            <div className="mt-5 pt-4 border-t border-gray-200 text-[9px] text-gray-500">
              By {secondaryStory.author} · {secondaryStory.time}
            </div>

          </article>

        </section>

        {/* =================================================
            MARKET / TECHNOLOGY NUMBERS
        ================================================= */}

        <section className="border-b border-black py-5">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">

            <div className="pr-4 md:border-r border-gray-200">
              <p className="text-[8px] uppercase tracking-wider text-gray-500">
                AI Infrastructure
              </p>

              <p className="font-serif text-[24px] font-bold mt-1">
                +27.4%
              </p>

              <span className="text-[9px] text-green-700">
                ▲ Global investment
              </span>
            </div>

            <div className="pl-4 md:pl-5 pr-4 md:border-r border-gray-200">
              <p className="text-[8px] uppercase tracking-wider text-gray-500">
                Cybersecurity
              </p>

              <p className="font-serif text-[24px] font-bold mt-1">
                $214B
              </p>

              <span className="text-[9px] text-gray-500">
                Market estimate
              </span>
            </div>

            <div className="mt-4 md:mt-0 pr-4 md:pl-5 md:border-r border-gray-200">
              <p className="text-[8px] uppercase tracking-wider text-gray-500">
                Semiconductor
              </p>

              <p className="font-serif text-[24px] font-bold mt-1">
                +18.2%
              </p>

              <span className="text-[9px] text-green-700">
                ▲ Annual growth
              </span>
            </div>

            <div className="mt-4 md:mt-0 pl-4 md:pl-5">
              <p className="text-[8px] uppercase tracking-wider text-gray-500">
                Robotics
              </p>

              <p className="font-serif text-[24px] font-bold mt-1">
                4.8M
              </p>

              <span className="text-[9px] text-gray-500">
                Units deployed
              </span>
            </div>

          </div>

        </section>

        {/* =================================================
            AI & MACHINE LEARNING
            2 COLUMN NEWS GRID
        ================================================= */}

        <section className="py-10" id="innovation">

          <SectionHeader title="AI & Machine Learning" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">

            {aiStories.map((story, index) => (
              <article
                key={`${story.id}-${index}`}
                className="group cursor-pointer"
              >

                <div className="relative overflow-hidden mb-4">

                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.035] ${
                      index === 0
                        ? "h-[300px] md:h-[390px]"
                        : "h-[240px] md:h-[300px]"
                    }`}
                  />

                  {index === 0 && (
                    <span className="absolute bottom-3 left-3 bg-black text-white px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  )}

                </div>

                <span className="text-[8px] uppercase tracking-[0.15em] text-red-700 font-bold">
                  AI & Machine Learning
                </span>

                <h3
                  className={`font-serif font-bold leading-[1.05] mt-1 group-hover:underline ${
                    index === 0
                      ? "text-[24px] md:text-[29px]"
                      : "text-[19px] md:text-[22px]"
                  }`}
                >
                  {story.title}
                </h3>

                <p className="text-[11px] md:text-[12px] leading-[1.65] text-gray-500 mt-2">
                  {story.excerpt}
                </p>

                <div className="flex items-center gap-1 text-[9px] text-gray-400 mt-3">
                  <Clock size={8} />
                  {story.time}
                </div>

              </article>
            ))}

          </div>

        </section>

        {/* =================================================
            CYBERSECURITY + ENERGY
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 border-t-2 border-black">

          <div
            id="cybersecurity"
            className="lg:pr-8 py-8 lg:border-r border-gray-300"
          >

            <SectionHeader title="Cybersecurity" />

            <div className="group overflow-hidden mb-5">

              <ImageWithFallback
                src={sectionImages.cybersecurity}
                alt="Cybersecurity technology"
                className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

            </div>

            <SmallStoryList stories={cyberStories} />

          </div>

          <div
            id="energy"
            className="lg:pl-8 py-8"
          >

            <SectionHeader title="Energy Technology" />

            <div className="group overflow-hidden mb-5">

              <ImageWithFallback
                src={sectionImages.energy}
                alt="Energy technology"
                className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

            </div>

            <SmallStoryList stories={energyStories} />

          </div>

        </section>

        {/* =================================================
            HEALTHCARE
        ================================================= */}

        <section
          className="py-9 border-t-2 border-black"
          id="healthcare"
        >

          <SectionHeader title="Healthcare & BioTech" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <article className="group">

              <div className="relative overflow-hidden">

                <ImageWithFallback
                  src={sectionImages.healthcare}
                  alt="Healthcare and biotechnology"
                  className="w-full h-[290px] md:h-[390px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-24">

                  <span className="text-[8px] uppercase tracking-[0.15em] text-white font-bold">
                    Healthcare Innovation
                  </span>

                  <h3 className="font-serif text-white text-[22px] md:text-[28px] font-bold leading-tight mt-1">
                    {healthcareStories[0].title}
                  </h3>

                </div>

              </div>

            </article>

            <div>

              <SmallStoryList stories={healthcareStories.slice(1)} />

              <div className="mt-6 bg-black text-white p-6">

                <span className="text-[8px] uppercase tracking-[0.15em] text-gray-400">
                  Market Insight
                </span>

                <p className="font-serif text-[19px] leading-tight mt-2">
                  Global healthcare AI market projected to reach $187B by
                  2030, growing at 37% CAGR.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            MANUFACTURING + SMART CITIES
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 border-t-2 border-black">

          <div
            id="manufacturing"
            className="py-8 lg:pr-8 lg:border-r border-gray-300"
          >

            <SectionHeader title="Manufacturing & Industry 4.0" />

            <div className="group overflow-hidden mb-5">

              <ImageWithFallback
                src={sectionImages.manufacturing}
                alt="Advanced manufacturing"
                className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

            </div>

            <SmallStoryList stories={manufacturingStories} />

          </div>

          <div
            id="smart-cities"
            className="py-8 lg:pl-8"
          >

            <SectionHeader title="Smart Cities" />

            <div className="group overflow-hidden mb-5">

              <ImageWithFallback
                src={sectionImages.smartCities}
                alt="Smart city technology"
                className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

            </div>

            <SmallStoryList stories={smartCityStories} />

          </div>

        </section>

        {/* =================================================
            SUPPLY CHAIN
        ================================================= */}

        <section
          className="py-9 border-t-2 border-black pb-14"
          id="supply-chain"
        >

          <SectionHeader title="Supply Chain & Logistics" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="group overflow-hidden">

              <ImageWithFallback
                src={sectionImages.supplyChain}
                alt="Supply chain and logistics"
                className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />

              <div className="border-x border-b border-gray-300 p-5">

                <span className="text-[8px] uppercase tracking-[0.15em] text-red-700 font-bold">
                  Logistics & Trade
                </span>

                <h3 className="font-serif text-[21px] md:text-[26px] font-bold leading-tight mt-1">
                  The global supply chain is being rebuilt around data,
                  automation and artificial intelligence.
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
