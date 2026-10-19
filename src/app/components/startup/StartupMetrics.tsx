import { Coins, Rocket, Users, PieChart } from "lucide-react";
import type { StartupMetric } from "../../data/startupData";

export interface StartupMetricsProps {
  metrics?: StartupMetric[];
  title?: string;
  dateText?: string;
  className?: string;
}

export function StartupMetrics({
  metrics = [],
  title = "STARTUP METRICS",
  dateText = "7 OCTOBER 2026",
  className = "",
}: StartupMetricsProps) {
  if (!metrics || metrics.length === 0) {
    return null;
  }

  const renderIcon = (type: StartupMetric["iconType"]) => {
    switch (type) {
      case "funding":
        return <Coins size={18} className="text-red-600" />;
      case "deals":
        return <Rocket size={18} className="text-red-600" />;
      case "unicorns":
        return <Users size={18} className="text-red-600" />;
      case "deeptech":
        return <PieChart size={18} className="text-red-600" />;
      default:
        return <Coins size={18} className="text-red-600" />;
    }
  };

  return (
    <div className={`py-5 border-b border-gray-200 ${className}`}>
      {/* HEADER */}
      <div className="flex items-center justify-between pb-2 mb-2">
        <h2 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-red-600">
          {title}
        </h2>
        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
          {dateText}
        </span>
      </div>

      {/* METRICS STACK */}
      <div className="divide-y divide-gray-100">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="flex items-center justify-between py-3 hover:bg-gray-50/60 px-1 -mx-1 transition-colors"
          >
            {/* LEFT: ICON + FIGURE & LABEL */}
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {renderIcon(metric.iconType)}
              </div>

              <div className="min-w-0">
                <div className="font-serif font-bold text-[19px] sm:text-[21px] text-gray-900 leading-tight">
                  {metric.value}
                </div>
                <div className="text-[12px] sm:text-[12.5px] text-gray-500 leading-snug">
                  {metric.label}
                </div>
              </div>
            </div>

            {/* RIGHT: TREND / COMPARISON */}
            <div className="shrink-0 text-right">
              <div className="text-[13px] sm:text-[14px] font-bold text-green-600">
                {metric.change}
              </div>
              <div className="text-[10.5px] sm:text-[11px] text-gray-400">
                {metric.changePeriod}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StartupMetrics;
