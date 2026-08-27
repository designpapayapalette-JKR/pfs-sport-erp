"use client";

import * as React from "react";
import { useERP } from "@/context/erp-context";
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
  Sparkles,
  Bot,
  Copy,
  Check,
  Send,
  ShieldCheck,
  RefreshCw,
  FileText,
  Mail,
  HelpCircle,
} from "lucide-react";

export function AIAssistModal() {
  const { activeAIModal, closeAIModal } = useERP();
  const [copied, setCopied] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isApproved, setIsApproved] = React.useState(false);

  const payload = activeAIModal.payload || {};

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    switch (activeAIModal.type) {
      case "lead_summary":
        return (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2.5 p-3 bg-blue-50/80 rounded-xl border border-blue-200/80 text-slate-800">
              <Sparkles className="h-4.5 w-4.5 text-[#1976D2] shrink-0" />
              <div>
                <span className="font-extrabold text-slate-900">Kimi AI Lead Intelligence Summary</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Synthesized from 3 inbound touchpoints and web inquiry form.
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Key Project Need
                </h4>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  Client is developing a 4-court commercial rooftop pickleball facility in Gurugram. High urgency for delivery within 30 days due to planned October launch.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Recommended Surface Solution
                </h4>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  <strong>PFS Pro Tour 8-Layer Acrylic Cushion System</strong> with Tournament Net Posts and CourtLum 400W LED Lighting Package. Subfloor is a 1-year-old cured concrete slab requiring minor primer resurfacing.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Commercial Opportunity
                </h4>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  Estimated budget band ₹22L - ₹28L. High conversion probability (Score 94). Recommended action: Send official TDS v3.2 and schedule site inspection before Friday.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-100 p-2.5 rounded-xl border border-slate-200/80 font-mono">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span>
                Deterministic guardrail: AI summaries are advisory. Commercial quotes must be finalized via approved rate cards.
              </span>
            </div>
          </div>
        );

      case "email_draft":
        const emailBody = `Subject: PFS Sport — Proposal & Technical Specifications for ${payload.projectName || "Your Pickleball Project"}\n\nDear ${payload.leadName || "Partner"},\n\nThank you for reaching out to PFS Sport regarding your upcoming sports facility development.\n\nBased on your requirement for ${payload.courtCount || 2} court(s), we recommend our ITF/USA Pickleball certified PFS Pro Tour 8-Layer Acrylic Cushion System. This system provides superior shock absorption, tournament-grade pace consistency, and high UV weather resistance.\n\nKey Highlights for Your Project:\n- System: PFS Pro Tour 8-Layer Cushion with SBR Granule Elastic Base\n- Estimated Installation Timeline: 7 - 10 working days\n- Official Warranty: 5 Years Comprehensive Commercial Backing\n- Indicative Budget Range: ₹${(payload.estimatedLow || 520000).toLocaleString("en-IN")} - ₹${(payload.estimatedHigh || 650000).toLocaleString("en-IN")} (Plus 18% GST)\n\nI have attached our technical data sheet (TDS v3.2) and laboratory certifications for your review. Would you be available for a brief call tomorrow afternoon to discuss site readiness?\n\nWarm regards,\n${payload.senderName || "Aakash Mehta"}\nPFS Sport Infrastructure\n+91 98201 44521 | sales@pfs-sport.com`;

        return (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-bold text-slate-900">Commercial Proposal Email Draft</span>
              </div>
              <Badge variant="accent" size="sm" className="rounded-full text-[9px]">
                Ready for Review
              </Badge>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
              {emailBody}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs rounded-xl"
                onClick={() => handleCopy(emailBody)}
              >
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-600" /> Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy Draft
                  </>
                )}
              </Button>

              <Button
                variant={isApproved ? "success" : "accent"}
                size="sm"
                className="text-xs font-bold rounded-xl"
                onClick={() => setIsApproved(true)}
              >
                {isApproved ? (
                  <>
                    <Check className="mr-1.5 h-3.5 w-3.5" /> Queued in Email Outbox
                  </>
                ) : (
                  <>
                    <Send className="mr-1.5 h-3.5 w-3.5" /> Approve & Queue Dispatch
                  </>
                )}
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-6 text-center text-slate-500 text-xs">
            <Bot className="h-8 w-8 mx-auto mb-2 text-slate-400" />
            <p className="font-bold text-slate-800">AI Task Generated</p>
            <p className="text-[11px] text-slate-400 mt-1">Review parameters and execute workflow.</p>
          </div>
        );
    }
  };

  if (!activeAIModal.isOpen) return null;

  return (
    <Dialog open={activeAIModal.isOpen} onOpenChange={closeAIModal}>
      <DialogContent className="max-w-xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#0A2A57] to-[#F36E21] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-black text-slate-900 tracking-tight">
                {activeAIModal.title || "Kimi AI Copilot"}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                PFS Intelligence Engine • Deterministic guardrails applied
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-2">{renderContent()}</div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={closeAIModal} className="rounded-xl text-xs font-bold">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
