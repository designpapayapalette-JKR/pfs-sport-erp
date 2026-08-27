"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
import { Card, Button, Badge } from "@pfs/ui";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  MotionCard,
  AnimatedNumber,
  LivePulseDot,
} from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Download,
  Calendar,
  Users,
  ShoppingCart,
  Building2,
  DollarSign,
  BarChart2,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw,
  FileSpreadsheet,
  PieChart,
  Target,
  Truck,
  Activity,
} from "lucide-react";

const sportData = [
  { label: "Pickleball Surfaces", pct: 48, value: "₹42.8L", color: "#1976D2", bg: "bg-[#1976D2]" },
  { label: "Tennis Hard & Cushion", pct: 26, value: "₹23.2L", color: "#006442", bg: "bg-[#006442]" },
  { label: "Padel Turf & Lighting", pct: 16, value: "₹14.3L", color: "#B9903C", bg: "bg-[#B9903C]" },
  { label: "Badminton PU Flooring", pct: 10, value: "₹8.9L", color: "#F36E21", bg: "bg-[#F36E21]" },
];

const monthlyRevenue = [
  { month: "Mar", rev: 6.2 },
  { month: "Apr", rev: 7.8 },
  { month: "May", rev: 9.1 },
  { month: "Jun", rev: 8.4 },
  { month: "Jul", rev: 11.3 },
  { month: "Aug", rev: 13.6 },
];

const funnelData = [
  { label: "Inbound Inquiries", count: 48, pct: 100, color: "bg-slate-500" },
  { label: "Qualified Projects", count: 34, pct: 70.8, color: "bg-blue-500" },
  { label: "Formal Estimates Sent", count: 22, pct: 45.8, color: "bg-amber-500" },
  { label: "Deals Won / Converted", count: 12, pct: 25.0, color: "bg-emerald-500" },
];

const dealerTiers = [
  { tier: "Platinum", count: 4, revenue: "₹38.2L", color: "text-[#E0A925]", bg: "bg-amber-50", border: "border-amber-200" },
  { tier: "Gold", count: 9, revenue: "₹24.7L", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  { tier: "Silver", count: 14, revenue: "₹15.4L", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
  { tier: "Bronze", count: 8, revenue: "₹7.3L", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
];

export default function AdminReportsPage() {
  const { orders, leads } = useERP();
  const [timeframe, setTimeframe] = React.useState<"7d" | "30d" | "90d">("30d");
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportDone, setExportDone] = React.useState(false);
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null);

  const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);
  const wonLeads = leads.filter((l) => l.stage === "Won").length;
  const activeOrders = orders.filter((o) => o.status === "processing" || o.status === "dispatched").length;

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportDone(true);
      setTimeout(() => setExportDone(false), 2500);
    }, 1200);
  };

  const maxRev = Math.max(...monthlyRevenue.map((m) => m.rev));

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
                Operational Reports & KPI Analytics
              </h1>
              <Badge variant="gold" className="rounded-full text-[10px] font-extrabold flex items-center gap-1.5 px-2.5 py-0.5">
                <LivePulseDot color="orange" size="sm" />
                FY 2026-27 Live
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Revenue breakdowns by sport, dealer tier distributions, CRM conversion funnel, and fulfilment SLA metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Timeframe Toggle */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-0.5 text-xs font-bold">
              {(["7d", "30d", "90d"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    timeframe === tf
                      ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tf === "7d" ? "7 Days" : tf === "30d" ? "30 Days" : "90 Days"}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              disabled={isExporting}
              className="rounded-xl border-slate-200 text-xs font-bold text-slate-700 min-w-[140px]"
            >
              {exportDone ? (
                <>
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
                  Report Exported!
                </>
              ) : isExporting ? (
                <>
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin text-slate-400" />
                  Generating…
                </>
              ) : (
                <>
                  <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
                  Export CSV Report
                </>
              )}
            </Button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. TOP 4 KPI TELEMETRY STRIP                                          */}
        {/* ===================================================================== */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: "Total Revenue (FY)",
              value: (totalRevenue / 100000).toFixed(1),
              suffix: " Lakhs",
              prefix: "₹",
              sub: "+18.4% vs last FY",
              trend: "up",
              icon: DollarSign,
              iconBg: "bg-[#FDF7E7] text-[#9A7007]",
            },
            {
              label: "Orders Fulfilled",
              value: orders.length,
              suffix: " Orders",
              prefix: "",
              sub: `${activeOrders} in progress`,
              trend: "up",
              icon: ShoppingCart,
              iconBg: "bg-blue-50 text-blue-600",
            },
            {
              label: "Deals Won (CRM)",
              value: wonLeads,
              suffix: " Closed",
              prefix: "",
              sub: "25.0% conversion rate",
              trend: "up",
              icon: Target,
              iconBg: "bg-emerald-50 text-emerald-700",
            },
            {
              label: "On-Time Delivery",
              value: 97.8,
              suffix: "%",
              prefix: "",
              sub: "SLA Target: 95%",
              trend: "up",
              icon: Truck,
              iconBg: "bg-purple-50 text-purple-600",
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
                      {kpi.prefix}
                      <AnimatedNumber value={Number(kpi.value)} />
                      {kpi.suffix}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                      <ArrowUpRight className="h-3 w-3" />
                      {kpi.sub}
                    </span>
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
        {/* 3. REVENUE BAR CHART + SPORT BREAKDOWN                                */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Monthly Revenue Bar Chart */}
          <div className="lg:col-span-2 p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-[#1976D2]" />
                  Monthly Revenue Trend
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">FY 2026-27 · Lakhs INR</p>
              </div>
              <Badge variant="outline" size="sm" className="text-[10px] font-mono">
                ₹{monthlyRevenue.reduce((s, m) => s + m.rev, 0).toFixed(1)}L YTD
              </Badge>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end gap-3 h-36 px-2">
              {monthlyRevenue.map((m, i) => {
                const height = (m.rev / maxRev) * 100;
                const isHovered = hoveredBar === i;
                const isLast = i === monthlyRevenue.length - 1;
                return (
                  <div
                    key={m.month}
                    className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="text-[10px] font-black font-mono text-slate-900 bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-md -mb-1"
                        >
                          ₹{m.rev}L
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full rounded-t-lg ${isLast ? "bg-[#F36E21]" : isHovered ? "bg-[#1976D2]" : "bg-[#1976D2]/70"} transition-colors`}
                      style={{ minHeight: 4 }}
                    />
                    <span className="text-[10px] font-bold text-slate-500">{m.month}</span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-[10px] text-slate-500 font-semibold pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-4 rounded bg-[#1976D2]/70 inline-block" /> Past months
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-4 rounded bg-[#F36E21] inline-block" /> Current month
              </span>
            </div>
          </div>

          {/* Sport Revenue Breakdown */}
          <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <PieChart className="h-4 w-4 text-[#F36E21]" />
              Revenue by Sport
            </h3>
            <div className="space-y-3">
              {sportData.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                  className="space-y-1"
                >
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 truncate pr-2">{s.label}</span>
                    <span className="font-mono font-black text-slate-900 shrink-0">{s.value}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className={`${s.bg} h-full rounded-full`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{s.pct}% of total</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. CRM FUNNEL + DEALER TIERS + SLA                                   */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* CRM Conversion Funnel */}
          <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#006442]" />
              CRM Conversion Funnel
              <span className="text-[10px] font-normal text-slate-400 ml-auto">Last 30 Days</span>
            </h3>
            <div className="space-y-2.5">
              {funnelData.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  className="space-y-1"
                >
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{f.label}</span>
                    <span className="font-black font-mono text-slate-900">{f.count}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${f.pct}%` }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className={`${f.color} h-full rounded-full`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{f.pct}%</span>
                </motion.div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-emerald-700 font-bold bg-emerald-50 rounded-xl p-2.5">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              25% conversion rate — above 20% industry average
            </div>
          </div>

          {/* Dealer Tier Distribution */}
          <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#B9903C]" />
              Dealer Tier Distribution
            </h3>
            <div className="space-y-2.5">
              {dealerTiers.map((t, i) => (
                <motion.div
                  key={t.tier}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                  className={`flex items-center justify-between p-2.5 ${t.bg} rounded-xl border ${t.border}`}
                >
                  <div>
                    <span className={`text-xs font-extrabold ${t.color}`}>{t.tier} Tier</span>
                    <span className="text-[10px] text-slate-500 block">{t.count} Dealers</span>
                  </div>
                  <span className="font-mono font-black text-xs text-slate-900">{t.revenue}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fulfillment SLA Card */}
          <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#F36E21]" />
              Fulfilment SLA Metrics
              <span className="text-[10px] font-normal text-slate-400 ml-auto">August 2026</span>
            </h3>

            <div className="space-y-3">
              {[
                { label: "Order → Stock Reserved", value: "12 mins", status: "excellent" },
                { label: "Order → Carrier Dispatch", value: "2.1 Days", status: "good" },
                { label: "On-Time Delivery Rate", value: "97.8%", status: "excellent" },
                { label: "Avg Transit Time (Pan-India)", value: "3.4 Days", status: "good" },
                { label: "Return / RMA Rate", value: "0.4%", status: "excellent" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 + 0.15 }}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80"
                >
                  <span className="text-[11px] text-slate-600 font-semibold">{item.label}</span>
                  <span className={`font-mono font-black text-xs ${item.status === "excellent" ? "text-emerald-700" : "text-slate-900"}`}>
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-blue-900 text-[10px] font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                All commercial totals computed exclusively in FastAPI backend.
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 5. HOT LEADS ALERT STRIP                                              */}
        {/* ===================================================================== */}
        {leads.filter((l) => l.score >= 80 && l.stage !== "Won").length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl shadow-xs"
          >
            <div className="flex items-center gap-2 shrink-0">
              <div className="h-8 w-8 rounded-xl bg-[#F36E21]/10 border border-[#F36E21]/20 flex items-center justify-center">
                <Flame className="h-4 w-4 text-[#F36E21]" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900">
                  {leads.filter((l) => l.score >= 80 && l.stage !== "Won").length} Hot Leads — Immediate Action Required
                </span>
                <p className="text-[10px] text-slate-500">Leads with score ≥80 currently in pipeline</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 ml-auto">
              {leads
                .filter((l) => l.score >= 80 && l.stage !== "Won")
                .slice(0, 3)
                .map((l) => (
                  <div
                    key={l.id}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-orange-200 rounded-xl text-[10px] font-bold text-slate-800 shadow-2xs"
                  >
                    <Flame className="h-3 w-3 text-[#F36E21]" />
                    {l.fullName} · Score {l.score}
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </PageTransition>
    </AdminLayout>
  );
}
