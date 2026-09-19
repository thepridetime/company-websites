/* ─────────────────────────────────────────────────────────
   CAREERS — matches the provided reference screenshot:
   masthead-style heading + subtitle, a "Why The Pride
   Times?" highlight box, a list of open positions (each
   with title / department · location · type and an Apply
   button), and a dashed "Don't see your role?" open
   application box.

   Uses the site's existing design tokens (pt-red #e31b23,
   pt-black #111111, Times New Roman masthead, Arial body)
   so it stays consistent with the rest of the publication.
───────────────────────────────────────────────────────── */

const positions = [
  {
    title: "Senior Business Correspondent",
    meta: "Editorial · New York / Remote · Full-time",
  },
  {
    title: "AI & Technology Reporter",
    meta: "Technology Desk · San Francisco / Remote · Full-time",
  },
  {
    title: "Data Journalist",
    meta: "Analytics · London / Remote · Full-time",
  },
  {
    title: "Video Producer",
    meta: "Multimedia · Dubai / Remote · Full-time",
  },
  {
    title: "Product Manager — Digital",
    meta: "Product · New York / Remote · Full-time",
  },
  {
    title: "Marketing Manager — Asia",
    meta: "Marketing · Singapore · Full-time",
  },
];

export function CareersPage() {
  return (
    <main className="bg-white text-[#111111]">
      <div className="pt-container py-10">

        {/* ── Top red editorial line ─────────────────────── */}
        <div className="border-t-[3px] border-[#e31b23] mb-6" />

        {/* ── Page heading ────────────────────────────────── */}
        <h1 className="font-serif text-[26px] sm:text-[30px] font-bold text-[#111111] mb-2">
          Careers at The Pride Times
        </h1>

        <p className="text-[14px] sm:text-[15px] text-[#666666] mb-8">
          Join the team shaping the future of global business
          journalism.
        </p>

        {/* ── Why The Pride Times? ─────────────────────────── */}
        <div className="bg-[#f7f7f7] border border-[#eeeeee] rounded-md p-6 sm:p-7 flex items-start gap-5 mb-10">
          <span className="text-[32px] shrink-0">🌟</span>

          <div>
            <h2 className="text-[17px] sm:text-[18px] font-bold text-[#111111] mb-2">
              Why The Pride Times?
            </h2>

            <p className="text-[13px] sm:text-[14px] text-[#555555] leading-[1.65]">
              We're a global team on a mission to inform the world's
              most important conversations. We offer competitive
              compensation, remote-first culture, and the chance to
              reach 2M+ readers every day.
            </p>
          </div>
        </div>

        {/* ── Open positions ───────────────────────────────── */}
        <h2 className="text-[18px] sm:text-[19px] font-bold text-[#111111] mb-4">
          Open Positions
        </h2>

        <div className="border border-[#e2e2e2] rounded-md overflow-hidden mb-8">
          {positions.map((pos, i) => (
            <div
              key={pos.title}
              className={`flex items-center justify-between gap-4 px-5 sm:px-6 py-5 ${
                i > 0 ? "border-t border-[#e2e2e2]" : ""
              }`}
            >
              <div className="min-w-0">
                <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111111]">
                  {pos.title}
                </h3>

                <p className="text-[12px] sm:text-[13px] text-[#888888] mt-1">
                  {pos.meta}
                </p>
              </div>

              <a
                href="mailto:careers@thepridetimes.com"
                className="shrink-0 inline-flex items-center gap-1.5 bg-[#111111] text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-black transition-colors"
              >
                Apply <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>

        {/* ── Open application ─────────────────────────────── */}
        <div className="border border-dashed border-[#cccccc] rounded-md py-10 px-6 flex flex-col items-center text-center">
          <h2 className="text-[18px] sm:text-[19px] font-bold text-[#111111] mb-2">
            Don't see your role?
          </h2>

          <p className="text-[13px] sm:text-[14px] text-[#555555] mb-5">
            Send us your CV and we'll reach out when the right
            opportunity arises.
          </p>

          <a
            href="mailto:careers@thepridetimes.com"
            className="pt-subscribe-btn inline-flex items-center justify-center px-6 py-3"
          >
            Send Open Application
          </a>
        </div>

      </div>
    </main>
  );
}
