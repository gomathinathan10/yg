import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, Sparkles, Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  rating: number;
  title: string;
  comment: string;
  name: string;
  city?: string | null;
  product?: string;
  verified?: boolean;
}

export const VERIFIED_REVIEWS: TestimonialItem[] = [
  {
    rating: 5,
    title: "Authentic Paati's Rasam Aroma",
    comment:
      "Takes me straight back to my grandmother's kitchen in Tirunelveli. Standard store brands smell synthetic compared to this deep, wholesome aroma.",
    name: "Sowmya Raman",
    city: "Chennai, Tamil Nadu",
    product: "Gold Powder",
    verified: true,
  },
  {
    rating: 5,
    title: "Life-Saver for Celiac Cooking",
    comment:
      "Finding truly wheat-free hing that still has authentic strength was impossible until I found Y.G's pure rice-starch formula. Safe, digestive, and exceptionally fragrant.",
    name: "Karthik Sundaram",
    city: "Bengaluru, Karnataka",
    product: "Gluten-Free Hing",
    verified: true,
  },
  {
    rating: 5,
    title: "Pellets in Curd Rice are Pure Perfection",
    comment:
      "The Hing Pellets don't burn like fine powders do. They puff gently during ghee tempering, giving an incredible delicate crunch and sustained aroma.",
    name: "Meenakshi V.",
    city: "Madurai, Tamil Nadu",
    product: "Hing Pellets",
    verified: true,
  },
  {
    rating: 5,
    title: "Gold Cake for Authentic Temple Kuzhambu",
    comment:
      "Shaving a small piece of the Pindi Hing into hot ghee gives the authentic tangy aroma needed for traditional vathal kuzhambu and authentic sambar.",
    name: "Dr. K. Raghavan",
    city: "Coimbatore, Tamil Nadu",
    product: "Gold Cake",
    verified: true,
  },
  {
    rating: 5,
    title: "Glass Jar Locks Aroma Completely",
    comment:
      "The airtight rubber gasket jar is gorgeous on the kitchen counter and keeps the fragrance locked in permanently. You need only a microscopic pinch.",
    name: "Anita Deshmukh",
    city: "Mumbai, Maharashtra",
    product: "Bottle Jar",
    verified: true,
  },
  {
    rating: 5,
    title: "Exquisite Heritage 4-in-1 Hamper Box",
    comment:
      "Ordered the combo box as a festive housewarming gift. The engraved brass spoon and assortment of powder, cake, chips, and pellets delighted our hosts.",
    name: "Sridhar K.",
    city: "Hyderabad, Telangana",
    product: "Heritage Box",
    verified: true,
  },
];

export function TestimonialsSlider({
  items = VERIFIED_REVIEWS,
  autoPlayInterval = 6000,
}: {
  items?: TestimonialItem[];
  autoPlayInterval?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const total = items.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, total, autoPlayInterval, nextSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
    touchEndXRef.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  const activeItem = items[currentIndex] ?? items[0]!;

  return (
    <div
      className="relative max-w-4xl mx-auto select-none outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer Testimonials"
    >
      {/* 1-Slide Main Card Viewport */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#E8DEC8] bg-white p-5 sm:p-8 md:p-10 shadow-md">
        {/* Decorative Quote Watermark Background */}
        <Quote className="absolute top-4 right-6 sm:top-6 sm:right-10 h-20 w-20 sm:h-32 sm:w-32 text-[#FF9933]/10 -rotate-12 pointer-events-none" />

        {/* Top Header Row of Single Slide: Stars, Progress Badge, Verified Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-[#E8DEC8]/80 pb-4">
          <div className="flex items-center gap-1 text-[#EABC5E]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5",
                  i < activeItem.rating
                    ? "fill-[#EABC5E] text-[#EABC5E]"
                    : "fill-neutral-200 text-neutral-300"
                )}
              />
            ))}
            <span className="ml-2 font-black text-xs sm:text-sm text-[#181206]">
              {activeItem.rating}.0 / 5.0
            </span>
          </div>

          <div className="flex items-center gap-2">
            {activeItem.verified !== false && (
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-0.5 bg-[#FF9933] text-[#181206] font-black rounded-full shadow-2xs">
                <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#181206] text-white" />
                Verified Customer
              </span>
            )}
            <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#181206]/5 text-[#5A6560] border border-[#E8DEC8]">
              {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Animated Slide Content (1 Slide at a time) */}
        <div
          key={currentIndex}
          className={cn(
            "pt-5 sm:pt-6 relative z-10 transition-all duration-300",
            direction === "next" ? "animate-in fade-in-50 slide-in-from-right-4" : "animate-in fade-in-50 slide-in-from-left-4"
          )}
        >
          <h3 className="text-base sm:text-xl md:text-2xl font-black text-[#181206] leading-snug tracking-tight">
            &ldquo;{activeItem.title}&rdquo;
          </h3>

          <blockquote className="mt-3 text-xs sm:text-base text-[#424D47] leading-relaxed italic font-serif">
            &ldquo;{activeItem.comment}&rdquo;
          </blockquote>

          {/* Reviewer Details & Product Highlight */}
          <div className="mt-6 sm:mt-8 pt-4 border-t border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-[#FF9933] to-[#8C5921] text-white flex items-center justify-center font-black text-sm sm:text-base shadow-sm ring-2 ring-white">
                {activeItem.name.charAt(0)}
              </div>
              <div>
                <p className="font-extrabold text-xs sm:text-sm text-[#181206] leading-tight">
                  {activeItem.name}
                </p>
                {activeItem.city && (
                  <p className="text-[10px] sm:text-xs text-[#5A6560] mt-0.5">
                    {activeItem.city}
                  </p>
                )}
              </div>
            </div>

            {activeItem.product && (
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <span className="text-[10px] sm:text-xs text-[#5A6560] font-medium">Purchased:</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#181206] bg-[#FF9933]/30 px-3 py-1 rounded-full border border-[#FF9933]/50">
                  {activeItem.product}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows (Prev / Next) & Pagination Dots */}
      <div className="mt-5 flex items-center justify-between gap-4 px-2">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous testimonial slide"
          className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-white border border-[#E8DEC8] text-[#181206] hover:bg-[#FF9933] hover:border-[#FF9933] flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Slide-by-Slide Navigation Dots */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {items.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to testimonial slide ${idx + 1} from ${item.name}`}
              aria-current={currentIndex === idx ? "true" : "false"}
              className={cn(
                "h-2.5 transition-all duration-300 rounded-full cursor-pointer",
                currentIndex === idx
                  ? "w-8 bg-[#FF9933] shadow-xs"
                  : "w-2.5 bg-[#E8DEC8] hover:bg-[#FF9933]/60"
              )}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next testimonial slide"
          className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-white border border-[#E8DEC8] text-[#181206] hover:bg-[#FF9933] hover:border-[#FF9933] flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}
