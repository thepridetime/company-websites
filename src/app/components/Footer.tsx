import { Link } from "react-router";
import {
  Crown,
  Instagram,
  Youtube,
  Linkedin,
  ChevronUp,
} from "lucide-react";

import logoImg from "../../imports/logo.png";

const GOLD = "#D4A017";

/* X Icon */
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* Pinterest Icon */
function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.017 0C5.396 0 0 5.396 0 12.017c0 5.086 3.163 9.421 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.09.375-.293 1.194-.333 1.361-.052.221-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378 0 0-.602 2.291-.748 2.853-.271 1.043-1.002 2.35-1.492 3.146 1.124.348 2.317.535 3.554.535 6.621 0 12.017-5.396 12.017-12.017C24.034 5.396 18.638 0 12.017 0z" />
    </svg>
  );
}

/* Social Links */
const socialLinks = [
  {
    icon: (s: number) => (
      <svg
        width={s}
        height={s}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22 12.06C22 6.507 17.523 2 12 2S2 6.507 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.459h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
      </svg>
    ),
    href: "https://www.facebook.com/thepridetime",
    label: "Facebook",
  },
  {
    icon: (s: number) => <Instagram size={s} />,
    href: "https://www.instagram.com/thepridetime/",
    label: "Instagram",
  },
  {
    icon: (s: number) => <XIcon size={s} />,
    href: "https://x.com/thepridetime",
    label: "X",
  },
  {
    icon: (s: number) => <Youtube size={s} />,
    href: "https://www.youtube.com/@thepridetime",
    label: "YouTube",
  },
  {
    icon: (s: number) => <PinterestIcon size={s} />,
    href: "https://www.pinterest.com/thepridetime/",
    label: "Pinterest",
  },
  {
    icon: (s: number) => <Linkedin size={s} />,
    href: "https://www.linkedin.com/company/thepridetimes",
    label: "LinkedIn",
  },
];

/* Footer Navigation Links */
const bottomLinks = [
  {
    label: "Team",
    path: "/team",
  },
  {
    label: "Privacy Policy",
    path: "/Privacy",
  },
  {
    label: "Terms Of Use",
    path: "/Terms",
  },
];

export function Footer() {
  return (
    <footer className="bg-black text-white pt-8 sm:pt-10 pb-5 relative overflow-hidden">

      {/* =========================================
          MAIN FOOTER CONTAINER
      ========================================== */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================================
            ORNAMENTAL TOP LINE
        ========================================== */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">

          {/* Left Line */}
          <span
            className="h-px flex-1 max-w-[180px] sm:max-w-none"
            style={{
              background: `linear-gradient(
                to right,
                transparent,
                ${GOLD}99
              )`,
            }}
          />

          {/* Left Diamond */}
          <span
            className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
            style={{
              background: GOLD,
            }}
          />

          {/* Crown */}
          <Crown
            size={20}
            className="sm:w-[22px] sm:h-[22px] flex-shrink-0"
            style={{
              color: GOLD,
            }}
            fill={GOLD}
          />

          {/* Right Diamond */}
          <span
            className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
            style={{
              background: GOLD,
            }}
          />

          {/* Right Line */}
          <span
            className="h-px flex-1 max-w-[180px] sm:max-w-none"
            style={{
              background: `linear-gradient(
                to left,
                transparent,
                ${GOLD}99
              )`,
            }}
          />
        </div>

        {/* =========================================
            MAIN FOOTER CONTENT
        ========================================== */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            lg:items-center
            justify-between
            gap-8
            md:gap-10
            lg:gap-12
            xl:gap-20
            mb-2
            w-full
          "
        >

          {/* =====================================
              BRAND SECTION
          ====================================== */}
          <Link
            to="/"
            className="
              flex
              items-center
              justify-center
              lg:justify-start
              gap-4
              sm:gap-5
              md:gap-6
              flex-shrink-0
              w-full
              lg:w-auto
              min-w-0
            "
          >

            {/* Logo */}
            <img
              src={logoImg}
              alt="The Pride Times"
              className="
                h-12
                w-12
                sm:h-14
                sm:w-14
                md:h-16
                md:w-16
                object-contain
                flex-shrink-0
              "
            />

            {/* Gold Divider */}
            <span
              className="
                h-12
                sm:h-14
                md:h-16
                w-px
                flex-shrink-0
              "
              style={{
                background: `${GOLD}55`,
              }}
            />

            {/* Brand Text */}
            <div className="min-w-0 text-left">

              <div
                className="
                  pt-logo
                  leading-none
                  whitespace-nowrap
                  text-[1.35rem]
                  xs:text-[1.5rem]
                  sm:text-[1.75rem]
                  md:text-[2rem]
                  lg:text-[2.25rem]
                  xl:text-[2.75rem]
                "
              >
                THE{" "}
                <span className="pt-logo-accent">
                  PRIDE
                </span>{" "}
                TIMES
              </div>

              <p
                className="
                  text-[8px]
                  xs:text-[9px]
                  sm:text-[10px]
                  md:text-xs
                  text-gray-400
                  uppercase
                  tracking-[0.12em]
                  sm:tracking-widest
                  mt-1.5
                  sm:mt-2
                  whitespace-nowrap
                "
              >
                Voices That Inspire. Stories That Matter.
              </p>

            </div>
          </Link>

          {/* =====================================
              GOLDEN VERTICAL DIVIDER
          ====================================== */}
          <span
            className="
              hidden
              lg:block
              w-px
              self-stretch
              min-h-[80px]
              flex-shrink-0
            "
            style={{
              background: `linear-gradient(
                to bottom,
                transparent,
                ${GOLD}70,
                transparent
              )`,
            }}
          />

          {/* =====================================
              RIGHT SECTION
          ====================================== */}
          <div
            className="
              flex
              flex-col
              items-center
              lg:items-end
              gap-4
              sm:gap-5
              w-full
              lg:w-auto
              min-w-0
            "
          >

            {/* =================================
                SOCIAL MEDIA BUTTONS
            ================================== */}
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                lg:justify-end
                gap-2
                sm:gap-2.5
                md:gap-3
                w-full
              "
            >
              {socialLinks.map(
                ({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-9
                      h-9
                      sm:w-10
                      sm:h-10
                      md:w-11
                      md:h-11
                      flex
                      items-center
                      justify-center
                      border
                      rounded-md
                      text-white
                      transition-all
                      duration-200
                      hover:text-[#D4A017]
                      hover:-translate-y-0.5
                      hover:bg-white/5
                    "
                    style={{
                      borderColor: `${GOLD}88`,
                    }}
                  >
                    {icon(16)}
                  </a>
                )
              )}
            </div>

            {/* =================================
                FOOTER NAVIGATION LINKS
            ================================== */}
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                lg:justify-end
                gap-x-2
                sm:gap-x-3
                gap-y-2
                text-xs
                sm:text-sm
                text-gray-300
                text-center
              "
            >
              {bottomLinks.map((link, i) => (

                <span
                  key={link.label}
                  className="flex items-center gap-2 sm:gap-3"
                >

                  <Link
                    to={link.path}
                    className="
                      inline-block
                      transition-colors
                      duration-200
                      hover:text-[#D4A017]
                      whitespace-nowrap
                    "
                  >
                    {link.label}
                  </Link>

                  {/* Separator */}
                  {i < bottomLinks.length - 1 && (
                    <span
                      style={{
                        color: `${GOLD}88`,
                      }}
                    >
                      |
                    </span>
                  )}

                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* =========================================
          COPYRIGHT BAR
      ========================================== */}
      <div className="border-t border-white/10 mt-7 sm:mt-8 pt-4">

        <div
          className="
            max-w-6xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            flex
            items-center
            justify-center
            text-center
          "
        >

          <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
            © {new Date().getFullYear()} The Pride Times.
            All rights reserved.
          </p>

        </div>
      </div>

      {/* =========================================
          BACK TO TOP BUTTON
      ========================================== */}
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Back to top"
        className="
          fixed
          bottom-4
          right-4
          sm:bottom-5
          sm:right-5
          md:bottom-6
          md:right-6
          w-9
          h-9
          sm:w-10
          sm:h-10
          md:w-11
          md:h-11
          rounded-md
          flex
          items-center
          justify-center
          text-black
          shadow-lg
          transition-all
          duration-200
          hover:scale-105
        "
        style={{
          background: GOLD,
        }}
      >
        <ChevronUp size={18} className="sm:w-5 sm:h-5" />
      </button>

    </footer>
  );
}
