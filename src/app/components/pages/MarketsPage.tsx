import { NewsletterCTA } from "../NewsletterCTA";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { TrendingUp, TrendingDown, ArrowRight, Clock } from "lucide-react";

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

/* Builds /markets?tab=<Tab> links. */
const marketTabPath = (tab: string) => `/markets?tab=${encodeURIComponent(tab)}`;

/* =========================================================
   MARKETS NEWS — SOURCE
   Every story on this page comes from
   src/app/data/octEditionData.ts (Global Industry Edition).
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

/* Headline figures that relate to markets. */
const marketGlance = octEditionGlance.filter((item) =>
  /growth|inflation|oil|hyperscaler|nvidia/i.test(item.indicator)
);

/* =========================================================
   LAYOUT SLOTS (homepage pattern)
   Lead  → large centre story
   Left  → "Top Stories" list
   Sub   → two stories beneath the lead
   Pick  → Editor's Pick in the right column
========================================================= */

const leadStory: OctEditionArticle | undefined = marketStories[0];
const topStories = marketStories.slice(1, 5);
const subStories = marketStories.slice(5, 7);
const editorsPick: OctEditionArticle | undefined = marketStories[7] ?? marketStories[marketStories.length - 1];

const industryNames = Array.from(
  new Set(marketStories.map((article) => article.industry))
);
const latestNewsTabs = ["All", ...industryNames];

const PAGE_SIZE = 6;

type MarketItem = {
  symbol: string;
  value: string | number;
  change: string;
  up: boolean;
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionHeader({ title, link, linkText = "View All" }: { title: string; link?: string; linkText?: string }) {
  return (
    <div className="mk-rule-head">
      <h2 className="mk-rule-title">{title}</h2>

      {link && (
        <Link to={link} className="mk-rule-link">
          {linkText} <ArrowRight size={10} style={{ display: "inline", verticalAlign: "middle" }} />
        </Link>
      )}
    </div>
  );
}

/* =========================================================
   MARKETS PAGE
========================================================= */

export function MarketsPage() {
  const [activeMarketTab, setActiveMarketTab] = useState<"Indices" | "Crypto">("Indices");
  const [activeNewsTab, setActiveNewsTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [marketSnapshotData, setMarketSnapshotData] = useState<Record<string, MarketItem[]>>({
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
    const interval = setInterval(loadMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- LATEST NEWS FILTERING ---------- */

  const filteredStories = useMemo(
    () =>
      activeNewsTab === "All"
        ? marketStories
        : marketStories.filter((article) => article.industry === activeNewsTab),
    [activeNewsTab]
  );

  const latestStories = filteredStories.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStories.length;

  const selectTab = (tab: string) => {
    setActiveNewsTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  /* ---------- EMPTY STATE ---------- */

  if (!leadStory) {
    return (
      <div className="mk-empty-page">
        <div className="mk-wrap">
          <h1 className="mk-empty-title">Markets</h1>
          <p className="mk-empty-text">No markets stories are available yet.</p>
        </div>
      </div>
    );
  }

  const quotes = marketSnapshotData[activeMarketTab] || [];

  return (
    <div className="mk-page">
      <div className="mk-wrap">
        <main className="mk-main">
          {/* =================================================
              TOP NEWSROOM — Top Stories | Lead | Markets panel
          ================================================= */}

          <section className="mk-top">
            {/* LEFT — TOP STORIES */}

            <aside className="mk-left">
              <div className="mk-rule-head">
                <h2 className="mk-rule-title">Top Stories</h2>
              </div>

              {topStories.map((item) => (
                <Link
                  key={item.id}
                  to={octEditionArticlePath(item)}
                  className="mk-left-item"
                >
                  <span className="mk-kicker">{item.industry}</span>

                  <h3 className="mk-left-title">{item.title}</h3>

                  <span className="mk-date" style={{ marginTop: 8 }}>
                    <Clock size={10} />
                    {item.publishedAt}
                  </span>
                </Link>
              ))}
            </aside>

            {/* CENTRE — LEAD STORY */}

            <div className="mk-center">
              <Link to={octEditionArticlePath(leadStory)} className="mk-lead-link">
                <div className="mk-lead-img-wrap">
                  <ImageWithFallback
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="mk-lead-img"
                  />
                </div>

                <span className="mk-kicker" style={{ marginTop: 14 }}>
                  {leadStory.industry} · {leadStory.location}
                </span>

                <h1 className="mk-lead-title">{leadStory.title}</h1>

                <p className="mk-lead-lede">{leadStory.lede}</p>

                <div className="mk-meta">
                  <span>By {leadStory.author}</span>
                  <span className="mk-meta-sep">|</span>
                  <span>{leadStory.publishedAt}</span>
                  <span className="mk-meta-sep">|</span>
                  <span>{leadStory.readTime}</span>
                </div>
              </Link>

              {subStories.length > 0 && (
                <div className="mk-sub-row">
                  {subStories.map((item) => (
                    <Link
                      key={item.id}
                      to={octEditionArticlePath(item)}
                      className="mk-sub"
                    >
                      <div className="mk-sub-img-wrap">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="mk-sub-img"
                        />
                      </div>

                      <span className="mk-kicker" style={{ marginTop: 12 }}>
                        {item.industry}
                      </span>

                      <h3 className="mk-sub-title">{item.title}</h3>

                      <p className="mk-sub-lede">{item.lede}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — MARKETS PANEL, EDITOR'S PICK, GLANCE */}

            <aside className="mk-right mk-top-right">
              <div className="mk-panel">
                <div className="mk-panel-head">
                  <h3 className="mk-panel-title">Markets</h3>

                  <div className="mk-tabs-inline">
                    {(["Indices", "Crypto"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveMarketTab(tab)}
                        className={`mk-tab-inline ${
                          activeMarketTab === tab ? "is-active" : ""
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {quotes.length === 0 && (
                  <p className="mk-panel-empty">Loading live quotes…</p>
                )}

                {quotes.slice(0, 6).map((market) => (
                  <div key={market.symbol} className="mk-quote-row">
                    <span className="mk-quote-name">{market.symbol}</span>

                    <span className="mk-quote-value">{market.value}</span>

                    <span
                      className={`mk-quote-change ${market.up ? "is-up" : "is-down"}`}
                    >
                      {market.up ? (
                        <TrendingUp size={11} strokeWidth={2.25} />
                      ) : (
                        <TrendingDown size={11} strokeWidth={2.25} />
                      )}
                      {market.change}
                    </span>
                  </div>
                ))}

                <Link to={marketTabPath("Overview")} className="mk-panel-foot">
                  View all markets →
                </Link>
              </div>

              {editorsPick && (
                <div>
                  <SectionHeader
                    title="Editor's Pick"
                    link={editorsPick.sectionPath}
                    linkText="Explore More"
                  />

                  <Link
                    to={octEditionArticlePath(editorsPick)}
                    className="mk-pick-link"
                    style={{ marginTop: 0 }}
                  >
                    <div className="mk-pick-img-wrap">
                      <ImageWithFallback
                        src={editorsPick.image}
                        alt={editorsPick.title}
                        className="mk-pick-img"
                      />
                    </div>

                    <span className="mk-kicker" style={{ marginTop: 12 }}>
                      {editorsPick.industry}
                    </span>

                    <h3 className="mk-pick-title-sm">{editorsPick.title}</h3>
                  </Link>
                </div>
              )}

              {marketGlance.length > 0 && (
                <div>
                  <SectionHeader title="Numbers at a Glance" />

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
            </aside>
          </section>

          {/* =================================================
              ADVERTISEMENT
          ================================================= */}

          <PrideTimesAd variant="first" className="mk-ad" />

          {/* =================================================
              LATEST MARKETS NEWS
          ================================================= */}

          <section className="mk-latest">
            <SectionHeader
              title={`Latest Markets News · ${octEditionMeta.edition} · ${octEditionMeta.date}`}
            />

            <p className="mk-intro">
              Markets coverage: the global economy and inflation, energy and oil
              prices, AI spending and funding, and deals.
            </p>

            <div className="mk-filters">
              {latestNewsTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => selectTab(tab)}
                  className={`mk-filter ${activeNewsTab === tab ? "is-active" : ""}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {latestStories.length === 0 ? (
              <p className="mk-empty">No stories in this category yet.</p>
            ) : (
              <div className="mk-grid">
                {latestStories.map((story) => (
                  <Link
                    key={story.id}
                    to={octEditionArticlePath(story)}
                    className="mk-card"
                  >
                    <div className="mk-card-img-wrap">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="mk-card-img"
                      />
                    </div>

                    <span className="mk-kicker" style={{ marginTop: 14 }}>
                      {story.industry}
                    </span>

                    <h3 className="mk-card-title">{story.title}</h3>

                    <p className="mk-card-lede">{story.lede}</p>

                    <div className="mk-meta">
                      <span>{story.location}</span>
                      <span className="mk-meta-sep">|</span>
                      <span>{story.publishedAt}</span>
                      <span className="mk-meta-sep">|</span>
                      <span>{story.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

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

          <PrideTimesAd variant="second" className="mk-ad" />

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
