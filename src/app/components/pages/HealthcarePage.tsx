
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, Heart, Radio, TrendingUp, ArrowUpRight } from "lucide-react";

import HC1Img from "../../../imports/HC1.png";
import HC2Img from "../../../imports/HC2.png";
import HC3Img from "../../../imports/HC3.png";
import HC4Img from "../../../imports/HC4.png";

function SectionHeader({
  title,
  accent = "teal",
}: {
  title: string;
  accent?: "teal" | "rose" | "slate";
}) {
  const accentClass = {
    teal: "bg-teal-500",
    rose: "bg-rose-500",
    slate: "bg-slate-500",
  }[accent];

  return (
    <div className="flex items-center gap-3 border-b border-gray-300 pb-3 mb-6">
      <span className={`w-1.5 h-6 rounded-full ${accentClass}`} />
      <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.14em] text-gray-900">
        {title}
      </h2>
    </div>
  );
}

const hero = {
  category: "MEDICAL BREAKTHROUGH",
  title: "Global Health Financing Under Structural Transformation in 2026",
  excerpt:
    "The 2026 JP Morgan Healthcare Conference set the tone for a year defined by structural transformation in global health financing. Industry leaders emphasized that success in Asian and African healthcare markets requires investment across the full health ecosystem — regulatory alignment, financing pathways, supply chain readiness, workforce capacity, and digital infrastructure — rather than relying on individual product launches or point-solution deployments. The Bay Area Global Health Alliance's synthesis of 40 major health trend reports identifies aid contraction as structural rather than cyclical. Traditional donor-driven growth is giving way to domestic resource mobilization, co-financing frameworks, and blended capital structures.",
  author: "Sagar Kumar",
  time: "Feb–June 2026",
  image: HC1Img,
};

const hero1 = {
  category: "GLOBAL HEALTH",
  title: "Implementation Disruption and Supply Chain Delays Challenge LMICs",
  excerpt:
    "Frontline health organizations across low- and middle-income countries have reported significant implementation gaps stemming from rapid aid restructuring and funding shifts. The disruptions have translated into supply chain delays for essential medicines and medical devices, workforce instability, and strategic planning uncertainty.",
  author: "Sagar Kumar",
  time: "May 2026",
  image: HC2Img,
};

const hero2 = {
  category: "HEALTH ECONOMICS",
  title: "Medical Supply Inflation Expected to Reach 2.58% in 2026",
  excerpt:
    "Vizient's State of the Healthcare Industry 2026 report projects that inflation in medical and surgical supplies will reach a full-year rate of 2.58%. Hospital procurement executives are being advised to diversify supplier bases, accelerate contract negotiations and invest in demand-sensing analytics.",
  author: "Sagar Kumar",
  time: "Jan–June 2026",
  image: HC3Img,
};

const hero3 = {
  category: "HEALTHCARE AI",
  title: "AI in Healthcare: Transforming Diagnostics and Clinical Workflows",
  excerpt:
    "AI-assisted radiology, genomic analysis, clinical decision support and administrative automation are generating measurable efficiency gains across health systems. The next challenge is interoperability, with healthcare organizations investing heavily in data governance and modern electronic health-record infrastructure.",
  author: "Sagar Kumar",
  time: "June 2026",
  image: HC4Img,
};

const breakthroughs = [
  {
    id: 1,
    title:
      "CRISPR 3.0 Corrects Hearing Loss Mutation in 92% of Clinical Trial Patients",
    time: "2 hrs ago",
    category: "GENE THERAPY",
  },
  {
    id: 2,
    title:
      "AI System Detects Alzheimer's Disease 15 Years Before Symptoms Appear with 89% Accuracy",
    time: "4 hrs ago",
    category: "AI DIAGNOSTICS",
  },
  {
    id: 3,
    title:
      "Lab-Grown Kidney Successfully Transplanted Into Human — World First",
    time: "7 hrs ago",
    category: "ORGAN BIOENGINEERING",
  },
];

const pharmaNews = [
  {
    id: 1,
    title:
      "Novo Nordisk's Ozempic 2.0 Shows 24% Weight Loss in Phase 3 Trials",
    time: "3 hrs ago",
  },
  {
    id: 2,
    title:
      "Pfizer Expands Indian Biotech Partnerships to Strengthen Biosimilars",
    time: "5 hrs ago",
  },
  {
    id: 3,
    title:
      "FDA Fast-Tracks AI-Assisted Drug Discovery Compounds",
    time: "7 hrs ago",
  },
  {
    id: 4,
    title:
      "Johnson & Johnson Restructures Its MedTech Business",
    time: "9 hrs ago",
  },
];

const healthTechStories = [
  {
    id: 1,
    title:
      "Joint Commission launches responsible AI certification for healthcare organizations.",
    time: "Just now",
  },
  {
    id: 2,
    title:
      "Wearable health technology continues expanding into preventative monitoring.",
    time: "2 hrs ago",
  },
  {
    id: 3,
    title:
      "Surgical robotics enters a new phase of autonomous procedure development.",
    time: "4 hrs ago",
  },
  {
    id: 4,
    title:
      "Digital therapeutics market expands as clinically validated platforms mature.",
    time: "6 hrs ago",
  },
  {
    id: 5,
    title:
      "Indian hospital networks accelerate AI-powered radiology deployments.",
    time: "8 hrs ago",
  },
];

const globalHealthNews = [
  {
    id: 1,
    title:
      "WHO reports continued progress toward malaria elimination across Africa.",
    time: "1 hr ago",
  },
  {
    id: 2,
    title:
      "Universal health coverage continues expanding across emerging markets.",
    time: "3 hrs ago",
  },
  {
    id: 3,
    title:
      "Antibiotic resistance remains one of the world's most urgent health threats.",
    time: "5 hrs ago",
  },
  {
    id: 4,
    title:
      "India expands access to comprehensive healthcare coverage through public programs.",
    time: "7 hrs ago",
  },
];

const healthcareStocks = [
  {
    company: "UnitedHealth Group",
    ticker: "UNH",
    price: "$567.20",
    change: "+1.8%",
    up: true,
  },
  {
    company: "Johnson & Johnson",
    ticker: "JNJ",
    price: "$156.40",
    change: "+0.5%",
    up: true,
  },
  {
    company: "Novo Nordisk",
    ticker: "NVO",
    price: "$124.70",
    change: "+5.2%",
    up: true,
  },
  {
    company: "Abbott Labs",
    ticker: "ABT",
    price: "$123.90",
    change: "+2.1%",
    up: true,
  },
  {
    company: "Moderna",
    ticker: "MRNA",
    price: "$89.30",
    change: "+7.4%",
    up: true,
  },
];

function StoryMeta({
  author,
  time,
}: {
  author?: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-gray-400">
      {author && <span>By {author}</span>}
      <span className="flex items-center gap-1">
        <Clock size={11} />
        {time}
      </span>
    </div>
  );
}

function SecondaryStory({
  data,
}: {
  data: typeof hero2;
}) {
  return (
    <article className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
        <ImageWithFallback
          src={data.image}
          alt={data.title}
          className="w-full h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-white text-gray-900 text-[10px] font-bold tracking-[0.12em] rounded-sm">
          {data.category}
        </span>
      </div>

      <h3 className="font-serif text-xl md:text-2xl leading-tight text-gray-900 group-hover:text-teal-700 transition-colors">
        {data.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-4">
        {data.excerpt}
      </p>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <StoryMeta author={data.author} time={data.time} />
      </div>
    </article>
  );
}

function NewsColumn({
  title,
  accent,
  items,
}: {
  title: string;
  accent: "teal" | "rose" | "slate";
  items: { id: number; title: string; time: string }[];
}) {
  const accentClass = {
    teal: "border-teal-500",
    rose: "border-rose-500",
    slate: "border-slate-500",
  }[accent];

  return (
    <section>
      <SectionHeader title={title} accent={accent} />

      <div>
        {items.map((item, index) => (
          <article
            key={`${title}-${item.id}-${index}`}
            className={`group py-4 border-b border-gray-100 border-l-2 border-transparent pl-4 hover:${accentClass} hover:bg-gray-50 transition-all cursor-pointer`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xs font-mono text-gray-300 pt-0.5">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="text-sm font-medium leading-5 text-gray-800 group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>

                <span className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
                  <Clock size={10} />
                  {item.time}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HealthcarePage() {
  return (
    <main className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

        {/* PAGE HEADER */}
        <header className="relative mb-10 pb-5 border-b-4 border-gray-950">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-gray-950 flex items-center justify-center">
              <Heart
                size={19}
                className="text-teal-400"
                fill="currentColor"
              />
            </div>

            <div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                Medicine & BioTech
              </p>

              <h1 className="mt-1 font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                Healthcare & Life Sciences
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-500">
            The latest developments across medicine, biotechnology,
            healthcare technology, pharmaceuticals and global health.
          </p>
        </header>

        {/* HERO AREA */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-14">

          {/* MAIN HERO */}
          <article className="lg:col-span-8 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <ImageWithFallback
                src={hero.image}
                alt={hero.title}
                className="w-full h-[300px] sm:h-[380px] lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute left-5 right-5 bottom-5 md:left-7 md:right-7 md:bottom-7">
                <span className="inline-block px-3 py-1.5 mb-3 bg-teal-600 text-white text-[10px] font-bold tracking-[0.15em] rounded-sm">
                  {hero.category}
                </span>

                <h2 className="max-w-4xl font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] leading-[1.08] text-white">
                  {hero.title}
                </h2>
              </div>
            </div>

            <p className="mt-4 text-sm md:text-[15px] leading-7 text-gray-600 max-w-5xl">
              {hero.excerpt}
            </p>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <StoryMeta
                author={hero.author}
                time={hero.time}
              />
            </div>
          </article>

          {/* STOCK PANEL */}
          <aside className="lg:col-span-4">
            <div className="bg-gray-950 rounded-lg overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio
                    size={13}
                    className="text-teal-400 animate-pulse"
                  />

                  <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                    Healthcare Stocks
                  </h2>
                </div>

                <span className="text-[9px] uppercase tracking-wider text-teal-400">
                  Live
                </span>
              </div>

              <div className="px-5">
                {healthcareStocks.map((stock) => (
                  <div
                    key={stock.ticker}
                    className="py-4 border-b border-white/10 last:border-0 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs text-gray-200">
                        {stock.company}
                      </p>

                      <p className="mt-1 text-[10px] font-mono text-gray-500 tracking-wider">
                        {stock.ticker}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-mono text-white">
                        {stock.price}
                      </p>

                      <p
                        className={`mt-1 text-[11px] font-mono font-semibold ${
                          stock.up
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {stock.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 py-4 bg-white/[0.03]">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Healthcare market snapshot
                </p>
              </div>
            </div>

            {/* MARKET NOTE */}
            <div className="mt-5 p-5 border border-gray-200 rounded-lg bg-gray-50">
              <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-gray-500">
                Market Focus
              </p>

              <p className="mt-2 font-serif text-lg leading-tight">
                Biotech, AI diagnostics and precision medicine remain key
                areas of healthcare investment.
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-teal-700">
                Explore healthcare markets
                <ArrowUpRight size={13} />
              </div>
            </div>
          </aside>
        </section>

        {/* FEATURE STORY */}
        <section className="mb-14">
          <SectionHeader title="Healthcare Intelligence" />

          <article className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden group cursor-pointer">
            <div className="overflow-hidden">
              <ImageWithFallback
                src={hero1.image}
                alt={hero1.title}
                className="w-full h-64 md:h-full min-h-[300px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">
                {hero1.category}
              </span>

              <h2 className="mt-3 font-serif text-2xl md:text-3xl lg:text-4xl leading-tight group-hover:text-teal-700 transition-colors">
                {hero1.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                {hero1.excerpt}
              </p>

              <div className="mt-5 pt-4 border-t border-gray-200">
                <StoryMeta
                  author={hero1.author}
                  time={hero1.time}
                />
              </div>
            </div>
          </article>
        </section>

        {/* TWO SECONDARY STORIES */}
        <section className="mb-14">
          <SectionHeader title="Industry & Innovation" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <SecondaryStory data={hero2} />
            <SecondaryStory data={hero3} />
          </div>
        </section>

        {/* MEDICAL BREAKTHROUGHS */}
        <section className="mb-14">
          <SectionHeader title="Medical Breakthroughs" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {breakthroughs.map((item, index) => (
              <article
                key={item.id}
                className="group relative border border-gray-200 rounded-lg p-5 hover:border-teal-300 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-teal-700">
                    {item.category}
                  </span>

                  <span className="text-xs font-mono text-gray-300">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-serif text-xl leading-tight group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>

                <div className="mt-5 flex items-center gap-1 text-[10px] text-gray-400">
                  <Clock size={10} />
                  {item.time}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* NEWS COLUMNS */}
        <section className="pt-8 border-t-2 border-gray-950">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">

            <NewsColumn
              title="Pharma & Biotech"
              accent="teal"
              items={pharmaNews}
            />

            <NewsColumn
              title="HealthTech & Digital"
              accent="rose"
              items={healthTechStories}
            />

            <NewsColumn
              title="Global Health"
              accent="slate"
              items={globalHealthNews}
            />

          </div>
        </section>

        {/* BOTTOM EDITORIAL STRIP */}
        <section className="mt-14 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">
                The Pride Times
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Healthcare & Life Sciences Desk
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <TrendingUp size={13} />
              Tracking healthcare innovation worldwide
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

