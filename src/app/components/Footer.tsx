import { Link } from "react-router";
import {
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import logoImg from "../../imports/logo.png";

/* =========================================================
   X ICON
========================================================= */

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

/* =========================================================
   FACEBOOK ICON
========================================================= */

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.507 17.523 2 12 2S2 6.507 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.459h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialLinks = [
  {
    icon: (s: number) => <FacebookIcon size={s} />,
    href: "https://www.facebook.com/thepridetime",
    label: "Facebook",
  },
  {
    icon: (s: number) => <XIcon size={s} />,
    href: "https://x.com/thepridetime",
    label: "X",
  },
  {
    icon: (s: number) => <Linkedin size={s} />,
    href: "https://www.linkedin.com/company/thepridetimes",
    label: "LinkedIn",
  },
  {
    icon: (s: number) => <Instagram size={s} />,
    href: "https://www.instagram.com/thepridetime/",
    label: "Instagram",
  },
  {
    icon: (s: number) => <Youtube size={s} />,
    href: "https://www.youtube.com/@thepridetime",
    label: "YouTube",
  },
];

/* =========================================================
   FOOTER LINKS
========================================================= */

const footerLinks = [
  {
    label: "Privacy Policy",
    path: "/Privacy",
  },
  {
    label: "Terms of Use",
    path: "/Terms",
  },
  {
    label: "Cookie Settings",
    path: "#",
  },
  {
    label: "Accessibility",
    path: "#",
  },
];

/* =========================================================
   FOOTER
========================================================= */

export function Footer() {
  return (
    <footer className="w-full bg-black text-white">

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">

        <div className="min-h-[150px] flex flex-col md:flex-row items-center md:items-center justify-between gap-8 py-10">

          {/* =================================================
              BRAND
          ================================================= */}

          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0"
          >
            <img
              src={logoImg}
              alt="The Pride Times logo"
              className="h-16 w-16 flex-shrink-0 object-contain opacity-90"
            />

            <div className="flex flex-col items-start">
              {/* Main Logo Text */}
              <div
                className="pt-logo leading-none whitespace-nowrap"
                style={{
                  fontSize: "clamp(1.8rem, 2.6vw, 2.25rem)",
                }}
              >
                THE{" "}
                <span className="pt-logo-accent">
                  PRIDE
                </span>{" "}
                TIMES
              </div>

              {/* Tagline */}
              <p className="mt-2 text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-[0.18em]">
                THE GLOBAL VOICE OF INNOVATION, LEADERSHIP &amp; SUCCESS
              </p>
            </div>
          </Link>

          {/* =================================================
              SOCIAL ICONS
          ================================================== */}

          <div className="flex items-center justify-center gap-6 sm:gap-7">

            {socialLinks.map(
              ({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    text-white
                    hover:text-gray-400
                    transition-colors
                    duration-200
                    flex
                    items-center
                    justify-center
                  "
                >
                  {icon(21)}
                </a>
              )
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          DIVIDER
      ====================================================== */}

      <div className="border-t border-white/10" />

      {/* =====================================================
          COPYRIGHT + LINKS
      ====================================================== */}

      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">

        <div
          className="
            min-h-[62px]
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
            py-4
          "
        >

          {/* =================================================
              COPYRIGHT
          ================================================== */}

          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} The Pride Times. All rights reserved.
          </p>

          {/* =================================================
              FOOTER NAVIGATION
          ================================================== */}

          <nav
            className="
              flex
              flex-wrap
              items-center
              justify-center
              sm:justify-end
              gap-x-7
              gap-y-2
            "
            aria-label="Footer navigation"
          >

            {footerLinks.map((link) => {

              /* External/non-route placeholders */

              if (link.path === "#") {
                return (
                  <button
                    key={link.label}
                    type="button"
                    className="
                      text-xs
                      sm:text-sm
                      text-gray-500
                      hover:text-white
                      transition-colors
                      duration-200
                      whitespace-nowrap
                    "
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className="
                    text-xs
                    sm:text-sm
                    text-gray-500
                    hover:text-white
                    transition-colors
                    duration-200
                    whitespace-nowrap
                  "
                >
                  {link.label}
                </Link>
              );
            })}

          </nav>

        </div>

      </div>

    </footer>
  );
}
