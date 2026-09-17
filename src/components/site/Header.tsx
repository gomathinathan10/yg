import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Heart,
  LayoutGrid,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ThemeSwitcher } from "@/components/site/ThemeSwitcher";
import { SearchDialog } from "@/components/site/SearchDialog";

const nav = [
  { to: "/", label: "Home" },
  { to: "/story", label: "About" },
  { to: "/shop", label: "Shop" },
  { to: "/custom-branding", label: "White Labelling" },
  { to: "/exports", label: "Exports" },
  { to: "/account", label: "Orders" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const cart = useCart();
  const wishlist = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const router = useRouter();
  useEffect(() => {
    let done = false;
    const warm = () => {
      if (done) return;
      done = true;
      for (const item of nav) void router.preloadRoute({ to: item.to });
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(warm) : window.setTimeout(warm, 1200);
    window.addEventListener("pointerdown", warm, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", warm);
      if (!w.requestIdleCallback) window.clearTimeout(id);
    };
  }, [router]);

  return (
    <header className="w-full relative z-40">
      {/* ======================================================== */}
      {/* 1. TOP ANNOUNCEMENT STRIP (Neon Gold)                    */}
      {/* ======================================================== */}
      <div className="bg-[#FFC700] text-[#181206] py-1 sm:py-1.5 text-[10px] sm:text-xs border-b border-[#D8A700] font-medium overflow-hidden">
        <div className="container-page flex flex-row items-center justify-between gap-2 px-2.5 sm:px-6 whitespace-nowrap">
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <span className="inline-flex items-center gap-0.5 bg-[#181206] text-[#FFC700] font-black text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
              <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Special
            </span>
            <p className="text-[#181206] text-[10px] sm:text-xs font-semibold truncate">
              FREE delivery &amp; 40% OFF next 3 orders!
            </p>
            <span className="hidden md:inline text-[#181206]/75 font-normal">
              · Limited time festive offer
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-[#181206] text-[10px] sm:text-xs font-semibold shrink-0">
            <Link
              to="/custom-branding"
              className="hidden lg:inline-flex items-center gap-1 bg-[#181206]/10 hover:bg-[#181206]/20 text-[#181206] border border-[#181206]/20 px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors"
            >
              Enquire for Bulk Order
            </Link>
            <a
              href="tel:04622335555"
              className="flex items-center gap-1 hover:text-black transition-colors"
              title="Direct Factory Hotline"
            >
              <Phone className="h-3 w-3 text-[#181206]" />
              <span><span className="hidden xs:inline sm:inline">Call: </span><strong className="text-[#181206]">0462 - 233 5555</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN HEADER BAR (Mild Yellow Below Neon Gold)         */}
      {/* ======================================================== */}
      <div className="bg-[#FAF3D6] text-[#181206] py-2.5 sm:py-3.5 border-b border-[#E8DEC8] shadow-xs">
        <div className="container-page flex items-center justify-between gap-2.5 sm:gap-6 px-3 sm:px-6">
          {/* Mobile Hamburger */}
          <div className="flex items-center lg:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="h-9 w-9 text-[#181206] hover:bg-[#FFC700]/30 active:scale-95"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-5 sm:p-6 flex flex-col justify-between bg-white text-[#181206]">
                <div>
                  <div className="flex items-center pb-4 border-b border-[#E8DEC8]">
                    <img
                      src="/logo.png"
                      alt="Logo"
                      className="h-12 w-auto object-contain"
                    />
                  </div>

                  <nav className="mt-5 flex flex-col gap-2 font-semibold">
                    {nav.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="bg-[#FFC700] text-[#181206] hover:bg-[#181206] hover:text-[#FFC700] hover:border-[#181206] rounded-[6px] px-3.5 py-2.5 text-sm font-bold border border-[#D8A700] shadow-xs transition-all flex items-center justify-between"
                        activeProps={{ className: "!bg-[#181206] !text-[#FFC700] !border-[#181206] font-black ring-2 ring-[#FFC700]/70" }}
                      >
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <Link
                      to="/custom-branding"
                      onClick={() => setMenuOpen(false)}
                      className="bg-[#FFC700] text-[#181206] hover:bg-[#181206] hover:text-[#FFC700] hover:border-[#181206] rounded-[6px] px-3.5 py-2.5 text-sm font-bold border border-[#D8A700] shadow-xs transition-all mt-1 flex items-center justify-between"
                    >
                      <span>Enquire for Bulk Order</span>
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setMenuOpen(false)}
                      className="bg-[#FFC700] text-[#181206] hover:bg-[#181206] hover:text-[#FFC700] hover:border-[#181206] rounded-[6px] px-3.5 py-2.5 text-sm font-bold border border-[#D8A700] shadow-xs transition-all flex items-center justify-between"
                      activeProps={{ className: "!bg-[#181206] !text-[#FFC700] !border-[#181206] font-black ring-2 ring-[#FFC700]/70" }}
                    >
                      <span>Wishlist</span>
                      {wishlist.slugs.length ? (
                        <span className="rounded-full bg-[#181206] text-[#FFC700] text-xs font-bold px-2 py-0.5">
                          {wishlist.slugs.length}
                        </span>
                      ) : null}
                    </Link>
                    <Link
                      to="/track"
                      onClick={() => setMenuOpen(false)}
                      className="bg-[#FFC700] text-[#181206] hover:bg-[#181206] hover:text-[#FFC700] hover:border-[#181206] rounded-[6px] px-3.5 py-2.5 text-sm font-bold border border-[#D8A700] shadow-xs transition-all"
                      activeProps={{ className: "!bg-[#181206] !text-[#FFC700] !border-[#181206] font-black ring-2 ring-[#FFC700]/70" }}
                    >
                      Track Order
                    </Link>
                  </nav>
                </div>

                <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between">
                  <span className="text-xs font-medium text-[#5A6560]">Theme Switcher</span>
                  <ThemeSwitcher />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo prominently sized to fill the header space */}
          <Link to="/" className="flex items-center shrink-0 group py-1" title="Y.G Asafoetida Home">
            <div className="h-14 sm:h-16 md:h-20 lg:h-22 w-auto flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Y.G Asafoetida Logo"
                className="h-14 sm:h-16 md:h-20 lg:h-22 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-2xs"
              />
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-4">
            <div className="flex w-full items-center bg-white rounded-[6px] overflow-hidden p-1 shadow-xs border border-black/15 relative">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoryDropdownOpen((o) => !o)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#181206] hover:text-[#526800] transition-colors shrink-0 cursor-pointer"
                >
                  <Menu className="h-4 w-4 text-[#181206]" />
                  <span>Categories</span>
                  <ChevronDown className="h-3 w-3 text-[#5A6560]" />
                </button>
                {categoryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-[#E8DEC8] rounded-[6px] shadow-lg py-1.5 z-50 text-[#181206]">
                    <Link
                      to="/shop"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      All Formulations
                    </Link>
                    <Link
                      to="/shop"
                      search={{ category: "powder" }}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Compounded Powder
                    </Link>
                    <Link
                      to="/shop"
                      search={{ category: "cake" }}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Solid Cake &amp; Lump
                    </Link>
                    <Link
                      to="/shop"
                      search={{ category: "gf" }}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Gluten-Free Hing
                    </Link>
                    <Link
                      to="/shop"
                      search={{ category: "granules" }}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Granules &amp; Pellets
                    </Link>
                    <Link
                      to="/shop"
                      search={{ category: "wellness" }}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Health Mix (Sathu Maavu)
                    </Link>
                    <Link
                      to="/shop"
                      search={{ category: "appalam" }}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Crispy Appalam
                    </Link>
                    <Link
                      to="/shop"
                      search={{ category: "vismaya" }}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Vismaya Ready to Cook
                    </Link>
                    <Link
                      to="/shop"
                      search={{ category: "pooja" }}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Pooja Sambrani
                    </Link>
                  </div>
                )}
              </div>

              <div className="h-5 w-px bg-[#E2E2E2] mx-1 shrink-0" />

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex-1 text-left px-3 py-2 text-xs text-[#5A6560] hover:text-[#181206] focus:outline-none flex items-center justify-between"
              >
                <span>Search for products, formulations...</span>
                <span className="text-[10px] bg-[#FAF3D6] px-1.5 py-0.5 rounded border border-[#E8DEC8] text-[#5A6560] font-mono">
                  Ctrl+K
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="bg-[#FFC700] hover:bg-[#F0B800] text-[#181206] px-5 py-2.5 rounded-[4px] text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 shadow-xs cursor-pointer active:scale-95 border border-[#D8A700]"
              >
                <span>Search</span>
                <Search className="h-3.5 w-3.5 text-[#181206]" />
              </button>
            </div>
          </div>

          {/* Right Action Items: Responsive Compact Frames */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="lg:hidden h-9 w-9 flex items-center justify-center text-[#181206] hover:bg-[#FFC700]/30 rounded-[6px] transition-colors active:scale-95"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* 1. Account Button */}
            <Link
              to="/account"
              className="bg-[#FFC700] text-[#181206] hover:bg-[#F0B800] h-9 px-2.5 sm:px-3.5 rounded-[6px] text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs border border-[#D8A700] transition-all cursor-pointer active:scale-95"
              title="Account"
            >
              <UserRound className="h-4 w-4 text-[#181206]" />
              <span className="hidden sm:inline">Account</span>
            </Link>

            {/* 2. Wishlist Button with High-Contrast Count Badge */}
            <Link
              to="/wishlist"
              className="bg-[#FFC700] text-[#181206] hover:bg-[#F0B800] h-9 px-2.5 sm:px-3.5 rounded-[6px] text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs border border-[#D8A700] transition-all relative cursor-pointer active:scale-95"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <div className="relative flex items-center">
                <Heart className="h-4 w-4 text-[#181206]" />
                <span className="absolute -top-3.5 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#181206] text-[#FFC700] text-[9px] font-black px-1 shadow-xs">
                  {wishlist.slugs.length || 0}
                </span>
              </div>
              <span className="hidden sm:inline ml-1">Wishlist</span>
            </Link>

            {/* 3. My Cart Button with High-Contrast Count Badge */}
            <button
              type="button"
              onClick={() => cart.setOpen(true)}
              className="bg-[#FFC700] text-[#181206] hover:bg-[#F0B800] h-9 px-2.5 sm:px-3.5 rounded-[6px] text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs border border-[#D8A700] transition-all relative cursor-pointer active:scale-95"
              aria-label="Open cart"
              title="Cart"
            >
              <div className="relative flex items-center">
                <ShoppingBag className="h-4 w-4 text-[#181206]" />
                <span className="absolute -top-3.5 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#181206] text-[#FFC700] text-[9px] font-black px-1 shadow-xs">
                  {cart.count}
                </span>
              </div>
              <span className="hidden sm:inline ml-1">My Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. LOWER NAVIGATION BAR (Neon Gold Button Boxes)         */}
      {/* ======================================================== */}
      <div className="sticky top-0 bg-[#FAF3D6]/95 backdrop-blur-xs border-t border-b border-[#E8DEC8] shadow-xs z-30 py-1 sm:py-1.5">
        <div className="container-page flex items-center justify-between min-h-11 sm:min-h-12 px-3 sm:px-6">
          <nav className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none py-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="bg-[#FFC700] text-[#181206] hover:bg-[#181206] hover:text-[#FFC700] hover:border-[#181206] font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-[6px] border border-[#D8A700] shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
                activeProps={{ className: "!bg-[#181206] !text-[#FFC700] !border-[#181206] font-black shadow-sm ring-2 ring-[#FFC700]/70" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Delivery Location */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#181206] shrink-0 font-bold bg-[#FFC700]/25 border border-[#D8A700]/60 px-3 py-1.5 rounded-[6px]">
            <MapPin className="h-3.5 w-3.5 text-[#8C5921]" />
            <span>Delivery: <strong>Tamil Nadu &amp; All India Direct Dispatch</strong></span>
          </div>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
