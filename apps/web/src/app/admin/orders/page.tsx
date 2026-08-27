"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
import { OrderRecord } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Input,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@pfs/ui";
import {
  ShoppingCart,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  Search,
  Check,
  Building,
  CreditCard,
  Download,
  AlertTriangle,
  MapPin,
  X,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DispatchConsignmentModal } from "@/components/dispatch/dispatch-consignment-modal";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("All");
  const [selectedOrder, setSelectedOrder] = React.useState<OrderRecord | null>(null);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = React.useState(false);
  const [downloadingInvoice, setDownloadingInvoice] = React.useState(false);

  const statuses = ["All", "submitted", "confirmed", "processing", "packed", "dispatched", "delivered"];

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = selectedStatus === "All" || ord.status === selectedStatus;
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.dealerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.destinationCity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusTransition = (orderId: string, nextStatus: OrderRecord["status"]) => {
    updateOrderStatus(orderId, nextStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: nextStatus });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Order Fulfilment Desk & Stock Reservations
              </h1>
              <Badge variant="success">ACID Inventory Locks</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Review inbound dealer requests, lock warehouse allocations, advance production statuses, and generate tax invoices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/shipments">
              <Button variant="accent" size="sm">
                <Truck className="mr-1.5 h-4 w-4" />
                Dispatch & Carrier Desk
              </Button>
            </Link>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                  selectedStatus === st
                    ? "bg-[#0A2A57] text-white shadow-xs"
                    : "bg-white text-neutral-600 hover:bg-neutral-100 border border-surfaceBorder"
                }`}
              >
                {st === "All" ? "All Orders" : st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Dealer or Order #..."
              className="pl-9 text-xs"
            />
          </div>
        </div>

        {/* Orders Table */}
        <Card className="bg-white border border-surfaceBorder shadow-xs overflow-hidden" padding="none">
          <Table>
            <TableHeader className="bg-neutral-50/80">
              <TableRow>
                <TableHead className="font-bold text-neutral-800">Order # & Date</TableHead>
                <TableHead className="font-bold text-neutral-800">Dealer Account</TableHead>
                <TableHead className="font-bold text-neutral-800">Destination Site</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Order Value</TableHead>
                <TableHead className="font-bold text-neutral-800">Payment Status</TableHead>
                <TableHead className="font-bold text-neutral-800">Fulfilment Status</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((ord) => (
                <TableRow key={ord.id} className="hover:bg-neutral-50/60">
                  <TableCell>
                    <p className="font-mono font-bold text-xs text-primary">{ord.orderNumber}</p>
                    <p className="text-[10px] text-neutral-400 font-mono">
                      {ord.createdAt}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-xs text-neutral-900">{ord.dealerName}</p>
                    <Badge variant="gold" size="sm" className="text-[9px]">
                      {ord.dealerTier} Tier
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-700 max-w-[180px] truncate">
                    {ord.destinationCity}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-xs text-neutral-900">
                    ₹{ord.totalAmount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ord.paymentStatus === "Paid"
                          ? "success"
                          : ord.paymentStatus === "Partially Paid"
                          ? "warning"
                          : "outline"
                      }
                      size="sm"
                    >
                      {ord.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ord.status === "delivered"
                          ? "success"
                          : ord.status === "dispatched"
                          ? "accent"
                          : ord.status === "confirmed"
                          ? "info"
                          : "warning"
                      }
                      size="sm"
                      className="capitalize"
                    >
                      {ord.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => setSelectedOrder(ord)}
                    >
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Enterprise Order Dossier & Lifecycle Left-Side Slide-Over Sheet */}
        <AnimatePresence>
          {selectedOrder && (
            <div className="fixed inset-0 z-[100] flex justify-start">
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity"
              />

              {/* Left Slide-over Sheet Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="relative z-10 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white h-screen shadow-2xl flex flex-col border-r border-slate-200 overflow-hidden text-neutral-900"
              >
                {/* Sticky Header Banner */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white flex items-center justify-between border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20 text-[#E0A925] flex items-center justify-center font-black shadow-inner shrink-0">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-black text-white font-mono tracking-tight">
                          {selectedOrder.orderNumber}
                        </h2>
                        <Badge
                          variant={
                            selectedOrder.status === "delivered"
                              ? "default"
                              : selectedOrder.status === "dispatched"
                              ? "accent"
                              : selectedOrder.status === "packed"
                              ? "gold"
                              : "outline"
                          }
                          size="sm"
                          className="capitalize font-mono text-[10px]"
                        >
                          {selectedOrder.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {selectedOrder.dealerName} ({selectedOrder.dealerTier} Tier) • Placed on {selectedOrder.createdAt}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 shrink-0"
                  >
                    <X className="h-4.5 w-4.5 stroke-[2.2]" />
                    <span className="sr-only">Close Drawer</span>
                  </button>
                </div>

                {/* Real-time Order Telemetry Preview Ribbon */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-50 border-b border-slate-200/80 shrink-0 text-xs font-mono">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block">Material Scope</span>
                    <strong className="text-slate-900 font-bold block truncate">
                      {selectedOrder.items.reduce((s, i) => s + i.quantity, 0)} Units ({selectedOrder.items.length} SKUs)
                    </strong>
                  </div>
                  <div className="p-2.5 bg-emerald-50/90 rounded-xl border border-emerald-200 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-emerald-800 uppercase block">Gross Invoice</span>
                    <strong className="text-emerald-900 font-black block truncate">
                      ₹{selectedOrder.totalAmount.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-200 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-amber-800 uppercase block">Destination Site</span>
                    <strong className="text-amber-900 font-black block flex items-center gap-1 truncate">
                      <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                      {selectedOrder.destinationCity || "Site Delivery"}
                    </strong>
                  </div>
                </div>

                {/* 6-Stage Order Lifecycle Stepper Strip */}
                <div className="px-5 py-3 bg-slate-900 text-white border-b border-slate-800 shrink-0">
                  <div className="grid grid-cols-6 gap-1 text-center">
                    {(
                      [
                        { id: "submitted", label: "1. Submitted" },
                        { id: "confirmed", label: "2. Confirmed" },
                        { id: "processing", label: "3. Processing" },
                        { id: "packed", label: "4. Packed" },
                        { id: "dispatched", label: "5. Dispatched" },
                        { id: "delivered", label: "6. Delivered" },
                      ] as const
                    ).map((step, idx) => {
                      const stages = ["submitted", "confirmed", "processing", "packed", "dispatched", "delivered"];
                      const currentIdx = stages.indexOf(selectedOrder.status);
                      const isComplete = currentIdx >= idx;
                      const isCurrent = currentIdx === idx;

                      return (
                        <div key={step.id} className="space-y-1">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              isCurrent
                                ? "bg-[#F36E21] shadow-xs"
                                : isComplete
                                ? "bg-[#00D084]"
                                : "bg-white/20"
                            }`}
                          />
                          <span
                            className={`text-[9px] font-bold block truncate ${
                              isCurrent
                                ? "text-[#F36E21]"
                                : isComplete
                                ? "text-emerald-300"
                                : "text-slate-400"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Scrollable Body */}
                <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5 text-xs">
                  {/* KPI Telemetry Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                      <span className="text-[10px] font-sans font-bold text-slate-400 uppercase block">Subtotal (Excl. Tax)</span>
                      <strong className="text-slate-900 font-bold">₹{selectedOrder.subtotal.toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/80">
                      <span className="text-[10px] font-sans font-bold text-emerald-800 uppercase block">18% GST Input Credit</span>
                      <strong className="text-emerald-900 font-bold">₹{selectedOrder.gstAmount.toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                      <span className="text-[10px] font-sans font-bold text-slate-400 uppercase block">Dispatch SLA</span>
                      <strong className="text-slate-900 font-bold">24-48 Hours</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                      <span className="text-[10px] font-sans font-bold text-slate-400 uppercase block">Origin Super Hub</span>
                      <strong className="text-slate-900 font-bold">Bhiwandi (MH)</strong>
                    </div>
                  </div>

                  {/* State Transition Workflow Action Bar */}
                  <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        Lifecycle Transition Controls
                      </span>
                      <span className="text-[10px] text-slate-400">Current Phase: <strong className="text-white capitalize">{selectedOrder.status}</strong></span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {selectedOrder.status === "submitted" && (
                        <Button
                          variant="default"
                          size="sm"
                          className="rounded-xl text-xs font-bold bg-[#006442] hover:bg-[#005035] text-white"
                          onClick={() => handleStatusTransition(selectedOrder.id, "confirmed")}
                        >
                          <Check className="mr-1.5 h-3.5 w-3.5" /> Confirm &amp; Lock Stock Allocation
                        </Button>
                      )}

                      {selectedOrder.status === "confirmed" && (
                        <Button
                          variant="default"
                          size="sm"
                          className="rounded-xl text-xs font-bold bg-[#1976D2] hover:bg-[#1565C0] text-white"
                          onClick={() => handleStatusTransition(selectedOrder.id, "processing")}
                        >
                          <Clock className="mr-1.5 h-3.5 w-3.5" /> Move to Factory Processing
                        </Button>
                      )}

                      {selectedOrder.status === "processing" && (
                        <Button
                          variant="accent"
                          size="sm"
                          className="rounded-xl text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16] text-white"
                          onClick={() => handleStatusTransition(selectedOrder.id, "packed")}
                        >
                          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Mark Packed at Warehouse
                        </Button>
                      )}

                      {selectedOrder.status === "packed" && (
                        <Button
                          variant="accent"
                          size="sm"
                          className="rounded-xl text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16] text-white shadow-md"
                          onClick={() => setIsDispatchModalOpen(true)}
                        >
                          <Truck className="mr-1.5 h-3.5 w-3.5" /> Dispatch with Logistics Carrier &amp; EWB →
                        </Button>
                      )}

                      {selectedOrder.status === "dispatched" && (
                        <Button
                          variant="default"
                          size="sm"
                          className="rounded-xl text-xs font-bold bg-[#006442] hover:bg-[#005035] text-white"
                          onClick={() => handleStatusTransition(selectedOrder.id, "delivered")}
                        >
                          <Check className="mr-1.5 h-3.5 w-3.5" /> Mark Delivered &amp; Upload Proof of Delivery
                        </Button>
                      )}

                      {selectedOrder.status === "delivered" && (
                        <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 py-1">
                          <CheckCircle2 className="h-4 w-4" /> Consignment successfully delivered and closed.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="space-y-2">
                    <span className="font-extrabold text-xs text-slate-800 block">
                      Material Manifest &amp; Line Items
                    </span>
                    <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase">
                          <tr>
                            <th className="p-3">Product System / Material</th>
                            <th className="p-3 text-right">Quantity</th>
                            <th className="p-3 text-right">Unit Wholesale</th>
                            <th className="p-3 text-right">Line Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedOrder.items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="p-3">
                                <strong className="text-slate-900 block font-bold">{item.productName}</strong>
                                <span className="font-mono text-[10px] text-slate-400">{item.sku}</span>
                              </td>
                              <td className="p-3 text-right font-mono text-slate-800">
                                {item.quantity.toLocaleString("en-IN")} {item.unit}
                              </td>
                              <td className="p-3 text-right font-mono text-slate-600">
                                ₹{item.unitPrice.toLocaleString("en-IN")}
                              </td>
                              <td className="p-3 text-right font-mono font-black text-slate-900">
                                ₹{item.totalPrice.toLocaleString("en-IN")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)} className="rounded-xl text-xs font-bold px-4 h-10">
                    Close Dossier
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={downloadingInvoice}
                      onClick={() => {
                        setDownloadingInvoice(true);
                        setTimeout(() => setDownloadingInvoice(false), 1200);
                      }}
                      className="rounded-xl text-xs font-bold flex items-center gap-1.5 h-10 px-4"
                    >
                      {downloadingInvoice ? (
                        <><RefreshCw className="h-3.5 w-3.5 animate-spin mr-1.5" />Generating…</>
                      ) : (
                        <><Download className="h-3.5 w-3.5 mr-1.5" />PDF Tax Invoice</>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dispatch Consignment Modal */}
        <DispatchConsignmentModal
          isOpen={isDispatchModalOpen}
          onClose={() => setIsDispatchModalOpen(false)}
          order={selectedOrder}
          onDispatched={(shp) => {
            if (selectedOrder) {
              setSelectedOrder((prev) =>
                prev ? { ...prev, status: "dispatched", shipmentId: shp.id } : null
              );
            }
          }}
        />
      </div>
    </AdminLayout>
  );
}
