import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Package, RotateCcw, Trash2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { currentStatus, resolutionEligibility, useOrders } from "@/lib/orders";
import { OrderResolutionDialog, ResolutionBanner } from "@/components/site/OrderResolutionDialog";
import { SmartImage } from "@/components/site/SmartImage";
import { PolicyRules } from "@/components/site/PolicyRules";
import { SupportTicketDialog } from "@/components/site/SupportTicketDialog";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account — Y.G Asafoetida" },
      {
        name: "description",
        content: "View your Y.G Asafoetida orders, track deliveries, reorder hing and manage saved addresses.",
      },
      { property: "og:title", content: "Your Account — Y.G Asafoetida" },
      { property: "og:description", content: "Orders, tracking and saved addresses in one place." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { profile, signIn, signOut, orders, addresses, removeAddress, setDefaultAddress } = useOrders();
  const cart = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans pb-16">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8DEC8] bg-[#F5EAC4] py-3.5">
        <div className="container-page flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#6E777D]">
            <Link to="/" className="hover:text-[#181206] transition-colors font-medium">
              Home
            </Link>
            <span className="text-[#A0A8B0]">/</span>
            <span className="font-semibold text-[#181206]">Account</span>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-[#181206] bg-[#FF9933]/10 px-2.5 py-0.5 rounded-[4px]">
            Fast Guest Sync
          </span>
        </div>
      </div>

      <div className="container-page pt-8 sm:pt-12">
        <header className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#181206]">
            Customer Portal
          </span>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl text-[#181206] tracking-tight">
            Your Account
          </h1>
          <p className="mt-2 text-sm text-[#6E777D]">
            Orders, live tracking, and saved delivery addresses — preserved safely on this device.
          </p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-6">
            {/* Profile Section */}
            <section className="rounded-2xl border-2 border-[#FF9933] bg-gradient-to-b from-[#FFFDF2] to-[#FAF3D6] p-6 shadow-md ring-1 ring-[#FF9933]/30">
              <h2 className="flex items-center gap-2 text-base font-bold text-[#181206] pb-3 border-b border-[#E8DEC8]">
                <span className="p-1 rounded bg-[#FF9933] text-[#181206] border border-[#D8A700]">
                  <UserRound className="h-4 w-4" />
                </span>
                <span>Profile Details</span>
              </h2>
              {profile ? (
                <div className="mt-4 space-y-1.5 text-xs text-[#5A6560]">
                  <p className="font-bold text-[#181206] text-sm">{profile.name || "Guest Cook"}</p>
                  <p>{profile.email}</p>
                  <p>{profile.phone}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 rounded-[6px] border-[#D8A700] bg-white text-[#181206] text-xs hover:bg-[#FF9933] hover:border-[#D8A700] cursor-pointer"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <form
                  className="mt-4 space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    signIn({ name, email, phone });
                    toast.success("Profile saved successfully");
                  }}
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="acc-name" className="text-xs font-semibold text-[#181206]">
                      Full Name
                    </Label>
                    <Input
                      id="acc-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="min-h-10 text-xs rounded-[6px] border-[#E8DEC8]"
                      placeholder="Enter your name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="acc-email" className="text-xs font-semibold text-[#181206]">
                      Email Address
                    </Label>
                    <Input
                      id="acc-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="min-h-10 text-xs rounded-[6px] border-[#E8DEC8]"
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="acc-phone" className="text-xs font-semibold text-[#181206]">
                      Mobile Number
                    </Label>
                    <Input
                      id="acc-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="min-h-10 text-xs rounded-[6px] border-[#E8DEC8]"
                      placeholder="10-digit mobile number"
                      autoComplete="tel"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-10 rounded-[6px] bg-[#FF9933] hover:bg-[#181206] text-[#181206] hover:text-[#FF9933] border border-[#D8A700] hover:border-[#181206] font-black text-xs shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    Save Profile
                  </Button>
                </form>
              )}
            </section>

            {/* Saved Addresses Section */}
            <section className="rounded-2xl border-2 border-[#E8DEC8] hover:border-[#FF9933] bg-gradient-to-b from-[#FFFDF2] to-[#FAF3D6] p-6 shadow-xs transition-all">
              <h2 className="flex items-center gap-2 text-base font-bold text-[#181206] pb-3 border-b border-[#E8DEC8]">
                <span className="p-1 rounded bg-[#FF9933] text-[#181206] border border-[#D8A700]">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>Saved Addresses</span>
              </h2>
              {addresses.length === 0 ? (
                <p className="mt-3 text-xs text-[#6E777D]">
                  Addresses saved during checkout will be shown here.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {addresses.map((a) => (
                    <li
                      key={a.id}
                      className="rounded-[6px] border border-[#E8DEC8] p-3 text-xs bg-[#FAF3D6]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold text-[#181206]">
                            {a.firstName} {a.lastName}
                            {a.isDefault && (
                              <span className="ml-2 rounded-[4px] bg-[#FF9933]/10 px-2 py-0.5 text-[10px] font-bold text-[#181206] uppercase">
                                Default
                              </span>
                            )}
                          </p>
                          <p className="text-[#6E777D] mt-0.5">
                            {a.line1}, {a.city}, {a.state} {a.pin}
                          </p>
                          <p className="text-[#6E777D] mt-0.5 font-mono">{a.phone}</p>
                        </div>
                        <button
                          type="button"
                          aria-label="Remove address"
                          onClick={() => removeAddress(a.id)}
                          className="text-[#6E777D] hover:text-red-500 cursor-pointer p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {!a.isDefault && (
                        <button
                          type="button"
                          onClick={() => setDefaultAddress(a.id)}
                          className="mt-2 text-[11px] font-semibold text-[#181206] hover:underline cursor-pointer"
                        >
                          Set as Default
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Orders Section */}
          <section className="rounded-2xl border-2 border-[#E8DEC8] hover:border-[#FF9933] bg-gradient-to-b from-[#FFFDF2] to-[#FAF3D6] p-6 shadow-xs transition-all">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#181206] pb-3 border-b border-[#E8DEC8]">
              <span className="p-1 rounded bg-[#FF9933] text-[#181206] border border-[#D8A700]">
                <Package className="h-4 w-4" />
              </span>
              <span>Order History</span>
            </h2>
            {orders.length === 0 ? (
              <div className="mt-8 text-center py-8">
                <p className="text-xs text-[#6E777D]">No orders placed yet on this device.</p>
                <Button
                  asChild
                  className="mt-4 rounded-[6px] bg-[#FF9933] hover:bg-[#E6B000] text-[#181206] font-black font-bold text-xs shadow-xs"
                >
                  <Link to="/shop">Explore Heritage Spices</Link>
                </Button>
              </div>
            ) : (
              <ul className="mt-4 space-y-4">
                {orders.map((order) => {
                  const status = currentStatus(order);
                  const eligibility = resolutionEligibility(order);
                  return (
                    <li
                      key={order.id}
                      className="rounded-[6px] border border-[#E8DEC8] p-4 bg-white shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="font-bold text-[#181206] text-sm">Order #{order.id}</p>
                          <p className="text-[11px] text-[#6E777D]">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}{" "}
                            · {order.items.reduce((n, i) => n + i.qty, 0)} items
                          </p>
                        </div>
                        <span className="rounded-[4px] bg-[#FF9933]/10 px-2.5 py-1 text-xs font-bold text-[#181206]">
                          {status.label}
                        </span>
                      </div>
                      <Separator className="my-3 bg-[#E2E2E2]" />
                      <div className="flex flex-wrap items-center gap-3">
                        {order.items.slice(0, 4).map((item) => (
                          <SmartImage
                            key={`${item.slug}-${item.variantId}`}
                            src={item.image}
                            alt={item.name}
                            width={200}
                            height={200}
                            wrapperClassName="h-12 w-12 shrink-0 rounded-[4px] border border-[#E8DEC8] bg-[#FAF3D6]"
                            className="h-full w-full object-cover"
                          />
                        ))}
                        <span className="ml-auto text-sm font-bold text-[#DC2626] font-mono">
                          {formatPrice(order.totals.total)}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="rounded-[6px] border-[#E8DEC8] text-xs hover:border-[#FF9933] hover:text-[#181206]"
                        >
                          <Link to="/order/$id" params={{ id: order.id }}>
                            Track Order
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-[6px] text-xs text-[#181206] hover:text-[#181206]"
                          onClick={() => {
                            order.items.forEach((i) => cart.add(i.slug, i.variantId, i.qty));
                            toast.success("Items added back to your basket");
                          }}
                        >
                          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reorder
                        </Button>
                        <OrderResolutionDialog order={order} mode="cancellation" size="sm" />
                        <OrderResolutionDialog order={order} mode="refund" size="sm" />
                        <SupportTicketDialog order={order} size="sm" variant="ghost" label="Get Help" />
                      </div>
                      {order.resolution ? (
                        <div className="mt-3">
                          <ResolutionBanner order={order} />
                        </div>
                      ) : (
                        <details className="mt-2.5">
                          <summary className="cursor-pointer text-[11px] text-[#6E777D]">
                            {eligibility.reason} · see return policy
                          </summary>
                          <PolicyRules order={order} className="mt-2" />
                        </details>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
