import { useEffect, useRef, useState, useTransition } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Heart,
  HelpCircle,
  Leaf,
  MapPin,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuantityStepper } from "@/components/site/QuantityStepper";
import { ProductCard } from "@/components/site/ProductCard";
import { formatLabels, formatPrice, getProduct, products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { SmartImage } from "@/components/site/SmartImage";
import { ProductImageZoom } from "@/components/site/ProductImageZoom";
import { ProductReviews } from "@/components/site/ProductReviews";
import { ProductQuestions } from "@/components/site/ProductQuestions";
import { WishlistButton } from "@/components/site/WishlistButton";
import { BackInStockDialog } from "@/components/site/BackInStockDialog";
import { RecentlyViewed } from "@/components/site/RecentlyViewed";
import { useRecentlyViewed } from "@/lib/recently-viewed";
import { lookupPincode, type PincodeLookup } from "@/lib/pincode.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  pendingComponent: () => null,
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Y.G Asafoetida" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const minPrice = Math.min(...product.variants.map((v) => v.price));
    const maxPrice = Math.max(...product.variants.map((v) => v.price));
    const priceText = minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice} - ₹${maxPrice}`;
    const description = `${product.name} (${priceText}) — ${product.tagline}. ${product.description.slice(0, 140)}... Compounded in Tirunelveli since 1932.`;
    const canonicalUrl = `https://ygasafoetida.in/product/${product.slug}`;
    const imageUrl = `https://ygasafoetida.in/products/${product.slug}/img-1.jpg`;

    return {
      meta: [
        { title: `${product.name} (${priceText}) | Y.G Asafoetida Store` },
        { name: "description", content: description },
        {
          name: "keywords",
          content: `${product.name}, buy ${product.name} online, ${product.format} hing, Y.G Asafoetida, Tirunelveli hing price, pure asafoetida, authentic south indian spices`,
        },
        { property: "og:type", content: "product" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:title", content: `${product.name} — Y.G Asafoetida` },
        { property: "og:description", content: description },
        { property: "og:image", content: imageUrl },
        { property: "og:image:alt", content: product.name },
        { property: "product:price:amount", content: String(minPrice) },
        { property: "product:price:currency", content: "INR" },
        { property: "product:availability", content: product.inStock ? "in stock" : "out of stock" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${product.name} | Y.G Asafoetida` },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: imageUrl },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": canonicalUrl,
            "name": product.name,
            "image": [imageUrl],
            "description": product.description,
            "sku": product.slug,
            "mpn": product.slug,
            "brand": {
              "@type": "Brand",
              "name": "Y.G Asafoetida"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": minPrice,
              "highPrice": maxPrice,
              "offerCount": product.variants.length,
              "availability": product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              "itemCondition": "https://schema.org/NewCondition",
              "seller": {
                "@type": "Organization",
                "name": "Y.G Asafoetida"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1420",
              "bestRating": "5",
              "worstRating": "1"
            }
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ygasafoetida.in/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Shop",
                "item": "https://ygasafoetida.in/shop"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": product.name,
                "item": canonicalUrl
              }
            ]
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, count, setOpen: setCartOpen } = useCart();
  const navigate = useNavigate();
  useRecentlyViewed(product.slug);

  const [variantId, setVariantId] = useState(product.variants[0]!.id);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const thumbContainerRef = useRef<HTMLDivElement>(null);

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Pincode lookup state
  const [pinInput, setPinInput] = useState("");
  const [pinResult, setPinResult] = useState<PincodeLookup | null>(null);
  const [isCheckingPin, startPinTransition] = useTransition();

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]!;
  const soldOut = product.inStock === false;
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  // Floating button offset for mobile
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      root.style.setProperty("--fab-offset", window.innerWidth < 1024 ? "4.5rem" : "0px");
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      root.style.removeProperty("--fab-offset");
    };
  }, []);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = pinInput.trim();
    if (!/^\d{6}$/.test(pin)) {
      toast.error("Please enter a valid 6-digit Indian PIN code");
      return;
    }
    startPinTransition(async () => {
      try {
        const res = await lookupPincode({ data: { pin } });
        setPinResult(res);
        if (res.ok) {
          toast.success(`Express delivery available to ${res.city}, ${res.state}!`);
        } else {
          toast.error(res.message ?? "PIN code not serviceable for express courier");
        }
      } catch {
        toast.error("Unable to check delivery right now");
      }
    });
  };

  const handleBuyNow = () => {
    add(product.slug, variant.id, qty);
    void navigate({ to: "/checkout" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Y.G Asafoetida" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      price: variant.price,
      priceCurrency: "INR",
      availability: soldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
  };

  return (
    <div className="pb-32 lg:pb-12 space-y-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-border bg-muted/20">
        <div className="container-page py-2.5 sm:py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground overflow-x-auto whitespace-nowrap scrollbar-none">
            <Link to="/" className="hover:text-foreground shrink-0">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60 shrink-0" aria-hidden />
            <Link to="/shop" className="hover:text-foreground shrink-0">
              Shop
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60 shrink-0" aria-hidden />
            <span className="capitalize text-muted-foreground shrink-0">{product.format}</span>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60 shrink-0" aria-hidden />
            <span aria-current="page" className="truncate font-medium text-foreground min-w-0">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="container-page py-4 sm:py-10">
        {/* Mobile Header Lockup (Title, Rating, Eyebrow & Wishlist on top) */}
        <div className="lg:hidden space-y-1.5 pb-3">
          <div className="flex items-center justify-between gap-2">
            <p className="eyebrow">{formatLabels[product.format]} · Estd. 1932</p>
            <WishlistButton slug={product.slug} name={product.name} />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(product.rating) ? "fill-amber-500 text-amber-500" : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-foreground">{product.rating}</span>
            <span className="text-muted-foreground text-[11px]">({product.reviews} reviews)</span>
            <span className="text-muted-foreground/60">·</span>
            <span className="text-primary font-medium flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="h-3 w-3" /> FSSAI Certified
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 items-start">
          {/* ======================================================== */}
          {/* LEFT: COMPACT MEDIA GALLERY WITH AMAZON-STYLE SIDE ZOOM */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 relative">
            <ProductImageZoom
              images={gallery}
              activeImage={activeImage}
              onSelectImage={setActiveImage}
              productName={product.name}
              formatLabel={formatLabels[product.format]}
              isBestseller={product.bestseller}
              isGlutenFree={product.glutenFree}
              thumbContainerRef={thumbContainerRef}
            />
          </div>

          {/* ======================================================== */}
          {/* RIGHT: BUYING DETAILS & ACTIONS */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {/* Desktop Header Lockup */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between gap-2">
                <p className="eyebrow">{formatLabels[product.format]} · Estd. 1932</p>
                <WishlistButton slug={product.slug} name={product.name} />
              </div>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                {product.name}
              </h1>

              <div className="mt-2.5 flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.round(product.rating) ? "fill-amber-500 text-amber-500" : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-foreground">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} verified reviews)</span>
                <span className="text-muted-foreground/60">·</span>
                <span className="text-primary font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> FSSAI Certified
                </span>
              </div>
            </div>

            {/* Mobile Tagline (shown under photos) */}
            <p className="lg:hidden text-xs text-muted-foreground leading-relaxed">
              {product.tagline}
            </p>

            {/* Price Box */}
            <div className="rounded-xl border border-border/80 bg-muted/20 p-3 sm:p-3.5 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-foreground">
                    {formatPrice(variant.price)}
                  </span>
                  {variant.mrp ? (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(variant.mrp)}
                    </span>
                  ) : null}
                  {variant.mrp ? (
                    <span className="rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                      Save {Math.round(((variant.mrp - variant.price) / variant.mrp) * 100)}%
                    </span>
                  ) : null}
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Inclusive of all GST · Free delivery over ₹499
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-card rounded-md border border-border text-foreground">
                {variant.label}
              </span>
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground block">
                Select Pack Size / Weight:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                      v.id === variantId
                        ? "border-primary bg-primary/10 text-primary shadow-xs font-bold"
                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    {v.id === variantId ? <Check className="h-3 w-3" /> : null}
                    <span>{v.label}</span>
                    <span className="opacity-75">· {formatPrice(v.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 12 Months Freshness & Lifetime Guarantee */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-100 shadow-xs">
              <div className="h-9 w-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">12 Months Shelf Life Guaranteed</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300">
                    1 Year Freshness
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                  {product.shelfLife || "12 months from packing. Store sealed in airtight container."}
                </p>
              </div>
            </div>

            {/* Stock & Purchase Buttons */}
            {soldOut ? (
              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <p className="text-xs text-muted-foreground">
                  This batch is currently sold out. Leave your details for instant restock notice.
                </p>
                <div className="flex flex-wrap gap-2">
                  <BackInStockDialog slug={product.slug} name={product.name} />
                  <WishlistButton slug={product.slug} name={product.name} variant="full" />
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 sm:space-y-3">
                {product.stockLeft ? (
                  <p className="text-[11px] font-semibold text-primary flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    Only {product.stockLeft} packs remaining from this fresh Tirunelveli batch
                  </p>
                ) : null}

                <div className="flex items-center gap-2">
                  <QuantityStepper
                    qty={qty}
                    label={`Quantity of ${product.name}`}
                    min={1}
                    max={20}
                    onChange={(q) => setQty(Math.max(1, Math.min(q, 20)))}
                  />

                  <Button
                    size="sm"
                    className="h-11 sm:h-10 flex-1 font-bold gap-1.5 sm:gap-2 shadow-xs text-xs sm:text-sm"
                    onClick={() => {
                      add(product.slug, variant.id, qty);
                      toast.success(`Added ${qty} × ${product.name} to your basket!`);
                    }}
                  >
                    <ShoppingBag className="h-4 w-4 shrink-0" />
                    <span>Add to Basket · {formatPrice(variant.price * qty)}</span>
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-10 sm:h-10 font-bold gap-1.5 shadow-xs border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={handleBuyNow}
                >
                  <Zap className="h-4 w-4 fill-primary group-hover:fill-primary-foreground" />
                  Instant Checkout · Buy Now
                </Button>
              </div>
            )}

            {/* Quick Culinary Profile Card */}
            <div className="rounded-xl border border-border/80 bg-card p-3.5 space-y-2 text-xs">
              <p className="font-bold text-foreground flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-primary">
                <Flame className="h-3.5 w-3.5" /> Culinary Characteristics
              </p>
              <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                <div className="rounded-lg bg-muted/40 p-2">
                  <span className="block text-[10px] text-muted-foreground/80 font-medium">Aroma Strength</span>
                  <span className="font-semibold text-foreground text-xs">
                    {product.format === "cake" ? "Intense (5/5)" : product.format === "granules" ? "Roasted Nutty (4/5)" : "Sharp Classic (4.5/5)"}
                  </span>
                </div>
                <div className="rounded-lg bg-muted/40 p-2">
                  <span className="block text-[10px] text-muted-foreground/80 font-medium">Bloom Speed</span>
                  <span className="font-semibold text-foreground text-xs">
                    {product.format === "granules" ? "Slow-Release" : product.format === "cake" ? "Solid Dissolve" : "Instant in Hot Ghee"}
                  </span>
                </div>
              </div>
            </div>

            {/* Pincode Express Delivery Estimator */}
            <div className="rounded-xl border border-border/80 bg-card p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> Delivery & Pincode Check
                </span>
                <span className="text-[10px] text-muted-foreground">Dispatches in 24h</span>
              </div>

              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <Input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ""))}
                  className="h-8 text-xs font-mono"
                />
                <Button type="submit" size="sm" variant="outline" className="h-8 text-xs shrink-0" disabled={isCheckingPin}>
                  {isCheckingPin ? "Checking..." : "Check"}
                </Button>
              </form>

              {pinResult && pinResult.ok ? (
                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  Express delivery to {pinResult.city}, {pinResult.state} in 2-4 business days.
                </p>
              ) : null}
            </div>

            {/* 4-Point Guarantee Badges */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-medium text-muted-foreground border-t border-border/60 pt-3">
              <div className="flex items-center justify-center gap-1 rounded-lg bg-amber-500/10 border border-amber-500/20 py-1.5 px-1 text-center">
                <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="truncate font-bold text-amber-900 dark:text-amber-200">12M Life</span>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-lg bg-muted/40 py-1.5 px-1 text-center">
                <Truck className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">Free &gt; ₹499</span>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-lg bg-muted/40 py-1.5 px-1 text-center">
                <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">FSSAI Certified</span>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-lg bg-muted/40 py-1.5 px-1 text-center">
                <RotateCcw className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">7-Day Replace</span>
              </div>
            </div>

            {/* Accordion Specs */}
            <Accordion type="single" collapsible className="mt-2 text-xs border border-border/70 rounded-xl overflow-hidden">
              <AccordionItem value="ingredients" className="border-b px-3">
                <AccordionTrigger className="text-xs font-semibold py-2.5">
                  Ingredients & Carrier Base
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  {product.ingredients}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="usage" className="border-b px-3">
                <AccordionTrigger className="text-xs font-semibold py-2.5">
                  Grandmother's Culinary Usage Guide
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  {product.usage}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shelf" className="border-b px-3">
                <AccordionTrigger className="text-xs font-semibold py-2.5">
                  Shelf Life & Storage Instructions
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  {product.shelfLife}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="px-3">
                <AccordionTrigger className="text-xs font-semibold py-2.5">
                  Shipping, Packaging & Returns
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  Dispatched from our Tirunelveli works within 24 hours. Sealed in airtight containers to preserve essential terpenes. Damaged packs are replaced free upon photo submission.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Community Q&A Section */}
      <section className="border-t border-border bg-secondary/15 py-8 sm:py-12">
        <div className="container-page">
          <ProductQuestions slug={product.slug} />
        </div>
      </section>

      {/* Verified Reviews Section */}
      <section className="border-t border-border py-8 sm:py-12">
        <ProductReviews product={product} />
      </section>

      {/* Related Formulations Grid */}
      <section className="border-t border-border bg-muted/20 py-10 sm:py-14">
        <div className="container-page space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Other Formulations</p>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Explore Alternative Y.G Textures
              </h2>
            </div>
            <Button variant="outline" size="sm" className="text-xs" asChild>
              <Link to="/shop">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} mode="compact" />
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewed currentSlug={product.slug} />

      {/* Mobile Sticky Buy Bar */}
      <div
        role="region"
        aria-label="Add to basket"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3.5 pt-2 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] backdrop-blur-md lg:hidden shadow-lg"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] text-muted-foreground">{variant.label}</p>
            <p className="text-base font-bold text-foreground">{formatPrice(variant.price * qty)}</p>
          </div>

          <div className="flex items-center gap-2">
            {count > 0 ? (
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`Open basket, ${count} items`}
                className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-card shadow-xs"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                  {count}
                </span>
              </button>
            ) : null}

            <Button
              className="h-9 px-4 text-xs font-bold gap-1"
              disabled={soldOut}
              onClick={() => {
                add(product.slug, variant.id, qty);
                toast.success(`Added to basket!`);
              }}
            >
              <Check className="h-3.5 w-3.5" />
              {soldOut ? "Sold Out" : "Add to Basket"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
