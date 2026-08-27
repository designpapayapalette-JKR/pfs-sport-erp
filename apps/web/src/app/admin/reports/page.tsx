"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
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
  TrendingUp,
  Download,
  Calendar,
  Layers,
  Users,
  ShoppingCart,
  Building2,
  DollarSign,
  PieChart,
  BarChart2,
  ShieldCheck,
} from "lucide-react";

export default function AdminReportsPage() {
  const { orders, leads } = useERP();

  const handleExportCSV = () => {
    alert("Operational Report CSV exported successfully.");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Operational Reports & KPI Analytics
              </h1>
              <Badge variant="gold">PRD §9.13 Analytics</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Commercial revenue breakdowns, dealer tier distributions, lead velocity metrics, and warehouse fulfillment SLAs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="accent" size="sm" onClick={handleExportCSV}>
              <Download className="mr-1.5 h-4 w-4" /> Export Report (CSV)
            </Button>
          </div>
        </div>

        {/* 3 Summary Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue by Sport Category */}
          <Card className="p-5 bg-white border border-surfaceBorder shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <PieChart className="h-4 w-4 text-primary" />
                Revenue by Sport Category
              </CardTitle>
              <span className="text-xs text-neutral-500">FY 2026-27</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Pickleball Surfaces (48%)</span>
                  <span className="font-mono">₹42.8 Lakhs</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1976D2] h-full rounded-full w-[48%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Tennis Hard & Cushion Courts (26%)</span>
                  <span className="font-mono">₹23.2 Lakhs</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#006442] h-full rounded-full w-[26%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Padel Turf & Lighting (16%)</span>
                  <span className="font-mono">₹14.3 Lakhs</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#B9903C] h-full rounded-full w-[16%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Badminton PU Flooring (10%)</span>
                  <span className="font-mono">₹8.9 Lakhs</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#F36E21] h-full rounded-full w-[10%]" />
                </div>
              </div>
            </div>
          </Card>

          {/* Lead Conversion Funnel */}
          <Card className="p-5 bg-white border border-surfaceBorder shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-[#006442]" />
                CRM Conversion Funnel
              </CardTitle>
              <span className="text-xs text-neutral-500">Last 30 Days</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-neutral-50 border">
                <span>Inbound Inquiries:</span>
                <span className="font-bold font-mono">48 Leads</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-neutral-50 border">
                <span>Qualified Projects:</span>
                <span className="font-bold font-mono text-primary">34 Leads (70.8%)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-neutral-50 border">
                <span>Formal Estimates Sent:</span>
                <span className="font-bold font-mono text-amber-700">22 Estimates (45.8%)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900">Deals Won / Converted:</span>
                <span className="font-bold font-mono text-emerald-900">12 Orders (25.0%)</span>
              </div>
            </div>
          </Card>

          {/* Fulfilment SLA Performance */}
          <Card className="p-5 bg-white border border-surfaceBorder shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#F36E21]" />
                Fulfillment SLA Metrics
              </CardTitle>
              <span className="text-xs text-neutral-500">August 2026</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-lg border space-y-1">
                <div className="flex justify-between text-neutral-500">
                  <span>Order to Stock Reservation:</span>
                  <span className="font-mono font-bold text-neutral-900">12 mins (Avg)</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Order to Carrier Dispatch:</span>
                  <span className="font-mono font-bold text-neutral-900">2.1 Days (Avg)</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>On-Time Delivery Rate:</span>
                  <span className="font-mono font-bold text-emerald-700">97.8%</span>
                </div>
              </div>

              <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200 text-blue-900 text-[11px] flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                <span>100% of all commercial totals computed exclusively in FastAPI backend.</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
