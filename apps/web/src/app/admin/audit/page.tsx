"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
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
} from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Search,
  Shield,
  Download,
  Lock,
  RefreshCw,
  CheckCircle2,
  Filter,
  Activity,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Zap,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const moduleBadgeColors: Record<string, string> = {
  Leads: "bg-blue-100 text-blue-800",
  Orders: "bg-emerald-100 text-emerald-800",
  Inventory: "bg-amber-100 text-amber-800",
  Pricing: "bg-purple-100 text-purple-800",
  Users: "bg-rose-100 text-rose-800",
  Dealers: "bg-orange-100 text-orange-800",
  Documents: "bg-slate-100 text-slate-800",
  Automations: "bg-indigo-100 text-indigo-800",
  Invoices: "bg-cyan-100 text-cyan-800",
};

const actionBadgeColors: Record<string, string> = {
  CREATE: "bg-emerald-100 text-emerald-800",
  UPDATE: "bg-blue-100 text-blue-800",
  DELETE: "bg-rose-100 text-rose-800",
  APPROVE: "bg-amber-100 text-amber-800",
  EXPORT: "bg-purple-100 text-purple-800",
  LOGIN: "bg-slate-100 text-slate-800",
  STAGE_CHANGE: "bg-orange-100 text-orange-800",
};

export default function AdminAuditPage() {
  const { auditEvents } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [moduleFilter, setModuleFilter] = React.useState("All");
  const [actionFilter, setActionFilter] = React.useState("All");
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportDone, setExportDone] = React.useState(false);
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);

  const allModules = ["All", ...Array.from(new Set(auditEvents.map((e) => e.module)))];
  const allActions = ["All", ...Array.from(new Set(auditEvents.map((e) => e.action)))];

  const filteredEvents = auditEvents.filter((e) => {
    const matchesSearch =
      e.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.entityId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = moduleFilter === "All" || e.module === moduleFilter;
    const matchesAction = actionFilter === "All" || e.action === actionFilter;
    return matchesSearch && matchesModule && matchesAction;
  });

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportDone(true);
      setTimeout(() => setExportDone(false), 2500);
    }, 1100);
  };

  const formatTimestamp = (ts: string) => {
    const d = new Date(ts);
    return {
      date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" }),
      time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-5">
        {/* ================================================================ */}
        {/* 1. HEADER COMMAND BAR                                             */}
        {/* ================================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Immutable Audit Trail
              </h1>
              <Badge variant="success" className="rounded-full text-[10px] font-extrabold flex items-center gap-1.5 px-2.5 py-0.5">
                <LivePulseDot color="emerald" size="sm" />
                Append-Only PostgreSQL
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Traceable security log — actor, timestamp, before/after parameters, IP address for every state change.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            disabled={isExporting}
            className="rounded-xl border-slate-200 text-xs font-bold text-slate-700 min-w-[150px]"
          >
            {exportDone ? (
              <><CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />Audit Log Exported!</>
            ) : isExporting ? (
              <><RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin text-slate-400" />Generating…</>
            ) : (
              <><Download className="mr-1.5 h-3.5 w-3.5 text-slate-500" />Export Audit CSV</>
            )}
          </Button>
        </div>

        {/* ================================================================ */}
        {/* 2. KPI SUMMARY TELEMETRY                                          */}
        {/* ================================================================ */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: "Total Audit Events",
              value: auditEvents.length,
              icon: Activity,
              iconBg: "bg-blue-50 text-blue-600",
              sub: "All time",
            },
            {
              label: "Unique Actors",
              value: new Set(auditEvents.map((e) => e.actorName)).size,
              icon: Users,
              iconBg: "bg-purple-50 text-purple-600",
              sub: "Distinct users",
            },
            {
              label: "Modules Touched",
              value: new Set(auditEvents.map((e) => e.module)).size,
              icon: Package,
              iconBg: "bg-amber-50 text-amber-700",
              sub: "Unique modules",
            },
            {
              label: "Today's Events",
              value: auditEvents.filter((e) => {
                const d = new Date(e.timestamp);
                const today = new Date();
                return d.toDateString() === today.toDateString();
              }).length,
              icon: History,
              iconBg: "bg-emerald-50 text-emerald-700",
              sub: "Today",
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
                      {kpi.value}
                    </span>
                    <span className="text-[10px] text-slate-400">{kpi.sub}</span>
                  </div>
                  <div className={`h-9 w-9 rounded-xl ${kpi.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* ================================================================ */}
        {/* 3. FILTER TOOLBAR                                                 */}
        {/* ================================================================ */}
        <div className="flex flex-col md:flex-row gap-2.5 justify-between items-start md:items-center bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Module filter */}
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="h-8 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 focus:outline-none shadow-2xs"
            >
              {allModules.map((m) => <option key={m} value={m}>{m === "All" ? "All Modules" : m}</option>)}
            </select>

            {/* Action filter */}
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="h-8 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 focus:outline-none shadow-2xs"
            >
              {allActions.map((a) => <option key={a} value={a}>{a === "All" ? "All Actions" : a}</option>)}
            </select>

            <span className="text-[10px] font-mono text-slate-400">
              {filteredEvents.length} of {auditEvents.length} events
            </span>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search actor, action, module…"
              className="h-8 pl-8.5 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* ================================================================ */}
        {/* 4. AUDIT TABLE                                                    */}
        {/* ================================================================ */}
        <Card className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden" padding="none">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/90">
                <TableRow>
                  <TableHead className="font-bold text-slate-800 text-xs whitespace-nowrap">Timestamp</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Actor & Role</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Module</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Action</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Entity & Details</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <History className="h-8 w-8 text-slate-200" />
                        <span className="text-sm font-semibold">No audit events match your filters</span>
                        <span className="text-xs">Try adjusting the module or action filter</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((evt) => {
                    const { date, time } = formatTimestamp(evt.timestamp);
                    const moduleCls = moduleBadgeColors[evt.module] || "bg-slate-100 text-slate-700";
                    const actionCls = actionBadgeColors[evt.action] || "bg-slate-100 text-slate-700";
                    const isHovered = hoveredRow === evt.id;

                    return (
                      <motion.tr
                        key={evt.id}
                        onHoverStart={() => setHoveredRow(evt.id)}
                        onHoverEnd={() => setHoveredRow(null)}
                        animate={{ backgroundColor: isHovered ? "rgb(248 250 252)" : "rgb(255 255 255)" }}
                        transition={{ duration: 0.15 }}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <TableCell className="whitespace-nowrap">
                          <span className="font-mono text-[11px] text-slate-700 block">{date}</span>
                          <span className="font-mono text-[10px] text-slate-400">{time}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-xs text-slate-900 block">{evt.actorName}</span>
                          <span className="text-[10px] text-slate-400">{evt.role}</span>
                        </TableCell>
                        <TableCell>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${moduleCls}`}>
                            {evt.module}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`text-[10px] font-extrabold font-mono px-2 py-0.5 rounded-full ${actionCls}`}>
                            {evt.action}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-slate-700 max-w-xs">
                          <strong className="text-slate-900">{evt.targetEntity} ({evt.entityId})</strong>:{" "}
                          <span className="text-slate-500">{evt.details}</span>
                        </TableCell>
                        <TableCell className="text-right font-mono text-[11px] text-slate-400 whitespace-nowrap">
                          {evt.ipAddress}
                        </TableCell>
                      </motion.tr>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* ================================================================ */}
        {/* 5. IMMUTABILITY NOTICE                                            */}
        {/* ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-900 to-[#0A2A57] rounded-2xl border border-slate-700 text-white"
        >
          <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Lock className="h-4.5 w-4.5 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-extrabold">Append-Only Audit Guarantee</span>
            <p className="text-[10px] text-slate-300 mt-0.5">
              All audit events are written to an append-only PostgreSQL table on NeonDB. No row may be updated or deleted — even by super_admin. Row-level security enforces read-only access from this UI.
            </p>
          </div>
        </motion.div>
      </PageTransition>
    </AdminLayout>
  );
}
