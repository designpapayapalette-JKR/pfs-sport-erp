"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { PageHeader } from "@/components/layout/page-header";
import { FilterBar } from "@/components/ui/filter-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
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
  Building2,
  Plus,
  Search,
  Crown,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Shield,
  Phone,
  Mail,
  MapPin,
  Check,
  X,
  Sparkles,
  CreditCard,
} from "lucide-react";

interface DealerProfile {
  id: string;
  code: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  tier: "Platinum" | "Gold" | "Silver" | "Registered";
  status: "Approved" | "Pending Review" | "Suspended";
  creditLimit: number;
  creditUsed: number;
  ordersCount: number;
  joinedDate: string;
  gstin: string;
}

const mockDealerProfiles: DealerProfile[] = [
  {
    id: "dlr-1",
    code: "DLR-MUM-01",
    name: "Apex Sports Infrastructure Pvt Ltd",
    ownerName: "Anand Singhania",
    email: "anand@apexsports.in",
    phone: "+91 98201 44521",
    city: "Mumbai",
    state: "Maharashtra",
    tier: "Platinum",
    status: "Approved",
    creditLimit: 2500000,
    creditUsed: 840000,
    ordersCount: 14,
    joinedDate: "12 Jan 2026",
    gstin: "27AABCA1234F1Z9",
  },
  {
    id: "dlr-2",
    code: "DLR-BLR-04",
    name: "Premier Court Builders",
    ownerName: "Suresh Reddy",
    email: "suresh@premiercourts.in",
    phone: "+91 98450 11928",
    city: "Bengaluru",
    state: "Karnataka",
    tier: "Gold",
    status: "Approved",
    creditLimit: 1500000,
    creditUsed: 620000,
    ordersCount: 9,
    joinedDate: "04 Feb 2026",
    gstin: "29AABCU9912D1Z4",
  },
  {
    id: "dlr-3",
    code: "DLR-DEL-08",
    name: "ProTrack Sports Surfaces",
    ownerName: "Gurpreet Singh",
    email: "gurpreet@protracksurfaces.com",
    phone: "+91 99100 88219",
    city: "New Delhi",
    state: "Delhi NCR",
    tier: "Silver",
    status: "Approved",
    creditLimit: 800000,
    creditUsed: 150000,
    ordersCount: 4,
    joinedDate: "19 Feb 2026",
    gstin: "07AAACK4812P1ZL",
  },
  {
    id: "dlr-4",
    code: "DLR-HYD-02",
    name: "Deccan Sports Infra & Turnkey",
    ownerName: "Venkat Rao",
    email: "venkat@deccansports.co.in",
    phone: "+91 97000 33412",
    city: "Hyderabad",
    state: "Telangana",
    tier: "Registered",
    status: "Pending Review",
    creditLimit: 0,
    creditUsed: 0,
    ordersCount: 0,
    joinedDate: "24 Feb 2026",
    gstin: "36AABCD7719K1ZY",
  },
];

export default function DealersAdminPage() {
  const { dealers, approveDealerKYC, updateDealerCredit } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTier, setSelectedTier] = React.useState<string>("All");
  const [selectedDealer, setSelectedDealer] = React.useState<DealerProfile | null>(null);

  const tiers = ["All", "Platinum", "Gold", "Silver", "Registered"];

  const filteredDealers = dealers.filter((d) => {
    const matchesTier = selectedTier === "All" || d.tier === selectedTier;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const handleApproveKYC = (dealerId: string) => {
    approveDealerKYC(dealerId, 2500000);
    setSelectedDealer(null);
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-6">
        {/* Standardized Page Header */}
        <PageHeader
          title="Contracted Dealer Governance"
          description="KYC verification desk, commercial tier classifications (Platinum/Gold/Silver), credit facilities, and regional territory exclusivity."
          badgeText="14 Authorized Dealers"
          badgeVariant="platinum"
          pulseColor="blue"
        />

        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search dealers by company, owner, city, or ID..."
        >
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTier(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedTier === t
                    ? "bg-[#0A2A57] text-white shadow-xs"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </FilterBar>

        {/* Dealers Table */}
        <Card className="bg-white border border-slate-200/80 shadow-xs rounded-2xl overflow-hidden" padding="none">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="font-bold text-slate-800 text-xs">Dealer Entity</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs">Territory</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs">Commercial Tier</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs">Credit Limit & Usage</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs">Status</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDealers.map((dealer) => {
                const creditUtilization = dealer.creditLimit > 0 ? (dealer.creditUsed / dealer.creditLimit) * 100 : 0;

                return (
                  <TableRow key={dealer.id} className="hover:bg-slate-50/60 transition-colors">
                    <TableCell>
                      <p className="font-extrabold text-xs text-slate-900">{dealer.name}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{dealer.ownerName} • {dealer.phone}</p>
                      <span className="font-mono text-[10px] text-slate-400">GSTIN: {dealer.gstin}</span>
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-slate-800">
                      {dealer.city}, {dealer.state}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={dealer.tier === "Platinum" ? "platinum" : dealer.tier === "Gold" ? "gold" : dealer.tier === "Silver" ? "silver" : "outline"}
                        size="sm"
                        className="rounded-full text-[10px]"
                      >
                        {dealer.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-36 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-slate-500">₹{(dealer.creditUsed / 100000).toFixed(1)}L used</span>
                          <span className="font-bold text-slate-800">₹{(dealer.creditLimit / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${creditUtilization > 80 ? "bg-rose-500" : creditUtilization > 50 ? "bg-amber-500" : "bg-emerald-500"}`}
                            style={{ width: `${Math.min(creditUtilization, 100)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={dealer.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs rounded-lg font-bold"
                        onClick={() => setSelectedDealer(dealer)}
                      >
                        KYC Dossier
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredDealers.length === 0 && (
            <EmptyState
              title="No Dealers Found"
              description="No dealer partners matched your search query. Clear search or filters to see all partners."
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchQuery("");
                setSelectedTier("All");
              }}
            />
          )}
        </Card>

        {/* Enterprise Dealer KYC & Credit Governance Left-Side Slide-Over Sheet */}
        <AnimatePresence>
          {selectedDealer && (
            <div className="fixed inset-0 z-[100] flex justify-start">
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedDealer(null)}
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
                {/* Sticky Header Banner */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white flex items-center justify-between border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20 text-[#E0A925] flex items-center justify-center font-black shadow-inner shrink-0">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                          {selectedDealer.name}
                        </h2>
                        <Badge variant={selectedDealer.tier === "Platinum" ? "platinum" : "gold"} className="rounded-full text-[10px] font-bold">
                          {selectedDealer.tier} Partner
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Partner Code: {selectedDealer.code} • Joined {selectedDealer.joinedDate} • {selectedDealer.city}, {selectedDealer.state}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={selectedDealer.status} />
                    <button
                      type="button"
                      onClick={() => setSelectedDealer(null)}
                      className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 ml-1"
                    >
                      <X className="h-4.5 w-4.5 stroke-[2.2]" />
                      <span className="sr-only">Close Drawer</span>
                    </button>
                  </div>
                </div>

                {/* Real-time Commercial Credit Telemetry Preview Ribbon */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-50 border-b border-slate-200/80 shrink-0 text-xs font-mono">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block">Credit Granted</span>
                    <strong className="text-emerald-700 font-bold block truncate">
                      ₹{selectedDealer.creditLimit.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-emerald-50/90 rounded-xl border border-emerald-200 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-emerald-800 uppercase block">Available Limit</span>
                    <strong className="text-emerald-900 font-black block truncate">
                      ₹{(selectedDealer.creditLimit - selectedDealer.creditUsed).toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-200 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-amber-800 uppercase block">Territory Region</span>
                    <strong className="text-amber-900 font-black block flex items-center gap-1 truncate">
                      <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                      {selectedDealer.city}, {selectedDealer.state}
                    </strong>
                  </div>
                </div>

                {/* Scrollable Body */}
                <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5 text-xs">
                  {/* Credit Facility Telemetry Matrix */}
                  <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                        <CreditCard className="h-3.5 w-3.5" />
                        Commercial Credit Facility &amp; Headroom
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {((selectedDealer.creditUsed / Math.max(selectedDealer.creditLimit, 1)) * 100).toFixed(0)}% Utilized
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 font-mono">
                      <div>
                        <span className="text-[10px] font-sans text-slate-400 block uppercase">Credit Granted</span>
                        <strong className="text-emerald-400 font-bold text-sm block">
                          ₹{selectedDealer.creditLimit.toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-sans text-slate-400 block uppercase">Invoiced Balance</span>
                        <strong className="text-[#F36E21] font-bold text-sm block">
                          ₹{selectedDealer.creditUsed.toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-sans text-slate-400 block uppercase">Available Limit</span>
                        <strong className="text-[#E0A925] font-bold text-sm block">
                          ₹{(selectedDealer.creditLimit - selectedDealer.creditUsed).toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-[#F36E21] rounded-full"
                        style={{ width: `${Math.min(100, (selectedDealer.creditUsed / Math.max(selectedDealer.creditLimit, 1)) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Entity & Verification Information */}
                  <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <div className="space-y-1">
                      <span className="text-slate-400 uppercase text-[9px] font-bold block">Authorized Signatory</span>
                      <strong className="font-bold text-slate-900 block">{selectedDealer.ownerName}</strong>
                      <span className="text-[11px] text-slate-600 font-mono block">{selectedDealer.phone}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 uppercase text-[9px] font-bold block">GST Statutory Verification</span>
                      <span className="font-mono font-bold text-slate-900 block">{selectedDealer.gstin}</span>
                      <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Active on GST Portal
                      </span>
                    </div>
                  </div>

                  {/* Statutory KYC Checklist */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                    <span className="font-extrabold text-slate-800 block text-xs">
                      Statutory KYC Verification Documents
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-1.5 text-slate-700 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>GST Certificate</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-1.5 text-slate-700 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>Cancelled Cheque</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-1.5 text-slate-700 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>Territory Deed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                  <Button variant="outline" size="sm" onClick={() => setSelectedDealer(null)} className="rounded-xl text-xs font-bold px-4 h-10">
                    Close Dossier
                  </Button>
                  {selectedDealer.status === "Pending Review" ? (
                    <Button
                      variant="accent"
                      size="default"
                      onClick={() => handleApproveKYC(selectedDealer.id)}
                      className="rounded-xl text-xs font-black bg-[#F36E21] hover:bg-[#D95D16] text-white shadow-md h-10 px-5"
                    >
                      <Check className="mr-1.5 h-4 w-4" /> Approve Dealer &amp; Grant ₹5L Credit
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="default"
                      onClick={() => {
                        const btn = document.activeElement as HTMLButtonElement | null;
                        if (btn) { btn.disabled = true; btn.textContent = "✓ Settings Saved!"; }
                        setTimeout(() => { if (btn) { btn.disabled = false; btn.textContent = "Save Commercial Settings"; } }, 2000);
                      }}
                      className="rounded-xl text-xs font-bold bg-[#040C1A] text-white h-10 px-5"
                    >
                      Save Commercial Settings
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </PageTransition>
    </AdminLayout>
  );
}
