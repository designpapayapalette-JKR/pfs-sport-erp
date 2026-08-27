"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useERP } from "@/context/erp-context";
import { Badge, Button } from "@pfs/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Crown,
  Users,
  Building2,
  Package,
  PhoneCall,
  Sparkles,
  Zap,
  FileText,
  Truck,
  RotateCcw,
  Sliders,
  ChevronUp,
  ChevronDown,
  X,
  Search,
  CheckCircle2,
  Radio,
} from "lucide-react";
import { DocumentViewerModal } from "@/components/documents/document-viewer-modal";

export function DemoHUD() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    currentUser,
    setCurrentUserRole,
    isAdmin,
    isDealer,
    createLead,
    triggerAICall,
    setIsSearchOpen,
  } = useERP();

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = React.useState(false);
  const [hudFeedback, setHudFeedback] = React.useState<string | null>(null);

  const showFeedback = (text: string) => {
    setHudFeedback(text);
    setTimeout(() => setHudFeedback(null), 2500);
  };

  const handleRoleSelect = (roleKey: string) => {
    setCurrentUserRole(roleKey);
    if (roleKey.startsWith("dealer")) {
      router.push("/dealer/dashboard");
      showFeedback(`Switched to ${roleKey === "dealer_platinum" ? "Platinum Dealer (Apex Sports)" : "Gold Dealer (Bangalore Courts)"}`);
    } else {
      router.push("/admin/dashboard");
      showFeedback(`Switched to Super Admin ERP`);
    }
  };

  const handleSimulateLead = () => {
    createLead({
      leadNumber: `LEAD-2026-${Math.floor(100 + Math.random() * 899)}`,
      fullName: "Col. Vikramaditya Rathore",
      phone: "+91 98201 55432",
      email: "secretary@mumbai-gymkhana.com",
      organization: "Bombay Gymkhana Club",
      courtCount: 4,
      sportInterest: "Pickleball",
      projectType: "Sports Club / Resort",
      budgetBand: "₹15L - ₹35L",
      timeline: "Immediate (< 30 days)",
      stage: "Qualified",
      scoreBand: "Hot",
      city: "Mumbai",
      state: "Maharashtra",
      assignedTo: "Siddharth Verma",
      nextFollowUpDue: "Tomorrow 11:00 AM",
      slaBreach: false,
    });
    showFeedback("Inbound Hot Lead Created: Bombay Gymkhana Club (4 Courts)");
  };

  const handleSimulateCall = () => {
    triggerAICall(
      "Col. Vikramaditya Rathore",
      "+91 98201 55432",
      "Lead Qualification",
      "Bombay Gymkhana Club"
    );
    showFeedback("AI Voice Agent Triggered — Connected with Bombay Gymkhana Club");
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end print:hidden">
        {/* Toast Feedback Ribbon */}
        <AnimatePresence>
          {hudFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              className="mb-2 px-3.5 py-2 rounded-2xl bg-slate-950 text-white text-xs font-bold shadow-xl border border-white/20 flex items-center gap-2 backdrop-blur-xl"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{hudFeedback}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              className="w-84 sm:w-96 mb-3 p-4 bg-slate-900/95 backdrop-blur-2xl text-white rounded-3xl border border-white/15 shadow-2xl space-y-4 text-xs"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-xl bg-[#F36E21] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    <Sliders className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-white">Interactive Demo HUD</h3>
                    <span className="text-[10px] text-slate-400 font-mono">Live ERP Persona Switcher</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Persona Selector */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono uppercase font-bold text-amber-400 block tracking-wider">
                  Select User Persona
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("dealer_platinum")}
                    className={`p-2.5 rounded-2xl text-left transition-all border ${
                      isDealer && currentUser.dealerTier === "Platinum"
                        ? "bg-[#E0A925]/20 border-[#E0A925] text-white font-bold"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <Crown className="h-3.5 w-3.5 text-[#E0A925] mb-1" />
                    <span className="font-black text-xs block">Platinum Dealer</span>
                    <span className="text-[10px] text-slate-400 block">Apex Sports (₹25L Credit)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("dealer_gold")}
                    className={`p-2.5 rounded-2xl text-left transition-all border ${
                      isDealer && currentUser.dealerTier === "Gold"
                        ? "bg-amber-400/20 border-amber-400 text-white font-bold"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <Building2 className="h-3.5 w-3.5 text-amber-400 mb-1" />
                    <span className="font-black text-xs block">Gold Dealer</span>
                    <span className="text-[10px] text-slate-400 block">Bangalore Courts (₹12L)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("super_admin")}
                    className={`p-2.5 rounded-2xl text-left transition-all border ${
                      currentUser.role === "super_admin"
                        ? "bg-blue-500/20 border-blue-400 text-white font-bold"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <Shield className="h-3.5 w-3.5 text-blue-400 mb-1" />
                    <span className="font-black text-xs block">Super Admin</span>
                    <span className="text-[10px] text-slate-400 block">Full Operations &amp; P&amp;L</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("sales_manager")}
                    className={`p-2.5 rounded-2xl text-left transition-all border ${
                      currentUser.role === "sales_manager"
                        ? "bg-emerald-500/20 border-emerald-400 text-white font-bold"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <Users className="h-3.5 w-3.5 text-emerald-400 mb-1" />
                    <span className="font-black text-xs block">Sales Manager</span>
                    <span className="text-[10px] text-slate-400 block">CRM Pipeline &amp; Quotes</span>
                  </button>
                </div>
              </div>

              {/* Instant Simulator Triggers */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono uppercase font-bold text-amber-400 block tracking-wider">
                  Instant Simulation Triggers
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleSimulateLead}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-left font-bold text-[11px] text-slate-200 transition-all flex items-center gap-1.5"
                  >
                    <Zap className="h-3 w-3 text-amber-400" />
                    <span>+ Inbound Lead</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulateCall}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-left font-bold text-[11px] text-slate-200 transition-all flex items-center gap-1.5"
                  >
                    <PhoneCall className="h-3 w-3 text-emerald-400" />
                    <span>AI Voice Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsDocModalOpen(true)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-left font-bold text-[11px] text-slate-200 transition-all flex items-center gap-1.5"
                  >
                    <FileText className="h-3 w-3 text-blue-400" />
                    <span>Tax Invoice / COA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsExpanded(false);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-left font-bold text-[11px] text-slate-200 transition-all flex items-center gap-1.5"
                  >
                    <Search className="h-3 w-3 text-purple-400" />
                    <span>Search (Cmd+K)</span>
                  </button>
                </div>
              </div>

              {/* Status Footer */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Vercel Edge Live
                </span>
                <span>GST E-Way v1.04</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed Pill Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 text-white hover:bg-slate-950 border border-white/20 shadow-2xl backdrop-blur-xl transition-all active:scale-95 group font-bold text-xs"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[#E0A925] font-mono text-[11px]">
            {isDealer
              ? `Dealer: ${currentUser.dealerTier?.toUpperCase()}`
              : currentUser.role === "super_admin"
              ? "Super Admin"
              : "Sales Mgr"}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-white text-[11px] font-bold flex items-center gap-1">
            Demo HUD
            {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </span>
        </button>
      </div>

      {/* Statutory Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
      />
    </>
  );
}
