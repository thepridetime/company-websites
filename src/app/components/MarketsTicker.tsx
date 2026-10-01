
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getQuotes } from "../../services/marketApi";

interface TickerCard {
  symbol: string;
  value: string;
  change: number;
}

function parseChange(value: unknown): number | null {
  const parsed = Number.parseFloat(
    String(value ?? "").replace("%", "")
  );

  return Number.isFinite(parsed) ? parsed : null;
}

/* =========================================================
   MARKETS TAB LINK HELPER
   Builds /markets?tab=<Tab>
========================================================= */

const marketTab = (tab: string) =>
  `/markets?tab=${encodeURIComponent(tab)}`;

/* =========================================================
   MEGA MENU COLUMNS
   Only Markets, Industries and More sections
========================================================= */

const megaMenuColumns = [
  {
    title: "Markets",
    links: [
      { label: "Stocks", path: marketTab("Stocks") },
      { label: "Indices", path: marketTab("Indices") },
      { label: "Commodities", path: marketTab("Commodities") },
      { label: "Forex", path: marketTab("Forex") },
      { label: "Crypto", path: marketTab("Crypto") },
      { label: "Mutual Funds", path: marketTab("Mutual Funds") },
      { label: "ETFs", path: marketTab("ETFs") },
      {
        label: "Government Bonds",
        path: marketTab("Government Bonds"),
      },
      {
        label: "Global Markets",
        path: marketTab("Global Markets"),
      },
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
      { label: "Business News", path: "/business-news" },
      { label: "CEO Spotlight", path: "/ceospotlight" },
      { label: "Innovation", path: "/innovation" },
      { label: "Cover Stories", path: "/cover-stories" },
      { label: "White House Watch", path: "/white-house-watch" },
      { label: "World & Geopolitics", path: "/world" },
    ],
  },
];

/* =========================================================
   MARKETS TICKER
========================================================= */

export function MarketsTicker() {
  const [cards, setCards] = useState<TickerCard[]>([]);
  const [showSecurities, setShowSecurities] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  /* =======================================================
     LOAD MARKET DATA
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await getQuotes();

        const tickerData: (TickerCard | null)[] = [
          ...(data.usIndices ?? []).map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...(data.stocks ?? []).map((item: any) => ({
            symbol: item.symbol ?? item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...(data.crypto ?? []).map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...(data.commodities ?? []).map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...(data.indianIndices ?? []).map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),
        ].filter(
          (item): item is TickerCard =>
            item !== null &&
            item.change !== null &&
            Boolean(item.symbol) &&
            Boolean(item.value)
        );

        if (isMounted) {
          setCards(tickerData);
        }
      } catch (error) {
        console.error(
          "Failed to load market ticker data:",
          error
        );
      }
    };

    loadData();

    const interval = window.setInterval(loadData, 60000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  /* =======================================================
     AUTO-CLOSE MEGA MENU
  ======================================================= */

  useEffect(() => {
    if (!showSecurities) return;

    const timer = window.setTimeout(() => {
      setShowSecurities(false);
    }, 9000);

    return () => window.clearTimeout(timer);
  }, [showSecurities]);

  /* =======================================================
     MANUAL TICKER SCROLL
  ======================================================= */

  const scrollByAmount = (direction: "left" | "right") => {
    const el = trackRef.current;

    if (!el) return;

    const amount = (172 + 16) * 2;
    const halfway = el.scrollWidth / 2;

    if (halfway <= 0) return;

    offsetRef.current +=
      direction === "left" ? -amount : amount;

    if (offsetRef.current < 0) {
      offsetRef.current += halfway;
    }

    if (offsetRef.current >= halfway) {
      offsetRef.current -= halfway;
    }

    el.style.transition = "transform 0.4s ease";
    el.style.transform = `translateX(-${offsetRef.current}px)`;

    window.setTimeout(() => {
      if (el) {
        el.style.transition = "none";
      }
    }, 400);
  };

  /* =======================================================
     CONTINUOUS AUTO-SCROLL
  ======================================================= */

  useEffect(() => {
    if (cards.length === 0) return;

    const speed = 0.5;

    const step = () => {
      const el = trackRef.current;

      if (el && !isPausedRef.current) {
        const halfway = el.scrollWidth / 2;

        if (halfway > 0) {
          offsetRef.current += speed;

          if (offsetRef.current >= halfway) {
            offsetRef.current -= halfway;
          }

          el.style.transform = `translateX(-${offsetRef.current}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [cards]);

  /* =======================================================
     PAUSE / RESUME
  ======================================================= */

  const pauseAutoScroll = () => {
    isPausedRef.current = true;
  };

  const resumeAutoScroll = () => {
    isPausedRef.current = false;
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="pt-securities-bar relative w-full">
      <div className="pt-container flex items-stretch">

        {/* MENU BUTTON */}

        <div className="relative flex flex-shrink-0 items-center">
          <button
            type="button"
            onClick={() =>
              setShowSecurities((previous) => !previous)
            }
            aria-label="Top Securities menu"
            aria-expanded={showSecurities}
            aria-haspopup="true"
            style={{
              width: "95px",
              height: "40px",
              backgroundColor: "#ffffff",
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              padding: "0",
              margin: "0",
              color: "#000000",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "1",
              fontFamily: "Arial, Helvetica, sans-serif",
              cursor: "pointer",
              flexShrink: 0,
              boxSizing: "border-box",
            }}
          >
            <span>Menu</span>

            <span
              style={{
                width: 0,
                height: 0,
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: "5px solid #000000",
                display: "inline-block",
                marginTop: "2px",
                transform: showSecurities
                  ? "rotate(180deg)"
                  : "none",
                transition: "transform 0.15s ease",
              }}
            />
          </button>
        </div>

        {/* MARKET TICKER */}

        <div
          className="relative flex min-w-0 flex-1 items-center gap-2 pl-3"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
        >
          {/* LEFT ARROW */}

          <button
            type="button"
            className="pt-securities-scroll-arrow hidden items-center justify-center sm:flex"
            onClick={() => {
              pauseAutoScroll();
              scrollByAmount("left");
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>

          {/* TICKER TRACK */}

          <div
            className="flex-1 overflow-hidden py-2"
            onTouchStart={pauseAutoScroll}
            onTouchEnd={resumeAutoScroll}
          >
            <div
              ref={trackRef}
              className="flex w-max items-center gap-4 will-change-transform"
            >
              {[...cards, ...cards].map((card, index) => (
                <div
                  key={`${card.symbol}-${index}`}
                  className="pt-market-card flex flex-shrink-0 items-center gap-2"
                >
                  <span className="truncate text-xs font-medium text-gray-400">
                    {card.symbol}
                  </span>

                  <span className="text-sm font-semibold">
                    {card.value}
                  </span>

                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      card.change >= 0
                        ? "pt-market-card-positive"
                        : "pt-market-card-negative"
                    }`}
                  >
                    {card.change >= 0 ? (
                      <TrendingUp size={11} />
                    ) : (
                      <TrendingDown size={11} />
                    )}

                    {card.change >= 0 ? "+" : ""}
                    {card.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT ARROW */}

          <button
            type="button"
            className="pt-securities-scroll-arrow hidden items-center justify-center sm:flex"
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

      {/* =====================================================
          MEGA MENU
          Three equal-width columns with uniform spacing
      ===================================================== */}

      {showSecurities && (
        <div className="pt-mega-menu absolute inset-x-0 top-full z-50">
          <div className="pt-container">

            {/* THREE COLUMN LAYOUT */}

            <div className="grid grid-cols-1 gap-8 py-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {megaMenuColumns.map((column) => (
                <div
                  key={column.title}
                  className="min-w-0"
                >
                  <h4 className="pt-mega-menu-heading mb-5">
                    {column.title}
                  </h4>

                  <ul className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.path}
                          onClick={() =>
                            setShowSecurities(false)
                          }
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* UTILITY LINKS */}

            <div className="pt-mega-menu-utility flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-gray-200 py-5">
              <Link
                to="/signup"
                onClick={() => setShowSecurities(false)}
              >
                Sign Up
              </Link>

              <Link
                to="/magazine"
                onClick={() => setShowSecurities(false)}
              >
                Digital Edition
              </Link>

              <Link
                to="/Privacy"
                onClick={() => setShowSecurities(false)}
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                onClick={() => setShowSecurities(false)}
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
