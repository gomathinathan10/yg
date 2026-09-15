import { apiFetch } from "@/lib/api-client";

export type DbPromo = {
  code: string;
  label: string;
  description: string;
  percent_off: number | null;
  amount_off: number | null;
  min_subtotal: number | null;
  free_shipping: number;
  automatic: number;
  is_active: number;
  created_at: number;
};

export const getPromosServerFn = async (): Promise<DbPromo[]> => {
  return apiFetch<DbPromo[]>("/api/promos?active=1");
};

export const validatePromoServerFn = async ({
  data,
}: {
  data: { code: string; subtotal: number };
}): Promise<{ ok: boolean; promo?: DbPromo; message?: string }> => {
  try {
    const res = await apiFetch<{
      ok: boolean;
      promo?: any;
      reason?: string;
    }>("/api/promos/validate", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return { ok: false, message: res.reason || "Invalid promo code" };
    }
    return { ok: true, promo: res.promo };
  } catch (err: any) {
    return { ok: false, message: err?.message || "Invalid coupon" };
  }
};

export const adminListPromosServerFn = async (): Promise<DbPromo[]> => {
  return apiFetch<DbPromo[]>("/api/promos");
};

export const adminSavePromoServerFn = async ({
  data,
}: {
  data: {
    code: string;
    label: string;
    description: string;
    percentOff?: number | null;
    amountOff?: number | null;
    minSubtotal?: number | null;
    freeShipping?: boolean;
    automatic?: boolean;
    isActive?: boolean;
  };
}) => {
  await apiFetch("/api/promos", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return { ok: true, code: data.code };
};

export const adminTogglePromoServerFn = async ({
  data,
}: {
  data: { code: string; isActive: boolean };
}) => {
  await apiFetch(`/api/promos/${data.code}`, {
    method: "PATCH",
    body: JSON.stringify({ isActive: data.isActive }),
  });
  return { ok: true };
};

export const adminDeletePromoServerFn = async ({
  data,
}: {
  data: { code: string };
}) => {
  await apiFetch(`/api/promos/${data.code}`, { method: "DELETE" });
  return { ok: true };
};
