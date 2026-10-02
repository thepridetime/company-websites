import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getQuotes } from "../../../services/marketApi";

import { PrideTimesAd } from "../AdSenseSlots";
import { specialArticles } from "../../data/specialArticle";

// Markets articles are maintained in the shared specialArticle.ts data file.
const marketArticles = specialArticles.filter(
  (article) => article.section === "Markets"
);

interface TickerCard {
  symbol: string;
  value: string;
  change: number;
}

function parseChange(value: unknown): number | null {
  const parsed = Number.parseFloat(String(value ?? "").replace("%", ""));
  return Number.isFinite(parsed) ? parsed : null;
}

/* Builds /markets?tab=<Tab> so MarketsPage opens the matching tab. */
const marketTab = (tab: string) => `/markets?tab=${encodeURIComponent(tab)}`;

/* Bloomberg-style mega-menu columns for "Top Securities".
   All paths point at routes that already exist in App.tsx. */
const megaMenuColumns = [
  {
    title: "Markets",
    links: [
      { label: "Overview", path: marketTab("Overview") },
      { label: "Regional Snapshot", path: marketTab("Regional Snapshot") },
      { label: "Market Themes", path: marketTab("Market Themes") },
      { label: "Market Stories", path: marketTab("Market Stories") },
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
      { label: "International Business", path: "/international-news" },
      { label: "Startup Success", path: "/startup-success" },
      { label: "CEO Spotlight", path: "/ceospotlight" },
      { label: "Magazines", path: "/magazine" },
      { label: "Innovation", path: "/innovation" },
      { label: "White House Watch", path: "/white-house-watch" },
      { label: "World & Geopolitics", path: "/world" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about-us" },
      { label: "Advertise", path: "/advertise" },
      { label: "Careers", path: "/careers" },
      { label: "Contact Us", path: "/contact" },
      { label: "Press Room", path: "/press-room" },
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
        const tickerData: (TickerCard | null)[] = [
          ...data.usIndices.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...data.stocks.map((item: any) => ({
            symbol: item.symbol ?? item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...data.crypto.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...data.commodities.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),

          ...data.indianIndices.map((item: any) => ({
            symbol: item.name,
            value: item.value,
            change: parseChange(item.change),
          })),
        ].filter(
          (item): item is TickerCard =>
            item !== null && item.change !== null
        );

        setCards(tickerData);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();

    const interval = setInterval(loadData, 60000);

    return () => clearInterval(interval);
  }, []);

  // Close the mega-menu after a longer pause than the simple nav dropdowns.
  useEffect(() => {
    if (!showSecurities) return;

    const timer = setTimeout(
      () => setShowSecurities(false),
      9000
    );

    return () => clearTimeout(timer);
  }, [showSecurities]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = trackRef.current;

    if (!el) return;

    const amount = (172 + 16) * 2;
    const halfway = el.scrollWidth / 2;

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

  // ── Continuous auto-scroll (Bloomberg-style moving ticker) ──
  useEffect(() => {
    if (cards.length === 0) return;

    const speed = 0.5;

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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [cards]);

  const pauseAutoScroll = () => {
    isPausedRef.current = true;
  };

  const resumeAutoScroll = () => {
    isPausedRef.current = false;
  };

  return (
    <div className="pt-securities-bar w-full relative">
      <div className="pt-container flex items-stretch">

        {/* Top Securities — Bloomberg-style mega-menu trigger */}

        <div className="relative flex-shrink-0 flex items-center">
          <button
            type="button"
            onClick={() => setShowSecurities(!showSecurities)}
            aria-label="Top Securities menu"
            aria-expanded={showSecurities}
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

        {/* Continuously auto-scrolling market cards */}

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
            <div
              ref={trackRef}
              className="flex items-center gap-4 w-max will-change-transform"
            >
              {[...cards, ...cards].map((card, i) => (
                <div
                  key={`${card.symbol}-${i}`}
                  className="pt-market-card flex items-center gap-2 flex-shrink-0"
                >
                  <span className="text-xs text-gray-400 font-medium truncate">
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

      {showSecurities && (
        <div className="pt-mega-menu absolute inset-x-0 top-full z-50">
          <div className="pt-container">
            <div className="pt-mega-menu-inner">
              {megaMenuColumns.map((column) => (
                <div key={column.title}>
                  <h4 className="pt-mega-menu-heading">
                    {column.title}
                  </h4>

                  <ul className="flex flex-col gap-2">
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

            <div className="pt-mega-menu-utility">
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

/* =========================================================
   MARKETS PAGE
   Data source: Global Corporate News Digest (Oct 2026)
   — "Market Snapshot" + "1 Markets & Finance" section only.
========================================================= */

type MarketTab =
  | "Overview"
  | "Regional Snapshot"
  | "Market Themes"
  | "Market Stories";

const tabs: MarketTab[] = [
  "Overview",
  "Regional Snapshot",
  "Market Themes",
  "Market Stories",
];

/* ---------- Market Snapshot (Illustrative) ---------- */

interface RegionRow {
  region: string;
  dealValue: number; // US$ bn
  earningsGrowth: number; // %
  hiringOutlook: "Mixed" | "Stable";
}

const regionalSnapshot: RegionRow[] = [
  { region: "North America", dealValue: 21.4, earningsGrowth: 10.3, hiringOutlook: "Mixed" },
  { region: "Europe", dealValue: 48.5, earningsGrowth: 13.8, hiringOutlook: "Mixed" },
  { region: "Asia-Pacific", dealValue: 4.4, earningsGrowth: 3.6, hiringOutlook: "Stable" },
  { region: "Latin America", dealValue: 38.5, earningsGrowth: 17.7, hiringOutlook: "Mixed" },
  { region: "Middle East & Africa", dealValue: 15.7, earningsGrowth: 7.8, hiringOutlook: "Stable" },
];

/* ---------- Markets & Finance — Section at a glance ---------- */

interface ThemeRow {
  theme: string;
  momentum: string;
  outlook: "Neutral" | "Positive";
}

const marketThemes: ThemeRow[] = [
  { theme: "Capital markets", momentum: "Building", outlook: "Neutral" },
  { theme: "Credit conditions", momentum: "Moderate", outlook: "Neutral" },
  { theme: "Treasury yields", momentum: "Uneven", outlook: "Neutral" },
  { theme: "Equity valuations", momentum: "Moderate", outlook: "Positive" },
];

/* ---------- Markets & Finance — Stories ----------
   Cards come from src/app/data/marketArticleData.ts and open the
   full blog post at /article/:id. */

const maxDealValue = Math.max(...regionalSnapshot.map((r) => r.dealValue));

export function MarketsPage() {
  // Active tab lives in the URL (?tab=Market Stories) so menu links,
  // the tab bar, the back button and shared links all stay in sync.
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as MarketTab | null;
  const activeTab: MarketTab =
    tabParam && tabs.includes(tabParam) ? tabParam : "Overview";

  const selectTab = (tab: MarketTab) =>
    setSearchParams(tab === "Overview" ? {} : { tab });

  const hiringBadge: Record<RegionRow["hiringOutlook"], string> = {
    Mixed: "bg-amber-50 text-amber-700",
    Stable: "bg-emerald-50 text-emerald-700",
  };

  const outlookBadge: Record<ThemeRow["outlook"], string> = {
    Neutral: "bg-gray-100 text-gray-600",
    Positive: "bg-emerald-50 text-emerald-700",
  };

  const showSnapshot =
    activeTab === "Overview" || activeTab === "Regional Snapshot";
  const showThemes =
    activeTab === "Overview" || activeTab === "Market Themes";
  const showStories =
    activeTab === "Overview" || activeTab === "Market Stories";

  return (
    <main className="min-h-screen bg-white text-[#17140F]">
      <div className="pt-container">
        {/* Red editorial rule */}
        <div className="border-t-[3px] border-[#d71920] pt-4 sm:pt-5" />

        {/* Page heading */}
        <header className="pb-5">
          <h1 className="font-serif text-[30px] font-bold leading-tight sm:text-[36px]">
            Markets Dashboard
          </h1>
          <p className="mt-1 text-[13px] text-[#777]">
            Capital flows, earnings, rate expectations and the deals that moved global markets.
          </p>
        </header>

        {/* Tabs */}
        <nav
          aria-label="Markets sections"
          className="border-b border-[#dedede]"
        >
          <div className="flex min-w-0 gap-7 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => selectTab(tab)}
                className={`relative whitespace-nowrap pb-3 pt-1 text-[12px] font-semibold transition ${
                  activeTab === tab
                    ? "text-[#d71920]"
                    : "text-[#666] hover:text-black"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#d71920]" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Dashboard content */}
        <div className="pb-16 pt-5 sm:pt-6">
          {/* ---------------- Regional Snapshot ---------------- */}
          {showSnapshot && (
            <section aria-labelledby="regional-snapshot-heading">
              <h2
                id="regional-snapshot-heading"
                className="font-serif text-[18px] font-bold"
              >
                Market Snapshot
              </h2>
              <p className="mb-4 mt-1 text-[11px] text-[#777]">
                Illustrative regional indicators.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-black">
                      <th className="py-2 pr-4 text-[10px] font-bold uppercase">
                        Region
                      </th>
                      <th className="py-2 pr-4 text-[10px] font-bold uppercase">
                        Deal Value (US$ bn)
                      </th>
                      <th className="py-2 pr-4 text-[10px] font-bold uppercase">
                        Earnings Growth
                      </th>
                      <th className="py-2 text-[10px] font-bold uppercase">
                        Hiring Outlook
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionalSnapshot.map((row) => (
                      <tr
                        key={row.region}
                        className="border-b border-[#ececec] last:border-b-0"
                      >
                        <td className="py-2.5 pr-4 text-[11px] font-semibold">
                          {row.region}
                        </td>
                        <td className="py-2.5 pr-4 text-[11px]">
                          <div className="flex items-center gap-3">
                            <span className="w-10 font-mono font-bold text-[#555]">
                              {row.dealValue.toFixed(1)}
                            </span>
                            <span className="h-1.5 w-28 overflow-hidden rounded-full bg-[#f0f0f0]">
                              <span
                                className="block h-full rounded-full bg-[#d71920]"
                                style={{
                                  width: `${(row.dealValue / maxDealValue) * 100}%`,
                                }}
                              />
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-4 text-[11px] font-semibold text-emerald-600">
                          ▲ {row.earningsGrowth.toFixed(1)}%
                        </td>
                        <td className="py-2.5 text-[11px]">
                          <span
                            className={`inline-flex rounded-[3px] px-2 py-0.5 text-[10px] font-bold ${hiringBadge[row.hiringOutlook]}`}
                          >
                            {row.hiringOutlook}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ---------------- Market Themes ---------------- */}
          {showThemes && (
            <section
              aria-labelledby="market-themes-heading"
              className={showSnapshot ? "mt-7 sm:mt-8" : ""}
            >
              <h2
                id="market-themes-heading"
                className="font-serif text-[18px] font-bold"
              >
                Markets &amp; Finance: Section at a Glance
              </h2>
              <p className="mb-4 mt-1 text-[11px] text-[#777]">
                Capital flows, earnings, rate expectations and the deals that moved global markets.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-black">
                      <th className="py-2 pr-4 text-[10px] font-bold uppercase">
                        Theme
                      </th>
                      <th className="py-2 pr-4 text-[10px] font-bold uppercase">
                        Momentum
                      </th>
                      <th className="py-2 text-[10px] font-bold uppercase">
                        Outlook
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketThemes.map((row) => (
                      <tr
                        key={row.theme}
                        className="border-b border-[#ececec] last:border-b-0"
                      >
                        <td className="py-2.5 pr-4 text-[11px] font-semibold">
                          {row.theme}
                        </td>
                        <td className="py-2.5 pr-4 text-[11px] text-[#555]">
                          {row.momentum}
                        </td>
                        <td className="py-2.5 text-[11px]">
                          <span
                            className={`inline-flex rounded-[3px] px-2 py-0.5 text-[10px] font-bold ${outlookBadge[row.outlook]}`}
                          >
                            {row.outlook}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ---------------- Market Stories ---------------- */}
          {showStories && (
            <section
              aria-labelledby="market-stories-heading"
              className={
                showSnapshot || showThemes ? "mt-7 sm:mt-8" : ""
              }
            >
              <h2
                id="market-stories-heading"
                className="mb-4 font-serif text-[18px] font-bold"
              >
                Markets &amp; Finance Stories
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {marketArticles.map((story) => (
                  <Link
                    key={story.id}
                    to={`/article/${story.id}`}
                    className="group flex flex-col rounded-[7px] border border-[#dedede] bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-[#d71920]/40 hover:shadow-md"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#d71920]">
                      {story.category}
                    </div>

                    <h3 className="mt-2 font-serif text-[16px] font-bold leading-snug transition-colors duration-200 group-hover:text-[#d71920]">
                      {story.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-[#555]">
                      {story.dek}
                    </p>

                    <p className="mt-2 text-[10px] text-[#999]">
                      By {story.author} &nbsp;·&nbsp; {story.readTime}
                    </p>

                    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-[#ececec] pt-3 text-[11px]">
                      {story.keyFacts.map((fact) => (
                        <Fragment key={fact.label}>
                          <dt className="text-[10px] font-bold uppercase text-[#999]">
                            {fact.label}
                          </dt>
                          <dd
                            className={
                              fact.label === "Est. Value"
                                ? "font-mono font-bold"
                                : fact.label === "Company"
                                ? "font-semibold"
                                : ""
                            }
                          >
                            {fact.value}
                          </dd>
                        </Fragment>
                      ))}
                    </dl>

                    <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-[#d71920]">
                      Read the post
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <p className="mt-6 text-[10px] text-[#999]">
            Illustrative data for display purposes only.
          </p>
        </div>
      </div>
      <PrideTimesAd variant="first" />
    </main>
  );
}
