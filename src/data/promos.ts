import { useEffect, useState } from "react";
import { getPromosServerFn, type DbPromo } from "@/functions/promos";

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

/** Bundled fallback, used only as a seed and if the live fetch fails. */
export const promos: Promo[] = [
  {
    code: "HERITAGE10",
    label: "10% off",
    description: "10% off your order — our 1932 heritage welcome offer.",
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

function dbPromoToPromo(p: DbPromo): Promo {
  return {
    code: p.code,
    label: p.label,
    description: p.description,
    percentOff: p.percent_off ?? undefined,
    amountOff: p.amount_off ?? undefined,
    minSubtotal: p.min_subtotal ?? undefined,
    freeShipping: p.free_shipping === 1,
    automatic: p.automatic === 1,
    isActive: p.is_active === 1,
  };
}

/**
 * Fetches the real, admin-managed active promo codes from the server so
 * checkout always reflects whatever an administrator has saved — for every
 * visitor, not just the browser that made the edit. Falls back to the
 * bundled list if the request fails.
 */
export async function getLivePromos(): Promise<Promo[]> {
  try {
    const dbPromos = await getPromosServerFn();
    if (Array.isArray(dbPromos) && dbPromos.length > 0) {
      return dbPromos.map(dbPromoToPromo);
    }
    return promos;
  } catch (e) {
    console.error("Failed to load live promos, falling back to bundled list:", e);
    return promos;
  }
}

/**
 * Reactive React hook for the live promo list. Re-fetches on mount and
 * whenever a "yg_products_updated"-style "yg_promos_updated" event fires
 * (dispatched by the Admin Portal right after a promo save/toggle/delete).
 */
export function useLivePromos(): Promo[] {
  const [list, setList] = useState<Promo[]>(promos);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      getLivePromos().then((data) => {
        if (!cancelled) setList(data);
      });
    };
    load();

    window.addEventListener("yg_promos_updated", load);
    return () => {
      cancelled = true;
      window.removeEventListener("yg_promos_updated", load);
    };
  }, []);

  return list;
}

export function findPromoIn(list: Promo[], code: string): Promo | undefined {
  const normalized = code.trim().toUpperCase();
  return list.find((p) => p.code === normalized && p.isActive !== false);
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
export function bestAutomaticPromoIn(list: Promo[], subtotal: number): Promo | undefined {
  return list
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
