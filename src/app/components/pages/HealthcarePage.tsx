import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { specialArticlePath } from "../../data/specialArticleData";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import HC1Img from "../../../imports/HC1.png";
import HC2Img from "../../../imports/HC2.png";
import HC3Img from "../../../imports/HC3.png";
import HC4Img from "../../../imports/HC4.png";

/* =========================================================
   TYPES
========================================================= */

type Story = {
  id?: number;
  category: string;
  badge?: string;
  title: string;
  excerpt?: string;
  author?: string;
  time: string;
  image: string;
};

/* =========================================================
   HERO DATA
========================================================= */

const hero: Story = {
  category: "HEALTHCARE",
  title: "How Biotech Innovations Are Extending & Improving Lives",
  excerpt:
    "Gene-editing therapies, AI-driven drug discovery, and personalized medicine are converging to tackle diseases that were once considered untreatable.",
  author: "Sagar Kumar",
  time: "8 hr ago",
  image: HC1Img,
};

/* =========================================================
   MAJOR STORIES
========================================================= */

const majorStories: Story[] = [
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
];

/* =========================================================
   SUPPORTING STORIES
========================================================= */

const supportingStories: Story[] = [
  {
    id: 3,
    category: "ORGAN BIOENGINEERING",
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
    title:
      "Novo Nordisk Expands Next-Generation Obesity Drug Development",
    excerpt:
      "Pharmaceutical companies continue investing in therapies designed to improve treatment outcomes and patient access.",
    author: "Sagar Kumar",
    time: "9 hrs ago",
    image: HC1Img,
  },
];

/* =========================================================
   LATEST NEWS
========================================================= */

const latestNews: Story[] = [
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
    title:
      "Surgical Robotics Enters a New Phase of Clinical Innovation",
    excerpt:
      "Hospitals and medical-device companies are exploring new robotic systems designed to improve surgical precision.",
    author: "Sagar Kumar",
    time: "12 hrs ago",
    image: HC3Img,
  },
];

/* =========================================================
   MORE STORIES
========================================================= */

const moreStories: Story[] = [
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

/* =========================================================
   SPONSORED EVENTS
========================================================= */

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
    <div className="relative w-full h-[58px] md:h-[72px] bg-[#102d35] overflow-hidden flex flex-col items-center justify-center text-center">
      <span className="absolute top-1 right-1 text-[7px] text-gray-400 border border-gray-500 px-1">
        Advertisement
      </span>

      <span className="text-[7px] md:text-[8px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
        GOOGLE ADSENSE
      </span>

      <strong className="mt-0.5 text-[10px] md:text-[12px] font-semibold text-white">
        {secondary
          ? "Business Solutions | Powered by The Pride Times"
          : "Advertisement Space"}
      </strong>

      <span className="text-[7px] md:text-[8px] text-cyan-300">
        728 × 90 • Leaderboard
      </span>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-t-2 border-black pt-3 mb-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-[17px] md:text-[20px] font-bold text-gray-950">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-0.5 text-[8px] md:text-[9px] text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        <ArrowRight
          size={14}
          className="shrink-0 text-gray-400"
        />
      </div>
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
  author?: string;
  time: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-[8px] md:text-[9px] text-gray-400">
      {author && <span>By {author}</span>}

      {author && <span>·</span>}

      <span className="flex items-center gap-1">
        <Clock size={9} strokeWidth={2} />
        {time}
      </span>
    </div>
  );
}

/* =========================================================
   HERO STORY
========================================================= */

function HeroStory() {
  return (
    <Link to={specialArticlePath("healthcare-biotech-lives")} className="block">
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-md h-[250px] sm:h-[330px] md:h-[390px] lg:h-[400px]">
        <ImageWithFallback
          src={hero.image}
          alt={hero.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />

        <div className="absolute left-3 bottom-3 bg-black/75 px-2 py-1">
          <span className="text-[7px] md:text-[8px] font-bold tracking-[0.14em] uppercase text-white">
            Lead Story
          </span>
        </div>
      </div>

      <div className="pt-2.5 md:pt-3">
        <p className="text-[8px] md:text-[9px] font-bold tracking-[0.14em] uppercase text-[#e31b23]">
          {hero.category}
        </p>

        <h2 className="mt-1 font-serif text-[23px] sm:text-[27px] md:text-[31px] lg:text-[34px] font-bold leading-[1.08] text-gray-950 group-hover:text-[#e31b23] transition-colors">
          {hero.title}
        </h2>

        <p className="mt-2 text-[10px] md:text-[12px] lg:text-[13px] leading-[1.55] text-gray-500 max-w-5xl">
          {hero.excerpt}
        </p>

        <div className="mt-2.5 pt-2 border-t border-gray-200">
          <StoryMeta
            author={hero.author}
            time={hero.time}
          />
        </div>
      </div>
    </article>
    </Link>
  );
}

/* =========================================================
   MAJOR STORY
========================================================= */

function MajorStory({ story }: { story: Story }) {
  return (
    <article className="group border-b border-gray-200 pb-3">
      <div className="relative h-[125px] sm:h-[145px] md:h-[150px] overflow-hidden rounded-sm">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {story.badge && (
          <span className="absolute top-2 left-2 bg-[#e31b23] text-white text-[6px] font-bold px-1.5 py-1 uppercase">
            {story.badge}
          </span>
        )}
      </div>

      <div className="pt-2">
        <p className="text-[7px] md:text-[8px] font-bold tracking-[0.1em] uppercase text-[#e31b23]">
          {story.category}
        </p>

        <h3 className="mt-1 font-serif text-[14px] md:text-[16px] font-bold leading-[1.18] text-gray-900 group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h3>

        {story.excerpt && (
          <p className="mt-1.5 text-[8px] md:text-[9px] leading-[1.45] text-gray-500 line-clamp-3">
            {story.excerpt}
          </p>
        )}

        <div className="mt-2">
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
   SUPPORTING STORY
========================================================= */

function SupportingStory({ story }: { story: Story }) {
  return (
    <article className="group flex gap-3 py-3 border-b border-gray-200 last:border-b-0">
      <div className="w-[95px] h-[68px] md:w-[115px] md:h-[78px] shrink-0 overflow-hidden rounded-sm">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[7px] md:text-[8px] font-bold tracking-[0.08em] uppercase text-[#e31b23]">
          {story.category}
        </p>

        <h3 className="mt-0.5 font-serif text-[12px] md:text-[14px] font-bold leading-[1.2] text-gray-900 group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h3>

        <p className="mt-1 text-[8px] md:text-[9px] leading-[1.4] text-gray-500 line-clamp-2">
          {story.excerpt}
        </p>

        <div className="mt-1.5">
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
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="px-2.5 py-1.5 flex items-center justify-between bg-[#faf9f4]">
        <span className="text-[7px] font-bold tracking-[0.14em] text-gray-400 uppercase">
          Sponsored Content
        </span>

        <span className="text-[7px] text-gray-400">
          Ad
        </span>
      </div>

      <div className="h-[145px] md:h-[160px] bg-[#171c3a] flex flex-col items-center justify-center text-center px-4">
        <span className="text-[8px] font-bold tracking-[0.16em] text-yellow-400 uppercase">
          Featured Partner
        </span>

        <strong className="mt-2.5 font-serif text-[15px] text-white">
          Your Ad Here
        </strong>

        <span className="mt-1.5 text-[8px] text-gray-300">
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
      <div className="border-b-2 border-black pb-2 mb-1">
        <h3 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.08em] text-gray-900">
          More Stories
        </h3>
      </div>

      <div>
        {moreStories.map((story) => (
          <article
            key={story.id}
            className="group flex gap-2.5 py-2.5 border-b border-gray-200 last:border-b-0"
          >
            <div className="w-[58px] h-[45px] md:w-[65px] md:h-[50px] shrink-0 overflow-hidden rounded-sm">
              <ImageWithFallback
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="min-w-0">
              <p className="text-[7px] font-bold text-[#e31b23] uppercase">
                {story.category}
              </p>

              <h4 className="mt-0.5 font-serif text-[9px] md:text-[10px] font-bold leading-[1.25] text-gray-800 group-hover:text-[#e31b23] transition-colors">
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
   NEWSROOM STREAM
========================================================= */

function NewsroomStream() {
  return (
    <aside className="lg:border-l lg:border-gray-200 lg:pl-4">
      <div className="border-t-2 border-black pt-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-[16px] md:text-[18px] font-bold text-gray-950">
            Newsroom
          </h3>

          <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-gray-400">
            Latest
          </span>
        </div>
      </div>

      <div className="mt-2">
        {latestNews.map((story) => (
          <article
            key={`stream-${story.id}`}
            className="group py-2.5 border-b border-gray-200"
          >
            <div className="flex items-start gap-2">
              <div className="shrink-0 pt-0.5">
                <Clock size={9} className="text-[#e31b23]" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[6px] font-bold uppercase tracking-[0.08em] text-[#e31b23]">
                    {story.category}
                  </span>

                  {story.badge && (
                    <span className="bg-[#e31b23] text-white text-[5px] font-bold px-1 py-0.5 rounded-sm">
                      {story.badge}
                    </span>
                  )}
                </div>

                <h4 className="mt-1 font-serif text-[10px] md:text-[11px] font-bold leading-[1.25] text-gray-900 group-hover:text-[#e31b23] transition-colors">
                  {story.title}
                </h4>

                <p className="mt-1 text-[7px] text-gray-400">
                  {story.time}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}

/* =========================================================
   COVERAGE CARD
========================================================= */

function CoverageCard({ story }: { story: Story }) {
  return (
    <article className="group grid grid-cols-[100px_minmax(0,1fr)] md:grid-cols-[145px_minmax(0,1fr)] gap-3 border-b border-gray-200 pb-3">
      <div className="h-[72px] md:h-[92px] overflow-hidden rounded-sm">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div>
        <p className="text-[7px] md:text-[8px] font-bold tracking-[0.08em] uppercase text-[#e31b23]">
          {story.category}
        </p>

        <h3 className="mt-0.5 font-serif text-[12px] md:text-[14px] font-bold leading-[1.2] text-gray-900 group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h3>

        <p className="mt-1 text-[8px] md:text-[9px] leading-[1.4] text-gray-500 line-clamp-2">
          {story.excerpt}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   NEWS CARD
========================================================= */

function NewsCard({ story }: { story: Story }) {
  return (
    <article className="group border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
      <div className="relative h-[140px] sm:h-[150px] md:h-[155px] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {story.badge && (
          <span className="absolute top-2 left-2 bg-[#e31b23] text-white text-[6px] font-bold px-1.5 py-1 uppercase">
            {story.badge}
          </span>
        )}
      </div>

      <div className="p-2.5 md:p-3">
        <p className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.08em] text-[#e31b23]">
          {story.category}
        </p>

        <h3 className="mt-1 font-serif text-[13px] md:text-[14px] font-bold leading-[1.22] text-gray-900 group-hover:text-[#e31b23] transition-colors">
          {story.title}
        </h3>

        <p className="mt-1.5 text-[8px] md:text-[9px] leading-[1.45] text-gray-500 line-clamp-3">
          {story.excerpt}
        </p>

        <div className="mt-2 pt-2 border-t border-gray-100">
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
   SPONSORSHIP
========================================================= */

function SponsorshipSection() {
  return (
    <section className="mt-6 md:mt-8 rounded-md bg-[#f7f7f7] border border-gray-100 p-3 md:p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="rounded-sm border border-gray-300 px-1.5 py-1 text-[7px] font-bold tracking-[0.1em] text-gray-400 uppercase">
          Sponsorship
        </span>

        <span className="text-[8px] text-gray-400">
          Presented by our partners
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {sponsoredEvents.map((event) => (
          <div
            key={event.title}
            className="flex min-h-[74px] flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-2 text-center"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50">
              <span className="text-[10px] text-[#e31b23]">
                ✦
              </span>
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
    <section className="mt-6 md:mt-8 mb-10">
      <div className="rounded-md bg-[#071a2d] px-5 py-7 md:py-8 text-center">
        <h2 className="font-serif text-[18px] md:text-[20px] font-bold text-white">
          Stay Ahead with The Pride Times
        </h2>

        <p className="mt-1 text-[9px] md:text-[10px] text-gray-300">
          Daily briefings on Healthcare delivered to your inbox.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2 mx-auto max-w-[420px]">
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            className="h-8 flex-1 rounded border border-[#42566b] bg-[#1c344b] px-3 text-[9px] text-white placeholder:text-[#8796a6] outline-none focus:border-[#e31b23]"
          />

          <button
            type="button"
            className="h-8 px-4 rounded bg-[#e31b23] text-white text-[9px] font-bold hover:bg-[#c9151c] transition-colors"
          >
            Subscribe Free
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function HealthcarePage() {
  return (
    <main className="w-full bg-white text-[#17140F] antialiased">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="pt-5 md:pt-7">
          <div className="border-t-[3px] border-[#e31b23] pt-4 md:pt-5">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-1">
              <div>
                <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] font-bold leading-tight text-gray-950">
                  Healthcare
                </h1>

                <p className="mt-1 text-[10px] md:text-[12px] text-gray-500">
                  Medicine, biotechnology, pharmaceuticals, and the future of healthcare.
                </p>
              </div>

              <span className="text-[7px] md:text-[8px] uppercase tracking-[0.14em] font-bold text-gray-400">
                Healthcare & Life Sciences
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            TOP ADVERTISEMENT
        ================================================= */}

        <section className="mt-4 md:mt-5">
          <AdBanner />
        </section>

        {/* =================================================
            LEAD STORY + MAJOR STORIES + SPONSOR
        ================================================= */}

        <section className="mt-4 md:mt-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_235px] gap-5 md:gap-6">

          {/* LEAD */}
          <div className="min-w-0">
            <HeroStory />
          </div>

          {/* EDITORIAL RAIL */}
          <aside className="lg:border-l lg:border-gray-200 lg:pl-4">
            <div className="border-t-2 border-black pt-3">
              <h2 className="font-serif text-[16px] md:text-[18px] font-bold text-gray-950">
                Major Healthcare Stories
              </h2>
            </div>

            <div className="mt-3 space-y-4">
              {majorStories.map((story) => (
                <Link key={story.id} to={specialArticlePath(`healthcare-major-${story.id}`)} className="block"><MajorStory story={story} /></Link>
              ))}
            </div>

            <div className="mt-4">
              <SponsoredContent />
            </div>
          </aside>
        </section>

        {/* =================================================
            HEALTHCARE COVERAGE
        ================================================= */}

        <section className="mt-7 md:mt-9">
          <SectionHeader
            title="Healthcare Coverage"
            subtitle="Research, medicine, technology and pharmaceutical developments"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            {supportingStories.map((story) => (
              <Link key={story.id} to={specialArticlePath(`healthcare-coverage-${story.id}`)} className="block"><CoverageCard story={story} /></Link>
            ))}
          </div>
        </section>

        {/* =================================================
            LATEST NEWS + NEWSROOM
        ================================================= */}

        <section className="mt-7 md:mt-9">
          <SectionHeader
            title="Latest Healthcare News"
            subtitle="A rolling view of the latest healthcare developments"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_225px] gap-5 md:gap-6">

            {/* NEWS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {latestNews.map((story) => (
                <Link key={story.id} to={specialArticlePath(`healthcare-latest-${story.id}`)} className="block"><NewsCard story={story} /></Link>
              ))}
            </div>

            {/* NEWSROOM */}
            <NewsroomStream />
          </div>
        </section>

        {/* =================================================
            SECOND ADVERTISEMENT
        ================================================= */}

        <section className="mt-6 md:mt-7">
          <AdBanner secondary />
        </section>

        {/* =================================================
            MORE FROM HEALTHCARE
        ================================================= */}

        <section className="mt-6 md:mt-8">
          <SectionHeader title="More From Healthcare" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {moreStories.map((story) => (
              <Link
                key={`more-${story.id}`}
                to={specialArticlePath(`healthcare-more-${story.id}`)}
                className="group flex gap-3 border-b border-gray-200 pb-3 md:border md:rounded-md md:p-2.5"
              >
                <div className="w-[80px] h-[58px] md:w-[90px] md:h-[64px] shrink-0 overflow-hidden rounded-sm">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[7px] font-bold uppercase text-[#e31b23]">
                    {story.category}
                  </p>

                  <h3 className="mt-0.5 font-serif text-[10px] md:text-[11px] font-bold leading-[1.25] text-gray-900 group-hover:text-[#e31b23] transition-colors">
                    {story.title}
                  </h3>

                  <p className="mt-1 text-[7px] text-gray-400">
                    {story.time}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =================================================
            SPONSORED EVENTS
        ================================================= */}

        <SponsorshipSection />

        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <Newsletter />

      </div>
    </main>
  );
}

export default HealthcarePage;
