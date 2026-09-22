import { apiFetch } from "@/lib/api-client";

export type DbCalcMetrics = {
  free_shipping_threshold: number;
  standard_delivery_fee: number;
  express_delivery_fee: number;
  cod_handling_fee: number;
  gst_percentage: number;
  hsn_code: string;
  wholesale_tier1_min_kg: number;
  wholesale_tier1_discount: number;
  wholesale_tier2_min_kg: number;
  wholesale_tier2_discount: number;
  wholesale_tier3_min_kg: number;
  wholesale_tier3_discount: number;
};

function adminHeaders(adminToken?: string): Record<string, string> {
  return adminToken ? { "x-admin-token": adminToken } : {};
}

export const getCalcMetricsServerFn = async (): Promise<DbCalcMetrics | null> => {
  return apiFetch<DbCalcMetrics | null>("/api/metrics");
};

export const adminSaveCalcMetricsServerFn = async ({
  data,
}: {
  data: DbCalcMetrics & { adminToken?: string };
}) => {
  const { adminToken, ...metrics } = data;
  const res = await apiFetch<{ ok: boolean; metrics: DbCalcMetrics }>("/api/metrics", {
    method: "POST",
    headers: adminHeaders(adminToken),
    body: JSON.stringify(metrics),
  });
  return res;
};

export const adminResetCalcMetricsServerFn = async ({
  data,
}: {
  data?: { adminToken?: string };
} = {}) => {
  await apiFetch("/api/metrics", { method: "DELETE", headers: adminHeaders(data?.adminToken) });
  return { ok: true };
};
