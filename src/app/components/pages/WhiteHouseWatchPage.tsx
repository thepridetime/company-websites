import {
  whiteHouseFeatured,
  whiteHouseOtherStories,
  whiteHouseLatestNews,
  whiteHouseStories,
} from "../../data/whiteHouseData";
import { AdvertisementSlot } from "../whitehouse/AdvertisementSlot";
import { WhiteHouseFeaturedStory } from "../whitehouse/WhiteHouseFeaturedStory";
import { WhiteHouseStoryList } from "../whitehouse/WhiteHouseStoryList";
import { WhiteHouseKeyFigures } from "../whitehouse/WhiteHouseKeyFigures";
import { WhiteHouseLatestNews } from "../whitehouse/WhiteHouseLatestNews";

export interface WhiteHouseWatchPageProps {
  section?: string;
}

export function WhiteHouseWatchPage({
  section = "White House Watch",
}: WhiteHouseWatchPageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-4 md:pt-6 pb-16">

          {/* =========================================================
              1. PAGE TITLE
          ========================================================= */}
          <header className="border-t-[3px] border-red-600 pt-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
              <div>
                <h1 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold leading-tight">
                  {section}
                </h1>
                <p className="mt-1 text-[11px] md:text-[13px] text-gray-500">
                  Executive actions, federal policy and government decisions
                  shaping technology and business from The Pride Times.
                </p>
              </div>

              <span className="text-[8px] uppercase tracking-[0.18em] text-gray-400">
                Policy • Executive • Federal
              </span>
            </div>
          </header>

          {/* =========================================================
              2. TOP ADVERTISEMENT
          ========================================================= */}
          <div className="mb-5 sm:mb-6">
            <AdvertisementSlot variant="first" />
          </div>

          {/* =========================================================
              3. EDITORIAL GRID (60% Left / 40% Right)
          ========================================================= */}
          {whiteHouseStories.length === 0 ? (
            <p className="py-10 text-center text-[11px] text-gray-400">
              No White House Watch stories yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1.38fr_1fr] gap-6 lg:gap-8 items-start">
              {/* -------------------------------------------------------
                  LEFT COLUMN
              ------------------------------------------------------- */}
              <div className="min-w-0 flex flex-col">
                {/* A. MAIN FEATURED STORY */}
                <WhiteHouseFeaturedStory story={whiteHouseFeatured} />

                {/* B. MORE WHITE HOUSE STORIES (COMPACT FEED) */}
                <WhiteHouseStoryList
                  stories={whiteHouseOtherStories}
                  title="MORE WHITE HOUSE STORIES"
                />
              </div>

              {/* -------------------------------------------------------
                  RIGHT SIDEBAR COLUMN
              ------------------------------------------------------- */}
              <aside className="min-w-0 flex flex-col lg:border-l lg:border-gray-200 lg:pl-8">
                {/* C. KEY FIGURES (FROM FEATURED STORY) */}
                <WhiteHouseKeyFigures
                  facts={whiteHouseFeatured?.keyFacts ?? []}
                  storyCount={whiteHouseStories.length}
                  title="Key Figures"
                />

                {/* D. LATEST NEWS (COMPACT ROWS) */}
                <WhiteHouseLatestNews
                  news={whiteHouseLatestNews}
                  title="LATEST WHITE HOUSE NEWS"
                />

                {/* E. SIDEBAR AD */}
                <AdvertisementSlot variant="second" className="mt-6" />
              </aside>
            </div>
          )}

          {/* =========================================================
              4. LOWER ADVERTISEMENT
          ========================================================= */}
          <section className="mt-10 sm:mt-12 pt-6 border-t border-gray-200">
            <AdvertisementSlot variant="second" />
          </section>
        </main>
      </div>
    </div>
  );
}

export default WhiteHouseWatchPage;
