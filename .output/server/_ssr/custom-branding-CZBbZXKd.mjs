import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-D-UdGKjf.mjs";
import { Dt as Box, Et as Building2, F as MessageSquare, H as Mail, M as Package, Nt as ArrowRight, g as Sparkles, k as Phone, lt as Earth, ot as FileCheck, st as Factory, x as ShieldCheck, yt as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-C2Ie51fg.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-DAvItzJA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/custom-branding-CZBbZXKd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CAPABILITIES = [
	{
		icon: Factory,
		title: "Custom Formulation & Potency",
		description: "Tune the aromatic intensity, essential aroma concentration, and Ferula oleoresin percentage (10% to 50%+ export strength) tailored precisely for your target market.",
		points: [
			"Custom carrier bases: Wheat starch, Rice flour, Tapioca, or Acacia gum",
			"100% Celiac-safe gluten-free compounding available",
			"Exact bloom-speed calibration for regional curries & gravies"
		]
	},
	{
		icon: Box,
		title: "Multi-Format Manufacturing",
		description: "State-of-the-art hygienic processing lines for traditional solid pindi cakes, ultra-fine powders, slow-bloom pellets, roasted podis, and ancient millet mixes.",
		points: [
			"Gold & Premium compounded hing powders",
			"Solid compacted temple cakes & crispy nuggets",
			"Wood-roasted Idli Chutney Podis & organic Millet Porridge mixes"
		]
	},
	{
		icon: Package,
		title: "Bespoke Packaging Options",
		description: "Wide spectrum of moisture-barrier, aroma-locking food containers customized with your label artwork, tamper-evident seals, and barcoding.",
		points: [
			"Airtight food-grade HDPE jars (10g, 20g, 50g, 100g, 200g, 500g)",
			"Luxury amber & transparent UV-protect glass bottles",
			"3-ply metallized barrier pouches & bulk corrugated drums (1kg – 50kg)"
		]
	},
	{
		icon: FileCheck,
		title: "Quality Lab Testing & Compliance",
		description: "Complete regulatory compliance for Indian and international export markets, ensuring zero chemical additives, pure resin purity, and full batch traceability.",
		points: [
			"FSSAI Central/State, NABL Accredited lab batch testing",
			"Certificates of Analysis (COA) & Phytosanitary export documentation",
			"HACCP & ISO compliant hygienic stone milling works"
		]
	}
];
var WORKFLOW_STEPS = [
	{
		step: "01",
		title: "Consultation & Formulation Sampling",
		description: "Share your brand vision, target aroma intensity, and texture requirements. We dispatch 3 custom formulation prototypes for your culinary testing."
	},
	{
		step: "02",
		title: "Packaging Design & Artwork Dielines",
		description: "Choose container vessels (jars, pouches, tins). We supply exact dielines and assist with regulatory labeling (FSSAI codes, nutritional tables, and barcodes)."
	},
	{
		step: "03",
		title: "Batch Production & Nitrogen Sealing",
		description: "Fresh batches are compounded on our specialized stone mills, induction sealed for 100% moisture barrier protection, and packed under sterile conditions."
	},
	{
		step: "04",
		title: "Doorstep Logistics & Global Export",
		description: "Secure palletized shipments delivered to your central warehouse, fulfillment center (Amazon FBA/Flipkart), or international sea/air port."
	}
];
var PACKAGING_FORMATS = [
	{
		name: "Classic Food-Grade HDPE Jar",
		sizes: "20g · 50g · 100g · 200g",
		features: "Induction sealed, snap-tight cap, moisture barrier, lightweight for retail shipping.",
		idealFor: "Supermarket retail brands & general trade distribution."
	},
	{
		name: "Luxury Amber Glass Bottle",
		sizes: "50g · 100g",
		features: "Airtight silicone gasket, UV light protection, premium countertop aesthetics.",
		idealFor: "D2C gourmet spice brands & organic luxury lines."
	},
	{
		name: "3-Ply Stand-Up Zipper Pouch",
		sizes: "100g · 250g · 500g · 1kg",
		features: "High-barrier aluminum foil lining, resealable zipper, tear notch.",
		idealFor: "Idli Podi, Millet Pongal mixes, and health porridge lines."
	},
	{
		name: "Industrial & Catering Bulk Drums",
		sizes: "5kg · 10kg · 25kg · 50kg",
		features: "Heavy-gauge HDPE drums with double poly liner for industrial moisture protection.",
		idealFor: "Commercial spice blenders, cloud kitchens, and pickle manufacturers."
	}
];
function CustomBrandingPage() {
	const [form, setForm] = (0, import_react.useState)({
		companyName: "",
		contactPerson: "",
		email: "",
		phone: "",
		businessType: "brand_owner",
		productInterest: "compounded_powder",
		estimatedVolume: "100kg_500kg",
		packagingType: "hdpe_jar",
		notes: ""
	});
	const [sending, setSending] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.companyName.trim() || !form.contactPerson.trim() || !form.phone.trim()) {
			toast.error("Please fill in your company name, contact person, and phone number.");
			return;
		}
		setSending(true);
		setTimeout(() => {
			setSending(false);
			setSubmitted(true);
			toast.success("Inquiry received! Our B2B private label team will contact you within 24 hours.");
		}, 600);
	};
	const openWhatsApp = () => {
		const text = encodeURIComponent(`Hello Y.G Asafoetida Team, I am interested in White Labelling & Custom Branding for ${form.companyName || "my company"}. Please share your B2B wholesale catalog and quotation.`);
		window.open(`https://wa.me/919842100000?text=${text}`, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/30 to-background py-12 sm:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page relative z-10 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Turnkey OEM & Private Label Solutions" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-3xl space-y-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]",
								children: "Custom Branding & White Labelling"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm sm:text-base text-muted-foreground leading-relaxed",
								children: "Harness 92 years of generational stone-milling heritage. We formulate, lab-certify, package, and brand authentic Asafoetida (Hing), Idli Chutney Podis, and Heritage Millet Blends under your own brand identity."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "font-bold shadow-md gap-2 h-11 px-6 text-sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#inquiry-form",
									children: ["Request Custom Quotation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								variant: "outline",
								onClick: openWhatsApp,
								className: "font-bold border-border bg-card hover:bg-muted/40 h-11 px-6 text-sm gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-400" }), "Chat on WhatsApp Desk"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-border/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/80 bg-card p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl sm:text-3xl font-extrabold text-foreground",
										children: "92+"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground font-medium mt-0.5",
										children: "Years Compounding Mastery"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/80 bg-card p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl sm:text-3xl font-extrabold text-foreground",
										children: "50 kg"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground font-medium mt-0.5",
										children: "Flexible Low Starting MOQ"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/80 bg-card p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl sm:text-3xl font-extrabold text-foreground",
										children: "100%"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground font-medium mt-0.5",
										children: "Natural Resin & Starches"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/80 bg-card p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl sm:text-3xl font-extrabold text-foreground",
										children: "14+ Countries"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground font-medium mt-0.5",
										children: "Global Export Capability"
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-12 sm:py-16 bg-card border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page space-y-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-2xl mx-auto space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "End-to-End Infrastructure"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl font-bold tracking-tight text-foreground",
								children: "Why Premier Food Brands Trust Y.G For White Labelling"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-muted-foreground",
								children: "From secret recipe formulation matching to automated airtight packaging, we manage the complete manufacturing pipeline."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 md:grid-cols-2",
						children: CAPABILITIES.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card rounded-2xl border border-border/80 p-6 sm:p-7 space-y-4 hover:border-primary/40 transition-colors shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(cap.icon, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-foreground",
										children: cap.title
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-muted-foreground leading-relaxed",
									children: cap.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2 border-t border-border/60 pt-3",
									children: cap.points.map((pt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "text-xs text-foreground/90 flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pt })]
									}, pt))
								})
							]
						}, cap.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-12 sm:py-16 bg-muted/20 border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page space-y-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Container & Pack Options"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-0.5",
								children: "Bespoke Packaging Designed for Maximum Freshness"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-muted-foreground mt-1",
								children: "Induction sealed with ultra-high moisture barriers to protect vital aromatic terpenes."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "w-fit text-xs font-semibold",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#inquiry-form",
								children: "Request Packaging Samples"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: PACKAGING_FORMATS.map((pkg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card rounded-2xl border border-border/80 p-5 flex flex-col justify-between space-y-3 bg-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full",
										children: pkg.sizes
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-bold text-foreground leading-snug",
										children: pkg.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: pkg.features
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border/60 pt-2.5 text-[11px] text-foreground/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary",
									children: "Best for: "
								}), pkg.idealFor]
							})]
						}, pkg.name))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-12 sm:py-16 bg-card border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page space-y-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-2xl mx-auto space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Execution Roadmap"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl font-bold tracking-tight text-foreground",
								children: "From Recipe Prototype to Market Shelf in 4 Steps"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-muted-foreground",
								children: "Streamlined agile process designed for rapid launch without minimum order gridlocks."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
						children: WORKFLOW_STEPS.map((wf) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative rounded-2xl border border-border/80 bg-background p-5 space-y-2.5 shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-black text-primary/30",
									children: wf.step
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground leading-snug",
									children: wf.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: wf.description
								})
							]
						}, wf.step))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "inquiry-form",
				className: "py-12 sm:py-20 bg-muted/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page grid gap-10 lg:grid-cols-12 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Institutional & B2B Inquiries"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-0.5",
									children: "Ready to Launch Your Custom Branded Spice Line?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed",
									children: "Connect directly with our master compounders and production directors. We evaluate your specifications and provide prototype timelines, dieline files, and volume-tiered quotations within 24 hours."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-bold text-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), " Direct B2B Institutional Helpdesk"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+91 98421 00000 / +91 462 2330000" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "b2b@ygasafoetida.in / private-label@ygasafoetida.in" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Works: Tirunelveli Industrial Corridor, Tamil Nadu 627001" })]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold text-primary flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), " Comprehensive Quality Assurances"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground leading-relaxed",
									children: "All production batches are accompanied by NABL testing reports, microbial purity analyses, and airtight tamper seals."
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm",
							children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-10 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-foreground",
										children: "Inquiry Received Successfully!"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed",
										children: "Thank you for reaching out. Our private label specialist has received your specifications and will follow up with formulation samples, dielines, and bulk pricing within 24 hours."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										className: "mt-2 text-xs",
										onClick: () => {
											setSubmitted(false);
											setForm({
												companyName: "",
												contactPerson: "",
												email: "",
												phone: "",
												businessType: "brand_owner",
												productInterest: "compounded_powder",
												estimatedVolume: "100kg_500kg",
												packagingType: "hdpe_jar",
												notes: ""
											});
										},
										children: "Submit Another Inquiry"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit,
								className: "space-y-4",
								noValidate: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-foreground",
										children: "Request Formulation & Pricing Quote"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: "Tell us about your brand, preferred spice format, and estimated initial quantity."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "b2b-company",
												className: "text-xs font-semibold",
												children: ["Company / Brand Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "b2b-company",
												required: true,
												placeholder: "e.g. Saffron Spices Ltd.",
												value: form.companyName,
												onChange: (e) => setForm({
													...form,
													companyName: e.target.value
												}),
												className: "h-9 text-xs"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "b2b-person",
												className: "text-xs font-semibold",
												children: ["Contact Person ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "b2b-person",
												required: true,
												placeholder: "e.g. Rajesh Kumar",
												value: form.contactPerson,
												onChange: (e) => setForm({
													...form,
													contactPerson: e.target.value
												}),
												className: "h-9 text-xs"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "b2b-email",
												className: "text-xs font-semibold",
												children: ["Business Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "b2b-email",
												type: "email",
												required: true,
												placeholder: "e.g. sourcing@brand.com",
												value: form.email,
												onChange: (e) => setForm({
													...form,
													email: e.target.value
												}),
												className: "h-9 text-xs"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "b2b-phone",
												className: "text-xs font-semibold",
												children: ["Phone / WhatsApp ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "b2b-phone",
												type: "tel",
												required: true,
												placeholder: "e.g. +91 98765 43210",
												value: form.phone,
												onChange: (e) => setForm({
													...form,
													phone: e.target.value
												}),
												className: "h-9 text-xs"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "b2b-type",
												className: "text-xs font-semibold",
												children: "Business Type"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "b2b-type",
												value: form.businessType,
												onChange: (e) => setForm({
													...form,
													businessType: e.target.value
												}),
												className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "brand_owner",
														children: "D2C / Retail Spice Brand"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "exporter",
														children: "Spice Exporter / International Trader"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "supermarket",
														children: "Supermarket / Grocery Chain (Private Label)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "horeca",
														children: "HoReCa / Cloud Kitchen / Food Chain"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "distributor",
														children: "Regional Wholesaler / Distributor"
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "b2b-product",
												className: "text-xs font-semibold",
												children: "Product Line"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "b2b-product",
												value: form.productInterest,
												onChange: (e) => setForm({
													...form,
													productInterest: e.target.value
												}),
												className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "compounded_powder",
														children: "Gold / Premium Compounded Hing Powder"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "gluten_free",
														children: "100% Gluten-Free Hing Powder (Rice Base)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "cake_pellets",
														children: "Solid Hing Cake / Crunchy Pellets (Dana Hing)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "idli_podi",
														children: "Traditional Idli Chutney Podi (Gunpowder)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "millet_mixes",
														children: "Heritage Millet Pongal / Sambar / Sathu Maavu"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "pooja_sambrani",
														children: "Pure Natural Benzoin (Pooja Sambrani)"
													})
												]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "b2b-volume",
												className: "text-xs font-semibold",
												children: "Estimated Batch Volume"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "b2b-volume",
												value: form.estimatedVolume,
												onChange: (e) => setForm({
													...form,
													estimatedVolume: e.target.value
												}),
												className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "trial_50kg",
														children: "Trial Pilot Batch (50 kg – 100 kg)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "100kg_500kg",
														children: "Standard Batch (100 kg – 500 kg)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "500kg_2000kg",
														children: "Large Scale (500 kg – 2,000 kg)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "above_2000kg",
														children: "Enterprise Contract (2,000+ kg / Monthly)"
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "b2b-pack",
												className: "text-xs font-semibold",
												children: "Preferred Packaging"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "b2b-pack",
												value: form.packagingType,
												onChange: (e) => setForm({
													...form,
													packagingType: e.target.value
												}),
												className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "hdpe_jar",
														children: "Airtight HDPE Jars (Custom Label)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "glass_bottle",
														children: "Luxury Glass Bottle with Gasket"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "foil_pouch",
														children: "3-Ply Metallized Printed Pouches"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "bulk_drums",
														children: "Bulk Corrugated Drums (10kg–50kg)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "custom",
														children: "Custom Specified Vessel"
													})
												]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "b2b-notes",
											className: "text-xs font-semibold",
											children: "Custom Specifications or Requirements (Optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "b2b-notes",
											rows: 3,
											placeholder: "Share your specific target resin ratio, aroma strength, target launch timeline, or export destination...",
											value: form.notes,
											onChange: (e) => setForm({
												...form,
												notes: e.target.value
											}),
											className: "text-xs"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										className: "w-full font-bold h-10 text-xs shadow-sm mt-2",
										disabled: sending,
										children: sending ? "Submitting Inquiry..." : "Submit Private Label Inquiry"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground text-center",
										children: "Guaranteed NDA confidentiality. Your proprietary recipes and branding details remain 100% protected."
									})
								]
							})
						})
					})]
				})
			})
		]
	});
}
//#endregion
export { CustomBrandingPage as component };
