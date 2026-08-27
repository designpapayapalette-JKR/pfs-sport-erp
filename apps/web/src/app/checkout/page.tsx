"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StorefrontHeader } from "@/components/storefront/storefront-header";
import { StorefrontFooter } from "@/components/storefront/storefront-footer";
import { useERP } from "@/context/erp-context";
import { OrderRecord } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Input } from "@pfs/ui";
import { PageTransition, LivePulseDot, AnimatedNumber } from "@/components/motion";
import {
  CreditCard,
  Building2,
  Truck,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ShoppingCart,
  FileCheck,
  AlertCircle,
  Clock,
  Sparkles,
  Printer,
  Download,
  Tag,
  Check,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, createOrderFromCart, currentUser, addToCart, products } = useERP();

  // Form Fields
  const [fullName, setFullName] = React.useState(currentUser.name || "Anand Singhania");
  const [companyName, setCompanyName] = React.useState(currentUser.dealerName || "Apex Sports Infrastructure");
  const [email, setEmail] = React.useState(currentUser.email || "anand@apexsports.in");
  const [phone, setPhone] = React.useState("+91 98201 44521");
  const [gstin, setGstin] = React.useState("27AABCA1234F1Z9");
  const [shippingAddress, setShippingAddress] = React.useState("Plot 42, Pune Sports Complex, Hinjawadi Phase 2");
  const [city, setCity] = React.useState("Pune");
  const [state, setState] = React.useState("Maharashtra");
  const [pincode, setPincode] = React.useState("411057");
  const [projectRef, setProjectRef] = React.useState("Pune Club 2x Tournament Courts");
  const [paymentMethod, setPaymentMethod] = React.useState<"credit" | "online" | "neft">("credit");

  // Promo / Sample Box Voucher
  const [voucherCode, setVoucherCode] = React.useState("");
  const [appliedDiscount, setAppliedDiscount] = React.useState(0);
  const [voucherApplied, setVoucherApplied] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [confirmedOrder, setConfirmedOrder] = React.useState<OrderRecord | null>(null);

  const discountedSubtotal = Math.max(0, cartSubtotal - appliedDiscount);
  const cartGst = Math.round(discountedSubtotal * 0.18);
  const cartTotal = discountedSubtotal + cartGst;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherCode.toUpperCase().trim() === "SWATCH999" || voucherCode.toUpperCase().trim() === "SAMPLE999") {
      setAppliedDiscount(999);
      setVoucherApplied(true);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrderFromCart(
        paymentMethod === "credit" ? "30 Days Net Credit" : "100% Advance",
        `${city}, ${state}`,
        projectRef
      );
      setConfirmedOrder(order);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col selection:bg-[#F36E21] selection:text-white font-sans">
      <StorefrontHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <PageTransition className="space-y-6">
          {/* Checkout Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Commercial Checkout & Purchase Order Ingestion
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Factory direct dispatch with verified GST e-invoice and ERP inventory reservation.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>256-Bit SSL Encrypted ERP Pipeline</span>
            </div>
          </div>

          {confirmedOrder ? (
            /* Order Placed Success View */
            <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <Badge variant="success" size="lg" className="rounded-full font-bold">
                  Order Successfully Ingested into ERP
                </Badge>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Purchase Order Confirmed!
                </h2>
                <p className="text-sm text-slate-500 font-mono">
                  Official Purchase Order: <strong className="text-primary font-bold">{confirmedOrder.orderNumber}</strong>
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Materials reserved and confirmed. Our logistics officer will generate the carrier dispatch waybill and notify you via WhatsApp &amp; Email.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs max-w-md mx-auto space-y-3 text-xs text-left">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-bold text-slate-900">{confirmedOrder.destinationCity}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Billing Terms:</span>
                  <span className="font-bold text-slate-900">{confirmedOrder.paymentTerms}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm text-slate-900">
                  <span>Grand Total (18% GST):</span>
                  <span className="font-mono text-emerald-700">₹{confirmedOrder.totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link href="/dealer/orders">
                  <Button variant="accent" size="lg" className="rounded-xl font-bold text-xs bg-[#F36E21] hover:bg-[#D95D16] shadow-xs">
                    Track Consignment in ERP Desk →
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" size="lg" className="rounded-xl font-bold text-xs">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Checkout 2-Column Form */
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Customer Details & Shipping (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Customer & Company Meta */}
                <Card className="p-6 bg-white border border-slate-200/80 shadow-xs rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <span className="h-6 w-6 rounded-full bg-[#040C1A] text-white flex items-center justify-center text-xs font-bold font-mono">
                      1
                    </span>
                    <h3 className="font-black text-sm text-slate-900">
                      Company & Billing Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Full Contact Name *</label>
                      <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required className="rounded-xl text-xs" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Company / Club Name *</label>
                      <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="rounded-xl text-xs" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Email Address (for Verified Invoices) *</label>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-xl text-xs" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Phone Number (for Dispatch SMS/WA) *</label>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} required className="rounded-xl text-xs" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">
                        GSTIN Number (for 18% Input Tax Credit)
                      </label>
                      <Input value={gstin} onChange={(e) => setGstin(e.target.value)} placeholder="e.g. 27AABCA1234F1Z9" className="rounded-xl text-xs font-mono" />
                    </div>
                  </div>
                </Card>

                {/* 2. Delivery & Project Site */}
                <Card className="p-6 bg-white border border-slate-200/80 shadow-xs rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <span className="h-6 w-6 rounded-full bg-[#040C1A] text-white flex items-center justify-center text-xs font-bold font-mono">
                      2
                    </span>
                    <h3 className="font-black text-sm text-slate-900">
                      Court Project Reference & Destination Site
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Project Identifier Reference *</label>
                      <Input value={projectRef} onChange={(e) => setProjectRef(e.target.value)} placeholder="e.g. Pune Sports Club 2x Court Upgrade" required className="rounded-xl text-xs" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Site Delivery Address (Unloading Point) *</label>
                      <Input value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} required className="rounded-xl text-xs" />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">City *</label>
                        <Input value={city} onChange={(e) => setCity(e.target.value)} required className="rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">State *</label>
                        <Input value={state} onChange={(e) => setState(e.target.value)} required className="rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Pincode *</label>
                        <Input value={pincode} onChange={(e) => setPincode(e.target.value)} required className="rounded-xl text-xs font-mono" />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 3. Payment & Credit Selection */}
                <Card className="p-6 bg-white border border-slate-200/80 shadow-xs rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <span className="h-6 w-6 rounded-full bg-[#040C1A] text-white flex items-center justify-center text-xs font-bold font-mono">
                      3
                    </span>
                    <h3 className="font-black text-sm text-slate-900">
                      Payment Terms & Settlement
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <label
                      onClick={() => setPaymentMethod("credit")}
                      className={`p-3.5 rounded-2xl border flex items-start justify-between cursor-pointer transition-all ${
                        paymentMethod === "credit"
                          ? "border-primary bg-blue-50/50 ring-2 ring-primary/20"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">B2B Approved Net Credit (30 Days)</span>
                          <Badge variant="platinum" size="sm" className="rounded-full text-[9px]">
                            Recommended
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Billed against authorized dealer credit line (₹25L Headroom available).
                        </p>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === "credit"}
                        onChange={() => setPaymentMethod("credit")}
                        className="mt-1"
                      />
                    </label>

                    <label
                      onClick={() => setPaymentMethod("online")}
                      className={`p-3.5 rounded-2xl border flex items-start justify-between cursor-pointer transition-all ${
                        paymentMethod === "online"
                          ? "border-primary bg-blue-50/50 ring-2 ring-primary/20"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">Online Instant Transfer (Razorpay / UPI / NetBanking)</span>
                          <Badge variant="success" size="sm" className="rounded-full text-[9px]">
                            Immediate Dispatch
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Instant transaction confirmation & automated GST tax invoice dispatch.
                        </p>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                        className="mt-1"
                      />
                    </label>

                    <label
                      onClick={() => setPaymentMethod("neft")}
                      className={`p-3.5 rounded-2xl border flex items-start justify-between cursor-pointer transition-all ${
                        paymentMethod === "neft"
                          ? "border-primary bg-blue-50/50 ring-2 ring-primary/20"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900">Pro-Forma Invoice (NEFT / RTGS Bank Transfer)</span>
                        <p className="text-[11px] text-slate-500">
                          Download pro-forma invoice with PFS Sport bank details for corporate wire.
                        </p>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === "neft"}
                        onChange={() => setPaymentMethod("neft")}
                        className="mt-1"
                      />
                    </label>
                  </div>
                </Card>
              </div>

              {/* Right Column: Order Summary & Pinned Total (5 Cols) */}
              <div className="lg:col-span-5 space-y-4 sticky top-24">
                <Card className="bg-gradient-to-br from-[#040C1A] via-[#091C36] to-[#0D2240] text-white border border-white/10 shadow-xl rounded-3xl overflow-hidden">
                  <div className="px-6 py-4 bg-black/30 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-black text-sm text-white">Consignment Summary</h3>
                    <Badge variant="gold" className="rounded-full font-bold text-xs">
                      {cart.reduce((s, i) => s + i.quantity, 0)} Items
                    </Badge>
                  </div>

                  <CardContent className="p-6 space-y-4 text-xs">
                    {/* Cart Item Strip */}
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex justify-between items-start pb-2 border-b border-white/10 text-white/90"
                        >
                          <div>
                            <p className="font-bold text-xs leading-snug">{item.product.name}</p>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Qty: {item.quantity.toLocaleString()} {item.product.category === "Accessories" ? "units" : "sq ft"}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-white">
                            ₹{(item.product.platinumPrice * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}

                      {cart.length === 0 && (
                        <div className="text-center py-4 space-y-2.5">
                          <p className="text-xs text-slate-400">Your cart is currently empty.</p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addToCart(products[0] || {
                              id: "pfs-ac-01",
                              name: "PFS Pro Tour 8-Layer Acrylic Cushion System",
                              sku: "PFS-AC-PRO-8",
                              category: "Surface Systems",
                              sports: ["Pickleball", "Tennis"],
                              mrpInr: 185,
                              platinumPrice: 138.75,
                              goldPrice: 148,
                              silverPrice: 157.25,
                              stockOnHands: 14500,
                              leadTimeDays: 2,
                              thicknessMm: 4.5,
                              systemType: "8-Layer Acrylic Cushion",
                              certification: "ITF Category 4 Medium-Fast",
                              images: ["/assets/products/acrylic-cushion.jpg"],
                              specifications: {
                                application: "Squeegee Applied 8-Layer System",
                                coverage: "1,800 sq ft per standard court",
                                origin: "Bhiwandi Super Hub, Maharashtra",
                              }
                            }, 1800)}
                            className="text-xs font-bold rounded-xl bg-white/10 text-white border-white/20 hover:bg-white/20"
                          >
                            + Load Sample 8-Layer Court Kit (Demo)
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Voucher Code Box */}
                    <div className="pt-2 border-t border-white/10">
                      {voucherApplied ? (
                        <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs flex items-center justify-between">
                          <span className="font-mono font-bold">Swatch Box Voucher Applied (-₹999)</span>
                          <Check className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            placeholder="Voucher Code (e.g. SWATCH999)"
                            className="h-8 text-xs bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl"
                          />
                          <Button
                            type="button"
                            onClick={handleApplyVoucher}
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-xl text-[11px] border-white/20 text-white hover:bg-white/10"
                          >
                            Apply
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Financial Calculations */}
                    <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-white/80">
                      <div className="flex justify-between">
                        <span>Materials Subtotal:</span>
                        <span className="font-mono text-white font-bold">
                          ₹{cartSubtotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                      {appliedDiscount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Sample Box Credit:</span>
                          <span className="font-mono font-bold">-₹{appliedDiscount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Statutory GST (18%):</span>
                        <span className="font-mono text-white font-bold">
                          ₹{cartGst.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Export Freight:</span>
                        <span className="font-mono text-emerald-400 font-bold">
                          Calculated on Dispatch
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                        <span>Grand Total:</span>
                        <span className="font-mono text-[#E0A925] text-lg">
                          ₹{cartTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      disabled={isSubmitting || cart.length === 0}
                      className="w-full h-12 rounded-2xl bg-[#F36E21] hover:bg-[#D95D16] text-xs font-black shadow-lg shadow-orange-600/30 mt-2"
                    >
                      {isSubmitting ? (
                        <>Submitting Order to ERP Desk...</>
                      ) : (
                        <>
                          <span>Confirm & Submit Purchase Order</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </form>
          )}
        </PageTransition>
      </main>

      <StorefrontFooter />
    </div>
  );
}
