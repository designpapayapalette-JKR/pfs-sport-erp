"use client";

import * as React from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/storefront-header";
import { StorefrontFooter } from "@/components/storefront/storefront-footer";
import { useERP } from "@/context/erp-context";
import { sportSpecs, mockProducts } from "@/lib/mock-data";
import {
  Card,
  Button,
  Badge,
  Input,
} from "@pfs/ui";
import {
  PageTransition,
  MotionCard,
  LivePulseDot,
} from "@/components/motion";
import { motion } from "framer-motion";
import {
  Calculator,
  ShoppingCart,
  CheckCircle2,
  FileCheck,
  Award,
  ShieldCheck,
  Download,
  Phone,
  Sparkles,
  Layers,
  ArrowRight,
  Truck,
  Check,
  DollarSign,
  Building2,
  Calendar,
  Star,
} from "lucide-react";

export default function StorefrontEstimatorPage() {
  const { convertEstimateToCart } = useERP();

  // Form State
  const [selectedSport, setSelectedSport] = React.useState<string>("pickleball");
  const [courtCount, setCourtCount] = React.useState<number>(2);
  const [systemTier, setSystemTier] = React.useState<string>("PFS Pro Tour 8-Layer Acrylic Cushion");
  const [baseCondition, setBaseCondition] = React.useState<string>("Existing Sound Concrete");
  const [destinationHub, setDestinationHub] = React.useState<string>("India Regional Office");

  // Accessories checkboxes
  const [includeNetPosts, setIncludeNetPosts] = React.useState<boolean>(true);
  const [includeLights, setIncludeLights] = React.useState<boolean>(true);
  const [includeFencing, setIncludeFencing] = React.useState<boolean>(false);
  const [includeLineMarking, setIncludeLineMarking] = React.useState<boolean>(true);

  const [isAddedToCart, setIsAddedToCart] = React.useState<boolean>(false);

  const activeSpec = sportSpecs[selectedSport] || sportSpecs.pickleball;
  const totalArea = activeSpec.defaultAreaSqFt * courtCount;

  // Commercial Math Engine (Rate Card v1.4)
  const calculations = React.useMemo(() => {
    let baseRatePerSqFt = 185; // 8-layer cushion
    if (systemTier.includes("5-Layer Hardcourt")) baseRatePerSqFt = 120;
    if (systemTier.includes("Modular PP Tiles")) baseRatePerSqFt = 210;
    if (systemTier.includes("PU Point-Elastic")) baseRatePerSqFt = 260;
    if (systemTier.includes("UltraPadel Turf")) baseRatePerSqFt = 195;

    const materialCost = totalArea * baseRatePerSqFt;

    // Base Prep & Primer
    let basePrepRate = 25;
    if (baseCondition.includes("Asphalt")) basePrepRate = 18;
    if (baseCondition.includes("Cracked")) basePrepRate = 45;
    if (baseCondition.includes("Resurface")) basePrepRate = 15;
    const basePrepCost = totalArea * basePrepRate;

    // Accessories
    let accessoriesCost = 0;
    if (includeNetPosts) accessoriesCost += 24500 * courtCount;
    if (includeLights) accessoriesCost += 42000 * courtCount;
    if (includeFencing) accessoriesCost += 85000 * courtCount;
    if (includeLineMarking) accessoriesCost += 6000 * courtCount;

    // Turnkey Application Labor
    const laborRate = 35;
    const laborCost = totalArea * laborRate;

    const subtotal = materialCost + basePrepCost + accessoriesCost + laborCost;
    const gst18 = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + gst18;

    return {
      materialCost,
      basePrepCost,
      accessoriesCost,
      laborCost,
      subtotal,
      gst18,
      grandTotal,
      baseRatePerSqFt,
    };
  }, [selectedSport, courtCount, systemTier, baseCondition, includeNetPosts, includeLights, includeFencing, includeLineMarking, totalArea]);

  const handleAddEstimateToCart = () => {
    const accessoriesList: string[] = [];
    if (includeNetPosts) accessoriesList.push("Tournament Net Post Set");
    if (includeLights) accessoriesList.push("LED Court Floodlights");
    if (includeFencing) accessoriesList.push("10ft Galvanized Chainlink Fencing");
    if (includeLineMarking) accessoriesList.push("Precision PU Line Markings");

    convertEstimateToCart({
      sport: selectedSport,
      areaSqFt: totalArea,
      systemTier,
      courtCount,
      accessories: accessoriesList,
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col selection:bg-[#F36E21] selection:text-white">
      <StorefrontHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-[#040C1A] via-[#0A1628] to-[#122238] p-6 rounded-2xl text-white shadow-lg border border-white/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#E0A925]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E0A925]">
                Commercial Rate Card v1.4
              </span>
              <Badge variant="gold" className="rounded-full text-[9px] font-bold">
                Direct Manufacturer Quotes
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Turnkey Court Cost & Material Estimator
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              Calculate exact budget breakdown for acrylic coatings, sub-base preparation, tournament LED floodlights, net posts, and certified turnkey application labor across India.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={handleAddEstimateToCart}
              disabled={isAddedToCart}
              className="rounded-xl shadow-md text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16]"
            >
              {isAddedToCart ? (
                <>
                  <Check className="mr-1.5 h-4 w-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-1.5 h-4 w-4" /> Add Package to Cart
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
              <h2 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                1. Project Parameters & Surface System
              </h2>

              {/* Sport Selection & Courts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">Sport Type</label>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="pickleball">Pickleball (1,800 sq ft / court)</option>
                    <option value="tennis">Tennis Hardcourt (7,200 sq ft / court)</option>
                    <option value="padel">Padel Panoramic (2,178 sq ft / court)</option>
                    <option value="basketball">Basketball Full Court (4,700 sq ft / court)</option>
                    <option value="badminton">Badminton Indoor (1,200 sq ft / court)</option>
                  </select>
                </div>

                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">Number of Courts</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCourtCount(num)}
                        className={`flex-1 h-10 rounded-xl font-mono text-xs font-extrabold transition-all ${
                          courtCount === num
                            ? "bg-[#040C1A] text-white shadow-xs"
                            : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Surface Formulation Tier */}
              <div>
                <label className="font-extrabold text-slate-800 block mb-1 text-xs">
                  Surface Formulation Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { name: "PFS Pro Tour 8-Layer Acrylic Cushion", rate: "₹185/sq ft", tag: "Most Popular", popular: true },
                    { name: "PFS Club Supreme 5-Layer Hardcourt", rate: "₹120/sq ft", tag: "Economy Hardcourt" },
                    { name: "PFS ProGrid Modular PP Tiles", rate: "₹210/sq ft", tag: "Zero Base Cracking" },
                    { name: "PFS Point-Elastic PU Indoor", rate: "₹260/sq ft", tag: "BWF Grade 1" },
                  ].map((tier) => (
                    <button
                      key={tier.name}
                      type="button"
                      onClick={() => setSystemTier(tier.name)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        systemTier === tier.name
                          ? "border-[#040C1A] bg-slate-50 ring-2 ring-[#040C1A]/20 shadow-xs"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 text-xs truncate max-w-[170px]">{tier.name}</span>
                        {tier.popular && (
                          <Badge variant="accent" size="sm" className="text-[8px] rounded-full flex items-center gap-1">
                            <Star className="h-2.5 w-2.5 fill-current" /> Top Choice
                          </Badge>
                        )}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 block">
                        {tier.rate}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-Base Condition & Prep */}
              <div>
                <label className="font-extrabold text-slate-800 block mb-1 text-xs">
                  Existing Sub-Base Condition
                </label>
                <select
                  value={baseCondition}
                  onChange={(e) => setBaseCondition(e.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="Existing Sound Concrete">Existing Cured Concrete Slab (Standard Primer Layer)</option>
                  <option value="Brand New Asphalt">Brand New Asphalt Base (Acrylic Resurfacer Coat)</option>
                  <option value="Cracked Damaged Surface">Cracked/Damaged Concrete (Epoxy Mortar Crack Fill & Patching)</option>
                  <option value="Resurface Existing Acrylic">Resurfacing Existing Acrylic Court (Clean & Topcoat Recoat)</option>
                </select>
              </div>

              {/* Turnkey Equipment & Accessories */}
              <div className="pt-2 border-t border-slate-100">
                <label className="font-extrabold text-slate-800 block mb-2 text-xs">
                  Turnkey Equipment & Lighting Add-Ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:bg-slate-100/60">
                    <input
                      type="checkbox"
                      checked={includeNetPosts}
                      onChange={(e) => setIncludeNetPosts(e.target.checked)}
                      className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">Heavy Duty Tournament Net Posts</span>
                      <span className="text-[10px] text-slate-500 font-mono">+₹24,500 / court</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:bg-slate-100/60">
                    <input
                      type="checkbox"
                      checked={includeLights}
                      onChange={(e) => setIncludeLights(e.target.checked)}
                      className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">CourtLum 400W LED Floodlights</span>
                      <span className="text-[10px] text-slate-500 font-mono">+₹42,000 / court</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:bg-slate-100/60">
                    <input
                      type="checkbox"
                      checked={includeLineMarking}
                      onChange={(e) => setIncludeLineMarking(e.target.checked)}
                      className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">Laser Regulation Line Marking</span>
                      <span className="text-[10px] text-slate-500 font-mono">+₹6,000 / court</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:bg-slate-100/60">
                    <input
                      type="checkbox"
                      checked={includeFencing}
                      onChange={(e) => setIncludeFencing(e.target.checked)}
                      className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">Chainlink 10ft Perimeter Fencing</span>
                      <span className="text-[10px] text-slate-500 font-mono">+₹85,000 / court</span>
                    </div>
                  </label>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Live Turnkey Financial Quote Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <h3 className="font-black text-sm text-slate-900">
                    Commercial Pro-Forma Summary
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Total Area: {totalArea.toLocaleString("en-IN")} sq ft ({courtCount} Courts)
                  </p>
                </div>
                <Badge variant="platinum" size="sm" className="rounded-full text-[9px] font-mono">
                  B2B Direct
                </Badge>
              </div>

              {/* Itemized Line Items */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600 font-sans">1. Surface Coating Materials:</span>
                  <span className="font-bold text-slate-900">₹{calculations.materialCost.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600 font-sans">2. Sub-Base Prep & Primer:</span>
                  <span className="font-bold text-slate-900">₹{calculations.basePrepCost.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600 font-sans">3. Turnkey Installation Labor:</span>
                  <span className="font-bold text-slate-900">₹{calculations.laborCost.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600 font-sans">4. Net Posts & Accessories:</span>
                  <span className="font-bold text-slate-900">₹{calculations.accessoriesCost.toLocaleString("en-IN")}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="font-sans text-slate-800">Subtotal (Excl. Tax):</span>
                  <span className="text-slate-900">₹{calculations.subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-sans">GST (18% Input Tax Credit):</span>
                  <span>₹{calculations.gst18.toLocaleString("en-IN")}</span>
                </div>

                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-sm">
                  <span className="font-sans font-black text-slate-900">Grand Total:</span>
                  <span className="font-black text-primary text-base">
                    ₹{calculations.grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* B2B GSTIN Savings Tip */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <ShieldCheck className="h-4 w-4" />
                  B2B Tax Credit Saver: Save ₹{calculations.gst18.toLocaleString("en-IN")}
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Enter your company GSTIN at checkout to claim full 18% Input Tax Credit against corporate returns.
                </p>
              </div>

              {/* Cart and Consultation CTAs */}
              <div className="space-y-2 pt-1">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={handleAddEstimateToCart}
                  disabled={isAddedToCart}
                  className="w-full rounded-xl text-xs font-extrabold bg-[#F36E21] hover:bg-[#D95D16]"
                >
                  {isAddedToCart ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Package Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add Full Turnkey Package to Cart
                    </>
                  )}
                </Button>

                <Link href="/checkout">
                  <Button variant="outline" size="sm" className="w-full rounded-xl text-xs font-bold mt-1">
                    Proceed to Express Checkout →
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Free Engineer Site Inspection Card */}
            <Card className="p-4 bg-gradient-to-br from-[#040C1A] to-[#122238] text-white rounded-2xl shadow-md space-y-2 border border-white/10">
              <Badge variant="gold" size="sm" className="rounded-full text-[9px] font-bold">
                Free On-Site Service
              </Badge>
              <h4 className="font-black text-sm text-white">Book Free Technical Site Inspection</h4>
              <p className="text-xs text-slate-300">
                PFS certified civil engineer will inspect your concrete slab levelness, moisture content, and perimeter runoff slope anywhere in India.
              </p>
              <a href="tel:+919820144521">
                <Button variant="gold" size="sm" className="w-full rounded-xl text-xs font-black mt-1">
                  <Phone className="mr-1.5 h-3.5 w-3.5" /> Call Senior Engineer (+91 98201 44521)
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
