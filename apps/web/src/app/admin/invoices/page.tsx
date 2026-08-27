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
  Input,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@pfs/ui";
import {
  FileText,
  Download,
  Plus,
  Search,
  CheckCircle2,
  DollarSign,
  CreditCard,
} from "lucide-react";

export default function AdminInvoicesPage() {
  const { orders } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");

  const invoices = orders.map((ord, idx) => ({
    id: `inv-${idx + 1}`,
    invoiceNumber: `PFS-INV-2026-${(890 - idx).toString().padStart(4, "0")}`,
    orderNumber: ord.orderNumber,
    dealerName: ord.dealerName,
    amount: ord.totalAmount,
    taxableAmount: ord.subtotal,
    gstAmount: ord.gstAmount,
    date: ord.createdAt,
    status: ord.paymentStatus,
  }));

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.dealerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Invoices, Quotations & Payment Records
              </h1>
              <Badge variant="gold">GSTIN Compliant Invoicing</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Official Tax Invoices, Pro-Forma records, and recorded NEFT/RTGS dealer payment receipts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={() => alert("Payment receipt recorded.")}
            >
              <CreditCard className="mr-1.5 h-4 w-4" />
              Record Payment Receipt
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-end">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Invoice # or Dealer..."
              className="pl-9 text-xs"
            />
          </div>
        </div>

        {/* Invoices Table */}
        <Card className="bg-white border border-surfaceBorder shadow-xs overflow-hidden" padding="none">
          <Table>
            <TableHeader className="bg-neutral-50/80">
              <TableRow>
                <TableHead className="font-bold text-neutral-800">Invoice #</TableHead>
                <TableHead className="font-bold text-neutral-800">Order Reference</TableHead>
                <TableHead className="font-bold text-neutral-800">Dealer Account</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Taxable (₹)</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">GST 18% (₹)</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Invoice Total (₹)</TableHead>
                <TableHead className="font-bold text-neutral-800">Payment</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">PDF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((inv) => (
                <TableRow key={inv.id} className="hover:bg-neutral-50/60">
                  <TableCell className="font-mono font-bold text-xs text-primary">
                    {inv.invoiceNumber}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-neutral-700">
                    {inv.orderNumber}
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-neutral-900">
                    {inv.dealerName}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-neutral-600">
                    ₹{inv.taxableAmount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-neutral-600">
                    ₹{inv.gstAmount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-xs text-neutral-900">
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
                    >
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-primary"
                      onClick={() => alert(`Invoice ${inv.invoiceNumber} PDF downloaded.`)}
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
}
