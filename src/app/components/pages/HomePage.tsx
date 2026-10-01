
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
import { articlePath } from "../../data/homepageArticleData";

/* =========================================================
   TYPES
========================================================= */

type NewsItem = {
  id: number;
  hot: boolean;
  title: string;
  publishedAt: string;
  image: string;
  link: string;
};

type MarketItem = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

type MarketSnapshot = {
  Indices: MarketItem[];
  Crypto: MarketItem[];
};

/* =========================================================
   GOOGLE ADSENSE
========================================================= */

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function PrideTimesAd() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense Error:", error);
    }
  }, []);

  return (
    <section
      aria-label="Advertisement"
      className="my-8 overflow-hidden border-y border-gray-100 bg-white py-4"
    >
      <div className="mb-2 text-center text-[8px] font-medium uppercase tracking-[0.2em] text-gray-400">
        Advertisement
      </div>

      <div className="mx-auto w-full max-w-5xl overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot="6033028012"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </section>
  );
}

/* =========================================================
   HERO / LEAD STORY
========================================================= */

const heroStory = {
  category: "ENERGY | GLOBAL MARKETS",
  title:
    "Middle East Supply Disruptions Put Global Energy Markets Under Pressure",
  excerpt:
    "Oil supply interruptions, tanker-route risks and volatile freight costs are reshaping the global energy outlook. The Pride Times report tracks demand forecasts, inventory drawdowns and the production losses behind the disruption.",
  image: HeroImg,
  link: "/markets",
};

const centerStories = [
  {
    id: 1,
    tag: "TECHNOLOGY | ENERGY",
    title:
      "AI Data-Centre Expansion Is Turning Secure Electricity Into a Strategic Constraint",
    excerpt:
      "Data-centre electricity demand is projected to approach 1,000 TWh by 2030, making secure power access and grid readiness central to the next phase of AI infrastructure.",
    publishedAt: "September 2026",
    image: LN4Img,
    link: "/technology",
  },
  {
    id: 2,
    tag: "SUPPLY CHAIN",
    title:
      "Global Supply Chains Reconfigure as Nearshoring and Geopolitical Risk Rise",
    excerpt:
      "Companies are balancing resilience against cost as tariffs, commodity prices and regional sourcing strategies reshape trade networks.",
    publishedAt: "September 2026",
    image: InsImg,
    link: "/supply-chain",
  },
];

const videoFeature = {
  title:
    "Autonomous Systems Move Into Mobility, Warehousing and Industrial Operations",
  image: HeroImg,
  link: "/innovation",
};

const latestNewsTabs = [
  "All",
  "Markets",
  "Technology",
  "Cybersecurity",
  "Energy",
  "Industries",
  "World",
];

/* =========================================================
   LATEST NEWS DATA
   Keep titles aligned with homepageArticleData.ts.
========================================================= */

const latestNewsData: Record<string, NewsItem[]> = {
  All: [
    {
      id: 1,
      hot: true,
      title:
        "Middle East Supply Disruptions Put Global Energy Markets Under Pressure",
      publishedAt: "September 2026",
      image: HeroImg,
      link: "/markets",
    },
    {
      id: 2,
      hot: true,
      title:
        "AI Data-Centre Expansion Is Turning Secure Electricity Into a Strategic Constraint",
      publishedAt: "September 2026",
      image: InsImg,
      link: "/technology",
    },
    {
      id: 3,
      hot: true,
      title:
        "Cybersecurity Teams Face a Shorter Window to Patch Critical Vulnerabilities",
      publishedAt: "September 2026",
      image: LN3Img,
      link: "/cybersecurity",
    },
    {
      id: 4,
      hot: false,
      title:
        "Global Supply Chains Reconfigure as Nearshoring and Geopolitical Risk Rise",
      publishedAt: "September 2026",
      image: LN4Img,
      link: "/supply-chain",
    },
    {
      id: 5,
      hot: false,
      title:
        "Healthcare Supply Chains Turn to AI for Forecasting and Resilience",
      publishedAt: "September 2026",
      image: EdipickImg,
      link: "/healthcare",
    },
  ],

  Markets: [
    {
      id: 1,
      hot: true,
      title:
        "Middle East Supply Disruptions Put Global Energy Markets Under Pressure",
      publishedAt: "September 2026",
      image: HeroImg,
      link: "/markets",
    },
    {
      id: 2,
      hot: false,
      title:
        "Central Banks Reassess Reserve Exposure as Gold Gains Strategic Attention",
      publishedAt: "September 2026",
      image: EdipickImg,
      link: "/markets",
    },
    {
      id: 3,
      hot: false,
      title:
        "Global Growth Outlook Faces Pressure From Energy Disruption and Fragmentation",
      publishedAt: "September 2026",
      image: LN3Img,
      link: "/world",
    },
  ],

  Technology: [
    {
      id: 1,
      hot: true,
      title:
        "AI Data-Centre Expansion Is Turning Secure Electricity Into a Strategic Constraint",
      publishedAt: "September 2026",
      image: InsImg,
      link: "/technology",
    },
    {
      id: 2,
      hot: false,
      title:
        "AI Moves From Assistive Tools to Autonomous Enterprise Workflows",
      publishedAt: "September 2026",
      image: LN4Img,
      link: "/technology",
    },
    {
      id: 3,
      hot: false,
      title:
        "U.S.–China AI Competition Expands From Models to Global Infrastructure",
      publishedAt: "September 2026",
      image: LN3Img,
      link: "/world",
    },
  ],

  Cybersecurity: [
    {
      id: 1,
      hot: true,
      title:
        "Cybersecurity Teams Face a Shorter Window to Patch Critical Vulnerabilities",
      publishedAt: "September 2026",
      image: EdipickImg,
      link: "/cybersecurity",
    },
    {
      id: 2,
      hot: false,
      title:
        "Cybersecurity Teams Face a Shorter Window to Patch Critical Vulnerabilities",
      publishedAt: "September 2026",
      image: LN3Img,
      link: "/cybersecurity",
    },
  ],

  Energy: [
    {
      id: 1,
      hot: true,
      title:
        "Middle East Supply Disruptions Put Global Energy Markets Under Pressure",
      publishedAt: "September 2026",
      image: HeroImg,
      link: "/energy",
    },
    {
      id: 2,
      hot: false,
      title:
        "AI Data-Centre Expansion Is Turning Secure Electricity Into a Strategic Constraint",
      publishedAt: "September 2026",
      image: InsImg,
      link: "/energy",
    },
    {
      id: 3,
      hot: false,
      title:
        "Smart-City Investment Converges Around AI, Grid Modernisation and Mobility",
      publishedAt: "September 2026",
      image: LN4Img,
      link: "/smart-cities",
    },
  ],

  Industries: [
    {
      id: 1,
      hot: false,
      title:
        "Healthcare Supply Chains Turn to AI for Forecasting and Resilience",
      publishedAt: "September 2026",
      image: EdipickImg,
      link: "/healthcare",
    },
    {
      id: 2,
      hot: false,
      title:
        "Manufacturers Accelerate Robotics and AI as Tariffs and Labour Costs Bite",
      publishedAt: "September 2026",
      image: LN4Img,
      link: "/manufacturing",
    },
    {
      id: 3,
      hot: false,
      title:
        "Smart-City Investment Converges Around AI, Grid Modernisation and Mobility",
      publishedAt: "September 2026",
      image: InsImg,
      link: "/smart-cities",
    },
    {
      id: 4,
      hot: false,
      title:
        "Global Supply Chains Reconfigure as Nearshoring and Geopolitical Risk Rise",
      publishedAt: "September 2026",
      image: LN3Img,
      link: "/supply-chain",
    },
  ],

  World: [
    {
      id: 1,
      hot: true,
      title:
        "Global Growth Outlook Faces Pressure From Energy Disruption and Fragmentation",
      publishedAt: "September 2026",
      image: HeroImg,
      link: "/world",
    },
    {
      id: 2,
      hot: false,
      title:
        "U.S.–China AI Competition Expands From Models to Global Infrastructure",
      publishedAt: "September 2026",
      image: LN3Img,
      link: "/world",
    },
    {
      id: 3,
      hot: false,
      title:
        "Central Banks Reassess Reserve Exposure as Gold Gains Strategic Attention",
      publishedAt: "September 2026",
      image: EdipickImg,
      link: "/markets",
    },
  ],
};

/* =========================================================
   EDITOR'S PICKS
========================================================= */

const editorsPicks = [
  {
    id: 1,
    category: "CYBERSECURITY",
    title:
      "Cybersecurity Teams Face a Shorter Window to Patch Critical Vulnerabilities",
    excerpt:
      "AI is accelerating the speed of cyber exploitation, putting critical infrastructure and industrial operators under pressure to shorten remediation cycles.",
    publishedAt: "September 2026",
    image: EdipickImg,
    link: "/cybersecurity",
  },
  {
    id: 2,
    category: "HEALTHCARE",
    title:
      "Healthcare Supply Chains Turn to AI for Forecasting and Resilience",
    excerpt:
      "Software-led systems and AI tools are improving inventory visibility, demand forecasting and supplier-risk management across healthcare.",
    publishedAt: "September 2026",
    image: LN3Img,
    link: "/healthcare",
  },
  {
    id: 3,
    category: "MANUFACTURING",
    title:
      "Manufacturers Accelerate Robotics and AI as Tariffs and Labour Costs Bite",
    excerpt:
      "Robotics, digital twins and domestic supplier partnerships are becoming part of the manufacturing response to labour, tariff and energy pressures.",
    publishedAt: "September 2026",
    image: Ln1Img,
    link: "/manufacturing",
  },
];

/* =========================================================
   MAGAZINE
========================================================= */

const magazinePreview = {
  title: "The 2026 Global Industry Outlook",
  subtitle:
    "Energy security, AI infrastructure, supply-chain resilience and the forces reshaping global business.",
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
      "AI infrastructure, accelerated computing and robotics — areas central to Nvidia's technology strategy.",
  },
  {
    rank: 2,
    name: "Satya Nadella",
    company: "Microsoft",
    sector:
      "Enterprise AI adoption and large-scale digital transformation across Microsoft's business ecosystem.",
  },
  {
    rank: 3,
    name: "Sundar Pichai",
    company: "Alphabet / Google",
    sector:
      "AI integration across search, cloud and emerging technology businesses at Alphabet.",
  },
  {
    rank: 4,
    name: "Elon Musk",
    company: "Tesla / SpaceX / X",
    sector:
      "Technology initiatives spanning energy, space, transportation and AI across Musk's companies.",
  },
  {
    rank: 5,
    name: "Sam Altman",
    company: "OpenAI",
    sector:
      "Development and deployment of frontier artificial intelligence through OpenAI's research and products.",
  },
  {
    rank: 6,
    name: "Andy Jassy",
    company: "Amazon",
    sector:
      "AWS and cloud infrastructure supporting the next generation of AI workloads.",
  },
  {
    rank: 7,
    name: "Lisa Su",
    company: "AMD",
    sector:
      "Competitive AI computing across CPUs and GPUs as AMD expands its role in the market.",
  },
  {
    rank: 8,
    name: "C.C. Wei",
    company: "TSMC",
    sector:
      "Advanced semiconductor manufacturing serving the global technology industry through TSMC.",
  },
  {
    rank: 9,
    name: "Alex Karp",
    company: "Palantir",
    sector:
      "Enterprise AI and data platforms serving commercial and government markets through Palantir.",
  },
  {
    rank: 10,
    name: "Mary Barra",
    company: "General Motors",
    sector:
      "Automotive transformation through electrification and technology at General Motors.",
  },
];

/* =========================================================
   SMALL COMPONENTS
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
      className={`inline-flex items-center gap-1 text-[10px] font-semibold tabular-nums ${
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

function SectionHeader({
  title,
  link,
  linkText = "View All",
}: {
  title: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-2.5">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-950">
        {title}
      </h2>

      {link && (
        <Link
          to={link}
          className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-red-600 transition-colors hover:text-red-800"
        >
          {linkText}
          <ArrowRight size={10} />
        </Link>
      )}
    </div>
  );
}

/* =========================================================
   IMAGE COMPONENT
========================================================= */

function StoryImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      className={`${className} object-cover`}
    />
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export function HomePage() {
  const [activeMarketTab, setActiveMarketTab] =
    useState<"Indices" | "Crypto">("Indices");

  const [activeNewsTab, setActiveNewsTab] = useState("All");

  const [marketSnapshotData, setMarketSnapshotData] =
    useState<MarketSnapshot>({
      Indices: [],
      Crypto: [],
    });

  const [marketLoading, setMarketLoading] = useState(true);

  /* =======================================================
     MARKET DATA
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const loadMarketData = async () => {
      try {
        setMarketLoading(true);

        const data = await getQuotes();

        if (!isMounted) return;

        const indices = Array.isArray(data?.indices)
          ? data.indices
          : [];

        const crypto = Array.isArray(data?.crypto)
          ? data.crypto
          : [];

        const formatMarketItems = (items: any[]): MarketItem[] =>
          items
            .filter((item) => item && item.name != null)
            .map((item) => ({
              symbol: String(item.name),
              value: item.value ?? "—",
              change: String(item.change ?? "—"),
              up: Boolean(item.up),
            }));

        setMarketSnapshotData({
          Indices: formatMarketItems(indices),
          Crypto: formatMarketItems(crypto),
        });
      } catch (error) {
        console.error("Market API Error:", error);

        if (isMounted) {
          setMarketSnapshotData({
            Indices: [],
            Crypto: [],
          });
        }
      } finally {
        if (isMounted) {
          setMarketLoading(false);
        }
      }
    };

    loadMarketData();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =======================================================
     SELECTED NEWS
  ======================================================= */

  const selectedNews =
    latestNewsData[activeNewsTab] || latestNewsData.All;

  const latestStories = selectedNews.slice(0, 5);

  /* =======================================================
     SIDEBAR NEWS
     Avoid repeating the main lead and featured stories.
  ======================================================= */

  const featuredTitles = new Set([
    heroStory.title,
    centerStories[0].title,
    centerStories[1].title,
    videoFeature.title,
  ]);

  const sidebarNews = Array.from(
    new Map(
      Object.values(latestNewsData)
        .flat()
        .map((item) => [item.title, item])
    ).values()
  )
    .filter((item) => !featuredTitles.has(item.title))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .slice(0, 5);

  const currentMarketItems =
    marketSnapshotData[activeMarketTab] || [];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 pt-4 md:pt-6">

          {/* =================================================
              TOP STORIES / NEWSROOM LEAD
          ================================================= */}

          <section className="mb-8 border-b border-gray-300 pb-8">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_1fr_0.85fr] lg:gap-6">

              {/* LEAD STORY */}

              <Link
                to={articlePath(heroStory.title)}
                aria-label={`Read: ${heroStory.title}`}
                className="group relative block min-h-[430px] overflow-hidden rounded-lg border border-gray-200 bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 lg:min-h-[500px]"
              >
                <StoryImage
                  src={heroStory.image}
                  alt={heroStory.title}
                  className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                <span className="absolute left-4 top-4 rounded-[2px] bg-red-600 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
                  {heroStory.category}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h1 className="font-serif text-2xl font-bold leading-[1.08] text-white md:text-[30px] lg:text-[34px]">
                    {heroStory.title}
                  </h1>

                  <p className="mt-3 line-clamp-3 text-[12px] leading-[1.65] text-gray-200 md:text-[13px]">
                    {heroStory.excerpt}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 border-b border-white/60 pb-1 text-[10px] font-bold uppercase tracking-wide text-white transition-colors group-hover:border-red-400 group-hover:text-red-300">
                    Read Full Story
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

              {/* MAJOR COVERAGE */}

              <div className="min-w-0">
                <div className="mb-4">
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-red-600">
                    {centerStories[0].tag}
                  </span>

                  <Link
                    to={articlePath(centerStories[0].title)}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-lg bg-gray-100">
                      <StoryImage
                        src={centerStories[0].image}
                        alt={centerStories[0].title}
                        className="h-[220px] w-full transition-transform duration-700 group-hover:scale-[1.03] md:h-[250px]"
                      />
                    </div>

                    <h2 className="mt-3 font-serif text-xl font-bold leading-[1.15] text-gray-950 transition-colors group-hover:text-red-600 md:text-2xl">
                      {centerStories[0].title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-[12px] leading-[1.65] text-gray-600">
                      {centerStories[0].excerpt}
                    </p>
                  </Link>
                </div>

                {/* SECOND MAJOR STORY */}

                <Link
                  to={articlePath(centerStories[1].title)}
                  className="group flex gap-3 border-t border-gray-200 pt-4"
                >
                  <div className="h-[75px] w-[105px] shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <StoryImage
                      src={centerStories[1].image}
                      alt={centerStories[1].title}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-red-600">
                      {centerStories[1].tag}
                    </span>

                    <h3 className="mt-1 line-clamp-2 text-[13px] font-bold leading-[1.4] text-gray-900 transition-colors group-hover:text-red-600">
                      {centerStories[1].title}
                    </h3>

                    <span className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock size={9} />
                      {centerStories[1].publishedAt}
                    </span>
                  </div>
                </Link>

                {/* MARKET SNAPSHOT */}

                <div className="mt-5 border-t border-gray-200 pt-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em]">
                      Market Snapshot
                    </h3>

                    <div className="flex gap-3">
                      {(["Indices", "Crypto"] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveMarketTab(tab)}
                          aria-pressed={activeMarketTab === tab}
                          className={`text-[9px] font-semibold uppercase tracking-wide transition-colors ${
                            activeMarketTab === tab
                              ? "text-red-600"
                              : "text-gray-400 hover:text-gray-700"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {marketLoading ? (
                      <div className="py-4 text-[10px] text-gray-400">
                        Loading market data...
                      </div>
                    ) : currentMarketItems.length > 0 ? (
                      currentMarketItems.slice(0, 4).map((market) => (
                        <div
                          key={market.symbol}
                          className="flex items-center justify-between gap-3 py-2"
                        >
                          <span className="text-[10px] font-semibold text-gray-800">
                            {market.symbol}
                          </span>

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] tabular-nums text-gray-500">
                              {market.value}
                            </span>

                            <ChangeChip
                              change={market.change}
                              up={market.up}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-4 text-[10px] text-gray-400">
                        Market data is currently unavailable.
                      </div>
                    )}
                  </div>

                  <Link
                    to="/markets"
                    className="mt-2 flex w-fit items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-red-600 transition-colors hover:text-red-800"
                  >
                    View All Markets
                    <ArrowRight size={9} />
                  </Link>
                </div>
              </div>

              {/* RIGHT NEWSROOM COLUMN */}

              <aside className="min-w-0">

                {/* VIDEO */}

                <div className="border-b border-gray-200 pb-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-serif text-lg font-bold">
                      Today's Videos
                    </h2>

                    <Link
                      to="/innovation"
                      className="rounded-full border border-gray-300 px-3 py-1 text-[9px] font-medium transition-colors hover:border-gray-500"
                    >
                      Explore More
                    </Link>
                  </div>

                  <Link
                    to={articlePath(videoFeature.title)}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-gray-100">
                      <StoryImage
                        src={videoFeature.image}
                        alt={videoFeature.title}
                        className="h-[175px] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-md">
                          <Play
                            size={16}
                            fill="black"
                            className="ml-0.5 text-black"
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-2.5 text-[13px] font-semibold leading-[1.45] text-gray-900 transition-colors group-hover:text-red-600">
                      {videoFeature.title}
                    </h3>
                  </Link>
                </div>

                {/* LATEST NEWS STREAM */}

                <div className="pt-5">
                  <div className="mb-1 flex items-center justify-between border-b border-gray-200 pb-2">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
                      Latest News
                    </h2>

                    <span className="text-[8px] uppercase tracking-wide text-gray-400">
                      Newsroom
                    </span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {sidebarNews.map((item) => (
                      <Link
                        key={item.id}
                        to={articlePath(item.title)}
                        className="group block py-3"
                      >
                        <div className="flex gap-3">
                          <span className="w-[45px] shrink-0 text-[9px] font-semibold text-red-600">
                            {item.publishedAt}
                          </span>

                          <span className="text-[11px] font-medium leading-[1.45] text-gray-800 transition-colors group-hover:text-red-600">
                            {item.title}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <PrideTimesAd />

          {/* =================================================
              LATEST BUSINESS NEWS
          ================================================= */}

          <section className="mb-10">
            <SectionHeader
              title="Latest Pride Times Report"
              link="/business-news"
            />

            {/* NEWSROOM FILTER */}

            <div className="no-scrollbar mb-1 flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3">
              {latestNewsTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveNewsTab(tab)}
                  aria-pressed={activeNewsTab === tab}
                  className={`whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                    activeNewsTab === tab
                      ? "text-red-600"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* CHRONOLOGICAL NEWS STREAM */}

            <div className="divide-y divide-gray-200">
              {latestStories.map((story) => (
                <Link
                  key={`${activeNewsTab}-${story.id}`}
                  to={articlePath(story.title)}
                  className="group grid grid-cols-[55px_95px_1fr] items-center gap-3 py-4 transition-colors hover:bg-gray-50/70 md:grid-cols-[65px_130px_1fr] md:gap-5"
                >
                  <div className="text-[9px] font-semibold tabular-nums text-gray-400">
                    {story.publishedAt}
                  </div>

                  <div className="h-[60px] overflow-hidden rounded-md bg-gray-100 md:h-[72px]">
                    <StoryImage
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`text-[8px] font-bold uppercase tracking-[0.14em] ${
                          story.hot ? "text-red-600" : "text-gray-400"
                        }`}
                      >
                        {story.hot ? "Breaking" : "Latest"}
                      </span>

                      <span className="text-[8px] text-gray-300">•</span>

                      <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                        {activeNewsTab === "All"
                          ? "Business"
                          : activeNewsTab}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold leading-[1.3] text-gray-900 transition-colors group-hover:text-red-600 md:text-lg">
                      {story.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <PrideTimesAd />

          {/* =================================================
              EDITORIAL PICKS + MAGAZINE
          ================================================= */}

          <section className="mb-12 grid grid-cols-1 gap-7 lg:grid-cols-[1.7fr_0.8fr]">

            {/* EDITOR'S PICKS */}

            <div>
              <SectionHeader
                title="The Pride Times: Editor's Briefing"
                link="/leadership"
              />

              <div className="divide-y divide-gray-200">
                {editorsPicks.map((pick) => (
                  <Link
                    key={pick.id}
                    to={articlePath(pick.title)}
                    className="group grid grid-cols-[120px_1fr] gap-4 py-4 sm:grid-cols-[155px_1fr]"
                  >
                    <div className="h-[80px] w-full overflow-hidden rounded-md bg-gray-100 sm:h-[100px]">
                      <StoryImage
                        src={pick.image}
                        alt={pick.title}
                        className="h-full w-full rounded-md transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-red-600">
                        {pick.category}
                      </span>

                      <h3 className="mt-1 font-serif text-base font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-600 md:text-lg">
                        {pick.title}
                      </h3>

                      <p className="mt-1 hidden line-clamp-2 text-[10px] leading-[1.6] text-gray-500 sm:block">
                        {pick.excerpt}
                      </p>

                      <span className="mt-1.5 flex items-center gap-1 text-[9px] text-gray-400">
                        <Clock size={8} />
                        {pick.publishedAt}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* MAGAZINE */}

            <div>
              <SectionHeader title="Magazine" link="/magazine" />

              <Link
                to="/magazine"
                className="group block overflow-hidden rounded-md bg-black"
              >
                <div className="overflow-hidden">
                  <StoryImage
                    src={magazinePreview.image}
                    alt={magazinePreview.title}
                    className="h-[210px] w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-gray-400">
                    Pride Times Magazine
                  </span>

                  <h3 className="mt-1 font-serif text-xl font-bold text-white">
                    {magazinePreview.title}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-[1.6] text-gray-400">
                    {magazinePreview.subtitle}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 border-b border-white/50 pb-1 text-[9px] font-bold uppercase tracking-wide text-white transition-colors group-hover:border-red-500 group-hover:text-red-300">
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
            <SectionHeader
              title="Industry Leaders Shaping the 2026 Transition"
              link="/billionaires"
              linkText="Full List"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {prideTimes30.map((leader) => (
                <div
                  key={leader.rank}
                  className="flex items-start gap-4 rounded-md border border-gray-200 p-4 transition-all duration-300 hover:border-gray-400 hover:shadow-sm"
                >
                  <span className="w-8 shrink-0 font-serif text-2xl font-bold tabular-nums text-gray-200">
                    {String(leader.rank).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-gray-900">
                      {leader.name}
                      <span className="font-normal text-gray-400">
                        {" "}· {leader.company}
                      </span>
                    </p>

                    <p className="mt-1 text-[10px] leading-[1.6] text-gray-500">
                      {leader.sector}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* =====================================================
          LOCAL PAGE UTILITIES
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
