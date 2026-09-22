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
    <article className="single-shopping-card-one product-card-interactive group bg-[#FAF3D6] border border-[#E8DEC8] rounded-[10px] sm:rounded-[12px] p-2.5 sm:p-4 transition-all duration-300 hover:border-[#FF9933] hover:shadow-[0_14px_32px_rgba(255, 153, 51,0.32)] flex flex-col justify-between relative h-full">
      {/* 1. Image and Action Area Wrapper */}
      <div className="relative w-full overflow-hidden rounded-[8px] bg-white aspect-square flex items-center justify-center p-1.5 sm:p-2 border border-[#E8DEC8]/60 transition-all duration-300 group-hover:border-[#FF9933]/70 group-hover:shadow-xs">
        {/* Top-Left Bookmark Ribbon Tag */}
        <div className="ekomart-ribbon-badge pointer-events-none transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2">
          <span>
            {discountPercent}%<br />
            Off
          </span>
        </div>

        {/* Product Photo */}
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          preload="intent"
          className="h-full w-full flex items-center justify-center"
        >
          <SmartImage
            priority={priority ?? false}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            fallbackLabel={product.name}
            wrapperClassName="h-full w-full flex items-center justify-center"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Action Pill Bar */}
        <div className="ekomart-action-pill opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
          <button
            type="button"
            onClick={toggleWishlist}
            aria-label="Add to wishlist"
            className={cn(
              "ekomart-action-btn",
              isFavorite && "bg-[#181206] text-[#FF9933] border-[#181206]"
            )}
            title="Add to Wishlist"
          >
            <Heart className={cn("h-3.5 w-3.5", isFavorite && "fill-[#FF9933] text-[#FF9933]")} />
          </button>

          <button
            type="button"
            onClick={handleCompare}
            aria-label="Compare"
            className="ekomart-action-btn"
            title="Compare"
          >
            <Repeat className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickView(true);
            }}
            aria-label="Quick View"
            className="ekomart-action-btn"
            title="Quick View"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Body Content */}
      <div className="flex flex-1 flex-col pt-2 sm:pt-3">
        {/* Title */}
        <h3 className="text-xs sm:text-base font-bold leading-snug text-[#181206] group-hover:underline transition-colors line-clamp-2 min-h-[2.5em] sm:min-h-[auto]">
          <Link to="/product/$slug" params={{ slug: product.slug }} preload="intent">
            {product.name}
          </Link>
        </h3>

        {/* Availability / Pack Size */}
        <p className="text-[11px] sm:text-xs text-[#5A6560] mt-0.5 mb-1 font-semibold">
          {variant.label} Pack
        </p>

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

        {/* 3. Bottom Action Row: Quantity Stepper + Add To Cart Button */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 mt-2.5 pt-1.5 border-t border-[#F0F0F0]">
          {/* Quantity Stepper */}
          <div className="ekomart-quantity-box shrink-0">
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

          {/* Add To Cart Button with Neon Gold Styling */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={soldOut}
            className={cn(
              "flex-1 h-8 sm:h-8.5 rounded-[6px] border border-[#FF9933] bg-[#FF9933] text-[#181206] hover:bg-[#E6B000] px-2 sm:px-3 font-extrabold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95",
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
                <span className="truncate">{soldOut ? "Sold Out" : "Add"}</span>
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
