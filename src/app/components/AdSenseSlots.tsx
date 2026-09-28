import { useEffect, useRef } from "react";

type AdVariant =
  | "first"
  | "second"
  | "third"
  | "fourth"
  | "fifth";

type AdSlotConfig = {
  slot: string;
  format?: "auto" | "fluid";
  layout?: string;
  layoutKey?: string;
  fullWidthResponsive?: boolean;
};

type AdSlotProps = {
  variant: AdVariant;
  className?: string;
};

/* =========================================================
   PRIDE TIMES ADSENSE CONFIGURATION
========================================================= */

const ADSENSE_CLIENT = "ca-pub-2331501617441941";

const AD_CONFIG: Record<AdVariant, AdSlotConfig> = {
  first: {
    slot: "6033028012",
    format: "auto",
    fullWidthResponsive: true,
  },

  second: {
    slot: "5373718974",
    format: "auto",
    fullWidthResponsive: true,
  },

  third: {
    slot: "8042854193",
    format: "fluid",
    layout: "in-article",
  },

  fourth: {
    slot: "5608262547",
    format: "fluid",
    layoutKey: "-ef+6k-30-ac+ty",
  },

  fifth: {
    slot: "6810700989",
    format: "auto",
    fullWidthResponsive: true,
  },
};

/* =========================================================
   GLOBAL ADSENSE INITIALIZATION
========================================================= */

function pushAd() {
  try {
    const windowWithAds =
      window as typeof window & {
        adsbygoogle?: unknown[];
      };

    windowWithAds.adsbygoogle =
      windowWithAds.adsbygoogle || [];

    windowWithAds.adsbygoogle.push({});
  } catch (error) {
    console.warn(
      "Google AdSense initialization failed:",
      error
    );
  }
}

/* =========================================================
   SINGLE ADSENSE UNIT
========================================================= */

export function PrideTimesAd({
  variant,
  className = "",
}: AdSlotProps) {
  const adRef =
    useRef<HTMLModElement | null>(null);

  const initializedRef = useRef(false);

  const config = AD_CONFIG[variant];

  useEffect(() => {
    const element = adRef.current;

    if (!element) {
      return;
    }

    /*
      React can render the component more than once.

      Google AdSense does NOT allow the same <ins>
      element to be initialized multiple times.

      Therefore we maintain our own initialization flag.
    */

    if (initializedRef.current) {
      return;
    }

    /*
      AdSense also places this attribute on an
      initialized <ins> element.

      Check it as an additional safety mechanism.
    */

    if (
      element.getAttribute(
        "data-adsbygoogle-status"
      )
    ) {
      initializedRef.current = true;
      return;
    }

    /*
      Wait one frame.

      This is important when React has just mounted
      the <ins> element and the AdSense script is
      already present in index.html.
    */

    const frame = window.requestAnimationFrame(() => {
      try {
        const windowWithAds =
          window as typeof window & {
            adsbygoogle?: unknown[];
          };

        windowWithAds.adsbygoogle =
          windowWithAds.adsbygoogle || [];

        windowWithAds.adsbygoogle.push({});

        initializedRef.current = true;
      } catch (error) {
        console.warn(
          "AdSense initialization skipped:",
          error
        );
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  /* =======================================================
     COMMON AD STYLE
  ======================================================= */

  const adStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
  };

  /* =======================================================
     IN-ARTICLE FLUID AD
  ======================================================= */

  if (variant === "third") {
    return (
      <div
        className={`w-full overflow-hidden bg-white ${className}`}
        aria-label="Advertisement"
      >
        <div className="mb-2 text-center">
          <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Advertisement
          </span>
        </div>

        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            ...adStyle,
            minHeight: "120px",
            textAlign: "center",
          }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={config.slot}
        />
      </div>
    );
  }

  /* =======================================================
     FOURTH FLUID AD
  ======================================================= */

  if (variant === "fourth") {
    return (
      <aside
        className={`w-full overflow-hidden border border-gray-200 bg-white p-3 ${className}`}
        aria-label="Advertisement"
      >
        <div className="mb-2 text-center">
          <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Advertisement
          </span>
        </div>

        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            ...adStyle,
            minHeight: "180px",
          }}
          data-ad-format="fluid"
          data-ad-layout-key={
            config.layoutKey
          }
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={config.slot}
        />
      </aside>
    );
  }

  /* =======================================================
     STANDARD RESPONSIVE ADS
  ======================================================= */

  return (
    <div
      className={`w-full overflow-hidden border-y border-gray-200 bg-white py-4 ${className}`}
      aria-label="Advertisement"
    >
      <div className="mb-3 text-center">
        <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-400">
          Advertisement
        </span>
      </div>

      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          ...adStyle,
          minHeight: "90px",
        }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={config.slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

/* =========================================================
   OPTIONAL NAMED COMPONENTS
========================================================= */

export function PrideTimesFirstAd({
  className = "",
}: {
  className?: string;
}) {
  return (
    <PrideTimesAd
      variant="first"
      className={className}
    />
  );
}

export function PrideTimesSecondAd({
  className = "",
}: {
  className?: string;
}) {
  return (
    <PrideTimesAd
      variant="second"
      className={className}
    />
  );
}

export function PrideTimesThirdAd({
  className = "",
}: {
  className?: string;
}) {
  return (
    <PrideTimesAd
      variant="third"
      className={className}
    />
  );
}

export function PrideTimesFourthAd({
  className = "",
}: {
  className?: string;
}) {
  return (
    <PrideTimesAd
      variant="fourth"
      className={className}
    />
  );
}

export function PrideTimesFifthAd({
  className = "",
}: {
  className?: string;
}) {
  return (
    <PrideTimesAd
      variant="fifth"
      className={className}
    />
  );
}
