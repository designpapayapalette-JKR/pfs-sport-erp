"use client";

import * as React from "react";
import Link from "next/link";
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
  Package,
  Plus,
  Search,
  Layers,
  CheckCircle2,
  FileText,
  DollarSign,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProductsPage() {
  const { products } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Products & Surface Catalog CMS
              </h1>
              <Badge variant="gold">Lightweight CMS Active</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Configure sports systems, certifications, technical thickness specs, MRP price lists, and attached TDS files.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add Product SKU
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
              placeholder="Filter products..."
              className="pl-9 text-xs"
            />
          </div>
        </div>

        {/* Products Table */}
        <Card className="bg-white border border-surfaceBorder shadow-xs overflow-hidden" padding="none">
          <Table>
            <TableHeader className="bg-neutral-50/80">
              <TableRow>
                <TableHead className="font-bold text-neutral-800">SKU & System Name</TableHead>
                <TableHead className="font-bold text-neutral-800">Category & Sports</TableHead>
                <TableHead className="font-bold text-neutral-800">Certification</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Standard MRP</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Platinum Price</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((p) => (
                <TableRow key={p.id} className="hover:bg-neutral-50/60">
                  <TableCell>
                    <p className="font-bold text-xs text-neutral-900">{p.name}</p>
                    <p className="text-[10px] font-mono text-neutral-500">{p.sku}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs font-semibold text-neutral-800">{p.category}</p>
                    <p className="text-[11px] text-neutral-500">{p.sports.join(", ")}</p>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-700">
                    <Badge variant="outline" size="sm" className="text-[10px]">
                      {p.certification}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-neutral-500 line-through">
                    ₹{p.mrpInr}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-xs text-[#0A2A57]">
                    ₹{p.platinumPrice}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Enterprise Product & Tiered Pricing Registration Left-Side Slide-Over Sheet */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-[100] flex justify-start">
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
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
                {/* Top Header Banner */}
                <div className="bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white p-5 sm:p-6 relative overflow-hidden shrink-0">
                  <div className="absolute right-0 top-0 w-72 h-72 bg-[#F36E21]/20 blur-3xl pointer-events-none rounded-full" />
                  <div className="absolute left-1/3 top-0 w-48 h-48 bg-[#E0A925]/15 blur-3xl pointer-events-none rounded-full" />

                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white/10 text-[#E0A925] flex items-center justify-center font-black shadow-xs shrink-0 border border-white/10">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-black text-white">
                            Register New Surfacing System / SKU
                          </h2>
                          <p className="text-xs text-slate-300">
                            Define technical specifications, physical parameters, and multi-tier rates.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="h-8.5 w-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 shrink-0"
                      >
                        <X className="h-4 w-4 stroke-[2.2]" />
                        <span className="sr-only">Close</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scrollable Body */}
                <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-4 text-xs">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="font-extrabold text-slate-800 block mb-1">Commercial Product Name</label>
                      <Input placeholder="e.g. PFS Pro Cushion 8-Layer Tournament Acrylic" className="rounded-xl text-xs bg-white h-10" />
                    </div>
                    <div>
                      <label className="font-extrabold text-slate-800 block mb-1">Master SKU Code</label>
                      <Input placeholder="PFS-AC-PRO-8" className="rounded-xl text-xs font-mono font-bold uppercase bg-white h-10" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-extrabold text-slate-800 block mb-1">System Classification</label>
                      <select className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30">
                        <option>Surface Systems (Acrylic Cushions)</option>
                        <option>Modular Tiles (PP Open Grid)</option>
                        <option>PU Flooring (Indoor Seamless)</option>
                        <option>Turf (Padel Monofilament)</option>
                        <option>Accessories (Lighting &amp; Posts)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-extrabold text-slate-800 block mb-1">Official Certification</label>
                      <Input placeholder="e.g. ITF Category 4 Medium-Fast" className="rounded-xl text-xs bg-white h-10" />
                    </div>
                  </div>

                  {/* Tiered Wholesale Pricing Matrix */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                    <span className="font-extrabold text-slate-800 block text-xs">
                      Commercial B2B Pricing Structure (Excl. 18% GST)
                    </span>
                    <div className="grid grid-cols-4 gap-2 font-mono">
                      <div>
                        <label className="text-[10px] font-sans text-slate-400 block font-bold uppercase">Platinum (₹)</label>
                        <Input type="number" placeholder="138.75" className="rounded-xl text-xs font-bold bg-white h-10" />
                      </div>
                      <div>
                        <label className="text-[10px] font-sans text-slate-400 block font-bold uppercase">Gold (₹)</label>
                        <Input type="number" placeholder="148.00" className="rounded-xl text-xs bg-white h-10" />
                      </div>
                      <div>
                        <label className="text-[10px] font-sans text-slate-400 block font-bold uppercase">Silver (₹)</label>
                        <Input type="number" placeholder="157.25" className="rounded-xl text-xs bg-white h-10" />
                      </div>
                      <div>
                        <label className="text-[10px] font-sans text-slate-400 block font-bold uppercase">Standard MRP</label>
                        <Input type="number" placeholder="185.00" className="rounded-xl text-xs bg-white h-10" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-extrabold text-slate-800 block mb-1">Minimum Order Qty (MOQ)</label>
                      <Input placeholder="e.g. 1,800 sq ft or 1 Drum" className="rounded-xl text-xs bg-white h-10" />
                    </div>
                    <div>
                      <label className="font-extrabold text-slate-800 block mb-1">Super Hub Dispatch SLA</label>
                      <Input placeholder="e.g. 24 - 48 Hours Guaranteed" className="rounded-xl text-xs bg-white h-10" />
                    </div>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                  <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)} className="rounded-xl text-xs font-bold px-4 h-10">
                    Cancel
                  </Button>
                  <Button
                    variant="accent"
                    size="default"
                    onClick={() => {
                      alert("Product SKU registered in ERP catalog.");
                      setIsAddModalOpen(false);
                    }}
                    className="rounded-xl text-xs font-black bg-[#F36E21] hover:bg-[#D95D16] text-white shadow-md h-10 px-6"
                  >
                    <Check className="mr-1.5 h-3.5 w-3.5" /> Save &amp; Publish System SKU
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
