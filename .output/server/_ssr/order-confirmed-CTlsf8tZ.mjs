import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-D-UdGKjf.mjs";
import { M as Package, Nt as ArrowRight, Tt as Check, ft as Copy, g as Sparkles, l as Truck, mt as Clock } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatPrice } from "./products-C1CBxwk4.mjs";
import { t as Route } from "./order-confirmed-CuI1f3XW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmed-CTlsf8tZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONFETTI_COLORS = [
	"#F59E0B",
	"#10B981",
	"#EF4444",
	"#3B82F6",
	"#8B5CF6",
	"#EC4899",
	"#FCD34D",
	"#6EE7B7"
];
function ConfettiCanvas({ trigger }) {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let width = canvas.width = window.innerWidth;
		let height = canvas.height = window.innerHeight;
		const handleResize = () => {
			if (!canvas) return;
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", handleResize);
		const particleCount = 120;
		const particles = [];
		for (let i = 0; i < particleCount; i++) {
			const originX = width / 2 + (Math.random() - .5) * 200;
			const originY = height * .25;
			particles.push({
				x: originX,
				y: originY,
				size: Math.random() * 8 + 6,
				color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
				speedX: (Math.random() - .5) * 16,
				speedY: Math.random() * -12 - 4,
				rotation: Math.random() * 360,
				rotationSpeed: (Math.random() - .5) * 10,
				opacity: 1,
				oscillationSpeed: Math.random() * .1 + .05,
				wobble: Math.random() * Math.PI * 2
			});
		}
		let animationFrameId;
		let startTime = performance.now();
		const duration = 4200;
		const render = (time) => {
			const elapsed = time - startTime;
			if (elapsed > duration) {
				ctx.clearRect(0, 0, width, height);
				return;
			}
			ctx.clearRect(0, 0, width, height);
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				p.speedY += .35;
				p.speedX *= .98;
				p.x += p.speedX + Math.sin(p.wobble) * 1.5;
				p.y += p.speedY;
				p.wobble += p.oscillationSpeed;
				p.rotation += p.rotationSpeed;
				if (elapsed > 2700) p.opacity = Math.max(0, (duration - elapsed) / 1500);
				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation * Math.PI / 180);
				ctx.globalAlpha = p.opacity;
				ctx.fillStyle = p.color;
				ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
				ctx.restore();
			}
			animationFrameId = requestAnimationFrame(render);
		};
		animationFrameId = requestAnimationFrame(render);
		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", handleResize);
		};
	}, [trigger]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "pointer-events-none fixed inset-0 z-50 h-full w-full",
		"aria-hidden": "true"
	});
}
function AnimatedOrderSuccessBadge({ onReplay }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setMounted(true), 100);
		return () => clearTimeout(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative inline-flex flex-col items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-center justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute h-28 w-28 rounded-full bg-emerald-500/20 animate-ping duration-1000" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute h-24 w-24 rounded-full bg-primary/20 animate-pulse duration-700" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl transition-all duration-700 ${mounted ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-45 opacity-0"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-10 w-10 stroke-[3.5] animate-in zoom-in-50 duration-500" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -top-1 -right-1 text-amber-400 animate-bounce duration-1000",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 fill-amber-400" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -bottom-1 -left-1 text-amber-400 animate-pulse duration-700",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 fill-amber-400" })
				})
			]
		})
	});
}
function OrderConfirmedPage() {
	const { order, total } = Route.useSearch();
	const [confettiTrigger, setConfettiTrigger] = (0, import_react.useState)(1);
	const orderId = order ?? "YG000000";
	const copyOrderId = () => {
		navigator.clipboard.writeText(orderId);
		toast.success("Order ID copied to clipboard!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden py-12 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfettiCanvas, { trigger: confettiTrigger }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page flex min-h-[65vh] flex-col items-center justify-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedOrderSuccessBadge, { onReplay: () => setConfettiTrigger((t) => t + 1) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Order Placed Successfully!" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-3 duration-700",
					children: "Thank you — your hing is being prepared!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700",
					children: "We've emailed your confirmation receipt. Your authentic compounded hing will be freshly packed and dispatched from our Tirunelveli works within 24 hours."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 w-full max-w-md rounded-2xl border border-border/80 bg-card p-5 sm:p-6 text-left shadow-lg transition-all animate-in fade-in zoom-in-95 duration-700",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-3 border-b border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium text-muted-foreground uppercase tracking-wider",
								children: "Order Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono font-bold text-base text-foreground mt-0.5",
								children: orderId
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: copyOrderId,
								className: "h-8 text-xs font-semibold gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), " Copy ID"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-3 space-y-2.5 text-xs",
							children: [
								typeof total === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Amount paid"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-sm text-foreground",
										children: formatPrice(total)
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Estimated delivery"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "2–6 working days"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Dispatch origin"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "Tirunelveli, Tamil Nadu"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 pt-3 border-t border-border/60 flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-950 dark:text-amber-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] leading-tight",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "12 Months Guaranteed Freshness:"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-90",
										children: "All products in this order carry a full 12-month shelf life from packing."
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 w-full max-w-md rounded-xl border border-border/60 bg-muted/20 p-4 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-bold text-foreground mb-3 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 text-primary" }), " Live Fulfillment Journey"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-4 gap-1 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 rounded-full bg-emerald-500 shadow-xs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-400",
									children: "Confirmed"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 rounded-full bg-amber-500 animate-pulse shadow-xs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold text-amber-600 dark:text-amber-400",
									children: "Packing"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 rounded-full bg-muted shadow-xs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Dispatch"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 rounded-full bg-muted shadow-xs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Delivery"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "font-bold gap-2 shadow-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/order/$id",
								params: { id: orderId },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), " Track your order"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "lg",
							onClick: () => setConfettiTrigger((t) => t + 1),
							className: "font-semibold gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-amber-500" }), " Celebrate Again"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "ghost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "gap-1.5",
								children: ["Continue shopping ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { OrderConfirmedPage as component };
