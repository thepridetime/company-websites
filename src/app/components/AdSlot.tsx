import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const CLIENT = "ca-pub-2331501617441941";
const DEMO =
  (import.meta as ImportMeta & { env?: { VITE_AD_DEMO?: string } }).env?.VITE_AD_DEMO === "true";

const SLOTS = {
  top: { slot: "6033028012", format: "auto" },
  bottom: { slot: "5373718974", format: "auto" },
} as const;

type SlotType = keyof typeof SLOTS;

function Inner({ type }: { type: SlotType }) {
  const pushed = useRef(false);
  const s = SLOTS[type];

  useEffect(() => {
    if (DEMO || pushed.current) return;
    pushed.current = true;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  if (DEMO) {
    return (
      <div
        style={{
          minHeight: 100, margin: "16px auto", maxWidth: 1200,
          background: "#eee", color: "#666", border: "1px dashed #aaa",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        Ad space
      </div>
    );
  }

  return (
    <div style={{ minHeight: 100, margin: "16px auto", maxWidth: 1200, textAlign: "center" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={CLIENT}
        data-ad-slot={s.slot}
        data-ad-format={s.format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default function AdSlot({ type }: { type: SlotType }) {
  const { pathname } = useLocation();
  // new key on every page change, so the ad reloads on route change
  return <Inner key={pathname + type} type={type} />;
}