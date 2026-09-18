import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";

const pinCache = new Map<string, PincodeLookup>();
import {
  Check,
  ChevronLeft,
  Gift,
  Loader2,
  Lock,
  MapPin,
  Pencil,
  Truck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/data/products";
import { useLiveMetrics } from "@/data/metrics";
import { useCart } from "@/lib/cart";
import { useOrders, type Address } from "@/lib/orders";
import { lookupPincode, type PincodeLookup } from "@/lib/pincode.functions";
import { SmartImage } from "@/components/site/SmartImage";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Y.G Asafoetida" },
      {
        name: "description",
        content: "Complete your Y.G Asafoetida order with secure shipping details and payment.",
      },
      { property: "og:title", content: "Checkout — Y.G Asafoetida" },
      { property: "og:description", content: "Complete your hing order from Tirunelveli." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const GIFT_FEE = 49;

const steps = ["Details", "Delivery", "Payment"] as const;

type Form = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  line1: string;
  city: string;
  state: string;
  pin: string;
};

const emptyForm: Form = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  line1: "",
  city: "",
  state: "",
  pin: "",
};

function CheckoutPage() {
  const cart = useCart();
  const metrics = useLiveMetrics();
  const navigate = useNavigate();
  const { profile, addresses, orders, saveAddress, placeOrder, signIn } = useOrders();

  const [step, setStep] = useState(0);
  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [form, setForm] = useState<Form>(emptyForm);
  const [selectedAddress, setSelectedAddress] = useState<string>("new");
  const [saveForNext, setSaveForNext] = useState(true);
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [gift, setGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("paytm");
  const [placing, setPlacing] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const blur = (key: string) => () => setTouched((t) => ({ ...t, [key]: true }));

  const runLookup = lookupPincode;
  const [pinState, setPinState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [pinInfo, setPinInfo] = useState<PincodeLookup | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fieldsRef = useRef<HTMLDivElement | null>(null);
  const lastPin = useRef<string>("");

  const router = useRouter();
  useEffect(() => {
    void router.preloadRoute({ to: "/order-confirmed", search: { order: undefined, total: undefined } });
  }, [router]);

  const [prefilled, setPrefilled] = useState(false);
  useEffect(() => {
    if (!prefilled && (profile || addresses.length)) {
      const def = addresses.find((a) => a.isDefault) ?? addresses[0];
      setForm((f) => ({
        ...f,
        email: profile?.email ?? f.email,
        phone: def?.phone ?? profile?.phone ?? f.phone,
        firstName: def?.firstName ?? f.firstName,
        lastName: def?.lastName ?? f.lastName,
        line1: def?.line1 ?? f.line1,
        city: def?.city ?? f.city,
        state: def?.state ?? f.state,
        pin: def?.pin ?? f.pin,
      }));
      if (def) setSelectedAddress(def.id);
      setPrefilled(true);
    }
  }, [profile, addresses, prefilled]);

  const set = (key: keyof Form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const pickAddress = (a: Address) => {
    setSelectedAddress(a.id);
    setEditingId(null);
    setForm((f) => ({
      ...f,
      firstName: a.firstName,
      lastName: a.lastName,
      line1: a.line1,
      city: a.city,
      state: a.state,
      pin: a.pin,
      phone: a.phone,
    }));
  };

  const editAddress = (a: Address) => {
    pickAddress(a);
    setEditingId(a.id);
    requestAnimationFrame(() => fieldsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  // PIN code → city/state/area auto-fill (India Post lookup, debounced + instant cache).
  useEffect(() => {
    const pin = form.pin.trim();
    if (!/^\d{6}$/.test(pin)) {
      setPinState("idle");
      setPinInfo(null);
      lastPin.current = "";
      return;
    }
    if (lastPin.current === pin) return;

    if (pinCache.has(pin)) {
      const cached = pinCache.get(pin)!;
      lastPin.current = pin;
      setPinInfo(cached);
      setPinState(cached.ok ? "ok" : "error");
      if (cached.ok) {
        setForm((f) => (f.pin === pin ? { ...f, city: cached.city || f.city, state: cached.state || f.state } : f));
      }
      return;
    }

    let cancelled = false;
    setPinState("loading");
    const t = setTimeout(() => {
      runLookup({ data: { pin } })
        .then((res) => {
          if (cancelled) return;
          lastPin.current = pin;
          pinCache.set(pin, res);
          setPinInfo(res);
          setPinState(res.ok ? "ok" : "error");
          if (res.ok) {
            setForm((f) => (f.pin === pin ? { ...f, city: res.city || f.city, state: res.state || f.state } : f));
          }
        })
        .catch(() => {
          if (!cancelled) setPinState("error");
        });
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [form.pin, runLookup]);

  const applyArea = (area: string) => {
    setForm((f) => {
      const has = f.line1.toLowerCase().includes(area.toLowerCase());
      const base = f.line1.trim().replace(/,\s*$/, "");
      return { ...f, line1: has ? f.line1 : base ? `${base}, ${area}` : area };
    });
  };

  const expressFeeAmount = metrics.expressDeliveryFee || 120;
  const codFeeAmount = metrics.codHandlingFee || 40;

  const payments = [
    { id: "paytm", label: "Paytm", hint: "UPI, wallet & cards via Paytm gateway" },
    { id: "upi", label: "UPI", hint: "GPay, PhonePe, BHIM" },
    { id: "card", label: "Card", hint: "Credit or debit card" },
    { id: "netbanking", label: "Net banking", hint: "All major Indian banks" },
    { id: "cod", label: "Cash on delivery", hint: `₹${codFeeAmount} handling fee` },
  ];

  const expressFee = delivery === "express" ? expressFeeAmount : 0;
  const giftFee = gift ? GIFT_FEE : 0;
  const codFee = payment === "cod" ? codFeeAmount : 0;
  const grandTotal = cart.total + expressFee + giftFee + codFee;

  const fieldErrors = useMemo(() => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
    const digits = form.phone.replace(/\D/g, "");
    if (!digits) e.phone = "Phone number is required";
    else if (digits.length < 10) e.phone = "Enter a 10-digit mobile number";
    if (form.firstName.trim().length < 2) e.firstName = "Enter your first name";
    if (form.line1.trim().length < 5) e.line1 = "Add house no., street and area";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    if (!/^\d{6}$/.test(form.pin)) e.pin = "Enter a 6-digit PIN code";
    return e;
  }, [form]);

  const errorFor = (key: keyof Form) => (touched[key] ? fieldErrors[key] : undefined);

  const detailsValid = useMemo(
    () =>
      /\S+@\S+\.\S+/.test(form.email) &&
      form.phone.replace(/\D/g, "").length >= 10 &&
      form.firstName.trim().length > 1 &&
      form.line1.trim().length > 4 &&
      form.city.trim().length > 1 &&
      form.state.trim().length > 1 &&
      /^\d{6}$/.test(form.pin),
    [form],
  );

  const lastOrder = orders[0];

  const useLastOrderDetails = () => {
    if (!lastOrder) return;
    const a = lastOrder.address;
    setSelectedAddress(a.id);
    setEditingId(null);
    setForm({
      email: lastOrder.email,
      phone: lastOrder.phone || a.phone,
      firstName: a.firstName,
      lastName: a.lastName,
      line1: a.line1,
      city: a.city,
      state: a.state,
      pin: a.pin,
    });
    setTouched({});
    toast.success("Details filled from your last order");
  };

  if (cart.resolved.length === 0) {
    return (
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center text-center py-16">
        <div className="h-16 w-16 rounded-full bg-[#FAF3D6] border border-[#E8DEC8] flex items-center justify-center">
          <Truck className="h-8 w-8 text-[#181206]" />
        </div>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-[#181206]">Your basket is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add some authentic compounded hing before checking out.</p>
        <Button className="mt-6 bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] font-black rounded-[6px] font-bold" asChild>
          <Link to="/shop">Shop all products</Link>
        </Button>
      </div>
    );
  }

  const submit = async () => {
    if (!detailsValid) {
      toast.error("Some delivery details are missing.");
      setStep(0);
      return;
    }
    setPlacing(true);
    try {
      const address: Address = {
        id: selectedAddress !== "new" ? selectedAddress : `addr_${Math.random().toString(36).slice(2, 9)}`,
        label: `${form.city} address`,
        firstName: form.firstName,
        lastName: form.lastName,
        line1: form.line1,
        city: form.city,
        state: form.state,
        pin: form.pin,
        phone: form.phone,
        isDefault: addresses.length === 0,
      };
      if (saveForNext) saveAddress(address);
      if (!profile)
        signIn({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
        });

      const order = await placeOrder({
        email: form.email,
        phone: form.phone,
        items: cart.resolved.map((l) => ({
          slug: l.slug,
          variantId: l.variantId,
          name: l.product.name,
          variantLabel: l.variant.label,
          image: l.product.image,
          qty: l.qty,
          price: l.variant.price,
        })),
        totals: {
          subtotal: cart.subtotal,
          discount: cart.discount,
          shipping: cart.shipping + expressFee,
          giftWrap: giftFee,
          codFee,
          total: grandTotal,
        },
        promoCode: cart.appliedPromo?.code ?? null,
        address,
        payment,
        delivery,
        notes,
        gift,
        giftMessage,
      });

      cart.clear();
      toast.success(`Order ${order.id} placed`);
      navigate({ to: "/order-confirmed", search: { order: order.id, total: order.totals.total } });
    } catch (err) {
      console.error(err);
      setPlacing(false);
      toast.error("We couldn't place your order. Please try again.");
    }
  };

  return (
    <div className="container-page py-8 sm:py-14 px-3 sm:px-6">
      {/* Ekomart Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-[#181206] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#181206] transition-colors">Shop</Link>
        <span>/</span>
        <span className="font-semibold text-foreground">Checkout</span>
      </nav>

      <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#181206] sm:text-3xl">Secure Checkout</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Complete your hing order with verified delivery and payment</p>
        </div>
        <Link to="/shop" className="inline-flex items-center gap-1 text-xs font-bold text-[#181206] hover:underline">
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden /> Return to shop
        </Link>
      </div>

      <ol className="mt-6 flex items-center gap-2 text-sm" aria-label="Checkout progress">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2" aria-current={i === step ? "step" : undefined}>
            <button
              type="button"
              disabled={i >= step}
              aria-label={`Step ${i + 1} of ${steps.length}: ${label}${i < step ? " — completed, go back" : i === step ? " — current step" : ""}`}
              onClick={() => i < step && goToStep(i)}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                i < step
                  ? "border-[#FFC700] bg-[#FFC700] text-[#181206] font-black"
                  : i === step
                    ? "border-[#FFC700] text-[#181206] bg-[#FFC700]/10"
                    : "border-[#E8DEC8] text-muted-foreground bg-white"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
            </button>
            <span className={i === step ? "font-bold text-[#181206]" : "text-muted-foreground"}>{label}</span>
            {i < steps.length - 1 && <span className="hidden h-px flex-1 bg-[#E2E2E2] sm:block" />}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-8">
          {step === 0 && (
            <section className="rounded-[6px] border border-[#E8DEC8] bg-white p-6 sm:p-8 shadow-xs animate-in fade-in-50 slide-in-from-right-3 duration-250">
              <h2 className="text-lg font-bold text-[#181206]">Contact &amp; delivery address</h2>

              {lastOrder && (
                <button
                  type="button"
                  onClick={useLastOrderDetails}
                  className="mt-4 flex w-full items-center gap-3 rounded-[6px] border border-[#FFC700]/40 bg-[#FFC700]/5 px-4 py-3 text-left transition-colors hover:bg-[#FFC700]/10 cursor-pointer"
                >
                  <Zap className="h-5 w-5 shrink-0 text-[#181206]" aria-hidden />
                  <span className="text-sm">
                    <span className="block font-bold text-[#181206]">Express fill — use my last order&rsquo;s details</span>
                    <span className="block text-xs text-muted-foreground">
                      {lastOrder.address.firstName} · {lastOrder.address.city} {lastOrder.address.pin} ·{" "}
                      {lastOrder.email}
                    </span>
                  </span>
                </button>
              )}

              {addresses.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Saved addresses</p>
                  {addresses.map((a) => (
                    <div
                      key={a.id}
                      className={`flex items-center gap-2 rounded-[6px] border px-4 py-3 text-sm transition-colors ${
                        selectedAddress === a.id ? "border-[#FFC700] bg-[#FFC700]/5" : "border-[#E8DEC8]"
                      }`}
                    >
                      <button type="button" onClick={() => pickAddress(a)} aria-pressed={selectedAddress === a.id} aria-label={`Deliver to ${a.firstName} ${a.lastName}, ${a.line1}, ${a.city} ${a.pin}`} className="flex-1 rounded-md text-left cursor-pointer">
                        <span className="font-bold text-[#181206]">
                          {a.firstName} {a.lastName}
                          {editingId === a.id && <span className="ml-2 text-xs text-[#181206]">editing</span>}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {a.line1}, {a.city}, {a.state} {a.pin} · {a.phone}
                        </span>
                      </button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        aria-label={`Edit address of ${a.firstName}`}
                        onClick={() => editAddress(a)}
                      >
                        <Pencil className="h-4 w-4" aria-hidden />
                        <span className="sr-only sm:not-sr-only sm:ml-1">Edit</span>
                      </Button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAddress("new");
                      setForm((f) => ({ ...f, firstName: "", lastName: "", line1: "", city: "", state: "", pin: "" }));
                    }}
                    aria-pressed={selectedAddress === "new"}
                    className={`block min-h-11 w-full rounded-[6px] border px-4 py-3 text-left text-sm font-semibold transition-colors cursor-pointer ${
                      selectedAddress === "new" ? "border-[#FFC700] bg-[#FFC700]/5 text-[#181206]" : "border-[#E8DEC8] text-foreground"
                    }`}
                  >
                    + Use a new address
                  </button>
                </div>
              )}

              <div ref={fieldsRef} className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input id="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} onBlur={blur("email")} aria-invalid={Boolean(errorFor("email"))} aria-describedby={errorFor("email") ? "email-error" : undefined} className="min-h-11" placeholder="Enter your email address" />
                  {errorFor("email") && <p id="email-error" role="alert" className="text-xs text-destructive">{errorFor("email")}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone <span className="text-destructive">*</span></Label>
                  <Input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} onBlur={blur("phone")} aria-invalid={Boolean(errorFor("phone"))} aria-describedby={errorFor("phone") ? "phone-error" : undefined} className="min-h-11" placeholder="Enter your 10-digit mobile number" />
                  {errorFor("phone") && <p id="phone-error" role="alert" className="text-xs text-destructive">{errorFor("phone")}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first">First name <span className="text-destructive">*</span></Label>
                  <Input id="first" aria-describedby={errorFor("firstName") ? "first-error" : undefined} autoComplete="given-name" value={form.firstName} onChange={set("firstName")} onBlur={blur("firstName")} aria-invalid={Boolean(errorFor("firstName"))} className="min-h-11" placeholder="Enter your first name" />
                  {errorFor("firstName") && <p id="first-error" role="alert" className="text-xs text-destructive">{errorFor("firstName")}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last">Last name</Label>
                  <Input id="last" autoComplete="family-name" value={form.lastName} onChange={set("lastName")} className="min-h-11" placeholder="Enter your last name" />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="pin">PIN code <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Input
                      id="pin"
                      autoComplete="postal-code"
                      value={form.pin}
                      onChange={(e) => setForm((f) => ({ ...f, pin: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
                      onBlur={blur("pin")}
                      aria-invalid={Boolean(errorFor("pin"))}
                      inputMode="numeric"
                      maxLength={6}
                      className="min-h-11 pr-10"
                      placeholder="Enter your 6-digit PIN code"
                    />
                    {pinState === "loading" && (
                      <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" aria-hidden />
                    )}
                    {pinState === "ok" && (
                      <Check className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden />
                    )}
                  </div>
                  <div className="sr-only" role="status" aria-live="polite">
                    {pinState === "loading"
                      ? "Looking up your PIN code"
                      : pinState === "ok" && pinInfo
                        ? `PIN matched ${pinInfo.district}, ${pinInfo.state}. City and state auto-filled.`
                        : pinState === "error"
                          ? "We couldn't look up that PIN code."
                          : ""}
                  </div>
                  {pinState === "ok" && pinInfo && (
                    <div className="space-y-2">
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                        {pinInfo.district}, {pinInfo.state} — auto-filled
                      </p>
                      {pinInfo.areas.length > 0 && (
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Pick your area to fill the address">
                          {pinInfo.areas.slice(0, 8).map((area) => (
                            <button
                              key={area}
                              type="button"
                              onClick={() => applyArea(area)}
                              aria-label={`Use area ${area}`}
                              className="min-h-11 rounded-full border border-border px-3 text-xs transition-colors hover:border-primary hover:bg-primary/5"
                            >
                              {area}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {errorFor("pin") && <p id="pin-error" role="alert" className="text-xs text-destructive">{errorFor("pin")}</p>}
                  {pinState === "error" && (
                    <p role="alert" className="text-xs text-destructive">
                      {pinInfo?.message ?? "Couldn't look up that PIN — please fill city and state manually."}
                    </p>
                  )}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address <span className="text-destructive">*</span></Label>
                  <Input id="address" aria-describedby={errorFor("line1") ? "address-error" : undefined} autoComplete="address-line1" value={form.line1} onChange={set("line1")} onBlur={blur("line1")} aria-invalid={Boolean(errorFor("line1"))} className="min-h-11" placeholder="Enter house no., street and area" />
                  {errorFor("line1") && <p id="address-error" role="alert" className="text-xs text-destructive">{errorFor("line1")}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                  <Input id="city" aria-describedby={errorFor("city") ? "city-error" : undefined} autoComplete="address-level2" value={form.city} onChange={set("city")} onBlur={blur("city")} aria-invalid={Boolean(errorFor("city"))} className="min-h-11" placeholder="Enter your city" />
                  {errorFor("city") && <p id="city-error" role="alert" className="text-xs text-destructive">{errorFor("city")}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State <span className="text-destructive">*</span></Label>
                  <Input id="state" aria-describedby={errorFor("state") ? "state-error" : undefined} autoComplete="address-level1" value={form.state} onChange={set("state")} onBlur={blur("state")} aria-invalid={Boolean(errorFor("state"))} className="min-h-11" placeholder="Enter your state" />
                  {errorFor("state") && <p id="state-error" role="alert" className="text-xs text-destructive">{errorFor("state")}</p>}
                </div>
              </div>

              <label className="mt-5 flex items-center gap-3 text-sm">
                <Checkbox checked={saveForNext} onCheckedChange={(v) => setSaveForNext(Boolean(v))} />
                Save this address for faster checkout next time
              </label>

              <Button
                className="mt-6 w-full sm:w-auto bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] font-black rounded-[6px] font-bold shadow-xs"
                size="lg"
                onClick={() => {
                  if (detailsValid) {
                    goToStep(1);
                    return;
                  }
                  setTouched({
                    email: true,
                    phone: true,
                    firstName: true,
                    line1: true,
                    city: true,
                    state: true,
                    pin: true,
                  });
                  toast.error("Please complete the highlighted fields.");
                  fieldsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Continue to delivery
              </Button>
              {!detailsValid && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Fill in email, phone, name, address and a 6-digit PIN to continue.
                </p>
              )}
            </section>
          )}

          {step === 1 && (
            <section className="rounded-[6px] border border-[#E8DEC8] bg-white p-6 sm:p-8 shadow-xs animate-in fade-in-50 slide-in-from-right-3 duration-250">
              <h2 className="text-lg font-bold text-[#181206]">Delivery speed</h2>
              <RadioGroup aria-label="Delivery speed" value={delivery} onValueChange={(v) => setDelivery(v as "standard" | "express")} className="mt-4 space-y-3">
                {[
                  { id: "standard", icon: Truck, label: "Standard Delivery", hint: "2–6 working days (Direct from Tirunelveli)", fee: cart.shipping },
                  { id: "express", icon: Zap, label: "Express Air Dispatch", hint: "1–2 working days (Priority couriered)", fee: expressFeeAmount },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    htmlFor={opt.id}
                    className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-[6px] border px-4 transition-colors ${
                      delivery === opt.id ? "border-[#FFC700] bg-[#FFC700]/5" : "border-[#E8DEC8]"
                    }`}
                  >
                    <RadioGroupItem value={opt.id} id={opt.id} />
                    <opt.icon className="h-5 w-5 text-[#181206]" aria-hidden />
                    <span className="flex-1">
                      <span className="block text-sm font-bold text-[#181206]">{opt.label}</span>
                      <span className="block text-xs text-muted-foreground">{opt.hint}</span>
                    </span>
                    <span className="text-sm font-bold text-[#181206]">{opt.fee === 0 ? <span className="text-[#181206]">Free</span> : formatPrice(opt.fee)}</span>
                  </label>
                ))}
              </RadioGroup>

              <Separator className="my-6 border-[#E8DEC8]" />
              <h2 className="text-lg font-bold text-[#181206]">Gifting &amp; notes</h2>
              <label className="mt-4 flex items-start gap-3 rounded-[6px] border border-[#E8DEC8] bg-[#FAF3D6]/50 px-4 py-3 text-sm">
                <Checkbox checked={gift} onCheckedChange={(v) => setGift(Boolean(v))} className="mt-0.5" />
                <span className="flex-1">
                  <span className="flex items-center gap-2 font-bold text-[#181206]">
                    <Gift className="h-4 w-4 text-[#181206]" aria-hidden /> Heritage gift wrap
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Khadi wrap, wax seal and a handwritten note — {formatPrice(GIFT_FEE)}
                  </span>
                </span>
              </label>
              {gift && (
                <Textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  maxLength={200}
                  placeholder="Write your gift message (optional)"
                  className="mt-3 rounded-[6px] border-[#E8DEC8]"
                />
              )}
              <div className="mt-4 space-y-2">
                <Label htmlFor="notes" className="font-bold text-[#181206]">Delivery instructions</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={300}
                  placeholder="Add landmark, preferred time or gate details (optional)"
                  className="rounded-[6px] border-[#E8DEC8]"
                />
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="outline" size="lg" className="rounded-[6px] border-[#E8DEC8]" onClick={() => goToStep(0)}>
                  Back
                </Button>
                <Button size="lg" className="flex-1 sm:flex-none bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] font-black rounded-[6px] font-bold shadow-xs" onClick={() => goToStep(2)}>
                  Continue to payment
                </Button>
              </div>
            </section>
          )}

          {step === 2 && (
            <>
              <section className="rounded-[6px] border border-[#E8DEC8] bg-white p-6 sm:p-8 shadow-xs animate-in fade-in-50 slide-in-from-right-3 duration-250">
                <h2 className="text-lg font-bold text-[#181206]">Payment Method</h2>
                <RadioGroup aria-label="Payment method" value={payment} onValueChange={setPayment} className="mt-4 space-y-3">
                  {payments.map((opt) => (
                    <label
                      key={opt.id}
                      htmlFor={opt.id}
                      className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-[6px] border px-4 transition-colors ${
                        payment === opt.id ? "border-[#FFC700] bg-[#FFC700]/5" : "border-[#E8DEC8]"
                      }`}
                    >
                      <RadioGroupItem value={opt.id} id={opt.id} />
                      <span className="flex-1">
                        <span className="block text-sm font-bold text-[#181206]">{opt.label}</span>
                        <span className="block text-xs text-muted-foreground">{opt.hint}</span>
                      </span>
                    </label>
                  ))}
                </RadioGroup>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5 text-[#181206]" aria-hidden /> Payments are processed securely via Paytm. 100% Encrypted & Safe.
                </p>
              </section>

              <section className="rounded-[6px] border border-[#E8DEC8] bg-white p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg font-bold text-[#181206]">Review Order Details</h2>
                <dl className="mt-4 space-y-3 text-sm divide-y divide-[#E2E2E2]/60">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6 pt-2 first:pt-0">
                    <dt className="shrink-0 text-muted-foreground">Ship to</dt>
                    <dd className="min-w-0 sm:text-right font-semibold text-[#181206]">
                      {form.firstName} {form.lastName}
                      <span className="block text-xs text-muted-foreground font-normal">
                        {form.line1}, {form.city}, {form.state} {form.pin}
                      </span>
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6 pt-2">
                    <dt className="shrink-0 text-muted-foreground">Contact</dt>
                    <dd className="min-w-0 break-words sm:text-right font-semibold text-[#181206]">
                      {form.email}
                      <span className="block text-xs text-muted-foreground font-normal">{form.phone}</span>
                    </dd>
                  </div>

                  <div className="flex justify-between pt-2">
                    <dt className="text-muted-foreground">Delivery</dt>
                    <dd className="font-semibold text-[#181206]">{delivery === "express" ? "Express Air, 1–2 days" : "Standard Ground, 2–6 days"}</dd>
                  </div>
                  {gift && (
                    <div className="flex justify-between pt-2">
                      <dt className="text-muted-foreground">Gift wrap</dt>
                      <dd className="font-semibold text-[#181206]">Yes (Khadi wax sealed)</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" size="lg" className="rounded-[6px] border-[#E8DEC8]" onClick={() => goToStep(1)}>
                    Back
                  </Button>
                  <Button size="lg" className="flex-1 bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] font-black rounded-[6px] font-bold shadow-md text-base" disabled={placing} onClick={submit}>
                    {placing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> Placing order…
                      </>
                    ) : (
                      `Complete Order · ${formatPrice(grandTotal)}`
                    )}
                  </Button>
                </div>
              </section>
            </>
          )}
        </div>

        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start" aria-labelledby="order-summary-heading">
          <div className="rounded-[6px] border border-[#E8DEC8] bg-white p-6 shadow-xs">
            <h2 id="order-summary-heading" className="text-lg font-bold text-[#181206] pb-3 border-b border-[#E8DEC8]">Order summary</h2>
            <ul className="mt-4 space-y-4 divide-y divide-[#F0F0F0]">
              {cart.resolved.map((line) => (
                <li key={`${line.slug}-${line.variantId}`} className="flex gap-3 pt-3 first:pt-0">
                  <SmartImage
                    src={line.product.image}
                    alt={line.product.name}
                    width={1000}
                    height={1000}
                    wrapperClassName="h-16 w-16 shrink-0 rounded-[6px] border border-[#E8DEC8] bg-[#FAF3D6]"
                    className="h-full w-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#181206] hover:text-[#181206] transition-colors">{line.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {line.variant.label} × {line.qty}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[#DC2626]">{formatPrice(line.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-5 border-[#E8DEC8]" />

            <div className="space-y-2">
              <Label htmlFor="promo" className="text-xs font-bold text-[#181206] uppercase tracking-wider">
                Promo code
              </Label>
              {cart.appliedPromo && !cart.promoIsAutomatic ? (
                <div className="flex items-center justify-between rounded-[6px] border border-[#FFC700]/40 bg-[#FFC700]/5 px-3 py-2">
                  <span className="text-sm font-bold text-[#181206]">{cart.appliedPromo.code}</span>
                  <button
                    type="button"
                    onClick={() => {
                      cart.removePromo();
                      setPromoInput("");
                      setPromoMsg(null);
                    }}
                    aria-label={`Remove promo code ${cart.appliedPromo.code}`}
                    className="min-h-11 px-2 text-xs font-semibold text-muted-foreground underline hover:text-[#DC2626]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    id="promo"
                    value={promoInput}
                    maxLength={24}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Enter promo code (e.g. FESTIVE10)"
                    className="min-h-11 rounded-[6px] border-[#E8DEC8]"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-11 rounded-[6px] border-[#FFC700] text-[#181206] hover:bg-[#FFC700] hover:text-white font-bold px-4"
                    onClick={() => {
                      const res = cart.applyPromo(promoInput);
                      setPromoMsg(
                        res.ok
                          ? { ok: true, text: `${res.promo.label} applied.` }
                          : { ok: false, text: res.reason },
                      );
                    }}
                  >
                    Apply
                  </Button>
                </div>
              )}
              {promoMsg && (
                <p role="status" aria-live="polite" className={`text-xs font-semibold ${promoMsg.ok ? "text-[#181206]" : "text-[#DC2626]"}`}>
                  {promoMsg.text}
                </p>
              )}
              {cart.promoIsAutomatic && cart.appliedPromo && (
                <p className="text-xs font-semibold text-[#181206]">
                  Auto-applied: {cart.appliedPromo.description}
                </p>
              )}
            </div>

            <Separator className="my-5 border-[#E8DEC8]" />
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">{formatPrice(cart.subtotal)}</span>
              </div>
              {cart.appliedPromo && cart.totalSavings > 0 && (
                <div className="space-y-1.5 rounded-[6px] bg-[#FFC700]/5 border border-[#FFC700]/30 px-3 py-2">
                  <div className="flex justify-between font-bold text-xs text-[#181206]">
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
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-foreground">{cart.shipping === 0 ? <span className="text-[#181206]">Free</span> : formatPrice(cart.shipping)}</span>
              </div>
              {expressFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Express delivery</span>
                  <span className="font-semibold text-foreground">{formatPrice(expressFee)}</span>
                </div>
              )}
              {giftFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gift wrap</span>
                  <span className="font-semibold text-foreground">{formatPrice(giftFee)}</span>
                </div>
              )}
              {codFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">COD handling</span>
                  <span className="font-semibold text-foreground">{formatPrice(codFee)}</span>
                </div>
              )}
            </div>
            <Separator className="my-5 border-[#E8DEC8]" />
            <div className="flex justify-between text-base font-bold">
              <span className="text-[#181206]">Total</span>
              <span className="text-xl font-bold text-[#DC2626]">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </aside>
      </div>

      {placing && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/85 backdrop-blur-md animate-in fade-in duration-200 p-4">
          <div className="surface-card flex flex-col items-center p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center space-y-4 border border-primary/30">
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <Lock className="h-6 w-6 text-primary absolute" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Securing Your Order</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Confirming reservation and preparing your freshly compounded hing parcel from Tirunelveli...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
