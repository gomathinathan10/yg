import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as products } from "./products-C1CBxwk4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-pIGjAM-X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var promos = [
	{
		code: "HERITAGE10",
		label: "10% off",
		description: "10% off your order — our 1932 heritage welcome offer.",
		percentOff: 10
	},
	{
		code: "HING50",
		label: "₹50 off",
		description: "₹50 off orders above ₹399.",
		amountOff: 50,
		minSubtotal: 399
	},
	{
		code: "FREESHIP",
		label: "Free shipping",
		description: "Free delivery on any order.",
		freeShipping: true
	},
	{
		code: "BULK15",
		label: "15% off ₹999+",
		description: "Automatic 15% off when your basket crosses ₹999.",
		percentOff: 15,
		minSubtotal: 999,
		automatic: true
	}
];
function findPromo(code) {
	const normalized = code.trim().toUpperCase();
	return promos.find((p) => p.code === normalized);
}
function isPromoEligible(promo, subtotal) {
	return subtotal >= (promo.minSubtotal ?? 0);
}
function discountFor(promo, subtotal) {
	if (!isPromoEligible(promo, subtotal)) return 0;
	const pct = promo.percentOff ? subtotal * promo.percentOff / 100 : 0;
	const flat = promo.amountOff ?? 0;
	return Math.min(subtotal, Math.round(pct + flat));
}
/** Best automatic promo for a given subtotal, if any. */
function bestAutomaticPromo(subtotal) {
	return promos.filter((p) => p.automatic && isPromoEligible(p, subtotal)).sort((a, b) => discountFor(b, subtotal) - discountFor(a, subtotal))[0];
}
/** Itemised breakdown of what a promo takes off, for display in cart/checkout. */
function discountBreakdown(promo, subtotal, shippingSaved = 0) {
	const lines = [];
	if (!isPromoEligible(promo, subtotal)) return lines;
	if (promo.percentOff) lines.push({
		label: `${promo.percentOff}% off items`,
		amount: Math.round(subtotal * promo.percentOff / 100)
	});
	if (promo.amountOff) lines.push({
		label: `₹${promo.amountOff} off order`,
		amount: promo.amountOff
	});
	if (promo.freeShipping && shippingSaved > 0) lines.push({
		label: "Free shipping",
		amount: shippingSaved
	});
	return lines;
}
var STORAGE_KEY = "yg-cart-v1";
var PROMO_KEY = "yg-promo-v1";
var FREE_SHIPPING = 499;
var CartContext = (0, import_react.createContext)(null);
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [isOpen, setOpen] = (0, import_react.useState)(false);
	const [promoCode, setPromoCode] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) setLines(JSON.parse(raw));
			const savedPromo = window.localStorage.getItem(PROMO_KEY);
			if (savedPromo && findPromo(savedPromo)) setPromoCode(savedPromo.toUpperCase());
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
			if (promoCode) window.localStorage.setItem(PROMO_KEY, promoCode);
			else window.localStorage.removeItem(PROMO_KEY);
		} catch {}
	}, [lines, promoCode]);
	const add = (0, import_react.useCallback)((slug, variantId, qty = 1) => {
		setLines((prev) => {
			const existing = prev.find((l) => l.slug === slug && l.variantId === variantId);
			if (existing) return prev.map((l) => l === existing ? {
				...l,
				qty: Math.min(l.qty + qty, 99)
			} : l);
			return [...prev, {
				slug,
				variantId,
				qty
			}];
		});
	}, []);
	const setQty = (0, import_react.useCallback)((slug, variantId, qty) => {
		setLines((prev) => qty <= 0 ? prev.filter((l) => !(l.slug === slug && l.variantId === variantId)) : prev.map((l) => l.slug === slug && l.variantId === variantId ? {
			...l,
			qty
		} : l));
	}, []);
	const remove = (0, import_react.useCallback)((slug, variantId) => {
		setLines((prev) => prev.filter((l) => !(l.slug === slug && l.variantId === variantId)));
	}, []);
	const clear = (0, import_react.useCallback)(() => {
		setLines([]);
		setPromoCode(null);
	}, []);
	const subtotalNow = (0, import_react.useMemo)(() => lines.reduce((sum, line) => {
		const variant = products.find((p) => p.slug === line.slug)?.variants.find((v) => v.id === line.variantId);
		return variant ? sum + variant.price * line.qty : sum;
	}, 0), [lines]);
	const applyPromo = (0, import_react.useCallback)((code) => {
		const promo = findPromo(code);
		if (!promo) return {
			ok: false,
			reason: "That code isn't valid."
		};
		if (promo.automatic) return {
			ok: false,
			reason: "This offer applies automatically when eligible."
		};
		if (!isPromoEligible(promo, subtotalNow)) return {
			ok: false,
			reason: `Add ₹${(promo.minSubtotal ?? 0) - subtotalNow} more to use ${promo.code}.`
		};
		setPromoCode(promo.code);
		return {
			ok: true,
			promo
		};
	}, [subtotalNow]);
	const removePromo = (0, import_react.useCallback)(() => setPromoCode(null), []);
	const value = (0, import_react.useMemo)(() => {
		const resolved = lines.flatMap((line) => {
			const product = products.find((p) => p.slug === line.slug);
			const variant = product?.variants.find((v) => v.id === line.variantId);
			if (!product || !variant) return [];
			return [{
				...line,
				product,
				variant,
				lineTotal: variant.price * line.qty
			}];
		});
		const subtotal = resolved.reduce((sum, l) => sum + l.lineTotal, 0);
		const manual = promoCode ? findPromo(promoCode) : void 0;
		const manualValid = manual && isPromoEligible(manual, subtotal) ? manual : void 0;
		const auto = bestAutomaticPromo(subtotal);
		const manualDiscount = manualValid ? discountFor(manualValid, subtotal) : 0;
		const appliedPromo = (auto ? discountFor(auto, subtotal) : 0) > manualDiscount ? auto : manualValid ?? auto ?? null;
		const discount = appliedPromo ? discountFor(appliedPromo, subtotal) : 0;
		const discountedSubtotal = Math.max(0, subtotal - discount);
		const baseShipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : 49;
		const shipping = subtotal === 0 || appliedPromo?.freeShipping || discountedSubtotal >= FREE_SHIPPING ? 0 : 49;
		const shippingSaved = Math.max(0, baseShipping - shipping);
		const discountLines = appliedPromo ? discountBreakdown(appliedPromo, subtotal, shippingSaved) : [];
		const totalSavings = discount + shippingSaved;
		return {
			lines,
			resolved,
			count: resolved.reduce((sum, l) => sum + l.qty, 0),
			subtotal,
			discount,
			discountLines,
			totalSavings,
			shippingSaved,
			appliedPromo: appliedPromo ?? null,
			promoIsAutomatic: Boolean(appliedPromo?.automatic),
			shipping,
			total: discountedSubtotal + shipping,
			freeShippingThreshold: FREE_SHIPPING,
			isOpen,
			setOpen,
			add,
			setQty,
			remove,
			clear,
			applyPromo,
			removePromo
		};
	}, [
		lines,
		isOpen,
		add,
		setQty,
		remove,
		clear,
		promoCode,
		applyPromo,
		removePromo
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
//#endregion
export { useCart as n, CartProvider as t };
