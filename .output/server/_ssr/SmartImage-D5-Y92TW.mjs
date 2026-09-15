import { r as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { D as RefreshCw, et as ImageOff } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SmartImage-D5-Y92TW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var story_1_shop_560_default = "/assets/story-1-shop-560-C9AOS04y.webp";
var story_1_shop_900_default = "/assets/story-1-shop-900-C1hKWfWP.webp";
var story_1_shop_1200_default = "/assets/story-1-shop-1200-KH6P15Oz.webp";
var story_2_kitchen_560_default = "/assets/story-2-kitchen-560-BwiFpku4.webp";
var story_2_kitchen_900_default = "/assets/story-2-kitchen-900-D9xPH5h3.webp";
var story_2_kitchen_1200_default = "/assets/story-2-kitchen-1200-B0XrR51h.webp";
var story_3_today_560_default = "/assets/story-3-today-560-BqodebNV.webp";
var story_3_today_900_default = "/assets/story-3-today-900-CoQyFYq-.webp";
var story_3_today_1200_default = "/assets/story-3-today-1200-COgTFLEH.webp";
var product_powder_400_default = "/assets/product-powder-400-BzZ6QhiJ.webp";
var product_powder_800_default = "/assets/product-powder-800-DcdU81cH.webp";
var product_glutenfree_400_default = "/assets/product-glutenfree-400-dtzpdwMq.webp";
var product_glutenfree_800_default = "/assets/product-glutenfree-800-BRbglSHw.webp";
var product_granules_400_default = "/assets/product-granules-400-D98wWv4R.webp";
var product_granules_800_default = "/assets/product-granules-800-WWT9xaKD.webp";
var product_cake_400_default = "/assets/product-cake-400-IyNQ7Qca.webp";
var product_cake_800_default = "/assets/product-cake-800-D7p8IG0h.webp";
var registry = /* @__PURE__ */ new Map();
function register(sources) {
	const largest = sources[sources.length - 1][0];
	registry.set(largest, sources.map(([url, w]) => `${url} ${w}w`).join(", "));
	return largest;
}
var storyShopImage = register([
	[story_1_shop_560_default, 560],
	[story_1_shop_900_default, 900],
	[story_1_shop_1200_default, 1200]
]);
var heritageImage = storyShopImage;
var storyKitchenImage = register([
	[story_2_kitchen_560_default, 560],
	[story_2_kitchen_900_default, 900],
	[story_2_kitchen_1200_default, 1200]
]);
var storyTodayImage = register([
	[story_3_today_560_default, 560],
	[story_3_today_900_default, 900],
	[story_3_today_1200_default, 1200]
]);
register([[product_powder_400_default, 400], [product_powder_800_default, 800]]);
register([[product_glutenfree_400_default, 400], [product_glutenfree_800_default, 800]]);
register([[product_granules_400_default, 400], [product_granules_800_default, 800]]);
register([[product_cake_400_default, 400], [product_cake_800_default, 800]]);
/** srcSet string for a registered image, if we generated width variants for it. */
function srcSetFor(src) {
	return src ? registry.get(src) : void 0;
}
function SmartImage({ src, alt, className, wrapperClassName, width, height, loading = "lazy", sizes, priority, fallbackLabel }) {
	const [hasError, setHasError] = (0, import_react.useState)(!src);
	const [attempt, setAttempt] = (0, import_react.useState)(0);
	if (!src || hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative flex flex-col items-center justify-center gap-2 bg-secondary/50 p-3 text-center rounded-xl", wrapperClassName),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, {
				className: "h-5 w-5 text-muted-foreground",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] leading-tight font-medium tracking-wide text-muted-foreground uppercase",
				children: fallbackLabel ?? "Image unavailable"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setHasError(false);
					setAttempt((a) => a + 1);
				},
				className: "inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
					className: "h-3 w-3",
					"aria-hidden": "true"
				}), "Retry"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative overflow-hidden bg-transparent flex items-center justify-center", wrapperClassName),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			...srcSetFor(src) ? {
				srcSet: srcSetFor(src),
				sizes: sizes ?? "100vw"
			} : {},
			...width ? { width } : {},
			...height ? { height } : {},
			loading: priority ? "eager" : loading,
			decoding: "async",
			...priority ? { fetchPriority: "high" } : {},
			onError: () => setHasError(true),
			className: cn("h-full w-full object-contain block", className)
		}, `${src}-${attempt}`)
	});
}
//#endregion
export { storyTodayImage as a, storyShopImage as i, heritageImage as n, storyKitchenImage as r, SmartImage as t };
