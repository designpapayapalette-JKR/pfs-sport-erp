"use client";

import * as React from "react";
import Link from "next/link";
import { DealerLayout } from "@/components/layout";
import { useERP } from "@/context/erp-context";
import { ProductItem } from "@/lib/mock-data";
import {
  Card,
  Button,
  Badge,
  Input,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@pfs/ui";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  MotionCard,
  LivePulseDot,
  AnimatedNumber,
} from "@/components/motion";
import { motion } from "framer-motion";
import {
  Layers,
  Search,
  ShoppingCart,
  Check,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Truck,
  ArrowRight,
  Sparkles,
  Boxes,
  Package,
} from "lucide-react";

export default function DealerInventoryPage() {
  const { products, currentUser, addToCart } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedWarehouse, setSelectedWarehouse] = React.useState("All");
  const [addedSku, setAddedSku] = React.useState<string | null>(null);

  const categories = ["All", "Surface Systems", "Modular Tiles", "Turf", "PU Flooring", "Accessories"];

  const warehouses = [
    { id: "All", name: "All Super Hubs" },
    { id: "Bhiwandi", name: "Bhiwandi Super Hub (West)" },
    { id: "Delhi", name: "Okhla Central (North)" },
    { id: "Bengaluru", name: "Peenya Facility (South)" },
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalStock = products.reduce((sum, p) => sum + p.stockOnHands, 0);
  const totalReserved = products.reduce((sum, p) => sum + p.stockReserved, 0);

  const handleAddToCart = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.category === "Accessories" ? 1 : 1800);
    setAddedSku(product.sku);
    setTimeout(() => setAddedSku(null), 2000);
  };

  const getDealerPrice = (prod: ProductItem) => {
    if (currentUser.dealerTier === "Platinum") return prod.platinumPrice;
    if (currentUser.dealerTier === "Gold") return prod.goldPrice;
    if (currentUser.dealerTier === "Silver") return prod.silverPrice;
    return prod.mrpInr;
  };

  return (
    <DealerLayout>
      <PageTransition className="space-y-5">
        {/* ===================================================================== */}
        {/* 1. PAGE HEADER COMMAND BAR                                            */}
        {/* ===================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Live Inventory & Multi-Hub Allocation
              </h1>
              <Badge variant="platinum" className="rounded-full text-[10px] font-extrabold flex items-center gap-1.5 px-2.5 py-0.5">
                <LivePulseDot color="emerald" size="sm" />
                {currentUser.dealerTier || "Platinum"} Tier Active
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live batch availability across Bhiwandi, Okhla, and Peenya facilities with 1-click cart allocation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dealer/orders">
              <Button
                variant="accent"
                size="sm"
                className="rounded-xl bg-[#F36E21] hover:bg-[#D95D16] text-white text-xs font-extrabold shadow-xs"
              >
                <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                Review Orders &amp; Cart
              </Button>
            </Link>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. KPI TELEMETRY STRIP                                                */}
        {/* ===================================================================== */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: "Factory Stock Available",
              value: totalStock - totalReserved,
              suffix: " sq ft",
              icon: Boxes,
              iconBg: "bg-emerald-50 text-emerald-700",
              sub: "Free for order reservation",
            },
            {
              label: "Allocated in Consignments",
              value: totalReserved,
              suffix: " sq ft",
              icon: Layers,
              iconBg: "bg-amber-50 text-amber-700",
              sub: "Processing for dispatch",
            },
            {
              label: "Regional Super Hubs",
              value: 3,
              suffix: " Hubs",
              icon: Building2,
              iconBg: "bg-blue-50 text-blue-600",
              sub: "Bhiwandi, Delhi, Peenya",
            },
            {
              label: "Dispatch Guarantee",
              value: 24,
              suffix: " - 48 Hrs",
              icon: Truck,
              iconBg: "bg-purple-50 text-purple-600",
              sub: "Standard Pan-India SLA",
            },
          ].map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <StaggerItem key={i}>
                <MotionCard className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex items-center justify-between cursor-default">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      {kpi.label}
                    </span>
                    <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">
                      <AnimatedNumber value={kpi.value} />
                      <span className="text-xs font-normal text-slate-500">{kpi.suffix}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{kpi.sub}</span>
                  </div>
                  <div className={`h-9 w-9 rounded-xl ${kpi.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* ===================================================================== */}
        {/* 3. FILTERS & SEARCH TOOLBAR                                           */}
        {/* ===================================================================== */}
        <div className="flex flex-col md:flex-row gap-2.5 justify-between items-start md:items-center bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#040C1A] text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search systems or SKUs…"
              className="h-8 pl-8.5 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. PRODUCTS & STOCK LEDGER TABLE                                      */}
        {/* ===================================================================== */}
        <Card className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden" padding="none">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/90">
                <TableRow>
                  <TableHead className="font-bold text-slate-800 text-xs">SKU &amp; System Name</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Category</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Wholesale Rate</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Net Available</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Dispatch SLA</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Cart Allocation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Package className="h-8 w-8 text-slate-200" />
                        <span className="text-sm font-semibold">No products found</span>
                        <span className="text-xs">Try selecting a different system category</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((prod) => {
                    const avail = prod.stockOnHands - prod.stockReserved;
                    const isLow = avail <= prod.reorderLevel;
                    const isAdded = addedSku === prod.sku;
                    const unit = prod.category === "Accessories" ? "units" : "sq ft";
                    const price = getDealerPrice(prod);

                    return (
                      <TableRow key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-black text-xs shrink-0">
                              <Boxes className="h-4 w-4 text-slate-600" />
                            </div>
                            <div>
                              <p className="font-bold text-xs text-slate-900">{prod.name}</p>
                              <p className="text-[10px] font-mono text-slate-400">
                                {prod.sku} · {prod.certification}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" size="sm" className="rounded-full text-[10px]">
                            {prod.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-xs text-slate-900">
                          ₹{price.toFixed(2)} / {unit === "units" ? "unit" : "sq ft"}
                        </TableCell>
                        <TableCell className="text-right font-mono font-black text-xs">
                          <span
                            className={
                              isLow
                                ? "text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200"
                                : "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"
                            }
                          >
                            {avail.toLocaleString("en-IN")} {unit}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                            <Truck className="h-3.5 w-3.5 text-slate-400" />
                            {prod.leadTime} Dispatch
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant={isAdded ? "default" : "accent"}
                            size="sm"
                            onClick={(e) => handleAddToCart(prod, e)}
                            className={`h-7 text-xs font-bold rounded-lg ${
                              isAdded
                                ? "bg-emerald-600 text-white"
                                : "bg-[#F36E21] hover:bg-[#D95D16] text-white"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="mr-1 h-3 w-3" /> Allocated!
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="mr-1 h-3 w-3" /> + Add to Cart
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </PageTransition>
    </DealerLayout>
  );
}