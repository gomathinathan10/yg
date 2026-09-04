import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Leaf,
  Play,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { SmartImage } from "@/components/site/SmartImage";
import { products, type Format } from "@/data/products";
import { storyShopImage } from "@/assets/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Y.G Asafoetida — Artisanal Hing, Sathu Maavu & Sambrani Since 1932" },
      {
        name: "description",
        content:
          "Buy authentic compounded asafoetida powder, pure gold hing cake, gluten-free hing, wood-roasted traditional health mix (sathu maavu), and pure temple benzoin sambrani online from Tirunelveli since 1932.",
      },
      {
        name: "keywords",
        content:
          "buy hing online, asafoetida powder, Y.G Asafoetida, pure gold hing cake, gluten free hing, traditional health mix, sathu maavu online, pure benzoin sambrani, loban resin, Tirunelveli hing store",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ygasafoetida.in/" },
      { property: "og:title", content: "Y.G Asafoetida — Authentic Heritage Hing & Traditional Store Since 1932" },
      {
        property: "og:description",
        content:
          "Artisanal hing preparations, stone-ground Sathu Maavu health mix, and pure benzoin sambrani compounded in Tirunelveli.",
      },
      { property: "og:image", content: "https://ygasafoetida.in/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Y.G Asafoetida — Authentic Heritage Hing Since 1932" },
      {
        name: "twitter:description",
        content:
          "Artisanal compounded hing powder, gluten-free hing, traditional sathu maavu, and pure pooja sambrani from Tirunelveli.",
      },
      { name: "twitter:image", content: "https://ygasafoetida.in/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://ygasafoetida.in/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Y.G Asafoetida",
          "url": "https://ygasafoetida.in",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://ygasafoetida.in/shop?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What makes Y.G Asafoetida different from commercial hing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Y.G has been compounding hing in Tirunelveli since 1932 using high-grade mountain Ferula oleoresin and natural carriers, stone-milled in small batches without artificial colors, chemical preservatives, or synthetic aromas."
              }
            },
            {
              "@type": "Question",
              "name": "Do you have a gluten-free asafoetida option?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our Y.G Gluten-Free Asafoetida Powder is formulated with 100% pure rice starch in a dedicated celiac-safe line."
              }
            },
            {
              "@type": "Question",
              "name": "What is the shelf life of Y.G Asafoetida?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our compounded powders retain their robust aroma for 18 months from packing. Solid cakes and granules can last up to 24 months when stored airtight in a cool, dry cupboard."
              }
            }
          ]
        }),
      },
    ],
  }),
  component: HomePage,
});

const trustPillars = [
  {
    icon: Award,
    title: "92+ Years Legacy",
    body: "Compounded in Tirunelveli since 1932.",
  },
  {
    icon: Leaf,
    title: "100% Celiac Safe",
    body: "Dedicated pure rice-starch carrier.",
  },
  {
    icon: Sparkles,
    title: "High Resin Purity",
    body: "Rich natural Ferula oleoresin concentration.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    body: "On orders above ₹499 across India.",
  },
];

const formatGuides = [
  {
    slug: "gold-asafoetida-powder",
    format: "Powder",
    title: "Gold & Premium Powder",
    tagline: "Instant Dissolving · Daily Tadka",
    description:
      "Dissolves instantly in hot ghee for fragrant sambar, rasam, and dal tadka.",
    bestFor: "Sambar, Rasam, Dal",
    image: "/products/100g-gold-asafoetida-powder/img-1.jpg",
    price: "From ₹175",
  },
  {
    slug: "hing-chips",
    format: "Granules & Chips",
    title: "Crunchy Pellets & Chips",
    tagline: "Slow-Blooming · Non-Burning",
    description:
      "Coarse granules that bloom slowly without scorching in curds and rice dishes.",
    bestFor: "Curd Rice, Pickles",
    image: "/products/hing-pellets/img-1.jpg",
    price: "From ₹250",
  },
  {
    slug: "asafoetida-gold-cake",
    format: "Cake & Lump",
    title: "Pure Gold Cake & Raw Lump",
    tagline: "Concentrated · Traditional Strength",
    description:
      "Solid block. Shave a pea-sized piece into tempering or dissolve in warm water for festive gravies.",
    bestFor: "Festive Kuzhambu, Pickles",
    image: "/products/100g-asafoetida-gold-cake/img-1.jpg",
    price: "From ₹240",
  },
  {
    slug: "all-product-heritage-combo",
    format: "Gift & Combo",
    title: "Heritage Box & Glass Jars",
    tagline: "Collector's Sets · Gifting",
    description:
      "4-in-1 collection box with brass spoon and hermetic glass bottle jars to seal aroma.",
    bestFor: "Gourmet Gifting",
    image: "/products/all-product/img-1.jpg",
    price: "From ₹380",
  },
];

const verifiedReviews = [
  {
    rating: 5,
    title: "Authentic Paati's Rasam Aroma",
    comment:
      "Takes me straight back to my grandmother's kitchen in Tirunelveli. Standard store brands smell synthetic compared to this deep, wholesome aroma.",
    name: "Sowmya Raman",
    city: "Chennai",
    product: "Gold Powder",
  },
  {
    rating: 4,
    title: "Life-Saver for Celiac Cooking",
    comment:
      "Finding truly wheat-free hing that still has authentic strength was impossible until I found Y.G's rice-starch formula. Safe and fragrant.",
    name: "Karthik Sundaram",
    city: "Bengaluru",
    product: "Gluten-Free Hing",
  },
  {
    rating: 4,
    title: "Pellets in Curd Rice are Perfection",
    comment:
      "The Hing Pellets don't burn like fine powders do. They puff slightly during tempering, giving a delicate crunch and sustained aroma.",
    name: "Meenakshi V.",
    city: "Madurai",
    product: "Hing Pellets",
  },
  {
    rating: 5,
    title: "Gold Cake for Temple Kuzhambu",
    comment:
      "Shaving a small piece of the Pindi Hing into hot ghee gives the authentic tangy aroma needed for traditional vathal kuzhambu.",
    name: "Dr. K. Raghavan",
    city: "Coimbatore",
    product: "Gold Cake",
  },
  {
    rating: 5,
    title: "Glass Jar Locks Aroma Completely",
    comment:
      "The airtight rubber gasket jar is gorgeous on the kitchen counter and keeps the fragrance locked in. You need only a tiny pinch.",
    name: "Anita Deshmukh",
    city: "Mumbai",
    product: "Bottle Jar",
  },
  {
    rating: 5,
    title: "Exquisite Heritage 4-in-1 Box",
    comment:
      "Ordered the combo box as a housewarming gift. The engraved brass spoon and assortment of powder, cake, chips, and pellets delighted our hosts.",
    name: "Sridhar K.",
    city: "Hyderabad",
    product: "Heritage Box",
  },
];

const HERO_VIDEOS = [
  {
    src: "/hero-video-slide2.mp4",
    title: "Heritage Tradition",
    subtitle: "Purity Since 1932",
    tag: "Tradition",
  },
  {
    src: "/hero-video-heritage.mp4",
    title: "Generational Legacy",
    subtitle: "Artisans of Tirunelveli",
    tag: "Legacy",
  },
  {
    src: "/hero-video-tradition.mp4",
    title: "Pure Temple Aroma",
    subtitle: "Sacred Ferula Resin",
    tag: "Temple Aroma",
  },
  {
    src: "/hero-video-factory.mp4",
    title: "Generational Works",
    subtitle: "Authentic Stone-Milling",
    tag: "Factory Works",
  },
  {
    src: "/hero-video-craft.mp4",
    title: "Artisanal Handcrafting",
    subtitle: "Zero Additives, 100% Purity",
    tag: "Handcrafted",
  },
  {
    src: "/hero-video-gold.mp4",
    title: "Gold Hing Collection",
    subtitle: "Signature Royal Grade",
    tag: "Gold Collection",
  },
  {
    src: "/hero-video-purity.mp4",
    title: "Culinary Essence",
    subtitle: "Daily Kitchen Vitality",
    tag: "Kitchen Essential",
  },
  {
    src: "/hero-video-master.mp4?v=20260827",
    title: "Culinary Alchemy",
    subtitle: "Instant Bloom in Hot Ghee",
    tag: "Tadka Bloom",
  },
];

function HomePage() {
  const [activeCatalogTab, setActiveCatalogTab] = useState<Format | "all">("all");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const soundPlayCountRef = useRef(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smoothly transition video source without destroying video DOM node
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsFading(true);
    const targetSrc = HERO_VIDEOS[currentVideoIndex]?.src;
    if (targetSrc && video.src !== window.location.origin + targetSrc && !video.src.endsWith(targetSrc)) {
      video.src = targetSrc;
      video.load();
    }

    video.muted = isMuted;
    video.volume = 1.0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsFading(false))
        .catch((err) => {
          setIsFading(false);
          if (err.name !== "AbortError") {
            // benign autoplay restrictions
          }
        });
    } else {
      setIsFading(false);
    }
  }, [currentVideoIndex, isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playback initially muted for browser autoplay compliance
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    // Automatically unmute sound when the user interacts on the page
    const activateSound = () => {
      if (video && soundPlayCountRef.current < 2) {
        video.muted = false;
        video.volume = 1.0;
        setIsMuted(false);
        video.play().catch(() => {});
      }
    };

    window.addEventListener("click", activateSound, { once: true });
    window.addEventListener("touchstart", activateSound, { once: true });
    window.addEventListener("pointerdown", activateSound, { once: true });
    window.addEventListener("keydown", activateSound, { once: true });

    return () => {
      window.removeEventListener("click", activateSound);
      window.removeEventListener("touchstart", activateSound);
      window.removeEventListener("pointerdown", activateSound);
      window.removeEventListener("keydown", activateSound);
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, []);

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    // Only count as a completed cycle after the entire reel sequence completes the last video
    if (currentVideoIndex === HERO_VIDEOS.length - 1) {
      if (!isMuted) {
        soundPlayCountRef.current += 1;
        // After playing the full sequence 2 times with sound, automatically mute
        if (soundPlayCountRef.current >= 2) {
          video.muted = true;
          setIsMuted(true);
        }
      }
    }

    // Automatically advance to the next video in sequence
    setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  const nextVideo = () => {
    if (soundPlayCountRef.current < 2) {
      setIsMuted(false);
    }
    setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  const prevVideo = () => {
    if (soundPlayCountRef.current < 2) {
      setIsMuted(false);
    }
    setCurrentVideoIndex((prev) => (prev - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length);
  };

  const selectVideo = (index: number) => {
    if (soundPlayCountRef.current < 2) {
      setIsMuted(false);
    }
    setCurrentVideoIndex(index);
  };

  const displayedProducts = products.filter((p) => {
    if (activeCatalogTab === "all") return true;
    return p.format === activeCatalogTab;
  });

  const currentVideo = HERO_VIDEOS[currentVideoIndex] ?? HERO_VIDEOS[0]!;
  const nextVideoItem = HERO_VIDEOS[(currentVideoIndex + 1) % HERO_VIDEOS.length];

  return (
    <div className="space-y-0">
      {/* Hidden pre-buffering video element for instant, zero-lag transitions */}
      {nextVideoItem ? (
        <video
          src={nextVideoItem.src}
          preload="auto"
          muted
          playsInline
          aria-hidden="true"
          className="sr-only hidden"
        />
      ) : null}

      {/* ======================================================== */}
      {/* 1. CINEMATIC MULTI-VIDEO HERO BANNER (8 REELS)           */}
      {/* ======================================================== */}
      <section className="group relative overflow-hidden border-b border-border aspect-[16/9] sm:aspect-[21/9] max-h-[78vh] w-full bg-black select-none">
        <video
          ref={videoRef}
          src={currentVideo.src}
          autoPlay
          playsInline
          preload="metadata"
          muted={isMuted}
          onEnded={handleVideoEnded}
          onCanPlay={() => {
            setIsFading(false);
            videoRef.current?.play().catch(() => {});
          }}
          className={`h-full w-full object-cover object-center transition-opacity duration-300 ${
            isFading ? "opacity-75" : "opacity-100"
          }`}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        />

        {/* Subtle Vignette Gradient for extra readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Top-Left: Active Reel Badge & Progress */}
        <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-20 pointer-events-none flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-xl">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase">{currentVideo.title}</span>
            <span className="text-[10px] text-white/70 hidden md:inline">· {currentVideo.subtitle}</span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 border border-white/20">
            {currentVideoIndex + 1} / {HERO_VIDEOS.length}
          </span>
        </div>

        {/* Top-Right: Sound Toggle Button */}
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMuted((m) => !m)}
            className="h-8 sm:h-9 px-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 text-xs font-medium hover:bg-black/75 transition-all shadow-xl cursor-pointer active:scale-95"
            aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
          >
            {isMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-white/80" />
                <span className="text-[10px] sm:text-xs font-medium">Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs text-amber-400 font-bold">Sound On</span>
              </>
            )}
          </button>
        </div>

        {/* Navigation Arrow Left */}
        <button
          type="button"
          onClick={prevVideo}
          aria-label="Previous video"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-all hover:bg-black/70 hover:scale-110 active:scale-95 z-20 opacity-80 sm:opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          onClick={nextVideo}
          aria-label="Next video"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-all hover:bg-black/70 hover:scale-110 active:scale-95 z-20 opacity-80 sm:opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Bottom Interactive Video Selector Dock */}
        <div className="absolute bottom-3 sm:bottom-4 inset-x-0 flex flex-col items-center gap-2 z-20 pointer-events-auto px-4">
          {/* Desktop & Tablet Reel Pills */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 shadow-2xl max-w-full overflow-x-auto scrollbar-none">
            {HERO_VIDEOS.map((v, i) => (
              <button
                key={v.src}
                type="button"
                onClick={() => selectVideo(i)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  currentVideoIndex === i
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md scale-105"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${currentVideoIndex === i ? "bg-slate-950" : "bg-white/50"}`} />
                {v.tag || v.title}
              </button>
            ))}
          </div>

          {/* Mobile Indicator Dots */}
          <div className="flex sm:hidden justify-center items-center gap-1.5">
            {HERO_VIDEOS.map((v, i) => (
              <button
                key={v.src}
                type="button"
                onClick={() => selectVideo(i)}
                aria-label={`Switch to video ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentVideoIndex === i
                    ? "w-7 bg-amber-400 shadow-md"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. COMPACT TRUST STRIP */}
      {/* ======================================================== */}
      <section className="border-b border-border bg-card">
        <div className="container-page grid gap-3 py-4 grid-cols-2 md:grid-cols-4">
          {trustPillars.map((t) => (
            <div key={t.title} className="flex items-center gap-2.5 p-1.5">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <t.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{t.title}</p>
                <p className="text-[11px] text-muted-foreground truncate">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FOUR ARTISANAL FORMATS SHOWCASE */}
      {/* ======================================================== */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          eyebrow="Formulations & Uses"
          title="Engineered for Every Culinary Style"
          description="Different culinary traditions call for different bloom speeds and carrier bases."
          align="center"
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formatGuides.map((guide) => (
            <div
              key={guide.slug}
              className="surface-card group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border transition-all duration-300 hover:border-primary/40 hover:shadow-sm"
            >
              <div>
                <div className="relative aspect-4/3 w-full overflow-hidden bg-white p-2 flex items-center justify-center">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-card/90 backdrop-blur px-2 py-0.5 rounded-full text-[9px] font-bold text-foreground border border-border">
                    {guide.format}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-bold text-primary">
                    {guide.price}
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{guide.tagline}</p>
                  <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{guide.description}</p>
                </div>
              </div>

              <div className="p-3 pt-0 border-t border-border/40 mt-2 flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground truncate max-w-[130px]">
                  <span className="font-semibold text-foreground">For: </span>{guide.bestFor}
                </span>
                <Link
                  to="/product/$slug"
                  params={{ slug: guide.slug }}
                  className="inline-flex items-center font-bold text-primary hover:underline shrink-0"
                >
                  View <ArrowRight className="ml-0.5 h-2.5 w-2.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. FULL CATALOG GRID WITH COMPACT TABS */}
      {/* ======================================================== */}
      <section className="border-t border-border bg-secondary/25 py-8 sm:py-12">
        <div className="container-page space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="eyebrow">The Complete Collection</p>
              <h2 className="mt-0.5 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                Authentic Y.G Heritage Range
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Hand-compounded hing, roasted sathu maavu, and sacred natural sambrani resins.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1 p-0.5 bg-muted/60 rounded-lg border border-border w-fit">
              {(
                [
                  { id: "all", label: `All (${products.length})` },
                  { id: "powder", label: "Powder" },
                  { id: "granules", label: "Granules" },
                  { id: "cake", label: "Cake" },
                  { id: "combo", label: "Gift Sets" },
                  { id: "wellness", label: "Health Mix" },
                  { id: "pooja", label: "Sambrani" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCatalogTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    activeCatalogTab === tab.id
                      ? "bg-card text-foreground shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Compact Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {displayedProducts.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 5} mode="compact" />
            ))}
          </div>

          <div className="text-center pt-2">
            <Button size="sm" variant="outline" className="text-xs font-semibold" asChild>
              <Link to="/shop">
                Explore Full Shop with Filters & Sorting <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. HERITAGE STORY & STONE COMPOUNDING SPOTLIGHT */}
      {/* ======================================================== */}
      <section className="border-y border-border bg-clove text-clove-foreground py-10 sm:py-14">
        <div className="container-page grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 relative max-w-sm mx-auto lg:max-w-none w-full">
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/20">
              <SmartImage
                src={storyShopImage}
                alt="Shri P. Subramanian compounding artisanal hing in 1932 Tirunelveli"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 40vw, 95vw"
                fallbackLabel="Estd. 1932"
                wrapperClassName="h-full w-full"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -left-2 bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-lg text-[10px] shadow-md">
              Estd. 1932 · Tirunelveli
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            <p className="text-[11px] font-bold tracking-widest uppercase text-amber-400">
              Preserving A 90-Year Craft
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
              Started by Shri P. Subramanian. Mastered across three generations.
            </h2>
            <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
              In 1932, near the banks of the Thamirabarani river, Shri P. Subramanian perfected the art of
              stone-compounding imported mountain ferula resin with pure starches. Today, his grandchildren
              continue the same strict formula without shortcuts.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10 text-center">
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-amber-400">1932</p>
                <p className="opacity-75 text-[10px]">Founding Year</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-amber-400">100%</p>
                <p className="opacity-75 text-[10px]">Natural Ferula</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-amber-400">0%</p>
                <p className="opacity-75 text-[10px]">Chemical Additives</p>
              </div>
            </div>

            <div className="pt-1">
              <Button variant="secondary" size="sm" className="font-semibold text-slate-950 text-xs" asChild>
                <Link to="/story">Read Our Full 1932 Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. AUTHENTIC VERIFIED REVIEWS GRID */}
      {/* ======================================================== */}
      <section className="container-page py-10 sm:py-14">
        <SectionHeading
          eyebrow="Customer Testimonials"
          title="Trusted Across 1k+ Kitchens"
          description="Real verified experiences from traditional cooks and culinary enthusiasts."
          align="center"
        />

        <div className="mt-6 flex flex-nowrap overflow-x-auto gap-3.5 pb-4 pt-1 px-4 -mx-4 scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:p-0 md:m-0 md:gap-4">
          {verifiedReviews.map((rev) => (
            <figure
              key={rev.name}
              className="w-[82vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink surface-card flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-border shadow-xs hover:border-primary/40 transition-all bg-card"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[9px] px-2 py-0.5 bg-primary/10 text-primary font-bold rounded-full">
                    Verified Purchase
                  </span>
                </div>

                <h4 className="mt-2.5 text-sm font-bold text-foreground leading-snug">{rev.title}</h4>

                <blockquote className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </blockquote>
              </div>

              <div className="mt-4 pt-2.5 border-t border-border/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-foreground text-xs">{rev.name}</p>
                  <p className="text-muted-foreground text-[11px]">{rev.city}</p>
                </div>
                <span className="font-semibold text-primary text-[11px] bg-primary/5 px-2 py-0.5 rounded border border-primary/15">{rev.product}</span>
              </div>
            </figure>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-2 text-[11px] font-medium text-muted-foreground">
          <span>← Swipe horizontally to view more reviews →</span>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. PROMO OFFER & CLOSING CTA */}
      {/* ======================================================== */}
      <section className="container-page py-10 sm:py-14">
        <div className="relative overflow-hidden gradient-gold rounded-2xl p-6 sm:p-10 text-center text-primary-foreground shadow-lg">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="inline-block px-2.5 py-0.5 bg-black/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Special Code: HERITAGE10
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ninety Years of Culinary Purity, One Pinch at a Time
            </h2>
            <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
              Free delivery on orders above ₹499 with same-day dispatch from Tirunelveli.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
              <Button size="sm" variant="secondary" className="font-bold text-slate-950 px-5 shadow-xs" asChild>
                <Link to="/shop">Shop the 9 Formulations</Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent border-white/40 text-white hover:bg-white/10 text-xs"
                asChild
              >
                <Link to="/contact">Ask Specialists</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
