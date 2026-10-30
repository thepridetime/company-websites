import type { WhiteHouseKeyFact } from "../../data/whiteHouseData";

export interface WhiteHouseKeyFiguresProps {
  facts?: WhiteHouseKeyFact[];
  storyCount?: number;
  title?: string;
  className?: string;
}

export function WhiteHouseKeyFigures({
  facts = [],
  storyCount = 0,
  title = "Key Figures",
  className = "",
}: WhiteHouseKeyFiguresProps) {
  if (!facts || facts.length === 0) {
    return null;
  }

  return (
    <div className={`pb-5 border-b border-gray-200 ${className}`}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-lg font-bold">{title}</h2>

        <span className="border border-gray-300 rounded-full px-3 py-1 text-[9px] font-medium">
          {storyCount} stories
        </span>
      </div>

      {/* FACT ROWS */}
      <div className="divide-y divide-gray-100">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="py-2 flex items-start justify-between gap-3"
          >
            <span className="text-[10px] font-semibold text-gray-800">
              {fact.label}
            </span>

            <span className="text-[10px] text-gray-500 text-right tabular-nums">
              {fact.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhiteHouseKeyFigures;
