import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Box,
  Building2,
  CheckCircle2,
  Factory,
  FileCheck,
  Globe2,
  Mail,
  MessageSquare,
  Package,
  Phone,
  Printer,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/custom-branding")({
  head: () => ({
    meta: [
      {
        title: "White Labelling & Custom Branding — Private Label Asafoetida & Spices | Y.G Asafoetida",
      },
      {
        name: "description",
        content:
          "Partner with Y.G Asafoetida for premium white labelling, contract manufacturing, and private label custom packaging. High-potency hing powders, solid cakes, idli podis, and millet blends crafted with your brand identity.",
      },
      {
        name: "keywords",
        content:
          "white labelling hing, private label asafoetida, contract spice manufacturing India, custom branding spices, bulk hing manufacturer, Tirunelveli asafoetida wholesale, OEM spice packaging",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ygasafoetida.in/custom-branding" },
      {
        property: "og:title",
        content: "White Labelling & Custom Branding — Y.G Asafoetida",
      },
      {
        property: "og:description",
        content:
          "Turnkey private label manufacturing, formulation tuning, and custom branded packaging for gourmet brands, exporters, and supermarket chains.",
      },
      { property: "og:image", content: "https://ygasafoetida.in/products/all-product/img-1.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Private Label & White Labelling — Y.G Asafoetida",
      },
      {
        name: "twitter:description",
        content:
          "Turnkey OEM spice compounding, custom formulation, and bespoke packaging for food brands worldwide.",
      },
    ],
    links: [{ rel: "canonical", href: "https://ygasafoetida.in/custom-branding" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Y.G Asafoetida White Labelling & Private Label Contract Manufacturing",
          "serviceType": "Spice Manufacturing & Custom Branding",
          "provider": {
            "@type": "Organization",
            "name": "Y.G Asafoetida",
            "url": "https://ygasafoetida.in",
            "logo": "https://ygasafoetida.in/logo.png"
          },
          "areaServed": ["India", "United States", "United Kingdom", "United Arab Emirates", "Singapore", "Malaysia", "Australia"],
          "description": "Custom white labelling, bespoke recipe compounding, private branding, and wholesale packaging for spices and asafoetida."
        }),
      },
    ],
  }),
  component: CustomBrandingPage,
});

const CAPABILITIES = [
  {
    icon: Factory,
    title: "Custom Formulation & Potency",
    description:
      "Tune the aromatic intensity, essential aroma concentration, and Ferula oleoresin percentage (10% to 50%+ export strength) tailored precisely for your target market.",
    points: [
      "Custom carrier bases: Wheat starch, Rice flour, Tapioca, or Acacia gum",
      "100% Celiac-safe gluten-free compounding available",
      "Exact bloom-speed calibration for regional curries & gravies",
    ],
  },
  {
    icon: Box,
    title: "Multi-Format Manufacturing",
    description:
      "State-of-the-art hygienic processing lines for traditional solid pindi cakes, ultra-fine powders, slow-bloom pellets, roasted podis, and ancient millet mixes.",
    points: [
      "Gold & Premium compounded hing powders",
      "Solid compacted temple cakes & crispy nuggets",
      "Wood-roasted Idli Chutney Podis & organic Millet Porridge mixes",
    ],
  },
  {
    icon: Package,
    title: "Bespoke Packaging Options",
    description:
      "Wide spectrum of moisture-barrier, aroma-locking food containers customized with your label artwork, tamper-evident seals, and barcoding.",
    points: [
      "Airtight food-grade HDPE jars (10g, 20g, 50g, 100g, 200g, 500g)",
      "Luxury amber & transparent UV-protect glass bottles",
      "3-ply metallized barrier pouches & bulk corrugated drums (1kg – 50kg)",
    ],
  },
  {
    icon: FileCheck,
    title: "Quality Lab Testing & Compliance",
    description:
      "Complete regulatory compliance for Indian and international export markets, ensuring zero chemical additives, pure resin purity, and full batch traceability.",
    points: [
      "FSSAI Central/State, NABL Accredited lab batch testing",
      "Certificates of Analysis (COA) & Phytosanitary export documentation",
      "HACCP & ISO compliant hygienic stone milling works",
    ],
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Consultation & Formulation Sampling",
    description:
      "Share your brand vision, target aroma intensity, and texture requirements. We dispatch 3 custom formulation prototypes for your culinary testing.",
  },
  {
    step: "02",
    title: "Packaging Design & Artwork Dielines",
    description:
      "Choose container vessels (jars, pouches, tins). We supply exact dielines and assist with regulatory labeling (FSSAI codes, nutritional tables, and barcodes).",
  },
  {
    step: "03",
    title: "Batch Production & Nitrogen Sealing",
    description:
      "Fresh batches are compounded on our specialized stone mills, induction sealed for 100% moisture barrier protection, and packed under sterile conditions.",
  },
  {
    step: "04",
    title: "Doorstep Logistics & Global Export",
    description:
      "Secure palletized shipments delivered to your central warehouse, fulfillment center (Amazon FBA/Flipkart), or international sea/air port.",
  },
];

const PACKAGING_FORMATS = [
  {
    name: "Classic Food-Grade HDPE Jar",
    sizes: "20g · 50g · 100g · 200g",
    features: "Induction sealed, snap-tight cap, moisture barrier, lightweight for retail shipping.",
    idealFor: "Supermarket retail brands & general trade distribution.",
  },
  {
    name: "Luxury Amber Glass Bottle",
    sizes: "50g · 100g",
    features: "Airtight silicone gasket, UV light protection, premium countertop aesthetics.",
    idealFor: "D2C gourmet spice brands & organic luxury lines.",
  },
  {
    name: "3-Ply Stand-Up Zipper Pouch",
    sizes: "100g · 250g · 500g · 1kg",
    features: "High-barrier aluminum foil lining, resealable zipper, tear notch.",
    idealFor: "Idli Podi, Millet Pongal mixes, and health porridge lines.",
  },
  {
    name: "Industrial & Catering Bulk Drums",
    sizes: "5kg · 10kg · 25kg · 50kg",
    features: "Heavy-gauge HDPE drums with double poly liner for industrial moisture protection.",
    idealFor: "Commercial spice blenders, cloud kitchens, and pickle manufacturers.",
  },
];

function CustomBrandingPage() {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    businessType: "brand_owner",
    productInterest: "compounded_powder",
    estimatedVolume: "100kg_500kg",
    packagingType: "hdpe_jar",
    notes: "",
  });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
    const text = encodeURIComponent(
      `Hello Y.G Asafoetida Team, I am interested in White Labelling & Custom Branding for ${form.companyName || "my company"}. Please share your B2B wholesale catalog and quotation.`
    );
    window.open(`https://wa.me/919842100000?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-0">
      {/* ======================================================== */}
      {/* 1. HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/30 to-background py-12 sm:py-20">
        <div className="container-page relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase shadow-xs">
            <Building2 className="h-3.5 w-3.5" />
            <span>Turnkey OEM & Private Label Solutions</span>
          </div>

          <div className="max-w-3xl space-y-3.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Custom Branding & White Labelling 
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Harness 92 years of generational stone-milling heritage. We formulate, lab-certify, package,
              and brand authentic Asafoetida (Hing), Idli Chutney Podis, and Heritage Millet Blends under your own brand identity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" className="font-bold shadow-md gap-2 h-11 px-6 text-sm" asChild>
              <a href="#inquiry-form">
                Request Custom Quotation <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={openWhatsApp}
              className="font-bold border-border bg-card hover:bg-muted/40 h-11 px-6 text-sm gap-2"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Chat on WhatsApp Desk
            </Button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-border/80">
            <div className="rounded-xl border border-border/80 bg-card p-4 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">92+</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Years Compounding Mastery</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-card p-4 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">50 kg</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Flexible Low Starting MOQ</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-card p-4 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">100%</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Natural Resin & Starches</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-card p-4 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">14+ Countries</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Global Export Capability</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. FOUR CORE CAPABILITIES */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 bg-card border-b border-border">
        <div className="container-page space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="eyebrow">End-to-End Infrastructure</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Why Premier Food Brands Trust Y.G For White Labelling
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              From secret recipe formulation matching to automated airtight packaging, we manage the complete manufacturing pipeline.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="surface-card rounded-2xl border border-border/80 p-6 sm:p-7 space-y-4 hover:border-primary/40 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <cap.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{cap.title}</h3>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>

                <ul className="space-y-2 border-t border-border/60 pt-3">
                  {cap.points.map((pt) => (
                    <li key={pt} className="text-xs text-foreground/90 flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. PACKAGING FORMAT MATRIX */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 bg-muted/20 border-b border-border">
        <div className="container-page space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Container & Pack Options</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-0.5">
                Bespoke Packaging Designed for Maximum Freshness
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Induction sealed with ultra-high moisture barriers to protect vital aromatic terpenes.
              </p>
            </div>
            <Button variant="outline" size="sm" className="w-fit text-xs font-semibold" asChild>
              <a href="#inquiry-form">Request Packaging Samples</a>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGING_FORMATS.map((pkg) => (
              <div
                key={pkg.name}
                className="surface-card rounded-2xl border border-border/80 p-5 flex flex-col justify-between space-y-3 bg-card"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {pkg.sizes}
                  </span>
                  <h3 className="text-base font-bold text-foreground leading-snug">{pkg.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{pkg.features}</p>
                </div>
                <div className="border-t border-border/60 pt-2.5 text-[11px] text-foreground/80">
                  <span className="font-semibold text-primary">Best for: </span>
                  {pkg.idealFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. FOUR-STEP PRIVATE LABEL ONBOARDING */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 bg-card border-b border-border">
        <div className="container-page space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="eyebrow">Execution Roadmap</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              From Recipe Prototype to Market Shelf in 4 Steps
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Streamlined agile process designed for rapid launch without minimum order gridlocks.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((wf) => (
              <div
                key={wf.step}
                className="relative rounded-2xl border border-border/80 bg-background p-5 space-y-2.5 shadow-xs"
              >
                <span className="text-3xl font-black text-primary/30">{wf.step}</span>
                <h3 className="text-base font-bold text-foreground leading-snug">{wf.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{wf.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. INQUIRY FORM & DIRECT DESK */}
      {/* ======================================================== */}
      <section id="inquiry-form" className="py-12 sm:py-20 bg-muted/20">
        <div className="container-page grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Info Box */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="eyebrow">Institutional & B2B Inquiries</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-0.5">
                Ready to Launch Your Custom Branded Spice Line?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                Connect directly with our master compounders and production directors. We evaluate your specifications and provide prototype timelines, dieline files, and volume-tiered quotations within 24 hours.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Direct B2B Institutional Helpdesk
              </h3>
              <div className="space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>+91 98421 00000 / +91 462 2330000</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>b2b@ygasafoetida.in / private-label@ygasafoetida.in</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Works: Tirunelveli Industrial Corridor, Tamil Nadu 627001</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs space-y-1.5">
              <p className="font-bold text-primary flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Comprehensive Quality Assurances
              </p>
              <p className="text-muted-foreground leading-relaxed">
                All production batches are accompanied by NABL testing reports, microbial purity analyses, and airtight tamper seals.
              </p>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Inquiry Received Successfully!</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Our private label specialist has received your specifications and will follow up with formulation samples, dielines, and bulk pricing within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-xs"
                    onClick={() => {
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
                        notes: "",
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Request Formulation & Pricing Quote</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Tell us about your brand, preferred spice format, and estimated initial quantity.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="b2b-company" className="text-xs font-semibold">
                        Company / Brand Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="b2b-company"
                        required
                        placeholder="e.g. Saffron Spices Ltd."
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="b2b-person" className="text-xs font-semibold">
                        Contact Person <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="b2b-person"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={form.contactPerson}
                        onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="b2b-email" className="text-xs font-semibold">
                        Business Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="b2b-email"
                        type="email"
                        required
                        placeholder="e.g. sourcing@brand.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="b2b-phone" className="text-xs font-semibold">
                        Phone / WhatsApp <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="b2b-phone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="b2b-type" className="text-xs font-semibold">Business Type</Label>
                      <select
                        id="b2b-type"
                        value={form.businessType}
                        onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="brand_owner">D2C / Retail Spice Brand</option>
                        <option value="exporter">Spice Exporter / International Trader</option>
                        <option value="supermarket">Supermarket / Grocery Chain (Private Label)</option>
                        <option value="horeca">HoReCa / Cloud Kitchen / Food Chain</option>
                        <option value="distributor">Regional Wholesaler / Distributor</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="b2b-product" className="text-xs font-semibold">Product Line</Label>
                      <select
                        id="b2b-product"
                        value={form.productInterest}
                        onChange={(e) => setForm({ ...form, productInterest: e.target.value })}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="compounded_powder">Gold / Premium Compounded Hing Powder</option>
                        <option value="gluten_free">100% Gluten-Free Hing Powder (Rice Base)</option>
                        <option value="cake_pellets">Solid Hing Cake / Crunchy Pellets (Dana Hing)</option>
                        <option value="idli_podi">Traditional Idli Chutney Podi (Gunpowder)</option>
                        <option value="millet_mixes">Heritage Millet Pongal / Sambar / Sathu Maavu</option>
                        <option value="pooja_sambrani">Pure Natural Benzoin (Pooja Sambrani)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="b2b-volume" className="text-xs font-semibold">Estimated Batch Volume</Label>
                      <select
                        id="b2b-volume"
                        value={form.estimatedVolume}
                        onChange={(e) => setForm({ ...form, estimatedVolume: e.target.value })}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="trial_50kg">Trial Pilot Batch (50 kg – 100 kg)</option>
                        <option value="100kg_500kg">Standard Batch (100 kg – 500 kg)</option>
                        <option value="500kg_2000kg">Large Scale (500 kg – 2,000 kg)</option>
                        <option value="above_2000kg">Enterprise Contract (2,000+ kg / Monthly)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="b2b-pack" className="text-xs font-semibold">Preferred Packaging</Label>
                      <select
                        id="b2b-pack"
                        value={form.packagingType}
                        onChange={(e) => setForm({ ...form, packagingType: e.target.value })}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="hdpe_jar">Airtight HDPE Jars (Custom Label)</option>
                        <option value="glass_bottle">Luxury Glass Bottle with Gasket</option>
                        <option value="foil_pouch">3-Ply Metallized Printed Pouches</option>
                        <option value="bulk_drums">Bulk Corrugated Drums (10kg–50kg)</option>
                        <option value="custom">Custom Specified Vessel</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="b2b-notes" className="text-xs font-semibold">Custom Specifications or Requirements (Optional)</Label>
                    <Textarea
                      id="b2b-notes"
                      rows={3}
                      placeholder="Share your specific target resin ratio, aroma strength, target launch timeline, or export destination..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="text-xs"
                    />
                  </div>

                  <Button type="submit" className="w-full font-bold h-10 text-xs shadow-sm mt-2" disabled={sending}>
                    {sending ? "Submitting Inquiry..." : "Submit Private Label Inquiry"}
                  </Button>

                  <p className="text-[10px] text-muted-foreground text-center">
                    Guaranteed NDA confidentiality. Your proprietary recipes and branding details remain 100% protected.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
