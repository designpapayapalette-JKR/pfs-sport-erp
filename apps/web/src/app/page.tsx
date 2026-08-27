"use client";

import * as React from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/storefront-header";
import { StorefrontFooter } from "@/components/storefront/storefront-footer";
import { useERP } from "@/context/erp-context";
import { mockProducts, pfsColorPalette, sportSpecs, ProductItem, PFSColorSwatch } from "@/lib/mock-data";
import { Button, Badge, Card, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@pfs/ui";
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
  Calculator,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  Sparkles,
  Layers,
  FileCheck,
  Star,
  Check,
  Building2,
  Box,
  Crown,
  Flame,
  Phone,
  HelpCircle,
  Clock,
  MapPin,
  FileSpreadsheet,
  Activity,
  Trophy,
  Grid,
  Zap,
  Maximize2,
  Download,
  Eye,
  Sliders,
  ChevronRight,
  Package,
  Plus,
  Minus,
  FileText,
  Mail,
  Send,
} from "lucide-react";

export default function StorefrontHomePage() {
  const { addToCart } = useERP();

  // Visualiser Preview State
  const [selectedSport, setSelectedSport] = React.useState<"pickleball" | "tennis" | "padel" | "badminton" | "basketball">("pickleball");
  const [activeZone, setActiveZone] = React.useState<"playingArea" | "kitchen" | "perimeter">("playingArea");
  const [playingColor, setPlayingColor] = React.useState<PFSColorSwatch>(pfsColorPalette[4]); // Stadium Blue
  const [kitchenColor, setKitchenColor] = React.useState<PFSColorSwatch>(pfsColorPalette[7]); // Lime Green
  const [perimeterColor, setPerimeterColor] = React.useState<PFSColorSwatch>(pfsColorPalette[0]); // Dark Navy
  const [addedSku, setAddedSku] = React.useState<string | null>(null);

  // Best Products Tab State & Dynamic Quantities
  const [activeProductTab, setActiveProductTab] = React.useState<string>("All");
  const [productQuantities, setProductQuantities] = React.useState<Record<string, number>>({});

  // Pincode Delivery Checker State
  const [pincodeInput, setPincodeInput] = React.useState("");
  const [pincodeResult, setPincodeResult] = React.useState<{
    hub: string;
    transit: string;
    available: boolean;
  } | null>(null);

  // B2B GST Calculator State
  const [projectBudgetInput, setProjectBudgetInput] = React.useState<number>(850000);

  // TDS Spec Sheet Modal
  const [isTdsModalOpen, setIsTdsModalOpen] = React.useState(false);
  const [tdsEmail, setTdsEmail] = React.useState("");
  const [tdsSubmitted, setTdsSubmitted] = React.useState(false);

  const activeSpec = sportSpecs[selectedSport] || sportSpecs.pickleball;

  // Drum Calculation Math for Hero Studio
  const paintCoverageSqFtPerDrum = 250; // 20L Drum covers ~250 sq ft multi-coat
  const playingDrums = Math.max(2, Math.ceil((activeSpec.defaultAreaSqFt * 0.55) / paintCoverageSqFtPerDrum));
  const kitchenDrums = Math.max(1, Math.ceil((activeSpec.defaultAreaSqFt * 0.15) / paintCoverageSqFtPerDrum));
  const perimeterDrums = Math.max(2, Math.ceil((activeSpec.defaultAreaSqFt * 0.30) / paintCoverageSqFtPerDrum));
  const totalDrums = playingDrums + kitchenDrums + perimeterDrums;

  // Filtered Products for Best Products section
  const productTabs = [
    { id: "All", label: "All Systems" },
    { id: "Surface Systems", label: "Acrylic Cushions" },
    { id: "Modular Tiles", label: "Interlocking PP Tiles" },
    { id: "Turf", label: "Padel Tour Turf" },
    { id: "Accessories", label: "LED Lights & Hardware" },
  ];

  const filteredProducts = mockProducts.filter((prod) => {
    if (activeProductTab === "All") return true;
    return prod.category === activeProductTab;
  });

  const getQuantity = (sku: string, defaultQty: number) => {
    return productQuantities[sku] !== undefined ? productQuantities[sku] : defaultQty;
  };

  const handleUpdateQuantity = (sku: string, delta: number, min: number, currentQty: number) => {
    setProductQuantities((prev) => {
      const next = Math.max(min, (prev[sku] !== undefined ? prev[sku] : currentQty) + delta);
      return { ...prev, [sku]: next };
    });
  };

  const handleQuickAdd = (prod: ProductItem) => {
    const defaultQty = prod.category === "Accessories" ? 2 : 1800;
    const qty = getQuantity(prod.sku, defaultQty);
    addToCart(prod, qty);
    setAddedSku(prod.sku);
    setTimeout(() => setAddedSku(null), 2200);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput || pincodeInput.length < 6) return;

    setPincodeResult({ hub: "PFS India Regional Office", transit: "Confirmed on order — freight partner assigned at dispatch", available: true });
  };

  const handleTdsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tdsEmail) return;
    setTdsSubmitted(true);
    setTimeout(() => {
      setIsTdsModalOpen(false);
      setTdsSubmitted(false);
      setTdsEmail("");
    }, 2000);
  };

  const gstCreditAmount = Math.round(projectBudgetInput * 0.18);
  const netEffectiveCost = projectBudgetInput - gstCreditAmount;

  // Tournament Presets (Shop This Look)
  const inspiredLooks = [
    {
      name: "Miami Open Tour Pro",
      sport: "Pickleball",
      playing: pfsColorPalette[4], // Stadium Blue
      kitchen: pfsColorPalette[7], // Lime Green
      perimeter: pfsColorPalette[0], // Dark Navy
      badge: "Most Popular",
      description: "Vibrant high-contrast tournament configuration chosen for televised night matches.",
    },
    {
      name: "US Open Signature",
      sport: "Tennis",
      playing: pfsColorPalette[5], // US Open Blue
      kitchen: pfsColorPalette[6], // Terracotta Red
      perimeter: pfsColorPalette[0],
      badge: "ITF Tournament Standard",
      description: "Classic Grand Slam optical contrast with maximum ball tracking visibility.",
    },
    {
      name: "Wimbledon Heritage",
      sport: "Tennis",
      playing: pfsColorPalette[0], // Dark Green
      kitchen: pfsColorPalette[2], // Light Green
      perimeter: pfsColorPalette[0],
      badge: "Grass Classic",
      description: "Subtle prestige club palette for country clubs and luxury private estates.",
    },
    {
      name: "Sapphire Club Elite",
      sport: "Padel",
      playing: pfsColorPalette[3], // Royal Purple
      kitchen: pfsColorPalette[4], // Stadium Blue
      perimeter: pfsColorPalette[0],
      badge: "Club Luxury",
      description: "Ultra-modern deep sapphire aesthetic engineered for premier indoor padel clubs.",
    },
  ];

  // Studio-Grade Realistic Product Technical Illustrations
  const renderProductIllustration = (sku: string) => {
    if (sku.includes("PRO-8") || sku.includes("SUP-5")) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="concreteGradHome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="cushionGradHome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#115E59" />
            </linearGradient>
            <linearGradient id="acrylicGradHome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>
          <polygon points="40,150 160,178 280,150 160,122" fill="url(#concreteGradHome)" />
          <polygon points="40,150 40,162 160,190 160,178" fill="#0F172A" />
          <polygon points="160,178 160,190 280,162 280,150" fill="#020617" />

          <polygon points="40,132 160,160 280,132 160,104" fill="url(#cushionGradHome)" />
          <polygon points="40,132 40,140 160,168 160,160" fill="#042F2E" />
          <polygon points="160,160 160,168 280,140 280,132" fill="#022c22" />

          <polygon points="40,114 160,142 280,114 160,86" fill="url(#acrylicGradHome)" />
          <polygon points="40,114 40,120 160,148 160,142" fill="#075985" />
          <polygon points="160,142 160,148 280,120 280,114" fill="#0c4a6e" />

          <line x1="90,127" x2="230,99" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.95" />
          <line x1="160,142" x2="160,86" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />

          <rect x="50" y="42" width="90" height="22" rx="6" fill="#040C1A" opacity="0.9" />
          <text x="95" y="56" fill="#F8FAFC" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            8-LAYER MATRIX
          </text>
        </svg>
      );
    }

    if (sku.includes("MOD-TILE")) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tileGradHome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <g transform="translate(45, 30)">
            <rect x="0" y="0" width="110" height="110" rx="10" fill="url(#tileGradHome)" stroke="#B45309" strokeWidth="3" />
            <rect x="120" y="0" width="110" height="110" rx="10" fill="url(#tileGradHome)" stroke="#B45309" strokeWidth="3" />
            {[18, 38, 58, 78, 98].map((x) => (
              <React.Fragment key={x}>
                <line x1={x} y1="12" x2={x} y2="98" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
                <line x1={x + 120} y1="12" x2={x + 120} y2="98" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
              </React.Fragment>
            ))}
            <circle cx="115" cy="30" r="5" fill="#040C1A" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="115" cy="80" r="5" fill="#040C1A" stroke="#FFFFFF" strokeWidth="2" />
          </g>
          <rect x="180" y="145" width="105" height="22" rx="6" fill="#040C1A" opacity="0.9" />
          <text x="232" y="159" fill="#F8FAFC" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            15.8mm PP GRID
          </text>
        </svg>
      );
    }

    if (sku.includes("DRUM-COL") || sku.includes("DRUM-RES")) {
      const isResurfacer = sku.includes("RES");
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="drumBodyHome" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isResurfacer ? "#334155" : "#0A2A57"} />
              <stop offset="50%" stopColor={isResurfacer ? "#64748B" : "#1E40AF"} />
              <stop offset="100%" stopColor={isResurfacer ? "#1E293B" : "#0A2A57"} />
            </linearGradient>
            <linearGradient id="drumRimHome" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>

          <ellipse cx="160" cy="55" rx="55" ry="16" fill="url(#drumRimHome)" stroke="#040C1A" strokeWidth="2" />
          <path d="M 105 55 L 105 145 A 55 16 0 0 0 215 145 L 215 55 Z" fill="url(#drumBodyHome)" stroke="#040C1A" strokeWidth="2" />
          <ellipse cx="160" cy="145" rx="55" ry="16" fill={isResurfacer ? "#1E293B" : "#071D3D"} stroke="#040C1A" strokeWidth="2" />
          <path d="M 105 80 Q 160 30 215 80" fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />

          <rect x="122" y="80" width="76" height="42" rx="4" fill="#FFFFFF" stroke="#040C1A" strokeWidth="1.5" />
          <rect x="122" y="80" width="76" height="12" rx="3" fill="#F36E21" />
          <text x="160" y="89" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            PFS PURECOLOR
          </text>
          <text x="160" y="104" fill="#040C1A" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="monospace">
            {isResurfacer ? "RESURFACER" : "20L CONCENTRATE"}
          </text>
          <text x="160" y="116" fill="#64748B" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            ITF PACE 3 &amp; 4
          </text>
        </svg>
      );
    }

    if (sku.includes("SMP-BOX")) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
          <rect x="65" y="45" width="190" height="120" rx="8" fill="#040C1A" stroke="#E0A925" strokeWidth="2.5" />
          <rect x="75" y="55" width="170" height="100" rx="6" fill="#0A223E" />
          <g transform="translate(85, 68)">
            {[
              "#0A2A57", "#071D3D", "#006442", "#1E824C", "#1976D2", "#0288D1", "#B9903C",
              "#F59E0B", "#F36E21", "#B33925", "#9E1B32", "#64748B", "#334155", "#FFFFFF",
            ].map((hex, i) => {
              const col = i % 7;
              const row = Math.floor(i / 7);
              return (
                <rect
                  key={hex}
                  x={col * 22}
                  y={row * 24}
                  width="18"
                  height="18"
                  rx="3"
                  fill={hex}
                  stroke="#FFFFFF"
                  strokeWidth="1"
                />
              );
            })}
          </g>
          <rect x="85" y="125" width="150" height="20" rx="4" fill="#E0A925" />
          <text x="160" y="138" fill="#040C1A" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            14 RAL SAMPLES + PP TILE
          </text>
        </svg>
      );
    }

    // Default Padel / PU Turf
    return (
      <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
        <rect x="45" y="45" width="230" height="110" rx="8" fill="#006442" stroke="#040C1A" strokeWidth="2" />
        <line x1="45" y1="100" x2="275" y2="100" stroke="#FFFFFF" strokeWidth="3.5" strokeDasharray="6 4" opacity="0.9" />
        <line x1="160" y1="45" x2="160" y2="155" stroke="#FFFFFF" strokeWidth="3" opacity="0.9" />
        <circle cx="160" cy="100" r="30" fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />
        <rect x="180" y="125" width="85" height="20" rx="4" fill="#040C1A" opacity="0.9" />
        <text x="222" y="138" fill="#F8FAFC" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          12mm MONOFILAMENT
        </text>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col selection:bg-[#F36E21] selection:text-white font-sans">
      <StorefrontHeader />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: GETUNIMART HOME PRINTING SERVICE HERO BANNER             */}
        {/* ========================================================================= */}
        <section className="relative bg-gradient-to-b from-[#020712] via-[#061426] to-[#0A223E] text-white pt-10 pb-20 overflow-hidden border-b border-white/10 shadow-2xl">
          {/* Ambient Lighting & Glow Effects */}
          <div className="absolute left-1/2 -top-32 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-[#1976D2]/25 via-[#E0A925]/20 to-[#F36E21]/20 blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute right-0 bottom-0 w-[500px] h-[400px] bg-[#F36E21]/15 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute left-0 top-1/3 w-[350px] h-[350px] bg-[#E0A925]/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
            {/* Top Breadcrumb & Live Dispatch Pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md font-bold text-amber-300 shadow-sm">
                <LivePulseDot color="orange" size="sm" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-200">
                  Certified Tournament Flooring &amp; Materials
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-slate-300 font-mono text-[11px]">
                <Truck className="h-3.5 w-3.5 text-[#E0A925]" />
                <span>Global Manufacturer — Shipping to 95+ Countries</span>
              </div>
            </div>

            {/* Main Grid: Headline + Live 3D Court Visualiser Studio */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Punchy Headline, Search & Fast Links */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.08] text-white">
                  Court Systems &amp; Materials.{" "}
                  <span className="bg-gradient-to-r from-[#E0A925] via-amber-300 to-[#F36E21] bg-clip-text text-transparent block mt-1">
                    Custom Engineered for Sport.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium leading-relaxed">
                  ITF Category 3 &amp; 4, BWF Grade 1 &amp; FIBA 3x3 compliant acrylic cushion coatings, interlocking modular PP tiles, and tournament padel turf with 24-48h factory dispatch.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                  <Link href="/visualiser">
                    <Button
                      variant="accent"
                      size="lg"
                      className="rounded-2xl px-6 h-12 bg-[#F36E21] hover:bg-[#D95D16] text-white font-black text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                    >
                      <Palette className="h-4.5 w-4.5" />
                      <span>Open 3D Visualiser Studio</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href="/estimator">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-2xl px-6 h-12 border-white/25 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md flex items-center gap-2"
                    >
                      <Calculator className="h-4.5 w-4.5 text-[#E0A925]" />
                      <span>Calculate Turnkey Court Cost</span>
                    </Button>
                  </Link>

                  <Link href="/checkout?item=sample-box">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-2xl px-5 h-12 border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-bold text-xs backdrop-blur-md flex items-center gap-1.5"
                    >
                      <Box className="h-4 w-4" />
                      <span>Swatch Kit (₹999)</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Interactive 3D SVG Court Visualiser Box */}
              <div className="lg:col-span-5">
                <Card className="p-5 bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl shadow-2xl space-y-4">
                  {/* Top Bar: Title & Sport Switcher */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-xl bg-[#E0A925] text-slate-950 flex items-center justify-center font-black shadow-xs">
                        <Palette className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-black text-xs text-white block leading-none">
                          Court Customizer
                        </span>
                        <span className="text-[10px] text-amber-300 font-mono font-medium block mt-0.5">
                          14 Tournament RAL Shades
                        </span>
                      </div>
                    </div>

                    {/* Sport Selector Pills */}
                    <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
                      {(["pickleball", "tennis", "padel"] as const).map((sp) => (
                        <button
                          key={sp}
                          onClick={() => setSelectedSport(sp)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${
                            selectedSport === sp
                              ? "bg-[#E0A925] text-slate-950 font-black shadow-xs"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          {sp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Court Canvas */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/20 bg-[#030A14] flex items-center justify-center p-3 shadow-inner">
                    <svg viewBox="0 0 600 360" className="w-full h-full drop-shadow-lg">
                      <rect x="10" y="10" width="580" height="340" rx="10" fill={perimeterColor.hex} />
                      <rect x="60" y="35" width="480" height="290" fill={playingColor.hex} />
                      {selectedSport === "pickleball" && (
                        <rect x="230" y="35" width="140" height="290" fill={kitchenColor.hex} />
                      )}
                      <rect x="60" y="35" width="480" height="290" fill="none" stroke="#FFFFFF" strokeWidth="4" />
                      {selectedSport === "pickleball" && (
                        <>
                          <line x1="230" y1="35" x2="230" y2="325" stroke="#FFFFFF" strokeWidth="3" />
                          <line x1="370" y1="35" x2="370" y2="325" stroke="#FFFFFF" strokeWidth="3" />
                          <line x1="60" y1="180" x2="230" y2="180" stroke="#FFFFFF" strokeWidth="3" />
                          <line x1="370" y1="180" x2="540" y2="180" stroke="#FFFFFF" strokeWidth="3" />
                        </>
                      )}
                      {selectedSport === "tennis" && (
                        <>
                          <line x1="60" y1="75" x2="540" y2="75" stroke="#FFFFFF" strokeWidth="2.5" />
                          <line x1="60" y1="285" x2="540" y2="285" stroke="#FFFFFF" strokeWidth="2.5" />
                          <line x1="180" y1="75" x2="180" y2="285" stroke="#FFFFFF" strokeWidth="2.5" />
                          <line x1="420" y1="75" x2="420" y2="285" stroke="#FFFFFF" strokeWidth="2.5" />
                          <line x1="180" y1="180" x2="420" y2="180" stroke="#FFFFFF" strokeWidth="2.5" />
                        </>
                      )}
                      <line x1="300" y1="20" x2="300" y2="340" stroke="#040C1A" strokeWidth="6" strokeDasharray="6 3" />
                      <circle cx="300" cy="20" r="5" fill="#E0A925" />
                      <circle cx="300" cy="340" r="5" fill="#E0A925" />
                    </svg>
                  </div>

                  {/* Clean Non-Overlapping Telemetry Strip */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center gap-1.5 text-slate-200">
                      <Maximize2 className="h-3 w-3 text-amber-400 shrink-0" />
                      <span className="truncate">{activeSpec.standardWidthFt} x {activeSpec.standardLengthFt} ft ({activeSpec.name})</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center gap-1.5 text-emerald-400">
                      <Package className="h-3 w-3 shrink-0" />
                      <span className="truncate">Est: ~{totalDrums}x 20L Drums</span>
                    </div>
                  </div>

                  {/* Zone Selector & Color Picker */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-300 font-bold">Zone:</span>
                        <div className="flex gap-1 bg-black/40 p-0.5 rounded-lg border border-white/10">
                          <button
                            onClick={() => setActiveZone("playingArea")}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                              activeZone === "playingArea" ? "bg-white text-slate-900 font-black shadow-xs" : "text-slate-400 hover:text-white"
                            }`}
                          >
                            Playing
                          </button>
                          {selectedSport === "pickleball" && (
                            <button
                              onClick={() => setActiveZone("kitchen")}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                                activeZone === "kitchen" ? "bg-white text-slate-900 font-black shadow-xs" : "text-slate-400 hover:text-white"
                              }`}
                            >
                              Kitchen
                            </button>
                          )}
                          <button
                            onClick={() => setActiveZone("perimeter")}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                              activeZone === "perimeter" ? "bg-white text-slate-900 font-black shadow-xs" : "text-slate-400 hover:text-white"
                            }`}
                          >
                            Perimeter
                          </button>
                        </div>
                      </div>

                      <div className="text-right truncate max-w-[150px]">
                        <span className="text-amber-300 font-mono text-[10px] font-bold truncate block">
                          {activeZone === "playingArea" ? playingColor.name : activeZone === "kitchen" ? kitchenColor.name : perimeterColor.name}
                        </span>
                      </div>
                    </div>

                    {/* Swatch Palette Row */}
                    <div className="flex items-center gap-2 overflow-x-auto flex-wrap mt-3 pt-1 pb-1">
                      {pfsColorPalette.slice(0, 10).map((swatch) => {
                        const isSelected =
                          activeZone === "playingArea"
                            ? playingColor.code === swatch.code
                            : activeZone === "kitchen"
                            ? kitchenColor.code === swatch.code
                            : perimeterColor.code === swatch.code;

                        return (
                          <button
                            key={swatch.code}
                            onClick={() => {
                              if (activeZone === "playingArea") setPlayingColor(swatch);
                              else if (activeZone === "kitchen") setKitchenColor(swatch);
                              else setPerimeterColor(swatch);
                            }}
                            title={swatch.name}
                            style={{ backgroundColor: swatch.hex }}
                            className={`h-7 w-7 rounded-lg shrink-0 border-2 transition-colors ${
                              isSelected
                                ? "border-white shadow-md"
                                : "border-transparent opacity-80 hover:opacity-100"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* 1-Click Studio Launch Button */}
                  <Link href={`/visualiser?sport=${selectedSport}`} className="block pt-1">
                    <Button variant="default" size="sm" className="w-full rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xs h-10 shadow-md flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#E0A925]" />
                      <span>Open Full 3D Studio &amp; Export Specifications →</span>
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>

            {/* 4-Pillar Quality & Standards Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#E0A925]/20 text-[#E0A925] flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">UV Stability</span>
                  <strong className="text-xs font-black text-white block">100% Pure Acrylic</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Pace Testing</span>
                  <strong className="text-xs font-black text-white block">ITF Class 3 &amp; 4 Certified</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Direct Transit</span>
                  <strong className="text-xs font-black text-white block">Global Export-Ready Logistics</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Tax Invoicing</span>
                  <strong className="text-xs font-black text-white block">18% GST Input Credit</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. POPULAR BY CATEGORIES (GETUNIMART CATEGORY PILL STRIP)                 */}
        {/* ========================================================================= */}
        <section className="py-12 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-black text-[#F36E21] uppercase tracking-widest block">
                  Surface Systems & SKUs
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                  Popular Sports Categories
                </h2>
              </div>
              <Link href="/shop" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                <span>View Full Catalogue</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Pickleball Acrylics", count: "12 Systems", icon: Activity, href: "/shop?cat=Surface+Systems", bg: "bg-blue-50 text-blue-600 border-blue-100" },
                { name: "Tennis Hardcourt", count: "8 Systems", icon: Trophy, href: "/shop?cat=Surface+Systems", bg: "bg-amber-50 text-[#9A7007] border-amber-100" },
                { name: "Modular PP Tiles", count: "10 Systems", icon: Grid, href: "/shop?cat=Modular+Tiles", bg: "bg-purple-50 text-purple-600 border-purple-100" },
                { name: "Padel Tour Turf", count: "6 Systems", icon: Sparkles, href: "/shop?cat=Turf", bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                { name: "PU Point-Elastic", count: "4 Systems", icon: Layers, href: "/shop?cat=PU+Flooring", bg: "bg-sky-50 text-sky-600 border-sky-100" },
                { name: "LED & Net Hardware", count: "14 Models", icon: Box, href: "/shop?cat=Accessories", bg: "bg-orange-50 text-[#F36E21] border-orange-100" },
              ].map((cat, i) => (
                <Link key={i} href={cat.href} className="group">
                  <Card className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 group-hover:bg-white group-hover:border-[#040C1A] group-hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-2">
                    <div className={`h-12 w-12 rounded-2xl border ${cat.bg} group-hover:bg-[#040C1A] group-hover:text-white group-hover:border-transparent flex items-center justify-center transition-all shadow-xs`}>
                      <cat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 font-bold block mt-0.5">
                        {cat.count}
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. DUAL PROMOTIONAL SPLIT FEATURE BANNERS (GETUNIMART FEATURE CARDS)      */}
        {/* ========================================================================= */}
        <section className="py-14 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Banner 1: 3D Studio Customizer */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#040C1A] to-[#122238] text-white p-8 overflow-hidden shadow-lg flex flex-col justify-between space-y-6">
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#E0A925]/15 blur-3xl pointer-events-none rounded-full" />

                <div className="space-y-3 relative z-10">
                  <Badge variant="gold" size="sm" className="rounded-full text-[10px] font-bold">
                    Interactive Design Suite
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                    Customise Court Palettes with 14 Standard RAL Shades
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                    Test playing area, kitchen, perimeter, and line mark contrast in 2D & 3D. Instantly computes precise literage and 20L paint drum requirements.
                  </p>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                  <Link href="/visualiser">
                    <Button variant="accent" size="sm" className="rounded-xl px-5 font-bold text-xs bg-[#F36E21] hover:bg-[#D95D16]">
                      <Palette className="mr-1.5 h-3.5 w-3.5" />
                      Open 3D Studio →
                    </Button>
                  </Link>
                  <span className="text-xs text-amber-300 font-mono font-bold">1-Click Cart Addition</span>
                </div>
              </div>

              {/* Banner 2: Turnkey Court Cost Estimator */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#10243E] to-[#1A3A63] text-white p-8 overflow-hidden shadow-lg flex flex-col justify-between space-y-6">
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#F36E21]/20 blur-3xl pointer-events-none rounded-full" />

                <div className="space-y-3 relative z-10">
                  <Badge variant="platinum" size="sm" className="rounded-full text-[10px] font-bold">
                    Official Rate Card v1.4
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                    Instant Turnkey Quotes & 18% GST Input Tax Credit
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                    Configure base preparation, acrylic cushion layers, LED floodlighting, and heavy net posts with real-time bill of quantities.
                  </p>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                  <Link href="/estimator">
                    <Button variant="default" size="sm" className="rounded-xl px-5 font-bold text-xs bg-white text-slate-900 hover:bg-slate-100">
                      <Calculator className="mr-1.5 h-3.5 w-3.5 text-[#F36E21]" />
                      Calculate Court Cost →
                    </Button>
                  </Link>
                  <span className="text-xs text-emerald-300 font-mono font-bold">Instant PDF Export</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. HOW IT WORKS 3-STEP PROCESS (GETUNIMART SERVICE WORKFLOW)              */}
        {/* ========================================================================= */}
        <section className="py-14 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-black text-[#F36E21] uppercase tracking-widest block">
                Turnkey Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How The PFS Court Service Works
              </h2>
              <p className="text-xs text-slate-500">
                From 3D digital customisation to certified factory dispatch and nationwide on-site installation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 relative hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-2xl bg-[#040C1A] text-white flex items-center justify-center font-black text-base shadow-xs">
                  01
                </div>
                <h3 className="text-base font-black text-slate-900">Customise Design & Colors</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select your sport dimensions, 14 tournament RAL shades, and cushion layer specifications in our interactive studio.
                </p>
                <Link href="/visualiser" className="pt-2 text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                  <span>Interactive 3D Visualiser</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 relative hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-2xl bg-[#E0A925] text-slate-950 flex items-center justify-center font-black text-base shadow-xs">
                  02
                </div>
                <h3 className="text-base font-black text-slate-900">Instant Material Calculation</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Automated BOM calculation produces exact drums of primer, cushion base, topcoats, and line paints with B2B wholesale pricing.
                </p>
                <Link href="/estimator" className="pt-2 text-xs font-bold text-[#8C6D23] flex items-center gap-1 hover:underline">
                  <span>Rate Card v1.4 Math Engine</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 relative hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-2xl bg-[#F36E21] text-white flex items-center justify-center font-black text-base shadow-xs">
                  03
                </div>
                <h3 className="text-base font-black text-slate-900">Global Supply, Reliable Delivery</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Export-ready logistics with fully insured freight, backed by 25+ years of manufacturing experience across 95+ countries.
                </p>
                <Link href="/shop" className="pt-2 text-xs font-bold text-[#D95D16] flex items-center gap-1 hover:underline">
                  <span>Explore Materials</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. BEST PRODUCTS MARKETPLACE GRID (GETUNIMART BEST PRODUCTS SECTION)      */}
        {/* ========================================================================= */}
        <section className="py-14 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#F36E21] uppercase tracking-widest block">
                  Catalogue Showcase
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                  Our Best Sports Systems
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {productTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveProductTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeProductTab === tab.id
                        ? "bg-[#040C1A] text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isItemAdded = addedSku === product.sku;
                const defaultQty = product.category === "Accessories" ? 2 : 1800;
                const currentQty = getQuantity(product.sku, defaultQty);
                const step = product.category === "Accessories" ? 1 : 200;
                const totalPrice = Math.round(product.platinumPrice * currentQty);

                return (
                  <MotionCard
                    key={product.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 overflow-hidden group"
                  >
                    <div className="space-y-3">
                      {/* Studio Product Visual Stage */}
                      <div className="relative aspect-[16/10] w-full rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/90 border border-slate-100 flex items-center justify-center p-3 overflow-hidden">
                        <div className="absolute top-2 left-2 z-10">
                          <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-mono font-bold text-slate-800 border border-slate-200 shadow-2xs">
                            {product.category}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2 z-10">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-mono font-bold border border-emerald-200 shadow-2xs">
                            24h Dispatch
                          </span>
                        </div>
                        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                          {renderProductIllustration(product.sku)}
                        </div>
                      </div>

                      {/* Product Metadata & Title */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span className="font-bold">{product.sku}</span>
                          <span className="text-[#006442] font-bold truncate max-w-[150px]">
                            {product.certification}
                          </span>
                        </div>

                        <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-[#F36E21] transition-colors">
                          {product.name}
                        </h3>

                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>

                        {/* Specs Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-mono font-bold">
                            {product.thickness.split("(")[0].trim()}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-mono">
                            MOQ: {product.moq}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector & Price Summary */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-bold">Quantity ({product.category === "Accessories" ? "Units" : "sq ft"}):</span>
                        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => handleUpdateQuantity(product.sku, -step, product.category === "Accessories" ? 1 : 500, currentQty)}
                            className="h-6 w-6 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors shadow-2xs font-bold text-xs"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-slate-900 min-w-[48px] text-center">
                            {currentQty.toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(product.sku, step, product.category === "Accessories" ? 1 : 500, currentQty)}
                            className="h-6 w-6 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors shadow-2xs font-bold text-xs"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Price and Add to Cart Toolbar */}
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-base font-black text-slate-900 font-mono">
                              ₹{totalPrice.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">(₹{product.platinumPrice}/unit)</span>
                          </div>
                          <span className="text-[9px] text-emerald-700 font-mono font-bold bg-emerald-50 px-1 py-0.2 rounded block mt-0.5">
                            Save 18% GST Credit
                          </span>
                        </div>

                        <Button
                          variant={isItemAdded ? "default" : "accent"}
                          size="sm"
                          onClick={() => handleQuickAdd(product)}
                          className={`rounded-xl text-xs font-bold transition-all ${
                            isItemAdded ? "bg-emerald-700 text-white" : "bg-[#F36E21] hover:bg-[#D95D16] text-white"
                          }`}
                        >
                          {isItemAdded ? (
                            <>
                              <Check className="mr-1 h-3.5 w-3.5" /> Added
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="mr-1 h-3.5 w-3.5" /> Add to Order
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </MotionCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. "SHOP THIS LOOK" / INSPIRED COURTS GALLERY (GETUNIMART ART WALL TOOL)  */}
        {/* ========================================================================= */}
        <section className="py-14 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black text-[#F36E21] uppercase tracking-widest block">
                Inspired Layouts
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Tournament Proven Color Themes
              </h2>
              <p className="text-xs text-slate-500">
                1-click load pre-configured tournament palettes directly into the 3D Visualiser Studio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {inspiredLooks.map((look, i) => (
                <Card
                  key={i}
                  className="p-4 rounded-3xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-3"
                >
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 p-2 flex items-center justify-center bg-slate-950">
                    <svg viewBox="0 0 400 240" className="w-full h-full">
                      <rect x="5" y="5" width="390" height="230" rx="6" fill={look.perimeter.hex} />
                      <rect x="40" y="25" width="320" height="190" fill={look.playing.hex} />
                      <rect x="150" y="25" width="100" height="190" fill={look.kitchen.hex} />
                      <rect x="40" y="25" width="320" height="190" fill="none" stroke="#FFFFFF" strokeWidth="3" />
                      <line x1="200" y1="20" x2="200" y2="220" stroke="#000" strokeWidth="4" strokeDasharray="4 2" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="font-mono text-slate-400 font-bold">{look.sport}</span>
                      <span className="font-bold text-[#F36E21] bg-orange-50 px-1.5 py-0.2 rounded border border-orange-100">
                        {look.badge}
                      </span>
                    </div>
                    <h3 className="font-black text-xs text-slate-900 leading-tight">{look.name}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{look.description}</p>
                  </div>

                  <Link href={`/visualiser?theme=${encodeURIComponent(look.name)}`} className="block">
                    <Button variant="outline" size="sm" className="w-full rounded-xl text-[11px] font-bold h-8 border-slate-200 hover:bg-slate-100">
                      <Palette className="mr-1 h-3 w-3 text-[#E0A925]" /> Load in 3D Studio
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. PHYSICAL SWATCH SAMPLE BOX PROMO BANNER (₹999 REFUNDABLE)               */}
        {/* ========================================================================= */}
        <section className="py-12 bg-gradient-to-r from-[#040C1A] to-[#122238] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-white/5 border border-white/10">
              <div className="space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                  <Package className="h-3.5 w-3.5" />
                  <span>Physical Evaluation Kit</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Order the Official 14-Color RAL Swatch Sample Box (₹999)
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Real cured acrylic swatches & interlocking tile modules in an executive presentation binder. <strong>100% refundable</strong> against your first wholesale system order.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsTdsModalOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Request TDS Specs</span>
                </button>

                <Link href="/checkout?item=sample-box">
                  <Button variant="accent" size="lg" className="rounded-2xl px-6 bg-[#F36E21] hover:bg-[#D95D16] font-black text-xs h-11">
                    Order Swatch Box (₹999) →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. PINCODE SLA TRACKER & B2B GST TAX CREDIT CALCULATOR                    */}
        {/* ========================================================================= */}
        <section className="py-14 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pincode Tracker */}
              <Card className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900">Delivery SLA Checker</h3>
                    <p className="text-[11px] text-slate-400">Verify dispatch confirmation for your project site</p>
                  </div>
                </div>

                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <Input
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                    placeholder="Enter 6-Digit Indian Pincode (e.g. 400001)..."
                    className="rounded-xl text-xs font-mono"
                  />
                  <Button type="submit" variant="default" size="sm" className="rounded-xl font-bold text-xs bg-[#040C1A]">
                    Check ETA
                  </Button>
                </form>

                {pincodeResult && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1 text-emerald-900 font-mono">
                    <p className="font-bold font-sans">Dispatch Hub: {pincodeResult.hub}</p>
                    <p className="text-[11px]">Guaranteed Carrier Transit: {pincodeResult.transit}</p>
                  </div>
                )}
              </Card>

              {/* B2B GST ITC Calculator */}
              <Card className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-amber-50 text-[#B9903C] flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900">B2B GST Input Tax Credit Calculator</h3>
                    <p className="text-[11px] text-slate-400">Calculate 18% GST input savings on your commercial invoice</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">Total Project Material Budget:</span>
                    <span className="font-mono text-slate-900">₹{projectBudgetInput.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={200000}
                    max={5000000}
                    step={50000}
                    value={projectBudgetInput}
                    onChange={(e) => setProjectBudgetInput(Number(e.target.value))}
                    className="w-full accent-[#F36E21] cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-slate-400 uppercase font-sans font-bold block">18% GST Input Credit</span>
                    <strong className="text-emerald-700 text-sm font-bold">₹{gstCreditAmount.toLocaleString()}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-slate-400 uppercase font-sans font-bold block">Net Effective Cost</span>
                    <strong className="text-slate-900 text-sm font-bold">₹{netEffectiveCost.toLocaleString()}</strong>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. TESTIMONIALS & TRUSTED BY SPORTS VENUES STRIP                          */}
        {/* ========================================================================= */}
        <section className="py-14 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black text-[#F36E21] uppercase tracking-widest block">
                Why Distributors Choose PFS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Trusted by 2,000+ Distributors in 95+ Countries
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Manufacturing Excellence",
                  tag: "ISO, CE & SGS Certified",
                  desc: "25+ years of manufacturing experience behind every acrylic, polyurethane and EPDM system, engineered for consistent tournament-grade performance.",
                },
                {
                  title: "Built for Distributors",
                  tag: "Digital Tools, Real-Time Quoting",
                  desc: "The online 3D Visualiser and Cost Estimator make client signoff seamless — configure a colour recipe and generate a GST-ready quote in minutes.",
                },
                {
                  title: "Global Supply, Reliable Delivery",
                  tag: "Export-Ready Logistics",
                  desc: "50,000+ projects delivered worldwide, from national federations to community courts, backed by ITF, World Athletics and World Padel Tour approvals.",
                },
              ].map((item, i) => (
                <Card key={i} className="p-6 rounded-3xl bg-slate-50/60 border border-slate-200/80 space-y-3">
                  <span className="text-[10px] font-black text-[#F36E21] uppercase tracking-widest block">
                    {item.tag}
                  </span>
                  <h4 className="font-black text-sm text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. ACCREDITATION, COMPLIANCE & CERTIFIED PARTNER BADGES                  */}
        {/* ========================================================================= */}
        <section className="py-12 bg-[#FAFAF8] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">
              International Accreditation & Testing Standards
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#E0A925]" />
                <span>ITF Pace 3 & 4 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span>BWF Grade 1 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <span>FIBA 3x3 Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500 fill-current" />
                <span>USA Pickleball Specs</span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Data Sheet (TDS) Modal */}
        {isTdsModalOpen && (
          <Dialog open={isTdsModalOpen} onOpenChange={setIsTdsModalOpen}>
            <DialogContent className="max-w-md bg-white border border-slate-200/90 rounded-2xl shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-base font-black text-slate-900 tracking-tight">
                  Request Technical Data Sheets (TDS)
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Enter your email to receive complete technical data sheets, ASTM testing results, and architect CSI specifications.
                </DialogDescription>
              </DialogHeader>

              {tdsSubmitted ? (
                <div className="py-6 text-center space-y-2">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="font-bold text-slate-900 text-xs">TDS Pack Sent to {tdsEmail}!</p>
                </div>
              ) : (
                <form onSubmit={handleTdsSubmit} className="space-y-3 py-2 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Corporate / Work Email</label>
                    <Input
                      type="email"
                      value={tdsEmail}
                      onChange={(e) => setTdsEmail(e.target.value)}
                      placeholder="engineer@sportsinfra.in"
                      className="text-xs rounded-xl"
                      required
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      variant="accent"
                      size="sm"
                      className="w-full rounded-xl text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16]"
                    >
                      <Send className="mr-1.5 h-3.5 w-3.5" />
                      Send Complete TDS Specs Pack
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        )}
      </main>

      <StorefrontFooter />
    </div>
  );
}