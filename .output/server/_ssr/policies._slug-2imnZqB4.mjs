import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as ShieldCheck } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as policies, t as Route } from "./policies._slug-CAjdWI3y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policies._slug-2imnZqB4.js
var import_jsx_runtime = require_jsx_runtime();
function PolicyPage() {
	const policy = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page py-10 sm:py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Policies",
				className: "lg:sticky lg:top-28 lg:self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Policies"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0",
					children: policies.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/policies/$slug",
							params: { slug: p.slug },
							className: "block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
							activeProps: { className: "bg-secondary text-foreground" },
							children: p.title
						})
					}, p.slug))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
						children: policy.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg text-muted-foreground",
						children: policy.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs tracking-wide text-muted-foreground uppercase",
						children: ["Last updated ", policy.updated]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 space-y-9",
						children: policy.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold",
								children: s.heading
							}),
							s.body.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								children: b
							}, b)),
							s.bullets ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2",
								children: s.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary",
										"aria-hidden": true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
								}, b))
							}) : null
						] }, s.heading))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 flex gap-3 rounded-xl border border-border bg-secondary/50 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
							className: "mt-0.5 h-5 w-5 shrink-0 text-primary",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"Something here unclear? Write to",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "font-medium text-foreground underline",
									href: "mailto:care@ygasafoetida.in",
									children: "care@ygasafoetida.in"
								}),
								" ",
								"or use the",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "font-medium text-foreground underline",
									children: "contact form"
								}),
								". A person in Tirunelveli answers, usually the same day."
							]
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { PolicyPage as component };
