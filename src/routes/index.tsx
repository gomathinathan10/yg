import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CreditCard,
  MapPin,
  Smile,
  Sparkles,
  Star,
  Truck,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { TestimonialsSlider } from "@/components/site/TestimonialsSlider";
import {
  MAIN_CATEGORIES,
  matchesCategory,
  getLiveProducts,
  useLiveProducts,
  type MainCategoryId,
} from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  loader: () => getLiveProducts(),
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
    ],
  }),
  component: HomePage,
});


const HERO_VIDEOS = [
  { src: "/hero-video-heritage.mp4" },
  { src: "/hero-video-factory.mp4" },
  { src: "/hero-video-craft.mp4" },
  { src: "/hero-video-gold.mp4" },
  { src: "/hero-video-purity.mp4" },
  { src: "/hero-video-tradition.mp4" },
  { src: "/hero-video-master.mp4?v=20260827" },
];

function HomePage() {
  const [activeCatalogTab, setActiveCatalogTab] = useState<MainCategoryId>("all");
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
  }, []);

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    if (currentVideoIndex === HERO_VIDEOS.length - 1) {
      if (!isMuted) {
        soundPlayCountRef.current += 1;
        if (soundPlayCountRef.current >= 2) {
          video.muted = true;
          setIsMuted(true);
        }
      }
    }

    setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  const selectVideo = (index: number) => {
    if (soundPlayCountRef.current < 2) {
      setIsMuted(false);
    }
    setCurrentVideoIndex(index);
  };

  const initialProducts = Route.useLoaderData();
  const products = useLiveProducts(initialProducts);
  const displayedProducts = products.filter((p) => matchesCategory(p, activeCatalogTab));

  const currentVideo = HERO_VIDEOS[currentVideoIndex] ?? HERO_VIDEOS[0]!;
  const nextVideoItem = HERO_VIDEOS[(currentVideoIndex + 1) % HERO_VIDEOS.length];

  return (
    <div className="space-y-0 relative">
      {/* Hidden pre-buffering video element */}
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
      {/* 1. CINEMATIC HERO BANNER (Screenshot 3 background)       */}
      {/* ======================================================== */}
      <section className="group relative overflow-hidden border-b border-border w-full bg-neutral-950 flex items-center justify-center select-none min-h-[280px] sm:min-h-[400px] md:min-h-[500px]">
        {/* Subtle Ambient Backdrop Glow */}
        <div className="absolute inset-0 bg-radial from-neutral-900 to-black opacity-80 pointer-events-none" />

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
          className={`w-full max-h-[85vh] sm:max-h-[88vh] object-contain object-center relative z-10 transition-all duration-500 mx-auto ${
            isFading ? "opacity-75 scale-98" : "opacity-100 scale-100"
          }`}
          style={{ willChange: "transform, opacity" }}
        />

        {/* Gentle bottom scrim only behind controls so video visuals remain fully visible */}
        <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />

        {/* Top-Right: Sound Toggle Button */}
        <div className="absolute top-3 sm:top-5 right-3 sm:right-6 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMuted((m) => !m)}
            className="h-7 sm:h-9 px-2.5 sm:px-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 text-[10px] sm:text-xs font-medium hover:bg-black/80 transition-all shadow-xl cursor-pointer active:scale-95"
            aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
          >
            {isMuted ? (
              <>
                <VolumeX className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/80" />
                <span className="text-[10px] sm:text-xs font-medium">Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FF9933] animate-pulse" />
                <span className="text-[10px] sm:text-xs text-[#FF9933] font-bold">Sound On</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Slide Switcher */}
        <div className="absolute bottom-2.5 sm:bottom-4 inset-x-0 hidden sm:flex justify-center items-center z-20 pointer-events-auto px-4">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/50 backdrop-blur-xs border border-white/10">
            {HERO_VIDEOS.map((v, i) => (
              <button
                key={v.src}
                type="button"
                onClick={() => selectVideo(i)}
                aria-label={`Switch to video ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentVideoIndex === i
                    ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[#FF9933] shadow-md"
                    : "w-2 sm:w-2.5 h-1.5 sm:h-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. BUYING EASYWAY PROCESS STRIP                          */}
      {/* ======================================================== */}
      <section className="border-b border-[#E8DEC8] bg-white py-5 sm:py-6">
        <div className="container-page px-3 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3 rounded-[8px] border border-[#E8DEC8] bg-[#FAF3D6]/60 hover:border-[#FF9933] hover:shadow-xs transition-all">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-[#FF9933] bg-[#FF9933]/20 flex items-center justify-center shrink-0 text-[#181206]">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#181206] leading-tight truncate">Easy Payment</h4>
                <p className="text-[10px] sm:text-xs text-[#5A6560] mt-0.5 truncate">COD &amp; UPI Available</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3 rounded-[8px] border border-[#E8DEC8] bg-[#FAF3D6]/60 hover:border-[#FF9933] hover:shadow-xs transition-all">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-[#FF9933] bg-[#FF9933]/20 flex items-center justify-center shrink-0 text-[#181206]">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#181206] leading-tight truncate">Track Online</h4>
                <p className="text-[10px] sm:text-xs text-[#5A6560] mt-0.5 truncate">Real-time Location</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3 rounded-[8px] border border-[#E8DEC8] bg-[#FAF3D6]/60 hover:border-[#FF9933] hover:shadow-xs transition-all">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-[#FF9933] bg-[#FF9933]/20 flex items-center justify-center shrink-0 text-[#181206]">
                <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#181206] leading-tight truncate">100% Happy</h4>
                <p className="text-[10px] sm:text-xs text-[#5A6560] mt-0.5 truncate">94 Yrs Heritage</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3 rounded-[8px] border border-[#E8DEC8] bg-[#FAF3D6]/60 hover:border-[#FF9933] hover:shadow-xs transition-all">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-[#FF9933] bg-[#FF9933]/20 flex items-center justify-center shrink-0 text-[#181206]">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#181206] leading-tight truncate">Free Shipping</h4>
                <p className="text-[10px] sm:text-xs text-[#5A6560] mt-0.5 truncate">Orders Above ₹499</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. BULK SUPPLY / PRIVATE LABEL BANNER                    */}
      {/* ======================================================== */}
      <section className="bg-white py-6 sm:py-8 border-b border-[#E8DEC8]">
        <div className="container-page px-3 sm:px-6">
          <div className="rounded-xl border border-[#FF9933]/40 bg-gradient-to-r from-[#FFFBEA] via-white to-[#FAF3D6] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs hover:border-[#FF9933] transition-colors">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="h-11 w-11 rounded-full bg-[#FF9933] text-[#181206] flex items-center justify-center shrink-0 font-black shadow-xs animate-bounce">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs sm:text-base font-black text-[#181206] uppercase tracking-wide">
                  Looking for Bulk Supply or Private Label
                </p>
                <p className="text-xs text-[#5A6560] mt-0.5">
                  Custom export mesh grades, institutional bulk barrels &amp; client-branded formulation packaging.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-[#181206] text-[#FF9933] hover:bg-black hover:text-[#FFD333] border border-[#FF9933]/40 font-black text-xs px-5 py-2.5 shrink-0 rounded-[6px] shadow-xs active:scale-95 transition-all"
              asChild
            >
              <Link to="/custom-branding">Request White Label Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. POPULAR PRODUCTS (Screenshot 1)                       */}
      {/* ======================================================== */}
      <section className="bg-[#FAF3D6]/50 py-10 sm:py-14">
        <div className="container-page space-y-5 sm:space-y-6 px-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-b border-[#E8DEC8] pb-3 sm:pb-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8C5921] bg-[#FAF3D6] px-2.5 py-0.5 rounded border border-[#E8DEC8]">
                Bestselling Heritage
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-[#181206] tracking-tight mt-1">
                Popular Products
              </h2>
            </div>

            {/* Category Filter Tabs with Smooth Pill Transitions */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-xs sm:text-sm font-semibold">
              {MAIN_CATEGORIES.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCatalogTab(tab.id)}
                  className={cn(
                    "cursor-pointer transition-all duration-300 px-3.5 py-1.5 rounded-full text-xs font-bold border active:scale-95 shadow-2xs",
                    activeCatalogTab === tab.id
                      ? "bg-[#FF9933] text-[#181206] border-[#D8A700] shadow-sm ring-2 ring-[#8C5921]/30 font-black scale-105"
                      : "bg-white text-[#181206] border-[#E8DEC8] hover:bg-[#FAF3D6] hover:border-[#FF9933]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3-column Product Grid with Spacious, Attractive Layout & Staggered Animations */}
          <div
            key={activeCatalogTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 animate-in fade-in-50 duration-300"
          >
            {displayedProducts.map((p, i) => (
              <div
                key={p.slug}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <ProductCard product={p} priority={i < 3} />
              </div>
            ))}
          </div>

          <div className="text-center pt-2 sm:pt-4">
            <Button
              size="sm"
              className="h-10 px-6 sm:px-8 font-extrabold text-xs sm:text-sm rounded-[6px] border border-[#FF9933] bg-[#FF9933] text-[#181206] hover:bg-[#E6B000] transition-all shadow-xs cursor-pointer active:scale-95"
              asChild
            >
              <Link to="/shop">
                Explore Full Shop with Filters &amp; Sorting <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. HERITAGE STORY & STONE COMPOUNDING SPOTLIGHT          */}
      {/* ======================================================== */}
      <section className="border-y border-border bg-clove text-clove-foreground py-8 sm:py-14">
        <div className="container-page grid items-center gap-6 sm:gap-8 lg:grid-cols-12 px-3 sm:px-6">
          <div className="lg:col-span-5 relative max-w-sm mx-auto lg:max-w-none w-full">
            <div className="aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/20">
              <img
                src="/images/heritage-compounding-1931.jpg"
                alt="Shri P. Subramanian stone compounding pure Ferula asafoetida gum resin in 1932 Tirunelveli"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-2 -left-2 bg-[#FF9933] text-[#181206] font-black px-3 py-1 rounded-lg text-[10px] shadow-md border border-black/20">
              Estd. 1932 · Tirunelveli
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            <p className="text-[11px] font-extrabold tracking-widest uppercase text-[#FF9933]">
              Preserving A 94-Year Craft
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
                <p className="text-lg sm:text-xl font-extrabold text-[#FF9933]">1932</p>
                <p className="opacity-75 text-[10px]">Founding Year</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-[#FF9933]">100%</p>
                <p className="opacity-75 text-[10px]">Natural Ferula</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-[#FF9933]">0%</p>
                <p className="opacity-75 text-[10px]">Chemical Additives</p>
              </div>
            </div>

            <div className="pt-1">
              <Button size="sm" className="font-bold bg-[#FF9933] text-[#181206] hover:bg-[#E6B000] text-xs border border-black/15 shadow-xs" asChild>
                <Link to="/story">Read Our Full Heritage Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. AUTHENTIC VERIFIED REVIEWS CAROUSEL (1 SLIDE AT A TIME) */}
      {/* ======================================================== */}
      <section className="container-page py-8 sm:py-14 px-3 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="text-[#181206] font-black text-xs uppercase tracking-wider bg-[#FF9933] px-3 py-1 rounded-[4px] border border-black/10">
            Customer Testimonials
          </span>
          <h2 className="mt-2 text-xl sm:text-3xl font-extrabold text-[#181206] tracking-tight">
            Trusted Across 1k+ Kitchens
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6560] mt-1">
            Real verified experiences from traditional cooks and culinary enthusiasts.
          </p>
        </div>

        <TestimonialsSlider />
      </section>

      {/* ======================================================== */}
      {/* 7. PROMO OFFER & CLOSING CTA                             */}
      {/* ======================================================== */}
      <section className="container-page py-8 sm:py-14 px-3 sm:px-6">
        <div className="relative overflow-hidden bg-[#FF9933] rounded-[10px] sm:rounded-[12px] p-6 sm:p-12 text-center text-[#181206] shadow-md border border-black/10">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-[#181206] text-[#FF9933] rounded-[4px] text-[10px] font-black uppercase tracking-wider">
              Special Coupon: BULK15
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#181206]">
              Ninety-Four Years of Culinary Purity, One Pinch at a Time
            </h2>
            <p className="text-xs sm:text-sm text-[#181206]/85 font-medium leading-relaxed">
              Free delivery on orders above ₹499 with same-day dispatch directly from our works in Tirunelveli.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <Button
                size="sm"
                className="h-10 px-5 sm:px-6 font-extrabold text-xs sm:text-sm bg-[#181206] text-[#FF9933] hover:bg-black rounded-[6px] shadow-sm transition-all active:scale-95"
                asChild
              >
                <Link to="/shop">Shop All 15 Products</Link>
              </Button>
              <Button
                size="sm"
                className="h-10 px-5 sm:px-6 font-extrabold text-xs sm:text-sm border-2 border-[#181206] text-[#181206] bg-transparent hover:bg-[#181206]/10 rounded-[6px] transition-all active:scale-95"
                asChild
              >
                <Link to="/story">Our Heritage Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
