import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ShoppingBag, ChevronUp } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";
import { SmartImage } from "@/components/site/SmartImage";

/** Sticky mobile mini-cart: shows what's in the basket and opens the full drawer. */
export function MobileCartBar() {
  const cart = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Pages with their own sticky bar or dedicated summary don't need this.
  const hiddenRoute =
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/order");

  const visible = cart.resolved.length > 0 && !hiddenRoute;

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      if (visible && window.innerWidth < 1024) {
        root.style.setProperty("--fab-offset", "4.75rem");
      } else {
        root.style.removeProperty("--fab-offset");
      }
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      root.style.removeProperty("--fab-offset");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <button
        type="button"
        onClick={() => cart.setOpen(true)}
        aria-label={`Open basket, ${cart.count} item${cart.count === 1 ? "" : "s"}, total ${formatPrice(cart.total)}`}
        className="flex w-full items-center gap-3 rounded-xl bg-primary px-3.5 py-2.5 text-primary-foreground font-bold border border-black/15 shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-98 transition-all"
      >
        <div className="flex -space-x-2">
          {cart.resolved.slice(0, 3).map((line) => (
            <SmartImage
              key={`${line.slug}-${line.variantId}`}
              src={line.product.image}
              alt={line.product.name}
              width={200}
              height={200}
              wrapperClassName="h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-primary-foreground/70"
              className="h-full w-full object-cover"
            />
          ))}
          {cart.resolved.length > 3 && (
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary-foreground/70 bg-primary text-[11px] font-semibold">
              +{cart.resolved.length - 3}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="text-sm font-semibold">
            {cart.count} item{cart.count === 1 ? "" : "s"} · {formatPrice(cart.total)}
          </p>
          <p className="text-[11px] opacity-80">Tap to view full basket</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold">
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          View
          <ChevronUp className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}
