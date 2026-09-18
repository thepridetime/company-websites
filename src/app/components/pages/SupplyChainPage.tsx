import { Clock, Truck, AlertTriangle } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import SC1Img from "../../../imports/SC1.png";
import SC2Img from "../../../imports/SC2.png";
import SC3Img from "../../../imports/SC3.png";

/* =========================================================
   SECTION HEADER
========================================================= */

function SH({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-5">
      <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
      <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.16em] text-gray-900">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   DATA
========================================================= */

const hero = {
  category: "GLOBAL TRADE",
  title: "2026: The Year of Supply Chain Network Redesign ",
  excerpt: "Abe Eshkenazi, CEO of the Association for Supply Chain Management, captured the prevailing sentiment across the industry in a June 2026 interview: 'Last year was about managing disruptions. Right now, it's about redesigning your global network.' This shift from reactive crisis management to proactive structural reconfiguration defines the supply chain agenda for the year ahead.Companies across manufacturing, healthcare, consumer goods, and technology are actively reassessing their geographic footprints, supplier concentrations, and inventory strategies. The proliferation of tariffs, the fragmentation of trade blocs, and the persistent threat of climate-related disruption are collectively driving a new approach to supply chain resilience that prioritizes redundancy, near-shoring, and digital transparency over pure cost optimization. ",
  author: "Sagar Kumar",
  time: "June 2026",
  image: SC1Img,
};

const hero1 = {
  category: "GLOBAL TRADE",
  title: "Healthcare Supply Chains Face Inflation and Shortage Dual Pressure  ",
  excerpt: "Procurement executives managing hospital supply chains face a particularly acute version of the broader supply chain challenge in 2026. Vizient's analysis forecasts 2.58% inflation in medical and surgical supplies for the full year, while simultaneous shortages in oncology drugs, contrast media, and critical surgical components strain operational resilience.The supply chain challenge in healthcare is further complicated by the long qualification cycles for medical device components, which make rapid supplier substitution difficult. Industry working groups are exploring legislative pathways to require minimum domestic inventory buffers for essential medical supplies, mirroring frameworks already enacted for pharmaceuticals in several countries following COVID-19.  ",
  author: "Sagar Kumar",
  time: "Jan-June 2026",
  image: SC2Img,
};

const hero2 = {
  category: "GLOBAL TRADE",
  title: "Tariff Volatility and Trade Policy Uncertainty Continue to Drive Hedging Behavior  ",
  excerpt: "Ongoing tariff policy uncertainty under the current U.S. administration continues to generate hedging behavior among global manufacturers and logistics companies. Firms with significant U.S.-China supply chain exposure report dedicating significant management bandwidth to scenario planning for tariff escalation, while simultaneously building alternative sourcing relationships in Vietnam, India, Mexico, and Eastern Europe.Eversheds Sutherland's Global Supply Chain Horizons report from January 2026 flagged a wave of new legal requirements affecting global supply chains, including enhanced due diligence obligations, forced labor compliance mandates, and environmental traceability requirements that are reshaping supplier selection and audit frameworks across the EU, US, and UK. ",
  author: "Sagar Kumar",
  time: "June 2026",
  image: SC3Img,
};

const disruptions = [
  { id: 1, severity: "HIGH", route: "Red Sea / Suez Canal", issue: "Houthi attacks force continued Cape of Good Hope rerouting — adds 14 days transit", impact: "+$2.4B weekly cost" },
  { id: 2, severity: "MEDIUM", route: "Taiwan Strait", issue: "Military exercises cause vessel diversion and insurance premium spike", impact: "+15% freight rates" },
  { id: 3, severity: "LOW", route: "Panama Canal", issue: "Water levels normalized — full capacity restored after drought-related restrictions", impact: "Fully Resolved" },
];

const freightRates = [
  { route: "Shanghai → Rotterdam", rate: "$2,840/40ft", change: "+8.3%", up: true },
  { route: "Shanghai → Los Angeles", rate: "$3,120/40ft", change: "+12.1%", up: true },
  { route: "Rotterdam → New York", rate: "$1,450/40ft", change: "-2.1%", up: false },
  { route: "Mumbai → Dubai", rate: "$380/40ft", change: "+1.4%", up: true },
  { route: "Singapore → Sydney", rate: "$890/40ft", change: "+3.7%", up: true },
];

const logisticsNews = [
  { id: 1, title: "Strait of Hormuz reopening deal eases shipping bottlenecks even as global supply chains remain on edge from tariff, debt and AI-capex pressure.", time: "Just now" },
  { id: 2, title: "FedEx AI Routing Cuts Delivery Times by 23% — Saves $1.8B Annually in Fuel", time: "1 hr ago" },
  { id: 3, title: "DHL Deploys 10,000 Electric Vans Across European Last-Mile Delivery Network", time: "3 hrs ago" },
  { id: 4, title: "Amazon Air Expands Autonomous Drone Delivery to 500 US Cities", time: "5 hrs ago" },
  { id: 5, title: "Maersk Launches AI-Powered Carbon Tracking for All Container Shipments", time: "7 hrs ago" },
];

const reshoring = [
  { id: 1, title: "Apple Moves 40% of iPhone Production to India — TSMC Chennai Plant Now Operational", time: "2 hrs ago" },
  { id: 2, title: "US CHIPS Act Funds 14 New Semiconductor Fabs — $280B Investment Secured", time: "4 hrs ago" },
  { id: 3, title: "Volkswagen Shifts Battery Supply Chain to Europe — Ends Chinese Dependency by 2028", time: "6 hrs ago" },
  { id: 4, title: "Mexico Becomes World's #1 Manufacturing Destination for US-Bound Consumer Goods", time: "8 hrs ago" },
];

const severityStyles: Record<string, string> = {
  HIGH: "bg-red-50 text-red-700 border-red-200",
  MEDIUM: "bg-amber-50 text-amber-700 border-amber-200",
  LOW: "bg-green-50 text-green-700 border-green-200",
};

const severityBadge: Record<string, string> = {
  HIGH: "bg-red-600 text-white",
  MEDIUM: "bg-amber-500 text-white",
  LOW: "bg-green-600 text-white",
};

/* =========================================================
   ARTICLE BLOCK (reusable, no duplicated markup)
========================================================= */

function ArticleBlock({ data }: { data: typeof hero }) {
  return (
    <article className="group cursor-pointer">
      <div className="overflow-hidden rounded-[2px] mb-4">
        <ImageWithFallback
          src={data.image}
          alt={data.title}
          className="w-full h-72 md:h-80 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <span className="text-[11px] font-bold text-red-600 uppercase tracking-[0.16em]">
        {data.category}
      </span>

      <h1 className="mt-2 font-serif text-2xl md:text-[32px] font-bold leading-[1.15] text-gray-950 transition-colors duration-200 group-hover:text-red-600">
        {data.title}
      </h1>

      <p className="text-gray-600 text-sm md:text-[15px] leading-[1.75] mt-3">
        {data.excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-gray-200 text-xs text-gray-400">
        <span className="font-medium text-gray-500">By {data.author}</span>
        <span className="flex items-center gap-1.5">
          <Clock size={11} strokeWidth={2.25} />
          {data.time}
        </span>
      </div>
    </article>
  );
}

/* =========================================================
   NEWS COLUMN
========================================================= */

function NewsColumn({
  title,
  items,
}: {
  title: string;
  items: { id: number; title: string; time: string }[];
}) {
  return (
    <div>
      <SH title={title} />
      <div className="divide-y divide-gray-200">
        {items.map((n) => (
          <div key={n.id} className="py-3.5 first:pt-0 group cursor-pointer">
            <p className="text-sm leading-[1.55] text-gray-800 transition-colors group-hover:text-red-600">
              {n.title}
            </p>
            <span className="text-[11px] uppercase tracking-wide text-gray-400 flex items-center gap-1.5 mt-2">
              <Clock size={10} strokeWidth={2.25} />
              {n.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function SupplyChainPage() {
  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="border-b-4 border-black pb-5 mb-10">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black text-white shrink-0">
              <Truck size={20} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                Logistics & Trade
              </p>
              <h1 className="mt-1 font-serif text-3xl md:text-[42px] font-bold tracking-tight leading-tight">
                Supply Chain & Global Trade
              </h1>
            </div>
          </div>
        </header>

        {/* =================================================
            HERO + FREIGHT RATES
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          <div className="lg:col-span-2">
            <ArticleBlock data={hero} />
          </div>

          <aside className="lg:border-l lg:border-gray-200 lg:pl-8">
            <SH title="Ocean Freight Rates" />
            <div className="divide-y divide-gray-200">
              {freightRates.map((f) => (
                <div key={f.route} className="py-3 first:pt-0">
                  <p className="text-xs text-gray-500">{f.route}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-semibold text-gray-900">{f.rate}</p>
                    <p className={`text-xs font-bold tabular-nums ${f.up ? "text-red-600" : "text-green-700"}`}>
                      {f.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-4 leading-5">
              Source: Freightos Baltic Index. May 22, 2026.
            </p>
          </aside>
        </section>

        {/* =================================================
            SECONDARY STORIES
        ================================================= */}

        <section className="mb-14">
          <ArticleBlock data={hero1} />
        </section>

        <section className="mb-14">
          <ArticleBlock data={hero2} />
        </section>

        {/* =================================================
            DISRUPTION MONITOR
        ================================================= */}

        <section className="mb-14">
          <div className="flex items-center gap-2.5 border-b-2 border-black pb-2.5 mb-5">
            <AlertTriangle size={15} className="text-red-600" strokeWidth={2} />
            <h2 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.16em] text-gray-900">
              Supply Chain Disruption Monitor
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {disruptions.map((d) => (
              <div
                key={d.id}
                className={`border rounded-[2px] p-4 md:p-5 ${severityStyles[d.severity]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[2px] tracking-wide ${severityBadge[d.severity]}`}>
                        {d.severity}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">{d.route}</span>
                    </div>
                    <p className="text-xs leading-5">{d.issue}</p>
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap">{d.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            NEWS SECTIONS
        ================================================= */}

        <section className="border-t-2 border-black pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <NewsColumn title="Logistics & Technology" items={logisticsNews} />
            <NewsColumn title="Reshoring & Nearshoring" items={reshoring} />
          </div>
        </section>

      </div>
    </div>
  );
}
