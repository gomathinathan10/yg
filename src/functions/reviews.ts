import { apiFetch } from "@/lib/api-client";

function adminHeaders(adminToken?: string): Record<string, string> {
  return adminToken ? { "x-admin-token": adminToken } : {};
}

export type DbReview = {
  id: string;
  slug: string;
  rating: number;
  title: string;
  comment: string;
  name: string;
  city: string | null;
  email: string | null;
  phone: string | null;
  contact_opt_in: number;
  created_at: number;
  status: "pending" | "published" | "rejected";
};

export const getProductReviewsServerFn = async ({
  data,
}: {
  data: { slug: string };
}): Promise<DbReview[]> => {
  return apiFetch<DbReview[]>(`/api/reviews?slug=${encodeURIComponent(data.slug)}&status=published`);
};

export const submitReviewServerFn = async ({
  data,
}: {
  data: {
    slug: string;
    rating: number;
    title: string;
    comment: string;
    name: string;
    city?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    contactOptIn?: boolean | undefined;
  };
}): Promise<{ ok: boolean; review: DbReview }> => {
  return apiFetch<{ ok: boolean; review: DbReview }>("/api/reviews", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const adminListReviewsServerFn = async ({
  data,
}: {
  data?: { slug?: string; status?: "pending" | "published" | "rejected" | "all"; adminToken?: string };
} = {}): Promise<DbReview[]> => {
  const params = new URLSearchParams();
  if (data?.slug) params.set("slug", data.slug);
  if (data?.status) params.set("status", data.status);
  const q = params.toString() ? `?${params.toString()}` : "";
  return apiFetch<DbReview[]>(`/api/reviews${q}`, { headers: adminHeaders(data?.adminToken) });
};

export const adminModerateReviewServerFn = async ({
  data,
}: {
  data: {
    id: string;
    action?: "publish" | "reject" | "delete";
    status?: "pending" | "published" | "rejected";
    adminToken?: string;
  };
}) => {
  if (data.action === "delete") {
    await apiFetch(`/api/reviews/${data.id}`, { method: "DELETE", headers: adminHeaders(data.adminToken) });
    return { ok: true, id: data.id };
  }

  const status = data.action === "publish" ? "published" : data.action === "reject" ? "rejected" : (data.status || "published");
  await apiFetch(`/api/reviews/${data.id}`, {
    method: "PATCH",
    headers: adminHeaders(data.adminToken),
    body: JSON.stringify({ status }),
  });
  return { ok: true, id: data.id, status };
};
