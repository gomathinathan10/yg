import { apiFetch } from "@/lib/api-client";

export type DbVariant = {
  id: string;
  product_slug: string;
  label: string;
  price: number;
  mrp: number | null;
  stock: number;
  sort_order: number;
};

export type DbProduct = {
  slug: string;
  name: string;
  tagline: string;
  format: "powder" | "granules" | "cake" | "combo" | "wellness" | "pooja";
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

export type AdminProductInput = {
  slug: string;
  name: string;
  tagline: string;
  format: "powder" | "granules" | "cake" | "combo" | "wellness" | "pooja";
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
  }>;
};

export const getProductsServerFn = async (): Promise<DbProduct[]> => {
  return apiFetch<DbProduct[]>("/api/products");
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
  data: AdminProductInput;
}) => {
  const product = await apiFetch<DbProduct>("/api/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return { ok: true, slug: product.slug };
};

export const adminToggleProductStockServerFn = async ({
  data,
}: {
  data: { slug: string; inStock: boolean; stockLeft?: number | null };
}) => {
  await apiFetch("/api/products/stock", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return { ok: true };
};

export const adminDeleteProductServerFn = async ({
  data,
}: {
  data: { slug: string };
}) => {
  await apiFetch(`/api/products/${data.slug}`, { method: "DELETE" });
  return { ok: true };
};
