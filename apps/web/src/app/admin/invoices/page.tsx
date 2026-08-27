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
  AnimatedNumber,
  LivePulseDot,
} from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Plus,
  Search,
  CheckCircle2,
  DollarSign,
  CreditCard,
  RefreshCw,
  X,
  ShieldCheck,
  Building2,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Filter,
  ChevronDown,
  Banknote,
} from "lucide-react";

type PaymentStatus = "Paid" | "Partially Paid" | "Pending";

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  dealerName: string;
  amount: number;
  taxableAmount: number;
  gstAmount: number;
  date: string;
  status: PaymentStatus;
}

export default function AdminInvoicesPage() {
  const { orders, recordInvoicePayment } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | PaymentStatus>("all");
  const [selectedInvoice, setSelectedInvoice] = React.useState<InvoiceRecord | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [paymentAmount, setPaymentAmount] = React.useState("");
  const [paymentMode, setPaymentMode] = React.useState("NEFT");
  const [paymentRef, setPaymentRef] = React.useState("");
  const [paymentDone, setPaymentDone] = React.useState(false);
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);

  const invoices: InvoiceRecord[] = orders.map((ord, idx) => ({
    id: `inv-${idx + 1}`,
    invoiceNumber: `PFS-INV-2026-${(890 - idx).toString().padStart(4, "0")}`,
    orderNumber: ord.orderNumber,
    dealerName: ord.dealerName,
    amount: ord.totalAmount,
    taxableAmount: ord.subtotal,
    gstAmount: ord.gstAmount,
    date: ord.createdAt,
    status: ord.paymentStatus as PaymentStatus,
  }));

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.dealerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices.reduce((s, i) => s + i.amount, 0);
  const totalPaid = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter((i) => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);
  const paidCount = invoices.filter((i) => i.status === "Paid").length;

  const handleDownloadPDF = (inv: InvoiceRecord) => {
    setDownloadingId(inv.id);
    setTimeout(() => setDownloadingId(null), 1200);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(paymentAmount) || (selectedInvoice?.amount ?? 0);
    const targetInvNum = selectedInvoice?.invoiceNumber || (invoices[0]?.invoiceNumber ?? "PFS-INV-2026-0890");
    const refCode = paymentRef ? paymentRef : "UTR-AUTO-RECORDED";

    recordInvoicePayment(targetInvNum, amt, paymentMode, refCode);

    setPaymentDone(true);
    setTimeout(() => {
      setPaymentDone(false);
      setIsPaymentModalOpen(false);
      setSelectedInvoice(null);
      setPaymentAmount("");
      setPaymentRef("");
    }, 1200);
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-5">
        {/* ================================================================ */}
        {/* 1. PAGE HEADER                                                    */}
        {/* ================================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Invoices, Quotations & Payments
              </h1>
              <Badge variant="gold" className="rounded-full text-[10px] font-extrabold flex items-center gap-1.5 px-2.5 py-0.5">
                <LivePulseDot color="orange" size="sm" />
                GSTIN Compliant
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Official Tax Invoices, Pro-Forma records, and NEFT/RTGS dealer payment receipts.
            </p>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsPaymentModalOpen(true)}
            className="rounded-xl bg-[#F36E21] hover:bg-[#D95D16] text-white text-xs font-extrabold shadow-xs"
          >
            <CreditCard className="mr-1.5 h-3.5 w-3.5" />
            Record Payment Receipt
          </Button>
        </div>

        {/* ================================================================ */}
        {/* 2. KPI STRIP                                                      */}
        {/* ================================================================ */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: "Total Invoiced",
              value: (totalRevenue / 100000).toFixed(1),
              suffix: "L",
              prefix: "₹",
              icon: DollarSign,
              iconBg: "bg-[#FDF7E7] text-[#9A7007]",
              sub: `${invoices.length} invoices total`,
            },
            {
              label: "Amount Collected",
              value: (totalPaid / 100000).toFixed(1),
              suffix: "L",
              prefix: "₹",
              icon: CheckCircle2,
              iconBg: "bg-emerald-50 text-emerald-700",
              sub: `${paidCount} invoices paid`,
            },
            {
              label: "Outstanding Balance",
              value: (totalPending / 100000).toFixed(1),
              suffix: "L",
              prefix: "₹",
              icon: Clock,
              iconBg: "bg-amber-50 text-amber-700",
              sub: `${invoices.length - paidCount} invoices pending`,
            },
            {
              label: "Collection Rate",
              value: invoices.length > 0 ? ((paidCount / invoices.length) * 100).toFixed(0) : "0",
              suffix: "%",
              prefix: "",
              icon: TrendingUp,
              iconBg: "bg-blue-50 text-blue-600",
              sub: "of invoices settled",
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
                      {kpi.value}
                      {kpi.suffix}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{kpi.sub}</span>
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
        {/* 3. FILTERS & SEARCH                                               */}
        {/* ================================================================ */}
        <div className="flex flex-col md:flex-row gap-2.5 justify-between items-start md:items-center bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          {/* Status filter pills */}
          <div className="flex items-center gap-1.5">
            {(["all", "Paid", "Partially Paid", "Pending"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wide transition-all ${
                  statusFilter === s
                    ? "bg-[#040C1A] text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoice # or dealer…"
              className="h-8 pl-8.5 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* ================================================================ */}
        {/* 4. INVOICES TABLE                                                 */}
        {/* ================================================================ */}
        <Card className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden" padding="none">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/90">
                <TableRow>
                  <TableHead className="font-bold text-slate-800 text-xs">Invoice #</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Order Ref</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Dealer</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Date</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Taxable (₹)</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">GST 18%</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Invoice Total</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Status</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <FileText className="h-8 w-8 text-slate-200" />
                        <span className="text-sm font-semibold">No invoices match your search</span>
                        <span className="text-xs">Try a different invoice number or dealer name</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((inv) => (
                    <TableRow
                      key={inv.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      onClick={() => setSelectedInvoice(inv)}
                    >
                      <TableCell className="font-mono font-bold text-xs text-blue-700">
                        {inv.invoiceNumber}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-slate-600">{inv.orderNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#040C1A] to-[#122238] text-white flex items-center justify-center font-black text-[10px] shrink-0">
                            {inv.dealerName.charAt(0)}
                          </div>
                          <span className="font-semibold text-xs text-slate-900 truncate max-w-[160px]">
                            {inv.dealerName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 font-mono whitespace-nowrap">
                        {new Date(inv.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-slate-600">
                        ₹{inv.taxableAmount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-slate-600">
                        ₹{inv.gstAmount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-right font-mono font-black text-xs text-slate-900">
                        ₹{inv.amount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            inv.status === "Paid"
                              ? "success"
                              : inv.status === "Partially Paid"
                              ? "warning"
                              : "outline"
                          }
                          size="sm"
                          className="rounded-full text-[10px] font-bold"
                        >
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => handleDownloadPDF(inv)}
                            className="h-7 w-7 rounded-lg text-slate-600 hover:bg-slate-100"
                            title="Download PDF Invoice"
                          >
                            {downloadingId === inv.id ? (
                              <RefreshCw className="h-3.5 w-3.5 animate-spin text-slate-400" />
                            ) : (
                              <Download className="h-3.5 w-3.5" />
                            )}
                          </Button>
                          {inv.status !== "Paid" && (
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={() => {
                                setSelectedInvoice(inv);
                                setIsPaymentModalOpen(true);
                              }}
                              className="h-7 w-7 rounded-lg text-emerald-700 hover:bg-emerald-50"
                              title="Record Payment"
                            >
                              <CreditCard className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* ================================================================ */}
        {/* 5. INVOICE DETAIL SLIDE-OVER                                      */}
        {/* ================================================================ */}
        <AnimatePresence>
          {selectedInvoice && !isPaymentModalOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedInvoice(null)}
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="relative z-10 w-full sm:max-w-md bg-white h-screen shadow-2xl flex flex-col border-l border-slate-200"
              >
                {/* Header */}
                <div className="p-5 bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white flex items-center justify-between shrink-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-black">{selectedInvoice.invoiceNumber}</h2>
                      <Badge
                        variant={selectedInvoice.status === "Paid" ? "success" : selectedInvoice.status === "Partially Paid" ? "warning" : "outline"}
                        size="sm"
                        className="text-[10px]"
                      >
                        {selectedInvoice.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">{selectedInvoice.dealerName} · {selectedInvoice.orderNumber}</p>
                  </div>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                  {/* Tax Breakdown */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3">
                    <h4 className="font-extrabold text-slate-900">GST Tax Breakdown</h4>
                    <div className="space-y-2">
                      {[
                        { label: "Taxable Amount (Ex-GST)", value: `₹${selectedInvoice.taxableAmount.toLocaleString("en-IN")}`, bold: false },
                        { label: "CGST @ 9%", value: `₹${(selectedInvoice.gstAmount / 2).toLocaleString("en-IN")}`, bold: false },
                        { label: "SGST @ 9%", value: `₹${(selectedInvoice.gstAmount / 2).toLocaleString("en-IN")}`, bold: false },
                        { label: "Total GST (18%)", value: `₹${selectedInvoice.gstAmount.toLocaleString("en-IN")}`, bold: false },
                        { label: "Invoice Total (Incl. GST)", value: `₹${selectedInvoice.amount.toLocaleString("en-IN")}`, bold: true },
                      ].map((row) => (
                        <div key={row.label} className={`flex justify-between py-1.5 ${row.bold ? "border-t border-slate-200 font-black text-slate-900" : "text-slate-600"}`}>
                          <span>{row.label}</span>
                          <span className="font-mono">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Invoice Date", value: new Date(selectedInvoice.date).toLocaleDateString("en-IN") },
                      { label: "GST Ref", value: "27AAACP9921D1Z5" },
                      { label: "Order Number", value: selectedInvoice.orderNumber },
                      { label: "Payment Terms", value: "Net 30 Days" },
                    ].map((m) => (
                      <div key={m.label} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">{m.label}</span>
                        <span className="font-semibold text-slate-900 block font-mono">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl text-[10px] text-blue-900">
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    All tax totals computed in FastAPI backend — compliant with GST e-invoice standards.
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl text-xs font-bold"
                    onClick={() => handleDownloadPDF(selectedInvoice)}
                  >
                    {downloadingId === selectedInvoice.id ? (
                      <><RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />Generating…</>
                    ) : (
                      <><Download className="mr-1.5 h-3.5 w-3.5" />Download PDF</>
                    )}
                  </Button>
                  {selectedInvoice.status !== "Paid" && (
                    <Button
                      variant="accent"
                      className="flex-1 rounded-xl text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16] text-white"
                      onClick={() => setIsPaymentModalOpen(true)}
                    >
                      <CreditCard className="mr-1.5 h-3.5 w-3.5" />
                      Record Payment
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================================================================ */}
        {/* 6. RECORD PAYMENT MODAL                                           */}
        {/* ================================================================ */}
        <AnimatePresence>
          {isPaymentModalOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setPaymentDone(false);
                }}
                className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-5 bg-gradient-to-r from-[#040C1A] to-[#0A223E] text-white flex items-center justify-between">
                  <div>
                    <h2 className="font-black text-base">Record Payment Receipt</h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {selectedInvoice ? `${selectedInvoice.invoiceNumber} · ₹${selectedInvoice.amount.toLocaleString("en-IN")}` : "Select an invoice"}
                    </p>
                  </div>
                  <button
                    onClick={() => { setIsPaymentModalOpen(false); setPaymentDone(false); }}
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleRecordPayment} className="p-5 space-y-4 text-xs">
                  <div>
                    <label className="font-extrabold text-slate-700 block mb-1">Amount Received (₹) *</label>
                    <Input
                      required
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder={selectedInvoice ? `Full amount: ${selectedInvoice.amount}` : "Enter amount"}
                      className="text-xs rounded-xl h-10 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-extrabold text-slate-700 block mb-1">Payment Mode *</label>
                    <select
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                    >
                      <option>NEFT</option>
                      <option>RTGS</option>
                      <option>IMPS</option>
                      <option>Cheque</option>
                      <option>UPI</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-extrabold text-slate-700 block mb-1">Transaction / UTR Reference *</label>
                    <Input
                      required
                      value={paymentRef}
                      onChange={(e) => setPaymentRef(e.target.value)}
                      placeholder="e.g. NEFT ref: HDFC0012345678"
                      className="text-xs rounded-xl h-10 font-mono"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 rounded-xl text-xs font-bold"
                      onClick={() => { setIsPaymentModalOpen(false); setPaymentDone(false); }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={paymentDone}
                      className="flex-1 rounded-xl text-xs font-extrabold bg-[#F36E21] hover:bg-[#D95D16] text-white"
                    >
                      {paymentDone ? (
                        <><CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />Payment Recorded!</>
                      ) : (
                        <><Banknote className="mr-1.5 h-3.5 w-3.5" />Confirm Payment →</>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </PageTransition>
    </AdminLayout>
  );
}
