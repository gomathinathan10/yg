import { apiFetch } from "@/lib/api-client";

export type AdminDashboardStats = {
  totalRevenue: number;
  totalOrders: number;
  ordersPlacedToday: number;
  pendingReviewsCount: number;
  openQuestionsCount: number;
  openTicketsCount: number;
  lowStockProductsCount: number;
  stockAlertsCount: number;
  ordersByStatus: Record<string, number>;
  recentOrders: Array<{
    id: string;
    createdAt: number;
    email: string;
    total: number;
    status: string;
    itemCount: number;
  }>;
  recentSalesTrend: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  draftOrHiddenProducts: number;
  featuredProducts: number;
};

export const adminGetDashboardStatsServerFn = async ({
  data,
}: {
  data?: { adminToken?: string };
} = {}): Promise<AdminDashboardStats> => {
  return apiFetch<AdminDashboardStats>("/api/analytics", {
    headers: data?.adminToken ? { "x-admin-token": data.adminToken } : {},
  });
};
