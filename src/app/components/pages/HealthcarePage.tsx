import { Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import HC1Img from "../../../imports/HC1.png";
import HC2Img from "../../../imports/HC2.png";
import HC3Img from "../../../imports/HC3.png";
import HC4Img from "../../../imports/HC4.png";

/* =========================================================
   DATA
========================================================= */

const hero = {
  category: "HEALTHCARE",
  title: "How Biotech Innovations Are Extending & Improving Lives",
  excerpt:
    "Gene-editing therapies, AI-driven drug discovery, and personalized medicine are converging to tackle diseases that were once considered untreatable.",
  author: "Sagar Kumar",
  time: "8 hr ago",
  image: HC1Img,
};

const latestNews = [
  {
    id: 1,
    category: "GENE THERAPY",
    badge: "HOT",
    title:
      "CRISPR 3.0 Corrects Hearing Loss Mutation in 92% of Clinical Trial Patients",
    excerpt:
      "New gene-editing approaches are opening the door to targeted treatments for previously difficult-to-treat genetic conditions.",
    author: "Sagar Kumar",
    time: "2 hrs ago",
    image: HC2Img,
  },
  {
    id: 2,
    category: "AI DIAGNOSTICS",
    badge: "HOT",
    title:
      "AI System Detects Alzheimer's Disease Years Before Symptoms Appear",
    excerpt:
      "Artificial intelligence is increasingly being used to identify subtle clinical patterns and improve early diagnosis.",
    author: "Sagar Kumar",
    time: "4 hrs ago",
    image: HC3Img,
  },
  {
    id: 3,
    category: "ORGAN BIOENGINEERING",
    badge: "",
    title:
      "Lab-Grown Kidney Research Moves Closer to Routine Human Transplants",
    excerpt:
      "Researchers are advancing tissue engineering and regenerative medicine as alternatives to conventional organ donation.",
    author: "Sagar Kumar",
    time: "7 hrs ago",
    image: HC4Img,
  },
  {
    id: 4,
    category: "PHARMACEUTICALS",
    badge: "",
    title:
      "Novo Nordisk Expands Next-Generation Obesity Drug Development",
    excerpt:
      "Pharmaceutical companies continue investing in therapies designed to improve treatment outcomes and patient access.",
    author: "Sagar Kumar",
    time: "9 hrs ago",
    image: HC1Img,
  },
  {
    id: 5,
    category: "HEALTHTECH",
    badge: "",
    title:
      "Digital Health Platforms Accelerate the Shift Toward Preventive Care",
    excerpt:
      "Connected devices and digital health platforms are becoming an increasingly important part of preventative healthcare.",
    author: "Sagar Kumar",
    time: "10 hrs ago",
    image: HC2Img,
  },
  {
    id: 6,
    category: "MEDICAL TECHNOLOGY",
    badge: "",
    title:
      "Surgical Robotics Enters a New Phase of Clinical Innovation",
    excerpt:
      "Hospitals and medical-device companies are exploring new robotic systems designed to improve surgical precision.",
    author: "Sagar Kumar",
    time: "12 hrs ago",
    image: HC3Img,
  },
];

const moreStories = [
  {
    id: 1,
    category: "HEALTHCARE",
    title:
      "WHO Declares End to COVID-XE Variant Concern; Surveillance Continues",
    time: "3 hr ago",
    image: HC2Img,
  },
  {
    id: 2,
    category: "HEALTHCARE",
    title:
      "CRISPR Therapy Cures Sickle Cell Disease in Early Clinical Results",
    time: "5 hr ago",
    image: HC3Img,
  },
  {
    id: 3,
    category: "HEALTHCARE",
    title:
      "Global Healthcare Systems Increase Investment in AI Diagnostics",
    time: "7 hr ago",
    image: HC4Img,
  },
];

const sponsoredEvents = [
  {
    title: "Global Health Summit 2026",
    subtitle: "Sponsored Event",
  },
  {
    title: "Tech Leaders Forum",
    subtitle: "Sponsored Event",
  },
  {
    title: "Healthcare Innovation Conference",
    subtitle: "Sponsored Event",
  },
  {
    title: "AI & Healthcare World",
    subtitle: "Sponsored Event",
  },
];

/* =========================================================
   AD BANNER
========================================================= */

function AdBanner({
  secondary = false,
}: {
  secondary?: boolean;
}) {
  return (
    <div className="relative w-full h-[74px] md:h-[88px] bg-[#102d35] overflow-hidden flex flex-col items-center justify-center text-center">
      <span className="text-[7px] md:text-[8px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
        GOOGLE ADSENSE
      </span>

      <strong className="mt-1 text-[12px] md:text-sm font-semibold text-white">
        {secondary
          ? "Business Solutions | Powered by The Pride Times"
          : "Advertisement Space"}
      </strong>

      <span className="mt-0.5 text-[8px] md:text-[9px] text-cyan-300">
        728 × 90 • Leaderboard
      </span>

      <span className="absolute top-0 right-0 bg-white/80 px-1.5 py-0.5 text-[6px] text-gray-500">
        Advertisement
      </span>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  marginBottom = "mb-5",
}: {
  title: string;
  marginBottom?: string;
}) {
  return (
    <div
      className={`flex items-center border-t-2 border-black pt-3 ${marginBottom}`}
    >
      <h2 className="font-sans text-sm md:text-base font-bold text-gray-900">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   STORY META
========================================================= */

function StoryMeta({
  author,
  time,
}: {
  author: string;
  time: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[9px] md:text-[10px] text-gray-400">
      <span>By {author}</span>

      <span className="flex items-center gap-1">
        <Clock size={10} strokeWidth={2} />
        {time}
      </span>
    </div>
  );
}

/* =========================================================
   LATEST STORY CARD
========================================================= */

function LatestStoryCard({
  story,
}: {
  story: (typeof latestNews)[number];
}) {
  return (
    <article className="group overflow-hidden rounded-md border border-gray-200 bg-white hover:shadow-md transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-[165px] sm:h-[185px] md:h-[175px] lg:h-[185px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-3 md:p-4">
        <div className="flex items-center gap-2">
          <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.08em] text-red-600">
            {story.category}
          </span>

          {story.badge && (
            <span className="rounded-sm bg-red-600 px-1.5 py-0.5 text-[6px] font-bold text-white">
              {story.badge}
            </span>
          )}
        </div>

        <h3 className="mt-1.5 font-serif text-[15px] md:text-[16px] lg:text-[17px] font-bold leading-[1.18] text-gray-900 group-hover:text-red-600 transition-colors duration-200">
          {story.title}
        </h3>

        <p className="mt-2 text-[10px] md:text-[11px] leading-[1.5] text-gray-500 line-clamp-3">
          {story.excerpt}
        </p>

        <div className="mt-3 pt-2.5 border-t border-gray-100">
          <StoryMeta
            author={story.author}
            time={story.time}
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SPONSORED CONTENT
========================================================= */

function SponsoredContent() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[8px] font-bold tracking-[0.14em] text-gray-400 uppercase">
          Sponsored Content
        </span>

        <span className="text-[7px] text-gray-400">Ad</span>
      </div>

      <div className="h-[150px] md:h-[168px] bg-[#171c3a] flex flex-col items-center justify-center text-center px-4">
        <span className="text-[8px] font-bold tracking-[0.16em] text-yellow-400 uppercase">
          Featured Partner
        </span>

        <strong className="mt-3 font-serif text-lg text-white">
          Your Ad Here
        </strong>

        <span className="mt-2 text-[9px] text-gray-300">
          Reach 2M+ business readers
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   MORE STORIES
========================================================= */

function MoreStories() {
  return (
    <div className="mt-5">
      <div className="border-b-2 border-black pb-2 mb-2">
        <h3 className="text-[11px] md:text-xs font-bold uppercase tracking-wide text-gray-900">
          More Stories
        </h3>
      </div>

      <div>
        {moreStories.map((story) => (
          <article
            key={story.id}
            className="group flex gap-3 py-2.5 border-b border-gray-200 last:border-b-0"
          >
            <div className="w-[70px] h-[52px] md:w-[74px] md:h-[56px] rounded-sm overflow-hidden shrink-0">
              <ImageWithFallback
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="min-w-0">
              <span className="text-[7px] font-bold text-red-600 uppercase">
                {story.category}
              </span>

              <h4 className="mt-0.5 text-[9px] md:text-[10px] font-semibold leading-[1.25] text-gray-800 group-hover:text-red-600 transition-colors">
                {story.title}
              </h4>

              <span className="mt-1 block text-[7px] text-gray-400">
                {story.time}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SPONSORSHIP SECTION
========================================================= */

function SponsorshipSection() {
  return (
    <section className="mt-8 md:mt-10 rounded-md bg-[#f7f7f7] border border-gray-100 p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="rounded-sm border border-gray-300 px-2 py-1 text-[7px] font-bold tracking-[0.1em] text-gray-400 uppercase">
          Sponsorship
        </span>

        <span className="text-[8px] text-gray-400">
          Presented by our partners
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sponsoredEvents.map((event) => (
          <div
            key={event.title}
            className="flex min-h-[74px] flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-3 text-center"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50">
              <span className="text-[10px] text-red-500">✦</span>
            </div>

            <h4 className="mt-2 text-[9px] font-bold text-gray-800">
              {event.title}
            </h4>

            <span className="mt-0.5 text-[7px] text-gray-400">
              {event.subtitle}
            </span>
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
    <section className="mt-8 md:mt-10 rounded-md bg-[#071a2d] px-5 py-8 md:py-10 text-center">
      <h2 className="font-serif text-xl md:text-2xl font-bold text-white">
        Stay Ahead with The Pride Times
      </h2>

      <p className="mt-1.5 text-[10px] md:text-xs text-gray-300">
        Daily briefings on Healthcare delivered to your inbox.
      </p>

      <div className="mx-auto mt-5 flex w-full max-w-[440px] flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="h-9 flex-1 rounded-sm border border-white/10 bg-white/10 px-3 text-[10px] text-white placeholder:text-gray-400 outline-none focus:border-red-500"
        />

        <button
          type="button"
          className="h-9 rounded-sm bg-red-600 px-5 text-[10px] font-bold text-white transition-colors hover:bg-red-700"
        >
          Subscribe Free
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function HealthcarePage() {
  return (
    <main className="w-full bg-white text-gray-900 antialiased">
      {/* FULL WIDTH PAGE CONTENT */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 md:py-6">

        {/* =================================================
            TOP RED RULE + PAGE TITLE
        ================================================= */}

        <header className="border-t-[3px] border-red-600 pt-4 md:pt-5 mb-5 md:mb-6">
          <h1 className="font-serif text-[27px] sm:text-[31px] md:text-[36px] font-bold leading-none text-gray-950">
            Healthcare
          </h1>

          <p className="mt-2 text-[10px] md:text-[11px] text-gray-500">
            Medicine, biotechnology, pharmaceuticals, and the future of
            healthcare.
          </p>
        </header>

        {/* =================================================
            TOP AD
        ================================================= */}

        <AdBanner />

        {/* =================================================
            HERO + SIDEBAR
        ================================================= */}

        <section className="mt-4 md:mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">

          {/* MAIN HERO */}
          <article className="lg:col-span-9 group">
            <div className="overflow-hidden rounded-md">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-[250px] sm:h-[330px] md:h-[390px] lg:h-[405px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
            </div>

            <div className="mt-3">
              <span className="text-[8px] md:text-[9px] font-bold text-red-600 uppercase tracking-[0.12em]">
                {hero.category}
              </span>

              <h2 className="mt-1.5 font-serif text-[24px] sm:text-[28px] md:text-[32px] lg:text-[34px] font-bold leading-[1.08] text-gray-950 group-hover:text-red-600 transition-colors">
                {hero.title}
              </h2>

              <p className="mt-2 text-[11px] md:text-[12px] lg:text-[13px] leading-[1.6] text-gray-500 max-w-5xl">
                {hero.excerpt}
              </p>

              <div className="mt-3 pt-2.5 border-t border-gray-200">
                <StoryMeta
                  author={hero.author}
                  time={hero.time}
                />
              </div>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-3">
            <SponsoredContent />
            <MoreStories />
          </aside>
        </section>

        {/* =================================================
            LATEST HEALTHCARE NEWS
        ================================================= */}

        <section className="mt-8 md:mt-10">
          <SectionHeader title="Latest Healthcare News" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {latestNews.map((story) => (
              <LatestStoryCard
                key={story.id}
                story={story}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            SECOND AD
        ================================================= */}

        <div className="mt-6 md:mt-8">
          <AdBanner secondary />
        </div>

        {/* =================================================
            SPONSORSHIP
        ================================================= */}

        <SponsorshipSection />

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <Newsletter />

        {/* =================================================
            BOTTOM SPACE
        ================================================= */}

        <div className="h-8 md:h-12" />
      </div>
    </main>
  );
}
