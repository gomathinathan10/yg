import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Gift, Loader2, Package, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { currentStatus, estimatedDelivery, resolutionEligibility, trackingSteps, useOrders, type Order } from "@/lib/orders";
import { OrderResolutionDialog, ResolutionBanner } from "@/components/site/OrderResolutionDialog";
import { SmartImage } from "@/components/site/SmartImage";
import { PolicyRules } from "@/components/site/PolicyRules";
import { SupportTicketDialog } from "@/components/site/SupportTicketDialog";

export const Route = createFileRoute("/order/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Track order ${params.id} — Y.G Asafoetida` },
      {
        name: "description",
        content: "Follow your Y.G Asafoetida hing order from our Tirunelveli works to your door.",
      },
      { property: "og:title", content: "Track your order — Y.G Asafoetida" },
      { property: "og:description", content: "Live status for your heritage hing delivery." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderTrackingPage,
});

function OrderTrackingPage() {
  const { id } = Route.useParams();
  const { getOrder, fetchOrder } = useOrders();
  const cart = useCart();
  const [loading, setLoading] = useState(true);
  const [fetchedOrder, setFetchedOrder] = useState<Order | null>(null);

  const localOrder = getOrder(id);
  const order = fetchedOrder ?? localOrder;

  useEffect(() => {
    let active = true;
    fetchOrder(id).then((res) => {
      if (active) {
        if (res) setFetchedOrder(res);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [id, fetchOrder]);

  if (loading && !order) {
    return (
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Finding order {id}…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center text-center">
        <Package className="h-12 w-12 text-muted-foreground" />
        <h1 className="mt-6 text-3xl font-semibold">Order not found</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          We couldn&apos;t find order {id}. Check the order number in your confirmation email, or track using your email.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild variant="outline">
            <Link to="/track">Track another order</Link>
          </Button>
          <Button asChild>
            <Link to="/account">Go to account</Link>
          </Button>
        </div>
      </div>
    );
  }

  const steps = trackingSteps(order);
  const status = currentStatus(order);
  const eta = estimatedDelivery(order);
  const eligibility = resolutionEligibility(order);

  return (
    <div className="min-h-screen bg-white font-sans pb-16">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8DEC8] bg-[#F5EAC4] py-3.5 no-print">
        <div className="container-page flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#6E777D]">
            <Link to="/" className="hover:text-[#181206] transition-colors font-medium">
              Home
            </Link>
            <span className="text-[#A0A8B0]">/</span>
            <Link to="/account" className="hover:text-[#181206] transition-colors font-medium">
              Account
            </Link>
            <span className="text-[#A0A8B0]">/</span>
            <span className="font-semibold text-[#181206]">Order #{order.id}</span>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="text-xs font-semibold text-[#181206] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Print Receipt
          </button>
        </div>
      </div>

      <div className="container-page pt-8 sm:pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DEC8]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#181206]">
              Official Receipt & Order Tracker
            </span>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#181206] tracking-tight">
              Order #{order.id}
            </h1>
            <p className="text-xs text-[#6E777D] mt-1">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3 no-print">
            <span className="rounded-[4px] bg-[#FFC700]/10 px-3 py-1 text-xs font-bold text-[#181206]">
              {status.label}
            </span>
            <Button
              onClick={() => window.print()}
              size="sm"
              className="rounded-[6px] bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] font-black font-bold text-xs shadow-xs cursor-pointer"
            >
              Print Invoice
            </Button>
          </div>
        </div>

        {order.resolution ? (
          <div className="mt-4">
            <ResolutionBanner order={order} />
          </div>
        ) : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Left Column: Tracking & Shipping Address */}
          <section className="rounded-[6px] border border-[#E8DEC8] bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-[#181206] pb-3 border-b border-[#E8DEC8]">
              Live Delivery Tracking
            </h2>

            <ol className="space-y-6">
              {steps.map((step) => (
                <li key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${
                        step.done
                          ? "border-[#FFC700] bg-[#FFC700] text-[#181206] font-black"
                          : "border-[#E8DEC8] text-[#A0A8B0]"
                      }`}
                    >
                      {step.done ? <Check className="h-3.5 w-3.5" /> : "·"}
                    </span>
                    <span className="mt-1 w-px flex-1 bg-[#E2E2E2] last:hidden" />
                  </div>
                  <div className="pb-2">
                    <p className={`text-xs font-bold ${step.done ? "text-[#181206]" : "text-[#6E777D]"}`}>
                      {step.label}
                    </p>
                    <p className="text-[11px] text-[#6E777D] mt-0.5">{step.description}</p>
                    {step.at && (
                      <p className="mt-1 text-[10px] font-mono text-[#6E777D]">
                        {new Date(step.at).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <Separator className="my-6 bg-[#E2E2E2]" />

            <div className="grid gap-4 text-xs sm:grid-cols-2">
              <div>
                <p className="font-bold text-[#181206] uppercase tracking-wider text-[11px]">
                  Delivering To
                </p>
                <p className="mt-1 font-semibold text-[#181206]">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-[#6E777D] mt-0.5">
                  {order.address.line1}, {order.address.city}, {order.address.state} {order.address.pin}
                </p>
                <p className="text-[#6E777D] mt-0.5 font-mono">{order.phone}</p>
              </div>
              <div>
                <p className="font-bold text-[#181206] uppercase tracking-wider text-[11px]">
                  Payment Method
                </p>
                <p className="mt-1 font-semibold text-[#181206] capitalize">{order.payment}</p>
                {order.gift && (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-[#181206]">
                    <Gift className="h-3 w-3" /> Gift Wrapped Package
                  </p>
                )}
                {order.notes && (
                  <p className="mt-1 text-[11px] text-[#6E777D]">Note: {order.notes}</p>
                )}
              </div>
            </div>

            <div className="no-print pt-4 border-t border-[#E8DEC8] flex flex-wrap gap-2">
              <OrderResolutionDialog order={order} mode="cancellation" size="sm" />
              <OrderResolutionDialog order={order} mode="refund" size="sm" />
              <SupportTicketDialog order={order} size="sm" />
            </div>
          </section>

          {/* Right Column: Order / Invoice Summary */}
          <aside className="rounded-[6px] border border-[#E8DEC8] bg-white p-6 shadow-xs h-fit space-y-4">
            <h2 className="text-base font-bold text-[#181206] pb-3 border-b border-[#E8DEC8]">
              Itemized Invoice Summary
            </h2>

            <ul className="space-y-3">
              {order.items.map((item) => (
                <li key={`${item.slug}-${item.variantId}`} className="flex items-center gap-3">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    wrapperClassName="h-12 w-12 shrink-0 rounded-[4px] border border-[#E8DEC8] bg-[#FAF3D6]"
                    className="h-full w-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-[#181206]">{item.name}</p>
                    <p className="text-[11px] text-[#6E777D]">
                      {item.variantLabel} × {item.qty}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#181206] font-mono">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <Separator className="my-4 bg-[#E2E2E2]" />

            <div className="space-y-2 text-xs text-[#6E777D]">
              <Row label="Subtotal" value={formatPrice(order.totals.subtotal)} />
              {order.totals.discount > 0 && (
                <Row
                  label={`Discount${order.promoCode ? ` (${order.promoCode})` : ""}`}
                  value={`−${formatPrice(order.totals.discount)}`}
                  accent
                />
              )}
              <Row
                label="Shipping"
                value={order.totals.shipping === 0 ? "Free" : formatPrice(order.totals.shipping)}
              />
              {order.totals.giftWrap > 0 && <Row label="Gift wrap" value={formatPrice(order.totals.giftWrap)} />}
              {order.totals.codFee > 0 && <Row label="COD handling" value={formatPrice(order.totals.codFee)} />}
            </div>

            <Separator className="my-4 bg-[#E2E2E2]" />

            <div className="flex justify-between items-baseline text-sm font-bold text-[#181206]">
              <span>Grand Total</span>
              <span className="text-lg font-bold text-[#DC2626] font-mono">
                {formatPrice(order.totals.total)}
              </span>
            </div>

            <Button
              className="mt-4 w-full h-10 rounded-[6px] bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] font-black font-bold text-xs shadow-xs cursor-pointer no-print"
              onClick={() => {
                order.items.forEach((i) => cart.add(i.slug, i.variantId, i.qty));
                toast.success("Items added back to your basket");
              }}
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reorder These Items
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`flex justify-between ${accent ? "text-[#181206] font-semibold" : ""}`}>
      <span>{label}</span>
      <span className="font-mono text-[#181206]">{value}</span>
    </div>
  );
}
