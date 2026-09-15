import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { tt as History } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SmartImage } from "./SmartImage-D5-Y92TW.mjs";
import { n as formatPrice, r as getProduct } from "./products-C1CBxwk4.mjs";
import { t as useRecentlyViewed } from "./recently-viewed-DaoFZCZ0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RecentlyViewed-C4_U3IyN.js
var import_jsx_runtime = require_jsx_runtime();
/** Horizontal strip of the last products this visitor opened. */
function RecentlyViewed({ currentSlug }) {
	const { slugs, clear } = useRecentlyViewed(currentSlug);
	const items = slugs.map(getProduct).filter((p) => Boolean(p));
	if (items.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-page py-12",
		"aria-labelledby": "recently-viewed",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id: "recently-viewed",
				className: "flex min-w-0 items-center gap-2 text-lg font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
					className: "h-4 w-4 shrink-0 text-primary",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: "Recently viewed"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: clear,
				className: "shrink-0 text-sm text-muted-foreground underline-offset-4 hover:underline",
				children: "Clear"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-5 flex snap-x gap-4 overflow-x-auto pb-2",
			children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "w-40 shrink-0 snap-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/product/$slug",
					params: { slug: p.slug },
					className: "group block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src: p.image,
							alt: p.name,
							sizes: "160px",
							fallbackLabel: p.name,
							wrapperClassName: "aspect-square w-full rounded-xl border border-border",
							className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-sm font-medium",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: formatPrice(p.variants[0].price)
						})
					]
				})
			}, p.slug))
		})]
	});
}
//#endregion
export { RecentlyViewed };
