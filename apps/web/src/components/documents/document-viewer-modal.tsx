"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Badge,
} from "@pfs/ui";
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Truck,
  Award,
  QrCode,
  Sparkles,
  X,
  Share2,
  Mail,
} from "lucide-react";

export type DocumentType = "tax_invoice" | "lab_coa" | "eway_bill" | "tds_spec";

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType?: DocumentType;
  orderNumber?: string;
  recipientName?: string;
  destinationCity?: string;
  grossAmount?: number;
  shipmentId?: string;
}

export function DocumentViewerModal({
  isOpen,
  onClose,
  documentType = "tax_invoice",
  orderNumber = "PFS-ORD-2026-089",
  recipientName = "Apex Sports Infrastructure Pvt Ltd",
  destinationCity = "Pune, Maharashtra",
  grossAmount = 1450000,
  shipmentId = "SHP-2026-044",
}: DocumentViewerModalProps) {
  const [activeTab, setActiveTab] = React.useState<DocumentType>(documentType);

  React.useEffect(() => {
    if (documentType) {
      setActiveTab(documentType);
    }
  }, [documentType]);

  const handlePrint = () => {
    window.print();
  };

  const gstAmount = Math.round(grossAmount * 0.18);
  const taxableAmount = grossAmount - gstAmount;
  const cgst = Math.round(gstAmount / 2);
  const sgst = Math.round(gstAmount / 2);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[92vh] flex flex-col p-0 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl text-slate-900">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/20 text-[#E0A925] flex items-center justify-center font-black shadow-inner shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base font-black text-white">
                  PFS Statutory Document &amp; Compliance Vault
                </DialogTitle>
                <Badge variant="gold" size="sm" className="font-mono text-[9px]">
                  Cryptographically Sealed
                </Badge>
              </div>
              <DialogDescription className="text-xs text-slate-300">
                Official GST Tax Invoices, ITF Laboratory COA Test Certificates &amp; E-Way Bills.
              </DialogDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Document Selector Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-100/80 border-b border-slate-200 overflow-x-auto shrink-0 text-xs font-bold">
          {[
            { id: "tax_invoice", label: "GST Tax Invoice (INV-01)", icon: FileText },
            { id: "lab_coa", label: "ITF Lab COA Test Certificate", icon: Award },
            { id: "eway_bill", label: "GST E-Way Bill (EWB-01)", icon: Truck },
            { id: "tds_spec", label: "PFS Pro Tour 8-Layer TDS", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as DocumentType)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#F36E21]" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Printable Document Canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-100/50 print:p-0 print:bg-white">
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm print:border-none print:shadow-none space-y-6 text-xs text-slate-800 font-sans">
            
            {/* DOCUMENT 1: TAX INVOICE */}
            {activeTab === "tax_invoice" && (
              <div className="space-y-6">
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b-2 border-slate-900 pb-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">TAX INVOICE</h2>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                      (ORIGINAL FOR RECIPIENT — TRIPLY CERTIFIED)
                    </span>
                    <div className="mt-2 space-y-0.5 text-[11px] text-slate-600">
                      <strong className="text-slate-900 font-bold block">PFS SPORTS INFRASTRUCTURE PVT. LTD.</strong>
                      <p>Plot 42, Bhiwandi Logistics Industrial Corridor, Sector 4</p>
                      <p>Thane / Mumbai, Maharashtra – 421302, India</p>
                      <p className="font-mono">
                        GSTIN: <strong>27AABCP1129K1Z4</strong> • State Code: <strong>27 (Maharashtra)</strong>
                      </p>
                      <p className="font-mono">CIN: U36999MH2026PTC109822 • PAN: AABCP1129K</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-right space-y-1 font-mono text-[11px] shrink-0">
                    <div>Invoice No: <strong className="text-slate-900">INV-2026-{orderNumber.slice(-4)}</strong></div>
                    <div>Invoice Date: <strong className="text-slate-900">27-Aug-2026</strong></div>
                    <div>Order Ref: <strong className="text-slate-900">{orderNumber}</strong></div>
                    <div>E-Way Bill: <strong className="text-emerald-700">EWB-2026-88192014</strong></div>
                    <div>Dispatch Date: <strong>27-Aug-2026 (14:30 IST)</strong></div>
                  </div>
                </div>

                {/* Billed To / Consignee */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px]">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Billed To (Customer):</span>
                    <strong className="text-slate-900 font-black block text-xs">{recipientName}</strong>
                    <p className="text-slate-600">Site Address: DLF CyberCity Club, Golf Course Extension Rd</p>
                    <p className="text-slate-600">{destinationCity}</p>
                    <p className="font-mono mt-1 text-slate-700">GSTIN: <strong>27AAACA9921M1Z5</strong> (Active)</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Shipped / Consigned To:</span>
                    <strong className="text-slate-900 font-bold block text-xs">{recipientName} Project Site</strong>
                    <p className="text-slate-600">Unloading Bay #2, Tennis &amp; Pickleball Complex</p>
                    <p className="text-slate-600">{destinationCity}</p>
                    <p className="font-mono mt-1 text-slate-700">Place of Supply: <strong>27-Maharashtra</strong></p>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-900 text-white font-mono text-[10px] uppercase">
                      <tr>
                        <th className="p-2.5">#</th>
                        <th className="p-2.5">Product System &amp; Batch No</th>
                        <th className="p-2.5">HSN Code</th>
                        <th className="p-2.5 text-right">Qty (Drums)</th>
                        <th className="p-2.5 text-right">Rate (₹)</th>
                        <th className="p-2.5 text-right">Taxable Amt (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-[11px] font-mono">
                      <tr>
                        <td className="p-2.5">1</td>
                        <td className="p-2.5 font-sans">
                          <strong className="text-slate-900 block font-bold">PFS Pro Tour Resurfacer (Batch #BHW-2026-881)</strong>
                          <span className="text-[10px] text-slate-500">20L Drum • Concentrated Acrylic Binder with Silica Sand</span>
                        </td>
                        <td className="p-2.5">32089020</td>
                        <td className="p-2.5 text-right font-bold">14 Drums</td>
                        <td className="p-2.5 text-right">₹6,800.00</td>
                        <td className="p-2.5 text-right font-bold">₹95,200.00</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">2</td>
                        <td className="p-2.5 font-sans">
                          <strong className="text-slate-900 block font-bold">PFS Pro Tour Cushion Coat (Batch #BHW-2026-882)</strong>
                          <span className="text-[10px] text-slate-500">20L Drum • Micro-cellular Elastomeric Cushion</span>
                        </td>
                        <td className="p-2.5">32089020</td>
                        <td className="p-2.5 text-right font-bold">28 Drums</td>
                        <td className="p-2.5 text-right">₹8,400.00</td>
                        <td className="p-2.5 text-right font-bold">₹235,200.00</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">3</td>
                        <td className="p-2.5 font-sans">
                          <strong className="text-slate-900 block font-bold">PFS Pro Color Topcoat (Stadium Blue &amp; Lime Green)</strong>
                          <span className="text-[10px] text-slate-500">20L Drum • ITF Class 3 Certified Pure Acrylic Emulsion</span>
                        </td>
                        <td className="p-2.5">32089020</td>
                        <td className="p-2.5 text-right font-bold">42 Drums</td>
                        <td className="p-2.5 text-right">₹9,200.00</td>
                        <td className="p-2.5 text-right font-bold">₹386,400.00</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">4</td>
                        <td className="p-2.5 font-sans">
                          <strong className="text-slate-900 block font-bold">PFS Regulation Textured White Line Paint</strong>
                          <span className="text-[10px] text-slate-500">5L Pack • High-Tack Optical Reflective Line Marking</span>
                        </td>
                        <td className="p-2.5">32089020</td>
                        <td className="p-2.5 text-right font-bold">6 Cans</td>
                        <td className="p-2.5 text-right">₹3,400.00</td>
                        <td className="p-2.5 text-right font-bold">₹20,400.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tax Breakdown & Total Ribbon */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <QrCode className="h-10 w-10 text-slate-900 shrink-0" />
                      <div className="text-[9px] font-mono leading-tight text-slate-500">
                        <strong>IRN:</strong> 9a8c7b6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b<br />
                        <strong>Signed QR:</strong> NIC GST Portal Authenticated<br />
                        <strong>Reverse Charge:</strong> No (Direct Forward Charge)
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                      Amount in words: Rupees Fourteen Lakh Fifty Thousand Only
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 font-mono text-xs text-right">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Taxable Value:</span>
                      <strong className="text-slate-900">₹{taxableAmount.toLocaleString("en-IN")}.00</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Central GST (CGST 9%):</span>
                      <strong className="text-slate-900">₹{cgst.toLocaleString("en-IN")}.00</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">State GST (SGST 9%):</span>
                      <strong className="text-slate-900">₹{sgst.toLocaleString("en-IN")}.00</strong>
                    </div>
                    <div className="flex justify-between pt-2 border-t-2 border-slate-900 text-sm font-black">
                      <span>Total Invoice Amount:</span>
                      <span className="text-emerald-700">₹{grossAmount.toLocaleString("en-IN")}.00</span>
                    </div>
                  </div>
                </div>

                {/* Signatory Footer */}
                <div className="flex items-end justify-between pt-4 border-t border-slate-200 text-[10px] text-slate-500">
                  <div>
                    <p>1. Certified that particulars given above are true and correct.</p>
                    <p>2. Subject to Thane/Mumbai Jurisdiction only.</p>
                  </div>
                  <div className="text-right space-y-6">
                    <p className="font-bold text-slate-800">For PFS SPORTS INFRASTRUCTURE PVT LTD</p>
                    <p className="font-mono text-slate-400">[ Digitally Signed by Authorized Signatory ]</p>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENT 2: LAB COA */}
            {activeTab === "lab_coa" && (
              <div className="space-y-6">
                <div className="border-b-2 border-emerald-800 pb-4 flex justify-between items-start">
                  <div>
                    <Badge variant="gold" size="sm" className="font-mono text-[9px] mb-1">
                      NABL ACCREDITED LAB #TC-8891
                    </Badge>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      CERTIFICATE OF ANALYSIS (COA)
                    </h2>
                    <p className="text-xs text-slate-600">
                      Product System: <strong>PFS Pro Tour 8-Layer Acrylic System</strong> (Batch #BHW-2026-881)
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                    <Award className="h-6 w-6" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px]">
                  <div>Tested Date: <strong>26-Aug-2026</strong></div>
                  <div>Sample Size: <strong>5 Liters / Drum Lot</strong></div>
                  <div>Standard: <strong>ITF Class 3 (Medium Pace)</strong></div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead className="bg-slate-900 text-white text-[10px] uppercase">
                      <tr>
                        <th className="p-2.5">Test Parameter</th>
                        <th className="p-2.5">Standard Method</th>
                        <th className="p-2.5">Specified Range</th>
                        <th className="p-2.5 text-right">Measured Result</th>
                        <th className="p-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-900">ITF Surface Pace Rating (CPR)</td>
                        <td className="p-2.5">ITF CS 01/02</td>
                        <td className="p-2.5">30 – 35 (Class 3 Medium)</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">33.4 CPR</td>
                        <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-900">Tensile Adhesion to Concrete</td>
                        <td className="p-2.5">ASTM D4541</td>
                        <td className="p-2.5">&gt; 1.5 MPa</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">2.18 MPa</td>
                        <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-900">Taber Abrasion Resistance</td>
                        <td className="p-2.5">ASTM D4060 (CS-17, 1000g)</td>
                        <td className="p-2.5">&lt; 80 mg loss</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">42 mg loss</td>
                        <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-900">UV Accelerated Weathering</td>
                        <td className="p-2.5">ASTM G154 (2000 hours)</td>
                        <td className="p-2.5">Delta E &lt; 1.0 (No chalking)</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">Delta E = 0.28</td>
                        <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-900">Pendulum Skid Resistance (Wet)</td>
                        <td className="p-2.5">EN 13036-4</td>
                        <td className="p-2.5">55 – 70 PTV</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">62 PTV</td>
                        <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0" />
                    <span>Batch #BHW-2026-881 complies with 100% International Tennis Federation Class 3 specifications.</span>
                  </div>
                  <strong className="font-mono text-emerald-900 font-bold uppercase">QA APPROVED</strong>
                </div>
              </div>
            )}

            {/* DOCUMENT 3: GST E-WAY BILL */}
            {activeTab === "eway_bill" && (
              <div className="space-y-6">
                <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">e-Way Bill System</h2>
                    <span className="text-xs font-mono font-bold text-slate-500">Government of India — GST EWB-01</span>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <div>e-Way Bill No: <strong className="text-slate-900">2410 8819 2014</strong></div>
                    <div>Generated Date: <strong>27/08/2026 14:32</strong></div>
                    <div>Valid Until: <strong className="text-emerald-700">29/08/2026 23:59</strong></div>
                  </div>
                </div>

                {/* Part A & Part B */}
                <div className="space-y-3">
                  <h4 className="font-black text-slate-900 uppercase text-[11px] tracking-wider">PART-A (Consignment Details)</h4>
                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px]">
                    <div>GSTIN of Supplier: <strong>27AABCP1129K1Z4</strong> (PFS Sports)</div>
                    <div>GSTIN of Recipient: <strong>27AAACA9921M1Z5</strong> (Apex Sports)</div>
                    <div>Place of Delivery: <strong>Pune, Maharashtra (411045)</strong></div>
                    <div>Document No &amp; Date: <strong>INV-2026-089 / 27-08-2026</strong></div>
                    <div>Value of Goods: <strong>₹14,50,000.00</strong></div>
                    <div>HSN Code: <strong>32089020 (84 Drums)</strong></div>
                  </div>

                  <h4 className="font-black text-slate-900 uppercase text-[11px] tracking-wider pt-2">PART-B (Vehicle &amp; Transporter)</h4>
                  <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px]">
                    <div>Mode: <strong>1 - Road</strong></div>
                    <div>Vehicle No: <strong className="text-emerald-700">MH-04-GP-8819</strong></div>
                    <div>Transporter: <strong>BlueDart Express Hub</strong></div>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENT 4: TDS SPEC SHEET */}
            {activeTab === "tds_spec" && (
              <div className="space-y-5">
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">TECHNICAL DATA SHEET (TDS)</h2>
                    <p className="text-xs text-slate-600 font-bold">PFS Pro Tour 8-Layer Cushion Acrylic Surfacing System</p>
                  </div>
                  <Badge variant="gold" size="sm" className="font-mono text-[9px]">ITF Class 3 Certified</Badge>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  PFS Pro Tour is a high-performance, multi-layered acrylic system engineered for tournament-level tennis and pickleball facilities. Formulated with 100% pure acrylic resins, selected silica aggregates, and elastomeric micro-cushion polymers to provide superior ball bounce uniformity, UV resistance, and joint impact protection.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">System Build &amp; Application:</strong>
                    <p>• Layer 1-2: PFS Acrylic Concrete Primer &amp; Resurfacer (2 coats)</p>
                    <p>• Layer 3-5: PFS Elastomeric Cushion Matrix (3 coats)</p>
                    <p>• Layer 6-7: PFS ITF Class 3 Pure Color Topcoat (2 coats)</p>
                    <p>• Layer 8: PFS Optic-White Regulation Line Paint (1 coat)</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">Performance Specs:</strong>
                    <p>• Total System Thickness: <strong>2.8 mm – 3.2 mm</strong></p>
                    <p>• Elongation at Break: <strong>140%</strong></p>
                    <p>• Warranty: <strong>5-Year Complete Commercial Warranty</strong></p>
                    <p>• Temperature Range: <strong>-10°C to +55°C (Tropicalized)</strong></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-row items-center justify-between shrink-0">
          <Button variant="outline" size="sm" onClick={onClose} className="rounded-xl text-xs font-bold">
            Close
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="rounded-xl text-xs font-bold border-slate-300"
            >
              <Printer className="mr-1.5 h-3.5 w-3.5 text-slate-600" />
              Print Document
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => {
                alert(`Downloaded official ${activeTab.toUpperCase()} PDF.`);
              }}
              className="rounded-xl text-xs font-black bg-[#F36E21] hover:bg-[#D95D16] text-white"
            >
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Download Official PDF
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
