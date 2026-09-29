import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, ChevronRight, Zap, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { PrideTimesAd } from "../AdSenseSlots";
import { specialArticlePath } from "../../data/specialArticleData";

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

const hero = {
  id: "energy-global-disruption-2026",
  category: "ENERGY & GEOPOLITICS",
  title: "Energy Sector Faces a Three-Way Disruption From Geopolitics, AI Power Demand and the Clean Energy Transition",
  excerpt:
    "The global energy sector is navigating simultaneous disruption from geopolitical conflict, the AI power demand surge, and the clean energy transition. CERAWeek 2026 framed the moment as ‘Convergence and Competition: Energy, Technology and Geopolitics,’ highlighting the increasingly connected forces reshaping oil, gas, power and renewables.",
  author: "The Pride Times Editorial Desk",
  time: "September 2026",
  image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=80",
};

const hero1 = {
  id: "energy-oil-gas-supply-disruption",
  category: "OIL & GAS",
  title: "Global Oil Supply Disruption Puts Gulf Flows, Negotiations and Non-OPEC+ Growth in Focus",
  excerpt:
    "Global oil supply fell 5.7 mb/d in 2026 as Gulf output was disrupted amid heightened security risks. The reported impasse in U.S.-Iran negotiations is delaying flow normalization into 2027, while the Americas are driving non-OPEC+ growth.",
  image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1200&q=80",
};

const hero2 = {
  id: "energy-ai-grid-bottlenecks",
  category: "RENEWABLES & POWER",
  title: "AI Data Centers Turn Grid Capacity Into a Strategic Constraint for New Power Demand",
  excerpt:
    "Solar, wind and advanced geothermal investment is expanding, but grid bottlenecks are increasingly constraining new AI data-center capacity. Developers are being pushed to secure generation and storage before data-center construction to reduce the risk of power delays.",
  image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
};

const energyPrices = [
  { commodity: "Global Oil Supply", price: "-5.7 mb/d", change: "2026", up: false },
  { commodity: "Americas Non-OPEC+ Growth", price: "+1.4 mb/d", change: "2026", up: true },
  { commodity: "Gulf Output", price: "Disrupted", change: "Security risk", up: false },
  { commodity: "Flow Normalization", price: "Into 2027", change: "Negotiation impasse", up: false },
  { commodity: "Atlantic Basin Refining", price: "Record margins", change: "August 2026", up: true },
];

const oilGasNews = [
  { id: "energy-oil-gas-supply-disruption", title: "Global oil supply fell 5.7 mb/d in 2026 as Gulf output was disrupted amid heightened security risks." },
  { id: "energy-us-iran-negotiations", title: "U.S.-Iran negotiations impasse delays flow normalization into 2027." },
  { id: "energy-americas-nonopec-growth", title: "The U.S., Canada, Brazil, Guyana and Argentina are dominating non-OPEC+ growth, adding 1.4 mb/d in 2026." },
  { id: "energy-refining-margins-august-2026", title: "Atlantic Basin refining margins reached record levels in August 2026." },
];

const renewableStories = [
  { id: "energy-solar-wind-geothermal-investment", title: "Solar, wind and advanced geothermal investment reaches record levels", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80" },
  { id: "energy-grid-ai-data-centers", title: "Grid bottlenecks increasingly constrain new AI data-center capacity", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" },
  { id: "energy-generation-storage-first", title: "Developers are being pushed to secure generation and storage before data-center construction", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80" },
];

const powerWatch = [
  { id: "energy-geopolitical-price-pressure", title: "Geopolitical pressure is forcing upward energy-price movement in multiple regions." },
  { id: "energy-power-before-construction", title: "Generation and storage availability is becoming a prerequisite for new AI infrastructure." },
  { id: "energy-convergence-competition", title: "Energy, technology and geopolitics are increasingly converging in infrastructure decisions." },
];

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
                Oil, gas, power, renewables, grids and the geopolitical forces reshaping the global energy system in 2026.
              </p>
            </div>
          </div>
        </header>

        <PrideTimesAd variant="first" />

        <section className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,2.2fr)_minmax(280px,1fr)]">
          <Link to={specialArticlePath(hero.id)} className="group block">
            <div className="overflow-hidden rounded bg-gray-100">
              <ImageWithFallback src={hero.image} alt={hero.title} className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] sm:h-[380px] md:h-[500px]" />
            </div>
            <div className="pt-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">{hero.category}</span>
              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight group-hover:text-red-600 md:text-5xl">{hero.title}</h2>
              <p className="mt-3 max-w-5xl text-sm leading-7 text-gray-600 md:text-base">{hero.excerpt}</p>
              <div className="mt-3 flex items-center gap-3 text-[10px] text-gray-400">
                <span>By {hero.author}</span><span>•</span><span>{hero.time}</span>
              </div>
            </div>
          </Link>

          <aside className="border-l border-gray-200 pl-0 lg:pl-6">
            <SH title="Energy Market Watch" />
            <div className="divide-y divide-gray-200">
              {energyPrices.map((item) => (
                <div key={item.commodity} className="flex items-center justify-between py-4">
                  <span className="max-w-[55%] text-xs text-gray-700">{item.commodity}</span>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{item.price}</p>
                    <p className={`mt-1 flex items-center justify-end gap-1 text-[9px] font-bold uppercase ${item.up ? "text-green-700" : "text-red-600"}`}>
                      {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[hero1, hero2].map((item) => (
            <Link key={item.id} to={specialArticlePath(item.id)} className="group block border-t-2 border-black pt-4">
              <div className="overflow-hidden rounded bg-gray-100">
                <ImageWithFallback src={item.image} alt={item.title} className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-80" />
              </div>
              <span className="mt-3 inline-block text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">{item.category}</span>
              <h2 className="mt-1 font-serif text-2xl font-bold leading-tight group-hover:text-red-600 md:text-3xl">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.excerpt}</p>
            </Link>
          ))}
        </section>

        <PrideTimesAd variant="second" />

        <section className="mt-10 border-t-2 border-black pt-7">
          <SH title="Oil & Gas" />
          <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-y-0 md:gap-x-8">
            {oilGasNews.map((item) => (
              <Link key={item.id} to={specialArticlePath(item.id)} className="group border-b border-gray-200 py-4">
                <h3 className="text-sm font-semibold leading-6 group-hover:text-red-600 md:text-base">{item.title}</h3>
                <span className="mt-2 flex items-center gap-1 text-[9px] uppercase tracking-wider text-gray-400"><Clock size={9} /> Energy Desk</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SH title="Renewables & Power" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {renewableStories.map((item) => (
              <Link key={item.id} to={specialArticlePath(item.id)} className="group block">
                <div className="overflow-hidden rounded bg-gray-100">
                  <ImageWithFallback src={item.image} alt={item.title} className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <h3 className="mt-3 font-serif text-xl font-bold leading-tight group-hover:text-red-600">{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <PrideTimesAd variant="third" />

        <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <SH title="Power & Infrastructure" />
            <div className="divide-y divide-gray-200">
              {powerWatch.map((item) => (
                <Link key={item.id} to={specialArticlePath(item.id)} className="group block py-4">
                  <h3 className="text-sm font-semibold leading-6 group-hover:text-red-600 md:text-base">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <SH title="2026 Energy Outlook" />
            <div className="border border-gray-200 bg-[#f7f7f5] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">CERAWeek 2026</p>
              <h3 className="mt-2 font-serif text-2xl font-bold">“Convergence and Competition: Energy, Technology and Geopolitics”</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                The supplied briefing frames the energy sector around three simultaneous pressures: geopolitical disruption, rapidly increasing electricity demand from AI infrastructure, and continued investment in the clean-energy transition.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="bg-white p-4"><p className="text-[9px] uppercase tracking-wider text-gray-400">Oil & Gas</p><p className="mt-1 text-sm font-semibold">Supply disruption and flow-normalization risk</p></div>
                <div className="bg-white p-4"><p className="text-[9px] uppercase tracking-wider text-gray-400">Power</p><p className="mt-1 text-sm font-semibold">Grid capacity becoming a constraint on AI growth</p></div>
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
