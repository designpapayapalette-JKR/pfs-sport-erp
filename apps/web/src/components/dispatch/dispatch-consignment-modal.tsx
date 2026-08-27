"use client";

import * as React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Badge,
  Input,
  Card,
} from "@pfs/ui";
import {
  Truck,
  Package,
  CheckCircle2,
  MapPin,
  Calendar,
  Building,
  Phone,
  User,
  FileCheck,
  Check,
  ExternalLink,
  ShieldCheck,
  FileText,
  Sparkles,
  RefreshCw,
  Clock,
  Send,
  AlertCircle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useERP, DispatchConsignmentPayload } from "@/context/erp-context";
import { OrderRecord, ShipmentRecord } from "@/lib/mock-data";

export interface DispatchConsignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: OrderRecord | null;
  onDispatched?: (shipment: ShipmentRecord) => void;
}

export function DispatchConsignmentModal({
  isOpen,
  onClose,
  order,
  onDispatched,
}: DispatchConsignmentModalProps) {
  const { orders, dispatchOrderConsignment } = useERP();

  // Selected Order state (if not passed as prop, user can select from packed/processing/submitted orders)
  const [selectedOrderId, setSelectedOrderId] = React.useState<string>("");
  const activeOrder: OrderRecord | undefined =
    order || (selectedOrderId ? orders.find((o) => o.id === selectedOrderId) : orders[0]);

  // Helper generators
  const getCarrierPrefix = (c: string) => {
    if (c.includes("Safexpress")) return "SFX";
    if (c.includes("VRL")) return "VRL";
    if (c.includes("Blue Dart")) return "BLU";
    return "TCI";
  };

  const getDefaultEta = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  };

  // Logistics form state
  const [originHub, setOriginHub] = React.useState<string>("Bhiwandi Central Super Hub (MH)");
  const [carrierName, setCarrierName] = React.useState<string>("Safexpress Logistics Ltd");
  const [trackingAwb, setTrackingAwb] = React.useState<string>(() => `${getCarrierPrefix("Safexpress Logistics Ltd")}-${Math.floor(10000000 + Math.random() * 90000000)}`);
  const [eWayBill, setEWayBill] = React.useState<string>(() => `EWB-2026-${Math.floor(10000000 + Math.random() * 90000000)}`);
  const [vehicleNumber, setVehicleNumber] = React.useState<string>("MH-04-EB-8891");
  const [driverName, setDriverName] = React.useState<string>("Ramesh Patil");
  const [driverPhone, setDriverPhone] = React.useState<string>("+91 98191 22345");
  const [etaDate, setEtaDate] = React.useState<string>(getDefaultEta);

  // Consignment checklist state
  const [qcCertificateChecked, setQcCertificateChecked] = React.useState(true);
  const [drumSealsChecked, setDrumSealsChecked] = React.useState(true);
  const [eWayBillPrintChecked, setEWayBillPrintChecked] = React.useState(true);
  const [sendZeptoMail, setSendZeptoMail] = React.useState(true);
  const [sendWhatsApp, setSendWhatsApp] = React.useState(true);

  // Success state
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [dispatchedShipment, setDispatchedShipment] = React.useState<ShipmentRecord | null>(null);

  const handleCarrierChange = (newCarrier: string) => {
    setCarrierName(newCarrier);
    const prefix = getCarrierPrefix(newCarrier);
    setTrackingAwb(`${prefix}-${Math.floor(10000000 + Math.random() * 90000000)}`);
  };

  const handleRegenerateAwb = () => {
    const prefix = getCarrierPrefix(carrierName);
    setTrackingAwb(`${prefix}-${Math.floor(10000000 + Math.random() * 90000000)}`);
  };

  // Calculate estimated total consignment weight & items breakdown
  const packageSummary = React.useMemo(() => {
    if (!activeOrder || !activeOrder.items) {
      return { totalUnits: 18, totalWeightKg: 420, breakdown: "18 Drums PureColor Topcoats & Resurfacers" };
    }
    let drumsCount = 0;
    let cansCount = 0;
    let tilesCount = 0;
    let hardwareCount = 0;

    activeOrder.items.forEach((item) => {
      const name = item.productName.toLowerCase();
      if (name.includes("drum") || name.includes("acrylic") || name.includes("cushion")) {
        drumsCount += Math.max(1, Math.ceil(item.quantity / 250));
      } else if (name.includes("line") || name.includes("paint") || name.includes("can")) {
        cansCount += item.quantity;
      } else if (name.includes("tile") || name.includes("modular")) {
        tilesCount += item.quantity;
      } else {
        hardwareCount += item.quantity;
      }
    });

    const drumWeight = drumsCount * 25; // 25kg per 20L drum
    const canWeight = cansCount * 7;
    const tileWeight = Math.round(tilesCount * 0.4);
    const hardwareWeight = hardwareCount * 22;
    const totalWeightKg = Math.max(80, drumWeight + canWeight + tileWeight + hardwareWeight);

    const parts: string[] = [];
    if (drumsCount > 0) parts.push(`${drumsCount}x 20L Heavy Drums`);
    if (cansCount > 0) parts.push(`${cansCount}x Line Paint Cans`);
    if (tilesCount > 0) parts.push(`${tilesCount} sq ft PP Tiles`);
    if (hardwareCount > 0) parts.push(`${hardwareCount}x Hardware Crates`);

    return {
      totalUnits: Math.max(1, drumsCount + cansCount + Math.ceil(tilesCount / 100) + hardwareCount),
      totalWeightKg,
      breakdown: parts.join(" + ") || "Standard Sports Court Material Pallets",
    };
  }, [activeOrder]);

  const handleSubmitDispatch = () => {
    if (!activeOrder) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const payload: DispatchConsignmentPayload = {
        orderId: activeOrder.id,
        orderNumber: activeOrder.orderNumber,
        dealerName: activeOrder.dealerName,
        carrierName,
        trackingAwb,
        originWarehouse: originHub,
        destinationCity: activeOrder.destinationCity || "Site Delivery Hub",
        estimatedDeliveryDate: etaDate,
        vehicleNumber,
        driverName,
        driverPhone,
        eWayBillNumber: eWayBill,
        packageCount: packageSummary.totalUnits,
        totalWeightKg: packageSummary.totalWeightKg,
        packageBreakdown: packageSummary.breakdown,
        qcInspectionPassed: qcCertificateChecked && drumSealsChecked,
        notes: `E-Way Bill: ${eWayBill} • ZeptoMail Notification Dispatched`,
      };

      const newShipment = dispatchOrderConsignment(payload);
      setDispatchedShipment(newShipment);
      setIsSubmitting(false);
      if (onDispatched) {
        onDispatched(newShipment);
      }
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-start">
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
          />

          {/* Left Slide-over Sheet Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative z-10 w-full sm:max-w-xl md:max-w-2xl bg-white h-screen shadow-2xl flex flex-col border-r border-slate-200 overflow-hidden text-neutral-900"
          >
            {/* Sticky Header Banner */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3.5 pr-4">
                <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20 text-[#E0A925] flex items-center justify-center font-black shadow-inner shrink-0">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                      Dispatch Order Consignment
                    </h2>
                    <Badge variant="gold" size="sm" className="rounded-full text-[10px] font-mono">
                      FastTrack Hub
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Carrier docket assignment, 12-digit GST E-Way bill, and automated webhook tracking.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 shrink-0"
              >
                <X className="h-4.5 w-4.5 stroke-[2.2]" />
                <span className="sr-only">Close Drawer</span>
              </button>
            </div>

            {/* Real-time Consignment Scope & Routing Preview Ribbon */}
            <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-50 border-b border-slate-200/80 shrink-0 text-xs font-mono">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block">Consignment Scope</span>
                <strong className="text-slate-900 font-bold block truncate">
                  {packageSummary.totalUnits} Units (~{packageSummary.totalWeightKg} KG)
                </strong>
              </div>
              <div className="p-2.5 bg-emerald-50/90 rounded-xl border border-emerald-200 shadow-2xs">
                <span className="text-[9px] font-sans font-bold text-emerald-800 uppercase block">Invoiced Value</span>
                <strong className="text-emerald-900 font-black block truncate">
                  ₹{activeOrder?.totalAmount.toLocaleString("en-IN") || "0"}
                </strong>
              </div>
              <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-200 shadow-2xs">
                <span className="text-[9px] font-sans font-bold text-amber-800 uppercase block">Transit Corridor</span>
                <strong className="text-amber-900 font-black block flex items-center gap-1 truncate">
                  <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                  {activeOrder?.destinationCity || "Site Delivery"}
                </strong>
              </div>
            </div>

            {/* Body Content */}
            {dispatchedShipment ? (
              /* Success View */
              <div className="p-8 text-center space-y-6 flex-1 overflow-y-auto">
                <div className="h-16 w-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-widest block">
                    Consignment Dispatched Successfully
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    AWB {dispatchedShipment.trackingAwb} Generated
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Order <strong className="text-slate-900 font-mono">#{dispatchedShipment.orderNumber}</strong> has been handed over to{" "}
                    <strong className="text-slate-900">{dispatchedShipment.carrierName}</strong> at {dispatchedShipment.originWarehouse}.
                  </p>
                </div>

                {/* Telemetry Summary Card */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-sans font-bold uppercase">Carrier</span>
                    <strong className="text-slate-900 font-bold text-xs truncate block">{dispatchedShipment.carrierName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-sans font-bold uppercase">Destination</span>
                    <strong className="text-slate-900 font-bold text-xs truncate block">{dispatchedShipment.destinationCity}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-sans font-bold uppercase">Vehicle / Driver</span>
                    <strong className="text-slate-900 font-bold text-xs truncate block">{dispatchedShipment.vehicleNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-sans font-bold uppercase">Estimated Delivery</span>
                    <strong className="text-emerald-700 font-bold text-xs block">{dispatchedShipment.estimatedDeliveryDate}</strong>
                  </div>
                </div>

                {/* Notification triggers summary */}
                <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs text-emerald-900 text-left space-y-1.5 font-mono">
                  <div className="flex items-center gap-2 font-bold font-sans">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>ZeptoMail Webhook: Automated PDF Delivery Challan emailed to dealer owner.</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold font-sans">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>WhatsApp Notification: Tracking link + Driver contact sent to dealer mobile.</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link href={`/dealer/shipments/${dispatchedShipment.id}`} onClick={onClose}>
                    <Button
                      variant="accent"
                      size="default"
                      className="rounded-xl px-5 font-bold text-xs bg-[#F36E21] hover:bg-[#D95D16] h-10 shadow-md"
                    >
                      <Truck className="mr-1.5 h-4 w-4" /> View Live Transit Timeline →
                    </Button>
                  </Link>
                  <Button variant="outline" size="default" onClick={onClose} className="rounded-xl text-xs font-bold h-10 px-4">
                    Close Drawer
                  </Button>
                </div>
              </div>
            ) : (
              /* Scrollable Configuration Form */
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
                {/* Section 1: Order & Consignee Identity */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-extrabold text-slate-800 block text-xs flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-slate-500" />
                      Consignee &amp; Order Reference
                    </span>

                    {!order && (
                      <select
                        value={selectedOrderId}
                        onChange={(e) => setSelectedOrderId(e.target.value)}
                        className="h-8 rounded-xl border border-slate-300 bg-white px-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                      >
                        {orders.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.orderNumber} — {o.dealerName} (₹{o.totalAmount.toLocaleString("en-IN")})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {activeOrder && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px] bg-white p-3 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">Dealer Company</span>
                        <strong className="text-slate-900 font-bold block truncate">{activeOrder.dealerName}</strong>
                        <span className="text-slate-500 text-[10px] block">{activeOrder.dealerId}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">Destination Site</span>
                        <strong className="text-slate-900 font-bold block">{activeOrder.destinationCity}</strong>
                        <span className="text-slate-500 text-[10px] block truncate">{activeOrder.projectReference}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">Order Value &amp; GST</span>
                        <strong className="text-slate-900 font-bold block">₹{activeOrder.totalAmount.toLocaleString("en-IN")}</strong>
                        <span className="text-emerald-700 text-[10px] block font-bold">18% GST Invoiced</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 2: Routing, Warehouse Hub & Carrier Desk */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3">
                  <span className="font-extrabold text-slate-800 block text-xs flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-slate-500" />
                    Logistics Routing &amp; Carrier Docket
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Origin Hub */}
                    <div>
                      <label className="font-extrabold text-slate-700 block mb-1">
                        Origin Warehouse Super Hub *
                      </label>
                      <select
                        value={originHub}
                        onChange={(e) => setOriginHub(e.target.value)}
                        className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                      >
                        <option>Bhiwandi Central Super Hub (MH) — Gate 4</option>
                        <option>Okhla Industrial Super Hub (Delhi NCR) — Bay 2</option>
                        <option>Peenya Industrial Super Hub (Bengaluru) — Bay 1</option>
                      </select>
                    </div>

                    {/* Carrier Selection */}
                    <div>
                      <label className="font-extrabold text-slate-700 block mb-1">
                        Logistics Carrier Partner *
                      </label>
                      <select
                        value={carrierName}
                        onChange={(e) => handleCarrierChange(e.target.value)}
                        className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                      >
                        <option>Safexpress Logistics Ltd (Surface Express)</option>
                        <option>VRL Logistics Ltd (Heavy Road Freight)</option>
                        <option>Blue Dart Express Ltd (Priority Surface)</option>
                        <option>TCI Freight (Full Truck Load / FTL)</option>
                        <option>PFS Dedicated Factory Container Fleet</option>
                      </select>
                    </div>

                    {/* AWB Docket Input with Auto-Generate */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-extrabold text-slate-700">Carrier AWB / Docket # *</label>
                        <button
                          type="button"
                          onClick={handleRegenerateAwb}
                          className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className="h-3 w-3" /> Auto-Generate
                        </button>
                      </div>
                      <Input
                        value={trackingAwb}
                        onChange={(e) => setTrackingAwb(e.target.value)}
                        placeholder="e.g. SFX-88219441"
                        className="rounded-xl text-xs font-mono bg-white h-10"
                      />
                    </div>

                    {/* Mandatory GST E-Way Bill */}
                    <div>
                      <label className="font-extrabold text-slate-700 block mb-1">
                        GST E-Way Bill Number (12-Digit EWB) *
                      </label>
                      <Input
                        value={eWayBill}
                        onChange={(e) => setEWayBill(e.target.value)}
                        placeholder="e.g. EWB-2026-99182310"
                        className="rounded-xl text-xs font-mono bg-white h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Vehicle & Driver Telemetry */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3">
                  <span className="font-extrabold text-slate-800 block text-xs flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    Vehicle Telemetry &amp; Driver Contacts
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-extrabold text-slate-700 block mb-1">Assigned Vehicle #</label>
                      <Input
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        placeholder="e.g. MH-04-EB-8891"
                        className="rounded-xl text-xs font-mono bg-white h-10"
                      />
                    </div>

                    <div>
                      <label className="font-extrabold text-slate-700 block mb-1">Driver Contact #</label>
                      <Input
                        value={driverPhone}
                        onChange={(e) => setDriverPhone(e.target.value)}
                        placeholder="+91 98191 22345"
                        className="rounded-xl text-xs font-mono bg-white h-10"
                      />
                    </div>

                    <div>
                      <label className="font-extrabold text-slate-700 block mb-1">Estimated Delivery ETA</label>
                      <Input
                        type="date"
                        value={etaDate}
                        onChange={(e) => setEtaDate(e.target.value)}
                        className="rounded-xl text-xs font-mono bg-white h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Quality & Package Checklist */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-800 block text-xs flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                      Quality &amp; Package Verification Checklist
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      Weight: ~{packageSummary.totalWeightKg} kg ({packageSummary.totalUnits} Units)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={qcCertificateChecked}
                        onChange={(e) => setQcCertificateChecked(e.target.checked)}
                        className="rounded border-slate-300 text-[#F36E21]"
                      />
                      <span className="text-slate-800 font-bold">20L Drum Seals Intact &amp; Lot Barcodes Verified</span>
                    </label>
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={eWayBillPrintChecked}
                        onChange={(e) => setEWayBillPrintChecked(e.target.checked)}
                        className="rounded border-slate-300 text-[#F36E21]"
                      />
                      <span className="text-slate-800 font-bold">Tax Invoice &amp; Triplicate E-Way Bill Attached</span>
                    </label>
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-slate-300 text-[#F36E21]"
                      />
                      <span className="text-slate-800 font-bold">Weatherproof Shrink Wrap &amp; Strapping Done</span>
                    </label>
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={drumSealsChecked}
                        onChange={(e) => setDrumSealsChecked(e.target.checked)}
                        className="rounded border-slate-300 text-[#F36E21]"
                      />
                      <span className="text-slate-800 font-bold">Lab COA (Certificate of Analysis) Included</span>
                    </label>
                  </div>
                </div>

                {/* Section 5: Outbox Webhooks */}
                <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 text-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-[#1976D2] font-bold">
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Automated Outbox Notifications &amp; Webhook Integration</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[11px]">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={sendZeptoMail}
                        onChange={(e) => setSendZeptoMail(e.target.checked)}
                        className="rounded border-slate-300 text-[#F36E21]"
                      />
                      <span>Email Delivery Challan PDF via ZeptoMail</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={sendWhatsApp}
                        onChange={(e) => setSendWhatsApp(e.target.checked)}
                        className="rounded border-slate-300 text-[#F36E21]"
                      />
                      <span>Send WhatsApp Dispatch Alert with Tracking Link</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Sticky Action Footer */}
            {!dispatchedShipment && (
              <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                <Button variant="outline" size="sm" onClick={onClose} className="rounded-xl text-xs font-bold px-4 h-10">
                  Cancel
                </Button>

                <Button
                  variant="accent"
                  size="default"
                  onClick={handleSubmitDispatch}
                  disabled={isSubmitting || !trackingAwb || !activeOrder}
                  className="rounded-xl px-6 font-black text-xs bg-[#F36E21] hover:bg-[#D95D16] text-white shadow-md flex items-center gap-2 h-10"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating AWB &amp; Dispatching...
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4" />
                      Confirm Consignment &amp; Dispatch →
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
