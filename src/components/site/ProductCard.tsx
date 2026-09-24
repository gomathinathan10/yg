import { Suspense, lazy, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  Heart,
  Repeat,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { SmartImage } from "@/components/site/SmartImage";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const QuickViewDialog = lazy(() =>
  import("@/components/site/QuickViewDialog").then((m) => ({ default: m.QuickViewDialog })),
);

export type ProductCardMode = "default" | "compact" | "list";

export function ProductCard({
  product,
  priority,
  mode = "default",
}: {
  product: Product;
  priority?: boolean;
  mode?: ProductCardMode;
}) {
  const { add } = useCart();
  const wishlist = useWishlist();
  const [quickView, setQuickView] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants[0]!;
  const soldOut = product.inStock === false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    for (let i = 0; i < quantity; i++) {
      add(product.slug, variant.id);
    }
    toast.success(`Added ${quantity}x ${product.name} (${variant.label}) to cart!`);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlist.toggle(product.slug);
    const inWishlist = wishlist.has(product.slug);
    if (!inWishlist) {
      toast.success(`Saved ${product.name} to your wishlist!`);
    } else {
      toast.info(`Removed ${product.name} from wishlist.`);
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`${product.name}: ${variant.label} · ${formatPrice(variant.price)} · ${product.format} formulation.`);
  };

  // Discount percentage calculation for Ekomart bookmark badge
  const discountPercent =
    variant.mrp && variant.mrp > variant.price
      ? Math.round(((variant.mrp - variant.price) / variant.mrp) * 100)
      : 25;

  const isFavorite = wishlist.has(product.slug);

  return (
    <article className="single-shopping-card-one product-card-interactive group bg-white border border-[#E8DEC8] hover:border-[#FF9933] rounded-xl sm:rounded-2xl p-3 sm:p-4.5 transition-all duration-300 shadow-2xs hover:shadow-[0_14px_30px_-6px_rgba(255,153,51,0.25)] flex flex-col justify-between relative h-full overflow-visible">
      {/* Subtle organic floating backdrop glow on hover */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFF9EE]/70 via-[#FFF4DE]/40 to-[#FFE8BF]/30 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 pointer-events-none -z-10 shadow-xs" />

      {/* Top-Left Offer Tag */}
      <div className="absolute top-3 left-3 z-20 bg-[#FF9933] text-[#181206] font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md shadow-xs border border-[#181206]/15 flex items-center tracking-wide uppercase">
        <span>{discountPercent}% OFF</span>
      </div>

      {/* 1. Product Image Area */}
      <div className="relative w-full aspect-square flex items-center justify-center p-3 bg-[#FAF3D6]/30 rounded-lg sm:rounded-xl overflow-hidden transition-transform duration-300">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          preload="intent"
          className="h-full w-full flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500"
        >
          <SmartImage
            priority={priority ?? false}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            fallbackLabel={product.name}
            wrapperClassName="h-full w-full flex items-center justify-center bg-transparent"
            className="h-full w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)] group-hover:drop-shadow-[0_16px_28px_rgba(255,153,51,0.28)] transition-all duration-500 group-hover:scale-108"
          />
        </Link>
      </div>

      {/* 2. (Like, Compare, View) Options Bar - Situated below product image */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 my-2 py-1 px-2.5 rounded-full bg-[#FAF3D6]/80 border border-[#E8DEC8] w-fit mx-auto shadow-2xs">
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          className={cn(
            "flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#181206] hover:text-[#FF9933] px-1.5 py-0.5 rounded-full hover:bg-white transition-all cursor-pointer",
            isFavorite && "text-[#DC2626] font-extrabold"
          )}
          title="Add to Wishlist"
        >
          <Heart className={cn("h-3.5 w-3.5", isFavorite && "fill-[#DC2626] text-[#DC2626]")} />
          <span>Like</span>
        </button>

        <span className="h-3 w-px bg-[#E8DEC8]" />

        <button
          type="button"
          onClick={handleCompare}
          aria-label="Compare"
          className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#181206] hover:text-[#FF9933] px-1.5 py-0.5 rounded-full hover:bg-white transition-all cursor-pointer"
          title="Compare"
        >
          <Repeat className="h-3.5 w-3.5" />
          <span>Compare</span>
        </button>

        <span className="h-3 w-px bg-[#E8DEC8]" />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setQuickView(true);
          }}
          aria-label="Quick View"
          className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#181206] hover:text-[#FF9933] px-1.5 py-0.5 rounded-full hover:bg-white transition-all cursor-pointer"
          title="Quick View"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View</span>
        </button>
      </div>

      {/* 3. Body Content */}
      <div className="flex flex-1 flex-col pt-1">
        {/* Title */}
        <h3 className="text-xs sm:text-base font-bold leading-snug text-[#181206] group-hover:text-[#8C5921] transition-colors line-clamp-2 min-h-[2.5em] sm:min-h-[auto]">
          <Link to="/product/$slug" params={{ slug: product.slug }} preload="intent">
            {product.name}
          </Link>
        </h3>

        {/* Availability / Pack Size Badge */}
        <div className="mt-1 mb-1.5 flex items-center gap-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#5A6560] bg-white/80 border border-[#E8DEC8] px-2 py-0.5 rounded-full">
            {variant.label} Pack
          </span>
          {product.bestseller && (
            <span className="text-[9px] sm:text-[10px] font-black text-[#181206] bg-[#FF9933] px-2 py-0.5 rounded-full">
              Bestseller
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 mt-auto pt-1">
          <span className="text-sm sm:text-lg font-extrabold text-[#DC2626] font-mono">
            {formatPrice(variant.price)}
          </span>
          {variant.mrp ? (
            <span className="text-[11px] sm:text-sm text-[#9CA3AF] line-through font-mono">
              {formatPrice(variant.mrp)}
            </span>
          ) : (
            <span className="text-[11px] sm:text-sm text-[#9CA3AF] line-through font-mono">
              {formatPrice(Math.round(variant.price * 1.3))}
            </span>
          )}
        </div>

        {/* 3. Bottom Action Row: Curved Stepper + Curved Pill Add To Cart Button */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 mt-2.5 pt-2 border-t border-[#E8DEC8]/60">
          {/* Quantity Stepper with curved pill shape */}
          <div className="ekomart-quantity-box shrink-0 rounded-full border-[#E8DEC8] overflow-hidden bg-white">
            <input
              type="text"
              readOnly
              value={quantity}
              aria-label="Quantity"
            />
            <div className="ekomart-quantity-arrows">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuantity((q) => Math.min(99, q + 1));
                }}
                className="ekomart-quantity-btn"
                aria-label="Increase quantity"
              >
                <ChevronUp className="h-2.5 w-2.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuantity((q) => Math.max(1, q - 1));
                }}
                className="ekomart-quantity-btn"
                aria-label="Decrease quantity"
              >
                <ChevronDown className="h-2.5 w-2.5" />
              </button>
            </div>
          </div>

          {/* Curved Pill Add To Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={soldOut}
            className={cn(
              "flex-1 h-8 sm:h-9 rounded-full border border-[#FF9933] bg-[#FF9933] text-[#181206] hover:bg-[#E6B000] hover:shadow-sm px-2 sm:px-3 font-extrabold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95",
              justAdded && "bg-[#181206] text-[#FF9933] border-[#181206]",
              soldOut && "opacity-50 cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-400"
            )}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#FF9933]" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <span className="truncate font-black">{soldOut ? "Sold Out" : "Add"}</span>
                <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
              </>
            )}
          </button>
        </div>
      </div>

      {quickView ? (
        <Suspense fallback={null}>
          <QuickViewDialog product={product} open={quickView} onOpenChange={setQuickView} />
        </Suspense>
      ) : null}
    </article>
  );
}
