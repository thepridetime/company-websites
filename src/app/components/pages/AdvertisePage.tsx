import {
  Layout,
  Newspaper,
  Mail,
  Video,
  Smartphone,
  CalendarDays,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   ADVERTISE — The Pride Times Advertising & Partnerships
   Professional editorial display, sponsored content, and
   corporate sponsorship packages.
───────────────────────────────────────────────────────── */

const products = [
  {
    icon: Layout,
    title: "Digital Display",
    text: "Banner and native ads across all Pride Times digital properties. Leaderboard, rectangle, and inline formats.",
  },
  {
    icon: Newspaper,
    title: "Sponsored Content",
    text: "Thought leadership articles published under your brand alongside our editorial content.",
  },
  {
    icon: Mail,
    title: "Newsletter Sponsorship",
    text: "Exclusive placement in our daily business briefing sent to 800K+ subscribers.",
  },
  {
    icon: Video,
    title: "Video Sponsorship",
    text: "Pre-roll and mid-roll integration with our market analysis and CEO interview video series.",
  },
  {
    icon: Smartphone,
    title: "Mobile & App",
    text: "Reach readers through our iOS and Android apps with contextual ad formats.",
  },
  {
    icon: CalendarDays,
    title: "Events & Conferences",
    text: "Sponsor the Pride Times CEO Summit, Innovation Forum, and Global Finance Conference.",
  },
];

export function AdvertisePage() {
  return (
    <main className="bg-white text-[#111111]">
      <div className="pt-container py-10">

        {/* ── Top red editorial line ─────────────────────── */}
        <div className="border-t-[3px] border-[#e31b23] mb-6" />

        {/* ── Page heading ────────────────────────────────── */}
        <h1 className="font-serif text-[26px] sm:text-[30px] font-bold text-[#111111] mb-2">
          Advertise with The Pride Times
        </h1>

        <p className="text-[14px] sm:text-[15px] text-[#666666] mb-8">
          Reach 2M+ business decision-makers, executives, and investors worldwide.
        </p>

        {/* ── Product grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="border border-[#e2e2e2] rounded-md p-6 bg-white hover:border-[#071a2d] transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-[#071a2d]/5 text-[#071a2d] flex items-center justify-center mb-4">
                  <Icon size={20} strokeWidth={2} />
                </div>

                <h3 className="text-[16px] font-bold text-[#111111] mb-2 font-serif">
                  {p.title}
                </h3>

                <p className="text-[13px] sm:text-[14px] text-[#555555] leading-[1.65]">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Media kit CTA ────────────────────────────────── */}
        <section
          id="media-kit"
          className="bg-[#071a2d] rounded-md py-12 px-6 flex flex-col items-center text-center"
        >
          <h2 className="font-serif text-[26px] sm:text-[30px] font-bold text-white mb-3">
            Get a Media Kit
          </h2>

          <p className="text-[14px] sm:text-[15px] text-gray-300 mb-6 max-w-xl">
            Our advertising team will build a custom proposal for your brand goals.
          </p>

          <a
            href="mailto:advertising@thepridetimes.com"
            className="pt-subscribe-btn inline-flex items-center justify-center px-6 py-3"
          >
            Contact Advertising Team
          </a>
        </section>

      </div>
    </main>
  );
}
