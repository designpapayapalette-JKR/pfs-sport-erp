"use client";

import * as React from "react";
import { DealerLayout } from "@/components/layout";
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
} from "@pfs/ui";
import {
  User,
  Crown,
  Building,
  Mail,
  Phone,
  MapPin,
  FileCheck,
  ShieldCheck,
  CreditCard,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function AccountPage() {
  const { currentUser } = useERP();

  return (
    <DealerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Dealer Account & Commercial Terms
              </h1>
              <Badge variant="platinum">{currentUser.dealerTier || "Platinum"} Tier</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Account credentials, verified GSTIN/KYC, credit facility terms, and assigned PFS regional account manager.
            </p>
          </div>
        </div>

        {/* 2-Column Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Organization & KYC (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="p-6 bg-white border border-surfaceBorder shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <CardTitle className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Dealer Organization Profile
                </CardTitle>
                <Badge variant="success">KYC Verified</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-500 block mb-1 font-medium">Legal Entity Name</span>
                  <p className="font-bold text-neutral-900 text-sm">
                    {currentUser.dealerName || "Apex Sports Infrastructure Pvt Ltd"}
                  </p>
                </div>

                <div>
                  <span className="text-neutral-500 block mb-1 font-medium">Dealer ID</span>
                  <p className="font-mono font-bold text-neutral-900 text-sm">
                    {currentUser.dealerId || "DLR-MUM-01"}
                  </p>
                </div>

                <div>
                  <span className="text-neutral-500 block mb-1 font-medium">GSTIN</span>
                  <p className="font-mono font-bold text-neutral-900">27AABCA1234F1Z9</p>
                </div>

                <div>
                  <span className="text-neutral-500 block mb-1 font-medium">PAN Number</span>
                  <p className="font-mono font-bold text-neutral-900">AABCA1234F</p>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-neutral-500 block mb-1 font-medium">Registered Address</span>
                  <p className="text-neutral-800">
                    Showroom 4B, Peninsula Corporate Park, Ganpatrao Kadam Marg, Lower Parel, Mumbai, Maharashtra - 400013
                  </p>
                </div>

                <div>
                  <span className="text-neutral-500 block mb-1 font-medium">Primary Contact</span>
                  <p className="font-bold text-neutral-900">{currentUser.name}</p>
                </div>

                <div>
                  <span className="text-neutral-500 block mb-1 font-medium">Official Email</span>
                  <p className="font-bold text-neutral-900">{currentUser.email}</p>
                </div>
              </div>
            </Card>

            {/* Dealer Staff & Authorized Applicators */}
            <Card className="p-6 bg-white border border-surfaceBorder shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Authorized Dealer Users & Staff (3)
                </CardTitle>
                <Button variant="outline" size="sm" className="text-xs">
                  Invite Staff
                </Button>
              </div>

              <div className="divide-y divide-surfaceBorder text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-neutral-900">Anand Singhania (You)</p>
                    <p className="text-neutral-500">anand@apexsports.in • Primary Owner</p>
                  </div>
                  <Badge variant="gold">Owner</Badge>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-neutral-900">Rohan Sharma</p>
                    <p className="text-neutral-500">rohan.s@apexsports.in • Project Manager</p>
                  </div>
                  <Badge variant="outline">Ordering Staff</Badge>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-neutral-900">Kavita Deshmukh</p>
                    <p className="text-neutral-500">kavita@apexsports.in • Finance & Accounts</p>
                  </div>
                  <Badge variant="outline">Billing Viewer</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Credit Terms & Assigned Sales Manager (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-[#071D3D] text-white border-none shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B9903C] flex items-center gap-1.5">
                  <Crown className="h-4 w-4" />
                  Commercial Credit Terms
                </span>
                <Badge variant="gold">Approved</Badge>
              </div>

              <div>
                <p className="text-xs text-white/70">Sanctioned Credit Limit</p>
                <p className="text-3xl font-black text-white font-mono mt-1">₹25,00,000</p>
                <p className="text-xs text-white/60 mt-0.5">Payment Cycle: 30 Days Net from Dispatch</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
                <div className="flex justify-between text-white/80">
                  <span>Utilized Balance:</span>
                  <span className="font-mono text-amber-300 font-bold">₹8,40,000 (33.6%)</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#006442] h-full rounded-full w-[33.6%]" />
                </div>
                <div className="flex justify-between text-[11px] text-white/60">
                  <span>Available Credit: ₹16,60,000</span>
                  <span>Overdue: ₹0.00</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-lg text-[11px] text-white/70 leading-relaxed flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Tier Wholesale Discount: <strong>25% Off MRP</strong> automatically applied across all acrylic surfacing and modular tile lines.</span>
              </div>
            </Card>

            {/* Dedicated PFS Account Manager */}
            <Card className="p-6 bg-white border border-surfaceBorder shadow-xs space-y-3">
              <CardTitle className="text-sm uppercase tracking-wider text-neutral-500 font-semibold">
                Your Assigned PFS Account Executive
              </CardTitle>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#0A2A57] text-white flex items-center justify-center font-bold text-sm">
                  AM
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">
                    {currentUser.assignedRep?.name || "Aakash Mehta"}
                  </h4>
                  <p className="text-xs text-[#B9903C] font-semibold">Regional Sales Manager (West & South)</p>
                </div>
              </div>

              <div className="pt-2 border-t border-surfaceBorder space-y-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-neutral-400" />
                  <span className="font-mono">{currentUser.assignedRep?.phone || "+91 98201 44521"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-neutral-400" />
                  <span>{currentUser.assignedRep?.email || "aakash.m@pfs-sport.com"}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full text-xs mt-2" asChild>
                <a href={`https://wa.me/919820144521?text=Hi%20Aakash,%20regarding%20our%20PFS%20order...`} target="_blank">
                  Chat on WhatsApp
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DealerLayout>
  );
}
