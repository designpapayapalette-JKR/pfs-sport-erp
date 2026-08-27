"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useERP } from "@/context/erp-context";
import { mockProducts } from "@/lib/mock-data";
import { Button } from "@pfs/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Trash2,
  Plus,
  Minus,
  ExternalLink,
  Grid,
  Palette,
  Calculator,
  Box,
  Crown,
  Zap,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Shop Materials", href: "/shop" },
  { label: "3D Visualiser", href: "/visualiser" },
  { label: "Cost Estimator", href: "/estimator" },
];

export function StorefrontHeader() {
  const pathname = usePathname();
  const { cart, cartCount, cartSubtotal, removeFromCart, updateCartQuantity } = useERP();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = React.useState("");
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
  const [ribbonDismissed, setRibbonDismissed] = React.useState(false);

  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const megaMenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const cartGst = Math.round(cartSubtotal * 0.18);
  const cartTotal = cartSubtotal + cartGst;

  const searchResults = headerSearchQuery.trim()
    ? mockProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(headerSearchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(headerSearchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(headerSearchQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleMouseEnterMega = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeaveMega = () => {
    megaMenuTimeoutRef.current = setTimeout(() => setIsMegaMenuOpen(false), 200);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Announcement ribbon */}
      {!ribbonDismissed && (
        <div className="bg-gradient-to-r from-[#0A2A57] to-[#12386F] text-white text-xs py-2 px-4 relative">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
            <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>Precision-engineered sports surfaces — shipped to 95+ countries worldwide.</span>
            <Link href="/shop" className="underline font-semibold hover:text-amber-200 transition-colors shrink-0">
              Shop Now
            </Link>
          </div>
          <button
            onClick={() => setRibbonDismissed(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            aria-label="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main nav */}
      <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pfs-logo.png" alt="PFS Sport" className="h-9 w-9 object-contain" />
              <span className="font-extrabold text-lg tracking-tight text-[#0A2A57]">
                PFS SPORT
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={handleMouseEnterMega}
              onMouseLeave={handleMouseLeaveMega}
            >
              <Link
                href="/shop"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  pathname === "/shop" ? "bg-slate-100 text-slate-950" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Shop Materials
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isMegaMenuOpen ? "rotate-180" : ""}`} />
              </Link>

              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full pt-3 w-[640px] z-50"
                  >
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 grid grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wide">Acrylic Surfaces</h4>
                        <ul className="space-y-2 text-sm">
                          <li><Link href="/shop?sku=PFS-AC-PRO-8" className="text-slate-700 hover:text-[#0A2A57]">Pro Tour 8-Layer Cushion</Link></li>
                          <li><Link href="/shop?sku=PFS-AC-SUP-5" className="text-slate-700 hover:text-[#0A2A57]">Club Supreme 5-Layer</Link></li>
                          <li><Link href="/shop?sku=PFS-DRUM-COL-20L" className="text-slate-700 hover:text-[#0A2A57]">PureColor 20L Drum</Link></li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wide">Modular &amp; Turf</h4>
                        <ul className="space-y-2 text-sm">
                          <li><Link href="/shop?sku=PFS-MOD-TILE-15" className="text-slate-700 hover:text-[#0A2A57]">Interlocking PP Tiles</Link></li>
                          <li><Link href="/shop?sku=PFS-PADEL-12M" className="text-slate-700 hover:text-[#0A2A57]">UltraPadel 12mm Turf</Link></li>
                          <li><Link href="/shop?sku=PFS-LINE-WHITE-5L" className="text-slate-700 hover:text-[#0A2A57]">Line Paint (5L)</Link></li>
                        </ul>
                      </div>
                      <div className="rounded-2xl bg-[#EAF1FB] p-4 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="text-[10px] font-bold text-[#0A2A57] uppercase tracking-wide">Sample Kit</span>
                          <p className="font-bold text-sm text-slate-900 mt-1">14-Color Swatch Box</p>
                          <p className="text-xs text-slate-500 mt-1">Real cured acrylic chips, 100% refundable.</p>
                        </div>
                        <Link href="/checkout?item=sample-box">
                          <Button size="sm" className="w-full rounded-full bg-[#0A2A57] hover:bg-[#071D3D] text-xs">
                            Order for ₹999
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  pathname === link.href ? "bg-slate-100 text-slate-950" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleOpenSearch}
              className="p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors text-sm"
            >
              <User className="h-[18px] w-[18px]" />
              <span className="hidden lg:inline">Account</span>
            </Link>

            <Link
              href="/checkout?item=sample-box"
              className="relative p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Sample kit"
            >
              <Heart className="h-[18px] w-[18px]" />
            </Link>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 pl-2.5 pr-3.5 py-2 rounded-full bg-[#0A2A57] text-white hover:bg-[#071D3D] transition-colors ml-1"
            >
              <div className="relative">
                <ShoppingBag className="h-[18px] w-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 min-w-[16px] px-1 bg-[#F36E21] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:inline">
                ₹{cartSubtotal.toLocaleString("en-IN")}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {link.href === "/shop" && <Grid className="h-4 w-4 text-[#0A2A57]" />}
                  {link.href === "/visualiser" && <Palette className="h-4 w-4 text-[#0A2A57]" />}
                  {link.href === "/estimator" && <Calculator className="h-4 w-4 text-[#F36E21]" />}
                  {link.label}
                </Link>
              ))}
              <Link
                href="/checkout?item=sample-box"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-sm font-medium text-[#0A2A57] bg-[#EAF1FB]"
              >
                <Box className="h-4 w-4" /> Order Swatch Box (₹999)
              </Link>
              <Link
                href="/dealer/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-medium text-white bg-[#0A2A57] mt-2"
              >
                <span className="flex items-center gap-2"><Crown className="h-4 w-4" /> Staff &amp; Dealer Portal</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden p-4 space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                ref={searchInputRef}
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
                placeholder="Explore what you need..."
                className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <button
                onClick={() => { setIsSearchOpen(false); setHeaderSearchQuery(""); }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop?sku=${product.sku}`}
                    onClick={() => { setIsSearchOpen(false); setHeaderSearchQuery(""); }}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="text-[11px] text-[#0A2A57] font-semibold">{product.category}</span>
                      <h4 className="text-sm font-semibold text-slate-900">{product.name}</h4>
                    </div>
                    <span className="text-sm font-bold text-slate-900">₹{product.platinumPrice}</span>
                  </Link>
                ))}
              </div>
            ) : headerSearchQuery.trim() ? (
              <div className="py-8 text-center text-sm text-slate-400">No results for &quot;{headerSearchQuery}&quot;.</div>
            ) : (
              <div className="py-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-600 block mb-2">Popular Searches:</span>
                <div className="flex flex-wrap gap-2">
                  {["8-Layer Acrylic", "Modular PP Tiles", "Padel Turf", "LED Floodlight"].map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setHeaderSearchQuery(kw)}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart drawer */}
      <AnimatePresence>
        {isCartDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartDrawerOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-lg text-slate-900">Your Cart ({cartCount})</h3>
                  <button
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                      <div className="h-16 w-16 rounded-full bg-[#EAF1FB] text-[#0A2A57] flex items-center justify-center">
                        <ShoppingBag className="h-7 w-7" />
                      </div>
                      <p className="font-semibold text-slate-800 text-sm">Your cart is empty</p>
                      <Link href="/shop" onClick={() => setIsCartDrawerOpen(false)}>
                        <Button className="rounded-full mt-2 text-sm bg-[#0A2A57] hover:bg-[#071D3D]">
                          Browse Materials
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="p-4 rounded-2xl bg-slate-50 space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm text-slate-900 leading-snug">{item.product.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
                          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full border border-slate-200">
                            <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 100)} className="text-slate-500 hover:text-slate-900">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-bold min-w-[36px] text-center">{item.quantity.toLocaleString()}</span>
                            <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 100)} className="text-slate-500 hover:text-slate-900">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-slate-900">
                            ₹{(item.product.platinumPrice * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 border-t border-slate-100 bg-slate-50/60 space-y-3">
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between text-slate-500">
                        <span>Subtotal</span>
                        <span className="text-slate-900 font-semibold">₹{cartSubtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>GST (18%)</span>
                        <span className="text-slate-900 font-semibold">₹{cartGst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                        <span>Total</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                      </div>
                    </div>
                    <Link href="/checkout" onClick={() => setIsCartDrawerOpen(false)} className="block">
                      <Button className="w-full rounded-full bg-[#F36E21] hover:bg-[#D95D16] text-white font-bold h-12">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
