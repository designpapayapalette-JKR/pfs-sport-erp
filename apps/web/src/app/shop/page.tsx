"use client";

import * as React from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/storefront-header";
import { StorefrontFooter } from "@/components/storefront/storefront-footer";
import { useERP } from "@/context/erp-context";
import { mockProducts, pfsColorPalette, ProductItem } from "@/lib/mock-data";
import {
  Button,
  Card,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@pfs/ui";
import {
  Palette,
  Calculator,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  FileCheck,
  Check,
  Box,
  Trophy,
  Grid,
  Activity,
  Sparkles,
  Star,
  Heart,
  Plus,
  Minus,
  FileText,
  Send,
  Search,
  X,
  Percent,
  ChevronRight,
} from "lucide-react";

/** Deterministic pseudo-rating derived from SKU so it's stable across renders. */
function ratingFor(sku: string): { stars: number; count: number } {
  let hash = 0;
  for (let i = 0; i < sku.length; i++) hash = (hash * 31 + sku.charCodeAt(i)) >>> 0;
  const stars = 4 + (hash % 10) / 10; // 4.0 - 4.9
  const count = 60 + (hash % 340);
  return { stars: Math.round(stars * 10) / 10, count };
}

function StarRating({ stars, count }: { stars: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < Math.round(stars) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-400">({count})</span>
    </div>
  );
}

export default function ShopPage() {
  const { products, addToCart, cartCount, cartSubtotal } = useERP();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [productQuantities, setProductQuantities] = React.useState<Record<string, number>>({});
  const [addedSku, setAddedSku] = React.useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = React.useState<ProductItem | null>(null);
  const [activeModalTab, setActiveModalTab] = React.useState<"overview" | "layers" | "astm">("overview");
  const [isTdsModalOpen, setIsTdsModalOpen] = React.useState(false);
  const [tdsEmail, setTdsEmail] = React.useState("");
  const [tdsSubmitted, setTdsSubmitted] = React.useState(false);
  const [projectBudgetInput, setProjectBudgetInput] = React.useState<number>(850000);

  const categoriesList = [
    { id: "All", label: "All Systems", count: products.length, icon: Grid },
    { id: "Surface Systems", label: "Acrylic Surfaces", count: products.filter((p) => p.category === "Surface Systems").length, icon: Trophy },
    { id: "Modular Tiles", label: "Modular Tiles", count: products.filter((p) => p.category === "Modular Tiles").length, icon: Grid },
    { id: "Turf", label: "Padel Turf", count: products.filter((p) => p.category === "Turf").length, icon: Sparkles },
    { id: "PU Flooring", label: "PU Flooring", count: products.filter((p) => p.category === "PU Flooring").length, icon: Activity },
    { id: "Accessories", label: "Accessories", count: products.filter((p) => p.category === "Accessories").length, icon: Box },
  ];

  const inspiredLooks = [
    { name: "Miami Open Tour Pro", sport: "Pickleball", playing: pfsColorPalette[4], kitchen: pfsColorPalette[7], perimeter: pfsColorPalette[0] },
    { name: "US Open Championship", sport: "Tennis", playing: pfsColorPalette[5], kitchen: pfsColorPalette[9], perimeter: pfsColorPalette[0] },
    { name: "Wimbledon Heritage Green", sport: "Tennis", playing: pfsColorPalette[2], kitchen: pfsColorPalette[3], perimeter: pfsColorPalette[11] },
    { name: "Sapphire Arena Elite", sport: "Padel", playing: pfsColorPalette[5], kitchen: pfsColorPalette[4], perimeter: pfsColorPalette[1] },
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesCat = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.systemTier || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getQuantity = (sku: string, defaultQty: number) =>
    productQuantities[sku] !== undefined ? productQuantities[sku] : defaultQty;

  const handleUpdateQuantity = (sku: string, delta: number, min: number, currentQty: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [sku]: Math.max(min, (prev[sku] !== undefined ? prev[sku] : currentQty) + delta),
    }));
  };

  const handleQuickAdd = (prod: ProductItem) => {
    const defaultQty = prod.category === "Accessories" ? 2 : 1800;
    const qty = getQuantity(prod.sku, defaultQty);
    addToCart(prod, qty);
    setAddedSku(prod.sku);
    setTimeout(() => setAddedSku(null), 2000);
  };

  const handleTdsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tdsEmail) return;
    setTdsSubmitted(true);
    setTimeout(() => {
      setIsTdsModalOpen(false);
      setTdsSubmitted(false);
      setTdsEmail("");
    }, 2000);
  };

  const gstCreditAmount = Math.round(projectBudgetInput * 0.18);
  const netEffectiveCost = projectBudgetInput - gstCreditAmount;

  const renderProductIllustration = (sku: string) => {
    if (sku.includes("PRO-8") || sku.includes("SUP-5")) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="acrylicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <rect x="45" y="45" width="230" height="110" rx="16" fill="url(#acrylicGrad)" />
          <line x1="80" y1="100" x2="240" y2="100" stroke="#FFFFFF" strokeWidth="3" opacity="0.9" />
          <line x1="160" y1="60" x2="160" y2="140" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />
        </svg>
      );
    }
    if (sku.includes("MOD-TILE")) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tileGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <rect x="55" y="50" width="95" height="95" rx="14" fill="url(#tileGrad2)" />
          <rect x="165" y="50" width="95" height="95" rx="14" fill="url(#tileGrad2)" />
        </svg>
      );
    }
    if (sku.includes("DRUM-COL") || sku.includes("DRUM-RES")) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="55" rx="50" ry="14" fill="#DBEAFE" />
          <rect x="110" y="55" width="100" height="90" fill="#93C5FD" />
          <ellipse cx="160" cy="145" rx="50" ry="14" fill="#60A5FA" />
        </svg>
      );
    }
    if (sku.includes("LINE-WHITE")) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="130" cy="70" rx="40" ry="10" fill="#E2E8F0" />
          <rect x="90" y="70" width="80" height="70" fill="#F1F5F9" />
          <ellipse cx="130" cy="140" rx="40" ry="10" fill="#CBD5E1" />
        </svg>
      );
    }
    if (sku.includes("SMP-BOX")) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <rect x="70" y="50" width="180" height="110" rx="16" fill="#EAF1FB" />
          {["#0A2A57", "#F36E21", "#006442", "#B9903C", "#1976D2"].map((hex, i) => (
            <rect key={hex} x={90 + i * 32} y={80} width="22" height="22" rx="6" fill={hex} />
          ))}
        </svg>
      );
    }
    if (sku.includes("LED")) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="100,60 220,60 235,105 85,105" fill="#334155" />
          <ellipse cx="160" cy="105" rx="70" ry="12" fill="#FEF08A" opacity="0.7" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 320 200" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
        <rect x="55" y="50" width="210" height="100" rx="16" fill="#A7F3D0" />
        <circle cx="160" cy="100" r="28" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.9" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-900">
      <StorefrontHeader />

      <main className="flex-1">
        {/* ============================================================= */}
        {/* HERO — pastel split card, Unimart-style                       */}
        {/* ============================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="rounded-[32px] bg-[#EAF1FB] overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
              <span className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-600">
                <Trophy className="h-4 w-4 text-[#E0A925] shrink-0" />
                <span>25+ Years &middot; 50,000+ Projects &middot; 95+ Countries</span>
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-slate-900">
                Precision-Engineered Sports Surfaces, Direct From the Manufacturer.
              </h1>
              <p className="text-sm text-slate-500 max-w-md">
                PFS Padel™, PFS Pickleball™, acrylic, polyurethane and EPDM systems trusted by
                2,000+ distributors worldwide.
              </p>
              <p className="text-sm text-slate-500">
                Starting From{" "}
                <span className="text-2xl font-bold text-[#0A2A57] align-middle">₹138.75</span>
                <span className="text-slate-400"> /sq ft</span>
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link href="/shop#products">
                  <Button size="lg" className="rounded-full px-7 h-12 bg-[#0A2A57] hover:bg-[#071D3D] text-white font-semibold text-sm">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/visualiser">
                  <Button size="lg" variant="outline" className="rounded-full px-6 h-12 bg-white/70 border-white text-slate-700 font-semibold text-sm flex items-center gap-2">
                    <Palette className="h-4 w-4" /> 3D Visualiser
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative min-h-[280px] lg:min-h-0">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-blue-200 via-blue-100 to-emerald-100 flex items-center justify-center overflow-hidden">
                  {renderProductIllustration("PFS-AC-PRO-8")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* TRUST STRIP                                                    */}
        {/* ============================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "ISO & CE Certified", desc: "SGS-approved manufacturing" },
              { icon: Award, title: "ITF Court Pace Rated", desc: "World Athletics & World Padel Tour approved" },
              { icon: Truck, title: "Global Export Network", desc: "Shipping to 95+ countries" },
              { icon: FileCheck, title: "18% GST Credit", desc: "B2B e-invoicing (India)" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0A2A57] shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">{title}</h4>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================= */}
        {/* CATEGORY GRID                                                  */}
        {/* ============================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Popular by Category</h2>
            <button
              onClick={() => setSelectedCategory("All")}
              className="px-4 py-2 rounded-full bg-[#EAF1FB] text-[#0A2A57] text-sm font-semibold hover:bg-[#DCE8FA] transition-colors flex items-center gap-1.5"
            >
              View All Categories <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-5 rounded-3xl text-center transition-all flex flex-col items-center gap-3 ${
                    isActive ? "bg-[#0A2A57]" : "bg-[#EAF1FB] hover:bg-[#DCE8FA]"
                  }`}
                >
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center ${isActive ? "bg-white/15" : "bg-white"}`}>
                    <cat.icon className={`h-6 w-6 ${isActive ? "text-white" : "text-[#0A2A57]"}`} />
                  </div>
                  <span className={`text-xs font-semibold ${isActive ? "text-white" : "text-slate-700"}`}>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ============================================================= */}
        {/* PROMO BANNERS                                                  */}
        {/* ============================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-3xl bg-[#EAF1FB] p-8 flex flex-col justify-between min-h-[180px]">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#0A2A57] uppercase tracking-wide">Interactive Studio</span>
                <h3 className="text-xl font-bold text-slate-900">Design Your Court in 3D</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  14 tournament RAL shades. Configure playing area, kitchen zone and perimeter colours instantly.
                </p>
              </div>
              <Link href="/visualiser">
                <Button size="sm" className="w-fit rounded-full mt-4 bg-[#0A2A57] hover:bg-[#071D3D] font-semibold flex items-center gap-1.5">
                  Open Studio <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <div className="rounded-3xl bg-amber-50 p-8 flex flex-col justify-between min-h-[180px]">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Rate Card v1.4</span>
                <h3 className="text-xl font-bold text-slate-900">Instant Turnkey Quote</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Configure base prep, cushion layers and floodlighting with GST-eligible invoicing.
                </p>
              </div>
              <Link href="/estimator">
                <Button size="sm" className="w-fit rounded-full mt-4 bg-[#F36E21] hover:bg-[#D95D16] text-white font-semibold flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5" /> Calculate Cost
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* PRODUCT GRID                                                   */}
        {/* ============================================================= */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Featured Systems</h2>
              <p className="text-sm text-slate-400 mt-0.5">{filteredProducts.length} systems available</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search materials..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-slate-50 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2A57]/20"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category pill filter row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-6">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id ? "bg-[#0A2A57] text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl bg-slate-50 p-16 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-white text-slate-400 flex items-center justify-center mx-auto">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No systems found</h3>
              <Button
                variant="outline"
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="rounded-full font-semibold text-sm"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isDrum = product.sku.includes("DRUM") || product.category === "Accessories";
                const defaultQty = isDrum ? 2 : 1800;
                const qty = getQuantity(product.sku, defaultQty);
                const unitLabel = isDrum ? "unit" : "sq ft";
                const isAdded = addedSku === product.sku;
                const { stars, count } = ratingFor(product.sku);

                return (
                  <div
                    key={product.id}
                    className="rounded-3xl bg-white border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="relative bg-slate-50 aspect-[4/3] flex items-center justify-center p-6">
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-semibold">
                        In Stock
                      </span>
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
                        aria-label="Quick view"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      <div className="w-full h-full">{renderProductIllustration(product.sku)}</div>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-[#0A2A57]">{product.category}</span>
                        <h3
                          onClick={() => setQuickViewProduct(product)}
                          className="font-bold text-base text-slate-900 leading-snug cursor-pointer hover:text-[#0A2A57] transition-colors line-clamp-2"
                        >
                          {product.name}
                        </h3>
                        <StarRating stars={stars} count={count} />
                      </div>

                      <div className="space-y-3 pt-2 border-t border-slate-100">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-bold text-slate-900">₹{product.platinumPrice.toLocaleString("en-IN")}</span>
                            <span className="text-xs text-slate-400">/{unitLabel}</span>
                          </div>
                          <div className="flex items-center bg-slate-50 rounded-full p-1">
                            <button
                              onClick={() => handleUpdateQuantity(product.sku, isDrum ? -1 : -200, 1, qty)}
                              className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-bold px-2 min-w-[40px] text-center">{qty}</span>
                            <button
                              onClick={() => handleUpdateQuantity(product.sku, isDrum ? 1 : 200, 1, qty)}
                              className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleQuickAdd(product)}
                          className="w-full rounded-full h-11 font-semibold text-sm bg-[#0A2A57] hover:bg-[#071D3D] text-white flex items-center justify-center gap-2"
                        >
                          {isAdded ? (
                            <><Check className="h-4 w-4" /> Added</>
                          ) : (
                            <><ShoppingBag className="h-4 w-4" /> Add to Order</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ============================================================= */}
        {/* TOURNAMENT LOOKS                                               */}
        {/* ============================================================= */}
        <section className="bg-slate-50 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Shop By Tournament Look</h2>
                <p className="text-sm text-slate-400 mt-0.5">Pre-formulated color recipes for maximum ball contrast.</p>
              </div>
              <Link href="/visualiser">
                <Button variant="outline" size="sm" className="rounded-full font-semibold text-sm bg-white">
                  Customise in 3D →
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {inspiredLooks.map((look) => (
                <div key={look.name} className="rounded-3xl bg-white p-5 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">{look.sport}</span>
                  <div className="h-14 rounded-2xl overflow-hidden flex">
                    <div className="flex-1" style={{ backgroundColor: look.playing.hex }} />
                    <div className="flex-1" style={{ backgroundColor: look.kitchen.hex }} />
                    <div className="flex-1" style={{ backgroundColor: look.perimeter.hex }} />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{look.name}</h4>
                  <Link href={`/visualiser?preset=${encodeURIComponent(look.name)}`}>
                    <Button variant="outline" size="sm" className="w-full rounded-full text-sm font-semibold bg-slate-50">
                      Apply in Studio
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SAMPLE KIT CTA                                                 */}
        {/* ============================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="rounded-[32px] bg-[#EAF1FB] p-10 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0A2A57] text-xs font-semibold">
                <Box className="h-3.5 w-3.5" /> Physical Evaluation Kit
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Order the 14-Color RAL Swatch Box
              </h2>
              <p className="text-sm text-slate-500 max-w-xl">
                Evaluate real cured acrylic swatches and modular PP tile samples on site. 100% refundable on your first order.
              </p>
            </div>
            <div className="lg:col-span-4 text-center lg:text-right space-y-3">
              <div className="text-3xl font-extrabold text-slate-900">₹999</div>
              <Link href="/checkout?item=sample-box">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 bg-[#F36E21] hover:bg-[#D95D16] text-white font-semibold">
                  Order Swatch Kit
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SLA & GST CALCULATORS                                          */}
        {/* ============================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl p-7 bg-white border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 font-bold text-base text-slate-900">
                <Truck className="h-5 w-5 text-[#0A2A57]" /> Check Dispatch SLA
              </div>
              <p className="text-sm text-slate-400">Enter your site PIN code to verify transit timeline.</p>
              <form className="flex gap-2">
                <Input placeholder="e.g. 400001" className="rounded-full text-sm" maxLength={6} />
                <Button className="rounded-full px-5 font-semibold text-sm shrink-0 bg-[#0A2A57] hover:bg-[#071D3D]">Check</Button>
              </form>
            </Card>

            <Card className="rounded-3xl p-7 bg-white border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 font-bold text-base text-slate-900">
                <Percent className="h-5 w-5 text-emerald-600" /> GST Input Credit Calculator
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold text-slate-700">
                  <span>Project Budget</span>
                  <span>₹{projectBudgetInput.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={5000000}
                  step={50000}
                  value={projectBudgetInput}
                  onChange={(e) => setProjectBudgetInput(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#0A2A57]"
                />
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">GST Credit (18%)</span>
                  <strong className="text-emerald-600 font-bold">₹{gstCreditAmount.toLocaleString("en-IN")}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Net Cost</span>
                  <strong className="text-slate-900 font-bold">₹{netEffectiveCost.toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Quick view modal */}
        {quickViewProduct && (
          <Dialog open={!!quickViewProduct} onOpenChange={(open) => !open && setQuickViewProduct(null)}>
            <DialogContent className="max-w-2xl bg-white rounded-3xl p-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-900">{quickViewProduct.name}</DialogTitle>
                <DialogDescription className="text-sm text-slate-400">Technical specification &amp; application parameters.</DialogDescription>
              </DialogHeader>

              <div className="flex gap-4 border-b border-slate-100 text-sm font-semibold pt-2">
                {(["overview", "layers", "astm"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveModalTab(tab)}
                    className={`pb-2 border-b-2 transition-colors capitalize ${
                      activeModalTab === tab ? "border-[#0A2A57] text-[#0A2A57]" : "border-transparent text-slate-400"
                    }`}
                  >
                    {tab === "astm" ? "ASTM Metrics" : tab}
                  </button>
                ))}
              </div>

              <div className="py-4 text-sm space-y-3">
                {activeModalTab === "overview" && (
                  <div className="space-y-3">
                    <p className="text-slate-600">{quickViewProduct.description}</p>
                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl text-sm">
                      <div><span className="text-slate-400 block text-xs">Thickness</span><strong>{quickViewProduct.thickness}</strong></div>
                      <div><span className="text-slate-400 block text-xs">Lead Time</span><strong>{quickViewProduct.leadTime}</strong></div>
                    </div>
                  </div>
                )}
                {activeModalTab === "layers" && (
                  <ul className="space-y-2 text-slate-600 list-disc pl-4">
                    {quickViewProduct.features.map((feat, idx) => <li key={idx}>{feat}</li>)}
                  </ul>
                )}
                {activeModalTab === "astm" && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-100"><span className="text-slate-400">Tensile Strength</span><strong>&gt; 1.45 MPa</strong></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100"><span className="text-slate-400">Elongation at Break</span><strong>180%</strong></div>
                    <div className="flex justify-between py-1.5"><span className="text-slate-400">UV Weatherometer</span><strong>3,000 Hours</strong></div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex-row items-center justify-between border-t border-slate-100 pt-4">
                <Button variant="outline" size="sm" onClick={() => setIsTdsModalOpen(true)} className="rounded-full text-sm font-semibold flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Download TDS
                </Button>
                <Button
                  size="sm"
                  onClick={() => { handleQuickAdd(quickViewProduct); setQuickViewProduct(null); }}
                  className="rounded-full text-sm font-semibold bg-[#0A2A57] hover:bg-[#071D3D]"
                >
                  <ShoppingBag className="mr-1.5 h-4 w-4" /> Add to Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* TDS modal */}
        {isTdsModalOpen && (
          <Dialog open={isTdsModalOpen} onOpenChange={setIsTdsModalOpen}>
            <DialogContent className="max-w-md bg-white rounded-3xl p-6">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#0A2A57]" /> Download Technical Data Sheet
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-400">
                  Receive ASTM test reports and layer architecture drawings by email.
                </DialogDescription>
              </DialogHeader>

              {tdsSubmitted ? (
                <div className="py-6 text-center space-y-2">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="font-semibold text-sm">Sent to {tdsEmail}!</p>
                </div>
              ) : (
                <form onSubmit={handleTdsSubmit} className="space-y-3 py-2">
                  <Input
                    type="email"
                    value={tdsEmail}
                    onChange={(e) => setTdsEmail(e.target.value)}
                    placeholder="engineer@sportsinfra.in"
                    className="rounded-full text-sm"
                    required
                  />
                  <Button type="submit" className="w-full rounded-full font-semibold bg-[#0A2A57] hover:bg-[#071D3D] flex items-center justify-center gap-1.5">
                    <Send className="h-4 w-4" /> Email Specs Pack
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        )}

        {/* Floating cart */}
        {cartCount > 0 && (
          <aside className="fixed bottom-6 right-6 z-40">
            <Link href="/checkout">
              <button className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#0A2A57] text-white shadow-xl hover:scale-105 transition-transform">
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm font-semibold">₹{cartSubtotal.toLocaleString("en-IN")}</span>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>
            </Link>
          </aside>
        )}
      </main>

      <StorefrontFooter />
    </div>
  );
}
