import { Clock, Globe, Landmark, Plane, Users } from "lucide-react";
import { useEffect } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { specialArticlePathByTitle } from "../../data/specialArticleData";
import { Link } from "react-router-dom";

const HERO_TITLE =
  "China's Manufacturing Sector Rebounds: PMI Hits 4-Year High of 54.2";

const moreStories = [
  {
    title: "India Overtakes Germany to Become World's Fourth-Largest Economy",
    category: "Global Economy",
    time: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "EU-US Digital Trade Agreement Reshapes Global Technology Rules",
    category: "Technology",
    time: "4 hours ago",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
];

const latestStories = [
  {
    title: "Nvidia Expands Humanoid Robot Push as AI Moves Into Physical Automation",
    category: "Technology",
    time: "35 minutes ago",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Alphabet Accelerates AI Data-Center Investment Across Global Markets",
    category: "Technology",
    time: "1 hour ago",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Quantum Computing Race Advances Toward 1,000-Qubit Systems",
    category: "Science",
    time: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Apple Intelligence Expands Real-Time Translation Capabilities",
    category: "Technology",
    time: "3 hours ago",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Meta Pushes LLaMA 4 Deeper Into Enterprise AI Applications",
    category: "AI",
    time: "5 hours ago",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Starlink Gen 3 Expansion Targets Faster Global Connectivity",
    category: "Space",
    time: "6 hours ago",
    image:
      "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=900&q=80",
  },
];

const regionalCoverage = [
  {
    region: "Europe",
    icon: Landmark,
    stories: [
      "European leaders advance discussions on digital sovereignty and industrial competitiveness.",
      "European manufacturers increase investment in advanced automation and clean technologies.",
      "New technology regulations continue reshaping the region's digital economy.",
    ],
  },
  {
    region: "Asia-Pacific",
    icon: Plane,
    stories: [
      "Asian manufacturing hubs report changing export and investment patterns.",
      "Regional governments accelerate artificial-intelligence infrastructure programmes.",
      "Technology companies expand semiconductor and data-center investments across Asia.",
    ],
  },
  {
    region: "Americas",
    icon: Globe,
    stories: [
      "US technology investment remains focused on artificial intelligence infrastructure.",
      "Latin American economies attract new digital infrastructure projects.",
      "North American companies increase spending on automation and cybersecurity.",
    ],
  },
  {
    region: "Middle East & Africa",
    icon: Users,
    stories: [
      "Gulf economies continue diversifying through technology and infrastructure investment.",
      "African markets expand digital-payment and connectivity infrastructure.",
      "Energy-producing economies increase investment in next-generation technologies.",
    ],
  },
];

function getArticlePath(title: string) {
  return specialArticlePathByTitle(title);
}

function AdSenseSlot({
  slot,
  format = "auto",
  layout,
  layoutKey,
  minHeight = 90,
  className = "",
}: {
  slot: string;
  format?: "auto" | "fluid";
  layout?: string;
  layoutKey?: string;
  minHeight?: number;
  className?: string;
}) {
  useEffect(() => {
    try {
      const ads = window as Window & {
        adsbygoogle?: unknown[];
      };

      ads.adsbygoogle = ads.adsbygoogle || [];
      ads.adsbygoogle.push({});
    } catch {
      // AdSense may fail silently when blocked or unavailable.
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
        Advertisement
      </div>

      <div
        className="w-full overflow-hidden"
        style={{ minHeight: `${minHeight}px` }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minHeight: `${minHeight}px`,
          }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={
            format === "auto" ? "true" : undefined
          }
          data-ad-layout={layout}
          data-ad-layout-key={layoutKey}
        />
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6 border-b-2 border-black pb-3">
      <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e31b23]">
        {eyebrow}
      </div>

      <h2 className="font-serif text-2xl font-bold text-black md:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function HeroStoryCard() {
  return (
    <article className="group overflow-hidden bg-white">
      <Link to={getArticlePath(HERO_TITLE)} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"
            alt={HERO_TITLE}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 bg-[#e31b23] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Global Economy
          </div>
        </div>

        <div className="pt-5">
          <h1 className="font-serif text-3xl font-bold leading-tight text-black transition-colors group-hover:text-[#e31b23] md:text-4xl lg:text-5xl">
            {HERO_TITLE}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 md:text-lg">
            China's industrial economy shows renewed momentum as manufacturing
            activity reaches its strongest level in four years, highlighting
            changing conditions across global supply chains and international
            trade.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-500">
            <Clock className="h-3.5 w-3.5" />
            <span>Published 1 hour ago</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function MoreStories() {
  return (
    <aside className="space-y-6">
      {moreStories.map((story) => (
        <Link
          key={story.title}
          to={getArticlePath(story.title)}
          className="group block border-b border-gray-200 pb-6 last:border-0"
        >
          <div className="mb-3 aspect-[16/9] overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={story.image}
              alt={story.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#e31b23]">
            {story.category}
          </div>

          <h3 className="font-serif text-xl font-bold leading-tight text-black transition-colors group-hover:text-[#e31b23]">
            {story.title}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5" />
            {story.time}
          </div>
        </Link>
      ))}
    </aside>
  );
}

function LatestNewsCard({
  story,
}: {
  story: (typeof latestStories)[number];
}) {
  return (
    <Link
      to={getArticlePath(story.title)}
      className="group grid grid-cols-[110px_1fr] gap-4 border-b border-gray-200 py-5 md:grid-cols-[150px_1fr] md:gap-5"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div>
        <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#e31b23]">
          {story.category}
        </div>

        <h3 className="font-serif text-lg font-bold leading-snug text-black transition-colors group-hover:text-[#e31b23] md:text-xl">
          {story.title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          {story.time}
        </div>
      </div>
    </Link>
  );
}

function RegionalStories() {
  return (
    <section className="grid gap-8 border-t border-gray-200 pt-8 md:grid-cols-2 lg:grid-cols-4">
      {regionalCoverage.map((region) => {
        const Icon = region.icon;

        return (
          <div key={region.region}>
            <div className="mb-4 flex items-center gap-2 border-b border-black pb-2">
              <Icon className="h-4 w-4 text-[#e31b23]" />

              <h3 className="font-serif text-lg font-bold">
                {region.region}
              </h3>
            </div>

            <div className="space-y-4">
              {region.stories.map((story) => (
                <div
                  key={story}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <p className="font-serif text-sm leading-6 text-gray-800">
                    {story}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function Newsletter() {
  return (
    <section className="border-y-4 border-black bg-gray-50 px-6 py-10 text-center md:px-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e31b23]">
          The Pride Times
        </div>

        <h2 className="font-serif text-3xl font-bold md:text-4xl">
          Global Briefing
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Get the most important international business, technology,
          geopolitical and economic developments delivered to your inbox.
        </p>

        <div className="mx-auto mt-6 flex max-w-xl flex-col gap-2 sm:flex-row">
          <input
            type="email"
            placeholder="Your email address"
            className="h-11 flex-1 border border-gray-300 bg-white px-4 text-sm outline-none focus:border-black"
          />

          <button
            type="button"
            className="h-11 bg-black px-7 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#e31b23]"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

export function InternationalNewsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Page Header */}
      <header className="border-b-4 border-black">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Globe className="h-7 w-7 text-[#e31b23]" />

            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e31b23]">
                The Pride Times
              </div>

              <h1 className="font-serif text-3xl font-bold md:text-4xl">
                International News
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
            Global markets, geopolitics, international business, technology
            and the stories shaping economies around the world.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Top Advertisement */}
        <AdSenseSlot
          slot="5373718974"
          format="auto"
          minHeight={90}
          className="my-6"
        />

        {/* Hero + More Stories */}
        <section className="grid gap-10 border-b border-gray-200 pb-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <HeroStoryCard />

          <div className="lg:border-l lg:border-gray-200 lg:pl-8">
            <div className="mb-5 border-b-2 border-black pb-2">
              <h2 className="font-serif text-xl font-bold">
                More International Stories
              </h2>
            </div>

            <MoreStories />
          </div>
        </section>

        {/* Latest News */}
        <section className="py-10">
          <SectionHeader
            eyebrow="Around the World"
            title="Latest International News"
          />

          <div className="grid gap-x-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              {latestStories.map((story) => (
                <LatestNewsCard key={story.title} story={story} />
              ))}
            </div>

            {/* Real AdSense Sidebar */}
            <aside className="hidden lg:block lg:border-l lg:border-gray-200 lg:pl-8">
              <div className="sticky top-24">
                <AdSenseSlot
                  slot="5373718974"
                  format="auto"
                  minHeight={250}
                />
              </div>
            </aside>
          </div>
        </section>

        {/* In-article Advertisement */}
        <AdSenseSlot
          slot="8042854193"
          format="fluid"
          layout="in-article"
          minHeight={180}
          className="my-10"
        />

        {/* Regional Coverage */}
        <section className="py-8">
          <SectionHeader
            eyebrow="Regional Coverage"
            title="The World, Region by Region"
          />

          <RegionalStories />
        </section>

        {/* Secondary Ad */}
        <AdSenseSlot
          slot="5608262547"
          format="fluid"
          layoutKey="-ef+6k-30-ac+ty"
          minHeight={180}
          className="my-10"
        />

        {/* Newsletter */}
        <div className="py-10">
          <Newsletter />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="font-serif text-2xl font-bold">
                THE PRIDE TIMES
              </div>

              <p className="mt-1 text-xs text-gray-400">
                International news, business and technology.
              </p>
            </div>

            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} The Pride Times. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default InternationalNewsPage;
