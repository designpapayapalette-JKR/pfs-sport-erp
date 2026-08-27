"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
import {
  AICallRecord,
  WhatsAppThread,
  WhatsAppMessage,
  EmailRecord,
  CommunicationTriggerRule,
} from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Input,
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
  Phone,
  PhoneCall,
  PhoneForwarded,
  MessageSquare,
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  User,
  Building,
  FileText,
  FileCheck,
  Search,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Bot,
  Check,
  Download,
  Paperclip,
  ExternalLink,
  ShieldCheck,
  Radio,
  Sliders,
  ChevronRight,
  X,
  Volume2,
  FileDown,
  CornerDownRight,
  TrendingUp,
  AlertTriangle,
  Flame,
} from "lucide-react";

export default function AdminCommunicationsPage() {
  const {
    aiCalls,
    triggerAICall,
    whatsappThreads,
    sendWhatsAppMessage,
    toggleThreadAiBot,
    emails,
    sendEmail,
    communicationTriggers,
    toggleCommunicationTrigger,
  } = useERP();

  const [activeTab, setActiveTab] = React.useState<"ai_calls" | "whatsapp" | "email" | "triggers">("ai_calls");

  // AI Voice State
  const [selectedCall, setSelectedCall] = React.useState<AICallRecord | null>(null);
  const [isSimulateCallDrawerOpen, setIsSimulateCallDrawerOpen] = React.useState(false);
  const [callLeadName, setCallLeadName] = React.useState("Rohan Singhal");
  const [callLeadPhone, setCallLeadPhone] = React.useState("+91 98110 44821");
  const [callLeadOrg, setCallLeadOrg] = React.useState("DLF CyberCity Club");
  const [callCampaignType, setCallCampaignType] = React.useState<AICallRecord["campaignType"]>("Lead Qualification");
  const [isCallingActive, setIsCallingActive] = React.useState(false);
  const [liveCallTranscript, setLiveCallTranscript] = React.useState<{ speaker: string; text: string }[]>([]);

  // WhatsApp State
  const [selectedThreadId, setSelectedThreadId] = React.useState<string>(whatsappThreads[0]?.id || "");
  const [chatSearch, setChatSearch] = React.useState("");
  const [outgoingText, setOutgoingText] = React.useState("");
  const [quickTemplate, setQuickTemplate] = React.useState("");

  // Email State
  const [selectedEmail, setSelectedEmail] = React.useState<EmailRecord | null>(null);
  const [isComposeEmailModalOpen, setIsComposeEmailModalOpen] = React.useState(false);
  const [emailRecipient, setEmailRecipient] = React.useState("rohan.singhal@dlf.in");
  const [emailName, setEmailName] = React.useState("Rohan Singhal");
  const [emailSubject, setEmailSubject] = React.useState("PFS Sport — Technical Proposal & ITF Class 3 Specifications");
  const [emailCategory, setEmailCategory] = React.useState<EmailRecord["templateCategory"]>("Technical Dossier");
  const [emailBody, setEmailBody] = React.useState(
    "Thank you for speaking with our AI Technical Desk. Attached please find the complete 8-Layer specification, ITF Class 3 pace certification, and formal turnkey estimate for 4 courts."
  );

  const activeThread = whatsappThreads.find((t) => t.id === selectedThreadId) || whatsappThreads[0];

  const filteredThreads = whatsappThreads.filter(
    (t) =>
      t.contactName.toLowerCase().includes(chatSearch.toLowerCase()) ||
      t.organization.toLowerCase().includes(chatSearch.toLowerCase()) ||
      t.phone.includes(chatSearch)
  );

  // Browser Speech Synthesis Engine for realistic AI Voice
  const speakVoiceLine = (text: string, isAI: boolean = true) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = isAI ? 1.05 : 0.98;
        utterance.pitch = isAI ? 1.08 : 0.92;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback gracefully
      }
    }
  };

  // Handle Simulated Live Outbound Call
  const handleStartSimulatedCall = () => {
    setIsCallingActive(true);
    setLiveCallTranscript([
      { speaker: "AI Voice Agent", text: `Connecting satellite trunk to ${callLeadPhone}...` },
    ]);
    speakVoiceLine(`Connecting call to ${callLeadName}.`);

    setTimeout(() => {
      const msg = `Hello ${callLeadName}! This is Antigravity AI Voice Assistant from PFS Sport Infrastructure. Following up on your ${callCampaignType} request for ${callLeadOrg}.`;
      setLiveCallTranscript((prev) => [
        ...prev,
        {
          speaker: "AI Voice Agent",
          text: msg,
        },
      ]);
      speakVoiceLine(msg, true);
    }, 1200);

    setTimeout(() => {
      const customerMsg = "Hi! Yes, we have existing outdoor courts that need complete resurfacing with ITF Class 3 acrylic cushion before our championship in October.";
      setLiveCallTranscript((prev) => [
        ...prev,
        {
          speaker: callLeadName,
          text: customerMsg,
        },
      ]);
      speakVoiceLine(customerMsg, false);
    }, 4000);

    setTimeout(() => {
      const closingMsg = "Excellent. Our PFS Pro Tour 8-Layer system meets ITF Class 3 pace standards. I have scheduled our regional lead Siddharth Verma for Thursday 11 AM and dispatched the technical TDS to your WhatsApp.";
      setLiveCallTranscript((prev) => [
        ...prev,
        {
          speaker: "AI Voice Agent",
          text: closingMsg,
        },
      ]);
      speakVoiceLine(closingMsg, true);
    }, 7500);

    setTimeout(() => {
      triggerAICall(callLeadName, callLeadPhone, callCampaignType, callLeadOrg);
      setIsCallingActive(false);
    }, 11000);
  };

  const handleSendMessage = () => {
    if (!outgoingText.trim() || !activeThread) return;
    sendWhatsAppMessage(activeThread.id, outgoingText);
    setOutgoingText("");
  };

  const handleApplyTemplate = (templateKey: string) => {
    setQuickTemplate(templateKey);
    if (templateKey === "dispatch") {
      setOutgoingText(
        "Consignment Dispatched! Order #PFS-ORD-2026-089 has left Bhiwandi Super Hub with GST E-Way Bill EWB-2026-88192014. Tracking: https://pfs-sport.com/dealer/shipments/SHP-2026-044"
      );
    } else if (templateKey === "tds") {
      setOutgoingText(
        "Here is the official PFS Pro Tour (8-Layer Acrylic) Technical Specification TDS & Color Swatch Catalog. Let us know if you would like a physical sample kit dispatched."
      );
    } else if (templateKey === "estimate") {
      setOutgoingText(
        "Your verified turnkey court estimate has been generated: ₹12,40,000 + 18% GST for 4 Courts (7,200 sq ft). Includes 8-layer cushion application & regulation line marking."
      );
    } else if (templateKey === "payment") {
      setOutgoingText(
        "Gentle reminder: Invoice INV-2026-089 (₹14,50,000) credit facility milestone is due for settlement in 3 business days. Verified statement attached."
      );
    }
  };

  const handleSendEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendEmail(emailRecipient, emailName, emailSubject, emailCategory, emailBody);
    setIsComposeEmailModalOpen(false);
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Omnichannel Comms &amp; AI Hub
              </h1>
              <Badge variant="gold" className="rounded-full text-[10px] font-mono">
                AI Voice + WhatsApp + ZeptoMail Active
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Automated AI Voice qualification calls, two-way WhatsApp Business API messaging, and transactional ZeptoMail dispatch delivery.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSimulateCallDrawerOpen(true)}
              className="rounded-xl text-xs font-bold bg-white hover:bg-slate-50 border-slate-200 shadow-2xs h-10 flex items-center gap-1.5"
            >
              <PhoneCall className="h-4 w-4 text-[#F36E21]" />
              Launch AI Voice Call
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsComposeEmailModalOpen(true)}
              className="rounded-xl text-xs font-black bg-[#F36E21] hover:bg-[#D95D16] text-white shadow-xs h-10 px-4 flex items-center gap-1.5"
            >
              <Mail className="mr-1 h-4 w-4" />
              Compose Email
            </Button>
          </div>
        </div>

        {/* 4 Telemetry Metrics Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono text-xs">
          <Card className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-sans font-bold uppercase tracking-wider text-[9px]">AI Voice Calls</span>
              <Phone className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{aiCalls.length} Completed</p>
            <span className="text-[10px] text-emerald-700 font-bold block">94.2% Avg AI Sentiment</span>
          </Card>

          <Card className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-sans font-bold uppercase tracking-wider text-[9px]">WhatsApp API</span>
              <MessageSquare className="h-4 w-4 text-[#006442]" />
            </div>
            <p className="text-2xl font-black text-slate-900">{whatsappThreads.length} Channels</p>
            <span className="text-[10px] text-emerald-700 font-bold block">100% Delivery SLA</span>
          </Card>

          <Card className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-sans font-bold uppercase tracking-wider text-[9px]">ZeptoMail Outbox</span>
              <Mail className="h-4 w-4 text-[#1976D2]" />
            </div>
            <p className="text-2xl font-black text-slate-900">{emails.length} Dispatched</p>
            <span className="text-[10px] text-primary font-bold block">88.4% Open Rate</span>
          </Card>

          <Card className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-sans font-bold uppercase tracking-wider text-[9px]">Auto Workflows</span>
              <Zap className="h-4 w-4 text-[#E0A925]" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {communicationTriggers.filter((t) => t.status === "active").length} Active
            </p>
            <span className="text-[10px] text-amber-700 font-bold block">Multi-Channel Triggers</span>
          </Card>
        </div>

        {/* Tab Selection Navigation Bar */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 w-fit overflow-x-auto">
          {[
            { id: "ai_calls", label: "AI Voice Agent", icon: PhoneCall, count: aiCalls.length },
            { id: "whatsapp", label: "WhatsApp Business API", icon: MessageSquare, count: whatsappThreads.length },
            { id: "email", label: "Email Outbox (ZeptoMail)", icon: Mail, count: emails.length },
            { id: "triggers", label: "Event Triggers & Rules", icon: Zap, count: communicationTriggers.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  isActive
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-[#F36E21]" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: AI VOICE AGENT CALLS */}
        {activeTab === "ai_calls" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Call Logs */}
              <div className="lg:col-span-2 space-y-4">
                {aiCalls.map((call) => (
                  <MotionCard
                    key={call.id}
                    className="p-5 bg-white border border-slate-200/90 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 border border-emerald-200/80">
                          <PhoneCall className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-black text-slate-900">{call.recipientName}</h3>
                            <Badge variant="gold" size="sm" className="text-[10px] font-mono">
                              {call.campaignType}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500">
                            {call.recipientOrg} • <span className="font-mono text-slate-700 font-bold">{call.recipientPhone}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right font-mono text-xs">
                          <span className="text-[9px] text-slate-400 uppercase block font-sans font-bold">Duration</span>
                          <span className="font-bold text-slate-800">{call.durationSeconds}s</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold">
                          {call.sentimentScore}% Positive
                        </span>
                      </div>
                    </div>

                    {/* AI Structured Summary */}
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1.5">
                      <span className="text-[10px] font-mono uppercase font-bold text-amber-700 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        AI Extracted Commercial Summary
                      </span>
                      <p className="text-slate-700 leading-relaxed">{call.structuredSummary}</p>
                    </div>

                    {/* Action Items List */}
                    <div className="space-y-1">
                      {call.actionItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="text-[10px] text-slate-400 font-mono">Call SID: {call.callSid} • {call.createdAt}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCall(call)}
                        className="rounded-xl text-xs font-bold h-8"
                      >
                        <FileText className="mr-1 h-3.5 w-3.5" />
                        View Full Transcript
                      </Button>
                    </div>
                  </MotionCard>
                ))}
              </div>

              {/* Right 1 Col: AI Voice Engine Settings & Outbound Simulator */}
              <div className="space-y-6">
                <Card className="p-6 bg-slate-900 text-white rounded-3xl space-y-4 shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-48 h-48 bg-[#F36E21]/20 blur-3xl pointer-events-none rounded-full" />
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Radio className="h-4 w-4 animate-pulse" />
                    AI Voice Bot Architecture
                  </div>
                  <h3 className="text-lg font-black text-white">
                    Low-Latency Conversational AI
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Powered by deep-reasoning neural speech synthesis, our voice agent conducts technical ITF pace qualification, checks base readiness, and books sales appointments automatically.
                  </p>
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/10 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Speech Model:</span>
                      <strong className="text-white">Neural FastPace 2.4</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Turnaround Latency:</span>
                      <strong className="text-emerald-400">&lt; 420ms</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Language:</span>
                      <strong className="text-white">English / Hindi (Bilingual)</strong>
                    </div>
                  </div>
                  <Button
                    variant="accent"
                    size="default"
                    onClick={() => setIsSimulateCallDrawerOpen(true)}
                    className="w-full rounded-2xl font-black text-xs bg-[#F36E21] hover:bg-[#D95D16] text-white h-11 shadow-lg"
                  >
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Test Live AI Call Simulation →
                  </Button>
                </Card>

                {/* Qualification Criteria Card */}
                <Card className="p-6 bg-white border border-slate-200/90 rounded-3xl shadow-xs space-y-3 text-xs">
                  <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    4-Stage Call Qualification Pipeline
                  </h4>
                  <div className="space-y-2.5 text-slate-600">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                      <strong className="text-slate-900 block font-bold">1. Technical Base Verification</strong>
                      <span className="text-[11px] text-slate-500">Asphalt / Concrete sound grade check</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                      <strong className="text-slate-900 block font-bold">2. System Specification Alignment</strong>
                      <span className="text-[11px] text-slate-500">ITF Class 3 Pro Tour vs Mod-Tile PP</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                      <strong className="text-slate-900 block font-bold">3. Commercial Budget Estimation</strong>
                      <span className="text-[11px] text-slate-500">Turnkey ₹/sq ft calculation with 18% GST</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                      <strong className="text-slate-900 block font-bold">4. WhatsApp Dossier Handover</strong>
                      <span className="text-[11px] text-slate-500">Instant PDF brochure & sales calendar booking</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WHATSAPP BUSINESS API & LIVE CHAT DESK */}
        {activeTab === "whatsapp" && (
          <Card className="bg-white border border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
              {/* Left Column: Thread List (4 Cols) */}
              <div className="lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/60">
                <div className="p-4 border-b border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-[#006442]" />
                      WhatsApp Inbox
                    </h3>
                    <Badge variant="gold" size="sm" className="font-mono text-[9px]">
                      Meta Cloud API Live
                    </Badge>
                  </div>
                  <Input
                    value={chatSearch}
                    onChange={(e) => setChatSearch(e.target.value)}
                    placeholder="Search chats, leads, dealers..."
                    className="rounded-xl text-xs bg-slate-50 h-9"
                  />
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                  {filteredThreads.map((thread) => {
                    const isSelected = thread.id === activeThread?.id;
                    return (
                      <button
                        key={thread.id}
                        type="button"
                        onClick={() => setSelectedThreadId(thread.id)}
                        className={`w-full p-4 text-left transition-all flex items-start gap-3 ${
                          isSelected ? "bg-white border-l-4 border-l-[#F36E21] shadow-2xs" : "hover:bg-slate-100/60"
                        }`}
                      >
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#040C1A] to-[#0A2A57] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                          {thread.avatarText}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{thread.contactName}</h4>
                            <span className="text-[10px] text-slate-400 font-mono shrink-0">{thread.lastMessageTime}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium truncate">{thread.organization}</p>
                          <p className="text-xs text-slate-600 truncate mt-1">{thread.lastMessageText}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Active Conversation (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col bg-white">
                {activeThread ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#040C1A] to-[#0A2A57] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {activeThread.avatarText}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-black text-slate-900">{activeThread.contactName}</h3>
                            <Badge variant="outline" size="sm" className="text-[9px] font-mono">
                              {activeThread.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500">
                            {activeThread.organization} • <span className="font-mono font-bold text-slate-700">{activeThread.phone}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleThreadAiBot(activeThread.id)}
                          className={`rounded-xl text-xs font-bold h-8 ${
                            activeThread.isAiBotActive ? "bg-emerald-50 border-emerald-200 text-emerald-800" : ""
                          }`}
                        >
                          <Bot className="mr-1.5 h-3.5 w-3.5" />
                          AI Bot: {activeThread.isAiBotActive ? "Active" : "Paused"}
                        </Button>
                      </div>
                    </div>

                    {/* Chat Messages List */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
                      {activeThread.messages.map((msg) => {
                        const isBusiness = msg.sender === "business" || msg.sender === "ai_bot";
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isBusiness ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-md p-4 rounded-2xl text-xs space-y-2 shadow-xs ${
                                isBusiness
                                  ? "bg-slate-900 text-white rounded-br-xs"
                                  : "bg-white text-slate-900 border border-slate-200/90 rounded-bl-xs"
                              }`}
                            >
                              {msg.sender === "ai_bot" && (
                                <span className="text-[9px] font-mono text-[#E0A925] uppercase font-bold flex items-center gap-1">
                                  <Sparkles className="h-3 w-3" />
                                  PFS Automated AI Engine
                                </span>
                              )}

                              <p className="leading-relaxed">{msg.text}</p>

                              {/* Media attachment preview */}
                              {msg.mediaType === "pdf" && (
                                <div className="p-2.5 bg-white/10 rounded-xl border border-white/15 flex items-center justify-between text-xs font-mono">
                                  <div className="flex items-center gap-2 truncate">
                                    <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                                    <span className="truncate">{msg.mediaUrl}</span>
                                  </div>
                                  <Download className="h-3.5 w-3.5 text-slate-300 shrink-0 ml-2" />
                                </div>
                              )}

                              {/* Quick replies preview */}
                              {msg.quickReplies && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {msg.quickReplies.map((qr, qidx) => (
                                    <span
                                      key={qidx}
                                      className="px-2.5 py-1 rounded-full bg-white/15 text-white text-[10px] font-bold border border-white/20"
                                    >
                                      {qr}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 font-mono pt-1">
                                <span>{msg.timestamp}</span>
                                {isBusiness && <Check className="h-3 w-3 text-emerald-400 stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Templates Strip */}
                    <div className="p-2.5 bg-slate-100 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
                      <span className="text-[10px] font-bold uppercase text-slate-500 font-mono shrink-0">Templates:</span>
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate("dispatch")}
                        className="px-3 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 text-[11px] font-bold border border-slate-200 shrink-0"
                      >
                        Consignment Dispatch EWB
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate("tds")}
                        className="px-3 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 text-[11px] font-bold border border-slate-200 shrink-0"
                      >
                        8-Layer TDS Spec
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate("estimate")}
                        className="px-3 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 text-[11px] font-bold border border-slate-200 shrink-0"
                      >
                        Turnkey Estimate PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate("payment")}
                        className="px-3 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 text-[11px] font-bold border border-slate-200 shrink-0"
                      >
                        Payment Reminder
                      </button>
                    </div>

                    {/* Compose Input */}
                    <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-3 shrink-0">
                      <Input
                        value={outgoingText}
                        onChange={(e) => setOutgoingText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSendMessage();
                        }}
                        placeholder="Type WhatsApp message or select quick template..."
                        className="rounded-xl text-xs bg-slate-50 h-11 flex-1"
                      />
                      <Button
                        variant="accent"
                        size="default"
                        onClick={handleSendMessage}
                        className="rounded-xl font-bold text-xs bg-[#006442] hover:bg-[#005035] text-white h-11 px-5 shadow-xs"
                      >
                        <Send className="mr-1.5 h-4 w-4" /> Send
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-12 text-center text-slate-400">
                    Select a conversation thread to view WhatsApp messages.
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* TAB 3: EMAIL CENTER (ZEPTOMAIL) */}
        {activeTab === "email" && (
          <div className="space-y-6">
            <Card className="bg-white border border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#1976D2]" />
                    ZeptoMail Transactional Dispatch Outbox
                  </h3>
                  <p className="text-xs text-slate-500">
                    Automated tax invoice delivery, statutory E-Way bills, quote estimates, and TDS specification dispatches.
                  </p>
                </div>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => setIsComposeEmailModalOpen(true)}
                  className="rounded-xl text-xs font-black bg-[#F36E21] hover:bg-[#D95D16] text-white"
                >
                  <Plus className="mr-1 h-3.5 w-3.5" /> Compose Email
                </Button>
              </div>

              <div className="divide-y divide-slate-100">
                {emails.map((eml) => (
                  <div
                    key={eml.id}
                    className="p-4 sm:p-5 hover:bg-slate-50/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" size="sm" className="font-mono text-[9px]">
                          {eml.templateCategory}
                        </Badge>
                        <h4 className="text-xs font-bold text-slate-900">{eml.subject}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[9px] font-mono font-bold capitalize">
                          {eml.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        To: <strong className="text-slate-800">{eml.recipientName}</strong> ({eml.recipientEmail}) • Sent {eml.sentAt}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        {eml.htmlPreview}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEmail(eml)}
                        className="rounded-xl text-xs font-bold h-8"
                      >
                        Preview Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 4: EVENT TRIGGERS & MULTI-CHANNEL RULES */}
        {activeTab === "triggers" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {communicationTriggers.map((rule) => {
                const isActive = rule.status === "active";
                return (
                  <MotionCard
                    key={rule.id}
                    className="p-5 bg-white border border-slate-200/90 rounded-3xl shadow-xs space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-black text-slate-900">{rule.name}</h3>
                          <Badge variant={isActive ? "gold" : "outline"} size="sm" className="text-[9px] font-mono">
                            {rule.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{rule.description}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCommunicationTrigger(rule.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isActive ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isActive ? "Active" : "Paused"}
                      </button>
                    </div>

                    {/* Channels & Delay Badges */}
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">Channels:</span>
                        <div className="flex items-center gap-1.5">
                          {rule.channels.includes("ai_voice") && (
                            <span className="p-1 rounded bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-1">
                              <PhoneCall className="h-3 w-3" /> Voice
                            </span>
                          )}
                          {rule.channels.includes("whatsapp") && (
                            <span className="p-1 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" /> WhatsApp
                            </span>
                          )}
                          {rule.channels.includes("email") && (
                            <span className="p-1 rounded bg-blue-100 text-blue-900 text-[10px] font-bold flex items-center gap-1">
                              <Mail className="h-3 w-3" /> Email
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-slate-600 text-[11px]">{rule.delayDescription}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>Executions: <strong>{rule.executionsCount}</strong></span>
                      <span>Last Fired: <strong>{rule.lastFired}</strong></span>
                    </div>
                  </MotionCard>
                );
              })}
            </div>
          </div>
        )}

        {/* AI VOICE SIMULATOR DRAWER (Create Inbound Lead Standard) */}
        <AnimatePresence>
          {isSimulateCallDrawerOpen && (
            <div className="fixed inset-0 z-[100] flex justify-start">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSimulateCallDrawerOpen(false)}
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="relative z-10 w-full sm:max-w-xl md:max-w-2xl bg-white h-screen shadow-2xl flex flex-col border-r border-slate-200 overflow-hidden text-neutral-900"
              >
                {/* 1. Sticky Header Banner */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white flex items-center justify-between border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20 text-[#E0A925] flex items-center justify-center font-black shadow-inner shrink-0">
                      <PhoneCall className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                          AI Voice Agent Outbound Engine
                        </h2>
                        <Badge variant="gold" size="sm" className="rounded-full text-[10px] font-mono">
                          Neural Voice 2.4
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Interactive lead qualification, technical scope check &amp; WhatsApp handover.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSimulateCallDrawerOpen(false)}
                    className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 shrink-0"
                  >
                    <X className="h-4.5 w-4.5 stroke-[2.2]" />
                    <span className="sr-only">Close Drawer</span>
                  </button>
                </div>

                {/* 2. Real-time Telemetry Ribbon */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-50 border-b border-slate-200/80 shrink-0 text-xs font-mono">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block">Campaign Type</span>
                    <strong className="text-slate-900 font-bold block truncate">{callCampaignType}</strong>
                  </div>
                  <div className="p-2.5 bg-emerald-50/90 rounded-xl border border-emerald-200 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-emerald-800 uppercase block">Target Recipient</span>
                    <strong className="text-emerald-900 font-black block truncate">{callLeadName}</strong>
                  </div>
                  <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-200 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-amber-800 uppercase block">Voice Channel</span>
                    <strong className="text-amber-900 font-black block truncate">Bilingual FastPace</strong>
                  </div>
                </div>

                {/* 3. Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
                  {/* Configuration Form Card */}
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3">
                    <span className="font-extrabold text-slate-800 block text-xs flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      Recipient &amp; Campaign Parameters
                    </span>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Recipient Name</label>
                        <Input
                          value={callLeadName}
                          onChange={(e) => setCallLeadName(e.target.value)}
                          className="bg-white h-10 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                        <Input
                          value={callLeadPhone}
                          onChange={(e) => setCallLeadPhone(e.target.value)}
                          className="bg-white h-10 rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Organization / Sports Club</label>
                      <Input
                        value={callLeadOrg}
                        onChange={(e) => setCallLeadOrg(e.target.value)}
                        className="bg-white h-10 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  {/* Live Simulated Call Box */}
                  <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3 shadow-md">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Radio className={`h-3.5 w-3.5 ${isCallingActive ? "animate-pulse text-red-400" : "text-slate-400"}`} />
                        <span className="font-mono text-xs font-bold text-amber-300">
                          {isCallingActive ? "CALL IN PROGRESS (VOICE SYNTHESIS LIVE)" : "AI CALL SIMULATION READY"}
                        </span>
                      </div>

                      {/* Animated Audio Equalizer Waveform */}
                      {isCallingActive && (
                        <div className="flex items-center gap-1">
                          {[14, 26, 18, 30, 22, 28, 16, 24].map((height, i) => (
                            <motion.span
                              key={i}
                              animate={{ height: [6, height, 8, height * 0.7, 6] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.6 + (i % 3) * 0.2,
                                ease: "easeInOut",
                              }}
                              className="w-1 bg-[#E0A925] rounded-full"
                              style={{ height: 6 }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dialogue Transcript Stream */}
                    <div className="space-y-2 min-h-[140px] max-h-[220px] overflow-y-auto p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                      {liveCallTranscript.length === 0 ? (
                        <p className="text-slate-400 italic text-center py-6">
                          Click &quot;Initiate Live AI Voice Call&quot; below to trigger simulated audio call and real-time transcription.
                        </p>
                      ) : (
                        liveCallTranscript.map((t, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <strong className={`font-mono text-[10px] uppercase block ${
                              t.speaker.includes("AI") ? "text-amber-400" : "text-emerald-400"
                            }`}>
                              {t.speaker}:
                            </strong>
                            <p className="text-slate-200 leading-relaxed">{t.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. Sticky Action Footer */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSimulateCallDrawerOpen(false)}
                    className="rounded-xl text-xs font-bold px-4 h-10"
                  >
                    Close
                  </Button>
                  <Button
                    variant="accent"
                    size="default"
                    disabled={isCallingActive}
                    onClick={handleStartSimulatedCall}
                    className="rounded-xl px-6 font-black text-xs bg-[#F36E21] hover:bg-[#D95D16] text-white shadow-md flex items-center gap-2 h-10"
                  >
                    {isCallingActive ? (
                      <>
                        <Radio className="h-4 w-4 animate-pulse" /> Live Call Running...
                      </>
                    ) : (
                      <>
                        <PhoneCall className="h-4 w-4" /> Initiate Live AI Voice Call →
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* COMPOSE EMAIL MODAL */}
        <Dialog open={isComposeEmailModalOpen} onOpenChange={setIsComposeEmailModalOpen}>
          <DialogContent className="max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-900">
            <DialogHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-100 text-[#1976D2] flex items-center justify-center font-bold shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="text-base font-black text-slate-900">
                    Compose ZeptoMail Transactional Email
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500">
                    Official PFS template with cryptographic delivery seal &amp; attachment payload.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSendEmailSubmit} className="space-y-4 py-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Recipient Name</label>
                  <Input
                    value={emailName}
                    onChange={(e) => setEmailName(e.target.value)}
                    className="bg-slate-50 h-9 rounded-xl text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Recipient Email</label>
                  <Input
                    type="email"
                    value={emailRecipient}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                    className="bg-slate-50 h-9 rounded-xl text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Subject Line</label>
                <Input
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="bg-slate-50 h-9 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Body Content</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-1 focus:ring-primary focus:outline-hidden"
                  required
                />
              </div>
            </form>

            <DialogFooter className="border-t border-slate-100 pt-4 flex flex-row items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsComposeEmailModalOpen(false)}
                className="rounded-xl text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={handleSendEmailSubmit}
                className="rounded-xl text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16] text-white"
              >
                <Send className="mr-1.5 h-3.5 w-3.5" /> Dispatch ZeptoMail Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* FULL TRANSCRIPT MODAL */}
        <Dialog open={!!selectedCall} onOpenChange={(open) => !open && setSelectedCall(null)}>
          <DialogContent className="max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-900">
            {selectedCall && (
              <>
                <DialogHeader className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <DialogTitle className="text-base font-black text-slate-900">
                        AI Voice Call Transcript — {selectedCall.recipientName}
                      </DialogTitle>
                      <DialogDescription className="text-xs text-slate-500">
                        Call SID: {selectedCall.callSid} • {selectedCall.campaignType}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-4 py-3 text-xs max-h-[380px] overflow-y-auto">
                  {selectedCall.transcript.map((line, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <strong className={`uppercase ${line.speaker.includes("AI") ? "text-amber-700" : "text-emerald-700"}`}>
                          {line.speaker}
                        </strong>
                        <span className="text-slate-400">{line.timestamp}</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed">{line.text}</p>
                    </div>
                  ))}
                </div>

                <DialogFooter className="border-t border-slate-100 pt-4 flex flex-row items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCall(null)} className="rounded-xl text-xs font-bold">
                    Close Transcript
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => {
                      alert("Transcript exported to CRM Lead Dossier.");
                      setSelectedCall(null);
                    }}
                    className="rounded-xl text-xs font-bold bg-[#F36E21] text-white"
                  >
                    Export to Lead Notes
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* EMAIL PREVIEW MODAL */}
        <Dialog open={!!selectedEmail} onOpenChange={(open) => !open && setSelectedEmail(null)}>
          <DialogContent className="max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-900">
            {selectedEmail && (
              <>
                <DialogHeader className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-blue-100 text-[#1976D2] flex items-center justify-center font-bold shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <DialogTitle className="text-base font-black text-slate-900">
                        {selectedEmail.subject}
                      </DialogTitle>
                      <DialogDescription className="text-xs text-slate-500">
                        To: {selectedEmail.recipientName} ({selectedEmail.recipientEmail})
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-4 py-3 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-1 font-mono text-[11px]">
                    <div><strong>Message ID:</strong> {selectedEmail.messageId}</div>
                    <div><strong>Provider:</strong> {selectedEmail.provider}</div>
                    <div><strong>Status:</strong> <span className="text-emerald-700 capitalize font-bold">{selectedEmail.status}</span></div>
                    <div><strong>Sent Timestamp:</strong> {selectedEmail.sentAt}</div>
                  </div>

                  <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 leading-relaxed text-slate-800">
                    <div className="border-b border-slate-100 pb-2 font-bold text-slate-900">
                      Dear {selectedEmail.recipientName},
                    </div>
                    <p>{selectedEmail.htmlPreview}</p>
                    <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                      PFS Sport Infrastructure Pvt Ltd • Bhiwandi Super Hub • GSTIN: 27AABCP1129K1Z4
                    </div>
                  </div>
                </div>

                <DialogFooter className="border-t border-slate-100 pt-4 flex flex-row items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setSelectedEmail(null)} className="rounded-xl text-xs font-bold">
                    Close
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => {
                      alert(`Resending ${selectedEmail.subject}`);
                      setSelectedEmail(null);
                    }}
                    className="rounded-xl text-xs font-bold bg-[#F36E21] text-white"
                  >
                    Resend Email Copy
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </PageTransition>
    </AdminLayout>
  );
}
