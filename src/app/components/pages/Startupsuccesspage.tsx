
import { Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router";

/* =========================================================
   TYPES
========================================================= */

type Story = {
  id?: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  time: string;
  image: string;
  path?: string;
};

/* =========================================================
   DATA
========================================================= */

const hero: Story = {
  category: "STARTUP SUCCESS",
  title: "Perplexity AI Raises $1.2B Series D, Valued at $15B",
  excerpt:
    "The AI search startup secures major backing from SoftBank, Bessemer, and Nvidia as it targets 100M daily active users by Q4 2026.",
  author: "Sagar Kumar",
  time: "2 hr ago",
  image:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
  path: "/startup-success",
};

const latestNews = [
  {
    id: 1,
    category: "TECHNOLOGY",
    title:
      "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push",
    excerpt:
      "Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and Southeast Asia.",
    time: "12 min ago",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=520&fit=crop",
    path: "/technology",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title:
      "Alphabet Plans $80B Stock Offering to Fund AI Data-Center Expansion",
    excerpt:
      "Hyperscaler capex tops $700B while grid, water and community pushback intensifies across key markets.",
    time: "35 min ago",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=520&fit=crop",
    path: "/technology",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    title:
      "Quantum Computing Reaches Commercial Milestone: 1,000-Qubit Processor Achieved",
    excerpt:
      "IBM and Google jointly announce stable 1,000-qubit processors, marking a watershed moment for enterprise quantum computing.",
    time: "2 hr ago",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&h=520&fit=crop",
    path: "/technology",
  },
  {
    id: 4,
    category: "TECHNOLOGY",
    title:
      "Apple Intelligence: iOS 21 Introduces Real-Time AI Translation Across 8 Languages",
    excerpt:
      "Apple's most ambitious software update rewrites the rules of personal AI, integrating on-device translation and generative features.",
    time: "3 hr ago",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&h=520&fit=crop",
    path: "/technology",
  },
  {
    id: 5,
    category: "TECHNOLOGY",
    title:
      "Meta's Llama 4 Surpasses GPT-5 in Enterprise Benchmark Tests",
    excerpt:
      "Open-source AI takes center stage as Meta's latest model outperforms proprietary systems in enterprise reasoning.",
    time: "5 hr ago",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=900&h=520&fit=crop",
    path: "/technology",
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    title:
      "SpaceX Starlink Gen 3 Delivers 1 Gbps to 50 Million New Users Globally",
    excerpt:
      "The latest satellite constellation expansion brings high-speed internet to more regions across Africa, South Asia, and Latin America.",
    time: "6 hr ago",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&h=520&fit=crop",
    path: "/technology",
  },
];

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="border-t-2 border-black pt-3 mb-5">
      <h2 className="text-[15px] md:text-[17px] font-bold text-gray-900">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

function HeroStory() {
  return (
    <article className="group">
      <Link to={hero.path || "#"} className="block">
        <div className="w-full overflow-hidden rounded-md">
          <ImageWithFallback
            src={hero.image}
            alt={hero.title}
            className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>

        <div className="pt-3">
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">
            {hero.category}
          </p>

          <h2 className="mt-1 font-serif text-[25px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-bold leading-[1.08] text-gray-950 group-hover:text-red-600 transition-colors">
            {hero.title}
          </h2>

          <p className="mt-2 text-[12px] md:text-[14px] text-gray-600 leading-[1.55]">
            {hero.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-[9px] md:text-[10px] text-gray-400">
            <span className="font-medium text-gray-500">
              By {hero.author}
            </span>

            <span>{hero.time}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* =========================================================
   NEWS CARD
========================================================= */

function NewsCard({
  story,
}: {
  story: (typeof latestNews)[number];
}) {
  return (
    <Link
      to={story.path}
      className="group block border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
    >
      <div className="w-full h-[165px] sm:h-[180px] md:h-[175px] lg:h-[185px] overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-3">
        <p className="text-[8px] font-bold uppercase text-red-600 tracking-wide">
          {story.category}
        </p>

        <h3 className="mt-1.5 font-serif text-[14px] md:text-[15px] font-bold leading-[1.18] text-gray-900 group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        <p className="mt-1.5 text-[10px] md:text-[11px] text-gray-600 leading-[1.45] line-clamp-2">
          {story.excerpt}
        </p>

        <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-gray-100 text-[8px] text-gray-400">
          <span>By Sagar Kumar</span>

          <span className="flex items-center gap-1 ml-auto">
            <Clock size={9} />
            {story.time}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function StartupSuccessPage() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 antialiased">
      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-6 md:py-8">

        {/* ===================================================
            PAGE TITLE
        =================================================== */}

        <header className="border-t-[3px] border-red-600 pt-4 mb-6">
          <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold leading-tight">
            Startup Success
          </h1>

          <p className="mt-1 text-[11px] md:text-[13px] text-gray-500">
            The world's most exciting startups, funding rounds, and founder
            stories.
          </p>
        </header>

        {/* ===================================================
            HERO
        =================================================== */}

        <section className="mb-8">
          <HeroStory />
        </section>

        {/* ===================================================
            LATEST STARTUP SUCCESS NEWS
        =================================================== */}

        <section className="mb-8">
          <SectionHeader title="Latest Startup Success News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestNews.map((story) => (
              <NewsCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* ===================================================
            NEWSLETTER
        =================================================== */}

        <section className="rounded-md bg-[#071a2d] px-5 py-8 md:py-9 text-center mb-8">
          <h2 className="font-serif text-white text-[20px] md:text-[24px] font-bold">
            Stay Ahead with The Pride Times
          </h2>

          <p className="text-[10px] md:text-[11px] text-gray-300 mt-1">
            Daily briefings on Startup Success delivered to your inbox.
          </p>

          <form
            className="flex flex-col sm:flex-row justify-center gap-2 mt-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-[260px] h-9 rounded border border-white/10 bg-[#1d3347] px-3 text-[10px] text-white placeholder:text-gray-400 outline-none focus:border-red-500"
            />

            <button
              type="submit"
              className="h-9 px-5 rounded bg-red-600 hover:bg-red-700 text-white text-[10px] font-semibold transition-colors"
            >
              Subscribe Free
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default StartupSuccessPage;

