import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PackageSearch, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOrders } from "@/lib/orders";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track your order — Y.G Asafoetida" },
      {
        name: "description",
        content:
          "Enter your order number and email to follow your hing from our Tirunelveli works to your kitchen — no account needed.",
      },
      { property: "og:title", content: "Track your order — Y.G Asafoetida" },
      {
        property: "og:description",
        content: "Guest order lookup with live packing and dispatch status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  const { fetchOrder } = useOrders();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const idInvalid = id.trim().length < 4;
  const emailInvalid = !/^\S+@\S+\.\S+$/.test(email.trim());

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (idInvalid || emailInvalid) return;
    setChecking(true);
    
    try {
      const match = await fetchOrder(id.trim().toUpperCase(), email.trim());
      setChecking(false);
      if (!match) {
        setError(
          "We couldn't find an order with that ID and email combination. Check the order number in your confirmation email, or contact support.",
        );
        return;
      }
      void navigate({ to: "/order/$id", params: { id: match.id } });
    } catch {
      setChecking(false);
      setError("Lookup service temporarily unavailable. Please try again in a moment.");
    }
  };

  return (
    <div className="container-page py-8 sm:py-14 px-3 sm:px-6">
      {/* Ekomart Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-[#181206] transition-colors">Home</Link>
        <span>/</span>
        <span className="font-semibold text-foreground">Order Tracking</span>
      </nav>

      <div className="mx-auto max-w-lg">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[#FF9933]/10 border border-[#FF9933]/20">
            <PackageSearch className="h-6 w-6 text-[#181206]" aria-hidden />
          </span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#181206]">Live Status</span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181206]">
              Track Your Order
            </h1>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          No account needed. Enter the order number from your confirmation email and the address you used at checkout.
        </p>

        <form onSubmit={submit} className="rounded-[6px] border border-[#E8DEC8] bg-white mt-6 space-y-5 p-6 shadow-xs" noValidate>
          <div className="space-y-2">
            <Label htmlFor="track-id" className="font-bold text-[#181206]">Order Number</Label>
            <Input
              id="track-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={touched && idInvalid}
              placeholder="e.g. YG123456"
              autoComplete="off"
              className="rounded-[6px] border-[#E8DEC8]"
            />
            {touched && idInvalid ? (
              <p className="text-xs text-[#DC2626]">
                Order numbers look like YG123456 — check your confirmation email.
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="track-email" className="font-bold text-[#181206]">Email Used at Checkout</Label>
            <Input
              id="track-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={touched && emailInvalid}
              placeholder="e.g. name@example.com"
              autoComplete="email"
              className="rounded-[6px] border-[#E8DEC8]"
            />
            {touched && emailInvalid ? (
              <p className="text-xs text-[#DC2626]">Enter the email address you ordered with.</p>
            ) : null}
          </div>

          <Button type="submit" className="w-full bg-[#FF9933] hover:bg-[#E6B000] text-[#181206] font-black rounded-[6px] font-bold shadow-xs py-3" disabled={checking}>
            {checking ? "Checking dispatch status…" : "Track Order Status"}
          </Button>

          {error ? (
            <div
              role="alert"
              className="flex gap-3 rounded-[6px] border border-red-200 bg-red-50 p-4 text-xs text-[#DC2626]"
            >
              <SearchX className="mt-0.5 h-4 w-4 shrink-0 text-[#DC2626]" aria-hidden />
              <span>{error}</span>
            </div>
          ) : null}
        </form>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          Signed in on this device?{" "}
          <Link to="/account" className="font-bold text-[#181206] hover:underline">
            See all your orders
          </Link>
          . Still have a question?{" "}
          <Link to="/contact" className="font-bold text-[#181206] hover:underline">
            Contact support
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
