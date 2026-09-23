import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  ArrowRight,
  Clock3,
  Play,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import HeroImg from "../../../imports/heroimage.png";
import InsImg from "../../../imports/Insightimage.png";
import LN3Img from "../../../imports/LN3image.png";
import LN4Img from "../../../imports/LN4image.png";
import EdipickImg from "../../../imports/Edipickimage.png";
import Pt30Img from "../../../imports/pt30image.png";
import Ln1Img from "../../../imports/Ln1.png";

import { getQuotes } from "../../../services/marketApi";
import { TimeAgo } from "../../utils/timeAgo";

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

const heroStory = {
  category: "TOP STORY",
  title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
  excerpt:
    "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and South Korea, expanding its already well-established relationship with China's Unitree.",
  image: HeroImg,
  link: "/technology",
};

const centerStories = [
  {
    id: 1,
    tag: "CYBERSECURITY",
    title:
      "PwC 2026 Global Digital Trust Insights: Enterprises Escalate Defense Spending",
    excerpt:
      "PwC's 2026 Global Digital Trust Insights survey reveals that cybersecurity has risen to the top tier of board-level concerns across major industries.",
    publishedAt: "2026-09-21T09:54:00Z",
    image: LN3Img,
    link: "/cybersecurity",
  },
  {
    id: 2,
    tag: "FINANCE",
    title: "U.S. Equity Markets Rally on Strong Manufacturing Data",
    excerpt:
      "U.S. equity markets extended a recovery rally into the first week of June, driven by stronger-than-expected domestic factory data.",
    publishedAt: "2026-09-21T09:19:00Z",
    image: InsImg,
    link: "/markets",
  },
];

const videoFeature = {
  title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
  image: HeroImg,
  link: "/technology",
};

const latestNewsTabs = [
  "All",
  "Markets",
  "Finance",
  "Business",
  "Technology",
  "Energy",
  "More",
];

const latestNewsData: Record<string, NewsItem[]> = {
  All: [
    {
      id: 1,
      hot: true,
      title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
      publishedAt: "2026-09-21T10:07:00Z",
      image: Ln1Img,
      link: "/technology",
    },
    {
      id: 2,
      hot: false,
      title: "U.S. Equity Markets Rally on Strong Manufacturing Data",
      publishedAt: "2026-09-21T09:44:00Z",
      image: HeroImg,
      link: "/markets",
    },
    {
      id: 3,
      hot: false,
      title: "PwC 2026 Global Digital Trust Insights: Enterprises Escalate Defense Spending",
      publishedAt: "2026-09-21T09:19:00Z",
      image: LN3Img,
      link: "/cybersecurity",
    },
    {
      id: 4,
      hot: false,
      title: "Data Centers and AI Workloads Force Energy Policy Reversals Globally",
      publishedAt: "2026-09-21T08:19:00Z",
      image: LN4Img,
      link: "/energy",
    },
    {
      id: 5,
      hot: true,
      title: "Alphabet Plans $80B AI Infrastructure Stock Offering as Hyperscaler Capex Tops $700B",
      publishedAt: "2026-09-21T10:19:00Z",
      image: Ln1Img,
      link: "/technology",
    },
  ],
  Markets: [
    { id: 1, hot: true, title: "S&P 500 Hits All-Time High as Markets Digest Fresh Data", publishedAt: "2026-09-21T10:09:00Z", image: HeroImg, link: "/markets" },
    { id: 2, hot: false, title: "Global Investors Reassess Risk Across Major Asset Classes", publishedAt: "2026-09-21T09:39:00Z", image: InsImg, link: "/markets" },
    { id: 3, hot: false, title: "Asian Markets Respond to New Manufacturing Signals", publishedAt: "2026-09-21T09:19:00Z", image: LN3Img, link: "/markets" },
    { id: 4, hot: false, title: "Digital Assets Continue to Attract Institutional Interest", publishedAt: "2026-09-21T08:19:00Z", image: LN4Img, link: "/markets" },
  ],
  Finance: [
    { id: 1, hot: true, title: "Global Markets Rally as Investors Digest Latest Economic Data", publishedAt: "2026-09-21T09:59:00Z", image: HeroImg, link: "/finance" },
    { id: 2, hot: false, title: "Central Banks Signal Cautious Approach to Interest Rates", publishedAt: "2026-09-21T09:34:00Z", image: InsImg, link: "/finance" },
    { id: 3, hot: false, title: "Banking Sector Posts Stronger Quarterly Results", publishedAt: "2026-09-21T08:19:00Z", image: LN3Img, link: "/finance" },
    { id: 4, hot: false, title: "Global Investors Increase Exposure to Emerging Markets", publishedAt: "2026-09-21T07:19:00Z", image: LN4Img, link: "/finance" },
  ],
  Business: [
    { id: 1, hot: true, title: "Technology Leaders Accelerate Global Expansion Plans", publishedAt: "2026-09-21T10:04:00Z", image: HeroImg, link: "/business-news" },
    { id: 2, hot: false, title: "Global Logistics Industry Enters a New Investment Cycle", publishedAt: "2026-09-21T09:19:00Z", image: InsImg, link: "/business-news" },
    { id: 3, hot: false, title: "Major Companies Increase Spending on AI Infrastructure", publishedAt: "2026-09-21T08:19:00Z", image: LN3Img, link: "/business-news" },
    { id: 4, hot: false, title: "Indian Businesses Expand Their Global Technology Footprint", publishedAt: "2026-09-21T07:19:00Z", image: LN4Img, link: "/business-news" },
  ],
  Technology: [
    { id: 1, hot: true, title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push", publishedAt: "2026-09-21T10:14:00Z", image: Ln1Img, link: "/technology" },
    { id: 2, hot: true, title: "Alphabet Plans $80B AI Infrastructure Stock Offering as Hyperscaler Capex Tops $700B", publishedAt: "2026-09-21T10:07:00Z", image: HeroImg, link: "/technology" },
    { id: 3, hot: false, title: "Intel Attempts Inference-Chip Comeback as AI Compute Wars Intensify", publishedAt: "2026-09-21T09:49:00Z", image: InsImg, link: "/technology" },
    { id: 4, hot: false, title: "SoftBank Bets Big on European Data Centers", publishedAt: "2026-09-21T09:19:00Z", image: LN3Img, link: "/technology" },
    { id: 5, hot: false, title: "Quantum Computing Startup Reaches New Qubit Milestone", publishedAt: "2026-09-21T08:19:00Z", image: LN4Img, link: "/technology" },
  ],
  Energy: [
    { id: 1, hot: true, title: "Data Centers and AI Workloads Force Energy Policy Reversals Globally", publishedAt: "2026-09-21T09:54:00Z", image: LN4Img, link: "/energy" },
    { id: 2, hot: false, title: "China's Dominant Position in Clean-Tech Supply Chains Creates New Risk Calculus", publishedAt: "2026-09-21T09:19:00Z", image: HeroImg, link: "/energy" },
    { id: 3, hot: false, title: "Energy Resiliency Becomes a Strategic Priority for Businesses", publishedAt: "2026-09-21T08:19:00Z", image: InsImg, link: "/energy" },
    { id: 4, hot: false, title: "Asia's LNG Demand Reshapes Global Energy Markets", publishedAt: "2026-09-21T07:19:00Z", image: LN3Img, link: "/energy" },
  ],
  More: [
    { id: 1, hot: false, title: "Healthcare Innovation Continues to Transform Patient Care", publishedAt: "2026-09-21T09:19:00Z", image: LN3Img, link: "/healthcare" },
    { id: 2, hot: false, title: "Smart Cities Move Toward More Connected Infrastructure", publishedAt: "2026-09-21T08:19:00Z", image: HeroImg, link: "/smart-cities" },
    { id: 3, hot: false, title: "Global Supply Chains Adapt to a Changing Business Environment", publishedAt: "2026-09-21T07:19:00Z", image: InsImg, link: "/supply-chain" },
    { id: 4, hot: false, title: "AI Governance Becomes a Major Corporate Priority", publishedAt: "2026-09-21T06:19:00Z", image: LN4Img, link: "/technology" },
  ],
};

const editorsPicks = [
  { id: 1, category: "LEADERSHIP", title: "The Intelligence Age: How CEOs Are Navigating Transformation", excerpt: "Leadership perspectives reveal how executives are approaching one of the most consequential technology transitions in modern business.", publishedAt: "2026-09-21T07:19:00Z", image: EdipickImg, link: "/leadership" },
  { id: 2, category: "TECHNOLOGY", title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push", excerpt: "AI infrastructure is expanding beyond traditional data centers as robotics becomes a growing part of the technology ecosystem.", publishedAt: "2026-09-21T10:07:00Z", image: Ln1Img, link: "/technology" },
  { id: 3, category: "FINANCE", title: "U.S. Equity Markets Rally on Strong Manufacturing Data", excerpt: "Stronger manufacturing activity provides fresh momentum for U.S. equity markets.", publishedAt: "2026-09-21T09:44:00Z", image: HeroImg, link: "/markets" },
];

const magazinePreview = {
  title: "The AI Revolution",
  subtitle: "Reshaping business, economies, technology, and the future of work.",
  image: Pt30Img,
};

const prideTimes30 = [
  { rank: 1, name: "Jensen Huang", company: "Nvidia", sector: "Defining the AI infrastructure era through accelerated computing and robotics." },
  { rank: 2, name: "Satya Nadella", company: "Microsoft", sector: "Leading enterprise AI adoption and large-scale digital transformation." },
  { rank: 3, name: "Sundar Pichai", company: "Alphabet / Google", sector: "Driving AI integration across search, cloud, and emerging technologies." },
  { rank: 4, name: "Elon Musk", company: "Tesla / SpaceX / X", sector: "Expanding technology initiatives across energy, space, transportation, and AI." },
  { rank: 5, name: "Sam Altman", company: "OpenAI", sector: "Shaping the development and deployment of frontier artificial intelligence." },
  { rank: 6, name: "Andy Jassy", company: "Amazon", sector: "Scaling AWS and cloud infrastructure for the next generation of AI workloads." },
  { rank: 7, name: "Lisa Su", company: "AMD", sector: "Expanding competitive AI computing capabilities across CPUs and GPUs." },
  { rank: 8, name: "C.C. Wei", company: "TSMC", sector: "Leading advanced semiconductor manufacturing for the global technology industry." },
  { rank: 9, name: "Alex Karp", company: "Palantir", sector: "Expanding enterprise AI and data platforms across commercial and government markets." },
  { rank: 10, name: "Mary Barra", company: "General Motors", sector: "Navigating the transformation of the automotive industry through electrification and technology." },
];

function ChangeChip({ change, up }: { change: string; up: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold tabular-nums ${up ? "text-emerald-700" : "text-red-700"}`}>
      {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {change}
    </span>
  );
}

function SectionHeading({ title, link, linkText = "View all" }: { title: string; link?: string; linkText?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between border-b-[3px] border-black pb-2">
      <h2 className="font-serif text-[17px] font-black uppercase tracking-[0.08em] text-black sm:text-[19px]">{title}</h2>
      {link && (
        <Link to={link} className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#b3161b] hover:underline">
          {linkText}<ArrowRight size={10} />
        </Link>
      )}
    </div>
  );
}

export function HomePage() {
  const [activeMarketTab, setActiveMarketTab] = useState<"Indices" | "Crypto">("Indices");
  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [marketSnapshotData, setMarketSnapshotData] = useState<Record<string, MarketItem[]>>({ Indices: [], Crypto: [] });

  useEffect(() => {
    let mounted = true;
    const loadMarketData = async () => {
      try {
        const data = await getQuotes();
        if (!mounted) return;
        setMarketSnapshotData({
          Indices: data.indices.map((item: any) => ({ symbol: item.name, value: item.value, change: item.change, up: item.up })),
          Crypto: data.crypto.map((item: any) => ({ symbol: item.name, value: item.value, change: item.change, up: item.up })),
        });
      } catch (error) {
        console.error("Market API Error:", error);
      }
    };
    loadMarketData();
    return () => { mounted = false; };
  }, []);

  const selectedNews = latestNewsData[activeNewsTab] || latestNewsData.All;
  const latestStories = useMemo(() => selectedNews.slice(0, 5), [selectedNews]);
  const markets = (marketSnapshotData[activeMarketTab] || []).slice(0, 5);

  return (
    <div className="editorial-page min-h-screen bg-[#f3f0e9] text-[#111] antialiased">
      <div className="mx-auto w-full max-w-[1480px] px-3 sm:px-6 lg:px-10">
        <main className="pb-20 pt-3 sm:pt-6">

          {/* Editorial identity strip */}
          <div className="mb-6 border-y border-black bg-black px-4 py-2.5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.2em]">
                <span className="text-[#d71920]">Global Edition</span>
                <span className="text-white/45">September 22, 2026</span>
              </div>
              <div className="flex items-center gap-4 text-[8px] uppercase tracking-[0.15em] text-white/60">
                <span>New York</span><span>London</span><span>Singapore</span><span>Mumbai</span>
              </div>
            </div>
          </div>

          {/* Hero editorial grid */}
          <section className="magazine-hero grid grid-cols-1 gap-0 border-y-[3px] border-black bg-white shadow-[0_16px_40px_rgba(30,24,18,0.08)] lg:grid-cols-[1.34fr_0.82fr_0.58fr]">
            <Link to={heroStory.link} className="group relative min-h-[470px] overflow-hidden border-b border-black lg:border-b-0 lg:border-r lg:min-h-[610px]">
              <ImageWithFallback src={heroStory.image} alt={heroStory.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/5" />
              <div className="absolute left-5 top-5 border border-white/50 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-white">{heroStory.category}</div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="mb-2 h-[2px] w-12 bg-[#d71920]" />
                <h1 className="max-w-3xl font-serif text-[30px] font-black leading-[0.98] tracking-[-0.02em] text-white sm:text-[39px] lg:text-[43px]">{heroStory.title}</h1>
                <p className="mt-4 max-w-2xl text-[11px] leading-[1.65] text-white/80 sm:text-[12px]">{heroStory.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-white/70 pb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">Read full story <ArrowRight size={11} /></span>
              </div>
            </Link>

            <div className="bg-white px-5 py-6 sm:px-7 sm:py-7">
              <Link to={centerStories[0].link} className="group block">
                <div className="relative overflow-hidden">
                  <ImageWithFallback src={centerStories[0].image} alt={centerStories[0].title} className="h-[235px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[275px] lg:h-[255px]" />
                  <span className="absolute left-3 top-3 bg-[#d71920] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.18em] text-white">{centerStories[0].tag}</span>
                </div>
                <h2 className="mt-4 font-serif text-[23px] font-black leading-[1.04] tracking-[-0.015em] group-hover:text-[#b3161b] sm:text-[26px]">{centerStories[0].title}</h2>
                <p className="mt-3 text-[11px] leading-[1.65] text-black/60">{centerStories[0].excerpt}</p>
              </Link>

              <Link to={centerStories[1].link} className="group mt-5 flex gap-3 border-t border-black/15 pt-4">
                <ImageWithFallback src={centerStories[1].image} alt={centerStories[1].title} className="h-[78px] w-[100px] shrink-0 object-cover" />
                <div>
                  <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#b3161b]">{centerStories[1].tag}</span>
                  <h3 className="mt-1 font-serif text-[14px] font-bold leading-[1.15] group-hover:text-[#b3161b]">{centerStories[1].title}</h3>
                  <span className="mt-2 flex items-center gap-1 text-[8px] text-black/45"><Clock3 size={9} /><TimeAgo iso={centerStories[1].publishedAt} /></span>
                </div>
              </Link>

              <div className="mt-6 border-t-2 border-black pt-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-[14px] font-black uppercase tracking-[0.08em]">Market Watch</h3>
                  <div className="flex gap-3">
                    {(["Indices", "Crypto"] as const).map((tab) => (
                      <button key={tab} type="button" onClick={() => setActiveMarketTab(tab)} className={`text-[8px] font-bold uppercase tracking-[0.12em] ${activeMarketTab === tab ? "text-[#b3161b]" : "text-black/35 hover:text-black"}`}>{tab}</button>
                    ))}
                  </div>
                </div>
                <div className="mt-2 divide-y divide-black/10">
                  {markets.length ? markets.map((market) => (
                    <div key={market.symbol} className="flex items-center justify-between py-2">
                      <span className="text-[9px] font-bold uppercase tracking-wide">{market.symbol}</span>
                      <span className="ml-auto mr-3 text-[9px] tabular-nums text-black/60">{market.value}</span>
                      <ChangeChip change={market.change} up={market.up} />
                    </div>
                  )) : <div className="py-3 text-[9px] text-black/40">Market data loading…</div>}
                </div>
                <Link to="/markets" className="mt-2 inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#b3161b]">Markets dashboard <ArrowRight size={9} /></Link>
              </div>
            </div>

            <aside className="border-t border-black bg-[#ebe7de] px-5 py-6 lg:border-l lg:border-t-0 sm:px-6">
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <h2 className="font-serif text-[17px] font-black">Global Briefing</h2>
                <span className="text-[7px] font-bold uppercase tracking-[0.16em] text-[#b3161b]">Live desk</span>
              </div>

              <div className="py-4">
                <Link to={videoFeature.link} className="group block">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback src={videoFeature.image} alt={videoFeature.title} className="h-[160px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"><Play size={14} fill="black" /></span>
                    </div>
                  </div>
                  <span className="mt-3 block text-[7px] font-bold uppercase tracking-[0.18em] text-[#b3161b]">Video briefing</span>
                  <h3 className="mt-1 font-serif text-[15px] font-bold leading-[1.15] group-hover:text-[#b3161b]">{videoFeature.title}</h3>
                </Link>
              </div>

              <div className="border-t border-black/20 pt-3">
                <h3 className="font-serif text-[14px] font-black uppercase tracking-[0.08em]">The Latest</h3>
                <div className="mt-1 divide-y divide-black/10">
                  {selectedNews.slice(0, 6).map((item, index) => (
                    <Link key={item.id} to={item.link} className="group flex gap-3 py-3">
                      <span className="w-5 shrink-0 font-serif text-[14px] font-bold text-black/20">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-black/40"><TimeAgo iso={item.publishedAt} /></span>
                        <h4 className="mt-1 text-[10px] font-semibold leading-[1.35] group-hover:text-[#b3161b]">{item.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </section>

          {/* Latest news / magazine rail */}
          <section className="mb-12">
            <SectionHeading title="World News Desk" />
            <div className="mb-6 flex gap-5 overflow-x-auto border-b border-black/15 pb-2 no-scrollbar">
              {latestNewsTabs.map((tab) => (
                <button key={tab} type="button" onClick={() => setActiveNewsTab(tab)} className={`whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.15em] ${activeNewsTab === tab ? "text-[#b3161b]" : "text-black/40 hover:text-black"}`}>{tab}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-0 border-y border-black/20 bg-white shadow-[0_10px_28px_rgba(30,24,18,0.05)] sm:grid-cols-2 lg:grid-cols-5">
              {latestStories.map((story, index) => (
                <Link key={story.id} to={story.link} className={`group border-b border-black/15 p-4 sm:border-r lg:border-b-0 ${index === latestStories.length - 1 ? "lg:border-r-0" : ""}`}>
                  <div className="relative overflow-hidden">
                    <ImageWithFallback src={story.image} alt={story.title} className="h-[145px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    <span className="absolute left-2 top-2 bg-black px-2 py-1 text-[7px] font-bold uppercase tracking-[0.15em] text-white">{story.hot ? "Breaking" : "Latest"}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-[15px] font-bold leading-[1.12] group-hover:text-[#b3161b]">{story.title}</h3>
                  <span className="mt-3 flex items-center gap-1 text-[8px] text-black/40"><Clock3 size={9} /><TimeAgo iso={story.publishedAt} /></span>
                </Link>
              ))}
            </div>
          </section>

          {/* Editor + magazine */}
          <section className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.7fr_0.8fr]">
            <div>
              <SectionHeading title="Editor's Picks" link="/leadership" />
              <div className="divide-y divide-black/15 bg-white px-4 sm:px-5">
                {editorsPicks.map((pick) => (
                  <Link key={pick.id} to={pick.link} className="group flex gap-4 py-4">
                    <ImageWithFallback src={pick.image} alt={pick.title} className="h-[95px] w-[125px] shrink-0 object-cover sm:h-[110px] sm:w-[175px]" />
                    <div className="min-w-0">
                      <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#b3161b]">{pick.category}</span>
                      <h3 className="mt-1 font-serif text-[18px] font-black leading-[1.08] group-hover:text-[#b3161b] sm:text-[21px]">{pick.title}</h3>
                      <p className="mt-2 hidden text-[10px] leading-[1.5] text-black/55 sm:block">{pick.excerpt}</p>
                      <span className="mt-2 flex items-center gap-1 text-[8px] text-black/40"><Clock3 size={9} /><TimeAgo iso={pick.publishedAt} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading title="Magazine" link="/magazine" />
              <Link to="/magazine" className="group block overflow-hidden bg-black text-white">
                <div className="relative">
                  <ImageWithFallback src={magazinePreview.image} alt={magazinePreview.title} className="h-[300px] w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.035]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="text-[7px] font-bold uppercase tracking-[0.22em] text-white/60">Pride Times Magazine</span>
                    <h3 className="mt-1 font-serif text-[25px] font-black leading-none">{magazinePreview.title}</h3>
                    <p className="mt-2 text-[10px] leading-[1.5] text-white/70">{magazinePreview.subtitle}</p>
                    <span className="mt-4 inline-flex items-center gap-1 border-b border-white/60 pb-1 text-[8px] font-bold uppercase tracking-[0.16em]">Read digital edition <ArrowRight size={10} /></span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Long-form leader index */}
          <section className="mb-12">
            <SectionHeading title="Pride Times 30 — Leaders to Watch in 2026" link="/billionaires" linkText="Full list" />
            <div className="grid grid-cols-1 border-y border-black/20 bg-white sm:grid-cols-2 lg:grid-cols-5">
              {prideTimes30.map((leader) => (
                <div key={leader.rank} className="group border-b border-black/15 p-4 sm:border-r lg:border-b-0">
                  <div className="flex items-start gap-3">
                    <span className="font-serif text-[26px] font-black leading-none text-black/15">{String(leader.rank).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-serif text-[14px] font-black leading-[1.1] group-hover:text-[#b3161b]">{leader.name}</h3>
                      <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.08em] text-black/45">{leader.company}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[9px] leading-[1.5] text-black/55">{leader.sector}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <style>{`
        :root { color-scheme: light; }
        html { scroll-behavior: smooth; background: #f3f0e9; }
        body { margin: 0; background: #f3f0e9; }
        .editorial-page { font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
        .editorial-page h1, .editorial-page h2, .editorial-page h3, .editorial-page h4 { text-wrap: balance; }
        .editorial-page a, .editorial-page button { transition: color 180ms ease, background-color 180ms ease, border-color 180ms ease, transform 180ms ease; }
        .editorial-page a:focus-visible, .editorial-page button:focus-visible { outline: 2px solid #b3161b; outline-offset: 3px; }
        .editorial-page button:active { transform: scale(.97); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ::selection { background: rgba(211, 25, 32, .16); color: inherit; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .editorial-page * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}
