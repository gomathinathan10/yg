import type { Address, OrderItem, OrderTotals, Resolution } from "@/lib/orders";
import { apiFetch } from "@/lib/api-client";

function adminHeaders(adminToken?: string): Record<string, string> {
  return adminToken ? { "x-admin-token": adminToken } : {};
}

export type DbOrderRow = {
  id: string;
  created_at: number;
  email: string;
  phone: string;
  subtotal: number;
  discount: number;
  shipping: number;
  gift_wrap: number;
  cod_fee: number;
  total: number;
  promo_code: string | null;
  address_json: string;
  payment: string;
  delivery: "standard" | "express";
  status: string;
  notes: string | null;
  gift: number;
  gift_message: string | null;
  resolution_json: string | null;
  updated_at: number;
};

export type DbOrderItemRow = {
  id: string;
  order_id: string;
  slug: string;
  variant_id: string;
  name: string;
  variant_label: string;
  image: string;
  qty: number;
  price: number;
};

export type FullOrder = {
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
  status: string;
  notes?: string | null | undefined;
  gift: boolean;
  giftMessage?: string | null | undefined;
  resolution?: Resolution | null | undefined;
};

export const createOrderServerFn = async ({
  data,
}: {
  data: {
    id?: string | undefined;
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
    gift?: boolean | undefined;
    giftMessage?: string | undefined;
    resolution?: Resolution | null | undefined;
  };
}): Promise<FullOrder> => {
  return apiFetch<FullOrder>("/api/orders", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getOrderByIdServerFn = async ({
  data,
}: {
  data: { id: string; verify?: string | undefined };
}): Promise<FullOrder | null> => {
  const id = String(data?.id ?? "").trim().toUpperCase();
  if (!id) return null;
  const query = data.verify ? `?verify=${encodeURIComponent(data.verify)}` : "";
  try {
    return await apiFetch<FullOrder>(`/api/orders/${id}${query}`);
  } catch {
    return null;
  }
};

export const listUserOrdersServerFn = async ({
  data,
}: {
  data: { email?: string | undefined; phone?: string | undefined };
}): Promise<FullOrder[]> => {
  const param = data.email || data.phone || "";
  if (!param) return [];
  try {
    return await apiFetch<FullOrder[]>(`/api/orders/customer?q=${encodeURIComponent(param)}`);
  } catch {
    return [];
  }
};

export const resolveOrderServerFn = async ({
  data,
}: {
  data: {
    id: string;
    type: "cancellation" | "refund";
    reason: string;
    note?: string | undefined;
  };
}): Promise<{ ok: boolean; resolution: Resolution | null; error?: string }> => {
  const isCancel = data.type === "cancellation";
  const resolution: Resolution = {
    type: data.type,
    status: isCancel ? "cancelled" : "refund_requested",
    reason: data.reason,
    note: data.note,
    requestedAt: Date.now(),
    amount: 0,
    refundBy: Date.now() + (isCancel ? 3 : 7) * 24 * 60 * 60 * 1000,
    method: "Original Payment",
  };

  try {
    const res = await apiFetch<{ ok: boolean }>(`/api/orders/${data.id}/resolve`, {
      method: "POST",
      body: JSON.stringify({ resolution }),
    });
    return { ok: res.ok, resolution };
  } catch (err: any) {
    return { ok: false, resolution: null, error: err?.message || "Failed to resolve order" };
  }
};

export const adminListOrdersServerFn = async ({
  data,
}: {
  data?: { status?: string; search?: string; limit?: number; adminToken?: string };
} = {}): Promise<FullOrder[]> => {
  const orders = await apiFetch<FullOrder[]>("/api/orders", {
    headers: adminHeaders(data?.adminToken),
  });
  let filtered = orders;
  if (data?.status && data.status !== "all") {
    filtered = filtered.filter((o) => o.status === data.status);
  }
  if (data?.search) {
    const term = data.search.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.id.toLowerCase().includes(term) ||
        o.email.toLowerCase().includes(term) ||
        o.phone.toLowerCase().includes(term)
    );
  }
  return filtered.slice(0, data?.limit ?? 100);
};

export const adminUpdateOrderStatusServerFn = async ({
  data,
}: {
  data: { id: string; status: string; adminToken?: string };
}) => {
  await apiFetch(`/api/orders/${data.id}/status`, {
    method: "PATCH",
    headers: adminHeaders(data.adminToken),
    body: JSON.stringify({ status: data.status }),
  });
  return { ok: true, id: data.id, status: data.status };
};

export const adminProcessResolutionServerFn = async ({
  data,
}: {
  data: { id: string; action: "approve" | "reject"; note?: string | undefined; adminToken?: string };
}) => {
  const order = await apiFetch<FullOrder>(`/api/orders/${data.id}`);
  if (!order || !order.resolution) return { ok: false, error: "No open resolution found" };

  if (data.action === "approve") {
    order.resolution.status = order.resolution.type === "cancellation" ? "cancelled" : "refunded";
    if (data.note) {
      order.resolution.note = `${order.resolution.note ? `${order.resolution.note} — ` : ""}Admin note: ${data.note}`;
    }
  } else {
    order.resolution = null;
  }

  await apiFetch(`/api/orders/${data.id}/resolve`, {
    method: "POST",
    headers: adminHeaders(data.adminToken),
    body: JSON.stringify({ resolution: order.resolution }),
  });
  return { ok: true, resolution: order.resolution };
};

export const adminDeleteOrderServerFn = async ({
  data,
}: {
  data: { id: string; adminToken?: string };
}) => {
  await apiFetch(`/api/orders/${data.id}`, {
    method: "DELETE",
    headers: adminHeaders(data.adminToken),
  });
  return { ok: true, id: data.id };
};

export const adminClearAllOrdersServerFn = async ({
  data,
}: {
  data?: { adminToken?: string };
} = {}) => {
  await apiFetch("/api/orders", { method: "DELETE", headers: adminHeaders(data?.adminToken) });
  return { ok: true };
};
