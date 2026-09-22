import { apiFetch } from "@/lib/api-client";

export type DbVariant = {
  id: string;
  product_slug: string;
  label: string;
  price: number;
  mrp: number | null;
  stock: number;
  sort_order: number;
  image: string | null;
  gallery: string | null;
};

export type DbProductFormat =
  | "powder"
  | "granules"
  | "cake"
  | "combo"
  | "wellness"
  | "pooja"
  | "vismaya"
  | "appalam";

export type DbProductStatus = "active" | "draft" | "out_of_stock" | "hidden";

export type DbProduct = {
  slug: string;
  name: string;
  tagline: string;
  format: DbProductFormat;
  category: string;
  sku: string;
  status: DbProductStatus;
  archived: number;
  gluten_free: number;
  bestseller: number;
  image: string;
  gallery: string;
  description: string;
  ingredients: string;
  usage: string;
  shelf_life: string;
  in_stock: number;
  stock_left: number | null;
  rating: number;
  reviews: number;
  created_at: number;
  updated_at: number;
  variants?: DbVariant[];
};

export type DbCategory = {
  slug: string;
  name: string;
  created_at: number;
  productCount: number;
};

export type AdminProductInput = {
  slug: string;
  name: string;
  tagline: string;
  format: DbProductFormat;
  category: string;
  sku: string;
  status: DbProductStatus;
  glutenFree: boolean;
  bestseller: boolean;
  image: string;
  gallery: string[];
  description: string;
  ingredients: string;
  usage: string;
  shelfLife?: string;
  inStock: boolean;
  stockLeft: number | null;
  rating?: number;
  reviews?: number;
  variants: Array<{
    id: string;
    label: string;
    price: number;
    mrp?: number | null;
    stock?: number;
    image?: string | null;
    gallery?: string[] | null;
  }>;
};

function adminHeaders(adminToken?: string): Record<string, string> {
  return adminToken ? { "x-admin-token": adminToken } : {};
}

export const adminLoginServerFn = async ({
  data,
}: {
  data: { username: string; password: string };
}): Promise<{ ok: boolean; token?: string; error?: string }> => {
  try {
    return await apiFetch<{ ok: boolean; token: string }>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (e: any) {
    return { ok: false, error: e?.message || "Invalid username or password" };
  }
};

export const getProductsServerFn = async ({
  data,
}: {
  data?: { includeArchived?: boolean };
} = {}): Promise<DbProduct[]> => {
  const qs = data?.includeArchived ? "?includeArchived=1" : "";
  return apiFetch<DbProduct[]>(`/api/products${qs}`);
};

export const getProductBySlugServerFn = async ({
  data,
}: {
  data: { slug: string };
}): Promise<DbProduct | null> => {
  const slug = String(data?.slug ?? "").trim();
  if (!slug) return null;
  try {
    return await apiFetch<DbProduct>(`/api/products/${slug}`);
  } catch {
    return null;
  }
};

export const adminSaveProductServerFn = async ({
  data,
}: {
  data: AdminProductInput & { adminToken?: string };
}) => {
  const { adminToken, ...input } = data;
  const product = await apiFetch<DbProduct>("/api/products", {
    method: "POST",
    headers: adminHeaders(adminToken),
    body: JSON.stringify(input),
  });
  return { ok: true, slug: product.slug };
};

export const adminToggleProductStockServerFn = async ({
  data,
}: {
  data: { slug: string; inStock: boolean; stockLeft?: number | null; adminToken?: string };
}) => {
  const { adminToken, ...input } = data;
  await apiFetch("/api/products/stock", {
    method: "POST",
    headers: adminHeaders(adminToken),
    body: JSON.stringify(input),
  });
  return { ok: true };
};

export const adminSetProductStatusServerFn = async ({
  data,
}: {
  data: { slug: string; status: DbProductStatus; adminToken?: string };
}) => {
  await apiFetch(`/api/products/${data.slug}/status`, {
    method: "PATCH",
    headers: adminHeaders(data.adminToken),
    body: JSON.stringify({ status: data.status }),
  });
  return { ok: true };
};

export const adminDeleteProductServerFn = async ({
  data,
}: {
  data: { slug: string; adminToken?: string };
}) => {
  await apiFetch(`/api/products/${data.slug}`, {
    method: "DELETE",
    headers: adminHeaders(data.adminToken),
  });
  return { ok: true };
};

export const adminRestoreProductServerFn = async ({
  data,
}: {
  data: { slug: string; adminToken?: string };
}) => {
  await apiFetch(`/api/products/${data.slug}/restore`, {
    method: "POST",
    headers: adminHeaders(data.adminToken),
  });
  return { ok: true };
};

export const adminReorderProductsServerFn = async ({
  data,
}: {
  data: { slugs: string[]; adminToken?: string };
}) => {
  await apiFetch("/api/products/reorder", {
    method: "POST",
    headers: adminHeaders(data.adminToken),
    body: JSON.stringify({ slugs: data.slugs }),
  });
  return { ok: true };
};

export const getCategoriesServerFn = async (): Promise<DbCategory[]> => {
  return apiFetch<DbCategory[]>("/api/categories");
};

export const adminSaveCategoryServerFn = async ({
  data,
}: {
  data: { slug?: string; name: string; adminToken?: string };
}) => {
  const { adminToken, ...input } = data;
  const res = await apiFetch<{ ok: boolean; category: DbCategory }>("/api/categories", {
    method: "POST",
    headers: adminHeaders(adminToken),
    body: JSON.stringify(input),
  });
  return res;
};

export const adminDeleteCategoryServerFn = async ({
  data,
}: {
  data: { slug: string; replacementSlug?: string; adminToken?: string };
}): Promise<{ ok: boolean; error?: string }> => {
  const qs = data.replacementSlug ? `?replacement=${encodeURIComponent(data.replacementSlug)}` : "";
  try {
    return await apiFetch<{ ok: boolean }>(`/api/categories/${data.slug}${qs}`, {
      method: "DELETE",
      headers: adminHeaders(data.adminToken),
    });
  } catch (e: any) {
    return { ok: false, error: e?.message || "Failed to delete category" };
  }
};
