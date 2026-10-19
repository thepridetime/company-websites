import {
  defaultFeaturedStartup,
  defaultStartupWatch,
  defaultTopStartupStories,
  defaultStartupMetrics,
  defaultFundedStartups,
  defaultLatestStartupNews,
  type StartupStory,
  type StartupMetric,
  type FundedCompany,
} from "../../data/startupData";
import { AdvertisementSlot } from "../startup/AdvertisementSlot";
import { FeaturedStartupStory } from "../startup/FeaturedStartupStory";
import { StartupStoryList } from "../startup/StartupStoryList";
import { FundingWatch } from "../startup/FundingWatch";
import { StartupWatch } from "../startup/StartupWatch";
import { StartupMetrics } from "../startup/StartupMetrics";
import { LatestStartupNews } from "../startup/LatestStartupNews";
import { PrideTimesAd } from "../AdSenseSlots";

// Re-export modular components for external consumption
export {
  AdvertisementSlot,
  FeaturedStartupStory,
  StartupStoryList,
  FundingWatch,
  StartupWatch,
  StartupMetrics,
  LatestStartupNews,
};

export interface StartupSuccessPageProps {
  featuredStory?: StartupStory | null;
  startupWatchStory?: StartupStory | null;
  topStories?: StartupStory[];
  fundingList?: FundedCompany[];
  metrics?: StartupMetric[];
  latestNews?: StartupStory[];
}

export function StartupSuccessPage({
  featuredStory = defaultFeaturedStartup,
  startupWatchStory = defaultStartupWatch,
  topStories = defaultTopStartupStories,
  fundingList = defaultFundedStartups,
  metrics = defaultStartupMetrics,
  latestNews = defaultLatestStartupNews,
}: StartupSuccessPageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-4 md:pt-6 pb-16">


          {/* =========================================================
              2. TOP ADVERTISEMENT (Controlled Spacing)
          ========================================================= */}
          <div className="mb-5 sm:mb-6">
            <AdvertisementSlot
              slot="5373718974"
              format="auto"
              minHeight={90}
            />
          </div>

          {/* =========================================================
              3. EDITORIAL MAGAZINE GRID (60% Left / 40% Right)
          ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.38fr_1fr] gap-6 lg:gap-8 items-start">
            {/* -------------------------------------------------------
                LEFT COLUMN (~60% CONTENT AREA)
            ------------------------------------------------------- */}
            <div className="min-w-0 flex flex-col">
              {/* A. MAIN FEATURED STORY */}
              <FeaturedStartupStory story={featuredStory} />

              {/* C. TOP STARTUP STORIES (COMPACT FEED WITH THUMBNAILS) */}
              <StartupStoryList
                stories={topStories}
                title="TOP STARTUP STORIES"
                viewMoreUrl="/technology"
              />

              {/* E. FUNDING WATCH (COMPACT FUNDED COMPANIES LIST) */}
              <FundingWatch
                companies={fundingList}
                title="FUNDING WATCH"
                viewMoreUrl="/markets"
              />
            </div>

            {/* -------------------------------------------------------
                RIGHT SIDEBAR COLUMN (~40% CONTENT AREA)
            ------------------------------------------------------- */}
            <aside className="min-w-0 flex flex-col lg:border-l lg:border-gray-200 lg:pl-8">
              {/* B. STARTUP WATCH (SECONDARY FEATURED WITH IMAGE) */}
              <StartupWatch
                story={startupWatchStory}
                exploreUrl="/technology"
              />

              {/* D. STARTUP METRICS (4 CONCISE SERIF STATISTICS) */}
              <StartupMetrics
                metrics={metrics}
                title="STARTUP METRICS"
                dateText="7 OCTOBER 2026"
              />

              {/* F. LATEST STARTUP NEWS (3 COMPACT NEWS ROWS + FOOTER LINK) */}
              <LatestStartupNews
                news={latestNews}
                title="LATEST STARTUP NEWS"
                viewAllUrl="/technology"
              />
            </aside>
          </div>

          {/* =========================================================
              4. LOWER ADVERTISEMENT (Preserved in page flow)
          ========================================================= */}
          <section className="mt-10 sm:mt-12 pt-6 border-t border-gray-200">
            <PrideTimesAd variant="first" />
          </section>
        </main>
      </div>
    </div>
  );
}

export default StartupSuccessPage;
