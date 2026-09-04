import { Suspense, lazy, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Eye, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { SmartImage } from "@/components/site/SmartImage";
import { WishlistButton } from "@/components/site/WishlistButton";

// Loaded only when a shopper opens quick view, so grids stay light.
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
  const [quickView, setQuickView] = useState(false);
  const variant = product.variants[0]!;
  const soldOut = product.inStock === false;

  // --- 1. COMPACT SMALL CARD VIEW ---
  if (mode === "compact") {
    return (
      <article className="group surface-card relative flex h-full flex-col overflow-hidden rounded-xl border border-border/80 transition-all duration-300 hover:shadow-md hover:border-primary/40 bg-card">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          preload="intent"
          className="relative block overflow-hidden bg-white aspect-square w-full p-2.5 flex items-center justify-center"
        >
          <SmartImage
            priority={priority ?? false}
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 48vw"
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            fallbackLabel={product.name}
            wrapperClassName="h-full w-full flex items-center justify-center"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {/* Mini Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.bestseller ? (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold tracking-wider text-primary-foreground uppercase shadow-xs">
                Best
              </span>
            ) : null}
            {product.glutenFree ? (
              <span className="rounded-full bg-card/95 backdrop-blur px-2 py-0.5 text-[9px] font-bold tracking-wider text-foreground uppercase border border-border/50 shadow-xs">
                GF
              </span>
            ) : null}
            {soldOut ? (
              <span className="rounded-full bg-muted/90 px-2 py-0.5 text-[9px] font-bold tracking-wider text-muted-foreground uppercase shadow-xs">
                Sold out
              </span>
            ) : null}
          </div>
        </Link>

        {/* Floating Wishlist & Quick View Stack */}
        <div className="pointer-events-none absolute top-2 right-2 flex flex-col items-center gap-1.5 z-10">
          <WishlistButton
            slug={product.slug}
            name={product.name}
            className="pointer-events-auto h-7.5 w-7.5 shadow-xs border-border/80 bg-white/95 text-muted-foreground hover:text-foreground transition-all hover:scale-105 active:scale-95"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickView(true);
            }}
            aria-label={`Quick view ${product.name}`}
            className="pointer-events-auto grid h-7.5 w-7.5 place-items-center rounded-full border border-border/80 bg-white/95 backdrop-blur text-muted-foreground hover:text-foreground transition-all hover:scale-105 active:scale-95 shadow-xs"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>

        {/* Compact Details */}
        <div className="flex flex-1 flex-col p-3">
          <div className="flex items-center justify-between gap-1 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span className="font-semibold text-foreground">{product.rating}</span>
            </div>
            <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded">
              12M Life
            </span>
          </div>

          <h3 className="mt-1 text-xs sm:text-sm font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            <Link to="/product/$slug" params={{ slug: product.slug }} preload="intent">
              {product.name}
            </Link>
          </h3>

          <p className="mt-0.5 text-[10px] sm:text-[11px] text-muted-foreground line-clamp-1">
            {product.tagline}
          </p>

          <div className="mt-2.5 flex items-baseline justify-between border-t border-border/50 pt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-foreground">
                {formatPrice(variant.price)}
              </span>
              {variant.mrp ? (
                <span className="text-[10px] sm:text-[11px] text-muted-foreground line-through">
                  {formatPrice(variant.mrp)}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">
              {variant.label}
            </span>
          </div>

          <div className="mt-2.5 pt-1">
            <Button
              size="sm"
              className="h-7 sm:h-8 w-full text-xs font-semibold gap-1.5 shadow-xs"
              disabled={soldOut}
              onClick={() => add(product.slug, variant.id)}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {soldOut ? "Sold out" : "Add to Cart"}
            </Button>
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

  // --- 2. COMPACT HORIZONTAL LIST VIEW ---
  if (mode === "list") {
    return (
      <article className="group surface-card relative flex flex-col sm:flex-row items-center gap-4 p-3.5 sm:p-4 rounded-xl border border-border/80 transition-all duration-300 hover:shadow-md hover:border-primary/40 bg-card">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          preload="intent"
          className="relative block overflow-hidden rounded-lg bg-white h-28 w-28 sm:h-36 sm:w-36 shrink-0 p-2 flex items-center justify-center"
        >
          <SmartImage
            priority={priority ?? false}
            sizes="150px"
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            fallbackLabel={product.name}
            wrapperClassName="h-full w-full flex items-center justify-center"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {product.bestseller ? (
            <span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-primary-foreground uppercase shadow-xs">
              Bestseller
            </span>
          ) : null}
        </Link>

        <div className="flex flex-1 flex-col justify-between w-full min-w-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-1">
              <span className="capitalize font-medium text-foreground px-1.5 py-0.5 bg-muted rounded text-[10px]">
                {product.format}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-gold text-gold" />
                <span className="font-semibold text-foreground">{product.rating}</span>
                <span>({product.reviews} reviews)</span>
              </div>
              <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="h-3 w-3" /> 12 Months Shelf Life
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold leading-tight group-hover:text-primary transition-colors">
              <Link to="/product/$slug" params={{ slug: product.slug }} preload="intent">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-foreground">
                {formatPrice(variant.price)}
              </span>
              {variant.mrp ? (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(variant.mrp)}
                </span>
              ) : null}
              <span className="text-[11px] text-muted-foreground">({variant.label})</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-semibold px-3"
                onClick={() => setQuickView(true)}
              >
                Quick View
              </Button>
              <Button
                size="sm"
                className="h-8 text-xs font-semibold px-4"
                disabled={soldOut}
                onClick={() => add(product.slug, variant.id)}
              >
                {soldOut ? "Sold out" : "Add to cart"}
              </Button>
            </div>
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

  // --- 3. COMFORTABLE STANDARD GRID VIEW ---
  return (
    <article className="group surface-card relative flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift rounded-xl border border-border/80 bg-card">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        preload="intent"
        className="relative block overflow-hidden bg-white aspect-square w-full p-3.5 flex items-center justify-center"
      >
        <SmartImage
          priority={priority ?? false}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          src={product.image}
          alt={product.name}
          width={1000}
          height={1000}
          fallbackLabel={product.name}
          wrapperClassName="h-full w-full flex items-center justify-center"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.bestseller ? (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-primary-foreground uppercase shadow-xs">
              Bestseller
            </span>
          ) : null}
          {product.glutenFree ? (
            <span className="rounded-full bg-card/95 backdrop-blur px-2 py-0.5 text-[10px] font-bold tracking-wide text-foreground uppercase border border-border/50 shadow-xs">
              Gluten-free
            </span>
          ) : null}
          {soldOut ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold tracking-wide text-muted-foreground uppercase shadow-xs">
              Sold out
            </span>
          ) : null}
        </div>
      </Link>

      {/* Floating Wishlist & Quick View Stack */}
      <div className="pointer-events-none absolute top-3 right-3 flex flex-col items-center gap-1.5 z-10">
        <WishlistButton
          slug={product.slug}
          name={product.name}
          className="pointer-events-auto h-8.5 w-8.5 shadow-xs border-border/80 bg-white/95 text-muted-foreground hover:text-foreground transition-all hover:scale-105 active:scale-95"
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setQuickView(true);
          }}
          aria-label={`Quick view ${product.name}`}
          className="pointer-events-auto grid h-8.5 w-8.5 place-items-center rounded-full border border-border/80 bg-white/95 backdrop-blur text-muted-foreground hover:text-foreground transition-all hover:scale-105 active:scale-95 shadow-xs"
        >
          <Eye className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="font-semibold text-foreground">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
          <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="h-3 w-3" /> 12M Life
          </span>
        </div>
        <h3 className="mt-1.5 text-base font-bold leading-snug">
          <Link to="/product/$slug" params={{ slug: product.slug }} preload="intent">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{product.tagline}</p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">{formatPrice(variant.price)}</span>
          {variant.mrp ? (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(variant.mrp)}
            </span>
          ) : null}
          <span className="text-[11px] text-muted-foreground">/ {variant.label}</span>
        </div>

        {product.stockLeft && !soldOut ? (
          <p className="mt-1.5 text-xs font-medium text-primary">
            Only {product.stockLeft} left from this batch
          </p>
        ) : null}

        <div className="mt-3.5 flex gap-2">
          <Button
            size="sm"
            className="flex-1 font-semibold text-xs h-8.5"
            disabled={soldOut}
            onClick={() => add(product.slug, variant.id)}
            aria-label={`Add ${product.name} to cart`}
          >
            {soldOut ? "Sold out" : "Add to cart"}
          </Button>
          <Button size="sm" variant="outline" className="text-xs h-8.5 px-3" asChild>
            <Link to="/product/$slug" params={{ slug: product.slug }}>
              Details
            </Link>
          </Button>
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
