import { store } from "./db/store";
import { TRADE_PRODUCTS, PRICE_TIERS } from "@/data/trade-pricing";
import { verifyAdminCredentials, getAdminToken, isValidAdminToken } from "./auth";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
    },
  });
}

function requireAdmin(request: Request): boolean {
  return isValidAdminToken(request.headers.get("x-admin-token"));
}

async function parseBody<T>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

export async function handleApiRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();

  if (!path.startsWith("/api/")) {
    return null;
  }

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "access-control-allow-headers": "content-type, x-admin-token",
      },
    });
  }

  try {
    // GET /api/health
    if (path === "/api/health" && method === "GET") {
      return json({ ok: true, timestamp: Date.now() });
    }


    // ==================== ADMIN AUTH ====================
    // POST /api/admin/login
    if (path === "/api/admin/login" && method === "POST") {
      const body = await parseBody<{ username: string; password: string }>(request);
      if (!body || !verifyAdminCredentials(body.username || "", body.password || "")) {
        return json({ ok: false, error: "Invalid username or password" }, 401);
      }
      return json({ ok: true, token: getAdminToken() });
    }

    // ==================== ANALYTICS ====================
    if (path === "/api/analytics" && method === "GET") {
      return json(store.getDashboardStats());
    }

    // ==================== ORDERS ====================
    // GET /api/orders/customer?q=...
    if (path === "/api/orders/customer" && method === "GET") {
      const q = url.searchParams.get("q") || "";
      return json(store.getOrdersByCustomer(q));
    }

    // GET /api/orders/:id
    const orderIdMatch = path.match(/^\/api\/orders\/([A-Za-z0-9_-]+)$/);
    if (orderIdMatch && method === "GET") {
      const id = orderIdMatch[1]!;
      const verify = url.searchParams.get("verify") || undefined;
      const order = store.getOrder(id, verify);
      if (!order) return json({ ok: false, error: "Order not found" }, 404);
      return json(order);
    }

    // PATCH /api/orders/:id/status
    const orderStatusMatch = path.match(/^\/api\/orders\/([A-Za-z0-9_-]+)\/status$/);
    if (orderStatusMatch && method === "PATCH") {
      const id = orderStatusMatch[1]!;
      const body = await parseBody<{ status: string }>(request);
      if (!body?.status) return json({ ok: false, error: "Status required" }, 400);
      const ok = store.updateOrderStatus(id, body.status);
      return json({ ok });
    }

    // POST /api/orders/:id/resolve
    const orderResolveMatch = path.match(/^\/api\/orders\/([A-Za-z0-9_-]+)\/resolve$/);
    if (orderResolveMatch && method === "POST") {
      const id = orderResolveMatch[1]!;
      const body = await parseBody<{ resolution: any }>(request);
      if (!body?.resolution) return json({ ok: false, error: "Resolution required" }, 400);
      const ok = store.updateOrderResolution(id, body.resolution);
      return json({ ok });
    }

    // DELETE /api/orders/:id
    if (orderIdMatch && method === "DELETE") {
      const id = orderIdMatch[1]!;
      const ok = store.deleteOrder(id);
      return json({ ok });
    }

    // GET /api/orders
    if (path === "/api/orders" && method === "GET") {
      return json(store.listOrders());
    }

    // POST /api/orders
    if (path === "/api/orders" && method === "POST") {
      const body = await parseBody<any>(request);
      if (!body?.email || !body?.items) {
        return json({ ok: false, error: "Missing required order fields" }, 400);
      }
      const order = store.createOrder(body);
      return json(order, 201);
    }

    // DELETE /api/orders (clear all)
    if (path === "/api/orders" && method === "DELETE") {
      const ok = store.clearAllOrders();
      return json({ ok });
    }

    // ==================== PRODUCTS ====================
    // POST /api/products/stock
    if (path === "/api/products/stock" && method === "POST") {
      if (!requireAdmin(request)) return json({ ok: false, error: "Unauthorized" }, 401);
      const body = await parseBody<{ slug: string; inStock: boolean; stockLeft?: number | null }>(request);
      if (!body?.slug) return json({ ok: false, error: "Slug required" }, 400);
      const ok = store.toggleProductStock(body.slug, body.inStock, body.stockLeft);
      return json({ ok });
    }

    // PATCH /api/products/:slug/status
    const prodStatusMatch = path.match(/^\/api\/products\/([A-Za-z0-9_-]+)\/status$/);
    if (prodStatusMatch && method === "PATCH") {
      if (!requireAdmin(request)) return json({ ok: false, error: "Unauthorized" }, 401);
      const slug = prodStatusMatch[1]!;
      const body = await parseBody<{ status: "active" | "draft" | "out_of_stock" | "hidden" }>(request);
      if (!body?.status) return json({ ok: false, error: "Status required" }, 400);
      const ok = store.setProductStatus(slug, body.status);
      return json({ ok });
    }

    // POST /api/products/:slug/restore
    const prodRestoreMatch = path.match(/^\/api\/products\/([A-Za-z0-9_-]+)\/restore$/);
    if (prodRestoreMatch && method === "POST") {
      if (!requireAdmin(request)) return json({ ok: false, error: "Unauthorized" }, 401);
      const ok = store.restoreProduct(prodRestoreMatch[1]!);
      return json({ ok });
    }

    // POST /api/products/reorder
    if (path === "/api/products/reorder" && method === "POST") {
      if (!requireAdmin(request)) return json({ ok: false, error: "Unauthorized" }, 401);
      const body = await parseBody<{ slugs: string[] }>(request);
      if (!Array.isArray(body?.slugs)) return json({ ok: false, error: "slugs array required" }, 400);
      const ok = store.reorderProducts(body.slugs);
      return json({ ok });
    }

    // GET /api/products/:slug
    const prodSlugMatch = path.match(/^\/api\/products\/([A-Za-z0-9_-]+)$/);
    if (prodSlugMatch && method === "GET") {
      const slug = prodSlugMatch[1]!;
      const product = store.getProduct(slug);
      if (!product) return json({ ok: false, error: "Product not found" }, 404);
      return json(product);
    }

    // DELETE /api/products/:slug (soft delete / archive)
    if (prodSlugMatch && method === "DELETE") {
      if (!requireAdmin(request)) return json({ ok: false, error: "Unauthorized" }, 401);
      const slug = prodSlugMatch[1]!;
      const ok = store.deleteProduct(slug);
      return json({ ok });
    }

    // GET /api/products
    if (path === "/api/products" && method === "GET") {
      const includeArchived = url.searchParams.get("includeArchived") === "1";
      return json(store.listProducts({ includeArchived }));
    }

    // GET /api/trade-pricing
    if (path === "/api/trade-pricing" && method === "GET") {
      return json({ ok: true, products: TRADE_PRODUCTS, tiers: PRICE_TIERS });
    }

    // POST /api/products (admin save)
    if (path === "/api/products" && method === "POST") {
      if (!requireAdmin(request)) return json({ ok: false, error: "Unauthorized" }, 401);
      const body = await parseBody<any>(request);
      if (!body?.slug || !body?.name) {
        return json({ ok: false, error: "Invalid product data" }, 400);
      }
      const product = store.saveProduct(body);
      return json(product);
    }

    // ==================== CATEGORIES ====================
    // GET /api/categories
    if (path === "/api/categories" && method === "GET") {
      return json(store.listCategories());
    }

    // POST /api/categories
    if (path === "/api/categories" && method === "POST") {
      if (!requireAdmin(request)) return json({ ok: false, error: "Unauthorized" }, 401);
      const body = await parseBody<{ slug?: string; name: string }>(request);
      if (!body?.name?.trim()) return json({ ok: false, error: "Category name required" }, 400);
      const category = store.saveCategory(body);
      return json({ ok: true, category });
    }

    // DELETE /api/categories/:slug?replacement=other-slug
    const categorySlugMatch = path.match(/^\/api\/categories\/([A-Za-z0-9_-]+)$/);
    if (categorySlugMatch && method === "DELETE") {
      if (!requireAdmin(request)) return json({ ok: false, error: "Unauthorized" }, 401);
      const slug = categorySlugMatch[1]!;
      const replacement = url.searchParams.get("replacement") || undefined;
      const result = store.deleteCategory(slug, replacement);
      return json(result, result.ok ? 200 : 409);
    }

    // ==================== REVIEWS ====================
    // PATCH /api/reviews/:id
    const revIdMatch = path.match(/^\/api\/reviews\/([A-Za-z0-9_-]+)$/);
    if (revIdMatch && method === "PATCH") {
      const id = revIdMatch[1]!;
      const body = await parseBody<{ status: "pending" | "published" | "rejected" }>(request);
      if (!body?.status) return json({ ok: false, error: "Status required" }, 400);
      const ok = store.updateReviewStatus(id, body.status);
      return json({ ok });
    }

    // DELETE /api/reviews/:id
    if (revIdMatch && method === "DELETE") {
      const id = revIdMatch[1]!;
      const ok = store.deleteReview(id);
      return json({ ok });
    }

    // GET /api/reviews
    if (path === "/api/reviews" && method === "GET") {
      const slug = url.searchParams.get("slug") || undefined;
      const status = (url.searchParams.get("status") as any) || undefined;
      return json(store.listReviews(slug, status));
    }

    // POST /api/reviews
    if (path === "/api/reviews" && method === "POST") {
      const body = await parseBody<any>(request);
      if (!body?.slug || !body?.rating || !body?.comment) {
        return json({ ok: false, error: "Missing review fields" }, 400);
      }
      const review = store.createReview(body);
      return json({ ok: true, review });
    }

    // ==================== QUESTIONS ====================
    // PATCH /api/questions/:id
    const qIdMatch = path.match(/^\/api\/questions\/([A-Za-z0-9_-]+)$/);
    if (qIdMatch && method === "PATCH") {
      const id = qIdMatch[1]!;
      const body = await parseBody<{ answer: string; answeredBy?: string }>(request);
      if (!body?.answer) return json({ ok: false, error: "Answer required" }, 400);
      const ok = store.answerQuestion(id, body.answer, body.answeredBy);
      return json({ ok });
    }

    // DELETE /api/questions/:id
    if (qIdMatch && method === "DELETE") {
      const id = qIdMatch[1]!;
      const ok = store.deleteQuestion(id);
      return json({ ok });
    }

    // GET /api/questions
    if (path === "/api/questions" && method === "GET") {
      const slug = url.searchParams.get("slug") || undefined;
      const status = (url.searchParams.get("status") as any) || undefined;
      return json(store.listQuestions(slug, status));
    }

    // POST /api/questions
    if (path === "/api/questions" && method === "POST") {
      const body = await parseBody<any>(request);
      if (!body?.slug || !body?.question) {
        return json({ ok: false, error: "Missing question fields" }, 400);
      }
      const question = store.createQuestion(body);
      return json({ ok: true, question });
    }

    // ==================== TICKETS ====================
    // PATCH /api/tickets/:id
    const ticketIdMatch = path.match(/^\/api\/tickets\/([A-Za-z0-9_-]+)$/);
    if (ticketIdMatch && method === "PATCH") {
      const id = ticketIdMatch[1]!;
      const body = await parseBody<{ status: any; reply?: string | null }>(request);
      if (!body?.status) return json({ ok: false, error: "Status required" }, 400);
      const ok = store.updateTicket(id, body.status, body.reply);
      return json({ ok });
    }

    // GET /api/tickets
    if (path === "/api/tickets" && method === "GET") {
      const status = url.searchParams.get("status") || undefined;
      return json(store.listTickets(status));
    }

    // POST /api/tickets
    if (path === "/api/tickets" && method === "POST") {
      const body = await parseBody<any>(request);
      if (!body?.topic || !body?.contact || !body?.message) {
        return json({ ok: false, error: "Missing ticket fields" }, 400);
      }
      const ticket = store.createTicket(body);
      return json({ ok: true, ticket });
    }

    // ==================== STOCK ALERTS ====================
    // POST /api/alerts/:id/notify
    const alertIdMatch = path.match(/^\/api\/alerts\/([A-Za-z0-9_-]+)\/notify$/);
    if (alertIdMatch && method === "POST") {
      const id = alertIdMatch[1]!;
      const ok = store.markAlertNotified(id);
      return json({ ok });
    }

    // GET /api/alerts
    if (path === "/api/alerts" && method === "GET") {
      const slug = url.searchParams.get("slug") || undefined;
      return json(store.listStockAlerts(slug));
    }

    // POST /api/alerts
    if (path === "/api/alerts" && method === "POST") {
      const body = await parseBody<{ slug: string; contact: string }>(request);
      if (!body?.slug || !body?.contact) {
        return json({ ok: false, error: "Slug and contact required" }, 400);
      }
      const alert = store.createStockAlert(body.slug, body.contact);
      return json({ ok: true, alert });
    }

    // ==================== PROMOS ====================
    // POST /api/promos/validate
    if (path === "/api/promos/validate" && method === "POST") {
      const body = await parseBody<{ code: string; subtotal: number }>(request);
      const code = String(body?.code || "").trim();
      const subtotal = Number(body?.subtotal || 0);

      const promo = store.getPromo(code);
      if (!promo || promo.is_active === 0) {
        return json({ ok: false, reason: "Coupon not recognized or expired." });
      }
      if (promo.min_subtotal && subtotal < promo.min_subtotal) {
        return json({
          ok: false,
          reason: `Requires a minimum cart value of ₹${promo.min_subtotal}.`,
        });
      }

      let discount = 0;
      if (promo.percent_off) {
        discount = Math.round((subtotal * promo.percent_off) / 100);
      } else if (promo.amount_off) {
        discount = Math.min(subtotal, promo.amount_off);
      }

      return json({
        ok: true,
        promo: {
          code: promo.code,
          label: promo.label,
          description: promo.description,
          percentOff: promo.percent_off,
          amountOff: promo.amount_off,
          minSubtotal: promo.min_subtotal,
          freeShipping: promo.free_shipping === 1,
          automatic: promo.automatic === 1,
        },
        discount,
      });
    }

    // PATCH /api/promos/:code
    const promoCodeMatch = path.match(/^\/api\/promos\/([A-Za-z0-9_-]+)$/);
    if (promoCodeMatch && method === "PATCH") {
      const code = promoCodeMatch[1]!;
      const body = await parseBody<{ isActive: boolean }>(request);
      const ok = store.togglePromo(code, body?.isActive ?? true);
      return json({ ok });
    }

    // DELETE /api/promos/:code
    if (promoCodeMatch && method === "DELETE") {
      const code = promoCodeMatch[1]!;
      const ok = store.deletePromo(code);
      return json({ ok });
    }

    // GET /api/promos
    if (path === "/api/promos" && method === "GET") {
      const activeOnly = url.searchParams.get("active") === "1";
      return json(store.listPromos(activeOnly));
    }

    // POST /api/promos
    if (path === "/api/promos" && method === "POST") {
      const body = await parseBody<any>(request);
      if (!body?.code || !body?.label) {
        return json({ ok: false, error: "Code and label required" }, 400);
      }
      const promo = store.savePromo(body);
      return json({ ok: true, promo });
    }

    return json({ ok: false, error: `Endpoint ${method} ${path} not found` }, 404);
  } catch (err: any) {
    console.error("API error:", err);
    return json({ ok: false, error: err?.message || "Internal server error" }, 500);
  }
}
