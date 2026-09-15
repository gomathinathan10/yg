import fs from "node:fs";
import path from "node:path";
import type { Address, OrderItem, OrderTotals, Resolution } from "@/lib/orders";

export type FullOrder = {
  id: string;
  createdAt: number;
  email: string;
  phone: string;
  items: OrderItem[];
  totals: OrderTotals;
  promoCode?: string | null;
  address: Address;
  payment: string;
  delivery: "standard" | "express";
  status: string;
  notes?: string | null;
  gift: boolean;
  giftMessage?: string | null;
  resolution?: Resolution | null;
};

export type DbProductVariant = {
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
  variants?: DbProductVariant[];
};

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

export type DbQuestion = {
  id: string;
  slug: string;
  question: string;
  answer: string | null;
  asked_by: string;
  answered_by: string | null;
  created_at: number;
  answered_at: number | null;
  status: "pending" | "published";
};

export type DbTicket = {
  id: string;
  topic: string;
  order_id: string | null;
  contact: string;
  message: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  reply: string | null;
  created_at: number;
  updated_at: number;
};

export type DbStockAlert = {
  id: string;
  slug: string;
  contact: string;
  created_at: number;
  notified: number;
};

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

export type StoreData = {
  products: DbProduct[];
  product_variants: DbProductVariant[];
  orders: Array<{
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
  }>;
  order_items: Array<{
    id: string;
    order_id: string;
    slug: string;
    variant_id: string;
    name: string;
    variant_label: string;
    image: string;
    qty: number;
    price: number;
  }>;
  reviews: DbReview[];
  questions: DbQuestion[];
  tickets: DbTicket[];
  stock_alerts: DbStockAlert[];
  promos: DbPromo[];
  recipes: unknown[];
};

const DEFAULT_SEED_REVIEWS: DbReview[] = [
  {
    id: "rev-seed-1",
    slug: "gold-asafoetida-powder",
    rating: 5,
    title: "Incomparable Traditional Aroma",
    comment: "Just a pinch transforms the rasam and sambar completely. Unmatched authenticity and freshness. Truly heritage quality!",
    name: "Meenakshi Sundaram",
    city: "Chennai",
    email: null,
    phone: null,
    contact_opt_in: 1,
    created_at: Date.now() - 3 * 86400000,
    status: "published",
  },
  {
    id: "rev-seed-2",
    slug: "gold-asafoetida-powder",
    rating: 5,
    title: "Best Hing in South India",
    comment: "We have been using Y.G for three generations. The gold powder has that deep, rounded compound aroma without any bitter aftertaste.",
    name: "Venkatesh Raghavan",
    city: "Tirunelveli",
    email: null,
    phone: null,
    contact_opt_in: 1,
    created_at: Date.now() - 9 * 86400000,
    status: "published",
  },
  {
    id: "rev-seed-3",
    slug: "gold-asafoetida-powder",
    rating: 5,
    title: "Airtight packaging is excellent",
    comment: "Arrived fresh and tightly sealed. Dissolves seamlessly in hot ghee tempering.",
    name: "Ananya Sharma",
    city: "Bengaluru",
    email: null,
    phone: null,
    contact_opt_in: 0,
    created_at: Date.now() - 15 * 86400000,
    status: "published",
  },
  {
    id: "rev-seed-4",
    slug: "gluten-free-asafoetida-powder",
    rating: 5,
    title: "Life-saver for Celiac Diet",
    comment: "Finally an authentic hing without wheat flour or maida. Clean aroma, pure taste, and completely gut-friendly.",
    name: "Dr. Shalini Rao",
    city: "Hyderabad",
    email: null,
    phone: null,
    contact_opt_in: 1,
    created_at: Date.now() - 5 * 86400000,
    status: "published",
  },
];

const DEFAULT_SEED_QUESTIONS: DbQuestion[] = [
  {
    id: "q-seed-1",
    slug: "gold-asafoetida-powder",
    question: "How should I store the asafoetida powder to preserve the aroma?",
    answer: "Keep in the airtight container provided, away from direct moisture and sunlight. Do not keep open next to other spices as its aroma is very potent.",
    asked_by: "Kavitha S.",
    answered_by: "Y.G Quality Team",
    created_at: Date.now() - 20 * 86400000,
    answered_at: Date.now() - 19 * 86400000,
    status: "published",
  },
  {
    id: "q-seed-2",
    slug: "gold-asafoetida-powder",
    question: "How much powder is recommended per serving of sambar or dal?",
    answer: "A pinch (approx. 1/8 to 1/4 teaspoon) tempered in hot ghee or sesame oil is sufficient for 4-6 servings.",
    asked_by: "Ramesh P.",
    answered_by: "Y.G Culinary Advisor",
    created_at: Date.now() - 14 * 86400000,
    answered_at: Date.now() - 13 * 86400000,
    status: "published",
  },
  {
    id: "q-seed-3",
    slug: "gluten-free-asafoetida-powder",
    question: "Does this contain any traces of wheat or gluten-bearing starches?",
    answer: "No. Our gluten-free asafoetida is formulated using non-gluten starches and processed on dedicated, tested equipment.",
    asked_by: "Deepa N.",
    answered_by: "Y.G Quality Assurance",
    created_at: Date.now() - 10 * 86400000,
    answered_at: Date.now() - 9 * 86400000,
    status: "published",
  },
];

class JsonStore {
  private filePath: string;
  private data: StoreData | null = null;

  constructor() {
    this.filePath = path.resolve(process.cwd(), "data", "yg_store.json");
  }

  private ensureLoaded(): StoreData {
    if (this.data) return this.data;
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        this.data = JSON.parse(raw) as StoreData;
      }
    } catch (err) {
      console.error("Failed to read yg_store.json:", err);
    }

    if (!this.data) {
      this.data = {
        products: [],
        product_variants: [],
        orders: [],
        order_items: [],
        reviews: [],
        questions: [],
        tickets: [],
        stock_alerts: [],
        promos: [],
        recipes: [],
      };
    }

    // Seed default reviews & questions if empty
    let dirty = false;
    if (!this.data.reviews || this.data.reviews.length === 0) {
      this.data.reviews = DEFAULT_SEED_REVIEWS;
      dirty = true;
    }
    if (!this.data.questions || this.data.questions.length === 0) {
      this.data.questions = DEFAULT_SEED_QUESTIONS;
      dirty = true;
    }
    if (!this.data.tickets) {
      this.data.tickets = [];
      dirty = true;
    }
    if (!this.data.orders) {
      this.data.orders = [];
      dirty = true;
    }
    if (!this.data.order_items) {
      this.data.order_items = [];
      dirty = true;
    }
    if (!this.data.stock_alerts) {
      this.data.stock_alerts = [];
      dirty = true;
    }
    if (!this.data.promos) {
      this.data.promos = [];
      dirty = true;
    }

    if (dirty) {
      this.save();
    }

    return this.data;
  }

  private save(): void {
    if (!this.data) return;
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const tmpPath = `${this.filePath}.tmp.${Date.now()}`;
      fs.writeFileSync(tmpPath, JSON.stringify(this.data, null, 2), "utf-8");
      fs.renameSync(tmpPath, this.filePath);
    } catch (err) {
      console.error("Failed to save yg_store.json:", err);
    }
  }

  // ==================== PRODUCTS ====================
  listProducts(): DbProduct[] {
    const data = this.ensureLoaded();
    const variantsBySlug = new Map<string, DbProductVariant[]>();
    for (const v of data.product_variants || []) {
      const list = variantsBySlug.get(v.product_slug) || [];
      list.push(v);
      variantsBySlug.set(v.product_slug, list);
    }

    return (data.products || []).map((p) => {
      const variants = (variantsBySlug.get(p.slug) || []).sort(
        (a, b) => a.sort_order - b.sort_order
      );
      return { ...p, variants };
    });
  }

  getProduct(slug: string): DbProduct | null {
    const target = slug.trim().toLowerCase();
    const all = this.listProducts();
    return all.find((p) => p.slug.toLowerCase() === target) || null;
  }

  saveProduct(input: {
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
  }): DbProduct {
    const data = this.ensureLoaded();
    const now = Date.now();
    const existingIndex = data.products.findIndex((p) => p.slug === input.slug);

    const productRecord: DbProduct = {
      slug: input.slug,
      name: input.name,
      tagline: input.tagline,
      format: input.format,
      gluten_free: input.glutenFree ? 1 : 0,
      bestseller: input.bestseller ? 1 : 0,
      image: input.image,
      gallery: JSON.stringify(input.gallery),
      description: input.description,
      ingredients: input.ingredients,
      usage: input.usage,
      shelf_life: input.shelfLife || "12 months from packing.",
      in_stock: input.inStock ? 1 : 0,
      stock_left: input.stockLeft ?? null,
      rating: input.rating ?? (existingIndex >= 0 ? data.products[existingIndex]!.rating : 4.8),
      reviews: input.reviews ?? (existingIndex >= 0 ? data.products[existingIndex]!.reviews : 50),
      created_at: existingIndex >= 0 ? data.products[existingIndex]!.created_at : now,
      updated_at: now,
    };

    if (existingIndex >= 0) {
      data.products[existingIndex] = productRecord;
    } else {
      data.products.push(productRecord);
    }

    // Update variants
    data.product_variants = (data.product_variants || []).filter(
      (v) => v.product_slug !== input.slug
    );
    input.variants.forEach((v, idx) => {
      data.product_variants.push({
        id: v.id,
        product_slug: input.slug,
        label: v.label,
        price: v.price,
        mrp: v.mrp ?? null,
        stock: v.stock ?? 50,
        sort_order: idx,
      });
    });

    this.save();
    return this.getProduct(input.slug)!;
  }

  toggleProductStock(slug: string, inStock: boolean, stockLeft?: number | null): boolean {
    const data = this.ensureLoaded();
    const p = data.products.find((prod) => prod.slug === slug);
    if (!p) return false;
    p.in_stock = inStock ? 1 : 0;
    p.stock_left = stockLeft ?? null;
    p.updated_at = Date.now();
    this.save();
    return true;
  }

  deleteProduct(slug: string): boolean {
    const data = this.ensureLoaded();
    const p = data.products.find((prod) => prod.slug === slug);
    if (!p) return false;
    p.in_stock = 0;
    p.stock_left = 0;
    p.updated_at = Date.now();
    this.save();
    return true;
  }

  // ==================== ORDERS ====================
  listOrders(): FullOrder[] {
    const data = this.ensureLoaded();
    const itemsByOrder = new Map<string, OrderItem[]>();
    for (const item of data.order_items || []) {
      const list = itemsByOrder.get(item.order_id) || [];
      list.push({
        slug: item.slug,
        variantId: item.variant_id,
        name: item.name,
        variantLabel: item.variant_label,
        image: item.image,
        qty: item.qty,
        price: item.price,
      });
      itemsByOrder.set(item.order_id, list);
    }

    return (data.orders || [])
      .map((row) => {
        let address: Address;
        try {
          address = JSON.parse(row.address_json);
        } catch {
          address = {
            id: `addr_${row.id}`,
            label: "Home",
            firstName: "Customer",
            lastName: "",
            line1: "",
            city: "",
            state: "",
            pin: "",
            phone: row.phone,
          };
        }

        let resolution: Resolution | null = null;
        if (row.resolution_json) {
          try {
            resolution = JSON.parse(row.resolution_json);
          } catch {
            resolution = null;
          }
        }

        const totals: OrderTotals = {
          subtotal: row.subtotal,
          discount: row.discount,
          shipping: row.shipping,
          giftWrap: row.gift_wrap,
          codFee: row.cod_fee,
          total: row.total,
        };

        const full: FullOrder = {
          id: row.id,
          createdAt: row.created_at,
          email: row.email,
          phone: row.phone,
          items: itemsByOrder.get(row.id) || [],
          totals,
          promoCode: row.promo_code,
          address,
          payment: row.payment,
          delivery: row.delivery,
          status: row.status,
          notes: row.notes,
          gift: row.gift === 1,
          giftMessage: row.gift_message,
          resolution,
        };
        return full;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  getOrder(id: string, verifyEmailOrPhone?: string): FullOrder | null {
    const target = id.trim().toUpperCase();
    const all = this.listOrders();
    const found = all.find((o) => o.id.toUpperCase() === target);
    if (!found) return null;

    if (verifyEmailOrPhone) {
      const v = verifyEmailOrPhone.trim().toLowerCase();
      const matchEmail = found.email.trim().toLowerCase() === v;
      const matchPhone = found.phone.trim().replace(/\D/g, "") === v.replace(/\D/g, "");
      if (!matchEmail && !matchPhone) return null;
    }

    return found;
  }

  getOrdersByCustomer(query: string): FullOrder[] {
    const q = query.trim().toLowerCase();
    const cleanQ = q.replace(/\D/g, "");
    const all = this.listOrders();
    return all.filter((o) => {
      const emailMatch = o.email.toLowerCase().includes(q);
      const phoneMatch = cleanQ.length >= 6 && o.phone.replace(/\D/g, "").includes(cleanQ);
      return emailMatch || phoneMatch;
    });
  }

  createOrder(input: {
    id?: string;
    email: string;
    phone: string;
    items: OrderItem[];
    totals: OrderTotals;
    promoCode?: string | null;
    address: Address;
    payment: string;
    delivery: "standard" | "express";
    status?: string;
    notes?: string | null;
    gift?: boolean;
    giftMessage?: string | null;
    resolution?: Resolution | null;
  }): FullOrder {
    const data = this.ensureLoaded();
    const id = input.id || `YG${Math.floor(100000 + Math.random() * 899999)}`;
    const now = Date.now();

    data.orders.unshift({
      id,
      created_at: now,
      email: input.email.trim(),
      phone: input.phone.trim(),
      subtotal: input.totals.subtotal,
      discount: input.totals.discount,
      shipping: input.totals.shipping,
      gift_wrap: input.totals.giftWrap,
      cod_fee: input.totals.codFee,
      total: input.totals.total,
      promo_code: input.promoCode ?? null,
      address_json: JSON.stringify(input.address),
      payment: input.payment,
      delivery: input.delivery,
      status: input.status || "confirmed",
      notes: input.notes ?? null,
      gift: input.gift ? 1 : 0,
      gift_message: input.giftMessage ?? null,
      resolution_json: input.resolution ? JSON.stringify(input.resolution) : null,
      updated_at: now,
    });

    for (const item of input.items) {
      data.order_items.push({
        id: `oi_${Math.random().toString(36).slice(2, 9)}`,
        order_id: id,
        slug: item.slug,
        variant_id: item.variantId,
        name: item.name,
        variant_label: item.variantLabel,
        image: item.image,
        qty: item.qty,
        price: item.price,
      });

      // Decrement variant stock
      const variant = data.product_variants.find(
        (v) => v.product_slug === item.slug && v.id === item.variantId
      );
      if (variant && variant.stock > 0) {
        variant.stock = Math.max(0, variant.stock - item.qty);
      }
    }

    this.save();
    return this.getOrder(id)!;
  }

  updateOrderStatus(id: string, status: string): boolean {
    const data = this.ensureLoaded();
    const order = data.orders.find((o) => o.id.toUpperCase() === id.trim().toUpperCase());
    if (!order) return false;
    order.status = status;
    order.updated_at = Date.now();
    this.save();
    return true;
  }

  updateOrderResolution(id: string, resolution: Resolution): boolean {
    const data = this.ensureLoaded();
    const order = data.orders.find((o) => o.id.toUpperCase() === id.trim().toUpperCase());
    if (!order) return false;
    order.resolution_json = JSON.stringify(resolution);
    if (resolution.type === "cancellation") {
      order.status = "cancelled";
    }
    order.updated_at = Date.now();
    this.save();
    return true;
  }

  deleteOrder(id: string): boolean {
    const data = this.ensureLoaded();
    const target = id.trim().toUpperCase();
    const initLen = data.orders.length;
    data.orders = data.orders.filter((o) => o.id.toUpperCase() !== target);
    data.order_items = data.order_items.filter((item) => item.order_id.toUpperCase() !== target);
    const deleted = data.orders.length < initLen;
    if (deleted) this.save();
    return deleted;
  }

  clearAllOrders(): boolean {
    const data = this.ensureLoaded();
    data.orders = [];
    data.order_items = [];
    this.save();
    return true;
  }

  // ==================== REVIEWS ====================
  listReviews(slug?: string, status?: "pending" | "published" | "rejected" | "all"): DbReview[] {
    const data = this.ensureLoaded();
    return (data.reviews || [])
      .filter((r) => {
        if (slug && r.slug !== slug) return false;
        if (status && status !== "all" && r.status !== status) return false;
        return true;
      })
      .sort((a, b) => b.created_at - a.created_at);
  }

  createReview(input: {
    slug: string;
    rating: number;
    title: string;
    comment: string;
    name: string;
    city?: string | null;
    email?: string | null;
    phone?: string | null;
    contactOptIn?: boolean;
    status?: "pending" | "published";
  }): DbReview {
    const data = this.ensureLoaded();
    const review: DbReview = {
      id: `rev_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      slug: input.slug,
      rating: Math.max(1, Math.min(5, Number(input.rating) || 5)),
      title: input.title.trim(),
      comment: input.comment.trim(),
      name: input.name.trim() || "Customer",
      city: input.city?.trim() || null,
      email: input.email?.trim() || null,
      phone: input.phone?.trim() || null,
      contact_opt_in: input.contactOptIn ? 1 : 0,
      created_at: Date.now(),
      status: input.status || "published",
    };

    data.reviews.unshift(review);

    // Update product rating and reviews count
    const publishedForSlug = data.reviews.filter(
      (r) => r.slug === input.slug && r.status === "published"
    );
    const prod = data.products.find((p) => p.slug === input.slug);
    if (prod && publishedForSlug.length > 0) {
      const sum = publishedForSlug.reduce((acc, r) => acc + r.rating, 0);
      prod.rating = Number((sum / publishedForSlug.length).toFixed(1));
      prod.reviews = publishedForSlug.length;
    }

    this.save();
    return review;
  }

  updateReviewStatus(id: string, status: "pending" | "published" | "rejected"): boolean {
    const data = this.ensureLoaded();
    const r = data.reviews.find((rev) => rev.id === id);
    if (!r) return false;
    r.status = status;

    // Recalculate product rating
    const prod = data.products.find((p) => p.slug === r.slug);
    const published = data.reviews.filter((rev) => rev.slug === r.slug && rev.status === "published");
    if (prod) {
      if (published.length > 0) {
        const sum = published.reduce((acc, rev) => acc + rev.rating, 0);
        prod.rating = Number((sum / published.length).toFixed(1));
        prod.reviews = published.length;
      }
    }

    this.save();
    return true;
  }

  deleteReview(id: string): boolean {
    const data = this.ensureLoaded();
    const initLen = data.reviews.length;
    data.reviews = data.reviews.filter((r) => r.id !== id);
    const deleted = data.reviews.length < initLen;
    if (deleted) this.save();
    return deleted;
  }

  // ==================== QUESTIONS ====================
  listQuestions(slug?: string, status?: "pending" | "published" | "all"): DbQuestion[] {
    const data = this.ensureLoaded();
    return (data.questions || [])
      .filter((q) => {
        if (slug && q.slug !== slug) return false;
        if (status && status !== "all" && q.status !== status) return false;
        return true;
      })
      .sort((a, b) => b.created_at - a.created_at);
  }

  createQuestion(input: {
    slug: string;
    question: string;
    askedBy: string;
  }): DbQuestion {
    const data = this.ensureLoaded();
    const q: DbQuestion = {
      id: `q_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      slug: input.slug,
      question: input.question.trim(),
      answer: null,
      asked_by: input.askedBy.trim() || "Customer",
      answered_by: null,
      created_at: Date.now(),
      answered_at: null,
      status: "published", // Default published for responsive community experience
    };
    data.questions.unshift(q);
    this.save();
    return q;
  }

  answerQuestion(id: string, answer: string, answeredBy = "Y.G Culinary Expert"): boolean {
    const data = this.ensureLoaded();
    const q = data.questions.find((quest) => quest.id === id);
    if (!q) return false;
    q.answer = answer.trim();
    q.answered_by = answeredBy;
    q.answered_at = Date.now();
    q.status = "published";
    this.save();
    return true;
  }

  deleteQuestion(id: string): boolean {
    const data = this.ensureLoaded();
    const initLen = data.questions.length;
    data.questions = data.questions.filter((q) => q.id !== id);
    const deleted = data.questions.length < initLen;
    if (deleted) this.save();
    return deleted;
  }

  // ==================== TICKETS ====================
  listTickets(status?: string): DbTicket[] {
    const data = this.ensureLoaded();
    return (data.tickets || [])
      .filter((t) => {
        if (status && status !== "all" && t.status !== status) return false;
        return true;
      })
      .sort((a, b) => b.created_at - a.created_at);
  }

  createTicket(input: {
    topic: string;
    orderId?: string | null;
    contact: string;
    message: string;
  }): DbTicket {
    const data = this.ensureLoaded();
    const now = Date.now();
    const ticket: DbTicket = {
      id: `TKT${Math.floor(10000 + Math.random() * 89999)}`,
      topic: input.topic.trim(),
      order_id: input.orderId?.trim() || null,
      contact: input.contact.trim(),
      message: input.message.trim(),
      status: "open",
      reply: null,
      created_at: now,
      updated_at: now,
    };
    data.tickets.unshift(ticket);
    this.save();
    return ticket;
  }

  updateTicket(
    id: string,
    status: "open" | "in_progress" | "resolved" | "closed",
    reply?: string | null
  ): boolean {
    const data = this.ensureLoaded();
    const t = data.tickets.find((tick) => tick.id === id);
    if (!t) return false;
    t.status = status;
    if (reply !== undefined) t.reply = reply;
    t.updated_at = Date.now();
    this.save();
    return true;
  }

  // ==================== STOCK ALERTS ====================
  listStockAlerts(slug?: string): DbStockAlert[] {
    const data = this.ensureLoaded();
    return (data.stock_alerts || [])
      .filter((a) => (slug ? a.slug === slug : true))
      .sort((a, b) => b.created_at - a.created_at);
  }

  createStockAlert(slug: string, contact: string): DbStockAlert {
    const data = this.ensureLoaded();
    const existing = (data.stock_alerts || []).find(
      (a) => a.slug === slug && a.contact.toLowerCase() === contact.trim().toLowerCase()
    );
    if (existing) return existing;

    const alert: DbStockAlert = {
      id: `alt_${Date.now().toString(36)}`,
      slug,
      contact: contact.trim(),
      created_at: Date.now(),
      notified: 0,
    };
    data.stock_alerts.unshift(alert);
    this.save();
    return alert;
  }

  markAlertNotified(id: string): boolean {
    const data = this.ensureLoaded();
    const alert = (data.stock_alerts || []).find((a) => a.id === id);
    if (!alert) return false;
    alert.notified = 1;
    this.save();
    return true;
  }

  // ==================== PROMOS ====================
  listPromos(activeOnly = false): DbPromo[] {
    const data = this.ensureLoaded();
    return (data.promos || []).filter((p) => (activeOnly ? p.is_active === 1 : true));
  }

  getPromo(code: string): DbPromo | null {
    const data = this.ensureLoaded();
    const target = code.trim().toUpperCase();
    return (data.promos || []).find((p) => p.code.toUpperCase() === target) || null;
  }

  savePromo(input: {
    code: string;
    label: string;
    description: string;
    percentOff?: number | null;
    amountOff?: number | null;
    minSubtotal?: number | null;
    freeShipping?: boolean;
    automatic?: boolean;
    isActive?: boolean;
  }): DbPromo {
    const data = this.ensureLoaded();
    const code = input.code.trim().toUpperCase();
    const existingIdx = data.promos.findIndex((p) => p.code.toUpperCase() === code);

    const promo: DbPromo = {
      code,
      label: input.label.trim(),
      description: input.description.trim(),
      percent_off: input.percentOff ?? null,
      amount_off: input.amountOff ?? null,
      min_subtotal: input.minSubtotal ?? null,
      free_shipping: input.freeShipping ? 1 : 0,
      automatic: input.automatic ? 1 : 0,
      is_active: input.isActive !== false ? 1 : 0,
      created_at: existingIdx >= 0 ? data.promos[existingIdx]!.created_at : Date.now(),
    };

    if (existingIdx >= 0) {
      data.promos[existingIdx] = promo;
    } else {
      data.promos.push(promo);
    }

    this.save();
    return promo;
  }

  togglePromo(code: string, isActive: boolean): boolean {
    const data = this.ensureLoaded();
    const p = data.promos.find((pr) => pr.code.toUpperCase() === code.trim().toUpperCase());
    if (!p) return false;
    p.is_active = isActive ? 1 : 0;
    this.save();
    return true;
  }

  deletePromo(code: string): boolean {
    const data = this.ensureLoaded();
    const initLen = data.promos.length;
    data.promos = data.promos.filter((p) => p.code.toUpperCase() !== code.trim().toUpperCase());
    const deleted = data.promos.length < initLen;
    if (deleted) this.save();
    return deleted;
  }

  // ==================== ANALYTICS ====================
  getDashboardStats() {
    const orders = this.listOrders();
    const products = this.listProducts();
    const reviews = this.listReviews(undefined, "all");
    const questions = this.listQuestions(undefined, "all");
    const tickets = this.listTickets("all");
    const alerts = this.listStockAlerts();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTodayMs = startOfToday.getTime();

    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + (o.totals?.total || 0), 0);

    const ordersPlacedToday = orders.filter((o) => o.createdAt >= startOfTodayMs).length;

    const ordersByStatus: Record<string, number> = {
      placed: 0,
      confirmed: 0,
      packed: 0,
      shipped: 0,
      out: 0,
      delivered: 0,
      cancelled: 0,
      refund_requested: 0,
      refunded: 0,
    };

    for (const o of orders) {
      const s = (o.status || "confirmed").toLowerCase();
      ordersByStatus[s] = (ordersByStatus[s] ?? 0) + 1;
    }

    const pendingReviewsCount = reviews.filter((r) => r.status === "pending").length;
    const openQuestionsCount = questions.filter((q) => q.status === "pending" || !q.answer).length;
    const openTicketsCount = tickets.filter((t) => t.status === "open" || t.status === "in_progress").length;
    const stockAlertsCount = alerts.filter((a) => a.notified === 0).length;

    let lowStockProductsCount = 0;
    for (const p of products) {
      if (p.in_stock === 0) lowStockProductsCount++;
      else if (p.stock_left !== null && p.stock_left <= 10) lowStockProductsCount++;
      else if (p.variants?.some((v) => v.stock <= 10)) lowStockProductsCount++;
    }

    const recentOrders = orders.slice(0, 6).map((o) => ({
      id: o.id,
      createdAt: o.createdAt,
      email: o.email,
      total: o.totals?.total || 0,
      status: o.status,
      itemCount: o.items?.length || 1,
    }));

    const recentSalesTrend: Array<{ date: string; revenue: number; orders: number }> = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime();
      const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime();

      const dayOrders = orders.filter((o) => o.createdAt >= dayStart && o.createdAt <= dayEnd);
      const dayRev = dayOrders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, o) => sum + (o.totals?.total || 0), 0);

      const dateLabel = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      recentSalesTrend.push({
        date: dateLabel,
        revenue: dayRev,
        orders: dayOrders.length,
      });
    }

    return {
      totalRevenue,
      totalOrders,
      ordersPlacedToday,
      pendingReviewsCount,
      openQuestionsCount,
      openTicketsCount,
      lowStockProductsCount,
      stockAlertsCount,
      ordersByStatus,
      recentOrders,
      recentSalesTrend,
    };
  }
}

export const store = new JsonStore();
