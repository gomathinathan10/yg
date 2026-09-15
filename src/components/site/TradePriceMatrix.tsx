import { useState, useMemo } from "react";
import {
  Building2,
  Calculator,
  Check,
  ChevronRight,
  Copy,
  Download,
  FileSpreadsheet,
  Filter,
  HelpCircle,
  Info,
  MessageSquare,
  Percent,
  Printer,
  Search,
  Sparkles,
  Tag,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TRADE_PRODUCTS,
  PRICE_TIERS,
  formatIndianCurrency,
  type TradeProduct,
  type PriceTierKey,
} from "@/data/trade-pricing";
import { toast } from "sonner";

export const TRADE_PRICE_BRACKETS = [
  { id: "all", label: "All Prices", min: 0, max: 99999 },
  { id: "under-50", label: "Under ₹50 MRP", min: 0, max: 50 },
  { id: "50-200", label: "₹50 — ₹200 MRP", min: 50, max: 200 },
  { id: "200-500", label: "₹200 — ₹500 MRP", min: 200, max: 500 },
  { id: "above-500", label: "₹500+ MRP", min: 500, max: 99999 },
] as const;

export type TradePriceBracketId = (typeof TRADE_PRICE_BRACKETS)[number]["id"];

export function TradePriceMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "powder" | "cake">("all");
  const [selectedPriceBracket, setSelectedPriceBracket] = useState<TradePriceBracketId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedTier, setFocusedTier] = useState<PriceTierKey | "all">("all");
  const [copied, setCopied] = useState(false);

  // Trade Calculator State
  const [calcProductId, setCalcProductId] = useState<string>(TRADE_PRODUCTS[2]!.id); // 50g tray default
  const [calcTier, setCalcTier] = useState<PriceTierKey>("dist");
  const [calcPacks, setCalcPacks] = useState<number>(10);

  // Count items matching each price bracket
  const priceBracketCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TRADE_PRICE_BRACKETS.forEach((b) => {
      counts[b.id] = TRADE_PRODUCTS.filter((p) => {
        const matchCat = selectedCategory === "all" || p.category === selectedCategory;
        return matchCat && p.mrp >= b.min && p.mrp <= b.max;
      }).length;
    });
    return counts;
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return TRADE_PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const bracket = TRADE_PRICE_BRACKETS.find((b) => b.id === selectedPriceBracket);
      const matchPrice = !bracket || (p.mrp >= bracket.min && p.mrp <= bracket.max);
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.packType.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q);
      return matchCat && matchPrice && matchQuery;
    });
  }, [selectedCategory, selectedPriceBracket, searchQuery]);

  const activeCalcProduct = useMemo(() => {
    return TRADE_PRODUCTS.find((p) => p.id === calcProductId) || TRADE_PRODUCTS[0]!;
  }, [calcProductId]);

  // Calculations for order estimation
  const calcUnitPrice = useMemo(() => {
    switch (calcTier) {
      case "cf":
        return activeCalcProduct.cfPrice;
      case "ss":
        return activeCalcProduct.ssPrice;
      case "dist":
        return activeCalcProduct.distPrice;
      case "direct":
        return activeCalcProduct.directPrice ?? activeCalcProduct.distPrice;
      case "mt":
        return activeCalcProduct.mtPrice ?? activeCalcProduct.distPrice;
      case "mrp":
        return activeCalcProduct.mrp;
      default:
        return activeCalcProduct.distPrice;
    }
  }, [activeCalcProduct, calcTier]);

  const totalUnits = calcPacks * activeCalcProduct.packQty;
  const totalInvoice = totalUnits * calcUnitPrice;
  const totalMrpValue = totalUnits * activeCalcProduct.mrp;
  const grossMargin = totalMrpValue > 0 ? ((totalMrpValue - totalInvoice) / totalMrpValue) * 100 : 0;

  const copyTableToClipboard = () => {
    let tsv = "Product\tPack Qty\tCF Price/Unit\tMT Price/Unit\tDirect Price/Unit\tDist. Price/Unit\tS.S Price/Unit\tMRP\n";
    for (const p of TRADE_PRODUCTS) {
      tsv += `${p.name}\t${p.packQty}\t${formatIndianCurrency(p.cfPrice)}\t${p.mtPrice ? formatIndianCurrency(p.mtPrice) : "—"}\t${p.directPrice ? formatIndianCurrency(p.directPrice) : "—"}\t${formatIndianCurrency(p.distPrice)}\t${formatIndianCurrency(p.ssPrice)}\t${formatIndianCurrency(p.mrp)}\n`;
    }
    navigator.clipboard.writeText(tsv);
    setCopied(true);
    toast.success("Trade price list copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const openWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello Y.G Asafoetida Trade Team, I would like an institutional trade quotation for:\n\n` +
        `Product: ${activeCalcProduct.name}\n` +
        `Pack Quantity: ${calcPacks} Master Packs (${totalUnits} Units)\n` +
        `Target Commercial Tier: ${PRICE_TIERS.find((t) => t.key === calcTier)?.fullName || calcTier.toUpperCase()}\n` +
        `Estimated Rate: ${formatIndianCurrency(calcUnitPrice)} / unit\n` +
        `Estimated Subtotal: ${formatIndianCurrency(totalInvoice)}\n\n` +
        `Please confirm freight terms, dispatch lead time, and GST invoice details.`
    );
    window.open(`https://wa.me/919842100000?text=${text}`, "_blank");
  };

  return (
    <section id="trade-pricing" className="py-12 sm:py-20 bg-background border-b border-border">
      <div className="container-page space-y-10">
        {/* Header Title & Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              <Tag className="h-3.5 w-3.5" />
              <span>Official Commercial Distribution Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Products &amp; Commercial Price List
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Standard commercial rate card for C&amp;F agents, modern retail chains, direct supermarket partners,
              regional wholesale distributors, and super stockists across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={copyTableToClipboard}
              className="text-xs font-semibold gap-1.5 h-9"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied Table" : "Copy Matrix"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="text-xs font-semibold gap-1.5 h-9"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </Button>
            <Button
              size="sm"
              onClick={openWhatsAppOrder}
              className="text-xs font-bold gap-1.5 h-9 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp Trade Desk</span>
            </Button>
          </div>
        </div>

        {/* Tier Information Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PRICE_TIERS.map((tier) => {
            const isSelected = focusedTier === tier.key;
            return (
              <button
                key={tier.key}
                type="button"
                onClick={() => setFocusedTier(isSelected ? "all" : tier.key)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                    : "border-border/80 bg-card hover:border-border hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tier.badgeColor}`}>
                    {tier.label}
                  </span>
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-xs font-bold text-foreground truncate">{tier.fullName}</p>
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-snug">
                  {tier.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-muted/50 rounded-xl border border-border/80 overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All SKUs (10)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("powder")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === "powder"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              YG Gold Powder (7)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("cake")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === "cake"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              YG Gold Cake (3)
            </button>
          </div>

          {/* Price Range Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-muted/40 rounded-xl border border-border/70 overflow-x-auto">
            {TRADE_PRICE_BRACKETS.map((b) => {
              const isActive = selectedPriceBracket === b.id;
              const count = priceBracketCounts[b.id] ?? 0;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedPriceBracket(b.id)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#FFC700] text-[#181206] font-bold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                  }`}
                >
                  <span>{b.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-black/10 text-[#181206]" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product, pack type..."
              className="pl-9 h-9 text-xs bg-card"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Pricing Matrix Table */}
        <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-bold text-foreground uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 sticky left-0 bg-muted/40 z-10 sm:min-w-[220px]">
                    Product Name
                  </th>
                  <th className="py-3.5 px-3 text-right">Pack Qty</th>
                  <th
                    className={`py-3.5 px-3 text-right transition-colors ${
                      focusedTier === "cf" ? "bg-blue-500/10 text-blue-800 dark:text-blue-300 font-black" : ""
                    }`}
                  >
                    CF Price/Unit
                  </th>
                  <th
                    className={`py-3.5 px-3 text-right transition-colors ${
                      focusedTier === "mt" ? "bg-teal-500/10 text-teal-800 dark:text-teal-300 font-black" : ""
                    }`}
                  >
                    MT Price/Unit
                  </th>
                  <th
                    className={`py-3.5 px-3 text-right transition-colors ${
                      focusedTier === "direct" ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-black" : ""
                    }`}
                  >
                    Direct Price/Unit
                  </th>
                  <th
                    className={`py-3.5 px-3 text-right transition-colors ${
                      focusedTier === "dist" ? "bg-amber-500/10 text-amber-800 dark:text-amber-300 font-black" : ""
                    }`}
                  >
                    Dist. Price/Unit
                  </th>
                  <th
                    className={`py-3.5 px-3 text-right transition-colors ${
                      focusedTier === "ss" ? "bg-purple-500/10 text-purple-800 dark:text-purple-300 font-black" : ""
                    }`}
                  >
                    S.S Price/Unit
                  </th>
                  <th
                    className={`py-3.5 px-4 text-right transition-colors ${
                      focusedTier === "mrp" ? "bg-red-500/10 text-red-800 dark:text-red-300 font-black" : ""
                    }`}
                  >
                    MRP
                  </th>
                  <th className="py-3.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredProducts.map((p) => {
                  const isSelected = calcProductId === p.id;
                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-muted/30 transition-colors ${
                        isSelected ? "bg-primary/5 font-medium" : ""
                      }`}
                    >
                      {/* Product Name & Format */}
                      <td className="py-3.5 px-4 sticky left-0 bg-card z-10 border-r border-border/40">
                        <div className="space-y-0.5">
                          <p className="font-bold text-foreground text-xs">{p.name}</p>
                          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                            <span className="font-semibold text-primary">{p.categoryLabel}</span>
                            <span>•</span>
                            <span>{p.packType}</span>
                            <span>•</span>
                            <span>{p.weightGrams >= 1000 ? `${p.weightGrams / 1000} kg` : `${p.weightGrams}g`}</span>
                          </div>
                        </div>
                      </td>

                      {/* Pack Qty */}
                      <td className="py-3.5 px-3 text-right font-semibold text-foreground/90">
                        <span className="px-2 py-0.5 rounded bg-muted font-mono text-[11px]">
                          {p.packQty}
                        </span>
                      </td>

                      {/* CF Price */}
                      <td
                        className={`py-3.5 px-3 text-right font-mono font-medium ${
                          focusedTier === "cf" ? "bg-blue-500/10 text-blue-900 dark:text-blue-300 font-bold" : "text-foreground"
                        }`}
                      >
                        {formatIndianCurrency(p.cfPrice)}
                      </td>

                      {/* MT Price */}
                      <td
                        className={`py-3.5 px-3 text-right font-mono ${
                          focusedTier === "mt" ? "bg-teal-500/10 text-teal-900 dark:text-teal-300 font-bold" : ""
                        } ${p.mtPrice === null ? "text-muted-foreground/60" : "font-medium text-foreground"}`}
                      >
                        {p.mtPrice ? formatIndianCurrency(p.mtPrice) : "—"}
                      </td>

                      {/* Direct Price */}
                      <td
                        className={`py-3.5 px-3 text-right font-mono ${
                          focusedTier === "direct" ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-bold" : ""
                        } ${p.directPrice === null ? "text-muted-foreground/60" : "font-medium text-foreground"}`}
                      >
                        {p.directPrice ? formatIndianCurrency(p.directPrice) : "—"}
                      </td>

                      {/* Dist Price */}
                      <td
                        className={`py-3.5 px-3 text-right font-mono font-bold ${
                          focusedTier === "dist" ? "bg-amber-500/10 text-amber-900 dark:text-amber-300" : "text-amber-700 dark:text-amber-400"
                        }`}
                      >
                        {formatIndianCurrency(p.distPrice)}
                      </td>

                      {/* SS Price */}
                      <td
                        className={`py-3.5 px-3 text-right font-mono font-medium ${
                          focusedTier === "ss" ? "bg-purple-500/10 text-purple-900 dark:text-purple-300 font-bold" : "text-purple-700 dark:text-purple-400"
                        }`}
                      >
                        {formatIndianCurrency(p.ssPrice)}
                      </td>

                      {/* MRP */}
                      <td
                        className={`py-3.5 px-4 text-right font-mono font-black ${
                          focusedTier === "mrp" ? "bg-red-500/10 text-red-900 dark:text-red-300" : "text-foreground"
                        }`}
                      >
                        {formatIndianCurrency(p.mrp)}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-3 text-center">
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCalcProductId(p.id)}
                          className="h-7 text-[11px] font-bold px-2.5"
                        >
                          {isSelected ? "Selected" : "Quote"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Order & Margin Estimator */}
        <div className="rounded-2xl border border-primary/20 bg-card p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-primary tracking-wider flex items-center gap-1.5">
                <Calculator className="h-4 w-4" /> Quick Institutional Order &amp; Margin Estimator
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                Estimate Invoice &amp; Trade Margin for {activeCalcProduct.name}
              </h3>
            </div>
            <div className="text-xs text-muted-foreground">
              Pack Size: <span className="font-bold text-foreground">{activeCalcProduct.packQty} units/master pack</span>
            </div>
          </div>

          {/* Calculator Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">Selected SKU</label>
              <select
                value={calcProductId}
                onChange={(e) => setCalcProductId(e.target.value)}
                className="w-full h-10 px-3 text-xs rounded-lg border border-border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {TRADE_PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (MRP: {formatIndianCurrency(p.mrp)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">Pricing Tier</label>
              <select
                value={calcTier}
                onChange={(e) => setCalcTier(e.target.value as PriceTierKey)}
                className="w-full h-10 px-3 text-xs rounded-lg border border-border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {PRICE_TIERS.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label} ({t.fullName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">Master Packs Quantity</label>
              <Input
                type="number"
                min={1}
                max={5000}
                value={calcPacks}
                onChange={(e) => setCalcPacks(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-10 text-xs font-mono font-bold bg-background"
              />
            </div>
          </div>

          {/* Calculated Output Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-muted/40 border border-border/80">
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Effective Unit Rate</p>
              <p className="text-lg sm:text-xl font-extrabold text-foreground font-mono mt-0.5">
                {formatIndianCurrency(calcUnitPrice)}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Per individual unit</p>
            </div>

            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Total Quantity</p>
              <p className="text-lg sm:text-xl font-extrabold text-primary font-mono mt-0.5">
                {totalUnits.toLocaleString("en-IN")} Units
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                ({calcPacks} packs × {activeCalcProduct.packQty})
              </p>
            </div>

            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Estimated Invoice Total</p>
              <p className="text-lg sm:text-xl font-extrabold text-foreground font-mono mt-0.5">
                {formatIndianCurrency(totalInvoice)}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Excl. GST &amp; Freight</p>
            </div>

            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Gross Retail Margin</p>
              <p className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                {grossMargin.toFixed(1)}%
              </p>
              <p className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
                Vs MRP ({formatIndianCurrency(totalMrpValue)})
              </p>
            </div>
          </div>

          {/* WhatsApp Quote Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              Official price list effective for current fiscal. Dispatch via certified logistics from Tirunelveli works.
            </p>
            <Button
              onClick={openWhatsAppOrder}
              size="lg"
              className="w-full sm:w-auto font-bold bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-sm text-xs h-10 px-5"
            >
              <MessageSquare className="h-4 w-4" />
              Inquire This Estimation on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
