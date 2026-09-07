import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { TrendingUp, TrendingDown, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { getQuotes } from "../../services/marketApi";

interface TickerCard {
  symbol: string;
  value: string;
  change: number;
}

/* Bloomberg-style mega-menu columns for "Top Securities".
   All paths point at routes that already exist in App.tsx. */
const megaMenuColumns = [
  {
    title: "Markets",
    links: [
      { label: "Stocks", path: "/markets" },
      { label: "Indices", path: "/markets" },
      { label: "Commodities", path: "/markets" },
      { label: "Forex", path: "/markets" },
      { label: "Crypto", path: "/markets" },
      { label: "Mutual Funds", path: "/markets" },
      { label: "ETFs", path: "/markets" },
      { label: "Government Bonds", path: "/markets" },
      { label: "Global Markets", path: "/markets" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Technology", path: "/technology" },
      { label: "Cybersecurity", path: "/cybersecurity" },
      { label: "Energy", path: "/energy" },
      { label: "Healthcare", path: "/healthcare" },
      { label: "Manufacturing", path: "/manufacturing" },
      { label: "Smart Cities", path: "/smart-cities" },
      { label: "Supply Chain", path: "/supply-chain" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Featured", path: "/featured" },
      { label: "Breaking News", path: "/breaking-news" },
      { label: "Business News", path: "/business-news" },
      { label: "CEO Spotlight", path: "/ceospotlight" },
      { label: "Innovation", path: "/innovation" },
      { label: "Cover Stories", path: "/cover-stories" },
      { label: "White House Watch", path: "/white-house-watch" },
      { label: "World & Geopolitics", path: "/world" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "#" },
      { label: "Advertise", path: "#" },
      { label: "Careers", path: "#" },
      { label: "Contact Us", path: "#" },
      { label: "Press Room", path: "#" },
    ],
  },
];

export function MarketsTicker() {
  const [cards, setCards] = useState<TickerCard[]>([]);
  const [showSecurities, setShowSecurities] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getQuotes();

        // Map real API data into Bloomberg-style cards.
        // No hardcoded values — everything comes from tickerData.
        const tickerData: TickerCard[] = [
          ...data.usIndices.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: Number(String(item.change).replace("%", "")),
          })),
          ...data.crypto.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: Number(String(item.change).replace("%", "")),
          })),
          ...data.commodities.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: Number(String(item.change).replace("%", "")),
          })),
          ...data.indianIndices.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: Number(String(item.change).replace("%", "")),
          })),
        ];

        setCards(tickerData);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();

    const interval = setInterval(loadData, 60000);

    return () => clearInterval(interval);
  }, []);

  // Close the mega-menu after a longer pause than the simple nav dropdowns,
  // since there's more to read/click through here.
  useEffect(() => {
    if (!showSecurities) return;
    const timer = setTimeout(() => setShowSecurities(false), 9000);
    return () => clearTimeout(timer);
  }, [showSecurities]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = (172 + 16) * 2; // card width + gap, two cards per click
    const halfway = el.scrollWidth / 2;

    offsetRef.current += direction === "left" ? -amount : amount;
    if (offsetRef.current < 0) offsetRef.current += halfway;
    if (offsetRef.current >= halfway) offsetRef.current -= halfway;

    el.style.transition = "transform 0.4s ease";
    el.style.transform = `translateX(-${offsetRef.current}px)`;
    window.setTimeout(() => {
      if (el) el.style.transition = "none";
    }, 400);
  };

  // ── Continuous auto-scroll (Bloomberg-style moving ticker) ──
  // Cards are duplicated in the render below so the strip can loop
  // seamlessly: once we've scrolled past the first copy, we silently
  // snap back to 0 and keep going, so it never appears to jump or stop.
  // Driven by a CSS transform (not scrollLeft) so sub-pixel movement is
  // rendered smoothly by the compositor instead of being rounded to
  // whole pixels every frame, which is what caused the visible jitter.
  useEffect(() => {
    if (cards.length === 0) return;

    const speed = 0.5; // px per frame — slow, readable, Bloomberg-style drift

    const step = () => {
      const el = trackRef.current;
      if (el && !isPausedRef.current) {
        const halfway = el.scrollWidth / 2;
        offsetRef.current += speed;
        if (offsetRef.current >= halfway) {
          offsetRef.current -= halfway;
        }
        el.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cards]);

  const pauseAutoScroll = () => {
    isPausedRef.current = true;
  };
  const resumeAutoScroll = () => {
    isPausedRef.current = false;
  };

  return (
    <div className="pt-securities-bar w-full">
      <div className="pt-container flex items-stretch">
        {/* ── Top Securities — Bloomberg-style mega-menu trigger ── */}
        <div className="relative flex-shrink-0">
          <button
            className="pt-securities-btn flex items-center gap-1.5 h-full"
            onClick={() => setShowSecurities(!showSecurities)}
            aria-expanded={showSecurities}
          >
            Menu
            <ChevronDown size={14} className={`transition-transform ${showSecurities ? "rotate-180" : ""}`} />
          </button>

          {showSecurities && (
            <div className="pt-mega-menu absolute left-0 top-full mt-2 z-50">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6">
                {megaMenuColumns.map((column) => (
                  <div key={column.title}>
                    <h4 className="pt-mega-menu-heading">{column.title}</h4>
                    <ul className="flex flex-col gap-2.5">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link to={link.path} onClick={() => setShowSecurities(false)}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Continuously auto-scrolling market cards, always visible in the navbar ── */}
        <div
          className="relative flex items-center flex-1 min-w-0 pl-3 gap-2"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
        >
          <button
            className="pt-securities-scroll-arrow hidden sm:flex items-center justify-center"
            onClick={() => {
              pauseAutoScroll();
              scrollByAmount("left");
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            className="overflow-hidden py-2 flex-1"
            onTouchStart={pauseAutoScroll}
            onTouchEnd={resumeAutoScroll}
          >
            <div ref={trackRef} className="flex items-center gap-4 w-max will-change-transform">
              {/* Cards are rendered twice back-to-back so the auto-scroll
                  loop can snap from the end of the first copy to the start
                  of the second without any visible jump. */}
              {[...cards, ...cards].map((card, i) => (
                <div key={`${card.symbol}-${i}`} className="pt-market-card flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-400 font-medium truncate">{card.symbol}</span>
                  <span className="text-sm font-semibold">{card.value}</span>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      card.change >= 0 ? "pt-market-card-positive" : "pt-market-card-negative"
                    }`}
                  >
                    {card.change >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {card.change >= 0 ? "+" : ""}
                    {card.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="pt-securities-scroll-arrow hidden sm:flex items-center justify-center"
            onClick={() => {
              pauseAutoScroll();
              scrollByAmount("right");
            }}
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
