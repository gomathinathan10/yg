import { Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { QuantityStepper } from "@/components/site/QuantityStepper";
import { formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { SmartImage } from "@/components/site/SmartImage";

export function CartDrawer() {
  const cart = useCart();
  const remaining = Math.max(cart.freeShippingThreshold - cart.subtotal, 0);

  return (
    <Sheet open={cart.isOpen} onOpenChange={cart.setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md bg-white border-l border-[#E8DEC8]">
        <SheetHeader className="border-b border-[#E8DEC8] px-5 py-4 bg-[#FAF3D6]">
          <SheetTitle className="text-lg font-bold text-[#181206] flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#181206]" />
            Your basket {cart.count > 0 ? `(${cart.count})` : ""}
          </SheetTitle>
        </SheetHeader>

        {cart.resolved.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="h-16 w-16 rounded-full bg-[#FAF3D6] border border-[#FFC700] flex items-center justify-center shadow-xs">
              <ShoppingBag className="h-8 w-8 text-[#181206]" />
            </div>
            <div>
              <h3 className="font-bold text-[#181206] text-base">Your basket is empty</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start with our 1931 classic hing powder and authentic South Indian spices.
              </p>
            </div>
            <Button asChild className="bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] border border-black/15 rounded-[6px] font-bold shadow-xs" onClick={() => cart.setOpen(false)}>
              <Link to="/shop">Shop all products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-[#E8DEC8] bg-[#FFC700]/15 px-5 py-3">
              {remaining > 0 ? (
                <p className="text-xs text-[#181206]">
                  Add <span className="font-bold text-[#DC2626]">{formatPrice(remaining)}</span>{" "}
                  more for <span className="font-black text-[#181206]">free shipping</span>
                </p>
              ) : (
                <p className="text-xs font-black text-[#181206] flex items-center gap-1.5">
                  ✓ You&apos;ve unlocked free shipping!
                </p>
              )}
              <Progress
                className="mt-2 h-2 bg-[#E2E2E2] [&>div]:bg-[#FFC700] border border-black/10"
                value={Math.min((cart.subtotal / cart.freeShippingThreshold) * 100, 100)}
              />
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 divide-y divide-[#F0F0F0]">
              {cart.resolved.map((line) => (
                <div key={`${line.slug}-${line.variantId}`} className="flex gap-3 pt-3 first:pt-0">
                  <SmartImage
                    src={line.product.image}
                    alt={line.product.name}
                    width={1000}
                    height={1000}
                    wrapperClassName="h-20 w-20 shrink-0 rounded-[6px] border border-[#E8DEC8] bg-[#FAF3D6]"
                    className="h-full w-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#181206] hover:underline transition-colors">{line.product.name}</p>
                    <p className="text-xs text-muted-foreground">{line.variant.label}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantityStepper
                        small
                        qty={line.qty}
                        onChange={(q) => cart.setQty(line.slug, line.variantId, q)}
                      />
                      <span className="text-sm font-bold text-[#DC2626]">{formatPrice(line.lineTotal)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => cart.remove(line.slug, line.variantId)}
                    className="self-start p-1.5 text-muted-foreground transition-colors hover:text-[#DC2626] rounded-[4px] hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-[#E8DEC8] bg-[#FAF3D6]/50 px-5 py-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">{formatPrice(cart.subtotal)}</span>
              </div>
              {cart.appliedPromo && cart.totalSavings > 0 && (
                <div className="space-y-1.5 rounded-[6px] border border-[#FFC700]/50 bg-[#FFC700]/20 px-3 py-2">
                  <div className="flex justify-between text-xs font-bold text-[#181206]">
                    <span>
                      Promo {cart.appliedPromo.code}
                      {cart.promoIsAutomatic ? " (auto)" : ""}
                    </span>
                    <span>−{formatPrice(cart.totalSavings)}</span>
                  </div>
                  {cart.discountLines.map((line) => (
                    <div
                      key={line.label}
                      className="flex justify-between text-xs text-muted-foreground"
                    >
                      <span>{line.label}</span>
                      <span>−{formatPrice(line.amount)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-foreground">
                  {cart.shipping === 0 ? <span className="text-[#181206] font-bold">Free</span> : formatPrice(cart.shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#E8DEC8] pt-3 text-base font-bold">
                <span className="text-[#181206]">Total</span>
                <span className="text-lg text-[#DC2626]">{formatPrice(cart.total)}</span>
              </div>
              <Button className="w-full bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] border border-black/15 rounded-[6px] font-black active:scale-[0.98] py-3 text-sm shadow-md" size="lg" asChild onClick={() => cart.setOpen(false)}>
                <Link to="/checkout" preload="render">Proceed to Checkout · {formatPrice(cart.total)}</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
