import { apiFetch } from "@/lib/api-client";

export type DbAlert = {
  id: string;
  slug: string;
  contact: string;
  created_at: number;
  notified: number;
  notified_at?: number | null;
  product_name?: string;
};

export const subscribeStockAlertServerFn = async ({
  data,
}: {
  data: { slug: string; contact: string };
}): Promise<{ ok: boolean }> => {
  return apiFetch<{ ok: boolean }>("/api/alerts", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const adminListStockAlertsServerFn = async ({
  data,
}: {
  data?: { adminToken?: string };
} = {}): Promise<DbAlert[]> => {
  return apiFetch<DbAlert[]>("/api/alerts", {
    headers: data?.adminToken ? { "x-admin-token": data.adminToken } : {},
  });
};

export const adminNotifyStockAlertServerFn = async ({
  data,
}: {
  data: { id: string; adminToken?: string };
}): Promise<{ ok: boolean }> => {
  return apiFetch<{ ok: boolean }>(`/api/alerts/${data.id}/notify`, {
    method: "POST",
    headers: data.adminToken ? { "x-admin-token": data.adminToken } : {},
  });
};
