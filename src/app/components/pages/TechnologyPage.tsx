import { NewsletterCTA } from "../NewsletterCTA";
import { TimeAgo } from "../../utils/timeAgo";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import {
  technologyArticles,
  technologyArticlePath,
  technologyCompanies,
  technologySectionGlance,
  technologyWatchNote,
  regionalSnapshot,
} from "../../data/technologyNewsData";
import { PrideTimesAd } from "../AdSenseSlots";

import "../../../styles/technology-page.css";

/* =========================================================
   HELPERS
========================================================= */

/* Resize an Unsplash image URL for the slot it is used in. */
function sized(url: string, width: number) {
  return url.replace(/w=\d+/, `w=${width}`);
}

/* Sidebar tag colours, keyed by article category. */
const tagStyles: Record<string, string> = {
  "ENTERPRISE AI": "background:#7c3aed;color:#fff",
  CYBERSECURITY: "background:#e31b23;color:#fff",
  "ENTERPRISE SOFTWARE": "background:#2563eb;color:#fff",
  "DATA CENTRES": "background:#fbbf24;color:#17140f",
  SEMICONDUCTORS: "background:#059669;color:#fff",
  "TECH POLICY": "background:#1e293b;color:#fff",
};

const tagStyleFor = (category: string) =>
  tagStyles[category] ?? "background:#fbbf24;color:#17140f";

/* Parse the "background:...;color:..." string into a style object. */
const parseTagStyle = (raw: string) =>
  raw.split(";").reduce<Record<string, string>>((acc, pair) => {
    const [key, value] = pair.split(":");
    if (key && value) {
      const camel = key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      acc[camel] = value.trim();
    }
    return acc;
  }, {});

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  id,
  to,
}: {
  title: string;
  id?: string;
  to: string;
}) {
  return (
    <div id={id} className="tc-head">
      <h2 className="tc-head-title">{title}</h2>

      <Link to={to} className="tc-head-link">
        See All
        <ChevronRight size={12} />
      </Link>
    </div>
  );
}

/* =========================================================
   LISTING DATA
   Every story appears once on this page:
   - Hero            -> story 1
   - More Stories    -> stories 2-3 (text only)
   - Latest grid     -> stories 4 onward (image cards)
========================================================= */

const [leadStory, ...otherStories] = technologyArticles;
const sidebarStories = otherStories.slice(0, 2);
const latestStories = otherStories.slice(2);

const sponsorships = [
  "AI & Business World",
  "Global Technology Forum",
  "Future Infrastructure Summit",
  "Enterprise AI Leadership Forum",
];

/* =========================================================
   PAGE
========================================================= */

export function TechnologyPage() {
  return (
    <main className="tc-page">
      <div className="tc-wrap">
        <div className="tc-main">
          {/* =================================================
              TITLE BAND
          ================================================= */}

          <header className="tc-title-band">
            <h1 className="tc-title">Technology</h1>

            <p className="tc-title-sub">
              Platforms, semiconductors, cloud infrastructure and the
              enterprise race to deploy AI.
            </p>
          </header>

          {/* =================================================
              TOP ADVERTISEMENT
          ================================================= */}

          <div className="tc-ad">
            <PrideTimesAd variant="first" />
          </div>

          {/* =================================================
              MORE STORIES | LEAD | WATCH + ADVERTISEMENT
          ================================================= */}

          <section className="tc-hero">
            {/* LEFT — MORE STORIES (text only) */}

            <aside className="tc-more-list">
              <div className="tc-head">
                <h3 className="tc-head-title">More Stories</h3>
              </div>

              {sidebarStories.map((story, index) => (
                <Link
                  key={story.id}
                  to={technologyArticlePath(story.id)}
                  className="tc-more-item"
                >
                  <span className="tc-more-num">
                    {String(index + 2).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <span
                      className="tc-tag"
                      style={parseTagStyle(tagStyleFor(story.category))}
                    >
                      {story.category}
                    </span>

                    <span className="tc-more-title-text">{story.title}</span>

                    <span className="tc-more-time">
                      <Clock size={8} />
                      <TimeAgo iso={story.publishedAt} />
                    </span>
                  </div>
                </Link>
              ))}
            </aside>

            {/* CENTRE — LEAD STORY */}

            <Link to={technologyArticlePath(leadStory.id)} className="tc-lead">
              <div className="tc-lead-img">
                <ImageWithFallback
                  src={sized(leadStory.image, 1400)}
                  alt={leadStory.title}
                  className="w-full h-full"
                />
              </div>

              <span className="tc-kicker" style={{ marginTop: 16 }}>
                {leadStory.category}
              </span>

              <h2 className="tc-lead-title">{leadStory.title}</h2>

              <p className="tc-lead-excerpt">{leadStory.excerpt}</p>

              <div className="tc-meta">
                <span className="tc-meta-item" style={{ fontWeight: 600, color: "#6b6b6b" }}>
                  By {leadStory.author}
                </span>

                <span className="tc-meta-sep" />

                <span className="tc-meta-item">
                  <Clock size={9} />
                  <TimeAgo iso={leadStory.publishedAt} />
                </span>

                {leadStory.readTime && (
                  <>
                    <span className="tc-meta-sep" />
                    <span>{leadStory.readTime}</span>
                  </>
                )}
              </div>
            </Link>

            {/* RIGHT — ADVERTISEMENT + TECHNOLOGY WATCH */}

            <aside className="tc-aside">
              <div className="tc-ad">
                <PrideTimesAd variant="second" />
              </div>

              <div className="tc-watch">
                <span className="tc-watch-label">Technology Watch</span>

                <h4 className="tc-watch-title">{technologyWatchNote.title}</h4>

                <p className="tc-watch-body">{technologyWatchNote.body}</p>

                <div className="tc-watch-bar" />
              </div>
            </aside>
          </section>

          {/* =================================================
              LATEST TECHNOLOGY NEWS
          ================================================= */}

          <section className="tc-latest">
            <SectionHeader title="Latest Technology News" to="/innovation" />

            <div className="tc-grid">
              {latestStories.map((story, index) => (
                <Link
                  key={story.id}
                  to={technologyArticlePath(story.id)}
                  className={`tc-card ${index === 0 ? "tc-card-feature" : ""}`}
                >
                  <div className="tc-card-img">
                    <ImageWithFallback
                      src={sized(story.image, index === 0 ? 1100 : 700)}
                      alt={story.title}
                      className="w-full h-full"
                    />
                  </div>

                  <span className="tc-kicker" style={{ marginTop: 14 }}>
                    {story.category}
                  </span>

                  <h3 className="tc-card-title">{story.title}</h3>

                  <p className="tc-card-excerpt">{story.excerpt}</p>

                  <div className="tc-meta">
                    <span className="tc-meta-item">
                      <Clock size={9} />
                      <TimeAgo iso={story.publishedAt} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* =================================================
              SECOND ADVERTISEMENT
          ================================================= */}

          <div className="tc-ad" style={{ marginTop: 48 }}>
            <PrideTimesAd variant="fifth" />
          </div>

          {/* =================================================
              SPONSORSHIP
          ================================================= */}

          <section className="tc-sponsor">
            <div className="tc-sponsor-head">
              <span className="tc-sponsor-label">Sponsorship</span>

              <span className="tc-sponsor-note">Presented by our partners</span>
            </div>

            <div className="tc-sponsor-grid">
              {sponsorships.map((item) => (
                <div key={item} className="tc-sponsor-item">
                  <div className="tc-sponsor-badge">✦</div>

                  <p className="tc-sponsor-name">{item}</p>

                  <p className="tc-sponsor-sub">Sponsored Event</p>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              COMPANIES IN FOCUS
          ================================================= */}

          <section className="tc-focus">
            <SectionHeader title="Companies in Focus" to="/business-news" />

            <div className="tc-company-list">
              {technologyCompanies.map((item) => (
                <Link
                  key={item.articleId}
                  to={technologyArticlePath(item.articleId)}
                  className="tc-company"
                >
                  <div className="min-w-0">
                    <p className="tc-company-name">{item.company}</p>

                    <p className="tc-company-loc">{item.location}</p>
                  </div>

                  <div className="tc-company-right">
                    <p className="tc-company-headline">{item.headline}</p>

                    <p className="tc-company-detail">{item.detail}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* =================================================
              MARKET WATCH + REGIONAL SNAPSHOT (side by side)
          ================================================= */}

          <div className="tc-table-grid">
            {/* TECHNOLOGY MARKET WATCH */}

            <section className="tc-section" style={{ marginTop: 0, borderBottom: "none", paddingBottom: 0 }}>
              <SectionHeader title="Technology Market Watch" to="/markets" />

              <div className="tc-table-wrap">
                <table className="tc-table">
                  <thead>
                    <tr>
                      <th>Theme</th>
                      <th>Momentum</th>
                      <th className="is-right">Outlook</th>
                    </tr>
                  </thead>

                  <tbody>
                    {technologySectionGlance.map((item) => (
                      <tr key={item.theme}>
                        <td className="is-strong">{item.theme}</td>

                        <td>{item.momentum}</td>

                        <td className="is-right">
                          <span
                            className={`tc-pill ${
                              /positive|improv/i.test(item.outlook)
                                ? "is-up"
                                : /neutral|cautious/i.test(item.outlook)
                                ? "is-mid"
                                : ""
                            }`}
                          >
                            {item.outlook}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* REGIONAL SNAPSHOT */}

            <section className="tc-section" style={{ marginTop: 0, borderBottom: "none", paddingBottom: 0 }}>
              <SectionHeader title="Regional Market Snapshot" to="/world" />

              <p className="tc-section-note">
                Illustrative regional indicators from this edition.
              </p>

              <div className="tc-table-wrap">
                <table className="tc-table tc-table-min">
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>Deal Value (US$ bn)</th>
                      <th>Earnings Growth</th>
                      <th className="is-right">Hiring Outlook</th>
                    </tr>
                  </thead>

                  <tbody>
                    {regionalSnapshot.map((row) => (
                      <tr key={row.region}>
                        <td className="is-strong">{row.region}</td>

                        <td>{row.dealValue}</td>

                        <td>{row.earnings}</td>

                        <td className="is-right">
                          <span
                            className={`tc-pill ${
                              /growing|strong|expan|increas/i.test(row.hiring)
                                ? "is-up"
                                : /stable|mixed|flat/i.test(row.hiring)
                                ? "is-mid"
                                : ""
                            }`}
                          >
                            {row.hiring}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* =================================================
              NEWSLETTER
          ================================================= */}

          <div className="tc-newsletter">
            <NewsletterCTA
              title="Stay Ahead with The Pride Times"
              description="Daily briefings on AI platforms, chips, data centres and the global technology economy delivered to your inbox."
              newsletterKey="technology-weekly"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default TechnologyPage;
