"use client";

import * as React from "react";
import Link from "next/link";
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
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  Send,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Lock,
} from "lucide-react";

import { useERP } from "@/context/erp-context";
import { CRMLead } from "@/lib/mock-data";

export default function PublicLeadFormPage() {
  const { createLead } = useERP();
  const [fullName, setFullName] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [city, setCity] = React.useState("");
  const [sport, setSport] = React.useState("Pickleball");
  const [courts, setCourts] = React.useState(2);
  const [projectType, setProjectType] = React.useState("Sports Club / Resort");
  const [budget, setBudget] = React.useState("₹15L - ₹35L");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLead({
      fullName: fullName || "Project Inquirer",
      organization: organization || "Private Facility",
      phone: phone || "+91 98201 44521",
      email: email || "inquiry@pfs.sport",
      city: city || "Mumbai",
      state: "Maharashtra",
      sportInterest: (sport as CRMLead["sportInterest"]) || "Pickleball",
      courtCount: courts,
      projectType: (projectType as CRMLead["projectType"]) || "Sports Club / Resort",
      budgetBand: (budget as CRMLead["budgetBand"]) || "₹15L - ₹35L",
      timeline: "Immediate (< 30 days)",
      stage: "New",
      scoreBand: "Hot",
      assignedTo: "Siddharth Verma (Regional Lead)",
      leadNumber: `LEAD-2026-${Math.floor(100 + Math.random() * 900)}`,
      nextFollowUpDue: "Today",
      slaBreach: false,
    });
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-neutral-900 flex flex-col justify-between">
      {/* Public Header */}
      <header className="h-16 border-b border-surfaceBorder bg-white px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0A2A57] to-[#F36E21] p-0.5 shadow flex items-center justify-center font-bold text-white text-xs">
            PFS
          </div>
          <span className="font-bold text-base text-neutral-900 tracking-wide">PFS SPORT</span>
        </div>

        <Link href="/login">
          <Button variant="outline" size="sm" className="text-xs">
            Dealer Portal Sign In →
          </Button>
        </Link>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 w-full">
        <div className="text-center mb-8">
          <Badge variant="gold" className="mb-2">Official Surface Consultation</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Build Your Championship Sports Court
          </h1>
          <p className="text-sm text-neutral-600 mt-2 max-w-xl mx-auto">
            Get an indicative turnkey budgetary estimate and connect with authorized certified PFS applicators in your region.
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white border border-surfaceBorder shadow-md">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
              <h2 className="text-xl font-bold text-neutral-900">Inquiry Received Successfully!</h2>
              <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your project for <strong>{courts} {sport} court(s)</strong> at <strong>{organization || city}</strong> has been routed to our regional technical sales team. We will reach out within 2 hours.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)} className="rounded-xl text-xs">
                  Submit Another Inquiry
                </Button>
                <Link href="/admin/leads">
                  <Button variant="accent" size="sm" className="rounded-xl text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16] text-white">
                    View in CRM Pipeline (Live Demo) →
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Your Full Name *</label>
                  <Input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Ramesh Mehra" />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Club / Society / Company *</label>
                  <Input required value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="e.g. Green Valley Club" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Contact Phone (WhatsApp) *</label>
                  <Input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98200 12345" />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Email Address *</label>
                  <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Project City / State *</label>
                  <Input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Pune, Maharashtra" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-surfaceBorder">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Sport Surface Required</label>
                  <select
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="w-full h-10 rounded-lg border border-surfaceBorder bg-surface px-2.5 text-xs text-neutral-900"
                  >
                    <option value="Pickleball">Pickleball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Padel">Padel</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Basketball">Basketball</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Number of Courts</label>
                  <Input type="number" min="1" max="20" value={courts} onChange={(e) => setCourts(Number(e.target.value))} />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Project Type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full h-10 rounded-lg border border-surfaceBorder bg-surface px-2.5 text-xs text-neutral-900"
                  >
                    <option value="Sports Club / Resort">Sports Club / Resort</option>
                    <option value="Housing Society / RWA">Housing Society / RWA</option>
                    <option value="School / College">School / College</option>
                    <option value="Commercial Pay & Play">Commercial Pay & Play</option>
                    <option value="Private Villa Residence">Private Villa Residence</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="accent" className="w-full h-11 text-sm font-semibold">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Inquiry for Official Budget Estimate
                </Button>
              </div>

              <p className="text-[11px] text-neutral-400 text-center pt-2 flex items-center justify-center gap-1.5">
                <Lock className="h-3 w-3 text-neutral-400" />
                <span>Your contact information is kept strictly confidential and used solely for technical court advisory.</span>
              </p>
            </form>
          )}
        </Card>
      </main>

      {/* Footer */}
      <footer className="h-12 border-t border-surfaceBorder bg-white px-6 flex items-center justify-between text-xs text-neutral-500">
        <span>© 2026 PFS Sport Infrastructure Pvt Ltd. All rights reserved.</span>
        <span>ITF, BWF, USA Pickleball & FIBA Compliant Systems</span>
      </footer>
    </div>
  );
}
