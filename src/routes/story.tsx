import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Globe,
  Wheat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  heritageImage as storyShopImage,
  storyTodayImage as storyCookingImage,
  storyKitchenImage as storyPackingImage,
} from "@/assets/images";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Heritage Since 1932 — Three Generations of Tirunelveli Hing | Y.G Asafoetida" },
      {
        name: "description",
        content:
          "The 92-year journey of Y.G Asafoetida from a small shop on South Car Street in Tirunelveli to India's most trusted heritage hing house. Learn our artisanal stone-milling compounding craft.",
      },
      {
        name: "keywords",
        content:
          "Y.G Asafoetida history, Tirunelveli hing history, heritage asafoetida, traditional hing compounding, South Indian spices history, 1932 spices brand",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://ygasafoetida.in/story" },
      { property: "og:title", content: "Our Heritage Since 1932 — Y.G Asafoetida" },
      {
        property: "og:description",
        content:
          "Ninety-two years of stone-compounding pure hing in Tirunelveli, preserved across three generations.",
      },
      { property: "og:image", content: "https://ygasafoetida.in/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our 1932 Heritage — Y.G Asafoetida" },
      {
        name: "twitter:description",
        content:
          "The 92-year journey of Y.G Asafoetida compounding in Tirunelveli, Tamil Nadu.",
      },
      { name: "twitter:image", content: "https://ygasafoetida.in/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://ygasafoetida.in/story" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "The Y.G Asafoetida Heritage Story",
          "description": "The 92-year history and artisanal compounding craft of Y.G Asafoetida in Tirunelveli since 1932.",
          "url": "https://ygasafoetida.in/story",
          "publisher": {
            "@type": "Organization",
            "name": "Y.G Asafoetida",
            "logo": "https://ygasafoetida.in/logo.png"
          }
        }),
      },
    ],
  }),
  component: StoryPage,
});

const craftSteps = [
  {
    step: "01",
    title: "Mountain Resin Sourcing",
    body: "Grade-A tears of raw Ferula gum oleoresin harvested from alpine mountain roots.",
  },
  {
    step: "02",
    title: "Cold Stone Compounding",
    body: "Resin is blended on heavy granite rollers at low RPMs to avoid heat build-up.",
  },
  {
    step: "03",
    title: "Texture Calibration",
    body: "Milled into fine powders, coarse granules, pellets, or compressed into solid pindi cakes.",
  },
  {
    step: "04",
    title: "Aroma-Lock Sealing",
    body: "Sealed immediately in airtight glass jars to lock in fresh fragrance.",
  },
];

function StoryPage() {
  return (
    <div className="space-y-0 font-sans pb-16 bg-[#F8F2E2] text-[#241708] relative overflow-hidden selection:bg-[#FFC700]/40">
      {/* Decorative Botanical Leaf Watermarks in Margins */}
      <div className="absolute top-12 left-0 pointer-events-none opacity-20 hidden lg:block -translate-x-6">
        <svg width="160" height="240" viewBox="0 0 160 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20C40 60 70 120 40 220M40 70C80 60 120 80 140 110M35 120C80 110 120 135 130 170M30 170C60 160 100 180 110 210" stroke="#7A5623" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-0 pointer-events-none opacity-20 hidden lg:block translate-x-8">
        <svg width="160" height="260" viewBox="0 0 160 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 20C120 60 90 130 120 240M125 70C85 60 45 80 25 110M130 125C85 115 45 140 35 175M135 180C105 170 65 190 55 220" stroke="#7A5623" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E5D7B7] bg-[#F2E8CE] py-3">
        <div className="container-page flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-[#6B5338]">
            <Link to="/" className="hover:text-[#181206] transition-colors font-medium">
              Home
            </Link>
            <span className="text-[#B39352]">/</span>
            <span className="font-semibold text-[#181206]">Our Heritage</span>
          </div>
          <span className="text-[11px] font-bold text-[#6D4918] bg-[#E8DCB8] px-3 py-0.5 rounded-full border border-[#D5C294]">
            Est. 1932 · Tirunelveli
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. HERO SECTION (Exactly as in Mockup)                   */}
      {/* ======================================================== */}
      <section className="container-page pt-10 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-6 sm:w-10 bg-[#C59B27]/60" />
              <span className="px-3 py-1 rounded-full border border-[#C59B27]/70 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-widest shadow-xs">
                Our Heritage
              </span>
              <span className="h-[1px] w-6 sm:w-10 bg-[#C59B27]/60" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#2A1806] leading-[1.18] tracking-tight">
              Ninety-Two Years of Aroma, One Family Legacy
            </h1>

            <p className="text-sm sm:text-base text-[#68523A] max-w-xl leading-relaxed mx-auto lg:mx-0">
              From the fertile lands of South India to your kitchen, our journey has always been about purity, trust and tradition.
            </p>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-lg border-2 border-[#E5D7B7] bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
              <img
                src="/images/story-hero-harvest.jpg"
                alt="South Indian farmer harvesting golden ferula asafoetida gum resin tears and Y.G. Asafoetida Works facility"
                className="w-full h-auto object-cover max-h-[380px] sm:max-h-[420px]"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-[#8C5921]">
            Scroll Down
          </span>
          <div className="mt-1 h-8 w-5 rounded-full border-2 border-[#C59B27] flex items-center justify-center p-0.5">
            <div className="h-1.5 w-1 bg-[#8C5921] rounded-full animate-bounce" />
          </div>
          <ChevronDown className="h-4 w-4 text-[#8C5921] -mt-0.5 animate-pulse" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. THE 4 CHAPTERS TIMELINE (Alternating Zig-Zag with Ribbon) */}
      {/* ======================================================== */}
      <section className="container-page py-6 sm:py-12 px-4 sm:px-8 relative">
        <div className="space-y-16 sm:space-y-24 relative">

          {/* ================= CHAPTER 1 ================= */}
          <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4 order-1 lg:order-1">
              <div className="flex items-center gap-3">
                {/* Milestone Node 1 */}
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  1
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 1 · 1932
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                The Little Shop on South Car Street
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                In 1932, Y.G. Asafoetida was founded on South Car Street in Tirunelveli. What started as a humble shop, soon became a trusted name in the world of asafoetida, built on quality, hard work and a deep commitment to purity.
              </p>

              {/* Quote Pill Box */}
              <div className="rounded-xl border border-[#C59B27]/60 bg-[#FAF4E5] p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
                <Wheat className="h-4 w-4 text-[#8C5921] shrink-0 mt-0.5" />
                <p className="font-serif italic text-xs sm:text-[13px] text-[#4A3724] leading-relaxed">
                  &ldquo;The very first formula created on those brass scales in 1932 remains the unbroken foundation of every jar we seal today.&rdquo;
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-2">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
                <img
                  src={storyShopImage}
                  alt="Y.G. Asafoetida Works established 1932 traditional compounding facility"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Curly Drawing Connector 1 -> 2: Starts from Picture 1 (Right), arrows towards Number 2 (Right) */}
          <div className="relative py-2 sm:py-6 my-2">
            {/* Desktop Curly Drawing Flow */}
            <div className="hidden lg:flex flex-col items-center justify-center relative">
              <svg className="w-full max-w-5xl h-28 sm:h-36 overflow-visible" viewBox="0 0 1000 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="curly-arrow-1-2" markerWidth="14" markerHeight="14" refX="8" refY="5" orient="auto">
                    <path d="M 0 1.5 L 9 5 L 0 8.5 L 2.5 5 z" fill="#8C5921" />
                  </marker>
                </defs>
                {/* Starting anchor under Picture 1 */}
                <circle cx="760" cy="5" r="4.5" fill="#C59B27" />
                <path
                  d="M 760 5 C 835 25, 845 70, 785 80 C 720 90, 680 40, 645 50 C 585 68, 570 95, 545 125"
                  stroke="#C59B27"
                  strokeWidth="3.5"
                  strokeDasharray="10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#curly-arrow-1-2)"
                />
              </svg>
            </div>

            {/* Mobile Curly Drawing Flow */}
            <div className="flex lg:hidden flex-col items-center justify-center my-2">
              <svg className="w-full max-w-xs h-28 overflow-visible" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="curly-arrow-mobile-1" markerWidth="12" markerHeight="12" refX="7" refY="4" orient="auto">
                    <path d="M 0 1 L 8 4 L 0 7 L 2 4 z" fill="#8C5921" />
                  </marker>
                </defs>
                <circle cx="160" cy="5" r="3.5" fill="#C59B27" />
                <path
                  d="M 160 5 C 230 20, 240 60, 185 70 C 135 80, 105 45, 78 58 C 50 72, 42 92, 36 115"
                  stroke="#C59B27"
                  strokeWidth="3"
                  strokeDasharray="9 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#curly-arrow-mobile-1)"
                />
              </svg>
            </div>
          </div>

          {/* ================= CHAPTER 2 ================= */}
          <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Left Image (Desktop left, mobile below content) */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
                <img
                  src={storyCookingImage}
                  alt="Mother tempering sambar with pure asafoetida in a traditional South Indian kitchen"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                {/* Milestone Node 2 */}
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  2
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 2 · Tradition
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                Tuning the Recipe to Sing in South Indian Kitchens
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                Y.G. asafoetida is trusted in South Indian cooking for generations, because it brings out the authentic flavour, aroma and taste. From traditional recipes to modern kitchens, it continues to be an essential ingredient in every home.
              </p>

              {/* Quote Pill Box */}
              <div className="rounded-xl border border-[#C59B27]/60 bg-[#FAF4E5] p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
                <Wheat className="h-4 w-4 text-[#8C5921] shrink-0 mt-0.5" />
                <p className="font-serif italic text-xs sm:text-[13px] text-[#4A3724] leading-relaxed">
                  &ldquo;Stone-milled at low temperatures so essential natural aromas remain intact until they touch your hot pan.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Curly Drawing Connector 2 -> 3: Starts from Picture 2 (Left), arrows towards Number 3 (Left) */}
          <div className="relative py-2 sm:py-6 my-2">
            {/* Desktop Curly Drawing Flow */}
            <div className="hidden lg:flex flex-col items-center justify-center relative">
              <svg className="w-full max-w-5xl h-28 sm:h-36 overflow-visible" viewBox="0 0 1000 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="curly-arrow-2-3" markerWidth="14" markerHeight="14" refX="8" refY="5" orient="auto">
                    <path d="M 0 1.5 L 9 5 L 0 8.5 L 2.5 5 z" fill="#8C5921" />
                  </marker>
                </defs>
                {/* Starting anchor under Picture 2 */}
                <circle cx="240" cy="5" r="4.5" fill="#C59B27" />
                <path
                  d="M 240 5 C 315 25, 325 70, 265 80 C 200 90, 160 40, 125 50 C 75 68, 65 95, 45 125"
                  stroke="#C59B27"
                  strokeWidth="3.5"
                  strokeDasharray="10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#curly-arrow-2-3)"
                />
              </svg>
            </div>

            {/* Mobile Curly Drawing Flow */}
            <div className="flex lg:hidden flex-col items-center justify-center my-2">
              <svg className="w-full max-w-xs h-28 overflow-visible" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="curly-arrow-mobile-2" markerWidth="12" markerHeight="12" refX="7" refY="4" orient="auto">
                    <path d="M 0 1 L 8 4 L 0 7 L 2 4 z" fill="#8C5921" />
                  </marker>
                </defs>
                <circle cx="160" cy="5" r="3.5" fill="#C59B27" />
                <path
                  d="M 160 5 C 230 20, 240 60, 185 70 C 135 80, 105 45, 78 58 C 50 72, 42 92, 36 115"
                  stroke="#C59B27"
                  strokeWidth="3"
                  strokeDasharray="9 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#curly-arrow-mobile-2)"
                />
              </svg>
            </div>
          </div>

          {/* ================= CHAPTER 3 ================= */}
          <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4 order-1 lg:order-1">
              <div className="flex items-center gap-3">
                {/* Milestone Node 3 */}
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  3
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 3 · Today
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                Third Generation, Same Uncompromising Integrity
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                Y.G. Asafoetida&apos;s third generation continues to uphold the same values, bringing the best of tradition and innovation to kitchens across the world. With a focus on quality, consistency and customer trust, the legacy grows stronger every day.
              </p>

              {/* 4-Column Stats Box (Embedded Inside Chapter 3 Card) */}
              <div className="rounded-xl border border-[#D5C294] bg-[#F4E8D0] p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center shadow-xs">
                <div className="border-r border-[#E5D7B7] last:border-r-0">
                  <p className="text-xl sm:text-2xl font-serif font-extrabold text-[#2A1806]">1932</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#7A5623] uppercase tracking-wider mt-0.5">
                    Founding Year
                  </p>
                </div>
                <div className="sm:border-r border-[#E5D7B7] last:border-r-0">
                  <p className="text-xl sm:text-2xl font-serif font-extrabold text-[#2A1806]">92+</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#7A5623] uppercase tracking-wider mt-0.5">
                    Years of Craft
                  </p>
                </div>
                <div className="border-r border-[#E5D7B7] last:border-r-0">
                  <p className="text-xl sm:text-2xl font-serif font-extrabold text-[#2A1806]">15</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#7A5623] uppercase tracking-wider mt-0.5">
                    Products
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-extrabold text-[#2A1806]">48,000+</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#7A5623] uppercase tracking-wider mt-0.5">
                    Kitchens Served
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-2">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
                <img
                  src={storyPackingImage}
                  alt="The third generation in Tirunelveli packing fresh jars with modern quality controls"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Curly Drawing Connector 3 -> 4: Starts from Picture 3 (Right), arrows towards Number 4 (Right) */}
          <div className="relative py-2 sm:py-6 my-2">
            {/* Desktop Curly Drawing Flow */}
            <div className="hidden lg:flex flex-col items-center justify-center relative">
              <svg className="w-full max-w-5xl h-28 sm:h-36 overflow-visible" viewBox="0 0 1000 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="curly-arrow-3-4" markerWidth="14" markerHeight="14" refX="8" refY="5" orient="auto">
                    <path d="M 0 1.5 L 9 5 L 0 8.5 L 2.5 5 z" fill="#8C5921" />
                  </marker>
                </defs>
                {/* Starting anchor under Picture 3 */}
                <circle cx="760" cy="5" r="4.5" fill="#C59B27" />
                <path
                  d="M 760 5 C 835 25, 845 70, 785 80 C 720 90, 680 40, 645 50 C 585 68, 570 95, 545 125"
                  stroke="#C59B27"
                  strokeWidth="3.5"
                  strokeDasharray="10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#curly-arrow-3-4)"
                />
              </svg>
            </div>

            {/* Mobile Curly Drawing Flow */}
            <div className="flex lg:hidden flex-col items-center justify-center my-2">
              <svg className="w-full max-w-xs h-28 overflow-visible" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="curly-arrow-mobile-3" markerWidth="12" markerHeight="12" refX="7" refY="4" orient="auto">
                    <path d="M 0 1 L 8 4 L 0 7 L 2 4 z" fill="#8C5921" />
                  </marker>
                </defs>
                <circle cx="160" cy="5" r="3.5" fill="#C59B27" />
                <path
                  d="M 160 5 C 230 20, 240 60, 185 70 C 135 80, 105 45, 78 58 C 50 72, 42 92, 36 115"
                  stroke="#C59B27"
                  strokeWidth="3"
                  strokeDasharray="9 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#curly-arrow-mobile-3)"
                />
              </svg>
            </div>
          </div>

          {/* ================= CHAPTER 4 ================= */}
          <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Left Image */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
                <img
                  src="/images/story-chapter4-global.jpg"
                  alt="Y.G Asafoetida range of spice bottles with global export map and South Indian temples"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                {/* Milestone Node 4 */}
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  4
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 4 · Tomorrow
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                From Our Family to Your Family
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                Today, Y.G. Asafoetida is more than just a product — it&apos;s a legacy of purity, tradition and trust, reaching homes across the world.
              </p>

              {/* Sub-Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/70 bg-[#FAF4E5] text-xs font-bold text-[#6D4918] shadow-xs">
                  <Globe className="h-3.5 w-3.5 text-[#8C5921]" />
                  <span>Across Borders</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/70 bg-[#FAF4E5] text-xs font-bold text-[#6D4918] shadow-xs">
                  <Wheat className="h-3.5 w-3.5 text-[#8C5921]" />
                  <span>Across Generations</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Closing Transition: Our Legacy Continues... + Skyline */}
        <div className="mt-16 sm:mt-24 pt-8 text-center space-y-4">
          <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#4A3724] font-medium tracking-wide">
            Our Legacy Continues...
          </p>
          <div className="flex items-center justify-center gap-2 text-[#8C5921]">
            <span className="h-[1px] w-12 bg-[#C59B27]/60" />
            <Wheat className="h-4 w-4" />
            <span className="h-[1px] w-12 bg-[#C59B27]/60" />
          </div>

          {/* Panoramic Tirunelveli Temple Skyline Banner - Full View, No Cropping */}
          <div className="mt-8 rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md max-w-5xl mx-auto bg-[#F7EFCF]">
            <img
              src="/images/story-temple-skyline.jpg"
              alt="Panoramic pen-and-ink watercolor sketch of Tirunelveli Nellaiappar temple gopuram towers and coconut trees"
              className="w-full h-auto object-contain block mx-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. COMPACT 4-STEP METHOD (4 Pillars of Stone-Compounding) */}
      {/* User Instruction: "not to change the 4 pillars"          */}
      {/* ======================================================== */}
      <section className="container-page py-10 sm:py-16 px-4 sm:px-8 border-t border-[#E5D7B7] mt-8">
        <div className="space-y-8">
          <div className="max-w-xl mx-auto text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A6030]">
              The Craft Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181206] tracking-tight">
              The 4 Pillars of Stone-Compounding
            </h2>
            <p className="text-xs text-[#5A6560]">
              Why Y.G asafoetida preserves its natural aroma, terpenes, and medicinal potency.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {craftSteps.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-xl border-2 border-[#E8DEC8] bg-[#FFFDF9] shadow-xs space-y-3 relative overflow-hidden group hover:border-[#FFC700] transition-all"
              >
                <span className="text-4xl font-black text-[#181206]/10 font-mono absolute top-2 right-3 group-hover:text-[#FFC700]/30 transition-colors">
                  {s.step}
                </span>
                <div className="h-8 w-8 rounded-lg bg-[#FFC700] border border-[#E6B000] flex items-center justify-center text-[#181206] font-extrabold text-xs shadow-xs">
                  {s.step}
                </div>
                <h3 className="text-sm font-serif font-bold text-[#181206] leading-snug">{s.title}</h3>
                <p className="text-xs text-[#5A6560] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. HERITAGE CTA                                          */}
      {/* ======================================================== */}
      <section className="container-page pb-12 px-4 sm:px-8">
        <div className="rounded-[6px] bg-[#2C3C28] p-8 sm:p-12 text-center text-white shadow-md relative overflow-hidden">
          <div className="max-w-lg mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EABC5E]">
              Your Kitchen is the Next Chapter
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Taste the True Tirunelveli Tradition
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Explore our complete range of stone-compounded powders, crunchy pellets, pure cakes, traditional health mix, and pooja sambrani.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="sm"
                className="h-10 px-6 font-bold bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] font-black rounded-[6px] shadow-xs cursor-pointer"
                asChild
              >
                <Link to="/shop">
                  Shop the Full Range <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-10 px-6 font-bold bg-transparent border-white/30 text-white hover:bg-white/10 rounded-[6px] text-xs cursor-pointer"
                asChild
              >
                <Link to="/contact">Ask Our Specialists</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
