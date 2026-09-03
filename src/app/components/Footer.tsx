import { useState } from "react";
import { Link } from "react-router";
import { Crown, Instagram, Youtube, Linkedin, Sparkle, ChevronUp } from "lucide-react";
import logoImg from "../../imports/logo.png";

const GOLD = "#D4A017";

/* Brand icons not in lucide (X / Pinterest) as tiny inline marks */
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C5.396 0 0 5.396 0 12.017c0 5.086 3.163 9.421 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.09.375-.293 1.194-.333 1.361-.052.221-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378 0 0-.602 2.291-.748 2.853-.271 1.043-1.002 2.35-1.492 3.146 1.124.348 2.317.535 3.554.535 6.621 0 12.017-5.396 12.017-12.017C24.034 5.396 18.638 0 12.017 0z" />
    </svg>
  );
}

const socialLinks = [
  { icon: (s: number) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.507 17.523 2 12 2S2 6.507 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.459h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z"/></svg>, href: "https://www.facebook.com/thepridetime", label: "Facebook" },
  { icon: (s: number) => <Instagram size={s} />, href: "https://www.instagram.com/thepridetime/", label: "Instagram" },
  { icon: (s: number) => <XIcon size={s} />, href: "https://x.com/thepridetime", label: "X" },
  { icon: (s: number) => <Youtube size={s} />, href: "https://www.youtube.com/@thepridetime", label: "YouTube" },
  { icon: (s: number) => <PinterestIcon size={s} />, href: "https://www.pinterest.com/thepridetime/", label: "Pinterest" },
  { icon: (s: number) => <Linkedin size={s} />, href: "https://www.linkedin.com/company/thepridetimes", label: "LinkedIn" },
];

const bottomLinks = [
  { label: "Team", path: "/team" },
  { label: "Privacy Policy", path: "/Privacy" },
  { label: "Terms Of Use", path: "/Terms" },
];

export function Footer() {
  const [cookieDismissed, setCookieDismissed] = useState(false);

  return (
    <footer className="bg-black text-white pt-10 pb-6 relative">
      <div className="max-w-5xl mx-auto px-4">
        {/* Ornamental top rule */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${GOLD}99)` }} />
          <span className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
          <Crown size={22} style={{ color: GOLD }} fill={GOLD} />
          <span className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
          <span className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${GOLD}99)` }} />
        </div>

        {/* Two-column: brand | socials + links */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 mb-2">
          {/* Left: brand */}
          <Link to="/" className="flex items-center gap-5 flex-shrink-0">
            <img src={logoImg} alt="The Pride Times" className="h-14 w-14 sm:h-16 sm:w-16 object-contain flex-shrink-0" />
            <span className="h-14 sm:h-16 w-px" style={{ background: `${GOLD}55` }} />
            <div>
              <div className="pt-logo leading-none" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
                THE <span className="pt-logo-accent">PRIDE</span> TIMES
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-2">
                Voices That Inspire. Stories That Matter.
              </p>
            </div>
          </Link>

          {/* Vertical divider */}
          <span className="hidden lg:block w-px self-stretch" style={{ background: `${GOLD}40` }} />

          {/* Right: socials + links */}
          <div className="relative flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center border rounded-md text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: `${GOLD}88` }}
                >
                  {icon(17)}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              {bottomLinks.map((link, i) => (
                <span key={link.label} className="flex items-center gap-3">
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                  {i < bottomLinks.length - 1 && <span style={{ color: `${GOLD}88` }}>|</span>}
                </span>
              ))}
            </div>

            {/* Sparkle accent */}
            <Sparkle
              size={16}
              className="absolute -bottom-1 -right-6 hidden sm:block"
              style={{ color: `${GOLD}AA` }}
              fill={`${GOLD}55`}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright + cookie notice */}
      <div className="border-t border-white/10 mt-8 pt-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} The Pride Times. All rights reserved.
          </p>

          {!cookieDismissed && (
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Your experience on this site will be improved by allowing cookies.</span>
              <button
                onClick={() => setCookieDismissed(true)}
                className="border rounded-md px-4 py-2 text-white hover:bg-white/5 transition-colors whitespace-nowrap"
                style={{ borderColor: `${GOLD}88` }}
              >
                Allow cookies
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 w-11 h-11 rounded-md flex items-center justify-center text-black shadow-lg hover:brightness-110 transition"
        style={{ background: GOLD }}
      >
        <ChevronUp size={20} />
      </button>
    </footer>
  );
}
