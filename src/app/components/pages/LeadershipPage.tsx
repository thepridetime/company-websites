import { Clock, Users, Award, ChevronRight, Quote } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import Lead1Img from "../../../imports/Lead1.png";
import Lead2Img from "../../../imports/Lead2.png";

/* Section header — hairline rule + uppercase eyebrow, consistent across every module */
function SH({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-5">
      <h2 className="text-sm uppercase tracking-[0.2em]">{title}</h2>
      <span className="hidden sm:block w-6 h-[2px] bg-red-600" />
    </div>
  );
}

const hero = {
  category: "Leadership Desk",
  title: "The Intelligence Age: How CEOs Are Navigating Transformation  ",
  excerpt:"KPMG's Global Tech Report 2026 — subtitled 'Leading in the Intelligence Age: Excelling Today, Shaping Tomorrow' — draws on conversations with top executives including Dean Bortz, Director of AI Go-to-Market at Google; Zack Kass, former Head of Go-to-Market at OpenAI and now a global AI advisor; Noelle Russell, CEO of the AI Leadership Institute; and Seth Patton, General Manager of Microsoft 365 Copilot. Their collective perspectives reveal a leadership class grappling with the most consequential technology transition in corporate history.The common thread across executive conversations is the tension between the imperative for speed and the organizational reality of constraint. Technology plans are frequently becoming obsolete before implementation, as the pace of AI capability advancement outstrips enterprise planning cycles. Leading organizations are addressing this by adopting adaptive strategy frameworks — setting directional bets rather than fixed technology roadmaps, and building organizational capacity for rapid pivoting.  ",
  author: "Sagar Kumar",
  time: "June 2026",
  image: Lead1Img,
};

const hero1 = {
  category: "Investor Leadership",
  title: "Warren Buffett at 95: Berkshire's Housing Bet Signals Long-Term Confidence   ",
  excerpt:"Warren Buffett's Berkshire Hathaway has reaffirmed its status as one of the world's most disciplined capital allocators with the $6.8 billion acquisition of Taylor Morrison, one of America's leading homebuilders. The deal, announced June 1, is consistent with Berkshire's decades-long approach of deploying capital into businesses with durable competitive advantages, strong cash flows, and management teams with demonstrated operational excellence.The investment signals Berkshire's view that structural housing undersupply in the United States — driven by a decade of below-replacement-rate construction — will provide a long-term tailwind for well-positioned homebuilders. The acquisition also extends Berkshire's exposure to American residential real estate, complementing its existing position in Clayton Homes, the largest manufactured housing company in the United States. ",
  author: "Sagar Kumar",
  time: "June 2026",
  image: Lead2Img,
};

const ceoInterviews = [
  {
    id: 1,
    name: "Satya Nadella",
    title: "CEO, Microsoft",
    company: "Microsoft",
    quote: "The next decade will be defined by how organizations use AI to augment human capability. Every tool we build is a collaboration engine.",
    topic: "AI Strategy & the Future of Work",
    duration: "35 min read",
    image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Indra Nooyi",
    title: "Former CEO, PepsiCo / Board Director",
    company: "PepsiCo",
    quote: "Sustainable business is not charity. The companies that will win in the next 20 years are those that embed purpose into their P&L.",
    topic: "Sustainable Leadership & Stakeholder Capitalism",
    duration: "28 min read",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Jensen Huang",
    title: "CEO, NVIDIA",
    company: "NVIDIA",
    quote: "We are not a chip company. We are the engine of the AI industrial revolution. The opportunity is larger than the internet, cloud, and mobile combined.",
    topic: "NVIDIA's AI Supremacy & the Chip Wars",
    duration: "42 min read",
    image: "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?w=400&h=300&fit=crop",
  },
];

const womenLeaders = [
  { name: "Mary Barra", title: "CEO, General Motors", achievement: "Led GM's transformation to world's #3 EV maker", rank: 1 },
  { name: "Jane Fraser", title: "CEO, Citigroup", achievement: "Completed landmark $20B organizational transformation", rank: 2 },
  { name: "Gita Gopinath", title: "First Deputy MD, IMF", achievement: "Architect of IMF's post-pandemic recovery strategy", rank: 3 },
  { name: "Sunita Williams", title: "NASA Astronaut / Engineer", achievement: "Led India-US Space Cooperation Framework", rank: 4 },
  { name: "Nirmala Sitharaman", title: "Finance Minister, India", achievement: "Delivered India's largest infrastructure budget at ₹11.1T", rank: 5 },
];

const leadershipOpinions = [
  { id: 1, author: "Sagar Kumar", title: "On AI and Investing: Why I Still Trust Human Judgment Over Algorithms", time: "1 day ago" },
  { id: 2, author: "Sagar Kumar", title: "The Debt Cycle Is Approaching Its Peak — And Leaders Must Prepare Now", time: "2 days ago" },
  { id: 3, author: "Sagar Kumar", title: "Why AGI Will Arrive Before 2030 — And Why That's Not Something to Fear", time: "3 days ago" },
  { id: 4, author: "Sagar Kumar", title: "India's Moment Has Arrived — The Next 25 Years Belong to Us", time: "4 days ago" },
];

const executiveMoves = [
  { id: 1, person: "Bob Iger", move: "Returns as Disney CEO for third term after activist investor pressure", time: "3 hrs ago" },
  { id: 2, person: "Christine Lagarde", move: "ECB President announces departure — 3 candidates shortlisted for successor", time: "5 hrs ago" },
  { id: 3, person: "Shantanu Narayen", move: "Adobe CEO receives $42M pay package after record year", time: "7 hrs ago" },
  { id: 4, person: "Arvind Krishna", move: "IBM CEO announces strategic review of $60B consulting division", time: "9 hrs ago" },
  { id: 5, person: "Brian Chesky", move: "Airbnb CEO launches $1B share buyback, hints at hospitality expansion", time: "11 hrs ago" },
];

const pt30Features = [
  { rank: 1, name: "Jensen Huang ", insight: "Defining the AI infrastructure era at COMPUTEX 2026. " },
  { rank: 2, name: "Satya Nadella", insight: "Leading ethical AI adoption and enterprise digital transformation. " },
  { rank: 3, name: "Sundar Pichai ", insight: "Driving AI integration across search, cloud, and automotive tech. " },
];

/* Reusable hero card — used for both lead stories, side by side on desktop */
function HeroCard({ story }: { story: typeof hero }) {
  return (
    <article className="group cursor-pointer">
      <div className="relative overflow-hidden mb-4">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-64 lg:h-80 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
        <span className="absolute bottom-3 left-3 bg-red-600 text-white text-[10px] uppercase tracking-[0.15em] px-2 py-1">
          {story.category}
        </span>
      </div>

      <h1 className="font-serif text-2xl lg:text-3xl leading-tight group-hover:text-red-600 transition-colors duration-300">
        {story.title.trim()}
      </h1>
      <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-5">
        {story.excerpt.trim()}
      </p>

      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-200 text-xs text-gray-400">
        <span className="text-gray-700">By {story.author}</span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span className="flex items-center gap-1">
          <Clock size={11} /> {story.time}
        </span>
      </div>
    </article>
  );
}

export function LeadershipPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      {/* Masthead */}
      <div className="border-b-4 border-black mb-10 pb-3 flex items-center gap-3">
        <Users size={22} />
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-[0.25em]">Executive Intelligence</span>
          <h1 className="font-serif text-3xl md:text-4xl mt-0.5">Leadership &amp; Management</h1>
        </div>
      </div>

      {/* Hero — two lead stories, side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14 pb-10 border-b border-gray-200">
        <HeroCard story={hero} />
        <HeroCard story={hero1} />
      </div>

      {/* CEO interviews */}
      <div className="mb-14">
        <SH title="Exclusive CEO Interviews" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ceoInterviews.map((c) => (
            <div
              key={c.id}
              className="group cursor-pointer border border-gray-200 hover:border-black overflow-hidden transition-colors duration-300 flex flex-col"
            >
              <div className="overflow-hidden">
                <ImageWithFallback
                  src={c.image}
                  alt={c.name}
                  className="w-full h-40 object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-[11px] text-red-600 uppercase tracking-wider">{c.topic}</p>
                <h3 className="font-serif text-lg mt-1.5 leading-snug">{c.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{c.title}</p>

                <blockquote className="relative text-xs text-gray-600 italic pl-4 border-l-2 border-red-600 leading-relaxed flex-1">
                  <Quote size={12} className="absolute -left-[7px] -top-1 bg-white text-red-600" />
                  {c.quote}
                </blockquote>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-[11px] text-gray-400">{c.duration}</span>
                  <button className="text-xs text-red-600 flex items-center gap-1 hover:gap-1.5 transition-all">
                    Read Full Interview <ChevronRight size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PT30 Leadership Insights */}
      <div className="mb-14 bg-black text-white p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Award size={16} className="text-yellow-400" />
          <h2 className="text-sm uppercase tracking-[0.2em] text-yellow-400">Pride Times 30 — Leadership Profiles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pt30Features.map((p) => (
            <div
              key={p.rank}
              className="group relative border border-gray-800 hover:border-yellow-400/60 p-5 transition-colors duration-300 overflow-hidden"
            >
              <span className="absolute -right-2 -top-3 font-serif text-6xl text-gray-800/70 select-none">
                {String(p.rank).padStart(2, "0")}
              </span>
              <div className="relative">
                <span className="text-xs text-gray-500">PT30</span>
                <h3 className="font-serif text-white text-lg mt-1">{p.name.trim()}</h3>
                <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">{p.insight.trim()}</p>
                <button className="mt-4 text-xs text-yellow-400 hover:underline flex items-center gap-1">
                  Full Profile <ChevronRight size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SponsoredArticleCard
        headline="McKinsey: The Leadership Capabilities That Separate High-Performing CEOs from the Rest"
        excerpt="Our analysis of 2,500 CEOs across 70 countries identifies six capabilities that consistently distinguish leaders who deliver above-average shareholder returns over 10+ year tenures."
        advertiser="McKinsey & Company"
        category="SPONSORED · LEADERSHIP"
        readTime={9}
        image="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&h=400&fit=crop"
        link="#"
        disclosureText="Paid content by McKinsey & Company. Does not reflect editorial opinion."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {/* Women in Leadership */}
        <div>
          <SH title="Women in Leadership" />
          <div className="flex flex-col">
            {womenLeaders.map((w) => (
              <div
                key={w.rank}
                className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0 group cursor-pointer"
              >
                <span className="font-serif text-xl text-gray-300 w-6 flex-shrink-0 group-hover:text-red-600 transition-colors">
                  {w.rank}
                </span>
                <div>
                  <p className="text-sm group-hover:text-red-600 transition-colors">{w.name}</p>
                  <p className="text-xs text-gray-500">{w.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{w.achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opinions */}
        <div>
          <SH title="Leadership Opinion" />
          <div className="divide-y divide-gray-100">
            {leadershipOpinions.map((o) => (
              <div key={o.id} className="py-3 group cursor-pointer">
                <p className="text-[11px] text-gray-500 uppercase tracking-wider">{o.author}</p>
                <p className="text-sm group-hover:text-red-600 transition-colors mt-1 leading-snug">{o.title}</p>
                <span className="text-xs text-gray-400 flex items-center gap-1 mt-1.5">
                  <Clock size={10} /> {o.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Executive moves */}
        <div>
          <SH title="Executive Moves" />
          <div className="divide-y divide-gray-100">
            {executiveMoves.map((m) => (
              <div key={m.id} className="py-3 group cursor-pointer">
                <p className="text-[11px] text-gray-700 uppercase tracking-wider">{m.person}</p>
                <p className="text-sm group-hover:text-red-600 transition-colors mt-1 leading-snug">{m.move}</p>
                <span className="text-xs text-gray-400 flex items-center gap-1 mt-1.5">
                  <Clock size={10} /> {m.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
