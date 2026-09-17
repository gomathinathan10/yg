import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor,
  ArrowRight,
  Award,
  Box,
  Building2,
  CheckCircle2,
  Container,
  Factory,
  FileCheck2,
  Globe2,
  Leaf,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Plane,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
  WheatOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/exports")({
  head: () => ({
    meta: [
      {
        title: "Global Exports — Pure Asafoetida, Spices & Podis Worldwide | Mayil Agro Foods / Y.G",
      },
      {
        name: "description",
        content:
          "Official Export Division of Mayil Agro Foods / Y.G Asafoetida. Exporting pure compounded Hing, Vismaya Podis, Gluten-Free Asafoetida & Appalam to Singapore, Malaysia, Sri Lanka, Canada & USA. Certified by FSSAI, MSME, NSIC, US FDA Registered, ZED Bronze & IEC.",
      },
      {
        name: "keywords",
        content:
          "asafoetida export India, hing export wholesale, FDA registered spices exporter, FSSAI export license, ZED certified hing, IEC import export code spices, Tuticorin port spices exporter, Singapore hing import, Malaysia spices import, USA hing distributor",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ygasafoetida.in/exports" },
      {
        property: "og:title",
        content: "Global Exports — Mayil Agro Foods / Y.G Asafoetida",
      },
      {
        property: "og:description",
        content:
          "Official Export Division: High-potency compounded hing, solid temple cakes, gluten-free formulations and Vismaya podis exported worldwide from Tirunelveli.",
      },
      { property: "og:image", content: "https://ygasafoetida.in/products/all-product/img-1.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ygasafoetida.in/exports" }],
  }),
  component: ExportsPage,
});

/**
 * 6 KEY CERTIFICATIONS & QUALITY STANDARDS (From Official Profile Page 10)
 */
const QUALITY_CERTIFICATIONS = [
  {
    id: "fssai",
    badge: "FSSAI",
    image: "/images/certificates/fssai.svg",
    fullName: "Food Safety & Standards Authority of India",
    subtitle: "Central Export License & Quality Standards",
    authority: "Government of India",
    description:
      "Compliant with apex food safety and hygiene regulations, rigorous microbiological limits, aflatoxin screening, and heavy metal testing for zero contamination.",
    tag: "Central License",
    code: "Lic. No. 10019042005085",
  },
  {
    id: "msme",
    badge: "MSME",
    image: "/images/certificates/msme.svg",
    fullName: "Ministry of MSME, Govt. of India",
    subtitle: "Micro, Small & Medium Enterprises",
    authority: "Ministry of MSME, Govt. of India",
    description:
      "Recognized manufacturing enterprise with certified modern spice compounding facilities, standardized operating procedures, and state-of-the-art packaging.",
    tag: "Govt. Accredited",
    code: "UDYAM Registered",
  },
  {
    id: "nsic",
    badge: "NSIC",
    image: "/images/certificates/nsic.svg",
    fullName: "National Small Industries Corporation",
    subtitle: "एन एस आई सी — Govt. of India Enterprise",
    authority: "Govt. of India Enterprise",
    description:
      "Government-audited commercial production capability, certified raw material handling, and consistent high-volume industrial processing reliability.",
    tag: "National Accredited",
    code: "NSIC Certified",
  },
  {
    id: "fda",
    badge: "FDA",
    image: "/images/certificates/fda.svg",
    fullName: "U.S. Food & Drug Administration",
    subtitle: "FDA REGISTERED FACILITY",
    authority: "United States FDA",
    description:
      "Facility registered with US FDA readiness for seamless direct commercial imports into the United States of America with FSVP traceability compliance.",
    tag: "USA Compliant",
    code: "FDA Registration Active",
  },
  {
    id: "zed",
    badge: "ZED BRONZE",
    image: "/images/certificates/zed.svg",
    fullName: "Zero Defect Zero Effect Certification",
    subtitle: "CERTIFIED COMPANY — ZED BRONZE",
    authority: "Ministry of MSME, Govt. of India",
    description:
      "Eco-friendly manufacturing validation ensuring production with zero defect rate in finished goods and zero detrimental ecological footprint.",
    tag: "Eco-Friendly Quality",
    code: "ZED Bronze Level",
  },
  {
    id: "iec",
    badge: "IEC",
    image: "/images/certificates/iec.svg",
    fullName: "Directorate General of Foreign Trade (DGFT)",
    subtitle: "IMPORT EXPORT CODE",
    authority: "Ministry of Commerce & Industry, India",
    description:
      "Official statutory authorization granted to Mayil Agro Foods for direct worldwide export of compounded spices, culinary herbs, and processed agro foods.",
    tag: "Statutory License",
    code: "IEC Code Validated",
  },
];

/**
 * THE PRODUCTION PROCESS (From Official Profile Page 11)
 * 4-Step Staircase Flow
 */
const PRODUCTION_PROCESS_STEPS = [
  {
    step: "01",
    title: "Sourcing & Sorting",
    quote: "Selecting high quality raw material and removing impurities",
    details:
      "Hand-procured Grade-A pure Ferula asafoetida gum-resins from traditional cultivators in arid mountain ranges. Meticulous dual-stage manual inspection and optical gravity sorting eliminate all natural impurities, dust, and non-conforming particles.",
    highlight: "100% Pure Raw Resin Selection",
  },
  {
    step: "02",
    title: "Grinding & Blending",
    quote: "Finely grinding materials and mixing with dedication",
    details:
      "Time-honored compounding on traditional granite stone mills combined with precision micro-milling at temperature-monitored speeds. This cold-processing technique safeguards delicate volatile aroma terpenes and medicinal phytochemicals.",
    highlight: "Cold Granite Milling",
  },
  {
    step: "03",
    title: "Drying",
    quote: "Removing moisture to preserve freshness and potency",
    details:
      "Controlled sterile air-drying chambers systematically extract moisture to below 8% standard equilibrium. Prevents microbial growth, stops powder clumping, and ensures long-lasting shelf stability across variable oceanic shipping climates.",
    highlight: "Sterile Moisture Extraction",
  },
  {
    step: "04",
    title: "Packaging & Delivery",
    quote: "Sealing for freshness and distributing to markets",
    details:
      "Hermetic automated nitrogen-flushed retail sealing and 3-ply moisture-barrier multiwall export bulk drums. Dispatched via container trailers directly to Tuticorin VOC Port and Chennai Seaport for rapid worldwide oceanic transit.",
    highlight: "Airtight Export Packing",
  },
];

/**
 * OUR GLOBAL DISTRIBUTION NETWORK (From Official Profile Page 12)
 * 5 Key International Markets
 */
const GLOBAL_DISTRIBUTION = [
  {
    country: "Singapore",
    image: "/images/exports/singapore.jpg",
    region: "Southeast Asia Hub",
    description:
      "Supplying prominent supermarket chains, spice wholesalers, and ethnic retail distributors throughout Little India, Jurong, and central Singapore.",
    focus: "Retail Jars & Catering Packs",
  },
  {
    country: "Malaysia",
    image: "/images/exports/malaysia.jpg",
    region: "ASEAN Distribution",
    description:
      "Comprehensive distribution serving South Indian diaspora grocers, hypermarket spice aisles, and commercial kitchen suppliers across Klang Valley, Penang & Johor.",
    focus: "Compounded Hing & Vismaya Podis",
  },
  {
    country: "Sri Lanka",
    image: "/images/exports/srilanka.jpg",
    region: "Indian Ocean Gateway",
    description:
      "Historic trade corridor partner importing authentic solid cakes (Pindi Hing) and extra-strength granules for culinary traditions and spice blending.",
    focus: "Solid Temple Cakes & Pellets",
  },
  {
    country: "Canada",
    image: "/images/exports/canada.jpg",
    region: "North American Market",
    description:
      "Direct regular supplies to South Asian supermarket chains and health food distributors across the Greater Toronto Area, Vancouver, and Ontario.",
    focus: "Gluten-Free Hing & Retail Packs",
  },
  {
    country: "United States",
    image: "/images/exports/usa.jpg",
    region: "Americas Direct",
    description:
      "FDA-registered compliant container shipments to US East & West coast ethnic food importers, specialty retail distributors, and commercial seasoning manufacturers.",
    focus: "Bulk Drums & Private Label Supply",
  },
];

const EXPORT_PRODUCTS = [
  {
    title: "High-Potency Compounded Hing Powder",
    spec: "Grade A Ferula Oleoresin (10% to 50% export strength)",
    description: "Cold-compounded on traditional granite mills to preserve volatile aroma terpenes.",
    formats: "20g to 500g airtight retail jars · 25kg to 50kg industrial moisture-barrier drums.",
  },
  {
    title: "100% Gluten-Free Asafoetida (Celiac-Safe)",
    spec: "Pure Rice-Starch & Gum Arabic Base · Zero Wheat Content",
    description: "Specially formulated for Western & global health food markets demanding certified gluten-free assurance.",
    formats: "50g, 100g, 200g UV-protected containers · 25kg bulk kraft drums.",
  },
  {
    title: "Traditional Solid Cakes & Crunchy Pellets",
    spec: "Dense Pindi Cake & Slow-Bloom Dana Pellets",
    description: "Ancient royal preparation prized for ultra-long aroma retention during oceanic shipping and prolonged storage.",
    formats: "50g & 100g sealed tins/packs · 10kg, 25kg bulk containers.",
  },
  {
    title: "Vismaya Podis & Authentic Rice Mixes",
    spec: "Idly Podi, Ellu Podi, Paruppu Podi & Andhra Special",
    description: "Wood-roasted pulses and pure spices delivering instant homemade South Indian taste to international diaspora kitchens.",
    formats: "100g, 200g, 500g, 1kg 3-ply barrier zipper pouches.",
  },
  {
    title: "Artisanal Handmade Appalam",
    spec: "Hand-rolled in traditional small patches",
    description: "Sun-dried and packaged with high-barrier moisture protection for crisp export transit.",
    formats: "100g & 200g master cartons · Custom distributor packing.",
  },
  {
    title: "Heritage Millet & Sathu Maavu Blends",
    spec: "Multi-millet nutrient blends and health mixes",
    description: "Wholesome native grain formulations tailored for modern health & organic supermarket chains.",
    formats: "250g, 500g, 1kg airtight pouches · 25kg drums.",
  },
];

const LOGISTICS_HUBS = [
  {
    icon: Ship,
    title: "Tuticorin Sea Port (VOC Port)",
    distance: "50 km from Factory",
    description: "Primary direct international container terminal offering direct sea freight connectivity to Southeast Asia, Middle East, Europe & Americas.",
    tag: "Primary Sea Hub",
  },
  {
    icon: Anchor,
    title: "Chennai Sea Port",
    distance: "Overnight Road Transit",
    description: "Secondary major container gateway for deep-sea routes and large volume consolidation shipments.",
    tag: "Secondary Sea Hub",
  },
  {
    icon: Plane,
    title: "Madurai & Trivandrum Air Cargo",
    distance: "100 km / 140 km from Works",
    description: "High-priority air cargo terminals for expedited commercial sampling, urgent LCL parcels, and gourmet retail dispatches.",
    tag: "Air Freight Hub",
  },
];

function ExportsPage() {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    destinationPort: "",
    productInterest: "compounded_hing",
    shipmentVolume: "trial_25kg",
    incoterm: "FOB",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName.trim() || !form.contactPerson.trim() || !form.email.trim() || !form.country.trim()) {
      toast.error("Please fill in company name, contact person, email, and destination country.");
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      toast.success("Export enquiry received! Our international trade desk will reply within 24 hours.");
    }, 600);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Mayil Agro Foods / YG Export Desk, I am interested in importing products to ${form.country || "our country"}. Please share your export catalog and FOB/CIF rates.`
    );
    window.open(`https://wa.me/917200622221?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-0 font-sans bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-[#E8DEC8] bg-white py-3">
        <div className="container-page flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors font-medium">Home</Link>
            <span>/</span>
            <span className="font-bold text-foreground">Global Exports</span>
          </div>
          <span className="text-[11px] font-bold text-[#181206] bg-[#FFC700] px-2.5 py-0.5 rounded-full shadow-2xs border border-[#D8A700]">
            Exporting Across Nations Monthly
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden border-b border-[#E8DEC8] bg-white py-12 sm:py-20">
        <div className="container-page relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8A700] bg-[#FFC700] px-3.5 py-1 text-xs font-bold text-[#181206] uppercase shadow-2xs">
            <Globe2 className="h-3.5 w-3.5" />
            <span>International Trade Desk &amp; Bulk Shipments</span>
          </div>

          <div className="max-w-3xl space-y-3.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Global Exports of Pure Asafoetida &amp; Authentic South Indian Spices
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Exporting high-grade compounded hing, solid temple cakes, gluten-free formulations, and Vismaya podis worldwide from Tirunelveli. Direct container dispatches from Tuticorin and Chennai sea ports with complete regulatory compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" className="font-bold shadow-md gap-2 h-11 px-6 text-sm bg-[#FFC700] hover:bg-[#F0B800] text-[#181206] border border-[#D8A700]" asChild>
              <a href="#export-inquiry">
                Request Export Quotation <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={openWhatsApp}
              className="font-bold border-border bg-card hover:bg-muted/40 h-11 px-6 text-sm gap-2"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Chat on Export WhatsApp (+91 7200622221)
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-bold border-border bg-card hover:bg-muted/40 h-11 px-6 text-sm gap-2"
              asChild
            >
              <a href="mailto:Exports@yghing.com">
                <Mail className="h-4 w-4 text-primary" />
                Exports@yghing.com
              </a>
            </Button>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-border">
            <div className="rounded-xl border border-border/80 bg-card p-4 text-center shadow-xs">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">5+ Nations</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Singapore, Malaysia, Sri Lanka, Canada &amp; USA</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-card p-4 text-center shadow-xs">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">25 kg</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Flexible Low Starting MOQ</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-card p-4 text-center shadow-xs">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">50 km</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Tuticorin VOC Sea Port Proximity</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-card p-4 text-center shadow-xs">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">100%</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Tested Purity &amp; Traceability</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. OUR CERTIFICATIONS & QUALITY STANDARDS (PDF PAGE 10)  */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 bg-card border-b border-border">
        <div className="container-page space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC700]/20 border border-[#FFC700]/40 text-[#181206] text-xs font-bold uppercase tracking-wider">
              <Award className="h-3.5 w-3.5 text-[#8C5921]" />
              <span>YG Trusted Since 1931 · Quality Benchmarks</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground uppercase">
              Our Certifications &amp; Quality Standards
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every batch produced at Mayil Agro Foods adheres to central food statutory codes, international trade standards, and global import requirements.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {QUALITY_CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="rounded-2xl border border-border/80 bg-background p-6 space-y-4 shadow-xs hover:border-[#FFC700] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Certificate Logo Graphic */}
                  <div className="h-24 w-full rounded-xl bg-white border border-border/80 p-3 flex items-center justify-center shadow-2xs group-hover:border-[#FFC700]/70 group-hover:shadow-xs transition-all duration-300">
                    <img
                      src={cert.image}
                      alt={`${cert.fullName} Certificate Logo`}
                      className="h-full max-h-16 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-b border-border/60 pb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C5921]">
                      {cert.authority}
                    </span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                      {cert.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">{cert.fullName}</h3>
                    <p className="text-xs font-semibold text-[#8C5921] mt-0.5">
                      {cert.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="border-t border-border/60 pt-3 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-muted-foreground">{cert.code}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 text-[10px]">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified Standard
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. THE PRODUCTION PROCESS (PDF PAGE 11)                  */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 bg-white border-b border-border">
        <div className="container-page space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC700] border border-[#D8A700] text-[#181206] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Factory className="h-3.5 w-3.5" />
              <span>Factory Manufacturing Journey</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground uppercase">
              The Production Process
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              From harvesting pure mountain Ferula oleoresin to sterile vacuum packaging, our 4-stage pipeline guarantees pure aroma, active potency, and prolonged oceanic shelf stability.
            </p>
          </div>

          {/* Stepped Staircase Layout */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PRODUCTION_PROCESS_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-[#FFC700] transition-all flex flex-col justify-between space-y-4 group"
              >
                {/* Step Marker Badge */}
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-[#FFC700] text-[#181206] font-black text-lg flex items-center justify-center shadow-xs border border-[#D8A700]">
                    {item.step}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Stage 0{index + 1} of 04
                  </span>
                </div>

                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-[#8C5921] transition-colors">
                    {item.title}
                  </h3>

                  {/* PDF Direct Quote */}
                  <blockquote className="border-l-2 border-[#FFC700] pl-2.5 py-0.5 text-xs font-semibold text-foreground/90 italic">
                    "{item.quote}"
                  </blockquote>

                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {item.details}
                  </p>
                </div>

                <div className="border-t border-border/60 pt-3 text-[11px] font-bold text-[#8C5921] flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Slogan Banner in Red Script Calligraphy (Matching PDF Page 12) */}
          <div className="rounded-2xl border border-red-200 dark:border-red-950/60 bg-gradient-to-r from-red-50/70 via-rose-50/50 to-red-50/70 dark:from-red-950/20 dark:via-rose-950/10 dark:to-red-950/20 p-6 sm:p-8 text-center shadow-xs">
            <p className="font-serif italic text-lg sm:text-2xl text-red-600 dark:text-red-400 font-bold tracking-wide">
              "Committed to eco-friendly practices and stringent hygiene standards in production"
            </p>
            <p className="text-xs text-muted-foreground mt-1.5 uppercase tracking-widest font-semibold">
              Mayil Agro Foods / Y.G Asafoetida Quality Pledge
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. OUR GLOBAL DISTRIBUTION NETWORK (PDF PAGE 12)         */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 bg-card border-b border-border">
        <div className="container-page space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC700] border border-[#D8A700] text-[#181206] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Globe2 className="h-3.5 w-3.5" />
              <span>International Shipments</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground uppercase">
              Our Global Distribution Network
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
              Export quality asafoetida reach national and international markets across nations monthly.
            </p>
          </div>

          {/* 5 Destination Country Cards with High Quality Photos */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {GLOBAL_DISTRIBUTION.map((item) => (
              <div
                key={item.country}
                className="rounded-2xl border border-border bg-background overflow-hidden shadow-xs hover:border-[#FFC700] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.country}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#FFC700] block">
                      {item.region}
                    </span>
                    <h3 className="text-lg font-extrabold leading-tight drop-shadow-xs">{item.country}</h3>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <div className="border-t border-border/60 pt-2.5 text-[11px] font-semibold text-[#8C5921]">
                    <span className="text-foreground/80 font-normal">Primary exports: </span>
                    {item.focus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. EXPORT PRODUCT PORTFOLIO                              */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 bg-muted/20 border-b border-border">
        <div className="container-page space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="eyebrow">Export Grade Portfolio</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Formulated &amp; Packaged for Global Standards
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Available under Y.G / Mayil Agro Foods branding or customized turnkey private labelling with overseas barcode compliance.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXPORT_PRODUCTS.map((prod) => (
              <div
                key={prod.title}
                className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {prod.spec}
                  </span>
                  <h3 className="text-base font-bold text-foreground leading-snug">{prod.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{prod.description}</p>
                </div>
                <div className="border-t border-border/60 pt-3 text-[11px] text-foreground/80">
                  <strong className="text-primary font-semibold">Packaging: </strong>
                  {prod.formats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. LOGISTICS HUBS & PORTS                                */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 bg-card border-b border-border">
        <div className="container-page space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="eyebrow">Oceanic &amp; Air Gateways</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Rapid Worldwide Logistics From Southern Hubs
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Our factory in Tirunelveli sits within immediate proximity to Tamil Nadu's deep-water international sea gateways.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {LOGISTICS_HUBS.map((hub) => (
              <div key={hub.title} className="rounded-2xl border border-border bg-background p-6 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <hub.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    {hub.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground">{hub.title}</h3>
                <p className="text-xs font-semibold text-primary">{hub.distance}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{hub.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. DEDICATED EXPORT CONTACT DESK & INQUIRY FORM          */}
      {/* ======================================================== */}
      <section id="export-inquiry" className="py-12 sm:py-20 bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-12 items-start">
          {/* Left: Dedicated Export Contact Directory */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="eyebrow">Exclusive Export Trade Desk</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-0.5">
                Direct Contact Details for Global Buyers
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                All export inquiries, quotation requests, and commercial samples are handled exclusively through our dedicated export division. Our team replies with FOB/CIF rates, certificates of analysis, and technical data sheets within 24 hours.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8A700]/50 bg-[#FAF3D6]/70 p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#181206] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#8C5921]" /> Dedicated Export Division Contacts
              </h3>
              <div className="space-y-3.5 text-xs text-foreground/90">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#8C5921] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#181206]">Works &amp; Registered Office:</strong><br />
                    Mayil Agro Foods<br />
                    1/303, M.K. Nagar, Near to HP Fuel Station, Abhisekapatti, Tirunelveli - Tenkasi Main Road, Tirunelveli - 627 012, Tamil Nadu, India
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#8C5921] shrink-0" />
                  <span>
                    Dedicated Export Email:{" "}
                    <a href="mailto:Exports@yghing.com" className="font-bold text-[#181206] underline hover:text-[#8C5921]">
                      Exports@yghing.com
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#8C5921] shrink-0" />
                  <span>
                    Export WhatsApp &amp; Mobile:{" "}
                    <a href="https://wa.me/917200622221" target="_blank" rel="noreferrer" className="font-bold text-[#181206] underline hover:text-[#8C5921]">
                      +91 7200622221
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#8C5921] shrink-0" />
                  <span>
                    Telephone: <strong className="text-[#181206]">0462 - 233 5555</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#8C5921] shrink-0" />
                  <span>
                    Trade Desk: <strong className="text-[#181206]">+91 7904567979</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs space-y-1.5">
              <p className="font-bold text-primary flex items-center gap-1.5">
                <Container className="h-4 w-4" /> Container Loading (LCL &amp; FCL)
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Standard pallets packed with moisture-absorbing desiccants and stretch shrink wrap to withstand oceanic transit across varying climatic zones.
              </p>
            </div>
          </div>

          {/* Right Export Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Export Enquiry Submitted!</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you for your inquiry. Our international trade team has received your destination requirements and will send technical specifications, pricing, and freight estimates to {form.email} within 24 hours.
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
                        country: "",
                        destinationPort: "",
                        productInterest: "compounded_hing",
                        shipmentVolume: "trial_25kg",
                        incoterm: "FOB",
                        message: "",
                      });
                    }}
                  >
                    Submit Another Export Enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Request Export Catalog &amp; Quotation</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Direct trade desk for international importers, overseas brands, and distributors.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="exp-company" className="text-xs font-semibold">
                        Company / Importer Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="exp-company"
                        required
                        placeholder="e.g. Pacific Global Foods Inc."
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="exp-person" className="text-xs font-semibold">
                        Contact Person <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="exp-person"
                        required
                        placeholder="e.g. David Miller"
                        value={form.contactPerson}
                        onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="exp-email" className="text-xs font-semibold">
                        Business Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="exp-email"
                        type="email"
                        required
                        placeholder="e.g. procurement@pacificfoods.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="exp-phone" className="text-xs font-semibold">
                        Phone / WhatsApp <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="exp-phone"
                        type="tel"
                        required
                        placeholder="e.g. +1 415 555 2671"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="exp-country" className="text-xs font-semibold">
                        Destination Country <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="exp-country"
                        required
                        placeholder="e.g. Singapore, Malaysia, Sri Lanka, Canada, USA..."
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="exp-port" className="text-xs font-semibold">
                        Destination Seaport / Airport
                      </Label>
                      <Input
                        id="exp-port"
                        placeholder="e.g. Port of Singapore, Port Klang, Colombo, Vancouver, New York..."
                        value={form.destinationPort}
                        onChange={(e) => setForm({ ...form, destinationPort: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="exp-prod" className="text-xs font-semibold">Product Interest</Label>
                      <select
                        id="exp-prod"
                        value={form.productInterest}
                        onChange={(e) => setForm({ ...form, productInterest: e.target.value })}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="compounded_hing">Compounded Hing Powder</option>
                        <option value="gluten_free">Gluten-Free Hing (Rice Base)</option>
                        <option value="cake_pellets">Solid Cake / Pellets</option>
                        <option value="vismaya_podis">Vismaya Podis &amp; Rice Mixes</option>
                        <option value="appalam">Traditional Handmade Appalam</option>
                        <option value="millets">Millet Health Blends</option>
                        <option value="all_mixed">Mixed Consolidated Container</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="exp-vol" className="text-xs font-semibold">Shipment Volume</Label>
                      <select
                        id="exp-vol"
                        value={form.shipmentVolume}
                        onChange={(e) => setForm({ ...form, shipmentVolume: e.target.value })}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="trial_25kg">Trial Order (25 kg – 100 kg)</option>
                        <option value="lcl_500kg">LCL Cargo (100 kg – 1,000 kg)</option>
                        <option value="fcl_20ft">20 ft Container (FCL)</option>
                        <option value="fcl_40ft">40 ft Container (FCL)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="exp-inco" className="text-xs font-semibold">Preferred Incoterm</Label>
                      <select
                        id="exp-inco"
                        value={form.incoterm}
                        onChange={(e) => setForm({ ...form, incoterm: e.target.value })}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="FOB">FOB (Tuticorin / Chennai)</option>
                        <option value="CIF">CIF (Destination Port)</option>
                        <option value="CFR">CFR</option>
                        <option value="EXW">Ex-Works (Factory Tirunelveli)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="exp-msg" className="text-xs font-semibold">Specific Requirements or Packaging Notes</Label>
                    <Textarea
                      id="exp-msg"
                      rows={3}
                      placeholder="Specify your private label requirements, target launch timeline, or specific certifications required..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="text-xs"
                    />
                  </div>

                  <Button type="submit" className="w-full font-bold h-10 text-xs shadow-sm mt-2 bg-[#FFC700] hover:bg-[#F0B800] text-[#181206] border border-[#D8A700]" disabled={sending}>
                    {sending ? "Transmitting Export Enquiry..." : "Submit Export Enquiry"}
                  </Button>

                  <p className="text-[10px] text-muted-foreground text-center">
                    Direct communications processed exclusively via <a href="mailto:Exports@yghing.com" className="text-[#8C5921] font-bold underline">Exports@yghing.com</a>. Prompt NDAs and commercial quotation provided.
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
