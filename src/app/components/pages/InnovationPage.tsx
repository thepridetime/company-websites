import {
  defaultFeaturedInnovation,
  defaultTopInnovationStories,
  defaultMarketSnapshot,
  defaultInnovationMetrics,
  defaultLatestInnovationNews,
} from "../../data/innovationData";

import { InnovationFeaturedStory } from "../innovation/InnovationFeaturedStory";
import { TopInnovationStories } from "../innovation/TopInnovationStories";
import { MarketSnapshot } from "../innovation/MarketSnapshot";
import { NumbersAtAGlance } from "../innovation/NumbersAtAGlance";
import { LatestInnovationNews } from "../innovation/LatestInnovationNews";
import { AdvertisementSlot } from "../innovation/AdvertisementSlot";

export function InnovationPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-4 md:pt-6 pb-16">


          {/* =================================================
              2. MAIN EDITORIAL SECTION (3-COLUMN MAGAZINE LAYOUT)
          ================================================= */}
          <section className="pb-8 sm:pb-10 mb-10 sm:mb-12 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-[1.16fr_1.18fr_0.92fr] gap-6 lg:gap-7 items-stretch">
              {/* LEFT COLUMN: Featured Innovation Hero Story */}
              <div className="min-w-0 flex flex-col justify-between">
                <InnovationFeaturedStory story={defaultFeaturedInnovation} />
              </div>

              {/* MIDDLE COLUMN: Top Innovation Stories + Market Snapshot (With Vertical Partition Lines) */}
              <div className="min-w-0 flex flex-col justify-between lg:border-x lg:border-gray-200 lg:px-6">
                <div>
                  <TopInnovationStories stories={defaultTopInnovationStories} />
                </div>
                <div className="mt-6 pt-5 border-t border-gray-200/80">
                  <MarketSnapshot data={defaultMarketSnapshot} />
                </div>
              </div>

              {/* RIGHT COLUMN: Numbers at a Glance + Latest in Innovation */}
              <div className="min-w-0 flex flex-col justify-between lg:pl-1">
                <div>
                  <NumbersAtAGlance metrics={defaultInnovationMetrics} />
                </div>
                <div>
                  <LatestInnovationNews stories={defaultLatestInnovationNews} />
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              3. ADVERTISEMENT SLOT
          ================================================= */}
          <AdvertisementSlot variant="first" className="mb-12" />

          {/* =================================================
              4. NEWSLETTER CTA
          ================================================= */}
          <section className="bg-[#0b1a30] text-white text-center p-8 md:p-10 rounded-none border border-gray-800">
            <h2 className="font-serif text-2xl md:text-[30px] mb-2 font-bold">
              Stay Ahead with The Pride Times
            </h2>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Daily briefings on AI, semiconductors, quantum breakthroughs, and global tech policy delivered directly to your inbox.
            </p>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 min-w-0 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 px-4 py-3 text-sm outline-none focus:border-white/50 rounded-none"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold transition-colors rounded-none whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default InnovationPage;
