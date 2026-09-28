import { useEffect, useRef } from "react";

type AdSlotProps = {
  variant: "first" | "fourth" | "fifth";
  className?: string;
};

/**
 * Google AdSense units used by Innovation, CEO Spotlight and Healthcare.
 * The AdSense library itself is loaded once from index.html.
 */
export function PrideTimesAd({ variant, className = "" }: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    const element = adRef.current;
    if (!element) return;

    // Do not initialize the same <ins> element more than once.
    if (element.getAttribute("data-adsbygoogle-status")) return;

    try {
      const ads = (window as typeof window & { adsbygoogle?: unknown[] }).adsbygoogle || [];
      ads.push({});
    } catch (error) {
      console.warn("AdSense initialization skipped:", error);
    }
  }, []);

  if (variant === "first") {
    return (
      <div
        className={`w-full overflow-hidden border-y border-gray-200 bg-white py-4 ${className}`}
        aria-label="Advertisement"
      >
        <p className="mb-3 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
          Advertisement
        </p>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", minHeight: "120px" }}
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot="6033028012"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  if (variant === "fourth") {
    return (
      <aside
        className={`w-full overflow-hidden border border-gray-200 bg-white p-3 ${className}`}
        aria-label="Advertisement"
      >
        <p className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
          Advertisement
        </p>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", minHeight: "180px" }}
          data-ad-format="fluid"
          data-ad-layout-key="-ef+6k-30-ac+ty"
          data-ad-client="ca-pub-2331501617441941"
          data-ad-slot="5608262547"
        />
      </aside>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden border-y border-gray-200 bg-white py-4 ${className}`}
      aria-label="Advertisement"
    >
      <p className="mb-3 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        Advertisement
      </p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "120px" }}
        data-ad-client="ca-pub-2331501617441941"
        data-ad-slot="6810700989"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
