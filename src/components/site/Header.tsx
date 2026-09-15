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
  { to: "/custom-branding", label: "Brand" },
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
      {/* 1. TOP ANNOUNCEMENT STRIP                                */}
      {/* ======================================================== */}
      <div className="bg-[#0F140D] text-white py-1.5 sm:py-2 text-[11px] sm:text-xs border-b border-[#FFC700]/20">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 px-3 sm:px-6">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 bg-[#FFC700] text-[#181206] font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
              <Sparkles className="h-3 w-3" /> Special
            </span>
            <p className="text-white/95 text-[11px] sm:text-xs font-medium">
              FREE delivery &amp; 40% Discount for next 3 orders! Place your 1st order in.
            </p>
            <span className="hidden md:inline text-white/60">
              · Limited time festive offer
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <a
              href="tel:+919443152852"
              className="flex items-center gap-1.5 hover:text-[#FFC700] transition-colors"
            >
              <Phone className="h-3 w-3 text-[#FFC700]" />
              <span>Need help? Call Us: <strong className="text-white">+91 94431 52852</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN Neon Gold HEADER BAR                           */}
      {/* ======================================================== */}
      <div className="bg-[#FFC700] text-[#181206] py-2.5 sm:py-3.5 border-b border-black/10 shadow-xs">
        <div className="container-page flex items-center justify-between gap-2.5 sm:gap-6 px-3 sm:px-6">
          {/* Mobile Hamburger */}
          <div className="flex items-center lg:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="h-9 w-9 text-[#181206] hover:bg-black/10 active:scale-95"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-5 sm:p-6 flex flex-col justify-between bg-white text-[#181206]">
                <div>
                  <div className="flex items-center gap-2.5 pb-4 border-b border-[#E8DEC8]">
                    <img
                      src="/logo.png"
                      alt="Y.G Asafoetida Logo"
                      className="h-10 w-10 rounded-[6px] object-contain shadow-xs border border-[#E8DEC8]"
                    />
                    <div>
                      <SheetTitle className="font-bold text-base leading-tight text-[#181206] flex items-center gap-1">
                        Y.G ASAFOETIDA
                      </SheetTitle>
                      <p className="text-[10px] text-[#5A6560] tracking-wider uppercase font-semibold">
                        Tirunelveli · Est. 1932
                      </p>
                    </div>
                  </div>

                  <nav className="mt-5 flex flex-col gap-1 font-semibold">
                    {nav.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-[6px] px-3 py-2.5 text-sm transition-colors hover:bg-[#FAF3D6] text-[#181206]"
                        activeProps={{ className: "bg-[#FFC700]/30 text-[#181206] font-black border-l-3 border-[#FFC700]" }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      to="/wishlist"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-[6px] px-3 py-2.5 text-sm transition-colors hover:bg-[#FAF3D6] flex items-center justify-between text-[#181206]"
                      activeProps={{ className: "bg-[#FFC700]/30 text-[#181206] font-black border-l-3 border-[#FFC700]" }}
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
                      className="rounded-[6px] px-3 py-2.5 text-sm transition-colors hover:bg-[#FAF3D6] text-[#181206]"
                      activeProps={{ className: "bg-[#FFC700]/30 text-[#181206] font-black border-l-3 border-[#FFC700]" }}
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

          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-white p-1 sm:p-1.5 flex items-center justify-center shadow-xs border border-black/10">
              <img
                src="/logo.png"
                alt="Y.G Asafoetida Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-2xl font-black tracking-tight text-[#181206] leading-none uppercase">
                Y.G ASAFOETIDA
              </span>
              <span className="text-[9px] sm:text-[11px] text-[#181206]/80 font-bold tracking-wider uppercase mt-0.5">
                Heritage Pure Hing · Est. 1932
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xl mx-4">
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
                  <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-[#E8DEC8] rounded-[6px] shadow-lg py-1.5 z-50 text-[#181206]">
                    <Link
                      to="/shop"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      All Formulations
                    </Link>
                    <Link
                      to="/shop"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Compounded Powder
                    </Link>
                    <Link
                      to="/shop"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Solid Cake &amp; Lump
                    </Link>
                    <Link
                      to="/shop"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Gluten-Free Hing
                    </Link>
                    <Link
                      to="/shop"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Granules &amp; Pellets
                    </Link>
                    <Link
                      to="/shop"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs hover:bg-[#FAF3D6] hover:text-black font-semibold"
                    >
                      Health Mix (Sathu Maavu)
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
                className="bg-[#181206] hover:bg-black text-[#FFC700] px-5 py-2.5 rounded-[4px] text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs cursor-pointer active:scale-95"
              >
                <span>Search</span>
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Action Items: Responsive Compact Frames */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="lg:hidden h-9 w-9 flex items-center justify-center text-[#181206] hover:bg-black/10 rounded-[6px] transition-colors active:scale-95"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* 1. Account Button */}
            <Link
              to="/account"
              className="bg-[#181206] text-[#FFC700] hover:bg-black h-9 px-2.5 sm:px-3.5 rounded-[6px] text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs border border-black/20 transition-all cursor-pointer active:scale-95"
              title="Account"
            >
              <UserRound className="h-4 w-4 text-[#FFC700]" />
              <span className="hidden sm:inline">Account</span>
            </Link>

            {/* 2. Wishlist Button with High-Contrast Count Badge */}
            <Link
              to="/wishlist"
              className="bg-[#181206] text-[#FFC700] hover:bg-black h-9 px-2.5 sm:px-3.5 rounded-[6px] text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs border border-black/20 transition-all relative cursor-pointer active:scale-95"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <div className="relative flex items-center">
                <Heart className="h-4 w-4 text-[#FFC700]" />
                <span className="absolute -top-3.5 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFC700] text-[#181206] text-[9px] font-black px-1 shadow-xs">
                  {wishlist.slugs.length || 0}
                </span>
              </div>
              <span className="hidden sm:inline ml-1">Wishlist</span>
            </Link>

            {/* 3. My Cart Button with High-Contrast Count Badge */}
            <button
              type="button"
              onClick={() => cart.setOpen(true)}
              className="bg-[#181206] text-[#FFC700] hover:bg-black h-9 px-2.5 sm:px-3.5 rounded-[6px] text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs border border-black/20 transition-all relative cursor-pointer active:scale-95"
              aria-label="Open cart"
              title="Cart"
            >
              <div className="relative flex items-center">
                <ShoppingBag className="h-4 w-4 text-[#FFC700]" />
                <span className="absolute -top-3.5 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFC700] text-[#181206] text-[9px] font-black px-1 shadow-xs">
                  {cart.count}
                </span>
              </div>
              <span className="hidden sm:inline ml-1">My Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. LOWER NAVIGATION BAR (Neon Accent Strip)              */}
      {/* ======================================================== */}
      <div className="sticky top-0 bg-[#F0B800] border-t border-b border-black/10 shadow-xs z-30">
        <div className="container-page flex items-center justify-between h-10 sm:h-11 px-3 sm:px-6">
          <nav className="flex items-center gap-4 sm:gap-7 overflow-x-auto scrollbar-none py-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[#181206] hover:text-black font-extrabold text-xs sm:text-sm tracking-wide whitespace-nowrap transition-colors"
                activeProps={{ className: "text-black underline underline-offset-4 decoration-2" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Delivery Location */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#181206] shrink-0 font-bold">
            <MapPin className="h-3.5 w-3.5 text-[#181206]" />
            <span>Delivery: <strong>Tamil Nadu &amp; All India Direct Dispatch</strong></span>
          </div>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
