import { lazy, Suspense, useEffect, useRef, useState, useTransition } from "react";
import { createFileRoute, Link, notFound, useNavigate, useRouter } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Leaf,
  Loader2,
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
import { formatLabels, formatPrice, getProduct, products, useLiveProduct, useLiveProducts } from "@/data/products";
import { useCart } from "@/lib/cart";
import { SmartImage } from "@/components/site/SmartImage";
import { ProductImageZoom } from "@/components/site/ProductImageZoom";
import { WishlistButton } from "@/components/site/WishlistButton";
import { useRecentlyViewed } from "@/lib/recently-viewed";
import { lookupPincode, type PincodeLookup } from "@/lib/pincode.functions";
import { toast } from "sonner";

// Lazy load below-the-fold heavy components to eliminate initial page render lag
const ProductReviews = lazy(() =>
  import("@/components/site/ProductReviews").then((m) => ({ default: m.ProductReviews }))
);
const ProductQuestions = lazy(() =>
  import("@/components/site/ProductQuestions").then((m) => ({ default: m.ProductQuestions }))
);
const RecentlyViewed = lazy(() =>
  import("@/components/site/RecentlyViewed").then((m) => ({ default: m.RecentlyViewed }))
);
const BackInStockDialog = lazy(() =>
  import("@/components/site/BackInStockDialog").then((m) => ({ default: m.BackInStockDialog }))
);

export const Route = createFileRoute("/product/$slug")({
  pendingComponent: () => null,
  loader: async ({ params }) => {
    const product = await getProduct(params.slug);
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
  const { product: initialProduct } = Route.useLoaderData();
  const liveProduct = useLiveProduct(initialProduct.slug);
  const product = liveProduct || initialProduct;
  const allProducts = useLiveProducts();
  const { add, count, setOpen: setCartOpen } = useCart();
  const navigate = useNavigate();
  useRecentlyViewed(product.slug);

  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const thumbContainerRef = useRef<HTMLDivElement>(null);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]!;

  // Dynamic gallery based on selected variant (gram-wise images)
  const gallery =
    variant.gallery && variant.gallery.length > 0
      ? variant.gallery
      : variant.image
      ? [variant.image, ...(product.gallery?.filter((img) => img !== variant.image) ?? [])]
      : product.gallery && product.gallery.length > 0
      ? product.gallery
      : product.image
      ? [product.image]
      : [];

  const handleSelectVariant = (id: string) => {
    setVariantId(id);
    setActiveImage(0);
  };

  // Pincode lookup state
  const [pinInput, setPinInput] = useState("");
  const [pinResult, setPinResult] = useState<PincodeLookup | null>(null);
  const [isCheckingPin, startPinTransition] = useTransition();

  const soldOut = product.inStock === false;
  const related = allProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  const currentIndex = allProducts.findIndex((p) => p.slug === product.slug);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const hasPrev = safeIndex > 0;
  const hasNext = safeIndex < allProducts.length - 1;
  const prevProduct = hasPrev ? allProducts[safeIndex - 1]! : null;
  const nextProduct = hasNext ? allProducts[safeIndex + 1]! : null;

  // Always scroll to top when product slug changes so navigation is never clipped
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [product.slug]);

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

  const [buyingNow, setBuyingNow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    void router.preloadRoute({ to: "/checkout" });
  }, [router]);

  const handleBuyNow = () => {
    setBuyingNow(true);
    add(product.slug, variant.id, qty);
    toast.success(`Preparing instant checkout for ${product.name}...`);
    void navigate({ to: "/checkout" }).finally(() => {
      setBuyingNow(false);
    });
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

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[#E8DEC8] bg-[#F5EAC4] py-3">
        <div className="container-page flex items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6E777D] overflow-x-auto whitespace-nowrap scrollbar-none min-w-0">
            <Link to="/" className="hover:text-[#181206] transition-colors font-medium shrink-0">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-[#A0A8B0] shrink-0" aria-hidden />
            <Link to="/shop" className="hover:text-[#181206] transition-colors font-medium shrink-0">
              Shop
            </Link>
            <ChevronRight className="h-3 w-3 text-[#A0A8B0] shrink-0" aria-hidden />
            <Link
              to="/shop"
              search={{ category: product.format }}
              className="capitalize text-[#6E777D] hover:text-[#181206] hover:underline transition-colors font-medium shrink-0"
            >
              {formatLabels[product.format] || product.format}
            </Link>
            <ChevronRight className="h-3 w-3 text-[#A0A8B0] shrink-0" aria-hidden />
            <span aria-current="page" className="truncate font-semibold text-[#181206] min-w-0">
              {product.name}
            </span>
          </nav>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1 font-bold text-[#181206] hover:text-[#B45309] transition-colors py-1 px-2.5 rounded-[6px] bg-white border border-[#E8DEC8] hover:bg-[#FAF3D6] shadow-xs shrink-0 cursor-pointer active:scale-95 text-xs"
            title="Return to Shop catalog"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="container-page py-6 sm:py-10">
        {/* Mobile Header Lockup (Title, Rating, Eyebrow & Wishlist on top) */}
        <div className="lg:hidden space-y-2 pb-4 border-b border-[#E8DEC8] mb-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#181206] bg-[#FF9933]/10 px-2.5 py-1 rounded-[4px]">
              {product.format === "vismaya" ? "Vismaya · Ready to Cook" : `${formatLabels[product.format]} · Estd. 1932`}
            </span>

            {/* Mobile Product Next/Back Navigation */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 bg-[#FAF3D6] px-2 py-0.5 rounded-[6px] border border-[#E8DEC8] shadow-xs">
                {hasPrev && prevProduct ? (
                  <Link
                    to="/product/$slug"
                    params={{ slug: prevProduct.slug }}
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-white border border-[#E8DEC8] text-[10px] font-bold text-[#181206] hover:bg-[#FF9933] hover:border-[#FF9933] transition-all cursor-pointer shadow-xs active:scale-95"
                    title={`Previous: ${prevProduct.name}`}
                  >
                    <ChevronLeft className="h-3 w-3" />
                    <span>Back</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-white/50 text-[10px] font-medium text-[#A0A8B0] cursor-not-allowed opacity-50">
                    <ChevronLeft className="h-3 w-3" />
                    <span>Back</span>
                  </span>
                )}

                <span className="text-[10px] font-mono font-bold text-[#181206] px-1">
                  {safeIndex + 1} / {products.length}
                </span>

                {hasNext && nextProduct ? (
                  <Link
                    to="/product/$slug"
                    params={{ slug: nextProduct.slug }}
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-white border border-[#E8DEC8] text-[10px] font-bold text-[#181206] hover:bg-[#FF9933] hover:border-[#FF9933] transition-all shadow-xs cursor-pointer active:scale-95"
                    title={`Next: ${nextProduct.name}`}
                  >
                    <span>Next</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-white/50 text-[10px] font-medium text-[#A0A8B0] cursor-not-allowed opacity-50">
                    <span>Next</span>
                    <ChevronRight className="h-3 w-3" />
                  </span>
                )}
              </div>

              <WishlistButton slug={product.slug} name={product.name} />
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#181206]">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(product.rating) ? "fill-amber-500 text-amber-500" : "text-[#E2E2E2]"
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-[#181206]">{product.rating}</span>
            <span className="text-[#6E777D] text-[11px]">({product.reviews} reviews)</span>
            <span className="text-[#A0A8B0]">·</span>
            <span className="text-[#181206] font-medium flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="h-3 w-3" /> FSSAI Certified
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
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
                <span className="text-xs font-semibold text-[#181206] bg-[#FF9933]/10 px-2.5 py-1 rounded-[4px]">
                  {product.format === "vismaya" ? "Vismaya · Ready to Cook" : `${formatLabels[product.format]} · Estd. 1932`}
                </span>

                {/* Desktop Product Navigation: Back, 1/23, Next */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#FAF3D6] px-2 py-0.5 rounded-[6px] border border-[#E8DEC8] shadow-xs">
                    {hasPrev && prevProduct ? (
                      <Link
                        to="/product/$slug"
                        params={{ slug: prevProduct.slug }}
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-[4px] bg-white border border-[#E8DEC8] text-[11px] font-bold text-[#181206] hover:bg-[#FF9933] hover:border-[#FF9933] transition-all cursor-pointer shadow-xs active:scale-95"
                        title={`Previous: ${prevProduct.name}`}
                      >
                        <ChevronLeft className="h-3 w-3" />
                        <span>Back</span>
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-[4px] bg-white/50 text-[11px] font-medium text-[#A0A8B0] cursor-not-allowed opacity-50">
                        <ChevronLeft className="h-3 w-3" />
                        <span>Back</span>
                      </span>
                    )}

                    <span className="text-[11px] font-mono font-bold text-[#181206] px-1.5">
                      {safeIndex + 1} / {products.length}
                    </span>

                    {hasNext && nextProduct ? (
                      <Link
                        to="/product/$slug"
                        params={{ slug: nextProduct.slug }}
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-[4px] bg-white border border-[#E8DEC8] text-[11px] font-bold text-[#181206] hover:bg-[#FF9933] hover:border-[#FF9933] transition-all shadow-xs cursor-pointer active:scale-95"
                        title={`Next: ${nextProduct.name}`}
                      >
                        <span>Next</span>
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-[4px] bg-white/50 text-[11px] font-medium text-[#A0A8B0] cursor-not-allowed opacity-50">
                        <span>Next</span>
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    )}
                  </div>

                  <WishlistButton slug={product.slug} name={product.name} />
                </div>
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#181206]">
                {product.name}
              </h1>

              <div className="mt-2.5 flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.round(product.rating) ? "fill-amber-500 text-amber-500" : "text-[#E2E2E2]"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-[#181206]">{product.rating}</span>
                <span className="text-[#6E777D]">({product.reviews} verified reviews)</span>
                <span className="text-[#A0A8B0]">·</span>
                <span className="text-[#181206] font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> FSSAI Certified
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs text-[#6E777D] leading-relaxed">
              {product.tagline}
            </p>

            {/* Price Box */}
            <div className="rounded-[6px] border border-[#E8DEC8] bg-[#FAF3D6] p-3.5 sm:p-4 flex items-baseline justify-between shadow-xs">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#DC2626] font-mono">
                    {formatPrice(variant.price)}
                  </span>
                  {variant.mrp ? (
                    <span className="text-sm text-[#A0A8B0] line-through font-mono">
                      {formatPrice(variant.mrp)}
                    </span>
                  ) : null}
                  {variant.mrp ? (
                    <span className="rounded-[4px] bg-[#EABC5E] text-[#181206] px-2 py-0.5 text-[11px] font-bold shadow-xs">
                      Save {Math.round(((variant.mrp - variant.price) / variant.mrp) * 100)}%
                    </span>
                  ) : null}
                </div>
                <p className="text-[11px] text-[#6E777D] mt-1">
                  Inclusive of all taxes · Free delivery across India over ₹499
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-white rounded-[4px] border border-[#E8DEC8] text-[#181206]">
                {variant.label}
              </span>
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#181206] block">
                Select Pack Size / Weight:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleSelectVariant(v.id)}
                    className={`flex items-center gap-1.5 rounded-[6px] border px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      v.id === variantId
                        ? "border-[#FF9933] bg-[#FF9933]/10 text-[#181206] shadow-xs font-bold ring-1 ring-[#FF9933]"
                        : "border-[#E8DEC8] bg-white text-[#181206] hover:border-[#FF9933]/60 hover:text-[#181206]"
                    }`}
                  >
                    {v.id === variantId ? <Check className="h-3 w-3 text-[#181206]" /> : null}
                    <span>{v.label}</span>
                    <span className="opacity-75 font-mono">· {formatPrice(v.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock & Purchase Buttons */}
            {soldOut ? (
              <div className="rounded-[6px] border border-[#E8DEC8] bg-white p-4 space-y-3">
                <p className="text-xs text-[#6E777D]">
                  This batch is currently sold out. Leave your details for instant restock notice.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Suspense
                    fallback={
                      <Button variant="outline" size="sm" className="text-xs h-9 gap-1.5" disabled>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading...
                      </Button>
                    }
                  >
                    <BackInStockDialog slug={product.slug} name={product.name} />
                  </Suspense>
                  <WishlistButton slug={product.slug} name={product.name} variant="full" />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {product.stockLeft ? (
                  <p className="text-[11px] font-semibold text-[#181206] flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#FF9933] animate-pulse" />
                    Only {product.stockLeft} packs remaining from this fresh Tirunelveli batch
                  </p>
                ) : null}

                <div className="flex items-center gap-2.5">
                  <QuantityStepper
                    qty={qty}
                    label={`Quantity of ${product.name}`}
                    min={1}
                    max={20}
                    onChange={(q) => setQty(Math.max(1, Math.min(q, 20)))}
                  />

                  <Button
                    size="sm"
                    className="h-11 flex-1 font-bold gap-2 rounded-[6px] bg-[#FF9933] hover:bg-[#E6B000] text-[#181206] font-black shadow-xs text-xs sm:text-sm cursor-pointer transition-colors"
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
                  disabled={buyingNow}
                  className="w-full h-10 font-bold gap-1.5 rounded-[6px] border-[#FF9933] text-[#181206] hover:bg-[#FF9933] hover:text-white transition-all cursor-pointer"
                  onClick={handleBuyNow}
                >
                  {buyingNow ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-[#181206]" />
                      <span>Directing to Secure Checkout…</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 fill-[#FF9933] group-hover:fill-white" />
                      <span>Instant Checkout · Buy Now</span>
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Available Offers (Ekomart Styled) */}
            <div className="rounded-[6px] border border-[#E8DEC8] bg-[#F5EAC4] p-4 space-y-2.5">
              <h4 className="text-xs font-bold text-[#181206] uppercase tracking-wider">
                Available Offers & Guarantee
              </h4>
              <div className="space-y-1.5 text-xs text-[#6E777D]">
                <div className="flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 text-[#181206] shrink-0" />
                  <span>Free delivery across India on orders above ₹499</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#181206] shrink-0" />
                  <span>12 Months Shelf Life Guaranteed · Sealed Airtight</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#181206] shrink-0" />
                  <span>100% Genuine Heritage Hing · Safe Secure Checkout</span>
                </div>
              </div>
            </div>

            {/* Pincode Express Delivery Estimator */}
            <div className="rounded-[6px] border border-[#E8DEC8] bg-white p-3.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-[#181206]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#181206]" /> Delivery & Pincode Check
                </span>
                <span className="text-[10px] text-[#6E777D]">Dispatches in 24h</span>
              </div>

              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <Input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ""))}
                  className="h-8 text-xs font-mono rounded-[6px] border-[#E8DEC8]"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs shrink-0 rounded-[6px] border-[#FF9933] text-[#181206] hover:bg-[#FF9933] hover:text-white"
                  disabled={isCheckingPin}
                >
                  {isCheckingPin ? "Checking..." : "Check"}
                </Button>
              </form>

              {pinResult && pinResult.ok ? (
                <p className="text-[11px] font-medium text-[#181206] flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  Express delivery to {pinResult.city}, {pinResult.state} in 2-4 business days.
                </p>
              ) : null}
            </div>

            {/* Accordion Specs */}
            <Accordion type="single" collapsible className="mt-2 text-xs border border-[#E8DEC8] rounded-[6px] bg-white overflow-hidden shadow-xs">
              <AccordionItem value="ingredients" className="border-b border-[#E8DEC8] px-3.5">
                <AccordionTrigger className="text-xs font-semibold py-2.5 text-[#181206] hover:text-[#181206]">
                  Ingredients & Carrier Base
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#6E777D] leading-relaxed">
                  {product.ingredients}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="usage" className="border-b border-[#E8DEC8] px-3.5">
                <AccordionTrigger className="text-xs font-semibold py-2.5 text-[#181206] hover:text-[#181206]">
                  Grandmother's Culinary Usage Guide
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#6E777D] leading-relaxed">
                  {product.usage}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shelf" className="border-b border-[#E8DEC8] px-3.5">
                <AccordionTrigger className="text-xs font-semibold py-2.5 text-[#181206] hover:text-[#181206]">
                  Shelf Life & Storage Instructions
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#6E777D] leading-relaxed">
                  {product.shelfLife}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="px-3.5">
                <AccordionTrigger className="text-xs font-semibold py-2.5 text-[#181206] hover:text-[#181206]">
                  Shipping, Packaging & Returns
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#6E777D] leading-relaxed">
                  Dispatched from our Tirunelveli works within 24 hours. Sealed in airtight containers to preserve essential terpenes. Damaged packs are replaced free upon photo submission.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Product Showcase Navigation Bar: Back to Shop, Previous Product, Next Product */}
      <div className="border-y border-[#E8DEC8] bg-[#FAF3D6]/80 py-3.5">
        <div className="container-page flex items-center justify-between gap-3">
          {hasPrev && prevProduct ? (
            <Link
              to="/product/$slug"
              params={{ slug: prevProduct.slug }}
              className="flex items-center gap-2.5 text-xs font-bold text-[#181206] hover:text-[#B45309] transition-colors group min-w-0"
              title={`Previous: ${prevProduct.name}`}
            >
              <div className="h-8 w-8 rounded-full border border-[#E8DEC8] bg-white flex items-center justify-center shrink-0 group-hover:bg-[#FF9933] transition-colors shadow-xs">
                <ChevronLeft className="h-4 w-4 text-[#181206]" />
              </div>
              <div className="truncate text-left">
                <div className="text-[10px] text-[#6E777D] uppercase font-semibold">Previous Product</div>
                <div className="truncate font-bold text-xs max-w-[120px] sm:max-w-[200px]">{prevProduct.name}</div>
              </div>
            </Link>
          ) : (
            <Link
              to="/shop"
              className="flex items-center gap-2 text-xs font-bold text-[#181206] hover:text-[#B45309] transition-colors group"
            >
              <div className="h-8 w-8 rounded-full border border-[#E8DEC8] bg-white flex items-center justify-center shrink-0 group-hover:bg-[#FF9933] transition-colors shadow-xs">
                <ChevronLeft className="h-4 w-4 text-[#181206]" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-[#6E777D] uppercase font-semibold">First Item</div>
                <div className="font-bold text-xs">Back to All Products</div>
              </div>
            </Link>
          )}

          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#E8DEC8] bg-white text-xs font-bold text-[#181206] hover:bg-[#FF9933] hover:border-[#FF9933] transition-colors shadow-xs cursor-pointer"
          >
            <span>All Products ({products.length})</span>
          </Link>

          {hasNext && nextProduct ? (
            <Link
              to="/product/$slug"
              params={{ slug: nextProduct.slug }}
              className="flex items-center gap-2.5 text-xs font-bold text-[#181206] hover:text-[#B45309] transition-colors group min-w-0 text-right justify-end ml-auto"
              title={`Next: ${nextProduct.name}`}
            >
              <div className="truncate text-right">
                <div className="text-[10px] text-[#6E777D] uppercase font-semibold">Next Product</div>
                <div className="truncate font-bold text-xs max-w-[120px] sm:max-w-[200px]">{nextProduct.name}</div>
              </div>
              <div className="h-8 w-8 rounded-full border border-[#E8DEC8] bg-white flex items-center justify-center shrink-0 group-hover:bg-[#FF9933] transition-colors shadow-xs">
                <ChevronRight className="h-4 w-4 text-[#181206]" />
              </div>
            </Link>
          ) : (
            <Link
              to="/shop"
              className="flex items-center gap-2 text-xs font-bold text-[#181206] hover:text-[#B45309] transition-colors group text-right justify-end ml-auto"
            >
              <div className="text-right">
                <div className="text-[10px] text-[#6E777D] uppercase font-semibold">Last Item</div>
                <div className="font-bold text-xs">Back to Shop</div>
              </div>
              <div className="h-8 w-8 rounded-full border border-[#E8DEC8] bg-white flex items-center justify-center shrink-0 group-hover:bg-[#FF9933] transition-colors shadow-xs">
                <ChevronRight className="h-4 w-4 text-[#181206]" />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Community Q&A Section */}
      <section className="border-t border-[#E8DEC8] bg-[#F5EAC4] py-8 sm:py-12">
        <div className="container-page">
          <Suspense
            fallback={
              <div className="space-y-4 py-4 animate-pulse">
                <div className="h-6 w-48 rounded bg-gray-200" />
                <div className="h-24 rounded-[6px] bg-white border border-[#E8DEC8]" />
              </div>
            }
          >
            <ProductQuestions slug={product.slug} />
          </Suspense>
        </div>
      </section>

      {/* Verified Reviews Section */}
      <section className="border-t border-[#E8DEC8] py-8 sm:py-12 bg-white">
        <Suspense
          fallback={
            <div className="container-page space-y-6 py-6 animate-pulse">
              <div className="h-8 w-56 rounded bg-gray-200" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="h-36 rounded-[6px] bg-gray-100 border border-[#E8DEC8]" />
                <div className="h-36 rounded-[6px] bg-gray-100 border border-[#E8DEC8]" />
              </div>
            </div>
          }
        >
          <ProductReviews product={product} />
        </Suspense>
      </section>

      {/* Related Formulations Grid */}
      <section className="border-t border-[#E8DEC8] bg-[#F5EAC4] py-10 sm:py-14">
        <div className="container-page space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#181206]">
                Related Formulations
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#181206] mt-1">
                Explore Alternative Y.G Formulations
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs rounded-[6px] border-[#FF9933] text-[#181206] hover:bg-[#FF9933] hover:text-white"
              asChild
            >
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

      <Suspense fallback={null}>
        <RecentlyViewed currentSlug={product.slug} />
      </Suspense>

      {/* Mobile Sticky Buy Bar */}
      <div
        role="region"
        aria-label="Add to basket"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E8DEC8] bg-white/95 px-3.5 pt-2 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] backdrop-blur-md lg:hidden shadow-lg"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] text-[#6E777D]">{variant.label}</p>
            <p className="text-base font-bold text-[#DC2626] font-mono">{formatPrice(variant.price * qty)}</p>
          </div>

          <div className="flex items-center gap-2">
            {count > 0 ? (
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`Open basket, ${count} items`}
                className="relative grid h-9 w-9 shrink-0 place-items-center rounded-[6px] border border-[#E8DEC8] bg-[#FAF3D6] text-[#181206] shadow-xs"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#FF9933] px-1 text-[9px] font-bold text-white">
                  {count}
                </span>
              </button>
            ) : null}

            <Button
              variant="outline"
              className="h-9 px-3 text-xs font-bold gap-1 rounded-[6px] border-[#FF9933] text-[#181206] hover:bg-[#FF9933] hover:text-white active:scale-95"
              disabled={soldOut || buyingNow}
              onClick={handleBuyNow}
            >
              {buyingNow ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Zap className="h-3.5 w-3.5 fill-current" />
              )}
              Buy Now
            </Button>
            <Button
              className="h-9 px-3.5 text-xs font-bold gap-1 rounded-[6px] bg-[#FF9933] hover:bg-[#E6B000] text-[#181206] font-black active:scale-95"
              disabled={soldOut}
              onClick={() => {
                add(product.slug, variant.id, qty);
                toast.success(`Added ${product.name} to basket!`);
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
