"use client";

import * as React from "react";
import Link from "next/link";
import { DealerLayout } from "@/components/layout";
import { PageHeader } from "@/components/layout/page-header";
import { FilterBar } from "@/components/ui/filter-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { useERP } from "@/context/erp-context";
import { ShipmentRecord } from "@/lib/mock-data";
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
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink,
  Search,
  FileCheck,
  Building,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ShipmentsPage() {
  const { shipments } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredShipments = shipments.filter(
    (s) =>
      s.shipmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.carrierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destinationCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.trackingAwb.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DealerLayout>
      <PageTransition className="space-y-6">
        {/* Standardized Page Header */}
        <PageHeader
          title="Shipment Tracking & Logistics"
          description="Real-time freight telemetry, carrier AWB tracking, dispatch dispatch gate passes, and verified Proof of Delivery (POD)."
          badgeText="Live Carrier Milestones"
          badgeVariant="success"
          pulseColor="emerald"
        />

        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search by AWB, shipment #, carrier, or destination..."
        />

        {/* Shipments List */}
        <StaggerContainer className="space-y-5">
          {filteredShipments.map((shipment) => {
            const isDelivered = shipment.status === "delivered";

            return (
              <StaggerItem key={shipment.id}>
                <MotionCard className="p-6 bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all rounded-2xl">
                  {/* Top Info Bar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-black text-base text-primary">
                          {shipment.shipmentNumber}
                        </span>
                        <StatusBadge status={shipment.status} />
                      </div>
                      <p className="text-xs text-slate-500">
                        Order Reference: <strong className="text-slate-900 font-mono">{shipment.orderNumber}</strong> • Carrier: <strong className="text-slate-900">{shipment.carrierName}</strong> (AWB: <span className="font-mono text-slate-700 font-bold">{shipment.trackingAwb}</span>)
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-left md:text-right text-xs font-mono">
                        <span className="text-slate-400 block text-[10px] uppercase">Estimated Delivery</span>
                        <span className="font-bold text-slate-900">{shipment.estimatedDeliveryDate}</span>
                      </div>

                      <Link href={`/dealer/shipments/${shipment.id}`}>
                        <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold">
                          Tracking Details <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Route & Cargo Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#1976D2] flex items-center justify-center shrink-0">
                        <Building className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Dispatch Hub</span>
                        <p className="font-bold text-slate-900">{shipment.originWarehouse}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-amber-50 text-[#B9903C] flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Destination Site</span>
                        <p className="font-bold text-slate-900">{shipment.destinationCity}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Package className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Milestones Completed</span>
                        <p className="font-bold text-slate-900 font-mono">
                          {shipment.timeline.filter((t) => t.completed).length} / {shipment.timeline.length} Checkpoints
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Milestones Timeline */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px] mb-2 font-bold text-slate-700">
                      <span>Milestone Progress</span>
                      <span className="text-slate-400 font-mono">
                        {isDelivered ? "100% Complete" : "In Transit"}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center justify-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Dispatched
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center justify-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> In Transit
                      </div>
                      <div className={`p-2 rounded-xl font-bold border flex items-center justify-center gap-1 ${isDelivered ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-[#1976D2] border-blue-200"}`}>
                        {isDelivered && <CheckCircle2 className="h-3 w-3" />}
                        <span>Out for Delivery</span>
                      </div>
                      <div className={`p-2 rounded-xl font-bold border flex items-center justify-center gap-1 ${isDelivered ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-400 border-slate-200"}`}>
                        {isDelivered && <CheckCircle2 className="h-3 w-3" />}
                        <span>Delivered</span>
                      </div>
                    </div>
                  </div>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {filteredShipments.length === 0 && (
          <EmptyState
            title="No Active Shipments Found"
            description="No freight dispatches matched your search query. Clear your search or contact logistics desk."
            actionLabel="Reset Search"
            onAction={() => setSearchQuery("")}
          />
        )}
      </PageTransition>
    </DealerLayout>
  );
}
