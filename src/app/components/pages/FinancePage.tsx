import { Clock, TrendingUp, TrendingDown, BarChart2, DollarSign, Globe, Briefcase } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import InsImg from "../../../imports/Insightimage.png";
import LN4Img from "../../../imports/LN4image.png";
import FIN3Img from "../../../imports/FIN3.png";
import FIN4Img from "../../../imports/FIN4.png";
import FIN5Img from "../../../imports/FIN5.png";

/* =========================================================
   MARKET DATA
========================================================= */

const fullMarkets = [
  { symbol: "DOW JONES", value: "42,318.45", change: "+0.82%", pts: "+343.89", up: true },
  { symbol: "S&P 500", value: "5,892.31", change: "+1.14%", pts: "+66.43", up: true },
  { symbol: "NASDAQ COMPOSITE", value: "19,245.78", change: "+1.56%", pts: "+296.12", up: true },
  { symbol: "RUSSELL 2000", value: "2,134.56", change: "+0.45%", pts: "+9.56", up: true },
  { symbol: "NIFTY 50", value: "24,678.90", change: "-0.34%", pts: "-84.21", up: false },
  { symbol: "BSE SENSEX", value: "81,245.60", change: "-0.21%", pts: "-170.61", up: false },
  { symbol: "FTSE 100", value: "8,456.23", change: "+0.67%", pts: "+56.23", up: true },
  { symbol: "DAX (Germany)", value: "19,134.55", change: "+0.43%", pts: "+81.88", up: true },
  { symbol: "CAC 40 (France)", value: "7,823.45", change: "+0.31%", pts: "+24.22", up: true },
  { symbol: "NIKKEI 225", value: "39,876.34", change: "-0.55%", pts: "-219.32", up: false },
  { symbol: "HANG SENG", value: "18,456.78", change: "+2.13%", pts: "+383.56", up: true },
  { symbol: "SHANGHAI COMP", value: "3,187.45", change: "+0.89%", pts: "+28.12", up: true },
  { symbol: "CRUDE OIL (WTI)", value: "$78.45", change: "-1.23%", pts: "-0.97", up: false },
  { symbol: "BRENT CRUDE", value: "$82.31", change: "-1.05%", pts: "-0.87", up: false },
  { symbol: "GOLD", value: "$2,345.60", change: "+0.89%", pts: "+20.71", up: true },
  { symbol: "SILVER", value: "$29.87", change: "+1.23%", pts: "+0.36", up: true },
  { symbol: "BITCOIN", value: "$67,234.50", change: "+3.45%", pts: "+2,237", up: true },
  { symbol: "ETHEREUM", value: "$3,456.78", change: "+2.87%", pts: "+96.54", up: true },
  { symbol: "EUR/USD", value: "1.0876", change: "-0.12%", pts: "-0.001", up: false },
  { symbol: "USD/JPY", value: "149.34", change: "+0.34%", pts: "+0.51", up: true },
  { symbol: "US 10Y YIELD", value: "4.32%", change: "+0.05%", pts: "+0.05", up: true },
  { symbol: "US 2Y YIELD", value: "4.87%", change: "+0.03%", pts: "+0.03", up: true },
];

/* =========================================================
   HERO STORIES
========================================================= */

const financeHero = {
  category: "GLOBAL ECONOMY",
  title: "U.S. Equity Markets Rally on Strong Manufacturing Data ",
  excerpt:
    "U.S. equity markets extended a recovery rally into the first week of June, driven by stronger-than-expected domestic factory data and a continued surge in technology stocks. The ISM Manufacturing Index reached 54 for May, up 1.3 points from April's reading and exceeding the consensus Dow Jones estimate of 53.2. New orders rose 2.7 points to 56.8, while imports jumped to 53. The energy sector was the only other S&P 500 segment to finish in the green alongside technology on June 1.The performance underscores the resilience of U.S. corporate earnings despite ongoing global trade uncertainties and evolving tariff structures. Investors have rotated capital into sectors with strong AI and infrastructure exposure, with Nvidia, Microsoft, and a cluster of data center-linked names leading the rally. ",
  author: "Sagar Kumar",
  time: "2 hours ago",
  image: InsImg,
};

const financeHero1 = {
  category: "GLOBAL ECONOMY",
  title: "Berkshire Hathaway Acquires Home Builder Taylor Morrison for $6.8 Billion  ",
  excerpt:
    "Warren Buffett's Berkshire Hathaway has agreed to acquire Taylor Morrison Home Corporation in an all-cash deal valued at approximately $6.8 billion, marking the conglomerate's most significant real estate bet in years. The transaction reflects Berkshire's conviction that U.S. housing demand — particularly in the sunbelt and suburban markets — will remain structurally robust amid ongoing population growth and undersupply.Taylor Morrison operates in 11 states and is among the top 10 homebuilders in the United States by revenue. Berkshire's acquisition is expected to close in the second half of 2026, subject to regulatory approvals.  ",
  author: "Sagar Kumar",
  time: "2 hours ago",
  image: LN4Img,
};

const financeHero2 = {
  category: "GLOBAL ECONOMY",
  title: "Fertitta Entertainment to Acquire Caesars Entertainment for $17.6 Billion  ",
  excerpt:
    "Tilman Fertitta's Fertitta Entertainment has announced a landmark agreement to acquire Caesars Entertainment in a deal valued at approximately $17.6 billion, inclusive of Caesars' existing debt. The transaction is one of the largest in the gaming and hospitality sector in recent memory and would create a dominant force in the North American integrated resort industry.Fertitta, whose portfolio includes the Golden Nugget casino chain and the Houston Rockets NBA franchise, has long targeted Caesars as a strategic acquisition. The deal is expected to face scrutiny from gaming regulators in multiple states as well as the Federal Trade Commission, though analysts believe the transaction structure has been designed to address antitrust concerns. ",
  author: "Sagar Kumar",
  time: "2 hours ago",
  image: FIN3Img,
};

const financeHero3 = {
  category: "GLOBAL ECONOMY",
  title: "Scotiabank to Acquire Maple Financial in Wealth Expansion Play  ",
  excerpt:
    "Canada's Bank of Nova Scotia (Scotiabank) has entered a definitive agreement to acquire Maple Financial Group, a Toronto-based wealth and capital markets firm. The acquisition advances Scotiabank's strategic goal of deepening its domestic wealth management franchise after several years of international retrenchment. The combined business is expected to deliver meaningful cross-selling opportunities across Scotiabank's eight million-plus Canadian retail and commercial clients. ",
  author: "Sagar Kumar",
  time: "2 hours ago",
  image: FIN4Img,
};

const financeHero4 = {
  category: "GLOBAL ECONOMY",
  title: "AIG Moves to Acquire Everest Insurance Operations in Colombia",
  excerpt:
    "American International Group has announced an agreement to acquire Everest Group's insurance operations in Colombia, extending AIG's presence in Latin America's growing insurance market. The move follows AIG's earlier acquisition of strategic stakes in Convex Group and Onex Corporation, reflecting a broader strategy to diversify revenue streams through specialty and alternative investment channels.  ",
  author: "Sagar Kumar",
  time: "2 hours ago",
  image: FIN5Img,
};

/* =========================================================
   BUSINESS STORIES
========================================================= */

const businessStories = [
  {
    id: 1,
    category: "MERGERS & ACQUISITIONS",
    title: "Amazon Acquires Nuclear Energy Company for $12B to Power AWS Data Centers",
    time: "1 hr ago",
    image:
      "https://images.unsplash.com/photo-1679583721525-658d164e609b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    category: "BANKING",
    title: "JPMorgan Reports Record $18.2B Quarterly Profit as Trading Revenue Surges",
    time: "3 hrs ago",
    image:
      "https://images.unsplash.com/photo-1648275913341-7973ae7bc9b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

/* =========================================================
   LEADERSHIP
========================================================= */

const leadershipStories = [
  {
    id: 1,
    name: "Satya Nadella",
    title: "Microsoft CEO",
    quote:
      "AI will generate more value than the industrial revolution in a shorter time frame.",
    action: "Read Full Interview",
  },
  {
    id: 2,
    name: "Mary Barra",
    title: "General Motors CEO",
    quote:
      "We're not just building cars anymore — we're building the future of mobility and energy.",
    action: "Read Full Interview",
  },
  {
    id: 3,
    name: "Sundar Pichai",
    title: "Alphabet CEO",
    quote:
      "The AI opportunity is bigger than the internet, mobile, and cloud combined.",
    action: "Read Full Interview",
  },
];

/* =========================================================
   ECONOMY
========================================================= */

const economyTopics = [
  {
    id: 1,
    title:
      "ECB raises rates amid renewed inflation concerns as AI infrastructure spending keeps market volatility elevated.",
    time: "Just now",
  },
  {
    id: 2,
    title: "Fed Holds Rates at 4.75% — Markets Price in Three Cuts by Year-End",
    time: "2 hrs ago",
  },
  {
    id: 3,
    title: "US Inflation Falls to 2.1%, Lowest Level Since Pre-Pandemic Era",
    time: "4 hrs ago",
  },
  {
    id: 3,
    title: "China's GDP Growth Hits 5.1% in Q1, Beats Consensus Estimate",
    time: "5 hrs ago",
  },
  {
    id: 4,
    title:
      "India's Foreign Exchange Reserves Cross $700 Billion for First Time",
    time: "6 hrs ago",
  },
  {
    id: 5,
    title:
      "Eurozone Manufacturing PMI Rebounds to 52.4, Signaling Recovery",
    time: "8 hrs ago",
  },
  {
    id: 6,
    title:
      "ASEAN Trade Volume Sets Record at $4.2 Trillion in 2025",
    time: "10 hrs ago",
  },
];

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="finance-section-header">
      <h2>{title}</h2>

      {action && (
        <button className="finance-see-all">
          {action}
        </button>
      )}
    </div>
  );
}

/* =========================================================
   AD BANNER
========================================================= */

function AdBanner({ bottom = false }: { bottom?: boolean }) {
  return (
    <div className="finance-ad-banner">
      <span className="finance-ad-label">GOOGLE ADSENSE</span>

      <strong>
        {bottom
          ? "Business Solutions | Powered by The Pride Times"
          : "Advertisement Space"}
      </strong>

      <small>728 × 90 • Leaderboard</small>

      <span className="finance-ad-tag">Advertisement</span>
    </div>
  );
}

/* =========================================================
   SPONSORED CONTENT
========================================================= */

function SponsoredContent() {
  return (
    <aside className="finance-sponsored">
      <div className="finance-sponsored-label">
        <span>SPONSORED CONTENT</span>
        <span>Ad</span>
      </div>

      <div className="finance-sponsored-box">
        <span>FEATURED PARTNER</span>
        <strong>Your Ad Here</strong>
        <small>Reach 2M+ business readers</small>
      </div>

      <SectionHeader title="MORE STORIES" />

      <div className="finance-more-stories">
        <div className="finance-more-story">
          <div className="finance-more-thumb">
            <ImageWithFallback
              src={LN4Img}
              alt={financeHero1.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <span>FINANCE</span>
            <h4>Berkshire Hathaway Acquires Home Builder Taylor Morrison</h4>
            <small>2 hrs ago</small>
          </div>
        </div>

        <div className="finance-more-story">
          <div className="finance-more-thumb">
            <ImageWithFallback
              src={FIN3Img}
              alt={financeHero2.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <span>BUSINESS</span>
            <h4>Fertitta Entertainment Announces Major Caesars Deal</h4>
            <small>4 hrs ago</small>
          </div>
        </div>

        <div className="finance-more-story">
          <div className="finance-more-thumb">
            <ImageWithFallback
              src={FIN4Img}
              alt={financeHero3.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <span>MARKETS</span>
            <h4>Scotiabank Expands Wealth Management Operations</h4>
            <small>6 hrs ago</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   HERO ARTICLE
========================================================= */

function HeroArticle() {
  return (
    <article className="finance-main-story group">
      <div className="finance-main-image-wrap">
        <ImageWithFallback
          src={financeHero.image}
          alt={financeHero.title}
          className="finance-main-image"
        />
      </div>

      <span className="finance-category">
        {financeHero.category}
      </span>

      <h1>{financeHero.title}</h1>

      <p>{financeHero.excerpt}</p>

      <div className="finance-meta">
        <span>By {financeHero.author}</span>

        <span>
          <Clock size={10} strokeWidth={2} />
          {financeHero.time}
        </span>
      </div>
    </article>
  );
}

/* =========================================================
   STORY CARD
========================================================= */

function StoryCard({
  story,
}: {
  story: {
    category: string;
    title: string;
    excerpt?: string;
    author?: string;
    time: string;
    image: any;
  };
}) {
  return (
    <article className="finance-story-card group">
      <div className="finance-story-image-wrap">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="finance-story-image"
        />
      </div>

      <span className="finance-category">
        {story.category}
      </span>

      <h3>{story.title}</h3>

      {story.excerpt && (
        <p>{story.excerpt}</p>
      )}

      <div className="finance-meta">
        {story.author && (
          <span>By {story.author}</span>
        )}

        <span>
          <Clock size={10} strokeWidth={2} />
          {story.time}
        </span>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function FinancePage() {
  const latestStories = [
    financeHero1,
    financeHero2,
    financeHero3,
    financeHero4,
    businessStories[0],
    businessStories[1],
  ];

  return (
    <main className="finance-page">
      <div className="finance-page-inner">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="finance-heading">
          <div>
            <h1>Finance</h1>

            <p>
              Markets, business, economy, corporate news, and global finance.
            </p>
          </div>
        </header>

        {/* =================================================
            ADVERTISEMENT
        ================================================= */}

        <AdBanner />

        {/* =================================================
            HERO + SPONSORED SIDEBAR
        ================================================= */}

        <section className="finance-hero-layout">

          <div className="finance-hero-column">
            <HeroArticle />
          </div>

          <SponsoredContent />

        </section>

        {/* =================================================
            LATEST FINANCE NEWS
        ================================================= */}

        <section className="finance-section">
          <SectionHeader title="Latest Finance News" />

          <div className="finance-news-grid">
            {latestStories.map((story, index) => (
              <StoryCard
                key={`${story.title}-${index}`}
                story={story}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <AdBanner bottom />

        {/* =================================================
            SPONSORSHIP
        ================================================= */}

        <section className="finance-sponsorship">
          <div className="finance-sponsorship-heading">
            <span>SPONSORSHIP</span>
            <small>Presented by our partners</small>
          </div>

          <div className="finance-sponsor-grid">

            <div className="finance-sponsor-card">
              <div className="finance-sponsor-icon">
                <BarChart2 size={18} />
              </div>
              <strong>Global Finance Summit 2026</strong>
              <span>Sponsored Event</span>
            </div>

            <div className="finance-sponsor-card">
              <div className="finance-sponsor-icon">
                <Briefcase size={18} />
              </div>
              <strong>Tech Leaders Forum</strong>
              <span>Sponsored Event</span>
            </div>

            <div className="finance-sponsor-card">
              <div className="finance-sponsor-icon">
                <DollarSign size={18} />
              </div>
              <strong>Energy Transition Conference</strong>
              <span>Sponsored Event</span>
            </div>

            <div className="finance-sponsor-card">
              <div className="finance-sponsor-icon">
                <Globe size={18} />
              </div>
              <strong>AI & Business World</strong>
              <span>Sponsored Event</span>
            </div>

          </div>
        </section>

        {/* =================================================
            GLOBAL MARKETS
        ================================================= */}

        <section className="finance-section">
          <SectionHeader
            title="Global Markets Overview"
            action="View All Markets"
          />

          <div className="finance-markets-table-wrap">
            <table className="finance-markets-table">
              <thead>
                <tr>
                  <th>Index / Asset</th>
                  <th>Price</th>
                  <th>Change</th>
                  <th>Points</th>
                </tr>
              </thead>

              <tbody>
                {fullMarkets.map((market) => (
                  <tr key={market.symbol}>
                    <td>{market.symbol}</td>

                    <td>
                      {market.value}
                    </td>

                    <td>
                      <span
                        className={
                          market.up
                            ? "finance-up"
                            : "finance-down"
                        }
                      >
                        {market.up ? (
                          <TrendingUp size={11} />
                        ) : (
                          <TrendingDown size={11} />
                        )}

                        {market.change}
                      </span>
                    </td>

                    <td
                      className={
                        market.up
                          ? "finance-up"
                          : "finance-down"
                      }
                    >
                      {market.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================
            BUSINESS + ECONOMY
        ================================================= */}

        <section className="finance-two-column">

          <div>
            <SectionHeader title="Business" />

            <div className="finance-business-list">
              {businessStories.map((story) => (
                <article
                  key={story.id}
                  className="finance-business-story"
                >
                  <div className="finance-business-image">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="finance-category">
                      {story.category}
                    </span>

                    <h3>{story.title}</h3>

                    <span className="finance-meta">
                      <Clock size={10} />
                      {story.time}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Economy & Policy" />

            <div className="finance-economy-list">
              {economyTopics.map((item, index) => (
                <article
                  key={`${item.id}-${index}`}
                  className="finance-economy-item"
                >
                  <h3>{item.title}</h3>

                  <span>
                    <Clock size={10} />
                    {item.time}
                  </span>
                </article>
              ))}
            </div>
          </div>

        </section>

        {/* =================================================
            LEADERSHIP
        ================================================= */}

        <section className="finance-section">
          <SectionHeader title="Leadership Voices" />

          <div className="finance-leadership-grid">
            {leadershipStories.map((leader) => (
              <article
                key={leader.id}
                className="finance-leader-card"
              >
                <div className="finance-leader-avatar">
                  {leader.name.charAt(0)}
                </div>

                <strong>{leader.name}</strong>

                <span>{leader.title}</span>

                <blockquote>
                  "{leader.quote}"
                </blockquote>

                <button>
                  {leader.action}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <section className="finance-newsletter">
          <h2>Stay Ahead with The Pride Times</h2>

          <p>
            Daily briefings on Finance delivered to your inbox.
          </p>

          <div className="finance-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
            />

            <button>
              Subscribe Free
            </button>
          </div>
        </section>

      </div>

      {/* =================================================
          PAGE SCOPED CSS
      ================================================= */}

      <style>{`

        /* =====================================================
           BASE
        ===================================================== */

        .finance-page {
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
          color: #17140f;
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }

        .finance-page-inner {
          width: calc(100% - 88px);
          margin: 0 auto;
          padding: 22px 0 70px;
        }

        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .finance-heading {
          border-top: 4px solid #e31b23;
          padding: 17px 0 14px;
          margin-bottom: 24px;
        }

        .finance-heading h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4vw, 48px);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .finance-heading p {
          margin: 8px 0 0;
          color: #777;
          font-size: 13px;
          line-height: 1.5;
        }

        /* =====================================================
           AD
        ===================================================== */

        .finance-ad-banner {
          position: relative;
          min-height: 90px;
          margin: 0 0 18px;
          background:
            linear-gradient(
              90deg,
              #102a31 0%,
              #173b44 50%,
              #2d5965 100%
            );
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .finance-ad-label {
          color: #53b6d1;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .finance-ad-banner strong {
          margin-top: 5px;
          font-size: 13px;
          font-weight: 700;
        }

        .finance-ad-banner small {
          margin-top: 3px;
          color: #8eb9c5;
          font-size: 8px;
        }

        .finance-ad-tag {
          position: absolute;
          right: 4px;
          top: 4px;
          padding: 2px 4px;
          color: #777;
          background: white;
          font-size: 7px;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .finance-hero-layout {
          display: grid;
          grid-template-columns: minmax(0, 3.25fr) minmax(250px, 1fr);
          gap: 18px;
          margin-top: 14px;
          padding-bottom: 42px;
          border-bottom: 1px solid #222;
        }

        .finance-hero-column {
          min-width: 0;
        }

        .finance-main-image-wrap {
          width: 100%;
          height: 365px;
          overflow: hidden;
          border-radius: 7px;
          background: #eee;
        }

        .finance-main-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .finance-main-story:hover .finance-main-image {
          transform: scale(1.025);
        }

        .finance-category {
          display: block;
          margin-top: 9px;
          color: #e31b23;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .finance-main-story h1 {
          margin: 5px 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(25px, 3vw, 35px);
          line-height: 1.08;
          font-weight: 800;
          letter-spacing: -0.025em;
        }

        .finance-main-story p {
          max-width: 1050px;
          margin: 8px 0 0;
          color: #666;
          font-size: 13px;
          line-height: 1.55;
        }

        .finance-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 9px;
          color: #999;
          font-size: 9px;
        }

        .finance-meta span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* =====================================================
           SPONSORED
        ===================================================== */

        .finance-sponsored {
          min-width: 0;
          border-left: 1px solid #ddd;
          padding-left: 15px;
        }

        .finance-sponsored-label {
          display: flex;
          justify-content: space-between;
          color: #999;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .finance-sponsored-box {
          height: 170px;
          margin-top: 7px;
          background: #121a38;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .finance-sponsored-box span {
          color: #f0ce39;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .finance-sponsored-box strong {
          margin-top: 8px;
          font-size: 13px;
        }

        .finance-sponsored-box small {
          margin-top: 5px;
          color: #b8bfd0;
          font-size: 8px;
        }

        /* =====================================================
           SECTION HEADER
        ===================================================== */

        .finance-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          border-bottom: 2px solid #222;
          padding-bottom: 7px;
          margin-bottom: 13px;
        }

        .finance-section-header h2 {
          margin: 0;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.03em;
        }

        .finance-see-all {
          border: 0;
          background: transparent;
          color: #e31b23;
          font-size: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        /* =====================================================
           MORE STORIES
        ===================================================== */

        .finance-sponsored .finance-section-header {
          margin-top: 12px;
          margin-bottom: 5px;
        }

        .finance-more-story {
          display: grid;
          grid-template-columns: 60px minmax(0, 1fr);
          gap: 9px;
          padding: 9px 0;
          border-bottom: 1px solid #ddd;
        }

        .finance-more-thumb {
          width: 60px;
          height: 48px;
          overflow: hidden;
          border-radius: 3px;
          background: #eee;
        }

        .finance-more-story span {
          color: #e31b23;
          font-size: 6px;
          font-weight: 800;
        }

        .finance-more-story h4 {
          margin: 2px 0 0;
          font-size: 9px;
          line-height: 1.25;
        }

        .finance-more-story small {
          display: block;
          margin-top: 3px;
          color: #aaa;
          font-size: 7px;
        }

        /* =====================================================
           LATEST NEWS
        ===================================================== */

        .finance-section {
          margin-top: 28px;
        }

        .finance-news-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .finance-story-card {
          min-width: 0;
        }

        .finance-story-image-wrap {
          width: 100%;
          height: 165px;
          overflow: hidden;
          border-radius: 5px;
          background: #eee;
        }

        .finance-story-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .finance-story-card:hover .finance-story-image {
          transform: scale(1.04);
        }

        .finance-story-card h3 {
          margin: 4px 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 16px;
          line-height: 1.15;
          font-weight: 800;
        }

        .finance-story-card p {
          margin: 5px 0 0;
          color: #666;
          font-size: 11px;
          line-height: 1.45;
        }

        /* =====================================================
           SPONSORSHIP
        ===================================================== */

        .finance-sponsorship {
          margin-top: 24px;
          padding: 15px;
          background: #f7f7f7;
          border-radius: 6px;
        }

        .finance-sponsorship-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 13px;
        }

        .finance-sponsorship-heading span {
          padding: 3px 6px;
          border: 1px solid #ddd;
          color: #999;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .finance-sponsorship-heading small {
          color: #aaa;
          font-size: 8px;
        }

        .finance-sponsor-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .finance-sponsor-card {
          min-height: 95px;
          background: white;
          border: 1px solid #e3e3e3;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 12px;
        }

        .finance-sponsor-icon {
          width: 30px;
          height: 30px;
          margin-bottom: 8px;
          border-radius: 50%;
          background: #fff0f0;
          color: #e31b23;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .finance-sponsor-card strong {
          font-size: 9px;
        }

        .finance-sponsor-card span {
          margin-top: 3px;
          color: #aaa;
          font-size: 7px;
        }

        /* =====================================================
           MARKETS
        ===================================================== */

        .finance-markets-table-wrap {
          overflow-x: auto;
          border-top: 1px solid #222;
          border-bottom: 1px solid #222;
        }

        .finance-markets-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 650px;
          font-size: 10px;
        }

        .finance-markets-table th {
          padding: 9px;
          text-align: right;
          color: #777;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-bottom: 1px solid #ccc;
        }

        .finance-markets-table th:first-child,
        .finance-markets-table td:first-child {
          text-align: left;
        }

        .finance-markets-table td {
          padding: 8px 9px;
          text-align: right;
          border-bottom: 1px solid #eee;
        }

        .finance-markets-table tbody tr:hover {
          background: #fafafa;
        }

        .finance-up {
          color: #14853c;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .finance-down {
          color: #d71920;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        /* =====================================================
           BUSINESS + ECONOMY
        ===================================================== */

        .finance-two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 35px;
          margin-top: 32px;
          padding-top: 10px;
          border-top: 2px solid #222;
        }

        .finance-business-list {
          display: grid;
          gap: 14px;
        }

        .finance-business-story {
          display: grid;
          grid-template-columns: 145px minmax(0, 1fr);
          gap: 13px;
          padding-bottom: 13px;
          border-bottom: 1px solid #ddd;
        }

        .finance-business-image {
          height: 95px;
          overflow: hidden;
          border-radius: 4px;
        }

        .finance-business-story h3 {
          margin: 4px 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 15px;
          line-height: 1.15;
        }

        .finance-economy-item {
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
        }

        .finance-economy-item h3 {
          margin: 0;
          font-size: 12px;
          line-height: 1.4;
          font-weight: 700;
        }

        .finance-economy-item span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 5px;
          color: #999;
          font-size: 8px;
        }

        /* =====================================================
           LEADERSHIP
        ===================================================== */

        .finance-leadership-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .finance-leader-card {
          padding: 16px;
          border: 1px solid #ddd;
          background: #fff;
        }

        .finance-leader-avatar {
          width: 36px;
          height: 36px;
          margin-bottom: 8px;
          border-radius: 50%;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #555;
        }

        .finance-leader-card strong {
          display: block;
          font-size: 12px;
        }

        .finance-leader-card > span {
          display: block;
          margin-top: 2px;
          color: #999;
          font-size: 8px;
        }

        .finance-leader-card blockquote {
          margin: 12px 0;
          padding-left: 10px;
          border-left: 2px solid #e31b23;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 12px;
          line-height: 1.45;
          color: #555;
          font-style: italic;
        }

        .finance-leader-card button {
          border: 0;
          background: transparent;
          padding: 0;
          color: #e31b23;
          font-size: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        /* =====================================================
           NEWSLETTER
        ===================================================== */

        .finance-newsletter {
          margin-top: 40px;
          padding: 34px 20px;
          border-radius: 6px;
          background: #071a2d;
          color: white;
          text-align: center;
        }

        .finance-newsletter h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 22px;
        }

        .finance-newsletter p {
          margin: 7px 0 16px;
          color: #aeb9c4;
          font-size: 10px;
        }

        .finance-newsletter-form {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          max-width: 520px;
          margin: 0 auto;
        }

        .finance-newsletter-form input {
          flex: 1;
          min-width: 0;
          height: 36px;
          padding: 0 12px;
          border: 1px solid #405265;
          border-radius: 3px;
          outline: none;
          background: #1e3448;
          color: white;
          font-size: 10px;
        }

        .finance-newsletter-form button {
          height: 36px;
          padding: 0 16px;
          border: 0;
          border-radius: 3px;
          background: #e31b23;
          color: white;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1000px) {

          .finance-page-inner {
            width: calc(100% - 40px);
          }

          .finance-hero-layout {
            grid-template-columns: 1fr;
          }

          .finance-sponsored {
            border-left: 0;
            border-top: 1px solid #ddd;
            padding-left: 0;
            padding-top: 18px;
          }

          .finance-sponsored-box {
            max-width: 320px;
          }

          .finance-news-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .finance-sponsor-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .finance-two-column {
            grid-template-columns: 1fr;
            gap: 30px;
          }

        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 640px) {

          .finance-page-inner {
            width: calc(100% - 22px);
            padding-top: 12px;
          }

          .finance-heading {
            padding-top: 13px;
          }

          .finance-heading h1 {
            font-size: 34px;
          }

          .finance-heading p {
            font-size: 11px;
          }

          .finance-ad-banner {
            min-height: 78px;
          }

          .finance-main-image-wrap {
            height: 235px;
          }

          .finance-main-story h1 {
            font-size: 25px;
          }

          .finance-main-story p {
            font-size: 11px;
          }

          .finance-news-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .finance-story-image-wrap {
            height: 190px;
          }

          .finance-sponsor-grid {
            grid-template-columns: 1fr 1fr;
          }

          .finance-business-story {
            grid-template-columns: 105px minmax(0, 1fr);
          }

          .finance-business-image {
            height: 82px;
          }

          .finance-business-story h3 {
            font-size: 12px;
          }

          .finance-leadership-grid {
            grid-template-columns: 1fr;
          }

          .finance-newsletter {
            padding: 28px 14px;
          }

          .finance-newsletter h2 {
            font-size: 19px;
          }

          .finance-newsletter-form {
            flex-direction: column;
            width: 100%;
          }

          .finance-newsletter-form input,
          .finance-newsletter-form button {
            width: 100%;
          }

        }

      `}</style>
    </main>
  );
}
