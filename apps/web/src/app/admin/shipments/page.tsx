"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
import { ShipmentRecord, OrderRecord } from "@/lib/mock-data";
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
  Truck,
  Plus,
  Search,
  CheckCircle2,
  MapPin,
  Clock,
  Building,
  FileCheck,
  Check,
  ExternalLink,
  ShieldCheck,
  Package,
} from "lucide-react";
import { DispatchConsignmentModal } from "@/components/dispatch/dispatch-consignment-modal";

export default function AdminShipmentsPage() {
  const { shipments } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDispatchModalOpen, setIsDispatchModalOpen] = React.useState(false);
  const [activeDispatchOrder, setActiveDispatchOrder] = React.useState<OrderRecord | null>(null);

  const filteredShipments = shipments.filter(
    (s) =>
      s.shipmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.carrierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.dealerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.trackingAwb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destinationCity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Logistics &amp; Carrier Dispatch Control
              </h1>
              <Badge variant="accent">ZeptoMail Dispatch Webhooks Active</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Assign third-party freight carriers (Safexpress, VRL, Blue Dart), generate tracking AWBs, manage GST E-Way bills, and track live transit milestone checkpoints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={() => {
                setActiveDispatchOrder(null);
                setIsDispatchModalOpen(true);
              }}
              className="rounded-xl px-4 font-bold text-xs bg-[#F36E21] hover:bg-[#D95D16]"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Create Consignment Dispatch
            </Button>
          </div>
        </div>

        {/* 3 Telemetry Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider text-[10px]">Active Consignments</span>
              <Truck className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-black text-slate-900 font-mono">
              {shipments.filter((s) => s.status !== "delivered").length}
            </p>
            <span className="text-[10px] text-emerald-700 font-bold block">En Route / Linehaul Transit</span>
          </Card>

          <Card className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider text-[10px]">Super Hubs Active</span>
              <Building className="h-4 w-4 text-[#E0A925]" />
            </div>
            <p className="text-2xl font-black text-slate-900 font-mono">3</p>
            <span className="text-[10px] text-slate-500 block">Bhiwandi (MH), Okhla (NCR), Peenya (BLR)</span>
          </Card>

          <Card className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider text-[10px]">On-Time SLA Rating</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900 font-mono">99.4%</p>
            <span className="text-[10px] text-emerald-700 font-bold block">24-48h Guaranteed SLA</span>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by AWB, Consignee, City or Carrier..."
              className="pl-9 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Shipments Table */}
        <Card className="bg-white border border-surfaceBorder shadow-xs overflow-hidden rounded-2xl" padding="none">
          <Table>
            <TableHeader className="bg-neutral-50/80">
              <TableRow>
                <TableHead className="font-bold text-neutral-800">Shipment # &amp; AWB</TableHead>
                <TableHead className="font-bold text-neutral-800">Order &amp; Consignee</TableHead>
                <TableHead className="font-bold text-neutral-800">Origin Hub &amp; Carrier</TableHead>
                <TableHead className="font-bold text-neutral-800">Destination</TableHead>
                <TableHead className="font-bold text-neutral-800">ETA Date</TableHead>
                <TableHead className="font-bold text-neutral-800">Status</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((s) => (
                <TableRow key={s.id} className="hover:bg-neutral-50/60 transition-colors">
                  <TableCell>
                    <p className="font-mono font-bold text-xs text-primary">{s.shipmentNumber}</p>
                    <p className="text-[10px] font-mono text-neutral-600 font-bold">AWB: {s.trackingAwb}</p>
                    {s.eWayBillNumber && (
                      <span className="text-[9px] font-mono text-emerald-700 block">{s.eWayBillNumber}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs font-semibold text-neutral-900 block">{s.orderNumber}</span>
                    <span className="text-[11px] text-neutral-500 truncate max-w-[160px] block">{s.dealerName}</span>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-800">
                    <span className="font-bold block text-slate-900">{s.carrierName}</span>
                    <span className="text-[10px] text-slate-500">{s.originWarehouse}</span>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-700">
                    <span className="font-bold text-slate-900 block">{s.destinationCity}</span>
                    {s.vehicleNumber && (
                      <span className="text-[10px] font-mono text-slate-400 block">{s.vehicleNumber}</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-neutral-900 font-bold">
                    {s.estimatedDeliveryDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={s.status === "delivered" ? "success" : "accent"}
                      size="sm"
                      className="capitalize text-[10px] font-bold"
                    >
                      {s.status.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/shipments/${s.id}`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs rounded-xl font-bold">
                        Timeline →
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Reusable High-End Dispatch Modal */}
        <DispatchConsignmentModal
          isOpen={isDispatchModalOpen}
          onClose={() => setIsDispatchModalOpen(false)}
          order={activeDispatchOrder}
        />
      </div>
    </AdminLayout>
  );
}

