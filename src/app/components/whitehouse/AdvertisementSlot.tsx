import { PrideTimesAd } from "../AdSenseSlots";

export interface AdvertisementSlotProps {
  className?: string;
  variant?: "first" | "second" | "inArticle";
}

export function AdvertisementSlot({
  className = "",
  variant = "first",
}: AdvertisementSlotProps) {
  return (
    <div className={`w-full ${className}`}>
      <PrideTimesAd variant={variant} />
    </div>
  );
}

export default AdvertisementSlot;
