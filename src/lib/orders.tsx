import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiFetch } from "@/lib/api-client";

export type Address = {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  line1: string;
  city: string;
  state: string;
  pin: string;
  phone: string;
  isDefault?: boolean;
};

export type Profile = {
  name: string;
  email: string;
  phone: string;
};

export type OrderItem = {
  slug: string;
  variantId: string;
  name: string;
  variantLabel: string;
  image: string;
  qty: number;
  price: number;
};

export type OrderTotals = {
  subtotal: number;
  discount: number;
  shipping: number;
  giftWrap: number;
  codFee: number;
  total: number;
};

export type Resolution = {
  /** cancellation = stopped before dispatch, refund = requested after delivery/dispatch */
  type: "cancellation" | "refund";
  status: "cancelled" | "refund_requested" | "refunded";
  reason: string;
  note?: string | undefined;
  requestedAt: number;
  /** amount credited back to the customer */
  amount: number;
  /** expected date the refund lands in the source account */
  refundBy: number;
  method: string;
};

export type Order = {
  id: string;
  createdAt: number;
  email: string;
  phone: string;
  items: OrderItem[];
  totals: OrderTotals;
  promoCode?: string | null | undefined;
  address: Address;
  payment: string;
  delivery: "standard" | "express";
  status?: string | undefined;
  notes?: string | undefined;
  gift: boolean;
  giftMessage?: string | undefined;
  resolution?: Resolution | null | undefined;
};

export const CANCEL_REASONS = [
  "Ordered by mistake",
  "Found a better price",
  "Delivery is taking too long",
  "Want to change the address or variant",
  "Other reason",
];

export const REFUND_REASONS = [
  "Package arrived damaged",
  "Wrong item or variant delivered",
  "Seal broken / quality concern",
  "Item never arrived",
  "Other reason",
];

export type TrackingStep = {
  key: string;
  label: string;
  description: string;
  at: number;
  done: boolean;
};

const PROFILE_KEY = "yg-profile-v1";
const ADDRESS_KEY = "yg-addresses-v1";
const ORDERS_KEY = "yg-orders-v1";

const HOUR = 60 * 60 * 1000;

/** Deterministic tracking timeline derived from order time + delivery speed. */
export function trackingSteps(order: Order, now = Date.now()): TrackingStep[] {
  const fast = order.delivery === "express";
  const offsets: Array<[string, string, string, number]> = [
    ["placed", "Order placed", "We received your order and payment details.", 0],
    ["packed", "Packed in Tirunelveli", "Sealed fresh from our 1932 works.", fast ? 3 : 8],
    ["shipped", "Shipped", "Handed to our courier partner.", fast ? 8 : 24],
    ["out", "Out for delivery", "Arriving with you today.", fast ? 30 : 84],
    ["delivered", "Delivered", "Enjoy your hing.", fast ? 40 : 110],
  ];
  return offsets.map(([key, label, description, hours]) => {
    const at = order.createdAt + hours * HOUR;
    return { key, label, description, at, done: now >= at };
  });
}

export function currentStatus(order: Order, now = Date.now()): TrackingStep {
  if (order.resolution) {
    const r = order.resolution;
    const label =
      r.status === "cancelled" ? "Cancelled" : r.status === "refunded" ? "Refunded" : "Refund requested";
    return {
      key: r.status,
      label,
      description:
        r.status === "cancelled"
          ? "This order was cancelled before dispatch."
          : "Our team is reviewing your refund request.",
      at: r.requestedAt,
      done: true,
    };
  }
  const steps = trackingSteps(order, now);
  const done = steps.filter((s) => s.done);
  return done[done.length - 1] ?? steps[0]!;
}

const REFUND_WINDOW_DAYS = 7;

export type Eligibility = {
  canCancel: boolean;
  canRefund: boolean;
  reason: string;
  refundAmount: number;
};

/** Cancel until dispatch; request a refund from dispatch until 7 days after delivery. */
export function resolutionEligibility(order: Order, now = Date.now()): Eligibility {
  const steps = trackingSteps(order, now);
  const shipped = steps.find((s) => s.key === "shipped")!.done;
  const delivered = steps.find((s) => s.key === "delivered")!.done;
  const deliveredAt = steps.find((s) => s.key === "delivered")!.at;
  const windowOpen = now <= deliveredAt + REFUND_WINDOW_DAYS * 24 * HOUR;
  // COD orders are not pre-paid, so a cancellation returns nothing.
  const refundAmount = order.payment === "cod" ? 0 : order.totals.total;

  if (order.resolution) {
    return {
      canCancel: false,
      canRefund: false,
      reason:
        order.resolution.type === "cancellation"
          ? "This order is already cancelled."
          : "A refund request is already open for this order.",
      refundAmount,
    };
  }
  if (!shipped) {
    return { canCancel: true, canRefund: false, reason: "Free cancellation until dispatch.", refundAmount };
  }
  if (windowOpen) {
    return {
      canCancel: false,
      canRefund: true,
      reason: delivered
        ? `Refund requests accepted within ${REFUND_WINDOW_DAYS} days of delivery.`
        : "Order already dispatched — you can raise a refund request instead.",
      refundAmount,
    };
  }
  return {
    canCancel: false,
    canRefund: false,
    reason: `The ${REFUND_WINDOW_DAYS}-day refund window for this order has closed. Contact support for help.`,
    refundAmount,
  };
}

export const RESOLUTION_POLICY = {
  refundWindowDays: REFUND_WINDOW_DAYS,
  cancelRefundDays: 3,
  refundRefundDays: 7,
  reviewHours: 24,
};

export type PolicyRule = {
  label: string;
  detail: string;
  state: "pass" | "fail" | "info";
};

/**
 * The exact rules that decide cancellation/refund eligibility, evaluated against this order
 * so the customer can see *why* an action is or isn't available.
 */
export function resolutionRules(order: Order, now = Date.now()): PolicyRule[] {
  const steps = trackingSteps(order, now);
  const shippedStep = steps.find((s) => s.key === "shipped")!;
  const deliveredStep = steps.find((s) => s.key === "delivered")!;
  const windowEnds = deliveredStep.at + REFUND_WINDOW_DAYS * 24 * HOUR;
  const d = (t: number) =>
    new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const rules: PolicyRule[] = [
    {
      label: "Cancel free until dispatch",
      detail: shippedStep.done
        ? `Dispatched on ${d(shippedStep.at)} — cancellation is closed for this order.`
        : `Not dispatched yet. You can cancel at no cost until roughly ${d(shippedStep.at)}.`,
      state: shippedStep.done ? "fail" : "pass",
    },
    {
      label: `Refunds within ${REFUND_WINDOW_DAYS} days of delivery`,
      detail: !shippedStep.done
        ? "Opens once the parcel is dispatched — until then, cancel instead."
        : now <= windowEnds
          ? `Window open until ${d(windowEnds)}.`
          : `Window closed on ${d(windowEnds)}. Our support team can still review exceptions.`,
      state: !shippedStep.done ? "info" : now <= windowEnds ? "pass" : "fail",
    },
    {
      label: "One open request per order",
      detail: order.resolution
        ? `A ${order.resolution.type === "cancellation" ? "cancellation" : "refund request"} was already raised on ${d(order.resolution.requestedAt)}.`
        : "No request raised yet on this order.",
      state: order.resolution ? "fail" : "pass",
    },
    {
      label: "How the money comes back",
      detail:
        order.payment === "cod"
          ? "Cash on delivery is not pre-paid, so a cancellation simply stops the parcel. A post-delivery refund is paid by bank transfer."
          : `${refundMethodLabel(order.payment)} — within ${RESOLUTION_POLICY.cancelRefundDays} working days for cancellations, ${RESOLUTION_POLICY.refundRefundDays} for approved refunds.`,
      state: "info",
    },
    {
      label: "Review time",
      detail: `Refund requests are reviewed by our Tirunelveli team within ${RESOLUTION_POLICY.reviewHours} hours. Cancellations apply instantly.`,
      state: "info",
    },
  ];
  return rules;
}

export function refundMethodLabel(payment: string): string {

  if (payment === "cod") return "Bank transfer to your registered account";
  if (payment === "upi") return "Original UPI account";
  if (payment === "card") return "Original card";
  if (payment === "netbanking") return "Original bank account";
  return "Original Paytm payment method";
}

export function estimatedDelivery(order: Order): number {
  return trackingSteps(order).at(-1)!.at;
}

type OrdersContextValue = {
  profile: Profile | null;
  signIn: (profile: Profile) => void;
  signOut: () => void;
  addresses: Address[];
  saveAddress: (address: Omit<Address, "id"> & { id?: string }) => Address;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  orders: Order[];
  placeOrder: (order: Omit<Order, "id" | "createdAt">) => Promise<Order>;
  getOrder: (id: string) => Order | undefined;
  fetchOrder: (id: string, verify?: string) => Promise<Order | null>;
  cancelOrder: (id: string, reason: string, note?: string) => Promise<Resolution | null>;
  requestRefund: (id: string, reason: string, note?: string) => Promise<Resolution | null>;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfile(read<Profile | null>(PROFILE_KEY, null));
    setAddresses(read<Address[]>(ADDRESS_KEY, []));
    setOrders(read<Order[]>(ORDERS_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (profile) window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      else window.localStorage.removeItem(PROFILE_KEY);
      window.localStorage.setItem(ADDRESS_KEY, JSON.stringify(addresses));
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      /* ignore */
    }
  }, [profile, addresses, orders, hydrated]);

  const saveAddress = useCallback((input: Omit<Address, "id"> & { id?: string }) => {
    const id = input.id ?? `addr_${Math.random().toString(36).slice(2, 9)}`;
    const address: Address = { ...input, id };
    setAddresses((prev) => {
      const next = prev.some((a) => a.id === id)
        ? prev.map((a) => (a.id === id ? address : a))
        : [...prev, address];
      return address.isDefault
        ? next.map((a) => ({ ...a, isDefault: a.id === id }))
        : next;
    });
    return address;
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }, []);

  const placeOrder = useCallback(async (input: Omit<Order, "id" | "createdAt">): Promise<Order> => {
    let serverOrder: Order | null = null;
    try {
      const res = await apiFetch<Order>("/api/orders", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (res && res.id) {
        serverOrder = res;
      }
    } catch (err) {
      console.error("Order server placement failed, falling back to local:", err);
    }

    const order: Order = serverOrder || {
      ...input,
      id: `YG${Math.floor(100000 + Math.random() * 899999)}`,
      createdAt: Date.now(),
      status: "confirmed",
    };
    setOrders((prev) => [order, ...prev.filter((o) => o.id !== order.id)]);
    return order;
  }, []);

  const fetchOrder = useCallback(async (id: string, verify?: string): Promise<Order | null> => {
    const target = id.trim().toUpperCase();
    try {
      const q = verify ? `?verify=${encodeURIComponent(verify)}` : "";
      const res = await apiFetch<Order>(`/api/orders/${target}${q}`);
      if (res && res.id) {
        setOrders((prev) => [res, ...prev.filter((o) => o.id !== res.id)]);
        return res;
      }
    } catch {
      /* fallback to local cache */
    }
    return orders.find((o) => o.id.toUpperCase() === target && (!verify || o.email.toLowerCase() === verify.toLowerCase())) ?? null;
  }, [orders]);

  const resolve = useCallback(
    async (id: string, type: "cancellation" | "refund", reason: string, note?: string): Promise<Resolution | null> => {
      const order = orders.find((o) => o.id === id);
      if (!order) return null;
      const eligibility = resolutionEligibility(order);
      if (type === "cancellation" ? !eligibility.canCancel : !eligibility.canRefund) return null;

      const now = Date.now();
      const resolution: Resolution = {
        type,
        status: type === "cancellation" ? "cancelled" : "refund_requested",
        reason,
        note,
        requestedAt: now,
        amount: eligibility.refundAmount,
        refundBy: now + (type === "cancellation" ? 3 : 7) * 24 * HOUR,
        method: refundMethodLabel(order.payment),
      };

      try {
        await apiFetch(`/api/orders/${id}/resolve`, {
          method: "POST",
          body: JSON.stringify({ resolution }),
        });
      } catch (err) {
        console.error("Server order resolve error:", err);
      }

      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, resolution, status: type === "cancellation" ? "cancelled" : o.status } : o)));
      return resolution;
    },
    [orders],
  );

  const value = useMemo<OrdersContextValue>(
    () => ({
      profile,
      signIn: setProfile,
      signOut: () => setProfile(null),
      addresses,
      saveAddress,
      removeAddress,
      setDefaultAddress,
      orders,
      placeOrder,
      getOrder: (id: string) => orders.find((o) => o.id === id),
      fetchOrder,
      cancelOrder: (id, reason, note) => resolve(id, "cancellation", reason, note),
      requestRefund: (id, reason, note) => resolve(id, "refund", reason, note),
    }),
    [profile, addresses, orders, saveAddress, removeAddress, setDefaultAddress, placeOrder, fetchOrder, resolve],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used inside OrdersProvider");
  return ctx;
}
