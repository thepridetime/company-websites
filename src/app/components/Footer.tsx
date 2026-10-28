import { Link } from "react-router";
import logoImg from "../../imports/logo.png";

/* =========================================================
   NAVIGATION ROWS
========================================================= */

const primaryNavRow = [
  { label: "About Us", path: "/about-us" },
  { label: "Contact Us", path: "/contact" },
  { label: "Privacy Policy", path: "/Privacy" },
  { label: "Terms of Use", path: "/Terms" },
  { label: "Cookie Settings", path: "/cookiepolicy" },
  { label: "Accessibility", path: "/accessibility" },
];

const secondaryNavRow = [
  { label: "Advertise", path: "/advertise" },
  { label: "Media Kit", path: "/advertise" },
  { label: "News Tips", path: "/contact" },
  { label: "Careers", path: "/careers" },
  { label: "Reprints & Permissions", path: "/Terms" },
  { label: "Sitemap", path: "/markets" },
];

/* =========================================================
   FOOTER COMPONENT (CENTERED COMPOSITION)
========================================================= */

export function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white">
      {/* =====================================================
          1. BRANDING SECTION (approx 180–220 px high)
          Centered stack: Logo -> Brand Title -> Tagline -> Copyright
      ====================================================== */}
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10">
        <div className="min-h-[180px] sm:min-h-[200px] lg:h-[210px] flex flex-col items-center justify-center text-center py-8 lg:py-0">
          {/* Logo centered above the brand name */}
          <Link
            to="/"
            className="transition-opacity hover:opacity-90 block mb-3 sm:mb-3.5"
            aria-label="The Pride Times Home"
          >
            <img
              src={logoImg}
              alt="The Pride Times logo"
              className="w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] object-contain block mx-auto"
              style={{ width: "64px", height: "64px" }}
            />
          </Link>

          {/* Brand Name: 42–48px (44px), bold serif, PRIDE red (#ED1C24), THE & TIMES white */}
          <Link
            to="/"
            className="pt-footer-brand-title font-serif font-bold tracking-tight whitespace-nowrap leading-none block"
            style={{
              fontFamily: 'Georgia, "Times New Roman", Times, serif',
              fontSize: "44px",
              fontWeight: 700,
              lineHeight: 1,
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            THE{" "}
            <span
              className="pt-brand-accent text-[#ED1C24]"
              style={{ color: "#ED1C24" }}
            >
              PRIDE
            </span>{" "}
            TIMES
          </Link>

          {/* Tagline: centered directly beneath, 12–13px, subtle letter spacing, muted blue-grey #8B9BB3 */}
          <p
            className="mt-2.5 text-[12px] sm:text-[12.5px] font-semibold uppercase tracking-[1.5px] leading-tight text-[#8B9BB3]"
            style={{
              fontSize: "12.5px",
              letterSpacing: "1.5px",
              color: "#8B9BB3",
            }}
          >
            THE GLOBAL VOICE OF INNOVATION, LEADERSHIP &amp; SUCCESS
          </p>

          {/* Copyright: centered beneath tagline, 10–14px vertical spacing, 15–16px, muted blue-grey #8B9BB3 */}
          <p
            className="text-[15px] sm:text-[15.5px] text-[#8B9BB3] leading-none"
            style={{
              fontSize: "15.5px",
              color: "#8B9BB3",
              marginTop: "12px",
            }}
          >
            © 2026 The Pride Times. All rights reserved.
          </p>
        </div>
      </div>

      {/* =====================================================
          2. DIVIDER (Full-width grey line #303030, 1px)
      ====================================================== */}
      <div className="w-full border-t border-[#303030]" />

      {/* =====================================================
          3. NAVIGATION SECTION (approx 130–160 px high)
          - Row 1: 38–48px below divider, 15–16px #E5E7EB, subtle #454545 separators
          - Row 2: 24–30px below row 1, 14–15px #8B9BB3
          - Bottom padding: 30–36px
      ====================================================== */}
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10">
        <div className="pt-[38px] sm:pt-[42px] pb-[32px] sm:pb-[36px] flex flex-col items-center justify-center text-center">
          {/* First Row: 15–16px, light grey/white #E5E7EB, on one line on desktop */}
          <nav
            // className="flex flex-wrap items-center justify-center text-[15px] sm:text-[15.5px] text-[#E5E7EB]"
            className="flex flex-wrap items-center justify-center gap-y-3 text-[13px] sm:gap-0 sm:text-[15.5px] text-[#E5E7EB]"
            aria-label="Primary footer navigation"
          >
            {primaryNavRow.map((link, index) => (
              <div key={link.label} className="inline-flex items-center">
                <Link
                  to={link.path}
                  className="hover:text-[#ED1C24] transition-colors duration-150 whitespace-nowrap px-1 py-0.5"
                  style={{ color: "#E5E7EB", fontSize: "15.5px" }}
                >
                  {link.label}
                </Link>

                {index < primaryNavRow.length - 1 && (
                  <span
                    // className="pt-footer-sep text-[#454545] select-none hidden sm:inline"
                    // style={{ margin: "0 18px", color: "#454545" }}
                    className={`pt-footer-sep mx-1.5 select-none text-[#454545] sm:mx-[18px] ${
                      index % 3 === 2 ? "hidden sm:inline" : "inline"
                    }`}
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </div>
            ))}
          </nav>

          {/* Vertical distance between rows: around 24–30px */}
          <div className="h-[24px] sm:h-[26px]" />

          {/* Second Row: 14–15px, muted blue-grey #8B9BB3 */}
          <nav
            // className="flex flex-wrap items-center justify-center text-[14px] sm:text-[14.5px] text-[#8B9BB3]"
            className="flex flex-wrap items-center justify-center gap-y-3 text-[14px] sm:gap-0 sm:text-[14.5px] text-[#8B9BB3]"
            aria-label="Secondary footer navigation"
          >
            {secondaryNavRow.map((link, index) => (
              <div key={link.label} className="inline-flex items-center">
                <Link
                  to={link.path}
                  className="hover:text-[#ED1C24] transition-colors duration-150 whitespace-nowrap px-1 py-0.5"
                  style={{ color: "#8B9BB3", fontSize: "14.5px" }}
                >
                  {link.label}
                </Link>

                {index < secondaryNavRow.length - 1 && (
                  <span
                    // className="pt-footer-sep text-[#454545] select-none hidden sm:inline"
                    // style={{ margin: "0 18px", color: "#454545" }}
                    className={`pt-footer-sep mx-1.5 select-none text-[#454545] sm:mx-[18px] ${
                      index % 3 === 2 ? "hidden sm:inline" : "inline"
                    }`}
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
