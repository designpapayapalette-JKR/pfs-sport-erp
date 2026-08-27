"use client";

import * as React from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/storefront-header";
import { StorefrontFooter } from "@/components/storefront/storefront-footer";
import { useERP } from "@/context/erp-context";
import {
  pfsColorPalette,
  visualiserPresets,
  sportSpecs,
  PFSColorSwatch,
  VisualiserPreset,
  mockProducts,
} from "@/lib/mock-data";
import {
  Card,
  Button,
  Badge,
} from "@pfs/ui";
import {
  PageTransition,
  MotionCard,
  LivePulseDot,
} from "@/components/motion";
import { motion } from "framer-motion";
import {
  Palette,
  Sparkles,
  Download,
  Share2,
  Save,
  CheckCircle2,
  RotateCcw,
  Layers,
  ArrowRight,
  Maximize2,
  Sliders,
  Eye,
  Box,
  ShoppingCart,
  ShieldCheck,
  Award,
  Check,
} from "lucide-react";

type ZoneId = "playingArea" | "kitchen" | "perimeter" | "lines";

export default function StorefrontVisualiserPage() {
  const { convertVisualizerToCart } = useERP();

  const [selectedSport, setSelectedSport] = React.useState<string>("pickleball");
  const [viewAngle, setViewAngle] = React.useState<"top" | "perspective">("perspective");
  const [activeZone, setActiveZone] = React.useState<ZoneId>("playingArea");
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);

  // Selected Colors per Zone
  const [zoneColors, setZoneColors] = React.useState<{
    playingArea: string;
    kitchen: string;
    perimeter: string;
    lines: string;
  }>({
    playingArea: "#1976D2", // Melbourne Blue
    kitchen: "#006442", // Forest Green
    perimeter: "#0A2A57", // Dark Navy
    lines: "#FFFFFF", // White
  });

  const [designName, setDesignName] = React.useState("Grand Slam Tournament Spec");
  const activeSpec = sportSpecs[selectedSport] || sportSpecs.pickleball;

  const handleColorSelect = (swatch: PFSColorSwatch) => {
    setZoneColors((prev) => ({
      ...prev,
      [activeZone]: swatch.hex,
    }));
  };

  const handleApplyPreset = (preset: VisualiserPreset) => {
    setZoneColors({
      playingArea: preset.zones.playingArea || "#1976D2",
      kitchen: preset.zones.kitchen || preset.zones.key || "#006442",
      perimeter: preset.zones.perimeter || "#0A2A57",
      lines: preset.zones.lines || "#FFFFFF",
    });
    setDesignName(preset.name);
  };

  const handleAddBundleToCart = () => {
    convertVisualizerToCart(selectedSport, designName, zoneColors, activeSpec.defaultAreaSqFt);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);
  };

  // Find swatch info
  const getSwatchInfo = (hex: string) => {
    return pfsColorPalette.find((s) => s.hex.toLowerCase() === hex.toLowerCase()) || {
      name: "Custom Tone",
      ral: "RAL-STD",
      code: "PFS-C-01",
      hex,
    };
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col selection:bg-[#F36E21] selection:text-white">
      <StorefrontHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Hero Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-[#040C1A] via-[#0A1628] to-[#122238] p-6 rounded-2xl text-white shadow-lg border border-white/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#E0A925]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E0A925]">
                Storefront 3D Studio
              </span>
              <Badge variant="gold" className="rounded-full text-[9px] font-bold">
                14 Official UV-Proof Shades
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Court Colour Visualiser & Material Configurator
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              Simulate championship acrylic court colour combinations in real-time 3D, inspect official ITF/US Open RAL swatches, and calculate exact material bucket requirements for direct factory dispatch.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={handleAddBundleToCart}
              disabled={isAddedToCart}
              className="rounded-xl shadow-md text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16]"
            >
              {isAddedToCart ? (
                <>
                  <Check className="mr-1.5 h-4 w-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-1.5 h-4 w-4" /> Order Coating Kit (₹{((activeSpec.defaultAreaSqFt * 185) / 100000).toFixed(2)}L)
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sport Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {Object.entries(sportSpecs).map(([key, spec]) => (
            <button
              key={key}
              onClick={() => setSelectedSport(key)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                selectedSport === key
                  ? "bg-[#040C1A] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {spec.name} ({spec.defaultAreaSqFt.toLocaleString("en-IN")} sq ft)
            </button>
          ))}
        </div>

        {/* Main 2-Column Visualiser Canvas & Palette Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive 2D/3D SVG Court Render (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm text-slate-900">{designName}</h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    {activeSpec.standardWidthFt} x {activeSpec.standardLengthFt} ft ({activeSpec.defaultAreaSqFt} sq ft)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    onClick={() => setViewAngle("perspective")}
                    className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold transition-all ${
                      viewAngle === "perspective" ? "bg-white text-slate-900 shadow-2xs font-black" : "text-slate-500"
                    }`}
                  >
                    3D Angle
                  </button>
                  <button
                    onClick={() => setViewAngle("top")}
                    className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold transition-all ${
                      viewAngle === "top" ? "bg-white text-slate-900 shadow-2xs font-black" : "text-slate-500"
                    }`}
                  >
                    2D Plan
                  </button>
                </div>
              </div>

              {/* 3D SVG Court Stage */}
              <div className="py-6 flex items-center justify-center min-h-[360px] bg-slate-900 rounded-xl overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />

                <motion.div
                  key={`${selectedSport}-${viewAngle}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`w-full max-w-[520px] transition-transform duration-500 ${
                    viewAngle === "perspective" ? "perspective-[800px] rotate-x-[22deg] rotate-z-[-4deg]" : ""
                  }`}
                >
                  <svg
                    viewBox="0 0 600 360"
                    className="w-full h-auto drop-shadow-2xl rounded-lg overflow-hidden border border-white/20"
                  >
                    {/* Perimeter / Runoff Zone */}
                    <rect
                      x="0"
                      y="0"
                      width="600"
                      height="360"
                      fill={zoneColors.perimeter}
                      className="cursor-pointer transition-colors duration-300"
                      onClick={() => setActiveZone("perimeter")}
                    />

                    {/* Playing Area */}
                    <rect
                      x="100"
                      y="60"
                      width="400"
                      height="240"
                      fill={zoneColors.playingArea}
                      className="cursor-pointer transition-colors duration-300"
                      onClick={() => setActiveZone("playingArea")}
                    />

                    {/* Non-Volley / Kitchen Zone (for Pickleball) or Center Service Court */}
                    {selectedSport === "pickleball" && (
                      <rect
                        x="240"
                        y="60"
                        width="120"
                        height="240"
                        fill={zoneColors.kitchen}
                        className="cursor-pointer transition-colors duration-300"
                        onClick={() => setActiveZone("kitchen")}
                      />
                    )}

                    {/* Court Boundary & Service Lines */}
                    <rect
                      x="100"
                      y="60"
                      width="400"
                      height="240"
                      fill="none"
                      stroke={zoneColors.lines}
                      strokeWidth="5"
                    />

                    {/* Center Net Line */}
                    <line
                      x1="300"
                      y1="50"
                      x2="300"
                      y2="310"
                      stroke="#FFFFFF"
                      strokeWidth="6"
                      strokeDasharray="6 4"
                      className="drop-shadow-md"
                    />

                    {/* Service Box Dividers */}
                    <line
                      x1="100"
                      y1="180"
                      x2="240"
                      y2="180"
                      stroke={zoneColors.lines}
                      strokeWidth="4"
                    />
                    <line
                      x1="360"
                      y1="180"
                      x2="500"
                      y2="180"
                      stroke={zoneColors.lines}
                      strokeWidth="4"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Zone Color Badges Bar */}
              <div className="grid grid-cols-4 gap-2 pt-4">
                {(
                  [
                    { id: "playingArea", label: "In-Bounds Court", color: zoneColors.playingArea },
                    { id: "kitchen", label: "Non-Volley Zone", color: zoneColors.kitchen },
                    { id: "perimeter", label: "Surround Runoff", color: zoneColors.perimeter },
                    { id: "lines", label: "Regulation Lines", color: zoneColors.lines },
                  ] as const
                ).map((zone) => {
                  const isActive = activeZone === zone.id;
                  const swatch = getSwatchInfo(zone.color);

                  return (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZone(zone.id)}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        isActive
                          ? "border-[#040C1A] bg-slate-50 ring-2 ring-[#040C1A]/20 shadow-xs"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: zone.color }}
                        />
                        <span className="text-[10px] font-extrabold text-slate-800 truncate">
                          {zone.label}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 block truncate">
                        {swatch.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Material Requirement Literage Calculator Strip */}
            <Card className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Box className="h-4 w-4 text-[#F36E21]" />
                  Automated Material Formulation for {activeSpec.defaultAreaSqFt.toLocaleString()} sq ft
                </h4>
                <Badge variant="gold" size="sm" className="rounded-full text-[9px] font-mono">
                  8-Layer Cushion
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Acrylic Primer</span>
                  <span className="font-mono font-black text-slate-900 text-sm">45 Liters</span>
                  <span className="text-[9px] text-slate-500 block">(1 Drum + 1 Can)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">SBR Cushion Mat</span>
                  <span className="font-mono font-black text-slate-900 text-sm">180 Liters</span>
                  <span className="text-[9px] text-slate-500 block">(9x 20L Buckets)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Colour Topcoats</span>
                  <span className="font-mono font-black text-slate-900 text-sm">120 Liters</span>
                  <span className="text-[9px] text-slate-500 block">(6x 20L Buckets)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Line Marking Paint</span>
                  <span className="font-mono font-black text-slate-900 text-sm">10 Liters</span>
                  <span className="text-[9px] text-slate-500 block">(2x 5L Cans)</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: 14 RAL Swatch Matrix & Official Presets (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Color Palette Selector */}
            <Card className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <h3 className="font-black text-sm text-slate-900">
                    Official PFS Swatch Palette
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Editing: <strong className="text-primary capitalize">{activeZone.replace(/([A-Z])/g, " $1")}</strong>
                  </p>
                </div>
                <Badge variant="outline" size="sm" className="text-[9px] font-mono">
                  14 Colours
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {pfsColorPalette.map((swatch) => {
                  const isSelected = zoneColors[activeZone].toLowerCase() === swatch.hex.toLowerCase();

                  return (
                    <button
                      key={swatch.code}
                      onClick={() => handleColorSelect(swatch)}
                      className={`p-2 rounded-xl border text-left transition-all group flex items-center gap-2 ${
                        isSelected
                          ? "border-[#040C1A] bg-slate-50 ring-2 ring-[#040C1A]/20"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <span
                        className="h-6 w-6 rounded-lg border border-black/20 shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="truncate">
                        <p className="font-bold text-[11px] text-slate-900 truncate leading-tight">
                          {swatch.name}
                        </p>
                        <span className="text-[9px] font-mono text-slate-400 block truncate">
                          {swatch.ral}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Official Tournament Presets */}
            <Card className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-black text-sm text-slate-900">
                  Championship Preset Schemes
                </h3>
                <span className="text-[10px] text-slate-400">1-Click Apply</span>
              </div>

              <div className="space-y-2">
                {visualiserPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block group-hover:text-primary transition-colors">
                        {preset.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Tournament Official • {preset.sport}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className="h-4 w-4 rounded-full border border-black/20"
                        style={{ backgroundColor: preset.zones.playingArea }}
                      />
                      <span
                        className="h-4 w-4 rounded-full border border-black/20"
                        style={{ backgroundColor: preset.zones.kitchen || preset.zones.perimeter }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Refundable Physical Swatch Kit Banner */}
            <Card className="p-4 bg-gradient-to-br from-[#040C1A] to-[#122238] text-white rounded-2xl shadow-md space-y-2 border border-white/10">
              <div className="flex items-center justify-between">
                <Badge variant="gold" size="sm" className="rounded-full text-[9px] font-bold">
                  Physical Samples Kit
                </Badge>
                <span className="text-xs font-mono font-black text-[#E0A925]">₹999 (100% Refundable)</span>
              </div>
              <h4 className="font-black text-sm text-white">Order Physical RAL Coating Pucks</h4>
              <p className="text-xs text-slate-300">
                Receive 14 real acrylic liquid-cured sample pucks and PP tile interlocking pieces delivered to your doorstep within 48 hours. Fully credited against your first order.
              </p>
              <Link href="/checkout?swatch=true">
                <Button variant="gold" size="sm" className="w-full rounded-xl text-xs font-black mt-1">
                  Order Swatch Kit (₹999) →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
