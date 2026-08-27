"use client";

import * as React from "react";
import Link from "next/link";
import { DealerLayout } from "@/components/layout";
import { PageHeader } from "@/components/layout/page-header";
import { FilterBar } from "@/components/ui/filter-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
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
  Progress,
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
  ShoppingCart,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Crown,
  Search,
  Download,
  Check,
  X,
} from "lucide-react";

export default function OrdersPage() {
  const {
    orders,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    createOrderFromCart,
    currentUser,
  } = useERP();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("All");

  // Checkout Dialog State
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [paymentTerms, setPaymentTerms] = React.useState<OrderRecord["paymentTerms"]>("30 Days Net Credit");
  const [destinationCity, setDestinationCity] = React.useState("Pune Sports Complex, Maharashtra");
  const [projectRef, setProjectRef] = React.useState("Pune Club 2x Tournament Courts");
  const [orderCreatedSuccess, setOrderCreatedSuccess] = React.useState<OrderRecord | null>(null);

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = React.useState<OrderRecord | null>(null);

  const statuses = ["All", "submitted", "confirmed", "processing", "dispatched", "delivered"];

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = selectedStatus === "All" || ord.status === selectedStatus;
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.projectReference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.destinationCity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const cartGst = Math.round(cartSubtotal * 0.18);
  const cartTotal = cartSubtotal + cartGst;

  const handleCheckoutSubmit = () => {
    const newOrder = createOrderFromCart(paymentTerms, destinationCity, projectRef);
    setOrderCreatedSuccess(newOrder);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setOrderCreatedSuccess(null);
      setSelectedOrder(newOrder);
    }, 1500);
  };

  return (
    <DealerLayout>
      <PageTransition className="space-y-6">
        {/* Standardized Page Header */}
        <PageHeader
          title="Orders & Procurement Desk"
          description="Direct factory orders, credit allocation checks, production status tracking, and dispatch documentation."
          badgeText={`Credit Limit: ₹${((currentUser.creditLimit || 2500000) / 100000).toFixed(1)}L`}
          badgeVariant="platinum"
          pulseColor="emerald"
        >
          <Link href="/dealer/catalogue">
            <Button variant="accent" size="sm" className="rounded-xl shadow-xs">
              <Plus className="mr-1.5 h-4 w-4" />
              Browse Catalogue & Add Stock
            </Button>
          </Link>
        </PageHeader>

        {/* 2-Column Split: Active Cart & Orders Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Active Order Cart Drawer (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="bg-white border border-slate-200/80 shadow-md rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-50/80 px-5 py-4 border-b border-slate-100 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-[#0A2A57] text-white flex items-center justify-center shadow-xs">
                    <ShoppingCart className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-extrabold text-slate-900">
                      Active Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
                    </CardTitle>
                  </div>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </CardHeader>

              <CardContent className="p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-slate-300 stroke-[1.5]" />
                    <p className="font-bold text-slate-700">Your cart is currently empty</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 mb-3">
                      Add surface systems or accessories from the catalogue.
                    </p>
                    <Link href="/dealer/catalogue">
                      <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold">
                        Browse Catalogue
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                      {cart.map((item) => {
                        const unitPrice =
                          currentUser.dealerTier === "Platinum"
                            ? item.product.platinumPrice
                            : currentUser.dealerTier === "Gold"
                            ? item.product.goldPrice
                            : currentUser.dealerTier === "Silver"
                            ? item.product.silverPrice
                            : item.product.mrpInr;

                        return (
                          <div
                            key={item.product.id}
                            className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
                          >
                            <div className="space-y-1 flex-1">
                              <h4 className="font-extrabold text-slate-900 leading-tight">
                                {item.product.name}
                              </h4>
                              <p className="text-[10px] font-mono text-slate-400">SKU: {item.product.sku}</p>
                              <div className="flex items-center gap-2 pt-1">
                                <span className="text-[11px] text-slate-500">Qty:</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => updateCartQuantity(item.product.id, Math.max(1, Number(e.target.value)))}
                                  className="w-18 h-7 text-xs font-mono font-bold border border-slate-200 bg-white rounded-lg px-2 text-center"
                                />
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {item.product.category === "Accessories" ? "units" : "sq ft"}
                                </span>
                              </div>
                            </div>

                            <div className="text-right flex flex-col justify-between items-end h-full">
                              <span className="font-black font-mono text-xs text-slate-900">
                                ₹{(unitPrice * item.quantity).toLocaleString("en-IN")}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-slate-400 hover:text-rose-600 transition-colors p-1 mt-2"
                                title="Remove item"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Cart Summary Totals */}
                    <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Subtotal ({currentUser.dealerTier || "Platinum"} Tier)</span>
                        <span className="font-mono text-slate-900 font-bold">
                          ₹{cartSubtotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>GST (18% Statutory)</span>
                        <span className="font-mono text-slate-900 font-bold">
                          ₹{cartGst.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                        <span>Total Payable</span>
                        <span className="font-mono text-primary text-base">
                          ₹{cartTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="accent"
                      className="w-full h-11 text-xs font-bold rounded-xl shadow-md shadow-orange-600/20 mt-2"
                      onClick={() => setIsCheckoutOpen(true)}
                    >
                      <span>Proceed to Order Submission</span>
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order History & Consignments (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="Search by order #, city, project ref..."
            >
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {statuses.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap capitalize ${
                      selectedStatus === st
                        ? "bg-[#0A2A57] text-white shadow-xs"
                        : "bg-slate-100/80 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </FilterBar>

            {/* Orders Table */}
            <Card className="bg-white border border-slate-200/80 shadow-xs rounded-2xl overflow-hidden" padding="none">
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow>
                    <TableHead className="font-bold text-slate-800 text-xs">Order Details</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs">Destination</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs">Status</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs text-right">Amount (INR)</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((ord) => (
                    <TableRow key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                      <TableCell>
                        <p className="font-mono font-bold text-xs text-primary">{ord.orderNumber}</p>
                        <p className="text-[11px] font-semibold text-slate-900 mt-0.5">{ord.projectReference}</p>
                        <span className="text-[10px] font-mono text-slate-400">{ord.createdAt}</span>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 max-w-[140px] truncate">
                        {ord.destinationCity}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={ord.status} />
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-xs text-slate-900">
                        ₹{ord.totalAmount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs rounded-lg font-bold"
                          onClick={() => setSelectedOrder(ord)}
                        >
                          View PO
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredOrders.length === 0 && (
                <EmptyState
                  title="No Orders Found"
                  description="No orders match your filter criteria. Place an order from your active cart or clear search filters."
                  actionLabel="Clear Filters"
                  onAction={() => {
                    setSearchQuery("");
                    setSelectedStatus("All");
                  }}
                />
              )}
            </Card>
          </div>
        </div>

        {/* Enterprise Order Dossier Left-Side Slide-Over Sheet */}
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
                {/* Top Header Banner */}
                <div className="bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white p-5 sm:p-6 relative overflow-hidden shrink-0">
                  <div className="absolute right-0 top-0 w-72 h-72 bg-[#F36E21]/20 blur-3xl pointer-events-none rounded-full" />
                  <div className="absolute left-1/3 top-0 w-48 h-48 bg-[#E0A925]/15 blur-3xl pointer-events-none rounded-full" />

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white/10 text-[#E0A925] flex items-center justify-center font-black shadow-xs shrink-0 border border-white/10">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-white font-mono">
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
                          <p className="text-xs text-slate-300 font-mono mt-0.5">
                            Purchase Order Ref: {selectedOrder.id.toUpperCase()} • Generated on {selectedOrder.createdAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                          <span className="text-[9px] text-slate-400 font-mono block uppercase">Grand Total</span>
                          <strong className="text-base font-black text-emerald-400 font-mono">
                            ₹{selectedOrder.totalAmount.toLocaleString("en-IN")}
                          </strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(null)}
                          className="h-8.5 w-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95"
                        >
                          <X className="h-4 w-4 stroke-[2.2]" />
                          <span className="sr-only">Close</span>
                        </button>
                      </div>
                    </div>

                    {/* 6-Stage Lifecycle Stepper */}
                    <div className="pt-2">
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
                  </div>
                </div>

                {/* Scrollable Body */}
                <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5 text-xs">
                  {/* Order Meta Strip */}
                  <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 font-mono text-xs">
                    <div>
                      <span className="text-slate-400 uppercase text-[9px] font-sans font-bold block">Credit Terms</span>
                      <strong className="text-slate-900 block font-bold">{selectedOrder.paymentTerms}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase text-[9px] font-sans font-bold block">Super Hub Routing</span>
                      <strong className="text-slate-900 block font-bold">Bhiwandi Central (MH)</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase text-[9px] font-sans font-bold block">Logistics Carrier</span>
                      <strong className="text-slate-900 block font-bold">Safexpress Direct SLA</strong>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="space-y-2">
                    <span className="font-extrabold text-xs text-slate-800 block">
                      Order Manifest &amp; Line Items
                    </span>
                    <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase">
                          <tr>
                            <th className="p-3">Material Description</th>
                            <th className="p-3 text-right">Quantity</th>
                            <th className="p-3 text-right">Wholesale Rate</th>
                            <th className="p-3 text-right">Line Total</th>
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
                                {item.quantity.toLocaleString("en-IN")} {item.unit}s
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

                  {/* Financial Summary */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex justify-end">
                    <div className="w-72 space-y-1.5 text-xs text-right font-mono">
                      <div className="flex justify-between text-slate-500">
                        <span className="font-sans">Subtotal (Excl. Tax):</span>
                        <span className="font-bold text-slate-900">₹{selectedOrder.subtotal.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-emerald-700">
                        <span className="font-sans">18% GST Input Credit:</span>
                        <span className="font-bold">₹{selectedOrder.gstAmount.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                        <span className="font-sans">Invoice Total:</span>
                        <span className="font-bold text-slate-900 text-base">₹{selectedOrder.totalAmount.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)} className="rounded-xl text-xs font-bold px-4 h-10">
                    Close
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => alert(`Downloading verified PDF PO for ${selectedOrder.orderNumber}`)}
                    className="rounded-xl text-xs font-bold bg-[#040C1A] text-white flex items-center gap-1.5 h-10 px-4"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Verified PO (PDF)
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Enterprise Checkout & PO Confirmation Left-Side Slide-Over Sheet */}
        <AnimatePresence>
          {isCheckoutOpen && (
            <div className="fixed inset-0 z-[100] flex justify-start">
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCheckoutOpen(false)}
                className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity"
              />

              {/* Left Slide-over Sheet Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="relative z-10 w-full sm:max-w-xl md:max-w-2xl bg-white h-screen shadow-2xl flex flex-col border-r border-slate-200 overflow-hidden text-neutral-900"
              >
                {/* Top Header Banner */}
                <div className="bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white p-5 sm:p-6 relative overflow-hidden shrink-0">
                  <div className="absolute right-0 top-0 w-72 h-72 bg-[#F36E21]/20 blur-3xl pointer-events-none rounded-full" />
                  <div className="absolute left-1/3 top-0 w-48 h-48 bg-[#E0A925]/15 blur-3xl pointer-events-none rounded-full" />

                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-[#F36E21] text-white flex items-center justify-center font-black shadow-xs shrink-0">
                          <ShoppingCart className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-black text-white">
                            Confirm Purchase Order Submission
                          </h2>
                          <p className="text-xs text-slate-300">
                            Commercial factory allocation &amp; 24-48h dispatch dispatch SLA.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsCheckoutOpen(false)}
                        className="h-8.5 w-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 shrink-0"
                      >
                        <X className="h-4 w-4 stroke-[2.2]" />
                        <span className="sr-only">Close</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Body */}
                {orderCreatedSuccess ? (
                  <div className="py-12 px-6 text-center space-y-4 flex-1 overflow-y-auto">
                    <div className="h-16 w-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                      <Check className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Purchase Order Successfully Generated!</h3>
                      <p className="text-base font-mono font-bold text-[#F36E21] mt-1">{orderCreatedSuccess.orderNumber}</p>
                    </div>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Materials reserved at Bhiwandi Super Hub. Dispatch notification will be transmitted with E-Way Bill within 24 hours.
                    </p>
                    <div className="pt-4">
                      <Button
                        variant="accent"
                        size="default"
                        onClick={() => {
                          setIsCheckoutOpen(false);
                          setOrderCreatedSuccess(null);
                        }}
                        className="rounded-xl text-xs font-black bg-[#F36E21] hover:bg-[#D95D16] text-white px-6 h-10 shadow-md"
                      >
                        View Active Order Dashboard →
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-4 text-xs">
                      <div>
                        <label className="font-extrabold text-slate-800 block mb-1">Project Reference Name</label>
                        <Input
                          value={projectRef}
                          onChange={(e) => setProjectRef(e.target.value)}
                          placeholder="e.g. Pune Club 4-Court Turnkey Project"
                          className="rounded-xl text-xs bg-white h-10"
                        />
                      </div>

                      <div>
                        <label className="font-extrabold text-slate-800 block mb-1">Jobsite Delivery Destination &amp; Pincode</label>
                        <Input
                          value={destinationCity}
                          onChange={(e) => setDestinationCity(e.target.value)}
                          placeholder="e.g. Balewadi Sports Complex, Pune - 411045"
                          className="rounded-xl text-xs bg-white h-10"
                        />
                      </div>

                      <div>
                        <label className="font-extrabold text-slate-800 block mb-1">Approved Commercial Credit Slabs</label>
                        <select
                          value={paymentTerms}
                          onChange={(e) => setPaymentTerms(e.target.value as OrderRecord["paymentTerms"])}
                          className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                        >
                          <option value="30 Days Net Credit">30 Days Net Credit (Approved Credit Line)</option>
                          <option value="60 Days Net Credit">60 Days Net Credit (Contractor Special)</option>
                          <option value="50% Advance / 50% on Dispatch">50% Advance / 50% on Dispatch</option>
                          <option value="100% Advance">100% Advance Direct Transfer</option>
                        </select>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 font-mono">
                        <div className="flex justify-between text-xs text-slate-600">
                          <span className="font-sans">Wholesale Subtotal:</span>
                          <span>₹{cartSubtotal.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-xs text-emerald-700 font-bold">
                          <span className="font-sans">18% GST Input Credit:</span>
                          <span>₹{cartGst.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between font-black text-sm text-slate-900 pt-2 border-t border-slate-200">
                          <span className="font-sans">Total Gross Payable:</span>
                          <span className="text-base text-slate-900">₹{cartTotal.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                      <Button variant="outline" size="sm" onClick={() => setIsCheckoutOpen(false)} className="rounded-xl text-xs font-bold px-4 h-10">
                        Cancel
                      </Button>
                      <Button
                        variant="accent"
                        size="default"
                        onClick={handleCheckoutSubmit}
                        className="rounded-xl text-xs font-black bg-[#F36E21] hover:bg-[#D95D16] text-white shadow-md px-6 h-10 flex items-center gap-2"
                      >
                        <Check className="h-4 w-4" /> Confirm &amp; Submit Purchase Order
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </PageTransition>
    </DealerLayout>
  );
}