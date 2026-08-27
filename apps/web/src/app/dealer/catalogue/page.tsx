"use client";

import * as React from "react";
import Link from "next/link";
import { DealerLayout } from "@/components/layout";
import { PageHeader } from "@/components/layout/page-header";
import { FilterBar } from "@/components/ui/filter-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { useERP } from "@/context/erp-context";
import { ProductItem } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
} from "@pfs/ui";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  MotionCard,
  LivePulseDot,
} from "@/components/motion";
import {
  Package,
  Search,
  ShoppingCart,
  CheckCircle2,
  Filter,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info,
  Check,
} from "lucide-react";

export default function CataloguePage() {
  const { products, currentUser, addToCart, cart } = useERP();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedSport, setSelectedSport] = React.useState<string>("All");
  const [addedProductId, setAddedProductId] = React.useState<string | null>(null);

  const categories = ["All", "Surface Systems", "Modular Tiles", "PU Flooring", "Turf", "Accessories"];
  const sports = ["All", "Pickleball", "Tennis", "Padel", "Badminton", "Basketball"];

  const getDealerPrice = (prod: ProductItem) => {
    if (currentUser.dealerTier === "Platinum") return { price: prod.platinumPrice, discount: "25% OFF" };
    if (currentUser.dealerTier === "Gold") return { price: prod.goldPrice, discount: "18% OFF" };
    if (currentUser.dealerTier === "Silver") return { price: prod.silverPrice, discount: "10% OFF" };
    return { price: prod.mrpInr, discount: "MRP" };
  };

  const filteredProducts = products.filter((prod) => {
    const matchesCat = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesSport =
      selectedSport === "All" || prod.sports.some((s) => s.toLowerCase() === selectedSport.toLowerCase());
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSport && matchesSearch;
  });

  const handleQuickAdd = (prod: ProductItem) => {
    addToCart(prod, prod.category === "Accessories" ? 1 : 1800); // 1 court default
    setAddedProductId(prod.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  return (
    <DealerLayout>
      <PageTransition className="space-y-6">
        {/* Standardized Page Header */}
        <PageHeader
          title="Product Catalogue & Surface Systems"
          description="Official PFS Sport pure acrylic systems, ITF-certified cushion formulas, and FIBA-compliant interlocking modular tiles."
          badgeText={`${currentUser.dealerTier || "Platinum"} Tier Pricing Active`}
          badgeVariant="gold"
          pulseColor="amber"
        >
          <Link href="/dealer/orders">
            <Button variant="accent" size="sm" className="rounded-xl shadow-xs">
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              View Order Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
            </Button>
          </Link>
        </PageHeader>

        {/* Standardized Filter Toolbar */}
        <div className="space-y-3">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search systems by SKU, sport, keyword..."
          >
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#0A2A57] text-white shadow-xs"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FilterBar>

          {/* Secondary Sports Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto px-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Filter by Sport:
            </span>
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedSport === sport
                    ? "bg-slate-800 text-white font-bold"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((prod) => {
            const pricing = getDealerPrice(prod);
            const isAdded = addedProductId === prod.id;
            const availableStock = prod.stockOnHands - prod.stockReserved;
            const isLowStock = availableStock <= prod.reorderLevel;

            return (
              <StaggerItem key={prod.id}>
                <MotionCard className="bg-white border border-slate-200/80 shadow-xs hover:shadow-lg transition-all rounded-2xl overflow-hidden flex flex-col justify-between h-full card-hover-effect">
                  <div>
                    {/* Header Image / Render Visual */}
                    <div className="h-44 bg-gradient-to-br from-slate-900 via-[#0A2A57] to-slate-950 p-4 relative flex flex-col justify-between overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(25,118,210,0.25),transparent_70%)] pointer-events-none" />

                      <div className="flex items-center justify-between relative z-10">
                        <Badge variant="outline" size="sm" className="bg-black/40 text-white border-white/20 backdrop-blur-md rounded-full text-[10px]">
                          {prod.category}
                        </Badge>
                        <Badge variant={isLowStock ? "warning" : "success"} size="sm" className="rounded-full text-[10px]">
                          {isLowStock ? "Buffer Low" : "In Stock"}
                        </Badge>
                      </div>

                      <div className="relative z-10 space-y-0.5">
                        <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest block">
                          SKU: {prod.sku}
                        </span>
                        <h3 className="font-extrabold text-base text-white leading-snug drop-shadow-sm">
                          {prod.name}
                        </h3>
                      </div>
                    </div>

                    {/* Content Specs */}
                    <div className="p-5 space-y-3">
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {prod.sports.map((sp) => (
                          <span
                            key={sp}
                            className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md"
                          >
                            {sp}
                          </span>
                        ))}
                      </div>

                      {/* Technical Specs Strip */}
                      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600">
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase">Thickness</span>
                          <span className="font-bold text-slate-800 truncate block">{prod.thickness}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase">Lead Time</span>
                          <span className="font-bold text-slate-800">{prod.leadTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Footer */}
                  <div className="p-5 pt-0 mt-auto">
                    <div className="pt-3 border-t border-slate-100 flex items-end justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                          Dealer Wholesale ({pricing.discount})
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-lg font-black font-mono text-slate-900">
                            ₹{pricing.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono line-through">
                            ₹{prod.mrpInr}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            / {prod.category === "Accessories" ? "unit" : "sq ft"}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {availableStock.toLocaleString("en-IN")} {prod.category === "Accessories" ? "units" : "sq ft"} Avail.
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/dealer/catalogue/${prod.id}`}>
                        <Button variant="outline" size="sm" className="w-full text-xs rounded-xl font-bold">
                          Specs & TDS
                        </Button>
                      </Link>

                      <Button
                        variant={isAdded ? "success" : "accent"}
                        size="sm"
                        className="w-full text-xs rounded-xl font-bold shadow-xs"
                        onClick={() => handleQuickAdd(prod)}
                      >
                        {isAdded ? (
                          <>
                            <Check className="mr-1 h-3.5 w-3.5" /> Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-1 h-3.5 w-3.5" /> Quick Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {filteredProducts.length === 0 && (
          <EmptyState
            title="No Surface Systems Found"
            description={`No products match your search "${searchQuery}" or selected category filters. Try clearing filters to see full inventory.`}
            actionLabel="Reset All Filters"
            onAction={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedSport("All");
            }}
          />
        )}
      </PageTransition>
    </DealerLayout>
  );
}
