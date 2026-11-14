import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

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
      <div className="w-full my-6 flex flex-col items-center">
        <span className="text-[10px] font-sans font-semibold tracking-[0.2em] text-gray-400 uppercase mb-1.5 select-none">
          Advertisement
        </span>
        <div
          style={{
            minHeight: 100, width: "100%", maxWidth: 1200,
            background: "#f4f4f5", color: "#71717a", border: "1px dashed #d4d4d8",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px"
          }}
        >
          Bloomberg Sponsored Slot
        </div>
      </div>
    );
  }

  return (
    <div className="w-full my-6 flex flex-col items-center">
      <span className="text-[10px] font-sans font-semibold tracking-[0.2em] text-gray-400 uppercase mb-1.5 select-none">
        Advertisement
      </span>
      <div style={{ minHeight: 100, width: "100%", maxWidth: 1200, textAlign: "center" }}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={CLIENT}
          data-ad-slot={s.slot}
          data-ad-format={s.format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

export default function AdSlot({ type }: { type: SlotType }) {
  const { pathname } = useLocation();
  const { user, isLoading } = useAuth();

  // Premium = ad-free. While the account is still loading, show nothing so a
  // Premium user never sees an ad flash up (and no ad request is wasted).
  if (isLoading) return null;
  if (user?.tier === "premium") return null;

  // new key on every page change, so the ad reloads on route change
  return <Inner key={pathname + type} type={type} />;
}