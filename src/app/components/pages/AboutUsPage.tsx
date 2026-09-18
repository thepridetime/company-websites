import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router";
import { Globe, ArrowRight, MapPin } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   ABOUT US
   Layout redesigned to closely match the provided
   Pride Times reference image.

   IMPORTANT:
   - Existing text is preserved
   - Existing image URLs are preserved
   - Existing data is preserved
   - Only layout, spacing, sizing and visual styling changed
───────────────────────────────────────────────────────── */

const milestones = [
  {
    year: "2014",
    text: "Founded in London as a weekly print briefing for institutional investors.",
  },
  {
    year: "2016",
    text: "Digital edition launches; first international bureau opens in Singapore.",
  },
  {
    year: "2019",
    text: "Crosses 500,000 monthly readers; expands into broadcast with Pride Times Live.",
  },
  {
    year: "2022",
    text: "Named Business Publication of the Year by the Global Press Institute.",
  },
  {
    year: "2024",
    text: "Reaches 2 million global readers across 120 countries.",
  },
  {
    year: "2026",
    text: "Launches the Pride Times 30 leadership index; newsroom grows to 40 bureaus.",
  },
];

const principles = [
  {
    title: "Independence",
    text: "Our journalism answers to readers, not to advertisers or shareholders.",
  },
  {
    title: "Accuracy first",
    text: "We correct our mistakes in public, and as fast as we made them.",
  },
  {
    title: "A global lens",
    text: "We report from where the story is, not from where it's convenient.",
  },
  {
    title: "Plain language",
    text: "Complex markets and policy, explained without jargon.",
  },
  {
    title: "On the record",
    text: "Every claim is sourced. Every source is checked.",
  },
];

const leadership = [
  {
    name: "Elena Marchetti",
    role: "Editor-in-Chief",
    bio: "Twenty years covering global markets, from the 2008 crisis to the AI capital boom.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
  {
    name: "David Okonkwo",
    role: "Managing Editor, Markets",
    bio: "Formerly a derivatives desk analyst; now leads our markets and finance coverage.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
  {
    name: "Priya Raghunathan",
    role: "Head of Global Bureaus",
    bio: "Oversees reporting across our 40 international bureaus and correspondent network.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
  {
    name: "Marcus Lindqvist",
    role: "Chief Technology Officer",
    bio: "Builds the data infrastructure behind our live markets and research tools.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
];

const bureaus = [
  "London",
  "New York",
  "Singapore",
  "Mumbai",
  "Dubai",
  "Nairobi",
  "São Paulo",
  "Tokyo",
];

export function AboutUsPage() {
  return (
    <main className="bg-white text-[#111111] min-h-screen">
      <div className="w-full max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">

        {/* =====================================================
            TOP RED EDITORIAL LINE
        ====================================================== */}
        <div className="w-full border-t-[3px] border-[#e31b23] mb-5 sm:mb-6" />

        {/* =====================================================
            PAGE HEADING
        ====================================================== */}
        <section className="mb-7 sm:mb-9">
          <div className="flex items-center gap-2 mb-3">
            <Globe
              size={14}
              strokeWidth={2}
              className="text-[#e31b23]"
            />

            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666666]">
              About The Pride Times
            </span>
          </div>

          <h1
            className="
              font-serif
              text-[34px]
              sm:text-[42px]
              lg:text-[48px]
              leading-[1.05]
              tracking-[-0.025em]
              font-bold
              text-[#111111]
            "
          >
            We report on the decisions that move the world's money.
          </h1>

          <p
            className="
              mt-4
              max-w-[760px]
              text-[14px]
              sm:text-[15px]
              lg:text-[16px]
              leading-[1.75]
              text-[#555555]
            "
          >
            The Pride Times is an independent newsroom covering markets,
            technology, and the leaders shaping the global economy — read in
            over 120 countries, written by journalists who answer only to
            their readers.
          </p>
        </section>

        {/* =====================================================
            HERO / MISSION + BY NUMBERS
        ====================================================== */}
        <section
          className="
            grid
            grid-cols-1
            lg:grid-cols-[minmax(0,1fr)_300px]
            gap-7
            lg:gap-8
            mb-12
            lg:mb-14
          "
        >
          {/* LEFT CONTENT */}
          <div>
            {/* Existing image - unchanged */}
            <div className="overflow-hidden rounded-[8px] border border-[#e4e4e4] bg-[#f5f5f5]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700&q=80"
                alt="The Pride Times newsroom"
                className="
                  block
                  w-full
                  h-[260px]
                  sm:h-[330px]
                  lg:h-[365px]
                  object-cover
                "
              />
            </div>

            {/* Mission copy */}
            <div className="mt-5 sm:mt-6">
              <p
                className="
                  text-[14px]
                  sm:text-[15px]
                  leading-[1.7]
                  text-[#3A3934]
                  max-w-[760px]
                "
              >
                <strong className="font-semibold text-[#111111]">
                  Founded in 2014
                </strong>
                , we set out to cover business news the way markets actually
                move — globally, quickly, and without deference to any single
                government or boardroom. What began as a weekly briefing for
                institutional investors is now a daily publication read by
                executives, policymakers, and investors across six continents.
                We remain privately held, which means our reporting is
                accountable to readers rather than quarterly earnings.
              </p>
            </div>
          </div>

          {/* RIGHT - BY THE NUMBERS */}
          <aside>
            <div
              className="
                rounded-[8px]
                bg-[#f7f7f7]
                border
                border-[#eeeeee]
                p-5
                sm:p-6
              "
            >
              <div className="border-b border-[#dedede] pb-3 mb-1">
                <h2
                  className="
                    font-serif
                    text-[20px]
                    sm:text-[21px]
                    font-bold
                    text-[#111111]
                  "
                >
                  By the Numbers
                </h2>
              </div>

              <div>
                {[
                  { label: "Founded", value: "2014" },
                  { label: "Global Readers", value: "2M+" },
                  { label: "Countries Covered", value: "120+" },
                  { label: "Newsroom Bureaus", value: "40" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      py-3
                      border-b
                      border-[#e5e5e5]
                      last:border-b-0
                    "
                  >
                    <span className="text-[13px] text-[#666666]">
                      {stat.label}
                    </span>

                    <span
                      className="
                        text-[14px]
                        sm:text-[15px]
                        font-bold
                        text-[#e31b23]
                      "
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* =====================================================
            OUR HISTORY
        ====================================================== */}
        <section className="mb-12 lg:mb-14">
          <div className="flex items-end justify-between border-b-2 border-[#111111] pb-2 mb-5">
            <h2
              className="
                font-serif
                text-[23px]
                sm:text-[26px]
                font-bold
                text-[#111111]
              "
            >
              Our History
            </h2>

            <span className="hidden sm:block text-[10px] uppercase tracking-[0.16em] text-[#888888]">
              The Journey
            </span>
          </div>

          <div>
            {milestones.map((m) => (
              <div
                key={m.year}
                className="
                  grid
                  grid-cols-[70px_minmax(0,1fr)]
                  sm:grid-cols-[85px_minmax(0,1fr)]
                  gap-4
                  sm:gap-6
                  py-4
                  border-t
                  border-[#e2e2e2]
                  first:border-t-0
                "
              >
                <span
                  className="
                    font-serif
                    text-[19px]
                    sm:text-[21px]
                    font-bold
                    text-[#e31b23]
                  "
                >
                  {m.year}
                </span>

                <p
                  className="
                    text-[13px]
                    sm:text-[14px]
                    leading-[1.7]
                    text-[#3A3934]
                  "
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            PRINCIPLES
        ====================================================== */}
        <section className="mb-12 lg:mb-14">
          <div className="border-b-2 border-[#111111] pb-2 mb-5">
            <h2
              className="
                font-serif
                text-[23px]
                sm:text-[26px]
                font-bold
                text-[#111111]
              "
            >
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {principles.map((p, index) => (
              <div
                key={p.title}
                className="
                  py-4
                  border-t
                  border-[#e2e2e2]
                "
              >
                <div className="flex gap-3">
                  <span className="text-[#e31b23] text-[13px] mt-[2px]">
                    ▸
                  </span>

                  <div>
                    <h3
                      className="
                        font-serif
                        text-[18px]
                        sm:text-[19px]
                        font-bold
                        text-[#111111]
                        mb-1
                      "
                    >
                      {p.title}
                    </h3>

                    <p
                      className="
                        text-[13px]
                        sm:text-[14px]
                        text-[#555555]
                        leading-[1.65]
                      "
                    >
                      {p.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            NEWSROOM LEADERSHIP
        ====================================================== */}
        <section className="mb-12 lg:mb-14">
          <div className="border-b-2 border-[#111111] pb-2 mb-6">
            <h2
              className="
                font-serif
                text-[23px]
                sm:text-[26px]
                font-bold
                text-[#111111]
              "
            >
              Newsroom Leadership
            </h2>
          </div>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-5
              lg:gap-6
            "
          >
            {leadership.map((person) => (
              <article
                key={person.name}
                className="
                  border
                  border-[#e2e2e2]
                  rounded-[8px]
                  overflow-hidden
                  bg-white
                  transition-all
                  duration-300
                  hover:shadow-[0_8px_25px_rgba(0,0,0,0.07)]
                "
              >
                <div className="overflow-hidden aspect-[4/5] bg-[#f4f4f4]">
                  <ImageWithFallback
                    src={person.image}
                    alt={person.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      grayscale-[20%]
                      transition-transform
                      duration-500
                      hover:scale-[1.03]
                    "
                  />
                </div>

                <div className="p-4">
                  <h3
                    className="
                      text-[15px]
                      font-bold
                      text-[#111111]
                    "
                  >
                    {person.name}
                  </h3>

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      text-[#e31b23]
                      uppercase
                      tracking-[0.08em]
                      mt-1
                    "
                  >
                    {person.role}
                  </p>

                  <p
                    className="
                      text-[12px]
                      text-[#666666]
                      mt-2
                      leading-[1.6]
                    "
                  >
                    {person.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================
            GLOBAL BUREAUS
        ====================================================== */}
        <section className="mb-12 lg:mb-14">
          <div
            className="
              flex
              items-center
              gap-2
              border-b-2
              border-[#111111]
              pb-2
              mb-5
            "
          >
            <MapPin
              size={16}
              strokeWidth={2}
              className="text-[#e31b23]"
            />

            <h2
              className="
                font-serif
                text-[23px]
                sm:text-[26px]
                font-bold
                text-[#111111]
              "
            >
              Global Bureaus
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-y-3">
            {bureaus.map((city, i) => (
              <div
                key={city}
                className="flex items-center"
              >
                <span
                  className="
                    text-[13px]
                    sm:text-[14px]
                    text-[#3A3934]
                    hover:text-[#e31b23]
                    transition-colors
                  "
                >
                  {city}
                </span>

                {i < bureaus.length - 1 && (
                  <span className="mx-4 text-[#cfcfcf]">
                    /
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            CTA
        ====================================================== */}
        <section
          className="
            border
            border-[#dcdcdc]
            rounded-[8px]
            p-6
            sm:p-7
            lg:p-8
            flex
            flex-col
            sm:flex-row
            items-start
            sm:items-center
            justify-between
            gap-6
            bg-[#fafafa]
          "
        >
          <div>
            <h2
              className="
                font-serif
                text-[23px]
                sm:text-[26px]
                font-bold
                text-[#111111]
              "
            >
              Join the newsroom
            </h2>

            <p
              className="
                text-[13px]
                sm:text-[14px]
                text-[#555555]
                mt-2
                leading-[1.65]
                max-w-[580px]
              "
            >
              We're always looking for reporters, analysts, and engineers who
              want to cover the story before it's obvious.
            </p>
          </div>

          <Link
            to="/careers"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              whitespace-nowrap
              bg-[#e31b23]
              text-white
              px-5
              py-3
              rounded-[4px]
              text-[12px]
              font-semibold
              uppercase
              tracking-[0.04em]
              transition-all
              duration-200
              hover:bg-[#c9141b]
              hover:shadow-[0_5px_15px_rgba(227,27,35,0.2)]
            "
          >
            View open roles
            <ArrowRight size={14} />
          </Link>
        </section>

      </div>
    </main>
  );
}
