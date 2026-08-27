"use client";

import * as React from "react";
import Link from "next/link";
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
  Sparkles,
  Boxes,
  Award,
} from "lucide-react";

export default function AdminProductsPage() {
  const { products, addNewProduct, updateProduct } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<ProductItem | null>(null);

  // Form Fields
  const [formName, setFormName] = React.useState("");
  const [formSku, setFormSku] = React.useState("");
  const [formCategory, setFormCategory] = React.useState<ProductItem["category"]>("Surface Systems");
  const [formSports, setFormSports] = React.useState("Pickleball, Tennis");
  const [formCertification, setFormCertification] = React.useState("ITF Category 4 Medium-Fast");
  const [formMrp, setFormMrp] = React.useState<number>(185);
  const [formPlatinum, setFormPlatinum] = React.useState<number>(138.75);
  const [formGold, setFormGold] = React.useState<number>(148);
  const [formSilver, setFormSilver] = React.useState<number>(157.25);
  const [formStock, setFormStock] = React.useState<number>(12000);
  const [formLeadTime, setFormLeadTime] = React.useState<number>(2);
  const [formThickness, setFormThickness] = React.useState<number>(4.5);
  const [formSavedSuccess, setFormSavedSuccess] = React.useState(false);

  const categories = ["All", "Surface Systems", "Modular Tiles", "Turf", "PU Flooring", "Accessories"];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName("");
    setFormSku(`PFS-SKU-${Math.floor(100 + Math.random() * 900)}`);
    setFormCategory("Surface Systems");
    setFormSports("Pickleball, Tennis");
    setFormCertification("ITF Category 4 Medium-Fast");
    setFormMrp(185);
    setFormPlatinum(138.75);
    setFormGold(148);
    setFormSilver(157.25);
    setFormStock(10000);
    setFormLeadTime(2);
    setFormThickness(4.5);
    setIsAddModalOpen(true);
    setFormSavedSuccess(false);
  };

  const handleOpenEdit = (p: ProductItem) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormSku(p.sku);
    setFormCategory(p.category);
    setFormSports(p.sports.join(", "));
    setFormCertification(p.certification);
    setFormMrp(p.mrpInr);
    setFormPlatinum(p.platinumPrice);
    setFormGold(p.goldPrice);
    setFormSilver(p.silverPrice);
    setFormStock(p.stockOnHands);
    setFormLeadTime(parseInt(p.leadTime) || 2);
    setFormThickness(parseFloat(p.thickness) || 4.5);
    setIsAddModalOpen(true);
    setFormSavedSuccess(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sportsArr = formSports.split(",").map((s) => s.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        sku: formSku,
        category: formCategory,
        sports: sportsArr,
        certification: formCertification,
        mrpInr: Number(formMrp),
        platinumPrice: Number(formPlatinum),
        goldPrice: Number(formGold),
        silverPrice: Number(formSilver),
        stockOnHands: Number(formStock),
        leadTime: `${formLeadTime} Days`,
        thickness: `${formThickness} mm`,
      });
    } else {
      addNewProduct({
        name: formName,
        sku: formSku,
        category: formCategory,
        sports: sportsArr,
        systemTier: "Pro Tour (8-Layer)",
        thickness: `${formThickness} mm`,
        indoorOutdoor: "Indoor & Outdoor",
        certification: formCertification,
        moq: "1,800 sq ft (1 Standard Court Kit)",
        leadTime: `${formLeadTime} Days`,
        mrpInr: Number(formMrp),
        silverPrice: Number(formSilver),
        goldPrice: Number(formGold),
        platinumPrice: Number(formPlatinum),
        stockOnHands: Number(formStock),
        stockReserved: 0,
        reorderLevel: 2500,
        description: `High performance ${formName} surfacing system for professional competition.`,
        imageUrl: "/assets/products/acrylic-cushion.jpg",
        features: [
          `${formThickness} mm Calibrated Application`,
          formCertification,
          "UV-Resistant Micro-Textured Pigments",
          "Factory Certified Batch Tracking",
        ],
      });
    }

    setFormSavedSuccess(true);
    setTimeout(() => {
      setIsAddModalOpen(false);
      setFormSavedSuccess(false);
    }, 1000);
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-5">
        {/* ===================================================================== */}
        {/* 1. PAGE HEADER COMMAND BAR                                            */}
        {/* ===================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Products &amp; Surface Catalog CMS
              </h1>
              <Badge variant="gold" className="rounded-full text-[10px] font-extrabold flex items-center gap-1.5 px-2.5 py-0.5">
                <LivePulseDot color="orange" size="sm" />
                Live Catalog Synced
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure sports systems, certifications, technical thickness specs, MRP price lists, and wholesale tiers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={handleOpenAdd}
              className="rounded-xl bg-[#F36E21] hover:bg-[#D95D16] text-white text-xs font-extrabold shadow-xs"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Product SKU
            </Button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. KPI TELEMETRY STRIP                                                */}
        {/* ===================================================================== */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: "Active Catalog Systems",
              value: products.length,
              suffix: " SKUs",
              icon: Package,
              iconBg: "bg-blue-50 text-blue-600",
              sub: "Live in dealer catalogue",
            },
            {
              label: "Surface Formulations",
              value: products.filter((p) => p.category === "Surface Systems").length,
              suffix: " Systems",
              icon: Layers,
              iconBg: "bg-purple-50 text-purple-600",
              sub: "Acrylic cushions & hardcourts",
            },
            {
              label: "Modular & Turf Lines",
              value: products.filter((p) => p.category === "Modular Tiles" || p.category === "Turf").length,
              suffix: " Systems",
              icon: Boxes,
              iconBg: "bg-emerald-50 text-emerald-700",
              sub: "Interlocking & synthetic turf",
            },
            {
              label: "Certified Product Lines",
              value: products.filter((p) => p.certification.includes("ITF") || p.certification.includes("BWF") || p.certification.includes("FIP")).length,
              suffix: " Lines",
              icon: Award,
              iconBg: "bg-amber-50 text-amber-700",
              sub: "ITF, BWF, FIP Certified",
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
              placeholder="Search catalog SKUs…"
              className="h-8 pl-8.5 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. PRODUCTS TABLE                                                     */}
        {/* ===================================================================== */}
        <Card className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden" padding="none">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/90">
                <TableRow>
                  <TableHead className="font-bold text-slate-800 text-xs">SKU &amp; System Name</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Category &amp; Sports</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Certification</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Standard MRP</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Platinum Price</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Package className="h-8 w-8 text-slate-200" />
                        <span className="text-sm font-semibold">No catalog SKUs found</span>
                        <span className="text-xs">Try selecting a different system category</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((p) => (
                    <TableRow key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-black text-xs shrink-0">
                            <Package className="h-4 w-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-900">{p.name}</p>
                            <p className="text-[10px] font-mono text-slate-400">{p.sku}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs font-bold text-slate-800">{p.category}</p>
                        <p className="text-[10px] text-slate-500">{p.sports.join(", ")}</p>
                      </TableCell>
                      <TableCell className="text-xs text-slate-700">
                        <Badge variant="outline" size="sm" className="text-[10px] rounded-full">
                          {p.certification}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-slate-400 line-through">
                        ₹{p.mrpInr.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-black text-xs text-emerald-700">
                        ₹{p.platinumPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(p)}
                          className="h-7 text-xs font-bold rounded-lg border-slate-200 text-slate-700 hover:bg-slate-100"
                        >
                          <Edit className="h-3 w-3 mr-1" /> Edit SKU
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* ===================================================================== */}
        {/* 5. ADD / EDIT PRODUCT SLIDE-OVER DRAWER                               */}
        {/* ===================================================================== */}
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
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-white/10 text-[#E0A925] flex items-center justify-center font-black shadow-xs shrink-0 border border-white/10">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-black text-white">
                          {editingProduct ? `Edit ${editingProduct.name}` : "Register New Surfacing System / SKU"}
                        </h2>
                        <p className="text-xs text-slate-300">
                          Define technical specifications, physical parameters, and multi-tier wholesale rates.
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

                {/* Form Body */}
                <form onSubmit={handleSaveProduct} className="flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-4 text-xs">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="font-extrabold text-slate-800 block mb-1">Commercial Product Name *</label>
                        <Input
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. PFS Pro Cushion 8-Layer Tournament Acrylic"
                          className="rounded-xl text-xs bg-white h-10"
                        />
                      </div>
                      <div>
                        <label className="font-extrabold text-slate-800 block mb-1">Master SKU Code *</label>
                        <Input
                          required
                          value={formSku}
                          onChange={(e) => setFormSku(e.target.value)}
                          placeholder="PFS-AC-PRO-8"
                          className="rounded-xl text-xs font-mono font-bold uppercase bg-white h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-extrabold text-slate-800 block mb-1">System Classification</label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as ProductItem["category"])}
                          className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                        >
                          <option value="Surface Systems">Surface Systems (Acrylic Cushions)</option>
                          <option value="Modular Tiles">Modular Tiles (PP Open Grid)</option>
                          <option value="PU Flooring">PU Flooring (Indoor Seamless)</option>
                          <option value="Turf">Turf (Padel Monofilament)</option>
                          <option value="Accessories">Accessories (Lighting &amp; Posts)</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-extrabold text-slate-800 block mb-1">Official Certification</label>
                        <Input
                          value={formCertification}
                          onChange={(e) => setFormCertification(e.target.value)}
                          placeholder="e.g. ITF Category 4 Medium-Fast"
                          className="rounded-xl text-xs bg-white h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-extrabold text-slate-800 block mb-1">Sports Compatibility (Comma separated)</label>
                        <Input
                          value={formSports}
                          onChange={(e) => setFormSports(e.target.value)}
                          placeholder="e.g. Pickleball, Tennis, Multi-Sport"
                          className="rounded-xl text-xs bg-white h-10"
                        />
                      </div>
                      <div>
                        <label className="font-extrabold text-slate-800 block mb-1">Initial Stock On-Hand</label>
                        <Input
                          type="number"
                          value={formStock}
                          onChange={(e) => setFormStock(Number(e.target.value))}
                          className="rounded-xl text-xs font-mono bg-white h-10"
                        />
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
                          <Input
                            type="number"
                            step="0.01"
                            value={formPlatinum}
                            onChange={(e) => setFormPlatinum(Number(e.target.value))}
                            className="rounded-xl text-xs font-bold bg-white h-10"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-sans text-slate-400 block font-bold uppercase">Gold (₹)</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={formGold}
                            onChange={(e) => setFormGold(Number(e.target.value))}
                            className="rounded-xl text-xs bg-white h-10"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-sans text-slate-400 block font-bold uppercase">Silver (₹)</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={formSilver}
                            onChange={(e) => setFormSilver(Number(e.target.value))}
                            className="rounded-xl text-xs bg-white h-10"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-sans text-slate-400 block font-bold uppercase">Standard MRP</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={formMrp}
                            onChange={(e) => setFormMrp(Number(e.target.value))}
                            className="rounded-xl text-xs bg-white h-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sticky Action Footer */}
                  <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                    <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)} className="rounded-xl text-xs font-bold px-4 h-10">
                      Cancel
                    </Button>
                    <Button
                      variant="accent"
                      size="default"
                      type="submit"
                      disabled={formSavedSuccess}
                      className="rounded-xl text-xs font-black bg-[#F36E21] hover:bg-[#D95D16] text-white shadow-md h-10 px-6"
                    >
                      {formSavedSuccess ? (
                        <>
                          <Check className="mr-1.5 h-3.5 w-3.5" /> SKU Saved &amp; Live!
                        </>
                      ) : (
                        <>
                          <Check className="mr-1.5 h-3.5 w-3.5" /> Save &amp; Publish System SKU
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </PageTransition>
    </AdminLayout>
  );
}
