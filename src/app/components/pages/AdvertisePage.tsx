/* ─────────────────────────────────────────────────────────
   ADVERTISE — matches the provided reference screenshot:
   masthead-style heading + subtitle, a 3x2 grid of ad
   product cards (emoji icon, title, description), and a
   dark "Get a Media Kit" CTA banner with a red button.

   Uses the site's existing design tokens (pt-red #e31b23,
   pt-navy #071a2d, pt-black #111111, Times New Roman
   masthead, Arial body) so it stays consistent with the
   rest of the publication.
───────────────────────────────────────────────────────── */

const products = [
  {
    icon: "📊",
    title: "Digital Display",
    text: "Banner and native ads across all Pride Times digital properties. Leaderboard, rectangle, and inline formats.",
  },
  {
    icon: "📰",
    title: "Sponsored Content",
    text: "Thought leadership articles published under your brand alongside our editorial content.",
  },
  {
    icon: "📧",
    title: "Newsletter Sponsorship",
    text: "Exclusive placement in our daily business briefing sent to 800K+ subscribers.",
  },
  {
    icon: "🎥",
    title: "Video Sponsorship",
    text: "Pre-roll and mid-roll integration with our market analysis and CEO interview video series.",
  },
  {
    icon: "📱",
    title: "Mobile & App",
    text: "Reach readers through our iOS and Android apps with contextual ad formats.",
  },
  {
    icon: "🎪",
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
          Reach 2M+ business decision-makers, executives, and investors
          worldwide.
        </p>

        {/* ── Product grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {products.map((p) => (
            <div
              key={p.title}
              className="border border-[#e2e2e2] rounded-md p-6"
            >
              <div className="text-[26px] mb-4">{p.icon}</div>

              <h3 className="text-[16px] font-bold text-[#111111] mb-2">
                {p.title}
              </h3>

              <p className="text-[13px] sm:text-[14px] text-[#555555] leading-[1.65]">
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── Media kit CTA ────────────────────────────────── */}
        <section className="bg-[#071a2d] rounded-md py-12 px-6 flex flex-col items-center text-center">
          <h2 className="font-serif text-[26px] sm:text-[30px] font-bold text-white mb-3">
            Get a Media Kit
          </h2>

          <p className="text-[14px] sm:text-[15px] text-gray-300 mb-6 max-w-xl">
            Our advertising team will build a custom proposal for your
            brand goals.
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
