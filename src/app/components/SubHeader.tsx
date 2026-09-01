import { Link, useLocation } from "react-router";

const subNavSections = [
  { label: "Featured", path: "/featured" },
  { label: "Breaking News", path: "/breaking-news" },
  { label: "Business News", path: "/business-news" },
  { label: "Markets", path: "/markets" },
  { label: "International Business", path: "/#" },
  { label: "Startup Success", path: "/#" },
  { label: "CEO Spotlight", path: "/ceospotlight" },
  { label: "Billionaires", path: "/billionaires" },
  { label: "Leadership", path: "/leadership" },
  { label: "Innovation", path: "/innovation" },
];

export function SubHeader() {
  const location = useLocation();
  const fullPath = location.pathname + location.hash;

  return (
    <div className="pt-sub-nav sticky top-0 z-30">
      <div className="pt-container h-full">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide h-full">
          {subNavSections.map((section, i) => (
            <Link
              key={`${section.label}-${i}`}
              to={section.path}
              className={`pt-focusable whitespace-nowrap ${
                fullPath === section.path || (!section.path.includes("#") && location.pathname === section.path)
                  ? "active"
                  : ""
              }`}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}