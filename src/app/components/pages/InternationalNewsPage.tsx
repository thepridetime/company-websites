import { Clock, Globe, Landmark, Plane, Users } from "lucide-react";
import { useEffect } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 border-b border-black pb-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#071a2d] md:text-3xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        <div className="hidden h-1 w-16 bg-[#e31b23] md:block" />
      </div>
    </div>
  );
}

/* =========================================================
   GOOGLE ADSENSE
   ========================================================= */

function AdBanner({
  bottom = false,
}: {
  bottom?: boolean;
}) {
  useEffect(() => {
    try {
      const w = window as Window & {
        adsbygoogle?: unknown[];
      };

      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // AdSense may not be available in development/ad-blocked environments.
    }
  }, []);

  return (
    <div
      className={`w-full overflow-hidden ${
        bottom ? "my-10" : "my-6"
      }`}
    >
      <div className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-gray-400">
        Advertisement
      </div>

      <div className="w-full overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minHeight: bottom ? "120px" : "90px",
          }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot={
            bottom
              ? "8042854193"
              : "5373718974"
          }
          data-ad-format={
            bottom
              ? "fluid"
              : "auto"
          }
          data-ad-layout={
            bottom
              ? "in-article"
              : undefined
          }
          data-full-width-responsive={
            bottom
              ? undefined
              : "true"
          }
        />
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR ADS + MORE STORIES
   ========================================================= */

function SponsoredContent() {
  useEffect(() => {
    try {
      const w = window as Window & {
        adsbygoogle?: unknown[];
      };

      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // Ignore AdSense initialization errors.
    }
  }, []);

  return (
    <aside className="w-full">
      {/* REAL ADSENSE SIDEBAR AD */}
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white p-2">
        <p className="mb-2 text-center text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Advertisement
        </p>

        <div className="min-h-[250px] w-full overflow-hidden">
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              width: "100%",
              minHeight: "250px",
            }}
            data-ad-client="ca-pub-2331501617441941"
            data-ad-slot="5373718974"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>

      {/* MORE STORIES */}
      <div className="mt-8 border-t-4 border-[#071a2d] pt-4">
        <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-[#071a2d]">
          More Stories
        </h3>

        <div className="space-y-5">
          {moreStories.map((story) => (
            <article
              key={story.title}
              className="group cursor-pointer border-b border-gray-200 pb-5"
            >
              <div className="mb-2 overflow-hidden">
                <ImageWithFallback
                  src={story.image}
                  alt={story.title}
                  className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-[#e31b23]">
                {story.category}
              </p>

              <h4 className="text-sm font-black leading-snug text-[#071a2d] transition-colors group-hover:text-[#e31b23]">
                {story.title}
              </h4>

              <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-500">
                <Clock className="h-3 w-3" />
                {story.time}
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   HERO STORY
   ========================================================= */

function HeroStoryCard({
  story,
}: {
  story: typeof hero;
}) {
  return (
    <article className="group overflow-hidden bg-white">
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[430px]"
        />

        <div className="absolute left-4 top-4 bg-[#e31b23] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
          Breaking
        </div>
      </div>

      <div className="pt-5">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#e31b23]">
          <Globe className="h-3 w-3" />
          International Affairs
        </div>

        <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-[#071a2d] transition-colors group-hover:text-[#e31b23] md:text-5xl">
          {story.title}
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
          {story.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {story.time}
          </span>

          <span>•</span>

          <span>{story.author}</span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   LATEST NEWS CARD
   ========================================================= */

function LatestNewsCard({
  story,
}: {
  story: (typeof latestStories)[number];
}) {
  return (
    <article className="group flex gap-4 border-b border-gray-200 pb-5">
      <div className="h-28 w-32 flex-shrink-0 overflow-hidden md:h-32 md:w-44">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#e31b23]">
          {story.category}
        </div>

        <h3 className="line-clamp-3 text-sm font-black leading-snug text-[#071a2d] transition-colors group-hover:text-[#e31b23] md:text-base">
          {story.title}
        </h3>

        <p className="mt-2 hidden text-xs leading-relaxed text-gray-500 md:block">
          {story.description}
        </p>

        <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-400">
          <Clock className="h-3 w-3" />
          {story.time}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   REGIONAL STORIES
   ========================================================= */

function RegionalStories({
  title,
  icon,
  stories,
}: {
  title: string;
  icon: React.ReactNode;
  stories: {
    title: string;
    description: string;
    time: string;
  }[];
}) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3 border-b border-black pb-3">
        <div className="text-[#e31b23]">
          {icon}
        </div>

        <h3 className="text-lg font-black uppercase tracking-tight text-[#071a2d]">
          {title}
        </h3>
      </div>

      <div className="space-y-5">
        {stories.map((story) => (
          <article
            key={story.title}
            className="border-b border-gray-200 pb-4"
          >
            <h4 className="text-sm font-black leading-snug text-[#071a2d]">
              {story.title}
            </h4>

            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              {story.description}
            </p>

            <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-400">
              <Clock className="h-3 w-3" />
              {story.time}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   SPONSORSHIP
   ========================================================= */

function SponsorshipSection() {
  return (
    <section className="border-y border-gray-200 bg-[#f7f7f5] py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-center">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#e31b23]">
              Global Perspective
            </p>

            <h2 className="text-3xl font-black leading-tight text-[#071a2d] md:text-4xl">
              The world is changing.
              <br />
              Stay informed.
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
              From geopolitical developments and diplomatic negotiations
              to technology, trade, finance and global markets, The Pride
              Times brings together the stories shaping the international
              business environment.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="border-l-2 border-[#e31b23] pl-3">
                <p className="text-xl font-black text-[#071a2d]">
                  24/7
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                  Coverage
                </p>
              </div>

              <div className="border-l-2 border-[#e31b23] pl-3">
                <p className="text-xl font-black text-[#071a2d]">
                  50+
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                  Markets
                </p>
              </div>

              <div className="border-l-2 border-[#e31b23] pl-3">
                <p className="text-xl font-black text-[#071a2d]">
                  6
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                  Regions
                </p>
              </div>

              <div className="border-l-2 border-[#e31b23] pl-3">
                <p className="text-xl font-black text-[#071a2d]">
                  Global
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                  Perspective
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   NEWSLETTER
   ========================================================= */

function Newsletter() {
  return (
    <section className="bg-[#071a2d] py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e31b23]">
              The Pride Times
            </p>

            <h2 className="text-3xl font-black md:text-4xl">
              Global intelligence,
              <br />
              delivered.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300">
              Get the biggest international business, technology,
              geopolitical and market stories delivered to your inbox.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="h-12 flex-1 border border-gray-600 bg-white px-4 text-sm text-black outline-none placeholder:text-gray-400 focus:border-[#e31b23]"
            />

            <button
              type="button"
              className="h-12 bg-[#e31b23] px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#071a2d]"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DATA
   ========================================================= */

const hero = {
  title:
    "China's Manufacturing Sector Rebounds: PMI Hits 4-Year High of 54.2",
  description:
    "China's manufacturing activity has accelerated sharply, with the latest purchasing managers' index signaling stronger factory output, improving domestic demand and renewed momentum across global supply chains.",
  image:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
  time: "2 hours ago",
  author: "Pride Times International Desk",
};

const moreStories = [
  {
    title:
      "India Overtakes Germany as World's Fourth-Largest Economy",
    category: "Global Economy",
    time: "3 hours ago",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80",
  },
  {
    title:
      "EU-US Digital Trade Agreement Reshapes Global Technology Rules",
    category: "International Business",
    time: "5 hours ago",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
  },
];

const latestStories = [
  {
    title:
      "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    category: "Technology",
    time: "35 min ago",
    description:
      "Nvidia is expanding its AI infrastructure strategy into humanoid robotics as global demand for accelerated computing continues to grow.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title:
      "Alphabet Plans Massive Expansion of Global AI Infrastructure",
    category: "Technology",
    time: "1 hour ago",
    description:
      "Alphabet is increasing investment in data centers, computing infrastructure and AI capabilities as competition across the technology sector intensifies.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  },
  {
    title:
      "Quantum Computing Race Accelerates as New Systems Cross Major Milestone",
    category: "Innovation",
    time: "2 hours ago",
    description:
      "Technology companies and research institutions are competing to develop increasingly powerful quantum computing systems.",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80",
  },
  {
    title:
      "Apple Expands AI Translation Capabilities Across Global Markets",
    category: "Technology",
    time: "3 hours ago",
    description:
      "Apple is expanding artificial intelligence-powered translation and communication features across its ecosystem.",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title:
      "Meta Pushes LLaMA 4 Toward Enterprise Artificial Intelligence",
    category: "Artificial Intelligence",
    time: "4 hours ago",
    description:
      "Meta is increasing its focus on enterprise AI applications as organizations adopt large language models for productivity and automation.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
  {
    title:
      "Starlink Expands Next-Generation Satellite Network Worldwide",
    category: "Space & Connectivity",
    time: "5 hours ago",
    description:
      "Satellite connectivity is expanding across more regions as next-generation systems aim to increase network capacity and coverage.",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=900&q=80",
  },
];

const regionalCoverage = {
  europe: [
    {
      title:
        "European Markets Monitor New Industrial Policy Framework",
      description:
        "European policymakers are reassessing industrial competitiveness, energy security and technology investment.",
      time: "4 hours ago",
    },
    {
      title:
        "European Technology Firms Increase Strategic AI Investment",
      description:
        "Companies across Europe are increasing spending on artificial intelligence infrastructure and enterprise applications.",
      time: "6 hours ago",
    },
    {
      title:
        "Energy Security Remains Central to European Economic Planning",
      description:
        "Energy costs, infrastructure resilience and supply diversification remain key considerations for European economies.",
      time: "8 hours ago",
    },
  ],

  asiaPacific: [
    {
      title:
        "Asia-Pacific Supply Chains Adjust to Changing Trade Patterns",
      description:
        "Manufacturers across the region are adapting sourcing and production strategies as global trade flows evolve.",
      time: "3 hours ago",
    },
    {
      title:
        "Japan Accelerates Investment in Semiconductor Technology",
      description:
        "Japan continues to strengthen its domestic semiconductor ecosystem through public and private investment.",
      time: "5 hours ago",
    },
    {
      title:
        "Southeast Asia Emerges as Key Manufacturing Investment Hub",
      description:
        "Regional economies are attracting manufacturing and technology investments as companies diversify production.",
      time: "7 hours ago",
    },
  ],

  americas: [
    {
      title:
        "U.S. Companies Increase Capital Spending on Artificial Intelligence",
      description:
        "Large technology companies continue to expand spending on data centers, chips and AI infrastructure.",
      time: "2 hours ago",
    },
    {
      title:
        "Latin American Economies Seek Greater Digital Infrastructure Investment",
      description:
        "Governments and businesses across Latin America are focusing on connectivity and digital transformation.",
      time: "6 hours ago",
    },
    {
      title:
        "North American Trade Policy Remains Key Market Focus",
      description:
        "Businesses continue to monitor changes in tariffs, industrial policy and cross-border supply chains.",
      time: "9 hours ago",
    },
  ],

  menaAfrica: [
    {
      title:
        "Gulf Economies Accelerate Technology and Infrastructure Investment",
      description:
        "Major Gulf economies are expanding investment in technology, infrastructure and diversified economic sectors.",
      time: "3 hours ago",
    },
    {
      title:
        "African Digital Economy Attracts New International Investment",
      description:
        "Digital payments, connectivity and technology services are attracting growing attention from global investors.",
      time: "7 hours ago",
    },
    {
      title:
        "Middle East Logistics Networks Expand Regional Connectivity",
      description:
        "Ports, aviation and logistics infrastructure are becoming increasingly important to regional trade strategies.",
      time: "10 hours ago",
    },
  ],
};

/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function InternationalNewsPage() {
  return (
    <main className="min-h-screen bg-white text-[#071a2d]">
      {/* PAGE HEADER */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#e31b23]">
                <Globe className="h-3.5 w-3.5" />
                The Pride Times
              </p>

              <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
                International News
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
                Global affairs, international business, diplomacy,
                technology, markets and the developments shaping the
                world economy.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
              <Globe className="h-4 w-4 text-[#e31b23]" />
              Global Coverage
            </div>
          </div>
        </div>
      </section>

      {/* TOP ADSENSE */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AdBanner />
      </div>

      {/* HERO + SIDEBAR */}
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
          <HeroStoryCard story={hero} />

          <SponsoredContent />
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <SectionHeader
          title="Latest International News"
          subtitle="The latest developments from around the world"
        />

        <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
          {latestStories.map((story) => (
            <LatestNewsCard
              key={story.title}
              story={story}
            />
          ))}
        </div>
      </section>

      {/* IN ARTICLE ADSENSE */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AdBanner bottom />
      </div>

      {/* REGIONAL COVERAGE */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <SectionHeader
          title="Regional Coverage"
          subtitle="A closer look at major developments across key regions"
        />

        <div className="grid gap-10 md:grid-cols-2">
          <RegionalStories
            title="Europe"
            icon={<Landmark className="h-5 w-5" />}
            stories={regionalCoverage.europe}
          />

          <RegionalStories
            title="Asia-Pacific"
            icon={<Plane className="h-5 w-5" />}
            stories={regionalCoverage.asiaPacific}
          />

          <RegionalStories
            title="Americas"
            icon={<Users className="h-5 w-5" />}
            stories={regionalCoverage.americas}
          />

          <RegionalStories
            title="Middle East & Africa"
            icon={<Globe className="h-5 w-5" />}
            stories={regionalCoverage.menaAfrica}
          />
        </div>
      </section>

      {/* GLOBAL PERSPECTIVE */}
      <SponsorshipSection />

      {/* NEWSLETTER */}
      <Newsletter />

      {/* FOOTER LINE */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-6">
          <div className="flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 md:flex-row md:items-center md:justify-between">
            <span>
              © {new Date().getFullYear()} The Pride Times
            </span>

            <span>
              International News • Global Business • Technology • Markets
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
