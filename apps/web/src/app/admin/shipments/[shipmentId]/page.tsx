"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AdminLayout } from "@/components/layout/dealer-layout";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
  Truck,
  ArrowLeft,
  CheckCircle2,
  Building,
  MapPin,
  FileCheck,
  Calendar,
  Phone,
  User,
  Download,
  ShieldCheck,
  Package,
  Clock,
  ExternalLink,
  Sparkles,
  QrCode,
  FileText,
  Check,
  RotateCcw,
  Navigation,
  Radio,
  Send,
  X,
} from "lucide-react";

export default function AdminShipmentDetailPage() {
  const params = useParams();
  const rawShipmentId = (params?.shipmentId as string) || "";
  const shipmentId = decodeURIComponent(rawShipmentId);
  const { shipments } = useERP();

  // Active shipment derivation (fallback to first if not found)
  const baseShipment: ShipmentRecord = React.useMemo(() => {
    return (
      shipments.find(
        (s) => s.id === shipmentId || s.shipmentNumber === shipmentId || s.trackingAwb === shipmentId
      ) || shipments[0]
    );
  }, [shipments, shipmentId]);

  const [customTimeline, setCustomTimeline] = React.useState<ShipmentRecord["timeline"] | null>(null);
  const [customStatus, setCustomStatus] = React.useState<ShipmentRecord["status"] | null>(null);
  const [isPodModalOpen, setIsPodModalOpen] = React.useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = React.useState(false);
  const [activeDocTitle, setActiveDocTitle] = React.useState("");
  const [simulatedProgress, setSimulatedProgress] = React.useState(false);

  const activeShipment: ShipmentRecord = React.useMemo(() => {
    return {
      ...baseShipment,
      ...(customStatus ? { status: customStatus } : {}),
      ...(customTimeline ? { timeline: customTimeline } : {}),
    };
  }, [baseShipment, customStatus, customTimeline]);

  const completedCount = activeShipment.timeline.filter((t) => t.completed).length;
  const isDelivered = activeShipment.status === "delivered" || completedCount === activeShipment.timeline.length;

  const handleSimulateNextMilestone = () => {
    const nextTimeline = activeShipment.timeline.map((step) => {
      if (!step.completed) {
        return {
          ...step,
          completed: true,
          current: true,
          timestamp: "Just now (GPS Ping Verified)",
        };
      }
      return { ...step, current: false };
    });

    const allCompleted = nextTimeline.every((t) => t.completed);

    setCustomTimeline(nextTimeline);
    if (allCompleted) {
      setCustomStatus("delivered");
    } else {
      setCustomStatus("in_transit");
    }

    setSimulatedProgress(true);
    setTimeout(() => setSimulatedProgress(false), 2500);
  };

  const handleOpenDoc = (title: string) => {
    setActiveDocTitle(title);
    setIsDocModalOpen(true);
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Navigation & Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            href="/admin/shipments"
            className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-primary transition-colors bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs w-fit"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Logistics Control
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSimulateNextMilestone}
              className="rounded-xl text-xs font-bold bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs h-9 flex items-center gap-1.5"
            >
              <RotateCcw className={`h-3.5 w-3.5 text-[#F36E21] ${simulatedProgress ? "animate-spin" : ""}`} />
              Simulate GPS Checkpoint Ping
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsPodModalOpen(true)}
              className="rounded-xl text-xs font-bold bg-[#040C1A] text-white shadow-xs h-9 flex items-center gap-1.5"
            >
              <FileCheck className="h-3.5 w-3.5 text-[#E0A925]" />
              View Proof of Delivery (POD)
            </Button>
          </div>
        </div>

        {/* Live GPS Telemetry Command Header */}
        <div className="rounded-3xl bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#F36E21]/20 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute left-1/3 top-0 w-64 h-64 bg-[#E0A925]/15 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-mono text-[10px] font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE GPS SAT-COMM TELEMETRY ACTIVE
                  </div>
                  <Badge variant={isDelivered ? "default" : "accent"} size="sm" className="font-mono text-[10px] uppercase">
                    {activeShipment.status.replace(/_/g, " ")}
                  </Badge>
                  <span className="text-slate-300 text-xs font-mono">
                    Order Ref: <strong className="text-white">{activeShipment.orderNumber}</strong>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono flex items-center gap-3">
                  {activeShipment.shipmentNumber}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Carrier: <strong className="text-white">{activeShipment.carrierName}</strong> • AWB Docket:{" "}
                  <span className="font-mono font-bold text-[#E0A925]">{activeShipment.trackingAwb}</span> • Dispatched from {activeShipment.originWarehouse}
                </p>
              </div>

              {/* Delivery ETA Card */}
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-left md:text-right min-w-[200px] shrink-0 space-y-1">
                <span className="text-[10px] text-slate-300 uppercase font-sans font-bold block tracking-wider">
                  Target Site Delivery
                </span>
                <strong className="text-xl font-black text-white font-mono block text-emerald-400">
                  {activeShipment.estimatedDeliveryDate}
                </strong>
                <span className="text-[11px] text-slate-300 block">
                  To: <strong className="text-white">{activeShipment.destinationCity}</strong>
                </span>
              </div>
            </div>

            {/* 4-Node Real-time Corridor Progression Stepper */}
            <div className="pt-4 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-left font-mono">
                {(
                  [
                    {
                      label: "1. Hub Gate-Out",
                      location: activeShipment.originWarehouse,
                      status: "QC Inspected & Barcoded",
                      isDone: completedCount >= 1,
                      isCurrent: completedCount === 1,
                    },
                    {
                      label: "2. Linehaul Corridor",
                      location: "Express Highway Checkpoint",
                      status: "In Transit with GPS Telemetry",
                      isDone: completedCount >= 2,
                      isCurrent: completedCount === 2,
                    },
                    {
                      label: "3. Regional Offloading Bay",
                      location: `${activeShipment.destinationCity} Inward Hub`,
                      status: "Local Crew Assigned",
                      isDone: completedCount >= 3,
                      isCurrent: completedCount === 3,
                    },
                    {
                      label: "4. Jobsite Delivery",
                      location: `${activeShipment.destinationCity} Site`,
                      status: "POD Verification",
                      isDone: completedCount >= 4,
                      isCurrent: completedCount >= 4,
                    },
                  ] as const
                ).map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border transition-all ${
                      step.isCurrent
                        ? "bg-[#F36E21]/20 border-[#F36E21] text-white shadow-lg"
                        : step.isDone
                        ? "bg-white/10 border-emerald-400/40 text-emerald-200"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                      <span className="uppercase tracking-wider">{step.label}</span>
                      {step.isDone ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      ) : step.isCurrent ? (
                        <Radio className="h-3.5 w-3.5 text-[#F36E21] animate-pulse" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-slate-500" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-white truncate">{step.location}</p>
                    <p className="text-[10px] text-slate-300 truncate mt-0.5">{step.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: 7 Columns Timeline + 5 Columns Dossier & Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Transit Log (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Checkpoint Log Card */}
            <Card className="p-6 bg-white border border-slate-200/90 shadow-xs rounded-3xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 text-[#1976D2] flex items-center justify-center font-bold">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-black text-slate-900">
                      Live Transit Log &amp; Checkpoints
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Automated carrier milestones, toll gate scans, and verified inspector sign-offs.
                    </CardDescription>
                  </div>
                </div>

                <Badge variant="gold" size="sm" className="font-mono text-[10px] font-bold">
                  {completedCount} of {activeShipment.timeline.length} Milestones
                </Badge>
              </div>

              {/* Vertical Stepper */}
              <div className="space-y-6 relative pl-7 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {activeShipment.timeline.map((event, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-7 top-1 h-6 w-6 rounded-full border-2 border-white flex items-center justify-center shadow-xs transition-all ${
                        event.completed
                          ? "bg-[#006442] text-white"
                          : event.current
                          ? "bg-[#F36E21] text-white animate-pulse scale-110"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {event.completed ? (
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      ) : (
                        <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                      )}
                    </div>

                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        event.current
                          ? "bg-amber-50/70 border-amber-300/80 shadow-xs"
                          : event.completed
                          ? "bg-slate-50/80 border-slate-200/90"
                          : "bg-white border-slate-200/60 opacity-60"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                          {event.title}
                          {event.current && (
                            <span className="px-2 py-0.5 rounded-full bg-[#F36E21] text-white text-[9px] font-mono uppercase font-bold">
                              Current Hub
                            </span>
                          )}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">{event.timestamp}</span>
                      </div>

                      <p className="text-xs text-slate-700 font-semibold mt-1.5 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{event.location}</span>
                      </p>

                      <p className="text-xs text-slate-500 mt-1 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100 mt-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Vehicle & Telemetry Details Card */}
            <Card className="p-6 bg-white border border-slate-200/90 shadow-xs rounded-3xl space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="h-9 w-9 rounded-2xl bg-amber-50 text-[#B9903C] flex items-center justify-center font-bold">
                  <Truck className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Vehicle &amp; Carrier Telemetry</h4>
                  <p className="text-xs text-slate-500">Dedicated freight road transport parameters.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block">Vehicle Plate</span>
                  <strong className="text-slate-900 font-bold block">{activeShipment.vehicleNumber || "MH-04-EB-8891"}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block">Driver Contact</span>
                  <strong className="text-slate-900 font-bold block truncate">{activeShipment.driverPhone || "+91 98191 22345"}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block">Carrier SLA</span>
                  <strong className="text-emerald-700 font-bold block">Surface Express</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block">GPS Frequency</span>
                  <strong className="text-primary font-bold block">15 Min Telemetry</strong>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Consignment Dossier & Document Vault (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Consignment Regulatory Summary Card */}
            <Card className="p-6 bg-white border border-slate-200/90 shadow-xs rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Regulatory &amp; Commercial Dossier
                </span>
                <Badge variant="platinum" size="sm" className="font-mono text-[9px]">
                  GST Statutory Verified
                </Badge>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between items-center font-mono">
                  <span className="text-slate-500 font-sans">GST E-Way Bill:</span>
                  <strong className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                    {activeShipment.eWayBillNumber || "EWB-2026-88192014"}
                  </strong>
                </div>

                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-500">Consignee Dealer:</span>
                  <strong className="text-slate-900 font-bold truncate max-w-[180px] text-right">
                    {activeShipment.dealerName}
                  </strong>
                </div>

                <div className="py-2.5 flex justify-between items-center font-mono">
                  <span className="text-slate-500 font-sans">Dispatch Date:</span>
                  <span className="text-slate-800">{activeShipment.dispatchDate}</span>
                </div>

                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-500">Origin Super Hub:</span>
                  <strong className="text-slate-900 font-semibold">{activeShipment.originWarehouse}</strong>
                </div>

                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-500">Destination Site:</span>
                  <strong className="text-slate-900 font-semibold">{activeShipment.destinationCity}</strong>
                </div>

                <div className="py-2.5 flex justify-between items-center font-mono">
                  <span className="text-slate-500 font-sans">Gross Pallet Weight:</span>
                  <strong className="text-slate-900 font-bold">~{activeShipment.totalWeightKg || 420} KG ({activeShipment.packageCount || 18} Units)</strong>
                </div>
              </div>

              {/* 4-Point Quality Inspection Summary */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-sans uppercase font-bold text-slate-500 block">
                  Statutory Hub Quality Check
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Drum Seals Intact</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Lab COA Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Shrink Wrap Strapped</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Triplicate Tax Invoice</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Official Documents Vault Card */}
            <Card className="p-6 bg-white border border-slate-200/90 shadow-xs rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-primary" />
                  Shipment Document Vault
                </span>
                <span className="text-[10px] font-mono text-slate-400">4 PDF Files Ready</span>
              </div>

              <div className="space-y-2">
                {[
                  { title: "GST E-Way Bill (EWB-01 Certificate)", desc: "12-digit statutory road freight permit", tag: "Statutory" },
                  { title: "Delivery Challan (Triplicate Copy)", desc: "Material movement & gate pass clearance", tag: "Verified" },
                  { title: "Lab Certificate of Analysis (COA)", desc: "Batch viscosity, density & elongation test", tag: "QC Passed" },
                  { title: "Carrier Consignment Note (L/R Copy)", desc: "Safexpress Surface SLA terms & AWB", tag: "Carrier" },
                ].map((doc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOpenDoc(doc.title)}
                    className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 flex items-center justify-between transition-all text-left group active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary shrink-0 shadow-2xs group-hover:text-[#F36E21]">
                        <FileCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block group-hover:text-primary">
                          {doc.title}
                        </span>
                        <span className="text-[10px] text-slate-500 block">{doc.desc}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" size="sm" className="text-[9px] font-mono">
                        {doc.tag}
                      </Badge>
                      <Download className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary" />
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* 24/7 Logistics Dispatch Hotline Card */}
            <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-3 shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 w-48 h-48 bg-[#F36E21]/20 blur-3xl pointer-events-none rounded-full" />
              <p className="text-xs font-bold uppercase tracking-wider text-[#E0A925] flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                24/7 Central Logistics Dispatch Desk
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                For site crane coordination, gate offloading clearance, or direct driver contact:
              </p>
              <div className="p-3 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-white">+91 (22) 6902-8800</span>
                <span className="text-amber-300 text-[10px]">Dispatch Bay 4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Proof of Delivery (POD) Viewer Modal */}
        <Dialog open={isPodModalOpen} onOpenChange={setIsPodModalOpen}>
          <DialogContent className="max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-900">
            <DialogHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="text-base font-black text-slate-900">
                    Proof of Delivery (POD) &amp; Material Sign-Off
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500">
                    Digitally countersigned delivery acknowledgement from jobsite engineer.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 py-3 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="font-sans text-slate-500">Shipment Number:</span>
                  <strong className="text-slate-900">{activeShipment.shipmentNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-slate-500">AWB Docket:</span>
                  <strong className="text-slate-900">{activeShipment.trackingAwb}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-slate-500">Site Receiver Name:</span>
                  <strong className="text-slate-900 font-sans">{activeShipment.podSignedBy || "Ramesh Pawar (Site Engineer, Apex Sports)"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-slate-500">Delivery Status:</span>
                  <strong className="text-emerald-700 font-sans font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    {isDelivered ? "Delivered & Inspected" : "Scheduled on Arrival"}
                  </strong>
                </div>
              </div>

              {/* Digital Signature Stamp */}
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-white text-center space-y-2">
                <span className="text-[10px] font-sans text-slate-400 uppercase font-bold block">
                  Digital Timestamp &amp; Carrier Seal
                </span>
                <div className="font-serif italic text-lg text-slate-800 py-2">
                  {activeShipment.podSignedBy || "Ramesh Pawar (Site Engineer)"}
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
                  <QrCode className="h-3.5 w-3.5 text-slate-500" />
                  <span>SHA256: 8f82a901bc448e920d3f821</span>
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-slate-100 pt-4 flex flex-row items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => setIsPodModalOpen(false)} className="rounded-xl text-xs font-bold">
                Close
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={() => {
                  alert(`Downloading official countersigned POD for ${activeShipment.shipmentNumber}`);
                  setIsPodModalOpen(false);
                }}
                className="rounded-xl text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16] text-white"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" /> Download Verified POD PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Document Vault Viewer Modal */}
        <Dialog open={isDocModalOpen} onOpenChange={setIsDocModalOpen}>
          <DialogContent className="max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-900">
            <DialogHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-100 text-[#1976D2] flex items-center justify-center font-bold shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="text-base font-black text-slate-900">
                    {activeDocTitle}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500">
                    Official verified PDF document for {activeShipment.shipmentNumber}.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="py-6 text-center space-y-3">
              <div className="h-16 w-16 rounded-3xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto shadow-inner">
                <FileCheck className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                This document is generated by PFS ERP Central Invoicing with GST E-Way Bill cryptographic seal.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 text-xs font-mono max-w-sm mx-auto text-slate-700">
                <span>File: {activeDocTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}.pdf</span>
              </div>
            </div>

            <DialogFooter className="border-t border-slate-100 pt-4 flex flex-row items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => setIsDocModalOpen(false)} className="rounded-xl text-xs font-bold">
                Close
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={() => {
                  alert(`Downloading ${activeDocTitle}`);
                  setIsDocModalOpen(false);
                }}
                className="rounded-xl text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16] text-white"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" /> Download PDF File
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageTransition>
    </AdminLayout>
  );
}
