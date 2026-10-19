import { useEffect } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrideTimesAd } from "../AdSenseSlots";
import {
  specialArticles,
  specialArticlePath,
} from "../../data/specialArticleData";
import img_manu_plant from "../../../imports/Manu1.png";
import img_manu_worker from "../../../imports/Manu2.png";
import img_manu_robot_arm from "../../../imports/Manu3.png";
import img_warehouse_robotics from "../../../imports/warehouse-robotics.png";
import img_supply_chain_map from "../../../imports/supply-chain-map.png";
import img_lantronix_robot from "../../../imports/tech16-lantronix-robot.png";
import img_smart_city from "../../../imports/Smartc1.png";
import img_smart_cloud from "../../../imports/Smartc2.png";
import img_smart_globe from "../../../imports/Smartc3.png";
import img_smart_skyline from "../../../imports/Smartc4.png";
import img_digital_code from "../../../imports/pt-digital-economy.png";
import img_cyber_ops from "../../../imports/cyber-ops.png";
import img_data_centre from "../../../imports/data-centre.png";
import img_energy_costs from "../../../imports/Energy1.png";
import img_ai_future from "../../../imports/tech16-ai-future.png";

/* =========================================================
   IMAGES
   Each manufacturing article has its own image, keyed by ID.
   Unmapped articles fall back to Manu1.png.
========================================================= */

const FALLBACK_IMG = img_manu_plant;

const imageById: Record<string, string> = {
  "manufacturing-reshoring-2026": img_manu_plant,
  "manufacturing-demand-output-prices": img_smart_skyline,
  "manufacturing-hyundai-80-percent-us-suppliers": img_manu_worker,
  "manufacturing-mind-robotics-500m": img_manu_robot_arm,
  "manufacturing-uber-rivian-50000-robotaxis": img_smart_city,
  "manufacturing-dhl-10-warehousing-sites": img_warehouse_robotics,
  "manufacturing-advanced-chip-fault-tracing": img_digital_code,
  "manufacturing-ai-robotics-digital-twins": img_smart_cloud,
  "manufacturing-imts-2026-ai-robotics": img_lantronix_robot,
  "manufacturing-domestic-supply-chain-partnerships": img_smart_globe,
  "manufacturing-supply-chain-fragmentation": img_supply_chain_map,
  "manufacturing-energy-costs": img_energy_costs,
  "manufacturing-southeast-asia-ai-cybersecurity": img_cyber_ops,
  "manufacturing-ai-hardware-production": img_data_centre,
  "manufacturing-smart-factory-strategy": img_ai_future,
};

/* =========================================================
   DATA
   Articles from specialArticleData.ts whose section is
   "Manufacturing".
========================================================= */

type ManuItem = {
  id: string;
  href: string;
  title: string;
  kicker: string;
  author: string;
  image: string;
  publishedAt: string;
};

const manuItems: ManuItem[] = specialArticles
  .filter((article) => article.section === "Manufacturing")
  .map((article) => ({
    id: article.id,
    href: specialArticlePath(article.id),
    title: article.title,
    kicker: article.category,
    author: article.author,
    image: imageById[article.id] ?? article.image ?? FALLBACK_IMG,
    publishedAt: article.publishedAt,
  }));

const heroStory = manuItems[0];
const secondStory = manuItems[1];
const pickItems = manuItems.slice(0, 6);
const cardItems = manuItems.slice(2, 6);

/* =========================================================
   GOOGLE ADSENSE SLOTS
========================================================= */

function AdSlot({
  slot,
  className = "",
  minHeight = 90,
}: {
  slot: string;
  className?: string;
  minHeight?: number;
}) {
  useEffect(() => {
    try {
      const w = window as Window & { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // Ad blockers, consent settings or missing inventory are expected.
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="mb-1 text-center text-[7px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        Advertisement
      </div>
      <div className="w-full overflow-hidden" style={{ minHeight }}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

/* =========================================================
   SHARED PIECES
========================================================= */

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block bg-red-600 px-1.5 py-[3px] text-[7px] font-bold uppercase leading-none tracking-[0.08em] text-white">
      {children}
    </span>
  );
}

/* =========================================================
   MANUFACTURING PAGE
   Proportions follow the reference layout:
   hero 425 : gap 12 : second story 141 : gap 32 : picks 168
   Card row: four equal columns with 16px gaps.
========================================================= */

export function ManufacturingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 pt-4">

          <div className="h-[150px] overflow-hidden">
            <PrideTimesAd variant="first" />
          </div>

          {heroStory && (
            <>
              {/* TOP ROW: HERO / SECOND STORY / EDITOR'S PICKS */}

              <section className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,425fr)_minmax(0,141fr)_minmax(0,168fr)] md:gap-x-[12px] lg:gap-x-[32px]">

                {/* HERO */}

                <Link
                  to={heroStory.href}
                  className="group relative block h-[250px] overflow-hidden bg-neutral-900 md:h-[250px]"
                >
                  <ImageWithFallback
                    src={heroStory.image}
                    alt={heroStory.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h2 className="font-serif text-[22px] font-bold leading-[1.15] text-white text-balance md:text-[24px]">
                      {heroStory.title}
                    </h2>
                    <p className="mt-1.5 text-[8px] text-gray-200">
                      By {heroStory.author} | {heroStory.publishedAt}
                    </p>
                  </div>
                </Link>

                {/* SECOND STORY */}

                {secondStory && (
                  <Link to={secondStory.href} className="group flex flex-col">
                    <div className="h-[140px] overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={secondStory.image}
                        alt={secondStory.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-2.5">
                      <Tag>{secondStory.kicker}</Tag>
                      <h3 className="mt-2 font-serif text-[14px] font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-600">
                        {secondStory.title}
                      </h3>
                      <p className="mt-1.5 text-[7px] text-gray-500">
                        By {secondStory.author} | {secondStory.publishedAt}
                      </p>
                    </div>
                  </Link>
                )}

                {/* EDITOR'S PICKS */}

                <aside>
                  <h2 className="font-serif text-[16px] font-bold text-gray-900">
                    Editor&apos;s Picks
                  </h2>
                  <ol className="mt-3 space-y-3">
                    {pickItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.href}
                          className="group block text-[9px] font-semibold leading-[1.35] text-gray-800 transition-colors group-hover:text-red-600 hover:text-red-600"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5 h-[112px] overflow-hidden">
                    <AdSlot slot="5373718974" minHeight={90} />
                  </div>
                </aside>
              </section>

              {/* CARD ROW: FOUR EQUAL COLUMNS */}

              {cardItems.length > 0 && (
                <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[16px]">
                  {cardItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className="group flex flex-col"
                    >
                      <div className="h-[160px] overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-2.5">
                        <Tag>{item.kicker}</Tag>
                        <h3 className="mt-2 font-serif text-[14px] font-bold leading-[1.25] text-gray-900 transition-colors group-hover:text-red-600">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[7px] text-gray-500">
                          By {item.author} | {item.publishedAt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </section>
              )}
            </>
          )}

          {!heroStory && (
            <p className="py-16 text-center text-[12px] text-gray-400">
              No manufacturing stories yet.
            </p>
          )}

          <div className="mt-8 h-[150px] overflow-hidden">
            <PrideTimesAd variant="second" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManufacturingPage;
