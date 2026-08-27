"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
import { mockProducts, pfsColorPalette, OrderRecord } from "@/lib/mock-data";
import { Button, Badge, Card, Input } from "@pfs/ui";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  LivePulseDot,
  MotionCard,
} from "@/components/motion";
import { motion } from "framer-motion";
import {
  Database,
  Archive,
  MessageCircle,
  UserPlus,
  Users,
  ShoppingCart,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  Plus,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Check,
  DollarSign,
  CreditCard,
  History,
  Clock,
  Sparkles,
  Search,
  Filter,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Building2,
  FileText,
  Activity,
  ArrowRight,
  ExternalLink,
  Eye,
  RefreshCw,
  Box,
  Flame,
  CheckCheck,
  Trophy,
  ShieldCheck,
  Grid,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { orders, leads, products, currentUser, automationRules, auditEvents } = useERP();

  // Metric State
  const [timeframe, setTimeframe] = React.useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [revenueMetric, setRevenueMetric] = React.useState<"revenue" | "volume">("revenue");
  const [hoveredMonth, setHoveredMonth] = React.useState<number | null>(null);
  const [orderFilter, setOrderFilter] = React.useState<"all" | "processing" | "delivered" | "credit">("all");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  // Interactive Operations To-Do State
  const [todos, setTodos] = React.useState([
    { id: "1", text: "Approve Dealer KYC: Mumbai Sports Infra Pvt Ltd", category: "KYC", time: "2h ago", completed: false },
    { id: "2", text: "Dispatch 1,800 sq ft Pro Cushion to Pune Site", category: "Dispatch", time: "4h ago", completed: true },
    { id: "3", text: "Verify GST 18% E-Invoice #INV-2026-089", category: "Finance", time: "6h ago", completed: false },
    { id: "4", text: "Review Inbound Lead SLA: Hyderabad Club (Hot Lead)", category: "Sales", time: "8h ago", completed: false },
    { id: "5", text: "Restock Bhiwandi Buffer: 8-Layer Acrylic Blue Resin", category: "Inventory", time: "1d ago", completed: true },
  ]);
  const [newTodoInput, setNewTodoInput] = React.useState("");
  const [newTodoCategory, setNewTodoCategory] = React.useState("Sales");

  const completedTodosCount = todos.filter((t) => t.completed).length;
  const todoProgressPercent = Math.round((completedTodosCount / todos.length) * 100);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoInput.trim()) return;
    setTodos([
      {
        id: Date.now().toString(),
        text: newTodoInput.trim(),
        category: newTodoCategory,
        time: "Just now",
        completed: false,
      },
      ...todos,
    ]);
    setNewTodoInput("");
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length + 142;
  const totalProductsCount = products.length;
  const totalCustomersCount = "1.4k";

  // Categories for Unimart Horizontal Strip
  const categoriesList: { name: string; count: string; icon: React.ComponentType<{ className?: string }>; id: string }[] = [
    { name: "All Systems", count: `${products.length} Items`, icon: Trophy, id: "All" },
    { name: "Pickleball Acrylics", count: "12 Systems", icon: Activity, id: "Pickleball" },
    { name: "Tennis Hardcourt", count: "8 Systems", icon: ShieldCheck, id: "Tennis" },
    { name: "Modular PP Tiles", count: "6 Systems", icon: Grid, id: "Modular" },
    { name: "PU Point-Elastic", count: "4 Systems", icon: Layers, id: "PU" },
    { name: "UltraPadel Turf", count: "3 Systems", icon: Sparkles, id: "Turf" },
    { name: "LED Floodlights", count: "9 Models", icon: Zap, id: "LED" },
    { name: "Heavy Net Posts", count: "5 Models", icon: Box, id: "Posts" },
  ];

  // Revenue & Throughput Dataset
  const revenueChartData = [
    { month: "Jan", rev: 18.2, vol: 42000, height: 48 },
    { month: "Feb", rev: 22.5, vol: 51000, height: 58 },
    { month: "Mar", rev: 26.0, vol: 59000, height: 68 },
    { month: "Apr", rev: 24.8, vol: 54000, height: 64 },
    { month: "May", rev: 31.4, vol: 72000, height: 80 },
    { month: "Jun", rev: 36.0, vol: 85000, height: 92 },
    { month: "Jul", rev: 33.5, vol: 78000, height: 85 },
    { month: "Aug", rev: 39.8, vol: 94000, height: 100 },
    { month: "Sep", rev: 34.2, vol: 81000, height: 88 },
    { month: "Oct", rev: 38.1, vol: 90000, height: 96 },
    { month: "Nov", rev: 32.0, vol: 75000, height: 82 },
    { month: "Dec", rev: 41.5, vol: 98000, height: 100 },
  ];

  // Filtered Orders for Recent Orders widget
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "processing") return ["submitted", "confirmed", "processing", "packed"].includes(o.status);
    if (orderFilter === "delivered") return o.status === "delivered";
    if (orderFilter === "credit") return o.paymentTerms.includes("Credit");
    return true;
  });

  return (
    <AdminLayout>
      <PageTransition className="space-y-4">
        {/* ========================================================================= */}
        {/* 1. TOP EXECUTIVE COCKPIT BAR WITH TELEMETRY & FAST ACTIONS               */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-3.5 relative z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pfs-logo.png"
              alt="PFS Sport Logo"
              className="h-11 w-11 object-contain drop-shadow-[0_2px_8px_rgba(224,169,37,0.35)] shrink-0"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Enterprise Control Center
                </h1>
                <Badge variant="gold" className="rounded-full text-[10px] font-extrabold inline-flex items-center gap-1.5 px-2.5 py-0.5">
                  <LivePulseDot color="orange" size="sm" />
                  HQ Operations Active
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Welcome back, {currentUser.name || "Super Admin"} • Bhiwandi Super Hub & Northern Transit Corridors Active
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 relative z-10">
            {/* Timeframe Selector Pill */}
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200/80 text-xs font-bold text-slate-600">
              {(["7d", "30d", "90d", "1y"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg uppercase tracking-wider text-[10px] transition-all ${
                    timeframe === tf
                      ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                      : "hover:text-slate-900"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8.5 px-3 rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <Download className="mr-1.5 h-3.5 w-3.5 text-slate-500" /> Export
            </Button>

            <Link href="/admin/orders">
              <Button
                variant="default"
                size="sm"
                className="h-8.5 px-3.5 rounded-xl bg-[#0A2A57] hover:bg-[#071D3D] text-white text-xs font-extrabold shadow-xs"
              >
                <Plus className="mr-1.5 h-3.5 w-3.5 text-[#E5C158]" /> New Order
              </Button>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. ELEVATED UNIMART 4-COLUMN METRIC CARDS WITH SPARKLINES & ACCENT BARS    */}
        {/* ========================================================================= */}
        <section aria-label="Dashboard metrics" className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {/* Metric 1: Total Revenue (Teal Accent + Sparkline) */}
          <MotionCard className="rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="border-l-[3.5px] border-teal-500 pl-3">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  Gross Revenue (B2B)
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900 leading-none">
                    ₹{(totalRevenue / 100000).toFixed(2)}L
                  </span>
                </div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                <Database className="h-4.5 w-4.5 stroke-[2.2]" />
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
              <span className="flex items-center gap-1 font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-md text-[10px]">
                <ArrowUpRight className="h-3 w-3" /> +24.8% vs last month
              </span>
              <svg className="w-14 h-4 stroke-teal-500 fill-none stroke-[2]" viewBox="0 0 60 20">
                <path d="M0,15 Q15,18 30,8 T60,2" />
              </svg>
            </div>
          </MotionCard>

          {/* Metric 2: Total Orders (Brand Blue Accent + Sparkline) */}
          <MotionCard className="rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="border-l-[3.5px] border-[#1976D2] pl-3">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  Orders in Fulfilment
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900 leading-none">
                    {totalOrdersCount} Orders
                  </span>
                </div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#1976D2] flex items-center justify-center shrink-0 border border-blue-100">
                <Archive className="h-4.5 w-4.5 stroke-[2.2]" />
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
              <span className="flex items-center gap-1 font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md text-[10px]">
                <ArrowUpRight className="h-3 w-3" /> +14.2% velocity
              </span>
              <svg className="w-14 h-4 stroke-blue-600 fill-none stroke-[2]" viewBox="0 0 60 20">
                <path d="M0,18 Q20,5 40,12 T60,4" />
              </svg>
            </div>
          </MotionCard>

          {/* Metric 3: Active Systems / SKUs (Amber/Gold Accent) */}
          <MotionCard className="rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="border-l-[3.5px] border-[#B9903C] pl-3">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  Active SKU Systems
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900 leading-none">
                    {totalProductsCount} Master SKUs
                  </span>
                </div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-amber-50 text-[#B9903C] flex items-center justify-center shrink-0 border border-amber-100">
                <Layers className="h-4.5 w-4.5 stroke-[2.2]" />
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
              <Link href="/admin/pricing" className="text-[10px] font-bold text-[#8C6D23] hover:underline flex items-center gap-1">
                Rate Card v1.4 Active →
              </Link>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                100% In-Stock
              </span>
            </div>
          </MotionCard>

          {/* Metric 4: Dealer Network (Purple Accent + SLA indicator) */}
          <MotionCard className="rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="border-l-[3.5px] border-purple-600 pl-3">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  Dealer Partner Network
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900 leading-none">
                    14 Contracted
                  </span>
                </div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                <UserPlus className="h-4.5 w-4.5 stroke-[2.2]" />
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
              <span className="flex items-center gap-1 font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded-md text-[10px]">
                <Shield className="h-3 w-3" /> 3 KYC Review
              </span>
              <Link href="/admin/dealers" className="text-[10px] text-primary font-bold hover:underline">
                Manage →
              </Link>
            </div>
          </MotionCard>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE CATEGORY FILTER CAROUSEL                                   */}
        {/* ========================================================================= */}
        <Card className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Sports Infrastructure Category Hubs
              </h2>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                (Click to filter)
              </span>
            </div>
            <Link href="/shop" className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1">
              Storefront View <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`group min-w-[124px] p-2.5 rounded-xl border text-left transition-all shrink-0 flex items-center gap-2.5 ${
                    isSelected
                      ? "border-[#0A2A57] bg-[#0A2A57] text-white shadow-xs"
                      : "border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 text-slate-800"
                  }`}
                >
                  <cat.icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-[#E0A925]" : "text-slate-500"}`} />
                  <div className="truncate">
                    <p className={`text-xs font-extrabold leading-tight truncate ${isSelected ? "text-white" : "text-slate-900"}`}>
                      {cat.name}
                    </p>
                    <span
                      className={`text-[9px] font-mono font-bold block mt-0.5 ${
                        isSelected ? "text-white/80" : "text-slate-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* ========================================================================= */}
        {/* 4. REVENUE REPORT DUAL-AXIS BAR GRAPH & BEST SELLING PERFORMANCE MATRIX   */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(460px,0.75fr)] items-start">
          {/* Revenue Report Bar Graph Container */}
          <Card className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black text-slate-900 tracking-tight">
                    Revenue & Dispatch Volume Report
                  </h2>
                  <Badge variant="platinum" size="sm" className="rounded-full text-[9px] font-mono font-bold">
                    FY 2026-27
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Monthly throughput across Bhiwandi, Delhi & Bengaluru super hubs.
                </p>
              </div>

              {/* Metric Toggle: Revenue vs Volume */}
              <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200/80 text-[11px] font-bold">
                <button
                  onClick={() => setRevenueMetric("revenue")}
                  className={`px-2.5 py-0.5 rounded-lg transition-all ${
                    revenueMetric === "revenue"
                      ? "bg-white text-primary shadow-2xs font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Revenue (₹L)
                </button>
                <button
                  onClick={() => setRevenueMetric("volume")}
                  className={`px-2.5 py-0.5 rounded-lg transition-all ${
                    revenueMetric === "volume"
                      ? "bg-white text-primary shadow-2xs font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Volume (Sq Ft)
                </button>
              </div>
            </div>

            {/* Custom Interactive Bar Graph Canvas */}
            <div className="h-56 flex items-end justify-between gap-1.5 pt-4 px-1 border-b border-slate-100 relative">
              {revenueChartData.map((d, index) => {
                const isHovered = hoveredMonth === index;

                return (
                  <div
                    key={d.month}
                    onMouseEnter={() => setHoveredMonth(index)}
                    onMouseLeave={() => setHoveredMonth(null)}
                    className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end cursor-pointer"
                  >
                    <div className="relative w-full flex justify-center">
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-10 bg-[#061730] text-white text-[9px] font-mono font-bold py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap shadow-xl z-20 border border-white/20 text-center"
                        >
                          <span className="text-[#E5C158] block">{d.month} 2026</span>
                          <span>₹{d.rev}L • {d.vol.toLocaleString()} sq ft</span>
                        </motion.div>
                      )}

                      <div
                        className={`w-full max-w-[24px] rounded-t-lg transition-all duration-300 shadow-xs ${
                          isHovered
                            ? "bg-gradient-to-t from-[#F36E21] to-amber-400 scale-x-105"
                            : "bg-gradient-to-t from-[#0A2A57] via-[#0E3A75] to-[#1976D2]"
                        }`}
                        style={{ height: `${d.height}%` }}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold transition-colors ${
                        isHovered ? "text-[#F36E21]" : "text-slate-400"
                      }`}
                    >
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-0.5 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#1976D2]" /> Primary Wholesale
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#F36E21]" /> Peak Season Spike
                </span>
              </div>
              <span className="font-extrabold text-slate-900">
                Annual Run-Rate: <strong className="text-primary font-black">₹4.12 Cr</strong>
              </span>
            </div>
          </Card>

          {/* Best Selling Systems Table */}
          <Card className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight">
                  Top Velocity Systems
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Ranked by monthly sqm installed.</p>
              </div>
              <Link href="/admin/products" className="text-[11px] font-bold text-primary hover:underline">
                Catalogue Desk →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <tbody>
                  {products.slice(0, 4).map((prod, idx) => (
                    <tr
                      key={prod.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-2.5 pr-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-900 to-[#0A2A57] flex items-center justify-center text-[11px] text-[#E5C158] font-black shrink-0 shadow-2xs">
                            #{idx + 1}
                          </div>
                          <div>
                            <Link href={`/catalogue/${prod.id}`} className="font-extrabold text-slate-900 hover:text-primary transition-colors truncate max-w-[130px] block text-xs">
                              {prod.name}
                            </Link>
                            <span className="text-[9px] font-mono text-slate-400">{prod.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 pr-2">
                        <span className="block text-[8px] uppercase font-bold text-slate-400">Rate</span>
                        <span className="font-mono font-bold text-slate-800 text-[11px]">₹{prod.mrpInr}</span>
                      </td>
                      <td className="py-2.5 pr-2">
                        <span className="block text-[8px] uppercase font-bold text-slate-400">Net Stock</span>
                        <span className="font-mono text-emerald-700 font-bold text-[11px]">
                          {(prod.stockOnHands - prod.stockReserved).toLocaleString("en-IN")}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <span className="block text-[8px] uppercase font-bold text-slate-400">Volume</span>
                        <span className="font-mono font-black text-slate-900 text-[11px]">
                          ₹{((prod.mrpInr * 420) / 1000).toFixed(0)}k
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* ========================================================================= */}
        {/* 5. REGIONAL LOGISTICS RADAR & CATEGORY SHARE PROGRESS BARS                */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2 items-start">
          {/* Regional Hub Operations Radar */}
          <Card className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight">
                  Logistics Corridors & Hub Telemetry
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Live warehouse dispatch throughput and Safexpress AWBs.</p>
              </div>
              <Badge variant="accent" size="sm" className="rounded-full text-[9px] font-mono">
                3 Hubs Active
              </Badge>
            </div>

            <div className="space-y-2.5 pt-0.5">
              {/* Bhiwandi Hub */}
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">West Corridor: Bhiwandi Central Super Hub</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Serving Maharashtra, Gujarat, Goa • 24h Transit
                  </p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs font-black text-slate-900">₹44.8L (42%)</span>
                  <span className="text-[9px] text-emerald-700 block font-bold">14 Trucks Dispatched</span>
                </div>
              </div>

              {/* Okhla Delhi Hub */}
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">North Corridor: Okhla Industrial Hub</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Serving Delhi NCR, Punjab, Haryana, UP • 48h Transit
                  </p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs font-black text-slate-900">₹32.1L (30%)</span>
                  <span className="text-[9px] text-blue-700 block font-bold">9 Trucks Dispatched</span>
                </div>
              </div>

              {/* Peenya Bangalore Hub */}
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">South Corridor: Peenya Industrial Hub</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Serving Karnataka, Tamil Nadu, Telangana, Kerala
                  </p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs font-black text-slate-900">₹29.4L (28%)</span>
                  <span className="text-[9px] text-purple-700 block font-bold">7 Trucks Dispatched</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Category Share Progress Bars */}
          <Card className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight">
                  Revenue Share by Surface Segment
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Contribution to Q3 turnover.</p>
              </div>
              <Link href="/shop" className="text-[11px] font-bold text-primary hover:underline">
                View Full Breakdown →
              </Link>
            </div>

            <ul className="space-y-3 pt-0.5">
              <li>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="h-2 w-2 rounded-full bg-[#1976D2]" />
                    Pickleball 8-Layer Acrylic Cushion
                  </span>
                  <span className="text-slate-600 font-mono font-bold text-[11px]">₹42.5k • 38%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#0A2A57] to-[#1976D2]" style={{ width: "38%" }} />
                </div>
              </li>

              <li>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="h-2 w-2 rounded-full bg-teal-500" />
                    Tennis Hardcourt 5-Layer System
                  </span>
                  <span className="text-slate-600 font-mono font-bold text-[11px]">₹28.2k • 25%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-teal-500" style={{ width: "25%" }} />
                </div>
              </li>

              <li>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="h-2 w-2 rounded-full bg-[#F36E21]" />
                    UltraPadel 12mm Monofilament Turf
                  </span>
                  <span className="text-slate-600 font-mono font-bold text-[11px]">₹20.1k • 18%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[#F36E21]" style={{ width: "18%" }} />
                </div>
              </li>

              <li>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    Interlocking Modular Polypropylene Tiles
                  </span>
                  <span className="text-slate-600 font-mono font-bold text-[11px]">₹13.4k • 12%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: "12%" }} />
                </div>
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-bold">Total Category Revenue:</span>
              <span className="text-xs font-black font-mono text-slate-900">₹1.06 Cr</span>
            </div>
          </Card>
        </section>

        {/* ========================================================================= */}
        {/* 6. RECENT ORDERS TABLE WITH FILTER PILLS & DISPATCH PROGRESS             */}
        {/* ========================================================================= */}
        <Card className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight">
                Recent Purchase Orders & Inbound Requests
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Live status across factory production lines and carriers.</p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(["all", "processing", "delivered", "credit"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setOrderFilter(filter)}
                  className={`px-2.5 py-0.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                    orderFilter === filter
                      ? "bg-[#0A2A57] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-100">
                  <th className="py-2.5 pr-3 font-bold">Purchase Order</th>
                  <th className="py-2.5 pr-3 font-bold">Project Reference</th>
                  <th className="py-2.5 pr-3 font-bold">Destination</th>
                  <th className="py-2.5 pr-3 font-bold text-right">Order Value</th>
                  <th className="py-2.5 pr-3 font-bold">Fulfilment</th>
                  <th className="py-2.5 font-bold">Billing Terms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 pr-3">
                      <Link href="/admin/orders" className="font-black text-primary hover:underline font-mono text-xs">
                        {order.orderNumber}
                      </Link>
                      <span className="text-[9px] font-mono text-slate-400 block">{order.createdAt}</span>
                    </td>
                    <td className="py-2.5 pr-3 font-bold text-slate-800 max-w-[180px] truncate">
                      {order.projectReference}
                    </td>
                    <td className="py-2.5 pr-3 text-slate-600">
                      {order.destinationCity}
                    </td>
                    <td className="py-2.5 pr-3 text-right font-mono font-black text-slate-900">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-2.5 pr-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold inline-block capitalize ${
                          order.status === "delivered"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : order.status === "dispatched"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono text-slate-600">
                      {order.paymentTerms.includes("Credit") ? (
                        <Badge variant="platinum" size="sm" className="text-[9px] rounded-md font-bold">
                          Net 30 Credit
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm" className="text-[9px] rounded-md font-bold">
                          100% Advance
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ========================================================================= */}
        {/* 7. UNIMART 3-COLUMN BOTTOM SUITE: TRANSACTIONS, CRM LEADS, INTERACTIVE TO-DO*/}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3 items-start">
          {/* Column 1: Financial Settlement Ledger */}
          <Card className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h2 className="text-xs font-black text-slate-900 tracking-tight flex items-center gap-1.5 uppercase">
                <CreditCard className="h-3.5 w-3.5 text-primary" />
                Settlement Ledger
              </h2>
              <span className="text-[9px] font-mono text-slate-400">GST Credit Ready</span>
            </div>

            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0 font-bold text-xs">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div className="flex-1 truncate">
                  <span className="block font-bold text-slate-900 truncate">NEFT Corporate Wire</span>
                  <span className="text-[9px] text-slate-400 font-mono">Apex Sports • INV-088</span>
                </div>
                <span className="font-black font-mono text-emerald-700 text-xs">+₹3,45,000</span>
              </li>

              <li className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-purple-100 text-purple-700 shrink-0 font-bold text-xs">
                  <Zap className="h-4 w-4" />
                </span>
                <div className="flex-1 truncate">
                  <span className="block font-bold text-slate-900 truncate">Dealer Credit Drawdown</span>
                  <span className="text-[9px] text-slate-400 font-mono">Pune Court Contractors</span>
                </div>
                <span className="font-black font-mono text-purple-700 text-xs">-₹1,85,000</span>
              </li>

              <li className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-100 text-blue-700 shrink-0 font-bold text-xs">
                  <CreditCard className="h-4 w-4" />
                </span>
                <div className="flex-1 truncate">
                  <span className="block font-bold text-slate-900 truncate">Razorpay Online E-Com</span>
                  <span className="text-[9px] text-slate-400 font-mono">Bangalore Padel Arena</span>
                </div>
                <span className="font-black font-mono text-emerald-700 text-xs">+₹98,500</span>
              </li>
            </ul>
          </Card>

          {/* Column 2: Inbound CRM Inquiries (Hot Leads) */}
          <Card className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h2 className="text-xs font-black text-slate-900 tracking-tight flex items-center gap-1.5 uppercase">
                <Users className="h-3.5 w-3.5 text-[#F36E21]" />
                Inbound CRM Leads Queue
              </h2>
              <Link href="/admin/leads" className="text-[11px] font-bold text-primary hover:underline">
                Kanban Desk →
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {leads.slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="truncate pr-2">
                    <span className="font-bold text-slate-900 block truncate">{lead.fullName}</span>
                    <span className="text-[9px] text-slate-500 font-medium truncate block">
                      {lead.sportInterest} • {lead.courtCount} Courts ({lead.city})
                    </span>
                  </div>
                  <Badge variant={lead.score >= 80 ? "accent" : "outline"} size="sm" className="rounded-full text-[9px] font-mono shrink-0">
                    Score: {lead.score}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Column 3: Unimart Interactive Operations Checklist */}
          <Card className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h2 className="text-xs font-black text-slate-900 tracking-tight flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Operations Action Checklist
                </h2>
                <span className="text-[9px] font-mono text-slate-400">
                  {completedTodosCount} of {todos.length} Completed ({todoProgressPercent}%)
                </span>
              </div>
              <span className="h-1.5 w-14 rounded-full bg-slate-100 overflow-hidden">
                <span className="block h-full bg-emerald-500 rounded-full" style={{ width: `${todoProgressPercent}%` }} />
              </span>
            </div>

            <ul className="space-y-2 text-xs max-h-48 overflow-y-auto pr-1">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex items-start gap-2 p-1.5 rounded-lg transition-all ${
                    todo.completed ? "bg-slate-50/50 opacity-60" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className={`block font-bold leading-tight truncate text-xs ${todo.completed ? "line-through text-slate-400" : "text-slate-900"}`}>
                      {todo.text}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[8px] font-mono font-bold bg-slate-100 text-slate-600 px-1 py-0.1 rounded">
                        {todo.category}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">{todo.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Quick Add Task Form */}
            <form onSubmit={handleAddTodo} className="pt-1.5 border-t border-slate-100 flex gap-1.5">
              <Input
                value={newTodoInput}
                onChange={(e) => setNewTodoInput(e.target.value)}
                placeholder="New task..."
                className="h-8 text-xs rounded-xl flex-1"
              />
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="h-8 px-2.5 rounded-xl bg-primary text-white text-xs font-bold shrink-0"
              >
                Add
              </Button>
            </form>
          </Card>
        </section>

        {/* ========================================================================= */}
        {/* 8. AUDIT LOG & FACTORY BATCHES STRIP (HIGH DENSITY FILLER)                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Active Factory Production Batches */}
          <Card className="rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-[#F36E21]" />
                Active Factory Chemical Batches
              </h3>
              <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                3 Lines Operational
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Batch #PFS-26-08A</span>
                <p className="font-extrabold text-slate-900 text-xs truncate">Pro Tour Blue Resin</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Progress</span>
                  <span className="font-mono font-bold text-emerald-700">85% Ready</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Batch #PFS-26-09B</span>
                <p className="font-extrabold text-slate-900 text-xs truncate">Modular PP Tiles Green</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Molding</span>
                  <span className="font-mono font-bold text-blue-700">60% Complete</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Batch #PFS-26-10C</span>
                <p className="font-extrabold text-slate-900 text-xs truncate">PU Elastic Primer</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Curing</span>
                  <span className="font-mono font-bold text-amber-700">95% Ready</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Immutable Audit Activity Stream */}
          <Card className="rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <History className="h-3.5 w-3.5 text-primary" />
                Immutable System Audit Feed
              </h3>
              <Link href="/admin/audit" className="text-[10px] text-primary font-bold hover:underline">
                Full Audit Vault →
              </Link>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {auditEvents.slice(0, 3).map((evt) => {
                // Deterministic time slice to avoid locale-based SSR hydration mismatch
                const timeStr = evt.timestamp.includes("T")
                  ? evt.timestamp.split("T")[1]?.substring(0, 5) + " UTC"
                  : "10:30 UTC";

                return (
                  <div key={evt.id} className="py-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[9px] font-bold bg-slate-100 px-1.5 py-0.2 rounded text-slate-700 shrink-0">
                        {evt.action}
                      </span>
                      <span className="font-bold text-slate-900 text-xs">{evt.actorName}:</span>
                      <span className="text-slate-500 truncate text-xs">{evt.details}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 shrink-0">
                      {timeStr}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </PageTransition>
    </AdminLayout>
  );
}
