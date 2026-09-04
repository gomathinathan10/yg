import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";

type ProductImageZoomProps = {
  images: string[];
  activeImage: number;
  onSelectImage: (index: number) => void;
  productName: string;
  formatLabel: string;
  isBestseller?: boolean | undefined;
  isGlutenFree?: boolean | undefined;
  thumbContainerRef?: React.RefObject<HTMLDivElement | null> | undefined;
};

export function ProductImageZoom({
  images,
  activeImage,
  onSelectImage,
  productName,
  formatLabel,
  isBestseller,
  isGlutenFree,
  thumbContainerRef,
}: ProductImageZoomProps) {
  const currentImage = images[activeImage] ?? images[0] ?? "";
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const nextImage = useCallback(() => {
    if (images.length <= 1) return;
    onSelectImage((activeImage + 1) % images.length);
  }, [activeImage, images.length, onSelectImage]);

  const prevImage = useCallback(() => {
    if (images.length <= 1) return;
    onSelectImage((activeImage - 1 + images.length) % images.length);
  }, [activeImage, images.length, onSelectImage]);

  // Keyboard arrow navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, nextImage, prevImage]);

  // Touch gesture support for mobile swiping
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 35) {
        nextImage();
      } else if (diff < -35) {
        prevImage();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      } else {
        return;
      }
    }
    const rect = rectRef.current;
    const clientX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const clientY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const percentX = (clientX / rect.width) * 100;
      const percentY = (clientY / rect.height) * 100;
      const lensW = 140;
      const lensH = 140;
      let lensX = clientX - lensW / 2;
      let lensY = clientY - lensH / 2;
      const maxX = rect.width - lensW;
      const maxY = rect.height - lensH;

      if (lensX < 0) lensX = 0;
      if (lensY < 0) lensY = 0;
      if (lensX > maxX) lensX = maxX;
      if (lensY > maxY) lensY = maxY;

      if (imgRef.current) {
        imgRef.current.style.transformOrigin = `${percentX}% ${percentY}%`;
        imgRef.current.style.transform = "scale(2.2)";
      }
      if (lensRef.current) {
        lensRef.current.style.left = `${lensX}px`;
        lensRef.current.style.top = `${lensY}px`;
      }
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    rectRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1)";
    }
  };

  return (
    <div className="space-y-3 relative select-none">
      {/* Main Image Showcase Stage */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="surface-card group relative overflow-hidden rounded-2xl border border-border bg-white p-4 sm:p-6 flex items-center justify-center touch-pan-y min-h-[340px] sm:min-h-[460px] cursor-crosshair shadow-sm"
      >
        {/* Dynamic Zoom Image Container */}
        <div
          onClick={nextImage}
          className="relative aspect-square sm:aspect-[4/3] max-h-[340px] sm:max-h-[440px] w-full flex items-center justify-center overflow-hidden cursor-pointer"
          title="Click to view next image, or hover to zoom"
        >
          <img
            ref={imgRef}
            src={currentImage}
            alt={`${productName} - View ${activeImage + 1}`}
            className="h-full w-full max-h-[340px] sm:max-h-[440px] object-contain block transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: isHovering ? "scale(2.2)" : "scale(1)",
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Hover Lens Box Indicator (Desktop only when hovering) */}
        {isHovering && (
          <div
            ref={lensRef}
            className="hidden md:block absolute pointer-events-none border-2 border-primary bg-primary/15 backdrop-contrast-110 shadow-lg rounded-lg z-20 transition-all duration-75"
            style={{
              width: "140px",
              height: "140px",
              left: "50%",
              top: "50%",
            }}
          >
            {/* Center Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-white shadow-xs" />
            </div>
          </div>
        )}

        {/* Floating Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="rounded-full bg-card/95 backdrop-blur px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-foreground uppercase border border-border/60 shadow-xs">
            {formatLabel}
          </span>
          {isBestseller ? (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-primary-foreground uppercase shadow-xs">
              Bestseller
            </span>
          ) : null}
          {isGlutenFree ? (
            <span className="rounded-full bg-amber-500 text-slate-950 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase shadow-xs">
              Gluten-Free
            </span>
          ) : null}
        </div>

        {/* Top Right Controls: Counter & Fullscreen Zoom Button */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          {images.length > 1 ? (
            <div className="bg-foreground/80 backdrop-blur-md text-background px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs pointer-events-none">
              {activeImage + 1} / {images.length}
            </div>
          ) : null}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            aria-label="Open fullscreen image view"
            title="Open Fullscreen View"
            className="h-7 w-7 rounded-full bg-white/90 border border-border text-foreground flex items-center justify-center shadow-xs hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Permanent Prev & Next Navigation Buttons */}
        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous product photo"
              title="Previous photo"
              className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/95 border border-border shadow-md text-foreground flex items-center justify-center transition-all hover:bg-white hover:scale-110 hover:border-primary active:scale-95 z-30 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next product photo"
              title="Next photo"
              className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/95 border border-border shadow-md text-foreground flex items-center justify-center transition-all hover:bg-white hover:scale-110 hover:border-primary active:scale-95 z-30 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        {/* Bottom Bar: Slide Indicators & Stone Compounded Badge */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
          {images.length > 1 ? (
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-border shadow-xs pointer-events-auto">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectImage(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeImage === i ? "w-5 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          ) : (
            <div />
          )}

          <div className="bg-background/90 backdrop-blur px-2.5 py-1 rounded-lg border border-border text-[9px] sm:text-[10px] text-muted-foreground flex items-center gap-1 shadow-xs">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>Stone-Compounded</span>
          </div>
        </div>
      </div>



      {/* Interactive Helper Hint */}
      <div className="flex items-center justify-between px-1 text-xs text-muted-foreground font-medium">
        <div className="flex items-center gap-1.5">
          <ZoomIn className="h-3.5 w-3.5 text-primary" />
          <span>Hover to magnify · Click arrows to view next photo</span>
        </div>
        {images.length > 1 ? (
          <span className="text-[11px] text-muted-foreground/80">{images.length} views available</span>
        ) : null}
      </div>

      {/* Prominent Thumbnail Gallery Strip */}
      {images.length > 1 ? (
        <div
          ref={thumbContainerRef}
          className="flex gap-2.5 overflow-x-auto pb-1 pt-1 scrollbar-thin scroll-smooth"
          role="group"
          aria-label="Product image thumbnails"
        >
          {images.map((img, i) => {
            const active = activeImage === i;
            return (
              <button
                key={img + i}
                type="button"
                onClick={() => onSelectImage(i)}
                onMouseEnter={() => onSelectImage(i)}
                aria-label={`Switch to photo ${i + 1}`}
                title={`View photo ${i + 1}`}
                className={`relative h-18 w-18 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 p-1.5 bg-white transition-all cursor-pointer ${
                  active
                    ? "border-primary shadow-md scale-105 ring-2 ring-primary/30"
                    : "border-border hover:border-primary/60 opacity-75 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="h-full w-full object-contain"
                  loading="eager"
                />
                {active ? (
                  <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-primary ring-1 ring-white" />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in-0 duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close fullscreen view"
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer z-50"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Prev / Next */}
          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer z-50"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer z-50"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          ) : null}

          {/* Large Lightbox Image */}
          <div
            className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage}
              alt={productName}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Lightbox Bottom Thumbnails */}
          {images.length > 1 ? (
            <div
              className="mt-4 flex gap-2 overflow-x-auto p-2 bg-black/40 rounded-2xl backdrop-blur max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => onSelectImage(i)}
                  className={`h-14 w-14 rounded-lg overflow-hidden border-2 p-1 bg-white transition-all cursor-pointer ${
                    activeImage === i ? "border-primary scale-105" : "border-white/40 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
