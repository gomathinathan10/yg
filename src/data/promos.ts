import { useEffect, useState } from "react";

export type Promo = {
  code: string;
  label: string;
  description: string;
  /** Percentage off the subtotal (0-100). */
  percentOff?: number | undefined;
  /** Flat amount off the subtotal in ₹. */
  amountOff?: number | undefined;
  /** Minimum subtotal (₹) required for the promo to apply. */
  minSubtotal?: number | undefined;
  /** Makes shipping free regardless of the usual threshold. */
  freeShipping?: boolean | undefined;
  /** Applied automatically once its conditions are met — no code needed. */
  automatic?: boolean | undefined;
  /** Whether the promo is currently enabled. */
  isActive?: boolean | undefined;
};

export const promos: Promo[] = [
  {
    code: "HERITAGE10",
    label: "10% off",
    description: "10% off your order — our 1931 heritage welcome offer.",
    percentOff: 10,
    isActive: true,
  },
  {
    code: "HING50",
    label: "₹50 off",
    description: "₹50 off orders above ₹399.",
    amountOff: 50,
    minSubtotal: 399,
    isActive: true,
  },
  {
    code: "FREESHIP",
    label: "Free shipping",
    description: "Free delivery on any order.",
    freeShipping: true,
    isActive: true,
  },
  {
    code: "BULK15",
    label: "15% off ₹999+",
    description: "Automatic 15% off when your basket crosses ₹999.",
    percentOff: 15,
    minSubtotal: 999,
    automatic: true,
    isActive: true,
  },
];

const PROMOS_STORAGE_KEY = "yg_live_promos";

export function getLivePromos(): Promo[] {
  if (typeof window === "undefined") return promos;
  try {
    const raw = localStorage.getItem(PROMOS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as any[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Map backend or admin input format into clean Promo objects
        return parsed.map((p) => ({
          code: String(p.code || "").toUpperCase(),
          label: p.label || p.code,
          description: p.description || "",
          percentOff: p.percentOff !== undefined ? Number(p.percentOff) : p.percent_off !== undefined && p.percent_off !== null ? Number(p.percent_off) : undefined,
          amountOff: p.amountOff !== undefined ? Number(p.amountOff) : p.amount_off !== undefined && p.amount_off !== null ? Number(p.amount_off) : undefined,
          minSubtotal: p.minSubtotal !== undefined ? Number(p.minSubtotal) : p.min_subtotal !== undefined && p.min_subtotal !== null ? Number(p.min_subtotal) : undefined,
          freeShipping: Boolean(p.freeShipping || p.free_shipping),
          automatic: Boolean(p.automatic),
          isActive: p.isActive !== undefined ? Boolean(p.isActive) : p.is_active !== undefined ? Boolean(p.is_active) : true,
        }));
      }
    }
  } catch (e) {
    console.error("Failed to load live promos:", e);
  }
  return promos;
}

export function saveLivePromos(items: any[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROMOS_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("yg_promos_updated"));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save live promos:", e);
  }
}

export function useLivePromos(): Promo[] {
  const [list, setList] = useState<Promo[]>(() => getLivePromos());

  useEffect(() => {
    setList(getLivePromos());

    const handleUpdate = () => {
      setList(getLivePromos());
    };

    window.addEventListener("yg_promos_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("yg_promos_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return list;
}

export function findPromo(code: string): Promo | undefined {
  const normalized = code.trim().toUpperCase();
  const all = getLivePromos();
  return all.find((p) => p.code === normalized && p.isActive !== false);
}

export function isPromoEligible(promo: Promo, subtotal: number): boolean {
  if (promo.isActive === false) return false;
  return subtotal >= (promo.minSubtotal ?? 0);
}

export function discountFor(promo: Promo, subtotal: number): number {
  if (!isPromoEligible(promo, subtotal)) return 0;
  const pct = promo.percentOff ? (subtotal * promo.percentOff) / 100 : 0;
  const flat = promo.amountOff ?? 0;
  return Math.min(subtotal, Math.round(pct + flat));
}

/** Best automatic promo for a given subtotal, if any. */
export function bestAutomaticPromo(subtotal: number): Promo | undefined {
  const all = getLivePromos();
  return all
    .filter((p) => p.automatic && p.isActive !== false && isPromoEligible(p, subtotal))
    .sort((a, b) => discountFor(b, subtotal) - discountFor(a, subtotal))[0];
}

export type DiscountLine = { label: string; amount: number };

/** Itemised breakdown of what a promo takes off, for display in cart/checkout. */
export function discountBreakdown(
  promo: Promo,
  subtotal: number,
  shippingSaved = 0,
): DiscountLine[] {
  const lines: DiscountLine[] = [];
  if (!isPromoEligible(promo, subtotal)) return lines;
  if (promo.percentOff) {
    lines.push({
      label: `${promo.percentOff}% off items`,
      amount: Math.round((subtotal * promo.percentOff) / 100),
    });
  }
  if (promo.amountOff) {
    lines.push({ label: `₹${promo.amountOff} off order`, amount: promo.amountOff });
  }
  if (promo.freeShipping && shippingSaved > 0) {
    lines.push({ label: "Free shipping", amount: shippingSaved });
  }
  return lines;
}
