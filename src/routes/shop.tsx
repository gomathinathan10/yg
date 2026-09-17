import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid2X2,
  LayoutGrid,
  List,
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard, type ProductCardMode } from "@/components/site/ProductCard";
import { formatLabels, products, type Format } from "@/data/products";
import { cn } from "@/lib/utils";

type ShopSearch = {
  category?: string | undefined;
  format?: string | undefined;
  q?: string | undefined;
  price?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    format: typeof search["format"] === "string" ? search["format"] : undefined,
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    price: typeof search["price"] === "string" ? search["price"] : undefined,
    minPrice: typeof search["minPrice"] === "number" ? search["minPrice"] : undefined,
    maxPrice: typeof search["maxPrice"] === "number" ? search["maxPrice"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Buy Authentic Hing Online — Powders, Cakes, Health Mix & Sambrani | Y.G Asafoetida" },
      {
        name: "description",
        content:
          "Explore our authentic heritage catalog: Gold & Premium Hing Powder, Gluten-Free Hing, Solid Cakes, Granules, Traditional Sathu Maavu, Pure Benzoin Pooja Sambrani, and Vismaya traditional podis & mixes. Fast shipping across India.",
      },
      {
        name: "keywords",
        content:
          "buy hing online, asafoetida powder price, pure gold hing cake, gluten free hing powder, traditional health mix, sathu maavu online, pure benzoin pooja sambrani, vismaya podi, buy hing in India",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ygasafoetida.in/shop" },
      { property: "og:title", content: "Buy Authentic Hing, Health Mix & Sambrani — Y.G Asafoetida" },
      {
        property: "og:description",
        content:
          "Explore authentic heritage preparations: Gold & Premium Hing Powder, Gluten-Free Hing, Solid Cakes, Granules, Traditional Sathu Maavu, Pure Benzoin Pooja Sambrani, and Vismaya podis.",
      },
      { property: "og:image", content: "https://ygasafoetida.in/products/all-product/img-1.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shop Authentic Heritage Hing — Y.G Asafoetida" },
      {
        name: "twitter:description",
        content:
          "Explore authentic heritage preparations: Hing powders, solid cakes, gluten-free, health mix, pooja sambrani, and Vismaya traditional podis.",
      },
      { name: "twitter:image", content: "https://ygasafoetida.in/products/all-product/img-1.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ygasafoetida.in/shop" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Y.G Asafoetida & Traditional Products Store",
          "description": "Authentic compounded hing powders, solid cakes, traditional health mix, and pooja sambrani.",
          "url": "https://ygasafoetida.in/shop",
          "breadcrumb": {
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
              }
            ]
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": products.map((p, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": p.name,
              "url": `https://ygasafoetida.in/product/${p.slug}`,
              "image": `https://ygasafoetida.in/products/${p.slug}/img-1.jpg`
            }))
          }
        }),
      },
    ],
  }),
  component: ShopPage,
});

const filterCategories: Array<{ id: Format | "all" | "gf"; label: string }> = [
  { id: "all", label: "All Categories" },
  { id: "powder", label: formatLabels.powder },
  { id: "granules", label: formatLabels.granules },
  { id: "cake", label: formatLabels.cake },
  { id: "combo", label: formatLabels.combo },
  { id: "wellness", label: formatLabels.wellness },
  { id: "pooja", label: formatLabels.pooja },
  { id: "appalam", label: formatLabels.appalam },
  { id: "vismaya", label: formatLabels.vismaya },
];

export const PRICE_PRESETS = [
  { id: "all", label: "All Prices", min: 18, max: 2000, shortLabel: "All" },
  { id: "under-50", label: "Under ₹50", min: 18, max: 50, shortLabel: "< ₹50", badge: "Covers & Mini" },
  { id: "50-100", label: "₹50 — ₹100", min: 50, max: 100, shortLabel: "₹50-100", badge: "Trays & Sambrani" },
  { id: "100-250", label: "₹100 — ₹250", min: 100, max: 250, shortLabel: "₹100-250", badge: "100g & Podis" },
  { id: "250-500", label: "₹250 — ₹500", min: 250, max: 500, shortLabel: "₹250-500", badge: "Containers & Jars" },
  { id: "above-500", label: "₹500 & Above", min: 500, max: 2000, shortLabel: "> ₹500", badge: "Pouches & Hampers" },
] as const;

export type PricePresetId = (typeof PRICE_PRESETS)[number]["id"];

function ShopPage() {
  const search = Route.useSearch();
  const initialCat = (search.category || search.format || "all") as Format | "all" | "gf";
  const [filter, setFilter] = useState<Format | "all" | "gf">(() => {
    if (filterCategories.some((c) => c.id === initialCat)) {
      return initialCat;
    }
    return "all";
  });

  useEffect(() => {
    const target = (search.category || search.format) as Format | "all" | "gf" | undefined;
    if (target && filterCategories.some((c) => c.id === target)) {
      setFilter(target);
    }
  }, [search.category, search.format]);

  const [sort, setSort] = useState("featured");
  const [viewMode, setViewMode] = useState<ProductCardMode>("compact");
  const [minPrice, setMinPrice] = useState<number>(() => {
    if (typeof search.minPrice === "number") return search.minPrice;
    const match = PRICE_PRESETS.find((p) => p.id === search.price);
    return match ? match.min : 18;
  });
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    if (typeof search.maxPrice === "number") return search.maxPrice;
    const match = PRICE_PRESETS.find((p) => p.id === search.price);
    return match ? match.max : 2000;
  });
  const [selectedPreset, setSelectedPreset] = useState<string>(() => {
    if (search.price && PRICE_PRESETS.some((p) => p.id === search.price)) {
      return search.price;
    }
    return "all";
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Category product counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: products.length,
      gf: products.filter((p) => p.glutenFree).length,
    };
    filterCategories.forEach((fc) => {
      if (fc.id !== "all" && fc.id !== "gf") {
        counts[fc.id] = products.filter((p) => p.format === fc.id).length;
      }
    });
    return counts;
  }, []);

  // Price preset counts based on actual variant prices
  const pricePresetCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PRICE_PRESETS.forEach((preset) => {
      counts[preset.id] = products.filter((p) => {
        return p.variants.some((v) => v.price >= preset.min && v.price <= preset.max);
      }).length;
    });
    return counts;
  }, []);

  const visible = useMemo(() => {
    let list = products.filter((p) => {
      if (filter === "gf") {
        if (!p.glutenFree) return false;
      } else if (filter !== "all") {
        if (p.format !== filter) return false;
      }
      const hasVariantInRange = p.variants.some(
        (v) => v.price >= minPrice && v.price <= maxPrice
      );
      if (!hasVariantInRange) return false;
      return true;
    });

    if (sort === "low") {
      list = [...list].sort((a, b) => a.variants[0]!.price - b.variants[0]!.price);
    } else if (sort === "high") {
      list = [...list].sort((a, b) => b.variants[0]!.price - a.variants[0]!.price);
    } else if (sort === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filter, sort, minPrice, maxPrice]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset to page 1 whenever filters or search criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sort, minPrice, maxPrice]);

  const totalPages = Math.ceil(visible.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return visible.slice(start, start + itemsPerPage);
  }, [visible, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-white font-sans pb-16">
      {/* Ekomart Breadcrumb Bar */}
      <div className="border-b border-[#E8DEC8] bg-[#F5EAC4] py-3.5">
        <div className="container-page flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#6E777D]">
            <Link to="/" className="hover:text-[#181206] transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-[#A0A8B0]" />
            <Link
              to="/shop"
              onClick={() => {
                setFilter("all");
                setMinPrice(18);
                setMaxPrice(2000);
                setSelectedPreset("all");
                setCurrentPage(1);
              }}
              className={cn(
                "transition-colors font-semibold cursor-pointer",
                filter === "all"
                  ? "text-[#181206]"
                  : "text-[#6E777D] hover:text-[#181206] hover:underline"
              )}
            >
              Shop
            </Link>
            {filter !== "all" && (
              <>
                <ChevronRight className="h-3 w-3 text-[#A0A8B0]" />
                <span className="font-bold text-[#181206] capitalize">
                  {filterCategories.find((c) => c.id === filter)?.label || filter}
                </span>
              </>
            )}
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-[#181206] bg-[#FFC700]/10 px-2.5 py-0.5 rounded-[4px]">
            100% Authentic Heritage
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="container-page pt-6 sm:pt-8">
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between lg:hidden mb-4 bg-white p-3.5 rounded-[6px] border border-[#E8DEC8] shadow-xs">
          <div className="text-xs font-semibold text-[#181206]">
            Showing <span className="text-[#181206]">{visible.length}</span> Products
          </div>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#FFC700] text-[#181206] font-black text-xs font-semibold shadow-xs"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Area (Ekomart Sidebar Filter) */}
          <aside
            className={`lg:col-span-1 space-y-6 ${
              mobileFilterOpen ? "block fixed inset-0 z-50 bg-black/50 p-4 overflow-y-auto" : "hidden lg:block"
            }`}
          >
            <div
              className={`${
                mobileFilterOpen
                  ? "bg-white p-6 rounded-[8px] max-w-sm mx-auto my-8 relative shadow-2xl"
                  : "space-y-6"
              }`}
            >
              {mobileFilterOpen && (
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8DEC8]">
                  <h3 className="font-bold text-[#181206] text-base">Filters</h3>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-[#6E777D] hover:text-[#181206]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Widget 1: Categories with Counts */}
              <div className="rounded-[6px] border border-[#E8DEC8] bg-white p-5 shadow-xs">
                <h3 className="text-sm font-bold text-[#181206] uppercase tracking-wider pb-3 border-b border-[#E8DEC8] flex items-center justify-between">
                  <span>Categories</span>
                  <span className="text-[11px] font-normal lowercase text-[#6E777D]">
                    {products.length} items
                  </span>
                </h3>
                <div className="mt-4 space-y-2">
                  {filterCategories.map((c) => {
                    const active = filter === c.id;
                    const count = categoryCounts[c.id] ?? 0;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setFilter(c.id);
                          if (mobileFilterOpen) setMobileFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-xs font-semibold transition-all duration-200 text-left cursor-pointer active:scale-98 ${
                          active
                            ? "bg-[#FFC700] text-[#181206] font-black shadow-xs border border-[#D8A700] translate-x-1"
                            : "text-[#181206] hover:bg-[#FAF3D6] hover:text-[#181206] hover:translate-x-1"
                        }`}
                      >
                        <span className="truncate">{c.label}</span>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold transition-all ${
                            active
                              ? "bg-[#181206] text-[#FFC700] shadow-2xs"
                              : "bg-[#FAF3D6] text-[#6E777D]"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Widget 2: Price Filter Aligned to Official Price List */}
              <div className="rounded-[6px] border border-[#E8DEC8] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
                  <h3 className="text-sm font-bold text-[#181206] uppercase tracking-wider">
                    Price Filter
                  </h3>
                </div>
                <div className="mt-4 space-y-2">
                  {PRICE_PRESETS.map((preset) => {
                    const active = selectedPreset === preset.id;
                    const count = pricePresetCounts[preset.id] ?? 0;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedPreset(preset.id);
                          setMinPrice(preset.min);
                          setMaxPrice(preset.max);
                          if (mobileFilterOpen) setMobileFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-xs font-semibold transition-all duration-200 text-left cursor-pointer active:scale-98 ${
                          active
                            ? "bg-[#FFC700] text-[#181206] font-black shadow-xs border border-[#D8A700] translate-x-1"
                            : "text-[#181206] hover:bg-[#FAF3D6] hover:text-[#181206] hover:translate-x-1"
                        }`}
                      >
                        <span className="truncate">{preset.label}</span>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold transition-all ${
                            active
                              ? "bg-[#181206] text-[#FFC700] shadow-2xs"
                              : "bg-[#FAF3D6] text-[#6E777D]"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Widget 3: Authenticity Guarantee Card */}
              <div className="rounded-[6px] border border-[#FFC700]/20 bg-[#FAF3D6] p-4 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#FFC700] text-[#181206] font-black flex items-center justify-center font-bold text-lg mb-2 shadow-xs">
                  YG
                </div>
                <h4 className="text-xs font-bold text-[#181206]">Direct From Tirunelveli</h4>
                <p className="text-[11px] text-[#6E777D] mt-1 leading-relaxed">
                  Every product is packaged fresh with batch serial numbers &amp; tamper-evident safety seals.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Product Grid Area */}
          <main className="lg:col-span-3">
            {/* Top Toolbar (Ekomart Shop Top Filter) */}
            <div className="rounded-[6px] border border-[#E8DEC8] bg-white p-3.5 sm:p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#6E777D] flex flex-wrap items-center gap-2.5">
                <span>
                  Showing{" "}
                  <span className="font-bold text-[#181206]">
                    {visible.length === 0
                      ? 0
                      : `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, visible.length)}`}
                  </span>{" "}
                  of <span className="font-bold text-[#181206]">{visible.length}</span> products
                </span>

                {/* Top Pagination Navigation Controls */}
                {totalPages > 1 && (
                  <div className="inline-flex items-center gap-1 bg-[#FAF3D6] p-0.5 rounded-[6px] border border-[#E8DEC8]">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 200, behavior: "smooth" });
                      }}
                      disabled={currentPage === 1}
                      title="Previous Page"
                      aria-label="Previous Page"
                      className="h-6 w-6 rounded-[4px] bg-white border border-[#E8DEC8] flex items-center justify-center disabled:opacity-30 hover:bg-[#FFC700] transition-colors cursor-pointer disabled:cursor-not-allowed active:scale-95"
                    >
                      <ChevronLeft className="h-3 w-3 text-[#181206]" />
                    </button>
                    <span className="text-[11px] font-bold text-[#181206] px-1 font-mono">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 200, behavior: "smooth" });
                      }}
                      disabled={currentPage === totalPages}
                      title="Next Page"
                      aria-label="Next Page"
                      className="h-6 w-6 rounded-[4px] bg-white border border-[#E8DEC8] flex items-center justify-center disabled:opacity-30 hover:bg-[#FFC700] transition-colors cursor-pointer disabled:cursor-not-allowed active:scale-95"
                    >
                      <ChevronRight className="h-3 w-3 text-[#181206]" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                {/* View Switchers */}
                <div className="flex items-center rounded-[6px] border border-[#E8DEC8] bg-[#FAF3D6] p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("compact")}
                    title="Compact Grid"
                    aria-label="Compact Grid"
                    className={`flex items-center gap-1.5 rounded-[4px] px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      viewMode === "compact"
                        ? "bg-white text-[#181206] shadow-xs font-bold"
                        : "text-[#6E777D] hover:text-[#181206]"
                    }`}
                  >
                    <Grid2X2 className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Grid</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("default")}
                    title="Comfortable Cards"
                    aria-label="Comfortable Cards"
                    className={`flex items-center gap-1.5 rounded-[4px] px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      viewMode === "default"
                        ? "bg-white text-[#181206] shadow-xs font-bold"
                        : "text-[#6E777D] hover:text-[#181206]"
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Detailed</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    title="List View"
                    aria-label="List View"
                    className={`flex items-center gap-1.5 rounded-[4px] px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      viewMode === "list"
                        ? "bg-white text-[#181206] shadow-xs font-bold"
                        : "text-[#6E777D] hover:text-[#181206]"
                    }`}
                  >
                    <List className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">List</span>
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-[#6E777D] hidden sm:block" />
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="h-9 w-36 sm:w-44 text-xs rounded-[6px] border-[#E8DEC8] bg-white text-[#181206] font-medium">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[6px] border-[#E8DEC8]">
                      <SelectItem value="featured" className="text-xs font-medium">
                        Sort: Featured
                      </SelectItem>
                      <SelectItem value="low" className="text-xs font-medium">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="high" className="text-xs font-medium">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating" className="text-xs font-medium">
                        Customer Rating
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Active Filter Pill Tags */}
            {(filter !== "all" || minPrice > 18 || maxPrice < 2000 || selectedPreset !== "all") && (
              <div className="flex flex-wrap items-center gap-2 mb-4 animate-in fade-in-50 duration-200">
                <span className="text-xs text-[#6E777D]">Active Filters:</span>
                {filter !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFC700] text-[#181206] border border-[#D8A700] shadow-2xs">
                    Category: {filterCategories.find((c) => c.id === filter)?.label}
                    <button
                      type="button"
                      onClick={() => setFilter("all")}
                      className="hover:text-red-700 ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {(minPrice > 18 || maxPrice < 2000 || selectedPreset !== "all") && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFC700] text-[#181206] border border-[#D8A700] shadow-2xs">
                    {selectedPreset !== "all" && selectedPreset !== "custom"
                      ? `Price: ${PRICE_PRESETS.find((p) => p.id === selectedPreset)?.label}`
                      : `Price: ₹${minPrice} — ₹${maxPrice}`}
                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice(18);
                        setMaxPrice(2000);
                        setSelectedPreset("all");
                      }}
                      className="hover:text-red-700 ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Product Display Area with Staggered Entrance Animations */}
            {viewMode === "compact" && (
              <div
                key={`compact-${currentPage}-${filter}-${sort}`}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 animate-in fade-in-50 duration-300"
              >
                {paginated.map((p, i) => (
                  <div
                    key={p.slug}
                    className="animate-fade-in-up h-full"
                    style={{ animationDelay: `${(i % 9) * 45}ms` }}
                  >
                    <ProductCard product={p} priority={i < 6} mode="compact" />
                  </div>
                ))}
              </div>
            )}

            {viewMode === "default" && (
              <div
                key={`default-${currentPage}-${filter}-${sort}`}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 animate-in fade-in-50 duration-300"
              >
                {paginated.map((p, i) => (
                  <div
                    key={p.slug}
                    className="animate-fade-in-up h-full"
                    style={{ animationDelay: `${(i % 6) * 55}ms` }}
                  >
                    <ProductCard product={p} priority={i < 4} mode="default" />
                  </div>
                ))}
              </div>
            )}

            {viewMode === "list" && (
              <div
                key={`list-${currentPage}-${filter}-${sort}`}
                className="flex flex-col gap-3 sm:gap-4 animate-in fade-in-50 duration-300"
              >
                {paginated.map((p, i) => (
                  <div
                    key={p.slug}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${(i % 6) * 50}ms` }}
                  >
                    <ProductCard product={p} priority={i < 4} mode="list" />
                  </div>
                ))}
              </div>
            )}

            {/* Working Pagination Bar with Next and Previous Buttons */}
            {totalPages > 1 && (
              <div className="mt-8 pt-6 border-t border-[#E8DEC8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#6E777D]">
                  Showing <span className="font-bold text-[#181206]">{(currentPage - 1) * itemsPerPage + 1}</span> -{" "}
                  <span className="font-bold text-[#181206]">{Math.min(currentPage * itemsPerPage, visible.length)}</span> of{" "}
                  <span className="font-bold text-[#181206]">{visible.length}</span> products
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 200, behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    className="h-9 px-3.5 rounded-[6px] border border-[#E8DEC8] bg-white text-xs font-semibold text-[#181206] hover:bg-[#FAF3D6] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs flex items-center gap-1 active:scale-95"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 200, behavior: "smooth" });
                        }}
                        className={cn(
                          "h-9 w-9 rounded-[6px] text-xs font-bold transition-all cursor-pointer shadow-xs",
                          currentPage === pageNum
                            ? "bg-[#FFC700] text-[#181206] border border-[#FFC700] font-black"
                            : "bg-white text-[#181206] border border-[#E8DEC8] hover:bg-[#FAF3D6]"
                        )}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 200, behavior: "smooth" });
                    }}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3.5 rounded-[6px] border border-[#FFC700] bg-[#FFC700] text-xs font-bold text-[#181206] hover:bg-[#E6B000] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs flex items-center gap-1 active:scale-95"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {visible.length === 0 && (
              <div className="py-16 text-center rounded-[6px] border border-[#E8DEC8] bg-white p-8">
                <p className="text-[#6E777D] text-sm">No products match this filter criteria.</p>
                <Button
                  className="mt-4 bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] font-black rounded-[6px] px-5 py-2 text-xs font-bold"
                  onClick={() => {
                    setFilter("all");
                    setMinPrice(18);
                    setMaxPrice(2000);
                    setSelectedPreset("all");
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

