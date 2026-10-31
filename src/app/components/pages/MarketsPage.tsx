import { NewsletterCTA } from "../NewsletterCTA";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";

import "../../../styles/markets-page.css";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getQuotes } from "../../../services/marketApi";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  octEditionArticles,
  octEditionGlance,
  octEditionMeta,
  octEditionArticlePath,
  type OctEditionArticle,
} from "../../data/octEditionData";

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
      { label: "World and Geopolitics", path: "/world" },
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
   MARKETS NEWS — SOURCE
   Every story on this page comes from
   src/app/data/octEditionData.ts (Global Industry Edition).
   Only the industries listed below count as Markets news.
   Add an industry name here to pull more stories in; any new
   article added to octEditionData.ts with a matching
   `industry` shows up automatically.
========================================================= */

const MARKET_INDUSTRIES = [
  "Global Economy and Finance",
  "Energy",
  "AI and Cloud Infrastructure",
  "Corporate",
];

const marketStories: OctEditionArticle[] = octEditionArticles.filter(
  (article) => MARKET_INDUSTRIES.includes(article.industry)
);

/* Headline figures from the edition that relate to markets
   (growth, inflation, oil, AI capex and earnings). */
const marketGlance = octEditionGlance.filter((item) =>
  /growth|inflation|oil|hyperscaler|nvidia/i.test(item.indicator)
);

/* =========================================================
   LAYOUT SLOTS (same structure as the homepage)
========================================================= */

const leadStory: OctEditionArticle | undefined = marketStories[0];
const majorStories = marketStories.slice(1, 3);
const editorsPick: OctEditionArticle | undefined = marketStories[3];

const featuredIds = new Set(
  [leadStory, ...majorStories, editorsPick]
    .filter((article): article is OctEditionArticle => Boolean(article))
    .map((article) => article.id)
);

const sidebarStories = marketStories
  .filter((article) => !featuredIds.has(article.id))
  .slice(0, 6);

const industryNames = Array.from(
  new Set(marketStories.map((article) => article.industry))
);
const latestNewsTabs = ["All", ...industryNames];

const PAGE_SIZE = 8;

/* =========================================================
   TYPES
========================================================= */

type MarketItem = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function ChangeChip({ change, up }: { change: string; up: boolean }) {
  return (
    <span className={`mk-chip ${up ? "is-up" : "is-down"}`}>
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
    <div className="mk-section-head">
      <h2 className="mk-section-title">{title}</h2>

      {link && (
        <Link to={link} className="mk-read-link">
          {linkText}
          <ArrowRight size={10} />
        </Link>
      )}
    </div>
  );
}

/* =========================================================
   MARKETS PAGE
========================================================= */

export function MarketsPage() {
  const [activeMarketTab, setActiveMarketTab] = useState<"Indices" | "Crypto">(
    "Indices"
  );
  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [marketSnapshotData, setMarketSnapshotData] = useState<
    Record<string, MarketItem[]>
  >({
    Indices: [],
    Crypto: [],
  });

  /* ---------- MARKET DATA ---------- */

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

  /* ---------- LATEST NEWS FILTERING ---------- */

  const filteredStories = useMemo(
    () =>
      activeNewsTab === "All"
        ? marketStories
        : marketStories.filter((article) => article.industry === activeNewsTab),
    [activeNewsTab]
  );

  const latestStories =
    activeNewsTab === "All"
      ? filteredStories.slice(0, visibleCount)
      : filteredStories;

  const hasMore =
    activeNewsTab === "All" && visibleCount < filteredStories.length;

  const selectTab = (tab: string) => {
    setActiveNewsTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  /* ---------- EMPTY STATE ---------- */

  if (!leadStory) {
    return (
      <div className="mk-empty-page">
        <div className="mk-wrap" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <h1 className="mk-empty-title">Markets</h1>
          <p className="mk-empty-text">
            No markets stories are available yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mk-page">
      <div className="mk-wrap">
        <main className="mk-main">
          {/* =================================================
              TOP STORIES / NEWSROOM LEAD
          ================================================= */}

          <section className="mk-hero">
            {/* LEAD STORY */}

            <Link
              to={octEditionArticlePath(leadStory)}
              className="mk-lead group"
            >
              <ImageWithFallback
                src={leadStory.image}
                alt={leadStory.title}
                className="mk-lead-img"
              />

              <div className="mk-lead-shade" />

              <span className="mk-tag mk-lead-tag">
                Markets | {leadStory.industry} | {leadStory.location}
              </span>

              <div className="mk-lead-body">
                <h1 className="mk-lead-title">{leadStory.title}</h1>

                <p className="mk-lead-lede">{leadStory.lede}</p>

                <p className="mk-lead-excerpt">{leadStory.body[0]}</p>

                <span className="mk-lead-cta">
                  Read Full Story
                  <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* MAJOR COVERAGE */}

            <div className="min-w-0">
              {majorStories[0] && (
                <Link
                  to={octEditionArticlePath(majorStories[0])}
                  className="mk-major"
                >
                  <span className="mk-kicker">
                    {majorStories[0].industry} | {majorStories[0].location}
                  </span>

                  <div className="mk-major-img-wrap" style={{ marginTop: 8 }}>
                    <ImageWithFallback
                      src={majorStories[0].image}
                      alt={majorStories[0].title}
                      className="mk-major-img"
                    />
                  </div>

                  <h2 className="mk-major-title">{majorStories[0].title}</h2>

                  <p className="mk-major-excerpt">{majorStories[0].lede}</p>
                </Link>
              )}

              {/* SECOND MAJOR STORY */}

              {majorStories[1] && (
                <Link
                  to={octEditionArticlePath(majorStories[1])}
                  className="mk-second group"
                >
                  <div className="mk-thumb">
                    <ImageWithFallback
                      src={majorStories[1].image}
                      alt={majorStories[1].title}
                      className="mk-thumb-img"
                    />
                  </div>

                  <div className="min-w-0">
                    <span className="mk-kicker">
                      {majorStories[1].industry}
                    </span>

                    <h3 className="mk-second-title">{majorStories[1].title}</h3>

                    <p className="mk-second-excerpt">{majorStories[1].lede}</p>

                    <span className="mk-time">
                      <Clock size={9} />
                      {majorStories[1].publishedAt}
                    </span>
                  </div>
                </Link>
              )}

              {/* MARKET CONTEXT (live quotes) */}

              <div className="mk-panel">
                <div className="mk-panel-head">
                  <h3 className="mk-panel-title">Market Snapshot</h3>

                  <div className="mk-seg">
                    {(["Indices", "Crypto"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveMarketTab(tab)}
                        className={`mk-seg-btn ${
                          activeMarketTab === tab ? "is-active" : ""
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mk-quote-list">
                  {(marketSnapshotData[activeMarketTab] || [])
                    .slice(0, 4)
                    .map((market) => (
                      <div key={market.symbol} className="mk-quote-row">
                        <span className="mk-quote-symbol">{market.symbol}</span>

                        <div className="mk-quote-right">
                          <span className="mk-quote-value">{market.value}</span>

                          <ChangeChip
                            change={market.change}
                            up={market.up}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* RIGHT NEWSROOM COLUMN */}

            <aside className="mk-aside">
              {/* EDITOR'S PICK (only when a 4th markets story exists) */}

              {editorsPick && (
                <div className="mk-pick">
                  <div className="mk-pick-head">
                    <h2 className="mk-pick-title">Editor's Pick</h2>

                    <Link to={editorsPick.sectionPath} className="mk-explore-pill">
                      Explore More
                    </Link>
                  </div>

                  <Link
                    to={octEditionArticlePath(editorsPick)}
                    className="mk-pick-link group"
                  >
                    <div className="mk-pick-img-wrap">
                      <ImageWithFallback
                        src={editorsPick.image}
                        alt={editorsPick.title}
                        className="mk-pick-img"
                      />
                    </div>

                    <span className="mk-kicker" style={{ marginTop: 10 }}>
                      {editorsPick.industry}
                    </span>

                    <h3 className="mk-link-title">{editorsPick.title}</h3>

                    <p className="mk-pick-excerpt">{editorsPick.lede}</p>
                  </Link>
                </div>
              )}

              {/* MARKETS NUMBERS AT A GLANCE */}

              {marketGlance.length > 0 && (
                <div className={`mk-glance ${editorsPick ? "" : "mk-glance--flush"}`}>
                  <div className="mk-side-head">
                    <h2 className="mk-side-title">Numbers at a Glance</h2>

                    <span className="mk-side-meta">{octEditionMeta.date}</span>
                  </div>

                  <div className="mk-glance-list">
                    {marketGlance.map((item) => (
                      <div key={item.indicator} className="mk-glance-item">
                        <span className="mk-glance-label">{item.indicator}</span>

                        <span className="mk-glance-figure">{item.figure}</span>

                        <span className="mk-glance-source">{item.source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LATEST NEWS STREAM (sidebar headlines) */}

              {sidebarStories.length > 0 && (
                <div className="mk-latest">
                  <div className="mk-side-head">
                    <h2 className="mk-side-title">Latest News</h2>

                    <span className="mk-side-meta">Newsroom</span>
                  </div>

                  <div className="mk-latest-list">
                    {sidebarStories.map((item) => (
                      <Link
                        key={item.id}
                        to={octEditionArticlePath(item)}
                        className="mk-latest-item group"
                      >
                        <div className="mk-latest-row">
                          <span className="mk-latest-loc">{item.location}</span>

                          <div className="min-w-0">
                            <span className="mk-latest-title">{item.title}</span>

                            <span className="mk-latest-lede">{item.lede}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </section>

          {/* =================================================
              ADVERTISEMENT
          ================================================= */}

          <PrideTimesAd variant="first" className="mk-ad-top" />

          {/* =================================================
              LATEST MARKETS NEWS
          ================================================= */}

          <section className="mk-section-news">
            <SectionHeader
              title={`${octEditionMeta.title} · ${octEditionMeta.edition} · ${octEditionMeta.date}`}
            />

            <p className="mk-news-intro">
              Markets coverage: the global economy and inflation, energy and
              oil prices, AI spending and funding, and deals.
            </p>

            {/* FILTER TABS */}

            <div className="mk-tabs">
              {latestNewsTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => selectTab(tab)}
                  className={`mk-tab ${activeNewsTab === tab ? "is-active" : ""}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* STORY LIST */}

            <div className="mk-story-list">
              {latestStories.length === 0 && (
                <p className="mk-empty">No stories in this category yet.</p>
              )}

              {latestStories.map((story) => (
                <Link
                  key={story.id}
                  to={octEditionArticlePath(story)}
                  className="mk-story group"
                >
                  <div className="mk-story-img-wrap">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="mk-story-img"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="mk-story-meta">
                      <span className="mk-story-industry">{story.industry}</span>

                      <span className="mk-story-dot">•</span>

                      <span className="mk-story-loc">
                        <MapPin size={8} />
                        {story.location}
                      </span>
                    </div>

                    <h3 className="mk-story-title">{story.title}</h3>

                    <p className="mk-story-lede">{story.lede}</p>

                    <span className="mk-story-time">
                      <Clock size={8} />
                      {story.publishedAt} · {story.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore && (
              <div className="mk-more">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) =>
                      Math.min(count + PAGE_SIZE, filteredStories.length)
                    )
                  }
                  className="mk-more-btn"
                >
                  Show more stories
                </button>

                <span className="mk-more-count">
                  Showing {latestStories.length} of {filteredStories.length}
                </span>
              </div>
            )}

            <p className="mk-footnote">{leadStory.editorNote}</p>
          </section>

          {/* =================================================
              SECOND ADVERTISEMENT
          ================================================= */}

          <PrideTimesAd variant="second" className="mk-ad-bottom" />

          {/* =================================================
              NEWSLETTER CTA
          ================================================= */}

          <NewsletterCTA
            title="Stay Ahead with The Pride Times"
            description="Daily briefings on Markets delivered to your inbox."
            newsletterKey="markets-morning"
          />
        </main>
      </div>
    </div>
  );
}

export default MarketsPage;
