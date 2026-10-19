import { useEffect } from "react";

export interface AdvertisementSlotProps {
  slot?: string;
  format?: "auto" | "fluid";
  layout?: string;
  layoutKey?: string;
  className?: string;
  minHeight?: number;
  label?: string;
}

export function AdvertisementSlot({
  slot = "5373718974",
  format = "auto",
  layout,
  layoutKey,
  className = "",
  minHeight = 90,
  label = "Advertisement",
}: AdvertisementSlotProps) {
  useEffect(() => {
    try {
      const w = window as Window & {
        adsbygoogle?: unknown[];
      };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // AdSense fallback or blocker
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {label && (
        <div className="mb-1 text-center text-[7px] font-semibold uppercase tracking-[0.18em] text-gray-400">
          {label}
        </div>
      )}
      <div className="w-full overflow-hidden" style={{ minHeight }}>
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minHeight,
          }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={format === "auto" ? "true" : undefined}
          data-ad-layout={layout}
          data-ad-layout-key={layoutKey}
        />
      </div>
    </div>
  );
}

export default AdvertisementSlot;
