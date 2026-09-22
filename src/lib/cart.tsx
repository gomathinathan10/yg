import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLiveProducts, type Product, type Variant } from "@/data/products";
import { useLiveMetrics } from "@/data/metrics";
import {
  bestAutomaticPromoIn,
  discountBreakdown,
  discountFor,
  findPromoIn,
  isPromoEligible,
  useLivePromos,
  type DiscountLine,
  type Promo,
} from "@/data/promos";

export type CartLine = {
  slug: string;
  variantId: string;
  qty: number;
};

export type ResolvedLine = CartLine & {
  product: Product;
  variant: Variant;
  lineTotal: number;
};

export type ApplyPromoResult =
  | { ok: true; promo: Promo }
  | { ok: false; reason: string };

type CartContextValue = {
  lines: CartLine[];
  resolved: ResolvedLine[];
  count: number;
  subtotal: number;
  discount: number;
  discountLines: DiscountLine[];
  totalSavings: number;
  shippingSaved: number;
  appliedPromo: Promo | null;
  promoIsAutomatic: boolean;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, variantId: string, qty?: number) => void;
  setQty: (slug: string, variantId: string, qty: number) => void;
  remove: (slug: string, variantId: string) => void;
  clear: () => void;
  applyPromo: (code: string) => ApplyPromoResult;
  removePromo: () => void;
};

const STORAGE_KEY = "yg-cart-v1";
const PROMO_KEY = "yg-promo-v1";
const FREE_SHIPPING = 499;

const CartContext = createContext<CartContextValue | null>(null);


export function CartProvider({ children }: { children: ReactNode }) {
  const products = useLiveProducts();
  const livePromos = useLivePromos();
  const metrics = useLiveMetrics();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
      const savedPromo = window.localStorage.getItem(PROMO_KEY);
      if (savedPromo) setPromoCode(savedPromo.toUpperCase());
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
      if (promoCode) window.localStorage.setItem(PROMO_KEY, promoCode);
      else window.localStorage.removeItem(PROMO_KEY);
    } catch {
      /* ignore */
    }
  }, [lines, promoCode]);


  const add = useCallback((slug: string, variantId: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.variantId === variantId);
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, qty: Math.min(l.qty + qty, 99) } : l,
        );
      }
      return [...prev, { slug, variantId, qty }];
    });
    // The cart drawer stays closed on add; users open it manually from the bottom bar / header.
  }, []);

  const setQty = useCallback((slug: string, variantId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.variantId === variantId))
        : prev.map((l) =>
            l.slug === slug && l.variantId === variantId ? { ...l, qty } : l,
          ),
    );
  }, []);

  const remove = useCallback((slug: string, variantId: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.variantId === variantId)));
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setPromoCode(null);
  }, []);

  const subtotalNow = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const product = products.find((p) => p.slug === line.slug);
        const variant = product?.variants.find((v) => v.id === line.variantId);
        return variant ? sum + variant.price * line.qty : sum;
      }, 0),
    [lines, products],
  );

  const applyPromo = useCallback(
    (code: string): ApplyPromoResult => {
      const promo = findPromoIn(livePromos, code);
      if (!promo) return { ok: false, reason: "That code isn't valid." };
      if (promo.automatic)
        return { ok: false, reason: "This offer applies automatically when eligible." };
      if (!isPromoEligible(promo, subtotalNow))
        return {
          ok: false,
          reason: `Add ₹${(promo.minSubtotal ?? 0) - subtotalNow} more to use ${promo.code}.`,
        };
      setPromoCode(promo.code);
      return { ok: true, promo };
    },
    [subtotalNow, livePromos],
  );

  const removePromo = useCallback(() => setPromoCode(null), []);

  const value = useMemo<CartContextValue>(() => {
    const resolved: ResolvedLine[] = lines.flatMap((line) => {
      const product = products.find((p) => p.slug === line.slug);
      const variant = product?.variants.find((v) => v.id === line.variantId);
      if (!product || !variant) return [];
      return [{ ...line, product, variant, lineTotal: variant.price * line.qty }];
    });
    const subtotal = resolved.reduce((sum, l) => sum + l.lineTotal, 0);

    const manual = promoCode ? findPromoIn(livePromos, promoCode) : undefined;
    const manualValid = manual && isPromoEligible(manual, subtotal) ? manual : undefined;
    const auto = bestAutomaticPromoIn(livePromos, subtotal);
    const manualDiscount = manualValid ? discountFor(manualValid, subtotal) : 0;
    const autoDiscount = auto ? discountFor(auto, subtotal) : 0;

    // Best offer wins: automatic discounts kick in when they beat the entered code.
    const appliedPromo =
      autoDiscount > manualDiscount ? auto! : manualValid ?? (auto ?? null);
    const discount = appliedPromo ? discountFor(appliedPromo, subtotal) : 0;
    const discountedSubtotal = Math.max(0, subtotal - discount);

    const freeThreshold = metrics.freeShippingThreshold || 499;
    const stdFee = metrics.standardDeliveryFee || 50;
    const baseShipping = subtotal === 0 || subtotal >= freeThreshold ? 0 : stdFee;
    const shipping =
      subtotal === 0 || appliedPromo?.freeShipping || discountedSubtotal >= freeThreshold
        ? 0
        : stdFee;
    const shippingSaved = Math.max(0, baseShipping - shipping);
    const discountLines = appliedPromo
      ? discountBreakdown(appliedPromo, subtotal, shippingSaved)
      : [];
    const totalSavings = discount + shippingSaved;

    return {
      lines,
      resolved,
      count: resolved.reduce((sum, l) => sum + l.qty, 0),
      subtotal,
      discount,
      discountLines,
      totalSavings,
      shippingSaved,
      appliedPromo: appliedPromo ?? null,
      promoIsAutomatic: Boolean(appliedPromo?.automatic),
      shipping,
      total: discountedSubtotal + shipping,
      freeShippingThreshold: metrics.freeShippingThreshold || 499,
      isOpen,
      setOpen,
      add,
      setQty,
      remove,
      clear,
      applyPromo,
      removePromo,
    };
  }, [lines, isOpen, add, setQty, remove, clear, promoCode, applyPromo, removePromo, products, metrics, livePromos]);


  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
