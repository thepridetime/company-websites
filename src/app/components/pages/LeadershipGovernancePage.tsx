import { Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router";

import { PrideTimesAd } from "../AdSenseSlots";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { TimeAgo } from "../../utils/timeAgo";
import {
  leadershipGovernanceArticles,
  leadershipGovernanceArticlePath,
  leadershipGovernanceSectionGlance,
} from "../../data/leadershipGovernanceNewsData";

function sized(url: string, width: number) {
  return url.replace(/w=\d+/, `w=${width}`);
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-[#17140F] pb-2.5 mb-5">
      <h2 className="font-serif text-[21px] md:text-[24px] font-bold text-[#17140F]">{title}</h2>
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
        Governance desk <ChevronRight size={12} />
      </span>
    </div>
  );
}

const [leadStory, ...otherStories] = leadershipGovernanceArticles;
const sidebarStories = otherStories.slice(0, 2);
const latestStories = otherStories.slice(2);

export function LeadershipGovernancePage() {
  return (
    <main className="w-full bg-white text-[#17140F] antialiased">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <header className="pt-5 md:pt-7 pb-4">
          <div className="border-t-[3px] border-red-600 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">
                  Section 08 · Global Corporate News Digest
                </span>
                <h1 className="mt-1 font-serif text-[32px] sm:text-[38px] md:text-[46px] lg:text-[52px] font-bold leading-none tracking-tight">
                  Leadership &amp; Governance
                </h1>
              </div>
              <p className="max-w-[470px] text-[12px] md:text-[13px] leading-[1.65] text-[#77736D]">
                Boardrooms, succession, shareholder activism and the rules of
                corporate conduct.
              </p>
            </div>
          </div>
        </header>

        <div className="my-4 md:my-5"><PrideTimesAd variant="first" /></div>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-px border border-gray-300 bg-gray-300 mb-9">
          {leadershipGovernanceSectionGlance.map((item) => (
            <div key={item.theme} className="bg-[#f5f3ef] px-4 py-4 md:px-5">
              <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-gray-500">{item.theme}</span>
              <strong className="mt-2 block font-serif text-[20px] font-normal text-[#17140F]">{item.momentum}</strong>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-red-600">Outlook: {item.outlook}</span>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,3.25fr)_minmax(280px,1fr)] gap-5 lg:gap-7 mt-4 md:mt-6">
          <Link to={leadershipGovernanceArticlePath(leadStory.id)} className="group block">
            <div className="overflow-hidden rounded-lg bg-gray-100">
              <ImageWithFallback src={sized(leadStory.image, 1400)} alt={leadStory.title} className="w-full h-[260px] sm:h-[350px] md:h-[440px] lg:h-[500px] xl:h-[520px] object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
            </div>
            <div className="pt-3">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">{leadStory.category}</span>
              <h2 className="mt-1.5 font-serif text-[25px] sm:text-[29px] md:text-[33px] lg:text-[36px] xl:text-[38px] font-bold leading-[1.08] tracking-tight text-[#17140F] group-hover:text-red-600 transition-colors">{leadStory.title}</h2>
              <p className="mt-2.5 text-[12px] md:text-[13px] lg:text-[14px] leading-[1.6] text-[#66625D] max-w-[1100px]">{leadStory.excerpt}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px] text-gray-400">
                <span className="font-medium text-gray-500">By {leadStory.author}</span><span className="h-3 w-px bg-gray-300" />
                <span className="flex items-center gap-1.5"><Clock size={9} /><TimeAgo iso={leadStory.publishedAt} /></span><span className="h-3 w-px bg-gray-300" />
                <span>{leadStory.location}</span><span className="h-3 w-px bg-gray-300" /><span>{leadStory.readTime}</span>
              </div>
            </div>
          </Link>

          <aside className="xl:border-l xl:border-gray-300 xl:pl-6">
            <div className="mb-5"><PrideTimesAd variant="second" /></div>
            <div className="border-b-2 border-[#17140F] pb-2 mb-1"><h3 className="font-bold text-[14px] uppercase tracking-wide">More Governance Stories</h3></div>
            <div className="divide-y divide-gray-200">
              {sidebarStories.map((story) => (
                <Link key={story.id} to={leadershipGovernanceArticlePath(story.id)} className="block py-3 group">
                  <span className="inline-block text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-red-600 text-white">{story.category}</span>
                  <h4 className="mt-1.5 text-[11px] md:text-[12px] font-bold leading-[1.35] text-gray-900 group-hover:text-red-600 transition-colors">{story.title}</h4>
                  <span className="flex items-center gap-1 mt-1 text-[8px] text-gray-400"><Clock size={8} /><TimeAgo iso={story.publishedAt} /></span>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-12 md:mt-14">
          <SectionHeader title="Latest Leadership & Governance News" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 lg:gap-x-7 gap-y-8">
            {latestStories.map((story) => (
              <Link key={story.id} to={leadershipGovernanceArticlePath(story.id)} className="group block">
                <div className="overflow-hidden rounded-md bg-gray-100"><ImageWithFallback src={sized(story.image, 700)} alt={story.title} className="w-full h-[180px] sm:h-[190px] md:h-[205px] lg:h-[215px] object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></div>
                <div className="pt-2.5">
                  <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-red-600">{story.category}</span>
                  <h3 className="mt-1.5 font-serif text-[17px] md:text-[18px] font-bold leading-[1.18] text-[#17140F] group-hover:text-red-600 transition-colors">{story.title}</h3>
                  <p className="mt-1.5 text-[12px] leading-[1.55] text-[#66625D] line-clamp-3">{story.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[9px] text-gray-400"><Clock size={8} /><TimeAgo iso={story.publishedAt} /><span>·</span><span>{story.location}</span><span>·</span><span>{story.readTime}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-gray-300 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-serif text-[28px] font-bold">What to watch</h2>
              <p className="mt-2 max-w-xl text-[13px] leading-[1.7] text-[#66625D]">Board composition, executive transitions and conduct frameworks are becoming increasingly visible signals of how companies manage complexity. The next test is whether governance commitments become consistent operating practice.</p>
            </div>
            <div className="border-l-4 border-red-600 bg-[#f5f3ef] px-5 py-4">
              <p className="font-serif text-[21px] leading-[1.35]">Governance becomes credible when oversight changes decisions.</p>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500">Leadership &amp; Governance desk · The Pride Times</p>
            </div>
          </div>
        </section>

        <p className="mt-10 border-t border-gray-900 pt-3 text-[10px] leading-[1.5] text-gray-500">Sample publication — all companies, people, quotations and figures are fictional and for layout and demonstration purposes only. Content adapted from the Leadership &amp; Governance section of Global Corporate News Digest, September 2026 edition.</p>
      </div>
    </main>
  );
}

export default LeadershipGovernancePage;
