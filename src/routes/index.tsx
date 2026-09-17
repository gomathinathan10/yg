import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
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
import { SmartImage } from "@/components/site/SmartImage";
import { formatLabels, products, type Format } from "@/data/products";
import { storyShopImage } from "@/assets/images";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Y.G Asafoetida — Artisanal Hing, Sathu Maavu & Sambrani Since 1931" },
      {
        name: "description",
        content:
          "Buy authentic compounded asafoetida powder, pure gold hing cake, gluten-free hing, wood-roasted traditional health mix (sathu maavu), and pure temple benzoin sambrani online from Tirunelveli since 1931.",
      },
      {
        name: "keywords",
        content:
          "buy hing online, asafoetida powder, Y.G Asafoetida, pure gold hing cake, gluten free hing, traditional health mix, sathu maavu online, pure benzoin sambrani, loban resin, Tirunelveli hing store",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ygasafoetida.in/" },
      { property: "og:title", content: "Y.G Asafoetida — Authentic Heritage Hing & Traditional Store Since 1931" },
      {
        property: "og:description",
        content:
          "Artisanal hing preparations, stone-ground Sathu Maavu health mix, and pure benzoin sambrani compounded in Tirunelveli.",
      },
      { property: "og:image", content: "https://ygasafoetida.in/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Y.G Asafoetida — Authentic Heritage Hing Since 1931" },
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

const featuredCategories = [
  {
    id: "powder" as const,
    title: formatLabels.powder, // "Powder"
    image: "/products/100g-gold-asafoetida-powder/img-1.jpg",
    itemCount: products.filter((p) => p.format === "powder").length,
  },
  {
    id: "granules" as const,
    title: formatLabels.granules, // "Granules"
    image: "/products/hing-pellets/img-1.jpg",
    itemCount: products.filter((p) => p.format === "granules").length,
  },
  {
    id: "cake" as const,
    title: formatLabels.cake, // "Cake"
    image: "/products/100g-asafoetida-gold-cake/img-1.jpg",
    itemCount: products.filter((p) => p.format === "cake").length,
  },
  {
    id: "gf" as const,
    title: "Gluten-Free Pure",
    image: "/products/50g-gluten-free-asafoetida-powder/img-1.jpg",
    itemCount: products.filter((p) => p.glutenFree).length,
  },
  {
    id: "wellness" as const,
    title: formatLabels.wellness, // "Health Mix"
    image: "/products/traditional-health-mix/img-1.jpg",
    itemCount: products.filter((p) => p.format === "wellness").length,
  },
  {
    id: "appalam" as const,
    title: formatLabels.appalam, // "Crispy Appalam"
    image: "/products/crispy-appalam/img-1.jpg",
    itemCount: products.filter((p) => p.format === "appalam").length,
  },
  {
    id: "vismaya" as const,
    title: formatLabels.vismaya, // "Vismaya Ready to Cook"
    image: "/products/millet-pongal-mix/img-1.jpg",
    itemCount: products.filter((p) => p.format === "vismaya").length,
  },
  {
    id: "pooja" as const,
    title: formatLabels.pooja, // "Pooja Sambrani"
    image: "/products/pure-benzoin-sambrani/img-1.png",
    itemCount: products.filter((p) => p.format === "pooja").length,
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
    subtitle: "Purity Since 1931",
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

  const displayedProducts = products.filter((p) => {
    if (activeCatalogTab === "all") return true;
    return p.format === activeCatalogTab;
  });

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
      <section className="group relative overflow-hidden border-b border-border w-full bg-neutral-950 flex items-center justify-center select-none min-h-[260px] sm:min-h-[380px] md:min-h-[480px]">
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

        {/* Top-Left: Active Reel Badge */}
        <div className="absolute top-2.5 sm:top-5 left-2.5 sm:left-5 z-20 pointer-events-none flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-xl">
            <span className="h-2 w-2 rounded-full bg-[#FFC700] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase">{currentVideo.title}</span>
            <span className="text-[10px] text-white/70 hidden md:inline">· {currentVideo.subtitle}</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/50 backdrop-blur-md text-[#FFC700] border border-white/20">
            {currentVideoIndex + 1} / {HERO_VIDEOS.length}
          </span>
        </div>

        {/* Top-Right: Sound Toggle Button */}
        <div className="absolute top-2.5 sm:top-5 right-2.5 sm:right-5 z-20 flex items-center gap-2">
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
                <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FFC700] animate-pulse" />
                <span className="text-[10px] sm:text-xs text-[#FFC700] font-bold">Sound On</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Interactive Video Selector Dock */}
        <div className="absolute bottom-2.5 sm:bottom-4 inset-x-0 flex flex-col items-center gap-2 z-20 pointer-events-auto px-3 sm:px-4">
          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 shadow-2xl max-w-full overflow-x-auto scrollbar-none">
            {HERO_VIDEOS.map((v, i) => (
              <button
                key={v.src}
                type="button"
                onClick={() => selectVideo(i)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  currentVideoIndex === i
                    ? "bg-[#FFC700] text-[#181206] font-black shadow-md scale-105"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${currentVideoIndex === i ? "bg-[#181206]" : "bg-white/50"}`} />
                {v.tag || v.title}
              </button>
            ))}
          </div>

          <div className="flex sm:hidden justify-center items-center gap-1.5">
            {HERO_VIDEOS.map((v, i) => (
              <button
                key={v.src}
                type="button"
                onClick={() => selectVideo(i)}
                aria-label={`Switch to video ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentVideoIndex === i
                    ? "w-7 bg-[#FFC700] shadow-md"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. BUYING EASYWAY PROCESS STRIP                          */}
      {/* ======================================================== */}
      <section className="border-b border-[#E8DEC8] bg-[#FAF3D6]/60 py-5 sm:py-6">
        <div className="container-page px-3 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3 rounded-[8px] border border-[#E8DEC8] bg-white hover:border-[#FFC700] hover:shadow-xs transition-all">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-[#FFC700] bg-[#FFC700]/20 flex items-center justify-center shrink-0 text-[#181206]">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#181206] leading-tight truncate">Easy Payment</h4>
                <p className="text-[10px] sm:text-xs text-[#5A6560] mt-0.5 truncate">COD &amp; UPI Available</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3 rounded-[8px] border border-[#E8DEC8] bg-white hover:border-[#FFC700] hover:shadow-xs transition-all">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-[#FFC700] bg-[#FFC700]/20 flex items-center justify-center shrink-0 text-[#181206]">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#181206] leading-tight truncate">Track Online</h4>
                <p className="text-[10px] sm:text-xs text-[#5A6560] mt-0.5 truncate">Real-time Location</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3 rounded-[8px] border border-[#E8DEC8] bg-white hover:border-[#FFC700] hover:shadow-xs transition-all">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-[#FFC700] bg-[#FFC700]/20 flex items-center justify-center shrink-0 text-[#181206]">
                <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#181206] leading-tight truncate">100% Happy</h4>
                <p className="text-[10px] sm:text-xs text-[#5A6560] mt-0.5 truncate">94 Yrs Heritage</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3 rounded-[8px] border border-[#E8DEC8] bg-white hover:border-[#FFC700] hover:shadow-xs transition-all">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-[#FFC700] bg-[#FFC700]/20 flex items-center justify-center shrink-0 text-[#181206]">
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
      {/* 3. FEATURED CATEGORIES                                   */}
      {/* ======================================================== */}
      <section className="border-b border-[#E8DEC8] bg-white py-8 sm:py-14 overflow-hidden">
        <div className="container-page px-3 sm:px-6">
          <div className="flex items-center justify-between mb-5 sm:mb-8">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8C5921] bg-[#FAF3D6] px-2.5 py-0.5 rounded border border-[#E8DEC8]">
                Explore Collections
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-[#181206] tracking-tight mt-1">
                Featured Categories
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#181206] bg-[#FFC700] hover:bg-[#181206] hover:text-[#FFC700] hover:border-[#181206] border border-[#D8A700] px-3.5 py-1.5 rounded-[6px] shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span>Explore All Categories</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {featuredCategories.map((cat, idx) => (
              <Link
                key={`${cat.id}-${idx}`}
                to="/shop"
                search={{ category: cat.id }}
                className="category-card-interactive bg-gradient-to-b from-[#FFFDF2] to-[#FFFBEA] rounded-2xl p-3.5 sm:p-5 text-center flex flex-col items-center justify-between min-h-[190px] sm:min-h-[220px] border-2 border-[#FFC700] shadow-[0_4px_16px_rgba(255,199,0,0.18)] ring-1 ring-[#FFC700]/30 cursor-pointer group relative overflow-hidden active:scale-95 animate-fade-in-up"
                style={{
                  animationDelay: `${idx * 60}ms`,
                }}
              >
                {/* Ambient gold glow on hover */}
                <div className="absolute inset-0 bg-radial from-[#FFC700]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                <div className="category-image-wrap h-20 w-20 sm:h-24 sm:w-24 rounded-xl bg-white/95 border border-[#E8DEC8] flex items-center justify-center p-2 my-auto shadow-2xs group-hover:border-[#FFC700] group-hover:shadow-md">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="max-h-full max-w-full object-contain drop-shadow-xs transition-all duration-300"
                  />
                </div>
                <div className="mt-2.5 sm:mt-3 text-center w-full relative z-10">
                  <p className="text-xs sm:text-sm font-extrabold text-[#181206] group-hover:text-[#8C5921] transition-colors leading-tight truncate">
                    {cat.title}
                  </p>
                  <span className="text-[10px] sm:text-[11px] font-black inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#FFC700] text-[#181206] border border-[#D8A700] shadow-2xs group-hover:bg-[#181206] group-hover:text-[#FFC700] group-hover:border-[#181206] transition-all duration-300 group-hover:scale-105">
                    {cat.itemCount} items
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Enquire for Bulk Order Action Banner */}
          <div className="mt-6 sm:mt-8 rounded-xl border border-[#FFC700]/40 bg-gradient-to-r from-[#FFFBEA] via-white to-[#FAF3D6] p-3.5 sm:p-4.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs hover:border-[#FFC700] transition-colors">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-full bg-[#FFC700] text-[#181206] flex items-center justify-center shrink-0 font-black shadow-xs animate-bounce">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-[#181206] uppercase tracking-wide">
                  Looking for Bulk Supply or Private Label Compounding?
                </p>
                <p className="text-xs text-[#5A6560] mt-0.5">
                  Custom export mesh grades, institutional bulk barrels &amp; client-branded formulation packaging.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-[#181206] text-[#FFC700] hover:bg-black hover:text-[#FFD333] border border-[#FFC700]/40 font-black text-xs px-4 py-2 shrink-0 rounded-[6px] shadow-xs active:scale-95 transition-all"
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
      <section className="border-t border-[#E8DEC8] bg-[#FAF3D6]/50 py-10 sm:py-14">
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
              {[
                { id: "all", label: "All Formulations" },
                { id: "powder", label: formatLabels.powder },
                { id: "cake", label: formatLabels.cake },
                { id: "granules", label: formatLabels.granules },
                { id: "appalam", label: formatLabels.appalam },
                { id: "vismaya", label: formatLabels.vismaya },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCatalogTab(tab.id as any)}
                  className={cn(
                    "cursor-pointer transition-all duration-300 px-3.5 py-1.5 rounded-full text-xs font-bold border active:scale-95 shadow-2xs",
                    activeCatalogTab === tab.id
                      ? "bg-[#181206] text-[#FFC700] border-[#181206] shadow-sm ring-2 ring-[#FFC700]/50 scale-105"
                      : "bg-white text-[#181206] border-[#E8DEC8] hover:bg-[#FAF3D6] hover:border-[#FFC700]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-column mobile / 4-column desktop Product Grid with Staggered Entrance Animations */}
          <div
            key={activeCatalogTab}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 animate-in fade-in-50 duration-300"
          >
            {displayedProducts.map((p, i) => (
              <div
                key={p.slug}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <ProductCard product={p} priority={i < 4} />
              </div>
            ))}
          </div>

          <div className="text-center pt-2 sm:pt-4">
            <Button
              size="sm"
              className="h-10 px-6 sm:px-8 font-extrabold text-xs sm:text-sm rounded-[6px] border border-[#FFC700] bg-[#FFC700] text-[#181206] hover:bg-[#E6B000] transition-all shadow-xs cursor-pointer active:scale-95"
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
              <SmartImage
                src={storyShopImage}
                alt="Shri P. Subramanian compounding artisanal hing in 1931 Tirunelveli"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 40vw, 95vw"
                fallbackLabel="Estd. 1931"
                wrapperClassName="h-full w-full"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -left-2 bg-[#FFC700] text-[#181206] font-black px-3 py-1 rounded-lg text-[10px] shadow-md border border-black/20">
              Estd. 1931 · Tirunelveli
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            <p className="text-[11px] font-extrabold tracking-widest uppercase text-[#FFC700]">
              Preserving A 94-Year Craft
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
              Started by Shri P. Subramanian. Mastered across three generations.
            </h2>
            <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
              In 1931, near the banks of the Thamirabarani river, Shri P. Subramanian perfected the art of
              stone-compounding imported mountain ferula resin with pure starches. Today, his grandchildren
              continue the same strict formula without shortcuts.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10 text-center">
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-[#FFC700]">1931</p>
                <p className="opacity-75 text-[10px]">Founding Year</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-[#FFC700]">100%</p>
                <p className="opacity-75 text-[10px]">Natural Ferula</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-[#FFC700]">0%</p>
                <p className="opacity-75 text-[10px]">Chemical Additives</p>
              </div>
            </div>

            <div className="pt-1">
              <Button size="sm" className="font-bold bg-[#FFC700] text-[#181206] hover:bg-[#E6B000] text-xs border border-black/15 shadow-xs" asChild>
                <Link to="/story">Read Our Full 1931 Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. AUTHENTIC VERIFIED REVIEWS GRID                       */}
      {/* ======================================================== */}
      <section className="container-page py-8 sm:py-14 px-3 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="text-[#181206] font-black text-xs uppercase tracking-wider bg-[#FFC700] px-3 py-1 rounded-[4px] border border-black/10">
            Customer Testimonials
          </span>
          <h2 className="mt-2 text-xl sm:text-3xl font-extrabold text-[#181206] tracking-tight">
            Trusted Across 1k+ Kitchens
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6560] mt-1">
            Real verified experiences from traditional cooks and culinary enthusiasts.
          </p>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-nowrap overflow-x-auto gap-3 pb-4 pt-1 px-3 -mx-3 scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:p-0 md:m-0 md:gap-4">
          {verifiedReviews.map((rev) => (
            <figure
              key={rev.name}
              className="w-[82vw] max-w-[300px] sm:max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink single-shopping-card-one flex flex-col justify-between p-3.5 sm:p-5 rounded-[8px] border border-[#E8DEC8] shadow-xs hover:border-[#FFC700] transition-all bg-white"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-[#EABC5E]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#EABC5E] text-[#EABC5E]" />
                    ))}
                  </div>
                  <span className="text-[9px] sm:text-[10px] px-2 py-0.5 bg-[#FFC700] text-[#181206] font-black rounded-[4px]">
                    Verified Purchase
                  </span>
                </div>

                <h4 className="mt-2.5 text-xs sm:text-base font-bold text-[#181206] leading-snug">{rev.title}</h4>

                <blockquote className="mt-1.5 text-xs sm:text-sm text-[#5A6560] leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </blockquote>
              </div>

              <div className="mt-3 sm:mt-4 pt-2 border-t border-[#E8DEC8] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#181206] text-xs sm:text-sm">{rev.name}</p>
                  <p className="text-[#5A6560] text-[10px] sm:text-[11px]">{rev.city}</p>
                </div>
                <span className="text-[10px] text-[#181206] font-bold bg-[#FFC700]/40 px-2 py-0.5 rounded">
                  {rev.product}
                </span>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. PROMO OFFER & CLOSING CTA                             */}
      {/* ======================================================== */}
      <section className="container-page py-8 sm:py-14 px-3 sm:px-6">
        <div className="relative overflow-hidden bg-[#FFC700] rounded-[10px] sm:rounded-[12px] p-6 sm:p-12 text-center text-[#181206] shadow-md border border-black/10">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-[#181206] text-[#FFC700] rounded-[4px] text-[10px] font-black uppercase tracking-wider">
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
                className="h-10 px-5 sm:px-6 font-extrabold text-xs sm:text-sm bg-[#181206] text-[#FFC700] hover:bg-black rounded-[6px] shadow-sm transition-all active:scale-95"
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
