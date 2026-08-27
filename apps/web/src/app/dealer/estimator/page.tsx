"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DealerLayout } from "@/components/layout";
import { useERP } from "@/context/erp-context";
import { sportSpecs, mockProducts } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
} from "@pfs/ui";
import {
  Calculator,
  Bot,
  FileCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { PageTransition, AnimatedNumber } from "@/components/motion";
import { motion } from "framer-motion";

function EstimatorContent() {
  const searchParams = useSearchParams();
  const initialSport = searchParams.get("sport") || "pickleball";

  const { currentUser, saveEstimate, savedEstimates, openAIModal } = useERP();

  // Form State
  const [selectedSport, setSelectedSport] = React.useState<string>(initialSport);
  const [courtCount, setCourtCount] = React.useState<number>(2);
  const [customArea, setCustomArea] = React.useState<number>(
    (sportSpecs[initialSport] || sportSpecs.pickleball).defaultAreaSqFt * 2
  );
  const [setting, setSetting] = React.useState<"Outdoor" | "Indoor">("Outdoor");
  const [systemTier, setSystemTier] = React.useState<string>("PFS Pro Tour 8-Layer Acrylic Cushion");
  const [baseCondition, setBaseCondition] = React.useState<string>("Existing Sound Concrete");
  const [locationZone, setLocationZone] = React.useState<string>("West Zone (Maharashtra/Goa)");
  const [projectTitle, setProjectTitle] = React.useState<string>("Pune Sports Club 2x Court Upgrade");

  // Accessories checkboxes
  const [includeNetPosts, setIncludeNetPosts] = React.useState<boolean>(true);
  const [includeLights, setIncludeLights] = React.useState<boolean>(true);
  const [includeFencing, setIncludeFencing] = React.useState<boolean>(false);
  const [includeLineMarking, setIncludeLineMarking] = React.useState<boolean>(true);

  const [saveSuccess, setSaveSuccess] = React.useState<boolean>(false);

  const handleSportChange = (newSport: string) => {
    setSelectedSport(newSport);
    const spec = sportSpecs[newSport] || sportSpecs.pickleball;
    setCustomArea(spec.defaultAreaSqFt * courtCount);
  };

  const handleCourtCountChange = (newCount: number) => {
    setCourtCount(newCount);
    const spec = sportSpecs[selectedSport] || sportSpecs.pickleball;
    setCustomArea(spec.defaultAreaSqFt * newCount);
  };

  // Deterministic Cost Calculation Engine (PRD §9.9 FR-EST-02) - Rate Card v1.4
  const calculations = React.useMemo(() => {
    const area = customArea || 1800;

    // 1. Material Rates per sq ft based on System Tier & Dealer Tier
    let baseRatePerSqFt = 185; // Pro Tour
    if (systemTier.includes("Club Supreme")) baseRatePerSqFt = 120;
    if (systemTier.includes("Mod-Tile")) baseRatePerSqFt = 210;
    if (systemTier.includes("PU Point Elastic")) baseRatePerSqFt = 260;
    if (systemTier.includes("Padel")) baseRatePerSqFt = 195;

    // Apply Dealer Tier Discount for materials
    let discountMultiplier = 1.0;
    if (currentUser.dealerTier === "Platinum") discountMultiplier = 0.75;
    else if (currentUser.dealerTier === "Gold") discountMultiplier = 0.82;
    else if (currentUser.dealerTier === "Silver") discountMultiplier = 0.90;

    const netMaterialRate = baseRatePerSqFt * discountMultiplier;
    const materialCostLow = Math.round(area * netMaterialRate * 0.95);
    const materialCostHigh = Math.round(area * netMaterialRate * 1.05);

    // 2. Base Preparation & Primer (per sq ft)
    let basePrepRateLow = 20;
    let basePrepRateHigh = 30;
    if (baseCondition.includes("New Cured Asphalt")) {
      basePrepRateLow = 15;
      basePrepRateHigh = 22;
    } else if (baseCondition.includes("Damaged Concrete")) {
      basePrepRateLow = 38;
      basePrepRateHigh = 55;
    }
    const baseCostLow = Math.round(area * basePrepRateLow);
    const baseCostHigh = Math.round(area * basePrepRateHigh);

    // 3. Certified Applicator Labour (per sq ft)
    const labourRateLow = 18;
    const labourRateHigh = 25;
    const labourCostLow = Math.round(area * labourRateLow);
    const labourCostHigh = Math.round(area * labourRateHigh);

    // 4. Accessories
    let accessoriesCost = 0;
    const accessoriesList: string[] = [];
    if (includeNetPosts) {
      accessoriesCost += 24500 * courtCount;
      accessoriesList.push(`Heavy-Duty Tournament Net Posts (${courtCount} set)`);
    }
    if (includeLights) {
      // 4 fixtures per court
      accessoriesCost += 18500 * 4 * courtCount;
      accessoriesList.push(`CourtLum 400W LED Fixtures (${4 * courtCount} units)`);
    }
    if (includeFencing) {
      // ~180 running ft per court
      accessoriesCost += 850 * 180 * courtCount;
      accessoriesList.push(`10ft Heavy Galvanized Fencing & Windscreen (${180 * courtCount} ft)`);
    }
    if (includeLineMarking) {
      accessoriesCost += 8500 * courtCount;
      accessoriesList.push(`Precision PU Line Marking (${courtCount} courts)`);
    }

    // 5. Regional Freight & Logistics
    let freightCost = 25000;
    if (locationZone.includes("Tier 1 Metro")) freightCost = 15000;
    if (locationZone.includes("South") || locationZone.includes("East")) freightCost = 32000;

    // Subtotal
    const subtotalLow = materialCostLow + baseCostLow + labourCostLow + accessoriesCost + freightCost;
    const subtotalHigh = materialCostHigh + baseCostHigh + labourCostHigh + accessoriesCost + freightCost;

    // GST (18% Statutory)
    const gstLow = Math.round(subtotalLow * 0.18);
    const gstHigh = Math.round(subtotalHigh * 0.18);

    const grandTotalLow = subtotalLow + gstLow;
    const grandTotalHigh = subtotalHigh + gstHigh;

    return {
      materialCostLow,
      materialCostHigh,
      baseCostLow,
      baseCostHigh,
      labourCostLow,
      labourCostHigh,
      accessoriesCost,
      accessoriesList,
      freightCost,
      subtotalLow,
      subtotalHigh,
      gstLow,
      gstHigh,
      grandTotalLow,
      grandTotalHigh,
    };
  }, [
    customArea,
    systemTier,
    currentUser.dealerTier,
    baseCondition,
    courtCount,
    includeNetPosts,
    includeLights,
    includeFencing,
    includeLineMarking,
    locationZone,
  ]);

  const handleSaveEstimate = () => {
    saveEstimate({
      title: projectTitle || `${selectedSport.toUpperCase()} Court Estimate`,
      sport: selectedSport,
      courtCount,
      areaSqFt: customArea,
      systemTier,
      baseCondition,
      accessories: calculations.accessoriesList,
      locationZone,
      estimatedLow: calculations.subtotalLow,
      estimatedHigh: calculations.subtotalHigh,
      gstAmount: calculations.gstHigh,
      grandTotalLow: calculations.grandTotalLow,
      grandTotalHigh: calculations.grandTotalHigh,
      rateCardVersion: "v1.4",
      dealerTierUsed: currentUser.dealerTier || "Platinum",
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExplainWithAI = () => {
    openAIModal("estimate_explain", "Kimi AI — Cost Estimate Breakdown", {
      projectName: projectTitle,
      courtCount,
      areaSqFt: customArea,
      grandTotalLow: calculations.grandTotalLow,
      grandTotalHigh: calculations.grandTotalHigh,
      systemTier,
      accessories: calculations.accessoriesList,
    });
  };

  return (
    <DealerLayout>
      <PageTransition className="space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Court Cost Estimator
              </h1>
              <Badge variant="gold">Rate Card v1.4</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Deterministic budget estimator for sports courts, materials, base preparation, and turnkey packages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExplainWithAI}>
              <Bot className="mr-1.5 h-4 w-4 text-primary" />
              Explain with Kimi AI
            </Button>

            <Button variant="accent" size="sm" onClick={handleSaveEstimate} disabled={saveSuccess}>
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="mr-1.5 h-4 w-4 text-emerald-300" /> Saved!
                </>
              ) : (
                <>
                  <Save className="mr-1.5 h-4 w-4" /> Save Estimate
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input Parameters Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Sport & Geometry */}
            <Card className="p-5 bg-white border border-surfaceBorder shadow-xs">
              <CardTitle className="text-sm uppercase tracking-wider text-neutral-500 font-semibold mb-4">
                1. Project Scope & Sport
              </CardTitle>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                    Project Reference / Title
                  </label>
                  <Input
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. DLF Phase 5 Rooftop Courts"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Sport
                    </label>
                    <select
                      value={selectedSport}
                      onChange={(e) => handleSportChange(e.target.value)}
                      className="w-full h-10 rounded-lg border border-surfaceBorder bg-surface px-3 text-sm text-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="pickleball">Pickleball (30x60 ft)</option>
                      <option value="tennis">Tennis (60x120 ft)</option>
                      <option value="padel">Padel (10x20 m)</option>
                      <option value="badminton">Badminton (20x44 ft)</option>
                      <option value="basketball">Basketball (50x84 ft)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Number of Courts
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleCourtCountChange(num)}
                          className={`flex-1 h-10 rounded-lg font-semibold text-sm transition-all ${
                            courtCount === num
                              ? "bg-[#0A2A57] text-white shadow-xs"
                              : "bg-neutral-50 text-neutral-700 border border-surfaceBorder hover:bg-neutral-100"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Total Calculated Area (sq ft)
                    </label>
                    <Input
                      type="number"
                      value={customArea}
                      onChange={(e) => setCustomArea(Number(e.target.value))}
                      hint="Auto-calculated standard dimensions (editable)"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Environment Setting
                    </label>
                    <div className="flex items-center gap-2">
                      {(["Outdoor", "Indoor"] as const).map((env) => (
                        <button
                          key={env}
                          type="button"
                          onClick={() => setSetting(env)}
                          className={`flex-1 h-10 rounded-lg font-semibold text-sm transition-all ${
                            setting === env
                              ? "bg-[#0A2A57] text-white shadow-xs"
                              : "bg-neutral-50 text-neutral-700 border border-surfaceBorder hover:bg-neutral-100"
                          }`}
                        >
                          {env}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 2: System Tier & Subfloor */}
            <Card className="p-5 bg-white border border-surfaceBorder shadow-xs">
              <CardTitle className="text-sm uppercase tracking-wider text-neutral-500 font-semibold mb-4">
                2. Surface System & Subfloor Condition
              </CardTitle>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                    PFS Surface System Tier
                  </label>
                  <select
                    value={systemTier}
                    onChange={(e) => setSystemTier(e.target.value)}
                    className="w-full h-10 rounded-lg border border-surfaceBorder bg-surface px-3 text-sm text-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="PFS Pro Tour 8-Layer Acrylic Cushion">
                      PFS Pro Tour 8-Layer Acrylic Cushion (ITF Cat 4 / Tournament Grade)
                    </option>
                    <option value="PFS Club Supreme 5-Layer Hard Court Acrylic">
                      PFS Club Supreme 5-Layer Hard Court Acrylic (Club & Society Grade)
                    </option>
                    <option value="PFS Interlocking Pro Mod-Tile PP System">
                      PFS Interlocking Pro Mod-Tile PP (Fast DIY Dry-Tile System)
                    </option>
                    <option value="PFS PolyTurf PU Point Elastic Indoor System">
                      PFS PolyTurf PU Point Elastic 7mm (BWF Badminton Grade 1)
                    </option>
                    <option value="PFS UltraPadel Monofilament Synthetic Turf 12mm">
                      PFS UltraPadel Monofilament Turf 12mm with Silica Infill
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Subfloor Condition
                    </label>
                    <select
                      value={baseCondition}
                      onChange={(e) => setBaseCondition(e.target.value)}
                      className="w-full h-10 rounded-lg border border-surfaceBorder bg-surface px-3 text-sm text-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="Existing Sound Concrete">Existing Sound Concrete (Cured & Level)</option>
                      <option value="New Cured Asphalt">New Cured Asphalt (Standard slope 1:100)</option>
                      <option value="Damaged Concrete (Repairs Needed)">
                        Damaged Concrete (Crack filling & patching required)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Delivery & Freight Zone
                    </label>
                    <select
                      value={locationZone}
                      onChange={(e) => setLocationZone(e.target.value)}
                      className="w-full h-10 rounded-lg border border-surfaceBorder bg-surface px-3 text-sm text-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="West Zone (Maharashtra/Goa)">West Zone (Maharashtra/Goa/Gujarat)</option>
                      <option value="North Zone (Delhi NCR/Punjab/UP)">North Zone (Delhi NCR/Punjab/UP)</option>
                      <option value="South Zone (Karnataka/TN/Telangana)">South Zone (Karnataka/TN/Telangana)</option>
                      <option value="East Zone (West Bengal/Odisha)">East Zone (West Bengal/Odisha/NE)</option>
                      <option value="Tier 1 Metro (Mumbai/Delhi/BLR Hub)">Tier 1 Metro Express Delivery</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 3: Turnkey Accessories Package */}
            <Card className="p-5 bg-white border border-surfaceBorder shadow-xs">
              <CardTitle className="text-sm uppercase tracking-wider text-neutral-500 font-semibold mb-4">
                3. Court Hardware & Turnkey Accessories
              </CardTitle>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-start gap-3 p-3 rounded-lg border border-surfaceBorder hover:bg-neutral-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeNetPosts}
                    onChange={(e) => setIncludeNetPosts(e.target.checked)}
                    className="h-4 w-4 mt-0.5 rounded text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">Tournament Net Post Set</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">₹24,500/court (3-inch Steel + Net)</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg border border-surfaceBorder hover:bg-neutral-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeLights}
                    onChange={(e) => setIncludeLights(e.target.checked)}
                    className="h-4 w-4 mt-0.5 rounded text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">LED Floodlighting (400W)</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">4x Fixtures per court (500 Lux)</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg border border-surfaceBorder hover:bg-neutral-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeLineMarking}
                    onChange={(e) => setIncludeLineMarking(e.target.checked)}
                    className="h-4 w-4 mt-0.5 rounded text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">Precision PU Line Marking</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">High-definition polyurethane enamel</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg border border-surfaceBorder hover:bg-neutral-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeFencing}
                    onChange={(e) => setIncludeFencing(e.target.checked)}
                    className="h-4 w-4 mt-0.5 rounded text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">10ft Perimeter Chainlink Fence</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Heavy galvanized mesh with windscreen</p>
                  </div>
                </label>
              </div>
            </Card>
          </div>

          {/* Right Column: Live Indicative Cost Breakdown (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-gradient-to-br from-[#061730] via-[#071D3D] to-[#0A2A57] text-white border border-white/10 shadow-2xl rounded-2xl overflow-hidden relative">
              {/* Subtle ambient accent light */}
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#B9903C]/20 rounded-full blur-3xl pointer-events-none" />

              <CardHeader className="bg-black/30 px-6 py-4 border-b border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-extrabold text-white">Estimated Turnkey Budget</CardTitle>
                    <CardDescription className="text-xs text-slate-300 font-mono">
                      {courtCount}x {selectedSport.toUpperCase()} • {customArea.toLocaleString("en-IN")} sq ft
                    </CardDescription>
                  </div>
                  <Badge variant="gold" className="rounded-full font-bold shadow-xs">
                    {currentUser.dealerTier || "Platinum"} Tier
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                {/* Total Range Hero */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  <p className="text-[11px] text-slate-300 uppercase tracking-widest font-bold">
                    Turnkey Project Cost Range (Incl. 18% GST)
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-[#E5C158] mt-2 font-mono tracking-tight flex items-center justify-center gap-1.5">
                    <AnimatedNumber value={calculations.grandTotalLow} prefix="₹" />
                    <span>–</span>
                    <AnimatedNumber value={calculations.grandTotalHigh} prefix="₹" />
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-1">
                    ₹{Math.round(calculations.grandTotalLow / customArea)} - ₹{Math.round(calculations.grandTotalHigh / customArea)} / sq ft all-inclusive
                  </p>
                </div>

                {/* Line Item Breakdown */}
                <div className="space-y-2.5 text-xs text-white/80">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#1976D2]"></span>
                      Surface Materials ({currentUser.dealerTier || "Platinum"} Price)
                    </span>
                    <span className="font-mono text-white">
                      ₹{calculations.materialCostLow.toLocaleString("en-IN")} - ₹{calculations.materialCostHigh.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#006442]"></span>
                      Base Prep & Primer Coat
                    </span>
                    <span className="font-mono text-white">
                      ₹{calculations.baseCostLow.toLocaleString("en-IN")} - ₹{calculations.baseCostHigh.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#B9903C]"></span>
                      Applicator Labour & Installation
                    </span>
                    <span className="font-mono text-white">
                      ₹{calculations.labourCostLow.toLocaleString("en-IN")} - ₹{calculations.labourCostHigh.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#F36E21]"></span>
                      Hardware & Accessories
                    </span>
                    <span className="font-mono text-white">
                      ₹{calculations.accessoriesCost.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                      Transit Logistics & Insurance
                    </span>
                    <span className="font-mono text-white">
                      ₹{calculations.freightCost.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10 text-white/60">
                    <span>GST (18% Statutory)</span>
                    <span className="font-mono text-white/80">
                      ₹{calculations.gstLow.toLocaleString("en-IN")} - ₹{calculations.gstHigh.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Statutory PRD §9.9 FR-EST-04 Disclaimer Notice */}
                <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory Disclaimer:</strong> Indicative budgetary estimate; final quotation subject to physical site assessment.
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="space-y-2 pt-2">
                  <Button
                    variant="accent"
                    className="w-full h-11 text-sm font-semibold"
                    onClick={handleExplainWithAI}
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    Explain Breakdown with Kimi AI
                  </Button>

                  <Button
                    variant="gold"
                    className="w-full h-11 text-sm font-semibold"
                    onClick={handleSaveEstimate}
                  >
                    <FileCheck className="mr-2 h-4 w-4" />
                    Convert to Official Draft Quote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Saved Estimates History */}
            {savedEstimates.length > 0 && (
              <Card className="p-5 bg-white border border-surfaceBorder shadow-xs">
                <CardTitle className="text-sm font-semibold text-neutral-900 mb-3">
                  Saved Estimates ({savedEstimates.length})
                </CardTitle>
                <div className="space-y-2">
                  {savedEstimates.map((est) => (
                    <div
                      key={est.id}
                      className="p-3 rounded-lg border border-surfaceBorder bg-neutral-50/50 hover:bg-neutral-100 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-neutral-900">{est.title}</p>
                        <p className="text-[11px] text-neutral-500">
                          {est.courtCount} courts • {est.areaSqFt} sq ft • {est.createdAt}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono font-bold text-[#0A2A57]">
                          ₹{(est.grandTotalLow / 100000).toFixed(1)}L - ₹{(est.grandTotalHigh / 100000).toFixed(1)}L
                        </p>
                        <Badge variant="outline" size="sm">
                          {est.rateCardVersion}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </PageTransition>
    </DealerLayout>
  );
}

export default function EstimatorPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-neutral-500">Loading Court Cost Estimator...</div>}>
      <EstimatorContent />
    </React.Suspense>
  );
}
