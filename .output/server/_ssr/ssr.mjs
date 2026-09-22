import fs from "node:fs";
import path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
var CAUSE_DEPTH_LIMIT = 5;
var DESCRIPTION_LENGTH_LIMIT = 8e3;
function describeError(error) {
	const parts = [];
	let current = error;
	for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
		if (!(current instanceof Error)) {
			parts.push(typeof current === "string" ? current : safeStringify(current));
			break;
		}
		const label = depth === 0 ? "" : "caused by: ";
		const status = describeStatus(current);
		parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
		current = current.cause;
	}
	return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}
function describeStatus(error) {
	const { status, statusCode } = error;
	const value = status ?? statusCode;
	return typeof value === "number" ? ` (status ${value})` : "";
}
function safeStringify(value) {
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function isErrorLike(value) {
	return value instanceof Error;
}
var originalConsoleError = console.error.bind(console);
console.error = (...args) => {
	originalConsoleError(...args.map((arg) => {
		if (!isErrorLike(arg)) return arg;
		record(arg);
		return describeError(arg);
	}));
};
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var DEFAULT_SEED_REVIEWS = [
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
		created_at: Date.now() - 2592e5,
		status: "published"
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
		created_at: Date.now() - 7776e5,
		status: "published"
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
		created_at: Date.now() - 1296e6,
		status: "published"
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
		created_at: Date.now() - 432e6,
		status: "published"
	}
];
var DEFAULT_SEED_QUESTIONS = [
	{
		id: "q-seed-1",
		slug: "gold-asafoetida-powder",
		question: "How should I store the asafoetida powder to preserve the aroma?",
		answer: "Keep in the airtight container provided, away from direct moisture and sunlight. Do not keep open next to other spices as its aroma is very potent.",
		asked_by: "Kavitha S.",
		answered_by: "Y.G Quality Team",
		created_at: Date.now() - 1728e6,
		answered_at: Date.now() - 16416e5,
		status: "published"
	},
	{
		id: "q-seed-2",
		slug: "gold-asafoetida-powder",
		question: "How much powder is recommended per serving of sambar or dal?",
		answer: "A pinch (approx. 1/8 to 1/4 teaspoon) tempered in hot ghee or sesame oil is sufficient for 4-6 servings.",
		asked_by: "Ramesh P.",
		answered_by: "Y.G Culinary Advisor",
		created_at: Date.now() - 12096e5,
		answered_at: Date.now() - 11232e5,
		status: "published"
	},
	{
		id: "q-seed-3",
		slug: "gluten-free-asafoetida-powder",
		question: "Does this contain any traces of wheat or gluten-bearing starches?",
		answer: "No. Our gluten-free asafoetida is formulated using non-gluten starches and processed on dedicated, tested equipment.",
		asked_by: "Deepa N.",
		answered_by: "Y.G Quality Assurance",
		created_at: Date.now() - 864e6,
		answered_at: Date.now() - 7776e5,
		status: "published"
	}
];
var JsonStore = class {
	filePath;
	data = null;
	constructor() {
		this.filePath = path.resolve(process.cwd(), "data", "yg_store.json");
	}
	ensureLoaded() {
		if (this.data) return this.data;
		try {
			if (fs.existsSync(this.filePath)) {
				const raw = fs.readFileSync(this.filePath, "utf-8");
				this.data = JSON.parse(raw);
			}
		} catch (err) {
			console.error("Failed to read yg_store.json:", err);
		}
		if (!this.data) this.data = {
			products: [],
			product_variants: [],
			orders: [],
			order_items: [],
			reviews: [],
			questions: [],
			tickets: [],
			stock_alerts: [],
			promos: [],
			recipes: []
		};
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
		if (dirty) this.save();
		return this.data;
	}
	save() {
		if (!this.data) return;
		try {
			const dir = path.dirname(this.filePath);
			if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
			const tmpPath = `${this.filePath}.tmp.${Date.now()}`;
			fs.writeFileSync(tmpPath, JSON.stringify(this.data, null, 2), "utf-8");
			fs.renameSync(tmpPath, this.filePath);
		} catch (err) {
			console.error("Failed to save yg_store.json:", err);
		}
	}
	listProducts() {
		const data = this.ensureLoaded();
		const variantsBySlug = /* @__PURE__ */ new Map();
		for (const v of data.product_variants || []) {
			const list = variantsBySlug.get(v.product_slug) || [];
			list.push(v);
			variantsBySlug.set(v.product_slug, list);
		}
		return (data.products || []).map((p) => {
			const variants = (variantsBySlug.get(p.slug) || []).sort((a, b) => a.sort_order - b.sort_order);
			return {
				...p,
				variants
			};
		});
	}
	getProduct(slug) {
		const target = slug.trim().toLowerCase();
		return this.listProducts().find((p) => p.slug.toLowerCase() === target) || null;
	}
	saveProduct(input) {
		const data = this.ensureLoaded();
		const now = Date.now();
		const existingIndex = data.products.findIndex((p) => p.slug === input.slug);
		const productRecord = {
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
			rating: input.rating ?? (existingIndex >= 0 ? data.products[existingIndex].rating : 4.8),
			reviews: input.reviews ?? (existingIndex >= 0 ? data.products[existingIndex].reviews : 50),
			created_at: existingIndex >= 0 ? data.products[existingIndex].created_at : now,
			updated_at: now
		};
		if (existingIndex >= 0) data.products[existingIndex] = productRecord;
		else data.products.push(productRecord);
		data.product_variants = (data.product_variants || []).filter((v) => v.product_slug !== input.slug);
		input.variants.forEach((v, idx) => {
			data.product_variants.push({
				id: v.id,
				product_slug: input.slug,
				label: v.label,
				price: v.price,
				mrp: v.mrp ?? null,
				stock: v.stock ?? 50,
				sort_order: idx
			});
		});
		this.save();
		return this.getProduct(input.slug);
	}
	toggleProductStock(slug, inStock, stockLeft) {
		const p = this.ensureLoaded().products.find((prod) => prod.slug === slug);
		if (!p) return false;
		p.in_stock = inStock ? 1 : 0;
		p.stock_left = stockLeft ?? null;
		p.updated_at = Date.now();
		this.save();
		return true;
	}
	deleteProduct(slug) {
		const p = this.ensureLoaded().products.find((prod) => prod.slug === slug);
		if (!p) return false;
		p.in_stock = 0;
		p.stock_left = 0;
		p.updated_at = Date.now();
		this.save();
		return true;
	}
	listOrders() {
		const data = this.ensureLoaded();
		const itemsByOrder = /* @__PURE__ */ new Map();
		for (const item of data.order_items || []) {
			const list = itemsByOrder.get(item.order_id) || [];
			list.push({
				slug: item.slug,
				variantId: item.variant_id,
				name: item.name,
				variantLabel: item.variant_label,
				image: item.image,
				qty: item.qty,
				price: item.price
			});
			itemsByOrder.set(item.order_id, list);
		}
		return (data.orders || []).map((row) => {
			let address;
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
					phone: row.phone
				};
			}
			let resolution = null;
			if (row.resolution_json) try {
				resolution = JSON.parse(row.resolution_json);
			} catch {
				resolution = null;
			}
			const totals = {
				subtotal: row.subtotal,
				discount: row.discount,
				shipping: row.shipping,
				giftWrap: row.gift_wrap,
				codFee: row.cod_fee,
				total: row.total
			};
			return {
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
				resolution
			};
		}).sort((a, b) => b.createdAt - a.createdAt);
	}
	getOrder(id, verifyEmailOrPhone) {
		const target = id.trim().toUpperCase();
		const found = this.listOrders().find((o) => o.id.toUpperCase() === target);
		if (!found) return null;
		if (verifyEmailOrPhone) {
			const v = verifyEmailOrPhone.trim().toLowerCase();
			const matchEmail = found.email.trim().toLowerCase() === v;
			const matchPhone = found.phone.trim().replace(/\D/g, "") === v.replace(/\D/g, "");
			if (!matchEmail && !matchPhone) return null;
		}
		return found;
	}
	getOrdersByCustomer(query) {
		const q = query.trim().toLowerCase();
		const cleanQ = q.replace(/\D/g, "");
		return this.listOrders().filter((o) => {
			const emailMatch = o.email.toLowerCase().includes(q);
			const phoneMatch = cleanQ.length >= 6 && o.phone.replace(/\D/g, "").includes(cleanQ);
			return emailMatch || phoneMatch;
		});
	}
	createOrder(input) {
		const data = this.ensureLoaded();
		const id = input.id || `YG${Math.floor(1e5 + Math.random() * 899999)}`;
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
			updated_at: now
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
				price: item.price
			});
			const variant = data.product_variants.find((v) => v.product_slug === item.slug && v.id === item.variantId);
			if (variant && variant.stock > 0) variant.stock = Math.max(0, variant.stock - item.qty);
		}
		this.save();
		return this.getOrder(id);
	}
	updateOrderStatus(id, status) {
		const order = this.ensureLoaded().orders.find((o) => o.id.toUpperCase() === id.trim().toUpperCase());
		if (!order) return false;
		order.status = status;
		order.updated_at = Date.now();
		this.save();
		return true;
	}
	updateOrderResolution(id, resolution) {
		const order = this.ensureLoaded().orders.find((o) => o.id.toUpperCase() === id.trim().toUpperCase());
		if (!order) return false;
		order.resolution_json = JSON.stringify(resolution);
		if (resolution.type === "cancellation") order.status = "cancelled";
		order.updated_at = Date.now();
		this.save();
		return true;
	}
	deleteOrder(id) {
		const data = this.ensureLoaded();
		const target = id.trim().toUpperCase();
		const initLen = data.orders.length;
		data.orders = data.orders.filter((o) => o.id.toUpperCase() !== target);
		data.order_items = data.order_items.filter((item) => item.order_id.toUpperCase() !== target);
		const deleted = data.orders.length < initLen;
		if (deleted) this.save();
		return deleted;
	}
	clearAllOrders() {
		const data = this.ensureLoaded();
		data.orders = [];
		data.order_items = [];
		this.save();
		return true;
	}
	listReviews(slug, status) {
		return (this.ensureLoaded().reviews || []).filter((r) => {
			if (slug && r.slug !== slug) return false;
			if (status && status !== "all" && r.status !== status) return false;
			return true;
		}).sort((a, b) => b.created_at - a.created_at);
	}
	createReview(input) {
		const data = this.ensureLoaded();
		const review = {
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
			status: input.status || "published"
		};
		data.reviews.unshift(review);
		const publishedForSlug = data.reviews.filter((r) => r.slug === input.slug && r.status === "published");
		const prod = data.products.find((p) => p.slug === input.slug);
		if (prod && publishedForSlug.length > 0) {
			const sum = publishedForSlug.reduce((acc, r) => acc + r.rating, 0);
			prod.rating = Number((sum / publishedForSlug.length).toFixed(1));
			prod.reviews = publishedForSlug.length;
		}
		this.save();
		return review;
	}
	updateReviewStatus(id, status) {
		const data = this.ensureLoaded();
		const r = data.reviews.find((rev) => rev.id === id);
		if (!r) return false;
		r.status = status;
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
	deleteReview(id) {
		const data = this.ensureLoaded();
		const initLen = data.reviews.length;
		data.reviews = data.reviews.filter((r) => r.id !== id);
		const deleted = data.reviews.length < initLen;
		if (deleted) this.save();
		return deleted;
	}
	listQuestions(slug, status) {
		return (this.ensureLoaded().questions || []).filter((q) => {
			if (slug && q.slug !== slug) return false;
			if (status && status !== "all" && q.status !== status) return false;
			return true;
		}).sort((a, b) => b.created_at - a.created_at);
	}
	createQuestion(input) {
		const data = this.ensureLoaded();
		const q = {
			id: `q_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
			slug: input.slug,
			question: input.question.trim(),
			answer: null,
			asked_by: input.askedBy.trim() || "Customer",
			answered_by: null,
			created_at: Date.now(),
			answered_at: null,
			status: "published"
		};
		data.questions.unshift(q);
		this.save();
		return q;
	}
	answerQuestion(id, answer, answeredBy = "Y.G Culinary Expert") {
		const q = this.ensureLoaded().questions.find((quest) => quest.id === id);
		if (!q) return false;
		q.answer = answer.trim();
		q.answered_by = answeredBy;
		q.answered_at = Date.now();
		q.status = "published";
		this.save();
		return true;
	}
	deleteQuestion(id) {
		const data = this.ensureLoaded();
		const initLen = data.questions.length;
		data.questions = data.questions.filter((q) => q.id !== id);
		const deleted = data.questions.length < initLen;
		if (deleted) this.save();
		return deleted;
	}
	listTickets(status) {
		return (this.ensureLoaded().tickets || []).filter((t) => {
			if (status && status !== "all" && t.status !== status) return false;
			return true;
		}).sort((a, b) => b.created_at - a.created_at);
	}
	createTicket(input) {
		const data = this.ensureLoaded();
		const now = Date.now();
		const ticket = {
			id: `TKT${Math.floor(1e4 + Math.random() * 89999)}`,
			topic: input.topic.trim(),
			order_id: input.orderId?.trim() || null,
			contact: input.contact.trim(),
			message: input.message.trim(),
			status: "open",
			reply: null,
			created_at: now,
			updated_at: now
		};
		data.tickets.unshift(ticket);
		this.save();
		return ticket;
	}
	updateTicket(id, status, reply) {
		const t = this.ensureLoaded().tickets.find((tick) => tick.id === id);
		if (!t) return false;
		t.status = status;
		if (reply !== void 0) t.reply = reply;
		t.updated_at = Date.now();
		this.save();
		return true;
	}
	listStockAlerts(slug) {
		return (this.ensureLoaded().stock_alerts || []).filter((a) => slug ? a.slug === slug : true).sort((a, b) => b.created_at - a.created_at);
	}
	createStockAlert(slug, contact) {
		const data = this.ensureLoaded();
		const existing = (data.stock_alerts || []).find((a) => a.slug === slug && a.contact.toLowerCase() === contact.trim().toLowerCase());
		if (existing) return existing;
		const alert = {
			id: `alt_${Date.now().toString(36)}`,
			slug,
			contact: contact.trim(),
			created_at: Date.now(),
			notified: 0
		};
		data.stock_alerts.unshift(alert);
		this.save();
		return alert;
	}
	markAlertNotified(id) {
		const alert = (this.ensureLoaded().stock_alerts || []).find((a) => a.id === id);
		if (!alert) return false;
		alert.notified = 1;
		this.save();
		return true;
	}
	listPromos(activeOnly = false) {
		return (this.ensureLoaded().promos || []).filter((p) => activeOnly ? p.is_active === 1 : true);
	}
	getPromo(code) {
		const data = this.ensureLoaded();
		const target = code.trim().toUpperCase();
		return (data.promos || []).find((p) => p.code.toUpperCase() === target) || null;
	}
	savePromo(input) {
		const data = this.ensureLoaded();
		const code = input.code.trim().toUpperCase();
		const existingIdx = data.promos.findIndex((p) => p.code.toUpperCase() === code);
		const promo = {
			code,
			label: input.label.trim(),
			description: input.description.trim(),
			percent_off: input.percentOff ?? null,
			amount_off: input.amountOff ?? null,
			min_subtotal: input.minSubtotal ?? null,
			free_shipping: input.freeShipping ? 1 : 0,
			automatic: input.automatic ? 1 : 0,
			is_active: input.isActive !== false ? 1 : 0,
			created_at: existingIdx >= 0 ? data.promos[existingIdx].created_at : Date.now()
		};
		if (existingIdx >= 0) data.promos[existingIdx] = promo;
		else data.promos.push(promo);
		this.save();
		return promo;
	}
	togglePromo(code, isActive) {
		const p = this.ensureLoaded().promos.find((pr) => pr.code.toUpperCase() === code.trim().toUpperCase());
		if (!p) return false;
		p.is_active = isActive ? 1 : 0;
		this.save();
		return true;
	}
	deletePromo(code) {
		const data = this.ensureLoaded();
		const initLen = data.promos.length;
		data.promos = data.promos.filter((p) => p.code.toUpperCase() !== code.trim().toUpperCase());
		const deleted = data.promos.length < initLen;
		if (deleted) this.save();
		return deleted;
	}
	getDashboardStats() {
		const orders = this.listOrders();
		const products = this.listProducts();
		const reviews = this.listReviews(void 0, "all");
		const questions = this.listQuestions(void 0, "all");
		const tickets = this.listTickets("all");
		const alerts = this.listStockAlerts();
		const startOfToday = /* @__PURE__ */ new Date();
		startOfToday.setHours(0, 0, 0, 0);
		const startOfTodayMs = startOfToday.getTime();
		const totalOrders = orders.length;
		const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + (o.totals?.total || 0), 0);
		const ordersPlacedToday = orders.filter((o) => o.createdAt >= startOfTodayMs).length;
		const ordersByStatus = {
			placed: 0,
			confirmed: 0,
			packed: 0,
			shipped: 0,
			out: 0,
			delivered: 0,
			cancelled: 0,
			refund_requested: 0,
			refunded: 0
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
		for (const p of products) if (p.in_stock === 0) lowStockProductsCount++;
		else if (p.stock_left !== null && p.stock_left <= 10) lowStockProductsCount++;
		else if (p.variants?.some((v) => v.stock <= 10)) lowStockProductsCount++;
		const recentOrders = orders.slice(0, 6).map((o) => ({
			id: o.id,
			createdAt: o.createdAt,
			email: o.email,
			total: o.totals?.total || 0,
			status: o.status,
			itemCount: o.items?.length || 1
		}));
		const recentSalesTrend = [];
		for (let i = 6; i >= 0; i--) {
			const d = /* @__PURE__ */ new Date();
			d.setDate(d.getDate() - i);
			const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime();
			const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime();
			const dayOrders = orders.filter((o) => o.createdAt >= dayStart && o.createdAt <= dayEnd);
			const dayRev = dayOrders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + (o.totals?.total || 0), 0);
			const dateLabel = d.toLocaleDateString("en-IN", {
				month: "short",
				day: "numeric"
			});
			recentSalesTrend.push({
				date: dateLabel,
				revenue: dayRev,
				orders: dayOrders.length
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
			recentSalesTrend
		};
	}
};
var store = new JsonStore();
var TRADE_PRODUCTS = [
	{
		id: "yg-gold-pwd-10g",
		name: "10G YG GOLD POWDER COVER",
		category: "powder",
		categoryLabel: "YG Gold Powder",
		packType: "Cover",
		packQty: 10,
		cfPrice: 6,
		mtPrice: null,
		directPrice: null,
		distPrice: 12,
		ssPrice: 10.8,
		mrp: 20,
		slug: "gold-asafoetida-powder",
		weightGrams: 10
	},
	{
		id: "yg-gold-pwd-20g",
		name: "20G YG GOLD POWDER COVER",
		category: "powder",
		categoryLabel: "YG Gold Powder",
		packType: "Cover",
		packQty: 10,
		cfPrice: 12,
		mtPrice: null,
		directPrice: null,
		distPrice: 24,
		ssPrice: 21.6,
		mrp: 40,
		slug: "gold-asafoetida-powder",
		weightGrams: 20
	},
	{
		id: "yg-gold-pwd-50g",
		name: "50G YG GOLD POWDER TRAY",
		category: "powder",
		categoryLabel: "YG Gold Powder",
		packType: "Tray",
		packQty: 20,
		cfPrice: 28.8,
		mtPrice: 38.4,
		directPrice: 38.4,
		distPrice: 57.6,
		ssPrice: 51.84,
		mrp: 96,
		slug: "gold-asafoetida-powder",
		weightGrams: 50
	},
	{
		id: "yg-gold-pwd-100g",
		name: "100G YG GOLD POWDER TRAY",
		category: "powder",
		categoryLabel: "YG Gold Powder",
		packType: "Tray",
		packQty: 10,
		cfPrice: 55.8,
		mtPrice: 74.4,
		directPrice: 74.4,
		distPrice: 111.6,
		ssPrice: 100.44,
		mrp: 186,
		slug: "gold-asafoetida-powder",
		weightGrams: 100
	},
	{
		id: "yg-gold-pwd-200g",
		name: "200G YG GOLD POWDER / CONTAINER",
		category: "powder",
		categoryLabel: "YG Gold Powder",
		packType: "Container",
		packQty: 1,
		cfPrice: 105,
		mtPrice: 140,
		directPrice: 140,
		distPrice: 210,
		ssPrice: 189,
		mrp: 350,
		slug: "gold-asafoetida-powder",
		weightGrams: 200
	},
	{
		id: "yg-gold-cake-25g",
		name: "25G YG GOLD CAKE BAG",
		category: "cake",
		categoryLabel: "YG Gold Cake",
		packType: "Bag",
		packQty: 40,
		cfPrice: 13.8,
		mtPrice: 18.4,
		directPrice: 18.4,
		distPrice: 27.6,
		ssPrice: 24.84,
		mrp: 46,
		slug: "asafoetida-gold-cake",
		weightGrams: 25
	},
	{
		id: "yg-gold-cake-50g",
		name: "50G YG GOLD CAKE BAG",
		category: "cake",
		categoryLabel: "YG Gold Cake",
		packType: "Bag",
		packQty: 40,
		cfPrice: 25.8,
		mtPrice: 34.4,
		directPrice: 34.4,
		distPrice: 51.6,
		ssPrice: 46.44,
		mrp: 86,
		slug: "asafoetida-gold-cake",
		weightGrams: 50
	},
	{
		id: "yg-gold-cake-100g",
		name: "100G YG GOLD CAKE BAG",
		category: "cake",
		categoryLabel: "YG Gold Cake",
		packType: "Bag",
		packQty: 20,
		cfPrice: 49.2,
		mtPrice: 65.6,
		directPrice: 65.6,
		distPrice: 98.4,
		ssPrice: 88.56,
		mrp: 164,
		slug: "asafoetida-gold-cake",
		weightGrams: 100
	},
	{
		id: "yg-gold-pwd-500g",
		name: "500G YG GOLD POWDER POUCH",
		category: "powder",
		categoryLabel: "YG Gold Powder",
		packType: "Pouch",
		packQty: 1,
		cfPrice: 255,
		mtPrice: 340,
		directPrice: 340,
		distPrice: 510,
		ssPrice: 459,
		mrp: 850,
		slug: "gold-asafoetida-powder",
		weightGrams: 500
	},
	{
		id: "yg-gold-pwd-1kg",
		name: "1 KG YG GOLD POWDER POUCH",
		category: "powder",
		categoryLabel: "YG Gold Powder",
		packType: "Pouch",
		packQty: 1,
		cfPrice: 480,
		mtPrice: 640,
		directPrice: 640,
		distPrice: 960,
		ssPrice: 864,
		mrp: 1600,
		slug: "gold-asafoetida-powder",
		weightGrams: 1e3
	}
];
var PRICE_TIERS = [
	{
		key: "cf",
		label: "CF Price",
		fullName: "Carrying & Forwarding Agent",
		description: "Depot-level primary consignment pricing for state-level C&F logistics partners.",
		badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/40"
	},
	{
		key: "ss",
		label: "S.S Price",
		fullName: "Super Stockist",
		description: "District / regional super stockist buy price for secondary hub fulfillment.",
		badgeColor: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900/40"
	},
	{
		key: "dist",
		label: "Dist. Price",
		fullName: "Wholesale Distributor",
		description: "Distributor billing rate to FMCG retail grocery stores and food marts.",
		badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40"
	},
	{
		key: "direct",
		label: "Direct Price",
		fullName: "Direct to Retailer",
		description: "Institutional supply price for large department stores and direct retailers.",
		badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40"
	},
	{
		key: "mt",
		label: "MT Price",
		fullName: "Modern Trade (Supermarkets)",
		description: "Organized retail, hypermarkets, and national supermarket supply terms.",
		badgeColor: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-900/40"
	},
	{
		key: "mrp",
		label: "MRP",
		fullName: "Maximum Retail Price",
		description: "Consumer retail printed price inclusive of all taxes across India.",
		badgeColor: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/40"
	}
];
function json(data, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"access-control-allow-origin": "*"
		}
	});
}
async function parseBody(req) {
	try {
		return await req.json();
	} catch {
		return null;
	}
}
async function handleApiRequest(request) {
	const url = new URL(request.url);
	const path = url.pathname;
	const method = request.method.toUpperCase();
	if (!path.startsWith("/api/")) return null;
	if (method === "OPTIONS") return new Response(null, {
		status: 204,
		headers: {
			"access-control-allow-origin": "*",
			"access-control-allow-methods": "GET, POST, PATCH, DELETE, OPTIONS",
			"access-control-allow-headers": "content-type"
		}
	});
	try {
		if (path === "/api/health" && method === "GET") return json({
			ok: true,
			timestamp: Date.now()
		});
		if (path === "/api/analytics" && method === "GET") return json(store.getDashboardStats());
		if (path === "/api/orders/customer" && method === "GET") {
			const q = url.searchParams.get("q") || "";
			return json(store.getOrdersByCustomer(q));
		}
		const orderIdMatch = path.match(/^\/api\/orders\/([A-Za-z0-9_-]+)$/);
		if (orderIdMatch && method === "GET") {
			const id = orderIdMatch[1];
			const verify = url.searchParams.get("verify") || void 0;
			const order = store.getOrder(id, verify);
			if (!order) return json({
				ok: false,
				error: "Order not found"
			}, 404);
			return json(order);
		}
		const orderStatusMatch = path.match(/^\/api\/orders\/([A-Za-z0-9_-]+)\/status$/);
		if (orderStatusMatch && method === "PATCH") {
			const id = orderStatusMatch[1];
			const body = await parseBody(request);
			if (!body?.status) return json({
				ok: false,
				error: "Status required"
			}, 400);
			return json({ ok: store.updateOrderStatus(id, body.status) });
		}
		const orderResolveMatch = path.match(/^\/api\/orders\/([A-Za-z0-9_-]+)\/resolve$/);
		if (orderResolveMatch && method === "POST") {
			const id = orderResolveMatch[1];
			const body = await parseBody(request);
			if (!body?.resolution) return json({
				ok: false,
				error: "Resolution required"
			}, 400);
			return json({ ok: store.updateOrderResolution(id, body.resolution) });
		}
		if (orderIdMatch && method === "DELETE") {
			const id = orderIdMatch[1];
			return json({ ok: store.deleteOrder(id) });
		}
		if (path === "/api/orders" && method === "GET") return json(store.listOrders());
		if (path === "/api/orders" && method === "POST") {
			const body = await parseBody(request);
			if (!body?.email || !body?.items) return json({
				ok: false,
				error: "Missing required order fields"
			}, 400);
			return json(store.createOrder(body), 201);
		}
		if (path === "/api/orders" && method === "DELETE") return json({ ok: store.clearAllOrders() });
		if (path === "/api/products/stock" && method === "POST") {
			const body = await parseBody(request);
			if (!body?.slug) return json({
				ok: false,
				error: "Slug required"
			}, 400);
			return json({ ok: store.toggleProductStock(body.slug, body.inStock, body.stockLeft) });
		}
		const prodSlugMatch = path.match(/^\/api\/products\/([A-Za-z0-9_-]+)$/);
		if (prodSlugMatch && method === "GET") {
			const slug = prodSlugMatch[1];
			const product = store.getProduct(slug);
			if (!product) return json({
				ok: false,
				error: "Product not found"
			}, 404);
			return json(product);
		}
		if (prodSlugMatch && method === "DELETE") {
			const slug = prodSlugMatch[1];
			return json({ ok: store.deleteProduct(slug) });
		}
		if (path === "/api/products" && method === "GET") return json(store.listProducts());
		if (path === "/api/trade-pricing" && method === "GET") return json({
			ok: true,
			products: TRADE_PRODUCTS,
			tiers: PRICE_TIERS
		});
		if (path === "/api/products" && method === "POST") {
			const body = await parseBody(request);
			if (!body?.slug || !body?.name) return json({
				ok: false,
				error: "Invalid product data"
			}, 400);
			return json(store.saveProduct(body));
		}
		const revIdMatch = path.match(/^\/api\/reviews\/([A-Za-z0-9_-]+)$/);
		if (revIdMatch && method === "PATCH") {
			const id = revIdMatch[1];
			const body = await parseBody(request);
			if (!body?.status) return json({
				ok: false,
				error: "Status required"
			}, 400);
			return json({ ok: store.updateReviewStatus(id, body.status) });
		}
		if (revIdMatch && method === "DELETE") {
			const id = revIdMatch[1];
			return json({ ok: store.deleteReview(id) });
		}
		if (path === "/api/reviews" && method === "GET") {
			const slug = url.searchParams.get("slug") || void 0;
			const status = url.searchParams.get("status") || void 0;
			return json(store.listReviews(slug, status));
		}
		if (path === "/api/reviews" && method === "POST") {
			const body = await parseBody(request);
			if (!body?.slug || !body?.rating || !body?.comment) return json({
				ok: false,
				error: "Missing review fields"
			}, 400);
			return json({
				ok: true,
				review: store.createReview(body)
			});
		}
		const qIdMatch = path.match(/^\/api\/questions\/([A-Za-z0-9_-]+)$/);
		if (qIdMatch && method === "PATCH") {
			const id = qIdMatch[1];
			const body = await parseBody(request);
			if (!body?.answer) return json({
				ok: false,
				error: "Answer required"
			}, 400);
			return json({ ok: store.answerQuestion(id, body.answer, body.answeredBy) });
		}
		if (qIdMatch && method === "DELETE") {
			const id = qIdMatch[1];
			return json({ ok: store.deleteQuestion(id) });
		}
		if (path === "/api/questions" && method === "GET") {
			const slug = url.searchParams.get("slug") || void 0;
			const status = url.searchParams.get("status") || void 0;
			return json(store.listQuestions(slug, status));
		}
		if (path === "/api/questions" && method === "POST") {
			const body = await parseBody(request);
			if (!body?.slug || !body?.question) return json({
				ok: false,
				error: "Missing question fields"
			}, 400);
			return json({
				ok: true,
				question: store.createQuestion(body)
			});
		}
		const ticketIdMatch = path.match(/^\/api\/tickets\/([A-Za-z0-9_-]+)$/);
		if (ticketIdMatch && method === "PATCH") {
			const id = ticketIdMatch[1];
			const body = await parseBody(request);
			if (!body?.status) return json({
				ok: false,
				error: "Status required"
			}, 400);
			return json({ ok: store.updateTicket(id, body.status, body.reply) });
		}
		if (path === "/api/tickets" && method === "GET") {
			const status = url.searchParams.get("status") || void 0;
			return json(store.listTickets(status));
		}
		if (path === "/api/tickets" && method === "POST") {
			const body = await parseBody(request);
			if (!body?.topic || !body?.contact || !body?.message) return json({
				ok: false,
				error: "Missing ticket fields"
			}, 400);
			return json({
				ok: true,
				ticket: store.createTicket(body)
			});
		}
		const alertIdMatch = path.match(/^\/api\/alerts\/([A-Za-z0-9_-]+)\/notify$/);
		if (alertIdMatch && method === "POST") {
			const id = alertIdMatch[1];
			return json({ ok: store.markAlertNotified(id) });
		}
		if (path === "/api/alerts" && method === "GET") {
			const slug = url.searchParams.get("slug") || void 0;
			return json(store.listStockAlerts(slug));
		}
		if (path === "/api/alerts" && method === "POST") {
			const body = await parseBody(request);
			if (!body?.slug || !body?.contact) return json({
				ok: false,
				error: "Slug and contact required"
			}, 400);
			return json({
				ok: true,
				alert: store.createStockAlert(body.slug, body.contact)
			});
		}
		if (path === "/api/promos/validate" && method === "POST") {
			const body = await parseBody(request);
			const code = String(body?.code || "").trim();
			const subtotal = Number(body?.subtotal || 0);
			const promo = store.getPromo(code);
			if (!promo || promo.is_active === 0) return json({
				ok: false,
				reason: "Coupon not recognized or expired."
			});
			if (promo.min_subtotal && subtotal < promo.min_subtotal) return json({
				ok: false,
				reason: `Requires a minimum cart value of ₹${promo.min_subtotal}.`
			});
			let discount = 0;
			if (promo.percent_off) discount = Math.round(subtotal * promo.percent_off / 100);
			else if (promo.amount_off) discount = Math.min(subtotal, promo.amount_off);
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
					automatic: promo.automatic === 1
				},
				discount
			});
		}
		const promoCodeMatch = path.match(/^\/api\/promos\/([A-Za-z0-9_-]+)$/);
		if (promoCodeMatch && method === "PATCH") {
			const code = promoCodeMatch[1];
			const body = await parseBody(request);
			return json({ ok: store.togglePromo(code, body?.isActive ?? true) });
		}
		if (promoCodeMatch && method === "DELETE") {
			const code = promoCodeMatch[1];
			return json({ ok: store.deletePromo(code) });
		}
		if (path === "/api/promos" && method === "GET") {
			const activeOnly = url.searchParams.get("active") === "1";
			return json(store.listPromos(activeOnly));
		}
		if (path === "/api/promos" && method === "POST") {
			const body = await parseBody(request);
			if (!body?.code || !body?.label) return json({
				ok: false,
				error: "Code and label required"
			}, 400);
			return json({
				ok: true,
				promo: store.savePromo(body)
			});
		}
		return json({
			ok: false,
			error: `Endpoint ${method} ${path} not found`
		}, 404);
	} catch (err) {
		console.error("API error:", err);
		return json({
			ok: false,
			error: err?.message || "Internal server error"
		}, 500);
	}
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-kMh-xlui.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	try {
		const apiResponse = await handleApiRequest(request);
		if (apiResponse) return apiResponse;
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as t };
