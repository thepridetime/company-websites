import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, ChevronRight, TrendingUp, TrendingDown, BarChart2, DollarSign, Globe, Briefcase } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import InsImg from "../../../imports/Insightimage.png";
import LN4Img from "../../../imports/LN4image.png";
import FIN3Img from "../../../imports/FIN3.png";
import FIN4Img from "../../../imports/FIN4.png";
import FIN5Img from "../../../imports/FIN5.png";

function SectionHeader({ title, id }: { title: string; id?: string }) {
  return (
    <div id={id} className="finance-section-header">
      <h2>{title}</h2>
    </div>
  );
}

const spData = [
  { date: "Jan", value: 4800 },
  { date: "Feb", value: 4950 },
  { date: "Mar", value: 5100 },
  { date: "Apr", value: 5050 },
  { date: "May", value: 5400 },
  { date: "Jun", value: 5350 },
  { date: "Jul", value: 5600 },
  { date: "Aug", value: 5750 },
  { date: "Sep", value: 5650 },
  { date: "Oct", value: 5800 },
  { date: "Nov", value: 5750 },
  { date: "Dec", value: 5892 },
];

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

const businessStories = [
  {
    id: 1,
    category: "MERGERS & ACQUISITIONS",
    title: "Amazon Acquires Nuclear Energy Company for $12B to Power AWS Data Centers",
    time: "1 hr ago",
    image: "https://images.unsplash.com/photo-1679583721525-658d164e609b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    category: "BANKING",
    title: "JPMorgan Reports Record $18.2B Quarterly Profit as Trading Revenue Surges",
    time: "3 hrs ago",
    image: "https://images.unsplash.com/photo-1648275913341-7973ae7bc9b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const leadershipStories = [
  { id: 1, name: "Satya Nadella", title: "Microsoft CEO", quote: "AI will generate more value than the industrial revolution in a shorter time frame.", action: "Read Full Interview" },
  { id: 2, name: "Mary Barra", title: "General Motors CEO", quote: "We're not just building cars anymore — we're building the future of mobility and energy.", action: "Read Full Interview" },
  { id: 3, name: "Sundar Pichai", title: "Alphabet CEO", quote: "The AI opportunity is bigger than the internet, mobile, and cloud combined.", action: "Read Full Interview" },
];

const economyTopics = [
  { id: 1, title: "ECB raises rates amid renewed inflation concerns as AI infrastructure spending keeps market volatility elevated.", time: "Just now" },
  { id: 2, title: "Fed Holds Rates at 4.75% — Markets Price in Three Cuts by Year-End", time: "2 hrs ago" },
  { id: 3, title: "US Inflation Falls to 2.1%, Lowest Level Since Pre-Pandemic Era", time: "4 hrs ago" },
  { id: 3, title: "China's GDP Growth Hits 5.1% in Q1, Beats Consensus Estimate", time: "5 hrs ago" },
  { id: 4, title: "India's Foreign Exchange Reserves Cross $700 Billion for First Time", time: "6 hrs ago" },
  { id: 5, title: "Eurozone Manufacturing PMI Rebounds to 52.4, Signaling Recovery", time: "8 hrs ago" },
  { id: 6, title: "ASEAN Trade Volume Sets Record at $4.2 Trillion in 2025", time: "10 hrs ago" },
];

function FinanceHeroCard({ story, size = "large" }: { story: any; size?: "large" | "compact" }) {
  if (size === "compact") {
    return (
      <article className="finance-story-card finance-story-card--compact">
        <div className="finance-story-image-wrap">
          <ImageWithFallback
            src={story.image}
            alt={story.title}
            className="finance-story-image finance-story-image--compact"
          />
        </div>
        <span className="finance-story-category">{story.category}</span>
        <h3>{story.title}</h3>
        <p className="finance-story-excerpt">{story.excerpt}</p>
        <div className="finance-story-meta">
          <span>By {story.author}</span>
          <span><Clock size={10} /> {story.time}</span>
        </div>
      </article>
    );
  }

  return (
    <article className="finance-story-card finance-story-card--hero">
      <div className="finance-story-image-wrap finance-story-image-wrap--hero">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="finance-story-image finance-story-image--hero"
        />
      </div>
      <span className="finance-story-category">{story.category}</span>
      <h1>{story.title}</h1>
      <p className="finance-story-excerpt finance-story-excerpt--hero">{story.excerpt}</p>
      <div className="finance-story-meta">
        <span>By {story.author}</span>
        <span><Clock size={10} /> {story.time}</span>
      </div>
    </article>
  );
}

export function FinancePage() {
  return (
    <main className="finance-page">
      <div className="finance-container">

        {/* Bloomberg-style page masthead */}
        <header className="finance-page-header">
          <div>
            <span className="finance-eyebrow">Markets & Business</span>
            <h1>Finance &amp; Business News</h1>
          </div>
          <span className="finance-header-date">THE PRIDE TIMES • FINANCE</span>
        </header>

        {/* Compact market navigation */}
        <nav className="finance-topic-bar" aria-label="Finance topics">
          {[
            { icon: BarChart2, label: "Markets" },
            { icon: DollarSign, label: "Economy" },
            { icon: Globe, label: "Global Trade" },
            { icon: Briefcase, label: "Corporate News" },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="finance-topic">
              <Icon size={12} /> {label}
            </span>
          ))}
        </nav>

        {/* Main editorial grid */}
        <section className="finance-hero-grid">
          <div className="finance-hero-main">
            <FinanceHeroCard story={financeHero} size="large" />
          </div>

          <aside className="finance-market-panel">
            <div className="finance-market-heading">
              <div>
                <span>S&amp;P 500</span>
                <strong>5,892.31</strong>
              </div>
              <span className="finance-positive">
                <TrendingUp size={14} /> +1.14%
              </span>
            </div>

            <div className="finance-chart">
              <ResponsiveContainer width="100%" height={170}>
                <LineChart data={spData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} domain={["dataMin - 200", "dataMax + 100"]} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="finance-chart-caption">12-Month Performance (2025–2026)</p>

            <div className="finance-market-strip">
              {fullMarkets.slice(0, 5).map((m) => (
                <div key={m.symbol} className="finance-mini-market">
                  <span>{m.symbol}</span>
                  <strong>{m.value}</strong>
                  <em className={m.up ? "finance-positive" : "finance-negative"}>{m.change}</em>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* More headlines */}
        <section className="finance-section">
          <SectionHeader title="More Headlines" />
          <div className="finance-headline-grid">
            <FinanceHeroCard story={financeHero1} size="compact" />
            <FinanceHeroCard story={financeHero2} size="compact" />
            <FinanceHeroCard story={financeHero3} size="compact" />
            <FinanceHeroCard story={financeHero4} size="compact" />
          </div>
        </section>

        {/* Pull quote */}
        <section className="finance-quote">
          <div className="finance-quote-mark" />
          <div>
            <p>
              "M&amp;A is reopening, but unevenly. Capital is increasingly flowing across
              industrials, financial services, energy, and health into businesses positioned
              at the intersection of innovation, scale, and long-term growth."
            </p>
            <strong>— PwC Global M&amp;A Trends 2026</strong>
          </div>
        </section>

        {/* Global markets */}
        <section className="finance-section" id="markets">
          <div className="finance-section-header finance-section-header--with-link">
            <h2>Global Markets Overview</h2>
            <a href="/markets">View All Markets</a>
          </div>

          <div className="finance-markets-table-wrap">
            <table className="finance-markets-table">
              <thead>
                <tr>
                  <th>Index / Asset</th>
                  <th>Price</th>
                  <th>Change</th>
                  <th className="finance-points-col">Points</th>
                </tr>
              </thead>
              <tbody>
                {fullMarkets.map((m) => (
                  <tr key={m.symbol}>
                    <td>{m.symbol}</td>
                    <td>{m.value}</td>
                    <td>
                      <span className={m.up ? "finance-positive" : "finance-negative"}>
                        {m.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {m.change}
                      </span>
                    </td>
                    <td className={`finance-points-col ${m.up ? "finance-positive" : "finance-negative"}`}>
                      {m.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Business stories */}
        <section className="finance-section">
          <SectionHeader title="Business" />
          <div className="finance-business-grid">
            {businessStories.map((s) => (
              <article key={s.id} className="finance-business-card">
                <div className="finance-business-image-wrap">
                  <ImageWithFallback
                    src={s.image}
                    alt={s.title}
                    className="finance-business-image"
                  />
                </div>
                <span className="finance-story-category">{s.category}</span>
                <h3>{s.title}</h3>
                <span className="finance-story-meta">
                  <Clock size={10} /> {s.time}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* Economy + Leadership */}
        <section className="finance-bottom-grid">
          <div className="finance-section">
            <SectionHeader title="Economy & Policy" />
            <div className="finance-economy-list">
              {economyTopics.map((item) => (
                <article key={`${item.id}-${item.time}`} className="finance-economy-item">
                  <div>
                    <h3>{item.title}</h3>
                    <span><Clock size={10} /> {item.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="finance-section" id="leadership">
            <SectionHeader title="Leadership Voices" />
            <div className="finance-leadership-list">
              {leadershipStories.map((l) => (
                <article key={l.id} className="finance-leader-card">
                  <div className="finance-leader-head">
                    <div className="finance-leader-avatar">
                      {l.name[0]}
                    </div>
                    <div>
                      <strong>{l.name}</strong>
                      <span>{l.title}</span>
                    </div>
                  </div>
                  <blockquote>"{l.quote}"</blockquote>
                  <button>{l.action}</button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="finance-ad">Advertisement</div>
      </div>

      {/* Page-scoped CSS: data/images remain untouched; only layout and styling change. */}
      <style>{`
        .finance-page {
          width: 100%;
          background: #fff;
          color: #111;
          font-family: Arial, Helvetica, sans-serif;
        }

        .finance-container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          padding: 18px 0 42px;
        }

        .finance-page-header {
          min-height: 72px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          padding-bottom: 12px;
          border-bottom: 4px solid #111;
        }

        .finance-eyebrow {
          display: block;
          margin-bottom: 4px;
          color: #777;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .finance-page-header h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 4vw, 48px);
          line-height: .98;
          font-weight: 800;
          letter-spacing: -.035em;
        }

        .finance-header-date {
          padding-bottom: 5px;
          color: #666;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .08em;
          white-space: nowrap;
        }

        .finance-topic-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding: 9px 0;
          border-bottom: 1px solid #d9d9d9;
        }

        .finance-topic {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border: 1px solid #d5d5d5;
          background: #f7f7f7;
          color: #222;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .finance-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.75fr) minmax(280px, .8fr);
          gap: 22px;
          padding: 20px 0;
          border-bottom: 1px solid #111;
        }

        .finance-story-image-wrap {
          overflow: hidden;
          background: #eee;
        }

        .finance-story-image {
          display: block;
          width: 100%;
          object-fit: cover;
          transition: transform .35s ease;
        }

        .finance-story-card:hover .finance-story-image,
        .finance-business-card:hover .finance-business-image {
          transform: scale(1.025);
        }

        .finance-story-image--hero {
          height: 330px;
        }

        .finance-story-category {
          display: block;
          margin-top: 9px;
          color: #d71920;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .finance-story-card--hero h1 {
          max-width: 900px;
          margin: 5px 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(27px, 3.2vw, 42px);
          line-height: 1.03;
          font-weight: 800;
          letter-spacing: -.025em;
        }

        .finance-story-excerpt {
          color: #555;
          font-size: 12px;
          line-height: 1.45;
        }

        .finance-story-excerpt--hero {
          max-width: 850px;
          margin: 9px 0 0;
          font-size: 13px;
        }

        .finance-story-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
          color: #888;
          font-size: 9px;
        }

        .finance-story-meta span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .finance-market-panel {
          padding-left: 18px;
          border-left: 1px solid #d8d8d8;
        }

        .finance-market-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 9px;
          border-bottom: 2px solid #111;
        }

        .finance-market-heading span:first-child {
          display: block;
          color: #666;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .1em;
        }

        .finance-market-heading strong {
          display: block;
          margin-top: 2px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 25px;
        }

        .finance-positive {
          color: #159447 !important;
        }

        .finance-negative {
          color: #d71920 !important;
        }

        .finance-market-heading .finance-positive {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding-top: 5px;
          font-size: 11px;
          font-weight: 700;
        }

        .finance-chart {
          padding: 12px 0 0;
        }

        .finance-chart-caption {
          margin: 0;
          color: #999;
          text-align: center;
          font-size: 8px;
        }

        .finance-market-strip {
          margin-top: 12px;
          border-top: 1px solid #ddd;
        }

        .finance-mini-market {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 8px;
          align-items: center;
          padding: 7px 0;
          border-bottom: 1px solid #eee;
          font-size: 9px;
        }

        .finance-mini-market span {
          color: #555;
          font-weight: 700;
        }

        .finance-mini-market strong {
          font-size: 10px;
        }

        .finance-mini-market em {
          font-style: normal;
          font-weight: 700;
        }

        .finance-section {
          padding: 20px 0;
        }

        .finance-section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 13px;
          padding-bottom: 7px;
          border-bottom: 2px solid #111;
        }

        .finance-section-header h2 {
          margin: 0;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .finance-section-header--with-link a {
          color: #d71920;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          text-decoration: none;
        }

        .finance-headline-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .finance-story-card--compact {
          min-width: 0;
        }

        .finance-story-image--compact {
          height: 115px;
        }

        .finance-story-card--compact h3 {
          margin: 4px 0 0;
          font-size: 14px;
          line-height: 1.12;
          font-weight: 800;
        }

        .finance-story-card--compact .finance-story-excerpt {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 5px 0 0;
        }

        .finance-quote {
          display: grid;
          grid-template-columns: 7px 1fr;
          gap: 18px;
          margin: 3px 0 18px;
          padding: 17px 20px 17px 0;
          background: #f2f4f7;
          border-top: 1px solid #c8c8c8;
          border-bottom: 1px solid #c8c8c8;
        }

        .finance-quote-mark {
          background: #d71920;
        }

        .finance-quote p {
          max-width: 850px;
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 15px;
          line-height: 1.35;
        }

        .finance-quote strong {
          display: block;
          margin-top: 7px;
          font-size: 9px;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .finance-markets-table-wrap {
          overflow-x: auto;
          border-top: 1px solid #111;
          border-bottom: 1px solid #111;
        }

        .finance-markets-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10px;
        }

        .finance-markets-table th {
          padding: 8px 7px;
          color: #666;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .07em;
          text-transform: uppercase;
          text-align: right;
          border-bottom: 1px solid #bbb;
        }

        .finance-markets-table th:first-child,
        .finance-markets-table td:first-child {
          text-align: left;
        }

        .finance-markets-table td {
          padding: 7px;
          text-align: right;
          border-bottom: 1px solid #ededed;
        }

        .finance-markets-table tbody tr:hover {
          background: #f7f7f7;
        }

        .finance-markets-table td span {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-weight: 700;
        }

        .finance-business-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .finance-business-card {
          min-width: 0;
        }

        .finance-business-image-wrap {
          overflow: hidden;
        }

        .finance-business-image {
          display: block;
          width: 100%;
          height: 190px;
          object-fit: cover;
          transition: transform .35s ease;
        }

        .finance-business-card h3 {
          margin: 4px 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          line-height: 1.08;
          font-weight: 800;
        }

        .finance-bottom-grid {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 28px;
          border-top: 1px solid #111;
        }

        .finance-economy-item {
          padding: 9px 0;
          border-bottom: 1px solid #e5e5e5;
        }

        .finance-economy-item h3 {
          margin: 0;
          font-size: 12px;
          line-height: 1.25;
          font-weight: 700;
        }

        .finance-economy-item span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
          color: #999;
          font-size: 8px;
        }

        .finance-leadership-list {
          display: grid;
          gap: 10px;
        }

        .finance-leader-card {
          padding: 11px;
          border: 1px solid #d7d7d7;
          background: #fff;
        }

        .finance-leader-head {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .finance-leader-avatar {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          flex: 0 0 32px;
          background: #eee;
          color: #555;
          font-size: 12px;
          font-weight: 700;
        }

        .finance-leader-head strong,
        .finance-leader-head span {
          display: block;
        }

        .finance-leader-head strong {
          font-size: 11px;
        }

        .finance-leader-head span {
          margin-top: 2px;
          color: #777;
          font-size: 8px;
        }

        .finance-leader-card blockquote {
          margin: 10px 0 7px;
          padding-left: 9px;
          border-left: 2px solid #d71920;
          color: #555;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 11px;
          line-height: 1.35;
          font-style: italic;
        }

        .finance-leader-card button {
          padding: 0;
          border: 0;
          background: none;
          color: #d71920;
          font-size: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .finance-ad {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px dashed #ccc;
          color: #aaa;
          font-size: 9px;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .finance-container {
            width: min(100% - 28px, 760px);
          }

          .finance-hero-grid {
            grid-template-columns: 1fr;
          }

          .finance-market-panel {
            padding-left: 0;
            border-left: 0;
            border-top: 1px solid #d8d8d8;
            padding-top: 18px;
          }

          .finance-headline-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .finance-bottom-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        @media (max-width: 600px) {
          .finance-container {
            width: calc(100% - 22px);
            padding-top: 10px;
          }

          .finance-page-header {
            display: block;
          }

          .finance-header-date {
            display: block;
            margin-top: 8px;
          }

          .finance-story-image--hero {
            height: 230px;
          }

          .finance-headline-grid,
          .finance-business-grid {
            grid-template-columns: 1fr;
          }

          .finance-story-image--compact {
            height: 190px;
          }

          .finance-points-col {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
