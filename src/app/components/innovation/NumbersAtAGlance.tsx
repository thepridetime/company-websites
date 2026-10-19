import { Coins, BarChart3, Cpu, Lightbulb } from "lucide-react";
import {
  defaultInnovationMetrics,
  type InnovationMetric,
} from "../../data/innovationData";

export interface NumbersAtAGlanceProps {
  metrics?: InnovationMetric[];
  date?: string;
  className?: string;
}

export function NumbersAtAGlance({
  metrics = defaultInnovationMetrics,
  date = "7 OCTOBER 2026",
  className = "",
}: NumbersAtAGlanceProps) {
  if (!metrics || metrics.length === 0) {
    return null;
  }

  const renderIcon = (type: InnovationMetric["iconType"]) => {
    switch (type) {
      case "capex":
        return <Coins className="w-5 h-5 text-red-600" strokeWidth={1.8} />;
      case "revenue":
        return <BarChart3 className="w-5 h-5 text-red-600" strokeWidth={1.8} />;
      case "exports":
        return <Cpu className="w-5 h-5 text-red-600" strokeWidth={1.8} />;
      case "funding":
        return <Lightbulb className="w-5 h-5 text-red-600" strokeWidth={1.8} />;
      default:
        return <BarChart3 className="w-5 h-5 text-red-600" strokeWidth={1.8} />;
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2.5">
        <h3 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-red-600">
          Numbers at a Glance
        </h3>
        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
          {date}
        </span>
      </div>

      {/* Metrics list */}
      <div className="divide-y divide-gray-100">
        {metrics.map((item) => (
          <div key={item.id} className="py-3 sm:py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3.5">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                {renderIcon(item.iconType)}
              </div>
              <div className="min-w-0">
                <span className="block font-serif text-[19px] sm:text-[21px] font-bold text-gray-950 leading-tight">
                  {item.value}
                </span>
                <span className="block text-[12px] sm:text-[12.5px] text-gray-500 leading-tight mt-0.5 truncate">
                  {item.label}
                </span>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="block text-[13px] sm:text-[14px] font-bold text-green-600 tabular-nums leading-tight">
                {item.change}
              </span>
              <span className="block text-[10.5px] sm:text-[11px] text-gray-400 leading-tight mt-0.5">
                {item.changePeriod}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NumbersAtAGlance;
