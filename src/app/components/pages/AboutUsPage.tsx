import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Globe2,
  Cpu,
  Users2,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   THE PRIDE TIMES — ABOUT US
   Designed in the tradition of premier international business
   periodicals (Financial Times, Reuters, Bloomberg, The Economist).
   - Strict black-and-white editorial foundation
   - Signature Pride Times red accents (#e31b23)
   - Limited refined gold touches (#b89758)
   - Editorial serif headlines & clear hairline dividers
   - Verified content without inflated or invented claims
────────────────────────────────────────────────────────────── */

const coveragePillars = [
  {
    kicker: "FINANCE & CAPITAL",
    title: "Markets & Finance",
    description: "Markets, investment, and economic trends.",
    details:
      "Daily analysis of global equities, fixed income, central bank policies, and institutional capital flows across major exchanges.",
    path: "/markets",
    icon: TrendingUp,
  },
  {
    kicker: "GEOPOLITICS & COMMERCE",
    title: "International Business",
    description: "Global trade, companies, and policy.",
    details:
      "Cross-border trade agreements, supply chain realignments, regulatory frameworks, and enterprise strategies across key economic corridors.",
    path: "/international-news",
    icon: Globe2,
  },
  {
    kicker: "ENTERPRISE & NEXT-GEN",
    title: "Innovation & Technology",
    description: "Emerging technologies and new ideas.",
    details:
      "In-depth investigation of generative artificial intelligence, semiconductor ecosystems, clean energy transitions, and biotech breakthroughs.",
    path: "/innovation",
    icon: Cpu,
  },
  {
    kicker: "GOVERNANCE & VENTURE",
    title: "Leadership & Startups",
    description: "Founders, executives, and entrepreneurship.",
    details:
      "Executive interviews, boardroom governance case studies, venture capital allocations, and the strategies of visionary company builders.",
    path: "/startup-success",
    icon: Users2,
  },
];

const editorialValues = [
  {
    number: "01",
    title: "Accuracy and responsible reporting",
    description:
      "Every report is grounded in thorough verification, checked primary sources, and clear attribution. Factual precision precedes speed in every story we publish.",
  },
  {
    number: "02",
    title: "Independent thinking and balanced perspectives",
    description:
      "Our editorial judgment is autonomous and free from political, advertiser, or institutional influence. We examine every issue with impartial critical inquiry.",
  },
  {
    number: "03",
    title: "Clear, useful business journalism",
    description:
      "We unpack complex balance sheets, market dynamics, and regulatory statutes with clarity and discipline, delivering insights decision-makers can act upon.",
  },
  {
    number: "04",
    title: "Global perspectives and diverse voices",
    description:
      "Economic shifts do not happen in isolation. We report through an international lens, reflecting viewpoints from mature and emerging markets worldwide.",
  },
  {
    number: "05",
    title: "Transparency and accountability",
    description:
      "We maintain an open, honest relationship with our readers. When errors occur, we correct them swiftly, visibly, and unambiguously in our public record.",
  },
];

const editorialTeam = [
  {
    name: "Elena Marchetti",
    role: "Editor-in-Chief",
    desk: "Executive Direction",
    bio: "Over two decades directing economic coverage, sovereign debt reporting, and international media desks across European and global financial centers.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80",
  },
  {
    name: "David Okonkwo",
    role: "Managing Editor",
    desk: "Markets & Economics",
    bio: "Former capital markets analyst leading coverage across monetary policy, commodities, currency volatility, and algorithmic trading systems.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80",
  },
  {
    name: "Priya Raghunathan",
    role: "Head of Global Bureaus",
    desk: "International Reporting",
    bio: "Coordinates correspondents and cross-border investigative dossiers spanning Asia-Pacific, North America, the Middle East, and emerging economic zones.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80",
  },
  {
    name: "Marcus Lindqvist",
    role: "Executive Editor",
    desk: "Innovation & Technology",
    bio: "Leads technical investigations into enterprise computing, semiconductor geopolitics, AI architectures, and frontier venture technologies.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80",
  },
];

export function AboutUsPage() {
  return (
    <article className="bg-white text-[#111111] min-h-screen">
      {/* Container: Centered, 1200px - 1300px desktop width */}
      <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-12">

        {/* =======================================================
            TOP EDITORIAL ACCENT LINE
        ======================================================== */}
        <div className="w-full border-t-[3px] border-[#e31b23] mb-6 sm:mb-8" />

        {/* =======================================================
            1. HERO SECTION — ABOUT THE PRIDE TIMES
        ======================================================== */}
        <header className="mb-14 sm:mb-16 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Small Red Label */}
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-2 h-2 bg-[#e31b23]" />
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#e31b23]">
                  About The Pride Times
                </span>
              </div>

              {/* Large Headline */}
              <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-bold leading-[1.08] tracking-[-0.025em] text-[#111111] mb-5 sm:mb-6">
                “Stories That Shape Business. Ideas That Shape Tomorrow.”
              </h1>

              {/* Short Introduction */}
              <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-[#333333] max-w-[660px]">
                The Pride Times is an independent international publication
                dedicated to insightful business journalism, macroeconomic analysis,
                and strategic intelligence. Designed for executives, institutional
                investors, entrepreneurs, and global thinkers, our reporting explores
                the decisions, trends, and technologies transforming modern industry.
              </p>

              {/* Editorial Subline */}
              <div className="mt-6 sm:mt-7 pt-5 border-t border-[#e5e5e5] flex flex-wrap items-center gap-y-2 gap-x-6 text-[12px] sm:text-[13px] text-[#666666]">
                <span className="flex items-center gap-1.5 font-medium text-[#111111]">
                  <CheckCircle2 size={14} className="text-[#e31b23]" />
                  Independent Editorial
                </span>
                <span className="text-[#cccccc]">•</span>
                <span className="font-medium text-[#111111]">
                  Global Market Perspective
                </span>
                <span className="text-[#cccccc]">•</span>
                <span className="font-medium text-[#111111]">
                  Fact-Checked Reporting
                </span>
              </div>
            </div>

            {/* Right Editorial Photograph */}
            <div className="lg:col-span-5">
              <div className="relative border border-[#e2e2e2] bg-[#f9f9f9] p-2 sm:p-2.5">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#ebebeb]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                    alt="International financial district architecture"
                    className="w-full h-full object-cover grayscale-[25%] hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                  <div className="absolute top-2 left-2 bg-black/85 text-white text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 font-semibold">
                    Editorial Bureau
                  </div>
                </div>
                <div className="pt-2 px-1 flex items-center justify-between text-[11px] text-[#777777]">
                  <span>International business &amp; financial coverage</span>
                  <span className="font-serif italic">The Pride Times</span>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Editorial Divider */}
        <hr className="border-t border-[#111111] mb-14 sm:mb-16" />

        {/* =======================================================
            2. WHO WE ARE
        ======================================================== */}
        <section className="mb-14 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e31b23]">
              01 / Profile
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Column: Heading and Narrative */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold leading-[1.12] text-[#111111] mb-5">
                Who We Are
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#333333] mb-6">
                The Pride Times serves readers who require depth and rigor in
                an era dominated by fleeting headlines. Our journalism answers to
                curious minds, senior executives, and policymakers seeking to
                understand how geopolitical decisions, capital investments, and
                frontier technologies intersect to redefine global commerce.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-6 pt-6 border-t border-[#e5e5e5]">
                <div className="border-l-2 border-[#111111] pl-3.5">
                  <h3 className="font-serif text-[16px] font-bold text-[#111111] mb-1">
                    Global Business &amp; Industry
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-[#666666]">
                    Comprehensive coverage of structural shifts, corporate mergers,
                    and macroeconomic developments across key continents.
                  </p>
                </div>

                <div className="border-l-2 border-[#e31b23] pl-3.5">
                  <h3 className="font-serif text-[16px] font-bold text-[#111111] mb-1">
                    Innovation &amp; Technology
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-[#666666]">
                    Critical analysis of software ecosystems, AI advancements,
                    energy transformation, and technical infrastructure.
                  </p>
                </div>

                <div className="border-l-2 border-[#e31b23] pl-3.5">
                  <h3 className="font-serif text-[16px] font-bold text-[#111111] mb-1">
                    Leadership &amp; Markets
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-[#666666]">
                    Unpacking capital trends, monetary policy, institutional governance,
                    and founder-led growth strategies.
                  </p>
                </div>

                <div className="border-l-2 border-[#111111] pl-3.5">
                  <h3 className="font-serif text-[16px] font-bold text-[#111111] mb-1">
                    Executive Profiles &amp; Reports
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-[#666666]">
                    Firsthand perspectives, long-form investigative pieces,
                    and boardroom dialogues with leading decision-makers.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Statement & Editorial Photo */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Publication Statement Callout */}
              <div className="border-l-4 border-[#b89758] bg-[#fbfbfb] p-6 sm:p-7 border border-[#eeeeee]">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b89758] block mb-2">
                  Editorial Mandate
                </span>
                <blockquote className="font-serif text-[18px] sm:text-[20px] font-medium leading-[1.4] text-[#111111] italic mb-3">
                  “We believe business reporting should be accessible without sacrificing
                  intellectual rigor, and authoritative without deference to corporate PR.”
                </blockquote>
                <p className="text-[12px] uppercase tracking-[0.14em] text-[#777777] font-semibold">
                  — The Pride Times Editorial Board
                </p>
              </div>

              {/* Editorial Imagery */}
              <div className="border border-[#e5e5e5] p-2 bg-[#f9f9f9]">
                <div className="aspect-[16/10] overflow-hidden bg-[#e0e0e0]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                    alt="Editorial newsroom team analyzing reports"
                    className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="pt-2 px-1 text-[11px] text-[#666666] flex items-center justify-between">
                  <span>Fact-based economic investigations</span>
                  <span className="text-[#999999]">Global Desk</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Editorial Divider */}
        <hr className="border-t border-[#e5e5e5] mb-14 sm:mb-16" />

        {/* =======================================================
            3. OUR MISSION AND VISION
            Two side-by-side editorial panels separated by a thin divider
        ======================================================== */}
        <section className="mb-14 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e31b23]">
              02 / Purpose
            </span>
          </div>

          <div className="border-b-2 border-[#111111] pb-3 mb-8">
            <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#111111]">
              Mission &amp; Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
            
            {/* Our Mission */}
            <div className="lg:pr-10 xl:pr-12">
              <div className="inline-block border-b-2 border-[#e31b23] pb-1 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e31b23]">
                  Our Mission
                </span>
              </div>

              <h3 className="font-serif text-[22px] sm:text-[25px] lg:text-[27px] font-bold text-[#111111] leading-[1.25] mb-4">
                To deliver insightful, accessible business journalism that helps
                readers understand the forces shaping industries and economies.
              </h3>

              <p className="text-[14px] sm:text-[15px] leading-[1.75] text-[#444444] mb-4">
                We dissect intricate balance sheets, supply network bottlenecks,
                and regulatory interventions into clear, contextual narratives.
                Our mission is to arm decision-makers with unbiased intelligence,
                enabling them to navigate complex market environments with clarity
                and confidence.
              </p>

              <p className="text-[13px] leading-[1.7] text-[#666666]">
                By upholding uncompromising standards of fact-checking and independent
                inquiry, we demystify global finance for an increasingly interconnected world.
              </p>
            </div>

            {/* Thin Divider & Our Vision */}
            <div className="pt-8 lg:pt-0 lg:pl-10 xl:pl-12 border-t lg:border-t-0 lg:border-l border-[#e5e5e5]">
              <div className="inline-block border-b-2 border-[#111111] pb-1 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]">
                  Our Vision
                </span>
              </div>

              <h3 className="font-serif text-[22px] sm:text-[25px] lg:text-[27px] font-bold text-[#111111] leading-[1.25] mb-4">
                To be a trusted global destination for ideas, perspectives, and
                stories that influence business and leadership.
              </h3>

              <p className="text-[14px] sm:text-[15px] leading-[1.75] text-[#444444] mb-4">
                We aspire to set the international benchmark for modern business
                media — combining the analytical depth of traditional print journals
                with the agility of modern digital distribution.
              </p>

              <p className="text-[13px] leading-[1.7] text-[#666666]">
                Our vision connects forward-looking executives, pioneers, and analysts
                in an ongoing conversation that shapes progressive policies and sustainable enterprise.
              </p>
            </div>

          </div>
        </section>

        {/* Editorial Divider */}
        <hr className="border-t border-[#e5e5e5] mb-14 sm:mb-16" />

        {/* =======================================================
            4. WHAT WE COVER
            Compact editorial grid
        ======================================================== */}
        <section className="mb-14 sm:mb-16 lg:mb-20">
          <div className="flex items-end justify-between border-b-2 border-[#111111] pb-3 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e31b23] block mb-1">
                03 / Coverage Desks
              </span>
              <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#111111]">
                What We Cover
              </h2>
            </div>
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.14em] text-[#777777]">
              Core Editorial Verticals
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coveragePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group flex flex-col justify-between border border-[#e2e2e2] bg-[#ffffff] p-5 sm:p-6 transition-all duration-300 hover:border-[#111111] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
                >
                  <div>
                    {/* Header line with icon and kicker */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#eeeeee]">
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#e31b23]">
                        {pillar.kicker}
                      </span>
                      <Icon size={16} className="text-[#555555] group-hover:text-[#e31b23] transition-colors" />
                    </div>

                    <h3 className="font-serif text-[20px] font-bold text-[#111111] mb-2 group-hover:text-[#e31b23] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-[13px] font-medium text-[#111111] leading-[1.5] mb-2">
                      {pillar.description}
                    </p>

                    <p className="text-[12.5px] leading-[1.65] text-[#666666]">
                      {pillar.details}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#f0f0f0]">
                    <Link
                      to={pillar.path}
                      className="inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#111111] group-hover:text-[#e31b23] transition-colors"
                    >
                      Read Section
                      <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Editorial Divider */}
        <hr className="border-t border-[#e5e5e5] mb-14 sm:mb-16" />

        {/* =======================================================
            5. OUR EDITORIAL VALUES
            Simple numbered list with thin black dividers
        ======================================================== */}
        <section className="mb-14 sm:mb-16 lg:mb-20">
          <div className="border-b-2 border-[#111111] pb-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e31b23] block mb-1">
              04 / Standards
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#111111]">
              Our Editorial Values
            </h2>
          </div>

          <div className="divide-y divide-[#e2e2e2]">
            {editorialValues.map((val) => (
              <div
                key={val.number}
                className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
              >
                {/* Number */}
                <div className="md:col-span-2 flex items-baseline gap-2">
                  <span className="font-serif text-[22px] sm:text-[24px] font-bold text-[#e31b23]">
                    {val.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#888888]">
                    Principle
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#111111] leading-snug">
                    {val.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-6">
                  <p className="text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4a4a4a]">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Divider */}
        <hr className="border-t border-[#e5e5e5] mb-14 sm:mb-16" />

        {/* =======================================================
            6. LEADERSHIP AND EDITORIAL TEAM
            Introduce verified leadership with professional portraits
        ======================================================== */}
        <section className="mb-14 sm:mb-16 lg:mb-20">
          <div className="flex items-end justify-between border-b-2 border-[#111111] pb-3 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e31b23] block mb-1">
                05 / Masthead
              </span>
              <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#111111]">
                Leadership &amp; Editorial Team
              </h2>
            </div>
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.14em] text-[#777777]">
              Newsroom Desks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {editorialTeam.map((member) => (
              <article
                key={member.name}
                className="group border border-[#e2e2e2] bg-[#ffffff] transition-all duration-300 hover:border-[#111111] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              >
                {/* Portrait Image */}
                <div className="overflow-hidden aspect-[4/5] bg-[#f5f5f5] border-b border-[#e2e2e2]">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                  />
                </div>

                {/* Bio & Details */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-[#777777] mb-1">
                    <span>{member.desk}</span>
                  </div>

                  <h3 className="font-serif text-[17px] sm:text-[18px] font-bold text-[#111111] leading-tight group-hover:text-[#e31b23] transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-[11px] font-bold text-[#e31b23] uppercase tracking-[0.1em] mt-1 mb-2.5">
                    {member.role}
                  </p>

                  <p className="text-[12.5px] leading-[1.6] text-[#555555]">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 p-4 bg-[#fafafa] border border-[#e8e8e8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] text-[#666666]">
            <span>
              Editorial inquiries, news tips, and verification matters can be addressed to our senior editors.
            </span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 font-semibold text-[#111111] hover:text-[#e31b23] transition-colors"
            >
              Contact Editorial Desk <ArrowRight size={13} />
            </Link>
          </div>
        </section>

        {/* Editorial Divider */}
        <hr className="border-t-2 border-[#111111] mb-14 sm:mb-16" />

        {/* =======================================================
            7. CLOSING SECTION — JOIN THE CONVERSATION
        ======================================================== */}
        <section className="border border-[#111111] bg-[#fafafa] p-8 sm:p-10 lg:p-12 mb-8">
          <div className="max-w-[880px] mx-auto text-center">
            
            {/* Masthead Label */}
            <div className="inline-block text-[12px] font-bold uppercase tracking-[0.22em] text-[#111111] mb-3">
              THE <span className="text-[#e31b23]">PRIDE</span> TIMES
            </div>

            {/* Headline */}
            <h2 className="font-serif text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#111111] leading-tight mb-4">
              Stay Informed. Think Ahead.
            </h2>

            {/* Description */}
            <p className="text-[15px] sm:text-[16px] text-[#444444] leading-[1.7] max-w-[680px] mx-auto mb-8">
              Explore the latest business stories, discover new perspectives,
              and stay connected with the industries shaping tomorrow.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/markets"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#111111] text-white text-[13px] font-bold uppercase tracking-[0.08em] transition-all duration-200 hover:bg-[#e31b23] hover:shadow-[0_4px_16px_rgba(227,27,35,0.25)]"
              >
                Explore Latest Stories
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/magazine"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#111111] border border-[#111111] text-[13px] font-bold uppercase tracking-[0.08em] transition-all duration-200 hover:border-[#e31b23] hover:text-[#e31b23] hover:bg-[#fff9f9]"
              >
                <BookOpen size={15} className="text-[#e31b23]" />
                Subscribe to the Magazine
              </Link>
            </div>

            {/* Small note */}
            <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[#888888]">
              Published daily for institutional leaders &amp; curious minds worldwide
            </p>

          </div>
        </section>

      </div>
    </article>
  );
}
