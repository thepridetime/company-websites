
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { getQuotes } from "../../services/marketApi";

/* =========================================================
   TYPES
========================================================= */

interface TickerCard {
  symbol: string;
  value: string;
  change: number;
}

type MarketTab =
  | "Overview"
  | "Regional Snapshot"
  | "Market Themes"
  | "Market Stories";

interface MarketMenuItem {
  label: MarketTab;
  path: string;
}

/* =========================================================
   MARKET MENU
   Matches the sections available in MarketsPage.
========================================================= */

const marketTabs: MarketMenuItem[] = [
  {
    label: "Overview",
    path: "/markets",
  },
  {
    label: "Regional Snapshot",
    path: "/markets?tab=Regional%20Snapshot",
  },
  {
    label: "Market Themes",
    path: "/markets?tab=Market%20Themes",
  },
  {
    label: "Market Stories",
    path: "/markets?tab=Market%20Stories",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function parseChange(value: unknown): number | null {
  const parsed = Number.parseFloat(
    String(value ?? "").replace("%", "")
  );

  return Number.isFinite(parsed) ? parsed : null;
}

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

  /* -------------------------------------------------------
     FETCH MARKET DATA

     Refreshes live market quotes every 60 seconds.
  ------------------------------------------------------- */

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await getQuotes();

        const tickerData: TickerCard[] = [
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
            item.change !== null &&
            item.symbol !== undefined &&
            item.value !== undefined
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

  /* -------------------------------------------------------
     AUTO-CLOSE MARKETS MENU
  ------------------------------------------------------- */

  useEffect(() => {
    if (!showSecurities) return;

    const timer = window.setTimeout(() => {
      setShowSecurities(false);
    }, 9000);

    return () => window.clearTimeout(timer);
  }, [showSecurities]);

  /* -------------------------------------------------------
     PAUSE / RESUME TICKER
  ------------------------------------------------------- */

  const pauseAutoScroll = () => {
    isPausedRef.current = true;
  };

  const resumeAutoScroll = () => {
    isPausedRef.current = false;
  };

  /* -------------------------------------------------------
     MANUAL TICKER SCROLL
  ------------------------------------------------------- */

  const scrollByAmount = (
    direction: "left" | "right"
  ) => {
    const element = trackRef.current;

    if (!element) return;

    const halfway = element.scrollWidth / 2;

    if (halfway <= 0) return;

    const amount = Math.min(376, halfway);

    offsetRef.current +=
      direction === "left" ? -amount : amount;

    if (offsetRef.current < 0) {
      offsetRef.current += halfway;
    }

    if (offsetRef.current >= halfway) {
      offsetRef.current -= halfway;
    }

    element.style.transition = "transform 0.4s ease";
    element.style.transform =
      `translateX(-${offsetRef.current}px)`;

    window.setTimeout(() => {
      if (element) {
        element.style.transition = "none";
      }
    }, 400);
  };

  /* -------------------------------------------------------
     CONTINUOUS AUTO-SCROLL

     Bloomberg-style moving market ticker.
  ------------------------------------------------------- */

  useEffect(() => {
    if (cards.length === 0) return;

    const speed = 0.5;

    const step = () => {
      const element = trackRef.current;

      if (element && !isPausedRef.current) {
        const halfway = element.scrollWidth / 2;

        if (halfway > 0) {
          offsetRef.current += speed;

          if (offsetRef.current >= halfway) {
            offsetRef.current -= halfway;
          }

          element.style.transform =
            `translateX(-${offsetRef.current}px)`;
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

  /* -------------------------------------------------------
     MENU HANDLERS
  ------------------------------------------------------- */

  const toggleMenu = () => {
    setShowSecurities((previous) => !previous);
  };

  const closeMenu = () => {
    setShowSecurities(false);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="pt-securities-bar relative w-full">

      <div className="pt-container flex items-stretch">

        {/* ================================================
            MARKETS MENU BUTTON
        ================================================ */}

        <div className="relative flex flex-shrink-0 items-center">

          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Markets navigation menu"
            aria-expanded={showSecurities}
            aria-controls="pt-markets-menu"
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

        {/* ================================================
            LIVE MARKET TICKER
        ================================================ */}

        <div
          className="relative flex min-w-0 flex-1 items-center gap-2 pl-3"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
        >

          {/* Previous */}

          <button
            type="button"
            className="pt-securities-scroll-arrow hidden items-center justify-center sm:flex"
            onClick={() => {
              pauseAutoScroll();
              scrollByAmount("left");
            }}
            aria-label="Scroll market ticker left"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Ticker cards */}

          <div
            className="flex-1 overflow-hidden py-2"
            onTouchStart={pauseAutoScroll}
            onTouchEnd={resumeAutoScroll}
          >
            <div
              ref={trackRef}
              className="flex w-max items-center gap-4 will-change-transform"
            >
              {[...cards, ...cards].map(
                (card, index) => (
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
                )
              )}
            </div>
          </div>

          {/* Next */}

          <button
            type="button"
            className="pt-securities-scroll-arrow hidden items-center justify-center sm:flex"
            onClick={() => {
              pauseAutoScroll();
              scrollByAmount("right");
            }}
            aria-label="Scroll market ticker right"
          >
            <ChevronRight size={16} />
          </button>

        </div>
      </div>

      {/* ================================================
          MARKETS MEGA MENU

          Only sections available in MarketsPage.
      ================================================ */}

      {showSecurities && (
        <div
          id="pt-markets-menu"
          className="pt-mega-menu absolute inset-x-0 top-full z-50"
        >

          <div className="pt-container">

            <div className="pt-mega-menu-inner">

              <div>
                <h4 className="pt-mega-menu-heading">
                  Markets Dashboard
                </h4>

                <ul className="flex flex-col gap-2">

                  {marketTabs.map((tab) => (
                    <li key={tab.label}>
                      <Link
                        to={tab.path}
                        onClick={closeMenu}
                      >
                        {tab.label}
                      </Link>
                    </li>
                  ))}

                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

