"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
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
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Plus,
  Search,
  Building2,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  FileSpreadsheet,
  Check,
  X,
  Package,
  Boxes,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Warehouse,
} from "lucide-react";

export default function AdminInventoryPage() {
  const { products, adjustProductStock } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedWarehouse, setSelectedWarehouse] = React.useState("All Hubs");
  const [isAdjustModalOpen, setIsAdjustModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<ProductItem | null>(null);
  const [adjustQty, setAdjustQty] = React.useState<number>(1000);
  const [adjustWarehouse, setAdjustWarehouse] = React.useState("Bhiwandi Central Super Hub (MH)");
  const [adjustReason, setAdjustReason] = React.useState("Factory Stock Receipt (Chennai Plant)");
  const [batchLot, setBatchLot] = React.useState("BATCH-2026-AC-09");
  const [adjustSuccess, setAdjustSuccess] = React.useState(false);

  const categories = ["All", "Surface Systems", "Modular Tiles", "Turf", "PU Flooring", "Accessories"];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalOnHand = products.reduce((sum, p) => sum + p.stockOnHands, 0);
  const totalReserved = products.reduce((sum, p) => sum + p.stockReserved, 0);
  const lowStockCount = products.filter((p) => p.stockOnHands - p.stockReserved <= p.reorderLevel).length;

  const handleOpenAdjust = (prod: ProductItem) => {
    setSelectedProduct(prod);
    setAdjustQty(1000);
    setIsAdjustModalOpen(true);
    setAdjustSuccess(false);
  };

  const handleConfirmAdjust = () => {
    if (!selectedProduct) return;
    adjustProductStock(selectedProduct.id, adjustQty, adjustWarehouse, adjustReason, batchLot);
    setAdjustSuccess(true);
    setTimeout(() => {
      setIsAdjustModalOpen(false);
      setAdjustSuccess(false);
    }, 1200);
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-5">
        {/* ===================================================================== */}
        {/* 1. PAGE HEADER                                                        */}
        {/* ===================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Inventory Ledgers & Multi-Warehouse Stock
              </h1>
              <Badge variant="success" className="rounded-full text-[10px] font-extrabold flex items-center gap-1.5 px-2.5 py-0.5">
                <LivePulseDot color="emerald" size="sm" />
                ACID Transactions Enforced
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live balances across Bhiwandi Super Hub, Okhla Central, and Peenya Facility with real-time storefront synchronization.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={() => handleOpenAdjust(products[0])}
              className="rounded-xl bg-[#F36E21] hover:bg-[#D95D16] text-white text-xs font-extrabold shadow-xs"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Record Stock Adjustment
            </Button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. TELEMETRY KPI STRIP                                                */}
        {/* ===================================================================== */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: "Physical On-Hand Volume",
              value: totalOnHand,
              suffix: " sq ft/units",
              icon: Boxes,
              iconBg: "bg-blue-50 text-blue-600",
              sub: "Across all 3 Hubs",
            },
            {
              label: "Active Stock Reservations",
              value: totalReserved,
              suffix: " sq ft/units",
              icon: Layers,
              iconBg: "bg-amber-50 text-amber-700",
              sub: "Locked for open POs",
            },
            {
              label: "Net Available Stock",
              value: totalOnHand - totalReserved,
              suffix: " sq ft/units",
              icon: CheckCircle2,
              iconBg: "bg-emerald-50 text-emerald-700",
              sub: "Free for immediate dispatch",
            },
            {
              label: "Low Stock Watchlist",
              value: lowStockCount,
              suffix: " SKUs",
              icon: AlertTriangle,
              iconBg: lowStockCount > 0 ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-600",
              sub: lowStockCount > 0 ? "Below reorder threshold" : "All SKUs buffered",
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
              placeholder="Search by SKU or system…"
              className="h-8 pl-8.5 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. STOCK LEDGER TABLE                                                 */}
        {/* ===================================================================== */}
        <Card className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden" padding="none">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/90">
                <TableRow>
                  <TableHead className="font-bold text-slate-800 text-xs">SKU &amp; Product System</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Category</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">On-Hand</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Reserved</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Net Available</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Reorder Threshold</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Package className="h-8 w-8 text-slate-200" />
                        <span className="text-sm font-semibold">No inventory SKUs match your filter</span>
                        <span className="text-xs">Try searching for a different system code</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((p) => {
                    const avail = p.stockOnHands - p.stockReserved;
                    const isLow = avail <= p.reorderLevel;
                    const unit = p.category === "Accessories" ? "units" : "sq ft";

                    return (
                      <TableRow key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-black text-xs shrink-0">
                              <Boxes className="h-4 w-4 text-slate-600" />
                            </div>
                            <div>
                              <p className="font-bold text-xs text-slate-900">{p.name}</p>
                              <p className="text-[10px] font-mono text-slate-400">{p.sku} · {p.certification}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" size="sm" className="rounded-full text-[10px]">
                            {p.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs text-slate-800">
                          {p.stockOnHands.toLocaleString("en-IN")} {unit}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs text-slate-400">
                          {p.stockReserved.toLocaleString("en-IN")} {unit}
                        </TableCell>
                        <TableCell className="text-right font-mono font-black text-xs">
                          <span className={isLow ? "text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200" : "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"}>
                            {avail.toLocaleString("en-IN")} {unit}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs text-slate-500">
                          {p.reorderLevel.toLocaleString("en-IN")} {unit}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs font-bold rounded-lg border-slate-200 text-slate-700 hover:bg-slate-100"
                            onClick={() => handleOpenAdjust(p)}
                          >
                            Adjust / Receipt
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

        {/* ===================================================================== */}
        {/* 5. STOCK ADJUSTMENT SLIDE-OVER SHEET                                  */}
        {/* ===================================================================== */}
        <AnimatePresence>
          {isAdjustModalOpen && selectedProduct && (
            <div className="fixed inset-0 z-[100] flex justify-start">
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAdjustModalOpen(false)}
                className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity"
              />

              {/* Left Slide-over Sheet Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="relative z-10 w-full sm:max-w-xl md:max-w-2xl bg-white h-screen shadow-2xl flex flex-col border-r border-slate-200 overflow-hidden text-neutral-900"
              >
                {/* Sticky Header Banner */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white flex items-center justify-between border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20 text-[#E0A925] flex items-center justify-center font-black shadow-inner shrink-0">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                          Record Stock Movement
                        </h2>
                        <Badge variant="gold" size="sm" className="rounded-full text-[10px] font-mono">
                          {selectedProduct.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {selectedProduct.name} ({selectedProduct.sku})
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAdjustModalOpen(false)}
                    className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 shrink-0"
                  >
                    <X className="h-4.5 w-4.5 stroke-[2.2]" />
                    <span className="sr-only">Close Drawer</span>
                  </button>
                </div>

                {/* Real-time Live Stock Telemetry Preview Ribbon */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-50 border-b border-slate-200/80 shrink-0 text-xs font-mono">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block">Current On-Hand</span>
                    <strong className="text-slate-900 font-bold block truncate">
                      {selectedProduct.stockOnHands.toLocaleString("en-IN")} {selectedProduct.category === "Accessories" ? "Units" : "sq ft"}
                    </strong>
                  </div>
                  <div className={`p-2.5 rounded-xl border shadow-2xs ${adjustQty >= 0 ? "bg-emerald-50/90 border-emerald-200" : "bg-rose-50/90 border-rose-200"}`}>
                    <span className={`text-[9px] font-sans font-bold uppercase block ${adjustQty >= 0 ? "text-emerald-800" : "text-rose-800"}`}>
                      Adjustment Delta
                    </span>
                    <strong className={`font-black block truncate ${adjustQty >= 0 ? "text-emerald-900" : "text-rose-900"}`}>
                      {adjustQty >= 0 ? `+${adjustQty}` : adjustQty}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-200 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-amber-800 uppercase block">Projected Total</span>
                    <strong className="text-amber-900 font-black block truncate">
                      {(selectedProduct.stockOnHands + (Number(adjustQty) || 0)).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                {/* Scrollable Form Body */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3">
                    <span className="font-extrabold text-slate-800 block text-xs flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-slate-500" />
                      Warehouse Location &amp; Ledger Delta
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">
                          Fulfillment Super Hub *
                        </label>
                        <select
                          value={adjustWarehouse}
                          onChange={(e) => setAdjustWarehouse(e.target.value)}
                          className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                        >
                          <option>Bhiwandi Central Super Hub (MH)</option>
                          <option>Okhla Industrial Super Hub (Delhi NCR)</option>
                          <option>Peenya Logistics Facility (Bengaluru)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">
                          Adjustment Quantity (+ / -) *
                        </label>
                        <Input
                          type="number"
                          value={adjustQty}
                          onChange={(e) => setAdjustQty(Number(e.target.value))}
                          className="rounded-xl text-xs font-mono font-bold bg-white h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">
                          Batch / Lot Barcode Number *
                        </label>
                        <Input
                          value={batchLot}
                          onChange={(e) => setBatchLot(e.target.value)}
                          placeholder="e.g. BATCH-2026-AC-09"
                          className="rounded-xl text-xs font-mono bg-white h-10"
                        />
                      </div>
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">
                          QC Specimen Sign-Off
                        </label>
                        <div className="h-10 px-3 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>COA Lab Specimen Verified</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="font-extrabold text-slate-700 block mb-1">
                        Audited Reason &amp; Reference *
                      </label>
                      <Input
                        value={adjustReason}
                        onChange={(e) => setAdjustReason(e.target.value)}
                        placeholder="e.g. Inward factory production receipt GRN-8821 or physical cycle count"
                        className="rounded-xl text-xs bg-white h-10"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-[10px] text-blue-900">
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    <span>Every stock change is logged to the Immutable Audit Trail with cryptographic timestamp and actor ID.</span>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                  <Button variant="outline" size="sm" onClick={() => setIsAdjustModalOpen(false)} className="rounded-xl text-xs font-bold px-4 h-10">
                    Cancel
                  </Button>
                  <Button
                    variant="accent"
                    size="default"
                    onClick={handleConfirmAdjust}
                    disabled={adjustSuccess}
                    className="rounded-xl text-xs font-black bg-[#F36E21] hover:bg-[#D95D16] text-white h-10 px-6"
                  >
                    {adjustSuccess ? (
                      <>
                        <Check className="mr-1.5 h-4 w-4" /> Movement Recorded &amp; Audited!
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-1.5 h-4 w-4" /> Post Stock Transaction
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </PageTransition>
    </AdminLayout>
  );
}
