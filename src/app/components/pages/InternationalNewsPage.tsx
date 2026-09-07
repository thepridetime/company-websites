import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, Globe, Landmark, Plane, Users, TrendingUp } from "lucide-react";

interface Story {
  id: number;
  title: string;
  time: string;
}

interface HeroStory {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  time: string;
  image: string;
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-5">
      <div className="flex items-center gap-2">
        {icon && <span className="text-red-600">{icon}</span>}

        <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.12em] text-gray-900">
          {title}
        </h2>
      </div>

      <span className="hidden sm:block text-[10px] uppercase tracking-widest text-gray-400">
        The Pride Times
      </span>
    </div>
  );
}

/* =========================================================
   DATA
========================================================= */

const hero: HeroStory = {
  category: "GLOBAL AFFAIRS",
  title:
    "G20 Leaders Reach Framework Deal on Cross-Border Digital Trade at Rio Summit",
  excerpt:
    "Leaders from the world's twenty largest economies emerged from three days of closed-door talks in Rio de Janeiro with a preliminary framework governing cross-border data flows, digital services taxation, and AI export controls. The agreement, still subject to individual ratification, is being described by trade officials as the most consequential update to global digital trade rules since the WTO's 1998 e-commerce moratorium. Negotiators from the EU and United States clashed repeatedly over data-localization exemptions before reaching a compromise late Thursday.",
  author: "Sagar Kumar",
  time: "1 June 2026",
  image:
    "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=1200&h=700&fit=crop",
};

const hero1: HeroStory = {
  category: "GLOBAL AFFAIRS",
  title:
    "UN Security Council Reform Talks Gain Momentum as Emerging Powers Push for Permanent Seats",
  excerpt:
    "A coalition of emerging economies — including India, Brazil, and South Africa — has renewed its push for permanent Security Council representation, citing the body's founding-era structure as increasingly disconnected from today's distribution of global economic and military power. Diplomats say momentum has shifted following private assurances from two existing permanent members, though any formal expansion would require a two-thirds General Assembly vote and ratification by all five current permanent members.",
  author: "Sagar Kumar",
  time: "28 May 2026",
  image:
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=700&fit=crop",
};

const hero2: HeroStory = {
  category: "GLOBAL AFFAIRS",
  title:
    "Cross-Border Data Flows Emerge as New Battleground in US-EU Trade Relations",
  excerpt:
    "Disagreements over data-localization requirements and AI-training data provenance have surfaced as the newest friction point between Washington and Brussels, threatening to complicate an otherwise stable trans-Atlantic trade relationship. European regulators are pushing for stricter data-residency rules that US technology firms argue would fragment the global cloud infrastructure they depend on.",
  author: "Sagar Kumar",
  time: "June 2026",
  image:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=700&fit=crop",
};

const europeStories: Story[] = [
  { id: 1, title: "EU finance ministers agree on joint fiscal buffer to shield eurozone from future energy-price shocks.", time: "Just now" },
  { id: 2, title: "France and Germany unveil joint industrial policy to counter Chinese overcapacity in green technology.", time: "1 hr ago" },
  { id: 3, title: "UK-EU youth mobility scheme enters final negotiation stage after years of post-Brexit deadlock.", time: "3 hrs ago" },
  { id: 4, title: "Italy's coalition government survives no-confidence vote tied to pension reform dispute.", time: "5 hrs ago" },
  { id: 5, title: "NATO members agree to accelerate joint drone-defense procurement following border incursions.", time: "7 hrs ago" },
];

const asiaPacificStories: Story[] = [
  { id: 1, title: "ASEAN bloc finalizes regional supply-chain resilience pact covering semiconductors and critical minerals.", time: "Just now" },
  { id: 2, title: "Japan and South Korea restart high-level trade talks after three-year diplomatic freeze.", time: "2 hrs ago" },
  { id: 3, title: "China's central bank signals further stimulus as property-sector deleveraging drags on growth.", time: "4 hrs ago" },
  { id: 4, title: "India overtakes Japan to become world's fourth-largest economy by nominal GDP.", time: "6 hrs ago" },
  { id: 5, title: "Australia and Indonesia sign expanded defense and critical-minerals cooperation framework.", time: "8 hrs ago" },
];

const americasStories: Story[] = [
  { id: 1, title: "Mercosur-EU trade deal clears final ratification hurdle after 25 years of negotiation.", time: "Just now" },
  { id: 2, title: "Mexico's peso strengthens on record nearshoring investment inflows from US manufacturers.", time: "3 hrs ago" },
  { id: 3, title: "Brazil hosts first-ever BRICS+ summit expansion talks, weighing new membership bids.", time: "5 hrs ago" },
  { id: 4, title: "Canada and US resolve softwood lumber dispute after a decade of intermittent tariffs.", time: "7 hrs ago" },
];

const menaAfricaStories: Story[] = [
  { id: 1, title: "African Continental Free Trade Area reports record intra-African trade volumes for H1 2026.", time: "Just now" },
  { id: 2, title: "Gulf sovereign wealth funds pledge $40B toward African renewable-energy infrastructure.", time: "2 hrs ago" },
  { id: 3, title: "Egypt and Ethiopia reach preliminary agreement on Nile water-sharing after decade-long dispute.", time: "4 hrs ago" },
  { id: 4, title: "Saudi Arabia and UAE deepen economic integration with new joint investment authority.", time: "6 hrs ago" },
];

const tradeBalance = [
  { country: "China", label: "Merchandise Trade Balance", value: "+$92.4B", status: "Surplus" },
  { country: "Germany", label: "Merchandise Trade Balance", value: "+$34.1B", status: "Surplus" },
  { country: "Japan", label: "Merchandise Trade Balance", value: "+$8.3B", status: "Surplus" },
  { country: "USA", label: "Merchandise Trade Balance", value: "-$68.2B", status: "Deficit" },
  { country: "India", label: "Merchandise Trade Balance", value: "-$21.7B", status: "Deficit" },
  { country: "UK", label: "Merchandise Trade Balance", value: "-$14.5B", status: "Deficit" },
];

/* =========================================================
   STORY CARD
========================================================= */

function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group py-3 border-b border-gray-200 last:border-b-0 cursor-pointer">
      <h3 className="text-sm md:text-[15px] leading-snug font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-200">
        {story.title}
      </h3>

      <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-400">
        <Clock size={11} />
        <span>{story.time}</span>
      </div>
    </article>
  );
}

/* =========================================================
   HERO STORY
========================================================= */

function HeroStoryCard({
  story,
  large = false,
}: {
  story: HeroStory;
  large?: boolean;
}) {
  return (
    <article className="group cursor-pointer">
      <div
        className={`relative overflow-hidden bg-gray-100 rounded-sm ${
          large ? "h-72 md:h-[430px]" : "h-64 md:h-80"
        }`}
      >
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute left-4 bottom-4">
          <span className="inline-block bg-red-600 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">
            {story.category}
          </span>
        </div>
      </div>

      <div className="pt-4">
        <h2
          className={`font-serif font-bold leading-tight text-gray-950 group-hover:text-red-600 transition-colors ${
            large ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
          }`}
        >
          {story.title}
        </h2>

        <p className="mt-3 text-sm md:text-[15px] leading-7 text-gray-600">
          {story.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-gray-200 text-[11px] text-gray-400 uppercase tracking-wide">
          <span>By {story.author}</span>

          <span className="flex items-center gap-1">
            <Clock size={11} />
            {story.time}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   TRADE BALANCE PANEL
========================================================= */

function TradeBalancePanel() {
  return (
    <aside className="border border-gray-200 bg-gray-50 p-5 h-fit">
      <div className="flex items-center gap-2 border-b border-gray-300 pb-3 mb-2">
        <TrendingUp size={16} className="text-red-600" />

        <h2 className="text-xs font-bold uppercase tracking-[0.15em]">
          Global Trade Balance
        </h2>
      </div>

      <div>
        {tradeBalance.map((item) => {
          const surplus = item.status === "Surplus";

          return (
            <div
              key={`${item.country}-${item.value}`}
              className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
            >
              <div className="pr-3">
                <p className="text-sm font-semibold text-gray-900">
                  {item.country}
                </p>

                <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">
                  {item.label}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="font-mono text-sm font-bold">{item.value}</p>

                <p
                  className={`text-[10px] font-semibold uppercase ${
                    surplus ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.status}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] leading-5 text-gray-400 mt-3">
        Figures reflect latest available monthly customs data. Data referenced: May 2026.
      </p>
    </aside>
  );
}

/* =========================================================
   QUOTE BLOCK
========================================================= */

function InternationalQuote() {
  return (
    <div className="border-y-2 border-gray-900 py-5 my-2">
      <div className="flex gap-4">
        <div className="w-1 bg-red-600 shrink-0" />

        <div>
          <p className="font-serif italic text-lg md:text-xl leading-relaxed text-gray-800">
            "The old assumption of a single global trading order is gone. What's replacing it is a patchwork of
            overlapping blocs — and every government now has to negotiate on multiple boards at once."
          </p>

          <p className="mt-3 text-xs md:text-sm font-bold uppercase tracking-wide text-gray-700">
            — Elena Voss, Chief Global Strategist, Meridian Trade Council
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INTERNATIONAL TRADE STATISTICS
========================================================= */

function InternationalStatistics() {
  return (
    <section>
      <SectionHeader title="International Statistics" icon={<Landmark size={16} />} />

      <div className="overflow-x-auto border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <td className="w-1/3 bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                Global Trade Growth (2026F)
              </td>
              <td className="border-b border-gray-300 p-3">
                3.1% — revised up from 2.6% on stronger H1 exports
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                Cross-Border M&amp;A Volume
              </td>
              <td className="border-b border-gray-300 p-3">
                $612B in H1 2026 — highest half-year total since 2021
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                Active WTO Dispute Cases
              </td>
              <td className="border-b border-gray-300 p-3">
                34 — concentrated in digital services and critical minerals
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-b border-r border-gray-300 p-3 font-bold">
                New Bilateral Trade Agreements
              </td>
              <td className="border-b border-gray-300 p-3">
                17 signed or ratified since January 2026
              </td>
            </tr>

            <tr>
              <td className="bg-gray-100 border-r border-gray-300 p-3 font-bold">
                Global Supply Chain Pressure Index
              </td>
              <td className="p-3">
                Easing toward long-run average after two years of elevated readings
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function InternationalNewsPage() {
  return (
    <div className="w-full bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
              <Globe size={19} />
            </div>

            <div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Global Coverage
              </p>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-none mt-1">
                International News
              </h1>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-400">
            <span>Diplomacy · Trade · Global Affairs</span>
            <span className="hidden md:block">The Pride Times</span>
          </div>
        </header>

        {/* =================================================
            TOP HERO + TRADE BALANCE
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <HeroStoryCard story={hero} large />
          </div>

          <TradeBalancePanel />
        </section>

        {/* =================================================
            QUOTE
        ================================================= */}

        <InternationalQuote />

        {/* =================================================
            FEATURE STORY
        ================================================= */}

        <section className="mt-12 mb-12">
          <HeroStoryCard story={hero1} large />
        </section>

        {/* =================================================
            SECONDARY STORY + STATISTICS
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <HeroStoryCard story={hero2} />

          <InternationalStatistics />
        </section>

        {/* =================================================
            EUROPE + ASIA-PACIFIC
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t-2 border-black pt-8 mb-12">
          <div>
            <SectionHeader title="Europe" icon={<Landmark size={16} />} />
            <div>
              {europeStories.map((story) => (
                <StoryCard key={`eu-${story.id}`} story={story} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Asia-Pacific" icon={<Globe size={16} />} />
            <div>
              {asiaPacificStories.map((story) => (
                <StoryCard key={`apac-${story.id}`} story={story} />
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            AMERICAS + MIDDLE EAST & AFRICA
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t-2 border-black pt-8">
          <div>
            <SectionHeader title="Americas" icon={<Plane size={16} />} />
            <div>
              {americasStories.map((story) => (
                <StoryCard key={`americas-${story.id}`} story={story} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Middle East &amp; Africa" icon={<Users size={16} />} />
            <div>
              {menaAfricaStories.map((story) => (
                <StoryCard key={`mena-${story.id}`} story={story} />
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            BOTTOM EDITORIAL BAR
        ================================================= */}

        <div className="mt-12 pt-4 border-t border-gray-300 flex flex-col sm:flex-row justify-between gap-2 text-[10px] uppercase tracking-widest text-gray-400">
          <span>International News</span>
          <span>Diplomacy · Trade · Global Affairs</span>
        </div>
      </div>
    </div>
  );
}
