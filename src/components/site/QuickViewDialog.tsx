import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Clock, Loader2, Star, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SmartImage } from "@/components/site/SmartImage";
import { WishlistButton } from "@/components/site/WishlistButton";
import { formatLabels, formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";

/** Variant picker + add to cart without leaving the grid. */
export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { add, setOpen: openCart } = useCart();
  const navigate = useNavigate();
  const [variantId, setVariantId] = useState(product.variants[0]!.id);
  const [buyingNow, setBuyingNow] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]!;
  const soldOut = product.inStock === false;

  const addToCart = () => {
    add(product.slug, variant.id);
    onOpenChange(false);
    toast.success(`${product.name} added`, {
      description: `${variant.label} · ${formatPrice(variant.price)}`,
      action: { label: "View basket", onClick: () => openCart(true) },
    });
  };

  const handleBuyNow = () => {
    setBuyingNow(true);
    add(product.slug, variant.id);
    onOpenChange(false);
    toast.success(`Proceeding to checkout with ${product.name}...`);
    void navigate({ to: "/checkout" }).finally(() => setBuyingNow(false));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader className="text-left">
          <DialogTitle className="font-display text-2xl">{product.name}</DialogTitle>
          <DialogDescription>{product.tagline}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)]">
          <SmartImage
            src={product.image}
            alt={product.name}
            sizes="180px"
            fallbackLabel={product.name}
            wrapperClassName="aspect-square w-full rounded-xl bg-white border border-border/80 p-2 flex items-center justify-center"
            className="h-full w-full object-contain"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span className="font-medium text-foreground">{product.rating}</span>
              <span>({product.reviews})</span>
              <span aria-hidden>·</span>
              <span>{formatLabels[product.format]}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                <Clock className="h-3 w-3" /> 12 Months Life
              </span>
            </div>

            <p className="mt-3 line-clamp-4 text-sm text-muted-foreground">{product.description}</p>

            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose a pack size">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  aria-pressed={v.id === variantId}
                  className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
                    v.id === variantId
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-end gap-2">
              <span className="text-2xl font-semibold">{formatPrice(variant.price)}</span>
              {variant.mrp ? (
                <span className="pb-1 text-sm text-muted-foreground line-through">
                  {formatPrice(variant.mrp)}
                </span>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button onClick={handleBuyNow} disabled={soldOut || buyingNow} className="flex-1 sm:flex-none gap-1.5 font-bold active:scale-95">
                {buyingNow ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4 fill-current" />
                )}
                Buy Now
              </Button>
              <Button onClick={addToCart} variant="outline" disabled={soldOut} className="flex-1 sm:flex-none active:scale-95">
                {soldOut ? "Sold out" : "Add to basket"}
              </Button>
              <WishlistButton slug={product.slug} name={product.name} variant="full" />
              <Button variant="ghost" asChild>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  onClick={() => onOpenChange(false)}
                >
                  Full details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
