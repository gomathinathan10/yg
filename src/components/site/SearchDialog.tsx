import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  ArrowRight,
  ShoppingBag,
  Package,
  History,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice, useLiveProducts, searchProductsIn, formatLabels } from "@/data/products";
import { SmartImage } from "@/components/site/SmartImage";

const QUICK_SUGGESTIONS = [
  "Gold Powder",
  "Solid Cake",
  "Gluten-Free",
  "Granules",
  "Appalam",
  "Vismaya",
  "Health Mix",
  "Sambrani",
  "Combo Box",
  "100g",
];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const allProducts = useLiveProducts();

  // Auto focus input whenever dialog opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(t);
    }
    setQuery("");
    return undefined;
  }, [open]);

  // Product hits
  const productHits = useMemo(() => {
    const q = query.trim();
    if (!q) {
      // Show bestsellers and signature products by default
      return allProducts.filter((p) => p.bestseller || p.format === "powder" || p.format === "cake").slice(0, 6);
    }
    return searchProductsIn(allProducts, q);
  }, [query, allProducts]);

  const handleSelectProduct = (slug: string) => {
    onOpenChange(false);
    void navigate({
      to: "/product/$slug",
      params: { slug },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (productHits.length > 0) {
        handleSelectProduct(productHits[0]!.slug);
      } else {
        onOpenChange(false);
        void navigate({ to: "/shop" });
      }
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  const hasResults = productHits.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl overflow-hidden p-0 gap-0 rounded-[6px] shadow-2xl border border-[#E8DEC8] bg-white">
        <DialogTitle className="sr-only">Search Y.G Asafoetida</DialogTitle>
        <DialogDescription className="sr-only">
          Search for artisanal hing powders, solid cakes, gluten-free formulations, appalam, and wellness mixes
        </DialogDescription>

        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#E8DEC8] bg-[#F4F4F5] px-3.5 sm:px-4 py-1">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-[#181206] shrink-0 mr-2.5" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search hing, powder, cake, granules, appalam..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-12 sm:h-14 w-full bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground outline-hidden pr-20"
          />

          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-11 top-1/2 -translate-y-1/2 p-1 text-xs text-muted-foreground hover:text-foreground rounded-[4px] transition-colors"
              aria-label="Clear search query"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-3.5 sm:px-4 py-2 bg-white border-b border-[#E8DEC8] scrollbar-none">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground shrink-0 mr-1">
            Popular:
          </span>
          {QUICK_SUGGESTIONS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setQuery(tag);
                inputRef.current?.focus();
              }}
              className={`px-2.5 py-1 rounded-[4px] text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                query.toLowerCase() === tag.toLowerCase()
                  ? "bg-[#FF9933] text-[#181206] font-black font-bold shadow-xs"
                  : "bg-[#F4F4F5] border border-[#E8DEC8] text-muted-foreground hover:text-[#181206] hover:border-[#FF9933]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List Area */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#E2E2E2]/60 p-2 sm:p-3 space-y-4">
          {/* No results state */}
          {!hasResults && query.trim() ? (
            <div className="py-10 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-[#F4F4F5] border border-[#E8DEC8] flex items-center justify-center mx-auto text-muted-foreground">
                <Search className="h-5 w-5 text-[#181206]" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm sm:text-base">
                  No direct match for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Try searching for general terms like &ldquo;powder&rdquo;, &ldquo;cake&rdquo;, &ldquo;gluten-free&rdquo;, or &ldquo;rasam&rdquo;.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 font-bold border-[#FF9933] text-[#181206] hover:bg-[#FF9933] hover:text-white rounded-[6px]"
                onClick={() => {
                  onOpenChange(false);
                  void navigate({ to: "/shop" });
                }}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Browse All {allProducts.length} Products in Shop
              </Button>
            </div>
          ) : null}

          {/* Product hits section */}
          {productHits.length > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-2 pt-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {query.trim() ? `Matching Formulations (${productHits.length})` : "Featured Hing Formulations"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    void navigate({ to: "/shop" });
                  }}
                  className="text-[11px] text-[#181206] hover:underline font-bold"
                >
                  View all in Shop
                </button>
              </div>

              <div className="space-y-1">
                {productHits.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => handleSelectProduct(p.slug)}
                    className="w-full flex items-center gap-3 p-2 rounded-[6px] text-left transition-all hover:bg-[#F4F4F5] group cursor-pointer border border-transparent hover:border-[#E8DEC8]"
                  >
                    <SmartImage
                      src={p.image}
                      alt={p.name}
                      wrapperClassName="h-12 w-12 shrink-0 rounded-[6px] overflow-hidden bg-[#F4F4F5] border border-[#E8DEC8]"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm text-[#181206] group-hover:text-[#181206] transition-colors truncate">
                          {p.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-[4px] bg-[#F4F4F5] text-[#4A5568] border border-[#E8DEC8] font-semibold uppercase">
                          {formatLabels[p.format]}
                        </span>
                        {p.bestseller ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-[4px] bg-[#EABC5E]/20 text-[#A67C1E] border border-[#EABC5E]/40 font-bold">
                            Bestseller
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                        {p.tagline}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-bold text-xs sm:text-sm text-[#DC2626] block">
                        {formatPrice(p.variants[0]!.price)}
                      </span>
                      <span className="text-[10px] text-[#181206] flex items-center gap-0.5 justify-end group-hover:translate-x-0.5 transition-transform font-bold">
                        View <ArrowRight className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}



          {/* Quick Destination Links */}
          <div className="pt-2">
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  void navigate({ to: "/shop" });
                }}
                className="p-2 rounded-[6px] border border-[#E8DEC8] bg-[#F4F4F5] hover:bg-[#FF9933]/10 hover:border-[#FF9933]/40 text-center transition-all group cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4 mx-auto mb-1 text-[#181206] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-[#181206] block">Shop All</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  void navigate({ to: "/track" });
                }}
                className="p-2 rounded-[6px] border border-[#E8DEC8] bg-[#F4F4F5] hover:bg-[#FF9933]/10 hover:border-[#FF9933]/40 text-center transition-all group cursor-pointer"
              >
                <Package className="h-4 w-4 mx-auto mb-1 text-[#181206] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-[#181206] block">Track Order</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  void navigate({ to: "/story" });
                }}
                className="p-2 rounded-[6px] border border-[#E8DEC8] bg-[#F4F4F5] hover:bg-[#FF9933]/10 hover:border-[#FF9933]/40 text-center transition-all group cursor-pointer"
              >
                <History className="h-4 w-4 mx-auto mb-1 text-[#181206] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-[#181206] block">Since 1932</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Key hint */}
        <div className="p-2.5 bg-[#F4F4F5] border-t border-[#E8DEC8] flex items-center justify-between text-[11px] text-muted-foreground px-4">
          <span>
            Press <kbd className="px-1.5 py-0.5 rounded-[4px] bg-white border border-[#E8DEC8] font-mono text-[10px]">Enter</kbd> to select
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded-[4px] bg-white border border-[#E8DEC8] font-mono text-[10px]">Esc</kbd> to close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
