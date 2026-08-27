"use client";

import * as React from "react";
import Link from "next/link";
import { DealerLayout } from "@/components/layout";
import { PageHeader } from "@/components/layout/page-header";
import { KpiStatCard } from "@/components/ui/kpi-stat-card";
import { LaunchpadCard } from "@/components/ui/launchpad-card";
import { DataTableCard } from "@/components/ui/data-table-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { useERP } from "@/context/erp-context";
import {
  Button,
  Badge,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Card,
} from "@pfs/ui";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  LivePulseDot,
} from "@/components/motion";
import {
  ShoppingCart,
  Layers,
  Calculator,
  Palette,
  FileText,
  Truck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Crown,
  Sparkles,
  CreditCard,
  Building2,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  const { currentUser, orders, products } = useERP();

  const totalOrderValue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrdersCount = orders.filter((o) => ["submitted", "confirmed", "processing", "packed", "dispatched"].includes(o.status)).length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const lowStockCount = products.filter((p) => (p.stockOnHands - p.stockReserved) <= p.reorderLevel).length;

  return (
    <DealerLayout>
      <PageTransition className="space-y-4">
        {/* 1. Top Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 bg-gradient-to-r from-[#040C1A] via-[#0A1628] to-[#122238] p-5 rounded-2xl text-white shadow-md relative overflow-hidden border border-white/10">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#E0A925]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pfs-logo.png"
              alt="PFS Sport Shield Logo"
              className="h-12 w-12 object-contain drop-shadow-[0_2px_12px_rgba(224,169,37,0.45)] shrink-0 hidden sm:block"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E0A925]">Authorized Partner Extranet</span>
                <Badge variant="gold" className="rounded-full shadow-xs flex items-center gap-1.5 text-[9px] py-0.5 font-bold">
                  <LivePulseDot color="orange" size="sm" />
                  {currentUser.dealerTier || "Platinum"} Partner (25% Slabs)
                </Badge>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Welcome back, {currentUser.name}
              </h1>
              <p className="text-xs text-white/70 font-mono">
                {currentUser.dealerName || "Apex Sports Infrastructure Pvt Ltd"} • Region: {currentUser.territory || "Maharashtra & Goa"} • Credit: ₹25.0L
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-2">
            <Link href="/dealer/visualiser">
              <Button variant="outline" size="sm" className="h-8.5 bg-white/10 text-white border-white/20 hover:bg-white/20 rounded-xl backdrop-blur-md text-xs font-bold">
                <Palette className="mr-1.5 h-3.5 w-3.5 text-[#B9903C]" />
                Colour Studio
              </Button>
            </Link>
            <Link href="/dealer/estimator">
              <Button variant="accent" size="sm" className="h-8.5 rounded-xl shadow-md shadow-orange-600/30 text-xs font-bold">
                <Calculator className="mr-1.5 h-3.5 w-3.5" />
                New Turnkey Estimate
              </Button>
            </Link>
          </div>
        </div>

        {/* 2. 4-Column Stat Cards */}
        <StaggerContainer className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem>
            <KpiStatCard
              title="Cumulative Order Volume"
              value={`₹${(totalOrderValue / 100000).toFixed(2)}L`}
              trend="increase"
              trendLabel="+22.4% this quarter"
              icon={ShoppingCart}
              gradient="from-blue-600 to-indigo-700"
            />
          </StaggerItem>

          <StaggerItem>
            <KpiStatCard
              title="Orders in Fulfilment"
              value={`${activeOrdersCount} Consignments`}
              trend="neutral"
              trendLabel={`${deliveredCount} Delivered`}
              icon={Truck}
              gradient="from-amber-500 to-orange-600"
            />
          </StaggerItem>

          <StaggerItem>
            <KpiStatCard
              title="Commercial Tier Slabs"
              value={`${currentUser.dealerTier || "Platinum"} Tier`}
              trend="increase"
              trendLabel="25% Off Wholesale MRP"
              icon={Crown}
              gradient="from-[#B9903C] to-[#8C6D23]"
            />
          </StaggerItem>

          <StaggerItem>
            <KpiStatCard
              title="Central Warehouse Stock"
              value={`${lowStockCount} Systems Low`}
              trend="decrease"
              trendLabel="Reorder buffer active"
              icon={AlertTriangle}
              gradient="from-rose-500 to-red-600"
            />
          </StaggerItem>
        </StaggerContainer>

        {/* 3. 3-Column Launchpad Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <LaunchpadCard
            href="/dealer/visualiser"
            tag="SVG Engine"
            tagColor="text-blue-300"
            title="Court Colour Visualiser"
            description="Simulate 14 official PFS pure acrylic coating shades"
            icon={Palette}
            iconColor="text-[#B9903C]"
            gradient="bg-gradient-to-br from-slate-900 via-[#0A2A57] to-slate-950"
          />

          <LaunchpadCard
            href="/dealer/estimator"
            tag="Rate Card v1.4"
            tagColor="text-amber-200"
            title="Court Cost Estimator"
            description="Turnkey budget breakdown, base prep & AI notes"
            icon={Calculator}
            iconColor="text-white"
            gradient="bg-gradient-to-br from-[#8C6D23] via-[#B9903C] to-amber-800"
          />

          <LaunchpadCard
            href="/dealer/documents"
            tag="Document Vault"
            tagColor="text-[#F36E21]"
            title="Co-Branding Studio"
            description="Stamp dealer logo onto verified technical data sheets"
            icon={FileText}
            iconColor="text-[#F36E21]"
            gradient="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          />
        </div>

        {/* 4. 2-Column: Recent Orders & Stock Availability */}
        <div className="grid gap-4 lg:grid-cols-7 items-start">
          {/* Recent Orders (4 cols) */}
          <div className="lg:col-span-4">
            <DataTableCard
              title="Recent Order Requests"
              description="Live status across factory production and carrier dispatch"
              headerAction={
                <Link href="/dealer/orders">
                  <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">
                    View All <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              }
            >
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow>
                    <TableHead className="font-bold text-slate-800 text-xs">Order #</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs">Project Ref</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs">Status</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs text-right">Amount (INR)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 4).map((order) => (
                    <TableRow key={order.id} className="hover:bg-slate-50/60 transition-colors">
                      <TableCell className="font-mono font-bold text-xs text-primary">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-slate-900">
                        {order.projectReference}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-xs text-slate-900">
                        ₹{order.totalAmount.toLocaleString("en-IN")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DataTableCard>
          </div>

          {/* Central Stock Availability (3 cols) */}
          <div className="lg:col-span-3">
            <DataTableCard
              title="Central Warehouse Stock"
              description="Bhiwandi & Delhi Super Hub inventory buffers"
              headerAction={
                <Link href="/dealer/stock">
                  <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">
                    Full Ledger
                  </Button>
                </Link>
              }
            >
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow>
                    <TableHead className="font-bold text-slate-800 text-xs">System</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs text-right">Available</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.slice(0, 4).map((prod) => {
                    const available = prod.stockOnHands - prod.stockReserved;
                    const isLow = available <= prod.reorderLevel;

                    return (
                      <TableRow key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                        <TableCell>
                          <p className="font-bold text-xs text-slate-900 truncate max-w-[140px]">
                            {prod.name}
                          </p>
                          <p className="text-[10px] font-mono text-slate-400">{prod.sku}</p>
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs font-bold text-slate-900">
                          {available.toLocaleString("en-IN")} {prod.category === "Accessories" ? "units" : "sq ft"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant={isLow ? "warning" : "success"} size="sm" className="text-[10px] rounded-full">
                            {isLow ? "Low Buffer" : "Ready"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </DataTableCard>
          </div>
        </div>

        {/* 5. Bottom Strip: Credit Line Headroom & Verified Technical Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 text-primary" />
                Authorized Credit Line Utilization
              </h3>
              <Badge variant="platinum" size="sm" className="text-[9px] font-mono font-bold">
                Net 30 Slabs
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Utilized: <strong>₹6.45 Lakhs</strong></span>
              <span className="text-emerald-700 font-bold">Available Headroom: ₹18.55 Lakhs</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style={{ width: "26%" }} />
            </div>
          </Card>

          <Card className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="h-3.5 w-3.5 text-emerald-600" />
                Verified Technical Certifications (TDS)
              </h3>
              <Link href="/dealer/documents" className="text-[10px] text-primary font-bold hover:underline">
                Vault →
              </Link>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">ITF Category 4 Medium-Fast Acrylic Lab Test Certificate</span>
              <Badge variant="success" size="sm" className="rounded-full text-[9px]">
                Valid 2026-2029
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-50">
              <span className="text-slate-600">BWF Grade 1 Point-Elastic Synthetic Court Certificate</span>
              <Badge variant="outline" size="sm" className="rounded-full text-[9px]">
                Verified PDF
              </Badge>
            </div>
          </Card>
        </div>
      </PageTransition>
    </DealerLayout>
  );
}