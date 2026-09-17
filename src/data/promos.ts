export type Promo = {
  code: string;
  label: string;
  description: string;
  /** Percentage off the subtotal (0-100). */
  percentOff?: number;
  /** Flat amount off the subtotal in ₹. */
  amountOff?: number;
  /** Minimum subtotal (₹) required for the promo to apply. */
  minSubtotal?: number;
  /** Makes shipping free regardless of the usual threshold. */
  freeShipping?: boolean;
  /** Applied automatically once its conditions are met — no code needed. */
  automatic?: boolean;
};

export const promos: Promo[] = [
  {
    code: "HERITAGE10",
    label: "10% off",
    description: "10% off your order — our 1931 heritage welcome offer.",
    percentOff: 10,
  },
  {
    code: "HING50",
    label: "₹50 off",
    description: "₹50 off orders above ₹399.",
    amountOff: 50,
    minSubtotal: 399,
  },
  {
    code: "FREESHIP",
    label: "Free shipping",
    description: "Free delivery on any order.",
    freeShipping: true,
  },
  {
    code: "BULK15",
    label: "15% off ₹999+",
    description: "Automatic 15% off when your basket crosses ₹999.",
    percentOff: 15,
    minSubtotal: 999,
    automatic: true,
  },
];

export function findPromo(code: string): Promo | undefined {
  const normalized = code.trim().toUpperCase();
  return promos.find((p) => p.code === normalized);
}

export function isPromoEligible(promo: Promo, subtotal: number): boolean {
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
  return promos
    .filter((p) => p.automatic && isPromoEligible(p, subtotal))
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
