"use client";

import * as React from "react";
import Link from "next/link";
import { DealerLayout } from "@/components/layout";
import { useERP } from "@/context/erp-context";
import {
  pfsColorPalette,
  visualiserPresets,
  sportSpecs,
  PFSColorSwatch,
  VisualiserPreset,
} from "@/lib/mock-data";
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
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

type ZoneId = "playingArea" | "kitchen" | "perimeter" | "lines";

export default function VisualiserPage() {
  const { saveCourtDesign } = useERP();

  // Sport selection
  const [selectedSport, setSelectedSport] = React.useState<string>("pickleball");
  const [viewAngle, setViewAngle] = React.useState<"top" | "perspective">("top");
  const [activeZone, setActiveZone] = React.useState<ZoneId>("playingArea");

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

  const [designName, setDesignName] = React.useState("Signature Club Spec");
  const [isSaved, setIsSaved] = React.useState(false);

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

  const handleSaveDesign = () => {
    saveCourtDesign(designName, selectedSport, zoneColors);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <DealerLayout>
      <PageTransition className="space-y-6">
        {/* Header Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-8.5 w-8.5 rounded-xl bg-gradient-to-br from-[#0A2A57] to-[#1976D2] p-0.5 flex items-center justify-center text-white shadow-xs">
                <Palette className="h-4.5 w-4.5" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Court Colour Visualiser Studio
              </h1>
              <Badge variant="info" className="rounded-full font-mono text-[10px] flex items-center gap-1">
                <LivePulseDot color="blue" size="sm" /> Interactive 3D SVG
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Custom surface color simulations using official 100% pure acrylic PFS Sport coatings with tournament reflectance standards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-slate-200"
              onClick={() => {
                setZoneColors({
                  playingArea: "#1976D2",
                  kitchen: "#006442",
                  perimeter: "#0A2A57",
                  lines: "#FFFFFF",
                });
              }}
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
              Reset Palette
            </Button>

            <Button
              variant="accent"
              size="sm"
              className="rounded-xl shadow-xs"
              onClick={handleSaveDesign}
              disabled={isSaved}
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Design Saved!
                </>
              ) : (
                <>
                  <Save className="mr-1.5 h-3.5 w-3.5" /> Save Spec Sheet
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 2-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Court Canvas (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="overflow-hidden border border-slate-200/80 bg-slate-900 shadow-2xl rounded-2xl relative">
              {/* Stadium Control Bar */}
              <div className="p-3.5 bg-slate-950/90 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {Object.keys(sportSpecs).map((key) => {
                    const spec = sportSpecs[key];
                    const isSelected = selectedSport === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedSport(key)}
                        className={`relative px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                          isSelected
                            ? "text-white"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="active-sport-pill"
                            className="absolute inset-0 bg-gradient-to-r from-[#1976D2] to-[#0A2A57] rounded-lg shadow-xs"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{spec.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1 border-l border-white/10 pl-2">
                  <button
                    onClick={() => setViewAngle("top")}
                    className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      viewAngle === "top" ? "bg-white/25 text-white shadow-xs" : "text-slate-400 hover:text-white"
                    }`}
                    title="2D Overhead Blueprint"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setViewAngle("perspective")}
                    className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      viewAngle === "perspective" ? "bg-white/25 text-white shadow-xs" : "text-slate-400 hover:text-white"
                    }`}
                    title="3D Stadium Perspective"
                  >
                    <Box className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Court Arena Viewport */}
              <div className="p-6 sm:p-10 flex items-center justify-center min-h-[380px] sm:min-h-[460px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
                {/* Stadium Floodlight Glow Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(25,118,210,0.18),transparent_70%)] pointer-events-none" />

                {/* Animated SVG Court Container */}
                <motion.div
                  animate={
                    viewAngle === "perspective"
                      ? { rotateX: 25, rotateY: -10, scale: 0.95 }
                      : { rotateX: 0, rotateY: 0, scale: 1 }
                  }
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="w-full max-w-[520px] will-change-transform drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                >
                  <svg
                    viewBox="0 0 600 400"
                    className="w-full h-auto rounded-lg overflow-hidden border border-white/15"
                  >
                    <defs>
                      <filter id="courtShadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.6" />
                      </filter>
                      <pattern id="acrylicTexture" width="4" height="4" patternUnits="userSpaceOnUse">
                        <path d="M 0 0 L 4 4 M 4 0 L 0 4" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      </pattern>
                    </defs>

                    {/* Zone 1: Perimeter / Run-off Area */}
                    <motion.rect
                      x="0"
                      y="0"
                      width="600"
                      height="400"
                      animate={{ fill: zoneColors.perimeter }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="cursor-pointer"
                      onClick={() => setActiveZone("perimeter")}
                    />
                    <rect x="0" y="0" width="600" height="400" fill="url(#acrylicTexture)" />

                    {/* Zone 2: Playing Court Area */}
                    <motion.rect
                      x="100"
                      y="50"
                      width="400"
                      height="300"
                      animate={{ fill: zoneColors.playingArea }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="cursor-pointer"
                      onClick={() => setActiveZone("playingArea")}
                      filter="url(#courtShadow)"
                    />
                    <rect x="100" y="50" width="400" height="300" fill="url(#acrylicTexture)" />

                    {/* Zone 3: Sport Specific Inner Features */}
                    {selectedSport === "pickleball" && (
                      <>
                        {/* Kitchen / Non-Volley Zone (7 ft from net on each side) */}
                        <motion.rect
                          x="230"
                          y="50"
                          width="140"
                          height="300"
                          animate={{ fill: zoneColors.kitchen }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="cursor-pointer"
                          onClick={() => setActiveZone("kitchen")}
                        />
                        <rect x="230" y="50" width="140" height="300" fill="url(#acrylicTexture)" />

                        {/* Center Service Dividing Lines */}
                        <line x1="100" y1="200" x2="230" y2="200" stroke={zoneColors.lines} strokeWidth="3" />
                        <line x1="370" y1="200" x2="500" y2="200" stroke={zoneColors.lines} strokeWidth="3" />

                        {/* Kitchen Boundary Lines */}
                        <line x1="230" y1="50" x2="230" y2="350" stroke={zoneColors.lines} strokeWidth="3" />
                        <line x1="370" y1="50" x2="370" y2="350" stroke={zoneColors.lines} strokeWidth="3" />
                      </>
                    )}

                    {selectedSport === "tennis" && (
                      <>
                        {/* Singles Lines & Service Boxes */}
                        <rect x="100" y="85" width="400" height="230" fill="none" stroke={zoneColors.lines} strokeWidth="2.5" />
                        <line x1="200" y1="85" x2="200" y2="315" stroke={zoneColors.lines} strokeWidth="2.5" />
                        <line x1="400" y1="85" x2="400" y2="315" stroke={zoneColors.lines} strokeWidth="2.5" />
                        <line x1="200" y1="200" x2="400" y2="200" stroke={zoneColors.lines} strokeWidth="2.5" />
                      </>
                    )}

                    {selectedSport === "padel" && (
                      <>
                        {/* Padel Service Boxes & Glass Enclosure boundary */}
                        <line x1="200" y1="50" x2="200" y2="350" stroke={zoneColors.lines} strokeWidth="3" />
                        <line x1="400" y1="50" x2="400" y2="350" stroke={zoneColors.lines} strokeWidth="3" />
                        <line x1="200" y1="200" x2="400" y2="200" stroke={zoneColors.lines} strokeWidth="3" />
                        {/* Glass posts */}
                        <rect x="95" y="45" width="410" height="310" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="6,6" />
                      </>
                    )}

                    {selectedSport === "badminton" && (
                      <>
                        {/* Doubles Sidelines & Back Tramlines */}
                        <rect x="100" y="70" width="400" height="260" fill="none" stroke={zoneColors.lines} strokeWidth="2" />
                        <line x1="130" y1="50" x2="130" y2="350" stroke={zoneColors.lines} strokeWidth="2" />
                        <line x1="470" y1="50" x2="470" y2="350" stroke={zoneColors.lines} strokeWidth="2" />
                        <line x1="220" y1="50" x2="220" y2="350" stroke={zoneColors.lines} strokeWidth="2" />
                        <line x1="380" y1="50" x2="380" y2="350" stroke={zoneColors.lines} strokeWidth="2" />
                        <line x1="130" y1="200" x2="470" y2="200" stroke={zoneColors.lines} strokeWidth="2" />
                      </>
                    )}

                    {/* Outer Court Boundary Perimeter Lines */}
                    <motion.rect
                      x="100"
                      y="50"
                      width="400"
                      height="300"
                      fill="none"
                      animate={{ stroke: zoneColors.lines }}
                      transition={{ duration: 0.35 }}
                      strokeWidth="3.5"
                      className="cursor-pointer"
                      onClick={() => setActiveZone("lines")}
                    />

                    {/* Center Net line */}
                    <line x1="300" y1="40" x2="300" y2="360" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="4,3" opacity="0.85" />

                    {/* Net Post Indicators */}
                    <circle cx="300" cy="42" r="5" fill="#B9903C" />
                    <circle cx="300" cy="358" r="5" fill="#B9903C" />
                  </svg>
                </motion.div>

                {/* Floating Technical Specs HUD */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-white/90 font-mono flex items-center gap-3 shadow-lg"
                >
                  <span className="flex items-center gap-1">
                    <Maximize2 className="h-3 w-3 text-[#E0A925]" />
                    <span>{activeSpec.standardWidthFt} x {activeSpec.standardLengthFt} ft</span>
                  </span>
                  <span className="text-white/40">|</span>
                  <span>Total Area: {activeSpec.defaultAreaSqFt.toLocaleString()} sq ft</span>
                </motion.div>
              </div>
            </Card>

            {/* Quick Presets Carousel Strip */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Tournament Proven Color Themes
              </span>
              <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {visualiserPresets.map((p) => (
                  <StaggerItem key={p.id}>
                    <MotionCard
                      onClick={() => handleApplyPreset(p)}
                      className="p-2.5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-md transition-all text-left cursor-pointer group"
                    >
                      <div className="flex h-3.5 w-full rounded-md overflow-hidden mb-2 border border-black/10">
                        <div className="w-1/3 h-full" style={{ backgroundColor: p.zones.perimeter }} />
                        <div className="w-1/3 h-full" style={{ backgroundColor: p.zones.playingArea }} />
                        <div className="w-1/3 h-full" style={{ backgroundColor: p.zones.kitchen || p.zones.playingArea }} />
                      </div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                        {p.name}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono truncate capitalize block">
                        {p.sport} preset
                      </span>
                    </MotionCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>

          {/* Right Column: Interactive Color Selector & Zone Picker (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-5 bg-white border border-slate-200/80 shadow-md rounded-2xl space-y-5">
              {/* Zone Selector Pills */}
              <div>
                <CardTitle className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2.5">
                  1. Select Court Zone to Paint
                </CardTitle>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setActiveZone("playingArea")}
                    className={`p-2.5 rounded-xl border flex items-center justify-between font-bold transition-all ${
                      activeZone === "playingArea"
                        ? "bg-[#0A2A57] text-white border-[#0A2A57] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>Playing Area</span>
                    <span
                      className="h-4 w-4 rounded-full border border-white/30 shadow-xs transition-colors"
                      style={{ backgroundColor: zoneColors.playingArea }}
                    />
                  </button>

                  <button
                    onClick={() => setActiveZone("perimeter")}
                    className={`p-2.5 rounded-xl border flex items-center justify-between font-bold transition-all ${
                      activeZone === "perimeter"
                        ? "bg-[#0A2A57] text-white border-[#0A2A57] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>Perimeter Run-off</span>
                    <span
                      className="h-4 w-4 rounded-full border border-white/30 shadow-xs transition-colors"
                      style={{ backgroundColor: zoneColors.perimeter }}
                    />
                  </button>

                  {selectedSport === "pickleball" && (
                    <button
                      onClick={() => setActiveZone("kitchen")}
                      className={`p-2.5 rounded-xl border flex items-center justify-between font-bold transition-all ${
                        activeZone === "kitchen"
                          ? "bg-[#0A2A57] text-white border-[#0A2A57] shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span>Non-Volley Kitchen</span>
                      <span
                        className="h-4 w-4 rounded-full border border-white/30 shadow-xs transition-colors"
                        style={{ backgroundColor: zoneColors.kitchen }}
                      />
                    </button>
                  )}

                  <button
                    onClick={() => setActiveZone("lines")}
                    className={`p-2.5 rounded-xl border flex items-center justify-between font-bold transition-all ${
                      activeZone === "lines"
                        ? "bg-[#0A2A57] text-white border-[#0A2A57] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>Regulation Lines</span>
                    <span
                      className="h-4 w-4 rounded-full border border-slate-400 shadow-xs transition-colors"
                      style={{ backgroundColor: zoneColors.lines }}
                    />
                  </button>
                </div>
              </div>

              {/* 14 Official Color Swatches Grid */}
              <div>
                <CardTitle className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2.5 flex items-center justify-between">
                  <span>2. Official PFS Acrylic Formulation Palette (14)</span>
                  <span className="text-[10px] text-primary font-mono lowercase">RAL certified</span>
                </CardTitle>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {pfsColorPalette.map((swatch) => {
                    const isSelected = zoneColors[activeZone] === swatch.hex;

                    return (
                      <motion.button
                        key={swatch.code}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleColorSelect(swatch)}
                        className={`p-2 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? "border-primary ring-2 ring-primary/20 bg-blue-50/50 shadow-xs"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className="h-8 w-full rounded-lg mb-1.5 shadow-inner border border-black/10 flex items-center justify-end pr-1.5"
                          style={{ backgroundColor: swatch.hex }}
                        >
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-white drop-shadow" />}
                        </div>
                        <p className="font-bold text-[11px] text-slate-900 leading-tight truncate">
                          {swatch.name}
                        </p>
                        <p className="text-[9px] font-mono text-slate-400 uppercase mt-0.5">
                          {swatch.ral}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Action Bridge: Convert to Cost Estimate */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <Link
                  href={`/dealer/estimator?sport=${selectedSport}`}
                  className="block"
                >
                  <Button
                    variant="accent"
                    className="w-full h-11 text-xs font-bold shadow-md shadow-orange-600/20 rounded-xl"
                  >
                    <span>Estimate Cost with these Specs</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </PageTransition>
    </DealerLayout>
  );
}
