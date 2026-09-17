import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Thank you for subscribing to Y.G Asafoetida updates!");
    setEmail("");
  };

  return (
    <footer className="mt-20 bg-[#141812] text-white">
      {/* 1. Newsletter Section with Neon Gold Accent */}
      <div className="border-b border-white/10 py-8 sm:py-10 bg-[#1C2219]">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6 px-3 sm:px-6">
          <div className="max-w-md text-center md:text-left">
            <span className="text-[#FFC700] font-black text-xs uppercase tracking-wider">
              Stay Connected
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Join Our Pure Spice &amp; Recipe Newsletter
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-1">
              Receive 15% off your first order, seasonal harvest notes &amp; authentic heritage recipes.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-md items-center bg-white rounded-[6px] p-1 shadow-sm border border-black/20"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-3 py-2 text-xs sm:text-sm text-[#181206] placeholder:text-[#5A6560] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] px-4 py-2.5 rounded-[4px] text-xs sm:text-sm font-black flex items-center gap-1.5 transition-colors shrink-0 shadow-xs active:scale-95"
            >
              <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 2. Main Footer Columns */}
      <div className="container-page grid gap-8 sm:gap-10 py-10 sm:py-14 px-3 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Col 1: Brand Info */}
        <div>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-[6px] bg-white p-1 flex items-center justify-center shadow-sm">
              <img
                src="/logo.png"
                alt="Y.G Asafoetida Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="text-xl font-bold text-white leading-none flex items-center gap-1.5">
                Y.G Asafoetida
              </p>
              <p className="text-[10px] font-semibold text-white/70 tracking-wider uppercase mt-1">
                Tirunelveli · Since 1931
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed">
            Crafting pure compounded asafoetida, solid gold cakes, and wood-roasted traditional mixes in Tirunelveli with 94 years of heritage across three generations.
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-[#FFC700] font-semibold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-[#FFC700]" /> FSSAI Certified
            </span>
            <span className="flex items-center gap-1">
              <Truck className="h-4 w-4 text-[#FFC700]" /> India-Wide Delivery
            </span>
          </div>
        </div>

        {/* Col 2: Shop Categories */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FFC700] pl-2.5">
            Our Products
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
            <li>
              <Link to="/shop" className="hover:text-[#FFC700] transition-colors">
                All Products (15 Items)
              </Link>
            </li>
            <li>
              <Link
                to="/product/$slug"
                params={{ slug: "gold-asafoetida-powder" }}
                className="hover:text-[#FFC700] transition-colors"
              >
                Gold Compounded Hing
              </Link>
            </li>
            <li>
              <Link
                to="/product/$slug"
                params={{ slug: "gluten-free-asafoetida-powder" }}
                className="hover:text-[#FFC700] transition-colors"
              >
                Gluten-Free Asafoetida
              </Link>
            </li>
            <li>
              <Link
                to="/product/$slug"
                params={{ slug: "asafoetida-gold-cake" }}
                className="hover:text-[#FFC700] transition-colors"
              >
                Traditional Gold Cake
              </Link>
            </li>
            <li>
              <Link
                to="/product/$slug"
                params={{ slug: "traditional-health-mix" }}
                className="hover:text-[#FFC700] transition-colors"
              >
                Sathu Maavu Health Mix
              </Link>
            </li>
            <li>
              <Link
                to="/product/$slug"
                params={{ slug: "pure-benzoin-sambrani" }}
                className="hover:text-[#FFC700] transition-colors"
              >
                Pure Benzoin Sambrani
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Company & Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FFC700] pl-2.5">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
            <li>
              <Link to="/story" className="hover:text-[#FFC700] transition-colors">
                Our 1931 Story
              </Link>
            </li>
            <li>
              <Link to="/custom-branding" className="hover:text-[#FFC700] transition-colors">
                White Labelling &amp; Bulk
              </Link>
            </li>
            <li>
              <Link to="/exports" className="hover:text-[#FFC700] transition-colors">
                Global Exports
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#FFC700] transition-colors">
                Customer Support
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-[#FFC700] transition-colors">
                Track Your Order
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-[#FFC700] transition-colors">
                Saved Wishlist
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-[#FFC700] transition-colors">
                My Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Reach Us */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FFC700] pl-2.5">
            Contact &amp; Works
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm text-white/80">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-[#FFC700] shrink-0 mt-0.5" />
              <span className="leading-snug">
                <strong>Mayil Agro Foods</strong><br />
                1/303, M.K. Nagar, Near to HP Fuel Station, Abhisekapatti, Tirunelveli - Tenkasi Main Road, Tirunelveli - 627 012
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#FFC700] shrink-0" />
              <span>Tel: <a href="tel:04622335555" className="hover:text-[#FFC700]">0462 - 233 5555</a></span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#FFC700] shrink-0" />
              <span>Mobile: <a href="tel:+917200622221" className="hover:text-[#FFC700]">+91 7200622221</a></span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#FFC700] shrink-0" />
              <span>Sales Desk: <a href="tel:+917904567979" className="hover:text-[#FFC700]">+91 7904567979</a></span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-[#FFC700] shrink-0" />
              <span><a href="mailto:Sales@yghing.com" className="hover:text-[#FFC700]">Sales@yghing.com</a></span>
            </li>
            <li className="flex items-center gap-2.5 text-[11px] text-white/70">
              <Mail className="h-3.5 w-3.5 text-[#FFC700] shrink-0" />
              <span>White Labelling: <a href="mailto:b2bsales@yghing.com" className="hover:text-[#FFC700] text-white/90">b2bsales@yghing.com</a></span>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-white/5 rounded-[6px] border border-white/10 text-[11px] text-white/70">
            <p className="font-semibold text-white">Business Hours:</p>
            <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-white/10 py-5 bg-[#17171C]">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Y.G Asafoetida. All rights reserved.</p>

          <nav aria-label="Policies" className="flex flex-wrap items-center gap-4 text-xs">
            <Link to="/policies/$slug" params={{ slug: "shipping" }} className="hover:text-white transition-colors">
              Shipping Policy
            </Link>
            <Link to="/policies/$slug" params={{ slug: "returns" }} className="hover:text-white transition-colors">
              Returns &amp; Refunds
            </Link>
            <Link to="/policies/$slug" params={{ slug: "privacy" }} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/policies/$slug" params={{ slug: "terms" }} className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </nav>

          <div className="flex items-center gap-2 text-[10px] text-white/40">
            <span>Secure 256-bit Checkout</span>
            <span>•</span>
            <span>UPI / Cards / NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

