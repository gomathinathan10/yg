import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Copy,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import { ConfettiCanvas, AnimatedOrderSuccessBadge } from "@/components/site/OrderCelebration";

type OrderSearch = { order: string | undefined; total: number | undefined };

export const Route = createFileRoute("/order-confirmed")({
  validateSearch: (search: Record<string, unknown>): OrderSearch => ({
    order: typeof search["order"] === "string" ? search["order"] : undefined,
    total: typeof search["total"] === "number" ? search["total"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Y.G Asafoetida" },
      { name: "description", content: "Thank you for your Y.G Asafoetida order." },
      { property: "og:title", content: "Order Confirmed — Y.G Asafoetida" },
      { property: "og:description", content: "Your hing is on its way from Tirunelveli." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmedPage,
});

function OrderConfirmedPage() {
  const { order, total } = Route.useSearch();
  const [confettiTrigger, setConfettiTrigger] = useState(1);

  const orderId = order ?? "YG000000";

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    toast.success("Order ID copied to clipboard!");
  };

  return (
    <div className="relative overflow-hidden py-12 sm:py-20">
      {/* Full-Screen Confetti Celebration Cannon */}
      <ConfettiCanvas trigger={confettiTrigger} />

      <div className="container-page flex min-h-[65vh] flex-col items-center justify-center text-center">
        {/* Animated Checkmark with Pulsing Rings & Sparkles */}
        <AnimatedOrderSuccessBadge onReplay={() => setConfettiTrigger((t) => t + 1)} />

        {/* Celebration Eyebrow Badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Sparkles className="h-3.5 w-3.5 animate-spin" />
          <span>Order Placed Successfully!</span>
        </div>

        {/* Title */}
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-3 duration-700">
          Thank you — your hing is being prepared!
        </h1>

        <p className="mt-3 max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700">
          We&apos;ve emailed your confirmation receipt. Your authentic compounded hing will be freshly packed and dispatched from our Tirunelveli works within 24 hours.
        </p>

        {/* Order Details & Summary Card */}
        <div className="mt-8 w-full max-w-md rounded-2xl border border-border/80 bg-card p-5 sm:p-6 text-left shadow-lg transition-all animate-in fade-in zoom-in-95 duration-700">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Order Number
              </p>
              <p className="font-mono font-bold text-base text-foreground mt-0.5">{orderId}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyOrderId}
              className="h-8 text-xs font-semibold gap-1.5"
            >
              <Copy className="h-3.5 w-3.5" /> Copy ID
            </Button>
          </div>

          <div className="py-3 space-y-2.5 text-xs">
            {typeof total === "number" ? (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount paid</span>
                <span className="font-bold text-sm text-foreground">{formatPrice(total)}</span>
              </div>
            ) : null}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Estimated delivery</span>
              <span className="font-semibold text-foreground">2–6 working days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Dispatch origin</span>
              <span className="font-semibold text-foreground">Tirunelveli, Tamil Nadu</span>
            </div>
          </div>

          {/* 12 Months Freshness Guarantee Callout */}
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-950 dark:text-amber-100">
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold">12 Months Guaranteed Freshness:</span>{" "}
              <span className="opacity-90">All products in this order carry a full 12-month shelf life from packing.</span>
            </div>
          </div>
        </div>

        {/* Animated 4-Step Dispatch Progress Stepper */}
        <div className="mt-6 w-full max-w-md rounded-xl border border-border/60 bg-muted/20 p-4 text-left">
          <p className="text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-primary" /> Live Fulfillment Journey
          </p>
          <div className="grid grid-cols-4 gap-1 text-center">
            <div className="space-y-1">
              <div className="h-2 rounded-full bg-emerald-500 shadow-xs" />
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Confirmed</p>
            </div>
            <div className="space-y-1">
              <div className="h-2 rounded-full bg-amber-500 animate-pulse shadow-xs" />
              <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400">Packing</p>
            </div>
            <div className="space-y-1">
              <div className="h-2 rounded-full bg-muted shadow-xs" />
              <p className="text-[10px] text-muted-foreground">Dispatch</p>
            </div>
            <div className="space-y-1">
              <div className="h-2 rounded-full bg-muted shadow-xs" />
              <p className="text-[10px] text-muted-foreground">Delivery</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
          <Button asChild size="lg" className="font-bold gap-2 shadow-md">
            <Link to="/order/$id" params={{ id: orderId }}>
              <Package className="h-4 w-4" /> Track your order
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setConfettiTrigger((t) => t + 1)}
            className="font-semibold gap-1.5"
          >
            <Sparkles className="h-4 w-4 text-amber-500" /> Celebrate Again
          </Button>

          <Button asChild size="lg" variant="ghost">
            <Link to="/shop" className="gap-1.5">
              Continue shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
