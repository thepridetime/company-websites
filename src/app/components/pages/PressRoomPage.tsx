/* ─────────────────────────────────────────────────────────
   PRESS ROOM — matches the provided reference screenshot:
   masthead-style heading, a 3-column grid of press release
   cards (date, headline, summary), and a "Media Inquiries"
   box with a red mailto button.

   Uses the site's existing design tokens (pt-red #e31b23,
   pt-black #111111, Times New Roman masthead, Arial body)
   so it stays consistent with the rest of the publication.
───────────────────────────────────────────────────────── */

const releases = [
  {
    date: "AUG 12, 2026",
    title: "The Pride Times Surpasses 2 Million Monthly Active Readers",
    text: "Global readership milestone achieved across 120+ countries.",
  },
  {
    date: "AUG 1, 2026",
    title:
      "Launch of The Pride Times Asia Edition with Dedicated Coverage Team",
    text: "Expanded newsroom focuses on South Asia, Southeast Asia and Pacific markets.",
  },
  {
    date: "JUL 28, 2026",
    title: "The Pride Times CEO Summit 2026 Announced for November in New York",
    text: "Annual flagship event brings together 500+ global executives and policymakers.",
  },
  {
    date: "JUL 22, 2026",
    title: "Digital Edition Now Available in 11 Languages",
    text: "Automatic translation and regional editions launched for global audience.",
  },
  {
    date: "JUL 5, 2026",
    title: "Pride Times 30 — 2026 Leaders List Published",
    text: "Annual ranking identifies 30 global business leaders defining the decade.",
  },
  {
    date: "JUN 18, 2026",
    title:
      "Partnership with 5 Leading Business Schools for MBA Content Series",
    text: "Exclusive collaboration with Harvard, INSEAD, Wharton, LBS and IIM.",
  },
];

export function PressRoomPage() {
  return (
    <main className="bg-white text-[#111111]">
      <div className="pt-container py-10">

        {/* ── Top red editorial line ─────────────────────── */}
        <div className="border-t-[3px] border-[#e31b23] mb-6" />

        {/* ── Page heading ────────────────────────────────── */}
        <h1 className="font-serif text-[26px] sm:text-[30px] font-bold text-[#111111] mb-2">
          Press Room
        </h1>

        <p className="text-[14px] sm:text-[15px] text-[#666666] mb-8">
          The latest news and announcements from The Pride Times.
        </p>

        {/* ── Press release grid ───────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {releases.map((r) => (
            <div
              key={r.title}
              className="border border-[#e2e2e2] rounded-md p-5"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#888888]">
                {r.date}
              </span>

              <h3 className="text-[16px] font-bold text-[#111111] mt-2 mb-2 leading-[1.3]">
                {r.title}
              </h3>

              <p className="text-[13px] sm:text-[14px] text-[#555555] leading-[1.6]">
                {r.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── Media inquiries ──────────────────────────────── */}
        <section className="bg-[#f7f7f7] rounded-md py-12 px-6 flex flex-col items-center text-center">
          <h2 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#111111] mb-3">
            Media Inquiries
          </h2>

          <p className="text-[14px] sm:text-[15px] text-[#555555] mb-6 max-w-xl">
            For press inquiries, interview requests, and media kits,
            contact our communications team.
          </p>

          <a
            href="mailto:press@thepridetimes.com"
            className="pt-subscribe-btn inline-flex items-center justify-center px-6 py-3"
          >
            press@pridetimes.com
          </a>
        </section>

      </div>
    </main>
  );
}
