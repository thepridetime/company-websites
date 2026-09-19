import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Clock,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Play,
} from "lucide-react";

import HeroImg from "../../../imports/heroimage.png";
import InsImg from "../../../imports/Insightimage.png";
import LN3Img from "../../../imports/LN3image.png";
import LN4Img from "../../../imports/LN4image.png";
import EdipickImg from "../../../imports/Edipickimage.png";
import Pt30Img from "../../../imports/pt30image.png";
import Ln1Img from "../../../imports/Ln1.png";

import { getQuotes } from "../../../services/marketApi";

/* =========================================================
   TYPES
========================================================= */

type NewsItem = {
  id: number;
  hot: boolean;
  title: string;
  time: string;
  image: string;
  link: string;
};

type MarketItem = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

/* =========================================================
   AD SPACE
========================================================= */

function AdSpace({
  title = "The Pride Times Premium",
}: {
  title?: string;
}) {
  return (
    <div
      className="
        w-full
        h-[92px]
        sm:h-[100px]
        md:h-[110px]
        bg-gradient-to-r
        from-[#071a2d]
        via-[#12384a]
        to-[#28586a]
        rounded-md
        flex
        items-center
        justify-center
        relative
        overflow-hidden
        my-8
      "
    >
      {/* Advertisement Label */}

      <span
        className="
          absolute
          top-1.5
          right-2
          text-[7px]
          sm:text-[8px]
          text-white/50
          uppercase
          tracking-wide
        "
      >
        Advertisement
      </span>

      {/* Ad Content */}

      <div className="text-center px-4">
        <span
          className="
            block
            text-[7px]
            sm:text-[8px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-sky-300
            mb-1
          "
        >
          Google Adsense
        </span>

        <h3
          className="
            text-[11px]
            sm:text-sm
            md:text-base
            font-semibold
            text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            text-[7px]
            sm:text-[8px]
            text-white/60
            mt-1
          "
        >
          728 × 90 • Leaderboard
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   HERO STORY
========================================================= */

const heroStory = {
  category: "TOP STORY",
  title:
    "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
  excerpt:
    "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and South Korea, expanding its already well-established relationship with China's Unitree.",
  image: HeroImg,
  link: "/technology",
};

/* =========================================================
   CENTER STORIES
========================================================= */

const centerStories = [
  {
    id: 1,
    tag: "CYBERSECURITY",
    title:
      "PwC 2026 Global Digital Trust Insights: Enterprises Escalate Defense Spending",
    excerpt:
      "PwC's 2026 Global Digital Trust Insights survey reveals that cybersecurity has risen to the top tier of board-level concerns across major industries.",
    time: "25 min ago",
    image: LN3Img,
    link: "/cybersecurity",
  },
  {
    id: 2,
    tag: "FINANCE",
    title:
      "U.S. Equity Markets Rally on Strong Manufacturing Data",
    excerpt:
      "U.S. equity markets extended a recovery rally into the first week of June, driven by stronger-than-expected domestic factory data.",
    time: "1 hr ago",
    image: InsImg,
    link: "/markets",
  },
];

/* =========================================================
   VIDEO FEATURE
========================================================= */

const videoFeature = {
  title:
    "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
  image: HeroImg,
  link: "/technology",
};

/* =========================================================
   LATEST NEWS TABS
========================================================= */

const latestNewsTabs = [
  "All",
  "Markets",
  "Finance",
  "Business",
  "Technology",
  "Energy",
  "More",
];

/* =========================================================
   LATEST NEWS DATA
========================================================= */

const latestNewsData: Record<string, NewsItem[]> = {
  All: [
    {
      id: 1,
      hot: true,
      title:
        "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
      time: "12 min ago",
      image: Ln1Img,
      link: "/technology",
    },
    {
      id: 2,
      hot: false,
      title:
        "U.S. Equity Markets Rally on Strong Manufacturing Data",
      time: "35 min ago",
      image: HeroImg,
      link: "/markets",
    },
    {
      id: 3,
      hot: false,
      title:
        "PwC 2026 Global Digital Trust Insights: Enterprises Escalate Defense Spending",
      time: "1 hr ago",
      image: LN3Img,
      link: "/cybersecurity",
    },
    {
      id: 4,
      hot: false,
      title:
        "Data Centers and AI Workloads Force Energy Policy Reversals Globally",
      time: "2 hr ago",
      image: LN4Img,
      link: "/energy",
    },
    {
      id: 5,
      hot: true,
      title:
        "Alphabet Plans $80B AI Infrastructure Stock Offering as Hyperscaler Capex Tops $700B",
      time: "Just now",
      image: Ln1Img,
      link: "/technology",
    },
  ],

  Markets: [
    {
      id: 1,
      hot: true,
      title:
        "S&P 500 Hits All-Time High as Markets Digest Fresh Data",
      time: "10 min ago",
      image: HeroImg,
      link: "/markets",
    },
    {
      id: 2,
      hot: false,
      title:
        "Global Investors Reassess Risk Across Major Asset Classes",
      time: "40 min ago",
      image: InsImg,
      link: "/markets",
    },
    {
      id: 3,
      hot: false,
      title:
        "Asian Markets Respond to New Manufacturing Signals",
      time: "1 hr ago",
      image: LN3Img,
      link: "/markets",
    },
    {
      id: 4,
      hot: false,
      title:
        "Digital Assets Continue to Attract Institutional Interest",
      time: "2 hr ago",
      image: LN4Img,
      link: "/markets",
    },
  ],

  Finance: [
    {
      id: 1,
      hot: true,
      title:
        "Global Markets Rally as Investors Digest Latest Economic Data",
      time: "20 min ago",
      image: HeroImg,
      link: "/finance",
    },
    {
      id: 2,
      hot: false,
      title:
        "Central Banks Signal Cautious Approach to Interest Rates",
      time: "45 min ago",
      image: InsImg,
      link: "/finance",
    },
    {
      id: 3,
      hot: false,
      title:
        "Banking Sector Posts Stronger Quarterly Results",
      time: "2 hr ago",
      image: LN3Img,
      link: "/finance",
    },
    {
      id: 4,
      hot: false,
      title:
        "Global Investors Increase Exposure to Emerging Markets",
      time: "3 hr ago",
      image: LN4Img,
      link: "/finance",
    },
  ],

  Business: [
    {
      id: 1,
      hot: true,
      title:
        "Technology Leaders Accelerate Global Expansion Plans",
      time: "15 min ago",
      image: HeroImg,
      link: "/business-news",
    },
    {
      id: 2,
      hot: false,
      title:
        "Global Logistics Industry Enters a New Investment Cycle",
      time: "1 hr ago",
      image: InsImg,
      link: "/business-news",
    },
    {
      id: 3,
      hot: false,
      title:
        "Major Companies Increase Spending on AI Infrastructure",
      time: "2 hr ago",
      image: LN3Img,
      link: "/business-news",
    },
    {
      id: 4,
      hot: false,
      title:
        "Indian Businesses Expand Their Global Technology Footprint",
      time: "3 hr ago",
      image: LN4Img,
      link: "/business-news",
    },
  ],

  Technology: [
    {
      id: 1,
      hot: true,
      title:
        "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
      time: "5 min ago",
      image: Ln1Img,
      link: "/technology",
    },
    {
      id: 2,
      hot: true,
      title:
        "Alphabet Plans $80B AI Infrastructure Stock Offering as Hyperscaler Capex Tops $700B",
      time: "12 min ago",
      image: HeroImg,
      link: "/technology",
    },
    {
      id: 3,
      hot: false,
      title:
        "Intel Attempts Inference-Chip Comeback as AI Compute Wars Intensify",
      time: "30 min ago",
      image: InsImg,
      link: "/technology",
    },
    {
      id: 4,
      hot: false,
      title:
        "SoftBank Bets Big on European Data Centers",
      time: "1 hr ago",
      image: LN3Img,
      link: "/technology",
    },
    {
      id: 5,
      hot: false,
      title:
        "Quantum Computing Startup Reaches New Qubit Milestone",
      time: "2 hr ago",
      image: LN4Img,
      link: "/technology",
    },
  ],

  Energy: [
    {
      id: 1,
      hot: true,
      title:
        "Data Centers and AI Workloads Force Energy Policy Reversals Globally",
      time: "25 min ago",
      image: LN4Img,
      link: "/energy",
    },
    {
      id: 2,
      hot: false,
      title:
        "China's Dominant Position in Clean-Tech Supply Chains Creates New Risk Calculus",
      time: "1 hr ago",
      image: HeroImg,
      link: "/energy",
    },
    {
      id: 3,
      hot: false,
      title:
        "Energy Resiliency Becomes a Strategic Priority for Businesses",
      time: "2 hr ago",
      image: InsImg,
      link: "/energy",
    },
    {
      id: 4,
      hot: false,
      title:
        "Asia's LNG Demand Reshapes Global Energy Markets",
      time: "3 hr ago",
      image: LN3Img,
      link: "/energy",
    },
  ],

  More: [
    {
      id: 1,
      hot: false,
      title:
        "Healthcare Innovation Continues to Transform Patient Care",
      time: "1 hr ago",
      image: LN3Img,
      link: "/healthcare",
    },
    {
      id: 2,
      hot: false,
      title:
        "Smart Cities Move Toward More Connected Infrastructure",
      time: "2 hr ago",
      image: HeroImg,
      link: "/smart-cities",
    },
    {
      id: 3,
      hot: false,
      title:
        "Global Supply Chains Adapt to a Changing Business Environment",
      time: "3 hr ago",
      image: InsImg,
      link: "/supply-chain",
    },
    {
      id: 4,
      hot: false,
      title:
        "AI Governance Becomes a Major Corporate Priority",
      time: "4 hr ago",
      image: LN4Img,
      link: "/technology",
    },
  ],
};

/* =========================================================
   EDITOR'S PICKS
========================================================= */

const editorsPicks = [
  {
    id: 1,
    category: "LEADERSHIP",
    title:
      "The Intelligence Age: How CEOs Are Navigating Transformation",
    excerpt:
      "Leadership perspectives reveal how executives are approaching one of the most consequential technology transitions in modern business.",
    time: "3 hr ago",
    image: EdipickImg,
    link: "/leadership",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title:
      "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "AI infrastructure is expanding beyond traditional data centers as robotics becomes a growing part of the technology ecosystem.",
    time: "12 min ago",
    image: Ln1Img,
    link: "/technology",
  },
  {
    id: 3,
    category: "FINANCE",
    title:
      "U.S. Equity Markets Rally on Strong Manufacturing Data",
    excerpt:
      "Stronger manufacturing activity provides fresh momentum for U.S. equity markets.",
    time: "35 min ago",
    image: HeroImg,
    link: "/markets",
  },
];

/* =========================================================
   MAGAZINE
========================================================= */

const magazinePreview = {
  title: "The AI Revolution",
  subtitle:
    "Reshaping business, economies, technology, and the future of work.",
  image: Pt30Img,
};

/* =========================================================
   PRIDE TIMES 30
========================================================= */

const prideTimes30 = [
  {
    rank: 1,
    name: "Jensen Huang",
    company: "Nvidia",
    sector:
      "Defining the AI infrastructure era through accelerated computing and robotics.",
  },
  {
    rank: 2,
    name: "Satya Nadella",
    company: "Microsoft",
    sector:
      "Leading enterprise AI adoption and large-scale digital transformation.",
  },
  {
    rank: 3,
    name: "Sundar Pichai",
    company: "Alphabet / Google",
    sector:
      "Driving AI integration across search, cloud, and emerging technologies.",
  },
  {
    rank: 4,
    name: "Elon Musk",
    company: "Tesla / SpaceX / X",
    sector:
      "Expanding technology initiatives across energy, space, transportation, and AI.",
  },
  {
    rank: 5,
    name: "Sam Altman",
    company: "OpenAI",
    sector:
      "Shaping the development and deployment of frontier artificial intelligence.",
  },
  {
    rank: 6,
    name: "Andy Jassy",
    company: "Amazon",
    sector:
      "Scaling AWS and cloud infrastructure for the next generation of AI workloads.",
  },
  {
    rank: 7,
    name: "Lisa Su",
    company: "AMD",
    sector:
      "Expanding competitive AI computing capabilities across CPUs and GPUs.",
  },
  {
    rank: 8,
    name: "C.C. Wei",
    company: "TSMC",
    sector:
      "Leading advanced semiconductor manufacturing for the global technology industry.",
  },
  {
    rank: 9,
    name: "Alex Karp",
    company: "Palantir",
    sector:
      "Expanding enterprise AI and data platforms across commercial and government markets.",
  },
  {
    rank: 10,
    name: "Mary Barra",
    company: "General Motors",
    sector:
      "Navigating the transformation of the automotive industry through electrification and technology.",
  },
];

/* =========================================================
   CHANGE CHIP
========================================================= */

function ChangeChip({
  change,
  up,
}: {
  change: string;
  up: boolean;
}) {
  return (
    <span
      className={`text-[10px] font-semibold tabular-nums flex items-center gap-1 ${
        up ? "text-green-600" : "text-red-600"
      }`}
    >
      {up ? (
        <TrendingUp size={10} strokeWidth={2.25} />
      ) : (
        <TrendingDown size={10} strokeWidth={2.25} />
      )}

      {change}
    </span>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export function HomePage() {
  const [activeMarketTab, setActiveMarketTab] =
    useState<"Indices" | "Crypto">("Indices");

  const [activeNewsTab, setActiveNewsTab] = useState("All");

  const [marketSnapshotData, setMarketSnapshotData] = useState<
    Record<string, MarketItem[]>
  >({
    Indices: [],
    Crypto: [],
  });

  /* =======================================================
     MARKET DATA
  ======================================================= */

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const data = await getQuotes();

        setMarketSnapshotData({
          Indices: data.indices.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: item.change,
            up: item.up,
          })),

          Crypto: data.crypto.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: item.change,
            up: item.up,
          })),
        });
      } catch (error) {
        console.error("Market API Error:", error);
      }
    };

    loadMarketData();
  }, []);

  /* =======================================================
     SELECTED NEWS
  ======================================================= */

  const selectedNews =
    latestNewsData[activeNewsTab] || latestNewsData.All;

  const latestStories = selectedNews.slice(0, 5);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <main className="pt-4 md:pt-6 pb-16">

          {/* =================================================
              TOP ADVERTISEMENT
          ================================================= */}

          <AdSpace title="The Pride Times Premium — Deep Analysis, Exclusive Access" />

          {/* =================================================
              HERO SECTION
          ================================================= */}

          <section
            className="
              grid
              grid-cols-1
              lg:grid-cols-[1.05fr_1.25fr_0.95fr]
              gap-5
              lg:gap-6
              pb-8
              mb-8
              border-b
              border-gray-300
            "
          >

            {/* =================================================
                TOP STORY
            ================================================= */}

            <Link
              to={heroStory.link}
              className="
                group
                relative
                block
                overflow-hidden
                rounded-lg
                border
                border-gray-200
                min-h-[430px]
                lg:min-h-[520px]
                bg-black
              "
            >
              <ImageWithFallback
                src={heroStory.image}
                alt={heroStory.title}
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-[1.04]
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/35
                  to-transparent
                "
              />

              <span
                className="
                  absolute
                  top-4
                  left-4
                  bg-red-600
                  text-white
                  px-3
                  py-1
                  text-[9px]
                  font-bold
                  tracking-[0.16em]
                  uppercase
                  rounded-[2px]
                "
              >
                {heroStory.category}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">

                <h1
                  className="
                    font-serif
                    text-2xl
                    md:text-[28px]
                    lg:text-[30px]
                    font-bold
                    leading-[1.1]
                    text-white
                  "
                >
                  {heroStory.title}
                </h1>

                <p
                  className="
                    text-[12px]
                    md:text-[13px]
                    text-gray-200
                    leading-[1.6]
                    mt-3
                    line-clamp-3
                  "
                >
                  {heroStory.excerpt}
                </p>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-[10px]
                    font-bold
                    text-white
                    uppercase
                    tracking-wide
                    mt-4
                    border-b
                    border-white/60
                    pb-1
                  "
                >
                  Read Full Story
                  <ArrowRight size={12} />
                </span>

              </div>
            </Link>

            {/* =================================================
                CENTER STORY
            ================================================= */}

            <div className="min-w-0">

              <Link
                to={centerStories[0].link}
                className="group block"
              >
                <div className="overflow-hidden rounded-lg">

                  <ImageWithFallback
                    src={centerStories[0].image}
                    alt={centerStories[0].title}
                    className="
                      w-full
                      h-[230px]
                      md:h-[280px]
                      lg:h-[300px]
                      object-cover
                      rounded-lg
                      transition-transform
                      duration-700
                      group-hover:scale-[1.03]
                    "
                  />

                </div>

                <span
                  className="
                    block
                    mt-4
                    text-[9px]
                    font-bold
                    text-red-600
                    uppercase
                    tracking-[0.15em]
                  "
                >
                  {centerStories[0].tag}
                </span>

                <h2
                  className="
                    font-serif
                    text-xl
                    md:text-2xl
                    font-bold
                    leading-[1.15]
                    mt-1.5
                    text-gray-950
                    group-hover:text-red-600
                    transition-colors
                  "
                >
                  {centerStories[0].title}
                </h2>

                <p
                  className="
                    text-[12px]
                    text-gray-600
                    mt-2
                    leading-[1.6]
                    line-clamp-3
                  "
                >
                  {centerStories[0].excerpt}
                </p>

              </Link>

              {/* RELATED STORY */}

              <Link
                to={centerStories[1].link}
                className="
                  group
                  flex
                  gap-3
                  mt-5
                  pt-4
                  border-t
                  border-gray-200
                "
              >

                <div
                  className="
                    shrink-0
                    w-[105px]
                    h-[75px]
                    overflow-hidden
                    rounded-md
                  "
                >
                  <ImageWithFallback
                    src={centerStories[1].image}
                    alt={centerStories[1].title}
                    className="
                      w-full
                      h-full
                      object-cover
                      rounded-md
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <span
                    className="
                      text-[9px]
                      font-bold
                      text-red-600
                      uppercase
                      tracking-[0.14em]
                    "
                  >
                    {centerStories[1].tag}
                  </span>

                  <h3
                    className="
                      text-[13px]
                      font-bold
                      leading-[1.35]
                      mt-1
                      text-gray-900
                      group-hover:text-red-600
                      transition-colors
                      line-clamp-2
                    "
                  >
                    {centerStories[1].title}
                  </h3>

                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      text-[10px]
                      text-gray-400
                      mt-2
                    "
                  >
                    <Clock size={9} />
                    {centerStories[1].time}
                  </span>

                </div>

              </Link>

              {/* MARKET SNAPSHOT */}

              <div className="mt-5 border-t border-gray-200 pt-4">

                <div className="flex items-center justify-between mb-2">

                  <h3
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                    "
                  >
                    Market Snapshot
                  </h3>

                  <div className="flex gap-3">

                    {(["Indices", "Crypto"] as const).map((tab) => (

                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveMarketTab(tab)}
                        className={`
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-wide
                          ${
                            activeMarketTab === tab
                              ? "text-red-600"
                              : "text-gray-400 hover:text-gray-700"
                          }
                        `}
                      >
                        {tab}
                      </button>

                    ))}

                  </div>

                </div>

                <div className="divide-y divide-gray-100">

                  {(marketSnapshotData[activeMarketTab] || [])
                    .slice(0, 4)
                    .map((market) => (

                      <div
                        key={market.symbol}
                        className="
                          py-2
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <span
                          className="
                            text-[10px]
                            font-semibold
                            text-gray-800
                          "
                        >
                          {market.symbol}
                        </span>

                        <div className="flex items-center gap-3">

                          <span
                            className="
                              text-[10px]
                              text-gray-500
                              tabular-nums
                            "
                          >
                            {market.value}
                          </span>

                          <ChangeChip
                            change={market.change}
                            up={market.up}
                          />

                        </div>

                      </div>

                    ))}

                </div>

                <Link
                  to="/markets"
                  className="
                    mt-2
                    text-[9px]
                    font-bold
                    text-red-600
                    flex
                    items-center
                    gap-1
                    uppercase
                    tracking-wide
                    w-fit
                  "
                >
                  View All Markets
                  <ArrowRight size={9} />
                </Link>

              </div>

            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <aside className="min-w-0">

              {/* TODAY'S VIDEOS */}

              <div className="pb-5 border-b border-gray-200">

                <div className="flex items-center justify-between mb-3">

                  <h2 className="font-serif text-lg font-bold">
                    Today's Videos
                  </h2>

                  <button
                    type="button"
                    className="
                      border
                      border-gray-300
                      rounded-full
                      px-3
                      py-1
                      text-[9px]
                      font-medium
                      hover:border-gray-500
                      transition-colors
                    "
                  >
                    Explore More
                  </button>

                </div>

                <Link
                  to={videoFeature.link}
                  className="group block"
                >

                  <div className="relative overflow-hidden rounded-lg">

                    <ImageWithFallback
                      src={videoFeature.image}
                      alt={videoFeature.title}
                      className="
                        w-full
                        h-[180px]
                        object-cover
                        rounded-lg
                        transition-transform
                        duration-700
                        group-hover:scale-[1.03]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-black/10
                        group-hover:bg-black/25
                        transition-colors
                      "
                    >

                      <div
                        className="
                          w-11
                          h-11
                          rounded-full
                          bg-white/95
                          flex
                          items-center
                          justify-center
                          shadow-md
                        "
                      >

                        <Play
                          size={16}
                          fill="black"
                          className="text-black ml-0.5"
                        />

                      </div>

                    </div>

                  </div>

                  <h3
                    className="
                      text-[13px]
                      font-semibold
                      leading-[1.4]
                      mt-2.5
                      text-gray-900
                      group-hover:text-red-600
                      transition-colors
                    "
                  >
                    {videoFeature.title}
                  </h3>

                </Link>

              </div>

              {/* LATEST */}

              <div className="pt-5">

                <h2
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-red-600
                    border-b
                    border-gray-200
                    pb-2
                    mb-1
                  "
                >
                  Latest
                </h2>

                <div className="divide-y divide-gray-100">

                  {selectedNews.slice(0, 5).map((item) => (

                    <Link
                      key={item.id}
                      to={item.link}
                      className="
                        group
                        block
                        py-3
                      "
                    >

                      <div className="flex gap-2">

                        <span
                          className="
                            shrink-0
                            text-[9px]
                            font-semibold
                            text-red-600
                            w-[42px]
                          "
                        >
                          {item.time}
                        </span>

                        <span
                          className="
                            text-[11px]
                            font-medium
                            leading-[1.4]
                            text-gray-800
                            group-hover:text-red-600
                            transition-colors
                          "
                        >
                          {item.title}
                        </span>

                      </div>

                    </Link>

                  ))}

                </div>

              </div>

            </aside>

          </section>

          {/* =================================================
              MORE STORIES
          ================================================= */}

          <section className="mb-10">

            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-3
                border-b-2
                border-black
                pb-2.5
                mb-5
              "
            >

              <h2
                className="
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                "
              >
                More Stories
              </h2>

              <div
                className="
                  flex
                  items-center
                  gap-5
                  overflow-x-auto
                  no-scrollbar
                "
              >

                {latestNewsTabs.map((tab) => (

                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveNewsTab(tab)}
                    className={`
                      text-[10px]
                      font-semibold
                      whitespace-nowrap
                      uppercase
                      tracking-wide
                      transition-colors
                      ${
                        activeNewsTab === tab
                          ? "text-red-600"
                          : "text-gray-400 hover:text-gray-700"
                      }
                    `}
                  >
                    {tab}
                  </button>

                ))}

              </div>

            </div>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-5
                gap-4
              "
            >

              {latestStories.map((story) => (

                <Link
                  key={story.id}
                  to={story.link}
                  className="
                    group
                    block
                    overflow-hidden
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    hover:border-gray-300
                    hover:shadow-sm
                    transition-all
                  "
                >

                  <div className="overflow-hidden">

                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="
                        w-full
                        h-[140px]
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.04]
                      "
                    />

                  </div>

                  <div className="px-3 py-3">

                    <span
                      className="
                        block
                        text-[8px]
                        font-bold
                        text-red-600
                        uppercase
                        tracking-[0.14em]
                        mb-1
                      "
                    >
                      {story.hot ? "Breaking" : "Latest"}
                    </span>

                    <h3
                      className="
                        text-[12px]
                        font-semibold
                        leading-[1.35]
                        text-gray-900
                        group-hover:text-red-600
                        transition-colors
                        line-clamp-3
                      "
                    >
                      {story.title}
                    </h3>

                    <span
                      className="
                        flex
                        items-center
                        gap-1
                        text-[9px]
                        text-gray-400
                        mt-2.5
                      "
                    >
                      <Clock size={9} />
                      {story.time}
                    </span>

                  </div>

                </Link>

              ))}

            </div>

          </section>

          {/* =================================================
              MID PAGE ADVERTISEMENT
          ================================================= */}

          <AdSpace title="Invest Smarter — The Pride Times Premium" />

          {/* =================================================
              EDITOR'S PICKS + MAGAZINE
          ================================================= */}

          <section
            className="
              grid
              grid-cols-1
              lg:grid-cols-[1.7fr_0.8fr]
              gap-7
              mb-12
            "
          >

            {/* EDITOR'S PICKS */}

            <div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b-2
                  border-black
                  pb-2.5
                  mb-4
                "
              >

                <h2
                  className="
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                  "
                >
                  Editor's Picks
                </h2>

                <Link
                  to="/leadership"
                  className="
                    text-[9px]
                    font-semibold
                    text-red-600
                    flex
                    items-center
                    gap-1
                  "
                >
                  View All
                  <ArrowRight size={9} />
                </Link>

              </div>

              <div className="divide-y divide-gray-200">

                {editorsPicks.map((pick) => (

                  <Link
                    key={pick.id}
                    to={pick.link}
                    className="
                      group
                      flex
                      gap-4
                      py-3.5
                    "
                  >

                    <div
                      className="
                        shrink-0
                        w-[120px]
                        sm:w-[155px]
                        h-[80px]
                        sm:h-[95px]
                        overflow-hidden
                        rounded-md
                      "
                    >

                      <ImageWithFallback
                        src={pick.image}
                        alt={pick.title}
                        className="
                          w-full
                          h-full
                          object-cover
                          rounded-md
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />

                    </div>

                    <div className="min-w-0">

                      <span
                        className="
                          text-[8px]
                          font-bold
                          text-red-600
                          uppercase
                          tracking-[0.14em]
                        "
                      >
                        {pick.category}
                      </span>

                      <h3
                        className="
                          font-serif
                          text-base
                          md:text-lg
                          font-bold
                          leading-[1.2]
                          mt-1
                          text-gray-900
                          group-hover:text-red-600
                          transition-colors
                        "
                      >
                        {pick.title}
                      </h3>

                      <p
                        className="
                          hidden
                          sm:block
                          text-[10px]
                          text-gray-500
                          leading-[1.5]
                          mt-1
                          line-clamp-2
                        "
                      >
                        {pick.excerpt}
                      </p>

                      <span
                        className="
                          flex
                          items-center
                          gap-1
                          text-[9px]
                          text-gray-400
                          mt-1.5
                        "
                      >
                        <Clock size={8} />
                        {pick.time}
                      </span>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

            {/* MAGAZINE */}

            <div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b-2
                  border-black
                  pb-2.5
                  mb-4
                "
              >

                <h2
                  className="
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                  "
                >
                  Magazine
                </h2>

                <Link
                  to="/magazine"
                  className="
                    text-[9px]
                    font-semibold
                    text-red-600
                  "
                >
                  View All
                </Link>

              </div>

              <Link
                to="/magazine"
                className="
                  group
                  block
                  overflow-hidden
                  rounded-md
                  bg-black
                "
              >

                <div className="overflow-hidden">

                  <ImageWithFallback
                    src={magazinePreview.image}
                    alt={magazinePreview.title}
                    className="
                      w-full
                      h-[210px]
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-[1.04]
                    "
                  />

                </div>

                <div className="p-4">

                  <span
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-gray-500
                    "
                  >
                    Pride Times Magazine
                  </span>

                  <h3
                    className="
                      font-serif
                      text-xl
                      font-bold
                      text-white
                      mt-1
                    "
                  >
                    {magazinePreview.title}
                  </h3>

                  <p
                    className="
                      text-[11px]
                      text-gray-400
                      leading-[1.5]
                      mt-1.5
                    "
                  >
                    {magazinePreview.subtitle}
                  </p>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-white
                      border-b
                      border-white/50
                      pb-1
                      mt-4
                    "
                  >
                    Read Digital Edition
                    <ArrowRight size={10} />
                  </span>

                </div>

              </Link>

            </div>

          </section>

          {/* =================================================
              PRIDE TIMES 30
          ================================================= */}

          <section>

            <div
              className="
                flex
                items-center
                justify-between
                border-b-2
                border-black
                pb-2.5
                mb-5
              "
            >

              <h2
                className="
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                "
              >
                Pride Times 30 — Leaders to Watch in 2026
              </h2>

              <Link
                to="/billionaires"
                className="
                  text-[9px]
                  font-semibold
                  text-red-600
                  flex
                  items-center
                  gap-1
                "
              >
                Full List
                <ArrowRight size={9} />
              </Link>

            </div>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-3
              "
            >

              {prideTimes30.map((leader) => (

                <div
                  key={leader.rank}
                  className="
                    flex
                    items-start
                    gap-4
                    p-4
                    border
                    border-gray-200
                    rounded-md
                    hover:border-gray-300
                    transition-colors
                  "
                >

                  <span
                    className="
                      font-serif
                      text-2xl
                      font-bold
                      text-gray-200
                      tabular-nums
                      shrink-0
                      w-8
                    "
                  >
                    {String(leader.rank).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">

                    <p
                      className="
                        text-[13px]
                        font-bold
                        text-gray-900
                      "
                    >
                      {leader.name}

                      <span className="font-normal text-gray-400">
                        {" "}
                        · {leader.company}
                      </span>
                    </p>

                    <p
                      className="
                        text-[10px]
                        text-gray-500
                        leading-[1.5]
                        mt-1
                      "
                    >
                      {leader.sector}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* =================================================
              BOTTOM PREMIUM ADVERTISEMENT
          ================================================= */}

          <AdSpace title="The Pride Times Premium — Deep Analysis, Exclusive Access" />

        </main>
      </div>

      {/* =====================================================
          GLOBAL STYLES
      ===================================================== */}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: rgba(227, 27, 35, 0.12);
          color: inherit;
        }
      `}</style>

    </div>
  );
}
