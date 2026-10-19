import { Link } from "react-router";
import { ArrowRight, Cpu, Bot, Atom, Zap, Sparkles } from "lucide-react";
import type { FundedCompany } from "../../data/startupData";

export interface FundingWatchProps {
  companies?: FundedCompany[];
  title?: string;
  viewMoreUrl?: string;
  className?: string;
}

export function FundingWatch({
  companies = [],
  title = "FUNDING WATCH",
  viewMoreUrl = "/markets",
  className = "",
}: FundingWatchProps) {
  if (!companies || companies.length === 0) {
    return (
      <div className={`pt-6 pb-4 ${className}`}>
        <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-red-600">
            {title}
          </h2>
        </div>
        <p className="text-[11px] text-gray-400 py-3 text-center">
          No funding rounds recorded today.
        </p>
      </div>
    );
  }

  const renderIcon = (type: FundedCompany["iconType"]) => {
    switch (type) {
      case "star":
      case "chip":
        return <Sparkles size={16} className="text-white" />;
      case "robot":
        return <Bot size={16} className="text-white" />;
      case "quantum":
        return <Atom size={16} className="text-white" />;
      case "battery":
      case "leaf":
        return <Zap size={16} className="text-emerald-400" />;
      default:
        return <Cpu size={16} className="text-white" />;
    }
  };

  return (
    <section className={`pt-6 ${className}`}>
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-red-600">
          {title}
        </h2>

        {viewMoreUrl && (
          <Link
            to={viewMoreUrl}
            className="group flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
          >
            <span>View More</span>
            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* FUNDED COMPANIES LIST */}
      <div className="divide-y divide-gray-100">
        {companies.map((company) => {
          const destination = company.url || "/markets";

          return (
            <Link
              key={company.id}
              to={destination}
              className="group flex items-center justify-between py-3 sm:py-3.5 hover:bg-gray-50/70 px-1 -mx-1 transition-colors"
            >
              {/* LEFT: ICON + NAME & FOCUS */}
              <div className="flex items-center gap-3 min-w-0 pr-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black flex items-center justify-center shrink-0 rounded-none border border-gray-800">
                  {renderIcon(company.iconType)}
                </div>

                <div className="min-w-0">
                  <h4 className="font-bold text-[13px] sm:text-[14px] text-gray-900 leading-snug group-hover:text-red-600 transition-colors truncate">
                    {company.name}
                  </h4>
                  <p className="text-[11px] sm:text-[12px] text-gray-500 leading-tight truncate">
                    {company.focus}
                  </p>
                </div>
              </div>

              {/* RIGHT: FUNDING AMOUNT & ROUND */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-right">
                <div>
                  <div className="font-serif font-bold text-[16px] sm:text-[18px] text-gray-900 leading-tight">
                    {company.amount}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                    {company.round}
                  </div>
                </div>

                <ArrowRight
                  size={14}
                  className="text-red-600 transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default FundingWatch;
