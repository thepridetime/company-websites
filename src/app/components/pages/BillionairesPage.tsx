import { ImageWithFallback } from "../figma/ImageWithFallback";
import { TrendingUp, TrendingDown, Flag, Star } from "lucide-react";

/* Shared section header — matches the Leadership page's editorial rule + eyebrow treatment */
function SectionHeader({ title, id, subtitle }: { title: string; id?: string; subtitle?: string }) {
  return (
    <div id={id} className="border-b-2 border-black pb-2 mb-5">
      <h2 className="font-serif text-2xl leading-snug">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-3xl">{subtitle}</p>}
    </div>
  );
}

const worldBillionaires = [
  { rank: 1, name: "Elon Musk", wealth: "$312.4B", company: "Tesla, SpaceX, xAI", country: "USA", change: "+2.1%", up: true, industry: "Technology / Aerospace" },
  { rank: 2, name: "Jeff Bezos", wealth: "$218.7B", company: "Amazon, Blue Origin", country: "USA", change: "+0.8%", up: true, industry: "E-Commerce / Space" },
  { rank: 3, name: "Jensen Huang", wealth: "$187.2B", company: "NVIDIA", country: "USA", change: "+5.3%", up: true, industry: "Semiconductors / AI" },
  { rank: 4, name: "Mark Zuckerberg", wealth: "$176.5B", company: "Meta Platforms", country: "USA", change: "+1.2%", up: true, industry: "Social Media / AI" },
  { rank: 5, name: "Larry Ellison", wealth: "$165.8B", company: "Oracle", country: "USA", change: "+3.7%", up: true, industry: "Enterprise Software" },
  { rank: 6, name: "Bill Gates", wealth: "$143.2B", company: "Microsoft / BG Foundation", country: "USA", change: "+0.4%", up: true, industry: "Technology" },
  { rank: 7, name: "Warren Buffett", wealth: "$138.9B", company: "Berkshire Hathaway", country: "USA", change: "+0.2%", up: true, industry: "Diversified" },
  { rank: 8, name: "Larry Page", wealth: "$131.4B", company: "Alphabet / Google", country: "USA", change: "-0.3%", up: false, industry: "Technology" },
  { rank: 9, name: "Sergey Brin", wealth: "$128.7B", company: "Alphabet / Google", country: "USA", change: "-0.3%", up: false, industry: "Technology" },
  { rank: 10, name: "Steve Ballmer", wealth: "$122.3B", company: "Microsoft / LA Clippers", country: "USA", change: "+1.8%", up: true, industry: "Technology" },
  { rank: 11, name: "Mukesh Ambani", wealth: "$112.1B", company: "Reliance Industries", country: "India", change: "+0.5%", up: true, industry: "Diversified / Telecom" },
  { rank: 12, name: "Gautam Adani", wealth: "$98.7B", company: "Adani Group", country: "India", change: "+1.3%", up: true, industry: "Infrastructure / Energy" },
  { rank: 13, name: "Carlos Slim", wealth: "$94.2B", company: "América Móvil", country: "Mexico", change: "-0.7%", up: false, industry: "Telecom" },
  { rank: 14, name: "François Bettencourt Meyers", wealth: "$89.6B", company: "L'Oréal", country: "France", change: "+0.9%", up: true, industry: "Consumer Goods" },
  { rank: 15, name: "Bernard Arnault", wealth: "$87.3B", company: "LVMH", country: "France", change: "-1.2%", up: false, industry: "Luxury Goods" },
];

const pt30List = [
  { rank: 1, name: "Jensen Huang ", title: "Nvidia ", category: "Defining the AI infrastructure era at COMPUTEX 2026 " },
  { rank: 2, name: "Satya Nadella ", title: "Microsoft ", category: "Leading ethical AI adoption and enterprise digital transformation " },
  { rank: 3, name: "Sundar Pichai ",  title: "Alphabet / Google ", category: "Driving AI integration across search, cloud, and automotive tech " },
  { rank: 4, name: "Elon Musk ", title: "Tesla / SpaceX / X ", category: "Disrupting energy, space, and AI; SpaceX IPO on the horizon " },
  { rank: 5, name: "Sam Altman ", title: "OpenAI", category: "Shaping the frontier of large language models and AGI research " },
  { rank: 6, name: "Andy Jassy ", title: "Amazon ", category: "Scaling AWS as AI's preferred cloud infrastructure partner " },
  { rank: 7, name: "Lisa Su ",  title: "AMD", category: "Challenging Nvidia's AI chip dominance with competitive GPU roadmap " },
  { rank: 8, name: "CC Wei ",  title: "TSMC", category: "Controlling the world's most advanced semiconductor manufacturing " },
  { rank: 9, name: "Alex Karp ", title: "Palantir ", category: "Surging 6 places in IMD rankings on AI and defense demand " },
  { rank: 10, name: "Mary Barra ", title: "General Motors" , category: "Navigating EV transition amid battery supply chain pressures "},
];

const indiaRichest = [
  { rank: 1, name: "Mukesh Ambani", wealth: "₹9,35,000 Cr", company: "Reliance Industries", sector: "Energy / Telecom", change: "+0.5%" },
  { rank: 2, name: "Gautam Adani", wealth: "₹8,23,000 Cr", company: "Adani Group", sector: "Infrastructure", change: "+1.3%" },
  { rank: 3, name: "Shiv Nadar", wealth: "₹3,45,000 Cr", company: "HCL Technologies", sector: "IT Services", change: "+2.1%" },
  { rank: 4, name: "Cyrus Poonawalla", wealth: "₹2,89,000 Cr", company: "Serum Institute", sector: "Pharma / Biotech", change: "+4.7%" },
  { rank: 5, name: "Savitri Jindal", wealth: "₹2,67,000 Cr", company: "JSW Steel", sector: "Steel / Infrastructure", change: "-0.8%" },
  { rank: 6, name: "Kumar Mangalam Birla", wealth: "₹2,34,000 Cr", company: "Aditya Birla Group", sector: "Diversified", change: "+0.3%" },
  { rank: 7, name: "Dilip Shanghvi", wealth: "₹2,12,000 Cr", company: "Sun Pharma", sector: "Pharmaceuticals", change: "+1.9%" },
  { rank: 8, name: "Radha Kishan Damani", wealth: "₹1,98,000 Cr", company: "DMart / Avenue Supermarts", sector: "Retail", change: "+0.6%" },
  { rank: 9, name: "Sunil Mittal", wealth: "₹1,76,000 Cr", company: "Bharti Airtel", sector: "Telecom", change: "+2.3%" },
  { rank: 10, name: "Azim Premji", wealth: "₹1,54,000 Cr", company: "Wipro", sector: "IT Services", change: "+1.1%" },
];

const billionaireNews = [
  { id: 1, title: "Elon Musk Adds $15B to Net Worth in Single Day After Tesla Earnings Beat", time: "2 hrs ago" },
  { id: 2, title: "Gautam Adani's Green Energy Division Secures $7.5B International Funding", time: "4 hrs ago" },
  { id: 3, title: "Jeff Bezos Commits $5B to Ocean Conservation Through Bezos Earth Fund", time: "6 hrs ago" },
  { id: 4, title: "Mark Zuckerberg Becomes Third Person to Hold $175B+ Net Worth", time: "8 hrs ago" },
  { id: 5, title: "Warren Buffett's Berkshire Hathaway Reveals $45B Mystery Investment", time: "10 hrs ago" },
];

const risingBillionaires = [
  { name: "Jensen Huang", company: "NVIDIA", wealth: "$187B", growth: "+$89B YTD", story: "AI chip demand drives historic wealth creation" },
  { name: "Sam Altman", company: "OpenAI", wealth: "$28B", growth: "+$22B YTD", story: "ChatGPT revenue surpasses $10B annually" },
  { name: "Cyrus Poonawalla", company: "Serum Institute", wealth: "$21B", growth: "+$8B YTD", story: "Global vaccine demand powers pharma empire" },
];

const statsBar = [
  { label: "World's Billionaires", value: "2,781", sub: "as of May 2026" },
  { label: "Combined Wealth", value: "$14.2T", sub: "all billionaires" },
  { label: "New Billionaires (2026)", value: "+187", sub: "year to date" },
  { label: "Biggest Gainer YTD", value: "Jensen Huang", sub: "+$89B in 2026" },
];

/* Shared rank-badge table shell — hairline rule header, uppercase eyebrow columns */
function TableShell({
  columns,
  children,
}: {
  columns: { label: string; align?: "left" | "right"; className?: string }[];
  children: React.ReactNode;
}) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b-2 border-black">
          {columns.map((col) => (
            <th
              key={col.label}
              className={`py-2.5 text-[11px] text-gray-500 font-normal uppercase tracking-wider ${
                col.align === "right" ? "text-right" : "text-left"
              } ${col.className ?? ""}`}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">{children}</tbody>
    </table>
  );
}

export function BillionairesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      {/* Page title */}
      <div className="border-b-4 border-black mb-8 pb-3">
        <span className="text-xs text-gray-500 uppercase tracking-[0.25em]">Exclusive Rankings</span>
        <h1 className="font-serif text-3xl md:text-4xl mt-0.5">Billionaires &amp; Wealth Intelligence</h1>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200 mb-10">
        {statsBar.map((stat) => (
          <div key={stat.label} className="bg-white p-5 text-center hover:bg-gray-50 transition-colors">
            <p className="text-[11px] text-gray-500 uppercase tracking-wider">{stat.label}</p>
            <p className="font-serif text-2xl mt-2">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* World's Billionaires list */}
      <div className="mb-12" id="world">
        <SectionHeader
          title="World's Billionaires"
          subtitle="Real-time net worth estimates. Updated daily. All figures in USD."
        />
        <div className="overflow-x-auto">
          <TableShell
            columns={[
              { label: "#", className: "w-8" },
              { label: "Name" },
              { label: "Net Worth", align: "right" },
              { label: "Company", className: "hidden md:table-cell pl-4" },
              { label: "Country", className: "hidden lg:table-cell" },
              { label: "Today", align: "right" },
            ]}
          >
            {worldBillionaires.map((b) => (
              <tr key={b.rank} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="py-3 text-gray-400 text-xs font-serif">{b.rank}</td>
                <td className="py-3">
                  <p className="group-hover:text-red-600 transition-colors">{b.name}</p>
                  <p className="text-xs text-gray-400 hidden sm:block">{b.industry}</p>
                </td>
                <td className="py-3 text-right font-medium">{b.wealth}</td>
                <td className="py-3 pl-4 text-gray-600 hidden md:table-cell text-sm">{b.company}</td>
                <td className="py-3 text-gray-600 hidden lg:table-cell text-sm">{b.country}</td>
                <td className="py-3 text-right">
                  <span className={`inline-flex items-center justify-end gap-0.5 text-xs ${b.up ? "text-green-600" : "text-red-600"}`}>
                    {b.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {b.change}
                  </span>
                </td>
              </tr>
            ))}
          </TableShell>
          <p className="text-xs text-gray-400 mt-3">Showing top 15 of 2,781 billionaires. Updated: May 21, 2026 05:00 UTC</p>
        </div>
      </div>

      {/* PT30 + Rising Stars side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        {/* PT30 */}
        <div className="lg:col-span-2" id="pt30">
          <SectionHeader
            title="🏆  Pride Times 30 — Leaders to Watch in 2026"
            subtitle="The Pride Times 30 recognizes thirty global leaders across business, technology, and innovation who are defining the direction of the global economy this year. This edition highlights ten names at the forefront:"
          />
          <div className="overflow-x-auto">
            <TableShell
              columns={[
                { label: "#", className: "w-8" },
                { label: "Name" },
                { label: "Organization", className: "hidden sm:table-cell px-4" },
                { label: "Why They Matter", className: "hidden sm:table-cell px-4" },
              ]}
            >
              {pt30List.map((p) => (
                <tr key={p.rank} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                  <td className="py-3 text-gray-400 text-xs font-serif align-top">{p.rank}</td>
                  <td className="py-3 align-top">
                    <p className="group-hover:text-red-600 transition-colors">{p.name}</p>

                    {/* Mobile view: org + why-they-matter collapse under name */}
                    <div className="sm:hidden mt-1">
                      <p className="text-xs text-gray-600">{p.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{p.category}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-left hidden sm:table-cell text-sm align-top text-gray-700">{p.title}</td>
                  <td className="px-4 py-3 text-left hidden sm:table-cell text-sm align-top text-gray-500">{p.category}</td>
                </tr>
              ))}
            </TableShell>
          </div>
        </div>

        {/* Rising Billionaires */}
        <div>
          <SectionHeader title="Fastest Growing" subtitle="Biggest wealth gains in 2026" />
          <div className="flex flex-col gap-4">
            {risingBillionaires.map((r) => (
              <div
                key={r.name}
                className="border border-gray-200 hover:border-black p-4 transition-colors duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <Star size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.company}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="font-serif text-lg">{r.wealth}</span>
                  <span className="text-green-600 text-xs font-medium">{r.growth}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{r.story}</p>
              </div>
            ))}

            {/* Billionaire news */}
            <div className="border-t-2 border-black pt-4 mt-2">
              <h3 className="text-sm uppercase tracking-wider mb-3">Wealth News</h3>
              <div className="divide-y divide-gray-100">
                {billionaireNews.slice(0, 4).map((item) => (
                  <div key={item.id} className="py-2.5 group cursor-pointer">
                    <p className="text-xs leading-snug group-hover:text-red-600 transition-colors">{item.title}</p>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* India's Richest */}
      <div className="mb-8" id="india">
        <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-5">
          <Flag size={16} className="text-orange-600" />
          <h2 className="font-serif text-2xl">India's Richest</h2>
          <span className="text-xs text-gray-500 ml-2">Top 10 as of May 2026</span>
        </div>
        <div className="overflow-x-auto">
          <TableShell
            columns={[
              { label: "#", className: "w-8" },
              { label: "Name" },
              { label: "Net Worth (INR)", align: "right" },
              { label: "Company", className: "hidden md:table-cell pl-4" },
              { label: "Sector", className: "hidden lg:table-cell" },
              { label: "Change", align: "right" },
            ]}
          >
            {indiaRichest.map((b) => (
              <tr key={b.rank} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="py-3 text-gray-400 text-xs font-serif">{b.rank}</td>
                <td className="py-3 group-hover:text-red-600 transition-colors">{b.name}</td>
                <td className="py-3 text-right font-medium">{b.wealth}</td>
                <td className="py-3 pl-4 text-gray-600 hidden md:table-cell text-sm">{b.company}</td>
                <td className="py-3 text-gray-600 hidden lg:table-cell text-sm">{b.sector}</td>
                <td className={`py-3 text-right text-xs ${b.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {b.change}
                </td>
              </tr>
            ))}
          </TableShell>
        </div>
      </div>
    </main>
  );
}
