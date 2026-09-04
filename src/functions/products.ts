import fs from "node:fs";
import path from "node:path";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/server/db";

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

function syncProductsDataFile() {
  try {
    const db = getDb();
    const products = db.prepare("SELECT * FROM products ORDER BY bestseller DESC, created_at ASC").all() as unknown as DbProduct[];
    const variants = db.prepare("SELECT * FROM product_variants ORDER BY sort_order ASC").all() as unknown as DbVariant[];

    const variantMap = new Map<string, DbVariant[]>();
    for (const v of variants) {
      const list = variantMap.get(v.product_slug) ?? [];
      list.push(v);
      variantMap.set(v.product_slug, list);
    }

    const list = products.map((p) => {
      let gallery: string[] = [];
      try {
        gallery = JSON.parse(p.gallery);
      } catch {
        gallery = [p.image];
      }
      return {
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        format: p.format,
        glutenFree: Boolean(p.gluten_free),
        bestseller: Boolean(p.bestseller),
        image: p.image,
        gallery,
        description: p.description,
        ingredients: p.ingredients,
        usage: p.usage,
        shelfLife: p.shelf_life || "12 months from packing. Store in an airtight container.",
        variants: (variantMap.get(p.slug) ?? []).map((v) => ({
          id: v.id,
          label: v.label,
          price: v.price,
          mrp: v.mrp ?? undefined,
          stock: v.stock ?? 50,
        })),
        inStock: Boolean(p.in_stock),
        stockLeft: p.stock_left ?? undefined,
        rating: Math.min(4.9, Math.max(4.5, Number(p.rating || 4.8))),
        reviews: p.reviews ?? 100,
      };
    });

    const filePath = path.resolve(process.cwd(), "src/data/products.ts");
    const fileContent = `export type Format = "powder" | "granules" | "cake" | "combo" | "wellness" | "pooja";

export type Variant = {
  id: string;
  label: string;
  price: number;
  mrp?: number;
  stock?: number;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  format: Format;
  glutenFree: boolean;
  bestseller?: boolean;
  image: string;
  gallery: string[];
  description: string;
  ingredients: string;
  usage: string;
  shelfLife: string;
  variants: Variant[];
  inStock?: boolean;
  stockLeft?: number;
  rating: number;
  reviews: number;
};

export const products: Product[] = ${JSON.stringify(list, null, 2)};

export const formatLabels: Record<Format, string> = {
  powder: "Powder",
  granules: "Granules",
  cake: "Cake",
  combo: "Gift & combo",
  wellness: "Health Mix",
  pooja: "Pooja Sambrani",
};

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\\s+/);
  return products
    .map((p) => {
      const haystack = [p.name, p.tagline, formatLabels[p.format], p.description]
        .join(" ")
        .toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (p.name.toLowerCase().includes(t)) score += 3;
        else if (haystack.includes(t)) score += 1;
      }
      return { p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(paise?: number | string | null) {
  if (paise === undefined || paise === null || isNaN(Number(paise))) {
    return "₹0";
  }
  const num = Number(paise);
  return \`₹\${num.toLocaleString("en-IN")}\`;
}
`;
    fs.writeFileSync(filePath, fileContent, "utf-8");
  } catch (err) {
    console.error("Failed to sync products.ts:", err);
  }
}

export const getProductsServerFn = createServerFn({ method: "GET" })
  .handler(async (): Promise<DbProduct[]> => {
    const db = getDb();
    const products = db.prepare("SELECT * FROM products ORDER BY bestseller DESC, created_at ASC").all() as unknown as DbProduct[];
    const variants = db.prepare("SELECT * FROM product_variants ORDER BY sort_order ASC").all() as unknown as DbVariant[];

    const variantMap = new Map<string, DbVariant[]>();
    for (const v of variants) {
      const list = variantMap.get(v.product_slug) ?? [];
      list.push(v);
      variantMap.set(v.product_slug, list);
    }

    return products.map((p) => ({
      ...p,
      variants: variantMap.get(p.slug) ?? [],
    }));
  });

export const getProductBySlugServerFn = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => {
    return { slug: String(data?.slug ?? "").trim() };
  })
  .handler(async ({ data }): Promise<DbProduct | null> => {
    if (!data.slug) return null;
    const db = getDb();
    const product = db.prepare("SELECT * FROM products WHERE slug = ?").get(data.slug) as unknown as DbProduct | undefined;
    if (!product) return null;

    const variants = db.prepare("SELECT * FROM product_variants WHERE product_slug = ? ORDER BY sort_order ASC").all(data.slug) as unknown as DbVariant[];
    return {
      ...product,
      variants,
    };
  });

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

export const adminSaveProductServerFn = createServerFn({ method: "POST" })
  .validator((data: AdminProductInput) => data)
  .handler(async ({ data }) => {
    const db = getDb();
    const now = Date.now();

    const existing = db.prepare("SELECT slug FROM products WHERE slug = ?").get(data.slug);
    const validRating = Math.min(4.9, Math.max(4.5, Number(data.rating ?? 4.8)));
    const finalShelfLife = (data.shelfLife && data.shelfLife.trim()) || "12 months from packing. Store in an airtight container.";

    if (existing) {
      // Update
      db.prepare(`
        UPDATE products SET
          name = ?, tagline = ?, format = ?, gluten_free = ?, bestseller = ?,
          image = ?, gallery = ?, description = ?, ingredients = ?, usage = ?,
          shelf_life = ?, in_stock = ?, stock_left = ?, rating = ?, updated_at = ?
        WHERE slug = ?
      `).run(
        data.name,
        data.tagline,
        data.format,
        data.glutenFree ? 1 : 0,
        data.bestseller ? 1 : 0,
        data.image,
        JSON.stringify(data.gallery),
        data.description,
        data.ingredients,
        data.usage,
        finalShelfLife,
        data.inStock ? 1 : 0,
        data.stockLeft ?? null,
        validRating,
        now,
        data.slug
      );
    } else {
      // Insert
      db.prepare(`
        INSERT INTO products (
          slug, name, tagline, format, gluten_free, bestseller, image, gallery,
          description, ingredients, usage, shelf_life, in_stock, stock_left,
          rating, reviews, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        data.slug,
        data.name,
        data.tagline,
        data.format,
        data.glutenFree ? 1 : 0,
        data.bestseller ? 1 : 0,
        data.image,
        JSON.stringify(data.gallery),
        data.description,
        data.ingredients,
        data.usage,
        finalShelfLife,
        data.inStock ? 1 : 0,
        data.stockLeft ?? null,
        validRating,
        data.reviews ?? 100,
        now,
        now
      );
    }

    // Replace variants
    db.prepare("DELETE FROM product_variants WHERE product_slug = ?").run(data.slug);
    const insertVariant = db.prepare(`
      INSERT INTO product_variants (id, product_slug, label, price, mrp, stock, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    data.variants.forEach((v, idx) => {
      insertVariant.run(v.id, data.slug, v.label, v.price, v.mrp ?? null, v.stock ?? 100, idx);
    });

    // Synchronize to src/data/products.ts so storefront updates immediately
    syncProductsDataFile();

    return { ok: true, slug: data.slug };
  });

export const adminToggleProductStockServerFn = createServerFn({ method: "POST" })
  .validator((data: { slug: string; inStock: boolean; stockLeft?: number | null }) => data)
  .handler(async ({ data }) => {
    const db = getDb();
    db.prepare("UPDATE products SET in_stock = ?, stock_left = ?, updated_at = ? WHERE slug = ?").run(
      data.inStock ? 1 : 0,
      data.stockLeft ?? null,
      Date.now(),
      data.slug
    );
    syncProductsDataFile();
    return { ok: true };
  });

export const adminDeleteProductServerFn = createServerFn({ method: "POST" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const db = getDb();
    db.prepare("DELETE FROM products WHERE slug = ?").run(data.slug);
    db.prepare("DELETE FROM product_variants WHERE product_slug = ?").run(data.slug);
    syncProductsDataFile();
    return { ok: true };
  });
