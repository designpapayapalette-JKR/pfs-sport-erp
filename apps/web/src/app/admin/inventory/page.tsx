"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
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
  Input,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@pfs/ui";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminInventoryPage() {
  const { products } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAdjustModalOpen, setIsAdjustModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<ProductItem | null>(null);
  const [adjustQty, setAdjustQty] = React.useState(1000);
  const [adjustReason, setAdjustReason] = React.useState("Factory Stock Receipt (Chennai Plant)");
  const [batchLot, setBatchLot] = React.useState("BATCH-2026-AC-09");
  const [adjustSuccess, setAdjustSuccess] = React.useState(false);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdjust = (prod: ProductItem) => {
    setSelectedProduct(prod);
    setIsAdjustModalOpen(true);
    setAdjustSuccess(false);
  };

  const handleConfirmAdjust = () => {
    setAdjustSuccess(true);
    setTimeout(() => {
      setIsAdjustModalOpen(false);
      setAdjustSuccess(false);
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Inventory Ledgers & Multi-Warehouse Stock
              </h1>
              <Badge variant="success">ACID Transactions Enforced</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Live balances across Bhiwandi Super Hub, Okhla Central, and Peenya Facility with batch/lot tracking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={() => handleOpenAdjust(products[0])}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Record Stock Adjustment
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-end">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU or system..."
              className="pl-9 text-xs"
            />
          </div>
        </div>

        {/* Stock Ledger Table */}
        <Card className="bg-white border border-surfaceBorder shadow-xs overflow-hidden" padding="none">
          <Table>
            <TableHeader className="bg-neutral-50/80">
              <TableRow>
                <TableHead className="font-bold text-neutral-800">SKU & Product Name</TableHead>
                <TableHead className="font-bold text-neutral-800">Category</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Physical On-Hand</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Active Reservations</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Available</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Reorder Threshold</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((p) => {
                const avail = p.stockOnHands - p.stockReserved;
                const isLow = avail <= p.reorderLevel;
                const unit = p.category === "Accessories" ? "units" : "sq ft";

                return (
                  <TableRow key={p.id} className="hover:bg-neutral-50/60">
                    <TableCell>
                      <p className="font-bold text-xs text-neutral-900">{p.name}</p>
                      <p className="text-[10px] font-mono text-neutral-500">{p.sku}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" size="sm">
                        {p.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-neutral-800">
                      {p.stockOnHands.toLocaleString("en-IN")} {unit}
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-neutral-500">
                      {p.stockReserved.toLocaleString("en-IN")} {unit}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-xs text-neutral-900">
                      <span className={isLow ? "text-amber-700" : "text-emerald-700"}>
                        {avail.toLocaleString("en-IN")} {unit}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-neutral-500">
                      {p.reorderLevel.toLocaleString("en-IN")} {unit}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => handleOpenAdjust(p)}
                      >
                        Adjust / Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>

        {/* Enterprise Stock Adjustment & Movement Left-Side Slide-Over Sheet */}
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

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
                  {/* Section 1: Super Hub & Quantity */}
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
                        <select className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30">
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
      </div>
    </AdminLayout>
  );
}
