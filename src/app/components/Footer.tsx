import React from "react";
import { Link } from "react-router";
import logoImg from "../../imports/logo.png";

/* =========================================================
   NAVIGATION ROWS
========================================================= */

const primaryNavRow = [
  { label: "About Us", path: "/about-us" },
  { label: "Contact Us", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
  { label: "News Disclaimer & Copyright", path: "/disclaimer" },
  { label: "Cookie Settings", path: "/cookiepolicy" },
  { label: "Accessibility", path: "/accessibility" },
];

const secondaryNavRow = [
  { label: "Advertise", path: "/advertise" },
  { label: "Media Kit", path: "/advertise#media-kit" },
  { label: "News Tips", path: "/contact#news-tips" },
  { label: "Careers", path: "/careers" },
  { label: "Reprints & Permissions", path: "/disclaimer#permissions" },
  { label: "Sitemap", path: "/sitemap" },
];

/* =========================================================
   FOOTER COMPONENT (CENTERED COMPOSITION)
========================================================= */

export function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white">
      {/* =====================================================
          1. BRANDING SECTION
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

          {/* Brand Name */}
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

          {/* Tagline */}
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

          {/* Copyright */}
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
          2. DIVIDER
      ====================================================== */}
      <div className="w-full border-t border-[#303030]" />

      {/* =====================================================
          3. NAVIGATION SECTION
      ====================================================== */}
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10">
        <div className="pt-[38px] sm:pt-[42px] pb-[32px] sm:pb-[36px] flex flex-col items-center justify-center text-center">
          {/* First Row */}
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

          <div className="h-[24px] sm:h-[26px]" />

          {/* Second Row */}
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

export default Footer;
