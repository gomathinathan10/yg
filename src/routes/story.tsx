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
      { title: "Our Heritage Since 1931 — Three Generations of Tirunelveli Hing | Y.G Asafoetida" },
      {
        name: "description",
        content:
          "The 94-year journey of Y.G Asafoetida from a small shop on South Car Street in Tirunelveli to India's most trusted heritage hing house. Learn our artisanal stone-milling compounding craft.",
      },
      {
        name: "keywords",
        content:
          "Y.G Asafoetida history, Tirunelveli hing history, heritage asafoetida, traditional hing compounding, South Indian spices history, 1931 spices brand",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://ygasafoetida.in/story" },
      { property: "og:title", content: "Our Heritage Since 1931 — Y.G Asafoetida" },
      {
        property: "og:description",
        content:
          "Ninety-four years of stone-compounding pure hing in Tirunelveli, preserved across three generations.",
      },
      { property: "og:image", content: "https://ygasafoetida.in/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our 1931 Heritage — Y.G Asafoetida" },
      {
        name: "twitter:description",
        content:
          "The 94-year journey of Y.G Asafoetida compounding in Tirunelveli, Tamil Nadu.",
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
          "description": "The 94-year history and artisanal compounding craft of Y.G Asafoetida in Tirunelveli since 1931.",
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
            Est. 1931 · Tirunelveli
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
              Ninety-Four Years of Aroma, One Family Legacy
            </h1>

            <p className="text-sm sm:text-base text-[#68523A] max-w-xl leading-relaxed mx-auto lg:mx-0">
              From the fertile lands of South India to your kitchen, our journey has always been about purity, trust and tradition.
            </p>
          </div>

          {/* Right Column: Hero Illustration with Tamil Branding */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-lg border-2 border-[#E5D7B7] bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300 group">
              <img
                src="/images/story-hero-harvest.jpg"
                alt="YG பெருங்காயம் - Tirunelveli South Car Street Heritage"
                className="w-full h-auto object-cover max-h-[380px] sm:max-h-[420px]"
                loading="eager"
              />
              {/* Prominent Tamil Typography Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 sm:p-6 text-white text-center sm:text-left">
                <span className="text-amber-400 font-bold text-[11px] sm:text-xs uppercase tracking-widest block mb-1">
                  திருநெல்வேலி பாரம்பரியம் · Est. 1931
                </span>
                <p className="font-serif text-2xl sm:text-4xl font-black text-[#FFC700] tracking-wide drop-shadow-md">
                  YG பெருங்காயம்
                </p>
                <p className="text-white/85 text-xs sm:text-sm mt-1 leading-relaxed">
                  94 வருடங்களாக மாறாத பாரம்பரிய தூய்மை மற்றும் நறுமணத்தின் அடையாளம்
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Interactive Button */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center text-center">
          <button
            type="button"
            onClick={() => {
              const target = document.getElementById("chapter-1");
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="group inline-flex flex-col items-center justify-center gap-1.5 text-[#8C5921] hover:text-[#181206] transition-all cursor-pointer p-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700] active:scale-95"
            aria-label="Scroll down to Chapter 1: 1931 South Car Street"
          >
            <span className="text-[11px] uppercase tracking-widest font-bold group-hover:tracking-wider transition-all">
              Scroll Down
            </span>
            <div className="h-8 w-5 rounded-full border-2 border-[#C59B27] group-hover:border-[#FFC700] group-hover:bg-[#FFC700]/15 flex items-center justify-center p-0.5 transition-colors shadow-2xs">
              <div className="h-1.5 w-1 bg-[#8C5921] group-hover:bg-[#181206] rounded-full animate-bounce" />
            </div>
            <ChevronDown className="h-4 w-4 text-[#8C5921] group-hover:text-[#181206] -mt-0.5 group-hover:translate-y-1 transition-transform animate-pulse" />
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. THE CHAPTERS TIMELINE (Alternating Zig-Zag with Ribbon) */}
      {/* ======================================================== */}
      <section id="story-timeline" className="container-page py-6 sm:py-12 px-4 sm:px-8 relative">
        <div className="space-y-16 sm:space-y-24 relative">

          {/* ================= CHAPTER 1 ================= */}
          <div id="chapter-1" className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center scroll-mt-28">
            <div className="lg:col-span-6 space-y-3.5 order-1 lg:order-1">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  1
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 1 · 1931
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                Starts in 1931 on South Car Street
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                The journey began in 1931 on South Car Street in Tirunelveli. What started as a humble shop quickly earned lifelong customer trust through genuine mountain ferula resin, uncompromising quality, and cold granite stone-compounding.
              </p>

              <div className="rounded-xl border border-[#C59B27]/60 bg-[#FAF4E5] p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
                <Wheat className="h-4 w-4 text-[#8C5921] shrink-0 mt-0.5" />
                <p className="font-serif italic text-xs sm:text-[13px] text-[#4A3724] leading-relaxed">
                  &ldquo;A small artisanal shop on Tirunelveli South Car Street that laid the foundation for 94 years of unadulterated aroma.&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center order-2 lg:order-2">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#FAF4E5] p-5 sm:p-6 flex flex-col items-center justify-center transition-transform hover:scale-[1.01] duration-300">
                {/* Tamil Header Branding */}
                <div className="text-center mb-4 pb-3 border-b border-[#E5D7B7] w-full">
                  <span className="text-[11px] font-bold text-[#8C5921] uppercase tracking-widest block mb-1">
                    திருநெல்வேலி பாரம்பரியம் · 1931 முதல்
                  </span>
                  <p className="font-serif text-xl sm:text-2xl font-black text-[#8C5921] tracking-wide">
                    YG பெருங்காயம்
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#6B5338] mt-0.5">
                    94 வருடங்களாக மாறாத பாரம்பரிய தூய்மை
                  </p>
                </div>

                {/* Compact YG Product Image */}
                <div className="relative rounded-xl border border-[#E5D7B7] bg-white p-3 shadow-xs max-w-[220px] flex items-center justify-center">
                  <img
                    src="/products/100g-gold-asafoetida-powder/img-1.jpg"
                    alt="YG பெருங்காயம் - 1931 Tirunelveli South Car Street"
                    className="max-h-[170px] w-auto object-contain drop-shadow-sm"
                    loading="lazy"
                  />
                </div>
                <p className="text-[11px] font-semibold text-[#8C5921] mt-3 tracking-wide text-center">
                  திருநெல்வேலி ஆலை · தூய கைவினை பெருங்காயம்
                </p>
              </div>
            </div>
          </div>

          {/* Ribbon Connector 1 -> 2 */}
          <div className="relative py-2 sm:py-4 my-2 hidden lg:flex flex-col items-center justify-center">
            <svg className="w-full max-w-4xl h-24 overflow-visible" viewBox="0 0 1000 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="curly-arrow-1" markerWidth="14" markerHeight="14" refX="8" refY="5" orient="auto">
                  <path d="M 0 1.5 L 9 5 L 0 8.5 L 2.5 5 z" fill="#8C5921" />
                </marker>
              </defs>
              <circle cx="760" cy="5" r="4" fill="#C59B27" />
              <path d="M 760 5 C 830 20, 840 60, 780 70 C 710 80, 680 35, 640 45 C 580 60, 560 85, 540 105" stroke="#C59B27" strokeWidth="3" strokeDasharray="8 12" strokeLinecap="round" markerEnd="url(#curly-arrow-1)" />
            </svg>
          </div>

          {/* ================= CHAPTER 2 ================= */}
          <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
                <img
                  src={storyCookingImage}
                  alt="Chapter 2: 1932 Named as YG"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3.5 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  2
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 2 · 1932
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                1932: Named as YG
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                In 1932, as demand and culinary acclaim spread across towns and villages following the 1931 founding, the brand was officially named as YG. A household name symbolizing authentic aroma, sacred temple cooking, and unbending purity.
              </p>

              <div className="rounded-xl border border-[#C59B27]/60 bg-[#FAF4E5] p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
                <Wheat className="h-4 w-4 text-[#8C5921] shrink-0 mt-0.5" />
                <p className="font-serif italic text-xs sm:text-[13px] text-[#4A3724] leading-relaxed">
                  &ldquo;In 1932, the brand was officially named as YG, becoming the trusted signature of authentic aroma across South Indian homes.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Ribbon Connector 2 -> 3 */}
          <div className="relative py-2 sm:py-4 my-2 hidden lg:flex flex-col items-center justify-center">
            <svg className="w-full max-w-4xl h-24 overflow-visible" viewBox="0 0 1000 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="curly-arrow-2" markerWidth="14" markerHeight="14" refX="8" refY="5" orient="auto">
                  <path d="M 0 1.5 L 9 5 L 0 8.5 L 2.5 5 z" fill="#8C5921" />
                </marker>
              </defs>
              <circle cx="240" cy="5" r="4" fill="#C59B27" />
              <path d="M 240 5 C 310 20, 320 60, 260 70 C 190 80, 160 35, 120 45 C 70 60, 60 85, 40 105" stroke="#C59B27" strokeWidth="3" strokeDasharray="8 12" strokeLinecap="round" markerEnd="url(#curly-arrow-2)" />
            </svg>
          </div>

          {/* ================= CHAPTER 3 ================= */}
          <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-6 space-y-3.5 order-1 lg:order-1">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  3
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 3 · 1980 &amp; 1982
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                1980: 2nd Gen Enters (Cake to Powder) · 1982: India&apos;s First Sachet
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                In 1980, the second generation took charge, engineering a historic shift from heavy solid cakes to ultra-fine, quick-dissolving compounded powder. In 1982, YG made history by launching India&apos;s very first asafoetida sachet pack — making premium hing accessible to every family.
              </p>

              <div className="rounded-xl border border-[#C59B27]/60 bg-[#FAF4E5] p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
                <Wheat className="h-4 w-4 text-[#8C5921] shrink-0 mt-0.5" />
                <p className="font-serif italic text-xs sm:text-[13px] text-[#4A3724] leading-relaxed">
                  &ldquo;A double milestone: transforming solid cake to fine powder in 1980, followed by India&apos;s pioneer sachet in 1982.&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center order-2 lg:order-2">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
                <img
                  src="/images/story-chapter-3-sachet.jpg"
                  alt="Chapter 3: 1980 Cake to Powder and 1982 India's First Sachet"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Ribbon Connector 3 -> 4 */}
          <div className="relative py-2 sm:py-4 my-2 hidden lg:flex flex-col items-center justify-center">
            <svg className="w-full max-w-4xl h-24 overflow-visible" viewBox="0 0 1000 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="curly-arrow-3" markerWidth="14" markerHeight="14" refX="8" refY="5" orient="auto">
                  <path d="M 0 1.5 L 9 5 L 0 8.5 L 2.5 5 z" fill="#8C5921" />
                </marker>
              </defs>
              <circle cx="760" cy="5" r="4" fill="#C59B27" />
              <path d="M 760 5 C 830 20, 840 60, 780 70 C 710 80, 680 35, 640 45 C 580 60, 560 85, 540 105" stroke="#C59B27" strokeWidth="3" strokeDasharray="8 12" strokeLinecap="round" markerEnd="url(#curly-arrow-3)" />
            </svg>
          </div>

          {/* ================= CHAPTER 4 ================= */}
          <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
                <img
                  src="/images/story-3-modern-colorful.jpg"
                  alt="Chapter 4: 2013 3rd Gen Enters and 2016 Appalam Launch"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3.5 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  4
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 4 · 2013 &amp; 2016
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                2013: 3rd Gen Enters · 2016: Launching Handmade Appalam
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                In 2013, the energetic 3rd generation entered with modern quality controls and international export ambitions. In 2016, YG launched traditional appalam, carefully handcrafted in authentic small patches for unparalleled crispness and aroma.
              </p>

              <div className="rounded-xl border border-[#C59B27]/60 bg-[#FAF4E5] p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
                <Wheat className="h-4 w-4 text-[#8C5921] shrink-0 mt-0.5" />
                <p className="font-serif italic text-xs sm:text-[13px] text-[#4A3724] leading-relaxed">
                  &ldquo;Handmade in artisanal batches, preserving the golden crisp texture South India loves.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Ribbon Connector 4 -> 5 */}
          <div className="relative py-2 sm:py-4 my-2 hidden lg:flex flex-col items-center justify-center">
            <svg className="w-full max-w-4xl h-24 overflow-visible" viewBox="0 0 1000 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="curly-arrow-4" markerWidth="14" markerHeight="14" refX="8" refY="5" orient="auto">
                  <path d="M 0 1.5 L 9 5 L 0 8.5 L 2.5 5 z" fill="#8C5921" />
                </marker>
              </defs>
              <circle cx="240" cy="5" r="4" fill="#C59B27" />
              <path d="M 240 5 C 310 20, 320 60, 260 70 C 190 80, 160 35, 120 45 C 70 60, 60 85, 40 105" stroke="#C59B27" strokeWidth="3" strokeDasharray="8 12" strokeLinecap="round" markerEnd="url(#curly-arrow-4)" />
            </svg>
          </div>

          {/* ================= CHAPTER 5 ================= */}
          <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-6 space-y-3.5 order-1 lg:order-1">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  5
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 5 · 2019
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                2019: Launching Health Mix &amp; Millet Nutrition
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                In 2019, YG introduced traditional Sathu Maavu Health Mix and native millet-based foods. Blending ancient sprouted grains, pulses, and nuts, this wholesome formula brought holistic South Indian nutrition back to modern tables.
              </p>

              <div className="rounded-xl border border-[#C59B27]/60 bg-[#FAF4E5] p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
                <Wheat className="h-4 w-4 text-[#8C5921] shrink-0 mt-0.5" />
                <p className="font-serif italic text-xs sm:text-[13px] text-[#4A3724] leading-relaxed">
                  &ldquo;Wholesome native millets and multigrain health mixes rooted in grandmother&apos;s nutritional wisdom.&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center order-2 lg:order-2">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
                <img
                  src="/images/story-chapter-5-health-mix.jpg"
                  alt="Chapter 5: 2019 Health Mix and Millet Based Products"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Ribbon Connector 5 -> 6 */}
          <div className="relative py-2 sm:py-4 my-2 hidden lg:flex flex-col items-center justify-center">
            <svg className="w-full max-w-4xl h-24 overflow-visible" viewBox="0 0 1000 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="curly-arrow-5" markerWidth="14" markerHeight="14" refX="8" refY="5" orient="auto">
                  <path d="M 0 1.5 L 9 5 L 0 8.5 L 2.5 5 z" fill="#8C5921" />
                </marker>
              </defs>
              <circle cx="760" cy="5" r="4" fill="#C59B27" />
              <path d="M 760 5 C 830 20, 840 60, 780 70 C 710 80, 680 35, 640 45 C 580 60, 560 85, 540 105" stroke="#C59B27" strokeWidth="3" strokeDasharray="8 12" strokeLinecap="round" markerEnd="url(#curly-arrow-5)" />
            </svg>
          </div>

          {/* ================= CHAPTER 6 ================= */}
          <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
                <img
                  src="/images/story-chapter-6-vismaya-podis.jpg"
                  alt="Chapter 6: 2025 Vismaya Products and Ready to Cook Research"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3.5 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  6
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 6 · 2025
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                2025: Launching Vismaya Products &amp; Ready-to-Cook Concepts
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                In 2025, YG unveiled the Vismaya culinary lineup: wood-roasted Idly Podi, fragrant Ellu Podi, classic Paruppu Podi, Andhra Special Paruppu Podi, and all traditional rice mix powders. Concurrently, in-depth research was conducted into native millets and next-generation ready-to-cook concepts.
              </p>

              <div className="rounded-xl border border-[#C59B27]/60 bg-[#FAF4E5] p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
                <Wheat className="h-4 w-4 text-[#8C5921] shrink-0 mt-0.5" />
                <p className="font-serif italic text-xs sm:text-[13px] text-[#4A3724] leading-relaxed">
                  &ldquo;Idly Podi, Ellu Podi, Andhra Paruppu Podi &amp; rice mixes — crafted to recreate festive grandmother recipes in seconds.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Ribbon Connector 6 -> 7 */}
          <div className="relative py-2 sm:py-4 my-2 hidden lg:flex flex-col items-center justify-center">
            <svg className="w-full max-w-4xl h-24 overflow-visible" viewBox="0 0 1000 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="curly-arrow-6" markerWidth="14" markerHeight="14" refX="8" refY="5" orient="auto">
                  <path d="M 0 1.5 L 9 5 L 0 8.5 L 2.5 5 z" fill="#8C5921" />
                </marker>
              </defs>
              <circle cx="240" cy="5" r="4" fill="#C59B27" />
              <path d="M 240 5 C 310 20, 320 60, 260 70 C 190 80, 160 35, 120 45 C 70 60, 60 85, 40 105" stroke="#C59B27" strokeWidth="3" strokeDasharray="8 12" strokeLinecap="round" markerEnd="url(#curly-arrow-6)" />
            </svg>
          </div>

          {/* ================= CHAPTER 7 ================= */}
          <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-6 space-y-3.5 order-1 lg:order-1">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#8C5921] border-2 border-[#D4AF37] text-white font-serif font-black flex items-center justify-center text-base sm:text-lg shadow-md shrink-0">
                  7
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C59B27]/60 bg-[#FAF4E5] text-[10px] sm:text-xs font-bold text-[#8C5921] uppercase tracking-wider shadow-xs">
                  Chapter 7 · 2026
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1806] leading-snug">
                2026: Launching Brand New Vismaya Ready-to-Cook Products
              </h2>

              <p className="text-xs sm:text-sm text-[#5D4730] leading-relaxed">
                In 2026, YG enters a brand-new frontier, launching the official Vismaya Ready-to-Cook range. Designed for today&apos;s fast-paced kitchens, these revolutionary traditional preparations deliver pure heritage flavour with absolute zero chemical preservatives.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/70 bg-[#FAF4E5] text-xs font-bold text-[#6D4918] shadow-xs">
                  <Globe className="h-3.5 w-3.5 text-[#8C5921]" />
                  <span>Ready-to-Cook Innovation</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/70 bg-[#FAF4E5] text-xs font-bold text-[#6D4918] shadow-xs">
                  <Wheat className="h-3.5 w-3.5 text-[#8C5921]" />
                  <span>100% Preservative-Free</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center order-2 lg:order-2">
              <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#E5D7B7] shadow-md bg-[#F2E8CE] transition-transform hover:scale-[1.01] duration-300">
                <img
                  src="/images/story-chapter-7-ready-to-cook.jpg"
                  alt="Chapter 7: 2026 Launching Brand New Vismaya Ready-to-Cook Products"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                  loading="lazy"
                />
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
