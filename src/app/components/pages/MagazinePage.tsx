import { ImageWithFallback } from "../figma/ImageWithFallback";
import { BookOpen, Download, Crown, ChevronRight, Play, User } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import AxisImg from "../../../imports/Axis03.png";
import ErikaImg from "../../../imports/Erika.png";
import ErikaImg1 from "../../../imports/Erika01.png";
import ErikaImg2 from "../../../imports/Erika02.png";
import EyeslImg1 from "../../../imports/Eyesl01.png";
import EyeslImg2 from "../../../imports/Eyesl02.png";
import EddieImg from "../../../imports/Eddie.png";
import TribeImg from "../../../imports/TribePay.png";
import TribePayImg from "../../../imports/TribePay04.png";

/* Section header — hairline rule + uppercase eyebrow, consistent site-wide */
function SH({ title, icon: Icon }: { title: string; icon?: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-5">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className="text-gray-400" />}
        <h2 className="font-serif text-2xl leading-snug">{title}</h2>
      </div>
      <span className="hidden sm:block w-6 h-[2px] bg-red-600" />
    </div>
  );
}

/* Your existing article data */
const Articles = [
  {
    id: 1,
    month: "March 4, 2026",
    headline: "India Rising: The New Superpower Transforming Global Business",
    image: AxisImg,
    premium: false,
    category: "Economy",
    author: "The Pride Times Team",
    readTime: "5 min read",
    content: `
      India is rapidly emerging as one of the world's most influential economies...

      The country's digital infrastructure has expanded dramatically...

      Experts believe India could become a $10 trillion economy...
    `
  },
  {
    id: 2,
    month: "February 28, 2026",
    headline: "Healthcare 2030: The Biotech Revolution Saving Millions of Lives",
    image: ErikaImg,
    images: [ErikaImg, ErikaImg1, ErikaImg2],
    premium: false,
    category: "Healthcare",
    author: "Sarah Johnson",
    readTime: "6 min read",
    content: `
      Biotechnology is changing modern medicine...

      Gene editing technologies are becoming mainstream...
    `
  },
  {
    id: 3,
    month: "March 3, 2026",
    headline: "The Electric Future: How EVs Are Rewriting the Rules of Mobility",
    image: EyeslImg1,
    images: [EyeslImg1, EyeslImg2],
    premium: false,
    category: "Manufacturing",
    author: "The Pride Times Team",
    readTime: "4 min read",
  },
  {
    id: 4,
    month: "March 4, 2026",
    headline: "Person of the Year: The Leaders Who Shaped 2025",
    image: EddieImg,
    images: [EddieImg, TribeImg, TribePayImg],
    premium: false,
    category: "Leadership",
    author: "The Pride Times Team",
    readTime: "7 min read",
  },
];

/* Your existing special reports data */
const specialReports = [
  { title: "Global AI Readiness Index 2026", pages: 48, format: "PDF", category: "Technology" },
  { title: "World's 100 Best-Managed Companies", pages: 72, format: "PDF", category: "Rankings" },
  { title: "India Economic Outlook 2026–2030", pages: 56, format: "PDF", category: "Economy" },
  { title: "Clean Energy Investment Report Q1 2026", pages: 34, format: "PDF", category: "Energy" },
  { title: "Global Cybersecurity Threat Report 2026", pages: 62, format: "PDF", category: "Security" },
];

/* Your existing premium content data, now shown as featured cover cards */
const premiumContent = [
  { title: "The Full Jensen Huang Interview: 2 Hours with the Most Important CEO in Tech", duration: "2 hr read", type: "Interview", category: "Technology", image: EddieImg },
  { title: "Pride Times Annual Investor Conference: All 40 Speaker Sessions", duration: "16 hrs", type: "Video", category: "Finance", image: AxisImg },
  { title: "Deep Dive: India's Unicorn Ecosystem — 200 Startups Analyzed", duration: "90 min read", type: "Research", category: "India", image: TribeImg },
  { title: "Quarterly Market Analysis: Professional-Grade Data for Every Sector", duration: "45 min read", type: "Markets", category: "Finance", image: TribePayImg },
];

export function MagazinePage() {
  const { isSignedIn, user } = useAuth();
  const isPremium = user?.tier === "premium";
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [zoom, setZoom] = useState(1);

  const heroArticle = Articles[0];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="border-b-4 border-black mb-10 pb-3 flex items-center gap-3">
        <BookOpen size={22} />
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-[0.25em]">Digital &amp; Print</span>
          <h1 className="font-serif text-3xl md:text-4xl mt-0.5">The Pride Times Magazine</h1>
        </div>
      </div>

      {/* Current Edition — hero split card, built from your lead article */}
      <div
        onClick={() => {
          setSelectedArticle(heroArticle);
          setCurrentImage(0);
          setZoom(1);
        }}
        className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 mb-12 border border-gray-900 overflow-hidden"
      >
        <div className="relative overflow-hidden bg-black">
          <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1">
            Latest Issue — {heroArticle.month}
          </span>
          <ImageWithFallback
            src={heroArticle.image}
            alt={heroArticle.headline}
            className="w-full h-64 md:h-[420px] object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="bg-black text-white p-8 md:p-10 flex flex-col justify-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-500 mb-3">
            {heroArticle.category}
          </p>
          <h2 className="font-serif text-2xl md:text-[34px] leading-[1.15] mb-3">{heroArticle.headline}</h2>
          <p className="text-gray-400 text-sm mb-7">{heroArticle.author} · {heroArticle.readTime}</p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-red-600 group-hover:bg-red-700 text-white px-5 py-2.5 text-sm font-semibold transition-colors">
              Read Digital Edition →
            </span>
            <span className="border border-gray-600 group-hover:border-gray-400 text-white px-5 py-2.5 text-sm font-semibold transition-colors">
              Subscribe for Print
            </span>
          </div>
        </div>
      </div>

      {/* Articles — your existing issues, 4-column grid */}
      <div className="mb-12">
        <SH title="All Editions" icon={BookOpen} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
          {Articles.map((issue) => (
            <div
              key={issue.id}
              className="group cursor-pointer flex flex-col"
              onClick={() => {
                setSelectedArticle(issue);
                setCurrentImage(0);
                setZoom(1);
              }}
            >
              <div className="relative overflow-hidden shadow-md mb-3 aspect-[3/4] transition-transform duration-300 group-hover:-translate-y-0.5">
                <ImageWithFallback
                  src={issue.image}
                  alt={issue.month}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {issue.premium && !isPremium && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Crown size={20} className="text-yellow-400" />
                  </div>
                )}
              </div>
              <p className="text-[11px] text-gray-500 uppercase tracking-wider">{issue.month}</p>
              <p className="font-serif text-sm leading-snug mt-1 group-hover:text-red-600 transition-colors line-clamp-3">{issue.headline}</p>
              <ChevronRight
                size={12}
                className="text-red-600 mt-1.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Premium Exclusive Content — your existing items, shown as cover-style cards */}
      <div className="mb-14">
        <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-5">
          <Crown size={14} className="text-yellow-500" />
          <h2 className="font-serif text-2xl leading-snug">Premium Exclusive Content</h2>
          {!isPremium && <span className="text-[11px] bg-yellow-100 text-yellow-700 px-2 py-0.5 ml-auto uppercase tracking-wide">Premium Only</span>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {premiumContent.map((c) => (
            <div key={c.title} className={`group cursor-pointer ${!isPremium ? "opacity-80" : ""}`}>
              <div className="relative overflow-hidden aspect-[4/5] bg-black">
                <ImageWithFallback
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40" />
                <span className="absolute top-2.5 left-2.5 bg-black/60 text-white text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-1">
                  {c.category}
                </span>
                {!isPremium && (
                  <span className="absolute top-2.5 right-2.5 bg-yellow-400 text-black rounded-full p-1.5">
                    <Crown size={12} />
                  </span>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center flex-shrink-0">
                    {c.type === "Video" ? <Play size={14} className="text-white" /> : <BookOpen size={14} className="text-white" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold leading-snug line-clamp-2">{c.title}</p>
                    <p className="text-gray-300 text-[11px] mt-0.5">{c.type} · {c.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Reports — your existing list */}
      <div className="mb-14">
        <SH title="Special Reports &amp; Research" icon={BookOpen} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialReports.map((r) => (
            <div key={r.title} className="flex items-center justify-between border border-gray-200 hover:border-black p-4 transition-colors duration-300 group cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={14} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm group-hover:text-red-600 transition-colors">{r.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{r.pages} pages · {r.format} · {r.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!isPremium && <Crown size={14} className="text-yellow-500" />}
                <Download size={14} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe CTA */}
      {!isPremium && (
        <div className="bg-gradient-to-br from-black to-zinc-900 text-white p-8 md:p-10 text-center">
          <Crown size={24} className="text-yellow-400 mx-auto mb-3" />
          <h2 className="font-serif text-2xl text-white mb-2">Unlock the Complete Pride Times Experience</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
            Get unlimited access to every article, every issue, all special reports, exclusive interviews, and premium newsletters. Ad-free. Starting at $4.99/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={isSignedIn ? "/dashboard" : "/login"} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 transition-colors text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400">
              Start Free 30-Day Trial
            </Link>
            <button className="border border-gray-600 hover:border-gray-400 text-white px-8 py-3 transition-colors text-sm">
              Compare Plans
            </button>
          </div>
        </div>
      )}

      {selectedArticle && (
        <div className="fixed inset-0 z-[9999] bg-black/70 overflow-y-auto">
          <div className="max-w-5xl mx-auto bg-white min-h-screen relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 rounded-full w-10 h-10 shadow transition-colors"
            >
              ✕
            </button>

            <div
              className="relative bg-black overflow-auto"
              onWheel={(e) => {
                e.preventDefault();
                if (e.deltaY < 0) {
                  setZoom((z) => Math.min(z + 0.1, 5));
                } else {
                  setZoom((z) => Math.max(z - 0.1, 1));
                }
              }}
            >
              <img
                src={selectedArticle.images ? selectedArticle.images[currentImage] : selectedArticle.image}
                alt={selectedArticle.headline}
                className="w-full max-h-[700px] object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
              />

              {selectedArticle.images && selectedArticle.images.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      setCurrentImage((prev) =>
                        prev === 0 ? selectedArticle.images.length - 1 : prev - 1
                      );
                      setZoom(1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full w-12 h-12 shadow-lg text-2xl transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => {
                      setCurrentImage((prev) =>
                        prev === selectedArticle.images.length - 1 ? 0 : prev + 1
                      );
                      setZoom(1);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full w-12 h-12 shadow-lg text-2xl transition-colors"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            <div className="px-12 py-10">
              <p className="text-red-600 uppercase text-xs tracking-wider font-semibold">
                {selectedArticle.category}
              </p>
              <h1 className="font-serif text-2xl font-normal mt-3 leading-tight">
                {selectedArticle.headline}
              </h1>
              <div className="flex gap-3 text-gray-500 mt-5 text-sm">
                <span>{selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.readTime || "4 min read"}</span>
                <span>•</span>
                <span>{selectedArticle.month}</span>
              </div>
              {selectedArticle.content && (
                <div className="mt-2 whitespace-pre-line text-3sm leading-10 text-gray-700">
                  {selectedArticle.content}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
