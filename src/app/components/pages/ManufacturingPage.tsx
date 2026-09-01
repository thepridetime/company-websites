
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, Factory, TrendingUp, Cpu, Car, Plane } from "lucide-react";

import Manu1Img from "../../../imports/Manu1.png";
import Manu2Img from "../../../imports/Manu2.png";
import Manu3Img from "../../../imports/Manu3.png";

interface Story {
  id: number;
  title: string;
  time: string;
}

interface HeroStory {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  time: string;
  image: string;
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-5">
      <div className="flex items-center gap-2">
        {icon && <span className="text-red-600">{icon}</span>}

        <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.12em] text-gray-900">
          {title}
        </h2>
      </div>

      <span className="hidden sm:block text-[10px] uppercase tracking-widest text-gray-400">
        The Pride Times
      </span>
    </div>
  );
}

/* =========================================================
   DATA
========================================================= */

const hero: HeroStory = {
  category: "INDUSTRY 4.0",
  title:
    "ISM Manufacturing Index Hits 54 in May — Strongest Reading in 14 Months",
  excerpt:
    "The Institute for Supply Management's Manufacturing Index reached 54 in May 2026, beating the consensus Dow Jones forecast of 53.2 and rising 1.3 points from April. The reading confirms that U.S. factory activity is accelerating into the second quarter of 2026 on the back of strong new orders and improved employment conditions. New orders surged 2.7 points to 56.8, while imports rose a corresponding 2.7 points to 53, signaling both domestic demand strength and a willingness among manufacturers to restock inventories.",
  author: "Sagar Kumar",
  time: "1 June 2026",
  image: Manu1Img,
};

const hero1: HeroStory = {
  category: "INDUSTRY 4.0",
  title:
    "Autodesk to Acquire MaintainX, Advancing Unified Operations Platform",
  excerpt:
    "Autodesk has announced the acquisition of MaintainX, a leading computerized maintenance management system platform, in a move that advances the design software giant's push toward a unified platform connecting design, construction, and operations workflows. The deal reflects growing demand from industrial manufacturers for software that integrates asset maintenance intelligence with the design and build data that modern factories generate throughout the product lifecycle.",
  author: "Sagar Kumar",
  time: "28 May 2026",
  image: Manu2Img,
};

const hero2: HeroStory = {
  category: "INDUSTRY 4.0",
  title: "Robotics and Automation Reshaping Factory Floor Economics",
  excerpt:
    "The integration of AI-powered robotics onto factory floors is accelerating faster than many manufacturers anticipated at the start of the decade. Collaborative robots are becoming economically viable for tasks that previously required human dexterity, including wire harness assembly, small-component placement, and quality inspection. Software improvements, sensor cost reductions, and industrial AI models are reducing the ROI threshold for robotic deployment.",
  author: "Sagar Kumar",
  time: "June 2026",
  image: Manu3Img,
};

const autoStories: Story[] = [
  {
    id: 1,
    title:
      "Manufacturing executives say Iran conflict and Middle East tensions are inflating supply-chain costs across transportation-equipment networks.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "GM supplier Dauch workers ratify a contract while 5,000 Lockheed Martin IAM employees approve a new labor deal.",
    time: "Just now",
  },
  {
    id: 3,
    title:
      "Major food processor plans at least 2,000 layoffs as it closes a Pennsylvania beef plant and restructures operations.",
    time: "Just now",
  },
  {
    id: 4,
    title:
      "Toyota Launches All-Solid-State Battery EV — 800-Mile Range, 10-Minute Charge at $35,000 Price Point",
    time: "1 hr ago",
  },
  {
    id: 5,
    title:
      "Volkswagen's Wolfsburg Plant Becomes World's First Carbon-Neutral Auto Factory",
    time: "3 hrs ago",
  },
  {
    id: 6,
    title:
      "Tesla Cybertruck 2.0 with 750-Mile Range Begins Production at Gigafactory Texas",
    time: "5 hrs ago",
  },
  {
    id: 7,
    title:
      "Tata Motors Claims Top Spot in Indian EV Market with 38% Share",
    time: "7 hrs ago",
  },
];

const roboticsStories: Story[] = [
  {
    id: 1,
    title:
      "Neura raises capital to scale humanoid and industrial robot manufacturing, deployment, and training infrastructure.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Boston Dynamics Humanoid Atlas Now Assembles Complex Electronics at Honda Plant",
    time: "2 hrs ago",
  },
  {
    id: 3,
    title:
      "Foxconn Replaces 200,000 Workers with AI-Guided Robotic Arms in 18 Months",
    time: "4 hrs ago",
  },
  {
    id: 4,
    title:
      "ABB's New Collaborative Robot Wins Safety Certification for Human-Facing Assembly Lines",
    time: "6 hrs ago",
  },
  {
    id: 5,
    title:
      "Amazon's Manufacturing Robotics Division Files 400+ Patents in a Single Quarter",
    time: "8 hrs ago",
  },
];

const aeroDefense: Story[] = [
  {
    id: 1,
    title:
      "Airbus A321neo Backlog Hits 3,800 Units — Production Ramp-Up Challenges Supply Chain",
    time: "3 hrs ago",
  },
  {
    id: 2,
    title:
      "SpaceX's Starship Manufacturing Factory Achieves 10x Lower Cost Per Ton of Payload",
    time: "5 hrs ago",
  },
  {
    id: 3,
    title:
      "India's HAL Tejas MkII Fighter Production Order Worth $9.4B Signed",
    time: "7 hrs ago",
  },
  {
    id: 4,
    title:
      "Defense contractor Rheinmetall invests $41M across six U.S. manufacturing facilities to expand capacity and strengthen supply-chain resilience.",
    time: "Just now",
  },
];

const semiconductors: Story[] = [
  {
    id: 1,
    title:
      "U.S. manufacturing commitments hit $1.765T through June, led by Apple, Micron, IBM, and TSMC as AI infrastructure capex accelerates.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "CHIPS Act awards Powerex a Pennsylvania plant expansion and signals federal support for Coherent's Texas facility funding.",
    time: "Just now",
  },
  {
    id: 3,
    title:
      "TSMC's Arizona Fab Begins 2nm Production — First Advanced Chip Made Outside Taiwan",
    time: "1 hr ago",
  },
  {
    id: 4,
    title:
      "Samsung Announces $45B Investment to Build Next-Gen Memory Fab in Texas",
    time: "4 hrs ago",
  },
  {
    id: 5,
    title:
      "Intel's Foundry Business Wins $10B US Military Chip Contract",
    time: "6 hrs ago",
  },
  {
    id: 6,
    title:
      "Global Chip Shortage Officially Over as Supply Glut Now Developing — Prices Fall 40%",
    time: "8 hrs ago",
  },
];

const mfgIndex = [
  {
    country: "USA",
    label: "ISM Manufacturing PMI",
    value: "54.2",
    status: "Expanding",
  },
  {
    country: "Germany",
    label: "Manufacturing PMI",
    value: "52.4",
    status: "Expanding",
  },
  {
    country: "China",
    label: "Caixin PMI",
    value: "51.8",
    status: "Expanding",
  },
  {
    country: "India",
    label: "Manufacturing PMI",
    value: "58.9",
    status: "Strong Growth",
  },
  {
    country: "Japan",
    label: "Manufacturing PMI",
    value: "49.7",
    status: "Contracting",
  },
  {
    country: "UK",
    label: "Manufacturing PMI",
    value: "50.3",
    status: "Flat",
  },
];

/* =========================================================
   STORY CARD
========================================================= */

function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group py-3 border-b border-gray-200 last:border-b-0 cursor-pointer">
      <h3 className="text-sm md:text-[15px] leading-snug font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-200">
        {story.title}
      </h3>

      <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-400">
        <Clock size={11} />
        <span>{story.time}</span>
      </div>
    </article>
  );
}

/* =========================================================
   HERO STORY
========================================================= */

function HeroStoryCard({
  story,
  large = false,
}: {
  story: HeroStory;
  large?: boolean;
}) {
  return (
    <article className="group cursor-pointer">
      <div
        className={`relative overflow-hidden bg-gray-100 rounded-sm ${
          large ? "h-72 md:h-[430px]" : "h-64 md:h-80"
        }`}
      >
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute left-4 bottom-4">
          <span className="inline-block bg-red-600 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">
            {story.category}
          </span>
        </div>
      </div>

      <div className="pt-4">
        <h2
          className={`font-serif font-bold leading-tight text-gray-950 group-hover:text-red-600 transition-colors ${
            large
              ? "text-2xl md:text-4xl"
              : "text-xl md:text-2xl"
          }`}
        >
          {story.title}
        </h2>

        <p className="mt-3 text-sm md:text-[15px] leading-7 text-gray-600">
          {story.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-gray-200 text-[11px] text-gray-400 uppercase tracking-wide">
          <span>By {story.author}</span>

          <span className="flex items-center gap-1">
            <Clock size={11} />
            {story.time}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   PMI PANEL
========================================================= */

function ManufacturingPMI() {
  return (
    <aside className="border border-gray-200 bg-gray-50 p-5 h-fit">
      <div className="flex items-center gap-2 border-b border-gray-300 pb-3 mb-2">
        <TrendingUp size={16} className="text-red-600" />

        <h2 className="text-xs font-bold uppercase tracking-[0.15em]">
          Manufacturing PMI
        </h2>
      </div>

      <div>
        {mfgIndex.map((item) => {
          const numericValue = Number(item.value);
          const positive = numericValue >= 50;

          return (
            <div
              key={`${item.country}-${item.value}`}
              className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
            >
              <div className="pr-3">
                <p className="text-sm font-semibold text-gray-900">
                  {item.country}
                </p>

                <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">
                  {item.label}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="font-mono text-sm font-bold">
                  {item.value}
                </p>

                <p
                  className={`text-[10px] font-semibold uppercase ${
                    positive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.status}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] leading-5 text-gray-400 mt-3">
        PMI above 50 indicates expansion. Data referenced: May 2026.
      </p>
    </aside>
  );
}

/* =========================================================
   QUOTE BLOCK
========================================================= */

function IndustryQuote() {
  return (
    <div className="border-y-2 border-gray-900 py-5 my-2">
      <div className="flex gap-4">
        <div className="w-1 bg-red-600 shrink-0" />

        <div>
          <p className="font-serif italic text-lg md:text-xl leading-relaxed text-gray-800">
            "Last year was about managing disruptions. Right now, it's about redesigning your global network."
          </p>

          <p className="mt-3 text-xs md:text-sm font-bold uppercase tracking-wide text-gray-700">
            — Abe Eshkenazi, CEO, Association for Supply Chain Management
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INDUSTRY STATISTICS
========================================================= */

function IndustryStatistics() {
  return (
    <section>
      <SectionHeader title="Industry Statistics" icon={<Factory size={16} />} />

      <div className="overflow-x-auto border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <td className="w-1/3 bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                ISM Manufacturing Index
              </td>
              <td className="border-b border-gray-300 p-3">
                54.0 — above consensus of 53.2
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                New Orders Sub-Index
              </td>
              <td className="border-b border-gray-300 p-3">
                56.8 — up 2.7 points from April
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                Manufacturing M&A
              </td>
              <td className="border-b border-gray-300 p-3">
                11 megadeals in 2025 — ranked 3rd globally
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                AI in Manufacturing Deals
              </td>
              <td className="border-b border-gray-300 p-3">
                Among the most frequently cited technologies
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-r border-gray-300 p-3 font-bold">
                Cobot ROI Threshold
              </td>
              <td className="p-3">
                Reduced from roughly 4 years in 2020 to about 18 months in 2026
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function ManufacturingPage() {
  return (
    <div className="w-full bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
              <Factory size={19} />
            </div>

            <div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Industry & Production
              </p>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-none mt-1">
                Manufacturing & Industry
              </h1>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-400">
            <span>Industry 4.0 · Automation · Manufacturing</span>
            <span className="hidden md:block">The Pride Times</span>
          </div>
        </header>

        {/* =================================================
            TOP HERO + PMI
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <HeroStoryCard story={hero} large />
          </div>

          <ManufacturingPMI />
        </section>

        {/* =================================================
            QUOTE
        ================================================= */}

        <IndustryQuote />

        {/* =================================================
            FEATURE STORY
        ================================================= */}

        <section className="mt-12 mb-12">
          <HeroStoryCard story={hero1} large />
        </section>

        {/* =================================================
            SECONDARY STORY
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <HeroStoryCard story={hero2} />

          <IndustryStatistics />
        </section>

        {/* =================================================
            AUTOMOTIVE + ROBOTICS
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t-2 border-black pt-8 mb-12">
          <div>
            <SectionHeader
              title="Automotive & EV"
              icon={<Car size={16} />}
            />

            <div>
              {autoStories.map((story) => (
                <StoryCard
                  key={`auto-${story.id}`}
                  story={story}
                />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              title="Robotics & Automation"
              icon={<Cpu size={16} />}
            />

            <div>
              {roboticsStories.map((story) => (
                <StoryCard
                  key={`robotics-${story.id}`}
                  story={story}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            SEMICONDUCTORS + AEROSPACE
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t-2 border-black pt-8">
          <div>
            <SectionHeader
              title="Semiconductors & Electronics"
              icon={<Cpu size={16} />}
            />

            <div>
              {semiconductors.map((story) => (
                <StoryCard
                  key={`semi-${story.id}`}
                  story={story}
                />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              title="Aerospace & Defense"
              icon={<Plane size={16} />}
            />

            <div>
              {aeroDefense.map((story) => (
                <StoryCard
                  key={`aero-${story.id}`}
                  story={story}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            BOTTOM EDITORIAL BAR
        ================================================= */}

        <div className="mt-12 pt-4 border-t border-gray-300 flex flex-col sm:flex-row justify-between gap-2 text-[10px] uppercase tracking-widest text-gray-400">
          <span>Manufacturing & Industry</span>
          <span>Industry 4.0 · Automation · Supply Chain</span>
        </div>
      </div>
    </div>
  );
}

