import { Clock, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router";

/* =========================================================
   SECTION HEADER
========================================================= */

function SH({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-t border-black pt-3 mb-5">
      <div className="flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
        <h2 className="text-[13px] md:text-sm font-bold text-gray-900">
          {title}
        </h2>
      </div>
    </div>
  );
}

/* =========================================================
   DATA
========================================================= */

const featured = [
  {
    id: 1,
    category: "COVER STORY",
    title:
      "The AI Economy: How Artificial Intelligence is Reshaping Global GDP and Rewriting the Rules of Competitive Advantage",
    excerpt:
      "From Silicon Valley to Shenzhen, every sector is being transformed by AI. Pride Times investigates the winners, the losers, and the trillion-dollar stakes.",
    author: "Sagar Kumar",
    time: "Today",
    image:
      "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?w=800&h=500&fit=crop",
    path: "/technology",
  },
  {
    id: 2,
    category: "DEEP DIVE",
    title:
      "India's $5 Trillion Dream: Can the World's Fastest-Growing Economy Sustain Its Momentum Through 2030?",
    excerpt:
      "Prime Minister Modi's economic ambition is unprecedented. Pride Times examines the infrastructure gap, the talent pipeline, and the geopolitical tailwinds and headwinds.",
    author: "Sagar Kumar",
    time: "Yesterday",
    image:
      "https://images.unsplash.com/photo-1761233138997-44d9b002a08f?w=800&h=500&fit=crop",
    path: "/finance",
  },
  {
    id: 3,
    category: "INVESTIGATION",
    title:
      "The Cybersecurity Crisis Hidden in Plain Sight: How Nation-State Hackers Are Penetrating the World's Critical Infrastructure",
    excerpt:
      "A 14-month investigation reveals that power grids, water systems, and financial networks in 40+ countries have been silently compromised by state-sponsored actors.",
    author: "Sagar Kumar",
    time: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?w=800&h=500&fit=crop",
    path: "/cybersecurity",
  },
];

const editorPicks = [
  {
    id: 1,
    category: "LEADERSHIP",
    title:
      "How Satya Nadella Transformed Microsoft from 'Dying Giant' to World's Most Valuable AI Company",
    time: "3 days ago",
    path: "/leadership",
  },
  {
    id: 2,
    category: "ENERGY",
    title:
      "The Solar Revolution: How One Technology Disrupted the Energy Sector Faster Than Any Technology in History",
    time: "4 days ago",
    path: "/energy",
  },
  {
    id: 3,
    category: "BILLIONAIRES",
    title:
      "Inside the Mind of Elon Musk: What Drives the World's Richest Man and Most Consequential CEO",
    time: "5 days ago",
    path: "/billionaires",
  },
  {
    id: 4,
    category: "HEALTHCARE",
    title:
      "The End of Disease? How mRNA Technology is Opening the Door to Universal Cancer Vaccines by 2030",
    time: "6 days ago",
    path: "/healthcare",
  },
  {
    id: 5,
    category: "SMART CITIES",
    title:
      "The City of the Future Is Already Here — If You Know Where to Look",
    time: "1 week ago",
    path: "/smart-cities",
  },
];

/* =========================================================
   ADVERTISEMENT
========================================================= */

function Advertisement() {
  return (
    <div className="relative w-full h-[90px] md:h-[96px] bg-[#102d35] overflow-hidden">
      <span className="absolute right-0 top-0 bg-white/80 text-[7px] md:text-[8px] text-gray-500 px-2 py-0.5">
        Advertisement
      </span>

      <div className="h-full flex flex-col items-center justify-center text-white">
        <span className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-cyan-300">
          GOOGLE ADSENSE
        </span>

        <span className="text-[12px] md:text-sm font-semibold mt-1">
          Advertisement Space
        </span>

        <span className="text-[8px] md:text-[9px] text-cyan-200 mt-1">
          728 × 90 • Leaderboard
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SPONSORED SIDEBAR
========================================================= */

function SponsoredSidebar() {
  return (
    <aside className="w-full">
      <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
        <div className="px-3 py-2 bg-[#faf8ef] text-[8px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Sponsored Content
        </div>

        <div className="p-3">
          <div className="h-[150px] md:h-[165px] bg-[#111831] flex flex-col items-center justify-center text-center">
            <span className="text-[8px] font-bold tracking-[0.18em] text-yellow-300">
              FEATURED PARTNER
            </span>

            <span className="text-sm font-semibold text-white mt-2">
              Your Ad Here
            </span>

            <span className="text-[9px] text-gray-300 mt-1">
              Reach 2M+ business readers
            </span>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-black mt-5 pb-2">
        <h3 className="text-[12px] font-bold uppercase tracking-wide">
          More Stories
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {featured.slice(1).map((story) => (
          <Link
            key={story.id}
            to={story.path}
            className="flex gap-3 py-3 group"
          >
            <div className="w-[72px] h-[52px] shrink-0 overflow-hidden rounded-[2px] bg-gray-100">
              <ImageWithFallback
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="min-w-0">
              <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-red-600">
                {story.category}
              </span>

              <p className="text-[10px] md:text-[11px] font-semibold leading-[1.3] mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                {story.title}
              </p>

              <span className="text-[8px] text-gray-400 mt-1 block">
                {story.time}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

/* =========================================================
   STORY CARD
========================================================= */

function StoryCard({
  story,
}: {
  story: (typeof featured)[number];
}) {
  return (
    <Link
      to={story.path}
      className="group block border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
    >
      <div className="overflow-hidden h-[175px] md:h-[190px] bg-gray-100">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-3 md:p-4">
        <span className="text-[8px] md:text-[9px] font-bold text-red-600 uppercase tracking-[0.14em]">
          {story.category}
        </span>

        <h3 className="font-serif text-[16px] md:text-[18px] font-bold leading-[1.18] mt-1.5 text-gray-950 group-hover:text-red-600 transition-colors">
          {story.title}
        </h3>

        <p className="text-[11px] md:text-[12px] text-gray-500 leading-[1.55] mt-2 line-clamp-3">
          {story.excerpt}
        </p>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
          <span className="text-[9px] text-gray-400">
            By {story.author}
          </span>

          <span className="flex items-center gap-1 text-[9px] text-gray-400">
            <Clock size={9} strokeWidth={2} />
            {story.time}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   SPONSORED EVENTS
========================================================= */

function SponsoredEvents() {
  const events = [
    "Global Finance Summit 2026",
    "Tech Leaders Forum",
    "Energy Transition Conference",
    "AI & Business World",
  ];

  return (
    <section className="bg-[#f8f8f7] border border-gray-100 rounded-md p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="border border-gray-200 bg-white rounded px-2 py-1 text-[7px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Sponsorship
        </span>

        <span className="text-[9px] text-gray-400">
          Presented by our partners
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {events.map((event) => (
          <div
            key={event}
            className="bg-white border border-gray-200 rounded-md min-h-[95px] flex flex-col items-center justify-center text-center px-3"
          >
            <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <Star
                size={12}
                className="text-red-500"
                fill="currentColor"
              />
            </div>

            <p className="text-[10px] font-bold text-gray-800">
              {event}
            </p>

            <p className="text-[8px] text-gray-400 mt-1">
              Sponsored Event
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   NEWSLETTER
========================================================= */

function Newsletter() {
  return (
    <section className="bg-[#071a2d] rounded-md px-5 py-9 md:py-10 text-center text-white">
      <h2 className="font-serif text-[22px] md:text-[26px] font-bold">
        Stay Ahead with The Pride Times
      </h2>

      <p className="text-[11px] md:text-[12px] text-gray-300 mt-2">
        Daily briefings on Featured Stories delivered to your inbox.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="h-10 flex-1 rounded border border-white/10 bg-white/10 px-3 text-[11px] text-white placeholder:text-gray-400 outline-none focus:border-red-500"
        />

        <button className="h-10 px-5 rounded bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold transition-colors">
          Subscribe Free
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function FeaturedPage() {
  return (
    <main className="w-full min-h-screen bg-white text-gray-900 antialiased">

      {/* =================================================
          FULL WIDTH CONTENT WRAPPER
      ================================================= */}

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 md:py-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-t-[3px] border-red-600 pt-4 md:pt-5 mb-8 md:mb-10">
          <div className="flex items-end justify-between gap-5">

            <div>
              <h1 className="font-serif text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-none tracking-tight text-gray-950">
                Featured
              </h1>

              <p className="text-[11px] md:text-[12px] text-gray-500 mt-2">
                Our top picks and must-read stories, curated by the
                editorial desk.
              </p>
            </div>

            <p className="hidden md:block text-[9px] uppercase tracking-[0.16em] text-gray-400">
              {featured.length + editorPicks.length} Stories
            </p>

          </div>
        </header>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <div className="mb-6 md:mb-7">
          <Advertisement />
        </div>

        {/* =================================================
            MAIN HERO + SIDEBAR
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,3.5fr)_minmax(260px,1fr)] gap-6 md:gap-8 mb-10 md:mb-12">

          {/* HERO */}

          <Link
            to={featured[0].path}
            className="group block min-w-0"
          >
            <div className="overflow-hidden rounded-md bg-gray-100">
              <ImageWithFallback
                src={featured[0].image}
                alt={featured[0].title}
                className="w-full h-[250px] sm:h-[330px] md:h-[390px] lg:h-[410px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <div className="mt-3">

              <span className="text-[8px] md:text-[9px] font-bold text-red-600 uppercase tracking-[0.16em]">
                {featured[0].category}
              </span>

              <h2 className="font-serif text-[25px] sm:text-[30px] md:text-[36px] lg:text-[40px] font-bold leading-[1.08] tracking-tight mt-1.5 text-gray-950 group-hover:text-red-600 transition-colors">
                {featured[0].title}
              </h2>

              <p className="text-[12px] md:text-[13px] text-gray-600 leading-[1.65] mt-2 max-w-5xl">
                {featured[0].excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-[9px] md:text-[10px] text-gray-400">
                <span className="font-medium text-gray-500">
                  By {featured[0].author}
                </span>

                <span className="h-3 w-px bg-gray-300" />

                <span className="flex items-center gap-1.5">
                  <Clock size={9} strokeWidth={2.25} />
                  {featured[0].time}
                </span>
              </div>

            </div>
          </Link>

          {/* SIDEBAR */}

          <SponsoredSidebar />

        </section>

        {/* =================================================
            LATEST FEATURED
        ================================================= */}

        <section className="mb-10 md:mb-12">

          <SH title="Latest Featured News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

            {featured.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
              />
            ))}

          </div>

        </section>

        {/* =================================================
            SECONDARY STORIES
        ================================================= */}

        <section className="mb-10 md:mb-12">

          <SH title="Editor's Picks" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

            {editorPicks.map((story) => (
              <Link
                key={story.id}
                to={story.path}
                className="group border border-gray-200 rounded-md p-4 bg-white hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-[8px] font-bold text-red-600 uppercase tracking-[0.14em]">
                  {story.category}
                </span>

                <h3 className="font-serif text-[16px] font-bold leading-[1.25] mt-2 text-gray-950 group-hover:text-red-600 transition-colors">
                  {story.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-100 text-[9px] text-gray-400">
                  <Clock size={9} strokeWidth={2} />
                  {story.time}
                </div>
              </Link>
            ))}

          </div>

        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <div className="mb-6 md:mb-7">
          <Advertisement />
        </div>

        {/* =================================================
            SPONSORED EVENTS
        ================================================= */}

        <div className="mb-7 md:mb-8">
          <SponsoredEvents />
        </div>

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <div className="mb-8 md:mb-10">
          <Newsletter />
        </div>

      </div>

    </main>
  );
}
