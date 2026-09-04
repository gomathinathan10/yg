import fs from "node:fs";
import path from "node:path";

export interface DbStatement {
  all(...params: unknown[]): unknown[];
  get(...params: unknown[]): unknown | undefined;
  run(...params: unknown[]): { changes: number; lastInsertRowid?: number | bigint };
}

export interface DbInterface {
  exec(sql: string): void;
  prepare(sql: string): DbStatement;
}

let dbInstance: DbInterface | null = null;

function getDbPath(): string {
  const dataDir = path.resolve(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, "yg_store.json");
}

class PureJsDatabase implements DbInterface {
  private data: Record<string, Record<string, any>[]> = {};
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        this.data = JSON.parse(raw);
      }
    } catch {
      this.data = {};
    }
  }

  private save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to save JSON DB:", err);
    }
  }

  exec(sql: string): void {
    const stmts = sql.split(";");
    for (const s of stmts) {
      const trimmed = s.trim();
      if (!trimmed) continue;
      if (trimmed.toUpperCase().startsWith("CREATE TABLE")) {
        const match = trimmed.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)/i);
        if (match && match[1]) {
          const tableName = match[1];
          if (!this.data[tableName]) {
            this.data[tableName] = [];
          }
        }
      } else if (trimmed.toUpperCase().startsWith("DELETE FROM")) {
        const match = trimmed.match(/DELETE\s+FROM\s+([a-zA-Z0-9_]+)/i);
        if (match && match[1]) {
          const tableName = match[1];
          this.data[tableName] = [];
        }
      }
    }
    this.save();
  }

  prepare(sql: string): DbStatement {
    const rawSql = sql.trim();
    const upper = rawSql.toUpperCase();

    // 1. SELECT COUNT(*)
    if (upper.includes("SELECT COUNT(*)")) {
      const match = rawSql.match(/FROM\s+([a-zA-Z0-9_]+)/i);
      const tableName = match && match[1] ? match[1] : "";
      const tableRows = tableName && this.data[tableName] ? this.data[tableName] : [];
      return {
        all: () => [{ count: tableRows.length }],
        get: () => ({ count: tableRows.length }),
        run: () => ({ changes: 0 }),
      };
    }

    // 2. SELECT * FROM table ...
    if (upper.startsWith("SELECT")) {
      const fromMatch = rawSql.match(/FROM\s+([a-zA-Z0-9_]+)/i);
      const tableName = fromMatch && fromMatch[1] ? fromMatch[1] : "";
      const rows = tableName && this.data[tableName] ? this.data[tableName] : [];

      return {
        all: (...params: unknown[]) => {
          let result = [...rows];
          // Simple WHERE matching
          if (upper.includes("WHERE")) {
            const parts = rawSql.split(/WHERE/i);
            const whereClause = parts[1] ?? "";
            const wherePart = (whereClause.split(/ORDER|LIMIT|GROUP/i)[0] ?? "").trim();
            result = this.filterRows(result, wherePart, params);
          }
          // Order By
          if (upper.includes("ORDER BY")) {
            const parts = rawSql.split(/ORDER BY/i);
            const orderPart = (parts[1] ?? "").trim();
            result = this.sortRows(result, orderPart);
          }
          return result;
        },
        get: (...params: unknown[]) => {
          let result = [...rows];
          if (upper.includes("WHERE")) {
            const parts = rawSql.split(/WHERE/i);
            const whereClause = parts[1] ?? "";
            const wherePart = (whereClause.split(/ORDER|LIMIT|GROUP/i)[0] ?? "").trim();
            result = this.filterRows(result, wherePart, params);
          }
          return result[0];
        },
        run: () => ({ changes: 0 }),
      };
    }

    // 3. INSERT OR REPLACE INTO / INSERT INTO
    if (upper.startsWith("INSERT")) {
      const match = rawSql.match(/INTO\s+([a-zA-Z0-9_]+)\s*\(([^)]+)\)/i);
      const tableName = match && match[1] ? match[1] : "";
      const columns = match && match[2] ? match[2].split(",").map((c) => c.trim()) : [];

      return {
        all: () => [],
        get: () => undefined,
        run: (...params: unknown[]) => {
          if (!tableName) return { changes: 0 };
          if (!this.data[tableName]) this.data[tableName] = [];
          const tableData = this.data[tableName]!;
          const obj: Record<string, any> = {};
          columns.forEach((col, idx) => {
            obj[col] = params[idx];
          });

          // Primary key matching (slug or id or (product_slug, id) or code)
          let existingIdx = -1;
          if (tableName === "products" && obj["slug"]) {
            existingIdx = tableData.findIndex((r: any) => r["slug"] === obj["slug"]);
          } else if (tableName === "product_variants" && obj["product_slug"] && obj["id"]) {
            existingIdx = tableData.findIndex((r: any) => r["product_slug"] === obj["product_slug"] && r["id"] === obj["id"]);
          } else if (tableName === "promos" && obj["code"]) {
            existingIdx = tableData.findIndex((r: any) => r["code"] === obj["code"]);
          } else if (obj["id"]) {
            existingIdx = tableData.findIndex((r: any) => r["id"] === obj["id"]);
          }

          if (existingIdx >= 0 && tableData[existingIdx]) {
            tableData[existingIdx] = { ...tableData[existingIdx], ...obj };
          } else {
            tableData.push(obj);
          }

          this.save();
          return { changes: 1 };
        },
      };
    }

    // 4. UPDATE table SET ... WHERE ...
    if (upper.startsWith("UPDATE")) {
      const match = rawSql.match(/UPDATE\s+([a-zA-Z0-9_]+)\s+SET\s+(.+?)\s+WHERE\s+(.+)/i);
      const tableName = match && match[1] ? match[1] : "";
      const setPart = match && match[2] ? match[2] : "";
      const wherePart = match && match[3] ? match[3] : "";

      return {
        all: () => [],
        get: () => undefined,
        run: (...params: unknown[]) => {
          if (!tableName) return { changes: 0 };
          const rows = this.data[tableName] || [];
          // Count '?' in setPart to split params between SET and WHERE
          const setCount = (setPart.match(/\?/g) || []).length;
          const setParams = params.slice(0, setCount);
          const whereParams = params.slice(setCount);

          const setFields = setPart.split(",").map((s) => {
            const first = s.trim().split("=")[0];
            return first ? first.trim() : "";
          }).filter(Boolean);
          const matching = this.filterRows(rows, wherePart, whereParams);

          for (const row of matching) {
            setFields.forEach((field, i) => {
              if (field) {
                row[field] = setParams[i];
              }
            });
          }

          this.save();
          return { changes: matching.length };
        },
      };
    }

    // 5. DELETE FROM table WHERE ...
    if (upper.startsWith("DELETE")) {
      const match = rawSql.match(/DELETE\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+(.+))?/i);
      const tableName = match && match[1] ? match[1] : "";
      const wherePart = match && match[2] ? match[2] : "";

      return {
        all: () => [],
        get: () => undefined,
        run: (...params: unknown[]) => {
          if (!tableName) return { changes: 0 };
          if (!wherePart) {
            this.data[tableName] = [];
            this.save();
            return { changes: 1 };
          }
          const rows = this.data[tableName] || [];
          const toDelete = new Set(this.filterRows(rows, wherePart, params));
          this.data[tableName] = rows.filter((r: any) => !toDelete.has(r));
          this.save();
          return { changes: toDelete.size };
        },
      };
    }

    return {
      all: () => [],
      get: () => undefined,
      run: () => ({ changes: 0 }),
    };
  }

  private filterRows(rows: any[], whereSql: string, params: unknown[]): any[] {
    let pIdx = 0;
    // Replace AND / OR conditions simply
    const conditions = whereSql.split(/\s+AND\s+/i);
    return rows.filter((row) => {
      for (const cond of conditions) {
        const c = cond.trim();
        if (c.includes("=")) {
          const parts = c.split("=");
          const field = (parts[0] ?? "").trim();
          const val = (parts[1] ?? "").trim();
          const targetVal = val === "?" ? params[pIdx++] : val.replace(/['"]/g, "");
          if (field && String(row[field]) !== String(targetVal)) return false;
        }
      }
      return true;
    });
  }

  private sortRows(rows: any[], orderSql: string): any[] {
    const parts = orderSql.split(",").map((s) => s.trim());
    return [...rows].sort((a, b) => {
      for (const part of parts) {
        const tokens = part.split(/\s+/);
        const field = tokens[0] ?? "";
        const dir = tokens[1] ?? "";
        const isDesc = dir && dir.toUpperCase() === "DESC";
        if (field) {
          if (a[field] < b[field]) return isDesc ? 1 : -1;
          if (a[field] > b[field]) return isDesc ? -1 : 1;
        }
      }
      return 0;
    });
  }
}

export function getDb(): DbInterface {
  if (dbInstance) return dbInstance;

  try {
    // Attempt native node:sqlite if running in Node 22+
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { DatabaseSync } = require("node:sqlite");
    const dbDir = path.resolve(process.cwd(), "data");
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
    const nativeDb = new DatabaseSync(path.join(dbDir, "yg_store.db"));
    nativeDb.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
    initSchema(nativeDb as any);
    seedInitialData(nativeDb as any);
    dbInstance = nativeDb as any;
    return dbInstance!;
  } catch {
    // Fallback to ultra-resilient pure JS database (Node 18, 20, 22 compatible)
    const jsonPath = getDbPath();
    const fallbackDb = new PureJsDatabase(jsonPath);
    initSchema(fallbackDb);
    seedInitialData(fallbackDb);
    dbInstance = fallbackDb;
    return dbInstance;
  }
}

function initSchema(db: DbInterface) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (slug TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS product_variants (id TEXT);
    CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS order_items (id TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS reviews (id TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS questions (id TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS tickets (id TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS stock_alerts (id TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS promos (code TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS recipes (slug TEXT PRIMARY KEY);
  `);
}

function seedInitialData(db: DbInterface) {
  const now = Date.now();

  const initialProducts = [
    {
      slug: "gold-asafoetida-powder",
      name: "Y.G Gold Asafoetida Powder",
      tagline: "Heritage Gold Compounded Asafoetida Powder",
      format: "powder",
      gluten_free: 0,
      bestseller: 1,
      image: "/products/100g-gold-asafoetida-powder/img-1.jpg",
      gallery: JSON.stringify([
        "/products/100g-gold-asafoetida-powder/img-1.jpg",
        "/products/50g-gold-asafoetida-powder/img-1.jpg",
        "/products/500g-gold-asafoetida-powder/img-1.jpg",
      ]),
      description: "Our signature Gold grade compounded hing powder crafted to age-old Tirunelveli traditions since 1932.",
      ingredients: "Asafoetida (Ferula asafoetida), edible starch, edible gum.",
      usage: "Add 1/4 teaspoon to hot ghee during tempering.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.8,
      reviews: 312,
      variants: [
        { id: "50g", label: "50 g", price: 175, mrp: 200, stock: 80 },
        { id: "100g", label: "100 g", price: 320, mrp: 360, stock: 120 },
        { id: "500g", label: "500 g", price: 1450, mrp: 1650, stock: 40 },
      ],
    },
    {
      slug: "premium-asafoetida-powder",
      name: "Y.G Premium Asafoetida Powder",
      tagline: "Master Chef's High-Concentration Hing Powder",
      format: "powder",
      gluten_free: 0,
      bestseller: 1,
      image: "/products/100g-premium-asafoetida-powder/img-1.jpg",
      gallery: JSON.stringify(["/products/100g-premium-asafoetida-powder/img-1.jpg"]),
      description: "Superior chef-grade asafoetida with higher natural resin concentration.",
      ingredients: "Selected Asafoetida (Ferula asafoetida), edible starch, gum arabic.",
      usage: "A small pinch in hot ghee is sufficient.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.9,
      reviews: 184,
      variants: [
        { id: "50g", label: "50 g", price: 195, mrp: 225, stock: 90 },
        { id: "100g", label: "100 g", price: 360, mrp: 410, stock: 110 },
      ],
    },
    {
      slug: "gluten-free-asafoetida-powder",
      name: "Y.G Gluten Free Asafoetida Powder",
      tagline: "Wheat-Free Rice Starch Base — 100% Celiac Safe",
      format: "powder",
      gluten_free: 1,
      bestseller: 1,
      image: "/products/50g-gluten-free-asafoetida-powder/img-1.jpg",
      gallery: JSON.stringify(["/products/50g-gluten-free-asafoetida-powder/img-1.jpg"]),
      description: "Made exclusively with pure rice starch base without any wheat flour.",
      ingredients: "Asafoetida (Ferula asafoetida), rice starch, edible gum. Certified gluten-free.",
      usage: "Use exactly like classic powder.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: 8,
      rating: 4.6,
      reviews: 96,
      variants: [
        { id: "50g", label: "50 g", price: 220, mrp: 250, stock: 65 },
        { id: "100g", label: "100 g", price: 395, mrp: 450, stock: 75 },
      ],
    },
    {
      slug: "asafoetida-gold-cake",
      name: "Y.G Asafoetida Gold Cake (Pindi Hing)",
      tagline: "Solid Block Pindi Hing for Pickles & Traditional Tadka",
      format: "cake",
      gluten_free: 0,
      bestseller: 0,
      image: "/products/100g-asafoetida-gold-cake/img-1.jpg",
      gallery: JSON.stringify(["/products/100g-asafoetida-gold-cake/img-1.jpg"]),
      description: "Pure concentrated hing cake block for traditional recipes.",
      ingredients: "Asafoetida (Ferula asafoetida), edible gum, edible starch.",
      usage: "Shave a pea-sized piece into tempering.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.7,
      reviews: 142,
      variants: [
        { id: "50g", label: "50 g cake", price: 240, mrp: 280, stock: 50 },
        { id: "100g", label: "100 g cake", price: 450, mrp: 520, stock: 60 },
      ],
    },
    {
      slug: "hing-chips",
      name: "Y.G Hing Chips (Flakes / Khada)",
      tagline: "Sun-Dried Asafoetida Flakes — Slow Blooming Flavor",
      format: "granules",
      gluten_free: 0,
      bestseller: 0,
      image: "/products/hing-chips/img-1.jpg",
      gallery: JSON.stringify(["/products/hing-chips/img-1.jpg"]),
      description: "Coarse sun-cured hing flakes that bloom slowly in sizzling ghee.",
      ingredients: "Asafoetida (Ferula foetida resin), edible gum, edible flour.",
      usage: "Drop 2-3 flakes into warm ghee.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.6,
      reviews: 78,
      variants: [
        { id: "50g", label: "50 g", price: 260, mrp: 300, stock: 45 },
        { id: "100g", label: "100 g", price: 490, mrp: 560, stock: 50 },
      ],
    },
    {
      slug: "hing-pellets",
      name: "Y.G Hing Pellets (Dana Hing)",
      tagline: "Crisp Granular Pellets for Curd Rice & Sambar Tempering",
      format: "granules",
      gluten_free: 0,
      bestseller: 0,
      image: "/products/hing-pellets/img-1.jpg",
      gallery: JSON.stringify(["/products/hing-pellets/img-1.jpg"]),
      description: "Free-flowing crisp hing pellets for curd rice and potato roasts.",
      ingredients: "Asafoetida, natural gum, edible cereal starch.",
      usage: "Crush a pellet or drop whole into hot ghee during tadka.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.5,
      reviews: 65,
      variants: [
        { id: "50g", label: "50 g", price: 250, mrp: 290, stock: 55 },
        { id: "100g", label: "100 g", price: 475, mrp: 540, stock: 60 },
      ],
    },
    {
      slug: "bottle-jar-asafoetida",
      name: "Y.G Heritage Bottle Jar Asafoetida",
      tagline: "Collector's Glass Bottle Jar with Airtight Aroma Seal",
      format: "powder",
      gluten_free: 0,
      bestseller: 1,
      image: "/products/bottle-jar/img-1.jpg",
      gallery: JSON.stringify(["/products/bottle-jar/img-1.jpg"]),
      description: "Signature airtight glass jar preserving volatile aroma and freshness for years.",
      ingredients: "Compounded Asafoetida (Ferula asafoetida), edible starch, edible gum.",
      usage: "Keep on kitchen counter for easy daily spooning.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.9,
      reviews: 218,
      variants: [
        { id: "100g", label: "100 g Glass Jar", price: 380, mrp: 440, stock: 40 },
        { id: "250g", label: "250 g Glass Jar", price: 850, mrp: 990, stock: 30 },
      ],
    },
    {
      slug: "pure-raw-hing",
      name: "Y.G Pure Raw Hing Lump (Kashmiri Resin)",
      tagline: "100% Uncut Natural Ferula Gum Resin",
      format: "cake",
      gluten_free: 0,
      bestseller: 0,
      image: "/products/hing/img-1.jpg",
      gallery: JSON.stringify(["/products/hing/img-1.jpg"]),
      description: "The raw unadulterated gum oleoresin from mountain roots.",
      ingredients: "100% Raw Asafoetida Oleoresin (Ferula foetida).",
      usage: "Scrape a tiny pinhead amount into warm liquid.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.7,
      reviews: 58,
      variants: [
        { id: "25g", label: "25 g Raw Lump", price: 390, mrp: 450, stock: 35 },
        { id: "50g", label: "50 g Raw Lump", price: 720, mrp: 820, stock: 40 },
        { id: "100g", label: "100 g Raw Lump", price: 1350, mrp: 1550, stock: 25 },
      ],
    },
    {
      slug: "all-product-heritage-combo",
      name: "Y.G Complete Heritage Asafoetida Combo",
      tagline: "Grand All-in-One Collection Box with Spoon & Notes",
      format: "combo",
      gluten_free: 0,
      bestseller: 1,
      image: "/products/all-product/img-1.jpg",
      gallery: JSON.stringify(["/products/all-product/img-1.jpg"]),
      description: "Grand all-in-one tasting experience box with brass spoon.",
      ingredients: "Contains: Gold Powder, Cake, Pellets, Chips, Brass Spoon.",
      usage: "The ultimate culinary gift for gourmet cooks.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.8,
      reviews: 124,
      variants: [
        { id: "4in1", label: "4-in-1 Heritage Box", price: 999, mrp: 1299, stock: 50 },
        { id: "deluxe", label: "Deluxe Hamper Box", price: 1799, mrp: 2299, stock: 30 },
      ],
    },
    {
      slug: "traditional-health-mix",
      name: "Y.G Traditional Health Mix (Sathu Maavu)",
      tagline: "18 Multigrain Energy Porridge with Millets, Pulses & Nuts",
      format: "wellness",
      gluten_free: 0,
      bestseller: 1,
      image: "/products/traditional-health-mix/img-1.jpg",
      gallery: JSON.stringify(["/products/traditional-health-mix/img-1.jpg"]),
      description: "Handcrafted traditional Sathu Maavu multigrain porridge mix with 18 roasted grains.",
      ingredients: "Ragi, Kambu, Red Rice, Roasted Gram, Green Gram, Wheat, Almonds, Cashews, Cardamom.",
      usage: "Mix 2 tbsp in 250ml water or milk, simmer for 3-5 minutes.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.7,
      reviews: 115,
      variants: [
        { id: "200g", label: "200 g", price: 140, mrp: 165, stock: 90 },
        { id: "500g", label: "500 g", price: 320, mrp: 380, stock: 65 },
      ],
    },
    {
      slug: "pure-benzoin-sambrani",
      name: "Y.G Pure Natural Benzoin (Pooja Sambrani)",
      tagline: "Sacred Temple Loban Resin for Puja & Daily Fragrance",
      format: "pooja",
      gluten_free: 1,
      bestseller: 1,
      image: "/products/pure-benzoin-sambrani/img-1.png",
      gallery: JSON.stringify(["/products/pure-benzoin-sambrani/img-1.png"]),
      description: "Pure natural Benzoin resin (Loban / Paal Sambrani) with authentic temple aroma.",
      ingredients: "100% Pure Natural Benzoin Resin (Styrax benzoin).",
      usage: "Sprinkle onto glowing charcoal or dhoop burner.",
      shelf_life: "12 months from packing. Store in a dry place.",
      in_stock: 1,
      stock_left: null,
      rating: 4.8,
      reviews: 89,
      variants: [
        { id: "25g", label: "25 g", price: 85, mrp: 100, stock: 120 },
        { id: "50g", label: "50 g", price: 160, mrp: 190, stock: 95 },
        { id: "100g", label: "100 g", price: 290, mrp: 350, stock: 50 },
      ],
    },
    {
      slug: "black-sesame-seeds",
      name: "Y.G Pure Black Sesame (Karuppu Ellu)",
      tagline: "Traditional Sun-Dried High-Calcium Black Sesame Seeds",
      format: "wellness",
      gluten_free: 1,
      bestseller: 1,
      image: "/products/black-sesame-seeds/img-1.jpg",
      gallery: JSON.stringify(["/products/black-sesame-seeds/img-1.jpg"]),
      description: "Sun-dried South Indian Black Sesame (Karuppu Ellu) rich in natural calcium.",
      ingredients: "100% Pure Natural Black Sesame Seeds.",
      usage: "Dry roast for ellu sadam or consume with palm jaggery.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.6,
      reviews: 72,
      variants: [
        { id: "200g", label: "200 g", price: 95, mrp: 120, stock: 100 },
        { id: "500g", label: "500 g", price: 220, mrp: 270, stock: 60 },
      ],
    },
    {
      slug: "traditional-idli-podi",
      name: "Y.G Traditional Idli Chutney Podi",
      tagline: "Artisanal Wood-Roasted Gunpowder with Pure Hing & Lentils",
      format: "powder",
      gluten_free: 0,
      bestseller: 1,
      image: "/products/traditional-idli-podi/img-1.jpg",
      gallery: JSON.stringify(["/products/traditional-idli-podi/img-1.jpg"]),
      description: "Grandmother's heritage recipe of slow-roasted lentils, chillies, and pure hing.",
      ingredients: "Urad Dal, Chana Dal, Dry Red Chillies, Sesame, Curry Leaves, Hing, Rock Salt.",
      usage: "Mix with hot melted A2 ghee.",
      shelf_life: "12 months from packing. Keep jar sealed.",
      in_stock: 1,
      stock_left: null,
      rating: 4.7,
      reviews: 138,
      variants: [
        { id: "200g", label: "200 g", price: 135, mrp: 160, stock: 110 },
        { id: "500g", label: "500 g", price: 310, mrp: 360, stock: 75 },
      ],
    },
    {
      slug: "millet-pongal-mix",
      name: "Y.G Traditional Millet Pongal Mix",
      tagline: "Nutrient-Dense Wholesome Foxtail & Little Millet Breakfast Blend",
      format: "wellness",
      gluten_free: 1,
      bestseller: 1,
      image: "/products/millet-pongal-mix/img-1.jpg",
      gallery: JSON.stringify(["/products/millet-pongal-mix/img-1.jpg"]),
      description: "Low-glycemic breakfast blend of unpolished millets, moong dal, pepper, cashews.",
      ingredients: "Foxtail Millet, Little Millet, Moong Dal, Black Pepper, Cashews, Ginger, Hing, Salt.",
      usage: "Pressure cook 1 cup mix with 3.5 cups water for 3 whistles.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.5,
      reviews: 54,
      variants: [
        { id: "250g", label: "250 g", price: 125, mrp: 150, stock: 85 },
        { id: "500g", label: "500 g", price: 235, mrp: 280, stock: 55 },
      ],
    },
    {
      slug: "millet-sambar-mix",
      name: "Y.G Traditional Millet Sambar Rice Mix",
      tagline: "Authentic Tirunelveli Sambar Rice with Ancient Millets & Spices",
      format: "wellness",
      gluten_free: 0,
      bestseller: 1,
      image: "/products/millet-sambar-mix/img-1.jpg",
      gallery: JSON.stringify(["/products/millet-sambar-mix/img-1.jpg"]),
      description: "One-pot South Indian comfort food with Kodo and Barnyard millets and toor dal.",
      ingredients: "Kodo Millet, Barnyard Millet, Toor Dal, Roasted Spices, Tamarind, Hing, Rock Salt.",
      usage: "Cook 1 cup mix with 4 cups boiling water in pressure cooker for 3 whistles.",
      shelf_life: "12 months from packing. Store in an airtight container.",
      in_stock: 1,
      stock_left: null,
      rating: 4.6,
      reviews: 49,
      variants: [
        { id: "250g", label: "250 g", price: 130, mrp: 155, stock: 90 },
        { id: "500g", label: "500 g", price: 245, mrp: 290, stock: 60 },
      ],
    },
  ];

  const insertProduct = db.prepare(`
    INSERT OR REPLACE INTO products (
      slug, name, tagline, format, gluten_free, bestseller, image, gallery,
      description, ingredients, usage, shelf_life, in_stock, stock_left,
      rating, reviews, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertVariant = db.prepare(`
    INSERT OR REPLACE INTO product_variants (
      id, product_slug, label, price, mrp, stock, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const p of initialProducts) {
    insertProduct.run(
      p.slug,
      p.name,
      p.tagline,
      p.format,
      p.gluten_free,
      p.bestseller,
      p.image,
      p.gallery,
      p.description,
      p.ingredients,
      p.usage,
      p.shelf_life,
      p.in_stock,
      p.stock_left,
      p.rating,
      p.reviews,
      now,
      now
    );

    let sortOrder = 0;
    for (const v of p.variants) {
      insertVariant.run(v.id, p.slug, v.label, v.price, v.mrp ?? null, v.stock ?? 50, sortOrder++);
    }
  }

  // Promos
  const initialPromos = [
    { code: "HERITAGE10", label: "10% off", description: "10% off your order.", percent_off: 10, amount_off: null, min_subtotal: null, free_shipping: 0, automatic: 0 },
    { code: "HING50", label: "₹50 off", description: "₹50 off orders above ₹399.", percent_off: null, amount_off: 50, min_subtotal: 399, free_shipping: 0, automatic: 0 },
    { code: "FREESHIP", label: "Free shipping", description: "Free delivery on any order.", percent_off: null, amount_off: null, min_subtotal: null, free_shipping: 1, automatic: 0 },
    { code: "BULK15", label: "15% off ₹999+", description: "Automatic 15% off over ₹999.", percent_off: 15, amount_off: null, min_subtotal: 999, free_shipping: 0, automatic: 1 },
  ];

  const insertPromo = db.prepare(`
    INSERT OR REPLACE INTO promos (
      code, label, description, percent_off, amount_off, min_subtotal,
      free_shipping, automatic, is_active, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
  `);

  for (const pr of initialPromos) {
    insertPromo.run(pr.code, pr.label, pr.description, pr.percent_off, pr.amount_off, pr.min_subtotal, pr.free_shipping, pr.automatic, now);
  }
}
