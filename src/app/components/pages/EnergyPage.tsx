import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, ChevronRight, Zap, TrendingUp, Minus } from "lucide-react";
import { Link } from "react-router";
import { PrideTimesAd } from "../AdSenseSlots";
import { specialArticlePath } from "../../data/specialArticleData";
import {
  energyArticles,
  energyGlance,
  energyCompanies,
  energyOutlookNote,
} from "../../data/energyNewsData";

function SH({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-2">
      <h2 className="font-serif text-[21px] font-bold uppercase tracking-wide md:text-[24px]">
        {title}
      </h2>
      <ChevronRight size={14} />
    </div>
  );
}

/* Resize an Unsplash image URL for the slot it is used in. */
function sized(url: string | undefined, width: number) {
  return (url ?? "").replace(/w=\d+/, `w=${width}`);
}

/* =========================================================
   LISTING DATA
   Every story appears once in the main flow:
   - Hero (image slot)       -> story 1
   - Two-up (image slots)    -> stories 2-3
   - Latest grid (image slots) -> stories 4-6
========================================================= */

const [heroStory, ...restStories] = energyArticles;
const twoUpStories = restStories.slice(0, 2);
const latestStories = restStories.slice(2);

export function EnergyPage() {
  return (
    <main className="min-h-screen bg-white text-[#17140F] antialiased">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="border-b-4 border-black pb-4">
          <div className="flex items-center gap-3">
            <Zap size={24} />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-600">THE PRIDE TIMES</p>
              <h1 className="mt-1 font-serif text-[32px] font-bold leading-none md:text-[46px]">Energy</h1>
              <p className="mt-2 max-w-3xl text-xs leading-6 text-gray-500 md:text-sm">
                Oil, gas, power markets, grids and the corporate transition strategies shaping the energy mix.
              </p>
            </div>
          </div>
        </header>

        <PrideTimesAd variant="first" />

        {/* HERO (IMAGE SLOT 1) + MARKET WATCH */}
        <section className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,2.2fr)_minmax(280px,1fr)]">
          <Link to={specialArticlePath(heroStory.id)} className="group block">
            <div className="overflow-hidden rounded bg-gray-100">
              <ImageWithFallback src={sized(heroStory.image, 1400)} alt={heroStory.title} className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] sm:h-[380px] md:h-[500px]" />
            </div>
            <div className="pt-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">{heroStory.category}</span>
              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight group-hover:text-red-600 md:text-5xl">{heroStory.title}</h2>
              <p className="mt-3 max-w-5xl text-sm leading-7 text-gray-600 md:text-base">{heroStory.dek}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-gray-400">
                <span>By {heroStory.author}</span><span>•</span><span>{heroStory.publishedAt}</span><span>•</span><span>{heroStory.readTime}</span>
              </div>
            </div>
          </Link>

          {/* SIDEBAR — TEXT ONLY */}
          <aside className="border-l border-gray-200 pl-0 lg:pl-6">
            <SH title="Energy Market Watch" />
            <div className="divide-y divide-gray-200">
              {energyGlance.map((item) => {
                const positive = item.outlook === "Positive";
                return (
                  <div key={item.theme} className="flex items-center justify-between py-4">
                    <div className="max-w-[55%]">
                      <p className="text-xs text-gray-700">{item.theme}</p>
                      <p className="mt-1 text-[9px] uppercase tracking-wider text-gray-400">Momentum: {item.momentum}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{item.outlook}</p>
                      <p className={`mt-1 flex items-center justify-end gap-1 text-[9px] font-bold uppercase ${positive ? "text-green-700" : "text-gray-500"}`}>
                        {positive ? <TrendingUp size={10} /> : <Minus size={10} />}Outlook
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </section>

        {/* TWO-UP (IMAGE SLOTS 2-3) */}
        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {twoUpStories.map((item) => (
            <Link key={item.id} to={specialArticlePath(item.id)} className="group block border-t-2 border-black pt-4">
              <div className="overflow-hidden rounded bg-gray-100">
                <ImageWithFallback src={sized(item.image, 1200)} alt={item.title} className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-80" />
              </div>
              <span className="mt-3 inline-block text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">{item.category}</span>
              <h2 className="mt-1 font-serif text-2xl font-bold leading-tight group-hover:text-red-600 md:text-3xl">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.dek}</p>
            </Link>
          ))}
        </section>

        <PrideTimesAd variant="second" />

        {/* LATEST ENERGY NEWS (IMAGE SLOTS 4-6) */}
        <section className="mt-10 border-t-2 border-black pt-7">
          <SH title="Latest Energy News" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {latestStories.map((item) => (
              <Link key={item.id} to={specialArticlePath(item.id)} className="group block">
                <div className="overflow-hidden rounded bg-gray-100">
                  <ImageWithFallback src={sized(item.image, 800)} alt={item.title} className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <span className="mt-3 inline-block text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">{item.category}</span>
                <h3 className="mt-1 font-serif text-xl font-bold leading-tight group-hover:text-red-600">{item.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{item.dek}</p>
                <span className="mt-2 flex items-center gap-1 text-[9px] uppercase tracking-wider text-gray-400"><Clock size={9} /> {item.readTime}</span>
              </Link>
            ))}
          </div>
        </section>

        <PrideTimesAd variant="third" />

        {/* COMPANIES IN FOCUS + OUTLOOK (TEXT ONLY) */}
        <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <SH title="Companies in Focus" />
            <div className="divide-y divide-gray-200">
              {energyCompanies.map((item) => (
                <Link key={item.articleId} to={specialArticlePath(item.articleId)} className="group flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold group-hover:text-red-600 md:text-base">{item.company}</p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-wider text-gray-400">{item.location}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-semibold md:text-sm">{item.headline}</p>
                    <p className="mt-0.5 text-[10px] text-gray-500">{item.detail}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <SH title="Energy Outlook" />
            <div className="border border-gray-200 bg-[#f7f7f5] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">{energyOutlookNote.kicker}</p>
              <h3 className="mt-2 font-serif text-2xl font-bold">{energyOutlookNote.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">{energyOutlookNote.body}</p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {energyOutlookNote.tiles.map((tile) => (
                  <div key={tile.label} className="bg-white p-4">
                    <p className="text-[9px] uppercase tracking-wider text-gray-400">{tile.label}</p>
                    <p className="mt-1 text-sm font-semibold">{tile.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PrideTimesAd variant="fourth" />
      </div>
    </main>
  );
}

export default EnergyPage;
